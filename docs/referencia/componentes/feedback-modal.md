# 📦 Modal

> **Componente UBITS:** `feedback-modal`  
> **Categoría:** Feedback  
> **API:** `window.createModal()` o `<ubits-modal>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-modal--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-modal--default

## 🎯 Descripción

Componente Modal UBITS centrado con overlay. Ideal para diálogos, confirmaciones y formularios. Soporta diferentes tamaños, variante full-screen, header con título y botón de cerrar, body con contenido scrollable y footer con botones de acción.

**Características principales:**
- 5 tamaños: sm, md, lg, xl, full
- Modo full-screen opcional
- Header con título y botón cerrar
- Body con contenido scrollable
- Footer con botones de acción (tertiary, secondary, primary)
- Overlay con click para cerrar (opcional)
- Animaciones de entrada y salida

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-modal--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-modal--default
- **Código fuente:** `vendor/ubits/packages/components/modal/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/modal/src/types/ModalOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Modal.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-modal--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-modal--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-modal--default

**Descripción:**
Modal con todos los controles disponibles. Permite configurar título, tamaño, contenido, botones del footer y comportamiento de cierre.

**Características mostradas:**
- Título configurable
- Tamaño configurable (sm, md, lg, xl, full)
- Modo full-screen opcional
- Contenido HTML configurable
- Botones del footer configurables (tertiary, secondary, primary)
- Cierre por overlay click configurable

**Código de ejemplo:**
```javascript
window.createModal({
  title: 'Título del modal',
  size: 'md',
  fullScreen: false,
  bodyContent: '<p>Este es el contenido del modal.</p>',
  footerButtons: {
    tertiary: {
      label: 'Cancelar',
      onClick: () => {
        console.log('Cancelar');
      }
    },
    secondary: {
      label: 'Guardar',
      onClick: () => {
        console.log('Guardar');
      }
    },
    primary: {
      label: 'Aplicar',
      onClick: () => {
        console.log('Aplicar');
      }
    }
  },
  closeOnOverlayClick: true,
  onClose: () => {
    console.log('Modal cerrado');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Título del modal'` - Título del modal
- `size`: `'md'` - Tamaño mediano
- `fullScreen`: `false` - No full-screen
- `bodyContent`: HTML del contenido
- `footerButtons`: Botones del footer configurados
- `closeOnOverlayClick`: `true` - Cerrar al hacer click en overlay

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el modal (opcional, se añade al body si no se proporciona) |
| `title` | `string` | `'Título del modal'` | Título principal del modal |
| `size` | `string` | `'md'` | Tamaño del modal usando tokens UBITS. Opciones: `sm`, `md`, `lg`, `xl`, `full` |
| `fullScreen` | `boolean` | `false` | Si el modal debe ocupar altura máxima (full-screen) |
| `bodyContent` | `string \| function` | - | Contenido HTML del cuerpo del modal. Puede ser una cadena HTML o una función que devuelve HTML |
| `footerButtons` | `object` | - | Botones del footer. Objeto con propiedades `tertiary`, `secondary`, `primary` |
| `closeOnOverlayClick` | `boolean` | `true` | Si el modal se cierra al hacer clic fuera de él (en el overlay) |
| `onClose` | `function` | - | Callback que se ejecuta cuando el modal se cierra |

### Estructura de footerButtons

```typescript
interface FooterButtons {
  tertiary?: {
    label: string;
    onClick: () => void;
  };
  secondary?: {
    label: string;
    onClick: () => void;
  };
  primary?: {
    label: string;
    onClick: () => void;
  };
}
```

---

## 🎨 Tamaños Disponibles

- **`sm`**: Pequeño - Para diálogos simples
- **`md`**: Mediano (default) - Para formularios y contenido estándar
- **`lg`**: Grande - Para contenido extenso
- **`xl`**: Extra grande - Para contenido muy extenso
- **`full`**: Completo - Ocupa todo el ancho disponible

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Modal Básico

```javascript
window.createModal({
  title: 'Confirmación',
  size: 'md',
  bodyContent: '<p>¿Estás seguro de que deseas continuar?</p>',
  footerButtons: {
    secondary: {
      label: 'Cancelar',
      onClick: () => {
        // Cerrar modal
      }
    },
    primary: {
      label: 'Confirmar',
      onClick: () => {
        // Ejecutar acción
        console.log('Confirmado');
      }
    }
  },
  closeOnOverlayClick: true,
  onClose: () => {
    console.log('Modal cerrado');
  }
});
```

### Ejemplo 2: Modal con Formulario

```javascript
window.createModal({
  title: 'Nuevo Usuario',
  size: 'lg',
  bodyContent: `
    <form id="user-form">
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" name="name" required>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" name="email" required>
      </div>
    </form>
  `,
  footerButtons: {
    tertiary: {
      label: 'Cancelar',
      onClick: () => {
        // Cerrar sin guardar
      }
    },
    primary: {
      label: 'Guardar',
      onClick: () => {
        const form = document.getElementById('user-form');
        const formData = new FormData(form);
        // Procesar formulario
        console.log('Guardar usuario');
      }
    }
  },
  closeOnOverlayClick: false // No cerrar al hacer click fuera
});
```

### Ejemplo 3: Modal Full-Screen

```javascript
window.createModal({
  title: 'Editor Completo',
  size: 'full',
  fullScreen: true,
  bodyContent: `
    <div style="height: 100%;">
      <textarea style="width: 100%; height: 100%;">Contenido...</textarea>
    </div>
  `,
  footerButtons: {
    secondary: {
      label: 'Cancelar',
      onClick: () => {
        // Cerrar
      }
    },
    primary: {
      label: 'Guardar',
      onClick: () => {
        // Guardar contenido
      }
    }
  }
});
```

### Ejemplo 4: Modal Solo con Botón Primario

```javascript
window.createModal({
  title: 'Información',
  size: 'md',
  bodyContent: '<p>Esta es una notificación importante.</p>',
  footerButtons: {
    primary: {
      label: 'Entendido',
      onClick: () => {
        // Cerrar modal
      }
    }
  }
});
```

### Ejemplo 5: Modal sin Footer

```javascript
window.createModal({
  title: 'Vista Previa',
  size: 'lg',
  bodyContent: '<img src="/image.jpg" alt="Preview">',
  footerButtons: undefined, // Sin footer
  closeOnOverlayClick: true
});
```

### Ejemplo 6: Modal con Contenido Dinámico

```javascript
function createDynamicModal(userData) {
  window.createModal({
    title: `Editar Usuario: ${userData.name}`,
    size: 'lg',
    bodyContent: () => {
      // Generar contenido dinámicamente
      return `
        <form id="edit-user-form">
          <input type="hidden" name="id" value="${userData.id}">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" name="name" value="${userData.name}">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" value="${userData.email}">
          </div>
        </form>
      `;
    },
    footerButtons: {
      secondary: {
        label: 'Cancelar',
        onClick: () => {
          // Cerrar
        }
      },
      primary: {
        label: 'Actualizar',
        onClick: () => {
          // Actualizar usuario
          const form = document.getElementById('edit-user-form');
          const formData = new FormData(form);
          updateUser(formData);
        }
      }
    }
  });
}
```

### Ejemplo 7: Modal que No se Cierra con Overlay

```javascript
window.createModal({
  title: 'Acción Crítica',
  size: 'md',
  bodyContent: '<p>Esta acción no se puede deshacer. ¿Continuar?</p>',
  footerButtons: {
    secondary: {
      label: 'Cancelar',
      onClick: () => {
        // Cerrar
      }
    },
    primary: {
      label: 'Continuar',
      onClick: () => {
        // Ejecutar acción crítica
      }
    }
  },
  closeOnOverlayClick: false // No permitir cerrar clickeando fuera
});
```

---

## 🔄 Callbacks y Eventos

### onClose

Se ejecuta cuando el modal se cierra (por botón cerrar, overlay click, o programáticamente).

```javascript
onClose: () => {
  console.log('Modal cerrado');
  
  // Limpiar estado
  clearModalState();
  
  // Actualizar UI
  updateUI();
}
```

### onClick de Botones del Footer

Cada botón del footer puede tener su propio callback.

```javascript
footerButtons: {
  tertiary: {
    label: 'Cancelar',
    onClick: () => {
      // Acción del botón terciario
      console.log('Cancelar');
      // El modal se cierra automáticamente después del callback
    }
  },
  secondary: {
    label: 'Guardar',
    onClick: () => {
      // Acción del botón secundario
      console.log('Guardar');
      // Validar y guardar datos
    }
  },
  primary: {
    label: 'Aplicar',
    onClick: () => {
      // Acción del botón primario
      console.log('Aplicar');
      // Ejecutar acción principal
    }
  }
}
```

---

## 🎨 Características Visuales

### Overlay

- Fondo oscuro semitransparente
- Click para cerrar (si `closeOnOverlayClick: true`)
- Bloquea interacción con el contenido de fondo

### Header

- Título a la izquierda
- Botón cerrar (X) a la derecha
- Borde inferior

### Body

- Contenido scrollable si excede la altura
- Padding configurado con tokens UBITS

### Footer

- Botones alineados a la derecha
- Orden: Tertiary (izquierda), Secondary (centro), Primary (derecha)
- Borde superior

---

## 🚨 Errores Comunes

### Error 1: No Proporcionar bodyContent
**Problema:** Crear modal sin contenido  
**Solución:** Siempre proporcionar `bodyContent`

```javascript
// ❌ Incorrecto
window.createModal({
  title: 'Modal',
  // Falta bodyContent
});

// ✅ Correcto
window.createModal({
  title: 'Modal',
  bodyContent: '<p>Contenido del modal</p>'
});
```

### Error 2: Usar HTML Complejo sin Escapar
**Problema:** Inyectar HTML no sanitizado  
**Solución:** Sanitizar HTML o usar funciones seguras

```javascript
// ❌ Incorrecto - puede ser vulnerable a XSS
bodyContent: userInput // HTML no sanitizado

// ✅ Correcto - sanitizar o usar texto plano
bodyContent: sanitizeHTML(userInput)
// O
bodyContent: `<p>${escapeHTML(userInput)}</p>`
```

### Error 3: No Manejar Cierre del Modal
**Problema:** No limpiar estado cuando se cierra el modal  
**Solución:** Usar `onClose` para limpiar estado

```javascript
// ❌ Incorrecto - estado no se limpia
window.createModal({
  title: 'Modal',
  bodyContent: '<form>...</form>'
  // Falta onClose
});

// ✅ Correcto - limpiar estado
window.createModal({
  title: 'Modal',
  bodyContent: '<form>...</form>',
  onClose: () => {
    // Limpiar formulario, estado, etc.
    resetForm();
  }
});
```

### Error 4: Múltiples Modales Abiertos
**Problema:** Abrir múltiples modales sin cerrar los anteriores  
**Solución:** Cerrar modales anteriores antes de abrir uno nuevo

```javascript
// ❌ Incorrecto - puede tener múltiples modales
window.createModal({ ... });
window.createModal({ ... }); // Segundo modal

// ✅ Correcto - cerrar antes de abrir
function openModal(options) {
  // Cerrar modal anterior si existe
  const existingModal = document.querySelector('.ubits-modal');
  if (existingModal) {
    // Cerrar modal anterior
  }
  // Abrir nuevo modal
  window.createModal(options);
}
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
