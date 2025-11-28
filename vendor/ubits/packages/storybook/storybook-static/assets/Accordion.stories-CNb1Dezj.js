function b(e,o="regular"){const t=o==="solid"?"fas":"far",i=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${t} ${i}"></i>`}function v(e,o,t){const{variant:i="list",chevronPosition:a="right",showIcons:n=!0}=o,c=i==="boxed",s=a==="left",r=a==="right",d=["ubits-accordion-item",c&&"ubits-accordion-item--boxed"].filter(Boolean).join(" "),u=s||r?`<i class="far fa-chevron-down ubits-accordion-chevron" data-chevron-id="${t}"></i>`:"",m=n&&e.icon?`<span class="ubits-accordion-icon">${b(e.icon,e.iconStyle||"regular")}</span>`:"",h=s?`${u}${m}<div class="ubits-accordion-header-content"><span class="ubits-accordion-title">${e.title}</span>${e.subHeader?`<span class="ubits-accordion-subheader">${e.subHeader}</span>`:""}</div>`:`${m}<div class="ubits-accordion-header-content"><span class="ubits-accordion-title">${e.title}</span>${e.subHeader?`<span class="ubits-accordion-subheader">${e.subHeader}</span>`:""}</div>${u}`,f=e.content?`<div class="ubits-accordion-body-content">${e.content}</div>`:"";return`
    <div class="${d}" data-accordion-id="${t}">
      <div class="ubits-accordion-header" data-header-id="${t}">
        ${h}
      </div>
      <div class="ubits-accordion-body" data-body-id="${t}">
        ${f}
      </div>
    </div>
  `}function g(e){const{items:o,variant:t="list",chevronPosition:i="right",className:a=""}=e,n=["ubits-accordion",`ubits-accordion--${t}`,`ubits-accordion--chevron-${i}`,a].filter(Boolean).join(" "),c=o.map(s=>v(s,e,s.id)).join("");return`<div class="${n}" data-allow-multiple="${e.allowMultiple||!1}">
    ${c}
  </div>`}function w(e,o){const t=typeof e=="string"?document.querySelector(e):e;if(!t)return console.error("❌ [createAccordion] Container no encontrado:",e),null;const i=g(o);t.innerHTML=i;const a=t.querySelector(".ubits-accordion");return a?($(a,o),a):(console.error("❌ [createAccordion] Accordion no se renderizó correctamente"),null)}function $(e,o){const t=o.allowMultiple||!1;(o.defaultOpen||[]).forEach(n=>{const c=e.querySelector(`[data-body-id="${n}"]`),s=e.querySelector(`[data-header-id="${n}"]`),r=e.querySelector(`[data-chevron-id="${n}"]`);c&&s&&r&&(c.style.display="block",s.classList.add("ubits-accordion-header--open"),r.style.transform="rotate(180deg)")}),e.querySelectorAll(".ubits-accordion-header").forEach(n=>{n.addEventListener("click",c=>{c.stopPropagation();const s=n.getAttribute("data-header-id");if(!s)return;const r=e.querySelector(`[data-body-id="${s}"]`),d=e.querySelector(`[data-chevron-id="${s}"]`);if(!r||!d)return;const u=r.style.display==="block";if(!t&&!u){const m=e.querySelectorAll(".ubits-accordion-body"),h=e.querySelectorAll(".ubits-accordion-header"),f=e.querySelectorAll(".ubits-accordion-chevron");m.forEach(l=>{l!==r&&(l.style.display="none")}),h.forEach(l=>{l!==n&&l.classList.remove("ubits-accordion-header--open")}),f.forEach(l=>{l!==d&&(l.style.transform="rotate(0deg)")})}u?(r.style.display="none",n.classList.remove("ubits-accordion-header--open"),d.style.transform="rotate(0deg)"):(r.style.display="block",n.classList.add("ubits-accordion-header--open"),d.style.transform="rotate(180deg)")})})}const I={title:"Layout/Accordion",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Accordion UBITS con múltiples variantes: lista simple, tipo caja, chevron izquierda/derecha, iconos opcionales y sub-headers."}}},argTypes:{variant:{control:{type:"select"},options:["list","boxed"],description:"Variante del accordion",table:{defaultValue:{summary:"list"},type:{summary:"list | boxed"}}},chevronPosition:{control:{type:"select"},options:["left","right"],description:"Posición del chevron",table:{defaultValue:{summary:"right"},type:{summary:"left | right"}}},allowMultiple:{control:{type:"boolean"},description:"Permitir múltiples items abiertos simultáneamente",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},showIcons:{control:{type:"boolean"},description:"Mostrar u ocultar iconos en los items",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}}}},A=[{id:"1",title:"What makes coss ui different?",content:"coss ui focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates."},{id:"2",title:"How can I customize the components?",content:"You can customize components using CSS variables, theme tokens, and component props. All components are built with customization in mind."},{id:"3",title:"Is coss ui optimized for performance?",content:"Yes, coss ui is built with performance in mind. We optimize every component for maximum performance and minimal bundle size."},{id:"4",title:"How accessible are the components?",content:"All components follow WCAG 2.1 accessibility standards and include proper ARIA attributes and keyboard navigation support."}],y=[{id:"1",title:"What makes coss ui different?",content:"coss ui focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",icon:"command",iconStyle:"regular"},{id:"2",title:"How can I customize the components?",content:"You can customize components using CSS variables, theme tokens, and component props. All components are built with customization in mind.",icon:"moon",iconStyle:"regular"},{id:"3",title:"Is coss ui optimized for performance?",content:"Yes, coss ui is built with performance in mind. We optimize every component for maximum performance and minimal bundle size.",icon:"bolt",iconStyle:"regular"},{id:"4",title:"How accessible are the components?",content:"All components follow WCAG 2.1 accessibility standards and include proper ARIA attributes and keyboard navigation support.",icon:"at",iconStyle:"regular"}],p={name:"Interactive - All Controls",args:{items:y,variant:"list",chevronPosition:"right",allowMultiple:!1,showIcons:!0},render:e=>{const o=document.createElement("div");o.style.padding="24px",o.style.maxWidth="800px";let t=e.showIcons?y:A;const i={...e,items:t};return o.innerHTML="",w(o,i),o}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Interactive - All Controls',
  args: {
    items: itemsWithIcons,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';

    // Determinar qué items usar según las opciones
    // Si showIcons es false, usar sampleItems (sin iconos)
    // Si showIcons es true, usar itemsWithIcons (con iconos)
    let itemsToUse = args.showIcons ? itemsWithIcons : sampleItems;
    const finalArgs = {
      ...args,
      items: itemsToUse
    };

    // Limpiar y recrear el accordion cada vez que cambien los args
    container.innerHTML = '';
    createAccordion(container, finalArgs);
    return container;
  }
}`,...p.parameters?.docs?.source},description:{story:`Interactive - All controls
Historia única con todos los controles para probar todas las variantes`,...p.parameters?.docs?.description}}};const S=["Interactive"];export{p as Interactive,S as __namedExportsOrder,I as default};
