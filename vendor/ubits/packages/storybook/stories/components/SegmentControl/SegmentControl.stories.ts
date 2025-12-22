import type { Meta, StoryObj } from '@storybook/html';
import {
	renderSegmentControl,
	createSegmentControl,
} from '../../../../components/segment-control/src/SegmentControlProvider';
import type {
	SegmentControlOptions,
	SegmentItem,
} from '../../../../components/segment-control/src/types/SegmentControlOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/segment-control/src/styles/segment-control.css';

/**
 * Segment Control Component Stories
 *
 * Componente de segmentos horizontal con soporte para iconos opcionales.
 * Similar a Tabs pero con contenedor con padding interno de 4px y altura de 30px.
 */
const meta = {
	title: 'Navegación/Segment Control',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Segment Control UBITS de navegación horizontal con soporte para iconos opcionales. Similar a Tabs pero con contenedor con padding interno de 4px y altura de 30px. El segmento activo muestra fondo blanco, icono solid oscuro, texto en negrita. Los segmentos inactivos muestran icono regular y texto en gris claro sin fondo.',
			},
		},
		// ⭐ CONTRATO UBITS para Autorun
		ubits: createUBITSContract({
			componentId: '🧩-ux-segment-control',
			api: {
				create: 'window.UBITS.SegmentControl.create',
				tag: '<ubits-segment-control>',
			},
			dependsOn: {
				required: [], // SegmentControl no requiere otros componentes UBITS
				optional: ['🧩-ux-icon'], // Iconos son opcionales (FontAwesome)
			},
			internals: [], // SegmentControl no tiene componentes internos privados
			slots: {}, // SegmentControl no tiene slots
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-1-low',
				'--modifiers-normal-color-light-fg-1-disabled',
				'--font-family-noto-sans-font-family',
				'--modifiers-normal-body-sm-regular-fontsize',
				'--modifiers-normal-body-sm-regular-lineheight',
				'--weight-semibold',
				'--weight-regular',
				'--p-spacing-mode-1-xs',
				'--p-spacing-mode-1-sm',
				'--radius-sm',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['segments'],
			},
		}),
	},
	argTypes: {
		segments: {
			control: { type: 'object' },
			description: 'Array de segmentos a mostrar (requerido)',
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
		onSegmentChange: {
			control: false,
			description: 'Callback cuando cambia el segmento activo',
			table: {
				type: { summary: '(segmentId: string, segmentElement: HTMLElement) => void' },
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales para el contenedor',
			table: {
				type: { summary: 'string' },
			},
		},
		showIcons: {
			control: { type: 'boolean' },
			description: 'Mostrar iconos en los segmentos (solo para controles)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		segmentCount: {
			control: { type: 'number', min: 1, max: 10, step: 1 },
			description: 'Número de segmentos a mostrar (solo para controles)',
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
	const icons = [
		'fa-th',
		'fa-chart-line',
		'fa-cog',
		'fa-star',
		'fa-book',
		'fa-home',
		'fa-user',
		'fa-bell',
		'fa-envelope',
		'fa-calendar',
	];
	const labels = [
		'Label 1',
		'Label 2',
		'Label 3',
		'Label 4',
		'Label 5',
		'Label 6',
		'Label 7',
		'Label 8',
		'Label 9',
		'Label 10',
	];

	return Array.from({ length: count }, (_, i) => ({
		id: `segment-${i + 1}`,
		label: labels[i] || `Label ${i + 1}`,
		icon: withIcons ? `far ${icons[i] || 'fa-th'}` : undefined,
		active: i === 0,
	}));
}

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		segments: [
			{ id: 'segment-1', label: 'Segment 1', icon: 'far fa-th', active: true },
			{ id: 'segment-2', label: 'Segment 2', icon: 'far fa-chart-line', active: false },
			{ id: 'segment-3', label: 'Segment 3', icon: 'far fa-cog', active: false },
			{ id: 'segment-4', label: 'Segment 4', icon: 'far fa-star', active: false },
			{ id: 'segment-5', label: 'Segment 5', icon: 'far fa-book', active: false },
		],
		activeSegmentId: 'segment-1',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="segment-control-implementation-container"></div>

// 2. Crear Segment Control
window.UBITS.SegmentControl.create({
  segments: [
    { id: 'segment-1', label: 'Segment 1', icon: 'far fa-th', active: true },
    { id: 'segment-2', label: 'Segment 2', icon: 'far fa-chart-line', active: false },
    { id: 'segment-3', label: 'Segment 3', icon: 'far fa-cog', active: false },
    { id: 'segment-4', label: 'Segment 4', icon: 'far fa-star', active: false },
    { id: 'segment-5', label: 'Segment 5', icon: 'far fa-book', active: false }
  ],
  activeSegmentId: 'segment-1',
  onSegmentChange: (segmentId, segmentElement) => {
    console.log('Segmento cambiado:', segmentId);
  }
}, 'segment-control-implementation-container');`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-segment-control');
		container.setAttribute('data-ubits-component', 'SegmentControl');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '1200px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.borderRadius = '12px';
		container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';

		// Crear contenedor interno para el Segment Control
		const segmentContainer = document.createElement('div');
		segmentContainer.id = 'segment-control-implementation-container';
		segmentContainer.style.width = '100%';
		container.appendChild(segmentContainer);

		// Crear Segment Control
		try {
			createSegmentControl(
				{
					segments: args.segments || [],
					activeSegmentId: args.activeSegmentId,
					onSegmentChange: args.onSegmentChange,
					className: args.className,
				},
				segmentContainer.id,
			);
		} catch (error) {
			console.error('Error creando Segment Control:', error);
			segmentContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		return container;
	},
};

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
		// Generar segmentos según los controles
		const shouldShowIcons = args.showIcons !== false;
		const segments = generateSegments(args.segmentCount || 5, shouldShowIcons);

		// Asegurar que el segmento activo esté correctamente marcado
		const activeId = args.activeSegmentId || segments[0]?.id;
		segments.forEach((segment) => {
			segment.active = segment.id === activeId;
		});

		// Wrapper principal
		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

		// Contenedor para el Segment Control
		const container = document.createElement('div');
		container.id = 'segment-control-story-container';
		container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

		wrapper.appendChild(container);

		// Crear el Segment Control usando createSegmentControl para que los listeners funcionen
		requestAnimationFrame(() => {
			try {
				// Limpiar contenedor previo
				container.innerHTML = '';

				// Crear segment control con listeners
				createSegmentControl(
					{
						segments: segments,
						activeSegmentId: activeId,
						onSegmentChange: (segmentId, segmentElement) => {
							// Segmento cambiado
							console.log('Segmento cambiado:', segmentId);
						},
					},
					container.id,
				);
			} catch (error) {
				console.error('Error creando Segment Control:', error);
				container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
			}
		});

		return wrapper;
	},
};
