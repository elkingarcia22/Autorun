# 🛡️ Estrategia: Garantizar Cumplimiento de Lineamientos en Autorun

## 🎯 Objetivo

**Garantizar que Autorun SIEMPRE siga los lineamientos definidos, sin excepciones.**

---

## 📊 Análisis del Problema

### **Problema Identificado:**

1. ❌ El agente puede saltarse el checklist obligatorio
2. ❌ El agente puede implementar sin consultar Storybook/MCP/documentación
3. ❌ El agente puede implementar todo de golpe sin seguir paso a paso
4. ❌ El Pre-Implementation Check add-on existe pero no se usa automáticamente
5. ❌ No hay bloqueo real de herramientas antes de completar pasos obligatorios

### **Causa Raíz:**

- Las reglas están en `.cursorrules` pero son "sugerencias", no bloqueos reales
- El Pre-Implementation Check detecta después de escribir, no antes
- No hay verificación previa antes de usar herramientas de escritura
- El agente puede ignorar las reglas si no hay bloqueo técnico

---

## ✅ ESTRATEGIAS PROPUESTAS

### **ESTRATEGIA 1: Bloqueo Técnico de Herramientas** ⭐⭐⭐ **CRÍTICA**

#### **1.1 Interceptar Herramientas de Escritura**

**Crear un sistema que intercepte `write()` y `search_replace()` ANTES de ejecutarse:**

```typescript
// packages/autorun-core/src/validation/ImplementationGuard.ts

export class ImplementationGuard {
  private static blocked = false;
  private static pendingChecks: Map<string, boolean> = new Map();

  /**
   * Verificar si se puede escribir código
   */
  static async canWrite(componentName?: string): Promise<{ allowed: boolean; reason?: string }> {
    // 1. Verificar si hay componente detectado
    if (componentName) {
      // 2. Verificar Pre-Implementation Check
      const hub = getAutorunHub();
      const preCheckAddon = hub?.getAddon('pre-implementation-check');
      
      if (preCheckAddon) {
        const checkResult = await preCheckAddon.canImplement(componentName);
        if (!checkResult.allowed) {
          return {
            allowed: false,
            reason: `❌ IMPLEMENTACIÓN BLOQUEADA: ${checkResult.reason}\n📋 Pasos faltantes: ${checkResult.missingSteps.join(', ')}`
          };
        }
      }
    }

    // 3. Verificar si hay triggers de imagen sin análisis
    const hasImageTriggers = await this.checkImageTriggers();
    if (hasImageTriggers) {
      return {
        allowed: false,
        reason: '❌ BLOQUEO: Hay triggers de imagen sin análisis completo. Debe completar el análisis primero.'
      };
    }

    return { allowed: true };
  }

  /**
   * Wrapper para write() que verifica antes
   */
  static async safeWrite(filePath: string, contents: string, componentName?: string) {
    const check = await this.canWrite(componentName);
    if (!check.allowed) {
      throw new Error(check.reason);
    }
    // Llamar a write() original
    return write(filePath, contents);
  }
}
```

#### **1.2 Modificar Herramientas de Cursor**

**Crear wrappers que verifiquen antes de ejecutar:**

```typescript
// .cursor/hooks/pre-write-check.ts

/**
 * Hook que se ejecuta ANTES de write() o search_replace()
 */
export async function preWriteCheck(filePath: string, componentName?: string) {
  const guard = await import('@autorun/core/validation/ImplementationGuard');
  
  // Detectar componente del contenido o filePath
  const detectedComponent = detectComponentFromPath(filePath) || componentName;
  
  if (detectedComponent) {
    const check = await guard.canWrite(detectedComponent);
    if (!check.allowed) {
      // Lanzar error que bloquea la ejecución
      throw new ImplementationBlockedError(check.reason);
    }
  }
}
```

#### **1.3 Integrar con FileWatcher**

**El FileWatcher puede detectar patrones de componentes y bloquear:**

```typescript
// packages/autorun-core/src/addons/functional/pre-implementation-check/src/FileWatcherIntegration.ts

export class FileWatcherIntegration {
  /**
   * Detectar patrones de componentes en código antes de guardar
   */
  static detectComponentPatterns(content: string): string[] {
    const patterns = [
      { pattern: /window\.createDataTable\(/g, component: 'DataTable' },
      { pattern: /window\.createTabs\(/g, component: 'Tabs' },
      { pattern: /window\.createModal\(/g, component: 'Modal' },
      // ... más patrones
    ];

    const detected: string[] = [];
    patterns.forEach(({ pattern, component }) => {
      if (pattern.test(content)) {
        detected.push(component);
      }
    });

    return detected;
  }

  /**
   * Interceptar guardado de archivo
   */
  static async interceptFileSave(filePath: string, content: string) {
    const components = this.detectComponentPatterns(content);
    
    if (components.length > 0) {
      // Verificar Pre-Implementation Check para cada componente
      const hub = getAutorunHub();
      const preCheckAddon = hub?.getAddon('pre-implementation-check');
      
      for (const component of components) {
        if (preCheckAddon) {
          const check = await preCheckAddon.canImplement(component);
          if (!check.allowed) {
            // Bloquear guardado
            throw new Error(`❌ NO SE PUEDE GUARDAR: ${check.reason}`);
          }
        }
      }
    }
  }
}
```

---

### **ESTRATEGIA 2: Verificación Automática Pre-Escritura** ⭐⭐⭐ **CRÍTICA**

#### **2.1 Función de Verificación Obligatoria**

**Crear función que DEBE ejecutarse antes de cualquier `write()` o `search_replace()`:**

```typescript
// packages/autorun-core/src/validation/PreWriteValidator.ts

export class PreWriteValidator {
  /**
   * Verificar que se hayan completado todos los pasos obligatorios
   */
  static async validateBeforeWrite(
    filePath: string,
    content: string,
    context?: { componentName?: string }
  ): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Detectar componente del contenido
    const componentName = context?.componentName || this.detectComponent(content);
    
    if (componentName) {
      // 2. Verificar checklist obligatorio
      const checklistResult = await this.verifyChecklist(componentName);
      if (!checklistResult.valid) {
        errors.push(...checklistResult.errors);
      }

      // 3. Verificar que se consultó Storybook
      const storybookResult = await this.verifyStorybookConsultation(componentName);
      if (!storybookResult.valid) {
        errors.push(...storybookResult.errors);
      }

      // 4. Verificar que se consultó documentación
      const docResult = await this.verifyDocumentationConsultation(componentName);
      if (!docResult.valid) {
        errors.push(...docResult.errors);
      }
    }

    // 5. Verificar triggers de imagen
    const imageResult = await this.verifyImageTriggers();
    if (!imageResult.valid) {
      errors.push(...imageResult.errors);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static async verifyChecklist(componentName: string): Promise<ValidationResult> {
    const hub = getAutorunHub();
    const preCheckAddon = hub?.getAddon('pre-implementation-check');
    
    if (!preCheckAddon) {
      return {
        valid: false,
        errors: ['❌ Pre-Implementation Check add-on no está disponible']
      };
    }

    const check = await preCheckAddon.canImplement(componentName);
    if (!check.allowed) {
      return {
        valid: false,
        errors: [`❌ Checklist incompleto: ${check.reason}`]
      };
    }

    return { valid: true, errors: [] };
  }
}
```

#### **2.2 Integrar en .cursorrules**

**Agregar verificación obligatoria en `.cursorrules`:**

```markdown
## 🚨 VERIFICACIÓN OBLIGATORIA ANTES DE ESCRIBIR CÓDIGO

**ANTES de usar `write()` o `search_replace()`, DEBES:**

1. **Ejecutar verificación automática:**
   ```typescript
   import { PreWriteValidator } from '@autorun/core/validation/PreWriteValidator';
   
   const validation = await PreWriteValidator.validateBeforeWrite(
     filePath,
     content,
     { componentName: 'DataTable' }
   );
   
   if (!validation.valid) {
     // ❌ BLOQUEAR - No se puede escribir hasta completar pasos
     throw new Error(validation.errors.join('\n'));
   }
   ```

2. **Si hay errores:**
   - ❌ NO usar `write()` o `search_replace()`
   - ✅ Completar pasos faltantes primero
   - ✅ Verificar nuevamente antes de escribir
```

---

### **ESTRATEGIA 3: Mejorar Pre-Implementation Check Add-on** ⭐⭐ **IMPORTANTE**

#### **3.1 Detección Proactiva (Antes de Escribir)**

**Mejorar el add-on para detectar ANTES de escribir:**

```typescript
// packages/addons/functional/pre-implementation-check/src/ProactiveDetection.ts

export class ProactiveDetection {
  /**
   * Detectar intención de implementar componente del mensaje del usuario
   */
  static detectFromUserMessage(message: string): string[] {
    const patterns = [
      { pattern: /implementar.*data.?table|crear.*tabla|data.?table/i, component: 'DataTable' },
      { pattern: /implementar.*tabs?|crear.*tabs?/i, component: 'Tabs' },
      { pattern: /implementar.*modal|crear.*modal/i, component: 'Modal' },
      // ... más patrones
    ];

    const detected: string[] = [];
    patterns.forEach(({ pattern, component }) => {
      if (pattern.test(message)) {
        detected.push(component);
      }
    });

    return detected;
  }

  /**
   * Verificar inmediatamente cuando se detecta intención
   */
  static async verifyOnDetection(componentName: string) {
    const hub = getAutorunHub();
    const preCheckAddon = hub?.getAddon('pre-implementation-check');
    
    if (preCheckAddon) {
      const check = await preCheckAddon.canImplement(componentName);
      if (!check.allowed) {
        // Mostrar advertencia inmediatamente
        console.error('🚨 PRE-IMPLEMENTATION CHECK: Intento de implementar', componentName, 'sin completar checklist');
        console.error('📋 Pasos faltantes:', check.missingSteps);
        console.error('⚠️ IMPLEMENTACIÓN BLOQUEADA hasta completar checklist');
        
        // Registrar en Problem Tracker
        const problemTracker = hub?.getAddon('problem-tracker');
        if (problemTracker) {
          await problemTracker.recordProblem({
            type: 'implementation-blocked',
            component: componentName,
            reason: check.reason,
            missingSteps: check.missingSteps
          });
        }
      }
    }
  }
}
```

#### **3.2 Integrar con FileWatcher para Detección Temprana**

**Detectar cuando se va a escribir código con componentes:**

```typescript
// packages/addons/functional/pre-implementation-check/src/FileWatcherIntegration.ts

export class FileWatcherIntegration {
  /**
   * Interceptar cambios en archivos ANTES de guardar
   */
  static setupPreSaveInterception() {
    // Interceptar eventos de guardado de archivos
    // Detectar patrones de componentes
    // Verificar checklist antes de permitir guardar
  }
}
```

---

### **ESTRATEGIA 4: Proceso Automático Forzado** ⭐⭐⭐ **CRÍTICA**

#### **4.1 Función Helper Obligatoria**

**Crear función que DEBE usarse antes de implementar:**

```typescript
// packages/autorun-core/src/helpers/implementationHelpers.ts

/**
 * ⚠️ OBLIGATORIO: Usar esta función ANTES de implementar cualquier componente
 */
export async function ensureImplementationReady(componentName: string): Promise<void> {
  // 1. Verificar Pre-Implementation Check
  const hub = getAutorunHub();
  const preCheckAddon = hub?.getAddon('pre-implementation-check');
  
  if (!preCheckAddon) {
    throw new Error('❌ Pre-Implementation Check add-on no está disponible');
  }

  const check = await preCheckAddon.canImplement(componentName);
  if (!check.allowed) {
    // Bloquear y mostrar pasos faltantes
    const errorMessage = `
❌ IMPLEMENTACIÓN BLOQUEADA: ${componentName}

📋 Pasos faltantes:
${check.missingSteps.map(step => `  - ${step}`).join('\n')}

⚠️ DEBES completar estos pasos antes de implementar:
1. Consultar Storybook en Vercel (PRIMERO)
2. Consultar Storybook MCP
3. Consultar documentación específica
4. Comparar versiones

Ver: docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md
    `;
    throw new ImplementationBlockedError(errorMessage);
  }

  console.log(`✅ Checklist completo para ${componentName}, procediendo con implementación`);
}
```

#### **4.2 Integrar en .cursorrules como OBLIGATORIO**

**Agregar al inicio de `.cursorrules`:**

```markdown
## 🚨🚨🚨 VERIFICACIÓN OBLIGATORIA ANTES DE IMPLEMENTAR 🚨🚨🚨

**ANTES de usar `write()` o `search_replace()` para implementar un componente, DEBES:**

```typescript
import { ensureImplementationReady } from '@autorun/core/helpers/implementationHelpers';

// ⚠️ OBLIGATORIO: Verificar antes de implementar
await ensureImplementationReady('DataTable'); // o el componente que vayas a implementar

// Solo después de que esta función pase, puedes usar write() o search_replace()
```

**Si esta función lanza error, NO puedes continuar hasta completar los pasos faltantes.**
```

---

### **ESTRATEGIA 5: Template de Implementación Forzado** ⭐⭐ **IMPORTANTE**

#### **5.1 Crear Template de Código Obligatorio**

**Crear template que fuerce el proceso:**

```typescript
// packages/autorun-core/src/templates/ComponentImplementationTemplate.ts

export class ComponentImplementationTemplate {
  /**
   * Generar código de implementación que incluye verificaciones obligatorias
   */
  static generate(componentName: string, options: any): string {
    return `
// ⚠️ OBLIGATORIO: Verificar antes de implementar
import { ensureImplementationReady } from '@autorun/core/helpers/implementationHelpers';
import { PreWriteValidator } from '@autorun/core/validation/PreWriteValidator';

(async () => {
  // 1. Verificar checklist obligatorio
  await ensureImplementationReady('${componentName}');
  
  // 2. Verificar antes de escribir
  const validation = await PreWriteValidator.validateBeforeWrite(
    '${options.filePath}',
    '${options.content}',
    { componentName: '${componentName}' }
  );
  
  if (!validation.valid) {
    throw new Error(validation.errors.join('\\n'));
  }
  
  // 3. Solo entonces implementar
  ${options.implementationCode}
})();
    `;
  }
}
```

---

### **ESTRATEGIA 6: Mejoras a .cursorrules** ⭐⭐ **IMPORTANTE**

#### **6.1 Hacer Reglas Más Explícitas y Enforzables**

**Agregar al inicio de `.cursorrules`:**

```markdown
## 🚨🚨🚨 REGLAS CRÍTICAS - NO SE PUEDEN IGNORAR 🚨🚨🚨

### **REGLA #1: BLOQUEO TÉCNICO DE HERRAMIENTAS**

**ANTES de usar `write()` o `search_replace()`, el sistema verifica automáticamente:**

1. ✅ ¿Se completó el checklist obligatorio?
2. ✅ ¿Se consultó Storybook en Vercel?
3. ✅ ¿Se consultó Storybook MCP?
4. ✅ ¿Se consultó documentación?
5. ✅ ¿Se completó análisis de imagen (si aplica)?

**Si CUALQUIERA es NO → `write()` y `search_replace()` LANZAN ERROR y NO se ejecutan.**

### **REGLA #2: VERIFICACIÓN AUTOMÁTICA**

**El sistema ejecuta automáticamente:**

```typescript
// Esto se ejecuta AUTOMÁTICAMENTE antes de cada write() o search_replace()
const validation = await PreWriteValidator.validateBeforeWrite(filePath, content);
if (!validation.valid) {
  throw new Error('❌ BLOQUEADO: ' + validation.errors.join('\\n'));
}
```

**NO puedes saltarte esta verificación.**

### **REGLA #3: PROCESO PASO A PASO OBLIGATORIO**

**Para componentes complejos (DataTable, Modal, etc.):**

1. ❌ NO puedes implementar todo de golpe
2. ✅ DEBES implementar una funcionalidad a la vez
3. ✅ DEBES pedir aprobación entre pasos
4. ✅ El sistema detecta si intentas implementar múltiples funcionalidades juntas

**Si detecta múltiples funcionalidades → BLOQUEA y pide implementar paso a paso.**
```

---

### **ESTRATEGIA 7: Sistema de Tracking y Reportes** ⭐ **ÚTIL**

#### **7.1 Tracking de Cumplimiento**

**Registrar cada implementación y verificar cumplimiento:**

```typescript
// packages/autorun-core/src/tracking/ComplianceTracker.ts

export class ComplianceTracker {
  /**
   * Registrar intento de implementación
   */
  static async trackImplementationAttempt(
    componentName: string,
    stepsCompleted: string[],
    stepsMissing: string[]
  ) {
    const record = {
      timestamp: new Date().toISOString(),
      component: componentName,
      stepsCompleted,
      stepsMissing,
      compliant: stepsMissing.length === 0
    };

    // Guardar en archivo o base de datos
    await this.saveRecord(record);

    // Si no es compliant, generar reporte
    if (!record.compliant) {
      await this.generateComplianceReport(record);
    }
  }

  /**
   * Generar reporte de cumplimiento
   */
  static async generateComplianceReport(record: ImplementationRecord) {
    // Generar reporte con:
    // - Componente implementado
    // - Pasos completados
    // - Pasos faltantes
    // - Recomendaciones
  }
}
```

---

## 📋 PLAN DE IMPLEMENTACIÓN

### **FASE 1: Bloqueo Técnico (Prioridad Alta)** ⚠️ CRÍTICO

1. ✅ Crear `ImplementationGuard` que intercepta `write()` y `search_replace()`
2. ✅ Crear `PreWriteValidator` que verifica antes de escribir
3. ✅ Integrar con Pre-Implementation Check add-on
4. ✅ Agregar verificación obligatoria en `.cursorrules`
5. ✅ Probar que el bloqueo funciona

**Tiempo estimado:** 2-3 días

### **FASE 2: Mejoras al Pre-Implementation Check (Prioridad Alta)** ⚠️ CRÍTICO

1. ✅ Mejorar detección proactiva (antes de escribir)
2. ✅ Integrar con FileWatcher para detección temprana
3. ✅ Agregar verificación de triggers de imagen
4. ✅ Mejorar mensajes de error y bloqueo
5. ✅ Probar que detecta correctamente

**Tiempo estimado:** 1-2 días

### **FASE 3: Proceso Automático Forzado (Prioridad Media)**

1. ✅ Crear función `ensureImplementationReady()`
2. ✅ Integrar en `.cursorrules` como obligatorio
3. ✅ Crear template de implementación
4. ✅ Documentar uso obligatorio
5. ✅ Probar que funciona

**Tiempo estimado:** 1 día

### **FASE 4: Tracking y Reportes (Prioridad Baja)**

1. ✅ Crear `ComplianceTracker`
2. ✅ Generar reportes de cumplimiento
3. ✅ Integrar con Problem Tracker
4. ✅ Crear dashboard de cumplimiento

**Tiempo estimado:** 1-2 días

---

## 🎯 RECOMENDACIONES PRIORITARIAS

### **RECOMENDACIÓN #1: Implementar Bloqueo Técnico INMEDIATAMENTE** ⚠️ CRÍTICO

**Por qué:**
- Es la única forma de garantizar que no se salten los pasos
- Bloquea técnicamente, no solo sugiere
- Previene implementaciones incorrectas desde el inicio

**Cómo:**
1. Crear `ImplementationGuard` y `PreWriteValidator`
2. Integrar en el sistema de herramientas de Cursor
3. Agregar verificación obligatoria en `.cursorrules`

### **RECOMENDACIÓN #2: Mejorar Pre-Implementation Check** ⚠️ CRÍTICO

**Por qué:**
- Ya existe pero no se usa automáticamente
- Necesita detección proactiva (antes de escribir)
- Necesita mejor integración con FileWatcher

**Cómo:**
1. Agregar detección proactiva del mensaje del usuario
2. Integrar con FileWatcher para detectar antes de guardar
3. Mejorar mensajes de error y bloqueo

### **RECOMENDACIÓN #3: Hacer Reglas Más Explícitas** ⚠️ IMPORTANTE

**Por qué:**
- Las reglas actuales son "sugerencias"
- Necesitan ser más explícitas y enforzables
- El agente necesita saber que NO puede saltarse pasos

**Cómo:**
1. Agregar sección explícita al inicio de `.cursorrules`
2. Usar lenguaje más directo ("DEBES", "OBLIGATORIO", "BLOQUEADO")
3. Agregar ejemplos de código que muestren el bloqueo

---

## 🔧 IMPLEMENTACIÓN INMEDIATA (Quick Wins)

### **Quick Win #1: Agregar Verificación en .cursorrules**

**Agregar al inicio de `.cursorrules`:**

```markdown
## 🚨🚨🚨 BLOQUEO TÉCNICO - NO SE PUEDE IGNORAR 🚨🚨🚨

**ANTES de usar `write()` o `search_replace()` para implementar un componente:**

1. ⚠️ **OBLIGATORIO:** Ejecutar verificación:
   ```typescript
   import { ensureImplementationReady } from '@autorun/core/helpers/implementationHelpers';
   await ensureImplementationReady('ComponenteName');
   ```

2. ⚠️ **SI FALLA:** NO puedes usar `write()` o `search_replace()` hasta completar pasos faltantes

3. ⚠️ **EL SISTEMA BLOQUEA AUTOMÁTICAMENTE** si no se completan los pasos
```

### **Quick Win #2: Mejorar Mensajes del Pre-Implementation Check**

**Hacer mensajes más claros y bloqueantes:**

```typescript
// En lugar de solo advertencia, lanzar error que bloquea
if (!check.allowed) {
  throw new Error(`
❌❌❌ IMPLEMENTACIÓN BLOQUEADA ❌❌❌

Componente: ${componentName}
Razón: ${check.reason}

📋 Pasos faltantes:
${check.missingSteps.map(s => `  - ${s}`).join('\n')}

⚠️ NO puedes usar write() o search_replace() hasta completar estos pasos.

Ver: docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md
  `);
}
```

### **Quick Win #3: Agregar Verificación en Cada Implementación**

**Crear helper que se use siempre:**

```typescript
// packages/autorun-core/src/helpers/safeWrite.ts

export async function safeWrite(
  filePath: string,
  contents: string,
  componentName?: string
) {
  // 1. Detectar componente del contenido
  const detected = detectComponentFromContent(contents) || componentName;
  
  // 2. Verificar si es componente UBITS
  if (detected) {
    // 3. Verificar checklist obligatorio
    await ensureImplementationReady(detected);
  }
  
  // 4. Solo entonces escribir
  return write(filePath, contents);
}
```

---

## 📊 MÉTRICAS DE ÉXITO

### **Métricas a Medir:**

1. **Tasa de cumplimiento del checklist:**
   - % de implementaciones que completan checklist antes de escribir
   - Meta: 100%

2. **Tasa de bloqueos:**
   - % de implementaciones bloqueadas por falta de checklist
   - Meta: 0% (todas completan checklist antes)

3. **Tiempo promedio de implementación:**
   - Tiempo desde solicitud hasta implementación completa
   - Meta: Mantener o mejorar

4. **Errores detectados:**
   - % de errores detectados antes de implementar (vs después)
   - Meta: 80%+ detectados antes

---

## 🎯 CONCLUSIÓN

**Para garantizar que Autorun siempre siga los lineamientos:**

1. ✅ **Implementar bloqueo técnico** (Estrategia 1) - CRÍTICO
2. ✅ **Mejorar Pre-Implementation Check** (Estrategia 2) - CRÍTICO
3. ✅ **Hacer reglas más explícitas** (Estrategia 6) - IMPORTANTE
4. ✅ **Proceso automático forzado** (Estrategia 4) - IMPORTANTE

**Prioridad:** Implementar Estrategias 1 y 2 primero (bloqueo técnico), luego las demás.

---

**Última actualización:** 2025-12-10  
**Estado:** Propuesta de estrategia completa
