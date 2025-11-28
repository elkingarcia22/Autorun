const f={title:"Templates/Templates UBITS Desktop",tags:["autodocs"],parameters:{docs:{description:{component:"Templates completos de UBITS para modo Administrador y Colaborador. Incluyen Sidebar, TabBar, SubNav y todos los componentes del sistema de diseño UBITS. Estos templates representan las vistas completas de escritorio de las aplicaciones UBITS."}},layout:"fullscreen"},argTypes:{template:{control:{type:"select"},options:["admin","colaborador"],description:"Template a mostrar: Administrador o Colaborador",table:{defaultValue:{summary:"colaborador"},type:{summary:"admin | colaborador"}}}}};function c(o){const a="/templates";return o==="admin"?`${a}/template-admin.html`:`${a}/template-colaborador.html`}const l=new Map,i={args:{template:"colaborador"},render:o=>{const a=`template-instance-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,n=document.createElement("div");n.id="templates-story-container",n.setAttribute("data-instance-id",a),n.style.cssText=`
      width: 100%;
      height: 100vh;
      position: relative;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
    `;const e=document.createElement("iframe");e.id=`template-iframe-${a}`,e.style.cssText=`
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    `,e.setAttribute("sandbox","allow-same-origin allow-scripts allow-forms allow-popups allow-modals"),l.set(a,{iframe:e,currentTemplate:null,isLoading:!1}),(r=>{const t=l.get(a);if(!t||t.isLoading&&t.currentTemplate===r)return;if(t.currentTemplate===r&&e.src){const p=c(r);if(e.src.includes(p))return}t.isLoading=!0,t.currentTemplate=r;const s=c(r),d=window.location.origin+s;(!e.src||!e.src.includes(s))&&(e.src=s),e.onload=()=>{t.isLoading=!1,console.log(`✅ Template ${r} cargado exitosamente`)},e.onerror=()=>{t.isLoading=!1,console.error(`❌ Error cargando template ${r}`),e.srcdoc=`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Error</title>
              <style>
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                  background: #f5f5f5;
                  color: #333;
                }
                .error-container {
                  text-align: center;
                  padding: 2rem;
                }
                h1 { color: #d32f2f; margin-bottom: 1rem; }
                p { color: #666; }
              </style>
            </head>
            <body>
              <div class="error-container">
                <h1>⚠️ Error al cargar el template</h1>
                <p>No se pudo cargar: ${s}</p>
                <p>Verifica que el archivo exista en la ruta correcta.</p>
                <p><small>Ruta esperada: ${d}</small></p>
              </div>
            </body>
          </html>
        `}})(o.template),n.setAttribute("data-template",o.template),n.appendChild(e);const m=n.remove;return n.remove=function(){l.delete(a),m.call(this)},n}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    template: 'colaborador'
  } as {
    template: 'admin' | 'colaborador';
  },
  render: args => {
    // Crear ID único para esta instancia
    const instanceId = \`template-instance-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;

    // Crear contenedor principal
    const container = document.createElement('div');
    container.id = 'templates-story-container';
    container.setAttribute('data-instance-id', instanceId);
    container.style.cssText = \`
      width: 100%;
      height: 100vh;
      position: relative;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
    \`;

    // Crear iframe para cargar el template
    const iframe = document.createElement('iframe');
    iframe.id = \`template-iframe-\${instanceId}\`;
    iframe.style.cssText = \`
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    \`;
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups allow-modals');

    // Inicializar estado de esta instancia
    templateInstances.set(instanceId, {
      iframe,
      currentTemplate: null,
      isLoading: false
    });

    // Función para cargar el template
    const loadTemplate = (template: 'admin' | 'colaborador') => {
      const instance = templateInstances.get(instanceId);
      if (!instance) return;

      // Evitar recargas si ya está cargando el mismo template
      if (instance.isLoading && instance.currentTemplate === template) {
        return;
      }

      // Evitar recargas innecesarias si el template no cambió
      if (instance.currentTemplate === template && iframe.src) {
        const currentPath = getTemplatePath(template);
        if (iframe.src.includes(currentPath)) {
          return;
        }
      }
      instance.isLoading = true;
      instance.currentTemplate = template;
      const templatePath = getTemplatePath(template);

      // Solo actualizar src si es diferente
      const fullPath = window.location.origin + templatePath;
      if (!iframe.src || !iframe.src.includes(templatePath)) {
        iframe.src = templatePath;
      }

      // Manejar carga completa
      iframe.onload = () => {
        instance.isLoading = false;
        console.log(\`✅ Template \${template} cargado exitosamente\`);
      };

      // Manejar errores
      iframe.onerror = () => {
        instance.isLoading = false;
        console.error(\`❌ Error cargando template \${template}\`);

        // Mostrar mensaje de error en el iframe
        iframe.srcdoc = \`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Error</title>
              <style>
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                  background: #f5f5f5;
                  color: #333;
                }
                .error-container {
                  text-align: center;
                  padding: 2rem;
                }
                h1 { color: #d32f2f; margin-bottom: 1rem; }
                p { color: #666; }
              </style>
            </head>
            <body>
              <div class="error-container">
                <h1>⚠️ Error al cargar el template</h1>
                <p>No se pudo cargar: \${templatePath}</p>
                <p>Verifica que el archivo exista en la ruta correcta.</p>
                <p><small>Ruta esperada: \${fullPath}</small></p>
              </div>
            </body>
          </html>
        \`;
      };
    };

    // Cargar el template inicial
    loadTemplate(args.template);

    // Agregar atributo para tracking
    container.setAttribute('data-template', args.template);

    // Agregar iframe al contenedor
    container.appendChild(iframe);

    // Cleanup cuando se desmonte el componente
    // Storybook manejará las actualizaciones llamando a render() nuevamente cuando cambien los args
    const originalRemove = container.remove;
    container.remove = function () {
      templateInstances.delete(instanceId);
      originalRemove.call(this);
    };
    return container;
  }
}`,...i.parameters?.docs?.source}}};const g=["Default"];export{i as Default,g as __namedExportsOrder,f as default};
