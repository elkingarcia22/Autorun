#!/usr/bin/env tsx

/**
 * Script para indexar prototypes existentes en knowledge base
 * Escanea prototypes/ y extrae componentes usados para aprendizaje futuro
 */

import * as fs from 'fs/promises';
import * as path from 'path';

interface Implementation {
    id: string;
    component: string;
    file: string;
    date: string;
    context: string;
    success: boolean;
    errors_found: number;
    code_snippet: string;
    props_used: string[];
    tags: string[];
}

interface Pattern {
    usage_count: number;
    success_rate: number;
    average_time: number;
    common_props: Record<string, number>;
    common_errors: Record<string, number>;
    best_practices: string[];
}

interface KnowledgeBase {
    implementations: Implementation[];
    patterns: Record<string, Pattern>;
    metadata: {
        total_implementations: number;
        unique_components: number;
        total_errors_found: number;
        total_errors_fixed: number;
        average_success_rate: number;
        total_time_saved: number;
        last_updated: string;
        version: string;
    };
}

const UBITS_COMPONENTS = [
    'Button', 'Input', 'DataTable', 'Modal', 'Dropdown',
    'Accordion', 'Tabs', 'Card', 'Alert', 'Badge',
    'Checkbox', 'Radio', 'Switch', 'Select', 'Textarea',
    'Pagination', 'Breadcrumb', 'Tag', 'Tooltip', 'Progress',
    'Skeleton', 'Spinner', 'Avatar', 'Divider', 'EmptyState',
    // ... agregar más según catálogo
];

async function loadKnowledgeBase(): Promise<KnowledgeBase> {
    try {
        const content = await fs.readFile('.autorun/knowledge-base.json', 'utf-8');
        return JSON.parse(content);
    } catch {
        // Si no existe, retornar estructura vacía
        return {
            implementations: [],
            patterns: {},
            metadata: {
                total_implementations: 0,
                unique_components: 0,
                total_errors_found: 0,
                total_errors_fixed: 0,
                average_success_rate: 0,
                total_time_saved: 0,
                last_updated: new Date().toISOString(),
                version: '1.0.0'
            }
        };
    }
}

async function saveKnowledgeBase(kb: KnowledgeBase): Promise<void> {
    await fs.mkdir('.autorun', { recursive: true });
    await fs.writeFile(
        '.autorun/knowledge-base.json',
        JSON.stringify(kb, null, 2),
        'utf-8'
    );
}

async function scanPrototypes(): Promise<string[]> {
    try {
        const files = await fs.readdir('prototypes');
        return files.filter(f => f.startsWith('canvas-') && f.endsWith('.html'));
    } catch {
        return [];
    }
}

function extractComponentsFromHTML(html: string): string[] {
    const components: Set<string> = new Set();

    // Buscar clases de componentes UBITS
    for (const component of UBITS_COMPONENTS) {
        const className = `ubits-${component.toLowerCase()}`;
        if (html.includes(className)) {
            components.add(component);
        }
    }

    return Array.from(components);
}

function extractContextFromFilename(filename: string): string {
    // canvas-administrador-encuestas-2026-01-29.html
    // → "Administrador de encuestas"
    const parts = filename
        .replace('canvas-', '')
        .replace('.html', '')
        .split('-')
        .filter(p => !p.match(/^\d{4}-\d{2}-\d{2}$/)); // Remover fecha

    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' de ');
}

function extractDateFromFilename(filename: string): string {
    const match = filename.match(/(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : new Date().toISOString().split('T')[0];
}

function extractTagsFromContext(context: string): string[] {
    return context.toLowerCase().split(' de ').filter(t => t.length > 0);
}

async function indexPrototype(
    filename: string,
    kb: KnowledgeBase
): Promise<void> {
    const filePath = path.join('prototypes', filename);

    // Verificar si ya está indexado
    if (kb.implementations.some(impl => impl.file === filePath)) {
        console.log(`  ⏭️  ${filename} - ya indexado`);
        return;
    }

    try {
        const html = await fs.readFile(filePath, 'utf-8');
        const components = extractComponentsFromHTML(html);

        if (components.length === 0) {
            console.log(`  ⚠️  ${filename} - no se encontraron componentes UBITS`);
            return;
        }

        const context = extractContextFromFilename(filename);
        const date = extractDateFromFilename(filename);
        const tags = extractTagsFromContext(context);

        // Crear implementación por cada componente encontrado
        for (const component of components) {
            const implId = `impl_${Date.now()}_${component}`;

            const implementation: Implementation = {
                id: implId,
                component,
                file: filePath,
                date,
                context,
                success: true,  // Asumir éxito si el archivo existe
                errors_found: 0,  // Sin información histórica
                code_snippet: '',  // Extraer snippet si es necesario
                props_used: [],  // Requiere análisis más profundo
                tags
            };

            kb.implementations.push(implementation);

            // Actualizar patrón
            if (!kb.patterns[component]) {
                kb.patterns[component] = {
                    usage_count: 0,
                    success_rate: 1.0,
                    average_time: 3.0,  // Default
                    common_props: {},
                    common_errors: {},
                    best_practices: []
                };
            }
            kb.patterns[component].usage_count++;
        }

        console.log(`  ✅ ${filename} - ${components.length} componente(s) indexado(s): ${components.join(', ')}`);

    } catch (error) {
        console.error(`  ❌ ${filename} - error: ${error}`);
    }
}

async function updateMetadata(kb: KnowledgeBase): Promise<void> {
    kb.metadata.total_implementations = kb.implementations.length;
    kb.metadata.unique_components = Object.keys(kb.patterns).length;
    kb.metadata.last_updated = new Date().toISOString();

    // Calcular success rate promedio
    const successRates = Object.values(kb.patterns).map(p => p.success_rate);
    kb.metadata.average_success_rate = successRates.length > 0
        ? successRates.reduce((a, b) => a + b, 0) / successRates.length
        : 0;
}

async function main() {
    console.log('🧠 Autorun Learn - Indexador de Prototypes\n');

    // 1. Cargar knowledge base actual
    console.log('📖 Cargando knowledge base...');
    const kb = await loadKnowledgeBase();
    console.log(`   ${kb.implementations.length} implementaciones existentes\n`);

    // 2. Escanear prototypes
    console.log('🔍 Escaneando prototypes/...');
    const files = await scanPrototypes();
    console.log(`   ${files.length} archivo(s) encontrado(s)\n`);

    if (files.length === 0) {
        console.log('⚠️  No hay prototypes para indexar');
        return;
    }

    // 3. Indexar cada archivo
    console.log('📝 Indexando componentes...\n');
    for (const file of files) {
        await indexPrototype(file, kb);
    }

    // 4. Actualizar metadata
    console.log('\n📊 Actualizando metadata...');
    await updateMetadata(kb);

    // 5. Guardar knowledge base
    console.log('💾 Guardando knowledge base...');
    await saveKnowledgeBase(kb);

    // 6. Mostrar resumen
    console.log('\n✅ Indexación completada!\n');
    console.log('📊 Resumen:');
    console.log(`   • Total implementaciones: ${kb.metadata.total_implementations}`);
    console.log(`   • Componentes únicos: ${kb.metadata.unique_components}`);
    console.log(`   • Última actualización: ${kb.metadata.last_updated}\n`);

    console.log('🔝 Top 5 componentes más usados:');
    const sortedPatterns = Object.entries(kb.patterns)
        .sort(([, a], [, b]) => b.usage_count - a.usage_count)
        .slice(0, 5);

    sortedPatterns.forEach(([component, pattern], i) => {
        console.log(`   ${i + 1}. ${component} - ${pattern.usage_count} uso(s)`);
    });

    console.log('\n💡 Siguiente paso: Usa el skill autorun-learn en tus implementaciones!');
}

main().catch(console.error);
