import{r as l}from"./AvatarProvider-CF4x-oFR.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Básicos/Avatar",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Avatar UBITS con soporte para imagen, iniciales e icono. Múltiples tamaños y badge opcional con contenido (texto/números). Usa tokens UBITS exclusivamente."}},layout:"centered"},argTypes:{imageUrl:{control:{type:"text"},description:"URL de la imagen del avatar (para variante Photo). Si se proporciona, se usa la variante Photo.",table:{type:{summary:"string"},defaultValue:{summary:"/images/Profile-image.jpg"},category:"Contenido"}},initials:{control:{type:"text"},description:'Texto para mostrar como iniciales (para variante Initials). Ej: "John Doe" genera "JD". Si se proporciona sin imageUrl, se usa la variante Initials.',table:{type:{summary:"string"},defaultValue:{summary:"JD"},category:"Contenido"}},icon:{control:{type:"text"},description:'Nombre del icono FontAwesome (para variante Icon). Ej: "user", "robot". Se usa si no hay imageUrl ni initials.',table:{type:{summary:"string"},defaultValue:{summary:"user"},category:"Contenido"}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del avatar (XS: 20px, SM: 28px, MD: 36px, LG: 40px)",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"},category:"Apariencia"}},badgeColor:{control:{type:"select"},options:["","green","red","blue","orange","gray"],description:"Color del badge. Si se proporciona, se muestra el badge. Dejar vacío para ocultar el badge.",table:{type:{summary:"string | null"},defaultValue:{summary:""},category:"Badge"}},badgeContent:{control:{type:"text"},description:'Contenido del badge (número o texto). Si no se proporciona o está vacío, se muestra solo el punto (dot). Ej: "5", "99+", "Nuevo"',table:{type:{summary:"string | number | null"},defaultValue:{summary:""},category:"Badge"}},alt:{control:{type:"text"},description:"Texto alternativo para accesibilidad (solo para variante Photo)",table:{type:{summary:"string"},defaultValue:{summary:"Avatar"},category:"Accesibilidad"}},onClick:{action:"clicked",description:"Función a ejecutar cuando se hace clic en el avatar",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}},i={args:{imageUrl:"/images/Profile-image.jpg",size:"md",badgeColor:"",badgeContent:"",alt:"Avatar",icon:"user"},render:e=>{const n=document.createElement("div");n.style.padding="20px",n.style.background="var(--modifiers-normal-color-light-bg-1, #ffffff)",n.style.borderRadius="8px";const a=document.createElement("div");a.style.display="flex",a.style.justifyContent="center",a.style.alignItems="center",a.style.padding="48px",a.style.minHeight="120px",a.style.background="var(--modifiers-normal-color-light-bg-2, #f9fafb)",a.style.borderRadius="8px",a.style.marginBottom="20px";const o=document.createElement("div"),r={size:e.size||"md",badgeColor:e.badgeColor&&e.badgeColor.trim()!==""?e.badgeColor:void 0,badgeContent:e.badgeContent&&e.badgeContent.toString().trim()!==""?e.badgeContent:void 0,alt:e.alt||"Avatar",className:e.className||"",onClick:e.onClick};if(e.imageUrl&&e.imageUrl.trim()!==""?r.imageUrl=e.imageUrl:e.initials&&e.initials.trim()!==""?r.initials=e.initials:r.icon=e.icon||"user",o.innerHTML=l(r),e.onClick){const s=o.querySelector(".ubits-avatar");s&&(s.addEventListener("click",t=>{t.preventDefault(),e.onClick&&e.onClick(t)}),s.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),e.onClick&&e.onClick(t))}))}return a.appendChild(o),n.appendChild(a),n}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
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
}`,...i.parameters?.docs?.source}}};const g=["Default"];export{i as Default,g as __namedExportsOrder,p as default};
