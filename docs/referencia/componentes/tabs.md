# 📦 Tabs

> **Componente UBITS:** `tabs`  
> **API:** `window.createTabs()`  
> **Storybook:** https://ubits-storybook10.vercel.app/?path=/story/navegación-tabs--default

## 🎯 Descripción

Componente Tabs UBITS de navegación horizontal con soporte para iconos opcionales. El tab activo muestra fondo blanco, icono oscuro, texto en negrita y una línea vertical rosa a la izquierda. Los tabs inactivos muestran icono y texto en gris claro sin fondo.

## 🔗 Enlaces Rápidos

- **Storybook en Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegación-tabs--default
- **Código fuente:** `vendor/ubits/packages/components/tabs/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/tabs/src/types/TabsOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Tabs.stories.ts`

---

## 📚 Historia de Storybook

### Historia: Default

**ID en Storybook:** `navegación-tabs--default`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/navegación-tabs--default

**Descripción:**
Tabs con controles interactivos para configurar número de tabs, iconos y tab activo. Muestra panel de información con el estado actual.

**Características mostradas:**
- Tabs configurables (1-10 tabs)
- Iconos opcionales
- Tab activo con estilo distintivo
- Callback `onTabChange` funcional
- Panel de información interactivo

**Código de ejemplo:**
```javascript
window.createTabs({
  tabs: [
    { id: 'tab-1', label: 'Label 1', icon: 'th' },
    { id: 'tab-2', label: 'Label 2', icon: 'chart-line' },
    { id: 'tab-3', label: 'Label 3', icon: 'cog' }
  ],
  activeTabId: 'tab-1',
  onTabChange: (tabId, tabElement) => {
    console.log('Tab cambiado:', tabId);
  }
}, 'tabs-container');
```

**⚠️ IMPORTANTE:** Para iconos, usar SOLO el nombre (sin prefijos `fa-` o `far`/`fas`). El componente automáticamente agrega los prefijos necesarios.

---

## ⚙️ Opciones y Props Completas

### Opciones Principales

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `tabs` | `TabItem[]` | `[]` | Array de tabs a mostrar |
| `activeTabId` | `string` | `undefined` | ID del tab activo |
| `onTabChange` | `function` | `undefined` | Callback cuando cambia el tab |

### Estructura de TabItem

```typescript
interface TabItem {
  id: string;              // ID único del tab
  label: string;           // Texto del tab
  icon?: string;           // Nombre del icono FontAwesome (sin prefijos)
  active?: boolean;        // Si el tab está activo
}
```

### Callbacks

- **`onTabChange`**: Se dispara cuando se cambia de tab
  ```javascript
  onTabChange: (tabId, tabElement) => {
    console.log('Tab cambiado:', tabId);
    // tabElement es el elemento DOM del tab
  }
  ```

---

## 🎨 Tokens Utilizados

- **`--ubits-spacing-*`**: Espaciado entre tabs
- **`--ubits-border-*`**: Bordes de los tabs
- **`--ubits-bg-*`**: Fondos (light/dark mode)
- **`--ubits-fg-*`**: Colores de texto (light/dark mode)

---

## 🚨 Errores Comunes

### Error 1: Usar Prefijos en Iconos
**Problema:** Usar `'far fa-home'` o `'fa-home'` en lugar de `'home'`  
**Solución:** Usar solo el nombre del icono sin prefijos  
**Ejemplo:**
```javascript
// ❌ INCORRECTO
{ id: 'tab1', label: 'Tab 1', icon: 'far fa-home' }
{ id: 'tab1', label: 'Tab 1', icon: 'fa-home' }

// ✅ CORRECTO
{ id: 'tab1', label: 'Tab 1', icon: 'home' }
```

### Error 2: Omitir Sufijos en Iconos
**Problema:** Omitir sufijos como `-simple` cuando el icono los tiene  
**Solución:** Incluir sufijos si el icono los tiene  
**Ejemplo:**
```javascript
// ❌ INCORRECTO (si el icono es chart-pie-simple)
{ id: 'tab1', label: 'Tab 1', icon: 'chart-pie' }

// ✅ CORRECTO
{ id: 'tab1', label: 'Tab 1', icon: 'chart-pie-simple' }
```

### Error 3: Confundir con SubNav
**Problema:** Implementar Tabs cuando en realidad es SubNav  
**Solución:** Verificar si es SubNav (barra debajo del header) o Tabs (dentro del contenido)  
**Ver:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md`

---

## 📖 Referencias

- [Guía de uso de componentes](../docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Análisis de iconos](../docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md)
- [Distinguir SubNav de Tabs](../docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md)
- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Tabs Básico
```javascript
window.createTabs({
  tabs: [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' }
  ],
  activeTabId: 'tab1'
}, 'tabs-container');
```

### Ejemplo 2: Tabs con Iconos
```javascript
window.createTabs({
  tabs: [
    { id: 'tab1', label: 'Tab 1', icon: 'home' },
    { id: 'tab2', label: 'Tab 2', icon: 'user' },
    { id: 'tab3', label: 'Tab 3', icon: 'chart-pie-simple' }
  ],
  activeTabId: 'tab1',
  onTabChange: (tabId) => {
    console.log('Tab activo:', tabId);
  }
}, 'tabs-container');
```

### Ejemplo 3: Tabs con Callback
```javascript
window.createTabs({
  tabs: [
    { id: 'tab1', label: 'Vista 1', icon: 'list-ul' },
    { id: 'tab2', label: 'Vista 2', icon: 'chart-pie-simple' }
  ],
  activeTabId: 'tab1',
  onTabChange: (tabId, tabElement) => {
    // Cambiar contenido según el tab activo
    updateContent(tabId);
  }
}, 'tabs-container');
```

---

**Última actualización:** 2025-01-03  
**Versión Storybook consultada:** ubits-storybook10.vercel.app
