# 🔄 Guía de Migración de Reglas - Autorun

**Fecha:** 2025-01-03  
**Objetivo:** Mapeo completo de archivos antiguos a nuevos

---

## 📋 Mapeo de Archivos

### Archivos Deprecados → Nuevos

| Archivo Antiguo (Deprecado) | Archivo Nuevo | Notas |
|------------------------------|---------------|-------|
| `AUTO-DETECT-IMAGES.md` | `.cursor/rules/01-deteccion-imagen.md` | Consolidado y mejorado |
| `BLOQUEO-IMAGEN.md` | `.cursor/rules/02-bloqueo-imagen.md` | Consolidado y mejorado |
| `VERIFICACION-IMAGEN.md` | `.cursor/rules/01-deteccion-imagen.md` | Contenido fusionado |
| `.cursor/CHECK-INICIAL-OBLIGATORIO.md` | `.cursor/rules/00-inicio.md` | Consolidado |
| `.cursor/DETECCION-IMAGEN.md` | `.cursor/rules/01-deteccion-imagen.md` | Duplicado eliminado |
| `.cursor/REGLAS-COMPONENTES.md` | `.cursor/rules/03-componentes.md` | Ya existía, mantener referencia |
| `.cursor/REGLAS-IMPLEMENTACION.md` | `.cursor/rules/04-implementacion.md` | Ya existía, mantener referencia |
| `.cursor/ERRORES-COMUNES.md` | `.cursor/rules/05-errores.md` | Ya existía, mantener referencia |

---

## 📁 Estructura Nueva

### Archivos Principales
- **`.cursorrules`** - Índice principal (simplificado, máx 200 líneas)
- **`QUICK-REFERENCE.md`** - ⭐ NUEVO: Referencia rápida (máx 50 líneas)

### Archivos en `.cursor/rules/`
- **`index.md`** - Índice de reglas
- **`00-inicio.md`** - Verificación inicial obligatoria
- **`01-deteccion-imagen.md`** - Detección de imágenes
- **`02-bloqueo-imagen.md`** - Bloqueo para imágenes
- **`03-componentes.md`** - Reglas de componentes UBITS
- **`04-implementacion.md`** - Reglas de implementación
- **`05-errores.md`** - Errores comunes
- **`06-implementacion-automatica.md`** - Implementación automática

---

## 🔄 Cómo Migrar Referencias

### En Código
Si encuentras referencias a archivos antiguos, actualizar a:

```markdown
# ANTES
- `AUTO-DETECT-IMAGES.md`
- `BLOQUEO-IMAGEN.md`
- `.cursor/CHECK-INICIAL-OBLIGATORIO.md`

# DESPUÉS
- `.cursor/rules/01-deteccion-imagen.md`
- `.cursor/rules/02-bloqueo-imagen.md`
- `.cursor/rules/00-inicio.md`
```

### En Documentación
Actualizar todas las referencias en:
- `docs/` - Guías y documentación
- `.cursorrules` - Reglas principales
- `README.md` - Documentación principal

---

## ⚠️ Archivos Mantenidos Temporalmente

Los siguientes archivos se mantienen por compatibilidad pero están marcados como deprecados:
- `AUTO-DETECT-IMAGES.md` - Tiene nota de deprecación al inicio
- `BLOQUEO-IMAGEN.md` - Tiene nota de deprecación al inicio
- `VERIFICACION-IMAGEN.md` - Tiene nota de deprecación al inicio
- `.cursor/CHECK-INICIAL-OBLIGATORIO.md` - Tiene nota de deprecación al inicio
- `.cursor/DETECCION-IMAGEN.md` - Tiene nota de deprecación al inicio

**Plan:** Eliminar estos archivos después de verificar que todas las referencias están actualizadas.

---

## ✅ Checklist de Migración

- [x] Crear estructura nueva en `.cursor/rules/`
- [x] Consolidar contenido de archivos duplicados
- [x] Marcar archivos antiguos como deprecados
- [x] Crear `QUICK-REFERENCE.md`
- [ ] Actualizar todas las referencias en documentación
- [ ] Simplificar `.cursorrules` (reducir a máx 200 líneas)
- [ ] Verificar que nada se perdió en la consolidación
- [ ] Eliminar archivos deprecados (después de verificar referencias)

---

## 📝 Notas

- Los archivos deprecados tienen una nota clara al inicio indicando el nuevo archivo
- Se mantienen temporalmente para evitar errores en referencias antiguas
- El objetivo es eliminar todos los archivos deprecados después de actualizar referencias

---

**Última actualización:** 2025-01-03




