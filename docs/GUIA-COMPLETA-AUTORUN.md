# 🚀 AUTORUN - Guía Completa del Proyecto

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Beneficios del Proyecto](#beneficios-del-proyecto)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Arquitectura y Estructura](#arquitectura-y-estructura)
5. [Sistema de Add-ons](#sistema-de-add-ons)
6. [Add-ons Disponibles](#add-ons-disponibles)
7. [Cómo Usar Autorun para Estructurar el Index](#cómo-usar-autorun-para-estructurar-el-index)
8. [Flujo de Trabajo Recomendado](#flujo-de-trabajo-recomendado)
9. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🎯 Introducción

**Autorun** es un sistema modular y extensible basado en un **Hub Central** que orquesta todos los componentes, add-ons y funcionalidades de tu aplicación. Es un framework de desarrollo que permite construir interfaces web modernas, escalables y mantenibles mediante un sistema de arquitectura de plugins.

### Concepto Clave: El Hub

El **Hub** es el núcleo central que:
- ✅ Conecta todos los add-ons y componentes
- ✅ Gestiona el ciclo de vida de los módulos
- ✅ Orquesta la comunicación entre componentes
- ✅ Proporciona un contexto compartido para toda la aplicación

---

## ✨ Beneficios del Proyecto

### 🎨 1. Arquitectura Modular y Escalable

**Beneficio**: Construye aplicaciones complejas dividiéndolas en módulos independientes y reutilizables.

- **Modularidad**: Cada funcionalidad es un add-on independiente
- **Escalabilidad**: Agrega nuevas funcionalidades sin modificar código existente
- **Mantenibilidad**: Código organizado y fácil de mantener
- **Reutilización**: Los add-ons pueden usarse en múltiples proyectos

### 🔌 2. Sistema de Plugins (Add-ons)

**Beneficio**: Extiende la funcionalidad sin modificar el código base.

- **Add-ons de Diseño**: Tokens, tipografía, templates
- **Add-ons Funcionales**: Integraciones con GitHub, servicios externos
- **Add-ons de Componentes**: UI components modulares
- **Fácil Integración**: Sistema de registro y activación automática

### 🎨 3. Sistema de Diseño Consistente

**Beneficio**: Mantén un diseño coherente en toda la aplicación.

- **Tokens de Diseño**: Variables CSS centralizadas
- **Tipografía Unificada**: Sistema de tipografía consistente
- **Temas**: Soporte para temas claro/oscuro
- **Componentes Estándar**: UI components predefinidos

### ⚡ 4. Desarrollo Rápido

**Beneficio**: Acelera el desarrollo con herramientas y plantillas preconfiguradas.

- **Templates Listos**: Templates para admin y colaborador
- **Hot Reload**: Desarrollo con recarga automática
- **TypeScript**: Tipado estático para menos errores
- **Build Optimizado**: Compilación eficiente con Vite

### 🛡️ 5. Calidad y Validación Automática

**Beneficio**: Mantén la calidad del código automáticamente.

- **Linting**: Biome para validación de código
- **Type Checking**: TypeScript para detección de errores
- **Validación de Tokens**: Verificación de uso correcto de tokens
- **Pre-commit Hooks**: Validación antes de cada commit

### 📦 6. Monorepo con Workspaces

**Beneficio**: Gestiona múltiples paquetes en un solo repositorio.

- **Workspaces**: Múltiples paquetes independientes
- **Dependencias Compartidas**: Evita duplicación
- **Build Independiente**: Compila solo lo necesario
- **Versionado**: Control de versiones por paquete

### 🔄 7. Integración con GitHub

**Beneficio**: Automatiza el flujo de trabajo con Git.

- **Auto-commit**: Commits automáticos durante desarrollo
- **Gestión de Ramas**: Creación y cambio de ramas
- **Estados Anteriores**: Recuperación de versiones anteriores
- **Sincronización**: Push automático al repositorio

---

## 🛠️ Tecnologías Utilizadas

### Core Technologies

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **TypeScript** | ^5.9.3 | Lenguaje principal con tipado estático |
| **Vite** | ^7.1.12 | Build tool y dev server ultra-rápido |
| **Node.js** | ES2022+ | Runtime de JavaScript |

### Build & Development Tools

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| **Biome** | ^2.3.2 | Linter y formatter (reemplazo de ESLint/Prettier) |
| **Husky** | ^9.1.7 | Git hooks para automatización |
| **Style Dictionary** | ^4.4.0 | Generación de tokens CSS/JS desde JSON |

### Dependencies Principales

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| **@fortawesome/fontawesome-pro** | ^7.1.0 | Iconos profesionales |
| **@fortawesome/fontawesome-svg-core** | ^7.1.0 | Core de FontAwesome |
| **@fortawesome/pro-*-svg-icons** | ^7.1.0 | Sets de iconos (light, regular, solid, thin) |

### Arquitectura

- **Monorepo**: Workspaces de npm
- **ES Modules**: Sistema de módulos moderno
- **TypeScript Strict Mode**: Máxima seguridad de tipos
- **Modular Architecture**: Arquitectura basada en add-ons

---

## 🏗️ Arquitectura y Estructura

### Estructura del Proyecto

```
Autorun/
├── packages/
│   ├── autorun-core/          # 🎯 NÚCLEO DEL HUB
│   │   ├── src/
│   │   │   ├── AutorunHub.ts  # Hub central
│   │   │   ├── AddonRegistry.ts # Registro de add-ons
│   │   │   ├── AddonLoader.ts   # Cargador de add-ons
│   │   │   ├── ConfigManager.ts # Gestor de configuración
│   │   │   └── interfaces/      # Interfaces TypeScript
│   │   └── dist/                # Build compilado
│   │
│   ├── addons/                  # 🔌 ADD-ONS DEL SISTEMA
│   │   └── functional/          # Add-ons funcionales
│   │       └── github/          # Integración GitHub
│   │
│   ├── icons/                   # 🎨 SISTEMA DE ICONOS
│   │   ├── src/
│   │   │   ├── catalog/         # Catálogo de iconos
│   │   │   ├── core/            # Core de iconos
│   │   │   └── providers/       # Proveedores (FontAwesome)
│   │   └── dist/
│   │
│   ├── proyecto-app/            # 📱 APLICACIÓN PRINCIPAL
│   │   └── tokens/
│   │       ├── index.html       # Página principal
│   │       └── *.md             # Documentación
│   │
│   └── ui/                      # 🎨 COMPONENTES UI
│
├── scripts/                     # 📜 SCRIPTS DE UTILIDAD
│   ├── compare-*.cjs           # Comparación de tokens
│   ├── convert-*.cjs           # Conversión de tokens
│   └── verificar-*.cjs         # Verificación
│
├── docs/                        # 📚 DOCUMENTACIÓN
│   └── *.md                    # Documentos markdown
│
├── package.json                 # Configuración del proyecto
├── tsconfig.json                # Configuración TypeScript
├── biome.json                   # Configuración Biome
└── README.md                    # Documentación principal
```

### Componentes Clave

#### 1. AutorunHub (`packages/autorun-core/src/AutorunHub.ts`)

El **Hub Central** que orquesta todo:

```typescript
class AutorunHub {
  // Registra add-ons disponibles
  async registerAddon(addonPath: string): Promise<void>
  
  // Activa un add-on
  async activateAddon(addonId: string): Promise<void>
  
  // Desactiva un add-on
  async deactivateAddon(addonId: string): Promise<void>
  
  // Emite eventos a add-ons funcionales
  async emitEvent(event: string, data?: any): Promise<void>
  
  // Obtiene servicios de add-ons
  getService(addonId: string, serviceName: string): Function | null
}
```

#### 2. Sistema de Add-ons

Los add-ons implementan interfaces específicas:

- **IDesignAddon**: Add-ons de diseño (tokens, tipografía)
- **IFunctionalAddon**: Add-ons funcionales (GitHub, servicios)
- **IComponentAddon**: Add-ons de componentes UI

#### 3. ConfigManager

Gestiona la configuración del proyecto:

- Configuración de add-ons activos
- Rutas y paths
- Configuraciones específicas por add-on

---

## 🔌 Sistema de Add-ons

### Tipos de Add-ons

#### 1. Design Add-ons (Add-ons de Diseño)

**Propósito**: Proporcionan estilos, tokens y recursos visuales.

**Características**:
- Carga de CSS/estilos
- Inyección de tokens en el DOM
- Gestión de temas
- Recursos visuales (fuentes, iconos)

**Ejemplos**:
- Los add-ons de diseño genéricos (tokens, typography, templates) han sido removidos del proyecto

#### 2. Functional Add-ons (Add-ons Funcionales)

**Propósito**: Proporcionan funcionalidades y servicios.

**Características**:
- Servicios y APIs
- Integraciones externas
- Lógica de negocio
- Eventos y callbacks

**Ejemplos**:
- `@autorun/github`: Integración con GitHub
- `@autorun/analytics`: Analytics y tracking
- `@autorun/storage`: Gestión de almacenamiento

#### 3. Component Add-ons (Add-ons de Componentes)

**Propósito**: Proporcionan componentes UI reutilizables.

**Características**:
- Componentes web
- Estilos asociados
- Comportamiento interactivo
- Documentación y ejemplos

### Ciclo de Vida de un Add-on

```typescript
interface IAddon {
  // 1. Inicialización
  initialize(context: AutorunContext): Promise<void>
  
  // 2. Configuración
  configure(config: any): Promise<void>
  
  // 3. Activación
  activate?(): Promise<void>
  
  // 4. Desactivación
  deactivate?(): Promise<void>
  
  // 5. Estado
  isActive(): boolean
}
```

### Dependencias entre Add-ons

Los add-ons pueden declarar dependencias:

```typescript
{
  id: 'my-addon',
  dependencies: ['tokens', 'typography']
}
```

El Hub resuelve automáticamente el orden de carga.

---

## 📦 Add-ons Disponibles

### Functional Add-ons

> **Nota**: Los add-ons de diseño genéricos (tokens, typography, templates-admin, templates-colaborador) han sido removidos del proyecto. Solo se mantienen los add-ons funcionales.

#### 1. **@autorun/github** - Integración GitHub

**Ubicación**: `packages/addons/functional/github/`

**Descripción**: Integración completa con GitHub para gestión automática de repositorios.

**Características**:
- ✅ Auto-commit durante desarrollo
- ✅ Gestión de ramas
- ✅ Recuperación de estados anteriores
- ✅ Push automático
- ✅ Configuración flexible

**Uso**:
```typescript
await hub.activateAddon('github');

// Obtener servicio
const githubService = hub.getService('github', 'commit');
if (githubService) {
  await githubService('Cambios automáticos');
}
```

**Configuración**:
```json
{
  "autoframe": {
    "addons": {
      "config": {
        "github": {
          "repositoryUrl": "https://github.com/user/repo",
          "branch": "main",
          "autoCommit": true,
          "autoCommitDelay": 5000,
          "pushOnCommit": false
        }
      }
    }
  }
}
```

### Icon System

#### **@autorun/icons** - Sistema de Iconos

**Ubicación**: `packages/icons/`

**Descripción**: Sistema completo de iconos basado en FontAwesome Pro.

**Características**:
- ✅ Catálogo completo de iconos
- ✅ Búsqueda de iconos
- ✅ Múltiples estilos (light, regular, solid, thin)
- ✅ Integración con componentes

**Uso**:
```typescript
import { IconProvider } from '@autorun/icons';

const iconProvider = new IconProvider();
const icon = await iconProvider.getIcon('fa-solid', 'home');
```

---

## 🎨 Cómo Usar Autorun para Estructurar el Index

### Paso 1: Inicializar el Hub

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Aplicación - Autorun</title>
  
  <!-- Cargar el Hub Core -->
  <script type="module">
    import { AutorunHub } from './packages/autorun-core/dist/index.js';
    
    // Crear instancia del Hub
    const hub = new AutorunHub();
    
    // Inicializar el Hub
    await hub.initialize();
    
    // Hacer el Hub disponible globalmente
    window.hub = hub;
  </script>
</head>
<body>
  <!-- Tu contenido aquí -->
</body>
</html>
```

### Paso 2: Activar Add-ons de Diseño

```html
<script type="module">
  // Esperar a que el Hub esté inicializado
  await window.hub.initialize();
  
  // Add-ons de diseño genéricos removidos (tokens, typography, templates)
  // Estos add-ons ya no están disponibles en el proyecto
  // await window.hub.activateAddon('tokens');
  // await window.hub.activateAddon('typography');
  // await window.hub.activateAddon('templates-admin');
</script>
```

### Paso 3: Estructurar el HTML con Tokens

```html
<body>
  <!-- Usar tokens CSS directamente -->
  <div style="background: var(--autoframe-bg-1); color: var(--autoframe-fg-1-high);">
    <h1 class="autoframe-heading-h1">Título Principal</h1>
    <p class="autoframe-body-md">Contenido con tipografía del sistema</p>
  </div>
  
  <!-- Usar clases de tipografía -->
  <section style="padding: var(--autoframe-spacing-4);">
    <h2 class="autoframe-heading-h2">Sección</h2>
    <p class="autoframe-body-lg">Texto grande</p>
  </section>
</body>
```

### Paso 4: Estructura Completa del Index

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Autorun - Mi Aplicación</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,..." />
  
  <style>
    /* ========================================
       ESTILOS BASE CON TOKENS
       ======================================== */
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html, body {
      width: 100%;
      height: 100%;
      font-family: var(--font-sans, 'Noto Sans', sans-serif);
      background: var(--autoframe-bg-2);
      color: var(--autoframe-fg-1-high);
    }
    
    /* ========================================
       SECCIÓN HERO
       ======================================== */
    
    .hero-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--autoframe-spacing-4);
      background: var(--autoframe-bg-1);
    }
    
    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--autoframe-fg-1-high);
      margin-bottom: var(--autoframe-spacing-3);
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--autoframe-fg-1-medium);
      max-width: 600px;
      text-align: center;
    }
    
    /* ========================================
       SECCIÓN FEATURES
       ======================================== */
    
    .features-section {
      padding: var(--autoframe-spacing-5);
      background: var(--autoframe-bg-2);
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--autoframe-spacing-4);
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .feature-card {
      padding: var(--autoframe-spacing-4);
      background: var(--autoframe-bg-1);
      border: 1px solid var(--autoframe-border-1);
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .feature-card:hover {
      border-color: var(--autoframe-accent-brand);
      box-shadow: 0 4px 12px rgba(12, 91, 239, 0.1);
    }
    
    .feature-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--autoframe-fg-1-high);
      margin-bottom: var(--autoframe-spacing-2);
    }
    
    .feature-description {
      font-size: 1rem;
      color: var(--autoframe-fg-1-medium);
      line-height: 1.6;
    }
  </style>
  
  <!-- Script para inicializar el Hub -->
  <script type="module">
    import { AutorunHub } from './packages/autorun-core/dist/index.js';
    
    // Inicializar Hub
    const hub = new AutorunHub();
    await hub.initialize();
    
    // Activar add-ons de diseño
    // Add-ons de diseño removidos
    // await hub.activateAddon('tokens');
    // await hub.activateAddon('typography');
    
    // Hacer disponible globalmente
    window.hub = hub;
    
    console.log('✅ Autorun Hub inicializado');
  </script>
</head>
<body>
  <!-- Hero Section -->
  <section class="hero-section">
    <h1 class="hero-title">Bienvenido a Autorun</h1>
    <p class="hero-subtitle">
      El hub central que une todas tus herramientas en un solo lugar.
      Construye, conecta y potencia tu flujo de trabajo.
    </p>
  </section>
  
  <!-- Features Section -->
  <section class="features-section">
    <div class="features-grid">
      <div class="feature-card">
        <h3 class="feature-title">Conexión Instantánea</h3>
        <p class="feature-description">
          Conecta herramientas en segundos. Sin configuración compleja.
        </p>
      </div>
      
      <div class="feature-card">
        <h3 class="feature-title">Potencia Total</h3>
        <p class="feature-description">
          Todas tus herramientas trabajando juntas en perfecta sincronía.
        </p>
      </div>
      
      <div class="feature-card">
        <h3 class="feature-title">Hub Central</h3>
        <p class="feature-description">
          Un punto central que conecta todo. Simple, poderoso, eficiente.
        </p>
      </div>
    </div>
  </section>
</body>
</html>
```

### Paso 5: Usar Add-ons Funcionales

```html
<script type="module">
  // Activar add-on de GitHub
  await window.hub.activateAddon('github');
  
  // Usar servicio de GitHub
  const commitService = window.hub.getService('github', 'commit');
  if (commitService) {
    // Hacer commit automático
    await commitService('Cambios desde la aplicación');
  }
</script>
```

### Paso 6: Estructura Modular con Secciones

```html
<body>
  <!-- Sección Home -->
  <section id="home" class="section-home">
    <!-- Contenido del hero -->
  </section>
  
  <!-- Sección Features -->
  <section id="features" class="section-features">
    <!-- Grid de características -->
  </section>
  
  <!-- Sección Add-ons -->
  <section id="addons" class="section-addons">
    <!-- Lista de add-ons disponibles -->
  </section>
  
  <!-- Sección Conectar -->
  <section id="conectar" class="section-conectar">
    <!-- Formulario de conexión -->
  </section>
</body>
```

### Paso 7: Integrar con Templates Predefinidos

```html
<script type="module">
  // Activar template de administrador
  // await window.hub.activateAddon('templates-admin'); // Removido
  
  // El template se carga automáticamente con:
  // - Sidebar de navegación
  // - SubNav para módulos
  // - TabBar para móviles
  // - Estilos predefinidos
</script>
```

---

## 🔄 Flujo de Trabajo Recomendado

### 1. Inicialización del Proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/elkingarcia22/Autorun.git
cd Autorun

# 2. Instalar dependencias
npm install

# 3. Build de los paquetes
# Script build:tokens eliminado - tokens genéricos removidos
```

### 2. Desarrollo

```bash
# Terminal 1: Servidor de desarrollo
npm run dev

# Terminal 2: Watch mode (opcional)
npm run watch
```

### 3. Estructura del Index

1. **Crear archivo HTML base** (`index.html`)
2. **Incluir script del Hub**
3. **Activar add-ons necesarios**
4. **Usar tokens CSS en los estilos**
5. **Estructurar secciones con clases de tipografía**

### 4. Agregar Funcionalidades

1. **Identificar necesidad** (diseño, funcionalidad, componente)
2. **Buscar add-on existente** o crear uno nuevo
3. **Activar add-on** en el Hub
4. **Usar servicios/componentes** del add-on

### 5. Build y Deploy

```bash
# Build de producción
npm run build

# Los archivos compilados estarán en dist/
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Página Simple con Tokens

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejemplo Simple</title>
  <script type="module">
    import { AutorunHub } from './packages/autorun-core/dist/index.js';
    const hub = new AutorunHub();
    await hub.initialize();
    // await hub.activateAddon('tokens'); // Removido
    window.hub = hub;
  </script>
  <style>
    body {
      background: var(--autoframe-bg-1);
      color: var(--autoframe-fg-1-high);
      padding: var(--autoframe-spacing-4);
    }
  </style>
</head>
<body>
  <h1>Mi Página</h1>
</body>
</html>
```

### Ejemplo 2: Página con Tipografía

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejemplo Tipografía</title>
  <script type="module">
    import { AutorunHub } from './packages/autorun-core/dist/index.js';
    const hub = new AutorunHub();
    await hub.initialize();
    // Add-ons de diseño removidos
    // await hub.activateAddon('tokens');
    // await hub.activateAddon('typography');
    window.hub = hub;
  </script>
</head>
<body>
  <h1 class="autoframe-heading-h1">Título Principal</h1>
  <h2 class="autoframe-heading-h2">Subtítulo</h2>
  <p class="autoframe-body-lg">Texto grande</p>
  <p class="autoframe-body-md">Texto mediano</p>
  <p class="autoframe-body-sm">Texto pequeño</p>
</body>
</html>
```

### Ejemplo 3: Página Completa con Múltiples Secciones

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Página Completa</title>
  <script type="module">
    import { AutorunHub } from './packages/autorun-core/dist/index.js';
    const hub = new AutorunHub();
    await hub.initialize();
    
    // Activar todos los add-ons de diseño
    // Add-ons de diseño removidos
    // await hub.activateAddon('tokens');
    // await hub.activateAddon('typography');
    
    window.hub = hub;
  </script>
  <style>
    /* Estilos usando tokens */
    .hero {
      background: var(--autoframe-bg-1);
      padding: var(--autoframe-spacing-5);
      text-align: center;
    }
    
    .features {
      background: var(--autoframe-bg-2);
      padding: var(--autoframe-spacing-5);
    }
    
    .card {
      background: var(--autoframe-bg-1);
      border: 1px solid var(--autoframe-border-1);
      padding: var(--autoframe-spacing-4);
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <!-- Hero -->
  <section class="hero">
    <h1 class="autoframe-heading-h1">Bienvenido</h1>
    <p class="autoframe-body-lg">Descripción principal</p>
  </section>
  
  <!-- Features -->
  <section class="features">
    <div class="card">
      <h2 class="autoframe-heading-h2">Característica 1</h2>
      <p class="autoframe-body-md">Descripción</p>
    </div>
  </section>
</body>
</html>
```

---

## 📚 Recursos Adicionales

### Documentación de Secciones

- `packages/proyecto-app/tokens/SECCION_HOME.md` - Documentación de la sección Home
- `packages/proyecto-app/tokens/SECCION_FEATURES.md` - Documentación de Features
- `packages/proyecto-app/tokens/SECCION_ADDONS.md` - Documentación de Add-ons
- `packages/proyecto-app/tokens/SECCION_CONECTAR.md` - Documentación de Conectar

### Archivos de Referencia

- `packages/proyecto-app/tokens/index.html` - Ejemplo completo de implementación
- `packages/proyecto-app/tokens/INDEX_BACKUP_ESTRUCTURA.md` - Estructura detallada del index

### Scripts Útiles

- `scripts/compare-*.cjs` - Comparar tokens
- `scripts/convert-*.cjs` - Convertir tokens
- `scripts/verificar-*.cjs` - Verificar tokens

---

## ✅ Resumen

**Autorun** es un sistema poderoso y flexible que te permite:

1. ✅ **Construir aplicaciones modulares** con el sistema de Hub
2. ✅ **Usar add-ons predefinidos** para diseño y funcionalidades
3. ✅ **Mantener consistencia** con tokens y tipografía
4. ✅ **Escalar fácilmente** agregando nuevos add-ons
5. ✅ **Desarrollar rápidamente** con templates y componentes listos

**El Hub Central** es el corazón del sistema, conectando todos los componentes y permitiendo una arquitectura limpia y mantenible.

---

**¿Listo para empezar?** Crea tu `index.html` y comienza a construir con Autorun! 🚀

