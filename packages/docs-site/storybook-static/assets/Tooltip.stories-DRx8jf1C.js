import"./iframe-Qhh1jVCN.js";import"./preload-helper-PPVm8Dsz.js";function j(t){const{title:s,showTitle:c=!0,description:i,showDescription:n=!0,primaryButtonLabel:d,showPrimaryButton:u=!1,primaryButtonIcon:f,showPrimaryButtonIcon:B=!1,secondaryButtonLabel:b,showSecondaryButton:y=!1,secondaryButtonIcon:o,showSecondaryButtonIcon:a=!1,tertiaryButtonLabel:p,showTertiaryButton:l=!1,tertiaryButtonIcon:m,showTertiaryButtonIcon:w=!1,width:T="md",tailPosition:e="top",tailOffset:r=0,className:h="",style:g=""}=t,v={sm:"xs",md:"sm",lg:"md"}[T]||"sm",$=(u?1:0)+(y?1:0)+(l?1:0),k={sm:120,md:160,lg:200},R={sm:240,md:320,lg:400};let _=k[T]||k.md,I=R[T]||R.md;$===3?I=Math.max(I,420):$===2&&(I=Math.max(I,360));const D=`min-width: ${_}px; max-width: ${I}px; width: auto;`,M=["ubits-tooltip",`ubits-tooltip--tail-${e}`,h].filter(Boolean).join(" "),z=` style="${`${D}${g?`; ${g}`:""}`}"`;let O="";r&&(e==="top"||e==="bottom"?O=`transform: translateX(calc(-50% + ${r}px));`:O=`transform: translateY(calc(-50% + ${r}px));`);const H=`
    <div class="ubits-tooltip__tail"${O?` style="${O}"`:""}>
      <div class="ubits-tooltip__tail-inner"></div>
    </div>
  `,W=c&&s?`
    <div class="ubits-tooltip__header">
      <div class="ubits-tooltip__header-title">
        <p class="ubits-body-md-semibold">${s}</p>
      </div>
    </div>
  `:"",q=n&&i?`
    <div class="ubits-tooltip__body">
      <div class="ubits-tooltip__body-content">
        <p class="ubits-body-md">${i}</p>
      </div>
    </div>
  `:"";let A="";if(u||y||l){let L=d||"";B&&f&&(L=`<i class="far fa-${f}"></i> ${L}`);const N=u&&d?`<button class="ubits-button ubits-button--primary ubits-button--${v} ubits-tooltip__footer-button" data-action="primary" type="button">${L}</button>`:"";let S=b||"";a&&o&&(S=`<i class="far fa-${o}"></i> ${S}`);const V=y&&b?`<button class="ubits-button ubits-button--secondary ubits-button--${v} ubits-tooltip__footer-button" data-action="secondary" type="button">${S}</button>`:"";let C=p||"";w&&m&&(C=`<i class="far fa-${m}"></i> ${C}`);const E=l&&p?`<button class="ubits-button ubits-button--tertiary ubits-button--${v} ubits-tooltip__footer-button" data-action="tertiary" type="button">${C}</button>`:"";A=`
      <div class="ubits-tooltip__footer">
        <div class="ubits-tooltip__footer-actions${l?"":" ubits-tooltip__footer-actions--no-tertiary"}">
          ${E?`
          <div class="ubits-tooltip__footer-left">
            ${E}
          </div>
          `:""}
          <div class="ubits-tooltip__footer-right">
            ${V}
            ${N}
          </div>
        </div>
      </div>
    `}return`
    <div class="${M}"${z}>
      ${H}
      <div class="ubits-tooltip__content">
        ${W}
        ${q}
        ${A}
      </div>
    </div>
  `.trim()}function Y(t){const{onClose:s,closeOnOutsideClick:c=!0,open:i=!1,position:n,referenceElement:d,onPrimaryAction:u,onSecondaryAction:f,onTertiaryAction:B}=t,b=document.body,y=document.createElement("div");y.innerHTML=j(t);const o=y.firstElementChild;if(!o)throw new Error("No se pudo crear el tooltip");if(n){o.style.position="fixed";const e=t.tailPosition||"top";e==="top"||e==="bottom"?(n.left!==void 0&&(o.style.left=`${n.left}px`,o.style.transform="translateX(-50%)"),n.top!==void 0&&(o.style.top=`${n.top}px`)):e==="left"?(n.top!==void 0&&(o.style.top=`${n.top}px`,o.style.transform="translateY(-50%)"),n.left!==void 0&&(o.style.left=`${n.left}px`)):e==="right"&&(n.top!==void 0&&(o.style.top=`${n.top}px`,o.style.transform="translateY(-50%)"),n.left!==void 0&&(o.style.left=`${n.left}px`))}const a=()=>{if(o.classList.add("ubits-tooltip--open"),n){o.style.position="fixed";const e=t.tailPosition||"top";e==="top"||e==="bottom"?(n.left!==void 0&&(o.style.left=`${n.left}px`,o.style.transform="translateX(-50%)"),n.top!==void 0&&(o.style.top=`${n.top}px`)):e==="left"?(n.top!==void 0&&(o.style.top=`${n.top}px`,o.style.transform="translateY(-50%)"),n.left!==void 0&&(o.style.left=`${n.left}px`)):e==="right"&&(n.top!==void 0&&(o.style.top=`${n.top}px`,o.style.transform="translateY(-50%)"),n.left!==void 0&&(o.style.left=`${n.left}px`))}else if(d){const e=d.getBoundingClientRect(),r=o.getBoundingClientRect();o.style.position="fixed",o.style.top=`${e.bottom+8}px`,o.style.left=`${e.left+e.width/2-r.width/2}px`}},p=()=>{o.classList.remove("ubits-tooltip--open"),s&&s()},l=e=>{const r=t.tailPosition||"top";e.top!==void 0&&(o.style.top=`${e.top}px`),e.left!==void 0&&(o.style.left=`${e.left}px`),e.right!==void 0&&(o.style.right=`${e.right}px`),e.bottom!==void 0&&(o.style.bottom=`${e.bottom}px`),r==="top"||r==="bottom"?e.left!==void 0&&(o.style.transform="translateX(-50%)"):(r==="left"||r==="right")&&e.top!==void 0&&(o.style.transform="translateY(-50%)")};let m=()=>{o.parentElement&&o.parentElement.removeChild(o)};if(c){const e=h=>{const g=h.target;if(o.classList.contains("ubits-tooltip--open")&&!o.contains(g)){const x=g;x.closest&&x.closest("[data-tooltip-trigger]")||p()}};document.addEventListener("click",e,!0);const r=m;m=()=>{document.removeEventListener("click",e,!0),r()}}if(u){const e=o.querySelector('[data-action="primary"]');e&&e.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),u()})}if(f){const e=o.querySelector('[data-action="secondary"]');e&&e.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),f()})}if(B){const e=o.querySelector('[data-action="tertiary"]');e&&e.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),B()})}const w=()=>{const e=o.querySelector(".ubits-tooltip__tail");if(!e)return;const r=t.tailPosition||"top",h=t.tailOffset||0;h!==0?r==="top"||r==="bottom"?(e.style.left="50%",e.style.right="auto",e.style.transform=`translateX(calc(-50% + ${h}px))`,r==="bottom"&&(e.style.transform+=" rotate(180deg)")):(e.style.top="50%",e.style.bottom="auto",e.style.transform=`translateY(calc(-50% + ${h}px))`):(e.style.removeProperty("left"),e.style.removeProperty("right"),e.style.removeProperty("top"),e.style.removeProperty("bottom"),e.style.removeProperty("transform"),e.style.removeProperty("margin-left"),e.style.removeProperty("margin-right")),e.offsetHeight};if(typeof ResizeObserver<"u")try{const e=new ResizeObserver(()=>{w()});e.observe(o),o._tailResizeObserver=e,setTimeout(()=>{w()},50)}catch(e){console.warn("⚠️ [TooltipProvider] Error al crear ResizeObserver:",e),setTimeout(()=>{w()},50)}else setTimeout(()=>{w()},100);const T=m;return m=()=>{o._tailResizeObserver&&(o._tailResizeObserver.disconnect(),delete o._tailResizeObserver),T()},b.appendChild(o),i&&a(),{element:o,open:a,close:p,updatePosition:l,destroy:m}}const K={title:"Components/Tooltip",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Tooltip UBITS con tail (flecha) para mostrar información contextual. Similar al Popover pero más simple, con título, descripción y botones de acción (primario, secundario y terciario). El tooltip se adapta automáticamente al contenido usando min-width y max-width según el tamaño seleccionado (sm: 120-240px, md: 160-320px, lg: 200-400px). El ancho máximo se ajusta según la cantidad de botones visibles (3 botones: mínimo 420px, 2 botones: mínimo 360px), y el tamaño del tooltip determina el tamaño de los botones (sm→xs, md→sm, lg→md)."}},layout:"fullscreen"},argTypes:{title:{control:{type:"text"},description:"Título del tooltip (opcional)",table:{type:{summary:"string"},category:"Contenido"}},showTitle:{control:{type:"boolean"},description:"Mostrar título",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Contenido"}},description:{control:{type:"text"},description:"Descripción o mensaje del tooltip (opcional)",table:{type:{summary:"string"},category:"Contenido"}},showDescription:{control:{type:"boolean"},description:"Mostrar descripción",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Contenido"}},width:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del tooltip que determina min-width y max-width (sm: 120-240px, md: 160-320px, lg: 200-400px). El tooltip se adapta automáticamente al contenido entre estos límites. El ancho máximo se ajusta según la cantidad de botones (3 botones: mínimo 420px, 2 botones: mínimo 360px). El tamaño también determina el tamaño de los botones (sm→xs, md→sm, lg→md).",table:{type:{summary:"string"},defaultValue:{summary:"md"},category:"Apariencia"}},tailPosition:{control:{type:"select"},options:["top","bottom","left","right"],description:"Posición del tail (flecha) del tooltip",table:{type:{summary:"string"},defaultValue:{summary:"top"},category:"Apariencia"}},tailOffset:{control:{type:"number"},description:"Offset del tail desde el centro (en píxeles)",table:{type:{summary:"number"},defaultValue:{summary:"0"},category:"Apariencia"}},primaryButtonLabel:{control:{type:"text"},description:"Texto del botón primario",table:{type:{summary:"string"},category:"Botón Primario"}},showPrimaryButton:{control:{type:"boolean"},description:"Mostrar botón primario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Primario"}},primaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón primario",table:{type:{summary:"string"},category:"Botón Primario"}},showPrimaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón primario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Primario"}},secondaryButtonLabel:{control:{type:"text"},description:"Texto del botón secundario",table:{type:{summary:"string"},category:"Botón Secundario"}},showSecondaryButton:{control:{type:"boolean"},description:"Mostrar botón secundario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Secundario"}},secondaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón secundario",table:{type:{summary:"string"},category:"Botón Secundario"}},showSecondaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón secundario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Secundario"}},tertiaryButtonLabel:{control:{type:"text"},description:"Texto del botón terciario",table:{type:{summary:"string"},category:"Botón Terciario"}},showTertiaryButton:{control:{type:"boolean"},description:"Mostrar botón terciario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Terciario"}},tertiaryButtonIcon:{control:{type:"text"},description:"Nombre del icono FontAwesome para el botón terciario",table:{type:{summary:"string"},category:"Botón Terciario"}},showTertiaryButtonIcon:{control:{type:"boolean"},description:"Mostrar icono en el botón terciario",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Botón Terciario"}},open:{control:{type:"boolean"},description:"Si el tooltip está abierto inicialmente",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Estado"}},closeOnOutsideClick:{control:{type:"boolean"},description:"Si se debe cerrar al hacer clic fuera del tooltip",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}}}},P={args:{title:"Título del Tooltip",showTitle:!0,description:"Esta es la descripción del tooltip que proporciona información adicional al usuario.",showDescription:!0,width:"md",tailPosition:"top",tailOffset:0,primaryButtonLabel:"Aceptar",showPrimaryButton:!1,primaryButtonIcon:"check",showPrimaryButtonIcon:!1,secondaryButtonLabel:"Cancelar",showSecondaryButton:!1,secondaryButtonIcon:"times",showSecondaryButtonIcon:!1,tertiaryButtonLabel:"Más info",showTertiaryButton:!1,tertiaryButtonIcon:"info-circle",showTertiaryButtonIcon:!1,open:!0,closeOnOutsideClick:!0},render:t=>{const s=document.createElement("div");s.id="tooltip-story-container",s.style.width="100vw",s.style.height="100vh",s.style.position="relative",s.style.overflow="hidden",s.style.background="var(--ubits-bg-2, #f9fafb)",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.padding="40px";const c=document.createElement("button");c.className="ubits-button ubits-button--primary ubits-button--md",c.setAttribute("data-tooltip-trigger","true"),c.innerHTML="<span>Abrir Tooltip</span>",c.style.width="auto",c.style.zIndex="1001",s.appendChild(c);let i=null;const n=()=>{const o=i&&i.element.classList.contains("ubits-tooltip--open");c.querySelector("span").textContent=o?"Cerrar Tooltip":"Abrir Tooltip"},d=()=>{if(i){try{i.destroy()}catch(a){console.error("Error al destruir tooltip:",a)}i=null}document.querySelectorAll(".ubits-tooltip").forEach(a=>{a.parentElement&&a.remove()})},u=()=>{d();const o=c.getBoundingClientRect();let a;if(t.tailPosition==="top")a={top:o.bottom+9,left:o.left+o.width/2};else if(t.tailPosition==="bottom")a={top:o.top-200-9,left:o.left+o.width/2};else if(t.tailPosition==="left")a={top:o.top+o.height/2,left:o.right+9};else if(t.tailPosition==="right"){const l={sm:240,md:320,lg:400}[t.width||"md"]||320;a={top:o.top+o.height/2,left:o.left-l-9}}i=Y({title:t.title,showTitle:t.showTitle!==void 0?t.showTitle:!0,description:t.description,showDescription:t.showDescription!==void 0?t.showDescription:!0,width:t.width,tailPosition:t.tailPosition,tailOffset:t.tailOffset,primaryButtonLabel:t.primaryButtonLabel,showPrimaryButton:t.showPrimaryButton||!1,primaryButtonIcon:t.primaryButtonIcon,showPrimaryButtonIcon:t.showPrimaryButtonIcon||!1,secondaryButtonLabel:t.secondaryButtonLabel,showSecondaryButton:t.showSecondaryButton||!1,secondaryButtonIcon:t.secondaryButtonIcon,showSecondaryButtonIcon:t.showSecondaryButtonIcon||!1,tertiaryButtonLabel:t.tertiaryButtonLabel,showTertiaryButton:t.showTertiaryButton||!1,tertiaryButtonIcon:t.tertiaryButtonIcon,showTertiaryButtonIcon:t.showTertiaryButtonIcon||!1,onPrimaryAction:()=>{alert("Botón primario clickeado!")},onSecondaryAction:()=>{alert("Botón secundario clickeado!")},onTertiaryAction:()=>{alert("Botón terciario clickeado!")},onClose:()=>{t.onClose&&t.onClose(),n()},open:!1,closeOnOutsideClick:t.closeOnOutsideClick!==void 0?t.closeOnOutsideClick:!0,position:a}),t.tailPosition==="bottom"&&i?setTimeout(()=>{const p=i.element.offsetHeight,l=c.getBoundingClientRect();i.updatePosition({top:l.top-p-9,left:l.left+l.width/2})},0):t.tailPosition==="right"&&i&&setTimeout(()=>{const p=i.element.offsetWidth,l=c.getBoundingClientRect();i.updatePosition({top:l.top+l.height/2,left:l.left-p-9})},0),n()},f=o=>{if(o.preventDefault(),o.stopPropagation(),!i||!i.element||!i.element.parentElement){u(),setTimeout(()=>{i&&(i.open(),n())},10);return}i.element.classList.contains("ubits-tooltip--open")?i.close():i.open(),n()};c.addEventListener("click",f);const B=()=>{const o=i&&i.element&&i.element.classList.contains("ubits-tooltip--open");d(),setTimeout(()=>{u(),o&&i&&setTimeout(()=>{i&&(i.open(),n())},10)},10)};t.open?setTimeout(()=>{u(),i&&(i.open(),n())},100):setTimeout(()=>{u()},100);let b=JSON.stringify({title:t.title,showTitle:t.showTitle,description:t.description,showDescription:t.showDescription,width:t.width,tailPosition:t.tailPosition,tailOffset:t.tailOffset,primaryButtonLabel:t.primaryButtonLabel,showPrimaryButton:t.showPrimaryButton,primaryButtonIcon:t.primaryButtonIcon,showPrimaryButtonIcon:t.showPrimaryButtonIcon,secondaryButtonLabel:t.secondaryButtonLabel,showSecondaryButton:t.showSecondaryButton,secondaryButtonIcon:t.secondaryButtonIcon,showSecondaryButtonIcon:t.showSecondaryButtonIcon,tertiaryButtonLabel:t.tertiaryButtonLabel,showTertiaryButton:t.showTertiaryButton,tertiaryButtonIcon:t.tertiaryButtonIcon,showTertiaryButtonIcon:t.showTertiaryButtonIcon,closeOnOutsideClick:t.closeOnOutsideClick});const y=setInterval(()=>{const o=JSON.stringify({title:t.title,showTitle:t.showTitle,description:t.description,showDescription:t.showDescription,width:t.width,tailPosition:t.tailPosition,tailOffset:t.tailOffset,primaryButtonLabel:t.primaryButtonLabel,showPrimaryButton:t.showPrimaryButton,primaryButtonIcon:t.primaryButtonIcon,showPrimaryButtonIcon:t.showPrimaryButtonIcon,secondaryButtonLabel:t.secondaryButtonLabel,showSecondaryButton:t.showSecondaryButton,secondaryButtonIcon:t.secondaryButtonIcon,showSecondaryButtonIcon:t.showSecondaryButtonIcon,tertiaryButtonLabel:t.tertiaryButtonLabel,showTertiaryButton:t.showTertiaryButton,tertiaryButtonIcon:t.tertiaryButtonIcon,showTertiaryButtonIcon:t.showTertiaryButtonIcon,closeOnOutsideClick:t.closeOnOutsideClick});o!==b&&(b=o,B())},100);return s.addEventListener("DOMNodeRemoved",()=>{clearInterval(y),d()}),s}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
    container.style.background = 'var(--ubits-bg-2, #f9fafb)';
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

      // Calcular posición para que el tooltip aparezca correctamente según tailPosition
      let position: {
        top: number;
        left: number;
      } | undefined;
      if (args.tailPosition === 'top') {
        // Tooltip debajo del botón, tail arriba apuntando al botón
        position = {
          top: buttonRect.bottom + 9,
          // 9px debajo del botón (altura del tail)
          left: buttonRect.left + buttonRect.width / 2 // Centrado horizontalmente
        };
      } else if (args.tailPosition === 'bottom') {
        // Tooltip arriba del botón, tail abajo apuntando al botón
        const estimatedTooltipHeight = 200;
        position = {
          top: buttonRect.top - estimatedTooltipHeight - 9,
          left: buttonRect.left + buttonRect.width / 2
        };
      } else if (args.tailPosition === 'left') {
        // Tooltip a la derecha del botón, tail izquierda apuntando al botón
        position = {
          top: buttonRect.top + buttonRect.height / 2,
          left: buttonRect.right + 9
        };
      } else if (args.tailPosition === 'right') {
        // Tooltip a la izquierda del botón, tail derecha apuntando al botón
        const tooltipWidths: Record<string, number> = {
          sm: 240,
          md: 320,
          lg: 400
        };
        const estimatedTooltipWidth = tooltipWidths[args.width || 'md'] || 320;
        position = {
          top: buttonRect.top + buttonRect.height / 2,
          left: buttonRect.left - estimatedTooltipWidth - 9
        };
      }
      tooltipInstance = createTooltip({
        title: args.title,
        showTitle: args.showTitle !== undefined ? args.showTitle : true,
        description: args.description,
        showDescription: args.showDescription !== undefined ? args.showDescription : true,
        width: args.width,
        tailPosition: args.tailPosition,
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

      // Ajustar posición después de crear el tooltip para bottom y right
      if (args.tailPosition === 'bottom' && tooltipInstance) {
        setTimeout(() => {
          const tooltipHeight = tooltipInstance.element.offsetHeight;
          const buttonRect = openButton.getBoundingClientRect();
          tooltipInstance.updatePosition({
            top: buttonRect.top - tooltipHeight - 9,
            left: buttonRect.left + buttonRect.width / 2
          });
        }, 0);
      } else if (args.tailPosition === 'right' && tooltipInstance) {
        setTimeout(() => {
          const tooltipWidth = tooltipInstance.element.offsetWidth;
          const buttonRect = openButton.getBoundingClientRect();
          tooltipInstance.updatePosition({
            top: buttonRect.top + buttonRect.height / 2,
            left: buttonRect.left - tooltipWidth - 9
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
}`,...P.parameters?.docs?.source}}};const Q=["Default"];export{P as Default,Q as __namedExportsOrder,K as default};
