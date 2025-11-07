const p=["--ubits-border-blue","--ubits-border-gray","--ubits-border-green","--ubits-border-teal","--ubits-border-indigo","--ubits-border-purple","--ubits-border-pink","--ubits-border-yellow","--ubits-border-rose"],u={title:"Tokens/Colors/Border Colors - Colored",tags:["autodocs"]};function c(n,d){const a=document.documentElement;document.body.setAttribute("data-theme",d);const t=getComputedStyle(a).getPropertyValue(n).trim(),e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="360px 1fr",e.style.alignItems="center",e.style.gap="8px",e.style.padding="6px 8px",e.style.border="1px solid #e5e7eb",e.style.borderRadius="8px";const r=document.createElement("code");r.textContent=n;const o=document.createElement("div");o.style.height="28px",o.style.width="120px",o.style.borderRadius="6px",o.style.border=`2px solid ${t||"#9ca3af"}`;const s=document.createElement("code");s.textContent=t;const l=document.createElement("div");return l.style.display="flex",l.style.gap="8px",l.style.alignItems="center",l.appendChild(o),l.appendChild(s),e.appendChild(r),e.appendChild(l),e}const i={render:()=>{const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="1fr 1fr",n.style.gap="16px";const d=document.createElement("div");d.style.background="#ffffff",d.style.border="1px solid #e5e7eb",d.style.borderRadius="10px",d.style.padding="12px";const a=document.createElement("h4");a.textContent="Light",d.appendChild(a);const t=document.createElement("div");t.style.background="#0E1825",t.style.color="#edeeef",t.style.border="1px solid #0E1825",t.style.borderRadius="10px",t.style.padding="12px";const e=document.createElement("h4");return e.textContent="Dark",t.appendChild(e),p.forEach(r=>{d.appendChild(c(r,"light")),t.appendChild(c(r,"dark"))}),n.appendChild(d),n.appendChild(t),document.body.setAttribute("data-theme","light"),n}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '1fr 1fr';
    container.style.gap = '16px';
    const lightCol = document.createElement('div');
    lightCol.style.background = '#ffffff';
    lightCol.style.border = '1px solid #e5e7eb';
    lightCol.style.borderRadius = '10px';
    lightCol.style.padding = '12px';
    const lightTitle = document.createElement('h4');
    lightTitle.textContent = 'Light';
    lightCol.appendChild(lightTitle);
    const darkCol = document.createElement('div');
    darkCol.style.background = '#0E1825';
    darkCol.style.color = '#edeeef';
    darkCol.style.border = '1px solid #0E1825';
    darkCol.style.borderRadius = '10px';
    darkCol.style.padding = '12px';
    const darkTitle = document.createElement('h4');
    darkTitle.textContent = 'Dark';
    darkCol.appendChild(darkTitle);
    BORDER_COLORED_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...i.parameters?.docs?.source}}};const m=["LightAndDark"];export{i as LightAndDark,m as __namedExportsOrder,u as default};
