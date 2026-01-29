# 🔄 Guía: Proceso de Restauración de Contenido en Templates UBITS

## ⚠️ Problema Identificado

Cuando el ContentManager ejecuta `updateContent`, reemplaza todo el contenido del contenedor `.content-sections`, eliminando cualquier contenido personalizado que hayamos agregado.

## ✅ Solución Implementada

### 1. **Guardar Contenido Antes de que se Reemplace**

```javascript
function saveContent() {
    // Buscar el contenedor de múltiples formas
    let contentSection = document.querySelector('.content-sections[data-section="encuestas"]');
    if (!contentSection) {
        contentSection = document.querySelector('.content-sections');
    }
    if (!contentSection) {
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentSection = contentArea.querySelector('.content-sections');
        }
    }
    
    if (contentSection && !savedContent) {
        savedContent = contentSection.innerHTML;
        console.log('🔍 [Encuestas] ✅ Contenido guardado');
    }
}
```

**Puntos clave:**
- Buscar el contenedor de múltiples formas (con y sin `data-section`)
- Guardar el contenido ANTES de que ContentManager lo reemplace
- Múltiples intentos para asegurar que se guarde

### 2. **Interceptar updateContent del ContentManager**

```javascript
function interceptContentManager() {
    if (window.UBITS_ContentManager && window.UBITS_ContentManager.updateContent) {
        const originalUpdateContent = window.UBITS_ContentManager.updateContent;
        window.UBITS_ContentManager.updateContent = function(...args) {
            console.log('🔍 [Encuestas] updateContent interceptado');
            
            // Guardar contenido antes de que se reemplace
            saveContent();
            
            // Ejecutar el método original
            const result = originalUpdateContent.apply(this, args);
            
            // Restaurar contenido después de un delay
            setTimeout(() => {
                restoreContent();
                ensureComponentsRegistered();
            }, 300);
            
            return result;
        };
    }
}
```

**Puntos clave:**
- Interceptar ANTES de que se ejecute el método original
- Guardar el contenido justo antes de que se reemplace
- Restaurar después de que ContentManager termine

### 3. **Restaurar Contenido Correctamente**

```javascript
function restoreContent() {
    // Buscar el contenedor
    let contentSection = document.querySelector('.content-sections');
    // ... buscar de múltiples formas ...
    
    if (contentSection && savedContent) {
        const currentContent = contentSection.innerHTML;
        const hasOurContent = currentContent.includes('ubits-tabs') || 
                             currentContent.includes('ubits-data-table');
        const hasOnlyHeader = currentContent.includes('ubits-header-section') && 
                            !hasOurContent;
        
        if (hasOnlyHeader || (!hasOurContent && currentContent.length < savedContent.length / 2)) {
            // Buscar el header-section si existe
            const headerSection = contentSection.querySelector('ubits-header-section');
            
            if (headerSection) {
                // Parsear el HTML guardado
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = savedContent;
                const savedWidget = tempDiv.querySelector('.widget-contenido-principal');
                
                if (savedWidget) {
                    // Crear nueva sección después del header
                    const newSection = document.createElement('div');
                    newSection.className = 'section-single';
                    newSection.innerHTML = savedWidget.outerHTML;
                    
                    // Insertar después del header
                    headerSection.parentElement.insertBefore(newSection, headerSection.nextSibling);
                }
            }
        }
    }
}
```

**Puntos clave:**
- Verificar si el contenido fue reemplazado
- Insertar nuestro contenido DESPUÉS del header-section (no reemplazarlo)
- Preservar el header-section que crea ContentManager

## 🎯 Mejoras Implementadas

### 1. **Usar Componentes UBITS Correctos**

✅ **CORRECTO:**
```html
<!-- Tabs de UBITS -->
<ubits-tabs class="encuestas-tabs" active-tab="encuestas">
    <ubits-tab id="encuestas" label="Encuestas"></ubits-tab>
    <ubits-tab id="datos-demograficos" label="Datos demográficos"></ubits-tab>
</ubits-tabs>

<!-- Input de UBITS -->
<ubits-input 
    type="search" 
    placeholder="Buscar encuestas..."
    icon-left="far fa-search"
></ubits-input>

<!-- Botones de UBITS -->
<ubits-button variant="primary" size="md" icon-left="far fa-plus">
    Crear encuesta
</ubits-button>

<!-- Tabla de UBITS -->
<ubits-data-table
    id="encuestas-table"
    columns='[...]'
    data='[...]'
></ubits-data-table>
```

❌ **INCORRECTO:**
```html
<!-- NO usar HTML estándar cuando hay componentes UBITS -->
<div class="encuestas-tabs">
    <button>Encuestas</button>
</div>
<input type="search" />
<button>Crear encuesta</button>
<table>...</table>
```

### 2. **Estructura Correcta del Contenido**

```html
<div class="content-sections" data-section="encuestas">
    <!-- Header creado por ContentManager -->
    <ubits-header-section>...</ubits-header-section>
    
    <!-- Nuestro contenido personalizado (restaurado) -->
    <div class="section-single">
        <div class="widget-contenido-principal" data-section="encuestas">
            <ubits-tabs>...</ubits-tabs>
            <!-- ... resto del contenido ... -->
            <ubits-data-table>...</ubits-data-table>
        </div>
    </div>
</div>
```

### 3. **Verificación de Componentes Web**

```javascript
function ensureComponentsRegistered() {
    const tabs = document.querySelector('ubits-tabs');
    const table = document.querySelector('ubits-data-table');
    
    if (window.customElements) {
        console.log('ubits-tabs definido:', customElements.get('ubits-tabs') !== undefined);
        console.log('ubits-data-table definido:', customElements.get('ubits-data-table') !== undefined);
        
        // Si no están definidos, esperar un poco más
        if (!customElements.get('ubits-tabs') || !customElements.get('ubits-data-table')) {
            setTimeout(ensureComponentsRegistered, 500);
        }
    }
}
```

## 📋 Checklist para Futuras Implementaciones

- [ ] **Usar componentes UBITS correctos:**
  - [ ] `ubits-tabs` para tabs (no HTML estándar)
  - [ ] `ubits-data-table` para tablas (no `<table>` HTML)
  - [ ] `ubits-input` para inputs (no `<input>` HTML)
  - [ ] `ubits-button` para botones (no `<button>` HTML)
  - [ ] `ubits-checkbox`, `ubits-status-tag`, `ubits-progress` para otros elementos

- [ ] **Estructura del contenido:**
  - [ ] Agregar `data-section="[nombre]"` al contenedor
  - [ ] Usar `.widget-contenido-principal` como wrapper
  - [ ] Insertar contenido DESPUÉS del header-section (no reemplazarlo)

- [ ] **Proceso de restauración:**
  - [ ] Guardar contenido ANTES de que ContentManager lo reemplace
  - [ ] Interceptar `updateContent` del ContentManager
  - [ ] Restaurar contenido DESPUÉS del header-section
  - [ ] Verificar que los componentes web estén definidos

- [ ] **Verificación:**
  - [ ] Los componentes se muestran correctamente
  - [ ] Los tabs funcionan
  - [ ] La tabla se renderiza correctamente
  - [ ] Los estilos UBITS se aplican correctamente

## 🚨 Errores Comunes a Evitar

1. ❌ **Usar HTML estándar en lugar de componentes UBITS**
   - ✅ Usar `ubits-tabs`, `ubits-data-table`, etc.

2. ❌ **Reemplazar el header-section**
   - ✅ Insertar contenido DESPUÉS del header-section

3. ❌ **No guardar el contenido antes de que se reemplace**
   - ✅ Guardar ANTES de que ContentManager ejecute `updateContent`

4. ❌ **No verificar si los componentes web están definidos**
   - ✅ Verificar con `customElements.get('ubits-*')`

5. ❌ **Usar componentes web que no existen**
   - ✅ Consultar `CATALOGO-COMPONENTES-UBITS.md` antes de usar

## 📚 Referencias

- **Catálogo de componentes:** `CATALOGO-COMPONENTES-UBITS.md`
- **Guía de uso:** `GUIA-USO-COMPONENTES-UBITS.md`
- **Estrategia:** `ESTRATEGIA-COMPONENTES-UBITS.md`

