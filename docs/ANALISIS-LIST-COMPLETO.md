# Análisis Completo: Componente List (Lista)

## 📋 Estructura del Componente

### **Estructura HTML Base**
```html
<div class="ubits-list">
  <div class="ubits-list-item">Label</div>
  <div class="ubits-list-item ubits-list-item--hover">Label</div>
  <div class="ubits-list-item ubits-list-item--disabled">Label</div>
  <div class="ubits-list-item">Label</div>
</div>
```

---

## 🎨 Estados del Componente

### **1. Default (Por Defecto)**
- **Texto**: Color oscuro (aproximadamente `#333333` o `var(--ubits-fg-1-high)`)
- **Fondo**: Blanco (`var(--ubits-bg-1)`)
- **Cursor**: `pointer` (indica que es clickeable)

### **2. Hover/Active**
- **Texto**: Azul distintivo (aproximadamente `#3366CC` o `var(--ubits-accent-brand)`)
- **Fondo**: Azul claro (aproximadamente `#E0F0FF` o similar)
- **Cursor**: `pointer`
- **Transición**: Suave al cambiar de estado

### **3. Disabled**
- **Texto**: Gris claro (aproximadamente `#AAAAAA` o `var(--ubits-fg-1-low)`)
- **Fondo**: Gris muy claro (aproximadamente `#F0F0F0` o `var(--ubits-bg-3)`)
- **Cursor**: `not-allowed`
- **Interacción**: No clickeable

---

## 📐 Dimensiones y Espaciado

### **Container (`.ubits-list`)**
- **Fondo**: Blanco (`var(--ubits-bg-1)`)
- **Border-radius**: `8px` o `12px` (según diseño)
- **Padding**: `0` (los items manejan su propio padding)
- **Sombra**: Sutil (`box-shadow` ligera)
- **Overflow**: `auto` o `scroll` (para scrollbar)

### **Items (`.ubits-list-item`)**
- **Padding**: `12px 16px` (vertical y horizontal)
- **Espaciado vertical**: Mínimo `4px` entre items
- **Altura mínima**: `40px` o `44px`
- **Border-radius**: `4px` o `6px` (en hover/active)

---

## 🎨 Tokens CSS UBITS

### **Colores Default**
- **Texto**: `var(--ubits-fg-1-high)`
- **Fondo**: `var(--ubits-bg-1)`

### **Colores Hover/Active**
- **Texto**: `var(--ubits-accent-brand)` o `var(--ubits-fg-blue-high)`
- **Fondo**: Color azul claro (puede requerir token nuevo o usar `var(--ubits-bg-2)` con opacity)

### **Colores Disabled**
- **Texto**: `var(--ubits-fg-1-low)`
- **Fondo**: `var(--ubits-bg-3)`

### **Tipografía**
- **Font family**: `var(--font-sans)`
- **Font size**: `var(--font-body-md-size)` (14px o 16px)
- **Font weight**: `var(--weight-regular)` (400)
- **Line height**: `var(--font-body-md-line)` (1.5 o 20px)

---

## 📜 Scrollbar

### **Características**
- **Visible**: Siempre cuando hay overflow
- **Track**: Gris claro (`var(--ubits-bg-3)`)
- **Thumb**: Gris más oscuro con bordes redondeados
- **Width**: `8px` (estándar UBITS)
- **Border-radius**: `6px` (thumb)

---

## 🔧 Funcionalidades

### **Interacción**
1. **Click**: Selecciona el item
2. **Hover**: Muestra estado hover
3. **Keyboard navigation**: Soporte para teclas arriba/abajo
4. **Selection**: Indica visualmente el item seleccionado

### **Accesibilidad**
- **ARIA roles**: `list`, `listitem`
- **ARIA states**: `aria-selected`, `aria-disabled`
- **Focus**: Indicador visible para navegación por teclado
- **Keyboard**: Soporte completo (Enter, Space, Arrow keys)

---

## 🎯 Variantes y Modificadores

### **Sin Modificadores (Base)**
```html
<div class="ubits-list-item">Label</div>
```

### **Hover/Active**
```html
<div class="ubits-list-item ubits-list-item--active">Label</div>
```

### **Disabled**
```html
<div class="ubits-list-item ubits-list-item--disabled">Label</div>
```

---

## 📝 Ejemplo Completo

```html
<div class="ubits-list" role="list">
  <div class="ubits-list-item" role="listitem" tabindex="0">
    Label
  </div>
  <div class="ubits-list-item ubits-list-item--active" role="listitem" tabindex="0" aria-selected="true">
    Label
  </div>
  <div class="ubits-list-item ubits-list-item--disabled" role="listitem" aria-disabled="true">
    Label
  </div>
  <div class="ubits-list-item" role="listitem" tabindex="0">
    Label
  </div>
</div>
```

---

## 🎨 Estilos CSS Propuestos

```css
.ubits-list {
  background: var(--ubits-bg-1);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 400px; /* Opcional */
}

.ubits-list-item {
  padding: 12px 16px;
  color: var(--ubits-fg-1-high);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
  font-size: var(--font-body-md-size);
  font-weight: var(--weight-regular);
  line-height: var(--font-body-md-line);
}

.ubits-list-item:hover,
.ubits-list-item--active {
  color: var(--ubits-accent-brand);
  background: rgba(12, 91, 239, 0.08); /* Azul claro */
}

.ubits-list-item--disabled {
  color: var(--ubits-fg-1-low);
  background: var(--ubits-bg-3);
  cursor: not-allowed;
  pointer-events: none;
}

.ubits-list-item:focus-visible {
  outline: 2px solid var(--ubits-accent-brand);
  outline-offset: -2px;
}
```

---

## ✅ Checklist de Implementación

- [ ] Crear estructura del paquete List (package.json, tsconfig.json, vite.config.ts)
- [ ] Implementar estilos CSS completos (default, hover, active, disabled)
- [ ] Crear interfaces TypeScript (ListOptions, ListItemOptions)
- [ ] Implementar ListProvider (renderList, createList)
- [ ] Crear ListComponent (Web Component)
- [ ] Crear ListAddon class
- [ ] Integrar List en el playground (inventory, preview interactivo)
- [ ] Crear Storybook story para List
- [ ] Documentar en README
- [ ] Verificar accesibilidad (ARIA, keyboard navigation)

