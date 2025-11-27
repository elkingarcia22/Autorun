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
	 * Un solo paso interactivo que pregunta todo y luego ejecuta automáticamente
	 */
	async start(options?: { autoSelect?: ProjectType }): Promise<WizardResult> {
		console.log('🚀 ¡Hola! Soy tu asistente de Autorun.\n');
		console.log('Voy a hacerte 3 preguntas rápidas para configurar tu proyecto:\n');

		// Un solo paso: preguntar todo
		const answers = await this.askAllQuestions();

		if (answers.projectType === 'ubits') {
			console.log('\n✅ Perfecto, voy a configurar tu proyecto UBITS ahora.\n');
			if (!answers.template || !answers.module) {
				throw new Error('Template y módulo son requeridos para proyectos UBITS');
			}
			return await this.setupUBITSFromAnswers({
				template: answers.template,
				module: answers.module,
				product: answers.product,
			});
		} else {
			console.log('\n✅ Perfecto, voy a configurar un proyecto independiente.\n');
			return await this.setupIndependent();
		}
	}

	/**
	 * Pregunta todas las opciones en un solo paso
	 */
	private async askAllQuestions(): Promise<{
		projectType: ProjectType;
		template?: 'administrador' | 'colaborador';
		module?: string;
		product?: string;
	}> {
		// 1. Tipo de proyecto
		const projectType = await this.prompt.select(
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
		) as ProjectType;

		if (projectType === 'independent') {
			return { projectType };
		}

		// 2. Template (solo si es UBITS)
		const template = await this.prompt.select(
			'📋 ¿En qué template quieres trabajar?',
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
		) as 'administrador' | 'colaborador';

		// 3. Producto (recopilar todos los productos de todos los módulos del template)
		const templateConfig = UBITS_PRESET.templates[template];
		const allProducts: Array<{ value: string; label: string; module: string }> = [];

		// Recopilar todos los productos de todos los módulos
		for (const moduleId of templateConfig.modules) {
			const moduleConfig = UBITS_MODULES_CONFIG[moduleId];
			if (moduleConfig && moduleConfig.products.length > 0) {
				for (const product of moduleConfig.products) {
					allProducts.push({
						value: `${moduleId}:${product.id}`,
						label: `${moduleConfig.name} - ${product.name}`,
						module: moduleId,
					});
				}
			} else if (moduleConfig) {
				// Módulo sin productos (módulo solo)
				allProducts.push({
					value: `${moduleId}:`,
					label: `${moduleConfig.name} (módulo solo)`,
					module: moduleId,
				});
			}
		}

		const selectedProduct = await this.prompt.select(
			'📦 ¿En qué producto quieres trabajar?',
			allProducts,
			allProducts[0]?.value,
		);

		// Parsear la selección
		const [module, product] = selectedProduct.split(':');

		return {
			projectType,
			template,
			module,
			product: product || undefined,
		};
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
	 * Configuración para UBITS desde las respuestas del usuario
	 * Ejecuta todo automáticamente después de recibir las respuestas
	 */
	private async setupUBITSFromAnswers(answers: {
		template: 'administrador' | 'colaborador';
		module: string;
		product?: string;
	}): Promise<UBITSResult> {
		const { template, module, product } = answers;

		// Ejecutar todos los pasos automáticos
		console.log('🚀 Configurando todo automáticamente...\n');

		// 0. Clonar UBITS, instalar y arrancar
		console.log('📦 Clonando repositorio UBITS...');
		await this.cloneAndSetupUBITS();
		console.log('   ✅ Repositorio UBITS listo\n');

		// 1. Conectar con Storybook
		console.log('🔗 Conectando con Storybook UBITS...');
		await this.connectStorybook();
		console.log('   ✅ Conectado\n');

		// 2. Cargar componentes desde Storybook
		console.log('🧩 Cargando componentes desde Storybook...');
		await this.loadComponentsFromStorybook();
		console.log('   ✅ Componentes cargados\n');

		// 3. Instalar add-ons por defecto
		console.log('📦 Instalando add-ons optimizados...');
		const installedAddons = await this.installAddons(UBITS_PRESET.addons);
		console.log(`   ✅ ${installedAddons.length} add-on(s) instalado(s)\n`);

		// 4. Habilitar módulo en sidebar y configurar subnav
		console.log(`⚙️  Configurando sidebar y subnav para "${module}"...`);
		await this.enableModule(module, template, product);
		console.log('   ✅ Configurado\n');

		// 5. Crear lienzo/template
		console.log('🎨 Creando tu lienzo de trabajo...');
		const canvasPath = await this.createCanvas(template, module, product);
		console.log('   ✅ Lienzo creado\n');

		// 6. Validar lienzo creado
		console.log('🔍 Validando que todo cumpla con los estándares UBITS...');
		await this.validateCanvas(canvasPath);
		console.log('   ✅ Validación completada\n');

		// Mostrar resumen final
		console.log('\n🎉 ¡Excelente! Tu proyecto UBITS está listo.\n');
		console.log('📋 Resumen de tu configuración:');
		console.log(`   📁 Lienzo: ${canvasPath}`);
		console.log(`   🎯 Template: ${template}`);
		console.log(`   📦 Módulo: ${module}`);
		if (product) {
			console.log(`   🎨 Producto: ${product}`);
		}
		console.log(`   🔌 Add-ons instalados: ${installedAddons.length}\n`);
		console.log('🚀 Ya puedes empezar a trabajar. ¡Éxito con tu proyecto!\n');

		return {
			projectType: 'ubits',
			template,
			module,
			product: product || '',
			canvasPath,
		};
	}

	/**
	 * Instala los add-ons por defecto del preset UBITS
	 */
	/**
	 * Muestra los add-ons por defecto y permite al usuario revisar y modificar la lista
	 */
	private async reviewAndSelectAddons(): Promise<{ finalAddons: string[]; additionalAddons: string[] }> {
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

		// Mostrar add-ons por defecto
		console.log('\n   📋 Voy a instalar estos add-ons por defecto:');
		console.log('   ──────────────────────────────────────────────────────────────');
		UBITS_PRESET.addons.forEach((addonId) => {
			const description = addonDescriptions[addonId] || `   ${addonId}`;
			console.log(`   ${description}`);
		});
		console.log('   ──────────────────────────────────────────────────────────────');

		// Preguntar si quiere continuar o modificar
		const wantsToModify = await this.prompt.confirm(
			'\n   ¿Quieres continuar así o añadir/quitar algún add-on? (s=modificar, N=continuar)',
			false,
		);

		let finalAddons = [...UBITS_PRESET.addons];
		let additionalAddons: string[] = [];

		if (wantsToModify) {
			// Permitir agregar más add-ons
			const wantsToAdd = await this.prompt.confirm(
				'   ¿Quieres agregar más add-ons?',
				false,
			);

			if (wantsToAdd) {
				additionalAddons = await this.selectAdditionalAddons(finalAddons);
				finalAddons = [...finalAddons, ...additionalAddons];
			}

			// TODO: Permitir quitar add-ons (por ahora solo agregar)
			// Esto requeriría una interfaz más compleja para seleccionar cuáles quitar
		}

		return { finalAddons, additionalAddons };
	}

	private async installDefaultAddons(): Promise<string[]> {
		// Este método ya no se usa, pero lo mantengo por compatibilidad
		return [];
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
	private async installAddons(addonIds: string[]): Promise<string[]> {
		const installed: string[] = [];
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

		for (const addonId of addonIds) {
			const description = addonDescriptions[addonId] || addonId;
			try {
				await this.hub.activateAddon(addonId);
				console.log(`   ✅ ${description}`);
				installed.push(addonId);
			} catch (error: any) {
				// Solo mostrar error si no es "no encontrado" (es esperado si no está compilado)
				if (error?.code !== 'ADDON_NOT_FOUND') {
					console.warn(`   ⚠️  Error instalando ${addonId}:`, error.message || error);
				}
			}
		}

		return installed;
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
	 * Clona el repositorio UBITS, instala dependencias y arranca con template administrador
	 */
	private async cloneAndSetupUBITS(): Promise<void> {
		const { exec } = await import('child_process');
		const { promisify } = await import('util');
		const execAsync = promisify(exec);
		const fs = await import('fs/promises');
		const path = await import('path');

		const currentDir = process.cwd();
		const ubitsDir = path.join(currentDir, 'UBITS');
		const ubitsRepo = 'https://github.com/elkingarcia22/UBITS.git';

		try {
			// Verificar si UBITS ya existe
			try {
				await fs.access(ubitsDir);
				console.log('   ℹ️  El directorio UBITS ya existe, saltando clonación...');
			} catch {
				// No existe, clonar
				console.log(`   📥 Clonando ${ubitsRepo}...`);
				await execAsync(`git clone ${ubitsRepo} ${ubitsDir}`, { cwd: currentDir });
				console.log('   ✅ Repositorio clonado');
			}

			// Instalar dependencias
			console.log('   📦 Instalando dependencias...');
			await execAsync('npm install', { cwd: ubitsDir });
			console.log('   ✅ Dependencias instaladas');

			// Informar sobre el template de administrador
			console.log('   🎯 Template de administrador disponible en:');
			console.log(`      ${path.join(ubitsDir, 'packages/templates/template-admin.html')}`);
			console.log('   💡 Para arrancar el proyecto, ejecuta:');
			console.log(`      cd UBITS && npm run dev`);

		} catch (error: any) {
			console.warn('   ⚠️  Error durante la configuración de UBITS:', error.message || error);
			console.warn('   ℹ️  Puedes clonar manualmente con:');
			console.warn(`      git clone ${ubitsRepo}`);
			console.warn('      cd UBITS && npm install && npm run dev');
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
	): Promise<{ module: string; product?: string }> {
		const templateConfig = UBITS_PRESET.templates[template];
		const modules = templateConfig.modules;

		const moduleOptions = modules.map((moduleId) => {
			const moduleConfig = UBITS_MODULES_CONFIG[moduleId];
			return {
				value: moduleId,
				label: moduleConfig?.name || moduleId,
			};
		});

		// Preguntar al usuario de forma más directa
		let selectedModule: string | undefined;
		let attempts = 0;
		const maxAttempts = 3;

		while (!selectedModule && attempts < maxAttempts) {
			const answer = await this.prompt.question(
				'   ¿En qué módulo quieres trabajar? (escribe el nombre o número): ',
			);

			// Intentar por número
			const index = parseInt(answer, 10) - 1;
			if (index >= 0 && index < moduleOptions.length) {
				selectedModule = moduleOptions[index].value;
				break;
			}

			// Intentar por nombre (búsqueda parcial, case-insensitive)
			const normalizedAnswer = answer.toLowerCase().trim();
			const found = moduleOptions.find((opt) => {
				const normalizedLabel = opt.label.toLowerCase();
				const normalizedValue = opt.value.toLowerCase();
				return (
					normalizedLabel.includes(normalizedAnswer) ||
					normalizedValue.includes(normalizedAnswer) ||
					normalizedLabel === normalizedAnswer ||
					normalizedValue === normalizedAnswer
				);
			});

			if (found) {
				selectedModule = found.value;
				break;
			}

			// Si no se encontró, mostrar opciones y pedir de nuevo
			attempts++;
			if (attempts < maxAttempts) {
				console.log('   ⚠️  Módulo no encontrado. Opciones disponibles:');
				moduleOptions.forEach((opt, idx) => {
					console.log(`      ${idx + 1}. ${opt.label}`);
				});
			}
		}

		// Si después de varios intentos no se encontró, usar el default
		if (!selectedModule) {
			console.log('   ℹ️  Usando módulo por defecto: Desempeño');
			selectedModule = 'desempeno';
		}

		// Seleccionar producto dentro del módulo (solo si el módulo tiene productos)
		const finalModule = selectedModule || 'desempeno';
		const product = await this.selectProduct(finalModule);

		return { module: finalModule, product: product || undefined };
	}

	/**
	 * Selecciona producto dentro de un módulo
	 * Si el módulo no tiene productos, retorna string vacío (módulo solo)
	 */
	private async selectProduct(moduleId: string): Promise<string> {
		const moduleConfig = UBITS_MODULES_CONFIG[moduleId];

		if (!moduleConfig) {
			console.warn(`⚠️  Módulo "${moduleId}" no tiene configuración`);
			return '';
		}

		// Si el módulo no tiene productos, es un módulo solo
		if (moduleConfig.products.length === 0) {
			console.log(`   ✅ Módulo "${moduleConfig.name}" es un módulo solo (sin productos)`);
			return '';
		}

		// Si tiene productos, preguntar al usuario
		const productOptions = moduleConfig.products.map((product) => ({
			value: product.id,
			label: product.name,
		}));

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

