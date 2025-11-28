/**
 * Card Content Add-on
 * Componente para mostrar cards de contenido de aprendizaje
 */

export { renderCardContent, loadCardContent, createCard } from './CardContentProvider';
export * from './types/CardContentOptions';
export * from './configs/cardConfigs';

/**
 * Simple Card Add-on
 * Componente de tarjeta simple con header, contenido y botones
 */

export { renderSimpleCard, createSimpleCard } from './SimpleCardProvider';
export * from './types/SimpleCardOptions';

