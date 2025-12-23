/**
 * POC Storybook V2 - API Pública
 *
 * Sistema simplificado para extraer código de componentes desde Storybook local
 */

export {
  findStoryFile,
  mapComponentNameToId,
  type StoryFile,
} from './fileExtractor.js';

export { parseStoryCode, type ParsedStory } from './codeParser.js';

// TODO: Exportar cuando estén implementados
// export { generateHTMLFromStory, type GeneratedHTML } from './htmlGenerator.js';
// export { implementComponentSimple, type ImplementationResult } from './simpleImplementation.js';
