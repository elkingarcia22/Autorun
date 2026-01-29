# Arquitectura: Componentes UBITS como Add-ons

## 🎯 Principio de Diseño

**Todos los componentes UBITS serán add-ons intercambiables**. Puedes agregar, quitar o reemplazar componentes sin afectar el resto del sistema.

---

## 🏗️ Estructura de un Add-on de Componente

### **Ejemplo: Add-on Button**

```
packages/addons/button/
├── package.json              # Dependencias del add-on
├── tsconfig.json              # Config TypeScript
├── vite.config.ts            # Build config
├── src/
│   ├── index.ts              # Export público del add-on
│   ├── ButtonAddon.ts        # Clase principal del add-on
│   ├── ButtonProvider.ts     # Implementación del componente
│   ├── ButtonComponent.ts    # Web Component o Vue SFC
│   ├── styles/
│   │   └── button.css        # Estilos (usa tokens)
│   └── types/
│       └── ButtonOptions.ts  # TypeScript types
├── dist/                      # Build output
│   ├── button.js              # Bundle principal
│   ├── button.css             # CSS (tree-shaken)
│   └── manifest.json          # Metadatos del add-on
├── stories/                   # Storybook stories
│   └── Button.stories.ts
└── tests/
    └── Button.test.ts
```

---

## 🔌 Interfaz Base (ComponentAddon)

Todos los add-ons de componentes implementan esta interfaz:

```typescript
// packages/core/src/addons/ComponentAddon.ts
export interface ComponentAddon {
  /**
   * Nombre del add-on
   */
  name: string;

  /**
   * Versión del add-on
   */
  version: string;

  /**
   * Inicializa el add-on (registra componentes, carga recursos)
   */
  initialize(context: AppContext): Promise<void>;

  /**
   * Limpia recursos del add-on
   */
  destroy(): void;

  /**
   * Obtiene los componentes que este add-on proporciona
   */
  getComponents(): ComponentDefinition[];

  /**
   * Obtiene los estilos que este add-on requiere
   */
  getStyles(): string[];
}
```

---

## 📦 Ejemplo: Add-on Button

### **1. Manifest del Add-on**

```json
// packages/addons/button/dist/manifest.json
{
  "name": "@ubits/button",
  "version": "1.0.0",
  "type": "component",
  "components": [
    {
      "name": "ubits-button",
      "tag": "ubits-button",
      "path": "./button.js"
    }
  ],
  "styles": ["./button.css"],
  "dependencies": {
    "@ubits/tokens": "^1.0.0",
    "@ubits/icons": "^1.0.0"
  },
  "api": {
    "render": "renderButton",
    "create": "createButton"
  }
}
```

### **2. Implementación TypeScript**

```typescript
// packages/addons/button/src/ButtonAddon.ts
import { ComponentAddon } from '@ubits/core';
import { AppContext } from '@ubits/core';
import { renderButton } from './ButtonProvider';
import './styles/button.css';

export class ButtonAddon implements ComponentAddon {
  name = '@ubits/button';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component
    if (!customElements.get('ubits-button')) {
      customElements.define('ubits-button', ButtonComponent);
    }

    // Exponer API global
    window.UBITS = window.UBITS || {};
    window.UBITS.Button = {
      render: renderButton,
      create: createButton
    };

    // Registrar en el event bus para comunicación
    context.eventBus.on('button:click', this.handleClick.bind(this));
  }

  destroy(): void {
    // Limpiar listeners
    // (si es necesario)
  }

  getComponents(): ComponentDefinition[] {
    return [{
      name: 'ubits-button',
      tag: 'ubits-button',
      documentation: 'https://ubits.design/components/button'
    }];
  }

  getStyles(): string[] {
    return ['./button.css'];
  }

  private handleClick(event: CustomEvent): void {
    // Lógica interna
  }
}
```

### **3. Web Component**

```typescript
// packages/addons/button/src/ButtonComponent.ts
import { renderButton } from './ButtonProvider';

export class ButtonComponent extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'icon'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const disabled = this.hasAttribute('disabled');
    const icon = this.getAttribute('icon');

    this.innerHTML = renderButton({
      variant,
      size,
      disabled,
      icon,
      content: this.textContent || ''
    });
  }
}
```

### **4. Estilos (usando tokens)**

```css
/* packages/addons/button/src/styles/button.css */
ubits-button {
  --button-padding-sm: var(--ubits-spacing-2);
  --button-padding-md: var(--ubits-spacing-3);
  --button-padding-lg: var(--ubits-spacing-4);
  
  display: inline-flex;
  align-items: center;
  gap: var(--ubits-spacing-2);
  padding: var(--button-padding-md);
  border-radius: var(--ubits-radius-md);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  /* ... usa tokens UBITS */
}

ubits-button[data-variant="primary"] {
  background: var(--ubits-button-primary-bg-default);
  color: var(--ubits-btn-primary-fg);
}
```

---

## 🚀 Sistema de Carga de Add-ons

### **Loader por Manifest**

```typescript
// packages/core/src/addons/AddonLoader.ts
export class AddonLoader {
  private loadedAddons = new Map<string, ComponentAddon>();

  async loadAddon(manifestPath: string): Promise<ComponentAddon> {
    // 1. Cargar manifest
    const manifest = await fetch(manifestPath).then(r => r.json());
    
    // 2. Cargar estilos dinámicamente
    manifest.styles.forEach(style => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = style;
      document.head.appendChild(link);
    });

    // 3. Dynamic import del código
    const addonModule = await import(manifest.components[0].path);
    
    // 4. Instanciar add-on
    const addon = new addonModule.default();
    await addon.initialize(this.context);

    this.loadedAddons.set(manifest.name, addon);
    return addon;
  }
}
```

---

## ✅ Ventajas de Esta Arquitectura

### **1. Desacoplamiento Total**
- ✅ Cada componente es independiente
- ✅ Puedes quitar un add-on sin afectar otros
- ✅ Actualizaciones aisladas por componente

### **2. Carga Bajo Demanda**
- ✅ Solo cargas los componentes que usas
- ✅ Mejor performance inicial
- ✅ Tree-shaking automático

### **3. Intercambiabilidad**
- ✅ Puedes tener múltiples versiones de un componente
- ✅ Fácil A/B testing
- ✅ Migración gradual

### **4. Testing Aislado**
- ✅ Tests por add-on
- ✅ Mock de dependencias fácil
- ✅ CI/CD independiente

---

## 📋 Checklist: Crear Nuevo Add-on de Componente

- [ ] Crear estructura de carpetas en `packages/addons/[nombre]`
- [ ] Implementar `ComponentAddon` interface
- [ ] Crear Web Component (o Vue SFC)
- [ ] Usar tokens UBITS en estilos
- [ ] Crear manifest.json
- [ ] Configurar build (Vite)
- [ ] Agregar Storybook stories
- [ ] Escribir tests (Playwright/Unit)
- [ ] Documentar API pública
- [ ] Exportar en `packages/addons/index.ts`

---

## 🔄 Ejemplo de Uso

```typescript
// En tu aplicación
import { AddonLoader } from '@ubits/core';

const loader = new AddonLoader();

// Cargar solo los componentes que necesitas
await loader.loadAddon('/addons/button/manifest.json');
await loader.loadAddon('/addons/alert/manifest.json');

// Ahora puedes usar los componentes
document.body.innerHTML = `
  <ubits-button variant="primary" size="md">
    Click me
  </ubits-button>
`;
```

---

## 🎨 Integración con Tokens

Todos los componentes usan tokens UBITS:

```typescript
// En build time, Style Dictionary genera:
// packages/tokens/dist/tokens.css

// Los componentes los consumen así:
button {
  background: var(--ubits-button-primary-bg-default);
  color: var(--ubits-btn-primary-fg);
  padding: var(--ubits-spacing-3);
  border-radius: var(--ubits-radius-md);
}
```

---

## 📦 Tecnologías Utilizadas

- **TypeScript**: Type safety y autocompletado
- **Vite**: Build rápido y HMR
- **Web Components**: Estándar del navegador, sin frameworks
- **Style Dictionary**: Generación de tokens
- **Storybook**: Documentación y testing visual
- **Playwright**: Tests E2E
- **Biome**: Lint, format, typecheck unificado

