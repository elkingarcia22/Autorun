# 🔍 Detección de Imágenes

> **⚠️ CRÍTICO:** Este archivo debe leerse cuando se detecta una imagen o solicitud de creación desde imagen.

---

## 🔍 TRIGGERS DE DETECCIÓN AUTOMÁTICA

### 1. **Detección de Imagen Directa:**
- ✅ `<image_description>` en el mensaje
- ✅ `<image>` en el mensaje
- ✅ `[imagen]` en el mensaje
- ✅ Cualquier referencia a imagen adjunta

### 2. **Detección de Palabras Clave:**
- ✅ "imagen" o "image"
- ✅ "crear desde imagen"
- ✅ "modificar desde imagen"
- ✅ "home de [módulo]" (ej: "home de encuestas")
- ✅ "crear home"
- ✅ "implementar desde imagen"
- ✅ "analizar imagen"
- ✅ Cualquier combinación de "crear" + "imagen"
- ✅ Cualquier combinación de "modificar" + "imagen"

### 3. **Detección de Solicitudes de Creación:**
- ✅ "crea el home"
- ✅ "haz el home"
- ✅ "implementa el home"
- ✅ "crea la página"
- ✅ "haz la interfaz"

---

## ⛔⛔⛔ BLOQUEO TOTAL - NO PROCEDER ⛔⛔⛔

**SI DETECTAS CUALQUIER TRIGGER, DEBES DETENER TODO INMEDIATAMENTE Y SEGUIR ESTE PROCESO EXACTO:**

### 🛑 PASO 1: DETENER TODO
- ❌ NO usar herramientas de escritura/edición
- ❌ NO buscar archivos
- ❌ NO leer código
- ❌ NO hacer NADA hasta completar los pasos siguientes

### 📖 PASO 2: LEER GUÍAS OBLIGATORIAS (EN ORDEN)
1. **📖 LEER:** `.cursor/rules/02-bloqueo-imagen.md` - ⚠️ OBLIGATORIO
2. **📖 LEER:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md` - ⚠️ OBLIGATORIO
3. **📖 LEER:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md` - ⚠️ OBLIGATORIO
4. **📖 LEER:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` - ⚠️ OBLIGATORIO
5. **📖 LEER:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO
6. **📖 LEER:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` - ⚠️ OBLIGATORIO
7. **📖 LEER:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` - ⚠️ OBLIGATORIO si hay DataTable
8. **📖 LEER:** `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` - ⚠️ OBLIGATORIO si hay DataTable
9. **📖 LEER:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` - ⚠️ OBLIGATORIO si agregas elementos a `.content-area`

### 🔍 PASO 3: IDENTIFICAR TEMPLATE EXISTENTE
- ✅ Usar `list_dir()` para buscar en `prototypes/`
- ❌ NO usar `read_file()` todavía para templates
- ✅ Identificar el template correcto

### 📋 PASO 4: ANALIZAR LA IMAGEN DETALLADAMENTE
**⚠️ CRÍTICO PRIMERO: Verificar componentes existentes del template:**
- Sidebar (barra lateral izquierda) - Ya existe, NO implementar
- Header (barra superior) - Ya existe, NO implementar
- SubNav (barra horizontal debajo del header) - Ya existe, NO implementar
- TabBar (barra inferior móvil) - Ya existe si es móvil, NO implementar

**Luego analizar:**
- Componentes UBITS a implementar (Tabs, DataTable, etc.)
- **Iconos con variaciones** (usar `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md`)
- **Estructura visual** (contenedores, IDs)
- **Spacing identificado** (usar `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`):
  - ⚠️ **🚨 CRÍTICO: NO asumir basándose en ejemplos anteriores**
  - ⚠️ **🚨 ERROR COMÚN: NO asumir que SubNav y Tabs están pegados (0px) - MEDIR en la imagen**
  - ⚠️ **Medir visualmente cada espacio entre elementos en la imagen actual**
  - ⚠️ **Documentar la medida visual específica (ej: "16px medido visualmente")**
  - ⚠️ **Comparar spacing medido con tokens disponibles antes de documentar**
- **Funcionalidades del DataTable** (si hay DataTable, usar `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md`):
  - ⚠️ **🚨 CRÍTICO: Consultar Storybook para ver TODAS las funcionalidades disponibles**
  - ⚠️ **🚨 CRÍTICO: Listar TODAS las funcionalidades con SÍ/NO para cada una**
  - ⚠️ **🚨 CRÍTICO: NO asumir funcionalidades sin verificar en la imagen**
  - ⚠️ **🚨 CRÍTICO: NO implementar funcionalidades que NO están en la imagen**

### 📝 PASO 5: MOSTRAR ANÁLISIS COMPLETO
- ✅ Mostrar análisis en el formato obligatorio (ver `.cursor/rules/02-bloqueo-imagen.md`)
- ✅ Incluir verificación de HeaderSection
- ✅ Incluir plan de implementación
- ✅ ESPERAR aprobación explícita del usuario

### ✅ PASO 6: SOLO DESPUÉS DE APROBACIÓN
- ✅ Implementar UNA tarea a la vez
- ✅ Validar después de cada tarea
- ✅ Pedir aprobación antes de continuar

---

## 🚫 HERRAMIENTAS PROHIBIDAS ANTES DEL ANÁLISIS

**❌ PROHIBIDO ABSOLUTO:**
- `write()` - BLOQUEADO
- `search_replace()` - BLOQUEADO
- `read_file()` para templates HTML - BLOQUEADO (solo para guías)
- Cualquier herramienta que modifique archivos - BLOQUEADO

**✅ PERMITIDO SOLO:**
- `read_file()` para leer guías
- `list_dir()` para identificar templates
- `grep()` para buscar en guías
- Mostrar análisis al usuario

---

## 🔗 Referencias

- **Bloqueo:** `.cursor/rules/02-bloqueo-imagen.md`
- **Reglas de implementación:** `.cursor/rules/04-implementacion.md`
- **Guía crear desde imagen:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`


