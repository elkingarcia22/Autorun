# 📚 Ejemplo de Uso - Sistemas Automáticos POC Storybook V2

## 🎯 Uso Básico

### **Ejemplo 1: RadioButton con Preservación Automática**

```typescript
import { autoPreserveRadioButton } from '@autorun/core/poc/storybook-v2';

// Handler para cambios
function handleRadioButtonChange(event: Event) {
  const input = event.target as HTMLInputElement;
  console.log('RadioButton cambiado:', input.value);

  // Actualizar estado visual de todos los RadioButtons del grupo
  const allRadios = document.querySelectorAll(
    `input[type="radio"][name="${input.name}"]`
  );
  allRadios.forEach((radio) => {
    const label = radio.closest('.ubits-radio-button');
    if (label) {
      if (radio === input) {
        label.classList.add('ubits-radio-button--checked');
        label.classList.remove('ubits-radio-button--unchecked');
      } else {
        label.classList.remove('ubits-radio-button--checked');
        label.classList.add('ubits-radio-button--unchecked');
      }
    }
  });
}

// Configurar preservación automática ANTES de crear los RadioButtons
await autoPreserveRadioButton(
  'radiobutton-group-tipo',
  handleRadioButtonChange
);

// Crear RadioButtons normalmente
window.UBITS.RadioButton.create({
  containerId: 'radiobutton-group-tipo',
  label: 'Opción 1',
  value: 'opcion1',
  name: 'grupo',
  checked: true,
});

window.UBITS.RadioButton.create({
  containerId: 'radiobutton-group-tipo',
  label: 'Opción 2',
  value: 'opcion2',
  name: 'grupo',
  checked: false,
});
```

### **Ejemplo 2: Componente Genérico con Preservación Automática**

```typescript
import { autoPreserveComponent } from '@autorun/core/poc/storybook-v2';

// Configurar preservación automática
await autoPreserveComponent({
  componentId: 'button',
  containerId: 'button-container',
  handlers: {
    onClick: (event: Event) => {
      console.log('Botón clickeado');
    },
  },
  options: {
    // Opciones adicionales para el componente
  },
  waitForDependencies: true,
  dependencyTimeout: 5000,
});

// Crear componente normalmente
window.UBITS.Button.create({
  containerId: 'button-container',
  label: 'Click me',
  onClick: () => {
    console.log('Button clicked');
  },
});
```

## 🔧 Uso Avanzado

### **Ejemplo 3: Uso Manual de ComponentPreserver**

```typescript
import ComponentPreserver from '@autorun/core/poc/storybook-v2/componentPreserver';

// Preservar componente manualmente
ComponentPreserver.preserve('radio-button', 'radiobutton-group-tipo', {
  onChange: handleRadioButtonChange,
  onClick: handleClick
}, {
  // Opciones adicionales
  autoRecreate: true
});

// Crear componente
window.UBITS.RadioButton.create({ ... });

// Obtener información del componente preservado
const preserved = ComponentPreserver.getPreservedComponent('radio-button', 'radiobutton-group-tipo');
console.log('Componente preservado:', preserved);

// Eliminar preservación si es necesario
ComponentPreserver.unpreserve('radio-button', 'radiobutton-group-tipo');
```

### **Ejemplo 4: Uso Manual de EventListenerManager**

```typescript
import EventListenerManager from '@autorun/core/poc/storybook-v2/eventListenerManager';

// Registrar listeners
EventListenerManager.register('radio-button', [
  {
    selector: '.ubits-radio-button__input',
    event: 'change',
    handler: (event: Event) => {
      console.log('Change event:', event);
    },
  },
  {
    selector: '.ubits-radio-button',
    event: 'click',
    handler: (event: Event) => {
      console.log('Click event:', event);
    },
  },
]);

// Re-adjuntar después de recrear HTML
EventListenerManager.reattach('radio-button');

// O re-adjuntar todos
EventListenerManager.reattachAll();
```

### **Ejemplo 5: Verificación de Dependencias**

```typescript
import DependencyChecker from '@autorun/core/poc/storybook-v2/dependencyChecker';

// Verificar dependencias
const check = DependencyChecker.checkAll('radio-button');
console.log('CSS cargado:', check.cssLoaded);
console.log('Componente registrado:', check.componentRegistered);
console.log('ContentManager existe:', check.contentManagerExists);

// Esperar dependencias
const finalCheck = await DependencyChecker.waitForDependencies(
  'radio-button',
  5000
);
if (finalCheck.cssLoaded && finalCheck.componentRegistered) {
  console.log('✅ Todas las dependencias disponibles');
} else {
  console.warn('⚠️ Algunas dependencias no están disponibles');
}

// Reportar estado
DependencyChecker.report('radio-button');
```

## 🎨 Ejemplo Completo: RadioButton en Template Complejo

```typescript
import { autoPreserveRadioButton } from '@autorun/core/poc/storybook-v2';
import DependencyChecker from '@autorun/core/poc/storybook-v2/dependencyChecker';

async function initRadioButtons() {
  // 1. Verificar dependencias
  DependencyChecker.report('radio-button');

  // 2. Esperar dependencias si es necesario
  const check = await DependencyChecker.waitForDependencies(
    'radio-button',
    5000
  );
  if (!check.componentRegistered) {
    console.error('❌ Componente no registrado');
    return;
  }

  // 3. Handler para cambios
  function handleRadioButtonChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const allRadios = document.querySelectorAll(
      `input[type="radio"][name="${input.name}"]`
    );

    allRadios.forEach((radio) => {
      const label = radio.closest('.ubits-radio-button');
      if (label) {
        if (radio === input) {
          label.classList.add('ubits-radio-button--checked');
          label.classList.remove('ubits-radio-button--unchecked');
        } else {
          label.classList.remove('ubits-radio-button--checked');
          label.classList.add('ubits-radio-button--unchecked');
        }
      }
    });
  }

  // 4. Configurar preservación automática
  await autoPreserveRadioButton(
    'radiobutton-group-tipo',
    handleRadioButtonChange
  );

  // 5. Crear RadioButtons
  const options = [
    { label: 'Opción 1', value: 'opcion1', name: 'grupo', checked: true },
    { label: 'Opción 2', value: 'opcion2', name: 'grupo', checked: false },
    { label: 'Opción 3', value: 'opcion3', name: 'grupo', checked: false },
  ];

  options.forEach((opt) => {
    window.UBITS.RadioButton.create({
      containerId: 'radiobutton-group-tipo',
      ...opt,
      onChange: handleRadioButtonChange,
    });
  });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRadioButtons);
} else {
  initRadioButtons();
}
```

## 📋 Checklist de Uso

- [ ] Verificar dependencias antes de usar componentes
- [ ] Configurar preservación automática ANTES de crear componentes
- [ ] Registrar event listeners si se necesitan handlers personalizados
- [ ] Crear componentes normalmente después de configurar preservación
- [ ] Verificar que los componentes se crean correctamente
- [ ] Probar que los componentes persisten después de `updateContent()`

## 🔗 Referencias

- **ComponentPreserver:** `packages/autorun-core/src/poc/storybook-v2/componentPreserver.ts`
- **EventListenerManager:** `packages/autorun-core/src/poc/storybook-v2/eventListenerManager.ts`
- **DependencyChecker:** `packages/autorun-core/src/poc/storybook-v2/dependencyChecker.ts`
- **AutoPreserveHelper:** `packages/autorun-core/src/poc/storybook-v2/autoPreserveHelper.ts`
