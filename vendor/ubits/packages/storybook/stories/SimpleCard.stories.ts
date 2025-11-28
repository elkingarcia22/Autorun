import type { Meta, StoryObj } from '@storybook/html';
import { renderSimpleCard, createSimpleCard } from '../../addons/card/src/SimpleCardProvider';
import type { SimpleCardOptions } from '../../addons/card/src/types/SimpleCardOptions';
import '../../addons/card/src/styles/simple-card.css';
import '../../addons/button/src/styles/button.css';

// Tokens disponibles para controladores
const BACKGROUND_TOKENS = [
  'var(--modifiers-normal-color-light-bg-1)',
  'var(--modifiers-normal-color-light-bg-2)',
  'var(--modifiers-normal-color-light-bg-3)',
  'var(--modifiers-normal-color-light-bg-4)',
  'var(--modifiers-normal-color-light-bg-5)'
] as const;

const BORDER_COLOR_TOKENS = [
  'var(--modifiers-normal-color-light-border-1)',
  'var(--modifiers-normal-color-light-border-2)',
  'var(--modifiers-normal-color-light-border-3)'
] as const;

const BORDER_RADIUS_TOKENS = [
] as const;

const PADDING_TOKENS = [
] as const;

const HEADER_BACKGROUND_TOKENS = [
  'var(--modifiers-normal-color-light-bg-4)',
  'var(--modifiers-normal-color-light-bg-5)',
  'var(--modifiers-normal-color-light-accent-brand)',
  'var(--modifiers-normal-color-light-feedback-border-error)'
] as const;

const TYPOGRAPHY_CLASSES = [
  'ubits-heading-h1',
  'ubits-heading-h2',
  'ubits-body-lg',
  'ubits-body-md',
  'ubits-body-sm'
] as const;

const meta: Meta<SimpleCardOptions & {
  // Controladores de tokens
  backgroundColorToken?: string;
  borderColorToken?: string;
  borderRadiusToken?: string;
  paddingToken?: string;
  headerBackgroundToken?: string;
  // Controladores de tipografía
  titleTypographyClass?: string;
  subtitleTypographyClass?: string;
  contentTypographyClass?: string;
  // Controladores de botones
  button1Label?: string;
  button1Variant?: 'primary' | 'secondary' | 'tertiary';
  button1Size?: 'xs' | 'sm' | 'md' | 'lg';
  button2Label?: string;
  button2Variant?: 'primary' | 'secondary' | 'tertiary';
  button2Size?: 'xs' | 'sm' | 'md' | 'lg';
}> = {
  title: 'Layout/Simple Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Simple Card UBITS con header decorativo, contenido y botones de acción. Usa tokens UBITS para colores, tipografía y espaciado. Incluye controladores completos para personalizar todos los aspectos del componente.'
}
},
    layout: 'centered'
},
  argTypes: {
    // Contenido
    title: {
      control: { type: 'text' },
      description: 'Título de la card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Advanced Card' },
        category: 'Contenido'
}
},
    subtitle: {
      control: { type: 'text' },
      description: 'Subtítulo de la card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Card subtitle' },
        category: 'Contenido'
}
},
    content: {
      control: { type: 'text' },
      description: 'Contenido de la card',
      table: {
        type: { summary: 'string' },
        category: 'Contenido'
}
},
    // Header
    showHeader: {
      control: { type: 'boolean' },
      description: 'Mostrar header decorativo',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Header'
}
},
    headerDecorations: {
      control: { type: 'boolean' },
      description: 'Mostrar burbujas decorativas en el header',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Header'
}
},
    headerBackgroundToken: {
      control: { type: 'select' },
      options: HEADER_BACKGROUND_TOKENS,
      description: 'Token de color para el fondo del header',
      table: {
        type: { summary: 'CSS Variable' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-4)' },
        category: 'Tokens - Header'
}
},
    // Tokens - Colores
    backgroundColorToken: {
      control: { type: 'select' },
      options: BACKGROUND_TOKENS,
      description: 'Token de color para el fondo de la card',
      table: {
        type: { summary: 'CSS Variable' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-1)' },
        category: 'Tokens - Colores'
}
},
    borderColorToken: {
      control: { type: 'select' },
      options: BORDER_COLOR_TOKENS,
      description: 'Token de color para el borde de la card',
      table: {
        type: { summary: 'CSS Variable' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-border-1)' },
        category: 'Tokens - Colores'
}
},
    // Tokens - Espaciado
    paddingToken: {
      control: { type: 'select' },
      options: PADDING_TOKENS,
      description: 'Token de espaciado para el padding de la card',
      table: {
        type: { summary: 'CSS Variable' },
        category: 'Tokens - Espaciado'
}
},
    // Tokens - Border Radius
    borderRadiusToken: {
      control: { type: 'select' },
      options: BORDER_RADIUS_TOKENS,
      description: 'Token de border radius para la card',
      table: {
        type: { summary: 'CSS Variable' },
        category: 'Tokens - Border Radius'
}
},
    // Tipografía
    titleTypographyClass: {
      control: { type: 'select' },
      options: TYPOGRAPHY_CLASSES,
      description: 'Clase de tipografía UBITS para el título',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ubits-heading-h2' },
        category: 'Tipografía'
}
},
    subtitleTypographyClass: {
      control: { type: 'select' },
      options: TYPOGRAPHY_CLASSES,
      description: 'Clase de tipografía UBITS para el subtítulo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ubits-body-md' },
        category: 'Tipografía'
}
},
    contentTypographyClass: {
      control: { type: 'select' },
      options: TYPOGRAPHY_CLASSES,
      description: 'Clase de tipografía UBITS para el contenido',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ubits-body-md' },
        category: 'Tipografía'
}
},
    // Variantes
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'bordered', 'flat'],
      description: 'Variante visual de la card',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | elevated | bordered | flat' },
        category: 'Apariencia'
}
},
    // Tamaño
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño de la card (sm: 280px, md: 400px, lg: 560px, xl: 720px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg | xl' },
        category: 'Tamaño'
}
},
    maxWidth: {
      control: { type: 'text' },
      description: 'Ancho máximo personalizado (sobrescribe el tamaño por defecto)',
      table: {
        type: { summary: 'string' },
        example: { summary: '500px | 50% | 100vw' },
        category: 'Tamaño'
}
},
    // Botones
    showButtons: {
      control: { type: 'boolean' },
      description: 'Mostrar botones en el footer',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Botones'
}
},
    button1Label: {
      control: { type: 'text' },
      description: 'Texto del primer botón',
      table: {
        defaultValue: { summary: 'Cancel' },
        category: 'Botones'
}
},
    button1Variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante del primer botón',
      table: {
        defaultValue: { summary: 'secondary' },
        category: 'Botones'
}
},
    button1Size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del primer botón',
      table: {
        defaultValue: { summary: 'md' },
        category: 'Botones'
}
},
    button2Label: {
      control: { type: 'text' },
      description: 'Texto del segundo botón',
      table: {
        defaultValue: { summary: 'Save' },
        category: 'Botones'
}
},
    button2Variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante del segundo botón',
      table: {
        defaultValue: { summary: 'primary' },
        category: 'Botones'
}
},
    button2Size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del segundo botón',
      table: {
        defaultValue: { summary: 'md' },
        category: 'Botones'
}
}
}
};

export default meta;
type Story = StoryObj<SimpleCardOptions & {
  backgroundColorToken?: string;
  borderColorToken?: string;
  borderRadiusToken?: string;
  paddingToken?: string;
  headerBackgroundToken?: string;
  titleTypographyClass?: string;
  subtitleTypographyClass?: string;
  contentTypographyClass?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: string;
  button1Label?: string;
  button1Variant?: 'primary' | 'secondary' | 'tertiary';
  button1Size?: 'xs' | 'sm' | 'md' | 'lg';
  button2Label?: string;
  button2Variant?: 'primary' | 'secondary' | 'tertiary';
  button2Size?: 'xs' | 'sm' | 'md' | 'lg';
}>;

// Función helper para construir SimpleCardOptions desde args
function buildSimpleCardOptions(args: any): SimpleCardOptions {
  const buttons = [];
  
  if (args.showButtons !== false) {
    if (args.button1Label) {
      buttons.push({
        label: args.button1Label,
        variant: args.button1Variant || 'secondary',
        size: args.button1Size || 'md'
});
    }
    if (args.button2Label) {
      buttons.push({
        label: args.button2Label,
        variant: args.button2Variant || 'primary',
        size: args.button2Size || 'md'
});
    }
  }

  return {
    title: args.title || 'Advanced Card',
    subtitle: args.subtitle || 'Card subtitle',
    content: args.content || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    showHeader: args.showHeader !== false,
    headerDecorations: args.headerDecorations !== false,
    headerBackground: args.headerBackgroundToken || 'var(--modifiers-normal-color-light-bg-4)',
    backgroundColor: args.backgroundColorToken || 'var(--modifiers-normal-color-light-bg-1)',
    borderColor: args.borderColorToken || 'var(--modifiers-normal-color-light-border-1)',
    titleTypography: (args.titleTypographyClass || 'ubits-heading-h2') as any,
    subtitleTypography: (args.subtitleTypographyClass || 'ubits-body-md') as any,
    contentTypography: (args.contentTypographyClass || 'ubits-body-md') as any,
    buttons: buttons.length > 0 ? buttons : undefined,
    showButtons: args.showButtons !== false,
    variant: args.variant || 'default',
    size: args.size || 'md',
    maxWidth: args.maxWidth
};
}

export const Default: Story = {
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    showHeader: true,
    headerDecorations: true,
    headerBackgroundToken: 'var(--modifiers-normal-color-light-bg-4)',
    backgroundColorToken: 'var(--modifiers-normal-color-light-bg-1)',
    borderColorToken: 'var(--modifiers-normal-color-light-border-1)',
    titleTypographyClass: 'ubits-heading-h2',
    subtitleTypographyClass: 'ubits-body-md',
    contentTypographyClass: 'ubits-body-md',
    variant: 'default',
    size: 'md',
    showButtons: true,
    button1Label: 'Cancel',
    button1Variant: 'secondary',
    button1Size: 'md',
    button2Label: 'Save',
    button2Variant: 'primary',
    button2Size: 'md'
},
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.minHeight = '400px';
    container.style.width = '100%';
    
    // Crear wrapper para la card - no limitar ancho, la card se auto-limita según su size
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    
    // Crear card
    const cardElement = createSimpleCard(cardOptions);
    wrapper.appendChild(cardElement);
    container.appendChild(wrapper);
    
    return container;
  }
};

