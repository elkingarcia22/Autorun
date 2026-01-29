/**
 * Autorun MCP Server
 *
 * Exportaciones principales del servidor MCP de Autorun
 * 
 * ⚠️ NOTA: El servidor principal ahora está en mcp-server-v2/
 * Este archivo mantiene las exportaciones de tipos y helpers que todavía se usan
 */

// ⚠️ DEPRECADO: startAutorunMCPServer está en mcp-server-old/
// Usar startAutorunMCPServerV2 desde mcp-server-v2/ en su lugar
// export { startAutorunMCPServer } from './autorunMCPServer.js';

// ✅ Exportar tipos (aún se usan)
export * from './types.js';

// ✅ Exportar helpers (aún se usan)
export { AddonOrchestrator } from './helpers/addonOrchestrator.js';
export {
	generateCodeWithAutorunMarks,
	parseAutorunMarks,
	hasAutorunMark,
	validateAutorunMark,
} from './helpers/codeMarkGenerator.js';

// ✅ Exportar tools (aún se usan desde mcp-server-v2)
export { autorunPlan } from './tools/autorunPlan.js';
export { autorunApply } from './tools/autorunApply.js';
export { autorunVerify } from './tools/autorunVerify.js';
export { autorunChecklist } from './tools/autorunChecklist.js';
export { autorunStorybookStart } from './tools/autorunStorybookStart.js';
export { autorunStorybookBuild } from './tools/autorunStorybookBuild.js';
export { autorunStorybookExtract } from './tools/autorunStorybookExtract.js';
export { autorunProblemsList } from './tools/autorunProblemsList.js';
export { autorunGitHubCommit } from './tools/autorunGitHubCommit.js';
export { autorunLint } from './tools/autorunLint.js';
export { autorunVisualTest } from './tools/autorunVisualTest.js';
