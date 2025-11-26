#!/usr/bin/env node
/**
 * Script de verificación post-instalación
 * Verifica que todo esté correcto después de clonar e instalar dependencias
 */

import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const checks = {
	passed: [],
	failed: [],
	warnings: [],
};

function check(name, condition, message) {
	if (condition) {
		checks.passed.push({ name, message });
		console.log(`✅ ${name}: ${message}`);
	} else {
		checks.failed.push({ name, message });
		console.log(`❌ ${name}: ${message}`);
	}
}

function warn(name, message) {
	checks.warnings.push({ name, message });
	console.log(`⚠️  ${name}: ${message}`);
}

console.log('\n🔍 Verificando instalación de Autorun...\n');

// Verificar primero si el script init existe (verificación temprana)
const packageJsonPath = join(rootDir, 'package.json');
let hasInitScript = false;

if (existsSync(packageJsonPath)) {
	try {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
		hasInitScript = packageJson.scripts?.init !== undefined;
		
		if (!hasInitScript) {
			console.log('\n⚠️  ⚠️  ⚠️  ADVERTENCIA IMPORTANTE ⚠️  ⚠️  ⚠️\n');
			console.log('❌ El script "init" NO está presente en package.json\n');
			console.log('📋 Esto significa que:');
			console.log('   • El repositorio fue clonado ANTES de que se agregara el script');
			console.log('   • O estás en una rama diferente a "main"\n');
			console.log('🔧 SOLUCIÓN INMEDIATA:\n');
			console.log('   1. Verificar la rama actual:');
			console.log('      git branch --show-current\n');
			console.log('   2. Actualizar el repositorio:');
			console.log('      git pull origin main\n');
			console.log('   3. O clonar de nuevo (recomendado):');
			console.log('      cd ..');
			console.log('      rm -rf Autorun');
			console.log('      git clone -b main https://github.com/elkingarcia22/Autorun.git');
			console.log('      cd Autorun\n');
			console.log('   4. Después de actualizar, ejecuta:');
			console.log('      npm install');
			console.log('      npm run init\n');
			console.log('═══════════════════════════════════════════════════════\n');
			console.log('Continuando con otras verificaciones...\n');
		} else {
			// Verificar también que tsx esté instalado
			const hasTsx = packageJson.devDependencies?.tsx !== undefined;
			if (!hasTsx) {
				console.log('⚠️  Advertencia: tsx no está en devDependencies');
				console.log('   Se instalará automáticamente al ejecutar npm install\n');
			}
		}
	} catch (error) {
		console.warn('⚠️  No se pudo leer package.json:', error.message);
	}
}

// 1. Verificar estructura del proyecto
console.log('📁 Verificando estructura del proyecto...');
check(
	'Directorio raíz',
	existsSync(rootDir),
	'Directorio raíz existe',
);

check(
	'package.json raíz',
	existsSync(join(rootDir, 'package.json')),
	'package.json existe',
);

check(
	'packages/autorun-core',
	existsSync(join(rootDir, 'packages', 'autorun-core')),
	'Directorio autorun-core existe',
);

check(
	'packages/autorun-core/package.json',
	existsSync(join(rootDir, 'packages', 'autorun-core', 'package.json')),
	'package.json de autorun-core existe',
);

// 2. Verificar scripts
console.log('\n📜 Verificando scripts...');
const rootPackageJson = JSON.parse(
	readFileSync(join(rootDir, 'package.json'), 'utf-8'),
);

check(
	'Script init',
	rootPackageJson.scripts?.init !== undefined,
	'Script "init" está configurado',
);

check(
	'Script autorun:init',
	rootPackageJson.scripts?.['autorun:init'] !== undefined,
	'Script "autorun:init" está configurado',
);

// 3. Verificar compilación
console.log('\n🔨 Verificando compilación...');
const initScriptPath = join(
	rootDir,
	'packages',
	'autorun-core',
	'dist',
	'cli',
	'autorun-init.js',
);

if (existsSync(initScriptPath)) {
	check(
		'Script init compilado',
		true,
		'Script init está compilado y listo',
	);
} else {
	warn(
		'Script init no compilado',
		'El script se compilará automáticamente al ejecutar npm run init',
	);
}

// 4. Verificar dependencias
console.log('\n📦 Verificando dependencias...');
const corePackageJson = JSON.parse(
	readFileSync(join(rootDir, 'packages', 'autorun-core', 'package.json'), 'utf-8'),
);

check(
	'TypeScript instalado',
	corePackageJson.devDependencies?.typescript !== undefined,
	'TypeScript está en devDependencies',
);

// Verificar Vitest (opcional, no crítico para el funcionamiento básico)
const vitestPath = join(rootDir, 'node_modules', 'vitest');
if (corePackageJson.devDependencies?.vitest !== undefined) {
	if (existsSync(vitestPath)) {
		check(
			'Vitest instalado',
			true,
			'Vitest está instalado y disponible',
		);
	} else {
		warn(
			'Vitest en package.json pero no instalado',
			'Vitest está en devDependencies pero no está instalado. Ejecuta npm install para instalarlo.',
		);
	}
} else {
	warn(
		'Vitest no configurado',
		'Vitest no está en devDependencies (opcional para testing)',
	);
}

// 5. Verificar archivos clave del wizard
console.log('\n🧙 Verificando wizard de inicialización...');
const wizardFiles = [
	'packages/autorun-core/src/wizard/InitializationWizard.ts',
	'packages/autorun-core/src/wizard/UBITSPreset.ts',
	'packages/autorun-core/src/wizard/InteractivePrompt.ts',
	'packages/autorun-core/src/wizard/ModuleManager.ts',
	'packages/autorun-core/src/wizard/CanvasCreator.ts',
];

wizardFiles.forEach((file) => {
	const filePath = join(rootDir, file);
	const fileName = file.split('/').pop();
	check(
		`Archivo ${fileName}`,
		existsSync(filePath),
		`${fileName} existe`,
	);
});

// 6. Resumen
console.log('\n📊 Resumen de verificación:\n');
console.log(`✅ Verificaciones exitosas: ${checks.passed.length}`);
console.log(`❌ Verificaciones fallidas: ${checks.failed.length}`);
console.log(`⚠️  Advertencias: ${checks.warnings.length}\n`);

if (checks.failed.length > 0) {
	console.log('❌ Errores encontrados:');
	checks.failed.forEach(({ name, message }) => {
		console.log(`   - ${name}: ${message}`);
	});
	console.log('\n');
	process.exit(1);
}

if (checks.warnings.length > 0) {
	console.log('⚠️  Advertencias:');
	checks.warnings.forEach(({ name, message }) => {
		console.log(`   - ${name}: ${message}`);
	});
	console.log('\n');
}

console.log('✅ ¡Todo está listo! Puedes ejecutar:');
console.log('   npm run init\n');
process.exit(0);

