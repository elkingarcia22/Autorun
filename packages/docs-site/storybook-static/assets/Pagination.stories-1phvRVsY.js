import{c as s}from"./PaginationProvider-Baho4EoP.js";import"./ButtonProvider-CWHxZvq1.js";import"./ListProvider-DvH0c9YJ.js";import"./iframe-BfFsla13.js";import"./preload-helper-PPVm8Dsz.js";import"./SpinnerProvider-o6XHV06V.js";const g={title:"Components/Pagination",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Pagination UBITS para paginación de datos usando tokens UBITS, tipografía UBITS y componentes UBITS. Ideal para tablas y listas de datos."}}},argTypes:{currentPage:{control:{type:"number",min:1,max:100},description:"Página actual (1-indexed)",table:{defaultValue:{summary:"1"}}},totalPages:{control:{type:"number",min:1,max:100},description:"Total de páginas",table:{defaultValue:{summary:"10"}}},totalItems:{control:{type:"number",min:0},description:"Total de items (para mostrar información)",table:{defaultValue:{summary:"undefined"}}},itemsPerPage:{control:{type:"number",min:1},description:"Items por página",table:{defaultValue:{summary:"undefined"}}},variant:{control:{type:"select"},options:["default","compact","minimal"],description:"Variante visual del paginador",table:{defaultValue:{summary:"default"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del paginador",table:{defaultValue:{summary:"md"}}},maxVisiblePages:{control:{type:"number",min:3,max:15},description:"Número máximo de páginas visibles",table:{defaultValue:{summary:"7"}}},showFirst:{control:"boolean",description:'Mostrar botón "Primera página"',table:{defaultValue:{summary:"true"}}},showLast:{control:"boolean",description:'Mostrar botón "Última página"',table:{defaultValue:{summary:"true"}}},showPrevNext:{control:"boolean",description:"Mostrar botones anterior/siguiente",table:{defaultValue:{summary:"true"}}},showInfo:{control:"boolean",description:'Mostrar información de items (ej: "1-10 de 100")',table:{defaultValue:{summary:"false"}}},showItemsPerPage:{control:"boolean",description:"Mostrar selector de items por página",table:{defaultValue:{summary:"false"}}}}},a={render:o=>{const n=`pagination-${Date.now()}`,e=document.createElement("div");e.id=n,e.style.width="100%",e.style.padding="20px",e.style.display="flex",e.style.justifyContent="center";const i={...o,containerId:n,onPageChange:t=>{console.log("Página cambiada a:",t);const r={...o,currentPage:t,containerId:n};s(r)},onItemsPerPageChange:t=>{console.log("Items por página cambiados a:",t);const r={...o,itemsPerPage:t,currentPage:1,containerId:n};s(r)}};return setTimeout(()=>{s(i)},0),e},args:{currentPage:5,totalPages:20,totalItems:200,itemsPerPage:10,variant:"default",size:"md",maxVisiblePages:7,showFirst:!0,showLast:!0,showPrevNext:!0,showInfo:!0,showItemsPerPage:!0,itemsPerPageOptions:[10,20,50,100]}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => {
    const containerId = \`pagination-\${Date.now()}\`;
    const container = document.createElement('div');
    container.id = containerId;
    container.style.width = '100%';
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    const options: PaginationOptions = {
      ...args,
      containerId,
      onPageChange: page => {
        console.log('Página cambiada a:', page);
        // Actualizar el componente
        const newOptions = {
          ...args,
          currentPage: page,
          containerId
        };
        createPagination(newOptions);
      },
      onItemsPerPageChange: itemsPerPage => {
        console.log('Items por página cambiados a:', itemsPerPage);
        const newOptions = {
          ...args,
          itemsPerPage,
          currentPage: 1,
          containerId
        };
        createPagination(newOptions);
      }
    };
    setTimeout(() => {
      createPagination(options);
    }, 0);
    return container;
  },
  args: {
    currentPage: 5,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...a.parameters?.docs?.source}}};const P=["Default"];export{a as Default,P as __namedExportsOrder,g as default};
