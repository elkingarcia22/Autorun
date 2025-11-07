import"./iframe-DpxOG777.js";import"./preload-helper-PPVm8Dsz.js";const l={completed:{bg:"var(--ubits-feedback-success-bg, #e8f8e4)",text:"var(--ubits-feedback-success-text, #223b16)",border:"var(--ubits-feedback-success-border, #41c433)"},published:{bg:"var(--ubits-feedback-success-bg, #e8f8e4)",text:"var(--ubits-feedback-success-text, #223b16)",border:"var(--ubits-feedback-success-border, #41c433)"},fulfilled:{bg:"var(--ubits-feedback-success-bg, #e8f8e4)",text:"var(--ubits-feedback-success-text, #223b16)",border:"var(--ubits-feedback-success-border, #41c433)"},created:{bg:"var(--ubits-feedback-success-bg, #e8f8e4)",text:"var(--ubits-feedback-success-text, #223b16)",border:"var(--ubits-feedback-success-border, #41c433)"},active:{bg:"var(--ubits-feedback-success-bg, #e8f8e4)",text:"var(--ubits-feedback-success-text, #223b16)",border:"var(--ubits-feedback-success-border, #41c433)"},"not-fulfilled":{bg:"var(--ubits-feedback-error-bg, #fff0ee)",text:"var(--ubits-feedback-error-text, #65181e)",border:"var(--ubits-feedback-error-border, #fd8a82)"},denied:{bg:"var(--ubits-feedback-error-bg, #fff0ee)",text:"var(--ubits-feedback-error-text, #65181e)",border:"var(--ubits-feedback-error-border, #fd8a82)"},draft:{bg:"rgba(12, 91, 239, 0.15)",text:"var(--ubits-feedback-info-text, #212f70)",border:"var(--ubits-accent-brand, #0c5bef)"},"in-progress":{bg:"rgba(12, 91, 239, 0.15)",text:"var(--ubits-feedback-info-text, #212f70)",border:"var(--ubits-accent-brand, #0c5bef)"},syncing:{bg:"rgba(12, 91, 239, 0.15)",text:"var(--ubits-feedback-info-text, #212f70)",border:"var(--ubits-accent-brand, #0c5bef)"},pending:{bg:"var(--ubits-feedback-warning-bg, #fff1e0)",text:"var(--ubits-feedback-warning-text, #4c2e15)",border:"var(--ubits-feedback-warning-border, #ec9907)"},"pending-approval":{bg:"var(--ubits-feedback-warning-bg, #fff1e0)",text:"var(--ubits-feedback-warning-text, #4c2e15)",border:"var(--ubits-feedback-warning-border, #ec9907)"},"not-started":{bg:"var(--ubits-bg-2, #f3f3f4)",text:"var(--ubits-fg-1-medium, #2b3543)",border:"var(--ubits-border-1, #a8abb2)"},finished:{bg:"var(--ubits-bg-2, #f3f3f4)",text:"var(--ubits-fg-1-medium, #2b3543)",border:"var(--ubits-border-1, #a8abb2)"},archived:{bg:"var(--ubits-bg-2, #f3f3f4)",text:"var(--ubits-fg-1-medium, #2b3543)",border:"var(--ubits-border-1, #a8abb2)"},disabled:{bg:"var(--ubits-bg-2, #f3f3f4)",text:"var(--ubits-fg-1-medium, #2b3543)",border:"var(--ubits-border-1, #a8abb2)"},paused:{bg:"var(--ubits-bg-2, #f3f3f4)",text:"var(--ubits-fg-1-medium, #2b3543)",border:"var(--ubits-border-1, #a8abb2)"},hidden:{bg:"var(--ubits-bg-2, #f3f3f4)",text:"var(--ubits-fg-1-medium, #2b3543)",border:"var(--ubits-border-1, #a8abb2)"}};function p(e={}){const{label:n="",size:t="md",status:a="pending",leftIcon:i,rightIcon:o="chevron-down",clickable:s=!1,className:r=""}=e,c=l[a]||l.pending,b=i?`<span class="ubits-status-tag-left-icon"><i class="far fa-${i}"></i></span>`:"",u=o!=null?`<span class="ubits-status-tag-right-icon"><i class="far fa-${o}"></i></span>`:"",f=["ubits-status-tag",`ubits-status-tag--${t}`,s?"ubits-status-tag--clickable":"",r].filter(Boolean).join(" "),g=`
    ${a==="draft"||a==="in-progress"||a==="syncing"?`background: linear-gradient(90deg, rgba(12, 91, 239, 0.15) 0%, rgba(12, 91, 239, 0.15) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%); background-color: ${c.bg};`:`background-color: ${c.bg};`}
    color: ${c.text};
    border-color: ${c.border};
  `.trim();return`
    <span class="${f}" style="${g}" data-status="${a}">
      ${b}
      <span class="ubits-status-tag-label">${n}</span>
      ${u}
    </span>
  `.trim()}const x={title:"Components/Status Tag",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Status Tag UBITS para mostrar estados con icono izquierdo opcional, texto y icono derecho opcional. Múltiples estados con colores diferenciados usando tokens UBITS. Border-radius de 4px, padding 4px vertical y 8px horizontal."}},layout:"centered"},argTypes:{label:{control:{type:"text"},description:"Texto del estado",table:{type:{summary:"string"},defaultValue:{summary:"Completado"},category:"Contenido"}},size:{control:{type:"select"},options:["xs","sm","md"],description:"Tamaño del tag (XS: body-xs 11px, SM: body-sm 13px, MD: body-md 16px)",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md"},category:"Apariencia"}},status:{control:{type:"select"},options:["completed","published","fulfilled","created","active","not-fulfilled","denied","draft","in-progress","syncing","pending","pending-approval","not-started","finished","archived","disabled","paused","hidden"],description:"Estado/variante del tag (determina el color según Figma)",table:{defaultValue:{summary:"completed"},type:{summary:"completed | published | fulfilled | created | active | not-fulfilled | denied | draft | in-progress | syncing | pending | pending-approval | not-started | finished | archived | disabled | paused | hidden"},category:"Estado"}},leftIcon:{control:{type:"text"},description:'Icono FontAwesome izquierdo (ej: "grid-2"). Dejar vacío para ocultar el icono izquierdo.',table:{type:{summary:"string | null"},defaultValue:{summary:"grid-2"},category:"Iconos"}},rightIcon:{control:{type:"text"},description:'Icono FontAwesome derecho (ej: "chevron-down"). Dejar vacío para ocultar el icono derecho.',table:{type:{summary:"string | null"},defaultValue:{summary:"chevron-down"},category:"Iconos"}},clickable:{control:{type:"boolean"},description:"Si el tag es clickeable (añade estilos hover/active y cursor pointer)",table:{defaultValue:{summary:"false"},category:"Comportamiento"}},onClick:{action:"clicked",description:"Función a ejecutar cuando se hace clic (solo si clickable es true)",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}},d={args:{label:"Completado",size:"md",status:"completed",leftIcon:"grid-2",rightIcon:"chevron-down",clickable:!1},render:e=>{const n=document.createElement("div");n.style.padding="20px",n.style.background="var(--ubits-bg-1, #ffffff)",n.style.borderRadius="8px";const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.padding="48px",t.style.minHeight="120px",t.style.background="var(--ubits-bg-2, #f9fafb)",t.style.borderRadius="8px",t.style.marginBottom="20px";const a=document.createElement("div"),i=e.leftIcon&&e.leftIcon.trim()!==""?e.leftIcon:void 0,o=e.rightIcon&&e.rightIcon.trim()!==""?e.rightIcon:void 0;if(a.innerHTML=p({...e,leftIcon:i,rightIcon:o}),e.clickable){const s=a.querySelector(".ubits-status-tag");s&&(s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.addEventListener("click",r=>{r.preventDefault(),e.onClick?e.onClick(r):console.log("Status Tag clicked!")}),s.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),e.onClick?e.onClick(r):console.log("Status Tag clicked!"))}))}return t.appendChild(a),n.appendChild(t),n}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
    leftIcon: 'grid-2',
    rightIcon: 'chevron-down',
    clickable: false
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--ubits-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    const statusTagContainer = document.createElement('div');
    // Manejar leftIcon y rightIcon: si están vacíos o son null, usar undefined
    const leftIconValue = args.leftIcon && args.leftIcon.trim() !== '' ? args.leftIcon : undefined;
    const rightIconValue = args.rightIcon && args.rightIcon.trim() !== '' ? args.rightIcon : undefined;
    statusTagContainer.innerHTML = renderStatusTag({
      ...args,
      leftIcon: leftIconValue,
      rightIcon: rightIconValue
    });

    // Agregar event listener si es clickeable
    if (args.clickable) {
      const tag = statusTagContainer.querySelector('.ubits-status-tag') as HTMLElement;
      if (tag) {
        tag.setAttribute('role', 'button');
        tag.setAttribute('tabindex', '0');
        tag.addEventListener('click', e => {
          e.preventDefault();
          if (args.onClick) {
            args.onClick(e as any);
          } else {
            console.log('Status Tag clicked!');
          }
        });
        tag.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (args.onClick) {
              args.onClick(e as any);
            } else {
              console.log('Status Tag clicked!');
            }
          }
        });
      }
    }
    preview.appendChild(statusTagContainer);
    container.appendChild(preview);
    return container;
  }
}`,...d.parameters?.docs?.source}}};const h=["Default"];export{d as Default,h as __namedExportsOrder,x as default};
