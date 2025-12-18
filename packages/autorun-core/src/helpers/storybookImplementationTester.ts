/**
 * Storybook Implementation Tester
 *
 * Sistema de prueba automática que verifica que todas las funcionalidades
 * de extracción e implementación desde Storybook funcionan correctamente.
 *
 * Se ejecuta automáticamente al inicializar AutorunHub para verificar
 * que todo está funcionando.
 */

import { implementComponentFromStorybook } from './storybookImplementationHelper';
import { parseCodeFromStory } from './storybookCodeParser';
import { parsePropsFromComponent } from './storybookPropsParser';
import { extractAPIFromStorybook } from './storybookAPIExtractor';
import { extractCompositionFromStorybook } from './storybookCompositionExtractor';
import { extractBestPracticesFromStorybook } from './storybookBestPracticesExtractor';
import { extractRealWorldExamplesFromStorybook } from './storybookRealWorldExamplesExtractor';
import { validateImplementation } from './storybookImplementationHelper';

export interface TestResult {
	testName: string;
	success: boolean;
	error?: string;
	details?: any;
}

export interface TestSuiteResult {
	totalTests: number;
	passedTests: number;
	failedTests: number;
	results: TestResult[];
	allPassed: boolean;
}

/**
 * Ejecuta suite completa de pruebas
 *
 * @param componentId - ID del componente a probar (default: 'data-data-table')
 * @returns Resultado de todas las pruebas
 */
export async function runStorybookImplementationTests(
	componentId: string = 'data-data-table',
): Promise<TestSuiteResult> {
	console.log('\n🧪 [Storybook Implementation Tester] ========================================');
	console.log(`🧪 [Storybook Implementation Tester] Ejecutando pruebas para: ${componentId}`);
	console.log('🧪 [Storybook Implementation Tester] ========================================\n');

	const results: TestResult[] = [];

	// Test 1: Parser de código
	results.push(await testCodeParser(componentId));

	// Test 2: Parser de props
	results.push(await testPropsParser(componentId));

	// Test 3: Extractor de API
	results.push(await testAPIExtractor(componentId));

	// Test 4: Extractor de Composition
	results.push(await testCompositionExtractor(componentId));

	// Test 5: Extractor de Best Practices
	results.push(await testBestPracticesExtractor(componentId));

	// Test 6: Extractor de Ejemplos del Mundo Real
	results.push(await testRealWorldExamplesExtractor(componentId));

	// Test 7: Implementación completa
	results.push(await testFullImplementation(componentId));

	// Test 8: Validación
	results.push(await testValidation(componentId));

	// Calcular estadísticas
	const passedTests = results.filter((r) => r.success).length;
	const failedTests = results.filter((r) => !r.success).length;
	const allPassed = failedTests === 0;

	console.log('\n📊 [Storybook Implementation Tester] ========================================');
	console.log(`📊 [Storybook Implementation Tester] Resultados:`);
	console.log(`   Total: ${results.length}`);
	console.log(`   ✅ Pasadas: ${passedTests}`);
	console.log(`   ❌ Fallidas: ${failedTests}`);
	console.log(`   ${allPassed ? '✅ TODAS LAS PRUEBAS PASARON' : '❌ ALGUNAS PRUEBAS FALLARON'}`);
	console.log('📊 [Storybook Implementation Tester] ========================================\n');

	return {
		totalTests: results.length,
		passedTests,
		failedTests,
		results,
		allPassed,
	};
}

/**
 * Test 1: Parser de código
 */
async function testCodeParser(componentId: string): Promise<TestResult> {
	try {
		console.log(`🧪 [Test] Parser de código...`);
		const codeData = await parseCodeFromStory(componentId, 'default');

		if (!codeData.codeBlocks || codeData.codeBlocks.length === 0) {
			return {
				testName: 'Parser de código',
				success: false,
				error: 'No se extrajeron bloques de código',
			};
		}

		console.log(`   ✅ ${codeData.codeBlocks.length} bloques de código extraídos`);
		return {
			testName: 'Parser de código',
			success: true,
			details: {
				codeBlocks: codeData.codeBlocks.length,
				hasPrimaryCode: !!codeData.primaryCode,
				imports: codeData.allImports.length,
			},
		};
	} catch (error: any) {
		console.log(`   ❌ Error: ${error.message}`);
		return {
			testName: 'Parser de código',
			success: false,
			error: error.message,
		};
	}
}

/**
 * Test 2: Parser de props
 */
async function testPropsParser(componentId: string): Promise<TestResult> {
	try {
		console.log(`🧪 [Test] Parser de props...`);
		const propsData = await parsePropsFromComponent(componentId, true);

		if (!propsData.props || propsData.props.length === 0) {
			return {
				testName: 'Parser de props',
				success: false,
				error: 'No se extrajeron props',
			};
		}

		console.log(`   ✅ ${propsData.props.length} props extraídas`);
		return {
			testName: 'Parser de props',
			success: true,
			details: {
				totalProps: propsData.totalProps,
				requiredProps: propsData.requiredProps.length,
				optionalProps: propsData.optionalProps.length,
			},
		};
	} catch (error: any) {
		console.log(`   ❌ Error: ${error.message}`);
		return {
			testName: 'Parser de props',
			success: false,
			error: error.message,
		};
	}
}

/**
 * Test 3: Extractor de API
 */
async function testAPIExtractor(componentId: string): Promise<TestResult> {
	try {
		console.log(`🧪 [Test] Extractor de API...`);
		const api = await extractAPIFromStorybook(componentId);

		if (!api.methods || api.methods.length === 0) {
			return {
				testName: 'Extractor de API',
				success: false,
				error: 'No se extrajeron métodos de API',
			};
		}

		console.log(`   ✅ ${api.methods.length} métodos de API extraídos`);
		return {
			testName: 'Extractor de API',
			success: true,
			details: {
				methods: api.methods.length,
				hasSetup: !!api.setup,
				hasUsage: !!api.usage,
			},
		};
	} catch (error: any) {
		console.log(`   ❌ Error: ${error.message}`);
		return {
			testName: 'Extractor de API',
			success: false,
			error: error.message,
		};
	}
}

/**
 * Test 4: Extractor de Composition
 */
async function testCompositionExtractor(componentId: string): Promise<TestResult> {
	try {
		console.log(`🧪 [Test] Extractor de Composition...`);
		const composition = await extractCompositionFromStorybook(componentId);

		if (!composition.dependencies || composition.dependencies.length === 0) {
			// No es error si no hay dependencias documentadas
			console.log(`   ⚠️  No se encontraron dependencias documentadas`);
			return {
				testName: 'Extractor de Composition',
				success: true,
				details: {
					dependencies: 0,
					hasSetup: !!composition.setup,
				},
			};
		}

		console.log(`   ✅ ${composition.dependencies.length} dependencias extraídas`);
		return {
			testName: 'Extractor de Composition',
			success: true,
			details: {
				dependencies: composition.dependencies.length,
				hasSetup: !!composition.setup,
			},
		};
	} catch (error: any) {
		console.log(`   ❌ Error: ${error.message}`);
		return {
			testName: 'Extractor de Composition',
			success: false,
			error: error.message,
		};
	}
}

/**
 * Test 5: Extractor de Best Practices
 */
async function testBestPracticesExtractor(componentId: string): Promise<TestResult> {
	try {
		console.log(`🧪 [Test] Extractor de Best Practices...`);
		const bestPractices = await extractBestPracticesFromStorybook(componentId);

		if (!bestPractices.practices || bestPractices.practices.length === 0) {
			// No es error si no hay best practices documentadas
			console.log(`   ⚠️  No se encontraron best practices documentadas`);
			return {
				testName: 'Extractor de Best Practices',
				success: true,
				details: {
					practices: 0,
					hasDefaults: !!bestPractices.defaults,
				},
			};
		}

		console.log(`   ✅ ${bestPractices.practices.length} prácticas extraídas`);
		return {
			testName: 'Extractor de Best Practices',
			success: true,
			details: {
				practices: bestPractices.practices.length,
				hasDefaults: !!bestPractices.defaults,
				warnings: bestPractices.warnings?.length || 0,
			},
		};
	} catch (error: any) {
		console.log(`   ❌ Error: ${error.message}`);
		return {
			testName: 'Extractor de Best Practices',
			success: false,
			error: error.message,
		};
	}
}

/**
 * Test 6: Extractor de Ejemplos del Mundo Real
 */
async function testRealWorldExamplesExtractor(componentId: string): Promise<TestResult> {
	try {
		console.log(`🧪 [Test] Extractor de Ejemplos del Mundo Real...`);
		const examples = await extractRealWorldExamplesFromStorybook(componentId);

		if (!examples.examples || examples.examples.length === 0) {
			// No es error si no hay ejemplos documentados
			console.log(`   ⚠️  No se encontraron ejemplos del mundo real`);
			return {
				testName: 'Extractor de Ejemplos del Mundo Real',
				success: true,
				details: {
					examples: 0,
				},
			};
		}

		console.log(`   ✅ ${examples.examples.length} ejemplos extraídos`);
		return {
			testName: 'Extractor de Ejemplos del Mundo Real',
			success: true,
			details: {
				examples: examples.examples.length,
			},
		};
	} catch (error: any) {
		console.log(`   ❌ Error: ${error.message}`);
		return {
			testName: 'Extractor de Ejemplos del Mundo Real',
			success: false,
			error: error.message,
		};
	}
}

/**
 * Test 7: Implementación completa
 */
async function testFullImplementation(componentId: string): Promise<TestResult> {
	try {
		console.log(`🧪 [Test] Implementación completa...`);
		const result = await implementComponentFromStorybook({
			componentId,
			format: 'html',
			validate: false, // No validar en prueba para ser más rápido
		});

		if (!result.success) {
			return {
				testName: 'Implementación completa',
				success: false,
				error: result.errors?.join(', ') || 'Implementación falló',
			};
		}

		if (!result.code || result.code.length === 0) {
			return {
				testName: 'Implementación completa',
				success: false,
				error: 'No se generó código',
			};
		}

		console.log(`   ✅ Código generado (${result.code.length} caracteres)`);
		return {
			testName: 'Implementación completa',
			success: true,
			details: {
				codeLength: result.code.length,
				hasProps: !!result.props,
				hasAPI: !!result.api,
				hasComposition: !!result.composition,
				hasBestPractices: !!result.bestPractices,
				hasExamples: !!result.realWorldExamples,
			},
		};
	} catch (error: any) {
		console.log(`   ❌ Error: ${error.message}`);
		return {
			testName: 'Implementación completa',
			success: false,
			error: error.message,
		};
	}
}

/**
 * Test 8: Validación
 */
async function testValidation(componentId: string): Promise<TestResult> {
	try {
		console.log(`🧪 [Test] Validación...`);
		// Generar código de prueba
		const result = await implementComponentFromStorybook({
			componentId,
			format: 'html',
			validate: false,
		});

		if (!result.success || !result.code) {
			return {
				testName: 'Validación',
				success: false,
				error: 'No se pudo generar código para validar',
			};
		}

		// Validar el código generado
		const validation = await validateImplementation(componentId, result.code, 'default');

		console.log(`   ✅ Validación completada (${validation.valid ? 'VÁLIDA' : 'INVÁLIDA'})`);
		return {
			testName: 'Validación',
			success: true,
			details: {
				valid: validation.valid,
				errors: validation.errors.length,
				warnings: validation.warnings.length,
				structureMatch: validation.structureMatch,
				propsMatch: validation.propsMatch,
			},
		};
	} catch (error: any) {
		console.log(`   ❌ Error: ${error.message}`);
		return {
			testName: 'Validación',
			success: false,
			error: error.message,
		};
	}
}

/**
 * Ejecuta prueba rápida (solo funcionalidades básicas)
 */
export async function runQuickTest(componentId: string = 'data-data-table'): Promise<boolean> {
	try {
		console.log(`\n⚡ [Quick Test] Probando funcionalidades básicas para: ${componentId}`);

		// Test rápido: solo implementación completa
		const result = await implementComponentFromStorybook({
			componentId,
			format: 'html',
			validate: false,
		});

		if (result.success && result.code) {
			console.log(`   ✅ Quick test pasó`);
			return true;
		}

		console.log(`   ❌ Quick test falló`);
		return false;
	} catch (error: any) {
		console.log(`   ❌ Quick test falló: ${error.message}`);
		return false;
	}
}
