# ✅ Solución: MutationObserver en Bucle Infinito

**ID:** `mutation-observer-solution-004`  
**Problema ID:** `mutation-observer-issue-004`  
**Categoría:** componentes / MutationObserver  
**Fecha Implementación:** 2025-01-27  
**Verificado:** ✅ Sí

---

## 📋 Resumen

Agregar protección contra bucles infinitos en MutationObserver usando cooldown, verificación de estado y delays antes de verificar listeners.

---

## 🔧 Implementación

### **1. Agregar Cooldown y Estado de Reinicialización**

```javascript
// ✅ CORRECTO: Protección contra bucles
let isReinitializing = false;
let lastReinitTime = 0;
const REINIT_COOLDOWN = 2000; // 2 segundos entre reinicializaciones
```

### **2. Verificar Estado Antes de Reinicializar**

```javascript
// ✅ CORRECTO: Verificar estado antes de reinicializar
const contentAreaObserver = new MutationObserver((mutations) => {
  // ⚠️ CRÍTICO: Prevenir bucles infinitos
  const now = Date.now();
  if (isReinitializing || (now - lastReinitTime) < REINIT_COOLDOWN) {
    return; // Ignorar si ya estamos reinicializando o fue hace poco
  }
  
  // ... resto del código
});
```

### **3. Esperar Delay Antes de Verificar**

```javascript
// ✅ CORRECTO: Esperar delay antes de verificar
if (allTabs.length > 0 && tabsWithListeners.length === 0) {
  // Esperar un poco antes de verificar
  setTimeout(() => {
    const tabsElementAfter = tabsContainer.querySelector('.ubits-tabs');
    if (tabsElementAfter) {
      const tabsWithListenersAfter = tabsElementAfter.querySelectorAll('.ubits-tab[data-listener-attached="true"]');
      if (tabsWithListenersAfter.length === 0 && !isReinitializing) {
        isReinitializing = true;
        lastReinitTime = Date.now();
        window.initEncuestasTabs();
        setTimeout(() => {
          isReinitializing = false;
        }, 500);
      }
    }
  }, 500); // Esperar 500ms antes de verificar
}
```

### **4. Simplificar Lógica Eliminando Observers Duplicados**

```javascript
// ✅ CORRECTO: Un solo observer, lógica simplificada
// Eliminar observers duplicados que causaban conflictos
// Usar un solo observer con protección contra bucles
```

---

## 📝 Archivos Modificados

- `prototypes/canvas-administrador-encuestas-2025-12-05.html`
  - Línea 2488-2518: MutationObserver con protección contra bucles
  - Eliminados observers duplicados
  - Agregado cooldown y verificación de estado

---

## ✅ Verificación

### **Antes:**
- MutationObserver detecta tabs sin listeners
- Reinicializa inmediatamente
- Causa otra mutación
- Bucle infinito

### **Después:**
- MutationObserver detecta tabs sin listeners
- Verifica cooldown (2 segundos)
- Espera delay (500ms) antes de verificar
- Reinicializa solo si es necesario
- No hay bucles infinitos

---

## 🔗 Referencias

- **Problema relacionado:** `docs/problems-solutions/mutation-observer/issue-004.md`
- **Guía de errores:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- **Template:** `prototypes/canvas-administrador-encuestas-2025-12-05.html`

---

**Última actualización:** 2025-01-27




