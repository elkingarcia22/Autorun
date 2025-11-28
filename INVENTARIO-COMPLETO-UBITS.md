# 📦 Inventario Completo: Estructura UBITS

## 🎯 Objetivo

Este documento es un **inventario exhaustivo** de toda la estructura de UBITS para identificar:
- ✅ Todos los componentes disponibles
- ✅ Tokens y tipografía
- ✅ Templates y configuración
- ✅ Documentación
- ✅ Assets (imágenes, fuentes)
- ✅ Scripts y herramientas
- ✅ Estructura completa del proyecto

---

## 📊 Resumen Ejecutivo

### **Estadísticas Generales**

- **Total Componentes:** 50+ componentes
- **Componentes con package.json:** 47 componentes
- **Archivos TypeScript/JavaScript:** 3,200+ archivos
- **Archivos CSS:** 62 archivos CSS de componentes
- **Templates:** 3 templates HTML (admin, colaborador, welcome-test)
- **Scripts de Templates:** 12 archivos JavaScript
- **Documentación:** 30+ archivos .md
- **Tokens:** 2 archivos CSS generados (tokens.css, figma-tokens.css)
- **Assets:** FontAwesome Pro completo + imágenes

### **Tamaño Aproximado**

- **components/:** ~130MB (participants-menu es el más grande con 126MB)
- **templates/:** ~5MB
- **tokens/:** ~500KB
- **typography/:** ~100KB
- **storybook/:** (no medido, pero incluye node_modules)

---

## 📁 Estructura Completa del Proyecto

```
UBITS/
├── packages/
│   ├── components/          # 50+ componentes UBITS
│   ├── tokens/              # Sistema de tokens
│   ├── typography/          # Tipografía UBITS
│   ├── templates/          # Templates HTML
│   └── storybook/          # Storybook (documentación)
├── docs/                    # 30+ documentos de análisis
├── scripts/                 # Scripts de utilidad
├── tokens/                  # Tokens fuente (JSON)
├── migrator-ubits/          # Herramienta de migración
├── node_modules/            # Dependencias
├── package.json
├── README.md
└── GUIA-COMPLETA.md
```

---

## 🧩 Componentes UBITS (50+ Componentes)

### **Lista Completa de Componentes**

| # | Componente | Archivos TS/JS | Tamaño | Estado | CSS | Build |
|---|------------|----------------|--------|--------|-----|-------|
| 1 | accordion | 5 | 100KB | ✅ | ✅ | ✅ dist/ |
| 2 | alert | 7 | 108KB | ✅ | ✅ | ✅ dist/ |
| 3 | avatar | 4 | 72KB | ✅ | ✅ | ❌ |
| 4 | badge | 5 | 256KB | ✅ | ✅ | ✅ dist/ |
| 5 | bar-metric-card | 3 | - | ⚠️ | ❌ | ❌ |
| 6 | breadcrumb | 4 | - | ✅ | ✅ | ❌ |
| 7 | button | 20 | 512KB | ✅ | ✅ | ✅ dist/ |
| 8 | button-ai | 4 | 72KB | ✅ | ❌ | ❌ |
| 9 | button-feedback | 4 | - | ✅ | ✅ | ❌ |
| 10 | calendar | 15 | 236KB | ✅ | ✅ | ✅ dist/ |
| 11 | card | 7 | 84KB | ✅ | ✅ | ❌ |
| 12 | carousel | 6 | - | ✅ | ✅ | ❌ |
| 13 | checkbox | 6 | - | ✅ | ✅ | ✅ dist/ |
| 14 | chip | 6 | - | ✅ | ✅ | ✅ dist/ |
| 15 | csat-metric-card | 3 | - | ⚠️ | ❌ | ❌ |
| 16 | **data-table** | 6 | 924KB | ✅ | ✅ | ✅ dist/ |
| 17 | data-view | 11 | 100KB | ✅ | ✅ | ✅ dist/ |
| 18 | drawer | 4 | - | ✅ | ✅ | ❌ |
| 19 | empty-state | 5 | - | ✅ | ✅ | ✅ dist/ |
| 20 | file-upload | 4 | - | ✅ | ✅ | ❌ |
| 21 | gallery | 6 | - | ✅ | ✅ | ❌ |
| 22 | header-section | 4 | - | ✅ | ✅ | ❌ |
| 23 | input | 20 | 364KB | ✅ | ✅ | ✅ dist/ |
| 24 | list | 10 | 104KB | ✅ | ✅ | ✅ dist/ |
| 25 | mask | 4 | - | ✅ | ✅ | ❌ |
| 26 | menu | 3 | - | ⚠️ | ❌ | ❌ |
| 27 | metric-card | 3 | - | ⚠️ | ❌ | ❌ |
| 28 | modal | 10 | 96KB | ✅ | ✅ | ✅ dist/ |
| 29 | nps-card | 3 | - | ⚠️ | ❌ | ❌ |
| 30 | pagination | 7 | 76KB | ✅ | ✅ | ✅ dist/ |
| 31 | participants-menu | 2970 | 126MB | ✅ | ✅ | ✅ dist/ |
| 32 | popover | 6 | - | ✅ | ✅ | ✅ dist/ |
| 33 | progress | 4 | - | ✅ | ✅ | ❌ |
| 34 | progress-general-card | 3 | - | ⚠️ | ❌ | ❌ |
| 35 | radio-button | 4 | - | ✅ | ✅ | ❌ |
| 36 | score-card-metrics | 3 | - | ⚠️ | ❌ | ❌ |
| 37 | scroll | 8 | 80KB | ✅ | ✅ | ❌ |
| 38 | search-button | 6 | - | ✅ | ✅ | ✅ dist/ |
| 39 | segment-control | 4 | - | ✅ | ✅ | ❌ |
| 40 | selection-card | 4 | - | ✅ | ✅ | ❌ |
| 41 | sidebar | 5 | 72KB | ✅ | ✅ | ❌ |
| 42 | skeleton | 6 | - | ✅ | ✅ | ❌ |
| 43 | slider | 50 | 704KB | ✅ | ✅ | ❌ |
| 44 | spinner | 9 | 80KB | ✅ | ✅ | ❌ |
| 45 | stats-card | 7 | - | ✅ | ✅ | ❌ |
| 46 | status-tag | 3 | - | ✅ | ✅ | ❌ |
| 47 | stepper | 4 | - | ✅ | ✅ | ❌ |
| 48 | subnav | 5 | - | ✅ | ✅ | ❌ |
| 49 | tabbar | 5 | 128KB | ✅ | ✅ | ❌ |
| 50 | **tabs** | 4 | - | ✅ | ✅ | ❌ |
| 51 | toast | 6 | - | ✅ | ✅ | ❌ |
| 52 | toggle | 4 | - | ✅ | ✅ | ❌ |
| 53 | tokens-ubits | 14 | 144KB | ✅ | ❌ | ❌ |
| 54 | tooltip | 4 | - | ✅ | ✅ | ❌ |

**Leyenda:**
- ✅ = Completo y funcional
- ⚠️ = Parcial o en desarrollo
- ❌ = No disponible o no compilado

### **Componentes con Build Compilado (dist/)**

Estos componentes tienen archivos compilados listos para usar:

1. accordion
2. alert
3. badge
4. button
5. calendar
6. checkbox
7. chip
8. **data-table** ⭐ (tiene UMD: `data-table.umd.js`)
9. data-view
10. empty-state
11. input
12. list
13. modal
14. pagination
15. participants-menu
16. popover
17. search-button

**Total:** 17 componentes con build compilado

### **Componentes en components-loader.js**

Actualmente solo 3 componentes están en `components-loader.js`:

1. ✅ **Sidebar** - `window.createSidebar()`
2. ✅ **SubNav** - `window.createSubNav()`
3. ✅ **TabBar** - `window.createTabBar()`

**Faltan:**
- ❌ **Tabs** - `window.createTabs()` (NO implementado)
- ❌ **DataTable** - `window.createDataTable()` (NO implementado)
- ❌ Todos los demás componentes

---

## 🎨 Tokens UBITS

### **Ubicación**

```
packages/tokens/
├── dist/
│   ├── tokens.css          # 31KB - Tokens base UBITS
│   ├── figma-tokens.css    # 477KB - Tokens de modifiers (Figma)
│   └── tokens.js           # 32KB - Tokens en JavaScript
├── figma-tokens.json       # Tokens fuente desde Figma
├── tokens.json             # Tokens procesados
├── token-mapping.ts        # Mapeo de tokens
├── style-dictionary.config.json  # Configuración Style Dictionary
├── build-css.cjs           # Script de build
└── scripts/
    ├── migrate-tokens.cjs
    ├── fix-dark-mode-tokens.cjs
    ├── add-all-fallbacks.cjs
    ├── verify-tokens-count.js
    └── generate-mapping-json.cjs
```

### **Tipos de Tokens**

1. **Tokens Base UBITS** (`tokens.css`)
   - `--ubits-bg-*` - Backgrounds
   - `--ubits-fg-*` - Foregrounds (texto)
   - `--ubits-accent-*` - Colores de acento
   - `--ubits-border-*` - Bordes
   - `--ubits-spacing-*` - Espaciado
   - `--ubits-border-radius-*` - Bordes redondeados

2. **Tokens Modifiers** (`figma-tokens.css`)
   - `--modifiers-normal-color-light-*` - Light mode
   - `--modifiers-normal-color-dark-*` - Dark mode
   - `--modifiers-static-color-*` - Mismo color en ambos temas
   - `--modifiers-inverted-color-*` - Versión invertida

3. **Tokens de Tipografía**
   - `--ubits-typography-*` - Tamaños, pesos, line-height
   - `--font-family-*` - Familias de fuentes

### **Comando de Build**

```bash
npm run build:tokens
```

Genera los archivos CSS desde los JSON fuente.

---

## 📝 Tipografía UBITS

### **Ubicación**

```
packages/typography/
├── fonts.css                # Fuentes Noto Sans
└── tokens-typography.css    # Tokens de tipografía
```

### **Fuentes Incluidas**

- **Noto Sans** - Fuente principal UBITS
- Cargada desde Google Fonts o local

### **Clases de Tipografía**

```css
.ubits-heading-h1
.ubits-heading-h2
.ubits-heading-h3
.ubits-body-lg
.ubits-body-md
.ubits-body-sm
.ubits-body-xs
```

---

## 📱 Templates UBITS

### **Templates Disponibles**

1. **template-admin.html** - Modo Administrador
2. **template-colaborador.html** - Modo Colaborador
3. **template-welcome-test.html** - Template de prueba

### **Estructura de Templates**

```
packages/templates/
├── template-admin.html          # Template principal admin
├── template-colaborador.html    # Template principal colaborador
├── template-welcome-test.html   # Template de prueba
├── components-loader.js         # ⭐ Cargador de componentes (2015 líneas)
├── config/
│   ├── products.js             # Configuración de productos/módulos
│   ├── theme-manager.js        # Gestión de temas (light/dark)
│   └── responsive-manager.js    # Gestión responsive
├── engine/
│   ├── template-loader.js      # Cargador de templates
│   └── content-manager.js      # Gestor de contenido dinámico
├── utils/
│   ├── path-resolver.js        # Resolvedor de rutas
│   └── storybook-loader.js     # Cargador desde Storybook
├── assets/
│   ├── fontawesome/            # FontAwesome Pro completo
│   │   ├── css/all.min.css
│   │   └── webfonts/           # 20+ archivos de fuentes
│   └── images/                 # Imágenes del sistema
│       ├── Profile-image.jpg
│       ├── Ubits-logo.svg
│       ├── Favicons/           # 20+ favicons de aliados
│       └── cards-learn/          # Imágenes de tarjetas
├── docs/
│   └── ANALISIS-SIDEBAR-SUBNAV.md
├── README.md
├── SETUP-TEMPLATES.md          # Guía completa de setup
└── verificar-setup.sh          # Script de verificación
```

### **Scripts en Templates (12 archivos)**

1. **components-loader.js** (2015 líneas)
   - `window.createSidebar()`
   - `window.createSubNav()`
   - `window.createTabBar()`
   - Funciones helper para iconos

2. **config/products.js**
   - Configuración de módulos
   - Configuración de productos
   - Configuración de sidebar y tabbar

3. **config/theme-manager.js**
   - Gestión de temas light/dark
   - Persistencia de preferencias

4. **config/responsive-manager.js**
   - Adaptación responsive
   - Sidebar ↔ TabBar según tamaño

5. **engine/template-loader.js**
   - Carga inicial de templates
   - Inicialización de componentes

6. **engine/content-manager.js**
   - Gestión de contenido dinámico
   - Cambio de secciones/módulos

7. **utils/path-resolver.js**
   - Resolución de rutas

8. **utils/storybook-loader.js**
   - Carga desde Storybook (no usado en templates generados)

9. **image-controller.js**
   - Control de imágenes

### **CSS Cargados en Templates**

Los templates cargan **52 archivos CSS**:

**Base:**
- `tokens/dist/tokens.css`
- `tokens/dist/figma-tokens.css`
- `typography/fonts.css`
- `typography/tokens-typography.css`
- `assets/fontawesome/css/all.min.css`

**Navegación (3):**
- `components/sidebar/src/styles/sidebar.css`
- `components/subnav/src/styles/subnav.css`
- `components/tabbar/src/styles/tabbar.css`

**Componentes (47):**
- Todos los CSS de componentes listados arriba

---

## 📚 Documentación

### **Documentos en `/docs` (30+ archivos)**

1. ANALISIS-ALERT-COMPLETO.md
2. ANALISIS-AUTOFRAME-HUB.md
3. ANALISIS-BUTTON-COMPLETO.md
4. ANALISIS-CAMBIO-PLAYGROUND-PROYECTO.md
5. ANALISIS-CARD-CONTENT-COMPLETO.md
6. ANALISIS-COMPLETO-TOKENS.md
7. ANALISIS-FALTANTE-STORYBOOK-VS-JSON.md
8. ANALISIS-FLOATING-MENU-COMPLETO.md
9. ANALISIS-ICONOS.md
10. ANALISIS-INPUT-COMPLETO.md
11. ANALISIS-LIST-COMPLETO.md
12. ANALISIS-SHADCN-UI.md
13. ANALISIS-SIDEBAR-COMPLETO.md
14. ANALISIS-SUBNAV-COMPLETO.md
15. ANALISIS-TABBAR-COMPLETO.md
16. ANALISIS-TEMPLATE-INDEX.md
17. ANALISIS-TOAST-COMPLETO.md
18. ANALISIS-TOKENS-ANTIGUOS-EN-FALLBACKS.md
19. ANALISIS-TOKENS-FIGMA-UBITS.md
20. ANALISIS-TOKENS-SIN-EQUIVALENCIA.md
21. ARQUITECTURA-COMPONENTES-ADDONS.md
22. ARQUITECTURA-ICONOS-ADDON.md
23. ARQUITECTURA-TEMPLATE.md
24. DIAGRAMA-AUTOFRAME-HUB.md
25. EJEMPLO-IMPLEMENTACION-HUB.md
26. FLUJO-TRABAJO-ICONOS.md
27. GUIA-CAMBIAR-COMPONENTES-DESDE-STORYBOOK.md
28. GUIA-CAMBIAR-TOKENS-DESDE-STORYBOOK.md
29. LECCION-CRITICA-TOKENS-DOM.md
30. PLAN-DOCUMENTACION-HUB.md
31. PLAN-IMPLEMENTACION-AUTOFRAME-HUB.md
32. PLAN-IMPLEMENTACION-TEMPLATE.md
33. PLAN-MAESTRO-TOKENS-STORYBOOK.md
34. PROBLEMA-DARK-MODE-TOKENS.md
35. PROPUESTA-ESTRUCTURA-STORYBOOK-TOKENS.md
36. RIESGOS-TOKENS-ADDONS.md
37. VERIFICACION-FINAL-TOKENS.md
38. VERIFICACION-STORYBOOK-VS-JSON.md

### **Documentos en Raíz**

1. README.md - Documentación principal
2. GUIA-COMPLETA.md - Guía completa del sistema
3. INSTRUCCIONES.md - Instrucciones de uso
4. PROMPT-INICIAL.md - Prompt para iniciar proyectos
5. SETUP-COMPLETO.md - Setup completo
6. ESTADO-PLAN-SEPARACION-UBITS.md

### **READMEs en Componentes**

Algunos componentes tienen README.md:
- accordion/README.md
- alert/README.md
- button/README.md
- button-feedback/README.md
- input/README.md
- list/README.md
- mask/README.md
- slider/README.md
- stats-card/README.md
- subnav/README.md
- tabbar/README.md
- tokens-ubits/README.md

---

## 🎨 Assets

### **FontAwesome Pro**

**Ubicación:** `packages/templates/assets/fontawesome/`

**Contenido:**
- `css/all.min.css` - CSS principal
- `webfonts/` - 20+ archivos de fuentes:
  - fa-regular-400.woff2
  - fa-solid-900.woff2
  - fa-light-300.woff2
  - fa-thin-100.woff2
  - fa-sharp-*.woff2 (variantes sharp)
  - fa-duotone-*.woff2 (variantes duotone)
  - fa-brands-400.woff2

### **Imágenes**

**Ubicación:** `packages/templates/assets/images/`

**Contenido:**
- `Profile-image.jpg` - Imagen de perfil por defecto
- `Ubits-logo.svg` - Logo UBITS
- `autoframe-logo-*.png/svg` - Logos Autoframe
- `Favicons/` - 20+ favicons de aliados:
  - Advanced-English.jpg
  - AWS.jpg
  - Microsoft.jpg
  - Harvard-Business-Publishing.jpg
  - etc.
- `cards-learn/` - Imágenes de tarjetas de aprendizaje

---

## 🛠️ Scripts y Herramientas

### **Scripts en Raíz**

```
scripts/
├── validate-ubits.cjs       # Validación de código UBITS
├── validate-ubits.js        # Validación (alternativa)
├── deploy.cjs               # Deploy del proyecto
├── init-project.cjs         # Inicialización de proyectos
├── integrate-addons.cjs     # Integración de add-ons
└── cleanup-token-fallbacks.sh  # Limpieza de fallbacks
```

### **Scripts en Tokens**

```
packages/tokens/scripts/
├── migrate-tokens.cjs       # Migración de tokens
├── fix-dark-mode-tokens.cjs # Corrección de tokens dark
├── add-all-fallbacks.cjs    # Agregar fallbacks
├── verify-tokens-count.js   # Verificar conteo de tokens
├── verify-tokens-count.cjs  # Verificar conteo (alternativa)
└── generate-mapping-json.cjs # Generar mapeo JSON
```

### **Scripts NPM Disponibles**

```json
{
  "dev": "vite",
  "build": "vite build",
  "build:tokens": "node packages/tokens/build-css.cjs",
  "validate": "node scripts/validate-ubits.cjs --staged",
  "validate:fix": "node scripts/validate-ubits.cjs --staged --fix",
  "validate:all": "node scripts/validate-ubits.cjs",
  "validate:all:fix": "node scripts/validate-ubits.cjs --fix",
  "init": "node scripts/init-project.cjs",
  "integrate:addons": "node scripts/integrate-addons.cjs",
  "deploy": "node scripts/deploy.cjs",
  "storybook": "cd packages/storybook && npm run storybook",
  "build:storybook": "cd packages/storybook && npm run build-storybook",
  "templates:verify": "cd packages/templates && ./verificar-setup.sh",
  "templates:serve": "cd packages/templates && python3 -m http.server 8000"
}
```

---

## 📦 Dependencias Principales

### **Dependencias de Producción**

```json
{
  "@fortawesome/fontawesome-pro": "^7.1.0",
  "@fortawesome/fontawesome-svg-core": "^7.1.0",
  "@fortawesome/pro-light-svg-icons": "^7.1.0",
  "@fortawesome/pro-regular-svg-icons": "^7.1.0",
  "@fortawesome/pro-solid-svg-icons": "^7.1.0",
  "@fortawesome/pro-thin-svg-icons": "^7.1.0"
}
```

### **Dependencias de Desarrollo**

```json
{
  "@biomejs/biome": "^2.3.2",
  "glob": "^13.0.0",
  "husky": "^9.1.7",
  "style-dictionary": "^4.4.0",
  "typescript": "^5.9.3",
  "vite": "^7.1.12"
}
```

---

## 🔍 APIs y Funciones Globales

### **APIs en components-loader.js**

```javascript
// Navegación
window.createSidebar(options)
window.createSubNav(options)
window.createTabBar(options)

// Helpers
window.defaultFloatingMenuSections
window.defaultProfileMenuItems
```

### **APIs en DataTable (UMD)**

```javascript
// Desde data-table.umd.js
window.UBITSDataTable.renderDataTable(options)
window.UBITSDataTable.createDataTable(options)
window.renderDataTable(options)
window.createDataTable(options)
```

### **APIs en Tabs (NO implementado aún)**

```typescript
// Desde TabsProvider.ts (NO expuesto en window aún)
renderTabs(options: TabsOptions): string
createTabs(options: TabsOptions, containerId?: string): HTMLElement
```

---

## 📋 Checklist de Componentes para Autorun

### **Componentes Críticos (Ya en components-loader.js)**

- [x] Sidebar
- [x] SubNav
- [x] TabBar

### **Componentes Faltantes en components-loader.js**

- [ ] **Tabs** ⭐ (necesario para encuestas)
- [ ] **DataTable** ⭐ (necesario para encuestas)
- [ ] Button
- [ ] Input
- [ ] Alert
- [ ] Modal
- [ ] Card
- [ ] List
- [ ] Pagination
- [ ] Checkbox
- [ ] Radio Button
- [ ] Toggle
- [ ] Status Tag
- [ ] Progress
- [ ] Avatar
- [ ] Badge
- [ ] Toast
- [ ] Drawer
- [ ] Popover
- [ ] Tooltip
- [ ] Calendar
- [ ] Breadcrumb
- [ ] Stepper
- [ ] Segment Control
- [ ] Selection Card
- [ ] Empty State
- [ ] Skeleton
- [ ] Spinner
- [ ] Accordion
- [ ] Carousel
- [ ] Gallery
- [ ] File Upload
- [ ] Search Button
- [ ] Scroll
- [ ] Mask
- [ ] Header Section
- [ ] Y 15+ componentes más...

---

## 🎯 Recomendaciones para Autorun

### **Opción 1: Copiar Todo UBITS** ⭐ RECOMENDADA

**Estructura:**
```
Autorun/
└── vendor/
    └── ubits/
        └── packages/
            ├── components/     # 50+ componentes
            ├── tokens/         # Sistema de tokens
            ├── typography/     # Tipografía
            └── templates/      # Templates y scripts
```

**Ventajas:**
- ✅ Todo disponible localmente
- ✅ Funciona en cualquier computador
- ✅ No depende de rutas externas
- ✅ Versionado junto con el proyecto

**Desventajas:**
- ⚠️ Tamaño grande (~130MB+)
- ⚠️ Sincronización manual cuando UBITS se actualiza

### **Opción 2: Copiar Solo lo Necesario**

**Estructura:**
```
Autorun/
└── vendor/
    └── ubits/
        └── packages/
            ├── components/
            │   ├── sidebar/
            │   ├── subnav/
            │   ├── tabbar/
            │   ├── tabs/          # ⭐ Necesario
            │   ├── data-table/    # ⭐ Necesario
            │   └── [otros usados]
            ├── tokens/
            ├── typography/
            └── templates/
                ├── components-loader.js
                └── config/
```

**Ventajas:**
- ✅ Tamaño reducido
- ✅ Solo lo necesario

**Desventajas:**
- ⚠️ Requiere identificar qué componentes se usan
- ⚠️ Puede faltar algo en el futuro

---

## 📝 Próximos Pasos

1. ✅ Análisis completo (este documento)
2. ⏳ Decidir estrategia (copiar todo vs. copiar necesario)
3. ⏳ Implementar copia de UBITS a Autorun
4. ⏳ Actualizar CanvasCreator para usar rutas relativas
5. ⏳ Agregar Tabs y DataTable a components-loader.js
6. ⏳ Probar en otro computador
7. ⏳ Documentar proceso

---

## 🔗 Referencias

- **README Principal:** `/Users/elkinmac/Desktop/UBITS/README.md`
- **Guía Completa:** `/Users/elkinmac/Desktop/UBITS/GUIA-COMPLETA.md`
- **Setup Templates:** `/Users/elkinmac/Desktop/UBITS/packages/templates/SETUP-TEMPLATES.md`
- **Análisis UBITS Completo:** `/Users/elkinmac/Desktop/Autorun/ANALISIS-UBITS-COMPLETO.md`
- **Análisis Portabilidad:** `/Users/elkinmac/Desktop/Autorun/ANALISIS-PORTABILIDAD-UBITS.md`

---

**Última actualización:** Diciembre 2024  
**Versión del inventario:** 1.0.0

