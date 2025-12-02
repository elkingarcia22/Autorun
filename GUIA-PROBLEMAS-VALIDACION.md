# 🔍 Guía: Problemas de Validación y Soluciones

## 🚨 Problema: Validador (`npm run lint`) Se Queda Colgado

### **Síntoma:**
- El comando `npm run lint` se ejecuta pero nunca termina
- Se queda colgado procesando archivos
- No muestra errores ni resultados

### **Causa Raíz:**
**Biome check procesando demasiados archivos sin exclusión**

1. **Comando problemático:**
   ```json
   "lint": "biome check ."
   ```

2. **Problema:**
   - `biome check .` procesa **TODOS los archivos** del proyecto
   - Incluye `node_modules/`, `vendor/`, archivos grandes, etc.
   - No tiene exclusión configurada
   - Puede procesar miles de archivos, causando que se quede colgado

3. **Archivos problemáticos:**
   - `prototypes/*.html` (archivos grandes de ~2000 líneas)
   - `vendor/ubits/packages/**` (miles de archivos)
   - `node_modules/**` (si no está en .biomeignore)

### **Solución Implementada:**

#### **1. Archivo `.biomeignore` creado:**
Excluye directorios grandes y archivos generados:
```
node_modules/
vendor/
dist/
prototypes/
coverage/
*.min.js
*.umd.js
```

#### **2. Scripts de lint mejorados:**
```json
"lint": "biome check packages/ scripts/ --skip-errors",
"lint:all": "biome check . --skip-errors",
"lint:file": "biome check",
"lint:prototypes": "biome check prototypes/ --skip-errors"
```

**Uso:**
- `npm run lint` - Lint solo de `packages/` y `scripts/` (rápido)
- `npm run lint:all` - Lint de todo el proyecto (puede ser lento)
- `npm run lint:file <archivo>` - Lint de un archivo específico
- `npm run lint:prototypes` - Lint solo de templates en `prototypes/`

### **Cómo Usar:**

#### **Durante desarrollo (recomendado):**
```bash
# Lint de archivos específicos
npx biome check packages/autorun-core/src/wizard/InitializationWizard.ts

# O usar el script
npm run lint:file packages/autorun-core/src/wizard/InitializationWizard.ts
```

#### **Antes de commit:**
```bash
# Lint rápido (solo código fuente)
npm run lint

# Si necesitas lint de todo (puede ser lento)
npm run lint:all
```

#### **Para templates HTML:**
```bash
# Lint de un template específico
npm run lint:prototypes

# O directamente
npx biome check prototypes/canvas-administrador-encuestas-2025-12-02.html
```

### **Prevención Futura:**

1. ✅ **`.biomeignore` configurado** - Excluye directorios grandes
2. ✅ **Scripts limitados** - `npm run lint` solo procesa código fuente
3. ✅ **Scripts específicos** - Para archivos o directorios específicos
4. ✅ **Flag `--skip-errors`** - Continúa procesando aunque encuentre errores

### **Si el Validador Sigue Colgado:**

1. **Verificar `.biomeignore`:**
   ```bash
   cat .biomeignore
   ```

2. **Usar timeout (si es necesario):**
   ```bash
   timeout 30 npm run lint || echo "TIMEOUT después de 30 segundos"
   ```

3. **Lint de archivo específico:**
   ```bash
   npx biome check <archivo-especifico>
   ```

4. **Verificar qué archivos está procesando:**
   ```bash
   npx biome check . --verbose 2>&1 | head -50
   ```

---

## 🚨 Problema: SubNav No Aparecía (Ya Resuelto)

### **Causa Raíz:**
**Conflicto de interceptores con `Object.defineProperty`**

### **Solución Aplicada:**
**Cambiar de `Object.defineProperty` a `setInterval` polling**

```javascript
// ❌ ANTES (problemático):
Object.defineProperty(window, 'UBITS_ContentManager', {
  set: function(value) { ... },
  get: function() { ... }
});

// ✅ AHORA (correcto):
const checkContentManager = setInterval(() => {
  if (window.UBITS_ContentManager && !window._UBITS_ContentManager_HeaderSection_Intercepted) {
    interceptContentManager();
    clearInterval(checkContentManager);
  }
}, 100);
```

### **Prevención Futura:**
1. **NUNCA usar `Object.defineProperty` para interceptar `UBITS_ContentManager`** si ya hay otro interceptor
2. **SIEMPRE verificar si ya existe un descriptor** antes de crear uno nuevo
3. **PREFERIR polling con `setInterval`** o `MutationObserver` para detectar cuando se crea
4. **Verificar que `UBITS_ContentManager` existe** antes de interceptar métodos

---

## 🚨 Problema: Spacing No Se Aplicó Correctamente

### **Causa Raíz:**
**Valor incorrecto en el CSS existente**

### **Solución:**
**SIEMPRE verificar el CSS existente antes de asumir que está correcto**

1. Leer el archivo completo o al menos la sección relevante
2. Comparar el análisis con el código actual
3. Usar `grep` para buscar valores de spacing antes de cambiar

### **Prevención Futura:**
1. ✅ Leer `GUIA-ANALISIS-ESTRUCTURA-SPACING.md` antes de analizar spacing
2. ✅ Medir visualmente cada spacing (NO asumir)
3. ✅ Verificar CSS existente antes de implementar
4. ✅ Comparar análisis con código actual

---

## 📋 Checklist de Validación

### **Antes de Ejecutar Validación:**
- [ ] Verificar que `.biomeignore` está configurado correctamente
- [ ] Usar `npm run lint` para código fuente (rápido)
- [ ] Usar `npm run lint:file <archivo>` para archivos específicos
- [ ] Usar `npm run lint:prototypes` para templates HTML
- [ ] Evitar `npm run lint:all` a menos que sea necesario

### **Si el Validador Se Cuelga:**
- [ ] Verificar `.biomeignore` incluye `node_modules/`, `vendor/`, etc.
- [ ] Usar `npx biome check <archivo>` para archivos específicos
- [ ] Agregar timeout si es necesario: `timeout 30 npm run lint`
- [ ] Verificar que no hay archivos muy grandes sin excluir

---

## 🔧 Mejoras Implementadas

### **1. Archivo `.biomeignore` creado:**
Excluye:
- `node_modules/`
- `vendor/`
- `dist/`
- `prototypes/`
- `coverage/`
- Archivos minificados
- Archivos UMD

### **2. Scripts de lint mejorados:**
- `lint` - Solo código fuente (rápido)
- `lint:all` - Todo el proyecto (puede ser lento)
- `lint:file` - Archivo específico
- `lint:prototypes` - Solo templates

### **3. Flag `--skip-errors`:**
- Continúa procesando aunque encuentre errores
- Evita que se detenga en el primer error

---

## 📝 Resumen

| Problema | Causa | Solución | Prevención |
|----------|-------|----------|------------|
| **Validador se cuelga** | `biome check .` procesa demasiados archivos | `.biomeignore` + scripts limitados | Usar `npm run lint` (limitado) |
| **SubNav no aparece** | Conflicto de `Object.defineProperty` | Usar `setInterval` polling | Verificar interceptores existentes |
| **Spacing no aplicado** | CSS tenía valor incorrecto | Verificar CSS existente | Leer CSS antes de asumir |

---

**Última actualización:** Diciembre 2024

