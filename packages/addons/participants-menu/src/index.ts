export { renderParticipantsMenu, createParticipantsMenu } from './ParticipantsMenuProvider';
export type { ParticipantsMenuOptions, Participant, ParticipantStatus } from './types/ParticipantsMenuOptions';

// Nota: Para el formato UMD, Vite expone automáticamente las funciones en window.UbitsParticipantsMenu
// No necesitamos exponer manualmente en window aquí, ya que causa problemas con el scope del UMD

