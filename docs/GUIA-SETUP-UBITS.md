# Guía: Setup Inicial para UBITS

## 🎯 Objetivo

Configurar Autorun para trabajar con proyectos UBITS de forma rápida y eficiente.

---

## 🚀 Inicio Rápido

### **1. Ejecutar Wizard de Inicialización**

```bash
npm run autorun:init
```

O directamente:

```bash
npx @autorun/core init
```

### **2. Seleccionar Tipo de Proyecto**

El wizard preguntará:

```
📋 ¿En qué tipo de proyecto quieres trabajar?
1. UBITS (Configuración predefinida)
2. Proyecto Independiente (Configuración personalizada)
```

**Selecciona:** `1` para UBITS

---

## ⚙️ Configuración UBITS

### **Add-ons Preconfigurados**

Al elegir UBITS, se activan automáticamente:

1. ✅ **Storybook** - Desarrollo y documentación de componentes
2. ✅ **Feedback** - Feedback automatizado (n8n, Google Sheets, Gemini, Slack)
3. ✅ **Vercel** - Deploy automático
4. ✅ **GitHub** - Versionado y commits automáticos
5. ✅ **Clarity** - Analytics y heatmaps
6. ✅ **Standalone** - Builds optimizados

### **Componentes Cargados**

Se cargan automáticamente desde Storybook:

- ✅ Welcome
- ✅ ButtonFeedback
- ✅ Alert
- ✅ Mask
- ✅ Button

---

## 📋 Flujo de Configuración

### **Paso 1: Seleccionar Template**

```
📋 ¿Qué template quieres usar?
1. Administrador (Todos los módulos)
2. Colaborador (Módulos limitados)
```

**Administrador:**
- Todos los módulos disponibles
- Sidebar completo
- Acceso a configuración avanzada

**Colaborador:**
- Módulos limitados
- Sidebar simplificado
- Acceso básico

### **Paso 2: Seleccionar Módulo**

```
📋 ¿En qué módulo quieres trabajar?
1. Aprendizaje
2. Desempeño
3. Colaboradores
4. Reportes
5. Configuración
```

El módulo seleccionado se habilitará en el sidebar.

### **Paso 3: Crear Lienzo**

Se crea automáticamente un archivo HTML en:

```
prototypes/canvas-[template]-[modulo]-[fecha].html
```

**Ejemplo:**
```
prototypes/canvas-administrador-aprendizaje-2024-12-20.html
```

---

## 🎨 Estructura del Lienzo

El lienzo creado incluye:

1. **Sidebar** - Con módulos habilitados
2. **Área de trabajo** - Para prototipar
3. **Componentes UBITS** - Cargados desde Storybook
4. **Feedback automatizado** - Configurado y listo

### **Ejemplo de Lienzo:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- Componentes UBITS desde Storybook -->
  <script type="module">
    // Carga automática de componentes
  </script>
</head>
<body>
  <div class="app-container">
    <aside class="sidebar">
      <!-- Sidebar con módulos -->
    </aside>
    <main class="main-content">
      <div class="canvas-area">
        <!-- Aquí prototipas -->
      </div>
    </main>
  </div>
</body>
</html>
```

---

## 🔧 Configuración Manual

Si prefieres configurar manualmente:

### **1. Crear Hub**

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();
```

### **2. Activar Add-ons UBITS**

```typescript
import { UBITS_ADDONS_CONFIG } from '@autorun/core';

// Activar Storybook
await hub.activateAddon('storybook', UBITS_ADDONS_CONFIG.storybook);

// Activar Feedback
await hub.activateAddon('feedback', UBITS_ADDONS_CONFIG.feedback);

// Activar Vercel
await hub.activateAddon('vercel', UBITS_ADDONS_CONFIG.vercel);

// ... etc
```

### **3. Cargar Componentes desde Storybook**

```typescript
// Cargar componentes
await window.AUTORUN.Components.loadFromStorybook({
  manifestUrl: 'https://ubits-storybook.vercel.app/components/button/manifest.json'
});
```

### **4. Habilitar Módulo**

```typescript
import { ModuleManager } from '@autorun/core';

const moduleManager = new ModuleManager(hub);
await moduleManager.enableModule('aprendizaje', 'administrador');
```

### **5. Crear Lienzo**

```typescript
import { CanvasCreator } from '@autorun/core';

const canvasCreator = new CanvasCreator();
const canvasPath = await canvasCreator.create('administrador', 'aprendizaje');
```

---

## 📦 Módulos Disponibles

### **Template Administrador:**

- ✅ Aprendizaje
- ✅ Desempeño
- ✅ Colaboradores
- ✅ Reportes
- ✅ Configuración

### **Template Colaborador:**

- ✅ Aprendizaje
- ✅ Desempeño
- ✅ Mi Perfil

---

## 🎯 Casos de Uso

### **Caso 1: Prototipar Nueva Funcionalidad**

1. Ejecutar `npm run autorun:init`
2. Seleccionar UBITS → Administrador → Módulo
3. Abrir lienzo creado
4. Prototipar con componentes UBITS
5. Probar con feedback automatizado
6. Desplegar con Vercel

### **Caso 2: Testear con Clientes**

1. Crear prototipo en lienzo
2. Activar feedback automatizado
3. Desplegar a Vercel
4. Compartir URL con clientes
5. Recibir feedback automáticamente (n8n → Google Sheets → Gemini → Slack)

### **Caso 3: Desarrollo Rápido**

1. Cargar componentes desde Storybook
2. Construir rápidamente con componentes UBITS
3. Deploy automático con Vercel
4. Analytics con Clarity

---

## 🔍 Debugging

### **Ver Add-ons Activos**

```typescript
const activeAddons = hub.getActiveAddons();
console.log('Add-ons activos:', activeAddons);
```

### **Ver Componentes Cargados**

```typescript
const loaded = window.AUTORUN.Components.getLoadedComponents();
console.log('Componentes cargados:', loaded);
```

### **Ver Módulos Habilitados**

```typescript
const modules = moduleManager.getEnabledModules();
console.log('Módulos habilitados:', modules);
```

---

## ✅ Checklist de Setup

- [ ] Ejecutar `npm run autorun:init`
- [ ] Seleccionar UBITS
- [ ] Seleccionar template (Administrador/Colaborador)
- [ ] Seleccionar módulo
- [ ] Verificar que lienzo se creó
- [ ] Verificar que componentes se cargaron
- [ ] Verificar que sidebar tiene módulo habilitado
- [ ] Configurar feedback automatizado (opcional)
- [ ] Configurar Vercel (opcional)

---

## 🚀 Próximos Pasos

1. **Abrir lienzo creado** en el navegador
2. **Prototipar** con componentes UBITS
3. **Activar feedback** para recopilar opiniones
4. **Desplegar** con Vercel
5. **Testear** con clientes

---

## 📚 Referencias

- [Análisis Setup UBITS](./ANALISIS-SETUP-UBITS.md)
- [Uso Componentes Storybook](./USO-COMPONENTES-STORYBOOK.md)
- [Feedback Automatizado](../packages/addons/functional/feedback/README.md)

