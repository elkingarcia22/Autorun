# 🚨 Bloqueo Absoluto para Imágenes

## ⚠️⚠️⚠️ LEER ESTO PRIMERO SI HAY UNA IMAGEN ⚠️⚠️⚠️

**SI EL USUARIO ENVÍA UNA IMAGEN O PIDE CREAR/MODIFICAR DESDE IMAGEN:**

---

## 🚫 PROHIBIDO HACER ESTO

- ❌ **NO escribir código JavaScript**
- ❌ **NO modificar archivos HTML**
- ❌ **NO buscar templates**
- ❌ **NO implementar componentes**
- ❌ **NO crear archivos nuevos**
- ❌ **NO reemplazar contenido**
- ❌ **NO hacer NADA hasta completar el análisis**

---

## 🚫 PROHIBIDO USAR ESTAS HERRAMIENTAS ANTES DEL ANÁLISIS

- ❌ **NO usar `write()`** - PROHIBIDO antes de análisis
- ❌ **NO usar `search_replace()`** - PROHIBIDO antes de análisis
- ❌ **NO usar `read_file()` para templates** - PROHIBIDO antes de análisis (solo leer guías)
- ❌ **NO usar ninguna herramienta que modifique archivos** - PROHIBIDO antes de análisis

---

## ✅ SOLO PUEDES USAR

- ✅ `read_file()` para leer guías
- ✅ `list_dir()` para identificar templates existentes
- ✅ `grep()` para buscar referencias en guías
- ✅ Mostrar el análisis completo al usuario

---

## ✅ DEBES HACER ESTO PRIMERO

1. **DETENER TODO INMEDIATAMENTE**
2. **LEER:** `.cursor/rules/01-deteccion-imagen.md` - ⚠️ OBLIGATORIO
3. **LEER:** `docs/guias/analisis/GUIA-ANALISIS-IMAGEN-MEJORADO.md` - ⭐ **NUEVO:** Análisis mejorado con documentación automática
4. **LEER:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md` - ⚠️ OBLIGATORIO
5. **LEER:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md` - ⚠️ OBLIGATORIO
6. **LEER:** `.cursor/rules/06-implementacion-automatica.md` - ⭐ **NUEVO:** Implementación automática con documentación
7. **LEER:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` - ⚠️ OBLIGATORIO
8. **LEER:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO
9. **LEER:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` - ⚠️ OBLIGATORIO
10. **LEER:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` - ⚠️ OBLIGATORIO si hay DataTable
11. **LEER:** `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` - ⚠️ OBLIGATORIO si hay DataTable
12. **LEER:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` - ⚠️ OBLIGATORIO si agregas elementos a `.content-area`
13. **LEER:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md` - ⚠️ OBLIGATORIO si la imagen NO muestra HeaderSection
14. **CONSULTAR:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md` - ⭐ Para identificar componentes
15. **CONSULTAR:** `docs/referencia/componentes/README.md` - ⭐ Para mapear a documentación
15. **IDENTIFICAR** template existente (buscar en `prototypes/`)
16. **ANALIZAR** la imagen detalladamente usando documentación automática (ver formato abajo)
17. **MOSTRAR** análisis completo al usuario (formato obligatorio mejorado)
18. **ESPERAR** aprobación explícita del usuario
19. **SOLO DESPUÉS** de aprobación, implementar UNA tarea a la vez

---

## 📋 FORMATO OBLIGATORIO PARA MOSTRAR ANÁLISIS

Ver el formato completo en: `docs/guias/analisis/GUIA-ANALISIS-IMAGEN-MEJORADO.md` ⭐

**Elementos obligatorios del análisis mejorado:**
- **⚠️ CRÍTICO: Componentes existentes del template verificados PRIMERO:**
  - Sidebar identificado (SÍ/NO) - Ya existe, NO implementar
  - Header identificado (SÍ/NO) - Ya existe, NO implementar
  - SubNav identificado (SÍ/NO) - Ya existe, NO implementar
  - TabBar identificado (SÍ/NO, solo si es móvil) - Ya existe, NO implementar
- Componentes UBITS a implementar identificados (con documentación cargada)
- **Subcomponentes identificados** para cada componente ⭐
- **Subfuncionalidades identificadas** para cada componente ⭐
- **Tipos/variantes identificados** (ej: tipos de columnas) ⭐
- SubNav vs Tabs (verificación obligatoria)
- HeaderSection (verificación obligatoria)
- Iconos identificados (con variaciones)
- Estructura visual
- Spacing identificado (MEDIDO VISUALMENTE)
- DataTable - Verificaciones críticas (si aplica)
- **Props verificadas en documentación** ⭐
- **Elementos NO presentes documentados** (qué NO implementar) ⭐
- Plan de implementación dividido en tareas (una subfuncionalidad por tarea)

---

## ⚠️ CRÍTICO

- **NO implementar** hasta que el usuario apruebe explícitamente
- **MOSTRAR** el análisis completo en el formato obligatorio
- **ESPERAR** respuesta del usuario antes de continuar
- **NO saltarse** ningún paso

**Si implementas sin mostrar el análisis primero, estás violando las reglas del proyecto.**

---

## 🔗 Referencias

- **Detección:** `.cursor/rules/01-deteccion-imagen.md`
- **Análisis mejorado:** `docs/guias/analisis/GUIA-ANALISIS-IMAGEN-MEJORADO.md` ⭐
- **Implementación automática:** `.cursor/rules/06-implementacion-automatica.md` ⭐
- **Guía crear desde imagen:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
- **Proceso implementación:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Eliminar HeaderSection:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md` ⭐ **NUEVO**
- **Documentación componentes:** `docs/referencia/componentes/` ⭐


