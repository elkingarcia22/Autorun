# 📦 Contenedor

> **Componente UBITS:** `layout-contenedor`  
> **Categoría:** Layout  
> **API:** `window.createContenedor()` o `<ubits-contenedor>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-contenedor--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-contenedor--default

## 🎯 Descripción

Componente contenedor básico UBITS con fondo configurable (bg1, bg2, bg3, bg4), bordes con radio de 8px y padding interno de 12px. Usa tokens UBITS para mantener consistencia visual.

**Características principales:**
- 4 variantes de fondo: bg1, bg2, bg3, bg4
- Border-radius de 8px
- Padding interno de 12px (token UBITS)
- Borde opcional
- Contenido personalizable
- Usa tokens UBITS para colores, tipografía y espaciado

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-contenedor--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-contenedor--default
- **Código fuente:** `vendor/ubits/packages/components/contenedor/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/contenedor/src/types/ContenedorOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Contenedor.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-contenedor--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-contenedor--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-contenedor--default

**Descripción:**
Contenedor básico con todos los controles disponibles. Permite configurar el contenido, variante de fondo y borde opcional.

**Características mostradas:**
- Contenido personalizable
- 4 variantes de fondo (bg1, bg2, bg3, bg4)
- Borde opcional
- Border-radius de 8px
- Padding interno de 12px

**Código de ejemplo:**
```javascript
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Este es un contenedor básico con fondo configurable.',
  backgroundVariant: 'bg1',
  showBorder: false
});
```

**Opciones utilizadas en la historia Default:**
- `content`: `'Este es un contenedor básico con fondo configurable...'` - Contenido del contenedor
- `showBorder`: `false` - Sin borde por defecto
- `backgroundVariant`: `'bg1'` - Fondo bg1 por defecto

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el componente |
| `content` | `string` | - | Contenido del contenedor (texto o HTML) |
| `backgroundVariant` | `string` | `'bg1'` | Variante de fondo. Opciones: `bg1`, `bg2`, `bg3`, `bg4` |
| `showBorder` | `boolean` | `false` | Mostrar borde visual (opcional) |

### Variantes de Fondo

| Variante | Token UBITS | Descripción |
|----------|-------------|-------------|
| `bg1` | `--modifiers-normal-color-light-bg-1` | Fondo base (más claro) |
| `bg2` | `--modifiers-normal-color-light-bg-2` | Fondo secundario |
| `bg3` | `--modifiers-normal-color-light-bg-3` | Fondo terciario |
| `bg4` | `--modifiers-normal-color-light-bg-4` | Fondo cuaternario (más oscuro) |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Contenedor Básico

```javascript
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Contenido del contenedor',
  backgroundVariant: 'bg1'
});
```

### Ejemplo 2: Contenedor con Borde

```javascript
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Contenedor con borde visible',
  backgroundVariant: 'bg1',
  showBorder: true
});
```

### Ejemplo 3: Contenedor con Fondo bg2

```javascript
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Contenedor con fondo bg2',
  backgroundVariant: 'bg2'
});
```

### Ejemplo 4: Contenedor con Fondo bg3

```javascript
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Contenedor con fondo bg3',
  backgroundVariant: 'bg3'
});
```

### Ejemplo 5: Contenedor con Fondo bg4

```javascript
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Contenedor con fondo bg4',
  backgroundVariant: 'bg4'
});
```

### Ejemplo 6: Contenedor con HTML

```javascript
window.createContenedor({
  containerId: 'contenedor-container',
  content: `
    <h3>Título del contenedor</h3>
    <p>Párrafo de contenido con <strong>texto en negrita</strong>.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  `,
  backgroundVariant: 'bg1',
  showBorder: true
});
```

### Ejemplo 7: Múltiples Contenedores

```javascript
// Contenedor 1
window.createContenedor({
  containerId: 'contenedor-1',
  content: 'Contenedor con fondo bg1',
  backgroundVariant: 'bg1'
});

// Contenedor 2
window.createContenedor({
  containerId: 'contenedor-2',
  content: 'Contenedor con fondo bg2',
  backgroundVariant: 'bg2'
});

// Contenedor 3
window.createContenedor({
  containerId: 'contenedor-3',
  content: 'Contenedor con fondo bg3',
  backgroundVariant: 'bg3'
});
```

### Ejemplo 8: Contenedor Dinámico

```javascript
let contenedorContent = 'Contenido inicial';

function updateContenedor() {
  window.createContenedor({
    containerId: 'contenedor-container',
    content: contenedorContent,
    backgroundVariant: 'bg1',
    showBorder: true
  });
}

// Actualizar contenido
function setContent(newContent) {
  contenedorContent = newContent;
  updateContenedor();
}

// Cambiar variante de fondo
function setBackgroundVariant(variant) {
  window.createContenedor({
    containerId: 'contenedor-container',
    content: contenedorContent,
    backgroundVariant: variant,
    showBorder: true
  });
}

// Inicializar
updateContenedor();
```

### Ejemplo 9: Contenedor con Estilos Personalizados

```javascript
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Contenedor con estilos personalizados',
  backgroundVariant: 'bg1',
  showBorder: true
});

// Agregar estilos adicionales después de la creación
const contenedor = document.getElementById('contenedor-container');
if (contenedor) {
  const ubitsContainer = contenedor.querySelector('.ubits-container');
  if (ubitsContainer) {
    ubitsContainer.style.maxWidth = '800px';
    ubitsContainer.style.margin = '0 auto';
  }
}
```

### Ejemplo 10: Contenedor como Wrapper

```javascript
// Crear contenedor
window.createContenedor({
  containerId: 'wrapper-container',
  content: '',
  backgroundVariant: 'bg1',
  showBorder: true
});

// Agregar contenido dinámico
const wrapper = document.getElementById('wrapper-container');
if (wrapper) {
  const ubitsContainer = wrapper.querySelector('.ubits-container');
  if (ubitsContainer) {
    // Agregar botones
    const button1 = document.createElement('button');
    button1.textContent = 'Botón 1';
    button1.className = 'ubits-button ubits-button--primary';
    
    const button2 = document.createElement('button');
    button2.textContent = 'Botón 2';
    button2.className = 'ubits-button ubits-button--secondary';
    
    ubitsContainer.appendChild(button1);
    ubitsContainer.appendChild(button2);
  }
}
```

---

## 🎨 Características Visuales

### Estilos Aplicados

- **Border-radius:** `8px` (fijo)
- **Padding:** `12px` (token UBITS: `--p-spacing-mode-1-md`)
- **Fondo:** Según variante seleccionada (bg1, bg2, bg3, bg4)
- **Borde:** Opcional, `1px solid` con token `--modifiers-normal-color-light-border-1`
- **Color de texto:** Token `--modifiers-normal-color-light-fg-1-high`
- **Tipografía:** Token UBITS para body-md-regular

### Tokens UBITS Utilizados

- **Fondo:** `--modifiers-normal-color-light-bg-{1|2|3|4}`
- **Borde:** `--modifiers-normal-color-light-border-1`
- **Texto:** `--modifiers-normal-color-light-fg-1-high`
- **Padding:** `--p-spacing-mode-1-md` (12px)
- **Tipografía:** `--modifiers-normal-body-md-regular-fontsize`, `--modifiers-normal-body-md-regular-lineheight`

---

## 🚨 Errores Comunes

### Error 1: Variante de Fondo Inválida
**Problema:** Usar una variante de fondo que no existe  
**Solución:** Usar solo bg1, bg2, bg3 o bg4

```javascript
// ❌ Incorrecto - variante inválida
backgroundVariant: 'bg5'

// ✅ Correcto - variante válida
backgroundVariant: 'bg1'
```

### Error 2: Contenido Vacío
**Problema:** No proporcionar contenido  
**Solución:** Siempre proporcionar contenido (puede ser string vacío si se va a llenar después)

```javascript
// ❌ Incorrecto - sin contenido
window.createContenedor({
  containerId: 'contenedor-container'
  // Falta content
});

// ✅ Correcto - con contenido
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Contenido del contenedor'
});
```

### Error 3: Contenedor ID Duplicado
**Problema:** Usar el mismo containerId múltiples veces  
**Solución:** Usar IDs únicos para cada contenedor

```javascript
// ❌ Incorrecto - ID duplicado
window.createContenedor({
  containerId: 'contenedor-container',
  content: 'Contenedor 1'
});
window.createContenedor({
  containerId: 'contenedor-container', // Mismo ID
  content: 'Contenedor 2'
});

// ✅ Correcto - IDs únicos
window.createContenedor({
  containerId: 'contenedor-1',
  content: 'Contenedor 1'
});
window.createContenedor({
  containerId: 'contenedor-2',
  content: 'Contenedor 2'
});
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Simple Card](./layout-simple-card.md) - Componente relacionado
- [Selection Card](./layout-selection-card.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

