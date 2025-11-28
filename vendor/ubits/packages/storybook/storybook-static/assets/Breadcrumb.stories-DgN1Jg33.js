import{c as d}from"./BreadcrumbProvider-BQh42h2n.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Navegación/Breadcrumb",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Componente Breadcrumb UBITS para navegación jerárquica. El último item muestra texto en bold (active), los demás en regular (default). Usa body-sm con tokens UBITS."}}},argTypes:{items:{control:{type:"object"},description:"Array de items del breadcrumb",table:{type:{summary:"BreadcrumbItem[]"}}},separator:{control:{type:"text"},description:'Separador entre items (por defecto: ">")',table:{type:{summary:"string"},defaultValue:{summary:'">"'}}},itemCount:{control:{type:"number",min:2,max:8,step:1},description:"Número de items a mostrar",table:{type:{summary:"number"},defaultValue:{summary:"5"}}}}};function m(o=5){const e=["Home","Categoría","Subcategoría","Página","Detalle","Elemento","Vista","Final"];return Array.from({length:o},(t,r)=>({id:`item-${r+1}`,label:e[r]||`Item ${r+1}`,url:r<o-1?`#${e[r]?.toLowerCase()||`item-${r+1}`}`:void 0,active:r===o-1}))}const i={args:{items:m(5),separator:">",itemCount:5},render:o=>{const e=m(o.itemCount||5),t=document.createElement("div");t.style.cssText=`
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;const r=document.createElement("div");r.id="breadcrumb-story-container",r.style.cssText=`
      width: 100%;
      margin-bottom: 24px;
    `,t.appendChild(r);const n=document.createElement("div");n.id="breadcrumb-info-panel",n.style.cssText=`
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;const s=e[e.length-1],l=()=>{n.innerHTML=`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Breadcrumb</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Item Activo:</strong> ${s?s.label:"N/A"}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Items totales:</strong> ${e.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Separador:</strong> "${o.separator||">"}"</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${e.map(a=>a.id).join(", ")}</div>
        </div>
      `};return l(),t.appendChild(n),requestAnimationFrame(()=>{try{r.innerHTML="",d({items:e,separator:o.separator||">",onItemClick:(a,c)=>{l()}},r.id)}catch(a){console.error("Error creando Breadcrumb:",a),r.innerHTML=`<p style="color: #ef4444); padding: 16px;">Error: ${a}</p>`}}),t}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: generateBreadcrumbItems(5),
    separator: '>',
    itemCount: 5
  },
  render: args => {
    // Generar items según los controles
    const items = generateBreadcrumbItems(args.itemCount || 5);

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    \`;

    // Contenedor para el Breadcrumb
    const container = document.createElement('div');
    container.id = 'breadcrumb-story-container';
    container.style.cssText = \`
      width: 100%;
      margin-bottom: 24px;
    \`;
    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'breadcrumb-info-panel';
    infoPanel.style.cssText = \`
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    \`;
    const activeItem = items[items.length - 1];
    const updateInfoPanel = () => {
      infoPanel.innerHTML = \`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Breadcrumb</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Item Activo:</strong> \${activeItem ? activeItem.label : 'N/A'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Items totales:</strong> \${items.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Separador:</strong> "\${args.separator || '>'}"</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> \${items.map(i => i.id).join(', ')}</div>
        </div>
      \`;
    };
    updateInfoPanel();
    wrapper.appendChild(infoPanel);

    // Crear el Breadcrumb usando createBreadcrumb para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';

        // Crear breadcrumb con listeners
        createBreadcrumb({
          items: items,
          separator: args.separator || '>',
          onItemClick: (itemId, itemElement) => {
            // Item clickeado
            // Actualizar panel de información si es necesario
            updateInfoPanel();
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Breadcrumb:', error);
        container.innerHTML = \`<p style="color: #ef4444); padding: 16px;">Error: \${error}</p>\`;
      }
    });
    return wrapper;
  }
}`,...i.parameters?.docs?.source},description:{story:"Story por defecto con todos los controles",...i.parameters?.docs?.description}}};const h=["Default"];export{i as Default,h as __namedExportsOrder,u as default};
