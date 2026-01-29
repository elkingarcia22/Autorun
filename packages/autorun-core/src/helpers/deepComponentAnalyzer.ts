/**
 * Analizador Profundo de Componentes
 * 
 * ⭐ OBJETIVO: Detectar AUTOMÁTICAMENTE todos los subcomponentes, sub-acciones,
 * dependencias y funcionalidades de un componente sin intervención manual.
 * 
 * Este analizador realiza una investigación profunda del código fuente para
 * extraer TODA la información necesaria para implementación perfecta.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface DeepComponentAnalysis {
  componentId: string;
  componentName: string;
  
  // Subcomponentes detectados
  subcomponents: Array<{
    name: string;
    type: 'external' | 'internal' | 'functional';
    componentId?: string;
    trigger: 'click' | 'focus' | 'hover' | 'load' | 'none';
    description: string;
    dependencies?: string[];
    importPath?: string;
    usage?: string[]; // Dónde se usa (createSelectDropdown, etc.)
  }>;
  
  // Dependencias detectadas
  dependencies: Array<{
    name: string;
    type: 'component' | 'utility' | 'type' | 'style';
    importPath: string;
    usage: string[]; // Funciones donde se usa
  }>;
  
  // Funciones internas detectadas
  internalFunctions: Array<{
    name: string;
    description: string;
    createsSubcomponent?: string; // Nombre del subcomponente que crea
    usesDependencies?: string[]; // Dependencias que usa
  }>;
  
  // Acciones/interacciones detectadas
  interactions: Array<{
    name: string;
    trigger: string;
    description: string;
    createsSubcomponent?: string;
  }>;
  
  // Props que requieren subcomponentes
  propsRequiringSubcomponents: Array<{
    propName: string;
    subcomponentName: string;
    condition?: string; // Condición para activar (ej: type === 'select')
  }>;
}

/**
 * Analizador profundo de componentes
 */
export class DeepComponentAnalyzer {
  /**
   * Analizar componente de forma profunda y automática
   */
  static async analyzeComponent(
    componentId: string,
    componentName: string
  ): Promise<DeepComponentAnalysis> {
    console.log(
      `🔍 [Deep Analyzer] Iniciando análisis profundo de: ${componentName} (${componentId})`
    );

    const analysis: DeepComponentAnalysis = {
      componentId,
      componentName,
      subcomponents: [],
      dependencies: [],
      internalFunctions: [],
      interactions: [],
      propsRequiringSubcomponents: [],
    };

    // ESTRATEGIA 1: Análisis profundo del código fuente
    const sourceAnalysis = await this.analyzeSourceCode(componentId, componentName);
    analysis.subcomponents.push(...sourceAnalysis.subcomponents);
    analysis.dependencies.push(...sourceAnalysis.dependencies);
    analysis.internalFunctions.push(...sourceAnalysis.internalFunctions);
    analysis.interactions.push(...sourceAnalysis.interactions);
    analysis.propsRequiringSubcomponents.push(...sourceAnalysis.propsRequiringSubcomponents);

    // ESTRATEGIA 2: Análisis de tipos TypeScript
    const typeAnalysis = await this.analyzeTypeScriptTypes(componentId, componentName);
    analysis.dependencies.push(...typeAnalysis.dependencies);
    analysis.propsRequiringSubcomponents.push(...typeAnalysis.propsRequiringSubcomponents);

    // ESTRATEGIA 3: Análisis de estilos CSS
    const styleAnalysis = await this.analyzeStyles(componentId, componentName);
    analysis.dependencies.push(...styleAnalysis.dependencies);

    // ESTRATEGIA 4: Análisis de documentación
    const docsAnalysis = await this.analyzeDocumentation(componentId, componentName);
    analysis.subcomponents.push(...docsAnalysis.subcomponents);
    analysis.dependencies.push(...docsAnalysis.dependencies);

    // Eliminar duplicados
    analysis.subcomponents = this.deduplicateSubcomponents(analysis.subcomponents);
    analysis.dependencies = this.deduplicateDependencies(analysis.dependencies);

    console.log(
      `✅ [Deep Analyzer] Análisis completo: ${analysis.subcomponents.length} subcomponentes, ${analysis.dependencies.length} dependencias, ${analysis.internalFunctions.length} funciones`
    );

    return analysis;
  }

  /**
   * Análisis profundo del código fuente
   */
  private static async analyzeSourceCode(
    componentId: string,
    componentName: string
  ): Promise<Partial<DeepComponentAnalysis>> {
    const result: Partial<DeepComponentAnalysis> = {
      subcomponents: [],
      dependencies: [],
      internalFunctions: [],
      interactions: [],
      propsRequiringSubcomponents: [],
    };

    try {
      // Buscar archivos del componente
      const normalizedId = componentId.replace(/-/g, '-');
      const possibleFiles = [
        `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}Provider.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}Provider.js`,
        `vendor/ubits/packages/components/${normalizedId}/src/index.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/index.js`,
        `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}.js`,
      ];

      for (const filePath of possibleFiles) {
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Análisis completo del archivo
          const fileAnalysis = this.analyzeFileContent(content, componentId);
          
          result.subcomponents?.push(...fileAnalysis.subcomponents);
          result.dependencies?.push(...fileAnalysis.dependencies);
          result.internalFunctions?.push(...fileAnalysis.internalFunctions);
          result.interactions?.push(...fileAnalysis.interactions);
          result.propsRequiringSubcomponents?.push(...fileAnalysis.propsRequiringSubcomponents);
          
          break; // Si encontramos el archivo, no buscar más
        } catch (error) {
          // Continuar con siguiente archivo
        }
      }
    } catch (error: any) {
      console.warn(`⚠️ Error analizando código fuente: ${error.message}`);
    }

    return result;
  }

  /**
   * Analizar contenido de un archivo
   */
  private static analyzeFileContent(
    content: string,
    componentId: string
  ): Partial<DeepComponentAnalysis> {
    const result: Partial<DeepComponentAnalysis> = {
      subcomponents: [],
      dependencies: [],
      internalFunctions: [],
      interactions: [],
      propsRequiringSubcomponents: [],
    };

    // 1. Analizar TODOS los imports (estáticos y dinámicos)
    const imports = this.extractAllImports(content);
    result.dependencies?.push(...imports.dependencies);
    result.subcomponents?.push(...imports.subcomponents);

    // 2. Analizar TODAS las funciones
    const functions = this.extractAllFunctions(content);
    result.internalFunctions?.push(...functions.functions);
    result.interactions?.push(...functions.interactions);

    // 3. Analizar condicionales que activan subcomponentes
    const conditionals = this.extractConditionals(content);
    result.propsRequiringSubcomponents?.push(...conditionals);

    // 4. Analizar event listeners
    const eventListeners = this.extractEventListeners(content);
    result.interactions?.push(...eventListeners);

    // 5. Analizar llamadas a create* functions
    const createCalls = this.extractCreateCalls(content);
    result.subcomponents?.push(...createCalls);

    return result;
  }

  /**
   * Extraer TODOS los imports (estáticos y dinámicos)
   */
  private static extractAllImports(content: string): {
    dependencies: DeepComponentAnalysis['dependencies'];
    subcomponents: DeepComponentAnalysis['subcomponents'];
  } {
    const dependencies: DeepComponentAnalysis['dependencies'] = [];
    const subcomponents: DeepComponentAnalysis['subcomponents'] = [];

    // Imports estáticos: import { X } from 'path'
    const staticImportRegex =
      /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*)\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = staticImportRegex.exec(content)) !== null) {
      const importPath = match[1];
      const importStatement = match[0];
      
      // Extraer nombres importados
      const namesMatch = importStatement.match(/import\s+([^}]+)\s+from/);
      const importedNames = namesMatch
        ? namesMatch[1]
            .replace(/\{|\}/g, '')
            .split(',')
            .map((n) => n.trim().split(/\s+as\s+/)[0].trim())
            .filter(Boolean)
        : [];

      // Determinar tipo de dependencia
      const isComponent = /components\/\w+\/src/.test(importPath);
      const isType = /types?\/|\.d\.ts/.test(importPath);
      const isStyle = /\.css|\.scss|\.less/.test(importPath);
      
      // Extraer nombre del componente desde la ruta
      const componentMatch = importPath.match(/components\/([^/]+)\/src/);
      const componentName = componentMatch ? componentMatch[1] : null;
      
      if (isComponent && componentName) {
        // Es un componente externo
        const componentId = componentName.toLowerCase().replace(/\s+/g, '-');
        
        // Verificar si se usa en funciones create*
        const usage = this.findUsageInCreateFunctions(content, importedNames);
        
        subcomponents.push({
          name: componentName,
          type: 'external',
          componentId: `formularios-${componentId}`,
          trigger: usage.length > 0 ? 'click' : 'load',
          description: `Componente ${componentName} importado desde ${importPath}`,
          dependencies: importedNames,
          importPath,
          usage,
        });
      } else {
        // Es una dependencia (tipo, utilidad, estilo)
        dependencies.push({
          name: importedNames.join(', ') || importPath,
          type: isType ? 'type' : isStyle ? 'style' : 'utility',
          importPath,
          usage: this.findUsageInCode(content, importedNames),
        });
      }
    }

    // Imports dinámicos: import('path')
    const dynamicImportRegex = /import\(['"]([^'"]+)['"]\)/g;
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      const importPath = match[1];
      
      // Extraer nombre del componente
      const componentMatch = importPath.match(/components\/([^/]+)\/src/);
      const componentName = componentMatch ? componentMatch[1] : null;
      
      if (componentName) {
        const componentId = componentName.toLowerCase().replace(/\s+/g, '-');
        
        subcomponents.push({
          name: componentName,
          type: 'external',
          componentId: `formularios-${componentId}`,
          trigger: 'click', // Los imports dinámicos generalmente se activan con click
          description: `Componente ${componentName} cargado dinámicamente desde ${importPath}`,
          importPath,
        });
      }
    }

    return { dependencies, subcomponents };
  }

  /**
   * Extraer TODAS las funciones
   */
  private static extractAllFunctions(content: string): {
    functions: DeepComponentAnalysis['internalFunctions'];
    interactions: DeepComponentAnalysis['interactions'];
  } {
    const functions: DeepComponentAnalysis['internalFunctions'] = [];
    const interactions: DeepComponentAnalysis['interactions'] = [];

    // Buscar funciones: function name() o const name = () =>
    const functionRegex =
      /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|function\s*\())/g;
    let match;
    while ((match = functionRegex.exec(content)) !== null) {
      const functionName = match[1] || match[2];
      if (!functionName) continue;

      // Buscar cuerpo de la función
      const functionBody = this.extractFunctionBody(content, functionName);
      
      // Analizar qué hace la función
      const analysis = this.analyzeFunction(functionName, functionBody, content);
      
      if (analysis.isSubcomponentCreator) {
        functions.push({
          name: functionName,
          description: analysis.description,
          createsSubcomponent: analysis.createsSubcomponent,
          usesDependencies: analysis.usesDependencies,
        });
      }

      if (analysis.isInteraction) {
        interactions.push({
          name: functionName,
          trigger: analysis.trigger || 'click',
          description: analysis.description,
          createsSubcomponent: analysis.createsSubcomponent,
        });
      }
    }

    return { functions, interactions };
  }

  /**
   * Extraer cuerpo de una función
   */
  private static extractFunctionBody(
    content: string,
    functionName: string
  ): string {
    // Buscar función completa
    const functionRegex = new RegExp(
      `(?:function\\s+${functionName}|const\\s+${functionName}\\s*=\\s*(?:\\([^)]*\\)\\s*=>|function\\s*\\())([\\s\\S]*?)(?=function|const|export|$|\\n\\n)`,
      'i'
    );
    const match = content.match(functionRegex);
    return match ? match[1] : '';
  }

  /**
   * Analizar una función
   */
  private static analyzeFunction(
    functionName: string,
    functionBody: string,
    fullContent: string
  ): {
    isSubcomponentCreator: boolean;
    isInteraction: boolean;
    description: string;
    createsSubcomponent?: string;
    usesDependencies?: string[];
    trigger?: string;
  } {
    const nameLower = functionName.toLowerCase();
    let isSubcomponentCreator = false;
    let isInteraction = false;
    let description = `Función: ${functionName}`;
    let createsSubcomponent: string | undefined;
    let usesDependencies: string[] = [];
    let trigger: string | undefined;

    // Detectar si crea un subcomponente
    if (
      nameLower.includes('create') ||
      nameLower.includes('render') ||
      nameLower.includes('build')
    ) {
      isSubcomponentCreator = true;
      
      // Detectar qué componente crea
      if (nameLower.includes('calendar')) {
        createsSubcomponent = 'Calendar';
        trigger = 'click';
        description = `Crea el componente Calendar para input tipo calendar`;
      } else if (nameLower.includes('select') || nameLower.includes('dropdown')) {
        createsSubcomponent = 'List';
        trigger = 'click';
        description = `Crea el componente List para input tipo select/autocomplete`;
      } else if (nameLower.includes('toggle')) {
        createsSubcomponent = 'Password Toggle';
        trigger = 'click';
        description = `Crea toggle para mostrar/ocultar contraseña`;
      } else if (nameLower.includes('search') || nameLower.includes('clear')) {
        createsSubcomponent = 'Search Clear';
        trigger = 'click';
        description = `Crea botón para limpiar búsqueda`;
      }
    }

    // Detectar si es una interacción
    if (
      nameLower.includes('handle') ||
      nameLower.includes('on') ||
      nameLower.includes('toggle') ||
      functionBody.includes('addEventListener')
    ) {
      isInteraction = true;
      
      if (functionBody.includes('click')) trigger = 'click';
      else if (functionBody.includes('focus')) trigger = 'focus';
      else if (functionBody.includes('hover')) trigger = 'hover';
      else trigger = 'click';
    }

    // Detectar dependencias usadas
    const dependencyMatches = functionBody.match(/(create\w+|render\w+|import\([^)]+\))/g);
    if (dependencyMatches) {
      usesDependencies = dependencyMatches.map((m) => m.replace(/['"]/g, ''));
    }

    return {
      isSubcomponentCreator,
      isInteraction,
      description,
      createsSubcomponent,
      usesDependencies,
      trigger,
    };
  }

  /**
   * Extraer condicionales que activan subcomponentes
   */
  private static extractConditionals(
    content: string
  ): DeepComponentAnalysis['propsRequiringSubcomponents'] {
    const conditionals: DeepComponentAnalysis['propsRequiringSubcomponents'] = [];

    // Buscar: if (type === 'select') { createSelectDropdown(...) }
    const conditionalRegex =
      /if\s*\([^)]*type\s*[=!]+\s*['"]([^'"]+)['"][^)]*\)\s*\{[^}]*create(\w+)/gi;
    let match;
    while ((match = conditionalRegex.exec(content)) !== null) {
      const typeValue = match[1];
      const createFunction = match[2];
      
      // Determinar subcomponente desde la función
      let subcomponentName = createFunction;
      if (createFunction.toLowerCase().includes('select') || 
          createFunction.toLowerCase().includes('dropdown')) {
        subcomponentName = 'List';
      } else if (createFunction.toLowerCase().includes('calendar')) {
        subcomponentName = 'Calendar';
      }

      conditionals.push({
        propName: 'type',
        subcomponentName,
        condition: `type === '${typeValue}'`,
      });
    }

    return conditionals;
  }

  /**
   * Extraer event listeners
   */
  private static extractEventListeners(
    content: string
  ): DeepComponentAnalysis['interactions'] {
    const interactions: DeepComponentAnalysis['interactions'] = [];

    // Buscar: addEventListener('click', ...)
    const listenerRegex =
      /\.addEventListener\(['"]([^'"]+)['"],\s*(?:\([^)]*\)\s*=>|function\s*\([^)]*\))\s*\{([^}]+)\}/g;
    let match;
    while ((match = listenerRegex.exec(content)) !== null) {
      const eventType = match[1];
      const handlerBody = match[2];
      
      // Detectar si crea un subcomponente
      let createsSubcomponent: string | undefined;
      if (handlerBody.includes('createList') || handlerBody.includes('renderList')) {
        createsSubcomponent = 'List';
      } else if (handlerBody.includes('createCalendar') || handlerBody.includes('Calendar')) {
        createsSubcomponent = 'Calendar';
      }

      interactions.push({
        name: `${eventType} handler`,
        trigger: eventType,
        description: `Maneja evento ${eventType}`,
        createsSubcomponent,
      });
    }

    return interactions;
  }

  /**
   * Extraer llamadas a funciones create*
   */
  private static extractCreateCalls(
    content: string
  ): DeepComponentAnalysis['subcomponents'] {
    const subcomponents: DeepComponentAnalysis['subcomponents'] = [];

    // Buscar: createList(...), createCalendar(...), etc.
    const createCallRegex = /(create|render)(\w+)\(/g;
    let match;
    while ((match = createCallRegex.exec(content)) !== null) {
      const action = match[1]; // create o render
      const componentName = match[2];
      
      if (componentName.toLowerCase() === 'list') {
        subcomponents.push({
          name: 'List',
          type: 'external',
          componentId: 'formularios-list',
          trigger: 'click',
          description: `Componente List usado en ${action}List()`,
        });
      } else if (componentName.toLowerCase().includes('calendar')) {
        subcomponents.push({
          name: 'Calendar',
          type: 'external',
          componentId: 'formularios-calendar',
          trigger: 'click',
          description: `Componente Calendar usado en ${action}Calendar()`,
        });
      }
    }

    return subcomponents;
  }

  /**
   * Encontrar uso de nombres en funciones create*
   */
  private static findUsageInCreateFunctions(
    content: string,
    names: string[]
  ): string[] {
    const usage: string[] = [];
    
    for (const name of names) {
      // Buscar en funciones create*
      const createRegex = new RegExp(
        `function\\s+create\\w+[^{]*\\{[^}]*${name}[^}]*\\}`,
        'gi'
      );
      if (createRegex.test(content)) {
        usage.push(`create* functions`);
      }
    }
    
    return usage;
  }

  /**
   * Encontrar uso de nombres en el código
   */
  private static findUsageInCode(
    content: string,
    names: string[]
  ): string[] {
    const usage: string[] = [];
    
    for (const name of names) {
      const regex = new RegExp(`\\b${name}\\b`, 'g');
      const matches = content.match(regex);
      if (matches && matches.length > 0) {
        usage.push(`${name} (${matches.length} usos)`);
      }
    }
    
    return usage;
  }

  /**
   * Analizar tipos TypeScript
   */
  private static async analyzeTypeScriptTypes(
    componentId: string,
    componentName: string
  ): Promise<Partial<DeepComponentAnalysis>> {
    const result: Partial<DeepComponentAnalysis> = {
      dependencies: [],
      propsRequiringSubcomponents: [],
    };

    try {
      const normalizedId = componentId.replace(/-/g, '-');
      const possibleFiles = [
        `vendor/ubits/packages/components/${normalizedId}/src/types/${normalizedId}Options.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/types/index.ts`,
      ];

      for (const filePath of possibleFiles) {
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Buscar tipos que requieren subcomponentes
          // Ejemplo: selectOptions?: SelectOption[] → requiere List
          const propRegex = /(\w+)\??\s*:\s*(\w+Option\[\]|\w+Options?)/g;
          let match;
          while ((match = propRegex.exec(content)) !== null) {
            const propName = match[1];
            const propType = match[2];
            
            if (propType.includes('SelectOption')) {
              result.propsRequiringSubcomponents?.push({
                propName,
                subcomponentName: 'List',
                condition: `type === 'select'`,
              });
            } else if (propType.includes('AutocompleteOption')) {
              result.propsRequiringSubcomponents?.push({
                propName,
                subcomponentName: 'List',
                condition: `type === 'autocomplete'`,
              });
            }
          }
          
          break;
        } catch (error) {
          // Continuar con siguiente archivo
        }
      }
    } catch (error: any) {
      console.warn(`⚠️ Error analizando tipos: ${error.message}`);
    }

    return result;
  }

  /**
   * Analizar estilos CSS
   */
  private static async analyzeStyles(
    componentId: string,
    componentName: string
  ): Promise<Partial<DeepComponentAnalysis>> {
    const result: Partial<DeepComponentAnalysis> = {
      dependencies: [],
    };

    try {
      const normalizedId = componentId.replace(/-/g, '-');
      const possibleFiles = [
        `vendor/ubits/packages/components/${normalizedId}/src/styles/${normalizedId}.css`,
        `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}.css`,
      ];

      for (const filePath of possibleFiles) {
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Buscar imports de otros componentes en CSS
          // Ejemplo: @import '../list/list.css'
          const importRegex = /@import\s+['"]([^'"]+)['"]/g;
          let match;
          while ((match = importRegex.exec(content)) !== null) {
            const importPath = match[1];
            const componentMatch = importPath.match(/\/(\w+)\/\w+\.css/);
            if (componentMatch) {
              result.dependencies?.push({
                name: componentMatch[1],
                type: 'style',
                importPath,
                usage: ['CSS styles'],
              });
            }
          }
          
          break;
        } catch (error) {
          // Continuar con siguiente archivo
        }
      }
    } catch (error: any) {
      console.warn(`⚠️ Error analizando estilos: ${error.message}`);
    }

    return result;
  }

  /**
   * Analizar documentación
   */
  private static async analyzeDocumentation(
    componentId: string,
    componentName: string
  ): Promise<Partial<DeepComponentAnalysis>> {
    const result: Partial<DeepComponentAnalysis> = {
      subcomponents: [],
      dependencies: [],
    };

    try {
      const normalizedId = componentId.replace(/-/g, '-');
      const possibleFiles = [
        `vendor/ubits/packages/components/${normalizedId}/README.md`,
        `vendor/ubits/packages/components/${normalizedId}/docs/README.md`,
      ];

      for (const filePath of possibleFiles) {
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Buscar menciones de componentes en documentación
          const componentRegex = /(?:usa|usa el|requiere|depende de)\s+(\w+)/gi;
          let match;
          while ((match = componentRegex.exec(content)) !== null) {
            const componentName = match[1];
            result.subcomponents?.push({
              name: componentName,
              type: 'external',
              componentId: `formularios-${componentName.toLowerCase()}`,
              trigger: 'load',
              description: `Mencionado en documentación: ${componentName}`,
            });
          }
          
          break;
        } catch (error) {
          // Continuar con siguiente archivo
        }
      }
    } catch (error: any) {
      console.warn(`⚠️ Error analizando documentación: ${error.message}`);
    }

    return result;
  }

  /**
   * Eliminar subcomponentes duplicados
   */
  private static deduplicateSubcomponents(
    subcomponents: DeepComponentAnalysis['subcomponents']
  ): DeepComponentAnalysis['subcomponents'] {
    const seen = new Map<string, DeepComponentAnalysis['subcomponents'][0]>();
    
    for (const sub of subcomponents) {
      const key = `${sub.name}-${sub.type}`;
      if (!seen.has(key)) {
        seen.set(key, sub);
      } else {
        // Combinar información
        const existing = seen.get(key)!;
        existing.dependencies = [
          ...(existing.dependencies || []),
          ...(sub.dependencies || []),
        ].filter((v, i, a) => a.indexOf(v) === i);
        existing.usage = [
          ...(existing.usage || []),
          ...(sub.usage || []),
        ].filter((v, i, a) => a.indexOf(v) === i);
      }
    }
    
    return Array.from(seen.values());
  }

  /**
   * Eliminar dependencias duplicadas
   */
  private static deduplicateDependencies(
    dependencies: DeepComponentAnalysis['dependencies']
  ): DeepComponentAnalysis['dependencies'] {
    const seen = new Map<string, DeepComponentAnalysis['dependencies'][0]>();
    
    for (const dep of dependencies) {
      const key = `${dep.name}-${dep.type}`;
      if (!seen.has(key)) {
        seen.set(key, dep);
      } else {
        // Combinar usos
        const existing = seen.get(key)!;
        existing.usage = [
          ...(existing.usage || []),
          ...(dep.usage || []),
        ].filter((v, i, a) => a.indexOf(v) === i);
      }
    }
    
    return Array.from(seen.values());
  }
}

