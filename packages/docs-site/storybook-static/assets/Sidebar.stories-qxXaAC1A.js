import"./iframe-Cv55Ao8S.js";import"./preload-helper-PPVm8Dsz.js";function y(e,t="regular"){const i=t==="regular"?"far":"fas",n=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${i} ${n}"></i>`}function B(e){const t=window.innerHeight,i=16,r=t-i-16,c=Math.max(578,r);e.style.height=`${c}px`,e.style.top=`${i}px`}function C(e){const{variant:t="colaborador",bodyButtons:i,footerButtons:n=[],logoHref:r,logoImage:l="images/Ubits-logo.svg",profileMenuItems:c=[],avatarImage:a="images/Profile-image.jpg",darkModeEnabled:u=!0,className:p="",attributes:g={}}=e,s=r||(t==="admin"?"admin.html":"index.html"),m=["ubits-sidebar",p].filter(Boolean).join(" "),d=Object.entries(g).map(([o,h])=>`${o}="${h}"`).join(" "),f=i.map(o=>{const h=["ubits-sidebar-nav-button",o.state==="active"?"active":"",o.state==="disabled"?"disabled":""].filter(Boolean).join(" "),v=o.onClick?'data-has-click-handler="true"':"",k=o.href?`data-href="${o.href}"`:"";return`
      <button 
        class="${h}" 
        data-section="${o.section}" 
        data-tooltip="${o.tooltip}"
        ${v}
        ${k}
        ${o.state==="disabled"?"disabled":""}
      >
        ${y(o.icon)}
      </button>
    `}).join(`
`),w=n.map(o=>{const h=["ubits-sidebar-nav-button",o.id?`id="ubits-${o.id}"`:"",o.state==="active"?"active":"",o.state==="disabled"?"disabled":""].filter(Boolean).join(" "),v=o.onClick?'data-has-click-handler="true"':"",k=o.href?`data-href="${o.href}"`:"";return`
      <button 
        class="${h}" 
        ${o.id?`id="ubits-${o.id}"`:""}
        data-section="${o.section}" 
        data-tooltip="${o.tooltip}"
        ${o.id==="darkmode-toggle"?'data-theme="light"':""}
        ${v}
        ${k}
        ${o.state==="disabled"?"disabled":""}
      >
        ${y(o.icon)}
      </button>
    `}).join(`
`),M=u?`
    <button 
      class="ubits-sidebar-nav-button" 
      id="ubits-darkmode-toggle" 
      data-tooltip="Modo oscuro" 
      data-theme="light"
      data-has-click-handler="true"
    >
      ${y("fa-moon","regular")}
    </button>
  `:"",T=c.length>0?`
    <div class="ubits-sidebar-profile-menu" id="ubits-sidebar-profile-menu">
      ${c.map(o=>{if(o.divider)return'<div class="ubits-sidebar-profile-menu-divider"></div>';const h=o.onClick?'data-has-click-handler="true"':"",v=o.href?`data-href="${o.href}"`:"";return`
          <div class="ubits-sidebar-profile-menu-item" ${h} ${v}>
            ${y(o.icon)}
            <span>${o.label}</span>
          </div>
        `}).join("")}
    </div>
  `:"";return`
    <aside class="${m}" id="ubits-sidebar" ${d}>
      <div class="ubits-sidebar-main">
        <div class="ubits-sidebar-header">
          <div class="ubits-sidebar-logo" data-href="${s}">
            <img src="${l}" alt="UBITS Logo" />
          </div>
        </div>
        <div class="ubits-sidebar-body">
          ${f}
        </div>
      </div>
      <div class="ubits-sidebar-footer">
        ${w}
        ${M}
        <div class="ubits-sidebar-user-avatar-container">
          <div class="ubits-sidebar-user-avatar" data-has-click-handler="${e.onAvatarClick?"true":""}">
            <img src="${a}" alt="Usuario" class="ubits-sidebar-avatar-image" />
          </div>
        </div>
      </div>
    </aside>
    ${T}
    <div class="ubits-sidebar-tooltip" id="ubits-sidebar-tooltip"></div>
  `.trim()}function I(e){const t=document.getElementById("ubits-sidebar-tooltip");if(!t)return;e.querySelectorAll("[data-tooltip]").forEach(n=>{const r=n.getAttribute("data-tooltip");r&&(n.addEventListener("mouseenter",()=>{const l=n.getBoundingClientRect(),c=t;c.textContent=r,c.classList.add("show"),c.style.left=`${l.right+12}px`,c.style.top=`${l.top+l.height/2-c.offsetHeight/2}px`}),n.addEventListener("mouseleave",()=>{t.classList.remove("show")}))})}function $(e,t){const i=e.querySelector(".ubits-sidebar-user-avatar"),n=document.getElementById("ubits-sidebar-profile-menu");if(!i||!n)return;const r=t.containerId,l=r?document.getElementById(r):e.parentElement,c=()=>{if(!l||l===document.body)return;const s=e.getBoundingClientRect(),m=l.getBoundingClientRect(),d=s.left-m.left+96,f=27;n.style.position="absolute",n.style.left=`${d}px`,n.style.bottom=`${f}px`};l&&l!==document.body?(window.getComputedStyle(l).position==="static"&&(l.style.position="relative"),c(),window.addEventListener("resize",c)):(n.style.position="fixed",n.style.left="96px",n.style.bottom="27px");let a=null,u=null;const p=()=>{u&&(clearTimeout(u),u=null),a&&clearTimeout(a),l&&l!==document.body&&c(),a=window.setTimeout(()=>{n.classList.add("show"),n.style.display="block"},100)},g=()=>{a&&(clearTimeout(a),a=null),u=window.setTimeout(()=>{n.classList.remove("show"),n.style.display="none"},200)};if(i.addEventListener("mouseenter",p),i.addEventListener("mouseleave",g),n.addEventListener("mouseenter",p),n.addEventListener("mouseleave",g),t.onAvatarClick)i.addEventListener("click",s=>{s.preventDefault(),t.onAvatarClick?.()});else{const s=i.getAttribute("data-href");s&&i.addEventListener("click",()=>{window.location.href=s})}n.querySelectorAll(".ubits-sidebar-profile-menu-item").forEach((s,m)=>{const d=t.profileMenuItems?.[m];!d||d.divider||s.addEventListener("click",f=>{f.preventDefault(),d.onClick?d.onClick():d.href&&(window.location.href=d.href),g()})})}function A(e,t){const i=e.querySelector("#ubits-darkmode-toggle");if(!i)return;const n=t.containerId;let r=null;n&&(r=document.getElementById(n)),r||(r=e.parentElement);const l=c=>{const a=i.querySelector("i");a&&(a.classList.remove("fa-moon","fa-sun","fa-sun-bright","far","fas","fa-solid","fa-regular"),a.classList.add("ubits-icon-transition"),requestAnimationFrame(()=>{c==="dark"?a.classList.add("fa-solid","fa-sun-bright"):a.classList.add("far","fa-moon")}),setTimeout(()=>{a.classList.remove("ubits-icon-transition")},400))};i.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation();const u=(i.getAttribute("data-theme")||"light")==="light"?"dark":"light";i.setAttribute("data-theme",u),l(u),r&&r.setAttribute("data-theme",u),t.onDarkModeToggle&&t.onDarkModeToggle(u==="dark")})}function L(e){const{containerId:t,bodyButtons:i,height:n}=e,r=document.getElementById(t);if(!r)throw new Error(`Container with id "${t}" not found`);window.getComputedStyle(r).position==="static"&&(r.style.position="relative");const c=C(e);r.innerHTML=c;const a=r.querySelector(".ubits-sidebar"),u=document.getElementById("ubits-sidebar-profile-menu");if(u&&!r.contains(u)&&r.appendChild(u),!a)throw new Error("Failed to create sidebar element");n?a.style.height=typeof n=="number"?`${n}px`:n:(B(a),window.addEventListener("resize",()=>B(a))),I(a),$(a,e),e.darkModeEnabled!==!1&&A(a,e);const p=a.querySelectorAll(".ubits-sidebar-body .ubits-sidebar-nav-button");p.forEach((s,m)=>{const d=i[m];d&&s.addEventListener("click",f=>{f.preventDefault(),d.state!=="disabled"&&(p.forEach(w=>w.classList.remove("active")),s.classList.add("active"),e.onActiveButtonChange&&e.onActiveButtonChange(d.section),d.onClick?d.onClick(f):d.href&&(window.location.href=d.href))})}),a.querySelectorAll(".ubits-sidebar-footer .ubits-sidebar-nav-button").forEach((s,m)=>{const d=e.footerButtons?.[m];d&&s.id!=="ubits-darkmode-toggle"&&s.addEventListener("click",f=>{f.preventDefault(),d.state!=="disabled"&&(d.onClick?d.onClick(f):d.href&&(window.location.href=d.href))})});const b=a.querySelector(".ubits-sidebar-logo");if(b){const s=b.getAttribute("data-href");s&&b.addEventListener("click",()=>{window.location.href=s})}return a}const S=[{section:"admin",icon:"fa-laptop",tooltip:"Administrador",href:"admin.html"},{section:"aprendizaje",icon:"fa-graduation-cap",tooltip:"Aprendizaje",href:"home-learn.html"},{section:"diagnóstico",icon:"fa-chart-mixed",tooltip:"Diagnóstico",href:"diagnostico.html"},{section:"desempeño",icon:"fa-bars-progress",tooltip:"Desempeño",href:"evaluaciones-360.html"},{section:"encuestas",icon:"fa-clipboard",tooltip:"Encuestas",href:"encuestas.html"},{section:"reclutamiento",icon:"fa-users",tooltip:"Reclutamiento",href:"reclutamiento.html"},{section:"tareas",icon:"fa-layer-group",tooltip:"Tareas",href:"planes.html"},{section:"ubits-ai",icon:"fa-sparkles",tooltip:"UBITS AI",href:"ubits-ai.html"}],H=[{section:"inicio",icon:"fa-house",tooltip:"Inicio",href:"admin.html"},{section:"empresa",icon:"fa-building",tooltip:"Empresa",href:"admin-empresa.html"},{section:"aprendizaje",icon:"fa-graduation-cap",tooltip:"Aprendizaje",href:"admin-aprendizaje.html"},{section:"diagnóstico",icon:"fa-chart-mixed",tooltip:"Diagnóstico",href:"admin-diagnostico.html"},{section:"desempeño",icon:"fa-bars-progress",tooltip:"Desempeño",href:"admin-desempeño.html"},{section:"encuestas",icon:"fa-clipboard",tooltip:"Encuestas",href:"admin-encuestas.html"}],D=[{section:"api",icon:"fa-code",tooltip:"API",href:"admin-api.html",id:"api-button"},{section:"centro-de-ayuda",icon:"fa-circle-question",tooltip:"Centro de ayuda",href:"admin-help-center.html",id:"help-center-button"}],j=[{icon:"fa-user",label:"Ver mi perfil",href:"profile.html"},{divider:!0},{icon:"fa-laptop",label:"Modo Administrador",href:"admin.html"},{divider:!0},{icon:"fa-key",label:"Cambio de contraseña",onClick:()=>{}},{icon:"fa-sign-out",label:"Cerrar sesión",onClick:()=>{}}],z=[{icon:"fa-user",label:"Ver mi perfil",href:"profile.html"},{divider:!0},{icon:"fa-user-gear",label:"Modo colaborador",href:"profile.html"},{divider:!0},{icon:"fa-key",label:"Cambio de contraseña",onClick:()=>{}},{icon:"fa-sign-out",label:"Cerrar sesión",onClick:()=>{}}];function O(e){return e==="admin"?{bodyButtons:H,footerButtons:D,profileMenuItems:z}:{bodyButtons:S,footerButtons:[],profileMenuItems:j}}const N={title:"Components/Sidebar",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Sidebar UBITS de navegación lateral con 2 variantes (colaborador y admin). Incluye tooltips, menú de perfil, dark mode toggle y ajuste dinámico de altura. Ancho fijo 96px, colores fijos (no cambian con tema)."}},layout:"fullscreen"},argTypes:{variant:{control:{type:"select"},options:["colaborador","admin"],description:"Variante del sidebar: colaborador o admin",table:{defaultValue:{summary:"colaborador"},type:{summary:"colaborador | admin"}}},activeButton:{control:{type:"select"},options:["","admin","aprendizaje","diagnóstico","desempeño","encuestas","reclutamiento","tareas","ubits-ai","inicio","empresa"],description:"Sección activa del sidebar (depende de la variante)",table:{defaultValue:{summary:""},type:{summary:"string"}}},darkModeEnabled:{control:{type:"boolean"},description:"Si el dark mode toggle está habilitado",table:{defaultValue:{summary:"true"}}}}};function U(e){const t=O(e);return{bodyButtons:t.bodyButtons,footerButtons:t.footerButtons,profileMenuItems:t.profileMenuItems}}function E(e,t){return e.map(i=>({...i,state:i.section===t?"active":"default"}))}const x={args:{containerId:"sidebar-story-container",variant:"colaborador",activeButton:"",darkModeEnabled:!0,logoImage:"/images/Ubits-logo.svg",avatarImage:"/images/Profile-image.jpg"},render:e=>{let t=document.getElementById("sidebar-story-wrapper");t?(t.innerHTML="",t.style.cssText=`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--ubits-bg-2);
        padding: 24px;
        border-radius: 8px;
      `):(t=document.createElement("div"),t.id="sidebar-story-wrapper",t.style.cssText=`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--ubits-bg-2);
        padding: 24px;
        border-radius: 8px;
      `,document.body.appendChild(t));const i=document.createElement("div");i.id=e.containerId||"sidebar-story-container",i.style.cssText=`
      position: relative;
      width: 96px;
      height: 650px;
      flex-shrink: 0;
      background: var(--ubits-bg-2);
      border-radius: 8px;
      padding: 16px;
    `,t.appendChild(i);const n=e.variant||"colaborador",r=e.activeButton||"",l=U(n),c=E(l.bodyButtons,r),a=r?E(l.footerButtons||[],r):l.footerButtons||[],u={containerId:i.id,variant:n,bodyButtons:c,footerButtons:a,profileMenuItems:l.profileMenuItems,logoHref:n==="admin"?"admin.html":"index.html",logoImage:e.logoImage||"/images/Ubits-logo.svg",avatarImage:e.avatarImage||"/images/Profile-image.jpg",darkModeEnabled:e.darkModeEnabled!==!1,height:650,onActiveButtonChange:s=>{console.log("Active button changed:",s)},onDarkModeToggle:s=>{console.log("Dark mode toggled:",s)},onAvatarClick:()=>{console.log("Avatar clicked")}};try{L(u)}catch(s){console.error("Error creating sidebar:",s);const m=C(u);i.innerHTML=m}const p=document.createElement("div");p.style.cssText=`
      padding: 16px;
      background: var(--ubits-bg-2, #f9fafb);
      border-radius: 8px;
      font-size: 14px;
      color: var(--ubits-fg-1-medium, #5c646f);
      border: 1px solid var(--ubits-border-1);
      line-height: 1.6;
      flex: 1;
      min-width: 400px;
      max-width: 600px;
      font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
      margin-top: 80px;
    `;const g=document.createElement("div");g.style.cssText=`
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 12px 32px;
      margin-bottom: 12px;
      align-items: baseline;
    `,g.innerHTML=`
      <div style="white-space: nowrap;"><strong>Variante:</strong> <span style="font-weight: 400;">${n==="colaborador"?"Colaborador":"Admin"}</span></div>
      <div style="white-space: nowrap;"><strong>Botón activo:</strong> <span style="font-weight: 400;">${r||"Ninguno"}</span></div>
      <div style="white-space: nowrap;"><strong>Dark mode:</strong> <span style="font-weight: 400;">${e.darkModeEnabled!==!1?"Habilitado":"Deshabilitado"}</span></div>
    `,p.appendChild(g);const b=document.createElement("div");return b.style.cssText=`
      padding-top: 12px;
      border-top: 1px solid var(--ubits-border-1);
      font-style: italic;
    `,b.textContent="Haz hover sobre los botones para ver los tooltips. Haz hover sobre el avatar para ver el menú de perfil. Haz clic en el botón de dark mode para cambiar el tema.",p.appendChild(b),t.appendChild(p),t}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
        background: var(--ubits-bg-2);
        padding: 24px;
        border-radius: 8px;
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
        background: var(--ubits-bg-2);
        padding: 24px;
        border-radius: 8px;
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
      background: var(--ubits-bg-2);
      border-radius: 8px;
      padding: 16px;
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
        console.log('Active button changed:', section);
      },
      onDarkModeToggle: isDark => {
        console.log('Dark mode toggled:', isDark);
        // NO actualizar el body/document, solo el contenedor (ya se hace en initDarkModeToggle)
      },
      onAvatarClick: () => {
        console.log('Avatar clicked');
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
      padding: 16px;
      background: var(--ubits-bg-2, #f9fafb);
      border-radius: 8px;
      font-size: 14px;
      color: var(--ubits-fg-1-medium, #5c646f);
      border: 1px solid var(--ubits-border-1);
      line-height: 1.6;
      flex: 1;
      min-width: 400px;
      max-width: 600px;
      font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
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
      padding-top: 12px;
      border-top: 1px solid var(--ubits-border-1);
      font-style: italic;
    \`;
    instructions.textContent = 'Haz hover sobre los botones para ver los tooltips. Haz hover sobre el avatar para ver el menú de perfil. Haz clic en el botón de dark mode para cambiar el tema.';
    info.appendChild(instructions);
    wrapper.appendChild(info);
    return wrapper;
  }
}`,...x.parameters?.docs?.source}}};const P=["Default"];export{x as Default,P as __namedExportsOrder,N as default};
