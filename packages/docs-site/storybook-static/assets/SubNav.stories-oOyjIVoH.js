import"./iframe-CHGeu5ha.js";import"./preload-helper-PPVm8Dsz.js";const g={template:{name:"Plantilla",tabs:[{id:"section1",label:"Sección 1",icon:"far fa-home"},{id:"section2",label:"Sección 2",icon:"far fa-book"},{id:"section3",label:"Sección 3",icon:"far fa-chart-line"},{id:"section4",label:"Sección 4",icon:"far fa-cog"},{id:"section5",label:"Sección 5",icon:"far fa-star"}]},aprendizaje:{name:"Aprendizaje",tabs:[{id:"home",label:"Inicio",icon:"far fa-home",url:"home-learn.html"},{id:"catalog",label:"Catálogo",icon:"far fa-book",url:"catalogo.html"},{id:"corporate",label:"U. Corporativa",icon:"far fa-building-columns",url:"u-corporativa.html"},{id:"study-zone",label:"Zona de estudio",icon:"far fa-books",url:"zona-estudio.html"}]},desempeno:{name:"Desempeño",tabs:[{id:"evaluations",label:"Evaluaciones 360",icon:"far fa-chart-pie",url:"evaluaciones-360.html"},{id:"objectives",label:"Objetivos",icon:"far fa-bullseye",url:"objetivos.html"},{id:"metrics",label:"Métricas",icon:"far fa-chart-line",url:"metricas.html"},{id:"reports",label:"Reportes",icon:"far fa-file-chart-line",url:"reportes.html"}]},encuestas:{name:"Encuestas",tabs:[{id:"encuestas",label:"Encuestas",icon:"far fa-clipboard-list-check",url:"encuestas.html"}]},tareas:{name:"Tareas",tabs:[{id:"plans",label:"Planes",icon:"far fa-layer-group",url:"planes.html"},{id:"tasks",label:"Tareas",icon:"far fa-tasks",url:"tareas.html"}]},empresa:{name:"Empresa",tabs:[{id:"gestion-usuarios",label:"Gestión de usuarios",icon:"far fa-users"},{id:"organigrama",label:"Organigrama",icon:"far fa-sitemap"},{id:"datos-empresa",label:"Datos de empresa",icon:"far fa-building"},{id:"personalizacion",label:"Personalización",icon:"far fa-paint-brush"},{id:"roles-permisos",label:"Roles y permisos",icon:"far fa-user-shield"},{id:"comunicaciones",label:"Comunicaciones",icon:"far fa-envelope"}]},"admin-aprendizaje":{name:"Aprendizaje",tabs:[{id:"lms-cursos",label:"LMS - Cursos propios",icon:"far fa-book"},{id:"plan-formacion",label:"Plan de formación",icon:"far fa-clipboard-list-check"},{id:"certificados",label:"Certificados",icon:"far fa-file-certificate"},{id:"metricas-empresa",label:"Métricas de empresa",icon:"far fa-chart-line"}]},"admin-desempeno":{name:"Desempeño",tabs:[{id:"evaluations",label:"Evaluaciones 360",icon:"far fa-chart-pie"},{id:"objectives",label:"Objetivos",icon:"far fa-bullseye"},{id:"matriz-talento",label:"Matriz de Talento",icon:"far fa-sitemap"}]}};function v(n){return g[n]||g.template}function h(n,e="regular"){const t=e==="regular"?"far":"fas",r=n.startsWith("fa-")?n:`fa-${n}`;return`<i class="${t} ${r}"></i>`}function T(n){const{variant:e="template",tabs:t,activeTabId:r}=n,a=v(e),o=e==="template"&&t&&t.length>0?t:a.tabs,c=r||(o.length>0?o[0].id:""),l=o.map(s=>`
      <button 
        class="ubits-sub-nav-tab ${s.id===c||s.active?"ubits-sub-nav-tab--active":""}" 
        data-tab="${s.id}"
        ${s.url?`data-url="${s.url}"`:""}
        ${s.onClick?'data-has-click-handler="true"':""}
      >
        ${h(s.icon)}
        <span>${s.label}</span>
      </button>
    `).join("");return`
    <nav class="ubits-sub-nav" data-variant="${e}">
      <div class="ubits-sub-nav-tabs">
        ${l}
      </div>
    </nav>
  `.trim()}function y(n,e){const t=n.querySelectorAll(".ubits-sub-nav-tab"),r=a=>{const o=a.getAttribute("data-tab"),c=a.getAttribute("data-url");if(t.forEach(u=>u.classList.remove("ubits-sub-nav-tab--active")),a.classList.add("ubits-sub-nav-tab--active"),c){window.location.href=c;return}const l=v(e.variant||"template"),i=(e.variant==="template"&&e.tabs&&e.tabs.length>0?e.tabs:l.tabs).find(u=>u.id===o);i&&i.onClick&&i.onClick(new MouseEvent("click")),e.onTabChange&&e.onTabChange(o||"",a);const b=new CustomEvent("subNavTabClick",{detail:{tabId:o,tabElement:a}});document.dispatchEvent(b)};t.forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),r(a)})})}function x(n){const{containerId:e}=n,t=document.getElementById(e);if(!t)throw new Error(`Container with id "${e}" not found`);const r=T(n);t.innerHTML=r;const a=t.querySelector(".ubits-sub-nav");if(!a)throw new Error("Failed to create sub-nav element");return y(a,n),a}const S={title:"Components/SubNav",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Componente SubNav UBITS de navegación superior horizontal con 8 variantes predefinidas. Muestra sub-navegaciones de los módulos principales con tabs personalizables, navegación por URL o callbacks, y soporte completo para dark mode. Se oculta en móvil y se reemplaza por tab-bar."}}},argTypes:{variant:{control:{type:"select"},options:["template","aprendizaje","desempeno","encuestas","tareas","empresa","admin-aprendizaje","admin-desempeno"],description:"Variante del SubNav",table:{type:{summary:"SubNavVariant"},defaultValue:{summary:"template"}}},activeTabId:{control:{type:"text"},description:"ID del tab activo (se actualiza automáticamente al cambiar la variante)",table:{type:{summary:"string"}}},containerId:{control:!1,description:"ID del contenedor (asignado automáticamente)"}}},d={args:{containerId:"subnav-story-container",variant:"template",activeTabId:"section1"},render:n=>{const e=document.getElementById(n.containerId||"subnav-story-container");e&&(e.innerHTML="");const t=n.variant||"template",r=v(t);let a=n.activeTabId;(!a||!r.tabs.find(i=>i.id===a))&&(a=r.tabs.length>0?r.tabs[0].id:"");const o=document.createElement("div");o.style.cssText=`
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--ubits-bg-2);
      border-radius: 12px;
      border: 1px solid var(--ubits-border-1);
    `;const c=document.createElement("div");c.id=n.containerId||"subnav-story-container",c.style.cssText=`
      width: 100%;
      margin-bottom: 24px;
    `,o.appendChild(c);const l=document.createElement("div");l.style.cssText=`
      margin-top: 20px;
      padding: 16px;
      background: var(--ubits-bg-2);
      border-radius: 8px;
      font-family: var(--font-sans);
      font-size: 14px;
    `;const s=r.tabs.find(i=>i.id===a);return l.innerHTML=`
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--ubits-fg-1-high);">Información del SubNav</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
        <div><strong>Variante:</strong> ${r.name}</div>
        <div><strong>Tab Activo:</strong> ${s?s.label:a}</div>
        <div><strong>Tabs disponibles:</strong> ${r.tabs.length}</div>
        <div><strong>IDs:</strong> ${r.tabs.map(i=>i.id).join(", ")}</div>
      </div>
    `,o.appendChild(l),requestAnimationFrame(()=>{try{x({containerId:c.id,variant:t,activeTabId:a,onTabChange:(i,b)=>{console.log("Tab cambiado:",i,b);const f=v(t).tabs.find(p=>p.id===i),m=l.querySelector('div[style*="grid"]');if(m&&f){const p=m.querySelector("div:nth-child(2)");p&&(p.innerHTML=`<strong>Tab Activo:</strong> ${f.label}`)}}})}catch(i){console.error("Error creando SubNav:",i),c.innerHTML=`<p style="color: var(--ubits-feedback-border-error); padding: 16px;">Error: ${i}</p>`}}),o}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    containerId: 'subnav-story-container',
    variant: 'template',
    activeTabId: 'section1'
  } as SubNavOptions & {
    variant?: SubNavVariant;
    activeTabId?: string;
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
      background: var(--ubits-bg-2);
      border-radius: 12px;
      border: 1px solid var(--ubits-border-1);
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
      background: var(--ubits-bg-2);
      border-radius: 8px;
      font-family: var(--font-sans);
      font-size: 14px;
    \`;
    const activeTab = config.tabs.find(tab => tab.id === activeTabId);
    infoPanel.innerHTML = \`
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--ubits-fg-1-high);">Información del SubNav</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
        <div><strong>Variante:</strong> \${config.name}</div>
        <div><strong>Tab Activo:</strong> \${activeTab ? activeTab.label : activeTabId}</div>
        <div><strong>Tabs disponibles:</strong> \${config.tabs.length}</div>
        <div><strong>IDs:</strong> \${config.tabs.map(t => t.id).join(', ')}</div>
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
          onTabChange: (tabId, tabElement) => {
            console.log('Tab cambiado:', tabId, tabElement);
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
        container.innerHTML = \`<p style="color: var(--ubits-feedback-border-error); padding: 16px;">Error: \${error}</p>\`;
      }
    });
    return wrapper;
  }
}`,...d.parameters?.docs?.source},description:{story:"Story por defecto con todos los controles",...d.parameters?.docs?.description}}};const E=["Default"];export{d as Default,E as __namedExportsOrder,S as default};
