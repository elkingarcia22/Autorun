import"./iframe-Cv55Ao8S.js";import"./preload-helper-PPVm8Dsz.js";function E(e,n="regular"){const t=n==="regular"?"far":"fas",a=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${t} ${a}"></i>`}function L(e){const{items:n,activeTabId:t,visible:a=!1,className:i=""}=e,u=["ubits-tabbar",a?"ubits-tabbar--visible":"",i].filter(Boolean).join(" "),p=n.map(c=>{const d=["ubits-tabbar-item",c.id===t?"ubits-tabbar-item--active":""].filter(Boolean).join(" ");let m="";return c.avatar?m=`<img src="${c.avatar}" alt="${c.avatarAlt||c.label}" class="ubits-tabbar-avatar">`:c.icon&&(m=`<span class="ubits-tabbar-icon">${E(c.icon)}</span>`),`
      <div 
        class="${d}" 
        data-tab-id="${c.id}"
        data-has-click-handler="${c.onClick?"true":"false"}"
      >
        ${m}
        <span class="ubits-tabbar-text">${c.label}</span>
      </div>
    `}).join(`
`);return`
    <div class="${u}" id="ubits-tabbar">
      <div class="ubits-tabbar-content">
        ${p}
      </div>
    </div>
  `}function I(e){const{containerId:n,container:t,items:a,activeTabId:i,onTabChange:u,visible:p=!1,darkModeEnabled:c=!1,onDarkModeToggle:s}=e;let d=null;if(t?d=t:n&&(d=document.getElementById(n)),!d)return console.error("TabBar: Contenedor no encontrado"),null;const m=d.classList.contains("ubits-tabbar-preview-container"),b=L({...e,visible:p||m,className:m?"ubits-tabbar--preview":""});d.innerHTML=b,m&&window.getComputedStyle(d).position==="static"&&(d.style.position="relative");const l=d.querySelector(".ubits-tabbar");return l?(S(l,a,u,c,s,e.floatingMenuSections,e.profileMenuItems,e.onFloatingMenuItemClick,e.onProfileMenuItemClick,d),l):(console.error("TabBar: Elemento no encontrado después de renderizar"),null)}function x(e){const n=e.map(t=>{if(t.isLink)return`
        <a href="${t.url||"#"}" class="ubits-accordion-link ubits-accordion-link--direct" data-section-id="${t.id}">
          <div class="ubits-accordion-icon-circle" data-circle-id="${t.id}">
            ${E(t.icon)}
          </div>
          <span>${t.title}</span>
          <i class="far fa-chevron-right ubits-accordion-chevron"></i>
        </a>
      `;const a=(t.subitems||[]).map(i=>`
      <a href="${i.url}" class="ubits-accordion-link" data-subitem-id="${i.id}">
        <div class="ubits-accordion-icon-circle" data-circle-id="${i.id}">
          ${E(i.icon)}
        </div>
        <span>${i.title}</span>
      </a>
    `).join("");return`
      <div class="ubits-accordion-item">
        <div class="ubits-accordion-header" data-accordion-id="${t.id}">
          <div class="ubits-accordion-title">
            <div class="ubits-accordion-icon-circle" data-circle-id="${t.id}">
              ${E(t.icon)}
            </div>
            <span>${t.title}</span>
          </div>
          <i class="far fa-chevron-down ubits-accordion-chevron" data-chevron-id="${t.id}"></i>
        </div>
        <div class="ubits-accordion-body" data-body-id="${t.id}">
          ${a}
        </div>
      </div>
    `}).join("");return`
    <div class="ubits-floating-menu" id="ubits-floating-menu">
      <div class="ubits-floating-menu-header">
        <h2 class="ubits-floating-menu-title">Módulos</h2>
        <button class="ubits-floating-menu-close" id="ubits-floating-menu-close">
          ${E("times")}
        </button>
      </div>
      <div class="ubits-floating-menu-content">
        ${n}
      </div>
    </div>
  `}function C(e){return`
    <div class="ubits-profile-menu" id="ubits-profile-menu">
      ${e.map(t=>`
    <div class="ubits-profile-menu-item" data-profile-item-id="${t.id}" ${t.url?`data-href="${t.url}"`:""}>
      <i class="far fa-${t.icon} ubits-profile-menu-icon"></i>
      <span class="ubits-profile-menu-text">${t.label}</span>
    </div>
  `).join("")}
    </div>
  `}function S(e,n,t,a=!1,i,u,p,c,s,d){const m=e.querySelectorAll(".ubits-tabbar-item"),b=d||e.parentElement,l=b?.classList.contains("ubits-tabbar-preview-container");let o=null,r=null;if(u&&u.length>0&&(o=document.getElementById("ubits-floating-menu-container")||document.createElement("div"),o.id="ubits-floating-menu-container",l?o.style.cssText="position: absolute; top: 0; left: 0; right: 0; bottom: 76px; width: 100%; height: 500px; z-index: 2000; overflow: visible; display: none;":o.style.cssText="",document.getElementById("ubits-floating-menu-container")||(b?b.appendChild(o):document.body.appendChild(o)),o.innerHTML=x(u),B(o,c)),p&&p.length>0){if(r=document.getElementById("ubits-profile-menu-container")||document.createElement("div"),r.id="ubits-profile-menu-container",l?r.style.cssText="position: absolute; bottom: 76px; left: 0; right: 0; width: 100%; max-width: 100%; z-index: 2001; overflow: visible; display: none;":r.style.cssText="",document.getElementById("ubits-profile-menu-container")||(b?b.appendChild(r):document.body.appendChild(r)),r.innerHTML=C(p),l){const y=r.querySelector(".ubits-profile-menu");y&&(y.classList.add("ubits-profile-menu--preview"),y.style.cssText="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;")}$(r,p,s)}m.forEach(y=>{const M=y,g=M.getAttribute("data-tab-id");if(!g)return;const h=n.find(k=>k.id===g);h&&M.addEventListener("click",k=>{if(k.preventDefault(),k.stopPropagation(),g==="modo-oscuro"&&a){if(D(e,i),o){o.style.display="none";const f=o.querySelector(".ubits-floating-menu");f&&f.classList.remove("ubits-floating-menu--show")}if(r){r.style.display="none";const f=r.querySelector(".ubits-profile-menu");f&&f.classList.remove("ubits-profile-menu--show")}return}if(g==="modulos"&&o){const f=o.querySelector(".ubits-floating-menu");if(f){if(f.classList.contains("ubits-floating-menu--show"))f.classList.remove("ubits-floating-menu--show");else if(f.classList.add("ubits-floating-menu--show","ubits-floating-menu--preview"),l&&o&&(o.style.display="block",o.style.position="absolute",o.style.top="0",o.style.left="0",o.style.right="0",o.style.bottom="76px",o.style.width="100%",o.style.height="500px",o.style.zIndex="2000",o.style.overflow="visible",f.style.cssText="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; display: block;"),r){const v=r.querySelector(".ubits-profile-menu");v&&v.classList.remove("ubits-profile-menu--show"),r.style.display="none"}}return}if(g==="perfil"&&r){const f=r.querySelector(".ubits-profile-menu");if(f)if(f.classList.contains("ubits-profile-menu--show"))f.classList.remove("ubits-profile-menu--show"),r.style.display="none";else{if(f.classList.add("ubits-profile-menu--show"),l&&r){r.style.display="block",r.style.position="absolute",r.style.bottom="76px",r.style.left="0",r.style.right="0",r.style.width="100%",r.style.maxWidth="100%",r.style.zIndex="2001",r.style.overflow="visible";const v=r.querySelector(".ubits-profile-menu");v&&(v.style.cssText="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;",v.classList.add("ubits-profile-menu--preview"))}if(o){const v=o.querySelector(".ubits-floating-menu");v&&v.classList.remove("ubits-floating-menu--show")}}return}h.onClick&&h.onClick(h,k),P(e,g),t&&t(g,h,M)})})}function B(e,n){const t=e.querySelector(".ubits-floating-menu");if(!t)return;const a=t.querySelector("#ubits-floating-menu-close");a&&a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),e&&(e.style.display="none"),t&&t.classList.remove("ubits-floating-menu--show")}),t.querySelectorAll(".ubits-accordion-header").forEach(s=>{s.addEventListener("click",()=>{const d=s.getAttribute("data-accordion-id");d&&q(d)})}),t.querySelectorAll(".ubits-accordion-link").forEach(s=>{s.addEventListener("click",d=>{const m=s.getAttribute("data-section-id"),b=s.getAttribute("data-subitem-id"),l=s.getAttribute("href");n&&n(m||"",b||void 0,l||void 0)})});const p=s=>{s.key==="Escape"&&t.classList.contains("ubits-floating-menu--show")&&(e.style.display="none",t.classList.remove("ubits-floating-menu--show"))};document.addEventListener("keydown",p);const c=s=>{if(t.classList.contains("ubits-floating-menu--show")){const d=s.target;!t.contains(d)&&!d.closest('[data-tab-id="modulos"]')&&(e.style.display="none",t.classList.remove("ubits-floating-menu--show"))}};document.addEventListener("click",c)}function $(e,n,t){const a=e.querySelector(".ubits-profile-menu");if(!a)return;a.querySelectorAll(".ubits-profile-menu-item").forEach(u=>{u.addEventListener("click",p=>{const c=u.getAttribute("data-profile-item-id");if(c){const s=n.find(d=>d.id===c);s&&(s.onClick?s.onClick():s.url&&(window.location.href=s.url),t&&t(c,s),w())}})}),document.addEventListener("keydown",u=>{u.key==="Escape"&&a.classList.contains("ubits-profile-menu--show")&&w()}),document.addEventListener("click",u=>{if(a.classList.contains("ubits-profile-menu--show")){const p=u.target;!a.contains(p)&&!p.closest('[data-tab-id="perfil"]')&&w()}})}function w(){const e=document.getElementById("ubits-profile-menu");e&&e.classList.remove("ubits-profile-menu--show")}function q(e){const n=document.querySelector(`[data-body-id="${e}"]`),t=document.querySelector(`[data-chevron-id="${e}"]`),a=document.querySelector(`[data-circle-id="${e}"]`),i=document.querySelector(`[data-accordion-id="${e}"] .ubits-accordion-title`);if(!n||!t||!a||!i)return;const u=n.style.display==="block";A(),u||(n.style.display="block",t.style.transform="rotate(180deg)",i.classList.add("active"),a.classList.add("active"))}function A(){const e=document.querySelectorAll(".ubits-accordion-body"),n=document.querySelectorAll(".ubits-accordion-chevron"),t=document.querySelectorAll(".ubits-accordion-icon-circle"),a=document.querySelectorAll(".ubits-accordion-title");e.forEach(i=>{i.style.display="none"}),n.forEach(i=>{i.style.transform="rotate(0deg)"}),t.forEach(i=>{i.classList.remove("active");const u=i.querySelector("i");u&&u.classList.remove("active")}),a.forEach(i=>{i.classList.remove("active")})}function P(e,n){e.querySelectorAll(".ubits-tabbar-item").forEach(a=>{a.getAttribute("data-tab-id")===n?a.classList.add("ubits-tabbar-item--active"):a.classList.remove("ubits-tabbar-item--active")})}function D(e,n){let t=e.closest("[data-theme]");t||(t=document.body);const i=(t.getAttribute("data-theme")||"light")==="dark"?"light":"dark";t.setAttribute("data-theme",i),n&&n(i==="dark")}const F=[{id:"aprendizaje",title:"Aprendizaje",icon:"graduation-cap",subitems:[{id:"inicio",title:"Inicio",icon:"home",url:"home-learn.html"},{id:"catalogo",title:"Catálogo",icon:"book",url:"catalogo.html"},{id:"corporativa",title:"U. Corporativa",icon:"building-columns",url:"u-corporativa.html"},{id:"zona-estudio",title:"Zona de estudio",icon:"books",url:"zona-estudio.html"}]},{id:"diagnostico",title:"Diagnóstico",icon:"chart-mixed",url:"diagnostico.html",isLink:!0,clickable:!0},{id:"desempeno",title:"Desempeño",icon:"bars-progress",subitems:[{id:"evaluaciones-360",title:"Evaluaciones 360",icon:"chart-pie",url:"evaluaciones-360.html"},{id:"objetivos",title:"Objetivos",icon:"bullseye",url:"objetivos.html"},{id:"metricas",title:"Métricas",icon:"chart-line",url:"metricas.html"},{id:"reportes",title:"Reportes",icon:"file-chart-line",url:"reportes.html"}]},{id:"encuestas",title:"Encuestas",icon:"clipboard-list-check",url:"encuestas.html",isLink:!0,clickable:!1},{id:"reclutamiento",title:"Reclutamiento",icon:"users",url:"reclutamiento.html",isLink:!0,clickable:!0},{id:"tareas",title:"Tareas",icon:"layer-group",subitems:[{id:"planes",title:"Planes",icon:"calendar",url:"planes.html"},{id:"tareas",title:"Tareas",icon:"tasks",url:"tareas.html"}]},{id:"ubits-ai",title:"UBITS AI",icon:"sparkles",url:"ubits-ai.html",isLink:!0,clickable:!0}],H=[{id:"inicio",title:"Inicio",icon:"house",url:null,isLink:!1},{id:"empresa",title:"Empresa",icon:"building",subitems:[{id:"gestion-usuarios",title:"Gestión de usuarios",icon:"users"},{id:"organigrama",title:"Organigrama",icon:"sitemap"},{id:"datos-empresa",title:"Datos de empresa",icon:"building"},{id:"personalizacion",title:"Personalización",icon:"paint-brush"},{id:"roles-permisos",title:"Roles y permisos",icon:"user-shield"},{id:"comunicaciones",title:"Comunicaciones",icon:"envelope"}]},{id:"aprendizaje",title:"Aprendizaje",icon:"graduation-cap",subitems:[{id:"lms-cursos",title:"LMS - Cursos propios",icon:"book"},{id:"plan-formacion",title:"Plan de formación",icon:"clipboard-list-check"},{id:"certificados",title:"Certificados",icon:"file-certificate"},{id:"metricas-empresa",title:"Métricas de empresa",icon:"chart-line"}]},{id:"diagnóstico",title:"Diagnóstico",icon:"chart-mixed",url:null,isLink:!1},{id:"desempeño",title:"Desempeño",icon:"bars-progress",subitems:[{id:"evaluations",title:"Evaluaciones 360",icon:"chart-pie"},{id:"objectives",title:"Objetivos",icon:"bullseye"},{id:"matriz-talento",title:"Matriz de Talento",icon:"sitemap"}]},{id:"encuestas",title:"Encuestas",icon:"clipboard-list-check",url:null,isLink:!1}],O=[{id:"ver-perfil",label:"Ver mi perfil",icon:"user",url:"profile.html"},{id:"admin-mode",label:"Modo Administrador",icon:"laptop",url:"template-admin.html"},{id:"cambio-contraseña",label:"Cambio de contraseña",icon:"key",onClick:()=>{}},{id:"cerrar-sesion",label:"Cerrar sesión",icon:"sign-out-alt",onClick:()=>{}}],z=[{id:"ver-perfil",label:"Ver mi perfil",icon:"user",url:"profile.html"},{id:"modo-colaborador",label:"Modo colaborador",icon:"user-gear",url:"template-colaborador.html"},{id:"cambio-contraseña",label:"Cambio de contraseña",icon:"key",onClick:()=>{}},{id:"cerrar-sesion",label:"Cerrar sesión",icon:"sign-out-alt",onClick:()=>{}}],U={title:"Components/TabBar",tags:["autodocs"],parameters:{layout:"padded",a11y:{config:{rules:[{id:"focus-order-semantics",enabled:!1},{id:"focusable-content",enabled:!1}]},manual:!0},interactions:{disable:!0},actions:{disable:!0},docs:{description:{component:'Componente TabBar UBITS de navegación inferior para móviles. Reemplaza al sidebar en pantallas pequeñas (< 1024px) con items personalizables con iconos o avatares, dark mode toggle, y callbacks personalizables por item. Incluye Floating Menu con accordions (se muestra al hacer click en "Módulos") y Profile Menu dropdown (se muestra al hacer click en "Mi perfil"). Soporta 2 variantes: colaborador y admin.'}}},argTypes:{variant:{control:{type:"select"},options:["colaborador","admin"],description:"Variante del TabBar: colaborador o admin",table:{type:{summary:"colaborador | admin"},defaultValue:{summary:"colaborador"}}},activeTabId:{control:{type:"select"},options:["modulos","perfil","modo-oscuro"],description:"ID del tab activo",table:{type:{summary:"string"},defaultValue:{summary:"modulos"}}},darkModeEnabled:{control:{type:"boolean"},description:"Habilitar dark mode toggle",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},visible:{control:{type:"boolean"},description:"Mostrar el TabBar (por defecto false, solo visible en móvil)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}};function j(e){return{floatingMenuSections:e==="admin"?H:F,profileMenuItems:e==="admin"?z:O}}const N=[{id:"modulos",label:"Módulos",icon:"th-large",onClick:(e,n)=>{console.log("Módulos clicked:",e)}},{id:"perfil",label:"Mi perfil",avatar:"/images/Profile-image.jpg",avatarAlt:"Mi perfil",onClick:(e,n)=>{console.log("Perfil clicked:",e)}},{id:"modo-oscuro",label:"Modo oscuro",icon:"moon",onClick:(e,n)=>{console.log("Dark mode clicked:",e)}}],T={args:{containerId:"tabbar-story-container",variant:"colaborador",items:N,activeTabId:"modulos",darkModeEnabled:!0,visible:!0,onTabChange:(e,n,t)=>{console.log("Tab changed:",e,n)},onDarkModeToggle:e=>{console.log("Dark mode toggled:",e)},onFloatingMenuItemClick:(e,n,t)=>{console.log("Floating menu item clicked:",{sectionId:e,subitemId:n,url:t})},onProfileMenuItemClick:(e,n)=>{console.log("Profile menu item clicked:",{itemId:e,item:n})}},render:e=>{const n=window.console.error;window.console.error=(...l)=>{const o=l.join(" ");o.includes("Could not determine window of node")||o.includes("HTMLBodyElement")||o.includes("Minified React error")||o.includes("deferred DOM Node")||n.apply(window.console,l)},setTimeout(()=>{window.console.error=n},5e3);const t=document.getElementById(e.containerId||"tabbar-story-container");t&&t.parentElement&&(t.innerHTML="");const a=e.variant||"colaborador",i=j(a),u=i.floatingMenuSections,p=i.profileMenuItems,c=document.createElement("div");c.style.cssText=`
      width: 100%;
      max-width: 375px;
      margin: 0 auto;
      padding: 16px;
      background: var(--ubits-bg-2);
      border-radius: 8px;
      border: 1px solid var(--ubits-border-1);
      position: relative;
      display: flex;
      flex-direction: column;
      isolation: isolate;
    `;const s=document.createElement("div");s.style.cssText=`
      margin-bottom: 16px;
      padding: 12px;
      background: var(--ubits-bg-2);
      border-radius: 6px;
      font-family: var(--font-sans);
      font-size: 12px;
      order: 1;
    `;const d=e.items?.find(l=>l.id===e.activeTabId)||e.items?.[0];s.innerHTML=`
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 11px; color: var(--ubits-fg-1-medium);">
        <div><strong>Variante:</strong> ${a==="colaborador"?"Colaborador":"Admin"}</div>
        <div><strong>Items:</strong> ${e.items?.length||0}</div>
        <div><strong>Tab Activo:</strong> ${d?.label||e.activeTabId||"Ninguno"}</div>
        <div><strong>Dark Mode:</strong> ${e.darkModeEnabled?"Sí":"No"}</div>
        <div><strong>Menús:</strong> ${u&&u.length>0||p&&p.length>0?"Sí":"No"}</div>
      </div>
    `,c.appendChild(s);const m=document.createElement("div");m.id=e.containerId||"tabbar-story-container",m.classList.add("ubits-tabbar-preview-container"),m.style.cssText=`
      position: relative !important;
      width: 100%;
      min-height: 576px;
      margin-top: auto;
      order: 2;
      overflow: visible;
      box-sizing: border-box;
      isolation: isolate;
      background: var(--ubits-bg-2);
      border-radius: 8px;
    `,c.appendChild(m);const b=l=>{const o=l.target;if(o===document.body||!c.contains(o)&&o.tagName==="BODY")return l.stopImmediatePropagation(),l.preventDefault(),!1};return document.addEventListener("focusin",b,{capture:!0}),document.addEventListener("focus",b,{capture:!0}),document.body.addEventListener("focusin",b,{capture:!0}),document.body.addEventListener("focus",b,{capture:!0}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(()=>{try{const l=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"focus")?.value;l&&Object.defineProperty(document.body,"focus",{value:function(){},writable:!0,configurable:!0}),I({...e,container:m,visible:e.visible!==!1,darkModeEnabled:e.darkModeEnabled!==!1,floatingMenuSections:i.floatingMenuSections,profileMenuItems:i.profileMenuItems,onTabChange:(r,y,M)=>{try{const g=s.querySelector('div[style*="grid"]');if(g){const h=g.querySelector("div:nth-child(3)");h&&(h.innerHTML=`<strong>Tab Activo:</strong> ${y.label}`)}}catch{}e.onTabChange&&e.onTabChange(r,y,M)},onDarkModeToggle:e.onDarkModeToggle,onFloatingMenuItemClick:e.onFloatingMenuItemClick,onProfileMenuItemClick:e.onProfileMenuItemClick})||(console.error("Error: createTabBar retornó null"),m.innerHTML='<p style="color: var(--ubits-feedback-border-error); padding: 16px; font-size: 12px;">Error: No se pudo crear el TabBar</p>'),setTimeout(()=>{if(l)try{Object.defineProperty(document.body,"focus",{value:l,writable:!0,configurable:!0})}catch{}},2e3)}catch(l){console.error("Error creando TabBar:",l),m.innerHTML=`<p style="color: var(--ubits-feedback-border-error); padding: 16px; font-size: 12px;">Error: ${l}</p>`}},500)})}),setTimeout(()=>{document.removeEventListener("focusin",b,{capture:!0}),document.removeEventListener("focus",b,{capture:!0}),document.body.removeEventListener("focusin",b,{capture:!0}),document.body.removeEventListener("focus",b,{capture:!0})},3e3),c}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    containerId: 'tabbar-story-container',
    variant: 'colaborador' as 'colaborador' | 'admin',
    items: defaultItems,
    activeTabId: 'modulos',
    darkModeEnabled: true,
    visible: true,
    // No incluir floatingMenuSections y profileMenuItems en args iniciales
    // para que se calculen dinámicamente según el variant
    onTabChange: (tabId, item, element) => {
      console.log('Tab changed:', tabId, item);
    },
    onDarkModeToggle: isDark => {
      console.log('Dark mode toggled:', isDark);
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      console.log('Floating menu item clicked:', {
        sectionId,
        subitemId,
        url
      });
    },
    onProfileMenuItemClick: (itemId, item) => {
      console.log('Profile menu item clicked:', {
        itemId,
        item
      });
    }
  } as TabBarOptions & {
    variant?: 'colaborador' | 'admin';
    activeTabId?: string;
    darkModeEnabled?: boolean;
    visible?: boolean;
  },
  render: args => {
    // Suprimir errores de Storybook relacionados con focus
    const originalError = window.console.error;
    window.console.error = (...args: any[]) => {
      const errorMessage = args.join(' ');
      // Ignorar errores específicos de Storybook relacionados con focus
      if (errorMessage.includes('Could not determine window of node') || errorMessage.includes('HTMLBodyElement') || errorMessage.includes('Minified React error') || errorMessage.includes('deferred DOM Node')) {
        return; // No mostrar estos errores
      }
      // Mostrar otros errores normalmente
      originalError.apply(window.console, args);
    };

    // Restaurar console.error después de un tiempo
    setTimeout(() => {
      window.console.error = originalError;
    }, 5000);

    // Limpiar contenedor previo si existe - pero solo el contenido, no el elemento
    const existingContainer = document.getElementById(args.containerId || 'tabbar-story-container');
    if (existingContainer && existingContainer.parentElement) {
      // Solo limpiar contenido interno, no remover el elemento
      existingContainer.innerHTML = '';
    }

    // Obtener configuraciones según la variante - SIEMPRE usar las configuraciones del variant, ignorar args si variant está presente
    const variant = args.variant || 'colaborador';
    const config = getTabBarConfig(variant);
    // SIEMPRE usar las configuraciones del variant actual, ignorar cualquier valor en args
    const floatingMenuSections = config.floatingMenuSections;
    const profileMenuItems = config.profileMenuItems;

    // Wrapper principal - tamaño móvil adecuado para preview
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 375px;
      margin: 0 auto;
      padding: 16px;
      background: var(--ubits-bg-2);
      border-radius: 8px;
      border: 1px solid var(--ubits-border-1);
      position: relative;
      display: flex;
      flex-direction: column;
      isolation: isolate;
    \`;

    // Panel de información - pequeño y arriba
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = \`
      margin-bottom: 16px;
      padding: 12px;
      background: var(--ubits-bg-2);
      border-radius: 6px;
      font-family: var(--font-sans);
      font-size: 12px;
      order: 1;
    \`;
    const activeItem = args.items?.find(item => item.id === args.activeTabId) || args.items?.[0];
    infoPanel.innerHTML = \`
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 11px; color: var(--ubits-fg-1-medium);">
        <div><strong>Variante:</strong> \${variant === 'colaborador' ? 'Colaborador' : 'Admin'}</div>
        <div><strong>Items:</strong> \${args.items?.length || 0}</div>
        <div><strong>Tab Activo:</strong> \${activeItem?.label || args.activeTabId || 'Ninguno'}</div>
        <div><strong>Dark Mode:</strong> \${args.darkModeEnabled ? 'Sí' : 'No'}</div>
        <div><strong>Menús:</strong> \${floatingMenuSections && floatingMenuSections.length > 0 || profileMenuItems && profileMenuItems.length > 0 ? 'Sí' : 'No'}</div>
      </div>
    \`;
    wrapper.appendChild(infoPanel);

    // Contenedor del TabBar y menús - DENTRO del wrapper con el mismo ancho
    // Este contenedor contendrá TODO: TabBar, Floating Menu y Profile Menu
    // Debe tener la clase ubits-tabbar-preview-container para que el provider detecte modo preview
    // IMPORTANTE: position: relative es necesario para que los elementos absolute dentro sean relativos a este contenedor
    const container = document.createElement('div');
    container.id = args.containerId || 'tabbar-story-container';
    container.classList.add('ubits-tabbar-preview-container');
    container.style.cssText = \`
      position: relative !important;
      width: 100%;
      min-height: 576px;
      margin-top: auto;
      order: 2;
      overflow: visible;
      box-sizing: border-box;
      isolation: isolate;
      background: var(--ubits-bg-2);
      border-radius: 8px;
    \`;
    wrapper.appendChild(container);

    // Interceptar eventos de focus SOLO en el body para evitar conflictos con Storybook
    // No interceptamos eventos en el contenedor del TabBar para que funcione correctamente
    const preventBodyFocus = (e: Event) => {
      // Solo prevenir focus si el target es el body o un elemento fuera del wrapper
      const target = e.target as HTMLElement;
      if (target === document.body || !wrapper.contains(target) && target.tagName === 'BODY') {
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
      }
    };

    // Agregar listeners en fase de captura ANTES de que Storybook los procese
    document.addEventListener('focusin', preventBodyFocus, {
      capture: true
    });
    document.addEventListener('focus', preventBodyFocus, {
      capture: true
    });
    document.body.addEventListener('focusin', preventBodyFocus, {
      capture: true
    });
    document.body.addEventListener('focus', preventBodyFocus, {
      capture: true
    });

    // Crear el TabBar usando requestAnimationFrame y setTimeout anidados
    // para asegurar que Storybook termine de procesar antes de crear el componente
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            // Deshabilitar temporalmente el método focus del body
            const originalBodyFocus = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus')?.value;

            // Override temporal del método focus SOLO para el body
            if (originalBodyFocus) {
              Object.defineProperty(document.body, 'focus', {
                value: function () {
                  // No hacer nada cuando Storybook intenta hacer focus en el body
                  return;
                },
                writable: true,
                configurable: true
              });
            }
            const tabBarElement = createTabBar({
              ...args,
              container: container,
              visible: args.visible !== false,
              darkModeEnabled: args.darkModeEnabled !== false,
              // SIEMPRE usar las configuraciones del variant actual, ignorar cualquier valor en args
              floatingMenuSections: config.floatingMenuSections,
              profileMenuItems: config.profileMenuItems,
              onTabChange: (tabId, item, element) => {
                // Actualizar panel de información sin usar querySelector que pueda causar problemas
                try {
                  const infoContent = infoPanel.querySelector('div[style*="grid"]');
                  if (infoContent) {
                    const activeTabDiv = infoContent.querySelector('div:nth-child(3)');
                    if (activeTabDiv) {
                      activeTabDiv.innerHTML = \`<strong>Tab Activo:</strong> \${item.label}\`;
                    }
                  }
                } catch (e) {
                  // Ignorar errores de querySelector en Storybook
                }
                if (args.onTabChange) {
                  args.onTabChange(tabId, item, element);
                }
              },
              onDarkModeToggle: args.onDarkModeToggle,
              onFloatingMenuItemClick: args.onFloatingMenuItemClick,
              onProfileMenuItemClick: args.onProfileMenuItemClick
            });
            if (!tabBarElement) {
              console.error('Error: createTabBar retornó null');
              container.innerHTML = \`<p style="color: var(--ubits-feedback-border-error); padding: 16px; font-size: 12px;">Error: No se pudo crear el TabBar</p>\`;
            }

            // Restaurar focus después de un tiempo
            setTimeout(() => {
              if (originalBodyFocus) {
                try {
                  Object.defineProperty(document.body, 'focus', {
                    value: originalBodyFocus,
                    writable: true,
                    configurable: true
                  });
                } catch (e) {
                  // Ignorar errores al restaurar
                }
              }
            }, 2000);
          } catch (error) {
            console.error('Error creando TabBar:', error);
            container.innerHTML = \`<p style="color: var(--ubits-feedback-border-error); padding: 16px; font-size: 12px;">Error: \${error}</p>\`;
          }
        }, 500);
      });
    });

    // Remover listeners después de que el componente se haya creado
    setTimeout(() => {
      document.removeEventListener('focusin', preventBodyFocus, {
        capture: true
      });
      document.removeEventListener('focus', preventBodyFocus, {
        capture: true
      });
      document.body.removeEventListener('focusin', preventBodyFocus, {
        capture: true
      });
      document.body.removeEventListener('focus', preventBodyFocus, {
        capture: true
      });
    }, 3000);
    return wrapper;
  }
}`,...T.parameters?.docs?.source},description:{story:"Story por defecto con todos los controles",...T.parameters?.docs?.description}}};const W=["Default"];export{T as Default,W as __namedExportsOrder,U as default};
