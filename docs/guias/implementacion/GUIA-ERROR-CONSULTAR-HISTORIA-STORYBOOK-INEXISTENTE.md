# 🚨 Error: Consultar Historia de Storybook que No Existe

## ❌ PROBLEMA IDENTIFICADO

**Fecha:** 2025-12-09  
**Componente afectado:** Consultas a Storybook  
**Síntoma:** Al intentar consultar Storybook, se intenta acceder a una historia que no existe, causando error:

```
Couldn't find story matching 'data-data-table--with-checkboxes'.
The component failed to render properly...
```

**Ejemplo del error:**
```javascript
// ❌ INCORRECTO: Consultar historia que no existe
await mcp_cursor-ide-browser_browser_navigate({ 
  url: 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--with-checkboxes' 
});
```

---

## 🔍 CAUSA RAÍZ DEL ERROR

### **Error Principal: Asumir Nombres de Historias sin Verificar**

**Problema:**
- Se asume que existe una historia con un nombre específico (ej: `with-checkboxes`)
- No se verifica qué historias existen realmente en el archivo de Storybook
- Los nombres de historias en Storybook se generan automáticamente desde los exports del archivo `.stories.ts`
- Si la historia no existe, Storybook muestra un error

**Cómo se generan los nombres de historias:**
- El título del componente viene de `meta.title` (ej: `'Data/Data Table'` → `data-data-table`)
- El nombre de la historia viene del export (ej: `export const Default` → `--default`)
- La URL completa sería: `data-data-table--default`

---

## ✅ SOLUCIÓN CORRECTA

### **PASO 1: Verificar Historias Existentes**

**Antes de consultar Storybook, DEBES verificar qué historias existen:**

```bash
# Buscar todas las historias exportadas
grep "^export const" vendor/ubits/packages/storybook/stories/DataTable.stories.ts
```

**Ejemplo de salida:**
```
export const Default: Story = {
export const WithCheckboxes: Story = {
export const WithSorting: Story = {
...
```

### **PASO 2: Usar Solo Historias que Existen**

**✅ CORRECTO: Usar historias verificadas**

```javascript
// ✅ CORRECTO: Usar historia que existe (verificada)
await mcp_cursor-ide-browser_browser_navigate({ 
  url: 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default' 
});
```

**❌ INCORRECTO: Asumir nombres sin verificar**

```javascript
// ❌ INCORRECTO: Asumir que existe 'with-checkboxes'
await mcp_cursor-ide-browser_browser_navigate({ 
  url: 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--with-checkboxes' 
});
```

### **PASO 3: Usar Historia "Default" como Fallback**

**Si no estás seguro de qué historia usar, usa "default":**

```javascript
// ✅ CORRECTO: Usar default (siempre existe)
const storyUrl = 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default';
await mcp_cursor-ide-browser_browser_navigate({ url: storyUrl });
```

---

## 📋 CHECKLIST OBLIGATORIO

Antes de consultar Storybook:

- [ ] **Verificar historias existentes:** Usar `grep "^export const"` en el archivo `.stories.ts`
- [ ] **Usar nombres correctos:** Los nombres se generan en minúsculas con guiones (ej: `WithCheckboxes` → `--with-checkboxes`)
- [ ] **Verificar formato de URL:** `data-data-table--nombre-historia` (título en minúsculas + `--` + nombre en minúsculas)
- [ ] **Usar "default" como fallback:** Si no estás seguro, usar `--default` que siempre existe
- [ ] **Probar URL primero:** Verificar que la URL funciona antes de usarla en código

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: Asumir Nombres de Historias**

**Problema:**
```javascript
// ❌ INCORRECTO: Asumir que existe 'with-checkboxes'
const storyUrl = 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--with-checkboxes';
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Verificar primero qué historias existen
// Buscar en: vendor/ubits/packages/storybook/stories/DataTable.stories.ts
// Si existe 'export const WithCheckboxes', entonces usar '--with-checkboxes'
// Si no existe, usar '--default'
const storyUrl = 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default';
```

---

### **❌ ERROR 2: No Verificar Formato de Nombres**

**Problema:**
- Los nombres de historias en Storybook se convierten a minúsculas con guiones
- `WithCheckboxes` → `--with-checkboxes`
- `WithSorting` → `--with-sorting`

**✅ SOLUCIÓN:**
- Siempre convertir el nombre del export a minúsculas con guiones
- Verificar el formato correcto antes de construir la URL

---

### **❌ ERROR 3: No Usar Fallback**

**Problema:**
- Intentar usar una historia específica sin verificar si existe
- Si falla, no hay alternativa

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Usar default como fallback
let storyUrl = 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default';

// Si necesitas una historia específica, verificar primero
// const exists = checkIfStoryExists('with-checkboxes');
// if (exists) {
//   storyUrl = 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--with-checkboxes';
// }
```

---

## 🔍 CÓMO VERIFICAR HISTORIAS EXISTENTES

### **PASO 1: Buscar Exports en el Archivo de Storybook**

```bash
# Buscar todas las historias exportadas
grep "^export const" vendor/ubits/packages/storybook/stories/DataTable.stories.ts
```

**Salida esperada:**
```
export const Default: Story = {
export const WithCheckboxes: Story = {
export const WithSorting: Story = {
export const WithPagination: Story = {
...
```

### **PASO 2: Convertir Nombres a Formato de URL**

**Regla de conversión:**
- Título del componente: `'Data/Data Table'` → `data-data-table` (minúsculas, espacios y `/` → `-`)
- Nombre de historia: `WithCheckboxes` → `--with-checkboxes` (minúsculas, camelCase → kebab-case)
- URL completa: `data-data-table--with-checkboxes`

**Ejemplos:**
- `export const Default` → `data-data-table--default`
- `export const WithCheckboxes` → `data-data-table--with-checkboxes`
- `export const WithSorting` → `data-data-table--with-sorting`

### **PASO 3: Verificar en Storybook**

**Abrir Storybook y verificar que la historia existe:**
1. Ir a: `https://ubits-storybook10.vercel.app/`
2. Buscar el componente: `Data/Data Table`
3. Verificar qué historias están disponibles en el sidebar
4. Usar solo las historias que aparecen en el sidebar

---

## 📚 REFERENCIAS

- **Archivo de historias:** `vendor/ubits/packages/storybook/stories/DataTable.stories.ts`
- **Storybook en Vercel:** `https://ubits-storybook10.vercel.app/`
- **Documentación Storybook:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md`

---

## ✅ VERIFICACIÓN

Después de implementar la solución, verificar:

1. **Historia existe:** La URL de Storybook carga correctamente sin errores
2. **No hay errores en consola:** No aparece el mensaje "Couldn't find story matching..."
3. **Componente se renderiza:** El componente se muestra correctamente en Storybook

**Si ves estos elementos correctamente, la solución está funcionando.**

---

## 🎯 REGLA DE ORO

**SIEMPRE usar `buildSafeStorybookUrl()` para construir URLs de Storybook. Esta función verifica automáticamente qué historias existen y usa 'default' como fallback si la historia no existe.**

**✅ CORRECTO:**
```typescript
import { buildSafeStorybookUrl } from '@autorun/core/helpers/verifyStorybookStories';

// Para cualquier componente (Input, DataTable, etc.)
const urlResult = await buildSafeStorybookUrl('Input', 'default');
// o
const urlResult = await buildSafeStorybookUrl('Formularios/Input', 'default');
// o
const urlResult = await buildSafeStorybookUrl('formularios-input', 'default');

// Verificar si hay advertencia
if (urlResult.warning) {
	console.warn(`⚠️ ${urlResult.warning}`);
}

// Usar la URL verificada
const url = urlResult.url; // Siempre será válida
```

**Para Input:**
- ✅ **Título correcto:** `Formularios/Input`
- ✅ **ID correcto:** `formularios-input`
- ❌ **NO usar:** `entrada-input` (aunque está mapeado como alias)
- ✅ **Historia que existe:** `formularios-input--default`
- ❌ **Historias que NO existen:** `formularios-input--calendar`, `formularios-input--text`, etc.
- **Solo existe:** `Default` (export const Default)

**Para DataTable:**
- ✅ **Historia que existe:** `data-data-table--default`
- ❌ **Historias que NO existen:** `data-data-table--with-checkboxes`, `data-data-table--with-sorting`, etc.
- **Solo existe:** `Default` (export const Default)

**⚠️ CRÍTICO:** 
- SIEMPRE usar `buildSafeStorybookUrl()` para construir URLs
- NO construir URLs manualmente
- Si necesitas ver funcionalidades específicas (calendar, checkboxes, sorting, etc.), usa la historia `default` y ajusta los controles en Storybook para activar esas funcionalidades

---

**Última actualización:** 2025-12-09  
**Versión:** 1.0.0






