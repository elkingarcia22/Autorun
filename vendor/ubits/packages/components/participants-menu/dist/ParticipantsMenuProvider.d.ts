import { ParticipantsMenuOptions, Participant } from './types/ParticipantsMenuOptions';

/**
 * Renderiza el HTML del menú de participantes
 */
export declare function renderParticipantsMenu(options: ParticipantsMenuOptions): string;
/**
 * Crea un elemento DOM del menú de participantes y lo inserta en el contenedor
 */
export declare function createParticipantsMenu(options: ParticipantsMenuOptions): {
	element: HTMLElement;
	update: (newOptions: Partial<ParticipantsMenuOptions>) => void;
	updateParticipantsList: (participants: Participant[], selectedParticipantId?: string) => void;
	destroy: () => void;
};
//# sourceMappingURL=ParticipantsMenuProvider.d.ts.map
