# ✅ Progreso: Eliminar Hardcodeo - Extraer Todo desde Storybook

**Fecha:** 2025-01-24  
**Estado:** 🚧 **EN PROGRESO** - FASE 1 Implementada

---

## ✅ FASE 1: Mapeos Dinámicos - IMPLEMENTADA

### **Archivos Creados:**
1. ✅ `packages/autorun-core/src/helpers/storybookDynamicMapper.ts`
   - Extrae mapeos desde `index.json` de Storybook
   - Genera mapeos: ID → Nombre, Nombre → ID, Variaciones
   - Sistema de cache (1 hora)
   - Métodos: `storybookIdToComponentName()`, `componentNameToStorybookId()`, `getAllMappings()`

### **Archivos Modificados:**
1. ✅ `packages/autorun-core/src/helpers/storybookMCPNameMapper.ts`
   - Funciones ahora son `async`
   - Usan `StorybookDynamicMapper` como prioridad
   - Fallback a mapeos hardcodeados (temporal, hasta eliminar completamente)

2. ✅ `packages/autorun-core/src/helpers/mcpWithFallback.ts`
   - Actualizado para usar `await storybookIdToComponentName()`

3. ✅ `packages/autorun-core/src/helpers/autoMessageHandler.ts`
   - Actualizado para usar `await storybookIdToComponentName()`

4. ✅ `packages/autorun-core/src/helpers/storybookMCPAutoCaller.ts`
   - Actualizado para usar `await storybookIdToComponentName()`

5. ✅ `packages/autorun-core/src/helpers/executeOnMessageStart.ts`
   - Actualizado para usar `await storybookIdToComponentName()`

---

## ✅ FASE 2: Patrones Dinámicos - IMPLEMENTADA

### **Archivos Creados:**
1. ✅ `packages/autorun-core/src/helpers/dynamicPatternGenerator.ts`
   - Genera patrones de detección desde nombres de componentes
   - Soporta múltiples variaciones: PascalCase, camelCase, kebab-case, español
   - Sistema de prioridad (componentes específicos primero)
   - Sistema de cache (1 hora)
   - Método: `detectComponentFromMessage()`

---

## 📋 Pendiente

### **FASE 3: Clases CSS Dinámicas** ⏳ PENDIENTE
- [ ] Crear `storybookCSSExtractor.ts`
- [ ] Implementar extracción de clases CSS desde código HTML
- [ ] Modificar validadores para usar clases extraídas

### **FASE 4: Integración Completa** ⏳ PENDIENTE
- [ ] Modificar `autoMessageHandler.ts` para usar `DynamicPatternGenerator`
- [ ] Eliminar completamente mapeos hardcodeados
- [ ] Probar con múltiples componentes
- [ ] Documentar cambios

---

## 🧪 Pruebas Necesarias

1. **Probar mapeos dinámicos:**
   - RadioButton → `formularios-radio-button`
   - Button → `basicos-button`
   - Verificar que funciona sin mapeos hardcodeados

2. **Probar patrones dinámicos:**
   - "implementar radio button" → RadioButton
   - "crear botón" → Button
   - Verificar prioridad (RadioButton antes que Button)

3. **Probar extracción de clases CSS:**
   - Extraer clases desde código HTML de Storybook
   - Verificar que se usan en validadores

---

## 📊 Estado Actual

### **✅ Completado:**
- ✅ Sistema de mapeos dinámicos desde `index.json`
- ✅ Sistema de generación de patrones dinámicos
- ✅ Integración con funciones existentes (async)
- ✅ Sistema de cache

### **⏳ Pendiente:**
- ⏳ Extracción de clases CSS
- ⏳ Integración completa de patrones dinámicos en `autoMessageHandler.ts`
- ⏳ Eliminación completa de mapeos hardcodeados
- ⏳ Pruebas exhaustivas

---

## 🎯 Próximos Pasos

1. **Probar sistema actual:**
   - Verificar que mapeos dinámicos funcionan
   - Verificar que patrones dinámicos funcionan

2. **Completar FASE 3:**
   - Crear extractor de clases CSS
   - Integrar con validadores

3. **Completar FASE 4:**
   - Integrar patrones dinámicos en `autoMessageHandler.ts`
   - Eliminar mapeos hardcodeados completamente

---

**Última actualización:** 2025-01-24  
**Estado:** 🚧 **FASE 1 Y 2 COMPLETADAS** - FASE 3 Y 4 PENDIENTES

