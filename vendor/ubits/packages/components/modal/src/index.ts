import { createModal, renderModal } from './ModalProvider';
import type { ModalOptions } from './types/ModalOptions';
import './styles/modal.css';

export { createModal, renderModal };
export type { ModalOptions };

// Exponer globalmente para UMD
if (typeof window !== 'undefined') {
  (window as any).createModal = createModal;
  (window as any).renderModal = renderModal;
  
  // También exponer en UBITSModal para compatibilidad
  if (!(window as any).UBITSModal) {
    (window as any).UBITSModal = {};
  }
  (window as any).UBITSModal.createModal = createModal;
  (window as any).UBITSModal.renderModal = renderModal;
}

