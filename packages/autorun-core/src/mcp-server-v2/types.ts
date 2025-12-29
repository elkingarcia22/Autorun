/**
 * ✅ MCP Server v2 - Tipos TypeScript
 *
 * Tipos limpios y bien definidos para el nuevo MCP Server de Autorun
 * Creado desde cero - sin dependencias del anterior
 */

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
  };
}

/**
 * Output para autorun.apply
 */
export interface AutorunApplyOutput {
  success: boolean;
  filesWritten: string[];
  errors?: string[];
  warnings?: string[];
  verification?: {
    preImplementation: boolean;
    postImplementation: boolean;
  };
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
    message: string;
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
