# 🚨 Guía: NO Agregar Estilos Extra a Componentes

## ⚠️ PROBLEMA

Autorun estaba agregando padding, margin, background y otros estilos automáticamente a los componentes cuando se implementaban, modificando su aspecto respecto a cómo vienen en Storybook.

**Ejemplo del error:**
```javascript
// ❌ INCORRECTO - Agregar padding automáticamente
tabsContainer.style.cssText = 'width: 100%; margin-top: 16px; padding: 0 40px;';
```

**Síntoma:**
- Los componentes no se ven como en Storybook
- Aparecen con padding/margin/background que no deberían tener
- El aspecto visual no coincide con el componente original

---

## ✅ SOLUCIÓN

### **Regla de Oro:**

**Los componentes deben venir TAL CUAL vienen de Storybook, sin modificaciones. Solo agregar estilos si el usuario lo solicita explícitamente.**

### **1. NO Agregar Estilos Automáticamente (Incluyendo margin-top Inline o en CSS)**

```html
<!-- ❌ INCORRECTO - margin-top inline -->
<div id="encuestas-tabs-container" style="margin-top: 16px;"></div>
```

```css
/* ❌ INCORRECTO - margin-top en CSS del contenedor */
#encuestas-tabs-container {
    margin-top: var(--ubits-spacing-lg, 16px);
}
```

```javascript
// ❌ INCORRECTO - Agregar margin-top automáticamente cuando se menciona spacing
container.style.cssText = 'width: 100%; margin-top: var(--ubits-spacing-lg, 16px);';
// Usuario dijo "a 16px del subnav" pero NO dijo "agregar margin-top"
```

```html
<!-- ✅ CORRECTO - Sin margin-top inline -->
<div id="encuestas-tabs-container"></div>
```

```css
/* ✅ CORRECTO - Sin margin-top, usar gap del padre */
#encuestas-tabs-container {
    width: 100%;
    box-sizing: border-box;
}
.main-content {
    gap: var(--ubits-spacing-lg, 16px); /* Spacing viene del gap */
}
```

```javascript
// ✅ CORRECTO - NO agregar margin-top, el componente viene tal cual de Storybook
container.style.cssText = 'width: 100%;';
// El spacing se maneja con gap del contenedor padre, NO en el componente
```

### **2. Consultar Storybook Antes de Agregar Estilos**

**ANTES de implementar cualquier componente:**

1. **Consultar Storybook:**
   - Revisar cómo viene el componente en Storybook
   - Ver si tiene padding, margin, background por defecto
   - Verificar la estructura exacta

2. **Implementar exactamente como viene:**
   - Usar la misma estructura
   - Usar los mismos estilos por defecto
   - NO agregar estilos extra

### **3. Solo Agregar Estilos si el Usuario lo Solicita Explícitamente**

**Ejemplos:**

- ✅ **Usuario dice:** "agregar padding de 16px" → Agregar padding
- ✅ **Usuario dice:** "agregar margin-top de 16px" → Agregar margin-top
- ✅ **Usuario dice:** "agregar fondo blanco" → Agregar background
- ❌ **Usuario dice:** "a 16px del subnav" → NO agregar margin-top (solo menciona spacing, no solicita agregar margin-top)
- ❌ **Usuario dice:** "spacing de 16px" → NO agregar margin-top (solo menciona spacing, no solicita agregar margin-top)
- ❌ **Usuario NO dice nada** → NO agregar estilos

---

## 📋 CHECKLIST PARA IMPLEMENTACIÓN

- [ ] **Consultar Storybook para ver cómo viene el componente por defecto**
  - Revisar el código en Storybook
  - Ver qué estilos tiene el componente por defecto
  - Verificar si tiene padding, margin, background

- [ ] **Crear componente sin estilos extra**
  - ✅ Solo agregar `width: 100%` si es necesario para el contenedor
  - ❌ **NUNCA** agregar `margin-top` automáticamente, incluso si el usuario menciona "spacing" o "a X px del subnav"
  - ❌ **NUNCA** agregar `margin-top` inline: `<div id="container" style="margin-top: 16px;"></div>`
  - ❌ **NUNCA** agregar `margin-top` en CSS: `#container { margin-top: 16px; }`
  - ✅ **SIEMPRE** usar `gap` del contenedor padre para spacing entre elementos
  - ✅ Solo agregar `margin-top` si el usuario dice explícitamente "agregar margin-top"
  - ❌ NO agregar padding, background, border-radius automáticamente

- [ ] **Solo agregar estilos si el usuario lo solicita explícitamente**
  - ✅ Si el usuario dice "agregar padding" → agregar padding
  - ✅ Si el usuario dice "agregar margin" → agregar margin
  - ❌ NO asumir ni agregar automáticamente

---

## 🔍 Ejemplos

### **Ejemplo 1: Tabs**

**❌ INCORRECTO:**
```javascript
// Agregar padding automáticamente
tabsContainer.style.cssText = 'width: 100%; margin-top: 16px; padding: 0 40px;';
```

**✅ CORRECTO:**
```javascript
// NO agregar margin-top, el componente viene tal cual de Storybook
tabsContainer.style.cssText = 'width: 100%;';
// El spacing se maneja en el HTML o CSS, NO en el componente
```

### **Ejemplo 2: DataTable**

**❌ INCORRECTO:**
```javascript
// Agregar padding y background automáticamente
tableContainer.style.cssText = 'width: 100%; padding: 16px; background: white; border-radius: 8px;';
```

**✅ CORRECTO:**
```javascript
// Solo estilos mínimos necesarios
tableContainer.style.cssText = 'width: 100%;';
// NO agregar padding, background, border-radius a menos que se solicite
```

---

## 📝 Reglas en Autorun

### **En `.cursorrules`:**

```
### Componentes UBITS
- ⚠️ **CRÍTICO: NO agregar padding, margin ni estilos extra a componentes** - Los componentes deben venir tal cual de Storybook
- ⚠️ **Solo agregar estilos si el usuario lo solicita explícitamente** - NO asumir ni agregar automáticamente
```

### **En `.cursor/rules/04-implementacion.md`:**

```
2. **⚠️ CRÍTICO: NO Agregar Estilos Extra a Componentes:**
   - ❌ **NUNCA** agregar padding, margin, background, border-radius u otros estilos a contenedores de componentes automáticamente
   - ❌ **NUNCA** modificar estilos de componentes a menos que el usuario lo solicite explícitamente
   - ✅ **SIEMPRE** crear componentes tal cual vienen de Storybook, sin modificaciones
   - ✅ **SIEMPRE** usar solo los estilos mínimos necesarios
   - ✅ **Solo agregar estilos si el usuario lo solicita explícitamente**
```

### **En `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`:**

```
## ⚠️ ERROR CRÍTICO #53: Agregar Estilos Extra Automáticamente a Componentes
```

---

## ✅ Verificación

**Después de implementar un componente, verificar:**

1. ✅ El componente se ve igual que en Storybook
2. ✅ No tiene padding/margin/background extra
3. ✅ Solo tiene los estilos mínimos necesarios
4. ✅ Los estilos agregados fueron solicitados explícitamente por el usuario

---

**Última actualización:** 2025-01-09  
**Estado:** ✅ Regla Implementada y Documentada
