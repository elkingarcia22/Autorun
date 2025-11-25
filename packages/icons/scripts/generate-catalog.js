#!/usr/bin/env node

/**
 * Script para generar catálogo de iconos desde fontawesome-icons.css
 * Extrae todos los iconos definidos en el CSS y genera catalog.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../..');

// Leer el archivo CSS de FontAwesome
const cssPath = join(rootDir, '../template-ubits/fontawesome-icons.css');
const cssContent = readFileSync(cssPath, 'utf-8');

// Mapeo de sinónimos para búsqueda semántica
const synonyms = {
	user: ['profile', 'account', 'person', 'usuario'],
	trash: ['delete', 'remove', 'eliminate', 'eliminar', 'papelera'],
	plus: ['add', 'create', 'new', 'crear', 'añadir', 'nuevo'],
	check: ['ok', 'done', 'success', 'confirm', 'correcto', 'aceptar'],
	times: ['close', 'cancel', 'x', 'remove', 'cerrar', 'cancelar'],
	edit: ['modify', 'change', 'update', 'editar', 'modificar', 'actualizar'],
	save: ['store', 'keep', 'preserve', 'guardar', 'almacenar'],
	search: ['find', 'lookup', 'buscar', 'encontrar'],
	download: ['save', 'get', 'descargar', 'obtener'],
	upload: ['send', 'post', 'subir', 'enviar'],
	home: ['house', 'main', 'inicio', 'principal'],
	bell: ['notification', 'alert', 'notificacion', 'alerta'],
	settings: ['config', 'preferences', 'configuracion', 'preferencias'],
	menu: ['hamburger', 'bars', 'menú', 'navegacion'],
};

/**
 * Extrae keywords de un nombre de icono
 */
function extractKeywords(name) {
	const parts = name.split('-');
	const keywords = [...parts];

	// Agregar sinónimos comunes
	parts.forEach((part) => {
		if (synonyms[part]) {
			keywords.push(...synonyms[part]);
		}
	});

	return [...new Set(keywords)];
}

/**
 * Parsea el CSS y extrae todos los iconos
 */
function parseIconsFromCSS(css) {
	const iconRegex = /\.fa-([a-z0-9-]+)::before\s*\{/gi;
	const icons = {
		regular: [],
		solid: [],
	};

	let match;
	while ((match = iconRegex.exec(css)) !== null) {
		const className = `fa-${match[1]}`;
		const iconName = match[1];

		// Intentar determinar el estilo basado en el contexto
		// Por defecto, muchos iconos tienen versión regular y solid
		// Por ahora, los agregamos a ambos si no podemos determinar
		const keywords = extractKeywords(iconName);

		const iconData = {
			name: iconName,
			className: className,
			keywords: keywords,
			styles: ['regular', 'solid'], // Por defecto ambos estilos
		};

		// Agregar a ambos estilos (podemos refinar esto después)
		icons.regular.push(iconData);
		icons.solid.push(iconData);
	}

	// Eliminar duplicados
	const uniqueIcons = new Map();
	[...icons.regular, ...icons.solid].forEach((icon) => {
		if (!uniqueIcons.has(icon.name)) {
			uniqueIcons.set(icon.name, icon);
		}
	});

	return {
		regular: Array.from(uniqueIcons.values()),
		solid: Array.from(uniqueIcons.values()),
	};
}

/**
 * Genera índice de búsqueda invertido
 */
function generateSearchIndex(catalog) {
	const index = {};

	[...catalog.regular, ...catalog.solid].forEach((icon) => {
		icon.keywords.forEach((keyword) => {
			if (!index[keyword]) {
				index[keyword] = [];
			}
			if (!index[keyword].some((i) => i.name === icon.name)) {
				index[keyword].push({
					name: icon.name,
					className: icon.className,
					keywords: icon.keywords,
				});
			}
		});
	});

	return index;
}

// Generar catálogo
console.log('📦 Generando catálogo de iconos desde FontAwesome CSS...');
const catalog = parseIconsFromCSS(cssContent);

console.log(`✅ Encontrados ${catalog.regular.length} iconos únicos`);

// Generar índice de búsqueda
const searchIndex = generateSearchIndex(catalog);

// Guardar catálogo
const catalogPath = join(__dirname, '../src/catalog/icons.json');
const searchIndexPath = join(__dirname, '../src/catalog/search-index.json');

writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2));

console.log(`✅ Catálogo guardado en: ${catalogPath}`);
console.log(`✅ Índice de búsqueda guardado en: ${searchIndexPath}`);
console.log('✨ ¡Listo!');
