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
	 * @param otherTemplatePath - Ruta del otro template para arreglar enlaces entre ellos
	 */
	async create(
		template: 'administrador' | 'colaborador',
		module: string,
		product?: string,
		otherTemplatePath?: string,
	): Promise<string> {
		const templateConfig = UBITS_PRESET.templates[template];
		const fileName = this.generateFileName(template, module, product);
		const filePath = path.join(this.projectPath, 'prototypes', fileName);

		// Crear directorio si no existe
		await fs.mkdir(path.dirname(filePath), { recursive: true });

		// Cargar template desde Storybook
		const content = await this.loadTemplateFromStorybook(template, module, product, otherTemplatePath);

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
		otherTemplatePath?: string,
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
			
			// Usar rutas absolutas file:// para que funcionen cuando se abre el HTML localmente
			const ubitsPackagesPath = path.join(os.homedir(), 'Desktop', 'UBITS', 'packages');
			const absolutePath = `file://${ubitsPackagesPath}`.replace(/\\/g, '/');
			
			// Ajustar rutas del template a rutas absolutas file://
			templateContent = await this.adjustTemplatePaths(templateContent, absolutePath);
			
			// Personalizar el template con el módulo y producto seleccionados
			// Esto agrega el script que activa el módulo/producto en sidebar y subnav
			templateContent = this.customizeTemplate(templateContent, template, module, product, absolutePath, otherTemplatePath);
			
			return templateContent;
		} catch (localError) {
			console.warn('⚠️  No se pudo cargar template desde UBITS local:', localError);
			console.warn(`   💡 Verifica que existe: ${ubitsDesktopPath}`);
			// Fallback a template generado localmente
			return this.generateCanvasContent(template, module, templateConfig, product);
		}
	}

	/**
	 * Ajusta las rutas del template para que funcionen con file:// absolutas
	 * Las rutas originales son relativas a packages/templates/ (../tokens/...)
	 * Las convertimos a rutas absolutas file:// hacia Desktop/UBITS/packages/
	 */
	private async adjustTemplatePaths(content: string, absolutePathToUBITS: string): Promise<string> {
		// Las rutas originales son: ../tokens/dist/tokens.css
		// Necesitamos: file:///Users/elkinmac/Desktop/UBITS/packages/tokens/dist/tokens.css
		
		// Reemplazar rutas relativas ../ por la ruta absoluta
		content = content.replace(
			/href="\.\.\//g,
			`href="${absolutePathToUBITS}/`
		);
		
		content = content.replace(
			/src="\.\.\//g,
			`src="${absolutePathToUBITS}/`
		);
		
		// También ajustar rutas de assets que son relativas al mismo directorio
		// assets/fontawesome/... debe convertirse a file:///Users/.../templates/assets/fontawesome/...
		content = content.replace(
			/href="assets\//g,
			`href="${absolutePathToUBITS}/templates/assets/`
		);
		
		content = content.replace(
			/src="assets\//g,
			`src="${absolutePathToUBITS}/templates/assets/`
		);
		
		// Ajustar rutas de imágenes en JavaScript (products.js)
		// 'assets/images/Profile-image.jpg' -> 'file:///Users/.../templates/assets/images/Profile-image.jpg'
		content = content.replace(
			/'assets\/images\//g,
			`'${absolutePathToUBITS}/templates/assets/images/`
		);
		
		content = content.replace(
			/"assets\/images\//g,
			`"${absolutePathToUBITS}/templates/assets/images/`
		);
		
		// Ajustar rutas de scripts que son relativas al mismo directorio
		content = content.replace(
			/src="components-loader\.js/g,
			`src="${absolutePathToUBITS}/templates/components-loader.js`
		);
		
		content = content.replace(
			/src="config\//g,
			`src="${absolutePathToUBITS}/templates/config/`
		);
		
		content = content.replace(
			/src="engine\//g,
			`src="${absolutePathToUBITS}/templates/engine/`
		);
		
		// NOTA: Los enlaces entre templates (template-admin.html <-> template-colaborador.html)
		// se arreglan después de crear ambos templates en InitializationWizard.ts
		// para poder usar los nombres reales de los archivos generados
		
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
		absolutePathToUBITS?: string,
		otherTemplatePath?: string,
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
		// Este script debe ejecutarse ANTES de que el template se inicialice
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
    
    // Ajustar rutas de imágenes y sobrescribir initialActiveSection después de que products.js se cargue
    (function() {
      const adjustImagePaths = (products) => {
        if (!products) return;
        // absolutePathToUBITS ya incluye file:///Users/.../UBITS/packages
        const ubitsTemplatesPath = '${absolutePathToUBITS || 'file:///Users/elkinmac/Desktop/UBITS/packages'}/templates';
        
        // Función recursiva para ajustar rutas en objetos
        const adjustPaths = (obj) => {
          if (typeof obj !== 'object' || obj === null) return;
          
          for (const key in obj) {
            if (key === 'avatarImage' || key === 'logoImage' || key === 'avatar') {
              // Ajustar rutas de imágenes
              if (typeof obj[key] === 'string' && obj[key].startsWith('assets/')) {
                obj[key] = ubitsTemplatesPath + '/' + obj[key];
              }
            } else if (Array.isArray(obj[key])) {
              // Recorrer arrays
              obj[key].forEach(item => adjustPaths(item));
            } else {
              // Recorrer objetos anidados
              adjustPaths(obj[key]);
            }
          }
        };
        
        adjustPaths(products);
      };
      
      // La clave en products.js es 'template-admin' o 'template-colaborador'
      const templateKey = '${template === 'administrador' ? 'template-admin' : 'template-colaborador'}';
      
      // Sobrescribir detectCurrentProduct ANTES de que products.js se cargue
      // detectCurrentProduct() detecta por nombre de archivo y por defecto retorna 'template-colaborador'
      // Necesitamos sobrescribirlo para que siempre retorne el template correcto
      window.detectCurrentProduct = function() {
        // Siempre retornar el template correcto
        return templateKey;
      };
      
      // Interceptar cuando UBITS_PRODUCTS se define ANTES de que el template lo use
      let productsDefined = false;
      const checkProducts = () => {
        if (window.UBITS_PRODUCTS && !productsDefined) {
          productsDefined = true;
          console.log('🔍 [Wizard] ════════════════════════════════════════');
          console.log('🔍 [Wizard] UBITS_PRODUCTS detectado');
          console.log('🔍 [Wizard] templateKey:', templateKey);
          console.log('🔍 [Wizard] Módulo objetivo: ${module}');
          console.log('🔍 [Wizard] Producto objetivo: ${product}');
          
          // Ajustar rutas de imágenes
          adjustImagePaths(window.UBITS_PRODUCTS);
          
          // Sobrescribir initialActiveSection INMEDIATAMENTE
          if (window.UBITS_PRODUCTS[templateKey]) {
            const productConfig = window.UBITS_PRODUCTS[templateKey];
            console.log('🔍 [Wizard] ProductConfig encontrado:', productConfig.name);
            console.log('🔍 [Wizard] initialActiveSection ANTES:', productConfig.sidebar?.initialActiveSection);
            
            if (productConfig.sidebar) {
              // Normalizar nombre del módulo: 'desempeno' -> 'desempeño' (con tilde)
              // El ContentManager espera 'desempeño' con tilde para encontrar el SubNav correcto
              const normalizedModule = '${module}' === 'desempeno' ? 'desempeño' : '${module}';
              productConfig.sidebar.initialActiveSection = normalizedModule;
              console.log('🔍 [Wizard] ✅ initialActiveSection sobrescrito a:', normalizedModule);
              console.log('🔍 [Wizard] initialActiveSection DESPUÉS:', productConfig.sidebar.initialActiveSection);
            } else {
              console.warn('🔍 [Wizard] ⚠️ productConfig.sidebar no existe');
            }
          } else {
            console.warn('🔍 [Wizard] ⚠️ templateKey no encontrado en UBITS_PRODUCTS');
            console.log('🔍 [Wizard] Claves disponibles:', Object.keys(window.UBITS_PRODUCTS));
          }
        }
      };
      
      // Verificar INMEDIATAMENTE (puede que ya esté definido)
      checkProducts();
      
      // Verificar periódicamente con intervalo más corto
      const interval = setInterval(() => {
        checkProducts();
        if (productsDefined) {
          clearInterval(interval);
        }
      }, 10);
      
      // Limpiar después de 2 segundos
      setTimeout(() => clearInterval(interval), 2000);
    })();
    
    // Activar el producto DESPUÉS de que el template termine su inicialización
    // El template ya activa el módulo usando initialActiveSection, solo necesitamos activar el producto
    document.addEventListener('DOMContentLoaded', () => {
      console.log('🔍 [Wizard] ════════════════════════════════════════');
      console.log('🔍 [Wizard] DOMContentLoaded - Iniciando activación de módulo/producto');
      console.log('🔍 [Wizard] Módulo objetivo: ${module}');
      console.log('🔍 [Wizard] Producto objetivo: ${product}');
      
      const activateProduct = () => {
        console.log('🔍 [Wizard] ════════════════════════════════════════');
        console.log('🔍 [Wizard] activateProduct ejecutado');
        
        if (!window.UBITS_ContentManager) {
          console.log('🔍 [Wizard] ⏳ ContentManager no está listo, reintentando...');
          setTimeout(activateProduct, 100);
          return;
        }
        
        console.log('🔍 [Wizard] ✅ ContentManager está listo');
        console.log('🔍 [Wizard] currentSection actual:', window.UBITS_ContentManager.currentSection);
        console.log('🔍 [Wizard] Módulo esperado: ${module}');
        
        // Verificar estado del sidebar
        const sidebarElement = document.querySelector('.ubits-sidebar');
        if (sidebarElement) {
          const activeButton = sidebarElement.querySelector('.ubits-sidebar-nav-button.active');
          console.log('🔍 [Wizard] Sidebar encontrado');
          console.log('🔍 [Wizard] Botón activo en sidebar:', activeButton?.getAttribute('data-section') || 'ninguno');
          
          // Listar todos los botones del sidebar
          const allButtons = sidebarElement.querySelectorAll('.ubits-sidebar-nav-button');
          console.log('🔍 [Wizard] Botones en sidebar:');
          allButtons.forEach(btn => {
            const section = btn.getAttribute('data-section');
            const isActive = btn.classList.contains('active');
            console.log('   -', section, isActive ? '(ACTIVO)' : '(inactivo)');
          });
        } else {
          console.warn('🔍 [Wizard] ⚠️ Sidebar no encontrado');
        }
        
        // Verificar estado del subnav
        const subNavElement = document.querySelector('.ubits-sub-nav');
        if (subNavElement) {
          console.log('🔍 [Wizard] SubNav encontrado');
          const activeTab = subNavElement.querySelector('.ubits-sub-nav-tab--active');
          console.log('🔍 [Wizard] Tab activo en SubNav:', activeTab?.getAttribute('data-tab') || 'ninguno');
          
          // Listar todos los tabs del subnav
          const allTabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
          console.log('🔍 [Wizard] Tabs en SubNav:');
          allTabs.forEach(tab => {
            const tabId = tab.getAttribute('data-tab');
            const isActive = tab.classList.contains('ubits-sub-nav-tab--active');
            console.log('   -', tabId, isActive ? '(ACTIVO)' : '(inactivo)');
          });
        } else {
          console.log('🔍 [Wizard] SubNav no encontrado (puede ser normal si el módulo no tiene subnav)');
        }
        
        try {
          // Normalizar nombre del módulo: 'desempeno' -> 'desempeño' (con tilde)
          // El ContentManager espera 'desempeño' con tilde para encontrar el SubNav correcto
          const normalizedModule = '${module}' === 'desempeno' ? 'desempeño' : '${module}';
          
          // Esperar a que el template termine su inicialización completa
          // El template usa setTimeout de ~1500ms + requestAnimationFrame
          // Verificar que el módulo ya esté activo (gracias a initialActiveSection)
          if (window.UBITS_ContentManager.currentSection === normalizedModule) {
            console.log('🔍 [Wizard] ✅ Módulo ya está activo:', normalizedModule);
            
            // Si hay un producto, activarlo usando handleSectionChange con activeTabId
            // Esto actualizará el SubNav y el contenido automáticamente
            if ('${product}') {
              console.log('🔍 [Wizard] 🚀 Activando producto: ${product}');
              console.log('🔍 [Wizard] Llamando handleSectionChange("' + normalizedModule + '", "${product}")');
              
              // handleSectionChange con activeTabId activa el módulo y el producto en una sola llamada
              window.UBITS_ContentManager.handleSectionChange(normalizedModule, '${product}');
              
              // Mapeo de productos a IDs de tabs del SubNav
              // Algunos productos tienen IDs diferentes en el SubNav
              const productToTabIdMap = {
                // Aprendizaje
                'inicio': 'home',
                'catalogo': 'catalog',
                'corporativa': 'corporate',
                'zona-estudio': 'study-zone',
                // Desempeño
                'evaluations': 'evaluations',
                'evaluaciones-360': 'evaluations',
                'objectives': 'objectives',
                'objetivos': 'objectives',
                'matriz-talento': 'matriz-talento',
                // Empresa
                'gestion-usuarios': 'gestion-usuarios',
                'organigrama': 'organigrama',
                'datos-empresa': 'datos-empresa',
                'personalizacion': 'personalizacion',
                'roles-permisos': 'roles-permisos',
                'comunicaciones': 'comunicaciones'
              };
              
              // Obtener el ID del tab correcto
              const tabId = productToTabIdMap['${product}'] || '${product}';
              console.log('🔍 [Wizard] [SubNav] Producto original: ${product}');
              console.log('🔍 [Wizard] [SubNav] Tab ID mapeado:', tabId);
              
              // Forzar activación del tab en el SubNav después de que se actualice el contenido
              // Esto es necesario porque el SubNav puede ya existir y no recargarse
              // Usar múltiples intentos porque el SubNav puede tardar en renderizarse
              let attempts = 0;
              const maxAttempts = 15;
              const activateTab = () => {
                attempts++;
                console.log('🔍 [Wizard] ════════════════════════════════════════');
                console.log('🔍 [Wizard] [SubNav] Intento', attempts, 'de activar tab en SubNav...');
                console.log('🔍 [Wizard] [SubNav] Producto objetivo: ${product}');
                console.log('🔍 [Wizard] [SubNav] Tab ID a buscar:', tabId);
                
                // Buscar el SubNav de múltiples formas
                let subNavElement = document.querySelector('.ubits-sub-nav');
                if (!subNavElement) {
                  subNavElement = document.querySelector('#top-nav-container .ubits-sub-nav');
                }
                if (!subNavElement) {
                  subNavElement = document.querySelector('[data-subnav] .ubits-sub-nav');
                }
                if (!subNavElement) {
                  const topNavContainer = document.querySelector('#top-nav-container');
                  if (topNavContainer) {
                    subNavElement = topNavContainer.querySelector('.ubits-sub-nav');
                  }
                }
                
                console.log('🔍 [Wizard] [SubNav] SubNav encontrado:', !!subNavElement);
                
                if (subNavElement) {
                  console.log('🔍 [Wizard] [SubNav] SubNav HTML:', subNavElement.outerHTML.substring(0, 500));
                  
                  // Listar todos los tabs disponibles para debug
                  const allTabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
                  console.log('🔍 [Wizard] [SubNav] Tabs encontrados:', allTabs.length);
                  
                  if (allTabs.length === 0) {
                    console.warn('🔍 [Wizard] [SubNav] ⚠️ No se encontraron tabs con selector .ubits-sub-nav-tab');
                    // Intentar otros selectores
                    const altTabs = subNavElement.querySelectorAll('[data-tab]');
                    console.log('🔍 [Wizard] [SubNav] Tabs con [data-tab]:', altTabs.length);
                    altTabs.forEach((tab, idx) => {
                      console.log('   Tab', idx + ':', {
                        dataTab: tab.getAttribute('data-tab'),
                        classes: tab.className,
                        text: tab.textContent?.trim()?.substring(0, 50)
                      });
                    });
                  } else {
                    console.log('🔍 [Wizard] [SubNav] Tabs disponibles:');
                    Array.from(allTabs).forEach((tab, idx) => {
                      const dataTab = tab.getAttribute('data-tab');
                      const text = tab.textContent?.trim();
                      const isActive = tab.classList.contains('ubits-sub-nav-tab--active');
                      console.log('   Tab', idx + ':', {
                        dataTab: dataTab,
                        text: text,
                        isActive: isActive,
                        classes: tab.className,
                        innerHTML: tab.innerHTML.substring(0, 100)
                      });
                    });
                    
                    // Remover active de todos los tabs
                    console.log('🔍 [Wizard] [SubNav] Removiendo active de todos los tabs...');
                    allTabs.forEach(tab => {
                      tab.classList.remove('ubits-sub-nav-tab--active');
                    });
                    
                    // Activar el tab correspondiente al producto
                    // Primero intentar con el tabId mapeado
                    console.log('🔍 [Wizard] [SubNav] Buscando tab con data-tab="' + tabId + '"...');
                    let targetTab = subNavElement.querySelector('[data-tab="' + tabId + '"]');
                    
                    // Si no se encuentra, intentar con el producto original
                    if (!targetTab) {
                      console.log('🔍 [Wizard] [SubNav] Tab no encontrado con tabId mapeado, intentando con producto original...');
                      targetTab = subNavElement.querySelector('[data-tab="${product}"]');
                    }
                    
                    // Si aún no se encuentra, intentar buscar por texto
                    if (!targetTab) {
                      console.log('🔍 [Wizard] [SubNav] Tab no encontrado por data-tab, buscando por texto...');
                      const productText = '${product}'.toLowerCase();
                      Array.from(allTabs).forEach(tab => {
                        const text = tab.textContent?.trim().toLowerCase();
                        // Buscar coincidencias parciales
                        if (text.includes(productText) || productText.includes(text) || 
                            (productText.includes('inicio') && text.includes('inicio')) ||
                            (productText.includes('matriz') && text.includes('matriz')) ||
                            (productText.includes('talento') && text.includes('talento'))) {
                          console.log('🔍 [Wizard] [SubNav] Tab encontrado por texto:', text);
                          targetTab = tab;
                        }
                      });
                    }
                    
                    if (targetTab) {
                      console.log('🔍 [Wizard] [SubNav] ✅ Tab encontrado:', {
                        dataTab: targetTab.getAttribute('data-tab'),
                        text: targetTab.textContent?.trim(),
                        classes: targetTab.className
                      });
                      targetTab.classList.add('ubits-sub-nav-tab--active');
                      console.log('🔍 [Wizard] [SubNav] ✅ Clase ubits-sub-nav-tab--active agregada');
                      
                      // Verificar que se agregó correctamente
                      const hasActive = targetTab.classList.contains('ubits-sub-nav-tab--active');
                      console.log('🔍 [Wizard] [SubNav] Verificación - tiene clase active:', hasActive);
                      
                      // Verificar estado final
                      const activeTab = document.querySelector('.ubits-sub-nav-tab--active');
                      console.log('🔍 [Wizard] [SubNav] Tab activo confirmado:', {
                        dataTab: activeTab?.getAttribute('data-tab') || 'ninguno',
                        text: activeTab?.textContent?.trim() || 'ninguno',
                        element: activeTab ? 'encontrado' : 'no encontrado'
                      });
                      return true; // Éxito
                    } else {
                      console.warn('🔍 [Wizard] [SubNav] ⚠️ Tab "${product}" no encontrado en SubNav');
                      console.warn('🔍 [Wizard] [SubNav] Producto buscado:', '${product}');
                      if (attempts < maxAttempts) {
                        console.log('🔍 [Wizard] [SubNav] Reintentando en 200ms...');
                        setTimeout(activateTab, 200);
                      } else {
                        console.error('🔍 [Wizard] [SubNav] ❌ Máximo de intentos alcanzado');
                      }
                      return false;
                    }
                  }
                } else {
                  console.warn('🔍 [Wizard] [SubNav] ⚠️ SubNav no encontrado, reintentando...');
                  if (attempts < maxAttempts) {
                    setTimeout(activateTab, 200);
                  } else {
                    console.error('🔍 [Wizard] [SubNav] ❌ Máximo de intentos alcanzado sin encontrar SubNav');
                  }
                  return false;
                }
              };
              
              // Iniciar después de que updateContent termine
              console.log('🔍 [Wizard] [SubNav] Programando activación del tab en 300ms...');
              setTimeout(activateTab, 300);
            } else {
              console.log('🔍 [Wizard] No hay producto para activar');
            }
          } else {
            console.log('🔍 [Wizard] ⏳ Módulo aún no está activo, esperando...');
            console.log('🔍 [Wizard] currentSection:', window.UBITS_ContentManager.currentSection);
            console.log('🔍 [Wizard] Esperado:', normalizedModule);
            // Si el módulo aún no está activo, esperar un poco más
            setTimeout(activateProduct, 200);
          }
        } catch (error) {
          console.error('🔍 [Wizard] ❌ Error al activar producto:', error);
          console.error('🔍 [Wizard] Stack:', error.stack);
        }
      };
      
      // Esperar a que el template termine su inicialización (el template usa setTimeout de ~1500ms)
      console.log('🔍 [Wizard] ⏳ Esperando 2500ms para que el template termine su inicialización...');
      setTimeout(() => {
        console.log('🔍 [Wizard] ⏰ Timeout completado, ejecutando activateProduct...');
        activateProduct();
      }, 2500);
    });
    
    // Interceptar llamadas a handleSectionChange para ver qué está pasando
    const originalHandleSectionChange = window.UBITS_ContentManager?.handleSectionChange;
    if (originalHandleSectionChange) {
      window.UBITS_ContentManager.handleSectionChange = function(section, activeTabId) {
        console.log('🔍 [Wizard] ════════════════════════════════════════');
        console.log('🔍 [Wizard] 🔄 handleSectionChange INTERCEPTADO');
        console.log('🔍 [Wizard] section:', section);
        console.log('🔍 [Wizard] activeTabId:', activeTabId);
        console.log('🔍 [Wizard] currentSection antes:', this.currentSection);
        return originalHandleSectionChange.call(this, section, activeTabId);
      };
    } else {
      // Si ContentManager aún no existe, interceptarlo cuando se cree
      Object.defineProperty(window, 'UBITS_ContentManager', {
        set: function(value) {
          console.log('🔍 [Wizard] UBITS_ContentManager definido');
          if (value && value.handleSectionChange) {
            const original = value.handleSectionChange;
            value.handleSectionChange = function(section, activeTabId) {
              console.log('🔍 [Wizard] ════════════════════════════════════════');
              console.log('🔍 [Wizard] 🔄 handleSectionChange INTERCEPTADO (desde setter)');
              console.log('🔍 [Wizard] section:', section);
              console.log('🔍 [Wizard] activeTabId:', activeTabId);
              console.log('🔍 [Wizard] currentSection antes:', this.currentSection);
              return original.call(this, section, activeTabId);
            };
          }
          Object.defineProperty(window, 'UBITS_ContentManager', { value, writable: true, configurable: true });
        },
        get: function() {
          return window._UBITS_ContentManager;
        },
        configurable: true
      });
    }
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

