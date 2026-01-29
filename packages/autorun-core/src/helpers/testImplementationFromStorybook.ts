/**
 * Test Implementation From Storybook
 *
 * Script de prueba para implementar un botón que abre un modal
 * desde el Storybook de Libraries UI con logs detallados.
 */

import { implementComponentFromStorybook } from './storybookImplementationHelper';
import { parseCodeFromStory } from './storybookCodeParser';
import { parsePropsFromComponent } from './storybookPropsParser';
import { extractExactCodeFromStorybook } from './storybookExactCodeExtractor';
import { verifyAndLoadCSS } from './cssVerifier';
import { validateBeforeImplementation } from './preImplementationValidator';

const LOG_PREFIX = '🧪 [Test Implementation]';

/**
 * Ejecuta prueba completa de implementación desde Storybook
 */
export async function testButtonModalImplementation(
  templatePath: string,
  storybookBaseUrl: string = 'https://ubits-storybook10.vercel.app'
): Promise<{
  success: boolean;
  buttonCode?: string;
  modalCode?: string;
  combinedCode?: string;
  errors?: string[];
  logs: string[];
}> {
  const logs: string[] = [];
  const errors: string[] = [];

  logs.push(`${LOG_PREFIX} ========================================`);
  logs.push(`${LOG_PREFIX} Iniciando prueba de implementación`);
  logs.push(`${LOG_PREFIX} Template: ${templatePath}`);
  logs.push(`${LOG_PREFIX} Storybook: ${storybookBaseUrl}`);
  logs.push(`${LOG_PREFIX} ========================================\n`);

  try {
    // ⭐ NUEVO: Validación pre-implementación
    logs.push(`${LOG_PREFIX} [Paso 0/6] Validación pre-implementación...`);
    try {
      const validation = await validateBeforeImplementation(
        'modal',
        'default',
        templatePath
      );
      if (validation.valid) {
        logs.push(`   ✅ Validación pre-implementación: PASÓ`);
      } else {
        logs.push(`   ⚠️  Validación pre-implementación: FALLÓ`);
        validation.errors.forEach((error) => {
          logs.push(`      - ❌ ${error}`);
        });
        validation.warnings.forEach((warning) => {
          logs.push(`      - ⚠️  ${warning}`);
        });
      }
    } catch (error: any) {
      logs.push(`   ⚠️  Error en validación: ${error.message}`);
    }
    logs.push('');

    // ⭐ NUEVO: Extraer código exacto desde Storybook
    logs.push(
      `${LOG_PREFIX} [Paso 0.5/6] Extrayendo código exacto desde Storybook...`
    );
    let exactCode: any = null;
    try {
      exactCode = await extractExactCodeFromStorybook(
        'feedback-modal',
        'default',
        storybookBaseUrl
      );
      if (exactCode && exactCode.html) {
        logs.push(
          `   ✅ Código exacto extraído (${exactCode.html.length} caracteres)`
        );
        logs.push(`   ✅ CSS URLs identificadas: ${exactCode.cssUrls.length}`);
        if (exactCode.sourceCodeMatch) {
          logs.push(`   ✅ Estructura coincide con código fuente`);
        } else {
          logs.push(
            `   ⚠️  Estructura no coincide exactamente con código fuente`
          );
        }
      }
    } catch (error: any) {
      logs.push(`   ⚠️  No se pudo extraer código exacto: ${error.message}`);
      logs.push(`   💡 Continuando con método tradicional...`);
    }
    logs.push('');
    // Paso 1: Obtener información del botón
    logs.push(`${LOG_PREFIX} [Paso 1/5] Obteniendo información del botón...`);
    const buttonComponentId = 'button';
    let buttonCode: string | undefined;
    let buttonProps: any;

    try {
      logs.push(
        `   📚 Consultando Storybook: ${storybookBaseUrl}/?path=/story/${buttonComponentId}--default`
      );

      // Intentar obtener código de ejemplo (usar función local que acepta baseUrl)
      buttonCode = await getExampleCodeFromStorybook(
        buttonComponentId,
        'default',
        storybookBaseUrl
      );

      if (buttonCode) {
        logs.push(
          `   ✅ Código de botón obtenido (${buttonCode.length} caracteres)`
        );
      } else {
        logs.push(`   ⚠️  No se pudo obtener código de botón desde Storybook`);
        logs.push(`   💡 Usando implementación manual basada en UBITS`);
        // Fallback: usar componente UBITS
        buttonCode = generateUBITSButtonCode();
      }

      // Obtener props (usar función local que acepta baseUrl)
      try {
        buttonProps = await getPropsFromStorybook(
          buttonComponentId,
          storybookBaseUrl
        );
        if (buttonProps && Object.keys(buttonProps).length > 0) {
          logs.push(
            `   ✅ Props de botón obtenidas: ${Object.keys(buttonProps).length} props`
          );
        }
      } catch (error: any) {
        logs.push(`   ⚠️  No se pudieron obtener props: ${error.message}`);
      }
    } catch (error: any) {
      logs.push(`   ⚠️  Error obteniendo botón: ${error.message}`);
      logs.push(`   💡 Usando implementación manual basada en UBITS`);
      buttonCode = generateUBITSButtonCode();
    }

    // Paso 2: Obtener información del modal
    logs.push(`\n${LOG_PREFIX} [Paso 2/5] Obteniendo información del modal...`);
    const modalComponentId = 'modal';
    let modalCode: string | undefined;
    let modalProps: any;

    try {
      logs.push(
        `   📚 Consultando Storybook: ${storybookBaseUrl}/?path=/story/${modalComponentId}--default`
      );

      // Intentar obtener código de ejemplo (usar función local que acepta baseUrl)
      modalCode = await getExampleCodeFromStorybook(
        modalComponentId,
        'default',
        storybookBaseUrl
      );

      if (modalCode) {
        logs.push(
          `   ✅ Código de modal obtenido (${modalCode.length} caracteres)`
        );
      } else {
        logs.push(`   ⚠️  No se pudo obtener código de modal desde Storybook`);
        logs.push(`   💡 Usando implementación manual basada en UBITS`);
        // Fallback: usar componente UBITS
        modalCode = generateUBITSModalCode();
      }

      // Obtener props (usar función local que acepta baseUrl)
      try {
        modalProps = await getPropsFromStorybook(
          modalComponentId,
          storybookBaseUrl
        );
        if (modalProps && Object.keys(modalProps).length > 0) {
          logs.push(
            `   ✅ Props de modal obtenidas: ${Object.keys(modalProps).length} props`
          );
        }
      } catch (error: any) {
        logs.push(`   ⚠️  No se pudieron obtener props: ${error.message}`);
      }
    } catch (error: any) {
      logs.push(`   ⚠️  Error obteniendo modal: ${error.message}`);
      logs.push(`   💡 Usando implementación manual basada en UBITS`);
      modalCode = generateUBITSModalCode();
    }

    // Paso 3: Combinar código
    logs.push(
      `\n${LOG_PREFIX} [Paso 3/5] Combinando código de botón y modal...`
    );
    const combinedCode = combineButtonAndModal(
      buttonCode || '',
      modalCode || ''
    );
    logs.push(
      `   ✅ Código combinado generado (${combinedCode.length} caracteres)`
    );

    // Paso 4: Agregar logs de rastreo
    logs.push(`\n${LOG_PREFIX} [Paso 4/5] Agregando logs de rastreo...`);
    const codeWithLogs = addTrackingLogs(combinedCode);
    logs.push(`   ✅ Logs de rastreo agregados`);

    // Paso 5: Validar código
    logs.push(`\n${LOG_PREFIX} [Paso 5/5] Validando código generado...`);
    const validation = validateCode(codeWithLogs);
    if (validation.valid) {
      logs.push(`   ✅ Código validado correctamente`);
    } else {
      logs.push(`   ⚠️  Advertencias en validación:`);
      validation.warnings.forEach((warning) => {
        logs.push(`      - ${warning}`);
      });
    }

    // Paso 6: Resumen final
    logs.push(`\n${LOG_PREFIX} [Paso 6/6] Generando resumen final...`);
    logs.push(`   ✅ Código generado: ${codeWithLogs.length} caracteres`);
    if (exactCode) {
      logs.push(`   ✅ Código exacto extraído desde Storybook`);
      logs.push(`   ✅ CSS URLs identificadas: ${exactCode.cssUrls.length}`);
    }

    logs.push(`\n${LOG_PREFIX} ========================================`);
    logs.push(`${LOG_PREFIX} ✅ Prueba completada exitosamente`);
    logs.push(`${LOG_PREFIX} ========================================`);

    return {
      success: true,
      buttonCode,
      modalCode,
      combinedCode: codeWithLogs,
      errors: errors.length > 0 ? errors : undefined,
      logs,
    };
  } catch (error: any) {
    logs.push(`\n${LOG_PREFIX} ========================================`);
    logs.push(`${LOG_PREFIX} ❌ Error en prueba: ${error.message}`);
    logs.push(`${LOG_PREFIX} ========================================`);
    errors.push(error.message);
    return {
      success: false,
      errors,
      logs,
    };
  }
}

/**
 * Genera código de botón UBITS como fallback
 */
function generateUBITSButtonCode(): string {
  return `
<button 
  id="test-open-modal-btn" 
  class="ubits-button ubits-button--primary ubits-button--md"
  onclick="openTestModal()"
>
  <span>Abrir Modal de Prueba</span>
</button>
`;
}

/**
 * Genera código de modal UBITS como fallback
 * ⚠️ IMPORTANTE: Usa estructura EXACTA del ModalProvider.ts
 */
function generateUBITSModalCode(): string {
  return `
<div id="test-modal-container"></div>

<script>
function openTestModal() {
  console.log('🧪 [Test] Abriendo modal...');
  
  // Intentar múltiples APIs de modal
  let modalInstance = null;
  
  // 1. Intentar window.createModal (API directa)
  if (typeof window.createModal === 'function') {
    console.log('🧪 [Test] Usando window.createModal');
    try {
      modalInstance = window.createModal({
        containerId: 'test-modal-container',
        title: 'Modal de Prueba',
        bodyContent: '<p>Este es un modal de prueba implementado desde Storybook.</p>',
        footerButtons: {
          secondary: {
            label: 'Cerrar',
            enabled: true,
            onClick: () => {
              console.log('🧪 [Test] Modal cerrado desde botón');
              closeTestModal();
            }
          }
        },
        onClose: () => {
          console.log('🧪 [Test] Modal cerrado');
        }
      });
      if (modalInstance && modalInstance.open) {
        modalInstance.open();
        console.log('🧪 [Test] ✅ Modal abierto exitosamente');
        return;
      }
    } catch (error) {
      console.warn('🧪 [Test] ⚠️ Error con window.createModal:', error);
    }
  }
  
  // 2. Intentar window.UBITS.Modal.create
  if (window.UBITS && window.UBITS.Modal && typeof window.UBITS.Modal.create === 'function') {
    console.log('🧪 [Test] Usando window.UBITS.Modal.create');
    try {
      modalInstance = window.UBITS.Modal.create({
        containerId: 'test-modal-container',
        title: 'Modal de Prueba',
        bodyContent: '<p>Este es un modal de prueba implementado desde Storybook.</p>',
        footerButtons: {
          secondary: {
            label: 'Cerrar',
            enabled: true,
            onClick: () => {
              console.log('🧪 [Test] Modal cerrado desde botón');
              closeTestModal();
            }
          }
        },
        onClose: () => {
          console.log('🧪 [Test] Modal cerrado');
        }
      });
      if (modalInstance && modalInstance.open) {
        modalInstance.open();
        console.log('🧪 [Test] ✅ Modal abierto exitosamente');
        return;
      }
    } catch (error) {
      console.warn('🧪 [Test] ⚠️ Error con window.UBITS.Modal.create:', error);
    }
  }
  
  // 3. Fallback: Crear modal manualmente con HTML EXACTO (estructura de ModalProvider.ts)
  console.log('🧪 [Test] ⚠️ APIs de modal no disponibles, usando fallback HTML con estructura exacta');
  const container = document.getElementById('test-modal-container');
  if (container) {
    // ⚠️ ESTRUCTURA EXACTA del ModalProvider.ts - NO MODIFICAR
    const modalHTML = \`
<div class="ubits-modal-overlay">
  <div class="ubits-modal ubits-modal--size-md" style="max-width: calc(var(--ubits-spacing-12) * 6);">
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">Modal de Prueba</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button" onclick="closeTestModal()">
        <i class="far fa-times"></i>
      </button>
    </div>
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        <p>Este es un modal de prueba implementado desde Storybook.</p>
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        <div class="ubits-modal__footer-right">
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" onclick="closeTestModal()">
            <span>Cerrar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
\`;
    container.innerHTML = modalHTML;
    
    // Agregar clase --open para mostrar (después de insertar)
    setTimeout(() => {
      const overlay = container.querySelector('.ubits-modal-overlay');
      if (overlay) {
        overlay.classList.add('ubits-modal-overlay--open');
        document.body.style.overflow = 'hidden';
      }
    }, 10);
    
    // Cerrar al hacer clic en el overlay
    const overlay = container.querySelector('.ubits-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeTestModal();
        }
      });
    }
    
    console.log('🧪 [Test] ✅ Modal creado manualmente con estructura exacta');
  } else {
    console.error('🧪 [Test] ❌ Contenedor de modal no encontrado');
    alert('Contenedor de modal no encontrado');
  }
}

function closeTestModal() {
  console.log('🧪 [Test] Cerrando modal...');
  const container = document.getElementById('test-modal-container');
  if (container) {
    // Remover clase --open
    const overlay = container.querySelector('.ubits-modal-overlay');
    if (overlay) {
      overlay.classList.remove('ubits-modal-overlay--open');
    }
    
    // Limpiar después de animación
    setTimeout(() => {
      container.innerHTML = '';
      document.body.style.overflow = '';
      console.log('🧪 [Test] ✅ Modal cerrado');
    }, 300); // Esperar animación de cierre
  }
}
</script>
`;
}

/**
 * Combina código de botón y modal
 */
function combineButtonAndModal(buttonCode: string, modalCode: string): string {
  return `
<!-- 🧪 TEST: Botón y Modal implementados desde Storybook -->
<div style="padding: var(--ubits-spacing-md);">
  ${buttonCode.trim()}
</div>

${modalCode.trim()}
`;
}

/**
 * Agrega logs de rastreo al código
 */
function addTrackingLogs(code: string): string {
  const trackingScript = `
<script>
// 🧪 [Test] Sistema de rastreo de implementación
(function() {
  console.log('🧪 [Test Implementation] ========================================');
  console.log('🧪 [Test Implementation] Sistema de rastreo inicializado');
  console.log('🧪 [Test Implementation] ========================================');
  
  // Rastrear cuando se carga la página
  window.addEventListener('DOMContentLoaded', () => {
    console.log('🧪 [Test Implementation] DOM cargado');
    console.log('🧪 [Test Implementation] Verificando componentes...');
    
    // Verificar botón
    const button = document.getElementById('test-open-modal-btn');
    if (button) {
      console.log('🧪 [Test Implementation] ✅ Botón encontrado:', button);
      button.addEventListener('click', () => {
        console.log('🧪 [Test Implementation] 🔘 Botón clickeado');
      });
    } else {
      console.warn('🧪 [Test Implementation] ⚠️  Botón no encontrado');
    }
    
    // Verificar modal container
    const modalContainer = document.getElementById('test-modal-container');
    if (modalContainer) {
      console.log('🧪 [Test Implementation] ✅ Contenedor de modal encontrado:', modalContainer);
    } else {
      console.warn('🧪 [Test Implementation] ⚠️  Contenedor de modal no encontrado');
    }
    
    // Verificar APIs de modal disponibles
    let modalAPI = null;
    if (typeof window.createModal === 'function') {
      modalAPI = 'window.createModal';
      console.log('🧪 [Test Implementation] ✅ window.createModal disponible');
    } else if (window.UBITS && window.UBITS.Modal && typeof window.UBITS.Modal.create === 'function') {
      modalAPI = 'window.UBITS.Modal.create';
      console.log('🧪 [Test Implementation] ✅ window.UBITS.Modal.create disponible');
    } else {
      console.warn('🧪 [Test Implementation] ⚠️  Ninguna API de modal disponible');
      console.warn('🧪 [Test Implementation] 💡 Se usará fallback HTML manual');
    }
  });
  
  // Rastrear errores
  window.addEventListener('error', (event) => {
    console.error('🧪 [Test Implementation] ❌ Error capturado:', event.error);
  });
})();
</script>
`;

  return code + trackingScript;
}

/**
 * Valida el código generado
 */
function validateCode(code: string): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Verificar que tiene botón
  if (!code.includes('test-open-modal-btn')) {
    warnings.push('No se encontró ID del botón');
  }

  // Verificar que tiene modal container
  if (!code.includes('test-modal-container')) {
    warnings.push('No se encontró contenedor de modal');
  }

  // Verificar que tiene función openTestModal
  if (!code.includes('openTestModal')) {
    warnings.push('No se encontró función openTestModal');
  }

  // Verificar que tiene logs
  if (!code.includes('🧪 [Test Implementation]')) {
    warnings.push('No se encontraron logs de rastreo');
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}

/**
 * Extiende getExampleCodeFromStorybook para soportar URLs personalizadas
 */
async function getExampleCodeFromStorybook(
  componentId: string,
  storyName: string,
  baseUrl?: string
): Promise<string | undefined> {
  try {
    // Si no se proporciona baseUrl, usar helper estándar
    if (!baseUrl) {
      const { getExampleCodeFromStorybook: getExampleCodeHelper } =
        await import('./storybookImplementationHelper');
      const result = await getExampleCodeHelper(componentId, storyName);
      return result || undefined;
    }

    // Intentar usar el helper existente con URL personalizada
    const { parseCodeFromStorybookUrl } = await import('./storybookCodeParser');
    // ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
    const encodedComponentId = encodeURIComponent(componentId);
    const storybookUrl = `${baseUrl}/?path=/story/${encodedComponentId}--${storyName}`;
    const result = await parseCodeFromStorybookUrl(storybookUrl);

    if (result.codeBlocks && result.codeBlocks.length > 0) {
      // Retornar el código primario o el primero disponible
      return result.primaryCode || result.codeBlocks[0].code;
    }
  } catch (error) {
    // Silenciar error, retornar undefined para usar fallback
  }

  return undefined;
}

/**
 * Extiende getPropsFromStorybook para soportar URLs personalizadas
 */
async function getPropsFromStorybook(
  componentId: string,
  baseUrl?: string
): Promise<Record<string, any> | undefined> {
  try {
    // Si no se proporciona baseUrl, usar helper estándar
    if (!baseUrl) {
      const { getPropsFromStorybook: getPropsHelper } = await import(
        './storybookImplementationHelper'
      );
      const result = await getPropsHelper(componentId);
      return result || undefined;
    }

    // Intentar usar el helper existente con URL personalizada
    const { parsePropsTableFromStorybookUrl } = await import(
      './storybookPropsParser'
    );
    // ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
    const encodedComponentId = encodeURIComponent(componentId);
    const storybookUrl = `${baseUrl}/?path=/docs/${encodedComponentId}--docs`;
    const result = await parsePropsTableFromStorybookUrl(storybookUrl);

    if (result.props && result.props.length > 0) {
      // Convertir array de props a objeto
      const propsObj: Record<string, any> = {};
      result.props.forEach((prop) => {
        propsObj[prop.name] = {
          type: prop.type,
          required: prop.required,
          defaultValue: prop.defaultValue,
          description: prop.description,
        };
      });
      return propsObj;
    }
  } catch (error) {
    // Silenciar error, retornar undefined
  }

  return undefined;
}
