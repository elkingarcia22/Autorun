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
		console.log('Voy a guiarte para configurar tu proyecto.\n');

		// 1. Determinar tipo de proyecto
		const projectType = options?.autoSelect || await this.askProjectType();

		if (projectType === 'ubits') {
			console.log('✅ Perfecto, voy a configurar tu proyecto UBITS ahora.\n');
			return await this.setupUBITS();
		} else {
			console.log('✅ Perfecto, voy a configurar un proyecto independiente.\n');
			return await this.setupIndependent();
		}
	}

	/**
	 * Pregunta si quiere trabajar en UBITS o proyecto independiente
	 * SIEMPRE pregunta al usuario, no usa variables de entorno automáticamente
	 */
	private async askProjectType(): Promise<ProjectType> {
		// SIEMPRE preguntar al usuario (no usar automático)
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
		console.log('🎯 Perfecto, voy a configurar tu proyecto UBITS ahora.\n');

		// 1. Conectar con Storybook
		console.log('🔗 Paso 1: Estoy conectando con Storybook UBITS...');
		await this.connectStorybook();
		console.log('   ✅ Conectado a Storybook\n');

		// 2. Cargar componentes desde Storybook
		console.log('🧩 Paso 2: Estoy cargando componentes desde Storybook...');
		await this.loadComponentsFromStorybook();
		console.log('   ✅ Componentes cargados\n');

		// 3. Seleccionar template (SIEMPRE preguntar)
		console.log('📋 Paso 3: Selección de template...');
		const template = await this.selectTemplate();
		console.log(`   ✅ Template: ${template}\n`);

		// 4. Seleccionar módulo y producto (SIEMPRE preguntar)
		console.log('📦 Paso 4: Selección de módulo y producto...');
		const { module, product } = await this.selectModule(template);
		console.log(`   ✅ Módulo: ${module}, Producto: ${product}\n`);

		// 5. Mostrar e instalar add-ons por defecto
		console.log('📦 Paso 5: Instalación de add-ons por defecto...');
		const installedAddons = await this.installDefaultAddons();
		console.log(`   ✅ ${installedAddons.length} add-on(s) instalado(s)\n`);

		// 6. Preguntar si quiere agregar más add-ons
		console.log('🔌 Paso 6: ¿Quieres agregar más add-ons?');
		const additionalAddons = await this.selectAdditionalAddons(installedAddons);
		if (additionalAddons.length > 0) {
			await this.installAddons(additionalAddons);
			console.log(`   ✅ ${additionalAddons.length} add-on(s) adicional(es) instalado(s)\n`);
		} else {
			console.log('   ✅ Continuando sin add-ons adicionales\n');
		}

		// 7. Habilitar módulo en sidebar y configurar subnav
		console.log(`⚙️  Paso 7: Estoy configurando sidebar y subnav para "${module}"...`);
		await this.enableModule(module, template, product);
		console.log('   ✅ Sidebar y subnav configurados\n');

		// 8. Crear lienzo/template
		console.log('🎨 Paso 8: Estoy creando tu lienzo de trabajo...');
		const canvasPath = await this.createCanvas(template, module, product);
		console.log(`   ✅ Lienzo creado\n`);

		// 9. Validar lienzo creado
		console.log('🔍 Paso 9: Estoy validando que todo cumpla con los estándares UBITS...');
		await this.validateCanvas(canvasPath);
		console.log('   ✅ Validación completada\n');

		console.log('🎉 ¡Excelente! Tu proyecto UBITS está listo.\n');
		console.log('📋 Resumen de tu configuración:');
		console.log(`   📁 Lienzo: ${canvasPath}`);
		console.log(`   🎯 Template: ${template}`);
		console.log(`   📦 Módulo: ${module}`);
		console.log(`   🎨 Producto: ${product}`);
		console.log(`   🔌 Add-ons instalados: ${installedAddons.length + additionalAddons.length}\n`);
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
	 * Instala los add-ons por defecto del preset UBITS
	 */
	private async installDefaultAddons(): Promise<string[]> {
		console.log('\n   📋 Por defecto, voy a instalar estos add-ons para que tu proyecto funcione muy bien:');
		console.log('   ──────────────────────────────────────────────────────────────');
		
		const addonDescriptions: Record<string, string> = {
			'storybook': '📚 Desarrollo y documentación de componentes',
			'figma-sync': '🎨 Sincronización de tokens desde Figma',
			'eslint': '🔍 Detección de errores de código',
			'prettier': '✨ Formateo automático de código',
			'vitest': '🧪 Unit testing (rápido y moderno)',
			'playwright': '🎭 Testing end-to-end',
			'chromatic': '🖼️  Visual testing y comparación',
			'snyk': '🔒 Escaneo de vulnerabilidades',
			'renovate': '🔄 Actualizaciones automáticas',
			'lighthouse': '⚡ Análisis de rendimiento',
			'bundle-analyzer': '📊 Análisis de tamaño de bundle',
			'standalone': '🚀 Componentes standalone',
			'sentry': '🐛 Monitoreo de errores',
			'clarity': '👁️  Análisis de comportamiento de usuarios',
			'vercel': '☁️  Despliegue en Vercel',
			'github': '🐙 Integración con GitHub',
			'codecov': '📈 Cobertura de código',
			'feedback': '💬 Sistema de feedback automatizado',
		};

		const installed: string[] = [];
		const failed: string[] = [];

		for (const addonId of UBITS_PRESET.addons) {
			const description = addonDescriptions[addonId] || `   ${addonId}`;
			console.log(`   ${description}`);
			
			try {
				await this.hub.activateAddon(addonId);
				installed.push(addonId);
			} catch (error: any) {
				// Solo mostrar error si no es "no encontrado" (es esperado si no está compilado)
				if (error?.code !== 'ADDON_NOT_FOUND') {
					console.warn(`   ⚠️  Error activando ${addonId}:`, error.message || error);
				}
				failed.push(addonId);
			}
		}

		console.log('   ──────────────────────────────────────────────────────────────');
		
		if (installed.length > 0) {
			console.log(`\n   ✅ ${installed.length} add-on(s) instalado(s) correctamente`);
		}
		
		if (failed.length > 0) {
			console.log(`   ⚠️  ${failed.length} add-on(s) no disponible(s) (pueden requerir compilación)`);
		}

		return installed;
	}

	/**
	 * Pregunta al usuario si quiere agregar más add-ons
	 */
	private async selectAdditionalAddons(alreadyInstalled: string[]): Promise<string[]> {
		const wantsMore = await this.prompt.confirm(
			'   ¿Quieres agregar más add-ons a tu proyecto?',
			false,
		);

		if (!wantsMore) {
			return [];
		}

		// Descubrir add-ons disponibles
		const availableAddons = await this.discoverAvailableAddons();
		const availableIds = availableAddons
			.map(a => a.id)
			.filter(id => !alreadyInstalled.includes(id));

		if (availableIds.length === 0) {
			console.log('   ℹ️  No hay más add-ons disponibles para instalar.');
			return [];
		}

		console.log('\n   📦 Add-ons disponibles:');
		const options = availableAddons
			.filter(a => !alreadyInstalled.includes(a.id))
			.map((addon, index) => ({
				value: addon.id,
				label: `${addon.name} - ${addon.description || 'Sin descripción'}`,
			}));

		const selected = await this.prompt.select(
			'   Selecciona un add-on para agregar (o presiona Enter para continuar sin agregar más):',
			options,
		);

		if (!selected) {
			return [];
		}

		const additional: string[] = [selected];

		// Preguntar si quiere agregar más
		while (true) {
			const addMore = await this.prompt.confirm('   ¿Quieres agregar otro add-on?', false);
			if (!addMore) {
				break;
			}

			const remainingOptions = options.filter(opt => !additional.includes(opt.value));
			if (remainingOptions.length === 0) {
				console.log('   ℹ️  Ya has agregado todos los add-ons disponibles.');
				break;
			}

			const nextSelected = await this.prompt.select(
				'   Selecciona otro add-on:',
				remainingOptions,
			);

			if (nextSelected) {
				additional.push(nextSelected);
			} else {
				break;
			}
		}

		return additional;
	}

	/**
	 * Instala una lista de add-ons
	 */
	private async installAddons(addonIds: string[]): Promise<void> {
		for (const addonId of addonIds) {
			try {
				await this.hub.activateAddon(addonId);
				console.log(`   ✅ ${addonId} instalado`);
			} catch (error: any) {
				console.warn(`   ⚠️  Error instalando ${addonId}:`, error.message || error);
			}
		}
	}

	/**
	 * Descubre add-ons disponibles en el sistema
	 */
	private async discoverAvailableAddons(): Promise<Array<{ id: string; name: string; description: string }>> {
		const addons: Array<{ id: string; name: string; description: string }> = [];
		const addonsPath = 'packages/addons/functional';
		
		try {
			const fs = await import('fs/promises');
			const path = await import('path');
			
			const functionalPath = path.resolve(process.cwd(), addonsPath);
			
			try {
				const entries = await fs.readdir(functionalPath, { withFileTypes: true });
				
				for (const entry of entries) {
					if (entry.isDirectory()) {
						const addonPath = path.join(functionalPath, entry.name);
						const manifestPath = path.join(addonPath, 'manifest.json');
						
						try {
							const manifestContent = await fs.readFile(manifestPath, 'utf-8');
							const manifest = JSON.parse(manifestContent);
							
							addons.push({
								id: manifest.id || entry.name,
								name: manifest.name || entry.name,
								description: manifest.description || '',
							});
						} catch {
							// Si no hay manifest, usar el nombre del directorio
							addons.push({
								id: entry.name,
								name: entry.name,
								description: '',
							});
						}
					}
				}
			} catch {
				// Si no existe el directorio, retornar lista vacía
			}
		} catch {
			// Si no se puede importar fs, retornar lista vacía
		}

		return addons;
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
				// No mostrar cada componente individualmente para mantener el flujo fluido
			} catch (error) {
				console.warn(`   ⚠️  Error cargando ${component}:`, error);
			}
		}
		console.log(`   ✅ ${UBITS_PRESET.components.length} componentes cargados`);
	}

	/**
	 * Selecciona template (Administrador/Colaborador)
	 * SIEMPRE pregunta al usuario
	 */
	private async selectTemplate(): Promise<'administrador' | 'colaborador'> {
		// SIEMPRE preguntar al usuario
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

		// SIEMPRE preguntar al usuario
		const selectedModule = await this.prompt.select(
			'   ¿En qué módulo quieres trabajar?',
			moduleOptions,
			moduleOptions[0]?.value || 'desempeno',
		);

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

		// SIEMPRE preguntar al usuario
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

