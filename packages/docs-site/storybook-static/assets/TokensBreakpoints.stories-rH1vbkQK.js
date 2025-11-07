const p=[{name:"Mobile",value:"< 480px",description:"Pantallas pequeñas. TabBar visible, Sidebar oculta. Padding reducido (12px)."},{name:"Tablet",value:"480px - 767px",description:"Pantallas medianas. TabBar visible, Sidebar oculta. Layout adaptativo."},{name:"Desktop",value:"768px - 1023px",description:"Pantallas grandes. TabBar visible, Sidebar oculta. Transición hacia Wide."},{name:"Wide",value:"≥ 1024px",description:"Pantallas extra grandes. Sidebar visible, TabBar oculta. Contenido centrado con max-width: 1607px (≥ 1440px)."}],x={title:"Tokens/Grid y Breakpoints/Breakpoints",tags:["autodocs"]};function c(t){const e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="300px 1fr",e.style.alignItems="center",e.style.gap="16px",e.style.padding="12px 16px",e.style.border="1px solid var(--ubits-border-1, #e5e7eb)",e.style.borderRadius="8px",e.style.background="var(--ubits-bg-1, #ffffff)";const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.gap="12px";const a=document.createElement("div"),l=t.name==="Mobile"?4:t.name==="Tablet"?8:t.name==="Desktop"?12:16;a.style.width=`${l}px`,a.style.height="32px",a.style.background="var(--ubits-accent-brand-static-inverted, #2563eb)",a.style.borderRadius="2px",a.style.flexShrink="0";const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.gap="4px";const d=document.createElement("strong");d.textContent=t.name,d.style.fontSize="14px",d.style.color="var(--ubits-fg-1-high, #1a1a1a)",d.style.fontWeight="600";const i=document.createElement("code");i.textContent=t.value,i.style.fontSize="12px",i.style.color="var(--ubits-fg-1-medium, #6b7280)",i.style.background="var(--ubits-bg-2, #f9fafb)",i.style.padding="2px 6px",i.style.borderRadius="4px",o.appendChild(d),o.appendChild(i),n.appendChild(a),n.appendChild(o);const r=document.createElement("p");return r.textContent=t.description,r.style.fontSize="13px",r.style.color="var(--ubits-fg-1-medium, #6b7280)",r.style.margin="0",r.style.lineHeight="1.5",e.appendChild(n),e.appendChild(r),e}const s={render:()=>{const t=document.createElement("div");t.style.display="grid",t.style.gap="12px",t.style.padding="16px",t.style.maxWidth="900px";const e=document.createElement("div");e.style.background="var(--ubits-bg-2, #f9fafb)",e.style.padding="16px",e.style.borderRadius="8px",e.style.border="1px solid var(--ubits-border-1, #e5e7eb)",e.style.marginBottom="12px";const n=document.createElement("h5");n.textContent="🔑 Punto crítico",n.style.fontSize="14px",n.style.color="var(--ubits-fg-1-high, #1a1a1a)",n.style.fontWeight="600",n.style.margin="0 0 8px 0";const a=document.createElement("p");return a.innerHTML='El breakpoint de <strong>1024px</strong> es crítico: define el cambio entre Sidebar y TabBar. En <code style="background: var(--ubits-bg-1); padding: 2px 6px; border-radius: 4px; font-size: 11px;">max-width: 1023px</code> se muestra TabBar, en <code style="background: var(--ubits-bg-1); padding: 2px 6px; border-radius: 4px; font-size: 11px;">min-width: 1024px</code> se muestra Sidebar.',a.style.fontSize="13px",a.style.color="var(--ubits-fg-1-medium, #6b7280)",a.style.margin="0",a.style.lineHeight="1.5",e.appendChild(n),e.appendChild(a),t.appendChild(e),p.forEach(l=>{t.appendChild(c(l))}),t}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';

    // Add critical point note
    const noteCard = document.createElement('div');
    noteCard.style.background = 'var(--ubits-bg-2, #f9fafb)';
    noteCard.style.padding = '16px';
    noteCard.style.borderRadius = '8px';
    noteCard.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    noteCard.style.marginBottom = '12px';
    const noteTitle = document.createElement('h5');
    noteTitle.textContent = '🔑 Punto crítico';
    noteTitle.style.fontSize = '14px';
    noteTitle.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    noteTitle.style.fontWeight = '600';
    noteTitle.style.margin = '0 0 8px 0';
    const noteText = document.createElement('p');
    noteText.innerHTML = 'El breakpoint de <strong>1024px</strong> es crítico: define el cambio entre Sidebar y TabBar. En <code style="background: var(--ubits-bg-1); padding: 2px 6px; border-radius: 4px; font-size: 11px;">max-width: 1023px</code> se muestra TabBar, en <code style="background: var(--ubits-bg-1); padding: 2px 6px; border-radius: 4px; font-size: 11px;">min-width: 1024px</code> se muestra Sidebar.';
    noteText.style.fontSize = '13px';
    noteText.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    noteText.style.margin = '0';
    noteText.style.lineHeight = '1.5';
    noteCard.appendChild(noteTitle);
    noteCard.appendChild(noteText);
    container.appendChild(noteCard);
    BREAKPOINTS.forEach(bp => {
      container.appendChild(breakpointItem(bp));
    });
    return container;
  }
}`,...s.parameters?.docs?.source}}};const b=["Tokens"];export{s as Tokens,b as __namedExportsOrder,x as default};
