/**
 * CodecovService
 *
 * Servicio que maneja todas las operaciones de Codecov:
 * - Upload de coverage reports
 * - Tracking de coverage
 * - Integración con CI/CD
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface CodecovConfig {
	enabled?: boolean;
	token?: string;
	coverageDir?: string;
	flags?: string[];
	failOnError?: boolean;
	projectPath?: string;
}

export interface CoverageResult {
	success: boolean;
	coverage?: number;
	uploaded?: boolean;
	reportUrl?: string;
	error?: string;
}

export class CodecovService {
	private config: CodecovConfig;
	private projectPath: string;

	constructor(config: CodecovConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			coverageDir: 'coverage',
			flags: [],
			failOnError: false,
			...config,
		};
		this.projectPath = projectPath;
	}

	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Codecov está deshabilitado');
			return;
		}

		console.log('✅ Codecov Service: Inicializado correctamente');
	}

	async uploadCoverage(): Promise<CoverageResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Codecov está deshabilitado',
			};
		}

		try {
			let command = 'npx codecov';

			if (this.config.token) {
				command += ` --token=${this.config.token}`;
			}

			if (this.config.flags && this.config.flags.length > 0) {
				command += ` --flags=${this.config.flags.join(',')}`;
			}

			execSync(command, {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log('✅ Codecov: Coverage subido correctamente');

			return {
				success: true,
				uploaded: true,
			};
		} catch (error: any) {
			return {
				success: !this.config.failOnError,
				error: error.message,
			};
		}
	}

	getConfig(): CodecovConfig {
		return { ...this.config };
	}

	updateConfig(config: Partial<CodecovConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
