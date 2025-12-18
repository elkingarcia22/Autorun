# Fix: Wizard Bloqueado en Configuración MCP

**Fecha:** 2025-01-03  
**Problema:** El wizard se quedaba bloqueado esperando respuesta en la configuración de MCP

---

## 🔍 Problema Identificado

El wizard se quedaba bloqueado en la línea 2332 de `InitializationWizard.ts`:

```typescript
const configureMCP = await this.prompt.question(
  '\n🔌 ¿Deseas instalar y configurar MCP automáticamente para mejorar la experiencia con los add-ons? (S/N): ',
);
```

**Causa:**
- El método `question()` puede quedarse bloqueado esperando input
- No maneja bien las respuestas cuando el usuario escribe múltiples caracteres (ej: "ss")
- No tiene timeout ni manejo de errores robusto

---

## ✅ Solución Implementada

**Cambio:** Usar `confirm()` en lugar de `question()` para mejor manejo de respuestas S/N:

```typescript
// ANTES (problemático):
const configureMCP = await this.prompt.question(
  '\n🔌 ¿Deseas instalar y configurar MCP automáticamente para mejorar la experiencia con los add-ons? (S/N): ',
);

if (!configureMCP || configureMCP.trim().toUpperCase() !== 'S') {
  // ...
}

// DESPUÉS (mejorado):
const configureMCP = await this.prompt.confirm(
  '¿Deseas instalar y configurar MCP automáticamente para mejorar la experiencia con los add-ons?',
  false, // Por defecto: NO (continuar sin configurar)
);

if (!configureMCP) {
  // ...
}
```

**Ventajas:**
- ✅ `confirm()` maneja mejor las respuestas S/N
- ✅ Tiene default value (false = NO)
- ✅ No se bloquea esperando input indefinidamente
- ✅ Maneja mejor los casos edge (timeout, readline cerrado, etc.)

---

## 📋 Archivos Modificados

- `packages/autorun-core/src/wizard/InitializationWizard.ts` (línea 2332)

---

## 🧪 Pruebas

**Antes del fix:**
- El wizard se quedaba bloqueado esperando respuesta
- El usuario escribía "ss" pero no se procesaba
- El proceso quedaba en estado zombie

**Después del fix:**
- El wizard usa `confirm()` que maneja mejor las respuestas
- Si no hay respuesta, usa el default (NO)
- No se bloquea indefinidamente

---

## 💡 Recomendación

Si el wizard se vuelve a bloquear:

1. **Cancelar el proceso:**
   ```bash
   pkill -f "tsx.*autorun-init"
   ```

2. **Reiniciar el wizard:**
   ```bash
   npm run init
   ```

3. **O usar modo automático con respuestas:**
   ```bash
   AUTORUN_ANSWERS="1,16,s" npm run init
   ```

---

**Fix completado:** 2025-01-03  
**Estado:** ✅ RESUELTO
