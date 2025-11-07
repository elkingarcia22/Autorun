const l=["--ubits-spacing-7","--ubits-spacing-8","--ubits-spacing-10","--ubits-spacing-12","--ubits-spacing-16","--ubits-spacing-20","--ubits-spacing-24","--ubits-spacing-32","--ubits-spacing-40","--ubits-spacing-48","--ubits-spacing-64","--ubits-spacing-80","--ubits-spacing-96"],m={title:"Tokens/Spacing/Large",tags:["autodocs"]};function u(t){const r=document.documentElement,p=getComputedStyle(r).getPropertyValue(t).trim()||"0",o=parseInt(p)||0,e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="300px 1fr",e.style.alignItems="center",e.style.gap="16px",e.style.padding="12px 16px",e.style.border="1px solid var(--ubits-border-1, #e5e7eb)",e.style.borderRadius="8px",e.style.background="var(--ubits-bg-1, #ffffff)";const a=document.createElement("code");a.textContent=t,a.style.fontSize="13px",a.style.color="var(--ubits-fg-1-high, #1a1a1a)";const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="12px";const s=document.createElement("div"),d=Math.min(1,200/Math.max(o,1));s.style.width=`${o*d}px`,s.style.height="24px",s.style.minWidth=o===0?"0px":"4px",s.style.background="var(--ubits-accent-brand-static-inverted, #2563eb)",s.style.borderRadius="4px";const i=document.createElement("code");return i.textContent=p,i.style.fontSize="13px",i.style.color="var(--ubits-fg-1-medium, #6b7280)",n.appendChild(s),n.appendChild(i),e.appendChild(a),e.appendChild(n),e}const c={render:()=>{const t=document.createElement("div");return t.style.display="grid",t.style.gap="12px",t.style.padding="16px",t.style.maxWidth="900px",l.forEach(r=>{t.appendChild(u(r))}),t}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';
    SPACING_LARGE_TOKENS.forEach(t => {
      container.appendChild(spacingItem(t));
    });
    return container;
  }
}`,...c.parameters?.docs?.source}}};const y=["Tokens"];export{c as Tokens,y as __namedExportsOrder,m as default};
