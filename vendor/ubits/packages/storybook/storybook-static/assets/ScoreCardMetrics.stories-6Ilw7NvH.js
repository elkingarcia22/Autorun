import{r as u}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function M(s,t="regular",e){const a=t==="solid"?"fas":"far",o=s.startsWith("fa-")?s:`fa-${s}`,r=e?`style="color: ${e};"`:"";return`<i class="${a} ${o}" ${r}></i>`}function T(s){const e=Math.round(s),a=5-e;let o="";for(let r=0;r<e;r++){const i=r+1;o+=`
      <div class="ubits-score-card-metrics__star-wrapper">
        <i class="fas fa-star ubits-score-card-metrics__star ubits-score-card-metrics__star--filled"></i>
        <span class="ubits-score-card-metrics__star-number">${i}</span>
      </div>
    `}for(let r=0;r<a;r++){const i=e+r+1;o+=`
      <div class="ubits-score-card-metrics__star-wrapper">
        <i class="far fa-star ubits-score-card-metrics__star ubits-score-card-metrics__star--empty"></i>
        <span class="ubits-score-card-metrics__star-number">${i}</span>
      </div>
    `}return o}function H(s){const{title:t,totalResponses:e=0,responsesLabel:a="respuestas",average:o=0,averageLabel:r="Promedio:",score:i=0,leftLabel:V="0",rightLabel:B="5",chartDescription:E="0 a 5 del gráfico",titleIcon:c,titleIconStyle:m="regular",titleIconColor:p,showInfoIcon:y=!1,showActionButton:b=!1,size:f="md",className:g="",attributes:v={}}=s,h=["ubits-score-card-metrics",`ubits-score-card-metrics--${f}`,g].filter(Boolean).join(" "),_=[...Object.entries(v).map(([C,S])=>`${C}="${S}"`)].filter(Boolean).join(" "),L=c?`<div class="ubits-score-card-metrics__title-icon">${M(c,m,p)}</div>`:"",$=y?u({variant:"tertiary",size:"sm",icon:"circle-info",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Información",type:"button"}}):"",l=b?u({variant:"tertiary",size:"sm",icon:"chevron-right",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Ver más",type:"button"}}):"",x="ubits-body-md-bold",d="ubits-body-sm-regular",I=o.toFixed(2),w=T(i);return`
    <div class="${h}" ${_}>
      <div class="ubits-score-card-metrics__header">
        ${L}
        <div class="ubits-score-card-metrics__title-group">
          <h3 class="ubits-score-card-metrics__title ${x}">${t}</h3>
          ${$}
        </div>
        ${l?`<div class="ubits-score-card-metrics__action-button">${l}</div>`:""}
      </div>
      <div class="ubits-score-card-metrics__body">
        <div class="ubits-score-card-metrics__stats">
          <span class="ubits-score-card-metrics__responses ${d}">${e} ${a}</span>
          <span class="ubits-score-card-metrics__average ${d}">${r} (${I})</span>
        </div>
        <div class="ubits-score-card-metrics__chart">
          <div class="ubits-score-card-metrics__stars">
            ${w}
          </div>
        </div>
      </div>
    </div>
  `}const P={title:"Charts/Score Card Metrics",tags:["autodocs"],parameters:{docs:{description:{component:"Componente ScoreCardMetrics UBITS para mostrar métricas de calificación con estrellas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 estrellas, etiquetas y descripción. Usa tokens UBITS para colores, tipografía y espaciado."}}},argTypes:{title:{control:{type:"text"},description:"Título de la métrica",table:{defaultValue:{summary:"Califica el producto"},type:{summary:"string"}}},totalResponses:{control:{type:"number",min:0,step:1},description:"Número total de respuestas",table:{defaultValue:{summary:"0"},type:{summary:"number"}}},responsesLabel:{control:{type:"text"},description:"Etiqueta para las respuestas",table:{defaultValue:{summary:"respuestas"},type:{summary:"string"}}},average:{control:{type:"number",min:0,max:5,step:.01},description:"Promedio de calificación (0-5)",table:{defaultValue:{summary:"0"},type:{summary:"number"}}},averageLabel:{control:{type:"text"},description:"Etiqueta para el promedio",table:{defaultValue:{summary:"Promedio:"},type:{summary:"string"}}},score:{control:{type:"number",min:0,max:5,step:.5},description:"Score actual (0-5) para mostrar en las estrellas",table:{defaultValue:{summary:"0"},type:{summary:"number"}}},leftLabel:{control:{type:"text"},description:"Etiqueta izquierda del gráfico",table:{defaultValue:{summary:"0"},type:{summary:"string"}}},rightLabel:{control:{type:"text"},description:"Etiqueta derecha del gráfico",table:{defaultValue:{summary:"5"},type:{summary:"string"}}},titleIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el título (sin prefijo fa-)",table:{type:{summary:"string"},example:{summary:"star, chart-line, thumbs-up, etc."}}},titleIconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono del título",table:{defaultValue:{summary:"regular"},type:{summary:"regular | solid"}}},titleIconColor:{control:{type:"color"},description:"Color del icono del título (puede usar tokens UBITS como var(--modifiers-normal-color-light-fg-2-medium))",table:{type:{summary:"string"}}},showInfoIcon:{control:{type:"boolean"},description:"Mostrar icono de información junto al título",table:{defaultValue:{summary:"false"}}},showActionButton:{control:{type:"boolean"},description:"Mostrar botón de acción con flecha a la derecha en la esquina superior derecha",table:{defaultValue:{summary:"false"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño de la tarjeta",table:{defaultValue:{summary:"md"},type:{summary:"sm | md | lg"}}}}},n={args:{title:"Califica el producto",totalResponses:7,responsesLabel:"respuestas",average:4,averageLabel:"Promedio:",score:3,leftLabel:"0",rightLabel:"5",showInfoIcon:!0,showActionButton:!0,size:"md"},render:s=>{const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="flex-start",t.style.background="var(--modifiers-normal-color-light-bg-2)",t.style.minHeight="200px";const e=document.createElement("div");e.style.maxWidth="400px",e.style.width="100%";const a=H(s);return e.innerHTML=a,t.appendChild(e),t}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: true,
    showActionButton: true,
    size: 'md'
  },
  render: args => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.minHeight = '200px';

    // Crear wrapper para la card (max-width 400px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '400px';
    wrapper.style.width = '100%';

    // Renderizar card
    const cardHTML = renderScoreCardMetrics(args);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    return container;
  }
}`,...n.parameters?.docs?.source}}};const k=["Default"];export{n as Default,k as __namedExportsOrder,P as default};
