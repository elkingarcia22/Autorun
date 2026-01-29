/**
 * DocusaurusService
 *
 * Servicio que maneja todas las operaciones de Docusaurus:
 * - Iniciar servidor de desarrollo
 * - Build de documentación
 * - Generación automática de docs
 * - Configuración de Docusaurus
 */

import { execSync, spawn, ChildProcess } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface DocusaurusConfig {
	port?: number;
	host?: string;
	buildDir?: string;
	configFile?: string;
	autoStart?: boolean;
	theme?: 'classic' | 'modern';
	docsDir?: string;
	blogDir?: string;
	staticDir?: string;
}

export interface DocusaurusProcess {
	pid: number;
	port: number;
	url: string;
}

export class DocusaurusService {
	private config: DocusaurusConfig;
	private projectPath: string;
	private process?: ChildProcess;
	private initialized = false;

	constructor(config: DocusaurusConfig, projectPath: string = process.cwd()) {
		this.config = {
			port: 3000,
			host: 'localhost',
			buildDir: 'build',
			configFile: 'docusaurus.config.js',
			autoStart: false,
			theme: 'classic',
			docsDir: 'docs',
			blogDir: 'blog',
			staticDir: 'static',
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa el servicio y verifica dependencias
	 */
	async initialize(): Promise<void> {
		// Verificar que Docusaurus esté instalado
		if (!this.isDocusaurusInstalled()) {
			console.warn(
				'⚠️  Docusaurus no está instalado. Ejecuta: npm install --save-dev @docusaurus/core @docusaurus/preset-classic',
			);
			return;
		}

		// Crear estructura básica si no existe
		await this.ensureDocusaurusStructure();

		this.initialized = true;
		console.log('✅ Docusaurus Service: Inicializado correctamente');
	}

	/**
	 * Verifica si Docusaurus está instalado
	 */
	private isDocusaurusInstalled(): boolean {
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

			return '@docusaurus/core' in allDeps;
		} catch {
			return false;
		}
	}

	/**
	 * Asegura estructura básica de Docusaurus
	 */
	private async ensureDocusaurusStructure(): Promise<void> {
		const dirs = [this.config.docsDir!, this.config.blogDir!, this.config.staticDir!];

		for (const dir of dirs) {
			const fullPath = path.join(this.projectPath, dir);
			try {
				await fs.mkdir(fullPath, { recursive: true });
			} catch {
				// Ignorar errores
			}
		}
	}

	/**
	 * Inicia el servidor de desarrollo
	 */
	async start(): Promise<DocusaurusProcess> {
		if (this.process) {
			throw new Error('Docusaurus ya está ejecutándose');
		}

		if (!this.initialized) {
			await this.initialize();
		}

		return new Promise((resolve, reject) => {
			try {
				const port = this.config.port || 3000;
				const host = this.config.host || 'localhost';

				// Iniciar Docusaurus
				this.process = spawn(
					'npx',
					['docusaurus', 'start', '--port', port.toString(), '--host', host],
					{
						cwd: this.projectPath,
						stdio: 'pipe',
						shell: true,
					},
				);

				let output = '';

				this.process.stdout?.on('data', (data) => {
					output += data.toString();
					console.log(data.toString());

					// Detectar cuando Docusaurus está listo
					if (output.includes('Local:') || output.includes('http://')) {
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
					reject(new Error(`Error al iniciar Docusaurus: ${error.message}`));
				});

				this.process.on('exit', (code) => {
					if (code !== 0 && code !== null) {
						reject(new Error(`Docusaurus se cerró con código ${code}`));
					}
				});

				// Timeout de seguridad
				setTimeout(() => {
					if (!output.includes('Local:') && !output.includes('http://')) {
						reject(new Error('Timeout al iniciar Docusaurus'));
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
			console.log('🔌 Docusaurus: Servidor detenido');
		}
	}

	/**
	 * Hace build de la documentación
	 */
	async build(): Promise<string> {
		if (!this.initialized) {
			await this.initialize();
		}

		try {
			const buildDir = this.config.buildDir || 'build';
			const buildPath = path.join(this.projectPath, buildDir);

			// Ejecutar build
			execSync('npx docusaurus build', {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log(`✅ Docusaurus build completado en: ${buildPath}`);
			return buildPath;
		} catch (error: any) {
			throw new Error(`Error al hacer build de Docusaurus: ${error.message}`);
		}
	}

	/**
	 * Genera una página de documentación
	 */
	async generateDoc(title: string, content: string, id?: string): Promise<string> {
		const docsDir = path.join(this.projectPath, this.config.docsDir || 'docs');
		const docId = id || title.toLowerCase().replace(/\s+/g, '-');
		const docPath = path.join(docsDir, `${docId}.md`);

		const docContent = `---
id: ${docId}
title: ${title}
sidebar_position: 1
---

${content}
`;

		await fs.writeFile(docPath, docContent, 'utf-8');
		console.log(`✅ Documentación generada: ${docPath}`);

		return docPath;
	}

	/**
	 * Genera configuración básica de Docusaurus
	 */
	async generateConfig(): Promise<void> {
		const configPath = path.join(
			this.projectPath,
			this.config.configFile || 'docusaurus.config.js',
		);

		if (existsSync(configPath)) {
			return;
		}

		const config = `import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mi Documentación',
  tagline: 'Documentación generada con Autorun',
  favicon: 'img/favicon.ico',

  url: 'https://example.com',
  baseUrl: '/',

  organizationName: 'mi-org',
  projectName: 'mi-proyecto',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mi-org/mi-proyecto/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/mi-org/mi-proyecto/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Mi Documentación',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/mi-org/mi-proyecto',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentación',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Comunidad',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mi-org/mi-proyecto',
            },
          ],
        },
      ],
      copyright: \`Copyright © \${new Date().getFullYear()} Mi Proyecto.\`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
`;

		await fs.writeFile(configPath, config, 'utf-8');
		console.log(`✅ Configuración de Docusaurus generada en: ${configPath}`);
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		running: boolean;
		port?: number;
		url?: string;
		docusaurusInstalled: boolean;
	} {
		return {
			initialized: this.initialized,
			running: !!this.process,
			port: this.config.port,
			url: this.process ? `http://${this.config.host}:${this.config.port}` : undefined,
			docusaurusInstalled: this.isDocusaurusInstalled(),
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): DocusaurusConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<DocusaurusConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
