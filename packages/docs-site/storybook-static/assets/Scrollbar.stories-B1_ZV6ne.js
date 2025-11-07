import"./iframe-DpxOG777.js";import"./preload-helper-PPVm8Dsz.js";function k(s){const{orientation:E="vertical",state:u="default",className:m=""}=s;return`
    <div class="${["ubits-scrollbar",`ubits-scrollbar--${E}`,u?`ubits-scrollbar--${u}`:"",m].filter(Boolean).join(" ")}">
      <div class="ubits-scrollbar__bar"></div>
    </div>
  `.trim()}function M(s){const{containerId:E,targetId:u,orientation:m="vertical",state:b="default",className:i=""}=s;let x;E?x=document.getElementById(E)||document.body:x=document.body;const T=document.createElement("div");T.innerHTML=k({orientation:m,state:b,className:i});const r=T.firstElementChild;if(!r)throw new Error("No se pudo crear el scrollbar");const o=r.querySelector(".ubits-scrollbar__bar");if(!o)throw new Error("No se pudo encontrar la barra del scrollbar");let e=null;if(u)e=document.getElementById(u);else if(E){const t=x.querySelector("[data-scrollable]");t&&(e=t)}const d=()=>{if(!e||!o)return;const t=m==="vertical",n=t?"scrollTop":"scrollLeft",S=t?"clientHeight":"clientWidth",I=t?"scrollHeight":"scrollWidth",$=e[n],g=e[S],w=e[I];if(w<=g){o.style.opacity="0";return}const y=t?r.clientHeight:r.clientWidth,C=Math.max(g/w*y,20),z=y-C,L=$/(w-g)*z;t?(o.style.height=`${C}px`,o.style.transform=`translateY(${L}px)`):(o.style.width=`${C}px`,o.style.transform=`translateX(${L}px)`),o.style.opacity="1"},c=t=>{if(!e||!o||t.target===o)return;t.preventDefault(),t.stopPropagation();const n=m==="vertical",S=r.getBoundingClientRect(),I=n?t.clientY-S.top:t.clientX-S.left,$=n?r.clientHeight:r.clientWidth,g=I/$,w=n?"clientHeight":"clientWidth",y=n?"scrollHeight":"scrollWidth",C=n?"scrollTop":"scrollLeft",z=e[w],W=e[y]-z;e[C]=g*W};let l=!1,f=0,h=0;const v=t=>{if(!e||!o||t.target!==o)return;t.preventDefault(),t.stopPropagation(),l=!0;const n=m==="vertical";f=n?t.clientY:t.clientX,h=n?e.scrollTop:e.scrollLeft,document.addEventListener("mousemove",p),document.addEventListener("mouseup",a)},p=t=>{if(!l||!e||!o)return;const n=m==="vertical",I=(n?t.clientY:t.clientX)-f,$=n?r.clientHeight:r.clientWidth,g=n?e.clientHeight:e.clientWidth,y=(n?e.scrollHeight:e.scrollWidth)-g,C=y/$,z=h+I*C;n?e.scrollTop=Math.max(0,Math.min(y,z)):e.scrollLeft=Math.max(0,Math.min(y,z))},a=()=>{l=!1,document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",a)};if(e){e.addEventListener("scroll",d),e.addEventListener("resize",d);const t=new ResizeObserver(()=>{d()});t.observe(e),r.__resizeObserver=t}return r.addEventListener("click",c),o.addEventListener("mousedown",v),r.__handleMouseUp=a,r.__handleMouseMove=p,x.appendChild(r),setTimeout(()=>{d()},100),{element:r,update:d,destroy:()=>{if(e){e.removeEventListener("scroll",d),e.removeEventListener("resize",d);const t=r.__resizeObserver;t&&t.disconnect()}r.removeEventListener("click",c),o.removeEventListener("mousedown",v),r.__handleMouseUp&&(document.removeEventListener("mousemove",r.__handleMouseMove),document.removeEventListener("mouseup",r.__handleMouseUp)),r.remove()}}}const _={title:"Components/Scrollbar",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Scrollbar personalizado UBITS. Se usa para crear scrollbars personalizados en elementos scrollable. Soporta orientación vertical y horizontal. Se sincroniza automáticamente con el elemento scrollable asociado. Aparece en hover y se adapta al tamaño del contenido. Soporta arrastrar y clic para navegar."}},layout:"fullscreen"},argTypes:{orientation:{control:{type:"select"},options:["vertical","horizontal"],description:"Orientación del scrollbar (vertical u horizontal).",table:{type:{summary:"string"},defaultValue:{summary:"vertical"},category:"Apariencia"}},state:{control:{type:"select"},options:["default"],description:"Estado del scrollbar.",table:{type:{summary:"string"},defaultValue:{summary:"default"},category:"Estado"}}}},P={args:{orientation:"vertical",state:"default"},render:(s,{updateArgs:E})=>{const u=document.createElement("div");u.style.cssText=`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    `;const m=document.createElement("div");m.style.cssText=`
      background: var(--ubits-bg-1, #ffffff);
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;let b=null,i=null;const x=o=>{if(b&&(b.destroy(),b=null),i&&i.remove(),i=document.createElement("div"),o==="vertical"){i.style.cssText=`
          display: flex;
          align-items: stretch;
          gap: 8px;
          width: 600px;
          height: 400px;
        `;const e=document.createElement("div");e.id=`scrollbar-target-vertical-${Date.now()}`,e.style.cssText=`
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px;
          background: var(--ubits-bg-2, #f3f3f4);
          border-radius: 8px;
          border: 1px solid var(--ubits-border-1, #d0d2d5);
          -ms-overflow-style: none;
          scrollbar-width: none;
        `,e.style.setProperty("-ms-overflow-style","none"),e.style.setProperty("scrollbar-width","none");const d=`scrollbar-style-vertical-${Date.now()}`;let c=document.getElementById(d);c||(c=document.createElement("style"),c.id=d,c.textContent=`
            #${e.id}::-webkit-scrollbar {
              display: none;
            }
          `,document.head.appendChild(c));const l=document.createElement("div");l.style.cssText=`
          height: 1200px;
          padding: 16px;
        `;const f=document.createElement("p");f.textContent="Scrollbar Vertical",f.style.cssText=`
          margin: 0 0 16px 0;
          color: var(--ubits-fg-1-high, #303a47);
          font-size: var(--font-body-md-size, 16px);
          font-weight: var(--weight-bold, 700);
        `;const h=document.createElement("p");h.textContent="Este es un ejemplo de contenido largo que requiere scroll vertical. El scrollbar aparecerá a la derecha cuando pases el mouse sobre el contenedor. Puedes arrastrar la barra del scrollbar o hacer clic en el área del scrollbar para navegar.",h.style.cssText=`
          margin: 0 0 24px 0;
          color: var(--ubits-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
        `;const v=document.createElement("div");v.style.cssText=`
          display: flex;
          flex-direction: column;
          gap: 12px;
        `;for(let a=1;a<=30;a++){const t=document.createElement("div");t.style.cssText=`
            padding: 12px;
            background: var(--ubits-bg-1, #ffffff);
            border-radius: 8px;
            border: 1px solid var(--ubits-border-1, #d0d2d5);
          `;const n=document.createElement("p");n.textContent=`Elemento ${a}`,n.style.cssText=`
            margin: 0;
            color: var(--ubits-fg-1-high, #303a47);
            font-size: var(--font-body-sm-size, 13px);
          `,t.appendChild(n),v.appendChild(t)}l.appendChild(f),l.appendChild(h),l.appendChild(v),e.appendChild(l);const p=document.createElement("div");p.id=`scrollbar-container-vertical-${Date.now()}`,p.style.cssText=`
          height: 100%;
        `,i.appendChild(e),i.appendChild(p),setTimeout(()=>{try{b=M({orientation:"vertical",state:s.state,targetId:e.id,containerId:p.id})}catch(a){console.error("Error al crear scrollbar:",a)}},100)}else{i.style.cssText=`
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 600px;
          height: 300px;
        `;const e=document.createElement("div");e.id=`scrollbar-target-horizontal-${Date.now()}`,e.style.cssText=`
          flex: 1;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 16px;
          background: var(--ubits-bg-2, #f3f3f4);
          border-radius: 8px;
          border: 1px solid var(--ubits-border-1, #d0d2d5);
          -ms-overflow-style: none;
          scrollbar-width: none;
        `,e.style.setProperty("-ms-overflow-style","none"),e.style.setProperty("scrollbar-width","none");const d=`scrollbar-style-horizontal-${Date.now()}`;let c=document.getElementById(d);c||(c=document.createElement("style"),c.id=d,c.textContent=`
            #${e.id}::-webkit-scrollbar {
              display: none;
            }
          `,document.head.appendChild(c));const l=document.createElement("div");l.style.cssText=`
          width: 1800px;
          padding: 16px;
        `;const f=document.createElement("p");f.textContent="Scrollbar Horizontal",f.style.cssText=`
          margin: 0 0 16px 0;
          color: var(--ubits-fg-1-high, #303a47);
          font-size: var(--font-body-md-size, 16px);
          font-weight: var(--weight-bold, 700);
        `;const h=document.createElement("p");h.textContent="Este es un ejemplo de contenido ancho que requiere scroll horizontal. El scrollbar aparecerá abajo cuando pases el mouse sobre el contenedor. Puedes arrastrar la barra del scrollbar o hacer clic en el área del scrollbar para navegar.",h.style.cssText=`
          margin: 0 0 24px 0;
          color: var(--ubits-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
        `;const v=document.createElement("div");v.style.cssText=`
          display: flex;
          gap: 12px;
        `;for(let a=1;a<=20;a++){const t=document.createElement("div");t.style.cssText=`
            min-width: 200px;
            padding: 12px;
            background: var(--ubits-bg-1, #ffffff);
            border-radius: 8px;
            border: 1px solid var(--ubits-border-1, #d0d2d5);
          `;const n=document.createElement("p");n.textContent=`Elemento ${a}`,n.style.cssText=`
            margin: 0;
            color: var(--ubits-fg-1-high, #303a47);
            font-size: var(--font-body-sm-size, 13px);
          `,t.appendChild(n),v.appendChild(t)}l.appendChild(f),l.appendChild(h),l.appendChild(v),e.appendChild(l);const p=document.createElement("div");p.id=`scrollbar-container-horizontal-${Date.now()}`,p.style.cssText=`
          width: 100%;
        `,i.appendChild(e),i.appendChild(p),setTimeout(()=>{try{b=M({orientation:"horizontal",state:s.state,targetId:e.id,containerId:p.id})}catch(a){console.error("Error al crear scrollbar:",a)}},100)}m.appendChild(i)};x(s.orientation),new MutationObserver(()=>{s.orientation&&i&&(i.querySelector('[id*="scrollbar-target-vertical"]')?"vertical":"horizontal")!==s.orientation&&x(s.orientation)});let T=s.orientation;const r=setInterval(()=>{s.orientation!==T&&(T=s.orientation,x(s.orientation))},100);return u.addEventListener("DOMNodeRemoved",()=>{clearInterval(r),b&&b.destroy()}),u.appendChild(m),u}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical',
    state: 'default'
  },
  render: (args, {
    updateArgs
  }) => {
    // Crear contenedor fullscreen
    const container = document.createElement('div');
    container.style.cssText = \`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    \`;

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      background: var(--ubits-bg-1, #ffffff);
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    \`;
    let scrollbarInstance: any = null;
    let currentWrapper: HTMLElement | null = null;
    const createScrollbarContent = (orientation: 'vertical' | 'horizontal') => {
      // Limpiar contenido anterior
      if (scrollbarInstance) {
        scrollbarInstance.destroy();
        scrollbarInstance = null;
      }
      if (currentWrapper) {
        currentWrapper.remove();
      }
      currentWrapper = document.createElement('div');
      if (orientation === 'vertical') {
        currentWrapper.style.cssText = \`
          display: flex;
          align-items: stretch;
          gap: 8px;
          width: 600px;
          height: 400px;
        \`;
        const scrollableContainer = document.createElement('div');
        scrollableContainer.id = \`scrollbar-target-vertical-\${Date.now()}\`;
        scrollableContainer.style.cssText = \`
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px;
          background: var(--ubits-bg-2, #f3f3f4);
          border-radius: 8px;
          border: 1px solid var(--ubits-border-1, #d0d2d5);
          -ms-overflow-style: none;
          scrollbar-width: none;
        \`;
        scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
        scrollableContainer.style.setProperty('scrollbar-width', 'none');

        // Estilo para ocultar scrollbar nativo de WebKit
        const styleId = \`scrollbar-style-vertical-\${Date.now()}\`;
        let styleElement = document.getElementById(styleId);
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          styleElement.textContent = \`
            #\${scrollableContainer.id}::-webkit-scrollbar {
              display: none;
            }
          \`;
          document.head.appendChild(styleElement);
        }

        // Contenido largo
        const content = document.createElement('div');
        content.style.cssText = \`
          height: 1200px;
          padding: 16px;
        \`;
        const title = document.createElement('p');
        title.textContent = 'Scrollbar Vertical';
        title.style.cssText = \`
          margin: 0 0 16px 0;
          color: var(--ubits-fg-1-high, #303a47);
          font-size: var(--font-body-md-size, 16px);
          font-weight: var(--weight-bold, 700);
        \`;
        const description = document.createElement('p');
        description.textContent = 'Este es un ejemplo de contenido largo que requiere scroll vertical. El scrollbar aparecerá a la derecha cuando pases el mouse sobre el contenedor. Puedes arrastrar la barra del scrollbar o hacer clic en el área del scrollbar para navegar.';
        description.style.cssText = \`
          margin: 0 0 24px 0;
          color: var(--ubits-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
        \`;
        const itemsContainer = document.createElement('div');
        itemsContainer.style.cssText = \`
          display: flex;
          flex-direction: column;
          gap: 12px;
        \`;
        for (let i = 1; i <= 30; i++) {
          const item = document.createElement('div');
          item.style.cssText = \`
            padding: 12px;
            background: var(--ubits-bg-1, #ffffff);
            border-radius: 8px;
            border: 1px solid var(--ubits-border-1, #d0d2d5);
          \`;
          const itemText = document.createElement('p');
          itemText.textContent = \`Elemento \${i}\`;
          itemText.style.cssText = \`
            margin: 0;
            color: var(--ubits-fg-1-high, #303a47);
            font-size: var(--font-body-sm-size, 13px);
          \`;
          item.appendChild(itemText);
          itemsContainer.appendChild(item);
        }
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(itemsContainer);
        scrollableContainer.appendChild(content);
        const scrollbarContainer = document.createElement('div');
        scrollbarContainer.id = \`scrollbar-container-vertical-\${Date.now()}\`;
        scrollbarContainer.style.cssText = \`
          height: 100%;
        \`;
        currentWrapper.appendChild(scrollableContainer);
        currentWrapper.appendChild(scrollbarContainer);

        // Crear scrollbar después de que el DOM esté listo
        setTimeout(() => {
          try {
            scrollbarInstance = createScrollbar({
              orientation: 'vertical',
              state: args.state,
              targetId: scrollableContainer.id,
              containerId: scrollbarContainer.id
            });
          } catch (error) {
            console.error('Error al crear scrollbar:', error);
          }
        }, 100);
      } else {
        currentWrapper.style.cssText = \`
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 600px;
          height: 300px;
        \`;
        const scrollableContainer = document.createElement('div');
        scrollableContainer.id = \`scrollbar-target-horizontal-\${Date.now()}\`;
        scrollableContainer.style.cssText = \`
          flex: 1;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 16px;
          background: var(--ubits-bg-2, #f3f3f4);
          border-radius: 8px;
          border: 1px solid var(--ubits-border-1, #d0d2d5);
          -ms-overflow-style: none;
          scrollbar-width: none;
        \`;
        scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
        scrollableContainer.style.setProperty('scrollbar-width', 'none');

        // Estilo para ocultar scrollbar nativo de WebKit
        const styleId = \`scrollbar-style-horizontal-\${Date.now()}\`;
        let styleElement = document.getElementById(styleId);
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          styleElement.textContent = \`
            #\${scrollableContainer.id}::-webkit-scrollbar {
              display: none;
            }
          \`;
          document.head.appendChild(styleElement);
        }

        // Contenido ancho
        const content = document.createElement('div');
        content.style.cssText = \`
          width: 1800px;
          padding: 16px;
        \`;
        const title = document.createElement('p');
        title.textContent = 'Scrollbar Horizontal';
        title.style.cssText = \`
          margin: 0 0 16px 0;
          color: var(--ubits-fg-1-high, #303a47);
          font-size: var(--font-body-md-size, 16px);
          font-weight: var(--weight-bold, 700);
        \`;
        const description = document.createElement('p');
        description.textContent = 'Este es un ejemplo de contenido ancho que requiere scroll horizontal. El scrollbar aparecerá abajo cuando pases el mouse sobre el contenedor. Puedes arrastrar la barra del scrollbar o hacer clic en el área del scrollbar para navegar.';
        description.style.cssText = \`
          margin: 0 0 24px 0;
          color: var(--ubits-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
        \`;
        const itemsContainer = document.createElement('div');
        itemsContainer.style.cssText = \`
          display: flex;
          gap: 12px;
        \`;
        for (let i = 1; i <= 20; i++) {
          const item = document.createElement('div');
          item.style.cssText = \`
            min-width: 200px;
            padding: 12px;
            background: var(--ubits-bg-1, #ffffff);
            border-radius: 8px;
            border: 1px solid var(--ubits-border-1, #d0d2d5);
          \`;
          const itemText = document.createElement('p');
          itemText.textContent = \`Elemento \${i}\`;
          itemText.style.cssText = \`
            margin: 0;
            color: var(--ubits-fg-1-high, #303a47);
            font-size: var(--font-body-sm-size, 13px);
          \`;
          item.appendChild(itemText);
          itemsContainer.appendChild(item);
        }
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(itemsContainer);
        scrollableContainer.appendChild(content);
        const scrollbarContainer = document.createElement('div');
        scrollbarContainer.id = \`scrollbar-container-horizontal-\${Date.now()}\`;
        scrollbarContainer.style.cssText = \`
          width: 100%;
        \`;
        currentWrapper.appendChild(scrollableContainer);
        currentWrapper.appendChild(scrollbarContainer);

        // Crear scrollbar después de que el DOM esté listo
        setTimeout(() => {
          try {
            scrollbarInstance = createScrollbar({
              orientation: 'horizontal',
              state: args.state,
              targetId: scrollableContainer.id,
              containerId: scrollbarContainer.id
            });
          } catch (error) {
            console.error('Error al crear scrollbar:', error);
          }
        }, 100);
      }
      wrapper.appendChild(currentWrapper);
    };

    // Crear contenido inicial
    createScrollbarContent(args.orientation);

    // Observar cambios en args
    const observer = new MutationObserver(() => {
      if (args.orientation && currentWrapper) {
        const currentOrientation = currentWrapper.querySelector('[id*="scrollbar-target-vertical"]') ? 'vertical' : 'horizontal';
        if (currentOrientation !== args.orientation) {
          createScrollbarContent(args.orientation);
        }
      }
    });

    // Usar un intervalo para verificar cambios en args (debido a limitaciones de Storybook HTML)
    let lastOrientation = args.orientation;
    const checkInterval = setInterval(() => {
      if (args.orientation !== lastOrientation) {
        lastOrientation = args.orientation;
        createScrollbarContent(args.orientation);
      }
    }, 100);

    // Limpiar al desmontar
    container.addEventListener('DOMNodeRemoved', () => {
      clearInterval(checkInterval);
      if (scrollbarInstance) {
        scrollbarInstance.destroy();
      }
    });
    container.appendChild(wrapper);
    return container;
  }
}`,...P.parameters?.docs?.source}}};const q=["Default"];export{P as Default,q as __namedExportsOrder,_ as default};
