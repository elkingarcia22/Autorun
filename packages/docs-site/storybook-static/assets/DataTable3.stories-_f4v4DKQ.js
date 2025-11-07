const a={title:"Components/Data Table 3",tags:["autodocs"],parameters:{docs:{description:{component:"Tabla de datos con columnas separadas para drag handle, expand icon y checkbox."}}},argTypes:{columnReorderable:{control:"boolean",description:"Permite reordenar columnas mediante drag & drop"},rowReorderable:{control:"boolean",description:"Permite reordenar filas mediante drag & drop"}}},e={render:o=>{const n=document.createElement("div");return n.id="data-table-3-story-container",o.columnReorderable,o.rowReorderable,n.innerHTML='<p style="padding: 24px; color: var(--ubits-fg-1-medium);">DataTable3 está en desarrollo. El componente estará disponible pronto.</p>',n},args:{columnReorderable:!0,rowReorderable:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const container = document.createElement('div');
    container.id = 'data-table-3-story-container';
    const options: DataTable3Options = {
      containerId: 'data-table-3-story-container',
      columns: [{
        id: 'nombre',
        title: 'Nombre',
        visible: true
      }, {
        id: 'email',
        title: 'Email',
        visible: true
      }, {
        id: 'estado',
        title: 'Estado',
        visible: true
      }],
      rows: [{
        id: 1,
        data: {
          nombre: 'Juan Pérez',
          email: 'juan@example.com',
          estado: 'Activo'
        },
        selected: false,
        expanded: false
      }, {
        id: 2,
        data: {
          nombre: 'María García',
          email: 'maria@example.com',
          estado: 'Inactivo'
        },
        selected: false,
        expanded: false
      }, {
        id: 3,
        data: {
          nombre: 'Carlos López',
          email: 'carlos@example.com',
          estado: 'Activo'
        },
        selected: false,
        expanded: false,
        renderExpandedContent: data => \`
            <div style="padding: 16px;">
              <p><strong>Información adicional:</strong></p>
              <p>Email: \${data.email}</p>
              <p>Estado: \${data.estado}</p>
            </div>
          \`
      }],
      columnReorderable: args.columnReorderable ?? true,
      rowReorderable: args.rowReorderable ?? true,
      onRowSelect: (rowId, selected) => {
        console.log('Row selected:', rowId, selected);
      },
      onSelectAll: selected => {
        console.log('Select all:', selected);
      },
      onRowExpand: (rowId, expanded) => {
        console.log('Row expanded:', rowId, expanded);
      },
      onColumnReorder: columnIds => {
        console.log('Columns reordered:', columnIds);
      },
      onRowReorder: rowIds => {
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
}`,...e.parameters?.docs?.source}}};const r=["Default"];export{e as Default,r as __namedExportsOrder,a as default};
