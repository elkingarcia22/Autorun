import type { Meta, StoryObj } from '@storybook/html';
// TODO: DataTable3Provider no existe aún, comentado temporalmente
// import { createDataTable3 } from '../../packages/addons/data-table-3/src/DataTable3Provider';
// import type { DataTable3Options } from '../../packages/addons/data-table-3/src/types/DataTable3Options';

// Tipo temporal para que compile
type DataTable3Options = {
  columnReorderable?: boolean;
  rowReorderable?: boolean;
};

const meta: Meta<DataTable3Options> = {
  title: 'Components/Data Table 3',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tabla de datos con columnas separadas para drag handle, expand icon y checkbox.'
      }
    }
  },
  argTypes: {
    columnReorderable: {
      control: 'boolean',
      description: 'Permite reordenar columnas mediante drag & drop'
    },
    rowReorderable: {
      control: 'boolean',
      description: 'Permite reordenar filas mediante drag & drop'
    }
  }
};

export default meta;
type Story = StoryObj<DataTable3Options>;

export const Default: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.id = 'data-table-3-story-container';
    
    const options: DataTable3Options = {
      containerId: 'data-table-3-story-container',
      columns: [
        { id: 'nombre', title: 'Nombre', visible: true },
        { id: 'email', title: 'Email', visible: true },
        { id: 'estado', title: 'Estado', visible: true }
      ],
      rows: [
        {
          id: 1,
          data: { nombre: 'Juan Pérez', email: 'juan@example.com', estado: 'Activo' },
          selected: false,
          expanded: false
        },
        {
          id: 2,
          data: { nombre: 'María García', email: 'maria@example.com', estado: 'Inactivo' },
          selected: false,
          expanded: false
        },
        {
          id: 3,
          data: { nombre: 'Carlos López', email: 'carlos@example.com', estado: 'Activo' },
          selected: false,
          expanded: false,
          renderExpandedContent: (data) => `
            <div style="padding: 16px;">
              <p><strong>Información adicional:</strong></p>
              <p>Email: ${data.email}</p>
              <p>Estado: ${data.estado}</p>
            </div>
          `
        }
      ],
      columnReorderable: args.columnReorderable ?? true,
      rowReorderable: args.rowReorderable ?? true,
      onRowSelect: (rowId, selected) => {
        console.log('Row selected:', rowId, selected);
      },
      onSelectAll: (selected) => {
        console.log('Select all:', selected);
      },
      onRowExpand: (rowId, expanded) => {
        console.log('Row expanded:', rowId, expanded);
      },
      onColumnReorder: (columnIds) => {
        console.log('Columns reordered:', columnIds);
      },
      onRowReorder: (rowIds) => {
        console.log('Rows reordered:', rowIds);
      }
    };

    // TODO: Implementar cuando DataTable3Provider esté disponible
    // setTimeout(() => {
    //   createDataTable3(options);
    // }, 100);
    
    container.innerHTML = '<p style="padding: 24px; color: var(--ubits-fg-1-medium);">DataTable3 está en desarrollo. El componente estará disponible pronto.</p>';

    return container;
  },
  args: {
    columnReorderable: true,
    rowReorderable: true
  }
};

