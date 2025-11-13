import{c as d,r as c}from"./InputProvider-CfXMQ1E0.js";import"./preload-helper-PPVm8Dsz.js";import"./ListProvider-CTqFAS6Y.js";import"./iframe-Qhh1jVCN.js";const x={title:"Components/Input",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Input UBITS con soporte para múltiples tipos (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar), 4 tamaños (xs, sm, md, lg), 6 estados (default, hover, focus, active, invalid, disabled), iconos, helpers, contadores, y opciones mandatory/optional."}}},argTypes:{label:{control:{type:"text"},description:"Texto del label",table:{defaultValue:{summary:""}}},placeholder:{control:{type:"text"},description:"Texto del placeholder",table:{defaultValue:{summary:""}}},helperText:{control:{type:"text"},description:"Texto de ayuda (helper text)",table:{defaultValue:{summary:""}}},type:{control:{type:"select"},options:["text","email","password","number","tel","url","select","textarea","search","autocomplete","calendar"],description:"Tipo de input",table:{defaultValue:{summary:"text"},type:{summary:"text | email | password | number | tel | url | select | textarea | search | autocomplete | calendar"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del input",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},state:{control:{type:"select"},options:["default","hover","focus","active","invalid","disabled"],description:"Estado del input",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | focus | active | invalid | disabled"}}},showLabel:{control:{type:"boolean"},description:"Mostrar/ocultar label",table:{defaultValue:{summary:"true"}}},showHelper:{control:{type:"boolean"},description:"Mostrar/ocultar helper text",table:{defaultValue:{summary:"false"}}},showCounter:{control:{type:"boolean"},description:"Mostrar/ocultar contador de caracteres",table:{defaultValue:{summary:"false"}}},maxLength:{control:{type:"number"},description:"Máximo de caracteres para el contador",table:{defaultValue:{summary:"50"}}},mandatory:{control:{type:"boolean"},description:"Mostrar texto mandatory/optional",table:{defaultValue:{summary:"false"}}},mandatoryType:{control:{type:"select"},options:["obligatorio","opcional"],description:"Tipo de mandatory",table:{defaultValue:{summary:"obligatorio"},type:{summary:"obligatorio | opcional"}}},leftIcon:{control:{type:"text"},description:"Icono izquierdo (nombre FontAwesome sin prefijo, ej: user)",table:{defaultValue:{summary:""}}},rightIcon:{control:{type:"text"},description:"Icono derecho (nombre FontAwesome sin prefijo, ej: check)",table:{defaultValue:{summary:""}}},value:{control:{type:"text"},description:"Valor inicial del input",table:{defaultValue:{summary:""}}}}};function u(e=20){return Array.from({length:e},(n,t)=>({value:`opt-${t+1}`,text:`Opción ${t+1}`}))}function m(){return[{value:"apple",text:"Manzana"},{value:"banana",text:"Banana"},{value:"orange",text:"Naranja"},{value:"grape",text:"Uva"},{value:"strawberry",text:"Fresa"},{value:"watermelon",text:"Sandía"},{value:"pineapple",text:"Piña"},{value:"mango",text:"Mango"},{value:"kiwi",text:"Kiwi"},{value:"peach",text:"Durazno"},{value:"cherry",text:"Cereza"},{value:"blueberry",text:"Arándano"},{value:"papaya",text:"Papaya"},{value:"coconut",text:"Coco"},{value:"avocado",text:"Aguacate"}]}const r={args:{containerId:"input-storybook-container",label:"Label",placeholder:"Placeholder",helperText:"Helper text",type:"text",size:"md",state:"default",showLabel:!0,showHelper:!1,showCounter:!1,maxLength:50,mandatory:!1,mandatoryType:"obligatorio",leftIcon:"",rightIcon:"",value:""},render:e=>{const n=document.createElement("div");n.style.cssText="max-width: 600px; margin: 20px auto; padding: 20px;";const t=`input-storybook-${Math.random().toString(36).substr(2,9)}`,i={...e,containerId:t,selectOptions:e.type==="select"?u(20):void 0,autocompleteOptions:e.type==="autocomplete"?m():void 0};try{const o=document.createElement("div");o.id=t,n.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const l=document.getElementById(t);if(l)try{d(i)}catch(s){console.error("Error creating input:",s);const p=c(i);l.innerHTML=p}else console.error(`Container with ID "${t}" not found`)})});const a=document.createElement("div");a.style.cssText=`
        margin-top: 20px;
        padding: 16px;
        background: var(--ubits-bg-2);
        border-radius: 8px;
        font-family: var(--font-sans);
        font-size: 14px;
      `,a.innerHTML=`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--ubits-fg-1-high);">Información del Input</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
          <div><strong>Tipo:</strong> ${e.type}</div>
          <div><strong>Tamaño:</strong> ${e.size}</div>
          <div><strong>Estado:</strong> ${e.state}</div>
          <div><strong>Label:</strong> ${e.showLabel?"Visible":"Oculto"}</div>
          <div><strong>Helper:</strong> ${e.showHelper?"Visible":"Oculto"}</div>
          <div><strong>Counter:</strong> ${e.showCounter?"Visible":"Oculto"}</div>
          <div><strong>Mandatory:</strong> ${e.mandatory?e.mandatoryType:"No"}</div>
          <div><strong>Iconos:</strong> ${e.leftIcon?`Izq: ${e.leftIcon}`:""} ${e.rightIcon?`Der: ${e.rightIcon}`:"Ninguno"}</div>
        </div>
      `,n.appendChild(a)}catch(o){console.error("Error rendering input:",o),n.innerHTML=`<div style="color: red; padding: 16px;">Error: ${o}</div>`}return n}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    containerId: 'input-storybook-container',
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    type: 'text',
    size: 'md',
    state: 'default',
    showLabel: true,
    showHelper: false,
    showCounter: false,
    maxLength: 50,
    mandatory: false,
    mandatoryType: 'obligatorio',
    leftIcon: '',
    rightIcon: '',
    value: ''
  },
  render: args => {
    // Crear contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 600px; margin: 20px auto; padding: 20px;';

    // Generar un ID único para el contenedor del input
    const containerId = \`input-storybook-\${Math.random().toString(36).substr(2, 9)}\`;

    // Preparar opciones según el tipo
    const inputOptions: InputOptions = {
      ...args,
      containerId,
      selectOptions: args.type === 'select' ? generateSelectOptions(20) : undefined,
      autocompleteOptions: args.type === 'autocomplete' ? generateAutocompleteOptions() : undefined
    };
    try {
      // Crear contenedor interno para el input
      const inputContainer = document.createElement('div');
      inputContainer.id = containerId;
      wrapper.appendChild(inputContainer);

      // Después de agregar el contenedor al wrapper, usar createInput
      // Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const container = document.getElementById(containerId);
          if (container) {
            // createInput buscará el contenedor y renderizará el HTML + inicializará funcionalidades interactivas
            try {
              createInput(inputOptions);
            } catch (err) {
              console.error('Error creating input:', err);
              // Fallback: usar renderInput si createInput falla
              const inputHTML = renderInput(inputOptions);
              container.innerHTML = inputHTML;
            }
          } else {
            console.error(\`Container with ID "\${containerId}" not found\`);
          }
        });
      });

      // Panel de información
      const infoPanel = document.createElement('div');
      infoPanel.style.cssText = \`
        margin-top: 20px;
        padding: 16px;
        background: var(--ubits-bg-2);
        border-radius: 8px;
        font-family: var(--font-sans);
        font-size: 14px;
      \`;
      infoPanel.innerHTML = \`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--ubits-fg-1-high);">Información del Input</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
          <div><strong>Tipo:</strong> \${args.type}</div>
          <div><strong>Tamaño:</strong> \${args.size}</div>
          <div><strong>Estado:</strong> \${args.state}</div>
          <div><strong>Label:</strong> \${args.showLabel ? 'Visible' : 'Oculto'}</div>
          <div><strong>Helper:</strong> \${args.showHelper ? 'Visible' : 'Oculto'}</div>
          <div><strong>Counter:</strong> \${args.showCounter ? 'Visible' : 'Oculto'}</div>
          <div><strong>Mandatory:</strong> \${args.mandatory ? args.mandatoryType : 'No'}</div>
          <div><strong>Iconos:</strong> \${args.leftIcon ? \`Izq: \${args.leftIcon}\` : ''} \${args.rightIcon ? \`Der: \${args.rightIcon}\` : 'Ninguno'}</div>
        </div>
      \`;
      wrapper.appendChild(infoPanel);
    } catch (error) {
      console.error('Error rendering input:', error);
      wrapper.innerHTML = \`<div style="color: red; padding: 16px;">Error: \${error}</div>\`;
    }
    return wrapper;
  }
}`,...r.parameters?.docs?.source}}};const b=["Default"];export{r as Default,b as __namedExportsOrder,x as default};
