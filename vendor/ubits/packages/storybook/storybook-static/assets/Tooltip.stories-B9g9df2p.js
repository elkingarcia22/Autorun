import{c as b}from"./TooltipProvider-C3qYI4Ua.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";const T={title:"Feedback/Tooltip",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Tooltip UBITS con tail (flecha) para mostrar información contextual. Similar al Popover pero más simple, con título, descripción y botones de acción (primario, secundario y terciario). El tooltip se adapta automáticamente al contenido usando min-width y max-width según el tamaño seleccionado (sm: 120-240px, md: 160-320px, lg: 200-400px). El ancho máximo se ajusta según la cantidad de botones visibles (3 botones: mínimo 420px, 2 botones: mínimo 360px), y el tamaño del tooltip determina el tamaño de los botones (sm→xs, md→sm, lg→md)."}},layout:"fullscreen"},argTypes:{title:{control:{type:"text"},description:"Título del tooltip (opcional)",table:{type:{summary:"string"},category:"Contenido"}},showTitle:{control:{type:"boolean"},description:"Mostrar título",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Contenido"}},description:{control:{type:"text"},description:"Descripción o mensaje del tooltip (opcional)",table:{type:{summary:"string"},category:"Contenido"}},showDescription:{control:{type:"boolean"},description:"Mostrar descripción",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Contenido"}},width:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del tooltip que determina min-width y max-width (sm: 120-240px, md: 160-320px, lg: 200-400px). El tooltip se adapta automáticamente al contenido entre estos límites. El ancho máximo se ajusta según la cantidad de botones (3 botones: mínimo 420px, 2 botones: mínimo 360px). El tamaño también determina el tamaño de los botones (sm→xs, md→sm, lg→md).",table:{type:{summary:"string"},defaultValue:{summary:"md"},category:"Apariencia"}},tailPosition:{control:{type:"select"},options:["top","bottom","left","right"],description:"Posición del tail (flecha) del tooltip",table:{type:{summary:"string"},defaultValue:{summary:"top"},category:"Apariencia"}},tailOffset:{control:{type:"number"},description:"Offset del tail desde el centro (en píxeles)",table:{type:{summary:"number"},defaultValue:{summary:"0"},category:"Apariencia"}},primaryButtonLabel:{control:{type:"text"},description:"Texto del botón primario",table:{type:{summary:"string"},category:"Botón Primario"}},showPrimaryButton:{control:{type:"boolean"},description:"Mostrar botón primario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Primario"}},primaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón primario",table:{type:{summary:"string"},category:"Botón Primario"}},showPrimaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón primario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Primario"}},secondaryButtonLabel:{control:{type:"text"},description:"Texto del botón secundario",table:{type:{summary:"string"},category:"Botón Secundario"}},showSecondaryButton:{control:{type:"boolean"},description:"Mostrar botón secundario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Secundario"}},secondaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón secundario",table:{type:{summary:"string"},category:"Botón Secundario"}},showSecondaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón secundario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Secundario"}},tertiaryButtonLabel:{control:{type:"text"},description:"Texto del botón terciario",table:{type:{summary:"string"},category:"Botón Terciario"}},showTertiaryButton:{control:{type:"boolean"},description:"Mostrar botón terciario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Terciario"}},tertiaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón terciario",table:{type:{summary:"string"},category:"Botón Terciario"}},showTertiaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón terciario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Terciario"}},open:{control:{type:"boolean"},description:"Si el tooltip está abierto inicialmente",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Estado"}},closeOnOutsideClick:{control:{type:"boolean"},description:"Si se debe cerrar al hacer clic fuera del tooltip",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}}}},l={args:{title:"Título del Tooltip",showTitle:!0,description:"Esta es la descripción del tooltip que proporciona información adicional al usuario.",showDescription:!0,width:"md",tailPosition:"top",tailOffset:0,primaryButtonLabel:"Aceptar",showPrimaryButton:!1,primaryButtonIcon:"check",showPrimaryButtonIcon:!1,secondaryButtonLabel:"Cancelar",showSecondaryButton:!1,secondaryButtonIcon:"times",showSecondaryButtonIcon:!1,tertiaryButtonLabel:"Más info",showTertiaryButton:!1,tertiaryButtonIcon:"info-circle",showTertiaryButtonIcon:!1,open:!0,closeOnOutsideClick:!0},render:t=>{const e=document.createElement("div");e.id="tooltip-story-container",e.style.width="100vw",e.style.height="100vh",e.style.position="relative",e.style.overflow="hidden",e.style.background="var(--modifiers-normal-color-light-bg-2)",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="40px";const i=document.createElement("button");i.className="ubits-button ubits-button--primary ubits-button--md",i.setAttribute("data-tooltip-trigger","true"),i.innerHTML="<span>Abrir Tooltip</span>",i.style.width="auto",i.style.zIndex="1001",e.appendChild(i);let o=null;const r=()=>{const n=o&&o.element.classList.contains("ubits-tooltip--open");i.querySelector("span").textContent=n?"Cerrar Tooltip":"Abrir Tooltip"},c=()=>{if(o){try{o.destroy()}catch(a){console.error("Error al destruir tooltip:",a)}o=null}document.querySelectorAll(".ubits-tooltip").forEach(a=>{a.parentElement&&a.remove()})},s=()=>{c();const n=i.getBoundingClientRect(),B={top:n.top-200-9,left:n.left+n.width/2};o=b({title:t.title,showTitle:t.showTitle!==void 0?t.showTitle:!0,description:t.description,showDescription:t.showDescription!==void 0?t.showDescription:!0,width:t.width,tailPosition:t.tailPosition,tailOffset:t.tailOffset,primaryButtonLabel:t.primaryButtonLabel,showPrimaryButton:t.showPrimaryButton||!1,primaryButtonIcon:t.primaryButtonIcon,showPrimaryButtonIcon:t.showPrimaryButtonIcon||!1,secondaryButtonLabel:t.secondaryButtonLabel,showSecondaryButton:t.showSecondaryButton||!1,secondaryButtonIcon:t.secondaryButtonIcon,showSecondaryButtonIcon:t.showSecondaryButtonIcon||!1,tertiaryButtonLabel:t.tertiaryButtonLabel,showTertiaryButton:t.showTertiaryButton||!1,tertiaryButtonIcon:t.tertiaryButtonIcon,showTertiaryButtonIcon:t.showTertiaryButtonIcon||!1,onPrimaryAction:()=>{alert("Botón primario clickeado!")},onSecondaryAction:()=>{alert("Botón secundario clickeado!")},onTertiaryAction:()=>{alert("Botón terciario clickeado!")},onClose:()=>{t.onClose&&t.onClose(),r()},open:!1,closeOnOutsideClick:t.closeOnOutsideClick!==void 0?t.closeOnOutsideClick:!0,position:B}),o&&setTimeout(()=>{const h=o.element.offsetHeight,u=i.getBoundingClientRect();o.updatePosition({top:u.top-h-9,left:u.left+u.width/2})},0),r()},d=n=>{if(n.preventDefault(),n.stopPropagation(),!o||!o.element||!o.element.parentElement){s(),setTimeout(()=>{o&&(o.open(),r())},10);return}o.element.classList.contains("ubits-tooltip--open")?o.close():o.open(),r()};i.addEventListener("click",d);const y=()=>{const n=o&&o.element&&o.element.classList.contains("ubits-tooltip--open");c(),setTimeout(()=>{s(),n&&o&&setTimeout(()=>{o&&(o.open(),r())},10)},10)};t.open?setTimeout(()=>{s(),o&&(o.open(),r())},100):setTimeout(()=>{s()},100);let p=JSON.stringify({title:t.title,showTitle:t.showTitle,description:t.description,showDescription:t.showDescription,width:t.width,tailPosition:t.tailPosition,tailOffset:t.tailOffset,primaryButtonLabel:t.primaryButtonLabel,showPrimaryButton:t.showPrimaryButton,primaryButtonIcon:t.primaryButtonIcon,showPrimaryButtonIcon:t.showPrimaryButtonIcon,secondaryButtonLabel:t.secondaryButtonLabel,showSecondaryButton:t.showSecondaryButton,secondaryButtonIcon:t.secondaryButtonIcon,showSecondaryButtonIcon:t.showSecondaryButtonIcon,tertiaryButtonLabel:t.tertiaryButtonLabel,showTertiaryButton:t.showTertiaryButton,tertiaryButtonIcon:t.tertiaryButtonIcon,showTertiaryButtonIcon:t.showTertiaryButtonIcon,closeOnOutsideClick:t.closeOnOutsideClick});const m=setInterval(()=>{const n=JSON.stringify({title:t.title,showTitle:t.showTitle,description:t.description,showDescription:t.showDescription,width:t.width,tailPosition:t.tailPosition,tailOffset:t.tailOffset,primaryButtonLabel:t.primaryButtonLabel,showPrimaryButton:t.showPrimaryButton,primaryButtonIcon:t.primaryButtonIcon,showPrimaryButtonIcon:t.showPrimaryButtonIcon,secondaryButtonLabel:t.secondaryButtonLabel,showSecondaryButton:t.showSecondaryButton,secondaryButtonIcon:t.secondaryButtonIcon,showSecondaryButtonIcon:t.showSecondaryButtonIcon,tertiaryButtonLabel:t.tertiaryButtonLabel,showTertiaryButton:t.showTertiaryButton,tertiaryButtonIcon:t.tertiaryButtonIcon,showTertiaryButtonIcon:t.showTertiaryButtonIcon,closeOnOutsideClick:t.closeOnOutsideClick});n!==p&&(p=n,y())},100);return e.addEventListener("DOMNodeRemoved",()=>{clearInterval(m),c()}),e}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Título del Tooltip',
    showTitle: true,
    description: 'Esta es la descripción del tooltip que proporciona información adicional al usuario.',
    showDescription: true,
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    primaryButtonLabel: 'Aceptar',
    showPrimaryButton: false,
    primaryButtonIcon: 'check',
    showPrimaryButtonIcon: false,
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: false,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: false,
    tertiaryButtonLabel: 'Más info',
    showTertiaryButton: false,
    tertiaryButtonIcon: 'info-circle',
    showTertiaryButtonIcon: false,
    open: true,
    closeOnOutsideClick: true
  },
  render: args => {
    const container = document.createElement('div');
    container.id = 'tooltip-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';
    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.setAttribute('data-tooltip-trigger', 'true');
    openButton.innerHTML = '<span>Abrir Tooltip</span>';
    openButton.style.width = 'auto';
    openButton.style.zIndex = '1001';
    container.appendChild(openButton);
    let tooltipInstance: ReturnType<typeof createTooltip> | null = null;
    const updateButtonText = () => {
      const isOpen = tooltipInstance && tooltipInstance.element.classList.contains('ubits-tooltip--open');
      openButton.querySelector('span')!.textContent = isOpen ? 'Cerrar Tooltip' : 'Abrir Tooltip';
    };
    const destroyTooltip = () => {
      if (tooltipInstance) {
        try {
          tooltipInstance.destroy();
        } catch (e) {
          console.error('Error al destruir tooltip:', e);
        }
        tooltipInstance = null;
      }
      // También asegurarnos de que no queden tooltips huérfanos en el DOM
      const existingTooltips = document.querySelectorAll('.ubits-tooltip');
      existingTooltips.forEach(tooltip => {
        if (tooltip.parentElement) {
          tooltip.remove();
        }
      });
    };
    const createAndOpenTooltip = () => {
      // Siempre destruir antes de crear nuevo
      destroyTooltip();
      const buttonRect = openButton.getBoundingClientRect();

      // SIEMPRE mostrar el tooltip arriba del botón, pero conservar la posición del tail según la configuración
      // El tooltip se posiciona arriba, pero el triángulo puede apuntar en diferentes direcciones
      // Calcular posición para que el tooltip aparezca arriba del botón
      // Necesitamos calcular la altura del tooltip después de crearlo
      // Usamos un valor estimado más grande para asegurar que esté completamente arriba
      const estimatedTooltipHeight = 200; // Altura estimada del tooltip
      const position: {
        top: number;
        left: number;
      } = {
        top: buttonRect.top - estimatedTooltipHeight - 9,
        // Arriba del botón menos altura del tooltip menos tail
        left: buttonRect.left + buttonRect.width / 2 // Centrado horizontalmente
      };
      tooltipInstance = createTooltip({
        title: args.title,
        showTitle: args.showTitle !== undefined ? args.showTitle : true,
        description: args.description,
        showDescription: args.showDescription !== undefined ? args.showDescription : true,
        width: args.width,
        tailPosition: args.tailPosition,
        // Conservar la posición del tail según la configuración del usuario
        tailOffset: args.tailOffset,
        primaryButtonLabel: args.primaryButtonLabel,
        showPrimaryButton: args.showPrimaryButton || false,
        primaryButtonIcon: args.primaryButtonIcon,
        showPrimaryButtonIcon: args.showPrimaryButtonIcon || false,
        secondaryButtonLabel: args.secondaryButtonLabel,
        showSecondaryButton: args.showSecondaryButton || false,
        secondaryButtonIcon: args.secondaryButtonIcon,
        showSecondaryButtonIcon: args.showSecondaryButtonIcon || false,
        tertiaryButtonLabel: args.tertiaryButtonLabel,
        showTertiaryButton: args.showTertiaryButton || false,
        tertiaryButtonIcon: args.tertiaryButtonIcon,
        showTertiaryButtonIcon: args.showTertiaryButtonIcon || false,
        onPrimaryAction: () => {
          alert('Botón primario clickeado!');
        },
        onSecondaryAction: () => {
          alert('Botón secundario clickeado!');
        },
        onTertiaryAction: () => {
          alert('Botón terciario clickeado!');
        },
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

      // Ajustar posición después de crear el tooltip (siempre arriba del botón)
      if (tooltipInstance) {
        setTimeout(() => {
          const tooltipHeight = tooltipInstance.element.offsetHeight;
          const buttonRect = openButton.getBoundingClientRect();
          tooltipInstance.updatePosition({
            top: buttonRect.top - tooltipHeight - 9,
            left: buttonRect.left + buttonRect.width / 2
          });
        }, 0);
      }
      updateButtonText();
    };
    const handleButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!tooltipInstance || !tooltipInstance.element || !tooltipInstance.element.parentElement) {
        createAndOpenTooltip();
        setTimeout(() => {
          if (tooltipInstance) {
            tooltipInstance.open();
            updateButtonText();
          }
        }, 10);
        return;
      }
      const isOpen = tooltipInstance.element.classList.contains('ubits-tooltip--open');
      if (isOpen) {
        tooltipInstance.close();
      } else {
        tooltipInstance.open();
      }
      updateButtonText();
    };
    openButton.addEventListener('click', handleButtonClick);

    // Recrear tooltip cuando cambian los args (Storybook controls)
    const recreateTooltip = () => {
      const wasOpen = tooltipInstance && tooltipInstance.element && tooltipInstance.element.classList.contains('ubits-tooltip--open');
      destroyTooltip();
      setTimeout(() => {
        createAndOpenTooltip();
        if (wasOpen && tooltipInstance) {
          setTimeout(() => {
            if (tooltipInstance) {
              tooltipInstance.open();
              updateButtonText();
            }
          }, 10);
        }
      }, 10);
    };

    // Initial render if open is true
    if (args.open) {
      setTimeout(() => {
        createAndOpenTooltip();
        if (tooltipInstance) {
          tooltipInstance.open();
          updateButtonText();
        }
      }, 100);
    } else {
      setTimeout(() => {
        createAndOpenTooltip();
      }, 100);
    }

    // Observer para detectar cambios en los args de Storybook
    let lastArgs = JSON.stringify({
      title: args.title,
      showTitle: args.showTitle,
      description: args.description,
      showDescription: args.showDescription,
      width: args.width,
      tailPosition: args.tailPosition,
      tailOffset: args.tailOffset,
      primaryButtonLabel: args.primaryButtonLabel,
      showPrimaryButton: args.showPrimaryButton,
      primaryButtonIcon: args.primaryButtonIcon,
      showPrimaryButtonIcon: args.showPrimaryButtonIcon,
      secondaryButtonLabel: args.secondaryButtonLabel,
      showSecondaryButton: args.showSecondaryButton,
      secondaryButtonIcon: args.secondaryButtonIcon,
      showSecondaryButtonIcon: args.showSecondaryButtonIcon,
      tertiaryButtonLabel: args.tertiaryButtonLabel,
      showTertiaryButton: args.showTertiaryButton,
      tertiaryButtonIcon: args.tertiaryButtonIcon,
      showTertiaryButtonIcon: args.showTertiaryButtonIcon,
      closeOnOutsideClick: args.closeOnOutsideClick
    });
    const checkInterval = setInterval(() => {
      const currentArgs = JSON.stringify({
        title: args.title,
        showTitle: args.showTitle,
        description: args.description,
        showDescription: args.showDescription,
        width: args.width,
        tailPosition: args.tailPosition,
        tailOffset: args.tailOffset,
        primaryButtonLabel: args.primaryButtonLabel,
        showPrimaryButton: args.showPrimaryButton,
        primaryButtonIcon: args.primaryButtonIcon,
        showPrimaryButtonIcon: args.showPrimaryButtonIcon,
        secondaryButtonLabel: args.secondaryButtonLabel,
        showSecondaryButton: args.showSecondaryButton,
        secondaryButtonIcon: args.secondaryButtonIcon,
        showSecondaryButtonIcon: args.showSecondaryButtonIcon,
        tertiaryButtonLabel: args.tertiaryButtonLabel,
        showTertiaryButton: args.showTertiaryButton,
        tertiaryButtonIcon: args.tertiaryButtonIcon,
        showTertiaryButtonIcon: args.showTertiaryButtonIcon,
        closeOnOutsideClick: args.closeOnOutsideClick
      });
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        recreateTooltip();
      }
    }, 100);

    // Limpiar interval al desmontar
    container.addEventListener('DOMNodeRemoved', () => {
      clearInterval(checkInterval);
      destroyTooltip();
    });
    return container;
  }
}`,...l.parameters?.docs?.source}}};const g=["Default"];export{l as Default,g as __namedExportsOrder,T as default};
