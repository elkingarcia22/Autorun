import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";function b(r,t=!1){if(!r)return"";let e=r;e.startsWith("fa-")||(e=`fa-${e}`);const a=t?"fas":"far";if(e.startsWith("far ")||e.startsWith("fas ")){const i=e.replace(/^(far|fas)\s+/,"");return`<i class="${a} ${i}"></i>`}return`<i class="${a} ${e}"></i>`}function S(r){const{segments:t,activeSegmentId:e,className:a=""}=r;if(!t||t.length===0)return'<div class="ubits-segment-control"></div>';let i=e;if(!i){const s=t.find(o=>o.active);i=s?s.id:t[0].id}const n=t.map(s=>{const o=s.id===i,d=o?"ubits-segment--active":"",l=s.disabled?"ubits-segment--disabled":"",f=["ubits-segment",d,l].filter(Boolean).join(" "),m=s.icon?b(s.icon,o):"";return`
      <button 
        class="${f}" 
        data-segment-id="${s.id}"
        ${s.disabled?"disabled":""}
        ${s.url?`data-url="${s.url}"`:""}
        ${s.onClick?'data-has-click-handler="true"':""}
      >
        ${m}
        <span class="ubits-segment__label">${s.label}</span>
      </button>
    `}).join("");return`
    <div class="${["ubits-segment-control",a].filter(Boolean).join(" ")}">
      ${n}
    </div>
  `.trim()}function u(r,t){r.querySelectorAll(".ubits-segment[data-listener-attached]").forEach(n=>{const c=n.cloneNode(!0);n.parentNode?.replaceChild(c,n)});const a=r.querySelectorAll(".ubits-segment:not(.ubits-segment--disabled)"),i=n=>{const c=n.getAttribute("data-segment-id"),s=n.getAttribute("data-url");if(r.querySelectorAll(".ubits-segment").forEach(l=>{l.classList.remove("ubits-segment--active")}),n.classList.add("ubits-segment--active"),r.querySelectorAll(".ubits-segment").forEach(l=>{const f=l.classList.contains("ubits-segment--active"),m=l.querySelector("i");if(m){const h=m.className.replace(/^(far|fas)\s+/,"").replace(/^fa-/,""),v=f?"fas":"far";m.className=`${v} fa-${h}`}}),s){window.location.href=s;return}const o=t.segments.find(l=>l.id===c);o&&o.onClick&&o.onClick(new MouseEvent("click")),t.onSegmentChange&&t.onSegmentChange(c||"",n);const d=new CustomEvent("segmentControlSegmentClick",{detail:{segmentId:c,segmentElement:n}});document.dispatchEvent(d)};a.forEach(n=>{n.setAttribute("data-listener-attached","true"),n.addEventListener("click",c=>{c.preventDefault(),i(n)})})}function y(r,t){const e=t&&document.getElementById(t)||document.createElement("div");return t&&!e.id&&(e.id=t),e.innerHTML=S(r),requestAnimationFrame(()=>{const a=e.querySelector(".ubits-segment-control");u(a||e,r)}),e}const x={title:"Navegación/Segment Control",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Componente Segment Control UBITS de navegación horizontal con soporte para iconos opcionales. Similar a Tabs pero con contenedor con padding interno de 4px y altura de 30px. El segmento activo muestra fondo blanco, icono solid oscuro, texto en negrita. Los segmentos inactivos muestran icono regular y texto en gris claro sin fondo."}}},argTypes:{segments:{control:{type:"object"},description:"Array de segmentos a mostrar",table:{type:{summary:"SegmentItem[]"}}},activeSegmentId:{control:{type:"text"},description:"ID del segmento activo",table:{type:{summary:"string"}}},showIcons:{control:{type:"boolean"},description:"Mostrar iconos en los segmentos",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},segmentCount:{control:{type:"number",min:1,max:10,step:1},description:"Número de segmentos a mostrar",table:{type:{summary:"number"},defaultValue:{summary:"5"}}}}};function p(r=5,t=!0){const e=["fa-th","fa-chart-line","fa-cog","fa-star","fa-book","fa-home","fa-user","fa-bell","fa-envelope","fa-calendar"],a=["Label 1","Label 2","Label 3","Label 4","Label 5","Label 6","Label 7","Label 8","Label 9","Label 10"];return Array.from({length:r},(i,n)=>({id:`segment-${n+1}`,label:a[n]||`Label ${n+1}`,icon:t?`far ${e[n]||"fa-th"}`:void 0,active:n===0}))}const g={args:{segments:p(5,!0),activeSegmentId:"segment-1",showIcons:!0,segmentCount:5},render:r=>{const t=r.showIcons!==!1,e=p(r.segmentCount||5,t),a=r.activeSegmentId||e[0]?.id;e.forEach(o=>{o.active=o.id===a});const i=document.createElement("div");i.style.cssText=`
      width: 100%;
      max-width: 1200px;
      background: var(--modifiers-normal-color-light-bg-1);
    `;const n=document.createElement("div");n.id="segment-control-story-container",n.style.cssText=`
      width: 100%;
    `,i.appendChild(n);const c=document.createElement("div");c.id="segment-control-info-panel",c.style.cssText=`
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `,e.find(o=>o.id===a);const s=o=>{const d=e.find(l=>l.id===o);c.innerHTML=`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Segment Control</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Segmento Activo:</strong> ${d?d.label:o}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Segmentos totales:</strong> ${e.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Con iconos:</strong> ${t?"Sí":"No"}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${e.map(l=>l.id).join(", ")}</div>
        </div>
      `};return s(a),i.appendChild(c),requestAnimationFrame(()=>{try{n.innerHTML="",y({segments:e,activeSegmentId:a,onSegmentChange:(o,d)=>{s(o)}},n.id)}catch(o){console.error("Error creando Segment Control:",o)}}),i}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    segments: generateSegments(5, true),
    activeSegmentId: 'segment-1',
    showIcons: true,
    segmentCount: 5
  },
  render: args => {
    // Generar segmentos según los controles - SIEMPRE regenerar basándose en showIcons
    const shouldShowIcons = args.showIcons !== false;
    const segments = generateSegments(args.segmentCount || 5, shouldShowIcons);

    // Asegurar que el segmento activo esté correctamente marcado
    const activeId = args.activeSegmentId || segments[0]?.id;
    segments.forEach(segment => {
      segment.active = segment.id === activeId;
    });

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 1200px;
      background: var(--modifiers-normal-color-light-bg-1);
    \`;

    // Contenedor para el Segment Control
    const container = document.createElement('div');
    container.id = 'segment-control-story-container';
    container.style.cssText = \`
      width: 100%;
    \`;
    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'segment-control-info-panel';
    infoPanel.style.cssText = \`
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    \`;
    const activeSegment = segments.find(segment => segment.id === activeId);
    const updateInfoPanel = (currentActiveId: string) => {
      const currentSegment = segments.find(segment => segment.id === currentActiveId);
      infoPanel.innerHTML = \`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Segment Control</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Segmento Activo:</strong> \${currentSegment ? currentSegment.label : currentActiveId}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Segmentos totales:</strong> \${segments.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Con iconos:</strong> \${shouldShowIcons ? 'Sí' : 'No'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> \${segments.map(s => s.id).join(', ')}</div>
        </div>
      \`;
    };
    updateInfoPanel(activeId);
    wrapper.appendChild(infoPanel);

    // Crear el Segment Control usando createSegmentControl para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';

        // Crear segmentos con listeners
        createSegmentControl({
          segments: segments,
          activeSegmentId: activeId,
          onSegmentChange: (segmentId, segmentElement) => {
            // Segmento cambiado
            // Actualizar panel de información
            updateInfoPanel(segmentId);
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Segment Control:', error);
      }
    });
    return wrapper;
  }
}`,...g.parameters?.docs?.source},description:{story:"Story por defecto con todos los controles",...g.parameters?.docs?.description}}};const w=["Default"];export{g as Default,w as __namedExportsOrder,x as default};
