const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);

if (scriptMatch) {
  const script = scriptMatch[1];
  
  // Intentar validar el script
  try {
    // Crear un contexto aislado para evaluar
    const vm = require('vm');
    const context = vm.createContext({
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      document: {},
      window: {}
    });
    
    vm.runInContext(script, context);
    console.log('✓ Script válido');
  } catch (e) {
    console.log('✗ Error de sintaxis:', e.message);
    console.log('Línea aproximada en el script:', e.stack);
    
    // Intentar encontrar la línea problemática
    const lines = script.split('\n');
    const errorLine = e.lineNumber || 0;
    if (errorLine > 0 && errorLine < lines.length) {
      console.log('\nLínea problemática (aproximada):');
      console.log(`Línea ${errorLine + 2853}: ${lines[errorLine - 1]}`);
      if (errorLine < lines.length) {
        console.log(`Línea ${errorLine + 2854}: ${lines[errorLine]}`);
      }
    }
  }
} else {
  console.log('No se encontró el script');
}





