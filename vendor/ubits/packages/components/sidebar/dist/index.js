var UBITSSidebar=(function(p){"use strict";function w(n,s="regular"){const a=s==="regular"?"far":"fas",t=n.startsWith("fa-")?n:`fa-${n}`;return`<i class="${a} ${t}"></i>`}function E(n){const s=window.innerHeight,a=16,o=s-a-16,l=Math.max(578,o);n.style.height=`${l}px`,n.style.top=`${a}px`}function k(n){const{variant:s="colaborador",bodyButtons:a,footerButtons:t=[],logoHref:o,logoImage:d="images/Ubits-logo.svg",profileMenuItems:l=[],avatarImage:i="images/Profile-image.jpg",darkModeEnabled:r=!0,className:g="",attributes:m={}}=n,u=o||(s==="admin"?"admin.html":"index.html"),f=["ubits-sidebar",g].filter(Boolean).join(" "),b=Object.entries(m).map(([e,v])=>`${e}="${v}"`).join(" "),c=a.map(e=>{const v=["ubits-sidebar-nav-button",e.state==="active"?"active":"",e.state==="disabled"?"disabled":""].filter(Boolean).join(" "),y=e.onClick?'data-has-click-handler="true"':"",B=e.href?`data-href="${e.href}"`:"";return`
      <button 
        class="${v}" 
        data-section="${e.section}" 
        data-tooltip="${e.tooltip}"
        ${y}
        ${B}
        ${e.state==="disabled"?"disabled":""}
      >
        ${w(e.icon)}
      </button>
    `}).join(`
`),h=t.map(e=>{const v=["ubits-sidebar-nav-button",e.id?`id="ubits-${e.id}"`:"",e.state==="active"?"active":"",e.state==="disabled"?"disabled":""].filter(Boolean).join(" "),y=e.onClick?'data-has-click-handler="true"':"",B=e.href?`data-href="${e.href}"`:"";return`
      <button 
        class="${v}" 
        ${e.id?`id="ubits-${e.id}"`:""}
        data-section="${e.section}" 
        data-tooltip="${e.tooltip}"
        ${e.id==="darkmode-toggle"?'data-theme="light"':""}
        ${y}
        ${B}
        ${e.state==="disabled"?"disabled":""}
      >
        ${w(e.icon)}
      </button>
    `}).join(`
`),S=r?`
    <button 
      class="ubits-sidebar-nav-button" 
      id="ubits-darkmode-toggle" 
      data-tooltip="Modo oscuro" 
      data-theme="light"
      data-has-click-handler="true"
    >
      ${w("fa-moon","regular")}
    </button>
  `:"",M=l.length>0?`
    <div class="ubits-sidebar-profile-menu" id="ubits-sidebar-profile-menu">
      ${l.map(e=>{if(e.divider)return'<div class="ubits-sidebar-profile-menu-divider"></div>';const v=e.onClick?'data-has-click-handler="true"':"",y=e.href?`data-href="${e.href}"`:"";return`
          <div class="ubits-sidebar-profile-menu-item" ${v} ${y}>
            ${w(e.icon)}
            <span>${e.label}</span>
          </div>
        `}).join("")}
    </div>
  `:"";return`
    <aside class="${f}" id="ubits-sidebar" ${b}>
      <div class="ubits-sidebar-main">
        <div class="ubits-sidebar-header">
          <div class="ubits-sidebar-logo" data-href="${u}">
            <img src="${d}" alt="UBITS Logo" />
          </div>
        </div>
        <div class="ubits-sidebar-body">
          ${c}
        </div>
      </div>
      <div class="ubits-sidebar-footer">
        ${h}
        ${S}
        <div class="ubits-sidebar-user-avatar-container">
          <div class="ubits-sidebar-user-avatar" data-has-click-handler="${n.onAvatarClick?"true":""}">
            <img src="${i}" alt="Usuario" class="ubits-sidebar-avatar-image" />
          </div>
        </div>
      </div>
    </aside>
    ${M}
    <div class="ubits-sidebar-tooltip" id="ubits-sidebar-tooltip"></div>
  `.trim()}function L(n){const s=document.getElementById("ubits-sidebar-tooltip");if(!s)return;const a=n.parentElement;if(!a)return;n.querySelectorAll("[data-tooltip]").forEach(o=>{const d=o.getAttribute("data-tooltip");d&&(o.addEventListener("mouseenter",()=>{const l=o.getBoundingClientRect(),i=a.getBoundingClientRect(),r=s;r.textContent=d,r.style.visibility="hidden",r.style.display="block",r.classList.add("show"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const m=r.getBoundingClientRect().height,$=l.right-i.left+12,u=l.top-i.top+l.height/2-m/2;r.style.left=`${$}px`,r.style.top=`${u}px`,r.style.visibility="visible"})})}),o.addEventListener("mouseleave",()=>{s.classList.remove("show"),s.style.visibility="hidden"}))})}function C(n,s){const a=n.querySelector(".ubits-sidebar-user-avatar"),t=document.getElementById("ubits-sidebar-profile-menu");if(!a||!t)return;const o=s.containerId,d=o?document.getElementById(o):n.parentElement,l=()=>{if(!d||d===document.body)return;const u=n.getBoundingClientRect(),f=d.getBoundingClientRect(),b=u.left-f.left+96,c=27;t.style.position="absolute",t.style.left=`${b}px`,t.style.bottom=`${c}px`};d&&d!==document.body?(window.getComputedStyle(d).position==="static"&&(d.style.position="relative"),l(),window.addEventListener("resize",l)):(t.style.position="fixed",t.style.left="96px",t.style.bottom="27px");let i=null,r=null;const g=()=>{r&&(clearTimeout(r),r=null),i&&clearTimeout(i),d&&d!==document.body&&l(),i=window.setTimeout(()=>{t.classList.add("show"),t.style.display="block"},100)},m=()=>{i&&(clearTimeout(i),i=null),r=window.setTimeout(()=>{t.classList.remove("show"),t.style.display="none"},200)};if(a.addEventListener("mouseenter",g),a.addEventListener("mouseleave",m),t.addEventListener("mouseenter",g),t.addEventListener("mouseleave",m),s.onAvatarClick)a.addEventListener("click",u=>{u.preventDefault(),s.onAvatarClick?.()});else{const u=a.getAttribute("data-href");u&&a.addEventListener("click",()=>{window.location.href=u})}t.querySelectorAll(".ubits-sidebar-profile-menu-item").forEach((u,f)=>{const b=s.profileMenuItems?.[f];!b||b.divider||u.addEventListener("click",c=>{c.preventDefault(),b.onClick?b.onClick():b.href&&(window.location.href=b.href),m()})})}function I(n,s){const a=n.querySelector("#ubits-darkmode-toggle");if(!a)return;const t=s.containerId;let o=null;t&&(o=document.getElementById(t)),o||(o=n.parentElement);const d=l=>{const i=a.querySelector("i");i&&(i.classList.remove("fa-moon","fa-sun","fa-sun-bright","far","fas","fa-solid","fa-regular"),i.classList.add("ubits-icon-transition"),requestAnimationFrame(()=>{l==="dark"?i.classList.add("fa-solid","fa-sun-bright"):i.classList.add("far","fa-moon")}),setTimeout(()=>{i.classList.remove("ubits-icon-transition")},400))};a.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const r=(a.getAttribute("data-theme")||"light")==="light"?"dark":"light";a.setAttribute("data-theme",r),d(r),o&&o.setAttribute("data-theme",r),s.onDarkModeToggle&&s.onDarkModeToggle(r==="dark")})}function T(n){const{containerId:s,bodyButtons:a,height:t}=n,o=document.getElementById(s);if(!o)throw new Error(`Container with id "${s}" not found`);window.getComputedStyle(o).position==="static"&&(o.style.position="relative");const l=k(n);o.innerHTML=l;const i=o.querySelector(".ubits-sidebar"),r=document.getElementById("ubits-sidebar-profile-menu");r&&!o.contains(r)&&o.appendChild(r);const g=document.getElementById("ubits-sidebar-tooltip");if(g&&!o.contains(g)&&o.appendChild(g),!i)throw new Error("Failed to create sidebar element");t?i.style.height=typeof t=="number"?`${t}px`:t:(E(i),window.addEventListener("resize",()=>E(i))),L(i),C(i,n),n.darkModeEnabled!==!1&&I(i,n);const m=i.querySelectorAll(".ubits-sidebar-body .ubits-sidebar-nav-button");m.forEach((f,b)=>{const c=a[b];c&&f.addEventListener("click",h=>{h.preventDefault(),c.state!=="disabled"&&(m.forEach(S=>S.classList.remove("active")),f.classList.add("active"),n.onActiveButtonChange&&n.onActiveButtonChange(c.section),c.onClick?c.onClick(h):c.href&&(window.location.href=c.href))})}),i.querySelectorAll(".ubits-sidebar-footer .ubits-sidebar-nav-button").forEach((f,b)=>{const c=n.footerButtons?.[b];c&&f.id!=="ubits-darkmode-toggle"&&f.addEventListener("click",h=>{h.preventDefault(),c.state!=="disabled"&&(c.onClick?c.onClick(h):c.href&&(window.location.href=c.href))})});const u=i.querySelector(".ubits-sidebar-logo");if(u){const f=u.getAttribute("data-href");f&&u.addEventListener("click",()=>{window.location.href=f})}return i}function A(n,s){const a=document.getElementById(n);if(!a)return;const t=a.querySelector(".ubits-sidebar");if(!t)return;t.querySelectorAll(".ubits-sidebar-nav-button").forEach(l=>l.classList.remove("active"));const d=t.querySelector(`[data-section="${s}"]`);d&&d.classList.add("active")}return typeof window<"u"&&(window.UBITS=window.UBITS||{},window.UBITS.Sidebar={renderSidebar,createSidebar,updateActiveSidebarButton},window.createSidebar=createSidebar,window.renderSidebar=renderSidebar,window.updateActiveSidebarButton=updateActiveSidebarButton,console.log("✅ [DEBUG] UBITS Sidebar component ready (IIFE executed)"),console.log("✅ [DEBUG] window.UBITS.Sidebar exists:",!!window.UBITS.Sidebar),console.log("✅ [DEBUG] window.createSidebar exists:",!!window.createSidebar)),p.createSidebar=T,p.renderSidebar=k,p.updateActiveSidebarButton=A,Object.defineProperty(p,Symbol.toStringTag,{value:"Module"}),p})({});
