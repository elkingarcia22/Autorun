import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";function w(e,o="regular"){const t=o==="regular"?"far":"fas",r=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${t} ${r}"></i>`}function B(e){const{items:o,activeTabId:t,visible:r=!1,className:c=""}=e,g=["ubits-tabbar",r?"ubits-tabbar--visible":"",c].filter(Boolean).join(" "),d=o.map(i=>{const n=["ubits-tabbar-item",i.id===t?"ubits-tabbar-item--active":""].filter(Boolean).join(" ");let m="";return i.avatar?m=`<img src="${i.avatar}" alt="${i.avatarAlt||i.label}" class="ubits-tabbar-avatar">`:i.icon&&(m=`<span class="ubits-tabbar-icon">${w(i.icon)}</span>`),`
      <div 
        class="${n}" 
        data-tab-id="${i.id}"
        data-has-click-handler="${i.onClick?"true":"false"}"
      >
        ${m}
        <span class="ubits-tabbar-text">${i.label}</span>
      </div>
    `}).join(`
`);return`
    <div class="${g}" id="ubits-tabbar">
      <div class="ubits-tabbar-content">
        ${d}
      </div>
    </div>
  `}function q(e){const{containerId:o,container:t,items:r,activeTabId:c,onTabChange:g,visible:d=!1,darkModeEnabled:i=!1,onDarkModeToggle:u}=e;let n=null;if(t?n=t:o&&(n=document.getElementById(o)),!n)return console.error("TabBar: Contenedor no encontrado"),null;const m=n.classList.contains("ubits-tabbar-preview-container"),b=B({...e,visible:d||m,className:m?"ubits-tabbar--preview":""});n.innerHTML=b,m&&window.getComputedStyle(n).position==="static"&&(n.style.position="relative");const a=n.querySelector(".ubits-tabbar");if(!a)return console.error("TabBar: Elemento no encontrado después de renderizar"),null;const p=e.treeMenuSize||"md";return D(a,r,g,i,u,e.floatingMenuSections,e.profileMenuItems,e.onFloatingMenuItemClick,e.onProfileMenuItemClick,n,p),a}function E(e,o=0,t="md",r="floating-menu"){const c=e.children&&e.children.length>0||e.subitems?.length>0,g=e.isLink||!c&&e.url,d=`${r}-node-${o}-${e.id}`,i=t==="xs"?"8px 12px":t==="sm"?"10px 14px":t==="lg"?"16px 20px":"12px 16px",u=t==="xs"?"28px":t==="sm"?"32px":t==="lg"?"48px":"40px",n=t==="xs"?"var(--font-body-xs-size, 11px)":t==="sm"?"var(--font-body-sm-size, 13px)":t==="lg"?"var(--font-body-lg-size, 20px)":"var(--font-body-md-size, 16px)",m=t==="xs"?"var(--font-body-xs-line, 16.5px)":t==="sm"?"var(--font-body-sm-line, 19.5px)":t==="lg"?"var(--font-body-lg-line, 30px)":"var(--font-body-md-line, 24px)",b=t==="xs"?"12px":t==="sm"?"14px":t==="lg"?"18px":"16px",a=t==="xs"?"10px":t==="sm"?"12px":t==="lg"?"16px":"14px",p=t==="xs"?"ubits-body-xs-regular":t==="sm"?"ubits-body-sm-regular":t==="lg"?"ubits-body-lg-regular":"ubits-body-md-regular";if(g){const f=o===0&&e.icon?`
      <span class="ubits-tree-node__icon" style="font-size: ${b};">
        ${w(e.icon)}
      </span>
    `:"";return`
      <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${o}">
        <a 
          href="${e.url||"#"}" 
          class="ubits-tree-node__content" 
          data-section-id="${e.id}"
          data-size="${t}"
          style="min-height: ${u} !important; padding: ${i} !important; font-size: ${n} !important; line-height: ${m} !important; margin: 0 !important; border: none !important; text-decoration: none; display: flex; align-items: center; gap: var(--ubits-spacing-sm, 8px);"
          role="treeitem"
          aria-label="${e.title}"
        >
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
          ${f}
          <span class="ubits-tree-node__label ${p}" style="line-height: ${m};">${e.title}</span>
        </a>
      </div>
    `}const l=(e.children||e.subitems?.map(f=>({id:f.id,title:f.title,icon:f.icon,url:f.url,children:void 0}))||[]).map(f=>E(f,o+1,t,r)).join(""),M=o===0&&e.icon?`
    <span class="ubits-tree-node__icon" style="font-size: ${b};">
      ${w(e.icon)}
    </span>
  `:"";return`
    <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${o}">
      <div 
        class="ubits-tree-node__content ubits-tree-node__content--expandable" 
        data-node-id="${d}"
        data-size="${t}"
        data-expanded="false"
        style="min-height: ${u} !important; padding: ${i} !important; font-size: ${n} !important; line-height: ${m} !important; margin: 0 !important; border: none !important; cursor: pointer; display: flex; align-items: center; gap: var(--ubits-spacing-sm, 8px);"
        role="button"
        tabindex="0"
        aria-expanded="false"
        aria-label="${e.title}"
      >
        <span class="ubits-tree-node__chevron" style="width: ${a}; height: ${a};">
          <i class="far fa-chevron-right" style="font-size: ${a};"></i>
        </span>
        ${M}
        <span class="ubits-tree-node__label ${p}" style="line-height: ${m};">${e.title}</span>
      </div>
      <div class="ubits-tree-node__children ubits-tree-node__children--vertical" data-children-id="${d}" style="display: none;">
        ${l}
      </div>
    </div>
  `}function A(e,o="md"){const t=`floating-menu-${Date.now()}`,r=e.map(c=>E(c,0,o,t)).join("");return`
    <div class="ubits-floating-menu" id="ubits-floating-menu">
      <div class="ubits-floating-menu-header">
        <h2 class="ubits-floating-menu-title">Módulos</h2>
        <button class="ubits-floating-menu-close" id="ubits-floating-menu-close">
          ${w("times")}
        </button>
      </div>
      <div class="ubits-floating-menu-content">
        <div class="ubits-tree-menu ubits-tree-menu--vertical" role="tree">
          ${r}
        </div>
      </div>
    </div>
  `}function $(e,o=0,t="md"){const r=e.children&&e.children.length>0,c=o*24,g=`ubits-profile-tree-${r?"header":"link"}--${t}`,d=o===0?`<i class="far fa-${e.icon} ubits-profile-tree-icon"></i>`:"";if(!r)return`
      <div class="ubits-profile-tree-item" data-profile-item-id="${e.id}" data-tree-level="${o}" style="padding-left: ${c}px;">
        <a href="${e.url||"#"}" class="ubits-profile-tree-link ${g}" ${e.onClick?'data-has-onclick="true"':""}>
          ${d}
          <span class="ubits-profile-tree-text">${e.label}</span>
        </a>
      </div>
    `;const i=e.children.map(u=>$(u,o+1,t)).join("");return`
    <div class="ubits-profile-tree-item" data-profile-item-id="${e.id}" data-tree-level="${o}" style="padding-left: ${c}px;">
      <div class="ubits-profile-tree-node" data-tree-node-id="${e.id}">
        <div class="ubits-profile-tree-header ${g}">
          ${d}
          <span class="ubits-profile-tree-text">${e.label}</span>
          <i class="far fa-chevron-down ubits-profile-tree-chevron" data-chevron-id="${e.id}"></i>
        </div>
        <div class="ubits-profile-tree-children" data-tree-children-id="${e.id}" style="display: none;">
          ${i}
        </div>
      </div>
    </div>
  `}function P(e,o="md"){return`
    <div class="ubits-profile-menu" id="ubits-profile-menu">
      ${e.map(r=>$(r,0,o)).join("")}
    </div>
  `}function D(e,o,t,r=!1,c,g,d,i,u,n,m="md"){const b=e.querySelectorAll(".ubits-tabbar-item"),a=n||e.parentElement,p=a?.classList.contains("ubits-tabbar-preview-container");let s=null,l=null;if(g&&g.length>0){s=document.getElementById("ubits-floating-menu-container")||document.createElement("div"),s.id="ubits-floating-menu-container",p?s.style.cssText="position: absolute; top: 0; left: 0; right: 0; bottom: 68px; width: 100%; height: 500px; z-index: 2000; overflow: visible; display: none;":s.style.cssText="",document.getElementById("ubits-floating-menu-container")||(a?a.appendChild(s):document.body.appendChild(s));const M=A(g,m);s.innerHTML=M,_(s,i)}if(d&&d.length>0){l=document.getElementById("ubits-profile-menu-container")||document.createElement("div"),l.id="ubits-profile-menu-container",p?l.style.cssText="position: absolute; bottom: 68px; left: 0; right: 0; width: 100%; max-width: 100%; z-index: 2001; overflow: visible; display: none;":l.style.cssText="",document.getElementById("ubits-profile-menu-container")||(a?a.appendChild(l):document.body.appendChild(l));const M=P(d,m);if(l.innerHTML=M,p){const f=l.querySelector(".ubits-profile-menu");f&&(f.classList.add("ubits-profile-menu--preview"),f.style.cssText="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;")}H(l,d,u)}b.forEach(M=>{const f=M,h=f.getAttribute("data-tab-id");if(!h)return;const x=o.find(k=>k.id===h);x&&f.addEventListener("click",k=>{if(k.preventDefault(),k.stopPropagation(),h==="modo-oscuro"&&r){if(N(e,c),s){s.style.display="none";const v=s.querySelector(".ubits-floating-menu");v&&v.classList.remove("ubits-floating-menu--show")}if(l){l.style.display="none";const v=l.querySelector(".ubits-profile-menu");v&&v.classList.remove("ubits-profile-menu--show")}return}if(h==="modulos"&&s){const v=s.querySelector(".ubits-floating-menu");if(v)if(v.classList.contains("ubits-floating-menu--show"))v.classList.remove("ubits-floating-menu--show");else{if(v.classList.add("ubits-floating-menu--show"),p&&s){v.classList.add("ubits-floating-menu--preview");const y=e.getBoundingClientRect(),I=n?n.getBoundingClientRect():{top:0},C=60,S=8;y.top-I.top,s.style.display="block",s.style.position="absolute",s.style.top="0",s.style.left="0",s.style.right="0",s.style.bottom=`${C+S}px`,s.style.width="100%",s.style.height="",s.style.zIndex="2000",s.style.overflow="visible",s.style.boxSizing="border-box",v.style.cssText="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; max-width: 100%; display: block; box-sizing: border-box;"}if(l){const y=l.querySelector(".ubits-profile-menu");y&&y.classList.remove("ubits-profile-menu--show"),l.style.display="none"}}return}if(h==="perfil"&&l){const v=l.querySelector(".ubits-profile-menu");if(v)if(v.classList.contains("ubits-profile-menu--show"))v.classList.remove("ubits-profile-menu--show"),l.style.display="none";else{if(v.classList.add("ubits-profile-menu--show"),p&&l){e.getBoundingClientRect(),l.style.display="block",l.style.position="absolute",l.style.bottom="68px",l.style.left="0",l.style.right="0",l.style.width="100%",l.style.maxWidth="100%",l.style.zIndex="2001",l.style.overflow="visible";const y=l.querySelector(".ubits-profile-menu");y&&(y.style.cssText="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;",y.classList.add("ubits-profile-menu--preview"))}if(s){const y=s.querySelector(".ubits-floating-menu");y&&y.classList.remove("ubits-floating-menu--show")}}return}x.onClick&&x.onClick(x,k),O(e,h),t&&t(h,x,f)})})}function _(e,o){const t=e.querySelector(".ubits-floating-menu");if(!t)return;const r=t.querySelector("#ubits-floating-menu-close");r&&r.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),e&&(e.style.display="none"),t&&t.classList.remove("ubits-floating-menu--show")});const c=t.querySelector(".ubits-tree-menu");c&&(c.addEventListener("click",i=>{const n=i.target.closest(".ubits-tree-node__content");if(!n)return;if(n.classList.contains("ubits-tree-node__content--expandable")){const b=n.getAttribute("data-node-id"),a=c.querySelector(`[data-children-id="${b}"]`),p=n.querySelector(".ubits-tree-node__chevron i"),s=n.getAttribute("data-expanded")==="true";a&&(s?(a.style.display="none",n.setAttribute("data-expanded","false"),n.setAttribute("aria-expanded","false"),p&&(p.className="far fa-chevron-right")):(a.style.display="block",n.setAttribute("data-expanded","true"),n.setAttribute("aria-expanded","true"),p&&(p.className="far fa-chevron-down")))}if(c.querySelectorAll(".ubits-tree-node__content").forEach(b=>{b.classList.remove("ubits-tree-node__content--active"),b.removeAttribute("aria-selected")}),n.classList.add("ubits-tree-node__content--active"),n.setAttribute("aria-selected","true"),!n.classList.contains("ubits-tree-node__content--expandable")){const b=n.getAttribute("data-section-id"),a=n.getAttribute("href");o&&b&&o(b,void 0,a||void 0)}}),c.addEventListener("keydown",i=>{const n=i.target.closest(".ubits-tree-node__content");n&&(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),n.click())}));const g=i=>{i.key==="Escape"&&t.classList.contains("ubits-floating-menu--show")&&(e.style.display="none",t.classList.remove("ubits-floating-menu--show"))};document.addEventListener("keydown",g);const d=i=>{if(t.classList.contains("ubits-floating-menu--show")){const u=i.target;!t.contains(u)&&!u.closest('[data-tab-id="modulos"]')&&(e.style.display="none",t.classList.remove("ubits-floating-menu--show"))}};document.addEventListener("click",d)}function H(e,o,t){const r=e.querySelector(".ubits-profile-menu");if(!r)return;r.querySelectorAll(".ubits-profile-tree-node").forEach(d=>{const i=d.querySelector(".ubits-profile-tree-header");i&&i.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation();const n=d.getAttribute("data-tree-node-id");n&&F(r,n)})}),r.querySelectorAll(".ubits-profile-tree-link").forEach(d=>{d.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();const u=d.closest("[data-profile-item-id]")?.getAttribute("data-profile-item-id");if(r.querySelectorAll(".ubits-profile-tree-link").forEach(n=>{n.classList.remove("ubits-profile-tree-link--active")}),d.classList.add("ubits-profile-tree-link--active"),u){const n=o.find(m=>m.id===u);n&&(n.onClick?n.onClick():n.url&&(window.location.href=n.url),t&&t(u,n),L())}})}),document.addEventListener("keydown",d=>{d.key==="Escape"&&r.classList.contains("ubits-profile-menu--show")&&L()}),document.addEventListener("click",d=>{if(r.classList.contains("ubits-profile-menu--show")){const i=d.target;!r.contains(i)&&!i.closest('[data-tab-id="perfil"]')&&L()}})}function F(e,o){const t=e.querySelector(`[data-tree-children-id="${o}"]`),r=e.querySelector(`[data-chevron-id="${o}"]`),c=e.querySelector(`[data-tree-node-id="${o}"] .ubits-profile-tree-header`);if(!t||!r){console.warn(`Profile tree menu node not found: ${o}`,{children:!!t,chevron:!!r});return}window.getComputedStyle(t).display!=="none"?(t.style.display="none",r.style.transform="rotate(0deg)",c&&c.classList.remove("ubits-profile-tree-header--active")):(t.style.display="block",r.style.transform="rotate(180deg)",c&&c.classList.add("ubits-profile-tree-header--active"))}function L(){const e=document.getElementById("ubits-profile-menu");e&&e.classList.remove("ubits-profile-menu--show")}function O(e,o){e.querySelectorAll(".ubits-tabbar-item").forEach(r=>{r.getAttribute("data-tab-id")===o?r.classList.add("ubits-tabbar-item--active"):r.classList.remove("ubits-tabbar-item--active")})}function N(e,o){let t=e.closest("[data-theme]");t||(t=document.body);const c=(t.getAttribute("data-theme")||"light")==="dark"?"light":"dark";t.setAttribute("data-theme",c),o&&o(c==="dark")}const j=[{id:"aprendizaje",title:"Aprendizaje",icon:"graduation-cap",subitems:[{id:"inicio",title:"Inicio",icon:"home",url:"home-learn.html"},{id:"catalogo",title:"Catálogo",icon:"book",url:"catalogo.html"},{id:"corporativa",title:"U. Corporativa",icon:"building-columns",url:"u-corporativa.html"},{id:"zona-estudio",title:"Zona de estudio",icon:"books",url:"zona-estudio.html"}]},{id:"diagnostico",title:"Diagnóstico",icon:"chart-mixed",url:"diagnostico.html",isLink:!0,clickable:!0},{id:"desempeno",title:"Desempeño",icon:"bars-progress",subitems:[{id:"evaluaciones-360",title:"Evaluaciones 360",icon:"chart-pie",url:"evaluaciones-360.html"},{id:"objetivos",title:"Objetivos",icon:"bullseye",url:"objetivos.html"},{id:"metricas",title:"Métricas",icon:"chart-line",url:"metricas.html"},{id:"reportes",title:"Reportes",icon:"file-chart-line",url:"reportes.html"}]},{id:"encuestas",title:"Encuestas",icon:"clipboard-list-check",url:"encuestas.html",isLink:!0,clickable:!1},{id:"reclutamiento",title:"Reclutamiento",icon:"users",url:"reclutamiento.html",isLink:!0,clickable:!0},{id:"tareas",title:"Tareas",icon:"layer-group",subitems:[{id:"planes",title:"Planes",icon:"calendar",url:"planes.html"},{id:"tareas",title:"Tareas",icon:"tasks",url:"tareas.html"}]},{id:"ubits-ai",title:"UBITS AI",icon:"sparkles",url:"ubits-ai.html",isLink:!0,clickable:!0}],z=[{id:"inicio",title:"Inicio",icon:"house",url:null,isLink:!1},{id:"empresa",title:"Empresa",icon:"building",subitems:[{id:"gestion-usuarios",title:"Gestión de usuarios",icon:"users"},{id:"organigrama",title:"Organigrama",icon:"sitemap"},{id:"datos-empresa",title:"Datos de empresa",icon:"building"},{id:"personalizacion",title:"Personalización",icon:"paint-brush"},{id:"roles-permisos",title:"Roles y permisos",icon:"user-shield"},{id:"comunicaciones",title:"Comunicaciones",icon:"envelope"}]},{id:"aprendizaje",title:"Aprendizaje",icon:"graduation-cap",subitems:[{id:"lms-cursos",title:"LMS - Cursos propios",icon:"book"},{id:"plan-formacion",title:"Plan de formación",icon:"clipboard-list-check"},{id:"certificados",title:"Certificados",icon:"file-certificate"},{id:"metricas-empresa",title:"Métricas de empresa",icon:"chart-line"}]},{id:"diagnóstico",title:"Diagnóstico",icon:"chart-mixed",url:null,isLink:!1},{id:"desempeño",title:"Desempeño",icon:"bars-progress",subitems:[{id:"evaluations",title:"Evaluaciones 360",icon:"chart-pie"},{id:"objectives",title:"Objetivos",icon:"bullseye"},{id:"matriz-talento",title:"Matriz de Talento",icon:"sitemap"}]},{id:"encuestas",title:"Encuestas",icon:"clipboard-list-check",url:null,isLink:!1}],R=[{id:"ver-perfil",label:"Ver mi perfil",icon:"user",url:"profile.html"},{id:"admin-mode",label:"Modo Administrador",icon:"laptop",url:"template-admin.html"},{id:"cambio-contraseña",label:"Cambio de contraseña",icon:"key",onClick:()=>{}},{id:"cerrar-sesion",label:"Cerrar sesión",icon:"sign-out-alt",onClick:()=>{}}],V=[{id:"ver-perfil",label:"Ver mi perfil",icon:"user",url:"profile.html"},{id:"modo-colaborador",label:"Modo colaborador",icon:"user-gear",url:"template-colaborador.html"},{id:"cambio-contraseña",label:"Cambio de contraseña",icon:"key",onClick:()=>{}},{id:"cerrar-sesion",label:"Cerrar sesión",icon:"sign-out-alt",onClick:()=>{}}],Z={title:"Navegación/TabBar",tags:["autodocs"],parameters:{layout:"padded",a11y:{config:{rules:[{id:"focus-order-semantics",enabled:!1},{id:"focusable-content",enabled:!1}]},manual:!0},interactions:{disable:!0},actions:{disable:!0},docs:{description:{component:'Componente TabBar UBITS de navegación inferior para móviles. Reemplaza al sidebar en pantallas pequeñas (< 1024px) con items personalizables con iconos o avatares, dark mode toggle, y callbacks personalizables por item. Incluye Floating Menu con accordions (se muestra al hacer click en "Módulos") y Profile Menu dropdown (se muestra al hacer click en "Mi perfil"). Soporta 2 variantes: colaborador y admin.'}}},argTypes:{variant:{control:{type:"select"},options:["colaborador","admin"],description:"Variante del TabBar: colaborador o admin",table:{type:{summary:"colaborador | admin"},defaultValue:{summary:"colaborador"}}},activeTabId:{control:{type:"select"},options:["modulos","perfil","modo-oscuro"],description:"ID del tab activo",table:{type:{summary:"string"},defaultValue:{summary:"modulos"}}},darkModeEnabled:{control:{type:"boolean"},description:"Habilitar dark mode toggle",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},visible:{control:{type:"boolean"},description:"Mostrar el TabBar (por defecto false, solo visible en móvil)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}};function U(e){return{floatingMenuSections:e==="admin"?z:j,profileMenuItems:e==="admin"?V:R}}const W=[{id:"modulos",label:"Módulos",icon:"th-large",onClick:(e,o)=>{}},{id:"perfil",label:"Mi perfil",avatar:"/images/Profile-image.jpg",avatarAlt:"Mi perfil",onClick:(e,o)=>{}},{id:"modo-oscuro",label:"Modo oscuro",icon:"moon",onClick:(e,o)=>{}}],T={args:{containerId:"tabbar-story-container",variant:"colaborador",items:W,activeTabId:"modulos",darkModeEnabled:!0,visible:!0,onTabChange:(e,o,t)=>{},onDarkModeToggle:e=>{},onFloatingMenuItemClick:(e,o,t)=>{},onProfileMenuItemClick:(e,o)=>{}},render:e=>{const o=window.console.error;window.console.error=(...a)=>{const p=a.join(" ");p.includes("Could not determine window of node")||p.includes("HTMLBodyElement")||p.includes("Minified React error")||p.includes("deferred DOM Node")||o.apply(window.console,a)},setTimeout(()=>{window.console.error=o},5e3);const t=document.getElementById(e.containerId||"tabbar-story-container");t&&t.parentElement&&(t.innerHTML="");const r=e.variant||"colaborador",c=U(r),g=c.floatingMenuSections,d=c.profileMenuItems,i=document.createElement("div");i.style.cssText=`
      width: 100%;
      max-width: 375px;
      margin: 0 auto;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      position: relative;
      display: flex;
      flex-direction: column;
      isolation: isolate;
    `;const u=document.createElement("div");u.style.cssText=`
      margin-bottom: 16px;
      padding: 12px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 6px);
      font-family: var(--font-family-noto-sans-font-family);
      font-size: var(--modifiers-normal-body-xs-regular-fontsize);
      order: 1;
    `;const n=e.items?.find(a=>a.id===e.activeTabId)||e.items?.[0];u.innerHTML=`
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 11px; color: var(--modifiers-normal-color-light-fg-1-medium);">
        <div><strong>Variante:</strong> ${r==="colaborador"?"Colaborador":"Admin"}</div>
        <div><strong>Items:</strong> ${e.items?.length||0}</div>
        <div><strong>Tab Activo:</strong> ${n?.label||e.activeTabId||"Ninguno"}</div>
        <div><strong>Dark Mode:</strong> ${e.darkModeEnabled?"Sí":"No"}</div>
        <div><strong>Menús:</strong> ${g&&g.length>0||d&&d.length>0?"Sí":"No"}</div>
      </div>
    `,i.appendChild(u);const m=document.createElement("div");m.id=e.containerId||"tabbar-story-container",m.classList.add("ubits-tabbar-preview-container"),m.style.cssText=`
      position: relative !important;
      width: 100%;
      min-height: 576px;
      margin-top: auto;
      order: 2;
      overflow: visible;
      box-sizing: border-box;
      isolation: isolate;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
    `,i.appendChild(m);const b=a=>{const p=a.target;if(p===document.body||!i.contains(p)&&p.tagName==="BODY")return a.stopImmediatePropagation(),a.preventDefault(),!1};return document.addEventListener("focusin",b,{capture:!0}),document.addEventListener("focus",b,{capture:!0}),document.body.addEventListener("focusin",b,{capture:!0}),document.body.addEventListener("focus",b,{capture:!0}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(()=>{try{const a=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"focus")?.value;a&&Object.defineProperty(document.body,"focus",{value:function(){},writable:!0,configurable:!0}),q({...e,container:m,visible:e.visible!==!1,darkModeEnabled:e.darkModeEnabled!==!1,floatingMenuSections:c.floatingMenuSections,profileMenuItems:c.profileMenuItems,onTabChange:(s,l,M)=>{try{const f=u.querySelector('div[style*="grid"]');if(f){const h=f.querySelector("div:nth-child(3)");h&&(h.innerHTML=`<strong>Tab Activo:</strong> ${l.label}`)}}catch{}e.onTabChange&&e.onTabChange(s,l,M)},onDarkModeToggle:e.onDarkModeToggle,onFloatingMenuItemClick:e.onFloatingMenuItemClick,onProfileMenuItemClick:e.onProfileMenuItemClick})||(m.innerHTML='<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px; font-size: 12px;">Error: No se pudo crear el TabBar</p>'),setTimeout(()=>{if(a)try{Object.defineProperty(document.body,"focus",{value:a,writable:!0,configurable:!0})}catch{}},2e3)}catch(a){m.innerHTML=`<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px; font-size: 12px;">Error: ${a}</p>`}},500)})}),setTimeout(()=>{document.removeEventListener("focusin",b,{capture:!0}),document.removeEventListener("focus",b,{capture:!0}),document.body.removeEventListener("focusin",b,{capture:!0}),document.body.removeEventListener("focus",b,{capture:!0})},3e3),i}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
      // Tab changed
    },
    onDarkModeToggle: isDark => {
      // Dark mode toggled
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      // Floating menu item clicked
    },
    onProfileMenuItemClick: (itemId, item) => {
      // Profile menu item clicked
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
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
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
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 6px);
      font-family: var(--font-family-noto-sans-font-family);
      font-size: var(--modifiers-normal-body-xs-regular-fontsize);
      order: 1;
    \`;
    const activeItem = args.items?.find(item => item.id === args.activeTabId) || args.items?.[0];
    infoPanel.innerHTML = \`
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 11px; color: var(--modifiers-normal-color-light-fg-1-medium);">
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
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
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
              // Error: createTabBar retornó null
              container.innerHTML = \`<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px; font-size: 12px;">Error: No se pudo crear el TabBar</p>\`;
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
            // Error creando TabBar
            container.innerHTML = \`<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px; font-size: 12px;">Error: \${error}</p>\`;
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
}`,...T.parameters?.docs?.source},description:{story:"Story por defecto con todos los controles",...T.parameters?.docs?.description}}};const J=["Default"];export{T as Default,J as __namedExportsOrder,Z as default};
