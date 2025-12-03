# 🚨 VERIFICACIÓN OBLIGATORIA: IMAGEN DETECTADA 🚨

## ⚠️⚠️⚠️ ESTE ARCHIVO DEBE SER LEÍDO PRIMERO ⚠️⚠️⚠️

**SI ESTÁS LEYENDO ESTO, SIGNIFICA QUE SE DETECTÓ UNA IMAGEN O SOLICITUD DE CREAR DESDE IMAGEN.**

### 🛑 PASO 1: DETENER TODO

**NO usar ninguna herramienta todavía. Solo leer este archivo y los siguientes:**

1. ✅ Leer este archivo (`VERIFICACION-IMAGEN.md`)
2. ✅ Leer `BLOQUEO-IMAGEN.md`
3. ✅ Leer `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
4. ✅ Leer `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
5. ✅ Leer `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO para análisis de spacing
6. ✅ Leer `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` - ⚠️ OBLIGATORIO para análisis de iconos

### 🚫 PASO 2: VERIFICAR QUE NO ESTÁS USANDO HERRAMIENTAS PROHIBIDAS

**ANTES de continuar, verifica que NO estás usando:**
- ❌ `write()` - BLOQUEADO
- ❌ `search_replace()` - BLOQUEADO  
- ❌ `read_file()` para templates HTML - BLOQUEADO
- ❌ Cualquier herramienta que modifique archivos - BLOQUEADO

**SOLO puedes usar:**
- ✅ `read_file()` para leer guías
- ✅ `list_dir()` para identificar templates
- ✅ `grep()` para buscar en guías
- ✅ Mostrar análisis al usuario

### 📋 PASO 3: PROCESO OBLIGATORIO

**DEBES seguir este proceso EXACTO:**

1. **Leer todas las guías** (ya listadas arriba)
2. **Identificar template existente** usando `list_dir()` en `prototypes/`
3. **Analizar la imagen** detalladamente:
   - Componentes UBITS identificados
   - **Iconos con variaciones** (usar `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md`)
   - Estructura visual
   - **Spacing identificado** (usar `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`):
     - ⚠️ **NO asumir basándose en ejemplos**
     - ⚠️ **Medir visualmente cada espacio entre elementos**
     - ⚠️ **Comparar con tokens disponibles antes de documentar**
   - Funcionalidades identificadas
4. **Mostrar análisis completo** al usuario en el formato obligatorio
5. **ESPERAR aprobación explícita** del usuario
6. **SOLO DESPUÉS** de aprobación, implementar UNA tarea a la vez

### ❓ VERIFICACIÓN FINAL

**ANTES de usar CUALQUIER herramienta de escritura/edición, responde:**

- [ ] ¿He leído todas las guías? → Si NO, LEERLAS PRIMERO
- [ ] ¿He leído `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`? → Si NO, LEERLA PRIMERO
- [ ] ¿He leído `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md`? → Si NO, LEERLA PRIMERO
- [ ] ¿He leído `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`? → Si NO, LEERLA PRIMERO (si agregas elementos a `.content-area`)
- [ ] ¿He identificado el template existente? → Si NO, IDENTIFICARLO PRIMERO
- [ ] ¿He analizado la imagen detalladamente? → Si NO, ANALIZARLA PRIMERO
- [ ] ¿He medido visualmente cada spacing (NO asumido)? → Si NO, MEDIR PRIMERO
- [ ] ¿He comparado spacing con tokens disponibles? → Si NO, COMPARAR PRIMERO
- [ ] ¿He verificado si necesito interceptar ContentManager antes de agregar elementos? → Si NO, VERIFICAR PRIMERO
- [ ] ¿He mostrado el análisis completo al usuario? → Si NO, MOSTRARLO PRIMERO
- [ ] ¿El usuario ha aprobado explícitamente? → Si NO, ESPERAR APROBACIÓN

**SI CUALQUIERA DE ESTAS RESPUESTAS ES "NO" → DETENER Y COMPLETAR EL PASO FALTANTE**

### ⚠️ RECORDATORIO CRÍTICO

**NO puedes implementar código hasta que:**
1. ✅ Hayas leído todas las guías
2. ✅ Hayas identificado el template existente
3. ✅ Hayas analizado la imagen completamente
4. ✅ Hayas mostrado el análisis al usuario
5. ✅ El usuario haya aprobado explícitamente

**Si implementas sin completar estos pasos, estás violando las reglas del proyecto.**

---

**SIGUIENTE PASO:** Leer `BLOQUEO-IMAGEN.md` ahora mismo.

