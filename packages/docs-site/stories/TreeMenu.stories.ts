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
  size?: 'sm' | 'md' | 'lg';
  cascade?: boolean;
}> = {
  title: 'Components/TreeMenu',
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
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del texto y espaciado',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' },
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
  size: 'sm' | 'md' | 'lg',
  uniqueId: string
): string {
  const hasChildren = node.children && node.children.length > 0;
  const nodeId = `${uniqueId}-node-${level}-${node.label.toLowerCase().replace(/\s+/g, '-')}`;
  const isExpanded = defaultExpanded && hasChildren;
  
  // Clases de tipografía según tamaño
  const typographyClass = size === 'sm' 
    ? 'ubits-body-sm-regular' 
    : size === 'lg' 
    ? 'ubits-body-lg-regular' 
    : 'ubits-body-md-regular';
  
  // Espaciado según modo (cascada o vertical)
  const paddingLeft = cascade 
    ? (size === 'sm' 
      ? `calc(var(--ubits-spacing-md, 16px) * ${level})` 
      : size === 'lg'
      ? `calc(var(--ubits-spacing-lg, 24px) * ${level})`
      : `calc(var(--ubits-spacing-md, 16px) * ${level})`)
    : '0';
  
  const iconSize = size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px';
  const chevronSize = size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px';
  
  let html = `
    <div class="ubits-tree-node ${cascade ? 'ubits-tree-node--cascade' : 'ubits-tree-node--vertical'}" data-level="${level}" style="${cascade ? `padding-left: ${paddingLeft};` : ''}">
      <div 
        class="ubits-tree-node__content ${hasChildren ? 'ubits-tree-node__content--expandable' : ''}" 
        data-node-id="${nodeId}"
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
        <span class="ubits-tree-node__label ${typographyClass}">${node.label}</span>
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
  size?: 'sm' | 'md' | 'lg';
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
      padding: var(--ubits-spacing-lg, 24px);
      background: var(--ubits-bg-2, #F3F3F4);
      border-radius: 8px;
      max-width: 600px;
    `;
    
    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      padding: var(--ubits-spacing-md, 16px);
      background: var(--ubits-bg-2, #f9fafb);
      border-radius: 8px;
      border: 1px solid var(--ubits-border-1, #e5e7eb);
      margin-bottom: var(--ubits-spacing-lg, 24px);
    `;
    infoPanel.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong class="ubits-body-md-semibold" style="color: var(--ubits-fg-1-high, #303a47);">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--ubits-fg-1-medium, #5c646f);" class="ubits-body-sm-regular">
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
      background: var(--ubits-bg-1, #ffffff);
      border-radius: 8px;
      padding: var(--ubits-spacing-md, 16px);
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
          gap: var(--ubits-spacing-sm, 8px);
          padding: var(--ubits-spacing-xs, 4px) var(--ubits-spacing-sm, 8px);
          border-radius: 6px;
          cursor: ${args.maxLevels && args.maxLevels > 1 ? 'pointer' : 'default'};
          transition: all 0.2s ease;
          color: var(--ubits-fg-1-high, #303a47);
          background: transparent;
          position: relative;
        }
        
        /* Hover state - similar a Accordion component */
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--ubits-bg-2, #F3F3F4);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron {
          color: var(--ubits-fg-1-high, #303a47);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon {
          color: var(--ubits-fg-1-high, #303a47);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--ubits-fg-1-high, #303a47);
        }
        
        /* Active state - similar a Button active state */
        .ubits-tree-node__content--active,
        .ubits-tree-node__content[aria-selected="true"] {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
          background: var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15));
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__chevron,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__icon,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__label,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
          font-weight: var(--weight-semibold, 600);
        }
        
        /* Focus state - similar a Button component */
        .ubits-tree-node__content--expandable:focus-visible {
          outline: 2px solid var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
          outline-offset: -2px;
          border-radius: 6px;
        }
        
        .ubits-tree-node__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--ubits-fg-1-medium, #5c646f);
          transition: color 0.2s ease;
        }
        
        .ubits-tree-node__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--ubits-fg-1-medium, #5c646f);
          width: 20px;
          transition: color 0.2s ease;
        }
        
        .ubits-tree-node__label {
          flex: 1;
          color: var(--ubits-fg-1-high, #303a47);
          transition: color 0.2s ease, font-weight 0.2s ease;
        }
        
        .ubits-tree-node__children {
          margin-top: 2px;
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
        @media (prefers-color-scheme: dark) {
          .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
            background: var(--ubits-bg-2, #F3F3F4);
          }
          
          .ubits-tree-node__content--active,
          .ubits-tree-node__content[aria-selected="true"] {
            background: var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15));
            color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
          }
          
          .ubits-tree-node__content--active .ubits-tree-node__chevron,
          .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron {
            color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
          }
          
          .ubits-tree-node__content--active .ubits-tree-node__icon,
          .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon {
            color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
          }
          
          .ubits-tree-node__content--active .ubits-tree-node__label,
          .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
            color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
            font-weight: var(--weight-semibold, 600);
          }
        }
        
        /* Dark mode support usando data-theme */
        [data-theme="dark"] .ubits-tree-node__content--active,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] {
          background: rgba(12, 91, 239, 0.15);
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__label,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static));
          font-weight: var(--weight-semibold, 600);
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

