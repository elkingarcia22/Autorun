# ✅ Guía: Drawer de Filtros en DataTable - Implementación Simple

## 🎯 OBJETIVO

Implementar el drawer de filtros en DataTable de la forma MÁS SIMPLE posible, sin seguir reglas complejas anteriores.

---

## ⚠️ REGLA FUNDAMENTAL

**NO seguir ninguna regla anterior sobre drawer de filtros. Implementar desde cero, de la forma más simple posible.**

---

## 📋 IMPLEMENTACIÓN MÍNIMA

### **PASO 1: Crear el Drawer**

```javascript
// Crear drawer simple
const drawerInstance = createDrawer({
    title: 'Filtros',
    complementaryText: 'Aplica filtros',
    width: 40,
    bodyContent: () => {
        return '<div id="drawer-body"></div>';
    },
    footerButtons: {
        secondary: {
            label: 'Cancelar',
            onClick: (e) => {
                e.preventDefault();
                drawerInstance?.close();
            },
        },
        primary: {
            label: 'Aplicar',
            onClick: (e) => {
                e.preventDefault();
                drawerInstance?.close();
            },
        },
    },
    onClose: () => {
        if (drawerInstance?.element?.parentElement) {
            drawerInstance.element.remove();
        }
    },
    open: true,
});
```

### **PASO 2: Crear UN SOLO Input para Probar**

```javascript
// Esperar a que el drawer esté renderizado
setTimeout(() => {
    const body = drawerInstance?.element?.querySelector('#drawer-body');
    if (body) {
        body.innerHTML = '';
        createInput({
            containerId: 'drawer-body',
            label: 'Prueba',
            type: 'text',
            placeholder: 'Escribe algo',
            size: 'md',
        });
    }
}, 200);
```

---

## 🚨 REGLAS CRÍTICAS

1. **NO agregar estilos CSS extra**
2. **NO usar clases especiales**
3. **NO agregar padding/margin manual**
4. **Solo crear el drawer y UN input para probar**
5. **Si funciona, agregar más inputs uno por uno**

---

## 📝 CHECKLIST

- [ ] Drawer se crea
- [ ] Drawer se abre
- [ ] UN SOLO input se crea y se ve correctamente
- [ ] Input funciona (escribir, etc.)
- [ ] Drawer se cierra
- [ ] NO hay estilos CSS extra
- [ ] NO hay conflictos

---

**Última actualización:** 2025-12-09  
**Versión:** 1.0.0 - SIMPLE






