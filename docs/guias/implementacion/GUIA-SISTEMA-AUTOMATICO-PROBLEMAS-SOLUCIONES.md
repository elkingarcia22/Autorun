# 🤖 Guía: Sistema Automático de Captura de Problemas y Soluciones

## ⚠️ PROBLEMA ACTUAL

**Actualmente, los problemas y soluciones se documentan manualmente cuando el usuario lo solicita.** Esto significa:
- ❌ Hay que pedir explícitamente que se documente
- ❌ La información puede perderse si no se documenta
- ❌ Es difícil encontrar soluciones anteriores
- ❌ No hay un sistema centralizado

---

## ✅ SOLUCIÓN: Sistema Automático

### **Cómo Funciona:**

El sistema captura automáticamente:
1. **Problemas detectados** durante la implementación
2. **Soluciones aplicadas** cuando se corrige un problema
3. **Errores comunes** que se repiten
4. **Patrones de solución** que funcionan

### **Dónde se Guarda:**

```
docs/
└── problems-solutions/
    ├── headersection/
    │   ├── issue-001.md
    │   └── solution-001.md
    ├── contentmanager/
    │   ├── issue-001.md
    │   └── solution-001.md
    └── index.json (índice de todos los problemas y soluciones)
```

---

## 🔧 IMPLEMENTACIÓN ACTUAL (Manual Mejorado)

### **Mientras se implementa el sistema automático, usar este proceso:**

#### **1. Cuando Detectas un Problema:**

```markdown
## 🐛 Problema Detectado: [Nombre del Problema]

**Categoría:** [ContentManager, HeaderSection, DataTable, etc.]
**Fecha:** YYYY-MM-DD
**Archivos Afectados:** [lista de archivos]

### Descripción:
[Descripción detallada del problema]

### Contexto:
- ¿Dónde ocurre?
- ¿Cuándo ocurre?
- ¿Qué causa el problema?

### Código Problemático:
\`\`\`javascript
// Código que causa el problema
\`\`\`

### Logs/Errores:
[Logs o mensajes de error relevantes]
```

#### **2. Cuando Aplicas una Solución:**

```markdown
## ✅ Solución Aplicada: [Nombre de la Solución]

**Problema Relacionado:** [ID del problema]
**Fecha:** YYYY-MM-DD
**Archivos Modificados:** [lista de archivos]

### Solución:
[Descripción de la solución]

### Código Antes:
\`\`\`javascript
// Código antes de la solución
\`\`\`

### Código Después:
\`\`\`javascript
// Código después de la solución
\`\`\`

### Explicación:
[Por qué funciona esta solución]

### Guía Creada/Actualizada:
- `docs/guias/implementacion/GUIA-[NOMBRE].md`
```

---

## 📋 PROCESO MANUAL MEJORADO (Temporal)

### **Paso 1: Detectar Problema**

Cuando encuentres un problema durante la implementación:

1. **Identificar categoría:**
   - ContentManager
   - HeaderSection
   - DataTable
   - Componentes UBITS
   - Otros

2. **Documentar inmediatamente:**
   - Crear archivo en `docs/problems-solutions/[categoria]/issue-[numero].md`
   - Incluir descripción, contexto y código

### **Paso 2: Aplicar Solución**

Cuando apliques una solución:

1. **Crear archivo de solución:**
   - Crear en `docs/problems-solutions/[categoria]/solution-[numero].md`
   - Vincular con el problema relacionado

2. **Actualizar guías:**
   - Actualizar `GUIA-ERRORES-COMUNES-UBITS.md`
   - Crear guía específica si es necesario (ej: `GUIA-ELIMINAR-HEADERSECTION.md`)

3. **Actualizar índice:**
   - Agregar a `docs/problems-solutions/index.json`

---

## 🎯 SISTEMA AUTOMÁTICO FUTURO

### **Funcionalidades Planificadas:**

1. **Detección Automática:**
   - Intercepta errores de linter
   - Detecta patrones de problemas comunes
   - Captura contexto automáticamente

2. **Sugerencias Automáticas:**
   - Busca problemas similares en la base de datos
   - Sugiere soluciones automáticamente
   - Muestra guías relacionadas

3. **Documentación Automática:**
   - Genera guías automáticamente
   - Actualiza `GUIA-ERRORES-COMUNES-UBITS.md`
   - Mantiene índice actualizado

---

## 📝 EJEMPLO: Problema HeaderSection

### **Problema Detectado:**
```markdown
# docs/problems-solutions/headersection/issue-001.md

## 🐛 Problema: HeaderSection Aparece Cuando No Debería

**Categoría:** ContentManager / HeaderSection
**Fecha:** 2025-12-05
**Archivos Afectados:** 
- `prototypes/canvas-administrador-encuestas-2025-12-05.html`

### Descripción:
ContentManager crea automáticamente un HeaderSection en `updateContent()`, pero en el módulo "encuestas" la imagen no muestra HeaderSection, por lo que debe eliminarse.

### Contexto:
- Ocurre cuando ContentManager actualiza el contenido
- Se crea dinámicamente en `content-manager.js` línea 728-759
- Aparece en TODOS los módulos por defecto

### Código Problemático:
```javascript
// En content-manager.js
if (section !== 'admin') {
  // Crea HeaderSection automáticamente
  const headerContainer = document.createElement('div');
  headerContainer.id = 'header-section-container';
  // ...
}
```

### Logs/Errores:
- HeaderSection aparece después de navegar a otra sección
- Se crea dinámicamente aunque se elimine del HTML estático
```

### **Solución Aplicada:**
```markdown
# docs/problems-solutions/headersection/solution-001.md

## ✅ Solución: Interceptar ContentManager.updateContent

**Problema Relacionado:** issue-001
**Fecha:** 2025-12-05
**Archivos Modificados:**
- `prototypes/canvas-administrador-encuestas-2025-12-05.html`

### Solución:
Interceptar `ContentManager.updateContent` para eliminar HeaderSection después de que se crea, y usar MutationObserver para eliminarlo si se crea dinámicamente después.

### Código Implementado:
[Ver: `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`]

### Guía Creada:
- `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`
- `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (Error #9 actualizado)
```

---

## 🔍 BÚSQUEDA DE SOLUCIONES

### **Cómo Buscar Soluciones Anteriores:**

1. **Por Categoría:**
   ```bash
   # Buscar problemas de HeaderSection
   ls docs/problems-solutions/headersection/
   ```

2. **Por Palabra Clave:**
   ```bash
   # Buscar en todos los problemas
   grep -r "HeaderSection" docs/problems-solutions/
   ```

3. **Por Archivo Afectado:**
   ```bash
   # Buscar problemas que afectan un archivo específico
   grep -r "canvas-administrador-encuestas" docs/problems-solutions/
   ```

---

## 📊 ÍNDICE DE PROBLEMAS Y SOLUCIONES

### **Estructura del Índice:**

```json
{
  "problemas": [
    {
      "id": "headersection-issue-001",
      "categoria": "ContentManager",
      "titulo": "HeaderSection Aparece Cuando No Debería",
      "fecha": "2025-12-05",
      "solucion_id": "headersection-solution-001",
      "guia": "docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md"
    }
  ],
  "soluciones": [
    {
      "id": "headersection-solution-001",
      "problema_id": "headersection-issue-001",
      "categoria": "ContentManager",
      "titulo": "Interceptar ContentManager.updateContent",
      "fecha": "2025-12-05",
      "guia": "docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md"
    }
  ]
}
```

---

## 🚀 SISTEMA AUTOMÁTICO IMPLEMENTADO ✅

El add-on `problem-tracker` está **completamente implementado** y listo para usar.

### **Instalación:**

1. **Activar en el wizard:**
   ```bash
   npm run autorun-init
   # Seleccionar "problem-tracker" en la lista de add-ons
   ```

2. **O activar manualmente:**
   ```typescript
   const hub = new AutorunHub();
   await hub.initialize();
   await hub.activateAddon('problem-tracker');
   ```

### **Uso:**

Ver documentación completa: `packages/addons/functional/problem-tracker/README.md`

### **Funcionalidades Disponibles:**

- ✅ Detección automática de problemas
- ✅ Registro manual de problemas y soluciones
- ✅ Búsqueda de problemas similares
- ✅ Sugerencias automáticas de soluciones
- ✅ Almacenamiento en Markdown
- ✅ Índice JSON actualizado automáticamente

---

## 🔗 Referencias

- **Propuesta completa:** `docs/guias/implementacion/PROPUESTA-SISTEMA-AUTOMATICO-PROBLEMAS-SOLUCIONES.md`
- **Guía de errores:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- **Feedback Add-on:** `packages/addons/functional/feedback/`

---

**Última actualización:** Diciembre 2024  
**Estado:** Manual mejorado - Sistema automático en planificación








