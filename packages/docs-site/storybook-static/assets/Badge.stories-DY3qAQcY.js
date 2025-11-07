function d(o={}){const{content:t,size:e="md",type:n,variant:a="primary",absolute:s=!1,position:l="top-right",className:p=""}=o,i=n||(t!=null&&t!==""?"number":"dot"),c=["ubits-badge",e!=="md"?`ubits-badge--${e}`:"",i==="dot"?"ubits-badge--dot":"",i==="number"?"ubits-badge--number":"",`ubits-badge--${a}`,s?"ubits-badge--absolute":"",s&&l?`ubits-badge--absolute-${l}`:"",p].filter(Boolean).join(" "),b=i==="number"&&t!==void 0&&t!==null?String(t):"";return`<span class="${c}">${b}</span>`}const u={title:"Components/Badge",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Badge UBITS para mostrar notificaciones, contadores o indicadores. Soporta solo bolita (dot) o con números, múltiples variantes de color y tamaños."}}},argTypes:{type:{control:{type:"select"},options:["dot","number"],description:"Tipo de badge: solo bolita o con número",table:{defaultValue:{summary:"number"},type:{summary:"dot | number"}}},variant:{control:{type:"select"},options:["primary","secondary","success","warning","error","info"],description:"Variante de color del badge",table:{defaultValue:{summary:"primary"},type:{summary:"primary | secondary | success | warning | error | info"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del badge",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},content:{control:{type:"text"},description:"Contenido del badge (número o texto, solo para tipo number)"},absolute:{control:{type:"boolean"},description:"Usar posición absoluta",table:{defaultValue:{summary:"false"}}},position:{control:{type:"select"},options:["top-right","top-left","bottom-right","bottom-left"],description:"Posición cuando es absoluto",table:{defaultValue:{summary:"top-right"}}}}},r={args:{type:"number",variant:"primary",size:"md",content:"5",absolute:!1,position:"top-right"},render:o=>{const t=document.createElement("div");t.style.padding="20px",t.style.background="var(--ubits-bg-1, #ffffff)",t.style.borderRadius="8px";const e=document.createElement("div");e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.padding="40px",e.style.minHeight="120px",e.style.background="var(--ubits-bg-2, #f9fafb)",e.style.borderRadius="8px",e.style.marginBottom="20px",e.style.position="relative";const n=document.createElement("div");if(n.style.display="inline-flex",n.style.alignItems="center",n.style.gap="16px",n.style.fontSize="16px",n.style.color="var(--ubits-fg-1-high, #303a47)",n.innerHTML=d(o),o.absolute){const a=document.createElement("div");a.style.position="relative",a.style.display="inline-block",a.style.padding="20px",a.style.background="var(--ubits-bg-1)",a.style.border="1px solid var(--ubits-border-1)",a.style.borderRadius="8px",a.innerHTML='<span style="font-size: 14px;">Elemento con badge</span>',a.innerHTML+=d(o),n.innerHTML="",n.appendChild(a)}return e.appendChild(n),t.appendChild(e),t}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'number',
    variant: 'primary',
    size: 'md',
    content: '5',
    absolute: false,
    position: 'top-right'
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
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--ubits-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    const badgeContainer = document.createElement('div');
    badgeContainer.style.display = 'inline-flex';
    badgeContainer.style.alignItems = 'center';
    badgeContainer.style.gap = '16px';
    badgeContainer.style.fontSize = '16px';
    badgeContainer.style.color = 'var(--ubits-fg-1-high, #303a47)';

    // Mostrar badge standalone
    badgeContainer.innerHTML = renderBadge(args);

    // Si es absoluto, necesitamos un contenedor relativo
    if (args.absolute) {
      const relativeContainer = document.createElement('div');
      relativeContainer.style.position = 'relative';
      relativeContainer.style.display = 'inline-block';
      relativeContainer.style.padding = '20px';
      relativeContainer.style.background = 'var(--ubits-bg-1)';
      relativeContainer.style.border = '1px solid var(--ubits-border-1)';
      relativeContainer.style.borderRadius = '8px';
      relativeContainer.innerHTML = '<span style="font-size: 14px;">Elemento con badge</span>';
      relativeContainer.innerHTML += renderBadge(args);
      badgeContainer.innerHTML = '';
      badgeContainer.appendChild(relativeContainer);
    }
    preview.appendChild(badgeContainer);
    container.appendChild(preview);
    return container;
  }
}`,...r.parameters?.docs?.source}}};const m=["Default"];export{r as Default,m as __namedExportsOrder,u as default};
