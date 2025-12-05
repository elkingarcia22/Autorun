# 📦 Scrollbar

> **Componente UBITS:** `bsicos-scrollbar`  
> **Categoría:** Básicos  
> **API:** `window.createScrollbar()` o `<ubits-scrollbar>`  
> **Storybook Local:** http://localhost:6006/?path=/story/bsicos-scrollbar--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-scrollbar--default

## 🎯 Descripción

Componente Scrollbar personalizado UBITS. Se usa para crear scrollbars personalizados en elementos scrollable. Soporta orientación vertical y horizontal. Se sincroniza automáticamente con el elemento scrollable asociado. Aparece en hover y se adapta al tamaño del contenido. Soporta arrastrar y clic para navegar.

**Características principales:**
- 2 orientaciones: vertical, horizontal
- Sincronización automática con el elemento scrollable
- Aparece en hover
- Se adapta al tamaño del contenido
- Soporta arrastrar y clic para navegar
- Estilo personalizado según tokens UBITS
- Oculta el scrollbar nativo del navegador

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/bsicos-scrollbar--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-scrollbar--default
- **Código fuente:** `vendor/ubits/packages/components/scroll/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/scroll/src/types/ScrollOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Scrollbar.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `bsicos-scrollbar--default`  
**URL Local:** http://localhost:6006/?path=/story/bsicos-scrollbar--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-scrollbar--default

**Descripción:**
Scrollbar con todos los controles disponibles. Permite configurar orientación y estado.

**Características mostradas:**
- Orientación configurable (vertical, horizontal)
- Estado configurable
- Sincronización automática
- Aparece en hover

**Código de ejemplo:**
```javascript
// 1. Crear contenedor scrollable
const scrollableContainer = document.createElement('div');
scrollableContainer.id = 'scrollable-content';
scrollableContainer.style.cssText = `
  width: 400px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
scrollableContainer.style.setProperty('scrollbar-width', 'none');

// Ocultar scrollbar nativo de WebKit
const style = document.createElement('style');
style.textContent = `
  #scrollable-content::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

// 2. Crear contenedor para el scrollbar
const scrollbarContainer = document.createElement('div');
scrollbarContainer.id = 'scrollbar-container';

// 3. Crear scrollbar personalizado
window.createScrollbar({
  orientation: 'vertical',
  state: 'default',
  targetId: 'scrollable-content',
  containerId: 'scrollbar-container'
});
```

**Opciones utilizadas en la historia Default:**
- `orientation`: `'vertical'` - Orientación vertical
- `state`: `'default'` - Estado por defecto

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `targetId` | `string` | - | ID del elemento scrollable al que se asociará el scrollbar (requerido) |
| `containerId` | `string` | - | ID del contenedor donde se renderizará el scrollbar (requerido) |
| `orientation` | `string` | `'vertical'` | Orientación del scrollbar. Opciones: `vertical`, `horizontal` |
| `state` | `string` | `'default'` | Estado del scrollbar. Opciones: `default` |

---

## 🎨 Orientaciones

### Orientación Vertical

Scrollbar vertical para contenido que se desplaza verticalmente.

```javascript
orientation: 'vertical'
```

**Uso típico:**
- Listas largas
- Contenido con altura fija
- Áreas de texto con scroll

### Orientación Horizontal

Scrollbar horizontal para contenido que se desplaza horizontalmente.

```javascript
orientation: 'horizontal'
```

**Uso típico:**
- Galerías de imágenes
- Tablas anchas
- Contenido con ancho fijo

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Scrollbar Vertical Básico

```javascript
// Contenedor scrollable
const scrollable = document.createElement('div');
scrollable.id = 'my-scrollable';
scrollable.style.cssText = `
  width: 400px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// Ocultar scrollbar nativo
const style = document.createElement('style');
style.textContent = `#my-scrollable::-webkit-scrollbar { display: none; }`;
document.head.appendChild(style);

// Contenedor del scrollbar
const scrollbarContainer = document.createElement('div');
scrollbarContainer.id = 'my-scrollbar';

// Crear scrollbar
window.createScrollbar({
  orientation: 'vertical',
  targetId: 'my-scrollable',
  containerId: 'my-scrollbar'
});
```

### Ejemplo 2: Scrollbar Horizontal

```javascript
// Contenedor scrollable horizontal
const scrollable = document.createElement('div');
scrollable.id = 'horizontal-scrollable';
scrollable.style.cssText = `
  width: 400px;
  height: 200px;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// Ocultar scrollbar nativo
const style = document.createElement('style');
style.textContent = `#horizontal-scrollable::-webkit-scrollbar { display: none; }`;
document.head.appendChild(style);

// Contenedor del scrollbar
const scrollbarContainer = document.createElement('div');
scrollbarContainer.id = 'horizontal-scrollbar';

// Crear scrollbar horizontal
window.createScrollbar({
  orientation: 'horizontal',
  targetId: 'horizontal-scrollable',
  containerId: 'horizontal-scrollbar'
});
```

### Ejemplo 3: Scrollbar en Lista

```javascript
// Lista con scroll
const listContainer = document.createElement('div');
listContainer.id = 'list-container';
listContainer.style.cssText = `
  width: 300px;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// Ocultar scrollbar nativo
const style = document.createElement('style');
style.textContent = `#list-container::-webkit-scrollbar { display: none; }`;
document.head.appendChild(style);

// Agregar items a la lista
for (let i = 1; i <= 50; i++) {
  const item = document.createElement('div');
  item.textContent = `Item ${i}`;
  item.style.padding = '8px';
  listContainer.appendChild(item);
}

// Contenedor del scrollbar
const scrollbarContainer = document.createElement('div');
scrollbarContainer.id = 'list-scrollbar';

// Crear scrollbar
window.createScrollbar({
  orientation: 'vertical',
  targetId: 'list-container',
  containerId: 'list-scrollbar'
});
```

### Ejemplo 4: Scrollbar con Contenido Dinámico

```javascript
let scrollbarInstance = null;

function updateScrollableContent(content) {
  const scrollable = document.getElementById('dynamic-scrollable');
  scrollable.innerHTML = content;
  
  // Recrear scrollbar si es necesario
  if (scrollbarInstance) {
    scrollbarInstance.destroy();
  }
  
  scrollbarInstance = window.createScrollbar({
    orientation: 'vertical',
    targetId: 'dynamic-scrollable',
    containerId: 'dynamic-scrollbar'
  });
}

// Inicializar
const scrollable = document.createElement('div');
scrollable.id = 'dynamic-scrollable';
scrollable.style.cssText = `
  width: 400px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const scrollbarContainer = document.createElement('div');
scrollbarContainer.id = 'dynamic-scrollbar';

// Actualizar contenido
updateScrollableContent('<p>Contenido inicial</p>');
```

### Ejemplo 5: Scrollbar en Modal

```javascript
// Modal con contenido scrollable
const modal = document.createElement('div');
modal.style.cssText = `
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const modalContent = document.createElement('div');
modalContent.id = 'modal-content';
modalContent.style.cssText = `
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// Ocultar scrollbar nativo
const style = document.createElement('style');
style.textContent = `#modal-content::-webkit-scrollbar { display: none; }`;
document.head.appendChild(style);

// Contenedor del scrollbar
const scrollbarContainer = document.createElement('div');
scrollbarContainer.id = 'modal-scrollbar';
scrollbarContainer.style.cssText = `
  height: 100%;
`;

// Crear scrollbar
window.createScrollbar({
  orientation: 'vertical',
  targetId: 'modal-content',
  containerId: 'modal-scrollbar'
});
```

---

## 🎨 Características Visuales

### Aparece en Hover

- El scrollbar aparece cuando el mouse está sobre el contenedor scrollable
- Se oculta automáticamente cuando el mouse sale del contenedor
- Transición suave

### Sincronización Automática

- Se sincroniza automáticamente con el scroll del contenedor
- El tamaño del thumb (barra deslizante) refleja la cantidad de contenido visible
- La posición del thumb refleja la posición del scroll

### Interacción

- **Arrastrar:** Arrastrar el thumb para hacer scroll
- **Clic:** Hacer clic en el área del scrollbar para saltar a esa posición
- **Rueda del mouse:** Funciona normalmente con el scroll nativo

---

## 🚨 Errores Comunes

### Error 1: No Ocultar Scrollbar Nativo
**Problema:** No ocultar el scrollbar nativo del navegador  
**Solución:** Ocultar el scrollbar nativo antes de crear el personalizado

```javascript
// ❌ Incorrecto - scrollbar nativo visible
scrollable.style.overflowY = 'auto';
createScrollbar({ targetId: 'scrollable', containerId: 'scrollbar' });

// ✅ Correcto - scrollbar nativo oculto
scrollable.style.cssText = `
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const style = document.createElement('style');
style.textContent = `#scrollable::-webkit-scrollbar { display: none; }`;
document.head.appendChild(style);
createScrollbar({ targetId: 'scrollable', containerId: 'scrollbar' });
```

### Error 2: TargetId o ContainerId Incorrectos
**Problema:** IDs incorrectos o elementos no existentes  
**Solución:** Asegurar que los elementos existan antes de crear el scrollbar

```javascript
// ❌ Incorrecto - IDs incorrectos
createScrollbar({
  targetId: 'non-existent',
  containerId: 'also-non-existent'
});

// ✅ Correcto - IDs válidos
const scrollable = document.getElementById('scrollable');
const scrollbarContainer = document.getElementById('scrollbar-container');
if (scrollable && scrollbarContainer) {
  createScrollbar({
    targetId: 'scrollable',
    containerId: 'scrollbar-container'
  });
}
```

### Error 3: Orientación Incorrecta
**Problema:** Orientación no coincide con el overflow del contenedor  
**Solución:** Usar orientación vertical para overflow-y y horizontal para overflow-x

```javascript
// ❌ Incorrecto - orientación incorrecta
scrollable.style.overflowY = 'auto';
createScrollbar({
  orientation: 'horizontal', // Incorrecto
  targetId: 'scrollable',
  containerId: 'scrollbar'
});

// ✅ Correcto - orientación correcta
scrollable.style.overflowY = 'auto';
createScrollbar({
  orientation: 'vertical', // Correcto
  targetId: 'scrollable',
  containerId: 'scrollbar'
});
```

### Error 4: No Destruir Scrollbar Anterior
**Problema:** Crear múltiples scrollbars sin destruir los anteriores  
**Solución:** Destruir el scrollbar anterior antes de crear uno nuevo

```javascript
// ❌ Incorrecto - múltiples scrollbars
createScrollbar({ targetId: 'scrollable', containerId: 'scrollbar' });
createScrollbar({ targetId: 'scrollable', containerId: 'scrollbar' }); // Duplicado

// ✅ Correcto - destruir antes de recrear
let scrollbarInstance = createScrollbar({ targetId: 'scrollable', containerId: 'scrollbar' });
// ... más tarde
scrollbarInstance.destroy();
scrollbarInstance = createScrollbar({ targetId: 'scrollable', containerId: 'scrollbar' });
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

