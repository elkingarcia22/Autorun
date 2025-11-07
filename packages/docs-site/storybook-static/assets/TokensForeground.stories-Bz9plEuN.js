const u=["--ubits-fg-1-high","--ubits-fg-1-high-inverted","--ubits-fg-1-high-static","--ubits-fg-1-high-static-inverted","--ubits-fg-1-medium","--ubits-fg-1-medium-inverted","--ubits-fg-1-medium-static","--ubits-fg-1-medium-static-inverted","--ubits-fg-2-high","--ubits-fg-2-high-inverted","--ubits-fg-2-high-static","--ubits-fg-2-high-static-inverted","--ubits-fg-2-medium","--ubits-fg-2-medium-inverted","--ubits-fg-2-medium-static","--ubits-fg-2-medium-static-inverted","--ubits-fg-disabled","--ubits-fg-disabled-inverted","--ubits-fg-disabled-static","--ubits-fg-disabled-static-inverted","--ubits-fg-on-disabled","--ubits-fg-on-disabled-inverted","--ubits-fg-on-disabled-static","--ubits-fg-on-disabled-static-inverted","--ubits-fg-bold"],m={title:"Tokens/Colors/Foreground",tags:["autodocs"]};function p(d,i){const l=document.documentElement;document.body.setAttribute("data-theme",i);const e=getComputedStyle(l).getPropertyValue(d).trim(),a=/^(#fff(f)?|rgb\(255,\s*255,\s*255\))$/i.test(e)?"repeating-conic-gradient(#eee 0% 25%, var(--ubits-bg-1) 0% 50%) 50%/12px 12px":e,t=document.createElement("div");t.style.display="grid",t.style.gridTemplateColumns="320px 1fr",t.style.alignItems="center",t.style.gap="8px",t.style.padding="6px 8px",t.style.border="1px solid #e5e7eb",t.style.borderRadius="8px";const c=document.createElement("code");c.textContent=d;const n=document.createElement("div");n.style.height="28px",n.style.width="120px",n.style.borderRadius="6px",n.style.border="1px solid #9ca3af",n.style.background=a;const g=document.createElement("code");g.textContent=e;const s=document.createElement("div");return s.style.display="flex",s.style.gap="8px",s.style.alignItems="center",s.appendChild(n),s.appendChild(g),t.appendChild(c),t.appendChild(s),t}const r={render:()=>{const d=document.createElement("div");d.style.display="grid",d.style.gridTemplateColumns="1fr 1fr",d.style.gap="16px";const i=document.createElement("div");i.style.background="#ffffff",i.style.border="1px solid #e5e7eb",i.style.borderRadius="10px",i.style.padding="12px";const l=document.createElement("h4");l.textContent="Light",i.appendChild(l);const e=document.createElement("div");e.style.background="#0E1825",e.style.color="#edeeef",e.style.border="1px solid #0E1825",e.style.borderRadius="10px",e.style.padding="12px";const o=document.createElement("h4");return o.textContent="Dark",e.appendChild(o),u.forEach(a=>{i.appendChild(p(a,"light")),e.appendChild(p(a,"dark"))}),d.appendChild(i),d.appendChild(e),document.body.setAttribute("data-theme","light"),d}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
    FOREGROUND_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });
    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  }
}`,...r.parameters?.docs?.source}}};const h=["LightAndDark"];export{r as LightAndDark,h as __namedExportsOrder,m as default};
