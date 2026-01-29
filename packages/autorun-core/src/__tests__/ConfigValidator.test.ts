/**
 * Tests para ConfigValidator
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigValidator } from '../validation/ConfigValidator';

describe('ConfigValidator', () => {
	let validator: ConfigValidator;

	beforeEach(() => {
		validator = new ConfigValidator();
	});

	describe('validate', () => {
		it('debe validar configuración válida', () => {
			const config = {
				autorun: {
					version: '1.0.0',
					projectType: 'ubits',
					addons: {
						active: ['github', 'storybook'],
						config: {},
					},
				},
			};

			const result = validator.validate(config);
			expect(result.valid).toBe(true);
			expect(result.errors).toEqual([]);
		});

		it('debe rechazar configuración inválida (no es objeto)', () => {
			const config = 'invalid';

			const result = validator.validate(config);
			expect(result.valid).toBe(false);
			expect(result.errors.length).toBeGreaterThan(0);
		});

		it('debe rechazar projectType inválido', () => {
			const config = {
				autorun: {
					projectType: 'invalid',
				},
			};

			const result = validator.validate(config);
			expect(result.valid).toBe(false);
			expect(result.errors.some((e) => e.path === 'autorun.projectType')).toBe(true);
		});

		it('debe rechazar addons.active que no sea array', () => {
			const config = {
				autorun: {
					addons: {
						active: 'not-an-array',
					},
				},
			};

			const result = validator.validate(config);
			expect(result.valid).toBe(false);
			expect(result.errors.some((e) => e.path === 'autorun.addons.active')).toBe(true);
		});

		it('debe rechazar elementos no-string en addons.active', () => {
			const config = {
				autorun: {
					addons: {
						active: ['valid', 123, 'also-valid'],
					},
				},
			};

			const result = validator.validate(config);
			expect(result.valid).toBe(false);
			expect(result.errors.some((e) => e.path.includes('autorun.addons.active'))).toBe(true);
		});
	});

	describe('generateErrorMessage', () => {
		it('debe generar mensaje para configuración válida', () => {
			const message = validator.generateErrorMessage([]);
			expect(message).toBe('Configuración válida');
		});

		it('debe generar mensaje con errores', () => {
			const errors = [
				{
					path: 'autorun.projectType',
					message: 'Debe ser "ubits" o "independent"',
					value: 'invalid',
				},
				{
					path: 'autorun.addons.active',
					message: 'Debe ser un array de strings',
				},
			];

			const message = validator.generateErrorMessage(errors);
			expect(message).toContain('2 error(es)');
			expect(message).toContain('autorun.projectType');
			expect(message).toContain('autorun.addons.active');
		});
	});
});
