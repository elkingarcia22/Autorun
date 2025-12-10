# 🔄 Guía: Sistema de Fallback de Storybook a GitHub

## 📋 Descripción

Sistema automático de fallback que intenta cargar el Storybook desde Vercel primero, y si falla, usa GitHub como respaldo.

---

## 🎯 Objetivo

Asegurar que el sistema siempre tenga acceso al Storybook, incluso si Vercel está caído o no disponible, usando el repositorio de GitHub como respaldo.

---

## ⚙️ Configuración

### **1. Configuración en UBITSPreset**

El sistema está configurado en `packages/autorun-core/src/wizard/UBITSPreset.ts`:

```typescript
storybook: {
  url: 'https://ubits-storybook10.vercel.app',
  // ⚠️ FALLBACK: URL de GitHub como respaldo si Vercel falla
  fallbackUrl: 'https://github.com/elkingarcia22/UBITS',
  bypassToken: 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT',
  // ...
  getFallbackUrl: (path: string = '') => {
    // Para archivos (JSON, JS, CSS), usar raw GitHub
    if (path.includes('.json') || path.includes('.js') || path.includes('.css')) {
      return `https://raw.githubusercontent.com/elkingarcia22/UBITS/main${path}`;
    }
    // Para URLs de navegación, usar GitHub Pages
    return `https://elkingarcia22.github.io/UBITS${path}`;
  },
}
```

---

## 🔄 Funcionamiento

### **1. Flujo Automático**

El sistema funciona automáticamente:

1. **Intenta Vercel primero:**
   - URL: `https://ubits-storybook10.vercel.app/...`
   - Si funciona → ✅ Usa Vercel
   - Si falla → ⚠️ Intenta GitHub

2. **Si Vercel falla, intenta GitHub:**
   - Para archivos: `https://raw.githubusercontent.com/elkingarcia22/UBITS/main/...`
   - Para navegación: `https://elkingarcia22.github.io/UBITS/...`
   - Si funciona → ✅ Usa GitHub
   - Si también falla → ❌ Error

### **2. Funciones Helper Disponibles**

#### **`getStorybookUrlWithFallback(path, options)`**

Obtiene la URL de Storybook con fallback automático:

```typescript
import { getStorybookUrlWithFallback } from '@autorun/core/helpers/storybookFallback';

// Obtener URL con verificación de disponibilidad
const result = await getStorybookUrlWithFallback('/components/button/manifest.json', {
  checkAvailability: true, // Verificar si Vercel está disponible
  timeout: 5000, // Timeout en ms
});

console.log(result.url); // URL final (Vercel o GitHub)
console.log(result.source); // 'vercel' o 'github'
console.log(result.usedFallback); // true si usó GitHub
```

#### **`fetchStorybookWithFallback(path, options)`**

Fetch con fallback automático:

```typescript
import { fetchStorybookWithFallback } from '@autorun/core/helpers/storybookFallback';

// Fetch con fallback automático
const response = await fetchStorybookWithFallback('/components/button/manifest.json');
const manifest = await response.json();
```

#### **`getComponentStorybookUrlWithFallback(componentName, storyName)`**

Obtiene URL de componente específico con fallback:

```typescript
import { getComponentStorybookUrlWithFallback } from '@autorun/core/helpers/storybookFallback';

const result = await getComponentStorybookUrlWithFallback('DataTable', 'default');
console.log(result.url); // URL del componente en Storybook
```

---

## 📝 Uso en el Código

### **1. ComponentLoader**

El `ComponentLoader` usa automáticamente el fallback:

```typescript
// Intenta Vercel primero
const response = await fetch(manifestUrl);

// Si falla, automáticamente intenta GitHub
// (manejado internamente por fetchStorybookWithFallback)
```

### **2. Component Helpers**

Los helpers de componentes usan el fallback automáticamente:

```typescript
import { autoConsultStorybookVercel } from '@autorun/core/helpers/componentHelpers';

// Consulta Storybook con fallback automático
const info = await autoConsultStorybookVercel('DataTable');
console.log(info.url); // URL (Vercel o GitHub)
console.log(info.source); // 'Vercel' o 'GitHub (fallback)'
```

---

## 🔍 Verificación de Disponibilidad

El sistema puede verificar si Vercel está disponible antes de usarlo:

```typescript
const result = await getStorybookUrlWithFallback('/path', {
  checkAvailability: true, // Verificar disponibilidad
  timeout: 5000, // Timeout de 5 segundos
});

if (result.usedFallback) {
  console.warn('⚠️ Vercel no está disponible, usando GitHub');
}
```

---

## ⚠️ Limitaciones

### **1. GitHub Pages**

Para que el fallback funcione completamente, GitHub Pages debe estar configurado:

- **Repositorio:** `https://github.com/elkingarcia22/UBITS`
- **GitHub Pages:** Debe estar habilitado y apuntar a la carpeta `storybook-static`
- **URL:** `https://elkingarcia22.github.io/UBITS/`

### **2. Raw GitHub**

Para archivos individuales (JSON, JS, CSS), se usa raw GitHub:

- **URL:** `https://raw.githubusercontent.com/elkingarcia22/UBITS/main/...`
- **Limitación:** Solo funciona para archivos individuales, no para navegación completa

### **3. CORS**

GitHub puede tener restricciones CORS. Si hay problemas:

1. Verificar que GitHub Pages esté configurado correctamente
2. Usar un proxy si es necesario
3. Considerar usar un CDN alternativo

---

## 🛠️ Configuración de GitHub Pages

Para habilitar GitHub Pages como fallback:

1. **Ir a Settings del repositorio:**
   - `https://github.com/elkingarcia22/UBITS/settings/pages`

2. **Configurar Source:**
   - Branch: `main`
   - Folder: `/storybook-static` (o la carpeta donde esté el build de Storybook)

3. **Verificar URL:**
   - Debería estar disponible en: `https://elkingarcia22.github.io/UBITS/`

---

## 📊 Logs y Monitoreo

El sistema registra cuando usa el fallback:

```
⚠️ [Storybook Fallback] Vercel no disponible, usando GitHub como fallback
⚠️ [ComponentLoader] Vercel falló, intentando fallback a GitHub para: /components/button/manifest.json
✅ [ComponentLoader] Manifest cargado desde GitHub (fallback)
```

---

## 🔗 Referencias

- **Repositorio GitHub:** https://github.com/elkingarcia22/UBITS
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/
- **GitHub Pages (si está configurado):** https://elkingarcia22.github.io/UBITS/
- **Raw GitHub:** https://raw.githubusercontent.com/elkingarcia22/UBITS/main/

---

## ✅ Checklist de Configuración

- [ ] GitHub Pages configurado y funcionando
- [ ] Build de Storybook en la carpeta correcta (`storybook-static`)
- [ ] Verificar que las URLs de fallback funcionen
- [ ] Probar el sistema con Vercel disponible
- [ ] Probar el sistema con Vercel no disponible (usar `forceFallback: true`)

---

**Última actualización:** 2025-01-XX


