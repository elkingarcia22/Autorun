/**
 * Tests para GlobalTokenRegistry
 * 
 * Cubre:
 * - Fix A: parseTokensFromJSON() correcto
 * - Fix B: suggest() público
 * - Carga desde CSS y JSON
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { GlobalTokenRegistry } from '../GlobalTokenRegistry.js';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('GlobalTokenRegistry', () => {
  let registry: GlobalTokenRegistry;

  beforeEach(() => {
    registry = new GlobalTokenRegistry();
  });

  describe('parseTokensFromJSON (Fix A)', () => {
    it('debe parsear JSON correctamente (solo usar key cuando value es leaf)', async () => {
      // Mock JSON con estructura anidada
      const json = {
        light: {
          background: {
            'ubits-bg-1': '#ffffff',
            'ubits-bg-2': '#f5f5f5'
          },
          foreground: {
            'ubits-fg-1-high': '#000000'
          }
        },
        modifiers: {
          'modifiers-accent-brand': '#0070f3'
        }
      };

      // Usar reflection para acceder al método privado
      const parseMethod = (registry as any).parseTokensFromJSON.bind(registry);
      parseMethod(json);

      // Verificar que agrega '--ubits-bg-1' (no '--light-background-ubits-bg-1')
      expect(registry.has('--ubits-bg-1')).toBe(true);
      expect(registry.has('--ubits-bg-2')).toBe(true);
      expect(registry.has('--ubits-fg-1-high')).toBe(true);
      expect(registry.has('--modifiers-accent-brand')).toBe(true);
      
      // Verificar que NO agrega keys intermedias
      expect(registry.has('--light')).toBe(false);
      expect(registry.has('--background')).toBe(false);
    });
  });

  describe('suggest (Fix B)', () => {
    beforeEach(async () => {
      // Cargar tokens de prueba
      const tokens = [
        '--ubits-bg-1',
        '--ubits-bg-2',
        '--ubits-fg-1-high',
        '--ubits-fg-1-medium',
        '--ubits-spacing-md',
        '--ubits-border-radius-md',
        '--modifiers-accent-brand'
      ];
      
      for (const token of tokens) {
        (registry as any).tokens.add(token);
      }
    });

    it('debe ser público y sugerir tokens similares', () => {
      const suggestions = registry.suggest('--ubits-bg-999');
      
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions).toContain('--ubits-bg-1');
      expect(suggestions).toContain('--ubits-bg-2');
    });

    it('debe sugerir tokens con prefijo similar', () => {
      const suggestions = registry.suggest('--ubits-fg');
      
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions).toContain('--ubits-fg-1-high');
      expect(suggestions).toContain('--ubits-fg-1-medium');
    });
  });

  describe('has() y assertExists()', () => {
    beforeEach(async () => {
      (registry as any).tokens.add('--ubits-bg-1');
      (registry as any).tokens.add('--ubits-bg-2');
    });

    it('debe retornar true si el token existe', () => {
      expect(registry.has('--ubits-bg-1')).toBe(true);
      expect(registry.has('--ubits-bg-2')).toBe(true);
    });

    it('debe retornar false si el token no existe', () => {
      expect(registry.has('--ubits-bg-999')).toBe(false);
    });

    it('assertExists() debe lanzar error con sugerencias si el token no existe', () => {
      expect(() => {
        registry.assertExists('--ubits-bg-999');
      }).toThrow();
    });

    it('assertExists() no debe lanzar error si el token existe', () => {
      expect(() => {
        registry.assertExists('--ubits-bg-1');
      }).not.toThrow();
    });
  });
});

