import{r as o}from"./SpinnerProvider-o6XHV06V.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";const d={title:"Básicos/Spinner",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Spinner/Loader UBITS para mostrar estados de carga. Soporta múltiples tamaños, variantes de color y puede mostrarse con o sin etiqueta."}}},argTypes:{size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Tamaño del spinner",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg | xl"}}},variant:{control:{type:"select"},options:["primary","secondary","success","warning","error","info"],description:"Variante de color del spinner",table:{defaultValue:{summary:"primary"},type:{summary:"primary | secondary | success | warning | error | info"}}},animated:{control:{type:"boolean"},description:"Si el spinner está animado",table:{defaultValue:{summary:"true"}}},label:{control:{type:"text"},description:"Texto a mostrar debajo del spinner (opcional)"},fullScreen:{control:{type:"boolean"},description:"Si el spinner debe ocupar toda la pantalla (centrado)",table:{defaultValue:{summary:"false"}}}}},r={args:{size:"md",variant:"primary",animated:!0,label:"",fullScreen:!1},render:t=>{const n=document.createElement("div");n.style.padding="40px",n.style.background="var(--modifiers-normal-color-light-bg-1)",n.style.borderRadius="8px",n.style.width="100%",n.style.minHeight="300px",n.style.boxSizing="border-box";const e=document.createElement("div");e.style.background="var(--modifiers-normal-color-light-bg-1)",e.style.padding="48px",e.style.borderRadius="8px",e.style.border="none",e.style.marginBottom="24px",e.style.minHeight="200px",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.boxSizing="border-box";const a=o(t);return e.innerHTML=a,n.appendChild(e),n}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    label: '',
    fullScreen: false
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.minHeight = '300px';
    container.style.boxSizing = 'border-box';

    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.border = 'none';
    preview.style.marginBottom = '24px';
    preview.style.minHeight = '200px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';

    // Renderizar el spinner
    const spinnerHTML = renderSpinner(args);
    preview.innerHTML = spinnerHTML;
    container.appendChild(preview);
    return container;
  }
}`,...r.parameters?.docs?.source}}};const p=["Default"];export{r as Default,p as __namedExportsOrder,d as default};
