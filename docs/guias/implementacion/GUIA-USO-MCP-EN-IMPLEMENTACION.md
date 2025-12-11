# 🔌 Guía: Usar MCPs en la Implementación de Componentes

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"SIEMPRE usar MCPs disponibles para consultar componentes exactamente como están"** - Antes de implementar un componente, consulta su estructura, props, tokens y controles usando los MCPs disponibles.

## 🚨 CRÍTICO: Verificar Versión Actualizada del Storybook

**ANTES de implementar cualquier componente, SIEMPRE:**

1. **Consultar catálogo PRIMERO:**
   - Leer: `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
   - Buscar el componente por nombre o descripción

2. **Usar descubrimiento automático:**
   - Usar `getCorrectStorybookId()` o `mapAndValidateComponentNameToStorybookId()`
   - Obtener ID correcto validado

3. **Consultar Storybook en Vercel (versión más reciente):**
   - URL: `https://ubits-storybook10.vercel.app/`
   - Construir URL con ID descubierto: `?path=/story/${componentId}--default`
   - Revisar la pestaña "Code" para ver el código actualizado
   - Revisar la pestaña "Controls" para ver todas las opciones disponibles

**⚠️ CRÍTICO: NO buscar directamente en Storybook sin usar descubrimiento automático**

2. **Comparar con el código local:**
   - Verificar que los tipos de columnas coincidan
   - Verificar que las opciones disponibles coincidan
   - Verificar que la estructura de datos coincida

3. **Si hay diferencias:**
   - Actualizar la implementación para usar la versión más reciente
   - Actualizar las guías si es necesario
   - Documentar los cambios

**⚠️ ERROR COMÚN:** Usar información desactualizada del código local sin verificar el Storybook en Vercel.

---

## 🎯 MCPs Disponibles en Autorun

### **1. Storybook MCP** ⭐ (MÁS IMPORTANTE)

**Cuándo usar:**
- ✅ Antes de implementar cualquier componente UBITS
- ✅ Para consultar props, tokens, controles y estructura
- ✅ Para obtener ejemplos de código exactos
- ✅ Para verificar variantes y opciones disponibles

**Herramientas disponibles:**
- `mcp_storybook_getComponentList` - Listar todos los componentes
- `mcp_storybook_getComponentsProps` - Obtener props detallados de componentes

**Cómo verificar si está disponible:**
```javascript
// Verificar si Storybook MCP está disponible
// Cursor automáticamente detecta MCPs disponibles
// Si Storybook MCP está configurado, las herramientas estarán disponibles
```

---

### **2. Figma MCP**

**Cuándo usar:**
- ✅ Para consultar tokens de diseño desde Figma
- ✅ Para obtener colores, spacing, tipografía exactos
- ✅ Para sincronizar tokens con Figma

---

### **3. Supabase MCP**

**Cuándo usar:**
- ✅ Para consultar esquemas de base de datos
- ✅ Para obtener estructuras de datos
- ✅ Para implementar integraciones con Supabase

---

### **4. GitHub MCP**

**Cuándo usar:**
- ✅ Para consultar código de componentes en repositorios
- ✅ Para obtener ejemplos de implementación
- ✅ Para revisar historial de cambios

---

### **5. Vercel MCP**

**Cuándo usar:**
- ✅ Para consultar deployments
- ✅ Para obtener información de proyectos
- ✅ Para gestionar deployments

---

## 📋 PROCESO OBLIGATORIO: Implementar Componente UBITS

### **PASO 1: CONSULTAR CATÁLOGO PRIMERO** ⚠️ OBLIGATORIO

**ANTES de buscar en Storybook, SIEMPRE:**

1. **Consultar el catálogo de componentes:**
   ```
   Leer: docs/referencia/CATALOGO-COMPONENTES-UBITS.md
   ```
   - Buscar el componente por nombre o descripción visual
   - Verificar si existe antes de buscar
   - Obtener ID de Storybook sugerido

2. **Usar sistema de descubrimiento automático:**
   ```typescript
   // ✅ CORRECTO - Usar descubrimiento automático
   import { getCorrectStorybookId } from '@autorun/core/helpers/storybookIdDiscovery';
   
   const { componentId, found, title, availableStories } = 
     await getCorrectStorybookId('ComponentName', 'fallback-id');
   
   if (found) {
     // Usar componentId para construir URL
   }
   ```

3. **Validar ID antes de usar:**
   ```typescript
   // ✅ CORRECTO - Validar ID automáticamente
   import { mapAndValidateComponentNameToStorybookId } from '@autorun/core/helpers/storybookStories';
   
   const componentId = await mapAndValidateComponentNameToStorybookId('ComponentName');
   // Automáticamente descubre y valida el ID correcto
   ```

### **PASO 2: CONSULTAR COMPONENTE EN STORYBOOK MCP** ⚠️ OBLIGATORIO

**DESPUÉS de consultar el catálogo y descubrir el ID, DEBES:**

1. **Listar componentes disponibles:**
   ```
   Usar: mcp_storybook_getComponentList
   ```
   - Verificar que el componente existe
   - Verificar el nombre exacto del componente

2. **Obtener props detallados (usando ID descubierto):**
   ```
   Usar: mcp_storybook_getComponentsProps con el ID descubierto
   ```
   - Obtener todas las props disponibles
   - Verificar tipos de datos
   - Verificar valores por defecto
   - Verificar props requeridas vs opcionales

3. **Consultar Storybook directamente (usando ID descubierto):**
   - Construir URL con ID descubierto: `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--default`
   - Revisar:
     - **Controls:** Todas las opciones configurables
     - **Tokens:** Tokens de diseño usados
     - **Variantes:** Todas las variantes disponibles
     - **Ejemplos:** Ejemplos de código
     - **Estructura:** Estructura HTML/CSS

**⚠️ CRÍTICO: NO buscar directamente en Storybook sin usar descubrimiento automático**

---

### **PASO 2: CONSULTAR TOKENS Y SPACING**

**Para obtener tokens exactos:**

1. **Usar Storybook MCP:**
   - Consultar tokens usados por el componente
   - Obtener valores exactos de spacing, colores, tipografía

2. **Consultar Storybook directamente:**
   - Ir a la sección de Tokens en Storybook
   - Verificar tokens de:
     - Spacing: `--ubits-spacing-*`
     - Colores: `--ubits-*-color-*`
     - Tipografía: `--font-*`, `--ubits-typography-*`
     - Border radius: `--ubits-border-radius-*`

---

### **PASO 3: IMPLEMENTAR CON INFORMACIÓN EXACTA**

**Usar la información obtenida del MCP para:**
- ✅ Implementar props exactas
- ✅ Usar tokens correctos
- ✅ Aplicar variantes correctas
- ✅ Seguir estructura exacta del componente

---

## 🎯 EJEMPLOS DE USO

### **Ejemplo 1: Implementar DataTable**

**ANTES de implementar:**

1. **⚠️ CRÍTICO: Consultar Storybook en Vercel (versión más reciente):** ⚠️ PRIMERO
   - URL: `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--ver-usuarios-seleccionados`
   - Revisar:
     - **Pestaña "Code":** Ver el código actualizado del ejemplo
     - **Pestaña "Controls":** Ver todas las opciones disponibles (showCheckbox, columnSortable, rowExpandable, tipos de columnas, etc.)
     - **Tipos de columnas disponibles:** Verificar todos los tipos (nombre, nombre-avatar, progreso, estado, fecha, pais, ciudad, etc.)
     - **Estructura de datos:** Ver cómo se estructuran las filas y columnas
   - **Ver guía:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - ⚠️ OBLIGATORIO

2. **Consultar Storybook MCP (si está disponible):**
   ```
   mcp_storybook_getComponentList
   // Buscar "DataTable" o "data-table"
   ```

3. **Obtener props del MCP:**
   ```
   mcp_storybook_getComponentsProps(["DataTable"])
   // Obtener:
   // - columns: estructura exacta
   // - rows: estructura exacta
   // - header: opciones disponibles
   // - showCheckbox, columnSortable, rowExpandable, etc.
   ```

4. **Comparar con código local:**
   - Verificar que `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts` tenga los mismos tipos
   - Verificar que la implementación local coincida con el Storybook en Vercel
   - Si hay diferencias, usar la versión del Storybook en Vercel (es la más actualizada)

5. **⚠️ CRÍTICO: Verificar en la imagen antes de implementar:**
   - ¿Hay opción de expandir filas? → Configurar `rowExpandable` correctamente
   - ¿Qué tipos de columnas hay? → Verificar tipos correctos (estado, progreso, fecha, etc.)
   - ¿Hay columnas fijas? → Solo configurar si están en la imagen
   - ¿La tabla debe aprovechar espacio vertical? → Configurar altura dinámica

5. **Implementar con información exacta:**
   ```javascript
   window.createDataTable({
     containerId: 'encuestas-table-container',
     columns: [ 
       { id: 'estado', title: 'Estado', type: 'estado' }, // ✅ CORRECTO: tipo 'estado' para status tag
       { id: 'avance', title: 'Avance', type: 'progreso' } // ✅ CORRECTO: tipo 'progreso' para progress bar
       // ⚠️ CRÍTICO: Usar tipos correctos según la imagen
     ],
     rows: [ /* estructura exacta obtenida del MCP */ ],
     header: { /* opciones exactas obtenidas del MCP */ },
     showCheckbox: true, // valor obtenido del MCP
     columnSortable: true, // valor obtenido del MCP
     rowExpandable: false, // ✅ CORRECTO: Deshabilitar si NO está en la imagen
     // ⚠️ CRÍTICO: NO configurar columnas fijas si NO están en la imagen
   });
   
   // ⚠️ CRÍTICO: Configurar altura dinámica después de crear
   setTimeout(() => {
     adjustDataTableHeight('encuestas-table-container');
   }, 200);
   ```

---

### **Ejemplo 2: Implementar Tabs**

**ANTES de implementar:**

1. **Consultar Storybook MCP:**
   ```
   mcp_storybook_getComponentList
   // Buscar "Tabs"
   ```

2. **Obtener props:**
   ```
   mcp_storybook_getComponentsProps(["Tabs"])
   // Obtener:
   // - tabs: estructura exacta
   // - activeTabId: cómo funciona
   // - onTabChange: callback exacto
   // - icon: formato exacto (sin prefijos)
   ```

3. **Consultar Storybook:**
   - Abrir: `http://localhost:6006/?path=/docs/navegacion-tabs--docs`
   - Revisar:
     - **Controls:** Opciones de tabs, iconos, callbacks
     - **Ejemplos:** Ejemplos con iconos (formato correcto)

4. **Implementar con información exacta:**
   ```javascript
   window.createTabs({
     tabs: [
       { 
         id: 'encuestas', 
         label: 'Encuestas', 
         icon: 'list-ul' // ✅ Formato correcto (sin 'far fa-')
       }
     ],
     activeTabId: 'encuestas',
     onTabChange: (tabId, tabElement) => { /* callback exacto */ }
   }, 'encuestas-tabs-container');
   ```

---

### **Ejemplo 3: Implementar Button**

**ANTES de implementar:**

1. **Consultar Storybook MCP:**
   ```
   mcp_storybook_getComponentList
   // Buscar "Button"
   ```

2. **Obtener props:**
   ```
   mcp_storybook_getComponentsProps(["Button"])
   // Obtener:
   // - variant: opciones exactas (primary, secondary, ghost, etc.)
   // - size: opciones exactas (sm, md, lg)
   // - icon: formato exacto
   // - disabled, loading, etc.
   ```

3. **Consultar Storybook:**
   - Abrir: `http://localhost:6006/?path=/docs/basicos-button--docs`
   - Revisar:
     - **Controls:** Todas las variantes y opciones
     - **Tokens:** Colores, spacing, tipografía usados

4. **Implementar con información exacta:**
   ```javascript
   // Usar props exactas obtenidas del MCP
   <ubits-button 
     variant="primary" // ✅ Valor exacto del MCP
     size="md" // ✅ Valor exacto del MCP
     icon-left="plus" // ✅ Formato exacto del MCP
   >
     Crear encuesta
   </ubits-button>
   ```

---

## ✅ CHECKLIST OBLIGATORIO

**Antes de buscar cualquier componente en Storybook:**

- [ ] ✅ Consulté `docs/referencia/CATALOGO-COMPONENTES-UBITS.md` primero
- [ ] ✅ Usé `getCorrectStorybookId()` o `mapAndValidateComponentNameToStorybookId()` para descubrir el ID
- [ ] ✅ Validé que el ID existe antes de usarlo
- [ ] ✅ Construí la URL con el ID descubierto (no hardcodeada)
- [ ] ✅ Verifiqué que la historia existe (si es específica)
- [ ] ❌ NO busqué directamente en Storybook sin descubrimiento automático
- [ ] ❌ NO inventé IDs
- [ ] ❌ NO usé URLs hardcodeadas

**Antes de implementar cualquier componente UBITS:**

- [ ] ✅ Consulté el catálogo de componentes
- [ ] ✅ Usé descubrimiento automático para obtener ID correcto
- [ ] ✅ Consulté Storybook MCP con el ID descubierto
- [ ] ✅ Obtuve props detallados del componente
- [ ] ✅ Consulté Storybook en Vercel con URL construida con ID descubierto
- [ ] ✅ Revisé la pestaña "Code" para ver código actualizado
- [ ] ✅ Revisé la pestaña "Controls" para ver todas las opciones
- [ ] ✅ Verifiqué tokens de diseño usados
- [ ] ✅ Verifiqué variantes disponibles
- [ ] ✅ Implementé con información exacta del Storybook

---

## ✅ CHECKLIST OBLIGATORIO (Versión Anterior)

**ANTES de implementar cualquier componente UBITS:**

- [ ] **Consultar Storybook MCP:**
  - [ ] Listar componentes disponibles
  - [ ] Obtener props detallados del componente
  - [ ] Verificar estructura exacta

- [ ] **Consultar Storybook directamente:**
  - [ ] Revisar Controls (todas las opciones)
  - [ ] Revisar Tokens (valores exactos)
  - [ ] Revisar Ejemplos (código exacto)
  - [ ] Revisar Variantes (todas las opciones)

- [ ] **Implementar con información exacta:**
  - [ ] Usar props exactas obtenidas del MCP
  - [ ] Usar tokens exactos obtenidos del Storybook
  - [ ] Seguir estructura exacta del componente
  - [ ] Aplicar variantes correctas

---

## 🚨 ERRORES COMUNES A EVITAR

### **Error 1: Implementar sin consultar MCP**

❌ **INCORRECTO:**
```javascript
// Implementar sin consultar MCP primero
window.createDataTable({
  columns: [ /* asumir estructura */ ],
  // ...
});
```

✅ **CORRECTO:**
```javascript
// 1. Primero consultar MCP
// mcp_storybook_getComponentsProps(["DataTable"])

// 2. Luego implementar con información exacta
window.createDataTable({
  columns: [ /* estructura exacta del MCP */ ],
  // ...
});
```

### **Error 2: Asumir props sin verificar**

❌ **INCORRECTO:**
```javascript
// Asumir que existe una prop sin verificar
window.createTabs({
  tabs: [{ id: 'tab1', label: 'Tab 1', icon: 'far fa-home' }], // ❌ Formato incorrecto
  // ...
});
```

✅ **CORRECTO:**
```javascript
// 1. Consultar MCP para verificar formato exacto
// mcp_storybook_getComponentsProps(["Tabs"])

// 2. Implementar con formato exacto
window.createTabs({
  tabs: [{ id: 'tab1', label: 'Tab 1', icon: 'home' }], // ✅ Formato correcto del MCP
  // ...
});
```

### **Error 3: No consultar tokens**

❌ **INCORRECTO:**
```css
/* Asumir tokens sin verificar */
margin-top: 16px; /* ❌ Debería usar token */
```

✅ **CORRECTO:**
```css
/* 1. Consultar Storybook para tokens exactos */
/* 2. Usar token exacto */
margin-top: var(--ubits-spacing-lg); /* ✅ Token exacto del Storybook */
```

---

## 🔍 SISTEMA DE DESCUBRIMIENTO AUTOMÁTICO DE COMPONENTES

### **⚠️ CRÍTICO: SIEMPRE usar descubrimiento automático antes de buscar en Storybook**

**El sistema de descubrimiento automático:**
- ✅ Consulta `index.json` de Storybook para obtener todos los componentes
- ✅ Descubre automáticamente los IDs correctos
- ✅ Busca por nombre, ID, o título
- ✅ Valida que el ID existe antes de retornarlo

### **Cómo usar:**

```typescript
// ✅ CORRECTO - Descubrimiento automático
import { getCorrectStorybookId } from '@autorun/core/helpers/storybookIdDiscovery';

const { componentId, found, title, availableStories } = 
  await getCorrectStorybookId('DataTable', 'components-datatable');

if (found) {
  // Usar componentId para construir URL
  const url = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--default`;
}
```

### **O usar validación automática:**

```typescript
// ✅ CORRECTO - Validación automática
import { mapAndValidateComponentNameToStorybookId } from '@autorun/core/helpers/storybookStories';

const componentId = await mapAndValidateComponentNameToStorybookId('DataTable');
// Automáticamente descubre y valida el ID correcto
```

**⚠️ CRÍTICO: NO buscar directamente en Storybook sin usar descubrimiento automático**

**Ver guía completa:** `docs/guias/implementacion/GUIA-BUSQUEDA-COMPONENTES-STORYBOOK-CORRECTA.md`

---

## 📚 Referencias

- **Storybook MCP:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`
- **MCPs disponibles:** `docs/guias/configuracion/GUIA-INSTALACION-MCP-ADDONS.md`
- **Catálogo componentes:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- **Búsqueda correcta:** `docs/guias/implementacion/GUIA-BUSQUEDA-COMPONENTES-STORYBOOK-CORRECTA.md`
- **Uso componentes:** `docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md`

---

**Última actualización:** Enero 2025  
**Versión:** 1.1.0

