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
	 * Crea un lienzo/template nuevo
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

		// Generar contenido del lienzo
		const content = this.generateCanvasContent(template, module, templateConfig, product);

		// Escribir archivo
		await fs.writeFile(filePath, content, 'utf-8');

		console.log(`✅ Lienzo creado: ${filePath}`);

		return filePath;
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
	 * Genera contenido del lienzo
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

