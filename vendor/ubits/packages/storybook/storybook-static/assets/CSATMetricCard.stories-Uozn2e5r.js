import{r as p}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function S(a,e="regular",t){const s=e==="solid"?"fas":"far",o=a.startsWith("fa-")?a:`fa-${a}`,r=t?`style="color: ${t};"`:"";return`<i class="${s} ${o}" ${r}></i>`}const L=[{icon:"face-angry",label:"Muy malo",color:"var(--ubits-feedback-accent-error)"},{icon:"face-sad-tear",label:"Malo",color:"var(--ubits-feedback-fg-warning-subtle-hover)"},{icon:"face-meh",label:"Regular",color:"var(--ubits-feedback-accent-info)"},{icon:"face-smile",label:"Bueno",color:"var(--ubits-feedback-accent-success)"},{icon:"face-smile-beam",label:"Muy bueno",color:"var(--ubits-feedback-accent-success)"}];function H(a){const t=Math.round(a),s=Math.min(Math.max(t-1,0),4);let o="";for(let r=0;r<5;r++){const c=L[r],n=r===s,l=n?"ubits-csat-metric-card__face ubits-csat-metric-card__face--selected":"ubits-csat-metric-card__face ubits-csat-metric-card__face--empty",d=n?c.color:"var(--modifiers-normal-color-light-border-1)";o+=`
      <div class="ubits-csat-metric-card__face-wrapper">
        <i class="far fa-${c.icon} ${l}" style="color: ${d};"></i>
        <span class="ubits-csat-metric-card__face-label">${c.label}</span>
      </div>
    `}return o}function A(a){const{title:e,totalResponses:t=0,responsesLabel:s="respuestas",average:o=0,averageLabel:r="Promedio:",score:c=0,titleIcon:n,titleIconStyle:l="regular",titleIconColor:d,showInfoIcon:b=!1,showActionButton:y=!1,size:f="md",className:g="",attributes:v={}}=a,h=["ubits-csat-metric-card",`ubits-csat-metric-card--${f}`,g].filter(Boolean).join(" "),_=[...Object.entries(v).map(([w,T])=>`${w}="${T}"`)].filter(Boolean).join(" "),x=n?`<div class="ubits-csat-metric-card__title-icon">${S(n,l,d)}</div>`:"",C=b?p({variant:"tertiary",size:"sm",icon:"circle-info",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Información",type:"button"}}):"",u=y?p({variant:"tertiary",size:"sm",icon:"chevron-right",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Ver más",type:"button"}}):"",$="ubits-body-md-bold",m="ubits-body-sm-regular",I=o.toFixed(2),M=H(c);return`
    <div class="${h}" ${_}>
      <div class="ubits-csat-metric-card__header">
        ${x}
        <div class="ubits-csat-metric-card__title-group">
          <h3 class="ubits-csat-metric-card__title ${$}">${e}</h3>
          ${C}
        </div>
        ${u?`<div class="ubits-csat-metric-card__action-button">${u}</div>`:""}
      </div>
      <div class="ubits-csat-metric-card__body">
        <div class="ubits-csat-metric-card__stats">
          <span class="ubits-csat-metric-card__responses ${m}">${t} ${s}</span>
          <span class="ubits-csat-metric-card__average ${m}">${r} (${I})</span>
        </div>
        <div class="ubits-csat-metric-card__chart">
          <div class="ubits-csat-metric-card__faces">
            ${M}
          </div>
        </div>
      </div>
    </div>
  `}const j={title:"Charts/CSAT Metric Card",tags:["autodocs"],parameters:{docs:{description:{component:"Componente CSATMetricCard UBITS para mostrar métricas CSAT (Customer Satisfaction) con caritas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 caritas con textos. Usa tokens UBITS para colores, tipografía y espaciado."}}},argTypes:{title:{control:{type:"text"},description:"Título de la métrica",table:{defaultValue:{summary:"Califica el producto"},type:{summary:"string"}}},totalResponses:{control:{type:"number",min:0,step:1},description:"Número total de respuestas",table:{defaultValue:{summary:"0"},type:{summary:"number"}}},responsesLabel:{control:{type:"text"},description:"Etiqueta para las respuestas",table:{defaultValue:{summary:"respuestas"},type:{summary:"string"}}},average:{control:{type:"number",min:0,max:5,step:.01},description:"Promedio de calificación (0-5)",table:{defaultValue:{summary:"0"},type:{summary:"number"}}},averageLabel:{control:{type:"text"},description:"Etiqueta para el promedio",table:{defaultValue:{summary:"Promedio:"},type:{summary:"string"}}},score:{control:{type:"number",min:0,max:5,step:.5},description:"Score actual (0-5) para mostrar en las caritas",table:{defaultValue:{summary:"0"},type:{summary:"number"}}},titleIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el título (sin prefijo fa-)",table:{type:{summary:"string"},example:{summary:"star, chart-line, thumbs-up, etc."}}},titleIconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono del título",table:{defaultValue:{summary:"regular"},type:{summary:"regular | solid"}}},titleIconColor:{control:{type:"color"},description:"Color del icono del título (puede usar tokens UBITS como var(--modifiers-normal-color-light-fg-2-medium))",table:{type:{summary:"string"}}},showInfoIcon:{control:{type:"boolean"},description:"Mostrar icono de información junto al título",table:{defaultValue:{summary:"false"}}},showActionButton:{control:{type:"boolean"},description:"Mostrar botón de acción con flecha a la derecha en la esquina superior derecha",table:{defaultValue:{summary:"false"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño de la tarjeta",table:{defaultValue:{summary:"md"},type:{summary:"sm | md | lg"}}}}},i={args:{title:"Califica el producto",totalResponses:7,responsesLabel:"respuestas",average:4,averageLabel:"Promedio:",score:3,showInfoIcon:!0,showActionButton:!0,size:"md"},render:a=>{const e=document.createElement("div");e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="flex-start",e.style.padding="48px",e.style.background="var(--modifiers-normal-color-light-bg-2)",e.style.border="1px solid var(--modifiers-normal-color-light-border-1)",e.style.borderRadius="8px)",e.style.minHeight="200px";const t=document.createElement("div");t.style.maxWidth="400px",t.style.width="100%";const s=A(a);return t.innerHTML=s,e.appendChild(t),e}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
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
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    container.style.borderRadius = '8px)';
    container.style.minHeight = '200px';

    // Crear wrapper para la card (max-width 400px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '400px';
    wrapper.style.width = '100%';

    // Renderizar card
    const cardHTML = renderCSATMetricCard(args);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    return container;
  }
}`,...i.parameters?.docs?.source}}};const z=["Default"];export{i as Default,z as __namedExportsOrder,j as default};
