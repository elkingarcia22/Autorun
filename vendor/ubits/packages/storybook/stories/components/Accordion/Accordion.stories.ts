/**
 * Accordion Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderAccordion, createAccordion } from '../../../../components/accordion/src/AccordionProvider';
import type {
	AccordionOptions,
	AccordionItem,
} from '../../../../components/accordion/src/types/AccordionOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/accordion/src/styles/accordion.css';

const meta: Meta<AccordionOptions> = {
	title: 'Layout/Accordion',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Accordion UBITS con múltiples variantes: lista simple, tipo caja, chevron izquierda/derecha, iconos opcionales y sub-headers.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-accordion',
			api: {
				create: 'window.UBITS.Accordion.create',
				tag: '<ubits-accordion>',
			},
			dependsOn: {
				required: [], // Accordion no depende de otros componentes
				optional: ['🧩-ux-icon'], // Iconos son opcionales
			},
			internals: [], // Accordion no tiene componentes internos privados
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['items'],
			},
		}),
	},
	args: {
		items: [
			{
				id: '1',
				title: 'Pregunta 1',
				content: 'Respuesta a la pregunta 1',
			},
			{
				id: '2',
				title: 'Pregunta 2',
				content: 'Respuesta a la pregunta 2',
			},
		],
		variant: 'list',
		chevronPosition: 'right',
		allowMultiple: false,
		showIcons: false,
	},
	argTypes: {
		items: {
			control: { type: 'object' },
			description: 'Array de items del accordion (requerido).',
			table: {
				type: { summary: 'AccordionItem[]' },
				category: 'Contenido',
			},
		},
		variant: {
			control: { type: 'select' },
			options: ['list', 'boxed'],
			description: 'Variante del accordion',
			table: {
				type: { summary: 'list | boxed' },
				defaultValue: { summary: 'list' },
				category: 'Apariencia',
			},
		},
		chevronPosition: {
			control: { type: 'select' },
			options: ['left', 'right'],
			description: 'Posición del chevron',
			table: {
				type: { summary: 'left | right' },
				defaultValue: { summary: 'right' },
				category: 'Apariencia',
			},
		},
		allowMultiple: {
			control: { type: 'boolean' },
			description: 'Permitir múltiples items abiertos simultáneamente',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Comportamiento',
			},
		},
		showIcons: {
			control: { type: 'boolean' },
			description: 'Mostrar u ocultar iconos en los items',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Apariencia',
			},
		},
		defaultOpen: {
			control: { type: 'object' },
			description: 'Array de IDs de items que deben estar abiertos por defecto',
			table: {
				type: { summary: 'string[]' },
				category: 'Comportamiento',
			},
		},
	},
};

export default meta;
type Story = StoryObj<AccordionOptions>;

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		items: [
			{
				id: '1',
				title: '¿Qué es UBITS?',
				content: 'UBITS es un sistema de diseño completo para aplicaciones.',
			},
			{
				id: '2',
				title: '¿Cómo uso los componentes?',
				content: 'Puedes usar los componentes mediante window.UBITS.Componente.create()',
			},
		],
		variant: 'list',
		chevronPosition: 'right',
		allowMultiple: false,
		showIcons: false,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="accordion-implementation-container"></div>

// 2. Crear accordion
window.UBITS.Accordion.create(
  document.getElementById('accordion-implementation-container'),
  {
    items: [
      {
        id: '1',
        title: '¿Qué es UBITS?',
        content: 'UBITS es un sistema de diseño completo para aplicaciones.'
      },
      {
        id: '2',
        title: '¿Cómo uso los componentes?',
        content: 'Puedes usar los componentes mediante window.UBITS.Componente.create()'
      }
    ],
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: false
  }
);`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-accordion');
		container.setAttribute('data-ubits-component', 'Accordion');
		container.style.padding = '20px';
		container.style.maxWidth = '600px';

		// Crear accordion
		const accordionElement = createAccordion(container, args);

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		items: [
			{
				id: '1',
				title: 'What makes coss ui different?',
				content:
					'coss ui focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.',
			},
			{
				id: '2',
				title: 'How can I customize the components?',
				content:
					'You can customize components using CSS variables, theme tokens, and component props. All components are built with customization in mind.',
			},
			{
				id: '3',
				title: 'Is coss ui optimized for performance?',
				content:
					'Yes, coss ui is built with performance in mind. We optimize every component for maximum performance and minimal bundle size.',
			},
			{
				id: '4',
				title: 'How accessible are the components?',
				content:
					'All components follow WCAG 2.1 accessibility standards and include proper ARIA attributes and keyboard navigation support.',
			},
		],
		variant: 'list',
		chevronPosition: 'right',
		allowMultiple: false,
		showIcons: true,
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '24px';
		container.style.maxWidth = '800px';

		createAccordion(container, args);

		return container;
	},
};
