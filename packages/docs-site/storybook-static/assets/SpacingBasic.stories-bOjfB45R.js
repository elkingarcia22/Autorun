const p=["--ubits-spacing-none","--ubits-spacing-xs","--ubits-spacing-sm","--ubits-spacing-md","--ubits-spacing-lg","--ubits-spacing-xl","--ubits-spacing-2xl"],g={title:"Tokens/Spacing/Basic",tags:["autodocs"]};function m(t){const c=document.documentElement,d=getComputedStyle(c).getPropertyValue(t).trim()||"0",o=parseInt(d)||0,e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="300px 1fr",e.style.alignItems="center",e.style.gap="16px",e.style.padding="12px 16px",e.style.border="1px solid var(--ubits-border-1, #e5e7eb)",e.style.borderRadius="8px",e.style.background="var(--ubits-bg-1, #ffffff)";const a=document.createElement("code");a.textContent=t,a.style.fontSize="13px",a.style.color="var(--ubits-fg-1-high, #1a1a1a)";const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="12px";const s=document.createElement("div"),l=Math.min(1,200/Math.max(o,1));s.style.width=`${o*l}px`,s.style.height="24px",s.style.minWidth=o===0?"0px":"4px",s.style.background="var(--ubits-accent-brand, #2563eb)",s.style.borderRadius="4px";const i=document.createElement("code");return i.textContent=d,i.style.fontSize="13px",i.style.color="var(--ubits-fg-1-medium, #6b7280)",n.appendChild(s),n.appendChild(i),e.appendChild(a),e.appendChild(n),e}const r={render:()=>{const t=document.createElement("div");return t.style.display="grid",t.style.gap="12px",t.style.padding="16px",t.style.maxWidth="900px",p.forEach(c=>{t.appendChild(m(c))}),t}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';
    SPACING_BASIC_TOKENS.forEach(t => {
      container.appendChild(spacingItem(t));
    });
    return container;
  }
}`,...r.parameters?.docs?.source}}};const x=["Tokens"];export{r as Tokens,x as __namedExportsOrder,g as default};
