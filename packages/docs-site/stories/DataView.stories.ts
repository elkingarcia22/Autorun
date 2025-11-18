import type { Meta, StoryObj } from '@storybook/html';
import { renderDataView, createDataView } from '../../addons/data-view/src/DataViewProvider';
import type { DataViewOptions, ProductData, StockStatus } from '../../addons/data-view/src/types/DataViewOptions';
// Importar estilos necesarios
import '../../addons/data-view/src/styles/data-view.css';
import '../../addons/button/src/styles/button.css';

const meta: Meta<DataViewOptions & {
  productCount?: number;
  defaultStockStatus?: StockStatus;
  defaultRating?: number;
  defaultPrice?: number;
}> = {
  title: 'Components/DataView',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente DataView UBITS para mostrar listas de productos con imagen, categoría, nombre, rating, precio, botón de favoritos y botón de compra. Usa tokens UBITS para colores, tipografía y espaciado.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    productCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de productos a mostrar',
      table: {
        defaultValue: { summary: '5' },
        type: { summary: 'number' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente (sm: imagen 80px, md: imagen 120px, lg: imagen 160px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' },
        category: 'Tamaño',
      },
    },
    showCategory: {
      control: { type: 'boolean' },
      description: 'Mostrar categoría del producto',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showRating: {
      control: { type: 'boolean' },
      description: 'Mostrar rating con estrellas',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showPrice: {
      control: { type: 'boolean' },
      description: 'Mostrar precio del producto',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showWishlist: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de favoritos',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showBuyButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de compra',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    buyButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón de compra',
      table: {
        defaultValue: { summary: 'Buy Now' },
      },
    },
    buyButtonIcon: {
      control: { type: 'text' },
      description: 'Icono del botón de compra (nombre FontAwesome sin prefijo fa-)',
      table: {
        defaultValue: { summary: 'shopping-cart' },
      },
    },
    wishlistIcon: {
      control: { type: 'text' },
      description: 'Icono del botón de favoritos (nombre FontAwesome sin prefijo fa-)',
      table: {
        defaultValue: { summary: 'heart' },
      },
    },
    defaultStockStatus: {
      control: { type: 'select' },
      options: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
      description: 'Estado de stock por defecto para los productos',
      table: {
        defaultValue: { summary: 'INSTOCK' },
        type: { summary: 'INSTOCK | LOWSTOCK | OUTOFSTOCK' },
      },
    },
    defaultRating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Rating por defecto para los productos',
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number (0-5)' },
      },
    },
    defaultPrice: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Precio por defecto para los productos',
      table: {
        defaultValue: { summary: '50' },
        type: { summary: 'number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DataViewOptions & {
  productCount?: number;
  defaultStockStatus?: StockStatus;
  defaultRating?: number;
  defaultPrice?: number;
}>;

// Datos de ejemplo de productos (usando imágenes reales)
const sampleProducts: ProductData[] = [
  {
    id: '1',
    image: '/images/cards-learn/administracion-efectiva-del-tiempo.jpg',
    imageAlt: 'Bamboo Watch',
    category: 'Accessories',
    name: 'Bamboo Watch',
    rating: 5,
    price: 65,
    stockStatus: 'INSTOCK',
    inWishlist: false,
  },
  {
    id: '2',
    image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
    imageAlt: 'Black Watch',
    category: 'Accessories',
    name: 'Black Watch',
    rating: 4,
    price: 72,
    stockStatus: 'INSTOCK',
    inWishlist: false,
  },
  {
    id: '3',
    image: '/images/cards-learn/introduccion-al-backend-node-js.jpeg',
    imageAlt: 'Blue Band',
    category: 'Fitness',
    name: 'Blue Band',
    rating: 3,
    price: 79,
    stockStatus: 'LOWSTOCK',
    inWishlist: false,
  },
  {
    id: '4',
    image: '/images/cards-learn/introduccion-al-desarrollo-web.jpeg',
    imageAlt: 'Blue T-Shirt',
    category: 'Clothing',
    name: 'Blue T-Shirt',
    rating: 5,
    price: 29,
    stockStatus: 'INSTOCK',
    inWishlist: true,
  },
  {
    id: '5',
    image: '/images/cards-learn/como-ejercer-el-liderazgo-inclusivo.jpeg',
    imageAlt: 'Bracelet',
    category: 'Accessories',
    name: 'Bracelet',
    rating: 4,
    price: 15,
    stockStatus: 'INSTOCK',
    inWishlist: false,
  },
];

// Función helper para generar productos desde los args
function generateProducts(
  count: number,
  defaultStockStatus: StockStatus = 'INSTOCK',
  defaultRating: number = 4,
  defaultPrice: number = 50
): ProductData[] {
  const categories = ['Accessories', 'Fitness', 'Clothing', 'Electronics', 'Home'];
  const names = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Wireless Headphones',
    'Smart Watch',
    'Running Shoes',
    'Yoga Mat',
    'Water Bottle',
  ];

  return Array.from({ length: count }, (_, index) => {
    const categoryIndex = index % categories.length;
    const nameIndex = index % names.length;
    
    // Variar el stock status
    const stockStatuses: StockStatus[] = ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'];
    const stockIndex = index % stockStatuses.length;
    
    // Variar el rating
    const ratings = [3, 3.5, 4, 4.5, 5];
    const ratingIndex = index % ratings.length;
    
    // Variar el precio
    const prices = [15, 29, 50, 65, 72, 79, 100];
    const priceIndex = index % prices.length;

    // Lista de imágenes reales disponibles
    const availableImages = [
      '/images/cards-learn/administracion-efectiva-del-tiempo.jpg',
      '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
      '/images/cards-learn/introduccion-al-backend-node-js.jpeg',
      '/images/cards-learn/introduccion-al-desarrollo-web.jpeg',
      '/images/cards-learn/como-ejercer-el-liderazgo-inclusivo.jpeg',
      '/images/cards-learn/flexbox-y-grid.jpeg',
      '/images/cards-learn/react-context-api.jpeg',
      '/images/cards-learn/agilidad-emocional.jpeg',
      '/images/cards-learn/primeros-pasos-en-react.jpeg',
      '/images/cards-learn/neuroliderazgo-configura-tu-mente.jpeg',
    ];

    return {
      id: `product-${index + 1}`,
      image: availableImages[index % availableImages.length],
      imageAlt: names[nameIndex],
      category: categories[categoryIndex],
      name: names[nameIndex],
      rating: defaultRating !== 4 ? defaultRating : ratings[ratingIndex],
      price: defaultPrice !== 50 ? defaultPrice : prices[priceIndex],
      stockStatus: defaultStockStatus !== 'INSTOCK' ? defaultStockStatus : stockStatuses[stockIndex],
      inWishlist: index % 3 === 0, // Cada tercer producto en wishlist
    };
  });
}

// Una sola historia con todos los controles
export const Default: Story = {
  args: {
    productCount: 5,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    buyButtonText: 'Buy Now',
    buyButtonIcon: 'shopping-cart',
    wishlistIcon: 'heart',
    defaultStockStatus: 'INSTOCK',
    defaultRating: 4,
    defaultPrice: 50,
  },
  render: (args) => {
    const {
      productCount = 5,
      size = 'md',
      defaultStockStatus = 'INSTOCK',
      defaultRating = 4,
      defaultPrice = 50,
      showCategory = true,
      showRating = true,
      showPrice = true,
      showWishlist = true,
      showBuyButton = true,
      buyButtonText = 'Buy Now',
      buyButtonIcon = 'shopping-cart',
      wishlistIcon = 'heart',
    } = args;

    // Generar productos
    const products = generateProducts(productCount, defaultStockStatus, defaultRating, defaultPrice);

    // Crear contenedor
    const container = document.createElement('div');
    container.id = 'data-view-container';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';
    container.style.padding = 'var(--ubits-spacing-lg, 24px)';
    container.style.background = 'var(--ubits-bg-2, #f5f5f5)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    container.style.border = '1px solid var(--ubits-border-1, #d0d2d5)';

    // Función para re-renderizar el DataView
    const renderDataViewComponent = () => {
      const dataViewOptions: DataViewOptions = {
        products,
        size,
        showCategory,
        showRating,
        showPrice,
        showWishlist,
        showBuyButton,
        buyButtonText,
        buyButtonIcon,
        wishlistIcon,
        onProductClick: (product, index) => {
          // Handler para click en producto
        },
        onBuyClick: (product, index) => {
          alert(`Comprar: ${product.name} - $${product.price}`);
        },
        onWishlistClick: (product, index) => {
          product.inWishlist = !product.inWishlist;
          // Re-renderizar el componente
          const dataViewElement = container.querySelector('.ubits-data-view');
          if (dataViewElement) {
            dataViewElement.remove();
          }
          const newDataView = createDataView(dataViewOptions);
          container.appendChild(newDataView);
        },
      };

      return createDataView(dataViewOptions);
    };

    // Crear DataView inicial
    const dataView = renderDataViewComponent();
    container.appendChild(dataView);

    return container;
  },
};

