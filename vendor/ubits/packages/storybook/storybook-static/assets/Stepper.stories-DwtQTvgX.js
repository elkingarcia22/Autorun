import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";function f(e){const{orientation:n="horizontal",size:r="md",showTitle:o=!0,showDescription:c=!0,steps:s=[],className:d=""}=e;if(s.length===0)return"";const l=["ubits-stepper",`ubits-stepper--${n}`,`ubits-stepper--${r}`,d].filter(Boolean).join(" "),i=s.map((a,p)=>{const t=p===s.length-1,m=a.state||(p===0?"active":"default");return v(a,m,t,n,o,c,"default")}).join("");return`
    <div class="${l}">
      ${i}
    </div>
  `.trim()}function v(e,n,r,o,c,s,d="default"){const l=["ubits-stepper__step",`ubits-stepper__step--${n}`,r?"ubits-stepper__step--last":""].filter(Boolean).join(" "),i=b(e.number,n),a=r?"":S(d,o),p=T(c?e.title:void 0,s?e.description:void 0);return o==="vertical"?`
      <div class="${l}">
        <div class="ubits-stepper__step-wrapper">
          ${i}
          <div class="ubits-stepper__step-content">
            ${p}
          </div>
        </div>
        ${a}
      </div>
    `.trim():`
      <div class="${l}">
        ${i}
        ${p}
        ${a}
      </div>
    `.trim()}function b(e,n){const r=["ubits-stepper__indicator",`ubits-stepper__indicator--${n}`].filter(Boolean).join(" ");let o="";return n==="completed"?o=`
      <svg class="ubits-stepper__checkmark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `:o=`<span class="ubits-stepper__number">${e}</span>`,`
    <div class="${r}">
      ${o}
    </div>
  `.trim()}function S(e,n){return`<div class="${["ubits-stepper__connector",`ubits-stepper__connector--${n}`].filter(Boolean).join(" ")}"></div>`}function T(e,n){const r=e?`<h3 class="ubits-stepper__title ubits-body-md-semibold">${y(e)}</h3>`:"",o=n?`<p class="ubits-stepper__description ubits-body-sm-regular">${y(n)}</p>`:"";return!r&&!o?'<div class="ubits-stepper__step-content ubits-stepper__step-content--empty"></div>':`
    <div class="ubits-stepper__step-content">
      <div class="ubits-stepper__content-wrapper">
        ${r}
        ${o}
      </div>
    </div>
  `.trim()}function y(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const _={title:"Layout/Stepper",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Stepper UBITS para mostrar el progreso de un proceso multi-paso. Soporta orientación horizontal y vertical, con estados: default, completado, activo, error y warning. Cada paso puede tener número, título y descripción."}},layout:"padded"},argTypes:{orientation:{control:{type:"select"},options:["horizontal","vertical"],description:"Orientación del stepper",table:{type:{summary:"horizontal | vertical"},defaultValue:{summary:"horizontal"},category:"Apariencia"}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del stepper",table:{type:{summary:"xs | sm | md | lg"},defaultValue:{summary:"md"},category:"Apariencia"}},showTitle:{control:{type:"boolean"},description:"Mostrar títulos",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Apariencia"}},showTitle:{control:{type:"boolean"},description:"Mostrar títulos",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Apariencia"}},showDescription:{control:{type:"boolean"},description:"Mostrar descripciones (texto complementario)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Apariencia"}},numSteps:{control:{type:"number",min:2,max:5,step:1},description:"Número de pasos a mostrar (2-5)",table:{type:{summary:"number"},defaultValue:{summary:"3"},category:"Comportamiento"}},step1State:{control:{type:"select"},options:["default","completed","active","error","warning"],description:"Estado del paso 1",table:{category:"Paso 1"}},step1Title:{control:{type:"text"},description:"Título del paso 1",table:{category:"Paso 1"}},step1Description:{control:{type:"text"},description:"Descripción del paso 1",table:{category:"Paso 1"}},step2State:{control:{type:"select"},options:["default","completed","active","error","warning"],description:"Estado del paso 2",table:{category:"Paso 2"}},step2Title:{control:{type:"text"},description:"Título del paso 2",table:{category:"Paso 2"}},step2Description:{control:{type:"text"},description:"Descripción del paso 2",table:{category:"Paso 2"}},step3State:{control:{type:"select"},options:["default","completed","active","error","warning"],description:"Estado del paso 3",table:{category:"Paso 3"}},step3Title:{control:{type:"text"},description:"Título del paso 3",table:{category:"Paso 3"}},step3Description:{control:{type:"text"},description:"Descripción del paso 3",table:{category:"Paso 3"}},step4State:{control:{type:"select"},options:["default","completed","active","error","warning"],description:"Estado del paso 4",table:{category:"Paso 4"},if:{arg:"numSteps",gte:4}},step4Title:{control:{type:"text"},description:"Título del paso 4",table:{category:"Paso 4"},if:{arg:"numSteps",gte:4}},step4Description:{control:{type:"text"},description:"Descripción del paso 4",table:{category:"Paso 4"},if:{arg:"numSteps",gte:4}},step5State:{control:{type:"select"},options:["default","completed","active","error","warning"],description:"Estado del paso 5",table:{category:"Paso 5"},if:{arg:"numSteps",gte:5}},step5Title:{control:{type:"text"},description:"Título del paso 5",table:{category:"Paso 5"},if:{arg:"numSteps",gte:5}},step5Description:{control:{type:"text"},description:"Descripción del paso 5",table:{category:"Paso 5"},if:{arg:"numSteps",gte:5}}}},u={args:{orientation:"horizontal",size:"md",showTitle:!0,showDescription:!0,numSteps:3,step1State:"completed",step1Title:"Step One",step1Description:"Desc for step one",step2State:"active",step2Title:"Step Two",step2Description:"Desc for step two",step3State:"default",step3Title:"Step Three",step3Description:"Desc for step three"},render:e=>{const n=document.createElement("div");n.style.cssText=`
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      min-height: 200px;
    `;const r=document.createElement("div");r.id=`stepper-container-${Date.now()}`,r.style.cssText=`
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    `;const o=()=>{r.innerHTML="";const i=e.numSteps||3,a=[];for(let t=1;t<=i;t++){const m=e[`step${t}State`]||(t===1?"completed":t===2?"active":"default"),g=e[`step${t}Title`]||`Step ${t===1?"One":t===2?"Two":t===3?"Three":t===4?"Four":"Five"}`,h=e[`step${t}Description`]||`Desc for step ${t===1?"one":t===2?"two":t===3?"three":t===4?"four":"five"}`;a.push({number:t,title:g,description:h,state:m})}const p={orientation:e.orientation||"horizontal",size:e.size||"md",showTitle:e.showTitle!==void 0?e.showTitle:!0,showDescription:e.showDescription!==void 0?e.showDescription:!0,steps:a};try{const t=f(p);r.innerHTML=t}catch(t){console.error("Error al renderizar stepper:",t),r.innerHTML='<p style="color: var(--modifiers-normal-color-light-feedback-accent-error);">Error al renderizar el stepper</p>'}};o();let c=JSON.stringify(e),s=null;(()=>{s||(s=setInterval(()=>{const i=JSON.stringify(e);i!==c&&(c=i,o())},100))})();const l=()=>{s&&(clearInterval(s),s=null),r.innerHTML=""};return n.addEventListener("DOMNodeRemoved",l),n.appendChild(r),n}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    size: 'md',
    showTitle: true,
    showDescription: true,
    numSteps: 3,
    step1State: 'completed',
    step1Title: 'Step One',
    step1Description: 'Desc for step one',
    step2State: 'active',
    step2Title: 'Step Two',
    step2Description: 'Desc for step two',
    step3State: 'default',
    step3Title: 'Step Three',
    step3Description: 'Desc for step three'
  },
  render: args => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = \`
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      min-height: 200px;
    \`;

    // Contenedor para el stepper
    const stepperContainer = document.createElement('div');
    stepperContainer.id = \`stepper-container-\${Date.now()}\`;
    stepperContainer.style.cssText = \`
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    \`;
    const createStepperContent = () => {
      // Limpiar contenedor
      stepperContainer.innerHTML = '';

      // Construir array de pasos
      const numSteps = args.numSteps || 3;
      const steps: StepperStep[] = [];
      for (let i = 1; i <= numSteps; i++) {
        const stepState = (args as any)[\`step\${i}State\`] || (i === 1 ? 'completed' : i === 2 ? 'active' : 'default');
        const stepTitle = (args as any)[\`step\${i}Title\`] || \`Step \${i === 1 ? 'One' : i === 2 ? 'Two' : i === 3 ? 'Three' : i === 4 ? 'Four' : 'Five'}\`;
        const stepDescription = (args as any)[\`step\${i}Description\`] || \`Desc for step \${i === 1 ? 'one' : i === 2 ? 'two' : i === 3 ? 'three' : i === 4 ? 'four' : 'five'}\`;
        steps.push({
          number: i,
          title: stepTitle,
          description: stepDescription,
          state: stepState
        });
      }

      // Crear opciones del stepper
      const stepperOptions: StepperOptions = {
        orientation: args.orientation || 'horizontal',
        size: args.size || 'md',
        showTitle: args.showTitle !== undefined ? args.showTitle : true,
        showDescription: args.showDescription !== undefined ? args.showDescription : true,
        steps: steps
      };

      // Renderizar stepper
      try {
        const html = renderStepper(stepperOptions);
        stepperContainer.innerHTML = html;
      } catch (error) {
        console.error('Error al renderizar stepper:', error);
        stepperContainer.innerHTML = '<p style="color: var(--modifiers-normal-color-light-feedback-accent-error);">Error al renderizar el stepper</p>';
      }
    };

    // Crear contenido inicial
    createStepperContent();

    // Observar cambios en args
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    const startWatching = () => {
      if (checkInterval) return;
      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createStepperContent();
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
      stepperContainer.innerHTML = '';
    };
    container.addEventListener('DOMNodeRemoved', cleanup);
    container.appendChild(stepperContainer);
    return container;
  }
}`,...u.parameters?.docs?.source}}};const $=["Default"];export{u as Default,$ as __namedExportsOrder,_ as default};
