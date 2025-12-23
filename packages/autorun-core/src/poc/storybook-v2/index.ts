/**
 * POC Storybook V2 - API Pública
 *
 * Sistema simplificado para extraer código de componentes desde Storybook local
 */

export {
  findStoryFile,
  findComponentFiles,
  mapComponentNameToId,
  type StoryFile,
  type ComponentFiles,
} from './fileExtractor.js';

export { parseStoryCode, type ParsedStory } from './codeParser.js';

export {
  generateHTMLFromStory,
  generateHTMLFromComponentFiles,
  type GeneratedHTML,
} from './htmlGenerator.js';

export {
  implementComponentSimple,
  generateComponentHTML,
  type ImplementationResult,
} from './simpleImplementation.js';
