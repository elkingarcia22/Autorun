# 📦 SubNav

> **Componente UBITS:** `navegacion-subnav`  
> **Categoría:** Navegación  
> **API:** `window.createSubNav()` o `<ubits-subnav>`  
> **Storybook Local:** http://localhost:6006/?path=/story/navegacion-subnav--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-subnav--default

## 🎯 Descripción

Componente SubNav UBITS de navegación superior horizontal con 8 variantes predefinidas. Muestra sub-navegaciones de los módulos principales con tabs personalizables, navegación por URL o callbacks, y soporte completo para dark mode. Se oculta en móvil y se reemplaza por tab-bar.

**Características principales:**
- 8 variantes predefinidas
- Navegación horizontal con tabs
- Iconos opcionales en tabs
- Soporte para dark mode
- Navegación por URL o callbacks
- Responsive (se oculta en móvil)
- Tabs configurables según variante

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegacion-subnav--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-subnav--default
- **Código fuente:** `vendor/ubits/packages/components/subnav/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/subnav/src/types/SubNavOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/SubNav.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegacion-subnav--default`  
**URL Local:** http://localhost:6006/?path=/story/navegacion-subnav--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-subnav--default

**Descripción:**
SubNav con todos los controles disponibles. Permite configurar variante, tab activo y mostrar/ocultar iconos.

**Características mostradas:**
- Variante configurable (8 variantes disponibles)
- Tab activo configurable
- Iconos opcionales
- Navegación por callbacks

**Código de ejemplo:**
```javascript
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'template',
  activeTabId: 'section1',
  showIcons: false,
  onTabChange: (tabId, tabElement) => {
    console.log('Tab cambiado:', tabId);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `variant`: `'template'` - Variante template
- `activeTabId`: `'section1'` - Tab activo inicial
- `showIcons`: `false` - Ocultar iconos

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el SubNav (asignado automáticamente si no se proporciona) |
| `variant` | `string` | `'template'` | Variante del SubNav. Opciones: `template`, `aprendizaje`, `desempeno`, `encuestas`, `tareas`, `empresa`, `admin-aprendizaje`, `admin-desempeno` |
| `activeTabId` | `string` | - | ID del tab activo. Se actualiza automáticamente al cambiar la variante |
| `showIcons` | `boolean` | `false` | Mostrar iconos en los tabs del SubNav |
| `onTabChange` | `function` | - | Callback que se ejecuta cuando se cambia de tab. Recibe `tabId` y `tabElement` |

---

## 🎨 Variantes Disponibles

### Variante: Template

**Tabs disponibles:**
- `section1` - Sección 1
- `section2` - Sección 2
- `section3` - Sección 3

### Variante: Aprendizaje

**Tabs disponibles:**
- Tabs específicos del módulo de aprendizaje

### Variante: Desempeño

**Tabs disponibles:**
- Tabs específicos del módulo de desempeño

### Variante: Encuestas

**Tabs disponibles:**
- Tabs específicos del módulo de encuestas

### Variante: Tareas

**Tabs disponibles:**
- Tabs específicos del módulo de tareas

### Variante: Empresa

**Tabs disponibles:**
- Tabs específicos del módulo de empresa

### Variante: Admin-Aprendizaje

**Tabs disponibles:**
- Tabs específicos del módulo admin de aprendizaje

### Variante: Admin-Desempeño

**Tabs disponibles:**
- Tabs específicos del módulo admin de desempeño

**Nota:** Cada variante tiene su propia configuración de tabs predefinida. Consulta `getSubNavConfig(variant)` para ver los tabs exactos de cada variante.

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: SubNav Básico

```javascript
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'template',
  activeTabId: 'section1',
  showIcons: false,
  onTabChange: (tabId, tabElement) => {
    console.log('Tab seleccionado:', tabId);
    // Actualizar contenido según el tab
    updateContent(tabId);
  }
});
```

### Ejemplo 2: SubNav con Iconos

```javascript
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'aprendizaje',
  activeTabId: 'tab-1',
  showIcons: true, // Mostrar iconos
  onTabChange: (tabId, tabElement) => {
    console.log('Navegar a:', tabId);
  }
});
```

### Ejemplo 3: SubNav con Navegación por URL

```javascript
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'desempeno',
  activeTabId: getCurrentSection(), // Obtener sección actual de la URL
  showIcons: false,
  onTabChange: (tabId, tabElement) => {
    // Navegar a la URL correspondiente
    window.location.href = `/desempeno/${tabId}`;
  }
});
```

### Ejemplo 4: SubNav Admin

```javascript
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'admin-aprendizaje',
  activeTabId: 'admin-tab-1',
  showIcons: true,
  onTabChange: (tabId, tabElement) => {
    console.log('Sección admin:', tabId);
    loadAdminSection(tabId);
  }
});
```

### Ejemplo 5: SubNav Dinámico

```javascript
// Cambiar variante dinámicamente
function switchSubNavVariant(newVariant) {
  const container = document.getElementById('subnav-container');
  if (container) {
    container.innerHTML = ''; // Limpiar
    
    window.createSubNav({
      containerId: 'subnav-container',
      variant: newVariant,
      activeTabId: getFirstTabId(newVariant),
      showIcons: false,
      onTabChange: (tabId) => {
        handleNavigation(newVariant, tabId);
      }
    });
  }
}
```

---

## 🔄 Callbacks y Eventos

### onTabChange

Se ejecuta cuando el usuario hace click en un tab.

```javascript
onTabChange: (tabId, tabElement) => {
  console.log('Tab cambiado:', tabId);
  console.log('Elemento del tab:', tabElement);
  
  // Actualizar contenido
  updateContent(tabId);
  
  // Actualizar URL si es necesario
  updateURL(tabId);
  
  // Guardar estado
  saveActiveTab(tabId);
}
```

**Parámetros:**
- `tabId` (string): ID del tab seleccionado
- `tabElement` (HTMLElement): Elemento DOM del tab seleccionado

---

## 🎨 Características Visuales

### Responsive

- **Desktop:** SubNav visible horizontalmente
- **Móvil:** SubNav se oculta automáticamente y se reemplaza por TabBar

### Dark Mode

- Soporte completo para dark mode
- Los colores se ajustan automáticamente según el tema

### Iconos

- Opcionales en cada tab
- Se muestran a la izquierda del texto
- FontAwesome icons

---

## 🚨 Errores Comunes

### Error 1: activeTabId No Coincide con Variante
**Problema:** Usar `activeTabId` que no existe en la variante seleccionada  
**Solución:** Asegurar que `activeTabId` sea válido para la variante

```javascript
// ❌ Incorrecto
variant: 'template',
activeTabId: 'aprendizaje-tab-1'  // No existe en template

// ✅ Correcto
variant: 'template',
activeTabId: 'section1'  // Válido para template
```

### Error 2: No Manejar Cambios de Tab
**Problema:** No implementar `onTabChange` para actualizar contenido  
**Solución:** Siempre implementar el callback para actualizar la UI

```javascript
// ❌ Incorrecto - no actualiza contenido
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'template',
  activeTabId: 'section1'
  // Falta onTabChange
});

// ✅ Correcto - actualiza contenido
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'template',
  activeTabId: 'section1',
  onTabChange: (tabId) => {
    updateContent(tabId);
  }
});
```

### Error 3: No Limpiar Contenedor al Cambiar Variante
**Problema:** Cambiar variante sin limpiar el contenedor previo  
**Solución:** Siempre limpiar el contenedor antes de crear un nuevo SubNav

```javascript
// ❌ Incorrecto - puede causar duplicados
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'nueva-variante'
});

// ✅ Correcto - limpiar primero
const container = document.getElementById('subnav-container');
if (container) {
  container.innerHTML = '';
}
window.createSubNav({
  containerId: 'subnav-container',
  variant: 'nueva-variante'
});
```

### Error 4: Usar Variante Incorrecta
**Problema:** Usar una variante que no existe  
**Solución:** Verificar que la variante sea una de las 8 disponibles

```javascript
// ❌ Incorrecto
variant: 'inexistente'

// ✅ Correcto - usar una de las 8 variantes
variant: 'template'  // o 'aprendizaje', 'desempeno', etc.
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
