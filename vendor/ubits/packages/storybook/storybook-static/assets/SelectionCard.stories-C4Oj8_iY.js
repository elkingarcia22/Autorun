import{r as E}from"./RadioButtonProvider-CIXtywXC.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";function w(e,t="regular"){const n=t==="solid"?"fas":"far",a=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${n} ${a}"></i>`}function S(e){const{id:t,title:n,description:a,icon:r,iconStyle:o="regular",image:s,selectionCount:i,state:l="default",size:b="md"}=e,u=l==="selected",d=l==="disabled",g=["ubits-selection-card",`ubits-selection-card--${b}`,l!=="default"?`ubits-selection-card--${l}`:"",u?"ubits-selection-card--selected":""].filter(Boolean).join(" ");let m="";r&&!s&&(m=`
      <div class="ubits-selection-card__icon">
        ${w(r,o)}
      </div>
    `);let p="";s&&(p=`
      <div class="ubits-selection-card__image">
        <img src="${s}" alt="${n}" />
      </div>
    `);let y="";if(i){const{current:h,total:v}=i;y=`
      <div class="ubits-selection-card__selection-count">
        <span class="ubits-selection-card__selection-count-number ubits-body-md-bold">${h}/${v}</span>
        <span class="ubits-selection-card__selection-count-text ubits-body-md-regular">seleccionados</span>
      </div>
    `}const f=E({label:"",value:t,name:`selection-card-group-${t}`,checked:u,size:"md",state:d?"disabled":"default",disabled:d,className:"ubits-selection-card__radio-button"}),C=`
    <div class="${g}" data-card-id="${t}" ${d?'aria-disabled="true"':""} ${d?"":'tabindex="0"'}>
      ${p}
      <div class="ubits-selection-card__content">
        <h3 class="ubits-selection-card__title ubits-body-md-semibold">
          ${m}
          <span>${n}</span>
        </h3>
        ${a?`<p class="ubits-selection-card__description ubits-body-sm">${a}</p>`:""}
        ${y}
      </div>
      <div class="ubits-selection-card__radio-wrapper">
        ${f}
      </div>
    </div>
  `.trim();return typeof window<"u"&&getComputedStyle(document.documentElement),C}function N(e){const t=S(e),n=document.createElement("div");n.innerHTML=t.trim();const a=n.firstElementChild;if(!a)throw console.error("❌ [SelectionCard] Error al parsear HTML. HTML generado:",t),new Error("No se pudo crear el elemento selection-card. Verifica que el HTML sea válido.");return a.classList.contains("ubits-selection-card")||console.warn("⚠️ [SelectionCard] El elemento no tiene la clase base ubits-selection-card"),setTimeout(()=>{const r=window.getComputedStyle(a),o=window.getComputedStyle(document.documentElement);o.getPropertyValue("--modifiers-normal-color-light-border-1").trim(),o.getPropertyValue("--modifiers-static-inverted-color-light-accent-brand").trim(),o.getPropertyValue("--modifiers-normal-color-light-bg-1").trim(),o.getPropertyValue("--ubits-spacing-lg").trim(),o.getPropertyValue("--ubits-spacing-sm").trim(),o.getPropertyValue("--ubits-border-radius-md").trim(),o.getPropertyValue("--font-body-md-size").trim(),o.getPropertyValue("--font-body-md-line").trim(),o.getPropertyValue("--weight-semibold").trim(),o.getPropertyValue("--font-sans").trim(),r.border,r.borderWidth,r.borderStyle,r.borderColor,r.backgroundColor,r.padding,r.gap,r.borderRadius,Array.from(a.classList);const s=a.querySelector(".ubits-selection-card__title");if(s){const i=window.getComputedStyle(s);i.fontSize,i.fontWeight,i.lineHeight,i.fontFamily}a.classList.contains("ubits-selection-card--selected")},100),a}const T={title:"Layout/Selection Card",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Selection Card UBITS para mostrar opciones seleccionables. Soporta selección única o múltiple, estados (default, selected, disabled), y tamaños (sm, md, lg). Incluye un radio button visual a la derecha que refleja el estado de selección. La selección se realiza mediante click en toda la card."}}},argTypes:{id:{control:{type:"text"},description:"ID único de la card",table:{defaultValue:{summary:"card-1"}}},title:{control:{type:"text"},description:"Título de la card",table:{defaultValue:{summary:"Asignar toda la empresa"}}},description:{control:{type:"text"},description:"Descripción opcional de la card (body-sm-regular)",table:{type:{summary:"string | undefined"},defaultValue:{summary:"Agregaras a todos los colaboradores..."}}},showDescription:{control:{type:"boolean"},description:"Mostrar u ocultar la descripción",table:{defaultValue:{summary:"true"}}},icon:{control:{type:"text"},description:"Nombre del icono FontAwesome (sin prefijo fa-)",table:{type:{summary:"string | undefined"},example:{summary:"building, user, users, etc."},defaultValue:{summary:"building"}}},showIcon:{control:{type:"boolean"},description:"Mostrar u ocultar el icono",table:{defaultValue:{summary:"true"}}},iconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono FontAwesome",table:{defaultValue:{summary:"regular"},type:{summary:"regular | solid"}}},"selectionCount.current":{control:{type:"number",min:0,max:1e3,step:1},description:"Número actual de seleccionados",table:{type:{summary:"number"},defaultValue:{summary:"0"}}},"selectionCount.total":{control:{type:"number",min:0,max:1e3,step:1},description:"Número total disponible",table:{type:{summary:"number"},defaultValue:{summary:"290"}}},state:{control:{type:"select"},options:["default","selected","disabled"],description:"Estado de la card",table:{defaultValue:{summary:"default"},type:{summary:"default | selected | disabled"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño de la card",table:{defaultValue:{summary:"md"},type:{summary:"sm | md | lg"}}},value:{control:{type:"text"},description:"Valor asociado a la card",table:{type:{summary:"string | number"}}}}},c={args:{id:"card-1",title:"Asignar toda la empresa",description:"Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.",showDescription:!0,icon:"building",showIcon:!0,iconStyle:"regular",selectionCount:{current:0,total:290},state:"default",size:"md"},render:e=>{const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="flex-start",t.style.background="var(--modifiers-normal-color-light-bg-1)",t.style.border="1px solid var(--modifiers-normal-color-light-border-1)",t.style.minHeight="200px";const n=document.createElement("div");n.style.maxWidth="500px",n.style.width="100%";const a={id:e.id,title:e.title,description:e.showDescription?e.description:void 0,icon:e.showIcon?e.icon:void 0,iconStyle:e.iconStyle,selectionCount:e.selectionCount,state:e.state,size:e.size,value:e.value};try{const r=N(a);n.appendChild(r),t.appendChild(n)}catch(r){console.error("❌ [SelectionCard Story] Error al crear card:",r);const o=document.createElement("div");o.textContent=`Error: ${r instanceof Error?r.message:"Error desconocido"}`,o.style.color="red",o.style.padding="20px",t.appendChild(o)}return t}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    selectionCount: {
      current: 0,
      total: 290
    },
    state: 'default',
    size: 'md'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    container.style.minHeight = '200px';

    // Crear wrapper para la card (max-width 500px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '500px';
    wrapper.style.width = '100%';

    // Preparar datos de la card con los controladores
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      selectionCount: args.selectionCount,
      state: args.state,
      size: args.size,
      value: args.value
    };

    // Crear card
    try {
      const cardElement = createSelectionCard(cardData);
      wrapper.appendChild(cardElement);
      container.appendChild(wrapper);
    } catch (error) {
      console.error('❌ [SelectionCard Story] Error al crear card:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = \`Error: \${error instanceof Error ? error.message : 'Error desconocido'}\`;
      errorDiv.style.color = 'red';
      errorDiv.style.padding = '20px';
      container.appendChild(errorDiv);
    }
    return container;
  }
}`,...c.parameters?.docs?.source}}};const _=["Default"];export{c as Default,_ as __namedExportsOrder,T as default};
