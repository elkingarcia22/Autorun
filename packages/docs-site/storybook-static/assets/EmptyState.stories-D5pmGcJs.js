function I(r){const{title:n,description:t,imageUrl:e,icon:o,iconSize:s="lg",actionLabel:y,onAction:_,showPrimaryButton:x=!1,primaryButtonIcon:m,showPrimaryButtonIcon:w=!1,secondaryActionLabel:p,onSecondaryAction:$,showSecondaryButton:v=!1,secondaryButtonIcon:d,showSecondaryButtonIcon:S=!1,className:h="",style:u=""}=r,E=["ubits-empty-state","ubits-empty-state--default",h].filter(Boolean).join(" "),B=u?` style="${u}"`:"";let i="";e?i=`
      <div class="ubits-empty-state__image">
        <img src="${e}" alt="${n}" />
      </div>
    `:o&&(i=`
      <div class="ubits-empty-state__icon">
        <i class="far fa-${o}"></i>
      </div>
    `);let b="",l=y||"";w&&m&&(l=`<i class="far fa-${m}"></i> ${l}`);let c=p||"";S&&d&&(c=`<i class="far fa-${d}"></i> ${c}`);const f=x&&y?`<button class="ubits-button ubits-button--primary ubits-button--md" data-action="primary" type="button">${l}</button>`:"",g=v&&p?`<button class="ubits-button ubits-button--secondary ubits-button--md" data-action="secondary" type="button">${c}</button>`:"";return(f||g)&&(b=`
      <div class="ubits-empty-state__actions">
        ${g}
        ${f}
      </div>
    `),`
    <div class="${E}"${B}>
      ${i}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${n}</h3>
        ${t?`<p class="ubits-empty-state__description">${t}</p>`:""}
      </div>
      ${b}
    </div>
  `.trim()}const L={title:"Components/Empty State",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Empty State UBITS para mostrar estados vacíos en la interfaz. Soporta imagen o icono, título, descripción y botones de acción."}}},argTypes:{title:{control:{type:"text"},description:"Título del empty state",table:{type:{summary:"string"}}},description:{control:{type:"text"},description:"Descripción o mensaje del empty state",table:{type:{summary:"string"}}},imageUrl:{control:{type:"text"},description:"URL de la imagen/ilustración (opcional)",table:{type:{summary:"string"}}},icon:{control:{type:"text"},description:"Nombre del icono FontAwesome a mostrar (opcional, si no hay imagen)",table:{type:{summary:"string"}}},actionLabel:{control:{type:"text"},description:"Texto del botón de acción principal (opcional)",table:{type:{summary:"string"}}},showPrimaryButton:{control:{type:"boolean"},description:"Mostrar botón primario",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},primaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón primario (opcional)",table:{type:{summary:"string"}}},showPrimaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón primario",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},secondaryActionLabel:{control:{type:"text"},description:"Texto del botón secundario (opcional)",table:{type:{summary:"string"}}},showSecondaryButton:{control:{type:"boolean"},description:"Mostrar botón secundario",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},secondaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón secundario (opcional)",table:{type:{summary:"string"}}},showSecondaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón secundario",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}}}},a={args:{title:"No hay resultados",description:"Intenta ajustar tus filtros de búsqueda",icon:"inbox",actionLabel:"Buscar",showPrimaryButton:!1,primaryButtonIcon:"search",showPrimaryButtonIcon:!1,secondaryActionLabel:"Cancelar",showSecondaryButton:!1,secondaryButtonIcon:"times",showSecondaryButtonIcon:!1},render:r=>{const n=document.createElement("div");n.style.padding="40px",n.style.background="var(--ubits-bg-1, #ffffff)",n.style.borderRadius="8px",n.style.width="100%",n.style.boxSizing="border-box";const t=document.createElement("div");t.style.background="var(--ubits-bg-1)",t.style.padding="48px",t.style.borderRadius="8px",t.style.border="none",t.style.minHeight="400px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.boxSizing="border-box",t.style.width="100%",t.innerHTML=I(r);const e=t.querySelector(".ubits-empty-state");e&&(e.style.width="100%",e.style.maxWidth="100%",e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="center",e.style.textAlign="center");const o=t.querySelector(".ubits-empty-state__content");o&&(o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.textAlign="center",o.style.width="100%");const s=t.querySelector(".ubits-empty-state__actions");return s&&(s.style.display="flex",s.style.justifyContent="center",s.style.alignItems="center"),n.appendChild(t),n}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';

    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--ubits-bg-1)';
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
}`,...a.parameters?.docs?.source}}};const C=["Default"];export{a as Default,C as __namedExportsOrder,L as default};
