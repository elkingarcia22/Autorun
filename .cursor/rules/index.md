# 📚 Índice de Reglas - Autorun

Este directorio contiene todas las reglas organizadas por tema para trabajar con templates UBITS en Autorun.

> **💡 Tip:** Para una referencia rápida, ver `QUICK-REFERENCE.md` en la raíz del proyecto.

---

## 📋 Archivos de Reglas

### 🔴 CRÍTICO - Leer Primero

#### 00-inicio.md 🔴 CRÍTICO
**Verificación inicial obligatoria** - ⚠️ **DEBE leerse primero en cada mensaje**
- ✅ Inicialización de AutorunHub
- ✅ Detección de triggers de imagen
- ✅ Checklist antes de cualquier acción
- ✅ Herramientas prohibidas/permitidas

**Cuándo leer:** Al inicio de CADA mensaje  
**Prioridad:** 🔴 CRÍTICO

---

### 🟡 IMPORTANTE - Leer si Aplica

#### 01-deteccion-imagen.md 🟡 IMPORTANTE
**Detección de imágenes** - Proceso cuando se detecta una imagen
- 🔍 Triggers de detección
- 🛑 Proceso de bloqueo
- 📖 Guías obligatorias a leer

**Cuándo leer:** Si detectas imagen o solicitud de creación desde imagen  
**Prioridad:** 🟡 IMPORTANTE (si aplica)

#### 02-bloqueo-imagen.md 🟡 IMPORTANTE
**Bloqueo absoluto para imágenes** - Qué hacer cuando hay una imagen
- 🚫 Herramientas prohibidas
- ✅ Proceso obligatorio
- 📋 Formato de análisis

**Cuándo leer:** Si detectas imagen (después de 01-deteccion-imagen.md)  
**Prioridad:** 🟡 IMPORTANTE (si aplica)

#### 04-implementacion.md 🟡 IMPORTANTE
**Reglas de implementación** - Proceso paso a paso
- 🔌 Uso obligatorio de MCPs
- 📋 Proceso de implementación
- ⚠️ Errores críticos a evitar
- 📊 Fases de análisis e implementación
- ⭐ **NUEVO:** Validación de iconos contra análisis

**Cuándo leer:** Antes de implementar cualquier componente  
**Prioridad:** 🟡 IMPORTANTE

---

### 🟢 REFERENCIA - Consultar cuando Necesites

#### 03-componentes.md 🟢 REFERENCIA
**Reglas de componentes UBITS** - Cómo trabajar con componentes
- ✅ Usar solo componentes existentes
- 🎨 Análisis y formato de iconos
- 🎯 Tokens UBITS
- 🔍 Identificación de componentes

**Cuándo leer:** Al trabajar con componentes UBITS  
**Prioridad:** 🟢 REFERENCIA

#### 05-errores.md 🟢 REFERENCIA
**Errores comunes** - Lista completa de errores a evitar
- ❌ Errores críticos
- ✅ Soluciones
- 📚 Referencias a guías
- ⭐ **NUEVO:** Error #14 - SubNav desaparece después de crearse

**Cuándo leer:** Antes de implementar o cuando encuentres un error  
**Prioridad:** 🟢 REFERENCIA

#### 06-implementacion-automatica.md 🟢 REFERENCIA
**Implementación automática** - ⭐ Proceso automático para implementar componentes
- 🤖 Detección automática de componente
- 📚 Carga automática de documentación y reglas
- 🔌 Consulta automática de MCPs y Storybook
- ✅ Checklist automático
- 🗺️ Mapeo completo de componentes a documentación

**Cuándo leer:** Para entender el proceso automático de implementación  
**Prioridad:** 🟢 REFERENCIA

### 📖 Guías de Análisis Mejoradas
**Ver:** `docs/guias/analisis/GUIA-ANALISIS-IMAGEN-MEJORADO.md` - ⭐ **NUEVO:** Análisis mejorado con documentación automática
- Integra automáticamente documentación de componentes
- Identifica subcomponentes y subfuncionalidades automáticamente
- Usa documentación para verificar props y opciones
- Crea planes de implementación más precisos

---

## 🔗 Referencias Rápidas

- **Documentación:** `docs/README.md`
- **Inicio rápido:** `GETTING-STARTED.md`
- **Catálogo componentes:** `docs/referencia/catalogo-componentes.md`
- **Guías de implementación:** `docs/guias/implementacion/`
- **Guías de análisis:** `docs/guias/analisis/`

---

---

## 📖 Cómo Usar

### Flujo Recomendado

#### 1. Al inicio de CADA mensaje (OBLIGATORIO):
1. ✅ **Leer:** `.cursor/rules/00-inicio.md` - 🔴 CRÍTICO
2. ✅ **Ejecutar:** `npm run autorun:init-hub`
3. ✅ **Verificar:** Estado de AutorunHub

#### 2. Si detectas imagen o solicitud de creación:
1. ✅ **Leer:** `.cursor/rules/01-deteccion-imagen.md` - 🟡 IMPORTANTE
2. ✅ **Leer:** `.cursor/rules/02-bloqueo-imagen.md` - 🟡 IMPORTANTE
3. ✅ **Seguir:** Proceso de bloqueo completo

#### 3. Antes de implementar componente:
1. ✅ **Leer:** `.cursor/rules/04-implementacion.md` - 🟡 IMPORTANTE
2. ✅ **Consultar:** `.cursor/rules/03-componentes.md` - 🟢 REFERENCIA
3. ✅ **Revisar:** `.cursor/rules/05-errores.md` - 🟢 REFERENCIA

#### 4. Para entender implementación automática:
1. ✅ **Leer:** `.cursor/rules/06-implementacion-automatica.md` - 🟢 REFERENCIA

---

## 🔍 Búsqueda Rápida por Tema

### Quiero...
- **Empezar a trabajar:** `.cursor/rules/00-inicio.md` 🔴
- **Detectar si hay imagen:** `.cursor/rules/01-deteccion-imagen.md` 🟡
- **Bloquear implementación por imagen:** `.cursor/rules/02-bloqueo-imagen.md` 🟡
- **Trabajar con componentes:** `.cursor/rules/03-componentes.md` 🟢
- **Implementar algo:** `.cursor/rules/04-implementacion.md` 🟡
- **Evitar errores:** `.cursor/rules/05-errores.md` 🟢
- **Usar implementación automática:** `.cursor/rules/06-implementacion-automatica.md` 🟢

---

## 📊 Tags de Prioridad

- 🔴 **CRÍTICO** - Debe leerse siempre, sin excepción
- 🟡 **IMPORTANTE** - Debe leerse cuando aplica la situación
- 🟢 **REFERENCIA** - Consultar cuando necesites información específica

---

## 🔗 Referencias Rápidas

- **Quick Reference:** `QUICK-REFERENCE.md` - ⭐ Referencia rápida (máx 50 líneas)
- **Reglas principales:** `.cursorrules` - Índice simplificado
- **Documentación:** `docs/README.md`
- **Inicio rápido:** `GETTING-STARTED.md`
- **Catálogo componentes:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- **Guías de implementación:** `docs/guias/implementacion/`
- **Guías de análisis:** `docs/guias/analisis/`

---

**Última actualización:** 2025-01-03


