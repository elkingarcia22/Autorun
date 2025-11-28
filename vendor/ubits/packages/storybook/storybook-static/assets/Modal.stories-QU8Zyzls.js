import{c as i}from"./ModalProvider-Cwkz7B9R.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Feedback/Modal",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Modal UBITS centrado con overlay. Ideal para diálogos, confirmaciones y formularios. Soporta diferentes tamaños, variante full-screen, header con título y botón de cerrar, body con contenido scrollable y footer con botones de acción."}},layout:"fullscreen"},argTypes:{title:{control:{type:"text"},description:"Título principal del modal.",table:{type:{summary:"string"},defaultValue:{summary:"Título del modal"},category:"Contenido"}},size:{control:{type:"select"},options:["sm","md","lg","xl","full"],description:"Tamaño del modal usando tokens UBITS (sm, md, lg, xl, full).",table:{type:{summary:"string"},defaultValue:{summary:"md"},category:"Apariencia"}},fullScreen:{control:{type:"boolean"},description:"Si el modal debe ocupar altura máxima (full-screen).",table:{type:{summary:"boolean"},defaultValue:{summary:!1},category:"Apariencia"}},bodyContent:{control:{type:"text"},description:"Contenido HTML del cuerpo del modal. Puede ser una cadena HTML o una función que devuelve HTML.",table:{type:{summary:"string | (() => string)"},defaultValue:{summary:"..."},category:"Contenido"}},"footerButtons.tertiary.label":{control:{type:"text"},name:"Label Botón Terciario",description:"Label del botón terciario (izquierda del footer).",table:{category:"Footer Buttons"}},"footerButtons.tertiary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Terciario",description:"Controla la visibilidad del botón terciario.",table:{category:"Footer Buttons"}},"footerButtons.secondary.label":{control:{type:"text"},name:"Label Botón Secundario",description:"Label del botón secundario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.secondary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Secundario",description:"Controla la visibilidad del botón secundario.",table:{category:"Footer Buttons"}},"footerButtons.primary.label":{control:{type:"text"},name:"Label Botón Primario",description:"Label del botón primario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.primary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Primario",description:"Controla la visibilidad del botón primario.",table:{category:"Footer Buttons"}},closeOnOverlayClick:{control:{type:"boolean"},description:"Si el modal se cierra al hacer clic fuera de él.",table:{type:{summary:"boolean"},defaultValue:{summary:!0},category:"Comportamiento"}},onClose:{action:"closed",description:"Callback que se ejecuta cuando el modal se cierra.",table:{disable:!0}}}},l={args:{title:"Título del modal",size:"md",fullScreen:!1,bodyContent:`
        <p>
          Este es el contenido del modal. Puedes agregar cualquier contenido HTML aquí, como formularios, texto, imágenes, etc.
        </p>
    `,"footerButtons.tertiary.label":"Cancelar","footerButtons.tertiary.enabled":!0,"footerButtons.secondary.label":"Guardar","footerButtons.secondary.enabled":!0,"footerButtons.primary.label":"Aplicar","footerButtons.primary.enabled":!0,closeOnOverlayClick:!0},render:e=>{const t=document.createElement("div");t.id="modal-story-container",t.style.width="100vw",t.style.height="100vh",t.style.position="relative",t.style.overflow="hidden",t.style.background="var(--modifiers-normal-color-light-bg-2)",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center";const o=document.createElement("button");o.className="ubits-button ubits-button--primary ubits-button--md",o.innerHTML="<span>Abrir Modal</span>",o.style.width="auto",o.style.minWidth="auto";let n=null;const r=()=>{if(!n){const a={};e["footerButtons.tertiary.enabled"]&&(a.tertiary={label:e["footerButtons.tertiary.label"]||"Cancelar",onClick:()=>{}}),e["footerButtons.secondary.enabled"]&&(a.secondary={label:e["footerButtons.secondary.label"]||"Guardar",onClick:()=>{}}),e["footerButtons.primary.enabled"]&&(a.primary={label:e["footerButtons.primary.label"]||"Aplicar",onClick:()=>{}}),n=i({title:e.title,size:e.size,fullScreen:e.fullScreen,bodyContent:e.bodyContent,footerButtons:Object.keys(a).length>0?a:void 0,containerId:void 0,closeOnOverlayClick:e.closeOnOverlayClick,onClose:()=>{e.onClose&&e.onClose(),n&&n.element&&n.element.remove(),n=null,o.style.display="flex",o.style.visibility="visible"},open:!0}),o.style.display="none",o.style.visibility="hidden"}};return o.addEventListener("click",r),t.appendChild(o),t}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Título del modal',
    size: 'md',
    fullScreen: false,
    bodyContent: \`
        <p>
          Este es el contenido del modal. Puedes agregar cualquier contenido HTML aquí, como formularios, texto, imágenes, etc.
        </p>
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
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.innerHTML = '<span>Abrir Modal</span>';
    openButton.style.width = 'auto';
    openButton.style.minWidth = 'auto';
    let modalInstance: ReturnType<typeof createModal> | null = null;
    const handleOpenModal = () => {
      if (!modalInstance) {
        // handleOpenModal

        // Construir footerButtons desde los args individuales
        const footerButtons: any = {};
        if (args['footerButtons.tertiary.enabled']) {
          footerButtons['tertiary'] = {
            label: args['footerButtons.tertiary.label'] || 'Cancelar',
            onClick: () => {
              // Botón Tertiary clickeado
            }
          };
        }
        if (args['footerButtons.secondary.enabled']) {
          footerButtons['secondary'] = {
            label: args['footerButtons.secondary.label'] || 'Guardar',
            onClick: () => {
              // Botón Secondary clickeado
            }
          };
        }
        if (args['footerButtons.primary.enabled']) {
          footerButtons['primary'] = {
            label: args['footerButtons.primary.label'] || 'Aplicar',
            onClick: () => {
              // Botón Primary clickeado
            }
          };
        }

        // footerButtons construido

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

        // Modal creado

        // Ocultar el botón
        openButton.style.display = 'none';
        openButton.style.visibility = 'hidden';
      }
    };
    openButton.addEventListener('click', handleOpenModal);
    container.appendChild(openButton);
    return container;
  }
}`,...l.parameters?.docs?.source}}};const y=["Default"];export{l as Default,y as __namedExportsOrder,u as default};
