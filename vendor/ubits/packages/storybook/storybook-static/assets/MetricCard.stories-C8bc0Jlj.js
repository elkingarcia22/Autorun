import{r as c}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function _(e,t="regular",r){const o=t==="solid"?"fas":"far",a=e.startsWith("fa-")?e:`fa-${e}`,s=r?`style="color: ${r};"`:"";return`<i class="${o} ${a}" ${s}></i>`}function S(e){return typeof e=="number"?e.toLocaleString("es-ES"):String(e)}function T(e){const{title:t,value:r,label:o,titleIcon:a,titleIconStyle:s="regular",titleIconColor:d,showInfoIcon:u=!1,showActionButton:m=!1,size:i="md",className:p="",attributes:y={}}=e,b=["ubits-metric-card",`ubits-metric-card--${i}`,p].filter(Boolean).join(" "),f=[...Object.entries(y).map(([C,$])=>`${C}="${$}"`)].filter(Boolean).join(" "),g=a?`<div class="ubits-metric-card__title-icon">${_(a,s,d)}</div>`:"",v=u?c({variant:"tertiary",size:"sm",icon:"circle-info",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Información",type:"button"}}):"",l=m?c({variant:"tertiary",size:"sm",icon:"chevron-right",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Ver más",type:"button"}}):"",h="ubits-body-md-regular",I=i==="sm"?"ubits-body-sm-regular":"ubits-body-md-regular",w="ubits-heading-h2",x=S(r);return`
    <div class="${b}" ${f}>
      <div class="ubits-metric-card__header">
        ${g}
        <div class="ubits-metric-card__title-group">
          <h3 class="ubits-metric-card__title ${h}">${t}</h3>
          ${v}
        </div>
        ${l?`<div class="ubits-metric-card__action-button">${l}</div>`:""}
      </div>
      <div class="ubits-metric-card__body">
        <div class="ubits-metric-card__value-wrapper">
          <h2 class="ubits-metric-card__value ${w}">${x}</h2>
          <div class="ubits-metric-card__label ${I}">${o}</div>
        </div>
      </div>
    </div>
  `}const H={title:"Charts/Text Metric Card",tags:["autodocs"],parameters:{docs:{description:{component:"Componente MetricCard UBITS para mostrar métricas numéricas. Usa tokens UBITS para colores, tipografía y espaciado. Soporta iconos, tamaños y es completamente personalizable."}}},argTypes:{title:{control:{type:"text"},description:"Título de la métrica",table:{defaultValue:{summary:"Net confidence score"},type:{summary:"string"}}},value:{control:{type:"text"},description:'Valor principal (puede ser número o string, ej: "200 / 204")',table:{defaultValue:{summary:"200 / 204"},type:{summary:"string | number"}}},label:{control:{type:"text"},description:"Texto descriptivo debajo del valor",table:{defaultValue:{summary:"Colaboradores"},type:{summary:"string"}}},titleIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el título (sin prefijo fa-)",table:{type:{summary:"string"},example:{summary:"user, users, chart-line, etc."}}},titleIconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono del título",table:{defaultValue:{summary:"regular"},type:{summary:"regular | solid"}}},titleIconColor:{control:{type:"color"},description:"Color del icono del título (puede usar tokens UBITS como var(--modifiers-normal-color-light-fg-2-medium))",table:{type:{summary:"string"}}},showInfoIcon:{control:{type:"boolean"},description:"Mostrar icono de información junto al título",table:{defaultValue:{summary:"false"}}},showActionButton:{control:{type:"boolean"},description:"Mostrar botón de acción con flecha a la derecha en la esquina superior derecha",table:{defaultValue:{summary:"false"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño de la tarjeta",table:{defaultValue:{summary:"md"},type:{summary:"sm | md | lg"}}}}},n={args:{title:"Net confidence score",value:"200 / 204",label:"Colaboradores",titleIcon:"user",titleIconStyle:"regular",showInfoIcon:!0,showActionButton:!0,size:"md"},render:e=>{const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="flex-start",t.style.background="var(--modifiers-normal-color-light-bg-2)",t.style.border="1px solid var(--modifiers-normal-color-light-border-1)";const r=document.createElement("div");r.style.width="100%",r.style.maxWidth="400px",r.style.margin="0 auto",r.style.padding="24px";const o=T(e);return r.innerHTML=o,t.appendChild(r),t}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    titleIconStyle: 'regular',
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
    container.style.border = \`1px solid var(--modifiers-normal-color-light-border-1)\`;

    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '400px';
    wrapper.style.margin = '0 auto';
    wrapper.style.padding = '24px';

    // Renderizar card
    const cardHTML = renderMetricCard(args);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    return container;
  }
}`,...n.parameters?.docs?.source}}};const L=["Default"];export{n as Default,L as __namedExportsOrder,H as default};
