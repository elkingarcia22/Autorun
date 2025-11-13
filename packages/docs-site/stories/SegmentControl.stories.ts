import type { Meta, StoryObj } from '@storybook/html';
import { renderSegmentControl, createSegmentControl } from '../../addons/segment-control/src/SegmentControlProvider';
import type { SegmentControlOptions, SegmentItem } from '../../addons/segment-control/src/types/SegmentControlOptions';
import '../../addons/segment-control/src/styles/segment-control.css';

/**
 * Segment Control Component Stories
 * 
 * Componente de segmentos horizontal con soporte para iconos opcionales.
 * Similar a Tabs pero con contenedor con padding interno de 4px y altura de 30px.
 * El segmento activo muestra fondo blanco, icono solid oscuro, texto en negrita.
 * Los segmentos inactivos muestran icono regular y texto en gris claro sin fondo.
 */
const meta = {
  title: 'Components/Segment Control',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Segment Control UBITS de navegación horizontal con soporte para iconos opcionales. Similar a Tabs pero con contenedor con padding interno de 4px y altura de 30px. El segmento activo muestra fondo blanco, icono solid oscuro, texto en negrita. Los segmentos inactivos muestran icono regular y texto en gris claro sin fondo.',
      },
    },
  },
  argTypes: {
    segments: {
      control: { type: 'object' },
      description: 'Array de segmentos a mostrar',
      table: {
        type: { summary: 'SegmentItem[]' },
      },
    },
    activeSegmentId: {
      control: { type: 'text' },
      description: 'ID del segmento activo',
      table: {
        type: { summary: 'string' },
      },
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los segmentos',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    segmentCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de segmentos a mostrar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
  },
} satisfies Meta<SegmentControlOptions & { showIcons?: boolean; segmentCount?: number }>;

export default meta;
type Story = StoryObj<SegmentControlOptions & { showIcons?: boolean; segmentCount?: number }>;

/**
 * Helper para generar segmentos de ejemplo
 */
function generateSegments(count: number = 5, withIcons: boolean = true): SegmentItem[] {
  const icons = ['fa-th', 'fa-chart-line', 'fa-cog', 'fa-star', 'fa-book', 'fa-home', 'fa-user', 'fa-bell', 'fa-envelope', 'fa-calendar'];
  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `segment-${i + 1}`,
    label: labels[i] || `Label ${i + 1}`,
    icon: withIcons ? `far ${icons[i] || 'fa-th'}` : undefined,
    active: i === 0,
  }));
}

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    segments: generateSegments(5, true),
    activeSegmentId: 'segment-1',
    showIcons: true,
    segmentCount: 5,
  },
  render: (args) => {
    // Generar segmentos según los controles - SIEMPRE regenerar basándose en showIcons
    const shouldShowIcons = args.showIcons !== false;
    const segments = generateSegments(args.segmentCount || 5, shouldShowIcons);
    
    // Asegurar que el segmento activo esté correctamente marcado
    const activeId = args.activeSegmentId || segments[0]?.id;
    segments.forEach(segment => {
      segment.active = segment.id === activeId;
    });

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--ubits-bg-1, #ffffff);
      border-radius: 12px;
      border: 1px solid var(--ubits-border-1, #d0d2d5);
    `;

    // Contenedor para el Segment Control
    const container = document.createElement('div');
    container.id = 'segment-control-story-container';
    container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'segment-control-info-panel';
    infoPanel.style.cssText = `
      margin-top: 20px;
      padding: 16px;
      background: var(--ubits-bg-2, #F3F3F4);
      border-radius: 8px;
      font-family: var(--font-sans);
      font-size: 14px;
    `;

    const activeSegment = segments.find(segment => segment.id === activeId);

    const updateInfoPanel = (currentActiveId: string) => {
      const currentSegment = segments.find(segment => segment.id === currentActiveId);
      infoPanel.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--ubits-fg-1-high, #303a47);">Información del Segment Control</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
          <div><strong>Segmento Activo:</strong> ${currentSegment ? currentSegment.label : currentActiveId}</div>
          <div><strong>Segmentos totales:</strong> ${segments.length}</div>
          <div><strong>Con iconos:</strong> ${shouldShowIcons ? 'Sí' : 'No'}</div>
          <div><strong>IDs:</strong> ${segments.map(s => s.id).join(', ')}</div>
        </div>
      `;
    };

    updateInfoPanel(activeId);
    wrapper.appendChild(infoPanel);

    // Crear el Segment Control usando createSegmentControl para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';
        
        // Crear segmentos con listeners
        createSegmentControl({
          segments: segments,
          activeSegmentId: activeId,
          onSegmentChange: (segmentId, segmentElement) => {
            console.log('Segmento cambiado:', segmentId, segmentElement);
            // Actualizar panel de información
            updateInfoPanel(segmentId);
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Segment Control:', error);
        container.innerHTML = `<p style="color: var(--ubits-feedback-border-error, #ef4444); padding: 16px;">Error: ${error}</p>`;
      }
    });

    return wrapper;
  }
};

