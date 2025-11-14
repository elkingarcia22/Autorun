import type { Meta, StoryObj } from '@storybook/html';
import { renderParticipantsMenu, createParticipantsMenu } from '../../addons/participants-menu/src/ParticipantsMenuProvider';
import type { ParticipantsMenuOptions, Participant, ParticipantStatus } from '../../addons/participants-menu/src/types/ParticipantsMenuOptions';
import '../../addons/participants-menu/src/styles/participants-menu.css';

const meta: Meta<ParticipantsMenuOptions> = {
  title: 'Components/ParticipantsMenu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente de menú lateral UBITS para mostrar una lista de participantes. Incluye búsqueda, filtro y lista de participantes con avatar, nombre, rol y estado.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del menú',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Participantes' },
        category: 'Contenido',
      },
    },
    searchPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del input de búsqueda',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Buscar participan...' },
        category: 'Contenido',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ParticipantsMenuOptions>;

// Datos de ejemplo
const sampleParticipants: Participant[] = [
  {
    id: '1',
    name: 'Elkin Garcia',
    role: 'Producto',
    status: 'bajo',
    selected: true
  },
  {
    id: '2',
    name: 'Estefanía Rojas',
    role: 'Ventas',
    status: 'muy-alto'
  },
  {
    id: '3',
    name: 'Ligia salazar',
    role: 'Ventas',
    status: 'muy-alto'
  },
  {
    id: '4',
    name: 'Cristian Perez',
    role: 'Recursos humanos',
    status: 'muy-alto'
  },
  {
    id: '5',
    name: 'Matias Castillo',
    role: 'Tecnología',
    status: 'muy-alto'
  },
  {
    id: '6',
    name: 'Nelson Prado',
    role: 'Producto',
    status: 'muy-alto'
  },
  {
    id: '7',
    name: 'Alisson Vélez',
    role: 'Tecnología',
    status: 'muy-alto'
  },
  {
    id: '8',
    name: 'Andres Lopez',
    role: 'Producto',
    status: 'muy-alto'
  },
  {
    id: '9',
    name: 'Carlos Torres',
    role: 'Tecnología',
    status: 'muy-alto'
  }
];

export const Default: Story = {
  args: {
    title: 'Participantes',
    searchPlaceholder: 'Buscar participan...',
    participants: sampleParticipants,
    selectedParticipantId: '1',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = `
      width: 320px;
      height: 100vh;
      background: var(--ubits-bg-1, #ffffff);
      position: relative;
    `;

    // Contenedor para el menú
    const menuContainer = document.createElement('div');
    menuContainer.id = `participants-menu-container-${Date.now()}`;
    menuContainer.style.cssText = `
      width: 100%;
      height: 100%;
    `;

    const createMenuContent = () => {
      // Limpiar contenedor
      menuContainer.innerHTML = '';

      // Crear opciones del menú
      const menuOptions: ParticipantsMenuOptions = {
        title: args.title || 'Participantes',
        searchPlaceholder: args.searchPlaceholder || 'Buscar participan...',
        participants: args.participants || sampleParticipants,
        selectedParticipantId: args.selectedParticipantId,
        onParticipantSelect: (participantId) => {
          console.log('Participante seleccionado:', participantId);
          // Actualizar selección
          const updatedParticipants = (args.participants || sampleParticipants).map(p => ({
            ...p,
            selected: p.id === participantId
          }));
          args.participants = updatedParticipants;
          createMenuContent();
        },
        onSearchChange: (searchText) => {
          console.log('Búsqueda:', searchText);
          // Filtrar participantes
          const filtered = sampleParticipants.filter(p => 
            p.name.toLowerCase().includes(searchText.toLowerCase()) ||
            p.role.toLowerCase().includes(searchText.toLowerCase())
          );
          args.participants = filtered;
          createMenuContent();
        },
        onFilterClick: () => {
          console.log('Filtro clickeado');
        },
        containerId: menuContainer.id
      };

      // Renderizar menú
      try {
        const html = renderParticipantsMenu(menuOptions);
        menuContainer.innerHTML = html;
      } catch (error) {
        console.error('Error al renderizar menú de participantes:', error);
        menuContainer.innerHTML = '<p style="color: var(--ubits-feedback-accent-error);">Error al renderizar el menú</p>';
      }
    };

    // Crear contenido inicial
    createMenuContent();

    // Observar cambios en args
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;

    const startWatching = () => {
      if (checkInterval) return;

      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createMenuContent();
        }
      }, 100);
    };

    startWatching();

    container.appendChild(menuContainer);
    return container;
  },
};

