/**
 * AddonConflictDetector
 *
 * Detecta conflictos entre add-ons que se solapan (hacen lo mismo)
 * y previene su activación simultánea
 */

export interface ConflictGroup {
	/** IDs de add-ons que se solapan (solo se puede activar uno) */
	addons: string[];
	/** Descripción del conflicto */
	reason: string;
	/** Recomendación de cuál usar */
	recommended?: string;
}

/**
 * Grupos de add-ons que se solapan
 * Solo se puede activar UNO de cada grupo
 */
export const CONFLICT_GROUPS: ConflictGroup[] = [
	{
		addons: ['jest', 'vitest'],
		reason: 'Ambos son unit testing frameworks. Hacen lo mismo.',
		recommended: 'vitest', // Vitest es más rápido y moderno
	},
	{
		addons: ['docusaurus', 'storybook'],
		reason: 'Ambos proporcionan documentación. Para prototipos, Storybook es suficiente.',
		recommended: 'storybook', // Storybook es suficiente para prototipos
	},
	// Agregar más grupos según se identifiquen conflictos
];

/**
 * Detector de conflictos entre add-ons
 */
export class AddonConflictDetector {
	private conflictGroups: ConflictGroup[];

	constructor(conflictGroups: ConflictGroup[] = CONFLICT_GROUPS) {
		this.conflictGroups = conflictGroups;
	}

	/**
	 * Verifica si hay conflictos al intentar activar un add-on
	 * @param addonId ID del add-on a activar
	 * @param activeAddonIds IDs de add-ons ya activos
	 * @returns Información del conflicto si existe, null si no hay conflicto
	 */
	checkConflict(
		addonId: string,
		activeAddonIds: string[],
	): { conflict: ConflictGroup; conflictingAddon: string } | null {
		// Buscar el grupo de conflicto al que pertenece el add-on
		const conflictGroup = this.conflictGroups.find((group) => group.addons.includes(addonId));

		if (!conflictGroup) {
			// No hay conflicto conocido para este add-on
			return null;
		}

		// Verificar si algún add-on del mismo grupo ya está activo
		const conflictingAddon = conflictGroup.addons.find(
			(id) => id !== addonId && activeAddonIds.includes(id),
		);

		if (conflictingAddon) {
			return {
				conflict: conflictGroup,
				conflictingAddon,
			};
		}

		// No hay conflicto
		return null;
	}

	/**
	 * Verifica múltiples add-ons a la vez
	 * @param addonIds IDs de add-ons a activar
	 * @param activeAddonIds IDs de add-ons ya activos
	 * @returns Lista de conflictos encontrados
	 */
	checkMultipleConflicts(
		addonIds: string[],
		activeAddonIds: string[],
	): Array<{ addonId: string; conflict: ConflictGroup; conflictingAddon: string }> {
		const conflicts: Array<{
			addonId: string;
			conflict: ConflictGroup;
			conflictingAddon: string;
		}> = [];

		for (const addonId of addonIds) {
			const conflict = this.checkConflict(addonId, activeAddonIds);
			if (conflict) {
				conflicts.push({
					addonId,
					...conflict,
				});
			}
		}

		// También verificar conflictos entre los add-ons que se intentan activar
		for (let i = 0; i < addonIds.length; i++) {
			for (let j = i + 1; j < addonIds.length; j++) {
				const conflictGroup = this.conflictGroups.find(
					(group) => group.addons.includes(addonIds[i]) && group.addons.includes(addonIds[j]),
				);

				if (conflictGroup) {
					conflicts.push({
						addonId: addonIds[i],
						conflict: conflictGroup,
						conflictingAddon: addonIds[j],
					});
				}
			}
		}

		return conflicts;
	}

	/**
	 * Genera un mensaje de error amigable para el usuario
	 * @param addonId ID del add-on que causa conflicto
	 * @param conflict Información del conflicto
	 * @param conflictingAddon ID del add-on que está en conflicto
	 * @returns Mensaje de error formateado
	 */
	generateErrorMessage(addonId: string, conflict: ConflictGroup, conflictingAddon: string): string {
		const addonNames = conflict.addons.map((id) => `"${id}"`).join(' y ');
		let message = `\n❌ Conflicto detectado:\n\n`;
		message += `   No puedes activar "${addonId}" porque "${conflictingAddon}" ya está activo.\n\n`;
		message += `   ${conflict.reason}\n\n`;
		message += `   Add-ons en conflicto: ${addonNames}\n\n`;

		if (conflict.recommended) {
			message += `   💡 Recomendación: Usa "${conflict.recommended}" (es el recomendado para este caso).\n\n`;
			message += `   Opciones:\n`;
			message += `   1. Desactiva "${conflictingAddon}" y luego activa "${addonId}"\n`;
			message += `   2. Mantén "${conflictingAddon}" y no actives "${addonId}"\n`;
			if (conflict.recommended === addonId) {
				message += `   3. ⭐ Usa "${addonId}" (recomendado) en lugar de "${conflictingAddon}"\n`;
			}
		} else {
			message += `   Opciones:\n`;
			message += `   1. Desactiva "${conflictingAddon}" y luego activa "${addonId}"\n`;
			message += `   2. Mantén "${conflictingAddon}" y no actives "${addonId}"\n`;
		}

		return message;
	}

	/**
	 * Obtiene todos los grupos de conflicto
	 */
	getConflictGroups(): ConflictGroup[] {
		return this.conflictGroups;
	}

	/**
	 * Agrega un nuevo grupo de conflicto
	 */
	addConflictGroup(group: ConflictGroup): void {
		this.conflictGroups.push(group);
	}
}

/**
 * Error personalizado para conflictos de add-ons
 */
export class AddonConflictError extends Error {
	public readonly addonId: string;
	public readonly conflictingAddon: string;
	public readonly conflictGroup: ConflictGroup;

	constructor(
		message: string,
		details: {
			addonId: string;
			conflictingAddon: string;
			conflictGroup: ConflictGroup;
		},
	) {
		super(message);
		this.name = 'AddonConflictError';
		this.addonId = details.addonId;
		this.conflictingAddon = details.conflictingAddon;
		this.conflictGroup = details.conflictGroup;
	}
}

/**
 * Instancia singleton del detector de conflictos
 */
let conflictDetectorInstance: AddonConflictDetector | null = null;

/**
 * Obtiene la instancia singleton del detector de conflictos
 */
export function getConflictDetector(): AddonConflictDetector {
	if (!conflictDetectorInstance) {
		conflictDetectorInstance = new AddonConflictDetector();
	}
	return conflictDetectorInstance;
}
