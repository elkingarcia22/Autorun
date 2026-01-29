# 📦 Mask

> **Componente UBITS:** `feedback-mask`  
> **Categoría:** Feedback  
> **API:** `window.createMask()` o `<ubits-mask>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-mask--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-mask--default

## 🎯 Descripción

Componente Mask UBITS para onboarding. Crea un overlay oscuro con un "agujero" que destaca un elemento específico de la interfaz. Incluye un Popover integrado para mostrar información o instrucciones. Ideal para guías de usuario, tutoriales y flujos de onboarding.

**Características principales:**
- Overlay oscuro con agujero que destaca un elemento
- Popover integrado con título, contenido y botones
- Posición del popover configurable (auto, top, bottom, left, right)
- Offset del popover configurable
- Padding adicional alrededor del elemento destacado
- Cierre al hacer clic en el overlay
- Abrir/cerrar programáticamente
- Ideal para onboarding y tutoriales

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-mask--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-mask--default
- **Código fuente:** `vendor/ubits/packages/components/mask/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/mask/src/types/MaskOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Mask.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-mask--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-mask--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-mask--default

**Descripción:**
Máscara básica destacando un botón con popover integrado. Permite configurar título, contenido, ancho del popover, posición, offset, padding y comportamiento de cierre.

**Características mostradas:**
- Overlay oscuro con agujero
- Popover con título y contenido
- Botón "Siguiente" en el footer
- Posición automática del popover
- Cierre al hacer clic en el overlay

**Código de ejemplo:**
```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
    width: 'md',
    footerButtons: {
      primary: {
        label: 'Siguiente',
        onClick: () => {
          maskInstance.close();
        }
      }
    }
  },
  popoverPosition: 'auto',
  popoverOffset: 12,
  padding: 8,
  closeOnOverlayClick: true,
  open: false
});

// Abrir la máscara
maskInstance.open();
```

**Opciones utilizadas en la historia Default:**
- `popover.title`: `'PASO 1'` - Título del popover
- `popover.bodyContent`: Contenido del popover
- `popover.width`: `'md'` - Ancho mediano
- `popoverPosition`: `'auto'` - Posición automática
- `popoverOffset`: `12` - Offset de 12px
- `padding`: `8` - Padding de 8px
- `closeOnOverlayClick`: `true` - Cerrar al hacer clic en overlay
- `open`: `false` - Cerrado inicialmente

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `targetElement` | `string \| HTMLElement` | - | Selector CSS o elemento HTML que se quiere destacar (requerido) |
| `popover` | `object` | - | Configuración del popover (requerido) |
| `popover.title` | `string` | - | Título del popover |
| `popover.bodyContent` | `string` | - | Contenido HTML del popover |
| `popover.width` | `string` | `'md'` | Ancho del popover. Opciones: `sm`, `md`, `lg`, `xl` |
| `popover.footerButtons` | `object` | - | Botones del footer del popover (opcional) |
| `popoverPosition` | `string` | `'auto'` | Posición del popover relativa al elemento destacado. Opciones: `auto`, `top`, `bottom`, `left`, `right` |
| `popoverOffset` | `number` | `12` | Offset del popover desde el elemento destacado (en píxeles) |
| `padding` | `number` | `8` | Padding adicional alrededor del elemento destacado (en píxeles) |
| `closeOnOverlayClick` | `boolean` | `true` | Si se debe cerrar al hacer clic en el overlay |
| `open` | `boolean` | `false` | Si la máscara está abierta inicialmente |

### Estructura de popover.footerButtons

```typescript
interface FooterButtons {
  primary?: {
    label: string;
    onClick: () => void;
    enabled?: boolean;
  };
  secondary?: {
    label: string;
    onClick: () => void;
    enabled?: boolean;
  };
  tertiary?: {
    label: string;
    onClick: () => void;
    enabled?: boolean;
  };
}
```

### Posiciones del Popover

| Posición | Descripción |
|----------|-------------|
| `auto` | Posición automática según el espacio disponible (default) |
| `top` | Arriba del elemento destacado |
| `bottom` | Debajo del elemento destacado |
| `left` | A la izquierda del elemento destacado |
| `right` | A la derecha del elemento destacado |

### Anchos del Popover

| Ancho | Descripción |
|-------|-------------|
| `sm` | Pequeño |
| `md` | Mediano (default) |
| `lg` | Grande |
| `xl` | Extra grande |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Mask Básico

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es el primer paso del tutorial.',
    width: 'md'
  },
  open: true
});
```

### Ejemplo 2: Mask con Botón Siguiente

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es el primer paso del tutorial.',
    width: 'md',
    footerButtons: {
      primary: {
        label: 'Siguiente',
        onClick: () => {
          maskInstance.close();
          // Ir al siguiente paso
          showNextStep();
        }
      }
    }
  },
  open: true
});
```

### Ejemplo 3: Mask con Múltiples Botones

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es el primer paso del tutorial.',
    width: 'md',
    footerButtons: {
      primary: {
        label: 'Siguiente',
        onClick: () => {
          maskInstance.close();
          showNextStep();
        }
      },
      secondary: {
        label: 'Omitir',
        onClick: () => {
          maskInstance.close();
          skipTutorial();
        }
      },
      tertiary: {
        label: 'Atrás',
        onClick: () => {
          maskInstance.close();
          showPreviousStep();
        }
      }
    }
  },
  open: true
});
```

### Ejemplo 4: Mask con Posición Específica

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es el primer paso del tutorial.',
    width: 'md',
    footerButtons: {
      primary: {
        label: 'Siguiente',
        onClick: () => maskInstance.close()
      }
    }
  },
  popoverPosition: 'bottom', // Posición específica
  popoverOffset: 20, // Offset de 20px
  open: true
});
```

### Ejemplo 5: Mask con Padding Personalizado

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es el primer paso del tutorial.',
    width: 'md'
  },
  padding: 16, // Padding de 16px alrededor del elemento
  open: true
});
```

### Ejemplo 6: Mask sin Cierre en Overlay

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es el primer paso del tutorial. Debes completar este paso antes de continuar.',
    width: 'md',
    footerButtons: {
      primary: {
        label: 'Entendido',
        onClick: () => maskInstance.close()
      }
    }
  },
  closeOnOverlayClick: false, // No cerrar al hacer clic en overlay
  open: true
});
```

### Ejemplo 7: Mask con Contenido HTML

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: `
      <p>Este es el primer paso del tutorial.</p>
      <ul>
        <li>Paso 1: Haz clic en el botón</li>
        <li>Paso 2: Completa el formulario</li>
        <li>Paso 3: Envía los datos</li>
      </ul>
    `,
    width: 'lg',
    footerButtons: {
      primary: {
        label: 'Siguiente',
        onClick: () => maskInstance.close()
      }
    }
  },
  open: true
});
```

### Ejemplo 8: Flujo de Onboarding Completo

```javascript
const steps = [
  {
    target: '#step1-button',
    title: 'PASO 1',
    content: 'Este es el primer paso del tutorial.'
  },
  {
    target: '#step2-button',
    title: 'PASO 2',
    content: 'Este es el segundo paso del tutorial.'
  },
  {
    target: '#step3-button',
    title: 'PASO 3',
    content: 'Este es el tercer paso del tutorial.'
  }
];

let currentStep = 0;
let maskInstance = null;

function showStep(stepIndex) {
  if (maskInstance) {
    maskInstance.destroy();
  }
  
  const step = steps[stepIndex];
  maskInstance = window.createMask({
    targetElement: step.target,
    popover: {
      title: step.title,
      bodyContent: step.content,
      width: 'md',
      footerButtons: {
        primary: {
          label: stepIndex < steps.length - 1 ? 'Siguiente' : 'Finalizar',
          onClick: () => {
            if (stepIndex < steps.length - 1) {
              showStep(stepIndex + 1);
            } else {
              maskInstance.close();
              completeTutorial();
            }
          }
        },
        secondary: {
          label: 'Omitir',
          onClick: () => {
            maskInstance.close();
            skipTutorial();
          }
        }
      }
    },
    open: true
  });
}

// Iniciar tutorial
showStep(0);
```

### Ejemplo 9: Mask con Ancho Personalizado

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es el primer paso del tutorial con contenido largo que requiere más espacio.',
    width: 'xl', // Ancho extra grande
    footerButtons: {
      primary: {
        label: 'Siguiente',
        onClick: () => maskInstance.close()
      }
    }
  },
  open: true
});
```

### Ejemplo 10: Mask Dinámico

```javascript
let maskInstance = null;

function highlightElement(selector, title, content) {
  // Destruir instancia anterior si existe
  if (maskInstance) {
    maskInstance.destroy();
  }
  
  // Crear nueva instancia
  maskInstance = window.createMask({
    targetElement: selector,
    popover: {
      title,
      bodyContent: content,
      width: 'md',
      footerButtons: {
        primary: {
          label: 'Cerrar',
          onClick: () => {
            maskInstance.close();
          }
        }
      }
    },
    open: true
  });
  
  return maskInstance;
}

// Usar
const mask = highlightElement(
  '#my-button',
  'Información',
  'Este botón te permite realizar una acción importante.'
);
```

---

## 🔄 Métodos de la Instancia

### open()

Abre la máscara programáticamente.

```javascript
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Contenido del popover'
  },
  open: false // Cerrado inicialmente
});

// Abrir después
maskInstance.open();
```

### close()

Cierra la máscara programáticamente.

```javascript
maskInstance.close();
```

### destroy()

Destruye la instancia de la máscara y limpia los recursos.

```javascript
maskInstance.destroy();
maskInstance = null;
```

---

## 🎨 Características Visuales

### Overlay

- Overlay oscuro que cubre toda la pantalla
- Agujero que destaca el elemento objetivo
- Padding configurable alrededor del elemento
- Transición suave al abrir/cerrar

### Popover

- Popover integrado con título y contenido
- 4 anchos disponibles (sm, md, lg, xl)
- 5 posiciones disponibles (auto, top, bottom, left, right)
- Offset configurable desde el elemento
- Footer con botones opcionales (primary, secondary, tertiary)

### Comportamiento

- Cierre al hacer clic en el overlay (configurable)
- Abrir/cerrar programáticamente
- Posición automática del popover según espacio disponible

---

## 🚨 Errores Comunes

### Error 1: TargetElement No Encontrado
**Problema:** El selector CSS no encuentra ningún elemento  
**Solución:** Verificar que el elemento existe antes de crear la máscara

```javascript
// ❌ Incorrecto - elemento no existe
const maskInstance = window.createMask({
  targetElement: '#non-existent-element',
  popover: { title: 'Test', bodyContent: 'Test' }
});

// ✅ Correcto - verificar primero
const element = document.querySelector('#target-button');
if (element) {
  const maskInstance = window.createMask({
    targetElement: '#target-button',
    popover: { title: 'Test', bodyContent: 'Test' }
  });
}
```

### Error 2: Popover sin Contenido
**Problema:** No proporcionar título o contenido del popover  
**Solución:** Siempre proporcionar título y contenido

```javascript
// ❌ Incorrecto - sin contenido
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    // Falta title y bodyContent
  }
});

// ✅ Correcto - con contenido
const maskInstance = window.createMask({
  targetElement: '#target-button',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Contenido del popover'
  }
});
```

### Error 3: Múltiples Instancias Sin Destruir
**Problema:** Crear múltiples instancias sin destruir las anteriores  
**Solución:** Destruir instancia anterior antes de crear una nueva

```javascript
// ❌ Incorrecto - múltiples instancias
let maskInstance1 = window.createMask({ ... });
let maskInstance2 = window.createMask({ ... }); // Duplicado

// ✅ Correcto - una sola instancia
let maskInstance = window.createMask({ ... });
// Si necesitas recrear:
maskInstance.destroy();
maskInstance = window.createMask({ ... });
```

### Error 4: Posición Inválida
**Problema:** Usar una posición que no existe  
**Solución:** Usar solo las posiciones válidas

```javascript
// ❌ Incorrecto - posición inválida
popoverPosition: 'center'

// ✅ Correcto - posición válida
popoverPosition: 'auto'
// O
popoverPosition: 'top'
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Popover](./feedback-popover.md) - Componente relacionado
- [Modal](./feedback-modal.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

