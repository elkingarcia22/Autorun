import type { Meta, StoryObj } from '@storybook/html';
import { createFileUpload, renderFileUpload } from '../../addons/file-upload/src/FileUploadProvider';
import type { FileUploadOptions } from '../../addons/file-upload/src/types/FileUploadOptions';
import '../../addons/file-upload/src/styles/file-upload.css';
import '../../addons/button/src/styles/button.css';
import '../../addons/progress/src/styles/progress.css';

const meta: Meta<FileUploadOptions> = {
  title: 'Formularios/File Upload',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente File Upload personalizado UBITS. Diseño moderno con dos vistas: Drop Zone (área de arrastrar y soltar con icono circular) y Files List (lista de archivos con progreso). Usa componentes UBITS (Button) y tokens UBITS exclusivamente.'
}
},
    layout: 'fullscreen'
},
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'dragging', 'error', 'disabled', 'files-list'],
      description: 'Estado del componente.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia'
}
},
    files: {
      control: { type: 'object' },
      description: 'Array de archivos a mostrar (para vista files-list).',
      table: {
        type: { summary: 'FileInfo[]' },
        defaultValue: { summary: '[]' },
        category: 'Contenido'
}
},
    maxFiles: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Número máximo de archivos permitidos.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
        category: 'Comportamiento'
}
},
    maxSize: {
      control: { type: 'number', min: 1024, step: 1024 },
      description: 'Tamaño máximo por archivo en bytes.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5242880 (5MB)' },
        category: 'Comportamiento'
}
},
    dropText: {
      control: { type: 'text' },
      description: 'Texto para el área de drop.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Arrastra tus archivos aquí' },
        category: 'Contenido'
}
},
    selectButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón de selección.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Seleccionar archivos' },
        category: 'Contenido'
}
},
    showIcon: {
      control: { type: 'boolean' },
      description: 'Si se muestra el icono en el drop zone.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Apariencia'
}
},
    showFileSize: {
      control: { type: 'boolean' },
      description: 'Si se muestra el tamaño del archivo.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento'
}
},
    showProgress: {
      control: { type: 'boolean' },
      description: 'Si se muestra la barra de progreso.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento'
}
}
}
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
    showProgress: true
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md);
    `;

    const title = document.createElement('h2');
    title.textContent = 'File Upload';
    title.style.cssText = `
      color: var(--modifiers-normal-color-light-fg-1-high);
      font-size: var(--modifiers-normal-heading-h2-fontsize);
      font-weight: var(--weight-semibold, 600);
    `;

    const description = document.createElement('p');
    description.textContent = 'Componente File Upload con diseño moderno. Soporta dos vistas: Drop Zone (área de arrastrar y soltar) y Files List (lista de archivos con progreso). Usa componentes UBITS y tokens UBITS exclusivamente.';
    description.style.cssText = `
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-md-regular-fontsize);
      line-height: var(--modifiers-normal-body-md-regular-lineheight);
    `;

    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = `file-upload-container-${Date.now()}`;

    const createFileUploadContent = () => {
      fileUploadContainer.innerHTML = '';
      
      // Determinar si mostrar vista de lista o drop zone
      let filesToUse = args.files || [];
      
      // Si el estado es 'files-list' pero no hay archivos, agregar archivos de ejemplo para probar los controles
      if (args.state === 'files-list' && (!filesToUse || filesToUse.length === 0)) {
        filesToUse = [
          {
            id: 'file-1',
            name: 'documento-ejemplo.pdf',
            size: 2048576, // 2MB
            progress: 45,
            status: 'uploading' as const
},
          {
            id: 'file-2',
            name: 'imagen-ejemplo.jpg',
            size: 1024000, // 1MB
            progress: 100,
            status: 'completed' as const
},
          {
            id: 'file-3',
            name: 'archivo-ejemplo.docx',
            size: 512000, // 512KB
            progress: 0,
            status: 'pending' as const
}
];
      }
      
      const hasFiles = filesToUse && filesToUse.length > 0;
      const actualState = hasFiles ? 'files-list' : (args.state || 'default');
      
      const showFileSizeValue = args.showFileSize !== undefined ? args.showFileSize : true;
      const showProgressValue = args.showProgress !== undefined ? args.showProgress : true;
      
      const options: FileUploadOptions = {
        state: actualState,
        files: filesToUse,
        maxFiles: args.maxFiles || 6,
        maxSize: args.maxSize || 5242880,
        dropText: args.dropText || 'Arrastra tus archivos aquí',
        selectButtonText: args.selectButtonText || 'Seleccionar archivos',
        showIcon: args.showIcon !== undefined ? args.showIcon : false,
        showFileSize: showFileSizeValue,
        showProgress: showProgressValue
      };
      
      try {
        const html = renderFileUpload(options);
        fileUploadContainer.innerHTML = html;
      } catch (error) {
        console.error('[FileUpload Storybook] Error rendering file upload:', error);
      }
    };

    createFileUploadContent();

    // Usar un objeto para comparar cambios de forma más precisa
    let lastArgsSnapshot: any = null;
    const checkInterval = setInterval(() => {
      // Crear snapshot actual de los args relevantes
      const currentArgsSnapshot = {
        showFileSize: args.showFileSize,
        showProgress: args.showProgress,
        showIcon: args.showIcon,
        state: args.state,
        files: args.files,
        maxFiles: args.maxFiles,
        maxSize: args.maxSize
};
      
      // Comparar con el snapshot anterior
      const argsChanged = !lastArgsSnapshot || 
        JSON.stringify(currentArgsSnapshot) !== JSON.stringify(lastArgsSnapshot);
      
      if (argsChanged) {
        lastArgsSnapshot = JSON.parse(JSON.stringify(currentArgsSnapshot)); // Deep copy
        createFileUploadContent();
      }
    }, 100);

    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(fileUploadContainer);
    container.appendChild(wrapper);

    return container;
  }
};

