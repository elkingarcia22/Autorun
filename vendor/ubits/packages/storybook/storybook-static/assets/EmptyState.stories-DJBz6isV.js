import{r as i}from"./EmptyStateProvider-lfUvNYft.js";import"./ButtonProvider-CX_wJeLD.js";import"./ListProvider-Dp4g9_1Y.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";import"./SpinnerProvider-o6XHV06V.js";const u={title:"Feedback/Empty State",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Empty State UBITS para mostrar estados vacíos en la interfaz. Soporta imagen o icono, título, descripción y botones de acción."}}},argTypes:{title:{control:{type:"text"},description:"Título del empty state",table:{type:{summary:"string"},category:"Contenido"}},description:{control:{type:"text"},description:"Descripción o mensaje del empty state",table:{type:{summary:"string"},category:"Contenido"}},imageUrl:{control:{type:"text"},description:"URL de la imagen/ilustración (opcional)",table:{type:{summary:"string"},category:"Visual"}},icon:{control:{type:"text"},description:"Nombre del icono FontAwesome a mostrar (opcional, si no hay imagen)",table:{type:{summary:"string"},category:"Visual"}},actionLabel:{control:{type:"text"},description:"Texto del botón de acción principal (opcional)",table:{type:{summary:"string"},category:"Botón Primario"}},showPrimaryButton:{control:{type:"boolean"},description:"Mostrar botón primario",table:{defaultValue:{summary:"false"},type:{summary:"boolean"},category:"Botón Primario"}},primaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón primario (opcional)",table:{type:{summary:"string"},category:"Botón Primario"}},showPrimaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón primario",table:{defaultValue:{summary:"false"},type:{summary:"boolean"},category:"Botón Primario"}},secondaryActionLabel:{control:{type:"text"},description:"Texto del botón secundario (opcional)",table:{type:{summary:"string"},category:"Botón Secundario"}},showSecondaryButton:{control:{type:"boolean"},description:"Mostrar botón secundario",table:{defaultValue:{summary:"false"},type:{summary:"boolean"},category:"Botón Secundario"}},secondaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón secundario (opcional)",table:{type:{summary:"string"},category:"Botón Secundario"}},showSecondaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón secundario",table:{defaultValue:{summary:"false"},type:{summary:"boolean"},category:"Botón Secundario"}}}},a={args:{title:"No hay resultados",description:"Intenta ajustar tus filtros de búsqueda",icon:"inbox",actionLabel:"Buscar",showPrimaryButton:!1,primaryButtonIcon:"search",showPrimaryButtonIcon:!1,secondaryActionLabel:"Cancelar",showSecondaryButton:!1,secondaryButtonIcon:"times",showSecondaryButtonIcon:!1},render:s=>{const n=document.createElement("div");n.style.padding="40px",n.style.background="var(--modifiers-normal-color-light-bg-1, #ffffff)",n.style.borderRadius="8px",n.style.width="100%",n.style.boxSizing="border-box";const e=document.createElement("div");e.style.background="var(--modifiers-normal-color-light-bg-1)",e.style.padding="48px",e.style.borderRadius="8px",e.style.border="none",e.style.minHeight="400px",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.boxSizing="border-box",e.style.width="100%",e.innerHTML=i(s);const t=e.querySelector(".ubits-empty-state");t&&(t.style.width="100%",t.style.maxWidth="100%",t.style.display="flex",t.style.flexDirection="column",t.style.alignItems="center",t.style.justifyContent="center",t.style.textAlign="center");const o=e.querySelector(".ubits-empty-state__content");o&&(o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.textAlign="center",o.style.width="100%");const r=e.querySelector(".ubits-empty-state__actions");return r&&(r.style.display="flex",r.style.justifyContent="center",r.style.alignItems="center"),n.appendChild(e),n}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'inbox',
    actionLabel: 'Buscar',
    showPrimaryButton: false,
    primaryButtonIcon: 'search',
    showPrimaryButtonIcon: false,
    secondaryActionLabel: 'Cancelar',
    showSecondaryButton: false,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: false
  },
  render: args => {
    // Contenedor principal
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';

    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.border = 'none';
    preview.style.minHeight = '400px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    preview.style.width = '100%';

    // Renderizar el empty state directamente en el preview
    preview.innerHTML = renderEmptyState(args);

    // Asegurar que el componente empty-state tenga los estilos correctos
    const emptyStateElement = preview.querySelector('.ubits-empty-state') as HTMLElement;
    if (emptyStateElement) {
      emptyStateElement.style.width = '100%';
      emptyStateElement.style.maxWidth = '100%';
      emptyStateElement.style.display = 'flex';
      emptyStateElement.style.flexDirection = 'column';
      emptyStateElement.style.alignItems = 'center';
      emptyStateElement.style.justifyContent = 'center';
      emptyStateElement.style.textAlign = 'center';
    }

    // Asegurar que el contenido también esté centrado
    const contentElement = preview.querySelector('.ubits-empty-state__content') as HTMLElement;
    if (contentElement) {
      contentElement.style.display = 'flex';
      contentElement.style.flexDirection = 'column';
      contentElement.style.alignItems = 'center';
      contentElement.style.textAlign = 'center';
      contentElement.style.width = '100%';
    }

    // Asegurar que las acciones estén centradas
    const actionsElement = preview.querySelector('.ubits-empty-state__actions') as HTMLElement;
    if (actionsElement) {
      actionsElement.style.display = 'flex';
      actionsElement.style.justifyContent = 'center';
      actionsElement.style.alignItems = 'center';
    }
    container.appendChild(preview);
    return container;
  }
}`,...a.parameters?.docs?.source}}};const b=["Default"];export{a as Default,b as __namedExportsOrder,u as default};
