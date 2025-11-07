const x={success:3500,info:3500,warning:5e3,error:6500},E={maxVisible:3,pauseOnHover:!0},T={success:"fa-check-circle",info:"fa-info-circle",warning:"fa-exclamation-triangle",error:"fa-times-circle"};function h(t,n="regular"){const e=n==="regular"?"far":"fas",s=t.startsWith("fa-")?t:`fa-${t}`;return`<i class="${e} ${s}"></i>`}function B(t){const n=t||"ubits-toast-container";let e=document.getElementById(n);return e||(e=document.createElement("div"),e.id=n,e.style.cssText=`
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%;
      max-width: 560px;
      min-width: 320px;
      padding: 0 16px;
      box-sizing: border-box;
      z-index: 10000;
      pointer-events: none;
    `,document.body.appendChild(e)),e}function $(t){return t==="warning"||t==="error"?{role:"alert",ariaLive:"assertive"}:{role:"status",ariaLive:"polite"}}function O(t,n){const e=Array.from(t.querySelectorAll(".ubits-toast"));if(e.length<=n)return;const s=e.length-n;for(let o=0;o<s;o++)v(e[o])}function v(t){t&&(t.classList.add("ubits-toast--exit"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},180))}function w(t){const{type:n="info",title:e="",message:s="",noClose:o=!1,action:a,className:d="",attributes:i={}}=t,r=T[n]||T.info,{role:l,ariaLive:c}=$(n),u=["ubits-toast",`ubits-toast--${n}`,d].filter(Boolean).join(" "),m=Object.entries(i).map(([g,L])=>`${g}="${L}"`).join(" "),p=`
    <div class="ubits-toast__header">
      <div class="ubits-toast__icon" aria-hidden="true">${h(r,"regular")}</div>
      <div class="ubits-toast__title">${e||""}</div>
      ${o?"":`
        <button class="ubits-button ubits-button--tertiary ubits-button--sm ubits-toast__close" aria-label="Cerrar notificación">
          ${h("fa-times","regular")}
        </button>
      `}
    </div>
  `,f=a&&a.label&&typeof a.onClick=="function"?`
      <div class="ubits-toast__actions">
        <button class="ubits-toast__action ubits-toast__action--${n}" type="button" data-toast-action>
          <span>${a.label}</span>
        </button>
      </div>
    `:"";return`
    <div class="${u}" role="${l}" aria-live="${c}" ${m}>
      <div class="ubits-toast__content">
        ${p}
        <div class="ubits-toast__body">${s}</div>
        ${f}
      </div>
    </div>
  `.trim()}function S(t){const n=document.createElement("div");n.innerHTML=w(t);const e=n.querySelector(".ubits-toast");if(!e)throw new Error("Failed to create toast element");const s=e.parentElement;if(s&&s.removeChild(e),!t.noClose){const a=e.querySelector(".ubits-toast__close");a&&a.addEventListener("click",d=>{d.stopPropagation(),v(e),t.onClose&&t.onClose()})}const o=e.querySelector("[data-toast-action]");return o&&t.action&&o.addEventListener("click",a=>{a.stopPropagation(),t.action&&t.action.onClick&&t.action.onClick()}),e}function k(t,n,e={}){const s=B(e.containerId),o=S({type:t,message:n,...e});s.appendChild(o),O(s,E.maxVisible),requestAnimationFrame(()=>{o.classList.add("ubits-toast--enter")});const a=x[t]||x.info,d=typeof e.duration=="number"?e.duration:a;if(d>0){let i=d,r=null,l=null;const c=()=>{d<=0||(l=performance.now(),r=setTimeout(()=>{v(o),e.onClose&&e.onClose()},i))},u=()=>{if(r&&(clearTimeout(r),r=null,l)){const g=performance.now()-l;i=Math.max(0,i-g)}};e.pauseOnHover!==!1&&E.pauseOnHover&&(o.addEventListener("mouseenter",u),o.addEventListener("mouseleave",c),o.addEventListener("focusin",u),o.addEventListener("focusout",c)),c();const p=()=>{o.removeEventListener("mouseenter",u),o.removeEventListener("mouseleave",c),o.removeEventListener("focusin",u),o.removeEventListener("focusout",c),r&&clearTimeout(r)},f=new MutationObserver(()=>{o.parentNode||(p(),f.disconnect())});f.observe(s,{childList:!0})}return o}const H={title:"Components/Toast",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Toast UBITS para mostrar notificaciones flotantes. Se posiciona en la parte superior central, tiene auto-cierre, pausa en hover, apilado máximo de 3, y soporta título, cuerpo y botón de acción opcional."}}},argTypes:{type:{control:{type:"select"},options:["success","info","warning","error"],description:"Tipo de toast",table:{defaultValue:{summary:"info"},type:{summary:"success | info | warning | error"}}},title:{control:{type:"text"},description:"Título del toast (opcional, se muestra arriba alineado con el botón X)",table:{defaultValue:{summary:""},type:{summary:"string"}}},message:{control:{type:"text"},description:"Mensaje del toast (cuerpo)",table:{defaultValue:{summary:""},type:{summary:"string"}}},duration:{control:{type:"number"},description:"Duración en milisegundos antes de auto-cerrar (0 = persistente). Por defecto: success/info (3500ms), warning (5000ms), error (6500ms)",table:{defaultValue:{summary:"3500 (success/info), 5000 (warning), 6500 (error)"},type:{summary:"number"}}},noClose:{control:{type:"boolean"},description:"Si el toast NO tiene botón de cerrar",table:{defaultValue:{summary:"false"}}},pauseOnHover:{control:{type:"boolean"},description:"Si el timer se pausa cuando el usuario hace hover o focus",table:{defaultValue:{summary:"true"}}},action:{control:{type:"boolean"},description:"Si el toast tiene botón de acción",table:{defaultValue:{summary:"false"}}}}};function y(){const t="ubits-toast-container";let n=document.getElementById(t);return n||(n=document.createElement("div"),n.id=t,n.style.cssText=`
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%;
      max-width: 560px;
      min-width: 320px;
      padding: 0 16px;
      box-sizing: border-box;
      z-index: 10000;
      pointer-events: none;
    `,document.body.appendChild(n)),n}function C(){y().querySelectorAll(".ubits-toast").forEach(e=>{const s=e;s.classList.add("ubits-toast--exit"),setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},180)})}const b={args:{type:"success",title:"Operación completada",message:"Los cambios se han guardado correctamente. Este ejemplo de texto es más largo para demostrar cómo funciona el espaciado y el botón de acción debajo del texto.",duration:3500,noClose:!1,pauseOnHover:!0,action:void 0},render:t=>{y();const n=document.createElement("div");n.style.padding="20px",n.style.background="var(--ubits-bg-1, #ffffff)",n.style.borderRadius="8px",n.style.width="100%",n.style.maxWidth="800px";const e=document.createElement("div");e.style.display="flex",e.style.gap="12px",e.style.flexWrap="wrap",e.style.marginBottom="24px";const s=document.createElement("button");s.textContent="Mostrar Toast",s.style.cssText=`
      padding: 10px 20px;
      background: var(--ubits-button-bg-primary);
      color: var(--ubits-button-fg-primary);
      border: 1px solid var(--ubits-button-border-primary);
      border-radius: 6px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
    `;const o=document.createElement("button");o.textContent="Limpiar Toasts",o.style.cssText=`
      padding: 10px 20px;
      background: var(--ubits-button-bg-secondary);
      color: var(--ubits-button-fg-secondary);
      border: 1px solid var(--ubits-button-border-secondary);
      border-radius: 6px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
    `,s.addEventListener("click",()=>{console.log("🔔 Botón Mostrar Toast clickeado"),C(),setTimeout(()=>{try{const l=y();console.log("✅ Contenedor de toast:",l);const c={title:t.title,duration:t.duration,noClose:t.noClose,pauseOnHover:t.pauseOnHover};t.action&&(c.action={label:"Action",onClick:()=>{alert("Acción ejecutada desde Storybook")}}),console.log("📝 Opciones del toast:",c),console.log("📝 Tipo:",t.type),console.log("📝 Mensaje:",t.message);const u=t.type||"info",m=k(u,t.message||"",c);console.log("✅ Toast creado:",m),setTimeout(()=>{const p=l.querySelectorAll(".ubits-toast");console.log("📊 Toasts en contenedor:",p.length),p.length===0&&(console.error("❌ El toast no se agregó al contenedor"),alert("Error: El toast no se mostró. Revisa la consola para más detalles."))},100)}catch(l){console.error("❌ Error al mostrar toast:",l),alert(`Error: ${l instanceof Error?l.message:"Error desconocido"}`)}},200)}),o.addEventListener("click",()=>{C()}),e.appendChild(s),e.appendChild(o),n.appendChild(e);const a=document.createElement("div");a.style.width="100%",a.style.marginBottom="20px",a.style.position="relative";const d=w({type:t.type||"info",title:t.title,message:t.message,noClose:t.noClose,action:t.action?{label:"Action",onClick:()=>{}}:void 0});a.innerHTML=d;const i=a.querySelector(".ubits-toast");if(i){i.style.position="relative",i.style.width="100%",i.style.maxWidth="560px";const l=i.querySelector(".ubits-toast__close");l&&l.addEventListener("click",()=>{i.classList.add("ubits-toast--exit"),setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},180)});const c=i.querySelector("[data-toast-action]");c&&t.action&&c.addEventListener("click",()=>{alert("Acción ejecutada desde preview estático")})}n.appendChild(a);const r=document.createElement("div");return r.style.padding="16px",r.style.background="var(--ubits-bg-2, #f9fafb)",r.style.borderRadius="8px",r.style.fontSize="14px",r.style.color="var(--ubits-fg-1-medium, #5c646f)",r.style.border="1px solid var(--ubits-border-1)",r.style.lineHeight="1.6",r.innerHTML=`
      <strong>Tipo:</strong> ${t.type}<br>
      <strong>Título:</strong> ${t.title||"(sin título)"}<br>
      <strong>Cierre:</strong> ${t.noClose?"Sin botón":"Con botón"}<br>
      <strong>Duración:</strong> ${t.duration&&t.duration>0?`${t.duration}ms`:"Persistente"}<br>
      <strong>Pausa en hover:</strong> ${t.pauseOnHover?"Sí":"No"}<br>
      <strong>Botón de acción:</strong> ${t.action?"Sí":"No"}<br>
      <br>
      <em>Haz clic en "Mostrar Toast" para ver el toast funcional en la parte superior central de la pantalla.</em>
    `,n.appendChild(r),n}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'success',
    title: 'Operación completada',
    message: 'Los cambios se han guardado correctamente. Este ejemplo de texto es más largo para demostrar cómo funciona el espaciado y el botón de acción debajo del texto.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
    action: undefined
  } as ToastOptions & {
    action?: boolean;
  },
  render: args => {
    // Asegurar que el contenedor existe
    ensureToastContainer();
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';

    // Botones para mostrar toast
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '12px';
    controls.style.flexWrap = 'wrap';
    controls.style.marginBottom = '24px';
    const showButton = document.createElement('button');
    showButton.textContent = 'Mostrar Toast';
    showButton.style.cssText = \`
      padding: 10px 20px;
      background: var(--ubits-button-bg-primary);
      color: var(--ubits-button-fg-primary);
      border: 1px solid var(--ubits-button-border-primary);
      border-radius: 6px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
    \`;
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Limpiar Toasts';
    clearButton.style.cssText = \`
      padding: 10px 20px;
      background: var(--ubits-button-bg-secondary);
      color: var(--ubits-button-fg-secondary);
      border: 1px solid var(--ubits-button-border-secondary);
      border-radius: 6px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
    \`;
    showButton.addEventListener('click', () => {
      console.log('🔔 Botón Mostrar Toast clickeado');
      clearToasts(); // Limpiar toasts anteriores
      setTimeout(() => {
        try {
          // Asegurar que el contenedor existe antes de mostrar el toast
          const container = ensureToastContainer();
          console.log('✅ Contenedor de toast:', container);
          const toastOptions: Omit<ToastOptions, 'type' | 'message'> = {
            title: args.title,
            duration: args.duration,
            noClose: args.noClose,
            pauseOnHover: args.pauseOnHover
          };

          // Agregar botón de acción si está activado
          if ((args as any).action) {
            toastOptions.action = {
              label: 'Action',
              onClick: () => {
                alert('Acción ejecutada desde Storybook');
              }
            };
          }
          console.log('📝 Opciones del toast:', toastOptions);
          console.log('📝 Tipo:', args.type);
          console.log('📝 Mensaje:', args.message);
          const toastType = args.type || 'info';
          const toastElement = showToast(toastType, args.message || '', toastOptions);
          console.log('✅ Toast creado:', toastElement);

          // Verificar que el toast se agregó al DOM
          setTimeout(() => {
            const toastsInContainer = container.querySelectorAll('.ubits-toast');
            console.log('📊 Toasts en contenedor:', toastsInContainer.length);
            if (toastsInContainer.length === 0) {
              console.error('❌ El toast no se agregó al contenedor');
              alert('Error: El toast no se mostró. Revisa la consola para más detalles.');
            }
          }, 100);
        } catch (error) {
          console.error('❌ Error al mostrar toast:', error);
          alert(\`Error: \${error instanceof Error ? error.message : 'Error desconocido'}\`);
        }
      }, 200);
    });
    clearButton.addEventListener('click', () => {
      clearToasts();
    });
    controls.appendChild(showButton);
    controls.appendChild(clearButton);
    container.appendChild(controls);

    // Preview estático del toast (solo para visualización, no funcional)
    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    const toastHTML = renderToast({
      type: args.type || 'info',
      title: args.title,
      message: args.message,
      noClose: args.noClose,
      action: (args as any).action ? {
        label: 'Action',
        onClick: () => {}
      } : undefined
    });
    preview.innerHTML = toastHTML;

    // Estilos para el preview estático
    const toastElement = preview.querySelector('.ubits-toast') as HTMLElement;
    if (toastElement) {
      toastElement.style.position = 'relative';
      toastElement.style.width = '100%';
      toastElement.style.maxWidth = '560px';

      // Agregar event listener al botón cerrar si existe
      const closeButton = toastElement.querySelector('.ubits-toast__close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          toastElement.classList.add('ubits-toast--exit');
          setTimeout(() => {
            if (toastElement.parentNode) {
              toastElement.parentNode.removeChild(toastElement);
            }
          }, 180);
        });
      }

      // Agregar event listener al botón de acción si existe
      const actionButton = toastElement.querySelector('[data-toast-action]');
      if (actionButton && (args as any).action) {
        actionButton.addEventListener('click', () => {
          alert('Acción ejecutada desde preview estático');
        });
      }
    }
    container.appendChild(preview);

    // Agregar información adicional sobre el toast
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--ubits-bg-2, #f9fafb)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--ubits-fg-1-medium, #5c646f)';
    info.style.border = '1px solid var(--ubits-border-1)';
    info.style.lineHeight = '1.6';
    info.innerHTML = \`
      <strong>Tipo:</strong> \${args.type}<br>
      <strong>Título:</strong> \${args.title || '(sin título)'}<br>
      <strong>Cierre:</strong> \${args.noClose ? 'Sin botón' : 'Con botón'}<br>
      <strong>Duración:</strong> \${args.duration && args.duration > 0 ? \`\${args.duration}ms\` : 'Persistente'}<br>
      <strong>Pausa en hover:</strong> \${args.pauseOnHover ? 'Sí' : 'No'}<br>
      <strong>Botón de acción:</strong> \${(args as any).action ? 'Sí' : 'No'}<br>
      <br>
      <em>Haz clic en "Mostrar Toast" para ver el toast funcional en la parte superior central de la pantalla.</em>
    \`;
    container.appendChild(info);
    return container;
  }
}`,...b.parameters?.docs?.source}}};const _=["Default"];export{b as Default,_ as __namedExportsOrder,H as default};
