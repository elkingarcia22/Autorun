/**
 * SaveIndicator Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderSaveIndicator, createSaveIndicator } from '../../../../components/save-indicator/src/SaveIndicatorProvider';
import type { SaveIndicatorOptions } from '../../../../components/save-indicator/src/types/SaveIndicatorOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente y dependencias
import '../../../../components/save-indicator/src/styles/save-indicator.css';
import '../../../../components/spinner/src/styles/spinner.css';

const meta: Meta<SaveIndicatorOptions> = {
	title: 'Feedback/SaveIndicator',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente SaveIndicator UBITS para mostrar el estatus del guardado automático. Basado en Button del design system con los mismos estados, focus ring, border radius y tipografía. Soporta estados: Saved, Saving, Failed, Recently saved.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-save-indicator',
			api: {
				create: 'window.UBITS.SaveIndicator.create',
				render: 'renderSaveIndicator',
			},
			dependsOn: {
				required: [
					'🧩-ux-button', // Basado en Button component
				],
				optional: [
					'⚙️-functional-spinner', // Spinner usado en estado "saving"
				],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-feedback-fg-error',
				'--modifiers-normal-focus-color',
				'--modifiers-normal-body-md-semibold-fontsize',
				'--modifiers-normal-body-md-semibold-lineheight',
				'--p-spacing-mode-1-sm',
				'--p-spacing-mode-1-md',
				'--p-spacing-mode-1-lg',
				'--ubits-border-radius-sm',
				'--font-family-noto-sans-font-family',
				'--weight-semibold',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['state'],
			},
		}),
	},
	argTypes: {
		state: {
			control: { type: 'select' },
			options: ['saved', 'saving', 'failed', 'recently-saved'],
			description: 'Estado del indicador de guardado',
			table: {
				defaultValue: { summary: 'saved' },
				type: { summary: 'saved | saving | failed | recently-saved' },
			},
		},
		savingText: {
			control: { type: 'text' },
			description: 'Text personalizado para el estado "saving"',
			table: {
				defaultValue: { summary: 'Guardando...' },
				type: { summary: 'string' },
			},
		},
		recentlySavedText: {
			control: { type: 'text' },
			description: 'Texto personalizado para el estado "recently-saved"',
			table: {
				defaultValue: { summary: 'Cambios guardados' },
				type: { summary: 'string' },
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
			table: {
				type: { summary: 'string' },
			},
		},
	},
};

export default meta;
type Story = StoryObj<SaveIndicatorOptions>;

export const Saved: Story = {
	name: 'Saved',
	args: {
		state: 'saved',
	},
	render: (args) => {
		// Exponer API global
		if (typeof window !== 'undefined') {
			window.UBITS = window.UBITS || {};
			window.UBITS.SaveIndicator = {
				create: createSaveIndicator,
				render: renderSaveIndicator,
			};
		}

		const container = document.createElement('div');
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

		const indicator = createSaveIndicator(args);
		indicator.setAttribute('data-ubits-component', 'SaveIndicator');
		indicator.setAttribute('data-ubits-id', `save-indicator-${Date.now()}`);

		container.appendChild(indicator);
		return container;
	},
};

export const Hover: Story = {
	name: 'Hover',
	args: {
		state: 'saved',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

		const indicator = createSaveIndicator(args);
		indicator.setAttribute('data-ubits-component', 'SaveIndicator');
		indicator.setAttribute('data-ubits-id', `save-indicator-${Date.now()}`);
		indicator.setAttribute('data-state-preview', 'hover');

		// Simular hover state
		indicator.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		const icon = indicator.querySelector('i');
		if (icon) {
			icon.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
		}

		container.appendChild(indicator);
		return container;
	},
};

export const Focus: Story = {
	name: 'Focus',
	args: {
		state: 'saved',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

		const indicator = createSaveIndicator(args);
		indicator.setAttribute('data-ubits-component', 'SaveIndicator');
		indicator.setAttribute('data-ubits-id', `save-indicator-${Date.now()}`);
		indicator.setAttribute('data-state-preview', 'focus');

		// Aplicar focus ring
		indicator.style.boxShadow = '0 0 0 4px var(--modifiers-normal-focus-color)';

		container.appendChild(indicator);
		return container;
	},
};

export const Saving: Story = {
	name: 'Saving',
	args: {
		state: 'saving',
		savingText: 'Guardando...',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

		const indicator = createSaveIndicator(args);
		indicator.setAttribute('data-ubits-component', 'SaveIndicator');
		indicator.setAttribute('data-ubits-id', `save-indicator-${Date.now()}`);

		container.appendChild(indicator);
		return container;
	},
};

export const Failed: Story = {
	name: 'Failed',
	args: {
		state: 'failed',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

		const indicator = createSaveIndicator(args);
		indicator.setAttribute('data-ubits-component', 'SaveIndicator');
		indicator.setAttribute('data-ubits-id', `save-indicator-${Date.now()}`);

		container.appendChild(indicator);
		return container;
	},
};

export const RecentlySaved: Story = {
	name: 'Recently saved',
	args: {
		state: 'recently-saved',
		recentlySavedText: 'Cambios guardados',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

		const indicator = createSaveIndicator(args);
		indicator.setAttribute('data-ubits-component', 'SaveIndicator');
		indicator.setAttribute('data-ubits-id', `save-indicator-${Date.now()}`);

		container.appendChild(indicator);
		return container;
	},
};

export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		state: 'saved',
		savingText: 'Guardando...',
		recentlySavedText: 'Cambios guardados',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.id = 'save-indicator-container';
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

		const indicator = createSaveIndicator(args);
		indicator.setAttribute('data-ubits-component', 'SaveIndicator');
		indicator.setAttribute('data-ubits-id', `save-indicator-${Date.now()}`);

		container.appendChild(indicator);
		return container;
	},
	parameters: {
		docs: {
			source: {
				code: `
// 1. Importar funciones (si usas módulos)
// import { createSaveIndicator, renderSaveIndicator } from '@ubits/save-indicator';

// 2. Crear SaveIndicator
const saveIndicator = window.UBITS.SaveIndicator.create({
  state: 'saved', // 'saved' | 'saving' | 'failed' | 'recently-saved'
  savingText: 'Guardando...', // Opcional, solo para estado 'saving'
  recentlySavedText: 'Cambios guardados', // Opcional, solo para estado 'recently-saved'
  className: '', // Opcional
  onClick: (event) => {
    console.log('Save indicator clicked');
  }
});

// 3. Insertar en el DOM
const container = document.getElementById('save-indicator-container');
if (container) {
  container.appendChild(saveIndicator);
}

// 4. Cambiar estado dinámicamente
function updateSaveState(newState) {
  const indicator = document.querySelector('[data-ubits-component="SaveIndicator"]');
  if (indicator) {
    // Remover clase anterior
    indicator.className = indicator.className.replace(/ubits-save-indicator--\\w+/g, '');
    // Agregar nueva clase
    indicator.classList.add(\`ubits-save-indicator--\${newState}\`);
    indicator.setAttribute('aria-label', \`Estado de guardado: \${newState}\`);
    
    // Actualizar contenido según el estado
    if (newState === 'saving') {
      indicator.innerHTML = \`
        <div class="ubits-spinner ubits-spinner--sm ubits-spinner--primary ubits-spinner--animated">
          <div class="ubits-spinner__circle">
            <div class="ubits-spinner__segment"></div>
            <div class="ubits-spinner__segment"></div>
            <div class="ubits-spinner__segment"></div>
            <div class="ubits-spinner__segment"></div>
          </div>
        </div>
        <span class="ubits-save-indicator__text">Guardando...</span>
      \`;
    } else if (newState === 'saved') {
      indicator.innerHTML = \`
        <span class="ubits-save-indicator__icon-wrapper">
          <i class="far fa-cloud"></i>
          <i class="fas fa-check ubits-save-indicator__overlay-icon"></i>
        </span>
      \`;
    } else if (newState === 'failed') {
      indicator.innerHTML = \`
        <span class="ubits-save-indicator__icon-wrapper">
          <i class="far fa-cloud"></i>
          <i class="fas fa-exclamation-triangle ubits-save-indicator__overlay-icon ubits-save-indicator__overlay-icon--error"></i>
        </span>
      \`;
    } else if (newState === 'recently-saved') {
      indicator.innerHTML = \`
        <span class="ubits-save-indicator__icon-wrapper">
          <i class="far fa-cloud"></i>
          <i class="fas fa-check ubits-save-indicator__overlay-icon"></i>
        </span>
        <span class="ubits-save-indicator__text">Cambios guardados</span>
      \`;
    }
  }
}

// Ejemplo de uso:
// updateSaveState('saving');
// setTimeout(() => updateSaveState('saved'), 2000);

// Nota: SaveIndicator está basado en Button component
// Usa los mismos tokens, estados (hover, focus), border radius y tipografía
// Los estados Hover y Focus se aplican automáticamente con CSS

// Alternativa: Usar renderSaveIndicator para obtener HTML string
const indicatorHTML = renderSaveIndicator({
  state: 'saved',
  savingText: 'Guardando...',
  recentlySavedText: 'Cambios guardados'
});

// Insertar HTML directamente
const container = document.getElementById('save-indicator-container');
if (container) {
  container.innerHTML = indicatorHTML;
}
				`,
			},
		},
	},
};
