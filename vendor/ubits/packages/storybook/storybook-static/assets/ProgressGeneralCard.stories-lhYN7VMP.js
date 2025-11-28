import{r as p}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function E(e,r){return r===0?0:Math.round(e/r*100)}function y(e){if(typeof window>"u"||!window.document||!window.getComputedStyle)return e;try{const r=document.documentElement,a=e.replace(/var\(|\)/g,"").trim(),t=getComputedStyle(r).getPropertyValue(a).trim();return t?t.replace(/[()]/g,"").trim():e}catch{return e}}function H(e,r=120,a=12,t="var(--modifiers-normal-color-light-accent-brand)",o="var(--modifiers-normal-color-light-bg-3)"){const n=(r-a)/2,l=2*Math.PI*n,i=l-e/100*l,s=r/2,u=t.startsWith("var(")?y(t):t,d=o.startsWith("var(")?y(o):o;return`
    <svg 
      class="ubits-progress-general-card__circle-svg" 
      width="${r}" 
      height="${r}" 
      viewBox="0 0 ${r} ${r}"
    >
      <!-- Círculo de fondo -->
      <circle
        cx="${s}"
        cy="${s}"
        r="${n}"
        fill="none"
        stroke="${d}"
        stroke-width="${a}"
      />
      <!-- Círculo de progreso -->
      <circle
        cx="${s}"
        cy="${s}"
        r="${n}"
        fill="none"
        stroke="${u}"
        stroke-width="${a}"
        stroke-dasharray="${l}"
        stroke-dashoffset="${i}"
        stroke-linecap="round"
        transform="rotate(-90 ${s} ${s})"
        class="ubits-progress-general-card__circle-progress"
      />
    </svg>
  `}function j(e,r="md"){const a=e.percentage??E(e.current,e.total),t=r==="sm"?"ubits-body-sm-regular":r==="lg"?"ubits-body-md-regular":"ubits-body-sm-regular",o=r==="sm"?"ubits-body-sm-regular":r==="lg"?"ubits-body-md-regular":"ubits-body-sm-regular",n=r==="sm"?"ubits-body-sm-bold":"ubits-body-md-bold";return`
    <div class="ubits-progress-general-card__category">
      <div class="ubits-progress-general-card__category-label ${t}">
        ${e.label}
      </div>
      <div class="ubits-progress-general-card__category-value ${o}">
        ${e.current}/${e.total} <span class="ubits-progress-general-card__category-percentage ${n}">${a}%</span>
      </div>
    </div>
  `}function S(e){const{title:r="Progreso general",mainPercentage:a=50,mainLabel:t="Ciclos",categories:o=[],layout:n="vertical",size:l="md",showTitle:i=!0,showCircularProgress:s=!0,showCategories:u=!0,showInfoIcon:d=!1,showActionButton:b=!1,progressColor:h="var(--ubits-chart-color-bg-neutral-blue-base)",circleBackgroundColor:f="var(--modifiers-normal-color-light-bg-3)",className:C="",attributes:v={}}=e,w=["ubits-progress-general-card",`ubits-progress-general-card--${n}`,`ubits-progress-general-card--${l}`,C].filter(Boolean).join(" "),$=[...Object.entries(v).map(([g,k])=>`${g}="${k}"`)].filter(Boolean).join(" "),T=158,L=16,P="ubits-body-md-bold",_="ubits-heading-h2",x="ubits-body-sm-bold",V=d?p({variant:"tertiary",size:"sm",icon:"circle-info",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Información",type:"button"}}):"",m=b?p({variant:"tertiary",size:"sm",icon:"chevron-right",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Ver más",type:"button"}}):"",B=i?`
      <div class="ubits-progress-general-card__header">
        <div class="ubits-progress-general-card__title-group">
          <h3 class="ubits-progress-general-card__title ${P}">${r}</h3>
          ${V}
        </div>
        ${m?`<div class="ubits-progress-general-card__action-button">${m}</div>`:""}
      </div>
    `:"",I=s?`
      <div class="ubits-progress-general-card__circle-wrapper">
        ${H(a,T,L,h,f)}
        <div class="ubits-progress-general-card__circle-content">
          <div class="ubits-progress-general-card__circle-percentage ${_}">
            ${a}%
          </div>
          <div class="ubits-progress-general-card__circle-label ${x}">
            ${t}
          </div>
        </div>
      </div>
    `:"",M=u&&o.length>0?`
      <div class="ubits-progress-general-card__categories">
        ${o.map(g=>j(g,l)).join("")}
      </div>
    `:"";return`
    <div class="${w}" ${$}>
      ${B}
      <div class="ubits-progress-general-card__content">
        ${I}
        ${M}
      </div>
    </div>
  `}const G={title:"Charts/Circle Metric Card",tags:["autodocs"],parameters:{docs:{description:{component:"Componente ProgressGeneralCard UBITS para mostrar progreso general con indicador circular (donut chart) y categorías de progreso. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado."}}},argTypes:{title:{control:{type:"text"},description:"Título del componente",table:{defaultValue:{summary:"Progreso general"},type:{summary:"string"}}},mainPercentage:{control:{type:"number",min:0,max:100,step:1},description:"Porcentaje principal mostrado en el círculo",table:{defaultValue:{summary:"50"},type:{summary:"number"}}},mainLabel:{control:{type:"text"},description:'Etiqueta del porcentaje principal (ej: "Ciclos")',table:{defaultValue:{summary:"Ciclos"},type:{summary:"string"}}},layout:{control:{type:"select"},options:["vertical","horizontal"],description:"Layout del componente",table:{defaultValue:{summary:"vertical"},type:{summary:"vertical | horizontal"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del componente",table:{defaultValue:{summary:"md"},type:{summary:"sm | md | lg"}}},showTitle:{control:{type:"boolean"},description:"Mostrar el título",table:{defaultValue:{summary:"true"}}},showCircularProgress:{control:{type:"boolean"},description:"Mostrar el indicador circular",table:{defaultValue:{summary:"true"}}},showCategories:{control:{type:"boolean"},description:"Mostrar las categorías",table:{defaultValue:{summary:"true"}}},showInfoIcon:{control:{type:"boolean"},description:"Mostrar icono de información junto al título",table:{defaultValue:{summary:"false"}}},showActionButton:{control:{type:"boolean"},description:"Mostrar botón de acción con flecha a la derecha en la esquina superior derecha",table:{defaultValue:{summary:"false"}}},progressColor:{control:{type:"text"},description:"Color del progreso circular (token UBITS o color hexadecimal)",table:{defaultValue:{summary:"var(--ubits-chart-color-bg-neutral-blue-base)"},type:{summary:"string"}}},circleBackgroundColor:{control:{type:"text"},description:"Color de fondo del círculo (token UBITS o color hexadecimal)",table:{defaultValue:{summary:"var(--modifiers-normal-color-light-bg-3)"},type:{summary:"string"}}},category1Label:{control:{type:"text"},description:"Etiqueta de la categoría 1",table:{defaultValue:{summary:"Área"},type:{summary:"string"}}},category1Current:{control:{type:"number",min:0,step:1},description:"Valor actual de la categoría 1",table:{defaultValue:{summary:"3"},type:{summary:"number"}}},category1Total:{control:{type:"number",min:1,step:1},description:"Valor total de la categoría 1",table:{defaultValue:{summary:"20"},type:{summary:"number"}}},category2Label:{control:{type:"text"},description:"Etiqueta de la categoría 2",table:{defaultValue:{summary:"Equipo"},type:{summary:"string"}}},category2Current:{control:{type:"number",min:0,step:1},description:"Valor actual de la categoría 2",table:{defaultValue:{summary:"8"},type:{summary:"number"}}},category2Total:{control:{type:"number",min:1,step:1},description:"Valor total de la categoría 2",table:{defaultValue:{summary:"50"},type:{summary:"number"}}},category3Label:{control:{type:"text"},description:"Etiqueta de la categoría 3",table:{defaultValue:{summary:"Propio"},type:{summary:"string"}}},category3Current:{control:{type:"number",min:0,step:1},description:"Valor actual de la categoría 3",table:{defaultValue:{summary:"5"},type:{summary:"number"}}},category3Total:{control:{type:"number",min:1,step:1},description:"Valor total de la categoría 3",table:{defaultValue:{summary:"30"},type:{summary:"number"}}}}};function z(e){if(!e)return[];const r=[];return e.category1Label!==void 0&&r.push({label:e.category1Label||"Área",current:e.category1Current??3,total:e.category1Total??20}),e.category2Label!==void 0&&r.push({label:e.category2Label||"Equipo",current:e.category2Current??8,total:e.category2Total??50}),e.category3Label!==void 0&&r.push({label:e.category3Label||"Propio",current:e.category3Current??5,total:e.category3Total??30}),r}const c={args:{title:"Progreso general",mainPercentage:50,mainLabel:"Ciclos",layout:"horizontal",size:"md",showTitle:!0,showCircularProgress:!0,showCategories:!0,showInfoIcon:!0,showActionButton:!0,progressColor:"var(--ubits-chart-color-bg-neutral-blue-base)",circleBackgroundColor:"var(--modifiers-normal-color-light-bg-3)",category1Label:"Área",category1Current:3,category1Total:20,category2Label:"Equipo",category2Current:8,category2Total:50,category3Label:"Propio",category3Current:5,category3Total:30},render:e=>{const r=z(e),a={title:e.title,mainPercentage:e.mainPercentage??50,mainLabel:e.mainLabel,categories:r,layout:e.layout,size:e.size,showTitle:e.showTitle,showCircularProgress:e.showCircularProgress,showCategories:e.showCategories,showInfoIcon:e.showInfoIcon,showActionButton:e.showActionButton,progressColor:e.progressColor,circleBackgroundColor:e.circleBackgroundColor},t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="flex-start",t.style.padding="48px",t.style.background="var(--modifiers-normal-color-light-bg-2)",t.style.borderRadius="8px",t.style.minHeight="400px";const o=document.createElement("div");a.layout==="horizontal"?(o.style.maxWidth="800px",o.style.width="100%"):(o.style.maxWidth="500px",o.style.width="100%");const n=S(a);return o.innerHTML=n,t.appendChild(o),t}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'horizontal',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
    circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
    category1Label: 'Área',
    category1Current: 3,
    category1Total: 20,
    category2Label: 'Equipo',
    category2Current: 8,
    category2Total: 50,
    category3Label: 'Propio',
    category3Current: 5,
    category3Total: 30
  },
  render: args => {
    // Construir las categorías desde los args
    const categories = buildCategories(args);

    // Construir las opciones del componente
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      progressColor: args.progressColor,
      circleBackgroundColor: args.circleBackgroundColor
    };

    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    container.style.minHeight = '400px';

    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    // Ajustar ancho según el layout
    if (options.layout === 'horizontal') {
      wrapper.style.maxWidth = '800px';
      wrapper.style.width = '100%';
    } else {
      wrapper.style.maxWidth = '500px';
      wrapper.style.width = '100%';
    }

    // Renderizar card
    const cardHTML = renderProgressGeneralCard(options);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    return container;
  }
}`,...c.parameters?.docs?.source}}};const R=["Default"];export{c as Default,R as __namedExportsOrder,G as default};
