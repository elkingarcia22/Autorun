# 📦 Tabs

> **Componente UBITS:** `navegacion-tabs`  
> **Categoría:** Navegación  
> **API:** `window.createTabs()` o `<ubits-tabs>`  
> **⚠️ IMPORTANTE:** El ID en Storybook es `navegación-tabs` (CON ACENTO)  
> **Storybook Local:** http://localhost:6006/?path=/story/navegación-tabs--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegación-tabs--default

## 🎯 Descripción

Componente Tabs UBITS de navegación horizontal con soporte para iconos opcionales. El tab activo muestra fondo blanco, icono oscuro, texto en negrita y una línea vertical rosa a la izquierda. Los tabs inactivos muestran icono y texto en gris claro sin fondo.

**Características principales:**
- Navegación horizontal entre secciones
- Soporte para iconos opcionales (FontAwesome)
- Indicador visual del tab activo (fondo blanco + línea rosa)
- Texto en negrita para el tab activo
- Transiciones suaves entre tabs
- Configuración flexible de cantidad de tabs

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegación-tabs--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegación-tabs--default
- **Código fuente:** `vendor/ubits/packages/components/tabs/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/tabs/src/types/TabsOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Tabs.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegación-tabs--default` (⚠️ CON ACENTO)  
**URL Local:** http://localhost:6006/?path=/story/navegación-tabs--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegación-tabs--default

**Descripción:**
Tabs con todos los controles disponibles. Permite configurar el número de tabs, mostrar/ocultar iconos y cambiar el tab activo.

**Características mostradas:**
- 5 tabs por defecto (configurable de 1 a 10)
- Iconos FontAwesome opcionales
- Tab activo con fondo blanco y línea rosa
- Controles interactivos para cambiar configuración

**Código de ejemplo:**
```javascript
window.createTabs({
  containerId: 'tabs-container',
  tabs: [
    {
      id: 'tab-1',
      label: 'Label 1',
      icon: 'far fa-th',
      active: true
    },
    {
      id: 'tab-2',
      label: 'Label 2',
      icon: 'far fa-chart-line',
      active: false
    },
    {
      id: 'tab-3',
      label: 'Label 3',
      icon: 'far fa-cog',
      active: false
    }
  ],
  activeTabId: 'tab-1',
  onTabChange: (tabId) => {
    console.log('Tab cambiado:', tabId);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `tabs`: Array de 5 tabs con iconos
- `activeTabId`: `'tab-1'` - Primer tab activo
- `showIcons`: `true` - Mostrar iconos en los tabs
- `tabCount`: `5` - Número de tabs a mostrar

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizarán los tabs |
| `tabs` | `TabItem[]` | `[]` | Array de tabs a mostrar. Cada tab debe tener `id`, `label`, `icon` (opcional) y `active` (opcional) |
| `activeTabId` | `string` | - | ID del tab activo. Debe coincidir con el `id` de uno de los tabs |
| `onTabChange` | `function` | - | Callback que se ejecuta cuando se cambia de tab. Recibe el `tabId` del tab seleccionado |

### Estructura de TabItem

```typescript
interface TabItem {
  id: string;           // ID único del tab (requerido)
  label: string;        // Texto del tab (requerido)
  icon?: string;        // Icono FontAwesome (opcional, ej: "far fa-th")
  active?: boolean;     // Si el tab está activo (opcional)
}
```

### Opciones Adicionales (Storybook Controls)

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `showIcons` | `boolean` | `true` | Mostrar iconos en los tabs |
| `tabCount` | `number` | `5` | Número de tabs a mostrar (1-10) |

**Nota:** `showIcons` y `tabCount` son controles del Storybook para facilitar la demostración. En la implementación real, se configuran directamente en el array `tabs`.

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Tabs Básico sin Iconos

```javascript
window.createTabs({
  containerId: 'tabs-container',
  tabs: [
    { id: 'tab-1', label: 'Inicio', active: true },
    { id: 'tab-2', label: 'Perfil', active: false },
    { id: 'tab-3', label: 'Configuración', active: false }
  ],
  activeTabId: 'tab-1',
  onTabChange: (tabId) => {
    console.log('Tab seleccionado:', tabId);
    // Actualizar contenido según el tab seleccionado
  }
});
```

### Ejemplo 2: Tabs con Iconos

```javascript
window.createTabs({
  containerId: 'tabs-container',
  tabs: [
    { 
      id: 'tab-1', 
      label: 'Dashboard', 
      icon: 'far fa-th',
      active: true 
    },
    { 
      id: 'tab-2', 
      label: 'Analíticas', 
      icon: 'far fa-chart-line',
      active: false 
    },
    { 
      id: 'tab-3', 
      label: 'Configuración', 
      icon: 'far fa-cog',
      active: false 
    }
  ],
  activeTabId: 'tab-1',
  onTabChange: (tabId) => {
    // Cambiar contenido según el tab
    updateContent(tabId);
  }
});
```

### Ejemplo 3: Tabs Dinámicos

```javascript
// Generar tabs dinámicamente
const tabs = [
  'Dashboard',
  'Usuarios',
  'Reportes',
  'Configuración'
].map((label, index) => ({
  id: `tab-${index + 1}`,
  label: label,
  icon: `far fa-${['th', 'users', 'chart-bar', 'cog'][index]}`,
  active: index === 0
}));

window.createTabs({
  containerId: 'tabs-container',
  tabs: tabs,
  activeTabId: 'tab-1',
  onTabChange: (tabId) => {
    // Actualizar estado y contenido
    tabs.forEach(tab => {
      tab.active = tab.id === tabId;
    });
    // Re-renderizar si es necesario
  }
});
```

---

## 🎨 Estilos y Tokens

### Estados Visuales

**Tab Activo:**
- Fondo blanco (`--modifiers-normal-color-light-bg-1`)
- Línea vertical rosa a la izquierda
- Icono y texto en color oscuro
- Texto en negrita

**Tab Inactivo:**
- Sin fondo (transparente)
- Icono y texto en gris claro
- Texto en peso normal

### Tokens Utilizados

- `--modifiers-normal-color-light-bg-1`: Fondo del tab activo
- `--modifiers-normal-color-light-fg-*`: Colores de texto
- `--ubits-spacing-*`: Espaciado entre tabs
- `--ubits-border-*`: Bordes y líneas

---

## 🔄 Callbacks y Eventos

### onTabChange

Se ejecuta cuando el usuario hace click en un tab.

```javascript
onTabChange: (tabId) => {
  console.log('Tab cambiado a:', tabId);
  
  // Actualizar contenido según el tab
  switch(tabId) {
    case 'tab-1':
      showDashboard();
      break;
    case 'tab-2':
      showProfile();
      break;
    // ...
  }
}
```

**Parámetros:**
- `tabId` (string): ID del tab seleccionado

---

## 🚨 Errores Comunes

### Error 1: No Actualizar Estado del Tab Activo
**Problema:** No actualizar el estado `active` de los tabs después de cambiar  
**Solución:** Siempre actualizar el array `tabs` para reflejar el tab activo actual

```javascript
// ❌ Incorrecto
onTabChange: (tabId) => {
  // Solo cambiar contenido, no actualizar estado
}

// ✅ Correcto
onTabChange: (tabId) => {
  tabs.forEach(tab => {
    tab.active = tab.id === tabId;
  });
  // Luego actualizar contenido
}
```

### Error 2: Usar Prefijo `fa-` en Iconos
**Problema:** Usar `fa-th` en lugar de `far fa-th`  
**Solución:** Siempre incluir el estilo de FontAwesome (`far`, `fas`, `fab`)

```javascript
// ❌ Incorrecto
icon: 'fa-th'

// ✅ Correcto
icon: 'far fa-th'  // o 'fas fa-th', 'fab fa-th', etc.
```

### Error 3: activeTabId No Coincide con Ningún Tab
**Problema:** `activeTabId` no coincide con ningún `id` en el array `tabs`  
**Solución:** Asegurar que `activeTabId` coincida exactamente con un `id` del array

```javascript
// ❌ Incorrecto
tabs: [{ id: 'tab-1', label: 'Tab 1' }],
activeTabId: 'tab-2'  // No existe

// ✅ Correcto
tabs: [{ id: 'tab-1', label: 'Tab 1' }],
activeTabId: 'tab-1'  // Coincide
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local
