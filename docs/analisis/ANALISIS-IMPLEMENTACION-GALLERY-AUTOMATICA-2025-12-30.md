# 🔍 Análisis Paso a Paso: Implementación Automática de Gallery

## 📋 Objetivo

**Implementar Gallery usando el sistema automático y analizar cada paso para verificar:**
- ✅ No hay nada hardcodeado
- ✅ Todo funciona perfectamente
- ✅ El código se genera automáticamente desde Storybook

---

## 🚀 PASO 1: Llamar autorun.apply()

### **Comando:**
```typescript
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: 'implementar gallery',
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-29.html']
  }
});
```

### **Lo que debe hacer:**
1. ✅ Detectar componente "gallery"
2. ✅ Obtener storybookId "layout-gallery"
3. ✅ Extraer código desde Storybook
4. ✅ Usar sistema automático para generar código ejecutable
5. ✅ Insertar en template

---

## 🔍 PASO 2: Detección del Componente

### **Archivo:** `packages/autorun-core/src/helpers/autoMessageHandler.ts`

**Proceso:**
1. `handleUserMessage()` detecta "gallery" en el mensaje
2. Mapea "gallery" → "layout-gallery" (storybookId)
3. Retorna información del componente

**Verificación:**
- ✅ Componente detectado: "gallery"
- ✅ StorybookId: "layout-gallery"
- ✅ API esperada: "window.UBITS.Gallery.create"

---

## 🔍 PASO 3: Extracción de Código desde Storybook

### **Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Proceso:**
1. Navega a Storybook: `https://ubits-storybook10.vercel.app/?path=/story/layout-gallery--implementation`
2. Extrae código desde pestaña "Code"
3. Retorna snippet con HTML y JavaScript

**Código Extraído (ejemplo):**
```javascript
// 1. Crear contenedor HTML
<div id="gallery-implementation-container"></div>

// 2. Crear Gallery
const galleryElement = window.UBITS.Gallery.create({
  items: [ /* ... */ ],
  layout: 'grid',
  size: 'md',
  columns: 3,
  gap: 16,
  showThumbnails: false,
  lazyLoad: false,
  lightbox: true,
  aspectRatio: undefined,
  onItemClick: (item, index) => {
    console.log('Item clickeado:', item, index);
  },
  onImageLoad: (item, index) => {
    console.log('Imagen cargada:', item, index);
  },
  onImageError: (item, index) => {
    console.error('Error cargando imagen:', item, index);
  }
});

// 3. Insertar en el contenedor
const container = document.getElementById('gallery-implementation-container');
if (container) {
  container.appendChild(galleryElement);
}
```

**Verificación:**
- ✅ Código extraído desde Storybook (NO hardcodeado)
- ✅ Incluye contenedor HTML
- ✅ Incluye código JavaScript
- ✅ Usa `window.UBITS.Gallery.create()`

---

## 🔍 PASO 4: Detección de Disponibilidad

### **Archivo:** `packages/autorun-core/src/helpers/componentAvailabilityDetector.ts`

**Proceso:**
1. `getComponentAPIInfo("gallery")` busca en mapeo
2. Encuentra: `{ apiName: "window.UBITS.Gallery.create", addonName: "@ubits/gallery", storybookId: "layout-gallery" }`
3. Verifica si está disponible en `window` (solo en navegador, en Node.js retorna `needsLoad: true`)

**Resultado:**
```typescript
{
  available: false, // En Node.js siempre false
  apiName: "window.UBITS.Gallery.create",
  needsLoad: true,  // Gallery no está en components-loader.js
  addonName: "@ubits/gallery"
}
```

**Verificación:**
- ✅ API detectada correctamente
- ✅ Necesita carga (no está en components-loader.js)
- ✅ Información completa disponible

---

## 🔍 PASO 5: Generación de Código Ejecutable

### **Archivo:** `packages/autorun-core/src/helpers/executableCodeGenerator.ts`

**Proceso:**
1. Extrae contenedor HTML del snippet: `<div id="gallery-implementation-container"></div>`
2. Limpia código JavaScript (remueve comentarios, ejemplos)
3. Genera función `createGallery()` automáticamente
4. Agrega lógica de espera para UBITS
5. Integra con flujo de inicialización
6. Registra en AUTORUN_PRESERVE_COMPONENTS

**Código Generado (ejemplo):**
```javascript
// ========================================
// CREAR GALLERY - GENERADO AUTOMÁTICAMENTE POR AUTORUN
// ========================================
function createGallery() {
  const container = document.getElementById('gallery-implementation-container');
  if (!container) {
    console.warn('⚠️ [Gallery] Contenedor no encontrado: gallery-implementation-container');
    return;
  }
  
  // Verificar que la API esté disponible
  const apiPath = 'window.UBITS.Gallery.create'.split('.');
  let api = window;
  for (const part of apiPath) {
    if (api[part] === undefined) {
      console.warn('⚠️ [Gallery] window.UBITS.Gallery.create no está disponible, esperando...');
      setTimeout(createGallery, 500);
      return;
    }
    api = api[part];
  }
  
  try {
    // Código extraído de Storybook (SIN hardcode)
    const galleryElement = window.UBITS.Gallery.create({
      items: [ /* ... items desde Storybook ... */ ],
      layout: 'grid',
      size: 'md',
      columns: 3,
      gap: 16,
      showThumbnails: false,
      lazyLoad: false,
      lightbox: true,
      aspectRatio: undefined,
      onItemClick: (item, index) => {
        console.log('Item clickeado:', item, index);
      },
      onImageLoad: (item, index) => {
        console.log('Imagen cargada:', item, index);
      },
      onImageError: (item, index) => {
        console.error('Error cargando imagen:', item, index);
      }
    });
    
    const container = document.getElementById('gallery-implementation-container');
    if (container) {
      container.appendChild(galleryElement);
    }
    
    console.log('✅ [Gallery] Gallery creado exitosamente usando window.UBITS.Gallery.create');
    
    // Registrar para preservación automática
    if (window.AUTORUN_PRESERVE_COMPONENTS) {
      window.AUTORUN_PRESERVE_COMPONENTS.register('gallery', 'gallery-implementation-container', {
        onClick: (e) => {
          console.log('📋 [Gallery] Gallery clickeada');
        }
      });
    }
  } catch (error) {
    console.error('❌ [Gallery] Error al crear gallery:', error);
    console.error('   Stack:', error.stack);
  }
}

// Ejecutar después de que los componentes estén cargados
setTimeout(createGallery, 500);
```

**Verificación:**
- ✅ Función generada automáticamente (NO hardcodeada)
- ✅ Lógica de espera para UBITS automática
- ✅ Código desde Storybook (NO hardcodeado)
- ✅ Registro automático en AUTORUN_PRESERVE_COMPONENTS
- ✅ Manejo de errores automático

---

## 🔍 PASO 6: Inserción en Template

### **Archivo:** `packages/autorun-core/src/adapters/HtmlPrototypeAdapter.ts`

**Proceso:**
1. `insertContentBlock()` recibe:
   - `filePath`: `prototypes/canvas-administrador-encuestas-2025-12-29.html`
   - `htmlBlockWithWatermark`: Código con watermark
   - `componentName`: "gallery"
   - `storybookId`: "layout-gallery"

2. Obtiene API info: `window.UBITS.Gallery.create`

3. Extrae snippet del watermark

4. Genera código ejecutable (PASO 5)

5. Busca `.content-area` en el template

6. Inserta contenedor dentro de `.content-area`:
```html
<div class="content-area">
    <!-- AUTORUN: {"v":2,"mode":"prototypeTokens","components":["layout-gallery"],"storybookId":"layout-gallery","hash":"..."} -->
    <div id="gallery-implementation-container" style="padding: var(--ubits-spacing-xl, 20px) 0;"></div>
    <!-- /AUTORUN -->
    <!-- ... otros contenedores ... -->
</div>
```

7. Inserta script en anchor SCRIPTS:
```html
<!-- AUTORUN:ANCHOR:SCRIPTS -->
<!-- AUTORUN: {"v":2,"mode":"prototypeTokens","components":["layout-gallery"],"storybookId":"layout-gallery","hash":"..."} -->
<script>
function createGallery() {
  // ... código generado automáticamente ...
}
setTimeout(createGallery, 500);
</script>
<!-- /AUTORUN -->
```

**Verificación:**
- ✅ Contenedor insertado en `.content-area` (NO fuera)
- ✅ Script insertado en anchor SCRIPTS
- ✅ Watermark aplicado correctamente
- ✅ Todo generado automáticamente (NO hardcodeado)

---

## 🔍 PASO 7: Verificación Final

### **Archivo:** `prototypes/canvas-administrador-encuestas-2025-12-29.html`

**Verificaciones:**

1. **✅ Contenedor en .content-area:**
```html
<div class="content-area">
    <!-- AUTORUN: ... -->
    <div id="gallery-implementation-container" style="padding: var(--ubits-spacing-xl, 20px) 0;"></div>
    <!-- /AUTORUN -->
</div>
```

2. **✅ Script de inicialización:**
```html
<!-- AUTORUN:ANCHOR:SCRIPTS -->
<!-- AUTORUN: ... -->
<script>
function createGallery() {
  // ... código generado automáticamente ...
}
setTimeout(createGallery, 500);
</script>
<!-- /AUTORUN -->
```

3. **✅ NO hay función hardcodeada `createGallery()`:**
   - ❌ NO debe existir función `createGallery()` hardcodeada en el template
   - ✅ Solo debe existir la función generada automáticamente

4. **✅ NO hay llamada hardcodeada:**
   - ❌ NO debe existir `setTimeout(createGallery, 500)` hardcodeado
   - ✅ Solo debe existir la llamada generada automáticamente

---

## 📊 Comparación: Antes vs Después

### **ANTES (Hardcodeado):**
```javascript
// ❌ Función hardcodeada en el template (línea ~1459)
function createGallery() {
  const galleryContainer = document.getElementById('gallery-implementation-container');
  // ... código hardcodeado ...
  const galleryElement = window.UBITS.Gallery.create({
    items: [ /* hardcodeado */ ],
    // ... más código hardcodeado ...
  });
  galleryContainer.appendChild(galleryElement);
}

// ❌ Llamada hardcodeada (línea ~1538)
setTimeout(createGallery, 500);
```

### **DESPUÉS (Automático):**
```javascript
// ✅ Función generada automáticamente desde Storybook
function createGallery() {
  // ... código desde Storybook (NO hardcodeado) ...
  const galleryElement = window.UBITS.Gallery.create({
    items: [ /* desde Storybook */ ],
    // ... código desde Storybook ...
  });
  // ... lógica automática de espera, registro, etc. ...
}

// ✅ Llamada generada automáticamente
setTimeout(createGallery, 500);
```

**Diferencia clave:**
- ✅ **ANTES:** Código hardcodeado en el template
- ✅ **DESPUÉS:** Código generado automáticamente desde Storybook

---

## ✅ Checklist de Verificación

### **Código Generado:**
- ✅ Función `createGallery()` generada automáticamente
- ✅ Lógica de espera para UBITS automática
- ✅ Código desde Storybook (NO hardcodeado)
- ✅ Registro en AUTORUN_PRESERVE_COMPONENTS automático
- ✅ Manejo de errores automático

### **Inserción en Template:**
- ✅ Contenedor insertado en `.content-area`
- ✅ Script insertado en anchor SCRIPTS
- ✅ Watermark aplicado correctamente
- ✅ Todo generado automáticamente

### **NO Hardcodeado:**
- ✅ NO hay función `createGallery()` hardcodeada
- ✅ NO hay llamada `setTimeout(createGallery, 500)` hardcodeada
- ✅ Todo se genera automáticamente desde Storybook

---

## 🎯 Resultado Esperado

**Después de implementar Gallery:**

1. **✅ Contenedor en .content-area:**
   - `<div id="gallery-implementation-container">` dentro de `.content-area`

2. **✅ Script de inicialización:**
   - Función `createGallery()` generada automáticamente
   - Llamada `setTimeout(createGallery, 500)` generada automáticamente

3. **✅ NO hay hardcode:**
   - NO hay función hardcodeada
   - NO hay llamada hardcodeada
   - Todo se genera automáticamente

4. **✅ Funcionalidad:**
   - Gallery se crea automáticamente cuando UBITS está disponible
   - Se registra en AUTORUN_PRESERVE_COMPONENTS
   - Funciona correctamente sin intervención manual

---

## 🚀 Próximo Paso

**Ejecutar implementación y analizar resultado paso a paso.**

¿Quieres que ejecute la implementación ahora?
