import type { Meta, StoryObj } from '@storybook/html';
import { renderSkeleton, createSkeleton } from '../../../../components/skeleton/src/SkeletonProvider';
import type { SkeletonOptions } from '../../../../components/skeleton/src/types/SkeletonOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/skeleton/src/styles/skeleton.css';

/**
 * Skeleton Component Stories
 *
 * Componente Skeleton UBITS para mostrar placeholders de carga.
 * Soporta múltiples variantes (text, circle, rectangle, custom), tamaños y animaciones.
 */
const meta = {
	title: 'Básicos/Skeleton',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Skeleton UBITS para mostrar placeholders de carga. Soporta múltiples variantes (text, circle, rectangle, custom), tamaños y animaciones.',
			},
		},
		// ⭐ CONTRATO UBITS para Autorun
		ubits: createUBITSContract({
			componentId: '🧩-ux-skeleton',
			api: {
				create: 'window.UBITS.Skeleton.create',
				tag: '<ubits-skeleton>',
			},
			dependsOn: {
				required: [], // Skeleton no requiere otros componentes UBITS
				optional: [], // No tiene dependencias opcionales
			},
			internals: [], // Skeleton no tiene componentes internos privados
			slots: {}, // Skeleton no tiene slots
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-body-md-regular-lineheight',
				'--modifiers-normal-body-lg-regular-lineheight',
				'--ubits-border-radius-sm',
				'--ubits-spacing-xs',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [], // Skeleton no tiene props requeridas (todos son opcionales)
			},
		}),
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['text', 'circle', 'rectangle', 'custom'],
			description: 'Variante del skeleton',
			table: {
				defaultValue: { summary: 'text' },
				type: { summary: 'text | circle | rectangle | custom' },
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Tamaño del skeleton',
			table: {
				defaultValue: { summary: 'md' },
				type: { summary: 'xs | sm | md | lg | xl' },
			},
		},
		width: {
			control: { type: 'text' },
			description: 'Ancho del skeleton (número en px, porcentaje, o "full")',
			table: {
				defaultValue: { summary: 'full' },
			},
		},
		height: {
			control: { type: 'text' },
			description: 'Alto del skeleton (número en px o porcentaje)',
			table: {
				type: { summary: 'number | string' },
			},
		},
		lines: {
			control: { type: 'number', min: 1, max: 10 },
			description: 'Número de líneas de texto (solo para variant="text")',
			table: {
				defaultValue: { summary: '1' },
			},
		},
		animated: {
			control: { type: 'boolean' },
			description: 'Si el skeleton debe tener animación de pulso',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
			table: {
				type: { summary: 'string' },
			},
		},
		style: {
			control: { type: 'text' },
			description: 'Estilos inline adicionales',
			table: {
				type: { summary: 'string' },
			},
		},
	},
} satisfies Meta<SkeletonOptions>;

export default meta;
type Story = StoryObj<SkeletonOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		variant: 'text',
		size: 'md',
		width: 'full',
		height: '',
		lines: 3,
		animated: true,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// Opción 1: Usar createSkeleton (retorna elemento)
const skeletonElement = window.UBITS.Skeleton.create({
  variant: 'text',
  size: 'md',
  width: 'full',
  lines: 3,
  animated: true
});
document.getElementById('container').appendChild(skeletonElement);

// Opción 2: Usar renderSkeleton (retorna HTML string)
const skeletonHTML = window.UBITS.Skeleton.render({
  variant: 'text',
  size: 'md',
  width: 'full',
  lines: 3,
  animated: true
});
document.getElementById('container').innerHTML = skeletonHTML;

// Ejemplo con variant circle (para avatares)
const circleSkeleton = window.UBITS.Skeleton.create({
  variant: 'circle',
  size: 'md',
  animated: true
});

// Ejemplo con variant rectangle (para imágenes)
const rectangleSkeleton = window.UBITS.Skeleton.create({
  variant: 'rectangle',
  size: 'md',
  width: 300,
  height: 200,
  animated: true
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-skeleton');
		container.setAttribute('data-ubits-component', 'Skeleton');
		container.style.padding = '40px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.width = '100%';
		container.style.minHeight = '300px';
		container.style.boxSizing = 'border-box';

		// Contenedor interno con width 100%
		const innerContainer = document.createElement('div');
		innerContainer.style.width = '100%';
		innerContainer.style.boxSizing = 'border-box';
		innerContainer.style.display = 'flex';
		innerContainer.style.alignItems = 'center';
		innerContainer.style.justifyContent = 'center';
		innerContainer.style.minHeight = '200px';

		// Crear Skeleton
		try {
			const skeletonElement = createSkeleton({
				variant: args.variant || 'text',
				size: args.size || 'md',
				width: args.width,
				height: args.height,
				lines: args.lines || 1,
				animated: args.animated !== undefined ? args.animated : true,
				className: args.className,
				style: args.style,
			});
			innerContainer.appendChild(skeletonElement);
		} catch (error) {
			console.error('Error creando Skeleton:', error);
			innerContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		container.appendChild(innerContainer);
		return container;
	},
};

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
	args: {
		variant: 'text',
		size: 'md',
		width: 'full',
		height: '',
		lines: 3,
		animated: true,
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '40px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.width = '100%';
		container.style.minHeight = '300px';
		container.style.boxSizing = 'border-box';

		// Contenedor de preview
		const preview = document.createElement('div');
		preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		preview.style.padding = '48px';
		preview.style.border = 'none';
		preview.style.marginBottom = '24px';
		preview.style.minHeight = '200px';
		preview.style.display = 'flex';
		preview.style.alignItems = 'center';
		preview.style.justifyContent = 'center';
		preview.style.boxSizing = 'border-box';

		// Contenedor interno con width 100%
		const innerContainer = document.createElement('div');
		innerContainer.style.width = '100%';
		innerContainer.style.boxSizing = 'border-box';

		// Renderizar el skeleton
		const skeletonHTML = renderSkeleton(args);
		innerContainer.innerHTML = skeletonHTML;

		preview.appendChild(innerContainer);
		container.appendChild(preview);

		return container;
	},
};
