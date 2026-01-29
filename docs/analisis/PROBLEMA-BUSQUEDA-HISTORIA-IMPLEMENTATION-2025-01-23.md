# Problema: autorun.apply() no busca correctamente la historia "implementation"

## 🔍 Problema Identificado

El usuario reporta que `autorun.apply()` no está buscando correctamente en Storybook. Específicamente:

1. **No busca la historia "implementation"**: Hay una historia específica `básicos-button--implementation` que contiene todos los componentes con sus props, pero `autorun.apply()` no la está encontrando.

2. **Solo va a una historia**: `autorun.apply()` está yendo directamente a la historia "default" sin buscar primero si existe "implementation".

3. **No extrae código correctamente**: Aunque encuentre la historia, no está extrayendo el código correctamente desde la pestaña "Code" de Storybook.

## ✅ Soluciones Implementadas

### 1. Mejora de `findImplementationStory()`

**Archivo:** `packages/autorun-core/src/helpers/codePropsCombiner.ts`

**Cambios:**
- ✅ Búsqueda en 3 niveles de prioridad:
  1. Nombre exacto "implementation"
  2. Nombres que contengan "implementation" o "copy-paste"
  3. ID completo (ej: `básicos-button--implementation`)
- ✅ Verificación directa de URL: Si no encuentra la historia en la lista, intenta verificar directamente si la URL existe haciendo un `fetch HEAD` a `${componentId}--implementation`
- ✅ Logs mejorados: Muestra todas las historias disponibles y qué historia se seleccionó

### 2. Mejora de `extractExactCodeFromStorybookWithBrowser()`

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Cambios:**
- ✅ Búsqueda automática de "implementation": Si `storyName` es "default", intenta buscar primero "implementation" antes de usar "default"
- ✅ Logs mejorados: Muestra qué historia final se está usando

## 🔧 Cómo Funciona Ahora

### Flujo Mejorado:

1. **`autorun.apply()` llama a `findImplementationStory()`**:
   ```
   storyName = await findImplementationStory(componentId);
   ```

2. **`findImplementationStory()` busca en 3 niveles**:
   - Busca en la lista de historias obtenidas desde `index.json`
   - Si no encuentra, verifica directamente si existe la URL
   - Retorna "implementation" si existe, o "default" si no

3. **`extractExactCodeFromStorybookWithBrowser()` usa la historia correcta**:
   - Si recibe "default", intenta buscar "implementation" primero
   - Construye la URL correcta: `${baseUrl}/?path=/story/${componentId}--${storyName}`
   - Extrae código desde esa URL

## 📋 Próximos Pasos

### Problemas Pendientes:

1. **Extracción desde Browser MCP**: Actualmente usa `fetch` como fallback, pero debería usar Browser MCP para navegar y extraer código desde la pestaña "Code".

2. **Verificación de historias**: La función `getComponentStories()` puede no estar obteniendo todas las historias correctamente desde `index.json`.

3. **Fallback manual**: Si `index.json` no está disponible, debería usar Browser MCP para navegar a Storybook y obtener las historias desde el sidebar.

## 🧪 Pruebas Recomendadas

1. **Probar con Button**:
   ```typescript
   await autorun.apply({
     message: "implementar un botón secundario con icono de filtro",
     targetFiles: ["prototypes/test.html"]
   });
   ```

2. **Verificar logs**:
   - Debe mostrar: `✅ Historia "implementation" encontrada: implementation`
   - Debe mostrar: `📚 URL de Story: https://ubits-storybook10.vercel.app/?path=/story/básicos-button--implementation`

3. **Verificar código extraído**:
   - Debe contener el código completo con todas las props
   - Debe incluir el HTML correcto del componente

## 📚 Referencias

- Historia "implementation" de Button: https://ubits-storybook10.vercel.app/?path=/story/básicos-button--implementation
- Función `findImplementationStory`: `packages/autorun-core/src/helpers/codePropsCombiner.ts:265`
- Función `extractExactCodeFromStorybookWithBrowser`: `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts:16`

