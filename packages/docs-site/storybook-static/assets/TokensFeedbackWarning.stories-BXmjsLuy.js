const g=["--ubits-feedback-bg-warning-subtle","--ubits-feedback-fg-warning-subtle","--ubits-feedback-accent-warning","--ubits-feedback-accent-warning-inverted","--ubits-feedback-fg-warning-subtle-alt","--ubits-feedback-fg-warning-subtle-inverted","--ubits-feedback-fg-warning-subtle-hover","--ubits-feedback-fg-warning-subtle-inverted-hover","--ubits-feedback-fg-warning-bold","--ubits-feedback-fg-warning-bold-inverted","--ubits-feedback-fg-warning-bold-hover","--ubits-feedback-fg-warning-bold-inverted-hover","--ubits-feedback-fg-warning-subtle-static","--ubits-feedback-fg-warning-subtle-static-inverted","--ubits-feedback-fg-warning-subtle-static-hover","--ubits-feedback-fg-warning-subtle-static-inverted-hover"],b={title:"Tokens/Colors/Feedback · Warning",tags:["autodocs"]};function p(n,d){const r=document.documentElement;document.body.setAttribute("data-theme",d);const t=getComputedStyle(r).getPropertyValue(n).trim(),i=t,e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="660px 1fr",e.style.alignItems="center",e.style.gap="8px",e.style.padding="6px 8px",e.style.border="1px solid #e5e7eb",e.style.borderRadius="8px";const s=document.createElement("code");s.textContent=n;const a=document.createElement("div");a.style.height="28px",a.style.width="120px",a.style.borderRadius="6px",a.style.border="1px solid #9ca3af",a.style.background=i;const c=document.createElement("code");c.textContent=t;const l=document.createElement("div");return l.style.display="flex",l.style.gap="8px",l.style.alignItems="center",l.appendChild(a),l.appendChild(c),e.appendChild(s),e.appendChild(l),e}const o={render:()=>{const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="1fr 1fr",n.style.gap="16px";const d=document.createElement("div");d.style.background="#ffffff",d.style.border="1px solid #e5e7eb",d.style.borderRadius="10px",d.style.padding="12px";const r=document.createElement("h4");r.textContent="Light",d.appendChild(r);const t=document.createElement("div");t.style.background="#0E1825",t.style.color="#edeeef",t.style.border="1px solid #0E1825",t.style.borderRadius="10px",t.style.padding="12px";const i=document.createElement("h4");return i.textContent="Dark",t.appendChild(i),g.forEach(e=>{d.appendChild(p(e,"light")),t.appendChild(p(e,"dark"))}),n.appendChild(d),n.appendChild(t),document.body.setAttribute("data-theme","light"),n}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
    WARNING_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...o.parameters?.docs?.source}}};const u=["LightAndDark"];export{o as LightAndDark,u as __namedExportsOrder,b as default};
