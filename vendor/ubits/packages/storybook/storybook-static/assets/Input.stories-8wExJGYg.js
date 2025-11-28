import{c as m,r as u}from"./InputProvider-schPVK84.js";import"./preload-helper-PPVm8Dsz.js";import"./ListProvider-Dp4g9_1Y.js";import"./iframe-EN31ESOT.js";import"./ModalProvider-Cwkz7B9R.js";const I={title:"Formularios/Input",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Input UBITS con soporte para múltiples tipos (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar), 4 tamaños (xs, sm, md, lg), 6 estados (default, hover, focus, active, invalid, disabled), iconos, helpers, contadores, y opciones mandatory/optional."}}},argTypes:{label:{control:{type:"text"},description:"Texto del label",table:{defaultValue:{summary:""}}},placeholder:{control:{type:"text"},description:"Texto del placeholder",table:{defaultValue:{summary:""}}},helperText:{control:{type:"text"},description:"Texto de ayuda (helper text)",table:{defaultValue:{summary:""}}},type:{control:{type:"select"},options:["text","email","password","number","tel","url","select","textarea","search","autocomplete","calendar"],description:"Tipo de input",table:{defaultValue:{summary:"text"},type:{summary:"text | email | password | number | tel | url | select | textarea | search | autocomplete | calendar"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del input",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},state:{control:{type:"select"},options:["default","hover","focus","active","invalid","disabled"],description:"Estado del input",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | focus | active | invalid | disabled"}}},showLabel:{control:{type:"boolean"},description:"Mostrar/ocultar label",table:{defaultValue:{summary:"true"}}},showHelper:{control:{type:"boolean"},description:"Mostrar/ocultar helper text",table:{defaultValue:{summary:"false"}}},showCounter:{control:{type:"boolean"},description:"Mostrar/ocultar contador de caracteres",table:{defaultValue:{summary:"false"}}},maxLength:{control:{type:"number"},description:"Máximo de caracteres para el contador",table:{defaultValue:{summary:"50"}}},mandatory:{control:{type:"boolean"},description:"Mostrar texto mandatory/optional",table:{defaultValue:{summary:"false"}}},mandatoryType:{control:{type:"select"},options:["obligatorio","opcional"],description:"Tipo de mandatory",table:{defaultValue:{summary:"obligatorio"},type:{summary:"obligatorio | opcional"}}},leftIcon:{control:{type:"text"},description:"Icono izquierdo (nombre FontAwesome sin prefijo, ej: user)",table:{defaultValue:{summary:""}}},rightIcon:{control:{type:"text"},description:"Icono derecho (nombre FontAwesome sin prefijo, ej: check)",table:{defaultValue:{summary:""}}},value:{control:{type:"text"},description:"Valor inicial del input",table:{defaultValue:{summary:""}}},showRichTextToolbar:{control:{type:"boolean"},description:"Mostrar/ocultar barra de herramientas de texto enriquecido (solo para textarea)",table:{defaultValue:{summary:"false"}},if:{arg:"type",eq:"textarea"}}}};function g(e=20){return Array.from({length:e},(o,t)=>({value:`opt-${t+1}`,text:`Opción ${t+1}`}))}function f(){return[{value:"apple",text:"Manzana"},{value:"banana",text:"Banana"},{value:"orange",text:"Naranja"},{value:"grape",text:"Uva"},{value:"strawberry",text:"Fresa"},{value:"watermelon",text:"Sandía"},{value:"pineapple",text:"Piña"},{value:"mango",text:"Mango"},{value:"kiwi",text:"Kiwi"},{value:"peach",text:"Durazno"},{value:"cherry",text:"Cereza"},{value:"blueberry",text:"Arándano"},{value:"papaya",text:"Papaya"},{value:"coconut",text:"Coco"},{value:"avocado",text:"Aguacate"}]}const n={args:{containerId:"input-storybook-container",label:"Label",placeholder:"Placeholder",helperText:"Helper text",type:"text",size:"md",state:"default",showLabel:!0,showHelper:!1,showCounter:!1,maxLength:50,mandatory:!1,mandatoryType:"obligatorio",leftIcon:"",rightIcon:"",value:"",showRichTextToolbar:!1},render:e=>{const o=document.createElement("div");o.style.cssText="max-width: 600px; margin: 20px auto; padding: 20px;";const t=`input-storybook-${Math.random().toString(36).substr(2,9)}`,a=e.type==="textarea"?"":e.leftIcon,i=e.type==="textarea"?"":e.rightIcon,s={...e,containerId:t,leftIcon:a,rightIcon:i,selectOptions:e.type==="select"?g(20):void 0,autocompleteOptions:e.type==="autocomplete"?f():void 0};try{const r=document.createElement("div");r.id=t,o.appendChild(r),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const c=document.getElementById(t);if(c)try{m(s)}catch(d){console.error("Error creating input:",d);const p=u(s);c.innerHTML=p}else console.error(`Container with ID "${t}" not found`)})});const l=document.createElement("div");l.style.cssText=`
        margin-top: 20px;
        padding: 16px;
        background: var(--modifiers-normal-color-light-bg-2);
        border-radius: 8px;
        font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-medium);
      `,l.innerHTML=`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Input</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tipo:</strong> ${e.type}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tamaño:</strong> ${e.size}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Estado:</strong> ${e.state}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Label:</strong> ${e.showLabel?"Visible":"Oculto"}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Helper:</strong> ${e.showHelper?"Visible":"Oculto"}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Counter:</strong> ${e.showCounter?"Visible":"Oculto"}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Mandatory:</strong> ${e.mandatory?e.mandatoryType:"No"}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Iconos:</strong> ${a?`Izq: ${a}`:""} ${i?`Der: ${i}`:"Ninguno"}</div>
          ${e.type==="textarea"?`<div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Barra de herramientas:</strong> ${e.showRichTextToolbar?"Visible":"Oculta"}</div>`:""}
        </div>
      `,o.appendChild(l)}catch(r){console.error("Error rendering input:",r),o.innerHTML=`<div style="color: red; padding: 16px;">Error: ${r}</div>`}return o}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
    value: '',
    showRichTextToolbar: false
  },
  render: args => {
    // Crear contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 600px; margin: 20px auto; padding: 20px;';

    // Generar un ID único para el contenedor del input
    const containerId = \`input-storybook-\${Math.random().toString(36).substr(2, 9)}\`;

    // Preparar opciones según el tipo
    // El textarea no debe mostrar iconos
    const finalLeftIcon = args.type === 'textarea' ? '' : args.leftIcon;
    const finalRightIcon = args.type === 'textarea' ? '' : args.rightIcon;
    const inputOptions: InputOptions = {
      ...args,
      containerId,
      leftIcon: finalLeftIcon,
      rightIcon: finalRightIcon,
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
        background: var(--modifiers-normal-color-light-bg-2);
        border-radius: 8px;
        font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-medium);
      \`;
      infoPanel.innerHTML = \`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Input</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tipo:</strong> \${args.type}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tamaño:</strong> \${args.size}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Estado:</strong> \${args.state}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Label:</strong> \${args.showLabel ? 'Visible' : 'Oculto'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Helper:</strong> \${args.showHelper ? 'Visible' : 'Oculto'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Counter:</strong> \${args.showCounter ? 'Visible' : 'Oculto'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Mandatory:</strong> \${args.mandatory ? args.mandatoryType : 'No'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Iconos:</strong> \${finalLeftIcon ? \`Izq: \${finalLeftIcon}\` : ''} \${finalRightIcon ? \`Der: \${finalRightIcon}\` : 'Ninguno'}</div>
          \${args.type === 'textarea' ? \`<div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Barra de herramientas:</strong> \${args.showRichTextToolbar ? 'Visible' : 'Oculta'}</div>\` : ''}
        </div>
      \`;
      wrapper.appendChild(infoPanel);
    } catch (error) {
      console.error('Error rendering input:', error);
      wrapper.innerHTML = \`<div style="color: red; padding: 16px;">Error: \${error}</div>\`;
    }
    return wrapper;
  }
}`,...n.parameters?.docs?.source}}};const w=["Default"];export{n as Default,w as __namedExportsOrder,I as default};
