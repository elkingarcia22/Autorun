/**
 * Code Mark Generator
 *
 * Genera y parsea marcas Autorun en código generado para auditoría y verificación.
 */

import { AutorunMarkMetadata } from '../types';
import * as crypto from 'crypto';

/**
 * Genera código con marcas Autorun
 */
export function generateCodeWithAutorunMarks(
  code: string,
  componentName: string,
  componentId: string,
  story: string = 'default',
  version?: string
): string {
  const timestamp = new Date().toISOString();
  const hash = generateHash(code + componentId + story + timestamp);

  const metadata: AutorunMarkMetadata = {
    component: componentName,
    storybookId: componentId,
    story,
    hash,
    timestamp,
    version: version || '1.0.0',
  };

  const mark = generateAutorunMark(metadata);

  // Agregar marca al inicio del código
  return `${mark}\n${code}`;
}

/**
 * Genera el comentario de marca Autorun
 */
function generateAutorunMark(metadata: AutorunMarkMetadata): string {
  return `<!-- 
  AUTORUN-GENERATED
  component: ${metadata.component}
  storybookId: ${metadata.storybookId}
  story: ${metadata.story}
  hash: ${metadata.hash}
  timestamp: ${metadata.timestamp}
  version: ${metadata.version}
-->`;
}

/**
 * Genera hash simple del código
 */
function generateHash(str: string): string {
  return crypto.createHash('sha256').update(str).digest('hex').substring(0, 16);
}

/**
 * Parsea marcas Autorun del código
 */
export function parseAutorunMarks(code: string): AutorunMarkMetadata | null {
  // Buscar marca AUTORUN-GENERATED
  const markRegex =
    /<!--\s*AUTORUN-GENERATED[\s\S]*?component:\s*([^\n]+)[\s\S]*?storybookId:\s*([^\n]+)[\s\S]*?story:\s*([^\n]+)[\s\S]*?hash:\s*([^\n]+)[\s\S]*?timestamp:\s*([^\n]+)[\s\S]*?(?:version:\s*([^\n]+))?[\s\S]*?-->/i;

  const match = code.match(markRegex);
  if (!match) {
    return null;
  }

  return {
    component: match[1].trim(),
    storybookId: match[2].trim(),
    story: match[3].trim(),
    hash: match[4].trim(),
    timestamp: match[5].trim(),
    version: match[6]?.trim() || '1.0.0',
  };
}

/**
 * Verifica si el código tiene marca Autorun
 */
export function hasAutorunMark(code: string): boolean {
  return /AUTORUN-GENERATED/i.test(code);
}

/**
 * Valida que el hash del código coincida con la marca
 */
export function validateAutorunMark(code: string): {
  valid: boolean;
  reason?: string;
  metadata?: AutorunMarkMetadata;
} {
  const metadata = parseAutorunMarks(code);
  if (!metadata) {
    return {
      valid: false,
      reason: 'No se encontró marca AUTORUN-GENERATED',
    };
  }

  // Extraer código sin la marca para validar hash
  const codeWithoutMark = code.replace(
    /<!--\s*AUTORUN-GENERATED[\s\S]*?-->\s*/i,
    ''
  );
  const expectedHash = generateHash(
    codeWithoutMark + metadata.storybookId + metadata.story + metadata.timestamp
  );

  if (metadata.hash !== expectedHash) {
    return {
      valid: false,
      reason: 'Hash del código no coincide con la marca',
      metadata,
    };
  }

  return {
    valid: true,
    metadata,
  };
}
