const b=["--ubits-button-primary-bg-default","--ubits-button-primary-hover","--ubits-button-primary-pressed","--ubits-button-active-bg","--ubits-button-focus-ring","--ubits-button-badge","--ubits-btn-primary-fg","--ubits-bg-disabled-button","--ubits-border-disabled-button","--ubits-fg-on-disabled-button","--ubits-btn-secondary-bg-default","--ubits-btn-secondary-bg-hover","--ubits-btn-secondary-bg-pressed","--ubits-btn-secondary-fg-default","--ubits-btn-secondary-border","--ubits-btn-tertiary-fg","--ubits-btn-tertiary-bg-hover","--ubits-btn-tertiary-bg-pressed"],g={title:"Tokens/Colors/Button",tags:["autodocs"]};function u(n,d){const l=document.documentElement;document.body.setAttribute("data-theme",d);const t=getComputedStyle(l).getPropertyValue(n).trim(),a=/^(#fff(f)?|rgb\(255,\s*255,\s*255\))$/i.test(t)?"repeating-conic-gradient(#eee 0% 25%, var(--ubits-bg-1) 0% 50%) 50%/12px 12px":t,e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="320px 1fr",e.style.alignItems="center",e.style.gap="8px",e.style.padding="6px 8px",e.style.border="1px solid #e5e7eb",e.style.borderRadius="8px";const c=document.createElement("code");c.textContent=n;const r=document.createElement("div");r.style.height="28px",r.style.width="120px",r.style.borderRadius="6px",r.style.border="1px solid #9ca3af",r.style.background=a;const p=document.createElement("code");p.textContent=t;const o=document.createElement("div");return o.style.display="flex",o.style.gap="8px",o.style.alignItems="center",o.appendChild(r),o.appendChild(p),e.appendChild(c),e.appendChild(o),e}const s={render:()=>{const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="1fr 1fr",n.style.gap="16px";const d=document.createElement("div");d.style.background="#ffffff",d.style.border="1px solid #e5e7eb",d.style.borderRadius="10px",d.style.padding="12px";const l=document.createElement("h4");l.textContent="Light",d.appendChild(l);const t=document.createElement("div");t.style.background="#0E1825",t.style.color="#edeeef",t.style.border="1px solid #0E1825",t.style.borderRadius="10px",t.style.padding="12px";const i=document.createElement("h4");return i.textContent="Dark",t.appendChild(i),b.forEach(a=>{d.appendChild(u(a,"light")),t.appendChild(u(a,"dark"))}),n.appendChild(d),n.appendChild(t),document.body.setAttribute("data-theme","light"),n}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    BUTTON_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...s.parameters?.docs?.source}}};const m=["LightAndDark"];export{s as LightAndDark,m as __namedExportsOrder,g as default};
