import{c as B,r as f}from"./ButtonProvider-NeRKx_iR.js";import"./iframe-CHGeu5ha.js";import"./ListProvider-rXce0ADx.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";const k={title:"Components/Button",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga."}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","tertiary"],description:"Variante del botón",table:{defaultValue:{summary:"primary"},type:{summary:"primary | secondary | tertiary"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del botón",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},text:{control:{type:"text"},description:"Texto del botón"},icon:{control:{type:"text"},description:"Nombre del icono FontAwesome (sin prefijo fa-)",table:{type:{summary:"string"},example:{summary:"check, plus, times, etc."}}},iconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono FontAwesome",table:{defaultValue:{summary:"regular"},type:{summary:"regular | solid"}}},iconPosition:{control:{type:"select"},options:["left","right","only"],description:"Posición del icono",table:{defaultValue:{summary:"left"},type:{summary:"left | right | only"}}},iconOnly:{control:{type:"boolean"},description:"Mostrar solo el icono, sin texto",table:{defaultValue:{summary:"false"}}},disabled:{control:{type:"boolean"},description:"Deshabilitar el botón",table:{defaultValue:{summary:"false"}}},loading:{control:{type:"boolean"},description:"Estado de carga (muestra spinner)",table:{defaultValue:{summary:"false"}}},badge:{control:{type:"boolean"},description:"Mostrar badge de notificación",table:{defaultValue:{summary:"false"}}},active:{control:{type:"boolean"},description:"Modificador active/outline",table:{defaultValue:{summary:"false"}}},fullWidth:{control:{type:"boolean"},description:"Ancho completo",table:{defaultValue:{summary:"false"}}},block:{control:{type:"boolean"},description:"Display block",table:{defaultValue:{summary:"false"}}},dropdown:{control:{type:"boolean"},description:"Activar funcionalidad dropdown (muestra lista al hacer click)",table:{defaultValue:{summary:"false"}}},showTooltip:{control:{type:"boolean"},description:"Mostrar tooltip al hacer hover (solo para botones icon-only)",table:{defaultValue:{summary:"false"},category:"Tooltip"}},tooltipText:{control:{type:"text"},description:"Texto del tooltip (solo para botones icon-only)",table:{type:{summary:"string"},category:"Tooltip"}}}},c={args:{variant:"primary",size:"md",text:"Botón de ejemplo",icon:"check",iconStyle:"regular",iconPosition:"left",iconOnly:!1,disabled:!1,loading:!1,badge:!1,active:!1,fullWidth:!1,block:!1,dropdown:!1,dropdownOptions:[{label:"Opción 1",value:"opt1"},{label:"Opción 2",value:"opt2"},{label:"Opción 3",value:"opt3"}],showTooltip:!1,tooltipText:"Tooltip del botón"},render:o=>{const s=document.createElement("div");s.style.padding="20px",s.style.background="var(--ubits-bg-1, #ffffff)",s.style.borderRadius="8px";const n=document.createElement("div");n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="flex-start",n.style.padding="40px",n.style.minHeight="120px",n.style.background="var(--ubits-bg-2, #f9fafb)",n.style.borderRadius="8px",n.style.marginBottom="20px",n.style.position="relative";const t={...o,iconOnly:o.iconPosition==="only"||o.iconOnly,iconPosition:o.iconPosition==="only"?"left":o.iconPosition};if(t.dropdown&&t.dropdownOptions&&t.dropdownOptions.length>0){const i=document.createElement("div");i.style.position="relative",i.style.display="inline-block",requestAnimationFrame(()=>{try{const l=B(t),a=l.parentElement;a?(i.appendChild(a),t.iconOnly&&t.showTooltip&&t.tooltipText&&d(l,t.tooltipText)):(i.appendChild(l),t.iconOnly&&t.showTooltip&&t.tooltipText&&d(l,t.tooltipText))}catch(l){console.warn("Could not use createButton, falling back to renderButton:",l),i.innerHTML=f(t);const a=i.querySelector("button");a&&t.iconOnly&&t.showTooltip&&t.tooltipText&&d(a,t.tooltipText)}}),n.appendChild(i)}else{const i=document.createElement("div");i.innerHTML=f(t),n.appendChild(i),requestAnimationFrame(()=>{const l=i.querySelector("button");l&&t.iconOnly&&t.showTooltip&&t.tooltipText&&d(l,t.tooltipText)})}return s.appendChild(n),s}};function d(o,s){const n=o.dataset.tooltipInstance;if(n){const p=document.getElementById(n);p&&p.remove(),delete o.dataset.tooltipInstance}const t=o._tooltipMouseEnter,i=o._tooltipMouseLeave;t&&(o.removeEventListener("mouseenter",t),delete o._tooltipMouseEnter),i&&(o.removeEventListener("mouseleave",i),delete o._tooltipMouseLeave),o.hasAttribute("title")&&o.removeAttribute("title");const l=`button-tooltip-${Math.random().toString(36).substr(2,9)}`,a=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),g=`
    <div class="ubits-tooltip ubits-tooltip--tail-bottom" id="${l}" style="position: fixed; z-index: 10000; opacity: 0; visibility: hidden; display: none; width: auto; min-width: fit-content; max-width: 240px;">
      <div class="ubits-tooltip__tail" style="left: 50%;">
        <div class="ubits-tooltip__tail-inner"></div>
      </div>
      <div class="ubits-tooltip__content" style="width: auto; min-width: fit-content;">
        <div class="ubits-tooltip__body" style="white-space: nowrap;">
          <div class="ubits-tooltip__body-content">
            <p class="ubits-body-md" style="margin: 0; white-space: nowrap;">${a}</p>
          </div>
        </div>
      </div>
    </div>
  `,u=document.createElement("div");u.innerHTML=g;const e=u.firstElementChild;if(e){document.body.appendChild(e);const p=()=>{const r=o.getBoundingClientRect();e.style.top="-9999px",e.style.left="0",e.style.transform="none",e.style.visibility="visible",e.style.opacity="0",e.style.display="block",e.classList.add("ubits-tooltip--open"),e.offsetHeight;const b=e.getBoundingClientRect(),T=b.height,h=r.top-T-9,x=r.left+r.width/2,w=b.width,A=x-w/2;e.style.top=`${h}px`,e.style.left=`${A}px`,e.style.transform="none",e.style.display="block",e.style.visibility="visible",e.style.opacity="1",e.style.transition="none",setTimeout(()=>{e.style.transition=""},50)},v=()=>{e.classList.remove("ubits-tooltip--open"),e.style.opacity="0",e.style.visibility="hidden",e.style.display="none"},y=r=>{r.stopPropagation(),p()},m=r=>{r.stopPropagation(),v()};o.addEventListener("mouseenter",y,!1),o.addEventListener("mouseleave",m,!1),o._tooltipMouseEnter=y,o._tooltipMouseLeave=m,o.dataset.tooltipInstance=l}}c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
    }],
    showTooltip: false,
    tooltipText: 'Tooltip del botón'
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

    // Convertir iconPosition 'only' a iconOnly para compatibilidad
    const buttonArgs = {
      ...args,
      iconOnly: args.iconPosition === 'only' || args.iconOnly,
      iconPosition: args.iconPosition === 'only' ? 'left' : args.iconPosition
    };

    // Si dropdown está activo, usar createButton para inicializar la funcionalidad
    if (buttonArgs.dropdown && buttonArgs.dropdownOptions && buttonArgs.dropdownOptions.length > 0) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.style.position = 'relative';
      buttonWrapper.style.display = 'inline-block';
      requestAnimationFrame(() => {
        try {
          const button = createButton(buttonArgs);
          // createButton con dropdown retorna el botón dentro de un div wrapper
          const parent = button.parentElement;
          if (parent) {
            buttonWrapper.appendChild(parent);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
          } else {
            buttonWrapper.appendChild(button);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
          }
        } catch (error) {
          console.warn('Could not use createButton, falling back to renderButton:', error);
          buttonWrapper.innerHTML = renderButton(buttonArgs);
          // Aplicar tooltip UBITS si es necesario
          const button = buttonWrapper.querySelector('button');
          if (button && buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
            applyUBITSTooltip(button, buttonArgs.tooltipText);
          }
        }
      });
      preview.appendChild(buttonWrapper);
    } else {
      // Sin dropdown, usar renderButton normalmente
      const buttonContainer = document.createElement('div');
      buttonContainer.innerHTML = renderButton(buttonArgs);
      preview.appendChild(buttonContainer);

      // Aplicar tooltip UBITS si es necesario
      requestAnimationFrame(() => {
        const button = buttonContainer.querySelector('button');
        if (button && buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
          applyUBITSTooltip(button, buttonArgs.tooltipText);
        }
      });
    }
    container.appendChild(preview);
    return container;
  }
}`,...c.parameters?.docs?.source}}};const I=["Default"];export{c as Default,I as __namedExportsOrder,k as default};
