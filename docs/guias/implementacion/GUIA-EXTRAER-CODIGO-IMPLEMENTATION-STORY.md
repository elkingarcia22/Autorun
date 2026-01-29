# Guía: Extraer Código de Historia "Implementation (Copy/Paste)"

> **Fecha:** 2025-01-23  
> **Propósito:** Documentar cómo extraer código exacto de la historia "implementation (copy/paste)" en Storybook para implementar componentes correctamente

---

## 🎯 Propósito

La historia "implementation (copy/paste)" en Storybook contiene el código exacto que debe usarse para implementar el componente. Esta historia está diseñada específicamente para ser copiada y pegada directamente.

**⚠️ CRÍTICO:** Esta historia DEBE ser consultada ANTES de implementar cualquier componente.

---

## 📋 Qué Extraer de la Historia "Implementation (Copy/Paste)"

### **1. Código HTML/JSX Completo**
- ✅ Estructura HTML exacta del componente
- ✅ Atributos y props exactos
- ✅ Estructura de datos (columnas, filas, etc.)

### **2. Configuración JavaScript**
- ✅ Configuración exacta de la función de creación (ej: `createDataTable()`)
- ✅ Estructura de columnas exacta (con tipos, IDs, títulos)
- ✅ Estructura de filas exacta (con IDs, valores, variantes)
- ✅ Callbacks y event handlers
- ✅ Configuración de header, footer, acciones

### **3. Estilos CSS (si aplica)**
- ✅ Clases CSS usadas
- ✅ Tokens de diseño usados
- ✅ Estilos inline necesarios (si los hay)

### **4. Dependencias**
- ✅ Scripts UMD necesarios
- ✅ Imports necesarios
- ✅ Componentes internos usados
- ✅ Orden de carga de scripts

### **5. Setup Requerido**
- ✅ Inicialización necesaria
- ✅ Providers o contextos requeridos
- ✅ Configuración global necesaria

---

## 🔍 Cómo Extraer el Código

### **Paso 1: Verificar que la Historia Existe**

```typescript
// 1. Listar todas las historias disponibles del componente
import { getAvailableStories } from '@autorun/core/helpers/storybookStories';

const stories = await getAvailableStories('data-data-table');

// 2. Buscar específicamente la historia "implementation (copy/paste)"
const implementationStory = stories.find(s => 
  s.name === 'implementation-copy-paste' || 
  s.name === 'implementation (copy/paste)' ||
  s.name.toLowerCase().includes('implementation') &&
  s.name.toLowerCase().includes('copy')
);

if (!implementationStory) {
  console.warn('⚠️ Historia "implementation (copy/paste)" no encontrada');
  // Usar historia alternativa (ver sección "Alternativas" abajo)
}
```

### **Paso 2: Navegar a la Historia**

```typescript
// Construir URL de la historia
const storyUrl = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${implementationStory.name}`;

// Navegar usando Browser MCP
await mcp_cursor-ide-browser_browser_navigate({ url: storyUrl });
await mcp_cursor-ide-browser_browser_snapshot();
```

### **Paso 3: Hacer Clic en Pestaña "Code"**

```typescript
// La pestaña "Code" muestra el código exacto del componente
// Este código está listo para copiar y pegar

// Buscar botón de pestaña "Code" en el snapshot
// Hacer clic en la pestaña "Code"
await mcp_cursor-ide-browser_browser_click({
  element: 'Code tab button',
  ref: 'ref-code-tab' // Obtener del snapshot
});

// Esperar a que se cargue el código
await mcp_cursor-ide-browser_browser_wait_for({ time: 1 });
await mcp_cursor-ide-browser_browser_snapshot();
```

### **Paso 4: Extraer Código del Snapshot**

```typescript
// El snapshot contiene el código en un elemento <pre><code>
// Extraer el código del snapshot

const snapshot = await mcp_cursor-ide-browser_browser_snapshot();

// Buscar elemento con código
// El código está en un elemento con role="text" o similar
// Extraer el texto completo del código

const codeElement = findCodeElementInSnapshot(snapshot);
const exactCode = codeElement.text || codeElement.value;
```

### **Paso 5: Parsear y Validar el Código**

```typescript
// Validar que el código es válido
import { parseAndValidateCode } from '@autorun/core/helpers/codeParser';

const parsedCode = await parseAndValidateCode(exactCode, {
  componentId: 'data-data-table',
  expectedFormat: 'javascript' // o 'html', 'jsx'
});

if (!parsedCode.valid) {
  throw new Error(`❌ Código extraído no es válido: ${parsedCode.errors.join(', ')}`);
}
```

---

## 📋 Checklist: Qué Extraer

### **De la Pestaña "Code":**
- [ ] ✅ Código HTML/JSX completo
- [ ] ✅ Configuración JavaScript completa
- [ ] ✅ Estructura de columnas exacta (con tipos, IDs, títulos)
- [ ] ✅ Estructura de filas exacta (con IDs, valores, variantes)
- [ ] ✅ Callbacks y event handlers
- [ ] ✅ Configuración de header, footer, acciones

### **De la Pestaña "Controls":**
- [ ] ✅ Todas las props disponibles
- [ ] ✅ Valores por defecto
- [ ] ✅ Tipos de datos
- [ ] ✅ Props requeridas vs opcionales
- [ ] ✅ Variantes disponibles

### **De la Pestaña "Docs":**
- [ ] ✅ API del componente
- [ ] ✅ Setup requerido
- [ ] ✅ Component Composition
- [ ] ✅ Best Practices
- [ ] ✅ Ejemplos del mundo real

### **De Storybook MCP:**
- [ ] ✅ Props estructuradas
- [ ] ✅ Tokens de diseño
- [ ] ✅ Variantes disponibles
- [ ] ✅ Dependencias

---

## ⚠️ Qué Hacer Cuando la Historia NO Existe

### **Opción 1: Usar Historia "Default"**

```typescript
// 1. Consultar historia "default"
const defaultStory = await extractExactCodeFromStorybookWithBrowser(
  'data-data-table',
  'default'
);

// 2. Extraer código de la pestaña "Code"
// 3. Adaptar código para el caso de uso específico
// 4. Verificar que funciona correctamente
```

**⚠️ Limitación:** La historia "default" puede tener múltiples funcionalidades mezcladas, lo que puede hacer difícil extraer solo lo necesario.

### **Opción 2: Usar Otras Historias Disponibles**

```typescript
// 1. Listar todas las historias disponibles
const stories = await getAvailableStories('data-data-table');

// 2. Buscar historia más similar al caso de uso
const similarStory = stories.find(s => 
  s.name.includes('encuestas') || 
  s.name.includes('lista') ||
  s.name.includes('tabla') ||
  s.name.includes('usuarios')
);

// 3. Si se encuentra, usar esa historia como referencia
if (similarStory) {
  const exactCode = await extractExactCodeFromStorybookWithBrowser(
    'data-data-table',
    similarStory.name
  );
}
```

### **Opción 3: Crear Historia "Implementation (Copy/Paste)"**

Si la historia no existe, se debe crear en Storybook:

```typescript
// Plantilla para crear la historia
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    // Configuración completa del componente
  },
  parameters: {
    docs: {
      source: {
        code: `
// Código exacto de implementación
window.createDataTable({
  // Configuración completa
});
        `,
      },
    },
  },
  render: (args) => {
    // Render del componente
  },
};
```

---

## 🎯 Ejemplo Completo: DataTable

### **Paso 1: Verificar Historia**

```typescript
const stories = await getAvailableStories('data-data-table');
const implementationStory = stories.find(s => 
  s.name === 'implementation-copy-paste'
);
```

### **Paso 2: Navegar y Extraer**

```typescript
// Navegar a la historia
const storyUrl = `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--${implementationStory.name}`;
await mcp_cursor-ide-browser_browser_navigate({ url: storyUrl });

// Hacer clic en pestaña "Code"
await mcp_cursor-ide-browser_browser_click({ element: 'Code tab', ref: 'ref-code-tab' });
await mcp_cursor-ide-browser_browser_snapshot();

// Extraer código
const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
const exactCode = extractCodeFromSnapshot(snapshot);
```

### **Paso 3: Usar en autorun.apply()**

```typescript
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: 'implementar DataTable usando código de historia implementation-copy-paste',
    targetFiles: [filePath],
    options: {
      useImplementationStory: true,
      implementationStoryName: 'implementation-copy-paste',
      exactCode: exactCode
    }
  }
});
```

---

## 🚨 Errores Comunes a Evitar

### **Error #1: NO consultar la historia "implementation (copy/paste)"**

**❌ INCORRECTO:**
```typescript
// Consultar solo la historia "default"
const code = await extractExactCodeFromStorybookWithBrowser('data-data-table', 'default');
```

**✅ CORRECTO:**
```typescript
// Buscar específicamente "implementation (copy/paste)"
const stories = await getAvailableStories('data-data-table');
const implementationStory = stories.find(s => s.name === 'implementation-copy-paste');
if (implementationStory) {
  const code = await extractExactCodeFromStorybookWithBrowser('data-data-table', implementationStory.name);
}
```

### **Error #2: NO extraer código de la pestaña "Code"**

**❌ INCORRECTO:**
```typescript
// Asumir estructura basándose en la vista previa
const code = generateCodeFromPreview();
```

**✅ CORRECTO:**
```typescript
// Extraer código exacto de la pestaña "Code"
await mcp_cursor-ide-browser_browser_click({ element: 'Code tab', ref: 'ref-code-tab' });
const code = extractCodeFromSnapshot(snapshot);
```

### **Error #3: Modificar el código extraído**

**❌ INCORRECTO:**
```typescript
// Modificar el código antes de usarlo
const modifiedCode = exactCode.replace('valor1', 'valor2');
```

**✅ CORRECTO:**
```typescript
// Usar el código exacto tal como está en Storybook
// Solo adaptar valores específicos del caso de uso (datos, no estructura)
const adaptedCode = adaptCodeForUseCase(exactCode, useCaseData);
```

---

## 📚 Referencias

- **Guía de implementación:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-AUTOMATICA-POR-HISTORIAS.md`
- **Configurar Storybook:** `docs/guias/implementacion/GUIA-CONFIGURAR-STORYBOOK-PARA-AUTORUN.md`
- **Estructura ideal:** `docs/referencia/ESTRUCTURA-IDEAL-STORYBOOK-COMPONENTE.md`

---

**Última actualización:** 2025-01-23  
**Versión:** 1.0.0

