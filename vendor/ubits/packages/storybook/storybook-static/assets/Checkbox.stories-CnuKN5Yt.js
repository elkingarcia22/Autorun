import{r as m}from"./CheckboxProvider-DIr0OIhT.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";const y={title:"Formularios/Checkbox",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Checkbox UBITS para selección múltiple. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente."}},layout:"centered"},argTypes:{label:{control:{type:"text"},description:"Texto del label del checkbox",table:{type:{summary:"string"},defaultValue:{summary:"Label"},category:"Contenido"}},complementaryText:{control:{type:"text"},description:"Texto complementario opcional (se muestra debajo del label)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},value:{control:{type:"text"},description:"Valor del checkbox",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},name:{control:{type:"text"},description:"Nombre del checkbox (para agrupar checkboxes)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},checked:{control:{type:"boolean"},description:"Si el checkbox está seleccionado",table:{defaultValue:{summary:"false"},category:"Estado"}},indeterminate:{control:{type:"boolean"},description:"Si el checkbox está en estado indeterminado (muestra línea horizontal en vez de check)",table:{defaultValue:{summary:"false"},category:"Estado"}},size:{control:{type:"select"},options:["sm","md"],description:"Tamaño del checkbox (sm: 16px, md: 20px)",table:{defaultValue:{summary:"md"},type:{summary:"sm | md"},category:"Apariencia"}},state:{control:{type:"select"},options:["default","hover","active","disabled","indeterminate"],description:"Estado del checkbox",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | active | disabled | indeterminate"},category:"Estado"}},disabled:{control:{type:"boolean"},description:"Si el checkbox está deshabilitado",table:{defaultValue:{summary:"false"},category:"Estado"}},onChange:{action:"changed",description:"Función a ejecutar cuando cambia el estado del checkbox",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}},a={args:{label:"Label",complementaryText:void 0,value:"",name:"",checked:!1,indeterminate:!1,size:"md",state:"default",disabled:!1,className:""},render:e=>{const n=document.createElement("div");n.style.padding="20px",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.minHeight="100px";const o=()=>{const t=m({label:e.label||"Label",complementaryText:e.complementaryText,value:e.value,name:e.name,checked:e.checked!==void 0?e.checked:!1,indeterminate:e.indeterminate!==void 0?e.indeterminate:!1,size:e.size||"md",state:e.state||"default",disabled:e.disabled!==void 0?e.disabled:!1,className:e.className||""});n.innerHTML=t;const r=n.querySelector(".ubits-checkbox__input");r&&(e.indeterminate&&(r.indeterminate=!0),e.onChange&&r.addEventListener("change",d=>{e.onChange&&e.onChange(d)}))};o();let s=JSON.stringify(e);const c=setInterval(()=>{const t=JSON.stringify(e);t!==s&&(s=t,o())},100),l=()=>{clearInterval(c)},i=new MutationObserver(()=>{document.body.contains(n)||(l(),i.disconnect())});return i.observe(document.body,{childList:!0,subtree:!0}),n}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    complementaryText: undefined,
    value: '',
    name: '',
    checked: false,
    indeterminate: false,
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
    const renderCheckboxComponent = () => {
      const checkboxHTML = renderCheckbox({
        label: args.label || 'Label',
        complementaryText: args.complementaryText,
        value: args.value,
        name: args.name,
        checked: args.checked !== undefined ? args.checked : false,
        indeterminate: args.indeterminate !== undefined ? args.indeterminate : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || ''
      });
      container.innerHTML = checkboxHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-checkbox__input') as HTMLInputElement;
      if (inputElement) {
        // Aplicar estado indeterminado al input nativo si es necesario
        if (args.indeterminate) {
          inputElement.indeterminate = true;
        }
        if (args.onChange) {
          inputElement.addEventListener('change', e => {
            if (args.onChange) {
              args.onChange(e);
            }
          });
        }
      }
    };

    // Renderizar inicialmente
    renderCheckboxComponent();

    // Actualizar cuando cambian los args (similar a Radio Button)
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderCheckboxComponent();
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
}`,...a.parameters?.docs?.source}}};const f=["Default"];export{a as Default,f as __namedExportsOrder,y as default};
