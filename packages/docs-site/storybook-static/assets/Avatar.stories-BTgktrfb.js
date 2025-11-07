import"./iframe-DpxOG777.js";import"./preload-helper-PPVm8Dsz.js";function S(e){if(typeof window.renderBadge=="function")return window.renderBadge(e);const{type:a,size:t,variant:o,absolute:i,position:r,className:n,content:s}=e,p=["ubits-badge",`ubits-badge--${t}`,a==="dot"?"ubits-badge--dot":"",a==="number"?"ubits-badge--number":"",`ubits-badge--${o}`,i?"ubits-badge--absolute":"",i&&r?`ubits-badge--absolute-${r}`:"",n].filter(Boolean).join(" "),g=a==="number"&&s!==void 0&&s!==null?String(s):"";return`<span class="${p}">${g}</span>`}const b={xs:20,sm:28,md:36,lg:40},h="md",w={green:"success",red:"error",blue:"info",orange:"warning",gray:"primary"},v={xs:6,sm:8,md:10,lg:10},y={xs:"var(--font-body-xs-size, 11px)",sm:"var(--font-body-sm-size, 13px)",md:"var(--font-body-md-size, 16px)",lg:"var(--font-body-lg-size, 18px)"};function $(e){return e.imageUrl?"photo":e.initials?"initials":"icon"}function E(e){const a=e.trim().split(/\s+/);return a.length===0?"":a.length===1?a[0].substring(0,2).toUpperCase():(a[0][0]+a[a.length-1][0]).toUpperCase()}function U(e={}){const{imageUrl:a,initials:t,icon:o="user",size:i="md",badgeColor:r,badgeContent:n,alt:s="Avatar",className:p="",onClick:g}=e,d=$(e),l=b[i]||b.md,f=v[i]||v.md,C=y[i]||y.md,x=["ubits-avatar",`ubits-avatar--${i}`,`ubits-avatar--${d}`,p].filter(Boolean).join(" "),k=`
    width: ${l}px;
    height: ${l}px;
    min-width: ${l}px;
    min-height: ${l}px;
  `.trim();let c="";if(d==="photo"&&a)c=`<div class="ubits-avatar-image-container"><img src="${a}" alt="${s}" class="ubits-avatar-image" /></div>`;else if(d==="initials"){const u=t?E(t):"";c=`<span class="ubits-avatar-initials" style="font-size: ${C};">${u}</span>`}else{const u=l-f*2;c=`<i class="far fa-${o}" style="font-size: ${u}px;"></i>`}const A=r?S({type:n!=null&&n!==""?"number":"dot",size:h,variant:w[r]||"success",absolute:!0,position:"bottom-right",className:"ubits-avatar-badge-wrapper",content:n}):"";return`
    <div class="${x}" style="${k}" ${g?'role="button" tabindex="0"':""} data-variant="${d}">
      ${c}
      ${A}
    </div>
  `.trim()}const D={title:"Components/Avatar",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Avatar UBITS con soporte para imagen, iniciales e icono. Múltiples tamaños y badge opcional con contenido (texto/números). Usa tokens UBITS exclusivamente."}},layout:"centered"},argTypes:{imageUrl:{control:{type:"text"},description:"URL de la imagen del avatar (para variante Photo). Si se proporciona, se usa la variante Photo.",table:{type:{summary:"string"},defaultValue:{summary:"/images/Profile-image.jpg"},category:"Contenido"}},initials:{control:{type:"text"},description:'Texto para mostrar como iniciales (para variante Initials). Ej: "John Doe" genera "JD". Si se proporciona sin imageUrl, se usa la variante Initials.',table:{type:{summary:"string"},defaultValue:{summary:"JD"},category:"Contenido"}},icon:{control:{type:"text"},description:'Nombre del icono FontAwesome (para variante Icon). Ej: "user", "robot". Se usa si no hay imageUrl ni initials.',table:{type:{summary:"string"},defaultValue:{summary:"user"},category:"Contenido"}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del avatar (XS: 20px, SM: 28px, MD: 36px, LG: 40px)",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"},category:"Apariencia"}},badgeColor:{control:{type:"select"},options:["","green","red","blue","orange","gray"],description:"Color del badge. Si se proporciona, se muestra el badge. Dejar vacío para ocultar el badge.",table:{type:{summary:"string | null"},defaultValue:{summary:""},category:"Badge"}},badgeContent:{control:{type:"text"},description:'Contenido del badge (número o texto). Si no se proporciona o está vacío, se muestra solo el punto (dot). Ej: "5", "99+", "Nuevo"',table:{type:{summary:"string | number | null"},defaultValue:{summary:""},category:"Badge"}},alt:{control:{type:"text"},description:"Texto alternativo para accesibilidad (solo para variante Photo)",table:{type:{summary:"string"},defaultValue:{summary:"Avatar"},category:"Accesibilidad"}},onClick:{action:"clicked",description:"Función a ejecutar cuando se hace clic en el avatar",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}},m={args:{imageUrl:"/images/Profile-image.jpg",size:"md",badgeColor:"",badgeContent:"",alt:"Avatar",icon:"user"},render:e=>{const a=document.createElement("div");a.style.padding="20px",a.style.background="var(--ubits-bg-1, #ffffff)",a.style.borderRadius="8px";const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.padding="48px",t.style.minHeight="120px",t.style.background="var(--ubits-bg-2, #f9fafb)",t.style.borderRadius="8px",t.style.marginBottom="20px";const o=document.createElement("div"),i={size:e.size||"md",badgeColor:e.badgeColor&&e.badgeColor.trim()!==""?e.badgeColor:void 0,badgeContent:e.badgeContent&&e.badgeContent.toString().trim()!==""?e.badgeContent:void 0,alt:e.alt||"Avatar",className:e.className||"",onClick:e.onClick};if(e.imageUrl&&e.imageUrl.trim()!==""?i.imageUrl=e.imageUrl:e.initials&&e.initials.trim()!==""?i.initials=e.initials:i.icon=e.icon||"user",o.innerHTML=U(i),e.onClick){const r=o.querySelector(".ubits-avatar");r&&(r.addEventListener("click",n=>{n.preventDefault(),e.onClick&&e.onClick(n)}),r.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),e.onClick&&e.onClick(n))}))}return t.appendChild(o),a.appendChild(t),a}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    imageUrl: '/images/Profile-image.jpg',
    size: 'md',
    badgeColor: '',
    badgeContent: '',
    alt: 'Avatar',
    icon: 'user'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--ubits-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    const avatarContainer = document.createElement('div');

    // Preparar opciones para renderAvatar
    const avatarOptions: AvatarOptions = {
      size: args.size || 'md',
      badgeColor: args.badgeColor && args.badgeColor.trim() !== '' ? args.badgeColor : undefined,
      badgeContent: args.badgeContent && args.badgeContent.toString().trim() !== '' ? args.badgeContent : undefined,
      alt: args.alt || 'Avatar',
      className: args.className || '',
      onClick: args.onClick
    };

    // Determinar variante basada en qué campos están presentes
    if (args.imageUrl && args.imageUrl.trim() !== '') {
      avatarOptions.imageUrl = args.imageUrl;
    } else if (args.initials && args.initials.trim() !== '') {
      avatarOptions.initials = args.initials;
    } else {
      avatarOptions.icon = args.icon || 'user';
    }
    avatarContainer.innerHTML = renderAvatar(avatarOptions);

    // Agregar event listener si hay onClick
    if (args.onClick) {
      const avatar = avatarContainer.querySelector('.ubits-avatar') as HTMLElement;
      if (avatar) {
        avatar.addEventListener('click', e => {
          e.preventDefault();
          if (args.onClick) {
            args.onClick(e as any);
          }
        });
        avatar.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (args.onClick) {
              args.onClick(e as any);
            }
          }
        });
      }
    }
    preview.appendChild(avatarContainer);
    container.appendChild(preview);
    return container;
  }
}`,...m.parameters?.docs?.source}}};const N=["Default"];export{m as Default,N as __namedExportsOrder,D as default};
