var UBITSSidebar=(function(p){"use strict";function $(e,s="regular"){const a=s==="regular"?"far":"fas",i=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${a} ${i}"></i>`}function C(e){const s=window.innerHeight,a=16,o=s-a-16,l=Math.max(578,o);e.style.height=`${l}px`,e.style.top=`${a}px`}function E(e){const{variant:s="colaborador",bodyButtons:a,footerButtons:i=[],logoHref:o,logoImage:d="images/Ubits-logo.svg",profileMenuItems:l=[],avatarImage:n="images/Profile-image.jpg",darkModeEnabled:r=!0,className:h="",attributes:m={}}=e,u=o||(s==="admin"?"admin.html":"index.html"),f=["ubits-sidebar",h].filter(Boolean).join(" "),b=Object.entries(m).map(([t,v])=>`${t}="${v}"`).join(" "),c=a.map(t=>{const v=["ubits-sidebar-nav-button",t.state==="active"?"active":"",t.state==="disabled"?"disabled":""].filter(Boolean).join(" "),y=t.onClick?'data-has-click-handler="true"':"",L=t.href?`data-href="${t.href}"`:"";return`
      <button 
        class="${v}" 
        data-section="${t.section}" 
        data-tooltip="${t.tooltip}"
        ${y}
        ${L}
        ${t.state==="disabled"?"disabled":""}
      >
        ${$(t.icon)}
      </button>
    `}).join(`
`),g=i.map(t=>{const v=["ubits-sidebar-nav-button",t.id?`id="ubits-${t.id}"`:"",t.state==="active"?"active":"",t.state==="disabled"?"disabled":""].filter(Boolean).join(" "),y=t.onClick?'data-has-click-handler="true"':"",L=t.href?`data-href="${t.href}"`:"";return`
      <button 
        class="${v}" 
        ${t.id?`id="ubits-${t.id}"`:""}
        data-section="${t.section}" 
        data-tooltip="${t.tooltip}"
        ${t.id==="darkmode-toggle"?'data-theme="light"':""}
        ${y}
        ${L}
        ${t.state==="disabled"?"disabled":""}
      >
        ${$(t.icon)}
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
      ${$("fa-moon","regular")}
    </button>
  `:"",M=l.length>0?`
    <div class="ubits-sidebar-profile-menu" id="ubits-sidebar-profile-menu">
      ${l.map(t=>{if(t.divider)return'<div class="ubits-sidebar-profile-menu-divider"></div>';const v=t.onClick?'data-has-click-handler="true"':"",y=t.href?`data-href="${t.href}"`:"";return`
          <div class="ubits-sidebar-profile-menu-item" ${v} ${y}>
            ${$(t.icon)}
            <span>${t.label}</span>
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
        ${g}
        ${S}
        <div class="ubits-sidebar-user-avatar-container">
          <div class="ubits-sidebar-user-avatar" data-has-click-handler="${e.onAvatarClick?"true":""}">
            <img src="${n}" alt="Usuario" class="ubits-sidebar-avatar-image" />
          </div>
        </div>
      </div>
    </aside>
    ${M}
    <div class="ubits-sidebar-tooltip" id="ubits-sidebar-tooltip"></div>
  `.trim()}function T(e){const s=document.getElementById("ubits-sidebar-tooltip");if(!s)return;const a=e.parentElement;if(!a)return;e.querySelectorAll("[data-tooltip]").forEach(o=>{const d=o.getAttribute("data-tooltip");d&&(o.addEventListener("mouseenter",()=>{const l=o.getBoundingClientRect(),n=a.getBoundingClientRect(),r=s;r.textContent=d,r.style.visibility="hidden",r.style.display="block",r.classList.add("show"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const m=r.getBoundingClientRect().height,k=l.right-n.left+12,u=l.top-n.top+l.height/2-m/2;r.style.left=`${k}px`,r.style.top=`${u}px`,r.style.visibility="visible"})})}),o.addEventListener("mouseleave",()=>{s.classList.remove("show"),s.style.visibility="hidden"}))})}function A(e,s){const a=e.querySelector(".ubits-sidebar-user-avatar"),i=document.getElementById("ubits-sidebar-profile-menu");if(!a||!i)return;const o=s.containerId,d=o?document.getElementById(o):e.parentElement,l=()=>{if(!d||d===document.body)return;const u=e.getBoundingClientRect(),f=d.getBoundingClientRect(),b=u.left-f.left+96,c=27;i.style.position="absolute",i.style.left=`${b}px`,i.style.bottom=`${c}px`};d&&d!==document.body?(window.getComputedStyle(d).position==="static"&&(d.style.position="relative"),l(),window.addEventListener("resize",l)):(i.style.position="fixed",i.style.left="96px",i.style.bottom="27px");let n=null,r=null;const h=()=>{r&&(clearTimeout(r),r=null),n&&clearTimeout(n),d&&d!==document.body&&l(),n=window.setTimeout(()=>{i.classList.add("show"),i.style.display="block"},100)},m=()=>{n&&(clearTimeout(n),n=null),r=window.setTimeout(()=>{i.classList.remove("show"),i.style.display="none"},200)};if(a.addEventListener("mouseenter",h),a.addEventListener("mouseleave",m),i.addEventListener("mouseenter",h),i.addEventListener("mouseleave",m),s.onAvatarClick)a.addEventListener("click",u=>{u.preventDefault(),s.onAvatarClick?.()});else{const u=a.getAttribute("data-href");u&&a.addEventListener("click",()=>{window.location.href=u})}i.querySelectorAll(".ubits-sidebar-profile-menu-item").forEach((u,f)=>{const b=s.profileMenuItems?.[f];!b||b.divider||u.addEventListener("click",c=>{c.preventDefault(),b.onClick?b.onClick():b.href&&(window.location.href=b.href),m()})})}function I(e,s){const a=e.querySelector("#ubits-darkmode-toggle");if(!a)return;const i=s.containerId;let o=null;i&&(o=document.getElementById(i)),o||(o=e.parentElement);const d=l=>{const n=a.querySelector("i");n&&(n.classList.remove("fa-moon","fa-sun","fa-sun-bright","far","fas","fa-solid","fa-regular"),n.classList.add("ubits-icon-transition"),requestAnimationFrame(()=>{l==="dark"?n.classList.add("fa-solid","fa-sun-bright"):n.classList.add("far","fa-moon")}),setTimeout(()=>{n.classList.remove("ubits-icon-transition")},400))};a.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const r=(a.getAttribute("data-theme")||"light")==="light"?"dark":"light";a.setAttribute("data-theme",r),d(r),o&&o.setAttribute("data-theme",r),s.onDarkModeToggle&&s.onDarkModeToggle(r==="dark")})}function w(e){const{containerId:s,bodyButtons:a,height:i}=e,o=document.getElementById(s);if(!o)throw new Error(`Container with id "${s}" not found`);window.getComputedStyle(o).position==="static"&&(o.style.position="relative");const l=E(e);o.innerHTML=l;const n=o.querySelector(".ubits-sidebar"),r=document.getElementById("ubits-sidebar-profile-menu");r&&!o.contains(r)&&o.appendChild(r);const h=document.getElementById("ubits-sidebar-tooltip");if(h&&!o.contains(h)&&o.appendChild(h),!n)throw new Error("Failed to create sidebar element");i?n.style.height=typeof i=="number"?`${i}px`:i:(C(n),window.addEventListener("resize",()=>C(n))),T(n),A(n,e),e.darkModeEnabled!==!1&&I(n,e);const m=n.querySelectorAll(".ubits-sidebar-body .ubits-sidebar-nav-button");m.forEach((f,b)=>{const c=a[b];c&&f.addEventListener("click",g=>{g.preventDefault(),c.state!=="disabled"&&(m.forEach(S=>S.classList.remove("active")),f.classList.add("active"),e.onActiveButtonChange&&e.onActiveButtonChange(c.section),c.onClick?c.onClick(g):c.href&&(window.location.href=c.href))})}),n.querySelectorAll(".ubits-sidebar-footer .ubits-sidebar-nav-button").forEach((f,b)=>{const c=e.footerButtons?.[b];c&&f.id!=="ubits-darkmode-toggle"&&f.addEventListener("click",g=>{g.preventDefault(),c.state!=="disabled"&&(c.onClick?c.onClick(g):c.href&&(window.location.href=c.href))})});const u=n.querySelector(".ubits-sidebar-logo");if(u){const f=u.getAttribute("data-href");f&&u.addEventListener("click",()=>{window.location.href=f})}return n}function B(e,s){const a=document.getElementById(e);if(!a)return;const i=a.querySelector(".ubits-sidebar");if(!i)return;i.querySelectorAll(".ubits-sidebar-nav-button").forEach(l=>l.classList.remove("active"));const d=i.querySelector(`[data-section="${s}"]`);d&&d.classList.add("active")}if(typeof window<"u"){let e=window;e.UBITS=e.UBITS||{},e.UBITS.Sidebar={...e.UBITS.Sidebar||{},renderSidebar:E,createSidebar:w,updateActiveSidebarButton:B},e.createSidebar=w,e.renderSidebar=E,e.updateActiveSidebarButton=B,console.log("✅ [DEBUG] UBITS Sidebar component ready")}return p.createSidebar=w,p.renderSidebar=E,p.updateActiveSidebarButton=B,Object.defineProperty(p,Symbol.toStringTag,{value:"Module"}),p})({});
