const l={title:"Layout/Contenedor",tags:["autodocs"],parameters:{docs:{description:{component:"Componente contenedor básico UBITS con fondo configurable (bg1, bg2, bg3, bg4), bordes con radio de 8px y padding interno de 12px. Usa tokens UBITS para mantener consistencia visual."}}},argTypes:{content:{control:{type:"text"},description:"Contenido del contenedor",table:{type:{summary:"string"}}},showBorder:{control:{type:"boolean"},description:"Mostrar borde visual (opcional, solo para demostración)",table:{defaultValue:{summary:"false"}}},backgroundVariant:{control:{type:"select"},options:["bg1","bg2","bg3","bg4"],description:"Variante de fondo del contenedor",table:{defaultValue:{summary:"bg1"}}}}},r={args:{content:"Este es un contenedor básico con fondo configurable, border-radius de 8px y padding interno de 12px. Puedes cambiar el fondo, agregar un borde y personalizar el contenido usando los controles.",showBorder:!1,backgroundVariant:"bg1"},render:a=>{const o=document.createElement("div");o.style.padding="20px",o.style.background="var(--modifiers-normal-color-light-bg-2)",o.style.borderRadius="8px";const n=document.createElement("div");n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.padding="40px",n.style.minHeight="200px",n.style.background="var(--modifiers-normal-color-light-bg-1)",n.style.borderRadius="8px",n.style.marginBottom="20px";const e=document.createElement("div");e.className="ubits-container";const i=`var(--modifiers-normal-color-light-bg-${(a.backgroundVariant||"bg1").replace("bg","")})`;e.style.background=i,e.style.padding="var(--p-spacing-mode-1-md, 12px)",e.style.borderRadius="8px",e.style.color="var(--modifiers-normal-color-light-fg-1-high)",e.style.fontFamily='var(--font-family-noto-sans-font-family, var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif))',e.style.fontSize="var(--modifiers-normal-body-md-regular-fontsize, var(--font-body-md-size, 14px))",e.style.lineHeight="var(--modifiers-normal-body-md-regular-lineheight, var(--font-body-md-line, 20px))",e.style.maxWidth="600px",e.style.width="100%",a.showBorder&&(e.style.border="1px solid var(--modifiers-normal-color-light-border-1)");const t=document.createElement("p");return t.style.margin="0",t.style.color="var(--modifiers-normal-color-light-fg-1-medium)",t.textContent=a.content||"Contenido del contenedor",e.appendChild(t),n.appendChild(e),o.appendChild(n),o}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Este es un contenedor básico con fondo configurable, border-radius de 8px y padding interno de 12px. Puedes cambiar el fondo, agregar un borde y personalizar el contenido usando los controles.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '200px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';

    // Crear el contenedor UBITS
    const ubitsContainer = document.createElement('div');
    ubitsContainer.className = 'ubits-container';

    // Aplicar variante de fondo según el control
    const bgVariant = args.backgroundVariant || 'bg1';
    const bgNumber = bgVariant.replace('bg', '');
    const bgToken = \`var(--modifiers-normal-color-light-bg-\${bgNumber})\`;
    ubitsContainer.style.background = bgToken;
    ubitsContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
    ubitsContainer.style.borderRadius = '8px';
    ubitsContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    ubitsContainer.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif))';
    ubitsContainer.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize, var(--font-body-md-size, 14px))';
    ubitsContainer.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight, var(--font-body-md-line, 20px))';
    ubitsContainer.style.maxWidth = '600px';
    ubitsContainer.style.width = '100%';

    // Agregar borde si se solicita
    if (args.showBorder) {
      ubitsContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    }

    // Agregar contenido
    const contentText = document.createElement('p');
    contentText.style.margin = '0';
    contentText.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    contentText.textContent = args.content || 'Contenido del contenedor';
    ubitsContainer.appendChild(contentText);
    preview.appendChild(ubitsContainer);
    container.appendChild(preview);
    return container;
  }
}`,...r.parameters?.docs?.source}}};const c=["Default"];export{r as Default,c as __namedExportsOrder,l as default};
