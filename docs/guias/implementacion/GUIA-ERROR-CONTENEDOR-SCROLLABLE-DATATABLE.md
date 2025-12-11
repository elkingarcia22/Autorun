# 🔍 Guía: Error - Contenedor Scrollable del DataTable No Encontrado

## ❌ PROBLEMA IDENTIFICADO

Al implementar la altura dinámica del DataTable, **NO se encontraba el contenedor scrollable** para configurar el `maxHeight`. Esto resultó en:

1. **Altura no configurada:** El DataTable no aprovechaba el espacio vertical disponible
2. **Scroll no funcionando correctamente:** El contenedor scrollable no tenía altura máxima configurada
3. **Error en logs:** `⚠️ [Encuestas] Contenedor scrollable no encontrado`

---

## 🎯 CAUSA RAÍZ DEL ERROR

### **Error Principal: Buscar el Contenedor Scrollable Dentro del `<table>`**

**Problema:**
- El código buscaba el contenedor scrollable **dentro** del elemento `.ubits-data-table`
- Pero `.ubits-data-table` **ES el elemento `<table>`**, no un contenedor
- El contenedor scrollable está en el **PADRE** del `<table>`, no dentro de él

**Estructura Real del DataTable:**
```html
<div class="ubits-data-table__container">
  <!-- Header del DataTable -->
  <div class="ubits-data-table__header">...</div>
  
  <!-- ⚠️ CONTENEDOR SCROLLABLE (este es el que necesitamos) -->
  <div class="ubits-data-table__scrollable-container ubits-data-table__scrollable-container--vertical">
    <!-- ⚠️ El <table> está DENTRO del contenedor scrollable -->
    <table class="ubits-data-table ubits-data-table__table">
      <thead>...</thead>
      <tbody>...</tbody>
    </table>
  </div>
</div>
```

**Código Incorrecto:**
```javascript
// ❌ INCORRECTO: Buscar dentro del table
const tableElement = tableContainer.querySelector('.ubits-data-table');
const scrollableContainer = tableElement.querySelector('.ubits-data-table__scrollable-container--vertical');
// ❌ Esto NO funciona porque el table NO contiene el scrollable container
```

**Código Correcto:**
```javascript
// ✅ CORRECTO: Buscar en el PADRE del table
const tableElement = tableContainer.querySelector('.ubits-data-table');
const tableParent = tableElement.parentElement; // ⚠️ CRÍTICO: El padre ES el scrollable container

// Buscar el contenedor scrollable en el padre
const scrollableContainer = tableParent?.classList.contains('ubits-data-table__scrollable-container--vertical') 
  ? tableParent 
  : tableParent?.querySelector('.ubits-data-table__scrollable-container--vertical');
```

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **1. Buscar el Contenedor Scrollable en el Padre del Table**

```javascript
// ⚠️ CRÍTICO: El elemento `.ubits-data-table` ES el `<table>`, no un contenedor
// El contenedor scrollable está en el PADRE del table, no dentro de él
// Estructura: .ubits-data-table__container > .ubits-data-table__scrollable-container > <table class="ubits-data-table">

const tableElement = tableContainer.querySelector('.ubits-data-table');
const tableParent = tableElement.parentElement;

// Buscar el contenedor scrollable en el padre
const verticalScrollable = tableParent?.classList.contains('ubits-data-table__scrollable-container--vertical') 
  ? tableParent 
  : tableParent?.querySelector('.ubits-data-table__scrollable-container--vertical') ||
    tableParent?.closest('.ubits-data-table__scrollable-container--vertical');

// Buscar el contenedor general
const scrollableContainer = tableParent?.classList.contains('ubits-data-table__scrollable-container') 
  ? tableParent 
  : tableParent?.querySelector('.ubits-data-table__scrollable-container') ||
    tableParent?.closest('.ubits-data-table__scrollable-container');

// Usar el contenedor encontrado
const finalScrollableContainer = verticalScrollable || scrollableContainer || tableParent;
```

### **2. Logs Detallados para Debugging**

```javascript
console.log('   📋 tableElement es:', tableElement.tagName, 'con clase:', tableElement.className);
console.log('   📋 tableParent es:', tableParent?.tagName, 'con clase:', tableParent?.className);

const searchResults = {
  verticalScrollable: verticalScrollable ? { 
    className: verticalScrollable.className, 
    tag: verticalScrollable.tagName, 
    found: true 
  } : { found: false },
  scrollableContainer: scrollableContainer ? { 
    className: scrollableContainer.className, 
    tag: scrollableContainer.tagName, 
    found: true 
  } : { found: false },
  tableParent: tableParent ? { 
    className: tableParent.className, 
    tag: tableParent.tagName, 
    found: true 
  } : { found: false }
};
console.log('   🔍 Búsqueda de contenedores:', JSON.stringify(searchResults, null, 2));
```

### **3. Configurar Altura en el Contenedor Correcto**

```javascript
if (finalScrollableContainer) {
  // Configurar maxHeight en el contenedor scrollable
  finalScrollableContainer.style.maxHeight = `${availableHeight}px`;
  console.log('✅ [Encuestas] Altura dinámica configurada:', availableHeight + 'px');
} else {
  console.warn('⚠️ [Encuestas] Contenedor scrollable no encontrado');
  // Logs adicionales para debugging
}
```

---

## 📋 CHECKLIST OBLIGATORIO

Al implementar altura dinámica del DataTable:

### **Búsqueda del Contenedor:**
- [ ] **NO buscar dentro del `<table>`:** El contenedor scrollable NO está dentro del table
- [ ] **Buscar en el PADRE:** El contenedor scrollable está en `tableElement.parentElement`
- [ ] **Verificar clase del padre:** El padre debe tener clase `ubits-data-table__scrollable-container--vertical`
- [ ] **Usar múltiples estrategias:** Buscar por clase, por closest, y usar el padre como fallback

### **Logs de Debugging:**
- [ ] **Logs de estructura:** Mostrar tag y className del tableElement y tableParent
- [ ] **Logs de búsqueda:** Mostrar resultados de todas las búsquedas
- [ ] **Logs de éxito:** Confirmar cuando se encuentra el contenedor
- [ ] **Logs de error:** Mostrar estructura del DOM cuando no se encuentra

### **Configuración de Altura:**
- [ ] **Aplicar al contenedor correcto:** Usar `finalScrollableContainer`, no `tableElement`
- [ ] **Verificar antes de aplicar:** Confirmar que el contenedor existe antes de configurar altura
- [ ] **Logs de confirmación:** Mostrar altura configurada y dimensiones del contenedor

---

## 🔍 ESTRUCTURA COMPLETA DEL DATATABLE

```
<div id="encuestas-table-container">  ← Contenedor externo (nosotros lo creamos)
  <div class="ubits-data-table__container">  ← Contenedor principal del DataTable
    <div class="ubits-data-table__header">  ← Header (título, botones, etc.)
      ...
    </div>
    <div class="ubits-data-table__scrollable-container ubits-data-table__scrollable-container--vertical">  ← ⚠️ ESTE ES EL QUE NECESITAMOS
      <table class="ubits-data-table ubits-data-table__table">  ← ⚠️ Este es el elemento que encontramos
        <thead>...</thead>
        <tbody>...</tbody>
      </table>
    </div>
  </div>
</div>
```

**⚠️ CRÍTICO:**
- El contenedor scrollable está en el **PADRE** del `<table>`
- NO buscar dentro del `<table>`, buscar en `tableElement.parentElement`
- El padre tiene la clase `ubits-data-table__scrollable-container--vertical`

---

## 📚 REFERENCIAS

- **Código del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (línea 1696)
- **Estructura HTML:** El contenedor scrollable se crea en `renderDataTable()` con la clase `ubits-data-table__scrollable-container`
- **Guía de Layout:** `docs/guias/implementacion/GUIA-LAYOUT-TEMPLATE-DATATABLE.md`
- **Guía de Altura Dinámica:** `docs/guias/implementacion/GUIA-REDIMENSIONAR-DATATABLE-ESPACIO-COMPLETO.md`

---

## ✅ VERIFICACIÓN

Después de implementar la solución, verificar en los logs:

```
✅ [Encuestas] Contenedor scrollable encontrado: {
  "className": "ubits-data-table__scrollable-container ubits-data-table__scrollable-container--vertical",
  "tag": "DIV",
  "id": ""
}
✅ [Encuestas] Altura dinámica configurada: 504px
```

Si ves estos logs, la solución está funcionando correctamente.

---

**Última actualización:** 2025-12-05








