# Análisis: Setup Inicial para UBITS

## 🎯 Objetivo

Crear una capa inicial de configuración que permita:
1. Elegir entre trabajar en **UBITS** o **proyecto independiente**
2. Si elige UBITS, cargar add-ons preconfigurados
3. Conectar con Storybook de UBITS
4. Construir sobre template desktop del Storybook
5. Seleccionar template (Administrador/Colaborador)
6. Seleccionar módulo para habilitar en sidebar
7. Crear lienzo/template nuevo para prototipar

---

## ✅ Viabilidad: SÍ ES POSIBLE

### **Componentes Necesarios:**

1. ✅ **InitializationWizard** - Wizard interactivo de configuración
2. ✅ **UBITS Preset** - Configuración predefinida de add-ons para UBITS
3. ✅ **Template Loader** - Cargar templates desde Storybook
4. ✅ **Module Manager** - Gestionar módulos y sidebar
5. ✅ **Canvas Creator** - Crear archivos de lienzo/template

---

## 📦 Add-ons Recomendados para UBITS

### **Add-ons Esenciales:**

1. **Storybook** ⭐⭐⭐
   - Cargar componentes desde Storybook de UBITS
   - Desarrollo y documentación
   - **Uso**: Cargar template desktop y componentes

2. **ComponentLoader** ⭐⭐⭐
   - Cargar componentes dinámicamente desde Storybook
   - Sin duplicados
   - **Uso**: Cargar componentes UBITS automáticamente

3. **Feedback** ⭐⭐⭐
   - Feedback automatizado con n8n, Google Sheets, Gemini, Slack
   - **Uso**: Recopilar feedback de clientes en prototipos

4. **Vercel** ⭐⭐⭐
   - Deploy automático
   - **Uso**: Desplegar prototipos rápidamente

5. **GitHub** ⭐⭐
   - Versionado y commits automáticos
   - **Uso**: Guardar cambios de prototipos

6. **Clarity** ⭐⭐
   - Analytics y heatmaps
   - **Uso**: Analizar comportamiento en prototipos

7. **Standalone** ⭐⭐
   - Builds optimizados
   - **Uso**: Optimizar builds de prototipos

### **Add-ons Opcionales:**

8. **Chromatic** - Visual testing
9. **Playwright** - Testing E2E
10. **Lighthouse** - Performance

---

## 🏗️ Arquitectura Propuesta

### **1. InitializationWizard**

```typescript
class InitializationWizard {
  async start(): Promise<UBITSConfig | IndependentConfig> {
    // 1. Preguntar: UBITS o Independiente
    const projectType = await this.askProjectType();
    
    if (projectType === 'ubits') {
      return await this.setupUBITS();
    } else {
      return await this.setupIndependent();
    }
  }
  
  async setupUBITS(): Promise<UBITSConfig> {
    // 2. Cargar add-ons preconfigurados
    // 3. Conectar con Storybook
    // 4. Seleccionar template (Administrador/Colaborador)
    // 5. Seleccionar módulo
    // 6. Crear lienzo
  }
}
```

### **2. UBITS Preset**

```typescript
const UBITS_PRESET = {
  storybook: {
    url: 'https://ubits-storybook.vercel.app',
    useStorybookComponents: true,
    loadTemplate: 'desktop'
  },
  addons: [
    'storybook',
    'feedback',
    'vercel',
    'github',
    'clarity',
    'standalone'
  ],
  components: [
    'welcome',
    'button-feedback',
    'alert',
    'mask',
    'button',
    'sidebar'
  ]
};
```

### **3. Template System**

```typescript
interface UBITSTemplate {
  type: 'administrador' | 'colaborador';
  modules: string[];
  sidebar: SidebarConfig;
  components: string[];
}
```

### **4. Module Manager**

```typescript
class ModuleManager {
  enableModule(moduleName: string): void {
    // Habilitar módulo en sidebar
    // Cargar componentes del módulo
    // Actualizar navegación
  }
}
```

---

## 🔄 Flujo Completo

```
1. Usuario ejecuta: npm run autorun:init
   ↓
2. InitializationWizard pregunta:
   "¿Quieres trabajar en UBITS o proyecto independiente?"
   ↓
3. Si elige UBITS:
   ├─► Cargar UBITS_PRESET
   ├─► Conectar con Storybook UBITS
   ├─► Cargar componentes desde Storybook
   ├─► Preguntar: "¿Qué template? (Administrador/Colaborador)"
   ├─► Preguntar: "¿En qué módulo quieres trabajar?"
   ├─► Habilitar módulo en sidebar
   └─► Crear lienzo/template nuevo
   ↓
4. Si elige Independiente:
   ├─► Preguntar qué add-ons activar
   └─► Configuración personalizada
   ↓
5. Sistema listo para prototipar
```

---

## 📋 Estructura de Archivos

```
packages/autorun-core/src/
├── wizard/
│   ├── InitializationWizard.ts
│   ├── UBITSPreset.ts
│   ├── TemplateLoader.ts
│   └── ModuleManager.ts
└── presets/
    └── ubits-preset.json
```

---

## 🎨 Templates UBITS

### **Template Administrador**

- Sidebar completo con todos los módulos
- Dashboard con métricas
- Gestión de usuarios
- Configuración avanzada

### **Template Colaborador**

- Sidebar simplificado
- Módulos específicos del rol
- Vista enfocada en tareas
- Acciones limitadas

---

## ✅ Conclusión

**SÍ ES POSIBLE** implementar esta capa inicial. Los add-ons necesarios ya existen y están funcionando. Solo necesitamos:

1. ✅ Crear InitializationWizard
2. ✅ Crear UBITS Preset
3. ✅ Integrar con ComponentLoader
4. ✅ Crear Template System
5. ✅ Crear Module Manager

**Ventajas:**
- ✅ Setup rápido para UBITS
- ✅ Prototipado rápido
- ✅ Feedback automatizado
- ✅ Deploy rápido
- ✅ Testing con clientes

