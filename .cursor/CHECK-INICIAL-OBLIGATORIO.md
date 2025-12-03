# 🚨🚨🚨 VERIFICACIÓN INICIAL OBLIGATORIA 🚨🚨🚨

## ⚠️⚠️⚠️ ESTE ARCHIVO DEBE SER LEÍDO PRIMERO EN CADA MENSAJE ⚠️⚠️⚠️

**SI ESTÁS LEYENDO ESTO, DEBES COMPLETAR ESTA VERIFICACIÓN ANTES DE HACER CUALQUIER COSA.**

---

## 🔍 PASO 1: DETECCIÓN DE TRIGGERS (OBLIGATORIO)

**ANTES de usar CUALQUIER herramienta, verifica si hay triggers de imagen:**

### Verificar en el mensaje del usuario:
- [ ] ¿Hay `<image_description>` en el mensaje?
- [ ] ¿Hay `<image>` en el mensaje?
- [ ] ¿Hay `[imagen]` en el mensaje?
- [ ] ¿Hay palabras clave: "imagen", "crear desde", "home de", "crear home", "implementar desde imagen"?
- [ ] ¿Es una solicitud de creación/modificación?

### Si CUALQUIERA es SÍ → BLOQUEO ACTIVADO

**DEBES:**
1. **DETENER TODO INMEDIATAMENTE**
2. **LEER PRIMERO:** `AUTO-DETECT-IMAGES.md` usando `read_file()`
3. **LEER SEGUNDO:** `VERIFICACION-IMAGEN.md` usando `read_file()`
4. **LEER TERCERO:** `BLOQUEO-IMAGEN.md` usando `read_file()`
5. **LEER CUARTO:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md` usando `read_file()`
6. **LEER QUINTO:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md` usando `read_file()`
7. **LEER SEXTO:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` usando `read_file()` - ⚠️ OBLIGATORIO para distinguir SubNav de Tabs
8. **LEER SÉPTIMO:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` usando `read_file()`
9. **LEER OCTAVO:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` usando `read_file()`
10. **LEER NOVENO:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` usando `read_file()`

**NO puedes usar:**
- ❌ `write()` - BLOQUEADO
- ❌ `search_replace()` - BLOQUEADO
- ❌ `read_file()` para templates HTML - BLOQUEADO
- ❌ Cualquier herramienta que modifique archivos - BLOQUEADO

**SOLO puedes usar:**
- ✅ `read_file()` para leer guías
- ✅ `list_dir()` para identificar templates
- ✅ `grep()` para buscar en guías
- ✅ Mostrar análisis al usuario

---

## 📋 PASO 2: CHECKLIST ANTES DE CUALQUIER ACCIÓN

**ANTES de usar CUALQUIER herramienta de escritura/edición, verifica:**

- [ ] ¿He detectado triggers de imagen? → Si SÍ, leer guías primero
- [ ] ¿He leído `AUTO-DETECT-IMAGES.md`? → Si NO y hay triggers, LEERLO PRIMERO
- [ ] ¿He leído `BLOQUEO-IMAGEN.md`? → Si NO y hay triggers, LEERLO PRIMERO
- [ ] ¿He identificado el template existente? → Si NO y hay triggers, IDENTIFICARLO PRIMERO
- [ ] ¿He analizado la imagen detalladamente? → Si NO y hay triggers, ANALIZARLA PRIMERO
- [ ] ¿He mostrado el análisis completo al usuario? → Si NO y hay triggers, MOSTRARLO PRIMERO
- [ ] ¿El usuario ha aprobado explícitamente? → Si NO y hay triggers, ESPERAR APROBACIÓN

**SI CUALQUIERA ES "NO" Y HAY TRIGGERS → DETENER Y COMPLETAR EL PASO FALTANTE**

---

## 🎯 PROCESO COMPLETO PARA IMÁGENES

**Si detectaste triggers, sigue este proceso EXACTO:**

1. ✅ Leer todas las guías obligatorias (lista arriba)
2. ✅ Identificar template existente usando `list_dir()` en `prototypes/`
3. ✅ Analizar imagen detalladamente:
   - Componentes UBITS identificados
   - HeaderSection (¿está o no está?)
   - Iconos con variaciones
   - Estructura visual
   - Spacing (medir visualmente, NO asumir)
   - Funcionalidades
4. ✅ Mostrar análisis completo al usuario en formato obligatorio
5. ✅ ESPERAR aprobación explícita del usuario
6. ✅ SOLO DESPUÉS de aprobación, implementar UNA tarea a la vez

---

## ⚠️ RECORDATORIO CRÍTICO

**NO puedes implementar código hasta que:**
1. ✅ Hayas leído todas las guías (si hay triggers)
2. ✅ Hayas identificado el template existente (si hay triggers)
3. ✅ Hayas analizado la imagen completamente (si hay triggers)
4. ✅ Hayas mostrado el análisis al usuario (si hay triggers)
5. ✅ El usuario haya aprobado explícitamente (si hay triggers)

**Si implementas sin completar estos pasos, estás violando las reglas del proyecto.**

---

## 🔗 Referencias Rápidas

- **Detección:** `AUTO-DETECT-IMAGES.md`
- **Verificación:** `VERIFICACION-IMAGEN.md`
- **Bloqueo:** `BLOQUEO-IMAGEN.md`
- **Guía creación:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
- **Proceso:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Reglas completas:** `.cursorrules`

---

**SIGUIENTE PASO:** Si detectaste triggers, leer `AUTO-DETECT-IMAGES.md` ahora mismo usando `read_file()`.

