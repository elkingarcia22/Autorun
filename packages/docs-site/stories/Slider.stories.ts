import type { Meta, StoryObj } from '@storybook/html';
import { renderSlider, createSlider } from '../../addons/slider/src/SliderProvider';
import type { SliderOptions, SliderOrientation, SliderSize, SliderState, SliderMode } from '../../addons/slider/src/types/SliderOptions';
import '../../addons/slider/src/styles/slider.css';

const meta: Meta<SliderOptions & { 
  marksString?: string;
  valuesString?: string;
}> = {
  title: 'Components/Slider',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Slider UBITS con soporte para orientación horizontal/vertical, modo single/range, inputs opcionales, marcas, y todos los tamaños y estados.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label',
      table: {
        defaultValue: { summary: '' },
      },
    },
    helperText: {
      control: { type: 'text' },
      description: 'Texto de ayuda (helper text)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del slider',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'disabled'],
      description: 'Estado del slider',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | disabled' },
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientación del slider',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'horizontal | vertical' },
      },
    },
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
      description: 'Modo del slider: single (un valor) o range (dos valores)',
      table: {
        defaultValue: { summary: 'single' },
        type: { summary: 'single | range' },
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Valor mínimo',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Valor máximo',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: { type: 'number', min: 0.1, step: 0.1 },
      description: 'Paso (step) del slider',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    value: {
      control: { type: 'number' },
      description: 'Valor inicial (para modo single)',
      table: {
        defaultValue: { summary: '50' },
      },
      if: { arg: 'mode', eq: 'single' },
    },
    valuesString: {
      control: { type: 'text' },
      description: 'Valores iniciales como JSON array [min, max] (para modo range)',
      table: {
        defaultValue: { summary: '[25, 75]' },
      },
      if: { arg: 'mode', eq: 'range' },
    },
    showInputs: {
      control: { type: 'boolean' },
      description: 'Mostrar inputs numéricos',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Mostrar/ocultar label',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showHelper: {
      control: { type: 'boolean' },
      description: 'Mostrar/ocultar helper text',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showMarks: {
      control: { type: 'boolean' },
      description: 'Mostrar marcas/ticks en el slider',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    marksString: {
      control: { type: 'text' },
      description: 'Valores donde mostrar marcas como JSON array (ej: [0, 25, 50, 75, 100])',
      table: {
        defaultValue: { summary: '[]' },
      },
      if: { arg: 'showMarks', eq: true },
    },
    showRangeGuide: {
      control: { type: 'boolean' },
      description: 'Mostrar guía visual del rango debajo del slider (ej: 0 - 100)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SliderOptions & { 
  marksString?: string;
  valuesString?: string;
}>;

/**
 * Story única con todos los controles
 */
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

