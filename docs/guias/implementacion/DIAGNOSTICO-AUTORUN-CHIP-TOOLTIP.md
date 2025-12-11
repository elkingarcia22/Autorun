# 🔍 Diagnóstico: Autorun y Detección de Componentes Chip/Tooltip

> **Fecha:** 2025-12-10  
> **Problema:** Autorun no detecta componentes Chip/Tooltip ni consulta Storybook automáticamente

---

## 🚨 Problema Identificado

### **Síntomas:**
1. ✅ FileWatcher detecta cambios correctamente
2. ✅ AutoReload emite `[AUTORUN_AUTO_RELOAD]` correctamente
3. ✅ Pre-Implementation Check analiza el archivo
4. ❌ **NO detecta componentes Chip/Tooltip en el código**
5. ❌ **NO consulta Storybook automáticamente**
6. ❌ **NO genera plan de implementación**

### **Causa Raíz:**

Los patrones de detección en `PreImplementationCheckAddon.ts` buscan:
- `Chip: /window\.createChip\s*\(/i` - Solo detecta llamadas `window.createChip(`
- `Tooltip: /window\.createTooltip\s*\(/i` - Solo detecta llamadas `window.createTooltip(`

**Pero en el HTML, las funciones se asignan así:**
```javascript
window.createChip = createChip;  // ❌ NO detectado
window.createTooltip = createTooltip;  // ❌ NO detectado
```

---

## ✅ Solución Aplicada

### **1. Patrones de Detección Mejorados**

Actualizados los patrones para detectar tanto llamadas como asignaciones:

```typescript
const componentPatterns: Record<string, RegExp> = {
  // ... otros componentes ...
  Chip: /window\.createChip\s*\(|window\.createChip\s*=|window\.UBITSChip\?\.createChip|createChip\s*\(/i,
  Tooltip: /window\.createTooltip\s*\(|window\.createTooltip\s*=|window\.UBITSTooltip\?\.createTooltip|createTooltip\s*\(/i,
};
```

**Ahora detecta:**
- ✅ `window.createChip(` - Llamadas directas
- ✅ `window.createChip =` - Asignaciones
- ✅ `window.UBITSChip?.createChip` - Acceso opcional
- ✅ `createChip(` - Llamadas sin prefijo window

---

## 🔍 Verificaciones Necesarias

### **1. Verificar que los patrones funcionen:**

Después de compilar, los logs deberían mostrar:
```
🔍 Pre-Implementation Check: Componente 'Chip' detectado en el código
🔍 Pre-Implementation Check: Componente 'Tooltip' detectado en el código
```

### **2. Verificar consulta automática a Storybook:**

Debería aparecer:
```
📚 Pre-Implementation Check: Obteniendo plan basado en historias para: Chip
📡 Pre-Implementation Check: Consultando Storybook MCP automáticamente para 'Chip'...
```

### **3. Verificar plan de implementación:**

Debería aparecer:
```
✅ Pre-Implementation Check: Plan obtenido: X historias encontradas
📋 Pre-Implementation Check: Plan de implementación basado en historias:
```

---

## 🐛 Error Corregido

### **Error en línea 2453:**

**Problema:** `destroy` se usaba antes de ser declarado.

**Solución:** Declarar `destroy` antes de usarlo en `closeOnOutsideClick`:

```javascript
let destroy = () => {
  if (tooltip.parentElement) {
    tooltip.parentElement.removeChild(tooltip);
  }
};

if (closeOnOutsideClick) {
  // ... código ...
  const originalDestroy = destroy;
  destroy = () => {
    document.removeEventListener('click', handleClickOutside, true);
    originalDestroy();
  };
}
```

---

## 📊 Logs Esperados Después de la Corrección

### **En Terminal (AutorunHub):**

```
🔍 FileWatcher: Cambio detectado en: .../canvas-administrador-encuestas-2025-12-10.html
📤 FileWatcher: Llamando onChangeCallback
📥 AutorunHub: FileWatcher callback recibido
📡 AutorunHub: Emitiendo evento 'fileChange'
✅ AutorunHub: Handler encontrado en add-on 'pre-implementation-check'
🔍 Pre-Implementation Check: Analizando archivo
🔍 Pre-Implementation Check: Componente 'Chip' detectado en el código
🔍 Pre-Implementation Check: Componente 'Tooltip' detectado en el código
📚 Pre-Implementation Check: Obteniendo plan basado en historias para: Chip
📡 Pre-Implementation Check: Consultando Storybook MCP automáticamente para 'Chip'...
✅ Pre-Implementation Check: Plan obtenido: X historias encontradas
```

### **En Browser Console:**

```
✅ [Chip] createChip implementado manualmente
✅ [Tooltip] createTooltip implementado manualmente
✅ [Chip/Tooltip] Componentes listos, inicializando...
✅ [Chip/Tooltip] Chip y tooltip inicializados correctamente
```

---

## 🔄 Próximos Pasos

1. **Compilar el add-on actualizado:**
   ```bash
   cd packages/addons/functional/pre-implementation-check && npm run build
   ```

2. **Hacer un cambio en el HTML** para que FileWatcher detecte el cambio

3. **Verificar logs** para confirmar que:
   - ✅ Se detectan Chip y Tooltip
   - ✅ Se consulta Storybook automáticamente
   - ✅ Se genera plan de implementación

4. **Si aún no funciona:**
   - Verificar que el contenido del archivo se lea correctamente
   - Verificar que los patrones regex funcionen con el contenido real
   - Agregar logs adicionales para debug

---

**Última actualización:** 2025-12-10  
**Estado:** ✅ Patrones corregidos - Pendiente verificación
