/**
 * FileUpload Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import {
	createFileUpload,
	renderFileUpload,
} from '../../../../components/file-upload/src/FileUploadProvider';
import type {
	FileUploadOptions,
	FileInfo,
} from '../../../../components/file-upload/src/types/FileUploadOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/file-upload/src/styles/file-upload.css';
import '../../../../components/button/src/styles/button.css';
import '../../../../components/progress/src/styles/progress.css';

const meta: Meta<FileUploadOptions> = {
	title: 'Formularios/File Upload',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente File Upload personalizado UBITS. Diseño moderno con dos vistas: Drop Zone (área de arrastrar y soltar con icono circular) y Files List (lista de archivos con progreso).',
			},
		},
		layout: 'fullscreen',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-file-upload',
			api: {
				create: 'window.UBITS.FileUpload.create',
				tag: '<ubits-file-upload>',
			},
			dependsOn: {
				required: ['🧩-ux-button'], // Botón de selección es requerido
				optional: ['🧩-ux-progress'], // Barra de progreso es opcional
			},
			internals: [], // FileUpload no tiene componentes internos privados
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-border-radius-sm',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: [],
			},
		}),
	},
	args: {
		state: 'default',
		files: [],
		maxFiles: 6,
		maxSize: 5242880,
		dropText: 'Arrastra tus archivos aquí',
		selectButtonText: 'Seleccionar archivos',
		showIcon: false,
		showFileSize: true,
		showProgress: true,
		showActions: true,
		className: '',
	},
	argTypes: {
		state: {
			control: { type: 'select' },
			options: ['default', 'dragging', 'error', 'disabled', 'filled', 'files-list'],
			description: 'Estado del componente.',
			table: {
				type: { summary: 'default | dragging | error | disabled | filled | files-list' },
				defaultValue: { summary: 'default' },
				category: 'Apariencia',
			},
		},
		files: {
			control: { type: 'object' },
			description: 'Array de archivos a mostrar (para vista files-list).',
			table: {
				type: { summary: 'FileInfo[]' },
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
		showActions: {
			control: { type: 'boolean' },
			description: 'Si se muestran los botones de acción (re-subir y eliminar).',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Comportamiento',
			},
		},
		onFileSelect: {
			action: 'file-selected',
			description: 'Callback cuando se seleccionan archivos',
			table: {
				disable: true,
			},
		},
		onFileRemove: {
			action: 'file-removed',
			description: 'Callback cuando se elimina un archivo',
			table: {
				disable: true,
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
			table: {
				type: { summary: 'string' },
				category: 'Avanzado',
			},
		},
	},
};

export default meta;
type Story = StoryObj<FileUploadOptions>;

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		state: 'default',
		files: [],
		maxFiles: 6,
		maxSize: 5242880,
		dropText: 'Arrastra tus archivos aquí',
		selectButtonText: 'Seleccionar archivos',
		showIcon: false,
		showFileSize: true,
		showProgress: true,
		showActions: true,
		className: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="fileupload-implementation-container"></div>

// 2. Crear file upload
window.UBITS.FileUpload.create({
  containerId: 'fileupload-implementation-container',
  state: 'default',
  files: [],
  maxFiles: 6,
  maxSize: 5242880,
  dropText: 'Arrastra tus archivos aquí',
  selectButtonText: 'Seleccionar archivos',
  showIcon: false,
  showFileSize: true,
  showProgress: true,
  showActions: true
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-file-upload');
		container.setAttribute('data-ubits-component', 'FileUpload');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '800px';

		// Crear contenedor para el file upload
		const fileUploadContainer = document.createElement('div');
		fileUploadContainer.id = 'fileupload-implementation-container';
		fileUploadContainer.style.width = '100%';
		container.appendChild(fileUploadContainer);

		// Crear file upload
		const fileUploadInstance = createFileUpload({
			...args,
			containerId: fileUploadContainer.id,
		});

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		state: 'default',
		files: [],
		maxFiles: 6,
		maxSize: 5242880,
		dropText: 'Arrastra tus archivos aquí',
		selectButtonText: 'Seleccionar archivos',
		showIcon: false,
		showFileSize: true,
		showProgress: true,
		showActions: true,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '800px';

		const fileUploadContainer = document.createElement('div');
		fileUploadContainer.id = 'fileupload-container';
		fileUploadContainer.style.width = '100%';
		container.appendChild(fileUploadContainer);

		const fileUploadInstance = createFileUpload({
			...args,
			containerId: fileUploadContainer.id,
		});

		return container;
	},
};
