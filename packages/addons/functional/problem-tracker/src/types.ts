/**
 * Types para Problem Tracker Add-on
 *
 * Define las interfaces y tipos para problemas y soluciones
 */

export interface ProblemTrackerConfig {
	enabled?: boolean;
	persistLocally?: boolean;
	problemsDirectory?: string;
	indexFile?: string;
	autoDetectProblems?: boolean;
	autoSuggestSolutions?: boolean;
	autoUpdateGuides?: boolean;
	categories?: string[];
}

export interface Problem {
	id: string;
	categoria: string;
	titulo: string;
	descripcion: string;
	contexto?: {
		donde_ocurre?: string;
		cuando_ocurre?: string;
		que_causa?: string;
	};
	codigo_problematico?: string;
	logs_errores?: string[];
	archivos_afectados?: string[];
	fecha_deteccion: string;
	fecha_solucion?: string;
	solucion_id?: string;
	estado: 'pendiente' | 'resuelto' | 'en_proceso';
	tags?: string[];
	archivo?: string;
	guia?: string;
}

export interface Solution {
	id: string;
	problema_id: string;
	categoria: string;
	titulo: string;
	descripcion: string;
	codigo_antes?: string;
	codigo_despues?: string;
	archivos_modificados?: string[];
	fecha_implementacion: string;
	verificado: boolean;
	tags?: string[];
	archivo?: string;
	guia?: string;
	guias_actualizadas?: string[];
}

export interface ProblemSolutionIndex {
	version: string;
	ultima_actualizacion: string;
	problemas: Problem[];
	soluciones: Solution[];
}

export interface ProblemDetection {
	pattern: string | RegExp;
	category: string;
	severity: 'low' | 'medium' | 'high' | 'critical';
	description: string;
	suggestedSolution?: string;
}

export interface SolutionSuggestion {
	problemId: string;
	solutionId: string;
	confidence: number;
	reason: string;
}
