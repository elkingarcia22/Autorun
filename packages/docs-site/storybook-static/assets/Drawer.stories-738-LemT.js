import{r as x}from"./ButtonProvider-CWHxZvq1.js";import"./iframe-BfFsla13.js";import"./ListProvider-DvH0c9YJ.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function g(e){const{title:t,complementaryText:r,width:i=40,bodyContent:s="",footerButtons:o,className:a=""}=e,d=["ubits-drawer",`ubits-drawer--width-${i}`,a].filter(Boolean).join(" "),b=`
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${t}</p>
        </div>
        ${r?`
        <div class="ubits-drawer__header-complementary">
          <p class="ubits-body-sm-regular">${r}</p>
        </div>
        `:""}
      </div>
      ${x({variant:"secondary",size:"md",icon:"fa-times",iconOnly:!0,className:"ubits-drawer__close"})}
    </div>
  `,m=`
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${typeof s=="function"?s():s||'<div class="ubits-drawer__placeholder">Contenido del drawer</div>'}
      </div>
      <div class="ubits-drawer__scrollbar">
        <div class="ubits-drawer__scrollbar-bar"></div>
      </div>
    </div>
  `,v=o?`
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        ${o.tertiary?`
        <div class="ubits-drawer__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${o.tertiary.label}</span>
          </button>
        </div>
        `:""}
        <div class="ubits-drawer__footer-right">
          ${o.secondary?`
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${o.secondary.label}</span>
          </button>
          `:""}
          ${o.primary?`
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${o.primary.label}</span>
          </button>
          `:""}
        </div>
      </div>
    </div>
  `:"";return`
    <div class="ubits-drawer-overlay">
      <div class="${d}">
        ${b}
        ${m}
        ${v}
      </div>
    </div>
  `.trim()}function w(e){const{onClose:t,closeOnOverlayClick:r=!0,open:i=!1}=e;let s;s=document.body;const o=document.createElement("div");o.innerHTML=g(e);const a=o.firstElementChild;if(!a)throw new Error("No se pudo crear el drawer");a.querySelector(".ubits-drawer");const f=a.querySelector(".ubits-drawer__close"),d=a,b=()=>{a.classList.add("ubits-drawer-overlay--open"),document.body.style.overflow="hidden"},c=()=>{a.classList.remove("ubits-drawer-overlay--open"),document.body.style.overflow="",t&&t()},m=n=>{const u=a.querySelector(".ubits-drawer__body-content");if(u){const p=typeof n=="function"?n():n;u.innerHTML=p}};f&&f.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),c()}),r&&d&&d.addEventListener("click",n=>{n.target===d&&c()});const v=n=>{n.key==="Escape"&&a.classList.contains("ubits-drawer-overlay--open")&&c()};if(document.addEventListener("keydown",v),e.footerButtons){const n=a.querySelector(".ubits-drawer__footer-left .ubits-drawer__footer-button"),u=a.querySelector(".ubits-drawer__footer-right .ubits-button--secondary"),p=a.querySelector(".ubits-drawer__footer-right .ubits-button--primary");n&&e.footerButtons.tertiary?.onClick&&n.addEventListener("click",l=>{l.preventDefault(),e.footerButtons.tertiary.onClick(l)}),u&&e.footerButtons.secondary?.onClick&&u.addEventListener("click",l=>{l.preventDefault(),e.footerButtons.secondary.onClick(l)}),p&&e.footerButtons.primary?.onClick&&p.addEventListener("click",l=>{l.preventDefault(),e.footerButtons.primary.onClick(l)})}return s.appendChild(a),i&&b(),{element:a,open:b,close:c,updateContent:m}}const z={title:"Components/Drawer Navigation",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Drawer Navigation UBITS que se desliza desde la derecha de la pantalla. Ideal para formularios, filtros o vistas de detalle. Soporta diferentes anchos, un header con título y texto complementario, un body con contenido scrollable y un footer con botones de acción."}},layout:"fullscreen"},argTypes:{title:{control:{type:"text"},description:"Título principal del drawer.",table:{type:{summary:"string"},defaultValue:{summary:"Crear dato demográfico"},category:"Contenido"}},complementaryText:{control:{type:"text"},description:"Texto secundario opcional que aparece debajo del título.",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Contenido"}},width:{control:{type:"select"},options:[100,80,60,50,40,30],description:"Ancho del drawer como porcentaje del viewport (100, 80, 60, 50, 40, 30). En móvil siempre es 100%.",table:{type:{summary:"number"},defaultValue:{summary:40},category:"Apariencia"}},bodyContent:{control:{type:"text"},description:"Contenido HTML del cuerpo del drawer. Puede ser una cadena HTML o una función que devuelve HTML.",table:{type:{summary:"string | (() => string)"},defaultValue:{summary:"..."},category:"Contenido"}},"footerButtons.tertiary.label":{control:{type:"text"},name:"Label Botón Terciario",description:"Label del botón terciario (izquierda del footer).",table:{category:"Footer Buttons"}},"footerButtons.tertiary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Terciario",description:"Controla la visibilidad del botón terciario.",table:{category:"Footer Buttons"}},"footerButtons.secondary.label":{control:{type:"text"},name:"Label Botón Secundario",description:"Label del botón secundario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.secondary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Secundario",description:"Controla la visibilidad del botón secundario.",table:{category:"Footer Buttons"}},"footerButtons.primary.label":{control:{type:"text"},name:"Label Botón Primario",description:"Label del botón primario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.primary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Primario",description:"Controla la visibilidad del botón primario.",table:{category:"Footer Buttons"}},closeOnOverlayClick:{control:{type:"boolean"},description:"Si el drawer se cierra al hacer clic fuera de él.",table:{type:{summary:"boolean"},defaultValue:{summary:!0},category:"Comportamiento"}},onClose:{action:"closed",description:"Callback que se ejecuta cuando el drawer se cierra.",table:{disable:!0}}}},y={args:{title:"Crear dato demográfico",complementaryText:"",width:40,bodyContent:`
      <div style="padding: 16px;">
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--ubits-fg-1-medium); margin-bottom: 8px;">Pregunta</label>
          <textarea placeholder="Escribe tu pregunta aquí..." style="width: 100%; min-height: 100px; padding: 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); resize: vertical; box-sizing: border-box;"></textarea>
        </div>
        <div style="margin-bottom: 16px; padding: 12px; background: var(--ubits-feedback-bg-info-subtle); border-radius: 8px; display: flex; align-items: flex-start; gap: 8px;">
          <i class="far fa-info-circle" style="color: var(--ubits-feedback-fg-info-subtle); font-size: 16px; margin-top: 2px;"></i>
          <p style="margin: 0; font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium);">Debes tener al menos dos opciones de respuesta</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium); min-width: 20px;">1</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); box-sizing: border-box;">
            <button style="padding: 8px; border: none; background: transparent; color: var(--ubits-fg-1-medium); cursor: pointer; border-radius: 4px;">
              <i class="far fa-trash"></i>
            </button>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium); min-width: 20px;">2</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); box-sizing: border-box;">
            <button style="padding: 8px; border: none; background: transparent; color: var(--ubits-fg-1-medium); cursor: pointer; border-radius: 4px;">
              <i class="far fa-trash"></i>
            </button>
          </div>
        </div>
        <button style="margin-top: 16px; padding: 10px 12px; border: 1px dashed var(--ubits-border-1); background: transparent; border-radius: 8px; color: var(--ubits-fg-1-medium); font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); cursor: pointer; display: flex; align-items: center; gap: 8px; width: 100%;">
          <i class="far fa-plus"></i>
          <span>Añadir opción de respuesta</span>
        </button>
      </div>
    `,"footerButtons.tertiary.label":"Cancelar","footerButtons.tertiary.enabled":!0,"footerButtons.secondary.label":"Guardar","footerButtons.secondary.enabled":!0,"footerButtons.primary.label":"Crear","footerButtons.primary.enabled":!0,closeOnOverlayClick:!0},render:e=>{const t=document.createElement("div");t.id="drawer-story-container",t.style.width="100vw",t.style.height="100vh",t.style.position="relative",t.style.overflow="hidden",t.style.background="var(--ubits-bg-2, #f9fafb)",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="40px";const r=document.createElement("button");r.className="ubits-button ubits-button--primary ubits-button--md",r.innerHTML="<span>Abrir Drawer</span>",r.style.width="auto",r.style.minWidth="auto";let i=null;const s=()=>{if(!i){const o={};e["footerButtons.tertiary.enabled"]&&(o.tertiary={label:e["footerButtons.tertiary.label"]||"Cancelar",onClick:()=>{console.log("Botón Tertiary clickeado")}}),e["footerButtons.secondary.enabled"]&&(o.secondary={label:e["footerButtons.secondary.label"]||"Guardar",onClick:()=>{console.log("Botón Secondary clickeado")}}),e["footerButtons.primary.enabled"]&&(o.primary={label:e["footerButtons.primary.label"]||"Crear",onClick:()=>{console.log("Botón Primary clickeado")}}),i=w({title:e.title,complementaryText:e.complementaryText,width:e.width,bodyContent:e.bodyContent,footerButtons:Object.keys(o).length>0?o:void 0,closeOnOverlayClick:e.closeOnOverlayClick,onClose:()=>{e.onClose&&e.onClose(),i&&i.element&&i.element.remove(),i=null,r.style.display="flex",r.style.visibility="visible"},open:!0}),r.style.display="none",r.style.visibility="hidden"}};return r.addEventListener("click",s),t.appendChild(r),t}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Crear dato demográfico',
    complementaryText: '',
    width: 40,
    bodyContent: \`
      <div style="padding: 16px;">
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--ubits-fg-1-medium); margin-bottom: 8px;">Pregunta</label>
          <textarea placeholder="Escribe tu pregunta aquí..." style="width: 100%; min-height: 100px; padding: 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); resize: vertical; box-sizing: border-box;"></textarea>
        </div>
        <div style="margin-bottom: 16px; padding: 12px; background: var(--ubits-feedback-bg-info-subtle); border-radius: 8px; display: flex; align-items: flex-start; gap: 8px;">
          <i class="far fa-info-circle" style="color: var(--ubits-feedback-fg-info-subtle); font-size: 16px; margin-top: 2px;"></i>
          <p style="margin: 0; font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium);">Debes tener al menos dos opciones de respuesta</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium); min-width: 20px;">1</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); box-sizing: border-box;">
            <button style="padding: 8px; border: none; background: transparent; color: var(--ubits-fg-1-medium); cursor: pointer; border-radius: 4px;">
              <i class="far fa-trash"></i>
            </button>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium); min-width: 20px;">2</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); box-sizing: border-box;">
            <button style="padding: 8px; border: none; background: transparent; color: var(--ubits-fg-1-medium); cursor: pointer; border-radius: 4px;">
              <i class="far fa-trash"></i>
            </button>
          </div>
        </div>
        <button style="margin-top: 16px; padding: 10px 12px; border: 1px dashed var(--ubits-border-1); background: transparent; border-radius: 8px; color: var(--ubits-fg-1-medium); font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); cursor: pointer; display: flex; align-items: center; gap: 8px; width: 100%;">
          <i class="far fa-plus"></i>
          <span>Añadir opción de respuesta</span>
        </button>
      </div>
    \`,
    'footerButtons.tertiary.label': 'Cancelar',
    'footerButtons.tertiary.enabled': true,
    'footerButtons.secondary.label': 'Guardar',
    'footerButtons.secondary.enabled': true,
    'footerButtons.primary.label': 'Crear',
    'footerButtons.primary.enabled': true,
    closeOnOverlayClick: true
  },
  render: args => {
    const container = document.createElement('div');
    container.id = 'drawer-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--ubits-bg-2, #f9fafb)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';
    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.innerHTML = '<span>Abrir Drawer</span>';
    openButton.style.width = 'auto';
    openButton.style.minWidth = 'auto';
    let drawerInstance: ReturnType<typeof createDrawer> | null = null;
    const handleOpenDrawer = () => {
      if (!drawerInstance) {
        // Construir footerButtons desde los args individuales
        const footerButtons: any = {};
        if (args['footerButtons.tertiary.enabled']) {
          footerButtons['tertiary'] = {
            label: args['footerButtons.tertiary.label'] || 'Cancelar',
            onClick: () => {
              console.log('Botón Tertiary clickeado');
            }
          };
        }
        if (args['footerButtons.secondary.enabled']) {
          footerButtons['secondary'] = {
            label: args['footerButtons.secondary.label'] || 'Guardar',
            onClick: () => {
              console.log('Botón Secondary clickeado');
            }
          };
        }
        if (args['footerButtons.primary.enabled']) {
          footerButtons['primary'] = {
            label: args['footerButtons.primary.label'] || 'Crear',
            onClick: () => {
              console.log('Botón Primary clickeado');
            }
          };
        }
        drawerInstance = createDrawer({
          title: args.title,
          complementaryText: args.complementaryText,
          width: args.width,
          bodyContent: args.bodyContent,
          footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined,
          containerId: undefined,
          // Añadir al body, no al contenedor
          closeOnOverlayClick: args.closeOnOverlayClick,
          onClose: () => {
            if (args.onClose) {
              args.onClose();
            }
            // Limpiar la instancia
            if (drawerInstance && drawerInstance.element) {
              drawerInstance.element.remove();
            }
            drawerInstance = null;
            // Restaurar el botón
            openButton.style.display = 'flex';
            openButton.style.visibility = 'visible';
          },
          open: true
        });

        // Ocultar el botón
        openButton.style.display = 'none';
        openButton.style.visibility = 'hidden';
      }
    };
    openButton.addEventListener('click', handleOpenDrawer);
    container.appendChild(openButton);
    return container;
  }
}`,...y.parameters?.docs?.source}}};const L=["Default"];export{y as Default,L as __namedExportsOrder,z as default};
