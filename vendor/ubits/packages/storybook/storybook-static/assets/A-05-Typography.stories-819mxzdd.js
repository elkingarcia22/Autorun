const E={title:"Tokens UBITS/05. Tipografía",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Tokens de tipografía del sistema UBITS. Incluye font-family, font-size, font-weight, line-height y letter-spacing."}}}},i={"font-family":["--font-sans"],"font-size":["--font-d1-size","--font-d2-size","--font-d3-size","--font-d4-size","--font-h1-size","--font-h2-size","--font-body-lg-size","--font-body-md-size","--font-body-sm-size","--font-body-xs-size"],"font-weight":["--weight-regular","--weight-semibold","--weight-bold"],"line-height":["--font-d1-line","--font-d2-line","--font-d3-line","--font-d4-line","--font-h1-line","--font-h2-line","--font-body-lg-line","--font-body-md-line","--font-body-sm-line","--font-body-xs-line"],"letter-spacing":[]};function H(l){const o=document.documentElement;return getComputedStyle(o).getPropertyValue(l).trim()||"N/A"}function u(l,o){const n=document.createElement("tr");n.style.borderBottom="1px solid #e5e7eb";const d=document.createElement("td");d.style.padding="12px",d.style.fontFamily="monospace",d.style.fontSize="13px",d.style.color="#303a47",d.textContent=l,n.appendChild(d);const a=document.createElement("td");a.style.padding="12px",a.style.fontSize="14px",a.style.color="#6b7280";const e=H(l);if(o==="font-family")a.textContent=e;else if(o==="font-size"||o==="line-height"){const t=document.createElement("span");if(t.textContent=e,t.style.marginRight="12px",a.appendChild(t),o==="font-size"){const r=document.createElement("span");r.textContent="Aa",r.style.fontSize=e,r.style.color="#303a47",a.appendChild(r)}}else if(o==="font-weight"){const t=document.createElement("span");t.textContent=e,t.style.marginRight="12px",a.appendChild(t);const r=document.createElement("span");r.textContent="Aa",r.style.fontWeight=e,r.style.color="#303a47",a.appendChild(r)}else a.textContent=e;return n.appendChild(a),n}const y={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Tipografía - Todos los Tokens",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="16px",l.appendChild(o);const n=Object.values(i).reduce((a,e)=>a+e.length,0),d=document.createElement("div");return d.style.marginBottom="24px",d.style.padding="16px",d.style.backgroundColor="#f3f4f6",d.style.border="1px solid #d1d5db",d.style.borderRadius="8px",d.style.fontSize="14px",d.innerHTML=`
      <strong>Resumen:</strong><br>
      • Font Family: ${i["font-family"].length} tokens<br>
      • Font Size: ${i["font-size"].length} tokens<br>
      • Font Weight: ${i["font-weight"].length} tokens<br>
      • Line Height: ${i["line-height"].length} tokens<br>
      • Letter Spacing: ${i["letter-spacing"].length} tokens<br>
      <strong>Total: ${n} tokens</strong>
    `,l.appendChild(d),Object.entries(i).forEach(([a,e])=>{if(e.length===0)return;const t=document.createElement("div");t.style.marginBottom="40px";const r=document.createElement("h3");r.textContent=`${a.charAt(0).toUpperCase()+a.slice(1).replace("-"," ")} (${e.length} tokens)`,r.style.fontSize="20px",r.style.fontWeight="600",r.style.marginBottom="16px",r.style.paddingBottom="8px",r.style.borderBottom="2px solid #e5e7eb",t.appendChild(r);const s=document.createElement("table");s.style.width="100%",s.style.borderCollapse="collapse",s.style.backgroundColor="#ffffff",s.style.border="1px solid #e5e7eb",s.style.borderRadius="8px",s.style.overflow="hidden";const x=document.createElement("thead");x.style.backgroundColor="#f9fafb";const g=document.createElement("tr"),c=document.createElement("th");c.textContent="Token",c.style.padding="12px",c.style.textAlign="left",c.style.fontSize="14px",c.style.fontWeight="600",c.style.color="#303a47",c.style.borderBottom="2px solid #e5e7eb",g.appendChild(c);const p=document.createElement("th");p.textContent="Valor",p.style.padding="12px",p.style.textAlign="left",p.style.fontSize="14px",p.style.fontWeight="600",p.style.color="#303a47",p.style.borderBottom="2px solid #e5e7eb",g.appendChild(p),x.appendChild(g),s.appendChild(x);const C=document.createElement("tbody");e.forEach(k=>{C.appendChild(u(k,a))}),s.appendChild(C),t.appendChild(s),l.appendChild(t)}),l}},m={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Font Family",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="16px",l.appendChild(o);const n=document.createElement("table");n.style.width="100%",n.style.borderCollapse="collapse",n.style.backgroundColor="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="8px",n.style.overflow="hidden";const d=document.createElement("thead");d.style.backgroundColor="#f9fafb";const a=document.createElement("tr"),e=document.createElement("th");e.textContent="Token",e.style.padding="12px",e.style.textAlign="left",e.style.fontSize="14px",e.style.fontWeight="600",e.style.color="#303a47",e.style.borderBottom="2px solid #e5e7eb",a.appendChild(e);const t=document.createElement("th");t.textContent="Valor",t.style.padding="12px",t.style.textAlign="left",t.style.fontSize="14px",t.style.fontWeight="600",t.style.color="#303a47",t.style.borderBottom="2px solid #e5e7eb",a.appendChild(t),d.appendChild(a),n.appendChild(d);const r=document.createElement("tbody");return i["font-family"].forEach(s=>{r.appendChild(u(s,"font-family"))}),n.appendChild(r),l.appendChild(n),l}},h={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Font Size",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="16px",l.appendChild(o);const n=document.createElement("table");n.style.width="100%",n.style.borderCollapse="collapse",n.style.backgroundColor="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="8px",n.style.overflow="hidden";const d=document.createElement("thead");d.style.backgroundColor="#f9fafb";const a=document.createElement("tr"),e=document.createElement("th");e.textContent="Token",e.style.padding="12px",e.style.textAlign="left",e.style.fontSize="14px",e.style.fontWeight="600",e.style.color="#303a47",e.style.borderBottom="2px solid #e5e7eb",a.appendChild(e);const t=document.createElement("th");t.textContent="Valor",t.style.padding="12px",t.style.textAlign="left",t.style.fontSize="14px",t.style.fontWeight="600",t.style.color="#303a47",t.style.borderBottom="2px solid #e5e7eb",a.appendChild(t),d.appendChild(a),n.appendChild(d);const r=document.createElement("tbody");return i["font-size"].forEach(s=>{r.appendChild(u(s,"font-size"))}),n.appendChild(r),l.appendChild(n),l}},f={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Font Weight",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="16px",l.appendChild(o);const n=document.createElement("table");n.style.width="100%",n.style.borderCollapse="collapse",n.style.backgroundColor="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="8px",n.style.overflow="hidden";const d=document.createElement("thead");d.style.backgroundColor="#f9fafb";const a=document.createElement("tr"),e=document.createElement("th");e.textContent="Token",e.style.padding="12px",e.style.textAlign="left",e.style.fontSize="14px",e.style.fontWeight="600",e.style.color="#303a47",e.style.borderBottom="2px solid #e5e7eb",a.appendChild(e);const t=document.createElement("th");t.textContent="Valor",t.style.padding="12px",t.style.textAlign="left",t.style.fontSize="14px",t.style.fontWeight="600",t.style.color="#303a47",t.style.borderBottom="2px solid #e5e7eb",a.appendChild(t),d.appendChild(a),n.appendChild(d);const r=document.createElement("tbody");return i["font-weight"].forEach(s=>{r.appendChild(u(s,"font-weight"))}),n.appendChild(r),l.appendChild(n),l}},b={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Line Height",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="16px",l.appendChild(o);const n=document.createElement("table");n.style.width="100%",n.style.borderCollapse="collapse",n.style.backgroundColor="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="8px",n.style.overflow="hidden";const d=document.createElement("thead");d.style.backgroundColor="#f9fafb";const a=document.createElement("tr"),e=document.createElement("th");e.textContent="Token",e.style.padding="12px",e.style.textAlign="left",e.style.fontSize="14px",e.style.fontWeight="600",e.style.color="#303a47",e.style.borderBottom="2px solid #e5e7eb",a.appendChild(e);const t=document.createElement("th");t.textContent="Valor",t.style.padding="12px",t.style.textAlign="left",t.style.fontSize="14px",t.style.fontWeight="600",t.style.color="#303a47",t.style.borderBottom="2px solid #e5e7eb",a.appendChild(t),d.appendChild(a),n.appendChild(d);const r=document.createElement("tbody");return i["line-height"].forEach(s=>{r.appendChild(u(s,"line-height"))}),n.appendChild(r),l.appendChild(n),l}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Tipografía - Todos los Tokens';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const totalCount = Object.values(TYPOGRAPHY_TOKENS).reduce((sum, tokens) => sum + tokens.length, 0);
    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#f3f4f6';
    summary.style.border = '1px solid #d1d5db';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    summary.innerHTML = \`
      <strong>Resumen:</strong><br>
      • Font Family: \${TYPOGRAPHY_TOKENS['font-family'].length} tokens<br>
      • Font Size: \${TYPOGRAPHY_TOKENS['font-size'].length} tokens<br>
      • Font Weight: \${TYPOGRAPHY_TOKENS['font-weight'].length} tokens<br>
      • Line Height: \${TYPOGRAPHY_TOKENS['line-height'].length} tokens<br>
      • Letter Spacing: \${TYPOGRAPHY_TOKENS['letter-spacing'].length} tokens<br>
      <strong>Total: \${totalCount} tokens</strong>
    \`;
    container.appendChild(summary);

    // Renderizar cada categoría
    Object.entries(TYPOGRAPHY_TOKENS).forEach(([category, tokens]) => {
      if (tokens.length === 0) return;
      const section = document.createElement('div');
      section.style.marginBottom = '40px';
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = \`\${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} (\${tokens.length} tokens)\`;
      sectionTitle.style.fontSize = '20px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '16px';
      sectionTitle.style.paddingBottom = '8px';
      sectionTitle.style.borderBottom = '2px solid #e5e7eb';
      section.appendChild(sectionTitle);
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.backgroundColor = '#ffffff';
      table.style.border = '1px solid #e5e7eb';
      table.style.borderRadius = '8px';
      table.style.overflow = 'hidden';
      const thead = document.createElement('thead');
      thead.style.backgroundColor = '#f9fafb';
      const headerRow = document.createElement('tr');
      const tokenHeader = document.createElement('th');
      tokenHeader.textContent = 'Token';
      tokenHeader.style.padding = '12px';
      tokenHeader.style.textAlign = 'left';
      tokenHeader.style.fontSize = '14px';
      tokenHeader.style.fontWeight = '600';
      tokenHeader.style.color = '#303a47';
      tokenHeader.style.borderBottom = '2px solid #e5e7eb';
      headerRow.appendChild(tokenHeader);
      const valueHeader = document.createElement('th');
      valueHeader.textContent = 'Valor';
      valueHeader.style.padding = '12px';
      valueHeader.style.textAlign = 'left';
      valueHeader.style.fontSize = '14px';
      valueHeader.style.fontWeight = '600';
      valueHeader.style.color = '#303a47';
      valueHeader.style.borderBottom = '2px solid #e5e7eb';
      headerRow.appendChild(valueHeader);
      thead.appendChild(headerRow);
      table.appendChild(thead);
      const tbody = document.createElement('tbody');
      tokens.forEach(token => {
        tbody.appendChild(createTokenRow(token, category));
      });
      table.appendChild(tbody);
      section.appendChild(table);
      container.appendChild(section);
    });
    return container;
  }
}`,...y.parameters?.docs?.source},description:{story:"Story principal que muestra todos los tokens de tipografía",...y.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Font Family';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';
    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);
    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    TYPOGRAPHY_TOKENS['font-family'].forEach(token => {
      tbody.appendChild(createTokenRow(token, 'font-family'));
    });
    table.appendChild(tbody);
    container.appendChild(table);
    return container;
  }
}`,...m.parameters?.docs?.source},description:{story:"Story para Font Family",...m.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Font Size';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';
    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);
    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    TYPOGRAPHY_TOKENS['font-size'].forEach(token => {
      tbody.appendChild(createTokenRow(token, 'font-size'));
    });
    table.appendChild(tbody);
    container.appendChild(table);
    return container;
  }
}`,...h.parameters?.docs?.source},description:{story:"Story para Font Size",...h.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Font Weight';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';
    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);
    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    TYPOGRAPHY_TOKENS['font-weight'].forEach(token => {
      tbody.appendChild(createTokenRow(token, 'font-weight'));
    });
    table.appendChild(tbody);
    container.appendChild(table);
    return container;
  }
}`,...f.parameters?.docs?.source},description:{story:"Story para Font Weight",...f.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Line Height';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';
    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);
    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    TYPOGRAPHY_TOKENS['line-height'].forEach(token => {
      tbody.appendChild(createTokenRow(token, 'line-height'));
    });
    table.appendChild(tbody);
    container.appendChild(table);
    return container;
  }
}`,...b.parameters?.docs?.source},description:{story:"Story para Line Height",...b.parameters?.docs?.description}}};const v=["TodosLosTokens","FontFamily","FontSize","FontWeight","LineHeight"];export{m as FontFamily,h as FontSize,f as FontWeight,b as LineHeight,y as TodosLosTokens,v as __namedExportsOrder,E as default};
