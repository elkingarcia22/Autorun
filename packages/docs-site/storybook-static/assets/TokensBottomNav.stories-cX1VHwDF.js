const m=["--ubits-bottom-nav-shadow-opacity"],h={title:"Tokens/Colors/Bottom Nav Colors",tags:["autodocs"]};function p(n,d){const r=document.documentElement;document.body.setAttribute("data-theme",d);const t=getComputedStyle(r).getPropertyValue(n).trim(),a=t,e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="360px 1fr",e.style.alignItems="center",e.style.gap="8px",e.style.padding="6px 8px",e.style.border="1px solid #e5e7eb",e.style.borderRadius="8px";const i=document.createElement("code");i.textContent=n;const l=document.createElement("div");l.style.height="28px",l.style.width="120px",l.style.borderRadius="6px",l.style.border="1px solid #9ca3af",l.style.background=a;const c=document.createElement("code");c.textContent=t;const o=document.createElement("div");return o.style.display="flex",o.style.gap="8px",o.style.alignItems="center",o.appendChild(l),o.appendChild(c),e.appendChild(i),e.appendChild(o),e}const s={render:()=>{const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="1fr 1fr",n.style.gap="16px";const d=document.createElement("div");d.style.background="#ffffff",d.style.border="1px solid #e5e7eb",d.style.borderRadius="10px",d.style.padding="12px";const r=document.createElement("h4");r.textContent="Light",d.appendChild(r);const t=document.createElement("div");t.style.background="#0E1825",t.style.color="#edeeef",t.style.border="1px solid #0E1825",t.style.borderRadius="10px",t.style.padding="12px";const a=document.createElement("h4");return a.textContent="Dark",t.appendChild(a),m.forEach(e=>{d.appendChild(p(e,"light")),t.appendChild(p(e,"dark"))}),n.appendChild(d),n.appendChild(t),document.body.setAttribute("data-theme","light"),n}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    BOTTOM_NAV_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...s.parameters?.docs?.source}}};const g=["LightAndDark"];export{s as LightAndDark,g as __namedExportsOrder,h as default};
