import * as crypto from 'crypto';
import type { AutorunMode } from '../mcp-server/types';

/**
 * ✅ WatermarkMeta - Metadatos del watermark v2
 */
export interface WatermarkMeta {
  v: number;
  mode: AutorunMode;
  components: string[];
  widgets: string[];
  deps: string[];
  hash: string;
}

/**
 * ✅ WatermarkBlock - Bloque de watermark parseado con números de línea
 */
export interface WatermarkBlock {
  meta: WatermarkMeta;
  content: string;
  hash: string;
  startLine: number;  // ✅ Para verify diff-based
  endLine: number;    // ✅ Para verify diff-based
}

/**
 * ✅ Emite watermark v2
 * 
 * Formato:
 * <!-- AUTORUN: {"v":2,"mode":"prototypeTokens",...} -->
 * ...contenido...
 * <!-- /AUTORUN -->
 */
export function emitWatermark(
  meta: Omit<WatermarkMeta, 'hash'>,
  content: string
): { wrappedContent: string; hash: string } {
  const hash = computeHash(content);
  const fullMeta: WatermarkMeta = { ...meta, hash };
  
  const startMark = `<!-- AUTORUN: ${JSON.stringify(fullMeta)} -->`;
  const endMark = `<!-- /AUTORUN -->`;
  
  return {
    wrappedContent: `${startMark}\n${content}\n${endMark}`,
    hash
  };
}

/**
 * ✅ Parsea watermarks con números de línea (para verify diff-based)
 * 
 * Retorna bloques con startLine y endLine para verificación diff-based.
 */
export function parseWatermarks(fileContent: string): WatermarkBlock[] {
  const blocks: WatermarkBlock[] = [];
  const lines = fileContent.split('\n');
  
  let currentBlock: {
    startLine: number;
    startMark: string;
    content: string[];
  } | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1; // 1-indexed
    
    // Detectar inicio de bloque
    const startMatch = line.match(/<!--\s*AUTORUN:\s*({[\s\S]*?})\s*-->/);
    if (startMatch) {
      currentBlock = {
        startLine: lineNum,
        startMark: startMatch[1],
        content: []
      };
      continue;
    }
    
    // Detectar fin de bloque
    if (currentBlock && /<!--\s*\/AUTORUN\s*-->/.test(line)) {
      try {
        const meta = JSON.parse(currentBlock.startMark);
        const content = currentBlock.content.join('\n');
        const hash = computeHash(content);
        
        blocks.push({
          meta,
          content,
          hash,
          startLine: currentBlock.startLine,
          endLine: lineNum
        });
      } catch (error) {
        console.warn(`Error parseando watermark en línea ${currentBlock.startLine}: ${error}`);
      }
      
      currentBlock = null;
      continue;
    }
    
    // Acumular contenido del bloque
    if (currentBlock) {
      currentBlock.content.push(line);
    }
  }
  
  return blocks;
}

/**
 * ✅ Calcula hash del contenido
 * 
 * Usa SHA-256 y retorna los primeros 16 caracteres.
 */
export function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
}

/**
 * ✅ Valida hash de un bloque
 * 
 * Compara el hash del contenido actual con el hash almacenado en el meta.
 */
export function validateHash(block: WatermarkBlock): boolean {
  const expectedHash = computeHash(block.content);
  return block.meta.hash === expectedHash;
}

