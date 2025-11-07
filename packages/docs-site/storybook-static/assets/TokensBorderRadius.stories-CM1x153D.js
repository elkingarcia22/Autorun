const l=["--ubits-border-radius-none","--ubits-border-radius-xs","--ubits-border-radius-sm","--ubits-border-radius-md","--ubits-border-radius-lg","--ubits-border-radius-xl","--ubits-border-radius-full"],u={title:"Tokens/Border Radius",tags:["autodocs"]};function c(t){const o=document.documentElement,i=getComputedStyle(o).getPropertyValue(t).trim()||"0",e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="300px 1fr",e.style.alignItems="center",e.style.gap="16px",e.style.padding="12px 16px",e.style.border="1px solid var(--ubits-border-1, #e5e7eb)",e.style.borderRadius="8px",e.style.background="var(--ubits-bg-1, #ffffff)";const s=document.createElement("code");s.textContent=t,s.style.fontSize="13px",s.style.color="var(--ubits-fg-1-high, #1a1a1a)";const r=document.createElement("div");r.style.display="flex",r.style.alignItems="center",r.style.gap="12px";const n=document.createElement("div");n.style.width="48px",n.style.height="48px",n.style.borderRadius=i,n.style.background="var(--ubits-accent-brand-static-inverted, #2563eb)",n.style.flexShrink="0";const d=document.createElement("code");return d.textContent=i,d.style.fontSize="13px",d.style.color="var(--ubits-fg-1-medium, #6b7280)",r.appendChild(n),r.appendChild(d),e.appendChild(s),e.appendChild(r),e}const a={render:()=>{const t=document.createElement("div");return t.style.display="grid",t.style.gap="12px",t.style.padding="16px",t.style.maxWidth="900px",l.forEach(o=>{t.appendChild(c(o))}),t}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';
    BORDER_RADIUS_TOKENS.forEach(t => {
      container.appendChild(borderRadiusItem(t));
    });
    return container;
  }
}`,...a.parameters?.docs?.source}}};const p=["Tokens"];export{a as Tokens,p as __namedExportsOrder,u as default};
