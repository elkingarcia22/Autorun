import{c as s,r as i}from"./ButtonProvider-DuF2BcOZ.js";import"./ListProvider-DPCKuQ24.js";import"./iframe-Cv55Ao8S.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"Components/Button",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga."}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","tertiary"],description:"Variante del botón",table:{defaultValue:{summary:"primary"},type:{summary:"primary | secondary | tertiary"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del botón",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},text:{control:{type:"text"},description:"Texto del botón"},icon:{control:{type:"text"},description:"Nombre del icono FontAwesome (sin prefijo fa-)",table:{type:{summary:"string"},example:{summary:"check, plus, times, etc."}}},iconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono FontAwesome",table:{defaultValue:{summary:"regular"},type:{summary:"regular | solid"}}},iconPosition:{control:{type:"select"},options:["left","right"],description:"Posición del icono",table:{defaultValue:{summary:"left"},type:{summary:"left | right"}}},iconOnly:{control:{type:"boolean"},description:"Mostrar solo el icono, sin texto",table:{defaultValue:{summary:"false"}}},disabled:{control:{type:"boolean"},description:"Deshabilitar el botón",table:{defaultValue:{summary:"false"}}},loading:{control:{type:"boolean"},description:"Estado de carga (muestra spinner)",table:{defaultValue:{summary:"false"}}},badge:{control:{type:"boolean"},description:"Mostrar badge de notificación",table:{defaultValue:{summary:"false"}}},active:{control:{type:"boolean"},description:"Modificador active/outline",table:{defaultValue:{summary:"false"}}},fullWidth:{control:{type:"boolean"},description:"Ancho completo",table:{defaultValue:{summary:"false"}}},block:{control:{type:"boolean"},description:"Display block",table:{defaultValue:{summary:"false"}}},dropdown:{control:{type:"boolean"},description:"Activar funcionalidad dropdown (muestra lista al hacer click)",table:{defaultValue:{summary:"false"}}}}},r={args:{variant:"primary",size:"md",text:"Botón de ejemplo",icon:"check",iconStyle:"regular",iconPosition:"left",iconOnly:!1,disabled:!1,loading:!1,badge:!1,active:!1,fullWidth:!1,block:!1,dropdown:!1,dropdownOptions:[{label:"Opción 1",value:"opt1"},{label:"Opción 2",value:"opt2"},{label:"Opción 3",value:"opt3"}]},render:n=>{const o=document.createElement("div");o.style.padding="20px",o.style.background="var(--ubits-bg-1, #ffffff)",o.style.borderRadius="8px";const e=document.createElement("div");if(e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="flex-start",e.style.padding="40px",e.style.minHeight="120px",e.style.background="var(--ubits-bg-2, #f9fafb)",e.style.borderRadius="8px",e.style.marginBottom="20px",e.style.position="relative",n.dropdown&&n.dropdownOptions&&n.dropdownOptions.length>0){const t=document.createElement("div");t.style.position="relative",t.style.display="inline-block",requestAnimationFrame(()=>{try{const a=s(n),l=a.parentElement;l?t.appendChild(l):t.appendChild(a)}catch(a){console.warn("Could not use createButton, falling back to renderButton:",a),t.innerHTML=i(n)}}),e.appendChild(t)}else{const t=document.createElement("div");t.innerHTML=i(n),e.appendChild(t)}return o.appendChild(e),o}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón de ejemplo',
    icon: 'check',
    iconStyle: 'regular',
    iconPosition: 'left',
    iconOnly: false,
    disabled: false,
    loading: false,
    badge: false,
    active: false,
    fullWidth: false,
    block: false,
    dropdown: false,
    dropdownOptions: [{
      label: 'Opción 1',
      value: 'opt1'
    }, {
      label: 'Opción 2',
      value: 'opt2'
    }, {
      label: 'Opción 3',
      value: 'opt3'
    }]
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'flex-start';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--ubits-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';

    // Si dropdown está activo, usar createButton para inicializar la funcionalidad
    if (args.dropdown && args.dropdownOptions && args.dropdownOptions.length > 0) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.style.position = 'relative';
      buttonWrapper.style.display = 'inline-block';
      requestAnimationFrame(() => {
        try {
          const button = createButton(args);
          // createButton con dropdown retorna el botón dentro de un div wrapper
          const parent = button.parentElement;
          if (parent) {
            buttonWrapper.appendChild(parent);
          } else {
            buttonWrapper.appendChild(button);
          }
        } catch (error) {
          console.warn('Could not use createButton, falling back to renderButton:', error);
          buttonWrapper.innerHTML = renderButton(args);
        }
      });
      preview.appendChild(buttonWrapper);
    } else {
      // Sin dropdown, usar renderButton normalmente
      const buttonContainer = document.createElement('div');
      buttonContainer.innerHTML = renderButton(args);
      preview.appendChild(buttonContainer);
    }
    container.appendChild(preview);
    return container;
  }
}`,...r.parameters?.docs?.source}}};const y=["Default"];export{r as Default,y as __namedExportsOrder,m as default};
