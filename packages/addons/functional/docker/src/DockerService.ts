/**
 * DockerService
 *
 * Servicio que maneja todas las operaciones de Docker:
 * - Build de imágenes
 * - Push a registries
 * - Gestión de containers
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface DockerConfig {
	enabled?: boolean;
	imageName?: string;
	tag?: string;
	registry?: string;
	dockerfile?: string;
	context?: string;
	projectPath?: string;
}

export interface DockerResult {
	success: boolean;
	imageId?: string;
	imageTag?: string;
	error?: string;
}

export class DockerService {
	private config: DockerConfig;
	private projectPath: string;

	constructor(config: DockerConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			imageName: 'app',
			tag: 'latest',
			dockerfile: 'Dockerfile',
			context: '.',
			...config,
		};
		this.projectPath = projectPath;
	}

	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Docker está deshabilitado');
			return;
		}

		try {
			if (!this.isDockerInstalled()) {
				console.warn('⚠️  Docker no está instalado o no está corriendo');
				return;
			}

			const dockerfilePath = path.join(
				this.projectPath,
				this.config.dockerfile || 'Dockerfile',
			);
			if (!existsSync(dockerfilePath)) {
				await this.createDockerfile();
				console.log('✅ Dockerfile creado');
			}

			console.log('✅ Docker Service: Inicializado correctamente');
		} catch (error: any) {
			throw new Error(`Error al inicializar Docker: ${error.message}`);
		}
	}

	private async createDockerfile(): Promise<void> {
		const dockerfile = `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
`;

		const dockerfilePath = path.join(this.projectPath, this.config.dockerfile || 'Dockerfile');
		await fs.writeFile(dockerfilePath, dockerfile, 'utf-8');
	}

	async build(options?: {
		imageName?: string;
		tag?: string;
		dockerfile?: string;
	}): Promise<DockerResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Docker está deshabilitado',
			};
		}

		try {
			const imageName = options?.imageName || this.config.imageName || 'app';
			const tag = options?.tag || this.config.tag || 'latest';
			const dockerfile = options?.dockerfile || this.config.dockerfile || 'Dockerfile';
			const context = this.config.context || '.';

			const imageTag = `${imageName}:${tag}`;

			const command = `docker build -t ${imageTag} -f ${dockerfile} ${context}`;

			execSync(command, {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log(`✅ Docker: Imagen ${imageTag} construida correctamente`);

			return {
				success: true,
				imageTag,
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	async push(options?: {
		imageName?: string;
		tag?: string;
		registry?: string;
	}): Promise<DockerResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Docker está deshabilitado',
			};
		}

		try {
			const imageName = options?.imageName || this.config.imageName || 'app';
			const tag = options?.tag || this.config.tag || 'latest';
			const registry = options?.registry || this.config.registry;

			const imageTag = registry
				? `${registry}/${imageName}:${tag}`
				: `${imageName}:${tag}`;

			const command = `docker push ${imageTag}`;

			execSync(command, {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log(`✅ Docker: Imagen ${imageTag} pusheada correctamente`);

			return {
				success: true,
				imageTag,
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	private isDockerInstalled(): boolean {
		try {
			execSync('docker --version', {
				cwd: this.projectPath,
				stdio: 'pipe',
			});
			return true;
		} catch {
			return false;
		}
	}

	getConfig(): DockerConfig {
		return { ...this.config };
	}

	updateConfig(config: Partial<DockerConfig>): void {
		this.config = { ...this.config, ...config };
	}
}

