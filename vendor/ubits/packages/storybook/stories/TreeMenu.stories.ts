import type { Meta, StoryObj } from '@storybook/html';

interface TreeNode {
  label: string;
  icon?: string;
  children?: TreeNode[];
}

const meta: Meta<{
  showIcons?: boolean;
  showChevron?: boolean;
  maxLevels?: number;
  defaultExpanded?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  cascade?: boolean;
}> = {
  title: 'Navegación/TreeMenu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Tree Menu UBITS para mostrar estructuras jerárquicas con expandir/colapsar. Soporta iconos opcionales, múltiples niveles, chevron opcional y modo cascada o vertical.',
      },
    },
  },
  argTypes: {
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los nodos del árbol',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showChevron: {
      control: { type: 'boolean' },
      description: 'Mostrar icono de chevron (flecha) para expandir/colapsar',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    maxLevels: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'Cantidad máxima de niveles en el árbol',
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' },
      },
    },
    defaultExpanded: {
      control: { type: 'boolean' },
      description: 'Expandir todos los nodos por defecto',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del texto y espaciado (matching List component)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    cascade: {
      control: { type: 'boolean' },
      description: 'Modo cascada (con indentación) o vertical (sin indentación, se despliega hacia abajo)',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Función para renderizar icono FontAwesome
function renderIcon(iconName: string, style: 'regular' | 'solid' = 'regular'): string {
  const iconClass = style === 'solid' ? 'fas' : 'far';
  return `<i class="${iconClass} fa-${iconName}"></i>`;
}

// Función para generar datos de ejemplo según niveles
function generateTreeData(maxLevels: number, showIcons: boolean): TreeNode[] {
  const icons = ['code', 'paint-brush', 'cog', 'users', 'chart-line', 'file-alt', 'folder', 'tag'];
  
  if (maxLevels === 1) {
    return [
      { label: 'Engineering', icon: showIcons ? 'code' : undefined },
      { label: 'Marketing', icon: showIcons ? 'chart-line' : undefined },
      { label: 'Operations', icon: showIcons ? 'cog' : undefined },
    ];
  }
  
  if (maxLevels === 2) {
    return [
      {
        label: 'Engineering',
        icon: showIcons ? 'code' : undefined,
        children: [
          { label: 'Frontend', icon: showIcons ? 'paint-brush' : undefined },
          { label: 'Backend', icon: showIcons ? 'server' : undefined },
          { label: 'Platform Team', icon: showIcons ? 'cog' : undefined },
        ],
      },
      {
        label: 'Marketing',
        icon: showIcons ? 'chart-line' : undefined,
        children: [
          { label: 'Content', icon: showIcons ? 'file-alt' : undefined },
          { label: 'SEO', icon: showIcons ? 'search' : undefined },
        ],
      },
      {
        label: 'Operations',
        icon: showIcons ? 'cog' : undefined,
        children: [
          { label: 'Support', icon: showIcons ? 'headset' : undefined },
        ],
      },
    ];
  }
  
  if (maxLevels === 3) {
    return [
      {
        label: 'Engineering',
        icon: showIcons ? 'code' : undefined,
        children: [
          {
            label: 'Frontend',
            icon: showIcons ? 'paint-brush' : undefined,
            children: [
              {
                label: 'Design System',
                icon: showIcons ? 'palette' : undefined,
                children: [
                  { label: 'Components', icon: showIcons ? 'cubes' : undefined },
                  { label: 'Tokens', icon: showIcons ? 'tags' : undefined },
                  { label: 'Guidelines', icon: showIcons ? 'book' : undefined },
                ],
              },
              { label: 'Web Platform', icon: showIcons ? 'globe' : undefined },
            ],
          },
          { label: 'Backend', icon: showIcons ? 'server' : undefined },
          { label: 'Platform Team', icon: showIcons ? 'cog' : undefined },
        ],
      },
      {
        label: 'Marketing',
        icon: showIcons ? 'chart-line' : undefined,
        children: [
          { label: 'Content', icon: showIcons ? 'file-alt' : undefined },
        ],
      },
      {
        label: 'Operations',
        icon: showIcons ? 'cog' : undefined,
      },
    ];
  }
  
  if (maxLevels === 4) {
    return [
      {
        label: 'Engineering',
        icon: showIcons ? 'code' : undefined,
        children: [
          {
            label: 'Frontend',
            icon: showIcons ? 'paint-brush' : undefined,
            children: [
              {
                label: 'Design System',
                icon: showIcons ? 'palette' : undefined,
                children: [
                  {
                    label: 'Components',
                    icon: showIcons ? 'cubes' : undefined,
                    children: [
                      { label: 'Button', icon: showIcons ? 'square' : undefined },
                      { label: 'Input', icon: showIcons ? 'keyboard' : undefined },
                    ],
                  },
                  { label: 'Tokens', icon: showIcons ? 'tags' : undefined },
                  { label: 'Guidelines', icon: showIcons ? 'book' : undefined },
                ],
              },
              { label: 'Web Platform', icon: showIcons ? 'globe' : undefined },
            ],
          },
          { label: 'Backend', icon: showIcons ? 'server' : undefined },
        ],
      },
      {
        label: 'Marketing',
        icon: showIcons ? 'chart-line' : undefined,
      },
    ];
  }
  
  // maxLevels === 5
  return [
    {
      label: 'Engineering',
      icon: showIcons ? 'code' : undefined,
      children: [
        {
          label: 'Frontend',
          icon: showIcons ? 'paint-brush' : undefined,
          children: [
            {
              label: 'Design System',
              icon: showIcons ? 'palette' : undefined,
              children: [
                {
                  label: 'Components',
                  icon: showIcons ? 'cubes' : undefined,
                  children: [
                    {
                      label: 'Button',
                      icon: showIcons ? 'square' : undefined,
                      children: [
                        { label: 'Primary', icon: showIcons ? 'circle' : undefined },
                        { label: 'Secondary', icon: showIcons ? 'circle' : undefined },
                      ],
                    },
                    { label: 'Input', icon: showIcons ? 'keyboard' : undefined },
                  ],
                },
                { label: 'Tokens', icon: showIcons ? 'tags' : undefined },
              ],
            },
          ],
        },
      ],
    },
  ];
}

// Función para renderizar un nodo del árbol
function renderTreeNode(
  node: TreeNode,
  level: number = 0,
  maxLevels: number,
  defaultExpanded: boolean,
  showIcons: boolean,
  showChevron: boolean,
  cascade: boolean,
  size: 'xs' | 'sm' | 'md' | 'lg',
  uniqueId: string
): string {
  const hasChildren = node.children && node.children.length > 0;
  const nodeId = `${uniqueId}-node-${level}-${node.label.toLowerCase().replace(/\s+/g, '-')}`;
  const isExpanded = defaultExpanded && hasChildren;
  
  // Clases de tipografía según tamaño (matching List component)
  const typographyClass = size === 'xs'
    ? 'ubits-body-xs-regular'
    : size === 'sm' 
    ? 'ubits-body-sm-regular' 
    : size === 'lg' 
    ? 'ubits-body-lg-regular' 
    : 'ubits-body-md-regular';
  
  // Espaciado según modo (cascada o vertical)
  const paddingLeft = cascade 
    ? (size === 'xs'
      ? `calc(var(--p-spacing-mode-1-sm, 8px) * ${level})`
      : size === 'sm' 
      ? `calc(var(--p-spacing-mode-1-md, 16px) * ${level})` 
      : size === 'lg'
      ? `calc(var(--p-spacing-mode-1-lg, 24px) * ${level})`
      : `calc(var(--p-spacing-mode-1-md, 16px) * ${level})`)
    : '0';
  
  // Tamaños de iconos y chevrons según tamaño (matching List component)
  const iconSize = size === 'xs' ? '12px' : size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px';
  const chevronSize = size === 'xs' ? '10px' : size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px';
  
  // Calcular valores exactos según tamaño (matching List component exactly)
  // xs: padding 8px 12px, font-size 11px, line-height 16.5px, min-height 28px
  // sm: padding 10px 14px, font-size 13px, line-height 19.5px, min-height 32px
  // md: padding 12px 16px, font-size 16px, line-height 24px, min-height 40px
  // lg: padding 16px 20px, font-size 20px, line-height 30px, min-height 48px
  const padding = size === 'xs' ? '8px 12px' : size === 'sm' ? '10px 14px' : size === 'lg' ? '16px 20px' : '12px 16px';
  const minHeight = size === 'xs' ? '28px' : size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px';
  const fontSize = size === 'xs' ? 'var(--modifiers-normal-body-xs-regular-fontsize)' : size === 'sm' ? 'var(--modifiers-normal-body-sm-regular-fontsize)' : size === 'lg' ? 'var(--modifiers-normal-body-lg-regular-fontsize)' : 'var(--modifiers-normal-body-md-regular-fontsize)';
  const lineHeight = size === 'xs' ? 'var(--modifiers-normal-body-xs-regular-lineheight)' : size === 'sm' ? 'var(--modifiers-normal-body-sm-regular-lineheight)' : size === 'lg' ? 'var(--modifiers-normal-body-lg-regular-lineheight)' : 'var(--modifiers-normal-body-md-regular-lineheight)';
  
  let html = `
    <div class="ubits-tree-node ${cascade ? 'ubits-tree-node--cascade' : 'ubits-tree-node--vertical'}" data-level="${level}" style="${cascade ? `padding-left: ${paddingLeft};` : ''}">
      <div 
        class="ubits-tree-node__content ${hasChildren ? 'ubits-tree-node__content--expandable' : ''}" 
        data-node-id="${nodeId}"
        data-size="${size}"
        style="min-height: ${minHeight} !important; padding: ${padding} !important; font-size: ${fontSize} !important; line-height: ${lineHeight} !important; margin: 0 !important; border: none !important;"
        ${hasChildren ? `data-expanded="${isExpanded}"` : ''}
        role="${hasChildren ? 'button' : 'treeitem'}"
        ${hasChildren ? 'tabindex="0"' : ''}
        aria-expanded="${hasChildren ? isExpanded : undefined}"
        aria-label="${node.label}"
      >
        ${hasChildren && showChevron ? `
          <span class="ubits-tree-node__chevron" style="width: ${chevronSize}; height: ${chevronSize};">
            <i class="far fa-chevron-${isExpanded ? 'down' : 'right'}" style="font-size: ${chevronSize};"></i>
          </span>
        ` : hasChildren && !showChevron ? `
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
        ` : `
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
        `}
        ${showIcons && node.icon ? `
          <span class="ubits-tree-node__icon" style="font-size: ${iconSize};">
            ${renderIcon(node.icon, 'regular')}
          </span>
        ` : ''}
        <span class="ubits-tree-node__label ${typographyClass}" style="line-height: ${lineHeight};">${node.label}</span>
      </div>
      ${hasChildren ? `
        <div class="ubits-tree-node__children ${cascade ? 'ubits-tree-node__children--cascade' : 'ubits-tree-node__children--vertical'}" data-children-id="${nodeId}" style="display: ${isExpanded ? 'block' : 'none'};">
          ${node.children!.map(child => 
            renderTreeNode(child, level + 1, maxLevels, defaultExpanded, showIcons, showChevron, cascade, size, uniqueId)
          ).join('')}
        </div>
      ` : ''}
    </div>
  `;
  
  return html;
}

// Función para renderizar el árbol completo
function renderTreeMenu(args: {
  showIcons?: boolean;
  showChevron?: boolean;
  maxLevels?: number;
  defaultExpanded?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  cascade?: boolean;
}): string {
  const {
    showIcons = true,
    showChevron = true,
    maxLevels = 3,
    defaultExpanded = false,
    size = 'md',
    cascade = true,
  } = args;
  
  const uniqueId = `tree-${Date.now()}`;
  const treeData = generateTreeData(maxLevels, showIcons);
  
  const treeHTML = `
    <div class="ubits-tree-menu ${cascade ? 'ubits-tree-menu--cascade' : 'ubits-tree-menu--vertical'}" id="${uniqueId}" role="tree">
      ${treeData.map(node => renderTreeNode(node, 0, maxLevels, defaultExpanded, showIcons, showChevron, cascade, size, uniqueId)).join('')}
    </div>
  `;
  
  return treeHTML;
}

export const Default: Story = {
  args: {
    showIcons: true,
    showChevron: true,
    maxLevels: 3,
    defaultExpanded: false,
    size: 'md',
    cascade: true,
  },
  render: (args) => {
    // Crear contenedor principal
    const container = document.createElement('div');
    container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      max-width: 600px;
    `;
    
    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      padding: var(--p-spacing-mode-1-md, 16px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      margin-bottom: var(--p-spacing-mode-1-lg, 24px);
    `;
    infoPanel.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong class="ubits-body-md-semibold" style="color: var(--modifiers-normal-color-light-fg-1-high);">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);" class="ubits-body-sm-regular">
        <div><strong>Iconos:</strong> ${args.showIcons ? 'Sí' : 'No'}</div>
        <div><strong>Chevron:</strong> ${args.showChevron !== false ? 'Sí' : 'No'}</div>
        <div><strong>Niveles:</strong> ${args.maxLevels || 3}</div>
        <div><strong>Expandido:</strong> ${args.defaultExpanded ? 'Sí' : 'No'}</div>
        <div><strong>Tamaño:</strong> ${args.size || 'md'}</div>
        <div><strong>Modo:</strong> ${args.cascade !== false ? 'Cascada' : 'Vertical'}</div>
      </div>
    `;
    
    // Contenedor del árbol
    const treeContainer = document.createElement('div');
    treeContainer.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px);
      padding: var(--p-spacing-mode-1-md, 16px);
    `;
    
    // Renderizar el árbol
    const treeHTML = renderTreeMenu(args);
    treeContainer.innerHTML = treeHTML;
    
    // Agregar estilos CSS para el Tree Menu
    const styleId = 'ubits-tree-menu-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .ubits-tree-menu {
          width: 100%;
          user-select: none;
        }
        
        .ubits-tree-node {
          position: relative;
        }
        
        .ubits-tree-node__content {
          display: flex;
          align-items: center;
          gap: var(--p-spacing-mode-1-sm, 8px);
          border-radius: 6px);
          cursor: ${args.maxLevels && args.maxLevels > 1 ? 'pointer' : 'default'};
          transition: all 0.2s ease;
          color: var(--modifiers-normal-color-light-fg-1-high);
          background: transparent;
          position: relative;
          font-family: var(--font-family-noto-sans-font-family);
          box-sizing: border-box;
          margin: 0;
          border: none;
          /* Asegurar que el contenido interno no afecte el alto */
          overflow: visible;
        }
        
        /* Tamaños - Matching List component EXACTLY */
        /* xs: padding 8px 12px, font-size 11px, line-height 16.5px, min-height 28px */
        .ubits-tree-node__content[data-size="xs"] {
          padding: 8px 12px !important;
          font-size: var(--modifiers-normal-body-xs-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-xs-regular-lineheight) !important;
          min-height: 28px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* sm: padding 10px 14px, font-size 13px, line-height 19.5px, min-height 32px */
        .ubits-tree-node__content[data-size="sm"] {
          padding: 10px 14px !important;
          font-size: var(--modifiers-normal-body-sm-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-sm-regular-lineheight) !important;
          min-height: 32px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* md: padding 12px 16px, font-size 16px, line-height 24px, min-height 40px */
        .ubits-tree-node__content[data-size="md"] {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* lg: padding 16px 20px, font-size 20px, line-height 30px, min-height 48px */
        .ubits-tree-node__content[data-size="lg"] {
          padding: 16px 20px !important;
          font-size: var(--modifiers-normal-body-lg-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-lg-regular-lineheight) !important;
          min-height: 48px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* Default size (md) - cuando no tiene data-size */
        .ubits-tree-node__content:not([data-size]) {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* Asegurar que los tamaños se mantengan en todos los estados - mantener padding y min-height */
        .ubits-tree-node__content[data-size="xs"]:hover,
        .ubits-tree-node__content[data-size="xs"]:focus,
        .ubits-tree-node__content[data-size="xs"].ubits-tree-node__content--active {
          padding: 8px 12px !important;
          min-height: 28px !important;
        }
        
        .ubits-tree-node__content[data-size="sm"]:hover,
        .ubits-tree-node__content[data-size="sm"]:focus,
        .ubits-tree-node__content[data-size="sm"].ubits-tree-node__content--active {
          padding: 10px 14px !important;
          min-height: 32px !important;
        }
        
        .ubits-tree-node__content[data-size="md"]:hover,
        .ubits-tree-node__content[data-size="md"]:focus,
        .ubits-tree-node__content[data-size="md"].ubits-tree-node__content--active {
          padding: 12px 16px !important;
          min-height: 40px !important;
        }
        
        .ubits-tree-node__content[data-size="lg"]:hover,
        .ubits-tree-node__content[data-size="lg"]:focus,
        .ubits-tree-node__content[data-size="lg"].ubits-tree-node__content--active {
          padding: 16px 20px !important;
          min-height: 48px !important;
        }
        
        /* Hover state - similar a Accordion component */
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--modifiers-normal-color-light-bg-2);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        /* Active state - similar a Button active state */
        .ubits-tree-node__content--active,
        .ubits-tree-node__content[aria-selected="true"] {
          color: var(--modifiers-normal-color-light-accent-brand);
          background: var(--modifiers-normal-color-light-bg-active);
        }
        
        /* Asegurar que los tamaños se mantengan en estado active */
        .ubits-tree-node__content--active[data-size="xs"],
        .ubits-tree-node__content[aria-selected="true"][data-size="xs"] {
          min-height: 28px !important;
        }
        
        .ubits-tree-node__content--active[data-size="sm"],
        .ubits-tree-node__content[aria-selected="true"][data-size="sm"] {
          min-height: 32px !important;
        }
        
        .ubits-tree-node__content--active[data-size="md"],
        .ubits-tree-node__content[aria-selected="true"][data-size="md"] {
          min-height: 40px !important;
        }
        
        .ubits-tree-node__content--active[data-size="lg"],
        .ubits-tree-node__content[aria-selected="true"][data-size="lg"] {
          min-height: 48px !important;
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__chevron,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron {
          color: var(--modifiers-normal-color-light-accent-brand);
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__icon,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-accent-brand);
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__label,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-accent-brand);
          font-weight: var(--weight-semibold, 600);
        }
        
        /* Focus state - similar a Button component */
        .ubits-tree-node__content--expandable:focus-visible {
          outline: 2px solid var(--modifiers-normal-color-light-accent-brand);
          outline-offset: -2px;
          border-radius: 6px);
        }
        
        .ubits-tree-node__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          transition: color 0.2s ease;
          margin: 0;
          padding: 0;
          line-height: 1;
        }
        
        .ubits-tree-node__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          width: 20px;
          transition: color 0.2s ease;
          margin: 0;
          padding: 0;
          line-height: 1;
        }
        
        .ubits-tree-node__label {
          flex: 1;
          color: var(--modifiers-normal-color-light-fg-1-high);
          transition: color 0.2s ease, font-weight 0.2s ease;
          margin: 0;
          padding: 0;
          /* El line-height se establece inline para cada tamaño */
        }
        
        .ubits-tree-node__children {
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
        }
        
        /* Modo vertical - sin indentación */
        .ubits-tree-menu--vertical .ubits-tree-node {
          padding-left: 0 !important;
        }
        
        .ubits-tree-menu--vertical .ubits-tree-node__children {
          margin-left: 0;
          padding-left: 0;
        }
        
        /* Modo cascada - con indentación */
        .ubits-tree-menu--cascade .ubits-tree-node__children {
          margin-left: 0;
        }
        
        /* Dark mode support */
        [data-theme="dark"] .ubits-tree-node__content {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--modifiers-normal-color-dark-bg-2);
        }
        
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] {
          background: var(--modifiers-normal-color-dark-bg-active);
          color: var(--modifiers-normal-color-dark-accent-brand);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__label,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-accent-brand);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__label,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          font-weight: var(--weight-semibold, 600);
        }
        
        [data-theme="dark"] .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Agregar funcionalidad de expandir/colapsar y selección
    setTimeout(() => {
      const treeElement = treeContainer.querySelector('.ubits-tree-menu');
      if (treeElement) {
        treeElement.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const content = target.closest('.ubits-tree-node__content') as HTMLElement;
          
          if (!content) return;
          
          // Manejar expandir/colapsar para nodos con hijos
          if (content.classList.contains('ubits-tree-node__content--expandable')) {
            const nodeId = content.getAttribute('data-node-id');
            const children = treeElement.querySelector(`[data-children-id="${nodeId}"]`) as HTMLElement;
            const chevron = content.querySelector('.ubits-tree-node__chevron i') as HTMLElement;
            const isExpanded = content.getAttribute('data-expanded') === 'true';
            
            if (children) {
              if (isExpanded) {
                children.style.display = 'none';
                content.setAttribute('data-expanded', 'false');
                content.setAttribute('aria-expanded', 'false');
                if (chevron && args.showChevron !== false) {
                  chevron.className = 'far fa-chevron-right';
                }
              } else {
                children.style.display = 'block';
                content.setAttribute('data-expanded', 'true');
                content.setAttribute('aria-expanded', 'true');
                if (chevron && args.showChevron !== false) {
                  chevron.className = 'far fa-chevron-down';
                }
              }
            }
          }
          
          // Manejar selección (active state) para todos los nodos
          // Remover active de todos los nodos
          const allContents = treeElement.querySelectorAll('.ubits-tree-node__content');
          allContents.forEach((node) => {
            node.classList.remove('ubits-tree-node__content--active');
            node.removeAttribute('aria-selected');
          });
          
          // Agregar active al nodo clickeado
          content.classList.add('ubits-tree-node__content--active');
          content.setAttribute('aria-selected', 'true');
        });
        
        // Soporte para teclado
        treeElement.addEventListener('keydown', (e) => {
          const target = e.target as HTMLElement;
          const content = target.closest('.ubits-tree-node__content') as HTMLElement;
          
          if (!content) return;
          
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            content.click();
          }
        });
      }
    }, 100);
    
    container.appendChild(infoPanel);
    container.appendChild(treeContainer);
    
    return container;
  },
};

