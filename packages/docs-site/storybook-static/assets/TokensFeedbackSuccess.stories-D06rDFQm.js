const p=["--ubits-feedback-bg-success-subtle","--ubits-feedback-fg-success-subtle","--ubits-feedback-accent-success","--ubits-feedback-accent-success-inverted","--ubits-feedback-accent-success-static","--ubits-feedback-accent-success-static-inverted","--ubits-feedback-fg-success-subtle-alt","--ubits-feedback-fg-success-subtle-inverted","--ubits-feedback-fg-success-subtle-hover","--ubits-feedback-fg-success-subtle-inverted-hover","--ubits-feedback-fg-success-subtle-static","--ubits-feedback-fg-success-subtle-static-inverted","--ubits-feedback-fg-success-subtle-static-hover","--ubits-feedback-fg-success-subtle-static-inverted-hover"],b={title:"Tokens/Colors/Feedback · Success",tags:["autodocs"]};function u(s,n){const c=document.documentElement;document.body.setAttribute("data-theme",n);const t=getComputedStyle(c).getPropertyValue(s).trim(),a=t,e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="620px 1fr",e.style.alignItems="center",e.style.gap="8px",e.style.padding="6px 8px",e.style.border="1px solid #e5e7eb",e.style.borderRadius="8px";const r=document.createElement("code");r.textContent=s;const d=document.createElement("div");d.style.height="28px",d.style.width="120px",d.style.borderRadius="6px",d.style.border="1px solid #9ca3af",d.style.background=a;const i=document.createElement("code");i.textContent=t;const l=document.createElement("div");return l.style.display="flex",l.style.gap="8px",l.style.alignItems="center",l.appendChild(d),l.appendChild(i),e.appendChild(r),e.appendChild(l),e}const o={render:()=>{const s=document.createElement("div");s.style.display="grid",s.style.gridTemplateColumns="1fr 1fr",s.style.gap="16px";const n=document.createElement("div");n.style.background="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="10px",n.style.padding="12px";const c=document.createElement("h4");c.textContent="Light",n.appendChild(c);const t=document.createElement("div");t.style.background="#0E1825",t.style.color="#edeeef",t.style.border="1px solid #0E1825",t.style.borderRadius="10px",t.style.padding="12px";const a=document.createElement("h4");return a.textContent="Dark",t.appendChild(a),p.forEach(e=>{n.appendChild(u(e,"light")),t.appendChild(u(e,"dark"))}),s.appendChild(n),s.appendChild(t),document.body.setAttribute("data-theme","light"),s}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
    SUCCESS_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...o.parameters?.docs?.source}}};const g=["LightAndDark"];export{o as LightAndDark,g as __namedExportsOrder,b as default};
