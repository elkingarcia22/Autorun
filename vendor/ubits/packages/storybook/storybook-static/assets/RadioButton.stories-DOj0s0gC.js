import{r as u}from"./RadioButtonProvider-CIXtywXC.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";const b={title:"Formularios/Radio Button",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Radio Button UBITS para selección única en grupos. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente."}},layout:"centered"},argTypes:{label:{control:{type:"text"},description:"Texto del label del radio button",table:{type:{summary:"string"},defaultValue:{summary:"Label"},category:"Contenido"}},complementaryText:{control:{type:"text"},description:"Texto complementario opcional (se muestra debajo del label)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},value:{control:{type:"text"},description:"Valor del radio button (para agrupar radio buttons)",table:{type:{summary:"string"},defaultValue:{summary:"option1"},category:"Contenido"}},name:{control:{type:"text"},description:"Nombre del grupo de radio buttons (para agrupar)",table:{type:{summary:"string"},defaultValue:{summary:"group"},category:"Contenido"}},checked:{control:{type:"boolean"},description:"Si el radio button está seleccionado",table:{defaultValue:{summary:"false"},category:"Estado"}},size:{control:{type:"select"},options:["sm","md"],description:"Tamaño del radio button (sm: 16px, md: 20px)",table:{defaultValue:{summary:"md"},type:{summary:"sm | md"},category:"Apariencia"}},state:{control:{type:"select"},options:["default","hover","active","disabled"],description:"Estado del radio button",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | active | disabled"},category:"Estado"}},disabled:{control:{type:"boolean"},description:"Si el radio button está deshabilitado",table:{defaultValue:{summary:"false"},category:"Estado"}},onChange:{action:"changed",description:"Función a ejecutar cuando cambia el estado del radio button",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}},a={args:{label:"Label",complementaryText:void 0,value:"option1",name:"group",checked:!1,size:"md",state:"default",disabled:!1,className:""},render:e=>{const t=document.createElement("div");t.style.padding="20px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.minHeight="100px";const o=()=>{const n=u({label:e.label||"Label",complementaryText:e.complementaryText,value:e.value||"option1",name:e.name||"group",checked:e.checked!==void 0?e.checked:!1,size:e.size||"md",state:e.state||"default",disabled:e.disabled!==void 0?e.disabled:!1,className:e.className||""});t.innerHTML=n;const l=t.querySelector(".ubits-radio-button__input");l&&e.onChange&&l.addEventListener("change",c=>{e.onChange&&e.onChange(c)})};o();let r=JSON.stringify(e);const i=setInterval(()=>{const n=JSON.stringify(e);n!==r&&(r=n,o())},100),d=()=>{clearInterval(i)},s=new MutationObserver(()=>{document.body.contains(t)||(d(),s.disconnect())});return s.observe(document.body,{childList:!0,subtree:!0}),t}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    complementaryText: undefined,
    value: 'option1',
    name: 'group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false,
    className: ''
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';
    const renderRadioButtonComponent = () => {
      const radioButtonHTML = renderRadioButton({
        label: args.label || 'Label',
        complementaryText: args.complementaryText,
        value: args.value || 'option1',
        name: args.name || 'group',
        checked: args.checked !== undefined ? args.checked : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || ''
      });
      container.innerHTML = radioButtonHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-radio-button__input') as HTMLInputElement;
      if (inputElement && args.onChange) {
        inputElement.addEventListener('change', e => {
          if (args.onChange) {
            args.onChange(e);
          }
        });
      }
    };

    // Renderizar inicialmente
    renderRadioButtonComponent();

    // Actualizar cuando cambian los args (similar a Popover)
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderRadioButtonComponent();
      }
    }, 100);

    // Limpiar interval cuando se destruye el componente
    const cleanup = () => {
      clearInterval(checkArgs);
    };

    // Usar MutationObserver para detectar cuando el container se elimina
    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        cleanup();
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    return container;
  }
}`,...a.parameters?.docs?.source}}};const g=["Default"];export{a as Default,g as __namedExportsOrder,b as default};
