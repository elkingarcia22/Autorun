/**
 * ✅ MCP Server v2 - Tipos TypeScript
 *
 * Tipos limpios y bien definidos para el nuevo MCP Server de Autorun
 * Creado desde cero - sin dependencias del anterior
 */

/**
 * ✅ AutorunMode - Modos de implementación de Autorun
 */
export type AutorunMode = 'strict' | 'prototypeTokens';

/**
 * Input para autorun.apply
 */
export interface AutorunApplyInput {
  message: string;
  targetFiles?: string[];
  options?: {
    skipVerification?: boolean;
    dryRun?: boolean;
    skipFormatting?: boolean;
    skipLinting?: boolean;
    skipAutoReload?: boolean;
    skipAutoCommit?: boolean;
    runVisualTests?: boolean;
    // ✅ Paso 7: Soporte para Mode B
    mode?: AutorunMode; // default: "strict" o auto-detectado por path
    requireStorybookMcp?: boolean; // default: true (fail-closed)
    allowPrototypeTokens?: boolean; // default: mode==="prototypeTokens"
    anchors?: {
      content: string; // default: "<!-- AUTORUN:ANCHOR:CONTENT -->"
      scripts: string; // default: "<!-- AUTORUN:ANCHOR:SCRIPTS -->"
    };
  };
  // ✅ Paso 7: Soporte para design intake (Figma/Image)
  design?: {
    figma?: {
      url: string;
      frameNodeId?: string;
    };
    image?: {
      kind: 'file' | 'url';
      value: string;
    };
  };
}

/**
 * Output para autorun.apply
 */
export interface AutorunApplyOutput {
  success: boolean;
  filesWritten: string[];
  verification: {
    preImplementation: boolean;
    postImplementation: boolean;
    prettier?: boolean;
    eslint?: {
      errors: number;
      fixed: number;
      warnings: number;
    };
    autoReload?: boolean;
    github?: {
      committed: boolean;
      pushed: boolean;
      commitHash?: string;
    };
    visual?: {
      passed: number;
      failed: number;
      new: number;
    };
    errors: string[];
    warnings: string[];
  };
  components: Array<{
    name: string;
    storybookId: string;
    implemented: boolean;
    verification?: {
      cssClasses: boolean;
      structure: boolean;
      requiredElements: boolean;
      accessibility: boolean;
      sourceCodeMatch: boolean;
    };
  }>;
  errors?: string[];
  warnings?: string[];
  plan?: any; // Plan basado en historias si está disponible
}

/**
 * Input para autorun.verify
 */
export interface AutorunVerifyInput {
  targetFiles?: string[] | 'diff';
  options?: {
    strict?: boolean;
    checkAutorunMarks?: boolean;
    checkStructure?: boolean;
    checkAccessibility?: boolean;
    // ✅ Paso 4: Soporte para staged y baseRef (para pre-commit y CI)
    staged?: boolean; // pre-commit: validar staged changes
    baseRef?: string; // CI/PR: comparar contra base (ej: origin/main)
    // ⭐ NUEVO: Reversión automática de cambios sin watermark
    autoRevert?: boolean; // Si es true, revierte automáticamente cambios sin watermark (default: true)
  };
}

/**
 * Output para autorun.verify
 */
export interface AutorunVerifyOutput {
  valid: boolean;
  errors: string[];
  warnings: string[];
  filesChecked: string[]; // Lista de archivos verificados
  files?: Array<{
    // Información detallada de cada archivo (opcional)
    path: string;
    hasAutorunMark: boolean;
    isValid: boolean;
    issues: string[];
  }>;
}

/**
 * Input para autorun.plan
 */
export interface AutorunPlanInput {
  message: string;
}

/**
 * Output para autorun.plan
 */
export interface AutorunPlanOutput {
  plan: {
    components: Array<{
      name: string;
      storybookId: string;
    }>;
    steps: Array<{
      step: number;
      description: string;
    }>;
    totalSteps: number;
  };
  blocked: boolean;
  reason?: string;
}

/**
 * Input para autorun.checklist
 */
export interface AutorunChecklistInput {
  componentName: string;
}

/**
 * Output para autorun.checklist
 */
export interface AutorunChecklistOutput {
  componentName: string;
  checklist: {
    storybookVercel: boolean;
    storybookMCP: boolean;
    documentation: boolean;
    comparison: boolean;
  };
  missingSteps: string[];
  completedSteps: string[];
  canImplement: boolean;
  reason?: string;
  plan?: any;
}

/**
 * Input para autorun.storybook.start
 */
export interface AutorunStorybookStartInput {
  port?: number;
  host?: string;
}

/**
 * Output para autorun.storybook.start
 */
export interface AutorunStorybookStartOutput {
  success: boolean;
  url?: string;
  error?: string;
  message?: string;
}

/**
 * Input para autorun.storybook.build
 */
export interface AutorunStorybookBuildInput {
  outputDir?: string;
}

/**
 * Output para autorun.storybook.build
 */
export interface AutorunStorybookBuildOutput {
  success: boolean;
  outputDir?: string;
  error?: string;
  message?: string;
}

/**
 * Input para autorun.storybook.extract
 */
export interface AutorunStorybookExtractInput {
  componentId?: string;
  componentName?: string;
  storyName?: string;
}

/**
 * Output para autorun.storybook.extract
 */
export interface AutorunStorybookExtractOutput {
  success: boolean;
  html?: string;
  js?: string;
  error?: string;
  message?: string;
  requiresBrowserMCP?: boolean;
  url?: string;
}

/**
 * Input para autorun.problems.list
 */
export interface AutorunProblemsListInput {
  category?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  limit?: number;
}

/**
 * Output para autorun.problems.list
 */
export interface AutorunProblemsListOutput {
  problems: Array<{
    id: string;
    category: string;
    severity: string;
    message?: string; // Opcional para compatibilidad
    description?: string; // Opcional para compatibilidad
    detectedAt?: string; // Opcional para compatibilidad
    metadata?: any; // Opcional para compatibilidad
    resolved: boolean;
  }>;
  total: number;
  unresolved: number;
}

/**
 * Input para autorun.github.commit
 */
export interface AutorunGitHubCommitInput {
  files: string[];
  message: string;
  push?: boolean;
}

/**
 * Output para autorun.github.commit
 */
export interface AutorunGitHubCommitOutput {
  success: boolean;
  commitHash?: string;
  error?: string;
  message?: string;
}

/**
 * Input para autorun.lint
 */
export interface AutorunLintInput {
  files: string[];
  fix?: boolean;
}

/**
 * Output para autorun.lint
 */
export interface AutorunLintOutput {
  success: boolean;
  errors: number;
  warnings: number;
  fixed: number;
  fixable: number;
  results: Array<{
    file: string;
    errors: number;
    warnings: number;
  }>;
  error?: string;
}

/**
 * Input para autorun.visual.test
 */
export interface AutorunVisualTestInput {
  componentId?: string;
  storyId?: string;
}

/**
 * Output para autorun.visual.test
 */
export interface AutorunVisualTestOutput {
  success: boolean;
  passed: number;
  failed: number;
  new: number;
  changed: number;
  error?: string;
}

/**
 * Input para autorun.handleUserMessage
 */
export interface AutorunHandleUserMessageInput {
  message: string;
  options?: {
    skipPreCheck?: boolean;
  };
}

/**
 * Output para autorun.handleUserMessage
 */
export interface AutorunHandleUserMessageOutput {
  success: boolean;
  detected: boolean;
  componentName?: string;
  blocked: boolean;
  reason?: string;
  mcpMessages?: Array<{
    componentName: string;
    storybookId: string;
    variant?: string;
    type?: string;
    properties?: string[];
  }>;
  plan?: {
    components: string[];
    steps: Array<{
      id: string;
      description: string;
      component?: string;
      story?: string;
    }>;
    totalSteps: number;
  };
  currentPhase?: string;
  nextPhase?: string;
  error?: string;
}

/**
 * Input para autorun.discoverComponent
 */
export interface AutorunDiscoverComponentInput {
  searchTerm: string;
}

/**
 * Output para autorun.discoverComponent
 */
export interface AutorunDiscoverComponentOutput {
  success: boolean;
  found: boolean;
  exactName?: string;
  componentId?: string;
  suggestions?: string[];
  error?: string;
}
