# Arquitectura: Sistema de Iconos como Add-on Reemplazable

## 🎯 Principio de Diseño
**El sistema de iconos será un add-on intercambiable**. Puedes cambiar FontAwesome por Lucide, Material Icons, o cualquier otro proveedor sin romper componentes existentes.

---

## 🏗️ Arquitectura: Capa de Abstracción

### **1. Interfaz Base (IconProvider)**

Todos los proveedores de iconos implementan esta interfaz:

```typescript
// packages/icons/src/core/IconProvider.ts
export interface IconProvider {
  /**
   * Nombre del proveedor
   */
  name: string;

  /**
   * Versión del proveedor
   */
  version: string;

  /**
   * Renderiza un icono como HTML
   * @param iconName - Nombre del icono (ej: "plus", "user-circle")
   * @param options - Opciones de renderizado
   * @returns HTML string listo para usar
   */
  renderIcon(
    iconName: string,
    options?: IconRenderOptions
  ): string;

  /**
   * Busca iconos por descripción semántica
   * @param query - Descripción (ej: "crear", "eliminar")
   * @returns Array de resultados con score de relevancia
   */
  searchIcons(query: string): IconSearchResult[];

  /**
   * Valida si un icono existe
   * @param iconName - Nombre del icono
   * @returns true si existe
   */
  hasIcon(iconName: string): boolean;

  /**
   * Obtiene el catálogo completo de iconos
   * @returns Catálogo estructurado
   */
  getCatalog(): IconCatalog;

  /**
   * Inicializa el proveedor (carga recursos necesarios)
   */
  initialize(): Promise<void>;

  /**
   * Limpia recursos del proveedor
   */
  destroy(): void;
}

export interface IconRenderOptions {
  style?: 'regular' | 'solid' | 'light' | 'thin';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
  color?: string;
}

export interface IconSearchResult {
  name: string;
  score: number;
  keywords: string[];
}

export interface IconCatalog {
  provider: string;
  icons: Array<{
    name: string;
    keywords: string[];
    styles: string[];
  }>;
}
```

---

## 🔌 Implementación: FontAwesome Provider

```typescript
// packages/icons/src/providers/FontAwesomeProvider.ts
import { IconProvider, IconRenderOptions, IconSearchResult } from '../core/IconProvider';
import { searchIndex } from '../catalog/search-index';
import iconsCatalog from '../catalog/icons.json';

export class FontAwesomeProvider implements IconProvider {
  name = 'FontAwesome';
  version = '6.5.0';

  async initialize(): Promise<void> {
    // Cargar FontAwesome CSS si es necesario
    if (!document.querySelector('link[href*="fontawesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/packages/icons/dist/fontawesome.css';
      document.head.appendChild(link);
    }
  }

  renderIcon(iconName: string, options: IconRenderOptions = {}): string {
    const className = iconName.startsWith('fa-') 
      ? iconName 
      : `fa-${iconName}`;
    
    const styleClass = options.style === 'solid' ? 'fas' : 'far';
    const sizeClass = options.size ? `fa-${options.size}` : '';
    const extraClass = options.class || '';

    return `<i class="${styleClass} ${className} ${sizeClass} ${extraClass}"></i>`;
  }

  searchIcons(query: string): IconSearchResult[] {
    // Lógica de búsqueda de FontAwesome
    const normalizedQuery = query.toLowerCase().trim();
    const results: Map<string, IconSearchResult> = new Map();

    Object.keys(searchIndex).forEach(keyword => {
      if (keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword)) {
        searchIndex[keyword].forEach(icon => {
          const existing = results.get(icon.name);
          const score = existing ? existing.score + 1 : 1;
          
          results.set(icon.name, {
            name: icon.name,
            score,
            keywords: icon.keywords
          });
        });
      }
    });

    return Array.from(results.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  hasIcon(iconName: string): boolean {
    const className = iconName.startsWith('fa-') 
      ? iconName 
      : `fa-${iconName}`;
    
    return [...iconsCatalog.regular, ...iconsCatalog.solid]
      .some(icon => icon.className === className);
  }

  getCatalog(): IconCatalog {
    return {
      provider: 'FontAwesome',
      icons: [...iconsCatalog.regular, ...iconsCatalog.solid].map(icon => ({
        name: icon.name,
        keywords: icon.keywords,
        styles: icon.style === 'regular' ? ['regular'] : ['solid']
      }))
    };
  }

  destroy(): void {
    // Limpiar recursos si es necesario
  }
}
```

---

## 🔄 Implementación Alternativa: Lucide Provider

```typescript
// packages/icons/src/providers/LucideProvider.ts
import { IconProvider, IconRenderOptions, IconSearchResult } from '../core/IconProvider';
import * as lucideIcons from 'lucide';

export class LucideProvider implements IconProvider {
  name = 'Lucide';
  version = '0.344.0';

  private iconMap: Map<string, any> = new Map();

  async initialize(): Promise<void> {
    // Cargar iconos Lucide
    Object.keys(lucideIcons).forEach(key => {
      if (typeof lucideIcons[key] === 'function') {
        const name = key.toLowerCase().replace(/icon$/, '');
        this.iconMap.set(name, lucideIcons[key]);
      }
    });
  }

  renderIcon(iconName: string, options: IconRenderOptions = {}): string {
    const normalizedName = iconName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const IconComponent = this.iconMap.get(normalizedName);
    
    if (!IconComponent) {
      return `<!-- Icono no encontrado: ${iconName} -->`;
    }

    // Renderizar como SVG inline
    const size = options.size || 'md';
    const sizeMap = {
      xs: '12',
      sm: '16',
      md: '20',
      lg: '24',
      xl: '32'
    };

    return IconComponent({
      size: sizeMap[size],
      class: options.class || '',
      style: options.color ? `color: ${options.color}` : undefined
    });
  }

  searchIcons(query: string): IconSearchResult[] {
    const normalizedQuery = query.toLowerCase();
    const results: IconSearchResult[] = [];

    this.iconMap.forEach((component, name) => {
      if (name.includes(normalizedQuery)) {
        results.push({
          name,
          score: 10,
          keywords: [name]
        });
      }
    });

    return results.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  hasIcon(iconName: string): boolean {
    const normalizedName = iconName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return this.iconMap.has(normalizedName);
  }

  getCatalog(): IconCatalog {
    return {
      provider: 'Lucide',
      icons: Array.from(this.iconMap.keys()).map(name => ({
        name,
        keywords: [name],
        styles: ['default']
      }))
    };
  }

  destroy(): void {
    this.iconMap.clear();
  }
}
```

---

## 🔧 Factory Pattern: Gestión de Proveedores

```typescript
// packages/icons/src/core/IconService.ts
import { IconProvider } from './IconProvider';
import { FontAwesomeProvider } from '../providers/FontAwesomeProvider';
import { LucideProvider } from '../providers/LucideProvider';

type ProviderType = 'fontawesome' | 'lucide' | 'material';

export class IconService {
  private static instance: IconService;
  private currentProvider: IconProvider | null = null;
  private providers: Map<ProviderType, () => IconProvider> = new Map();

  private constructor() {
    // Registrar proveedores disponibles
    this.providers.set('fontawesome', () => new FontAwesomeProvider());
    this.providers.set('lucide', () => new LucideProvider());
  }

  static getInstance(): IconService {
    if (!IconService.instance) {
      IconService.instance = new IconService();
    }
    return IconService.instance;
  }

  /**
   * Inicializa el servicio con un proveedor específico
   */
  async initialize(providerType: ProviderType = 'fontawesome'): Promise<void> {
    const providerFactory = this.providers.get(providerType);
    
    if (!providerFactory) {
      throw new Error(`Provider ${providerType} not available`);
    }

    // Limpiar proveedor anterior
    if (this.currentProvider) {
      this.currentProvider.destroy();
    }

    // Crear nuevo proveedor
    this.currentProvider = providerFactory();
    await this.currentProvider.initialize();
  }

  /**
   * Cambia el proveedor en tiempo de ejecución
   */
  async switchProvider(providerType: ProviderType): Promise<void> {
    await this.initialize(providerType);
  }

  /**
   * Obtiene el proveedor actual
   */
  getProvider(): IconProvider {
    if (!this.currentProvider) {
      throw new Error('IconService not initialized. Call initialize() first.');
    }
    return this.currentProvider;
  }

  /**
   * Métodos de conveniencia que delegan al proveedor actual
   */
  renderIcon(iconName: string, options?: IconRenderOptions): string {
    return this.getProvider().renderIcon(iconName, options);
  }

  searchIcons(query: string): IconSearchResult[] {
    return this.getProvider().searchIcons(query);
  }

  hasIcon(iconName: string): boolean {
    return this.getProvider().hasIcon(iconName);
  }
}

// Exportar instancia singleton
export const iconService = IconService.getInstance();
```

---

## 📦 API Pública (Sin Cambios al Cambiar Proveedor)

```typescript
// packages/icons/src/index.ts
import { iconService } from './core/IconService';
import { IconProvider } from './core/IconProvider';

/**
 * API pública - NO cambia aunque cambies el proveedor
 */

/**
 * Renderiza un icono
 */
export function renderIcon(
  iconName: string,
  options?: IconRenderOptions
): string {
  return iconService.renderIcon(iconName, options);
}

/**
 * Busca iconos por descripción
 */
export function searchIcons(query: string): IconSearchResult[] {
  return iconService.searchIcons(query);
}

/**
 * Verifica si un icono existe
 */
export function hasIcon(iconName: string): boolean {
  return iconService.hasIcon(iconName);
}

/**
 * Inicializa el servicio (una sola vez al inicio de la app)
 */
export async function initializeIcons(
  provider: 'fontawesome' | 'lucide' = 'fontawesome'
): Promise<void> {
  await iconService.initialize(provider);
}

/**
 * Cambia el proveedor (útil para tests o migraciones)
 */
export async function switchIconProvider(
  provider: 'fontawesome' | 'lucide'
): Promise<void> {
  await iconService.switchProvider(provider);
}

// Re-exportar tipos
export type { IconProvider, IconRenderOptions, IconSearchResult };
```

---

## 💻 Uso en Componentes (Siempre Igual)

### **Ejemplo: Botón con Icono**

```html
<!-- El código HTML NO cambia al cambiar proveedor -->
<button class="ubits-button ubits-button--primary ubits-button--md">
  <!-- Este HTML se genera igual con FontAwesome o Lucide -->
  <i class="far fa-plus"></i>
  <span>Crear</span>
</button>
```

**JavaScript que lo genera:**
```typescript
import { renderIcon } from '@ubits/icons';

// Esto funciona igual con FontAwesome o Lucide
const iconHTML = renderIcon('plus', { style: 'regular', size: 'md' });
const button = `
  <button class="ubits-button ubits-button--primary ubits-button--md">
    ${iconHTML}
    <span>Crear</span>
  </button>
`;
```

---

## 🔄 Cómo Cambiar de Proveedor

### **Opción 1: En Configuración de App**

```typescript
// packages/playground-app/src/main.ts
import { initializeIcons } from '@ubits/icons';

// Al iniciar la app, eliges el proveedor
await initializeIcons('fontawesome'); // o 'lucide'
```

### **Opción 2: Variable de Entorno**

```typescript
// packages/playground-app/src/main.ts
import { initializeIcons } from '@ubits/icons';

const provider = (import.meta.env.VITE_ICON_PROVIDER || 'fontawesome') as 'fontawesome' | 'lucide';
await initializeIcons(provider);
```

```bash
# .env
VITE_ICON_PROVIDER=lucide
```

### **Opción 3: Dinámico en Runtime**

```typescript
// Permite cambiar proveedor sin recargar la página
import { switchIconProvider } from '@ubits/icons';

// Cambiar a Lucide
await switchIconProvider('lucide');

// Todos los componentes existentes siguen funcionando
// pero ahora usan Lucide
```

---

## 📋 Estructura Final del Paquete

```
packages/icons/
├── package.json
├── tsconfig.json
├── src/
│   ├── core/
│   │   ├── IconProvider.ts       # Interfaz base
│   │   └── IconService.ts        # Factory/Singleton
│   ├── providers/
│   │   ├── FontAwesomeProvider.ts # Implementación FA
│   │   ├── LucideProvider.ts     # Implementación Lucide
│   │   └── MaterialProvider.ts   # Implementación Material (futuro)
│   ├── catalog/
│   │   ├── fontawesome/          # Catálogo FA
│   │   └── lucide/                # Catálogo Lucide
│   ├── utils/
│   │   └── search.ts             # Búsqueda genérica
│   └── index.ts                   # API pública
├── dist/
│   ├── icons.css                  # CSS generado (tree-shaking)
│   └── catalog.json               # Catálogo activo
└── scripts/
    └── generate-catalog.js        # Genera catálogos
```

---

## ✅ Ventajas de Esta Arquitectura

### **1. Desacoplamiento Total**
- ✅ Componentes no conocen qué proveedor se usa
- ✅ Puedes cambiar FontAwesome → Lucide sin tocar componentes
- ✅ Nuevos proveedores se agregan fácilmente

### **2. Compatibilidad hacia Atrás**
- ✅ HTML generado puede mantener mismo formato
- ✅ O adaptarse al proveedor (SVG vs clases CSS)

### **3. Testing**
- ✅ Puedes testear con diferentes proveedores
- ✅ Mock providers para tests unitarios

### **4. Migración Gradual**
- ✅ Puedes migrar componente por componente
- ✅ O cambiar todo de una vez

---

## 🚀 Ejemplo Práctico de Migración

### **Paso 1: Tienes FontAwesome funcionando**
```typescript
await initializeIcons('fontawesome');
```

### **Paso 2: Quieres probar Lucide**
```typescript
await initializeIcons('lucide');
```

### **Paso 3: Todos tus componentes funcionan igual**
```typescript
// Este código NO cambia
renderIcon('plus'); // Funciona con ambos
renderIcon('trash'); // Funciona con ambos
```

### **Paso 4: Si te gusta Lucide, lo dejas**
```typescript
// En producción, cambias solo esta línea
await initializeIcons('lucide');
```

---

## 📝 Checklist: Crear Nuevo Proveedor

- [ ] Crear clase que implementa `IconProvider`
- [ ] Implementar `renderIcon()` - cómo renderiza HTML
- [ ] Implementar `searchIcons()` - búsqueda semántica
- [ ] Implementar `hasIcon()` - validación
- [ ] Implementar `getCatalog()` - catálogo completo
- [ ] Registrar en `IconService.providers`
- [ ] Agregar a tipos `ProviderType`
- [ ] Documentar uso específico del proveedor

---

**Conclusión:** Sí, el sistema de iconos será 100% reemplazable como add-on. Cambiar FontAwesome por Lucide (o cualquier otro) solo requiere cambiar la inicialización del proveedor.

