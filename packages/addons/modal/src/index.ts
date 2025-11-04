import { createModal, renderModal } from './ModalProvider';
import type { ModalOptions } from './types/ModalOptions';
import './styles/modal.css';

export { createModal, renderModal };
export type { ModalOptions };

if (typeof window !== 'undefined') {
  (window as any).createModal = createModal;
  (window as any).renderModal = renderModal;
}

