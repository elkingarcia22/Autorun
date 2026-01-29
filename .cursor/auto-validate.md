# Auto-Validation System

## 🤖 Sistema de Auto-Validación para Cursor AI

Este documento describe cómo Cursor AI debe usar el sistema de validación automática.

## ✅ **OBLIGATORIO: Validar Después de Cada Cambio**

**Después de hacer CUALQUIER cambio en código (TypeScript, JavaScript, HTML, CSS):**

1. ✅ Ejecutar `npm run validate`
2. ✅ Revisar errores críticos
3. ✅ Corregir errores automáticamente cuando sea posible
4. ✅ Reportar resultados al usuario

## 🔄 **Workflow Automático**

### **Al Crear/Modificar Archivos:**

```bash
# 1. Hacer cambios en archivos
# 2. Validar automáticamente
npm run validate

# 3. Si hay errores, corregirlos:
# - Reemplazar colores hardcodeados con tokens
# - Reemplazar clases prohibidas con oficiales
# - Agregar imports de CSS faltantes
# - Usar componentes oficiales en lugar de custom

# 4. Validar de nuevo hasta que pase
npm run validate
```

## 📋 **Reglas de Auto-Corrección**

### **1. Colores Hardcodeados → Tokens**

**Encontrar:** `color: #000000;` o `background: white;`
**Reemplazar:** `color: var(--ubits-fg-1-high);` o `background: var(--ubits-bg-1);`

### **2. Clases Prohibidas → Clases Oficiales**

**Encontrar:** `class="ubits-h1"` o `class="ubits-title"`
**Reemplazar:** `class="ubits-heading-h1"` o `class="ubits-body-md-bold"`

### **3. Componentes Custom → Componentes Oficiales**

**Encontrar:** `<button class="my-button">`
**Reemplazar:** Usar `window.createButton()` del inventario

### **4. CSS Faltante → Agregar Import**

**Encontrar:** Uso de componente sin CSS
**Reemplazar:** Agregar `<link rel="stylesheet" href="packages/addons/[nombre]/src/styles/[nombre].css">`

## 🎯 **Ejemplo de Auto-Corrección**

**Antes:**
```css
.my-element {
  color: #000000;
  background: white;
}
```

**Después (Auto-corregido):**
```css
.my-element {
  color: var(--ubits-fg-1-high);
  background: var(--ubits-bg-1);
}
```

## 📝 **Instrucciones para Cursor AI**

**SIEMPRE al finalizar cambios:**

1. Ejecutar: `npm run validate`
2. Leer output del validador
3. Para cada error:
   - Identificar tipo de error
   - Aplicar corrección automática
   - Guardar cambios
4. Ejecutar validación de nuevo
5. Reportar: "✅ Validación pasada" o "⚠️ X errores corregidos, Y advertencias restantes"

