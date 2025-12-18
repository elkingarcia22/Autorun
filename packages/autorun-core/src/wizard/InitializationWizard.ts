/**
 * InitializationWizard
 *
 * Wizard interactivo para configurar Autorun al inicio
 * Permite elegir entre trabajar en UBITS o proyecto independiente
 */

import * as path from 'path';
import { AutorunHub } from '../AutorunHub';
import {
  UBITS_PRESET,
  UBITS_ADDONS_CONFIG,
  UBITSTemplate,
  UBITS_MODULES_CONFIG,
} from './UBITSPreset';
import { TemplateLoader } from './TemplateLoader';
import { ModuleManager } from './ModuleManager';
import { CanvasCreator } from './CanvasCreator';
import { ComponentValidator } from './ComponentValidator';
import { InteractivePrompt } from './InteractivePrompt';
import { LocalServer } from '../server/LocalServer';
import { MCPDetector, MCPInstaller } from '../index';
import { CursorRulesNotifier } from './CursorRulesNotifier';

export type ProjectType = 'ubits' | 'independent';

export interface WizardResult {
  projectType: ProjectType;
  config?: any;
}

export interface UBITSResult extends WizardResult {
  projectType: 'ubits';
  template: 'administrador' | 'colaborador';
  module: string;
  product: string;
  canvasPath: string;
  disableOtherModulesNavigation?: boolean;
}

export interface IndependentResult extends WizardResult {
  projectType: 'independent';
  addons: string[];
}

export class InitializationWizard {
  private hub: AutorunHub;
  private prompt: InteractivePrompt;
  private templateOpened: boolean = false; // Bandera para evitar abrir múltiples veces
  private localServer: LocalServer | null = null; // Servidor HTTP local

  constructor(hub: AutorunHub) {
    this.hub = hub;
    this.prompt = new InteractivePrompt();
  }

  /**
   * Inicia el wizard de inicialización
   * Pregunta template y producto en un solo paso, luego ejecuta todo automáticamente
   */
  async start(options?: { autoSelect?: ProjectType }): Promise<WizardResult> {
    // Verificar si hay AUTORUN_ANSWERS (modo automático con preguntas visibles)
    // Si hay AUTORUN_ANSWERS, SIEMPRE mostrar preguntas (igual que terminal)
    const hasAutoAnswers = !!process.env.AUTORUN_ANSWERS;

    // Intentar obtener respuestas automáticas primero (solo si NO hay AUTORUN_ANSWERS)
    // Si hay AUTORUN_ANSWERS, forzar modo interactivo para mostrar preguntas
    const autoAnswers = hasAutoAnswers
      ? null
      : this.getAutoAnswers(options?.autoSelect);

    let answers: {
      template: 'administrador' | 'colaborador';
      module: string;
      product?: string;
    };
    let selectedAddons: string[];
    let disableOtherModulesNavigation: boolean = false;
    let openBrowser: boolean = true;

    if (
      autoAnswers &&
      autoAnswers.template &&
      autoAnswers.module &&
      !hasAutoAnswers
    ) {
      // Usar respuestas automáticas (solo si NO hay AUTORUN_ANSWERS)
      console.log('🚀 ¡Hola! Soy tu asistente de Autorun.\n');
      console.log('📋 Usando configuración automática:\n');
      console.log(`   🎯 Template: ${autoAnswers.template}`);
      console.log(`   📦 Módulo: ${autoAnswers.module}`);
      if (autoAnswers.product) {
        console.log(`   🎨 Producto: ${autoAnswers.product}`);
      }
      console.log('');

      answers = {
        template: autoAnswers.template,
        module: autoAnswers.module,
        product: autoAnswers.product,
      };

      // Para add-ons, usar los por defecto si no hay variables de entorno
      const addonsEnv = process.env.AUTORUN_ADDONS;
      if (addonsEnv) {
        selectedAddons = addonsEnv.split(',').map((a) => a.trim());
      } else {
        selectedAddons = UBITS_PRESET.addons;
      }

      // Para desactivar navegación de otros módulos, verificar variable de entorno
      const disableNavEnv = process.env.AUTORUN_DISABLE_OTHER_MODULES;
      disableOtherModulesNavigation =
        disableNavEnv === 'true' || disableNavEnv === '1';

      // Para desactivar apertura automática del browser, verificar variable de entorno
      const openBrowserEnv = process.env.AUTORUN_OPEN_BROWSER;
      openBrowser =
        openBrowserEnv === undefined
          ? true
          : openBrowserEnv === 'true' || openBrowserEnv === '1';
    } else {
      // Modo interactivo (o automático con AUTORUN_ANSWERS - muestra preguntas)
      console.log('🚀 ¡Hola! Soy tu asistente de Autorun.\n');
      console.log('Voy a preguntarte qué template y producto quieres usar:\n');

      // Preguntar template y producto en un solo paso
      answers = await this.askTemplateAndProduct();

      // Preguntar si quiere desactivar navegación de otros módulos
      disableOtherModulesNavigation =
        await this.askDisableOtherModulesNavigation();

      // Preguntar si quiere abrir el browser automáticamente
      openBrowser = await this.askOpenBrowser();

      // Preguntar por los add-ons a instalar
      selectedAddons = await this.askAddons();
    }

    console.log('\n✅ Perfecto, voy a configurar tu proyecto UBITS ahora.\n');

    // NO saltar GitHub si hay AUTORUN_ANSWERS (queremos mostrar la pregunta)
    // Solo saltar si está en modo completamente automático (sin AUTORUN_ANSWERS)
    if (this.prompt.isAuto() && !hasAutoAnswers) {
      process.env.AUTORUN_SKIP_GITHUB = 'true';
    }

    return await this.setupUBITSFromAnswers({
      template: answers.template,
      module: answers.module,
      product: answers.product,
      addons: selectedAddons,
      disableOtherModulesNavigation,
      openBrowser,
    });
  }

  /**
   * Obtiene respuestas automáticas desde variables de entorno
   * Solo retorna valores si hay variables de entorno explícitas
   */
  private getAutoAnswers(autoSelect?: ProjectType): {
    projectType: ProjectType;
    template?: 'administrador' | 'colaborador';
    module?: string;
    product?: string;
  } | null {
    // Solo usar configuración automática si hay variables de entorno explícitas
    const hasEnvVars =
      process.env.AUTORUN_TEMPLATE ||
      process.env.AUTORUN_MODULE ||
      process.env.AUTORUN_PRODUCT;

    if (!hasEnvVars && !autoSelect) {
      // No hay variables de entorno ni autoSelect, usar modo interactivo
      return null;
    }

    // Verificar variables de entorno o usar valores por defecto solo si autoSelect está presente
    const projectType =
      (process.env.AUTORUN_PROJECT_TYPE as ProjectType) ||
      autoSelect ||
      'ubits';
    const template =
      (process.env.AUTORUN_TEMPLATE as 'administrador' | 'colaborador') ||
      (autoSelect ? 'administrador' : undefined);
    const module =
      process.env.AUTORUN_MODULE || (autoSelect ? 'desempeno' : undefined);
    let product = process.env.AUTORUN_PRODUCT;

    // Si no hay producto especificado, obtener el primero del módulo según el template
    if (projectType === 'ubits' && !product && template && module) {
      const moduleConfig = UBITS_MODULES_CONFIG[module];
      if (moduleConfig && moduleConfig.products.length > 0) {
        // Filtrar productos según el template
        const templateProductsMap: Record<string, Record<string, string[]>> = {
          administrador: {
            empresa: [
              'gestion-usuarios',
              'organigrama',
              'datos-empresa',
              'personalizacion',
              'roles-permisos',
              'comunicaciones',
            ],
            aprendizaje: [
              'lms-cursos',
              'plan-formacion',
              'certificados',
              'metricas-empresa',
            ],
            desempeno: ['evaluations', 'objectives', 'matriz-talento'],
          },
          colaborador: {
            aprendizaje: ['inicio', 'catalogo', 'corporativa', 'zona-estudio'],
            desempeno: [
              'evaluaciones-360',
              'objetivos',
              'metricas',
              'reportes',
            ],
            planes: ['planes', 'tareas'],
          },
        };

        const templateProducts = templateProductsMap[template]?.[module] || [];
        if (templateProducts.length > 0) {
          // Obtener el primer producto válido para este template
          const validProducts = moduleConfig.products.filter(
            (p: { id: string }) => templateProducts.includes(p.id)
          );
          if (validProducts.length > 0) {
            product = validProducts[0].id;
          }
        }
      }
    }

    // Solo retornar si tenemos template y module (ya sea de env vars o autoSelect)
    if (projectType === 'ubits' && template && module) {
      return {
        projectType,
        template,
        module,
        product,
      };
    }

    // Si no hay suficiente información, retornar null para modo interactivo
    return null;
  }

  /**
   * Pregunta template y producto en un solo paso
   */
  private async askTemplateAndProduct(): Promise<{
    template: 'administrador' | 'colaborador';
    module: string;
    product?: string;
  }> {
    // 1. Template
    const template = (await this.prompt.select(
      '🎯 ¿En qué template quieres trabajar?',
      [
        {
          value: 'administrador',
          label: 'Administrador (Todos los módulos disponibles)',
        },
        {
          value: 'colaborador',
          label: 'Colaborador (Módulos limitados)',
        },
      ],
      'administrador'
    )) as 'administrador' | 'colaborador';

    // 2. Producto (recopilar todos los productos de todos los módulos del template)
    const templateConfig = UBITS_PRESET.templates[template];
    const allProducts: Array<{ value: string; label: string; module: string }> =
      [];

    // Mapeo de productos por template según products.js
    const templateProductsMap: Record<string, Record<string, string[]>> = {
      administrador: {
        empresa: [
          'gestion-usuarios',
          'organigrama',
          'datos-empresa',
          'personalizacion',
          'roles-permisos',
          'comunicaciones',
        ],
        aprendizaje: [
          'lms-cursos',
          'plan-formacion',
          'certificados',
          'metricas-empresa',
        ],
        desempeno: ['evaluations', 'objectives', 'matriz-talento'],
      },
      colaborador: {
        aprendizaje: ['inicio', 'catalogo', 'corporativa', 'zona-estudio'],
        desempeno: ['evaluaciones-360', 'objetivos', 'metricas', 'reportes'],
        planes: ['planes', 'tareas'],
      },
    };

    // Recopilar todos los productos de todos los módulos
    for (const moduleId of templateConfig.modules) {
      const moduleConfig = UBITS_MODULES_CONFIG[moduleId];
      if (!moduleConfig) continue;

      // Obtener productos específicos del template para este módulo
      const templateProducts = templateProductsMap[template]?.[moduleId] || [];

      if (templateProducts.length > 0) {
        // Filtrar productos que pertenecen a este template
        const validProducts = moduleConfig.products.filter((p) =>
          templateProducts.includes(p.id)
        );

        // Si encontramos productos válidos, agregarlos
        if (validProducts.length > 0) {
          for (const product of validProducts) {
            allProducts.push({
              value: `${moduleId}:${product.id}`,
              label: `${moduleConfig.name} - ${product.name}`,
              module: moduleId,
            });
          }
        } else {
          // Si el módulo tiene productos en la config pero ninguno coincide con el template,
          // significa que es un módulo solo para este template
          allProducts.push({
            value: `${moduleId}:`,
            label: `${moduleConfig.name} (módulo solo)`,
            module: moduleId,
          });
        }
      } else {
        // Módulo sin productos definidos para este template (módulo solo)
        allProducts.push({
          value: `${moduleId}:`,
          label: `${moduleConfig.name} (módulo solo)`,
          module: moduleId,
        });
      }
    }

    // No usar defaultValue para forzar que el usuario seleccione explícitamente
    const selectedProduct = await this.prompt.select(
      '📦 ¿En qué producto quieres trabajar?',
      allProducts,
      undefined // Sin defaultValue para forzar selección explícita
    );

    // Parsear la selección
    const [module, product] = selectedProduct.split(':');

    return {
      template,
      module,
      product: product || undefined,
    };
  }

  /**
   * Pregunta si quiere desactivar la navegación de otros módulos
   * Si dice que sí, se quitarán los enlaces a otros módulos del sidebar
   */
  private async askDisableOtherModulesNavigation(): Promise<boolean> {
    console.log('\n🔒 Navegación de otros módulos:\n');
    console.log(
      '   Por defecto, el prototipo permite navegar a todos los módulos.'
    );
    console.log(
      '   Si desactivas esta opción, solo podrás navegar al módulo seleccionado.'
    );
    console.log(
      '   Esto es útil para evitar que el usuario se pierda navegando.\n'
    );

    const answer = await this.prompt.confirm(
      '¿Quieres desactivar la navegación a otros módulos en el prototipo?',
      false // Por defecto: NO (mantener navegación activa)
    );

    if (answer) {
      console.log('✅ Navegación a otros módulos desactivada\n');
    } else {
      console.log(
        '✅ Navegación a otros módulos activa (comportamiento por defecto)\n'
      );
    }

    return answer;
  }

  /**
   * Pregunta si quiere abrir el browser automáticamente
   * Si dice que no, el wizard no abrirá el browser pero mostrará instrucciones para abrirlo manualmente
   */
  private async askOpenBrowser(): Promise<boolean> {
    console.log('\n🌐 Apertura automática del navegador:\n');
    console.log(
      '   Por defecto, el wizard abre el template en el navegador automáticamente.'
    );
    console.log(
      '   Si desactivas esta opción, puedes abrirlo manualmente después.\n'
    );

    const answer = await this.prompt.confirm(
      '¿Quieres abrir el template en el navegador automáticamente?',
      true // Por defecto: SÍ (abrir automáticamente)
    );

    if (answer) {
      console.log('✅ Apertura automática del navegador activada\n');
    } else {
      console.log('✅ Apertura automática del navegador desactivada\n');
    }

    return answer;
  }

  /**
   * Pregunta por los add-ons a instalar
   * Muestra los add-ons por defecto y permite agregar otros
   */
  private async askAddons(): Promise<string[]> {
    const defaultAddons = UBITS_PRESET.addons;

    // Descripciones de los add-ons
    const addonDescriptions: Record<string, string> = {
      storybook: '📚 Desarrollo y documentación de componentes',
      'figma-sync': '🎨 Sincronización de tokens desde Figma',
      eslint: '🔍 Detección de errores de código',
      prettier: '✨ Formateo automático de código',
      vitest: '🧪 Unit testing (rápido y moderno)',
      playwright: '🎭 Testing end-to-end',
      chromatic: '🖼️  Visual testing y comparación',
      snyk: '🔒 Escaneo de vulnerabilidades',
      renovate: '🔄 Actualizaciones automáticas',
      lighthouse: '⚡ Análisis de rendimiento',
      'bundle-analyzer': '📊 Análisis de tamaño de bundle',
      standalone: '🚀 Componentes standalone',
      sentry: '🐛 Monitoreo de errores',
      clarity: '👁️  Análisis de comportamiento de usuarios',
      vercel: '☁️  Despliegue en Vercel',
      github: '🐙 Integración con GitHub',
      codecov: '📈 Cobertura de código',
      feedback: '💬 Sistema de feedback automatizado',
      n8n: '🔄 Automatización de workflows con n8n y MCP',
      'google-sheets':
        '📊 Creación y gestión de hojas de cálculo con Google Sheets',
    };

    // Obtener todos los add-ons disponibles
    const allAvailableAddons = await this.discoverAvailableAddons();

    // Mostrar resumen de add-ons por defecto con número de opción del wizard
    console.log('\n🔌 Add-ons que se instalarán por defecto:\n');

    // Mapeo de add-on ID a número de opción en el wizard
    const addonToWizardNumber: Record<string, number> = {
      storybook: 1,
      'figma-sync': 2,
      eslint: 3,
      prettier: 4,
      vitest: 5,
      playwright: 6,
      chromatic: 7,
      snyk: 8,
      renovate: 9,
      lighthouse: 10,
      'bundle-analyzer': 11,
      standalone: 12,
      sentry: 13,
      clarity: 14,
      vercel: 15,
      github: 16,
      codecov: 17,
      feedback: 18,
      n8n: 22,
      'google-sheets': 23,
    };

    defaultAddons.forEach((addonId) => {
      const description =
        addonDescriptions[addonId] ||
        allAvailableAddons.find((a) => a.id === addonId)?.description ||
        addonId;
      const wizardNumber = addonToWizardNumber[addonId] || '?';
      console.log(`   ${wizardNumber}. ${description} (add-on: ${addonId})`);
    });

    // Verificar si estamos en modo automático (con respuestas disponibles)
    const isAuto = this.prompt.isAuto();

    // DEBUG: Log para entender qué está pasando
    console.log(
      '[DEBUG askAddons] isAuto:',
      isAuto,
      'isAutoMode:',
      (this.prompt as any).isAutoMode,
      'autoAnswerIndex:',
      (this.prompt as any).autoAnswerIndex,
      'autoAnswers.length:',
      (this.prompt as any).autoAnswers.length
    );

    // IMPORTANTE: Si NO estamos en modo automático (isAuto() retorna false),
    // significa que se agotaron las respuestas automáticas y volvimos a modo interactivo.
    // En ese caso, SIEMPRE preguntar al usuario.

    // Si NO estamos en modo automático, SIEMPRE preguntar al usuario
    // (no usar defaults automáticamente)
    if (!isAuto) {
      // Continuar normalmente, preguntar al usuario
      // Esto incluye el caso donde se agotaron las respuestas automáticas
      console.log(
        '[DEBUG askAddons] NO estamos en modo automático, preguntando al usuario'
      );
    } else {
      console.log(
        '[DEBUG askAddons] Estamos en modo automático, preguntando (select manejará respuesta automática)'
      );
    }
    // Si estamos en modo automático, también preguntar
    // (el método select() manejará la respuesta automática internamente si está disponible)

    // Preguntar qué quiere hacer
    console.log('[DEBUG askAddons] Llamando a prompt.select()...');
    const action = await this.prompt.select(
      '\n   ¿Qué quieres hacer?',
      [
        {
          value: 'default',
          label: 'Instalar solo los add-ons por defecto',
        },
        {
          value: 'add',
          label: 'Agregar otros add-ons',
        },
      ],
      'default'
    );

    let selectedAddons = [...defaultAddons];

    if (action === 'add') {
      // Obtener add-ons adicionales (los que NO están en defaultAddons)
      const additionalAddons = allAvailableAddons.filter(
        (a) => !defaultAddons.includes(a.id)
      );

      if (additionalAddons.length === 0) {
        console.log('\n   ℹ️  No hay otros add-ons disponibles para agregar.');
        return selectedAddons;
      }

      console.log('\n   📦 Otros add-ons disponibles:\n');

      // Permitir seleccionar múltiples add-ons adicionales
      const additionalSelected: string[] = [];

      while (true) {
        // Crear opciones de add-ons que aún no se han seleccionado
        const remainingOptions = additionalAddons
          .filter((a) => !additionalSelected.includes(a.id))
          .map((addon, index) => ({
            value: addon.id,
            label: `${addon.name} - ${addon.description || 'Sin descripción'}`,
          }));

        if (remainingOptions.length === 0) {
          console.log(
            '\n   ℹ️  Ya has seleccionado todos los add-ons adicionales disponibles.'
          );
          break;
        }

        // Agregar opción para terminar
        remainingOptions.push({
          value: '__done__',
          label: '✅ Terminar y continuar',
        });

        const selected = await this.prompt.select(
          '\n   Selecciona otro add-on para agregar:',
          remainingOptions
        );

        if (selected === '__done__' || !selected) {
          break;
        }

        if (!additionalSelected.includes(selected)) {
          additionalSelected.push(selected);
          const addon = additionalAddons.find((a) => a.id === selected);
          console.log(`   ✅ Agregado: ${addon?.name || selected}`);
        }

        // Preguntar si quiere agregar más
        const addMore = await this.prompt.confirm(
          '   ¿Quieres agregar otro add-on?',
          false
        );

        if (!addMore) {
          break;
        }
      }

      // Combinar add-ons por defecto con los adicionales seleccionados
      selectedAddons = [...defaultAddons, ...additionalSelected];

      if (additionalSelected.length > 0) {
        console.log(
          `\n   ✅ Total de add-ons a instalar: ${selectedAddons.length} (${defaultAddons.length} por defecto + ${additionalSelected.length} adicionales)`
        );
      }
    }

    return selectedAddons;
  }

  /**
   * Pregunta si quiere trabajar en UBITS o proyecto independiente
   * SIEMPRE pregunta al usuario, no usa variables de entorno automáticamente
   */
  private async askProjectType(): Promise<ProjectType> {
    // SIEMPRE preguntar al usuario (no usar automático)
    const answer = await this.prompt.select(
      '📋 ¿En qué tipo de proyecto quieres trabajar?',
      [
        {
          value: 'ubits',
          label: 'UBITS (Configuración predefinida con add-ons optimizados)',
        },
        {
          value: 'independent',
          label: 'Proyecto Independiente (Configuración personalizada)',
        },
      ],
      'ubits'
    );

    return answer as ProjectType;
  }

  /**
   * Configuración para UBITS desde las respuestas del usuario
   * Ejecuta todo automáticamente después de recibir las respuestas
   */
  private async setupUBITSFromAnswers(answers: {
    template: 'administrador' | 'colaborador';
    module: string;
    product?: string;
    addons: string[];
    disableOtherModulesNavigation?: boolean;
    openBrowser?: boolean;
  }): Promise<UBITSResult> {
    const {
      template,
      module,
      product,
      addons,
      disableOtherModulesNavigation,
      openBrowser = true,
    } = answers;

    // Ejecutar todos los pasos automáticos
    console.log('🚀 Configurando todo automáticamente...\n');

    // 0. Clonar UBITS, instalar y arrancar
    console.log('📦 Clonando repositorio UBITS...');
    await this.cloneAndSetupUBITS();
    console.log('   ✅ Repositorio UBITS listo\n');

    // 1. Conectar con Storybook
    console.log('🔗 Conectando con Storybook UBITS...');
    await this.connectStorybook();
    console.log('   ✅ Conectado\n');

    // 2. Cargar componentes desde Storybook
    console.log('🧩 Cargando componentes desde Storybook...');
    await this.loadComponentsFromStorybook();
    console.log('   ✅ Componentes cargados\n');

    // 3. Instalar add-ons seleccionados
    console.log('📦 Instalando add-ons seleccionados...');
    const installedAddons = await this.installAddons(addons);
    console.log(`   ✅ ${installedAddons.length} add-on(s) instalado(s)\n`);

    // 3.1. Configurar MCP para add-ons que lo soportan
    // IMPORTANTE: Usar addons seleccionados, no solo los instalados exitosamente
    // porque algunos pueden fallar pero aún así queremos configurar MCP
    console.log('🔌 Configurando MCP para add-ons...');
    await this.configureMCPForAddons(addons);
    console.log('   ✅ Configuración de MCP completada\n');

    // 4. Configurar GitHub (preguntar si quiere configurar ahora)
    console.log('🐙 Configuración de GitHub...');
    const githubUrl = await this.askAndConfigureGitHub();
    if (githubUrl) {
      console.log(`   ✅ GitHub configurado: ${githubUrl}\n`);
    } else {
      console.log(
        '   ⚠️  Continuando sin configurar GitHub (se puede configurar después)\n'
      );
    }

    // 5. Habilitar módulo en sidebar y configurar subnav
    console.log(`⚙️  Configurando sidebar y subnav para "${module}"...`);
    await this.enableModule(module, template, product);
    console.log('   ✅ Configurado\n');

    // 6. Crear ambos templates (administrador y colaborador)
    console.log('🎨 Creando tus lienzos de trabajo...');
    const { selectedCanvasPath, otherCanvasPath } =
      await this.createBothTemplates(
        template,
        module,
        product,
        disableOtherModulesNavigation
      );
    console.log('   ✅ Ambos templates creados\n');

    // 6.1. Actualizar enlaces entre templates en el sidebar
    if (otherCanvasPath) {
      console.log('🔗 Actualizando enlaces entre templates...');
      await this.updateCrossTemplateLinks(
        selectedCanvasPath,
        otherCanvasPath,
        template
      );
      console.log('   ✅ Enlaces actualizados\n');
    }

    // 7. Validar lienzo seleccionado
    console.log('🔍 Validando que todo cumpla con los estándares UBITS...');
    await this.validateCanvas(selectedCanvasPath);
    console.log('   ✅ Validación completada\n');

    // 8. Abrir solo el template seleccionado en el navegador (si está habilitado)
    let openedUrl: string | null = null;
    if (openBrowser) {
      console.log('🌐 Abriendo template seleccionado en el navegador...');
      openedUrl = await this.openTemplateInBrowser(selectedCanvasPath);
      console.log('   ✅ Template abierto\n');
    } else {
      console.log('🌐 Apertura automática del navegador desactivada');
      console.log(`   💡 Para abrir manualmente, ejecuta:`);
      console.log(`      npm run autorun:init-hub`);
      const pathModule = await import('path');
      console.log(
        `   O navega a: http://localhost:3000/${pathModule.basename(selectedCanvasPath)}\n`
      );
    }

    // Mostrar resumen final
    console.log('\n🎉 ¡Excelente! Tu proyecto UBITS está listo.\n');
    console.log('📋 Resumen de tu configuración:');
    console.log(`   🎯 Template: ${template}`);
    console.log(`   📦 Módulo: ${module}`);
    if (product) {
      console.log(`   🎨 Producto: ${product}`);
    }
    console.log(`   📁 Lienzo seleccionado: ${selectedCanvasPath}`);
    if (openedUrl) {
      console.log(`   🌐 Template abierto en: ${openedUrl}`);
    }
    if (otherCanvasPath) {
      console.log(`   📁 Lienzo adicional: ${otherCanvasPath}`);
    }
    console.log(`   🔌 Add-ons instalados: ${installedAddons.length}`);
    if (githubUrl) {
      console.log(`   🐙 GitHub: ${githubUrl}`);
    }

    // Mostrar información del servidor
    if (this.localServer && this.localServer.isServerRunning()) {
      const serverUrl = this.localServer.getUrl();
      console.log(`   🖥️  Servidor local: ${serverUrl}`);
      console.log('\n   💡 IMPORTANTE:');
      console.log('      - El servidor HTTP local está corriendo');
      console.log(
        '      - Mantén esta terminal abierta para que el servidor siga funcionando'
      );
      console.log('      - Presiona Ctrl+C para detener el servidor y salir');
    }

    // 9. Generar resumen de reglas para Cursor AI
    console.log('📚 Generando resumen de reglas para Cursor AI...');
    const rulesNotifier = new CursorRulesNotifier(process.cwd());
    const summaryPath = await rulesNotifier.generateRulesSummary();
    if (summaryPath) {
      console.log('   ✅ Resumen de reglas generado\n');
    }

    // Mostrar mensaje sobre reglas de Cursor
    console.log(rulesNotifier.getFinalMessage());

    console.log('\n🚀 Ya puedes empezar a trabajar. ¡Éxito con tu proyecto!\n');

    return {
      projectType: 'ubits',
      template,
      module,
      product: product || '',
      canvasPath: selectedCanvasPath,
      disableOtherModulesNavigation,
    };
  }

  /**
   * Inicia el servidor HTTP local si no está corriendo
   */
  private async ensureLocalServer(): Promise<LocalServer> {
    if (!this.localServer) {
      this.localServer = new LocalServer({
        port: 3000,
        directory: path.join(process.cwd(), 'prototypes'),
        vercelUrl: UBITS_PRESET.storybook.url,
        vercelBypassToken: UBITS_PRESET.storybook.bypassToken,
      });
      await this.localServer.start();
    } else if (!this.localServer.isServerRunning()) {
      await this.localServer.start();
    }
    return this.localServer;
  }

  /**
   * Verifica si estamos ejecutando en Cursor usando múltiples métodos
   */
  private async isRunningInCursor(): Promise<boolean> {
    try {
      // Verificar variables de entorno de Cursor (más confiable)
      if (process.env.CURSOR_VERSION || process.env.CURSOR_AGENT) {
        return true;
      }

      // Verificar si existe el directorio .cursor en el proyecto actual
      const fs = await import('fs/promises');
      const pathModule = await import('path');
      const projectCursorDir = pathModule.join(process.cwd(), '.cursor');
      try {
        const stats = await fs.stat(projectCursorDir);
        if (stats.isDirectory()) {
          return true;
        }
      } catch {
        // No existe, continuar
      }

      // Verificar si existe .cursor/mcp.json en el proyecto actual
      const projectCursorMCP = pathModule.join(
        process.cwd(),
        '.cursor',
        'mcp.json'
      );
      try {
        await fs.access(projectCursorMCP);
        return true;
      } catch {
        // No existe, continuar
      }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * Abre el template en el navegador local usando servidor HTTP
   * Abre TANTO en el navegador externo (Chrome) COMO en el browser interno de Cursor
   * Solo se ejecuta una vez, incluso si se llama múltiples veces
   */
  private async openTemplateInBrowser(
    filePath: string
  ): Promise<string | null> {
    // Si ya se abrió, no hacer nada
    if (this.templateOpened) {
      return null;
    }

    let httpUrl: string = '';

    try {
      const pathModule = await import('path');
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);

      // Iniciar servidor HTTP local
      const server = await this.ensureLocalServer();
      const serverUrl = server.getUrl();

      // Obtener nombre del archivo relativo a prototypes/
      const fileName = pathModule.basename(filePath);
      httpUrl = `${serverUrl}/${fileName}`;

      // Paso 1: Abrir en navegador externo (Chrome) automáticamente
      console.log(`\n   🔌 URL del template: ${httpUrl}`);
      console.log(`   🌐 Abriendo en navegador externo (Chrome)...`);

      try {
        // Detectar sistema operativo y abrir navegador
        const platform = process.platform;
        let command: string;

        if (platform === 'darwin') {
          // macOS
          command = `open -a "Google Chrome" "${httpUrl}" || open "${httpUrl}"`;
        } else if (platform === 'win32') {
          // Windows
          command = `start chrome "${httpUrl}" || start "${httpUrl}"`;
        } else {
          // Linux
          command = `xdg-open "${httpUrl}"`;
        }

        await execAsync(command);
        console.log(`   ✅ Navegador externo abierto`);
      } catch (error: any) {
        console.warn(
          `   ⚠️  No se pudo abrir navegador externo: ${error.message}`
        );
        console.log(`   💡 Puedes abrir manualmente: ${httpUrl}`);
      }

      // Paso 2: Emitir mensajes para que el agente abra en browser interno de Cursor
      console.log(
        `\n   📋 El agente de Cursor debe abrir automáticamente en browser MCP:`
      );
      console.log(
        `      [AUTORUN_BROWSER_URL]${httpUrl}[/AUTORUN_BROWSER_URL]`
      );
      console.log(
        `   📚 Guía completa: docs/guias/uso/GUIA-USO-VISBUG-AUTORUN.md`
      );

      // Paso 3: Instruir al agente para inicializar AutorunHub automáticamente
      console.log(
        `\n   🚀 El agente de Cursor debe inicializar AutorunHub automáticamente:`
      );
      console.log(`      [AUTORUN_INIT_HUB]true[/AUTORUN_INIT_HUB]`);
      console.log(`   💡 Esto activa file watching y auto-reload automático`);

      // Paso 4: Escribir archivo de estado para detección automática
      // El agente detectará este archivo y abrirá automáticamente el browser interno
      await this.writeWizardStateFile(httpUrl);

      // Paso 5: Mostrar instrucciones adicionales
      console.log(
        `\n   💡 El agente detectará automáticamente el archivo de estado y:`
      );
      console.log(`      1. Inicializará AutorunHub`);
      console.log(
        `      2. Abrirá el template en el browser interno de Cursor`
      );
      console.log(`   ✅ Template abierto en navegador externo (Chrome)`);
      console.log(
        `   📋 El agente abrirá automáticamente en browser interno de Cursor`
      );

      // Marcar como abierto
      this.templateOpened = true;

      // Identificar tipo de template desde el nombre del archivo
      const templateType = fileName.includes('administrador')
        ? 'Administrador'
        : fileName.includes('colaborador')
          ? 'Colaborador'
          : 'Template';

      console.log(`\n   ✅ Template ${templateType} listo`);
      console.log(`   📄 Archivo: ${fileName}`);
      console.log(`   🌐 URL: ${httpUrl}`);
      console.log(
        `   💡 El servidor HTTP local seguirá corriendo en ${serverUrl}`
      );
      console.log(
        `   💡 Para detenerlo, presiona Ctrl+C o cierra esta terminal`
      );

      return httpUrl;
    } catch (error: any) {
      console.warn(
        '   ⚠️  Error al preparar template:',
        error.message || error
      );
      if (httpUrl) {
        console.warn(`   💡 Abre manualmente: ${httpUrl}`);
        console.warn(
          `   💡 O usa el browser MCP de Cursor: mcp_cursor-ide-browser_browser_navigate({ url: "${httpUrl}" })`
        );
        return httpUrl;
      } else {
        console.warn(`   💡 Abre manualmente: ${filePath}`);
        return null;
      }
    }
  }

  /**
   * Instala los add-ons por defecto del preset UBITS
   */
  /**
   * Muestra los add-ons por defecto y permite al usuario revisar y modificar la lista
   */
  private async reviewAndSelectAddons(): Promise<{
    finalAddons: string[];
    additionalAddons: string[];
  }> {
    const addonDescriptions: Record<string, string> = {
      storybook: '📚 Desarrollo y documentación de componentes',
      'figma-sync': '🎨 Sincronización de tokens desde Figma',
      eslint: '🔍 Detección de errores de código',
      prettier: '✨ Formateo automático de código',
      vitest: '🧪 Unit testing (rápido y moderno)',
      playwright: '🎭 Testing end-to-end',
      chromatic: '🖼️  Visual testing y comparación',
      snyk: '🔒 Escaneo de vulnerabilidades',
      renovate: '🔄 Actualizaciones automáticas',
      lighthouse: '⚡ Análisis de rendimiento',
      'bundle-analyzer': '📊 Análisis de tamaño de bundle',
      standalone: '🚀 Componentes standalone',
      sentry: '🐛 Monitoreo de errores',
      clarity: '👁️  Análisis de comportamiento de usuarios',
      vercel: '☁️  Despliegue en Vercel',
      github: '🐙 Integración con GitHub',
      codecov: '📈 Cobertura de código',
      feedback: '💬 Sistema de feedback automatizado',
      n8n: '🔄 Automatización de workflows con n8n y MCP',
      'google-sheets':
        '📊 Creación y gestión de hojas de cálculo con Google Sheets',
    };

    // Mostrar add-ons por defecto
    console.log('\n   📋 Voy a instalar estos add-ons por defecto:');
    console.log(
      '   ──────────────────────────────────────────────────────────────'
    );
    UBITS_PRESET.addons.forEach((addonId) => {
      const description = addonDescriptions[addonId] || `   ${addonId}`;
      console.log(`   ${description}`);
    });
    console.log(
      '   ──────────────────────────────────────────────────────────────'
    );

    // Preguntar si quiere continuar o modificar
    const wantsToModify = await this.prompt.confirm(
      '\n   ¿Quieres continuar así o añadir/quitar algún add-on? (s=modificar, N=continuar)',
      false
    );

    let finalAddons = [...UBITS_PRESET.addons];
    let additionalAddons: string[] = [];

    if (wantsToModify) {
      // Permitir agregar más add-ons
      const wantsToAdd = await this.prompt.confirm(
        '   ¿Quieres agregar más add-ons?',
        false
      );

      if (wantsToAdd) {
        additionalAddons = await this.selectAdditionalAddons(finalAddons);
        finalAddons = [...finalAddons, ...additionalAddons];
      }

      // TODO: Permitir quitar add-ons (por ahora solo agregar)
      // Esto requeriría una interfaz más compleja para seleccionar cuáles quitar
    }

    return { finalAddons, additionalAddons };
  }

  private async installDefaultAddons(): Promise<string[]> {
    // Este método ya no se usa, pero lo mantengo por compatibilidad
    return [];
  }

  /**
   * Pregunta al usuario si quiere agregar más add-ons
   */
  private async selectAdditionalAddons(
    alreadyInstalled: string[]
  ): Promise<string[]> {
    const wantsMore = await this.prompt.confirm(
      '   ¿Quieres agregar más add-ons a tu proyecto?',
      false
    );

    if (!wantsMore) {
      return [];
    }

    // Descubrir add-ons disponibles
    const availableAddons = await this.discoverAvailableAddons();
    const availableIds = availableAddons
      .map((a) => a.id)
      .filter((id) => !alreadyInstalled.includes(id));

    if (availableIds.length === 0) {
      console.log('   ℹ️  No hay más add-ons disponibles para instalar.');
      return [];
    }

    console.log('\n   📦 Add-ons disponibles:');
    const options = availableAddons
      .filter((a) => !alreadyInstalled.includes(a.id))
      .map((addon, index) => ({
        value: addon.id,
        label: `${addon.name} - ${addon.description || 'Sin descripción'}`,
      }));

    const selected = await this.prompt.select(
      '   Selecciona un add-on para agregar (o presiona Enter para continuar sin agregar más):',
      options
    );

    if (!selected) {
      return [];
    }

    const additional: string[] = [selected];

    // Preguntar si quiere agregar más
    while (true) {
      const addMore = await this.prompt.confirm(
        '   ¿Quieres agregar otro add-on?',
        false
      );
      if (!addMore) {
        break;
      }

      const remainingOptions = options.filter(
        (opt) => !additional.includes(opt.value)
      );
      if (remainingOptions.length === 0) {
        console.log('   ℹ️  Ya has agregado todos los add-ons disponibles.');
        break;
      }

      const nextSelected = await this.prompt.select(
        '   Selecciona otro add-on:',
        remainingOptions
      );

      if (nextSelected) {
        additional.push(nextSelected);
      } else {
        break;
      }
    }

    return additional;
  }

  /**
   * Instala una lista de add-ons
   */
  private async installAddons(addonIds: string[]): Promise<string[]> {
    const installed: string[] = [];
    const addonDescriptions: Record<string, string> = {
      storybook: '📚 Desarrollo y documentación de componentes',
      'figma-sync': '🎨 Sincronización de tokens desde Figma',
      eslint: '🔍 Detección de errores de código',
      prettier: '✨ Formateo automático de código',
      vitest: '🧪 Unit testing (rápido y moderno)',
      playwright: '🎭 Testing end-to-end',
      chromatic: '🖼️  Visual testing y comparación',
      snyk: '🔒 Escaneo de vulnerabilidades',
      renovate: '🔄 Actualizaciones automáticas',
      lighthouse: '⚡ Análisis de rendimiento',
      'bundle-analyzer': '📊 Análisis de tamaño de bundle',
      standalone: '🚀 Componentes standalone',
      sentry: '🐛 Monitoreo de errores',
      clarity: '👁️  Análisis de comportamiento de usuarios',
      vercel: '☁️  Despliegue en Vercel',
      github: '🐙 Integración con GitHub',
      codecov: '📈 Cobertura de código',
      feedback: '💬 Sistema de feedback automatizado',
      n8n: '🔄 Automatización de workflows con n8n y MCP',
      'google-sheets':
        '📊 Creación y gestión de hojas de cálculo con Google Sheets',
    };

    const fs = await import('fs/promises');
    const path = await import('path');

    for (const addonId of addonIds) {
      const description = addonDescriptions[addonId] || addonId;
      try {
        // Intentar registrar el add-on primero si no está registrado
        const addonPath = path.join(
          process.cwd(),
          'packages',
          'addons',
          'functional',
          addonId
        );
        try {
          const stats = await fs.stat(addonPath);
          if (stats.isDirectory()) {
            // Verificar que existe dist/index.js o dist/index.d.ts (indicador de compilación)
            const distIndexJs = path.join(addonPath, 'dist', 'index.js');
            const distIndexDts = path.join(addonPath, 'dist', 'index.d.ts');
            const distDir = path.join(addonPath, 'dist');

            try {
              // Verificar que existe el directorio dist
              const distStats = await fs.stat(distDir);
              if (distStats.isDirectory()) {
                // Verificar que existe al menos uno de los archivos principales
                let hasMainFile = false;
                try {
                  await fs.access(distIndexJs);
                  hasMainFile = true;
                } catch {
                  try {
                    await fs.access(distIndexDts);
                    hasMainFile = true;
                  } catch {
                    // No tiene archivos principales, pero tiene dist/
                  }
                }

                if (hasMainFile) {
                  // El add-on existe y está compilado, registrarlo
                  try {
                    await this.hub.registerAddon(addonPath);
                    // Debug: confirmar registro exitoso
                    if (process.env.DEBUG) {
                      console.log(
                        `   🔍 Debug: Add-on ${addonId} registrado desde ${addonPath}`
                      );
                    }
                  } catch (regError: any) {
                    // Si ya está registrado, continuar
                    if (!regError.message?.includes('ya está registrado')) {
                      // Debug: mostrar error de registro
                      if (process.env.DEBUG) {
                        console.warn(
                          `   🔍 Debug: Error registrando ${addonId}:`,
                          regError.message
                        );
                      }
                      throw regError;
                    }
                  }
                } else if (process.env.DEBUG) {
                  console.log(
                    `   🔍 Debug: Add-on ${addonId} tiene dist/ pero no tiene index.js ni index.d.ts`
                  );
                }
              }
            } catch (distError: any) {
              // No está compilado, pero continuar para configurar MCP
              if (process.env.DEBUG) {
                console.log(
                  `   🔍 Debug: Add-on ${addonId} no tiene dist/ o no está compilado:`,
                  distError.message
                );
              }
            }
          }
        } catch (pathError: any) {
          // El directorio no existe, continuar
          if (process.env.DEBUG) {
            console.log(
              `   🔍 Debug: Add-on ${addonId} no encontrado en ${addonPath}:`,
              pathError.message
            );
          }
        }

        // Intentar activar el add-on
        await this.hub.activateAddon(addonId);
        console.log(`   ✅ ${description}`);
        installed.push(addonId);
      } catch (error: any) {
        // Si el add-on no se encuentra, aún así lo consideramos "seleccionado"
        // porque el usuario lo eligió y puede querer configurar MCP para él
        if (error?.code === 'ADDON_NOT_FOUND') {
          console.log(
            `   ⚠️  ${description} (no encontrado o no compilado, pero seleccionado para configuración)`
          );
          // Agregar a la lista de instalados aunque no se haya podido activar
          // Esto permite configurar MCP para add-ons que el usuario seleccionó
          installed.push(addonId);
        } else {
          console.warn(
            `   ⚠️  Error instalando ${addonId}:`,
            error.message || error
          );
          // Para otros errores, también agregar para permitir configuración MCP
          installed.push(addonId);
        }
      }
    }

    return installed;
  }

  /**
   * Descubre add-ons disponibles en el sistema
   */
  private async discoverAvailableAddons(): Promise<
    Array<{ id: string; name: string; description: string }>
  > {
    const addons: Array<{ id: string; name: string; description: string }> = [];
    const addonsPath = 'packages/addons/functional';

    try {
      const fs = await import('fs/promises');
      const path = await import('path');

      const functionalPath = path.resolve(process.cwd(), addonsPath);

      try {
        const entries = await fs.readdir(functionalPath, {
          withFileTypes: true,
        });

        for (const entry of entries) {
          if (entry.isDirectory()) {
            const addonPath = path.join(functionalPath, entry.name);
            const manifestPath = path.join(addonPath, 'manifest.json');

            try {
              const manifestContent = await fs.readFile(manifestPath, 'utf-8');
              const manifest = JSON.parse(manifestContent);

              addons.push({
                id: manifest.id || entry.name,
                name: manifest.name || entry.name,
                description: manifest.description || '',
              });
            } catch {
              // Si no hay manifest, usar el nombre del directorio
              addons.push({
                id: entry.name,
                name: entry.name,
                description: '',
              });
            }
          }
        }
      } catch {
        // Si no existe el directorio, retornar lista vacía
      }
    } catch {
      // Si no se puede importar fs, retornar lista vacía
    }

    return addons;
  }

  /**
   * Verifica y configura acceso a UBITS local en el escritorio
   */
  private async cloneAndSetupUBITS(): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');
    const os = await import('os');

    // Ruta a UBITS en el escritorio
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const ubitsLocalPath = path.join(desktopPath, 'UBITS');

    try {
      // Verificar si existe la carpeta UBITS en el escritorio
      await fs.access(ubitsLocalPath);
      console.log('   ✅ Carpeta UBITS encontrada en el escritorio');
      console.log(`   📁 Ubicación: ${ubitsLocalPath}`);

      // Verificar que existan los templates
      const adminTemplate = path.join(
        ubitsLocalPath,
        'packages/templates/template-admin.html'
      );
      const colaboradorTemplate = path.join(
        ubitsLocalPath,
        'packages/templates/template-colaborador.html'
      );

      try {
        await fs.access(adminTemplate);
        console.log('   ✅ Template administrador encontrado');
      } catch {
        console.warn('   ⚠️  Template administrador no encontrado');
      }

      try {
        await fs.access(colaboradorTemplate);
        console.log('   ✅ Template colaborador encontrado');
      } catch {
        console.warn('   ⚠️  Template colaborador no encontrado');
      }
    } catch (error: any) {
      console.warn(
        '   ⚠️  No se encontró la carpeta UBITS en el escritorio:',
        error.message || error
      );
      console.warn(`   💡 Asegúrate de que existe: ${ubitsLocalPath}`);
    }
  }

  /**
   * Obtiene la ruta local de UBITS en el escritorio
   */
  private getUBITSLocalPath(): string {
    const path = require('path');
    const os = require('os');
    return path.join(os.homedir(), 'Desktop', 'UBITS');
  }

  /**
   * Conecta con Storybook de UBITS
   */
  private async connectStorybook(): Promise<void> {
    // El add-on de Storybook ya está activado
    // Solo verificamos la conexión
    console.log(`   ✅ Storybook configurado: ${UBITS_PRESET.storybook.url}`);
  }

  /**
   * Carga componentes desde Storybook
   */
  private async loadComponentsFromStorybook(): Promise<void> {
    if (typeof window === 'undefined') {
      console.log('   ⚠️  Solo disponible en navegador');
      return;
    }

    const ComponentsAPI = (window as any).AUTORUN?.Components;
    if (!ComponentsAPI) {
      console.warn('   ⚠️  window.AUTORUN.Components no disponible');
      return;
    }

    // Usar getUrl si está disponible (con token), sino usar url directamente
    const getStorybookUrl =
      UBITS_PRESET.storybook.getUrl ||
      ((path: string) => {
        const baseUrl = UBITS_PRESET.storybook.url.replace(/\/$/, '');
        return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
      });

    for (const component of UBITS_PRESET.components) {
      try {
        const manifestUrl = getStorybookUrl(
          `/components/${component}/manifest.json`
        );
        await ComponentsAPI.loadFromStorybook({ manifestUrl });
        // No mostrar cada componente individualmente para mantener el flujo fluido
      } catch (error) {
        console.warn(`   ⚠️  Error cargando ${component}:`, error);
      }
    }
    console.log(`   ✅ ${UBITS_PRESET.components.length} componentes cargados`);

    // ⭐ NUEVO: Ejecutar prueba rápida de Storybook Implementation
    try {
      const { runQuickTest } = await import(
        '../helpers/storybookImplementationTester'
      );
      console.log(
        '   🧪 Probando funcionalidades de Storybook Implementation...'
      );
      const testPassed = await runQuickTest('data-data-table');
      if (testPassed) {
        console.log('   ✅ Pruebas de Storybook Implementation: OK');
      } else {
        console.warn(
          '   ⚠️  Algunas pruebas de Storybook Implementation fallaron'
        );
      }
    } catch (error: any) {
      // No bloquear si falla
      console.warn(`   ⚠️  No se pudieron ejecutar pruebas: ${error.message}`);
    }
  }

  /**
   * Selecciona template (Administrador/Colaborador)
   * SIEMPRE pregunta al usuario
   */
  private async selectTemplate(): Promise<'administrador' | 'colaborador'> {
    // SIEMPRE preguntar al usuario
    const answer = await this.prompt.select(
      '   ¿Qué template quieres usar?',
      [
        {
          value: 'administrador',
          label: 'Administrador (Todos los módulos disponibles)',
        },
        {
          value: 'colaborador',
          label: 'Colaborador (Módulos limitados)',
        },
      ],
      'administrador'
    );

    return answer as 'administrador' | 'colaborador';
  }

  /**
   * Selecciona módulo para trabajar
   */
  private async selectModule(
    template: 'administrador' | 'colaborador'
  ): Promise<{ module: string; product?: string }> {
    const templateConfig = UBITS_PRESET.templates[template];
    const modules = templateConfig.modules;

    const moduleOptions = modules.map((moduleId) => {
      const moduleConfig = UBITS_MODULES_CONFIG[moduleId];
      return {
        value: moduleId,
        label: moduleConfig?.name || moduleId,
      };
    });

    // Preguntar al usuario de forma más directa
    let selectedModule: string | undefined;
    let attempts = 0;
    const maxAttempts = 3;

    while (!selectedModule && attempts < maxAttempts) {
      const answer = await this.prompt.question(
        '   ¿En qué módulo quieres trabajar? (escribe el nombre o número): '
      );

      // Intentar por número
      const index = parseInt(answer, 10) - 1;
      if (index >= 0 && index < moduleOptions.length) {
        selectedModule = moduleOptions[index].value;
        break;
      }

      // Intentar por nombre (búsqueda parcial, case-insensitive)
      const normalizedAnswer = answer.toLowerCase().trim();
      const found = moduleOptions.find((opt) => {
        const normalizedLabel = opt.label.toLowerCase();
        const normalizedValue = opt.value.toLowerCase();
        return (
          normalizedLabel.includes(normalizedAnswer) ||
          normalizedValue.includes(normalizedAnswer) ||
          normalizedLabel === normalizedAnswer ||
          normalizedValue === normalizedAnswer
        );
      });

      if (found) {
        selectedModule = found.value;
        break;
      }

      // Si no se encontró, mostrar opciones y pedir de nuevo
      attempts++;
      if (attempts < maxAttempts) {
        console.log('   ⚠️  Módulo no encontrado. Opciones disponibles:');
        moduleOptions.forEach((opt, idx) => {
          console.log(`      ${idx + 1}. ${opt.label}`);
        });
      }
    }

    // Si después de varios intentos no se encontró, usar el default
    if (!selectedModule) {
      console.log('   ℹ️  Usando módulo por defecto: Desempeño');
      selectedModule = 'desempeno';
    }

    // Seleccionar producto dentro del módulo (solo si el módulo tiene productos)
    const finalModule = selectedModule || 'desempeno';
    const product = await this.selectProduct(finalModule);

    return { module: finalModule, product: product || undefined };
  }

  /**
   * Selecciona producto dentro de un módulo
   * Si el módulo no tiene productos, retorna string vacío (módulo solo)
   */
  private async selectProduct(moduleId: string): Promise<string> {
    const moduleConfig = UBITS_MODULES_CONFIG[moduleId];

    if (!moduleConfig) {
      console.warn(`⚠️  Módulo "${moduleId}" no tiene configuración`);
      return '';
    }

    // Si el módulo no tiene productos, es un módulo solo
    if (moduleConfig.products.length === 0) {
      console.log(
        `   ✅ Módulo "${moduleConfig.name}" es un módulo solo (sin productos)`
      );
      return '';
    }

    // Si tiene productos, preguntar al usuario
    const productOptions = moduleConfig.products.map((product) => ({
      value: product.id,
      label: product.name,
    }));

    const selectedProduct = await this.prompt.select(
      `   ¿En qué producto de "${moduleConfig.name}" quieres trabajar?`,
      productOptions,
      moduleConfig.products[0]?.id
    );

    return selectedProduct;
  }

  /**
   * Habilita módulo en sidebar
   */
  private async enableModule(
    module: string,
    template: 'administrador' | 'colaborador',
    product?: string
  ): Promise<void> {
    const moduleManager = new ModuleManager(this.hub);
    await moduleManager.enableModule(module, template, product);
  }

  /**
   * Crea lienzo/template de trabajo
   */
  private async createCanvas(
    template: 'administrador' | 'colaborador',
    module: string,
    product?: string,
    disableOtherModulesNavigation?: boolean
  ): Promise<string> {
    const canvasCreator = new CanvasCreator();
    return await canvasCreator.create(
      template,
      module,
      product,
      disableOtherModulesNavigation
    );
  }

  /**
   * Crea ambos templates (administrador y colaborador)
   * Retorna el path del template seleccionado y el del otro
   */
  private async createBothTemplates(
    selectedTemplate: 'administrador' | 'colaborador',
    module: string,
    product?: string,
    disableOtherModulesNavigation?: boolean
  ): Promise<{ selectedCanvasPath: string; otherCanvasPath: string | null }> {
    const canvasCreator = new CanvasCreator();

    // Crear el template seleccionado
    const selectedCanvasPath = await canvasCreator.create(
      selectedTemplate,
      module,
      product,
      disableOtherModulesNavigation
    );

    // Crear el otro template
    const otherTemplate: 'administrador' | 'colaborador' =
      selectedTemplate === 'administrador' ? 'colaborador' : 'administrador';
    const otherCanvasPath = await canvasCreator.create(
      otherTemplate,
      module,
      product,
      disableOtherModulesNavigation
    );

    return {
      selectedCanvasPath,
      otherCanvasPath,
    };
  }

  /**
   * Actualiza los enlaces entre templates en el sidebar
   * Actualiza el botón del sidebar que cambia entre administrador y colaborador
   */
  private async updateCrossTemplateLinks(
    selectedCanvasPath: string,
    otherCanvasPath: string,
    selectedTemplate: 'administrador' | 'colaborador'
  ): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');

      // Obtener nombres de archivo relativos para usar en los enlaces
      const selectedFileName = path.basename(selectedCanvasPath);
      const otherFileName = path.basename(otherCanvasPath);

      // Leer ambos archivos
      const selectedContent = await fs.readFile(selectedCanvasPath, 'utf-8');
      const otherContent = await fs.readFile(otherCanvasPath, 'utf-8');

      // Inyectar script que actualice el enlace del botón del sidebar después de que se cargue
      // El sidebar se carga dinámicamente, así que necesitamos interceptar cuando se carga
      const updateScript = `
  <script>
    // Actualizar enlace del botón del sidebar que cambia entre templates
    (function() {
      // Definir targetFileName en el scope global de la función anónima
      const targetFileName = '${otherFileName}';
      console.log('🔗 [Wizard] Archivo objetivo configurado:', targetFileName);
      
      const updateTemplateLink = () => {
        console.log('🔗 [Wizard] Actualizando enlaces entre templates...');
        console.log('🔗 [Wizard] Archivo objetivo:', targetFileName);
        
        // 1. Buscar el botón del sidebar principal (data-section="admin" o "colaborador")
        // En modo colaborador, el primer botón es "Administrador" con data-section="admin"
        // En modo administrador, no hay botón "Colaborador" en el sidebar principal
        const sidebarButtons = document.querySelectorAll('.ubits-sidebar-nav-button[data-section="admin"], .ubits-sidebar-nav-button[data-section="colaborador"]');
        console.log('🔗 [Wizard] Botones del sidebar encontrados:', sidebarButtons.length);
        
        sidebarButtons.forEach(button => {
          const section = button.getAttribute('data-section');
          console.log('🔗 [Wizard] Botón encontrado con data-section:', section);
          
          // Interceptar el click del botón
          button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔗 [Wizard] Click interceptado en botón del sidebar, redirigiendo a:', targetFileName);
            window.location.href = targetFileName;
            return false;
          }, true); // Usar capture phase para interceptar antes que otros handlers
          
          // También actualizar onclick si existe
          if (button.onclick) {
            const originalOnclick = button.onclick;
            button.onclick = function(e) {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔗 [Wizard] onclick interceptado, redirigiendo a:', targetFileName);
              window.location.href = targetFileName;
              return false;
            };
          }
        });
        
        // 2. Buscar el botón del menú de perfil que cambia entre templates
        // El botón puede tener texto "Modo Administrador" o "Modo colaborador"
        // Buscar en múltiples lugares posibles
        const selectors = [
          '.ubits-sidebar-profile-menu-item',
          '[data-section="admin"]',
          '[data-section="colaborador"]',
          '.ubits-sidebar-profile-menu .ubits-sidebar-profile-menu-item',
          '.ubits-sidebar-profile-dropdown .ubits-sidebar-profile-menu-item',
          '.ubits-sidebar-profile-menu li',
          '.ubits-sidebar-profile-dropdown li',
          '[class*="profile-menu"] [class*="menu-item"]',
          '[class*="profile-dropdown"] [class*="menu-item"]'
        ];
        
        let menuItems = [];
        selectors.forEach(selector => {
          try {
            const found = document.querySelectorAll(selector);
            if (found.length > 0) {
              menuItems = Array.from(new Set([...menuItems, ...Array.from(found)]));
            }
          } catch (e) {
            // Ignorar errores de selector
          }
        });
        
        // También buscar por texto en todos los elementos clickeables
        const allClickable = document.querySelectorAll('li, button, a, div[onclick], div[role="button"]');
        allClickable.forEach(item => {
          const text = (item.textContent || item.innerText || '').trim();
          if (text.includes('Modo Administrador') || 
              text.includes('Modo administrador') ||
              text.includes('Modo colaborador') || 
              text.includes('Modo Colaborador')) {
            if (!menuItems.includes(item)) {
              menuItems.push(item);
            }
          }
        });
        
        console.log('🔗 [Wizard] Items del menú de perfil encontrados:', menuItems.length);
        
        menuItems.forEach(item => {
          const text = (item.textContent || item.innerText || '').trim();
          const isModeButton = 
            (text.includes('Modo Administrador') || text.includes('Modo administrador')) ||
            (text.includes('Modo colaborador') || text.includes('Modo Colaborador'));
          
          if (isModeButton) {
            console.log('🔗 [Wizard] Botón del menú de perfil encontrado:', text);
            console.log('🔗 [Wizard] Elemento:', item);
            console.log('🔗 [Wizard] Clases:', item.className);
            console.log('🔗 [Wizard] Tag:', item.tagName);
            
            // Actualizar href PRIMERO para que apunte al archivo correcto
            if (item.tagName === 'A') {
              item.href = targetFileName;
              item.setAttribute('href', targetFileName);
            } else if (item.querySelector('a')) {
              const link = item.querySelector('a');
              if (link) {
                link.href = targetFileName;
                link.setAttribute('href', targetFileName);
              }
            }
            
            // También actualizar data-href si existe
            if (item.hasAttribute('data-href')) {
              item.setAttribute('data-href', targetFileName);
            }
            
            // Interceptar el click con capture phase (máxima prioridad)
            const clickHandler = function(e) {
              console.log('🔗 [Wizard] ✅ Click interceptado en menú de perfil, redirigiendo a:', targetFileName);
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              e.cancelBubble = true;
              // Navegar directamente sin abrir nueva pestaña
              window.location.href = targetFileName;
              return false;
            };
            
            // Agregar listener con capture (máxima prioridad)
            item.addEventListener('click', clickHandler, { capture: true, passive: false });
            
            // También agregar sin capture como backup
            item.addEventListener('click', clickHandler, { capture: false, passive: false });
            
            // Actualizar onclick si existe (sobrescribir completamente)
              item.onclick = function(e) {
              console.log('🔗 [Wizard] ✅ onclick interceptado en menú, redirigiendo a:', targetFileName);
              if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                e.cancelBubble = true;
              }
                window.location.href = targetFileName;
                return false;
              };
            
            // Actualizar atributo onclick
            item.setAttribute('onclick', "event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation(); event.cancelBubble = true; window.location.href='" + targetFileName + "'; return false;");
            
            // Buscar cualquier elemento hijo que pueda ser clickeable
            const clickableChildren = item.querySelectorAll('a, button, [onclick], [role="button"], span, div');
            clickableChildren.forEach(child => {
              child.addEventListener('click', clickHandler, { capture: true, passive: false });
              if (child.tagName === 'A') {
                child.href = targetFileName;
                child.setAttribute('href', targetFileName);
              }
            });
          }
        });
        
        console.log('🔗 [Wizard] ✅ Enlaces actualizados');
      };
      
      // Ejecutar cuando el DOM esté listo
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateTemplateLink);
      } else {
        updateTemplateLink();
      }
      
      // También ejecutar después de delays para asegurar que el sidebar se haya cargado dinámicamente
      setTimeout(updateTemplateLink, 500);
      setTimeout(updateTemplateLink, 1000);
      setTimeout(updateTemplateLink, 2000);
      setTimeout(updateTemplateLink, 3000);
      
      // Observar cambios en el DOM para cuando el sidebar o menú de perfil se cargue dinámicamente
      const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === 1) { // Element node
                if (node.classList && (
                  node.classList.contains('ubits-sidebar') ||
                  node.classList.contains('ubits-sidebar-nav-button') ||
                  node.classList.contains('ubits-sidebar-profile-menu') ||
                  node.classList.contains('ubits-sidebar-profile-dropdown') ||
                  node.classList.contains('ubits-sidebar-profile-menu-item') ||
                  node.querySelector('.ubits-sidebar-nav-button') ||
                  node.querySelector('.ubits-sidebar-profile-menu') ||
                  node.querySelector('.ubits-sidebar-profile-dropdown')
                )) {
                  shouldUpdate = true;
                }
              }
            });
          }
        });
        if (shouldUpdate) {
          setTimeout(updateTemplateLink, 100);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
      
      // Interceptar TODOS los clicks en el documento y verificar si es el botón de cambio de modo
      // Esto es más agresivo pero asegura que funcione incluso si el menú se carga dinámicamente
      // IMPORTANTE: targetFileName debe estar en el scope superior para que esté disponible aquí
      // Usar capture phase con máxima prioridad para interceptar ANTES que components-loader.js
      document.addEventListener('click', function(e) {
        const target = e.target;
        if (!target) return;
        
        // Verificar si el click es en el avatar para abrir el menú
        if (target.closest('.ubits-sidebar-profile-avatar') ||
            target.closest('[class*="profile-avatar"]') ||
            target.closest('[class*="user-avatar"]')) {
          // El menú de perfil se está abriendo, actualizar después de un delay
          setTimeout(updateTemplateLink, 200);
          setTimeout(updateTemplateLink, 500);
          return;
        }
        
        // Verificar si el click es en un elemento que contiene "Modo colaborador" o "Modo Administrador"
        const clickedElement = target.closest('li, button, a, div[onclick], div[role="button"], [class*="menu-item"], [class*="profile-menu"]');
        if (clickedElement) {
          const text = (clickedElement.textContent || clickedElement.innerText || '').trim();
          const isModeButton = 
            (text.includes('Modo Administrador') || text.includes('Modo administrador')) ||
            (text.includes('Modo colaborador') || text.includes('Modo Colaborador'));
          
          if (isModeButton) {
            console.log('🔗 [Wizard] 🎯 Click detectado en botón de cambio de modo:', text);
            console.log('🔗 [Wizard] Elemento:', clickedElement);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.cancelBubble = true; // IE compatibility
            console.log('🔗 [Wizard] ✅ Redirigiendo a:', targetFileName);
            // Navegar directamente sin abrir nueva pestaña
            window.location.href = targetFileName;
            return false;
          }
        }
      }, { capture: true, passive: false }); // Capture phase con máxima prioridad
      
      // También interceptar en el phase de bubbling como backup
      document.addEventListener('click', function(e) {
        const target = e.target;
        if (!target) return;
        
        const clickedElement = target.closest('li, button, a, div[onclick], div[role="button"], [class*="menu-item"], [class*="profile-menu"]');
        if (clickedElement) {
          const text = (clickedElement.textContent || clickedElement.innerText || '').trim();
          const isModeButton = 
            (text.includes('Modo Administrador') || text.includes('Modo administrador')) ||
            (text.includes('Modo colaborador') || text.includes('Modo Colaborador'));
          
          if (isModeButton) {
            console.log('🔗 [Wizard] 🎯 Click detectado (bubbling phase) en botón de cambio de modo:', text);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.cancelBubble = true;
            console.log('🔗 [Wizard] ✅ Redirigiendo a:', targetFileName);
            window.location.href = targetFileName;
            return false;
          }
        }
      }, { capture: false, passive: false }); // Bubbling phase como backup
    })();
  </script>
`;

      // Insertar el script lo más temprano posible (justo después de <body>)
      // para que se ejecute ANTES que components-loader.js
      let updatedSelectedContent = selectedContent;
      let updatedOtherContent = otherContent;

      // Insertar script en el template seleccionado (apunta al otro)
      // Intentar insertar justo después de <body> para máxima prioridad
      if (updatedSelectedContent.includes('<body')) {
        // Buscar la etiqueta <body> y insertar el script justo después
        updatedSelectedContent = updatedSelectedContent.replace(
          /(<body[^>]*>)/,
          `$1\n${updateScript}`
        );
      } else if (updatedSelectedContent.includes('</body>')) {
        // Fallback: insertar antes del cierre de </body>
        updatedSelectedContent = updatedSelectedContent.replace(
          '</body>',
          `${updateScript}\n</body>`
        );
      }

      // Para el otro template, necesitamos cambiar la referencia al template seleccionado
      const otherUpdateScript = updateScript.replace(
        otherFileName,
        selectedFileName
      );
      if (updatedOtherContent.includes('<body')) {
        // Buscar la etiqueta <body> y insertar el script justo después
        updatedOtherContent = updatedOtherContent.replace(
          /(<body[^>]*>)/,
          `$1\n${otherUpdateScript}`
        );
      } else if (updatedOtherContent.includes('</body>')) {
        // Fallback: insertar antes del cierre de </body>
        updatedOtherContent = updatedOtherContent.replace(
          '</body>',
          `${otherUpdateScript}\n</body>`
        );
      }

      // Guardar archivos actualizados
      await fs.writeFile(selectedCanvasPath, updatedSelectedContent, 'utf-8');
      await fs.writeFile(otherCanvasPath, updatedOtherContent, 'utf-8');
    } catch (error) {
      console.warn('   ⚠️  Error actualizando enlaces entre templates:', error);
    }
  }

  /**
   * Pregunta si quiere configurar GitHub y luego configura si es necesario
   */
  private async askAndConfigureGitHub(): Promise<string | null> {
    // Solo omitir si está explícitamente configurado para saltar
    if (process.env.AUTORUN_SKIP_GITHUB === 'true') {
      return null;
    }

    // Verificar si hay URL de GitHub en variables de entorno
    const githubUrlEnv = process.env.AUTORUN_GITHUB_URL;
    if (githubUrlEnv) {
      // Si hay variable de entorno, configurar directamente
      return await this.configureGitHub(githubUrlEnv);
    }

    // Verificar si se agotaron las respuestas automáticas
    // Si había respuestas pero se agotaron, usar default (NO configurar)
    const hadAutoAnswers = this.prompt.hasAutoAnswers();
    const hasMoreAnswers = this.prompt.isAuto();

    if (hadAutoAnswers && !hasMoreAnswers) {
      // Se agotaron las respuestas automáticas, usar default (NO)
      console.log(
        '   ℹ️  Continuando sin configurar GitHub por el momento (respuestas automáticas agotadas)\n'
      );
      return null;
    }

    // Preguntar si quiere configurar GitHub ahora (siempre en modo interactivo)
    const wantsToConfigure = await this.prompt.confirm(
      '¿Quieres configurar GitHub ahora? (puedes configurarlo después)',
      false // Por defecto: NO (continuar sin configurar)
    );

    if (!wantsToConfigure) {
      console.log('   ℹ️  Continuando sin configurar GitHub por el momento\n');
      return null;
    }

    // Si quiere configurar, preguntar por la URL
    return await this.configureGitHub();
  }

  /**
   * Configura GitHub preguntando por la URL del repositorio
   * Maneja tanto modo automático como interactivo
   */
  private async configureGitHub(githubUrlEnv?: string): Promise<string | null> {
    try {
      // Solo omitir si está explícitamente configurado para saltar
      if (process.env.AUTORUN_SKIP_GITHUB === 'true') {
        return null;
      }

      // Usar el parámetro si se proporciona, o verificar variable de entorno
      const githubUrlFromEnv = githubUrlEnv || process.env.AUTORUN_GITHUB_URL;
      if (githubUrlFromEnv) {
        const configManager = (this.hub as any).configManager;
        if (configManager) {
          const currentConfig = await configManager.getConfig();
          const updatedConfig = {
            ...currentConfig,
            autorun: {
              ...(currentConfig.autorun || {}),
              addons: {
                ...(currentConfig.autorun?.addons || {}),
                config: {
                  ...(currentConfig.autorun?.addons?.config || {}),
                  github: {
                    repositoryUrl: githubUrlFromEnv.trim(),
                    branch: 'main',
                    autoCommit: true,
                  },
                },
              },
            },
          };
          await configManager.saveConfig(updatedConfig);
        }
        return githubUrlFromEnv.trim();
      }

      // Modo interactivo: preguntar al usuario
      const githubUrl = await this.prompt.question(
        '🐙 ¿Cuál es la URL de tu repositorio GitHub? (presiona Enter para omitir): '
      );

      if (!githubUrl || githubUrl.trim() === '') {
        return null;
      }

      // Guardar configuración de GitHub
      const configManager = (this.hub as any).configManager;
      if (configManager) {
        const currentConfig = await configManager.load();
        const updatedConfig = {
          ...currentConfig,
          autorun: {
            ...(currentConfig.autorun || {}),
            addons: {
              ...(currentConfig.autorun?.addons || {}),
              config: {
                ...(currentConfig.autorun?.addons?.config || {}),
                github: {
                  repositoryUrl: githubUrl.trim(),
                  branch: 'main',
                  autoCommit: true,
                },
              },
            },
          },
        };
        await configManager.saveConfig(updatedConfig);
      }

      return githubUrl.trim();
    } catch (error: any) {
      // Si el error es porque readline está cerrado, simplemente omitir
      if (
        error.code === 'ERR_USE_AFTER_CLOSE' ||
        error.message?.includes('readline')
      ) {
        console.log('   ℹ️  Configuración de GitHub omitida (modo automático)');
        return null;
      }
      console.warn('   ⚠️  Error configurando GitHub:', error.message || error);
      return null;
    }
  }

  /**
   * Valida el lienzo creado contra estándares UBITS
   */
  private async validateCanvas(canvasPath: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(canvasPath, 'utf-8');

      const validator = new ComponentValidator();
      const result = await validator.validateFile(canvasPath, content);

      if (result.valid) {
        console.log('   ✅ Lienzo cumple con estándares UBITS');
      } else {
        console.warn(
          `   ⚠️  Se encontraron ${result.errors.length} error(es) en el lienzo`
        );
        const report = validator.generateReport(result);
        console.log(report);
      }

      if (result.warnings.length > 0) {
        console.warn(
          `   ⚠️  ${result.warnings.length} advertencia(s) encontrada(s)`
        );
      }
    } catch (error) {
      console.warn('   ⚠️  No se pudo validar el lienzo:', error);
    }
  }

  /**
   * Cierra el prompt interactivo
   */
  close(): void {
    this.prompt.close();
  }

  /**
   * Configura MCP para los add-ons seleccionados que lo soportan
   */
  private async configureMCPForAddons(selectedAddons: string[]): Promise<void> {
    // Add-ons que tienen soporte MCP
    const mcpSupportedAddons: Record<
      string,
      {
        name: string;
        mcpNames: string[];
        getCredentials: () => Promise<Record<string, any> | null>;
      }
    > = {
      github: {
        name: 'GitHub',
        mcpNames: ['github'],
        getCredentials: async () => {
          const configManager = (this.hub as any).configManager;
          if (!configManager) return null;
          const config = await configManager.load();
          const githubConfig = config?.autorun?.addons?.config?.github;
          const token =
            process.env.GITHUB_TOKEN ||
            process.env.GH_TOKEN ||
            githubConfig?.token;
          return token ? { token } : null;
        },
      },
      vercel: {
        name: 'Vercel',
        mcpNames: ['vercel'],
        getCredentials: async () => {
          const token = process.env.VERCEL_TOKEN;
          const teamId = process.env.VERCEL_TEAM_ID;
          return token ? { token, teamId } : null;
        },
      },
      clarity: {
        name: 'Clarity',
        mcpNames: ['clarity'],
        getCredentials: async () => {
          const configManager = (this.hub as any).configManager;
          if (!configManager) return null;
          const config = await configManager.load();
          const clarityConfig = config?.autorun?.addons?.config?.clarity;
          const projectId =
            clarityConfig?.projectId || process.env.CLARITY_PROJECT_ID;
          const apiKey = clarityConfig?.apiKey || process.env.CLARITY_API_KEY;
          return projectId ? { projectId, apiKey } : null;
        },
      },
      'figma-sync': {
        name: 'Figma Sync',
        mcpNames: ['figma', 'talk-to-figma'],
        getCredentials: async () => {
          const configManager = (this.hub as any).configManager;
          if (!configManager) return null;
          const config = await configManager.load();
          const figmaConfig = config?.autorun?.addons?.config?.['figma-sync'];
          // figma-developer-mcp requiere FIGMA_API_KEY o FIGMA_OAUTH_TOKEN
          const accessToken =
            figmaConfig?.accessToken ||
            process.env.FIGMA_API_KEY ||
            process.env.FIGMA_OAUTH_TOKEN ||
            process.env.FIGMA_ACCESS_TOKEN;
          return accessToken
            ? { accessToken, fileKey: figmaConfig?.fileKey }
            : null;
        },
      },
      storybook: {
        name: 'Storybook',
        mcpNames: ['storybook'],
        getCredentials: async () => {
          const configManager = (this.hub as any).configManager;
          if (!configManager) return null;
          const config = await configManager.load();
          const storybookConfig = config?.autorun?.addons?.config?.storybook;
          const storybookUrl =
            storybookConfig?.storybookUrl || process.env.STORYBOOK_URL;
          const customTools =
            storybookConfig?.customTools || process.env.CUSTOM_TOOLS;
          // Si no hay URL, intentar detectar automáticamente desde el proyecto
          if (!storybookUrl) {
            // Intentar encontrar Storybook en el proyecto
            const fs = await import('fs/promises');
            const path = await import('path');
            const possiblePaths = [
              // Proyecto actual
              path.join(process.cwd(), '.storybook', 'main.js'),
              path.join(process.cwd(), '.storybook', 'main.ts'),
              path.join(process.cwd(), 'storybook-static', 'index.json'),
              // UBITS vendor
              path.join(
                process.cwd(),
                'vendor',
                'ubits',
                'packages',
                'storybook',
                '.storybook',
                'main.js'
              ),
              path.join(
                process.cwd(),
                'vendor',
                'ubits',
                'packages',
                'storybook',
                '.storybook',
                'main.ts'
              ),
              path.join(
                process.cwd(),
                'vendor',
                'ubits',
                'packages',
                'storybook',
                'storybook-static',
                'index.json'
              ),
              // Desktop UBITS (legacy)
              path.join(
                process.env.HOME || '',
                'Desktop',
                'UBITS',
                'packages',
                'storybook',
                '.storybook',
                'main.js'
              ),
              path.join(
                process.env.HOME || '',
                'Desktop',
                'UBITS',
                'packages',
                'storybook',
                '.storybook',
                'main.ts'
              ),
              path.join(
                process.env.HOME || '',
                'Desktop',
                'UBITS',
                'packages',
                'storybook',
                'storybook-static',
                'index.json'
              ),
            ];

            for (const possiblePath of possiblePaths) {
              try {
                await fs.access(possiblePath);
                // Si existe .storybook/main.js o main.ts, construir URL local
                if (possiblePath.includes('.storybook')) {
                  return {
                    storybookUrl: 'http://localhost:6006/index.json',
                    customTools,
                  };
                }
                // Si existe storybook-static, usar esa ruta
                if (possiblePath.includes('storybook-static')) {
                  return {
                    storybookUrl: `file://${possiblePath}`,
                    customTools,
                  };
                }
              } catch {
                // Continuar
              }
            }

            // Si no se encontró nada, usar URL local por defecto (puede que Storybook esté corriendo)
            // O usar la URL de Vercel como fallback
            const configManager = (this.hub as any).configManager;
            if (configManager) {
              const config = await configManager.load();
              const storybookPreset = (config as any)?.storybook;
              if (storybookPreset?.url) {
                // Usar URL del preset UBITS
                return {
                  storybookUrl: `${storybookPreset.url}/index.json`,
                  customTools,
                };
              }
            }

            // Último fallback: URL local
            return {
              storybookUrl: 'http://localhost:6006/index.json',
              customTools,
            };
          }
          return storybookUrl ? { storybookUrl, customTools } : null;
        },
      },
      supabase: {
        name: 'Supabase',
        mcpNames: ['supabase'],
        getCredentials: async () => {
          const configManager = (this.hub as any).configManager;
          if (!configManager) return null;
          const config = await configManager.load();
          const supabaseConfig = config?.autorun?.addons?.config?.supabase;
          const accessToken =
            supabaseConfig?.accessToken || process.env.SUPABASE_ACCESS_TOKEN;
          const projectRef =
            supabaseConfig?.projectRef || process.env.SUPABASE_PROJECT_REF;
          return accessToken && projectRef ? { accessToken, projectRef } : null;
        },
      },
      n8n: {
        name: 'n8n',
        mcpNames: ['n8n-mcp'],
        getCredentials: async () => {
          const configManager = (this.hub as any).configManager;
          if (!configManager) return null;
          const config = await configManager.load();
          const n8nConfig = config?.autorun?.addons?.config?.n8n;
          const n8nApiUrl = n8nConfig?.n8nApiUrl || process.env.N8N_API_URL;
          const n8nApiKey = n8nConfig?.n8nApiKey || process.env.N8N_API_KEY;
          const mode = n8nConfig?.mode || 'stdio';
          const logLevel = n8nConfig?.logLevel || 'error';
          const disableConsoleOutput =
            n8nConfig?.disableConsoleOutput !== false;
          // Retornar configuración incluso si no hay API URL/Key (el MCP funciona sin ellas)
          return {
            n8nApiUrl: n8nApiUrl || '',
            n8nApiKey: n8nApiKey || '',
            mode,
            logLevel,
            disableConsoleOutput,
          };
        },
      },
      'google-sheets': {
        name: 'Google Sheets',
        mcpNames: ['google-sheets', 'mcp-gsheets'],
        getCredentials: async () => {
          const configManager = (this.hub as any).configManager;
          if (!configManager) return null;
          const config = await configManager.load();
          const googleSheetsConfig =
            config?.autorun?.addons?.config?.['google-sheets'];
          const googleProjectId =
            googleSheetsConfig?.googleProjectId ||
            process.env.GOOGLE_PROJECT_ID ||
            process.env.GOOGLE_CLOUD_PROJECT;
          const googleApplicationCredentials =
            googleSheetsConfig?.googleApplicationCredentials ||
            process.env.GOOGLE_APPLICATION_CREDENTIALS;
          const googleServiceAccountKey =
            googleSheetsConfig?.googleServiceAccountKey ||
            process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
          const googlePrivateKey =
            googleSheetsConfig?.googlePrivateKey ||
            process.env.GOOGLE_PRIVATE_KEY;
          const googleClientEmail =
            googleSheetsConfig?.googleClientEmail ||
            process.env.GOOGLE_CLIENT_EMAIL;
          // Retornar configuración (puede estar vacía, el usuario la configurará después)
          return {
            googleProjectId: googleProjectId || '',
            googleApplicationCredentials: googleApplicationCredentials || '',
            googleServiceAccountKey: googleServiceAccountKey || '',
            googlePrivateKey: googlePrivateKey || '',
            googleClientEmail: googleClientEmail || '',
          };
        },
      },
    };

    // Filtrar add-ons que tienen soporte MCP
    // Usar la lista de add-ons seleccionados, no solo los instalados exitosamente
    const addonsWithMCP = selectedAddons.filter((id) => mcpSupportedAddons[id]);

    // Debug: mostrar qué add-ons se seleccionaron y cuáles tienen MCP
    if (selectedAddons.length > 0) {
      console.log(`   📋 Add-ons seleccionados: ${selectedAddons.join(', ')}`);
    }

    if (addonsWithMCP.length === 0) {
      const supportedIds = Object.keys(mcpSupportedAddons).join(', ');
      console.log(`   ℹ️  Ningún add-on instalado requiere configuración MCP`);
      console.log(`   💡 Add-ons con soporte MCP disponibles: ${supportedIds}`);
      console.log(
        `   💡 Para configurar MCP, instala uno de estos add-ons: github, vercel, clarity, figma-sync, storybook, supabase, n8n, google-sheets`
      );
      return;
    }

    console.log(
      `   🔍 Add-ons con soporte MCP detectados: ${addonsWithMCP.join(', ')}`
    );

    // Verificar si MCP está disponible en el sistema
    let mcpAvailable = false;
    try {
      const mcpInfo = await MCPDetector.detectMCPServer('github');
      mcpAvailable = mcpInfo.available;

      // Debug: mostrar información de detección
      if (process.env.DEBUG) {
        console.log(
          `   🔍 Debug MCP: available=${mcpAvailable}, configured=${mcpInfo.configured}`
        );
        console.log(
          `   🔍 Debug Cursor: CURSOR_AGENT=${process.env.CURSOR_AGENT}, CURSOR_VERSION=${process.env.CURSOR_VERSION}`
        );
      }
    } catch (error: any) {
      console.warn(`   ⚠️  Error detectando MCP:`, error.message || error);
    }

    if (!mcpAvailable) {
      console.log(`   ⚠️  MCP no está disponible en este entorno`);
      console.log(
        `   💡 Para usar MCP, necesitas tener Cursor o un editor compatible con MCP`
      );
      console.log(
        `   💡 Los add-ons funcionarán sin MCP usando implementación tradicional`
      );
      console.log(
        `   💡 Puedes configurar MCP manualmente después. Ver: docs/guias/configuracion/GUIA-INSTALACION-MCP-ADDONS.md`
      );
      // Continuar para mostrar instrucciones de configuración manual
      console.log(`\n   📖 Instrucciones para configurar MCP manualmente:`);
      for (const addonId of addonsWithMCP) {
        const addonInfo = mcpSupportedAddons[addonId];
        console.log(
          `   - ${addonInfo.name}: Ver docs/guias/configuracion/GUIA-INSTALACION-MCP-ADDONS.md`
        );
      }
      return;
    }

    // Preguntar si quiere configurar MCP automáticamente
    try {
      // Usar confirm() en lugar de question() para mejor manejo de respuestas
      const configureMCP = await this.prompt.confirm(
        '¿Deseas instalar y configurar MCP automáticamente para mejorar la experiencia con los add-ons?',
        false // Por defecto: NO (continuar sin configurar)
      );

      if (!configureMCP) {
        console.log(
          '   ℹ️  Instalación de MCP omitida (se puede configurar después)'
        );
        return;
      }

      console.log(
        '\n   📦 Instalando y configurando MCPs automáticamente...\n'
      );

      // Instalar MCPs automáticamente para cada add-on
      let installedCount = 0;
      let skippedCount = 0;

      for (const addonId of addonsWithMCP) {
        const addonInfo = mcpSupportedAddons[addonId];

        // Obtener credenciales
        const credentials = await addonInfo.getCredentials();

        // Para cada MCP del add-on
        for (const mcpName of addonInfo.mcpNames) {
          const mcpInfo = await MCPDetector.detectMCPServer(mcpName);

          // Si ya está configurado, saltar
          if (mcpInfo.configured) {
            console.log(
              `   ✅ MCP '${mcpName}' para ${addonInfo.name} ya está configurado`
            );
            skippedCount++;
            continue;
          }

          // Si MCP no está disponible, saltar
          if (!mcpInfo.available) {
            if (addonInfo.mcpNames.length > 1) {
              continue;
            }
            console.log(`   ⚠️  MCP no está disponible para ${addonInfo.name}`);
            skippedCount++;
            continue;
          }

          // Instalar automáticamente (sin preguntar individualmente)
          // Instalamos TODOS los MCPs, incluso sin credenciales (el usuario puede configurarlas después)
          const mcpDisplayName =
            mcpName === 'talk-to-figma'
              ? 'Talk to Figma'
              : mcpName.charAt(0).toUpperCase() + mcpName.slice(1);

          // Instalar con credenciales (o sin ellas)
          const result = await MCPInstaller.installMCPServer(
            mcpName,
            credentials || {}
          );

          if (result.success) {
            console.log(
              `   ✅ MCP '${mcpDisplayName}' para ${addonInfo.name} instalado y configurado`
            );

            // Mensajes específicos según el MCP y si tiene credenciales
            if (!credentials) {
              switch (mcpName) {
                case 'storybook':
                  console.log(
                    `   💡 Storybook MCP intentará detectar automáticamente la URL local`
                  );
                  console.log(
                    `   💡 Si no funciona, configura STORYBOOK_URL en variables de entorno`
                  );
                  break;
                case 'vercel':
                  console.log(
                    `   💡 Vercel MCP usará OAuth - autoriza cuando Cursor te lo solicite`
                  );
                  break;
                case 'clarity':
                  console.log(
                    `   ⚠️  Funcionalidad limitada sin credenciales - configura CLARITY_PROJECT_ID y CLARITY_API_KEY para uso completo`
                  );
                  break;
                case 'github':
                  console.log(
                    `   ⚠️  Configura GITHUB_TOKEN o GH_TOKEN en variables de entorno para que funcione`
                  );
                  break;
                case 'figma':
                  console.log(
                    `   💡 Figma MCP usa servidor remoto oficial - autoriza cuando Cursor te lo solicite`
                  );
                  console.log(
                    `   💡 Ver: https://www.figma.com/es-la/mcp-catalog/`
                  );
                  break;
                case 'talk-to-figma':
                  console.log(
                    `   ⚠️  Requiere Figma Desktop abierto con el plugin instalado`
                  );
                  console.log(
                    `   💡 Instala el plugin desde: https://github.com/cursor-sh/talk-to-figma-mcp`
                  );
                  break;
                case 'supabase':
                  console.log(
                    `   💡 Supabase MCP usa servidor remoto oficial con OAuth automático`
                  );
                  console.log(
                    `   💡 Autoriza cuando Cursor te lo solicite - ya no requiere PAT manual`
                  );
                  console.log(
                    `   💡 Ver: https://supabase.com/docs/guides/getting-started/mcp`
                  );
                  break;
                case 'n8n-mcp':
                  console.log(
                    `   💡 n8n MCP proporciona acceso a 525+ nodos con documentación completa`
                  );
                  console.log(
                    `   💡 N8N_API_URL y N8N_API_KEY son opcionales - configúralos para gestión completa de workflows`
                  );
                  console.log(`   💡 Ver: https://www.n8n-mcp.com/`);
                  break;
                case 'google-sheets':
                case 'mcp-gsheets':
                  console.log(
                    `   💡 Google Sheets MCP permite crear, leer y escribir hojas de cálculo`
                  );
                  console.log(
                    `   💡 Requiere GOOGLE_PROJECT_ID y credenciales de Service Account`
                  );
                  console.log(
                    `   💡 La API es gratuita: 300 requests/min por proyecto, 60 por usuario`
                  );
                  console.log(
                    `   💡 Ver: https://github.com/freema/mcp-gsheets`
                  );
                  break;
                case 'storybook':
                  console.log(
                    `   💡 Storybook MCP requiere que Storybook esté corriendo en http://localhost:6006`
                  );
                  console.log(
                    `   💡 Inicia Storybook: cd vendor/ubits/packages/storybook && npm run storybook`
                  );
                  console.log(
                    `   💡 El MCP usará automáticamente: http://localhost:6006/index.json`
                  );
                  break;
                default:
                  console.log(
                    `   ⚠️  Configura las credenciales necesarias en variables de entorno para que funcione`
                  );
              }
            }
            installedCount++;
          } else {
            console.log(
              `   ⚠️  Error instalando MCP '${mcpDisplayName}' para ${addonInfo.name}: ${result.message}`
            );
          }
        }
      }

      if (installedCount > 0) {
        console.log(
          `\n   ✅ ${installedCount} MCP(s) instalado(s) exitosamente`
        );
        console.log(`   🔄 Reinicia Cursor para que los cambios surtan efecto`);
      }
      if (skippedCount > 0) {
        console.log(
          `   ℹ️  ${skippedCount} MCP(s) omitido(s) (ya configurados o no disponibles)`
        );
      }
    } catch (error: any) {
      // Si el error es porque readline está cerrado, simplemente omitir
      if (
        error.code === 'ERR_USE_AFTER_CLOSE' ||
        error.message?.includes('readline')
      ) {
        console.log('   ℹ️  Configuración de MCP omitida (modo automático)');
        return;
      }
      console.warn('   ⚠️  Error configurando MCP:', error.message || error);
    }
  }

  /**
   * Configuración para proyecto independiente
   */
  private async setupIndependent(): Promise<IndependentResult> {
    console.log('🎯 Configurando proyecto independiente...\n');

    // TODO: Implementar selección de add-ons
    const addons: string[] = [];

    return {
      projectType: 'independent',
      addons,
    };
  }

  /**
   * Escribe un archivo de estado cuando el wizard termina
   * Esto permite que el agente detecte automáticamente que debe inicializar AutorunHub
   * También intenta ejecutar el script de detección automáticamente
   */
  private async writeWizardStateFile(url: string): Promise<void> {
    console.log(`\n[WIZARD] 📝 Escribiendo archivo de estado del wizard...`);
    console.log(`[WIZARD] URL del template: ${url}`);

    try {
      const fs = await import('fs/promises');
      const statePath = path.join(
        process.cwd(),
        '.autorun',
        'wizard-state.json'
      );
      console.log(`[WIZARD] Ruta del archivo de estado: ${statePath}`);

      // Crear directorio si no existe
      const stateDir = path.dirname(statePath);
      console.log(`[WIZARD] Creando directorio si no existe: ${stateDir}`);
      await fs.mkdir(stateDir, { recursive: true });
      console.log(`[WIZARD] ✅ Directorio creado/verificado`);

      // Escribir estado
      const state = {
        url,
        initHub: true,
        timestamp: new Date().toISOString(),
        message:
          'El agente debe inicializar AutorunHub y abrir el browser automáticamente',
      };
      console.log(
        `[WIZARD] Estado a escribir:`,
        JSON.stringify(state, null, 2)
      );

      await fs.writeFile(statePath, JSON.stringify(state, null, 2), 'utf-8');
      console.log(`[WIZARD] ✅ Estado del wizard guardado en: ${statePath}`);

      // Intentar ejecutar el script de detección automáticamente (para que el agente lo vea)
      try {
        console.log(`[WIZARD] 🚀 Ejecutando script de detección automática...`);
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);

        // Ejecutar el script de detección (esto mostrará los mensajes especiales)
        const scriptPath = path.join(
          process.cwd(),
          'scripts',
          'detect-wizard-state.js'
        );
        console.log(`[WIZARD] Ruta del script: ${scriptPath}`);
        console.log(`[WIZARD] Ejecutando: node "${scriptPath}"`);

        const { stdout, stderr } = await execAsync(`node "${scriptPath}"`);
        console.log(`[WIZARD] ✅ Script de detección ejecutado`);
        console.log(`[WIZARD] Salida del script:`);
        console.log(stdout);
        if (stderr) {
          console.log(`[WIZARD] Errores del script:`);
          console.log(stderr);
        }
      } catch (error: any) {
        // No es crítico si falla, el agente puede ejecutarlo manualmente
        console.log(
          `[WIZARD] ⚠️  No se pudo ejecutar el script de detección: ${error.message}`
        );
        console.log(
          `[WIZARD] 💡 El agente puede ejecutar: node scripts/detect-wizard-state.js`
        );
      }
    } catch (error: any) {
      // No es crítico si falla, solo mostrar warning
      console.warn(
        `[WIZARD] ⚠️  No se pudo guardar estado del wizard: ${error.message || error}`
      );
      console.warn(`[WIZARD] Stack:`, error.stack);
    }
  }
}
