/**
 * FileWatcher
 *
 * Servicio que observa cambios en archivos y emite eventos a AutorunHub
 */

import * as fs from 'fs';
import * as path from 'path';

export interface FileWatcherOptions {
	watchPaths: string[];
	ignored?: string[];
	debounceMs?: number;
}

export class FileWatcher {
	private watchers: Map<string, fs.FSWatcher> = new Map();
	private options: FileWatcherOptions;
	private onChangeCallback?: (filePath: string) => void;
	private debounceTimers: Map<string, NodeJS.Timeout> = new Map();

	constructor(options: FileWatcherOptions) {
		this.options = {
			debounceMs: 300,
			...options,
		};
	}

	/**
	 * Inicia el file watching
	 */
	start(onChange: (filePath: string) => void): void {
		this.onChangeCallback = onChange;

		for (const watchPath of this.options.watchPaths) {
			this.watchPath(watchPath);
		}

		console.log(`✅ FileWatcher: Observando ${this.options.watchPaths.length} directorio(s)`);
	}

	/**
	 * Observa un directorio específico
	 */
	private watchPath(watchPath: string): void {
		try {
			// Verificar que el directorio existe
			if (!fs.existsSync(watchPath)) {
				console.warn(`⚠️ FileWatcher: Directorio no existe: ${watchPath}`);
				return;
			}

			const watcher = fs.watch(
				watchPath,
				{ recursive: true },
				(eventType: string, filename: string | null) => {
					if (!filename) {
						console.log(`🔍 FileWatcher: Evento sin filename (eventType: ${eventType})`);
						return;
					}

					const fullPath = path.join(watchPath, filename);
					console.log(
						`🔍 FileWatcher: Evento detectado - tipo: ${eventType}, archivo: ${fullPath}`,
					);

					// Verificar si el archivo debe ser ignorado
					if (this.shouldIgnore(fullPath)) {
						console.log(`⏭️ FileWatcher: Archivo ignorado: ${fullPath}`);
						return;
					}

					// Solo procesar cambios en archivos (no directorios)
					if (eventType === 'change' || eventType === 'rename') {
						console.log(`📋 FileWatcher: Procesando cambio (${eventType}) en: ${fullPath}`);
						this.handleFileChange(fullPath);
					} else {
						console.log(`⏭️ FileWatcher: Evento ignorado (tipo: ${eventType}): ${fullPath}`);
					}
				},
			);

			this.watchers.set(watchPath, watcher);
			console.log(`✅ FileWatcher: Observando directorio: ${watchPath}`);
		} catch (error) {
			console.error(`❌ FileWatcher: Error observando ${watchPath}:`, error);
		}
	}

	/**
	 * Maneja cambios en archivos con debounce
	 */
	private handleFileChange(filePath: string): void {
		console.log(`⏱️ FileWatcher: handleFileChange llamado para: ${filePath}`);

		// Limpiar timer anterior si existe
		const existingTimer = this.debounceTimers.get(filePath);
		if (existingTimer) {
			console.log(`🔄 FileWatcher: Limpiando timer anterior para: ${filePath}`);
			clearTimeout(existingTimer);
		}

		// Crear nuevo timer con debounce
		const timer = setTimeout(() => {
			console.log(`⏰ FileWatcher: Timer expirado, verificando archivo: ${filePath}`);

			// Verificar que el archivo existe (puede haber sido eliminado)
			if (fs.existsSync(filePath)) {
				// Verificar que es un archivo (no directorio)
				const stats = fs.statSync(filePath);
				if (stats.isFile()) {
					console.log(`📝 FileWatcher: Cambio detectado en: ${filePath}`);
					console.log(`📊 FileWatcher: Tamaño del archivo: ${stats.size} bytes`);

					if (this.onChangeCallback) {
						console.log(`📤 FileWatcher: Llamando onChangeCallback para: ${filePath}`);
						this.onChangeCallback(filePath);
					} else {
						console.warn(`⚠️ FileWatcher: onChangeCallback no está definido`);
					}
				} else {
					console.log(`📁 FileWatcher: Ignorando (es directorio): ${filePath}`);
				}
			} else {
				console.log(`❌ FileWatcher: Archivo no existe (puede haber sido eliminado): ${filePath}`);
			}

			this.debounceTimers.delete(filePath);
		}, this.options.debounceMs);

		this.debounceTimers.set(filePath, timer);
		console.log(`⏱️ FileWatcher: Timer creado (${this.options.debounceMs}ms) para: ${filePath}`);
	}

	/**
	 * Verifica si un archivo debe ser ignorado
	 */
	private shouldIgnore(filePath: string): boolean {
		if (!this.options.ignored) {
			return false;
		}

		for (const pattern of this.options.ignored) {
			if (filePath.includes(pattern)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Detiene el file watching
	 */
	stop(): void {
		// Cerrar todos los watchers
		for (const [path, watcher] of this.watchers.entries()) {
			watcher.close();
			console.log(`🛑 FileWatcher: Dejó de observar: ${path}`);
		}

		// Limpiar timers
		for (const timer of this.debounceTimers.values()) {
			clearTimeout(timer);
		}

		this.watchers.clear();
		this.debounceTimers.clear();
		this.onChangeCallback = undefined;
	}
}



