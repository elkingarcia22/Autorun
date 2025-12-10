/**
 * Error Guide Generator
 * 
 * Genera y actualiza automáticamente guías de errores comunes desde
 * los problemas capturados por Problem Tracker
 */

import { ProblemTrackerService } from './ProblemTrackerService';
import { Problem, Solution } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface ErrorGuideEntry {
	id: string;
	title: string;
	description: string;
	category: string;
	severity: 'high' | 'medium' | 'low';
	solution: string;
	examples?: {
		incorrect: string;
		correct: string;
	};
	relatedProblems: string[];
	occurrenceCount: number;
	lastOccurrence: string;
}

export class ErrorGuideGenerator {
	private problemTracker: ProblemTrackerService;
	private guidesDirectory: string;

	constructor(problemTracker: ProblemTrackerService, guidesDirectory: string = 'docs/guias/referencia') {
		this.problemTracker = problemTracker;
		this.guidesDirectory = guidesDirectory;
	}

	/**
	 * Genera o actualiza la guía de errores comunes desde Problem Tracker
	 */
	async generateErrorGuide(): Promise<string> {
		const problems = await this.problemTracker.searchSimilarProblems('', '');
		const solutions = await this.getAllSolutions();

		// Agrupar problemas por categoría
		const problemsByCategory = this.groupProblemsByCategory(problems);
		const solutionsByProblem = this.mapSolutionsToProblems(solutions);

		// Generar contenido de la guía
		let guideContent = `# 🚨 Guía de Errores Comunes - UBITS\n\n`;
		guideContent += `> ⚠️ **AUTOMÁTICO:** Esta guía se genera automáticamente desde Problem Tracker\n`;
		guideContent += `> **Última actualización:** ${new Date().toISOString().split('T')[0]}\n\n`;
		guideContent += `---\n\n`;

		// Agregar índice
		guideContent += `## 📋 Índice\n\n`;
		for (const [category, categoryProblems] of Object.entries(problemsByCategory)) {
			guideContent += `- [${category}](#${category.toLowerCase().replace(/\s+/g, '-')})\n`;
		}
		guideContent += `\n---\n\n`;

		// Generar secciones por categoría
		for (const [category, categoryProblems] of Object.entries(problemsByCategory)) {
			guideContent += `## ${category}\n\n`;

			for (const problem of categoryProblems) {
				const solutions = solutionsByProblem[problem.id] || [];
				const entry = this.createErrorGuideEntry(problem, solutions);

				guideContent += `### Error #${entry.id}: ${entry.title}\n\n`;
				guideContent += `**Categoría:** ${entry.category}\n`;
				guideContent += `**Severidad:** ${entry.severity}\n`;
				guideContent += `**Ocurrencias:** ${entry.occurrenceCount}\n`;
				guideContent += `**Última ocurrencia:** ${entry.lastOccurrence}\n\n`;

				guideContent += `**Descripción:**\n${entry.description}\n\n`;

				if (entry.solution) {
					guideContent += `**Solución:**\n${entry.solution}\n\n`;
				}

				if (entry.examples) {
					guideContent += `**Ejemplo Incorrecto:**\n\`\`\`javascript\n${entry.examples.incorrect}\n\`\`\`\n\n`;
					guideContent += `**Ejemplo Correcto:**\n\`\`\`javascript\n${entry.examples.correct}\n\`\`\`\n\n`;
				}

				if (entry.relatedProblems.length > 0) {
					guideContent += `**Problemas relacionados:**\n`;
					entry.relatedProblems.forEach(relatedId => {
						guideContent += `- Error #${relatedId}\n`;
					});
					guideContent += `\n`;
				}

				guideContent += `---\n\n`;
			}
		}

		// Guardar guía
		const guidePath = path.join(process.cwd(), this.guidesDirectory, 'GUIA-ERRORES-COMUNES-UBITS.md');
		await fs.mkdir(path.dirname(guidePath), { recursive: true });
		await fs.writeFile(guidePath, guideContent, 'utf-8');

		console.log(`✅ Guía de errores generada: ${guidePath}`);
		return guidePath;
	}

	/**
	 * Agrupa problemas por categoría
	 */
	private groupProblemsByCategory(problems: Problem[]): Record<string, Problem[]> {
		const grouped: Record<string, Problem[]> = {};

		for (const problem of problems) {
			const category = problem.categoria || 'otros';
			if (!grouped[category]) {
				grouped[category] = [];
			}
			grouped[category].push(problem);
		}

		return grouped;
	}

	/**
	 * Mapea soluciones a problemas
	 */
	private mapSolutionsToProblems(solutions: Solution[]): Record<string, Solution[]> {
		const mapped: Record<string, Solution[]> = {};

		for (const solution of solutions) {
			if (solution.problema_id) {
				if (!mapped[solution.problema_id]) {
					mapped[solution.problema_id] = [];
				}
				mapped[solution.problema_id].push(solution);
			}
		}

		return mapped;
	}

	/**
	 * Crea una entrada de guía de errores desde un problema y sus soluciones
	 */
	private createErrorGuideEntry(problem: Problem, solutions: Solution[]): ErrorGuideEntry {
		const bestSolution = solutions.find(s => s.verificada) || solutions[0];

		return {
			id: problem.id,
			title: problem.titulo || problem.descripcion.substring(0, 50),
			description: problem.descripcion,
			category: problem.categoria || 'otros',
			severity: problem.severidad || 'medium',
			solution: bestSolution?.descripcion || 'Solución pendiente',
			examples: bestSolution?.codigo_antes && bestSolution?.codigo_despues ? {
				incorrect: bestSolution.codigo_antes,
				correct: bestSolution.codigo_despues,
			} : undefined,
			relatedProblems: problem.problemas_relacionados || [],
			occurrenceCount: problem.ocurrencias || 1,
			lastOccurrence: problem.fecha_deteccion || new Date().toISOString().split('T')[0],
		};
	}

	/**
	 * Obtiene todas las soluciones
	 */
	private async getAllSolutions(): Promise<Solution[]> {
		// TODO: Implementar cuando ProblemTrackerService tenga método getAllSolutions
		return [];
	}

	/**
	 * Sugiere soluciones basadas en problemas similares anteriores
	 */
	async suggestSolutions(problemDescription: string, category?: string): Promise<{
		similarProblems: Problem[];
		suggestedSolutions: Solution[];
	}> {
		const similarProblems = await this.problemTracker.searchSimilarProblems(problemDescription, category);
		const suggestedSolutions: Solution[] = [];

		for (const problem of similarProblems) {
			const solutions = await this.problemTracker.searchSolutions(problem.id);
			suggestedSolutions.push(...solutions);
		}

		return {
			similarProblems,
			suggestedSolutions: suggestedSolutions.filter((s, index, self) =>
				index === self.findIndex(t => t.id === s.id)
			),
		};
	}
}
