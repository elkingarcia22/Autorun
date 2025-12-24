/**
 * ⚠️ CONSTANTE REUTILIZABLE: Todas las variantes de verbos de acción en español e inglés
 *
 * Incluye todas las formas verbales comunes para implementar, crear, agregar, etc.
 * Esta constante debe usarse en todos los patterns de detección de componentes.
 *
 * Idiomas soportados:
 * - Español: implementar, crear, agregar, añadir, poner, hacer, colocar, instalar, insertar, etc.
 * - Inglés: implement, create, add, insert, place, make, install, build, set up, do, etc.
 *
 * @example
 * ```typescript
 * import { ACTION_VERBS_PATTERN } from './actionVerbsPattern';
 * const pattern = new RegExp(`${ACTION_VERBS_PATTERN}.*\\btabs?\\b`, 'i');
 * ```
 */

export const ACTION_VERBS_PATTERN =
  '(?:' +
  // ========== ESPAÑOL ==========
  // Implementar
  'implementar|implementa|implemento|implementé|implementando|' +
  // Crear
  'crear|crea|creo|creé|creando|' +
  // Agregar
  'agregar|agrega|agregó|agregando|agregué|agregamos|' +
  // Añadir
  'añadir|añade|añadió|añadiendo|añadí|añadimos|' +
  // Poner
  'poner|pon|pongo|puse|poniendo|ponemos|pusimos|' +
  // Hacer
  'hacer|hace|hago|hice|haciendo|haz|hacemos|hicimos|' +
  // Colocar
  'colocar|coloca|coloco|coloqué|colocando|colocamos|' +
  // Instalar
  'instalar|instala|instalo|instalé|instalando|instalamos|' +
  // Insertar
  'insertar|inserta|inserto|inserté|insertando|insertamos|' +
  // Necesitar
  'necesito|necesita|necesitamos|necesitan|' +
  // Querer
  'quiero|quiere|queremos|quieren|' +
  // Deber
  'debe|deben|debería|deberían|' +
  // ========== INGLÉS ==========
  // Implement
  'implement|implements|implementing|implemented|' +
  // Create
  'create|creates|creating|created|' +
  // Add
  'add|adds|adding|added|' +
  // Insert
  'insert|inserts|inserting|inserted|' +
  // Place
  'place|places|placing|placed|' +
  // Make
  'make|makes|making|made|' +
  // Install
  'install|installs|installing|installed|' +
  // Need
  'need|needs|needing|needed|' +
  // Want
  'want|wants|wanting|wanted|' +
  // Should/Must
  'should|must|shall|' +
  // Build
  'build|builds|building|built|' +
  // Set up
  'set\\s+up|sets\\s+up|setting\\s+up|setted\\s+up|' +
  // Put
  'put|puts|putting|' +
  // Do
  'do|does|doing|did|done' +
  ')';

/**
 * Keywords para usar en arrays de keywords (sin regex)
 */
export const ACTION_VERBS_KEYWORDS = [
  // ========== ESPAÑOL ==========
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
  // ========== INGLÉS ==========
  'implement',
  'implements',
  'implementing',
  'implemented',
  'create',
  'creates',
  'creating',
  'created',
  'add',
  'adds',
  'adding',
  'added',
  'insert',
  'inserts',
  'inserting',
  'inserted',
  'place',
  'places',
  'placing',
  'placed',
  'make',
  'makes',
  'making',
  'made',
  'install',
  'installs',
  'installing',
  'installed',
  'need',
  'needs',
  'needing',
  'needed',
  'want',
  'wants',
  'wanting',
  'wanted',
  'should',
  'must',
  'shall',
  'build',
  'builds',
  'building',
  'built',
  'set up',
  'sets up',
  'setting up',
  'put',
  'puts',
  'putting',
  'do',
  'does',
  'doing',
  'did',
  'done',
];
