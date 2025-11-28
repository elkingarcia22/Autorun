import{c as B}from"./popover-DuFVnYQG.js";import{c as q}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function I(t,d,s,r){const o=r||d.getBoundingClientRect(),C=t.__leftCompensation||0,x=t.__topCompensation||0,w=document.body.style.position==="fixed";w||window.pageYOffset||document.documentElement.scrollTop,w||window.pageXOffset||document.documentElement.scrollLeft;const f=o.top-s+x,p=o.left-s+C,u=o.width+s*2,m=o.height+s*2,e=window.innerWidth,h=window.innerHeight,n=t.querySelector(".ubits-mask-layer--top"),g=t.querySelector(".ubits-mask-layer--bottom"),a=t.querySelector(".ubits-mask-layer--left"),b=t.querySelector(".ubits-mask-layer--right"),v=t.querySelector(".ubits-mask-highlight");if(n){const l=Math.max(0,f);n.style.height=`${l}px`}if(g){const l=f+m,y=Math.max(0,h-l);g.style.top=`${l}px`,g.style.height=`${y}px`}if(a){const l=Math.max(0,p);a.style.top=`${Math.max(0,f)}px`,a.style.width=`${l}px`,a.style.height=`${m}px`}if(b){const l=p+u,y=Math.max(0,e-l);b.style.top=`${Math.max(0,f)}px`,b.style.left=`${l}px`,b.style.width=`${y}px`,b.style.height=`${m}px`}return v?(v.style.top=`${f}px`,v.style.left=`${p}px`,v.style.width=`${u}px`,v.style.height=`${m}px`):console.warn("⚠️ [Mask] No se encontró el elemento highlight"),{top:o.top,left:o.left,width:o.width,height:o.height}}function L(t,d,s,r,o){const C=window.innerWidth,x=window.innerHeight,w=t.left+t.width/2,f=t.top+t.height/2;let p=r,u=0,m=0,e="top";if(r==="auto"){const h=t.top,n=x-t.bottom,g=t.left,a=C-t.right;n>=s+o&&n>=h?p="bottom":h>=s+o?p="top":a>=d+o?p="right":g>=d+o?p="left":p="bottom"}switch(p){case"top":e="bottom",u=t.top-s-o,m=w;break;case"bottom":e="top",u=t.bottom+o,m=w;break;case"left":e="right",u=f,m=t.left-d-o;break;case"right":e="left",u=f,m=t.right+o;break}return{top:u,left:m,tailPosition:e}}function j(t){const{className:d=""}=t;return`
    <div class="${["ubits-mask-overlay",d].filter(Boolean).join(" ")}">
      <div class="ubits-mask-layer ubits-mask-layer--top"></div>
      <div class="ubits-mask-layer ubits-mask-layer--bottom"></div>
      <div class="ubits-mask-layer ubits-mask-layer--left"></div>
      <div class="ubits-mask-layer ubits-mask-layer--right"></div>
      <div class="ubits-mask-highlight"></div>
      <div class="ubits-mask-popover-container"></div>
    </div>
  `.trim()}function z(t){const{containerId:d,targetElement:s,popover:r,padding:o=8,closeOnOverlayClick:C=!0,onClose:x,open:w=!1,popoverPosition:f="auto",popoverOffset:p=12}=t;let u;d?u=document.getElementById(d)||document.body:u=document.body;const m=document.createElement("div");m.innerHTML=j(t);const e=m.firstElementChild;if(!e)throw new Error("No se pudo crear la máscara");const h=()=>typeof s=="string"?document.querySelector(s):s;let n=h();const g=e.querySelector(".ubits-mask-popover-container");let a=null,b=0,v=0,l=null;const y=()=>{if(!n){console.warn("⚠️ [Mask.updateMaskPosition] No hay targetElement");return}const c=!l?n.getBoundingClientRect():l;e.__leftCompensation,e.__topCompensation;const E=I(e,n,o,c);if(a&&g){const k=a.element.getBoundingClientRect(),P=L(E,k.width||360,k.height||200,f,p);a.updatePosition({top:P.top,left:P.left}),r.tailPosition!==P.tailPosition&&(a&&a.destroy(),a=B({...r,tailPosition:P.tailPosition,position:{top:P.top,left:P.left},open:!0}),g.appendChild(a.element))}},T=()=>{if(!n||!g)return;const i=n.getBoundingClientRect(),c=L({top:i.top,left:i.left,width:i.width,height:i.height},360,200,f,p);a=B({...r,tailPosition:c.tailPosition,position:{top:c.top,left:c.left},open:!0,onClose:()=>{r.onClose&&r.onClose(),M()}}),g.appendChild(a.element),requestAnimationFrame(()=>{y()})},_=()=>{if(n=h(),!n){console.error("❌ [Mask] No se encontró el elemento objetivo al abrir:",s);return}b=window.scrollY||window.pageYOffset||0,v=window.scrollX||window.pageXOffset||0;const i=n.getBoundingClientRect();e.classList.add("ubits-mask-overlay--open"),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${b}px`,document.body.style.left=`-${v}px`,document.body.style.width="100%",e.__modifiedParents=[],requestAnimationFrame(()=>{requestAnimationFrame(()=>{const c=n.getBoundingClientRect(),E=c.top-i.top,S=c.left-i.left;Math.abs(S)>.1||Math.abs(E)>.1?(l=c,e.__leftCompensation=0,e.__topCompensation=0):(l=i,e.__leftCompensation=0,e.__topCompensation=0),y(),T();const k=()=>{l=null,y()};window.addEventListener("scroll",y,!0),window.addEventListener("resize",k),e.__handleResize=k,e.__handleScroll=y})})},M=()=>{e.classList.remove("ubits-mask-overlay--open"),l=null;const i=e.__handleResize,c=e.__handleScroll;i&&window.removeEventListener("resize",i),c&&window.removeEventListener("scroll",c,!0),document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.width="",document.body.style.paddingRight="",document.documentElement.style.paddingRight="";const E=document.querySelector("main")||document.querySelector(".main-content")||document.querySelector("#main");E&&(E.style.paddingRight=""),(e.__modifiedParents||[]).forEach(k=>{k.style.paddingRight=""}),e.__modifiedParents=[],e.__leftCompensation=0,e.__topCompensation=0,window.scrollTo(v,b),a&&(a.destroy(),a=null),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),x&&x()},A=i=>{if(typeof i=="string"?n=document.querySelector(i):n=i,!n){console.error("❌ [Mask] No se encontró el nuevo elemento objetivo:",i);return}e.classList.contains("ubits-mask-overlay--open")&&y()},$=()=>{M(),e.parentElement&&e.parentElement.removeChild(e)};return C&&e.addEventListener("click",i=>{const c=i.target;(c.classList.contains("ubits-mask-layer")||c.classList.contains("ubits-mask-overlay"))&&M()}),u.appendChild(e),w&&(n?_():requestAnimationFrame(()=>{n=h(),n?_():setTimeout(()=>{n=h(),n&&_()},100)})),{element:e,open:_,close:M,updateTarget:A,destroy:$}}const V={title:"Feedback/Mask",tags:["autodocs"],parameters:{docs:{description:{component:'Componente Mask UBITS para onboarding. Crea un overlay oscuro con un "agujero" que destaca un elemento específico de la interfaz. Incluye un Popover integrado para mostrar información o instrucciones. Ideal para guías de usuario, tutoriales y flujos de onboarding.'}},layout:"fullscreen"},argTypes:{targetElement:{control:{type:"text"},description:"Selector CSS o elemento HTML que se quiere destacar.",table:{type:{summary:"string | HTMLElement"},category:"Configuración"}},"popover.title":{control:{type:"text"},name:"Título del Popover",description:"Título del popover que se muestra en la máscara.",table:{category:"Popover"}},"popover.bodyContent":{control:{type:"text"},name:"Contenido del Popover",description:"Contenido HTML del popover.",table:{category:"Popover"}},"popover.width":{control:{type:"select"},options:["sm","md","lg","xl"],name:"Ancho del Popover",description:"Ancho del popover.",table:{category:"Popover"}},popoverPosition:{control:{type:"select"},options:["auto","top","bottom","left","right"],description:"Posición del popover relativa al elemento destacado.",table:{type:{summary:"string"},defaultValue:{summary:"auto"},category:"Configuración"}},popoverOffset:{control:{type:"number"},description:"Offset del popover desde el elemento destacado (en píxeles).",table:{type:{summary:"number"},defaultValue:{summary:"12"},category:"Configuración"}},padding:{control:{type:"number"},description:"Padding adicional alrededor del elemento destacado (en píxeles).",table:{type:{summary:"number"},defaultValue:{summary:"8"},category:"Configuración"}},closeOnOverlayClick:{control:{type:"boolean"},description:"Si se debe cerrar al hacer clic en el overlay.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}},open:{control:{type:"boolean"},description:"Si la máscara está abierta inicialmente.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Comportamiento"}}}},O={render:t=>{const d=document.createElement("div");d.style.cssText=`
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    `;const s=document.createElement("div");s.style.cssText=`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-md);
      margin-top: 200px;
    `;let r=null;return requestAnimationFrame(()=>{try{const o=q({variant:"secondary",size:"md",text:"Abrir Máscara",onClick:()=>{r&&r.open()}});s.appendChild(o);const C=q({variant:"primary",size:"md",text:"Botón Destacado"});C.id="target-button",s.appendChild(C),d.appendChild(s),requestAnimationFrame(()=>{r=z({targetElement:"#target-button",popover:{title:t["popover.title"]||"PASO 1",bodyContent:t["popover.bodyContent"]||"Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.",width:t["popover.width"]||"md",footerButtons:{primary:{label:"Siguiente",onClick:()=>{r&&r.close()}}}},popoverPosition:t.popoverPosition||"auto",popoverOffset:t.popoverOffset||12,padding:t.padding||8,closeOnOverlayClick:t.closeOnOverlayClick!==!1,open:t.open||!1})})}catch(o){console.error("❌ Error creando botones:",o)}}),d},args:{"popover.title":"PASO 1","popover.bodyContent":"Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.","popover.width":"md",popoverPosition:"auto",popoverOffset:12,padding:8,closeOnOverlayClick:!0,open:!1}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    // Crear contenido de ejemplo
    const container = document.createElement('div');
    container.style.cssText = \`
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    \`;

    // Contenedor para los botones
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = \`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-md);
      margin-top: 200px;
    \`;

    // Crear máscara después de que el elemento esté en el DOM
    let maskInstance: ReturnType<typeof createMask> | null = null;

    // Usar requestAnimationFrame para crear los botones y la máscara
    requestAnimationFrame(() => {
      try {
        // Botón para abrir la máscara usando componente UBITS
        const openButton = createButton({
          variant: 'secondary',
          size: 'md',
          text: 'Abrir Máscara',
          onClick: () => {
            if (maskInstance) {
              maskInstance.open();
            }
          }
        });
        buttonsContainer.appendChild(openButton);

        // Crear botón objetivo usando componente UBITS
        const targetButton = createButton({
          variant: 'primary',
          size: 'md',
          text: 'Botón Destacado'
        });
        targetButton.id = 'target-button';
        buttonsContainer.appendChild(targetButton);
        container.appendChild(buttonsContainer);

        // Crear máscara después de que los botones estén en el DOM
        requestAnimationFrame(() => {
          maskInstance = createMask({
            targetElement: '#target-button',
            popover: {
              title: args['popover.title'] || 'PASO 1',
              bodyContent: args['popover.bodyContent'] || 'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
              width: args['popover.width'] || 'md',
              footerButtons: {
                primary: {
                  label: 'Siguiente',
                  onClick: () => {
                    if (maskInstance) {
                      maskInstance.close();
                    }
                  }
                }
              }
            },
            popoverPosition: args.popoverPosition || 'auto',
            popoverOffset: args.popoverOffset || 12,
            padding: args.padding || 8,
            closeOnOverlayClick: args.closeOnOverlayClick !== false,
            open: args.open || false
          });
        });
      } catch (error) {
        console.error('❌ Error creando botones:', error);
      }
    });
    return container;
  },
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false
  }
}`,...O.parameters?.docs?.source},description:{story:"Ejemplo básico de Mask destacando un botón",...O.parameters?.docs?.description}}};const X=["Default"];export{O as Default,X as __namedExportsOrder,V as default};
