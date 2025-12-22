/**
 * DataTable Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createDataTable } from '../../../../components/data-table/src/DataTableProvider';
import type {
	DataTableOptions,
	TableColumn,
	TableRow,
} from '../../../../components/data-table/src/types/DataTableOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/data-table/src/styles/data-table.css';
import '../../../../components/button/src/styles/button.css';
import '../../../../components/input/src/styles/input.css';
import '../../../../components/checkbox/src/styles/checkbox.css';
import '../../../../components/radio-button/src/styles/radio-button.css';
import '../../../../components/toggle/src/styles/toggle.css';
import '../../../../components/pagination/src/styles/pagination.css';

const meta: Meta<DataTableOptions> = {
	title: 'Data/Data Table',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-data-table',
			api: {
				create: 'window.UBITS.DataTable.create',
				tag: '<ubits-data-table>',
			},
			dependsOn: {
				required: [
					'🧩-ux-button', // Header buttons y acciones
					'🧩-ux-input', // Search input (opcional pero común)
				],
				optional: [
					'🧩-ux-checkbox', // Selección múltiple
					'🧩-ux-radio-button', // Columnas de tipo radio
					'🧩-ux-toggle', // Columnas de tipo toggle
					'🧩-ux-pagination', // Paginación
					'🧩-ux-progress', // Columnas de tipo progreso
					'🧩-ux-status-tag', // Columnas de tipo estado
					'🧩-ux-avatar', // Columnas de tipo nombre-avatar
					'🧩-ux-badge', // Badges
					'🧩-ux-list', // Menús
					'🧩-ux-drawer', // Menú de columnas
					'🧩-ux-empty-state', // Estado vacío
				],
			},
			internals: [
				'⚙️-functional-scroll', // Scrollbar interno
				'⚙️-functional-drag-handle', // Drag handle para reordenar
			],
			slots: {
				header: ['🧩-ux-button', '🧩-ux-input'], // Header buttons y search
				body: [], // Body es interno
				footer: ['🧩-ux-pagination'], // Paginación (opcional)
			},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['columns', 'rows'],
			},
		}),
	},
	args: {
		columns: [
			{
				id: 'nombre',
				title: 'Nombre',
				type: 'nombre',
			},
			{
				id: 'email',
				title: 'Email',
				type: 'correo',
			},
			{
				id: 'estado',
				title: 'Estado',
				type: 'estado',
			},
		],
		rows: [
			{
				id: '1',
				data: {
					nombre: 'Juan Pérez',
					email: 'juan@example.com',
					estado: 'Activo',
				},
			},
			{
				id: '2',
				data: {
					nombre: 'María García',
					email: 'maria@example.com',
					estado: 'Inactivo',
				},
			},
		],
		showCheckbox: true,
		columnSortable: true,
		rowExpandable: false,
		columnReorderable: false,
		rowReorderable: false,
	},
	argTypes: {
		columns: {
			control: { type: 'object' },
			description: 'Array de columnas de la tabla (requerido).',
			table: {
				type: { summary: 'TableColumn[]' },
				category: 'Configuración',
			},
		},
		rows: {
			control: { type: 'object' },
			description: 'Array de filas de la tabla (requerido).',
			table: {
				type: { summary: 'TableRow[]' },
				category: 'Configuración',
			},
		},
		showCheckbox: {
			control: { type: 'boolean' },
			description: 'Muestra la columna de checkbox para selección múltiple',
			table: {
				defaultValue: { summary: 'true' },
				category: 'Columnas',
			},
		},
		columnSortable: {
			control: { type: 'boolean' },
			description: 'Muestra botones de ordenamiento en los headers',
			table: {
				defaultValue: { summary: 'true' },
				category: 'Funcionalidad',
			},
		},
		rowExpandable: {
			control: { type: 'boolean' },
			description: 'Muestra el icono de expandir/colapsar en las filas',
			table: {
				defaultValue: { summary: 'true' },
				category: 'Funcionalidad',
			},
		},
		columnReorderable: {
			control: { type: 'boolean' },
			description: 'Permite reordenar columnas mediante drag & drop',
			table: {
				defaultValue: { summary: 'true' },
				category: 'Funcionalidad',
			},
		},
		rowReorderable: {
			control: { type: 'boolean' },
			description: 'Permite reordenar filas mediante drag & drop',
			table: {
				defaultValue: { summary: 'true' },
				category: 'Funcionalidad',
			},
		},
		showColumnMenu: {
			control: { type: 'boolean' },
			description: 'Muestra el botón de menú en los headers',
			table: {
				defaultValue: { summary: 'true' },
				category: 'Funcionalidad',
			},
		},
		showContextMenu: {
			control: { type: 'boolean' },
			description: 'Muestra el menú contextual (click derecho) en las filas',
			table: {
				defaultValue: { summary: 'true' },
				category: 'Funcionalidad',
			},
		},
	},
};

export default meta;
type Story = StoryObj<DataTableOptions>;

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
		containerId: 'datatable-implementation-container',
		columns: [
			{
				id: 'nombre',
				title: 'Nombre',
				type: 'nombre',
			},
			{
				id: 'email',
				title: 'Email',
				type: 'correo',
			},
			{
				id: 'estado',
				title: 'Estado',
				type: 'estado',
			},
		],
		rows: [
			{
				id: '1',
				data: {
					nombre: 'Juan Pérez',
					email: 'juan@example.com',
					estado: 'Activo',
				},
			},
			{
				id: '2',
				data: {
					nombre: 'María García',
					email: 'maria@example.com',
					estado: 'Inactivo',
				},
			},
		],
		showCheckbox: true,
		columnSortable: true,
		rowExpandable: false,
		columnReorderable: false,
		rowReorderable: false,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="datatable-implementation-container"></div>

// 2. Crear DataTable
window.UBITS.DataTable.create({
  containerId: 'datatable-implementation-container',
  columns: [
    {
      id: 'nombre',
      title: 'Nombre',
      type: 'nombre'
    },
    {
      id: 'email',
      title: 'Email',
      type: 'correo'
    },
    {
      id: 'estado',
      title: 'Estado',
      type: 'estado'
    }
  ],
  rows: [
    {
      id: '1',
      data: {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        estado: 'Activo'
      }
    },
    {
      id: '2',
      data: {
        nombre: 'María García',
        email: 'maria@example.com',
        estado: 'Inactivo'
      }
    }
  ],
  showCheckbox: true,
  columnSortable: true,
  rowExpandable: false,
  columnReorderable: false,
  rowReorderable: false
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-data-table');
		container.setAttribute('data-ubits-component', 'DataTable');
		container.style.width = '100%';
		container.style.height = '600px';
		container.style.padding = '20px';

		// Crear contenedor para la tabla
		const tableContainer = document.createElement('div');
		tableContainer.id = args.containerId || 'datatable-implementation-container';
		tableContainer.style.width = '100%';
		tableContainer.style.height = '100%';
		container.appendChild(tableContainer);

		// Asegurar que el contenedor esté en el DOM antes de crear la tabla
		// Storybook inserta el elemento en el DOM después de que render() retorna
		// Usar requestAnimationFrame doble + setTimeout como fallback para asegurar que el elemento esté en el DOM
		let tableCreated = false;
		
		const createTable = () => {
			if (tableCreated) return;
			const foundContainer = document.getElementById(tableContainer.id);
			if (foundContainer && foundContainer.parentElement) {
				tableCreated = true;
				try {
					const tableInstance = createDataTable({
						...args,
						containerId: tableContainer.id,
					});
				} catch (error) {
					console.error('Error creating DataTable:', error);
					tableCreated = false;
				}
			}
		};

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				createTable();
			});
		});

		// Fallback con setTimeout por si requestAnimationFrame no es suficiente
		setTimeout(() => {
			createTable();
		}, 100);

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		columns: [
			{
				id: 'nombre',
				title: 'Nombre',
				type: 'nombre',
			},
			{
				id: 'email',
				title: 'Email',
				type: 'correo',
			},
			{
				id: 'estado',
				title: 'Estado',
				type: 'estado',
			},
		],
		rows: [
			{
				id: '1',
				data: {
					nombre: 'Juan Pérez',
					email: 'juan@example.com',
					estado: 'Activo',
				},
			},
			{
				id: '2',
				data: {
					nombre: 'María García',
					email: 'maria@example.com',
					estado: 'Inactivo',
				},
			},
		],
		showCheckbox: true,
		columnSortable: true,
		rowExpandable: false,
		columnReorderable: false,
		rowReorderable: false,
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.width = '100%';
		container.style.height = '600px';
		container.style.padding = '20px';

		const tableContainer = document.createElement('div');
		tableContainer.id = args.containerId || 'datatable-container';
		tableContainer.style.width = '100%';
		tableContainer.style.height = '100%';
		container.appendChild(tableContainer);

		// Asegurar que el contenedor esté en el DOM antes de crear la tabla
		// Storybook inserta el elemento en el DOM después de que render() retorna
		// Usar requestAnimationFrame doble + setTimeout como fallback para asegurar que el elemento esté en el DOM
		let tableCreated = false;
		
		const createTable = () => {
			if (tableCreated) return;
			const foundContainer = document.getElementById(tableContainer.id);
			if (foundContainer && foundContainer.parentElement) {
				tableCreated = true;
				try {
					const tableInstance = createDataTable({
						...args,
						containerId: tableContainer.id,
					});
				} catch (error) {
					console.error('Error creating DataTable:', error);
					tableCreated = false;
				}
			}
		};

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				createTable();
			});
		});

		// Fallback con setTimeout por si requestAnimationFrame no es suficiente
		setTimeout(() => {
			createTable();
		}, 100);

		return container;
	},
};
