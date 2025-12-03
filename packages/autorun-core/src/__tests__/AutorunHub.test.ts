/**
 * Tests para AutorunHub
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AutorunHub } from '../AutorunHub';
import {
	HubNotInitializedError,
	HubAlreadyInitializedError,
	AddonNotFoundError,
} from '../errors/AutorunErrors';

// Mock fs/promises
vi.mock('fs/promises', async (importOriginal) => {
	const actual = await importOriginal<typeof import('fs/promises')>();
	return {
		...actual,
		readFile: vi.fn(),
		writeFile: vi.fn(),
		mkdir: vi.fn(),
	};
});

import * as fs from 'fs/promises';

describe('AutorunHub', () => {
	let hub: AutorunHub;
	const mockConfigPath = '.ubits/project-config.json';

	beforeEach(() => {
		hub = new AutorunHub(mockConfigPath);
		vi.clearAllMocks();
	});

	describe('Constructor', () => {
		it('debe crear una instancia con path por defecto', () => {
			const defaultHub = new AutorunHub();
			expect(defaultHub).toBeInstanceOf(AutorunHub);
		});

		it('debe crear una instancia con path personalizado', () => {
			const customHub = new AutorunHub('custom/path.json');
			expect(customHub).toBeInstanceOf(AutorunHub);
		});
	});

	describe('initialize', () => {
		it('debe inicializar el hub correctamente', async () => {
			(fs.readFile as any).mockRejectedValueOnce({ code: 'ENOENT' });
			(fs.mkdir as any).mockResolvedValueOnce(undefined);
			(fs.writeFile as any).mockResolvedValueOnce(undefined);

			await hub.initialize();

			expect(hub.isInitialized()).toBe(true);
		});

		it('debe lanzar error si ya está inicializado', async () => {
			(fs.readFile as any).mockRejectedValueOnce({ code: 'ENOENT' });
			(fs.mkdir as any).mockResolvedValueOnce(undefined);
			(fs.writeFile as any).mockResolvedValueOnce(undefined);

			await hub.initialize();

			await expect(hub.initialize()).rejects.toThrow(HubAlreadyInitializedError);
		});
	});

	describe('isInitialized', () => {
		it('debe retornar false antes de inicializar', () => {
			expect(hub.isInitialized()).toBe(false);
		});

		it('debe retornar true después de inicializar', async () => {
			(fs.readFile as any).mockRejectedValueOnce({ code: 'ENOENT' });
			(fs.mkdir as any).mockResolvedValueOnce(undefined);
			(fs.writeFile as any).mockResolvedValueOnce(undefined);

			await hub.initialize();

			expect(hub.isInitialized()).toBe(true);
		});
	});

	describe('getActiveAddons', () => {
		it('debe retornar array vacío si no hay add-ons activos', async () => {
			(fs.readFile as any).mockRejectedValueOnce({ code: 'ENOENT' });
			(fs.mkdir as any).mockResolvedValueOnce(undefined);
			(fs.writeFile as any).mockResolvedValueOnce(undefined);

			await hub.initialize();

			const activeAddons = hub.getActiveAddons();
			expect(activeAddons).toEqual([]);
		});
	});

	describe('getAvailableAddons', () => {
		it('debe retornar array vacío si no hay add-ons registrados', async () => {
			(fs.readFile as any).mockRejectedValueOnce({ code: 'ENOENT' });
			(fs.mkdir as any).mockResolvedValueOnce(undefined);
			(fs.writeFile as any).mockResolvedValueOnce(undefined);

			await hub.initialize();

			const availableAddons = hub.getAvailableAddons();
			expect(availableAddons).toEqual([]);
		});
	});
});
