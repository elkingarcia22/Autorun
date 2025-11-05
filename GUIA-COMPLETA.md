# 📚 Guía Completa del Template UBITS

## 🎯 Descripción General

Este template es un sistema completo para crear aplicaciones UBITS con:
- ✅ **Diseño System completo** con tokens, componentes y tipografía
- ✅ **Dos modos de operación**: Colaborador y Administrador
- ✅ **Validación automática** de código UBITS
- ✅ **Auto-commit** y gestión de cambios
- ✅ **Integración de add-ons** (Clarity, Onboarding, Feedback)
- ✅ **Despliegue automatizado** en Vercel o Render

---

## 🚀 Inicio Rápido

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/elkingarcia22/prototipo-template.git
cd prototipo-template
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Inicializar el Proyecto

```bash
npm run init
```

Este comando interactivo te guiará:

1. **Solicitará la URL del repositorio GitHub** donde quieres trabajar
2. **Te permitirá elegir el perfil**:
   - **Colaborador**: Para usuarios normales con acceso a módulos básicos
   - **Administrador**: Para administradores con acceso a gestión de usuarios, evaluaciones 360°, etc.
3. **Configurará automáticamente**:
   - El template con el sidebar correspondiente
   - Git y el remoto del repositorio
   - Las dependencias necesarias
   - Los hooks de pre-commit para validación

### Paso 4: Iniciar Desarrollo

```bash
# Terminal 1: Activar auto-commit y validación
npm run watch

# Terminal 2: Iniciar servidor de desarrollo
npm run dev
```

Abre `packages/playground-app/template-colaborador.html` o `template-admin.html` según el perfil seleccionado.

---

## 🎨 Modos de Operación

### 👤 Modo Colaborador

**Template**: `template-colaborador.html`

**Características**:
- Sidebar con módulos básicos de aprendizaje
- Acceso a cursos, rutas de aprendizaje
- Perfil personal
- Vista de desempeño individual

**Módulos disponibles**:
- 📚 Aprendizaje
- 📊 Desempeño
- 🔍 Diagnóstico (sin SubNav)

### 👨‍💼 Modo Administrador

**Template**: `template-admin.html`

**Características**:
- Sidebar con módulos de administración
- Gestión de usuarios
- Evaluaciones 360°
- Análisis organizacional

**Módulos disponibles**:
- 🏠 Inicio (sin SubNav)
- 🏢 Empresa → Gestión de usuarios
- 📚 Aprendizaje → LMS
- 📊 Desempeño → Evaluaciones 360°
- 🔍 Diagnóstico (sin SubNav)
- 🔌 API
- ❓ Centro de ayuda

---

## 📁 Estructura del Proyecto

```
prototipo-template/
├── packages/
│   ├── addons/              # Componentes como add-ons
│   │   ├── sidebar/         # Sidebar con modos colaborador/admin
│   │   ├── tabbar/          # TabBar responsive para móviles
│   │   ├── subnav/          # SubNav dinámico por módulo
│   │   ├── card/            # Card Content para contenido
│   │   ├── button/          # Botones UBITS
│   │   ├── input/           # Inputs UBITS
│   │   ├── alert/           # Alertas UBITS
│   │   ├── toast/           # Notificaciones toast
│   │   └── badge/           # Badges UBITS
│   ├── playground-app/      # Aplicación principal
│   │   ├── template-colaborador.html    # Template colaborador
│   │   ├── template-admin.html          # Template administrador
│   │   ├── components-loader.js        # Cargador de componentes
│   │   ├── config/
│   │   │   ├── products.js             # Configuración de productos
│   │   │   ├── responsive-manager.js   # Gestión responsive
│   │   │   └── theme-manager.js       # Gestión de temas
│   │   ├── engine/
│   │   │   ├── content-manager.js     # Gestor de contenido
│   │   │   └── template-loader.js     # Cargador de templates
│   │   └── tokens/
│   │       └── index.html              # Playground de tokens
│   ├── tokens/              # Tokens de diseño UBITS
│   │   ├── tokens.json      # Tokens base
│   │   └── dist/
│   │       ├── tokens.css   # CSS generado
│   │       └── tokens.js    # JS generado
│   ├── typography/           # Tipografía UBITS
│   │   ├── fonts.css        # Fuentes
│   │   └── tokens-typography.css  # Tokens de tipografía
│   └── docs-site/            # Storybook con documentación
│       └── stories/          # Stories de componentes
├── scripts/
│   ├── init-project.cjs     # Inicialización interactiva
│   ├── integrate-addons.cjs # Integración de add-ons
│   ├── deploy.cjs           # Despliegue
│   └── validate-ubits.cjs   # Validación UBITS
├── .ubits/
│   ├── component-inventory.json  # Inventario de componentes
│   ├── validation-rules.md        # Reglas de validación
│   └── AUTO-VALIDATION.md        # Documentación auto-validación
└── .husky/
    └── pre-commit      # Hook de validación automática
```

---

## 🎨 Sistema de Diseño UBITS

### Tokens de Color

Todos los colores usan tokens CSS variables:

```css
/* Backgrounds */
--ubits-bg-1          /* Fondo principal */
--ubits-bg-2          /* Fondo secundario */
--ubits-bg-active     /* Fondo activo */

/* Foregrounds */
--ubits-fg-1-high     /* Texto principal */
--ubits-fg-1-medium   /* Texto secundario */
--ubits-fg-1-low      /* Texto terciario */

/* Accents */
--ubits-accent-brand  /* Color de marca */
--ubits-accent-blue   /* Azul */
--ubits-accent-green  /* Verde */
--ubits-accent-red    /* Rojo */

/* Borders */
--ubits-border-1      /* Borde principal */
--ubits-border-2      /* Borde secundario */
```

### Tokens de Tipografía

```css
/* Headings */
.ubits-heading-h1     /* Título principal */
.ubits-heading-h2     /* Título secundario */
.ubits-heading-h3     /* Título terciario */

/* Body */
.ubits-body-lg        /* Texto grande */
.ubits-body-md        /* Texto mediano */
.ubits-body-sm        /* Texto pequeño */

/* Weights */
--weight-bold: 700
--weight-semibold: 600
--weight-medium: 500
--weight-regular: 400
```

### Componentes Disponibles

- **Sidebar**: Navegación lateral con modos colaborador/admin
- **TabBar**: Navegación inferior para móviles
- **SubNav**: Navegación por pestañas dentro de módulos
- **Card Content**: Tarjetas de contenido
- **Button**: Botones con variantes
- **Input**: Campos de entrada
- **Alert**: Alertas informativas
- **Toast**: Notificaciones temporales
- **Badge**: Etiquetas

---

## 🔧 Scripts Disponibles

### Inicialización
```bash
npm run init              # Inicializar proyecto nuevo
```

### Validación
```bash
npm run validate          # Validar código (solo staging)
npm run validate:fix      # Validar y corregir automáticamente
npm run validate:all      # Validar todos los archivos
npm run validate:all:fix  # Validar y corregir todos
```

### Desarrollo
```bash
npm run watch             # Auto-commit y validación
npm run dev               # Servidor de desarrollo
```

### Integración
```bash
npm run integrate:addons  # Integrar add-ons
```

### Despliegue
```bash
npm run deploy            # Guía de despliegue
```

### Build
```bash
npm run build:tokens      # Generar tokens CSS/JS
```

---

## 🛡️ Sistema de Validación Automática

### Qué Valida

1. **Colores hardcodeados** → Sugiere tokens UBITS
2. **Clases de tipografía incorrectas** → Sugiere clases oficiales
3. **Componentes custom** → Sugiere componentes oficiales
4. **CSS faltante** → Sugiere imports necesarios

### Qué Corrige Automáticamente

- `white` → `var(--ubits-bg-1)`
- `black` → `var(--ubits-fg-1-high)`
- `ubits-h1` → `ubits-heading-h1`
- `ubits-body-lg-bold` → `ubits-heading-h1`
- Y más...

### Ejecución Automática

La validación se ejecuta automáticamente:
- ✅ En cada commit (pre-commit hook)
- ✅ Cuando ejecutas `npm run watch`
- ✅ Manualmente con `npm run validate`

---

## 📱 Responsive Design

### Breakpoints

- **Desktop**: `≥ 1024px` → Sidebar visible, TabBar oculto
- **Tablet/Mobile**: `< 1024px` → Sidebar oculto, TabBar visible

### Componentes Adaptativos

- **Sidebar**: Se oculta en móvil, se muestra en desktop
- **TabBar**: Se muestra en móvil, se oculta en desktop
- **Content**: Se adapta al espacio disponible

---

## 🎭 Gestión de Temas

El template soporta modo claro y oscuro:

```javascript
// Cambiar tema
window.UBITS_ThemeManager.setTheme('dark');
window.UBITS_ThemeManager.setTheme('light');
```

Los tokens se actualizan automáticamente según el tema.

---

## 📦 Add-ons Disponibles

### Microsoft Clarity
Analytics y grabaciones de sesión para análisis de usuario.

### Onboarding
Sistema de guía interactiva para nuevos usuarios.

### Feedback Automation
Sistema automatizado de recolección y gestión de feedback.

**Integración:**
```bash
npm run integrate:addons
```

---

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
npm run deploy
# Selecciona opción 1
vercel --prod
```

### Render

```bash
npm run deploy
# Selecciona opción 2
# Sigue instrucciones en render.com
```

---

## 📚 Documentación Adicional

- **Validación**: `.ubits/AUTO-VALIDATION.md`
- **Componentes**: `.ubits/component-inventory.json`
- **Reglas**: `.ubits/validation-rules.md`
- **Arquitectura**: `docs/ARQUITECTURA-TEMPLATE.md`
- **Análisis**: `docs/ANALISIS-*.md`

---

## 💡 Flujo de Trabajo Recomendado

1. **Inicializar**: `npm run init`
2. **Activar watch**: `npm run watch` (dejar corriendo)
3. **Desarrollar**: Trabajas normalmente, el sistema valida y commitea
4. **Integrar add-ons**: `npm run integrate:addons` (cuando estés listo)
5. **Desplegar**: `npm run deploy` (al finalizar)

---

## ✅ Ventajas del Template

- ✅ **Sin intervención manual** - Todo es automático
- ✅ **Calidad garantizada** - Validación en cada commit
- ✅ **Corrección automática** - Menos trabajo para ti
- ✅ **Flujo completo** - De inicio a despliegue
- ✅ **Configuración simple** - Todo guiado interactivamente
- ✅ **Diseño consistente** - Tokens y componentes UBITS
- ✅ **Responsive** - Funciona en todos los dispositivos
- ✅ **Documentado** - Storybook con ejemplos

---

## 🆘 Solución de Problemas

### El proyecto no se inicializa
```bash
# Verifica que tengas Node.js instalado
node --version

# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Los componentes no se cargan
```bash
# Verifica que los archivos estén en su lugar
ls packages/playground-app/components-loader.js

# Revisa la consola del navegador (F12)
```

### La validación falla
```bash
# Revisa los errores
npm run validate:all

# Corrige automáticamente
npm run validate:all:fix
```

---

**¿Listo para empezar?** Ejecuta `npm run init` 🚀

