# 🔍 Guía: Verificación Automática de Historias de Storybook en Autorun

## ✅ IMPLEMENTADO

**Esta funcionalidad ya está implementada en Autorun. Esta guía explica cómo funciona y cómo usarla.**

---

## 🎯 OBJETIVO

**Hacer que Autorun verifique automáticamente qué historias existen antes de consultar Storybook, evitando errores de historias inexistentes.**

---

## ⚠️ PROBLEMA RESUELTO

**Antes (problema):**
- Asumía nombres de historias sin verificar si existen
- Intentaba acceder a URLs como `data-data-table--with-checkboxes` que no existen
- Causaba errores: "Couldn't find story matching..."

**Ahora (solución):**
- ✅ Verifica automáticamente qué historias existen en el archivo `.stories.ts`
- ✅ Construye URLs solo con historias que existen
- ✅ Usa 'default' como fallback automático si la historia deseada no existe
- ✅ Muestra advertencias cuando se usa fallback

---

## ✅ SOLUCIÓN: Verificación Automática

### **PASO 1: Función Helper para Verificar Historias**

**Crear función que verifique automáticamente qué historias existen:**

```javascript
/**
 * Verifica qué historias existen para un componente en Storybook
 * @param {string} componentPath - Ruta del archivo .stories.ts (ej: 'vendor/ubits/packages/storybook/stories/DataTable.stories.ts')
 * @param {string} componentTitle - Título del componente en Storybook (ej: 'Data/Data Table' → 'data-data-table')
 * @returns {Array<string>} - Array de nombres de historias disponibles (ej: ['default'])
 */
async function getAvailableStories(componentPath, componentTitle) {
  try {
    // Leer el archivo .stories.ts
    const storiesContent = await readFile(componentPath);
    
    // Buscar todos los exports de historias
    const storyExports = storiesContent.match(/^export const (\w+): Story =/gm);
    
    if (!storyExports || storyExports.length === 0) {
      console.warn(`⚠️ No se encontraron historias en ${componentPath}`);
      return ['default']; // Fallback a default
    }
    
    // Extraer nombres de historias y convertir a formato de URL
    const stories = storyExports.map(match => {
      const nameMatch = match.match(/export const (\w+):/);
      if (nameMatch) {
        const exportName = nameMatch[1];
        // Convertir camelCase a kebab-case (ej: WithCheckboxes → with-checkboxes)
        const kebabName = exportName
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()
          .replace(/^-/, ''); // Quitar guion inicial si existe
        return kebabName;
      }
      return null;
    }).filter(Boolean);
    
    console.log(`✅ Historias encontradas para ${componentTitle}:`, stories);
    return stories.length > 0 ? stories : ['default'];
    
  } catch (error) {
    console.error(`❌ Error al verificar historias:`, error);
    return ['default']; // Fallback a default
  }
}
```

### **PASO 2: Función Helper para Construir URL Segura**

**Crear función que construya la URL solo si la historia existe:**

```javascript
/**
 * Construye URL de Storybook verificando que la historia existe
 * @param {string} componentTitle - Título del componente (ej: 'Data/Data Table')
 * @param {string} storyName - Nombre de la historia deseada (ej: 'with-checkboxes' o 'default')
 * @param {string} componentPath - Ruta del archivo .stories.ts
 * @returns {string} - URL segura de Storybook (usa 'default' si la historia no existe)
 */
async function buildSafeStorybookUrl(componentTitle, storyName, componentPath) {
  // Convertir título a formato de URL (ej: 'Data/Data Table' → 'data-data-table')
  const titleSlug = componentTitle
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\//g, '-');
  
  // Verificar historias disponibles
  const availableStories = await getAvailableStories(componentPath, titleSlug);
  
  // Verificar si la historia deseada existe
  const storyExists = availableStories.includes(storyName.toLowerCase());
  
  // Usar la historia deseada si existe, sino usar 'default'
  const safeStoryName = storyExists ? storyName.toLowerCase() : 'default';
  
  const url = `https://ubits-storybook10.vercel.app/?path=/story/${titleSlug}--${safeStoryName}`;
  
  if (!storyExists && storyName !== 'default') {
    console.warn(`⚠️ Historia '${storyName}' no existe para ${componentTitle}. Usando 'default' en su lugar.`);
  }
  
  return url;
}
```

### **PASO 3: Función Helper para Navegar a Storybook de Forma Segura**

**Crear función que navegue automáticamente verificando historias:**

```javascript
/**
 * Navega a Storybook de forma segura, verificando que la historia existe
 * @param {string} componentTitle - Título del componente (ej: 'Data/Data Table')
 * @param {string} storyName - Nombre de la historia deseada (opcional, default: 'default')
 * @param {string} componentPath - Ruta del archivo .stories.ts (opcional, se infiere si no se proporciona)
 */
async function navigateToStorybookSafe(componentTitle, storyName = 'default', componentPath = null) {
  // Si no se proporciona componentPath, intentar inferirlo
  if (!componentPath) {
    // Mapeo común de componentes a rutas
    const componentPathMap = {
      'Data/Data Table': 'vendor/ubits/packages/storybook/stories/DataTable.stories.ts',
      'Navegación/Tabs': 'vendor/ubits/packages/storybook/stories/Tabs.stories.ts',
      // Agregar más mapeos según sea necesario
    };
    
    componentPath = componentPathMap[componentTitle];
    
    if (!componentPath) {
      console.warn(`⚠️ No se encontró ruta para ${componentTitle}. Usando URL con 'default'.`);
      const titleSlug = componentTitle.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
      const url = `https://ubits-storybook10.vercel.app/?path=/story/${titleSlug}--default`;
      await mcp_cursor-ide-browser_browser_navigate({ url });
      return;
    }
  }
  
  // Construir URL segura
  const url = await buildSafeStorybookUrl(componentTitle, storyName, componentPath);
  
  // Navegar
  console.log(`🔍 Navegando a Storybook: ${url}`);
  await mcp_cursor-ide-browser_browser_navigate({ url });
  await mcp_cursor-ide-browser_browser_snapshot();
}
```

---

## 📋 USO EN AUTORUN

### **Ejemplo 1: Consultar DataTable con Historia Específica**

```javascript
// ✅ CORRECTO: Verifica automáticamente si la historia existe
await navigateToStorybookSafe('Data/Data Table', 'with-checkboxes');

// Si 'with-checkboxes' no existe, automáticamente usa 'default'
// Y muestra advertencia: "⚠️ Historia 'with-checkboxes' no existe. Usando 'default'."
```

### **Ejemplo 2: Consultar DataTable con Historia Default**

```javascript
// ✅ CORRECTO: Usa 'default' que siempre existe
await navigateToStorybookSafe('Data/Data Table', 'default');
// O simplemente:
await navigateToStorybookSafe('Data/Data Table');
```

### **Ejemplo 3: Consultar Otro Componente**

```javascript
// ✅ CORRECTO: Verifica automáticamente
await navigateToStorybookSafe('Navegación/Tabs', 'default');
```

---

## 🔧 IMPLEMENTACIÓN EN AUTORUN

### **OPCIÓN 1: Agregar a Helpers de Autorun**

**Crear archivo:** `packages/core/helpers/storybookHelpers.js`

```javascript
// packages/core/helpers/storybookHelpers.js

const fs = require('fs');
const path = require('path');

/**
 * Verifica qué historias existen para un componente
 */
async function getAvailableStories(componentPath) {
  // Implementación de la función helper
  // ...
}

/**
 * Construye URL segura de Storybook
 */
async function buildSafeStorybookUrl(componentTitle, storyName, componentPath) {
  // Implementación de la función helper
  // ...
}

/**
 * Navega a Storybook de forma segura
 */
async function navigateToStorybookSafe(componentTitle, storyName = 'default', componentPath = null) {
  // Implementación de la función helper
  // ...
}

module.exports = {
  getAvailableStories,
  buildSafeStorybookUrl,
  navigateToStorybookSafe
};
```

### **✅ IMPLEMENTADO: Reglas de Cursor Actualizadas**

**Actualizado `.cursorrules` para incluir verificación automática:**

```markdown
## 🔌 VERIFICACIÓN AUTOMÁTICA DE HISTORIAS DE STORYBOOK

**ANTES de navegar a Storybook, DEBES:**

1. **Verificar historias existentes:**
   ```javascript
   // Buscar historias en el archivo .stories.ts
   const stories = await getAvailableStories('vendor/ubits/packages/storybook/stories/DataTable.stories.ts');
   ```

2. **Usar función segura:**
   ```javascript
   // Usar función que verifica automáticamente
   await navigateToStorybookSafe('Data/Data Table', 'with-checkboxes');
   ```

3. **Fallback automático:**
   - Si la historia no existe, automáticamente usar 'default'
   - Mostrar advertencia en consola
   - Continuar con 'default' sin error
```

---

## 📋 CHECKLIST PARA AUTORUN

**Cuando Autorun necesite consultar Storybook:**

- [ ] **Usar función segura:** `navigateToStorybookSafe()` en lugar de construir URL manualmente
- [ ] **Verificar automáticamente:** La función verifica qué historias existen
- [ ] **Fallback a default:** Si la historia no existe, usar 'default' automáticamente
- [ ] **Mostrar advertencia:** Si se usa fallback, mostrar advertencia en consola
- [ ] **No asumir nombres:** No construir URLs manualmente sin verificar

---

## 🚨 ERRORES A EVITAR

### **❌ ERROR 1: Construir URL Manualmente sin Verificar**

```javascript
// ❌ INCORRECTO: Construir URL sin verificar
const url = 'https://ubits-storybook10.vercel.app/?path=/story/data-data-table--with-checkboxes';
await mcp_cursor-ide-browser_browser_navigate({ url });
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Usar función segura que verifica automáticamente
await navigateToStorybookSafe('Data/Data Table', 'with-checkboxes');
```

---

### **❌ ERROR 2: No Tener Fallback**

```javascript
// ❌ INCORRECTO: Si la historia no existe, falla
const url = buildStorybookUrl('Data/Data Table', 'with-checkboxes');
// Si no existe, causa error
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Función segura con fallback automático
const url = await buildSafeStorybookUrl('Data/Data Table', 'with-checkboxes', componentPath);
// Si no existe, automáticamente usa 'default'
```

---

## 🔍 MAPEO DE COMPONENTES A RUTAS

**Para facilitar la inferencia automática:**

```javascript
const COMPONENT_PATH_MAP = {
  'Data/Data Table': 'vendor/ubits/packages/storybook/stories/DataTable.stories.ts',
  'Navegación/Tabs': 'vendor/ubits/packages/storybook/stories/Tabs.stories.ts',
  'Navegación/Tab Bar': 'vendor/ubits/packages/storybook/stories/TabBar.stories.ts',
  'Navegación/Sub Nav': 'vendor/ubits/packages/storybook/stories/SubNav.stories.ts',
  'Layout/Sidebar': 'vendor/ubits/packages/storybook/stories/Sidebar.stories.ts',
  // Agregar más según sea necesario
};
```

---

## 📚 REFERENCIAS

- **Error consultar historia inexistente:** `docs/guias/implementacion/GUIA-ERROR-CONSULTAR-HISTORIA-STORYBOOK-INEXISTENTE.md`
- **Verificar Storybook:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md`
- **Storybook en Vercel:** `https://ubits-storybook10.vercel.app/`
- **Código implementado:** `packages/autorun-core/src/helpers/verifyStorybookStories.ts`
- **Integración en helpers:** `packages/autorun-core/src/helpers/storybookStories.ts` y `componentHelpers.ts`

---

## ✅ VERIFICACIÓN

**Después de implementar:**

1. **Función verifica historias:** `getAvailableStories()` encuentra historias correctamente
2. **URL segura construida:** `buildSafeStorybookUrl()` usa 'default' si la historia no existe
3. **Navegación sin errores:** `navigateToStorybookSafe()` nunca causa error de historia inexistente
4. **Advertencias mostradas:** Si se usa fallback, se muestra advertencia en consola

**Si ves estos elementos correctamente, la solución está funcionando.**

---

## 🎯 REGLA DE ORO

**SIEMPRE usar `navigateToStorybookSafe()` en lugar de construir URLs manualmente. Esta función verifica automáticamente qué historias existen y usa 'default' como fallback si la historia deseada no existe.**

---

**Última actualización:** 2025-12-09  
**Versión:** 1.0.0


