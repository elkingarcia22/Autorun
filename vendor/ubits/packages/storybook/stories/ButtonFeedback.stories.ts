import type { Meta, StoryObj } from '@storybook/html';
import { createButtonFeedback } from '../../components/button-feedback/src/ButtonFeedbackProvider';
import type { ButtonFeedbackOptions } from '../../components/button-feedback/src/types/ButtonFeedbackOptions';

const meta: Meta<ButtonFeedbackOptions> = {
  title: 'Feedback/Button Feedback',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Botón flotante para obtener feedback de clientes. Al hacer clic, abre un modal con un formulario que permite seleccionar la sección actual y dejar un comentario. El feedback se puede enviar a un webhook de n8n.',
      },
    },
  },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Texto del botón flotante (opcional)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Icono del botón flotante',
      table: {
        defaultValue: { summary: 'comment-dots' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      description: 'Posición del botón flotante',
      table: {
        defaultValue: { summary: 'bottom-right' },
      },
    },
    offset: {
      control: { type: 'number' },
      description: 'Offset desde el borde (en píxeles)',
      table: {
        defaultValue: { summary: 24 },
      },
    },
    modalTitle: {
      control: { type: 'text' },
      description: 'Título del modal de feedback',
      table: {
        defaultValue: { summary: 'Deja tu Feedback' },
      },
    },
    sectionOptions: {
      control: { type: 'object' },
      description: 'Opciones para el select de sección',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
    defaultSection: {
      control: { type: 'text' },
      description: 'Valor por defecto del select de sección',
      table: {
        defaultValue: { summary: '' },
      },
    },
    commentPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del textarea de comentarios',
      table: {
        defaultValue: { summary: '' },
      },
    },
    n8nWebhookUrl: {
      control: { type: 'text' },
      description: 'URL del endpoint de n8n para enviar el feedback',
      table: {
        defaultValue: { summary: '' },
      },
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Si el botón está visible inicialmente',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonFeedbackOptions>;

export const Default: Story = {
  args: {
    text: 'Feedback',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' },
      { value: 'aprendizaje', text: 'Aprendizaje' },
      { value: 'desempeno', text: 'Desempeño' },
      { value: 'diagnostico', text: 'Diagnóstico' },
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?',
    n8nWebhookUrl: '',
    visible: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      min-height: 100vh;
      padding: var(--ubits-spacing-8);
      background-color: var(--modifiers-normal-color-light-bg-1);
      color: var(--modifiers-normal-color-light-fg-1-high);
    `;

    // Aplicar estilos para dark mode
    const updateTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        container.style.backgroundColor = 'var(--modifiers-normal-color-dark-bg-1)';
        container.style.color = 'var(--modifiers-normal-color-dark-fg-1-high)';
      } else {
        container.style.backgroundColor = 'var(--modifiers-normal-color-light-bg-1)';
        container.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
      }
    };

    // Observar cambios de tema
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    updateTheme();

    // Crear contenido de ejemplo
    const content = document.createElement('div');
    content.style.cssText = `
      max-width: 800px;
      margin: 0 auto;
      padding: var(--ubits-spacing-8);
    `;
    content.innerHTML = `
      <h1 class="ubits-heading-h1">Página de Ejemplo</h1>
      <p class="ubits-body-lg">Este es un ejemplo de página con el botón de feedback flotante. Haz clic en el botón azul en la esquina inferior derecha para dejar tu feedback.</p>
      <p class="ubits-body-md">El botón de feedback permite a los usuarios enviar comentarios sobre la aplicación directamente desde cualquier página.</p>
    `;
    container.appendChild(content);

    // Variable para mantener la instancia del botón
    let feedbackButtonInstance: ReturnType<typeof createButtonFeedback> | null = null;

    // Función para destruir el botón anterior si existe
    const destroyPreviousButton = () => {
      if (feedbackButtonInstance) {
        feedbackButtonInstance.destroy();
        feedbackButtonInstance = null;
      }
      // También buscar y eliminar cualquier botón flotante que pueda quedar en el body
      const existingButtons = document.body.querySelectorAll('.ubits-button-feedback--bottom-right, .ubits-button-feedback--bottom-left, .ubits-button-feedback--top-right, .ubits-button-feedback--top-left');
      existingButtons.forEach(btn => {
        if (btn.parentElement) {
          btn.parentElement.removeChild(btn);
        }
      });
    };

    // Crear botón de feedback
    requestAnimationFrame(() => {
      try {
        // Destruir botón anterior si existe
        destroyPreviousButton();
        
        // Crear nuevo botón
        feedbackButtonInstance = createButtonFeedback({
          ...args,
          onFeedbackSent: (data) => {
            // Feedback enviado
          },
          onCancel: () => {
            // Feedback cancelado
          },
          onClose: () => {
            // Modal cerrado
          },
        });
      } catch (error) {
        console.error('Error creando botón de feedback:', error);
      }
    });

    return container;
  },
};

