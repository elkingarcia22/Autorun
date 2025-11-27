/**
 * CanvasCreator
 *
 * Crea archivos de lienzo/template para prototipar
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { UBITS_PRESET, UBITS_MODULES_CONFIG } from './UBITSPreset';

export class CanvasCreator {
	private projectPath: string;

	constructor(projectPath: string = process.cwd()) {
		this.projectPath = projectPath;
	}

	/**
	 * Crea un lienzo/template nuevo cargando el template desde Storybook
	 */
	async create(
		template: 'administrador' | 'colaborador',
		module: string,
		product?: string,
	): Promise<string> {
		const templateConfig = UBITS_PRESET.templates[template];
		const fileName = this.generateFileName(template, module, product);
		const filePath = path.join(this.projectPath, 'prototypes', fileName);

		// Crear directorio si no existe
		await fs.mkdir(path.dirname(filePath), { recursive: true });

		// Cargar template desde Storybook
		const content = await this.loadTemplateFromStorybook(template, module, product);

		// Escribir archivo
		await fs.writeFile(filePath, content, 'utf-8');

		console.log(`✅ Lienzo creado: ${filePath}`);

		return filePath;
	}

	/**
	 * Carga el template completo desde la carpeta UBITS local en el escritorio
	 * Copia el template tal cual y solo ajusta las rutas para que funcionen
	 */
	private async loadTemplateFromStorybook(
		template: 'administrador' | 'colaborador',
		module: string,
		product?: string,
	): Promise<string> {
		const templateConfig = UBITS_PRESET.templates[template];
		const templateFileName = template === 'administrador' ? 'template-admin.html' : 'template-colaborador.html';
		
		// Obtener ruta de UBITS en el escritorio
		const os = await import('os');
		const ubitsDesktopPath = path.join(os.homedir(), 'Desktop', 'UBITS', 'packages', 'templates', templateFileName);
		
		try {
			// Verificar si existe el archivo en el escritorio
			await fs.access(ubitsDesktopPath);
			
			// Cargar desde archivo local del escritorio
			console.log(`   📄 Cargando template completo desde UBITS local: ${ubitsDesktopPath}`);
			let templateContent = await fs.readFile(ubitsDesktopPath, 'utf-8');
			
			// Calcular ruta relativa desde prototypes/ hacia Desktop/UBITS/packages/
			// prototypes/ está en: projectPath/prototypes/
			// UBITS/packages/ está en: ~/Desktop/UBITS/packages/
			const prototypesPath = path.join(this.projectPath, 'prototypes');
			const ubitsPackagesPath = path.join(os.homedir(), 'Desktop', 'UBITS', 'packages');
			
			// Calcular ruta relativa
			const relativePath = path.relative(prototypesPath, ubitsPackagesPath);
			// Normalizar para usar en HTML (usar / en lugar de \)
			const normalizedPath = relativePath.split(path.sep).join('/');
			
			// Ajustar rutas relativas del template
			// Las rutas originales son: ../tokens/dist/tokens.css (relativas a packages/templates/)
			// Necesitamos: ../../Desktop/UBITS/packages/tokens/dist/tokens.css (relativas a prototypes/)
			templateContent = await this.adjustTemplatePaths(templateContent, normalizedPath);
			
			// Personalizar el template con el módulo y producto seleccionados
			// Esto agrega el script que activa el módulo/producto en sidebar y subnav
			templateContent = this.customizeTemplate(templateContent, template, module, product);
			
			return templateContent;
		} catch (localError) {
			console.warn('⚠️  No se pudo cargar template desde UBITS local:', localError);
			console.warn(`   💡 Verifica que existe: ${ubitsDesktopPath}`);
			// Fallback a template generado localmente
			return this.generateCanvasContent(template, module, templateConfig, product);
		}
	}

	/**
	 * Ajusta las rutas del template para que funcionen desde prototypes/
	 * Las rutas originales son relativas a packages/templates/ (../tokens/...)
	 * Las convertimos a rutas relativas desde prototypes/ hacia Desktop/UBITS/packages/
	 */
	private async adjustTemplatePaths(content: string, relativePathToUBITS: string): Promise<string> {
		// Las rutas originales son: ../tokens/dist/tokens.css
		// Necesitamos: ../../Desktop/UBITS/packages/tokens/dist/tokens.css
		// Pero relativePathToUBITS ya incluye el path completo relativo
		// Entonces: ${relativePathToUBITS}/tokens/dist/tokens.css
		
		// Reemplazar rutas relativas ../ por la ruta relativa calculada
		content = content.replace(
			/href="\.\.\//g,
			`href="${relativePathToUBITS}/`
		);
		
		content = content.replace(
			/src="\.\.\//g,
			`src="${relativePathToUBITS}/`
		);
		
		// También ajustar rutas de assets que son relativas al mismo directorio
		// assets/fontawesome/... debe convertirse a ${relativePathToUBITS}/templates/assets/fontawesome/...
		content = content.replace(
			/href="assets\//g,
			`href="${relativePathToUBITS}/templates/assets/`
		);
		
		content = content.replace(
			/src="assets\//g,
			`src="${relativePathToUBITS}/templates/assets/`
		);
		
		// Ajustar rutas de imágenes en JavaScript (products.js)
		// 'assets/images/Profile-image.jpg' -> '${relativePathToUBITS}/templates/assets/images/Profile-image.jpg'
		content = content.replace(
			/'assets\/images\//g,
			`'${relativePathToUBITS}/templates/assets/images/`
		);
		
		content = content.replace(
			/"assets\/images\//g,
			`"${relativePathToUBITS}/templates/assets/images/`
		);
		
		// Ajustar rutas de scripts que son relativas al mismo directorio
		content = content.replace(
			/src="components-loader\.js/g,
			`src="${relativePathToUBITS}/templates/components-loader.js`
		);
		
		content = content.replace(
			/src="config\//g,
			`src="${relativePathToUBITS}/templates/config/`
		);
		
		content = content.replace(
			/src="engine\//g,
			`src="${relativePathToUBITS}/templates/engine/`
		);
		
		return content;
	}

	/**
	 * Genera HTML que carga el template desde Storybook
	 */
	private generateStorybookTemplateHTML(
		storybookUrl: string,
		template: 'administrador' | 'colaborador',
		module: string,
		product: string | undefined,
		templateConfig: any,
	): string {
		const moduleConfig = UBITS_MODULES_CONFIG[module];
		const productName = product
			? moduleConfig?.products.find((p) => p.id === product)?.name || product
			: '';
		const moduleName = moduleConfig?.name || this.formatModuleName(module);

		// Generar subnav HTML
		const subnavHTML = moduleConfig
			? this.generateSubNavHTML(moduleConfig, product)
			: '';

		return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UBITS - ${moduleName}${productName ? ` - ${productName}` : ''} - ${template}</title>
  
  <!-- Cargar template desde Storybook -->
  <script type="module">
    // Configuración
    window.UBITS_CONFIG = {
      template: '${template}',
      module: '${module}',
      product: '${product || ''}',
      moduleName: '${moduleName}',
      productName: '${productName || ''}',
      storybookUrl: '${UBITS_PRESET.storybook.url}',
      storybookStoryUrl: '${storybookUrl}'
    };
    
    // Cargar componentes desde Storybook
    const storybookBaseUrl = '${UBITS_PRESET.storybook.url}';
    const components = ${JSON.stringify(UBITS_PRESET.components)};
    
    async function loadComponents() {
      if (window.AUTORUN?.Components) {
        for (const component of components) {
          try {
            await window.AUTORUN.Components.loadFromStorybook({
              manifestUrl: \`\${storybookBaseUrl}/components/\${component}/manifest.json\`
            });
          } catch (error) {
            console.warn(\`Error cargando \${component}:\`, error);
          }
        }
      }
    }
    
    // Cargar template desde Storybook
    async function loadTemplateFromStorybook() {
      try {
        // Intentar cargar el template usando la API de Storybook o iframe
        const templateContainer = document.getElementById('storybook-template');
        
        if (templateContainer) {
          // Opción 1: Cargar como iframe (si Storybook lo permite)
          const iframe = document.createElement('iframe');
          iframe.src = '${storybookUrl}';
          iframe.style.width = '100%';
          iframe.style.height = '100vh';
          iframe.style.border = 'none';
          iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups');
          
          // Opción 2: Intentar cargar el HTML renderizado directamente
          // Esto requiere que Storybook exponga una API para obtener el HTML
          try {
            const response = await fetch('${storybookUrl}', {
              mode: 'cors',
              credentials: 'include'
            });
            
            if (response.ok) {
              const html = await response.text();
              // Extraer solo el contenido del template (sin el wrapper de Storybook)
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const templateContent = doc.querySelector('[data-testid="storybook-story"]') || 
                                     doc.querySelector('.sb-story') ||
                                     doc.body;
              
              if (templateContent) {
                templateContainer.innerHTML = templateContent.innerHTML;
                return;
              }
            }
          } catch (fetchError) {
            console.warn('No se pudo cargar template directamente, usando iframe:', fetchError);
          }
          
          // Fallback: usar iframe
          templateContainer.appendChild(iframe);
        }
      } catch (error) {
        console.error('Error cargando template desde Storybook:', error);
        // Mostrar mensaje de error
        const container = document.getElementById('storybook-template');
        if (container) {
          container.innerHTML = \`
            <div style="padding: 24px; text-align: center;">
              <h2>⚠️ No se pudo cargar el template desde Storybook</h2>
              <p>Por favor, abre el template manualmente:</p>
              <a href="${storybookUrl}" target="_blank" style="color: #0066cc; text-decoration: underline;">
                Abrir template en Storybook
              </a>
            </div>
          \`;
        }
      }
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        loadComponents();
        loadTemplateFromStorybook();
      });
    } else {
      loadComponents();
      loadTemplateFromStorybook();
    }
  </script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }
    
    .app-container {
      display: flex;
      height: 100vh;
    }
    
    .sidebar {
      width: 280px;
      background: #fff;
      border-right: 1px solid #e5e5e5;
      padding: 24px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .sub-nav-container {
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 24px;
    }
    
    .sub-nav {
      display: flex;
      align-items: center;
      height: 40px;
    }
    
    .nav-tabs {
      display: flex;
      gap: 8px;
    }
    
    .nav-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: #666;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .nav-tab:hover {
      color: #1a1a1a;
    }
    
    .nav-tab.active {
      color: #0066cc;
      border-bottom-color: #0066cc;
    }
    
    .nav-tab i {
      font-size: 14px;
    }
    
    .content-wrapper {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    
    #storybook-template {
      width: 100%;
      height: 100%;
      min-height: 600px;
    }
  </style>
</head>
<body data-template="${template}" data-module="${module}" data-product="${product || ''}">
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar" data-sidebar>
      <nav class="sidebar-nav">
        <h2 class="sidebar-title">UBITS</h2>
        <ul class="sidebar-menu">
          ${templateConfig.modules
						.map(
							(m: string) => `
            <li class="sidebar-item ${m === module ? 'active' : ''}" data-module="${m}">
              <a href="#${m}" class="sidebar-link">
                <span class="sidebar-icon">📦</span>
                <span class="sidebar-label">${this.formatModuleName(m)}</span>
              </a>
            </li>
          `,
						)
						.join('')}
        </ul>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
      ${subnavHTML ? `<div class="sub-nav-container" data-subnav>${subnavHTML}</div>` : ''}
      <div class="content-wrapper">
        <div id="storybook-template">
          <!-- El template de Storybook se cargará aquí -->
          <div style="padding: 24px; text-align: center;">
            <p>Cargando template desde Storybook...</p>
          </div>
        </div>
      </div>
    </main>
  </div>
  
  <script>
    // Inicializar feedback automatizado
    if (window.AUTORUN?.Feedback) {
      window.AUTORUN.Feedback.init({
        webhookUrl: '', // Configurar después
        storybookUrl: '${UBITS_PRESET.storybook.url}',
        useStorybookComponents: true,
        showFeedbackButton: true
      });
    }
    
    // Activar el módulo y producto en el sidebar y subnav
    document.addEventListener('DOMContentLoaded', () => {
      // Activar módulo en sidebar
      const moduleElement = document.querySelector(\`[data-module="${module}"]\`);
      if (moduleElement) {
        moduleElement.classList.add('active');
      }
      
      // Activar producto en subnav
      if ('${product}') {
        const productElement = document.querySelector(\`[data-product="${product}"]\`);
        if (productElement) {
          productElement.classList.add('active');
        }
      }
    });
  </script>
</body>
</html>`;
	}

	/**
	 * Personaliza el template cargado desde Storybook con el módulo y producto seleccionados
	 */
	private customizeTemplate(
		templateHtml: string,
		template: 'administrador' | 'colaborador',
		module: string,
		product?: string,
	): string {
		const moduleConfig = UBITS_MODULES_CONFIG[module];
		const productName = product
			? moduleConfig?.products.find((p) => p.id === product)?.name || product
			: '';
		const moduleName = moduleConfig?.name || this.formatModuleName(module);

		// Actualizar el título
		templateHtml = templateHtml.replace(
			/<title>.*?<\/title>/i,
			`<title>UBITS - ${moduleName}${productName ? ` - ${productName}` : ''} - ${template}</title>`,
		);

		// Agregar configuración del módulo y producto como atributos data
		const bodyMatch = templateHtml.match(/<body[^>]*>/i);
		if (bodyMatch) {
			templateHtml = templateHtml.replace(
				/<body[^>]*>/i,
				`<body data-template="${template}" data-module="${module}" data-product="${product || ''}">`,
			);
		}

		// Agregar script para configurar el módulo y producto activos
		const scriptTag = `
  <script>
    // Configuración del módulo y producto activos
    window.UBITS_CONFIG = {
      template: '${template}',
      module: '${module}',
      product: '${product || ''}',
      moduleName: '${moduleName}',
      productName: '${productName || ''}',
      storybookUrl: '${UBITS_PRESET.storybook.url}'
    };
    
    // Sobrescribir initialActiveSection en products.js para activar el módulo/producto seleccionado
    (function() {
      if (window.UBITS_PRODUCTS && window.UBITS_PRODUCTS['template-${template}']) {
        const productConfig = window.UBITS_PRODUCTS['template-${template}'];
        if (productConfig.sidebar) {
          // Establecer el módulo seleccionado como sección inicial
          productConfig.sidebar.initialActiveSection = '${module}';
        }
      }
    })();
    
    // Activar el módulo y producto en el sidebar y subnav después de que todo esté cargado
    document.addEventListener('DOMContentLoaded', () => {
      // Esperar a que UBITS_ContentManager y todos los componentes estén listos
      const activateModule = () => {
        if (window.UBITS_ContentManager && window.UBITS_ResponsiveManager) {
          try {
            // Establecer currentSection primero
            window.UBITS_ContentManager.currentSection = '${module}';
            
            // Para módulos con productos, activar el producto específico
            if ('${product}') {
              // Usar requestAnimationFrame para asegurar que el DOM esté listo
              requestAnimationFrame(() => {
                setTimeout(() => {
                  window.UBITS_ContentManager.handleSectionChange('${module}', '${product}');
                }, 100);
              });
            } else {
              // Para módulos sin productos, solo activar el módulo
              requestAnimationFrame(() => {
                setTimeout(() => {
                  window.UBITS_ContentManager.handleSectionChange('${module}');
                }, 100);
              });
            }
          } catch (error) {
            console.warn('No se pudo activar módulo automáticamente:', error);
          }
        } else {
          // Reintentar después de un breve delay
          setTimeout(activateModule, 100);
        }
      };
      
      // Esperar un poco más para que todos los scripts se carguen
      setTimeout(activateModule, 500);
    });
  </script>`;

		// Insertar script antes de </body>
		if (templateHtml.includes('</body>')) {
			templateHtml = templateHtml.replace('</body>', `${scriptTag}\n</body>`);
		} else {
			templateHtml += scriptTag;
		}

		return templateHtml;
	}

	/**
	 * Genera nombre de archivo para el lienzo
	 */
	private generateFileName(
		template: 'administrador' | 'colaborador',
		module: string,
		product?: string,
	): string {
		const timestamp = new Date().toISOString().split('T')[0];
		const productSuffix = product ? `-${product}` : '';
		return `canvas-${template}-${module}${productSuffix}-${timestamp}.html`;
	}

	/**
	 * Genera contenido del lienzo (fallback cuando no se puede cargar desde Storybook)
	 */
	private generateCanvasContent(
		template: 'administrador' | 'colaborador',
		module: string,
		templateConfig: any,
		product?: string,
	): string {
		const moduleConfig = UBITS_MODULES_CONFIG[module];
		const productName = product
			? moduleConfig?.products.find((p) => p.id === product)?.name || product
			: '';
		const moduleName = moduleConfig?.name || this.formatModuleName(module);
		
		// Generar subnav HTML
		const subnavHTML = moduleConfig
			? this.generateSubNavHTML(moduleConfig, product)
			: '';

		return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UBITS - ${moduleName}${productName ? ` - ${productName}` : ''} - ${template}</title>
  
  <!-- Componentes UBITS desde Storybook -->
  <script type="module">
    // Cargar componentes desde Storybook
    const storybookUrl = '${UBITS_PRESET.storybook.url}';
    const components = ${JSON.stringify(UBITS_PRESET.components)};
    
    async function loadComponents() {
      if (window.AUTORUN?.Components) {
        for (const component of components) {
          try {
            await window.AUTORUN.Components.loadFromStorybook({
              manifestUrl: \`\${storybookUrl}/components/\${component}/manifest.json\`
            });
          } catch (error) {
            console.warn(\`Error cargando \${component}:\`, error);
          }
        }
      }
    }
    
    loadComponents();
  </script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }
    
    .app-container {
      display: flex;
      height: 100vh;
    }
    
    .sidebar {
      width: 280px;
      background: #fff;
      border-right: 1px solid #e5e5e5;
      padding: 24px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .sub-nav-container {
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 24px;
    }
    
    .sub-nav {
      display: flex;
      align-items: center;
      height: 40px;
    }
    
    .nav-tabs {
      display: flex;
      gap: 8px;
    }
    
    .nav-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: #666;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .nav-tab:hover {
      color: #1a1a1a;
    }
    
    .nav-tab.active {
      color: #0066cc;
      border-bottom-color: #0066cc;
    }
    
    .nav-tab i {
      font-size: 14px;
    }
    
    .content-wrapper {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    
    .canvas-area {
      background: #fff;
      border-radius: 8px;
      padding: 32px;
      min-height: 100%;
    }
    
    .module-header {
      margin-bottom: 32px;
    }
    
    .module-title {
      font-size: 32px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }
    
    .module-description {
      font-size: 16px;
      color: #666;
    }
    
    .prototype-section {
      margin-bottom: 48px;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar" data-sidebar>
      <nav class="sidebar-nav">
        <h2 class="sidebar-title">UBITS</h2>
        <ul class="sidebar-menu">
          ${templateConfig.modules
						.map(
							(m: string) => `
            <li class="sidebar-item ${m === module ? 'active' : ''}" data-module="${m}">
              <a href="#${m}" class="sidebar-link">
                <span class="sidebar-icon">📦</span>
                <span class="sidebar-label">${this.formatModuleName(m)}</span>
              </a>
            </li>
          `,
						)
						.join('')}
        </ul>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
      ${subnavHTML ? `<div class="sub-nav-container" data-subnav>${subnavHTML}</div>` : ''}
      <div class="content-wrapper">
        <div class="canvas-area">
          <div class="module-header">
            <h1 class="module-title">${moduleName}${productName ? ` - ${productName}` : ''}</h1>
            <p class="module-description">Lienzo de prototipado - Template ${template}${productName ? ` - Producto: ${productName}` : ''}</p>
          </div>
        
        <!-- Aquí puedes prototipar tus funcionalidades -->
        <div class="prototype-section">
          <h2 class="section-title">Prototipo</h2>
          <p>Comienza a construir tu prototipo aquí usando los componentes de UBITS.</p>
          
          <!-- Ejemplo: Botón de feedback -->
          <div style="margin-top: 24px;">
            <!-- Los componentes se cargarán automáticamente desde Storybook -->
          </div>
        </div>
      </div>
      </div>
    </main>
  </div>
  
  <script>
    // Inicializar feedback automatizado
    if (window.AUTORUN?.Feedback) {
      window.AUTORUN.Feedback.init({
        webhookUrl: '', // Configurar después
        storybookUrl: '${UBITS_PRESET.storybook.url}',
        useStorybookComponents: true,
        showFeedbackButton: true
      });
    }
  </script>
</body>
</html>`;
	}

	/**
	 * Genera HTML del subnav
	 */
	private generateSubNavHTML(moduleConfig: any, activeProductId?: string): string {
		if (!moduleConfig?.products || moduleConfig.products.length === 0) {
			return '';
		}

		const tabs = moduleConfig.products
			.map(
				(product: any) => `
      <button 
        class="nav-tab ${product.id === activeProductId ? 'active' : ''}" 
        data-tab="${product.id}"
        data-product="${product.id}"
      >
        ${product.icon ? `<i class="${product.icon}"></i>` : ''}
        <span>${product.name}</span>
      </button>
    `,
			)
			.join('');

		return `
    <nav class="sub-nav" data-variant="${moduleConfig.subnavVariant}" data-module="${moduleConfig.id}">
      <div class="nav-tabs">
        ${tabs}
      </div>
    </nav>
    `;
	}

	/**
	 * Formatea el nombre del módulo
	 */
	private formatModuleName(module: string): string {
		return module
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
}

