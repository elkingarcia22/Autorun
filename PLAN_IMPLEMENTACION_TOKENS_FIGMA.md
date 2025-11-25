# 🚀 Plan de Implementación: Tokens de Figma en Storybook

## ✅ Estado Actual

### Completado:
1. ✅ Script de conversión de tokens de Figma (`scripts/convert-figma-to-css-vars.cjs`)
2. ✅ Generación de `figma-tokens.json` con estructura preservada
3. ✅ Generación de `figma-tokens.css` con variables CSS
4. ✅ Integración en `build-css.cjs` para generar ambos sets
5. ✅ Archivos movidos a ubicación correcta

### Archivos Generados:
- `packages/tokens/figma-tokens.json` - Estructura completa de Figma preservada
- `packages/tokens/dist/figma-tokens.css` - Variables CSS de Figma

---

## 📋 Próximos Pasos

### Fase 1: Visualización en Storybook (1-2 días)

#### 1.1 Crear Story de Tokens de Figma
- [ ] Crear `packages/docs-site/stories/TokensFigma.stories.ts`
- [ ] Mostrar tokens agrupados por categoría (color, feedback, chart, etc.)
- [ ] Mostrar estructura preservada (paths, descripciones)
- [ ] Comparación visual con tokens actuales

#### 1.2 Actualizar Storybook Preview
- [ ] Cargar `figma-tokens.css` en Storybook
- [ ] Asegurar que ambos sets de tokens estén disponibles
- [ ] Crear toggle para mostrar/ocultar tokens de Figma

#### 1.3 Documentación en Storybook
- [ ] Crear página de documentación de tokens de Figma
- [ ] Explicar estructura y nomenclatura
- [ ] Guía de uso de tokens de Figma

---

### Fase 2: Mapeo de Tokens (2-3 días)

#### 2.1 Crear Script de Mapeo
- [ ] Script que mapea tokens antiguos → nuevos
- [ ] Generar `TOKENS_MAPPING.md` con equivalencias
- [ ] Identificar tokens sin equivalente

#### 2.2 Análisis de Uso
- [ ] Identificar qué componentes usan qué tokens
- [ ] Priorizar componentes para migración
- [ ] Crear lista de componentes por prioridad

---

### Fase 3: Migración Gradual (2-4 semanas)

#### 3.1 Migración Componente por Componente
- [ ] Empezar con componentes menos críticos
- [ ] Migrar un componente completo a la vez
- [ ] Testing visual después de cada migración
- [ ] Documentar cambios

#### 3.2 Estrategia de Migración
1. **Componentes de baja prioridad** (ej: badges, chips)
2. **Componentes de media prioridad** (ej: inputs, buttons)
3. **Componentes de alta prioridad** (ej: sidebar, navigation)

---

### Fase 4: Limpieza Final (1-2 días)

#### 4.1 Verificación
- [ ] Verificar que todos los componentes usen tokens nuevos
- [ ] Buscar referencias a tokens antiguos
- [ ] Testing completo

#### 4.2 Eliminación
- [ ] Eliminar tokens antiguos de `tokens.json`
- [ ] Actualizar documentación
- [ ] Actualizar validación

---

## 🎯 Comandos Útiles

### Generar tokens de Figma:
```bash
node scripts/convert-figma-to-css-vars.cjs
```

### Generar todos los tokens (UBITS + Figma):
```bash
node packages/tokens/build-css.cjs
```

### Ver tokens generados:
```bash
# Tokens UBITS actuales
cat packages/tokens/dist/tokens.css

# Tokens de Figma
cat packages/tokens/dist/figma-tokens.css
```

---

## 📊 Estructura de Tokens de Figma

### Ejemplo de Token:
```json
{
  "light": {
    "color": {
      "feedback": {
        "chart": {
          "success": {
            "subtle": {
              "$type": "color",
              "$value": "#56ce51",
              "$description": "Use it for the subtle success background...",
              "$path": "color.feedback.chart.success.subtle",
              "$cssVar": "--feedback-chart-success-subtle"
            }
          }
        }
      }
    }
  }
}
```

### CSS Variable Generada:
```css
--feedback-chart-success-subtle: #56ce51;
```

---

## ✅ Checklist de Validación

- [ ] Tokens de Figma visibles en Storybook
- [ ] Estructura preservada correctamente
- [ ] Nomenclatura clara y consistente
- [ ] Valores resueltos correctamente
- [ ] Ambos sets de tokens disponibles
- [ ] Documentación completa
- [ ] Guía de migración creada

---

## 🚨 Notas Importantes

1. **No eliminar tokens antiguos** hasta que todos los componentes estén migrados
2. **Migrar gradualmente** para evitar romper producción
3. **Testing visual** después de cada migración
4. **Documentar todo** para facilitar mantenimiento futuro

