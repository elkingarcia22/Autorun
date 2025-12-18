/**
 * Helpers Index
 *
 * Exporta todos los helpers para uso fácil
 */

// Detección proactiva
export {
  detectComponentsProactively,
  getContextualChecklist,
  suggestNextStep,
  type DetectedComponent,
  type DetectionResult,
} from './proactiveDetection';

// Dashboard de progreso
export {
  createProgressDashboard,
  updateStoryProgress,
  generateProgressDashboard,
  generateProgressSummary,
  saveStateSnapshot,
  restoreStateSnapshot,
  cleanupSnapshots,
  type ImplementationProgress,
  type ProgressDashboard,
  type StoryProgress,
} from './implementationProgress';

// Dashboard class
export { ImplementationDashboard } from './implementationDashboard';

// Mensajes de error
export {
  generateClearErrorMessage,
  formatErrorMessage,
  generateContextualErrorMessage,
  type ErrorMessage,
} from './errorMessages';

// Detección de estado del wizard
export {
  readWizardState,
  hasWizardState,
  clearWizardState,
  detectWizardProblemInMessage,
  type WizardState,
} from './wizardStateDetector';

// ⭐ NUEVO: Detección automática del wizard state
export {
  autoDetectWizardState,
  processWizardState,
  type WizardDetectionResult,
} from './autoWizardDetection';

// ⭐ NUEVO: Procesar wizard state para el agente
export {
  processWizardStateForAgent,
  type ProcessWizardStateResult,
} from './processWizardStateForAgent';

// Detección automática de componentes ⭐ NUEVO
export {
  autoDetectComponent,
  executeAutoDetectionOnMessage,
  type AutoDetectionResult,
} from './autoComponentDetection';

// ⭐ NUEVO: Auto Message Handler (garantiza ejecución automática)
export {
  handleUserMessage,
  AUTO_MESSAGE_HANDLER_INSTRUCTIONS,
} from './autoMessageHandler';

// ⭐ NUEVO: Implementación desde Storybook
export {
  parseCodeFromStorybookUrl,
  parseCodeFromStory,
  type StorybookCodeBlock,
  type ParsedStorybookCode,
} from './storybookCodeParser';

export {
  parsePropsTableFromStorybookUrl,
  parsePropsFromComponent,
  type StorybookPropsTable,
  type ParsedStorybookProps,
} from './storybookPropsParser';

export {
  generateImplementationCode,
  type ImplementationCode,
  type CodeGenerationOptions,
} from './storybookCodeGenerator';

export {
  extractStructureFromStorybook,
  type StorybookStructure,
  type ExtractionOptions,
} from './storybookStructureExtractor';

export {
  implementComponentFromStorybook,
  getExampleCodeFromStorybook,
  getPropsFromStorybook,
  validateImplementation,
  type StorybookImplementationResult,
  type ImplementationRequest,
} from './storybookImplementationHelper';

// ⭐ NUEVO: Validación y corrección de IDs de Storybook
export {
  validateAndCorrectStorybookId,
  verifyStorybookIdExists,
  getCorrectStorybookIdWithRetry,
  buildValidatedStorybookUrl,
  type ValidationResult,
} from './storybookIdValidator';

// ⭐ NUEVO: Búsqueda de IDs con retry y múltiples estrategias
export {
  searchStorybookIdWithRetry,
  getStorybookIdWithSmartSearch,
  type SearchResult,
} from './storybookIdSearchWithRetry';

// ⭐ NUEVO: Extractores adicionales
export {
  extractAPIFromStorybook,
  type ComponentAPI,
  type APIMethod,
} from './storybookAPIExtractor';

export {
  extractCompositionFromStorybook,
  type ComponentComposition,
  type ComponentDependency,
} from './storybookCompositionExtractor';

export {
  extractBestPracticesFromStorybook,
  type BestPractices,
  type BestPractice,
} from './storybookBestPracticesExtractor';

export {
  extractRealWorldExamplesFromStorybook,
  type RealWorldExamples,
  type RealWorldExample,
} from './storybookRealWorldExamplesExtractor';

// ⭐ NUEVO: Sistema de pruebas
export {
  runStorybookImplementationTests,
  runQuickTest,
  type TestResult,
  type TestSuiteResult,
} from './storybookImplementationTester';

// ⭐ NUEVO: Helpers mejorados de implementación
export {
  extractExactCodeFromStorybook,
  getSourceCode,
  type ExactCodeResult,
  type ComponentStructure,
} from './storybookExactCodeExtractor';

export {
  verifyAndLoadCSS,
  checkCSSLoaded,
  type CSSVerificationResult,
} from './cssVerifier';

export {
  compareImplementationWithStorybook,
  compareHTMLStructure,
  type VisualComparisonResult,
} from './visualComparator';

export {
  validateBeforeImplementation,
  type PreImplementationChecklist,
  type PreImplementationValidationResult,
} from './preImplementationValidator';

// ⭐ NUEVO: Test implementation mejorado
export { testButtonModalImplementation } from './testImplementationFromStorybook';

// ⭐ NUEVO: Storybook Cache
export {
  getStorybookInfoCached,
  setStorybookInfoCached,
  hasStorybookInfoCached,
  invalidateStorybookCache,
  clearStorybookCache,
  getCacheStats,
  type CachedStorybookInfo,
  type StorybookInfo,
  type InteractionInfo,
} from './storybookCache';

// ⭐ NUEVO: Storybook Parallel Consult
export {
  consultStorybookCompleto,
  type ParallelConsultResult,
} from './storybookParallelConsult';

// ⭐ NUEVO: Storybook Interaction Extractor
export { extractInteractionInfo } from './storybookInteractionExtractor';

// ⭐ NUEVO: Storybook Structure Validator
export {
  validateStructureBeforeWrite,
  type StructureValidationResult,
} from './storybookStructureValidator';

// ⭐ NUEVO: Auto Write Interceptor
export {
  autoInterceptWrite,
  type AutoWriteInterceptorResult,
} from './autoWriteInterceptor';

// ⭐ NUEVO: Write Guard
export { guardWrite } from './writeGuard';

// ⭐ NUEVO: Detección automática de templates
export {
  detectAvailableTemplates,
  getMostRecentTemplate,
  detectTemplateToOpen,
  type TemplateInfo,
} from './templateDetector';

// ⭐ NUEVO: Llamada automática a MCP de Storybook
export {
  autoCallStorybookMCP,
  STORYBOOK_MCP_AUTO_CALLER_INSTRUCTIONS,
  type MCPCallResult as StorybookMCPCallResult,
} from './storybookMCPAutoCaller';

// ⭐ NUEVO: Detección de clases CSS correctas
export {
  detectButtonClasses,
  generateButtonHTML,
  isClassAvailable,
} from './cssClassDetector';

// ⭐ NUEVO: Validación de clases CSS
export {
  validateCSSClasses,
  validateCSSClassesSimple,
  extractCSSClasses,
  getComponentClassPrefix,
  getComponentCSS,
  type CSSValidationResult,
  type ClassSuggestion,
} from './cssClassValidator';

// ⭐ NUEVO: Extracción de código exacto con Browser MCP
export {
  extractExactCodeFromStorybookWithBrowser,
  extractCodeFromBrowserSnapshot,
} from './storybookExactCodeExtractorWithBrowser';

// ⭐ NUEVO: Verificación pre-implementación obligatoria (Mejora 5)
export {
  verifyBeforeImplementation as verifyBeforeImplementationComplete,
  type VerificationResult,
  type CheckResult,
} from './preImplementationVerification';

// ⭐ NUEVO: MCP con fallback seguro (Mejora 2)
export {
  getComponentPropsWithFallback,
  validateStructureAgainstProps,
  extractPropsVisually,
  type MCPCallResult,
  type ComponentProps,
} from './mcpWithFallback';

// ⭐ NUEVO: Priorizar pestaña Docs (Mejora 4)
export {
  getComponentInfoFromStorybook,
  extractDocsInfoFromSnapshot,
  type ComponentInfo,
  type DocsInfo,
  type CodeInfo,
} from './storybookDocsPriority';

// ⭐ NUEVO: Análisis de componentes internos
export {
  analyzeComponentInternals,
  type ComponentAnalysis,
  type InternalComponent,
  type ImplementationStep,
} from './componentInternalAnalysis';
