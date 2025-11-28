const B={title:"Tokens UBITS/07. Text Styles",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Estilos completos de texto del sistema UBITS. Cada estilo incluye todas las propiedades tipograficas: font-family, font-weight, letter-spacing, paragraph-indent, text-case y text-decoration. Incluye Display (D1-D4), Heading (H1-H2) y Body (lg, md, sm, xs)."}}}};function T(t){const n=document.documentElement;return getComputedStyle(n).getPropertyValue(t).trim()||"N/A"}function v(){const t=document.styleSheets,n=[];try{const e=Array.from(t).find(i=>{try{return i.href?.includes("figma-tokens.css")||!1}catch{return!1}});e&&Array.from(e.cssRules||[]).forEach(l=>{l instanceof CSSStyleRule&&l.style.cssText.split(";").forEach(r=>{const a=r.match(/--[^:]+:/);a&&n.push(a[0].replace(":",""))})})}catch{}const o={},m={},s={};return["d1","d2","d3","d4"].forEach(e=>{["regular","semibold","bold"].forEach(i=>{const l=`${e}-${i}`;o[l]={fontfamily:`--modifiers-normal-display-${e}-${i}-fontfamily`,fontweight:`--modifiers-normal-display-${e}-${i}-fontweight`,letterspacing:`--modifiers-normal-display-${e}-${i}-letterspacing`,paragraphindent:`--modifiers-normal-display-${e}-${i}-paragraphindent`,textcase:`--modifiers-normal-display-${e}-${i}-textcase`,textdecoration:`--modifiers-normal-display-${e}-${i}-textdecoration`}})}),["h1","h2"].forEach(e=>{const i=e;m[i]={fontfamily:`--modifiers-normal-heading-${e}-fontfamily`,fontweight:`--modifiers-normal-heading-${e}-fontweight`,lineheight:`--modifiers-normal-heading-${e}-lineheight`,letterspacing:`--modifiers-normal-heading-${e}-letterspacing`,paragraphindent:`--modifiers-normal-heading-${e}-paragraphindent`,textcase:`--modifiers-normal-heading-${e}-textcase`,textdecoration:`--modifiers-normal-heading-${e}-textdecoration`}}),["lg","md","sm","xs"].forEach(e=>{["regular","semibold","bold"].forEach(i=>{const l=`${e}-${i}`;s[l]={fontfamily:`--modifiers-normal-body-${e}-${i}-fontfamily`,fontweight:`--modifiers-normal-body-${e}-${i}-fontweight`,letterspacing:`--modifiers-normal-body-${e}-${i}-letterspacing`,paragraphindent:`--modifiers-normal-body-${e}-${i}-paragraphindent`,textcase:`--modifiers-normal-body-${e}-${i}-textcase`,textdecoration:`--modifiers-normal-body-${e}-${i}-textdecoration`}})}),{display:o,heading:m,body:s}}function h(t,n){const o=document.createElement("div");o.style.marginBottom="24px",o.style.padding="16px",o.style.backgroundColor="#ffffff",o.style.border="1px solid #e5e7eb",o.style.borderRadius="8px";const m=document.createElement("h4");m.textContent=t,m.style.fontSize="16px",m.style.fontWeight="600",m.style.marginBottom="12px",m.style.color="#303a47",o.appendChild(m);const s=document.createElement("table");return s.style.width="100%",s.style.borderCollapse="collapse",[{key:"fontfamily",label:"Font Family"},{key:"fontweight",label:"Font Weight"},{key:"lineheight",label:"Line Height"},{key:"letterspacing",label:"Letter Spacing"},{key:"paragraphindent",label:"Paragraph Indent"},{key:"textcase",label:"Text Case"},{key:"textdecoration",label:"Text Decoration"}].filter(i=>n[i.key]).forEach(i=>{const l=document.createElement("tr");l.style.borderBottom="1px solid #e5e7eb";const r=document.createElement("td");r.style.padding="8px 12px",r.style.fontSize="14px",r.style.fontWeight="500",r.style.color="#303a47",r.style.width="180px",r.textContent=i.label,l.appendChild(r);const a=document.createElement("td");a.style.padding="8px 12px",a.style.fontFamily="monospace",a.style.fontSize="12px",a.style.color="#6b7280",a.textContent=n[i.key]||"N/A",l.appendChild(a);const c=document.createElement("td");if(c.style.padding="8px 12px",c.style.fontSize="14px",c.style.color="#303a47",n[i.key]){const p=T(n[i.key]);c.textContent=p}else c.textContent="N/A";l.appendChild(c),s.appendChild(l)}),o.appendChild(s),o}const x={render:()=>{const t=document.createElement("div");t.style.padding="24px",t.style.maxWidth="1400px";const n=document.createElement("h2");n.textContent="Text Styles - Estilos Completos de Texto",n.style.fontSize="24px",n.style.fontWeight="700",n.style.marginBottom="16px",t.appendChild(n);const o=document.createElement("p");o.textContent="Estilos completos de texto que incluyen todas las propiedades tipograficas: font-family, font-weight, letter-spacing, paragraph-indent, text-case y text-decoration.",o.style.fontSize="16px",o.style.color="#5c646f",o.style.marginBottom="32px",o.style.lineHeight="1.6",t.appendChild(o);const{display:m,heading:s,body:e}=v(),i=document.createElement("div");i.style.marginBottom="40px";const l=document.createElement("h3");l.textContent=`Display (${Object.keys(m).length} estilos)`,l.style.fontSize="20px",l.style.fontWeight="600",l.style.marginBottom="16px",l.style.paddingBottom="8px",l.style.borderBottom="2px solid #e5e7eb",i.appendChild(l),Object.entries(m).forEach(([d,y])=>{i.appendChild(h(d.toUpperCase(),y))}),t.appendChild(i);const r=document.createElement("div");r.style.marginBottom="40px";const a=document.createElement("h3");a.textContent=`Heading (${Object.keys(s).length} estilos)`,a.style.fontSize="20px",a.style.fontWeight="600",a.style.marginBottom="16px",a.style.paddingBottom="8px",a.style.borderBottom="2px solid #e5e7eb",r.appendChild(a),Object.entries(s).forEach(([d,y])=>{r.appendChild(h(d.toUpperCase(),y))}),t.appendChild(r);const c=document.createElement("div");c.style.marginBottom="40px";const p=document.createElement("h3");return p.textContent=`Body (${Object.keys(e).length} estilos)`,p.style.fontSize="20px",p.style.fontWeight="600",p.style.marginBottom="16px",p.style.paddingBottom="8px",p.style.borderBottom="2px solid #e5e7eb",c.appendChild(p),Object.entries(e).forEach(([d,y])=>{c.appendChild(h(d.toUpperCase(),y))}),t.appendChild(c),t}},b={render:()=>{const t=document.createElement("div");t.style.padding="24px",t.style.maxWidth="1400px";const n=document.createElement("h2");n.textContent="Display Styles",n.style.fontSize="24px",n.style.fontWeight="700",n.style.marginBottom="16px",t.appendChild(n);const{display:o}=v();return Object.entries(o).forEach(([m,s])=>{t.appendChild(h(m.toUpperCase(),s))}),t}},u={render:()=>{const t=document.createElement("div");t.style.padding="24px",t.style.maxWidth="1400px";const n=document.createElement("h2");n.textContent="Heading Styles",n.style.fontSize="24px",n.style.fontWeight="700",n.style.marginBottom="16px",t.appendChild(n);const{heading:o}=v();return Object.entries(o).forEach(([m,s])=>{t.appendChild(h(m.toUpperCase(),s))}),t}},S={render:()=>{const t=document.createElement("div");t.style.padding="24px",t.style.maxWidth="1400px";const n=document.createElement("h2");n.textContent="Body Styles",n.style.fontSize="24px",n.style.fontWeight="700",n.style.marginBottom="16px",t.appendChild(n);const{body:o}=v();return Object.entries(o).forEach(([m,s])=>{t.appendChild(h(m.toUpperCase(),s))}),t}},C={render:()=>{const t=document.createElement("div");t.style.padding="24px",t.style.maxWidth="1400px";const n=document.createElement("h2");n.textContent="Uso Práctico: Text Styles Combinados",n.style.fontSize="24px",n.style.fontWeight="700",n.style.marginBottom="16px",t.appendChild(n);const o=document.createElement("p");o.innerHTML=`
      <strong>Importante:</strong> No creamos tokens CSS nuevos combinados. 
      Aplicamos los tokens individuales de Figma al mismo tiempo en CSS.
      <br><br>
      Los text styles se construyen combinando:
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><code>font-size</code>: Token de Figma (ej: <code>--modifiers-normal-body-md-semibold-fontsize</code>)</li>
        <li><code>font-weight</code>: Token numérico UBITS (ej: <code>--weight-semibold, 600</code>)</li>
        <li><code>line-height</code>: Token de Figma (ej: <code>--modifiers-normal-body-md-semibold-lineheight</code>)</li>
      </ul>
    `,o.style.fontSize="16px",o.style.color="#5c646f",o.style.marginBottom="32px",o.style.lineHeight="1.6",o.style.padding="16px",o.style.backgroundColor="#f9fafb",o.style.border="1px solid #e5e7eb",o.style.borderRadius="8px",t.appendChild(o),[{name:"Body MD Semibold",description:"Usado en títulos de acordeones, botones (MD), labels importantes",css:`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-md-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-md-semibold-lineheight);
        `.trim(),preview:"Texto de ejemplo con Body MD Semibold"},{name:"Body SM Semibold",description:"Usado en badges, botones (SM, XS), labels pequeños",css:`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-sm-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-sm-semibold-lineheight);
        `.trim(),preview:"Texto de ejemplo con Body SM Semibold"},{name:"Body MD Regular",description:"Usado en párrafos, descripciones, contenido general",css:`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-md-regular-fontsize);
font-weight: var(--weight-regular, 400);
line-height: var(--modifiers-normal-body-md-regular-lineheight);
        `.trim(),preview:"Texto de ejemplo con Body MD Regular para párrafos y descripciones largas."},{name:"Body SM Regular",description:"Usado en subheaders, helper text, metadatos",css:`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-sm-regular-fontsize);
font-weight: var(--weight-regular, 400);
line-height: var(--modifiers-normal-body-sm-regular-lineheight);
        `.trim(),preview:"Texto de ejemplo con Body SM Regular"},{name:"Body XS Semibold",description:"Usado en botones extra pequeños (XS)",css:`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-xs-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-xs-semibold-lineheight);
        `.trim(),preview:"XS Semibold"}].forEach((e,i)=>{const l=document.createElement("div");l.style.marginBottom="32px",l.style.padding="20px",l.style.border="1px solid #e5e7eb",l.style.borderRadius="12px",l.style.backgroundColor="#ffffff";const r=document.createElement("h3");r.textContent=e.name,r.style.fontSize="18px",r.style.fontWeight="600",r.style.marginBottom="8px",r.style.color="#303a47",l.appendChild(r);const a=document.createElement("p");a.textContent=e.description,a.style.fontSize="14px",a.style.color="#6b7280",a.style.marginBottom="16px",l.appendChild(a);const c=document.createElement("div");c.style.marginBottom="16px",c.style.padding="16px",c.style.backgroundColor="#f9fafb",c.style.border="1px solid #e5e7eb",c.style.borderRadius="8px";const p=document.createElement("div");p.textContent="Preview:",p.style.fontSize="12px",p.style.fontWeight="600",p.style.color="#6b7280",p.style.marginBottom="8px",p.style.textTransform="uppercase",p.style.letterSpacing="0.5px",c.appendChild(p);const d=document.createElement("div");d.textContent=e.preview,d.style.fontFamily="var(--font-family-noto-sans-font-family)",d.style.fontSize="var(--modifiers-normal-body-md-semibold-fontsize)",d.style.fontWeight="var(--weight-semibold, 600)",d.style.lineHeight="var(--modifiers-normal-body-md-semibold-lineheight)",d.style.color="#303a47",e.name.includes("SM")?(d.style.fontSize="var(--modifiers-normal-body-sm-semibold-fontsize)",d.style.lineHeight="var(--modifiers-normal-body-sm-semibold-lineheight)",e.name.includes("Regular")&&(d.style.fontWeight="var(--weight-regular, 400)")):e.name.includes("XS")?(d.style.fontSize="var(--modifiers-normal-body-xs-semibold-fontsize)",d.style.lineHeight="var(--modifiers-normal-body-xs-semibold-lineheight)"):e.name.includes("Regular")&&(d.style.fontSize="var(--modifiers-normal-body-md-regular-fontsize)",d.style.fontWeight="var(--weight-regular, 400)",d.style.lineHeight="var(--modifiers-normal-body-md-regular-lineheight)"),c.appendChild(d),l.appendChild(c);const y=document.createElement("div");y.textContent="CSS:",y.style.fontSize="12px",y.style.fontWeight="600",y.style.color="#6b7280",y.style.marginBottom="8px",y.style.textTransform="uppercase",y.style.letterSpacing="0.5px",l.appendChild(y);const f=document.createElement("pre");f.style.margin="0",f.style.padding="12px",f.style.backgroundColor="#1e293b",f.style.borderRadius="6px",f.style.overflow="auto";const g=document.createElement("code");g.textContent=e.css,g.style.fontFamily="monospace",g.style.fontSize="13px",g.style.color="#e2e8f0",g.style.lineHeight="1.6",f.appendChild(g),l.appendChild(f),t.appendChild(l)});const s=document.createElement("div");return s.style.marginTop="32px",s.style.padding="16px",s.style.backgroundColor="#fef3c7",s.style.border="1px solid #fbbf24",s.style.borderRadius="8px",s.innerHTML=`
      <strong>⚠️ Nota sobre font-weight:</strong><br>
      Los tokens de Figma devuelven strings ("Regular", "SemiBold", "Bold") en lugar de números.
      Por eso usamos tokens numéricos UBITS en <code>tokens-typography.css</code>:
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><code>--weight-regular: 400</code></li>
        <li><code>--weight-semibold: 600</code></li>
        <li><code>--weight-bold: 700</code></li>
      </ul>
      Estos tokens se usan junto con los tokens de Figma para construir los text styles completos.
    `,s.style.fontSize="14px",s.style.color="#92400e",s.style.lineHeight="1.6",t.appendChild(s),t}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Text Styles - Estilos Completos de Texto';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const description = document.createElement('p');
    description.textContent = 'Estilos completos de texto que incluyen todas las propiedades tipograficas: font-family, font-weight, letter-spacing, paragraph-indent, text-case y text-decoration.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);
    const {
      display,
      heading,
      body
    } = extractTextStyleTokens();

    // Sección Display
    const displaySection = document.createElement('div');
    displaySection.style.marginBottom = '40px';
    const displayTitle = document.createElement('h3');
    displayTitle.textContent = \`Display (\${Object.keys(display).length} estilos)\`;
    displayTitle.style.fontSize = '20px';
    displayTitle.style.fontWeight = '600';
    displayTitle.style.marginBottom = '16px';
    displayTitle.style.paddingBottom = '8px';
    displayTitle.style.borderBottom = '2px solid #e5e7eb';
    displaySection.appendChild(displayTitle);
    Object.entries(display).forEach(([styleName, tokens]) => {
      displaySection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    container.appendChild(displaySection);

    // Sección Heading
    const headingSection = document.createElement('div');
    headingSection.style.marginBottom = '40px';
    const headingTitle = document.createElement('h3');
    headingTitle.textContent = \`Heading (\${Object.keys(heading).length} estilos)\`;
    headingTitle.style.fontSize = '20px';
    headingTitle.style.fontWeight = '600';
    headingTitle.style.marginBottom = '16px';
    headingTitle.style.paddingBottom = '8px';
    headingTitle.style.borderBottom = '2px solid #e5e7eb';
    headingSection.appendChild(headingTitle);
    Object.entries(heading).forEach(([styleName, tokens]) => {
      headingSection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    container.appendChild(headingSection);

    // Sección Body
    const bodySection = document.createElement('div');
    bodySection.style.marginBottom = '40px';
    const bodyTitle = document.createElement('h3');
    bodyTitle.textContent = \`Body (\${Object.keys(body).length} estilos)\`;
    bodyTitle.style.fontSize = '20px';
    bodyTitle.style.fontWeight = '600';
    bodyTitle.style.marginBottom = '16px';
    bodyTitle.style.paddingBottom = '8px';
    bodyTitle.style.borderBottom = '2px solid #e5e7eb';
    bodySection.appendChild(bodyTitle);
    Object.entries(body).forEach(([styleName, tokens]) => {
      bodySection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    container.appendChild(bodySection);
    return container;
  }
}`,...x.parameters?.docs?.source},description:{story:"Story principal - Todos los Text Styles",...x.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Display Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const {
      display
    } = extractTextStyleTokens();
    Object.entries(display).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    return container;
  }
}`,...b.parameters?.docs?.source},description:{story:"Story - Display",...b.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Heading Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const {
      heading
    } = extractTextStyleTokens();
    Object.entries(heading).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    return container;
  }
}`,...u.parameters?.docs?.source},description:{story:"Story - Heading",...u.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Body Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const {
      body
    } = extractTextStyleTokens();
    Object.entries(body).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    return container;
  }
}`,...S.parameters?.docs?.source},description:{story:"Story - Body",...S.parameters?.docs?.description}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Uso Práctico: Text Styles Combinados';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const description = document.createElement('p');
    description.innerHTML = \`
      <strong>Importante:</strong> No creamos tokens CSS nuevos combinados. 
      Aplicamos los tokens individuales de Figma al mismo tiempo en CSS.
      <br><br>
      Los text styles se construyen combinando:
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><code>font-size</code>: Token de Figma (ej: <code>--modifiers-normal-body-md-semibold-fontsize</code>)</li>
        <li><code>font-weight</code>: Token numérico UBITS (ej: <code>--weight-semibold, 600</code>)</li>
        <li><code>line-height</code>: Token de Figma (ej: <code>--modifiers-normal-body-md-semibold-lineheight</code>)</li>
      </ul>
    \`;
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    description.style.padding = '16px';
    description.style.backgroundColor = '#f9fafb';
    description.style.border = '1px solid #e5e7eb';
    description.style.borderRadius = '8px';
    container.appendChild(description);

    // Text styles más usados
    const textStyles = [{
      name: 'Body MD Semibold',
      description: 'Usado en títulos de acordeones, botones (MD), labels importantes',
      css: \`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-md-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-md-semibold-lineheight);
        \`.trim(),
      preview: 'Texto de ejemplo con Body MD Semibold'
    }, {
      name: 'Body SM Semibold',
      description: 'Usado en badges, botones (SM, XS), labels pequeños',
      css: \`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-sm-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-sm-semibold-lineheight);
        \`.trim(),
      preview: 'Texto de ejemplo con Body SM Semibold'
    }, {
      name: 'Body MD Regular',
      description: 'Usado en párrafos, descripciones, contenido general',
      css: \`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-md-regular-fontsize);
font-weight: var(--weight-regular, 400);
line-height: var(--modifiers-normal-body-md-regular-lineheight);
        \`.trim(),
      preview: 'Texto de ejemplo con Body MD Regular para párrafos y descripciones largas.'
    }, {
      name: 'Body SM Regular',
      description: 'Usado en subheaders, helper text, metadatos',
      css: \`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-sm-regular-fontsize);
font-weight: var(--weight-regular, 400);
line-height: var(--modifiers-normal-body-sm-regular-lineheight);
        \`.trim(),
      preview: 'Texto de ejemplo con Body SM Regular'
    }, {
      name: 'Body XS Semibold',
      description: 'Usado en botones extra pequeños (XS)',
      css: \`
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-xs-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-xs-semibold-lineheight);
        \`.trim(),
      preview: 'XS Semibold'
    }];
    textStyles.forEach((style, index) => {
      const styleCard = document.createElement('div');
      styleCard.style.marginBottom = '32px';
      styleCard.style.padding = '20px';
      styleCard.style.border = '1px solid #e5e7eb';
      styleCard.style.borderRadius = '12px';
      styleCard.style.backgroundColor = '#ffffff';
      const styleName = document.createElement('h3');
      styleName.textContent = style.name;
      styleName.style.fontSize = '18px';
      styleName.style.fontWeight = '600';
      styleName.style.marginBottom = '8px';
      styleName.style.color = '#303a47';
      styleCard.appendChild(styleName);
      const styleDesc = document.createElement('p');
      styleDesc.textContent = style.description;
      styleDesc.style.fontSize = '14px';
      styleDesc.style.color = '#6b7280';
      styleDesc.style.marginBottom = '16px';
      styleCard.appendChild(styleDesc);

      // Preview
      const previewContainer = document.createElement('div');
      previewContainer.style.marginBottom = '16px';
      previewContainer.style.padding = '16px';
      previewContainer.style.backgroundColor = '#f9fafb';
      previewContainer.style.border = '1px solid #e5e7eb';
      previewContainer.style.borderRadius = '8px';
      const previewLabel = document.createElement('div');
      previewLabel.textContent = 'Preview:';
      previewLabel.style.fontSize = '12px';
      previewLabel.style.fontWeight = '600';
      previewLabel.style.color = '#6b7280';
      previewLabel.style.marginBottom = '8px';
      previewLabel.style.textTransform = 'uppercase';
      previewLabel.style.letterSpacing = '0.5px';
      previewContainer.appendChild(previewLabel);
      const preview = document.createElement('div');
      preview.textContent = style.preview;
      preview.style.fontFamily = 'var(--font-family-noto-sans-font-family)';
      preview.style.fontSize = 'var(--modifiers-normal-body-md-semibold-fontsize)';
      preview.style.fontWeight = 'var(--weight-semibold, 600)';
      preview.style.lineHeight = 'var(--modifiers-normal-body-md-semibold-lineheight)';
      preview.style.color = '#303a47';

      // Aplicar estilos específicos según el text style
      if (style.name.includes('SM')) {
        preview.style.fontSize = 'var(--modifiers-normal-body-sm-semibold-fontsize)';
        preview.style.lineHeight = 'var(--modifiers-normal-body-sm-semibold-lineheight)';
        if (style.name.includes('Regular')) {
          preview.style.fontWeight = 'var(--weight-regular, 400)';
        }
      } else if (style.name.includes('XS')) {
        preview.style.fontSize = 'var(--modifiers-normal-body-xs-semibold-fontsize)';
        preview.style.lineHeight = 'var(--modifiers-normal-body-xs-semibold-lineheight)';
      } else if (style.name.includes('Regular')) {
        preview.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize)';
        preview.style.fontWeight = 'var(--weight-regular, 400)';
        preview.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight)';
      }
      previewContainer.appendChild(preview);
      styleCard.appendChild(previewContainer);

      // CSS Code
      const codeLabel = document.createElement('div');
      codeLabel.textContent = 'CSS:';
      codeLabel.style.fontSize = '12px';
      codeLabel.style.fontWeight = '600';
      codeLabel.style.color = '#6b7280';
      codeLabel.style.marginBottom = '8px';
      codeLabel.style.textTransform = 'uppercase';
      codeLabel.style.letterSpacing = '0.5px';
      styleCard.appendChild(codeLabel);
      const codeBlock = document.createElement('pre');
      codeBlock.style.margin = '0';
      codeBlock.style.padding = '12px';
      codeBlock.style.backgroundColor = '#1e293b';
      codeBlock.style.borderRadius = '6px';
      codeBlock.style.overflow = 'auto';
      const code = document.createElement('code');
      code.textContent = style.css;
      code.style.fontFamily = 'monospace';
      code.style.fontSize = '13px';
      code.style.color = '#e2e8f0';
      code.style.lineHeight = '1.6';
      codeBlock.appendChild(code);
      styleCard.appendChild(codeBlock);
      container.appendChild(styleCard);
    });

    // Nota sobre font-weight
    const note = document.createElement('div');
    note.style.marginTop = '32px';
    note.style.padding = '16px';
    note.style.backgroundColor = '#fef3c7';
    note.style.border = '1px solid #fbbf24';
    note.style.borderRadius = '8px';
    note.innerHTML = \`
      <strong>⚠️ Nota sobre font-weight:</strong><br>
      Los tokens de Figma devuelven strings ("Regular", "SemiBold", "Bold") en lugar de números.
      Por eso usamos tokens numéricos UBITS en <code>tokens-typography.css</code>:
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><code>--weight-regular: 400</code></li>
        <li><code>--weight-semibold: 600</code></li>
        <li><code>--weight-bold: 700</code></li>
      </ul>
      Estos tokens se usan junto con los tokens de Figma para construir los text styles completos.
    \`;
    note.style.fontSize = '14px';
    note.style.color = '#92400e';
    note.style.lineHeight = '1.6';
    container.appendChild(note);
    return container;
  }
}`,...C.parameters?.docs?.source},description:{story:`Story - Uso Práctico: Text Styles Combinados

Muestra cómo aplicar los text styles combinados en CSS
aplicando los tokens individuales al mismo tiempo`,...C.parameters?.docs?.description}}};const w=["TodosLosTextStyles","Display","Heading","Body","UsoPractico"];export{S as Body,b as Display,u as Heading,x as TodosLosTextStyles,C as UsoPractico,w as __namedExportsOrder,B as default};
