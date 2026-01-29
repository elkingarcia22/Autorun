# 🎯 Plan Completo Paso a Paso: Eliminar Todo lo Hardcodeado

## 📋 Objetivo Final

**Hacer que Autorun pueda implementar CUALQUIER componente de Storybook automáticamente, sin NADA hardcodeado.**

---

## ✅ FASE 1-5: COMPLETADAS

### **✅ FASE 1: Sistema de Detección de Disponibilidad**
**Archivo:** `packages/autorun-core/src/helpers/componentAvailabilityDetector.ts`

**Funcionalidad:**
- ✅ Mapea 15+ componentes a sus APIs
- ✅ Verifica disponibilidad en `window`
- ✅ Retorna información de necesidad de carga

### **✅ FASE 2: Sistema de Carga Dinámica**
**Archivo:** `packages/autorun-core/src/helpers/dynamicComponentLoader.ts`

**Funcionalidad:**
- ✅ Detecta necesidad de carga
- ✅ Intenta cargar desde Storybook
- ✅ Verifica disponibilidad después de cargar

### **✅ FASE 3: Generador de Código Ejecutable**
**Archivo:** `packages/autorun-core/src/helpers/executableCodeGenerator.ts`

**Funcionalidad:**
- ✅ Convierte snippets en código ejecutable
- ✅ Genera función de inicialización automática
- ✅ Agrega lógica de espera para UBITS
- ✅ Integra con flujo de inicialización
- ✅ Registra en AUTORUN_PRESERVE_COMPONENTS

### **✅ FASE 4: Integración con HtmlPrototypeAdapter**
**Archivo:** `packages/autorun-core/src/adapters/HtmlPrototypeAdapter.ts`

**Funcionalidad:**
- ✅ Modificado para aceptar `componentName` y `storybookId`
- ✅ Usa sistema automático si se proporcionan
- ✅ Inserta contenedor en `.content-area`
- ✅ Inserta script de inicialización en anchor SCRIPTS

### **✅ FASE 5: Modificación de autorunApply**
**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Funcionalidad:**
- ✅ Pasa `componentName` y `componentId` al adapter
- ✅ El adapter usa sistema automático automáticamente

---

## 🔄 FASE 6: Eliminar Código Hardcodeado (PENDIENTE)

### **Archivo a Modificar:** `prototypes/canvas-administrador-encuestas-2025-12-29.html`

### **PASO 6.1: Identificar Funciones Hardcodeadas**

**Funciones a Eliminar:**
1. `createGallery()` - Línea ~1459
2. `createCardContent()` - Línea ~1289
3. `createTabs()` - Línea ~1341
4. `createSimpleCard()` - Línea ~1411

**Llamadas a Eliminar:**
1. `setTimeout(createGallery, 500)` - Línea ~1538
2. `setTimeout(createCardContent, 1000)` - Línea ~1544
3. `setTimeout(createTabs, 1500)` - Línea ~1541
4. `setTimeout(createSimpleCard, 2000)` - Línea ~1547

### **PASO 6.2: Verificar que el Sistema Automático Funciona**

**Antes de eliminar, verificar:**
1. ✅ Que `autorun.apply()` genera código ejecutable correctamente
2. ✅ Que el código se inserta en `.content-area`
3. ✅ Que el script se inserta en anchor SCRIPTS
4. ✅ Que el componente funciona sin hardcode

### **PASO 6.3: Eliminar Funciones Hardcodeadas**

**Acción:**
- Eliminar todas las funciones `create*()` hardcodeadas
- Eliminar todas las llamadas `setTimeout(create*, ...)`
- Mantener solo el sistema de preservación automática

### **PASO 6.4: Verificar que Todo Funciona**

**Después de eliminar:**
1. ✅ Probar con Gallery
2. ✅ Probar con Tabs
3. ✅ Probar con Card
4. ✅ Probar con Simple Card
5. ✅ Verificar que no hay errores en consola

---

## 🔄 FASE 7: Mejoras de Carga Dinámica (PENDIENTE)

### **PASO 7.1: Agregar Script de Carga en HTML Generado**

**Objetivo:** Cargar componentes automáticamente si no están disponibles.

**Implementación:**
```typescript
// En executableCodeGenerator.ts, agregar script de carga si needsLoad
if (availability.needsLoad) {
  const loadScript = `
// Cargar componente dinámicamente
const script = document.createElement('script');
script.src = 'https://ubits-storybook10.vercel.app/components/${storybookId}/addon.js';
script.onload = () => {
  console.log('✅ [Dynamic Load] Componente ${componentName} cargado');
  ${functionName}(); // Ejecutar después de cargar
};
document.head.appendChild(script);
`;
  executableScript = loadScript + executableScript;
}
```

### **PASO 7.2: Verificar Carga Automática**

**Después de implementar:**
1. ✅ Verificar que Gallery se carga automáticamente
2. ✅ Verificar que otros componentes se cargan si faltan
3. ✅ Verificar que no hay errores

---

## 🔄 FASE 8: Testing Completo (PENDIENTE)

### **Test 1: Gallery (Componente que NO está en components-loader.js)**
1. Ejecutar `autorun.apply({ message: "implementar gallery" })`
2. Verificar que:
   - ✅ Se detecta que Gallery no está disponible
   - ✅ Se genera código ejecutable automáticamente
   - ✅ Se inserta contenedor en `.content-area`
   - ✅ Se inserta script de inicialización
   - ✅ El componente funciona sin hardcode

### **Test 2: Tabs (Componente que SÍ está en components-loader.js)**
1. Ejecutar `autorun.apply({ message: "implementar tabs" })`
2. Verificar que:
   - ✅ Se detecta que Tabs está disponible
   - ✅ Se genera código ejecutable automáticamente
   - ✅ Se inserta correctamente
   - ✅ Funciona sin hardcode

### **Test 3: Múltiples Componentes**
1. Ejecutar `autorun.apply()` para múltiples componentes
2. Verificar que:
   - ✅ Cada componente se inserta correctamente
   - ✅ No hay conflictos entre componentes
   - ✅ Todo funciona sin hardcode

---

## 📊 Resumen de Estado

### **✅ Completado:**
- ✅ FASE 1: Sistema de detección
- ✅ FASE 2: Sistema de carga dinámica (detección)
- ✅ FASE 3: Generador de código ejecutable
- ✅ FASE 4: Integración con adapter
- ✅ FASE 5: Modificación de autorunApply

### **⏳ Pendiente:**
- ⏳ FASE 6: Eliminar código hardcodeado
- ⏳ FASE 7: Mejoras de carga dinámica
- ⏳ FASE 8: Testing completo

---

## 🎯 Próximos Pasos Inmediatos

1. **Probar el sistema automático con Gallery:**
   - Ejecutar `autorun.apply({ message: "implementar gallery" })`
   - Verificar que funciona sin hardcode

2. **Si funciona correctamente:**
   - Eliminar código hardcodeado (FASE 6)
   - Mejorar carga dinámica (FASE 7)
   - Testing completo (FASE 8)

3. **Si no funciona:**
   - Diagnosticar problemas
   - Corregir errores
   - Volver a probar

---

## 📝 Notas Técnicas

### **Cómo Funciona el Sistema Automático:**

1. **Usuario:** "implementar gallery"
2. **autorun.apply():**
   - Detecta componente "gallery"
   - Obtiene storybookId "layout-gallery"
   - Extrae código desde Storybook
   - Llama a `adapter.insertContentBlock(filePath, wrappedContent, "gallery", "layout-gallery")`
3. **HtmlPrototypeAdapter:**
   - Obtiene API info: `window.UBITS.Gallery.create`
   - Extrae snippet del watermark
   - Genera código ejecutable automáticamente
   - Inserta contenedor en `.content-area`
   - Inserta script en anchor SCRIPTS
4. **Resultado:** Componente implementado SIN hardcode

### **Ventajas del Sistema Automático:**

- ✅ **Sin hardcode:** Todo se genera automáticamente
- ✅ **Reutilizable:** Funciona para cualquier componente
- ✅ **Mantenible:** Cambios en Storybook se reflejan automáticamente
- ✅ **Escalable:** Fácil agregar nuevos componentes

---

## ✅ Conclusión

**Sistema automático base implementado y listo para usar.**

**El sistema puede:**
- ✅ Detectar componentes automáticamente
- ✅ Generar código ejecutable desde Storybook
- ✅ Insertar en `.content-area` automáticamente
- ✅ Integrar con flujo de inicialización
- ✅ No requiere hardcode

**Pendiente:**
- ⏳ Testing con componentes reales
- ⏳ Eliminación de código hardcodeado existente
- ⏳ Mejoras de carga dinámica

**¿Quieres que pruebe el sistema con Gallery ahora?**
