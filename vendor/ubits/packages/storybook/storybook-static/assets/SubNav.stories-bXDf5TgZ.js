import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";const p={template:{name:"Plantilla",tabs:[{id:"section1",label:"Sección 1",icon:"far fa-home"},{id:"section2",label:"Sección 2",icon:"far fa-book"},{id:"section3",label:"Sección 3",icon:"far fa-chart-line"},{id:"section4",label:"Sección 4",icon:"far fa-cog"},{id:"section5",label:"Sección 5",icon:"far fa-star"}]},aprendizaje:{name:"Aprendizaje",tabs:[{id:"home",label:"Inicio",icon:"far fa-home",url:"home-learn.html"},{id:"catalog",label:"Catálogo",icon:"far fa-book",url:"catalogo.html"},{id:"corporate",label:"U. Corporativa",icon:"far fa-building-columns",url:"u-corporativa.html"},{id:"study-zone",label:"Zona de estudio",icon:"far fa-books",url:"zona-estudio.html"}]},desempeno:{name:"Desempeño",tabs:[{id:"evaluations",label:"Evaluaciones 360",icon:"far fa-chart-pie",url:"evaluaciones-360.html"},{id:"objectives",label:"Objetivos",icon:"far fa-bullseye",url:"objetivos.html"},{id:"metrics",label:"Métricas",icon:"far fa-chart-line",url:"metricas.html"},{id:"reports",label:"Reportes",icon:"far fa-file-chart-line",url:"reportes.html"}]},encuestas:{name:"Encuestas",tabs:[{id:"encuestas",label:"Encuestas",icon:"far fa-clipboard-list-check",url:"encuestas.html"}]},tareas:{name:"Tareas",tabs:[{id:"plans",label:"Planes",icon:"far fa-layer-group",url:"planes.html"},{id:"tasks",label:"Tareas",icon:"far fa-tasks",url:"tareas.html"}]},empresa:{name:"Empresa",tabs:[{id:"gestion-usuarios",label:"Gestión de usuarios",icon:"far fa-users"},{id:"organigrama",label:"Organigrama",icon:"far fa-sitemap"},{id:"datos-empresa",label:"Datos de empresa",icon:"far fa-building"},{id:"personalizacion",label:"Personalización",icon:"far fa-paint-brush"},{id:"roles-permisos",label:"Roles y permisos",icon:"far fa-user-shield"},{id:"comunicaciones",label:"Comunicaciones",icon:"far fa-envelope"}]},"admin-aprendizaje":{name:"Aprendizaje",tabs:[{id:"lms-cursos",label:"LMS - Cursos propios",icon:"far fa-book"},{id:"plan-formacion",label:"Plan de formación",icon:"far fa-clipboard-list-check"},{id:"certificados",label:"Certificados",icon:"far fa-file-certificate"},{id:"metricas-empresa",label:"Métricas de empresa",icon:"far fa-chart-line"}]},"admin-desempeno":{name:"Desempeño",tabs:[{id:"evaluations",label:"Evaluaciones 360",icon:"far fa-chart-pie"},{id:"objectives",label:"Objetivos",icon:"far fa-bullseye"},{id:"matriz-talento",label:"Matriz de Talento",icon:"far fa-sitemap"}]}};function v(e){return p[e]||p.template}function h(e,o="regular"){const t=o==="regular"?"far":"fas",i=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${t} ${i}"></i>`}function y(e){const{variant:o="template",tabs:t,activeTabId:i,showIcons:n=!1}=e,r=v(o),s=o==="template"&&t&&t.length>0?t:r.tabs,l=i||(s.length>0?s[0].id:""),d=s.map(a=>{const c=a.id===l||a.active?"ubits-sub-nav-tab--active":"",m=n?h(a.icon):"";return`
      <button 
        class="ubits-sub-nav-tab ${c}" 
        data-tab="${a.id}"
        ${a.url?`data-url="${a.url}"`:""}
        ${a.onClick?'data-has-click-handler="true"':""}
      >
        ${m}
        <span>${a.label}</span>
      </button>
    `}).join("");return`
    <nav class="ubits-sub-nav" data-variant="${o}">
      <div class="ubits-sub-nav-tabs">
        ${d}
      </div>
    </nav>
  `.trim()}function T(e,o){const t=e.querySelectorAll(".ubits-sub-nav-tab"),i=n=>{const r=n.getAttribute("data-tab"),s=n.getAttribute("data-url");if(t.forEach(c=>c.classList.remove("ubits-sub-nav-tab--active")),n.classList.add("ubits-sub-nav-tab--active"),s){window.location.href=s;return}const l=v(o.variant||"template"),a=(o.variant==="template"&&o.tabs&&o.tabs.length>0?o.tabs:l.tabs).find(c=>c.id===r);a&&a.onClick&&a.onClick(new MouseEvent("click")),o.onTabChange&&o.onTabChange(r||"",n);const u=new CustomEvent("subNavTabClick",{detail:{tabId:r,tabElement:n}});document.dispatchEvent(u)};t.forEach(n=>{n.addEventListener("click",r=>{r.preventDefault(),i(n)})})}function I(e){const{containerId:o}=e,t=document.getElementById(o);if(!t)throw new Error(`Container with id "${o}" not found`);const i=y(e);t.innerHTML=i;const n=t.querySelector(".ubits-sub-nav");if(!n)throw new Error("Failed to create sub-nav element");return T(n,e),n}const C={title:"Navegación/SubNav",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Componente SubNav UBITS de navegación superior horizontal con 8 variantes predefinidas. Muestra sub-navegaciones de los módulos principales con tabs personalizables, navegación por URL o callbacks, y soporte completo para dark mode. Se oculta en móvil y se reemplaza por tab-bar."}}},argTypes:{variant:{control:{type:"select"},options:["template","aprendizaje","desempeno","encuestas","tareas","empresa","admin-aprendizaje","admin-desempeno"],description:"Variante del SubNav",table:{type:{summary:"SubNavVariant"},defaultValue:{summary:"template"}}},activeTabId:{control:{type:"text"},description:"ID del tab activo (se actualiza automáticamente al cambiar la variante)",table:{type:{summary:"string"}}},showIcons:{control:{type:"boolean"},description:"Mostrar iconos en los tabs del SubNav",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},containerId:{control:!1,description:"ID del contenedor (asignado automáticamente)"}}},b={args:{containerId:"subnav-story-container",variant:"template",activeTabId:"section1",showIcons:!1},render:e=>{const o=document.getElementById(e.containerId||"subnav-story-container");o&&(o.innerHTML="");const t=e.variant||"template",i=v(t);let n=e.activeTabId;(!n||!i.tabs.find(a=>a.id===n))&&(n=i.tabs.length>0?i.tabs[0].id:"");const r=document.createElement("div");r.style.cssText=`
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;const s=document.createElement("div");s.id=e.containerId||"subnav-story-container",s.style.cssText=`
      width: 100%;
      margin-bottom: 24px;
    `,r.appendChild(s);const l=document.createElement("div");l.style.cssText=`
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;const d=i.tabs.find(a=>a.id===n);return l.innerHTML=`
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del SubNav</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Variante:</strong> ${i.name}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tab Activo:</strong> ${d?d.label:n}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tabs disponibles:</strong> ${i.tabs.length}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Iconos:</strong> ${e.showIcons?"Mostrados":"Ocultos"}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${i.tabs.map(a=>a.id).join(", ")}</div>
      </div>
    `,r.appendChild(l),requestAnimationFrame(()=>{try{I({containerId:s.id,variant:t,activeTabId:n,showIcons:e.showIcons??!1,onTabChange:(a,u)=>{const m=v(t).tabs.find(f=>f.id===a),g=l.querySelector('div[style*="grid"]');if(g&&m){const f=g.querySelector("div:nth-child(2)");f&&(f.innerHTML=`<strong>Tab Activo:</strong> ${m.label}`)}}})}catch(a){console.error("Error creando SubNav:",a),s.innerHTML=`<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${a}</p>`}}),r}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    containerId: 'subnav-story-container',
    variant: 'template',
    activeTabId: 'section1',
    showIcons: false
  } as SubNavOptions & {
    variant?: SubNavVariant;
    activeTabId?: string;
    showIcons?: boolean;
  },
  render: args => {
    // Limpiar contenedor previo si existe
    const existingContainer = document.getElementById(args.containerId || 'subnav-story-container');
    if (existingContainer) {
      existingContainer.innerHTML = '';
    }
    const variant = args.variant || 'template';
    const config = getSubNavConfig(variant);
    // Determinar tab activo: usar el especificado, o el primero disponible si no está en la lista
    let activeTabId = args.activeTabId;
    if (!activeTabId || !config.tabs.find(tab => tab.id === activeTabId)) {
      activeTabId = config.tabs.length > 0 ? config.tabs[0].id : '';
    }

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

    // Contenedor para el SubNav
    const container = document.createElement('div');
    container.id = args.containerId || 'subnav-story-container';
    container.style.cssText = \`
      width: 100%;
      margin-bottom: 24px;
    \`;
    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = \`
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    \`;
    const activeTab = config.tabs.find(tab => tab.id === activeTabId);
    infoPanel.innerHTML = \`
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del SubNav</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Variante:</strong> \${config.name}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tab Activo:</strong> \${activeTab ? activeTab.label : activeTabId}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tabs disponibles:</strong> \${config.tabs.length}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Iconos:</strong> \${args.showIcons ? 'Mostrados' : 'Ocultos'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> \${config.tabs.map(t => t.id).join(', ')}</div>
      </div>
    \`;
    wrapper.appendChild(infoPanel);

    // Crear el SubNav usando requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      try {
        createSubNav({
          containerId: container.id,
          variant: variant,
          activeTabId: activeTabId,
          showIcons: args.showIcons ?? false,
          onTabChange: (tabId, tabElement) => {
            // Tab cambiado
            // Actualizar info
            const config = getSubNavConfig(variant);
            const tab = config.tabs.find(t => t.id === tabId);
            // Actualizar panel de información
            const infoContent = infoPanel.querySelector('div[style*="grid"]');
            if (infoContent && tab) {
              const activeTabDiv = infoContent.querySelector('div:nth-child(2)');
              if (activeTabDiv) {
                activeTabDiv.innerHTML = \`<strong>Tab Activo:</strong> \${tab.label}\`;
              }
            }
          }
        });
      } catch (error) {
        console.error('Error creando SubNav:', error);
        container.innerHTML = \`<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: \${error}</p>\`;
      }
    });
    return wrapper;
  }
}`,...b.parameters?.docs?.source},description:{story:"Story por defecto con todos los controles",...b.parameters?.docs?.description}}};const w=["Default"];export{b as Default,w as __namedExportsOrder,C as default};
