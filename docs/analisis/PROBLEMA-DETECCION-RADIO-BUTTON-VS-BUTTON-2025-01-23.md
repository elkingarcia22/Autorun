# 🔍 Problema: Detección Incorrecta - Radio Button vs Button

**Fecha:** 2025-01-23  
**Problema:** `autorun.apply()` detectó "Button" en lugar de "Radio Button" cuando el usuario pidió implementar un radio button.

---

## 📋 Resumen del Problema

**Mensaje del usuario:** "implementa un ratio button"  
**Componente detectado:** ❌ `Button` (incorrecto)  
**Componente esperado:** ✅ `RadioButton` (correcto)  
**Resultado:** Se implementaron 3 cards genéricas de "Button" en lugar de un Radio Button

---

## 🔍 Análisis del Flujo de Detección

### **1. Detección en `autoMessageHandler.ts`**

**Archivo:** `packages/autorun-core/src/helpers/autoMessageHandler.ts`

**Patrones de detección actuales:**

```typescript
// Líneas 273-278
Button: [
  /\bbot[oó]n\b/i,
  /\bbutton\b/i,
  /\bbotones?\b/i,
  /(?:implementar|crear|agregar|poner|hacer).*(?:bot[oó]n|button)/i,
],
```

**Problema:** El patrón `/\bbot[oó]n\b/i` coincide con "radio button" porque contiene la palabra "button".

**Orden de evaluación:**
1. El sistema evalúa los patrones en el orden que están definidos
2. Si encuentra una coincidencia, se detiene
3. "Button" se evalúa antes que "RadioButton"
4. Por lo tanto, detecta "Button" primero

---

### **2. Patrones para RadioButton**

**Buscando patrones de RadioButton:**

```typescript
// Necesito buscar si hay patrones específicos para RadioButton
RadioButton: [
  // ¿Existen patrones específicos?
]
```

**Problema:** Si existen patrones para RadioButton, probablemente tienen menor prioridad o no son lo suficientemente específicos.

---

## ❌ Causa Raíz

### **Problema 1: Orden de Evaluación**

Los patrones se evalúan en orden, y "Button" tiene patrones más genéricos que coinciden con "radio button":

- `/\bbot[oó]n\b/i` → Coincide con "radio button" (contiene "button")
- `/\bbutton\b/i` → Coincide con "radio button" (contiene "button")

### **Problema 2: Falta de Especificidad**

Los patrones de "Button" son demasiado genéricos y capturan palabras que contienen "button" incluso cuando están en contexto de otros componentes.

### **Problema 3: Prioridad de Patrones**

Si existen patrones para RadioButton, probablemente tienen menor prioridad que los de Button.

---

## ✅ Solución Propuesta

### **Solución 1: Patrones Más Específicos para RadioButton**

Agregar patrones específicos para RadioButton con **mayor prioridad** que Button:

```typescript
RadioButton: [
  /\bradio\s*button\b/i,           // "radio button" o "radiobutton"
  /\bradio\s*bot[oó]n\b/i,          // "radio botón"
  /\b(?:implementar|crear|agregar).*radio.*button/i,  // "implementar radio button"
  /\b(?:implementar|crear|agregar).*radio.*bot[oó]n/i, // "implementar radio botón"
],
```

**Prioridad:** Evaluar RadioButton ANTES que Button

### **Solución 2: Patrones Negativos para Button**

Modificar los patrones de Button para que NO coincidan con "radio button":

```typescript
Button: [
  /\bbot[oó]n\b(?!\s*radio)/i,      // "botón" pero NO "botón radio"
  /\bbutton\b(?!\s*radio)/i,         // "button" pero NO "button radio"
  /(?:implementar|crear|agregar).*(?:bot[oó]n|button)(?!.*radio)/i,
],
```

### **Solución 3: Orden de Evaluación**

Reordenar los patrones para que componentes más específicos se evalúen primero:

1. RadioButton (más específico)
2. Checkbox (más específico)
3. Button (más genérico)

---

## 🔧 Implementación Recomendada

### **Paso 1: Agregar Patrones Específicos para RadioButton**

**Archivo:** `packages/autorun-core/src/helpers/autoMessageHandler.ts`

```typescript
// Agregar ANTES de Button (mayor prioridad)
RadioButton: [
  /\bradio\s*button\b/i,
  /\bradio\s*bot[oó]n\b/i,
  /\bradiobutton\b/i,
  /(?:implementar|crear|agregar|poner|hacer).*radio.*button/i,
  /(?:implementar|crear|agregar|poner|hacer).*radio.*bot[oó]n/i,
],
```

### **Paso 2: Modificar Patrones de Button**

```typescript
Button: [
  /\bbot[oó]n\b(?!\s*radio)/i,      // Negación lookahead
  /\bbutton\b(?!\s*radio)/i,
  /\bbotones?\b(?!.*radio)/i,
  /(?:implementar|crear|agregar|poner|hacer).*(?:bot[oó]n|button)(?!.*radio)/i,
],
```

### **Paso 3: Verificar Orden de Evaluación**

Asegurar que RadioButton se evalúe antes que Button en el objeto `componentPatterns`.

---

## 📊 Pruebas Necesarias

1. ✅ "implementa un radio button" → Debe detectar RadioButton
2. ✅ "crear un radio botón" → Debe detectar RadioButton
3. ✅ "agregar radiobutton" → Debe detectar RadioButton
4. ✅ "implementar un botón" → Debe detectar Button (no RadioButton)
5. ✅ "crear button" → Debe detectar Button (no RadioButton)

---

## ✅ Conclusión

**Problema identificado:** Los patrones de detección de Button son demasiado genéricos y capturan "radio button" antes de que se evalúen los patrones específicos de RadioButton.

**Solución:** Agregar patrones específicos para RadioButton con mayor prioridad y modificar los patrones de Button para excluir "radio button".

**Próximo paso:** Implementar las correcciones en `autoMessageHandler.ts`.

