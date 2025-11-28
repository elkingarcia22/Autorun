/**
 * @ubits/list
 * Export público del add-on List
 */

export { ListAddon } from './ListAddon';
export { renderList, createList } from './ListProvider';
export { UBITSList } from './ListComponent';
export type {
  ListOptions,
  ListItem,
  ListItemState,
  ListSize
} from './types/ListOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
  import('./ListComponent').then(() => {
    console.log('✅ UBITS List component registered');
  });
}

