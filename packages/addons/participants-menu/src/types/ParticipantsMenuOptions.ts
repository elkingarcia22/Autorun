/**
 * Estado del participante (para el status tag)
 */
export type ParticipantStatus = 'bajo' | 'medio' | 'alto' | 'muy-alto';

/**
 * Información de un participante
 */
export interface Participant {
  /**
   * ID único del participante
   */
  id: string;
  
  /**
   * Nombre completo del participante
   */
  name: string;
  
  /**
   * Rol o cargo del participante
   */
  role: string;
  
  /**
   * URL de la imagen del avatar
   */
  avatarImage?: string;
  
  /**
   * Estado del participante (para el badge de estado)
   */
  status?: ParticipantStatus;
  
  /**
   * Si el participante está seleccionado
   */
  selected?: boolean;
}

/**
 * Opciones para crear un Participants Menu
 */
export interface ParticipantsMenuOptions {
  /**
   * Título del menú
   */
  title?: string;
  
  /**
   * Placeholder del input de búsqueda
   */
  searchPlaceholder?: string;
  
  /**
   * Lista de participantes
   */
  participants: Participant[];
  
  /**
   * ID del participante seleccionado
   */
  selectedParticipantId?: string;
  
  /**
   * Callback cuando se selecciona un participante
   */
  onParticipantSelect?: (participantId: string) => void;
  
  /**
   * Callback cuando se cambia el texto de búsqueda
   */
  onSearchChange?: (searchText: string) => void;
  
  /**
   * Callback cuando se hace clic en el botón de filtro
   */
  onFilterClick?: () => void;

  /**
   * Callback cuando cambian los filtros aplicados
   * Recibe un objeto con los filtros activos: { roles: string[], statuses: ParticipantStatus[] }
   */
  onFilterChange?: (filters: { roles: string[]; statuses: ParticipantStatus[] }) => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * ID del contenedor donde se insertará el menú
   */
  containerId?: string;

  /**
   * Mostrar avatar de los participantes
   */
  showAvatar?: boolean;

  /**
   * Mostrar rol (texto complementario) de los participantes
   */
  showRole?: boolean;

  /**
   * Mostrar status tag de los participantes
   */
  showStatusTag?: boolean;

  /**
   * Activar scrollbar de UBITS para la lista de participantes
   * Cuando está activado, se mostrará el scrollbar personalizado de UBITS
   */
  enableScrollbar?: boolean;
}

