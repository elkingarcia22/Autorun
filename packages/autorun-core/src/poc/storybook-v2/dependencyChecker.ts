/**
 * Dependency Checker - POC Storybook V2
 *
 * Sistema para verificar que las dependencias necesarias estén disponibles
 */

export interface DependencyCheck {
  cssLoaded: boolean;
  componentRegistered: boolean;
  contentManagerExists: boolean;
  details?: {
    cssUrl?: string;
    componentName?: string;
    contentManagerVersion?: string;
  };
}

class DependencyChecker {
  /**
   * Verifica que el CSS esté cargado
   */
  checkCSS(componentId: string): boolean {
    if (typeof document === 'undefined') {
      return false;
    }

    // Normalizar componentId para buscar en URLs de CSS
    const cssFileName = `${componentId}.css` || `radio-button.css`;
    const stylesheets = Array.from(document.styleSheets);

    const found = stylesheets.some((sheet) => {
      try {
        const href = sheet.href;
        if (!href) return false;

        // Buscar por nombre de archivo en la URL
        return href.includes(cssFileName) || href.includes(componentId);
      } catch (e) {
        // CORS puede bloquear acceso a href
        return false;
      }
    });

    return found;
  }

  /**
   * Verifica que el componente esté registrado en window.UBITS
   */
  checkComponentRegistered(componentId: string): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const windowAny = window as any;
    if (!windowAny.UBITS) {
      return false;
    }

    // Normalizar componentId: "radio-button" -> "RadioButton"
    const normalizedId = componentId
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    return !!(windowAny.UBITS[normalizedId] || windowAny.UBITS[componentId]);
  }

  /**
   * Verifica que ContentManager existe
   */
  checkContentManager(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const windowAny = window as any;
    return !!windowAny.UBITS_ContentManager;
  }

  /**
   * Verifica todas las dependencias
   */
  checkAll(componentId: string): DependencyCheck {
    const cssLoaded = this.checkCSS(componentId);
    const componentRegistered = this.checkComponentRegistered(componentId);
    const contentManagerExists = this.checkContentManager();

    const details: DependencyCheck['details'] = {};

    if (cssLoaded) {
      // Intentar obtener la URL del CSS
      try {
        const stylesheets = Array.from(document.styleSheets);
        const cssSheet = stylesheets.find((sheet) => {
          try {
            return (
              sheet.href &&
              (sheet.href.includes(componentId) ||
                sheet.href.includes(`${componentId}.css`))
            );
          } catch {
            return false;
          }
        });
        if (cssSheet) {
          details.cssUrl = cssSheet.href || undefined;
        }
      } catch (e) {
        // Ignorar errores de CORS
      }
    }

    if (componentRegistered) {
      const windowAny = window as any;
      const normalizedId = componentId
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      details.componentName = windowAny.UBITS[normalizedId]
        ? normalizedId
        : componentId;
    }

    if (contentManagerExists) {
      const windowAny = window as any;
      details.contentManagerVersion =
        windowAny.UBITS_ContentManager?.version || 'unknown';
    }

    return {
      cssLoaded,
      componentRegistered,
      contentManagerExists,
      details: Object.keys(details).length > 0 ? details : undefined,
    };
  }

  /**
   * Espera a que las dependencias estén disponibles
   */
  async waitForDependencies(
    componentId: string,
    timeout = 5000
  ): Promise<DependencyCheck> {
    const startTime = Date.now();
    const checkInterval = 100; // Verificar cada 100ms

    while (Date.now() - startTime < timeout) {
      const check = this.checkAll(componentId);

      // Si todas las dependencias críticas están disponibles
      if (check.cssLoaded && check.componentRegistered) {
        console.log(
          `✅ [DependencyChecker] Todas las dependencias disponibles para: ${componentId}`
        );
        return check;
      }

      // Esperar antes de verificar de nuevo
      await new Promise((resolve) => setTimeout(resolve, checkInterval));
    }

    // Timeout alcanzado
    const finalCheck = this.checkAll(componentId);
    console.warn(
      `⏰ [DependencyChecker] Timeout esperando dependencias para: ${componentId}`,
      finalCheck
    );
    return finalCheck;
  }

  /**
   * Verifica y reporta el estado de las dependencias
   */
  report(componentId: string): void {
    const check = this.checkAll(componentId);

    console.log(
      `📊 [DependencyChecker] Estado de dependencias para: ${componentId}`
    );
    console.log(`   CSS cargado: ${check.cssLoaded ? '✅' : '❌'}`);
    console.log(
      `   Componente registrado: ${check.componentRegistered ? '✅' : '❌'}`
    );
    console.log(
      `   ContentManager existe: ${check.contentManagerExists ? '✅' : '❌'}`
    );

    if (check.details) {
      if (check.details.cssUrl) {
        console.log(`   CSS URL: ${check.details.cssUrl}`);
      }
      if (check.details.componentName) {
        console.log(`   Nombre del componente: ${check.details.componentName}`);
      }
    }

    // Advertencias
    if (!check.cssLoaded) {
      console.warn(`   ⚠️ CSS no cargado - los estilos pueden no aplicarse`);
    }
    if (!check.componentRegistered) {
      console.warn(
        `   ⚠️ Componente no registrado - puede requerir registro manual`
      );
    }
  }
}

export default new DependencyChecker();
