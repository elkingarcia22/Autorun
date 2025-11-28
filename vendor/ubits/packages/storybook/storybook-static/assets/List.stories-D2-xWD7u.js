import{_ as S}from"./preload-helper-PPVm8Dsz.js";const w={title:"Data/List",tags:["autodocs"],parameters:{docs:{description:{component:"Componente List UBITS para mostrar listas de items con estados (default, hover, active, disabled). Soporta 4 tamaños (xs, sm, md, lg), scrollbar personalizado UBITS, navegación por teclado y selección simple o múltiple."}}},argTypes:{size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño de los items de la lista",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},maxHeight:{control:{type:"text"},description:"Altura máxima de la lista (para scroll)",table:{defaultValue:{summary:"400px"},type:{summary:"string"}}},showScrollbar:{control:{type:"boolean"},description:"Mostrar scrollbar UBITS personalizado",table:{defaultValue:{summary:"false"}}},item1State:{control:{type:"select"},options:["default","hover","active","disabled"],description:"Estado del item 1",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | active | disabled"}}},item2State:{control:{type:"select"},options:["default","hover","active","disabled"],description:"Estado del item 2",table:{defaultValue:{summary:"active"},type:{summary:"default | hover | active | disabled"}}},item3State:{control:{type:"select"},options:["default","hover","active","disabled"],description:"Estado del item 3",table:{defaultValue:{summary:"disabled"},type:{summary:"default | hover | active | disabled"}}},item4State:{control:{type:"select"},options:["default","hover","active","disabled"],description:"Estado del item 4",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | active | disabled"}}}}};function x(a){const{size:s="md",item1State:o="default",item2State:r="active",item3State:d="disabled",item4State:b="default",maxHeight:u="400px",showScrollbar:c=!1}=a,y=[{label:"Item 1",state:o},{label:"Item 2",state:r},{label:"Item 3",state:d},{label:"Item 4",state:b},{label:"Item 5",state:"default"},{label:"Item 6",state:"default"},{label:"Item 7",state:"default"},{label:"Item 8",state:"default"},{label:"Item 9",state:"default"},{label:"Item 10",state:"default"}],h=`list-container-${Date.now()}`,p=`list-${Date.now()}`,v=`list-scrollbar-${Date.now()}`;if(c){let n=`
      <div id="${h}" style="position: relative; width: 100%;">
        <div id="${p}" class="ubits-list" role="list" style="max-height: ${u}; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 8px;">
    `;return y.forEach(i=>{const e=i.state||"default",l=["ubits-list-item",`ubits-list-item--${s}`,e!=="default"?`ubits-list-item--${e}`:""].filter(Boolean).join(" "),t=[];e==="active"&&t.push('aria-selected="true"'),e==="disabled"?t.push('aria-disabled="true"'):t.push('tabindex="0"'),n+=`
        <div class="${l}" role="listitem" ${t.join(" ")}>
          ${i.label}
        </div>
      `}),n+=`
        </div>
        <div id="${v}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; pointer-events: none;"></div>
      </div>
      <style>
        #${p}::-webkit-scrollbar { display: none; }
      </style>
    `,setTimeout(()=>{const i=document.getElementById(p),e=document.getElementById(v);if(i&&e)if(typeof window.createScrollbarLocal=="function"){if(i.scrollHeight>i.clientHeight){const l=window.createScrollbarLocal(i,e,"vertical");l&&(e.style.pointerEvents="auto",i._scrollbarInstance=l,setTimeout(()=>{const t=e.querySelector(".ubits-scrollbar"),m=e.querySelector(".ubits-scrollbar__bar");t&&m&&(t.style.display="flex",m.style.opacity="0.6",m.style.pointerEvents="auto")},50))}}else S(async()=>{const{createScrollbar:l}=await import("./ScrollProvider-BVL7eCy8.js");return{createScrollbar:l}},[],import.meta.url).then(({createScrollbar:l})=>{if(i.scrollHeight>i.clientHeight){const t=l({orientation:"vertical",targetId:p,containerId:v});t&&(e.style.pointerEvents="auto",i._scrollbarInstance=t,setTimeout(()=>{const m=e.querySelector(".ubits-scrollbar"),g=e.querySelector(".ubits-scrollbar__bar");m&&g&&(m.style.display="flex",g.style.opacity="0.6",g.style.pointerEvents="auto")},50))}}).catch(l=>{console.error("Error al importar ScrollProvider:",l)})},100),n}else{let n=`<div class="ubits-list" role="list" style="max-height: ${u}; overflow-y: auto; -ms-overflow-style: none; scrollbar-width: none;">`;return y.forEach(i=>{const e=i.state||"default",l=["ubits-list-item",`ubits-list-item--${s}`,e!=="default"?`ubits-list-item--${e}`:""].filter(Boolean).join(" "),t=[];e==="active"&&t.push('aria-selected="true"'),e==="disabled"?t.push('aria-disabled="true"'):t.push('tabindex="0"'),n+=`
        <div class="${l}" role="listitem" ${t.join(" ")}>
          ${i.label}
        </div>
      `}),n+="</div>",n+=`<style>
      .ubits-list::-webkit-scrollbar { display: none; }
    </style>`,n}}const f={args:{size:"md",maxHeight:"400px",showScrollbar:!1,item1State:"default",item2State:"active",item3State:"disabled",item4State:"default"},render:a=>{const s=document.createElement("div");s.style.padding="20px",s.style.background="var(--modifiers-normal-color-light-bg-1, #ffffff)",s.style.borderRadius="8px";const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.gap="24px";const r=document.createElement("div");r.style.padding="16px",r.style.background="var(--modifiers-normal-color-light-bg-2, #f9fafb)",r.style.borderRadius="8px",r.style.border="1px solid var(--modifiers-normal-color-light-border-1, #e5e7eb)",r.innerHTML=`
      <div style="margin-bottom: 12px;">
        <strong style="color: var(--modifiers-normal-color-light-fg-1-high, #303a47); font-size: 14px;">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);">
        <div><strong>Tamaño:</strong> ${a.size||"md"}</div>
        <div><strong>Altura máxima:</strong> ${a.maxHeight||"400px"}</div>
        <div><strong>Scrollbar UBITS:</strong> ${a.showScrollbar?"Sí":"No"}</div>
        <div><strong>Item 1:</strong> ${a.item1State||"default"}</div>
        <div><strong>Item 2:</strong> ${a.item2State||"active"}</div>
        <div><strong>Item 3:</strong> ${a.item3State||"disabled"}</div>
        <div><strong>Item 4:</strong> ${a.item4State||"default"}</div>
      </div>
    `;const d=document.createElement("div");d.id=`list-preview-${Date.now()}`,d.style.width="100%",d.style.maxWidth="400px";const b=x(a);d.innerHTML=b;const u="ubits-scrollbar-css";if(!document.getElementById(u)){const c=document.createElement("link");c.id=u,c.rel="stylesheet",c.href="../../components/scroll/src/styles/scroll.css",document.head.appendChild(c)}return o.appendChild(r),o.appendChild(d),s.appendChild(o),s}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'default',
    item2State: 'active',
    item3State: 'disabled',
    item4State: 'default'
  },
  render: args => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';

    // Preview container
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';

    // Info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.padding = '16px';
    infoPanel.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    infoPanel.style.borderRadius = '8px';
    infoPanel.style.border = '1px solid var(--modifiers-normal-color-light-border-1, #e5e7eb)';
    infoPanel.innerHTML = \`
      <div style="margin-bottom: 12px;">
        <strong style="color: var(--modifiers-normal-color-light-fg-1-high, #303a47); font-size: 14px;">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);">
        <div><strong>Tamaño:</strong> \${args.size || 'md'}</div>
        <div><strong>Altura máxima:</strong> \${args.maxHeight || '400px'}</div>
        <div><strong>Scrollbar UBITS:</strong> \${args.showScrollbar ? 'Sí' : 'No'}</div>
        <div><strong>Item 1:</strong> \${args.item1State || 'default'}</div>
        <div><strong>Item 2:</strong> \${args.item2State || 'active'}</div>
        <div><strong>Item 3:</strong> \${args.item3State || 'disabled'}</div>
        <div><strong>Item 4:</strong> \${args.item4State || 'default'}</div>
      </div>
    \`;

    // List container
    const listContainer = document.createElement('div');
    listContainer.id = \`list-preview-\${Date.now()}\`;
    listContainer.style.width = '100%';
    listContainer.style.maxWidth = '400px';

    // Renderizar lista usando la misma función que Autoframe
    const listHTML = renderListSimple(args);
    listContainer.innerHTML = listHTML;

    // Cargar CSS del scrollbar siempre (para que esté disponible cuando se active)
    const scrollbarCSSId = 'ubits-scrollbar-css';
    if (!document.getElementById(scrollbarCSSId)) {
      const link = document.createElement('link');
      link.id = scrollbarCSSId;
      link.rel = 'stylesheet';
      link.href = '../../components/scroll/src/styles/scroll.css';
      document.head.appendChild(link);
    }
    preview.appendChild(infoPanel);
    preview.appendChild(listContainer);
    container.appendChild(preview);
    return container;
  }
}`,...f.parameters?.docs?.source}}};const $=["Default"];export{f as Default,$ as __namedExportsOrder,w as default};
