import type { Meta, StoryObj } from '@storybook/html';
import { renderAvatar } from '../../components/avatar/src/AvatarProvider';
import type { AvatarOptions } from '../../components/avatar/src/types/AvatarOptions';

interface TimelineItem {
  date?: string;
  title: string;
  description?: string;
  state: 'default' | 'filled';
  avatar?: {
    imageUrl?: string;
    initials?: string;
    icon?: string;
  };
  icon?: string;
}

const meta: Meta<{
  showAvatar?: boolean;
  showDate?: boolean;
  showDescription?: boolean;
  showIcon?: boolean;
  alignment?: 'left' | 'center';
  filledItems?: number;
}> = {
  title: 'Layout/Timeline',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Timeline UBITS para mostrar secuencias de eventos o fases. Soporta avatar, fecha, título, descripción, iconos y alineación izquierda o centrada. Usa tokens UBITS.'
}
}
},
  argTypes: {
    showAvatar: {
      control: { type: 'boolean' },
      description: 'Mostrar avatar en cada item del timeline (mutuamente excluyente con icono)',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
}
},
    showDate: {
      control: { type: 'boolean' },
      description: 'Mostrar fecha en cada item',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
}
},
    showDescription: {
      control: { type: 'boolean' },
      description: 'Mostrar descripción en cada item',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
}
},
    showIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el marcador del timeline (mutuamente excluyente con avatar)',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
}
},
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center'],
      description: 'Alineación del contenido del texto (la línea siempre está a la izquierda)',
      table: {
        defaultValue: { summary: 'left' },
        type: { summary: 'left | center' }
}
},
    filledItems: {
      control: { type: 'number', min: 0, max: 4, step: 1 },
      description: 'Cantidad de items con círculo relleno (0-4)',
      table: {
        defaultValue: { summary: '2' },
        type: { summary: 'number' }
}
}
}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Función para renderizar icono FontAwesome
function renderIcon(iconName: string, style: 'regular' | 'solid' = 'regular'): string {
  const iconClass = style === 'solid' ? 'fas' : 'far';
  return `<i class="${iconClass} fa-${iconName}"></i>`;
}

// Función para generar datos de ejemplo
function generateTimelineData(filledItems: number = 2): TimelineItem[] {
  return [
    {
      date: 'Mar 15, 2024',
      title: 'Project Kickoff',
      description: 'Initial team meeting and project scope definition. Established key milestones and resource allocation.',
      state: filledItems > 0 ? 'filled' : 'default',
      avatar: {
        imageUrl: '/images/Profile-image.jpg'
},
      icon: 'circle'
},
    {
      date: 'Mar 22, 2024',
      title: 'Design Phase',
      description: 'Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.',
      state: filledItems > 1 ? 'filled' : 'default',
      avatar: {
        imageUrl: '/images/Profile-image.jpg'
},
      icon: 'paint-brush'
},
    {
      date: 'Apr 5, 2024',
      title: 'Development Sprint',
      description: 'Backend API implementation and frontend component development in progress.',
      state: filledItems > 2 ? 'filled' : 'default',
      avatar: {
        imageUrl: '/images/Profile-image.jpg'
},
      icon: 'code'
},
    {
      date: 'Apr 19, 2024',
      title: 'Testing & Deployment',
      description: 'Quality assurance testing, performance optimization, and production deployment preparation.',
      state: filledItems > 3 ? 'filled' : 'default',
      avatar: {
        imageUrl: '/images/Profile-image.jpg'
},
      icon: 'rocket'
}
];
}

// Función para renderizar un item del timeline
function renderTimelineItem(
  item: TimelineItem,
  index: number,
  isLast: boolean,
  args: {
    showAvatar?: boolean;
    showDate?: boolean;
    showDescription?: boolean;
    showIcon?: boolean;
    alignment?: 'left' | 'center';
  }
): string {
  const {
    showAvatar = false,
    showDate = true,
    showDescription = true,
    showIcon = true,
    alignment = 'left'
} = args;

  // Avatar e icono son mutuamente excluyentes
  // Si showAvatar está activo, desactivar showIcon
  // Si showIcon está activo, desactivar showAvatar
  const useAvatar = showAvatar === true && showIcon !== true;
  const useIcon = showIcon === true && showAvatar !== true;

  const isFilled = item.state === 'filled';
  const isDefault = item.state === 'default';

  // Clases y estilos según estado
  const markerClass = isFilled
    ? 'ubits-timeline-marker--filled'
    : 'ubits-timeline-marker--default';
  
  const markerColor = isFilled
    ? 'var(--modifiers-static-color-light-fg-1-medium)'
    : 'var(--modifiers-normal-color-light-border-1)';

  // Avatar HTML (solo si showAvatar está activo y showIcon está desactivado)
  let avatarHTML = '';
  if (useAvatar && item.avatar) {
    const avatarOptions: AvatarOptions = {
      size: 'xs', // xs = 20px, pero el marcador es 24px, se ajustará con CSS
      alt: item.title
};
    
    if (item.avatar.imageUrl) {
      avatarOptions.imageUrl = item.avatar.imageUrl;
    } else if (item.avatar.initials) {
      avatarOptions.initials = item.avatar.initials;
    } else {
      avatarOptions.icon = item.avatar.icon || 'user';
    }
    
    avatarHTML = renderAvatar(avatarOptions);
  }

  // Icono del marcador (solo si showIcon está activo y showAvatar está desactivado)
  let markerIconHTML = '';
  if (useIcon) {
    // Si el item tiene un icono específico, usarlo; si no, usar un icono por defecto
    const iconName = item.icon || 'circle';
    // El color se maneja con CSS según el estado del marcador
    markerIconHTML = `
      <span class="ubits-timeline-marker__icon">
        ${renderIcon(iconName, 'solid')}
      </span>
    `;
  }

  // Contenido del item
  const isCentered = alignment === 'center';
  const isEven = index % 2 === 0;
  const contentSide = isCentered ? (isEven ? 'left' : 'right') : 'left';
  const contentAlignment = isCentered ? 'flex-start' : 'flex-start';
  const textAlignment = 'left';

  // Si usa avatar, el avatar va en el marcador, no en el contenido
  if (useAvatar && avatarHTML) {
    const lineHTML = !isLast ? `
        <div class="ubits-timeline-line"></div>
      ` : '';
    
    return `
      <div class="ubits-timeline-item ${isCentered ? `ubits-timeline-item--${contentSide}` : ''}" data-index="${index}" data-state="${item.state}">
        ${isCentered && contentSide === 'right' ? `
          <div class="ubits-timeline-item__content">
            <div class="ubits-timeline-item__text">
              ${showDate && item.date ? `
                <div class="ubits-timeline-item__date ubits-body-sm-regular">
                  ${item.date}
                </div>
              ` : ''}
              <div class="ubits-timeline-item__title ubits-body-md-semibold">
                ${item.title}
              </div>
              ${showDescription && item.description ? `
                <div class="ubits-timeline-item__description ubits-body-sm-regular">
                  ${item.description}
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}
        <div class="ubits-timeline-item__marker-container">
          <div class="ubits-timeline-marker ubits-timeline-marker--avatar">
            ${avatarHTML}
          </div>
        </div>
        ${lineHTML}
        ${isCentered && contentSide === 'left' ? `
          <div class="ubits-timeline-item__content">
            <div class="ubits-timeline-item__text">
              ${showDate && item.date ? `
                <div class="ubits-timeline-item__date ubits-body-sm-regular">
                  ${item.date}
                </div>
              ` : ''}
              <div class="ubits-timeline-item__title ubits-body-md-semibold">
                ${item.title}
              </div>
              ${showDescription && item.description ? `
                <div class="ubits-timeline-item__description ubits-body-sm-regular">
                  ${item.description}
                </div>
              ` : ''}
            </div>
          </div>
        ` : !isCentered ? `
          <div class="ubits-timeline-item__content">
            <div class="ubits-timeline-item__text">
              ${showDate && item.date ? `
                <div class="ubits-timeline-item__date ubits-body-sm-regular">
                  ${item.date}
                </div>
              ` : ''}
              <div class="ubits-timeline-item__title ubits-body-md-semibold">
                ${item.title}
              </div>
              ${showDescription && item.description ? `
                <div class="ubits-timeline-item__description ubits-body-sm-regular">
                  ${item.description}
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Si usa icono, el icono va en el marcador
  const markerBackground = isFilled 
    ? markerColor 
    : 'var(--modifiers-normal-color-light-bg-1)';
  
  const lineHTML = !isLast ? `
        <div class="ubits-timeline-line"></div>
      ` : '';
  
  return `
    <div class="ubits-timeline-item ${isCentered ? `ubits-timeline-item--${contentSide}` : ''}" data-index="${index}" data-state="${item.state}">
      ${isCentered && contentSide === 'right' ? `
        <div class="ubits-timeline-item__content">
          <div class="ubits-timeline-item__text">
            ${showDate && item.date ? `
              <div class="ubits-timeline-item__date ubits-body-sm-regular">
                ${item.date}
              </div>
            ` : ''}
            <div class="ubits-timeline-item__title ubits-body-md-semibold">
              ${item.title}
            </div>
            ${showDescription && item.description ? `
              <div class="ubits-timeline-item__description ubits-body-sm-regular">
                ${item.description}
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}
      <div class="ubits-timeline-item__marker-container">
        <div class="ubits-timeline-marker ${markerClass}" style="border-color: ${markerColor}; background-color: ${markerBackground}; border-radius: var(--ubits-border-radius-full, 50%) !important;">
          ${markerIconHTML}
        </div>
      </div>
      ${lineHTML}
      ${isCentered && contentSide === 'left' ? `
        <div class="ubits-timeline-item__content">
          <div class="ubits-timeline-item__text">
            ${showDate && item.date ? `
              <div class="ubits-timeline-item__date ubits-body-sm-regular">
                ${item.date}
              </div>
            ` : ''}
            <div class="ubits-timeline-item__title ubits-body-md-semibold">
              ${item.title}
            </div>
            ${showDescription && item.description ? `
              <div class="ubits-timeline-item__description ubits-body-sm-regular">
                ${item.description}
              </div>
            ` : ''}
          </div>
        </div>
      ` : !isCentered ? `
        <div class="ubits-timeline-item__content">
          <div class="ubits-timeline-item__text">
            ${showDate && item.date ? `
              <div class="ubits-timeline-item__date ubits-body-sm-regular">
                ${item.date}
              </div>
            ` : ''}
            <div class="ubits-timeline-item__title ubits-body-md-semibold">
              ${item.title}
            </div>
            ${showDescription && item.description ? `
              <div class="ubits-timeline-item__description ubits-body-sm-regular">
                ${item.description}
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// Función para renderizar el timeline completo
function renderTimeline(args: {
  showAvatar?: boolean;
  showDate?: boolean;
  showDescription?: boolean;
  showIcon?: boolean;
  alignment?: 'left' | 'center';
  filledItems?: number;
}): string {
  const {
    showAvatar = false,
    showDate = true,
    showDescription = true,
    showIcon = true,
    alignment = 'left',
    filledItems = 2
} = args;

  const timelineData = generateTimelineData(filledItems);
  const uniqueId = `timeline-${Date.now()}`;
  
  const alignmentClass = alignment === 'center' ? 'ubits-timeline--center' : 'ubits-timeline--left';

  const timelineHTML = `
    <div class="ubits-timeline ${alignmentClass}" id="${uniqueId}">
      ${timelineData.map((item, index) => 
        renderTimelineItem(item, index, index === timelineData.length - 1, args)
      ).join('')}
    </div>
  `;

  return timelineHTML;
}

export const Default: Story = {
  args: {
    showAvatar: false,
    showDate: true,
    showDescription: true,
    showIcon: true,
    alignment: 'left',
    filledItems: 2
},
  render: (args) => {
    // Asegurar que avatar e icono sean mutuamente excluyentes
    if (args.showAvatar === true) {
      args.showIcon = false;
    }
    if (args.showIcon === true) {
      args.showAvatar = false;
    }
    
    // Crear contenedor principal
    const container = document.createElement('div');
    container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 16px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: var(--ubits-border-radius-md, 8px);
      max-width: 800px;
    `;
    
    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      padding: var(--p-spacing-mode-1-md, 12px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: var(--ubits-border-radius-md, 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      margin-bottom: var(--p-spacing-mode-1-lg, 16px);
    `;
    infoPanel.innerHTML = `
        <div style="margin-bottom: var(--p-spacing-mode-1-sm, 8px);">
        <strong class="ubits-body-md-semibold" style="color: var(--modifiers-normal-color-light-fg-1-high);">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--p-spacing-mode-1-sm, 8px); font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);" class="ubits-body-sm-regular">
        <div><strong>Avatar:</strong> ${args.showAvatar ? 'Sí' : 'No'}</div>
        <div><strong>Fecha:</strong> ${args.showDate !== false ? 'Sí' : 'No'}</div>
        <div><strong>Descripción:</strong> ${args.showDescription !== false ? 'Sí' : 'No'}</div>
        <div><strong>Icono:</strong> ${args.showIcon !== false ? 'Sí' : 'No'}</div>
        <div><strong>Alineación:</strong> ${args.alignment === 'center' ? 'Centrada' : 'Izquierda'}</div>
        <div><strong>Items rellenos:</strong> ${args.filledItems || 2}</div>
      </div>
    `;
    
    // Contenedor del timeline
    const timelineContainer = document.createElement('div');
    timelineContainer.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md, 8px);
      padding: var(--p-spacing-mode-1-lg, 16px);
    `;
    
    // Renderizar el timeline
    const timelineHTML = renderTimeline(args);
    timelineContainer.innerHTML = timelineHTML;
    
    
    // Agregar estilos CSS para el Timeline
    const styleId = 'ubits-timeline-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .ubits-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
        }
        
        .ubits-timeline--left {
          align-items: flex-start;
        }
        
        .ubits-timeline--center {
          align-items: center;
          position: relative;
        }
        
        .ubits-timeline--center::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          background-color: var(--modifiers-normal-color-light-border-1);
          z-index: 0;
        }
        
        .ubits-timeline-item {
          position: relative;
          display: flex;
          width: 100%;
          gap: 0;
          align-items: flex-start;
          margin-bottom: var(--p-spacing-mode-1-xl, 20px);
        }
        
        .ubits-timeline-item:last-child {
          margin-bottom: 0;
        }
        
        /* Versión centrada: items con contenido a los lados */
        .ubits-timeline--center .ubits-timeline-item {
          justify-content: flex-start;
          align-items: flex-start;
          position: relative;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left {
          flex-direction: row;
          justify-content: flex-end;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right {
          flex-direction: row;
          justify-content: flex-start;
        }
        
        .ubits-timeline-item__content {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
          min-width: 0;
          margin-left: var(--p-spacing-mode-1-md, 12px);
        }
        
        .ubits-timeline--center .ubits-timeline-item__content {
          flex: 0 0 auto;
          max-width: calc(50% - 40px);
          align-self: flex-start;
          padding-top: 0;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__content {
          text-align: right;
          align-items: flex-end;
          margin-left: var(--p-spacing-mode-1-md, 12px);
          margin-right: 0;
          order: 2;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__content {
          text-align: left;
          align-items: flex-start;
          margin-right: var(--p-spacing-mode-1-md, 12px);
          margin-left: 0;
          order: 0;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__marker-container {
          order: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__marker-container {
          order: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__text {
          align-items: flex-end;
          text-align: right;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__text {
          align-items: flex-start;
          text-align: left;
        }
        
        /* Asegurar que el texto esté justificado correctamente al lado del círculo */
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__date,
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__title,
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__description {
          text-align: left;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__date,
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__title,
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__description {
          text-align: right;
        }
        
        .ubits-timeline-item__text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          align-items: flex-start;
        }
        
        .ubits-timeline--center .ubits-timeline-item__text {
          align-items: center;
        }
        
        .ubits-timeline-item__date {
          margin: 0 0 4px 0; /* MANTENER MEDIDA ORIGINAL */
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-regular, 400);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item__title {
          margin: 0 0 4px 0;
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-md-regular-fontsize);
          font-weight: var(--modifiers-normal-body-md-semibold-fontweight, 600);
          line-height: var(--modifiers-normal-body-md-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item__description {
          margin: 0;
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-regular, 400);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item__marker-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 24px;
          z-index: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item__marker-container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          top: 0;
        }
        
        .ubits-timeline-marker {
          width: 24px;
          height: 24px;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        
        .ubits-timeline-marker--avatar {
          width: 24px !important;
          height: 24px !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          border: 2px solid var(--modifiers-normal-color-light-border-1) !important;
          padding: 0 !important;
          background: var(--modifiers-normal-color-light-bg-1) !important;
          overflow: hidden !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar {
          width: 24px !important;
          height: 24px !important;
          min-width: 24px !important;
          min-height: 24px !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          overflow: hidden !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-image-container {
          width: 100% !important;
          height: 100% !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          overflow: hidden !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-image,
        .ubits-timeline-marker--avatar .ubits-avatar img {
          width: 100% !important;
          height: 100% !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          object-fit: cover !important;
          display: block !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-initials {
          border-radius: var(--ubits-border-radius-full, 50%) !important;
        }
        
        .ubits-timeline-marker--default {
          background-color: var(--modifiers-normal-color-light-bg-1);
          border-color: var(--modifiers-normal-color-light-border-1);
        }
        
        .ubits-timeline-marker--filled {
          background-color: var(--modifiers-static-color-light-fg-1-medium);
          border-color: var(--modifiers-static-color-light-fg-1-medium);
        }
        
        .ubits-timeline-marker__icon {
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Iconos en círculos sin relleno deben ser visibles sobre fondo blanco */
        .ubits-timeline-marker--default .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-marker--filled .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-light-fg-bold);
        }
        
        .ubits-timeline-line {
          position: absolute;
          left: 11px;
          top: 24px;
          bottom: -32px;
          width: 2px;
          z-index: 0;
          background-color: var(--modifiers-normal-color-light-border-1);
          transition: background-color 0.2s ease;
        }
        
        .ubits-timeline--center .ubits-timeline-line {
          display: none;
        }
        
        .ubits-timeline-item:last-child .ubits-timeline-line {
          display: none;
        }
        
        /* Línea con color según el estado del item actual (la línea pertenece al item anterior) */
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-line {
          background-color: var(--modifiers-static-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item[data-state="default"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-light-border-1);
        }
        
        /* Línea central para versión centrada - se actualiza dinámicamente */
        .ubits-timeline--center::before {
          background: linear-gradient(
            to bottom,
            var(--modifiers-static-color-light-fg-1-medium) 0%,
            var(--modifiers-static-color-light-fg-1-medium) var(--filled-height, 0%),
            var(--modifiers-normal-color-light-border-1) var(--filled-height, 0%)
          );
        }
        
        /* Estados del contenido según el estado del item */
        .ubits-timeline-item[data-state="default"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item[data-state="default"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        /* Dark mode support */
        [data-theme="dark"] .ubits-timeline--center::before {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-item__date {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--avatar {
          border-color: var(--modifiers-normal-color-dark-border-1);
          background: var(--modifiers-normal-color-dark-bg-1);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--default {
          background-color: var(--modifiers-normal-color-dark-bg-1);
          border-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--filled {
          background-color: var(--modifiers-static-color-dark-fg-1-medium);
          border-color: var(--modifiers-static-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--default .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--filled .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-dark-fg-bold);
        }
        
        [data-theme="dark"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-line {
          background-color: var(--modifiers-static-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline--center::before {
          background: linear-gradient(
            to bottom,
            var(--modifiers-static-color-dark-fg-1-medium) 0%,
            var(--modifiers-static-color-dark-fg-1-medium) var(--filled-height, 0%),
            var(--modifiers-normal-color-dark-border-1) var(--filled-height, 0%)
          );
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-item__title,
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-item__description,
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
      `;
      document.head.appendChild(style);
    }
    
    // El CSS del avatar ya está cargado globalmente en preview.ts
    container.appendChild(infoPanel);
    container.appendChild(timelineContainer);
    
    return container;
  }
};

