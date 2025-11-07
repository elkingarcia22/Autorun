const p=["--ubits-feedback-border-success","--ubits-feedback-border-info","--ubits-feedback-border-warning","--ubits-feedback-border-error","--ubits-feedback-border-success-inverted","--ubits-feedback-border-info-inverted","--ubits-feedback-border-warning-inverted","--ubits-feedback-border-error-inverted","--ubits-feedback-border-success-static","--ubits-feedback-border-info-static","--ubits-feedback-border-warning-static","--ubits-feedback-border-error-static","--ubits-feedback-border-success-static-inverted","--ubits-feedback-border-info-static-inverted","--ubits-feedback-border-warning-static-inverted","--ubits-feedback-border-error-static-inverted"],b={title:"Tokens/Colors/Feedback · Borders",tags:["autodocs"]};function c(d,r){const l=document.documentElement;document.body.setAttribute("data-theme",r);const t=getComputedStyle(l).getPropertyValue(d).trim(),e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="640px 1fr",e.style.alignItems="center",e.style.gap="8px",e.style.padding="6px 8px",e.style.border="1px solid #e5e7eb",e.style.borderRadius="8px";const o=document.createElement("code");o.textContent=d;const a=document.createElement("div");a.style.height="28px",a.style.width="120px",a.style.borderRadius="6px",a.style.border=`2px solid ${t||"#9ca3af"}`;const s=document.createElement("code");s.textContent=t;const n=document.createElement("div");return n.style.display="flex",n.style.gap="8px",n.style.alignItems="center",n.appendChild(a),n.appendChild(s),e.appendChild(o),e.appendChild(n),e}const i={render:()=>{const d=document.createElement("div");d.style.display="grid",d.style.gridTemplateColumns="1fr 1fr",d.style.gap="16px";const r=document.createElement("div");r.style.background="#ffffff",r.style.border="1px solid #e5e7eb",r.style.borderRadius="10px",r.style.padding="12px";const l=document.createElement("h4");l.textContent="Light",r.appendChild(l);const t=document.createElement("div");t.style.background="#0E1825",t.style.color="#edeeef",t.style.border="1px solid #0E1825",t.style.borderRadius="10px",t.style.padding="12px";const e=document.createElement("h4");return e.textContent="Dark",t.appendChild(e),p.forEach(o=>{r.appendChild(c(o,"light")),t.appendChild(c(o,"dark"))}),d.appendChild(r),d.appendChild(t),document.body.setAttribute("data-theme","light"),d}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
    FEEDBACK_BORDER_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...i.parameters?.docs?.source}}};const u=["LightAndDark"];export{i as LightAndDark,u as __namedExportsOrder,b as default};
