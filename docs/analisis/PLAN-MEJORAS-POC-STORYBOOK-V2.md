# 🚀 Plan de Mejoras - POC Storybook V2

**Objetivo:** Hacer que la POC sea más robusta, automática y lista para producción

---

## 🎯 FASE 1: Sistema Automático de Preservación (CRÍTICO)

### **Problema Actual:**
Cada componente requiere código manual para interceptar `ContentManager.updateContent()`.

### **Solución:**
Crear sistema automático que detecte y preserve componentes automáticamente.

### **Implementación:**

```typescript
// packages/autorun-core/src/poc/storybook-v2/componentPreserver.ts

export interface PreservedComponent {
  componentId: string;
  containerId: string;
  html: string;
  handlers: Record<string, Function>;
  recreate: () => void;
}

class ComponentPreserver {
  private preservedComponents: Map<string, PreservedComponent> = new Map();
  private isIntercepted = false;

  /**
   * Preserva un componente automáticamente
   */
  preserve(componentId: string, containerId: string, handlers: Record<string, Function> = {}) {
    const key = `${componentId}-${containerId}`;
    
    // Guardar información del componente
    this.preservedComponents.set(key, {
      componentId,
      containerId,
      html: '',
      handlers,
      recreate: () => {
        // Función para recrear el componente
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = this.preservedComponents.get(key)?.html || '';
          // Re-agregar event listeners
          this.reattachHandlers(componentId, containerId, handlers);
        }
      }
    });

    // Interceptar ContentManager si aún no se ha hecho
    if (!this.isIntercepted) {
      this.interceptContentManager();
      this.isIntercepted = true;
    }

    // Guardar HTML inicial
    this.saveComponentHTML(containerId);
  }

  /**
   * Intercepta ContentManager.updateContent automáticamente
   */
  private interceptContentManager() {
    if (!window.UBITS_ContentManager) {
      console.warn('[ComponentPreserver] ContentManager no encontrado');
      return;
    }

    const originalUpdateContent = window.UBITS_ContentManager.updateContent;
    if (!originalUpdateContent) {
      console.warn('[ComponentPreserver] updateContent no encontrado');
      return;
    }

    window.UBITS_ContentManager.updateContent = function(section, subSection) {
      // Guardar HTML de todos los componentes preservados
      const preserver = ComponentPreserver.getInstance();
      preserver.saveAllComponentsHTML();

      // Llamar al método original
      const result = originalUpdateContent.call(this, section, subSection);

      // Restaurar componentes después de updateContent
      setTimeout(() => {
        preserver.restoreAllComponents();
      }, 500);

      return result;
    };

    console.log('[ComponentPreserver] ContentManager.updateContent interceptado');
  }

  /**
   * Guarda el HTML de un componente
   */
  private saveComponentHTML(containerId: string) {
    const container = document.getElementById(containerId);
    if (container) {
      const block = container.closest('div[style*="margin-top"]') || container.parentElement;
      if (block) {
        const key = Array.from(this.preservedComponents.entries())
          .find(([_, comp]) => comp.containerId === containerId)?.[0];
        if (key) {
          const comp = this.preservedComponents.get(key);
          if (comp) {
            comp.html = block.outerHTML;
          }
        }
      }
    }
  }

  /**
   * Guarda el HTML de todos los componentes preservados
   */
  private saveAllComponentsHTML() {
    this.preservedComponents.forEach((comp) => {
      this.saveComponentHTML(comp.containerId);
    });
  }

  /**
   * Restaura todos los componentes preservados
   */
  private restoreAllComponents() {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      console.warn('[ComponentPreserver] .content-area no encontrado');
      return;
    }

    this.preservedComponents.forEach((comp) => {
      // Verificar si el componente ya existe
      const existingContainer = document.getElementById(comp.containerId);
      
      if (!existingContainer) {
        // Recrear el componente
        comp.recreate();
      } else {
        // Re-agregar event listeners si es necesario
        this.reattachHandlers(comp.componentId, comp.containerId, comp.handlers);
      }
    });
  }

  /**
   * Re-agrega event listeners a un componente
   */
  private reattachHandlers(componentId: string, containerId: string, handlers: Record<string, Function>) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Implementar lógica específica por componente
    // Por ejemplo, para RadioButton:
    if (componentId === 'radio-button') {
      const inputs = container.querySelectorAll('.ubits-radio-button__input');
      inputs.forEach((input) => {
        if (handlers.onChange) {
          input.addEventListener('change', handlers.onChange);
        }
      });
    }
  }

  private static instance: ComponentPreserver;
  static getInstance(): ComponentPreserver {
    if (!ComponentPreserver.instance) {
      ComponentPreserver.instance = new ComponentPreserver();
    }
    return ComponentPreserver.instance;
  }
}

export default ComponentPreserver.getInstance();
```

### **Uso:**

```typescript
// En la implementación del componente
import ComponentPreserver from '@autorun/core/poc/storybook-v2/componentPreserver';

// Preservar automáticamente
ComponentPreserver.preserve('radio-button', 'radiobutton-group-tipo', {
  onChange: handleRadioButtonChange
});

// Crear componente normalmente
window.UBITS.RadioButton.create({ ... });
```

---

## 🎯 FASE 2: Sistema de Event Listeners Persistente

### **Problema Actual:**
Los event listeners se pierden al recrear HTML.

### **Solución:**
Sistema que automáticamente re-agrega event listeners después de recrear HTML.

### **Implementación:**

```typescript
// packages/autorun-core/src/poc/storybook-v2/eventListenerManager.ts

export interface EventListenerConfig {
  selector: string;
  event: string;
  handler: (event: Event) => void;
  options?: boolean | AddEventListenerOptions;
}

class EventListenerManager {
  private listeners: Map<string, EventListenerConfig[]> = new Map();

  /**
   * Registra event listeners para un componente
   */
  register(componentId: string, configs: EventListenerConfig[]) {
    this.listeners.set(componentId, configs);
    this.attach(componentId);
  }

  /**
   * Adjunta event listeners a un componente
   */
  attach(componentId: string) {
    const configs = this.listeners.get(componentId);
    if (!configs) return;

    configs.forEach((config) => {
      const elements = document.querySelectorAll(config.selector);
      elements.forEach((element) => {
        // Verificar si ya tiene el listener
        if (!element.hasAttribute('data-listener-attached')) {
          element.addEventListener(config.event, config.handler, config.options);
          element.setAttribute('data-listener-attached', 'true');
        }
      });
    });
  }

  /**
   * Re-adjunta todos los listeners (útil después de recrear HTML)
   */
  reattachAll() {
    this.listeners.forEach((_, componentId) => {
      this.attach(componentId);
    });
  }
}

export default new EventListenerManager();
```

### **Uso:**

```typescript
import EventListenerManager from '@autorun/core/poc/storybook-v2/eventListenerManager';

// Registrar listeners
EventListenerManager.register('radio-button', [
  {
    selector: '.ubits-radio-button__input',
    event: 'change',
    handler: handleRadioButtonChange
  },
  {
    selector: '.ubits-radio-button',
    event: 'click',
    handler: handleLabelClick
  }
]);

// Después de recrear HTML
EventListenerManager.reattachAll();
```

---

## 🎯 FASE 3: Template Simplificado para Backend

### **Objetivo:**
Crear template básico sin ContentManager para uso en backend.

### **Estructura:**

```
templates/basico/
├── index.html
├── css/
│   ├── tokens.css          # Copia local de tokens
│   └── components/
│       └── radio-button.css # Copia local del CSS
├── js/
│   └── components/
│       └── radio-button.js  # Provider del componente
└── README.md
```

### **Template Básico (index.html):**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template Básico UBITS</title>
  
  <!-- CSS Local -->
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/components/radio-button.css">
</head>
<body>
  <div class="content-area" style="padding: 24px;">
    <h1>Ejemplo: RadioButton</h1>
    
    <!-- Contenedor para RadioButtons -->
    <div id="radiobutton-group-tipo" style="display: flex; flex-direction: column; gap: 16px;"></div>
  </div>

  <!-- JS Local -->
  <script src="js/components/radio-button.js"></script>
  <script>
    // Inicialización simple - NO intercepta nada
    (function() {
      // Esperar a que el componente esté disponible
      function init() {
        if (!window.UBITS || !window.UBITS.RadioButton) {
          setTimeout(init, 100);
          return;
        }

        // Crear RadioButtons
        const options = [
          { label: 'Opción 1', value: 'opcion1', name: 'grupo', checked: true },
          { label: 'Opción 2', value: 'opcion2', name: 'grupo', checked: false },
          { label: 'Opción 3', value: 'opcion3', name: 'grupo', checked: false }
        ];

        options.forEach((opt) => {
          window.UBITS.RadioButton.create({
            containerId: 'radiobutton-group-tipo',
            ...opt,
            onChange: function(e) {
              console.log('RadioButton cambiado:', e.target.value);
            }
          });
        });
      }

      init();
    })();
  </script>
</body>
</html>
```

### **Ventajas:**
- ✅ Sin ContentManager - no hay problemas de limpieza
- ✅ CSS local - no problemas de timing/CORS
- ✅ Inicialización directa - fácil de entender
- ✅ Sin interceptaciones - código simple

---

## 🎯 FASE 4: Verificación de Dependencias

### **Implementación:**

```typescript
// packages/autorun-core/src/poc/storybook-v2/dependencyChecker.ts

export interface DependencyCheck {
  cssLoaded: boolean;
  componentRegistered: boolean;
  contentManagerExists: boolean;
}

class DependencyChecker {
  /**
   * Verifica que el CSS esté cargado
   */
  checkCSS(componentId: string): boolean {
    const cssUrl = `radio-button.css`;
    const stylesheets = Array.from(document.styleSheets);
    
    return stylesheets.some(sheet => {
      try {
        return sheet.href && sheet.href.includes(cssUrl);
      } catch (e) {
        return false;
      }
    });
  }

  /**
   * Verifica que el componente esté registrado
   */
  checkComponentRegistered(componentId: string): boolean {
    const normalizedId = componentId.replace(/-/g, '');
    const capitalized = normalizedId.charAt(0).toUpperCase() + normalizedId.slice(1);
    return !!(window.UBITS && window.UBITS[capitalized]);
  }

  /**
   * Verifica que ContentManager existe
   */
  checkContentManager(): boolean {
    return !!window.UBITS_ContentManager;
  }

  /**
   * Verifica todas las dependencias
   */
  checkAll(componentId: string): DependencyCheck {
    return {
      cssLoaded: this.checkCSS(componentId),
      componentRegistered: this.checkComponentRegistered(componentId),
      contentManagerExists: this.checkContentManager()
    };
  }

  /**
   * Espera a que las dependencias estén disponibles
   */
  async waitForDependencies(componentId: string, timeout = 5000): Promise<DependencyCheck> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const check = this.checkAll(componentId);
      if (check.cssLoaded && check.componentRegistered) {
        return check;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return this.checkAll(componentId);
  }
}

export default new DependencyChecker();
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### **Fase 1: Sistema Automático de Preservación**
- [ ] Crear `componentPreserver.ts`
- [ ] Implementar interceptación automática
- [ ] Implementar guardado/restauración automática
- [ ] Integrar con la POC existente
- [ ] Tests unitarios

### **Fase 2: Sistema de Event Listeners**
- [ ] Crear `eventListenerManager.ts`
- [ ] Implementar registro de listeners
- [ ] Implementar re-adjuntar automático
- [ ] Integrar con ComponentPreserver
- [ ] Tests unitarios

### **Fase 3: Template Simplificado**
- [ ] Crear estructura de directorios
- [ ] Copiar CSS localmente
- [ ] Copiar JS localmente
- [ ] Crear template básico
- [ ] Documentación de uso

### **Fase 4: Verificación de Dependencias**
- [ ] Crear `dependencyChecker.ts`
- [ ] Implementar verificaciones
- [ ] Implementar espera de dependencias
- [ ] Integrar con la POC
- [ ] Tests unitarios

---

## 🎯 PRIORIDADES

1. **ALTA:** Fase 1 (Sistema Automático de Preservación) - Resuelve el problema principal
2. **ALTA:** Fase 2 (Event Listeners) - Necesario para funcionalidad
3. **MEDIA:** Fase 3 (Template Simplificado) - Útil para backend
4. **MEDIA:** Fase 4 (Verificación) - Mejora robustez

---

## 🔗 Referencias

- **Análisis Completo:** `docs/analisis/ANALISIS-POC-STORYBOOK-V2-RADIOBUTTON.md`
- **Resumen Ejecutivo:** `docs/analisis/RESUMEN-EJECUTIVO-POC-RADIOBUTTON.md`
- **POC Actual:** `packages/autorun-core/src/poc/storybook-v2/`

