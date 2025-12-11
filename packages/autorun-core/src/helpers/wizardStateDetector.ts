/**
 * Helper para detectar automáticamente el estado del wizard
 * y ejecutar la inicialización de AutorunHub si es necesario
 */

import * as path from 'path';
import * as fs from 'fs/promises';

export interface WizardState {
	url: string;
	initHub: boolean;
	timestamp: string;
	message?: string;
}

/**
 * Lee el archivo de estado del wizard si existe
 */
export async function readWizardState(): Promise<WizardState | null> {
	try {
		const statePath = path.join(process.cwd(), '.autorun', 'wizard-state.json');
		const stateContent = await fs.readFile(statePath, 'utf-8');
		const state = JSON.parse(stateContent) as WizardState;
		return state;
	} catch (error) {
		// Archivo no existe o no se puede leer
		return null;
	}
}

/**
 * Verifica si existe un archivo de estado del wizard
 */
export async function hasWizardState(): Promise<boolean> {
	try {
		const statePath = path.join(process.cwd(), '.autorun', 'wizard-state.json');
		await fs.access(statePath);
		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Elimina el archivo de estado del wizard (después de procesarlo)
 */
export async function clearWizardState(): Promise<void> {
	try {
		const statePath = path.join(process.cwd(), '.autorun', 'wizard-state.json');
		await fs.unlink(statePath);
	} catch (error) {
		// No es crítico si falla
	}
}

/**
 * Detecta si el usuario menciona problemas con el wizard o autorun
 */
export function detectWizardProblemInMessage(message: string): boolean {
	const lowerMessage = message.toLowerCase();
	const keywords = [
		'wizard no inició',
		'wizard no inicio',
		'autorun no inició',
		'autorun no inicio',
		'no se inició automáticamente',
		'no se inicio automaticamente',
		'no inició automáticamente',
		'no inicio automaticamente',
		'seguimos sin poder iniciar',
		'no funciona autorun',
		'no funciona el wizard',
		'wizard no funciona',
		'autorun no funciona',
	];

	return keywords.some((keyword) => lowerMessage.includes(keyword));
}



