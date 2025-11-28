/**
 * Controlador de Imágenes para Welcome Pages
 * Proporciona una galería de 50 imágenes de alta resolución para seleccionar
 */

// Galería de 50 imágenes de alta resolución de Unsplash
// Todas las imágenes están optimizadas para alta resolución (w=1920&h=1080&fit=crop&auto=format)
const IMAGE_GALLERY = [
    {
        id: 1,
        name: 'Equipo trabajando',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
        category: 'team',
        description: 'Equipo colaborando en proyecto'
    },
    {
        id: 2,
        name: 'Oficina moderna',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format',
        category: 'office',
        description: 'Espacio de trabajo moderno'
    },
    {
        id: 3,
        name: 'Tecnología',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop&auto=format',
        category: 'technology',
        description: 'Tecnología y innovación'
    },
    {
        id: 4,
        name: 'Reunión de trabajo',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
        category: 'meeting',
        description: 'Reunión de equipo'
    },
    {
        id: 5,
        name: 'Desarrollo',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop&auto=format',
        category: 'development',
        description: 'Desarrollo de software'
    },
    {
        id: 6,
        name: 'Creatividad',
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&h=1080&fit=crop&auto=format',
        category: 'creativity',
        description: 'Espacio creativo'
    },
    {
        id: 7,
        name: 'Colaboración',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&auto=format',
        category: 'collaboration',
        description: 'Trabajo en equipo'
    },
    {
        id: 8,
        name: 'Innovación',
        url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop&auto=format',
        category: 'innovation',
        description: 'Innovación y tecnología'
    },
    {
        id: 9,
        name: 'Presentación',
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&auto=format',
        category: 'presentation',
        description: 'Presentación de ideas'
    },
    {
        id: 10,
        name: 'Estrategia',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
        category: 'strategy',
        description: 'Planificación estratégica'
    },
    {
        id: 11,
        name: 'Startup',
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop&auto=format',
        category: 'startup',
        description: 'Ambiente startup'
    },
    {
        id: 12,
        name: 'Diseño',
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop&auto=format',
        category: 'design',
        description: 'Proceso de diseño'
    },
    {
        id: 13,
        name: 'Productividad',
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&auto=format',
        category: 'productivity',
        description: 'Espacio productivo'
    },
    {
        id: 14,
        name: 'Comunicación',
        url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=1080&fit=crop&auto=format',
        category: 'communication',
        description: 'Comunicación efectiva'
    },
    {
        id: 15,
        name: 'Liderazgo',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
        category: 'leadership',
        description: 'Liderazgo empresarial'
    },
    {
        id: 16,
        name: 'Aprendizaje',
        url: 'https://images.unsplash.com/photo-1503676260721-4d00da4a4da4?w=1920&h=1080&fit=crop&auto=format',
        category: 'learning',
        description: 'Ambiente de aprendizaje'
    },
    {
        id: 17,
        name: 'Networking',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop&auto=format',
        category: 'networking',
        description: 'Networking profesional'
    },
    {
        id: 18,
        name: 'Workshop',
        url: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1920&h=1080&fit=crop&auto=format',
        category: 'workshop',
        description: 'Taller de trabajo'
    },
    {
        id: 19,
        name: 'Brainstorming',
        url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1920&h=1080&fit=crop&auto=format',
        category: 'brainstorming',
        description: 'Sesión de lluvia de ideas'
    },
    {
        id: 20,
        name: 'Conferencia',
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&h=1080&fit=crop&auto=format',
        category: 'conference',
        description: 'Evento de conferencia'
    },
    {
        id: 21,
        name: 'Coworking',
        url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop&auto=format',
        category: 'coworking',
        description: 'Espacio coworking'
    },
    {
        id: 22,
        name: 'Mentoría',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
        category: 'mentoring',
        description: 'Sesión de mentoría'
    },
    {
        id: 23,
        name: 'Innovación digital',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
        category: 'digital',
        description: 'Transformación digital'
    },
    {
        id: 24,
        name: 'Análisis de datos',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
        category: 'data',
        description: 'Análisis y visualización'
    },
    {
        id: 25,
        name: 'Marketing',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&auto=format',
        category: 'marketing',
        description: 'Estrategia de marketing'
    },
    {
        id: 26,
        name: 'Ventas',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
        category: 'sales',
        description: 'Equipo de ventas'
    },
    {
        id: 27,
        name: 'Recursos humanos',
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&auto=format',
        category: 'hr',
        description: 'Gestión de talento'
    },
    {
        id: 28,
        name: 'Finanzas',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
        category: 'finance',
        description: 'Análisis financiero'
    },
    {
        id: 29,
        name: 'Proyecto',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&auto=format',
        category: 'project',
        description: 'Gestión de proyectos'
    },
    {
        id: 30,
        name: 'Calidad',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&auto=format',
        category: 'quality',
        description: 'Control de calidad'
    },
    {
        id: 31,
        name: 'Satisfacción',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
        category: 'satisfaction',
        description: 'Satisfacción del cliente'
    },
    {
        id: 32,
        name: 'Crecimiento',
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop&auto=format',
        category: 'growth',
        description: 'Crecimiento empresarial'
    },
    {
        id: 33,
        name: 'Éxito',
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&auto=format',
        category: 'success',
        description: 'Celebración del éxito'
    },
    {
        id: 34,
        name: 'Motivación',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
        category: 'motivation',
        description: 'Equipo motivado'
    },
    {
        id: 35,
        name: 'Objetivos',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&auto=format',
        category: 'goals',
        description: 'Establecimiento de objetivos'
    },
    {
        id: 36,
        name: 'Resultados',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&auto=format',
        category: 'results',
        description: 'Análisis de resultados'
    },
    {
        id: 37,
        name: 'Eficiencia',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
        category: 'efficiency',
        description: 'Optimización de procesos'
    },
    {
        id: 38,
        name: 'Transformación',
        url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop&auto=format',
        category: 'transformation',
        description: 'Transformación empresarial'
    },
    {
        id: 39,
        name: 'Competitividad',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
        category: 'competitiveness',
        description: 'Ventaja competitiva'
    },
    {
        id: 40,
        name: 'Sostenibilidad',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format',
        category: 'sustainability',
        description: 'Prácticas sostenibles'
    },
    {
        id: 41,
        name: 'Diversidad',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&auto=format',
        category: 'diversity',
        description: 'Equipo diverso'
    },
    {
        id: 42,
        name: 'Inclusión',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
        category: 'inclusion',
        description: 'Ambiente inclusivo'
    },
    {
        id: 43,
        name: 'Bienestar',
        url: 'https://images.unsplash.com/photo-1503676260721-4d00da4a4da4?w=1920&h=1080&fit=crop&auto=format',
        category: 'wellbeing',
        description: 'Bienestar laboral'
    },
    {
        id: 44,
        name: 'Balance',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop&auto=format',
        category: 'balance',
        description: 'Balance vida-trabajo'
    },
    {
        id: 45,
        name: 'Desarrollo profesional',
        url: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1920&h=1080&fit=crop&auto=format',
        category: 'development',
        description: 'Crecimiento profesional'
    },
    {
        id: 46,
        name: 'Capacitación',
        url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1920&h=1080&fit=crop&auto=format',
        category: 'training',
        description: 'Programa de capacitación'
    },
    {
        id: 47,
        name: 'Evaluación',
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&h=1080&fit=crop&auto=format',
        category: 'evaluation',
        description: 'Proceso de evaluación'
    },
    {
        id: 48,
        name: 'Feedback',
        url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop&auto=format',
        category: 'feedback',
        description: 'Sesión de feedback'
    },
    {
        id: 49,
        name: 'Mejora continua',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
        category: 'improvement',
        description: 'Mejora continua'
    },
    {
        id: 50,
        name: 'Excelencia',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
        category: 'excellence',
        description: 'Búsqueda de excelencia'
    }
];

/**
 * Clase ImageController
 * Maneja la selección y gestión de imágenes para welcome pages
 */
class ImageController {
    constructor(options = {}) {
        this.gallery = IMAGE_GALLERY;
        this.selectedImage = null;
        this.onImageSelect = options.onImageSelect || null;
        this.currentCategory = 'all';
    }

    /**
     * Obtiene todas las imágenes de la galería
     */
    getAllImages() {
        return this.gallery;
    }

    /**
     * Obtiene una imagen por ID
     */
    getImageById(id) {
        return this.gallery.find(img => img.id === id);
    }

    /**
     * Obtiene imágenes por categoría
     */
    getImagesByCategory(category) {
        if (category === 'all') {
            return this.gallery;
        }
        return this.gallery.filter(img => img.category === category);
    }

    /**
     * Obtiene todas las categorías únicas
     */
    getCategories() {
        const categories = [...new Set(this.gallery.map(img => img.category))];
        return ['all', ...categories];
    }

    /**
     * Selecciona una imagen
     */
    selectImage(imageId) {
        const image = this.getImageById(imageId);
        if (image) {
            this.selectedImage = image;
            if (this.onImageSelect) {
                this.onImageSelect(image);
            }
            return image;
        }
        return null;
    }

    /**
     * Obtiene la imagen seleccionada
     */
    getSelectedImage() {
        return this.selectedImage;
    }

    /**
     * Busca imágenes por nombre o descripción
     */
    searchImages(query) {
        const lowerQuery = query.toLowerCase();
        return this.gallery.filter(img => 
            img.name.toLowerCase().includes(lowerQuery) ||
            img.description.toLowerCase().includes(lowerQuery) ||
            img.category.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Obtiene una imagen aleatoria
     */
    getRandomImage() {
        const randomIndex = Math.floor(Math.random() * this.gallery.length);
        return this.gallery[randomIndex];
    }
}

/**
 * Crea y muestra el modal de selección de imágenes
 */
function createImageSelectorModal(imageController, onSelect) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'image-selector-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--ubits-spacing-xl, 24px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'image-selector-modal';
    modal.style.cssText = `
        background: var(--ubits-bg-1);
        border-radius: var(--ubits-border-radius-lg, 16px);
        max-width: 1200px;
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: var(--ubits-effects-elevation-4, 0px 8px 16px 0px rgba(0, 0, 0, 0.2));
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

    // Header del modal
    const header = document.createElement('div');
    header.style.cssText = `
        padding: var(--ubits-spacing-xl, 24px);
        border-bottom: 1px solid var(--ubits-border-1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const title = document.createElement('h2');
    title.className = 'ubits-heading-h2';
    title.textContent = 'Seleccionar Imagen';
    title.style.cssText = `
        margin: 0;
        color: var(--ubits-fg-1-high);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ubits-button ubits-button--ghost ubits-button--sm';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.onclick = () => closeModal();

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Barra de búsqueda y filtros
    const filtersBar = document.createElement('div');
    filtersBar.style.cssText = `
        padding: var(--ubits-spacing-lg, 20px) var(--ubits-spacing-xl, 24px);
        border-bottom: 1px solid var(--ubits-border-1);
        display: flex;
        gap: var(--ubits-spacing-md, 16px);
        flex-wrap: wrap;
    `;

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'ubits-input';
    searchInput.placeholder = 'Buscar imagen...';
    searchInput.style.cssText = `
        flex: 1;
        min-width: 200px;
    `;

    const categorySelect = document.createElement('select');
    categorySelect.className = 'ubits-input';
    categorySelect.style.cssText = `
        min-width: 150px;
    `;

    const categories = imageController.getCategories();
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat === 'all' ? 'Todas las categorías' : cat.charAt(0).toUpperCase() + cat.slice(1);
        categorySelect.appendChild(option);
    });

    filtersBar.appendChild(searchInput);
    filtersBar.appendChild(categorySelect);

    // Contenedor de imágenes
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'image-selector-grid';
    imagesContainer.style.cssText = `
        padding: var(--ubits-spacing-xl, 24px);
        overflow-y: auto;
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: var(--ubits-spacing-md, 16px);
    `;

    // Función para renderizar imágenes
    function renderImages(images) {
        imagesContainer.innerHTML = '';
        images.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.className = 'image-selector-card';
            imageCard.style.cssText = `
                position: relative;
                aspect-ratio: 16/9;
                border-radius: var(--ubits-border-radius-md);
                overflow: hidden;
                cursor: pointer;
                border: 2px solid transparent;
                transition: all 0.2s ease;
                background: var(--ubits-bg-3);
            `;

            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.name;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
            `;

            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: var(--ubits-spacing-sm, 12px);
                opacity: 0;
                transition: opacity 0.2s ease;
            `;

            const name = document.createElement('div');
            name.className = 'ubits-body-md';
            name.textContent = image.name;
            name.style.cssText = `
                color: var(--ubits-fg-1-high);
                font-weight: var(--weight-semibold, 600);
                margin-bottom: var(--ubits-spacing-xxs, 4px);
            `;

            const desc = document.createElement('div');
            desc.className = 'ubits-body-sm';
            desc.textContent = image.description;
            desc.style.cssText = `
                color: var(--ubits-fg-1-medium);
            `;

            overlay.appendChild(name);
            overlay.appendChild(desc);

            imageCard.appendChild(img);
            imageCard.appendChild(overlay);

            imageCard.onmouseenter = () => {
                overlay.style.opacity = '1';
                imageCard.style.borderColor = 'var(--ubits-accent-brand)';
                imageCard.style.transform = 'translateY(-4px)';
                imageCard.style.boxShadow = 'var(--ubits-effects-elevation-3)';
            };

            imageCard.onmouseleave = () => {
                overlay.style.opacity = '0';
                imageCard.style.borderColor = 'transparent';
                imageCard.style.transform = 'translateY(0)';
                imageCard.style.boxShadow = 'none';
            };

            imageCard.onclick = () => {
                imageController.selectImage(image.id);
                if (onSelect) {
                    onSelect(image);
                }
                closeModal();
            };

            imagesContainer.appendChild(imageCard);
        });
    }

    // Renderizar imágenes iniciales
    renderImages(imageController.getAllImages());

    // Event listeners
    let searchTimeout;
    searchInput.oninput = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = searchInput.value.trim();
            const category = categorySelect.value;
            let images;

            if (query) {
                images = imageController.searchImages(query);
            } else {
                images = imageController.getImagesByCategory(category);
            }

            renderImages(images);
        }, 300);
    };

    categorySelect.onchange = () => {
        const query = searchInput.value.trim();
        const category = categorySelect.value;
        let images;

        if (query) {
            images = imageController.searchImages(query);
            images = images.filter(img => category === 'all' || img.category === category);
        } else {
            images = imageController.getImagesByCategory(category);
        }

        renderImages(images);
    };

    // Función para cerrar modal
    function closeModal() {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    }

    // Cerrar al hacer click fuera del modal
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    };

    // Ensamblar modal
    modal.appendChild(header);
    modal.appendChild(filtersBar);
    modal.appendChild(imagesContainer);
    overlay.appendChild(modal);

    // Agregar al DOM
    document.body.appendChild(overlay);

    // Animar entrada
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ImageController = ImageController;
    window.createImageSelectorModal = createImageSelectorModal;
    window.IMAGE_GALLERY = IMAGE_GALLERY;
}

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ImageController,
        createImageSelectorModal,
        IMAGE_GALLERY
    };
}

