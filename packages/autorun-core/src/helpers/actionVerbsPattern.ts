/**
 * ⚠️ CONSTANTE REUTILIZABLE: Todas las variantes de verbos de acción en español
 *
 * Incluye todas las formas verbales comunes para implementar, crear, agregar, etc.
 * Esta constante debe usarse en todos los patterns de detección de componentes.
 *
 * @example
 * ```typescript
 * import { ACTION_VERBS_PATTERN } from './actionVerbsPattern';
 * const pattern = new RegExp(`${ACTION_VERBS_PATTERN}.*\\btabs?\\b`, 'i');
 * ```
 */

export const ACTION_VERBS_PATTERN =
  '(?:' +
  // Implementar
  'implementar|implementa|implemento|implementé|implementando|' +
  // Crear
  'crear|crea|creo|creé|creando|' +
  // Agregar
  'agregar|agrega|agregó|agregando|' +
  // Añadir
  'añadir|añade|añadió|añadiendo|' +
  // Poner
  'poner|pon|pongo|puse|poniendo|' +
  // Hacer
  'hacer|hace|hago|hice|haciendo|' +
  // Colocar
  'colocar|coloca|coloco|coloqué|colocando|' +
  // Instalar
  'instalar|instala|instalo|instalé|instalando|' +
  // Insertar
  'insertar|inserta|inserto|inserté|insertando|' +
  // Necesitar
  'necesito|necesita|necesitamos|necesitan|' +
  // Querer
  'quiero|quiere|queremos|quieren|' +
  // Deber
  'debe|deben|debería|deberían|' +
  // Agregar más variantes comunes
  'agrega|agregué|agregamos|' +
  'añade|añadí|añadimos|' +
  'pon|ponemos|pusimos|' +
  'haz|hacemos|hicimos|' +
  'coloca|colocamos|colocamos|' +
  'instala|instalamos|instalamos|' +
  'inserta|insertamos|insertamos' +
  ')';

/**
 * Keywords para usar en arrays de keywords (sin regex)
 */
export const ACTION_VERBS_KEYWORDS = [
  'implementar',
  'implementa',
  'implemento',
  'implementé',
  'implementando',
  'crear',
  'crea',
  'creo',
  'creé',
  'creando',
  'agregar',
  'agrega',
  'agregó',
  'agregando',
  'agregué',
  'agregamos',
  'añadir',
  'añade',
  'añadió',
  'añadiendo',
  'añadí',
  'añadimos',
  'poner',
  'pon',
  'pongo',
  'puse',
  'poniendo',
  'ponemos',
  'pusimos',
  'hacer',
  'hace',
  'hago',
  'hice',
  'haciendo',
  'haz',
  'hacemos',
  'hicimos',
  'colocar',
  'coloca',
  'coloco',
  'coloqué',
  'colocando',
  'colocamos',
  'instalar',
  'instala',
  'instalo',
  'instalé',
  'instalando',
  'instalamos',
  'insertar',
  'inserta',
  'inserto',
  'inserté',
  'insertando',
  'insertamos',
  'necesito',
  'necesita',
  'necesitamos',
  'necesitan',
  'quiero',
  'quiere',
  'queremos',
  'quieren',
  'debe',
  'deben',
  'debería',
  'deberían',
];
