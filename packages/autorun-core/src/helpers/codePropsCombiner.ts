/**
 * Code Props Combiner
 *
 * Combina código extraído de Storybook con props del componente
 * para crear implementación perfecta
 */

/**
 * Combina código extraído con props para crear implementación perfecta
 */
export function combineCodeWithProps(
  code: string,
  props: Record<string, any>,
  customProps?: Record<string, any>
): string {
  console.log(`🔧 [Code Combiner] Combinando código con props...`);

  if (!props || Object.keys(props).length === 0) {
    console.warn(
      `⚠️ [Code Combiner] No hay props para combinar, retornando código original`
    );
    return code;
  }

  // 1. Buscar función de creación común (createDataTable, createModal, etc.)
  const functionPatterns = [
    /createDataTable\(({[\s\S]*?})\)/,
    /createModal\(({[\s\S]*?})\)/,
    /createHeaderSection\(({[\s\S]*?})\)/,
    /createButton\(({[\s\S]*?})\)/,
    /createInput\(({[\s\S]*?})\)/,
    /(\w+)\.create\(({[\s\S]*?})\)/, // Patrón genérico para Component.create()
  ];

  let configMatch: RegExpMatchArray | null = null;
  let functionName = '';

  for (const pattern of functionPatterns) {
    const match = code.match(pattern);
    if (match) {
      configMatch = match;
      functionName = match[0].split('(')[0];
      break;
    }
  }

  if (!configMatch) {
    console.warn(
      `⚠️ [Code Combiner] No se encontró función de creación en el código, retornando código original`
    );
    return code;
  }

  console.log(`   ✅ Función encontrada: ${functionName}`);

  // 2. Extraer configuración existente
  let existingConfig: Record<string, any> = {};
  try {
    // Intentar parsear como JSON primero
    existingConfig = JSON.parse(configMatch[1]);
  } catch (e) {
    try {
      // Si falla, intentar evaluar como JavaScript (con cuidado)
      // Solo en contexto seguro
      const cleanedConfig = configMatch[1].trim();
      if (cleanedConfig.startsWith('{') && cleanedConfig.endsWith('}')) {
        // Usar eval solo si parece ser un objeto literal válido
        existingConfig = eval(`(${cleanedConfig})`);
      } else {
        throw new Error('Configuración no es un objeto válido');
      }
    } catch (e2) {
      console.warn(
        `⚠️ [Code Combiner] No se pudo parsear configuración: ${e2}, usando código original`
      );
      return code;
    }
  }

  console.log(
    `   ✅ Configuración existente extraída: ${Object.keys(existingConfig).length} props`
  );

  // 3. Combinar con props del MCP (prioridad media)
  // Solo combinar props que no están ya en la configuración o que son más específicas
  const combinedConfig = {
    ...existingConfig,
    ...props, // Props del MCP tienen prioridad sobre configuración existente
    ...customProps, // Props personalizadas tienen máxima prioridad
  };

  // 4. Reemplazar configuración en el código
  const combinedCode = code.replace(
    configMatch[0],
    `${functionName}(${JSON.stringify(combinedConfig, null, 2)})`
  );

  console.log(`   ✅ Código combinado: ${combinedCode.length} caracteres`);
  console.log(
    `   ✅ Props combinadas: ${Object.keys(combinedConfig).length} props totales`
  );

  return combinedCode;
}

/**
 * Valida que el código combinado tenga la estructura correcta
 */
export async function validateCompleteStructure(
  code: string,
  componentId: string,
  props: Record<string, any>
): Promise<{
  valid: boolean;
  errors: string[];
  warnings: string[];
}> {
  console.log(`✅ [Structure Validator] Validando estructura del código...`);

  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Validar que el código contiene alguna función de creación
  const hasCreationFunction =
    code.includes('createDataTable') ||
    code.includes('createModal') ||
    code.includes('createHeaderSection') ||
    code.includes('createButton') ||
    code.includes('createInput') ||
    code.includes('.create(');

  if (!hasCreationFunction) {
    errors.push('Código no contiene función de creación reconocida');
  }

  // 2. Validar que tiene configuración
  const configPatterns = [
    /createDataTable\(({[\s\S]*?})\)/,
    /createModal\(({[\s\S]*?})\)/,
    /createHeaderSection\(({[\s\S]*?})\)/,
    /(\w+)\.create\(({[\s\S]*?})\)/,
  ];

  let configMatch: RegExpMatchArray | null = null;
  for (const pattern of configPatterns) {
    const match = code.match(pattern);
    if (match) {
      configMatch = match;
      break;
    }
  }

  if (!configMatch) {
    errors.push('Código no contiene configuración válida');
    return { valid: false, errors, warnings };
  }

  // 3. Validar props requeridas según el componente
  const requiredPropsByComponent: Record<string, string[]> = {
    'data-data-table': ['containerId', 'columns', 'rows'],
    'header-section': ['title'],
    modal: ['containerId', 'title'],
    button: ['text'],
    input: ['containerId'],
  };

  const requiredProps = requiredPropsByComponent[componentId] || [];

  if (requiredProps.length > 0) {
    let config: Record<string, any> = {};
    try {
      config = JSON.parse(configMatch[1]);
    } catch (e) {
      try {
        config = eval(`(${configMatch[1]})`);
      } catch (e2) {
        errors.push(
          'No se pudo parsear configuración para validar props requeridas'
        );
        return { valid: false, errors, warnings };
      }
    }

    requiredProps.forEach((prop) => {
      if (!config[prop] && config[prop] !== false && config[prop] !== 0) {
        errors.push(`Prop requerida faltante: ${prop}`);
      }
    });

    // 4. Validar estructura de datos específica según componente
    if (componentId === 'data-data-table') {
      if (config.columns && !Array.isArray(config.columns)) {
        errors.push('Columns debe ser un array');
      }
      if (config.rows && !Array.isArray(config.rows)) {
        errors.push('Rows debe ser un array');
      }

      // Validar estructura de columnas
      if (Array.isArray(config.columns) && config.columns.length > 0) {
        const firstColumn = config.columns[0];
        if (!firstColumn.id && !firstColumn.label) {
          warnings.push('Columnas pueden necesitar propiedades "id" y "label"');
        }
      }

      // Validar estructura de filas
      if (Array.isArray(config.rows) && config.rows.length > 0) {
        const firstRow = config.rows[0];
        if (!firstRow.id) {
          warnings.push('Filas pueden necesitar propiedad "id"');
        }
      }
    }
  }

  // 5. Validar contra props del componente (si están disponibles)
  if (props && Object.keys(props).length > 0) {
    let config: Record<string, any> = {};
    try {
      config = JSON.parse(configMatch[1]);
    } catch (e) {
      try {
        config = eval(`(${configMatch[1]})`);
      } catch (e2) {
        // Si no se puede parsear, saltar esta validación
        return { valid: errors.length === 0, errors, warnings };
      }
    }

    // Verificar que las props usadas sean válidas (opcional, solo advertencia)
    const validProps = Object.keys(props);
    const usedProps = Object.keys(config);
    const invalidProps = usedProps.filter(
      (p) => !validProps.includes(p) && !requiredProps.includes(p)
    );

    if (invalidProps.length > 0) {
      warnings.push(
        `Props no reconocidas en el componente: ${invalidProps.join(', ')}`
      );
    }
  }

  const valid = errors.length === 0;

  console.log(`   ✅ Validación ${valid ? 'exitosa' : 'fallida'}`);
  if (errors.length > 0) {
    console.error(`   ❌ Errores: ${errors.join(', ')}`);
  }
  if (warnings.length > 0) {
    console.warn(`   ⚠️ Advertencias: ${warnings.join(', ')}`);
  }

  return {
    valid,
    errors,
    warnings,
  };
}

/**
 * Busca la historia "code" en el componente
 *
 * ⚠️ NUEVO: Priorizar historia "code" que muestra código directamente sin botones
 * (Sugerencia del usuario)
 */
export async function findCodeStory(
  componentId: string
): Promise<string | null> {
  console.log(
    `🔍 [Story Finder] Buscando historia "code" para: ${componentId}`
  );

  try {
    // Importar función para obtener historias
    const { getComponentStories } = await import('./storybookStories.js');

    const storiesResult = await getComponentStories('', componentId);
    const stories = storiesResult.stories;

    // Buscar historia "code" específicamente
    const codeStory = stories.find((s) => s.name === 'code');

    if (codeStory) {
      console.log(
        `   ✅ Historia "code" encontrada: ${codeStory.name} (ID: ${codeStory.id})`
      );
      return codeStory.name;
    } else {
      console.log(
        `   ⚠️ Historia "code" no encontrada en ${stories.length} historias disponibles`
      );
      return null;
    }
  } catch (error: any) {
    console.warn(`   ⚠️ Error buscando historia "code": ${error.message}`);
    return null;
  }
}

/**
 * Busca historia "implementation" automáticamente
 *
 * ⚠️ MEJORADO: Ahora busca "code" primero antes de buscar "implementation"
 */
export async function findImplementationStory(
  componentId: string
): Promise<string> {
  console.log(
    `🔍 [Story Finder] Buscando historia "implementation" para: ${componentId}`
  );

  try {
    // ⚠️ NUEVO: Buscar historia "code" primero (sugerencia del usuario)
    const codeStory = await findCodeStory(componentId);
    if (codeStory) {
      console.log(`   ✅ Usando historia "code" encontrada: ${codeStory}`);
      return codeStory;
    }

    // Importar función para obtener historias
    const { getComponentStories } = await import('./storybookStories.js');

    const storiesResult = await getComponentStories('', componentId);
    const stories = storiesResult.stories;

    console.log(
      `   📚 Historias disponibles: ${stories.map((s) => s.name).join(', ')}`
    );

    // ⚠️ CRÍTICO: Buscar historia "implementation" específicamente
    // Prioridad 1: Nombre exacto "Implementation" (con mayúscula, como está en el código fuente)
    let implementationStory = stories.find((s) => s.name === 'Implementation');

    // Prioridad 2: Nombre exacto "implementation" (minúsculas)
    if (!implementationStory) {
      implementationStory = stories.find((s) => s.name === 'implementation');
    }

    // Prioridad 3: Nombres que contengan "implementation" o "copy-paste"
    if (!implementationStory) {
      implementationStory = stories.find(
        (s) =>
          s.name.toLowerCase().includes('implementation') ||
          s.name.toLowerCase().includes('copy-paste') ||
          s.name.toLowerCase().includes('copy/paste')
      );
    }

    // Prioridad 3: Buscar por ID completo (ej: "básicos-button--implementation")
    if (!implementationStory) {
      implementationStory = stories.find(
        (s) => s.id === `${componentId}--implementation`
      );
    }

    if (implementationStory) {
      console.log(
        `   ✅ Historia "implementation" encontrada: ${implementationStory.name} (ID: ${implementationStory.id})`
      );
      return implementationStory.name;
    } else {
      console.log(
        `   ⚠️ Historia "implementation" no encontrada en ${stories.length} historias disponibles`
      );
      console.log(
        `   📋 Intentando verificar directamente en Storybook si existe ${componentId}--implementation...`
      );

      // ⚠️ ÚLTIMO INTENTO: Verificar directamente si existe la historia "implementation"
      // Construir URL y verificar si existe
      try {
        const { StorybookManager } = await import('./storybookManager.js');
        const manager = StorybookManager.getInstance();
        const activeConfig = await manager.getActiveConfig();

        if (activeConfig) {
          // ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
          const encodedComponentId = encodeURIComponent(componentId);
          const implementationUrl = `${activeConfig.url}/?path=/story/${encodedComponentId}--implementation`;
          console.log(`   🔍 Verificando URL: ${implementationUrl}`);

          // Intentar fetch para verificar si existe
          try {
            const response = await fetch(implementationUrl, { method: 'HEAD' });
            if (response.ok || response.status === 200) {
              console.log(
                `   ✅ URL de historia "implementation" existe, usando "implementation"`
              );
              return 'implementation';
            }
          } catch (fetchError) {
            // Ignorar error de fetch, continuar con default
          }
        }
      } catch (verifyError) {
        // Ignorar error de verificación, continuar con default
      }

      console.log(
        `   ⚠️ Historia "implementation" no encontrada, usando "default"`
      );
      return 'default';
    }
  } catch (error: any) {
    console.warn(
      `   ⚠️ Error buscando historias: ${error.message}, usando "default"`
    );
    return 'default';
  }
}
