import"./iframe-BfFsla13.js";import"./preload-helper-PPVm8Dsz.js";const C={sm:"240px",md:"360px",lg:"400px",xl:"480px"};function P(e){const{title:l,bodyContent:i="",width:n="md",tailPosition:u="top",tailOffset:r=0,footerButtons:p,className:m=""}=e,v=C[n]||C.md,t=`ubits-popover--width-${n}`,y=`ubits-popover--tail-${u}`,s=["ubits-popover",t,y,m].filter(Boolean).join(" "),a=`
    <div class="ubits-popover__tail" style="${u==="top"||u==="bottom"?`left: ${r?`calc(50% + ${r}px)`:"50%"};`:`top: ${r?`calc(50% + ${r}px)`:"50%"};`}">
      <div class="ubits-popover__tail-inner"></div>
    </div>
  `,b=l?`
    <div class="ubits-popover__header">
      <div class="ubits-popover__header-title">
        <p class="ubits-body-md-semibold">${l}</p>
      </div>
    </div>
  `:"",o=`
    <div class="ubits-popover__body">
      <div class="ubits-popover__body-content">
        ${typeof i=="function"?i():i||'<div class="ubits-popover__placeholder">Contenido del popover</div>'}
      </div>
      <div class="ubits-popover__scrollbar">
        <div class="ubits-popover__scrollbar-bar"></div>
      </div>
    </div>
  `,c=p?`
    <div class="ubits-popover__footer">
      <div class="ubits-popover__footer-actions${p.tertiary?"":" ubits-popover__footer-actions--no-tertiary"}">
        ${p.tertiary?`
        <div class="ubits-popover__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${p.tertiary.label}</span>
          </button>
        </div>
        `:""}
        <div class="ubits-popover__footer-right">
          ${p.secondary?`
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${p.secondary.label}</span>
          </button>
          `:""}
          ${p.primary?`
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${p.primary.label}</span>
          </button>
          `:""}
        </div>
      </div>
    </div>
  `:"";return`
    <div class="${s}" style="width: ${v};">
      ${a}
      <div class="ubits-popover__content">
        ${b}
        ${o}
        ${c}
      </div>
    </div>
  `.trim()}function O(e){const{containerId:l,onClose:i,closeOnOutsideClick:n=!0,open:u=!1,position:r,referenceElement:p}=e;let m;l?m=document.getElementById(l)||document.body:m=document.body;const v=document.createElement("div");v.innerHTML=P(e);const t=v.firstElementChild;if(!t)throw new Error("No se pudo crear el popover");if(r){t.style.position="fixed";const o=e.tailPosition||"top";o==="top"||o==="bottom"?(r.left!==void 0&&(t.style.left=`${r.left}px`,t.style.transform="translateX(-50%)"),r.top!==void 0&&(t.style.top=`${r.top}px`)):o==="left"?(r.top!==void 0&&(t.style.top=`${r.top}px`,t.style.transform="translateY(-50%)"),r.left!==void 0&&(t.style.left=`${r.left}px`)):o==="right"&&(r.top!==void 0&&(t.style.top=`${r.top}px`,t.style.transform="translateY(-50%)"),r.left!==void 0&&(t.style.left=`${r.left}px`))}const y=()=>{if(t.classList.add("ubits-popover--open"),r){t.style.position="fixed";const o=e.tailPosition||"top";o==="top"||o==="bottom"?(r.left!==void 0&&(t.style.left=`${r.left}px`,t.style.transform="translateX(-50%)"),r.top!==void 0&&(t.style.top=`${r.top}px`)):o==="left"?(r.top!==void 0&&(t.style.top=`${r.top}px`,t.style.transform="translateY(-50%)"),r.left!==void 0&&(t.style.left=`${r.left}px`)):o==="right"&&(r.top!==void 0&&(t.style.top=`${r.top}px`,t.style.transform="translateY(-50%)"),r.left!==void 0&&(t.style.left=`${r.left}px`))}else if(p){const o=p.getBoundingClientRect(),c=t.getBoundingClientRect();t.style.position="fixed",t.style.top=`${o.bottom+8}px`,t.style.left=`${o.left+o.width/2-c.width/2}px`}},s=()=>{t.classList.remove("ubits-popover--open"),i&&i()},a=o=>{const c=t.querySelector(".ubits-popover__body-content");if(c){const g=typeof o=="function"?o():o;c.innerHTML=g}},b=o=>{const c=e.tailPosition||"top";o.top!==void 0&&(t.style.top=`${o.top}px`),o.left!==void 0&&(t.style.left=`${o.left}px`),o.right!==void 0&&(t.style.right=`${o.right}px`),o.bottom!==void 0&&(t.style.bottom=`${o.bottom}px`),c==="top"||c==="bottom"?o.left!==void 0&&(t.style.transform="translateX(-50%)"):(c==="left"||c==="right")&&o.top!==void 0&&(t.style.transform="translateY(-50%)")};let f=()=>{t.parentElement&&t.parentElement.removeChild(t)};if(n){const o=g=>{const d=g.target;if(t.classList.contains("ubits-popover--open")&&!t.contains(d)){const B=d;B.closest&&B.closest("[data-popover-trigger]")||s()}};document.addEventListener("click",o,!0);const c=f;f=()=>{document.removeEventListener("click",o,!0),c()}}if(e.footerButtons){const o=t.querySelector(".ubits-popover__footer-left .ubits-popover__footer-button"),c=t.querySelector(".ubits-popover__footer-right .ubits-button--secondary"),g=t.querySelector(".ubits-popover__footer-right .ubits-button--primary");o&&e.footerButtons.tertiary?.onClick&&o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),e.footerButtons.tertiary.onClick(d)}),c&&e.footerButtons.secondary?.onClick&&c.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),e.footerButtons.secondary.onClick(d)}),g&&e.footerButtons.primary?.onClick&&g.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),e.footerButtons.primary.onClick(d)})}return m.appendChild(t),u&&y(),{element:t,open:y,close:s,updateContent:a,updatePosition:b,destroy:f}}const T={title:"Components/Popover",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Popover UBITS con tail (flecha) para mostrar información contextual. Similar al modal pero más pequeño y con tail. Se usa para mostrar información adicional, tooltips avanzados o acciones contextuales. Soporta diferentes tamaños, posiciones de tail, header opcional, body con scroll personalizado y footer con botones opcionales."}},layout:"fullscreen"},argTypes:{title:{control:{type:"text"},description:"Título del popover (opcional).",table:{type:{summary:"string"},defaultValue:{summary:"undefined"},category:"Contenido"}},bodyContent:{control:{type:"text"},description:"Contenido HTML del cuerpo del popover. Puede ser una cadena HTML o una función que devuelve HTML.",table:{type:{summary:"string | (() => string)"},defaultValue:{summary:"..."},category:"Contenido"}},width:{control:{type:"select"},options:["sm","md","lg","xl"],description:"Ancho del popover (sm: 240px, md: 360px, lg: 400px, xl: 480px).",table:{type:{summary:"string"},defaultValue:{summary:"md"},category:"Apariencia"}},tailPosition:{control:{type:"select"},options:["top","bottom","left","right"],description:"Posición del tail (flecha) del popover.",table:{type:{summary:"string"},defaultValue:{summary:"top"},category:"Apariencia"}},tailOffset:{control:{type:"number"},description:"Offset horizontal del tail desde el centro (en píxeles).",table:{type:{summary:"number"},defaultValue:{summary:"0"},category:"Apariencia"}},"footerButtons.tertiary.label":{control:{type:"text"},name:"Label Botón Terciario",description:"Label del botón terciario (izquierda del footer).",table:{category:"Footer Buttons"}},"footerButtons.tertiary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Terciario",description:"Controla la visibilidad del botón terciario.",table:{category:"Footer Buttons"}},"footerButtons.secondary.label":{control:{type:"text"},name:"Label Botón Secundario",description:"Label del botón secundario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.secondary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Secundario",description:"Controla la visibilidad del botón secundario.",table:{category:"Footer Buttons"}},"footerButtons.primary.label":{control:{type:"text"},name:"Label Botón Primario",description:"Label del botón primario (derecha del footer).",table:{category:"Footer Buttons"}},"footerButtons.primary.enabled":{control:{type:"boolean"},name:"Habilitar Botón Primario",description:"Controla la visibilidad del botón primario.",table:{category:"Footer Buttons"}},open:{control:{type:"boolean"},description:"Si el popover está abierto inicialmente.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Estado"}},closeOnOutsideClick:{control:{type:"boolean"},description:"Si se debe cerrar al hacer clic fuera del popover.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}},onClose:{action:"closed",description:"Callback que se ejecuta cuando el popover se cierra.",table:{disable:!0}}}},h={args:{title:"Title",bodyContent:`
      <p style="margin: 0; font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-high-static-inverted, #edeeef); line-height: var(--ubits-line-height-md, 19.5px);">
        Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.
      </p>
    `,width:"md",tailPosition:"top","footerButtons.tertiary.label":"Tertiary","footerButtons.tertiary.enabled":!0,"footerButtons.secondary.label":"Secondary","footerButtons.secondary.enabled":!0,"footerButtons.primary.label":"Primary","footerButtons.primary.enabled":!0,open:!0,closeOnOutsideClick:!0},render:e=>{const l=document.createElement("div");l.id="popover-story-container",l.style.width="100vw",l.style.height="100vh",l.style.position="relative",l.style.overflow="hidden",l.style.background="var(--ubits-bg-2, #f9fafb)",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="40px";const i=document.createElement("button");i.className="ubits-button ubits-button--primary ubits-button--md",i.setAttribute("data-popover-trigger","true"),i.innerHTML="<span>Abrir Popover</span>",i.style.width="auto",i.style.zIndex="1001",l.appendChild(i);let n=null;const u=()=>{const s=n&&n.element.classList.contains("ubits-popover--open");console.log("🔵 updateButtonText - isOpen:",s,"popoverInstance:",!!n),i.querySelector("span").textContent=s?"Cerrar Popover":"Abrir Popover"},r=()=>{if(n){console.log("🔵 Destruyendo popover anterior");try{n.destroy()}catch(a){console.error("❌ Error al destruir popover:",a)}n=null}document.querySelectorAll(".ubits-popover").forEach(a=>{a.parentElement&&(console.log("🔵 Eliminando popover huérfano del DOM"),a.remove())})},p=()=>{console.log("🔵 createAndOpenPopover llamado"),r();const s={...e["footerButtons.tertiary.enabled"]&&{tertiary:{label:e["footerButtons.tertiary.label"]||"Tertiary",onClick:()=>alert("Tertiary clicked!")}},...e["footerButtons.secondary.enabled"]&&{secondary:{label:e["footerButtons.secondary.label"]||"Secondary",onClick:()=>alert("Secondary clicked!")}},...e["footerButtons.primary.enabled"]&&{primary:{label:e["footerButtons.primary.label"]||"Primary",onClick:()=>alert("Primary clicked!")}}};console.log("🔵 Creando popover con args:",{title:e.title,width:e.width,tailPosition:e.tailPosition,footerButtons:Object.keys(s).length>0?s:void 0});const a=i.getBoundingClientRect();let b;if(e.tailPosition==="top")b={top:a.bottom+9,left:a.left+a.width/2};else if(e.tailPosition==="bottom")b={top:a.top-200-9,left:a.left+a.width/2};else if(e.tailPosition==="left")b={top:a.top+a.height/2,left:a.right+9};else if(e.tailPosition==="right"){const o={sm:240,md:360,lg:400,xl:480}[e.width||"md"]||360;b={top:a.top+a.height/2,left:a.left-o-9}}n=O({title:e.title,width:e.width,tailPosition:e.tailPosition,tailOffset:e.tailOffset,bodyContent:e.bodyContent,footerButtons:Object.keys(s).length>0?s:void 0,onClose:()=>{console.log("🔵 Popover onClose llamado"),e.onClose&&e.onClose(),u()},open:!1,closeOnOutsideClick:e.closeOnOutsideClick!==void 0?e.closeOnOutsideClick:!0,position:b}),e.tailPosition==="bottom"&&n?setTimeout(()=>{const f=n.element.offsetHeight,o=i.getBoundingClientRect();n.updatePosition({top:o.top-f-9,left:o.left+o.width/2})},0):e.tailPosition==="right"&&n&&setTimeout(()=>{const f=n.element.offsetWidth,o=i.getBoundingClientRect();n.updatePosition({top:o.top+o.height/2,left:o.left-f-9})},0),console.log("🔵 Popover creado:",n),console.log("🔵 Element del popover:",n.element),console.log("🔵 Clases del elemento:",n.element.className),u()},m=s=>{if(s.preventDefault(),s.stopPropagation(),console.log("🔵 handleButtonClick llamado"),console.log("🔵 popoverInstance existe:",!!n),console.log("🔵 popoverInstance.element existe:",n?!!n.element:!1),console.log("🔵 popoverInstance.element.parentElement existe:",n?!!n.element?.parentElement:!1),!n||!n.element||!n.element.parentElement){console.log("🔵 No existe instancia, creando..."),p(),setTimeout(()=>{console.log("🔵 Intentando abrir popover después de crear"),n?(console.log("🔵 popoverInstance existe, llamando open()"),n.open(),console.log("🔵 open() llamado, clases después:",n.element.className),u()):console.error("❌ popoverInstance es null después de crear")},10);return}const a=n.element.classList.contains("ubits-popover--open");console.log("🔵 Estado actual - isOpen:",a),a?(console.log("🔵 Cerrando popover"),n.close()):(console.log("🔵 Abriendo popover"),n.open()),console.log("🔵 Clases después de toggle:",n.element.className),u()};i.addEventListener("click",m),console.log("🔵 Event listener agregado al botón");const v=()=>{console.log("🔵 recreatePopover llamado - args cambiaron");const s=n&&n.element&&n.element.classList.contains("ubits-popover--open");r(),setTimeout(()=>{p(),s&&n&&setTimeout(()=>{n&&(n.open(),u())},10)},10)};e.open?(console.log("🔵 args.open es true, creando popover inicialmente"),setTimeout(()=>{p(),n&&(console.log("🔵 Abriendo popover inicialmente"),n.open(),u())},100)):(console.log("🔵 args.open es false, creando popover cerrado"),setTimeout(()=>{p()},100));let t=JSON.stringify({title:e.title,width:e.width,tailPosition:e.tailPosition,tailOffset:e.tailOffset,bodyContent:e.bodyContent,"footerButtons.tertiary.enabled":e["footerButtons.tertiary.enabled"],"footerButtons.tertiary.label":e["footerButtons.tertiary.label"],"footerButtons.secondary.enabled":e["footerButtons.secondary.enabled"],"footerButtons.secondary.label":e["footerButtons.secondary.label"],"footerButtons.primary.enabled":e["footerButtons.primary.enabled"],"footerButtons.primary.label":e["footerButtons.primary.label"],closeOnOutsideClick:e.closeOnOutsideClick});const y=setInterval(()=>{const s=JSON.stringify({title:e.title,width:e.width,tailPosition:e.tailPosition,tailOffset:e.tailOffset,bodyContent:e.bodyContent,"footerButtons.tertiary.enabled":e["footerButtons.tertiary.enabled"],"footerButtons.tertiary.label":e["footerButtons.tertiary.label"],"footerButtons.secondary.enabled":e["footerButtons.secondary.enabled"],"footerButtons.secondary.label":e["footerButtons.secondary.label"],"footerButtons.primary.enabled":e["footerButtons.primary.enabled"],"footerButtons.primary.label":e["footerButtons.primary.label"],closeOnOutsideClick:e.closeOnOutsideClick});s!==t&&(console.log("🔵 Args cambiaron, recreando popover"),t=s,v())},100);return l.addEventListener("DOMNodeRemoved",()=>{clearInterval(y),r()}),l}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Title',
    bodyContent: \`
      <p style="margin: 0; font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-high-static-inverted, #edeeef); line-height: var(--ubits-line-height-md, 19.5px);">
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
    container.style.background = 'var(--ubits-bg-2, #f9fafb)';
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
      console.log('🔵 updateButtonText - isOpen:', isOpen, 'popoverInstance:', !!popoverInstance);
      openButton.querySelector('span')!.textContent = isOpen ? 'Cerrar Popover' : 'Abrir Popover';
    };
    const destroyPopover = () => {
      if (popoverInstance) {
        console.log('🔵 Destruyendo popover anterior');
        try {
          popoverInstance.destroy();
        } catch (e) {
          console.error('❌ Error al destruir popover:', e);
        }
        popoverInstance = null;
      }
      // También asegurarnos de que no queden popovers huérfanos en el DOM
      const existingPopovers = document.querySelectorAll('.ubits-popover');
      existingPopovers.forEach(popover => {
        if (popover.parentElement) {
          console.log('🔵 Eliminando popover huérfano del DOM');
          popover.remove();
        }
      });
    };
    const createAndOpenPopover = () => {
      console.log('🔵 createAndOpenPopover llamado');
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
      console.log('🔵 Creando popover con args:', {
        title: args.title,
        width: args.width,
        tailPosition: args.tailPosition,
        footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined
      });
      const buttonRect = openButton.getBoundingClientRect();

      // Calcular posición para que el popover aparezca correctamente según tailPosition
      let position: {
        top: number;
        left: number;
      } | undefined;
      if (args.tailPosition === 'top') {
        // Popover debajo del botón, tail arriba apuntando al botón
        position = {
          top: buttonRect.bottom + 9,
          // 9px debajo del botón (altura del tail)
          left: buttonRect.left + buttonRect.width / 2 // Centrado horizontalmente
        };
      } else if (args.tailPosition === 'bottom') {
        // Popover arriba del botón, tail abajo apuntando al botón
        // Necesitamos calcular la altura del popover después de crearlo
        // Usamos un valor estimado más grande para asegurar que esté completamente arriba
        const estimatedPopoverHeight = 200; // Altura estimada del popover (aumentado de 150)
        position = {
          top: buttonRect.top - estimatedPopoverHeight - 9,
          // Arriba del botón menos altura del popover menos tail
          left: buttonRect.left + buttonRect.width / 2
        };
      } else if (args.tailPosition === 'left') {
        // Popover a la derecha del botón, tail izquierda apuntando al botón
        // IMPORTANTE: No usar buttonRect.bottom, usar buttonRect.top + buttonRect.height / 2 para centrar verticalmente
        position = {
          top: buttonRect.top + buttonRect.height / 2,
          // Centro vertical del botón
          left: buttonRect.right + 9 // 9px a la derecha del botón (ancho del tail)
        };
      } else if (args.tailPosition === 'right') {
        // Popover a la izquierda del botón, tail derecha apuntando al botón
        // Necesitamos calcular el ancho del popover
        const popoverWidths: Record<string, number> = {
          sm: 240,
          md: 360,
          lg: 400,
          xl: 480
        };
        const estimatedPopoverWidth = popoverWidths[args.width || 'md'] || 360;
        position = {
          top: buttonRect.top + buttonRect.height / 2,
          // Centro vertical del botón
          left: buttonRect.left - estimatedPopoverWidth - 9 // Izquierda del botón menos ancho del popover menos tail
        };
      }
      popoverInstance = createPopover({
        title: args.title,
        width: args.width,
        tailPosition: args.tailPosition,
        tailOffset: args.tailOffset,
        bodyContent: args.bodyContent,
        footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined,
        onClose: () => {
          console.log('🔵 Popover onClose llamado');
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

      // Ajustar posición después de crear el popover para bottom y right
      if (args.tailPosition === 'bottom' && popoverInstance) {
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
      } else if (args.tailPosition === 'right' && popoverInstance) {
        // Esperar un frame para que el DOM se actualice y podamos obtener las dimensiones reales
        setTimeout(() => {
          // Obtener el ancho real del popover después de crearlo
          const popoverWidth = popoverInstance.element.offsetWidth;
          const buttonRect = openButton.getBoundingClientRect();
          // Reposicionar completamente a la izquierda del botón
          popoverInstance.updatePosition({
            top: buttonRect.top + buttonRect.height / 2,
            left: buttonRect.left - popoverWidth - 9
          });
        }, 0);
      }
      console.log('🔵 Popover creado:', popoverInstance);
      console.log('🔵 Element del popover:', popoverInstance.element);
      console.log('🔵 Clases del elemento:', popoverInstance.element.className);
      updateButtonText();
    };
    const handleButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('🔵 handleButtonClick llamado');
      console.log('🔵 popoverInstance existe:', !!popoverInstance);
      console.log('🔵 popoverInstance.element existe:', popoverInstance ? !!popoverInstance.element : false);
      console.log('🔵 popoverInstance.element.parentElement existe:', popoverInstance ? !!popoverInstance.element?.parentElement : false);
      if (!popoverInstance || !popoverInstance.element || !popoverInstance.element.parentElement) {
        console.log('🔵 No existe instancia, creando...');
        createAndOpenPopover();
        // Abrir después de crear
        setTimeout(() => {
          console.log('🔵 Intentando abrir popover después de crear');
          if (popoverInstance) {
            console.log('🔵 popoverInstance existe, llamando open()');
            popoverInstance.open();
            console.log('🔵 open() llamado, clases después:', popoverInstance.element.className);
            updateButtonText();
          } else {
            console.error('❌ popoverInstance es null después de crear');
          }
        }, 10);
        return;
      }
      const isOpen = popoverInstance.element.classList.contains('ubits-popover--open');
      console.log('🔵 Estado actual - isOpen:', isOpen);
      if (isOpen) {
        console.log('🔵 Cerrando popover');
        popoverInstance.close();
      } else {
        console.log('🔵 Abriendo popover');
        popoverInstance.open();
      }
      console.log('🔵 Clases después de toggle:', popoverInstance.element.className);
      updateButtonText();
    };
    openButton.addEventListener('click', handleButtonClick);
    console.log('🔵 Event listener agregado al botón');

    // Recrear popover cuando cambian los args (Storybook controls)
    const recreatePopover = () => {
      console.log('🔵 recreatePopover llamado - args cambiaron');
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
      console.log('🔵 args.open es true, creando popover inicialmente');
      setTimeout(() => {
        createAndOpenPopover();
        if (popoverInstance) {
          console.log('🔵 Abriendo popover inicialmente');
          popoverInstance.open();
          updateButtonText();
        }
      }, 100);
    } else {
      // Crear pero no abrir inicialmente
      console.log('🔵 args.open es false, creando popover cerrado');
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
        console.log('🔵 Args cambiaron, recreando popover');
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
}`,...h.parameters?.docs?.source}}};const E=["Default"];export{h as Default,E as __namedExportsOrder,T as default};
