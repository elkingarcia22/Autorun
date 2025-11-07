const p={title:"Components/Contenedor",tags:["autodocs"],parameters:{docs:{description:{component:"Componente contenedor básico UBITS con fondo configurable (bg1, bg2, bg3, bg4), bordes con radio de 8px y padding interno de 12px. Usa tokens UBITS para mantener consistencia visual."}}},argTypes:{content:{control:{type:"text"},description:"Contenido del contenedor",table:{type:{summary:"string"}}},showBorder:{control:{type:"boolean"},description:"Mostrar borde visual (opcional, solo para demostración)",table:{defaultValue:{summary:"false"}}},backgroundVariant:{control:{type:"select"},options:["bg1","bg2","bg3","bg4"],description:"Variante de fondo del contenedor",table:{defaultValue:{summary:"bg1"}}}}},d={args:{content:"Este es un contenedor básico con fondo bg-1, border-radius de 8px y padding interno de 12px.",showBorder:!1,backgroundVariant:"bg1"},render:r=>{const n=document.createElement("div");n.style.padding="20px",n.style.background="var(--ubits-bg-2)",n.style.borderRadius="8px";const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.padding="40px",t.style.minHeight="120px",t.style.background="var(--ubits-bg-1)",t.style.borderRadius="8px",t.style.marginBottom="20px";const e=document.createElement("div");e.className="ubits-container";const i=`var(--ubits-bg-${(r.backgroundVariant||"bg1").replace("bg","")})`;e.style.background=i,e.style.borderRadius="var(--ubits-border-radius-md)",e.style.padding="var(--ubits-spacing-md)",e.style.color="var(--ubits-fg-1-high)",e.style.fontFamily='var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',e.style.fontSize="var(--font-body-md-size, 14px)",e.style.lineHeight="var(--font-body-md-line, 20px)",r.showBorder&&(e.style.border="1px solid var(--ubits-border-1)");const o=document.createElement("p");return o.style.margin="0",o.style.color="var(--ubits-fg-1-medium)",o.textContent=r.content||"Contenido del contenedor",e.appendChild(o),t.appendChild(e),n.appendChild(t),n}},l={args:{content:"Este contenedor puede incluir cualquier tipo de contenido: texto, imágenes, botones, formularios, etc.",showBorder:!1,backgroundVariant:"bg1"},render:r=>{const n=document.createElement("div");n.style.padding="20px",n.style.background="var(--ubits-bg-2)",n.style.borderRadius="8px";const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.padding="40px",t.style.minHeight="200px",t.style.background="var(--ubits-bg-1)",t.style.borderRadius="8px",t.style.marginBottom="20px";const e=document.createElement("div");e.className="ubits-container";const i=`var(--ubits-bg-${(r.backgroundVariant||"bg1").replace("bg","")})`;e.style.background=i,e.style.borderRadius="var(--ubits-border-radius-md)",e.style.padding="var(--ubits-spacing-md)",e.style.color="var(--ubits-fg-1-high)",e.style.fontFamily='var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',e.style.maxWidth="600px",e.style.width="100%",r.showBorder&&(e.style.border="1px solid var(--ubits-border-1)");const o=document.createElement("h3");o.style.margin="0 0 12px 0",o.style.color="var(--ubits-fg-1-high)",o.style.fontSize="var(--font-heading-h3-size, 18px)",o.style.fontWeight="var(--weight-semibold, 600)",o.style.fontFamily="var(--font-sans)",o.textContent="Título del contenedor";const s=document.createElement("p");s.style.margin="0 0 16px 0",s.style.color="var(--ubits-fg-1-medium)",s.style.fontSize="var(--font-body-md-size, 14px)",s.style.lineHeight="var(--font-body-md-line, 20px)",s.textContent=r.content||"Contenido del contenedor";const a=document.createElement("button");return a.style.padding="8px 16px",a.style.background="var(--ubits-accent-brand-static-inverted)",a.style.color="white",a.style.border="none",a.style.borderRadius="var(--ubits-border-radius-md, 8px)",a.style.cursor="pointer",a.style.fontSize="var(--font-body-sm-size, 13px)",a.style.fontFamily="var(--font-sans)",a.textContent="Botón de ejemplo",e.appendChild(o),e.appendChild(s),e.appendChild(a),t.appendChild(e),n.appendChild(t),n}},c={args:{content:"Este ejemplo muestra el contenedor con un borde visual para mejor contraste (opcional).",showBorder:!0,backgroundVariant:"bg1"},render:r=>{const n=document.createElement("div");n.style.padding="20px",n.style.background="var(--ubits-bg-2)",n.style.borderRadius="8px";const t=document.createElement("div");t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.padding="40px",t.style.minHeight="120px",t.style.background="var(--ubits-bg-1)",t.style.borderRadius="8px",t.style.marginBottom="20px";const e=document.createElement("div");e.className="ubits-container";const i=`var(--ubits-bg-${(r.backgroundVariant||"bg1").replace("bg","")})`;e.style.background=i,e.style.borderRadius="var(--ubits-border-radius-md)",e.style.padding="var(--ubits-spacing-md)",e.style.color="var(--ubits-fg-1-high)",e.style.fontFamily='var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',e.style.fontSize="var(--font-body-md-size, 14px)",e.style.lineHeight="var(--font-body-md-line, 20px)",e.style.border="1px solid var(--ubits-border-1)";const o=document.createElement("p");return o.style.margin="0",o.style.color="var(--ubits-fg-1-medium)",o.textContent=r.content||"Contenido del contenedor",e.appendChild(o),t.appendChild(e),n.appendChild(t),n}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Este es un contenedor básico con fondo bg-1, border-radius de 8px y padding interno de 12px.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-2)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--ubits-bg-1)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';

    // Crear el contenedor UBITS
    const ubitsContainer = document.createElement('div');
    ubitsContainer.className = 'ubits-container';

    // Aplicar variante de fondo según el control
    const bgVariant = args.backgroundVariant || 'bg1';
    const bgToken = \`var(--ubits-bg-\${bgVariant.replace('bg', '')})\`;
    ubitsContainer.style.background = bgToken;
    ubitsContainer.style.borderRadius = 'var(--ubits-border-radius-md)';
    ubitsContainer.style.padding = 'var(--ubits-spacing-md)';
    ubitsContainer.style.color = 'var(--ubits-fg-1-high)';
    ubitsContainer.style.fontFamily = 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)';
    ubitsContainer.style.fontSize = 'var(--font-body-md-size, 14px)';
    ubitsContainer.style.lineHeight = 'var(--font-body-md-line, 20px)';

    // Agregar borde si se solicita (solo para demostración visual)
    if (args.showBorder) {
      ubitsContainer.style.border = '1px solid var(--ubits-border-1)';
    }

    // Agregar contenido
    const contentText = document.createElement('p');
    contentText.style.margin = '0';
    contentText.style.color = 'var(--ubits-fg-1-medium)';
    contentText.textContent = args.content || 'Contenido del contenedor';
    ubitsContainer.appendChild(contentText);
    preview.appendChild(ubitsContainer);
    container.appendChild(preview);
    return container;
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Este contenedor puede incluir cualquier tipo de contenido: texto, imágenes, botones, formularios, etc.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-2)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '200px';
    preview.style.background = 'var(--ubits-bg-1)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    const ubitsContainer = document.createElement('div');
    ubitsContainer.className = 'ubits-container';

    // Aplicar variante de fondo según el control
    const bgVariant = args.backgroundVariant || 'bg1';
    const bgToken = \`var(--ubits-bg-\${bgVariant.replace('bg', '')})\`;
    ubitsContainer.style.background = bgToken;
    ubitsContainer.style.borderRadius = 'var(--ubits-border-radius-md)';
    ubitsContainer.style.padding = 'var(--ubits-spacing-md)';
    ubitsContainer.style.color = 'var(--ubits-fg-1-high)';
    ubitsContainer.style.fontFamily = 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)';
    ubitsContainer.style.maxWidth = '600px';
    ubitsContainer.style.width = '100%';
    if (args.showBorder) {
      ubitsContainer.style.border = '1px solid var(--ubits-border-1)';
    }

    // Contenido más rico
    const title = document.createElement('h3');
    title.style.margin = '0 0 12px 0';
    title.style.color = 'var(--ubits-fg-1-high)';
    title.style.fontSize = 'var(--font-heading-h3-size, 18px)';
    title.style.fontWeight = 'var(--weight-semibold, 600)';
    title.style.fontFamily = 'var(--font-sans)';
    title.textContent = 'Título del contenedor';
    const paragraph = document.createElement('p');
    paragraph.style.margin = '0 0 16px 0';
    paragraph.style.color = 'var(--ubits-fg-1-medium)';
    paragraph.style.fontSize = 'var(--font-body-md-size, 14px)';
    paragraph.style.lineHeight = 'var(--font-body-md-line, 20px)';
    paragraph.textContent = args.content || 'Contenido del contenedor';
    const button = document.createElement('button');
    button.style.padding = '8px 16px';
    button.style.background = 'var(--ubits-accent-brand-static-inverted)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    button.style.cursor = 'pointer';
    button.style.fontSize = 'var(--font-body-sm-size, 13px)';
    button.style.fontFamily = 'var(--font-sans)';
    button.textContent = 'Botón de ejemplo';
    ubitsContainer.appendChild(title);
    ubitsContainer.appendChild(paragraph);
    ubitsContainer.appendChild(button);
    preview.appendChild(ubitsContainer);
    container.appendChild(preview);
    return container;
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Este ejemplo muestra el contenedor con un borde visual para mejor contraste (opcional).',
    showBorder: true,
    backgroundVariant: 'bg1'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-2)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--ubits-bg-1)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    const ubitsContainer = document.createElement('div');
    ubitsContainer.className = 'ubits-container';

    // Aplicar variante de fondo según el control
    const bgVariant = args.backgroundVariant || 'bg1';
    const bgToken = \`var(--ubits-bg-\${bgVariant.replace('bg', '')})\`;
    ubitsContainer.style.background = bgToken;
    ubitsContainer.style.borderRadius = 'var(--ubits-border-radius-md)';
    ubitsContainer.style.padding = 'var(--ubits-spacing-md)';
    ubitsContainer.style.color = 'var(--ubits-fg-1-high)';
    ubitsContainer.style.fontFamily = 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)';
    ubitsContainer.style.fontSize = 'var(--font-body-md-size, 14px)';
    ubitsContainer.style.lineHeight = 'var(--font-body-md-line, 20px)';
    ubitsContainer.style.border = '1px solid var(--ubits-border-1)';
    const contentText = document.createElement('p');
    contentText.style.margin = '0';
    contentText.style.color = 'var(--ubits-fg-1-medium)';
    contentText.textContent = args.content || 'Contenido del contenedor';
    ubitsContainer.appendChild(contentText);
    preview.appendChild(ubitsContainer);
    container.appendChild(preview);
    return container;
  }
}`,...c.parameters?.docs?.source}}};const u=["Default","WithContent","WithBorder"];export{d as Default,c as WithBorder,l as WithContent,u as __namedExportsOrder,p as default};
