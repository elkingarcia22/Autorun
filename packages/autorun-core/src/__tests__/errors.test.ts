/**
 * Tests para clases de error
 */

import { describe, it, expect } from 'vitest';
import {
	AutorunError,
	AddonNotFoundError,
	AddonLoadError,
	MissingDependencyError,
	HubNotInitializedError,
	HubAlreadyInitializedError,
	InvalidConfigError,
	ConfigFileError,
	AddonInitializationError,
	AddonActivationError,
	ServiceNotFoundError,
} from '../errors/AutorunErrors';

describe('AutorunErrors', () => {
	describe('AutorunError', () => {
		it('debe crear error base con código', () => {
			const error = new AutorunError('Test error', 'TEST_CODE');
			expect(error).toBeInstanceOf(Error);
			expect(error).toBeInstanceOf(AutorunError);
			expect(error.code).toBe('TEST_CODE');
			expect(error.message).toBe('Test error');
		});

		it('debe incluir contexto', () => {
			const context = { addonId: 'test' };
			const error = new AutorunError('Test', 'CODE', context);
			expect(error.context).toEqual(context);
		});
	});

	describe('AddonNotFoundError', () => {
		it('debe crear error con mensaje descriptivo', () => {
			const error = new AddonNotFoundError('test-addon');
			expect(error).toBeInstanceOf(AddonNotFoundError);
			expect(error.code).toBe('ADDON_NOT_FOUND');
			expect(error.message).toContain('test-addon');
		});

		it('debe sugerir add-ons disponibles', () => {
			const error = new AddonNotFoundError('test', ['github', 'storybook']);
			expect(error.message).toContain('disponibles');
			expect(error.message).toContain('github');
		});
	});

	describe('MissingDependencyError', () => {
		it('debe listar dependencias faltantes', () => {
			const error = new MissingDependencyError('test', ['dep1', 'dep2']);
			expect(error.code).toBe('MISSING_DEPENDENCY');
			expect(error.message).toContain('dep1');
			expect(error.message).toContain('dep2');
		});
	});

	describe('HubNotInitializedError', () => {
		it('debe incluir la operación en el mensaje', () => {
			const error = new HubNotInitializedError('activateAddon');
			expect(error.message).toContain('activateAddon');
			expect(error.message).toContain('initialize()');
		});
	});

	describe('InvalidConfigError', () => {
		it('debe incluir razón y errores', () => {
			const errors = ['Error 1', 'Error 2'];
			const error = new InvalidConfigError('Invalid', 'path.json', errors);
			expect(error.message).toContain('Invalid');
			expect(error.message).toContain('Error 1');
			expect(error.message).toContain('Error 2');
		});
	});
});

