/**
 * InitializationWizard
 *
 * Wizard interactivo para configurar Autorun al inicio
 * Permite elegir entre trabajar en UBITS o proyecto independiente
 */

import * as path from 'path';
import { AutorunHub } from '../AutorunHub';
import {
	UBITS_PRESET,
	UBITS_ADDONS_CONFIG,
	UBITSTemplate,
	UBITS_MODULES_CONFIG,
} from './UBITSPreset';
import { TemplateLoader } from './TemplateLoader';
import { ModuleManager } from './ModuleManager';
import { CanvasCreator } from './CanvasCreator';
import { ComponentValidator } from './ComponentValidator';
import { InteractivePrompt } from './InteractivePrompt';
import { LocalServer } from '../server/LocalServer';

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
	disableOtherModulesNavigation?: boolean;
}

export interface IndependentResult extends WizardResult {
	projectType: 'independent';
	addons: string[];
}

export class InitializationWizard {
	private hub: AutorunHub;
	private prompt: InteractivePrompt;
	private templateOpened: boolean = false; // Bandera para evitar abrir múltiples veces
	private localServer: LocalServer | null = null; // Servidor HTTP local

	constructor(hub: AutorunHub) {
		this.hub = hub;
		this.prompt = new InteractivePrompt();
	}

	/**
	 * Inicia el wizard de inicialización
	 * Pregunta template y producto en un solo paso, luego ejecuta todo automáticamente
	 */
	async start(options?: { autoSelect?: ProjectType }): Promise<WizardResult> {
		// Verificar si hay AUTORUN_ANSWERS (modo automático con preguntas visibles)
		// Si hay AUTORUN_ANSWERS, SIEMPRE mostrar preguntas (igual que terminal)
		const hasAutoAnswers = !!process.env.AUTORUN_ANSWERS;
		
		// Intentar obtener respuestas automáticas primero (solo si NO hay AUTORUN_ANSWERS)
		// Si hay AUTORUN_ANSWERS, forzar modo interactivo para mostrar preguntas
		const autoAnswers = hasAutoAnswers ? null : this.getAutoAnswers(options?.autoSelect);

		let answers: { template: 'administrador' | 'colaborador'; module: string; product?: string };
		let selectedAddons: string[];
		let disableOtherModulesNavigation: boolean = false;

		if (autoAnswers && autoAnswers.template && autoAnswers.module && !hasAutoAnswers) {
			// Usar respuestas automáticas (solo si NO hay AUTORUN_ANSWERS)
			console.log('🚀 ¡Hola! Soy tu asistente de Autorun.\n');
			console.log('📋 Usando configuración automática:\n');
			console.log(`   🎯 Template: ${autoAnswers.template}`);
			console.log(`   📦 Módulo: ${autoAnswers.module}`);
			if (autoAnswers.product) {
				console.log(`   🎨 Producto: ${autoAnswers.product}`);
			}
			console.log('');

			answers = {
				template: autoAnswers.template,
				module: autoAnswers.module,
				product: autoAnswers.product,
			};

			// Para add-ons, usar los por defecto si no hay variables de entorno
			const addonsEnv = process.env.AUTORUN_ADDONS;
			if (addonsEnv) {
				selectedAddons = addonsEnv.split(',').map((a) => a.trim());
			} else {
				selectedAddons = UBITS_PRESET.addons;
			}

			// Para desactivar navegación de otros módulos, verificar variable de entorno
			const disableNavEnv = process.env.AUTORUN_DISABLE_OTHER_MODULES;
			disableOtherModulesNavigation = disableNavEnv === 'true' || disableNavEnv === '1';
		} else {
			// Modo interactivo (o automático con AUTORUN_ANSWERS - muestra preguntas)
			console.log('🚀 ¡Hola! Soy tu asistente de Autorun.\n');
			console.log('Voy a preguntarte qué template y producto quieres usar:\n');

			// Preguntar template y producto en un solo paso
			answers = await this.askTemplateAndProduct();

			// Preguntar si quiere desactivar navegación de otros módulos
			disableOtherModulesNavigation = await this.askDisableOtherModulesNavigation();

			// Preguntar por los add-ons a instalar
			selectedAddons = await this.askAddons();
		}

		console.log('\n✅ Perfecto, voy a configurar tu proyecto UBITS ahora.\n');

		// NO saltar GitHub si hay AUTORUN_ANSWERS (queremos mostrar la pregunta)
		// Solo saltar si está en modo completamente automático (sin AUTORUN_ANSWERS)
		if (this.prompt.isAuto() && !hasAutoAnswers) {
			process.env.AUTORUN_SKIP_GITHUB = 'true';
		}

		return await this.setupUBITSFromAnswers({
			template: answers.template,
			module: answers.module,
			product: answers.product,
			addons: selectedAddons,
			disableOtherModulesNavigation,
		});
	}

	/**
	 * Obtiene respuestas automáticas desde variables de entorno
	 * Solo retorna valores si hay variables de entorno explícitas
	 */
	private getAutoAnswers(autoSelect?: ProjectType): {
		projectType: ProjectType;
		template?: 'administrador' | 'colaborador';
		module?: string;
		product?: string;
	} | null {
		// Solo usar configuración automática si hay variables de entorno explícitas
		const hasEnvVars =
			process.env.AUTORUN_TEMPLATE || process.env.AUTORUN_MODULE || process.env.AUTORUN_PRODUCT;

		if (!hasEnvVars && !autoSelect) {
			// No hay variables de entorno ni autoSelect, usar modo interactivo
			return null;
		}

		// Verificar variables de entorno o usar valores por defecto solo si autoSelect está presente
		const projectType = (process.env.AUTORUN_PROJECT_TYPE as ProjectType) || autoSelect || 'ubits';
		const template =
			(process.env.AUTORUN_TEMPLATE as 'administrador' | 'colaborador') ||
			(autoSelect ? 'administrador' : undefined);
		const module = process.env.AUTORUN_MODULE || (autoSelect ? 'desempeno' : undefined);
		let product = process.env.AUTORUN_PRODUCT;

		// Si no hay producto especificado, obtener el primero del módulo según el template
		if (projectType === 'ubits' && !product && template && module) {
			const moduleConfig = UBITS_MODULES_CONFIG[module];
			if (moduleConfig && moduleConfig.products.length > 0) {
				// Filtrar productos según el template
				const templateProductsMap: Record<string, Record<string, string[]>> = {
					administrador: {
						empresa: [
							'gestion-usuarios',
							'organigrama',
							'datos-empresa',
							'personalizacion',
							'roles-permisos',
							'comunicaciones',
						],
						aprendizaje: ['lms-cursos', 'plan-formacion', 'certificados', 'metricas-empresa'],
						desempeno: ['evaluations', 'objectives', 'matriz-talento'],
					},
					colaborador: {
						aprendizaje: ['inicio', 'catalogo', 'corporativa', 'zona-estudio'],
						desempeno: ['evaluaciones-360', 'objetivos', 'metricas', 'reportes'],
						planes: ['planes', 'tareas'],
					},
				};

				const templateProducts = templateProductsMap[template]?.[module] || [];
				if (templateProducts.length > 0) {
					// Obtener el primer producto válido para este template
					const validProducts = moduleConfig.products.filter((p: { id: string }) =>
						templateProducts.includes(p.id),
					);
					if (validProducts.length > 0) {
						product = validProducts[0].id;
					}
				}
			}
		}

		// Solo retornar si tenemos template y module (ya sea de env vars o autoSelect)
		if (projectType === 'ubits' && template && module) {
			return {
				projectType,
				template,
				module,
				product,
			};
		}

		// Si no hay suficiente información, retornar null para modo interactivo
		return null;
	}

	/**
	 * Pregunta template y producto en un solo paso
	 */
	private async askTemplateAndProduct(): Promise<{
		template: 'administrador' | 'colaborador';
		module: string;
		product?: string;
	}> {
		// 1. Template
		const template = (await this.prompt.select(
			'🎯 ¿En qué template quieres trabajar?',
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
		)) as 'administrador' | 'colaborador';

		// 2. Producto (recopilar todos los productos de todos los módulos del template)
		const templateConfig = UBITS_PRESET.templates[template];
		const allProducts: Array<{ value: string; label: string; module: string }> = [];

		// Mapeo de productos por template según products.js
		const templateProductsMap: Record<string, Record<string, string[]>> = {
			administrador: {
				empresa: [
					'gestion-usuarios',
					'organigrama',
					'datos-empresa',
					'personalizacion',
					'roles-permisos',
					'comunicaciones',
				],
				aprendizaje: ['lms-cursos', 'plan-formacion', 'certificados', 'metricas-empresa'],
				desempeno: ['evaluations', 'objectives', 'matriz-talento'],
			},
			colaborador: {
				aprendizaje: ['inicio', 'catalogo', 'corporativa', 'zona-estudio'],
				desempeno: ['evaluaciones-360', 'objetivos', 'metricas', 'reportes'],
				planes: ['planes', 'tareas'],
			},
		};

		// Recopilar todos los productos de todos los módulos
		for (const moduleId of templateConfig.modules) {
			const moduleConfig = UBITS_MODULES_CONFIG[moduleId];
			if (!moduleConfig) continue;

			// Obtener productos específicos del template para este módulo
			const templateProducts = templateProductsMap[template]?.[moduleId] || [];

			if (templateProducts.length > 0) {
				// Filtrar productos que pertenecen a este template
				const validProducts = moduleConfig.products.filter((p) => templateProducts.includes(p.id));

				// Si encontramos productos válidos, agregarlos
				if (validProducts.length > 0) {
					for (const product of validProducts) {
						allProducts.push({
							value: `${moduleId}:${product.id}`,
							label: `${moduleConfig.name} - ${product.name}`,
							module: moduleId,
						});
					}
				} else {
					// Si el módulo tiene productos en la config pero ninguno coincide con el template,
					// significa que es un módulo solo para este template
					allProducts.push({
						value: `${moduleId}:`,
						label: `${moduleConfig.name} (módulo solo)`,
						module: moduleId,
					});
				}
			} else {
				// Módulo sin productos definidos para este template (módulo solo)
				allProducts.push({
					value: `${moduleId}:`,
					label: `${moduleConfig.name} (módulo solo)`,
					module: moduleId,
				});
			}
		}

		// No usar defaultValue para forzar que el usuario seleccione explícitamente
		const selectedProduct = await this.prompt.select(
			'📦 ¿En qué producto quieres trabajar?',
			allProducts,
			undefined, // Sin defaultValue para forzar selección explícita
		);

		// Parsear la selección
		const [module, product] = selectedProduct.split(':');

		return {
			template,
			module,
			product: product || undefined,
		};
	}

	/**
	 * Pregunta si quiere desactivar la navegación de otros módulos
	 * Si dice que sí, se quitarán los enlaces a otros módulos del sidebar
	 */
	private async askDisableOtherModulesNavigation(): Promise<boolean> {
		console.log('\n🔒 Navegación de otros módulos:\n');
		console.log('   Por defecto, el prototipo permite navegar a todos los módulos.');
		console.log('   Si desactivas esta opción, solo podrás navegar al módulo seleccionado.');
		console.log('   Esto es útil para evitar que el usuario se pierda navegando.\n');

		const answer = await this.prompt.confirm(
			'¿Quieres desactivar la navegación a otros módulos en el prototipo?',
			false, // Por defecto: NO (mantener navegación activa)
		);

		if (answer) {
			console.log('✅ Navegación a otros módulos desactivada\n');
		} else {
			console.log('✅ Navegación a otros módulos activa (comportamiento por defecto)\n');
		}

		return answer;
	}

	/**
	 * Pregunta por los add-ons a instalar
	 * Muestra los add-ons por defecto y permite agregar otros
	 */
	private async askAddons(): Promise<string[]> {
		const defaultAddons = UBITS_PRESET.addons;

		// Descripciones de los add-ons
		const addonDescriptions: Record<string, string> = {
			storybook: '📚 Desarrollo y documentación de componentes',
			'figma-sync': '🎨 Sincronización de tokens desde Figma',
			eslint: '🔍 Detección de errores de código',
			prettier: '✨ Formateo automático de código',
			vitest: '🧪 Unit testing (rápido y moderno)',
			playwright: '🎭 Testing end-to-end',
			chromatic: '🖼️  Visual testing y comparación',
			snyk: '🔒 Escaneo de vulnerabilidades',
			renovate: '🔄 Actualizaciones automáticas',
			lighthouse: '⚡ Análisis de rendimiento',
			'bundle-analyzer': '📊 Análisis de tamaño de bundle',
			standalone: '🚀 Componentes standalone',
			sentry: '🐛 Monitoreo de errores',
			clarity: '👁️  Análisis de comportamiento de usuarios',
			vercel: '☁️  Despliegue en Vercel',
			github: '🐙 Integración con GitHub',
			codecov: '📈 Cobertura de código',
			feedback: '💬 Sistema de feedback automatizado',
		};

		// Obtener todos los add-ons disponibles
		const allAvailableAddons = await this.discoverAvailableAddons();

		// Mostrar resumen de add-ons por defecto con número de opción del wizard
		console.log('\n🔌 Add-ons que se instalarán por defecto:\n');
		
		// Mapeo de add-on ID a número de opción en el wizard
		const addonToWizardNumber: Record<string, number> = {
			'storybook': 1,
			'figma-sync': 2,
			'eslint': 3,
			'prettier': 4,
			'vitest': 5,
			'playwright': 6,
			'chromatic': 7,
			'snyk': 8,
			'renovate': 9,
			'lighthouse': 10,
			'bundle-analyzer': 11,
			'standalone': 12,
			'sentry': 13,
			'clarity': 14,
			'vercel': 15,
			'github': 16,
			'codecov': 17,
			'feedback': 18,
		};
		
		defaultAddons.forEach((addonId) => {
			const description =
				addonDescriptions[addonId] ||
				allAvailableAddons.find((a) => a.id === addonId)?.description ||
				addonId;
			const wizardNumber = addonToWizardNumber[addonId] || '?';
			console.log(`   ${wizardNumber}. ${description} (add-on: ${addonId})`);
		});

		// Verificar si estamos en modo automático (con respuestas disponibles)
		const isAuto = this.prompt.isAuto();
		
		// DEBUG: Log para entender qué está pasando
		console.log('[DEBUG askAddons] isAuto:', isAuto, 'isAutoMode:', (this.prompt as any).isAutoMode, 'autoAnswerIndex:', (this.prompt as any).autoAnswerIndex, 'autoAnswers.length:', (this.prompt as any).autoAnswers.length);
		
		// IMPORTANTE: Si NO estamos en modo automático (isAuto() retorna false),
		// significa que se agotaron las respuestas automáticas y volvimos a modo interactivo.
		// En ese caso, SIEMPRE preguntar al usuario.
		
		// Si NO estamos en modo automático, SIEMPRE preguntar al usuario
		// (no usar defaults automáticamente)
		if (!isAuto) {
			// Continuar normalmente, preguntar al usuario
			// Esto incluye el caso donde se agotaron las respuestas automáticas
			console.log('[DEBUG askAddons] NO estamos en modo automático, preguntando al usuario');
		} else {
			console.log('[DEBUG askAddons] Estamos en modo automático, preguntando (select manejará respuesta automática)');
		}
		// Si estamos en modo automático, también preguntar
		// (el método select() manejará la respuesta automática internamente si está disponible)

		// Preguntar qué quiere hacer
		console.log('[DEBUG askAddons] Llamando a prompt.select()...');
		const action = await this.prompt.select(
			'\n   ¿Qué quieres hacer?',
			[
				{
					value: 'default',
					label: 'Instalar solo los add-ons por defecto',
				},
				{
					value: 'add',
					label: 'Agregar otros add-ons',
				},
			],
			'default',
		);

		let selectedAddons = [...defaultAddons];

		if (action === 'add') {
			// Obtener add-ons adicionales (los que NO están en defaultAddons)
			const additionalAddons = allAvailableAddons.filter((a) => !defaultAddons.includes(a.id));

			if (additionalAddons.length === 0) {
				console.log('\n   ℹ️  No hay otros add-ons disponibles para agregar.');
				return selectedAddons;
			}

			console.log('\n   📦 Otros add-ons disponibles:\n');

			// Permitir seleccionar múltiples add-ons adicionales
			const additionalSelected: string[] = [];

			while (true) {
				// Crear opciones de add-ons que aún no se han seleccionado
				const remainingOptions = additionalAddons
					.filter((a) => !additionalSelected.includes(a.id))
					.map((addon, index) => ({
						value: addon.id,
						label: `${addon.name} - ${addon.description || 'Sin descripción'}`,
					}));

				if (remainingOptions.length === 0) {
					console.log('\n   ℹ️  Ya has seleccionado todos los add-ons adicionales disponibles.');
					break;
				}

				// Agregar opción para terminar
				remainingOptions.push({
					value: '__done__',
					label: '✅ Terminar y continuar',
				});

				const selected = await this.prompt.select(
					'\n   Selecciona otro add-on para agregar:',
					remainingOptions,
				);

				if (selected === '__done__' || !selected) {
					break;
				}

				if (!additionalSelected.includes(selected)) {
					additionalSelected.push(selected);
					const addon = additionalAddons.find((a) => a.id === selected);
					console.log(`   ✅ Agregado: ${addon?.name || selected}`);
				}

				// Preguntar si quiere agregar más
				const addMore = await this.prompt.confirm('   ¿Quieres agregar otro add-on?', false);

				if (!addMore) {
					break;
				}
			}

			// Combinar add-ons por defecto con los adicionales seleccionados
			selectedAddons = [...defaultAddons, ...additionalSelected];

			if (additionalSelected.length > 0) {
				console.log(
					`\n   ✅ Total de add-ons a instalar: ${selectedAddons.length} (${defaultAddons.length} por defecto + ${additionalSelected.length} adicionales)`,
				);
			}
		}

		return selectedAddons;
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
		addons: string[];
		disableOtherModulesNavigation?: boolean;
	}): Promise<UBITSResult> {
		const { template, module, product, addons, disableOtherModulesNavigation } = answers;

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

		// 3. Instalar add-ons seleccionados
		console.log('📦 Instalando add-ons seleccionados...');
		const installedAddons = await this.installAddons(addons);
		console.log(`   ✅ ${installedAddons.length} add-on(s) instalado(s)\n`);

		// 4. Configurar GitHub (preguntar si quiere configurar ahora)
		console.log('🐙 Configuración de GitHub...');
		const githubUrl = await this.askAndConfigureGitHub();
		if (githubUrl) {
			console.log(`   ✅ GitHub configurado: ${githubUrl}\n`);
		} else {
			console.log('   ⚠️  Continuando sin configurar GitHub (se puede configurar después)\n');
		}

		// 5. Habilitar módulo en sidebar y configurar subnav
		console.log(`⚙️  Configurando sidebar y subnav para "${module}"...`);
		await this.enableModule(module, template, product);
		console.log('   ✅ Configurado\n');

		// 6. Crear ambos templates (administrador y colaborador)
		console.log('🎨 Creando tus lienzos de trabajo...');
		const { selectedCanvasPath, otherCanvasPath } = await this.createBothTemplates(
			template,
			module,
			product,
			disableOtherModulesNavigation,
		);
		console.log('   ✅ Ambos templates creados\n');

		// 6.1. Actualizar enlaces entre templates en el sidebar
		if (otherCanvasPath) {
			console.log('🔗 Actualizando enlaces entre templates...');
			await this.updateCrossTemplateLinks(selectedCanvasPath, otherCanvasPath, template);
			console.log('   ✅ Enlaces actualizados\n');
		}

		// 7. Validar lienzo seleccionado
		console.log('🔍 Validando que todo cumpla con los estándares UBITS...');
		await this.validateCanvas(selectedCanvasPath);
		console.log('   ✅ Validación completada\n');

		// 8. Abrir solo el template seleccionado en el navegador
		console.log('🌐 Abriendo template seleccionado en el navegador...');
		const openedUrl = await this.openTemplateInBrowser(selectedCanvasPath);
		console.log('   ✅ Template abierto\n');

		// Mostrar resumen final
		console.log('\n🎉 ¡Excelente! Tu proyecto UBITS está listo.\n');
		console.log('📋 Resumen de tu configuración:');
		console.log(`   🎯 Template: ${template}`);
		console.log(`   📦 Módulo: ${module}`);
		if (product) {
			console.log(`   🎨 Producto: ${product}`);
		}
		console.log(`   📁 Lienzo seleccionado: ${selectedCanvasPath}`);
		if (openedUrl) {
			console.log(`   🌐 Template abierto en: ${openedUrl}`);
		}
		if (otherCanvasPath) {
			console.log(`   📁 Lienzo adicional: ${otherCanvasPath}`);
		}
		console.log(`   🔌 Add-ons instalados: ${installedAddons.length}`);
		if (githubUrl) {
			console.log(`   🐙 GitHub: ${githubUrl}`);
		}
		
		// Mostrar información del servidor
		if (this.localServer && this.localServer.isServerRunning()) {
			const serverUrl = this.localServer.getUrl();
			console.log(`   🖥️  Servidor local: ${serverUrl}`);
			console.log('\n   💡 IMPORTANTE:');
			console.log('      - El servidor HTTP local está corriendo');
			console.log('      - Mantén esta terminal abierta para que el servidor siga funcionando');
			console.log('      - Presiona Ctrl+C para detener el servidor y salir');
		}
		
		console.log('\n🚀 Ya puedes empezar a trabajar. ¡Éxito con tu proyecto!\n');

		return {
			projectType: 'ubits',
			template,
			module,
			product: product || '',
			canvasPath: selectedCanvasPath,
			disableOtherModulesNavigation,
		};
	}

	/**
	 * Inicia el servidor HTTP local si no está corriendo
	 */
	private async ensureLocalServer(): Promise<LocalServer> {
		if (!this.localServer) {
			this.localServer = new LocalServer({
				port: 3000,
				directory: path.join(process.cwd(), 'prototypes'),
				vercelUrl: UBITS_PRESET.storybook.url,
				vercelBypassToken: UBITS_PRESET.storybook.bypassToken,
			});
			await this.localServer.start();
		} else if (!this.localServer.isServerRunning()) {
			await this.localServer.start();
		}
		return this.localServer;
	}

	/**
	 * Abre el template en el navegador local usando servidor HTTP
	 * Solo se ejecuta una vez, incluso si se llama múltiples veces
	 */
	private async openTemplateInBrowser(filePath: string): Promise<string | null> {
		// Si ya se abrió, no hacer nada
		if (this.templateOpened) {
			return null;
		}

		let httpUrl: string = '';

		try {
			const { exec } = await import('child_process');
			const { promisify } = await import('util');
			const execAsync = promisify(exec);
			const pathModule = await import('path');

			// Iniciar servidor HTTP local
			const server = await this.ensureLocalServer();
			const serverUrl = server.getUrl();

			// Obtener nombre del archivo relativo a prototypes/
			const fileName = pathModule.basename(filePath);
			httpUrl = `${serverUrl}/${fileName}`;

			// Detectar el sistema operativo y abrir el navegador
			const platform = process.platform;
			let command: string;

			if (platform === 'darwin') {
				// macOS
				command = `open "${httpUrl}"`;
			} else if (platform === 'win32') {
				// Windows
				command = `start "" "${httpUrl}"`;
			} else {
				// Linux y otros
				command = `xdg-open "${httpUrl}"`;
			}

			await execAsync(command);
			
			// Marcar como abierto
			this.templateOpened = true;
			
			// Identificar tipo de template desde el nombre del archivo
			const templateType = fileName.includes('administrador') ? 'Administrador' : 
			                     fileName.includes('colaborador') ? 'Colaborador' : 
			                     'Template';
			
			console.log(`   ✅ Template ${templateType} abierto en el navegador`);
			console.log(`   📄 Archivo: ${fileName}`);
			console.log(`   🌐 URL: ${httpUrl}`);
			console.log(`   💡 El servidor HTTP local seguirá corriendo en ${serverUrl}`);
			console.log(`   💡 Para detenerlo, presiona Ctrl+C o cierra esta terminal`);
			
			return httpUrl;
		} catch (error: any) {
			console.warn('   ⚠️  No se pudo abrir el navegador automáticamente:', error.message || error);
			if (httpUrl) {
				console.warn(`   💡 Abre manualmente: ${httpUrl}`);
				return httpUrl;
			} else {
				console.warn(`   💡 Abre manualmente: ${filePath}`);
				return null;
			}
		}
	}

	/**
	 * Instala los add-ons por defecto del preset UBITS
	 */
	/**
	 * Muestra los add-ons por defecto y permite al usuario revisar y modificar la lista
	 */
	private async reviewAndSelectAddons(): Promise<{
		finalAddons: string[];
		additionalAddons: string[];
	}> {
		const addonDescriptions: Record<string, string> = {
			storybook: '📚 Desarrollo y documentación de componentes',
			'figma-sync': '🎨 Sincronización de tokens desde Figma',
			eslint: '🔍 Detección de errores de código',
			prettier: '✨ Formateo automático de código',
			vitest: '🧪 Unit testing (rápido y moderno)',
			playwright: '🎭 Testing end-to-end',
			chromatic: '🖼️  Visual testing y comparación',
			snyk: '🔒 Escaneo de vulnerabilidades',
			renovate: '🔄 Actualizaciones automáticas',
			lighthouse: '⚡ Análisis de rendimiento',
			'bundle-analyzer': '📊 Análisis de tamaño de bundle',
			standalone: '🚀 Componentes standalone',
			sentry: '🐛 Monitoreo de errores',
			clarity: '👁️  Análisis de comportamiento de usuarios',
			vercel: '☁️  Despliegue en Vercel',
			github: '🐙 Integración con GitHub',
			codecov: '📈 Cobertura de código',
			feedback: '💬 Sistema de feedback automatizado',
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
			const wantsToAdd = await this.prompt.confirm('   ¿Quieres agregar más add-ons?', false);

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
			.map((a) => a.id)
			.filter((id) => !alreadyInstalled.includes(id));

		if (availableIds.length === 0) {
			console.log('   ℹ️  No hay más add-ons disponibles para instalar.');
			return [];
		}

		console.log('\n   📦 Add-ons disponibles:');
		const options = availableAddons
			.filter((a) => !alreadyInstalled.includes(a.id))
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

			const remainingOptions = options.filter((opt) => !additional.includes(opt.value));
			if (remainingOptions.length === 0) {
				console.log('   ℹ️  Ya has agregado todos los add-ons disponibles.');
				break;
			}

			const nextSelected = await this.prompt.select('   Selecciona otro add-on:', remainingOptions);

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
			storybook: '📚 Desarrollo y documentación de componentes',
			'figma-sync': '🎨 Sincronización de tokens desde Figma',
			eslint: '🔍 Detección de errores de código',
			prettier: '✨ Formateo automático de código',
			vitest: '🧪 Unit testing (rápido y moderno)',
			playwright: '🎭 Testing end-to-end',
			chromatic: '🖼️  Visual testing y comparación',
			snyk: '🔒 Escaneo de vulnerabilidades',
			renovate: '🔄 Actualizaciones automáticas',
			lighthouse: '⚡ Análisis de rendimiento',
			'bundle-analyzer': '📊 Análisis de tamaño de bundle',
			standalone: '🚀 Componentes standalone',
			sentry: '🐛 Monitoreo de errores',
			clarity: '👁️  Análisis de comportamiento de usuarios',
			vercel: '☁️  Despliegue en Vercel',
			github: '🐙 Integración con GitHub',
			codecov: '📈 Cobertura de código',
			feedback: '💬 Sistema de feedback automatizado',
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
	private async discoverAvailableAddons(): Promise<
		Array<{ id: string; name: string; description: string }>
	> {
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
	 * Verifica y configura acceso a UBITS local en el escritorio
	 */
	private async cloneAndSetupUBITS(): Promise<void> {
		const fs = await import('fs/promises');
		const path = await import('path');
		const os = await import('os');

		// Ruta a UBITS en el escritorio
		const desktopPath = path.join(os.homedir(), 'Desktop');
		const ubitsLocalPath = path.join(desktopPath, 'UBITS');

		try {
			// Verificar si existe la carpeta UBITS en el escritorio
			await fs.access(ubitsLocalPath);
			console.log('   ✅ Carpeta UBITS encontrada en el escritorio');
			console.log(`   📁 Ubicación: ${ubitsLocalPath}`);

			// Verificar que existan los templates
			const adminTemplate = path.join(ubitsLocalPath, 'packages/templates/template-admin.html');
			const colaboradorTemplate = path.join(
				ubitsLocalPath,
				'packages/templates/template-colaborador.html',
			);

			try {
				await fs.access(adminTemplate);
				console.log('   ✅ Template administrador encontrado');
			} catch {
				console.warn('   ⚠️  Template administrador no encontrado');
			}

			try {
				await fs.access(colaboradorTemplate);
				console.log('   ✅ Template colaborador encontrado');
			} catch {
				console.warn('   ⚠️  Template colaborador no encontrado');
			}
		} catch (error: any) {
			console.warn(
				'   ⚠️  No se encontró la carpeta UBITS en el escritorio:',
				error.message || error,
			);
			console.warn(`   💡 Asegúrate de que existe: ${ubitsLocalPath}`);
		}
	}

	/**
	 * Obtiene la ruta local de UBITS en el escritorio
	 */
	private getUBITSLocalPath(): string {
		const path = require('path');
		const os = require('os');
		return path.join(os.homedir(), 'Desktop', 'UBITS');
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

		// Usar getUrl si está disponible (con token), sino usar url directamente
		const getStorybookUrl = UBITS_PRESET.storybook.getUrl || ((path: string) => {
			const baseUrl = UBITS_PRESET.storybook.url.replace(/\/$/, '');
			return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
		});
		
		for (const component of UBITS_PRESET.components) {
			try {
				const manifestUrl = getStorybookUrl(`/components/${component}/manifest.json`);
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
		disableOtherModulesNavigation?: boolean,
	): Promise<string> {
		const canvasCreator = new CanvasCreator();
		return await canvasCreator.create(template, module, product, disableOtherModulesNavigation);
	}

	/**
	 * Crea ambos templates (administrador y colaborador)
	 * Retorna el path del template seleccionado y el del otro
	 */
	private async createBothTemplates(
		selectedTemplate: 'administrador' | 'colaborador',
		module: string,
		product?: string,
		disableOtherModulesNavigation?: boolean,
	): Promise<{ selectedCanvasPath: string; otherCanvasPath: string | null }> {
		const canvasCreator = new CanvasCreator();

		// Crear el template seleccionado
		const selectedCanvasPath = await canvasCreator.create(
			selectedTemplate,
			module,
			product,
			disableOtherModulesNavigation,
		);

		// Crear el otro template
		const otherTemplate: 'administrador' | 'colaborador' =
			selectedTemplate === 'administrador' ? 'colaborador' : 'administrador';
		const otherCanvasPath = await canvasCreator.create(
			otherTemplate,
			module,
			product,
			disableOtherModulesNavigation,
		);

		return {
			selectedCanvasPath,
			otherCanvasPath,
		};
	}

	/**
	 * Actualiza los enlaces entre templates en el sidebar
	 * Actualiza el botón del sidebar que cambia entre administrador y colaborador
	 */
	private async updateCrossTemplateLinks(
		selectedCanvasPath: string,
		otherCanvasPath: string,
		selectedTemplate: 'administrador' | 'colaborador',
	): Promise<void> {
		try {
			const fs = await import('fs/promises');
			const path = await import('path');

			// Obtener nombres de archivo relativos para usar en los enlaces
			const selectedFileName = path.basename(selectedCanvasPath);
			const otherFileName = path.basename(otherCanvasPath);

			// Leer ambos archivos
			const selectedContent = await fs.readFile(selectedCanvasPath, 'utf-8');
			const otherContent = await fs.readFile(otherCanvasPath, 'utf-8');

			// Inyectar script que actualice el enlace del botón del sidebar después de que se cargue
			// El sidebar se carga dinámicamente, así que necesitamos interceptar cuando se carga
			const updateScript = `
  <script>
    // Actualizar enlace del botón del sidebar que cambia entre templates
    (function() {
      // Definir targetFileName en el scope global de la función anónima
      const targetFileName = '${otherFileName}';
      console.log('🔗 [Wizard] Archivo objetivo configurado:', targetFileName);
      
      const updateTemplateLink = () => {
        console.log('🔗 [Wizard] Actualizando enlaces entre templates...');
        console.log('🔗 [Wizard] Archivo objetivo:', targetFileName);
        
        // 1. Buscar el botón del sidebar principal (data-section="admin" o "colaborador")
        // En modo colaborador, el primer botón es "Administrador" con data-section="admin"
        // En modo administrador, no hay botón "Colaborador" en el sidebar principal
        const sidebarButtons = document.querySelectorAll('.ubits-sidebar-nav-button[data-section="admin"], .ubits-sidebar-nav-button[data-section="colaborador"]');
        console.log('🔗 [Wizard] Botones del sidebar encontrados:', sidebarButtons.length);
        
        sidebarButtons.forEach(button => {
          const section = button.getAttribute('data-section');
          console.log('🔗 [Wizard] Botón encontrado con data-section:', section);
          
          // Interceptar el click del botón
          button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔗 [Wizard] Click interceptado en botón del sidebar, redirigiendo a:', targetFileName);
            window.location.href = targetFileName;
            return false;
          }, true); // Usar capture phase para interceptar antes que otros handlers
          
          // También actualizar onclick si existe
          if (button.onclick) {
            const originalOnclick = button.onclick;
            button.onclick = function(e) {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔗 [Wizard] onclick interceptado, redirigiendo a:', targetFileName);
              window.location.href = targetFileName;
              return false;
            };
          }
        });
        
        // 2. Buscar el botón del menú de perfil que cambia entre templates
        // El botón puede tener texto "Modo Administrador" o "Modo colaborador"
        // Buscar en múltiples lugares posibles
        const selectors = [
          '.ubits-sidebar-profile-menu-item',
          '[data-section="admin"]',
          '[data-section="colaborador"]',
          '.ubits-sidebar-profile-menu .ubits-sidebar-profile-menu-item',
          '.ubits-sidebar-profile-dropdown .ubits-sidebar-profile-menu-item',
          '.ubits-sidebar-profile-menu li',
          '.ubits-sidebar-profile-dropdown li',
          '[class*="profile-menu"] [class*="menu-item"]',
          '[class*="profile-dropdown"] [class*="menu-item"]'
        ];
        
        let menuItems = [];
        selectors.forEach(selector => {
          try {
            const found = document.querySelectorAll(selector);
            if (found.length > 0) {
              menuItems = Array.from(new Set([...menuItems, ...Array.from(found)]));
            }
          } catch (e) {
            // Ignorar errores de selector
          }
        });
        
        // También buscar por texto en todos los elementos clickeables
        const allClickable = document.querySelectorAll('li, button, a, div[onclick], div[role="button"]');
        allClickable.forEach(item => {
          const text = (item.textContent || item.innerText || '').trim();
          if (text.includes('Modo Administrador') || 
              text.includes('Modo administrador') ||
              text.includes('Modo colaborador') || 
              text.includes('Modo Colaborador')) {
            if (!menuItems.includes(item)) {
              menuItems.push(item);
            }
          }
        });
        
        console.log('🔗 [Wizard] Items del menú de perfil encontrados:', menuItems.length);
        
        menuItems.forEach(item => {
          const text = (item.textContent || item.innerText || '').trim();
          const isModeButton = 
            (text.includes('Modo Administrador') || text.includes('Modo administrador')) ||
            (text.includes('Modo colaborador') || text.includes('Modo Colaborador'));
          
          if (isModeButton) {
            console.log('🔗 [Wizard] Botón del menú de perfil encontrado:', text);
            console.log('🔗 [Wizard] Elemento:', item);
            console.log('🔗 [Wizard] Clases:', item.className);
            console.log('🔗 [Wizard] Tag:', item.tagName);
            
            // Actualizar href PRIMERO para que apunte al archivo correcto
            if (item.tagName === 'A') {
              item.href = targetFileName;
              item.setAttribute('href', targetFileName);
            } else if (item.querySelector('a')) {
              const link = item.querySelector('a');
              if (link) {
                link.href = targetFileName;
                link.setAttribute('href', targetFileName);
              }
            }
            
            // También actualizar data-href si existe
            if (item.hasAttribute('data-href')) {
              item.setAttribute('data-href', targetFileName);
            }
            
            // Interceptar el click con capture phase (máxima prioridad)
            const clickHandler = function(e) {
              console.log('🔗 [Wizard] ✅ Click interceptado en menú de perfil, redirigiendo a:', targetFileName);
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              e.cancelBubble = true;
              // Navegar directamente sin abrir nueva pestaña
              window.location.href = targetFileName;
              return false;
            };
            
            // Agregar listener con capture (máxima prioridad)
            item.addEventListener('click', clickHandler, { capture: true, passive: false });
            
            // También agregar sin capture como backup
            item.addEventListener('click', clickHandler, { capture: false, passive: false });
            
            // Actualizar onclick si existe (sobrescribir completamente)
              item.onclick = function(e) {
              console.log('🔗 [Wizard] ✅ onclick interceptado en menú, redirigiendo a:', targetFileName);
              if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                e.cancelBubble = true;
              }
                window.location.href = targetFileName;
                return false;
              };
            
            // Actualizar atributo onclick
            item.setAttribute('onclick', "event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation(); event.cancelBubble = true; window.location.href='" + targetFileName + "'; return false;");
            
            // Buscar cualquier elemento hijo que pueda ser clickeable
            const clickableChildren = item.querySelectorAll('a, button, [onclick], [role="button"], span, div');
            clickableChildren.forEach(child => {
              child.addEventListener('click', clickHandler, { capture: true, passive: false });
              if (child.tagName === 'A') {
                child.href = targetFileName;
                child.setAttribute('href', targetFileName);
              }
            });
          }
        });
        
        console.log('🔗 [Wizard] ✅ Enlaces actualizados');
      };
      
      // Ejecutar cuando el DOM esté listo
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateTemplateLink);
      } else {
        updateTemplateLink();
      }
      
      // También ejecutar después de delays para asegurar que el sidebar se haya cargado dinámicamente
      setTimeout(updateTemplateLink, 500);
      setTimeout(updateTemplateLink, 1000);
      setTimeout(updateTemplateLink, 2000);
      setTimeout(updateTemplateLink, 3000);
      
      // Observar cambios en el DOM para cuando el sidebar o menú de perfil se cargue dinámicamente
      const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === 1) { // Element node
                if (node.classList && (
                  node.classList.contains('ubits-sidebar') ||
                  node.classList.contains('ubits-sidebar-nav-button') ||
                  node.classList.contains('ubits-sidebar-profile-menu') ||
                  node.classList.contains('ubits-sidebar-profile-dropdown') ||
                  node.classList.contains('ubits-sidebar-profile-menu-item') ||
                  node.querySelector('.ubits-sidebar-nav-button') ||
                  node.querySelector('.ubits-sidebar-profile-menu') ||
                  node.querySelector('.ubits-sidebar-profile-dropdown')
                )) {
                  shouldUpdate = true;
                }
              }
            });
          }
        });
        if (shouldUpdate) {
          setTimeout(updateTemplateLink, 100);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
      
      // Interceptar TODOS los clicks en el documento y verificar si es el botón de cambio de modo
      // Esto es más agresivo pero asegura que funcione incluso si el menú se carga dinámicamente
      // IMPORTANTE: targetFileName debe estar en el scope superior para que esté disponible aquí
      // Usar capture phase con máxima prioridad para interceptar ANTES que components-loader.js
      document.addEventListener('click', function(e) {
        const target = e.target;
        if (!target) return;
        
        // Verificar si el click es en el avatar para abrir el menú
        if (target.closest('.ubits-sidebar-profile-avatar') ||
            target.closest('[class*="profile-avatar"]') ||
            target.closest('[class*="user-avatar"]')) {
          // El menú de perfil se está abriendo, actualizar después de un delay
          setTimeout(updateTemplateLink, 200);
          setTimeout(updateTemplateLink, 500);
          return;
        }
        
        // Verificar si el click es en un elemento que contiene "Modo colaborador" o "Modo Administrador"
        const clickedElement = target.closest('li, button, a, div[onclick], div[role="button"], [class*="menu-item"], [class*="profile-menu"]');
        if (clickedElement) {
          const text = (clickedElement.textContent || clickedElement.innerText || '').trim();
          const isModeButton = 
            (text.includes('Modo Administrador') || text.includes('Modo administrador')) ||
            (text.includes('Modo colaborador') || text.includes('Modo Colaborador'));
          
          if (isModeButton) {
            console.log('🔗 [Wizard] 🎯 Click detectado en botón de cambio de modo:', text);
            console.log('🔗 [Wizard] Elemento:', clickedElement);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.cancelBubble = true; // IE compatibility
            console.log('🔗 [Wizard] ✅ Redirigiendo a:', targetFileName);
            // Navegar directamente sin abrir nueva pestaña
            window.location.href = targetFileName;
            return false;
          }
        }
      }, { capture: true, passive: false }); // Capture phase con máxima prioridad
      
      // También interceptar en el phase de bubbling como backup
      document.addEventListener('click', function(e) {
        const target = e.target;
        if (!target) return;
        
        const clickedElement = target.closest('li, button, a, div[onclick], div[role="button"], [class*="menu-item"], [class*="profile-menu"]');
        if (clickedElement) {
          const text = (clickedElement.textContent || clickedElement.innerText || '').trim();
          const isModeButton = 
            (text.includes('Modo Administrador') || text.includes('Modo administrador')) ||
            (text.includes('Modo colaborador') || text.includes('Modo Colaborador'));
          
          if (isModeButton) {
            console.log('🔗 [Wizard] 🎯 Click detectado (bubbling phase) en botón de cambio de modo:', text);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.cancelBubble = true;
            console.log('🔗 [Wizard] ✅ Redirigiendo a:', targetFileName);
            window.location.href = targetFileName;
            return false;
          }
        }
      }, { capture: false, passive: false }); // Bubbling phase como backup
    })();
  </script>
`;

			// Insertar el script lo más temprano posible (justo después de <body>)
			// para que se ejecute ANTES que components-loader.js
			let updatedSelectedContent = selectedContent;
			let updatedOtherContent = otherContent;

			// Insertar script en el template seleccionado (apunta al otro)
			// Intentar insertar justo después de <body> para máxima prioridad
			if (updatedSelectedContent.includes('<body')) {
				// Buscar la etiqueta <body> y insertar el script justo después
				updatedSelectedContent = updatedSelectedContent.replace(
					/(<body[^>]*>)/,
					`$1\n${updateScript}`,
				);
			} else if (updatedSelectedContent.includes('</body>')) {
				// Fallback: insertar antes del cierre de </body>
				updatedSelectedContent = updatedSelectedContent.replace(
					'</body>',
					`${updateScript}\n</body>`,
				);
			}

			// Para el otro template, necesitamos cambiar la referencia al template seleccionado
			const otherUpdateScript = updateScript.replace(otherFileName, selectedFileName);
			if (updatedOtherContent.includes('<body')) {
				// Buscar la etiqueta <body> y insertar el script justo después
				updatedOtherContent = updatedOtherContent.replace(
					/(<body[^>]*>)/,
					`$1\n${otherUpdateScript}`,
				);
			} else if (updatedOtherContent.includes('</body>')) {
				// Fallback: insertar antes del cierre de </body>
				updatedOtherContent = updatedOtherContent.replace(
					'</body>',
					`${otherUpdateScript}\n</body>`,
				);
			}

			// Guardar archivos actualizados
			await fs.writeFile(selectedCanvasPath, updatedSelectedContent, 'utf-8');
			await fs.writeFile(otherCanvasPath, updatedOtherContent, 'utf-8');
		} catch (error) {
			console.warn('   ⚠️  Error actualizando enlaces entre templates:', error);
		}
	}

	/**
	 * Pregunta si quiere configurar GitHub y luego configura si es necesario
	 */
	private async askAndConfigureGitHub(): Promise<string | null> {
		// Solo omitir si está explícitamente configurado para saltar
		if (process.env.AUTORUN_SKIP_GITHUB === 'true') {
			return null;
		}

		// Verificar si hay URL de GitHub en variables de entorno
		const githubUrlEnv = process.env.AUTORUN_GITHUB_URL;
		if (githubUrlEnv) {
			// Si hay variable de entorno, configurar directamente
			return await this.configureGitHub(githubUrlEnv);
		}

		// Si estamos en modo automático y se agotaron las respuestas, usar default (NO configurar)
		if (this.prompt.isAuto() === false && this.prompt.hasAutoAnswers()) {
			// Se agotaron las respuestas automáticas, usar default (NO)
			console.log('   ℹ️  Continuando sin configurar GitHub por el momento (modo automático)\n');
			return null;
		}

		// Preguntar si quiere configurar GitHub ahora (siempre en modo interactivo)
		const wantsToConfigure = await this.prompt.confirm(
			'¿Quieres configurar GitHub ahora? (puedes configurarlo después)',
			false, // Por defecto: NO (continuar sin configurar)
		);

		if (!wantsToConfigure) {
			console.log('   ℹ️  Continuando sin configurar GitHub por el momento\n');
			return null;
		}

		// Si quiere configurar, preguntar por la URL
		return await this.configureGitHub();
	}

	/**
	 * Configura GitHub preguntando por la URL del repositorio
	 * Maneja tanto modo automático como interactivo
	 */
	private async configureGitHub(githubUrlEnv?: string): Promise<string | null> {
		try {
			// Solo omitir si está explícitamente configurado para saltar
			if (process.env.AUTORUN_SKIP_GITHUB === 'true') {
				return null;
			}

			// Usar el parámetro si se proporciona, o verificar variable de entorno
			const githubUrlFromEnv = githubUrlEnv || process.env.AUTORUN_GITHUB_URL;
			if (githubUrlFromEnv) {
				const configManager = (this.hub as any).configManager;
				if (configManager) {
					const currentConfig = await configManager.getConfig();
					const updatedConfig = {
						...currentConfig,
						autorun: {
							...(currentConfig.autorun || {}),
							addons: {
								...(currentConfig.autorun?.addons || {}),
								config: {
									...(currentConfig.autorun?.addons?.config || {}),
									github: {
										repositoryUrl: githubUrlFromEnv.trim(),
										branch: 'main',
										autoCommit: true,
									},
								},
							},
						},
					};
					await configManager.saveConfig(updatedConfig);
				}
				return githubUrlFromEnv.trim();
			}

			// Modo interactivo: preguntar al usuario
			const githubUrl = await this.prompt.question(
				'🐙 ¿Cuál es la URL de tu repositorio GitHub? (presiona Enter para omitir): ',
			);

			if (!githubUrl || githubUrl.trim() === '') {
				return null;
			}

			// Guardar configuración de GitHub
			const configManager = (this.hub as any).configManager;
			if (configManager) {
				const currentConfig = await configManager.getConfig();
				const updatedConfig = {
					...currentConfig,
					autorun: {
						...(currentConfig.autorun || {}),
						addons: {
							...(currentConfig.autorun?.addons || {}),
							config: {
								...(currentConfig.autorun?.addons?.config || {}),
								github: {
									repositoryUrl: githubUrl.trim(),
									branch: 'main',
									autoCommit: true,
								},
							},
						},
					},
				};
				await configManager.saveConfig(updatedConfig);
			}

			return githubUrl.trim();
		} catch (error: any) {
			// Si el error es porque readline está cerrado, simplemente omitir
			if (error.code === 'ERR_USE_AFTER_CLOSE' || error.message?.includes('readline')) {
				console.log('   ℹ️  Configuración de GitHub omitida (modo automático)');
				return null;
			}
			console.warn('   ⚠️  Error configurando GitHub:', error.message || error);
			return null;
		}
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
