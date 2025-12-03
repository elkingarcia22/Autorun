# 🚨🚨🚨 BLOQUEO ABSOLUTO PARA IMÁGENES 🚨🚨🚨

## ⚠️⚠️⚠️ LEER ESTO PRIMERO SI HAY UNA IMAGEN ⚠️⚠️⚠️

**SI EL USUARIO ENVÍA UNA IMAGEN O PIDE CREAR/MODIFICAR DESDE IMAGEN:**

### 🚫 PROHIBIDO HACER ESTO:

- ❌ **NO escribir código JavaScript**
- ❌ **NO modificar archivos HTML**
- ❌ **NO buscar templates**
- ❌ **NO implementar componentes**
- ❌ **NO crear archivos nuevos**
- ❌ **NO reemplazar contenido**
- ❌ **NO hacer NADA hasta completar el análisis**

### 🚫 PROHIBIDO USAR ESTAS HERRAMIENTAS ANTES DEL ANÁLISIS:

- ❌ **NO usar `write()`** - PROHIBIDO antes de análisis
- ❌ **NO usar `search_replace()`** - PROHIBIDO antes de análisis
- ❌ **NO usar `read_file()` para templates** - PROHIBIDO antes de análisis (solo leer guías)
- ❌ **NO usar ninguna herramienta que modifique archivos** - PROHIBIDO antes de análisis

### ✅ SOLO PUEDES USAR:

- ✅ `read_file()` para leer `BLOQUEO-IMAGEN.md` y guías
- ✅ `list_dir()` para identificar templates existentes
- ✅ `grep()` para buscar referencias en guías
- ✅ Mostrar el análisis completo al usuario

### ✅ DEBES HACER ESTO PRIMERO:

1. **DETENER TODO INMEDIATAMENTE**
2. **LEER PRIMERO:** `VERIFICACION-IMAGEN.md` - ⚠️ OBLIGATORIO (archivo de verificación)
3. **LEER SEGUNDO:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
4. **LEER TERCERO:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
5. **LEER CUARTO:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO para spacing
6. **LEER QUINTO:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` - ⚠️ OBLIGATORIO para iconos
7. **LEER SEXTO:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` - ⚠️ OBLIGATORIO si agregas elementos a `.content-area`
8. **IDENTIFICAR template existente** (buscar en `prototypes/`)
9. **ANALIZAR la imagen detalladamente:**
   - ⚠️ **Medir visualmente cada spacing (NO asumir basándose en ejemplos)**
   - ⚠️ **Comparar spacing con tokens disponibles antes de documentar**
   - ⚠️ **Verificar cada espacio individualmente**
   - ⚠️ **Verificar si necesitas interceptar ContentManager antes de agregar elementos**
9. **MOSTRAR análisis completo al usuario** (formato obligatorio)
10. **ESPERAR aprobación explícita del usuario**
11. **SOLO DESPUÉS** de aprobación, implementar UNA tarea a la vez

### 📋 FORMATO OBLIGATORIO PARA MOSTRAR ANÁLISIS:

```markdown
## 📋 Análisis Detallado de la Imagen

### 🔍 Componentes UBITS Identificados:
1. [Componente 1] - [Tipo] - [Ubicación] - [¿Ya existe o se implementa?]
2. [Componente 2] - [Tipo] - [Ubicación] - [¿Ya existe o se implementa?]
...

### 🔍 SubNav vs Tabs (Verificación Obligatoria):
- **SubNav:** ¿Hay barra horizontal con tabs debajo del header?
  - Si SÍ → Ya existe en template, NO implementar
  - Documentar: "SubNav: Ya existe (tabs: [X, Y])"
- **Tabs:** ¿Hay tabs adicionales dentro del contenido principal?
  - Si SÍ → Implementar con `window.createTabs()`
  - Si NO → Documentar: "Tabs: NO (solo SubNav existe)"
- **Ver guía:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` - ⚠️ OBLIGATORIO

### 📋 HeaderSection (Verificación Obligatoria):
- **¿Hay HeaderSection visible en la imagen?** [SÍ / NO]
- **Si NO hay HeaderSection:**
  - ✅ DEBE eliminarse del template (viene por defecto)
  - Interceptar ContentManager para NO crear HeaderSection
  - Verificar módulo/sección antes de eliminar: `if (section !== 'encuestas') return`
- **Si SÍ hay HeaderSection:**
  - ✅ MANTENER HeaderSection
  - Título: [título si está visible]
  - Botón primario: [texto del botón si está visible]
- **Módulo afectado:** [encuestas / inicio / empresa / etc.]
...

### 🎨 Iconos Identificados (con variaciones):
1. [Icono 1]: 
   - Variaciones posibles: `icono-simple`, `icono`, `icono-regular`
   - Icono seleccionado: `icono-simple` (razón: [explicación visual])
2. [Icono 2]: ...
...

### 📐 Estructura Visual:
1. [Elemento 1] (sin contenedor / con contenedor: `#id`)
2. [Elemento 2] (sin contenedor / con contenedor: `#id`)
...

### 📏 Spacing Identificado:
- Entre [Elemento A] y [Elemento B]: `--ubits-spacing-lg` (16px)
- Entre [Elemento B] y [Elemento C]: `--ubits-spacing-md` (12px)
...

### ⚙️ Funcionalidades Identificadas:
1. [Funcionalidad 1]: [Descripción]
2. [Funcionalidad 2]: [Descripción]
...

### 📋 Plan de Implementación:
1. **Tarea 1:** [Descripción] (solo esto, nada más)
2. **Tarea 2:** [Descripción] (solo después de aprobación de Tarea 1)
3. **Tarea 3:** [Descripción] (solo después de aprobación de Tarea 2)
...

### ❓ ¿Aprobamos este plan antes de implementar?
```

### ⚠️ CRÍTICO:

- **NO implementar** hasta que el usuario apruebe explícitamente
- **MOSTRAR** el análisis completo en el formato de arriba
- **ESPERAR** respuesta del usuario antes de continuar
- **NO saltarse** ningún paso

---

**Si implementas sin mostrar el análisis primero, estás violando las reglas del proyecto.**

