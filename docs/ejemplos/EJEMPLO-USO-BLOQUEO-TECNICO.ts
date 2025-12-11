/**
 * Ejemplo: Uso del Bloqueo Técnico de Implementación
 *
 * Este ejemplo muestra cómo usar el sistema de bloqueo técnico para garantizar
 * que se sigan los lineamientos antes de implementar componentes UBITS.
 */

import { ensureImplementationReady } from '@autorun/core/helpers/implementationHelpers';
import {
	PreWriteValidator,
	ImplementationBlockedError,
} from '@autorun/core/validation/PreWriteValidator';
import { ImplementationGuard } from '@autorun/core/validation/ImplementationGuard';
import { getAutorunHub } from '@autorun/core';

/**
 * Ejemplo 1: Verificar antes de implementar DataTable
 */
export async function ejemplo1_VerificarAntesDeImplementar() {
	const componentName = 'DataTable';

	try {
		// ⚠️ OBLIGATORIO: Verificar antes de implementar
		await ensureImplementationReady(componentName);
		console.log('✅ Checklist completo, procediendo con implementación');

		// Solo después de que esta función pase, puedes usar write() o search_replace()
		// await write('file.html', content);
	} catch (error) {
		if (error instanceof ImplementationBlockedError) {
			console.error('❌ IMPLEMENTACIÓN BLOQUEADA');
			console.error('Componente:', error.componentName);
			console.error('Pasos faltantes:', error.missingSteps);
			// Mostrar pasos faltantes al usuario
			// NO continuar hasta completar pasos
		} else {
			console.error('Error:', error);
		}
	}
}

/**
 * Ejemplo 2: Completar checklist automáticamente
 */
export async function ejemplo2_CompletarChecklist() {
	const componentName = 'DataTable';

	// Obtener Pre-Implementation Check add-on
	const hub = getAutorunHub();
	const preCheckAddon = hub?.getAddon('pre-implementation-check');

	if (!preCheckAddon) {
		console.error('❌ Pre-Implementation Check add-on no está disponible');
		return;
	}

	// 1. Consultar Storybook en Vercel
	// ... (navegar a Storybook, revisar Code/Controls, volver)
	await preCheckAddon.markStepCompleted(componentName, 'storybookVercel');
	console.log('✅ Paso 1 completado: Storybook en Vercel');

	// 2. Consultar Storybook MCP
	// ... (usar mcp_storybook_getComponentsProps(['DataTable']))
	await preCheckAddon.markStepCompleted(componentName, 'storybookMCP');
	console.log('✅ Paso 2 completado: Storybook MCP');

	// 3. Consultar documentación
	// ... (leer docs/referencia/componentes/data-data-table.md)
	await preCheckAddon.markStepCompleted(componentName, 'documentation');
	console.log('✅ Paso 3 completado: Documentación');

	// 4. Comparar versiones
	// ... (comparar Storybook vs código local)
	await preCheckAddon.markStepCompleted(componentName, 'comparison');
	console.log('✅ Paso 4 completado: Comparación');

	// Verificar nuevamente
	const check = await preCheckAddon.canImplement(componentName);
	if (check.allowed) {
		console.log('✅ Checklist completo, puede proceder con implementación');
	} else {
		console.error('❌ Aún faltan pasos:', check.missingSteps);
	}
}

/**
 * Ejemplo 3: Usar wrappers seguros
 */
export async function ejemplo3_WrappersSeguros() {
	const filePath = 'prototypes/canvas-administrador-encuestas.html';
	const content = `
    <script>
      window.createDataTable({
        containerId: 'table-container',
        columns: [...],
        rows: [...]
      });
    </script>
  `;

	try {
		// Usar safeWrite() en lugar de write() directo
		await ImplementationGuard.safeWrite(filePath, content, {
			componentName: 'DataTable',
			userMessage: 'Implementar DataTable con todas sus funcionalidades',
		});

		console.log('✅ Archivo escrito correctamente');
	} catch (error) {
		if (error instanceof ImplementationBlockedError) {
			console.error('❌ BLOQUEADO:', error.message);
			console.error('Pasos faltantes:', error.missingSteps);
			// NO continuar hasta completar pasos
		} else {
			console.error('Error:', error);
		}
	}
}

/**
 * Ejemplo 4: Verificar manualmente antes de escribir
 */
export async function ejemplo4_VerificarManualmente() {
	const filePath = 'prototypes/canvas-administrador-encuestas.html';
	const content = `
    <script>
      window.createDataTable({...});
    </script>
  `;

	// Verificar antes de escribir
	const validation = await PreWriteValidator.validateBeforeWrite(filePath, content, {
		componentName: 'DataTable',
		userMessage: 'Implementar DataTable',
	});

	if (!validation.valid) {
		console.error('❌ BLOQUEADO:');
		validation.errors.forEach((error) => console.error('  -', error));
		// NO continuar hasta completar pasos
		return;
	}

	// Solo entonces escribir
	console.log('✅ Verificación pasada, procediendo con write()');
	// await write(filePath, content);
}

/**
 * Ejemplo 5: Flujo completo de implementación
 */
export async function ejemplo5_FlujoCompleto() {
	const componentName = 'DataTable';
	const userMessage = 'Implementar DataTable con todas sus funcionalidades';

	// PASO 1: Verificar checklist obligatorio
	try {
		await ensureImplementationReady(componentName);
	} catch (error) {
		if (error instanceof ImplementationBlockedError) {
			console.error('❌ Checklist incompleto. Completando pasos...');

			// Completar pasos automáticamente
			const hub = getAutorunHub();
			const preCheckAddon = hub?.getAddon('pre-implementation-check');

			if (preCheckAddon) {
				// 1. Consultar Storybook en Vercel
				// ... (navegar, revisar, volver)
				await preCheckAddon.markStepCompleted(componentName, 'storybookVercel');

				// 2. Consultar Storybook MCP
				// ... (usar MCPs)
				await preCheckAddon.markStepCompleted(componentName, 'storybookMCP');

				// 3. Consultar documentación
				// ... (leer docs)
				await preCheckAddon.markStepCompleted(componentName, 'documentation');

				// 4. Comparar versiones
				await preCheckAddon.markStepCompleted(componentName, 'comparison');

				// Verificar nuevamente
				const check = await preCheckAddon.canImplement(componentName);
				if (!check.allowed) {
					throw new Error('❌ Aún faltan pasos después de completar checklist');
				}
			}
		} else {
			throw error;
		}
	}

	// PASO 2: Verificar antes de escribir
	const filePath = 'prototypes/canvas-administrador-encuestas.html';
	const content = `
    <script>
      window.createDataTable({
        containerId: 'table-container',
        columns: [...],
        rows: [...]
      });
    </script>
  `;

	const validation = await PreWriteValidator.validateBeforeWrite(filePath, content, {
		componentName,
		userMessage,
	});

	if (!validation.valid) {
		throw new Error('❌ BLOQUEADO: ' + validation.errors.join('\n'));
	}

	// PASO 3: Escribir código
	console.log('✅ Todas las verificaciones pasadas, procediendo con implementación');
	// await write(filePath, content);
}



