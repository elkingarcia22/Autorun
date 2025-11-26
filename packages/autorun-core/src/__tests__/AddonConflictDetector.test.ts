/**
 * Tests para AddonConflictDetector
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
	AddonConflictDetector,
	CONFLICT_GROUPS,
} from '../AddonConflictDetector';

describe('AddonConflictDetector', () => {
	let detector: AddonConflictDetector;

	beforeEach(() => {
		detector = new AddonConflictDetector();
	});

	describe('checkConflict', () => {
		it('debe detectar conflicto entre jest y vitest', () => {
			const activeAddons = ['vitest'];
			const conflict = detector.checkConflict('jest', activeAddons);

			expect(conflict).not.toBeNull();
			expect(conflict?.conflictingAddon).toBe('vitest');
			expect(conflict?.conflict.addons).toContain('jest');
			expect(conflict?.conflict.addons).toContain('vitest');
		});

		it('debe detectar conflicto entre docusaurus y storybook', () => {
			const activeAddons = ['storybook'];
			const conflict = detector.checkConflict('docusaurus', activeAddons);

			expect(conflict).not.toBeNull();
			expect(conflict?.conflictingAddon).toBe('storybook');
		});

		it('no debe detectar conflicto si no hay add-ons activos', () => {
			const activeAddons: string[] = [];
			const conflict = detector.checkConflict('jest', activeAddons);

			expect(conflict).toBeNull();
		});

		it('no debe detectar conflicto si el add-on no está en ningún grupo', () => {
			const activeAddons = ['github'];
			const conflict = detector.checkConflict('playwright', activeAddons);

			expect(conflict).toBeNull();
		});
	});

	describe('checkMultipleConflicts', () => {
		it('debe detectar múltiples conflictos', () => {
			const activeAddons = ['vitest'];
			const addonsToActivate = ['jest', 'playwright'];

			const conflicts = detector.checkMultipleConflicts(
				addonsToActivate,
				activeAddons,
			);

			expect(conflicts.length).toBeGreaterThan(0);
			expect(conflicts.some((c) => c.addonId === 'jest')).toBe(true);
		});

		it('debe detectar conflictos entre add-ons a activar', () => {
			const activeAddons: string[] = [];
			const addonsToActivate = ['jest', 'vitest'];

			const conflicts = detector.checkMultipleConflicts(
				addonsToActivate,
				activeAddons,
			);

			expect(conflicts.length).toBeGreaterThan(0);
		});
	});

	describe('generateErrorMessage', () => {
		it('debe generar mensaje de error descriptivo', () => {
			const conflict = detector.checkConflict('jest', ['vitest']);
			if (!conflict) {
				throw new Error('Debería haber conflicto');
			}

			const message = detector.generateErrorMessage(
				'jest',
				conflict.conflict,
				conflict.conflictingAddon,
			);

			expect(message).toContain('Conflicto detectado');
			expect(message).toContain('jest');
			expect(message).toContain('vitest');
			expect(message).toContain('Opciones');
		});
	});

	describe('getConflictGroups', () => {
		it('debe retornar grupos de conflicto', () => {
			const groups = detector.getConflictGroups();
			expect(groups.length).toBeGreaterThan(0);
			expect(groups).toEqual(CONFLICT_GROUPS);
		});
	});
});

