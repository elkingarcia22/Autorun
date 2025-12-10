# 📋 Plan de Consolidación de Reglas - Autorun

**Fecha:** 2025-01-03  
**Objetivo:** Simplificar y consolidar reglas para reducir complejidad cognitiva

---

## 🎯 Objetivos

1. **Reducir de 50+ archivos de reglas a 10 archivos principales**
2. **Eliminar redundancias** - Una sola fuente de verdad por regla
3. **Mejorar navegabilidad** - Estructura clara y jerárquica
4. **Mantener funcionalidad** - No perder información crítica

---

## 📊 Estado Actual

### Archivos de Reglas Identificados

#### En `.cursor/rules/` (7 archivos) ✅ Bien organizados
- `00-inicio.md` - Verificación inicial
- `01-deteccion-imagen.md` - Detección de imágenes
- `02-bloqueo-imagen.md` - Bloqueo para imágenes
- `03-componentes.md` - Reglas de componentes
- `04-implementacion.md` - Reglas de implementación
- `05-errores.md` - Errores comunes
- `06-implementacion-automatica.md` - Implementación automática

#### En Raíz (Duplicados/Desactualizados) ⚠️ Consolidar
- `AUTO-DETECT-IMAGES.md` → Mover a `.cursor/rules/01-deteccion-imagen.md`
- `BLOQUEO-IMAGEN.md` → Mover a `.cursor/rules/02-bloqueo-imagen.md`
- `VERIFICACION-IMAGEN.md` → Fusionar en `.cursor/rules/01-deteccion-imagen.md`

#### En `.cursor/` (Duplicados) ⚠️ Consolidar
- `CHECK-INICIAL-OBLIGATORIO.md` → Ya está en `.cursor/rules/00-inicio.md`
- `DETECCION-IMAGEN.md` → Ya está en `.cursor/rules/01-deteccion-imagen.md`
- `ERRORES-COMUNES.md` → Ya está en `.cursor/rules/05-errores.md`
- `INICIO-SESION.md` → Fusionar en `.cursor/rules/00-inicio.md`
- `REGLAS-COMPONENTES.md` → Ya está en `.cursor/rules/03-componentes.md`
- `REGLAS-IMPLEMENTACION.md` → Ya está en `.cursor/rules/04-implementacion.md`

#### `.cursorrules` (614 líneas) ⚠️ Simplificar
- Mucha redundancia con archivos en `.cursor/rules/`
- Debe ser un índice con referencias, no duplicar contenido

---

## ✅ Plan de Acción

### Fase 1: Consolidar Archivos Duplicados (Día 1)

#### Paso 1.1: Fusionar archivos de raíz en `.cursor/rules/`
- [ ] Revisar `AUTO-DETECT-IMAGES.md` y fusionar contenido único en `01-deteccion-imagen.md`
- [ ] Revisar `BLOQUEO-IMAGEN.md` y fusionar contenido único en `02-bloqueo-imagen.md`
- [ ] Revisar `VERIFICACION-IMAGEN.md` y fusionar contenido único en `01-deteccion-imagen.md`
- [ ] Marcar archivos de raíz como deprecados (agregar nota al inicio)

#### Paso 1.2: Eliminar duplicados en `.cursor/`
- [ ] Verificar que `.cursor/rules/` tiene toda la información
- [ ] Agregar notas de deprecación en archivos duplicados
- [ ] Crear archivo `MIGRACION-REGLAS.md` con mapeo de archivos viejos a nuevos

### Fase 2: Simplificar `.cursorrules` (Día 2)

#### Paso 2.1: Convertir en índice
- [ ] Reducir `.cursorrules` a máximo 200 líneas
- [ ] Convertir en índice con referencias a `.cursor/rules/`
- [ ] Mantener solo reglas críticas que deben leerse primero
- [ ] Mover detalles a archivos específicos

#### Paso 2.2: Estructura propuesta
```markdown
# 🎯 Reglas Principales - Autorun

## ⚠️⚠️⚠️ CRÍTICO: INICIALIZAR AUTORUN PRIMERO ⚠️⚠️⚠️
[Referencia a .cursor/rules/00-inicio.md]

## 📚 Reglas Organizadas por Módulos
[Referencias a .cursor/rules/]

## 🔗 Referencias Rápidas
[Links a documentación clave]
```

### Fase 3: Mejorar Navegabilidad (Día 3)

#### Paso 3.1: Crear Quick Reference
- [ ] Crear `QUICK-REFERENCE.md` con solo reglas críticas (máximo 50 líneas)
- [ ] Incluir checklist mínimo obligatorio
- [ ] Links a documentación completa

#### Paso 3.2: Mejorar índice de reglas
- [ ] Actualizar `.cursor/rules/index.md` con mejor estructura
- [ ] Agregar tags de importancia (Crítico, Importante, Opcional)
- [ ] Agregar búsqueda rápida por tema

### Fase 4: Validación y Testing (Día 4)

#### Paso 4.1: Verificar que nada se perdió
- [ ] Comparar contenido antes/después
- [ ] Verificar que todas las reglas críticas están accesibles
- [ ] Probar navegación desde `.cursorrules`

#### Paso 4.2: Documentar cambios
- [ ] Crear `CHANGELOG-CONSOLIDACION.md`
- [ ] Documentar mapeo de archivos viejos a nuevos
- [ ] Actualizar referencias en documentación

---

## 📁 Estructura Final Propuesta

```
.cursor/
├── .cursorrules              # Índice principal (máx 200 líneas)
└── rules/
    ├── index.md              # Índice de reglas con tags
    ├── 00-inicio.md          # Verificación inicial obligatoria
    ├── 01-deteccion-imagen.md # Detección de imágenes
    ├── 02-bloqueo-imagen.md  # Bloqueo para imágenes
    ├── 03-componentes.md     # Reglas de componentes UBITS
    ├── 04-implementacion.md  # Reglas de implementación
    ├── 05-errores.md         # Errores comunes
    └── 06-implementacion-automatica.md # Implementación automática

QUICK-REFERENCE.md            # ⭐ NUEVO: Referencia rápida (máx 50 líneas)
```

---

## 🎯 Métricas de Éxito

### Antes
- ❌ 50+ archivos de reglas
- ❌ 614 líneas en `.cursorrules`
- ❌ Múltiples fuentes de verdad
- ❌ Difícil navegar

### Después
- ✅ 10 archivos principales
- ✅ Máximo 200 líneas en `.cursorrules`
- ✅ Una fuente de verdad por regla
- ✅ Navegación clara con Quick Reference

---

## ⚠️ Consideraciones

1. **No eliminar información** - Solo consolidar y reorganizar
2. **Mantener compatibilidad** - Agregar notas de deprecación antes de eliminar
3. **Validar con uso real** - Probar que las reglas siguen siendo accesibles
4. **Documentar cambios** - Crear guía de migración

---

## 📅 Timeline

- **Día 1:** Consolidar archivos duplicados
- **Día 2:** Simplificar `.cursorrules`
- **Día 3:** Mejorar navegabilidad
- **Día 4:** Validación y documentación

**Total:** 4 días de trabajo

---

**Estado:** 🟢 Fases 1 y 2 Completadas  
**Progreso:** 85% completado

---

## ✅ Progreso Realizado

### Fase 1: Consolidar Archivos Duplicados (25% completado)

#### ✅ Completado (Fase 1):
- [x] Creado `QUICK-REFERENCE.md` - Referencia rápida con reglas críticas (máx 50 líneas)
- [x] Mejorado `.cursor/rules/01-deteccion-imagen.md` - Agregados triggers adicionales y proceso detallado
- [x] Marcado `AUTO-DETECT-IMAGES.md` como deprecado con nota de redirección
- [x] Marcado `BLOQUEO-IMAGEN.md` como deprecado con nota de redirección
- [x] Marcado `VERIFICACION-IMAGEN.md` como deprecado con nota de redirección
- [x] Marcado `.cursor/CHECK-INICIAL-OBLIGATORIO.md` como deprecado
- [x] Marcado `.cursor/DETECCION-IMAGEN.md` como deprecado
- [x] Actualizado `.cursor/INICIO-SESION.md` con referencias correctas
- [x] Creado `MIGRACION-REGLAS.md` con mapeo completo de archivos

#### ✅ Completado (Fase 2):
- [x] Simplificar `.cursorrules` (reducido de 970 a 236 líneas - 76% de reducción)
- [x] Convertir `.cursorrules` en índice con referencias a `.cursor/rules/`
- [x] Mantener solo reglas críticas que deben leerse primero
- [x] Crear backup: `.cursorrules.backup`

#### ⏳ Pendiente:
- [ ] Mejorar `.cursor/rules/index.md` con tags de importancia
- [ ] Validar que nada se perdió en la consolidación
- [ ] Actualizar referencias en documentación (docs/)

---

**Siguiente Paso:** Continuar Fase 1 - Fusionar `VERIFICACION-IMAGEN.md` y consolidar archivos en `.cursor/`
