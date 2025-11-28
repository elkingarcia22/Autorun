/**
 * @ubits/pagination
 * Export público del add-on Pagination
 */

export { PaginationAddon } from './PaginationAddon';
export { renderPagination, createPagination } from './PaginationProvider';
export { UBITSPagination } from './PaginationComponent';
export type {
  PaginationOptions,
  PaginationVariant,
  PaginationSize
} from './types/PaginationOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
  import('./PaginationComponent').then(() => {
    console.log('✅ UBITS Pagination component registered');
  });
}

