# 🚀 UBITS Playground Template

Template completo para crear aplicaciones UBITS con sistema de diseño, componentes modulares, validación automática y despliegue.

## 📋 Índice

- [Inicio Rápido](#-inicio-rápido)
- [Características](#-características)
- [Modos de Operación](#-modos-de-operación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Sistema de Diseño](#-sistema-de-diseño)
- [Scripts Disponibles](#-scripts-disponibles)
- [Validación Automática](#-validación-automática)
- [Documentación](#-documentación)

---

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio

```bash
git clone https://github.com/elkingarcia22/prototipo-template.git
cd prototipo-template
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Inicializar Proyecto

```bash
npm run init
```

Este comando interactivo te guiará paso a paso:
- ✅ Solicita URL del repositorio GitHub
- ✅ Permite seleccionar perfil (Colaborador/Administrador)
- ✅ Configura el template automáticamente
- ✅ Inicializa Git y configura remoto
- ✅ Instala dependencias
- ✅ Configura auto-commit y validación

### 4. Iniciar Desarrollo

```bash
# Terminal 1: Auto-commit y validación
npm run watch

# Terminal 2: Servidor de desarrollo
npm run dev
```

Abre `packages/playground-app/template-colaborador.html` o `template-admin.html` según el perfil.

---

## ✨ Características

### 🎨 Sistema de Diseño Completo
- ✅ Tokens de color, tipografía y espaciado
- ✅ Componentes modulares reutilizables
- ✅ Tipografía UBITS integrada
- ✅ Iconos Font Awesome Pro

### 👥 Dos Modos de Operación
- ✅ **Modo Colaborador**: Para usuarios normales
- ✅ **Modo Administrador**: Para administradores con funciones avanzadas

### 📱 Diseño Responsive
- ✅ Desktop (≥1024px): Sidebar visible
- ✅ Móvil (<1024px): TabBar visible
- ✅ Contenido adaptativo

### 🛡️ Validación Automática
- ✅ Detección de colores hardcodeados
- ✅ Validación de clases de tipografía
- ✅ Verificación de componentes custom
- ✅ Auto-corrección de errores comunes

### 🔄 Auto-Commit
- ✅ Commits automáticos durante desarrollo
- ✅ Validación antes de cada commit
- ✅ Prevención de commits con errores

### 📦 Add-ons Disponibles
- ✅ Microsoft Clarity (Analytics)
- ✅ Onboarding (Guía interactiva)
- ✅ Feedback Automation (Sistema de feedback)

### 🚀 Despliegue Automatizado
- ✅ Vercel (Recomendado)
- ✅ Render
- ✅ Configuración guiada paso a paso

---

## 👥 Modos de Operación

### 👤 Modo Colaborador

**Template**: `template-colaborador.html`

**Módulos disponibles**:
- 📚 **Aprendizaje**: Cursos y rutas de aprendizaje
- 📊 **Desempeño**: Evaluaciones y métricas personales
- 🔍 **Diagnóstico**: Herramientas de diagnóstico (sin SubNav)

### 👨‍💼 Modo Administrador

**Template**: `template-admin.html`

**Módulos disponibles**:
- 🏠 **Inicio**: Panel de administración (sin SubNav)
- 🏢 **Empresa** → Gestión de usuarios
- 📚 **Aprendizaje** → LMS completo
- 📊 **Desempeño** → Evaluaciones 360°
- 🔍 **Diagnóstico**: Análisis organizacional (sin SubNav)
- 🔌 **API**: Documentación de API
- ❓ **Centro de ayuda**: Soporte y ayuda

---

## 📁 Estructura del Proyecto

```
prototipo-template/
├── packages/
│   ├── addons/              # Componentes modulares
│   │   ├── sidebar/         # Sidebar con modos
│   │   ├── tabbar/          # TabBar responsive
│   │   ├── subnav/          # SubNav dinámico
│   │   ├── card/            # Card Content
│   │   ├── button/          # Botones UBITS
│   │   ├── input/           # Inputs UBITS
│   │   ├── alert/           # Alertas
│   │   ├── toast/           # Notificaciones
│   │   └── badge/          # Badges
│   ├── playground-app/      # Aplicación principal
│   │   ├── template-colaborador.html
│   │   ├── template-admin.html
│   │   ├── components-loader.js
│   │   ├── config/
│   │   │   ├── products.js
│   │   │   ├── responsive-manager.js
│   │   │   └── theme-manager.js
│   │   └── engine/
│   │       ├── content-manager.js
│   │       └── template-loader.js
│   ├── tokens/              # Tokens de diseño
│   └── typography/          # Tipografía UBITS
├── scripts/
│   ├── init-project.cjs
│   ├── integrate-addons.cjs
│   ├── deploy.cjs
│   └── validate-ubits.cjs
├── .ubits/                  # Configuración UBITS
└── .husky/                  # Git hooks
```

---

## 🎨 Sistema de Diseño

### Tokens de Color

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

## 🛡️ Validación Automática

### Qué Valida

- ✅ Colores hardcodeados → Sugiere tokens UBITS
- ✅ Clases de tipografía incorrectas → Sugiere clases oficiales
- ✅ Componentes custom → Sugiere componentes oficiales
- ✅ CSS faltante → Sugiere imports necesarios

### Qué Corrige Automáticamente

- `white` → `var(--ubits-bg-1)`
- `black` → `var(--ubits-fg-1-high)`
- `ubits-h1` → `ubits-heading-h1`
- `ubits-body-lg-bold` → `ubits-heading-h1`

### Ejecución Automática

La validación se ejecuta automáticamente:
- ✅ En cada commit (pre-commit hook)
- ✅ Cuando ejecutas `npm run watch`
- ✅ Manualmente con `npm run validate`

---

## 📚 Documentación

- **[Guía Completa](GUIA-COMPLETA.md)**: Documentación detallada del template
- **[Reglas Cursor](.cursorrules)**: Reglas para trabajar con Cursor AI
- **[Validación](.ubits/AUTO-VALIDATION.md)**: Sistema de validación automática
- **[Componentes](.ubits/component-inventory.json)**: Inventario de componentes
- **[Arquitectura](docs/ARQUITECTURA-TEMPLATE.md)**: Arquitectura del template

---

## 💡 Flujo de Trabajo Recomendado

1. **Inicializar**: `npm run init`
2. **Activar watch**: `npm run watch` (dejar corriendo)
3. **Desarrollar**: Trabajas normalmente, el sistema valida y commitea
4. **Integrar add-ons**: `npm run integrate:addons` (cuando estés listo)
5. **Desplegar**: `npm run deploy` (al finalizar)

---

## ✅ Ventajas

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
node --version  # Verifica Node.js
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
npm run validate:all      # Revisa errores
npm run validate:all:fix  # Corrige automáticamente
```

---

**¿Listo para empezar?** Ejecuta `npm run init` 🚀

---

## 📄 Licencia

ISC
