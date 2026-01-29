# 🔍 Análisis: MCP Fallando y Radio Button No Clickeable

**Fecha:** 2025-01-03

---

## 📊 Resumen Ejecutivo

**Dos problemas identificados:**
1. ❌ **MCP de Storybook falla** con "fetch failed"
2. ❌ **Radio Button no es clickeable** aunque se ve correctamente

---

## 🔴 Problema 1: MCP de Storybook Falla

### **Síntoma:**
```
Error: Failed to get components props: fetch failed
```

### **Causas Posibles:**

1. **MCP no está configurado en Cursor:**
   - El servidor MCP `storybook` no está en la configuración de Cursor
   - La URL de Storybook no es accesible desde el proceso MCP

2. **URL de Storybook incorrecta:**
   - El MCP intenta acceder a `https://ubits-storybook10.vercel.app/index.json`
   - Puede requerir token de bypass de Vercel
   - El MCP puede no tener acceso a internet o estar bloqueado

3. **Proceso MCP no está corriendo:**
   - El servidor MCP `storybook-mcp@latest` no se inició correctamente
   - Cursor no puede comunicarse con el proceso MCP

### **Verificación:**

✅ **Storybook index.json SÍ es accesible:**
```bash
curl "https://ubits-storybook10.vercel.app/index.json" | head -20
# ✅ Funciona correctamente
```

### **Soluciones:**

#### **Opción A: Configurar MCP Manualmente (Recomendado)**

1. **Verificar configuración de Cursor:**
   - Abrir: `~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`
   - O usar: `npm run setup-storybook-mcp`

2. **Configuración necesaria:**
```json
{
  "mcpServers": {
    "storybook": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10.vercel.app/index.json"
      }
    }
  }
}
```

3. **Reiniciar Cursor completamente**

#### **Opción B: Usar Fallback Visual (Actual)**

Actualmente, Autorun usa **fallback visual** cuando el MCP falla:
- ✅ Navega a Storybook en el navegador
- ✅ Extrae código HTML desde la pestaña "Code"
- ✅ Obtiene props desde la pestaña "Controls"

**Problema:** Este método es más lento y menos confiable que el MCP.

#### **Opción C: Mejorar MCP con Más Herramientas**

**¿Necesitamos un MCP con más herramientas?**

**Respuesta:** SÍ, pero no es crítico. El MCP actual (`storybook-mcp@latest`) debería ser suficiente si está configurado correctamente.

**Herramientas que el MCP actual debería tener:**
- ✅ `getComponentList` - Lista componentes
- ✅ `getComponentsProps` - Obtiene props
- ✅ `getStory` - Obtiene código de una historia

**Herramientas adicionales que podrían ayudar:**
- 🔄 `extractCode` - Extrae código HTML exacto
- 🔄 `getCSS` - Obtiene CSS del componente
- 🔄 `getTokens` - Obtiene tokens usados
- 🔄 `validateImplementation` - Valida implementación

**Conclusión:** El MCP actual debería funcionar. El problema es de **configuración**, no de herramientas faltantes.

---

## 🔴 Problema 2: Radio Button No Clickeable

### **Síntoma:**
- El radio button se ve correctamente (igual que Storybook)
- Pero **no se puede hacer clic** en él
- El browser click falla: `Script failed to execute`

### **Análisis del Código:**

**Estructura actual:**
```javascript
<label class="ubits-radio-button ubits-radio-button--md ubits-radio-button--default">
  <input type="radio" id="radio-estado-encuesta-activo" class="ubits-radio-button__input" />
  <span class="ubits-radio-button__circle" aria-hidden="true">...</span>
  <div class="ubits-radio-button__text-content">...</div>
</label>
```

**CSS del input:**
```css
.ubits-radio-button__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}
```

**CSS del circle:**
```css
.ubits-radio-button__circle {
  position: relative;
  /* ... */
}

.ubits-radio-button--disabled .ubits-radio-button__circle {
  pointer-events: none;
}
```

### **Problema Identificado:**

❌ **FALTA: Atributo `for` en el label**

El label necesita el atributo `for` que apunte al ID del input, O el input debe estar dentro del label (que ya está).

**Pero hay otro problema:** El input está con `position: absolute` y `opacity: 0`, lo que lo hace invisible. El click debería funcionar en el label, pero puede haber un problema de z-index o pointer-events.

### **Solución:**

1. **Agregar `for` al label:**
```javascript
radioContainer.setAttribute('for', 'radio-estado-encuesta-activo');
```

2. **O mejor: Verificar que el label envuelva correctamente el input**

3. **Verificar que no haya elementos superpuestos bloqueando el click**

### **Código Corregido:**

```javascript
const radioContainer = document.createElement('label');
radioContainer.className = 'ubits-radio-button ubits-radio-button--md ubits-radio-button--default';
// ⚠️ CRÍTICO: Agregar for para accesibilidad y funcionalidad
radioContainer.setAttribute('for', 'radio-estado-encuesta-activo');

const radioInput = document.createElement('input');
radioInput.type = 'radio';
radioInput.name = 'estado-encuesta';
radioInput.value = 'activo';
radioInput.id = 'radio-estado-encuesta-activo';
radioInput.className = 'ubits-radio-button__input';
// ⚠️ CRÍTICO: Asegurar que el input sea clickeable
radioInput.style.pointerEvents = 'auto';
radioInput.style.zIndex = '1';
```

---

## 🎯 Conclusión

### **MCP:**
- ❌ **Problema:** Configuración incorrecta o MCP no iniciado
- ✅ **Solución:** Configurar MCP correctamente en Cursor
- ✅ **Alternativa:** Usar fallback visual (actual, funciona pero es más lento)

### **Radio Button:**
- ❌ **Problema:** Falta atributo `for` en el label o problemas de z-index/pointer-events
- ✅ **Solución:** Agregar `for` y asegurar que el input sea clickeable

---

**Última actualización:** 2025-01-03



