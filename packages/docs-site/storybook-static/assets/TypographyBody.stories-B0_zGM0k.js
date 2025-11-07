const y={title:"Tokens/Typography/Body",tags:["autodocs"]};function e(o,d,l,a){const t=document.createElement("div");t.className="typo-sample";const i=document.createElement("div");i.className="typo-box",i.textContent=o;const n=document.createElement("div");return n.textContent="Texto ejemplo para validar legibilidad y tamaños en UI.",n.style.fontFamily="var(--font-sans)",n.style.fontSize=`var(${d})`,n.style.lineHeight=`var(${l})`,n.style.fontWeight=a,t.appendChild(i),t.appendChild(n),t}const s={render:()=>{const o=document.createElement("div");o.style.display="grid",o.style.gap="10px",o.appendChild(e("Body XS · Regular 400","--font-body-xs-size","--font-body-xs-line","400")),o.appendChild(e("Body XS · Semibold 600","--font-body-xs-size","--font-body-xs-line","600")),o.appendChild(e("Body XS · Bold 700","--font-body-xs-size","--font-body-xs-line","700")),o.appendChild(e("Body SM · Regular 400","--font-body-sm-size","--font-body-sm-line","400")),o.appendChild(e("Body SM · Semibold 600","--font-body-sm-size","--font-body-sm-line","600")),o.appendChild(e("Body SM · Bold 700","--font-body-sm-size","--font-body-sm-line","700")),o.appendChild(e("Body MD · Regular 400","--font-body-md-size","--font-body-md-line","400")),o.appendChild(e("Body MD · Semibold 600","--font-body-md-size","--font-body-md-line","600")),o.appendChild(e("Body MD · Bold 700","--font-body-md-size","--font-body-md-line","700")),o.appendChild(e("Body LG · Semibold 600 (solo botones)","--font-body-lg-size","--font-body-lg-line","600"));const d=document.createElement("div");return d.style.marginTop="8px",d.style.padding="10px 12px",d.style.border="1px solid #e5e7eb",d.style.borderRadius="8px",d.style.fontSize="13px",d.innerHTML="📋 Uso recomendado: XS metadatos; SM descripciones/etiquetas; MD párrafos; LG exclusivo para botones grandes.",o.appendChild(d),o}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const c = document.createElement('div');
    c.style.display = 'grid';
    c.style.gap = '10px';
    // XS 11
    c.appendChild(bodyRow('Body XS · Regular 400', '--font-body-xs-size', '--font-body-xs-line', '400'));
    c.appendChild(bodyRow('Body XS · Semibold 600', '--font-body-xs-size', '--font-body-xs-line', '600'));
    c.appendChild(bodyRow('Body XS · Bold 700', '--font-body-xs-size', '--font-body-xs-line', '700'));
    // SM 13
    c.appendChild(bodyRow('Body SM · Regular 400', '--font-body-sm-size', '--font-body-sm-line', '400'));
    c.appendChild(bodyRow('Body SM · Semibold 600', '--font-body-sm-size', '--font-body-sm-line', '600'));
    c.appendChild(bodyRow('Body SM · Bold 700', '--font-body-sm-size', '--font-body-sm-line', '700'));
    // MD 16
    c.appendChild(bodyRow('Body MD · Regular 400', '--font-body-md-size', '--font-body-md-line', '400'));
    c.appendChild(bodyRow('Body MD · Semibold 600', '--font-body-md-size', '--font-body-md-line', '600'));
    c.appendChild(bodyRow('Body MD · Bold 700', '--font-body-md-size', '--font-body-md-line', '700'));
    // LG 20 (solo semibold)
    c.appendChild(bodyRow('Body LG · Semibold 600 (solo botones)', '--font-body-lg-size', '--font-body-lg-line', '600'));
    const note = document.createElement('div');
    note.style.marginTop = '8px';
    note.style.padding = '10px 12px';
    note.style.border = '1px solid #e5e7eb';
    note.style.borderRadius = '8px';
    note.style.fontSize = '13px';
    note.innerHTML = '📋 Uso recomendado: XS metadatos; SM descripciones/etiquetas; MD párrafos; LG exclusivo para botones grandes.';
    c.appendChild(note);
    return c;
  }
}`,...s.parameters?.docs?.source}}};const p=["Variants"];export{s as Variants,p as __namedExportsOrder,y as default};
