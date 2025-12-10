/**
 * Guides Loader
 *
 * Sistema que carga automáticamente las guías de implementación necesarias
 * antes de permitir la implementación de un componente.
 *
 * ⚠️ CRÍTICO: Este sistema garantiza que las guías se lean automáticamente
 * antes de implementar cualquier componente.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface GuideLoadResult {
  loaded: boolean;
  guidePath: string;
  error?: string;
  content?: string;
}

export interface GuidesLoadResult {
  componentName?: string;
  generalGuides: GuideLoadResult[];
  componentSpecificGuides: GuideLoadResult[];
  allLoaded: boolean;
  errors: string[];
}

/**
 * Guías generales que SIEMPRE deben leerse
 */
const GENERAL_GUIDES = [
  'docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md',
  'docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md',
  'docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md',
  'docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md',
  'docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md',
];

/**
 * Mapeo de componentes a sus guías específicas
 */
const COMPONENT_SPECIFIC_GUIDES: Record<string, string[]> = {
  Tabs: [
    'docs/guias/implementacion/GUIA-ERROR-TABS-NO-SE-MUESTRAN.md',
    'docs/referencia/componentes/navegacin-tabs.md',
  ],
  DataTable: ['docs/referencia/componentes/data-table.md'],
  Modal: ['docs/referencia/componentes/modal.md'],
  Button: ['docs/referencia/componentes/button.md'],
  // Agregar más componentes según sea necesario
};

/**
 * Estrategias específicas por componente
 */
const COMPONENT_STRATEGIES: Record<string, string[]> = {
  Tooltip: [
    'docs/guias/implementacion/componentes/ESTRATEGIA-TOOLTIP-POPOVER.md',
  ],
  Popover: [
    'docs/guias/implementacion/componentes/ESTRATEGIA-TOOLTIP-POPOVER.md',
  ],
  // Agregar más estrategias según sea necesario
};

/**
 * Cargar una guía desde el sistema de archivos
 */
async function loadGuide(guidePath: string): Promise<GuideLoadResult> {
  try {
    // Resolver ruta relativa al workspace root
    const workspaceRoot = process.cwd();
    const fullPath = path.resolve(workspaceRoot, guidePath);

    // Verificar que el archivo existe
    try {
      await fs.access(fullPath);
    } catch {
      return {
        loaded: false,
        guidePath,
        error: `Archivo no encontrado: ${guidePath}`,
      };
    }

    // Leer el archivo
    const content = await fs.readFile(fullPath, 'utf-8');

    return {
      loaded: true,
      guidePath,
      content,
    };
  } catch (error: any) {
    return {
      loaded: false,
      guidePath,
      error: `Error al cargar: ${error.message}`,
    };
  }
}

/**
 * Cargar todas las guías necesarias para un componente
 */
export async function loadRequiredGuides(
  componentName?: string
): Promise<GuidesLoadResult> {
  console.log('\n📚 [Guides Loader] ========================================');
  console.log('📚 [Guides Loader] Cargando guías necesarias...');
  console.log(`📚 [Guides Loader] Componente: ${componentName || 'NINGUNO'}`);

  const result: GuidesLoadResult = {
    componentName,
    generalGuides: [],
    componentSpecificGuides: [],
    allLoaded: true,
    errors: [],
  };

  // 1. Cargar guías generales (SIEMPRE)
  console.log('📚 [Guides Loader] Cargando guías generales...');
  for (const guidePath of GENERAL_GUIDES) {
    const guideResult = await loadGuide(guidePath);
    result.generalGuides.push(guideResult);

    if (!guideResult.loaded) {
      result.allLoaded = false;
      result.errors.push(
        `❌ No se pudo cargar guía general: ${guidePath} - ${guideResult.error}`
      );
      console.warn(`  ⚠️ [Guides Loader] No se pudo cargar: ${guidePath}`);
    } else {
      console.log(`  ✅ [Guides Loader] Cargada: ${guidePath}`);
    }
  }

  // 2. Cargar guías específicas del componente (si aplica)
  if (componentName) {
    console.log(
      `📚 [Guides Loader] Cargando guías específicas para: ${componentName}...`
    );

    const specificGuides = COMPONENT_SPECIFIC_GUIDES[componentName] || [];
    for (const guidePath of specificGuides) {
      const guideResult = await loadGuide(guidePath);
      result.componentSpecificGuides.push(guideResult);

      if (!guideResult.loaded) {
        // Las guías específicas son opcionales, solo advertir
        console.warn(
          `  ⚠️ [Guides Loader] Guía específica no encontrada: ${guidePath}`
        );
      } else {
        console.log(`  ✅ [Guides Loader] Cargada: ${guidePath}`);
      }
    }

    // 3. Cargar estrategias específicas del componente (si aplica)
    const strategies = COMPONENT_STRATEGIES[componentName] || [];
    for (const strategyPath of strategies) {
      const strategyResult = await loadGuide(strategyPath);
      result.componentSpecificGuides.push(strategyResult);

      if (!strategyResult.loaded) {
        console.warn(
          `  ⚠️ [Guides Loader] Estrategia no encontrada: ${strategyPath}`
        );
      } else {
        console.log(`  ✅ [Guides Loader] Cargada: ${strategyPath}`);
      }
    }
  }

  // 4. Resumen
  const totalGuides =
    result.generalGuides.length + result.componentSpecificGuides.length;
  const loadedGuides =
    result.generalGuides.filter((g) => g.loaded).length +
    result.componentSpecificGuides.filter((g) => g.loaded).length;

  console.log(
    `📚 [Guides Loader] Resumen: ${loadedGuides}/${totalGuides} guías cargadas`
  );

  if (result.allLoaded) {
    console.log('✅ [Guides Loader] Todas las guías generales cargadas');
  } else {
    console.warn(
      '⚠️ [Guides Loader] Algunas guías generales no se pudieron cargar'
    );
  }

  console.log('📚 [Guides Loader] ========================================\n');

  return result;
}

/**
 * Verificar que se cargaron las guías necesarias
 */
export function verifyGuidesLoaded(guidesResult: GuidesLoadResult): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar que todas las guías generales se cargaron
  const generalGuidesNotLoaded = guidesResult.generalGuides.filter(
    (g) => !g.loaded
  );
  if (generalGuidesNotLoaded.length > 0) {
    errors.push(
      `❌ No se pudieron cargar ${generalGuidesNotLoaded.length} guías generales obligatorias:`
    );
    generalGuidesNotLoaded.forEach((guide) => {
      errors.push(`   - ${guide.guidePath}: ${guide.error}`);
    });
  }

  // Advertir sobre guías específicas no cargadas (son opcionales)
  const specificGuidesNotLoaded = guidesResult.componentSpecificGuides.filter(
    (g) => !g.loaded
  );
  if (specificGuidesNotLoaded.length > 0) {
    warnings.push(
      `⚠️ ${specificGuidesNotLoaded.length} guías específicas no se pudieron cargar (opcionales):`
    );
    specificGuidesNotLoaded.forEach((guide) => {
      warnings.push(`   - ${guide.guidePath}: ${guide.error}`);
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Obtener resumen de guías cargadas para mostrar al agente
 */
export function getGuidesSummary(guidesResult: GuidesLoadResult): string {
  const summary: string[] = [];

  summary.push('📚 Guías Cargadas:');
  summary.push('');

  // Guías generales
  summary.push('📋 Guías Generales:');
  guidesResult.generalGuides.forEach((guide) => {
    const status = guide.loaded ? '✅' : '❌';
    summary.push(`  ${status} ${guide.guidePath}`);
  });

  // Guías específicas
  if (guidesResult.componentSpecificGuides.length > 0) {
    summary.push('');
    summary.push(`📋 Guías Específicas de ${guidesResult.componentName}:`);
    guidesResult.componentSpecificGuides.forEach((guide) => {
      const status = guide.loaded ? '✅' : '⚠️';
      summary.push(`  ${status} ${guide.guidePath}`);
    });
  }

  return summary.join('\n');
}
