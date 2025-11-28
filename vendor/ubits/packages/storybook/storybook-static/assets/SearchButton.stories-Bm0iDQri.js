import{r as C}from"./search-button-CsKVyrkP.js";import"./iframe-EN31ESOT.js";import"./ButtonProvider-CX_wJeLD.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./InputProvider-schPVK84.js";import"./preload-helper-PPVm8Dsz.js";import"./ModalProvider-Cwkz7B9R.js";const x={title:"Formularios/Search Button",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Search Button UBITS con modo botón e input. Cuando está activo, muestra un campo de búsqueda con icono. Cuando no está activo, muestra solo un botón con icono de lupa. Usa tokens UBITS exclusivamente."}},layout:"centered"},argTypes:{active:{control:{type:"boolean"},description:"Si el botón está en modo activo (muestra input)",table:{defaultValue:{summary:"false"},category:"Estado"}},size:{control:{type:"select"},options:["sm","md"],description:"Tamaño del botón (sm: 32px, md: 40px)",table:{defaultValue:{summary:"md"},type:{summary:"sm | md"},category:"Apariencia"}},state:{control:{type:"select"},options:["default","hover","active","disabled"],description:"Estado del botón",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | active | disabled"},category:"Estado"}},disabled:{control:{type:"boolean"},description:"Si el botón está deshabilitado",table:{defaultValue:{summary:"false"},category:"Estado"}},placeholder:{control:{type:"text"},description:"Placeholder del input cuando está activo",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Contenido"}},value:{control:{type:"text"},description:"Valor del input cuando está activo",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Contenido"}},width:{control:{type:"number"},description:"Ancho del input cuando está activo (en px)",table:{type:{summary:"number"},defaultValue:{summary:"248"},category:"Apariencia"}},onChange:{action:"changed",description:"Función a ejecutar cuando cambia el valor del input",table:{disable:!0}},onClick:{action:"clicked",description:"Función a ejecutar cuando se hace click en el botón",table:{disable:!0}},onFocus:{action:"focused",description:"Función a ejecutar cuando el input recibe focus",table:{disable:!0}},onBlur:{action:"blurred",description:"Función a ejecutar cuando el input pierde focus",table:{disable:!0}},className:{control:{type:"text"},description:"Clases CSS adicionales",table:{type:{summary:"string"},defaultValue:{summary:""},category:"Avanzado"}}}},p={args:{active:!1,size:"md",state:"default",disabled:!1,placeholder:"",value:"",width:248,className:""},render:e=>{const a=document.createElement("div");a.style.padding="20px",a.style.display="flex",a.style.alignItems="center",a.style.justifyContent="center",a.style.minHeight="100px";let c=e.active!==void 0?e.active:!1,r=e.value||"",i=e.state||"default";const o=()=>{const u=c||i==="active",g=C({active:u,size:e.size||"md",state:i,disabled:e.disabled!==void 0?e.disabled:!1,placeholder:e.placeholder||"",value:r,width:e.width||248,className:e.className||""});if(a.innerHTML=g,u){const t=a.querySelector(".ubits-search-button__input"),s=a.querySelector(".ubits-search-button__clear");t&&(t.addEventListener("input",n=>{r=t.value,e.onChange&&e.onChange(n);const l=a.querySelector(".ubits-search-button__clear");if(r&&r.trim().length>0){if(!l){const E=`
                  <button
                    type="button"
                    class="ubits-search-button__clear"
                    aria-label="Limpiar búsqueda"
                    tabindex="0"
                  >
                    <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
                  </button>
                `,f=a.querySelector(".ubits-search-button__input-wrapper");if(f){f.insertAdjacentHTML("beforeend",E);const d=a.querySelector(".ubits-search-button__clear");d&&d.addEventListener("click",v=>{if(v.preventDefault(),v.stopPropagation(),r="",t&&(t.value="",t.focus(),e.onChange)){const S=new Event("input",{bubbles:!0});t.dispatchEvent(S)}d&&d.remove()})}}}else l&&l.remove()}),t.addEventListener("change",n=>{e.onChange&&e.onChange(n)}),t.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),c=!1,i="default",o())}),t.addEventListener("blur",n=>{e.onBlur&&e.onBlur(n),t.value.trim()||setTimeout(()=>{document.activeElement!==t&&!t.value.trim()&&(c=!1,i="default",o())},200)}),e.onFocus&&t.addEventListener("focus",n=>{e.onFocus&&e.onFocus(n)})),s&&s.addEventListener("click",n=>{if(n.preventDefault(),n.stopPropagation(),r="",t&&(t.value="",t.focus(),e.onChange)){const l=new Event("input",{bubbles:!0});t.dispatchEvent(l)}o()})}else{const t=a.querySelector("button");t&&t.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),c=!0,i="active",e.onClick&&e.onClick(s),o(),setTimeout(()=>{const n=a.querySelector(".ubits-search-button__input");n&&n.focus()},50)})}};o();let m=JSON.stringify(e);const h=setInterval(()=>{const u=JSON.stringify(e);u!==m&&(m=u,e.active!==void 0&&(c=e.active),e.state!==void 0&&(i=e.state),e.value!==void 0&&(r=e.value),o())},100),y=()=>{clearInterval(h)},b=new MutationObserver(()=>{document.body.contains(a)||(y(),b.disconnect())});return b.observe(document.body,{childList:!0,subtree:!0}),a}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248,
    className: ''
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

    // Estado interno para manejar el toggle
    let isActive = args.active !== undefined ? args.active : false;
    let currentValue = args.value || '';
    let currentState = args.state || 'default';
    const renderSearchComponent = () => {
      // Si state es 'active', el buscador está desplegado
      const isSearchActive = isActive || currentState === 'active';
      const searchHTML = renderSearchButton({
        active: isSearchActive,
        size: args.size || 'md',
        state: currentState,
        disabled: args.disabled !== undefined ? args.disabled : false,
        placeholder: args.placeholder || '',
        value: currentValue,
        width: args.width || 248,
        className: args.className || ''
      });
      container.innerHTML = searchHTML;

      // Agregar interactividad: click en botón para desplegar input
      if (!isSearchActive) {
        const buttonElement = container.querySelector('button') as HTMLButtonElement;
        if (buttonElement) {
          buttonElement.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            isActive = true;
            currentState = 'active';
            if (args.onClick) {
              args.onClick(e);
            }
            renderSearchComponent();
            // Focus en el input después de un pequeño delay
            setTimeout(() => {
              const inputElement = container.querySelector('.ubits-search-button__input') as HTMLInputElement;
              if (inputElement) {
                inputElement.focus();
              }
            }, 50);
          });
        }
      } else {
        // Si está activo, agregar listeners para contraer y limpiar
        const inputElement = container.querySelector('.ubits-search-button__input') as HTMLInputElement;
        const clearButton = container.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
        if (inputElement) {
          // Listener para mostrar/ocultar botón de limpiar cuando se escribe
          inputElement.addEventListener('input', e => {
            currentValue = inputElement.value;
            if (args.onChange) {
              args.onChange(e);
            }
            // Solo actualizar el botón de limpiar sin regenerar todo el HTML
            const clearButton = container.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
            if (currentValue && currentValue.trim().length > 0) {
              // Mostrar botón de limpiar si no existe
              if (!clearButton) {
                const clearButtonHTML = \`
                  <button
                    type="button"
                    class="ubits-search-button__clear"
                    aria-label="Limpiar búsqueda"
                    tabindex="0"
                  >
                    <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
                  </button>
                \`;
                const inputWrapper = container.querySelector('.ubits-search-button__input-wrapper');
                if (inputWrapper) {
                  inputWrapper.insertAdjacentHTML('beforeend', clearButtonHTML);
                  const newClearButton = container.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
                  if (newClearButton) {
                    newClearButton.addEventListener('click', e => {
                      e.preventDefault();
                      e.stopPropagation();
                      currentValue = '';
                      if (inputElement) {
                        inputElement.value = '';
                        inputElement.focus();
                        if (args.onChange) {
                          const event = new Event('input', {
                            bubbles: true
                          });
                          inputElement.dispatchEvent(event);
                        }
                      }
                      // Ocultar botón de limpiar
                      if (newClearButton) {
                        newClearButton.remove();
                      }
                    });
                  }
                }
              }
            } else {
              // Ocultar botón de limpiar si existe
              if (clearButton) {
                clearButton.remove();
              }
            }
          });
          inputElement.addEventListener('change', e => {
            if (args.onChange) {
              args.onChange(e);
            }
          });

          // ESC para contraer
          inputElement.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
              e.preventDefault();
              e.stopPropagation();
              isActive = false;
              currentState = 'default';
              renderSearchComponent();
            }
          });

          // Blur para contraer cuando se hace click fuera (si el input está vacío)
          inputElement.addEventListener('blur', e => {
            if (args.onBlur) {
              args.onBlur(e);
            }
            // Solo contraer si el input está vacío
            if (!inputElement.value.trim()) {
              setTimeout(() => {
                if (document.activeElement !== inputElement && !inputElement.value.trim()) {
                  isActive = false;
                  currentState = 'default';
                  renderSearchComponent();
                }
              }, 200);
            }
          });
          if (args.onFocus) {
            inputElement.addEventListener('focus', e => {
              if (args.onFocus) {
                args.onFocus(e);
              }
            });
          }
        }

        // Botón de limpiar (X)
        if (clearButton) {
          clearButton.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            currentValue = '';
            if (inputElement) {
              inputElement.value = '';
              inputElement.focus();
              if (args.onChange) {
                const event = new Event('input', {
                  bubbles: true
                });
                inputElement.dispatchEvent(event);
              }
            }
            // Re-renderizar para ocultar el botón X
            renderSearchComponent();
          });
        }
      }
    };

    // Renderizar inicialmente
    renderSearchComponent();

    // Actualizar cuando cambian los args
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        // Sincronizar el estado interno con los args
        if (args.active !== undefined) {
          isActive = args.active;
        }
        if (args.state !== undefined) {
          currentState = args.state;
        }
        if (args.value !== undefined) {
          currentValue = args.value;
        }
        renderSearchComponent();
      }
    }, 100);

    // Limpiar interval cuando se destruye el componente
    const cleanup = () => {
      clearInterval(checkArgs);
    };

    // Usar MutationObserver para detectar cuando el container se elimina
    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        cleanup();
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    return container;
  }
}`,...p.parameters?.docs?.source}}};const H=["Default"];export{p as Default,H as __namedExportsOrder,x as default};
