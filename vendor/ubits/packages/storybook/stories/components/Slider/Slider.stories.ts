import type { Meta, StoryObj } from '@storybook/html';
import { renderSlider, createSlider } from '../../../../components/slider/src/SliderProvider';
import type {
	SliderOptions,
	SliderOrientation,
	SliderSize,
	SliderState,
	SliderMode,
} from '../../../../components/slider/src/types/SliderOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente y dependencias
import '../../../../components/slider/src/styles/slider.css';
import '../../../../components/input/src/styles/input.css';

const meta: Meta<
	SliderOptions & {
		marksString?: string;
		valuesString?: string;
	}
> = {
	title: 'Formularios/Slider',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Slider UBITS con soporte para orientación horizontal/vertical, modo single/range, inputs opcionales, marcas, y todos los tamaños y estados.',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-slider',
			api: {
				create: 'window.UBITS.Slider.create',
				tag: '<ubits-slider>',
			},
			dependsOn: {
				required: [],
				optional: [
					'🧩-ux-input', // Inputs numéricos cuando showInputs es true
				],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-3',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-disabled',
				'--modifiers-normal-color-light-accent-brand',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-border-2',
				'--ubits-spacing-none',
				'--ubits-spacing-xs',
				'--ubits-spacing-sm',
				'--ubits-spacing-lg',
				'--ubits-border-radius-full',
				'--font-family-noto-sans-font-family',
				'--weight-semibold',
				'--weight-bold',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['containerId'],
			},
		}),
	},
	argTypes: {
		containerId: {
			control: { type: 'text' },
			description: 'ID del contenedor donde se renderizará el slider',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		label: {
			control: { type: 'text' },
			description: 'Texto del label',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' },
				category: 'Contenido',
			},
		},
		helperText: {
			control: { type: 'text' },
			description: 'Texto de ayuda (helper text)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' },
				category: 'Contenido',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del slider',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		state: {
			control: { type: 'select' },
			options: ['default', 'disabled'],
			description: 'Estado del slider',
			table: {
				type: { summary: 'default | disabled' },
				defaultValue: { summary: 'default' },
				category: 'Estado',
			},
		},
		orientation: {
			control: { type: 'select' },
			options: ['horizontal', 'vertical'],
			description: 'Orientación del slider',
			table: {
				type: { summary: 'horizontal | vertical' },
				defaultValue: { summary: 'horizontal' },
				category: 'Configuración',
			},
		},
		mode: {
			control: { type: 'select' },
			options: ['single', 'range'],
			description: 'Modo del slider: single (un valor) o range (dos valores)',
			table: {
				type: { summary: 'single | range' },
				defaultValue: { summary: 'single' },
				category: 'Configuración',
			},
		},
		min: {
			control: { type: 'number' },
			description: 'Valor mínimo',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '0' },
				category: 'Configuración',
			},
		},
		max: {
			control: { type: 'number' },
			description: 'Valor máximo',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '100' },
				category: 'Configuración',
			},
		},
		step: {
			control: { type: 'number', min: 0.1, step: 0.1 },
			description: 'Paso (step) del slider',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '1' },
				category: 'Configuración',
			},
		},
		value: {
			control: { type: 'number' },
			description: 'Valor inicial (para modo single)',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '50' },
				category: 'Configuración',
			},
			if: { arg: 'mode', eq: 'single' },
		},
		valuesString: {
			control: { type: 'text' },
			description: 'Valores iniciales como JSON array [min, max] (para modo range)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '[25, 75]' },
				category: 'Configuración',
			},
			if: { arg: 'mode', eq: 'range' },
		},
		showInputs: {
			control: { type: 'boolean' },
			description: 'Mostrar inputs numéricos',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		showLabel: {
			control: { type: 'boolean' },
			description: 'Mostrar/ocultar label',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Apariencia',
			},
		},
		showHelper: {
			control: { type: 'boolean' },
			description: 'Mostrar/ocultar helper text',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		showMarks: {
			control: { type: 'boolean' },
			description: 'Mostrar marcas/ticks en el slider',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		marksString: {
			control: { type: 'text' },
			description: 'Valores donde mostrar marcas como JSON array (ej: [0, 25, 50, 75, 100])',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '[]' },
				category: 'Configuración',
			},
			if: { arg: 'showMarks', eq: true },
		},
		showRangeGuide: {
			control: { type: 'boolean' },
			description: 'Mostrar guía visual del rango debajo del slider (ej: 0 - 100)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		onChange: {
			control: false,
			description: 'Callback cuando cambia el valor (modo single)',
			table: {
				type: { summary: '(value: number, event?: Event) => void' },
				category: 'Eventos',
			},
		},
		onRangeChange: {
			control: false,
			description: 'Callback cuando cambian los valores (modo range)',
			table: {
				type: { summary: '(values: [number, number], event?: Event) => void' },
				category: 'Eventos',
			},
		},
	},
} satisfies Meta<
	SliderOptions & {
		marksString?: string;
		valuesString?: string;
	}
>;

export default meta;
type Story = StoryObj<
	SliderOptions & {
		marksString?: string;
		valuesString?: string;
	}
>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		containerId: 'slider-implementation-container',
		label: 'Volumen',
		helperText: 'Ajusta el volumen del reproductor',
		size: 'md',
		state: 'default',
		orientation: 'horizontal',
		mode: 'single',
		min: 0,
		max: 100,
		step: 1,
		value: 50,
		showInputs: false,
		showLabel: true,
		showHelper: false,
		showMarks: false,
		showRangeGuide: false,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="slider-implementation-container"></div>

// 2. Crear Slider (modo single)
const slider = window.UBITS.Slider.create({
  containerId: 'slider-implementation-container',
  label: 'Volumen',
  helperText: 'Ajusta el volumen del reproductor',
  size: 'md',
  state: 'default',
  orientation: 'horizontal',
  mode: 'single',
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  showInputs: false,
  showLabel: true,
  showHelper: false,
  showMarks: false,
  showRangeGuide: false,
  onChange: (value, event) => {
    console.log('Valor cambiado:', value);
  }
});

// Nota: createSlider retorna un objeto con:
// - slider.element: El elemento DOM del slider
// - slider.getValue(): Obtener valor actual (number para single, [number, number] para range)
// - slider.setValue(value): Establecer valor (number para single, [number, number] para range)
// - slider.disable(): Deshabilitar el slider
// - slider.enable(): Habilitar el slider
// - slider.setState(newState): Cambiar estado ('default' | 'disabled')

// Ejemplo con modo range:
const sliderRange = window.UBITS.Slider.create({
  containerId: 'slider-range-container',
  label: 'Rango de precios',
  mode: 'range',
  min: 0,
  max: 1000,
  values: [100, 500],
  step: 10,
  showInputs: true,
  onRangeChange: (values, event) => {
    console.log('Rango cambiado:', values);
  }
});

// Ejemplo con inputs y marcas:
const sliderWithMarks = window.UBITS.Slider.create({
  containerId: 'slider-marks-container',
  label: 'Nivel',
  min: 0,
  max: 100,
  value: 50,
  step: 10,
  showMarks: true,
  marks: [0, 25, 50, 75, 100],
  showInputs: true
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-slider');
		container.setAttribute('data-ubits-component', 'Slider');
		container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    `;

		// Crear contenedor interno para el slider
		const sliderContainer = document.createElement('div');
		sliderContainer.id = args.containerId || 'slider-implementation-container';
		sliderContainer.style.cssText = `
      width: 100%;
      max-width: 600px;
    `;
		container.appendChild(sliderContainer);

		// Crear slider
		try {
			const slider = createSlider({
				containerId: sliderContainer.id,
				label: args.label || 'Volumen',
				helperText: args.helperText,
				size: args.size || 'md',
				state: args.state || 'default',
				orientation: args.orientation || 'horizontal',
				mode: args.mode || 'single',
				min: args.min ?? 0,
				max: args.max ?? 100,
				step: args.step ?? 1,
				value: args.mode === 'single' ? (args.value ?? 50) : undefined,
				values: args.mode === 'range' ? (args.valuesString ? JSON.parse(args.valuesString) : [25, 75]) : undefined,
				showInputs: args.showInputs ?? false,
				showLabel: args.showLabel ?? true,
				showHelper: args.showHelper ?? false,
				showMarks: args.showMarks ?? false,
				marks: args.showMarks && args.marksString ? JSON.parse(args.marksString) : undefined,
				showRangeGuide: args.showRangeGuide ?? false,
				onChange: args.onChange,
				onRangeChange: args.onRangeChange,
			});
		} catch (error) {
			console.error('Error creando Slider:', error);
			const errorDiv = document.createElement('div');
			errorDiv.textContent = `Error: ${error}`;
			errorDiv.style.color = 'red';
			container.appendChild(errorDiv);
		}

		return container;
	},
};

export const Default: Story = {
	args: {
		containerId: 'slider-storybook-container',
		label: 'Volumen',
		helperText: 'Ajusta el volumen del reproductor',
		size: 'md',
		state: 'default',
		orientation: 'horizontal',
		mode: 'single',
		min: 0,
		max: 100,
		step: 1,
		value: 50,
		valuesString: '[25, 75]',
		showInputs: false,
		showLabel: true,
		showHelper: false,
		showMarks: false,
		marksString: '[0, 25, 50, 75, 100]',
		showRangeGuide: false,
	},
	render: (args) => {
		// Crear contenedor principal
		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      max-width: ${args.orientation === 'vertical' ? '200px' : '800px'};
      margin: 20px auto;
      padding: 20px;
      min-height: ${args.orientation === 'vertical' ? '400px' : 'auto'};
    `;

		// Generar un ID único para el contenedor del slider
		const containerId = `slider-storybook-${Math.random().toString(36).substr(2, 9)}`;

		// Parsear valuesString si es range mode
		let values: [number, number] | undefined;
		if (args.mode === 'range') {
			try {
				const parsed = JSON.parse(args.valuesString || '[25, 75]');
				if (Array.isArray(parsed) && parsed.length === 2) {
					values = [parsed[0], parsed[1]];
				} else {
					values = [25, 75];
				}
			} catch (e) {
				values = [25, 75];
			}
		}

		// Parsear marksString si showMarks es true
		let marks: number[] | undefined;
		if (args.showMarks && args.marksString) {
			try {
				marks = JSON.parse(args.marksString);
				if (!Array.isArray(marks)) {
					marks = [];
				}
			} catch (e) {
				marks = [];
			}
		}

		// Preparar opciones del slider
		const sliderOptions: SliderOptions = {
			containerId,
			label: args.label,
			helperText: args.helperText,
			size: args.size,
			state: args.state,
			orientation: args.orientation,
			mode: args.mode,
			min: args.min,
			max: args.max,
			step: args.step,
			value: args.mode === 'single' ? args.value : undefined,
			values: args.mode === 'range' ? values : undefined,
			showInputs: args.showInputs,
			showLabel: args.showLabel,
			showHelper: args.showHelper,
			showMarks: args.showMarks,
			marks: marks,
			showRangeGuide: args.showRangeGuide,
			onChange: (value) => {
				// Callback cuando cambia el valor (modo single)
			},
			onRangeChange: (values) => {
				// Callback cuando cambian los valores (modo range)
			},
		};

		// Crear contenedor interno para el slider
		const sliderContainer = document.createElement('div');
		sliderContainer.id = containerId;

		// Ajustar estilos según orientación
		if (args.orientation === 'vertical') {
			sliderContainer.style.cssText = `
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
		} else {
			sliderContainer.style.cssText = `
        width: 100%;
        margin-bottom: 20px;
      `;
		}

		wrapper.appendChild(sliderContainer);

		// Función para crear/actualizar el slider
		const createSliderInstance = () => {
			const container = document.getElementById(containerId);
			if (!container) {
				console.error(`Container with ID "${containerId}" not found`);
				return;
			}

			// Limpiar contenedor antes de crear nuevo slider
			container.innerHTML = '';

			try {
				// Crear el slider
				const sliderInstance = createSlider(sliderOptions);

				if (sliderInstance) {
					// Guardar referencia para poder actualizar valores si es necesario
					(container as any).sliderInstance = sliderInstance;
				}
			} catch (err) {
				console.error('Error creating slider:', err);
				// Fallback: usar renderSlider si createSlider falla
				try {
					const sliderHTML = renderSlider(sliderOptions);
					container.innerHTML = sliderHTML;
				} catch (renderErr) {
					console.error('Error rendering slider:', renderErr);
					container.innerHTML = `<div style="color: red; padding: 16px;">Error: ${renderErr}</div>`;
				}
			}
		};

		// Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				createSliderInstance();
			});
		});

		// Retornar wrapper con método para actualizar cuando cambien los args
		(wrapper as any).updateSlider = createSliderInstance;

		return wrapper;
	},
};
