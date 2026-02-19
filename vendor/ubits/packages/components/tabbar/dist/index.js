var UBITSTabBar=(function(x){"use strict";function k(e,s="regular"){const t=s==="regular"?"far":"fas",o=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${t} ${o}"></i>`}function S(e){const{items:s,activeTabId:t,visible:o=!1,className:c=""}=e,p=["ubits-tabbar",o?"ubits-tabbar--visible":"",c].filter(Boolean).join(" "),r=s.map(n=>{const i=["ubits-tabbar-item",n.id===t?"ubits-tabbar-item--active":""].filter(Boolean).join(" ");let b="";return n.avatar?b=`<img src="${n.avatar}" alt="${n.avatarAlt||n.label}" class="ubits-tabbar-avatar">`:n.icon&&(b=`<span class="ubits-tabbar-icon">${k(n.icon)}</span>`),`
      <div 
        class="${i}" 
        data-tab-id="${n.id}"
        data-has-click-handler="${n.onClick?"true":"false"}"
      >
        ${b}
        <span class="ubits-tabbar-text">${n.label}</span>
      </div>
    `}).join(`
`);return`
    <div class="${p}" id="ubits-tabbar">
      <div class="ubits-tabbar-content">
        ${r}
      </div>
    </div>
  `}function _(e){const{containerId:s,container:t,items:o,activeTabId:c,onTabChange:p,visible:r=!1,darkModeEnabled:n=!1,onDarkModeToggle:d}=e;let i=null;if(t?i=t:s&&(i=document.getElementById(s)),!i)return console.error("TabBar: Contenedor no encontrado"),null;const b=i.classList.contains("ubits-tabbar-preview-container"),g=S({...e,visible:r||b,className:b?"ubits-tabbar--preview":""});i.innerHTML=g,b&&window.getComputedStyle(i).position==="static"&&(i.style.position="relative");const u=i.querySelector(".ubits-tabbar");if(!u)return console.error("TabBar: Elemento no encontrado después de renderizar"),null;const h=e.treeMenuSize||"md";return A(u,o,p,n,d,e.floatingMenuSections,e.profileMenuItems,e.onFloatingMenuItemClick,e.onProfileMenuItemClick,i,h),u}function M(e,s=0,t="md",o="floating-menu"){const c=e.children&&e.children.length>0||e.subitems?.length>0,p=e.isLink||!c&&e.url,r=`${o}-node-${s}-${e.id}`,n=t==="xs"?"8px 12px":t==="sm"?"10px 14px":t==="lg"?"16px 20px":"12px 16px",d=t==="xs"?"28px":t==="sm"?"32px":t==="lg"?"48px":"40px",i=t==="xs"?"var(--font-body-xs-size, 11px)":t==="sm"?"var(--font-body-sm-size, 13px)":t==="lg"?"var(--font-body-lg-size, 20px)":"var(--font-body-md-size, 16px)",b=t==="xs"?"var(--font-body-xs-line, 16.5px)":t==="sm"?"var(--font-body-sm-line, 19.5px)":t==="lg"?"var(--font-body-lg-line, 30px)":"var(--font-body-md-line, 24px)",g=t==="xs"?"12px":t==="sm"?"14px":t==="lg"?"18px":"16px",u=t==="xs"?"10px":t==="sm"?"12px":t==="lg"?"16px":"14px",h=t==="xs"?"ubits-body-xs-regular":t==="sm"?"ubits-body-sm-regular":t==="lg"?"ubits-body-lg-regular":"ubits-body-md-regular";if(p){const m=s===0&&e.icon?`
      <span class="ubits-tree-node__icon" style="font-size: ${g};">
        ${k(e.icon)}
      </span>
    `:"";return`
      <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${s}">
        <a 
          href="${e.url||"#"}" 
          class="ubits-tree-node__content" 
          data-section-id="${e.id}"
          data-size="${t}"
          style="min-height: ${d} !important; padding: ${n} !important; font-size: ${i} !important; line-height: ${b} !important; margin: 0 !important; border: none !important; text-decoration: none; display: flex; align-items: center; gap: var(--ubits-spacing-sm, 8px);"
          role="treeitem"
          aria-label="${e.title}"
        >
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
          ${m}
          <span class="ubits-tree-node__label ${h}" style="line-height: ${b};">${e.title}</span>
        </a>
      </div>
    `}const l=(e.children||e.subitems?.map(m=>({id:m.id,title:m.title,icon:m.icon,url:m.url,children:void 0}))||[]).map(m=>M(m,s+1,t,o)).join(""),v=s===0&&e.icon?`
    <span class="ubits-tree-node__icon" style="font-size: ${g};">
      ${k(e.icon)}
    </span>
  `:"";return`
    <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${s}">
      <div 
        class="ubits-tree-node__content ubits-tree-node__content--expandable" 
        data-node-id="${r}"
        data-size="${t}"
        data-expanded="false"
        style="min-height: ${d} !important; padding: ${n} !important; font-size: ${i} !important; line-height: ${b} !important; margin: 0 !important; border: none !important; cursor: pointer; display: flex; align-items: center; gap: var(--ubits-spacing-sm, 8px);"
        role="button"
        tabindex="0"
        aria-expanded="false"
        aria-label="${e.title}"
      >
        <span class="ubits-tree-node__chevron" style="width: ${u}; height: ${u};">
          <i class="far fa-chevron-right" style="font-size: ${u};"></i>
        </span>
        ${v}
        <span class="ubits-tree-node__label ${h}" style="line-height: ${b};">${e.title}</span>
      </div>
      <div class="ubits-tree-node__children ubits-tree-node__children--vertical" data-children-id="${r}" style="display: none;">
        ${l}
      </div>
    </div>
  `}function B(e,s="md"){const t=`floating-menu-${Date.now()}`,o=e.map(c=>M(c,0,s,t)).join("");return`
    <div class="ubits-floating-menu" id="ubits-floating-menu">
      <div class="ubits-floating-menu-header">
        <h2 class="ubits-floating-menu-title">Módulos</h2>
        <button class="ubits-floating-menu-close" id="ubits-floating-menu-close">
          ${k("times")}
        </button>
      </div>
      <div class="ubits-floating-menu-content">
        <div class="ubits-tree-menu ubits-tree-menu--vertical" role="tree">
          ${o}
        </div>
      </div>
    </div>
  `}function C(e,s=0,t="md"){const o=e.children&&e.children.length>0,c=s*24,p=`ubits-profile-tree-${o?"header":"link"}--${t}`,r=s===0?`<i class="far fa-${e.icon} ubits-profile-tree-icon"></i>`:"";if(!o)return`
      <div class="ubits-profile-tree-item" data-profile-item-id="${e.id}" data-tree-level="${s}" style="padding-left: ${c}px;">
        <a href="${e.url||"#"}" class="ubits-profile-tree-link ${p}" ${e.onClick?'data-has-onclick="true"':""}>
          ${r}
          <span class="ubits-profile-tree-text">${e.label}</span>
        </a>
      </div>
    `;const n=e.children.map(d=>C(d,s+1,t)).join("");return`
    <div class="ubits-profile-tree-item" data-profile-item-id="${e.id}" data-tree-level="${s}" style="padding-left: ${c}px;">
      <div class="ubits-profile-tree-node" data-tree-node-id="${e.id}">
        <div class="ubits-profile-tree-header ${p}">
          ${r}
          <span class="ubits-profile-tree-text">${e.label}</span>
          <i class="far fa-chevron-down ubits-profile-tree-chevron" data-chevron-id="${e.id}"></i>
        </div>
        <div class="ubits-profile-tree-children" data-tree-children-id="${e.id}" style="display: none;">
          ${n}
        </div>
      </div>
    </div>
  `}function E(e,s="md"){return`
    <div class="ubits-profile-menu" id="ubits-profile-menu">
      ${e.map(o=>C(o,0,s)).join("")}
    </div>
  `}function A(e,s,t,o=!1,c,p,r,n,d,i,b="md"){const g=e.querySelectorAll(".ubits-tabbar-item"),u=i||e.parentElement,h=u?.classList.contains("ubits-tabbar-preview-container");let a=null,l=null;if(p&&p.length>0){a=document.getElementById("ubits-floating-menu-container")||document.createElement("div"),a.id="ubits-floating-menu-container",h?a.style.cssText="position: absolute; top: 0; left: 0; right: 0; bottom: 68px; width: 100%; height: 500px; z-index: 2000; overflow: visible; display: none;":a.style.cssText="",document.getElementById("ubits-floating-menu-container")||(u?u.appendChild(a):document.body.appendChild(a));const v=B(p,b);a.innerHTML=v,I(a,n)}if(r&&r.length>0){l=document.getElementById("ubits-profile-menu-container")||document.createElement("div"),l.id="ubits-profile-menu-container",h?l.style.cssText="position: absolute; bottom: 68px; left: 0; right: 0; width: 100%; max-width: 100%; z-index: 2001; overflow: visible; display: none;":l.style.cssText="",document.getElementById("ubits-profile-menu-container")||(u?u.appendChild(l):document.body.appendChild(l));const v=E(r,b);if(l.innerHTML=v,h){const m=l.querySelector(".ubits-profile-menu");m&&(m.classList.add("ubits-profile-menu--preview"),m.style.cssText="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;")}q(l,r,d)}g.forEach(v=>{const m=v,$=m.getAttribute("data-tab-id");if(!$)return;const w=s.find(L=>L.id===$);w&&m.addEventListener("click",L=>{if(L.preventDefault(),L.stopPropagation(),$==="modo-oscuro"&&o){if(j(e,c),a){a.style.display="none";const f=a.querySelector(".ubits-floating-menu");f&&f.classList.remove("ubits-floating-menu--show")}if(l){l.style.display="none";const f=l.querySelector(".ubits-profile-menu");f&&f.classList.remove("ubits-profile-menu--show")}return}if($==="modulos"&&a){const f=a.querySelector(".ubits-floating-menu");if(f)if(f.classList.contains("ubits-floating-menu--show"))f.classList.remove("ubits-floating-menu--show");else{if(f.classList.add("ubits-floating-menu--show"),h&&a){f.classList.add("ubits-floating-menu--preview");const y=e.getBoundingClientRect(),U=i?i.getBoundingClientRect():{top:0},N=60,O=8;y.top-U.top,a.style.display="block",a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.right="0",a.style.bottom=`${N+O}px`,a.style.width="100%",a.style.height="",a.style.zIndex="2000",a.style.overflow="visible",a.style.boxSizing="border-box",f.style.cssText="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; max-width: 100%; display: block; box-sizing: border-box;"}if(l){const y=l.querySelector(".ubits-profile-menu");y&&y.classList.remove("ubits-profile-menu--show"),l.style.display="none"}}return}if($==="perfil"&&l){const f=l.querySelector(".ubits-profile-menu");if(f)if(f.classList.contains("ubits-profile-menu--show"))f.classList.remove("ubits-profile-menu--show"),l.style.display="none";else{if(f.classList.add("ubits-profile-menu--show"),h&&l){e.getBoundingClientRect(),l.style.display="block",l.style.position="absolute",l.style.bottom="68px",l.style.left="0",l.style.right="0",l.style.width="100%",l.style.maxWidth="100%",l.style.zIndex="2001",l.style.overflow="visible";const y=l.querySelector(".ubits-profile-menu");y&&(y.style.cssText="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;",y.classList.add("ubits-profile-menu--preview"))}if(a){const y=a.querySelector(".ubits-floating-menu");y&&y.classList.remove("ubits-floating-menu--show")}}return}w.onClick&&w.onClick(w,L),P(e,$),t&&t($,w,m)})})}function I(e,s){const t=e.querySelector(".ubits-floating-menu");if(!t)return;const o=t.querySelector("#ubits-floating-menu-close");o&&o.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),e&&(e.style.display="none"),t&&t.classList.remove("ubits-floating-menu--show")});const c=t.querySelector(".ubits-tree-menu");c&&(c.addEventListener("click",n=>{const i=n.target.closest(".ubits-tree-node__content");if(!i)return;if(i.classList.contains("ubits-tree-node__content--expandable")){const g=i.getAttribute("data-node-id"),u=c.querySelector(`[data-children-id="${g}"]`),h=i.querySelector(".ubits-tree-node__chevron i"),a=i.getAttribute("data-expanded")==="true";u&&(a?(u.style.display="none",i.setAttribute("data-expanded","false"),i.setAttribute("aria-expanded","false"),h&&(h.className="far fa-chevron-right")):(u.style.display="block",i.setAttribute("data-expanded","true"),i.setAttribute("aria-expanded","true"),h&&(h.className="far fa-chevron-down")))}if(c.querySelectorAll(".ubits-tree-node__content").forEach(g=>{g.classList.remove("ubits-tree-node__content--active"),g.removeAttribute("aria-selected")}),i.classList.add("ubits-tree-node__content--active"),i.setAttribute("aria-selected","true"),!i.classList.contains("ubits-tree-node__content--expandable")){const g=i.getAttribute("data-section-id"),u=i.getAttribute("href");s&&g&&s(g,void 0,u||void 0)}}),c.addEventListener("keydown",n=>{const i=n.target.closest(".ubits-tree-node__content");i&&(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),i.click())}));const p=n=>{n.key==="Escape"&&t.classList.contains("ubits-floating-menu--show")&&(e.style.display="none",t.classList.remove("ubits-floating-menu--show"))};document.addEventListener("keydown",p);const r=n=>{if(t.classList.contains("ubits-floating-menu--show")){const d=n.target;!t.contains(d)&&!d.closest('[data-tab-id="modulos"]')&&(e.style.display="none",t.classList.remove("ubits-floating-menu--show"))}};document.addEventListener("click",r)}function q(e,s,t){const o=e.querySelector(".ubits-profile-menu");if(!o)return;o.querySelectorAll(".ubits-profile-tree-node").forEach(r=>{const n=r.querySelector(".ubits-profile-tree-header");n&&n.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();const i=r.getAttribute("data-tree-node-id");i&&H(o,i)})}),o.querySelectorAll(".ubits-profile-tree-link").forEach(r=>{r.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const d=r.closest("[data-profile-item-id]")?.getAttribute("data-profile-item-id");if(o.querySelectorAll(".ubits-profile-tree-link").forEach(i=>{i.classList.remove("ubits-profile-tree-link--active")}),r.classList.add("ubits-profile-tree-link--active"),d){const i=s.find(b=>b.id===d);i&&(i.onClick?i.onClick():i.url&&(window.location.href=i.url),t&&t(d,i),T())}})}),document.addEventListener("keydown",r=>{r.key==="Escape"&&o.classList.contains("ubits-profile-menu--show")&&T()}),document.addEventListener("click",r=>{if(o.classList.contains("ubits-profile-menu--show")){const n=r.target;!o.contains(n)&&!n.closest('[data-tab-id="perfil"]')&&T()}})}function H(e,s){const t=e.querySelector(`[data-tree-children-id="${s}"]`),o=e.querySelector(`[data-chevron-id="${s}"]`),c=e.querySelector(`[data-tree-node-id="${s}"] .ubits-profile-tree-header`);if(!t||!o){console.warn(`Profile tree menu node not found: ${s}`,{children:!!t,chevron:!!o});return}window.getComputedStyle(t).display!=="none"?(t.style.display="none",o.style.transform="rotate(0deg)",c&&c.classList.remove("ubits-profile-tree-header--active")):(t.style.display="block",o.style.transform="rotate(180deg)",c&&c.classList.add("ubits-profile-tree-header--active"))}function T(){const e=document.getElementById("ubits-profile-menu");e&&e.classList.remove("ubits-profile-menu--show")}function P(e,s){e.querySelectorAll(".ubits-tabbar-item").forEach(o=>{o.getAttribute("data-tab-id")===s?o.classList.add("ubits-tabbar-item--active"):o.classList.remove("ubits-tabbar-item--active")})}function j(e,s){let t=e.closest("[data-theme]");t||(t=document.body);const c=(t.getAttribute("data-theme")||"light")==="dark"?"light":"dark";t.setAttribute("data-theme",c),s&&s(c==="dark")}const D=[{id:"aprendizaje",title:"Aprendizaje",icon:"graduation-cap",subitems:[{id:"inicio",title:"Inicio",icon:"home",url:"home-learn.html"},{id:"catalogo",title:"Catálogo",icon:"book",url:"catalogo.html"},{id:"corporativa",title:"U. Corporativa",icon:"building-columns",url:"u-corporativa.html"},{id:"zona-estudio",title:"Zona de estudio",icon:"books",url:"zona-estudio.html"}]},{id:"diagnostico",title:"Diagnóstico",icon:"chart-mixed",url:"diagnostico.html",isLink:!0,clickable:!0},{id:"desempeno",title:"Desempeño",icon:"bars-progress",subitems:[{id:"evaluaciones-360",title:"Evaluaciones 360",icon:"chart-pie",url:"evaluaciones-360.html"},{id:"objetivos",title:"Objetivos",icon:"bullseye",url:"objetivos.html"},{id:"metricas",title:"Métricas",icon:"chart-line",url:"metricas.html"},{id:"reportes",title:"Reportes",icon:"file-chart-line",url:"reportes.html"}]},{id:"encuestas",title:"Encuestas",icon:"clipboard-list-check",url:"encuestas.html",isLink:!0,clickable:!1},{id:"reclutamiento",title:"Reclutamiento",icon:"users",url:"reclutamiento.html",isLink:!0,clickable:!0},{id:"tareas",title:"Tareas",icon:"layer-group",subitems:[{id:"planes",title:"Planes",icon:"calendar",url:"planes.html"},{id:"tareas",title:"Tareas",icon:"tasks",url:"tareas.html"}]},{id:"ubits-ai",title:"UBITS AI",icon:"sparkles",url:"ubits-ai.html",isLink:!0,clickable:!0}],R=[{id:"ver-perfil",label:"Ver mi perfil",icon:"user",url:"profile.html"},{id:"cambio-contraseña",label:"Cambio de contraseña",icon:"key",onClick:()=>{}},{id:"cerrar-sesion",label:"Cerrar sesión",icon:"sign-out-alt",onClick:()=>{}}];return typeof window<"u"&&(window.UBITS=window.UBITS||{},window.UBITS.TabBar={renderTabBar,createTabBar},window.createTabBar=createTabBar,window.renderTabBar=renderTabBar,console.log("✅ UBITS TabBar component ready")),x.createTabBar=_,x.defaultFloatingMenuSections=D,x.defaultProfileMenuItems=R,x.renderTabBar=S,Object.defineProperty(x,Symbol.toStringTag,{value:"Module"}),x})({});
