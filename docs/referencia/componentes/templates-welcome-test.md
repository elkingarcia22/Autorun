# Templates Welcome Test

## 📋 Descripción

Página de bienvenida para tests de prototipos UBITS. Incluye múltiples variaciones de diseño con diferentes layouts, posiciones de imagen, alineaciones y estilos. Este template es ideal para crear páginas de bienvenida, landing pages o páginas de inicio de aplicaciones.

El template incluye una galería de 50 imágenes predefinidas que puedes seleccionar, y múltiples opciones de personalización para adaptar el diseño a tus necesidades.

---

## 🔗 Enlaces Rápidos

- **Storybook Local:** [Welcome Test - WelcomePage](http://localhost:6006/?path=/story/templates-welcome-test--welcome-page)
- **Storybook Vercel:** [Welcome Test](https://ubits-storybook10.vercel.app/?path=/story/templates-welcome-test--welcome-page)
- **Archivo HTML:** `vendor/ubits/packages/templates/template-welcome-test.html`

---

## 📖 Stories Disponibles

### WelcomePage

Página de bienvenida completa con múltiples opciones de personalización.

**Código de ejemplo:**

```javascript
{
  layout: 'no-image',
  textAlignment: 'left',
  buttonAlignment: 'left',
  showBanner: true,
  showInfoBox: true,
  imageSize: 'medium',
  containerStyle: 'default',
  selectedImage: '1'
}
```

**Opciones:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `layout` | `'image-right' \| 'image-left' \| 'no-image'` | `'no-image'` | Posición de la imagen en el layout |
| `textAlignment` | `'left' \| 'center'` | `'left'` | Alineación del texto |
| `buttonAlignment` | `'left' \| 'center' \| 'right'` | `'left'` | Alineación del botón |
| `showBanner` | `boolean` | `true` | Mostrar banner superior |
| `showInfoBox` | `boolean` | `true` | Mostrar caja de información |
| `imageSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamaño de la imagen |
| `containerStyle` | `'default' \| 'compact' \| 'wide' \| 'minimal'` | `'default'` | Estilo del contenedor |
| `selectedImage` | `string` | `'1'` | Seleccionar imagen de la galería (50 imágenes disponibles) |

---

## 🎨 Características Principales

### Layouts Disponibles

1. **Image Right:** Imagen a la derecha del contenido
2. **Image Left:** Imagen a la izquierda del contenido
3. **No Image:** Sin imagen, solo contenido centrado

### Alineaciones

- **Texto:** Izquierda o centrado
- **Botones:** Izquierda, centro o derecha

### Elementos Opcionales

- **Banner Superior:** Banner con mensaje destacado
- **Caja de Información:** Caja informativa con contenido adicional

### Tamaños de Imagen

- **Small:** Imagen pequeña
- **Medium:** Imagen mediana (default)
- **Large:** Imagen grande

### Estilos de Contenedor

- **Default:** Contenedor estándar con padding normal
- **Compact:** Contenedor compacto con menos padding
- **Wide:** Contenedor ancho con más espacio horizontal
- **Minimal:** Contenedor minimalista con padding mínimo

---

## 🖼️ Galería de Imágenes

El template incluye una galería de **50 imágenes predefinidas** de Unsplash, organizadas por categorías:

### Categorías de Imágenes

- Equipo trabajando
- Oficina moderna
- Tecnología
- Reunión de trabajo
- Desarrollo
- Creatividad
- Colaboración
- Innovación
- Presentación
- Estrategia
- Startup
- Diseño
- Productividad
- Comunicación
- Liderazgo
- Aprendizaje
- Networking
- Workshop
- Brainstorming
- Conferencia
- Coworking
- Mentoría
- Innovación digital
- Análisis de datos
- Marketing
- Ventas
- Recursos humanos
- Finanzas
- Proyecto
- Calidad
- Satisfacción
- Crecimiento
- Éxito
- Motivación
- Objetivos
- Resultados
- Eficiencia
- Transformación
- Competitividad
- Sostenibilidad
- Diversidad
- Inclusión
- Bienestar
- Balance
- Desarrollo profesional
- Capacitación
- Evaluación
- Feedback
- Mejora continua
- Excelencia

Cada imagen tiene un nombre descriptivo y está optimizada para uso en páginas web.

---

## 🚀 Uso

### En Storybook

El template se muestra en un iframe que carga el archivo HTML y se configura dinámicamente según los controles:

```javascript
{
  layout: 'image-right',
  textAlignment: 'center',
  buttonAlignment: 'center',
  showBanner: true,
  showInfoBox: true,
  imageSize: 'large',
  containerStyle: 'wide',
  selectedImage: 'Equipo trabajando - Equipo colaborando en proyecto'
}
```

### En un Proyecto

El template está ubicado en:
- `vendor/ubits/packages/templates/template-welcome-test.html`

Puedes usar este archivo como base para crear tus propias páginas de bienvenida.

---

## 🎯 Estructura del Template

### HTML Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Bienvenida - Test de Prototipo UBITS</title>
    
    <!-- UBITS Base Styles -->
    <link rel="stylesheet" href="../tokens/dist/tokens.css" />
    <link rel="stylesheet" href="../typography/fonts.css" />
    <link rel="stylesheet" href="../typography/tokens-typography.css" />
    
    <!-- FontAwesome Pro -->
    <link rel="stylesheet" href="assets/fontawesome/css/all.min.css" />
    
    <!-- UBITS Component Styles -->
    <link rel="stylesheet" href="../components/button/src/styles/button.css" />
    <link rel="stylesheet" href="../components/badge/src/styles/badge.css" />
    <link rel="stylesheet" href="../components/card/src/styles/card.css" />
    <link rel="stylesheet" href="../components/alert/src/styles/alert.css" />
    
    <!-- Theme Manager -->
    <script src="config/theme-manager.js"></script>
</head>
<body>
    <div class="welcome-container" id="welcome-container">
        <!-- Banner (opcional) -->
        <!-- Contenido principal -->
        <!-- Imagen (opcional) -->
        <!-- Caja de información (opcional) -->
    </div>
</body>
</html>
```

### Estructura Principal

```
.welcome-container
├── .welcome-banner (opcional)
├── .welcome-content
│   ├── .welcome-text
│   │   ├── Título
│   │   ├── Descripción
│   │   └── Botones de acción
│   └── .welcome-image (opcional)
└── .welcome-info-box (opcional)
```

---

## ⚙️ Configuración

### WelcomePageConfig

El template usa un objeto de configuración global `WelcomePageConfig` que permite personalizar todos los aspectos:

```javascript
window.WelcomePageConfig = {
  banner: {
    show: true,
    text: 'Nuevo'
  },
  infoBox: {
    show: true,
    content: 'Información adicional'
  },
  image: {
    show: true,
    size: 'medium',
    src: 'url-de-imagen',
    alt: 'Descripción'
  },
  layout: {
    imagePosition: 'right', // 'right' | 'left' | 'none'
    textAlignment: 'left',   // 'left' | 'center'
    buttonAlignment: 'left'  // 'left' | 'center' | 'right'
  }
};
```

### Inicialización

El template se inicializa automáticamente cuando se carga, pero también puedes reinicializarlo:

```javascript
if (window.initializeWelcomePage) {
  window.initializeWelcomePage(window.WelcomePageConfig);
}
```

---

## 🎨 Personalización

### Modificar el Template

1. Copia el archivo HTML del template
2. Modifica el contenido del texto según tus necesidades
3. Ajusta los estilos del contenedor
4. Personaliza los botones y acciones

### Agregar Elementos

Para agregar nuevos elementos:

1. Agrega el HTML en la estructura correspondiente
2. Agrega los estilos CSS necesarios
3. Actualiza la configuración si es necesario

### Cambiar Imágenes

Para usar tus propias imágenes:

1. Reemplaza la URL en `selectedImage`
2. O modifica directamente `WelcomePageConfig.image.src`

---

## 📝 Notas Importantes

1. **Responsive:** El template es responsive y se adapta a diferentes tamaños de pantalla.

2. **Tema:** El template soporta modo claro y oscuro. El tema se sincroniza automáticamente cuando se muestra en Storybook.

3. **Tokens UBITS:** Todos los estilos usan tokens UBITS. No sobrescribas con `!important` a menos que sea absolutamente necesario.

4. **Imágenes:** Las imágenes se cargan desde Unsplash. Asegúrate de tener conexión a internet o reemplázalas con imágenes locales.

5. **Configuración Dinámica:** El template se configura dinámicamente desde Storybook. Si lo usas directamente, asegúrate de configurar `WelcomePageConfig` antes de inicializar.

---

## 🐛 Errores Comunes

### Imagen no se muestra

- Verifica que la URL de la imagen sea válida
- Revisa que `image.show` esté en `true`
- Asegúrate de que el layout permita mostrar la imagen (`image-right` o `image-left`)

### Banner no aparece

- Verifica que `showBanner` esté en `true`
- Revisa que el banner no esté oculto por CSS
- Algunos layouts ocultan el banner automáticamente

### Botones no se alinean correctamente

- Verifica la propiedad `buttonAlignment` en la configuración
- Revisa los estilos CSS del contenedor de botones
- Asegúrate de que el contenedor tenga el ancho suficiente

### Tema no se sincroniza

- El tema se sincroniza automáticamente en Storybook
- Si no funciona, verifica que el iframe tenga los permisos correctos (`sandbox`)

---

## 📚 Referencias

- [Guía de uso de componentes UBITS](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Documentación de Button](./bsicos-button.md)
- [Documentación de Card](./layout-simple-card.md)
- [Documentación de Alert](./feedback-alert.md)
- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)

---

**Última actualización:** 2025-12-05

