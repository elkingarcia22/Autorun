const y = {
	title: 'Templates/Templates UBITS Desktop',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Templates completos de UBITS para modo Administrador y Colaborador. Incluyen Sidebar, TabBar, SubNav y todos los componentes del sistema de diseño UBITS. Estos templates representan las vistas completas de escritorio de las aplicaciones UBITS.',
			},
		},
		layout: 'fullscreen',
	},
	argTypes: {
		template: {
			control: { type: 'select' },
			options: ['admin', 'colaborador'],
			description: 'Template a mostrar: Administrador o Colaborador',
			table: { defaultValue: { summary: 'colaborador' }, type: { summary: 'admin | colaborador' } },
		},
	},
};
function f(o) {
	const t = '/templates';
	return o === 'admin' ? `${t}/template-admin.html` : `${t}/template-colaborador.html`;
}
const m = new Map(),
	s = {
		args: { template: 'colaborador' },
		render: (o) => {
			const t = `template-instance-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				n = document.createElement('div');
			(n.id = 'templates-story-container'),
				n.setAttribute('data-instance-id', t),
				(n.style.cssText = `
      width: 100%;
      height: 100vh;
      position: relative;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
    `);
			const e = document.createElement('iframe');
			(e.id = `template-iframe-${t}`),
				(e.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    `),
				e.setAttribute(
					'sandbox',
					'allow-same-origin allow-scripts allow-forms allow-popups allow-modals',
				),
				m.set(t, { iframe: e, currentTemplate: null, isLoading: !1 }),
				((r) => {
					const a = m.get(t);
					if (!a || (a.isLoading && a.currentTemplate === r)) return;
					if (a.currentTemplate === r && e.src) {
						const l = f(r);
						if (e.src.includes(l)) return;
					}
					(a.isLoading = !0), (a.currentTemplate = r);
					const i = f(r),
						b = window.location.origin + i;
					(!e.src || !e.src.includes(i)) && (e.src = i);
					const d = () => {
							try {
								const c = e.contentWindow?.document;
								if (c) {
									const u = document.body.getAttribute('data-theme') || 'light';
									c.body.setAttribute('data-theme', u),
										c.documentElement.setAttribute('data-theme', u);
								}
							} catch {}
						},
						p = new MutationObserver(() => {
							d();
						});
					p.observe(document.body, { attributes: !0, attributeFilter: ['data-theme'] }),
						p.observe(document.documentElement, {
							attributes: !0,
							attributeFilter: ['data-theme'],
						}),
						(e.onload = () => {
							d(), (a.isLoading = !1), console.log(`✅ Template ${r} cargado exitosamente`);
						}),
						(e.onerror = () => {
							(a.isLoading = !1),
								console.error(`❌ Error cargando template ${r}`),
								(e.srcdoc = `
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
                <p>No se pudo cargar: ${i}</p>
                <p>Verifica que el archivo exista en la ruta correcta.</p>
                <p><small>Ruta esperada: ${b}</small></p>
              </div>
            </body>
          </html>
        `);
						});
				})(o.template),
				n.setAttribute('data-template', o.template),
				n.appendChild(e);
			const h = n.remove;
			return (
				(n.remove = function () {
					themeObserver.disconnect(), m.delete(t), h.call(this);
				}),
				n
			);
		},
	};
s.parameters = {
	...s.parameters,
	docs: {
		...s.parameters?.docs,
		source: {
			originalSource: `{
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

      // Función para sincronizar el tema del iframe con Storybook
      const syncThemeToIframe = () => {
        try {
          const iframeWindow = iframe.contentWindow as any;
          const iframeDoc = iframeWindow?.document;
          if (iframeDoc) {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            iframeDoc.body.setAttribute('data-theme', currentTheme);
            iframeDoc.documentElement.setAttribute('data-theme', currentTheme);
          }
        } catch (e) {
          // Ignorar errores de CORS
        }
      };

      // Observar cambios de tema en Storybook y propagarlos al iframe
      const themeObserver = new MutationObserver(() => {
        syncThemeToIframe();
      });
      themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
      });

      // También observar el documentElement
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });

      // Manejar carga completa
      iframe.onload = () => {
        // Sincronizar tema inmediatamente al cargar
        syncThemeToIframe();
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
      themeObserver.disconnect();
      templateInstances.delete(instanceId);
      originalRemove.call(this);
    };
    return container;
  }
}`,
			...s.parameters?.docs?.source,
		},
	},
};
const T = ['Default'];
export { s as Default, T as __namedExportsOrder, y as default };
