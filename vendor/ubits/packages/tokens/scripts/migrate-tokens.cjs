#!/usr/bin/env node

/**
 * Script de Migración de Tokens
 *
 * Migra tokens antiguos (--ubits-*) a tokens nuevos (--modifiers-normal-*)
 * según el mapeo definido en token-mapping.ts
 *
 * Uso:
 *   node packages/tokens/scripts/migrate-tokens.cjs [opciones]
 *
 * Opciones:
 *   --file <path>     Migrar un archivo específico
 *   --dir <path>      Migrar todos los archivos en un directorio
 *   --dry-run         Solo mostrar cambios sin aplicarlos
 *   --backup          Crear backup antes de migrar
 *   --verify          Verificar que los tokens nuevos existen
 */

const fs = require('fs');
const path = require('path');

// Cargar mapeo desde JSON
let TOKEN_MAPPING = [];
try {
	const mappingPath = path.resolve(__dirname, '../token-mapping.json');
	if (fs.existsSync(mappingPath)) {
		TOKEN_MAPPING = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
	} else {
		console.error('❌ token-mapping.json no encontrado.');
		console.error('   Ejecuta primero: node packages/tokens/scripts/generate-mapping-json.cjs');
		process.exit(1);
	}
} catch (error) {
	console.error('❌ Error al cargar token-mapping.json:', error.message);
	process.exit(1);
}

// Parsear argumentos
const args = process.argv.slice(2);
const options = {
	file: null,
	dir: null,
	dryRun: args.includes('--dry-run'),
	backup: args.includes('--backup'),
	verify: args.includes('--verify'),
};

// Extraer valores de opciones
const fileIndex = args.indexOf('--file');
if (fileIndex !== -1 && args[fileIndex + 1]) {
	options.file = args[fileIndex + 1];
}

const dirIndex = args.indexOf('--dir');
if (dirIndex !== -1 && args[dirIndex + 1]) {
	options.dir = args[dirIndex + 1];
}

// Crear objeto de mapeo simple
const mapping = {};
TOKEN_MAPPING.forEach((m) => {
	mapping[m.old] = m.new;
});

/**
 * Verifica si un token nuevo existe en el CSS generado
 */
function verifyTokenExists(tokenName) {
	if (!options.verify) return true;

	try {
		const figmaTokensPath = path.resolve(__dirname, '../../tokens/dist/figma-tokens.css');
		if (!fs.existsSync(figmaTokensPath)) {
			console.warn(`⚠️  No se encontró figma-tokens.css para verificar`);
			return true; // Asumir que existe si no podemos verificar
		}

		const css = fs.readFileSync(figmaTokensPath, 'utf8');
		const regex = new RegExp(`${tokenName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:`);
		return regex.test(css);
	} catch (error) {
		console.warn(`⚠️  Error al verificar token ${tokenName}:`, error.message);
		return true; // Asumir que existe si hay error
	}
}

/**
 * Migra tokens en un archivo
 */
function migrateFile(filePath) {
	const fullPath = path.resolve(filePath);

	if (!fs.existsSync(fullPath)) {
		console.error(`❌ Archivo no encontrado: ${fullPath}`);
		return { success: false, changes: 0 };
	}

	const content = fs.readFileSync(fullPath, 'utf8');
	let newContent = content;
	let changes = 0;
	const changesList = [];

	// Buscar y reemplazar cada token
	Object.entries(mapping).forEach(([oldToken, newToken]) => {
		// Buscar el token en diferentes contextos
		const patterns = [
			// En var(): var(--ubits-token)
			new RegExp(`var\\(${oldToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
			// Directo: --ubits-token
			new RegExp(`(${oldToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'),
		];

		patterns.forEach((pattern, index) => {
			const matches = content.match(pattern);
			if (matches) {
				if (index === 0) {
					// Reemplazar en var()
					newContent = newContent.replace(pattern, `var(${newToken})`);
				} else {
					// Reemplazar directo
					newContent = newContent.replace(pattern, newToken);
				}

				const count = matches.length;
				changes += count;
				changesList.push({
					old: oldToken,
					new: newToken,
					count: count,
				});
			}
		});
	});

	// Verificar tokens nuevos si está habilitado
	if (options.verify && changes > 0) {
		const uniqueNewTokens = [...new Set(changesList.map((c) => c.new))];
		const missingTokens = uniqueNewTokens.filter((token) => !verifyTokenExists(token));

		if (missingTokens.length > 0) {
			console.warn(`⚠️  Tokens nuevos no encontrados en figma-tokens.css:`);
			missingTokens.forEach((token) => console.warn(`     ${token}`));
		}
	}

	// Aplicar cambios
	if (changes > 0) {
		if (options.dryRun) {
			console.log(`\n📝 [DRY RUN] Archivo: ${fullPath}`);
			console.log(`   Cambios: ${changes} reemplazos`);
			changesList.forEach((change) => {
				console.log(`   - ${change.old} → ${change.new} (${change.count}x)`);
			});
		} else {
			// Crear backup si está habilitado
			if (options.backup) {
				const backupPath = `${fullPath}.backup.${Date.now()}`;
				fs.writeFileSync(backupPath, content, 'utf8');
				console.log(`💾 Backup creado: ${backupPath}`);
			}

			// Escribir archivo migrado
			fs.writeFileSync(fullPath, newContent, 'utf8');
			console.log(`✅ Migrado: ${fullPath} (${changes} cambios)`);
		}
	} else {
		console.log(`ℹ️  Sin cambios: ${fullPath}`);
	}

	return { success: true, changes, changesList };
}

/**
 * Migra todos los archivos en un directorio
 */
function migrateDirectory(dirPath) {
	const fullPath = path.resolve(dirPath);

	if (!fs.existsSync(fullPath)) {
		console.error(`❌ Directorio no encontrado: ${fullPath}`);
		return;
	}

	const extensions = ['.css', '.ts', '.tsx', '.js', '.jsx', '.html'];
	const files = [];

	function walkDir(currentPath) {
		const entries = fs.readdirSync(currentPath, { withFileTypes: true });

		entries.forEach((entry) => {
			const fullEntryPath = path.join(currentPath, entry.name);

			// Ignorar node_modules, dist, .git, etc.
			if (
				entry.name.startsWith('.') ||
				entry.name === 'node_modules' ||
				entry.name === 'dist' ||
				entry.name === 'build'
			) {
				return;
			}

			if (entry.isDirectory()) {
				walkDir(fullEntryPath);
			} else if (entry.isFile()) {
				const ext = path.extname(entry.name);
				if (extensions.includes(ext)) {
					files.push(fullEntryPath);
				}
			}
		});
	}

	walkDir(fullPath);

	console.log(`\n📁 Encontrados ${files.length} archivos en ${fullPath}\n`);

	let totalChanges = 0;
	let totalFiles = 0;

	files.forEach((file) => {
		const result = migrateFile(file);
		if (result.success && result.changes > 0) {
			totalChanges += result.changes;
			totalFiles++;
		}
	});

	console.log(`\n📊 Resumen:`);
	console.log(`   Archivos procesados: ${files.length}`);
	console.log(`   Archivos modificados: ${totalFiles}`);
	console.log(`   Total cambios: ${totalChanges}`);
}

/**
 * Función principal
 */
function main() {
	console.log('🚀 Script de Migración de Tokens UBITS\n');
	console.log(`📋 Mapeos disponibles: ${TOKEN_MAPPING.length}`);

	if (options.dryRun) {
		console.log('🔍 Modo DRY RUN (no se aplicarán cambios)\n');
	}

	if (options.file) {
		migrateFile(options.file);
	} else if (options.dir) {
		migrateDirectory(options.dir);
	} else {
		console.error('❌ Debes especificar --file <path> o --dir <path>');
		console.log('\nUso:');
		console.log('  node migrate-tokens.cjs --file <archivo>');
		console.log('  node migrate-tokens.cjs --dir <directorio>');
		console.log('  node migrate-tokens.cjs --file <archivo> --dry-run');
		console.log('  node migrate-tokens.cjs --dir <directorio> --backup --verify');
		process.exit(1);
	}
}

main();
