# 🎨 Guía: Usar Componentes UBITS para Crear Páginas

## ✅ Estado Actual

**Todo está listo para usar los componentes de UBITS.** El sistema está completamente configurado y funcionando.

---

## 📍 Ubicación de los Templates

Los templates generados están en:
```
prototypes/
├── canvas-administrador-[modulo]-[producto]-[fecha].html
└── canvas-colaborador-[modulo]-[producto]-[fecha].html
```

**Ejemplo actual:**
- `prototypes/canvas-administrador-desempeno-matriz-talento-2025-11-27.html`
- `prototypes/canvas-colaborador-desempeno-matriz-talento-2025-11-27.html`

---

## 🚀 Cómo Usar los Componentes UBITS

### **1. Los Componentes Ya Están Cargados**

Los templates generados ya incluyen todos los componentes de UBITS cargados desde Storybook. No necesitas cargarlos manualmente.

**Componentes disponibles:**
- ✅ Sidebar (`createSidebar`)
- ✅ SubNav (`createSubNav`)
- ✅ TabBar (`createTabBar`)
- ✅ Button (`ubits-button` o `window.UBITS.Button`)
- ✅ Alert (`ubits-alert`)
- ✅ Y todos los demás componentes de UBITS

### **2. API Global Disponible**

Todos los componentes están disponibles en `window`:

```javascript
// Sidebar
window.createSidebar(options)

// SubNav
window.createSubNav(options)

// TabBar
window.createTabBar(options)

// Button
window.UBITS.Button.create(options)
// O usar el Web Component:
// <ubits-button variant="primary">Click me</ubits-button>
```

### **3. Storybook URL**

Los componentes se cargan desde:
```
https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app
```

---

## 📝 Ejemplo: Crear una Nueva Página

Cuando pidas crear una página en el otro chat de Cursor, puedes decirle:

### **Ejemplo 1: Crear una página simple**

```
Crea una nueva página HTML en prototypes/ usando los componentes de UBITS.
Usa el template canvas-administrador-desempeno-matriz-talento-2025-11-27.html como base.
Agrega un botón primario y una tarjeta con información.
```

### **Ejemplo 2: Modificar el template existente**

```
Modifica el template canvas-administrador-desempeno-matriz-talento-2025-11-27.html
Agrega una sección nueva con un formulario usando los componentes de UBITS.
```

### **Ejemplo 3: Crear componente personalizado**

```
Crea un nuevo componente usando los tokens y estilos de UBITS.
Usa los componentes base de UBITS como referencia.
```

---

## 🎯 Componentes Disponibles

### **Componentes Principales (Ya Cargados)**

1. **Sidebar** - `window.createSidebar()`
2. **SubNav** - `window.createSubNav()`
3. **TabBar** - `window.createTabBar()`
4. **Button** - `window.UBITS.Button.create()` o `<ubits-button>`
5. **Alert** - `<ubits-alert>` o `window.UBITS.Alert`
6. **Input** - `<ubits-input>` o `window.UBITS.Input`
7. **Card** - `<ubits-card>` o `window.UBITS.Card`
8. **Table** - `<ubits-table>` o `window.UBITS.Table`
9. **Modal** - `<ubits-modal>` o `window.UBITS.Modal`
10. **Y muchos más...**

### **Cómo Ver Todos los Componentes Disponibles**

Abre la consola del navegador en el template y ejecuta:

```javascript
// Ver todos los componentes cargados
console.log(window.AUTORUN.Components.getLoadedComponents());

// Ver componentes UBITS disponibles
console.log(window.UBITS);
```

---

## 📚 Documentación de Referencia

### **Archivos Importantes:**

1. **`docs/USO-COMPONENTES-STORYBOOK.md`** - Cómo cargar componentes desde Storybook
2. **`docs/GUIA-SETUP-UBITS.md`** - Configuración completa de UBITS
3. **`INDEX.md`** - Instrucciones de inicialización

### **Estructura del Template**

Los templates incluyen:
- ✅ Sidebar configurado con módulos
- ✅ SubNav configurado con tabs
- ✅ TabBar (en móvil)
- ✅ ContentManager para gestionar contenido
- ✅ ResponsiveManager para adaptación automática
- ✅ ThemeManager para modo oscuro/claro
- ✅ Todos los componentes UBITS cargados

---

## 🔧 Para el Otro Chat de Cursor

Cuando le pidas crear una página, incluye esta información:

### **Contexto a Proporcionar:**

```
Estoy trabajando con un proyecto UBITS que ya tiene:
- Templates generados en prototypes/
- Componentes UBITS cargados desde Storybook
- Sidebar, SubNav, TabBar ya configurados
- Sistema de componentes disponible en window.UBITS y window.AUTORUN.Components

Necesito que crees/modifique una página usando estos componentes.
```

### **Ejemplo de Prompt Completo:**

```
Crea una nueva página en prototypes/nueva-pagina.html usando los componentes de UBITS.
Usa como referencia el template canvas-administrador-desempeno-matriz-talento-2025-11-27.html.
La página debe incluir:
- Un header con título
- Un formulario con inputs de UBITS
- Botones usando ubits-button
- Una tabla con datos usando ubits-table
- Mantener el mismo estilo y estructura del template base
```

---

## ✅ Checklist: ¿Está Todo Listo?

- ✅ Templates generados y funcionando
- ✅ Componentes UBITS cargados desde Storybook
- ✅ Rutas de imágenes corregidas (usando file://)
- ✅ Detección de template funcionando (administrador/colaborador)
- ✅ Sidebar, SubNav, TabBar configurados
- ✅ Sistema de componentes disponible globalmente
- ✅ Documentación disponible

**🎉 ¡Sí, todo está listo para usar los componentes de UBITS!**

---

## 🚨 Notas Importantes

1. **Rutas de archivos:** Los templates usan rutas absolutas `file://` para CSS, JS e imágenes
2. **Storybook:** Los componentes se cargan automáticamente desde Storybook
3. **Templates base:** Usa los templates en `prototypes/` como referencia
4. **Componentes globales:** Todos están en `window.UBITS` y `window.AUTORUN.Components`

---

## 📞 Si Necesitas Ayuda

- Revisa `docs/USO-COMPONENTES-STORYBOOK.md` para detalles técnicos
- Revisa `docs/GUIA-SETUP-UBITS.md` para configuración
- Los componentes están documentados en Storybook: https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app

