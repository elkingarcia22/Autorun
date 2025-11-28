import{r as k}from"./ButtonProvider-CX_wJeLD.js";import{r as j}from"./ButtonAIProvider-CGOC_9a2.js";import{r as F}from"./StatusTagProvider-6gx2PeGG.js";import{c as R}from"./TooltipProvider-C3qYI4Ua.js";import{c as W}from"./ListProvider-Dp4g9_1Y.js";import{c as Y,r as D}from"./BreadcrumbProvider-BQh42h2n.js";import"./iframe-EN31ESOT.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function U(t){const{title:i="",showTitle:g=!0,showBackButton:b=!1,showInfoButton:y=!1,showStatusTag:S=!1,statusTag:u,actions:B=[],showActions:N=!0,showBreadcrumb:A=!1,breadcrumb:T,className:V=""}=t,z=["ubits-header-section",V].filter(Boolean).join(" "),L=b?k({variant:"secondary",size:"md",icon:"arrow-left",iconStyle:"regular",iconOnly:!0,attributes:{"data-back-button":"true","aria-label":"Volver"}}):"",E=y?k({variant:"tertiary",size:"sm",icon:"circle-info",iconStyle:"regular",iconOnly:!0,attributes:{"data-info-button":"true","aria-label":"Información"}}):"",f=S&&u?F({...u,size:u.size||"sm",rightIcon:null}):"";let x="";g&&i?x=`
      <div class="ubits-header-section__title-wrapper">
        ${L}
        <div class="ubits-header-section__title-group">
          <h2 class="ubits-heading-h2">${i}</h2>
          ${E}
          ${f?`<div class="ubits-header-section__status-tag-wrapper">${f}</div>`:""}
        </div>
      </div>
    `:(b||y||S)&&(x=`
      <div class="ubits-header-section__title-wrapper">
        ${L}
        <div class="ubits-header-section__title-group">
          ${E}
          ${f?`<div class="ubits-header-section__status-tag-wrapper">${f}</div>`:""}
        </div>
      </div>
    `);const I=t.showSecondaryButton||!1,C=I?k({variant:"secondary",size:"md",text:t.secondaryButtonText||"",icon:t.secondaryButtonIcon,iconStyle:"regular",attributes:{"data-secondary-button":"true","aria-label":t.secondaryButtonText||"Botón secundario"}}):"",M=t.showOptionsButton||!1,h=M?k({variant:"secondary",size:"md",icon:"ellipsis",iconStyle:"regular",iconOnly:!0,attributes:{"data-options-button":"true","aria-label":"Más opciones"}}):"",O=B.filter(s=>s.id!=="ai-button"),c=B.find(s=>s.id==="ai-button"),e=O.filter(s=>s.variant==="secondary"||!s.variant),o=O.filter(s=>s.variant==="primary");let n="";if(N&&B.length>0){const s=e.map(a=>{const v={...a,size:"md",text:a.text,onClick:a.onClick};return k(v)}).join("");let r="";c&&(r=j({variant:"secondary",size:"md",text:c.text||"AI button",icon:c.icon||"sparkles",iconStyle:c.iconStyle||"regular",iconOnly:!1,disabled:!1,badge:!1,active:!1}));const p=o.map(a=>{const v={...a,size:"md",text:a.text,onClick:a.onClick};return k(v)}).join("");n=`
      <div class="ubits-header-section__actions">
        ${r}
        ${C}
        ${s}
        ${p}
        ${h}
      </div>
    `}else(I||M)&&(n=`
      <div class="ubits-header-section__actions">
        ${C}
        ${h}
      </div>
    `);const m=A&&T?D(T):"";return`
    <div class="${z}">
      <div class="ubits-header-section__content">
        ${x}
        ${n}
      </div>
      ${m?`<div class="ubits-header-section__breadcrumb-wrapper">${m}</div>`:""}
    </div>
  `.trim()}function G(t){const{containerId:i,container:g,title:b,showTitle:y=!0,showBackButton:S=!1,showInfoButton:u=!1,infoTooltipText:B="",showStatusTag:N=!1,statusTag:A,actions:T=[],showActions:V=!0,showSecondaryButton:z=!1,showOptionsButton:L=!1,showBreadcrumb:E=!1,breadcrumb:f,onBackClick:x,onInfoClick:I,onSecondaryButtonClick:C,onOptionsClick:M}=t;let h=null;if(g?h=g:i&&(h=document.getElementById(i)),!h)return console.error("HeaderSection: Contenedor no encontrado"),null;const O=U({...t});h.innerHTML=O;const c=h.querySelector(".ubits-header-section");if(!c)return console.error("HeaderSection: Elemento no encontrado después de renderizar"),null;if(S){const e=c.querySelector('[data-back-button="true"]');if(e){const o=e.closest("button")||e;o&&x&&o.addEventListener("click",x)}}if(u&&B){const e=c.querySelector('[data-info-button="true"]');if(e){const o=e.closest("button")||e;let n=null,m=!1;const w=()=>{if(!n||!m)return;const d=o.getBoundingClientRect(),H=n.element.getBoundingClientRect(),l=d.left+d.width/2,_=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ubits-spacing-sm").replace("px",""))||8,P=d.top-H.height-_;n.updatePosition({top:P,left:l})},s=()=>{if(!n){const d=o.getBoundingClientRect();n=R({description:B,showDescription:!0,showTitle:!1,showPrimaryButton:!1,showSecondaryButton:!1,showTertiaryButton:!1,width:"sm",tailPosition:"bottom",position:{left:d.left+d.width/2,top:d.top-200},closeOnOutsideClick:!0,onClose:()=>{m=!1,o.classList.remove("ubits-button--active")}}),requestAnimationFrame(()=>{w()})}n.open(),m=!0,o.classList.add("ubits-button--active"),w()},r=()=>{n&&m&&(n.close(),m=!1,o.classList.remove("ubits-button--active"))};o.addEventListener("click",d=>{d.stopPropagation(),m?r():s(),I&&I(d)}),document.addEventListener("click",d=>{m&&n&&!o.contains(d.target)&&!n.element.contains(d.target)&&r()});let p=null;const a=()=>{p&&cancelAnimationFrame(p),p=requestAnimationFrame(()=>{m&&w()})};window.addEventListener("scroll",a,!0),window.addEventListener("resize",a);const v=()=>{window.removeEventListener("scroll",a,!0),window.removeEventListener("resize",a),n&&(n.destroy(),n=null)};c.__headerSectionCleanup=v}}if(N&&A){const e=c.querySelector(".ubits-status-tag");e&&A.onClick&&(e.addEventListener("click",A.onClick),e.style.cursor="pointer")}if(V&&T.length>0){const e=T.filter(r=>r.id!=="ai-button"),o=T.find(r=>r.id==="ai-button"),n=e.filter(r=>r.variant==="secondary"||!r.variant),m=e.filter(r=>r.variant==="primary");if(c.querySelectorAll('.ubits-header-section__actions .ubits-button:not([data-options-button="true"]):not([data-secondary-button="true"]):not(.ubits-button-ai):not(.ubits-button--primary)').forEach((r,p)=>{const a=n[p];a&&a.onClick&&r.addEventListener("click",a.onClick)}),o){const r=c.querySelector(".ubits-header-section__actions .ubits-button-ai");r&&o.onClick&&r.addEventListener("click",o.onClick)}c.querySelectorAll(".ubits-header-section__actions .ubits-button--primary").forEach((r,p)=>{const a=m[p];a&&a.onClick&&r.addEventListener("click",a.onClick)})}if(z){const e=c.querySelector('[data-secondary-button="true"]');if(e){const o=e.closest("button")||e;o&&C&&o.addEventListener("click",C)}}if(L){const e=c.querySelector('[data-options-button="true"]');if(e){const o=e.closest("button")||e,n=document.createElement("div");n.className="ubits-header-section-options-dropdown";const w=(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ubits-spacing-12").replace("px",""))||48)*2.5;n.style.cssText=`
        position: fixed;
        z-index: 1000;
        display: none;
        min-width: ${w}px;
      `,document.body.appendChild(n);let s=!1;const r=a=>{if(a.stopPropagation(),s){n.style.display="none",s=!1,o.classList.remove("ubits-button--active");return}const v=o.getBoundingClientRect(),d=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ubits-spacing-sm").replace("px",""))||8;if(n.style.display="block",n.style.top=`${v.bottom+window.scrollY+d}px`,n.style.right=`${window.innerWidth-v.right}px`,t.optionsMenuItems&&t.optionsMenuItems.length>0){const q=`header-section-options-menu-${Date.now()}`;n.id=q,n.innerHTML="";const H=t.optionsMenuItems.map(l=>({label:l.label,state:l.state||"default",value:l.value||l.label,selected:!1}));try{W({containerId:q,items:H,size:"md",maxHeight:"none",onSelectionChange:(l,_)=>{if(l&&t.optionsMenuItems&&t.optionsMenuItems[_]){const P=t.optionsMenuItems[_];P.onClick&&P.onClick(new MouseEvent("click"),{label:l.label,value:l.value}),n.style.display="none",s=!1,o.classList.remove("ubits-button--active")}}}),setTimeout(()=>{const l=n.querySelector(".ubits-list");l&&H.length>5&&(l.style.maxHeight="calc(var(--ubits-spacing-12) * 6)",l.style.overflowY="auto")},0)}catch(l){console.error("Error creating options menu:",l)}}s=!0,o.classList.add("ubits-button--active"),M&&M(a)};o.addEventListener("click",r);const p=a=>{s&&!n.contains(a.target)&&!o.contains(a.target)&&(n.style.display="none",s=!1,o.classList.remove("ubits-button--active"))};document.addEventListener("click",p),c.__optionsDropdownCleanup=()=>{document.removeEventListener("click",p)}}}if(E&&f){const e=c.querySelector(".ubits-header-section__breadcrumb-wrapper");if(e){const o=`header-section-breadcrumb-${Date.now()}`;e.id=o,e.innerHTML="";try{Y(f,o)}catch(n){console.error("Error creating breadcrumb:",n),e.innerHTML=D(f)}}}return c}const at={title:"Layout/HeaderSection",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Componente HeaderSection UBITS para encabezados de sección con título (heading h2, fg-1-high), botón de información con tooltip (sm), y acciones (botones md). Todos los elementos son apagables/prendibles con controladores."}}},argTypes:{title:{control:{type:"text"},description:"Título de la sección (heading h2)",table:{type:{summary:"string"},defaultValue:{summary:""}}},showTitle:{control:{type:"boolean"},description:"Mostrar el título (NO afecta al status tag)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},showBackButton:{control:{type:"boolean"},description:"Mostrar el botón de atrás (secundario md)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},showInfoButton:{control:{type:"boolean"},description:"Mostrar el botón de información (sm, tertiary)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},infoTooltipText:{control:{type:"text"},description:"Texto del tooltip del botón de información",if:{arg:"showInfoButton"},table:{type:{summary:"string"},defaultValue:{summary:""}}},showStatusTag:{control:{type:"boolean"},description:"Mostrar el status tag (controlador independiente del título)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},statusTagLabel:{control:{type:"text"},description:"Label del status tag",if:{arg:"showStatusTag"},table:{type:{summary:"string"},defaultValue:{summary:""}}},statusTagStatus:{control:{type:"select"},options:["completed","published","fulfilled","created","active","not-fulfilled","denied","draft","in-progress","syncing","pending","pending-approval","not-started","finished","archived","disabled","paused","hidden"],description:"Estado del status tag",if:{arg:"showStatusTag"},table:{type:{summary:"string"},defaultValue:{summary:"pending"}}},showActions:{control:{type:"boolean"},description:"Mostrar todas las acciones (botones md)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},showAIAction:{control:{type:"boolean"},description:"Mostrar botón AI (primero en la serie)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},showAction1:{control:{type:"boolean"},description:"Mostrar acción 1 (Button text)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},showAction2:{control:{type:"boolean"},description:"Mostrar acción 2 (Button text)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},showAction3:{control:{type:"boolean"},description:"Mostrar acción 3 (Button text)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},showPrimaryAction:{control:{type:"boolean"},description:"Mostrar acción primaria (Primary action)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},showSecondaryButton:{control:{type:"boolean"},description:"Mostrar botón secundario adicional",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},secondaryButtonText:{control:{type:"text"},description:"Texto del botón secundario adicional",if:{arg:"showSecondaryButton"},table:{type:{summary:"string"},defaultValue:{summary:""}}},secondaryButtonIcon:{control:{type:"text"},description:"Icono del botón secundario adicional",if:{arg:"showSecondaryButton"},table:{type:{summary:"string"},defaultValue:{summary:""}}},showOptionsButton:{control:{type:"boolean"},description:"Mostrar botón de opciones (3 puntos)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},optionsMenuItems:{control:{type:"object"},description:"Opciones del menú dropdown del botón de opciones",if:{arg:"showOptionsButton"},table:{type:{summary:"HeaderSectionOptionsMenuItem[]"},defaultValue:{summary:"[]"}}},showBreadcrumb:{control:{type:"boolean"},description:"Mostrar breadcrumb (debajo del header, 16px de distancia)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},breadcrumbItems:{control:{type:"object"},description:"Items del breadcrumb",if:{arg:"showBreadcrumb"},table:{type:{summary:"BreadcrumbItem[]"},defaultValue:{summary:"[]"}}},containerId:{control:!1,description:"ID del contenedor (asignado automáticamente)"}}},$={args:{containerId:"header-section-story-container",title:"Name product",showTitle:!0,showBackButton:!0,showInfoButton:!0,infoTooltipText:"Información adicional sobre el producto",showStatusTag:!0,statusTagLabel:"Active",statusTagStatus:"active",showActions:!0,showAIAction:!0,showAction1:!0,showAction2:!0,showAction3:!0,showPrimaryAction:!0,showSecondaryButton:!0,secondaryButtonText:"Button text",secondaryButtonIcon:"grid",showOptionsButton:!0,optionsMenuItems:[{label:"Opción 1",value:"option-1",onClick:(t,i)=>{}},{label:"Opción 2",value:"option-2",onClick:(t,i)=>{}},{label:"Opción 3",value:"option-3",onClick:(t,i)=>{}}],showBreadcrumb:!0,breadcrumbItems:[{id:"home",label:"Home",url:"#",onClick:t=>{}},{id:"products",label:"Products",url:"#",onClick:t=>{}},{id:"current",label:"Current Product"}]},render:t=>{const i=document.createElement("div");i.id=t.containerId||"header-section-story-container",i.style.width="100%",i.style.maxWidth="1220px",i.style.margin="0 auto",i.style.padding="24px",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.justifyContent="center",i.style.minHeight="200px";const g=document.createElement("div");return g.style.cssText=`
      margin-bottom: 24px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      font-size: 13px;
      color: var(--modifiers-normal-color-light-fg-2-medium);
    `,g.innerHTML=`
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--modifiers-normal-color-light-fg-1-high);">Información del HeaderSection</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        <div><strong>Título:</strong> ${t.title||"(vacío)"}</div>
        <div><strong>Mostrar título:</strong> ${t.showTitle?"Sí":"No"}</div>
        <div><strong>Mostrar botón atrás:</strong> ${t.showBackButton?"Sí":"No"}</div>
        <div><strong>Mostrar botón info:</strong> ${t.showInfoButton?"Sí":"No"}</div>
        <div><strong>Tooltip texto:</strong> ${t.infoTooltipText||"(vacío)"}</div>
        <div><strong>Mostrar status tag:</strong> ${t.showStatusTag?"Sí":"No"}</div>
        <div><strong>Status tag label:</strong> ${t.statusTagLabel||"(vacío)"}</div>
        <div><strong>Status tag status:</strong> ${t.statusTagStatus||"(vacío)"}</div>
        <div><strong>Mostrar acciones:</strong> ${t.showActions?"Sí":"No"}</div>
        <div><strong>Mostrar botón AI:</strong> ${t.showAIAction?"Sí":"No"}</div>
        <div><strong>Mostrar acción 1:</strong> ${t.showAction1?"Sí":"No"}</div>
        <div><strong>Mostrar acción 2:</strong> ${t.showAction2?"Sí":"No"}</div>
        <div><strong>Mostrar acción 3:</strong> ${t.showAction3?"Sí":"No"}</div>
        <div><strong>Mostrar acción primaria:</strong> ${t.showPrimaryAction?"Sí":"No"}</div>
        <div><strong>Mostrar botón secundario:</strong> ${t.showSecondaryButton?"Sí":"No"}</div>
        <div><strong>Texto botón secundario:</strong> ${t.secondaryButtonText||"(vacío)"}</div>
        <div><strong>Mostrar botón opciones:</strong> ${t.showOptionsButton?"Sí":"No"}</div>
      </div>
    `,i.appendChild(g),requestAnimationFrame(()=>{try{const b=t.showStatusTag&&t.statusTagLabel?{label:t.statusTagLabel,status:t.statusTagStatus||"pending",size:"sm"}:void 0,y=[];t.showAIAction&&y.push({id:"ai-button",text:"AI button",variant:"secondary",icon:"sparkles",iconStyle:"regular",onClick:u=>{}}),t.showAction1&&y.push({id:"action-1",text:"Button text",variant:"secondary",icon:"grid",iconStyle:"regular",onClick:u=>{}}),t.showAction2&&y.push({id:"action-2",text:"Button text",variant:"secondary",icon:"grid",iconStyle:"regular",onClick:u=>{}}),t.showAction3&&y.push({id:"action-3",text:"Button text",variant:"secondary",icon:"grid",iconStyle:"regular",onClick:u=>{}}),t.showPrimaryAction&&y.push({id:"primary-action",text:"Primary action",variant:"primary",icon:"grid",iconStyle:"regular",onClick:u=>{}});const S=t.showBreadcrumb&&t.breadcrumbItems?{items:t.breadcrumbItems,separator:">"}:void 0;G({...t,container:i,actions:y,statusTag:b,breadcrumb:S,onBackClick:u=>{},onInfoClick:u=>{},onSecondaryButtonClick:u=>{},onOptionsClick:u=>{}})}catch(b){console.error("Error creating HeaderSection:",b),i.innerHTML=`<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: ${b instanceof Error?b.message:String(b)}</div>`}}),i}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    containerId: 'header-section-story-container',
    title: 'Name product',
    showTitle: true,
    showBackButton: true,
    showInfoButton: true,
    infoTooltipText: 'Información adicional sobre el producto',
    showStatusTag: true,
    statusTagLabel: 'Active',
    statusTagStatus: 'active',
    showActions: true,
    showAIAction: true,
    showAction1: true,
    showAction2: true,
    showAction3: true,
    showPrimaryAction: true,
    showSecondaryButton: true,
    secondaryButtonText: 'Button text',
    secondaryButtonIcon: 'grid',
    showOptionsButton: true,
    optionsMenuItems: [{
      label: 'Opción 1',
      value: 'option-1',
      onClick: (e, data) => {
        // Opción 1 seleccionada
      }
    }, {
      label: 'Opción 2',
      value: 'option-2',
      onClick: (e, data) => {
        // Opción 2 seleccionada
      }
    }, {
      label: 'Opción 3',
      value: 'option-3',
      onClick: (e, data) => {
        // Opción 3 seleccionada
      }
    }],
    showBreadcrumb: true,
    breadcrumbItems: [{
      id: 'home',
      label: 'Home',
      url: '#',
      onClick: e => {
        // Home clicked
      }
    }, {
      id: 'products',
      label: 'Products',
      url: '#',
      onClick: e => {
        // Products clicked
      }
    }, {
      id: 'current',
      label: 'Current Product'
    }]
  } as HeaderSectionOptions & {
    showAIAction?: boolean;
    showAction1?: boolean;
    showAction2?: boolean;
    showAction3?: boolean;
    showPrimaryAction?: boolean;
    statusTagLabel?: string;
    statusTagStatus?: string;
    breadcrumbItems?: Array<{
      id: string;
      label: string;
      url?: string;
      onClick?: (e: MouseEvent) => void;
    }>;
  },
  render: args => {
    const container = document.createElement('div');
    container.id = args.containerId || 'header-section-story-container';
    container.style.width = '100%';
    container.style.maxWidth = '1220px';
    container.style.margin = '0 auto';
    container.style.padding = '24px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '200px';

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = \`
      margin-bottom: 24px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      font-size: 13px;
      color: var(--modifiers-normal-color-light-fg-2-medium);
    \`;
    infoPanel.innerHTML = \`
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--modifiers-normal-color-light-fg-1-high);">Información del HeaderSection</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        <div><strong>Título:</strong> \${args.title || '(vacío)'}</div>
        <div><strong>Mostrar título:</strong> \${args.showTitle ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón atrás:</strong> \${args.showBackButton ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón info:</strong> \${args.showInfoButton ? 'Sí' : 'No'}</div>
        <div><strong>Tooltip texto:</strong> \${args.infoTooltipText || '(vacío)'}</div>
        <div><strong>Mostrar status tag:</strong> \${args.showStatusTag ? 'Sí' : 'No'}</div>
        <div><strong>Status tag label:</strong> \${(args as any).statusTagLabel || '(vacío)'}</div>
        <div><strong>Status tag status:</strong> \${(args as any).statusTagStatus || '(vacío)'}</div>
        <div><strong>Mostrar acciones:</strong> \${args.showActions ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón AI:</strong> \${(args as any).showAIAction ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 1:</strong> \${(args as any).showAction1 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 2:</strong> \${(args as any).showAction2 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 3:</strong> \${(args as any).showAction3 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción primaria:</strong> \${(args as any).showPrimaryAction ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón secundario:</strong> \${args.showSecondaryButton ? 'Sí' : 'No'}</div>
        <div><strong>Texto botón secundario:</strong> \${args.secondaryButtonText || '(vacío)'}</div>
        <div><strong>Mostrar botón opciones:</strong> \${args.showOptionsButton ? 'Sí' : 'No'}</div>
      </div>
    \`;
    container.appendChild(infoPanel);

    // Renderizar HeaderSection
    requestAnimationFrame(() => {
      try {
        const statusTagOptions = (args as any).showStatusTag && (args as any).statusTagLabel ? {
          label: (args as any).statusTagLabel,
          status: (args as any).statusTagStatus || 'pending',
          size: 'sm' as const
        } : undefined;

        // Construir array de acciones basado en los controladores individuales
        const actions: HeaderSectionAction[] = [];
        if ((args as any).showAIAction) {
          actions.push({
            id: 'ai-button',
            text: 'AI button',
            variant: 'secondary',
            icon: 'sparkles',
            iconStyle: 'regular',
            onClick: e => {
              // AI button clicked
            }
          });
        }
        if ((args as any).showAction1) {
          actions.push({
            id: 'action-1',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: e => {
              // Action 1 clicked
            }
          });
        }
        if ((args as any).showAction2) {
          actions.push({
            id: 'action-2',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: e => {
              // Action 2 clicked
            }
          });
        }
        if ((args as any).showAction3) {
          actions.push({
            id: 'action-3',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: e => {
              // Action 3 clicked
            }
          });
        }
        if ((args as any).showPrimaryAction) {
          actions.push({
            id: 'primary-action',
            text: 'Primary action',
            variant: 'primary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: e => {
              // Primary action clicked
            }
          });
        }
        const breadcrumbOptions = (args as any).showBreadcrumb && (args as any).breadcrumbItems ? {
          items: (args as any).breadcrumbItems,
          separator: '>'
        } : undefined;
        createHeaderSection({
          ...args,
          container: container,
          actions: actions,
          statusTag: statusTagOptions,
          breadcrumb: breadcrumbOptions,
          onBackClick: e => {
            // Back button clicked
          },
          onInfoClick: e => {
            // Info button clicked
          },
          onSecondaryButtonClick: e => {
            // Secondary button clicked
          },
          onOptionsClick: e => {
            // Options button clicked
          }
        });
      } catch (error) {
        console.error('Error creating HeaderSection:', error);
        container.innerHTML = \`<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: \${error instanceof Error ? error.message : String(error)}</div>\`;
      }
    });
    return container;
  }
}`,...$.parameters?.docs?.source},description:{story:"Story única con todos los controles",...$.parameters?.docs?.description}}};const it=["Default"];export{$ as Default,it as __namedExportsOrder,at as default};
