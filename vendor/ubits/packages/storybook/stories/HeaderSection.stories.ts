import type { Meta, StoryObj } from '@storybook/html';
import { createHeaderSection } from '../../addons/header-section/src/HeaderSectionProvider';
import type { HeaderSectionOptions, HeaderSectionAction } from '../../addons/header-section/src/types/HeaderSectionOptions';
import '../../components/button-ai/src/styles/button-ai.css';
import '../../components/list/src/styles/list.css';
import '../../components/breadcrumb/src/styles/breadcrumb.css';

/**
 * HeaderSection Component Stories
 * 
 * Componente de encabezado de sección con título y acciones.
 * Incluye título (heading h2), botón de información con tooltip (sm),
 * y acciones (botones md). Todo es apagable/prendible con controladores.
 */
const meta = {
  title: 'Layout/HeaderSection',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente HeaderSection UBITS para encabezados de sección con título (heading h2, fg-1-high), botón de información con tooltip (sm), y acciones (botones md). Todos los elementos son apagables/prendibles con controladores.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título de la sección (heading h2)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar el título (NO afecta al status tag)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showBackButton: {
      control: { type: 'boolean' },
      description: 'Mostrar el botón de atrás (secundario md)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showInfoButton: {
      control: { type: 'boolean' },
      description: 'Mostrar el botón de información (sm, tertiary)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    infoTooltipText: {
      control: { type: 'text' },
      description: 'Texto del tooltip del botón de información',
      if: { arg: 'showInfoButton' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showStatusTag: {
      control: { type: 'boolean' },
      description: 'Mostrar el status tag (controlador independiente del título)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    statusTagLabel: {
      control: { type: 'text' },
      description: 'Label del status tag',
      if: { arg: 'showStatusTag' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    statusTagStatus: {
      control: { type: 'select' },
      options: ['completed', 'published', 'fulfilled', 'created', 'active', 'not-fulfilled', 'denied', 'draft', 'in-progress', 'syncing', 'pending', 'pending-approval', 'not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'],
      description: 'Estado del status tag',
      if: { arg: 'showStatusTag' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pending' }
      }
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Mostrar todas las acciones (botones md)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAIAction: {
      control: { type: 'boolean' },
      description: 'Mostrar botón AI (primero en la serie)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAction1: {
      control: { type: 'boolean' },
      description: 'Mostrar acción 1 (Button text)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAction2: {
      control: { type: 'boolean' },
      description: 'Mostrar acción 2 (Button text)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAction3: {
      control: { type: 'boolean' },
      description: 'Mostrar acción 3 (Button text)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showPrimaryAction: {
      control: { type: 'boolean' },
      description: 'Mostrar acción primaria (Primary action)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showSecondaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón secundario adicional',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    secondaryButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón secundario adicional',
      if: { arg: 'showSecondaryButton' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    secondaryButtonIcon: {
      control: { type: 'text' },
      description: 'Icono del botón secundario adicional',
      if: { arg: 'showSecondaryButton' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showOptionsButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de opciones (3 puntos)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    optionsMenuItems: {
      control: { type: 'object' },
      description: 'Opciones del menú dropdown del botón de opciones',
      if: { arg: 'showOptionsButton' },
      table: {
        type: { summary: 'HeaderSectionOptionsMenuItem[]' },
        defaultValue: { summary: '[]' }
      }
    },
    showBreadcrumb: {
      control: { type: 'boolean' },
      description: 'Mostrar breadcrumb (debajo del header, 16px de distancia)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    breadcrumbItems: {
      control: { type: 'object' },
      description: 'Items del breadcrumb',
      if: { arg: 'showBreadcrumb' },
      table: {
        type: { summary: 'BreadcrumbItem[]' },
        defaultValue: { summary: '[]' }
      }
    },
    containerId: {
      control: false,
      description: 'ID del contenedor (asignado automáticamente)'
    }
  }
} satisfies Meta<HeaderSectionOptions>;

export default meta;
type Story = StoryObj<HeaderSectionOptions>;

/**
 * Story única con todos los controles
 */
export const Default: Story = {
  args: {
    containerId: 'header-section-story-container',
    title: 'Name product',
    showTitle: true,
    showBackButton: true,
    showInfoButton: true,
    infoTooltipText: 'Información adicional sobre el producto',
    showStatusTag: true,
    statusTagLabel: 'Active',
    statusTagStatus: 'active',
    showActions: true,
    showAIAction: true,
    showAction1: true,
    showAction2: true,
    showAction3: true,
    showPrimaryAction: true,
    showSecondaryButton: true,
    secondaryButtonText: 'Button text',
    secondaryButtonIcon: 'grid',
    showOptionsButton: true,
    optionsMenuItems: [
      {
        label: 'Opción 1',
        value: 'option-1',
        onClick: (e, data) => {
          // Opción 1 seleccionada
        }
      },
      {
        label: 'Opción 2',
        value: 'option-2',
        onClick: (e, data) => {
          // Opción 2 seleccionada
        }
      },
      {
        label: 'Opción 3',
        value: 'option-3',
        onClick: (e, data) => {
          // Opción 3 seleccionada
        }
      }
    ],
    showBreadcrumb: true,
    breadcrumbItems: [
      {
        id: 'home',
        label: 'Home',
        url: '#',
        onClick: (e) => {
          // Home clicked
        }
      },
      {
        id: 'products',
        label: 'Products',
        url: '#',
        onClick: (e) => {
          // Products clicked
        }
      },
      {
        id: 'current',
        label: 'Current Product'
      }
    ]
  } as HeaderSectionOptions & {
    showAIAction?: boolean;
    showAction1?: boolean;
    showAction2?: boolean;
    showAction3?: boolean;
    showPrimaryAction?: boolean;
    statusTagLabel?: string;
    statusTagStatus?: string;
    breadcrumbItems?: Array<{ id: string; label: string; url?: string; onClick?: (e: MouseEvent) => void }>;
  },
  render: (args) => {
    const container = document.createElement('div');
    container.id = args.containerId || 'header-section-story-container';
    container.style.width = '100%';
    container.style.maxWidth = '1220px';
    container.style.margin = '0 auto';
    container.style.padding = '24px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '200px';

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      margin-bottom: 24px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      font-size: 13px;
      color: var(--modifiers-normal-color-light-fg-2-medium);
    `;
    infoPanel.innerHTML = `
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--modifiers-normal-color-light-fg-1-high);">Información del HeaderSection</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        <div><strong>Título:</strong> ${args.title || '(vacío)'}</div>
        <div><strong>Mostrar título:</strong> ${args.showTitle ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón atrás:</strong> ${args.showBackButton ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón info:</strong> ${args.showInfoButton ? 'Sí' : 'No'}</div>
        <div><strong>Tooltip texto:</strong> ${args.infoTooltipText || '(vacío)'}</div>
        <div><strong>Mostrar status tag:</strong> ${args.showStatusTag ? 'Sí' : 'No'}</div>
        <div><strong>Status tag label:</strong> ${(args as any).statusTagLabel || '(vacío)'}</div>
        <div><strong>Status tag status:</strong> ${(args as any).statusTagStatus || '(vacío)'}</div>
        <div><strong>Mostrar acciones:</strong> ${args.showActions ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón AI:</strong> ${(args as any).showAIAction ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 1:</strong> ${(args as any).showAction1 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 2:</strong> ${(args as any).showAction2 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 3:</strong> ${(args as any).showAction3 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción primaria:</strong> ${(args as any).showPrimaryAction ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón secundario:</strong> ${args.showSecondaryButton ? 'Sí' : 'No'}</div>
        <div><strong>Texto botón secundario:</strong> ${args.secondaryButtonText || '(vacío)'}</div>
        <div><strong>Mostrar botón opciones:</strong> ${args.showOptionsButton ? 'Sí' : 'No'}</div>
      </div>
    `;
    container.appendChild(infoPanel);

    // Renderizar HeaderSection
    requestAnimationFrame(() => {
      try {
        const statusTagOptions = (args as any).showStatusTag && (args as any).statusTagLabel
          ? {
              label: (args as any).statusTagLabel,
              status: (args as any).statusTagStatus || 'pending',
              size: 'sm' as const
            }
          : undefined;

        // Construir array de acciones basado en los controladores individuales
        const actions: HeaderSectionAction[] = [];
        
        if ((args as any).showAIAction) {
          actions.push({
            id: 'ai-button',
            text: 'AI button',
            variant: 'secondary',
            icon: 'sparkles',
            iconStyle: 'regular',
            onClick: (e) => {
              // AI button clicked
            }
          });
        }
        
        if ((args as any).showAction1) {
          actions.push({
            id: 'action-1',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: (e) => {
              // Action 1 clicked
            }
          });
        }
        
        if ((args as any).showAction2) {
          actions.push({
            id: 'action-2',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: (e) => {
              // Action 2 clicked
            }
          });
        }
        
        if ((args as any).showAction3) {
          actions.push({
            id: 'action-3',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: (e) => {
              // Action 3 clicked
            }
          });
        }
        
        if ((args as any).showPrimaryAction) {
          actions.push({
            id: 'primary-action',
            text: 'Primary action',
            variant: 'primary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: (e) => {
              // Primary action clicked
            }
          });
        }

        const breadcrumbOptions = (args as any).showBreadcrumb && (args as any).breadcrumbItems
          ? {
              items: (args as any).breadcrumbItems,
              separator: '>'
            }
          : undefined;

        createHeaderSection({
          ...args,
          container: container,
          actions: actions,
          statusTag: statusTagOptions,
          breadcrumb: breadcrumbOptions,
          onBackClick: (e) => {
            // Back button clicked
          },
          onInfoClick: (e) => {
            // Info button clicked
          },
          onSecondaryButtonClick: (e) => {
            // Secondary button clicked
          },
          onOptionsClick: (e) => {
            // Options button clicked
          }
        });
      } catch (error) {
        console.error('Error creating HeaderSection:', error);
        container.innerHTML = `<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
      }
    });

    return container;
  }
};
