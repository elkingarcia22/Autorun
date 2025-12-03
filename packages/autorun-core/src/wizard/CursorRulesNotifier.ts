/**
 * CursorRulesNotifier
 * 
 * Genera notificaciones y archivos para que Cursor AI tenga contexto completo
 * de las reglas y documentación después de ejecutar el wizard.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export class CursorRulesNotifier {
	private projectPath: string;

	constructor(projectPath: string) {
		this.projectPath = projectPath;
	}

	/**
	 * Genera un archivo de resumen de reglas para Cursor
	 */
	async generateRulesSummary(): Promise<string> {
		const summaryPath = path.join(this.projectPath, '.cursor', 'INICIO-SESION.md');
		const summaryContent = `# 🚀 Inicio de Sesión - Reglas y Contexto

**Este archivo se genera automáticamente después de ejecutar el wizard.**

## 📋 Estado del Proyecto

✅ **Wizard completado exitosamente**
✅ **Templates creados en \`prototypes/\`**
✅ **Reglas de Cursor configuradas**

---

## 🎯 Reglas de Cursor Configuradas

### Archivos de Reglas Principales:

1. **\`.cursorrules\`** - Reglas principales (Cursor lo lee automáticamente)
2. **\`.cursor/CHECK-INICIAL-OBLIGATORIO.md\`** - Verificación inicial obligatoria
3. **\`.cursor/DETECCION-IMAGEN.md\`** - Detección de triggers de imagen
4. **\`.cursor/REGLAS-COMPONENTES.md\`** - Reglas para componentes UBITS
5. **\`.cursor/REGLAS-IMPLEMENTACION.md\`** - Reglas de implementación paso a paso
6. **\`.cursor/ERRORES-COMUNES.md\`** - Errores comunes a evitar

### Guías de Análisis:

- **\`docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md\`** - Distinguir SubNav de Tabs
- **\`docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md\`** - Análisis de estructura y spacing
- **\`docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md\`** - Análisis detallado de iconos
- **\`docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md\`** - Análisis completo de DataTable

### Guías de Implementación:

- **\`docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md\`** - Crear desde imagen después del wizard
- **\`docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md\`** - Proceso de implementación paso a paso
- **\`docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md\`** - Implementación de DataTable paso a paso
- **\`docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md\`** - ⚠️ **OBLIGATORIO:** Usar MCPs para consultar componentes exactamente como están

### Guías de Referencia:

- **\`docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md\`** - ContentManager y updateContent
- **\`docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md\`** - Cómo usar componentes UBITS
- **\`docs/guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md\`** - Cómo identificar componentes desde imágenes
- **\`docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md\`** - Errores comunes con componentes UBITS
- **\`docs/guias/referencia/GUIA-REVISION-COMPONENTES-UBITS.md\`** - Cómo revisar componentes antes de implementar

---

## ⚠️ Proceso Obligatorio para Cursor AI

### Al inicio de CADA mensaje, Cursor AI DEBE:

1. ✅ **Leer \`.cursorrules\` completo** (Cursor lo hace automáticamente)
2. ✅ **Leer \`.cursor/CHECK-INICIAL-OBLIGATORIO.md\`** usando \`read_file()\`
3. ✅ **Verificar triggers de imagen** en el mensaje del usuario
4. ✅ **Si hay triggers, leer todas las guías obligatorias:**
   - \`AUTO-DETECT-IMAGES.md\`
   - \`VERIFICACION-IMAGEN.md\`
   - \`BLOQUEO-IMAGEN.md\`
   - \`docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md\`
   - \`docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md\`
   - \`docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md\`
   - \`docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md\`
   - \`docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md\`
   - \`docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md\`
5. ✅ **NO usar herramientas de escritura** hasta completar verificación
6. ✅ **Mostrar análisis completo** antes de implementar
7. ✅ **Esperar aprobación explícita** del usuario

---

## 📚 Catálogo de Componentes

**Ubicación:** \`CATALOGO-COMPONENTES-UBITS.md\`

**Componentes principales:**
- Sidebar (\`window.createSidebar()\`)
- SubNav (\`window.createSubNav()\`) - Ya existe en template, NO implementar
- Tabs (\`window.createTabs()\`) - Tabs adicionales dentro del contenido
- DataTable (\`window.createDataTable()\`) - Incluye título, contador, búsqueda, filtros, botones y tabla
- HeaderSection - Verificar si existe en imagen antes de eliminar

---

## 🎯 Reglas Críticas

### 1. SubNav vs Tabs
- **SubNav:** Barra horizontal debajo del header → Ya existe, NO implementar
- **Tabs:** Tabs dentro del contenido → Se implementa con \`window.createTabs()\`

### 2. DataTable Completo
- **DataTable incluye TODO:** Título, contador, búsqueda, filtros, botones y tabla
- **NO crear contenedores separados** para título o barra de acciones
- **Solo crear contenedor:** \`#encuestas-table-container\`

### 3. HeaderSection
- **Verificar SIEMPRE** si existe en la imagen antes de eliminar
- **Solo eliminar** si NO está en la imagen
- **Verificar módulo** antes de eliminar: \`if (section !== 'encuestas') return\`

### 4. Estructura Base
- **Solo crear contenedores vacíos** (sin textos)
- **NO crear textos** en la estructura base
- **Los textos se configuran** en las opciones de los componentes

---

## 💡 Tips para Cursor AI

1. **Siempre usar MCPs disponibles** antes de implementar componentes
   - Consultar Storybook MCP para props, tokens, estructura exacta
   - NO asumir props o estructura sin consultar MCP primero
2. **Siempre verificar módulo** antes de hacer cambios
3. **Siempre medir spacing visualmente** (NO asumir)
4. **Siempre verificar iconos** con variaciones (simple, regular, solid)
5. **Siempre interceptar ContentManager** si agregas elementos a \`.content-area\`
6. **Siempre implementar paso a paso** (una tarea a la vez)
7. **Siempre pedir aprobación** antes de continuar

## 🔌 MCPs y Add-ons Disponibles

### MCPs Configurados:

- **Storybook MCP** ⭐ - Consultar componentes UBITS (props, tokens, estructura)
  - Herramientas: \`mcp_storybook_getComponentList\`, \`mcp_storybook_getComponentsProps\`
  - URL: \`http://localhost:6006/index.json\` (requiere Storybook corriendo)
- **Figma MCP** - Consultar tokens de diseño desde Figma
- **Supabase MCP** - Consultar esquemas de base de datos
- **GitHub MCP** - Consultar código de componentes
- **Vercel MCP** - Consultar deployments y proyectos

### Regla Crítica:

**ANTES de implementar cualquier componente UBITS:**
1. ✅ Consultar Storybook MCP para obtener props exactas
2. ✅ Consultar Storybook directamente para ver Controls, Tokens, Ejemplos
3. ✅ Implementar con información exacta obtenida del MCP

**NO implementar componentes sin consultar MCPs primero.**

---

**Última actualización:** Generado automáticamente por el wizard  
**Fecha:** ${new Date().toISOString().split('T')[0]}

`;

		try {
			// Asegurar que el directorio .cursor existe
			const cursorDir = path.join(this.projectPath, '.cursor');
			await fs.mkdir(cursorDir, { recursive: true });

			// Escribir el archivo
			await fs.writeFile(summaryPath, summaryContent, 'utf-8');
			return summaryPath;
		} catch (error) {
			console.warn('⚠️  No se pudo generar resumen de reglas:', error);
			return '';
		}
	}

	/**
	 * Genera mensaje final para mostrar al usuario
	 */
	getFinalMessage(): string {
		return `
📚 REGLAS DE CURSOR CONFIGURADAS

✅ Cursor AI leerá automáticamente las reglas al inicio de cada sesión.

📋 Archivos de reglas principales:
   • .cursorrules (Cursor lo lee automáticamente)
   • .cursor/CHECK-INICIAL-OBLIGATORIO.md
   • .cursor/DETECCION-IMAGEN.md
   • .cursor/REGLAS-COMPONENTES.md
   • .cursor/REGLAS-IMPLEMENTACION.md
   • .cursor/ERRORES-COMUNES.md

💡 IMPORTANTE:
   • Cursor leerá automáticamente .cursorrules al inicio
   • Si trabajas con imágenes, Cursor seguirá el proceso de bloqueo automáticamente
   • Todas las guías están disponibles en docs/guias/

📄 Se generó un resumen en: .cursor/INICIO-SESION.md
   (Puedes leerlo manualmente si necesitas referencia rápida)

🎯 Ya puedes empezar a trabajar con Cursor AI. Las reglas están configuradas.
`;
	}
}

