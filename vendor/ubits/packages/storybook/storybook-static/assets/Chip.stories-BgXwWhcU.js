function m(e={}){const{label:n="",size:c="md",state:t="default",leftIcon:s,rightIcon:a,clickable:o=!1,closable:l=!1,className:d=""}=e,p=["ubits-chip",`ubits-chip--${c}`,t!=="default"?`ubits-chip--${t}`:"",o?"ubits-chip--clickable":"",l?"ubits-chip--closable":"",d].filter(Boolean).join(" "),u=s?`<span class="ubits-chip__left-icon" aria-hidden="true"><i class="far fa-${s}"></i></span>`:"",b=l||a?`<button class="ubits-chip__right-icon" type="button" aria-label="Cerrar chip" ${t==="disabled"?"disabled":""}>
        <i class="far fa-${a||"xmark"}"></i>
      </button>`:"";return`
    <span class="${p}" role="${o?"button":"none"}" tabindex="${o&&t!=="disabled"?"0":"-1"}" aria-disabled="${t==="disabled"?"true":"false"}">
      ${u}
      <span class="ubits-chip__label">${n}</span>
      ${b}
    </span>
  `.trim()}const g={title:"Básicos/Chip",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Chip UBITS para mostrar etiquetas o tags interactivas. Múltiples tamaños, estados y soporte para iconos izquierdo y derecho (botón de cerrar). Usa tokens UBITS exclusivamente."}},layout:"centered"},argTypes:{label:{control:{type:"text"},description:"Texto del chip",table:{type:{summary:"string"},defaultValue:{summary:"Chip"},category:"Contenido"}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del chip (xs: 20px, sm: 24px, md: 28px, lg: 36px)",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"},category:"Apariencia"}},state:{control:{type:"select"},options:["default","hover","active","pressed","focus","disabled"],description:"Estado del chip",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | active | pressed | focus | disabled"},category:"Estado"}},leftIcon:{control:{type:"text"},description:'Icono FontAwesome izquierdo (ej: "tag", "user"). Dejar vacío para ocultar.',table:{type:{summary:"string | null"},defaultValue:{summary:"null"},category:"Iconos"}},rightIcon:{control:{type:"text"},description:'Icono FontAwesome derecho para el botón de cerrar (ej: "xmark"). Se usa si closable es true.',table:{type:{summary:"string | null"},defaultValue:{summary:"xmark"},category:"Iconos"}},closable:{control:{type:"boolean"},description:"Si el chip tiene botón de cerrar",table:{defaultValue:{summary:"false"},category:"Comportamiento"}},clickable:{control:{type:"boolean"},description:"Si el chip es clickeable (añade estilos hover/active y cursor pointer)",table:{defaultValue:{summary:"false"},category:"Comportamiento"}},onClick:{action:"clicked",description:"Función a ejecutar cuando se hace clic en el chip (solo si clickable es true)",table:{disable:!0}},onClose:{action:"closed",description:"Función a ejecutar cuando se hace clic en el botón de cerrar",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}};function f(e,n){const c=parseInt(e.slice(1,3),16),t=parseInt(e.slice(3,5),16),s=parseInt(e.slice(5,7),16),a=c.toString(),o=t.toString(),l=s.toString(),d=n.toString(),p="rgba",u="(",b=")",i=", ";return p+u+a+i+o+i+l+i+d+b}const r={args:{label:"Chip",size:"md",state:"default",leftIcon:void 0,rightIcon:void 0,closable:!1,clickable:!1,className:""},render:e=>{const n=document.createElement("div");n.style.padding="20px",n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="center",n.style.minHeight="100px";const c=m({label:e.label||"Chip",size:e.size||"md",state:e.state||"default",leftIcon:e.leftIcon,rightIcon:e.rightIcon,closable:e.closable!==void 0?e.closable:!1,clickable:e.clickable!==void 0?e.clickable:!1,className:e.className||""});n.innerHTML=c;const t=n.querySelector(".ubits-chip");if(t&&e.state==="focus"){const a="#5297F4",o=f(a,.3);t.style.border=`2px solid var(--modifiers-static-inverted-color-light-accent-brand, ${a})`,t.style.boxShadow=`0px 0px 0px 4px ${o}`,t.style.outline="none"}t&&e.clickable&&e.onClick&&t.addEventListener("click",a=>{e.onClick&&e.onClick(a)});const s=n.querySelector(".ubits-chip__right-icon");return s&&e.onClose&&s.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),e.onClose&&e.onClose(a)}),n}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Chip',
    size: 'md',
    state: 'default',
    leftIcon: undefined,
    rightIcon: undefined,
    closable: false,
    clickable: false,
    className: ''
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';
    const chipHTML = renderChip({
      label: args.label || 'Chip',
      size: args.size || 'md',
      state: args.state || 'default',
      leftIcon: args.leftIcon,
      rightIcon: args.rightIcon,
      closable: args.closable !== undefined ? args.closable : false,
      clickable: args.clickable !== undefined ? args.clickable : false,
      className: args.className || ''
    });
    container.innerHTML = chipHTML;

    // Agregar event listeners si son necesarios
    const chipElement = container.querySelector('.ubits-chip') as HTMLElement;

    // Aplicar efecto Focus si el estado es 'focus'
    if (chipElement && args.state === 'focus') {
      // Aplicar estilos inline para mostrar el efecto Focus de los tokens UBITS
      // Usar valores del token Focus: border 2px solid #5297F4, box-shadow con spread 4px y opacity 30%
      const focusColor = '#5297F4';
      const focusRgba = hexToRgba(focusColor, 0.3);
      chipElement.style.border = \`2px solid var(--modifiers-static-inverted-color-light-accent-brand, \${focusColor})\`;
      chipElement.style.boxShadow = \`0px 0px 0px 4px \${focusRgba}\`;
      chipElement.style.outline = 'none';
    }
    if (chipElement && args.clickable && args.onClick) {
      chipElement.addEventListener('click', e => {
        if (args.onClick) {
          args.onClick(e as any);
        }
      });
    }
    const closeButton = container.querySelector('.ubits-chip__right-icon') as HTMLButtonElement;
    if (closeButton && args.onClose) {
      closeButton.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        if (args.onClose) {
          args.onClose(e as any);
        }
      });
    }
    return container;
  }
}`,...r.parameters?.docs?.source}}};const x=["Default"];export{r as Default,x as __namedExportsOrder,g as default};
