import{c as v}from"./popover-DuFVnYQG.js";import"./iframe-EN31ESOT.js";import"./ButtonProvider-CX_wJeLD.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";const I={title:"Feedback/Popover",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Popover UBITS con tail (flecha) para mostrar información contextual. Similar al modal pero más pequeño y con tail. Se usa para mostrar información adicional, tooltips avanzados o acciones contextuales. Soporta diferentes tamaños, posiciones de tail, header opcional, body con scroll personalizado y footer con botones opcionales."}},layout:"fullscreen"},argTypes:{title:{control:{type:"text"},description:"Título del popover (opcional).",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},bodyContent:{control:{type:"text"},description:"Contenido HTML del cuerpo del popover. Puede ser una cadena HTML o una función que devuelve HTML.",table:{type:{summary:"string | (() => string)"},defaultValue:{summary:"..."},category:"Contenido"}},width:{control:{type:"select"},options:["sm","md","lg","xl"],description:"Ancho del popover (sm: 240px, md: 360px, lg: 400px, xl: 480px).",table:{type:{summary:"string"},defaultValue:{summary:"md"},category:"Apariencia"}},tailPosition:{control:{type:"select"},options:["top","bottom","left","right"],description:"Posición del tail (flecha) del popover.",table:{type:{summary:"string"},defaultValue:{summary:"top"},category:"Apariencia"}},tailOffset:{control:{type:"number"},description:"Offset horizontal del tail desde el centro (en píxeles).",table:{type:{summary:"number"},defaultValue:{summary:"0"},category:"Apariencia"}},"footerButtons.tertiary.label":{control:{type:"text"},name:"Label Botón Terciario",description:"Label del botón terciario (izquierda del footer).",table:{category:"Footer Buttons"}},"footerButtons.tertiary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Terciario",description:"Controla la visibilidad del botón terciario.",table:{category:"Footer Buttons"}},"footerButtons.secondary.label":{control:{type:"text"},name:"Label Botón Secundario",description:"Label del botón secundario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.secondary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Secundario",description:"Controla la visibilidad del botón secundario.",table:{category:"Footer Buttons"}},"footerButtons.primary.label":{control:{type:"text"},name:"Label Botón Primario",description:"Label del botón primario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.primary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Primario",description:"Controla la visibilidad del botón primario.",table:{category:"Footer Buttons"}},open:{control:{type:"boolean"},description:"Si el popover está abierto inicialmente.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Estado"}},closeOnOutsideClick:{control:{type:"boolean"},description:"Si se debe cerrar al hacer clic fuera del popover.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}},onClose:{action:"closed",description:"Callback que se ejecuta cuando el popover se cierra.",table:{disable:!0}}}},l={args:{title:"Title",bodyContent:`
      <p style="margin: 0; font-size: var(--font-body-sm-size, 13px); color: var(--modifiers-normal-color-light-fg-1-high-static-inverted, #edeeef); line-height: 19.5px);">
        Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.
      </p>
    `,width:"md",tailPosition:"top","footerButtons.tertiary.label":"Tertiary","footerButtons.tertiary.enabled":!0,"footerButtons.secondary.label":"Secondary","footerButtons.secondary.enabled":!0,"footerButtons.primary.label":"Primary","footerButtons.primary.enabled":!0,open:!0,closeOnOutsideClick:!0},render:e=>{const o=document.createElement("div");o.id="popover-story-container",o.style.width="100vw",o.style.height="100vh",o.style.position="relative",o.style.overflow="hidden",o.style.background="var(--modifiers-normal-color-light-bg-2, #f9fafb)",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.padding="40px";const r=document.createElement("button");r.className="ubits-button ubits-button--primary ubits-button--md",r.setAttribute("data-popover-trigger","true"),r.innerHTML="<span>Abrir Popover</span>",r.style.width="auto",r.style.zIndex="1001",o.appendChild(r);let t=null;const i=()=>{const n=t&&t.element.classList.contains("ubits-popover--open");r.querySelector("span").textContent=n?"Cerrar Popover":"Abrir Popover"},c=()=>{if(t){try{t.destroy()}catch{}t=null}document.querySelectorAll(".ubits-popover").forEach(a=>{a.parentElement&&a.remove()})},s=()=>{c();const n={...e["footerButtons.tertiary.enabled"]&&{tertiary:{label:e["footerButtons.tertiary.label"]||"Tertiary",onClick:()=>alert("Tertiary clicked!")}},...e["footerButtons.secondary.enabled"]&&{secondary:{label:e["footerButtons.secondary.label"]||"Secondary",onClick:()=>alert("Secondary clicked!")}},...e["footerButtons.primary.enabled"]&&{primary:{label:e["footerButtons.primary.label"]||"Primary",onClick:()=>alert("Primary clicked!")}}},a=r.getBoundingClientRect(),f={top:a.top-200-9,left:a.left+a.width/2};t=v({title:e.title,width:e.width,tailPosition:e.tailPosition,tailOffset:e.tailOffset,bodyContent:e.bodyContent,footerButtons:Object.keys(n).length>0?n:void 0,onClose:()=>{e.onClose&&e.onClose(),i()},open:!1,closeOnOutsideClick:e.closeOnOutsideClick!==void 0?e.closeOnOutsideClick:!0,position:f}),t&&setTimeout(()=>{const m=t.element.offsetHeight,p=r.getBoundingClientRect();t.updatePosition({top:p.top-m-9,left:p.left+p.width/2})},0),i()},u=n=>{if(n.preventDefault(),n.stopPropagation(),!t||!t.element||!t.element.parentElement){s(),setTimeout(()=>{t&&(t.open(),i())},10);return}t.element.classList.contains("ubits-popover--open")?t.close():t.open(),i()};r.addEventListener("click",u);const y=()=>{const n=t&&t.element&&t.element.classList.contains("ubits-popover--open");c(),setTimeout(()=>{s(),n&&t&&setTimeout(()=>{t&&(t.open(),i())},10)},10)};e.open?setTimeout(()=>{s(),t&&(t.open(),i())},100):setTimeout(()=>{s()},100);let d=JSON.stringify({title:e.title,width:e.width,tailPosition:e.tailPosition,tailOffset:e.tailOffset,bodyContent:e.bodyContent,"footerButtons.tertiary.enabled":e["footerButtons.tertiary.enabled"],"footerButtons.tertiary.label":e["footerButtons.tertiary.label"],"footerButtons.secondary.enabled":e["footerButtons.secondary.enabled"],"footerButtons.secondary.label":e["footerButtons.secondary.label"],"footerButtons.primary.enabled":e["footerButtons.primary.enabled"],"footerButtons.primary.label":e["footerButtons.primary.label"],closeOnOutsideClick:e.closeOnOutsideClick});const b=setInterval(()=>{const n=JSON.stringify({title:e.title,width:e.width,tailPosition:e.tailPosition,tailOffset:e.tailOffset,bodyContent:e.bodyContent,"footerButtons.tertiary.enabled":e["footerButtons.tertiary.enabled"],"footerButtons.tertiary.label":e["footerButtons.tertiary.label"],"footerButtons.secondary.enabled":e["footerButtons.secondary.enabled"],"footerButtons.secondary.label":e["footerButtons.secondary.label"],"footerButtons.primary.enabled":e["footerButtons.primary.enabled"],"footerButtons.primary.label":e["footerButtons.primary.label"],closeOnOutsideClick:e.closeOnOutsideClick});n!==d&&(d=n,y())},100);return o.addEventListener("DOMNodeRemoved",()=>{clearInterval(b),c()}),o}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Title',
    bodyContent: \`
      <p style="margin: 0; font-size: var(--font-body-sm-size, 13px); color: var(--modifiers-normal-color-light-fg-1-high-static-inverted, #edeeef); line-height: 19.5px);">
        Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.
      </p>
    \`,
    width: 'md',
    tailPosition: 'top',
    'footerButtons.tertiary.label': 'Tertiary',
    'footerButtons.tertiary.enabled': true,
    'footerButtons.secondary.label': 'Secondary',
    'footerButtons.secondary.enabled': true,
    'footerButtons.primary.label': 'Primary',
    'footerButtons.primary.enabled': true,
    open: true,
    closeOnOutsideClick: true
  },
  render: args => {
    const container = document.createElement('div');
    container.id = 'popover-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';
    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.setAttribute('data-popover-trigger', 'true');
    openButton.innerHTML = '<span>Abrir Popover</span>';
    openButton.style.width = 'auto';
    openButton.style.zIndex = '1001';
    container.appendChild(openButton);
    let popoverInstance: ReturnType<typeof createPopover> | null = null;
    const updateButtonText = () => {
      const isOpen = popoverInstance && popoverInstance.element.classList.contains('ubits-popover--open');
      openButton.querySelector('span')!.textContent = isOpen ? 'Cerrar Popover' : 'Abrir Popover';
    };
    const destroyPopover = () => {
      if (popoverInstance) {
        try {
          popoverInstance.destroy();
        } catch (e) {
          // Error silencioso al destruir
        }
        popoverInstance = null;
      }
      // También asegurarnos de que no queden popovers huérfanos en el DOM
      const existingPopovers = document.querySelectorAll('.ubits-popover');
      existingPopovers.forEach(popover => {
        if (popover.parentElement) {
          popover.remove();
        }
      });
    };
    const createAndOpenPopover = () => {
      // Siempre destruir antes de crear nuevo
      destroyPopover();
      const footerButtons = {
        ...(args['footerButtons.tertiary.enabled'] && {
          tertiary: {
            label: args['footerButtons.tertiary.label'] || 'Tertiary',
            onClick: () => alert('Tertiary clicked!')
          }
        }),
        ...(args['footerButtons.secondary.enabled'] && {
          secondary: {
            label: args['footerButtons.secondary.label'] || 'Secondary',
            onClick: () => alert('Secondary clicked!')
          }
        }),
        ...(args['footerButtons.primary.enabled'] && {
          primary: {
            label: args['footerButtons.primary.label'] || 'Primary',
            onClick: () => alert('Primary clicked!')
          }
        })
      };
      const buttonRect = openButton.getBoundingClientRect();

      // SIEMPRE mostrar el popover arriba del botón, pero conservar la posición del tail según la configuración
      // El popover se posiciona arriba, pero el triángulo puede apuntar en diferentes direcciones
      // Calcular posición para que el popover aparezca arriba del botón
      // Necesitamos calcular la altura del popover después de crearlo
      // Usamos un valor estimado más grande para asegurar que esté completamente arriba
      const estimatedPopoverHeight = 200; // Altura estimada del popover
      const position: {
        top: number;
        left: number;
      } = {
        top: buttonRect.top - estimatedPopoverHeight - 9,
        // Arriba del botón menos altura del popover menos tail
        left: buttonRect.left + buttonRect.width / 2 // Centrado horizontalmente
      };
      popoverInstance = createPopover({
        title: args.title,
        width: args.width,
        tailPosition: args.tailPosition,
        // Conservar la posición del tail según la configuración del usuario
        tailOffset: args.tailOffset,
        bodyContent: args.bodyContent,
        footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined,
        onClose: () => {
          if (args.onClose) {
            args.onClose();
          }
          updateButtonText();
        },
        open: false,
        // Siempre crear cerrado, luego abrir con el botón
        closeOnOutsideClick: args.closeOnOutsideClick !== undefined ? args.closeOnOutsideClick : true,
        position: position
      });

      // Ajustar posición después de crear el popover (siempre arriba del botón)
      if (popoverInstance) {
        // Esperar un frame para que el DOM se actualice y podamos obtener las dimensiones reales
        setTimeout(() => {
          // Obtener la altura real del popover después de crearlo
          const popoverHeight = popoverInstance.element.offsetHeight;
          const buttonRect = openButton.getBoundingClientRect();
          // Reposicionar completamente arriba del botón
          popoverInstance.updatePosition({
            top: buttonRect.top - popoverHeight - 9,
            left: buttonRect.left + buttonRect.width / 2
          });
        }, 0);
      }
      updateButtonText();
    };
    const handleButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!popoverInstance || !popoverInstance.element || !popoverInstance.element.parentElement) {
        createAndOpenPopover();
        // Abrir después de crear
        setTimeout(() => {
          if (popoverInstance) {
            popoverInstance.open();
            updateButtonText();
          }
        }, 10);
        return;
      }
      const isOpen = popoverInstance.element.classList.contains('ubits-popover--open');
      if (isOpen) {
        popoverInstance.close();
      } else {
        popoverInstance.open();
      }
      updateButtonText();
    };
    openButton.addEventListener('click', handleButtonClick);

    // Recrear popover cuando cambian los args (Storybook controls)
    const recreatePopover = () => {
      const wasOpen = popoverInstance && popoverInstance.element && popoverInstance.element.classList.contains('ubits-popover--open');
      destroyPopover();
      // Esperar un poco para asegurar que el DOM se haya limpiado
      setTimeout(() => {
        createAndOpenPopover();
        if (wasOpen && popoverInstance) {
          setTimeout(() => {
            if (popoverInstance) {
              popoverInstance.open();
              updateButtonText();
            }
          }, 10);
        }
      }, 10);
    };

    // Initial render if open is true
    if (args.open) {
      setTimeout(() => {
        createAndOpenPopover();
        if (popoverInstance) {
          popoverInstance.open();
          updateButtonText();
        }
      }, 100);
    } else {
      // Crear pero no abrir inicialmente
      setTimeout(() => {
        createAndOpenPopover();
      }, 100);
    }

    // Observer para detectar cambios en los args de Storybook usando setInterval
    let lastArgs = JSON.stringify({
      title: args.title,
      width: args.width,
      tailPosition: args.tailPosition,
      tailOffset: args.tailOffset,
      bodyContent: args.bodyContent,
      'footerButtons.tertiary.enabled': args['footerButtons.tertiary.enabled'],
      'footerButtons.tertiary.label': args['footerButtons.tertiary.label'],
      'footerButtons.secondary.enabled': args['footerButtons.secondary.enabled'],
      'footerButtons.secondary.label': args['footerButtons.secondary.label'],
      'footerButtons.primary.enabled': args['footerButtons.primary.enabled'],
      'footerButtons.primary.label': args['footerButtons.primary.label'],
      closeOnOutsideClick: args.closeOnOutsideClick
    });
    const checkInterval = setInterval(() => {
      const currentArgs = JSON.stringify({
        title: args.title,
        width: args.width,
        tailPosition: args.tailPosition,
        tailOffset: args.tailOffset,
        bodyContent: args.bodyContent,
        'footerButtons.tertiary.enabled': args['footerButtons.tertiary.enabled'],
        'footerButtons.tertiary.label': args['footerButtons.tertiary.label'],
        'footerButtons.secondary.enabled': args['footerButtons.secondary.enabled'],
        'footerButtons.secondary.label': args['footerButtons.secondary.label'],
        'footerButtons.primary.enabled': args['footerButtons.primary.enabled'],
        'footerButtons.primary.label': args['footerButtons.primary.label'],
        closeOnOutsideClick: args.closeOnOutsideClick
      });
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        recreatePopover();
      }
    }, 100);

    // Limpiar interval al desmontar
    container.addEventListener('DOMNodeRemoved', () => {
      clearInterval(checkInterval);
      destroyPopover();
    });
    return container;
  }
}`,...l.parameters?.docs?.source}}};const x=["Default"];export{l as Default,x as __namedExportsOrder,I as default};
