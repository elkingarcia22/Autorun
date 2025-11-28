# 🖼️ Controlador de Imágenes para Welcome Pages

## Descripción

El controlador de imágenes proporciona una galería de **50 imágenes de alta resolución** para seleccionar en las páginas de bienvenida. Todas las imágenes son de Unsplash y están optimizadas para alta resolución (1920x1080px).

## Características

- ✅ **50 imágenes** de alta resolución disponibles
- ✅ **Búsqueda** por nombre, descripción o categoría
- ✅ **Filtrado por categorías** (team, office, technology, etc.)
- ✅ **Modal interactivo** con galería visual
- ✅ **Integración automática** con el template welcome
- ✅ **Diseño responsive** siguiendo tokens UBITS

## Uso

### Integración Automática

El controlador ya está integrado en `template-welcome-test.html`. Cuando una imagen está visible, aparece un botón **"Cambiar imagen"** en la esquina inferior derecha de la imagen.

### Uso Programático

```javascript
// Inicializar controlador
const imageController = new ImageController({
    onImageSelect: (selectedImage) => {
        console.log('Imagen seleccionada:', selectedImage);
        // selectedImage contiene: id, name, url, category, description
    }
});

// Abrir selector de imágenes
createImageSelectorModal(imageController, (selectedImage) => {
    // Hacer algo con la imagen seleccionada
    console.log('URL:', selectedImage.url);
    console.log('Nombre:', selectedImage.name);
});
```

### Métodos Disponibles

```javascript
// Obtener todas las imágenes
const allImages = imageController.getAllImages();

// Obtener imagen por ID
const image = imageController.getImageById(1);

// Obtener imágenes por categoría
const teamImages = imageController.getImagesByCategory('team');

// Obtener todas las categorías
const categories = imageController.getCategories();

// Buscar imágenes
const results = imageController.searchImages('equipo');

// Obtener imagen aleatoria
const random = imageController.getRandomImage();

// Seleccionar imagen
imageController.selectImage(5);
```

## Categorías Disponibles

- `all` - Todas las imágenes
- `team` - Equipos trabajando
- `office` - Espacios de oficina
- `technology` - Tecnología
- `meeting` - Reuniones
- `development` - Desarrollo
- `creativity` - Creatividad
- `collaboration` - Colaboración
- `innovation` - Innovación
- `presentation` - Presentaciones
- `strategy` - Estrategia
- `startup` - Ambiente startup
- `design` - Diseño
- `productivity` - Productividad
- `communication` - Comunicación
- `leadership` - Liderazgo
- `learning` - Aprendizaje
- `networking` - Networking
- `workshop` - Talleres
- `brainstorming` - Lluvia de ideas
- `conference` - Conferencias
- `coworking` - Coworking
- `mentoring` - Mentoría
- `digital` - Transformación digital
- `data` - Análisis de datos
- `marketing` - Marketing
- `sales` - Ventas
- `hr` - Recursos humanos
- `finance` - Finanzas
- `project` - Gestión de proyectos
- `quality` - Calidad
- `satisfaction` - Satisfacción
- `growth` - Crecimiento
- `success` - Éxito
- `motivation` - Motivación
- `goals` - Objetivos
- `results` - Resultados
- `efficiency` - Eficiencia
- `transformation` - Transformación
- `competitiveness` - Competitividad
- `sustainability` - Sostenibilidad
- `diversity` - Diversidad
- `inclusion` - Inclusión
- `wellbeing` - Bienestar
- `balance` - Balance vida-trabajo
- `training` - Capacitación
- `evaluation` - Evaluación
- `feedback` - Feedback
- `improvement` - Mejora continua
- `excellence` - Excelencia

## Estructura de una Imagen

```javascript
{
    id: 1,
    name: 'Equipo trabajando',
    url: 'https://images.unsplash.com/photo-...',
    category: 'team',
    description: 'Equipo colaborando en proyecto'
}
```

## Personalización

### Agregar Nuevas Imágenes

Edita el array `IMAGE_GALLERY` en `image-controller.js`:

```javascript
{
    id: 51,
    name: 'Nueva imagen',
    url: 'https://images.unsplash.com/photo-...?w=1920&h=1080&fit=crop&auto=format',
    category: 'nueva-categoria',
    description: 'Descripción de la imagen'
}
```

### Personalizar Estilos

Los estilos del modal y botón usan tokens UBITS. Puedes personalizarlos editando los estilos inline en `createImageSelectorModal()` o agregando CSS personalizado.

## Requisitos

- El archivo `image-controller.js` debe estar en la misma carpeta que el template HTML
- Los tokens UBITS deben estar cargados
- FontAwesome debe estar disponible para los iconos

## Ejemplo Completo

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Cargar tokens UBITS y estilos -->
    <link rel="stylesheet" href="../tokens/dist/tokens.css" />
</head>
<body>
    <!-- Tu contenido -->
    
    <!-- Cargar controlador de imágenes -->
    <script src="image-controller.js"></script>
    
    <script>
        // Inicializar
        const imageController = new ImageController();
        
        // Abrir selector
        document.getElementById('select-image-btn').onclick = () => {
            createImageSelectorModal(imageController, (image) => {
                document.getElementById('my-image').src = image.url;
            });
        };
    </script>
</body>
</html>
```

## Notas

- Todas las imágenes son de **Unsplash** y están optimizadas para alta resolución
- Las imágenes se cargan bajo demanda cuando se abre el modal
- El modal es responsive y se adapta a dispositivos móviles
- Los estilos siguen el sistema de diseño UBITS

