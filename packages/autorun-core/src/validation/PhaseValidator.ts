/**
 * Phase Validator
 *
 * Sistema que valida y fuerza el orden de fases en la implementación de componentes.
 *
 * ⚠️ CRÍTICO: Este sistema garantiza que se sigan las fases en orden:
 * FASE 0 → FASE 0.1 → FASE 0.5 → FASE 0.6 → FASE 1 → FASE 2
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface PhaseStatus {
  phase: string;
  completed: boolean;
  completedAt?: number;
  requiredSteps: string[];
  completedSteps: string[];
}

export interface PhaseValidationResult {
  valid: boolean;
  currentPhaseStatus?: PhaseStatus;
  nextRequiredPhase?: string;
  reason?: string;
  completedPhases: string[];
}

export class PhaseValidator {
  private static readonly PHASE_ORDER: string[] = [
    'FASE_0_VERIFICACION_SCRIPTS',
    'FASE_0.1_REVISAR_COMPONENTE',
    'FASE_0.5_ANALIZAR_ESTRUCTURA',
    'FASE_0.6_CONTAR_ITEMS',
    'FASE_1_ANALISIS_COLUMNAS',
    'FASE_2_IMPLEMENTACION_BASICA',
  ];

  private static readonly PHASE_DESCRIPTIONS: Record<string, string> = {
    FASE_0_VERIFICACION_SCRIPTS:
      'Verificar que el script UMD esté cargado (data-table.umd.js)',
    'FASE_0.1_REVISAR_COMPONENTE':
      'Revisar componente en Storybook y documentación',
    'FASE_0.5_ANALIZAR_ESTRUCTURA':
      'Analizar estructura y spacing del componente',
    'FASE_0.6_CONTAR_ITEMS': 'Contar items/filas en la imagen o solicitud',
    FASE_1_ANALISIS_COLUMNAS: 'Analizar columnas y tipos de datos',
    FASE_2_IMPLEMENTACION_BASICA: 'Implementar componente básico',
  };

  private static getStateFilePath(componentName: string): string {
    return path.join(
      process.cwd(),
      '.autorun',
      'phase-tracking',
      `${componentName.toLowerCase()}.json`
    );
  }

  /**
   * Validar que se sigan las fases en orden
   */
  static async validatePhaseOrder(
    componentName: string,
    currentPhase: string
  ): Promise<PhaseValidationResult> {
    console.log(
      `\n🔍 [Phase Validator] Validando orden de fases para: ${componentName}`
    );
    console.log(`🔍 [Phase Validator] Fase actual: ${currentPhase}`);

    // Obtener fases completadas
    const completedPhases = await this.getCompletedPhases(componentName);
    console.log(
      `🔍 [Phase Validator] Fases completadas: ${completedPhases.join(', ')}`
    );

    // Verificar que la fase actual esté en el orden
    const currentPhaseIndex = this.PHASE_ORDER.indexOf(currentPhase);
    if (currentPhaseIndex === -1) {
      console.error(`❌ [Phase Validator] Fase desconocida: ${currentPhase}`);
      return {
        valid: false,
        completedPhases,
        reason: `Fase desconocida: ${currentPhase}. Fases válidas: ${this.PHASE_ORDER.join(', ')}`,
      };
    }

    // Verificar que todas las fases anteriores estén completadas
    for (let i = 0; i < currentPhaseIndex; i++) {
      const requiredPhase = this.PHASE_ORDER[i];
      if (!completedPhases.includes(requiredPhase)) {
        const requiredPhaseDescription =
          this.PHASE_DESCRIPTIONS[requiredPhase] || requiredPhase;
        const currentPhaseDescription =
          this.PHASE_DESCRIPTIONS[currentPhase] || currentPhase;

        console.error(
          `❌ [Phase Validator] Fase requerida no completada: ${requiredPhase}`
        );
        return {
          valid: false,
          nextRequiredPhase: requiredPhase,
          completedPhases,
          reason: `Debes completar "${requiredPhaseDescription}" (${requiredPhase}) antes de continuar con "${currentPhaseDescription}" (${currentPhase})`,
        };
      }
    }

    console.log(
      `✅ [Phase Validator] Orden de fases válido para: ${componentName}`
    );
    return {
      valid: true,
      completedPhases,
    };
  }

  /**
   * Marcar una fase como completada
   */
  static async markPhaseCompleted(
    componentName: string,
    phase: string,
    completedSteps: string[] = []
  ): Promise<void> {
    console.log(
      `\n✅ [Phase Validator] Marcando fase como completada: ${phase} para ${componentName}`
    );

    const stateFilePath = this.getStateFilePath(componentName);
    const stateDir = path.dirname(stateFilePath);

    // Crear directorio si no existe
    try {
      await fs.mkdir(stateDir, { recursive: true });
    } catch (error) {
      // Ignorar si ya existe
    }

    // Leer estado actual
    let state: {
      completedPhases: string[];
      phases: Record<string, PhaseStatus>;
    } = {
      completedPhases: [],
      phases: {},
    };

    try {
      const stateContent = await fs.readFile(stateFilePath, 'utf-8');
      state = JSON.parse(stateContent);
    } catch (error) {
      // Archivo no existe, usar estado inicial
    }

    // Agregar fase completada
    if (!state.completedPhases.includes(phase)) {
      state.completedPhases.push(phase);
    }

    // Actualizar estado de la fase
    state.phases[phase] = {
      phase,
      completed: true,
      completedAt: Date.now(),
      requiredSteps: [],
      completedSteps,
    };

    // Guardar estado
    await fs.writeFile(stateFilePath, JSON.stringify(state, null, 2), 'utf-8');

    console.log(`✅ [Phase Validator] Fase marcada como completada: ${phase}`);
  }

  /**
   * Obtener fases completadas
   */
  static async getCompletedPhases(componentName: string): Promise<string[]> {
    const stateFilePath = this.getStateFilePath(componentName);

    try {
      const stateContent = await fs.readFile(stateFilePath, 'utf-8');
      const state = JSON.parse(stateContent);
      return state.completedPhases || [];
    } catch (error) {
      // Archivo no existe, retornar array vacío
      return [];
    }
  }

  /**
   * Obtener estado de una fase específica
   */
  static async getPhaseStatus(
    componentName: string,
    phase: string
  ): Promise<PhaseStatus | null> {
    const stateFilePath = this.getStateFilePath(componentName);

    try {
      const stateContent = await fs.readFile(stateFilePath, 'utf-8');
      const state = JSON.parse(stateContent);
      return state.phases?.[phase] || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Obtener la siguiente fase requerida
   */
  static async getNextRequiredPhase(
    componentName: string
  ): Promise<string | null> {
    const completedPhases = await this.getCompletedPhases(componentName);

    for (const phase of this.PHASE_ORDER) {
      if (!completedPhases.includes(phase)) {
        return phase;
      }
    }

    return null; // Todas las fases están completadas
  }

  /**
   * Obtener descripción de una fase
   */
  static getPhaseDescription(phase: string): string {
    return this.PHASE_DESCRIPTIONS[phase] || phase;
  }

  /**
   * Obtener todas las fases en orden
   */
  static getAllPhases(): string[] {
    return [...this.PHASE_ORDER];
  }
}
