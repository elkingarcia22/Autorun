# UBITS Validation Rules

## 🔴 **REGLA 1: SIEMPRE USAR TOKENS UBITS**

### ❌ **NUNCA HACER:**
```css
/* ❌ INCORRECTO */
color: #000000;
background: white;
border: 1px solid rgb(128, 128, 128);
```

### ✅ **SIEMPRE HACER:**
```css
/* ✅ CORRECTO */
color: var(--ubits-fg-1-high);
background: var(--ubits-bg-1);
border: 1px solid var(--ubits-border-1);
```

**Tokens disponibles:**
- `var(--ubits-fg-*)` - Colores de texto
- `var(--ubits-bg-*)` - Colores de fondo
- `var(--ubits-border-*)` - Colores de borde
- `var(--ubits-accent-*)` - Colores de acento
- `var(--ubits-feedback-*)` - Colores de feedback

## 🔴 **REGLA 2: SIEMPRE USAR COMPONENTES EXISTENTES**

### ❌ **NUNCA HACER:**
```javascript
// ❌ INCORRECTO - Crear componente custom
function MyCustomButton() {
  return '<button class="my-button">Click</button>';
}
```

### ✅ **SIEMPRE HACER:**
```javascript
// ✅ CORRECTO - Usar componente oficial
window.createButton({
  variant: 'primary',
  size: 'md',
  label: 'Click'
});
```

**Componentes disponibles:** Ver `.ubits/component-inventory.json`

## 🔴 **REGLA 3: SIEMPRE USAR TIPOGRAFÍA UBITS**

### ❌ **NUNCA HACER:**
```html
<!-- ❌ INCORRECTO -->
<h1 class="ubits-h1">Título</h1>
<h2 class="ubits-title">Subtítulo</h2>
<p class="ubits-text">Texto</p>
```

### ✅ **SIEMPRE HACER:**
```html
<!-- ✅ CORRECTO -->
<h2 class="ubits-heading-h1">Título</h2>
<p class="ubits-body-md-bold">Subtítulo</p>
<p class="ubits-body-md-regular">Texto</p>
```

**Clases válidas:** Ver `.ubits/component-inventory.json` → `tokens.typography.validClasses`

## 🔴 **REGLA 4: SIEMPRE IMPORTAR CSS DE COMPONENTES**

### ❌ **NUNCA HACER:**
```html
<!-- ❌ INCORRECTO - Usar componente sin CSS -->
<script src="components/button.js"></script>
<!-- Falta: <link rel="stylesheet" href="components/button.css"> -->
```

### ✅ **SIEMPRE HACER:**
```html
<!-- ✅ CORRECTO -->
<link rel="stylesheet" href="packages/addons/button/src/styles/button.css">
<script src="components-loader.js"></script>
```

## 🔴 **REGLA 5: VERIFICAR COMPONENTES ANTES DE CREAR**

**ANTES de crear cualquier UI element:**

1. ✅ Consultar `.ubits/component-inventory.json`
2. ✅ Verificar si existe componente oficial
3. ✅ Si existe, USARLO (nunca crear custom)
4. ✅ Si no existe, CREAR nuevo componente como add-on

## 📋 **WORKFLOW OBLIGATORIO**

### **Antes de cada commit:**
```bash
npm run validate
```

### **Si hay errores:**
1. Revisar mensajes de error
2. Corregir usando tokens y componentes oficiales
3. Ejecutar `npm run validate` de nuevo
4. Solo hacer commit cuando pase la validación

## 🔧 **COMANDOS DISPONIBLES**

- `npm run validate` - Validar código
- `npm run validate:fix` - Sugerir correcciones (próximamente)
- `npm run validate:watch` - Validar en tiempo real (próximamente)

## 📚 **REFERENCIAS**

- **Inventario de componentes:** `.ubits/component-inventory.json`
- **Guía de tipografía:** `template-ubits/UBITS-TYPOGRAPHY-GUIDE.md`
- **Validador visual:** `template-ubits/validador-ubits.html`

