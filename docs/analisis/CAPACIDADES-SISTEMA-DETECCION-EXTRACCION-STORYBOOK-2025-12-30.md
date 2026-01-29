# 🔍 Capacidades del Sistema: Detección y Extracción desde Storybook

> **Fecha:** 2025-12-30  
> **Objetivo:** Documentar qué puede hacer el sistema actualmente y qué limitaciones tiene

---

## ✅ SÍ: El Sistema Está Diseñado para Detectar CUALQUIER Componente de Storybook

### **1. Detección Dinámica desde `index.json`** ✅

**Cómo funciona:**
```typescript
// El sistema consulta index.json de Storybook y extrae TODOS los componentes
const mappings = await StorybookDynamicMapper.getMappingsFromStorybook();
// Retorna: { mappings: [...], idToName: {...}, nameToId: {...} }
```

**Archivo:** `packages/autorun-core/src/helpers/storybookDynamicMapper.ts`

**Lo que hace:**
- ✅ Consulta `index.json` de Storybook automáticamente
- ✅ Extrae **TODOS** los componentes disponibles (no solo los hardcodeados)
- ✅ Genera mapeos dinámicos:
  - ID → Nombre completo (ej: `"layout-simple-card"` → `"Layout/Simple Card"`)
  - Nombre completo → ID
  - Nombre corto → Nombre completo
  - PascalCase → Nombre completo (ej: `"SimpleCard"` → `"Layout/Simple Card"`)
  - camelCase → Nombre completo
  - kebab-case → Nombre completo

**Resultado:**
- ✅ **Puede detectar CUALQUIER componente** que esté en Storybook
- ✅ **NO requiere hardcodeo** de componentes
- ✅ **Se actualiza automáticamente** cuando se agregan nuevos componentes a Storybook

---

### **2. Reconocimiento por Múltiples Formatos** ✅

**Cómo funciona:**
```typescript
// El sistema reconoce componentes en múltiples formatos
const componentId = await StorybookDynamicMapper.componentNameToStorybookId('SimpleCard');
// Retorna: "layout-simple-card"

// También funciona con:
// - "Layout/Simple Card" (nombre completo)
// - "Simple Card" (nombre corto)
// - "SimpleCard" (PascalCase)
// - "simpleCard" (camelCase)
// - "simple-card" (kebab-case)
```

**Archivo:** `packages/autorun-core/src/helpers/storybookDynamicMapper.ts`

**Lo que hace:**
- ✅ Intenta múltiples formatos automáticamente
- ✅ Busca en todos los mapeos hasta encontrar coincidencia
- ✅ Retorna el ID correcto de Storybook

**Resultado:**
- ✅ **Reconoce componentes** sin importar cómo se mencionen
- ✅ **Flexible** con diferentes formatos de nombres
- ✅ **Robusto** ante variaciones de nombres

---

### **3. Búsqueda Exacta en Storybook** ✅

**Cómo funciona:**
```typescript
// El sistema busca el componente exacto en Storybook
const discovery = await discoverStorybookComponents();
// Retorna: { components: [...], totalComponents: 50+ }

// Buscar componente específico
const component = await findComponentByIdOrName('SimpleCard');
// Retorna: { componentId: 'layout-simple-card', title: 'Layout/Simple Card', stories: [...] }
```

**Archivo:** `packages/autorun-core/src/helpers/storybookIdDiscovery.ts`

**Lo que hace:**
- ✅ Consulta `index.json` de Storybook
- ✅ Parsea todas las entradas
- ✅ Extrae IDs de componentes exactos
- ✅ Extrae historias disponibles
- ✅ Valida que los IDs existen

**Resultado:**
- ✅ **Busca exactamente** el componente en Storybook
- ✅ **Valida** que el componente existe
- ✅ **Obtiene información completa** (ID, título, historias)

---

## ⚠️ PARCIAL: Extracción de Información

### **1. Extracción de Props** ⚠️ PARCIAL

**Cómo funciona:**
```typescript
// El sistema intenta extraer props de múltiples fuentes
const props = await StorybookPropsExtractorRobust.extractPropsRobust('SimpleCard');
// Retorna: { success: boolean, props: [...], sources: [...] }
```

**Archivo:** `packages/autorun-core/src/helpers/storybookPropsExtractorRobust.ts`

**Estrategias:**
1. ✅ **MCP de Storybook** - Consulta `getComponentsProps` del MCP
2. ✅ **Browser MCP** - Navega a Storybook y extrae props desde la página
3. ✅ **Código fuente TypeScript** - Parsea props desde archivos `.stories.ts`

**Limitaciones:**
- ⚠️ A veces falla si el MCP no está disponible
- ⚠️ A veces falla si el componente no tiene props documentadas
- ⚠️ A veces falla si el código fuente no está disponible

**Resultado:**
- ✅ **Puede extraer props** desde múltiples fuentes
- ⚠️ **No siempre funciona** (depende de disponibilidad de fuentes)

---

### **2. Extracción de Código** ⚠️ PARCIAL

**Cómo funciona:**
```typescript
// El sistema intenta extraer código desde Storybook
const code = await autorunStorybookExtract({
  componentName: 'SimpleCard',
  storyName: 'default'
});
// Retorna: { success: boolean, code: string, requiresBrowserMCP: boolean }
```

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunStorybookExtract.ts`

**Estrategias:**
1. ✅ **Storybook MCP** - Consulta `getComponentCode` del MCP
2. ✅ **Browser MCP** - Navega a Storybook y extrae código desde la pestaña "Code"
3. ⚠️ **Código fuente TypeScript** - Parsea código desde archivos `.stories.ts` (fallback)

**Limitaciones:**
- ⚠️ A veces falla si el MCP no está disponible
- ⚠️ A veces falla si el componente no tiene código en la pestaña "Code"
- ⚠️ A veces falla si el Browser MCP no puede navegar a Storybook

**Resultado:**
- ✅ **Puede extraer código** desde múltiples fuentes
- ⚠️ **No siempre funciona** (como vimos con SimpleCard)

---

### **3. Extracción de Metadata** ✅

**Cómo funciona:**
```typescript
// El sistema extrae metadata desde código fuente
const metadata = await extractMetadataFromStory('layout-simple-card', 'default');
// Retorna: { dependsOn: {...}, internals: [...] }
```

**Archivo:** `packages/autorun-core/src/helpers/storybookMetadataExtractor.ts`

**Lo que extrae:**
- ✅ Dependencias requeridas
- ✅ Dependencias opcionales
- ✅ Componentes internos
- ✅ Setup requerido

**Resultado:**
- ✅ **Extrae metadata** correctamente cuando está disponible en el código fuente

---

### **4. Extracción de Variantes y Tipos** ✅

**Cómo funciona:**
```typescript
// El sistema extrae variantes y tipos dinámicamente
const variants = await DynamicVariantExtractor.extractVariants('layout-simple-card', 'SimpleCard');
const types = await DynamicTypeExtractor.extractTypes('layout-simple-card', 'SimpleCard');
```

**Archivos:**
- `packages/autorun-core/src/helpers/dynamicVariantExtractor.ts`
- `packages/autorun-core/src/helpers/dynamicTypeExtractor.ts`

**Lo que extrae:**
- ✅ Variantes disponibles (ej: `default`, `elevated`, `bordered`, `flat`)
- ✅ Tipos disponibles (ej: `sm`, `md`, `lg`, `xl`)
- ✅ Props por variante/tipo

**Resultado:**
- ✅ **Extrae variantes y tipos** dinámicamente desde Storybook

---

## ❌ NO: Extracción Completa y Automática

### **Problemas Actuales:**

1. **Extracción de Código Falla a Veces** ❌
   - ❌ A veces no puede extraer código desde Storybook
   - ❌ A veces requiere intervención manual del agente
   - ❌ A veces falla si el Browser MCP no está disponible

2. **Extracción de Props Falla a Veces** ❌
   - ❌ A veces no puede extraer props desde Storybook
   - ❌ A veces requiere consultar múltiples fuentes
   - ❌ A veces falla si el MCP no está disponible

3. **No Extrae Todo Automáticamente** ❌
   - ❌ No extrae API del componente automáticamente
   - ❌ No extrae best practices automáticamente
   - ❌ No extrae ejemplos del mundo real automáticamente
   - ❌ No extrae setup requerido automáticamente

---

## 📊 Resumen: ¿Qué Puede Hacer el Sistema?

| Funcionalidad | Estado | Detalles |
|---------------|--------|----------|
| **Detectar cualquier componente** | ✅ **SÍ** | Extrae dinámicamente desde `index.json` |
| **Reconocer por múltiples formatos** | ✅ **SÍ** | Nombre completo, corto, PascalCase, camelCase, kebab-case |
| **Buscar exactamente en Storybook** | ✅ **SÍ** | Consulta `index.json` y valida existencia |
| **Extraer props** | ⚠️ **PARCIAL** | Funciona pero a veces falla |
| **Extraer código** | ⚠️ **PARCIAL** | Funciona pero a veces falla |
| **Extraer metadata** | ✅ **SÍ** | Cuando está disponible en código fuente |
| **Extraer variantes/tipos** | ✅ **SÍ** | Dinámicamente desde Storybook |
| **Extraer API** | ❌ **NO** | No implementado |
| **Extraer best practices** | ❌ **NO** | No implementado |
| **Extraer ejemplos** | ❌ **NO** | No implementado |
| **Extraer setup** | ⚠️ **PARCIAL** | Solo desde metadata en código fuente |

---

## 🎯 Conclusión

### **✅ SÍ: El Sistema Está Diseñado para:**
1. ✅ **Detectar CUALQUIER componente** de Storybook (dinámicamente)
2. ✅ **Reconocer componentes** por múltiples formatos
3. ✅ **Buscar exactamente** en Storybook
4. ✅ **Extraer información básica** (props, código, metadata, variantes, tipos)

### **⚠️ PARCIAL: El Sistema Puede:**
1. ⚠️ **Extraer props** (pero a veces falla)
2. ⚠️ **Extraer código** (pero a veces falla)
3. ⚠️ **Extraer setup** (solo desde metadata en código fuente)

### **❌ NO: El Sistema NO Puede:**
1. ❌ **Extraer API** del componente automáticamente
2. ❌ **Extraer best practices** automáticamente
3. ❌ **Extraer ejemplos** del mundo real automáticamente
4. ❌ **Garantizar extracción completa** (a veces falla)

---

## 🔧 Mejoras Necesarias

### **1. Mejorar Extracción de Código** 🔴 CRÍTICO
- ✅ Implementar fallbacks más robustos
- ✅ Mejorar manejo de errores
- ✅ Agregar más estrategias de extracción

### **2. Mejorar Extracción de Props** 🔴 CRÍTICO
- ✅ Implementar fallbacks más robustos
- ✅ Mejorar manejo de errores
- ✅ Agregar más estrategias de extracción

### **3. Implementar Extracción de API** 🟡 VALIOSO
- ✅ Extraer métodos del componente
- ✅ Extraer firmas de métodos
- ✅ Extraer parámetros

### **4. Implementar Extracción de Best Practices** 🟡 VALIOSO
- ✅ Extraer guías desde documentación
- ✅ Extraer valores por defecto recomendados
- ✅ Extraer patrones de uso

---

**Última actualización:** 2025-12-30  
**Versión:** 1.0.0
