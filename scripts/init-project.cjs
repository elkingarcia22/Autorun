#!/usr/bin/env node

/**
 * Sistema de Inicialización de Proyectos UBITS
 * 
 * Guía interactiva para configurar un nuevo proyecto desde cero
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function main() {
  log('\n🚀 Sistema de Inicialización de Proyectos UBITS\n', colors.cyan);
  log('═══════════════════════════════════════', colors.cyan);
  
  // Paso 1: Solicitar información del repositorio
  log('\n📦 Paso 1: Configuración del Repositorio\n', colors.blue);
  
  const repoUrl = await question('🔗 URL del repositorio GitHub: ');
  if (!repoUrl.trim()) {
    log('❌ URL de repositorio requerida', colors.red);
    process.exit(1);
  }
  
  const projectName = await question('📝 Nombre del proyecto (opcional, se detectará del repo): ');
  const repoName = projectName.trim() || repoUrl.split('/').pop().replace('.git', '');
  
  // Paso 2: Seleccionar perfil
  log('\n👤 Paso 2: Selección de Perfil\n', colors.blue);
  log('1. Colaborador (default)', colors.yellow);
  log('2. Administrador\n', colors.yellow);
  
  const profileChoice = await question('Selecciona perfil (1 o 2): ');
  const profile = profileChoice.trim() === '2' ? 'admin' : 'colaborador';
  
  log(`\n✅ Perfil seleccionado: ${profile}`, colors.green);
  
  // Paso 3: Crear estructura del proyecto
  log('\n📁 Paso 3: Creando Estructura del Proyecto\n', colors.blue);
  
  const projectDir = path.join(process.cwd(), repoName);
  
  if (fs.existsSync(projectDir)) {
    const overwrite = await question(`⚠️  La carpeta "${repoName}" ya existe. ¿Sobrescribir? (s/N): `);
    if (overwrite.toLowerCase() !== 's') {
      log('❌ Operación cancelada', colors.red);
      process.exit(0);
    }
    fs.rmSync(projectDir, { recursive: true, force: true });
  }
  
  fs.mkdirSync(projectDir, { recursive: true });
  
  log(`📂 Proyecto creado en: ${projectDir}`, colors.green);
  
  // Paso 4: Clonar template base
  log('\n📥 Paso 4: Configurando Template Base\n', colors.blue);
  
  const templateSource = path.join(__dirname, '..');
  const templateFiles = [
    'packages',
    'scripts',
    '.ubits',
    '.husky',
    '.cursorrules',
    'package.json',
    'biome.json',
    'tsconfig.json',
    'README.md'
  ];
  
  // Copiar archivos del template
  templateFiles.forEach(file => {
    const sourcePath = path.join(templateSource, file);
    const destPath = path.join(projectDir, file);
    
    if (fs.existsSync(sourcePath)) {
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
      log(`  ✅ ${file}`, colors.green);
    }
  });
  
  // Paso 5: Configurar perfil
  log(`\n⚙️  Paso 5: Configurando Template para Perfil: ${profile}\n`, colors.blue);
  
  const configPath = path.join(projectDir, '.ubits', 'project-config.json');
  const projectConfig = {
    projectName: repoName,
    repositoryUrl: repoUrl,
    profile: profile,
    sidebarVariant: profile === 'admin' ? 'admin' : 'colaborador',
    initialSection: profile === 'admin' ? 'inicio' : 'aprendizaje',
    createdAt: new Date().toISOString(),
    addons: {
      clarity: false,
      onboarding: false,
      feedback: false
    },
    deployment: {
      platform: null,
      url: null
    }
  };
  
  fs.writeFileSync(configPath, JSON.stringify(projectConfig, null, 2));
  log(`✅ Configuración guardada en: .ubits/project-config.json`, colors.green);
  
  // Paso 6: Inicializar Git (si no existe)
  log('\n🔧 Paso 6: Inicializando Git\n', colors.blue);
  
  try {
    process.chdir(projectDir);
    
    // Inicializar git si no existe
    if (!fs.existsSync(path.join(projectDir, '.git'))) {
      execSync('git init', { stdio: 'inherit' });
      log('✅ Git inicializado', colors.green);
    }
    
    // Configurar remoto si no existe
    try {
      execSync('git remote get-url origin', { stdio: 'pipe' });
      log('✅ Remoto ya configurado', colors.green);
    } catch {
      execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
      log(`✅ Remoto configurado: ${repoUrl}`, colors.green);
    }
  } catch (error) {
    log(`⚠️  Advertencia: ${error.message}`, colors.yellow);
  }
  
  // Paso 7: Instalar dependencias
  log('\n📦 Paso 7: Instalando Dependencias\n', colors.blue);
  
  try {
    execSync('npm install', { stdio: 'inherit', cwd: projectDir });
    log('✅ Dependencias instaladas', colors.green);
  } catch (error) {
    log(`⚠️  Error instalando dependencias: ${error.message}`, colors.yellow);
  }
  
  // Paso 8: Configurar template según perfil
  log(`\n🎨 Paso 8: Configurando Template para ${profile}\n`, colors.blue);
  
  const templatePath = path.join(projectDir, 'packages', 'playground-app', 'template-qa.html');
  if (fs.existsSync(templatePath)) {
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Configurar perfil en el template
    templateContent = templateContent.replace(
      /initialActiveSection:\s*['"](.*?)['"]/,
      `initialActiveSection: '${projectConfig.initialSection}'`
    );
    
    templateContent = templateContent.replace(
      /variant:\s*['"](.*?)['"]/,
      `variant: '${projectConfig.sidebarVariant}'`
    );
    
    fs.writeFileSync(templatePath, templateContent);
    log('✅ Template configurado', colors.green);
  }
  
  // Paso 9: Configurar auto-commit
  log('\n🤖 Paso 9: Configurando Auto-Commit y Validación\n', colors.blue);
  
  const watchScript = `
const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');

console.log('🤖 Auto-commit y validación activado...');
console.log('📝 Cambios serán validados y commitados automáticamente\\n');

let timeout;
const delay = 5000; // 5 segundos de delay

const watcher = chokidar.watch([
  'packages/**/*.{ts,tsx,js,jsx,html,css}',
  '!**/node_modules/**',
  '!**/dist/**'
], {
  ignored: /node_modules|dist|\\.git/,
  persistent: true
});

watcher.on('change', (filePath) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log(\`📝 Archivo modificado: \${path.relative(process.cwd(), filePath)}\`);
    
    try {
      // Validar y corregir
      execSync('npm run validate:fix', { stdio: 'inherit' });
      
      // Agregar al staging
      execSync(\`git add "\${filePath}"\`, { stdio: 'pipe' });
      
      // Hacer commit automático
      const message = \`Auto-commit: Actualizar \${path.basename(filePath)}\`;
      execSync(\`git commit -m "\${message}"\`, { stdio: 'inherit' });
      
      console.log(\`✅ Commit automático completado\\n\`);
    } catch (error) {
      console.error(\`❌ Error en auto-commit: \${error.message}\\n\`);
    }
  }, delay);
});

console.log('👀 Observando cambios...\\n');
`;
  
  const watchScriptPath = path.join(projectDir, 'scripts', 'watch-auto-commit.cjs');
  fs.writeFileSync(watchScriptPath, watchScript);
  
  // Actualizar package.json con script watch
  const packageJsonPath = path.join(projectDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.watch = 'node scripts/watch-auto-commit.cjs';
  packageJson.devDependencies = packageJson.devDependencies || {};
  packageJson.devDependencies.chokidar = '^3.6.0';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  log('✅ Auto-commit configurado', colors.green);
  log('   Ejecuta: npm run watch para activar', colors.yellow);
  
  // Paso 10: Crear README del proyecto
  log('\n📝 Paso 10: Creando README del Proyecto\n', colors.blue);
  
  const readmeContent = `# ${repoName}

Proyecto UBITS generado automáticamente.

## 🚀 Inicio Rápido

### 1. Instalar Dependencias
\`\`\`bash
npm install
\`\`\`

### 2. Activar Auto-Commit y Validación
\`\`\`bash
npm run watch
\`\`\`
Esto activará:
- ✅ Validación automática de código
- ✅ Auto-fix de errores
- ✅ Commits automáticos al detectar cambios

### 3. Iniciar Desarrollo
\`\`\`bash
npm run dev
\`\`\`

### 4. Abrir Template
Abre \`packages/playground-app/template-qa.html\` en tu navegador

## 📋 Configuración del Proyecto

- **Perfil:** ${profile}
- **Repositorio:** ${repoUrl}
- **Sidebar Variant:** ${projectConfig.sidebarVariant}
- **Sección Inicial:** ${projectConfig.initialSection}

## 🔧 Scripts Disponibles

- \`npm run validate\` - Validar código
- \`npm run validate:fix\` - Validar y corregir automáticamente
- \`npm run watch\` - Activar auto-commit y validación
- \`npm run dev\` - Iniciar servidor de desarrollo

## 📦 Integración de Add-ons

Para integrar add-ons adicionales (Clarity, Onboarding, Feedback):
\`\`\`bash
npm run integrate:addons
\`\`\`

## 🚀 Despliegue

Para desplegar en Vercel o Render:
\`\`\`bash
npm run deploy
\`\`\`

## 📚 Documentación

- Validación: \`.ubits/AUTO-VALIDATION.md\`
- Componentes: \`.ubits/component-inventory.json\`
- Configuración: \`.ubits/project-config.json\`
`;
  
  fs.writeFileSync(path.join(projectDir, 'README.md'), readmeContent);
  log('✅ README creado', colors.green);
  
  // Resumen final
  log('\n═══════════════════════════════════════\n', colors.cyan);
  log('✅ Proyecto inicializado exitosamente!\n', colors.green);
  log('📂 Ubicación:', colors.cyan);
  log(`   ${projectDir}\n`, colors.reset);
  log('🚀 Próximos pasos:', colors.cyan);
  log(`   1. cd ${repoName}`, colors.yellow);
  log('   2. npm run watch (para auto-commit)', colors.yellow);
  log('   3. npm run dev (para desarrollo)', colors.yellow);
  log('   4. Abrir template-qa.html en el navegador\n', colors.yellow);
  
  rl.close();
}

main().catch(error => {
  log(`\n❌ Error: ${error.message}`, colors.red);
  process.exit(1);
});

