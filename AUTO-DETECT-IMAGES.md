# 🚨 SISTEMA DE AUTO-DETECCIÓN DE IMÁGENES 🚨

## ⚠️⚠️⚠️ LEER ESTO PRIMERO EN CADA MENSAJE ⚠️⚠️⚠️

**ESTE ARCHIVO DEBE SER LEÍDO AUTOMÁTICAMENTE AL INICIO DE CADA MENSAJE DEL USUARIO.**

---

## 🔍 TRIGGERS DE DETECCIÓN AUTOMÁTICA

**SI DETECTAS CUALQUIERA DE ESTOS, DEBES LEER LAS GUÍAS OBLIGATORIAS:**

### 1. **Detección de Imagen Directa:**
- ✅ Presencia de `<image_description>` en el mensaje
- ✅ Presencia de `<image>` en el mensaje
- ✅ Presencia de `[imagen]` en el mensaje
- ✅ Cualquier referencia a una imagen adjunta

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

## 🛑 PROCESO OBLIGATORIO AL DETECTAR TRIGGER

**SI DETECTAS CUALQUIER TRIGGER DE ARRIBA:**

### PASO 1: DETENER TODO INMEDIATAMENTE
- ❌ NO usar herramientas de escritura/edición
- ❌ NO buscar archivos
- ❌ NO leer código
- ❌ NO hacer NADA hasta completar los pasos siguientes

### PASO 2: LEER GUÍAS OBLIGATORIAS (EN ORDEN)
1. ✅ **LEER PRIMERO:** `VERIFICACION-IMAGEN.md`
2. ✅ **LEER SEGUNDO:** `BLOQUEO-IMAGEN.md`
3. ✅ **LEER TERCERO:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
4. ✅ **LEER CUARTO:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
5. ✅ **LEER QUINTO:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` - ⚠️ OBLIGATORIO para distinguir SubNav de Tabs
6. ✅ **LEER SEXTO:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO para análisis de spacing
7. ✅ **LEER SÉPTIMO:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` - ⚠️ OBLIGATORIO para análisis de iconos

### PASO 3: VERIFICAR TEMPLATE EXISTENTE
- ✅ Usar `list_dir()` para buscar en `prototypes/`
- ✅ NO usar `read_file()` todavía para templates
- ✅ Identificar el template correcto

### PASO 4: ANALIZAR LA IMAGEN
- ✅ Analizar detalladamente la imagen
- ✅ Identificar componentes UBITS
- ✅ Verificar HeaderSection (¿está o no está?)
- ✅ Identificar iconos con variaciones (usar `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md`)
- ✅ **Analizar estructura y spacing (usar `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`):**
  - ⚠️ **NO asumir basándose en ejemplos**
  - ⚠️ **Medir visualmente cada espacio entre elementos**
  - ⚠️ **Comparar con tokens disponibles antes de documentar**
  - ⚠️ **Verificar cada spacing individualmente**
- ✅ **Verificar ContentManager (usar `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`):**
  - ⚠️ **Si agregas elementos a `.content-area`, DEBES interceptar `updateContent`**
  - ⚠️ **Investigar el código fuente del ContentManager antes de agregar elementos**
  - ⚠️ **Verificar si `updateContent` limpia el contenido (línea 680: `contentArea.innerHTML = ''`)**
  - ⚠️ **Interceptar `updateContent` para preservar elementos personalizados**

### PASO 5: MOSTRAR ANÁLISIS COMPLETO
- ✅ Mostrar análisis en el formato obligatorio
- ✅ Incluir verificación de HeaderSection
- ✅ Incluir plan de implementación
- ✅ ESPERAR aprobación explícita del usuario

### PASO 6: SOLO DESPUÉS DE APROBACIÓN
- ✅ Implementar UNA tarea a la vez
- ✅ Validar después de cada tarea
- ✅ Pedir aprobación antes de continuar

---

## 🔍 EJEMPLOS DE MENSAJES QUE DEBEN ACTIVAR LA DETECCIÓN

### ✅ DEBE ACTIVAR DETECCIÓN:
- "Crea el home de encuestas desde esta imagen [imagen]"
- "Implementa esto desde la imagen"
- "Modifica el template con esta imagen"
- "Crea el home de encuestas" (sin imagen explícita, pero es solicitud de creación)
- "Haz la interfaz de encuestas"
- "Implementa el home"

### ❌ NO ACTIVA DETECCIÓN:
- "¿Cómo funciona el wizard?"
- "Lista los componentes disponibles"
- "Explica cómo usar los tokens"

---

## ⚠️ VERIFICACIÓN PREVIA OBLIGATORIA

**ANTES de usar CUALQUIER herramienta, verificar:**

```javascript
// Pseudocódigo del proceso de verificación
function verificarAntesDeActuar(mensajeUsuario) {
  // 1. Detectar triggers
  const tieneImagen = detectarImagen(mensajeUsuario);
  const tienePalabrasClave = detectarPalabrasClave(mensajeUsuario);
  const esSolicitudCreacion = detectarSolicitudCreacion(mensajeUsuario);
  
  // 2. Si hay trigger, leer guías
  if (tieneImagen || tienePalabrasClave || esSolicitudCreacion) {
    leerGuia('VERIFICACION-IMAGEN.md');
    leerGuia('BLOQUEO-IMAGEN.md');
    leerGuia('docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md');
    leerGuia('docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md');
    
    // 3. NO usar herramientas de escritura todavía
    return 'BLOQUEADO - Leer guías primero';
  }
  
  // 4. Si no hay trigger, continuar normalmente
  return 'CONTINUAR';
}
```

---

## 📋 CHECKLIST DE DETECCIÓN

**Al inicio de CADA mensaje del usuario, verificar:**

- [ ] ¿Hay `<image_description>` en el mensaje?
- [ ] ¿Hay `<image>` en el mensaje?
- [ ] ¿Hay `[imagen]` en el mensaje?
- [ ] ¿Hay palabras clave: "imagen", "crear desde", "home de", etc.?
- [ ] ¿Es una solicitud de creación/modificación?
- [ ] ¿Menciona "crear", "hacer", "implementar" + "home" o "página"?

**Si CUALQUIERA es SÍ:**
- [ ] Leer `VERIFICACION-IMAGEN.md`
- [ ] Leer `BLOQUEO-IMAGEN.md`
- [ ] Leer `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
- [ ] Leer `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- [ ] Leer `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO
- [ ] Leer `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` - ⚠️ OBLIGATORIO
- [ ] Leer `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` - ⚠️ OBLIGATORIO si agregas elementos a `.content-area`
- [ ] NO usar herramientas de escritura todavía
- [ ] Analizar imagen detalladamente
- [ ] **Medir visualmente cada spacing (NO asumir)**
- [ ] **Comparar spacing con tokens disponibles**
- [ ] **Verificar si necesitas interceptar ContentManager antes de agregar elementos**
- [ ] Mostrar análisis completo
- [ ] Esperar aprobación

---

## 🚨 RECORDATORIO CRÍTICO

**SI DETECTAS UN TRIGGER Y NO LEES LAS GUÍAS PRIMERO, ESTÁS VIOLANDO LAS REGLAS DEL PROYECTO.**

**NO puedes:**
- ❌ Usar `write()` antes de leer guías
- ❌ Usar `search_replace()` antes de leer guías
- ❌ Leer templates HTML antes de leer guías
- ❌ Implementar código antes de mostrar análisis

**DEBES:**
- ✅ Leer guías primero
- ✅ Analizar imagen detalladamente
- ✅ Mostrar análisis completo
- ✅ Esperar aprobación explícita
- ✅ Solo después implementar

---

## 🔗 Referencias

- **Verificación:** `VERIFICACION-IMAGEN.md`
- **Bloqueo:** `BLOQUEO-IMAGEN.md`
- **Guía creación:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
- **Proceso:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Reglas:** `.cursorrules`

---

**Este archivo debe ser consultado al inicio de CADA mensaje del usuario para detectar si hay una imagen o solicitud de creación.**

