# 📊 Verificación de Tokens: Storybook vs Figma

**Fecha:** 2025-11-20T02:28:55.593Z

## 📈 Resumen General

### Figma (s-colors)
- **Total tokens:** 22
- **Valores únicos:** 15

### Proyecto (tokens.json)
- **Total tokens:** 534
- **Valores únicos:** 129

### Storybook (tokens.css)
- **Total variables CSS:** 537
- **Valores únicos:** 130

## ⚠️ Tokens de Figma que Faltan o Difieren en el Proyecto

Total: **22**

### Tokens Faltantes (12)

- `light.feedback.chart.success.subtle` → `#56ce51`
- `light.feedback.chart.success.bold` → `#1fa739`
- `light.feedback.chart.info.subtle` → `#abb0fd`
- `light.feedback.chart.info.bold` → `#7d86f8`
- `light.feedback.chart.error.subtle` → `#ff9b8f`
- `light.feedback.chart.error.bold` → `#f16253`
- `light.bg.4` → `#0e0c1d`
- `dark.feedback.chart.success.bold` → `#1fa739`
- `dark.feedback.chart.info.bold` → `#7d86f8`
- `dark.feedback.chart.warning.subtle` → `#c37c14`
- `dark.feedback.chart.error.bold` → `#f16253`
- `dark.bg.4` → `#0e0c1d`

### Tokens con Nombres Diferentes (10)

- Figma: `light.feedback.chart.warning.subtle` ↔ Proyecto: `light.feedbackWarning.ubits-feedback-fg-warning-subtle-alt` → `#ffd4a0`
- Figma: `light.feedback.chart.warning.bold` ↔ Proyecto: `light.feedbackWarning.ubits-feedback-fg-warning-subtle-hover` → `#ffb954`
- Figma: `light.bg.2` ↔ Proyecto: `dark.bordersMain.ubits-border-2` → `#080612`
- Figma: `light.border.2` ↔ Proyecto: `dark.bordersMain.ubits-border-2` → `#080612`
- Figma: `dark.feedback.chart.success.subtle` ↔ Proyecto: `light.feedbackBorders.ubits-feedback-border-success-static-inverted` → `#368226`
- Figma: `dark.feedback.chart.info.subtle` ↔ Proyecto: `light.bordersInverted.ubits-border-indigo-inverted` → `#3a6cda`
- Figma: `dark.feedback.chart.warning.bold` ↔ Proyecto: `light.feedbackBorders.ubits-feedback-border-warning-inverted` → `#ec9907`
- Figma: `dark.feedback.chart.error.subtle` ↔ Proyecto: `light.feedbackBorders.ubits-feedback-border-error-static-inverted` → `#e20d34`
- Figma: `dark.bg.2` ↔ Proyecto: `dark.bordersMain.ubits-border-2` → `#080612`
- Figma: `dark.border.2` ↔ Proyecto: `dark.bordersMain.ubits-border-2` → `#080612`

## ✅ Conclusión

⚠️ **Hay 22 tokens que necesitan actualización.**

**Acción requerida:** Actualizar los tokens del proyecto para que coincidan exactamente con Figma.

### Nota sobre el conteo de 267 colores

Si Storybook muestra 267 colores, esto probablemente se refiere a:
- Los valores únicos de color (sin duplicar light/dark)
- O los tokens de un solo modo (light o dark)

**Valores únicos en proyecto:** 129
**Valores únicos en Figma:** 15
