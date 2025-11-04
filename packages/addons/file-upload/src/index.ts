import { createFileUpload, renderFileUpload } from './FileUploadProvider';
import type { FileUploadOptions } from './types/FileUploadOptions';
import './styles/file-upload.css';

export { createFileUpload, renderFileUpload };
export type { FileUploadOptions };

// Exponer globalmente para uso en playground
if (typeof window !== 'undefined') {
  (window as any).createFileUpload = createFileUpload;
  (window as any).renderFileUpload = renderFileUpload;
}

