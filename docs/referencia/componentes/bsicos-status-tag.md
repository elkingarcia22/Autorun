# 📦 Status Tag

> **Componente UBITS:** `bsicos-status-tag`  
> **Categoría:** Básicos  
> **API:** `window.createStatusTag()` o `<ubits-status-tag>`  
> **Storybook Local:** http://localhost:6006/?path=/story/bsicos-status-tag--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-status-tag--default

## 🎯 Descripción

Componente Status Tag UBITS para mostrar estados con icono izquierdo opcional, texto y icono derecho opcional. Múltiples estados con colores diferenciados usando tokens UBITS. Border-radius de 4px, padding 4px vertical y 8px horizontal.

**Características principales:**
- 17 estados predefinidos con colores diferenciados
- 3 tamaños: xs, sm, md
- Icono izquierdo opcional
- Icono derecho opcional
- Clickeable opcional
- Estilos hover/active cuando es clickeable
- Navegación por teclado (Enter/Space)

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/bsicos-status-tag--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-status-tag--default
- **Código fuente:** `vendor/ubits/packages/components/status-tag/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/status-tag/src/types/StatusTagOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/StatusTag.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `bsicos-status-tag--default`  
**URL Local:** http://localhost:6006/?path=/story/bsicos-status-tag--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-status-tag--default

**Descripción:**
Status Tag con todos los controles disponibles. Permite configurar label, tamaño, estado, iconos y si es clickeable.

**Características mostradas:**
- Label configurable
- Tamaño configurable (xs, sm, md)
- Estado configurable (17 opciones)
- Iconos izquierdo y derecho configurables
- Clickeable configurable

**Código de ejemplo:**
```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Completado',
  size: 'md',
  status: 'completed',
  leftIcon: 'grid-2',
  rightIcon: 'chevron-down',
  clickable: false,
  onClick: () => {
    console.log('Status tag clickeado');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `label`: `'Completado'` - Texto del estado
- `size`: `'md'` - Tamaño mediano
- `status`: `'completed'` - Estado completado
- `leftIcon`: `'grid-2'` - Icono izquierdo
- `rightIcon`: `'chevron-down'` - Icono derecho

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el status tag |
| `label` | `string` | `'Completado'` | Texto del estado |
| `size` | `string` | `'md'` | Tamaño del tag. Opciones: `xs` (body-xs 11px), `sm` (body-sm 13px), `md` (body-md 16px) |
| `status` | `string` | `'completed'` | Estado/variante del tag (determina el color). Opciones: ver sección Estados |
| `leftIcon` | `string` | - | Icono FontAwesome izquierdo (opcional, dejar vacío para ocultar) |
| `rightIcon` | `string` | - | Icono FontAwesome derecho (opcional, dejar vacío para ocultar) |
| `clickable` | `boolean` | `false` | Si el tag es clickeable (añade estilos hover/active y cursor pointer) |
| `onClick` | `function` | - | Función a ejecutar cuando se hace clic (solo si clickable es true) |
| `className` | `string` | `''` | Clases CSS adicionales |

---

## 🎨 Estados Disponibles

El componente soporta 17 estados predefinidos, cada uno con su color específico según tokens UBITS:

### Estados de Éxito/Completado
- **`completed`**: Completado
- **`published`**: Publicado
- **`fulfilled`**: Cumplido
- **`created`**: Creado
- **`active`**: Activo
- **`finished`**: Finalizado

### Estados de Advertencia/Progreso
- **`in-progress`**: En progreso
- **`syncing`**: Sincronizando
- **`pending`**: Pendiente
- **`pending-approval`**: Pendiente de aprobación

### Estados de Error/Rechazo
- **`not-fulfilled`**: No cumplido
- **`denied`**: Denegado

### Estados de Inactivo/Deshabilitado
- **`draft`**: Borrador
- **`not-started`**: No iniciado
- **`archived`**: Archivado
- **`disabled`**: Deshabilitado
- **`paused`**: Pausado
- **`hidden`**: Oculto

---

## 🎨 Tamaños

- **`xs`**: Extra pequeño (body-xs 11px)
- **`sm`**: Pequeño (body-sm 13px)
- **`md`**: Mediano (body-md 16px) - default

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Status Tag Básico

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Completado',
  status: 'completed'
});
```

### Ejemplo 2: Status Tag con Icono Izquierdo

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'En progreso',
  status: 'in-progress',
  leftIcon: 'spinner'
});
```

### Ejemplo 3: Status Tag con Icono Derecho

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Pendiente',
  status: 'pending',
  rightIcon: 'chevron-down'
});
```

### Ejemplo 4: Status Tag con Ambos Iconos

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Publicado',
  status: 'published',
  leftIcon: 'check-circle',
  rightIcon: 'chevron-down'
});
```

### Ejemplo 5: Status Tag Clickeable

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Activo',
  status: 'active',
  clickable: true,
  onClick: () => {
    console.log('Status tag clickeado');
    showStatusDetails();
  }
});
```

### Ejemplo 6: Status Tag Pequeño

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Completado',
  status: 'completed',
  size: 'sm'
});
```

### Ejemplo 7: Status Tag Extra Pequeño

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Pendiente',
  status: 'pending',
  size: 'xs'
});
```

### Ejemplo 8: Status Tag sin Iconos

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Archivado',
  status: 'archived',
  leftIcon: '', // Sin icono izquierdo
  rightIcon: '' // Sin icono derecho
});
```

### Ejemplo 9: Status Tag con Diferentes Estados

```javascript
const statuses = [
  { label: 'Completado', status: 'completed' },
  { label: 'En progreso', status: 'in-progress' },
  { label: 'Pendiente', status: 'pending' },
  { label: 'Denegado', status: 'denied' },
  { label: 'Archivado', status: 'archived' }
];

statuses.forEach((item, index) => {
  window.createStatusTag({
    containerId: `status-tag-${index}`,
    label: item.label,
    status: item.status
  });
});
```

### Ejemplo 10: Status Tag Completo

```javascript
window.createStatusTag({
  containerId: 'status-tag-container',
  label: 'Publicado',
  size: 'md',
  status: 'published',
  leftIcon: 'check-circle',
  rightIcon: 'chevron-down',
  clickable: true,
  onClick: () => {
    console.log('Status tag clickeado');
    toggleStatusMenu();
  },
  className: 'custom-status-tag'
});
```

---

## 🔄 Callbacks y Eventos

### onClick

Se ejecuta cuando se hace click en el status tag (solo si `clickable: true`).

```javascript
onClick: () => {
  console.log('Status tag clickeado');
  // Mostrar detalles
  showStatusDetails();
  
  // Toggle menú
  toggleStatusMenu();
  
  // Cambiar estado
  changeStatus();
}
```

**Nota:** El callback solo se ejecuta si `clickable: true`.

---

## 🎨 Características Visuales

### Colores por Estado

Cada estado tiene un color específico según tokens UBITS:
- Estados de éxito: Verde
- Estados de advertencia: Amarillo/Naranja
- Estados de error: Rojo
- Estados de inactivo: Gris

### Hover y Active

Cuando `clickable: true`:
- Cursor pointer
- Estilos hover al pasar el mouse
- Estilos active al hacer click
- Navegación por teclado (Enter/Space)

### Iconos

- **Icono izquierdo:** Se muestra antes del texto
- **Icono derecho:** Se muestra después del texto
- Tamaño según el tamaño del tag
- Color según el estado

---

## 🚨 Errores Comunes

### Error 1: onClick sin clickable
**Problema:** Proporcionar `onClick` sin `clickable: true`  
**Solución:** Activar `clickable` cuando se usa `onClick`

```javascript
// ❌ Incorrecto - onClick sin clickable
onClick: () => {
  console.log('Click');
},
clickable: false

// ✅ Correcto - onClick con clickable
onClick: () => {
  console.log('Click');
},
clickable: true
```

### Error 2: Usar Iconos con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
leftIcon: 'fa-check-circle'

// ✅ Correcto
leftIcon: 'check-circle'
```

### Error 3: Estado Inválido
**Problema:** Usar un estado que no existe  
**Solución:** Usar uno de los 17 estados predefinidos

```javascript
// ❌ Incorrecto - estado inválido
status: 'invalid-status'

// ✅ Correcto - estado válido
status: 'completed'
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

