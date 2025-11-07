const g=["--ubits-fg-teal-subtle","--ubits-fg-teal-subtle-inverted","--ubits-fg-teal-subtle-hover","--ubits-fg-teal-subtle-inverted-hover","--ubits-fg-teal-subtle-static","--ubits-fg-teal-subtle-static-inverted","--ubits-fg-teal-subtle-static-hover","--ubits-fg-teal-subtle-static-inverted-hover"],h={title:"Tokens/Colors/Teal Foregrounds",tags:["autodocs"]};function u(n,l){const r=document.documentElement;document.body.setAttribute("data-theme",l);const e=getComputedStyle(r).getPropertyValue(n).trim(),a=/^(#fff(f)?|rgb\(255,\s*255,\s*255\))$/i.test(e)?"repeating-conic-gradient(#eee 0% 25%, var(--ubits-bg-1) 0% 50%) 50%/12px 12px":e,t=document.createElement("div");t.style.display="grid",t.style.gridTemplateColumns="340px 1fr",t.style.alignItems="center",t.style.gap="8px",t.style.padding="6px 8px",t.style.border="1px solid #e5e7eb",t.style.borderRadius="8px";const c=document.createElement("code");c.textContent=n;const d=document.createElement("div");d.style.height="28px",d.style.width="120px",d.style.borderRadius="6px",d.style.border="1px solid #9ca3af",d.style.background=a;const p=document.createElement("code");p.textContent=e;const o=document.createElement("div");return o.style.display="flex",o.style.gap="8px",o.style.alignItems="center",o.appendChild(d),o.appendChild(p),t.appendChild(c),t.appendChild(o),t}const s={render:()=>{const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="1fr 1fr",n.style.gap="16px";const l=document.createElement("div");l.style.background="#ffffff",l.style.border="1px solid #e5e7eb",l.style.borderRadius="10px",l.style.padding="12px";const r=document.createElement("h4");r.textContent="Light",l.appendChild(r);const e=document.createElement("div");e.style.background="#0E1825",e.style.color="#edeeef",e.style.border="1px solid #0E1825",e.style.borderRadius="10px",e.style.padding="12px";const i=document.createElement("h4");return i.textContent="Dark",e.appendChild(i),g.forEach(a=>{l.appendChild(u(a,"light")),e.appendChild(u(a,"dark"))}),n.appendChild(l),n.appendChild(e),document.body.setAttribute("data-theme","light"),n}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    TEAL_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...s.parameters?.docs?.source}}};const m=["LightAndDark"];export{s as LightAndDark,m as __namedExportsOrder,h as default};
