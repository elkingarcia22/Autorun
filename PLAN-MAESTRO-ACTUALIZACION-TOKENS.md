# 🎯 Plan Maestro: Actualización de Tokens desde Figma

## 📋 Objetivo
Actualizar `packages/tokens/tokens.json` con los valores correctos de Figma (`/Users/elkinmac/Desktop/tokens/`) y asegurar que se refleje correctamente en Storybook, manteniendo la estructura actual del JSON.

## ⚠️ Principios de Seguridad
- ✅ **Pasos pequeños**: Máximo 10-15 tokens por paso
- ✅ **Validación manual**: Después de cada paso, validar visualmente en Storybook
- ✅ **Sin romper nada**: Mantener estructura actual del JSON
- ✅ **Reversibilidad**: Cada paso es un commit separado

---

## 📝 FASE 1: Preparación y Análisis

### PASO 1.1: Crear script de lectura de tokens de Figma
**Objetivo:** Leer y resolver referencias de los JSONs de Figma

**Archivos a crear:**
- `scripts/read-figma-tokens.js` - Script que lee tokens de Figma y resuelve referencias

**Validación manual:**
- [ ] Ejecutar script y verificar que lee correctamente los tokens
- [ ] Verificar que resuelve referencias como `{color.light.accent.brand}` → `#0c5bef`
- [ ] Confirmar que genera un JSON plano con todos los valores hex

**Comando de validación:**
```bash
node scripts/read-figma-tokens.js
```

---

### PASO 1.2: Crear script de comparación
**Objetivo:** Comparar tokens de Figma vs proyecto actual y generar reporte

**Archivos a crear:**
- `scripts/compare-figma-project-tokens.js` - Compara y muestra diferencias

**Validación manual:**
- [ ] Revisar reporte de tokens que necesitan actualización
- [ ] Verificar que identifica correctamente los 66 tokens con diferencias
- [ ] Confirmar que identifica el token faltante `dark.bg.5`

**Comando de validación:**
```bash
node scripts/compare-figma-project-tokens.js > reporte-tokens.md
```

---

## 📝 FASE 2: Actualización Gradual de Tokens

### PASO 2.1: Actualizar tokens críticos (5 tokens)
**Objetivo:** Actualizar los 5 tokens más críticos primero

**Tokens a actualizar:**
1. `light.feedback.accent.success` → `#050804` (actual: `#4ab028`)
2. `dark.feedback.accent.success` → `#050804` (actual: `#4ab028`)
3. `light.feedback.accent.error` → `#0f0504` (actual: `#e9343c`)
4. `dark.feedback.accent.error` → `#0f0504` (actual: `#e9343c`)
5. `dark.border.1` → `#11183e` (actual: `#4f5561`)

**Archivos a modificar:**
- `packages/tokens/tokens.json`

**Proceso:**
1. Abrir `packages/tokens/tokens.json`
2. Buscar cada token y actualizar su valor
3. Guardar archivo
4. Ejecutar build: `cd packages/tokens && node build-css.cjs`
5. Verificar que `dist/tokens.css` se actualizó

**Validación manual:**
- [ ] Verificar en Storybook que los componentes con feedback success/error se ven correctamente
- [ ] Verificar que dark mode border se ve correctamente
- [ ] Revisar que no se rompió nada visualmente

**Comando de validación:**
```bash
cd packages/tokens && node build-css.cjs
# Luego abrir Storybook y revisar visualmente
```

**Commit:**
```bash
git add packages/tokens/tokens.json packages/tokens/dist/tokens.css
git commit -m "feat(tokens): actualizar 5 tokens críticos de feedback y border"
```

---

### PASO 2.2: Actualizar tokens de feedback borders (6 tokens)
**Objetivo:** Actualizar borders de feedback

**Tokens a actualizar:**
1. `light.feedback.border.success` → `#050804` (actual: `#368226`)
2. `dark.feedback.border.success` → `#050804` (actual: `#368226`)
3. `light.feedback.border.error` → `#0f0504` (actual: `#e20d34`)
4. `dark.feedback.border.error` → `#0f0504` (actual: `#e20d34`)
5. `light.feedback.border.warning` → `#0a0703` (actual: `#3a6cda`)
6. `dark.feedback.border.warning` → `#0a0703` (actual: `#3a6cda`)

**Validación manual:**
- [ ] Verificar en Storybook que los borders de feedback se ven correctamente
- [ ] Revisar componentes Alert, Toast con diferentes tipos de feedback

**Commit:**
```bash
git commit -m "feat(tokens): actualizar tokens de feedback borders"
```

---

### PASO 2.3: Actualizar tokens de borders coloreados (10 tokens)
**Objetivo:** Actualizar borders coloreados

**Tokens a actualizar:**
1. `light.border.yellow` → `#090702` (actual: `#c9a916`)
2. `light.border.purple` → `#090610` (actual: `#b59bff`)
3. `light.border.green` → `#050805` (actual: `#25c37a`)
4. `dark.border.purple` → `#090610` (actual: `#6457ff`)
5. `light.border.blue` → `#050710` (actual: `#a2a3fb`)
6. `light.border.pink` → `#0c0609` (actual: `#f08bbe`)
7. `light.border.rose` → `#0b060d` (actual: `#d991e5`)
8. `dark.border.green` → `#050805` (actual: `#1e8251`)
9. `dark.border.blue` → `#050710` (actual: `#3a6cda`)
10. `dark.border.pink` → `#0c0609` (actual: `#bf418a`)

**Validación manual:**
- [ ] Verificar en Storybook que los borders coloreados se ven correctamente
- [ ] Revisar componentes que usan borders coloreados

**Commit:**
```bash
git commit -m "feat(tokens): actualizar tokens de borders coloreados"
```

---

### PASO 2.4: Actualizar tokens de feedback chart (12 tokens)
**Objetivo:** Actualizar tokens de charts de feedback

**Tokens a actualizar:**
1. `light.feedback.chart.success.subtle` → `#b3b4d1` (actual: `#e8f8e4`)
2. `light.feedback.chart.warning.subtle` → `#dddbe9` (actual: `#fff1e0`)
3. `light.feedback.chart.error.subtle` → `#b3b4d1` (actual: `#fff0ee`)
4. `light.feedback.chart.info.subtle` → `#b3b4d1` (actual: `#f3f2ff`)
5. `dark.feedback.chart.success.subtle` → `#6d6da2` (actual: `#e8f8e4`)
6. `dark.feedback.chart.warning.subtle` → `#8987b4` (actual: `#fff1e0`)
7. `dark.feedback.chart.error.subtle` → `#6d6da2` (actual: `#fff0ee`)
8. `dark.feedback.chart.info.subtle` → `#6d6da2` (actual: `#f3f2ff`)
9. `light.feedback.chart.success.bold` → `#8f8cb7` (actual: `#4ab028`)
10. `light.feedback.chart.warning.bold` → `#c6c4db` (actual: `#35250f`)
11. `dark.feedback.chart.success.bold` → `#8f8cb7` (actual: `#4ab028`)
12. `dark.feedback.chart.warning.bold` → `#a6a9ca` (actual: `#35250f`)

**Validación manual:**
- [ ] Verificar en Storybook que los charts se ven correctamente
- [ ] Revisar componentes de gráficos/charts

**Commit:**
```bash
git commit -m "feat(tokens): actualizar tokens de feedback chart"
```

---

### PASO 2.5: Actualizar tokens restantes de feedback (10 tokens)
**Objetivo:** Completar actualización de tokens de feedback

**Tokens a actualizar:**
- Revisar reporte y actualizar los tokens restantes de feedback que falten

**Validación manual:**
- [ ] Verificar en Storybook todos los componentes de feedback
- [ ] Revisar Alert, Toast, Badge con diferentes estados

**Commit:**
```bash
git commit -m "feat(tokens): actualizar tokens restantes de feedback"
```

---

### PASO 2.6: Agregar token faltante dark.bg.5
**Objetivo:** Agregar el token que falta en dark mode

**Token a agregar:**
- `dark.background.ubits-bg-5` → `#7372a6`

**Archivos a modificar:**
- `packages/tokens/tokens.json` - Agregar en la sección `dark.background`

**Validación manual:**
- [ ] Verificar que el token se agregó correctamente
- [ ] Verificar que se genera en `dist/tokens.css` como `--ubits-bg-5: #7372a6;` en `[data-theme="dark"]`
- [ ] Verificar en Storybook que funciona en dark mode

**Commit:**
```bash
git commit -m "feat(tokens): agregar token faltante dark.bg.5"
```

---

## 📝 FASE 3: Validación Final

### PASO 3.1: Validación completa en Storybook
**Objetivo:** Verificar que todos los componentes se ven correctamente

**Checklist de validación:**
- [ ] Abrir Storybook
- [ ] Revisar todos los componentes principales:
  - [ ] Button (todas las variantes)
  - [ ] Input
  - [ ] Alert (success, error, warning, info)
  - [ ] Toast (todos los tipos)
  - [ ] Badge
  - [ ] Card
  - [ ] Sidebar
  - [ ] TabBar
  - [ ] Otros componentes que usen tokens
- [ ] Verificar en modo Light
- [ ] Verificar en modo Dark
- [ ] Verificar que no hay colores rotos o incorrectos

**Comando:**
```bash
npm run storybook
# O el comando que uses para Storybook
```

---

### PASO 3.2: Validación de build
**Objetivo:** Verificar que el build funciona correctamente

**Validación:**
- [ ] Ejecutar `cd packages/tokens && node build-css.cjs`
- [ ] Verificar que `dist/tokens.css` se genera sin errores
- [ ] Verificar que `dist/tokens.js` se genera sin errores
- [ ] Verificar que el CSS tiene todos los tokens actualizados

**Comando:**
```bash
cd packages/tokens && node build-css.cjs
```

---

### PASO 3.3: Validación de código
**Objetivo:** Verificar que no hay errores de validación UBITS

**Validación:**
- [ ] Ejecutar `npm run validate`
- [ ] Verificar que no hay errores relacionados con tokens
- [ ] Si hay errores, corregirlos antes de continuar

**Comando:**
```bash
npm run validate
```

---

## 📝 FASE 4: Documentación y Cierre

### PASO 4.1: Actualizar documentación
**Objetivo:** Documentar los cambios realizados

**Archivos a actualizar:**
- `PENDIENTES_AUTOFRAME.md` - Marcar como completado
- Crear `CHANGELOG-TOKENS.md` con lista de cambios

**Commit:**
```bash
git commit -m "docs: documentar actualización de tokens desde Figma"
```

---

### PASO 4.2: Commit final y push
**Objetivo:** Guardar todos los cambios en GitHub

**Validación:**
- [ ] Verificar que todos los commits están guardados
- [ ] Hacer push a GitHub

**Comando:**
```bash
git push origin fase-1-tokens
```

---

## 🎯 Resumen de Pasos

1. ✅ **PASO 1.1**: Crear script de lectura de tokens de Figma
2. ✅ **PASO 1.2**: Crear script de comparación
3. ✅ **PASO 2.1**: Actualizar 5 tokens críticos
4. ✅ **PASO 2.2**: Actualizar tokens de feedback borders (6 tokens)
5. ✅ **PASO 2.3**: Actualizar tokens de borders coloreados (10 tokens)
6. ✅ **PASO 2.4**: Actualizar tokens de feedback chart (12 tokens)
7. ✅ **PASO 2.5**: Actualizar tokens restantes de feedback (10 tokens)
8. ✅ **PASO 2.6**: Agregar token faltante dark.bg.5
9. ✅ **PASO 3.1**: Validación completa en Storybook
10. ✅ **PASO 3.2**: Validación de build
11. ✅ **PASO 3.3**: Validación de código
12. ✅ **PASO 4.1**: Actualizar documentación
13. ✅ **PASO 4.2**: Commit final y push

---

## ⚠️ Reglas Importantes

1. **NUNCA actualizar más de 15 tokens a la vez**
2. **SIEMPRE validar visualmente en Storybook después de cada paso**
3. **SIEMPRE hacer commit después de cada paso**
4. **SI algo se rompe, revertir el último commit inmediatamente**
5. **MANTENER la estructura actual del JSON (no cambiar nombres de tokens)**

---

## 📚 Referencias

- Tokens de Figma: `/Users/elkinmac/Desktop/tokens/`
- Tokens del proyecto: `packages/tokens/tokens.json`
- CSS generado: `packages/tokens/dist/tokens.css`
- Comparación anterior: `COMPARACION_TOKENS_FINAL.md`

