/**
 * CSS Class Detector
 *
 * Detecta qué clases CSS están disponibles en el template
 * para usar las clases correctas al implementar componentes.
 */

/**
 * Detecta qué clases de botón están disponibles según el CSS cargado
 *
 * @param templateContent Contenido del template HTML
 * @returns Clases correctas a usar para botones
 */
export function detectButtonClasses(templateContent: string): {
  baseClass: string;
  variantClass: string;
  sizeClass: string;
} {
  // Verificar si hay CSS de UBITS cargado
  const hasUBITSCSS =
    templateContent.includes('ubits-button') ||
    templateContent.includes('components/button/src/styles/button.css');

  // ⚠️ TEMPORALMENTE DESHABILITADO: Solo usando UBITS Storybook
  // Verificar si hay CSS de Libraries UI
  // const hasLibrariesUICSS =
  // 	templateContent.includes('libraries-ui') && templateContent.includes('button');
  const hasLibrariesUICSS = false; // Deshabilitado temporalmente

  // Verificar si hay clases genéricas
  const hasGenericButton =
    templateContent.includes('class="button') ||
    templateContent.includes("class='button");

  // Decidir qué clases usar
  if (hasUBITSCSS) {
    return {
      baseClass: 'ubits-button',
      variantClass: 'ubits-button--primary',
      sizeClass: 'ubits-button--md',
    };
  }

  if (hasLibrariesUICSS) {
    // Libraries UI podría usar clases diferentes - necesitaríamos verificar
    // Por ahora, usar UBITS como fallback si el CSS de UBITS está cargado
    return {
      baseClass: 'ubits-button',
      variantClass: 'ubits-button--primary',
      sizeClass: 'ubits-button--md',
    };
  }

  // Fallback: usar clases UBITS (más común)
  return {
    baseClass: 'ubits-button',
    variantClass: 'ubits-button--primary',
    sizeClass: 'ubits-button--md',
  };
}

/**
 * Genera el HTML correcto para un botón según las clases detectadas
 *
 * @param text Texto del botón
 * @param variant Variante (primary, secondary, tertiary)
 * @param size Tamaño (xs, sm, md, lg)
 * @param templateContent Contenido del template para detectar clases
 * @returns HTML del botón con clases correctas
 */
export function generateButtonHTML(
  text: string,
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary',
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md',
  templateContent: string
): string {
  const classes = detectButtonClasses(templateContent);

  return `<button type="button" class="${classes.baseClass} ${classes.baseClass}--${variant} ${classes.baseClass}--${size}">
  <span>${text}</span>
</button>`;
}

/**
 * Verifica si una clase específica está disponible en el CSS cargado
 *
 * @param className Clase a verificar (ej: 'ubits-button')
 * @param templateContent Contenido del template HTML
 * @returns true si la clase está disponible
 */
export function isClassAvailable(
  className: string,
  templateContent: string
): boolean {
  // Verificar si el CSS que define esta clase está cargado
  if (className.startsWith('ubits-')) {
    return (
      templateContent.includes('ubits-storybook10.vercel.app') ||
      (templateContent.includes('components/') &&
        templateContent.includes(className.split('-')[1]))
    );
  }

  return false;
}
