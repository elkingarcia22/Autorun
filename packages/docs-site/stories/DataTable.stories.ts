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
    columnType1: {
      control: { type: 'select' },
      options: ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'progreso', 'estado', 'radio', 'toggle', 'checkbox', 'correo', 'fecha', 'pais', 'ciudad'],
      description: 'Tipo de columna 1 (Nombre)',
      table: {
        defaultValue: { summary: 'nombre-avatar' },
      },
    },
    columnType2: {
      control: { type: 'select' },
      options: ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'progreso', 'estado', 'radio', 'toggle', 'checkbox', 'correo', 'fecha', 'pais', 'ciudad'],
      description: 'Tipo de columna 2 (Email)',
      table: {
        defaultValue: { summary: 'correo' },
      },
    },
    columnType3: {
      control: { type: 'select' },
      options: ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'progreso', 'estado', 'radio', 'toggle', 'checkbox', 'correo', 'fecha', 'pais', 'ciudad'],
      description: 'Tipo de columna 3 (Estado)',
      table: {
        defaultValue: { summary: 'estado' },
      },
    },
    columnType4: {
      control: { type: 'select' },
      options: ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'progreso', 'estado', 'radio', 'toggle', 'checkbox', 'correo', 'fecha', 'pais', 'ciudad'],
      description: 'Tipo de columna 4 (Progreso)',
      table: {
        defaultValue: { summary: 'progreso' },
      },
    },
    // Controles para columna 1 (Nombre)
    column1AvatarVariant: {
      control: { type: 'select' },
      options: ['photo', 'initials', 'icon'],
      description: 'Variante de avatar para columna 1 (solo si es nombre-avatar o nombre-avatar-texto)',
      table: {
        defaultValue: { summary: 'initials' },
      },
    },
    column1Editable: {
      control: 'boolean',
      description: 'Hacer editable la columna 1 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    // Controles para columna 2 (Email)
    column2EmailClickable: {
      control: 'boolean',
      description: 'Hacer el email clicable en columna 2 (solo si es correo)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    // Controles para columna 3 (Estado)
    column3Editable: {
      control: 'boolean',
      description: 'Hacer editable la columna 3 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    // Controles para columna 4 (Progreso) - no tiene controles adicionales
  },
};

export default meta;
type Story = StoryObj<DataTableOptions & { 
  columnsCount?: number;
  columnType1?: string;
  columnType2?: string;
  columnType3?: string;
  columnType4?: string;
  column1AvatarVariant?: 'photo' | 'initials' | 'icon';
  column1Editable?: boolean;
  column2EmailClickable?: boolean;
  column3Editable?: boolean;
}>;

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
    
    // Tipos de columna disponibles (pueden ser controlados desde Storybook)
    const columnType1 = (args as any).columnType1 || 'nombre-avatar';
    const columnType2 = (args as any).columnType2 || 'correo';
    const columnType3 = (args as any).columnType3 || 'estado';
    const columnType4 = (args as any).columnType4 || 'progreso';
    const columnType5 = (args as any).columnType5 || 'nombre';
    const columnType6 = (args as any).columnType6 || 'nombre';
    const columnType7 = (args as any).columnType7 || 'pais';
    const columnType8 = (args as any).columnType8 || 'fecha';
    const columnType9 = (args as any).columnType9 || 'nombre';
    const columnType10 = (args as any).columnType10 || 'estado';
    
    // Controles adicionales para columnas
    const column1AvatarVariant = (args as any).column1AvatarVariant || 'initials';
    const column1Editable = (args as any).column1Editable || false;
    const column2EmailClickable = (args as any).column2EmailClickable !== undefined ? (args as any).column2EmailClickable : true;
    const column3Editable = (args as any).column3Editable || false;
    
    // Construir columnas con sus controles
    const col1: TableColumn = {
      id: 'nombre',
      title: 'Nombre',
      type: columnType1 as any,
      visible: true,
      width: 200,
    };
    
    // Agregar avatarVariant solo si el tipo es nombre-avatar o nombre-avatar-texto
    if (columnType1 === 'nombre-avatar' || columnType1 === 'nombre-avatar-texto') {
      col1.avatarVariant = column1AvatarVariant as 'photo' | 'initials' | 'icon';
    }
    
    // Agregar editable solo si el tipo lo permite
    const editableTypes1 = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
    if (editableTypes1.includes(columnType1)) {
      col1.editable = column1Editable;
    }
    
    const col2: TableColumn = {
      id: 'email',
      title: 'Email',
      type: columnType2 as any,
      visible: true,
      width: 250,
    };
    
    // Agregar emailClickable solo si el tipo es correo
    if (columnType2 === 'correo') {
      col2.emailClickable = column2EmailClickable;
    }
    
    const col3: TableColumn = {
      id: 'estado',
      title: 'Estado',
      type: columnType3 as any,
      visible: true,
      width: 150,
    };
    
    // Agregar editable solo si el tipo lo permite
    const editableTypes3 = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
    if (editableTypes3.includes(columnType3)) {
      col3.editable = column3Editable;
    }
    
    const allColumns: TableColumn[] = [
      col1,
      col2,
      col3,
      { id: 'progreso', title: 'Progreso', type: columnType4 as any, visible: true, width: 180 },
      { id: 'telefono', title: 'Teléfono', type: columnType5 as any, visible: true, width: 150 },
      { id: 'ciudad', title: 'Ciudad', type: columnType6 as any, visible: true, width: 150 },
      { id: 'pais', title: 'País', type: columnType7 as any, visible: true, width: 150 },
      { id: 'fecha', title: 'Fecha', type: columnType8 as any, visible: true, width: 150 },
      { id: 'categoria', title: 'Categoría', type: columnType9 as any, visible: true, width: 150 },
      { id: 'prioridad', title: 'Prioridad', type: columnType10 as any, visible: true, width: 150 },
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
          avatar: { initials: 'JP', badgeColor: 'green', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
        renderExpandedContent: (data) => `
          <div style="padding: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Información adicional</h4>
            <p style="margin: 0; font-size: 13px; color: var(--ubits-body-md-regular-2, #6b7280);">
              Detalles adicionales para ${data.nombre}
            </p>
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
          avatar: { initials: 'MG', badgeColor: 'blue', imageUrl: '../assets/images/Profile-image.jpg' },
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
          avatar: { initials: 'CL', badgeColor: 'orange', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
        renderExpandedContent: (data) => `
          <div style="padding: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Información adicional</h4>
            <p style="margin: 0; font-size: 13px; color: var(--ubits-body-md-regular-2, #6b7280);">
              Detalles adicionales para ${data.nombre}
            </p>
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
          avatar: { initials: 'AM', badgeColor: 'purple', imageUrl: '../assets/images/Profile-image.jpg' },
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
          avatar: { initials: 'PS', badgeColor: 'blue', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 6,
        data: {
          nombre: 'Patricia Rodríguez',
          email: 'patricia.rodriguez@empresa.com',
          estado: 'Activo',
          progreso: 60,
          telefono: '+57 305 678 9012',
          ciudad: 'Bucaramanga',
          pais: 'Colombia',
          fecha: '2024-06-18',
          categoria: 'Recursos Humanos',
          prioridad: 'Baja',
          'checkbox-2': true,
          avatar: { initials: 'PR', badgeColor: 'blue', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 7,
        data: {
          nombre: 'Roberto Silva',
          email: 'roberto.silva@empresa.com',
          estado: 'Inactivo',
          progreso: 25,
          telefono: '+57 306 789 0123',
          ciudad: 'Pereira',
          pais: 'Colombia',
          fecha: '2024-07-22',
          categoria: 'Finanzas',
          prioridad: 'Alta',
          'checkbox-2': false,
          avatar: { initials: 'RS', badgeColor: 'orange', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 8,
        data: {
          nombre: 'Carmen Vargas',
          email: 'carmen.vargas@empresa.com',
          estado: 'Activo',
          progreso: 85,
          telefono: '+57 307 890 1234',
          ciudad: 'Santa Marta',
          pais: 'Colombia',
          fecha: '2024-08-05',
          categoria: 'Operaciones',
          prioridad: 'Media',
          'checkbox-2': true,
          avatar: { initials: 'CV', badgeColor: 'pink', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 9,
        data: {
          nombre: 'Diego Morales',
          email: 'diego.morales@empresa.com',
          estado: 'Pendiente',
          progreso: 50,
          telefono: '+57 308 901 2345',
          ciudad: 'Manizales',
          pais: 'Colombia',
          fecha: '2024-09-10',
          categoria: 'Tecnología',
          prioridad: 'Baja',
          'checkbox-2': false,
          avatar: { initials: 'DM', badgeColor: 'blue', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 10,
        data: {
          nombre: 'Daniela Herrera',
          email: 'daniela.herrera@empresa.com',
          estado: 'Activo',
          progreso: 95,
          telefono: '+57 309 012 3456',
          ciudad: 'Armenia',
          pais: 'Colombia',
          fecha: '2024-10-15',
          categoria: 'Innovación',
          prioridad: 'Alta',
          'checkbox-2': true,
          avatar: { initials: 'DH', badgeColor: 'purple', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 11,
        data: {
          nombre: 'Andrés Castro',
          email: 'andres.castro@empresa.com',
          estado: 'Activo',
          progreso: 70,
          telefono: '+57 310 123 4567',
          ciudad: 'Villavicencio',
          pais: 'Colombia',
          fecha: '2024-11-20',
          categoria: 'Logística',
          prioridad: 'Media',
          'checkbox-2': false,
          avatar: { initials: 'AC', badgeColor: 'green', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 12,
        data: {
          nombre: 'Valentina Rojas',
          email: 'valentina.rojas@empresa.com',
          estado: 'Inactivo',
          progreso: 40,
          telefono: '+57 311 234 5678',
          ciudad: 'Ibagué',
          pais: 'Colombia',
          fecha: '2024-12-25',
          categoria: 'Calidad',
          prioridad: 'Baja',
          'checkbox-2': true,
          avatar: { initials: 'VR', badgeColor: 'orange', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 13,
        data: {
          nombre: 'Fernando Gutiérrez',
          email: 'fernando.gutierrez@empresa.com',
          estado: 'Activo',
          progreso: 80,
          telefono: '+57 312 345 6789',
          ciudad: 'Pasto',
          pais: 'Colombia',
          fecha: '2025-01-08',
          categoria: 'Investigación',
          prioridad: 'Alta',
          'checkbox-2': false,
          avatar: { initials: 'FG', badgeColor: 'green', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 14,
        data: {
          nombre: 'Isabella Ramírez',
          email: 'isabella.ramirez@empresa.com',
          estado: 'Pendiente',
          progreso: 55,
          telefono: '+57 313 456 7890',
          ciudad: 'Tunja',
          pais: 'Colombia',
          fecha: '2025-02-12',
          categoria: 'Comunicaciones',
          prioridad: 'Media',
          'checkbox-2': true,
          avatar: { initials: 'IR', badgeColor: 'purple', imageUrl: '../assets/images/Profile-image.jpg' },
        },
        expanded: false,
      },
      {
        id: 15,
        data: {
          nombre: 'Sebastián Torres',
          email: 'sebastian.torres@empresa.com',
          estado: 'Activo',
          progreso: 65,
          telefono: '+57 314 567 8901',
          ciudad: 'Neiva',
          pais: 'Colombia',
          fecha: '2025-03-18',
          categoria: 'Estrategia',
          prioridad: 'Baja',
          'checkbox-2': false,
          avatar: { initials: 'ST', badgeColor: 'blue', imageUrl: '../assets/images/Profile-image.jpg' },
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
    columnType1: 'nombre-avatar',
    columnType2: 'correo',
    columnType3: 'estado',
    columnType4: 'progreso',
    column1AvatarVariant: 'initials',
    column1Editable: false,
    column2EmailClickable: true,
    column3Editable: false,
  },
};

