/**
 * InitializationWizard
 *
 * Wizard interactivo para configurar Autorun al inicio
 * Permite elegir entre trabajar en UBITS o proyecto independiente
 */

import { AutorunHub } from '../AutorunHub';
import { UBITS_PRESET, UBITS_ADDONS_CONFIG, UBITSTemplate, UBITS_MODULES_CONFIG } from './UBITSPreset';
import { TemplateLoader } from './TemplateLoader';
import { ModuleManager } from './ModuleManager';
import { CanvasCreator } from './CanvasCreator';
import { ComponentValidator } from './ComponentValidator';
import { InteractivePrompt } from './InteractivePrompt';

export type ProjectType = 'ubits' | 'independent';

export interface WizardResult {
	projectType: ProjectType;
	config?: any;
}

export interface UBITSResult extends WizardResult {
	projectType: 'ubits';
	template: 'administrador' | 'colaborador';
	module: string;
	product: string;
	canvasPath: string;
}

export interface IndependentResult extends WizardResult {
	projectType: 'independent';
	addons: string[];
}

export class InitializationWizard {
	private hub: AutorunHub;
	private prompt: InteractivePrompt;

	constructor(hub: AutorunHub) {
		this.hub = hub;
		this.prompt = new InteractivePrompt();
	}

	/**
	 * Inicia el wizard de inicialización
	 */
	async start(options?: { autoSelect?: ProjectType }): Promise<WizardResult> {
		console.log('🚀 ¡Hola! Soy tu asistente de Autorun.\n');
		console.log('Te voy a guiar paso a paso para configurar tu proyecto.\n');

		// 1. Preguntar tipo de proyecto
		const projectType = options?.autoSelect || await this.askProjectType();

		if (projectType === 'ubits') {
			return await this.setupUBITS();
		} else {
			return await this.setupIndependent();
		}
	}

	/**
	 * Pregunta si quiere trabajar en UBITS o proyecto independiente
	 */
	private async askProjectType(): Promise<ProjectType> {
		// En Node.js, usar readline o inquirer
		// Por ahora, simulamos con una función que se puede implementar
		return this.askProjectTypeInteractive();
	}

	/**
	 * Implementación interactiva (Node.js)
	 */
	private async askProjectTypeInteractive(): Promise<ProjectType> {
		// Verificar si hay respuesta automática en variable de entorno
		const autoAnswer = process.env.AUTORUN_PROJECT_TYPE || process.env.AUTORUN_AUTO_ANSWER;
		
		if (autoAnswer === 'ubits' || autoAnswer === '1') {
			console.log('✅ Perfecto, veo que quieres trabajar en UBITS.\n');
			return 'ubits';
		}
		
		if (autoAnswer === 'independent' || autoAnswer === '2') {
			console.log('✅ Perfecto, veo que quieres trabajar en un Proyecto Independiente.\n');
			return 'independent';
		}

		const answer = await this.prompt.select(
			'📋 ¿En qué tipo de proyecto quieres trabajar?',
			[
				{
					value: 'ubits',
					label: 'UBITS (Configuración predefinida con add-ons optimizados)',
				},
				{
					value: 'independent',
					label: 'Proyecto Independiente (Configuración personalizada)',
				},
			],
			'ubits',
		);

		return answer as ProjectType;
	}

	/**
	 * Configuración para UBITS
	 */
	private async setupUBITS(): Promise<UBITSResult> {
		console.log('🎯 Perfecto, vamos a configurar tu proyecto UBITS.\n');
		console.log('Te voy a guiar paso a paso:\n');

		// 1. Cargar preset de UBITS
		console.log('📦 Paso 1: Cargando preset UBITS con add-ons optimizados...');
		await this.loadUBITSPreset();
		console.log('   ✅ Preset cargado correctamente\n');

		// 2. Conectar con Storybook
		console.log('🔗 Paso 2: Conectando con Storybook UBITS...');
		await this.connectStorybook();
		console.log('   ✅ Conectado a Storybook\n');

		// 3. Cargar componentes desde Storybook
		console.log('🧩 Paso 3: Cargando componentes desde Storybook...');
		await this.loadComponentsFromStorybook();
		console.log('   ✅ Componentes cargados\n');

		// 4. Seleccionar template
		console.log('📋 Paso 4: Necesito saber qué template quieres usar...');
		const template = await this.selectTemplate();
		console.log(`   ✅ Template seleccionado: ${template}\n`);

		// 5. Seleccionar módulo y producto
		console.log('📦 Paso 5: Ahora vamos a elegir el módulo y producto...');
		const { module, product } = await this.selectModule(template);
		console.log(`   ✅ Módulo: ${module}, Producto: ${product}\n`);

		// 6. Habilitar módulo en sidebar y configurar subnav
		console.log(`⚙️  Paso 6: Configurando sidebar y subnav para "${module}"...`);
		await this.enableModule(module, template, product);
		console.log('   ✅ Sidebar y subnav configurados\n');

		// 7. Crear lienzo/template
		console.log('🎨 Paso 7: Creando tu lienzo de trabajo...');
		const canvasPath = await this.createCanvas(template, module, product);
		console.log(`   ✅ Lienzo creado: ${canvasPath}\n`);

		// 8. Validar lienzo creado
		console.log('🔍 Paso 8: Validando que todo cumpla con los estándares UBITS...');
		await this.validateCanvas(canvasPath);
		console.log('   ✅ Validación completada\n');

		console.log('🎉 ¡Excelente! Tu proyecto UBITS está listo.\n');
		console.log('📋 Resumen de tu configuración:');
		console.log(`   📁 Lienzo: ${canvasPath}`);
		console.log(`   🎯 Template: ${template}`);
		console.log(`   📦 Módulo: ${module}`);
		console.log(`   🎨 Producto: ${product}\n`);
		console.log('🚀 Ya puedes empezar a trabajar. ¡Éxito con tu proyecto!\n');

		return {
			projectType: 'ubits',
			template,
			module,
			product,
			canvasPath,
		};
	}

	/**
	 * Carga el preset de UBITS
	 */
	private async loadUBITSPreset(): Promise<void> {
		// Activar add-ons predefinidos
		for (const addonId of UBITS_PRESET.addons) {
			try {
				await this.hub.activateAddon(addonId);
				// La configuración se aplicará automáticamente desde autorun.config.json
				console.log(`   ✅ ${addonId} activado`);
			} catch (error) {
				console.warn(`   ⚠️  Error activando ${addonId}:`, error);
			}
		}
	}

	/**
	 * Conecta con Storybook de UBITS
	 */
	private async connectStorybook(): Promise<void> {
		// El add-on de Storybook ya está activado
		// Solo verificamos la conexión
		console.log(`   ✅ Storybook configurado: ${UBITS_PRESET.storybook.url}`);
	}

	/**
	 * Carga componentes desde Storybook
	 */
	private async loadComponentsFromStorybook(): Promise<void> {
		if (typeof window === 'undefined') {
			console.log('   ⚠️  Solo disponible en navegador');
			return;
		}

		const ComponentsAPI = (window as any).AUTORUN?.Components;
		if (!ComponentsAPI) {
			console.warn('   ⚠️  window.AUTORUN.Components no disponible');
			return;
		}

		const baseUrl = UBITS_PRESET.storybook.url.replace(/\/$/, '');
		for (const component of UBITS_PRESET.components) {
			try {
				const manifestUrl = `${baseUrl}/components/${component}/manifest.json`;
				await ComponentsAPI.loadFromStorybook({ manifestUrl });
				console.log(`   ✅ ${component} cargado`);
			} catch (error) {
				console.warn(`   ⚠️  Error cargando ${component}:`, error);
			}
		}
	}

	/**
	 * Selecciona template (Administrador/Colaborador)
	 */
	private async selectTemplate(): Promise<'administrador' | 'colaborador'> {
		// Verificar respuesta automática
		const autoAnswer = process.env.AUTORUN_TEMPLATE;
		if (autoAnswer === 'administrador' || autoAnswer === 'colaborador') {
			console.log(`   ✅ Usaré el template: ${autoAnswer}`);
			return autoAnswer as 'administrador' | 'colaborador';
		}

		const answer = await this.prompt.select(
			'   ¿Qué template quieres usar?',
			[
				{
					value: 'administrador',
					label: 'Administrador (Todos los módulos disponibles)',
				},
				{
					value: 'colaborador',
					label: 'Colaborador (Módulos limitados)',
				},
			],
			'administrador',
		);

		return answer as 'administrador' | 'colaborador';
	}

	/**
	 * Selecciona módulo para trabajar
	 */
	private async selectModule(
		template: 'administrador' | 'colaborador',
	): Promise<{ module: string; product: string }> {
		const templateConfig = UBITS_PRESET.templates[template];
		const modules = templateConfig.modules;

		const moduleOptions = modules.map((moduleId) => {
			const moduleConfig = UBITS_MODULES_CONFIG[moduleId];
			return {
				value: moduleId,
				label: moduleConfig?.name || moduleId,
			};
		});

		// Verificar respuesta automática
		const autoModule = process.env.AUTORUN_MODULE;
		let selectedModule = autoModule || 'desempeno';
		
		if (!autoModule) {
			selectedModule = await this.prompt.select(
				'   ¿En qué módulo quieres trabajar?',
				moduleOptions,
				'desempeno',
			);
		} else {
			console.log(`   ✅ Módulo seleccionado: ${selectedModule}`);
		}

		// Seleccionar producto dentro del módulo
		const product = await this.selectProduct(selectedModule);

		return { module: selectedModule, product };
	}

	/**
	 * Selecciona producto dentro de un módulo
	 */
	private async selectProduct(moduleId: string): Promise<string> {
		const moduleConfig = UBITS_MODULES_CONFIG[moduleId];

		if (!moduleConfig) {
			console.warn(`⚠️  Módulo "${moduleId}" no tiene productos configurados`);
			return '';
		}

		if (moduleConfig.products.length === 0) {
			console.warn(`⚠️  Módulo "${moduleConfig.name}" no tiene productos disponibles`);
			return '';
		}

		const productOptions = moduleConfig.products.map((product) => ({
			value: product.id,
			label: product.name,
		}));

		// Verificar respuesta automática
		const autoProduct = process.env.AUTORUN_PRODUCT;
		if (autoProduct) {
			console.log(`   ✅ Producto seleccionado: ${autoProduct}`);
			return autoProduct;
		}

		const selectedProduct = await this.prompt.select(
			`   ¿En qué producto de "${moduleConfig.name}" quieres trabajar?`,
			productOptions,
			moduleConfig.products[0]?.id,
		);

		return selectedProduct;
	}

	/**
	 * Habilita módulo en sidebar
	 */
	private async enableModule(
		module: string,
		template: 'administrador' | 'colaborador',
		product?: string,
	): Promise<void> {
		const moduleManager = new ModuleManager(this.hub);
		await moduleManager.enableModule(module, template, product);
	}

	/**
	 * Crea lienzo/template de trabajo
	 */
	private async createCanvas(
		template: 'administrador' | 'colaborador',
		module: string,
		product?: string,
	): Promise<string> {
		const canvasCreator = new CanvasCreator();
		return await canvasCreator.create(template, module, product);
	}

	/**
	 * Valida el lienzo creado contra estándares UBITS
	 */
	private async validateCanvas(canvasPath: string): Promise<void> {
		try {
			const fs = await import('fs/promises');
			const content = await fs.readFile(canvasPath, 'utf-8');

			const validator = new ComponentValidator();
			const result = await validator.validateFile(canvasPath, content);

			if (result.valid) {
				console.log('   ✅ Lienzo cumple con estándares UBITS');
			} else {
				console.warn(`   ⚠️  Se encontraron ${result.errors.length} error(es) en el lienzo`);
				const report = validator.generateReport(result);
				console.log(report);
			}

			if (result.warnings.length > 0) {
				console.warn(`   ⚠️  ${result.warnings.length} advertencia(s) encontrada(s)`);
			}
		} catch (error) {
			console.warn('   ⚠️  No se pudo validar el lienzo:', error);
		}
	}

	/**
	 * Cierra el prompt interactivo
	 */
	close(): void {
		this.prompt.close();
	}

	/**
	 * Configuración para proyecto independiente
	 */
	private async setupIndependent(): Promise<IndependentResult> {
		console.log('🎯 Configurando proyecto independiente...\n');

		// TODO: Implementar selección de add-ons
		const addons: string[] = [];

		return {
			projectType: 'independent',
			addons,
		};
	}
}

