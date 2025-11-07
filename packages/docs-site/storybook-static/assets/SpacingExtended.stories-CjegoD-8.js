const p=["--ubits-spacing-3xl","--ubits-spacing-4xl","--ubits-spacing-5xl","--ubits-spacing-6xl"],x={title:"Tokens/Spacing/Extended",tags:["autodocs"]};function m(t){const d=document.documentElement,c=getComputedStyle(d).getPropertyValue(t).trim()||"0",i=parseInt(c)||0,e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="300px 1fr",e.style.alignItems="center",e.style.gap="16px",e.style.padding="12px 16px",e.style.border="1px solid var(--ubits-border-1, #e5e7eb)",e.style.borderRadius="8px",e.style.background="var(--ubits-bg-1, #ffffff)";const s=document.createElement("code");s.textContent=t,s.style.fontSize="13px",s.style.color="var(--ubits-fg-1-high, #1a1a1a)";const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="12px";const a=document.createElement("div"),l=Math.min(1,200/Math.max(i,1));a.style.width=`${i*l}px`,a.style.height="24px",a.style.minWidth=i===0?"0px":"4px",a.style.background="var(--ubits-accent-brand, #2563eb)",a.style.borderRadius="4px";const r=document.createElement("code");return r.textContent=c,r.style.fontSize="13px",r.style.color="var(--ubits-fg-1-medium, #6b7280)",n.appendChild(a),n.appendChild(r),e.appendChild(s),e.appendChild(n),e}const o={render:()=>{const t=document.createElement("div");return t.style.display="grid",t.style.gap="12px",t.style.padding="16px",t.style.maxWidth="900px",p.forEach(d=>{t.appendChild(m(d))}),t}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';
    SPACING_EXTENDED_TOKENS.forEach(t => {
      container.appendChild(spacingItem(t));
    });
    return container;
  }
}`,...o.parameters?.docs?.source}}};const y=["Tokens"];export{o as Tokens,y as __namedExportsOrder,x as default};
