#!/usr/bin/env node

/**
 * Sistema de Integración de Add-ons
 * 
 * Integra add-ons adicionales: Clarity, Onboarding, Feedback
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
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
  log('\n🔌 Sistema de Integración de Add-ons UBITS\n', colors.cyan);
  log('═══════════════════════════════════════\n', colors.cyan);
  
  const configPath = path.join(process.cwd(), '.ubits', 'project-config.json');
  
  if (!fs.existsSync(configPath)) {
    log('❌ Configuración del proyecto no encontrada', colors.reset);
    log('   Ejecuta: npm run init primero', colors.yellow);
    process.exit(1);
  }
  
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  log('📦 Add-ons Disponibles:\n', colors.blue);
  log('1. 📊 Microsoft Clarity (Analytics)', colors.yellow);
  log('2. 🎓 Onboarding (Guía de usuario)', colors.yellow);
  log('3. 💬 Feedback Automation (Sistema de feedback)\n', colors.yellow);
  
  const clarityChoice = await question('¿Integrar Clarity? (s/N): ');
  const onboardingChoice = await question('¿Integrar Onboarding? (s/N): ');
  const feedbackChoice = await question('¿Integrar Feedback Automation? (s/N): ');
  
  const addonsToIntegrate = {
    clarity: clarityChoice.toLowerCase() === 's',
    onboarding: onboardingChoice.toLowerCase() === 's',
    feedback: feedbackChoice.toLowerCase() === 's'
  };
  
  log('\n🔧 Integrando add-ons...\n', colors.blue);
  
  // Actualizar configuración
  config.addons = { ...config.addons, ...addonsToIntegrate };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  
  // Crear archivos de integración
  const templatePath = path.join(process.cwd(), 'packages', 'playground-app', 'template-qa.html');
  
  if (fs.existsSync(templatePath)) {
    let template = fs.readFileSync(templatePath, 'utf8');
    const addonScripts = [];
    
    // Clarity
    if (addonsToIntegrate.clarity) {
      log('✅ Integrando Clarity...', colors.green);
      addonScripts.push(`
    <!-- Microsoft Clarity -->
    <script type="text/javascript">
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "YOUR_CLARITY_PROJECT_ID");
    </script>`);
    }
    
    // Onboarding
    if (addonsToIntegrate.onboarding) {
      log('✅ Integrando Onboarding...', colors.green);
      addonScripts.push(`
    <!-- Onboarding Add-on -->
    <script src="../../../addons/onboarding/dist/index.js"></script>
    <link rel="stylesheet" href="../../../addons/onboarding/dist/styles.css">`);
    }
    
    // Feedback
    if (addonsToIntegrate.feedback) {
      log('✅ Integrando Feedback Automation...', colors.green);
      addonScripts.push(`
    <!-- Feedback Automation Add-on -->
    <script src="../../../addons/feedback/dist/index.js"></script>
    <link rel="stylesheet" href="../../../addons/feedback/dist/styles.css">`);
    }
    
    // Insertar antes de </head>
    if (addonScripts.length > 0) {
      template = template.replace('</head>', addonScripts.join('\n') + '\n  </head>');
      fs.writeFileSync(templatePath, template);
      log('✅ Add-ons integrados en template', colors.green);
    }
  }
  
  log('\n✅ Integración completada!\n', colors.green);
  log('📝 Nota: Configura las credenciales en .ubits/project-config.json\n', colors.yellow);
  
  rl.close();
}

main().catch(error => {
  log(`\n❌ Error: ${error.message}`, colors.reset);
  process.exit(1);
});

