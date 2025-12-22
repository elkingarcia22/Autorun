/**
 * Tests para Watermark v2
 * 
 * Cubre:
 * - emitWatermark() y parseWatermarks()
 * - startLine y endLine
 * - Hash SHA-256
 */

import { describe, it, expect } from 'vitest';
import { emitWatermark, parseWatermarks, validateHash, type WatermarkMeta } from '../Watermark.js';

describe('Watermark v2', () => {
  describe('emitWatermark() y parseWatermarks()', () => {
    it('debe emitir y parsear watermark con números de línea', () => {
      const content = 'Contenido de prueba';
      const meta: Omit<WatermarkMeta, 'hash'> = {
        v: 2,
        mode: 'prototypeTokens',
        components: ['test-component'],
        widgets: [],
        deps: []
      };

      const { wrappedContent, hash } = emitWatermark(meta, content);
      const blocks = parseWatermarks(wrappedContent);

      expect(blocks.length).toBe(1);
      expect(blocks[0].meta.v).toBe(2);
      expect(blocks[0].meta.mode).toBe('prototypeTokens');
      expect(blocks[0].meta.components).toEqual(['test-component']);
      expect(blocks[0].meta.hash).toBe(hash);
      expect(blocks[0].startLine).toBeGreaterThan(0);
      expect(blocks[0].endLine).toBeGreaterThan(blocks[0].startLine);
    });

    it('debe calcular hash correctamente', () => {
      const content = 'Contenido de prueba';
      const meta: Omit<WatermarkMeta, 'hash'> = {
        v: 2,
        mode: 'prototypeTokens',
        components: [],
        widgets: [],
        deps: []
      };

      const { wrappedContent, hash } = emitWatermark(meta, content);
      const blocks = parseWatermarks(wrappedContent);

      expect(blocks[0].meta.hash).toBe(hash);
      expect(validateHash(blocks[0])).toBe(true);
    });

    it('debe detectar hash mismatch', () => {
      const content = 'Contenido de prueba';
      const meta: Omit<WatermarkMeta, 'hash'> = {
        v: 2,
        mode: 'prototypeTokens',
        components: [],
        widgets: [],
        deps: []
      };

      const { wrappedContent } = emitWatermark(meta, content);
      const blocks = parseWatermarks(wrappedContent);

      // Modificar contenido del bloque
      const modifiedBlock = {
        ...blocks[0],
        content: 'Contenido modificado'
      };
      expect(validateHash(modifiedBlock)).toBe(false);
    });

    it('debe parsear múltiples bloques', () => {
      const content1 = 'Contenido 1';
      const content2 = 'Contenido 2';
      
      const meta1: Omit<WatermarkMeta, 'hash'> = {
        v: 2,
        mode: 'prototypeTokens',
        components: ['component-1'],
        widgets: [],
        deps: []
      };
      
      const meta2: Omit<WatermarkMeta, 'hash'> = {
        v: 2,
        mode: 'prototypeTokens',
        components: ['component-2'],
        widgets: [],
        deps: []
      };

      const { wrappedContent: wrapped1 } = emitWatermark(meta1, content1);
      const { wrappedContent: wrapped2 } = emitWatermark(meta2, content2);
      
      const combined = `${wrapped1}\n${wrapped2}`;
      const blocks = parseWatermarks(combined);

      expect(blocks.length).toBe(2);
      expect(blocks[0].meta.components).toEqual(['component-1']);
      expect(blocks[1].meta.components).toEqual(['component-2']);
    });
  });
});

