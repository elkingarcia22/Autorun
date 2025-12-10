# ✅ Guía: Drawer Básico con Inputs Genéricos

## 🎯 OBJETIVO

Implementar un drawer básico con inputs genéricos para probar que funciona correctamente, **SIN relación con DataTable ni filtros**.

---

## 📋 IMPLEMENTACIÓN PASO A PASO

### **PASO 1: Crear el Drawer**

```javascript
// Crear drawer básico
const drawerInstance = createDrawer({
    title: 'Prueba de Inputs',
    complementaryText: 'Drawer básico para probar inputs',
    width: 40,
    bodyContent: () => {
        // Contenedores vacíos para los inputs
        return `
            <div class="drawer-inputs-container">
                <div id="input-text-container"></div>
                <div id="input-calendar-container"></div>
                <div id="input-select-container"></div>
            </div>
        `;
    },
    footerButtons: {
        secondary: {
            label: 'Cancelar',
            onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (drawerInstance) {
                    drawerInstance.close();
                }
            },
        },
        primary: {
            label: 'Guardar',
            onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Guardar');
                if (drawerInstance) {
                    drawerInstance.close();
                }
            },
        },
    },
    onClose: () => {
        if (drawerInstance && drawerInstance.element && drawerInstance.element.parentElement) {
            drawerInstance.element.remove();
        }
    },
    closeOnOverlayClick: true,
    open: true, // Abrir automáticamente
});
```

### **PASO 2: Crear Inputs DESPUÉS de crear el drawer**

```javascript
// ⚠️ CRÍTICO: Esperar a que el drawer esté completamente renderizado
setTimeout(() => {
    if (!drawerInstance) return;

    // Input de texto
    createInput({
        containerId: 'input-text-container',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingresa tu nombre',
        size: 'md',
    });

    // Input de calendario
    createInput({
        containerId: 'input-calendar-container',
        label: 'Fecha',
        type: 'calendar',
        placeholder: 'Selecciona una fecha',
        size: 'md',
    });

    // Input de select
    createInput({
        containerId: 'input-select-container',
        label: 'Estado',
        type: 'select',
        selectOptions: [
            { value: 'activo', text: 'Activo' },
            { value: 'inactivo', text: 'Inactivo' },
        ],
        size: 'md',
    });
}, 100);
```

---

## ⚠️ REGLAS CRÍTICAS

### **1. NO agregar estilos CSS extra**

❌ **INCORRECTO:**
```css
.drawer-inputs-container input {
    margin-top: 16px; /* ❌ NO hacer esto */
}
```

✅ **CORRECTO:**
- Los inputs de UBITS ya tienen todos sus estilos
- NO agregar estilos extra
- NO usar `!important` para sobrescribir

### **2. Usar setTimeout para crear inputs**

❌ **INCORRECTO:**
```javascript
const drawerInstance = createDrawer({ ... });
// Crear inputs inmediatamente
createInput({ ... }); // ❌ Puede fallar si el drawer no está renderizado
```

✅ **CORRECTO:**
```javascript
const drawerInstance = createDrawer({ ... });
setTimeout(() => {
    createInput({ ... }); // ✅ Drawer ya está renderizado
}, 100);
```

### **3. Limpiar contenedores antes de crear inputs**

❌ **INCORRECTO:**
```javascript
const container = document.getElementById('input-text-container');
createInput({ containerId: 'input-text-container', ... }); // ❌ Puede duplicar inputs
```

✅ **CORRECTO:**
```javascript
const container = document.getElementById('input-text-container');
if (container) {
    container.innerHTML = ''; // ✅ Limpiar antes
    createInput({ containerId: 'input-text-container', ... });
}
```

---

## 📝 CHECKLIST

- [ ] Drawer se crea correctamente
- [ ] Drawer se abre automáticamente
- [ ] Inputs se crean después del drawer (setTimeout)
- [ ] Inputs se ven correctamente (sin estilos extra)
- [ ] Inputs funcionan correctamente (escribir, seleccionar, etc.)
- [ ] Drawer se cierra correctamente
- [ ] NO hay estilos CSS extra agregados
- [ ] NO hay conflictos con otros componentes

---

## 🚨 ERRORES COMUNES

### **Error 1: Crear inputs antes del drawer**

❌ **INCORRECTO:**
```javascript
createInput({ containerId: 'input-text-container', ... });
const drawerInstance = createDrawer({ ... });
```

✅ **CORRECTO:**
```javascript
const drawerInstance = createDrawer({ ... });
setTimeout(() => {
    createInput({ containerId: 'input-text-container', ... });
}, 100);
```

### **Error 2: Agregar estilos CSS extra**

❌ **INCORRECTO:**
```css
.drawer-inputs-container .ubits-input {
    margin-top: 16px !important; /* ❌ NO hacer esto */
}
```

✅ **CORRECTO:**
- NO agregar estilos CSS extra
- Los inputs de UBITS ya tienen todos sus estilos

### **Error 3: No limpiar contenedores**

❌ **INCORRECTO:**
```javascript
// Crear input múltiples veces sin limpiar
createInput({ containerId: 'input-text-container', ... });
createInput({ containerId: 'input-text-container', ... }); // ❌ Duplica inputs
```

✅ **CORRECTO:**
```javascript
const container = document.getElementById('input-text-container');
if (container) {
    container.innerHTML = ''; // ✅ Limpiar antes
    createInput({ containerId: 'input-text-container', ... });
}
```

---

## 📚 REFERENCIAS

- **Drawer Provider:** `vendor/ubits/packages/components/drawer/src/DrawerProvider.ts`
- **Input Provider:** `vendor/ubits/packages/components/input/src/InputProvider.ts`
- **Storybook Drawer:** https://ubits-storybook10.vercel.app/?path=/story/feedback-drawer-navigation--default
- **Storybook Input:** https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default

---

**Última actualización:** 2025-12-09  
**Versión:** 1.0.0


