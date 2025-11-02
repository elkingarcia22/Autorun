/**
 * Path Resolver
 * Resuelve rutas relativas correctamente según la ubicación del archivo HTML
 */

class PathResolver {
  constructor() {
    // Detectar la ubicación del documento actual
    const scripts = document.getElementsByTagName('script');
    const currentScript = Array.from(scripts).find(script => 
      script.src && script.src.includes('path-resolver')
    );
    
    if (currentScript) {
      this.basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/'));
    } else {
      // Fallback: usar window.location
      this.basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    }
  }

  /**
   * Resuelve una ruta relativa desde la raíz del proyecto
   * @param {string} relativePath - Ruta relativa (ej: '../../tokens/dist/tokens.css')
   * @returns {string} - Ruta resuelta
   */
  resolve(relativePath) {
    // Si es una ruta absoluta o URL completa, retornar tal cual
    if (relativePath.startsWith('http://') || 
        relativePath.startsWith('https://') || 
        relativePath.startsWith('/')) {
      return relativePath;
    }

    // Resolver rutas relativas
    const base = this.basePath || '';
    const normalized = relativePath.replace(/\/+/g, '/');
    
    // Si empieza con .., subir directorios
    let pathParts = normalized.split('/');
    let baseParts = base.split('/').filter(p => p);
    
    while (pathParts.length > 0 && pathParts[0] === '..') {
      pathParts.shift();
      if (baseParts.length > 0) {
        baseParts.pop();
      }
    }
    
    const resolvedPath = '/' + baseParts.concat(pathParts).join('/');
    return resolvedPath;
  }

  /**
   * Resuelve una ruta de asset (imagen, fuente, etc.)
   * @param {string} assetPath - Ruta del asset
   * @returns {string} - Ruta resuelta
   */
  resolveAsset(assetPath) {
    // Intentar diferentes estrategias
    const strategies = [
      assetPath, // Ruta original
      this.resolve(assetPath), // Resolver desde base
      `../assets/${assetPath.replace(/^.*\//, '')}`, // Desde assets local
    ];

    // Retornar la primera que funcione o la original como fallback
    return strategies[0];
  }
}

// Instancia global
window.pathResolver = new PathResolver();

/**
 * Helper function para resolver rutas en HTML
 */
window.resolvePath = function(relativePath) {
  return window.pathResolver.resolve(relativePath);
};

/**
 * Helper function para resolver assets
 */
window.resolveAsset = function(assetPath) {
  return window.pathResolver.resolveAsset(assetPath);
};

console.log('✅ Path Resolver inicializado');

