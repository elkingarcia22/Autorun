function f(e){const{label:t,complementaryText:c,value:a="",name:o="",checked:s=!1,size:l="md",state:n="default",disabled:r=!1,className:d=""}=e,u=r||n==="disabled",m=["ubits-checkbox",`ubits-checkbox--${l}`,n!=="default"?`ubits-checkbox--${n}`:"",s?"ubits-checkbox--checked":"",u?"ubits-checkbox--disabled":"",d].filter(Boolean).join(" "),b=`
    <input
      type="checkbox"
      id="checkbox-${o}-${a||"default"}"
      ${o?`name="${o}"`:""}
      ${a?`value="${a}"`:""}
      ${s?"checked":""}
      ${u?"disabled":""}
      class="ubits-checkbox__input"
    />
  `,p=`
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${s||n==="active"&&!s?'<span class="ubits-checkbox__checkmark"></span>':""}
    </span>
  `,y=`
    <span class="ubits-checkbox__label">${t}</span>
  `,h=c?`<span class="ubits-checkbox__complementary-text">${c}</span>`:"",x=`
    <div class="ubits-checkbox__text-content">
      ${y}
      ${h}
    </div>
  `;return`
    <label class="${m}">
      ${b}
      ${p}
      ${x}
    </label>
  `.trim()}const g={title:"Components/Checkbox",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Checkbox UBITS para selección múltiple. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente."}},layout:"centered"},argTypes:{label:{control:{type:"text"},description:"Texto del label del checkbox",table:{type:{summary:"string"},defaultValue:{summary:"Label"},category:"Contenido"}},complementaryText:{control:{type:"text"},description:"Texto complementario opcional (se muestra debajo del label)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},value:{control:{type:"text"},description:"Valor del checkbox",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},name:{control:{type:"text"},description:"Nombre del checkbox (para agrupar checkboxes)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},checked:{control:{type:"boolean"},description:"Si el checkbox está seleccionado",table:{defaultValue:{summary:"false"},category:"Estado"}},size:{control:{type:"select"},options:["sm","md"],description:"Tamaño del checkbox (sm: 16px, md: 20px)",table:{defaultValue:{summary:"md"},type:{summary:"sm | md"},category:"Apariencia"}},state:{control:{type:"select"},options:["default","hover","active","disabled"],description:"Estado del checkbox",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | active | disabled"},category:"Estado"}},disabled:{control:{type:"boolean"},description:"Si el checkbox está deshabilitado",table:{defaultValue:{summary:"false"},category:"Estado"}},onChange:{action:"changed",description:"Función a ejecutar cuando cambia el estado del checkbox",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}},i={args:{label:"Label",complementaryText:void 0,value:"",name:"",checked:!1,size:"md",state:"default",disabled:!1,className:""},render:e=>{const t=document.createElement("div");t.style.padding="20px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.minHeight="100px";const c=()=>{const n=f({label:e.label||"Label",complementaryText:e.complementaryText,value:e.value,name:e.name,checked:e.checked!==void 0?e.checked:!1,size:e.size||"md",state:e.state||"default",disabled:e.disabled!==void 0?e.disabled:!1,className:e.className||""});t.innerHTML=n;const r=t.querySelector(".ubits-checkbox__input");r&&e.onChange&&r.addEventListener("change",d=>{e.onChange&&e.onChange(d)})};c();let a=JSON.stringify(e);const o=setInterval(()=>{const n=JSON.stringify(e);n!==a&&(a=n,c())},100),s=()=>{clearInterval(o)},l=new MutationObserver(()=>{document.body.contains(t)||(s(),l.disconnect())});return l.observe(document.body,{childList:!0,subtree:!0}),t}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    complementaryText: undefined,
    value: '',
    name: '',
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
    const renderCheckboxComponent = () => {
      const checkboxHTML = renderCheckbox({
        label: args.label || 'Label',
        complementaryText: args.complementaryText,
        value: args.value,
        name: args.name,
        checked: args.checked !== undefined ? args.checked : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || ''
      });
      container.innerHTML = checkboxHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-checkbox__input') as HTMLInputElement;
      if (inputElement && args.onChange) {
        inputElement.addEventListener('change', e => {
          if (args.onChange) {
            args.onChange(e);
          }
        });
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
}`,...i.parameters?.docs?.source}}};const k=["Default"];export{i as Default,k as __namedExportsOrder,g as default};
