#!/usr/bin/env tsx

/**
 * 🧪 Script de Prueba: Una Herramienta MCP
 * 
 * Uso: tsx scripts/test-single-tool.ts <tool> [args...]
 * 
 * Ejemplos:
 *   tsx scripts/test-single-tool.ts test
 *   tsx scripts/test-single-tool.ts plan "implementar un button"
 *   tsx scripts/test-single-tool.ts checklist Button
 */

const tool = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  if (!tool) {
    console.error('❌ Error: Debes especificar una herramienta (test, plan, checklist)');
    process.exit(1);
  }

  try {
    switch (tool) {
      case 'test': {
        const { autorunTest } = await import('../packages/autorun-core/src/mcp-server-v2/tools/test.js');
        console.log('🧪 [PRUEBA] autorun.test');
        console.log('────────────────────────────────────────');
        const result = await autorunTest({ message: args[0] || 'Prueba de Button' });
        console.log('✅ autorun.test EXITOSO:');
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'plan': {
        const { autorunPlan } = await import('../packages/autorun-core/src/mcp-server-v2/tools/plan.js');
        console.log('📋 [PRUEBA] autorun.plan');
        console.log('────────────────────────────────────────');
        const message = args.join(' ') || 'implementar un button';
        console.log(`📝 Mensaje: "${message}"`);
        const result = await autorunPlan({ message });
        console.log('✅ autorun.plan EXITOSO:');
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'checklist': {
        const { autorunChecklist } = await import('../packages/autorun-core/src/mcp-server-v2/tools/checklist.js');
        console.log('📋 [PRUEBA] autorun.checklist');
        console.log('────────────────────────────────────────');
        const componentName = args[0] || 'Button';
        console.log(`📦 Componente: ${componentName}`);
        const result = await autorunChecklist({ componentName });
        console.log('✅ autorun.checklist EXITOSO:');
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'verify': {
        const { autorunVerify } = await import('../packages/autorun-core/src/mcp-server-v2/tools/verify.js');
        console.log('🔍 [PRUEBA] autorun.verify');
        console.log('────────────────────────────────────────');
        const targetFiles = args[0] === 'diff' ? 'diff' : (args.length > 0 ? args : ['diff']);
        console.log(`📋 targetFiles: ${typeof targetFiles === 'string' ? targetFiles : targetFiles.join(', ')}`);
        const result = await autorunVerify({ 
          targetFiles: targetFiles as any,
          options: {
            strict: false,
            checkAutorunMarks: true,
            checkStructure: true,
            checkAccessibility: true
          }
        });
        console.log('✅ autorun.verify EXITOSO:');
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      default:
        console.error(`❌ Error: Herramienta desconocida: ${tool}`);
        console.error('   Herramientas disponibles: test, plan, checklist, verify');
        process.exit(1);
    }
  } catch (error: any) {
    console.error(`❌ Error ejecutando ${tool}:`);
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();

