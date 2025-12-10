/**
 * Test script para verificar que el sistema de implementación por historias funciona correctamente
 */

import { createStoryBasedImplementationPlan, generateStoryBasedPlanSummary, completeChecklistItem, getStoryChecklist } from './storyBasedImplementation';
import { getComponentStories } from './storybookStories';

/**
 * Test: Verificar que el sistema filtra "default" y crea historias funcionales
 */
export async function testStoryBasedImplementation() {
  console.log('🧪 [Test] Iniciando prueba del sistema de implementación por historias...\n');

  try {
    // Test 1: Obtener historias del componente DataTable
    console.log('📋 Test 1: Obtener historias del componente DataTable');
    const componentStories = await getComponentStories('DataTable', 'data-data-table');
    console.log(`   ✅ Total de historias encontradas: ${componentStories.totalStories}`);
    console.log(`   ✅ Historias:`);
    componentStories.stories.forEach((story, index) => {
      console.log(`      ${index + 1}. ${story.name} (${story.id})`);
    });
    
    // Verificar que NO hay historia "default"
    const hasDefault = componentStories.stories.some(s => s.name === 'default');
    if (hasDefault) {
      console.error('   ❌ ERROR: Se encontró historia "default" - debería estar filtrada');
      return false;
    } else {
      console.log('   ✅ Correcto: No hay historia "default" (filtrada correctamente)');
    }
    
    // Verificar que hay historias funcionales
    if (componentStories.totalStories === 0) {
      console.error('   ❌ ERROR: No se encontraron historias funcionales');
      return false;
    } else {
      console.log(`   ✅ Correcto: Se encontraron ${componentStories.totalStories} historias funcionales`);
    }

    console.log('\n');

    // Test 2: Crear plan de implementación
    console.log('📋 Test 2: Crear plan de implementación basado en historias');
    const plan = await createStoryBasedImplementationPlan('DataTable', 'data-data-table');
    console.log(`   ✅ Plan creado con ${plan.totalSteps} historias`);
    console.log(`   ✅ Tiempo estimado: ${plan.estimatedTotalTime}`);
    
    // Verificar que cada historia tiene checklist
    const storiesWithoutChecklist = plan.storySteps.filter(step => !step.checklist);
    if (storiesWithoutChecklist.length > 0) {
      console.error(`   ❌ ERROR: ${storiesWithoutChecklist.length} historias sin checklist`);
      return false;
    } else {
      console.log('   ✅ Correcto: Todas las historias tienen checklist');
    }
    
    // Verificar que los checklists tienen items
    const storiesWithEmptyChecklist = plan.storySteps.filter(step => step.checklist.items.length === 0);
    if (storiesWithEmptyChecklist.length > 0) {
      console.error(`   ❌ ERROR: ${storiesWithEmptyChecklist.length} historias con checklist vacío`);
      return false;
    } else {
      console.log('   ✅ Correcto: Todos los checklists tienen items');
    }

    console.log('\n');

    // Test 3: Verificar estructura de checklists
    console.log('📋 Test 3: Verificar estructura de checklists');
    plan.storySteps.forEach((step, index) => {
      console.log(`   Historia ${index + 1}: ${step.story.name}`);
      console.log(`      - Items en checklist: ${step.checklist.items.length}`);
      console.log(`      - Items completados: ${step.checklist.items.filter(i => i.completed).length}`);
      console.log(`      - Checklist completo: ${step.checklist.allCompleted ? '✅' : '⏳'}`);
      
      // Verificar que tiene los items base
      const hasConsult = step.checklist.items.some(i => i.id === 'consult-storybook');
      const hasUnderstand = step.checklist.items.some(i => i.id === 'understand-functionality');
      const hasImplement = step.checklist.items.some(i => i.id === 'implement-functionality');
      const hasTest = step.checklist.items.some(i => i.id === 'test-functionality');
      
      if (!hasConsult || !hasUnderstand || !hasImplement || !hasTest) {
        console.error(`      ❌ ERROR: Faltan items base del checklist`);
        return false;
      } else {
        console.log(`      ✅ Items base presentes`);
      }
    });

    console.log('\n');

    // Test 4: Probar completar items del checklist
    console.log('📋 Test 4: Probar completar items del checklist');
    const firstStory = plan.storySteps[0];
    if (firstStory) {
      const initialCompleted = firstStory.checklist.items.filter(i => i.completed).length;
      console.log(`   Historia: ${firstStory.story.name}`);
      console.log(`   Items completados inicialmente: ${initialCompleted}/${firstStory.checklist.items.length}`);
      
      // Completar un item
      const updatedPlan = completeChecklistItem(plan, firstStory.story.id, 'consult-storybook');
      const updatedStory = updatedPlan.storySteps.find(s => s.story.id === firstStory.story.id);
      if (updatedStory) {
        const newCompleted = updatedStory.checklist.items.filter(i => i.completed).length;
        console.log(`   Items completados después: ${newCompleted}/${updatedStory.checklist.items.length}`);
        
        if (newCompleted > initialCompleted) {
          console.log('   ✅ Correcto: Item completado correctamente');
        } else {
          console.error('   ❌ ERROR: Item no se completó');
          return false;
        }
      }
    }

    console.log('\n');

    // Test 5: Generar resumen del plan
    console.log('📋 Test 5: Generar resumen del plan');
    const summary = generateStoryBasedPlanSummary(plan);
    if (summary && summary.length > 0) {
      console.log('   ✅ Resumen generado correctamente');
      console.log(`   Longitud del resumen: ${summary.length} caracteres`);
      
      // Verificar que el resumen incluye información importante
      if (summary.includes('NO usar la historia "default"')) {
        console.log('   ✅ Resumen incluye advertencia sobre "default"');
      } else {
        console.warn('   ⚠️ ADVERTENCIA: Resumen no incluye advertencia sobre "default"');
      }
      
      if (summary.includes('UNA historia a la vez')) {
        console.log('   ✅ Resumen incluye instrucción de implementar una a la vez');
      } else {
        console.warn('   ⚠️ ADVERTENCIA: Resumen no incluye instrucción de implementar una a la vez');
      }
    } else {
      console.error('   ❌ ERROR: No se generó resumen');
      return false;
    }

    console.log('\n');
    console.log('✅ [Test] Todas las pruebas pasaron correctamente');
    console.log('\n📊 Resumen del sistema:');
    console.log(`   - Historias funcionales: ${plan.totalSteps}`);
    console.log(`   - Historias con checklist: ${plan.storySteps.length}`);
    console.log(`   - Total de items en checklists: ${plan.storySteps.reduce((sum, step) => sum + step.checklist.items.length, 0)}`);
    console.log(`   - Sistema listo para usar: ✅`);
    
    return true;
  } catch (error) {
    console.error('❌ [Test] Error durante las pruebas:', error);
    return false;
  }
}

// Ejecutar test si se llama directamente
testStoryBasedImplementation()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ [Test] Error fatal:', error);
    process.exit(1);
  });

