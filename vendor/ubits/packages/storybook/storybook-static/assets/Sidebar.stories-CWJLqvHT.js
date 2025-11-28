import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";function w(e,t="regular"){const o=t==="regular"?"far":"fas",n=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${o} ${n}"></i>`}function E(e){const t=window.innerHeight,o=16,r=t-o-16,l=Math.max(578,r);e.style.height=`${l}px`,e.style.top=`${o}px`}function M(e){const{variant:t="colaborador",bodyButtons:o,footerButtons:n=[],logoHref:r,logoImage:d="images/Ubits-logo.svg",profileMenuItems:l=[],avatarImage:i="images/Profile-image.jpg",darkModeEnabled:s=!0,className:f="",attributes:p={}}=e,c=r||(t==="admin"?"admin.html":"index.html"),u=["ubits-sidebar",f].filter(Boolean).join(" "),g=Object.entries(p).map(([a,v])=>`${a}="${v}"`).join(" "),m=o.map(a=>{const v=["ubits-sidebar-nav-button",a.state==="active"?"active":"",a.state==="disabled"?"disabled":""].filter(Boolean).join(" "),y=a.onClick?'data-has-click-handler="true"':"",B=a.href?`data-href="${a.href}"`:"";return`
      <button 
        class="${v}" 
        data-section="${a.section}" 
        data-tooltip="${a.tooltip}"
        ${y}
        ${B}
        ${a.state==="disabled"?"disabled":""}
      >
        ${w(a.icon)}
      </button>
    `}).join(`
`),h=n.map(a=>{const v=["ubits-sidebar-nav-button",a.id?`id="ubits-${a.id}"`:"",a.state==="active"?"active":"",a.state==="disabled"?"disabled":""].filter(Boolean).join(" "),y=a.onClick?'data-has-click-handler="true"':"",B=a.href?`data-href="${a.href}"`:"";return`
      <button 
        class="${v}" 
        ${a.id?`id="ubits-${a.id}"`:""}
        data-section="${a.section}" 
        data-tooltip="${a.tooltip}"
        ${a.id==="darkmode-toggle"?'data-theme="light"':""}
        ${y}
        ${B}
        ${a.state==="disabled"?"disabled":""}
      >
        ${w(a.icon)}
      </button>
    `}).join(`
`),k=s?`
    <button 
      class="ubits-sidebar-nav-button" 
      id="ubits-darkmode-toggle" 
      data-tooltip="Modo oscuro" 
      data-theme="light"
      data-has-click-handler="true"
    >
      ${w("fa-moon","regular")}
    </button>
  `:"",T=l.length>0?`
    <div class="ubits-sidebar-profile-menu" id="ubits-sidebar-profile-menu">
      ${l.map(a=>{if(a.divider)return'<div class="ubits-sidebar-profile-menu-divider"></div>';const v=a.onClick?'data-has-click-handler="true"':"",y=a.href?`data-href="${a.href}"`:"";return`
          <div class="ubits-sidebar-profile-menu-item" ${v} ${y}>
            ${w(a.icon)}
            <span>${a.label}</span>
          </div>
        `}).join("")}
    </div>
  `:"";return`
    <aside class="${u}" id="ubits-sidebar" ${g}>
      <div class="ubits-sidebar-main">
        <div class="ubits-sidebar-header">
          <div class="ubits-sidebar-logo" data-href="${c}">
            <img src="${d}" alt="UBITS Logo" />
          </div>
        </div>
        <div class="ubits-sidebar-body">
          ${m}
        </div>
      </div>
      <div class="ubits-sidebar-footer">
        ${h}
        ${k}
        <div class="ubits-sidebar-user-avatar-container">
          <div class="ubits-sidebar-user-avatar" data-has-click-handler="${e.onAvatarClick?"true":""}">
            <img src="${i}" alt="Usuario" class="ubits-sidebar-avatar-image" />
          </div>
        </div>
      </div>
    </aside>
    ${T}
    <div class="ubits-sidebar-tooltip" id="ubits-sidebar-tooltip"></div>
  `.trim()}function I(e){const t=document.getElementById("ubits-sidebar-tooltip");if(!t)return;const o=e.parentElement;if(!o)return;e.querySelectorAll("[data-tooltip]").forEach(r=>{const d=r.getAttribute("data-tooltip");d&&(r.addEventListener("mouseenter",()=>{const l=r.getBoundingClientRect(),i=o.getBoundingClientRect(),s=t;s.textContent=d,s.style.visibility="hidden",s.style.display="block",s.classList.add("show"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const p=s.getBoundingClientRect().height,b=l.right-i.left+12,c=l.top-i.top+l.height/2-p/2;s.style.left=`${b}px`,s.style.top=`${c}px`,s.style.visibility="visible"})})}),r.addEventListener("mouseleave",()=>{t.classList.remove("show"),t.style.visibility="hidden"}))})}function $(e,t){const o=e.querySelector(".ubits-sidebar-user-avatar"),n=document.getElementById("ubits-sidebar-profile-menu");if(!o||!n)return;const r=t.containerId,d=r?document.getElementById(r):e.parentElement,l=()=>{if(!d||d===document.body)return;const c=e.getBoundingClientRect(),u=d.getBoundingClientRect(),g=c.left-u.left+96,m=27;n.style.position="absolute",n.style.left=`${g}px`,n.style.bottom=`${m}px`};d&&d!==document.body?(window.getComputedStyle(d).position==="static"&&(d.style.position="relative"),l(),window.addEventListener("resize",l)):(n.style.position="fixed",n.style.left="96px",n.style.bottom="27px");let i=null,s=null;const f=()=>{s&&(clearTimeout(s),s=null),i&&clearTimeout(i),d&&d!==document.body&&l(),i=window.setTimeout(()=>{n.classList.add("show"),n.style.display="block"},100)},p=()=>{i&&(clearTimeout(i),i=null),s=window.setTimeout(()=>{n.classList.remove("show"),n.style.display="none"},200)};if(o.addEventListener("mouseenter",f),o.addEventListener("mouseleave",p),n.addEventListener("mouseenter",f),n.addEventListener("mouseleave",p),t.onAvatarClick)o.addEventListener("click",c=>{c.preventDefault(),t.onAvatarClick?.()});else{const c=o.getAttribute("data-href");c&&o.addEventListener("click",()=>{window.location.href=c})}n.querySelectorAll(".ubits-sidebar-profile-menu-item").forEach((c,u)=>{const g=t.profileMenuItems?.[u];!g||g.divider||c.addEventListener("click",m=>{m.preventDefault(),g.onClick?g.onClick():g.href&&(window.location.href=g.href),p()})})}function A(e,t){const o=e.querySelector("#ubits-darkmode-toggle");if(!o)return;const n=t.containerId;let r=null;n&&(r=document.getElementById(n)),r||(r=e.parentElement);const d=l=>{const i=o.querySelector("i");i&&(i.classList.remove("fa-moon","fa-sun","fa-sun-bright","far","fas","fa-solid","fa-regular"),i.classList.add("ubits-icon-transition"),requestAnimationFrame(()=>{l==="dark"?i.classList.add("fa-solid","fa-sun-bright"):i.classList.add("far","fa-moon")}),setTimeout(()=>{i.classList.remove("ubits-icon-transition")},400))};o.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const s=(o.getAttribute("data-theme")||"light")==="light"?"dark":"light";o.setAttribute("data-theme",s),d(s),r&&r.setAttribute("data-theme",s),t.onDarkModeToggle&&t.onDarkModeToggle(s==="dark")})}function L(e){const{containerId:t,bodyButtons:o,height:n}=e,r=document.getElementById(t);if(!r)throw new Error(`Container with id "${t}" not found`);window.getComputedStyle(r).position==="static"&&(r.style.position="relative");const l=M(e);r.innerHTML=l;const i=r.querySelector(".ubits-sidebar"),s=document.getElementById("ubits-sidebar-profile-menu");s&&!r.contains(s)&&r.appendChild(s);const f=document.getElementById("ubits-sidebar-tooltip");if(f&&!r.contains(f)&&r.appendChild(f),!i)throw new Error("Failed to create sidebar element");n?i.style.height=typeof n=="number"?`${n}px`:n:(E(i),window.addEventListener("resize",()=>E(i))),I(i),$(i,e),e.darkModeEnabled!==!1&&A(i,e);const p=i.querySelectorAll(".ubits-sidebar-body .ubits-sidebar-nav-button");p.forEach((u,g)=>{const m=o[g];m&&u.addEventListener("click",h=>{h.preventDefault(),m.state!=="disabled"&&(p.forEach(k=>k.classList.remove("active")),u.classList.add("active"),e.onActiveButtonChange&&e.onActiveButtonChange(m.section),m.onClick?m.onClick(h):m.href&&(window.location.href=m.href))})}),i.querySelectorAll(".ubits-sidebar-footer .ubits-sidebar-nav-button").forEach((u,g)=>{const m=e.footerButtons?.[g];m&&u.id!=="ubits-darkmode-toggle"&&u.addEventListener("click",h=>{h.preventDefault(),m.state!=="disabled"&&(m.onClick?m.onClick(h):m.href&&(window.location.href=m.href))})});const c=i.querySelector(".ubits-sidebar-logo");if(c){const u=c.getAttribute("data-href");u&&c.addEventListener("click",()=>{window.location.href=u})}return i}const S=[{section:"admin",icon:"fa-laptop",tooltip:"Administrador",href:"admin.html"},{section:"aprendizaje",icon:"fa-graduation-cap",tooltip:"Aprendizaje",href:"home-learn.html"},{section:"diagnóstico",icon:"fa-chart-mixed",tooltip:"Diagnóstico",href:"diagnostico.html"},{section:"desempeño",icon:"fa-bars-progress",tooltip:"Desempeño",href:"evaluaciones-360.html"},{section:"encuestas",icon:"fa-clipboard",tooltip:"Encuestas",href:"encuestas.html"},{section:"reclutamiento",icon:"fa-users",tooltip:"Reclutamiento",href:"reclutamiento.html"},{section:"tareas",icon:"fa-layer-group",tooltip:"Tareas",href:"planes.html"},{section:"ubits-ai",icon:"fa-sparkles",tooltip:"UBITS AI",href:"ubits-ai.html"}],H=[{section:"inicio",icon:"fa-house",tooltip:"Inicio",href:"admin.html"},{section:"empresa",icon:"fa-building",tooltip:"Empresa",href:"admin-empresa.html"},{section:"aprendizaje",icon:"fa-graduation-cap",tooltip:"Aprendizaje",href:"admin-aprendizaje.html"},{section:"diagnóstico",icon:"fa-chart-mixed",tooltip:"Diagnóstico",href:"admin-diagnostico.html"},{section:"desempeño",icon:"fa-bars-progress",tooltip:"Desempeño",href:"admin-desempeño.html"},{section:"encuestas",icon:"fa-clipboard",tooltip:"Encuestas",href:"admin-encuestas.html"}],D=[{section:"api",icon:"fa-code",tooltip:"API",href:"admin-api.html",id:"api-button"},{section:"centro-de-ayuda",icon:"fa-circle-question",tooltip:"Centro de ayuda",href:"admin-help-center.html",id:"help-center-button"}],j=[{icon:"fa-user",label:"Ver mi perfil",href:"profile.html"},{divider:!0},{icon:"fa-laptop",label:"Modo Administrador",href:"admin.html"},{divider:!0},{icon:"fa-key",label:"Cambio de contraseña",onClick:()=>{}},{icon:"fa-sign-out",label:"Cerrar sesión",onClick:()=>{}}],z=[{icon:"fa-user",label:"Ver mi perfil",href:"profile.html"},{divider:!0},{icon:"fa-user-gear",label:"Modo colaborador",href:"profile.html"},{divider:!0},{icon:"fa-key",label:"Cambio de contraseña",onClick:()=>{}},{icon:"fa-sign-out",label:"Cerrar sesión",onClick:()=>{}}];function O(e){return e==="admin"?{bodyButtons:H,footerButtons:D,profileMenuItems:z}:{bodyButtons:S,footerButtons:[],profileMenuItems:j}}const q={title:"Navegación/Sidebar",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Sidebar UBITS de navegación lateral con 2 variantes (colaborador y admin). Incluye tooltips, menú de perfil, dark mode toggle y ajuste dinámico de altura. Ancho fijo 96px, colores fijos (no cambian con tema)."}},layout:"fullscreen"},argTypes:{variant:{control:{type:"select"},options:["colaborador","admin"],description:"Variante del sidebar: colaborador o admin",table:{defaultValue:{summary:"colaborador"},type:{summary:"colaborador | admin"}}},activeButton:{control:{type:"select"},options:["","admin","aprendizaje","diagnóstico","desempeño","encuestas","reclutamiento","tareas","ubits-ai","inicio","empresa"],description:"Sección activa del sidebar (depende de la variante)",table:{defaultValue:{summary:""},type:{summary:"string"}}},darkModeEnabled:{control:{type:"boolean"},description:"Si el dark mode toggle está habilitado",table:{defaultValue:{summary:"true"}}}}};function U(e){const t=O(e);return{bodyButtons:t.bodyButtons,footerButtons:t.footerButtons,profileMenuItems:t.profileMenuItems}}function C(e,t){return e.map(o=>({...o,state:o.section===t?"active":"default"}))}const x={args:{containerId:"sidebar-story-container",variant:"colaborador",activeButton:"",darkModeEnabled:!0,logoImage:"/images/Ubits-logo.svg",avatarImage:"/images/Profile-image.jpg"},render:e=>{let t=document.getElementById("sidebar-story-wrapper");t?(t.innerHTML="",t.style.cssText=`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      `):(t=document.createElement("div"),t.id="sidebar-story-wrapper",t.style.cssText=`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      `,document.body.appendChild(t));const o=document.createElement("div");o.id=e.containerId||"sidebar-story-container",o.style.cssText=`
      position: relative;
      width: 96px;
      height: 650px;
      flex-shrink: 0;
      background: var(--modifiers-normal-color-light-bg-2);
    `,t.appendChild(o);const n=e.variant||"colaborador",r=e.activeButton||"",d=U(n),l=C(d.bodyButtons,r),i=r?C(d.footerButtons||[],r):d.footerButtons||[],s={containerId:o.id,variant:n,bodyButtons:l,footerButtons:i,profileMenuItems:d.profileMenuItems,logoHref:n==="admin"?"admin.html":"index.html",logoImage:e.logoImage||"/images/Ubits-logo.svg",avatarImage:e.avatarImage||"/images/Profile-image.jpg",darkModeEnabled:e.darkModeEnabled!==!1,height:650,onActiveButtonChange:c=>{},onDarkModeToggle:c=>{},onAvatarClick:()=>{}};try{L(s)}catch(c){console.error("Error creating sidebar:",c);const u=M(s);o.innerHTML=u}const f=document.createElement("div");f.style.cssText=`
      background: var(--modifiers-normal-color-light-bg-2);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      line-height: 1.6;
      flex: 1;
      min-width: 400px;
      max-width: 600px;
      font-family: var(--font-family-noto-sans-font-family);
      margin-top: 80px;
    `;const p=document.createElement("div");p.style.cssText=`
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 12px 32px;
      margin-bottom: 12px;
      align-items: baseline;
    `,p.innerHTML=`
      <div style="white-space: nowrap;"><strong>Variante:</strong> <span style="font-weight: 400;">${n==="colaborador"?"Colaborador":"Admin"}</span></div>
      <div style="white-space: nowrap;"><strong>Botón activo:</strong> <span style="font-weight: 400;">${r||"Ninguno"}</span></div>
      <div style="white-space: nowrap;"><strong>Dark mode:</strong> <span style="font-weight: 400;">${e.darkModeEnabled!==!1?"Habilitado":"Deshabilitado"}</span></div>
    `,f.appendChild(p);const b=document.createElement("div");return b.style.cssText=`
      border-top: 1px solid var(--modifiers-normal-color-light-border-1);
      font-style: italic;
    `,b.textContent="Haz hover sobre los botones para ver los tooltips. Haz hover sobre el avatar para ver el menú de perfil. Haz clic en el botón de dark mode para cambiar el tema.",f.appendChild(b),t.appendChild(f),t}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    containerId: 'sidebar-story-container',
    variant: 'colaborador',
    activeButton: '',
    darkModeEnabled: true,
    logoImage: '/images/Ubits-logo.svg',
    avatarImage: '/images/Profile-image.jpg'
  } as SidebarOptions & {
    variant?: SidebarVariant;
    activeButton?: string;
  },
  render: args => {
    // Crear un wrapper más amplio para el sidebar y la info (horizontal)
    let wrapper = document.getElementById('sidebar-story-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'sidebar-story-wrapper';
      wrapper.style.cssText = \`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      \`;
      document.body.appendChild(wrapper);
    } else {
      wrapper.innerHTML = '';
      wrapper.style.cssText = \`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      \`;
    }

    // Contenedor solo para el sidebar
    const container = document.createElement('div');
    container.id = args.containerId || 'sidebar-story-container';
    container.style.cssText = \`
      position: relative;
      width: 96px;
      height: 650px;
      flex-shrink: 0;
      background: var(--modifiers-normal-color-light-bg-2);
    \`;

    // Agregar el contenedor al wrapper ANTES de crear el sidebar
    wrapper.appendChild(container);
    const variant = args.variant || 'colaborador';
    const activeButton = args.activeButton || '';
    const config = getSidebarButtons(variant);

    // Actualizar botones con estado activo
    const bodyButtons = updateActiveButton(config.bodyButtons, activeButton);
    const footerButtons = activeButton ? updateActiveButton(config.footerButtons || [], activeButton) : config.footerButtons || [];
    const sidebarOptions: SidebarOptions = {
      containerId: container.id,
      variant: variant,
      bodyButtons: bodyButtons,
      footerButtons: footerButtons,
      profileMenuItems: config.profileMenuItems,
      logoHref: variant === 'admin' ? 'admin.html' : 'index.html',
      logoImage: args.logoImage || '/images/Ubits-logo.svg',
      avatarImage: args.avatarImage || '/images/Profile-image.jpg',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650,
      onActiveButtonChange: section => {
        // Active button changed
      },
      onDarkModeToggle: isDark => {
        // Dark mode toggled
        // NO actualizar el body/document, solo el contenedor (ya se hace en initDarkModeToggle)
      },
      onAvatarClick: () => {
        // Avatar clicked
      }
    };
    try {
      // El contenedor ya está en el DOM, ahora podemos crear el sidebar
      createSidebar(sidebarOptions);
    } catch (error) {
      console.error('Error creating sidebar:', error);
      // Fallback: renderizar HTML estático
      const sidebarHTML = renderSidebar(sidebarOptions);
      container.innerHTML = sidebarHTML;
    }

    // Agregar información del sidebar (formato horizontal con CSS Grid) - AL LADO del sidebar
    const info = document.createElement('div');
    info.style.cssText = \`
      background: var(--modifiers-normal-color-light-bg-2);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      line-height: 1.6;
      flex: 1;
      min-width: 400px;
      max-width: 600px;
      font-family: var(--font-family-noto-sans-font-family);
      margin-top: 80px;
    \`;

    // Crear el contenedor de información usando CSS Grid
    const infoGrid = document.createElement('div');
    infoGrid.style.cssText = \`
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 12px 32px;
      margin-bottom: 12px;
      align-items: baseline;
    \`;
    infoGrid.innerHTML = \`
      <div style="white-space: nowrap;"><strong>Variante:</strong> <span style="font-weight: 400;">\${variant === 'colaborador' ? 'Colaborador' : 'Admin'}</span></div>
      <div style="white-space: nowrap;"><strong>Botón activo:</strong> <span style="font-weight: 400;">\${activeButton || 'Ninguno'}</span></div>
      <div style="white-space: nowrap;"><strong>Dark mode:</strong> <span style="font-weight: 400;">\${args.darkModeEnabled !== false ? 'Habilitado' : 'Deshabilitado'}</span></div>
    \`;
    info.appendChild(infoGrid);

    // Agregar el texto de instrucciones
    const instructions = document.createElement('div');
    instructions.style.cssText = \`
      border-top: 1px solid var(--modifiers-normal-color-light-border-1);
      font-style: italic;
    \`;
    instructions.textContent = 'Haz hover sobre los botones para ver los tooltips. Haz hover sobre el avatar para ver el menú de perfil. Haz clic en el botón de dark mode para cambiar el tema.';
    info.appendChild(instructions);
    wrapper.appendChild(info);
    return wrapper;
  }
}`,...x.parameters?.docs?.source}}};const N=["Default"];export{x as Default,N as __namedExportsOrder,q as default};
