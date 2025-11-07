import type { Meta, StoryObj } from '@storybook/html';
import { createDataTable } from '../../addons/data-table/src/DataTableProvider';
import type { DataTableOptions, TableColumn, TableRow } from '../../addons/data-table/src/types/DataTableOptions';

const meta: Meta<DataTableOptions & { columnsCount?: number }> = {
  title: 'Components/Data Table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas.',
      },
    },
  },
  argTypes: {
    columnReorderable: {
      control: 'boolean',
      description: 'Permite reordenar columnas mediante drag & drop',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    rowReorderable: {
      control: 'boolean',
      description: 'Permite reordenar filas mediante drag & drop',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    rowExpandable: {
      control: 'boolean',
      description: 'Muestra el icono de expandir/colapsar en las filas',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    columnSortable: {
      control: 'boolean',
      description: 'Muestra botones de ordenamiento en los headers de las columnas',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Muestra la columna de checkbox para selección múltiple',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showVerticalScrollbar: {
      control: 'boolean',
      description: 'Muestra scrollbar vertical',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showHorizontalScrollbar: {
      control: 'boolean',
      description: 'Muestra scrollbar horizontal',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showColumnMenu: {
      control: 'boolean',
      description: 'Muestra el botón de menú en los headers de las columnas',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    columnsCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de columnas de datos a mostrar (excluyendo checkbox)',
      table: {
        defaultValue: { summary: '4' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DataTableOptions & { columnsCount?: number }>;

export const Default: Story = {
  render: (args) => {
    // Contenedor principal con estilos UBITS
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '100%';
    
    // Contenedor para la tabla
    const tableContainer = document.createElement('div');
    tableContainer.id = 'data-table-story-container';
    tableContainer.style.width = '100%';
    tableContainer.style.overflow = 'auto';
    
    // Generar columnas dinámicamente según columnsCount
    const columnsCount = args.columnsCount ?? 4;
    const allColumns: TableColumn[] = [
      { id: 'nombre', title: 'Nombre', type: 'nombre', visible: true, width: 200 },
      { id: 'email', title: 'Email', type: 'correo', visible: true, width: 250 },
      { id: 'estado', title: 'Estado', type: 'estado', visible: true, width: 150 },
      { id: 'progreso', title: 'Progreso', type: 'progreso', visible: true, width: 180 },
      { id: 'telefono', title: 'Teléfono', type: 'nombre', visible: true, width: 150 },
      { id: 'ciudad', title: 'Ciudad', type: 'nombre', visible: true, width: 150 },
      { id: 'pais', title: 'País', type: 'pais', visible: true, width: 150 },
      { id: 'fecha', title: 'Fecha', type: 'fecha', visible: true, width: 150 },
      { id: 'categoria', title: 'Categoría', type: 'nombre', visible: true, width: 150 },
      { id: 'prioridad', title: 'Prioridad', type: 'estado', visible: true, width: 150 },
    ];
    
    // Seleccionar solo las columnas necesarias según columnsCount
    const columns: TableColumn[] = allColumns.slice(0, columnsCount);
    
    const rows: TableRow[] = [
      {
        id: 1,
        data: {
          nombre: 'Juan Pérez',
          email: 'juan.perez@empresa.com',
          estado: 'Activo',
          progreso: 75,
          telefono: '+57 300 123 4567',
          ciudad: 'Bogotá',
          pais: 'Colombia',
          fecha: '2024-01-15',
          categoria: 'Desarrollo',
          prioridad: 'Alta',
          'checkbox-2': false,
        },
        expanded: false,
        renderExpandedContent: (data) => `
          <div style="padding: 16px;">
            <p><strong>Información adicional:</strong></p>
            <p>Email: ${data.email}</p>
            <p>Estado: ${data.estado}</p>
            <p>Progreso: ${data.progreso}%</p>
          </div>
        `,
      },
      {
        id: 2,
        data: {
          nombre: 'María García',
          email: 'maria.garcia@empresa.com',
          estado: 'Inactivo',
          progreso: 45,
          telefono: '+57 301 234 5678',
          ciudad: 'Medellín',
          pais: 'Colombia',
          fecha: '2024-02-20',
          categoria: 'Diseño',
          prioridad: 'Media',
          'checkbox-2': true,
        },
        expanded: false,
      },
      {
        id: 3,
        data: {
          nombre: 'Carlos López',
          email: 'carlos.lopez@empresa.com',
          estado: 'Activo',
          progreso: 90,
          telefono: '+57 302 345 6789',
          ciudad: 'Cali',
          pais: 'Colombia',
          fecha: '2024-03-10',
          categoria: 'Marketing',
          prioridad: 'Baja',
          'checkbox-2': false,
        },
        expanded: false,
        renderExpandedContent: (data) => `
          <div style="padding: 16px;">
            <p><strong>Detalles del usuario:</strong></p>
            <p>Email: ${data.email}</p>
            <p>Estado: ${data.estado}</p>
            <p>Progreso: ${data.progreso}%</p>
          </div>
        `,
      },
      {
        id: 4,
        data: {
          nombre: 'Ana Martínez',
          email: 'ana.martinez@empresa.com',
          estado: 'Pendiente',
          progreso: 30,
          telefono: '+57 303 456 7890',
          ciudad: 'Barranquilla',
          pais: 'Colombia',
          fecha: '2024-04-05',
          categoria: 'Ventas',
          prioridad: 'Alta',
          'checkbox-2': true,
        },
        expanded: false,
      },
      {
        id: 5,
        data: {
          nombre: 'Pedro Sánchez',
          email: 'pedro.sanchez@empresa.com',
          estado: 'Activo',
          progreso: 100,
          telefono: '+57 304 567 8901',
          ciudad: 'Cartagena',
          pais: 'Colombia',
          fecha: '2024-05-12',
          categoria: 'Soporte',
          prioridad: 'Media',
          'checkbox-2': false,
        },
        expanded: false,
      },
    ];
    
    const options: DataTableOptions = {
      containerId: 'data-table-story-container',
      columns,
      rows,
      columnReorderable: args.columnReorderable ?? false,
      rowReorderable: args.rowReorderable ?? false,
      rowExpandable: args.rowExpandable ?? true,
      columnSortable: args.columnSortable ?? true,
      showCheckbox: args.showCheckbox ?? true,
      showVerticalScrollbar: args.showVerticalScrollbar ?? false,
      showHorizontalScrollbar: args.showHorizontalScrollbar ?? false,
      showColumnMenu: args.showColumnMenu ?? true,
      onRowExpand: (rowId, expanded) => {
        console.log('Row expanded:', rowId, expanded);
      },
      onColumnReorder: (columnIds) => {
        console.log('Columns reordered:', columnIds);
      },
      onRowReorder: (rowIds) => {
        console.log('Rows reordered:', rowIds);
      },
      onSort: (columnId, direction) => {
        console.log('Column sorted:', columnId, direction);
      },
      onColumnPin: (columnId, pinned) => {
        console.log('Column pinned:', columnId, pinned);
      },
    };

    // Agregar el contenedor de la tabla al contenedor principal
    container.appendChild(tableContainer);

    // Inicializar la tabla después de que se monte en el DOM
    setTimeout(() => {
      try {
        createDataTable(options);
      } catch (error) {
        console.error('Error creating data table:', error);
      }
    }, 100);

    return container;
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: true,
    columnSortable: true,
    showCheckbox: true,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: true,
    columnsCount: 4,
  },
};

