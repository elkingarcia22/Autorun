function x(e){const{label:t,complementaryText:n,value:s="",name:l="",checked:o=!1,size:r="md",state:a="default",disabled:c=!1,className:d=""}=e,u=c||a==="disabled",g=["ubits-toggle",`ubits-toggle--${r}`,a!=="default"?`ubits-toggle--${a}`:"",o?"ubits-toggle--checked":"",u?"ubits-toggle--disabled":"",d].filter(Boolean).join(" "),b=`
    <input
      type="checkbox"
      id="toggle-${l}-${s||"default"}"
      ${l?`name="${l}"`:""}
      ${s?`value="${s}"`:""}
      ${o?"checked":""}
      ${u?"disabled":""}
      class="ubits-toggle__input"
      role="switch"
      aria-checked="${o}"
    />
  `,y=`
    <span class="ubits-toggle__track" aria-hidden="true">
      <span class="ubits-toggle__thumb"></span>
    </span>
  `;let m="";if(t||n){const v=t?`<span class="ubits-toggle__label">${t}</span>`:"",h=n?`<span class="ubits-toggle__complementary-text">${n}</span>`:"";m=`
      <div class="ubits-toggle__text-content">
        ${v}
        ${h}
      </div>
    `}const p=t||n?"label":"div",f=t||n?g:`${g} ubits-toggle--no-label`;return`
    <${p} class="${f}">
      ${b}
      ${m}
      ${y}
    </${p}>
  `.trim()}const T={title:"Components/Toggle",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Toggle/Switch UBITS para activar/desactivar opciones. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente."}},layout:"centered"},argTypes:{label:{control:{type:"text"},description:"Texto del label del toggle",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},complementaryText:{control:{type:"text"},description:"Texto complementario opcional (se muestra debajo del label)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},value:{control:{type:"text"},description:"Valor del toggle",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},name:{control:{type:"text"},description:"Nombre del toggle (para agrupar toggles)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},checked:{control:{type:"boolean"},description:"Si el toggle está activado",table:{defaultValue:{summary:"false"},category:"Estado"}},size:{control:{type:"select"},options:["sm","md"],description:"Tamaño del toggle (sm: 33x16px, md: 36x20px)",table:{defaultValue:{summary:"md"},type:{summary:"sm | md"},category:"Apariencia"}},state:{control:{type:"select"},options:["default","hover","active","disabled"],description:"Estado del toggle",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | active | disabled"},category:"Estado"}},disabled:{control:{type:"boolean"},description:"Si el toggle está deshabilitado",table:{defaultValue:{summary:"false"},category:"Estado"}},onChange:{action:"changed",description:"Función a ejecutar cuando cambia el estado del toggle",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}},i={args:{label:"Label",complementaryText:void 0,value:"",name:"",checked:!1,size:"md",state:"default",disabled:!1,className:""},render:e=>{const t=document.createElement("div");t.style.padding="20px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.minHeight="100px";const n=()=>{const a=x({label:e.label,complementaryText:e.complementaryText,value:e.value,name:e.name,checked:e.checked!==void 0?e.checked:!1,size:e.size||"md",state:e.state||"default",disabled:e.disabled!==void 0?e.disabled:!1,className:e.className||""});t.innerHTML=a;const c=t.querySelector(".ubits-toggle__input");c&&e.onChange&&c.addEventListener("change",d=>{e.onChange&&e.onChange(d)})};n();let s=JSON.stringify(e);const l=setInterval(()=>{const a=JSON.stringify(e);a!==s&&(s=a,n())},100),o=()=>{clearInterval(l)},r=new MutationObserver(()=>{document.body.contains(t)||(o(),r.disconnect())});return r.observe(document.body,{childList:!0,subtree:!0}),t}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
    const renderToggleComponent = () => {
      const toggleHTML = renderToggle({
        label: args.label,
        complementaryText: args.complementaryText,
        value: args.value,
        name: args.name,
        checked: args.checked !== undefined ? args.checked : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || ''
      });
      container.innerHTML = toggleHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-toggle__input') as HTMLInputElement;
      if (inputElement && args.onChange) {
        inputElement.addEventListener('change', e => {
          if (args.onChange) {
            args.onChange(e);
          }
        });
      }
    };

    // Renderizar inicialmente
    renderToggleComponent();

    // Actualizar cuando cambian los args (similar a Checkbox)
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderToggleComponent();
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
}`,...i.parameters?.docs?.source}}};const C=["Default"];export{i as Default,C as __namedExportsOrder,T as default};
