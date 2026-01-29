# 🔍 Análisis Completo: Implementación de CardContent - 2025-12-30

## 📊 RESUMEN EJECUTIVO

**Estado:** ⚠️ **IMPLEMENTACIÓN PARCIAL CON HARDCODEO**

**Puntuación:** 6/10 = **60%** ⚠️

**Veredicto:** Se extrajo información básica de Storybook, pero se hardcodearon múltiples elementos que deberían venir del código fuente o Storybook.

---

## ✅ LO QUE SÍ SE EXTRAJO DE STORYBOOK (REAL)

### **1. Código de la Historia "Implementation"** ✅

**Fuente:** `vendor/ubits/packages/storybook/stories/components/CardContent/CardContent.stories.ts` (líneas 235-289)

**Extraído:**
```javascript
// ✅ REAL: Estructura de datos exacta
const cardElement = createCard({
  type: 'Curso',
  title: 'Segmenta la experiencia del cliente',
  provider: 'UBITS',
  providerLogo: '/images/providers/ubits-logo.png', // ⚠️ RUTA RELATIVA
  duration: '60 min',
  level: 'Básico',
  progress: 0,
  status: 'default',
  image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg', // ⚠️ RUTA RELATIVA
  competency: 'Product design',
  language: 'Español'
});
```

**✅ CORRECTO:**
- Estructura de datos (type, title, provider, etc.)
- Valores de ejemplo
- Comentarios con opciones disponibles
- Estructura básica del código

---

### **2. Props del Componente** ✅

**Fuente:** Storybook MCP `getComponentsProps`

**Extraído:**
- ✅ type: 'Curso' | 'Cápsula' | ... (11 tipos)
- ✅ title: string
- ✅ provider: 'UBITS' | 'Microsoft' | ... (18 proveedores)
- ✅ duration: '15 min' | '30 min' | ... (9 duraciones)
- ✅ level: 'Básico' | 'Intermedio' | 'Avanzado'
- ✅ progress: 0-100
- ✅ status: 'default' | 'progress' | 'completed'
- ✅ image: string
- ✅ competency: 'Product design' | ... (35 competencias)
- ✅ language: 'Español' | 'Inglés' | 'Portugués'

**✅ CORRECTO:** Todas las props se obtuvieron correctamente desde Storybook MCP.

---

## ❌ LO QUE ESTÁ HARDCODEADO (NO EXTRAÍDO)

### **1. Función `getProviderLogo()`** ❌ HARDCODEADA

**Ubicación:** `prototypes/canvas-administrador-encuestas-2025-12-30.html` (líneas 2260-2282)

**Código Hardcodeado:**
```javascript
function getProviderLogo(provider) {
  const PROVIDERS = {
    'UBITS': 'https://ubits-storybook10.vercel.app/images/Favicons/UBITS.jpg',
    'Microsoft': 'https://ubits-storybook10.vercel.app/images/Favicons/Microsoft.jpg',
    // ... 18 proveedores hardcodeados
  };
  return PROVIDERS[provider] || PROVIDERS['UBITS'];
}
```

**❌ PROBLEMA:**
- **NO se extrajo de Storybook** - La historia "implementation" solo muestra `providerLogo: '/images/providers/ubits-logo.png'` (ruta relativa)
- **NO se extrajo del código fuente** - Debería venir de `vendor/ubits/packages/components/card/src/configs/cardConfigs.ts` (líneas 97-116)
- **Rutas incorrectas:**
  - Código fuente usa: `assets/images/Favicons/UBITS.jpg`
  - Implementación usa: `https://ubits-storybook10.vercel.app/images/Favicons/UBITS.jpg`
  - Storybook muestra: `/images/providers/ubits-logo.png` (diferente ruta)

**✅ DEBERÍA SER:**
```javascript
// Extraer de cardConfigs.ts
import { PROVIDERS } from '@ubits/card/configs/cardConfigs';
// O desde Storybook si está disponible
```

---

### **2. Función `renderIconHelper()`** ❌ HARDCODEADA

**Ubicación:** `prototypes/canvas-administrador-encuestas-2025-12-30.html` (líneas 2284-2289)

**Código Hardcodeado:**
```javascript
function renderIconHelper(iconName, iconStyle = 'regular') {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}
```

**❌ PROBLEMA:**
- **NO se extrajo de Storybook** - La historia "implementation" no muestra esta función
- **SÍ existe en el código fuente** - `vendor/ubits/packages/components/card/src/CardContentProvider.ts` (líneas 11-15)
- **Implementación idéntica** - Pero debería venir del código fuente, no hardcodeada

**✅ DEBERÍA SER:**
```javascript
// Extraer de CardContentProvider.ts
import { renderIconHelper } from '@ubits/card/CardContentProvider';
// O usar directamente desde el código fuente
```

---

### **3. HTML del Fallback** ❌ HARDCODEADO (PARCIALMENTE CORRECTO)

**Ubicación:** `prototypes/canvas-administrador-encuestas-2025-12-30.html` (líneas 2348-2401)

**Código Hardcodeado:**
```html
<div class="course-card" data-progress="0" data-status="default">
  <!-- HTML completo hardcodeado -->
</div>
```

**❌ PROBLEMA:**
- **NO se extrajo directamente de Storybook** - La historia "implementation" muestra código JavaScript, no HTML
- **Basado en `renderCardContent()`** - Pero no es exactamente igual
- **Diferencias:**
  - Iconos renderizados diferente (línea 2382: `renderIconHelper('gauge-min', 'regular')` vs código fuente usa `levelIcon.replace('far ', '')`)
  - Estructura HTML similar pero no idéntica

**✅ DEBERÍA SER:**
```javascript
// Extraer HTML directamente de renderCardContent() del código fuente
import { renderCardContent } from '@ubits/card/CardContentProvider';
const cardHTML = renderCardContent(cardData);
```

---

### **4. Valores de Ejemplo** ⚠️ HARDCODEADOS (PERO CORRECTOS)

**Ubicación:** `prototypes/canvas-administrador-encuestas-2025-12-30.html` (líneas 2313-2323)

**Código Hardcodeado:**
```javascript
const cardElement = window.createCard({
  type: 'Curso',
  title: 'Segmenta la experiencia del cliente',
  provider: 'UBITS',
  // ... valores hardcodeados
});
```

**⚠️ PROBLEMA:**
- **SÍ se extrajo de Storybook** - Estos valores vienen de la historia "implementation"
- **Pero están hardcodeados** - Deberían ser configurables o venir de props del usuario

**✅ CORRECTO:** Los valores son correctos y vienen de Storybook, pero deberían ser configurables.

---

### **5. Configuraciones LEVELS y STATUSES** ❌ HARDCODEADAS

**Ubicación:** `prototypes/canvas-administrador-encuestas-2025-12-30.html` (líneas 2334-2343)

**Código Hardcodeado:**
```javascript
const LEVELS = {
  'Básico': 'far fa-gauge-min',
  'Intermedio': 'far fa-gauge',
  'Avanzado': 'far fa-gauge-max'
};
const STATUSES = {
  'default': { class: '', text: '' },
  'progress': { class: 'course-status--progress', text: 'En progreso' },
  'completed': { class: 'course-status--completed', text: 'Completado' }
};
```

**❌ PROBLEMA:**
- **NO se extrajo de Storybook** - La historia "implementation" no muestra estas configuraciones
- **SÍ existe en el código fuente** - `vendor/ubits/packages/components/card/src/configs/cardConfigs.ts` (líneas 62-94)
- **Implementación idéntica** - Pero debería venir del código fuente

**✅ DEBERÍA SER:**
```javascript
// Extraer de cardConfigs.ts
import { LEVELS, STATUSES } from '@ubits/card/configs/cardConfigs';
```

---

## 🚨 ERRORES CRÍTICOS

### **ERROR 1: `window.createCard` NO EXISTE** ❌

**Problema:**
```javascript
if (window.createCard) { // ❌ Esta función NO existe globalmente
  const cardElement = window.createCard({...});
}
```

**Causa:**
- El código fuente muestra que `createCard` es una función **exportada**, no una función global
- No hay un `CardAddon` que exponga `window.createCard` (a diferencia de otros componentes como `StatsCard` que sí tienen `window.UBITS.StatsCard.create`)
- La historia "implementation" muestra `createCard()` pero NO dice que sea `window.createCard`

**Evidencia:**
- `vendor/ubits/packages/components/card/src/index.ts` solo exporta: `export { renderCardContent, loadCardContent, createCard }`
- No hay `CardAddon.ts` que exponga `window.createCard`
- Otros componentes como `StatsCard` tienen `StatsCardAddon.ts` que expone `window.UBITS.StatsCard.create`

**Solución:**
```javascript
// ❌ INCORRECTO:
if (window.createCard) { ... }

// ✅ CORRECTO (opción 1): Usar renderCardContent directamente
import { renderCardContent } from '@ubits/card';
const cardHTML = renderCardContent(cardData);
container.innerHTML = cardHTML;

// ✅ CORRECTO (opción 2): Verificar si el componente está cargado desde components-loader.js
if (window.UBITS?.Card?.create) {
  const cardElement = window.UBITS.Card.create(cardData);
}
```

---

### **ERROR 2: Rutas de PROVIDERS Incorrectas** ❌

**Problema:**
```javascript
// Código fuente (cardConfigs.ts):
'UBITS': 'assets/images/Favicons/UBITS.jpg'

// Implementación hardcodeada:
'UBITS': 'https://ubits-storybook10.vercel.app/images/Favicons/UBITS.jpg'

// Storybook muestra:
providerLogo: '/images/providers/ubits-logo.png'
```

**Causa:**
- **3 rutas diferentes** para el mismo logo
- Código fuente usa: `assets/images/Favicons/UBITS.jpg`
- Storybook muestra: `/images/providers/ubits-logo.png`
- Implementación usa: `https://ubits-storybook10.vercel.app/images/Favicons/UBITS.jpg`

**Solución:**
- Extraer PROVIDERS del código fuente (`cardConfigs.ts`)
- Convertir rutas relativas a URLs de Vercel dinámicamente
- O usar la función `getProviderLogo()` de Storybook si está disponible

---

### **ERROR 3: HTML del Fallback No Es Exacto** ⚠️

**Problema:**
El HTML del fallback está basado en `renderCardContent()` pero tiene diferencias:

**Código Fuente (`CardContentProvider.ts` línea 65):**
```javascript
renderIconHelper(levelIcon.replace('far ', '').replace('fas ', ''), levelIcon.startsWith('far') ? 'regular' : 'solid')
```

**Implementación (línea 2382):**
```javascript
renderIconHelper('gauge-min', 'regular') // ❌ Simplificado, puede no funcionar igual
```

**Causa:**
- El HTML se generó manualmente basado en el código fuente
- No se extrajo directamente de `renderCardContent()`
- Diferencias sutiles en cómo se renderizan los iconos

**Solución:**
- Extraer HTML directamente de `renderCardContent()` del código fuente
- O usar `renderCardContent()` directamente si está disponible

---

## 📋 RESUMEN: QUÉ SE EXTRAJO VS QUÉ ESTÁ HARDCODEADO

| Elemento | Fuente Real | Estado | Notas |
|----------|-------------|--------|-------|
| **Estructura de datos** | Storybook "implementation" | ✅ REAL | Extraído correctamente |
| **Props del componente** | Storybook MCP | ✅ REAL | Extraído correctamente |
| **Valores de ejemplo** | Storybook "implementation" | ⚠️ HARDCODEADO | Correctos pero hardcodeados |
| **Función `getProviderLogo()`** | ❌ NO EXTRAÍDO | ❌ HARDCODEADA | Debería venir de `cardConfigs.ts` |
| **Mapeo PROVIDERS** | ❌ NO EXTRAÍDO | ❌ HARDCODEADO | Debería venir de `cardConfigs.ts` |
| **Función `renderIconHelper()`** | ❌ NO EXTRAÍDO | ❌ HARDCODEADA | Debería venir de `CardContentProvider.ts` |
| **Configuraciones LEVELS** | ❌ NO EXTRAÍDO | ❌ HARDCODEADA | Debería venir de `cardConfigs.ts` |
| **Configuraciones STATUSES** | ❌ NO EXTRAÍDO | ❌ HARDCODEADA | Debería venir de `cardConfigs.ts` |
| **HTML del fallback** | ❌ NO EXTRAÍDO | ❌ HARDCODEADO | Debería venir de `renderCardContent()` |
| **`window.createCard`** | ❌ NO EXISTE | ❌ ERROR | Esta función no existe globalmente |

---

## ✅ LO QUE SÍ FUNCIONA

1. ✅ **Detección del componente** - Se detectó correctamente "CardContent"
2. ✅ **Obtención de props** - Se obtuvieron todas las props desde Storybook MCP
3. ✅ **Navegación a Storybook** - Se navegó correctamente a implementation → docs → default
4. ✅ **Extracción de código** - Se extrajo el código de la historia "implementation"
5. ✅ **Registro en AUTORUN_PRESERVE_COMPONENTS** - Se registró correctamente
6. ✅ **MutationObserver** - Detecta cuando se crea el HeaderSection

---

## ❌ LO QUE NO FUNCIONA

1. ❌ **`window.createCard` no existe** - El código intenta usar una función que no está disponible globalmente
2. ❌ **Rutas de PROVIDERS incorrectas** - Las rutas no coinciden con el código fuente ni Storybook
3. ❌ **HTML del fallback no es exacto** - Diferencias sutiles con `renderCardContent()`
4. ❌ **Configuraciones hardcodeadas** - LEVELS, STATUSES, PROVIDERS deberían venir del código fuente

---

## 🔧 SOLUCIONES NECESARIAS

### **1. Extraer PROVIDERS del Código Fuente**

```typescript
// En autorun.apply(), después de extraer código de Storybook:
import { PROVIDERS } from 'vendor/ubits/packages/components/card/src/configs/cardConfigs';
// O parsear desde el archivo TypeScript directamente
```

### **2. Extraer `renderCardContent()` del Código Fuente**

```typescript
// En autorun.apply(), extraer la función renderCardContent completa:
import { renderCardContent } from 'vendor/ubits/packages/components/card/src/CardContentProvider';
// O parsear desde el archivo TypeScript directamente
```

### **3. Verificar Disponibilidad Real de `window.createCard`**

```typescript
// Verificar si existe window.UBITS.Card.create o similar
if (window.UBITS?.Card?.create) {
  // Usar window.UBITS.Card.create
} else if (window.createCard) {
  // Usar window.createCard (si existe)
} else {
  // Usar renderCardContent() directamente
}
```

### **4. Convertir Rutas Relativas a URLs de Vercel**

```typescript
// Función para convertir rutas relativas a URLs de Vercel
function convertToVercelUrl(relativePath: string): string {
  const baseUrl = 'https://ubits-storybook10.vercel.app';
  // Convertir assets/images/... a /images/...
  const convertedPath = relativePath.replace('assets/images/', '/images/');
  return `${baseUrl}${convertedPath}`;
}
```

---

## 📊 PUNTUACIÓN FINAL

| Categoría | Puntuación | Notas |
|-----------|-----------|-------|
| **Extracción de Storybook** | 7/10 | Se extrajo estructura y props, pero no funciones helper |
| **Extracción del Código Fuente** | 0/10 | No se extrajo nada del código fuente |
| **Implementación Correcta** | 5/10 | Funciona con fallback, pero `window.createCard` no existe |
| **Sin Hardcodeo** | 3/10 | Muchas cosas hardcodeadas que deberían venir del código fuente |
| **TOTAL** | **6/10** | ⚠️ Funciona pero con mucho hardcodeo |

---

## 🎯 CONCLUSIÓN

**La implementación funciona parcialmente**, pero tiene **mucho hardcodeo** que debería venir del código fuente o Storybook:

1. ✅ **SÍ se extrajo:** Estructura de datos, props, valores de ejemplo
2. ❌ **NO se extrajo:** Funciones helper, configuraciones, HTML exacto
3. ❌ **ERROR CRÍTICO:** `window.createCard` no existe globalmente
4. ⚠️ **FUNCIONA:** Con el fallback de HTML hardcodeado, pero no es la solución ideal

**Recomendación:** Mejorar `autorun.apply()` para extraer también funciones helper y configuraciones del código fuente, no solo el código de la historia "implementation".
