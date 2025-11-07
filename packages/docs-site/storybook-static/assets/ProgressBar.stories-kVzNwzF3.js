import{r as f}from"./ProgressProvider-OoWtyPYr.js";import"./iframe-Cv55Ao8S.js";import"./preload-helper-PPVm8Dsz.js";const b={title:"Components/Progress Bar",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Progress Bar personalizado UBITS. Se usa para mostrar progreso de tareas o procesos. Soporta 4 tamaños (xs, sm, md, lg) y dos variantes: default (un solo color) y multi-color (múltiples segmentos con diferentes colores). El segmento gris se calcula automáticamente como el resto que falta para llegar a 100%. Incluye indicador opcional de texto o porcentaje."}},layout:"fullscreen"},argTypes:{size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del progress bar.",table:{type:{summary:"string"},defaultValue:{summary:"md"},category:"Apariencia"}},variant:{control:{type:"select"},options:["default","multi-color"],description:"Variante del progress bar. Default muestra un solo color, multi-color muestra múltiples segmentos.",table:{type:{summary:"string"},defaultValue:{summary:"default"},category:"Apariencia"}},value:{control:{type:"range",min:0,max:100,step:1},description:'Valor del progreso (0-100). Solo se usa cuando variant es "default".',table:{type:{summary:"number"},defaultValue:{summary:0},category:"Comportamiento"}},indicator:{control:{type:"boolean"},description:"Si es true, muestra el porcentaje automáticamente. Si es string, muestra ese texto.",table:{type:{summary:"boolean | string"},defaultValue:{summary:!1},category:"Apariencia"}},numSegments:{control:{type:"number",min:1,max:5,step:1},description:'Número de segmentos activos (1-5). Solo se usa cuando variant es "multi-color".',table:{type:{summary:"number"},defaultValue:{summary:4},category:"Comportamiento"},if:{arg:"variant",eq:"multi-color"}},segment1Value:{control:{type:"range",min:0,max:100,step:1},description:"Valor del segmento 1 (0-100).",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment1Color:{control:{type:"select"},options:["yellow","green","gray","info","error"],description:"Color del segmento 1.",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment2Value:{control:{type:"range",min:0,max:100,step:1},description:"Valor del segmento 2 (0-100).",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment2Color:{control:{type:"select"},options:["yellow","green","gray","info","error"],description:"Color del segmento 2.",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment3Value:{control:{type:"range",min:0,max:100,step:1},description:"Valor del segmento 3 (0-100).",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment3Color:{control:{type:"select"},options:["yellow","green","gray","info","error"],description:"Color del segmento 3.",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment4Value:{control:{type:"range",min:0,max:100,step:1},description:"Valor del segmento 4 (0-100).",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment4Color:{control:{type:"select"},options:["yellow","green","gray","info","error"],description:"Color del segmento 4.",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment5Value:{control:{type:"range",min:0,max:100,step:1},description:"Valor del segmento 5 (0-100).",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}},segment5Color:{control:{type:"select"},options:["yellow","green","gray","info","error"],description:"Color del segmento 5.",table:{category:"Segmentos Multi-color"},if:{arg:"variant",eq:"multi-color"}}}},c={args:{size:"md",variant:"default",value:75,indicator:!0,numSegments:4,segment1Value:30,segment1Color:"info",segment2Value:25,segment2Color:"yellow",segment3Value:20,segment3Color:"green",segment4Value:25,segment4Color:"error",segment5Value:0,segment5Color:"gray"},render:e=>{const i=document.createElement("div");i.style.cssText=`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    `;const s=document.createElement("div");s.style.cssText=`
      width: 100%;
      max-width: 600px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;const m=document.createElement("h2");m.textContent="Progress Bar",m.style.cssText=`
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    `;const g=document.createElement("p");g.textContent="Componente para mostrar el progreso de una tarea o proceso. Puede mostrar un solo valor o múltiples segmentos con diferentes colores.",g.style.cssText=`
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    `;const r=document.createElement("div");r.id=`progress-bar-container-${Date.now()}`,r.style.cssText=`
      width: 100%;
      max-width: 500px;
      margin: 0 auto 24px auto;
    `;let a=null;const u=()=>{if(r.innerHTML="",a){try{a.destroy()}catch{}a=null}let o={size:e.size||"md",variant:e.variant||"default",value:e.value!==void 0?e.value:e.variant==="default"?75:0,indicator:e.indicator!==void 0?e.indicator:!1};if(e.variant==="multi-color"){const n=e.numSegments||4,t=[];n>=1&&t.push({value:e.segment1Value!==void 0?e.segment1Value:30,color:e.segment1Color||"info"}),n>=2&&t.push({value:e.segment2Value!==void 0?e.segment2Value:25,color:e.segment2Color||"yellow"}),n>=3&&t.push({value:e.segment3Value!==void 0?e.segment3Value:20,color:e.segment3Color||"green"}),n>=4&&t.push({value:e.segment4Value!==void 0?e.segment4Value:25,color:e.segment4Color||"error"}),n>=5&&t.push({value:e.segment5Value!==void 0?e.segment5Value:0,color:e.segment5Color||"gray"}),o.segments=t,o.value=void 0}try{const n=f(o);r.innerHTML=n;const t=r.querySelector(".ubits-progress-bar");t&&(a={element:t,destroy:()=>{r.innerHTML=""},update:()=>{}})}catch{}};u();let d=JSON.stringify(e),l=null;(()=>{l||(l=setInterval(()=>{const o=JSON.stringify(e);o!==d&&(d=o,u())},100))})();const p=()=>{if(l&&(clearInterval(l),l=null),r.innerHTML="",a)try{a.destroy()}catch{}};return i.addEventListener("DOMNodeRemoved",p),s.appendChild(m),s.appendChild(g),s.appendChild(r),i.appendChild(s),i}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
    numSegments: 4,
    segment1Value: 30,
    segment1Color: 'info',
    segment2Value: 25,
    segment2Color: 'yellow',
    segment3Value: 20,
    segment3Color: 'green',
    segment4Value: 25,
    segment4Color: 'error',
    segment5Value: 0,
    segment5Color: 'gray'
  },
  render: args => {
    // Crear contenedor fullscreen
    const container = document.createElement('div');
    container.style.cssText = \`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    \`;

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 600px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    \`;

    // Título
    const title = document.createElement('h2');
    title.textContent = 'Progress Bar';
    title.style.cssText = \`
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    \`;

    // Descripción
    const description = document.createElement('p');
    description.textContent = 'Componente para mostrar el progreso de una tarea o proceso. Puede mostrar un solo valor o múltiples segmentos con diferentes colores.';
    description.style.cssText = \`
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    \`;

    // Contenedor para el progress bar - más pequeño y centrado
    const progressContainer = document.createElement('div');
    progressContainer.id = \`progress-bar-container-\${Date.now()}\`;
    progressContainer.style.cssText = \`
      width: 100%;
      max-width: 500px;
      margin: 0 auto 24px auto;
    \`;
    let progressBarInstance: any = null;
    const createProgressBarContent = () => {
      // Limpiar completamente el contenedor primero
      progressContainer.innerHTML = '';

      // Limpiar instancia anterior
      if (progressBarInstance) {
        try {
          progressBarInstance.destroy();
        } catch (e) {
          // Ignorar errores de destrucción
        }
        progressBarInstance = null;
      }

      // Preparar opciones (sin containerId, vamos a insertar directamente)
      let options: ProgressOptions = {
        size: args.size || 'md',
        variant: args.variant || 'default',
        value: args.value !== undefined ? args.value : args.variant === 'default' ? 75 : 0,
        indicator: args.indicator !== undefined ? args.indicator : false
      };

      // Si es multi-color, construir segmentos desde los controles individuales
      if (args.variant === 'multi-color') {
        const numSegments = args.numSegments || 4;
        const segments: ProgressSegment[] = [];

        // Agregar segmentos según numSegments con valores por defecto
        if (numSegments >= 1) {
          segments.push({
            value: args.segment1Value !== undefined ? args.segment1Value : 30,
            color: args.segment1Color || 'info'
          });
        }
        if (numSegments >= 2) {
          segments.push({
            value: args.segment2Value !== undefined ? args.segment2Value : 25,
            color: args.segment2Color || 'yellow'
          });
        }
        if (numSegments >= 3) {
          segments.push({
            value: args.segment3Value !== undefined ? args.segment3Value : 20,
            color: args.segment3Color || 'green'
          });
        }
        if (numSegments >= 4) {
          segments.push({
            value: args.segment4Value !== undefined ? args.segment4Value : 25,
            color: args.segment4Color || 'error'
          });
        }
        if (numSegments >= 5) {
          segments.push({
            value: args.segment5Value !== undefined ? args.segment5Value : 0,
            color: args.segment5Color || 'gray'
          });
        }
        options.segments = segments;
        options.value = undefined;
      }

      // Crear progress bar directamente en el contenedor usando renderProgressBar
      try {
        const html = renderProgressBar(options);
        progressContainer.innerHTML = html;

        // Crear instancia simulada para mantener compatibilidad
        const progressBarElement = progressContainer.querySelector('.ubits-progress-bar') as HTMLElement;
        if (progressBarElement) {
          progressBarInstance = {
            element: progressBarElement,
            destroy: () => {
              progressContainer.innerHTML = '';
            },
            update: () => {}
          };
        }
      } catch (error) {
        // Error al crear progress bar
      }
    };

    // Crear contenido inicial
    createProgressBarContent();

    // Observar cambios en args usando un intervalo más eficiente
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    const startWatching = () => {
      if (checkInterval) return;
      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createProgressBarContent();
        }
      }, 100);
    };
    startWatching();

    // Limpiar al desmontar
    const cleanup = () => {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      progressContainer.innerHTML = '';
      if (progressBarInstance) {
        try {
          progressBarInstance.destroy();
        } catch (e) {
          // Ignorar errores
        }
      }
    };
    container.addEventListener('DOMNodeRemoved', cleanup);
    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(progressContainer);
    container.appendChild(wrapper);
    return container;
  }
}`,...c.parameters?.docs?.source}}};const x=["Default"];export{c as Default,x as __namedExportsOrder,b as default};
