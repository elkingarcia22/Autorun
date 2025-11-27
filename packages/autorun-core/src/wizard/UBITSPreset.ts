/**
 * UBITSPreset
 *
 * Configuración predefinida de add-ons y componentes para proyectos UBITS
 */

export interface UBITSConfig {
	storybook: {
		url: string;
		useStorybookComponents: boolean;
		loadTemplate: 'desktop';
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
		url: 'https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app',
		useStorybookComponents: true,
		loadTemplate: 'desktop',
	},
	// Add-ons optimizados para prototipos de alta calidad UBITS
	// Todos son complementarios, sin solapamientos
	addons: [
		// Desarrollo y Componentes
		'storybook', // Desarrollo y documentación de componentes
		'figma-sync', // Sincronización de tokens desde Figma
		
		// Calidad de Código (Complementarios)
		'eslint', // Detección de errores
		'prettier', // Formateo de código
		
		// Testing (Todos complementarios - diferentes propósitos)
		'vitest', // Unit testing (más rápido que Jest, ESM nativo)
		'playwright', // E2E testing (flujos completos)
		'chromatic', // Visual testing (screenshots, comparación)
		
		// Seguridad (Complementarios)
		'snyk', // Security scanning (detecta vulnerabilidades)
		'renovate', // Actualizaciones automáticas (aplica parches)
		
		// Performance (Complementarios - diferentes aspectos)
		'lighthouse', // Auditoría web (runtime performance)
		'bundle-analyzer', // Análisis de bundles (build-time)
		'standalone', // Builds optimizados
		
		// Monitoreo (Complementarios - diferentes propósitos)
		'sentry', // Error monitoring técnico
		'clarity', // Analytics y comportamiento de usuarios
		
		// Deployment y CI/CD (Complementarios)
		'vercel', // Deploy automático
		'github', // Versionado y CI/CD
		'codecov', // Code coverage tracking
		
		// Feedback
		'feedback', // Feedback automatizado
	],
	components: [
		'welcome',
		'button-feedback',
		'alert',
		'mask',
		'button',
	],
	templates: {
		administrador: {
			type: 'administrador',
			modules: [
				'inicio',
				'colaboradores',
				'aprendizaje',
				'desempeno',
				'diagnostico',
				'encuestas',
				'api',
				'centro-ayuda',
				'mi-perfil',
			],
			sidebar: {
				variant: 'administrador',
				enabledModules: [
					'inicio',
					'colaboradores',
					'aprendizaje',
					'desempeno',
					'diagnostico',
					'encuestas',
					'api',
					'centro-ayuda',
					'mi-perfil',
				],
			},
			components: [
				'sidebar',
				'header',
				'dashboard',
				'tables',
				'forms',
			],
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
			components: [
				'sidebar',
				'header',
				'cards',
				'forms',
			],
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
		subnavVariant: 'template',
		products: [], // Módulo solo, sin productos
	},
	desempeno: {
		id: 'desempeno',
		name: 'Desempeño',
		subnavVariant: 'desempeno',
		products: [
			{ id: 'evaluaciones-360', name: 'Evaluaciones 360', icon: 'far fa-chart-pie' },
			{ id: 'objetivos', name: 'Objetivos', icon: 'far fa-bullseye' },
			{ id: 'metricas', name: 'Métricas', icon: 'far fa-chart-line' },
			{ id: 'reportes', name: 'Reportes', icon: 'far fa-file-alt' },
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
};

