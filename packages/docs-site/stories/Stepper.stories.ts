import type { Meta, StoryObj } from '@storybook/html';
import { renderStepper, createStepper } from '../../addons/stepper/src/StepperProvider';
import type { StepperOptions, StepperStep, StepperStepState, StepperOrientation } from '../../addons/stepper/src/types/StepperOptions';
import '../../addons/stepper/src/styles/stepper.css';

interface ExtendedStepperOptions extends StepperOptions {
  numSteps?: number;
  showTitle?: boolean;
  showDescription?: boolean;
  step1State?: StepperStepState;
  step1Title?: string;
  step1Description?: string;
  step2State?: StepperStepState;
  step2Title?: string;
  step2Description?: string;
  step3State?: StepperStepState;
  step3Title?: string;
  step3Description?: string;
  step4State?: StepperStepState;
  step4Title?: string;
  step4Description?: string;
  step5State?: StepperStepState;
  step5Title?: string;
  step5Description?: string;
}

const meta: Meta<ExtendedStepperOptions> = {
  title: 'Components/Stepper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Stepper UBITS para mostrar el progreso de un proceso multi-paso. Soporta orientación horizontal y vertical, con estados: default, completado, activo, error y warning. Cada paso puede tener número, título y descripción.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientación del stepper',
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
        category: 'Apariencia',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del stepper',
      table: {
        type: { summary: 'xs | sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar títulos',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar títulos',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showDescription: {
      control: { type: 'boolean' },
      description: 'Mostrar descripciones (texto complementario)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    numSteps: {
      control: { type: 'number', min: 2, max: 5, step: 1 },
      description: 'Número de pasos a mostrar (2-5)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
        category: 'Comportamiento',
      },
    },
    step1State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 1',
      table: { category: 'Paso 1' },
    },
    step1Title: {
      control: { type: 'text' },
      description: 'Título del paso 1',
      table: { category: 'Paso 1' },
    },
    step1Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 1',
      table: { category: 'Paso 1' },
    },
    step2State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 2',
      table: { category: 'Paso 2' },
    },
    step2Title: {
      control: { type: 'text' },
      description: 'Título del paso 2',
      table: { category: 'Paso 2' },
    },
    step2Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 2',
      table: { category: 'Paso 2' },
    },
    step3State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 3',
      table: { category: 'Paso 3' },
    },
    step3Title: {
      control: { type: 'text' },
      description: 'Título del paso 3',
      table: { category: 'Paso 3' },
    },
    step3Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 3',
      table: { category: 'Paso 3' },
    },
    step4State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 4',
      table: { category: 'Paso 4' },
      if: { arg: 'numSteps', gte: 4 },
    },
    step4Title: {
      control: { type: 'text' },
      description: 'Título del paso 4',
      table: { category: 'Paso 4' },
      if: { arg: 'numSteps', gte: 4 },
    },
    step4Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 4',
      table: { category: 'Paso 4' },
      if: { arg: 'numSteps', gte: 4 },
    },
    step5State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 5',
      table: { category: 'Paso 5' },
      if: { arg: 'numSteps', gte: 5 },
    },
    step5Title: {
      control: { type: 'text' },
      description: 'Título del paso 5',
      table: { category: 'Paso 5' },
      if: { arg: 'numSteps', gte: 5 },
    },
    step5Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 5',
      table: { category: 'Paso 5' },
      if: { arg: 'numSteps', gte: 5 },
    },
  },
};

export default meta;
type Story = StoryObj<ExtendedStepperOptions>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    size: 'md',
    showTitle: true,
    showDescription: true,
    numSteps: 3,
    step1State: 'completed',
    step1Title: 'Step One',
    step1Description: 'Desc for step one',
    step2State: 'active',
    step2Title: 'Step Two',
    step2Description: 'Desc for step two',
    step3State: 'default',
    step3Title: 'Step Three',
    step3Description: 'Desc for step three',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--ubits-bg-1, #ffffff);
      min-height: 200px;
    `;

    // Contenedor para el stepper
    const stepperContainer = document.createElement('div');
    stepperContainer.id = `stepper-container-${Date.now()}`;
    stepperContainer.style.cssText = `
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    `;

    const createStepperContent = () => {
      // Limpiar contenedor
      stepperContainer.innerHTML = '';

      // Construir array de pasos
      const numSteps = args.numSteps || 3;
      const steps: StepperStep[] = [];

      for (let i = 1; i <= numSteps; i++) {
        const stepState = (args as any)[`step${i}State`] || (i === 1 ? 'completed' : i === 2 ? 'active' : 'default');
        const stepTitle = (args as any)[`step${i}Title`] || `Step ${i === 1 ? 'One' : i === 2 ? 'Two' : i === 3 ? 'Three' : i === 4 ? 'Four' : 'Five'}`;
        const stepDescription = (args as any)[`step${i}Description`] || `Desc for step ${i === 1 ? 'one' : i === 2 ? 'two' : i === 3 ? 'three' : i === 4 ? 'four' : 'five'}`;

        steps.push({
          number: i,
          title: stepTitle,
          description: stepDescription,
          state: stepState,
        });
      }

      // Crear opciones del stepper
      const stepperOptions: StepperOptions = {
        orientation: args.orientation || 'horizontal',
        size: args.size || 'md',
        showTitle: args.showTitle !== undefined ? args.showTitle : true,
        showDescription: args.showDescription !== undefined ? args.showDescription : true,
        steps: steps,
      };

      // Renderizar stepper
      try {
        const html = renderStepper(stepperOptions);
        stepperContainer.innerHTML = html;
      } catch (error) {
        console.error('Error al renderizar stepper:', error);
        stepperContainer.innerHTML = '<p style="color: var(--ubits-feedback-accent-error);">Error al renderizar el stepper</p>';
      }
    };

    // Crear contenido inicial
    createStepperContent();

    // Observar cambios en args
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;

    const startWatching = () => {
      if (checkInterval) return;

      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createStepperContent();
        }
      }, 100);
    };

    startWatching();

    // Limpiar al desmontar
    const cleanup = () => {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      stepperContainer.innerHTML = '';
    };

    container.addEventListener('DOMNodeRemoved', cleanup);

    container.appendChild(stepperContainer);

    return container;
  },
};

