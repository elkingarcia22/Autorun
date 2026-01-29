# Guía: Cambiar Tokens desde Storybook

## 🎯 Objetivo

Aplicar tokens desde Storybook (o cualquier otra fuente) a todos los componentes automáticamente, sin modificar código.

## ✅ Respuesta Rápida

**SÍ, ahora puedes hacerlo sin problema.** El sistema que creamos permite cambiar tokens desde Storybook y aplicarlos automáticamente a todos los componentes.

---

## 🚀 Cómo Funciona

### **Principio Clave**

Todos los componentes usan `var(--ubits-*)` para sus estilos. Cuando cambias los tokens, **automáticamente todos los componentes se actualizan** porque usan variables CSS.

---

## 📝 Ejemplos de Uso

### **Ejemplo 1: Desde URL de Storybook (Más Fácil)**

```javascript
// En la consola del navegador o en tu código
await window.UBITS.Tokens.applyFromSource({
  cssUrl: 'https://storybook.tu-empresa.com/tokens.css'
});

// ¡Listo! Todos los componentes ahora usan los tokens de Storybook
```

### **Ejemplo 2: Desde JSON de Storybook**

```javascript
await window.UBITS.Tokens.applyFromSource({
  jsonUrl: 'https://storybook.tu-empresa.com/tokens.json'
});
```

### **Ejemplo 3: Desde CSS Directo**

```javascript
const tokensCSS = `
  :root {
    --ubits-accent-brand: #FF6B35;
    --ubits-button-primary-bg-default: #FF6B35;
    --ubits-button-primary-hover: #FF8C5A;
    --ubits-bg-1: #ffffff;
    --ubits-fg-1-high: #303a47;
  }
`;

await window.UBITS.Tokens.applyFromSource({
  css: tokensCSS
});
```

### **Ejemplo 4: Desde JSON Directo**

```javascript
const tokensJSON = {
  light: {
    brand: {
      'ubits-accent-brand': '#FF6B35',
      'ubits-accent-success': '#00C896'
    },
    button: {
      'ubits-button-primary-bg-default': '#FF6B35',
      'ubits-button-primary-hover': '#FF8C5A'
    }
  }
};

await window.UBITS.Tokens.applyFromSource({
  json: tokensJSON
});
```

---

## 🎨 Flujo Completo

### **Paso 1: Obtener Tokens de Storybook**

```javascript
// Opción A: Desde URL
const storybookTokensUrl = 'https://storybook.tu-empresa.com/tokens.css';

// Opción B: Desde JSON
const storybookTokensJson = 'https://storybook.tu-empresa.com/tokens.json';

// Opción C: Copiar CSS directamente
const storybookTokensCSS = `
  :root {
    --ubits-accent-brand: #FF6B35;
    /* ... más tokens ... */
  }
`;
```

### **Paso 2: Aplicar a Componentes**

```javascript
// Método 1: Usando API global (más fácil)
await window.UBITS.Tokens.applyFromSource({
  cssUrl: storybookTokensUrl
});

// Método 2: Usando función helper
import { cambiarTokensDesdeStorybook } from '@ubits/tokens-ubits';
await cambiarTokensDesdeStorybook(storybookTokensUrl);

// Método 3: Desde consola del navegador
await cambiarTokensDesdeStorybook('https://storybook.tu-empresa.com/tokens.css');
```

### **Paso 3: Verificar**

```javascript
// Ver información de tokens aplicados
const info = window.UBITS.Tokens.getInfo();
console.log('Fuente:', info.source); // 'addon'
console.log('Válido:', info.isValid); // true/false

// Validar manualmente
const isValid = await window.UBITS.Tokens.validate();
console.log('Tokens válidos:', isValid);
```

---

## 🔄 ¿Qué Pasa con los Componentes?

### **Automático y Transparente**

Cuando cambias los tokens, **todos los componentes se actualizan automáticamente** porque:

1. ✅ Todos usan `var(--ubits-*)` en sus estilos
2. ✅ Las variables CSS se actualizan en el DOM
3. ✅ Los componentes heredan los nuevos valores automáticamente

**Ejemplo:**

```css
/* Antes: tokens originales */
:root {
  --ubits-button-primary-bg-default: #0c5bef; /* Azul */
}

/* Componente Button usa: */
.ubits-button--primary {
  background: var(--ubits-button-primary-bg-default); /* Azul */
}

/* Después: tokens de Storybook */
:root {
  --ubits-button-primary-bg-default: #FF6B35; /* Naranja */
}

/* Componente Button automáticamente usa: */
.ubits-button--primary {
  background: var(--ubits-button-primary-bg-default); /* Naranja - SIN CAMBIAR CÓDIGO */
}
```

---

## 🛡️ Validación Automática

El sistema valida automáticamente que los tokens tengan todas las propiedades requeridas:

```javascript
await window.UBITS.Tokens.applyFromSource({
  cssUrl: 'https://storybook.tu-empresa.com/tokens.css'
});

// El sistema valida automáticamente:
// ✅ Todos los tokens requeridos están presentes
// ⚠️ O muestra advertencia si faltan algunos
```

---

## 📋 Checklist: Tokens desde Storybook

Para que funcione correctamente, los tokens de Storybook deben:

- [ ] Tener el prefijo `--ubits-` en las variables CSS
- [ ] Incluir todos los tokens requeridos (ver lista abajo)
- [ ] Estar en formato CSS válido o JSON estructurado
- [ ] Ser accesibles desde la URL (CORS permitido)

### **Tokens Mínimos Requeridos**

```css
/* Button tokens */
--ubits-button-primary-bg-default
--ubits-button-primary-hover
--ubits-btn-primary-fg

/* Background tokens */
--ubits-bg-1
--ubits-bg-2

/* Foreground tokens */
--ubits-fg-1-high
--ubits-fg-1-medium

/* Border tokens */
--ubits-border-1

/* Accent tokens */
--ubits-accent-brand

/* Spacing tokens */
--ubits-spacing-2
--ubits-spacing-3
```

---

## 🎯 Casos de Uso

### **Caso 1: "Aplica estos tokens de Storybook"**

```javascript
// Copiar URL de tokens de Storybook
const storybookUrl = 'https://storybook.tu-empresa.com/tokens.css';

// Aplicar
await window.UBITS.Tokens.applyFromSource({ cssUrl: storybookUrl });

// Verificar
const info = window.UBITS.Tokens.getInfo();
console.log('✅ Tokens aplicados desde:', info.source);
```

### **Caso 2: "Cambia solo el color de marca"**

```javascript
// Crear tokens CSS solo con el cambio
const nuevoColorMarca = `
  :root {
    --ubits-accent-brand: #FF6B35;
    --ubits-button-primary-bg-default: #FF6B35;
    --ubits-button-primary-hover: #FF8C5A;
  }
`;

await window.UBITS.Tokens.applyFromSource({ css: nuevoColorMarca });
```

### **Caso 3: "Aplica tokens de otro proyecto"**

```javascript
// Tokens de otro proyecto (mismo formato)
await window.UBITS.Tokens.applyFromSource({
  jsonUrl: 'https://otro-proyecto.com/tokens.json'
});
```

---

## 🔍 Debugging

### **Ver qué tokens están aplicados**

```javascript
const manager = window.UBITS.Tokens.getManager();
const info = manager.getTokensInfo();
console.log('Fuente:', info.source);
console.log('Add-on:', info.tokensAddon);

// Ver tokens CSS
if (info.tokensAddon) {
  const css = info.tokensAddon.getTokensCSS();
  console.log('Tokens CSS:', css);
}
```

### **Ver tokens faltantes**

```javascript
const manager = window.UBITS.Tokens.getManager();
const validation = manager.getTokensInfo().tokensAddon?.validateDetailed();

if (validation && !validation.isValid) {
  console.warn('Tokens faltantes:', validation.missingTokens);
  console.log('Tokens presentes:', validation.presentTokens);
}
```

---

## ⚠️ Notas Importantes

1. **Los tokens deben tener el prefijo `--ubits-`**
   - Si Storybook usa otro prefijo, necesitarás convertirlos

2. **Los componentes no necesitan cambios**
   - Siguen usando `var(--ubits-*)` normalmente
   - El cambio es automático

3. **Fallback automático**
   - Si los tokens de Storybook fallan, se usan tokens estáticos
   - Nunca deja la UI sin estilos

4. **Validación opcional**
   - El sistema valida automáticamente
   - Puedes deshabilitarla si quieres

---

## ✅ Conclusión

**SÍ, puedes cambiar tokens desde Storybook y aplicarlos automáticamente a todos los componentes sin modificar código.**

El sistema:
- ✅ Detecta tokens desde Storybook
- ✅ Los convierte a formato compatible
- ✅ Los aplica automáticamente
- ✅ Valida que sean correctos
- ✅ Actualiza todos los componentes
- ✅ Tiene fallback si falla

**Todo funciona automáticamente porque los componentes usan `var(--ubits-*)`.**

