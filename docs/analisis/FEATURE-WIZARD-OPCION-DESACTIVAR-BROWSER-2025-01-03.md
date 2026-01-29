# Feature: Opción para Desactivar Apertura Automática del Browser en el Wizard

**Fecha:** 2025-01-03  
**Estado:** ✅ IMPLEMENTADO

---

## 🎯 Problema

El usuario reportó que cuando inicia Autorun, se activan ciertas herramientas y se abre el template en el browser interno automáticamente desde el wizard. Quería una opción para que el wizard NO abra el browser automáticamente.

---

## ✅ Solución Implementada

Se agregó una nueva pregunta en el wizard que permite al usuario elegir si quiere abrir el browser automáticamente o no.

### **Cambios Realizados:**

1. **Nueva pregunta en el wizard:**
   - Se agregó `askOpenBrowser()` que pregunta al usuario si quiere abrir el browser automáticamente
   - Por defecto: SÍ (abrir automáticamente) para mantener el comportamiento actual
   - Si el usuario dice NO, el wizard no abre el browser pero muestra instrucciones para abrirlo manualmente

2. **Variable de entorno:**
   - Se agregó soporte para `AUTORUN_OPEN_BROWSER` (true/false)
   - Si está configurada, el wizard usa ese valor en lugar de preguntar

3. **Lógica condicional:**
   - El wizard solo abre el browser si `openBrowser === true`
   - Si está desactivado, muestra instrucciones para abrirlo manualmente

---

## 📋 Flujo del Wizard

**Antes:**
```
Wizard → Siempre abre browser automáticamente
```

**Después:**
```
Wizard → Pregunta: "¿Quieres abrir el template en el navegador automáticamente?"
  ├─ SÍ → Abre browser automáticamente (comportamiento por defecto)
  └─ NO → Muestra instrucciones para abrirlo manualmente
```

---

## 🔧 Uso

### **Modo Interactivo:**

El wizard pregunta automáticamente:
```
🌐 Apertura automática del navegador:

   Por defecto, el wizard abre el template en el navegador automáticamente.
   Si desactivas esta opción, puedes abrirlo manualmente después.

¿Quieres abrir el template en el navegador automáticamente? (S/n): 
```

### **Modo Automático (Variable de Entorno):**

```bash
# Desactivar apertura automática del browser
AUTORUN_OPEN_BROWSER=false npm run init

# Activar apertura automática del browser (por defecto)
AUTORUN_OPEN_BROWSER=true npm run init
```

---

## 📝 Archivos Modificados

- `packages/autorun-core/src/wizard/InitializationWizard.ts`:
  - Agregada variable `openBrowser: boolean = true`
  - Agregada función `askOpenBrowser()`
  - Modificada lógica en `setupUBITSFromAnswers()` para respetar `openBrowser`
  - Agregado soporte para variable de entorno `AUTORUN_OPEN_BROWSER`

---

## 💡 Instrucciones Mostradas cuando Browser está Desactivado

Si el usuario desactiva la apertura automática del browser, el wizard muestra:

```
🌐 Apertura automática del navegador desactivada
   💡 Para abrir manualmente, ejecuta:
      npm run autorun:init-hub
   O navega a: http://localhost:3000/[nombre-del-template].html
```

---

## ✅ Beneficios

1. **Control del usuario:** El usuario puede elegir si quiere abrir el browser automáticamente
2. **Comportamiento por defecto:** Mantiene el comportamiento actual (abrir automáticamente) por defecto
3. **Flexibilidad:** Soporta tanto modo interactivo como automático (variable de entorno)
4. **Instrucciones claras:** Si desactiva la apertura automática, muestra instrucciones para abrirlo manualmente

---

**Feature completada:** 2025-01-03  
**Estado:** ✅ LISTO PARA USO
