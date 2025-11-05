import { renderStatusTag, createStatusTag } from './StatusTagProvider';
import type { StatusTagOptions } from './types/StatusTagOptions';
import './styles/status-tag.css';

export { renderStatusTag, createStatusTag };
export type { StatusTagOptions };

// Exponer API global si está en el navegador
if (typeof window !== 'undefined') {
  window.UBITS = window.UBITS || {};
  window.UBITS.StatusTag = {
    render: renderStatusTag,
    create: createStatusTag
  };

  // Exponer función global para compatibilidad
  if (!window.createStatusTag) {
    window.createStatusTag = createStatusTag;
  }
  
  if (!window.renderStatusTag) {
    window.renderStatusTag = renderStatusTag;
  }
}

