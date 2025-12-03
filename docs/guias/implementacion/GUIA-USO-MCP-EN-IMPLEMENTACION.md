# 🔌 Guía: Usar MCPs en la Implementación de Componentes

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"SIEMPRE usar MCPs disponibles para consultar componentes exactamente como están"** - Antes de implementar un componente, consulta su estructura, props, tokens y controles usando los MCPs disponibles.

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

### **PASO 1: CONSULTAR COMPONENTE EN STORYBOOK MCP** ⚠️ OBLIGATORIO

**ANTES de implementar cualquier componente UBITS, DEBES:**

1. **Listar componentes disponibles:**
   ```
   Usar: mcp_storybook_getComponentList
   ```
   - Verificar que el componente existe
   - Verificar el nombre exacto del componente

2. **Obtener props detallados:**
   ```
   Usar: mcp_storybook_getComponentsProps con el nombre del componente
   ```
   - Obtener todas las props disponibles
   - Verificar tipos de datos
   - Verificar valores por defecto
   - Verificar props requeridas vs opcionales

3. **Consultar Storybook directamente (si MCP no tiene toda la info):**
   - Abrir Storybook en navegador: `http://localhost:6006`
   - Buscar el componente
   - Revisar:
     - **Controls:** Todas las opciones configurables
     - **Tokens:** Tokens de diseño usados
     - **Variantes:** Todas las variantes disponibles
     - **Ejemplos:** Ejemplos de código
     - **Estructura:** Estructura HTML/CSS

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

1. **Consultar Storybook MCP:**
   ```
   mcp_storybook_getComponentList
   // Buscar "DataTable" o "data-table"
   ```

2. **Obtener props:**
   ```
   mcp_storybook_getComponentsProps(["DataTable"])
   // Obtener:
   // - columns: estructura exacta
   // - rows: estructura exacta
   // - header: opciones disponibles
   // - showCheckbox, columnSortable, etc.
   ```

3. **Consultar Storybook:**
   - Abrir: `http://localhost:6006/?path=/docs/data-datatable--docs`
   - Revisar:
     - **Controls:** Todas las opciones (showCheckbox, columnSortable, etc.)
     - **Tokens:** Tokens usados (spacing, colores)
     - **Ejemplos:** Ejemplos de código con todas las opciones

4. **Implementar con información exacta:**
   ```javascript
   window.createDataTable({
     containerId: 'encuestas-table-container',
     columns: [ /* estructura exacta obtenida del MCP */ ],
     rows: [ /* estructura exacta obtenida del MCP */ ],
     header: { /* opciones exactas obtenidas del MCP */ },
     showCheckbox: true, // valor obtenido del MCP
     columnSortable: true // valor obtenido del MCP
   });
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

## 📚 Referencias

- **Storybook MCP:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`
- **MCPs disponibles:** `docs/guias/configuracion/GUIA-INSTALACION-MCP-ADDONS.md`
- **Catálogo componentes:** `CATALOGO-COMPONENTES-UBITS.md`
- **Uso componentes:** `docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

