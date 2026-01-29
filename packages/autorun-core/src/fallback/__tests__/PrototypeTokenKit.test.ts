/**
 * Tests para PrototypeTokenKit
 * 
 * Cubre:
 * - Generación de widgets sin colores hardcodeados
 * - Validación de tokens antes de generar
 * - Todos los widgets (KpiCard, FiltersRow, EmptyState, etc.)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { PrototypeTokenKit } from '../PrototypeTokenKit.js';
import { GlobalTokenRegistry } from '../../tokens/GlobalTokenRegistry.js';

describe('PrototypeTokenKit', () => {
  let registry: GlobalTokenRegistry;
  let tokenKit: PrototypeTokenKit;

  beforeEach(async () => {
    registry = new GlobalTokenRegistry();
    
    // Agregar tokens de prueba
    (registry as any).tokens.add('--ubits-bg-1');
    (registry as any).tokens.add('--ubits-bg-2');
    (registry as any).tokens.add('--ubits-fg-1-high');
    (registry as any).tokens.add('--ubits-fg-1-medium');
    (registry as any).tokens.add('--ubits-border-1');
    (registry as any).tokens.add('--ubits-border-radius-md');
    (registry as any).tokens.add('--ubits-spacing-xs');
    (registry as any).tokens.add('--ubits-spacing-sm');
    (registry as any).tokens.add('--ubits-spacing-md');
    (registry as any).tokens.add('--ubits-spacing-lg');
    (registry as any).tokens.add('--ubits-spacing-xl');
    (registry as any).tokens.add('--ubits-font-weight-bold');
    (registry as any).tokens.add('--ubits-accent-brand');
    (registry as any).tokens.add('--ubits-fg-on-brand');
    (registry as any).tokens.add('--ubits-border-radius-sm');
    
    tokenKit = new PrototypeTokenKit(registry);
  });

  describe('generateKpiCard()', () => {
    it('debe generar KPI card sin colores hardcodeados', () => {
      const html = tokenKit.generateKpiCard({
        title: 'Total Ventas',
        value: '1,234'
      });

      // Verificar que NO contiene colores hardcodeados
      expect(html).not.toMatch(/#[0-9a-fA-F]{3,8}/i);
      expect(html).not.toMatch(/rgb\s*\(/i);
      expect(html).not.toMatch(/rgba\s*\(/i);
      expect(html).not.toMatch(/hsl\s*\(/i);
      expect(html).not.toMatch(/hsla\s*\(/i);
      expect(html).not.toMatch(/\b(white|black)\b/i);

      // Verificar que usa tokens
      expect(html).toMatch(/var\(--ubits-/);
      
      // Verificar contenido
      expect(html).toContain('Total Ventas');
      expect(html).toContain('1,234');
    });
  });

  describe('generateFiltersRow()', () => {
    it('debe generar filters row sin colores hardcodeados', () => {
      const html = tokenKit.generateFiltersRow({
        filters: [
          { label: 'Filtro 1', type: 'text' },
          { label: 'Filtro 2', type: 'select' }
        ]
      });

      expect(html).not.toMatch(/#[0-9a-fA-F]{3,8}/i);
      expect(html).not.toMatch(/rgb\s*\(/i);
      expect(html).toMatch(/var\(--ubits-/);
      expect(html).toContain('Filtro 1');
      expect(html).toContain('Filtro 2');
    });
  });

  describe('generateEmptyState()', () => {
    it('debe generar empty state sin colores hardcodeados', () => {
      const html = tokenKit.generateEmptyState({
        title: 'No hay datos',
        description: 'No se encontraron resultados'
      });

      expect(html).not.toMatch(/#[0-9a-fA-F]{3,8}/i);
      expect(html).not.toMatch(/rgb\s*\(/i);
      expect(html).toMatch(/var\(--ubits-/);
      expect(html).toContain('No hay datos');
      expect(html).toContain('No se encontraron resultados');
    });
  });

  describe('generateSimpleCard()', () => {
    it('debe generar simple card sin colores hardcodeados', () => {
      const html = tokenKit.generateSimpleCard({
        title: 'Título',
        content: '<p>Contenido</p>'
      });

      expect(html).not.toMatch(/#[0-9a-fA-F]{3,8}/i);
      expect(html).not.toMatch(/rgb\s*\(/i);
      expect(html).toMatch(/var\(--ubits-/);
      expect(html).toContain('Título');
      expect(html).toContain('Contenido');
    });
  });

  describe('Validación de tokens', () => {
    it('debe lanzar error si falta token requerido', () => {
      const emptyRegistry = new GlobalTokenRegistry();
      const emptyKit = new PrototypeTokenKit(emptyRegistry);

      expect(() => {
        emptyKit.generateKpiCard({ title: 'Test', value: '0' });
      }).toThrow();
    });
  });
});

