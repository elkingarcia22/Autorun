import type { Meta, StoryObj } from '@storybook/html';
import { createFileUpload, renderFileUpload } from '../../addons/file-upload/src/FileUploadProvider';
import type { FileUploadOptions } from '../../addons/file-upload/src/types/FileUploadOptions';
import '../../addons/file-upload/src/styles/file-upload.css';

const meta: Meta<FileUploadOptions> = {
  title: 'Components/File Upload',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente File Upload personalizado UBITS. Se usa para subir archivos con drag & drop. Soporta múltiples estados (default, dragging, error, disabled) y muestra información del archivo (nombre, extensión, tamaño). Incluye botones de acción opcionales (re-subir y eliminar).',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'dragging', 'error', 'disabled'],
      description: 'Estado del componente.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia',
      },
    },
    fileName: {
      control: { type: 'text' },
      description: 'Nombre del archivo a mostrar.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'Contenido',
      },
    },
    fileExtension: {
      control: { type: 'text' },
      description: 'Extensión del archivo (ej: pdf, jpg, docx).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'Contenido',
      },
    },
    fileSize: {
      control: { type: 'number', min: 0, step: 1024 },
      description: 'Tamaño del archivo en bytes (se mostrará formateado automáticamente).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Contenido',
      },
    },
    showFileSize: {
      control: { type: 'boolean' },
      description: 'Si se muestra el tamaño del archivo.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Si se muestran los botones de acción (re-subir y eliminar).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    uploadText: {
      control: { type: 'text' },
      description: 'Text personalizado para el área de upload.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Haz clic para subir archivo' },
        category: 'Contenido',
      },
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadOptions>;

export const Default: Story = {
  args: {
    state: 'default',
    fileName: '',
    fileExtension: '',
    fileSize: 0,
    showFileSize: true,
    showActions: true,
    uploadText: 'Haz clic para subir archivo',
  },
  render: (args) => {
    // Crear contenedor fullscreen
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    `;

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

    // Título
    const title = document.createElement('h2');
    title.textContent = 'File Upload';
    title.style.cssText = `
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    `;

    // Descripción
    const description = document.createElement('p');
    description.textContent = 'Componente para subir archivos con drag & drop. Soporta múltiples estados y muestra información del archivo.';
    description.style.cssText = `
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    `;

    // Contenedor para el file upload
    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = `file-upload-container-${Date.now()}`;
    fileUploadContainer.style.cssText = `
      width: 100%;
      margin: 0 auto;
    `;

    let fileUploadInstance: any = null;

    const createFileUploadContent = () => {
      // Limpiar completamente el contenedor primero
      fileUploadContainer.innerHTML = '';
      
      // Limpiar instancia anterior
      if (fileUploadInstance) {
        try {
          fileUploadInstance.destroy();
        } catch (e) {
          // Ignorar errores de destrucción
        }
        fileUploadInstance = null;
      }

      // Preparar opciones
      const options: FileUploadOptions = {
        state: args.state || 'default',
        fileName: args.fileName,
        fileExtension: args.fileExtension,
        fileSize: args.fileSize !== undefined ? args.fileSize : 0,
        showFileSize: args.showFileSize !== undefined ? args.showFileSize : true,
        showActions: args.showActions !== undefined ? args.showActions : true,
        uploadText: args.uploadText || 'Haz clic para subir archivo',
        containerId: fileUploadContainer.id,
      };

      // Crear file upload directamente en el contenedor usando renderFileUpload
      try {
        const html = renderFileUpload(options);
        fileUploadContainer.innerHTML = html;
        
        // Crear instancia simulada para mantener compatibilidad
        const fileUploadElement = fileUploadContainer.querySelector('.ubits-file-upload') as HTMLElement;
        if (fileUploadElement) {
          fileUploadInstance = {
            element: fileUploadElement,
            destroy: () => {
              fileUploadContainer.innerHTML = '';
            },
            update: () => {}
          };
        }
      } catch (error) {
        // Error al crear file upload
      }
    };

    // Crear contenido inicial
    createFileUploadContent();

    // Observar cambios en args usando un intervalo más eficiente
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    
    const startWatching = () => {
      if (checkInterval) return;
      
      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createFileUploadContent();
        }
      }, 100);
    };
    
    startWatching();

    // Limpiar al desmontar
    const cleanup = () => {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      fileUploadContainer.innerHTML = '';
      if (fileUploadInstance) {
        try {
          fileUploadInstance.destroy();
        } catch (e) {
          // Ignorar errores
        }
      }
    };
    
    container.addEventListener('DOMNodeRemoved', cleanup);

    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(fileUploadContainer);
    container.appendChild(wrapper);

    return container;
  },
};

