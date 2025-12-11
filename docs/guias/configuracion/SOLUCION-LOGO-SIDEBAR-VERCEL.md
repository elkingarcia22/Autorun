# ✅ Solución: Logo del Sidebar No Se Ve - Cargar desde Vercel

## 📋 Problema

**Síntoma:**
- El logo del sidebar no se muestra
- La imagen del logo no se carga

**Causa:**
- El script de ajuste de rutas estaba usando rutas locales (`../vendor/ubits/packages/templates`)
- Las imágenes no se cargaban porque no estaban disponibles en la ruta local
- Necesitaba usar el proxy de Vercel para cargar las imágenes

---

## ✅ Solución Implementada

### **1. Actualizar Script de Ajuste de Rutas**

**Archivo:** `prototypes/canvas-administrador-encuestas-2025-12-09.html`

**Cambio en líneas ~3627-3647:**

**ANTES (rutas locales):**
```javascript
const ubitsTemplatesPath = `../vendor/ubits/packages/templates`;

// Ajustar rutas de imágenes
if (typeof obj[key] === 'string' && obj[key].startsWith('assets/')) {
  obj[key] = ubitsTemplatesPath + '/' + obj[key];
}
```

**DESPUÉS (rutas de Vercel):**
```javascript
// ⚠️ CRÍTICO: Usar ruta de Vercel a través del proxy para imágenes
const vercelAssetsPath = `/vercel-proxy/templates/assets`;

// Ajustar rutas de imágenes para usar Vercel
if (typeof obj[key] === 'string') {
  // Si ya es una ruta de Vercel o absoluta, no cambiar
  if (obj[key].startsWith('/vercel-proxy/') || obj[key].startsWith('http')) {
    continue; // Ya está configurado correctamente
  }
  
  // Si empieza con 'assets/', cambiar a ruta de Vercel
  if (obj[key].startsWith('assets/')) {
    // Cambiar 'assets/images/Ubits-logo.svg' a '/vercel-proxy/templates/assets/images/Ubits-logo.svg'
    obj[key] = vercelAssetsPath + '/' + obj[key];
    console.log(`🖼️ [Wizard] Ruta de imagen ajustada: ${obj[key]}`);
  } else if (!obj[key].startsWith('/') && !obj[key].startsWith('http')) {
    // Si es una ruta relativa sin 'assets/', asumir que está en 'images/'
    obj[key] = vercelAssetsPath + '/images/' + obj[key];
    console.log(`🖼️ [Wizard] Ruta de imagen ajustada (relativa): ${obj[key]}`);
  }
}
```

### **2. Rutas Disponibles en Vercel**

**Logo:**
- ✅ `/vercel-proxy/templates/assets/images/Ubits-logo.svg` (HTTP 200)
- ✅ `/vercel-proxy/images/Ubits-logo.svg` (HTTP 200)

**Avatar:**
- ✅ `/vercel-proxy/templates/assets/images/Profile-image.jpg` (HTTP 200)

---

## 🔍 Verificación

### **1. Verificar Disponibilidad en Vercel:**

```bash
# Verificar logo
curl -I "https://ubits-storybook10.vercel.app/templates/assets/images/Ubits-logo.svg"
# Respuesta esperada: HTTP/2 200 ✅

# Verificar a través del proxy local
curl -I "http://localhost:3000/vercel-proxy/templates/assets/images/Ubits-logo.svg"
# Respuesta esperada: HTTP/1.1 200 OK ✅
```

### **2. Verificar en el Navegador:**

1. Abrir el template: `http://localhost:3000/prototypes/canvas-administrador-encuestas-2025-12-09.html`
2. Abrir DevTools (F12)
3. Ir a la pestaña "Network"
4. Filtrar por "logo" o "Ubits-logo"
5. Verificar que la imagen se carga con código 200

### **3. Verificar en la Consola:**

Buscar mensajes como:
```
🖼️ [Wizard] Ruta de imagen ajustada: /vercel-proxy/templates/assets/images/Ubits-logo.svg
🖼️ [Wizard] Ruta de imagen ajustada: /vercel-proxy/templates/assets/images/Profile-image.jpg
```

---

## 📝 Configuración en products.js

**Archivo:** `vendor/ubits/packages/templates/config/products.js`

**Configuración actual:**
```javascript
avatarImage: 'assets/images/Profile-image.jpg',
logoImage: 'assets/images/Ubits-logo.svg',
```

**El script automáticamente convierte estas rutas a:**
```javascript
avatarImage: '/vercel-proxy/templates/assets/images/Profile-image.jpg',
logoImage: '/vercel-proxy/templates/assets/images/Ubits-logo.svg',
```

---

## ⚠️ Reglas Importantes

### **1. SIEMPRE Usar Vercel para Imágenes**

**✅ CORRECTO:**
- Usar `/vercel-proxy/templates/assets/images/...` para imágenes
- El script automáticamente ajusta las rutas

**❌ EVITAR:**
- Usar rutas locales (`../vendor/ubits/packages/templates/...`)
- Hardcodear rutas absolutas sin el proxy

### **2. Verificar Disponibilidad ANTES de Usar**

**Siempre verificar que la imagen está disponible en Vercel:**
```bash
curl -I "https://ubits-storybook10.vercel.app/templates/assets/images/[NOMBRE-IMAGEN]"
```

**Solo usar si la respuesta es HTTP 200.**

### **3. El Script Ajusta Automáticamente**

**No necesitas cambiar manualmente las rutas en `products.js`:**
- El script detecta rutas que empiezan con `assets/`
- Las convierte automáticamente a rutas de Vercel
- Funciona para `logoImage`, `avatarImage`, y `avatar`

---

## 🎯 Resultado

**Después de la solución:**
- ✅ Logo del sidebar se carga desde Vercel
- ✅ Avatar del usuario se carga desde Vercel
- ✅ Todas las imágenes usan el proxy de Vercel
- ✅ No hay dependencias de archivos locales para imágenes

---

## 📚 Archivos Modificados

1. `prototypes/canvas-administrador-encuestas-2025-12-09.html`
   - Líneas ~3627-3647: Script de ajuste de rutas actualizado

---

## 🔄 Para Futuros Templates

**Al crear nuevos templates, asegúrate de:**

1. ✅ Usar el mismo script de ajuste de rutas
2. ✅ Verificar que las imágenes están disponibles en Vercel
3. ✅ Usar rutas relativas en `products.js` (el script las ajusta automáticamente)
4. ✅ No hardcodear rutas absolutas sin el proxy

---

## ✅ Checklist de Verificación

- [ ] Script de ajuste de rutas actualizado para usar Vercel
- [ ] Logo disponible en Vercel (verificado con curl)
- [ ] Avatar disponible en Vercel (verificado con curl)
- [ ] Logo se muestra en el sidebar (verificado en navegador)
- [ ] Avatar se muestra en el sidebar (verificado en navegador)
- [ ] No hay errores 404 en la consola del navegador
- [ ] Mensajes de ajuste de rutas aparecen en la consola




