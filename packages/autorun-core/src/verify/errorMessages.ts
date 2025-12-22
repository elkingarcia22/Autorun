/**
 * ✅ Error Messages - Mensajes de error mejorados con instrucciones claras
 *
 * Proporciona mensajes de error detallados con soluciones específicas
 */

export interface ErrorSolution {
  issue: string;
  solution: string;
  documentation?: string[];
}

/**
 * ✅ Obtiene solución específica para un issue
 */
export function getSolutionForIssue(issue: string): string {
  const solutions: ErrorSolution[] = [
    {
      issue: 'Modificación fuera de bloques AUTORUN',
      solution:
        'Todos los cambios en prototypes/ deben estar dentro de bloques <!-- AUTORUN: ... --> ... <!-- /AUTORUN -->. Usa autorun.apply() para implementar componentes correctamente.',
      documentation: [
        'docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md',
        '.cursor/rules/00-autorun-enforcement.md',
      ],
    },
    {
      issue: 'Hash mismatch',
      solution:
        'El contenido del bloque AUTORUN fue modificado manualmente. Los bloques AUTORUN no deben modificarse directamente. Usa autorun.apply() para hacer cambios.',
      documentation: [
        'docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md',
      ],
    },
    {
      issue: 'Color hardcodeado',
      solution:
        'No se permiten colores hardcodeados (#hex, rgb, rgba, hsl, hsla, white, black) en CSS. Usa tokens CSS: var(--ubits-*) o var(--modifiers-*).',
      documentation: [
        'docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md',
        'docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md',
      ],
    },
    {
      issue: 'Token no encontrado',
      solution:
        'El token usado no existe en GlobalTokenRegistry. Verifica el nombre del token o usa uno de los tokens disponibles.',
      documentation: ['docs/referencia/CATALOGO-COMPONENTES-UBITS.md'],
    },
    {
      issue: 'Fallback keyword prohibido',
      solution:
        'No se permiten fallbacks de color (white, black) en var(). Usa solo keywords seguras: transparent, currentColor, inherit, initial, unset.',
      documentation: ['docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md'],
    },
    {
      issue: 'watermark roto',
      solution:
        'El bloque AUTORUN está mal formado o incompleto. Verifica que tenga <!-- AUTORUN: ... --> al inicio y <!-- /AUTORUN --> al final.',
      documentation: [
        'docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md',
      ],
    },
  ];

  // Buscar solución específica
  for (const sol of solutions) {
    if (issue.toLowerCase().includes(sol.issue.toLowerCase())) {
      let message = `💡 Solución: ${sol.solution}`;
      if (sol.documentation && sol.documentation.length > 0) {
        message += `\n\n📚 Documentación:\n${sol.documentation.map((doc) => `   - ${doc}`).join('\n')}`;
      }
      return message;
    }
  }

  // Solución genérica
  return `💡 Solución: Revisa la documentación en docs/guias/implementacion/ para más información sobre cómo corregir este problema.`;
}

/**
 * ✅ Genera mensaje de error completo con soluciones
 */
export function generateErrorMessage(
  errors: string[],
  warnings: string[],
  files: Array<{ path: string; issues: string[] }>
): string {
  let message = '❌ Verificación de Autorun falló\n\n';

  if (errors.length > 0) {
    message += '🔴 Errores encontrados:\n';
    errors.forEach((error, index) => {
      message += `   ${index + 1}. ${error}\n`;
      message += `   ${getSolutionForIssue(error)}\n\n`;
    });
  }

  if (warnings.length > 0) {
    message += '⚠️ Advertencias:\n';
    warnings.forEach((warning, index) => {
      message += `   ${index + 1}. ${warning}\n`;
    });
    message += '\n';
  }

  if (files.length > 0) {
    message += '📁 Archivos con problemas:\n';
    files.forEach((file) => {
      if (file.issues.length > 0) {
        message += `   - ${file.path}:\n`;
        file.issues.forEach((issue) => {
          message += `     • ${issue}\n`;
        });
      }
    });
    message += '\n';
  }

  message += '💡 Pasos para corregir:\n';
  message +=
    '   1. Usa autorun.apply() para implementar componentes en prototypes/\n';
  message += '   2. No modifiques bloques AUTORUN manualmente\n';
  message +=
    '   3. Usa solo tokens CSS (var(--ubits-*) o var(--modifiers-*))\n';
  message +=
    '   4. Ejecuta autorun.verify({ targetFiles: "diff" }) antes de commitear\n';
  message += '\n';
  message += '📚 Documentación:\n';
  message +=
    '   - docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md\n';
  message += '   - docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md\n';
  message += '   - .cursor/rules/00-autorun-enforcement.md\n';

  return message;
}
