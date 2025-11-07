import{c as T,r as H}from"./ListProvider-DOCfZOrD.js";import"./iframe-DpxOG777.js";import"./preload-helper-PPVm8Dsz.js";function u(t,l="regular"){try{const n=l==="solid"?"fas":"far",e=t.startsWith("fa-")?t:`fa-${t}`;return`<i class="${n} ${e}"></i>`}catch{const e=l==="solid"?"fas":"far",o=t.startsWith("fa-")?t:`fa-${t}`;return`<i class="${e} ${o}"></i>`}}function k(t){const{variant:l="primary",size:n="md",text:e="",icon:o,iconStyle:i="regular",iconOnly:d=!1,disabled:x=!1,loading:a=!1,loadingText:c,badge:f=!1,active:m=!1,fullWidth:$=!1,block:y=!1,iconPosition:r="left",className:v="",attributes:O={},dropdown:b=!1}=t,E=["ubits-button",`ubits-button--${l}`,`ubits-button--${n}`,m&&"ubits-button--active",d&&"ubits-button--icon-only",a&&"ubits-button--loading",$&&"ubits-button--full-width",y&&"ubits-button--block",r==="right"&&"ubits-button--icon-right",b&&"ubits-button--dropdown",v].filter(Boolean).join(" "),B=[x&&"disabled",a&&'data-loading="true"',a&&'aria-busy="true"',...Object.entries(O).map(([L,M])=>`${L}="${M}"`)].filter(Boolean).join(" ");let g="";o&&(g=u(o,i));let p=g,C=r;b&&!o&&e?(p=u("chevron-down",i),C="right"):b&&o&&r==="left"&&e?p=`${g}${u("chevron-down",i)}`:b&&!e&&(p=o?`${g}${u("chevron-down",i)}`:u("chevron-down",i));const w=a?'<i class="far fa-spinner loading-spinner"></i>':"";let s="";return a&&c?s=`${w}<span class="button-text">${c}</span>`:a&&!e?s=w:a&&e?r==="right"?s=`<span class="button-text">${e}</span>${w}`:s=`${w}<span class="button-text">${e}</span>`:d&&o?s=g:p&&e?b&&o&&r==="left"?s=`${u(o,i)}<span>${e}</span>${u("chevron-down",i)}`:C==="right"?s=`<span>${e}</span>${p}`:s=`${p}<span>${e}</span>`:e?s=b?`<span>${e}</span>${u("chevron-down",i)}`:`<span>${e}</span>`:p&&(s=p),`
    <button class="${E}" ${B}>
      ${s}
      ${f?'<span class="ubits-button__badge"></span>':""}
    </button>
  `.trim()}function W(t){const l=document.createElement("div");l.style.position="relative",l.style.display="inline-block",l.innerHTML=k(t);const n=l.querySelector("button");if(!n)throw new Error("Failed to create button element");if(t.onClick&&n.addEventListener("click",t.onClick),t.dropdown&&t.dropdownOptions&&t.dropdownOptions.length>0){const e=document.createElement("div");e.className="ubits-button-dropdown-container",e.style.cssText=`
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      margin-top: 4px;
      display: none;
      min-width: 100%;
    `,l.appendChild(e);const o=t.size==="xs"?"xs":t.size==="sm"?"sm":t.size==="md"?"md":"lg",i=t.dropdownOptions.map(a=>({label:a.label,state:"default",value:a.value||a.label,selected:!1}));let d=!1;const x=()=>{if(d){e.style.display="none",d=!1;return}const a=`button-dropdown-${Math.random().toString(36).substr(2,9)}`;e.id=a,e.innerHTML="";try{T({containerId:a,items:i,size:o,maxHeight:"200px",onSelectionChange:(c,f)=>{if(c&&t.dropdownOptions&&t.dropdownOptions[f]){const m=t.dropdownOptions[f];m.onClick&&m.onClick(new MouseEvent("click"),{label:c.label,value:c.value}),e.style.display="none",d=!1}}})}catch(c){console.warn("Using renderList fallback for button dropdown:",c);const f=H({items:i,size:o,maxHeight:"200px"});e.innerHTML=f,e.querySelectorAll(".ubits-list-item").forEach(($,y)=>{const r=i[y];r&&r.state!=="disabled"&&t.dropdownOptions&&t.dropdownOptions[y]&&$.addEventListener("click",()=>{const v=t.dropdownOptions[y];v.onClick&&v.onClick(new MouseEvent("click"),{label:r.label,value:r.value}),e.style.display="none",d=!1})})}e.style.display="block",d=!0};n.addEventListener("click",a=>{a.stopPropagation(),!t.disabled&&!t.loading&&x()}),document.addEventListener("click",a=>{l.contains(a.target)||(e.style.display="none",d=!1)})}if(t.dropdown)return n;{const e=n.parentElement;if(e)return e.replaceChild(n,e),n}return n}const j={title:"Components/Button",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga."}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","tertiary"],description:"Variante del botón",table:{defaultValue:{summary:"primary"},type:{summary:"primary | secondary | tertiary"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del botón",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},text:{control:{type:"text"},description:"Texto del botón"},icon:{control:{type:"text"},description:"Nombre del icono FontAwesome (sin prefijo fa-)",table:{type:{summary:"string"},example:{summary:"check, plus, times, etc."}}},iconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono FontAwesome",table:{defaultValue:{summary:"regular"},type:{summary:"regular | solid"}}},iconPosition:{control:{type:"select"},options:["left","right"],description:"Posición del icono",table:{defaultValue:{summary:"left"},type:{summary:"left | right"}}},iconOnly:{control:{type:"boolean"},description:"Mostrar solo el icono, sin texto",table:{defaultValue:{summary:"false"}}},disabled:{control:{type:"boolean"},description:"Deshabilitar el botón",table:{defaultValue:{summary:"false"}}},loading:{control:{type:"boolean"},description:"Estado de carga (muestra spinner)",table:{defaultValue:{summary:"false"}}},badge:{control:{type:"boolean"},description:"Mostrar badge de notificación",table:{defaultValue:{summary:"false"}}},active:{control:{type:"boolean"},description:"Modificador active/outline",table:{defaultValue:{summary:"false"}}},fullWidth:{control:{type:"boolean"},description:"Ancho completo",table:{defaultValue:{summary:"false"}}},block:{control:{type:"boolean"},description:"Display block",table:{defaultValue:{summary:"false"}}},dropdown:{control:{type:"boolean"},description:"Activar funcionalidad dropdown (muestra lista al hacer click)",table:{defaultValue:{summary:"false"}}}}},h={args:{variant:"primary",size:"md",text:"Botón de ejemplo",icon:"check",iconStyle:"regular",iconPosition:"left",iconOnly:!1,disabled:!1,loading:!1,badge:!1,active:!1,fullWidth:!1,block:!1,dropdown:!1,dropdownOptions:[{label:"Opción 1",value:"opt1"},{label:"Opción 2",value:"opt2"},{label:"Opción 3",value:"opt3"}]},render:t=>{const l=document.createElement("div");l.style.padding="20px",l.style.background="var(--ubits-bg-1, #ffffff)",l.style.borderRadius="8px";const n=document.createElement("div");if(n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="flex-start",n.style.padding="40px",n.style.minHeight="120px",n.style.background="var(--ubits-bg-2, #f9fafb)",n.style.borderRadius="8px",n.style.marginBottom="20px",n.style.position="relative",t.dropdown&&t.dropdownOptions&&t.dropdownOptions.length>0){const e=document.createElement("div");e.style.position="relative",e.style.display="inline-block",requestAnimationFrame(()=>{try{const o=W(t),i=o.parentElement;i?e.appendChild(i):e.appendChild(o)}catch(o){console.warn("Could not use createButton, falling back to renderButton:",o),e.innerHTML=k(t)}}),n.appendChild(e)}else{const e=document.createElement("div");e.innerHTML=k(t),n.appendChild(e)}return l.appendChild(n),l}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};const A=["Default"];export{h as Default,A as __namedExportsOrder,j as default};
