import"./iframe-Qhh1jVCN.js";import"./preload-helper-PPVm8Dsz.js";const B={sm:"320px",md:"480px",lg:"640px",xl:"800px",full:"1280px"};function g(e){const{title:t,bodyContent:o="",size:r="md",fullScreen:d=!1,footerButtons:n,className:a=""}=e,u=B[r]||B.md,c=["ubits-modal",`ubits-modal--size-${r}`,d?"ubits-modal--full-screen":"",a].filter(Boolean).join(" "),p=`
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${t}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `,l=`
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${typeof o=="function"?o():o||'<div class="ubits-modal__placeholder">Contenido del modal</div>'}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `,s=n?`
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${n.tertiary?`
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${n.tertiary.label}</span>
          </button>
        </div>
        `:""}
        <div class="ubits-modal__footer-right">
          ${n.secondary?`
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${n.secondary.label}</span>
          </button>
          `:""}
          ${n.primary?`
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${n.primary.label}</span>
          </button>
          `:""}
        </div>
      </div>
    </div>
  `:"";return`
    <div class="ubits-modal-overlay">
      <div class="${c}" style="max-width: ${u};">
        ${p}
        ${l}
        ${s}
      </div>
    </div>
  `.trim()}function C(e){const{onClose:t,closeOnOverlayClick:o=!0,open:r=!1}=e;let d;d=document.body;const n=document.createElement("div");n.innerHTML=g(e);const a=n.firstElementChild;if(!a)throw new Error("No se pudo crear el modal");a.querySelector(".ubits-modal");const u=a.querySelector(".ubits-modal__close"),b=a,f=()=>{a.classList.add("ubits-modal-overlay--open"),document.body.style.overflow="hidden"},c=()=>{a.classList.remove("ubits-modal-overlay--open"),document.body.style.overflow="",t&&t()},p=l=>{const s=a.querySelector(".ubits-modal__body-content");if(s){const y=typeof l=="function"?l():l;s.innerHTML=y}};u&&u.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),c()}),o&&b&&b.addEventListener("click",l=>{l.target===b&&c()});const v=l=>{l.key==="Escape"&&a.classList.contains("ubits-modal-overlay--open")&&c()};if(document.addEventListener("keydown",v),e.footerButtons){const l=a.querySelector(".ubits-modal__footer-left .ubits-modal__footer-button"),s=a.querySelector(".ubits-modal__footer-right .ubits-button--secondary"),y=a.querySelector(".ubits-modal__footer-right .ubits-button--primary");l&&e.footerButtons.tertiary?.onClick&&l.addEventListener("click",i=>{i.preventDefault(),e.footerButtons.tertiary.onClick(i)}),s&&e.footerButtons.secondary?.onClick&&s.addEventListener("click",i=>{i.preventDefault(),e.footerButtons.secondary.onClick(i)}),y&&e.footerButtons.primary?.onClick&&y.addEventListener("click",i=>{i.preventDefault(),e.footerButtons.primary.onClick(i)})}return d.appendChild(a),r&&f(),{element:a,open:f,close:c,updateContent:p}}const k={title:"Components/Modal",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Modal UBITS centrado con overlay. Ideal para diálogos, confirmaciones y formularios. Soporta diferentes tamaños, variante full-screen, header con título y botón de cerrar, body con contenido scrollable y footer con botones de acción."}},layout:"fullscreen"},argTypes:{title:{control:{type:"text"},description:"Título principal del modal.",table:{type:{summary:"string"},defaultValue:{summary:"Título del modal"},category:"Contenido"}},size:{control:{type:"select"},options:["sm","md","lg","xl","full"],description:"Tamaño del modal (sm: 320px, md: 480px, lg: 640px, xl: 800px, full: 1280px).",table:{type:{summary:"string"},defaultValue:{summary:"md"},category:"Apariencia"}},fullScreen:{control:{type:"boolean"},description:"Si el modal debe ocupar altura máxima (full-screen).",table:{type:{summary:"boolean"},defaultValue:{summary:!1},category:"Apariencia"}},bodyContent:{control:{type:"text"},description:"Contenido HTML del cuerpo del modal. Puede ser una cadena HTML o una función que devuelve HTML.",table:{type:{summary:"string | (() => string)"},defaultValue:{summary:"..."},category:"Contenido"}},"footerButtons.tertiary.label":{control:{type:"text"},name:"Label Botón Terciario",description:"Label del botón terciario (izquierda del footer).",table:{category:"Footer Buttons"}},"footerButtons.tertiary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Terciario",description:"Controla la visibilidad del botón terciario.",table:{category:"Footer Buttons"}},"footerButtons.secondary.label":{control:{type:"text"},name:"Label Botón Secundario",description:"Label del botón secundario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.secondary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Secundario",description:"Controla la visibilidad del botón secundario.",table:{category:"Footer Buttons"}},"footerButtons.primary.label":{control:{type:"text"},name:"Label Botón Primario",description:"Label del botón primario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.primary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Primario",description:"Controla la visibilidad del botón primario.",table:{category:"Footer Buttons"}},closeOnOverlayClick:{control:{type:"boolean"},description:"Si el modal se cierra al hacer clic fuera de él.",table:{type:{summary:"boolean"},defaultValue:{summary:!0},category:"Comportamiento"}},onClose:{action:"closed",description:"Callback que se ejecuta cuando el modal se cierra.",table:{disable:!0}}}},m={args:{title:"Título del modal",size:"md",fullScreen:!1,bodyContent:`
      <div style="padding: 16px;">
        <p style="margin: 0; font-size: var(--font-body-md-size, 16px); color: var(--ubits-fg-1-high); line-height: var(--font-body-md-line-height, 24px);">
          Este es el contenido del modal. Puedes agregar cualquier contenido HTML aquí, como formularios, texto, imágenes, etc.
        </p>
      </div>
    `,"footerButtons.tertiary.label":"Cancelar","footerButtons.tertiary.enabled":!0,"footerButtons.secondary.label":"Guardar","footerButtons.secondary.enabled":!0,"footerButtons.primary.label":"Aplicar","footerButtons.primary.enabled":!0,closeOnOverlayClick:!0},render:e=>{const t=document.createElement("div");t.id="modal-story-container",t.style.width="100vw",t.style.height="100vh",t.style.position="relative",t.style.overflow="hidden",t.style.background="var(--ubits-bg-2, #f9fafb)",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="40px";const o=document.createElement("button");o.className="ubits-button ubits-button--primary ubits-button--md",o.innerHTML="<span>Abrir Modal</span>",o.style.width="auto",o.style.minWidth="auto";let r=null;const d=()=>{if(!r){const n={};e["footerButtons.tertiary.enabled"]&&(n.tertiary={label:e["footerButtons.tertiary.label"]||"Cancelar",onClick:()=>{console.log("Botón Tertiary clickeado")}}),e["footerButtons.secondary.enabled"]&&(n.secondary={label:e["footerButtons.secondary.label"]||"Guardar",onClick:()=>{console.log("Botón Secondary clickeado")}}),e["footerButtons.primary.enabled"]&&(n.primary={label:e["footerButtons.primary.label"]||"Aplicar",onClick:()=>{console.log("Botón Primary clickeado")}}),r=C({title:e.title,size:e.size,fullScreen:e.fullScreen,bodyContent:e.bodyContent,footerButtons:Object.keys(n).length>0?n:void 0,closeOnOverlayClick:e.closeOnOverlayClick,onClose:()=>{e.onClose&&e.onClose(),r&&r.element&&r.element.remove(),r=null,o.style.display="flex",o.style.visibility="visible"},open:!0}),o.style.display="none",o.style.visibility="hidden"}};return o.addEventListener("click",d),t.appendChild(o),t}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Título del modal',
    size: 'md',
    fullScreen: false,
    bodyContent: \`
      <div style="padding: 16px;">
        <p style="margin: 0; font-size: var(--font-body-md-size, 16px); color: var(--ubits-fg-1-high); line-height: var(--font-body-md-line-height, 24px);">
          Este es el contenido del modal. Puedes agregar cualquier contenido HTML aquí, como formularios, texto, imágenes, etc.
        </p>
      </div>
    \`,
    'footerButtons.tertiary.label': 'Cancelar',
    'footerButtons.tertiary.enabled': true,
    'footerButtons.secondary.label': 'Guardar',
    'footerButtons.secondary.enabled': true,
    'footerButtons.primary.label': 'Aplicar',
    'footerButtons.primary.enabled': true,
    closeOnOverlayClick: true
  },
  render: args => {
    const container = document.createElement('div');
    container.id = 'modal-story-container';
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
    openButton.innerHTML = '<span>Abrir Modal</span>';
    openButton.style.width = 'auto';
    openButton.style.minWidth = 'auto';
    let modalInstance: ReturnType<typeof createModal> | null = null;
    const handleOpenModal = () => {
      if (!modalInstance) {
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
            label: args['footerButtons.primary.label'] || 'Aplicar',
            onClick: () => {
              console.log('Botón Primary clickeado');
            }
          };
        }
        modalInstance = createModal({
          title: args.title,
          size: args.size,
          fullScreen: args.fullScreen,
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
            if (modalInstance && modalInstance.element) {
              modalInstance.element.remove();
            }
            modalInstance = null;
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
    openButton.addEventListener('click', handleOpenModal);
    container.appendChild(openButton);
    return container;
  }
}`,...m.parameters?.docs?.source}}};const x=["Default"];export{m as Default,x as __namedExportsOrder,k as default};
