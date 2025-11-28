import{c as _}from"./utils-QDDdDBjb.js";const J={title:"Tokens UBITS/04. Effects",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Tokens para efectos visuales: elevation (sombras), focus (anillos de enfoque) y floating (elevacion flotante). Los efectos de elevation tienen estados Default y Hover, focus tiene propiedades configurables (position, blur, spread, color), y floating usa tokens de Figma con dos sombras combinadas."}}}};function R(e,o,t=0,p=1,n=2,c=0,i="rgba(0, 0, 0, 0.12)"){const a=document.createElement("div");a.style.display="flex",a.style.gap="24px",a.style.marginBottom="32px",a.style.padding="20px",a.style.backgroundColor="#f9fafb",a.style.border="1px solid #e5e7eb",a.style.borderRadius="12px";const m=document.createElement("div");m.style.flex="0 0 200px";const f=document.createElement("h4");f.textContent="Preview",f.style.fontSize="16px",f.style.fontWeight="600",f.style.marginBottom="12px",f.style.color="#303a47",m.appendChild(f);const l=document.createElement("div");l.textContent=e,l.style.width="120px",l.style.height="120px",l.style.backgroundColor="#f3f3f4",l.style.border="1px solid #d0d2d5",l.style.borderRadius="8px",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.fontSize="14px",l.style.fontWeight="500",l.style.color="#303a47";const I=`${t}px ${p}px ${n}px ${c}px ${i}`;l.style.boxShadow=I,m.appendChild(l);const v=document.createElement("div");v.style.flex="1";const $=document.createElement("h4");$.textContent="Controles",$.style.fontSize="16px",$.style.fontWeight="600",$.style.marginBottom="12px",$.style.color="#303a47",v.appendChild($);const V=document.createElement("div");V.style.marginBottom="16px";const C=document.createElement("label");C.textContent="Position",C.style.display="block",C.style.fontSize="14px",C.style.fontWeight="500",C.style.marginBottom="8px",C.style.color="#303a47",V.appendChild(C);const S=document.createElement("div");S.style.display="flex",S.style.gap="12px";const x=document.createElement("input");x.type="number",x.value=t.toString(),x.style.width="80px",x.style.padding="6px 8px",x.style.border="1px solid #d0d2d5",x.style.borderRadius="6px",x.style.fontSize="14px",x.addEventListener("input",()=>{const b=parseFloat(x.value)||0,E=parseFloat(s.value)||0,w=parseFloat(r.value)||0,T=parseFloat(d.value)||0,B=u.value,F=`${b}px ${E}px ${w}px ${T}px ${B}`;l.style.boxShadow=F});const h=document.createElement("label");h.textContent="X",h.style.fontSize="12px",h.style.color="#5c646f",h.style.marginRight="4px",S.appendChild(h),S.appendChild(x);const s=document.createElement("input");s.type="number",s.value=p.toString(),s.style.width="80px",s.style.padding="6px 8px",s.style.border="1px solid #d0d2d5",s.style.borderRadius="6px",s.style.fontSize="14px",s.addEventListener("input",()=>{const b=parseFloat(x.value)||0,E=parseFloat(s.value)||0,w=parseFloat(r.value)||0,T=parseFloat(d.value)||0,B=u.value,F=`${b}px ${E}px ${w}px ${T}px ${B}`;l.style.boxShadow=F});const z=document.createElement("label");z.textContent="Y",z.style.fontSize="12px",z.style.color="#5c646f",z.style.marginLeft="12px",z.style.marginRight="4px",S.appendChild(z),S.appendChild(s),V.appendChild(S);const g=document.createElement("div");g.style.marginBottom="16px";const y=document.createElement("label");y.textContent="Blur",y.style.display="block",y.style.fontSize="14px",y.style.fontWeight="500",y.style.marginBottom="8px",y.style.color="#303a47",g.appendChild(y);const r=document.createElement("input");r.type="number",r.value=n.toString(),r.style.width="100px",r.style.padding="6px 8px",r.style.border="1px solid #d0d2d5",r.style.borderRadius="6px",r.style.fontSize="14px",r.addEventListener("input",()=>{const b=parseFloat(x.value)||0,E=parseFloat(s.value)||0,w=parseFloat(r.value)||0,T=parseFloat(d.value)||0,B=u.value,F=`${b}px ${E}px ${w}px ${T}px ${B}`;l.style.boxShadow=F}),g.appendChild(r);const X=document.createElement("div");X.style.marginBottom="16px";const W=document.createElement("label");W.textContent="Spread",W.style.display="block",W.style.fontSize="14px",W.style.fontWeight="500",W.style.marginBottom="8px",W.style.color="#303a47",X.appendChild(W);const d=document.createElement("input");d.type="number",d.value=c.toString(),d.style.width="100px",d.style.padding="6px 8px",d.style.border="1px solid #d0d2d5",d.style.borderRadius="6px",d.style.fontSize="14px",d.addEventListener("input",()=>{const b=parseFloat(x.value)||0,E=parseFloat(s.value)||0,w=parseFloat(r.value)||0,T=parseFloat(d.value)||0,B=u.value,F=`${b}px ${E}px ${w}px ${T}px ${B}`;l.style.boxShadow=F}),X.appendChild(d);const L=document.createElement("div");L.style.marginBottom="16px";const D=document.createElement("label");D.textContent="Color",D.style.display="block",D.style.fontSize="14px",D.style.fontWeight="500",D.style.marginBottom="8px",D.style.color="#303a47",L.appendChild(D);const P=document.createElement("div");P.style.display="flex",P.style.alignItems="center",P.style.gap="8px";const H=document.createElement("div");H.style.width="32px",H.style.height="32px",H.style.borderRadius="4px",H.style.border="1px solid #d0d2d5",H.style.backgroundColor=i,P.appendChild(H);const u=document.createElement("input");u.type="text",u.value=i,u.style.flex="1",u.style.padding="6px 8px",u.style.border="1px solid #d0d2d5",u.style.borderRadius="6px",u.style.fontSize="14px",u.style.fontFamily="monospace",u.addEventListener("input",()=>{H.style.backgroundColor=u.value;const b=parseFloat(x.value)||0,E=parseFloat(s.value)||0,w=parseFloat(r.value)||0,T=parseFloat(d.value)||0,B=u.value,F=`${b}px ${E}px ${w}px ${T}px ${B}`;l.style.boxShadow=F}),P.appendChild(u);const k=document.createElement("input");k.type="number",k.value="30",k.style.width="60px",k.style.padding="6px 8px",k.style.border="1px solid #d0d2d5",k.style.borderRadius="6px",k.style.fontSize="14px",k.style.marginLeft="8px",P.appendChild(k);const O=document.createElement("label");return O.textContent="%",O.style.fontSize="14px",O.style.color="#5c646f",P.appendChild(O),L.appendChild(P),v.appendChild(V),v.appendChild(g),v.appendChild(X),v.appendChild(L),a.appendChild(m),a.appendChild(v),a}const Y={render:()=>{const e=document.createElement("div");e.style.padding="24px",e.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Effects - Elevation y Focus",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="16px",e.appendChild(o);const t=document.createElement("p");return t.textContent="Tokens para efectos visuales: elevation (sombras) y focus (anillos de enfoque). Los efectos de elevation tienen estados Default y Hover, mientras que focus tiene propiedades configurables.",t.style.fontSize="16px",t.style.color="#5c646f",t.style.marginBottom="32px",t.style.lineHeight="1.6",e.appendChild(t),e}},q={render:()=>{const e=document.createElement("div");e.style.padding="24px",e.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Elevation - Sombras",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="24px",e.appendChild(o);const t=document.createElement("div");t.style.marginBottom="40px";const p=document.createElement("h3");p.textContent="Default",p.style.fontSize="20px",p.style.fontWeight="600",p.style.marginBottom="16px",p.style.color="#303a47",t.appendChild(p);const n=R("Default","0px 1px 2px 0px rgba(0, 0, 0, 0.12)",0,1,2,0,"rgba(0, 0, 0, 0.12)");t.appendChild(n),e.appendChild(t);const c=document.createElement("div");c.style.marginBottom="40px";const i=document.createElement("h3");i.textContent="Hover",i.style.fontSize="20px",i.style.fontWeight="600",i.style.marginBottom="16px",i.style.color="#303a47",c.appendChild(i);const a=R("Hover","0px 2px 4px 0px rgba(0, 0, 0, 0.16)",0,2,4,0,"rgba(0, 0, 0, 0.16)");c.appendChild(a),e.appendChild(c);const m=document.createElement("div");m.style.marginTop="40px",m.style.padding="20px",m.style.backgroundColor="#f9fafb",m.style.border="1px solid #e5e7eb",m.style.borderRadius="12px";const f=document.createElement("h3");f.textContent="Tokens Existentes",f.style.fontSize="18px",f.style.fontWeight="600",f.style.marginBottom="16px",f.style.color="#303a47",m.appendChild(f);const l=document.createElement("div");l.style.display="flex",l.style.flexDirection="column",l.style.gap="12px";const I=_("--modifiers-normal-effects-elevation-overlay","light",{showVariable:!0,showValue:!0,width:"100%"});return l.appendChild(I),m.appendChild(l),e.appendChild(m),e}},G={render:()=>{const e=document.createElement("div");e.style.padding="24px",e.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Focus - Anillos de Enfoque",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="24px",e.appendChild(o);const t=document.createElement("div");t.style.marginBottom="40px";const p=R("Focus","0px 0px 0px 4px rgba(82, 151, 244, 0.3)",0,0,0,4,"rgba(82, 151, 244, 0.3)");t.appendChild(p),e.appendChild(t);const n=document.createElement("div");n.style.marginTop="40px",n.style.padding="20px",n.style.backgroundColor="#f9fafb",n.style.border="1px solid #e5e7eb",n.style.borderRadius="12px";const c=document.createElement("h3");c.textContent="Tokens Existentes",c.style.fontSize="18px",c.style.fontWeight="600",c.style.marginBottom="16px",c.style.color="#303a47",n.appendChild(c);const i=document.createElement("div");i.style.display="flex",i.style.flexDirection="column",i.style.gap="12px";const a=_("--modifiers-normal-focus-color","light",{showVariable:!0,showValue:!0,width:"100%"});return i.appendChild(a),n.appendChild(i),e.appendChild(n),e}},U={render:()=>{const e=document.createElement("div");e.style.padding="24px",e.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Interactive - Elevation States",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="24px",e.appendChild(o);const t=document.createElement("p");t.textContent="Estados interactivos de elevation: Default y Hover. Cada estado tiene sus propias propiedades de sombra configurables.",t.style.fontSize="16px",t.style.color="#5c646f",t.style.marginBottom="32px",t.style.lineHeight="1.6",e.appendChild(t);const p=document.createElement("div");p.style.marginBottom="40px";const n=document.createElement("h3");n.textContent="Default",n.style.fontSize="20px",n.style.fontWeight="600",n.style.marginBottom="16px",n.style.color="#303a47",p.appendChild(n);const c=R("Default","0px 1px 2px 0px rgba(0, 0, 0, 0.12)",0,1,2,0,"rgba(0, 0, 0, 0.12)");p.appendChild(c),e.appendChild(p);const i=document.createElement("div");i.style.marginBottom="40px";const a=document.createElement("h3");a.textContent="Hover",a.style.fontSize="20px",a.style.fontWeight="600",a.style.marginBottom="16px",a.style.color="#303a47",i.appendChild(a);const m=R("Hover","0px 2px 4px 0px rgba(0, 0, 0, 0.16)",0,2,4,0,"rgba(0, 0, 0, 0.16)");return i.appendChild(m),e.appendChild(i),e}},A={render:()=>{const e=document.createElement("div");e.style.padding="24px",e.style.maxWidth="1400px";const o=document.createElement("h2");o.textContent="Floating - Elevacion Flotante",o.style.fontSize="24px",o.style.fontWeight="700",o.style.marginBottom="24px",e.appendChild(o);const t=document.createElement("p");t.textContent="Elevacion flotante construida con tokens de Figma. Usa dos sombras combinadas (floating-0 y floating-1) para crear un efecto de profundidad.",t.style.fontSize="16px",t.style.color="#5c646f",t.style.marginBottom="32px",t.style.lineHeight="1.6",e.appendChild(t);const p=document.documentElement,n=d=>getComputedStyle(p).getPropertyValue(d).trim(),c=parseFloat(n("--modifiers-normal-elevation-floating-0-x"))||0,i=parseFloat(n("--modifiers-normal-elevation-floating-0-y"))||14,a=parseFloat(n("--modifiers-normal-elevation-floating-0-blur"))||28.8,m=parseFloat(n("--modifiers-normal-elevation-floating-0-spread"))||0,f=n("--modifiers-normal-elevation-floating-0-color")||"#0000003d",l=parseFloat(n("--modifiers-normal-elevation-floating-1-x"))||0,I=parseFloat(n("--modifiers-normal-elevation-floating-1-y"))||0,v=parseFloat(n("--modifiers-normal-elevation-floating-1-blur"))||8,$=parseFloat(n("--modifiers-normal-elevation-floating-1-spread"))||0,V=n("--modifiers-normal-elevation-floating-1-color")||"#00000033",C=`${c}px ${i}px ${a}px ${m}px ${f}`,S=`${l}px ${I}px ${v}px ${$}px ${V}`,x=`${C}, ${S}`,h=document.createElement("div");h.style.marginBottom="40px";const s=document.createElement("h3");s.textContent="Floating",s.style.fontSize="20px",s.style.fontWeight="600",s.style.marginBottom="16px",s.style.color="#303a47",h.appendChild(s);const z=R("Floating",x,c,i,a,m,f);h.appendChild(z),e.appendChild(h);const g=document.createElement("div");g.style.marginTop="40px",g.style.padding="20px",g.style.backgroundColor="#f9fafb",g.style.border="1px solid #e5e7eb",g.style.borderRadius="12px";const y=document.createElement("h3");y.textContent="Tokens de Figma",y.style.fontSize="18px",y.style.fontWeight="600",y.style.marginBottom="16px",y.style.color="#303a47",g.appendChild(y);const r=document.createElement("div");return r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",["--modifiers-normal-elevation-floating-0-x","--modifiers-normal-elevation-floating-0-y","--modifiers-normal-elevation-floating-0-blur","--modifiers-normal-elevation-floating-0-spread","--modifiers-normal-elevation-floating-0-color"].forEach(d=>{const L=_(d,"light",{showVariable:!0,showValue:!0,width:"100%"});r.appendChild(L)}),["--modifiers-normal-elevation-floating-1-x","--modifiers-normal-elevation-floating-1-y","--modifiers-normal-elevation-floating-1-blur","--modifiers-normal-elevation-floating-1-spread","--modifiers-normal-elevation-floating-1-color"].forEach(d=>{const L=_(d,"light",{showVariable:!0,showValue:!0,width:"100%"});r.appendChild(L)}),g.appendChild(r),e.appendChild(g),e}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Effects - Elevation y Focus';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const description = document.createElement('p');
    description.textContent = 'Tokens para efectos visuales: elevation (sombras) y focus (anillos de enfoque). Los efectos de elevation tienen estados Default y Hover, mientras que focus tiene propiedades configurables.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);
    return container;
  }
}`,...Y.parameters?.docs?.source},description:{story:"Story principal - Todos los efectos",...Y.parameters?.docs?.description}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Elevation - Sombras';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '24px';
    container.appendChild(title);

    // Default state
    const defaultSection = document.createElement('div');
    defaultSection.style.marginBottom = '40px';
    const defaultTitle = document.createElement('h3');
    defaultTitle.textContent = 'Default';
    defaultTitle.style.fontSize = '20px';
    defaultTitle.style.fontWeight = '600';
    defaultTitle.style.marginBottom = '16px';
    defaultTitle.style.color = '#303a47';
    defaultSection.appendChild(defaultTitle);

    // Default shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.12)
    const defaultPreview = createShadowPreview('Default', '0px 1px 2px 0px rgba(0, 0, 0, 0.12)', 0, 1, 2, 0, 'rgba(0, 0, 0, 0.12)');
    defaultSection.appendChild(defaultPreview);
    container.appendChild(defaultSection);

    // Hover state
    const hoverSection = document.createElement('div');
    hoverSection.style.marginBottom = '40px';
    const hoverTitle = document.createElement('h3');
    hoverTitle.textContent = 'Hover';
    hoverTitle.style.fontSize = '20px';
    hoverTitle.style.fontWeight = '600';
    hoverTitle.style.marginBottom = '16px';
    hoverTitle.style.color = '#303a47';
    hoverSection.appendChild(hoverTitle);

    // Hover shadow: similar pero más pronunciada
    const hoverPreview = createShadowPreview('Hover', '0px 2px 4px 0px rgba(0, 0, 0, 0.16)', 0, 2, 4, 0, 'rgba(0, 0, 0, 0.16)');
    hoverSection.appendChild(hoverPreview);
    container.appendChild(hoverSection);

    // Tokens existentes
    const tokensSection = document.createElement('div');
    tokensSection.style.marginTop = '40px';
    tokensSection.style.padding = '20px';
    tokensSection.style.backgroundColor = '#f9fafb';
    tokensSection.style.border = '1px solid #e5e7eb';
    tokensSection.style.borderRadius = '12px';
    const tokensTitle = document.createElement('h3');
    tokensTitle.textContent = 'Tokens Existentes';
    tokensTitle.style.fontSize = '18px';
    tokensTitle.style.fontWeight = '600';
    tokensTitle.style.marginBottom = '16px';
    tokensTitle.style.color = '#303a47';
    tokensSection.appendChild(tokensTitle);
    const tokensList = document.createElement('div');
    tokensList.style.display = 'flex';
    tokensList.style.flexDirection = 'column';
    tokensList.style.gap = '12px';

    // Token de shadow opacity
    const shadowToken = createColorSwatch('--modifiers-normal-effects-elevation-overlay', 'light', {
      showVariable: true,
      showValue: true,
      width: '100%'
    });
    tokensList.appendChild(shadowToken);
    tokensSection.appendChild(tokensList);
    container.appendChild(tokensSection);
    return container;
  }
}`,...q.parameters?.docs?.source},description:{story:"Story - Elevation",...q.parameters?.docs?.description}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Focus - Anillos de Enfoque';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '24px';
    container.appendChild(title);

    // Focus preview
    const focusSection = document.createElement('div');
    focusSection.style.marginBottom = '40px';
    const focusPreview = createShadowPreview('Focus', '0px 0px 0px 4px rgba(82, 151, 244, 0.3)', 0, 0, 0, 4, 'rgba(82, 151, 244, 0.3)');
    focusSection.appendChild(focusPreview);
    container.appendChild(focusSection);

    // Token existente
    const tokensSection = document.createElement('div');
    tokensSection.style.marginTop = '40px';
    tokensSection.style.padding = '20px';
    tokensSection.style.backgroundColor = '#f9fafb';
    tokensSection.style.border = '1px solid #e5e7eb';
    tokensSection.style.borderRadius = '12px';
    const tokensTitle = document.createElement('h3');
    tokensTitle.textContent = 'Tokens Existentes';
    tokensTitle.style.fontSize = '18px';
    tokensTitle.style.fontWeight = '600';
    tokensTitle.style.marginBottom = '16px';
    tokensTitle.style.color = '#303a47';
    tokensSection.appendChild(tokensTitle);
    const tokensList = document.createElement('div');
    tokensList.style.display = 'flex';
    tokensList.style.flexDirection = 'column';
    tokensList.style.gap = '12px';

    // Token de focus ring
    const focusToken = createColorSwatch('--modifiers-normal-focus-color', 'light', {
      showVariable: true,
      showValue: true,
      width: '100%'
    });
    tokensList.appendChild(focusToken);
    tokensSection.appendChild(tokensList);
    container.appendChild(tokensSection);
    return container;
  }
}`,...G.parameters?.docs?.source},description:{story:"Story - Focus",...G.parameters?.docs?.description}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Interactive - Elevation States';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '24px';
    container.appendChild(title);
    const description = document.createElement('p');
    description.textContent = 'Estados interactivos de elevation: Default y Hover. Cada estado tiene sus propias propiedades de sombra configurables.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);

    // Default state
    const defaultSection = document.createElement('div');
    defaultSection.style.marginBottom = '40px';
    const defaultTitle = document.createElement('h3');
    defaultTitle.textContent = 'Default';
    defaultTitle.style.fontSize = '20px';
    defaultTitle.style.fontWeight = '600';
    defaultTitle.style.marginBottom = '16px';
    defaultTitle.style.color = '#303a47';
    defaultSection.appendChild(defaultTitle);
    const defaultPreview = createShadowPreview('Default', '0px 1px 2px 0px rgba(0, 0, 0, 0.12)', 0, 1, 2, 0, 'rgba(0, 0, 0, 0.12)');
    defaultSection.appendChild(defaultPreview);
    container.appendChild(defaultSection);

    // Hover state
    const hoverSection = document.createElement('div');
    hoverSection.style.marginBottom = '40px';
    const hoverTitle = document.createElement('h3');
    hoverTitle.textContent = 'Hover';
    hoverTitle.style.fontSize = '20px';
    hoverTitle.style.fontWeight = '600';
    hoverTitle.style.marginBottom = '16px';
    hoverTitle.style.color = '#303a47';
    hoverSection.appendChild(hoverTitle);
    const hoverPreview = createShadowPreview('Hover', '0px 2px 4px 0px rgba(0, 0, 0, 0.16)', 0, 2, 4, 0, 'rgba(0, 0, 0, 0.16)');
    hoverSection.appendChild(hoverPreview);
    container.appendChild(hoverSection);
    return container;
  }
}`,...U.parameters?.docs?.source},description:{story:"Story - Interactive (Elevation con estados Default y Hover)",...U.parameters?.docs?.description}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Floating - Elevacion Flotante';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '24px';
    container.appendChild(title);
    const description = document.createElement('p');
    description.textContent = 'Elevacion flotante construida con tokens de Figma. Usa dos sombras combinadas (floating-0 y floating-1) para crear un efecto de profundidad.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);

    // Obtener valores de tokens de Figma
    const root = document.documentElement;
    const getToken = (token: string): string => {
      return getComputedStyle(root).getPropertyValue(token).trim();
    };
    const floating0X = parseFloat(getToken('--modifiers-normal-elevation-floating-0-x')) || 0;
    const floating0Y = parseFloat(getToken('--modifiers-normal-elevation-floating-0-y')) || 14;
    const floating0Blur = parseFloat(getToken('--modifiers-normal-elevation-floating-0-blur')) || 28.8;
    const floating0Spread = parseFloat(getToken('--modifiers-normal-elevation-floating-0-spread')) || 0;
    const floating0Color = getToken('--modifiers-normal-elevation-floating-0-color') || '#0000003d';
    const floating1X = parseFloat(getToken('--modifiers-normal-elevation-floating-1-x')) || 0;
    const floating1Y = parseFloat(getToken('--modifiers-normal-elevation-floating-1-y')) || 0;
    const floating1Blur = parseFloat(getToken('--modifiers-normal-elevation-floating-1-blur')) || 8;
    const floating1Spread = parseFloat(getToken('--modifiers-normal-elevation-floating-1-spread')) || 0;
    const floating1Color = getToken('--modifiers-normal-elevation-floating-1-color') || '#00000033';

    // Construir sombra combinada
    const shadow0 = \`\${floating0X}px \${floating0Y}px \${floating0Blur}px \${floating0Spread}px \${floating0Color}\`;
    const shadow1 = \`\${floating1X}px \${floating1Y}px \${floating1Blur}px \${floating1Spread}px \${floating1Color}\`;
    const combinedShadow = \`\${shadow0}, \${shadow1}\`;

    // Preview principal
    const floatingSection = document.createElement('div');
    floatingSection.style.marginBottom = '40px';
    const floatingTitle = document.createElement('h3');
    floatingTitle.textContent = 'Floating';
    floatingTitle.style.fontSize = '20px';
    floatingTitle.style.fontWeight = '600';
    floatingTitle.style.marginBottom = '16px';
    floatingTitle.style.color = '#303a47';
    floatingSection.appendChild(floatingTitle);

    // Crear preview con los valores de los tokens
    const floatingPreview = createShadowPreview('Floating', combinedShadow, floating0X, floating0Y, floating0Blur, floating0Spread, floating0Color);
    floatingSection.appendChild(floatingPreview);
    container.appendChild(floatingSection);

    // Tokens de Figma
    const tokensSection = document.createElement('div');
    tokensSection.style.marginTop = '40px';
    tokensSection.style.padding = '20px';
    tokensSection.style.backgroundColor = '#f9fafb';
    tokensSection.style.border = '1px solid #e5e7eb';
    tokensSection.style.borderRadius = '12px';
    const tokensTitle = document.createElement('h3');
    tokensTitle.textContent = 'Tokens de Figma';
    tokensTitle.style.fontSize = '18px';
    tokensTitle.style.fontWeight = '600';
    tokensTitle.style.marginBottom = '16px';
    tokensTitle.style.color = '#303a47';
    tokensSection.appendChild(tokensTitle);
    const tokensList = document.createElement('div');
    tokensList.style.display = 'flex';
    tokensList.style.flexDirection = 'column';
    tokensList.style.gap = '12px';

    // Tokens floating-0
    const floating0Tokens = ['--modifiers-normal-elevation-floating-0-x', '--modifiers-normal-elevation-floating-0-y', '--modifiers-normal-elevation-floating-0-blur', '--modifiers-normal-elevation-floating-0-spread', '--modifiers-normal-elevation-floating-0-color'];
    floating0Tokens.forEach(token => {
      const tokenElement = createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      });
      tokensList.appendChild(tokenElement);
    });

    // Tokens floating-1
    const floating1Tokens = ['--modifiers-normal-elevation-floating-1-x', '--modifiers-normal-elevation-floating-1-y', '--modifiers-normal-elevation-floating-1-blur', '--modifiers-normal-elevation-floating-1-spread', '--modifiers-normal-elevation-floating-1-color'];
    floating1Tokens.forEach(token => {
      const tokenElement = createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      });
      tokensList.appendChild(tokenElement);
    });
    tokensSection.appendChild(tokensList);
    container.appendChild(tokensSection);
    return container;
  }
}`,...A.parameters?.docs?.source},description:{story:"Story - Floating (Elevation flotante con tokens de Figma)",...A.parameters?.docs?.description}}};const K=["Docs","Elevation","Focus","Interactive","Floating"];export{Y as Docs,q as Elevation,A as Floating,G as Focus,U as Interactive,K as __namedExportsOrder,J as default};
