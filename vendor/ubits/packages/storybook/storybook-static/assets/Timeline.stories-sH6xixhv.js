import{r as w}from"./AvatarProvider-CF4x-oFR.js";const C={title:"Layout/Timeline",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Timeline UBITS para mostrar secuencias de eventos o fases. Soporta avatar, fecha, título, descripción, iconos y alineación izquierda o centrada. Usa tokens UBITS."}}},argTypes:{showAvatar:{control:{type:"boolean"},description:"Mostrar avatar en cada item del timeline (mutuamente excluyente con icono)",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},showDate:{control:{type:"boolean"},description:"Mostrar fecha en cada item",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},showDescription:{control:{type:"boolean"},description:"Mostrar descripción en cada item",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},showIcon:{control:{type:"boolean"},description:"Mostrar icono en el marcador del timeline (mutuamente excluyente con avatar)",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},alignment:{control:{type:"select"},options:["left","center"],description:"Alineación del contenido del texto (la línea siempre está a la izquierda)",table:{defaultValue:{summary:"left"},type:{summary:"left | center"}}},filledItems:{control:{type:"number",min:0,max:4,step:1},description:"Cantidad de items con círculo relleno (0-4)",table:{defaultValue:{summary:"2"},type:{summary:"number"}}}}};function $(i,t="regular"){return`<i class="${t==="solid"?"fas":"far"} fa-${i}"></i>`}function I(i=2){return[{date:"Mar 15, 2024",title:"Project Kickoff",description:"Initial team meeting and project scope definition. Established key milestones and resource allocation.",state:i>0?"filled":"default",avatar:{imageUrl:"/images/Profile-image.jpg"},icon:"circle"},{date:"Mar 22, 2024",title:"Design Phase",description:"Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",state:i>1?"filled":"default",avatar:{imageUrl:"/images/Profile-image.jpg"},icon:"paint-brush"},{date:"Apr 5, 2024",title:"Development Sprint",description:"Backend API implementation and frontend component development in progress.",state:i>2?"filled":"default",avatar:{imageUrl:"/images/Profile-image.jpg"},icon:"code"},{date:"Apr 19, 2024",title:"Testing & Deployment",description:"Quality assurance testing, performance optimization, and production deployment preparation.",state:i>3?"filled":"default",avatar:{imageUrl:"/images/Profile-image.jpg"},icon:"rocket"}]}function z(i,t,o,n){const{showAvatar:m=!1,showDate:r=!0,showDescription:e=!0,showIcon:d=!0,alignment:f="left"}=n,g=m===!0&&d!==!0,v=d===!0&&m!==!0,c=i.state==="filled";i.state;const u=c?"ubits-timeline-marker--filled":"ubits-timeline-marker--default",h=c?"var(--modifiers-static-color-light-fg-1-medium)":"var(--modifiers-normal-color-light-border-1)";let p="";if(g&&i.avatar){const l={size:"xs",alt:i.title};i.avatar.imageUrl?l.imageUrl=i.avatar.imageUrl:i.avatar.initials?l.initials=i.avatar.initials:l.icon=i.avatar.icon||"user",p=w(l)}let _="";if(v){const l=i.icon||"circle";_=`
      <span class="ubits-timeline-marker__icon">
        ${$(l,"solid")}
      </span>
    `}const a=f==="center",x=t%2===0,s=a?x?"left":"right":"left";if(g&&p){const l=o?"":`
        <div class="ubits-timeline-line"></div>
      `;return`
      <div class="ubits-timeline-item ${a?`ubits-timeline-item--${s}`:""}" data-index="${t}" data-state="${i.state}">
        ${a&&s==="right"?`
          <div class="ubits-timeline-item__content">
            <div class="ubits-timeline-item__text">
              ${r&&i.date?`
                <div class="ubits-timeline-item__date ubits-body-sm-regular">
                  ${i.date}
                </div>
              `:""}
              <div class="ubits-timeline-item__title ubits-body-md-semibold">
                ${i.title}
              </div>
              ${e&&i.description?`
                <div class="ubits-timeline-item__description ubits-body-sm-regular">
                  ${i.description}
                </div>
              `:""}
            </div>
          </div>
        `:""}
        <div class="ubits-timeline-item__marker-container">
          <div class="ubits-timeline-marker ubits-timeline-marker--avatar">
            ${p}
          </div>
        </div>
        ${l}
        ${a&&s==="left"?`
          <div class="ubits-timeline-item__content">
            <div class="ubits-timeline-item__text">
              ${r&&i.date?`
                <div class="ubits-timeline-item__date ubits-body-sm-regular">
                  ${i.date}
                </div>
              `:""}
              <div class="ubits-timeline-item__title ubits-body-md-semibold">
                ${i.title}
              </div>
              ${e&&i.description?`
                <div class="ubits-timeline-item__description ubits-body-sm-regular">
                  ${i.description}
                </div>
              `:""}
            </div>
          </div>
        `:a?"":`
          <div class="ubits-timeline-item__content">
            <div class="ubits-timeline-item__text">
              ${r&&i.date?`
                <div class="ubits-timeline-item__date ubits-body-sm-regular">
                  ${i.date}
                </div>
              `:""}
              <div class="ubits-timeline-item__title ubits-body-md-semibold">
                ${i.title}
              </div>
              ${e&&i.description?`
                <div class="ubits-timeline-item__description ubits-body-sm-regular">
                  ${i.description}
                </div>
              `:""}
            </div>
          </div>
        `}
      </div>
    `}const k=c?h:"var(--modifiers-normal-color-light-bg-1)",y=o?"":`
        <div class="ubits-timeline-line"></div>
      `;return`
    <div class="ubits-timeline-item ${a?`ubits-timeline-item--${s}`:""}" data-index="${t}" data-state="${i.state}">
      ${a&&s==="right"?`
        <div class="ubits-timeline-item__content">
          <div class="ubits-timeline-item__text">
            ${r&&i.date?`
              <div class="ubits-timeline-item__date ubits-body-sm-regular">
                ${i.date}
              </div>
            `:""}
            <div class="ubits-timeline-item__title ubits-body-md-semibold">
              ${i.title}
            </div>
            ${e&&i.description?`
              <div class="ubits-timeline-item__description ubits-body-sm-regular">
                ${i.description}
              </div>
            `:""}
          </div>
        </div>
      `:""}
      <div class="ubits-timeline-item__marker-container">
        <div class="ubits-timeline-marker ${u}" style="border-color: ${h}; background-color: ${k}; border-radius: var(--ubits-border-radius-full, 50%) !important;">
          ${_}
        </div>
      </div>
      ${y}
      ${a&&s==="left"?`
        <div class="ubits-timeline-item__content">
          <div class="ubits-timeline-item__text">
            ${r&&i.date?`
              <div class="ubits-timeline-item__date ubits-body-sm-regular">
                ${i.date}
              </div>
            `:""}
            <div class="ubits-timeline-item__title ubits-body-md-semibold">
              ${i.title}
            </div>
            ${e&&i.description?`
              <div class="ubits-timeline-item__description ubits-body-sm-regular">
                ${i.description}
              </div>
            `:""}
          </div>
        </div>
      `:a?"":`
        <div class="ubits-timeline-item__content">
          <div class="ubits-timeline-item__text">
            ${r&&i.date?`
              <div class="ubits-timeline-item__date ubits-body-sm-regular">
                ${i.date}
              </div>
            `:""}
            <div class="ubits-timeline-item__title ubits-body-md-semibold">
              ${i.title}
            </div>
            ${e&&i.description?`
              <div class="ubits-timeline-item__description ubits-body-sm-regular">
                ${i.description}
              </div>
            `:""}
          </div>
        </div>
      `}
    </div>
  `}function T(i){const{showAvatar:t=!1,showDate:o=!0,showDescription:n=!0,showIcon:m=!0,alignment:r="left",filledItems:e=2}=i,d=I(e),f=`timeline-${Date.now()}`;return`
    <div class="ubits-timeline ${r==="center"?"ubits-timeline--center":"ubits-timeline--left"}" id="${f}">
      ${d.map((c,u)=>z(c,u,u===d.length-1,i)).join("")}
    </div>
  `}const b={args:{showAvatar:!1,showDate:!0,showDescription:!0,showIcon:!0,alignment:"left",filledItems:2},render:i=>{i.showAvatar===!0&&(i.showIcon=!1),i.showIcon===!0&&(i.showAvatar=!1);const t=document.createElement("div");t.style.cssText=`
      padding: var(--p-spacing-mode-1-lg, 16px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: var(--ubits-border-radius-md, 8px);
      max-width: 800px;
    `;const o=document.createElement("div");o.style.cssText=`
      padding: var(--p-spacing-mode-1-md, 12px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: var(--ubits-border-radius-md, 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      margin-bottom: var(--p-spacing-mode-1-lg, 16px);
    `,o.innerHTML=`
        <div style="margin-bottom: var(--p-spacing-mode-1-sm, 8px);">
        <strong class="ubits-body-md-semibold" style="color: var(--modifiers-normal-color-light-fg-1-high);">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--p-spacing-mode-1-sm, 8px); font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);" class="ubits-body-sm-regular">
        <div><strong>Avatar:</strong> ${i.showAvatar?"Sí":"No"}</div>
        <div><strong>Fecha:</strong> ${i.showDate!==!1?"Sí":"No"}</div>
        <div><strong>Descripción:</strong> ${i.showDescription!==!1?"Sí":"No"}</div>
        <div><strong>Icono:</strong> ${i.showIcon!==!1?"Sí":"No"}</div>
        <div><strong>Alineación:</strong> ${i.alignment==="center"?"Centrada":"Izquierda"}</div>
        <div><strong>Items rellenos:</strong> ${i.filledItems||2}</div>
      </div>
    `;const n=document.createElement("div");n.style.cssText=`
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md, 8px);
      padding: var(--p-spacing-mode-1-lg, 16px);
    `;const m=T(i);n.innerHTML=m;const r="ubits-timeline-styles";if(!document.getElementById(r)){const e=document.createElement("style");e.id=r,e.textContent=`
        .ubits-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
        }
        
        .ubits-timeline--left {
          align-items: flex-start;
        }
        
        .ubits-timeline--center {
          align-items: center;
          position: relative;
        }
        
        .ubits-timeline--center::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          background-color: var(--modifiers-normal-color-light-border-1);
          z-index: 0;
        }
        
        .ubits-timeline-item {
          position: relative;
          display: flex;
          width: 100%;
          gap: 0;
          align-items: flex-start;
          margin-bottom: var(--p-spacing-mode-1-xl, 20px);
        }
        
        .ubits-timeline-item:last-child {
          margin-bottom: 0;
        }
        
        /* Versión centrada: items con contenido a los lados */
        .ubits-timeline--center .ubits-timeline-item {
          justify-content: flex-start;
          align-items: flex-start;
          position: relative;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left {
          flex-direction: row;
          justify-content: flex-end;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right {
          flex-direction: row;
          justify-content: flex-start;
        }
        
        .ubits-timeline-item__content {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
          min-width: 0;
          margin-left: var(--p-spacing-mode-1-md, 12px);
        }
        
        .ubits-timeline--center .ubits-timeline-item__content {
          flex: 0 0 auto;
          max-width: calc(50% - 40px);
          align-self: flex-start;
          padding-top: 0;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__content {
          text-align: right;
          align-items: flex-end;
          margin-left: var(--p-spacing-mode-1-md, 12px);
          margin-right: 0;
          order: 2;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__content {
          text-align: left;
          align-items: flex-start;
          margin-right: var(--p-spacing-mode-1-md, 12px);
          margin-left: 0;
          order: 0;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__marker-container {
          order: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__marker-container {
          order: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__text {
          align-items: flex-end;
          text-align: right;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__text {
          align-items: flex-start;
          text-align: left;
        }
        
        /* Asegurar que el texto esté justificado correctamente al lado del círculo */
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__date,
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__title,
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__description {
          text-align: left;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__date,
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__title,
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__description {
          text-align: right;
        }
        
        .ubits-timeline-item__text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          align-items: flex-start;
        }
        
        .ubits-timeline--center .ubits-timeline-item__text {
          align-items: center;
        }
        
        .ubits-timeline-item__date {
          margin: 0 0 4px 0; /* MANTENER MEDIDA ORIGINAL */
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-regular, 400);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item__title {
          margin: 0 0 4px 0;
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-md-regular-fontsize);
          font-weight: var(--modifiers-normal-body-md-semibold-fontweight, 600);
          line-height: var(--modifiers-normal-body-md-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item__description {
          margin: 0;
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-regular, 400);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item__marker-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 24px;
          z-index: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item__marker-container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          top: 0;
        }
        
        .ubits-timeline-marker {
          width: 24px;
          height: 24px;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        
        .ubits-timeline-marker--avatar {
          width: 24px !important;
          height: 24px !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          border: 2px solid var(--modifiers-normal-color-light-border-1) !important;
          padding: 0 !important;
          background: var(--modifiers-normal-color-light-bg-1) !important;
          overflow: hidden !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar {
          width: 24px !important;
          height: 24px !important;
          min-width: 24px !important;
          min-height: 24px !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          overflow: hidden !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-image-container {
          width: 100% !important;
          height: 100% !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          overflow: hidden !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-image,
        .ubits-timeline-marker--avatar .ubits-avatar img {
          width: 100% !important;
          height: 100% !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          object-fit: cover !important;
          display: block !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-initials {
          border-radius: var(--ubits-border-radius-full, 50%) !important;
        }
        
        .ubits-timeline-marker--default {
          background-color: var(--modifiers-normal-color-light-bg-1);
          border-color: var(--modifiers-normal-color-light-border-1);
        }
        
        .ubits-timeline-marker--filled {
          background-color: var(--modifiers-static-color-light-fg-1-medium);
          border-color: var(--modifiers-static-color-light-fg-1-medium);
        }
        
        .ubits-timeline-marker__icon {
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Iconos en círculos sin relleno deben ser visibles sobre fondo blanco */
        .ubits-timeline-marker--default .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-marker--filled .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-light-fg-bold);
        }
        
        .ubits-timeline-line {
          position: absolute;
          left: 11px;
          top: 24px;
          bottom: -32px;
          width: 2px;
          z-index: 0;
          background-color: var(--modifiers-normal-color-light-border-1);
          transition: background-color 0.2s ease;
        }
        
        .ubits-timeline--center .ubits-timeline-line {
          display: none;
        }
        
        .ubits-timeline-item:last-child .ubits-timeline-line {
          display: none;
        }
        
        /* Línea con color según el estado del item actual (la línea pertenece al item anterior) */
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-line {
          background-color: var(--modifiers-static-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item[data-state="default"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-light-border-1);
        }
        
        /* Línea central para versión centrada - se actualiza dinámicamente */
        .ubits-timeline--center::before {
          background: linear-gradient(
            to bottom,
            var(--modifiers-static-color-light-fg-1-medium) 0%,
            var(--modifiers-static-color-light-fg-1-medium) var(--filled-height, 0%),
            var(--modifiers-normal-color-light-border-1) var(--filled-height, 0%)
          );
        }
        
        /* Estados del contenido según el estado del item */
        .ubits-timeline-item[data-state="default"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item[data-state="default"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        /* Dark mode support */
        [data-theme="dark"] .ubits-timeline--center::before {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-item__date {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--avatar {
          border-color: var(--modifiers-normal-color-dark-border-1);
          background: var(--modifiers-normal-color-dark-bg-1);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--default {
          background-color: var(--modifiers-normal-color-dark-bg-1);
          border-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--filled {
          background-color: var(--modifiers-static-color-dark-fg-1-medium);
          border-color: var(--modifiers-static-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--default .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--filled .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-dark-fg-bold);
        }
        
        [data-theme="dark"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-line {
          background-color: var(--modifiers-static-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline--center::before {
          background: linear-gradient(
            to bottom,
            var(--modifiers-static-color-dark-fg-1-medium) 0%,
            var(--modifiers-static-color-dark-fg-1-medium) var(--filled-height, 0%),
            var(--modifiers-normal-color-dark-border-1) var(--filled-height, 0%)
          );
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-item__title,
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-item__description,
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
      `,document.head.appendChild(e)}return t.appendChild(o),t.appendChild(n),t}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    showAvatar: false,
    showDate: true,
    showDescription: true,
    showIcon: true,
    alignment: 'left',
    filledItems: 2
  },
  render: args => {
    // Asegurar que avatar e icono sean mutuamente excluyentes
    if (args.showAvatar === true) {
      args.showIcon = false;
    }
    if (args.showIcon === true) {
      args.showAvatar = false;
    }

    // Crear contenedor principal
    const container = document.createElement('div');
    container.style.cssText = \`
      padding: var(--p-spacing-mode-1-lg, 16px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: var(--ubits-border-radius-md, 8px);
      max-width: 800px;
    \`;

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = \`
      padding: var(--p-spacing-mode-1-md, 12px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: var(--ubits-border-radius-md, 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      margin-bottom: var(--p-spacing-mode-1-lg, 16px);
    \`;
    infoPanel.innerHTML = \`
        <div style="margin-bottom: var(--p-spacing-mode-1-sm, 8px);">
        <strong class="ubits-body-md-semibold" style="color: var(--modifiers-normal-color-light-fg-1-high);">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--p-spacing-mode-1-sm, 8px); font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);" class="ubits-body-sm-regular">
        <div><strong>Avatar:</strong> \${args.showAvatar ? 'Sí' : 'No'}</div>
        <div><strong>Fecha:</strong> \${args.showDate !== false ? 'Sí' : 'No'}</div>
        <div><strong>Descripción:</strong> \${args.showDescription !== false ? 'Sí' : 'No'}</div>
        <div><strong>Icono:</strong> \${args.showIcon !== false ? 'Sí' : 'No'}</div>
        <div><strong>Alineación:</strong> \${args.alignment === 'center' ? 'Centrada' : 'Izquierda'}</div>
        <div><strong>Items rellenos:</strong> \${args.filledItems || 2}</div>
      </div>
    \`;

    // Contenedor del timeline
    const timelineContainer = document.createElement('div');
    timelineContainer.style.cssText = \`
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md, 8px);
      padding: var(--p-spacing-mode-1-lg, 16px);
    \`;

    // Renderizar el timeline
    const timelineHTML = renderTimeline(args);
    timelineContainer.innerHTML = timelineHTML;

    // Agregar estilos CSS para el Timeline
    const styleId = 'ubits-timeline-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = \`
        .ubits-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
        }
        
        .ubits-timeline--left {
          align-items: flex-start;
        }
        
        .ubits-timeline--center {
          align-items: center;
          position: relative;
        }
        
        .ubits-timeline--center::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          background-color: var(--modifiers-normal-color-light-border-1);
          z-index: 0;
        }
        
        .ubits-timeline-item {
          position: relative;
          display: flex;
          width: 100%;
          gap: 0;
          align-items: flex-start;
          margin-bottom: var(--p-spacing-mode-1-xl, 20px);
        }
        
        .ubits-timeline-item:last-child {
          margin-bottom: 0;
        }
        
        /* Versión centrada: items con contenido a los lados */
        .ubits-timeline--center .ubits-timeline-item {
          justify-content: flex-start;
          align-items: flex-start;
          position: relative;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left {
          flex-direction: row;
          justify-content: flex-end;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right {
          flex-direction: row;
          justify-content: flex-start;
        }
        
        .ubits-timeline-item__content {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
          min-width: 0;
          margin-left: var(--p-spacing-mode-1-md, 12px);
        }
        
        .ubits-timeline--center .ubits-timeline-item__content {
          flex: 0 0 auto;
          max-width: calc(50% - 40px);
          align-self: flex-start;
          padding-top: 0;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__content {
          text-align: right;
          align-items: flex-end;
          margin-left: var(--p-spacing-mode-1-md, 12px);
          margin-right: 0;
          order: 2;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__content {
          text-align: left;
          align-items: flex-start;
          margin-right: var(--p-spacing-mode-1-md, 12px);
          margin-left: 0;
          order: 0;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__marker-container {
          order: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__marker-container {
          order: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__text {
          align-items: flex-end;
          text-align: right;
        }
        
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__text {
          align-items: flex-start;
          text-align: left;
        }
        
        /* Asegurar que el texto esté justificado correctamente al lado del círculo */
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__date,
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__title,
        .ubits-timeline--center .ubits-timeline-item--left .ubits-timeline-item__description {
          text-align: left;
        }
        
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__date,
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__title,
        .ubits-timeline--center .ubits-timeline-item--right .ubits-timeline-item__description {
          text-align: right;
        }
        
        .ubits-timeline-item__text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          align-items: flex-start;
        }
        
        .ubits-timeline--center .ubits-timeline-item__text {
          align-items: center;
        }
        
        .ubits-timeline-item__date {
          margin: 0 0 4px 0; /* MANTENER MEDIDA ORIGINAL */
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-regular, 400);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item__title {
          margin: 0 0 4px 0;
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-md-regular-fontsize);
          font-weight: var(--modifiers-normal-body-md-semibold-fontweight, 600);
          line-height: var(--modifiers-normal-body-md-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item__description {
          margin: 0;
          font-family: var(--font-family-noto-sans-font-family);
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-regular, 400);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item__marker-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 24px;
          z-index: 1;
        }
        
        .ubits-timeline--center .ubits-timeline-item__marker-container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          top: 0;
        }
        
        .ubits-timeline-marker {
          width: 24px;
          height: 24px;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        
        .ubits-timeline-marker--avatar {
          width: 24px !important;
          height: 24px !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          border: 2px solid var(--modifiers-normal-color-light-border-1) !important;
          padding: 0 !important;
          background: var(--modifiers-normal-color-light-bg-1) !important;
          overflow: hidden !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar {
          width: 24px !important;
          height: 24px !important;
          min-width: 24px !important;
          min-height: 24px !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          overflow: hidden !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-image-container {
          width: 100% !important;
          height: 100% !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          overflow: hidden !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-image,
        .ubits-timeline-marker--avatar .ubits-avatar img {
          width: 100% !important;
          height: 100% !important;
          border-radius: var(--ubits-border-radius-full, 50%) !important;
          object-fit: cover !important;
          display: block !important;
        }
        
        .ubits-timeline-marker--avatar .ubits-avatar-initials {
          border-radius: var(--ubits-border-radius-full, 50%) !important;
        }
        
        .ubits-timeline-marker--default {
          background-color: var(--modifiers-normal-color-light-bg-1);
          border-color: var(--modifiers-normal-color-light-border-1);
        }
        
        .ubits-timeline-marker--filled {
          background-color: var(--modifiers-static-color-light-fg-1-medium);
          border-color: var(--modifiers-static-color-light-fg-1-medium);
        }
        
        .ubits-timeline-marker__icon {
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Iconos en círculos sin relleno deben ser visibles sobre fondo blanco */
        .ubits-timeline-marker--default .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-marker--filled .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-light-fg-bold);
        }
        
        .ubits-timeline-line {
          position: absolute;
          left: 11px;
          top: 24px;
          bottom: -32px;
          width: 2px;
          z-index: 0;
          background-color: var(--modifiers-normal-color-light-border-1);
          transition: background-color 0.2s ease;
        }
        
        .ubits-timeline--center .ubits-timeline-line {
          display: none;
        }
        
        .ubits-timeline-item:last-child .ubits-timeline-line {
          display: none;
        }
        
        /* Línea con color según el estado del item actual (la línea pertenece al item anterior) */
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-line {
          background-color: var(--modifiers-static-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item[data-state="default"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-light-border-1);
        }
        
        /* Línea central para versión centrada - se actualiza dinámicamente */
        .ubits-timeline--center::before {
          background: linear-gradient(
            to bottom,
            var(--modifiers-static-color-light-fg-1-medium) 0%,
            var(--modifiers-static-color-light-fg-1-medium) var(--filled-height, 0%),
            var(--modifiers-normal-color-light-border-1) var(--filled-height, 0%)
          );
        }
        
        /* Estados del contenido según el estado del item */
        .ubits-timeline-item[data-state="default"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item[data-state="default"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-light-fg-1-medium);
        }
        
        /* Dark mode support */
        [data-theme="dark"] .ubits-timeline--center::before {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-item__date {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--avatar {
          border-color: var(--modifiers-normal-color-dark-border-1);
          background: var(--modifiers-normal-color-dark-bg-1);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--default {
          background-color: var(--modifiers-normal-color-dark-bg-1);
          border-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--filled {
          background-color: var(--modifiers-static-color-dark-fg-1-medium);
          border-color: var(--modifiers-static-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--default .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-marker--filled .ubits-timeline-marker__icon {
          color: var(--modifiers-normal-color-dark-fg-bold);
        }
        
        [data-theme="dark"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-line {
          background-color: var(--modifiers-static-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-line {
          background-color: var(--modifiers-normal-color-dark-border-1);
        }
        
        [data-theme="dark"] .ubits-timeline--center::before {
          background: linear-gradient(
            to bottom,
            var(--modifiers-static-color-dark-fg-1-medium) 0%,
            var(--modifiers-static-color-dark-fg-1-medium) var(--filled-height, 0%),
            var(--modifiers-normal-color-dark-border-1) var(--filled-height, 0%)
          );
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-item__title,
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__title {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-timeline-item[data-state="default"] .ubits-timeline-item__description,
        [data-theme="dark"] .ubits-timeline-item[data-state="filled"] .ubits-timeline-item__description {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
      \`;
      document.head.appendChild(style);
    }

    // El CSS del avatar ya está cargado globalmente en preview.ts
    container.appendChild(infoPanel);
    container.appendChild(timelineContainer);
    return container;
  }
}`,...b.parameters?.docs?.source}}};const D=["Default"];export{b as Default,D as __namedExportsOrder,C as default};
