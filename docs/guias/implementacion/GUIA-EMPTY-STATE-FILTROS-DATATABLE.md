# 📘 Guía: Implementación de Empty State de Filtros en DataTable

Esta guía documenta **cómo implementar correctamente** el empty state de filtros (`noFilterResults`) en el DataTable, incluyendo la funcionalidad completa de sus botones.

---

## 🎯 OBJETIVO

Implementar el empty state de filtros con **DOS botones**:
1. **Botón Primario:** "Ajustar filtros" - Abre el drawer de filtros
2. **Botón Secundario:** "Limpiar filtros" - Limpia los filtros **SIN abrir el drawer visiblemente**

---

## 📋 ESTRUCTURA DEL EMPTY STATE DE FILTROS

### **Configuración Básica**

```javascript
emptyState: {
  noFilterResults: {
    title: 'No hay resultados con los filtros aplicados',
    description: 'Intenta ajustar los filtros o limpiarlos para ver más resultados.',
    icon: 'filter', // ⚠️ OBLIGATORIO: Icono de filtro
    
    // ✅ BOTÓN PRIMARIO: "Ajustar filtros"
    actionLabel: 'Ajustar filtros',
    showPrimaryButton: true,
    onAction: () => {
      // Abre el drawer de filtros
      const headerElement = window._encuestasDataTableInstance.element.querySelector('.ubits-data-table__header');
      if (headerElement) {
        const filterButton = headerElement.querySelector('.ubits-data-table__header-filter-button');
        if (filterButton) {
          filterButton.click(); // Abre el drawer
        }
      }
    },
    
    // ✅ BOTÓN SECUNDARIO: "Limpiar filtros"
    secondaryActionLabel: 'Limpiar filtros',
    showSecondaryButton: true,
    onSecondaryAction: () => {
      // Limpia los filtros SIN abrir el drawer visiblemente
      clearFiltersWithoutDrawer();
    }
  }
}
```

---

## 🔧 IMPLEMENTACIÓN COMPLETA DEL BOTÓN "LIMPIAR FILTROS"

### **⚠️ PROBLEMA CRÍTICO**

El botón "Limpiar filtros" debe:
- ✅ Limpiar los filtros activos
- ✅ Cerrar el drawer si está abierto
- ❌ **NO abrir el drawer visiblemente** si no está abierto

### **✅ SOLUCIÓN CORRECTA**

```javascript
// Función para limpiar filtros sin abrir el drawer visiblemente
const clearFiltersWithoutDrawer = () => {
  console.log('🔵 [Encuestas DataTable] ========== INICIO clearFiltersWithoutDrawerCallback ==========');
  
  // Verificar que la instancia del DataTable existe
  if (!window._encuestasDataTableInstance || !window._encuestasDataTableInstance.element) {
    console.error('❌ [Encuestas DataTable] Instancia del DataTable no disponible');
    return;
  }
  
  console.log('✅ [Encuestas DataTable] window._encuestasDataTableInstance disponible');
  console.log('✅ [Encuestas DataTable] window._encuestasDataTableInstance.element disponible');
  
  // ⚠️ PASO 1: Verificar si hay un drawer ya abierto
  // El drawer usa la clase 'ubits-drawer-overlay--open' en el overlay, NO 'data-drawer-open'
  console.log('🔍 [Encuestas DataTable] Buscando drawer abierto...');
  const drawerOverlay = document.querySelector('.ubits-drawer-overlay.ubits-drawer-overlay--open');
  
  if (drawerOverlay) {
    // ✅ CASO 1: Drawer ya está abierto → Hacer click en "Limpiar" directamente
    console.log('✅ [Encuestas DataTable] Drawer overlay encontrado abierto');
    const drawer = drawerOverlay.querySelector('.ubits-drawer');
    if (drawer) {
      console.log('✅ [Encuestas DataTable] Drawer encontrado dentro del overlay');
      
      // ⚠️ IMPORTANTE: La estructura del footer es:
      // .ubits-drawer__footer > .ubits-drawer__footer-actions > .ubits-drawer__footer-right > .ubits-drawer__footer-button
      const footer = drawer.querySelector('.ubits-drawer__footer');
      if (footer) {
        console.log('✅ [Encuestas DataTable] Footer encontrado');
        const footerRight = footer.querySelector('.ubits-drawer__footer-right');
        if (footerRight) {
          console.log('✅ [Encuestas DataTable] Footer right encontrado');
          const buttons = footerRight.querySelectorAll('.ubits-drawer__footer-button');
          console.log(`🔍 [Encuestas DataTable] Encontrados ${buttons.length} botones en el footer right`);
          
          // Buscar el botón "Limpiar"
          for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i];
            const btnText = btn.textContent?.trim() || '';
            console.log(`🔍 [Encuestas DataTable] Botón ${i}: "${btnText}"`);
            if (btnText.toLowerCase().includes('limpiar')) {
              console.log('✅ [Encuestas DataTable] Botón "Limpiar" encontrado, haciendo click...');
              btn.click(); // Esto limpia los filtros y cierra el drawer automáticamente
              console.log('✅ [Encuestas DataTable] Click en "Limpiar" ejecutado');
              console.log('🔵 [Encuestas DataTable] ========== FIN clearFiltersWithoutDrawerCallback ==========');
              return;
            }
          }
          console.warn('⚠️ [Encuestas DataTable] No se encontró botón "Limpiar" en el footer right');
        } else {
          console.warn('⚠️ [Encuestas DataTable] Footer right no encontrado');
        }
      } else {
        console.warn('⚠️ [Encuestas DataTable] Footer no encontrado');
      }
    } else {
      console.warn('⚠️ [Encuestas DataTable] Drawer no encontrado dentro del overlay');
    }
  } else {
    // ✅ CASO 2: Drawer NO está abierto → Abrirlo oculto, hacer click en "Limpiar", cerrarlo
    console.log('ℹ️ [Encuestas DataTable] No hay drawer abierto, necesitamos abrirlo');
    
    // Buscar el botón de filtros en el header
    const headerElement = window._encuestasDataTableInstance.element.querySelector('.ubits-data-table__header');
    if (headerElement) {
      console.log('✅ [Encuestas DataTable] Header element encontrado');
      const filterButton = headerElement.querySelector('.ubits-data-table__header-filter-button');
      if (filterButton) {
        console.log('✅ [Encuestas DataTable] Filter button encontrado');
        
        // ⚠️ PASO 2: Ocultar el drawer ANTES de abrirlo
        console.log('🎨 [Encuestas DataTable] Agregando estilo para ocultar drawer...');
        const style = document.createElement('style');
        style.id = 'hide-drawer-temporarily';
        style.textContent = '.ubits-drawer-overlay { opacity: 0 !important; pointer-events: none !important; }';
        document.head.appendChild(style);
        console.log('✅ [Encuestas DataTable] Estilo agregado para ocultar drawer');
        
        // ⚠️ PASO 3: Abrir el drawer programáticamente
        console.log('🖱️ [Encuestas DataTable] Haciendo click en filter button para abrir drawer...');
        filterButton.click();
        console.log('✅ [Encuestas DataTable] Click en filter button ejecutado');
        
        // ⚠️ PASO 4: Esperar a que el drawer se abra y hacer click en "Limpiar"
        let attempts = 0;
        const maxAttempts = 20; // Máximo 2 segundos (aumentado porque el drawer puede tardar más)
        console.log(`⏳ [Encuestas DataTable] Esperando a que el drawer se abra (máximo ${maxAttempts} intentos)...`);
        
        const checkInterval = setInterval(() => {
          attempts++;
          console.log(`🔍 [Encuestas DataTable] Intento ${attempts}/${maxAttempts}: Buscando drawer abierto...`);
          
          // Buscar el overlay con la clase 'ubits-drawer-overlay--open'
          const drawerOverlayAfterOpen = document.querySelector('.ubits-drawer-overlay.ubits-drawer-overlay--open');
          if (drawerOverlayAfterOpen) {
            console.log('✅ [Encuestas DataTable] Drawer overlay abierto encontrado');
            clearInterval(checkInterval);
            
            const drawerAfterOpen = drawerOverlayAfterOpen.querySelector('.ubits-drawer');
            if (drawerAfterOpen) {
              console.log('✅ [Encuestas DataTable] Drawer encontrado dentro del overlay');
              const footer = drawerAfterOpen.querySelector('.ubits-drawer__footer');
              if (footer) {
                console.log('✅ [Encuestas DataTable] Footer encontrado en drawer abierto');
                const footerRight = footer.querySelector('.ubits-drawer__footer-right');
                if (footerRight) {
                  console.log('✅ [Encuestas DataTable] Footer right encontrado en drawer abierto');
                  const buttons = footerRight.querySelectorAll('.ubits-drawer__footer-button');
                  console.log(`🔍 [Encuestas DataTable] Encontrados ${buttons.length} botones en el footer right`);
                  
                  // Buscar el botón "Limpiar"
                  for (let i = 0; i < buttons.length; i++) {
                    const btn = buttons[i];
                    const btnText = btn.textContent?.trim() || '';
                    console.log(`🔍 [Encuestas DataTable] Botón ${i}: "${btnText}"`);
                    if (btnText.toLowerCase().includes('limpiar')) {
                      console.log('✅ [Encuestas DataTable] Botón "Limpiar" encontrado, haciendo click...');
                      btn.click(); // Esto limpia los filtros y cierra el drawer automáticamente
                      console.log('✅ [Encuestas DataTable] Click en "Limpiar" ejecutado');
                      
                      // ⚠️ PASO 5: Remover el estilo que oculta el drawer después de limpiar
                      setTimeout(() => {
                        console.log('🧹 [Encuestas DataTable] Removiendo estilo que oculta drawer...');
                        const hideStyle = document.getElementById('hide-drawer-temporarily');
                        if (hideStyle) {
                          hideStyle.remove();
                          console.log('✅ [Encuestas DataTable] Estilo removido');
                        } else {
                          console.warn('⚠️ [Encuestas DataTable] Estilo no encontrado para remover');
                        }
                      }, 100);
                      console.log('🔵 [Encuestas DataTable] ========== FIN clearFiltersWithoutDrawerCallback ==========');
                      return;
                    }
                  }
                  console.warn('⚠️ [Encuestas DataTable] No se encontró botón "Limpiar" en el footer right del drawer abierto');
                } else {
                  console.warn('⚠️ [Encuestas DataTable] Footer right no encontrado en drawer abierto');
                }
              } else {
                console.warn('⚠️ [Encuestas DataTable] Footer no encontrado en drawer abierto');
              }
            } else {
              console.warn('⚠️ [Encuestas DataTable] Drawer no encontrado dentro del overlay abierto');
            }
          } else if (attempts >= maxAttempts) {
            console.warn(`⚠️ [Encuestas DataTable] No se pudo abrir el drawer después de ${maxAttempts} intentos`);
            clearInterval(checkInterval);
            // Remover el estilo que oculta el drawer si no se pudo abrir
            const hideStyle = document.getElementById('hide-drawer-temporarily');
            if (hideStyle) {
              hideStyle.remove();
              console.log('✅ [Encuestas DataTable] Estilo removido después de timeout');
            }
          }
        }, 100);
      } else {
        console.error('❌ [Encuestas DataTable] Filter button no encontrado');
      }
    } else {
      console.error('❌ [Encuestas DataTable] Header no encontrado');
    }
  }
};
```

---

## 🏗️ ESTRUCTURA DEL DRAWER

### **⚠️ IMPORTANTE: Selectores Correctos**

El drawer tiene la siguiente estructura:

```html
<div class="ubits-drawer-overlay ubits-drawer-overlay--open">
  <div class="ubits-drawer">
    <div class="ubits-drawer__header">...</div>
    <div class="ubits-drawer__body">...</div>
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        <div class="ubits-drawer__footer-left">
          <!-- Botón terciario (si existe) -->
        </div>
        <div class="ubits-drawer__footer-right">
          <button class="ubits-drawer__footer-button ubits-button ubits-button--secondary">
            Limpiar
          </button>
          <button class="ubits-drawer__footer-button ubits-button ubits-button--primary">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### **Selectores Correctos:**

1. **Drawer abierto:**
   ```javascript
   const drawerOverlay = document.querySelector('.ubits-drawer-overlay.ubits-drawer-overlay--open');
   ```
   ⚠️ **NO usar:** `.ubits-drawer[data-drawer-open="true"]` (esto NO existe)

2. **Drawer dentro del overlay:**
   ```javascript
   const drawer = drawerOverlay.querySelector('.ubits-drawer');
   ```

3. **Footer del drawer:**
   ```javascript
   const footer = drawer.querySelector('.ubits-drawer__footer');
   ```

4. **Botones del footer:**
   ```javascript
   const footerRight = footer.querySelector('.ubits-drawer__footer-right');
   const buttons = footerRight.querySelectorAll('.ubits-drawer__footer-button');
   ```
   ⚠️ **NO usar:** `.ubits-drawer__footer-buttons` (esto NO existe)

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

### **⚠️ OBLIGATORIO: Antes de Implementar**

1. **✅ Verificar que hay filtros:**
   - [ ] ¿Hay `header.filterButton` configurado?
   - [ ] ¿Hay `header.filterButton.filters` con filtros definidos?

2. **✅ Configurar empty state de filtros:**
   - [ ] ¿Está configurado `emptyState.noFilterResults`?
   - [ ] ¿Tiene `title`, `description`, `icon: 'filter'`?
   - [ ] ¿Tiene botón primario "Ajustar filtros" con `onAction`?
   - [ ] ¿Tiene botón secundario "Limpiar filtros" con `onSecondaryAction`?

3. **✅ Implementar funcionalidad de botones:**
   - [ ] ¿El botón "Ajustar filtros" abre el drawer correctamente?
   - [ ] ¿El botón "Limpiar filtros" limpia los filtros sin abrir el drawer visiblemente?
   - [ ] ¿Se guarda la instancia del DataTable en `window._encuestasDataTableInstance`?

4. **✅ Verificar selectores:**
   - [ ] ¿Se usa `.ubits-drawer-overlay.ubits-drawer-overlay--open` para detectar drawer abierto?
   - [ ] ¿Se usa `.ubits-drawer__footer-right` para encontrar los botones?
   - [ ] ¿Se usa `.ubits-drawer__footer-button` para encontrar cada botón?

5. **✅ Probar funcionalidad:**
   - [ ] ¿Aplicar filtros que no devuelvan resultados muestra el empty state?
   - [ ] ¿El botón "Ajustar filtros" abre el drawer?
   - [ ] ¿El botón "Limpiar filtros" limpia los filtros sin abrir el drawer visiblemente?
   - [ ] ¿Los filtros se limpian correctamente y se muestran los datos originales?

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: Usar Selector Incorrecto para Drawer Abierto**

**Problema:**
```javascript
// ❌ INCORRECTO: Este selector NO existe
const drawer = document.querySelector('.ubits-drawer[data-drawer-open="true"]');
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Usar la clase del overlay
const drawerOverlay = document.querySelector('.ubits-drawer-overlay.ubits-drawer-overlay--open');
const drawer = drawerOverlay?.querySelector('.ubits-drawer');
```

---

### **❌ ERROR 2: Usar Selector Incorrecto para Footer Buttons**

**Problema:**
```javascript
// ❌ INCORRECTO: Esta clase NO existe
const footerButtons = drawer.querySelector('.ubits-drawer__footer-buttons');
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Usar la estructura correcta
const footer = drawer.querySelector('.ubits-drawer__footer');
const footerRight = footer.querySelector('.ubits-drawer__footer-right');
const buttons = footerRight.querySelectorAll('.ubits-drawer__footer-button');
```

---

### **❌ ERROR 3: No Ocultar el Drawer Antes de Abrirlo**

**Problema:**
```javascript
// ❌ INCORRECTO: El drawer se ve al abrirlo
filterButton.click();
// Esperar y hacer click en "Limpiar"
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Ocultar el drawer ANTES de abrirlo
const style = document.createElement('style');
style.id = 'hide-drawer-temporarily';
style.textContent = '.ubits-drawer-overlay { opacity: 0 !important; pointer-events: none !important; }';
document.head.appendChild(style);
filterButton.click();
// Esperar y hacer click en "Limpiar"
// Remover el estilo después
```

---

### **❌ ERROR 4: No Implementar Ambos Botones**

**Problema:**
```javascript
// ❌ INCORRECTO: Solo un botón
noFilterResults: {
  actionLabel: 'Limpiar filtros',
  showPrimaryButton: true,
  onAction: () => {
    // Limpiar filtros
  }
}
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Dos botones con funcionalidades diferentes
noFilterResults: {
  // Botón primario: Abrir drawer
  actionLabel: 'Ajustar filtros',
  showPrimaryButton: true,
  onAction: () => {
    // Abrir drawer
  },
  // Botón secundario: Limpiar sin abrir drawer
  secondaryActionLabel: 'Limpiar filtros',
  showSecondaryButton: true,
  onSecondaryAction: () => {
    // Limpiar sin abrir drawer
  }
}
```

---

## 📋 REGLA DE ORO

**SIEMPRE que implementes el empty state de filtros:**

1. ✅ **Configurar DOS botones:**
   - Botón primario: "Ajustar filtros" → Abre el drawer
   - Botón secundario: "Limpiar filtros" → Limpia sin abrir drawer visiblemente

2. ✅ **Usar selectores correctos:**
   - `.ubits-drawer-overlay.ubits-drawer-overlay--open` para drawer abierto
   - `.ubits-drawer__footer-right` para encontrar botones
   - `.ubits-drawer__footer-button` para cada botón

3. ✅ **Ocultar drawer antes de abrirlo:**
   - Agregar CSS `opacity: 0` y `pointer-events: none` antes de abrir
   - Remover CSS después de limpiar

4. ✅ **Guardar instancia del DataTable:**
   - `window._encuestasDataTableInstance = window.createDataTable(...)`
   - Permite acceder al elemento desde callbacks

5. ✅ **Probar ambas funcionalidades:**
   - Botón "Ajustar filtros" debe abrir el drawer
   - Botón "Limpiar filtros" debe limpiar sin abrir drawer visiblemente

---

## 🔗 Referencias

- **Tipos del DataTable:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Implementación del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts`
- **Estructura del Drawer:** `vendor/ubits/packages/components/drawer/src/DrawerProvider.ts`
- **Análisis de Error:** `docs/guias/analisis/ANALISIS-ERROR-NO-IMPLEMENTAR-EMPTY-STATES-BUSQUEDA-FILTROS.md`
- **Errores Comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0






