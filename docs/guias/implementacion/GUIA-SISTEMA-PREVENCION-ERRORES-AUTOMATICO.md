# 🛡️ Sistema de Prevención de Errores Automático

## ⚠️ PROBLEMA IDENTIFICADO

**El agente no siempre consulta las guías específicas antes de implementar operaciones comunes**, lo que causa errores ya documentados.

**Ejemplos:**
- Eliminar HeaderSection sin interceptar ContentManager
- Agregar componentes sin consultar Storybook
- Modificar ContentManager sin leer la guía específica

---

## ✅ SOLUCIÓN: Sistema de Detección de Operaciones Comunes

### **Operaciones Comunes Detectadas Automáticamente:**

1. **Eliminar HeaderSection** → Debe consultar `GUIA-ELIMINAR-HEADERSECTION.md`
2. **Interceptar ContentManager** → Debe consultar `GUIA-CONTENTMANAGER-UPDATECONTENT.md`
3. **Agregar componentes UBITS** → Debe consultar `CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
4. **Modificar `.content-area`** → Debe consultar `GUIA-CONTENTMANAGER-UPDATECONTENT.md`
5. **Agregar estilos a componentes** → Debe consultar `GUIA-NO-AGREGAR-ESTILOS-EXTRA-COMPONENTES.md`

---

## 🔍 DETECCIÓN AUTOMÁTICA

### **Patrones Detectados:**

```typescript
// Operación: Eliminar HeaderSection
const patterns = {
  removeHeaderSection: [
    /header-section-container/i,
    /\.ubits-header-section/i,
    /headerSection/i,
    /eliminar.*header/i,
    /quitar.*header/i,
  ],
  
  interceptContentManager: [
    /ContentManager\.updateContent/i,
    /UBITS_ContentManager/i,
    /intercept.*ContentManager/i,
    /content-manager\.js/i,
  ],
  
  modifyContentArea: [
    /\.content-area/i,
    /contentArea/i,
    /content-area\.innerHTML/i,
  ],
  
  addComponent: [
    /window\.create(DataTable|Tabs|Button)/i,
    /createComponent/i,
    /ubits-(data-table|tabs|button)/i,
  ],
  
  addStylesToComponent: [
    /\.style\.cssText.*margin-top/i,
    /\.style\.cssText.*padding/i,
    /container\.style\./i,
  ],
};
```

---

## 🚨 BLOQUEO AUTOMÁTICO

### **Flujo de Bloqueo:**

```
1. Detectar operación en el código
   ↓
2. Identificar guía obligatoria
   ↓
3. Verificar si se consultó la guía
   ↓
4. Si NO se consultó → BLOQUEAR
   ↓
5. Mostrar mensaje con guía obligatoria
   ↓
6. Esperar a que se consulte la guía
   ↓
7. Verificar nuevamente
   ↓
8. Si se consultó → PERMITIR
```

---

## 📋 IMPLEMENTACIÓN

### **1. Mejorar PreWriteValidator**

```typescript
// En PreWriteValidator.ts
private static async detectCommonOperations(
  content: string,
  filePath: string
): Promise<OperationDetection[]> {
  const operations: OperationDetection[] = [];
  
  // Detectar eliminar HeaderSection
  if (this.matchesPattern(content, patterns.removeHeaderSection)) {
    operations.push({
      operation: 'removeHeaderSection',
      requiredGuide: 'docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md',
      severity: 'critical',
      message: '⚠️ CRÍTICO: Debes consultar GUIA-ELIMINAR-HEADERSECTION.md antes de eliminar HeaderSection',
    });
  }
  
  // Detectar interceptar ContentManager
  if (this.matchesPattern(content, patterns.interceptContentManager)) {
    operations.push({
      operation: 'interceptContentManager',
      requiredGuide: 'docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md',
      severity: 'critical',
      message: '⚠️ CRÍTICO: Debes consultar GUIA-CONTENTMANAGER-UPDATECONTENT.md antes de interceptar ContentManager',
    });
  }
  
  // ... más operaciones
  
  return operations;
}
```

### **2. Verificar Guías Consultadas**

```typescript
private static async verifyRequiredGuides(
  operations: OperationDetection[]
): Promise<ValidationResult> {
  const errors: string[] = [];
  
  for (const operation of operations) {
    const guideWasRead = await this.checkGuideWasRead(operation.requiredGuide);
    
    if (!guideWasRead) {
      errors.push(operation.message);
      errors.push(`   📚 Guía obligatoria: ${operation.requiredGuide}`);
      errors.push(`   ⚠️ BLOQUEADO hasta consultar la guía`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings: [],
  };
}
```

### **3. Sistema de Tracking de Guías Consultadas**

```typescript
// En un archivo de tracking
const guidesRead = new Set<string>();

export function markGuideAsRead(guidePath: string): void {
  guidesRead.add(guidePath);
  console.log(`✅ [Guide Tracker] Guía consultada: ${guidePath}`);
}

export function checkGuideWasRead(guidePath: string): boolean {
  return guidesRead.has(guidePath);
}
```

---

## 📚 GUÍAS OBLIGATORIAS POR OPERACIÓN

### **Operación: Eliminar HeaderSection**

**Guía obligatoria:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`

**Checklist:**
- [ ] ¿Eliminé el CSS de HeaderSection del HTML?
- [ ] ¿Eliminé los estilos CSS de `#header-section-container`?
- [ ] ¿Intercepté `ContentManager.updateContent` INMEDIATAMENTE después de cargar content-manager.js?
- [ ] ¿Usé `requestAnimationFrame` para timing correcto?
- [ ] ¿Eliminé TODOS los elementos relacionados?
- [ ] ¿Configuré MutationObserver agresivo?
- [ ] ¿Verifiqué el módulo antes de eliminar?

### **Operación: Interceptar ContentManager**

**Guía obligatoria:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`

**Checklist:**
- [ ] ¿Leí la guía completa de ContentManager?
- [ ] ¿Entendí cómo funciona `updateContent`?
- [ ] ¿Intercepté ANTES de agregar elementos al DOM?
- [ ] ¿Guardé elementos personalizados antes de `updateContent`?
- [ ] ¿Restauré elementos después de `updateContent`?
- [ ] ¿Verifiqué módulo/sección antes de preservar?

### **Operación: Agregar Componente UBITS**

**Guía obligatoria:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`

**Checklist:**
- [ ] ¿Consulté Storybook en Vercel?
- [ ] ¿Consulté Storybook MCP?
- [ ] ¿Consulté documentación específica?
- [ ] ¿Verifiqué formato de iconos?
- [ ] ¿Verifiqué que NO se agreguen estilos extra?

---

## 🔄 FLUJO MEJORADO

### **ANTES (Actual):**
```
1. Usuario pide eliminar header-section
2. Agente elimina HTML estático
3. ❌ NO intercepta ContentManager
4. ❌ HeaderSection vuelve a aparecer
```

### **DESPUÉS (Mejorado):**
```
1. Usuario pide eliminar header-section
2. Sistema detecta operación "removeHeaderSection"
3. Sistema verifica si se consultó GUIA-ELIMINAR-HEADERSECTION.md
4. ❌ NO se consultó → BLOQUEAR
5. Mostrar mensaje: "⚠️ Debes consultar GUIA-ELIMINAR-HEADERSECTION.md primero"
6. Agente consulta la guía
7. Sistema marca guía como consultada
8. ✅ Verificación pasa → PERMITIR
9. Agente implementa solución completa
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### **Para el Sistema:**
- [ ] Crear `OperationDetector` que detecta operaciones comunes
- [ ] Mejorar `PreWriteValidator` para usar `OperationDetector`
- [ ] Crear sistema de tracking de guías consultadas
- [ ] Agregar verificaciones específicas por operación
- [ ] Mejorar mensajes de error con guías obligatorias

### **Para las Reglas:**
- [ ] Actualizar `.cursorrules` con lista de operaciones comunes
- [ ] Agregar sección "Operaciones Comunes y Guías Obligatorias"
- [ ] Mejorar `.cursor/rules/04-implementacion.md` con detección automática

---

## 🎯 RESULTADO ESPERADO

**Con este sistema:**
- ✅ El agente SIEMPRE consulta las guías obligatorias antes de implementar
- ✅ El sistema BLOQUEA automáticamente si no se consultan las guías
- ✅ Los mensajes de error son CLAROS y ESPECÍFICOS
- ✅ Se previenen errores ya documentados
- ✅ El proceso es AUTOMÁTICO y OBLIGATORIO

---

## 🔗 Referencias

- **Pre-Implementation Check:** `docs/guias/implementacion/GUIA-USO-PRE-IMPLEMENTATION-CHECK.md`
- **PreWriteValidator:** `packages/autorun-core/src/validation/PreWriteValidator.ts`
- **Guía eliminar HeaderSection:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`
- **Guía ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`

---

**Última actualización:** 2025-01-11  
**Estado:** 📋 Propuesta de Mejora























































































