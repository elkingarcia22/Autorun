import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";function p(r,a=!1){if(!r)return"";let n=r;n.startsWith("fa-")||(n=`fa-${n}`);const i=a?"fas":"far";if(n.startsWith("far ")||n.startsWith("fas ")){const s=n.replace(/^(far|fas)\s+/,"");return`<i class="${i} ${s}"></i>`}return`<i class="${i} ${n}"></i>`}function v(r){const{tabs:a,activeTabId:n,className:i=""}=r;if(!a||a.length===0)return'<div class="ubits-tabs"></div>';let s=n;if(!s){const o=a.find(t=>t.active);s=o?o.id:a[0].id}const e=a.map(o=>{const t=o.id===s,d=t?"ubits-tab--active":"",c=o.disabled?"ubits-tab--disabled":"",u=["ubits-tab",d,c].filter(Boolean).join(" "),g=o.icon?p(o.icon,t):"";return`
      <button 
        class="${u}" 
        data-tab-id="${o.id}"
        ${o.disabled?"disabled":""}
        ${o.url?`data-url="${o.url}"`:""}
        ${o.onClick?'data-has-click-handler="true"':""}
      >
        ${g}
        <span class="ubits-tab__label">${o.label}</span>
      </button>
    `}).join("");return`
    <div class="${["ubits-tabs",i].filter(Boolean).join(" ")}">
      ${e}
    </div>
  `.trim()}function m(r,a){r.querySelectorAll(".ubits-tab[data-listener-attached]").forEach(e=>{const l=e.cloneNode(!0);e.parentNode?.replaceChild(l,e)});const i=r.querySelectorAll(".ubits-tab:not(.ubits-tab--disabled)"),s=e=>{const l=e.getAttribute("data-tab-id"),o=e.getAttribute("data-url");if(r.querySelectorAll(".ubits-tab").forEach(c=>{c.classList.remove("ubits-tab--active")}),e.classList.add("ubits-tab--active"),o){window.location.href=o;return}const t=a.tabs.find(c=>c.id===l);t&&t.onClick&&t.onClick(new MouseEvent("click")),a.onTabChange&&a.onTabChange(l||"",e);const d=new CustomEvent("tabsTabClick",{detail:{tabId:l,tabElement:e}});document.dispatchEvent(d)};i.forEach(e=>{e.setAttribute("data-listener-attached","true"),e.addEventListener("click",l=>{l.preventDefault(),s(e)})})}function h(r,a){const n=a&&document.getElementById(a)||document.createElement("div");return a&&!n.id&&(n.id=a),n.innerHTML=v(r),requestAnimationFrame(()=>{const i=n.querySelector(".ubits-tabs");m(i||n,r)}),n}const x={title:"Navegación/Tabs",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Componente Tabs UBITS de navegación horizontal con soporte para iconos opcionales. El tab activo muestra fondo blanco, icono oscuro, texto en negrita y una línea vertical rosa a la izquierda. Los tabs inactivos muestran icono y texto en gris claro sin fondo."}}},argTypes:{tabs:{control:{type:"object"},description:"Array de tabs a mostrar",table:{type:{summary:"TabItem[]"}}},activeTabId:{control:{type:"text"},description:"ID del tab activo",table:{type:{summary:"string"}}},showIcons:{control:{type:"boolean"},description:"Mostrar iconos en los tabs",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},tabCount:{control:{type:"number",min:1,max:10,step:1},description:"Número de tabs a mostrar",table:{type:{summary:"number"},defaultValue:{summary:"5"}}}}};function f(r=5,a=!0){const n=["fa-th","fa-chart-line","fa-cog","fa-star","fa-book","fa-home","fa-user","fa-bell","fa-envelope","fa-calendar"],i=["Label 1","Label 2","Label 3","Label 4","Label 5","Label 6","Label 7","Label 8","Label 9","Label 10"];return Array.from({length:r},(s,e)=>({id:`tab-${e+1}`,label:i[e]||`Label ${e+1}`,icon:a?`far ${n[e]||"fa-th"}`:void 0,active:e===0}))}const b={args:{tabs:f(5,!0),activeTabId:"tab-1",showIcons:!0,tabCount:5},render:r=>{const a=r.showIcons!==!1,n=f(r.tabCount||5,a),i=r.activeTabId||n[0]?.id;n.forEach(t=>{t.active=t.id===i});const s=document.createElement("div");s.style.cssText=`
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;const e=document.createElement("div");e.id="tabs-story-container",e.style.cssText=`
      width: 100%;
      margin-bottom: 24px;
    `,s.appendChild(e);const l=document.createElement("div");l.id="tabs-info-panel",l.style.cssText=`
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `,n.find(t=>t.id===i);const o=t=>{const d=n.find(c=>c.id===t);l.innerHTML=`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Tabs</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tab Activo:</strong> ${d?d.label:t}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tabs totales:</strong> ${n.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Con iconos:</strong> ${a?"Sí":"No"}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${n.map(c=>c.id).join(", ")}</div>
        </div>
      `};return o(i),s.appendChild(l),requestAnimationFrame(()=>{try{e.innerHTML="",h({tabs:n,activeTabId:i,onTabChange:(t,d)=>{o(t)}},e.id)}catch(t){console.error("Error creando Tabs:",t),e.innerHTML=`<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: var(--p-spacing-mode-1-lg, 16px);">Error: ${t}</p>`}}),s}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: generateTabs(5, true),
    activeTabId: 'tab-1',
    showIcons: true,
    tabCount: 5
  },
  render: args => {
    // Generar tabs según los controles - SIEMPRE regenerar basándose en showIcons
    const shouldShowIcons = args.showIcons !== false;
    const tabs = generateTabs(args.tabCount || 5, shouldShowIcons);

    // Asegurar que el tab activo esté correctamente marcado
    const activeId = args.activeTabId || tabs[0]?.id;
    tabs.forEach(tab => {
      tab.active = tab.id === activeId;
    });

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    \`;

    // Contenedor para el Tabs
    const container = document.createElement('div');
    container.id = 'tabs-story-container';
    container.style.cssText = \`
      width: 100%;
      margin-bottom: 24px;
    \`;
    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'tabs-info-panel';
    infoPanel.style.cssText = \`
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    \`;
    const activeTab = tabs.find(tab => tab.id === activeId);
    const updateInfoPanel = (currentActiveId: string) => {
      const currentTab = tabs.find(tab => tab.id === currentActiveId);
      infoPanel.innerHTML = \`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Tabs</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tab Activo:</strong> \${currentTab ? currentTab.label : currentActiveId}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tabs totales:</strong> \${tabs.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Con iconos:</strong> \${shouldShowIcons ? 'Sí' : 'No'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> \${tabs.map(t => t.id).join(', ')}</div>
        </div>
      \`;
    };
    updateInfoPanel(activeId);
    wrapper.appendChild(infoPanel);

    // Crear el Tabs usando createTabs para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';

        // Crear tabs con listeners
        createTabs({
          tabs: tabs,
          activeTabId: activeId,
          onTabChange: (tabId, tabElement) => {
            // Tab cambiado
            // Actualizar panel de información
            updateInfoPanel(tabId);
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Tabs:', error);
        container.innerHTML = \`<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: var(--p-spacing-mode-1-lg, 16px);">Error: \${error}</p>\`;
      }
    });
    return wrapper;
  }
}`,...b.parameters?.docs?.source},description:{story:"Story por defecto con todos los controles",...b.parameters?.docs?.description}}};const I=["Default"];export{b as Default,I as __namedExportsOrder,x as default};
