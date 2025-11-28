import{c as S,r as g}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";const M={title:"Básicos/Button",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga."}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","tertiary"],description:"Variante del botón",table:{defaultValue:{summary:"primary"},type:{summary:"primary | secondary | tertiary"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del botón",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},text:{control:{type:"text"},description:"Texto del botón"},icon:{control:{type:"text"},description:"Nombre del icono FontAwesome (sin prefijo fa-)",table:{type:{summary:"string"},example:{summary:"check, plus, times, etc."}}},iconStyle:{control:{type:"select"},options:["regular","solid"],description:"Estilo del icono FontAwesome",table:{defaultValue:{summary:"regular"},type:{summary:"regular | solid"}}},iconPosition:{control:{type:"select"},options:["left","right","only"],description:"Posición del icono",table:{defaultValue:{summary:"left"},type:{summary:"left | right | only"}}},iconOnly:{control:{type:"boolean"},description:"Mostrar solo el icono, sin texto",table:{defaultValue:{summary:"false"}}},disabled:{control:{type:"boolean"},description:"Deshabilitar el botón",table:{defaultValue:{summary:"false"}}},loading:{control:{type:"boolean"},description:"Estado de carga (muestra spinner)",table:{defaultValue:{summary:"false"}}},badge:{control:{type:"boolean"},description:"Mostrar badge de notificación",table:{defaultValue:{summary:"false"}}},active:{control:{type:"boolean"},description:'Modificador active/outline (fondo transparente + overlay azul). IMPORTANTE: Esto es diferente del estado "active" del controlador de estados (que simula "pressed")',table:{defaultValue:{summary:"false"}}},floating:{control:{type:"boolean"},description:"Modificador floating (botón flotante con sombra del sistema de diseño)",table:{defaultValue:{summary:"false"}}},fullWidth:{control:{type:"boolean"},description:"Ancho completo",table:{defaultValue:{summary:"false"}}},block:{control:{type:"boolean"},description:"Display block",table:{defaultValue:{summary:"false"}}},dropdown:{control:{type:"boolean"},description:"Activar funcionalidad dropdown (muestra lista al hacer click)",table:{defaultValue:{summary:"false"}}},showTooltip:{control:{type:"boolean"},description:"Mostrar tooltip al hacer hover (solo para botones icon-only)",table:{defaultValue:{summary:"false"},category:"Tooltip"}},tooltipText:{control:{type:"text"},description:"Texto del tooltip (solo para botones icon-only)",table:{type:{summary:"string"},category:"Tooltip"}}}},f={args:{variant:"primary",size:"md",text:"Botón de ejemplo",icon:"check",iconStyle:"regular",iconPosition:"left",iconOnly:!1,disabled:!1,loading:!1,badge:!1,active:!1,floating:!1,fullWidth:!1,block:!1,dropdown:!1,dropdownOptions:[{label:"Opción 1",value:"opt1"},{label:"Opción 2",value:"opt2"},{label:"Opción 3",value:"opt3"}],showTooltip:!1,tooltipText:"Tooltip del botón"},render:n=>{const c=document.createElement("div");c.style.padding="20px",c.style.background="var(--modifiers-normal-color-light-bg-1), #ffffff)",c.style.borderRadius="8px";const r=document.createElement("div");r.style.display="flex",r.style.justifyContent="center",r.style.alignItems="flex-start",r.style.padding="40px",r.style.minHeight="120px",r.style.background="var(--modifiers-normal-color-light-bg-2), #f9fafb)",r.style.borderRadius="8px",r.style.marginBottom="20px",r.style.position="relative";const t={...n,iconOnly:n.iconPosition==="only"||n.iconOnly,iconPosition:n.iconPosition==="only"?"left":n.iconPosition};if(t.dropdown&&t.dropdownOptions&&t.dropdownOptions.length>0){const a=document.createElement("div");a.style.position="relative",a.style.display="inline-block",requestAnimationFrame(()=>{try{const i=S(t),o=i.parentElement,d=l=>{if(t.active||n.active){const e=document.documentElement,s=getComputedStyle(e).getPropertyValue("--modifiers-normal-color-light-bg-active-button").trim()||"var(--modifiers-normal-color-light-bg-active-button)",b=getComputedStyle(e).getPropertyValue("--modifiers-normal-color-light-bg-1").trim()||"#ffffff",y=`${s}, ${b}`;l.style.setProperty("background",y,"important"),l.style.setProperty("border","none","important"),l.style.setProperty("color","var(--modifiers-normal-color-light-accent-brand)","important"),l.querySelectorAll("span").forEach(p=>{p.style.color="var(--modifiers-normal-color-light-accent-brand)"}),l.querySelectorAll("i").forEach(p=>{p.style.color="var(--modifiers-normal-color-light-accent-brand)"})}};(t.active||n.active)&&i.classList.add("ubits-button--active"),o?(a.appendChild(o),d(i),t.iconOnly&&t.showTooltip&&t.tooltipText&&v(i,t.tooltipText)):(a.appendChild(i),d(i),t.iconOnly&&t.showTooltip&&t.tooltipText&&v(i,t.tooltipText))}catch{a.innerHTML=g(t);const o=a.querySelector("button");if(o){if((t.active||n.active)&&o.classList.add("ubits-button--active"),t.active||n.active){const d=document.documentElement,l=getComputedStyle(d).getPropertyValue("--modifiers-normal-color-light-bg-active-button").trim()||"var(--modifiers-normal-color-light-bg-active-button)",e=getComputedStyle(d).getPropertyValue("--modifiers-normal-color-light-bg-1").trim()||"#ffffff",s=`${l}, ${e}`;o.style.setProperty("background",s,"important"),o.style.setProperty("color","var(--modifiers-normal-color-light-accent-brand)","important"),o.style.setProperty("border","none","important"),o.querySelectorAll("span").forEach(u=>{u.style.color="var(--modifiers-normal-color-light-accent-brand)"}),o.querySelectorAll("i").forEach(u=>{u.style.color="var(--modifiers-normal-color-light-accent-brand)"})}t.iconOnly&&t.showTooltip&&t.tooltipText&&v(o,t.tooltipText)}}}),r.appendChild(a)}else{const a=g(t),i=document.createElement("div");i.innerHTML=a,r.appendChild(i),requestAnimationFrame(()=>{const o=i.querySelector("button");if(o){t.floating&&!o.classList.contains("ubits-button--floating")&&o.classList.add("ubits-button--floating");const d=o.classList.contains("ubits-button--active");(t.active||n.active)&&!d&&o.classList.add("ubits-button--active");const l=o.classList.contains("ubits-button--active");if(t.active||n.active||l){const e=document.documentElement,s=getComputedStyle(e).getPropertyValue("--modifiers-normal-color-light-bg-active-button").trim()||"var(--modifiers-normal-color-light-bg-active-button)",b=getComputedStyle(e).getPropertyValue("--modifiers-normal-color-light-bg-1").trim()||"var(--modifiers-normal-color-light-bg-1)",y=`${s}, ${b}`;o.style.setProperty("background",y,"important"),o.style.setProperty("border","none","important"),o.style.setProperty("color","var(--modifiers-normal-color-light-accent-brand)","important"),o.querySelectorAll("span").forEach(p=>{p.style.color="var(--modifiers-normal-color-light-accent-brand)"}),o.querySelectorAll("i").forEach(p=>{p.style.color="var(--modifiers-normal-color-light-accent-brand)"})}t.iconOnly&&t.showTooltip&&t.tooltipText&&v(o,t.tooltipText)}})}return c.appendChild(r),c}};function v(n,c){const r=n.dataset.tooltipInstance;if(r){const s=document.getElementById(r);s&&s.remove(),delete n.dataset.tooltipInstance}const t=n._tooltipMouseEnter,a=n._tooltipMouseLeave;t&&(n.removeEventListener("mouseenter",t),delete n._tooltipMouseEnter),a&&(n.removeEventListener("mouseleave",a),delete n._tooltipMouseLeave),n.hasAttribute("title")&&n.removeAttribute("title");const i=`button-tooltip-${Math.random().toString(36).substr(2,9)}`,o=c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),d=`
    <div class="ubits-tooltip ubits-tooltip--tail-bottom" id="${i}" style="position: fixed; z-index: 10000; opacity: 0; visibility: hidden; display: none; width: auto; min-width: fit-content; max-width: 240px;">
      <div class="ubits-tooltip__tail" style="left: 50%;">
        <div class="ubits-tooltip__tail-inner"></div>
      </div>
      <div class="ubits-tooltip__content" style="width: auto; min-width: fit-content;">
        <div class="ubits-tooltip__body" style="white-space: nowrap;">
          <div class="ubits-tooltip__body-content">
            <p class="ubits-body-md" style="margin: 0; white-space: nowrap;">${o}</p>
          </div>
        </div>
      </div>
    </div>
  `,l=document.createElement("div");l.innerHTML=d;const e=l.firstElementChild;if(e){document.body.appendChild(e);const s=()=>{const m=n.getBoundingClientRect();e.style.top="-9999px",e.style.left="0",e.style.transform="none",e.style.visibility="visible",e.style.opacity="0",e.style.display="block",e.classList.add("ubits-tooltip--open"),e.offsetHeight;const p=e.getBoundingClientRect(),x=p.height,A=m.top-x-9,T=m.left+m.width/2,C=p.width,E=T-C/2;e.style.top=`${A}px`,e.style.left=`${E}px`,e.style.transform="none",e.style.display="block",e.style.visibility="visible",e.style.opacity="1",e.style.transition="none",setTimeout(()=>{e.style.transition=""},50)},b=()=>{e.classList.remove("ubits-tooltip--open"),e.style.opacity="0",e.style.visibility="hidden",e.style.display="none"},y=m=>{m.stopPropagation(),s()},u=m=>{m.stopPropagation(),b()};n.addEventListener("mouseenter",y,!1),n.addEventListener("mouseleave",u,!1),n._tooltipMouseEnter=y,n._tooltipMouseLeave=u,n.dataset.tooltipInstance=i}}const h={args:{variant:"primary",size:"md",text:"Botón Active",active:!0,icon:"check",iconStyle:"regular",iconPosition:"left"},render:n=>{const c=document.createElement("div");c.style.padding="40px",c.style.background="var(--modifiers-normal-color-light-bg-1), #ffffff)",c.style.borderRadius="8px";const r=document.createElement("h3");r.textContent="Estado Active - Con nuevo fondo bg-active-button y texto accent-brand",r.style.marginBottom="24px",r.style.color="var(--modifiers-normal-color-light-fg-1-high, #303a47)",c.appendChild(r);const t=document.createElement("div");t.style.display="grid",t.style.gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))",t.style.gap="16px",t.style.marginBottom="32px";const a=document.createElement("div");a.style.display="flex",a.style.flexDirection="column",a.style.gap="8px";const i=document.createElement("label");i.textContent="Primary Active",i.style.fontSize="14px",i.style.color="var(--modifiers-normal-color-light-fg-1-medium, #5c646f)",i.style.fontWeight="500",a.appendChild(i),a.innerHTML+=g({...n,variant:"primary",active:!0,text:"Primary Active"}),t.appendChild(a);const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.gap="8px";const d=document.createElement("label");d.textContent="Secondary Active",d.style.fontSize="14px",d.style.color="var(--modifiers-normal-color-light-fg-1-medium, #5c646f)",d.style.fontWeight="500",o.appendChild(d),o.innerHTML+=g({...n,variant:"secondary",active:!0,text:"Secondary Active"}),t.appendChild(o);const l=document.createElement("div");l.style.display="flex",l.style.flexDirection="column",l.style.gap="8px";const e=document.createElement("label");e.textContent="Tertiary Active",e.style.fontSize="14px",e.style.color="var(--modifiers-normal-color-light-fg-1-medium, #5c646f)",e.style.fontWeight="500",l.appendChild(e),l.innerHTML+=g({...n,variant:"tertiary",active:!0,text:"Tertiary Active"}),t.appendChild(l),c.appendChild(t);const s=document.createElement("div");return s.style.padding="16px",s.style.background="var(--modifiers-normal-color-light-bg-2), #f3f3f4)",s.style.borderRadius="8px",s.style.marginTop="24px",s.innerHTML=`
      <p style="margin: 0 0 8px 0; color: var(--modifiers-normal-color-light-fg-1-high, #303a47); font-weight: 600;">Estilo Active:</p>
      <ul style="margin: 0; padding-left: 20px; color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);">
        <li>Fondo: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-bg-active-button)</code> sobre <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-bg-1)</code></li>
        <li>Texto: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-accent-brand)</code> (usa token accent-brand según tema)</li>
        <li>Sin borde</li>
      </ul>
    `,c.appendChild(s),c}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón de ejemplo',
    icon: 'check',
    iconStyle: 'regular',
    iconPosition: 'left',
    iconOnly: false,
    disabled: false,
    loading: false,
    badge: false,
    active: false,
    floating: false,
    fullWidth: false,
    block: false,
    dropdown: false,
    dropdownOptions: [{
      label: 'Opción 1',
      value: 'opt1'
    }, {
      label: 'Opción 2',
      value: 'opt2'
    }, {
      label: 'Opción 3',
      value: 'opt3'
    }],
    showTooltip: false,
    tooltipText: 'Tooltip del botón'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1), #ffffff)';
    container.style.borderRadius = '8px';
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'flex-start';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2), #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';

    // Convertir iconPosition 'only' a iconOnly para compatibilidad
    const buttonArgs = {
      ...args,
      iconOnly: args.iconPosition === 'only' || args.iconOnly,
      iconPosition: args.iconPosition === 'only' ? 'left' : args.iconPosition
    };

    // Si dropdown está activo, usar createButton para inicializar la funcionalidad
    if (buttonArgs.dropdown && buttonArgs.dropdownOptions && buttonArgs.dropdownOptions.length > 0) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.style.position = 'relative';
      buttonWrapper.style.display = 'inline-block';
      requestAnimationFrame(() => {
        try {
          const button = createButton(buttonArgs);
          // createButton con dropdown retorna el botón dentro de un div wrapper
          const parent = button.parentElement;

          // Función helper para aplicar estilos active
          const applyActiveStyles = (btn: HTMLButtonElement) => {
            if (buttonArgs.active || args.active) {
              // Aplicar fondo active con múltiples capas
              const root = document.documentElement;
              const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
              const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || '#ffffff';
              const backgroundValue = \`\${bgActiveButton}, \${bg1}\`;
              btn.style.setProperty('background', backgroundValue, 'important');
              btn.style.setProperty('border', 'none', 'important');
              btn.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
              const spans = btn.querySelectorAll('span');
              spans.forEach(span => {
                span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
              const icons = btn.querySelectorAll('i');
              icons.forEach(icon => {
                icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
            }
          };

          // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
          if (buttonArgs.active || args.active) {
            button.classList.add('ubits-button--active');
          }
          if (parent) {
            buttonWrapper.appendChild(parent);
            applyActiveStyles(button);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
          } else {
            buttonWrapper.appendChild(button);
            applyActiveStyles(button);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
          }
        } catch (error) {
          buttonWrapper.innerHTML = renderButton(buttonArgs);
          // Aplicar tooltip UBITS y estado visual si es necesario
          const button = buttonWrapper.querySelector('button') as HTMLButtonElement;
          if (button) {
            // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
            if (buttonArgs.active || args.active) {
              button.classList.add('ubits-button--active');
            }
            if (buttonArgs.active || args.active) {
              // Aplicar fondo active con múltiples capas
              const root = document.documentElement;
              const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
              const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || '#ffffff';
              const backgroundValue = \`\${bgActiveButton}, \${bg1}\`;
              button.style.setProperty('background', backgroundValue, 'important');
              button.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
              button.style.setProperty('border', 'none', 'important');
              const spans = button.querySelectorAll('span');
              spans.forEach(span => {
                span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
              const icons = button.querySelectorAll('i');
              icons.forEach(icon => {
                icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
            }
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
          }
        }
      });
      preview.appendChild(buttonWrapper);
    } else {
      // Sin dropdown, usar renderButton normalmente
      const buttonHTML = renderButton(buttonArgs);
      const buttonContainer = document.createElement('div');
      buttonContainer.innerHTML = buttonHTML;
      preview.appendChild(buttonContainer);

      // Aplicar estado visual si se especifica
      requestAnimationFrame(() => {
        const button = buttonContainer.querySelector('button') as HTMLButtonElement;
        if (button) {
          // Intentar agregar la clase manualmente si no está (para floating)
          if (buttonArgs.floating && !button.classList.contains('ubits-button--floating')) {
            button.classList.add('ubits-button--floating');
          }

          // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
          const hasActiveFromRender = button.classList.contains('ubits-button--active');

          // Si active es true pero no tiene la clase, agregarla
          if ((buttonArgs.active || args.active) && !hasActiveFromRender) {
            button.classList.add('ubits-button--active');
          }

          // Verificar si tiene la clase active después de verificar
          const hasActiveClass = button.classList.contains('ubits-button--active');

          // Si el botón está en estado active, asegurar color azul desde el inicio
          if (buttonArgs.active || args.active || hasActiveClass) {
            // Asegurar fondo active con múltiples capas: bg-active-button sobre bg1
            const root = document.documentElement;
            const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
            const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || 'var(--modifiers-normal-color-light-bg-1)';
            const backgroundValue = \`\${bgActiveButton}, \${bg1}\`;

            // Usar setProperty con !important para asegurar que se aplique
            button.style.setProperty('background', backgroundValue, 'important');
            button.style.setProperty('border', 'none', 'important');
            button.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
            const spans = button.querySelectorAll('span');
            spans.forEach(span => {
              span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
            });
            const icons = button.querySelectorAll('i');
            icons.forEach(icon => {
              icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
            });
          }

          // Aplicar tooltip UBITS si es necesario
          if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
            applyUBITSTooltip(button, buttonArgs.tooltipText);
          }
        }
      });
    }
    container.appendChild(preview);
    return container;
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón Active',
    active: true,
    icon: 'check',
    iconStyle: 'regular',
    iconPosition: 'left'
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1), #ffffff)';
    container.style.borderRadius = '8px';
    const title = document.createElement('h3');
    title.textContent = 'Estado Active - Con nuevo fondo bg-active-button y texto accent-brand';
    title.style.marginBottom = '24px';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high, #303a47)';
    container.appendChild(title);
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    grid.style.gap = '16px';
    grid.style.marginBottom = '32px';

    // Primary Active
    const primaryContainer = document.createElement('div');
    primaryContainer.style.display = 'flex';
    primaryContainer.style.flexDirection = 'column';
    primaryContainer.style.gap = '8px';
    const primaryLabel = document.createElement('label');
    primaryLabel.textContent = 'Primary Active';
    primaryLabel.style.fontSize = '14px';
    primaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    primaryLabel.style.fontWeight = '500';
    primaryContainer.appendChild(primaryLabel);
    primaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'primary',
      active: true,
      text: 'Primary Active'
    });
    grid.appendChild(primaryContainer);

    // Secondary Active
    const secondaryContainer = document.createElement('div');
    secondaryContainer.style.display = 'flex';
    secondaryContainer.style.flexDirection = 'column';
    secondaryContainer.style.gap = '8px';
    const secondaryLabel = document.createElement('label');
    secondaryLabel.textContent = 'Secondary Active';
    secondaryLabel.style.fontSize = '14px';
    secondaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    secondaryLabel.style.fontWeight = '500';
    secondaryContainer.appendChild(secondaryLabel);
    secondaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'secondary',
      active: true,
      text: 'Secondary Active'
    });
    grid.appendChild(secondaryContainer);

    // Tertiary Active
    const tertiaryContainer = document.createElement('div');
    tertiaryContainer.style.display = 'flex';
    tertiaryContainer.style.flexDirection = 'column';
    tertiaryContainer.style.gap = '8px';
    const tertiaryLabel = document.createElement('label');
    tertiaryLabel.textContent = 'Tertiary Active';
    tertiaryLabel.style.fontSize = '14px';
    tertiaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    tertiaryLabel.style.fontWeight = '500';
    tertiaryContainer.appendChild(tertiaryLabel);
    tertiaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'tertiary',
      active: true,
      text: 'Tertiary Active'
    });
    grid.appendChild(tertiaryContainer);
    container.appendChild(grid);

    // Información sobre el estilo
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2), #f3f3f4)';
    info.style.borderRadius = '8px';
    info.style.marginTop = '24px';
    info.innerHTML = \`
      <p style="margin: 0 0 8px 0; color: var(--modifiers-normal-color-light-fg-1-high, #303a47); font-weight: 600;">Estilo Active:</p>
      <ul style="margin: 0; padding-left: 20px; color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);">
        <li>Fondo: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-bg-active-button)</code> sobre <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-bg-1)</code></li>
        <li>Texto: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-accent-brand)</code> (usa token accent-brand según tema)</li>
        <li>Sin borde</li>
      </ul>
    \`;
    container.appendChild(info);
    return container;
  }
}`,...h.parameters?.docs?.source}}};const V=["Default","ActiveState"];export{h as ActiveState,f as Default,V as __namedExportsOrder,M as default};
