# 📦 Empty State

> **Componente UBITS:** `feedback-empty-state`  
> **Categoría:** Feedback  
> **API:** `window.createEmptyState()` o `<ubits-empty-state>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-empty-state--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-empty-state--default

## 🎯 Descripción

Componente Empty State UBITS para mostrar estados vacíos en la interfaz. Soporta imagen o icono, título, descripción y botones de acción.

**Características principales:**
- Imagen o icono opcional
- Título y descripción configurables
- Botón primario opcional con icono
- Botón secundario opcional con icono
- Diseño centrado y responsive
- Ideal para estados vacíos, sin resultados, sin datos, etc.

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-empty-state--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-empty-state--default
- **Código fuente:** `vendor/ubits/packages/components/empty-state/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/empty-state/src/types/EmptyStateOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/EmptyState.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-empty-state--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-empty-state--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-empty-state--default

**Descripción:**
Empty State con todos los controles disponibles. Permite configurar título, descripción, imagen/icono y botones de acción.

**Características mostradas:**
- Título configurable
- Descripción configurable
- Imagen o icono opcional
- Botón primario opcional con icono
- Botón secundario opcional con icono

**Código de ejemplo:**
```javascript
window.createEmptyState({
  containerId: 'empty-state-container',
  title: 'No hay resultados',
  description: 'Intenta ajustar tus filtros de búsqueda',
  icon: 'inbox',
  actionLabel: 'Buscar',
  showPrimaryButton: false,
  primaryButtonIcon: 'search',
  showPrimaryButtonIcon: false,
  secondaryActionLabel: 'Cancelar',
  showSecondaryButton: false,
  secondaryButtonIcon: 'times',
  showSecondaryButtonIcon: false,
  onPrimaryAction: () => {
    console.log('Acción primaria');
  },
  onSecondaryAction: () => {
    console.log('Acción secundaria');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'No hay resultados'` - Título del empty state
- `description`: `'Intenta ajustar tus filtros de búsqueda'` - Descripción
- `icon`: `'inbox'` - Icono FontAwesome
- `actionLabel`: `'Buscar'` - Texto del botón primario
- `showPrimaryButton`: `false` - Botón primario oculto

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el empty state |
| `title` | `string` | - | Título del empty state |
| `description` | `string` | - | Descripción o mensaje del empty state |
| `imageUrl` | `string` | - | URL de la imagen/ilustración (opcional) |
| `icon` | `string` | - | Nombre del icono FontAwesome a mostrar (opcional, si no hay imagen) |
| `actionLabel` | `string` | - | Texto del botón de acción principal (opcional) |
| `showPrimaryButton` | `boolean` | `false` | Mostrar botón primario |
| `primaryButtonIcon` | `string` | - | Nombre del icono FontAwesome para el botón primario (opcional) |
| `showPrimaryButtonIcon` | `boolean` | `false` | Mostrar icono en el botón primario |
| `secondaryActionLabel` | `string` | - | Texto del botón secundario (opcional) |
| `showSecondaryButton` | `boolean` | `false` | Mostrar botón secundario |
| `secondaryButtonIcon` | `string` | - | Nombre del icono FontAwesome para el botón secundario (opcional) |
| `showSecondaryButtonIcon` | `boolean` | `false` | Mostrar icono en el botón secundario |
| `onPrimaryAction` | `function` | - | Callback del botón primario |
| `onSecondaryAction` | `function` | - | Callback del botón secundario |

---

## 🎨 Variantes Visuales

### Con Imagen

Se usa cuando se proporciona `imageUrl`. Muestra una imagen/ilustración.

```javascript
window.createEmptyState({
  title: 'No hay datos',
  description: 'Aún no has creado ningún elemento',
  imageUrl: '/images/empty-state.svg'
});
```

### Con Icono

Se usa cuando se proporciona `icon` sin `imageUrl`. Muestra un icono FontAwesome.

```javascript
window.createEmptyState({
  title: 'No hay resultados',
  description: 'Intenta ajustar tus filtros',
  icon: 'inbox'
});
```

**Prioridad:**
1. Si hay `imageUrl` → se muestra la imagen
2. Si hay `icon` (sin `imageUrl`) → se muestra el icono
3. Si no hay ninguno → solo se muestra título y descripción

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Empty State Básico

```javascript
window.createEmptyState({
  containerId: 'empty-container',
  title: 'No hay resultados',
  description: 'Intenta ajustar tus filtros de búsqueda',
  icon: 'inbox'
});
```

### Ejemplo 2: Empty State con Imagen

```javascript
window.createEmptyState({
  containerId: 'empty-container',
  title: 'No hay datos',
  description: 'Aún no has creado ningún elemento',
  imageUrl: '/images/empty-state.svg'
});
```

### Ejemplo 3: Empty State con Botón Primario

```javascript
window.createEmptyState({
  containerId: 'empty-container',
  title: 'No hay elementos',
  description: 'Comienza creando tu primer elemento',
  icon: 'plus-circle',
  actionLabel: 'Crear elemento',
  showPrimaryButton: true,
  onPrimaryAction: () => {
    openCreateModal();
  }
});
```

### Ejemplo 4: Empty State con Botones Primario y Secundario

```javascript
window.createEmptyState({
  containerId: 'empty-container',
  title: 'No hay resultados',
  description: 'No se encontraron elementos que coincidan con tu búsqueda',
  icon: 'search',
  actionLabel: 'Buscar de nuevo',
  showPrimaryButton: true,
  primaryButtonIcon: 'search',
  showPrimaryButtonIcon: true,
  secondaryActionLabel: 'Limpiar filtros',
  showSecondaryButton: true,
  onPrimaryAction: () => {
    performSearch();
  },
  onSecondaryAction: () => {
    clearFilters();
  }
});
```

### Ejemplo 5: Empty State para Lista Vacía

```javascript
window.createEmptyState({
  containerId: 'empty-container',
  title: 'Tu lista está vacía',
  description: 'Agrega elementos para comenzar',
  icon: 'list',
  actionLabel: 'Agregar elemento',
  showPrimaryButton: true,
  primaryButtonIcon: 'plus',
  showPrimaryButtonIcon: true,
  onPrimaryAction: () => {
    showAddItemForm();
  }
});
```

### Ejemplo 6: Empty State para Sin Permisos

```javascript
window.createEmptyState({
  containerId: 'empty-container',
  title: 'Sin acceso',
  description: 'No tienes permisos para ver este contenido',
  icon: 'lock',
  secondaryActionLabel: 'Solicitar acceso',
  showSecondaryButton: true,
  onSecondaryAction: () => {
    requestAccess();
  }
});
```

### Ejemplo 7: Empty State para Error de Carga

```javascript
window.createEmptyState({
  containerId: 'empty-container',
  title: 'Error al cargar',
  description: 'No se pudieron cargar los datos. Intenta nuevamente.',
  icon: 'exclamation-triangle',
  actionLabel: 'Reintentar',
  showPrimaryButton: true,
  primaryButtonIcon: 'redo',
  showPrimaryButtonIcon: true,
  onPrimaryAction: () => {
    reloadData();
  }
});
```

### Ejemplo 8: Empty State con Imagen Personalizada

```javascript
window.createEmptyState({
  containerId: 'empty-container',
  title: 'No hay conexión',
  description: 'Verifica tu conexión a internet',
  imageUrl: '/images/no-connection.svg',
  actionLabel: 'Reintentar',
  showPrimaryButton: true,
  onPrimaryAction: () => {
    checkConnection();
  }
});
```

---

## 🔄 Callbacks y Eventos

### onPrimaryAction

Se ejecuta cuando se hace click en el botón primario.

```javascript
onPrimaryAction: () => {
  console.log('Botón primario clickeado');
  // Ejecutar acción principal
  performAction();
  
  // Navegar a otra página
  navigateToCreate();
  
  // Abrir modal
  openCreateModal();
}
```

### onSecondaryAction

Se ejecuta cuando se hace click en el botón secundario.

```javascript
onSecondaryAction: () => {
  console.log('Botón secundario clickeado');
  // Ejecutar acción secundaria
  performSecondaryAction();
  
  // Limpiar filtros
  clearFilters();
  
  // Cancelar acción
  cancelAction();
}
```

---

## 🎨 Características Visuales

### Diseño

- **Centrado:** Todo el contenido está centrado vertical y horizontalmente
- **Responsive:** Se adapta al ancho del contenedor
- **Espaciado:** Espaciado consistente según tokens UBITS

### Imagen/Icono

- **Tamaño:** Tamaño grande para destacar
- **Color:** Color según el tema (light/dark)
- **Posición:** Arriba del título

### Título y Descripción

- **Título:** Tipografía heading según tokens UBITS
- **Descripción:** Tipografía body según tokens UBITS
- **Color:** Colores según tokens UBITS

### Botones

- **Posición:** Centrados debajo de la descripción
- **Espaciado:** Espaciado entre botones según tokens UBITS
- **Estilo:** Botones UBITS estándar

---

## 🚨 Errores Comunes

### Error 1: Múltiples Elementos Visuales Simultáneos
**Problema:** Proporcionar `imageUrl` e `icon` al mismo tiempo  
**Solución:** Usar solo uno (prioridad: imageUrl > icon)

```javascript
// ❌ Incorrecto - múltiples elementos visuales
window.createEmptyState({
  imageUrl: '/images/empty.svg',
  icon: 'inbox'
  // Se usará imageUrl, icon se ignora
});

// ✅ Correcto - un solo elemento visual
window.createEmptyState({
  imageUrl: '/images/empty.svg'
  // O solo icon: 'inbox'
});
```

### Error 2: Botón sin Label
**Problema:** Habilitar botón sin proporcionar label  
**Solución:** Siempre proporcionar label cuando se habilita el botón

```javascript
// ❌ Incorrecto - botón sin label
showPrimaryButton: true,
actionLabel: '' // Vacío

// ✅ Correcto - botón con label
showPrimaryButton: true,
actionLabel: 'Crear elemento'
```

### Error 3: Icono con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
icon: 'fa-inbox'

// ✅ Correcto
icon: 'inbox'
```

### Error 4: Sin Título ni Descripción
**Problema:** Empty state sin título ni descripción  
**Solución:** Siempre proporcionar al menos título

```javascript
// ❌ Incorrecto - sin información
window.createEmptyState({
  icon: 'inbox'
  // Falta título y descripción
});

// ✅ Correcto - con título y descripción
window.createEmptyState({
  title: 'No hay resultados',
  description: 'Intenta ajustar tus filtros',
  icon: 'inbox'
});
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

