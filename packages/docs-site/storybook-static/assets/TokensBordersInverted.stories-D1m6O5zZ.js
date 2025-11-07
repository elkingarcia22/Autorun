const p=["--ubits-border-1-inverted","--ubits-border-2-inverted","--ubits-border-disabled-inverted","--ubits-border-blue-inverted","--ubits-border-gray-inverted","--ubits-border-green-inverted","--ubits-border-teal-inverted","--ubits-border-indigo-inverted","--ubits-border-purple-inverted","--ubits-border-pink-inverted","--ubits-border-yellow-inverted","--ubits-border-rose-inverted"],u={title:"Tokens/Colors/Border Colors - Inverted",tags:["autodocs"]};function c(d,n){const i=document.documentElement;document.body.setAttribute("data-theme",n);const t=getComputedStyle(i).getPropertyValue(d).trim(),e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="430px 1fr",e.style.alignItems="center",e.style.gap="8px",e.style.padding="6px 8px",e.style.border="1px solid #e5e7eb",e.style.borderRadius="8px";const l=document.createElement("code");l.textContent=d;const o=document.createElement("div");o.style.height="28px",o.style.width="120px",o.style.borderRadius="6px",o.style.border=`2px solid ${t||"#9ca3af"}`;const s=document.createElement("code");s.textContent=t;const r=document.createElement("div");return r.style.display="flex",r.style.gap="8px",r.style.alignItems="center",r.appendChild(o),r.appendChild(s),e.appendChild(l),e.appendChild(r),e}const a={render:()=>{const d=document.createElement("div");d.style.display="grid",d.style.gridTemplateColumns="1fr 1fr",d.style.gap="16px";const n=document.createElement("div");n.style.background="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="10px",n.style.padding="12px";const i=document.createElement("h4");i.textContent="Light",n.appendChild(i);const t=document.createElement("div");t.style.background="#0E1825",t.style.color="#edeeef",t.style.border="1px solid #0E1825",t.style.borderRadius="10px",t.style.padding="12px";const e=document.createElement("h4");return e.textContent="Dark",t.appendChild(e),p.forEach(l=>{n.appendChild(c(l,"light")),t.appendChild(c(l,"dark"))}),d.appendChild(n),d.appendChild(t),document.body.setAttribute("data-theme","light"),d}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
    BORDER_INVERTED_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...a.parameters?.docs?.source}}};const m=["LightAndDark"];export{a as LightAndDark,m as __namedExportsOrder,u as default};
