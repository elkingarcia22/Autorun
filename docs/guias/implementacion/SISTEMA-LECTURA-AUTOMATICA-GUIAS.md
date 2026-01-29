# 🔄 Sistema de Lectura Automática de Guías de Implementación

> **⚠️ CRÍTICO:** Este sistema garantiza que las guías de implementación se lean automáticamente antes de permitir cualquier implementación de componente.

---

## 🎯 Objetivo

**Garantizar que:**
1. ✅ Las guías de implementación se lean automáticamente antes de implementar
2. ✅ El flujo correcto (Análisis → Plan → Checklist → Implementación) se siga siempre
3. ✅ Los errores comunes documentados no se repitan
4. ✅ La estrategia general y específica se apliquen en cada implementación

---

## 📋 Guías que DEBEN Leerse Automáticamente

### **Guías Generales (SIEMPRE):**

1. **`docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md`**
   - Flujo obligatorio: Análisis → Plan → Checklist → Implementación
   - **Cuándo:** Antes de CUALQUIER implementación

2. **`docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`**
   - Estrategia general para evitar errores comunes
   - **Cuándo:** Antes de CUALQUIER implementación

3. **`docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`**
   - Checklist obligatorio antes de implementar
   - **Cuándo:** Antes de CUALQUIER implementación de componente

4. **`docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`**
   - Cómo usar MCPs en la implementación
   - **Cuándo:** Antes de CUALQUIER implementación de componente

### **Guías de Referencia (SIEMPRE):**

5. **`docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`**
   - Errores comunes documentados
   - **Cuándo:** Antes de CUALQUIER implementación de componente

### **Guías Específicas por Componente (CONDICIONALES):**

6. **Guías de errores específicos del componente:**
   - `docs/guias/implementacion/GUIA-ERROR-TABS-NO-SE-MUESTRAN.md` (si es Tabs)
   - `docs/guias/implementacion/GUIA-ERROR-DATATABLE-*.md` (si es DataTable)
   - Etc.

7. **Documentación del componente:**
   - `docs/referencia/componentes/[nombre-componente].md`

8. **Estrategias específicas del componente:**
   - `docs/guias/implementacion/componentes/ESTRATEGIA-[COMPONENTE].md` (si existe)

---

## 🔧 Implementación del Sistema

### **Opción 1: Pre-Implementation Check Add-on (RECOMENDADO)**

**El add-on `Pre-Implementation Check` ya existe y puede extenderse para:**

1. **Detectar cuando se va a implementar un componente:**
   ```typescript
   // Detectar intención de implementar componente
   if (detectComponentImplementation(filePath, content)) {
     const componentName = extractComponentName(content);
     await loadRequiredGuides(componentName);
   }
   ```

2. **Cargar guías automáticamente:**
   ```typescript
   async function loadRequiredGuides(componentName: string) {
     // Guías generales (siempre)
     await readFile('docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md');
     await readFile('docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md');
     await readFile('docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md');
     await readFile('docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md');
     await readFile('docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md');
     
     // Guías específicas del componente
     const componentGuides = getComponentSpecificGuides(componentName);
     for (const guide of componentGuides) {
       await readFile(guide);
     }
     
     // Verificar que se siguió el flujo
     await verifyImplementationFlow();
   }
   ```

3. **Verificar que se siguió el flujo:**
   ```typescript
   async function verifyImplementationFlow() {
     // Verificar que hay análisis previo
     if (!hasAnalysis()) {
       throw new Error('❌ BLOQUEADO: Debes hacer análisis primero');
     }
     
     // Verificar que hay plan
     if (!hasPlan()) {
       throw new Error('❌ BLOQUEADO: Debes crear plan primero');
     }
     
     // Verificar que se consultó Storybook
     if (!hasStorybookConsultation()) {
       throw new Error('❌ BLOQUEADO: Debes consultar Storybook primero');
     }
   }
   ```

### **Opción 2: Regla en `.cursorrules` (FÁCIL DE IMPLEMENTAR)**

**Agregar regla obligatoria en `.cursorrules`:**

```markdown
## ⚠️⚠️⚠️ REGLA CRÍTICA: LECTURA AUTOMÁTICA DE GUIAS ⚠️⚠️⚠️

**ANTES de implementar CUALQUIER componente UBITS, DEBES:**

1. **Leer guías generales (OBLIGATORIO):**
   - `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md`
   - `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`
   - `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
   - `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`
   - `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

2. **Leer guías específicas del componente (OBLIGATORIO):**
   - `docs/guias/implementacion/GUIA-ERROR-[COMPONENTE]-*.md` (si existe)
   - `docs/referencia/componentes/[componente].md`
   - `docs/guias/implementacion/componentes/ESTRATEGIA-[COMPONENTE].md` (si existe)

3. **Seguir flujo obligatorio:**
   - 🔍 ANÁLISIS → 📋 PLAN → ✅ CHECKLIST → 🛠️ IMPLEMENTACIÓN

4. **Consultar Storybook:**
   - Storybook en Vercel PRIMERO
   - Storybook MCP

**❌ NO implementar sin completar estos pasos.**
```

### **Opción 3: Interceptor en `interceptedWrite()` (YA EXISTE, EXTENDER)**

**Extender `interceptedWrite()` para cargar guías automáticamente:**

```typescript
// En @autorun/core/interceptors/toolInterceptors.ts
export async function interceptedWrite(
  filePath: string,
  content: string,
  context?: { componentName?: string }
) {
  // Si se detecta implementación de componente
  if (context?.componentName) {
    // Cargar guías automáticamente
    await loadRequiredGuides(context.componentName);
    
    // Verificar flujo
    await verifyImplementationFlow();
  }
  
  // Continuar con validación normal
  const validation = await PreWriteValidator.validateBeforeWrite(...);
  // ...
}
```

---

## 📝 Template de Implementación con Sistema Automático

```typescript
// PASO 0: Sistema automático carga guías
// (Se ejecuta automáticamente cuando se detecta intención de implementar)

// PASO 1: Análisis (OBLIGATORIO)
// - Identificar componentes
// - Analizar iconos
// - Analizar spacing
// - Analizar estructura

// PASO 2: Plan (OBLIGATORIO)
// - Crear plan detallado
// - Mostrar al usuario
// - Esperar aprobación

// PASO 3: Checklist (OBLIGATORIO)
// - Crear checklist por componente
// - Completar cada item

// PASO 4: Consultar Storybook (OBLIGATORIO)
// - Storybook en Vercel PRIMERO
// - Storybook MCP

// PASO 5: Implementación (SOLO DESPUÉS DE PASOS ANTERIORES)
// - Implementar UNA tarea a la vez
// - Completar TODO el checklist antes de continuar
```

---

## ✅ Checklist de Verificación

**El sistema debe verificar que:**

- [ ] ✅ Se leyeron las guías generales
- [ ] ✅ Se leyeron las guías específicas del componente
- [ ] ✅ Se hizo análisis previo
- [ ] ✅ Se creó plan detallado
- [ ] ✅ Se mostró plan al usuario
- [ ] ✅ Se consultó Storybook en Vercel
- [ ] ✅ Se consultó Storybook MCP
- [ ] ✅ Se siguió el flujo correcto

**Si CUALQUIERA falla → BLOQUEAR implementación**

---

## 🚨 Errores a Prevenir

**Este sistema previene:**

1. ❌ Implementar sin leer guías
2. ❌ Implementar sin análisis
3. ❌ Implementar sin plan
4. ❌ Implementar sin consultar Storybook
5. ❌ Cometer errores ya documentados
6. ❌ No seguir el flujo correcto

---

## 📚 Referencias

- **Flujo completo:** `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md`
- **Estrategia general:** `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`
- **Checklist obligatorio:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
- **Errores cometidos:** `docs/guias/implementacion/ERRORES-COMETIDOS-IMPLEMENTACION-TABS.md`

---

**Última actualización:** 2025-01-10  
**Estado:** 📋 Propuesta de sistema  
**Prioridad:** ⚠️ CRÍTICA - Implementar cuanto antes
