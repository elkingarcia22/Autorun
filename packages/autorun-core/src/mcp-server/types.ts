/**
 * Tipos TypeScript para Autorun MCP Server
 *
 * Define todas las interfaces y tipos para los tools MCP de Autorun
 */

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
      detected: boolean;
      confidence?: 'high' | 'medium' | 'low';
    }>;
    steps: Array<{
      step: number;
      description: string;
      required: boolean;
      estimatedTime?: string;
    }>;
    estimatedTime?: string;
    totalSteps: number;
  };
  blocked: boolean;
  reason?: string;
  storybookUrls?: string[];
  mcpMessages?: Array<{
    componentName: string;
    storybookId: string;
  }>;
}

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
  targetFiles: string[] | 'diff';
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
  suggestions: string[];
  files: Array<{
    path: string;
    hasAutorunMark: boolean;
    isValid: boolean;
    issues: string[];
    metadata?: {
      component?: string;
      storybookId?: string;
      story?: string;
      hash?: string;
      timestamp?: string;
    };
  }>;
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
  plan?: any; // Plan basado en historias si está disponible
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
  port?: number;
  message?: string;
  error?: string;
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
  message?: string;
  error?: string;
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
    description: string;
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    detectedAt: string;
    resolved: boolean;
    metadata?: any;
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
  pushed?: boolean;
  message?: string;
  error?: string;
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
    fixed: number;
    messages: Array<{
      line: number;
      column: number;
      message: string;
      severity: 'error' | 'warning';
      rule?: string;
    }>;
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
  results?: Array<{
    component: string;
    story: string;
    status: 'passed' | 'failed' | 'new' | 'changed';
    diff?: string;
  }>;
  error?: string;
}

/**
 * Input para autorun.storybook.extract
 *
 * Extrae código HTML/JS directamente desde Storybook usando Browser MCP internamente.
 * Evita tener que modificar Storybook para crear historias "code".
 */
export interface AutorunStorybookExtractInput {
  /**
   * ID del componente en Storybook (ej: "formularios-radio-button")
   */
  componentId?: string;
  /**
   * Nombre del componente (ej: "RadioButton") - se mapea automáticamente a componentId
   */
  componentName?: string;
  /**
   * Nombre de la historia a extraer (default: "auto" - busca "code" primero, luego "implementation")
   */
  storyName?: string;
}

/**
 * Output para autorun.storybook.extract
 */
export interface AutorunStorybookExtractOutput {
  success: boolean;
  /**
   * Código extraído (null si falló)
   */
  code: {
    html: string;
    js?: string;
    css?: string[];
  } | null;
  /**
   * ID del componente usado
   */
  componentId?: string;
  /**
   * Nombre de la historia usada
   */
  storyName?: string;
  /**
   * Si requiere Browser MCP para extraer
   */
  requiresBrowserMCP: boolean;
  /**
   * Instrucciones para usar Browser MCP si es necesario
   */
  browserMCPInstructions?: {
    url: string;
    storyName: string;
    steps: string[];
  };
  /**
   * Mensaje de error si falló
   */
  error?: string;
}

/**
 * Metadata de marca Autorun en código generado
 */
export interface AutorunMarkMetadata {
  component: string;
  storybookId: string;
  story: string;
  hash: string;
  timestamp: string;
  version?: string;
  dependsOn?: {
    required: string[];
    optional: string[];
  };
  internals?: string[];
}
