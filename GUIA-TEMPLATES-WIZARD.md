# 📁 Guía: Templates Creados por el Wizard

## 📍 Ubicación de los Templates

**Los templates se crean en la carpeta `prototypes/` en la raíz del proyecto:**

```
MiProyecto/
├── Autorun/
│   └── ...
├── prototypes/                    ← Aquí se crean los templates
│   ├── canvas-administrador-encuestas-2025-12-02.html
│   └── canvas-colaborador-encuestas-2025-12-02.html
└── package.json
```

## 🎯 ¿Qué Templates se Crean?

**El wizard crea AMBOS templates al mismo tiempo:**

1. ✅ **Template Administrador** - `canvas-administrador-{module}-{product}-{fecha}.html`
2. ✅ **Template Colaborador** - `canvas-colaborador-{module}-{product}-{fecha}.html`

**Ejemplo:**
- Si eliges "Administrador" con módulo "encuestas" y producto "home":
  - `canvas-administrador-encuestas-home-2025-12-02.html` ✅ (seleccionado)
  - `canvas-colaborador-encuestas-home-2025-12-02.html` ✅ (también creado)

## 📋 Formato del Nombre del Archivo

**Patrón:** `canvas-{template}-{module}-{product}-{fecha}.html`

**Componentes:**
- `canvas-` - Prefijo fijo
- `{template}` - `administrador` o `colaborador`
- `{module}` - Módulo seleccionado (ej: `encuestas`, `aprendizaje`, `empresa`)
- `{product}` - Producto seleccionado (opcional, solo si hay producto)
- `{fecha}` - Fecha en formato `YYYY-MM-DD` (ej: `2025-12-02`)

**Ejemplos:**
- `canvas-administrador-encuestas-2025-12-02.html` (sin producto)
- `canvas-administrador-encuestas-home-2025-12-02.html` (con producto)
- `canvas-colaborador-aprendizaje-2025-12-02.html` (sin producto)

## 🌐 ¿Cuál Template se Abre en el Navegador?

**Solo se abre el template que seleccionaste en el wizard:**

- Si elegiste "Administrador" → se abre `canvas-administrador-*.html`
- Si elegiste "Colaborador" → se abre `canvas-colaborador-*.html`

**El otro template también se crea, pero NO se abre automáticamente.**

## 🔗 Enlaces Entre Templates

**Los templates están enlazados entre sí:**

- El template Administrador tiene un botón para cambiar a Colaborador
- El template Colaborador tiene un botón para cambiar a Administrador
- Los enlaces apuntan a los archivos correctos automáticamente

## 📂 Estructura Completa

```
MiProyecto/
├── Autorun/                       ← Directorio de Autorun
│   ├── packages/
│   ├── vendor/
│   └── ...
├── prototypes/                    ← Templates creados por el wizard
│   ├── canvas-administrador-encuestas-2025-12-02.html
│   └── canvas-colaborador-encuestas-2025-12-02.html
└── package.json                   ← Configuración del proyecto
```

## 🔍 Cómo Encontrar los Templates

**Desde la terminal:**
```bash
# Ver todos los templates
ls prototypes/*.html

# Ver solo templates de administrador
ls prototypes/canvas-administrador-*.html

# Ver solo templates de colaborador
ls prototypes/canvas-colaborador-*.html

# Ver templates de un módulo específico
ls prototypes/canvas-*-encuestas-*.html
```

**Desde el código:**
```javascript
// Ruta completa
const templatePath = path.join(process.cwd(), 'prototypes', 'canvas-administrador-encuestas-2025-12-02.html');

// O relativa desde la raíz del proyecto
const templatePath = 'prototypes/canvas-administrador-encuestas-2025-12-02.html';
```

## 🌐 Acceso desde el Servidor Local

**El servidor local sirve los templates desde `prototypes/`:**

- URL: `http://localhost:3000/canvas-administrador-encuestas-2025-12-02.html`
- Si accedes a la raíz (`http://localhost:3000/`), redirige automáticamente al template más reciente

## 💡 ¿Por Qué se Crean Ambos Templates?

**Razones:**

1. **Flexibilidad:** Puedes cambiar entre administrador y colaborador fácilmente
2. **Enlaces automáticos:** Los templates están enlazados entre sí
3. **Desarrollo:** Puedes trabajar en ambos templates simultáneamente
4. **Testing:** Puedes probar ambos modos sin recrear el template

## 🔄 Múltiples Ejecuciones del Wizard

**Si ejecutas el wizard múltiples veces:**

- Se crean nuevos templates con timestamps diferentes
- Los templates antiguos NO se eliminan
- El servidor local detecta automáticamente el más reciente

**Ejemplo:**
```
prototypes/
├── canvas-administrador-encuestas-2025-12-02.html  (ejecución 1)
├── canvas-colaborador-encuestas-2025-12-02.html    (ejecución 1)
├── canvas-administrador-encuestas-2025-12-03.html  (ejecución 2)
└── canvas-colaborador-encuestas-2025-12-03.html   (ejecución 2)
```

## 📝 Notas Importantes

1. **Los templates se crean en `prototypes/`** - NO en `Autorun/prototypes/`
2. **Se crean AMBOS templates** - Administrador y Colaborador
3. **Solo se abre el seleccionado** - El otro también existe pero no se abre
4. **Los templates tienen timestamps** - Cada ejecución crea archivos nuevos
5. **Los templates están enlazados** - Puedes cambiar entre ellos desde el sidebar

## 🔗 Referencias

- **Guía de creación desde imagen:** `GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
- **Guía del servidor local:** `GUIA-SERVIDOR-LOCAL.md`
- **Proceso de implementación:** `GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`

