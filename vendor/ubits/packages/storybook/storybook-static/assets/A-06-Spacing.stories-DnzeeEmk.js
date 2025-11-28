const b={title:"Tokens UBITS/06. Spacing",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Tokens de espaciado del sistema UBITS. Incluye valores básicos (xs, sm, md, lg, xl, 2xl) y valores extendidos (numéricos)."}}}},x=["--ubits-spacing-none","--ubits-spacing-xs","--ubits-spacing-sm","--ubits-spacing-md","--ubits-spacing-lg","--ubits-spacing-xl","--ubits-spacing-2xl"],h=["--p-spacing-mode-1-space-0","--p-spacing-mode-1-space-1","--p-spacing-mode-1-space-2","--p-spacing-mode-1-space-3","--p-spacing-mode-1-space-4","--p-spacing-mode-1-space-5","--p-spacing-mode-1-space-6","--p-spacing-mode-1-space-7","--p-spacing-mode-1-space-8","--p-spacing-mode-1-space-9","--p-spacing-mode-1-space-10","--p-spacing-mode-1-space-11","--p-spacing-mode-1-space-12","--p-spacing-mode-1-space-14","--p-spacing-mode-1-space-16","--p-spacing-mode-1-space-20","--p-spacing-mode-1-space-24","--p-spacing-mode-1-space-28","--p-spacing-mode-1-space-32","--p-spacing-mode-1-space-36","--p-spacing-mode-1-space-40","--p-spacing-mode-1-space-44","--p-spacing-mode-1-space-48","--p-spacing-mode-1-space-52","--p-spacing-mode-1-space-56","--p-spacing-mode-1-space-60","--p-spacing-mode-1-space-64","--p-spacing-mode-1-space-72","--p-spacing-mode-1-space-80","--p-spacing-mode-1-space-96"];function g(e){const t=document.documentElement,n=getComputedStyle(t).getPropertyValue(e).trim()||"0";let a,d;if(e.startsWith("--p-spacing-mode-1-")){const m=parseFloat(n)||0;a=m,d=m>0?`${m}px`:"0"}else a=parseFloat(n)||0,d=n;const o=document.createElement("div");o.style.display="grid",o.style.gridTemplateColumns="300px 1fr",o.style.alignItems="center",o.style.gap="16px",o.style.padding="12px 16px",o.style.border="1px solid var(--modifiers-normal-color-light-border-1)",o.style.borderRadius="var(--ubits-border-radius-sm, 8px)",o.style.background="var(--modifiers-normal-color-light-bg-1)";const c=document.createElement("code");c.textContent=e,c.style.fontSize="13px",c.style.color="var(--modifiers-normal-color-light-fg-1-high)",c.style.fontFamily="Monaco, Menlo, monospace";const i=document.createElement("div");i.style.display="flex",i.style.alignItems="center",i.style.gap="12px";const r=document.createElement("div"),u=Math.min(1,200/Math.max(a,1)),y=a>0?Math.max(a*u,2):0;r.style.width=`${y}px`,r.style.height="24px",r.style.background="var(--modifiers-normal-color-light-accent-brand)",r.style.borderRadius="var(--ubits-border-radius-sm, 8px)",r.style.minWidth=a>0?"2px":"0";const s=document.createElement("span");return s.textContent=d,s.style.fontSize="13px",s.style.color="var(--modifiers-normal-color-light-fg-1-medium)",s.style.fontFamily="Monaco, Menlo, monospace",s.style.minWidth="60px",s.style.textAlign="right",i.appendChild(r),i.appendChild(s),o.appendChild(c),o.appendChild(i),o}const l={render:()=>{const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.gap="16px",e.style.padding="24px",e.style.background="var(--modifiers-normal-color-light-bg-2)",e.style.borderRadius="var(--ubits-border-radius-md, 8px)";const t=document.createElement("h2");return t.textContent="Spacing Básico (UBITS)",t.style.margin="0 0 16px 0",t.style.fontSize="18px",t.style.fontWeight="600",t.style.color="var(--modifiers-normal-color-light-fg-1-high)",e.appendChild(t),x.forEach(n=>{e.appendChild(g(n))}),e}},p={render:()=>{const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.gap="16px",e.style.padding="24px",e.style.background="var(--modifiers-normal-color-light-bg-2)",e.style.borderRadius="var(--ubits-border-radius-md, 8px)";const t=document.createElement("h2");t.textContent="Spacing Extendido (Figma - p-spacing-mode-1)",t.style.margin="0 0 16px 0",t.style.fontSize="18px",t.style.fontWeight="600",t.style.color="var(--modifiers-normal-color-light-fg-1-high)";const n=document.createElement("p");return n.textContent='Nota: Los tokens de Figma son valores numéricos sin unidades. Se muestran con "px" para referencia visual.',n.style.margin="0 0 16px 0",n.style.fontSize="13px",n.style.color="var(--modifiers-normal-color-light-fg-1-medium)",n.style.fontStyle="italic",e.appendChild(t),e.appendChild(n),h.forEach(a=>{e.appendChild(g(a))}),e}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.style.padding = '24px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    const title = document.createElement('h2');
    title.textContent = 'Spacing Básico (UBITS)';
    title.style.margin = '0 0 16px 0';
    title.style.fontSize = '18px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    container.appendChild(title);
    SPACING_BASIC_TOKENS.forEach(token => {
      container.appendChild(createSpacingItem(token));
    });
    return container;
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.style.padding = '24px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    const title = document.createElement('h2');
    title.textContent = 'Spacing Extendido (Figma - p-spacing-mode-1)';
    title.style.margin = '0 0 16px 0';
    title.style.fontSize = '18px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    const note = document.createElement('p');
    note.textContent = 'Nota: Los tokens de Figma son valores numéricos sin unidades. Se muestran con "px" para referencia visual.';
    note.style.margin = '0 0 16px 0';
    note.style.fontSize = '13px';
    note.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    note.style.fontStyle = 'italic';
    container.appendChild(title);
    container.appendChild(note);
    SPACING_EXTENDED_TOKENS.forEach(token => {
      container.appendChild(createSpacingItem(token));
    });
    return container;
  }
}`,...p.parameters?.docs?.source}}};const E=["Basic","Extended"];export{l as Basic,p as Extended,E as __namedExportsOrder,b as default};
