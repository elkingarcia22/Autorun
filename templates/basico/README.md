# Template Básico UBITS - Backend Listo

Template simplificado para uso en backend, sin sistemas de gestión dinámica complejos.

## 🎯 Características

- ✅ **Sin ContentManager** - Contenido estático, no se limpia dinámicamente
- ✅ **CSS Local** - Archivos CSS copiados localmente, sin problemas de CORS/timing
- ✅ **JS Local** - Providers de componentes locales, sin dependencias externas
- ✅ **Inicialización Directa** - Código simple y predecible
- ✅ **Sin Interceptaciones** - No requiere código complejo de preservación

## 📁 Estructura

```
templates/basico/
├── index.html              # Template principal
├── css/
│   ├── tokens.css         # Tokens UBITS (copiar desde vendor/ubits)
│   └── components/        # CSS de componentes
│       ├── radio-button.css
│       └── ...
├── js/
│   └── components/        # Providers de componentes
│       ├── radio-button.js
│       └── ...
├── examples/              # Ejemplos de uso
│   ├── radio-button.html
│   └── ...
└── README.md
```

## 🚀 Uso

### 1. Copiar Archivos Necesarios

```bash
# Copiar tokens CSS
cp vendor/ubits/packages/tokens/dist/tokens.css templates/basico/css/tokens.css

# Copiar CSS de componentes
cp vendor/ubits/packages/components/radio-button/src/styles/radio-button.css templates/basico/css/components/

# Copiar JS de componentes (compilar primero si es necesario)
cp vendor/ubits/packages/components/radio-button/src/RadioButtonProvider.ts templates/basico/js/components/radio-button.js
```

### 2. Usar en HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Template</title>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/components/radio-button.css">
</head>
<body>
  <div id="radiobutton-group"></div>
  
  <script src="js/components/radio-button.js"></script>
  <script>
    // Inicialización simple
    window.UBITS.RadioButton.create({
      containerId: 'radiobutton-group',
      label: 'Opción 1',
      value: 'opcion1',
      name: 'grupo',
      checked: true
    });
  </script>
</body>
</html>
```

## 📝 Ejemplos

Ver carpeta `examples/` para ejemplos completos de uso.

## ⚠️ Notas

- Este template NO usa ContentManager, por lo que el contenido es estático
- Los componentes se inicializan directamente sin interceptaciones
- Ideal para backend que necesita frontend listo para usar sin complejidad

