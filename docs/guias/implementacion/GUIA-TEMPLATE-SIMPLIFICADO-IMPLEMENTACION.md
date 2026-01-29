# 📚 Guía: Template Simplificado para Implementación

**Objetivo:** Mantener el template completo (sidebar, navbar, responsive) pero simplificar la implementación de componentes.

---

## 🎯 ¿Qué Cambió?

### **Antes:**
- ❌ Tenías que interceptar `ContentManager.updateContent()` manualmente
- ❌ Tenías que guardar y restaurar HTML manualmente
- ❌ Tenías que re-agregar event listeners manualmente
- ❌ Código complejo y repetitivo para cada componente

### **Ahora:**
- ✅ Sistema automático de preservación integrado
- ✅ Solo registras el componente una vez
- ✅ El sistema maneja todo automáticamente
- ✅ Código simple y directo

---

## 🚀 Uso del Sistema Automático

### **Paso 1: Registrar el Componente**

Antes de crear el componente, regístralo para preservación automática:

```javascript
// Registrar componente para preservación automática
window.AUTORUN_PRESERVE_COMPONENTS.register(
  'radio-button',           // ID del componente
  'radiobutton-group-tipo', // ID del contenedor
  {                         // Event handlers (opcional)
    onChange: handleChange,
    onClick: handleClick
  }
);
```

### **Paso 2: Crear el Componente Normalmente**

```javascript
// Crear componente normalmente
window.UBITS.RadioButton.create({
  containerId: 'radiobutton-group-tipo',
  label: 'Opción 1',
  value: 'opcion1',
  name: 'grupo',
  checked: true,
  onChange: handleChange
});
```

### **Paso 3: ¡Listo!**

El sistema automáticamente:
- ✅ Guarda el HTML antes de que ContentManager lo limpie
- ✅ Restaura el componente después de `updateContent()`
- ✅ Re-agrega event listeners automáticamente

---

## 📋 Ejemplo Completo

```javascript
<script>
(function() {
  // Handler para cambios
  function handleRadioButtonChange(event) {
    const input = event.target;
    console.log('RadioButton cambiado:', input.value);
    
    // Actualizar estado visual de todos los RadioButtons del grupo
    const allRadios = document.querySelectorAll(`input[type="radio"][name="${input.name}"]`);
    allRadios.forEach(radio => {
      const label = radio.closest('.ubits-radio-button');
      if (label) {
        if (radio === input) {
          label.classList.add('ubits-radio-button--checked');
        } else {
          label.classList.remove('ubits-radio-button--checked');
        }
      }
    });
  }

  function initRadioButtons() {
    // 1. Registrar componente para preservación automática
    window.AUTORUN_PRESERVE_COMPONENTS.register(
      'radio-button',
      'radiobutton-group-tipo',
      {
        onChange: handleRadioButtonChange
      }
    );

    // 2. Crear RadioButtons normalmente
    const options = [
      {
        containerId: 'radiobutton-group-tipo',
        label: 'Opción 1',
        value: 'opcion1',
        name: 'grupo',
        checked: true,
        onChange: handleRadioButtonChange
      },
      {
        containerId: 'radiobutton-group-tipo',
        label: 'Opción 2',
        value: 'opcion2',
        name: 'grupo',
        checked: false,
        onChange: handleRadioButtonChange
      }
    ];

    options.forEach(opt => {
      window.UBITS.RadioButton.create(opt);
    });
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRadioButtons);
  } else {
    initRadioButtons();
  }
})();
</script>
```

---

## 🔧 API del Sistema Automático

### **`window.AUTORUN_PRESERVE_COMPONENTS.register(componentId, containerId, handlers)`**

Registra un componente para preservación automática.

**Parámetros:**
- `componentId` (string): ID del componente (ej: 'radio-button')
- `containerId` (string): ID del contenedor HTML
- `handlers` (object, opcional): Event handlers a re-agregar después de restaurar

**Ejemplo:**
```javascript
window.AUTORUN_PRESERVE_COMPONENTS.register('button', 'button-container', {
  onClick: handleClick,
  onMouseEnter: handleHover
});
```

---

## ✅ Ventajas

1. **Mantiene todas las funcionalidades:**
   - ✅ Sidebar completo
   - ✅ Navbar completo
   - ✅ Responsive completo
   - ✅ ContentManager completo

2. **Simplifica la implementación:**
   - ✅ Solo una línea para registrar
   - ✅ No necesitas interceptar manualmente
   - ✅ No necesitas guardar/restaurar manualmente
   - ✅ No necesitas re-agregar listeners manualmente

3. **Backend-ready:**
   - ✅ Código simple y directo
   - ✅ Fácil de entender
   - ✅ Fácil de mantener

---

## 🔗 Referencias

- **Sistema de Preservación:** `packages/autorun-core/src/poc/storybook-v2/componentPreserver.ts`
- **Ejemplos de Uso:** `packages/autorun-core/src/poc/storybook-v2/USAGE-EXAMPLE.md`
- **Análisis Completo:** `docs/analisis/ANALISIS-POC-STORYBOOK-V2-RADIOBUTTON.md`

---

**Última actualización:** 2025-01-23

