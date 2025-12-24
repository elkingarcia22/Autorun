/**
 * Auto Message Handler
 *
 * ⚠️ CRÍTICO: Wrapper que garantiza que executeOnMessageStart() se ejecute
 * automáticamente al inicio de cada mensaje y maneje todo el flujo automático.
 *
 * Este módulo DEBE ser usado al inicio de cada mensaje del usuario.
 */

import {
  executeOnMessageStart,
  MessageStartResult,
} from './executeOnMessageStart.js';
import { mapComponentNameToStorybookId } from './storybookStories.js';

/**
 * ⚠️ CRÍTICO: Manejar mensaje del usuario automáticamente
 *
 * Esta función DEBE llamarse al inicio de cada mensaje del usuario.
 * Garantiza que se ejecuten todos los pasos obligatorios automáticamente.
 *
 * @param userMessage Mensaje completo del usuario
 * @returns Resultado con información de detección y bloqueo
 */
export async function handleUserMessage(
  userMessage: string,
  options?: { skipPreCheck?: boolean }
): Promise<
  MessageStartResult & {
    mcpMessages?: Array<{ componentName: string; storybookId: string }>;
  }
> {
  console.log(
    '\n🚀 [Auto Message Handler] ========================================'
  );
  console.log(
    '🚀 [Auto Message Handler] Iniciando manejo automático del mensaje'
  );
  console.log(
    `🚀 [Auto Message Handler] Mensaje: ${userMessage.substring(0, 100)}...`
  );
  console.log(`🚀 [Auto Message Handler] Opciones: ${JSON.stringify(options)}`);

  // PASO 1: SIEMPRE ejecutar executeOnMessageStart()
  console.log(
    '🚀 [Auto Message Handler] PASO 1: Ejecutando executeOnMessageStart()...'
  );
  const result = await executeOnMessageStart(userMessage, options);

  // PASO 2: Si detectó componente(s), preparar mensajes MCP y CONSULTAR AUTOMÁTICAMENTE
  const mcpMessages: Array<{ componentName: string; storybookId: string }> = [];
  const componentsToQuery: string[] = [];

  if (result.detected && result.componentName) {
    console.log(
      '🚀 [Auto Message Handler] PASO 2: Componente detectado, preparando consulta MCP...'
    );
    componentsToQuery.push(result.componentName);

    try {
      // Obtener ID de Storybook para el componente detectado
      const storybookId = await mapComponentNameToStorybookId(
        result.componentName
      );

      if (storybookId) {
        mcpMessages.push({
          componentName: result.componentName,
          storybookId,
        });

        console.log(
          `📚 [Auto Message Handler] Mensaje MCP preparado: ${result.componentName} → ${storybookId}`
        );
        // Obtener Storybook activo para determinar servidor MCP
        try {
          const { StorybookManager } = await import('./storybookManager');
          const manager = StorybookManager.getInstance();
          const activeConfig = await manager.getActiveConfig();

          // ⚠️ CRÍTICO: El servidor MCP debe ser "storybook" (no "storybook-ubits")
          // El wizard configura el MCP con el nombre "storybook"
          let mcpServer = 'storybook';
          if (activeConfig) {
            console.log(
              `📚 [Auto Message Handler] Storybook activo: ${activeConfig.name} (${activeConfig.url})`
            );
            // El servidor MCP debe estar configurado con la URL del Storybook activo
            // Siempre usar "storybook" como nombre del servidor (unificado)
            mcpServer = 'storybook';
          }

          // ⚠️ NUEVO MCP: Convertir storybookId a nombre de componente
          const { storybookIdToComponentName } = await import(
            './storybookMCPNameMapper.js'
          );
          const componentName =
            storybookIdToComponentName(storybookId) || result.componentName;

          console.log(
            `📚 [Auto Message Handler] ⚠️ OBLIGATORIO: El agente DEBE ejecutar automáticamente:`
          );
          console.log(`   call_mcp_tool({`);
          console.log(`     server: "${mcpServer}",`);
          console.log(`     toolName: "getComponentsProps",`); // ⚠️ NUEVO MCP: Sin prefijo mcp_storybook_
          console.log(
            `     arguments: { componentNames: ["${componentName}"] }`
          ); // ⚠️ NUEVO MCP: Usar componentNames
          console.log(`   })`);
          console.log(
            `📚 [Auto Message Handler] ⚠️ CRÍTICO: NO continuar con implementación hasta obtener props`
          );
          if (activeConfig) {
            console.log(
              `📚 [Auto Message Handler] ⚠️ IMPORTANTE: El servidor MCP debe estar configurado con STORYBOOK_URL=${activeConfig.url}/index.json`
            );
          }
        } catch (error) {
          // Si no se puede obtener Storybook activo, usar default
          console.log(
            `📚 [Auto Message Handler] ⚠️ OBLIGATORIO: El agente DEBE ejecutar automáticamente:`
          );
          console.log(`   call_mcp_tool({`);
          console.log(`     server: "storybook",`); // ⚠️ CORREGIDO: Usar "storybook" (no "storybook-ubits")
          console.log(`     toolName: "getComponentsProps",`); // ⚠️ NUEVO MCP: Sin prefijo mcp_storybook_
          console.log(`     arguments: { componentIds: ["${storybookId}"] }`);
          console.log(`   })`);
          console.log(
            `📚 [Auto Message Handler] ⚠️ CRÍTICO: NO continuar con implementación hasta obtener props`
          );
        }
      } else {
        console.warn(
          `⚠️ [Auto Message Handler] No se pudo obtener ID de Storybook para: ${result.componentName}`
        );
      }
    } catch (error) {
      console.error(
        `❌ [Auto Message Handler] Error obteniendo ID de Storybook:`,
        error
      );
    }
  }

  // PASO 3: Detectar múltiples componentes en el mensaje
  console.log(
    '🚀 [Auto Message Handler] PASO 3: Detectando múltiples componentes...'
  );
  const additionalComponents = detectAdditionalComponents(
    userMessage,
    result.componentName
  );

  if (additionalComponents.length > 0) {
    console.log(
      `📚 [Auto Message Handler] Componentes adicionales detectados: ${additionalComponents.join(', ')}`
    );
    componentsToQuery.push(...additionalComponents);

    for (const componentName of additionalComponents) {
      try {
        const storybookId = await mapComponentNameToStorybookId(componentName);
        if (storybookId) {
          // Verificar que no esté ya en la lista
          if (!mcpMessages.some((msg) => msg.componentName === componentName)) {
            mcpMessages.push({
              componentName,
              storybookId,
            });
            console.log(
              `📚 [Auto Message Handler] Mensaje MCP adicional: ${componentName} → ${storybookId}`
            );
            // Obtener Storybook activo para determinar servidor MCP
            try {
              const { StorybookManager } = await import('./storybookManager');
              const manager = StorybookManager.getInstance();
              const activeConfig = await manager.getActiveConfig();

              let mcpServer = 'storybook-ubits'; // Default
              if (activeConfig) {
                mcpServer = 'storybook-ubits'; // Mismo servidor, pero URL diferente en configuración
              }

              console.log(
                `📚 [Auto Message Handler] ⚠️ OBLIGATORIO: El agente DEBE ejecutar automáticamente:`
              );
              console.log(`   call_mcp_tool({`);
              console.log(`     server: "${mcpServer}",`);
              console.log(`     toolName: "getComponentsProps",`); // ⚠️ NUEVO MCP: Sin prefijo mcp_storybook_
              console.log(
                `     arguments: { componentIds: ["${storybookId}"] }`
              );
              console.log(`   })`);
              if (activeConfig) {
                console.log(
                  `📚 [Auto Message Handler] ⚠️ IMPORTANTE: El servidor MCP debe estar configurado con STORYBOOK_URL=${activeConfig.url}/index.json`
                );
              }
            } catch (error) {
              // Si no se puede obtener Storybook activo, usar default
              console.log(
                `📚 [Auto Message Handler] ⚠️ OBLIGATORIO: El agente DEBE ejecutar automáticamente:`
              );
              console.log(`   call_mcp_tool({`);
              console.log(`     server: "storybook-ubits",`);
              console.log(`     toolName: "getComponentsProps",`); // ⚠️ NUEVO MCP: Sin prefijo mcp_storybook_
              console.log(
                `     arguments: { componentIds: ["${storybookId}"] }`
              );
              console.log(`   })`);
            }
          }
        }
      } catch (error) {
        console.warn(
          `⚠️ [Auto Message Handler] Error obteniendo ID para componente adicional:`,
          error
        );
      }
    }
  }

  // PASO 3.5: ⚠️ CRÍTICO: Llamar automáticamente al sistema de MCP
  if (componentsToQuery.length > 0) {
    console.log(
      '\n📚 [Auto Message Handler] PASO 3.5: Llamando sistema automático de MCP...'
    );
    try {
      const { autoCallStorybookMCP } = await import('./storybookMCPAutoCaller');
      const mcpResults = await autoCallStorybookMCP(componentsToQuery);
      console.log(
        `📚 [Auto Message Handler] ${mcpResults.length} componente(s) procesado(s) para MCP`
      );
    } catch (error) {
      console.warn(
        `⚠️ [Auto Message Handler] Error llamando sistema automático de MCP:`,
        error
      );
    }
  }

  console.log(
    `✅ [Auto Message Handler] Manejo automático completado. ${mcpMessages.length} componente(s) para consultar MCP.`
  );
  console.log(
    '🚀 [Auto Message Handler] ========================================\n'
  );

  return {
    ...result,
    mcpMessages: mcpMessages.length > 0 ? mcpMessages : undefined,
  };
}

/**
 * Detectar componentes adicionales en el mensaje
 * (además del componente principal ya detectado)
 */
function detectAdditionalComponents(
  userMessage: string,
  alreadyDetected?: string
): string[] {
  const detected: string[] = [];
  const lowerMessage = userMessage.toLowerCase();

  // ⚠️ PATRONES COMPLETOS: Todos los componentes de UBITS Storybook
  // ⚠️ TEMPORALMENTE: Solo usando UBITS Storybook (Libraries UI deshabilitado)
  // Total: ~66 componentes detectables
  const componentPatterns: Record<string, RegExp[]> = {
    // ========== COMPONENTES BÁSICOS ==========
    // ⚠️ CRÍTICO: RadioButton DEBE estar ANTES de Button para evitar falsos positivos
    RadioButton: [
      /\bradio\s*button\b/i, // "radio button" o "radiobutton"
      /\bradio\s*bot[oó]n\b/i, // "radio botón"
      /\bradiobutton\b/i, // "radiobutton" (sin espacio)
      /(?:implementar|crear|agregar|poner|hacer).*radio.*button/i,
      /(?:implementar|crear|agregar|poner|hacer).*radio.*bot[oó]n/i,
      /\bradio\b/i, // "radio" solo (pero con menor prioridad)
    ],
    Button: [
      /\bbot[oó]n\b(?!\s*radio)/i, // "botón" pero NO "botón radio"
      /\bbutton\b(?!\s*radio)/i, // "button" pero NO "button radio"
      /\bbotones?\b(?!.*radio)/i, // "botones" pero NO si contiene "radio"
      /(?:implementar|crear|agregar|poner|hacer).*(?:bot[oó]n|button)(?!.*radio)/i,
    ],
    ButtonAI: [
      /\bbuttonai\b/i,
      /\bbutton\s+ai\b/i,
      /\bbot[oó]n\s+ai\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:buttonai|button\s+ai|bot[oó]n\s+ai)/i,
    ],
    ButtonGroup: [
      /\bbuttongroup\b/i,
      /\bbutton\s+group\b/i,
      /\bgrupo\s+de\s+botones\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:buttongroup|grupo\s+de\s+botones)/i,
    ],
    Avatar: [
      /\bavatar\b/i,
      /\bfoto\s+de\s+perfil\b/i,
      /\bimagen\s+de\s+usuario\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:avatar|foto\s+de\s+perfil)/i,
    ],
    Badge: [
      /\bbadge\b/i,
      /\betiqueta\b/i,
      /\binsignia\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:badge|etiqueta|insignia)/i,
    ],
    Chip: [
      /\bchip\b/i,
      /\betiqueta\s+peque[ñn]a\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:chip|etiqueta\s+peque[ñn]a)/i,
    ],
    Skeleton: [
      /\bskeleton\b/i,
      /\besqueleto\b/i,
      /\bplaceholder\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:skeleton|esqueleto|placeholder)/i,
    ],
    Spinner: [
      /\bspinner\b/i,
      /\bcargador\b/i,
      /\bloading\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:spinner|cargador|loading)/i,
    ],
    StatusTag: [
      /\bstatus\s+tag\b/i,
      /\betiqueta\s+de\s+estado\b/i,
      /\btag\s+de\s+estado\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:status\s+tag|etiqueta\s+de\s+estado)/i,
    ],
    Tag: [
      /\btag\b/i,
      /\betiqueta\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:tag|etiqueta)/i,
    ],
    Scrollbar: [
      /\bscrollbar\b/i,
      /\bbarra\s+de\s+desplazamiento\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:scrollbar|barra\s+de\s+desplazamiento)/i,
    ],

    // ========== COMPONENTES DE FEEDBACK ==========
    Modal: [
      /\bmodal\b/i,
      /\bventana\s+emergente\b/i,
      /\bdialogo\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:modal|ventana\s+emergente|dialogo)/i,
      /\bque\s+abr[ae]\s+(?:un\s+)?modal\b/i,
      /\bque\s+abr[ae]\s+(?:una\s+)?ventana\b/i,
    ],
    Popover: [
      /\bpopover\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:popover)/i,
      /\bque\s+abr[ae]\s+(?:un\s+)?popover\b/i,
    ],
    Drawer: [
      /\bdrawer\b/i,
      /\bcaj[oó]n\s+lateral\b/i,
      /\bpanel\s+lateral\b/i,
      /\bdrawer\s+navigation\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:drawer|caj[oó]n\s+lateral|panel\s+lateral)/i,
      /\bque\s+abr[ae]\s+(?:un\s+)?drawer\b/i,
    ],
    Toast: [
      /\btoast\b/i,
      /\bnotificaci[oó]n\b/i,
      /\baviso\s+temporal\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:toast|notificaci[oó]n|aviso\s+temporal)/i,
    ],
    Alert: [
      /\balert\b/i,
      /\balerta\b/i,
      /\baviso\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:alert|alerta|aviso)/i,
    ],
    Tooltip: [
      /\btooltip\b/i,
      /\binformaci[oó]n\s+adicional\b/i,
      /\bconsejo\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:tooltip|informaci[oó]n\s+adicional)/i,
    ],
    EmptyState: [
      /\bempty\s+state\b/i,
      /\bestado\s+vac[ií]o\b/i,
      /\bsin\s+datos\b/i,
      /\bempty\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:empty\s+state|estado\s+vac[ií]o|sin\s+datos)/i,
    ],
    Mask: [
      /\bmask\b/i,
      /\bm[aá]scara\b/i,
      /\boverlay\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:mask|m[aá]scara|overlay)/i,
    ],
    ButtonFeedback: [
      /\bbutton\s+feedback\b/i,
      /\bbot[oó]n\s+de\s+retroalimentaci[oó]n\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:button\s+feedback|bot[oó]n\s+de\s+retroalimentaci[oó]n)/i,
    ],
    Tour: [
      /\btour\b/i,
      /\brecorrido\b/i,
      /\bgu[ií]a\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:tour|recorrido|gu[ií]a)/i,
    ],

    // ========== COMPONENTES DE FORMULARIOS ==========
    Input: [
      /\binput\b/i,
      /\bcampo\s+de\s+texto\b/i,
      /\bcampo\s+texto\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:input|campo\s+de\s+texto)/i,
    ],
    Select: [
      /\bselect\b/i,
      /\bseleccionar\b/i,
      /\bdesplegable\b/i,
      /\bdropdown\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:select|seleccionar|desplegable|dropdown)/i,
    ],
    Checkbox: [
      /\bcheckbox\b/i,
      /\bcasilla\s+de\s+verificaci[oó]n\b/i,
      /\bcasilla\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:checkbox|casilla)/i,
    ],
    Radio: [
      /\bradio\b/i,
      /\bbot[oó]n\s+de\s+opci[oó]n\b/i,
      /\bradio\s+button\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:radio|bot[oó]n\s+de\s+opci[oó]n)/i,
    ],
    DatePicker: [
      /\bdatepicker\b/i,
      /\bdate-picker\b/i,
      /\bselector\s+de\s+fecha\b/i,
      /\bcalendario\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:datepicker|date-picker|selector\s+de\s+fecha|calendario)/i,
    ],
    Calendar: [
      /\bcalendar\b/i,
      /\bcalendario\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:calendar|calendario)/i,
    ],
    FileUpload: [
      /\bfile\s+upload\b/i,
      /\bsubir\s+archivo\b/i,
      /\bcarga\s+de\s+archivo\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:file\s+upload|subir\s+archivo|carga\s+de\s+archivo)/i,
    ],
    Toggle: [
      /\btoggle\b/i,
      /\binterruptor\b/i,
      /\bswitch\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:toggle|interruptor|switch)/i,
    ],
    Switch: [
      /\bswitch\b/i,
      /\binterruptor\b/i,
      /\btoggle\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:switch|interruptor|toggle)/i,
    ],
    Slider: [
      /\bslider\b/i,
      /\bdeslizador\b/i,
      /\brango\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:slider|deslizador|rango)/i,
    ],
    SearchButton: [
      /\bsearch\s+button\b/i,
      /\bbot[oó]n\s+de\s+b[úu]squeda\b/i,
      /\bb[úu]squeda\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:search\s+button|bot[oó]n\s+de\s+b[úu]squeda)/i,
    ],
    Label: [
      /\blabel\b/i,
      /\betiqueta\s+de\s+campo\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:label|etiqueta\s+de\s+campo)/i,
    ],
    ExpandingInputButton: [
      /\bexpanding\s+input\s+button\b/i,
      /\bbot[oó]n\s+de\s+entrada\s+expandible\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:expanding\s+input\s+button)/i,
    ],
    RichTextEditor: [
      /\brichtexteditor\b/i,
      /\beditor\s+de\s+texto\s+enriquecido\b/i,
      /\beditor\s+de\s+texto\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:richtexteditor|editor\s+de\s+texto)/i,
    ],

    // ========== COMPONENTES DE NAVEGACIÓN ==========
    // ⚠️ CRÍTICO: Tabs DEBE estar ANTES de DataTable para evitar falsos positivos
    // porque "tabla" puede aparecer en "Lista de encuestas" pero "tabs" es más específico
    Tabs: [
      /\btabs?\b/i, // "tabs" o "tab"
      /\bpesta[ñn]as?\b/i, // "pestañas" o "pestaña"
      /(?:implementar|implementa|crear|agregar|poner|hacer).*\btabs?\b/i,
      /\btabs?\b.*(?:debajo|abajo|bajo|después)/i, // "tabs debajo del subnav"
    ],

    // ========== COMPONENTES DE DATOS ==========
    DataTable: [
      // ⚠️ CRÍTICO: Evitar "tabla" cuando está en contexto de "Lista de"
      /\bdata\s*table\b/i,
      /\bdata-table\b/i,
      /\btabla\s+de\s+datos\b/i, // "tabla de datos" es más específico
      /(?:implementar|implementa|crear|agregar|poner|hacer).*(?:data\s*table|data-table|tabla\s+de\s+datos)/i,
      // ⚠️ Solo detectar "tabla" si NO está precedido por "lista de"
      /\btabla\b(?!\s+de\s+encuestas)(?!.*lista\s+de)/i,
    ],
    Table: [
      /\btable\b/i,
      /\btabla\b(?!\s+de\s+encuestas)(?!.*lista\s+de)/i,
      /(?:implementar|implementa|crear|agregar|poner|hacer).*(?:table|tabla)(?!.*lista\s+de)/i,
    ],
    List: [
      /\blist\b/i,
      /\blista\b/i,
      /(?:implementar|implementa|crear|agregar|poner|hacer).*(?:list|lista)/i,
    ],
    Pagination: [
      /\bpagination\b/i,
      /\bpaginaci[oó]n\b/i,
      /(?:implementar|implementa|crear|agregar|poner|hacer).*(?:pagination|paginaci[oó]n)/i,
    ],
    DataView: [
      /\bdataview\b/i,
      /\bvista\s+de\s+datos\b/i,
      /(?:implementar|implementa|crear|agregar|poner|hacer).*(?:dataview|vista\s+de\s+datos)/i,
    ],
    Sidebar: [
      /\bsidebar\b/i,
      /\bbarra\s+lateral\b/i,
      /\bmen[uú]\s+lateral\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:sidebar|barra\s+lateral|men[uú]\s+lateral)/i,
    ],
    SubNav: [
      /\bsubnav\b/i,
      /\bsub-nav\b/i,
      /\bnavegaci[oó]n\s+secundaria\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:subnav|sub-nav|navegaci[oó]n\s+secundaria)/i,
    ],
    TabBar: [
      /\btabbar\b/i,
      /\bbarra\s+de\s+pesta[ñn]as\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:tabbar|barra\s+de\s+pesta[ñn]as)/i,
    ],
    Menu: [
      /\bmenu\b/i,
      /\bmen[uú]\b/i,
      /\bdesplegable\s+de\s+opciones\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:menu|men[uú])/i,
    ],
    Breadcrumb: [
      /\bbreadcrumb\b/i,
      /\bmigas\s+de\s+pan\b/i,
      /\bruta\s+de\s+navegaci[oó]n\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:breadcrumb|migas\s+de\s+pan)/i,
    ],
    TreeMenu: [
      /\btreemenu\b/i,
      /\bmen[uú]\s+en\s+[áa]rbol\b/i,
      /\bmen[uú]\s+jer[aá]rquico\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:treemenu|men[uú]\s+en\s+[áa]rbol)/i,
    ],
    SegmentControl: [
      /\bsegment\s+control\b/i,
      /\bcontrol\s+de\s+segmentos\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:segment\s+control|control\s+de\s+segmentos)/i,
    ],
    MenuParticipantes: [
      /\bmenu\s+de\s+participantes\b/i,
      /\bmen[uú]\s+participantes\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:menu\s+de\s+participantes)/i,
    ],
    ContextMenu: [
      /\bcontextmenu\b/i,
      /\bmen[uú]\s+contextual\b/i,
      /\bmen[uú]\s+de\s+contexto\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:contextmenu|men[uú]\s+contextual)/i,
    ],
    Dropdown: [
      /\bdropdown\b/i,
      /\bdesplegable\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:dropdown|desplegable)/i,
    ],

    // ========== COMPONENTES DE LAYOUT ==========
    Card: [
      /\bcard\b/i,
      /\btarjeta\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:card|tarjeta)/i,
    ],
    SimpleCard: [
      /\bsimple\s+card\b/i,
      /\btarjeta\s+simple\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:simple\s+card|tarjeta\s+simple)/i,
    ],
    SelectionCard: [
      /\bselection\s+card\b/i,
      /\btarjeta\s+de\s+selecci[oó]n\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:selection\s+card|tarjeta\s+de\s+selecci[oó]n)/i,
    ],
    CardContent: [
      /\bcard\s+content\b/i,
      /\bcontenido\s+de\s+tarjeta\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:card\s+content|contenido\s+de\s+tarjeta)/i,
    ],
    Accordion: [
      /\baccordion\b/i,
      /\bacorde[oó]n\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:accordion|acorde[oó]n)/i,
    ],
    Carousel: [
      /\bcarousel\b/i,
      /\bcarrusel\b/i,
      /\bgaler[ií]a\s+deslizante\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:carousel|carrusel|galer[ií]a\s+deslizante)/i,
    ],
    Gallery: [
      /\bgallery\b/i,
      /\bgaler[ií]a\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:gallery|galer[ií]a)/i,
    ],
    Stepper: [
      /\bstepper\b/i,
      /\bpasos\b/i,
      /\bprogreso\s+de\s+pasos\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:stepper|pasos|progreso\s+de\s+pasos)/i,
    ],
    Timeline: [
      /\btimeline\b/i,
      /\bl[ií]nea\s+de\s+tiempo\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:timeline|l[ií]nea\s+de\s+tiempo)/i,
    ],
    HeaderSection: [
      /\bheadersection\b/i,
      /\bheader\s+section\b/i,
      /\bsecci[oó]n\s+de\s+encabezado\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:headersection|secci[oó]n\s+de\s+encabezado)/i,
    ],
    Contenedor: [
      /\bcontenedor\b/i,
      /\bcontainer\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:contenedor|container)/i,
    ],
    Heading: [
      /\bheading\b/i,
      /\bencabezado\b/i,
      /\bt[ií]tulo\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:heading|encabezado|t[ií]tulo)/i,
    ],
    Display: [
      /\bdisplay\b/i,
      /\bvisualizaci[oó]n\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:display|visualizaci[oó]n)/i,
    ],

    // ========== COMPONENTES DE CHART/METRICS (UBITS) ==========
    BarMetricCard: [
      /\bbar\s+metric\s+card\b/i,
      /\btarjeta\s+de\s+m[ée]trica\s+de\s+barras\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:bar\s+metric\s+card)/i,
    ],
    CircleMetricCard: [
      /\bcircle\s+metric\s+card\b/i,
      /\btarjeta\s+de\s+m[ée]trica\s+circular\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:circle\s+metric\s+card)/i,
    ],
    CSATMetricCard: [
      /\bcsat\s+metric\s+card\b/i,
      /\btarjeta\s+csat\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:csat\s+metric\s+card)/i,
    ],
    NPSCard: [
      /\bnps\s+card\b/i,
      /\btarjeta\s+nps\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:nps\s+card)/i,
    ],
    ProgressBar: [
      /\bprogress\s+bar\b/i,
      /\bbarra\s+de\s+progreso\b/i,
      /\bprogress\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:progress\s+bar|barra\s+de\s+progreso|progress)/i,
    ],
    ScoreCardMetrics: [
      /\bscore\s+card\s+metrics\b/i,
      /\bm[ée]tricas\s+de\s+puntuaci[oó]n\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:score\s+card\s+metrics)/i,
    ],
    TextMetricCard: [
      /\btext\s+metric\s+card\b/i,
      /\btarjeta\s+de\s+m[ée]trica\s+de\s+texto\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:text\s+metric\s+card)/i,
    ],

    // ========== COMPONENTES ADICIONALES ==========
    Rating: [
      /\brating\b/i,
      /\bcalificaci[oó]n\b/i,
      /\bestrellas\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:rating|calificaci[oó]n|estrellas)/i,
    ],
    QRCode: [
      /\bqrcode\b/i,
      /\bc[oó]digo\s+qr\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:qrcode|c[oó]digo\s+qr)/i,
    ],
    Floating: [
      /\bfloating\b/i,
      /\bflotante\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:floating|flotante)/i,
    ],
    TextUtilities: [
      /\btextutilities\b/i,
      /\butilidades\s+de\s+texto\b/i,
      /(?:implementar|crear|agregar|poner|hacer).*(?:textutilities|utilidades\s+de\s+texto)/i,
    ],
  };

  // Buscar todos los componentes mencionados
  for (const [componentName, patterns] of Object.entries(componentPatterns)) {
    // Si ya fue detectado, saltarlo
    if (alreadyDetected && componentName === alreadyDetected) {
      continue;
    }

    // Verificar si alguno de los patrones coincide
    const matches = patterns.some((pattern) => pattern.test(lowerMessage));
    if (matches && !detected.includes(componentName)) {
      detected.push(componentName);
    }
  }

  return detected;
}

/**
 * ⚠️ CRÍTICO: Instrucciones para el agente
 */
export const AUTO_MESSAGE_HANDLER_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Usar handleUserMessage() al Inicio de Cada Mensaje

AL INICIO de cada mensaje del usuario, DEBES:

1. Llamar a handleUserMessage():
   import { handleUserMessage } from '@autorun/core/helpers/autoMessageHandler';
   const result = await handleUserMessage(userMessage);

2. Si result.blocked === true:
   - ❌ NO continuar con la implementación
   - 📋 Mostrar razón: result.reason
   - 📚 Mostrar plan si está disponible: result.plan
   - ✅ Completar pasos faltantes antes de continuar

3. Si result.mcpMessages existe:
   - 📚 Consultar Storybook MCP para TODOS los componentes automáticamente
   - Para cada mensaje en result.mcpMessages:
     call_mcp_tool({
       server: "storybook-ubits",
       toolName: "getComponentsProps", // ⚠️ NUEVO MCP: Sin prefijo mcp_storybook_
       arguments: { componentIds: [message.storybookId] }
     })
   - ❌ NO preguntar al usuario
   - ✅ Ejecutar automáticamente

4. Si result.detected === true y result.blocked === false:
   - ✅ Continuar con la implementación
   - 📋 Usar plan si está disponible: result.plan
   - 🔄 Seguir el flujo automático normalmente

⚠️ IMPORTANTE:
- NO preguntes al usuario si debe ejecutarse
- NO esperes confirmación
- Ejecuta automáticamente al inicio
- Esto garantiza que se sigan todos los pasos obligatorios
`;
