/**
 * ✅ Test: Verificar que autorun.apply() implementa componentes perfectamente desde Storybook
 * 
 * Este script prueba:
 * 1. Consulta Storybook MCP para obtener props
 * 2. Extrae código exacto desde Storybook
 * 3. Sanitiza código (reemplaza colores hardcodeados)
 * 4. Valida estructura contra props
 * 5. Genera código con watermark v2
 */

import { autorunApply } from '../packages/autorun-core/src/mcp-server/tools/autorunApply.js';
import * as path from 'path';
import * as fs from 'fs/promises';

async function testAutorunApply() {
  console.log('🧪 Test: autorun.apply() con componente desde Storybook\n');
  console.log('═'.repeat(60));

  // 1. Preparar archivo de prueba
  const testFile = path.join(process.cwd(), 'prototypes', 'test-button-storybook.html');
  
  // Crear archivo de prueba si no existe
  try {
    await fs.access(testFile);
    console.log(`✅ Archivo de prueba existe: ${testFile}`);
  } catch {
    // Crear archivo básico
    const basicHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Test Button Storybook</title>
</head>
<body>
  <div id="CONTENT">
    <!-- AUTORUN: {"v":2,"mode":"prototypeTokens","components":[],"widgets":[],"deps":[],"hash":"test"} -->
    <!-- Contenido de prueba -->
    <!-- /AUTORUN -->
  </div>
</body>
</html>`;
    await fs.writeFile(testFile, basicHtml, 'utf-8');
    console.log(`✅ Archivo de prueba creado: ${testFile}`);
  }

  // 2. Probar autorun.apply() con Button
  console.log('\n📦 Probando autorun.apply() con componente Button...\n');

  try {
    const result = await autorunApply({
      message: 'Agregar un botón primario con texto "Probar Storybook" usando el componente Button de UBITS',
      targetFiles: [testFile],
    });

    console.log('\n📊 Resultado de autorun.apply():');
    console.log('═'.repeat(60));
    console.log(`✅ Éxito: ${result.success}`);
    console.log(`📁 Archivos escritos: ${result.filesWritten.length}`);
    result.filesWritten.forEach(file => {
      console.log(`   - ${file}`);
    });

    if (result.components && result.components.length > 0) {
      console.log(`\n🧩 Componentes detectados: ${result.components.length}`);
      result.components.forEach(comp => {
        console.log(`   - ${comp}`);
      });
    }

    if (result.verification) {
      console.log(`\n✅ Verificación pre-implementación: ${result.verification.preImplementation ? '✅' : '❌'}`);
      console.log(`✅ Verificación post-implementación: ${result.verification.postImplementation ? '✅' : '❌'}`);
      
      if (result.verification.errors && result.verification.errors.length > 0) {
        console.log(`\n❌ Errores:`);
        result.verification.errors.forEach(err => {
          console.log(`   - ${err}`);
        });
      }

      if (result.verification.warnings && result.verification.warnings.length > 0) {
        console.log(`\n⚠️ Advertencias:`);
        result.verification.warnings.forEach(warn => {
          console.log(`   - ${warn}`);
        });
      }
    }

    if (result.errors && result.errors.length > 0) {
      console.log(`\n❌ Errores generales:`);
      result.errors.forEach(err => {
        console.log(`   - ${err}`);
      });
    }

    // 3. Verificar que el archivo tiene watermark correcto
    console.log('\n🔍 Verificando watermark en archivo generado...\n');
    const fileContent = await fs.readFile(testFile, 'utf-8');
    
    const watermarkRegex = /<!--\s*AUTORUN:\s*({[\s\S]*?})\s*-->/g;
    const watermarks = Array.from(fileContent.matchAll(watermarkRegex));
    
    if (watermarks.length > 0) {
      console.log(`✅ Watermarks encontrados: ${watermarks.length}`);
      watermarks.forEach((match, index) => {
        try {
          const meta = JSON.parse(match[1]);
          console.log(`\n   Watermark ${index + 1}:`);
          console.log(`   - Versión: ${meta.v}`);
          console.log(`   - Modo: ${meta.mode}`);
          console.log(`   - Componentes: ${meta.components?.join(', ') || 'ninguno'}`);
          console.log(`   - Widgets: ${meta.widgets?.join(', ') || 'ninguno'}`);
          console.log(`   - Dependencias: ${meta.deps?.join(', ') || 'ninguna'}`);
          console.log(`   - Storybook ID: ${meta.storybookId || 'no especificado'}`);
          console.log(`   - Tokens: ${meta.tokens?.join(', ') || 'no especificados'}`);
          console.log(`   - Hash: ${meta.hash?.substring(0, 8)}...`);
        } catch (e) {
          console.log(`   ⚠️ Error parseando watermark: ${e}`);
        }
      });
    } else {
      console.log('❌ No se encontraron watermarks en el archivo');
    }

    // 4. Verificar que no hay colores hardcodeados
    console.log('\n🔍 Verificando colores hardcodeados...\n');
    const hardcodedColorRegex = /(#[0-9a-fA-F]{3,8}|rgb\s*\([^)]+\)|rgba\s*\([^)]+\)|hsl\s*\([^)]+\)|hsla\s*\([^)]+\)|\b(white|black)\b)/gi;
    const hardcodedColors = Array.from(fileContent.matchAll(hardcodedColorRegex));
    
    if (hardcodedColors.length > 0) {
      console.log(`⚠️ Colores hardcodeados encontrados: ${hardcodedColors.length}`);
      hardcodedColors.forEach(match => {
        console.log(`   - ${match[0]}`);
      });
    } else {
      console.log('✅ No se encontraron colores hardcodeados');
    }

    // 5. Verificar que se usan tokens CSS
    console.log('\n🔍 Verificando uso de tokens CSS...\n');
    const tokenRegex = /var\(--(?:ubits|modifiers)[\w-]+\)/g;
    const tokens = Array.from(fileContent.matchAll(tokenRegex));
    
    if (tokens.length > 0) {
      console.log(`✅ Tokens CSS encontrados: ${tokens.length}`);
      const uniqueTokens = new Set(tokens.map(m => m[0]));
      uniqueTokens.forEach(token => {
        console.log(`   - ${token}`);
      });
    } else {
      console.log('⚠️ No se encontraron tokens CSS');
    }

    console.log('\n' + '═'.repeat(60));
    console.log('\n✅ Test completado');
    
    if (result.success) {
      console.log('🎉 autorun.apply() funcionó correctamente desde Storybook!');
      process.exit(0);
    } else {
      console.log('❌ autorun.apply() falló');
      process.exit(1);
    }

  } catch (error: any) {
    console.error('\n❌ Error en test:');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Ejecutar test
testAutorunApply();

