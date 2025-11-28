import{r as j}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function Y(e,o){return o===0?0:Math.round(e/o*100)}function q(e,o=200,a=16,s="var(--modifiers-normal-color-light-feedback-accent-error)",l="var(--modifiers-normal-color-light-feedback-accent-warning)",p="var(--modifiers-normal-color-light-feedback-accent-success)",y="var(--modifiers-normal-color-light-bg-3)"){const b=a/2,t=(o-b*2)/2,C=o/2,v=o-b,i=180,V=0,u=(c,n)=>{const h=c*Math.PI/180,g=C+n*Math.cos(h),E=v+n*Math.sin(h);return{x:g,y:E}},d=u(i,t),w=u(V,t),B=`M ${d.x} ${d.y} A ${t} ${t} 0 1 1 ${w.x} ${w.y}`,M="var(--modifiers-normal-chart-color-bg-neutral-blue-base)";let r;e<=50?r=180+e/50*90:(r=270+(e-50)/50*90,r>=360&&(r=r-360));const $=u(r,t),P=(r>i?r-i:360-i+r)>180?1:0,m=`M ${d.x} ${d.y} A ${t} ${t} 0 ${P} 1 ${$.x} ${$.y}`,x=u(270,t),A=(v-t/2)/o*100,I=[0,10,20,30,40,50,60,70,80,90,100].map(c=>{let n;c<=50?n=180+c/50*90:(n=270+(c-50)/50*90,n>=360&&(n=n-360));const h=t+20,g=u(n,h);return`
      <text
        x="${g.x}"
        y="${g.y}"
        font-family="var(--font-family-noto-sans-font-family)"
        font-size="var(--modifiers-normal-body-sm-regular-fontsize)"
        font-weight="var(--weight-regular, 400)"
        fill="var(--modifiers-normal-color-light-fg-2-medium)"
        text-anchor="middle"
        dominant-baseline="middle"
        style="font-size: var(--modifiers-normal-body-sm-regular-fontsize) !important; font-weight: var(--weight-regular, 400) !important; font-family: var(--font-family-noto-sans-font-family) !important;"
      >${c}</text>
    `}).join(""),f=30,T=o+f*2,L=x.y-20,_=o-L+f;return`
    <svg 
      class="ubits-nps-card__gauge-svg" 
      width="${o}" 
      height="${o}" 
      viewBox="${-f} ${L} ${T} ${_}"
      data-half-moon-center="${A}"
      style="overflow: visible; display: block;"
    >
      <!-- Media luna básica (arco gris de fondo) -->
      <path
        d="${B}"
        fill="none"
        stroke="${y}"
        stroke-width="${a}"
        stroke-linecap="round"
      />
      
      <!-- Arco de progreso (relleno hasta el score) -->
      <path
        d="${m}"
        fill="none"
        stroke="${M}"
        stroke-width="${a}"
        stroke-linecap="round"
        class="ubits-nps-card__gauge-progress"
      />
      
      <!-- Números alrededor de la media luna -->
      ${I}
    </svg>
  `}function F(e,o="md"){const a=e.percentage??Y(e.current,e.total),s=o==="sm"?"ubits-body-sm-regular":o==="lg"?"ubits-body-md-regular":"ubits-body-sm-regular",l=o==="sm"?"ubits-body-sm-regular":o==="lg"?"ubits-body-md-regular":"ubits-body-sm-regular";return`
    <div class="ubits-nps-card__category">
      <div class="ubits-nps-card__category-label ${s}">
        ${e.label}
      </div>
      <div class="ubits-nps-card__category-value ${l}">
        ${e.current}/${e.total} <span class="ubits-nps-card__category-percentage ubits-body-md-bold">${a}%</span>
      </div>
    </div>
  `}function O(e){const{title:o="Nivel de confianza",score:a=0,scoreLabel:s="Puntuación",totalResponses:l=0,responsesLabel:p="respuestas",categories:y=[],size:b="md",showTitle:t=!0,showResponsesCount:C=!0,showGauge:v=!0,showCategories:i=!0,showInfoIcon:V=!1,showActionButton:u=!1,lowColor:d="var(--modifiers-normal-color-light-feedback-accent-error)",mediumColor:w="var(--modifiers-normal-color-light-feedback-accent-warning)",highColor:B="var(--modifiers-normal-color-light-feedback-accent-success)",gaugeBackgroundColor:M="var(--modifiers-normal-color-light-bg-3)",className:r="",attributes:$={}}=e,z=["ubits-nps-card",`ubits-nps-card--${b}`,r].filter(Boolean).join(" "),P=[...Object.entries($).map(([N,G])=>`${N}="${G}"`)].filter(Boolean).join(" "),m=360,x=24,R="ubits-body-md-bold",A="ubits-body-sm-regular",S="ubits-display-3-bold",I="ubits-body-sm-bold",f=V?j({variant:"tertiary",size:"sm",icon:"circle-info",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Información",type:"button"}}):"",T=u?j({variant:"tertiary",size:"sm",icon:"chevron-right",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Ver más",type:"button"}}):"",L=t||C?`
      <div class="ubits-nps-card__header" style="margin-bottom: -16px !important; padding-bottom: 0 !important;">
        <div class="ubits-nps-card__title-group">
          ${t?`<h3 class="ubits-nps-card__title ${R}">${o}</h3>`:""}
          ${f}
        </div>
        ${C?`<div class="ubits-nps-card__responses-count ${A}">${l} ${p}</div>`:""}
        ${T?`<div class="ubits-nps-card__action-button">${T}</div>`:""}
      </div>
    `:"",_=x/2,c=(m-_*2)/2,g=(m-_-c*.75)/m*100,E=v?`
      <div class="ubits-nps-card__gauge-wrapper" style="--text-position: ${g}%;">
        ${q(a,m,x,d,w,B,M)}
        <div class="ubits-nps-card__gauge-content">
          <div class="ubits-nps-card__gauge-score ${S}">
            ${a}
          </div>
          <div class="ubits-nps-card__gauge-label ${I}">
            ${s}
          </div>
        </div>
      </div>
    `:"",H=i&&y.length>0?`
      <div class="ubits-nps-card__categories">
        ${y.map(N=>F(N,b)).join("")}
      </div>
    `:"",D=!i||y.length===0?"padding-bottom: 12px;":"";return`
    <div class="${z}" ${P}>
      ${L}
      <div class="ubits-nps-card__content" style="${D}">
        ${E}
        ${H}
      </div>
    </div>
  `}const W={title:"Charts/NPS Card",tags:["autodocs"],parameters:{docs:{description:{component:"Componente NPSCard UBITS para mostrar métricas NPS (Net Promoter Score) con gauge semicircular. Incluye segmentos de color (rojo, amarillo, verde), aguja indicadora, categorías con porcentajes y contador de respuestas. Usa tokens UBITS para colores, tipografía y espaciado."}}},argTypes:{title:{control:{type:"text"},description:"Título del componente",table:{defaultValue:{summary:"Nivel de confianza"},type:{summary:"string"}}},score:{control:{type:"number",min:0,max:100,step:1},description:"Puntuación principal mostrada en el gauge (0-100)",table:{defaultValue:{summary:"0"},type:{summary:"number"}}},scoreLabel:{control:{type:"text"},description:'Etiqueta del score (ej: "Puntuación")',table:{defaultValue:{summary:"Puntuación"},type:{summary:"string"}}},totalResponses:{control:{type:"number",min:0,step:1},description:"Número total de respuestas",table:{defaultValue:{summary:"0"},type:{summary:"number"}}},responsesLabel:{control:{type:"text"},description:'Texto para mostrar las respuestas (ej: "respuestas")',table:{defaultValue:{summary:"respuestas"},type:{summary:"string"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del componente",table:{defaultValue:{summary:"md"},type:{summary:"sm | md | lg"}}},showTitle:{control:{type:"boolean"},description:"Mostrar el título",table:{defaultValue:{summary:"true"}}},showResponsesCount:{control:{type:"boolean"},description:"Mostrar el contador de respuestas",table:{defaultValue:{summary:"true"}}},showGauge:{control:{type:"boolean"},description:"Mostrar el gauge semicircular",table:{defaultValue:{summary:"true"}}},showCategories:{control:{type:"boolean"},description:"Mostrar las categorías",table:{defaultValue:{summary:"true"}}},showInfoIcon:{control:{type:"boolean"},description:"Mostrar icono de información junto al título",table:{defaultValue:{summary:"false"}}},showActionButton:{control:{type:"boolean"},description:"Mostrar botón de acción con flecha a la derecha en la esquina superior derecha",table:{defaultValue:{summary:"false"}}},lowColor:{control:{type:"color"},description:"Color del gauge para el segmento rojo (0-20)",table:{defaultValue:{summary:"var(--modifiers-normal-color-light-feedback-accent-error)"},type:{summary:"string"}}},mediumColor:{control:{type:"color"},description:"Color del gauge para el segmento amarillo (20-60)",table:{defaultValue:{summary:"var(--modifiers-normal-color-light-feedback-accent-warning)"},type:{summary:"string"}}},highColor:{control:{type:"color"},description:"Color del gauge para el segmento verde (60-100)",table:{defaultValue:{summary:"var(--modifiers-normal-color-light-feedback-accent-success)"},type:{summary:"string"}}},gaugeBackgroundColor:{control:{type:"color"},description:"Color de fondo del gauge (token UBITS o color hexadecimal)",table:{defaultValue:{summary:"var(--modifiers-normal-color-light-bg-3)"},type:{summary:"string"}}},category1Label:{control:{type:"text"},description:"Etiqueta de la categoría 1",table:{defaultValue:{summary:"No tienen confianza"},type:{summary:"string"}}},category1Current:{control:{type:"number",min:0,step:1},description:"Valor actual de la categoría 1",table:{defaultValue:{summary:"50"},type:{summary:"number"}}},category1Total:{control:{type:"number",min:1,step:1},description:"Valor total de la categoría 1",table:{defaultValue:{summary:"100"},type:{summary:"number"}}},category1Color:{control:{type:"color"},description:"Color de la categoría 1",table:{defaultValue:{summary:"var(--modifiers-normal-color-light-feedback-accent-error)"},type:{summary:"string"}}},category2Label:{control:{type:"text"},description:"Etiqueta de la categoría 2",table:{defaultValue:{summary:"Neutrales"},type:{summary:"string"}}},category2Current:{control:{type:"number",min:0,step:1},description:"Valor actual de la categoría 2",table:{defaultValue:{summary:"10"},type:{summary:"number"}}},category2Total:{control:{type:"number",min:1,step:1},description:"Valor total de la categoría 2",table:{defaultValue:{summary:"100"},type:{summary:"number"}}},category2Color:{control:{type:"color"},description:"Color de la categoría 2",table:{defaultValue:{summary:"var(--modifiers-normal-color-light-feedback-accent-warning)"},type:{summary:"string"}}},category3Label:{control:{type:"text"},description:"Etiqueta de la categoría 3",table:{defaultValue:{summary:"Tienen confianza"},type:{summary:"string"}}},category3Current:{control:{type:"number",min:0,step:1},description:"Valor actual de la categoría 3",table:{defaultValue:{summary:"30"},type:{summary:"number"}}},category3Total:{control:{type:"number",min:1,step:1},description:"Valor total de la categoría 3",table:{defaultValue:{summary:"100"},type:{summary:"number"}}},category3Color:{control:{type:"color"},description:"Color de la categoría 3",table:{defaultValue:{summary:"var(--modifiers-normal-color-light-feedback-accent-success)"},type:{summary:"string"}}}}};function U(e){if(!e)return[];const o=[];return e.category1Label!==void 0&&o.push({label:e.category1Label||"No tienen confianza",current:e.category1Current??50,total:e.category1Total??100,color:e.category1Color||"var(--modifiers-normal-color-light-feedback-accent-error)"}),e.category2Label!==void 0&&o.push({label:e.category2Label||"Neutrales",current:e.category2Current??10,total:e.category2Total??100,color:e.category2Color||"var(--modifiers-normal-color-light-feedback-accent-warning)"}),e.category3Label!==void 0&&o.push({label:e.category3Label||"Tienen confianza",current:e.category3Current??30,total:e.category3Total??100,color:e.category3Color||"var(--modifiers-normal-color-light-feedback-accent-success)"}),o}const k={args:{title:"Nivel de confianza",score:56,scoreLabel:"Puntuación",totalResponses:290,responsesLabel:"respuestas",size:"md",showTitle:!0,showResponsesCount:!0,showGauge:!0,showCategories:!0,showInfoIcon:!0,showActionButton:!0,lowColor:"#E53E3E",mediumColor:"#F6AD55",highColor:"#38A169",gaugeBackgroundColor:"var(--modifiers-normal-color-light-bg-2)",category1Label:"No tienen confianza",category1Current:50,category1Total:100,category1Color:"#E53E3E",category2Label:"Neutrales",category2Current:10,category2Total:100,category2Color:"#F6AD55",category3Label:"Tienen confianza",category3Current:30,category3Total:100,category3Color:"#38A169"},render:e=>{const o=U(e),a={title:e.title,score:e.score??0,scoreLabel:e.scoreLabel,totalResponses:e.totalResponses??0,responsesLabel:e.responsesLabel,categories:o,size:e.size,showTitle:e.showTitle,showResponsesCount:e.showResponsesCount,showGauge:e.showGauge,showCategories:e.showCategories,showInfoIcon:e.showInfoIcon,showActionButton:e.showActionButton,lowColor:e.lowColor,mediumColor:e.mediumColor,highColor:e.highColor,gaugeBackgroundColor:e.gaugeBackgroundColor},s=document.createElement("div");s.style.cssText="width: 100%; padding: 24px; background: var(--modifiers-normal-color-light-bg-2); border: 1px solid var(--modifiers-normal-color-light-border-1);";const l=document.createElement("div");l.style.cssText="max-width: 500px; width: 100%; margin: 0 auto; padding: 24px;";const p=O(a);return l.innerHTML=p,s.appendChild(l),s}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    lowColor: '#E53E3E',
    mediumColor: '#F6AD55',
    highColor: '#38A169',
    gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-2)',
    category1Label: 'No tienen confianza',
    category1Current: 50,
    category1Total: 100,
    category1Color: '#E53E3E',
    category2Label: 'Neutrales',
    category2Current: 10,
    category2Total: 100,
    category2Color: '#F6AD55',
    category3Label: 'Tienen confianza',
    category3Current: 30,
    category3Total: 100,
    category3Color: '#38A169'
  },
  render: args => {
    // Construir las categorías desde los args
    const categories = buildCategories(args);

    // Construir las opciones del componente
    const options: NPSCardOptions = {
      title: args.title,
      score: args.score ?? 0,
      scoreLabel: args.scoreLabel,
      totalResponses: args.totalResponses ?? 0,
      responsesLabel: args.responsesLabel,
      categories,
      size: args.size,
      showTitle: args.showTitle,
      showResponsesCount: args.showResponsesCount,
      showGauge: args.showGauge,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      lowColor: args.lowColor,
      mediumColor: args.mediumColor,
      highColor: args.highColor,
      gaugeBackgroundColor: args.gaugeBackgroundColor
    };

    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; padding: 24px; background: var(--modifiers-normal-color-light-bg-2); border: 1px solid var(--modifiers-normal-color-light-border-1);';

    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto; padding: 24px;';

    // Renderizar card
    const cardHTML = renderNPSCard(options);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    return container;
  }
}`,...k.parameters?.docs?.source}}};const ee=["Default"];export{k as Default,ee as __namedExportsOrder,W as default};
