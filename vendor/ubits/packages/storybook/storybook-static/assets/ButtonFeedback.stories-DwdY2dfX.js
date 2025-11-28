import{c as P}from"./ModalProvider-Cwkz7B9R.js";import{c as j}from"./InputProvider-schPVK84.js";import{c as H,r as V}from"./ButtonProvider-CX_wJeLD.js";import{s as E}from"./ToastProvider-_mmJi2zQ.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";function Q(d,i="regular"){const b=i==="regular"?"far":"fas",y=d.startsWith("fa-")?d:`fa-${d}`;return`<i class="${b} ${y}"></i>`}function N(d){const{containerId:i,text:b="",icon:y="comment-dots",position:r="bottom-right",offset:n=24,modalTitle:k="Deja tu Feedback",sectionOptions:c=[{value:"home",text:"Home"},{value:"encuestas",text:"Encuestas"}],defaultSection:p="",commentPlaceholder:q="¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?",n8nWebhookUrl:C,onFeedbackSent:B,visible:O=!0,className:_=""}=d;let x;i?x=document.getElementById(i)||document.body:x=document.body;let h=p||(c.length>0?c[0].value:""),f="",u=null,s="";const w=()=>{s=`ubits-button-feedback-form-${Math.random().toString(36).substr(2,9)}`;const g=V({variant:"secondary",size:"sm",icon:"times",iconStyle:"regular",iconOnly:!0,className:"ubits-button-feedback-modal__close"}),t=`
      <div class="ubits-button-feedback-modal__header">
        <div class="ubits-button-feedback-modal__header-content">
          <div class="ubits-button-feedback-modal__header-icon">
            ${Q("comment-dots","regular")}
          </div>
          <h2 class="ubits-heading-h2 ubits-button-feedback-modal__header-title">${k}</h2>
        </div>
        ${g}
      </div>
    `,a=`
      <div class="ubits-button-feedback-form" id="${s}">
        <div class="ubits-button-feedback-form__field">
          <div id="${s}-section"></div>
        </div>
        <div class="ubits-button-feedback-form__field">
          <div id="${s}-comment"></div>
        </div>
      </div>
    `;return t+a},$=()=>{if(u){m();return}document.querySelectorAll(".ubits-button-feedback-modal").forEach(t=>{const a=t.closest(".ubits-modal-overlay");a&&a.parentNode&&a.parentNode.removeChild(a)}),u=P({title:"",bodyContent:w(),size:"md",open:!0,containerId:i,closeOnOverlayClick:!1,className:"ubits-button-feedback-modal",footerButtons:{tertiary:{label:"Cancelar",onClick:()=>{m()}},primary:{label:"Enviar Feedback",onClick:async()=>{const t=document.getElementById(`${s}-section`),a=document.getElementById(`${s}-comment`);if(t){const o=t.querySelector(".ubits-input");o&&(h=o.value)}if(a){const o=a.querySelector("textarea");o&&(f=o.value)}if(!f.trim()){E("warning","Por favor, ingresa un comentario");return}if(C)try{if(!(await fetch(C,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({section:h,comment:f,timestamp:new Date().toISOString(),url:window.location.href})})).ok)throw new Error("Error al enviar feedback");B&&B({section:h,comment:f}),m(),E("success","¡Gracias por tu feedback!")}catch(o){console.error("Error enviando feedback:",o),E("error","Error al enviar el feedback. Por favor, intenta de nuevo.")}else m()}}},onClose:()=>{e.classList.remove("ubits-button--active"),u=null}}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const t=u?.element,a=t?.querySelector(".ubits-button-feedback-modal");if(t&&a&&e){t.style.backgroundColor="transparent",t.style.pointerEvents="none";const o=a.querySelector(".ubits-modal__header");o&&(o.style.display="none");const l=a.querySelector(".ubits-button-feedback-modal__close");l&&l.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation(),m()}),e.classList.add("ubits-button--active");const M=e.getBoundingClientRect();t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.right="0",t.style.bottom="0",t.style.display="flex",t.style.alignItems="flex-end",t.style.justifyContent=r==="bottom-right"||r==="top-right"?"flex-end":"flex-start",t.style.paddingBottom=`${M.height+n+16}px`,t.style.paddingRight=r==="bottom-right"||r==="top-right"?`${n}px`:"auto",t.style.paddingLeft=r==="bottom-left"||r==="top-left"?`${n}px`:"auto",a.style.pointerEvents="auto"}})}),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const t=document.getElementById(`${s}-section`),a=document.getElementById(`${s}-comment`);if(t)try{const o=j({containerId:`${s}-section`,label:"Sección actual:",type:"select",size:"md",value:h,selectOptions:c.map(l=>({value:l.value,text:l.text})),showLabel:!0,showHelper:!1,onChange:l=>{h=l}})}catch(o){console.error("Error creando select de sección:",o)}if(a)try{const o=j({containerId:`${s}-comment`,label:"Tu comentario:",type:"textarea",size:"md",value:f,placeholder:q,showLabel:!0,showHelper:!1,attributes:{rows:"6",style:"resize: vertical; min-height: 120px;"},onChange:l=>{f=l}})}catch(o){console.error("Error creando textarea de comentario:",o)}})})},m=()=>{if(u){const g=u,t=g.element;u=null,g.close(),t&&t.parentNode&&t.parentNode.removeChild(t),e.classList.remove("ubits-button--active")}},D=y||"comment-dots",I=b||"",T={variant:"primary",size:"md",text:I,icon:D,iconStyle:"regular",floating:!0,iconOnly:!I&&!0,className:`ubits-button-feedback--${r} ${_}`.trim(),attributes:{"aria-label":"Deja tu feedback"},onClick:()=>{$()}},e=H(T);T.floating&&!e.classList.contains("ubits-button--floating")&&e.classList.add("ubits-button--floating"),e.style.position="fixed",e.style.zIndex="9998",r==="bottom-right"?(e.style.bottom=`${n}px`,e.style.right=`${n}px`,e.style.top="auto",e.style.left="auto"):r==="bottom-left"?(e.style.bottom=`${n}px`,e.style.left=`${n}px`,e.style.top="auto",e.style.right="auto"):r==="top-right"?(e.style.top=`${n}px`,e.style.right=`${n}px`,e.style.bottom="auto",e.style.left="auto"):r==="top-left"&&(e.style.top=`${n}px`,e.style.left=`${n}px`,e.style.bottom="auto",e.style.right="auto");const L=()=>{e.classList.remove("ubits-button-feedback--hidden")},F=()=>{e.classList.add("ubits-button-feedback--hidden")},z=()=>{$()},A=()=>{m(),e.parentElement&&e.parentElement.removeChild(e)};return x.appendChild(e),O||F(),{element:e,show:L,hide:F,open:z,close:m,destroy:A}}const Z={title:"Feedback/Button Feedback",tags:["autodocs"],parameters:{docs:{description:{component:"Botón flotante para obtener feedback de clientes. Al hacer clic, abre un modal con un formulario que permite seleccionar la sección actual y dejar un comentario. El feedback se puede enviar a un webhook de n8n."}}},argTypes:{text:{control:{type:"text"},description:"Texto del botón flotante (opcional)",table:{defaultValue:{summary:""}}},icon:{control:{type:"text"},description:"Icono del botón flotante",table:{defaultValue:{summary:"comment-dots"}}},position:{control:{type:"select"},options:["bottom-right","bottom-left","top-right","top-left"],description:"Posición del botón flotante",table:{defaultValue:{summary:"bottom-right"}}},offset:{control:{type:"number"},description:"Offset desde el borde (en píxeles)",table:{defaultValue:{summary:24}}},modalTitle:{control:{type:"text"},description:"Título del modal de feedback",table:{defaultValue:{summary:"Deja tu Feedback"}}},sectionOptions:{control:{type:"object"},description:"Opciones para el select de sección",table:{defaultValue:{summary:"[]"}}},defaultSection:{control:{type:"text"},description:"Valor por defecto del select de sección",table:{defaultValue:{summary:""}}},commentPlaceholder:{control:{type:"text"},description:"Placeholder del textarea de comentarios",table:{defaultValue:{summary:""}}},n8nWebhookUrl:{control:{type:"text"},description:"URL del endpoint de n8n para enviar el feedback",table:{defaultValue:{summary:""}}},visible:{control:{type:"boolean"},description:"Si el botón está visible inicialmente",table:{defaultValue:{summary:"true"}}}}},v={args:{text:"Feedback",icon:"comment-dots",position:"bottom-right",offset:24,modalTitle:"Deja tu Feedback",sectionOptions:[{value:"home",text:"Home"},{value:"encuestas",text:"Encuestas"},{value:"aprendizaje",text:"Aprendizaje"},{value:"desempeno",text:"Desempeño"},{value:"diagnostico",text:"Diagnóstico"}],defaultSection:"home",commentPlaceholder:"¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?",n8nWebhookUrl:"",visible:!0},render:d=>{const i=document.createElement("div");i.style.cssText=`
      min-height: 100vh;
      padding: var(--ubits-spacing-8);
      background-color: var(--modifiers-normal-color-light-bg-1);
      color: var(--modifiers-normal-color-light-fg-1-high);
    `;const b=()=>{document.documentElement.getAttribute("data-theme")==="dark"?(i.style.backgroundColor="var(--modifiers-normal-color-dark-bg-1)",i.style.color="var(--modifiers-normal-color-dark-fg-1-high)"):(i.style.backgroundColor="var(--modifiers-normal-color-light-bg-1)",i.style.color="var(--modifiers-normal-color-light-fg-1-high)")};new MutationObserver(b).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),b();const r=document.createElement("div");r.style.cssText=`
      max-width: 800px;
      margin: 0 auto;
      padding: var(--ubits-spacing-8);
    `,r.innerHTML=`
      <h1 class="ubits-heading-h1">Página de Ejemplo</h1>
      <p class="ubits-body-lg">Este es un ejemplo de página con el botón de feedback flotante. Haz clic en el botón azul en la esquina inferior derecha para dejar tu feedback.</p>
      <p class="ubits-body-md">El botón de feedback permite a los usuarios enviar comentarios sobre la aplicación directamente desde cualquier página.</p>
    `,i.appendChild(r);let n=null;const k=()=>{n&&(n.destroy(),n=null),document.body.querySelectorAll(".ubits-button-feedback--bottom-right, .ubits-button-feedback--bottom-left, .ubits-button-feedback--top-right, .ubits-button-feedback--top-left").forEach(p=>{p.parentElement&&p.parentElement.removeChild(p)})};return requestAnimationFrame(()=>{try{k(),n=N({...d,onFeedbackSent:c=>{},onCancel:()=>{},onClose:()=>{}})}catch(c){console.error("Error creando botón de feedback:",c)}}),i}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Feedback',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [{
      value: 'home',
      text: 'Home'
    }, {
      value: 'encuestas',
      text: 'Encuestas'
    }, {
      value: 'aprendizaje',
      text: 'Aprendizaje'
    }, {
      value: 'desempeno',
      text: 'Desempeño'
    }, {
      value: 'diagnostico',
      text: 'Diagnóstico'
    }],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?',
    n8nWebhookUrl: '',
    visible: true
  },
  render: args => {
    const container = document.createElement('div');
    container.style.cssText = \`
      min-height: 100vh;
      padding: var(--ubits-spacing-8);
      background-color: var(--modifiers-normal-color-light-bg-1);
      color: var(--modifiers-normal-color-light-fg-1-high);
    \`;

    // Aplicar estilos para dark mode
    const updateTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        container.style.backgroundColor = 'var(--modifiers-normal-color-dark-bg-1)';
        container.style.color = 'var(--modifiers-normal-color-dark-fg-1-high)';
      } else {
        container.style.backgroundColor = 'var(--modifiers-normal-color-light-bg-1)';
        container.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
      }
    };

    // Observar cambios de tema
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    updateTheme();

    // Crear contenido de ejemplo
    const content = document.createElement('div');
    content.style.cssText = \`
      max-width: 800px;
      margin: 0 auto;
      padding: var(--ubits-spacing-8);
    \`;
    content.innerHTML = \`
      <h1 class="ubits-heading-h1">Página de Ejemplo</h1>
      <p class="ubits-body-lg">Este es un ejemplo de página con el botón de feedback flotante. Haz clic en el botón azul en la esquina inferior derecha para dejar tu feedback.</p>
      <p class="ubits-body-md">El botón de feedback permite a los usuarios enviar comentarios sobre la aplicación directamente desde cualquier página.</p>
    \`;
    container.appendChild(content);

    // Variable para mantener la instancia del botón
    let feedbackButtonInstance: ReturnType<typeof createButtonFeedback> | null = null;

    // Función para destruir el botón anterior si existe
    const destroyPreviousButton = () => {
      if (feedbackButtonInstance) {
        feedbackButtonInstance.destroy();
        feedbackButtonInstance = null;
      }
      // También buscar y eliminar cualquier botón flotante que pueda quedar en el body
      const existingButtons = document.body.querySelectorAll('.ubits-button-feedback--bottom-right, .ubits-button-feedback--bottom-left, .ubits-button-feedback--top-right, .ubits-button-feedback--top-left');
      existingButtons.forEach(btn => {
        if (btn.parentElement) {
          btn.parentElement.removeChild(btn);
        }
      });
    };

    // Crear botón de feedback
    requestAnimationFrame(() => {
      try {
        // Destruir botón anterior si existe
        destroyPreviousButton();

        // Crear nuevo botón
        feedbackButtonInstance = createButtonFeedback({
          ...args,
          onFeedbackSent: data => {
            // Feedback enviado
          },
          onCancel: () => {
            // Feedback cancelado
          },
          onClose: () => {
            // Modal cerrado
          }
        });
      } catch (error) {
        console.error('Error creando botón de feedback:', error);
      }
    });
    return container;
  }
}`,...v.parameters?.docs?.source}}};const ee=["Default"];export{v as Default,ee as __namedExportsOrder,Z as default};
