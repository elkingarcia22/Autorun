# 📚 Índice de Reglas - Autorun

Este directorio contiene todas las reglas organizadas por tema para trabajar con templates UBITS en Autorun.

---

## 📋 Archivos de Reglas

### 00-inicio.md
**Verificación inicial obligatoria** - Debe leerse primero en cada mensaje
- Detección de triggers de imagen
- Checklist antes de cualquier acción
- Herramientas prohibidas/permitidas

### 01-deteccion-imagen.md
**Detección de imágenes** - Proceso cuando se detecta una imagen
- Triggers de detección
- Proceso de bloqueo
- Guías obligatorias a leer

### 02-bloqueo-imagen.md
**Bloqueo absoluto para imágenes** - Qué hacer cuando hay una imagen
- Herramientas prohibidas
- Proceso obligatorio
- Formato de análisis

### 03-componentes.md
**Reglas de componentes UBITS** - Cómo trabajar con componentes
- Usar solo componentes existentes
- Análisis y formato de iconos
- Tokens UBITS
- Identificación de componentes

### 04-implementacion.md
**Reglas de implementación** - Proceso paso a paso
- Uso obligatorio de MCPs
- Proceso de implementación
- Errores críticos a evitar
- Fases de análisis e implementación
- ⭐ **NUEVO:** Validación de iconos contra análisis (previene errores como usar `clock` en lugar de `chart-pie-simple`)

### 05-errores.md
**Errores comunes** - Lista completa de errores a evitar
- Errores críticos
- Soluciones
- Referencias a guías
- ⭐ **NUEVO:** Error #14 - SubNav desaparece después de crearse (con sistema de restauración automática)

### 06-implementacion-automatica.md
**Implementación automática** - ⭐ Proceso automático para implementar componentes
- Detección automática de componente
- Carga automática de documentación y reglas
- Consulta automática de MCPs y Storybook
- Checklist automático
- Mapeo completo de componentes a documentación

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

## 📖 Cómo Usar

1. **Al inicio de cada mensaje:** Leer `.cursor/rules/00-inicio.md`
2. **Si hay imagen:** Seguir `.cursor/rules/01-deteccion-imagen.md` y `.cursor/rules/02-bloqueo-imagen.md`
3. **Para componentes:** Consultar `.cursor/rules/03-componentes.md`
4. **Para implementación:** Consultar `.cursor/rules/04-implementacion.md`
5. **Para evitar errores:** Consultar `.cursor/rules/05-errores.md`
6. **Para implementación automática:** Consultar `.cursor/rules/06-implementacion-automatica.md` ⭐
6. **Para implementación automática:** Consultar `.cursor/rules/06-implementacion-automatica.md` ⭐

---

**Última actualización:** 2025-12-05


