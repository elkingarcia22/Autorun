# Flujo de Trabajo: Opción C - Sistema Híbrido FontAwesome

## 🎯 Objetivo
Sistema inteligente que permite a Cursor AI buscar y usar iconos FontAwesome automáticamente, tanto con búsqueda semántica como con referencias directas.

---

## 📋 Escenarios de Uso

### **Escenario 1: Búsqueda Semántica Automática**
**Usuario dice:** "Haz un botón de crear"

**Flujo:**
1. Cursor detecta necesidad de icono "crear/plus/add"
2. Busca en catálogo: `fa-plus`, `fa-circle-plus`, `fa-square-plus`
3. Selecciona `fa-plus` (más común)
4. Genera código con componente button + icono
5. Importa solo ese icono (tree-shaking)

**Resultado:**
```html
<button class="ubits-button ubits-button--primary ubits-button--md">
  <i class="far fa-plus"></i>
  <span>Crear</span>
</button>
```

---

### **Escenario 2: Referencia Directa de FontAwesome**
**Usuario dice:** "Usa el icono `fa-user-circle` de FontAwesome"

**Flujo:**
1. Cursor detecta referencia directa `fa-user-circle`
2. Valida en catálogo FontAwesome (usando token/API si necesario)
3. Importa específicamente ese icono
4. Lo integra en el componente

**Resultado:**
```html
<button class="ubits-button ubits-button--secondary ubits-button--md">
  <i class="far fa-user-circle"></i>
  <span>Perfil</span>
</button>
```

---

### **Escenario 3: Búsqueda por Función**
**Usuario dice:** "Botón de eliminar con icono de papelera"

**Flujo:**
1. Cursor detecta: "eliminar", "papelera", "trash", "delete"
2. Busca en catálogo con keywords: `fa-trash`, `fa-trash-alt`, `fa-trash-can`
3. Selecciona `fa-trash` (más común)
4. Genera código completo

**Resultado:**
```html
<button class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only">
  <i class="far fa-trash"></i>
</button>
```

---

## 🏗️ Arquitectura del Sistema

### **Estructura de Paquetes**
```
packages/
├── icons/
│   ├── package.json
│   ├── .npmrc                 # FontAwesome token aquí
│   ├── src/
│   │   ├── catalog/
│   │   │   ├── icons.json     # Catálogo completo generado
│   │   │   ├── search-index.js # Índice para búsqueda semántica
│   │   │   └── keywords.json  # Mapeo nombre → keywords
│   │   ├── components/
│   │   │   └── Icon.vue       # Wrapper component (opcional)
│   │   ├── utils/
│   │   │   ├── search.ts      # Búsqueda inteligente
│   │   │   └── import.ts      # Importación dinámica
│   │   └── index.ts
│   ├── scripts/
│   │   ├── generate-catalog.js   # Genera desde FontAwesome API
│   │   └── build-icons.js        # Build tree-shaking
│   └── dist/
│       ├── icons.css            # Solo iconos usados
│       └── catalog.json         # Para playground
└── playground-app/
    └── tokens/
        └── iconos.html           # Usa catalog.json
```

---

## 🔧 Implementación Técnica

### **1. Generación del Catálogo desde FontAwesome**

#### **Script: `generate-catalog.js`**
```javascript
// packages/icons/scripts/generate-catalog.js
const { library, config } = require('@fortawesome/fontawesome-svg-core');
const { far } = require('@fortawesome/pro-regular-svg-icons');
const { fas } = require('@fortawesome/pro-solid-svg-icons');
const fs = require('fs');

// Configurar token FontAwesome
config.autoAddCss = false;

const catalog = {
  regular: [],
  solid: []
};

// Generar catálogo desde iconos disponibles
function generateCatalog() {
  // Regular icons
  Object.keys(far).forEach(name => {
    const iconName = name.replace(/^fa/, '').toLowerCase();
    catalog.regular.push({
      name: iconName,
      className: `fa-${iconName}`,
      style: 'regular',
      import: `@fortawesome/pro-regular-svg-icons/${name}`,
      keywords: extractKeywords(iconName)
    });
  });

  // Solid icons
  Object.keys(fas).forEach(name => {
    const iconName = name.replace(/^fa/, '').toLowerCase();
    catalog.solid.push({
      name: iconName,
      className: `fa-${iconName}`,
      style: 'solid',
      import: `@fortawesome/pro-solid-svg-icons/${name}`,
      keywords: extractKeywords(iconName)
    });
  });

  // Guardar catálogo
  fs.writeFileSync(
    './src/catalog/icons.json',
    JSON.stringify(catalog, null, 2)
  );

  // Generar índice de búsqueda
  generateSearchIndex(catalog);
}

// Extraer keywords de nombre (ej: "user-circle" → ["user", "circle", "profile"])
function extractKeywords(name) {
  const parts = name.split('-');
  const keywords = [...parts];
  
  // Sinónimos comunes
  const synonyms = {
    'user': ['profile', 'account', 'person'],
    'trash': ['delete', 'remove', 'eliminate'],
    'plus': ['add', 'create', 'new'],
    'check': ['ok', 'done', 'success', 'confirm'],
    'times': ['close', 'cancel', 'x', 'remove'],
    'edit': ['modify', 'change', 'update'],
    'save': ['store', 'keep', 'preserve']
  };

  parts.forEach(part => {
    if (synonyms[part]) {
      keywords.push(...synonyms[part]);
    }
  });

  return [...new Set(keywords)];
}

// Generar índice invertido para búsqueda rápida
function generateSearchIndex(catalog) {
  const index = {};
  
  [...catalog.regular, ...catalog.solid].forEach(icon => {
    icon.keywords.forEach(keyword => {
      if (!index[keyword]) {
        index[keyword] = [];
      }
      index[keyword].push(icon);
    });
  });

  fs.writeFileSync(
    './src/catalog/search-index.js',
    `export const searchIndex = ${JSON.stringify(index, null, 2)};`
  );
}

generateCatalog();
```

---

### **2. Sistema de Búsqueda Inteligente**

#### **Utils: `search.ts`**
```typescript
// packages/icons/src/utils/search.ts
import { searchIndex } from '../catalog/search-index';
import iconsCatalog from '../catalog/icons.json';

export interface IconResult {
  name: string;
  className: string;
  style: 'regular' | 'solid';
  score: number;
}

/**
 * Busca icono por descripción semántica
 * Ej: "crear" → encuentra "fa-plus"
 */
export function searchIcon(query: string): IconResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  const results: Map<string, IconResult> = new Map();

  // Buscar en índice de keywords
  Object.keys(searchIndex).forEach(keyword => {
    if (keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword)) {
      searchIndex[keyword].forEach(icon => {
        const existing = results.get(icon.name);
        const score = existing ? existing.score + 1 : 1;
        
        results.set(icon.name, {
          name: icon.name,
          className: icon.className,
          style: icon.style,
          score
        });
      });
    }
  });

  // Buscar por nombre exacto
  [...iconsCatalog.regular, ...iconsCatalog.solid].forEach(icon => {
    if (icon.name.includes(normalizedQuery)) {
      const existing = results.get(icon.name);
      if (!existing || existing.score < 10) {
        results.set(icon.name, {
          name: icon.name,
          className: icon.className,
          style: icon.style,
          score: 10
        });
      }
    }
  });

  // Ordenar por relevancia
  return Array.from(results.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5 resultados
}

/**
 * Busca icono por referencia directa FontAwesome
 * Ej: "fa-plus" o "fa-user-circle"
 */
export function findIconByReference(ref: string): IconResult | null {
  const className = ref.startsWith('fa-') ? ref : `fa-${ref}`;
  
  for (const icon of [...iconsCatalog.regular, ...iconsCatalog.solid]) {
    if (icon.className === className) {
      return {
        name: icon.name,
        className: icon.className,
        style: icon.style,
        score: 100
      };
    }
  }
  
  return null;
}
```

---

### **3. Helper para Cursor AI**

#### **Utils: `cursor-helper.ts`**
```typescript
// packages/icons/src/utils/cursor-helper.ts
import { searchIcon, findIconByReference } from './search';

/**
 * API para Cursor AI - Busca y retorna código HTML del icono
 */
export function getIconForCursor(
  query: string,
  options: {
    style?: 'regular' | 'solid';
    size?: 'sm' | 'md' | 'lg';
    class?: string;
  } = {}
): string {
  // Intentar búsqueda directa primero
  let icon = findIconByReference(query);
  
  // Si no encontrado, búsqueda semántica
  if (!icon) {
    const results = searchIcon(query);
    icon = results[0];
  }

  if (!icon) {
    return `<!-- Icono no encontrado: ${query} -->`;
  }

  // Aplicar estilo preferido si se especificó
  const styleClass = options.style === 'solid' ? 'fas' : 'far';
  const sizeClass = options.size ? `fa-${options.size}` : '';
  const extraClass = options.class || '';

  return `<i class="${styleClass} ${icon.className} ${sizeClass} ${extraClass}"></i>`;
}

/**
 * Genera código completo de botón con icono
 */
export function generateButtonWithIcon(
  iconQuery: string,
  text: string,
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  const iconHTML = getIconForCursor(iconQuery, { style: 'regular' });
  
  return `<button class="ubits-button ubits-button--${variant} ubits-button--${size}">
  ${iconHTML}
  <span>${text}</span>
</button>`;
}
```

---

### **4. Configuración para Cursor (.cursorrules)**

#### **Archivo: `.cursorrules` (o en docs)**
```
## ICONOS FONTAWESOME - REGLAS PARA CURSOR

### CUANDO EL USUARIO PIDA UN ICONO:

1. **Búsqueda Semántica:**
   - Usuario dice "crear" → Buscar en `packages/icons/src/utils/search.ts`
   - Usa `searchIcon("crear")` → retorna `fa-plus`
   - Genera: `<i class="far fa-plus"></i>`

2. **Referencia Directa:**
   - Usuario dice "usa fa-check" → Usa `findIconByReference("fa-check")`
   - Genera: `<i class="far fa-check"></i>`

3. **En Componentes Button:**
   - Usuario dice "botón crear" → Usa `generateButtonWithIcon("crear", "Crear")`
   - Genera código completo de botón UBITS

### IMPORTAR ICONOS:
- SIEMPRE importar desde `packages/icons/dist/icons.css`
- El build incluye solo iconos usados (tree-shaking automático)

### ESTILOS:
- Preferir `far` (regular/outline) sobre `fas` (solid)
- Usar tamaños: `fa-sm`, `fa-md`, `fa-lg` según contexto

### EJEMPLOS DE BÚSQUEDA:
- "crear" → fa-plus
- "eliminar" → fa-trash
- "editar" → fa-edit
- "guardar" → fa-save
- "usuario" → fa-user
- "notificaciones" → fa-bell
```

---

## 🎬 Ejemplos Prácticos Completos

### **Ejemplo 1: Usuario pide botón crear**
```
Usuario: "Haz un botón de crear"
```

**Cursor procesa:**
```typescript
import { generateButtonWithIcon } from '@ubits/icons/cursor-helper';

// Búsqueda automática
const button = generateButtonWithIcon("crear", "Crear", "primary", "md");
```

**Código generado:**
```html
<button class="ubits-button ubits-button--primary ubits-button--md">
  <i class="far fa-plus"></i>
  <span>Crear</span>
</button>
```

---

### **Ejemplo 2: Usuario especifica icono exacto**
```
Usuario: "Botón con el icono fa-user-circle de FontAwesome"
```

**Cursor procesa:**
```typescript
import { findIconByReference } from '@ubits/icons/utils/search';

const icon = findIconByReference("fa-user-circle");
// Retorna: { name: "user-circle", className: "fa-user-circle", style: "regular" }
```

**Código generado:**
```html
<button class="ubits-button ubits-button--primary ubits-button--md">
  <i class="far fa-user-circle"></i>
  <span>Perfil</span>
</button>
```

---

### **Ejemplo 3: Usuario describe funcionalidad**
```
Usuario: "Botón para eliminar un elemento, solo icono"
```

**Cursor procesa:**
```typescript
const iconHTML = getIconForCursor("eliminar", { style: 'regular' });
```

**Código generado:**
```html
<button class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only">
  <i class="far fa-trash"></i>
</button>
```

---

## 🔐 Configuración FontAwesome Token

### **Archivo `.npmrc` en `packages/icons/`**
```ini
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${FONTAWESOME_TOKEN}
```

### **Variable de entorno**
```bash
# .env o en el sistema
export FONTAWESOME_TOKEN=tu_token_aqui
```

---

## 📦 Instalación y Setup

### **1. Crear paquete de iconos**
```bash
cd packages
mkdir icons
cd icons
npm init -y
```

### **2. Instalar FontAwesome Pro**
```bash
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/pro-regular-svg-icons
npm install --save @fortawesome/pro-solid-svg-icons
```

### **3. Generar catálogo inicial**
```bash
npm run generate-catalog
```

### **4. Build**
```bash
npm run build  # Genera icons.css solo con iconos usados
```

---

## 🎯 Ventajas del Sistema

✅ **Búsqueda Inteligente**: "crear" encuentra automáticamente `fa-plus`  
✅ **Tree-Shaking**: Solo incluye iconos usados en el bundle  
✅ **Compatibilidad**: Funciona igual que sistema actual (`<i class="far fa-*">`)  
✅ **TypeScript**: Autocompletado y type safety  
✅ **Actualización Fácil**: `npm update` actualiza todos los iconos  
✅ **Cursor-Friendly**: APIs específicas para que Cursor lo use automáticamente  

---

## 📝 Próximos Pasos

1. ✅ Crear estructura `packages/icons`
2. ✅ Configurar FontAwesome Pro con token
3. ✅ Implementar scripts de generación de catálogo
4. ✅ Crear sistema de búsqueda semántica
5. ✅ Integrar helpers para Cursor AI
6. ✅ Actualizar documentación de Cursor rules
7. ✅ Migrar página de iconos al nuevo sistema

---

**¿Seguimos con la implementación de este sistema?**

