/**
 * ProblemTrackerService
 *
 * Servicio que maneja todas las operaciones del sistema de tracking de problemas y soluciones:
 * - Detección automática de problemas
 * - Captura de problemas y soluciones
 * - Almacenamiento local
 * - Búsqueda de soluciones anteriores
 * - Sugerencias automáticas
 * - Actualización de guías
 */

import {
	ProblemTrackerConfig,
	Problem,
	Solution,
	ProblemSolutionIndex,
	ProblemDetection,
	SolutionSuggestion,
} from './types';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

export type { ProblemTrackerConfig };

export class ProblemTrackerService {
	private config: ProblemTrackerConfig;
	private initialized = false;
	private problemsDirectory: string;
	private indexFile: string;
	private index: ProblemSolutionIndex;
	private problemPatterns: ProblemDetection[] = [];

	constructor(config: ProblemTrackerConfig) {
		this.config = {
			enabled: true,
			persistLocally: true,
			problemsDirectory: 'docs/problems-solutions',
			indexFile: 'docs/problems-solutions/index.json',
			autoDetectProblems: true,
			autoSuggestSolutions: true,
			autoUpdateGuides: false,
			categories: ['headersection', 'contentmanager', 'datatable', 'componentes', 'otros'],
			...config,
		};

		this.problemsDirectory = this.config.problemsDirectory || 'docs/problems-solutions';
		this.indexFile = this.config.indexFile || 'docs/problems-solutions/index.json';

		// Inicializar índice
		this.index = {
			version: '1.0.0',
			ultima_actualizacion: new Date().toISOString().split('T')[0],
			problemas: [],
			soluciones: [],
		};

		// Patrones de detección de problemas comunes
		this.setupProblemPatterns();
	}

	/**
	 * Configura patrones de detección de problemas comunes
	 */
	private setupProblemPatterns(): void {
		this.problemPatterns = [
			// ContentManager
			{
				pattern: /HeaderSection.*aparece.*cuando.*no.*debería/i,
				category: 'ContentManager',
				severity: 'high',
				description: 'HeaderSection aparece cuando no debería',
				suggestedSolution: 'Interceptar ContentManager.updateContent',
			},
			{
				pattern: /ContentManager.*elimina.*elementos/i,
				category: 'ContentManager',
				severity: 'high',
				description: 'ContentManager elimina elementos personalizados',
				suggestedSolution: 'Preservar elementos antes de updateContent',
			},
			{
				pattern: /contentArea\.innerHTML\s*=\s*['"]/i,
				category: 'ContentManager',
				severity: 'high',
				description: 'ContentManager limpia content-area eliminando elementos personalizados',
				suggestedSolution: 'Interceptar updateContent para preservar elementos',
			},
			// Spacing
			{
				pattern: /spacing.*incorrecto|gap.*incorrecto|margin.*incorrecto/i,
				category: 'componentes',
				severity: 'medium',
				description: 'Spacing incorrecto entre elementos',
				suggestedSolution: 'Verificar tokens UBITS y análisis de spacing',
			},
			{
				pattern: /var\(--ubits-spacing-xl.*20px/i,
				category: 'componentes',
				severity: 'medium',
				description: 'Uso de spacing-xl (20px) cuando debería ser spacing-lg (16px)',
				suggestedSolution: 'Usar var(--ubits-spacing-lg) en lugar de var(--ubits-spacing-xl)',
			},
			// Event Listeners
			{
				pattern: /tabs.*no.*funcionan|tabs.*sin.*listeners|event.*listeners.*perdidos/i,
				category: 'componentes',
				severity: 'high',
				description: 'Event listeners perdidos al restaurar elementos desde HTML',
				suggestedSolution: 'Reinicializar componentes después de restaurar desde HTML',
			},
			{
				pattern: /insertAdjacentHTML|outerHTML.*restaurar/i,
				category: 'componentes',
				severity: 'high',
				description: 'Restaurar elementos desde HTML pierde event listeners',
				suggestedSolution: 'Reinicializar componentes después de insertAdjacentHTML',
			},
			// MutationObserver
			{
				pattern: /MutationObserver.*bucle|MutationObserver.*infinito/i,
				category: 'componentes',
				severity: 'high',
				description: 'MutationObserver entra en bucle infinito',
				suggestedSolution: 'Agregar cooldown y verificación antes de reinicializar',
			},
			// DataTable
			{
				pattern: /DataTable.*no.*renderiza/i,
				category: 'DataTable',
				severity: 'medium',
				description: 'DataTable no se renderiza correctamente',
				suggestedSolution: 'Verificar configuración de DataTable',
			},
			{
				pattern: /createDataTable.*no.*disponible/i,
				category: 'DataTable',
				severity: 'high',
				description: 'window.createDataTable no está disponible',
				suggestedSolution: 'Verificar que componentes UBITS se carguen antes de inicializar',
			},
			// Componentes generales
			{
				pattern: /componente.*no.*funciona/i,
				category: 'componentes',
				severity: 'medium',
				description: 'Componente UBITS no funciona correctamente',
				suggestedSolution: 'Verificar Storybook y documentación del componente',
			},
			{
				pattern: /window\.create.*no.*disponible/i,
				category: 'componentes',
				severity: 'high',
				description: 'Función create de componente UBITS no está disponible',
				suggestedSolution: 'Verificar carga de componentes UBITS y orden de inicialización',
			},
		];
	}

	/**
	 * Inicializa el servicio
	 */
	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('🔍 Problem Tracker: Deshabilitado por configuración');
			return;
		}

		if (this.initialized) {
			console.warn('⚠️  Problem Tracker ya está inicializado');
			return;
		}

		try {
			// Cargar índice existente si existe
			if (existsSync(this.indexFile)) {
				const indexContent = readFileSync(this.indexFile, 'utf-8');
				this.index = JSON.parse(indexContent);
				console.log('✅ Problem Tracker: Índice cargado');
			} else {
				// Crear directorio si no existe
				const indexDir = dirname(this.indexFile);
				if (!existsSync(indexDir)) {
					mkdirSync(indexDir, { recursive: true });
				}
				// Guardar índice inicial
				this.saveIndex();
				console.log('✅ Problem Tracker: Índice inicial creado');
			}

			this.initialized = true;
			console.log('✅ Problem Tracker: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Problem Tracker: Error al inicializar - ${error}`);
			throw error;
		}
	}

	/**
	 * Detecta un problema automáticamente
	 */
	async detectProblem(
		description: string,
		context?: {
			archivo?: string;
			linea?: number;
			codigo?: string;
			logs?: string[];
		},
	): Promise<Problem | null> {
		if (!this.config.autoDetectProblems) {
			return null;
		}

		// Buscar patrones conocidos
		for (const pattern of this.problemPatterns) {
			const regex =
				typeof pattern.pattern === 'string'
					? new RegExp(pattern.pattern, 'i')
					: pattern.pattern;

			if (regex.test(description)) {
				// Problema conocido detectado
				const problem: Problem = {
					id: this.generateProblemId(pattern.category),
					categoria: pattern.category,
					titulo: pattern.description,
					descripcion: description,
					contexto: {
						donde_ocurre: context?.archivo,
						que_causa: pattern.description,
					},
					codigo_problematico: context?.codigo,
					logs_errores: context?.logs,
					archivos_afectados: context?.archivo ? [context.archivo] : [],
					fecha_deteccion: new Date().toISOString().split('T')[0],
					estado: 'pendiente',
					tags: [pattern.category.toLowerCase()],
				};

				// Guardar problema
				await this.saveProblem(problem);

				console.log(`🔍 Problem Tracker: Problema detectado - ${problem.id}`);
				return problem;
			}
		}

		return null;
	}

	/**
	 * Registra un problema manualmente
	 */
	async registerProblem(problem: Omit<Problem, 'id' | 'fecha_deteccion'>): Promise<Problem> {
		const fullProblem: Problem = {
			...problem,
			id: this.generateProblemId(problem.categoria),
			fecha_deteccion: new Date().toISOString().split('T')[0],
			estado: problem.estado || 'pendiente',
		};

		await this.saveProblem(fullProblem);
		console.log(`📝 Problem Tracker: Problema registrado - ${fullProblem.id}`);
		return fullProblem;
	}

	/**
	 * Registra una solución
	 */
	async registerSolution(
		solution: Omit<Solution, 'id' | 'fecha_implementacion'>,
	): Promise<Solution> {
		const fullSolution: Solution = {
			...solution,
			id: this.generateSolutionId(solution.categoria),
			fecha_implementacion: new Date().toISOString().split('T')[0],
			verificado: solution.verificado || false,
		};

		// Actualizar problema relacionado
		if (fullSolution.problema_id) {
			const problem = this.index.problemas.find((p) => p.id === fullSolution.problema_id);
			if (problem) {
				problem.solucion_id = fullSolution.id;
				problem.fecha_solucion = fullSolution.fecha_implementacion;
				problem.estado = 'resuelto';
			}
		}

		await this.saveSolution(fullSolution);
		console.log(`✅ Problem Tracker: Solución registrada - ${fullSolution.id}`);
		return fullSolution;
	}

	/**
	 * Busca problemas similares
	 */
	searchSimilarProblems(query: string, category?: string): Problem[] {
		const searchTerm = query.toLowerCase();
		return this.index.problemas.filter((problem) => {
			const matchesCategory = !category || problem.categoria.toLowerCase() === category.toLowerCase();
			const matchesQuery =
				problem.titulo.toLowerCase().includes(searchTerm) ||
				problem.descripcion.toLowerCase().includes(searchTerm) ||
				problem.tags?.some((tag) => tag.toLowerCase().includes(searchTerm));

			return matchesCategory && matchesQuery;
		});
	}

	/**
	 * Busca soluciones para un problema
	 */
	searchSolutions(problemId: string): Solution[] {
		return this.index.soluciones.filter((solution) => solution.problema_id === problemId);
	}

	/**
	 * Sugiere soluciones automáticamente
	 */
	suggestSolutions(problem: Problem): SolutionSuggestion[] {
		if (!this.config.autoSuggestSolutions) {
			return [];
		}

		const suggestions: SolutionSuggestion[] = [];

		// Buscar problemas similares
		const similarProblems = this.searchSimilarProblems(problem.titulo, problem.categoria);

		for (const similarProblem of similarProblems) {
			if (similarProblem.solucion_id) {
				const solution = this.index.soluciones.find(
					(s) => s.id === similarProblem.solucion_id,
				);
				if (solution) {
					suggestions.push({
						problemId: problem.id,
						solutionId: solution.id,
						confidence: 0.8,
						reason: `Problema similar resuelto: ${similarProblem.titulo}`,
					});
				}
			}
		}

		return suggestions;
	}

	/**
	 * Guarda un problema en el sistema de archivos
	 */
	private async saveProblem(problem: Problem): Promise<void> {
		// Agregar al índice
		const existingIndex = this.index.problemas.findIndex((p) => p.id === problem.id);
		if (existingIndex >= 0) {
			this.index.problemas[existingIndex] = problem;
		} else {
			this.index.problemas.push(problem);
		}

		// Guardar archivo Markdown
		if (this.config.persistLocally) {
			const categoryDir = join(this.problemsDirectory, problem.categoria.toLowerCase());
			if (!existsSync(categoryDir)) {
				mkdirSync(categoryDir, { recursive: true });
			}

			const problemFile = join(categoryDir, `issue-${problem.id.split('-').pop()}.md`);
			problem.archivo = problemFile;

			const markdown = this.generateProblemMarkdown(problem);
			writeFileSync(problemFile, markdown, 'utf-8');
		}

		// Actualizar índice
		this.index.ultima_actualizacion = new Date().toISOString().split('T')[0];
		this.saveIndex();
	}

	/**
	 * Guarda una solución en el sistema de archivos
	 */
	private async saveSolution(solution: Solution): Promise<void> {
		// Agregar al índice
		const existingIndex = this.index.soluciones.findIndex((s) => s.id === solution.id);
		if (existingIndex >= 0) {
			this.index.soluciones[existingIndex] = solution;
		} else {
			this.index.soluciones.push(solution);
		}

		// Guardar archivo Markdown
		if (this.config.persistLocally) {
			const categoryDir = join(this.problemsDirectory, solution.categoria.toLowerCase());
			if (!existsSync(categoryDir)) {
				mkdirSync(categoryDir, { recursive: true });
			}

			const solutionFile = join(categoryDir, `solution-${solution.id.split('-').pop()}.md`);
			solution.archivo = solutionFile;

			const markdown = this.generateSolutionMarkdown(solution);
			writeFileSync(solutionFile, markdown, 'utf-8');
		}

		// Actualizar índice
		this.index.ultima_actualizacion = new Date().toISOString().split('T')[0];
		this.saveIndex();
	}

	/**
	 * Genera Markdown para un problema
	 */
	private generateProblemMarkdown(problem: Problem): string {
		const estadoEmoji = problem.estado === 'resuelto' ? '✅' : problem.estado === 'en_proceso' ? '🔄' : '🐛';
		const estadoTexto = problem.estado === 'resuelto' ? 'Resuelto' : problem.estado === 'en_proceso' ? 'En Proceso' : 'Pendiente';

		return `# ${estadoEmoji} Problema: ${problem.titulo}

**ID:** \`${problem.id}\`  
**Categoría:** ${problem.categoria}  
**Fecha Detección:** ${problem.fecha_deteccion}  
${problem.fecha_solucion ? `**Fecha Solución:** ${problem.fecha_solucion}  \n` : ''}**Estado:** ${estadoTexto}

---

## 📋 Descripción

${problem.descripcion}

${problem.contexto ? `---

## 🔍 Contexto

${problem.contexto.donde_ocurre ? `### **Dónde Ocurre:**
${problem.contexto.donde_ocurre}
` : ''}${problem.contexto.cuando_ocurre ? `### **Cuándo Ocurre:**
${problem.contexto.cuando_ocurre}
` : ''}${problem.contexto.que_causa ? `### **Qué Causa el Problema:**
${problem.contexto.que_causa}
` : ''}` : ''}${problem.codigo_problematico ? `---

## 💻 Código Problemático

\`\`\`javascript
${problem.codigo_problematico}
\`\`\`
` : ''}${problem.logs_errores && problem.logs_errores.length > 0 ? `---

## 📝 Logs/Errores

${problem.logs_errores.map((log) => `- ${log}`).join('\n')}
` : ''}${problem.solucion_id ? `---

## ✅ Solución Aplicada

**Solución ID:** \`${problem.solucion_id}\`  
**Ver:** \`docs/problems-solutions/${problem.categoria.toLowerCase()}/solution-${problem.solucion_id.split('-').pop()}.md\`
` : ''}${problem.guia ? `---

## 🔗 Referencias

- **Guía:** ${problem.guia}
` : ''}${problem.tags && problem.tags.length > 0 ? `---

## 🏷️ Tags

${problem.tags.map((tag) => `- \`${tag}\``).join('\n')}
` : ''}

---

**Última actualización:** ${problem.fecha_deteccion}
`;
	}

	/**
	 * Genera Markdown para una solución
	 */
	private generateSolutionMarkdown(solution: Solution): string {
		return `# ✅ Solución: ${solution.titulo}

**ID:** \`${solution.id}\`  
**Problema Relacionado:** \`${solution.problema_id}\`  
**Categoría:** ${solution.categoria}  
**Fecha Implementación:** ${solution.fecha_implementacion}  
**Estado:** ${solution.verificado ? '✅ Verificado y Funcional' : '⚠️ Pendiente de Verificación'}

---

## 📋 Descripción

${solution.descripcion}

${solution.codigo_antes || solution.codigo_despues ? `---

## 📊 Código Antes vs Después

${solution.codigo_antes ? `### **Antes:**
\`\`\`javascript
${solution.codigo_antes}
\`\`\`
` : ''}${solution.codigo_despues ? `### **Después:**
\`\`\`javascript
${solution.codigo_despues}
\`\`\`
` : ''}` : ''}${solution.archivos_modificados && solution.archivos_modificados.length > 0 ? `---

## 🔍 Archivos Modificados

${solution.archivos_modificados.map((file) => `- \`${file}\``).join('\n')}
` : ''}${solution.guia ? `---

## 📚 Guía Creada/Actualizada

- ${solution.guia}
${solution.guias_actualizadas && solution.guias_actualizadas.length > 0 ? solution.guias_actualizadas.map((guide) => `- ${guide}`).join('\n') : ''}
` : ''}${solution.tags && solution.tags.length > 0 ? `---

## 🏷️ Tags

${solution.tags.map((tag) => `- \`${tag}\``).join('\n')}
` : ''}${solution.problema_id ? `---

## 🔗 Referencias

- **Problema relacionado:** \`docs/problems-solutions/${solution.categoria.toLowerCase()}/issue-${solution.problema_id.split('-').pop()}.md\`
` : ''}${solution.guia ? `- **Guía completa:** ${solution.guia}
` : ''}

---

**Última actualización:** ${solution.fecha_implementacion}  
**Verificado:** ${solution.verificado ? '✅ Sí' : '❌ No'}  
**Funcional:** ${solution.verificado ? '✅ Sí' : '⚠️ Pendiente'}
`;
	}

	/**
	 * Guarda el índice
	 */
	private saveIndex(): void {
		if (this.config.persistLocally) {
			writeFileSync(this.indexFile, JSON.stringify(this.index, null, 2), 'utf-8');
		}
	}

	/**
	 * Genera un ID único para un problema
	 */
	private generateProblemId(category: string): string {
		const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
		const timestamp = Date.now();
		const random = Math.floor(Math.random() * 1000);
		return `${categorySlug}-issue-${timestamp}-${random}`;
	}

	/**
	 * Genera un ID único para una solución
	 */
	private generateSolutionId(category: string): string {
		const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
		const timestamp = Date.now();
		const random = Math.floor(Math.random() * 1000);
		return `${categorySlug}-solution-${timestamp}-${random}`;
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<ProblemTrackerConfig>): void {
		this.config = { ...this.config, ...config };
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus() {
		return {
			initialized: this.initialized,
			enabled: this.config.enabled || false,
			problemsCount: this.index.problemas.length,
			solutionsCount: this.index.soluciones.length,
			lastUpdate: this.index.ultima_actualizacion,
		};
	}

	/**
	 * Obtiene la configuración
	 */
	getConfig(): ProblemTrackerConfig {
		return { ...this.config };
	}

	/**
	 * Habilita/deshabilita el servicio
	 */
	setEnabled(enabled: boolean): void {
		this.config.enabled = enabled;
	}

	/**
	 * Destruye el servicio
	 */
	destroy(): void {
		this.initialized = false;
	}
}
