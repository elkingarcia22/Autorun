const g=["--ubits-fg-yellow-subtle","--ubits-fg-yellow-subtle-inverted","--ubits-fg-yellow-subtle-hover","--ubits-fg-yellow-subtle-inverted-hover","--ubits-fg-yellow-bold","--ubits-fg-yellow-bold-inverted","--ubits-fg-yellow-bold-hover","--ubits-fg-yellow-bold-inverted-hover","--ubits-fg-yellow-subtle-static","--ubits-fg-yellow-subtle-static-inverted","--ubits-fg-yellow-bold-static","--ubits-fg-yellow-bold-static-inverted","--ubits-fg-yellow-subtle-static-hover","--ubits-fg-yellow-subtle-static-inverted-hover","--ubits-fg-yellow-bold-static-hover","--ubits-fg-yellow-bold-static-inverted-hover"],y={title:"Tokens/Colors/Yellow Foregrounds",tags:["autodocs"]};function u(l,n){const r=document.documentElement;document.body.setAttribute("data-theme",n);const e=getComputedStyle(r).getPropertyValue(l).trim(),i=/^(#fff(f)?|rgb\(255,\s*255,\s*255\))$/i.test(e)?"repeating-conic-gradient(#eee 0% 25%, var(--ubits-bg-1) 0% 50%) 50%/12px 12px":e,t=document.createElement("div");t.style.display="grid",t.style.gridTemplateColumns="380px 1fr",t.style.alignItems="center",t.style.gap="8px",t.style.padding="6px 8px",t.style.border="1px solid #e5e7eb",t.style.borderRadius="8px";const c=document.createElement("code");c.textContent=l;const o=document.createElement("div");o.style.height="28px",o.style.width="120px",o.style.borderRadius="6px",o.style.border="1px solid #9ca3af",o.style.background=i;const p=document.createElement("code");p.textContent=e;const d=document.createElement("div");return d.style.display="flex",d.style.gap="8px",d.style.alignItems="center",d.appendChild(o),d.appendChild(p),t.appendChild(c),t.appendChild(d),t}const s={render:()=>{const l=document.createElement("div");l.style.display="grid",l.style.gridTemplateColumns="1fr 1fr",l.style.gap="16px";const n=document.createElement("div");n.style.background="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="10px",n.style.padding="12px";const r=document.createElement("h4");r.textContent="Light",n.appendChild(r);const e=document.createElement("div");e.style.background="#0E1825",e.style.color="#edeeef",e.style.border="1px solid #0E1825",e.style.borderRadius="10px",e.style.padding="12px";const a=document.createElement("h4");return a.textContent="Dark",e.appendChild(a),g.forEach(i=>{n.appendChild(u(i,"light")),e.appendChild(u(i,"dark"))}),l.appendChild(n),l.appendChild(e),document.body.setAttribute("data-theme","light"),l}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    YELLOW_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...s.parameters?.docs?.source}}};const b=["LightAndDark"];export{s as LightAndDark,b as __namedExportsOrder,y as default};
