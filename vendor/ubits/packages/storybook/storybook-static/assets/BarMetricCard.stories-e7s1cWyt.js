import{r as X}from"./ButtonProvider-CX_wJeLD.js";import{r as oe}from"./ProgressProvider-DCMY_PMl.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function te(e,o){return o===0?0:Math.round(e/o*100)}function re(e){if(e.length===0)return{max:100,min:0};const o=Math.max(...e),s=Math.min(...e),c=Math.ceil(o/20)*20,i=Math.floor(s/20)*20;return{max:c||100,min:i||0}}const ee={xs:4,sm:8,md:16,lg:20};function ae(e,o=[],s,c,i="var(--ubits-chart-color-bg-neutral-blue-base)",$="var(--modifiers-normal-color-light-bg-1)",v="var(--modifiers-normal-color-light-border-1)",d=360,b=158,f=!0,C=!0,Y="md"){const D=f?e:e.filter(t=>t>=0),U=s!==void 0&&c!==void 0?{max:s,min:f?c:0}:re(D),{max:w,min:x}=U,z=w-x;e.length;const k=Math.max(30,Math.min(35,d*.08)),B=4,h=8,R=25,V=b-h-R,y=h+w/z*V,j=e.map((t,r)=>{const l=f?t:Math.max(0,t),u=l>=0;let g;if(u)g=l/w*(y-h);else{const p=Math.abs(x);g=Math.abs(l)/p*(h+V-y)}const n=g>=.5&&Math.abs(l)>=.01;return{index:r,value:l,label:o[r]||`${r+1}`,isPositive:u,shouldRender:n}}).filter(t=>t.shouldRender),H=j.length;if(H===0)return`
      <svg 
        class="ubits-bar-metric-card__chart-svg" 
        width="100%" 
        height="100%" 
        viewBox="0 0 ${d} ${b}"
        preserveAspectRatio="none"
      >
      </svg>
    `;const G=H-1,S=ee[Y]||ee.md,P=6,q=H*S,O=G*P,E=q+O,T=k+8,_=d-T-B-E,Q=G>0?P+_/G:0,A=j.map((t,r)=>{const l=T+r*(S+Q);let u,g;if(t.isPositive)g=t.value/w*(y-h),u=y-g;else{const n=Math.abs(x);g=Math.abs(t.value)/n*(h+V-y),u=y}return{x:l,y:u,width:S,height:g,value:t.value,label:t.label,isPositive:t.isPositive,index:t.index}}),a=[],L=5;for(let t=0;t<=L;t++){const r=x+z/L*t,l=h+(w-r)/z*V;a.push({y:l,value:Math.round(r)})}const M=A[A.length-1];return M&&M.x+M.width,A[0]?.x,`
    <svg 
      class="ubits-bar-metric-card__chart-svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 ${d} ${b}"
      preserveAspectRatio="none"
    >
      <!-- Números del eje Y (siempre visibles) -->
      ${a.map(t=>`
        <text
          x="${k-5}"
          y="${t.y+4}"
          font-family="var(--font-sans)"
          font-size="var(--font-body-sm-size, 13px)"
          font-weight="var(--weight-regular, 400)"
          fill="var(--modifiers-normal-color-light-fg-2-medium)"
          text-anchor="end"
          style="font-size: var(--font-body-sm-size, 13px) !important; font-weight: var(--weight-regular, 400) !important;"
        >${t.value}</text>
      `).join("")}
      
      <!-- Líneas de grilla horizontales (solo si showGridLines está activado) -->
      ${C?a.map(t=>`
        <line
          x1="${T}"
          y1="${t.y}"
          x2="${d-B}"
          y2="${t.y}"
          stroke="${v}"
          stroke-width="1"
          stroke-dasharray="2,2"
          opacity="0.3"
        />
      `).join(""):""}
      
      <!-- Línea cero si hay valores negativos y positivos -->
      ${C&&x<0&&w>0?`
        <line
          x1="${T}"
          y1="${y}"
          x2="${d-B}"
          y2="${y}"
          stroke="${v}"
          stroke-width="1.5"
          opacity="0.6"
        />
      `:""}
      
      <!-- Línea vertical del eje Y -->
      ${C?`
        <line
          x1="${k}"
          y1="${h}"
          x2="${k}"
          y2="${b-R}"
          stroke="${v}"
          stroke-width="1"
          opacity="0.6"
        />
      `:""}
      
      <!-- Barras -->
      ${A.map(t=>{const r=t.width/2,l=t.isPositive;let u;if(l){const n=t.x,p=t.y,m=t.x+t.width;t.y,t.x+t.width;const N=t.y+t.height;t.x,t.y+t.height,u=`M ${n} ${p+r} Q ${n} ${p} ${n+r} ${p} L ${m-r} ${p} Q ${m} ${p} ${m} ${p+r} L ${m} ${N} L ${n} ${N} Z`}else{const n=t.x,p=t.y,m=t.x+t.width,N=t.y;t.x+t.width;const I=t.y+t.height;t.x,t.y+t.height,u=`M ${n} ${p} L ${m} ${N} L ${m} ${I-r} Q ${m} ${I} ${m-r} ${I} L ${n+r} ${I} Q ${n} ${I} ${n} ${I-r} Z`}return`
        <g class="ubits-bar-metric-card__bar-group">
          <path
            d="${u}"
            fill="${i}"
            class="ubits-bar-metric-card__bar"
          />
          <text
          x="${t.x+t.width/2}"
          y="${b-5}"
          font-family="var(--font-sans)"
          font-size="var(--font-body-sm-size, 13px)"
          font-weight="var(--weight-regular, 400)"
          class="ubits-bar-metric-card__bar-label"
          fill="var(--modifiers-normal-color-light-fg-2-medium)"
          text-anchor="middle"
          style="font-size: var(--font-body-sm-size, 13px) !important; font-weight: var(--weight-regular, 400) !important; font-family: var(--font-sans) !important;"
        >${t.label}</text>
        </g>
      `}).join("")}
    </svg>
  `}function ne(e,o="md"){const s=e.percentage??te(e.current,e.total),c=o==="sm"?"ubits-body-sm-regular":o==="lg"?"ubits-body-md-regular":"ubits-body-sm-regular",i=o==="sm"?"ubits-body-sm-regular":o==="lg"?"ubits-body-md-regular":"ubits-body-sm-regular";return`
    <div class="ubits-bar-metric-card__category">
      <div class="ubits-bar-metric-card__category-label ${c}">
        ${e.label}
      </div>
      <div class="ubits-bar-metric-card__category-value ${i}">
        ${e.current}/${e.total} <span class="ubits-bar-metric-card__category-percentage ubits-body-md-bold">${s}%</span>
      </div>
    </div>
  `}function se(e,o="md",s="var(--ubits-chart-color-bg-neutral-blue-base)"){const c=e.percentage??te(e.current,e.total),i=o==="sm"?"ubits-body-sm-regular":o==="lg"?"ubits-body-md-regular":"ubits-body-sm-regular",$="ubits-body-md-bold",d=oe({size:o==="sm"?"sm":o==="lg"?"lg":"md",value:c,variant:"default",indicator:!1,className:"ubits-bar-metric-card__progress-bar"}),b=`<span class="ubits-progress-bar__indicator">${e.current}/${e.total} <span class="${$}">${c}%</span></span>`,f=d.replace(/(<\/div>\s*)(<\/div>\s*)$/,`$1${b}$2`);return`
    <div class="ubits-bar-metric-card__category ubits-bar-metric-card__category--with-progress">
      <div class="ubits-bar-metric-card__category-header">
        <div class="ubits-bar-metric-card__category-label ${i}">
          ${e.label}
        </div>
      </div>
      <div class="ubits-bar-metric-card__category-progress-wrapper">
        ${f}
      </div>
    </div>
  `}function ie(e){const{title:o="Métricas",responseCount:s=0,showResponseCount:c=!1,barData:i=[],barLabels:$=[],maxValue:v,minValue:d,categories:b=[],layout:f="vertical",size:C="md",showTitle:Y=!0,showBarChart:D=!0,showCategories:U=!0,showInfoIcon:w=!0,showActionButton:x=!0,showNegativeValues:z=!0,showGridLines:k=!0,barColor:B="var(--ubits-chart-color-bg-neutral-blue-base)",chartBackgroundColor:h="var(--modifiers-normal-color-light-bg-1)",gridLineColor:R="var(--modifiers-normal-color-light-border-1)",className:V="",attributes:y={}}=e,F=["ubits-bar-metric-card",`ubits-bar-metric-card--${f}`,`ubits-bar-metric-card--${C}`,V].filter(Boolean).join(" "),j=[...Object.entries(y).map(([a,L])=>`${a}="${L}"`)].filter(Boolean).join(" "),S=392-12*2,P=158,q="ubits-body-md-bold",O=w?X({variant:"tertiary",size:"sm",icon:"circle-info",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Información",type:"button"}}):"",E=x?X({variant:"tertiary",size:"sm",icon:"chevron-right",iconStyle:"regular",iconOnly:!0,attributes:{"aria-label":"Ver más",type:"button"}}):"",J=c&&s!==void 0?`
      <div class="ubits-bar-metric-card__response-count">
        <span class="ubits-body-xs-regular">${s} ${s===1?"respuesta":"respuestas"}</span>
      </div>
    `:"",T=Y?`
      <div class="ubits-bar-metric-card__header">
        <div class="ubits-bar-metric-card__title-group">
          <h3 class="ubits-bar-metric-card__title ${q}">${o}</h3>
          ${O}
        </div>
        ${E?`<div class="ubits-bar-metric-card__action-button">${E}</div>`:""}
      </div>
      ${J}
    `:"",K=a=>{if(typeof window<"u"&&window.document&&window.getComputedStyle)try{const M=document.documentElement,Z=a.replace(/var\(|\)/g,"").trim(),t=getComputedStyle(M).getPropertyValue(Z).trim();if(t)return t.replace(/\)+$/,"").trim();{const r=Array.from(document.styleSheets);let l=null;for(const u of r)try{const g=Array.from(u.cssRules||[]);for(const n of g)if(n instanceof CSSStyleRule&&n.selectorText===":root"){const m=n.style.getPropertyValue(Z);if(m){l=m.trim().replace(/\)+$/,"").trim();break}}if(l)break}catch{}if(l)return l}}catch{}if(a==="var(--ubits-chart-color-bg-neutral-blue-base)")return"#557593";const L=a.replace(/\)+$/,"").trim();return L!==a?L:a};let _=B.startsWith("var(")?K(B):B;_=_.replace(/\)+$/,"").trim();const Q=D&&i.length>0&&f!=="horizontal"?(()=>{const a=ae(i,$,v,d,_,h,R,S,P,e.showNegativeValues!==void 0?e.showNegativeValues:!0,e.showGridLines!==void 0?e.showGridLines:!0,C);return`
          <div class="ubits-bar-metric-card__chart-wrapper" style="background-color: ${h};">
            <div class="ubits-bar-metric-card__chart-inner">
              ${a}
            </div>
          </div>
        `})():"",A=U&&b.length>0?f==="horizontal"?`
            <div class="ubits-bar-metric-card__categories">
              ${b.map(a=>se(a,C,_)).join("")}
            </div>
          `:`
            <div class="ubits-bar-metric-card__categories">
              ${b.map(a=>ne(a,C)).join("")}
            </div>
          `:"";return`
    <div class="${F}" ${j}>
      ${T}
      <div class="ubits-bar-metric-card__content">
        ${Q}
        ${A}
      </div>
    </div>
  `}const be={title:"Charts/Bar Metric Card",tags:["autodocs"],parameters:{docs:{description:{component:"Componente BarMetricCard UBITS para mostrar métricas con gráfico de barras y categorías. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado."}}},argTypes:{title:{control:{type:"text"},description:"Título del componente",table:{type:{summary:"string"},defaultValue:{summary:"Métricas"},category:"Contenido"}},responseCount:{control:{type:"number"},description:"Cantidad de respuestas",table:{type:{summary:"number"},defaultValue:{summary:"0"},category:"Contenido"}},showResponseCount:{control:{type:"boolean"},description:"Mostrar la cantidad de respuestas",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Visibilidad"}},barData:{control:{type:"object"},description:"Array de valores para las barras (pueden ser positivos o negativos)",table:{type:{summary:"number[]"},category:"Gráfico"}},barLabels:{control:{type:"object"},description:"Etiquetas para las barras (opcional)",table:{type:{summary:"string[]"},category:"Gráfico"}},maxValue:{control:{type:"number"},description:"Valor máximo para el eje Y (opcional, se calcula automáticamente si no se proporciona)",table:{type:{summary:"number"},category:"Gráfico"}},minValue:{control:{type:"number"},description:"Valor mínimo para el eje Y (opcional, se calcula automáticamente si no se proporciona)",table:{type:{summary:"number"},category:"Gráfico"}},layout:{control:{type:"select"},options:["vertical","horizontal"],description:"Layout del componente",table:{type:{summary:"vertical | horizontal"},defaultValue:{summary:"vertical"},category:"Apariencia"}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del componente",table:{type:{summary:"sm | md | lg"},defaultValue:{summary:"md"},category:"Apariencia"}},showTitle:{control:{type:"boolean"},description:"Mostrar el título",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Visibilidad"}},showBarChart:{control:{type:"boolean"},description:"Mostrar el gráfico de barras",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Visibilidad"}},showCategories:{control:{type:"boolean"},description:"Mostrar las categorías",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Visibilidad"}},showInfoIcon:{control:{type:"boolean"},description:"Mostrar icono de información junto al título",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Visibilidad"}},showActionButton:{control:{type:"boolean"},description:"Mostrar botón de acción con flecha a la derecha",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Visibilidad"}},showNegativeValues:{control:{type:"boolean"},description:"Mostrar valores negativos (barras hacia abajo)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Visibilidad"}},showGridLines:{control:{type:"boolean"},description:"Mostrar líneas de guía (grid lines)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Visibilidad"}},barColor:{control:{type:"text"},description:"Color de las barras (token UBITS)",table:{type:{summary:"string"},defaultValue:{summary:"var(--modifiers-normal-color-light-chart-bg-neutral-blue-base)"},category:"Estilo"}},chartBackgroundColor:{control:{type:"text"},description:"Color de fondo del gráfico (token UBITS)",table:{type:{summary:"string"},defaultValue:{summary:"var(--modifiers-normal-color-light-bg-1)"},category:"Estilo"}},gridLineColor:{control:{type:"text"},description:"Color de las líneas de la grilla (token UBITS)",table:{type:{summary:"string"},defaultValue:{summary:"var(--modifiers-normal-color-light-border-1)"},category:"Estilo"}},category1Label:{control:{type:"text"},description:"Etiqueta de la categoría 1",table:{category:"Categorías"}},category1Current:{control:{type:"number"},description:"Valor actual de la categoría 1",table:{category:"Categorías"}},category1Total:{control:{type:"number"},description:"Valor total de la categoría 1",table:{category:"Categorías"}},category2Label:{control:{type:"text"},description:"Etiqueta de la categoría 2",table:{category:"Categorías"}},category2Current:{control:{type:"number"},description:"Valor actual de la categoría 2",table:{category:"Categorías"}},category2Total:{control:{type:"number"},description:"Valor total de la categoría 2",table:{category:"Categorías"}},category3Label:{control:{type:"text"},description:"Etiqueta de la categoría 3",table:{category:"Categorías"}},category3Current:{control:{type:"number"},description:"Valor actual de la categoría 3",table:{category:"Categorías"}},category3Total:{control:{type:"number"},description:"Valor total de la categoría 3",table:{category:"Categorías"}}}},W={args:{title:"Nombre de la pregunta",responseCount:7,showResponseCount:!0,barData:[-25,-15,15,25,35,45,55,5,25,-15,-30,-50],barLabels:["Ago","Ago","Ago","Ago","Ago","Ago","Ago","Ago","Ago","Ago","Ago","Ago"],maxValue:60,minValue:-60,categories:[{label:"Área",current:3,total:20},{label:"Equipo",current:5,total:15},{label:"Propio",current:2,total:10}],layout:"vertical",size:"md",showTitle:!0,showBarChart:!0,showCategories:!0,showInfoIcon:!0,showActionButton:!0,showNegativeValues:!0,showGridLines:!0,barColor:"#557593)",chartBackgroundColor:"var(--modifiers-normal-color-light-bg-1)",gridLineColor:"var(--modifiers-normal-color-light-border-1)"},render:e=>{const o=document.createElement("div");o.style.cssText=`
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;const s=document.createElement("div"),c=`bar-metric-card-container-${Date.now()}`;s.id=c,s.style.cssText=`
      width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `,o.appendChild(s);const i=[];e.category1Label&&e.category1Current!==void 0&&e.category1Total!==void 0&&i.push({label:e.category1Label,current:e.category1Current,total:e.category1Total}),e.category2Label&&e.category2Current!==void 0&&e.category2Total!==void 0&&i.push({label:e.category2Label,current:e.category2Current,total:e.category2Total}),e.category3Label&&e.category3Current!==void 0&&e.category3Total!==void 0&&i.push({label:e.category3Label,current:e.category3Current,total:e.category3Total});const $=i.length>0?i:e.categories||[],v={title:e.title||"Métricas",responseCount:e.responseCount!==void 0?e.responseCount:0,showResponseCount:e.showResponseCount!==void 0?e.showResponseCount:!1,barData:e.barData||[],barLabels:e.barLabels,maxValue:e.maxValue,minValue:e.minValue,categories:$,layout:e.layout||"vertical",size:e.size||"md",showTitle:e.showTitle!==void 0?e.showTitle:!0,showBarChart:e.showBarChart!==void 0?e.showBarChart:!0,showCategories:e.showCategories!==void 0?e.showCategories:!0,showInfoIcon:e.showInfoIcon!==void 0?e.showInfoIcon:!0,showActionButton:e.showActionButton!==void 0?e.showActionButton:!0,showNegativeValues:e.showNegativeValues!==void 0?e.showNegativeValues:!0,showGridLines:e.showGridLines!==void 0?e.showGridLines:!0,barColor:e.barColor||"#557593)",chartBackgroundColor:e.chartBackgroundColor||"var(--modifiers-normal-color-light-bg-1)",gridLineColor:e.gridLineColor||"var(--modifiers-normal-color-light-border-1)",onClick:e.onClick,onAction:e.onAction},d=ie(v);return s.innerHTML=d,o}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [-25, -15, 15, 25, 35, 45, 55, 5, 25, -15, -30, -50],
    barLabels: ['Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago'],
    maxValue: 60,
    minValue: -60,
    categories: [{
      label: 'Área',
      current: 3,
      total: 20
    }, {
      label: 'Equipo',
      current: 5,
      total: 15
    }, {
      label: 'Propio',
      current: 2,
      total: 10
    }],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    showNegativeValues: true,
    showGridLines: true,
    barColor: '#557593)',
    chartBackgroundColor: 'var(--modifiers-normal-color-light-bg-1)',
    gridLineColor: 'var(--modifiers-normal-color-light-border-1)'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.cssText = \`
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    \`;
    const cardContainer = document.createElement('div');
    const containerId = \`bar-metric-card-container-\${Date.now()}\`;
    cardContainer.id = containerId;
    cardContainer.style.cssText = \`
      width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    \`;
    container.appendChild(cardContainer);

    // Construir categorías desde los args
    const categories: BarCategory[] = [];
    if (args.category1Label && args.category1Current !== undefined && args.category1Total !== undefined) {
      categories.push({
        label: args.category1Label,
        current: args.category1Current,
        total: args.category1Total
      });
    }
    if (args.category2Label && args.category2Current !== undefined && args.category2Total !== undefined) {
      categories.push({
        label: args.category2Label,
        current: args.category2Current,
        total: args.category2Total
      });
    }
    if (args.category3Label && args.category3Current !== undefined && args.category3Total !== undefined) {
      categories.push({
        label: args.category3Label,
        current: args.category3Current,
        total: args.category3Total
      });
    }

    // Si no hay categorías en args, usar las del default
    const finalCategories = categories.length > 0 ? categories : args.categories || [];
    const options: BarMetricCardOptions = {
      title: args.title || 'Métricas',
      responseCount: args.responseCount !== undefined ? args.responseCount : 0,
      showResponseCount: args.showResponseCount !== undefined ? args.showResponseCount : false,
      barData: args.barData || [],
      barLabels: args.barLabels,
      maxValue: args.maxValue,
      minValue: args.minValue,
      categories: finalCategories,
      layout: args.layout || 'vertical',
      size: args.size || 'md',
      showTitle: args.showTitle !== undefined ? args.showTitle : true,
      showBarChart: args.showBarChart !== undefined ? args.showBarChart : true,
      showCategories: args.showCategories !== undefined ? args.showCategories : true,
      showInfoIcon: args.showInfoIcon !== undefined ? args.showInfoIcon : true,
      showActionButton: args.showActionButton !== undefined ? args.showActionButton : true,
      showNegativeValues: args.showNegativeValues !== undefined ? args.showNegativeValues : true,
      showGridLines: args.showGridLines !== undefined ? args.showGridLines : true,
      barColor: args.barColor || '#557593)',
      chartBackgroundColor: args.chartBackgroundColor || 'var(--modifiers-normal-color-light-bg-1)',
      gridLineColor: args.gridLineColor || 'var(--modifiers-normal-color-light-border-1)',
      onClick: args.onClick,
      onAction: args.onAction
    };
    const cardHTML = renderBarMetricCard(options);
    cardContainer.innerHTML = cardHTML;
    return container;
  }
}`,...W.parameters?.docs?.source}}};const he=["Default"];export{W as Default,he as __namedExportsOrder,be as default};
