# 📋 Pendientes de Autoframe

## 🎨 Tokens de Diseño

### ✅ Actualización de Valores de Tokens (COMPLETADO)
**Fecha:** Noviembre 2024
**Estado:** ✅ Completado

- Comparación completa de tokens de Figma vs Proyecto
- Actualización de valores hex de tokens críticos
- Documentación: `COMPARACION_TOKENS_FINAL.md`
- Análisis de opciones: `ANALISIS_OPCIONES_TOKENS.md`

---

### 🔄 Rehacer Estructura de Tokens con Estructura de Figma (PENDIENTE)
**Prioridad:** Media
**Tiempo estimado:** 2-3 semanas
**Riesgo:** Alto

#### 📊 Contexto

Actualmente los tokens están en estructura plana:
```json
{
  "light": {
    "brand": {
      "ubits-accent-brand": "#0c5bef"
    }
  }
}
```

Figma usa estructura semántica con referencias:
```json
{
  "color": {
    "light": {
      "accent": {
        "brand": {
          "$type": "color",
          "$value": "{pec.blue.44}"
        }
      }
    }
  }
}
```

#### ⚠️ Impacto

**Archivos afectados:**
- 41 archivos de componentes que usan `var(--ubits-*)`
- 313 referencias a tokens en código
- Sistema de validación (`.ubits/validation-rules.md`)
- Storybook y todos los stories
- Sistema `TokensAddon` y `TokensManager`

**Cambios necesarios:**
1. Actualizar todos los nombres de tokens:
   - `var(--ubits-accent-brand)` → `var(--color-light-accent-brand)`
   - `var(--ubits-fg-1-high)` → `var(--color-light-fg-1-high)`
   - etc.

2. Refactorizar sistema de validación:
   - Actualizar `.ubits/validation-rules.md`
   - Actualizar `.ubits/component-inventory.json`
   - Actualizar scripts de validación

3. Actualizar sistema de tokens:
   - Refactorizar `TokensAddon.ts`
   - Actualizar `TokensManager.ts`
   - Actualizar build de tokens CSS

4. Testing exhaustivo:
   - Verificar todos los componentes
   - Verificar Storybook
   - Verificar validación
   - Testing visual completo

#### 📝 Plan de Implementación

**Fase 1: Preparación (3-4 días)**
- [ ] Crear sistema de migración automática
- [ ] Script para convertir nombres antiguos → nuevos
- [ ] Sistema de compatibilidad temporal (ambos formatos)
- [ ] Documentar proceso de migración

**Fase 2: Actualizar Core de Tokens (2-3 días)**
- [ ] Reestructurar `tokens.json` con formato Figma
- [ ] Implementar resolución de referencias (`{pec.blue.44}`)
- [ ] Actualizar build de tokens CSS
- [ ] Generar variables CSS con nuevos nombres

**Fase 3: Sistema de Compatibilidad (2-3 días)**
- [ ] Crear mapeo de nombres antiguos → nuevos
- [ ] Sistema que soporte ambos formatos temporalmente
- [ ] Deprecar nombres antiguos con warnings

**Fase 4: Migración Gradual (5-7 días)**
- [ ] Actualizar componentes por categoría (botones, inputs, etc.)
- [ ] Actualizar sistema de validación
- [ ] Actualizar Storybook
- [ ] Testing después de cada categoría

**Fase 5: Limpieza (1-2 días)**
- [ ] Remover sistema de compatibilidad
- [ ] Actualizar documentación
- [ ] Testing final completo

#### 🔍 Investigación Realizada

**Archivos de análisis:**
- `COMPARACION_TOKENS_FINAL.md` - Comparación detallada hex por hex
- `ANALISIS_OPCIONES_TOKENS.md` - Análisis de opciones
- `ANALISIS_TOKENS_COMPARACION_COMPLETA.md` - Análisis completo
- `scripts/compare-tokens-by-hex.py` - Script de comparación

**Hallazgos:**
- 83 tokens de Figma resueltos (de 162 totales)
- 85 coincidencias exactas (mismo hex + nombre similar)
- 66 tokens que necesitan actualización
- 1 token faltante (`dark.bg.5`)

**Estructura de Figma:**
- `p-colors/Mode 1.json` - Valores base (pec.blue.44, pec.gray.24, etc.)
- `s-colors/Light Mode.json` - Tokens semánticos con referencias
- `s-colors/Dark Mode.json` - Tokens semánticos dark mode
- Sistema de referencias: `{color.light.accent.brand}` → `{pec.blue.44}` → `#0c5bef`

**Tokens críticos identificados:**
- Brand: `ubits-accent-brand` = `#0c5bef` ✅ (ya correcto)
- Foreground: `ubits-fg-1-high` = `#303a47` ✅ (ya correcto)
- Background: `ubits-bg-1` = `#ffffff` ✅ (ya correcto)
- Border: `ubits-border-1` = `#d0d2d5` ✅ (ya correcto)

**Tokens que necesitan revisión manual:**
- Algunos valores de feedback parecen referencias no resueltas
- Tokens de borders coloreados tienen valores muy oscuros en Figma
- Tokens de chart tienen valores diferentes

#### 💡 Recomendación

**NO hacer ahora** - Actualizar solo valores es suficiente por ahora.

**Considerar rehacer cuando:**
- Tengas 2-3 semanas dedicadas
- Puedas hacer testing exhaustivo
- El equipo esté alineado
- Tengas un plan de migración gradual
- Necesites sincronización 100% con Figma

#### 📚 Referencias

- Estructura de tokens de Figma: `/Users/elkinmac/Desktop/tokens/`
- Tokens del proyecto: `packages/tokens/tokens.json`
- Scripts de comparación: `scripts/compare-tokens-by-hex.py`
- Documentación: Ver archivos de análisis en raíz del proyecto

---

## 🚀 Otras Tareas Pendientes

### Autoframe Hub
- Ver `ESTADO-GENERAL-AUTOFRAME-HUB.md` para estado completo
- Ver `docs/PLAN-IMPLEMENTACION-AUTOFRAME-HUB.md` para plan detallado

### Componentes
- Ver `.ubits/component-inventory.json` para inventario completo

