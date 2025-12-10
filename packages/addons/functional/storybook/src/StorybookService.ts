/**
 * StorybookService
 *
 * Servicio que maneja todas las operaciones de Storybook:
 * - Iniciar/detener servidor de desarrollo
 * - Build de Storybook estático
 * - Generación automática de stories
 * - Gestión de configuración
 */

import { execSync, spawn, ChildProcess } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface StorybookConfig {
	port?: number;
	host?: string;
	buildDir?: string;
	configDir?: string;
	storiesDir?: string;
	autoStart?: boolean;
	framework?: 'react' | 'vue' | 'angular' | 'web-components' | 'html';
	staticDirs?: string[];
	addons?: string[];
}

export interface StorybookProcess {
	pid: number;
	port: number;
	url: string;
}

export class StorybookService {
	private config: StorybookConfig;
	private projectPath: string;
	private process?: ChildProcess;
	private initialized = false;

	constructor(config: StorybookConfig, projectPath: string = process.cwd()) {
		this.config = {
			port: 6006,
			host: 'localhost',
			buildDir: 'storybook-static',
			configDir: '.storybook',
			storiesDir: 'stories',
			autoStart: false,
			framework: 'react',
			staticDirs: [],
			addons: [],
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa el servicio y verifica dependencias
	 */
	async initialize(): Promise<void> {
		// Crear directorios necesarios si no existen
		await this.ensureDirectories();

		// Generar configuración si no existe (siempre, para tener todo listo)
		if (!this.hasStorybookConfig()) {
			try {
				await this.generateConfig();
				console.log('✅ Configuración de Storybook generada automáticamente');
			} catch (error) {
				// Si falla, continuar sin configuración
			}
		}

		// Verificar que Storybook esté instalado
		if (!this.isStorybookInstalled()) {
			// No instalar automáticamente durante initialize, solo preparar configuración
			this.initialized = false;
			return;
		}

		this.initialized = true;
		console.log('✅ Storybook Service: Inicializado correctamente');
	}

	/**
	 * Verifica si Storybook está instalado
	 */
	private isStorybookInstalled(): boolean {
		try {
			const packageJsonPath = path.join(this.projectPath, 'package.json');
			if (!existsSync(packageJsonPath)) {
				return false;
			}
			const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
			const allDeps = {
				...packageJson.dependencies,
				...packageJson.devDependencies,
			};

			return Object.keys(allDeps).some((dep) => dep.includes('storybook'));
		} catch {
			return false;
		}
	}

	/**
	 * Verifica si existe configuración de Storybook
	 */
	private hasStorybookConfig(): boolean {
		const configDir = path.join(this.projectPath, this.config.configDir!);
		const mainJsPath = path.join(configDir, 'main.js');
		const mainTsPath = path.join(configDir, 'main.ts');
		return existsSync(mainJsPath) || existsSync(mainTsPath);
	}

	/**
	 * Instala Storybook automáticamente
	 */
	private async installStorybook(): Promise<void> {
		const { execSync } = await import('child_process');
		const framework = this.config.framework || 'react';
		
		try {
			console.log('📦 Instalando Storybook automáticamente...');
			
			// Instalar Storybook según el framework
			let installCommand = '';
			switch (framework) {
				case 'react':
					installCommand = 'npm install --save-dev @storybook/react-webpack5@^8.0.0 @storybook/addon-essentials@^8.0.0';
					break;
				case 'vue':
					installCommand = 'npm install --save-dev @storybook/vue3 @storybook/addon-essentials';
					break;
				case 'angular':
					installCommand = 'npm install --save-dev @storybook/angular @storybook/addon-essentials';
					break;
				case 'web-components':
					installCommand = 'npm install --save-dev @storybook/web-components @storybook/addon-essentials';
					break;
				case 'html':
					installCommand = 'npm install --save-dev @storybook/html @storybook/addon-essentials';
					break;
				default:
					installCommand = 'npm install --save-dev @storybook/react-webpack5@^8.0.0 @storybook/addon-essentials@^8.0.0';
			}

			execSync(installCommand, {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log('✅ Storybook instalado correctamente');
		} catch (error: any) {
			console.warn('⚠️  No se pudo instalar Storybook automáticamente. Ejecuta manualmente: npm install --save-dev @storybook/react @storybook/addon-essentials');
			throw error;
		}
	}

	/**
	 * Asegura que existen
	 */
	private async ensureDirectories(): Promise<void> {
		const dirs = [this.config.configDir!, this.config.storiesDir!, this.config.buildDir!];

		for (const dir of dirs) {
			const fullPath = path.join(this.projectPath, dir);
			try {
				await fs.mkdir(fullPath, { recursive: true });
			} catch (error) {
				// Ignorar errores si el directorio ya existe
			}
		}
	}

	/**
	 * Inicia el servidor de desarrollo de Storybook
	 */
	async start(): Promise<StorybookProcess> {
		if (this.process) {
			throw new Error('Storybook ya está ejecutándose');
		}

		if (!this.initialized) {
			await this.initialize();
		}

		// Verificar que Storybook esté instalado
		if (!this.isStorybookInstalled()) {
			// Intentar instalar automáticamente cuando se intenta usar
			console.log('📦 Storybook no está instalado. Instalando automáticamente...');
			try {
				await this.installStorybook();
				// Re-inicializar después de instalar
				await this.initialize();
			} catch (error) {
				throw new Error('Storybook no está instalado. Ejecuta: npm install --save-dev @storybook/react @storybook/addon-essentials');
			}
		}

		// Verificar que existe configuración de Storybook
		if (!this.hasStorybookConfig()) {
			// Generar configuración automáticamente si no existe
			console.log('📝 Generando configuración de Storybook...');
			await this.generateConfig();
		}

		return new Promise((resolve, reject) => {
			try {
				const port = this.config.port || 6006;
				const host = this.config.host || 'localhost';

				// Iniciar Storybook
				this.process = spawn('npx', ['storybook', 'dev', '-p', port.toString(), '--host', host], {
					cwd: this.projectPath,
					stdio: 'pipe',
					shell: true,
				});

				let output = '';

				this.process.stdout?.on('data', (data) => {
					output += data.toString();
					console.log(data.toString());

					// Detectar cuando Storybook está listo
					if (output.includes('Local:') || output.includes('Network:')) {
						const url = `http://${host}:${port}`;
						resolve({
							pid: this.process!.pid!,
							port,
							url,
						});
					}
				});

				this.process.stderr?.on('data', (data) => {
					console.error(data.toString());
				});

				this.process.on('error', (error) => {
					reject(new Error(`Error al iniciar Storybook: ${error.message}`));
				});

				this.process.on('exit', (code) => {
					if (code !== 0 && code !== null) {
						reject(new Error(`Storybook se cerró con código ${code}`));
					}
				});

				// Timeout de seguridad
				setTimeout(() => {
					if (!output.includes('Local:') && !output.includes('Network:')) {
						reject(new Error('Timeout al iniciar Storybook'));
					}
				}, 30000);
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * Detiene el servidor de desarrollo
	 */
	stop(): void {
		if (this.process) {
			this.process.kill();
			this.process = undefined;
			console.log('🔌 Storybook: Servidor detenido');
		}
	}

	/**
	 * Hace build de Storybook estático
	 */
	async build(): Promise<string> {
		if (!this.initialized) {
			await this.initialize();
		}

		try {
			const buildDir = this.config.buildDir || 'storybook-static';
			const buildPath = path.join(this.projectPath, buildDir);

			// Ejecutar build
			execSync('npx storybook build', {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log(`✅ Storybook build completado en: ${buildPath}`);
			return buildPath;
		} catch (error: any) {
			throw new Error(`Error al hacer build de Storybook: ${error.message}`);
		}
	}

	/**
	 * Genera una story básica para un componente
	 */
	async generateStory(
		componentName: string,
		options?: {
			componentPath?: string;
			category?: string;
			args?: Record<string, any>;
		},
	): Promise<string> {
		const category = options?.category || 'Components';
		const componentPath = options?.componentPath || `components/${componentName}`;
		const storyPath = path.join(
			this.projectPath,
			this.config.storiesDir!,
			`${componentName}.stories.tsx`,
		);

		const storyContent = this.generateStoryContent(
			componentName,
			category,
			componentPath,
			options?.args,
		);

		await fs.writeFile(storyPath, storyContent, 'utf-8');
		console.log(`✅ Story generada: ${storyPath}`);

		return storyPath;
	}

	/**
	 * Genera el contenido de una story
	 */
	private generateStoryContent(
		componentName: string,
		category: string,
		componentPath: string,
		args?: Record<string, any>,
	): string {
		const argsString = args ? JSON.stringify(args, null, 2) : '{}';

		return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '${componentPath}';

const meta: Meta<typeof ${componentName}> = {
  title: '${category}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: ${argsString},
};

export const Variant: Story = {
  args: {
    ...Default.args,
    // Agrega variantes aquí
  },
};
`;
	}

	/**
	 * Genera configuración básica de Storybook
	 */
	async generateConfig(): Promise<void> {
		const configDir = path.join(this.projectPath, this.config.configDir!);
		const mainConfigPath = path.join(configDir, 'main.ts');
		const previewConfigPath = path.join(configDir, 'preview.ts');

		// Crear main.ts
		const mainConfig = `import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../${this.config.storiesDir}/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ${JSON.stringify(this.config.staticDirs || ['../public'])},
};

export default config;
`;

		// Crear preview.ts
		const previewConfig = `import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
`;

		await fs.writeFile(mainConfigPath, mainConfig, 'utf-8');
		await fs.writeFile(previewConfigPath, previewConfig, 'utf-8');

		console.log(`✅ Configuración de Storybook generada en: ${configDir}`);
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		running: boolean;
		port?: number;
		url?: string;
	} {
		return {
			initialized: this.initialized,
			running: !!this.process,
			port: this.config.port,
			url: this.process ? `http://${this.config.host}:${this.config.port}` : undefined,
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): StorybookConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<StorybookConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
