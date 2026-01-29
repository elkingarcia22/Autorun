# 📖 Guía Completa: Trabajar con Templates UBITS en Autorun

> **⚠️ IMPORTANTE:** Este documento DEBE ser leído por cualquier Cursor chat antes de trabajar en templates UBITS.

## 🎯 Objetivo

Esta guía explica cómo trabajar correctamente con los templates UBITS generados por Autorun, asegurando que:
- Los componentes se muestren correctamente
- Los estilos y tokens funcionen en light y dark mode
- No se dupliquen componentes
- Se usen los componentes existentes de UBITS

---

## 📚 Información Esencial

### 1. **Componentes UBITS Disponibles**

Los componentes UBITS ya están cargados y disponibles globalmente:

```javascript
// Componentes de navegación
window.createSidebar(options)      // Sidebar principal
window.createSubNav(options)       // Sub-navegación
window.createTabBar(options)       // Tab bar (móvil)

// Componentes UBITS globales
window.UBITS.Button                // Botones
window.UBITS.Alert                 // Alertas
window.UBITS.Card                  // Tarjetas
window.UBITS.Input                 // Inputs
window.UBITS.Modal                 // Modales
// ... y muchos más
```

**✅ CORRECTO:**
```javascript
// Usar componente existente
const button = window.UBITS.Button.create({
  variant: 'primary',
  label: 'Click me'
});
```

**❌ INCORRECTO:**
```javascript
// NO crear nuevo componente
class MyButton extends HTMLElement { ... } // ❌
```

---

### 2. **Tokens UBITS - Sistema de Modifiers**

Los tokens UBITS siguen una estructura específica:

#### **Estructura de Tokens Modifiers**

```
--modifiers-[tipo]-color-[theme]-[categoria]-[color]
```

**Ejemplos:**
- `--modifiers-normal-color-light-accent-blue` (light mode)
- `--modifiers-normal-color-dark-accent-blue` (dark mode)
- `--modifiers-static-color-accent-blue` (mismo color en ambos temas)

#### **Tipos de Modifiers**

1. **`normal`**: Cambia entre light y dark
   - Light: `--modifiers-normal-color-light-accent-blue` (#5470fa)
   - Dark: `--modifiers-normal-color-dark-accent-blue` (#8c91fa)

2. **`static`**: Mismo color en ambos temas
   - `--ubits-accent-brand-static` (#0c5bef) - siempre azul

3. **`inverted`**: Versión invertida del color

#### **Tokens Importantes para SubNav**

```css
/* Light mode - siempre azul */
.ubits-sub-nav-tab--active::after {
  background-color: var(--ubits-accent-brand-static); /* #0c5bef */
}

/* Dark mode - azul específico para dark */
[data-theme="dark"] .ubits-sub-nav-tab--active::after {
  background-color: var(--modifiers-normal-color-dark-accent-blue); /* #8c91fa */
}
```

**⚠️ IMPORTANTE:**
- NO sobrescribir estos tokens con `!important` en CSS inyectado
- Dejar que el componente use sus propios tokens
- El componente `subnav.css` ya tiene los tokens correctos

---

### 3. **Archivos CSS Cargados**

Los templates generados cargan automáticamente:

1. **`tokens.css`** - Tokens base de UBITS
2. **`figma-tokens.css`** - Tokens de modifiers (incluye `--modifiers-normal-color-dark-accent-blue`)
3. **Componentes CSS** - Cada componente tiene su propio CSS

**Verificación:**
```javascript
// En la consola del navegador
const stylesheets = Array.from(document.styleSheets);
console.log('CSS cargados:', stylesheets.map(s => s.href));
```

---

### 4. **Rutas Absolutas file://**

Todos los assets usan rutas absolutas `file://`:

```html
<!-- ✅ CORRECTO -->
<link rel="stylesheet" href="file:///Users/elkinmac/Desktop/UBITS/packages/tokens/dist/tokens.css" />
<link rel="stylesheet" href="file:///Users/elkinmac/Desktop/UBITS/packages/tokens/dist/figma-tokens.css" />
<script src="file:///Users/elkinmac/Desktop/UBITS/packages/templates/components-loader.js"></script>
```

**❌ INCORRECTO:**
```html
<!-- Rutas relativas no funcionan -->
<link rel="stylesheet" href="../tokens/dist/tokens.css" />
```

---

## 🔧 Cómo Trabajar con Templates

### **Paso 1: Verificar Setup**

Antes de empezar, verificar en la consola del navegador:

```javascript
// 1. Componentes disponibles
console.log('Sidebar:', typeof window.createSidebar); // debe ser "function"
console.log('Button:', window.UBITS.Button); // debe existir

// 2. Tokens disponibles
const root = getComputedStyle(document.documentElement);
console.log('Token dark accent blue:', root.getPropertyValue('--modifiers-normal-color-dark-accent-blue'));
console.log('Token static brand:', root.getPropertyValue('--ubits-accent-brand-static'));

// 3. Tema actual
console.log('Tema:', document.documentElement.getAttribute('data-theme')); // "light" o "dark"
```

### **Paso 2: Usar Template Existente como Base**

```markdown
1. Abrir el template más reciente en `prototypes/`
2. Usar ese template como base para nuevas páginas
3. NO modificar el template base directamente
4. Crear una copia si necesitas hacer cambios significativos
```

### **Paso 3: Agregar Contenido**

```html
<!-- ✅ CORRECTO: Agregar contenido usando componentes existentes -->
<div class="content-area">
  <!-- Usar componentes UBITS -->
  <ubits-button variant="primary">Acción</ubits-button>
  <ubits-card>
    <h2>Título</h2>
    <p>Contenido usando tokens UBITS</p>
  </ubits-card>
</div>
```

### **Paso 4: Aplicar Estilos con Tokens**

```css
/* ✅ CORRECTO: Usar tokens UBITS */
.mi-componente {
  background-color: var(--ubits-bg-1);
  color: var(--ubits-fg-1-high);
  border: 1px solid var(--ubits-border-1);
}

/* Para dark mode, los tokens cambian automáticamente */
[data-theme="dark"] .mi-componente {
  /* No necesitas sobrescribir - los tokens ya cambian */
}
```

---

## 🚨 Errores Comunes y Soluciones

### **Error 1: Componentes no se ven**

**Síntomas:**
- Los componentes aparecen como texto plano
- No se aplican estilos

**Solución:**
1. Verificar que `components-loader.js` se carga
2. Verificar rutas absolutas `file://`
3. Revisar consola para errores 404

### **Error 2: Color incorrecto en dark mode**

**Síntomas:**
- El indicador del subnav aparece negro o transparente
- Los colores no cambian correctamente en dark mode

**Solución:**
1. Verificar que `figma-tokens.css` se carga
2. Verificar que el token `--modifiers-normal-color-dark-accent-blue` está disponible
3. NO sobrescribir tokens con `!important`
4. Dejar que el componente use sus propios tokens

### **Error 3: Sidebar/Navbar cambian**

**Síntomas:**
- Los elementos del sidebar se ven diferentes
- El navbar no funciona correctamente

**Solución:**
1. Verificar que `sidebar.css` y `subnav.css` se cargan
2. Verificar que `products.js` y `template-loader.js` se cargan
3. NO modificar archivos de UBITS
4. Solo personalizar configuración (módulo, producto)

### **Error 4: Tokens no disponibles**

**Síntomas:**
- `--modifiers-normal-color-dark-accent-blue` es `(no definido)`
- Los colores no se aplican

**Solución:**
1. Verificar que `figma-tokens.css` se carga después de `tokens.css`
2. Verificar que el archivo existe: `Desktop/UBITS/packages/tokens/dist/figma-tokens.css`
3. Revisar la consola para errores de carga

---

## 📋 Checklist para Crear Páginas

Antes de crear o modificar una página:

- [ ] ✅ Verificar que `Desktop/UBITS/packages/` existe
- [ ] ✅ Verificar componentes disponibles en consola
- [ ] ✅ Verificar tokens disponibles en consola
- [ ] ✅ Usar template existente como base
- [ ] ✅ Usar solo componentes UBITS existentes
- [ ] ✅ Usar tokens UBITS correctos (no sobrescribir)
- [ ] ✅ Rutas absolutas `file://` para todos los assets
- [ ] ✅ NO modificar archivos de UBITS
- [ ] ✅ NO crear nuevos componentes
- [ ] ✅ Validar que todo carga correctamente
- [ ] ✅ Probar en light y dark mode

---

## 🔍 Debugging

### **Ver Tokens Disponibles**

```javascript
// En la consola del navegador
const root = getComputedStyle(document.documentElement);
const tokens = {
  'ubits-accent-brand-static': root.getPropertyValue('--ubits-accent-brand-static'),
  'modifiers-normal-color-dark-accent-blue': root.getPropertyValue('--modifiers-normal-color-dark-accent-blue'),
  'modifiers-normal-color-light-accent-blue': root.getPropertyValue('--modifiers-normal-color-light-accent-blue'),
};
console.table(tokens);
```

### **Ver Componentes Disponibles**

```javascript
// En la consola del navegador
console.log('Componentes disponibles:', {
  sidebar: typeof window.createSidebar,
  subnav: typeof window.createSubNav,
  button: window.UBITS?.Button,
  card: window.UBITS?.Card,
});
```

### **Ver Estilos Computados**

```javascript
// En la consola del navegador
const tab = document.querySelector('.ubits-sub-nav-tab--active');
if (tab) {
  const styles = window.getComputedStyle(tab, '::after');
  console.log('Estilos del indicador:', {
    backgroundColor: styles.backgroundColor,
    display: styles.display,
    visibility: styles.visibility,
    opacity: styles.opacity,
  });
}
```

---

## 📚 Referencias

- **Templates base:** `Desktop/UBITS/packages/templates/`
- **Componentes:** `Desktop/UBITS/packages/components/`
- **Tokens:** `Desktop/UBITS/packages/tokens/dist/`
- **Documentación UBITS:** `Desktop/UBITS/docs/`

---

## ✅ Resumen de Reglas Críticas

1. **Usar solo componentes UBITS existentes** - NO crear nuevos
2. **Usar tokens UBITS correctos** - NO sobrescribir con `!important`
3. **Rutas absolutas file://** - Para todos los assets
4. **NO modificar archivos de UBITS** - Solo cargarlos
5. **Validar antes de continuar** - Verificar componentes y tokens

---

## 🎯 Siguiente Paso

Después de leer esta guía:

1. Abrir un template existente en `prototypes/`
2. Verificar componentes y tokens en la consola
3. Empezar a trabajar usando solo componentes existentes
4. Aplicar estilos usando tokens UBITS

**¡Listo para trabajar! 🚀**

