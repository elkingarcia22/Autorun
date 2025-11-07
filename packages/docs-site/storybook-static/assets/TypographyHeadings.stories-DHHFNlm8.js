const r={title:"Tokens/Typography/Headings",tags:["autodocs"]};function a(e,n,l){const o=document.createElement("div");o.className="typo-sample";const d=document.createElement("div");d.className="typo-box",d.textContent=e;const t=document.createElement("div");return t.textContent=e+" — ejemplo",t.style.fontFamily="var(--font-sans)",t.style.fontSize=`var(${n})`,t.style.lineHeight=`var(${l})`,t.style.fontWeight="600",o.appendChild(d),o.appendChild(t),o}const s={render:()=>{const e=document.createElement("div");e.style.display="grid",e.style.gap="10px",e.appendChild(a("Heading H1","--font-h1-size","--font-h1-line")),e.appendChild(a("Heading H2","--font-h2-size","--font-h2-line"));const n=document.createElement("div");return n.style.marginTop="8px",n.style.padding="10px 12px",n.style.border="1px solid #e5e7eb",n.style.borderRadius="8px",n.style.fontSize="13px",n.innerHTML="⚠️ Reglas: Solo existen H1 y H2. Para subtítulos menores usa <code>body-md-bold</code> o <code>body-sm-bold</code>. H1 para títulos principales; H2 para subtítulos/secciones.",e.appendChild(n),e}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const c = document.createElement('div');
    c.style.display = 'grid';
    c.style.gap = '10px';
    c.appendChild(block('Heading H1', '--font-h1-size', '--font-h1-line'));
    c.appendChild(block('Heading H2', '--font-h2-size', '--font-h2-line'));
    const note = document.createElement('div');
    note.style.marginTop = '8px';
    note.style.padding = '10px 12px';
    note.style.border = '1px solid #e5e7eb';
    note.style.borderRadius = '8px';
    note.style.fontSize = '13px';
    note.innerHTML = '⚠️ Reglas: Solo existen H1 y H2. Para subtítulos menores usa <code>body-md-bold</code> o <code>body-sm-bold</code>. H1 para títulos principales; H2 para subtítulos/secciones.';
    c.appendChild(note);
    return c;
  }
}`,...s.parameters?.docs?.source}}};const i=["H1yH2"];export{s as H1yH2,i as __namedExportsOrder,r as default};
