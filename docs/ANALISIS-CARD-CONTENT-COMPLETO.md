# Análisis Completo - Componente Card Content

## 📋 RESUMEN EJECUTIVO

El componente **Card Content** es un componente complejo para mostrar cards de contenido de aprendizaje con múltiples variantes, estados y metadata.

## 🎨 ESTRUCTURA HTML

### Estructura Base:
```html
<div class="course-card" data-progress="75" data-status="progress">
    <!-- Thumbnail con imagen y progreso -->
    <div class="course-thumbnail-wrapper">
        <div class="course-thumbnail">
            <img src="..." alt="..." class="course-image">
        </div>
        <!-- Overlay de progreso -->
        <div class="course-progress-overlay">
            <div class="progress-bar">
                <div class="progress-fill" style="width: 75%"></div>
            </div>
        </div>
    </div>
    
    <!-- Contenido de la card -->
    <div class="course-content">
        <!-- Header: Tipo y Estado -->
        <div class="course-header">
            <div class="course-type-status">
                <span class="course-type">Curso</span>
                <span class="course-status course-status--progress">En progreso</span>
            </div>
        </div>
        
        <!-- Título -->
        <h3 class="course-title">Título del contenido</h3>
        
        <!-- Proveedor -->
        <div class="course-provider">
            <div class="provider-avatar">
                <img src="..." alt="..." class="provider-icon">
            </div>
            <span class="provider-name">UBITS</span>
        </div>
        
        <!-- Competencia -->
        <div class="course-competency">
            <div class="spec-icon">
                <i class="far fa-tag"></i>
            </div>
            <span>Product design</span>
        </div>
        
        <!-- Specs: Nivel, Duración, Idioma -->
        <div class="course-specs">
            <div class="spec-item">
                <div class="spec-icon">
                    <i class="far fa-gauge"></i>
                </div>
                <span>Intermedio</span>
            </div>
            <div class="spec-item">
                <div class="spec-icon">
                    <i class="far fa-clock"></i>
                </div>
                <span>60 min</span>
            </div>
            <div class="spec-item">
                <div class="spec-icon">
                    <i class="far fa-globe"></i>
                </div>
                <span>Español</span>
            </div>
        </div>
    </div>
</div>
```

## 🎯 CARACTERÍSTICAS Y PROPIEDADES

### 1. Tipos de Contenido (11 tipos):
- `Curso`
- `Cápsula`
- `Charla`
- `Artículo`
- `Podcast`
- `Libro`
- `Ideas de libro`
- `Caso de estudio`
- `Documento técnico`
- `Ejercicios de práctica`
- `Ruta de aprendizaje`

### 2. Competencias Oficiales (35 competencias):
- `Accountability`, `Administración de negocios`, `Agilidad`, `Comunicación`, `Cumplimiento (Compliance)`, `Data skills`, `Desarrollo de software`, `Desarrollo web`, `Digital skills`, `e-Commerce`, `Emprendimiento`, `Experiencia del cliente`, `Gestión de procesos y operaciones`, `Gestión de proyectos`, `Gestión de recursos tecnológicos`, `Gestión del cambio`, `Gestión del riesgo`, `Gestión financiera`, `Herramientas tecnológicas`, `Inglés`, `Innovación`, `Inteligencia emocional`, `Lenguajes de Programación`, `Liderazgo`, `Marketing`, `Marketing digital`, `Negociación`, `People management`, `Product design`, `Productividad`, `Resolución de problemas`, `Trabajo en equipo`, `Ventas`, `Wellness`

### 3. Niveles (3 niveles con iconos):
- `Básico` → `far fa-gauge-min`
- `Intermedio` → `far fa-gauge`
- `Avanzado` → `far fa-gauge-max`

### 4. Duraciones Oficiales (9 duraciones):
- `15 min`, `30 min`, `45 min`, `60 min`, `75 min`, `90 min`, `120 min`, `180 min`, `240 min`

### 5. Idiomas (3 idiomas):
- `Español`
- `Inglés`
- `Portugués`

### 6. Estados (3 estados):
- `default` - Sin estado, sin barra de progreso
- `progress` - "En progreso" (texto azul), barra azul
- `completed` - "Completado" (texto verde), barra verde

### 7. Proveedores Oficiales (18 proveedores):
- `UBITS`, `Microsoft`, `Hubspot`, `Harvard Business Publishing`, `TED`, `AWS`, `Universidad de Los Andes`, `Advanced English`, `IE University`, `Código Facilito`, `Hackers del Talento`, `All Ears English`, `American & British Academy`, `Bureau Veritas`, `Welu`, `Figsha Smart Consulting`, `Instafit`, `WOBI`

## 🎨 ESTILOS Y TOKENS

### Tokens Utilizados:
- `--ubits-bg-1` - Fondo de la card
- `--ubits-border-1` - Borde de la card
- `--ubits-accent-brand` - Color de hover y progreso (progress)
- `--ubits-accent-brand-static` - Color estático del gradient
- `--ubits-feedback-accent-success-static` - Color verde para completado
- `--ubits-bg-4-static` - Fondo de la barra de progreso
- `--ubits-fg-1-high` - Texto principal (título, proveedor)
- `--ubits-fg-1-medium` - Texto secundario (tipo, specs)
- `--ubits-btn-primary-fg` - Color del texto en gradient (fallback)

### Clases de Tipografía:
- `ubits-body-sm-regular` - Tipo, proveedor, specs
- `ubits-body-sm-bold` - Estado, título

### Efectos:
- **Hover**: `transform: translateY(-2px)`, `box-shadow`, cambio de `border-color`
- **Imagen hover**: `transform: scale(1.05)`
- **Animación**: `fadeIn` al cargar (0.3s ease)

### Aspectos Importantes:
- **Aspect Ratio**: 16:9 para thumbnail
- **Título**: Máximo 2 líneas con `line-clamp`
- **Progreso**: Barra de 5px de altura en la parte inferior del thumbnail
- **Avatar proveedor**: 35x35px, circular con borde
- **Iconos specs**: 18x18px contenedor, 12px FontAwesome

## 📐 ESTRUCTURA DE DATOS

### CardData Interface:
```typescript
interface CardData {
    type: string;              // Tipo de contenido (11 opciones)
    title: string;             // Título del contenido
    provider: string;          // Nombre del proveedor
    providerLogo: string;      // Ruta del logo del proveedor
    duration: string;          // Duración (9 opciones oficiales)
    level: string;            // Nivel (Básico, Intermedio, Avanzado)
    progress: number;          // Progreso (0-100)
    status: 'default' | 'progress' | 'completed';
    image: string;            // Ruta de la imagen
    competency: string;       // Competencia (35 opciones oficiales)
    language: string;         // Idioma (Español, Inglés, Portugués)
}
```

## 🔧 FUNCIONALIDADES

### 1. Validación de Datos:
- Valida que el tipo de contenido sea válido
- Valida que la competencia sea oficial
- Muestra warnings en consola si hay errores

### 2. Reglas de Negocio:
- `getRecommendedDuration(type)`: Sugiere duración según tipo
  - Cápsula → 15 min
  - Artículo → 15 min
  - Ruta de aprendizaje → 120 min
  - Por defecto → 60 min

### 3. Renderizado:
- `renderCardContent(cardData)`: Renderiza una card individual
- `loadCardContent(containerId, cardsData)`: Carga múltiples cards en un contenedor

## 📱 RESPONSIVE

- **Desktop**: Layout completo con todos los elementos
- **Mobile (< 480px)**: 
  - Tamaño de fuente del thumbnail: 36px (desde 48px)
  - Padding del contenido: 16px (desde 8px 16px 16px 16px)

## 🎯 INTEGRACIÓN

### Uso Básico:
```javascript
loadCardContent('container-id', [{
    type: 'Cápsula',
    title: 'Mi contenido',
    provider: 'UBITS',
    providerLogo: 'images/Favicons/UBITS.jpg',
    duration: '15 min',
    level: 'Básico',
    progress: 50,
    status: 'progress',
    image: 'images/cards-learn/imagen.jpg',
    competency: 'Product design',
    language: 'Español'
}]);
```

## 🔍 OBSERVACIONES IMPORTANTES

1. **Imágenes**: Las rutas pueden variar según el proyecto
2. **Progreso**: Se muestra solo si `status !== 'default'`
3. **Estado completado**: Cambia el color de la barra a verde
4. **Iconos FontAwesome**: Requiere `fontawesome-icons.css`
5. **Tokens**: Requiere `ubits-colors.css` y `ubits-typography.css`

