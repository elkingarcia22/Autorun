import{r as h}from"./BadgeProvider-DQRLkCrk.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";function A(e,t="regular"){const n=t==="solid"?"fas":"far",i=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${n} ${i}"></i>`}function L(e){const t={content:typeof e.content=="number"?String(e.content):e.content,variant:e.variant||"error",type:"number",size:"sm",style:"light"};return h(t)}function C(e,t){const n=["ubits-menu-item",e.active&&"ubits-menu-item--active",e.disabled&&"ubits-menu-item--disabled"].filter(Boolean).join(" "),i=e.icon?A(e.icon,e.iconStyle):"",o=e.badge?L(e.badge):"",s=e.onClick?'data-has-click-handler="true"':"",l=e.href?`data-href="${e.href}"`:"",r=e.disabled?"disabled":"";return`
    <button 
      class="${n}" 
      data-item-id="${e.id}"
      data-section-id="${t}"
      ${s}
      ${l}
      ${r}
    >
      ${i?`<span class="ubits-menu-item-icon">${i}</span>`:""}
      <span class="ubits-menu-item-label">${e.label}</span>
      ${o?`<span class="ubits-menu-item-right">${o}</span>`:""}
    </button>
  `}function E(e){return`
    <div class="ubits-menu-section" data-section-id="${e.id}">
      <h3 class="ubits-menu-section-title">${e.title}</h3>
      <div class="ubits-menu-section-items">
        ${e.items.map(t=>C(t,e.id)).join("")}
      </div>
    </div>
  `}function x(e){return e?`
    <div class="ubits-menu-user-info">
      <div class="ubits-menu-user-avatar" ${e.onAvatarClick?'data-has-click-handler="true"':""}>
        <img src="${e.avatarImage}" alt="${e.name}" />
      </div>
      <div class="ubits-menu-user-details">
        <div class="ubits-menu-user-name">${e.name}</div>
        <div class="ubits-menu-user-role">${e.role}</div>
      </div>
    </div>
  `:""}function T(e){const{logoImage:t,appName:n,logoHref:i,sections:a,userInfo:o,width:s,className:l="",attributes:r={}}=e,m=["ubits-menu",l].filter(Boolean).join(" "),f=Object.entries(r).map(([u,v])=>`${u}="${v}"`).join(" "),p=s?`width: ${typeof s=="number"?`${s}px`:s};`:"",b=t?`
    <div class="ubits-menu-header">
      <div class="ubits-menu-logo" ${i?`data-href="${i}"`:""}>
        <img src="${t}" alt="${n||"Logo"}" />
      </div>
      ${n?`<div class="ubits-menu-app-name">${n}</div>`:""}
    </div>
  `:"",c=a.map(u=>E(u)).join(""),g=x(o);return`
    <aside class="${m}" ${f} style="${p}">
      ${b}
      <div class="ubits-menu-body">
        ${c}
      </div>
      ${g}
    </aside>
  `.trim()}const D={title:"Navegación/Menu",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Menu UBITS de navegación lateral con secciones, items, shortcuts, badges e información de usuario. Usa tokens UBITS para colores, tipografía y espaciado."}},layout:"padded"},argTypes:{logoImage:{control:{type:"text"},description:"URL de la imagen del logo",table:{category:"Header",type:{summary:"string"}}},appName:{control:{type:"text"},description:"Nombre de la aplicación",table:{category:"Header",type:{summary:"string"}}},logoHref:{control:{type:"text"},description:"URL a la que redirige el logo",table:{category:"Header",type:{summary:"string"}}},width:{control:{type:"number"},description:"Ancho del menú en píxeles",table:{category:"Layout",type:{summary:"number"},defaultValue:{summary:280}}},section1Title:{control:{type:"text"},description:"Título de la primera sección",table:{category:"Sección 1",type:{summary:"string"}}},section1Item1Label:{control:{type:"text"},description:"Label del primer item de la sección 1",table:{category:"Sección 1 - Item 1"}},section1Item1Icon:{control:{type:"text"},description:"Icono FontAwesome (sin prefijo fa-)",table:{category:"Sección 1 - Item 1"}},section1Item1IconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono",table:{category:"Sección 1 - Item 1",defaultValue:{summary:"regular"}}},section1Item1Active:{control:{type:"boolean"},description:"Si el item está activo",table:{category:"Sección 1 - Item 1",defaultValue:{summary:!1}}},section1Item1Disabled:{control:{type:"boolean"},description:"Si el item está deshabilitado",table:{category:"Sección 1 - Item 1",defaultValue:{summary:!1}}},section1Item2Label:{control:{type:"text"},description:"Label del segundo item de la sección 1",table:{category:"Sección 1 - Item 2"}},section1Item2Icon:{control:{type:"text"},description:"Icono FontAwesome (sin prefijo fa-)",table:{category:"Sección 1 - Item 2"}},section1Item2IconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono",table:{category:"Sección 1 - Item 2",defaultValue:{summary:"regular"}}},section1Item2Active:{control:{type:"boolean"},description:"Si el item está activo",table:{category:"Sección 1 - Item 2",defaultValue:{summary:!1}}},section1Item2Disabled:{control:{type:"boolean"},description:"Si el item está deshabilitado",table:{category:"Sección 1 - Item 2",defaultValue:{summary:!1}}},section2Title:{control:{type:"text"},description:"Título de la segunda sección",table:{category:"Sección 2",type:{summary:"string"}}},section2Item1Label:{control:{type:"text"},description:"Label del primer item de la sección 2",table:{category:"Sección 2 - Item 1"}},section2Item1Icon:{control:{type:"text"},description:"Icono FontAwesome (sin prefijo fa-)",table:{category:"Sección 2 - Item 1"}},section2Item1IconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono",table:{category:"Sección 2 - Item 1",defaultValue:{summary:"regular"}}},section2Item1Active:{control:{type:"boolean"},description:"Si el item está activo",table:{category:"Sección 2 - Item 1",defaultValue:{summary:!1}}},section2Item1Disabled:{control:{type:"boolean"},description:"Si el item está deshabilitado",table:{category:"Sección 2 - Item 1",defaultValue:{summary:!1}}},section2Item2Label:{control:{type:"text"},description:"Label del segundo item de la sección 2",table:{category:"Sección 2 - Item 2"}},section2Item2Icon:{control:{type:"text"},description:"Icono FontAwesome (sin prefijo fa-)",table:{category:"Sección 2 - Item 2"}},section2Item2IconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono",table:{category:"Sección 2 - Item 2",defaultValue:{summary:"regular"}}},section2Item2Badge:{control:{type:"number"},description:"Número del badge (0 para ocultar)",table:{category:"Sección 2 - Item 2",defaultValue:{summary:0}}},section2Item2BadgeVariant:{control:{type:"select"},options:["success","warning","error","info"],description:"Variante del badge",table:{category:"Sección 2 - Item 2",defaultValue:{summary:"error"}}},section2Item2Active:{control:{type:"boolean"},description:"Si el item está activo",table:{category:"Sección 2 - Item 2",defaultValue:{summary:!1}}},section2Item2Disabled:{control:{type:"boolean"},description:"Si el item está deshabilitado",table:{category:"Sección 2 - Item 2",defaultValue:{summary:!1}}},section2Item3Label:{control:{type:"text"},description:"Label del tercer item de la sección 2",table:{category:"Sección 2 - Item 3"}},section2Item3Icon:{control:{type:"text"},description:"Icono FontAwesome (sin prefijo fa-)",table:{category:"Sección 2 - Item 3"}},section2Item3IconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono",table:{category:"Sección 2 - Item 3",defaultValue:{summary:"regular"}}},section2Item3Active:{control:{type:"boolean"},description:"Si el item está activo",table:{category:"Sección 2 - Item 3",defaultValue:{summary:!1}}},section2Item3Disabled:{control:{type:"boolean"},description:"Si el item está deshabilitado",table:{category:"Sección 2 - Item 3",defaultValue:{summary:!1}}},userAvatarImage:{control:{type:"text"},description:"URL de la imagen del avatar",table:{category:"Usuario",type:{summary:"string"}}},userName:{control:{type:"text"},description:"Nombre del usuario",table:{category:"Usuario",type:{summary:"string"}}},userRole:{control:{type:"text"},description:"Rol del usuario",table:{category:"Usuario",type:{summary:"string"}}}}};function $(e){const t=[];if(e.section1Title){const n=[];e.section1Item1Label&&n.push({id:"section1-item1",label:e.section1Item1Label,icon:e.section1Item1Icon,iconStyle:e.section1Item1IconStyle||"regular",active:e.section1Item1Active||!1,disabled:e.section1Item1Disabled||!1}),e.section1Item2Label&&n.push({id:"section1-item2",label:e.section1Item2Label,icon:e.section1Item2Icon,iconStyle:e.section1Item2IconStyle||"regular",active:e.section1Item2Active||!1,disabled:e.section1Item2Disabled||!1}),n.length>0&&t.push({id:"section1",title:e.section1Title,items:n})}if(e.section2Title){const n=[];e.section2Item1Label&&n.push({id:"section2-item1",label:e.section2Item1Label,icon:e.section2Item1Icon,iconStyle:e.section2Item1IconStyle||"regular",active:e.section2Item1Active||!1,disabled:e.section2Item1Disabled||!1}),e.section2Item2Label&&n.push({id:"section2-item2",label:e.section2Item2Label,icon:e.section2Item2Icon,iconStyle:e.section2Item2IconStyle||"regular",badge:e.section2Item2Badge&&e.section2Item2Badge>0?{content:e.section2Item2Badge,variant:e.section2Item2BadgeVariant||"error"}:void 0,active:e.section2Item2Active||!1,disabled:e.section2Item2Disabled||!1}),e.section2Item3Label&&n.push({id:"section2-item3",label:e.section2Item3Label,icon:e.section2Item3Icon,iconStyle:e.section2Item3IconStyle||"regular",active:e.section2Item3Active||!1,disabled:e.section2Item3Disabled||!1}),n.length>0&&t.push({id:"section2",title:e.section2Title,items:n})}return t}const y={args:{logoImage:"/images/autoframe-logo-light.svg",appName:"AUTOFROME",logoHref:"#",width:280,section1Title:"Documents",section1Item1Label:"New",section1Item1Icon:"plus",section1Item1IconStyle:"regular",section1Item1Active:!1,section1Item1Disabled:!1,section1Item2Label:"Search",section1Item2Icon:"search",section1Item2IconStyle:"regular",section1Item2Active:!1,section1Item2Disabled:!1,section2Title:"Profile",section2Item1Label:"Settings",section2Item1Icon:"gear",section2Item1IconStyle:"regular",section2Item1Active:!0,section2Item1Disabled:!1,section2Item2Label:"Messages",section2Item2Icon:"envelope",section2Item2IconStyle:"regular",section2Item2Badge:2,section2Item2BadgeVariant:"error",section2Item2Active:!1,section2Item2Disabled:!1,section2Item3Label:"Logout",section2Item3Icon:"sign-out",section2Item3IconStyle:"regular",section2Item3Active:!1,section2Item3Disabled:!1,userAvatarImage:"/images/Profile-image.jpg",userName:"Amy Elsner",userRole:"Admin"},render:e=>{const t=document.createElement("div");t.style.cssText=`
      display: flex;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
    `;const n=$(e),i=e.userAvatarImage&&e.userName&&e.userRole?{avatarImage:e.userAvatarImage,name:e.userName,role:e.userRole}:void 0,a={containerId:"menu-story-container",logoImage:e.logoImage,appName:e.appName,logoHref:e.logoHref,width:e.width||280,sections:n,userInfo:i,onActiveItemChange:(m,f)=>{},onAvatarClick:()=>{}},o=document.createElement("div");o.id="menu-story-container",o.style.cssText=`
      position: relative;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;const s={...a};delete s.containerId,o.innerHTML=T(s),t.appendChild(o),requestAnimationFrame(()=>{const m=o.querySelector(".ubits-menu");if(m){const f=m.querySelectorAll(".ubits-menu-item");f.forEach(c=>{const g=c.getAttribute("data-item-id"),u=c.getAttribute("data-section-id");if(!g||!u)return;const d=a.sections.find(I=>I.id===u)?.items.find(I=>I.id===g);d&&c.addEventListener("click",I=>{I.preventDefault(),!d.disabled&&(f.forEach(S=>S.classList.remove("ubits-menu-item--active")),c.classList.add("ubits-menu-item--active"),d.onClick?d.onClick(I,d):d.href&&(window.location.href=d.href))})});const p=m.querySelector(".ubits-menu-logo");p&&a.logoHref&&p.addEventListener("click",()=>{window.location.href=a.logoHref});const b=m.querySelector(".ubits-menu-user-avatar");b&&a.userInfo?.onAvatarClick&&b.addEventListener("click",c=>{c.preventDefault(),a.userInfo.onAvatarClick()})}});const l=document.createElement("div");l.style.cssText=`
      flex: 1;
      background: var(--modifiers-normal-color-light-bg-1);
      border-left: 1px solid var(--modifiers-normal-color-light-border-1);
      overflow-y: auto;
    `;const r=document.createElement("div");return r.style.cssText=`
      font-family: var(--font-family-noto-sans-font-family);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      line-height: 1.6;
    `,r.innerHTML=`
        <li>Logo de Autoframe y nombre de la aplicación</li>
        <li>Secciones con títulos</li>
        <li>Items con iconos, texto y badges</li>
        <li>Información del usuario al final</li>
      </ul>
        <li>Usa tokens UBITS para colores, tipografía y espaciado</li>
        <li>Soporta items activos, deshabilitados</li>
        <li>Badges de UBITS con diferentes variantes</li>
        <li>Responsive design</li>
      </ul>
        <strong>Nota:</strong> Usa los controles en el panel lateral para personalizar todos los aspectos del menú.
      </p>
    `,l.appendChild(r),t.appendChild(l),t}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    // Header
    logoImage: '/images/autoframe-logo-light.svg',
    appName: 'AUTOFROME',
    logoHref: '#',
    width: 280,
    // Sección 1
    section1Title: 'Documents',
    section1Item1Label: 'New',
    section1Item1Icon: 'plus',
    section1Item1IconStyle: 'regular',
    section1Item1Active: false,
    section1Item1Disabled: false,
    section1Item2Label: 'Search',
    section1Item2Icon: 'search',
    section1Item2IconStyle: 'regular',
    section1Item2Active: false,
    section1Item2Disabled: false,
    // Sección 2
    section2Title: 'Profile',
    section2Item1Label: 'Settings',
    section2Item1Icon: 'gear',
    section2Item1IconStyle: 'regular',
    section2Item1Active: true,
    section2Item1Disabled: false,
    section2Item2Label: 'Messages',
    section2Item2Icon: 'envelope',
    section2Item2IconStyle: 'regular',
    section2Item2Badge: 2,
    section2Item2BadgeVariant: 'error',
    section2Item2Active: false,
    section2Item2Disabled: false,
    section2Item3Label: 'Logout',
    section2Item3Icon: 'sign-out',
    section2Item3IconStyle: 'regular',
    section2Item3Active: false,
    section2Item3Disabled: false,
    // Usuario
    userAvatarImage: '/images/Profile-image.jpg',
    userName: 'Amy Elsner',
    userRole: 'Admin'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.cssText = \`
      display: flex;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
    \`;

    // Construir opciones del menú desde los args
    const sections = buildSectionsFromArgs(args);
    const userInfo: MenuUserInfo | undefined = args.userAvatarImage && args.userName && args.userRole ? {
      avatarImage: args.userAvatarImage,
      name: args.userName,
      role: args.userRole
    } : undefined;
    const menuOptions: MenuOptions = {
      containerId: 'menu-story-container',
      logoImage: args.logoImage,
      appName: args.appName,
      logoHref: args.logoHref,
      width: args.width || 280,
      sections: sections,
      userInfo: userInfo,
      onActiveItemChange: (itemId, sectionId) => {
        // Handler para cambio de item activo
      },
      onAvatarClick: () => {
        // Handler para click en avatar
      }
    };

    // Contenedor del menú
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu-story-container';
    menuContainer.style.cssText = \`
      position: relative;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    \`;

    // Renderizar HTML directamente (sin containerId para evitar el error)
    const menuOptionsWithoutContainer: Omit<MenuOptions, 'containerId'> = {
      ...menuOptions
    };
    delete (menuOptionsWithoutContainer as any).containerId;
    menuContainer.innerHTML = renderMenu(menuOptionsWithoutContainer);
    container.appendChild(menuContainer);

    // Inicializar eventos después de que el contenedor esté en el DOM
    requestAnimationFrame(() => {
      const menuEl = menuContainer.querySelector('.ubits-menu') as HTMLElement;
      if (menuEl) {
        // Inicializar eventos básicos
        const menuItems = menuEl.querySelectorAll('.ubits-menu-item');
        menuItems.forEach(itemElement => {
          const itemId = itemElement.getAttribute('data-item-id');
          const sectionId = itemElement.getAttribute('data-section-id');
          if (!itemId || !sectionId) return;
          const section = menuOptions.sections.find(s => s.id === sectionId);
          const item = section?.items.find(i => i.id === itemId);
          if (!item) return;
          itemElement.addEventListener('click', e => {
            e.preventDefault();
            if (item.disabled) return;
            menuItems.forEach(btn => btn.classList.remove('ubits-menu-item--active'));
            itemElement.classList.add('ubits-menu-item--active');
            if (menuOptions.onActiveItemChange) {
              menuOptions.onActiveItemChange(itemId, sectionId);
            }
            if (item.onClick) {
              item.onClick(e as MouseEvent, item);
            } else if (item.href) {
              window.location.href = item.href;
            }
          });
        });

        // Click en logo
        const logoElement = menuEl.querySelector('.ubits-menu-logo');
        if (logoElement && menuOptions.logoHref) {
          logoElement.addEventListener('click', () => {
            window.location.href = menuOptions.logoHref!;
          });
        }

        // Click en avatar
        const avatarElement = menuEl.querySelector('.ubits-menu-user-avatar');
        if (avatarElement && menuOptions.userInfo?.onAvatarClick) {
          avatarElement.addEventListener('click', e => {
            e.preventDefault();
            menuOptions.userInfo!.onAvatarClick!();
          });
        }
      }
    });

    // Panel de información (opcional, para mostrar detalles)
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = \`
      flex: 1;
      background: var(--modifiers-normal-color-light-bg-1);
      border-left: 1px solid var(--modifiers-normal-color-light-border-1);
      overflow-y: auto;
    \`;
    const infoContent = document.createElement('div');
    infoContent.style.cssText = \`
      font-family: var(--font-family-noto-sans-font-family);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      line-height: 1.6;
    \`;
    infoContent.innerHTML = \`
        <li>Logo de Autoframe y nombre de la aplicación</li>
        <li>Secciones con títulos</li>
        <li>Items con iconos, texto y badges</li>
        <li>Información del usuario al final</li>
      </ul>
        <li>Usa tokens UBITS para colores, tipografía y espaciado</li>
        <li>Soporta items activos, deshabilitados</li>
        <li>Badges de UBITS con diferentes variantes</li>
        <li>Responsive design</li>
      </ul>
        <strong>Nota:</strong> Usa los controles en el panel lateral para personalizar todos los aspectos del menú.
      </p>
    \`;
    infoPanel.appendChild(infoContent);
    container.appendChild(infoPanel);
    return container;
  }
}`,...y.parameters?.docs?.source}}};const M=["Default"];export{y as Default,M as __namedExportsOrder,D as default};
