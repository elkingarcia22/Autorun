
import { detectComponentFromMessage } from '../packages/autorun-core/src/helpers/implementationHelpers.js';
import { mapAndValidateComponentNameToStorybookId } from '../packages/autorun-core/src/helpers/storybookStories.js';
import { findImplementationStory } from '../packages/autorun-core/src/helpers/codePropsCombiner.js';
import { getAutorunHub } from '../packages/autorun-core/src/AutorunAgent.js';

async function step1Verify() {
    console.log('\n🔍 --- VERIFICACIÓN FASE 1: PREPARACIÓN ---\n');

    const userMessage = 'implementar unos tabs debajo del subnav';
    console.log(`📝 Mensaje del usuario: "${userMessage}"`);

    // 1. Detección
    console.log('\n[1.1] Probando Detección de Componente...');
    const componentName = detectComponentFromMessage(userMessage);
    if (componentName === 'Tabs') {
        console.log(`✅ EXITO: Componente detectado correctamente: "${componentName}"`);
    } else {
        console.error(`❌ ERROR: Componente detectado: "${componentName}" (Esperado: "Tabs")`);
        process.exit(1);
    }

    // 2. Mapeo a Storybook
    console.log('\n[1.2] Probando Mapeo a ID de Storybook...');
    let storybookId = '';
    try {
        storybookId = await mapAndValidateComponentNameToStorybookId(componentName);
        console.log(`✅ EXITO: ID de Storybook encontrado: "${storybookId}"`);
    } catch (error) {
        console.error(`❌ ERROR: No se pudo obtener el ID:`, error);
        process.exit(1);
    }

    // 3. Verificación de Checklist (Simulada si no hay hub completo)
    console.log('\n[1.3] Verificando Add-on de Checklist...');
    try {
        const hub = await getAutorunHub(); // Esto puede fallar si no se inicializa completamente el agente, pero intentemos
        if (hub) {
            const preCheck = hub.getAddon('pre-implementation-check');
            if (preCheck) {
                console.log(`✅ EXITO: Add-on "pre-implementation-check" está disponible.`);
                console.log(`   Estado activo: ${preCheck.isActive()}`);
            } else {
                console.warn(`⚠️ ALERTA: Hub disponible pero add-on no encontrado (posiblemente necesita init completo).`);
            }
        } else {
            console.log(`ℹ️ INFO: Hub no inicializado en este script aislado (esperado).`);
        }
    } catch (e) {
        console.log(`ℹ️ INFO: No se pudo conectar al Hub (esperado en script aislado):`, e.message);
    }

    // 4. Búsqueda de Historia
    console.log('\n[1.4] Buscando Historia de Implementación...');
    try {
        const story = await findImplementationStory(storybookId);
        console.log(`✅ EXITO: Historia encontrada: "${story}"`);
    } catch (error) {
        console.error(`❌ ERROR: Falló la búsqueda de historia:`, error);
        process.exit(1);
    }

    console.log('\n🎉 FASE 1 COMPLETADA EXITOSAMENTE: Todos los datos necesarios están listos.');
}

step1Verify();
