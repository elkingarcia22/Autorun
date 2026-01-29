# Font Awesome Pro

Este directorio contiene los archivos de Font Awesome Pro instalados desde npm.

## Estructura

- `css/all.min.css` - Archivo CSS principal con todos los estilos de Font Awesome Pro
- `webfonts/` - Directorio con todas las fuentes de iconos (Solid, Regular, Light, Thin, Duotone, etc.)

## Instalación

Los archivos fueron copiados desde `node_modules/@fortawesome/fontawesome-pro/` después de configurar el token de npm:

```bash
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" YOUR_TOKEN
npm install @fortawesome/fontawesome-pro
```

## Uso

En los archivos HTML, se referencia así:

```html
<link rel="stylesheet" href="assets/fontawesome/css/all.min.css" />
```

Las rutas de las fuentes en el CSS ya están configuradas para apuntar a `../webfonts/`.

## Versión

Font Awesome Pro 6.x (instalado desde npm)

## Nota

Si necesitas actualizar Font Awesome, ejecuta:
1. `npm update @fortawesome/fontawesome-pro`
2. Copia los nuevos archivos:
   ```bash
   cp node_modules/@fortawesome/fontawesome-pro/css/all.min.css packages/templates/assets/fontawesome/css/
   cp -r node_modules/@fortawesome/fontawesome-pro/webfonts/* packages/templates/assets/fontawesome/webfonts/
   ```

