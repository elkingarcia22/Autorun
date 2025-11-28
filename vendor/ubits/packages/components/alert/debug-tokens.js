/**
 * Script de debugging para verificar tokens de Alert
 * Ejecutar en la consola del navegador después de cargar la página
 */

(function() {
    console.log('🔍 INICIANDO DIAGNÓSTICO DE TOKENS...');
    console.log('='.repeat(70));
    
    const tokens = [
        'modifiers-normal-color-light-feedback-bg-success-subtle-default',
        'modifiers-normal-color-light-feedback-fg-success-subtle-default',
        'modifiers-normal-color-light-feedback-border-success',
        'modifiers-normal-color-light-feedback-bg-info-subtle-default',
        'modifiers-normal-color-light-feedback-fg-info-subtle-default',
        'modifiers-normal-color-light-feedback-border-info',
        'modifiers-normal-color-light-feedback-bg-warning-subtle-default',
        'modifiers-normal-color-light-feedback-fg-warning-subtle-default',
        'modifiers-normal-color-light-feedback-border-warning',
        'modifiers-normal-color-light-feedback-bg-error-subtle-default',
        'modifiers-normal-color-light-feedback-fg-error-subtle-default',
        'modifiers-normal-color-light-feedback-border-error',
        'modifiers-normal-color-light-bg-2',
        'modifiers-normal-color-light-fg-1-medium',
    ];
    
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    let existsCount = 0;
    let missingCount = 0;
    const results = [];
    
    console.log(`\n📊 Verificando ${tokens.length} tokens...\n`);
    
    tokens.forEach(token => {
        const tokenName = `--${token}`;
        const value = computedStyle.getPropertyValue(tokenName).trim();
        
        if (value) {
            existsCount++;
            console.log(`✅ ${tokenName}: ${value}`);
            results.push({ token: tokenName, value, exists: true });
        } else {
            missingCount++;
            console.error(`❌ ${tokenName}: NO DEFINIDO`);
            results.push({ token: tokenName, value: null, exists: false });
        }
    });
    
    console.log('\n' + '='.repeat(70));
    console.log(`\n📊 RESUMEN:`);
    console.log(`   ✅ Tokens existentes: ${existsCount}/${tokens.length}`);
    console.log(`   ❌ Tokens faltantes: ${missingCount}/${tokens.length}`);
    
    if (missingCount > 0) {
        console.error(`\n⚠️  PROBLEMA: ${missingCount} tokens no están disponibles`);
        console.log('\n🔧 POSIBLES SOLUCIONES:');
        console.log('   1. Verificar que figma-tokens.css esté cargado');
        console.log('   2. Verificar el orden de carga (figma-tokens.css debe ir ANTES)');
        console.log('   3. Verificar que el archivo exista en packages/tokens/dist/');
        console.log('   4. Limpiar caché del navegador');
    } else {
        console.log('\n✅ Todos los tokens están disponibles');
    }
    
    // Verificar si figma-tokens.css está cargado
    const stylesheets = Array.from(document.styleSheets);
    const figmaLoaded = stylesheets.some(sheet => {
        try {
            return sheet.href && sheet.href.includes('figma-tokens.css');
        } catch (e) {
            return false;
        }
    });
    
    console.log('\n' + '='.repeat(70));
    console.log(`\n📄 ESTILOS CARGADOS:`);
    console.log(`   figma-tokens.css: ${figmaLoaded ? '✅ CARGADO' : '❌ NO CARGADO'}`);
    
    // Retornar resultados para uso programático
    return {
        total: tokens.length,
        exists: existsCount,
        missing: missingCount,
        results: results,
        figmaLoaded: figmaLoaded
    };
})();

