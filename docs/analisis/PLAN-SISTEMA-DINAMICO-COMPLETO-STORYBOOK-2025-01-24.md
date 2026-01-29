# 📋 Plan: Sistema Dinámico Completo para TODOS los Componentes de Storybook

**Fecha:** 2025-01-24  
**Objetivo:** Hacer que el sistema funcione perfectamente para TODOS los componentes de Storybook sin hardcodeo  
**Estado:** 📋 **PLAN** - Por implementar

---

## 🎯 Problema Actual

**Hardcodeo existente:**
- ❌ `IntelligentComponentParser` tiene componentes hardcodeados
- ❌ Variantes conocidas hardcodeadas por componente
- ❌ Propiedades conocidas hardcodeadas por componente
- ❌ Mapeo de nombres a IDs parcialmente hardcodeado

**Resultado:**
- ❌ Solo funciona para componentes conocidos
- ❌ No funciona para componentes nuevos
- ❌ No detecta variantes/propiedades de componentes desconocidos

---

## ✅ Solución: Sistema 100% Dinámico

### **FASE 1: Extracción Dinámica de Componentes** ⭐ PRIORIDAD ALTA

**Objetivo:** Extraer TODOS los componentes desde Storybook dinámicamente

**Implementación:**
1. ✅ **Ya tenemos:** `StorybookDynamicMapper` - Extrae componentes desde `index.json`
2. ⚠️ **Mejorar:** Usar `StorybookDynamicMapper` en `IntelligentComponentParser`
3. ⚠️ **Nuevo:** Cachear lista de componentes para acceso rápido

**Archivos a modificar:**
- `packages/autorun-core/src/helpers/intelligentComponentParser.ts`
  - Reemplazar detección hardcodeada con `StorybookDynamicMapper.getAllComponentNames()`
  - Usar mapeo dinámico para nombres → IDs

**Resultado:**
- ✅ Detecta TODOS los componentes de Storybook automáticamente
- ✅ No requiere actualización manual cuando se agregan componentes

---

### **FASE 2: Extracción Dinámica de Variantes** ⭐ PRIORIDAD ALTA

**Objetivo:** Extraer variantes desde las props del componente en Storybook

**Implementación:**
1. ⚠️ **Nuevo:** `DynamicVariantExtractor` - Extrae variantes desde props
2. ⚠️ **Nuevo:** Consultar Storybook MCP para obtener props del componente
3. ⚠️ **Nuevo:** Analizar props para detectar variantes (ej: `variant: 'primary' | 'secondary' | 'tertiary'`)

**Archivos a crear:**
- `packages/autorun-core/src/helpers/dynamicVariantExtractor.ts`
  ```typescript
  export class DynamicVariantExtractor {
    static async extractVariants(componentId: string): Promise<string[]> {
      // 1. Consultar Storybook MCP para obtener props
      // 2. Buscar prop "variant" o similar
      // 3. Extraer valores posibles (primary, secondary, tertiary, etc.)
      // 4. Retornar lista de variantes
    }
  }
  ```

**Archivos a modificar:**
- `packages/autorun-core/src/helpers/intelligentComponentParser.ts`
  - Reemplazar `COMPONENT_VARIANTS` hardcodeado con `DynamicVariantExtractor.extractVariants()`
  - Cachear variantes por componente

**Resultado:**
- ✅ Detecta variantes de TODOS los componentes automáticamente
- ✅ No requiere hardcodeo de variantes

---

### **FASE 3: Extracción Dinámica de Propiedades** ⭐ PRIORIDAD ALTA

**Objetivo:** Extraer propiedades desde las props del componente en Storybook

**Implementación:**
1. ⚠️ **Nuevo:** `DynamicPropertyExtractor` - Extrae propiedades desde props
2. ⚠️ **Nuevo:** Analizar props para detectar propiedades booleanas (ej: `iconOnly`, `disabled`, `loading`)
3. ⚠️ **Nuevo:** Analizar props para detectar propiedades de texto (ej: `label`, `placeholder`)

**Archivos a crear:**
- `packages/autorun-core/src/helpers/dynamicPropertyExtractor.ts`
  ```typescript
  export class DynamicPropertyExtractor {
    static async extractProperties(componentId: string): Promise<string[]> {
      // 1. Consultar Storybook MCP para obtener props
      // 2. Buscar props booleanas (iconOnly, disabled, loading, etc.)
      // 3. Buscar props de texto (label, placeholder, etc.)
      // 4. Retornar lista de propiedades con sus tipos
    }
  }
  ```

**Archivos a modificar:**
- `packages/autorun-core/src/helpers/intelligentComponentParser.ts`
  - Reemplazar `COMPONENT_PROPERTIES` hardcodeado con `DynamicPropertyExtractor.extractProperties()`
  - Cachear propiedades por componente

**Resultado:**
- ✅ Detecta propiedades de TODOS los componentes automáticamente
- ✅ No requiere hardcodeo de propiedades

---

### **FASE 4: Extracción Dinámica de Tipos** ⭐ PRIORIDAD MEDIA

**Objetivo:** Extraer tipos específicos desde las props del componente (ej: Input type="calendar")

**Implementación:**
1. ⚠️ **Nuevo:** `DynamicTypeExtractor` - Extrae tipos desde props
2. ⚠️ **Nuevo:** Analizar prop `type` para detectar valores posibles (ej: `'text' | 'email' | 'calendar' | 'select'`)

**Archivos a crear:**
- `packages/autorun-core/src/helpers/dynamicTypeExtractor.ts`
  ```typescript
  export class DynamicTypeExtractor {
    static async extractTypes(componentId: string): Promise<string[]> {
      // 1. Consultar Storybook MCP para obtener props
      // 2. Buscar prop "type" o similar
      // 3. Extraer valores posibles (text, email, calendar, select, etc.)
      // 4. Retornar lista de tipos
    }
  }
  ```

**Archivos a modificar:**
- `packages/autorun-core/src/helpers/intelligentComponentParser.ts`
  - Usar `DynamicTypeExtractor.extractTypes()` para detectar tipos
  - Cachear tipos por componente

**Resultado:**
- ✅ Detecta tipos de TODOS los componentes automáticamente
- ✅ Funciona para Input, Select, y cualquier componente con prop `type`

---

### **FASE 5: Sistema de Caché Inteligente** ⭐ PRIORIDAD MEDIA

**Objetivo:** Cachear información extraída para mejorar rendimiento

**Implementación:**
1. ⚠️ **Nuevo:** `ComponentMetadataCache` - Cachea variantes, propiedades, tipos
2. ⚠️ **Nuevo:** Invalidar cache cuando Storybook se actualiza
3. ⚠️ **Nuevo:** Cache persistente en archivo para reutilizar entre sesiones

**Archivos a crear:**
- `packages/autorun-core/src/helpers/componentMetadataCache.ts`
  ```typescript
  export class ComponentMetadataCache {
    private static cache: Map<string, ComponentMetadata> = new Map();
    
    static async getMetadata(componentId: string): Promise<ComponentMetadata> {
      // 1. Verificar cache
      // 2. Si no existe, extraer desde Storybook
      // 3. Guardar en cache
      // 4. Retornar metadata
    }
    
    static invalidate(componentId?: string): void {
      // Invalidar cache (todo o específico)
    }
  }
  ```

**Resultado:**
- ✅ Mejor rendimiento (no consulta Storybook cada vez)
- ✅ Cache persistente entre sesiones

---

### **FASE 6: Integración Completa** ⭐ PRIORIDAD ALTA

**Objetivo:** Integrar todo el sistema dinámico en el flujo completo

**Implementación:**
1. ⚠️ **Modificar:** `IntelligentComponentParser` para usar extractores dinámicos
2. ⚠️ **Modificar:** `autoMessageHandler` para usar parser dinámico
3. ⚠️ **Modificar:** `autorun.apply` para usar información dinámica

**Flujo completo:**
```
Usuario: "implementa un button terciario solo icono"
↓
IntelligentComponentParser.parse()
  ↓
1. StorybookDynamicMapper → Componente base: "Button"
2. DynamicVariantExtractor → Variantes: ["primary", "secondary", "tertiary"]
3. DynamicPropertyExtractor → Propiedades: ["iconOnly", "disabled", "loading"]
4. DynamicTypeExtractor → Tipos: [] (Button no tiene tipos)
↓
ParsedComponent {
  componentName: "Button",
  variant: "tertiary",
  properties: ["iconOnly"]
}
↓
Buscar en Storybook: "Button" con filtros variant="tertiary", properties=["iconOnly"]
```

**Resultado:**
- ✅ Sistema completamente dinámico
- ✅ Funciona para TODOS los componentes de Storybook
- ✅ No requiere hardcodeo

---

## 📊 Comparación: Antes vs Después

### **Antes (Hardcodeado):**
```
Componentes soportados: ~10 (hardcodeados)
Variantes conocidas: Hardcodeadas por componente
Propiedades conocidas: Hardcodeadas por componente
Tipos conocidos: Hardcodeados por componente

❌ No funciona para componentes nuevos
❌ Requiere actualización manual
❌ Limitado a componentes conocidos
```

### **Después (Dinámico):**
```
Componentes soportados: TODOS (extraídos desde Storybook)
Variantes conocidas: Extraídas dinámicamente desde props
Propiedades conocidas: Extraídas dinámicamente desde props
Tipos conocidos: Extraídos dinámicamente desde props

✅ Funciona para TODOS los componentes
✅ No requiere actualización manual
✅ Se adapta automáticamente a nuevos componentes
```

---

## 🎯 Prioridades de Implementación

### **FASE 1: Extracción Dinámica de Componentes** ⭐ PRIORIDAD ALTA
- **Tiempo estimado:** 2-3 horas
- **Impacto:** Alto - Base para todo el sistema
- **Dependencias:** Ninguna (ya tenemos StorybookDynamicMapper)

### **FASE 2: Extracción Dinámica de Variantes** ⭐ PRIORIDAD ALTA
- **Tiempo estimado:** 3-4 horas
- **Impacto:** Alto - Resuelve problema principal
- **Dependencias:** FASE 1

### **FASE 3: Extracción Dinámica de Propiedades** ⭐ PRIORIDAD ALTA
- **Tiempo estimado:** 3-4 horas
- **Impacto:** Alto - Resuelve problema principal
- **Dependencias:** FASE 1

### **FASE 4: Extracción Dinámica de Tipos** ⭐ PRIORIDAD MEDIA
- **Tiempo estimado:** 2-3 horas
- **Impacto:** Medio - Mejora para componentes con tipos
- **Dependencias:** FASE 1

### **FASE 5: Sistema de Caché Inteligente** ⭐ PRIORIDAD MEDIA
- **Tiempo estimado:** 2-3 horas
- **Impacto:** Medio - Mejora rendimiento
- **Dependencias:** FASE 2, 3, 4

### **FASE 6: Integración Completa** ⭐ PRIORIDAD ALTA
- **Tiempo estimado:** 2-3 horas
- **Impacto:** Alto - Integra todo el sistema
- **Dependencias:** FASE 1, 2, 3, 4, 5

**Tiempo total estimado:** 14-20 horas

---

## ✅ Verificaciones

### **✅ Extracción Dinámica:**
- [ ] Todos los componentes extraídos desde Storybook
- [ ] Variantes extraídas dinámicamente desde props
- [ ] Propiedades extraídas dinámicamente desde props
- [ ] Tipos extraídos dinámicamente desde props

### **✅ Sistema de Caché:**
- [ ] Cache de componentes
- [ ] Cache de variantes
- [ ] Cache de propiedades
- [ ] Cache de tipos
- [ ] Invalidación automática

### **✅ Integración:**
- [ ] IntelligentComponentParser usa extractores dinámicos
- [ ] autoMessageHandler usa parser dinámico
- [ ] autorun.apply usa información dinámica

---

## 📚 Archivos a Crear/Modificar

### **Nuevos:**
1. `packages/autorun-core/src/helpers/dynamicVariantExtractor.ts`
2. `packages/autorun-core/src/helpers/dynamicPropertyExtractor.ts`
3. `packages/autorun-core/src/helpers/dynamicTypeExtractor.ts`
4. `packages/autorun-core/src/helpers/componentMetadataCache.ts`

### **Modificar:**
1. `packages/autorun-core/src/helpers/intelligentComponentParser.ts`
   - Reemplazar hardcodeo con extractores dinámicos
2. `packages/autorun-core/src/helpers/autoMessageHandler.ts`
   - Usar parser dinámico mejorado
3. `packages/autorun-core/src/helpers/storybookDynamicMapper.ts`
   - Mejorar para incluir más información

---

## 🧪 Pruebas

### **Prueba 1: Componente Conocido**
```
Input: "implementa un button terciario solo icono"
Esperado: Detecta Button, variant="tertiary", property="iconOnly"
```

### **Prueba 2: Componente Nuevo**
```
Input: "implementa un nuevo-componente variante-x propiedad-y"
Esperado: Detecta "nuevo-componente", variant="variante-x", property="propiedad-y"
```

### **Prueba 3: Componente con Tipos**
```
Input: "implementa un input calendar"
Esperado: Detecta Input, type="calendar"
```

---

## ✅ Conclusión

**Sistema completamente dinámico:**
- ✅ Extrae TODOS los componentes desde Storybook
- ✅ Extrae variantes dinámicamente desde props
- ✅ Extrae propiedades dinámicamente desde props
- ✅ Extrae tipos dinámicamente desde props
- ✅ Sistema de caché para mejor rendimiento
- ✅ No requiere hardcodeo

**El sistema funcionará perfectamente para TODOS los componentes de Storybook, sin importar cuántos se agreguen o modifiquen.**

---

**Última actualización:** 2025-01-24  
**Estado:** 📋 **PLAN** - Listo para implementar


