# 📦 Simple Card

> **Componente UBITS:** `layout-simple-card`  
> **Categoría:** Layout  
> **API:** `window.createSimpleCard()` o `<ubits-simple-card>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-simple-card--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-simple-card--default

## 🎯 Descripción

Componente Simple Card UBITS con header decorativo, contenido y botones de acción. Usa tokens UBITS para colores, tipografía y espaciado. Incluye controladores completos para personalizar todos los aspectos del componente.

**Características principales:**
- Header decorativo opcional con burbujas
- Título, subtítulo y contenido configurables
- 4 variantes: default, elevated, bordered, flat
- 4 tamaños: sm, md, lg, xl
- Botones de acción opcionales (hasta 2 botones)
- Tokens UBITS para colores, tipografía y espaciado
- Clases de tipografía configurables

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-simple-card--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-simple-card--default
- **Código fuente:** `vendor/ubits/packages/components/card/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/card/src/types/SimpleCardOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/SimpleCard.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-simple-card--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-simple-card--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-simple-card--default

**Descripción:**
Simple Card con todos los controles disponibles. Permite configurar contenido, header, variantes, tamaños, botones y tokens.

**Características mostradas:**
- Título, subtítulo y contenido configurables
- Header decorativo opcional
- Variante configurable (default, elevated, bordered, flat)
- Tamaño configurable (sm, md, lg, xl)
- Botones configurables (hasta 2)
- Tokens configurables

**Código de ejemplo:**
```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Advanced Card',
  subtitle: 'Card subtitle',
  content: 'Card content goes here',
  showHeader: true,
  headerDecorations: true,
  variant: 'elevated',
  size: 'md',
  showButtons: true,
  buttons: [
    {
      label: 'Ver más',
      variant: 'primary',
      size: 'md',
      onClick: () => {
        console.log('Botón 1 clickeado');
      }
    },
    {
      label: 'Cancelar',
      variant: 'secondary',
      size: 'md',
      onClick: () => {
        console.log('Botón 2 clickeado');
      }
    }
  ]
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Advanced Card'` - Título de la card
- `subtitle`: `'Card subtitle'` - Subtítulo
- `showHeader`: `true` - Mostrar header
- `variant`: `'elevated'` - Variante elevated
- `size`: `'md'` - Tamaño mediano

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la card |
| `title` | `string` | `'Advanced Card'` | Título de la card |
| `subtitle` | `string` | `'Card subtitle'` | Subtítulo de la card |
| `content` | `string` | - | Contenido de la card |
| `showHeader` | `boolean` | `true` | Mostrar header decorativo |
| `headerDecorations` | `boolean` | `true` | Mostrar burbujas decorativas en el header |
| `variant` | `string` | `'default'` | Variante de la card. Opciones: `default`, `elevated`, `bordered`, `flat` |
| `size` | `string` | `'md'` | Tamaño de la card. Opciones: `sm`, `md`, `lg`, `xl` |
| `showButtons` | `boolean` | `true` | Mostrar botones de acción |
| `buttons` | `ButtonOptions[]` | - | Array de botones (hasta 2 botones) |
| `backgroundColorToken` | `string` | - | Token de color para el fondo de la card |
| `borderColorToken` | `string` | - | Token de color para el borde de la card |
| `headerBackgroundToken` | `string` | - | Token de color para el fondo del header |
| `titleTypographyClass` | `string` | `'ubits-heading-h2'` | Clase de tipografía UBITS para el título |
| `subtitleTypographyClass` | `string` | `'ubits-body-md'` | Clase de tipografía UBITS para el subtítulo |
| `contentTypographyClass` | `string` | `'ubits-body-md'` | Clase de tipografía UBITS para el contenido |

### Estructura de ButtonOptions

```typescript
interface ButtonOptions {
  label: string;                    // Texto del botón
  variant?: 'primary' | 'secondary' | 'tertiary'; // Variante del botón
  size?: 'xs' | 'sm' | 'md' | 'lg'; // Tamaño del botón
  onClick?: () => void;            // Callback al hacer click
}
```

---

## 🎨 Variantes

- **`default`**: Variante por defecto - default
- **`elevated`**: Con sombra elevada
- **`bordered`**: Con borde visible
- **`flat`**: Sin sombra ni borde destacado

---

## 🎨 Tamaños

- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande
- **`xl`**: Extra grande

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Simple Card Básica

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Mi Card',
  content: 'Contenido de la card'
});
```

### Ejemplo 2: Simple Card con Header

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Card con Header',
  subtitle: 'Subtítulo de la card',
  content: 'Contenido de la card',
  showHeader: true,
  headerDecorations: true
});
```

### Ejemplo 3: Simple Card sin Header

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Card sin Header',
  content: 'Contenido de la card',
  showHeader: false
});
```

### Ejemplo 4: Simple Card Elevated

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Card Elevated',
  content: 'Card con sombra elevada',
  variant: 'elevated'
});
```

### Ejemplo 5: Simple Card con Botones

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Card con Botones',
  content: 'Card con botones de acción',
  showButtons: true,
  buttons: [
    {
      label: 'Aceptar',
      variant: 'primary',
      size: 'md',
      onClick: () => {
        console.log('Aceptar clickeado');
      }
    },
    {
      label: 'Cancelar',
      variant: 'secondary',
      size: 'md',
      onClick: () => {
        console.log('Cancelar clickeado');
      }
    }
  ]
});
```

### Ejemplo 6: Simple Card Grande

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Card Grande',
  content: 'Card de tamaño grande',
  size: 'lg'
});
```

### Ejemplo 7: Simple Card con Tokens Personalizados

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Card Personalizada',
  content: 'Card con tokens personalizados',
  backgroundColorToken: 'var(--modifiers-normal-color-light-bg-2)',
  borderColorToken: 'var(--modifiers-normal-color-light-border-2)',
  headerBackgroundToken: 'var(--modifiers-normal-color-light-accent-brand)'
});
```

### Ejemplo 8: Simple Card con Tipografía Personalizada

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Card Personalizada',
  subtitle: 'Subtítulo',
  content: 'Contenido',
  titleTypographyClass: 'ubits-heading-h1',
  subtitleTypographyClass: 'ubits-body-lg',
  contentTypographyClass: 'ubits-body-sm'
});
```

### Ejemplo 9: Simple Card Completa

```javascript
window.createSimpleCard({
  containerId: 'simple-card-container',
  title: 'Card Completa',
  subtitle: 'Subtítulo de la card',
  content: 'Contenido detallado de la card con información importante.',
  showHeader: true,
  headerDecorations: true,
  variant: 'elevated',
  size: 'md',
  showButtons: true,
  buttons: [
    {
      label: 'Ver más',
      variant: 'primary',
      size: 'md',
      onClick: () => {
        console.log('Ver más clickeado');
        navigateToDetails();
      }
    },
    {
      label: 'Favorito',
      variant: 'secondary',
      size: 'md',
      onClick: () => {
        console.log('Favorito clickeado');
        toggleFavorite();
      }
    }
  ],
  backgroundColorToken: 'var(--modifiers-normal-color-light-bg-1)',
  borderColorToken: 'var(--modifiers-normal-color-light-border-1)',
  headerBackgroundToken: 'var(--modifiers-normal-color-light-bg-4)'
});
```

### Ejemplo 10: Simple Card Dinámica

```javascript
function createProductCard(product) {
  window.createSimpleCard({
    containerId: `product-card-${product.id}`,
    title: product.name,
    subtitle: product.category,
    content: product.description,
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      {
        label: 'Comprar',
        variant: 'primary',
        size: 'md',
        onClick: () => {
          addToCart(product);
        }
      },
      {
        label: 'Favorito',
        variant: 'secondary',
        size: 'md',
        onClick: () => {
          toggleFavorite(product.id);
        }
      }
    ]
  });
}

// Usar
const product = {
  id: 1,
  name: 'Producto 1',
  category: 'Electrónica',
  description: 'Descripción del producto'
};
createProductCard(product);
```

---

## 🔄 Callbacks y Eventos

### onClick en Botones

Se ejecuta cuando se hace click en un botón de la card.

```javascript
buttons: [
  {
    label: 'Aceptar',
    variant: 'primary',
    onClick: () => {
      console.log('Botón clickeado');
      // Realizar acción
      performAction();
      
      // Navegar
      navigateToPage();
      
      // Cerrar modal
      closeModal();
    }
  }
]
```

---

## 🎨 Características Visuales

### Header Decorativo

- Fondo con color configurable
- Burbujas decorativas opcionales
- Altura según tamaño de la card

### Contenido

- Título destacado
- Subtítulo opcional
- Contenido con tipografía configurable

### Botones

- Hasta 2 botones en el footer
- Variantes: primary, secondary, tertiary
- Tamaños: xs, sm, md, lg

### Variantes Visuales

- **Default:** Estilo base
- **Elevated:** Sombra para efecto de elevación
- **Bordered:** Borde visible destacado
- **Flat:** Sin efectos visuales adicionales

---

## 🚨 Errores Comunes

### Error 1: Más de 2 Botones
**Problema:** Proporcionar más de 2 botones  
**Solución:** Máximo 2 botones permitidos

```javascript
// ❌ Incorrecto - más de 2 botones
buttons: [
  { label: 'Botón 1' },
  { label: 'Botón 2' },
  { label: 'Botón 3' } // Demasiados botones
]

// ✅ Correcto - máximo 2 botones
buttons: [
  { label: 'Botón 1' },
  { label: 'Botón 2' }
]
```

### Error 2: Botones sin Label
**Problema:** Botones sin texto  
**Solución:** Cada botón debe tener un label

```javascript
// ❌ Incorrecto - botón sin label
buttons: [
  { variant: 'primary' } // Falta label
]

// ✅ Correcto - botón con label
buttons: [
  { label: 'Aceptar', variant: 'primary' }
]
```

### Error 3: Tokens Inválidos
**Problema:** Usar tokens que no existen  
**Solución:** Usar tokens UBITS válidos

```javascript
// ❌ Incorrecto - token inválido
backgroundColorToken: 'var(--invalid-token)'

// ✅ Correcto - token válido
backgroundColorToken: 'var(--modifiers-normal-color-light-bg-1)'
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

