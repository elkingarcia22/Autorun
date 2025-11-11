import type { Meta, StoryObj } from '@storybook/html';
import { createFileUpload, renderFileUpload } from '../../addons/file-upload/src/FileUploadProvider';
import type { FileUploadOptions } from '../../addons/file-upload/src/types/FileUploadOptions';
import '../../addons/file-upload/src/styles/file-upload.css';
import '../../addons/button/src/styles/button.css';
import '../../addons/progress/src/styles/progress.css';

const meta: Meta<FileUploadOptions> = {
  title: 'Components/File Upload',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente File Upload personalizado UBITS. Diseño moderno con dos vistas: Drop Zone (área de arrastrar y soltar con icono circular) y Files List (lista de archivos con progreso). Usa componentes UBITS (Button) y tokens UBITS exclusivamente.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'dragging', 'error', 'disabled', 'files-list'],
      description: 'Estado del componente.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia',
      },
    },
    files: {
      control: { type: 'object' },
      description: 'Array de archivos a mostrar (para vista files-list).',
      table: {
        type: { summary: 'FileInfo[]' },
        defaultValue: { summary: '[]' },
        category: 'Contenido',
      },
    },
    maxFiles: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Número máximo de archivos permitidos.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
        category: 'Comportamiento',
      },
    },
    maxSize: {
      control: { type: 'number', min: 1024, step: 1024 },
      description: 'Tamaño máximo por archivo en bytes.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5242880 (5MB)' },
        category: 'Comportamiento',
      },
    },
    dropText: {
      control: { type: 'text' },
      description: 'Texto para el área de drop.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Arrastra tus archivos aquí' },
        category: 'Contenido',
      },
    },
    selectButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón de selección.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Seleccionar archivos' },
        category: 'Contenido',
      },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Si se muestra el icono en el drop zone.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Apariencia',
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
    showProgress: {
      control: { type: 'boolean' },
      description: 'Si se muestra la barra de progreso.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadOptions>;

export const Default: Story = {
  args: {
    state: 'default',
    files: [],
    maxFiles: 6,
    maxSize: 5242880, // 5MB
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos',
    showIcon: false,
    showFileSize: true,
    showProgress: true,
  },
  render: (args) => {
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

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

    const title = document.createElement('h2');
    title.textContent = 'File Upload';
    title.style.cssText = `
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    `;

    const description = document.createElement('p');
    description.textContent = 'Componente File Upload con diseño moderno. Soporta dos vistas: Drop Zone (área de arrastrar y soltar) y Files List (lista de archivos con progreso). Usa componentes UBITS y tokens UBITS exclusivamente.';
    description.style.cssText = `
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    `;

    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = `file-upload-container-${Date.now()}`;
    fileUploadContainer.style.cssText = `width: 100%; margin: 0 auto;`;

    const createFileUploadContent = () => {
      fileUploadContainer.innerHTML = '';
      
      // Determinar si mostrar vista de lista o drop zone
      const hasFiles = args.files && args.files.length > 0;
      const actualState = hasFiles ? 'files-list' : (args.state || 'default');
      
      const options: FileUploadOptions = {
        state: actualState,
        files: args.files || [],
        maxFiles: args.maxFiles || 6,
        maxSize: args.maxSize || 5242880,
        dropText: args.dropText || 'Arrastra tus archivos aquí',
        selectButtonText: args.selectButtonText || 'Seleccionar archivos',
        showIcon: args.showIcon !== undefined ? args.showIcon : false,
        showFileSize: args.showFileSize !== undefined ? args.showFileSize : true,
        showProgress: args.showProgress !== undefined ? args.showProgress : true,
      };
      
      try {
        const html = renderFileUpload(options);
        fileUploadContainer.innerHTML = html;
      } catch (error) {
        console.error('Error rendering file upload:', error);
      }
    };

    createFileUploadContent();

    let lastArgs = JSON.stringify(args);
    const checkInterval = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        createFileUploadContent();
      }
    }, 100);

    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(fileUploadContainer);
    container.appendChild(wrapper);

    return container;
  },
};

