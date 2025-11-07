const u=["--ubits-feedback-bg-error-subtle","--ubits-feedback-fg-error-subtle","--ubits-feedback-accent-error","--ubits-feedback-accent-error-inverted","--ubits-feedback-fg-error-subtle-alt","--ubits-feedback-fg-error-subtle-inverted","--ubits-feedback-fg-error-subtle-hover","--ubits-feedback-fg-error-subtle-inverted-hover","--ubits-feedback-fg-error-subtle-static","--ubits-feedback-fg-error-subtle-static-inverted","--ubits-feedback-fg-error-subtle-static-hover","--ubits-feedback-fg-error-subtle-static-inverted-hover","--ubits-feedback-accent-error-static","--ubits-feedback-accent-error-static-inverted"],b={title:"Tokens/Colors/Feedback · Error",tags:["autodocs"]};function p(r,n){const o=document.documentElement;document.body.setAttribute("data-theme",n);const t=getComputedStyle(o).getPropertyValue(r).trim(),a=t,e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="640px 1fr",e.style.alignItems="center",e.style.gap="8px",e.style.padding="6px 8px",e.style.border="1px solid #e5e7eb",e.style.borderRadius="8px";const i=document.createElement("code");i.textContent=r;const d=document.createElement("div");d.style.height="28px",d.style.width="120px",d.style.borderRadius="6px",d.style.border="1px solid #9ca3af",d.style.background=a;const c=document.createElement("code");c.textContent=t;const l=document.createElement("div");return l.style.display="flex",l.style.gap="8px",l.style.alignItems="center",l.appendChild(d),l.appendChild(c),e.appendChild(i),e.appendChild(l),e}const s={render:()=>{const r=document.createElement("div");r.style.display="grid",r.style.gridTemplateColumns="1fr 1fr",r.style.gap="16px";const n=document.createElement("div");n.style.background="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="10px",n.style.padding="12px";const o=document.createElement("h4");o.textContent="Light",n.appendChild(o);const t=document.createElement("div");t.style.background="#0E1825",t.style.color="#edeeef",t.style.border="1px solid #0E1825",t.style.borderRadius="10px",t.style.padding="12px";const a=document.createElement("h4");return a.textContent="Dark",t.appendChild(a),u.forEach(e=>{n.appendChild(p(e,"light")),t.appendChild(p(e,"dark"))}),r.appendChild(n),r.appendChild(t),document.body.setAttribute("data-theme","light"),r}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    ERROR_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...s.parameters?.docs?.source}}};const g=["LightAndDark"];export{s as LightAndDark,g as __namedExportsOrder,b as default};
