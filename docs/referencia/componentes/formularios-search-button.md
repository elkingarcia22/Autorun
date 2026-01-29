# 📦 Search Button

> **Componente UBITS:** `formularios-search-button`  
> **Categoría:** Formularios  
> **API:** `window.createSearchButton()` o `<ubits-search-button>`  
> **Storybook Local:** http://localhost:6006/?path=/story/formularios-search-button--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-search-button--default

## 🎯 Descripción

Componente Search Button UBITS con modo botón e input. Cuando está activo, muestra un campo de búsqueda con icono. Cuando no está activo, muestra solo un botón con icono de lupa. Usa tokens UBITS exclusivamente.

**Características principales:**
- 2 modos: botón (inactivo) e input (activo)
- 2 tamaños: sm (32px), md (40px)
- 4 estados: default, hover, active, disabled
- Placeholder y valor configurables
- Ancho del input configurable
- Botón de limpiar opcional
- Callbacks para cambio, click, focus y blur

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/formularios-search-button--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-search-button--default
- **Código fuente:** `vendor/ubits/packages/components/search-button/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/search-button/src/types/SearchButtonOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/SearchButton.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `formularios-search-button--default`  
**URL Local:** http://localhost:6006/?path=/story/formularios-search-button--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-search-button--default

**Descripción:**
Search Button con todos los controles disponibles. Permite configurar modo activo, tamaño, estado, placeholder, valor y ancho.

**Características mostradas:**
- Modo activo/inactivo configurable
- Tamaño configurable (sm, md)
- Estado configurable (default, hover, active, disabled)
- Placeholder configurable
- Valor configurable
- Ancho del input configurable

**Código de ejemplo:**
```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: false,
  size: 'md',
  state: 'default',
  disabled: false,
  placeholder: 'Buscar...',
  value: '',
  width: 248,
  onChange: (value) => {
    console.log('Valor cambiado:', value);
    performSearch(value);
  },
  onClick: () => {
    console.log('Botón clickeado');
    activateSearch();
  },
  onFocus: () => {
    console.log('Input enfocado');
  },
  onBlur: () => {
    console.log('Input perdió focus');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `active`: `false` - Modo botón (inactivo)
- `size`: `'md'` - Tamaño mediano
- `state`: `'default'` - Estado por defecto
- `width`: `248` - Ancho del input en píxeles

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el search button |
| `active` | `boolean` | `false` | Si el botón está en modo activo (muestra input) |
| `size` | `string` | `'md'` | Tamaño del botón. Opciones: `sm` (32px), `md` (40px) |
| `state` | `string` | `'default'` | Estado del botón. Opciones: `default`, `hover`, `active`, `disabled` |
| `disabled` | `boolean` | `false` | Si el botón está deshabilitado |
| `placeholder` | `string` | `''` | Placeholder del input cuando está activo |
| `value` | `string` | `''` | Valor del input cuando está activo |
| `width` | `number` | `248` | Ancho del input cuando está activo (en px) |
| `onChange` | `function` | - | Función a ejecutar cuando cambia el valor del input |
| `onClick` | `function` | - | Función a ejecutar cuando se hace click en el botón |
| `onFocus` | `function` | - | Función a ejecutar cuando el input recibe focus |
| `onBlur` | `function` | - | Función a ejecutar cuando el input pierde focus |
| `className` | `string` | `''` | Clases CSS adicionales |

---

## 🎨 Modos

### Modo Botón (Inactivo)

Cuando `active: false`, muestra solo un botón con icono de lupa.

```javascript
active: false
```

### Modo Input (Activo)

Cuando `active: true`, muestra un campo de búsqueda con input.

```javascript
active: true
```

---

## 🎨 Tamaños y Estados

### Tamaños

- **`sm`**: Pequeño (32px)
- **`md`**: Mediano (40px) - default

### Estados

- **`default`**: Estado normal - default
- **`hover`**: Estado hover (cursor sobre el botón)
- **`active`**: Estado activo (input desplegado)
- **`disabled`**: Estado deshabilitado (no interactivo)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Search Button Básico

```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: false,
  size: 'md',
  onClick: () => {
    // Activar modo input
    activateSearch();
  }
});
```

### Ejemplo 2: Search Button Activo

```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: true,
  size: 'md',
  placeholder: 'Buscar...',
  value: '',
  width: 300,
  onChange: (value) => {
    performSearch(value);
  }
});
```

### Ejemplo 3: Search Button con Placeholder

```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: true,
  placeholder: 'Buscar productos, categorías...',
  width: 400,
  onChange: (value) => {
    searchProducts(value);
  }
});
```

### Ejemplo 4: Search Button Pequeño

```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: false,
  size: 'sm',
  onClick: () => {
    activateSearch();
  }
});
```

### Ejemplo 5: Search Button con Valor Inicial

```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: true,
  placeholder: 'Buscar...',
  value: 'texto inicial',
  width: 300,
  onChange: (value) => {
    updateSearch(value);
  }
});
```

### Ejemplo 6: Search Button Deshabilitado

```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: false,
  disabled: true,
  state: 'disabled'
});
```

### Ejemplo 7: Search Button con Ancho Personalizado

```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: true,
  placeholder: 'Buscar...',
  width: 500, // Ancho personalizado
  onChange: (value) => {
    performSearch(value);
  }
});
```

### Ejemplo 8: Search Button con Toggle Manual

```javascript
let isActive = false;

function toggleSearch() {
  isActive = !isActive;
  window.createSearchButton({
    containerId: 'search-container',
    active: isActive,
    placeholder: 'Buscar...',
    width: 300,
    onChange: (value) => {
      if (value === '') {
        // Si se limpia, cerrar
        isActive = false;
        toggleSearch();
      } else {
        performSearch(value);
      }
    },
    onBlur: () => {
      // Cerrar si está vacío
      const input = document.querySelector('#search-container input');
      if (input && input.value === '') {
        isActive = false;
        toggleSearch();
      }
    }
  });
}

// Inicializar
toggleSearch();
```

### Ejemplo 9: Search Button con Búsqueda en Tiempo Real

```javascript
let searchTimeout;

window.createSearchButton({
  containerId: 'search-container',
  active: true,
  placeholder: 'Buscar...',
  width: 300,
  onChange: (value) => {
    // Debounce para búsqueda en tiempo real
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (value.length >= 3) {
        performSearch(value);
      } else if (value.length === 0) {
        clearResults();
      }
    }, 300);
  }
});
```

### Ejemplo 10: Search Button Completo

```javascript
window.createSearchButton({
  containerId: 'search-container',
  active: true,
  size: 'md',
  state: 'active',
  placeholder: 'Buscar usuarios, productos...',
  value: '',
  width: 400,
  onChange: (value) => {
    console.log('Búsqueda:', value);
    performSearch(value);
  },
  onClick: () => {
    console.log('Botón clickeado');
  },
  onFocus: () => {
    console.log('Input enfocado');
    showSearchSuggestions();
  },
  onBlur: () => {
    console.log('Input perdió focus');
    hideSearchSuggestions();
  }
});
```

---

## 🔄 Callbacks y Eventos

### onChange

Se ejecuta cuando cambia el valor del input.

```javascript
onChange: (value) => {
  console.log('Valor cambiado:', value);
  // Realizar búsqueda
  performSearch(value);
  
  // Actualizar resultados
  updateSearchResults(value);
  
  // Guardar en historial
  saveSearchHistory(value);
}
```

**Parámetros:**
- `value` (string): Nuevo valor del input

### onClick

Se ejecuta cuando se hace click en el botón (modo inactivo).

```javascript
onClick: () => {
  console.log('Botón clickeado');
  // Activar modo input
  activateSearch();
  
  // Mostrar sugerencias
  showSearchSuggestions();
}
```

### onFocus

Se ejecuta cuando el input recibe focus.

```javascript
onFocus: () => {
  console.log('Input enfocado');
  // Mostrar sugerencias
  showSearchSuggestions();
  
  // Resaltar componente
  highlightSearch();
}
```

### onBlur

Se ejecuta cuando el input pierde focus.

```javascript
onBlur: () => {
  console.log('Input perdió focus');
  // Ocultar sugerencias
  hideSearchSuggestions();
  
  // Opcionalmente cerrar si está vacío
  const input = document.querySelector('#search-container input');
  if (input && input.value === '') {
    deactivateSearch();
  }
}
```

---

## 🎨 Características Visuales

### Transición

- **Botón → Input:** Expansión suave del input
- **Input → Botón:** Contracción suave del input
- **Animaciones:** Suaves y fluidas

### Botón de Limpiar

- Aparece cuando hay texto en el input
- Permite limpiar el valor rápidamente
- Icono "X" o similar

### Icono de Búsqueda

- Siempre visible (en botón o input)
- Icono FontAwesome "search"
- Tamaño según el tamaño del componente

---

## 🚨 Errores Comunes

### Error 1: No Manejar Cambio de Modo
**Problema:** No actualizar el estado cuando cambia de botón a input  
**Solución:** Manejar el cambio de modo correctamente

```javascript
// ❌ Incorrecto - no actualiza estado
onClick: () => {
  console.log('Click');
  // Falta actualizar active
}

// ✅ Correcto - actualiza estado
let isActive = false;
onClick: () => {
  isActive = true;
  updateSearchButton({ active: true });
}
```

### Error 2: Valor sin onChange
**Problema:** Proporcionar `value` sin `onChange`  
**Solución:** Implementar `onChange` para manejar cambios

```javascript
// ❌ Incorrecto - valor sin onChange
value: 'texto',
onChange: undefined

// ✅ Correcto - con onChange
value: 'texto',
onChange: (value) => {
  updateValue(value);
}
```

### Error 3: Ancho Muy Pequeño
**Problema:** Ancho del input muy pequeño  
**Solución:** Usar anchos apropiados

```javascript
// ❌ Incorrecto - muy estrecho
width: 50

// ✅ Correcto - ancho apropiado
width: 248 // o más grande según necesidad
```

### Error 4: Deshabilitado con Active
**Problema:** Usar `disabled: true` con `active: true`  
**Solución:** Si está deshabilitado, no debería estar activo

```javascript
// ❌ Incorrecto - deshabilitado pero activo
active: true,
disabled: true

// ✅ Correcto - deshabilitado e inactivo
active: false,
disabled: true
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

