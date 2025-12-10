# 🚨 Detección Automática de Imágenes

> ⚠️ **DEPRECADO:** Este archivo ha sido consolidado en `.cursor/rules/01-deteccion-imagen.md`  
> **Por favor, usa:** `.cursor/rules/01-deteccion-imagen.md` en su lugar  
> **Fecha de deprecación:** 2025-01-03

---

> **⚠️ CRÍTICO:** Este archivo debe leerse cuando se detecta una imagen o solicitud de creación desde imagen.

---

## 🔍 TRIGGERS DE DETECCIÓN

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
- ✅ Cualquier combinación de "crear" + "imagen"

### 3. **Detección de Solicitudes:**
- ✅ "crea el home"
- ✅ "haz el home"
- ✅ "implementa el home"
- ✅ "crea la página"

---

## ⛔⛔⛔ BLOQUEO TOTAL - NO PROCEDER ⛔⛔⛔

**SI DETECTAS CUALQUIER TRIGGER, DEBES DETENER TODO INMEDIATAMENTE Y SEGUIR ESTE PROCESO EXACTO:**

1. **🛑 DETENER** - NO usar ninguna herramienta de escritura/edición
2. **📖 LEER PRIMERO:** `AUTO-DETECT-IMAGES.md` usando `read_file()` - ⚠️ OBLIGATORIO
3. **📖 LEER SEGUNDO:** `VERIFICACION-IMAGEN.md` usando `read_file()` - ⚠️ OBLIGATORIO
4. **📖 LEER TERCERO:** `BLOQUEO-IMAGEN.md` usando `read_file()`
5. **📖 LEER CUARTO:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md` usando `read_file()` - ⚠️ OBLIGATORIO
6. **📖 LEER QUINTO:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md` usando `read_file()` - ⚠️ OBLIGATORIO
7. **📖 LEER SEXTO:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` usando `read_file()` - ⚠️ OBLIGATORIO para spacing
8. **📖 LEER SÉPTIMO:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` usando `read_file()` - ⚠️ OBLIGATORIO para iconos
9. **📖 LEER OCTAVO:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` usando `read_file()` - ⚠️ OBLIGATORIO si agregas elementos a `.content-area`
10. **🔍 IDENTIFICAR** template existente usando `list_dir()` (NO `read_file()` todavía)
11. **📋 ANALIZAR** la imagen detalladamente
12. **📝 MOSTRAR** el análisis completo al usuario en el formato obligatorio
13. **⏸️ ESPERAR** aprobación explícita del usuario
14. **✅ SOLO DESPUÉS** de aprobación, implementar UNA tarea a la vez

---

## 🚫 HERRAMIENTAS PROHIBIDAS ANTES DEL ANÁLISIS

**❌ PROHIBIDO ABSOLUTO:**
- `write()` - BLOQUEADO
- `search_replace()` - BLOQUEADO
- `read_file()` para templates HTML - BLOQUEADO (solo para guías)
- Cualquier herramienta que modifique archivos - BLOQUEADO

**✅ PERMITIDO SOLO:**
- `read_file()` para leer guías (`BLOQUEO-IMAGEN.md`, etc.)
- `list_dir()` para identificar templates
- `grep()` para buscar en guías
- Mostrar análisis al usuario

---

## ⚠️ VERIFICACIÓN OBLIGATORIA

**ANTES de usar CUALQUIER herramienta de escritura/edición, PREGÚNTATE:**
- ¿He leído `BLOQUEO-IMAGEN.md`? → Si NO, LEERLO PRIMERO
- ¿He mostrado el análisis completo al usuario? → Si NO, MOSTRARLO PRIMERO
- ¿El usuario ha aprobado explícitamente? → Si NO, ESPERAR APROBACIÓN

**SI LA RESPUESTA ES "NO" A CUALQUIERA → DETENER Y COMPLETAR EL PASO FALTANTE**

---

## 📋 FORMATO OBLIGATORIO PARA MOSTRAR ANÁLISIS

Ver: `BLOQUEO-IMAGEN.md` para el formato completo del análisis.

---

**Ver también:**
- `AUTO-DETECT-IMAGES.md` - Sistema completo de detección
- `VERIFICACION-IMAGEN.md` - Verificación obligatoria
- `BLOQUEO-IMAGEN.md` - Bloqueo absoluto y formato de análisis

