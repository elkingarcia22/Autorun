const u={title:"Tokens UBITS/08. Border Radius",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Tokens de border-radius del sistema UBITS. Incluye valores desde none hasta full (circulo completo)."}}}},c=["--ubits-border-radius-none","--ubits-border-radius-xs","--ubits-border-radius-sm","--ubits-border-radius-md","--ubits-border-radius-lg","--ubits-border-radius-xl","--ubits-border-radius-full"];function p(e){const r=document.documentElement,i=getComputedStyle(r).getPropertyValue(e).trim(),o=document.createElement("div");o.style.display="grid",o.style.gridTemplateColumns="300px 1fr",o.style.alignItems="center",o.style.gap="16px",o.style.padding="12px 16px",o.style.border="1px solid var(--modifiers-normal-color-light-border-1)",o.style.borderRadius="var(--ubits-border-radius-md, 8px)",o.style.background="var(--modifiers-normal-color-light-bg-1)",o.style.fontFamily="var(--modifiers-normal-body-md-regular-fontfamily)",o.style.color="var(--modifiers-normal-color-light-fg-1-high)";const n=document.createElement("code");n.textContent=e,n.style.fontSize="13px",n.style.color="var(--modifiers-normal-color-light-fg-1-high)";const l=document.createElement("div");l.style.display="flex",l.style.alignItems="center",l.style.gap="12px";const t=document.createElement("div");t.style.width="80px",t.style.height="80px",t.style.borderRadius=i||"0",t.style.background="var(--modifiers-normal-color-light-accent-brand)",t.style.border="2px solid var(--modifiers-normal-color-light-border-1)",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.flexShrink="0";const s=document.createElement("span");return s.textContent=i||"0",s.style.fontSize="14px",s.style.fontWeight="var(--weight-semibold, 600)",l.appendChild(t),l.appendChild(s),o.appendChild(n),o.appendChild(l),o}const d={render:()=>{const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.gap="16px",e.style.padding="20px",e.style.background="var(--modifiers-normal-color-light-bg-2)",e.style.borderRadius="var(--ubits-border-radius-md, 8px)",e.style.border="1px solid var(--modifiers-normal-color-light-border-1)";const r=document.createElement("h3");return r.textContent="Border Radius - Todos los Tokens",r.style.color="var(--modifiers-normal-color-light-fg-1-high)",r.style.fontFamily="var(--modifiers-normal-heading-h3-fontfamily)",r.style.fontSize="var(--modifiers-normal-heading-h3-fontsize)",r.style.marginBottom="16px",e.appendChild(r),c.forEach(i=>{e.appendChild(p(i))}),e}},m={render:()=>{const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.gap="24px",e.style.padding="20px",e.style.background="var(--modifiers-normal-color-light-bg-2)",e.style.borderRadius="var(--ubits-border-radius-md, 8px)",e.style.border="1px solid var(--modifiers-normal-color-light-border-1)";const r=document.createElement("h3");return r.textContent="Ejemplos de Uso",r.style.color="var(--modifiers-normal-color-light-fg-1-high)",r.style.fontFamily="var(--modifiers-normal-heading-h3-fontfamily)",r.style.fontSize="var(--modifiers-normal-heading-h3-fontsize)",r.style.marginBottom="16px",e.appendChild(r),[{token:"--ubits-border-radius-none",label:"Sin borde redondeado",use:"Elementos con esquinas rectas"},{token:"--ubits-border-radius-xs",label:"Extra pequeño (4px)",use:"Elementos pequeños, badges"},{token:"--ubits-border-radius-sm",label:"Pequeño (8px)",use:"Botones pequeños, inputs"},{token:"--ubits-border-radius-md",label:"Mediano (12px)",use:"Cards, contenedores, botones estándar"},{token:"--ubits-border-radius-lg",label:"Grande (16px)",use:"Modales, paneles grandes"},{token:"--ubits-border-radius-xl",label:"Extra grande (20px)",use:"Elementos destacados, hero sections"},{token:"--ubits-border-radius-full",label:"Completo (1000px)",use:"Circulos perfectos, avatares, pills"}].forEach(o=>{const n=document.createElement("div");n.style.padding="16px",n.style.background="var(--modifiers-normal-color-light-bg-1)",n.style.borderRadius="var(--ubits-border-radius-md, 8px)",n.style.border="1px solid var(--modifiers-normal-color-light-border-1)";const l=document.createElement("code");l.textContent=o.token,l.style.display="block",l.style.marginBottom="8px",l.style.fontSize="13px",l.style.color="var(--modifiers-normal-color-light-fg-1-high)";const t=document.createElement("strong");t.textContent=o.label,t.style.display="block",t.style.marginBottom="4px",t.style.fontSize="14px",t.style.color="var(--modifiers-normal-color-light-fg-1-high)";const s=document.createElement("span");s.textContent=o.use,s.style.display="block",s.style.fontSize="13px",s.style.color="var(--modifiers-normal-color-light-fg-1-medium)";const a=document.createElement("div");a.style.width="100px",a.style.height="100px",a.style.background="var(--modifiers-normal-color-light-accent-brand)",a.style.borderRadius=`var(${o.token})`,a.style.marginTop="12px",a.style.border="2px solid var(--modifiers-normal-color-light-border-1)",n.appendChild(l),n.appendChild(t),n.appendChild(s),n.appendChild(a),e.appendChild(n)}),e}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    const title = document.createElement('h3');
    title.textContent = 'Border Radius - Todos los Tokens';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    title.style.fontFamily = 'var(--modifiers-normal-heading-h3-fontfamily)';
    title.style.fontSize = 'var(--modifiers-normal-heading-h3-fontsize)';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    BORDER_RADIUS_TOKENS.forEach(token => {
      container.appendChild(borderRadiusItem(token));
    });
    return container;
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '24px';
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    const title = document.createElement('h3');
    title.textContent = 'Ejemplos de Uso';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    title.style.fontFamily = 'var(--modifiers-normal-heading-h3-fontfamily)';
    title.style.fontSize = 'var(--modifiers-normal-heading-h3-fontsize)';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const examples = [{
      token: '--ubits-border-radius-none',
      label: 'Sin borde redondeado',
      use: 'Elementos con esquinas rectas'
    }, {
      token: '--ubits-border-radius-xs',
      label: 'Extra pequeño (4px)',
      use: 'Elementos pequeños, badges'
    }, {
      token: '--ubits-border-radius-sm',
      label: 'Pequeño (8px)',
      use: 'Botones pequeños, inputs'
    }, {
      token: '--ubits-border-radius-md',
      label: 'Mediano (12px)',
      use: 'Cards, contenedores, botones estándar'
    }, {
      token: '--ubits-border-radius-lg',
      label: 'Grande (16px)',
      use: 'Modales, paneles grandes'
    }, {
      token: '--ubits-border-radius-xl',
      label: 'Extra grande (20px)',
      use: 'Elementos destacados, hero sections'
    }, {
      token: '--ubits-border-radius-full',
      label: 'Completo (1000px)',
      use: 'Circulos perfectos, avatares, pills'
    }];
    examples.forEach(example => {
      const exampleBox = document.createElement('div');
      exampleBox.style.padding = '16px';
      exampleBox.style.background = 'var(--modifiers-normal-color-light-bg-1)';
      exampleBox.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
      exampleBox.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
      const tokenName = document.createElement('code');
      tokenName.textContent = example.token;
      tokenName.style.display = 'block';
      tokenName.style.marginBottom = '8px';
      tokenName.style.fontSize = '13px';
      tokenName.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
      const label = document.createElement('strong');
      label.textContent = example.label;
      label.style.display = 'block';
      label.style.marginBottom = '4px';
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
      const use = document.createElement('span');
      use.textContent = example.use;
      use.style.display = 'block';
      use.style.fontSize = '13px';
      use.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      const preview = document.createElement('div');
      preview.style.width = '100px';
      preview.style.height = '100px';
      preview.style.background = 'var(--modifiers-normal-color-light-accent-brand)';
      preview.style.borderRadius = \`var(\${example.token})\`;
      preview.style.marginTop = '12px';
      preview.style.border = '2px solid var(--modifiers-normal-color-light-border-1)';
      exampleBox.appendChild(tokenName);
      exampleBox.appendChild(label);
      exampleBox.appendChild(use);
      exampleBox.appendChild(preview);
      container.appendChild(exampleBox);
    });
    return container;
  }
}`,...m.parameters?.docs?.source}}};const b=["TodosLosBorderRadius","EjemplosDeUso"];export{m as EjemplosDeUso,d as TodosLosBorderRadius,b as __namedExportsOrder,u as default};
