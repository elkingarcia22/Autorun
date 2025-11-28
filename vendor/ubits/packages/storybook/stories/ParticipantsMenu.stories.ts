import type { Meta, StoryObj } from '@storybook/html';
import { renderParticipantsMenu, createParticipantsMenu } from '../../addons/participants-menu/src/ParticipantsMenuProvider';
import type { ParticipantsMenuOptions, Participant, ParticipantStatus } from '../../addons/participants-menu/src/types/ParticipantsMenuOptions';
import '../../addons/participants-menu/src/styles/participants-menu.css';
import '../../addons/drawer/src/styles/drawer.css';
import '../../addons/checkbox/src/styles/checkbox.css';
import '../../addons/button/src/styles/button.css';
import '../../addons/badge/src/styles/badge.css';
import '../../addons/empty-state/src/styles/empty-state.css';

const meta: Meta<ParticipantsMenuOptions> = {
  title: 'Navegación/Menu de Participantes',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente de menú lateral UBITS para mostrar una lista de participantes. Incluye búsqueda, filtro y lista de participantes con avatar, nombre, rol y estado.'
}
},
    layout: 'fullscreen'
},
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del menú',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Participantes' },
        category: 'Contenido'
}
},
    searchPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del input de búsqueda',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Buscar participan...' },
        category: 'Contenido'
}
},
    showAvatar: {
      control: { type: 'boolean' },
      description: 'Mostrar avatar de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia'
}
},
    showRole: {
      control: { type: 'boolean' },
      description: 'Mostrar rol (texto complementario) de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia'
}
},
    showStatusTag: {
      control: { type: 'boolean' },
      description: 'Mostrar status tag de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia'
}
},
    enableScrollbar: {
      control: { type: 'boolean' },
      description: 'Activar scrollbar de UBITS para la lista de participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Funcionalidad'
}
},
    selectedParticipantId: {
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', undefined],
      description: 'ID del participante seleccionado',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
        category: 'Estado'
}
}
}
};

export default meta;
type Story = StoryObj<ParticipantsMenuOptions>;

// Datos de ejemplo
const sampleParticipants: Participant[] = [
  {
    id: '1',
    name: 'Elkin Garcia',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'bajo',
    selected: true
  },
  {
    id: '2',
    name: 'Estefanía Rojas',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'muy-alto'
  },
  {
    id: '3',
    name: 'Ligia salazar',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    status: 'muy-alto'
  },
  {
    id: '4',
    name: 'Cristian Perez',
    role: 'Recursos humanos',
    avatarImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    status: 'muy-alto'
  },
  {
    id: '5',
    name: 'Matias Castillo',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    status: 'muy-alto'
  },
  {
    id: '6',
    name: 'Nelson Prado',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    status: 'muy-alto'
  },
  {
    id: '7',
    name: 'Alisson Vélez',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/women/7.jpg',
    status: 'muy-alto'
  },
  {
    id: '8',
    name: 'Andres Lopez',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/8.jpg',
    status: 'muy-alto'
  },
  {
    id: '9',
    name: 'Carlos Torres',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/men/9.jpg',
    status: 'muy-alto'
  },
  {
    id: '10',
    name: 'María González',
    role: 'Marketing',
    avatarImage: 'https://randomuser.me/api/portraits/women/10.jpg',
    status: 'medio'
  },
  {
    id: '11',
    name: 'Juan Martínez',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/men/11.jpg',
    status: 'alto'
  },
  {
    id: '12',
    name: 'Ana Rodríguez',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/women/12.jpg',
    status: 'bajo'
  },
  {
    id: '13',
    name: 'Pedro Sánchez',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/men/13.jpg',
    status: 'medio'
  },
  {
    id: '14',
    name: 'Patricia Fernández',
    role: 'Recursos humanos',
    avatarImage: 'https://randomuser.me/api/portraits/women/14.jpg',
    status: 'alto'
  },
  {
    id: '15',
    name: 'Diego Ramírez',
    role: 'Marketing',
    avatarImage: 'https://randomuser.me/api/portraits/men/15.jpg',
    status: 'bajo'
  },
  {
    id: '16',
    name: 'Valentina Morales',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/women/16.jpg',
    status: 'medio'
  },
  {
    id: '17',
    name: 'Ricardo Herrera',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/17.jpg',
    status: 'alto'
  },
  {
    id: '18',
    name: 'Carmen Jiménez',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/women/18.jpg',
    status: 'bajo'
  },
  {
    id: '19',
    name: 'Fernando Castro',
    role: 'Marketing',
    avatarImage: 'https://randomuser.me/api/portraits/men/19.jpg',
    status: 'medio'
  },
  {
    id: '20',
    name: 'Isabel Ruiz',
    role: 'Recursos humanos',
    avatarImage: 'https://randomuser.me/api/portraits/women/20.jpg',
    status: 'alto'
  }
];

export const Default: Story = {
  args: {
    title: 'Participantes',
    searchPlaceholder: 'Buscar participan...',
    participants: sampleParticipants,
    selectedParticipantId: '1',
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
},
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      position: relative;
      border: none;
      overflow: hidden;
    `;

    // Wrapper para limitar el ancho
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto;';

    // Contenedor para el menú
    const menuContainer = document.createElement('div');
    const containerId = `participants-menu-container-${Date.now()}`;
    menuContainer.id = containerId;
    menuContainer.style.cssText = `
      width: 100%;
      height: 100%;
    `;
    
    // Insertar el contenedor del menú en el wrapper
    wrapper.appendChild(menuContainer);
    // Insertar el wrapper en el container
    container.appendChild(wrapper);

    // Variable para preservar el valor del input de búsqueda
    let preservedSearchValue = '';
    // Flag para evitar re-render cuando viene de selección interna
    let skipNextRender = false;
    // Flag para evitar re-render cuando viene de búsqueda
    let skipNextRenderFromSearch = false;
    // Timeout para debounce del buscador
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;
    // Flag para indicar que se está procesando una búsqueda
    let isProcessingSearch = false;
    // Referencia a la instancia del menú para poder usar updateParticipantsList
    let menuInstance: ReturnType<typeof createParticipantsMenu> | null = null;
    // Estado de filtros activos
    let activeFilters: { roles: string[]; statuses: ParticipantStatus[] } = {
      roles: [],
      statuses: []
    };

    // Función para obtener solo los args relevantes (sin participants)
    const getRelevantArgs = (args: any) => {
      return JSON.stringify({
        title: args.title,
        searchPlaceholder: args.searchPlaceholder,
        selectedParticipantId: args.selectedParticipantId,
        showAvatar: args.showAvatar,
        showRole: args.showRole,
        showStatusTag: args.showStatusTag,
        // NO incluir participants aquí para evitar re-renders por búsqueda
      });
    };
    
    let lastArgs = getRelevantArgs(args);

    const createMenuContent = () => {
      // Preservar el valor y posición del cursor del input antes de limpiar
      const existingMenu = menuContainer.querySelector('.ubits-participants-menu');
      const existingInput = existingMenu 
        ? existingMenu.querySelector('.ubits-input') as HTMLInputElement
        : menuContainer.querySelector('.ubits-input') as HTMLInputElement;
      
      let cursorPosition = 0;
      let shouldRestoreFocus = false;
      
      if (existingInput) {
        preservedSearchValue = existingInput.value || '';
        cursorPosition = existingInput.selectionStart || 0;
        shouldRestoreFocus = document.activeElement === existingInput;
      }

      menuContainer.innerHTML = '';

      // Limpiar participant.selected de todos los participantes para evitar que quede pegado
      const cleanedParticipants = (args.participants || sampleParticipants).map(p => ({
        ...p,
        selected: false // Limpiar selected para que solo use selectedParticipantId
      }));

      // Crear opciones del menú
      const menuOptions: ParticipantsMenuOptions = {
        title: args.title || 'Participantes',
        searchPlaceholder: args.searchPlaceholder || 'Buscar participan...',
        participants: cleanedParticipants,
        selectedParticipantId: args.selectedParticipantId,
        showAvatar: args.showAvatar !== undefined ? args.showAvatar : true,
        showRole: args.showRole !== undefined ? args.showRole : true,
        showStatusTag: args.showStatusTag !== undefined ? args.showStatusTag : true,
        enableScrollbar: args.enableScrollbar !== undefined ? args.enableScrollbar : true,
        preservedSearchValue: preservedSearchValue, // Pasar el valor preservado
        onParticipantSelect: (participantId) => {
          // Activar flag para evitar re-render cuando el intervalo detecte el cambio
          skipNextRender = true;
          // Actualizar selección sin re-renderizar
          args.selectedParticipantId = participantId;
          // Actualizar lastArgs inmediatamente para que el setInterval no detecte cambios
          lastArgs = getRelevantArgs(args);
          // NO llamar createMenuContent() - la selección visual ya se actualizó en el componente
          // El flag skipNextRender evitará que el intervalo cause un re-render
        },
        onSearchChange: (searchText) => {
          preservedSearchValue = searchText || '';
          
          if (searchTimeout) {
            clearTimeout(searchTimeout);
          }
          
          searchTimeout = setTimeout(() => {
            isProcessingSearch = true;
            
            let filteredParticipants: Participant[] = [...sampleParticipants];
            
            // Aplicar búsqueda de texto
            if (searchText && searchText.trim() !== '') {
              filteredParticipants = filteredParticipants.filter(p => {
                const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
                const matchesRole = p.role.toLowerCase().includes(searchText.toLowerCase());
                return matchesName || matchesRole;
              });
            }
            
            // Aplicar filtros de roles
            if (activeFilters.roles.length > 0) {
              filteredParticipants = filteredParticipants.filter(p => 
                activeFilters.roles.includes(p.role)
              );
            }
            
            // Aplicar filtros de estados
            if (activeFilters.statuses.length > 0) {
              filteredParticipants = filteredParticipants.filter(p => 
                p.status && activeFilters.statuses.includes(p.status)
              );
            }
            
            args.participants = filteredParticipants;
            
            if (menuInstance?.updateParticipantsList) {
              skipNextRenderFromSearch = true;
              menuInstance.updateParticipantsList(filteredParticipants, args.selectedParticipantId);
              // Actualizar lastArgs inmediatamente para que el setInterval no detecte cambios
              lastArgs = getRelevantArgs(args);
              setTimeout(() => {
                isProcessingSearch = false;
                skipNextRenderFromSearch = false;
              }, 100); // Aumentar tiempo para asegurar que el setInterval no detecte cambios
            } else {
              skipNextRenderFromSearch = true;
              createMenuContent();
              setTimeout(() => {
                isProcessingSearch = false;
                skipNextRenderFromSearch = false;
              }, 50);
            }
            
            searchTimeout = null;
          }, 300);
        },
        onFilterClick: () => {
          // Handler para click en filtros
        },
        onFilterChange: (filters) => {
          activeFilters = filters;
          
          // Aplicar filtros a los participantes
          let filteredParticipants = [...sampleParticipants];
          
          // Filtrar por roles
          if (filters.roles.length > 0) {
            filteredParticipants = filteredParticipants.filter(p => 
              filters.roles.includes(p.role)
            );
          }
          
          // Filtrar por estados
          if (filters.statuses.length > 0) {
            filteredParticipants = filteredParticipants.filter(p => 
              p.status && filters.statuses.includes(p.status)
            );
          }
          
          // También aplicar búsqueda si hay texto
          if (preservedSearchValue && preservedSearchValue.trim() !== '') {
            filteredParticipants = filteredParticipants.filter(p => {
              const matchesName = p.name.toLowerCase().includes(preservedSearchValue.toLowerCase());
              const matchesRole = p.role.toLowerCase().includes(preservedSearchValue.toLowerCase());
              return matchesName || matchesRole;
            });
          }
          
          args.participants = filteredParticipants;
          
          if (menuInstance?.updateParticipantsList) {
            skipNextRenderFromSearch = true;
            menuInstance.updateParticipantsList(filteredParticipants, args.selectedParticipantId);
            lastArgs = getRelevantArgs(args);
            setTimeout(() => {
              skipNextRenderFromSearch = false;
            }, 100);
          } else {
            skipNextRenderFromSearch = true;
            createMenuContent();
            setTimeout(() => {
              skipNextRenderFromSearch = false;
            }, 50);
          }
        },
        containerId: containerId
      };

      setTimeout(() => {
        try {
          const existingMenu = menuContainer.querySelector('.ubits-participants-menu');
          if (existingMenu) {
            existingMenu.remove();
          }
          
          menuInstance = createParticipantsMenu(menuOptions);
          
          if (shouldRestoreFocus) {
            setTimeout(() => {
              const newInput = menuContainer.querySelector('.ubits-input') as HTMLInputElement;
              if (newInput) {
                newInput.focus();
                const currentValue = newInput.value || '';
                const safePosition = Math.min(cursorPosition, currentValue.length);
                newInput.setSelectionRange(safePosition, safePosition);
              }
            }, 100);
          }
        } catch (error) {
          console.error('[Story] Error:', error);
        }
      }, 0);
    };

    // Crear contenido inicial
    createMenuContent();

    // Observar cambios en args
    let checkInterval: ReturnType<typeof setInterval> | null = null;

    const startWatching = () => {
      if (checkInterval) return;

      checkInterval = setInterval(() => {
        // Si se está procesando una búsqueda, no verificar cambios
        if (isProcessingSearch) {
          return;
        }
        
        const currentArgs = getRelevantArgs(args);
        if (currentArgs !== lastArgs) {
          if (skipNextRender) {
            skipNextRender = false;
            lastArgs = currentArgs;
            return;
          }
          if (skipNextRenderFromSearch) {
            skipNextRenderFromSearch = false;
            lastArgs = currentArgs;
            return;
          }
          lastArgs = currentArgs;
          createMenuContent();
        }
      }, 100);
    };

    startWatching();

    // El menuContainer ya fue insertado arriba, no necesitamos insertarlo de nuevo
    return container;
  }
};

