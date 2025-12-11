/**
 * UBITSPreset
 *
 * Configuración predefinida de add-ons y componentes para proyectos UBITS
 */

export interface UBITSConfig {
	storybook: {
		url: string;
		fallbackUrl?: string; // URL de fallback si Vercel falla (GitHub)
		bypassToken?: string;
		useStorybookComponents: boolean;
		loadTemplate: 'desktop';
		getUrl?: (path?: string) => string;
		getFallbackUrl?: (path?: string) => string;
	};
	addons: string[];
	components: string[];
	templates: {
		administrador: UBITSTemplate;
		colaborador: UBITSTemplate;
	};
	modules: string[];
}

export interface UBITSTemplate {
	type: 'administrador' | 'colaborador';
	modules: string[];
	sidebar: {
		variant: 'administrador' | 'colaborador';
		enabledModules: string[];
	};
	components: string[];
}

export interface ModuleProduct {
	id: string;
	name: string;
	icon?: string;
	url?: string;
}

export interface ModuleConfig {
	id: string;
	name: string;
	subnavVariant: string;
	products: ModuleProduct[];
}

/**
 * Preset predefinido para proyectos UBITS
 */
export const UBITS_PRESET: UBITSConfig = {
	storybook: {
		// ⚠️ CRÍTICO: Usar URL principal que siempre apunta al deployment más reciente en producción
		// URL principal: https://ubits-storybook10.vercel.app/ (siempre apunta al deployment más reciente)
		// NO usar URLs de deployments específicos (pueden estar desactualizados)
		// Token: dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT
		url: 'https://ubits-storybook10.vercel.app',
		// ⚠️ FALLBACK: URL de GitHub como respaldo si Vercel falla
		// Repositorio: https://github.com/elkingarcia22/UBITS
		// Si GitHub Pages está configurado, usar: https://elkingarcia22.github.io/UBITS/
		// Si no, usar raw GitHub: https://raw.githubusercontent.com/elkingarcia22/UBITS/main/
		fallbackUrl: 'https://github.com/elkingarcia22/UBITS',
		bypassToken: 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT',
		useStorybookComponents: true,
		loadTemplate: 'desktop',
		/**
		 * Construye la URL de Storybook con el token de bypass si está disponible
		 * @param path - Ruta adicional (ej: '/index.json', '/components/button/manifest.json')
		 */
		getUrl: (path: string = '') => {
			const baseUrl = UBITS_PRESET.storybook.url.replace(/\/$/, '');
			const cleanPath = path.startsWith('/') ? path : `/${path}`;
			if (UBITS_PRESET.storybook.bypassToken) {
				// Agregar token como query parameter para bypass
				const separator = cleanPath.includes('?') ? '&' : '?';
				return `${baseUrl}${cleanPath}${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
			}
			return `${baseUrl}${cleanPath}`;
		},
		/**
		 * Construye la URL de fallback (GitHub) para Storybook
		 * @param path - Ruta adicional (ej: '/index.json', '/components/button/manifest.json')
		 */
		getFallbackUrl: (path: string = '') => {
			const fallbackBase =
				UBITS_PRESET.storybook.fallbackUrl || 'https://github.com/elkingarcia22/UBITS';
			const cleanPath = path.startsWith('/') ? path : `/${path}`;

			// Intentar GitHub Pages primero (si está configurado)
			// Si no funciona, usar raw GitHub para archivos específicos
			if (path.includes('.json') || path.includes('.js') || path.includes('.css')) {
				// Para archivos, usar raw GitHub
				return `https://raw.githubusercontent.com/elkingarcia22/UBITS/main${cleanPath}`;
			}

			// Para URLs de navegación, usar GitHub Pages o el repositorio
			// Intentar GitHub Pages primero
			const githubPagesUrl = `https://elkingarcia22.github.io/UBITS${cleanPath}`;
			// Si no funciona, usar el repositorio de GitHub
			return githubPagesUrl;
		},
	},
	// Add-ons optimizados para prototipos de alta calidad UBITS
	// Seleccionados: 1,2,3,4,7,12,14,15,16,18,19
	addons: [
		// 1. Desarrollo y Componentes
		'storybook', // 📚 Desarrollo y documentación de componentes
		'figma-sync', // 🎨 Sincronización de tokens desde Figma

		// 3-4. Calidad de Código
		'eslint', // 🔍 Detección de errores de código
		'prettier', // ✨ Formateo automático de código

		// 7. Testing Visual
		'chromatic', // 🖼️ Visual testing y comparación

		// 12. Componentes Standalone
		'standalone', // 🚀 Componentes standalone

		// 14. Análisis de Usuarios
		'clarity', // 👁️ Análisis de comportamiento de usuarios

		// 15-16. Despliegue e Integración
		'vercel', // ☁️ Despliegue en Vercel
		'github', // 🐙 Integración con GitHub

		// 18. Feedback
		'feedback', // 💬 Sistema de feedback automatizado

		// 19. Problem Tracker
		'problem-tracker', // 🤖 Sistema automático de captura de problemas y soluciones

		// 20. Auto Reload
		'auto-reload', // 🔄 Recarga automática de página y logs automáticos cuando hay errores

		// 21. Pre-Implementation Check
		'pre-implementation-check', // ✅ Verifica automáticamente que se sigan todos los pasos obligatorios antes de implementar componentes

		// 22. n8n Integration
		'n8n', // 🔄 Automatización de workflows con n8n y MCP - Acceso a 525+ nodos

		// 23. Google Sheets Integration
		'google-sheets', // 📊 Creación y gestión de hojas de cálculo con Google Sheets y MCP
	],
	components: ['welcome', 'button-feedback', 'alert', 'mask', 'button'],
	templates: {
		administrador: {
			type: 'administrador',
			modules: [
				'inicio',
				'empresa',
				'aprendizaje',
				'desempeno',
				'diagnostico',
				'encuestas',
				// api y centro-ayuda están en footer, no en módulos principales
			],
			sidebar: {
				variant: 'administrador',
				enabledModules: [
					'inicio',
					'empresa',
					'aprendizaje',
					'desempeno',
					'diagnostico',
					'encuestas',
					'api',
					'centro-ayuda',
					'mi-perfil',
				],
			},
			components: ['sidebar', 'header', 'dashboard', 'tables', 'forms'],
		},
		colaborador: {
			type: 'colaborador',
			modules: [
				'inicio',
				'aprendizaje',
				'diagnostico',
				'desempeno',
				'encuestas',
				'reclutamiento',
				'planes',
				'ubits-ai',
				'mi-perfil',
			],
			sidebar: {
				variant: 'colaborador',
				enabledModules: [
					'inicio',
					'aprendizaje',
					'diagnostico',
					'desempeno',
					'encuestas',
					'reclutamiento',
					'planes',
					'ubits-ai',
					'mi-perfil',
				],
			},
			components: ['sidebar', 'header', 'cards', 'forms'],
		},
	},
	modules: [
		'inicio',
		'aprendizaje',
		'desempeno',
		'colaboradores',
		'diagnostico',
		'encuestas',
		'reclutamiento',
		'planes',
		'ubits-ai',
		'api',
		'centro-ayuda',
		'mi-perfil',
	],
};

/**
 * Configuración de módulos con sus productos (tabs del subnav)
 */
export const UBITS_MODULES_CONFIG: Record<string, ModuleConfig> = {
	inicio: {
		id: 'inicio',
		name: 'Inicio',
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
	aprendizaje: {
		id: 'aprendizaje',
		name: 'Aprendizaje',
		subnavVariant: 'aprendizaje',
		products: [
			// Para administrador
			{ id: 'lms-cursos', name: 'LMS - Cursos propios', icon: 'far fa-book' },
			{ id: 'plan-formacion', name: 'Plan de formación', icon: 'far fa-clipboard-list-check' },
			{ id: 'certificados', name: 'Certificados', icon: 'far fa-file-certificate' },
			{ id: 'metricas-empresa', name: 'Métricas de empresa', icon: 'far fa-chart-line' },
			// Para colaborador
			{ id: 'inicio', name: 'Inicio', icon: 'far fa-home' },
			{ id: 'catalogo', name: 'Catálogo', icon: 'far fa-book' },
			{ id: 'corporativa', name: 'U. Corporativa', icon: 'far fa-building-columns' },
			{ id: 'zona-estudio', name: 'Zona de estudio', icon: 'far fa-books' },
		],
	},
	desempeno: {
		id: 'desempeno',
		name: 'Desempeño',
		subnavVariant: 'desempeno',
		products: [
			// Para administrador
			{ id: 'evaluations', name: 'Evaluaciones 360', icon: 'far fa-chart-pie' },
			{ id: 'objectives', name: 'Objetivos', icon: 'far fa-bullseye' },
			{ id: 'matriz-talento', name: 'Matriz de Talento', icon: 'far fa-sitemap' },
			// Para colaborador
			{ id: 'evaluaciones-360', name: 'Evaluaciones 360', icon: 'far fa-chart-pie' },
			{ id: 'objetivos', name: 'Objetivos', icon: 'far fa-bullseye' },
			{ id: 'metricas', name: 'Métricas', icon: 'far fa-chart-line' },
			{ id: 'reportes', name: 'Reportes', icon: 'far fa-file-alt' },
		],
	},
	empresa: {
		id: 'empresa',
		name: 'Empresa',
		subnavVariant: 'template',
		products: [
			{ id: 'gestion-usuarios', name: 'Gestión de usuarios', icon: 'far fa-users' },
			{ id: 'organigrama', name: 'Organigrama', icon: 'far fa-sitemap' },
			{ id: 'datos-empresa', name: 'Datos de empresa', icon: 'far fa-building' },
			{ id: 'personalizacion', name: 'Personalización', icon: 'far fa-paint-brush' },
			{ id: 'roles-permisos', name: 'Roles y permisos', icon: 'far fa-user-shield' },
			{ id: 'comunicaciones', name: 'Comunicaciones', icon: 'far fa-comments' },
		],
	},
	colaboradores: {
		id: 'colaboradores',
		name: 'Colaboradores',
		subnavVariant: 'template',
		products: [
			{ id: 'gestion-usuarios', name: 'Gestión de usuarios', icon: 'far fa-users' },
			{ id: 'organigrama', name: 'Organigrama', icon: 'far fa-sitemap' },
			{ id: 'datos-empresa', name: 'Datos de empresa', icon: 'far fa-building' },
			{ id: 'personalizacion', name: 'Personalización', icon: 'far fa-paint-brush' },
			{ id: 'roles-permisos', name: 'Roles y permisos', icon: 'far fa-user-shield' },
			{ id: 'comunicaciones', name: 'Comunicaciones', icon: 'far fa-comments' },
		],
	},
	reportes: {
		id: 'reportes',
		name: 'Reportes',
		subnavVariant: 'template',
		products: [
			{ id: 'dashboard', name: 'Dashboard', icon: 'far fa-chart-bar' },
			{ id: 'exportar', name: 'Exportar', icon: 'far fa-download' },
		],
	},
	configuracion: {
		id: 'configuracion',
		name: 'Configuración',
		subnavVariant: 'template',
		products: [
			{ id: 'general', name: 'General', icon: 'far fa-cog' },
			{ id: 'usuarios', name: 'Usuarios', icon: 'far fa-user-shield' },
			{ id: 'integraciones', name: 'Integraciones', icon: 'far fa-plug' },
		],
	},
	'mi-perfil': {
		id: 'mi-perfil',
		name: 'Mi Perfil',
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
	diagnostico: {
		id: 'diagnostico',
		name: 'Diagnóstico',
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
	encuestas: {
		id: 'encuestas',
		name: 'Encuestas',
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
	api: {
		id: 'api',
		name: 'API',
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
	'centro-ayuda': {
		id: 'centro-ayuda',
		name: 'Centro de Ayuda',
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
	reclutamiento: {
		id: 'reclutamiento',
		name: 'Reclutamiento',
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
	planes: {
		id: 'planes',
		name: 'Planes',
		subnavVariant: 'template',
		products: [
			{ id: 'planes', name: 'Planes', icon: 'far fa-calendar' },
			{ id: 'tareas', name: 'Tareas', icon: 'far fa-tasks' },
		],
	},
	'ubits-ai': {
		id: 'ubits-ai',
		name: 'UBITS AI',
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
};

/**
 * Configuración de add-ons para UBITS
 */
export const UBITS_ADDONS_CONFIG = {
	storybook: {
		port: 6006,
		host: 'localhost',
		buildDir: 'storybook-static',
		autoStart: false,
		framework: 'react',
	},
	feedback: {
		webhookUrl: '', // Se configurará después
		enabled: true,
		showWelcome: true,
		showFeedbackButton: true,
		storybookUrl: UBITS_PRESET.storybook.url,
		useStorybookComponents: true,
	},
	'problem-tracker': {
		enabled: true,
		persistLocally: true,
		problemsDirectory: 'docs/problems-solutions',
		indexFile: 'docs/problems-solutions/index.json',
		autoDetectProblems: true,
		autoSuggestSolutions: true,
		autoUpdateGuides: false,
		categories: ['headersection', 'contentmanager', 'datatable', 'componentes', 'otros'],
	},
	'auto-reload': {
		enabled: true,
		reloadOnFileChange: true,
		autoLogErrors: true,
		reloadAfterFix: true,
	},
	'pre-implementation-check': {
		enabled: true,
		blockOnMissingSteps: true,
		registerInProblemTracker: true,
		requiredSteps: ['storybookVercel', 'storybookMCP', 'documentation'],
	},
	vercel: {
		autoDeploy: true,
		productionBranch: 'main',
	},
	github: {
		autoCommit: true,
		branch: 'main',
	},
	clarity: {
		projectId: '', // Se configurará después
		enabled: true,
	},
	standalone: {
		optimizeStorybookBuild: true,
		extractComponents: true,
		componentsOutputDir: 'dist/components',
	},
	// Calidad de Código
	eslint: {
		configFile: '.eslintrc.ubits.json',
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		fix: true,
		format: 'stylish',
		maxWarnings: 0,
		preCommit: true,
		rules: 'ubits-strict', // Reglas estrictas UBITS
	},
	prettier: {
		config: '@ubits/prettier-config',
		autoFormat: true,
		preCommit: true,
	},
	// Testing
	vitest: {
		enabled: true,
		coverage: true,
		coverageThreshold: {
			global: {
				branches: 80,
				functions: 80,
				lines: 80,
				statements: 80,
			},
		},
		watch: false,
		ui: false,
	},
	playwright: {
		headed: false,
		workers: 4,
		retries: 2,
	},
	chromatic: {
		enabled: true,
		projectToken: '', // Se configurará después
		buildScriptName: 'build-storybook',
		storybookBuildDir: 'storybook-static',
		autoAcceptChanges: false, // Requiere aprobación manual
	},
	// Seguridad
	snyk: {
		enabled: true,
		token: '', // Se configurará después
		severityThreshold: 'medium',
		failOnError: true, // Bloquear deploy si hay vulnerabilidades
		monitor: true,
		testOnBuild: true,
	},
	renovate: {
		enabled: true,
		automerge: false,
		automergeType: 'pr',
		platform: 'github',
	},
	// Performance
	lighthouse: {
		enabled: true,
		testOnDeploy: true,
		minScore: 90, // Score mínimo requerido
		categories: ['performance', 'accessibility', 'best-practices', 'seo'],
		emulatedFormFactor: 'mobile',
	},
	bundleAnalyzer: {
		enabled: true,
		analyzeStorybook: true,
		analyzeComponents: true,
		maxBundleSize: 500, // KB
	},
	// Monitoreo
	sentry: {
		enabled: true,
		dsn: '', // Se configurará después
		environment: 'production',
		tracesSampleRate: 1.0,
		sampleRate: 1.0,
	},
	// Documentación
	// Nota: Para prototipos, Storybook es suficiente
	// Docusaurus solo si necesitas documentación general del proyecto
	// docusaurus: {
	// 	enabled: false, // Opcional para prototipos
	// 	autoGenerate: true,
	// 	source: 'storybook',
	// 	includeComponents: true,
	// 	includeTokens: true,
	// 	includeExamples: true,
	// },
	// CI/CD
	codecov: {
		enabled: true,
		token: '', // Se configurará después
		minCoverage: 80, // Coverage mínimo requerido
	},
	// Figma Sync
	'figma-sync': {
		enabled: true,
		fileKey: '', // Se configurará después
		token: '', // Se configurará después
		syncTokens: true,
		syncComponents: false, // Solo tokens por ahora
	},
	n8n: {
		mode: 'stdio',
		logLevel: 'error',
		disableConsoleOutput: true,
		n8nApiUrl: '', // Se configurará después (opcional)
		n8nApiKey: '', // Se configurará después (opcional)
	},
	'google-sheets': {
		googleProjectId: '', // Se configurará después
		googleApplicationCredentials: '', // Se configurará después (ruta al JSON key)
		googleServiceAccountKey: '', // Se configurará después (JSON string opcional)
		googlePrivateKey: '', // Se configurará después (opcional)
		googleClientEmail: '', // Se configurará después (opcional)
	},
};
