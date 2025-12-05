# 📦 Stepper

> **Componente UBITS:** `layout-stepper`  
> **Categoría:** Layout  
> **API:** `window.createStepper()` o `<ubits-stepper>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-stepper--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-stepper--default

## 🎯 Descripción

Componente Stepper UBITS para mostrar el progreso de un proceso multi-paso. Soporta orientación horizontal y vertical, con estados: default, completado, activo, error y warning. Cada paso puede tener número, título y descripción.

**Características principales:**
- 2 orientaciones: horizontal, vertical
- 4 tamaños: xs, sm, md, lg
- 5 estados por paso: default, completed, active, error, warning
- Título y descripción opcionales por paso
- Navegación entre pasos
- Línea de conexión entre pasos
- Iconos opcionales por paso

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-stepper--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-stepper--default
- **Código fuente:** `vendor/ubits/packages/components/stepper/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/stepper/src/types/StepperOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Stepper.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-stepper--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-stepper--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-stepper--default

**Descripción:**
Stepper con todos los controles disponibles. Permite configurar orientación, tamaño, número de pasos, estados, títulos y descripciones.

**Características mostradas:**
- Orientación configurable (horizontal, vertical)
- Tamaño configurable (xs, sm, md, lg)
- Número de pasos configurable (2-5)
- Estados configurables por paso
- Títulos y descripciones configurables

**Código de ejemplo:**
```javascript
window.createStepper({
  containerId: 'stepper-container',
  orientation: 'horizontal',
  size: 'md',
  steps: [
    {
      number: 1,
      title: 'Paso 1',
      description: 'Descripción del paso 1',
      state: 'completed'
    },
    {
      number: 2,
      title: 'Paso 2',
      description: 'Descripción del paso 2',
      state: 'active'
    },
    {
      number: 3,
      title: 'Paso 3',
      description: 'Descripción del paso 3',
      state: 'default'
    }
  ],
  onStepClick: (stepNumber) => {
    console.log('Paso clickeado:', stepNumber);
    navigateToStep(stepNumber);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `orientation`: `'horizontal'` - Orientación horizontal
- `size`: `'md'` - Tamaño mediano
- `numSteps`: `3` - 3 pasos
- `showTitle`: `true` - Mostrar títulos
- `showDescription`: `true` - Mostrar descripciones

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el stepper |
| `orientation` | `string` | `'horizontal'` | Orientación del stepper. Opciones: `horizontal`, `vertical` |
| `size` | `string` | `'md'` | Tamaño del stepper. Opciones: `xs`, `sm`, `md`, `lg` |
| `steps` | `StepperStep[]` | - | Array de pasos del stepper (requerido) |
| `showTitle` | `boolean` | `true` | Mostrar títulos |
| `showDescription` | `boolean` | `true` | Mostrar descripciones (texto complementario) |
| `onStepClick` | `function` | - | Callback que se ejecuta cuando se hace click en un paso |

### Estructura de StepperStep

```typescript
interface StepperStep {
  number: number;                    // Número del paso (1-indexed)
  title?: string;                    // Título del paso (opcional)
  description?: string;              // Descripción del paso (opcional)
  state?: 'default' | 'completed' | 'active' | 'error' | 'warning'; // Estado del paso
  icon?: string;                     // Icono FontAwesome opcional
}
```

### Estados de Paso

- **`default`**: Estado por defecto (no completado, no activo)
- **`completed`**: Paso completado (checkmark)
- **`active`**: Paso activo actual
- **`error`**: Paso con error
- **`warning`**: Paso con advertencia

---

## 🎨 Orientaciones y Tamaños

### Orientaciones

- **`horizontal`**: Pasos en fila horizontal - default
- **`vertical`**: Pasos en columna vertical

### Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Stepper Básico

```javascript
window.createStepper({
  containerId: 'stepper-container',
  steps: [
    { number: 1, title: 'Paso 1', state: 'completed' },
    { number: 2, title: 'Paso 2', state: 'active' },
    { number: 3, title: 'Paso 3', state: 'default' }
  ]
});
```

### Ejemplo 2: Stepper con Descripciones

```javascript
window.createStepper({
  containerId: 'stepper-container',
  steps: [
    {
      number: 1,
      title: 'Información',
      description: 'Completa tu información personal',
      state: 'completed'
    },
    {
      number: 2,
      title: 'Verificación',
      description: 'Verifica tu correo electrónico',
      state: 'active'
    },
    {
      number: 3,
      title: 'Finalización',
      description: 'Completa tu perfil',
      state: 'default'
    }
  ]
});
```

### Ejemplo 3: Stepper Vertical

```javascript
window.createStepper({
  containerId: 'stepper-container',
  orientation: 'vertical',
  steps: [
    { number: 1, title: 'Paso 1', state: 'completed' },
    { number: 2, title: 'Paso 2', state: 'active' },
    { number: 3, title: 'Paso 3', state: 'default' }
  ]
});
```

### Ejemplo 4: Stepper con Error

```javascript
window.createStepper({
  containerId: 'stepper-container',
  steps: [
    { number: 1, title: 'Paso 1', state: 'completed' },
    { number: 2, title: 'Paso 2', state: 'error' },
    { number: 3, title: 'Paso 3', state: 'default' }
  ]
});
```

### Ejemplo 5: Stepper con Warning

```javascript
window.createStepper({
  containerId: 'stepper-container',
  steps: [
    { number: 1, title: 'Paso 1', state: 'completed' },
    { number: 2, title: 'Paso 2', state: 'warning' },
    { number: 3, title: 'Paso 3', state: 'default' }
  ]
});
```

### Ejemplo 6: Stepper Pequeño

```javascript
window.createStepper({
  containerId: 'stepper-container',
  size: 'sm',
  steps: [
    { number: 1, title: 'Paso 1', state: 'completed' },
    { number: 2, title: 'Paso 2', state: 'active' }
  ]
});
```

### Ejemplo 7: Stepper sin Descripciones

```javascript
window.createStepper({
  containerId: 'stepper-container',
  showDescription: false,
  steps: [
    { number: 1, title: 'Paso 1', state: 'completed' },
    { number: 2, title: 'Paso 2', state: 'active' },
    { number: 3, title: 'Paso 3', state: 'default' }
  ]
});
```

### Ejemplo 8: Stepper con Iconos

```javascript
window.createStepper({
  containerId: 'stepper-container',
  steps: [
    {
      number: 1,
      title: 'Configuración',
      icon: 'cog',
      state: 'completed'
    },
    {
      number: 2,
      title: 'Verificación',
      icon: 'check-circle',
      state: 'active'
    },
    {
      number: 3,
      title: 'Finalización',
      icon: 'flag',
      state: 'default'
    }
  ]
});
```

### Ejemplo 9: Stepper Completo

```javascript
window.createStepper({
  containerId: 'stepper-container',
  orientation: 'horizontal',
  size: 'md',
  showTitle: true,
  showDescription: true,
  steps: [
    {
      number: 1,
      title: 'Información',
      description: 'Completa tu información personal',
      state: 'completed'
    },
    {
      number: 2,
      title: 'Verificación',
      description: 'Verifica tu correo electrónico',
      state: 'active'
    },
    {
      number: 3,
      title: 'Finalización',
      description: 'Completa tu perfil',
      state: 'default'
    }
  ],
  onStepClick: (stepNumber) => {
    console.log('Paso clickeado:', stepNumber);
    navigateToStep(stepNumber);
  }
});
```

### Ejemplo 10: Stepper Dinámico

```javascript
let currentStep = 1;
const totalSteps = 4;

function updateStepper() {
  const steps = Array.from({ length: totalSteps }, (_, index) => {
    const stepNumber = index + 1;
    let state = 'default';
    
    if (stepNumber < currentStep) {
      state = 'completed';
    } else if (stepNumber === currentStep) {
      state = 'active';
    }
    
    return {
      number: stepNumber,
      title: `Paso ${stepNumber}`,
      description: `Descripción del paso ${stepNumber}`,
      state
    };
  });
  
  window.createStepper({
    containerId: 'stepper-container',
    steps,
    onStepClick: (stepNumber) => {
      if (stepNumber <= currentStep) {
        currentStep = stepNumber;
        updateStepper();
        showStepContent(stepNumber);
      }
    }
  });
}

// Inicializar
updateStepper();

// Avanzar al siguiente paso
function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    updateStepper();
  }
}
```

---

## 🔄 Callbacks y Eventos

### onStepClick

Se ejecuta cuando se hace click en un paso.

```javascript
onStepClick: (stepNumber) => {
  console.log('Paso clickeado:', stepNumber);
  // Navegar al paso
  navigateToStep(stepNumber);
  
  // Mostrar contenido del paso
  showStepContent(stepNumber);
  
  // Actualizar estado
  updateCurrentStep(stepNumber);
}
```

**Parámetros:**
- `stepNumber` (number): Número del paso clickeado (1-indexed)

---

## 🎨 Características Visuales

### Línea de Conexión

- Conecta los pasos entre sí
- Color según estado (completado, activo, error, etc.)
- Estilo según tokens UBITS

### Estados Visuales

- **Completed:** Checkmark verde
- **Active:** Círculo destacado con color primario
- **Error:** Icono de error rojo
- **Warning:** Icono de advertencia amarillo/naranja
- **Default:** Círculo gris

### Orientación Horizontal

- Pasos en fila
- Línea de conexión horizontal
- Ideal para procesos lineales

### Orientación Vertical

- Pasos en columna
- Línea de conexión vertical
- Ideal para procesos largos o móviles

---

## 🚨 Errores Comunes

### Error 1: Pasos sin Números
**Problema:** Pasos sin número  
**Solución:** Cada paso debe tener un número único

```javascript
// ❌ Incorrecto - sin número
{ title: 'Paso 1', state: 'active' }

// ✅ Correcto - con número
{ number: 1, title: 'Paso 1', state: 'active' }
```

### Error 2: Números Duplicados
**Problema:** Múltiples pasos con el mismo número  
**Solución:** Cada paso debe tener un número único

```javascript
// ❌ Incorrecto - números duplicados
[
  { number: 1, title: 'Paso 1' },
  { number: 1, title: 'Paso 2' } // Número duplicado
]

// ✅ Correcto - números únicos
[
  { number: 1, title: 'Paso 1' },
  { number: 2, title: 'Paso 2' }
]
```

### Error 3: Múltiples Pasos Activos
**Problema:** Múltiples pasos con estado `active`  
**Solución:** Solo un paso debe estar activo a la vez

```javascript
// ❌ Incorrecto - múltiples activos
[
  { number: 1, state: 'active' },
  { number: 2, state: 'active' } // Múltiples activos
]

// ✅ Correcto - solo uno activo
[
  { number: 1, state: 'completed' },
  { number: 2, state: 'active' }
]
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

