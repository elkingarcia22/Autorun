const m=[{name:".dashboard-container",properties:["display: flex","min-height: 100vh"],description:"Contenedor principal con display flex y altura mínima de viewport."},{name:".main-content",properties:["flex: 1","margin-left: 143px (sidebar)","gap: 20px","max-width: 1607px (≥ 1440px)"],description:"Contenido principal. En pantallas ≥ 1440px se centra con max-width: 1607px."},{name:".content-area",properties:["flex: 1","justify-content: center"],description:"Área de contenido con flex 1 y contenido centrado."},{name:".content-sections",properties:["display: flex","flex-direction: column","gap: 16px"],description:"Contenedor de secciones con display flex en columna y gap de 16px."}],x=[{name:".section-single",properties:["display: flex","width: 100%"],description:"Una columna. Widget ocupa 100% del ancho."},{name:".section-dual",properties:["display: flex","gap: 20px","flex-direction: column (< 1024px)","gap: 16px (móvil)"],description:"Dos columnas. En móvil (< 1024px) se apila verticalmente con gap reducido."},{name:".section-triple",properties:["display: flex","gap: 20px","flex-direction: column (< 1024px)"],description:"Tres columnas. En móvil se apila verticalmente."},{name:".section-quad",properties:["display: flex","gap: 20px","flex-direction: column (< 1024px)"],description:"Cuatro columnas. En móvil se apila verticalmente."}],y=[{name:"Entre secciones",value:"gap: 16px",note:"20px entre SubNav y Content Area"},{name:"Entre widgets (desktop)",value:"gap: 20px",note:""},{name:"Entre widgets (móvil)",value:"gap: 16px",note:""},{name:"Sidebar",value:"width: 143px",note:"24px + 96px + 23px gap"},{name:"Max-width contenido",value:"1607px",note:"En pantallas ≥ 1440px"}],g={title:"Tokens/Grid y Breakpoints/Sistema de Grid",tags:["autodocs"]};function l(e){const t=document.createElement("div");t.style.display="grid",t.style.gridTemplateColumns="300px 1fr",t.style.alignItems="center",t.style.gap="16px",t.style.padding="12px 16px",t.style.border="1px solid var(--ubits-border-1, #e5e7eb)",t.style.borderRadius="8px",t.style.background="var(--ubits-bg-1, #ffffff)";const r=document.createElement("code");r.textContent=e.name,r.style.fontSize="13px",r.style.color="var(--ubits-fg-1-high, #1a1a1a)",r.style.fontWeight="600";const a=document.createElement("div");a.style.display="flex",a.style.flexDirection="column",a.style.gap="4px";const n=document.createElement("p");n.textContent=e.description,n.style.fontSize="13px",n.style.color="var(--ubits-fg-1-medium, #6b7280)",n.style.margin="0 0 8px 0",n.style.lineHeight="1.5";const i=document.createElement("div");return i.style.display="flex",i.style.flexWrap="wrap",i.style.gap="6px",e.properties.forEach(c=>{const o=document.createElement("code");o.textContent=c,o.style.fontSize="11px",o.style.color="var(--ubits-fg-1-medium, #6b7280)",o.style.background="var(--ubits-bg-2, #f9fafb)",o.style.padding="2px 6px",o.style.borderRadius="4px",i.appendChild(o)}),a.appendChild(n),a.appendChild(i),t.appendChild(r),t.appendChild(a),t}function u(e){const t=document.createElement("div");t.style.display="grid",t.style.gridTemplateColumns="200px 1fr",t.style.alignItems="center",t.style.gap="16px",t.style.padding="12px 16px",t.style.border="1px solid var(--ubits-border-1, #e5e7eb)",t.style.borderRadius="8px",t.style.background="var(--ubits-bg-1, #ffffff)";const r=document.createElement("strong");r.textContent=e.name+":",r.style.fontSize="13px",r.style.color="var(--ubits-fg-1-high, #1a1a1a)";const a=document.createElement("div");a.style.display="flex",a.style.alignItems="center",a.style.gap="8px";const n=document.createElement("code");if(n.textContent=e.value,n.style.fontSize="12px",n.style.color="var(--ubits-fg-1-medium, #6b7280)",n.style.background="var(--ubits-bg-2, #f9fafb)",n.style.padding="2px 6px",n.style.borderRadius="4px",a.appendChild(n),e.note){const i=document.createElement("span");i.textContent=`(${e.note})`,i.style.fontSize="12px",i.style.color="var(--ubits-fg-1-medium, #6b7280)",a.appendChild(i)}return t.appendChild(r),t.appendChild(a),t}const s={render:()=>{const e=document.createElement("div");return e.style.display="grid",e.style.gap="12px",e.style.padding="16px",e.style.maxWidth="900px",m.forEach(t=>{e.appendChild(l(t))}),e}},p={render:()=>{const e=document.createElement("div");return e.style.display="grid",e.style.gap="12px",e.style.padding="16px",e.style.maxWidth="900px",x.forEach(t=>{e.appendChild(l(t))}),e}},d={render:()=>{const e=document.createElement("div");return e.style.display="grid",e.style.gap="12px",e.style.padding="16px",e.style.maxWidth="900px",y.forEach(t=>{e.appendChild(u(t))}),e}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';
    GRID_CONTAINERS.forEach(item => {
      container.appendChild(gridItem(item));
    });
    return container;
  }
}`,...s.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';
    GRID_SECTIONS.forEach(item => {
      container.appendChild(gridItem(item));
    });
    return container;
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';
    GRID_SPACING.forEach(item => {
      container.appendChild(spacingItem(item));
    });
    return container;
  }
}`,...d.parameters?.docs?.source}}};const f=["Contenedores","Secciones","Espaciado"];export{s as Contenedores,d as Espaciado,p as Secciones,f as __namedExportsOrder,g as default};
