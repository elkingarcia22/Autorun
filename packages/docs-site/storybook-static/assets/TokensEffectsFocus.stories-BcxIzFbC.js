const X={title:"Tokens/Effects/Focus",tags:["autodocs"],parameters:{docs:{description:{component:"Tokens de efecto Focus del sistema de diseño UBITS. Configura el efecto de foco visual con controles de posición, blur, spread y color."}},layout:"padded"}},D="var(--ubits-accent-brand, #5297F4)",_="#5297F4";function H(o,l){const v=parseInt(o.slice(1,3),16),d=parseInt(o.slice(3,5),16),e=parseInt(o.slice(5,7),16),I=v.toString(),b=d.toString(),g=e.toString(),m=l.toString(),c="rgba",z="(",y=")",u=", ";return c+z+I+u+b+u+g+u+m+y}function V(o,l,v,d,e,I,b){const g=H(I,b/100);o.style.borderColor=I,o.style.boxShadow=`${l}px ${v}px ${d}px ${e}px ${g}`}const T={render:()=>{const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.gap="24px",o.style.maxWidth="900px",o.style.padding="16px";const l=document.createElement("div");l.style.background="var(--ubits-bg-1, #ffffff)",l.style.border="none",l.style.borderRadius="12px",l.style.padding="24px",l.style.display="grid",l.style.gridTemplateColumns="1fr 1fr",l.style.gap="32px";const v=document.createElement("div"),d=document.createElement("h4");d.textContent="Preview",d.style.color="var(--ubits-fg-1-high, #1a1a1a)",d.style.fontSize="var(--font-body-md-size, 14px)",d.style.fontWeight="var(--weight-semibold, 600)",d.style.margin="0 0 16px 0";const e=document.createElement("div");e.id="focus-preview-storybook",e.style.width="120px",e.style.height="120px",e.style.background="var(--ubits-bg-2, #f3f3f4)",e.style.borderRadius="8px",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.border=`2px solid ${D}`;const I=H(_,.3);e.style.boxShadow=`0px 0px 0px 4px ${I}`;const b=document.createElement("span");b.textContent="Focus",b.style.color="var(--ubits-fg-2-medium, #6b7280)",b.style.fontSize="var(--font-body-sm-size, 13px)",e.appendChild(b),v.appendChild(d),v.appendChild(e);const g=document.createElement("div"),m=document.createElement("h4");m.textContent="Controles",m.style.color="var(--ubits-fg-1-high, #1a1a1a)",m.style.fontSize="var(--font-body-md-size, 14px)",m.style.fontWeight="var(--weight-semibold, 600)",m.style.margin="0 0 16px 0";const c=document.createElement("div");c.style.display="flex",c.style.flexDirection="column",c.style.gap="20px";const z=document.createElement("div"),y=document.createElement("label");y.textContent="Position",y.style.color="var(--ubits-fg-1-medium, #6b7280)",y.style.fontSize="var(--font-body-sm-size, 13px)",y.style.fontWeight="var(--weight-medium, 500)",y.style.marginBottom="8px",y.style.display="block";const u=document.createElement("div");u.style.display="grid",u.style.gridTemplateColumns="1fr 1fr",u.style.gap="8px";const a=document.createElement("input");a.type="number",a.id="focus-x-storybook",a.value="0",a.style.width="100%",a.style.padding="8px",a.style.background="var(--ubits-bg-2, #f3f3f4)",a.style.border="1px solid var(--ubits-border-1, #e5e7eb)",a.style.borderRadius="6px",a.style.color="var(--ubits-fg-1-high, #1a1a1a)",a.style.fontSize="var(--font-body-sm-size, 13px)";const L=document.createElement("label");L.textContent="X",L.style.color="var(--ubits-fg-2-medium, #9ca3af)",L.style.fontSize="var(--font-body-xs-size, 12px)",L.style.marginBottom="4px",L.style.display="block";const F=document.createElement("div");F.appendChild(L),F.appendChild(a);const s=document.createElement("input");s.type="number",s.id="focus-y-storybook",s.value="0",s.style.width="100%",s.style.padding="8px",s.style.background="var(--ubits-bg-2, #f3f3f4)",s.style.border="1px solid var(--ubits-border-1, #e5e7eb)",s.style.borderRadius="6px",s.style.color="var(--ubits-fg-1-high, #1a1a1a)",s.style.fontSize="var(--font-body-sm-size, 13px)";const w=document.createElement("label");w.textContent="Y",w.style.color="var(--ubits-fg-2-medium, #9ca3af)",w.style.fontSize="var(--font-body-xs-size, 12px)",w.style.marginBottom="4px",w.style.display="block";const R=document.createElement("div");R.appendChild(w),R.appendChild(s),u.appendChild(F),u.appendChild(R),z.appendChild(y),z.appendChild(u);const P=document.createElement("div"),h=document.createElement("label");h.textContent="Blur",h.style.color="var(--ubits-fg-1-medium, #6b7280)",h.style.fontSize="var(--font-body-sm-size, 13px)",h.style.fontWeight="var(--weight-medium, 500)",h.style.marginBottom="8px",h.style.display="block";const i=document.createElement("input");i.type="number",i.id="focus-blur-storybook",i.value="0",i.style.width="100%",i.style.padding="8px",i.style.background="var(--ubits-bg-2, #f3f3f4)",i.style.border="1px solid var(--ubits-border-1, #e5e7eb)",i.style.borderRadius="6px",i.style.color="var(--ubits-fg-1-high, #1a1a1a)",i.style.fontSize="var(--font-body-sm-size, 13px)",P.appendChild(h),P.appendChild(i);const G=document.createElement("div"),C=document.createElement("label");C.textContent="Spread",C.style.color="var(--ubits-fg-1-medium, #6b7280)",C.style.fontSize="var(--font-body-sm-size, 13px)",C.style.fontWeight="var(--weight-medium, 500)",C.style.marginBottom="8px",C.style.display="block";const p=document.createElement("input");p.type="number",p.id="focus-spread-storybook",p.value="4",p.style.width="100%",p.style.padding="8px",p.style.background="var(--ubits-bg-2, #f3f3f4)",p.style.border="1px solid var(--ubits-border-1, #e5e7eb)",p.style.borderRadius="6px",p.style.color="var(--ubits-fg-1-high, #1a1a1a)",p.style.fontSize="var(--font-body-sm-size, 13px)",G.appendChild(C),G.appendChild(p);const O=document.createElement("div"),E=document.createElement("label");E.textContent="Color",E.style.color="var(--ubits-fg-1-medium, #6b7280)",E.style.fontSize="var(--font-body-sm-size, 13px)",E.style.fontWeight="var(--weight-medium, 500)",E.style.marginBottom="8px",E.style.display="block";const f=document.createElement("div");f.style.display="flex",f.style.gap="8px",f.style.alignItems="center";const r=document.createElement("input");r.type="color",r.id="focus-color-storybook",r.value=_,r.style.width="50px",r.style.height="40px",r.style.padding="0",r.style.border="1px solid var(--ubits-border-1, #e5e7eb)",r.style.borderRadius="6px",r.style.cursor="pointer";const t=document.createElement("input");t.type="text",t.id="focus-color-hex-storybook",t.value=_,t.style.flex="1",t.style.padding="8px",t.style.background="var(--ubits-bg-2, #f3f3f4)",t.style.border="1px solid var(--ubits-border-1, #e5e7eb)",t.style.borderRadius="6px",t.style.color="var(--ubits-fg-1-high, #1a1a1a)",t.style.fontSize="var(--font-body-sm-size, 13px)",t.style.fontFamily="monospace";const n=document.createElement("input");n.type="number",n.id="focus-opacity-storybook",n.value="30",n.min="0",n.max="100",n.style.width="60px",n.style.padding="8px",n.style.background="var(--ubits-bg-2, #f3f3f4)",n.style.border="1px solid var(--ubits-border-1, #e5e7eb)",n.style.borderRadius="6px",n.style.color="var(--ubits-fg-1-high, #1a1a1a)",n.style.fontSize="var(--font-body-sm-size, 13px)";const S=document.createElement("span");S.textContent="%",S.style.color="var(--ubits-fg-2-medium, #9ca3af)",S.style.fontSize="var(--font-body-sm-size, 13px)",f.appendChild(r),f.appendChild(t),f.appendChild(n),f.appendChild(S),O.appendChild(E),O.appendChild(f);const x=()=>{const k=parseFloat(a.value)||0,U=parseFloat(s.value)||0,B=parseFloat(i.value)||0,W=parseFloat(p.value)||4,A=r.value,$=parseFloat(n.value)||30;V(e,k,U,B,W,A,$)};return a.addEventListener("input",x),s.addEventListener("input",x),i.addEventListener("input",x),p.addEventListener("input",x),r.addEventListener("input",()=>{t.value=r.value,x()}),t.addEventListener("input",()=>{const k=t.value.trim();/^#[0-9A-F]{6}$/i.test(k)&&(r.value=k,x())}),n.addEventListener("input",x),c.appendChild(z),c.appendChild(P),c.appendChild(G),c.appendChild(O),g.appendChild(m),g.appendChild(c),l.appendChild(v),l.appendChild(g),o.appendChild(l),x(),o}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '24px';
    container.style.maxWidth = '900px';
    container.style.padding = '16px';

    // Card principal
    const card = document.createElement('div');
    card.style.background = 'var(--ubits-bg-1, #ffffff)';
    card.style.border = 'none';
    card.style.borderRadius = '12px';
    card.style.padding = '24px';
    card.style.display = 'grid';
    card.style.gridTemplateColumns = '1fr 1fr';
    card.style.gap = '32px';

    // Preview
    const previewSection = document.createElement('div');
    const previewTitle = document.createElement('h4');
    previewTitle.textContent = 'Preview';
    previewTitle.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    previewTitle.style.fontSize = 'var(--font-body-md-size, 14px)';
    previewTitle.style.fontWeight = 'var(--weight-semibold, 600)';
    previewTitle.style.margin = '0 0 16px 0';
    const preview = document.createElement('div');
    preview.id = 'focus-preview-storybook';
    preview.style.width = '120px';
    preview.style.height = '120px';
    preview.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    preview.style.borderRadius = '8px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.border = \`2px solid \${DEFAULT_FOCUS_COLOR}\`;
    // Inicializar box-shadow con valores por defecto (se actualizará dinámicamente)
    const defaultRgba = hexToRgba(DEFAULT_FOCUS_COLOR_VALUE, 0.3);
    preview.style.boxShadow = \`0px 0px 0px 4px \${defaultRgba}\`;
    const previewText = document.createElement('span');
    previewText.textContent = 'Focus';
    previewText.style.color = 'var(--ubits-fg-2-medium, #6b7280)';
    previewText.style.fontSize = 'var(--font-body-sm-size, 13px)';
    preview.appendChild(previewText);
    previewSection.appendChild(previewTitle);
    previewSection.appendChild(preview);

    // Controles
    const controlsSection = document.createElement('div');
    const controlsTitle = document.createElement('h4');
    controlsTitle.textContent = 'Controles';
    controlsTitle.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    controlsTitle.style.fontSize = 'var(--font-body-md-size, 14px)';
    controlsTitle.style.fontWeight = 'var(--weight-semibold, 600)';
    controlsTitle.style.margin = '0 0 16px 0';
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsContainer.style.gap = '20px';

    // Position X/Y
    const positionGroup = document.createElement('div');
    const positionLabel = document.createElement('label');
    positionLabel.textContent = 'Position';
    positionLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    positionLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    positionLabel.style.fontWeight = 'var(--weight-medium, 500)';
    positionLabel.style.marginBottom = '8px';
    positionLabel.style.display = 'block';
    const positionInputs = document.createElement('div');
    positionInputs.style.display = 'grid';
    positionInputs.style.gridTemplateColumns = '1fr 1fr';
    positionInputs.style.gap = '8px';
    const xInput = document.createElement('input');
    xInput.type = 'number';
    xInput.id = 'focus-x-storybook';
    xInput.value = '0';
    xInput.style.width = '100%';
    xInput.style.padding = '8px';
    xInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    xInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    xInput.style.borderRadius = '6px';
    xInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    xInput.style.fontSize = 'var(--font-body-sm-size, 13px)';
    const xLabel = document.createElement('label');
    xLabel.textContent = 'X';
    xLabel.style.color = 'var(--ubits-fg-2-medium, #9ca3af)';
    xLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
    xLabel.style.marginBottom = '4px';
    xLabel.style.display = 'block';
    const xContainer = document.createElement('div');
    xContainer.appendChild(xLabel);
    xContainer.appendChild(xInput);
    const yInput = document.createElement('input');
    yInput.type = 'number';
    yInput.id = 'focus-y-storybook';
    yInput.value = '0';
    yInput.style.width = '100%';
    yInput.style.padding = '8px';
    yInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    yInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    yInput.style.borderRadius = '6px';
    yInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    yInput.style.fontSize = 'var(--font-body-sm-size, 13px)';
    const yLabel = document.createElement('label');
    yLabel.textContent = 'Y';
    yLabel.style.color = 'var(--ubits-fg-2-medium, #9ca3af)';
    yLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
    yLabel.style.marginBottom = '4px';
    yLabel.style.display = 'block';
    const yContainer = document.createElement('div');
    yContainer.appendChild(yLabel);
    yContainer.appendChild(yInput);
    positionInputs.appendChild(xContainer);
    positionInputs.appendChild(yContainer);
    positionGroup.appendChild(positionLabel);
    positionGroup.appendChild(positionInputs);

    // Blur
    const blurGroup = document.createElement('div');
    const blurLabel = document.createElement('label');
    blurLabel.textContent = 'Blur';
    blurLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    blurLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    blurLabel.style.fontWeight = 'var(--weight-medium, 500)';
    blurLabel.style.marginBottom = '8px';
    blurLabel.style.display = 'block';
    const blurInput = document.createElement('input');
    blurInput.type = 'number';
    blurInput.id = 'focus-blur-storybook';
    blurInput.value = '0';
    blurInput.style.width = '100%';
    blurInput.style.padding = '8px';
    blurInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    blurInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    blurInput.style.borderRadius = '6px';
    blurInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    blurInput.style.fontSize = 'var(--font-body-sm-size, 13px)';
    blurGroup.appendChild(blurLabel);
    blurGroup.appendChild(blurInput);

    // Spread
    const spreadGroup = document.createElement('div');
    const spreadLabel = document.createElement('label');
    spreadLabel.textContent = 'Spread';
    spreadLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    spreadLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    spreadLabel.style.fontWeight = 'var(--weight-medium, 500)';
    spreadLabel.style.marginBottom = '8px';
    spreadLabel.style.display = 'block';
    const spreadInput = document.createElement('input');
    spreadInput.type = 'number';
    spreadInput.id = 'focus-spread-storybook';
    spreadInput.value = '4';
    spreadInput.style.width = '100%';
    spreadInput.style.padding = '8px';
    spreadInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    spreadInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    spreadInput.style.borderRadius = '6px';
    spreadInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    spreadInput.style.fontSize = 'var(--font-body-sm-size, 13px)';
    spreadGroup.appendChild(spreadLabel);
    spreadGroup.appendChild(spreadInput);

    // Color
    const colorGroup = document.createElement('div');
    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Color';
    colorLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    colorLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    colorLabel.style.fontWeight = 'var(--weight-medium, 500)';
    colorLabel.style.marginBottom = '8px';
    colorLabel.style.display = 'block';
    const colorContainer = document.createElement('div');
    colorContainer.style.display = 'flex';
    colorContainer.style.gap = '8px';
    colorContainer.style.alignItems = 'center';
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.id = 'focus-color-storybook';
    colorPicker.value = DEFAULT_FOCUS_COLOR_VALUE;
    colorPicker.style.width = '50px';
    colorPicker.style.height = '40px';
    colorPicker.style.padding = '0';
    colorPicker.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    colorPicker.style.borderRadius = '6px';
    colorPicker.style.cursor = 'pointer';
    const colorHex = document.createElement('input');
    colorHex.type = 'text';
    colorHex.id = 'focus-color-hex-storybook';
    colorHex.value = DEFAULT_FOCUS_COLOR_VALUE;
    colorHex.style.flex = '1';
    colorHex.style.padding = '8px';
    colorHex.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    colorHex.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    colorHex.style.borderRadius = '6px';
    colorHex.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    colorHex.style.fontSize = 'var(--font-body-sm-size, 13px)';
    colorHex.style.fontFamily = 'monospace';
    const opacityInput = document.createElement('input');
    opacityInput.type = 'number';
    opacityInput.id = 'focus-opacity-storybook';
    opacityInput.value = '30';
    opacityInput.min = '0';
    opacityInput.max = '100';
    opacityInput.style.width = '60px';
    opacityInput.style.padding = '8px';
    opacityInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    opacityInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    opacityInput.style.borderRadius = '6px';
    opacityInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    opacityInput.style.fontSize = 'var(--font-body-sm-size, 13px)';
    const opacityLabel = document.createElement('span');
    opacityLabel.textContent = '%';
    opacityLabel.style.color = 'var(--ubits-fg-2-medium, #9ca3af)';
    opacityLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    colorContainer.appendChild(colorPicker);
    colorContainer.appendChild(colorHex);
    colorContainer.appendChild(opacityInput);
    colorContainer.appendChild(opacityLabel);
    colorGroup.appendChild(colorLabel);
    colorGroup.appendChild(colorContainer);

    // Event listeners
    const updateEffect = () => {
      const x = parseFloat(xInput.value) || 0;
      const y = parseFloat(yInput.value) || 0;
      const blur = parseFloat(blurInput.value) || 0;
      const spread = parseFloat(spreadInput.value) || 4;
      const color = colorPicker.value;
      const opacity = parseFloat(opacityInput.value) || 30;
      updateFocusEffect(preview, x, y, blur, spread, color, opacity);
    };
    xInput.addEventListener('input', updateEffect);
    yInput.addEventListener('input', updateEffect);
    blurInput.addEventListener('input', updateEffect);
    spreadInput.addEventListener('input', updateEffect);
    colorPicker.addEventListener('input', () => {
      colorHex.value = colorPicker.value;
      updateEffect();
    });
    colorHex.addEventListener('input', () => {
      const hex = colorHex.value.trim();
      if (/^#[0-9A-F]{6}$/i.test(hex)) {
        colorPicker.value = hex;
        updateEffect();
      }
    });
    opacityInput.addEventListener('input', updateEffect);
    controlsContainer.appendChild(positionGroup);
    controlsContainer.appendChild(blurGroup);
    controlsContainer.appendChild(spreadGroup);
    controlsContainer.appendChild(colorGroup);
    controlsSection.appendChild(controlsTitle);
    controlsSection.appendChild(controlsContainer);
    card.appendChild(previewSection);
    card.appendChild(controlsSection);
    container.appendChild(card);

    // Inicializar con valores por defecto
    updateEffect();
    return container;
  }
}`,...T.parameters?.docs?.source}}};const Y=["Interactive"];export{T as Interactive,Y as __namedExportsOrder,X as default};
