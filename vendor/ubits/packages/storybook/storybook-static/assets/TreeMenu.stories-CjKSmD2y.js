const T={title:"Navegación/TreeMenu",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Tree Menu UBITS para mostrar estructuras jerárquicas con expandir/colapsar. Soporta iconos opcionales, múltiples niveles, chevron opcional y modo cascada o vertical."}}},argTypes:{showIcons:{control:{type:"boolean"},description:"Mostrar iconos en los nodos del árbol",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},showChevron:{control:{type:"boolean"},description:"Mostrar icono de chevron (flecha) para expandir/colapsar",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},maxLevels:{control:{type:"number",min:1,max:5,step:1},description:"Cantidad máxima de niveles en el árbol",table:{defaultValue:{summary:"3"},type:{summary:"number"}}},defaultExpanded:{control:{type:"boolean"},description:"Expandir todos los nodos por defecto",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del texto y espaciado (matching List component)",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},cascade:{control:{type:"boolean"},description:"Modo cascada (con indentación) o vertical (sin indentación, se despliega hacia abajo)",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}}}};function z(n,e="regular"){return`<i class="${e==="solid"?"fas":"far"} fa-${n}"></i>`}function $(n,e){return n===1?[{label:"Engineering",icon:e?"code":void 0},{label:"Marketing",icon:e?"chart-line":void 0},{label:"Operations",icon:e?"cog":void 0}]:n===2?[{label:"Engineering",icon:e?"code":void 0,children:[{label:"Frontend",icon:e?"paint-brush":void 0},{label:"Backend",icon:e?"server":void 0},{label:"Platform Team",icon:e?"cog":void 0}]},{label:"Marketing",icon:e?"chart-line":void 0,children:[{label:"Content",icon:e?"file-alt":void 0},{label:"SEO",icon:e?"search":void 0}]},{label:"Operations",icon:e?"cog":void 0,children:[{label:"Support",icon:e?"headset":void 0}]}]:n===3?[{label:"Engineering",icon:e?"code":void 0,children:[{label:"Frontend",icon:e?"paint-brush":void 0,children:[{label:"Design System",icon:e?"palette":void 0,children:[{label:"Components",icon:e?"cubes":void 0},{label:"Tokens",icon:e?"tags":void 0},{label:"Guidelines",icon:e?"book":void 0}]},{label:"Web Platform",icon:e?"globe":void 0}]},{label:"Backend",icon:e?"server":void 0},{label:"Platform Team",icon:e?"cog":void 0}]},{label:"Marketing",icon:e?"chart-line":void 0,children:[{label:"Content",icon:e?"file-alt":void 0}]},{label:"Operations",icon:e?"cog":void 0}]:n===4?[{label:"Engineering",icon:e?"code":void 0,children:[{label:"Frontend",icon:e?"paint-brush":void 0,children:[{label:"Design System",icon:e?"palette":void 0,children:[{label:"Components",icon:e?"cubes":void 0,children:[{label:"Button",icon:e?"square":void 0},{label:"Input",icon:e?"keyboard":void 0}]},{label:"Tokens",icon:e?"tags":void 0},{label:"Guidelines",icon:e?"book":void 0}]},{label:"Web Platform",icon:e?"globe":void 0}]},{label:"Backend",icon:e?"server":void 0}]},{label:"Marketing",icon:e?"chart-line":void 0}]:[{label:"Engineering",icon:e?"code":void 0,children:[{label:"Frontend",icon:e?"paint-brush":void 0,children:[{label:"Design System",icon:e?"palette":void 0,children:[{label:"Components",icon:e?"cubes":void 0,children:[{label:"Button",icon:e?"square":void 0,children:[{label:"Primary",icon:e?"circle":void 0},{label:"Secondary",icon:e?"circle":void 0}]},{label:"Input",icon:e?"keyboard":void 0}]},{label:"Tokens",icon:e?"tags":void 0}]}]}]}]}function v(n,e=0,d,r,l,s,i,t,c){const o=n.children&&n.children.length>0,u=`${c}-node-${e}-${n.label.toLowerCase().replace(/\s+/g,"-")}`,a=r&&o,g=t==="xs"?"ubits-body-xs-regular":t==="sm"?"ubits-body-sm-regular":t==="lg"?"ubits-body-lg-regular":"ubits-body-md-regular",m=i?t==="xs"?`calc(var(--p-spacing-mode-1-sm, 8px) * ${e})`:t==="sm"?`calc(var(--p-spacing-mode-1-md, 16px) * ${e})`:t==="lg"?`calc(var(--p-spacing-mode-1-lg, 24px) * ${e})`:`calc(var(--p-spacing-mode-1-md, 16px) * ${e})`:"0",b=t==="xs"?"12px":t==="sm"?"14px":t==="lg"?"18px":"16px",h=t==="xs"?"10px":t==="sm"?"12px":t==="lg"?"16px":"14px",f=t==="xs"?"8px 12px":t==="sm"?"10px 14px":t==="lg"?"16px 20px":"12px 16px",x=t==="xs"?"28px":t==="sm"?"32px":t==="lg"?"48px":"40px",y=t==="xs"?"var(--modifiers-normal-body-xs-regular-fontsize)":t==="sm"?"var(--modifiers-normal-body-sm-regular-fontsize)":t==="lg"?"var(--modifiers-normal-body-lg-regular-fontsize)":"var(--modifiers-normal-body-md-regular-fontsize)",_=t==="xs"?"var(--modifiers-normal-body-xs-regular-lineheight)":t==="sm"?"var(--modifiers-normal-body-sm-regular-lineheight)":t==="lg"?"var(--modifiers-normal-body-lg-regular-lineheight)":"var(--modifiers-normal-body-md-regular-lineheight)";return`
    <div class="ubits-tree-node ${i?"ubits-tree-node--cascade":"ubits-tree-node--vertical"}" data-level="${e}" style="${i?`padding-left: ${m};`:""}">
      <div 
        class="ubits-tree-node__content ${o?"ubits-tree-node__content--expandable":""}" 
        data-node-id="${u}"
        data-size="${t}"
        style="min-height: ${x} !important; padding: ${f} !important; font-size: ${y} !important; line-height: ${_} !important; margin: 0 !important; border: none !important;"
        ${o?`data-expanded="${a}"`:""}
        role="${o?"button":"treeitem"}"
        ${o?'tabindex="0"':""}
        aria-expanded="${o?a:void 0}"
        aria-label="${n.label}"
      >
        ${o&&s?`
          <span class="ubits-tree-node__chevron" style="width: ${h}; height: ${h};">
            <i class="far fa-chevron-${a?"down":"right"}" style="font-size: ${h};"></i>
          </span>
        `:`
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
        `}
        ${l&&n.icon?`
          <span class="ubits-tree-node__icon" style="font-size: ${b};">
            ${z(n.icon,"regular")}
          </span>
        `:""}
        <span class="ubits-tree-node__label ${g}" style="line-height: ${_};">${n.label}</span>
      </div>
      ${o?`
        <div class="ubits-tree-node__children ${i?"ubits-tree-node__children--cascade":"ubits-tree-node__children--vertical"}" data-children-id="${u}" style="display: ${a?"block":"none"};">
          ${n.children.map(k=>v(k,e+1,d,r,l,s,i,t,c)).join("")}
        </div>
      `:""}
    </div>
  `}function E(n){const{showIcons:e=!0,showChevron:d=!0,maxLevels:r=3,defaultExpanded:l=!1,size:s="md",cascade:i=!0}=n,t=`tree-${Date.now()}`,c=$(r,e);return`
    <div class="ubits-tree-menu ${i?"ubits-tree-menu--cascade":"ubits-tree-menu--vertical"}" id="${t}" role="tree">
      ${c.map(u=>v(u,0,r,l,e,d,i,s,t)).join("")}
    </div>
  `}const p={args:{showIcons:!0,showChevron:!0,maxLevels:3,defaultExpanded:!1,size:"md",cascade:!0},render:n=>{const e=document.createElement("div");e.style.cssText=`
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      max-width: 600px;
    `;const d=document.createElement("div");d.style.cssText=`
      padding: var(--p-spacing-mode-1-md, 16px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      margin-bottom: var(--p-spacing-mode-1-lg, 24px);
    `,d.innerHTML=`
      <div style="margin-bottom: 12px;">
        <strong class="ubits-body-md-semibold" style="color: var(--modifiers-normal-color-light-fg-1-high);">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);" class="ubits-body-sm-regular">
        <div><strong>Iconos:</strong> ${n.showIcons?"Sí":"No"}</div>
        <div><strong>Chevron:</strong> ${n.showChevron!==!1?"Sí":"No"}</div>
        <div><strong>Niveles:</strong> ${n.maxLevels||3}</div>
        <div><strong>Expandido:</strong> ${n.defaultExpanded?"Sí":"No"}</div>
        <div><strong>Tamaño:</strong> ${n.size||"md"}</div>
        <div><strong>Modo:</strong> ${n.cascade!==!1?"Cascada":"Vertical"}</div>
      </div>
    `;const r=document.createElement("div");r.style.cssText=`
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px);
      padding: var(--p-spacing-mode-1-md, 16px);
    `;const l=E(n);r.innerHTML=l;const s="ubits-tree-menu-styles";if(!document.getElementById(s)){const i=document.createElement("style");i.id=s,i.textContent=`
        .ubits-tree-menu {
          width: 100%;
          user-select: none;
        }
        
        .ubits-tree-node {
          position: relative;
        }
        
        .ubits-tree-node__content {
          display: flex;
          align-items: center;
          gap: var(--p-spacing-mode-1-sm, 8px);
          border-radius: 6px);
          cursor: ${n.maxLevels&&n.maxLevels>1?"pointer":"default"};
          transition: all 0.2s ease;
          color: var(--modifiers-normal-color-light-fg-1-high);
          background: transparent;
          position: relative;
          font-family: var(--font-family-noto-sans-font-family);
          box-sizing: border-box;
          margin: 0;
          border: none;
          /* Asegurar que el contenido interno no afecte el alto */
          overflow: visible;
        }
        
        /* Tamaños - Matching List component EXACTLY */
        /* xs: padding 8px 12px, font-size 11px, line-height 16.5px, min-height 28px */
        .ubits-tree-node__content[data-size="xs"] {
          padding: 8px 12px !important;
          font-size: var(--modifiers-normal-body-xs-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-xs-regular-lineheight) !important;
          min-height: 28px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* sm: padding 10px 14px, font-size 13px, line-height 19.5px, min-height 32px */
        .ubits-tree-node__content[data-size="sm"] {
          padding: 10px 14px !important;
          font-size: var(--modifiers-normal-body-sm-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-sm-regular-lineheight) !important;
          min-height: 32px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* md: padding 12px 16px, font-size 16px, line-height 24px, min-height 40px */
        .ubits-tree-node__content[data-size="md"] {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* lg: padding 16px 20px, font-size 20px, line-height 30px, min-height 48px */
        .ubits-tree-node__content[data-size="lg"] {
          padding: 16px 20px !important;
          font-size: var(--modifiers-normal-body-lg-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-lg-regular-lineheight) !important;
          min-height: 48px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* Default size (md) - cuando no tiene data-size */
        .ubits-tree-node__content:not([data-size]) {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* Asegurar que los tamaños se mantengan en todos los estados - mantener padding y min-height */
        .ubits-tree-node__content[data-size="xs"]:hover,
        .ubits-tree-node__content[data-size="xs"]:focus,
        .ubits-tree-node__content[data-size="xs"].ubits-tree-node__content--active {
          padding: 8px 12px !important;
          min-height: 28px !important;
        }
        
        .ubits-tree-node__content[data-size="sm"]:hover,
        .ubits-tree-node__content[data-size="sm"]:focus,
        .ubits-tree-node__content[data-size="sm"].ubits-tree-node__content--active {
          padding: 10px 14px !important;
          min-height: 32px !important;
        }
        
        .ubits-tree-node__content[data-size="md"]:hover,
        .ubits-tree-node__content[data-size="md"]:focus,
        .ubits-tree-node__content[data-size="md"].ubits-tree-node__content--active {
          padding: 12px 16px !important;
          min-height: 40px !important;
        }
        
        .ubits-tree-node__content[data-size="lg"]:hover,
        .ubits-tree-node__content[data-size="lg"]:focus,
        .ubits-tree-node__content[data-size="lg"].ubits-tree-node__content--active {
          padding: 16px 20px !important;
          min-height: 48px !important;
        }
        
        /* Hover state - similar a Accordion component */
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--modifiers-normal-color-light-bg-2);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        /* Active state - similar a Button active state */
        .ubits-tree-node__content--active,
        .ubits-tree-node__content[aria-selected="true"] {
          color: var(--modifiers-normal-color-light-accent-brand);
          background: var(--modifiers-normal-color-light-bg-active);
        }
        
        /* Asegurar que los tamaños se mantengan en estado active */
        .ubits-tree-node__content--active[data-size="xs"],
        .ubits-tree-node__content[aria-selected="true"][data-size="xs"] {
          min-height: 28px !important;
        }
        
        .ubits-tree-node__content--active[data-size="sm"],
        .ubits-tree-node__content[aria-selected="true"][data-size="sm"] {
          min-height: 32px !important;
        }
        
        .ubits-tree-node__content--active[data-size="md"],
        .ubits-tree-node__content[aria-selected="true"][data-size="md"] {
          min-height: 40px !important;
        }
        
        .ubits-tree-node__content--active[data-size="lg"],
        .ubits-tree-node__content[aria-selected="true"][data-size="lg"] {
          min-height: 48px !important;
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__chevron,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron {
          color: var(--modifiers-normal-color-light-accent-brand);
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__icon,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-accent-brand);
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__label,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-accent-brand);
          font-weight: var(--weight-semibold, 600);
        }
        
        /* Focus state - similar a Button component */
        .ubits-tree-node__content--expandable:focus-visible {
          outline: 2px solid var(--modifiers-normal-color-light-accent-brand);
          outline-offset: -2px;
          border-radius: 6px);
        }
        
        .ubits-tree-node__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          transition: color 0.2s ease;
          margin: 0;
          padding: 0;
          line-height: 1;
        }
        
        .ubits-tree-node__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          width: 20px;
          transition: color 0.2s ease;
          margin: 0;
          padding: 0;
          line-height: 1;
        }
        
        .ubits-tree-node__label {
          flex: 1;
          color: var(--modifiers-normal-color-light-fg-1-high);
          transition: color 0.2s ease, font-weight 0.2s ease;
          margin: 0;
          padding: 0;
          /* El line-height se establece inline para cada tamaño */
        }
        
        .ubits-tree-node__children {
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
        }
        
        /* Modo vertical - sin indentación */
        .ubits-tree-menu--vertical .ubits-tree-node {
          padding-left: 0 !important;
        }
        
        .ubits-tree-menu--vertical .ubits-tree-node__children {
          margin-left: 0;
          padding-left: 0;
        }
        
        /* Modo cascada - con indentación */
        .ubits-tree-menu--cascade .ubits-tree-node__children {
          margin-left: 0;
        }
        
        /* Dark mode support */
        [data-theme="dark"] .ubits-tree-node__content {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--modifiers-normal-color-dark-bg-2);
        }
        
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] {
          background: var(--modifiers-normal-color-dark-bg-active);
          color: var(--modifiers-normal-color-dark-accent-brand);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__label,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-accent-brand);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__label,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          font-weight: var(--weight-semibold, 600);
        }
        
        [data-theme="dark"] .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
      `,document.head.appendChild(i)}return setTimeout(()=>{const i=r.querySelector(".ubits-tree-menu");i&&(i.addEventListener("click",t=>{const o=t.target.closest(".ubits-tree-node__content");if(!o)return;if(o.classList.contains("ubits-tree-node__content--expandable")){const a=o.getAttribute("data-node-id"),g=i.querySelector(`[data-children-id="${a}"]`),m=o.querySelector(".ubits-tree-node__chevron i"),b=o.getAttribute("data-expanded")==="true";g&&(b?(g.style.display="none",o.setAttribute("data-expanded","false"),o.setAttribute("aria-expanded","false"),m&&n.showChevron!==!1&&(m.className="far fa-chevron-right")):(g.style.display="block",o.setAttribute("data-expanded","true"),o.setAttribute("aria-expanded","true"),m&&n.showChevron!==!1&&(m.className="far fa-chevron-down")))}i.querySelectorAll(".ubits-tree-node__content").forEach(a=>{a.classList.remove("ubits-tree-node__content--active"),a.removeAttribute("aria-selected")}),o.classList.add("ubits-tree-node__content--active"),o.setAttribute("aria-selected","true")}),i.addEventListener("keydown",t=>{const o=t.target.closest(".ubits-tree-node__content");o&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),o.click())}))},100),e.appendChild(d),e.appendChild(r),e}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    showIcons: true,
    showChevron: true,
    maxLevels: 3,
    defaultExpanded: false,
    size: 'md',
    cascade: true
  },
  render: args => {
    // Crear contenedor principal
    const container = document.createElement('div');
    container.style.cssText = \`
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      max-width: 600px;
    \`;

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = \`
      padding: var(--p-spacing-mode-1-md, 16px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      margin-bottom: var(--p-spacing-mode-1-lg, 24px);
    \`;
    infoPanel.innerHTML = \`
      <div style="margin-bottom: 12px;">
        <strong class="ubits-body-md-semibold" style="color: var(--modifiers-normal-color-light-fg-1-high);">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);" class="ubits-body-sm-regular">
        <div><strong>Iconos:</strong> \${args.showIcons ? 'Sí' : 'No'}</div>
        <div><strong>Chevron:</strong> \${args.showChevron !== false ? 'Sí' : 'No'}</div>
        <div><strong>Niveles:</strong> \${args.maxLevels || 3}</div>
        <div><strong>Expandido:</strong> \${args.defaultExpanded ? 'Sí' : 'No'}</div>
        <div><strong>Tamaño:</strong> \${args.size || 'md'}</div>
        <div><strong>Modo:</strong> \${args.cascade !== false ? 'Cascada' : 'Vertical'}</div>
      </div>
    \`;

    // Contenedor del árbol
    const treeContainer = document.createElement('div');
    treeContainer.style.cssText = \`
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px);
      padding: var(--p-spacing-mode-1-md, 16px);
    \`;

    // Renderizar el árbol
    const treeHTML = renderTreeMenu(args);
    treeContainer.innerHTML = treeHTML;

    // Agregar estilos CSS para el Tree Menu
    const styleId = 'ubits-tree-menu-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = \`
        .ubits-tree-menu {
          width: 100%;
          user-select: none;
        }
        
        .ubits-tree-node {
          position: relative;
        }
        
        .ubits-tree-node__content {
          display: flex;
          align-items: center;
          gap: var(--p-spacing-mode-1-sm, 8px);
          border-radius: 6px);
          cursor: \${args.maxLevels && args.maxLevels > 1 ? 'pointer' : 'default'};
          transition: all 0.2s ease;
          color: var(--modifiers-normal-color-light-fg-1-high);
          background: transparent;
          position: relative;
          font-family: var(--font-family-noto-sans-font-family);
          box-sizing: border-box;
          margin: 0;
          border: none;
          /* Asegurar que el contenido interno no afecte el alto */
          overflow: visible;
        }
        
        /* Tamaños - Matching List component EXACTLY */
        /* xs: padding 8px 12px, font-size 11px, line-height 16.5px, min-height 28px */
        .ubits-tree-node__content[data-size="xs"] {
          padding: 8px 12px !important;
          font-size: var(--modifiers-normal-body-xs-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-xs-regular-lineheight) !important;
          min-height: 28px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* sm: padding 10px 14px, font-size 13px, line-height 19.5px, min-height 32px */
        .ubits-tree-node__content[data-size="sm"] {
          padding: 10px 14px !important;
          font-size: var(--modifiers-normal-body-sm-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-sm-regular-lineheight) !important;
          min-height: 32px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* md: padding 12px 16px, font-size 16px, line-height 24px, min-height 40px */
        .ubits-tree-node__content[data-size="md"] {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* lg: padding 16px 20px, font-size 20px, line-height 30px, min-height 48px */
        .ubits-tree-node__content[data-size="lg"] {
          padding: 16px 20px !important;
          font-size: var(--modifiers-normal-body-lg-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-lg-regular-lineheight) !important;
          min-height: 48px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* Default size (md) - cuando no tiene data-size */
        .ubits-tree-node__content:not([data-size]) {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* Asegurar que los tamaños se mantengan en todos los estados - mantener padding y min-height */
        .ubits-tree-node__content[data-size="xs"]:hover,
        .ubits-tree-node__content[data-size="xs"]:focus,
        .ubits-tree-node__content[data-size="xs"].ubits-tree-node__content--active {
          padding: 8px 12px !important;
          min-height: 28px !important;
        }
        
        .ubits-tree-node__content[data-size="sm"]:hover,
        .ubits-tree-node__content[data-size="sm"]:focus,
        .ubits-tree-node__content[data-size="sm"].ubits-tree-node__content--active {
          padding: 10px 14px !important;
          min-height: 32px !important;
        }
        
        .ubits-tree-node__content[data-size="md"]:hover,
        .ubits-tree-node__content[data-size="md"]:focus,
        .ubits-tree-node__content[data-size="md"].ubits-tree-node__content--active {
          padding: 12px 16px !important;
          min-height: 40px !important;
        }
        
        .ubits-tree-node__content[data-size="lg"]:hover,
        .ubits-tree-node__content[data-size="lg"]:focus,
        .ubits-tree-node__content[data-size="lg"].ubits-tree-node__content--active {
          padding: 16px 20px !important;
          min-height: 48px !important;
        }
        
        /* Hover state - similar a Accordion component */
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--modifiers-normal-color-light-bg-2);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-fg-1-high);
        }
        
        /* Active state - similar a Button active state */
        .ubits-tree-node__content--active,
        .ubits-tree-node__content[aria-selected="true"] {
          color: var(--modifiers-normal-color-light-accent-brand);
          background: var(--modifiers-normal-color-light-bg-active);
        }
        
        /* Asegurar que los tamaños se mantengan en estado active */
        .ubits-tree-node__content--active[data-size="xs"],
        .ubits-tree-node__content[aria-selected="true"][data-size="xs"] {
          min-height: 28px !important;
        }
        
        .ubits-tree-node__content--active[data-size="sm"],
        .ubits-tree-node__content[aria-selected="true"][data-size="sm"] {
          min-height: 32px !important;
        }
        
        .ubits-tree-node__content--active[data-size="md"],
        .ubits-tree-node__content[aria-selected="true"][data-size="md"] {
          min-height: 40px !important;
        }
        
        .ubits-tree-node__content--active[data-size="lg"],
        .ubits-tree-node__content[aria-selected="true"][data-size="lg"] {
          min-height: 48px !important;
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__chevron,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron {
          color: var(--modifiers-normal-color-light-accent-brand);
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__icon,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-accent-brand);
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__label,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-accent-brand);
          font-weight: var(--weight-semibold, 600);
        }
        
        /* Focus state - similar a Button component */
        .ubits-tree-node__content--expandable:focus-visible {
          outline: 2px solid var(--modifiers-normal-color-light-accent-brand);
          outline-offset: -2px;
          border-radius: 6px);
        }
        
        .ubits-tree-node__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          transition: color 0.2s ease;
          margin: 0;
          padding: 0;
          line-height: 1;
        }
        
        .ubits-tree-node__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          width: 20px;
          transition: color 0.2s ease;
          margin: 0;
          padding: 0;
          line-height: 1;
        }
        
        .ubits-tree-node__label {
          flex: 1;
          color: var(--modifiers-normal-color-light-fg-1-high);
          transition: color 0.2s ease, font-weight 0.2s ease;
          margin: 0;
          padding: 0;
          /* El line-height se establece inline para cada tamaño */
        }
        
        .ubits-tree-node__children {
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
        }
        
        /* Modo vertical - sin indentación */
        .ubits-tree-menu--vertical .ubits-tree-node {
          padding-left: 0 !important;
        }
        
        .ubits-tree-menu--vertical .ubits-tree-node__children {
          margin-left: 0;
          padding-left: 0;
        }
        
        /* Modo cascada - con indentación */
        .ubits-tree-menu--cascade .ubits-tree-node__children {
          margin-left: 0;
        }
        
        /* Dark mode support */
        [data-theme="dark"] .ubits-tree-node__content {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--modifiers-normal-color-dark-bg-2);
        }
        
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] {
          background: var(--modifiers-normal-color-dark-bg-active);
          color: var(--modifiers-normal-color-dark-accent-brand);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon,
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__label,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-accent-brand);
        }
        
        [data-theme="dark"] .ubits-tree-node__content--active .ubits-tree-node__label,
        [data-theme="dark"] .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          font-weight: var(--weight-semibold, 600);
        }
        
        [data-theme="dark"] .ubits-tree-node__chevron,
        [data-theme="dark"] .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-dark-fg-1-medium);
        }
        
        [data-theme="dark"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-dark-fg-1-high);
        }
      \`;
      document.head.appendChild(style);
    }

    // Agregar funcionalidad de expandir/colapsar y selección
    setTimeout(() => {
      const treeElement = treeContainer.querySelector('.ubits-tree-menu');
      if (treeElement) {
        treeElement.addEventListener('click', e => {
          const target = e.target as HTMLElement;
          const content = target.closest('.ubits-tree-node__content') as HTMLElement;
          if (!content) return;

          // Manejar expandir/colapsar para nodos con hijos
          if (content.classList.contains('ubits-tree-node__content--expandable')) {
            const nodeId = content.getAttribute('data-node-id');
            const children = treeElement.querySelector(\`[data-children-id="\${nodeId}"]\`) as HTMLElement;
            const chevron = content.querySelector('.ubits-tree-node__chevron i') as HTMLElement;
            const isExpanded = content.getAttribute('data-expanded') === 'true';
            if (children) {
              if (isExpanded) {
                children.style.display = 'none';
                content.setAttribute('data-expanded', 'false');
                content.setAttribute('aria-expanded', 'false');
                if (chevron && args.showChevron !== false) {
                  chevron.className = 'far fa-chevron-right';
                }
              } else {
                children.style.display = 'block';
                content.setAttribute('data-expanded', 'true');
                content.setAttribute('aria-expanded', 'true');
                if (chevron && args.showChevron !== false) {
                  chevron.className = 'far fa-chevron-down';
                }
              }
            }
          }

          // Manejar selección (active state) para todos los nodos
          // Remover active de todos los nodos
          const allContents = treeElement.querySelectorAll('.ubits-tree-node__content');
          allContents.forEach(node => {
            node.classList.remove('ubits-tree-node__content--active');
            node.removeAttribute('aria-selected');
          });

          // Agregar active al nodo clickeado
          content.classList.add('ubits-tree-node__content--active');
          content.setAttribute('aria-selected', 'true');
        });

        // Soporte para teclado
        treeElement.addEventListener('keydown', e => {
          const target = e.target as HTMLElement;
          const content = target.closest('.ubits-tree-node__content') as HTMLElement;
          if (!content) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            content.click();
          }
        });
      }
    }, 100);
    container.appendChild(infoPanel);
    container.appendChild(treeContainer);
    return container;
  }
}`,...p.parameters?.docs?.source}}};const L=["Default"];export{p as Default,L as __namedExportsOrder,T as default};
