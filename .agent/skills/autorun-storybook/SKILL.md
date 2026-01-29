---
name: Autorun Storybook
description: Interactuar con Storybook UBITS para extraer componentes y documentación
---

# Autorun Storybook Skill

Skill especializado para trabajar con Storybook UBITS: extraer código, documentación, props y variantes de componentes.

---

## 🎯 Cuándo Usar Este Skill

Usa este skill cuando:
- Necesitas el código exacto de un componente UBITS
- Quieres ver todas las variantes disponibles de un componente
- Necesitas documentar props y controles
- Quieres ver ejemplos de uso de un componente
- Necesitas validar que un componente existe

**Palabras clave:**
- "busca en Storybook", "consulta Storybook"
- "qué props tiene", "qué variantes hay"
- "código de ejemplo", "cómo usar"

---

## 📖 Información de Storybook

### URLs Disponibles:

1. **Storybook en Vercel** (⭐ Recomendado)
   - URL: https://ubits-storybook10.vercel.app/
   - Ventaja: Siempre deployment más reciente
   - Uso: Consulta principal de componentes

2. **Storybook Local**
   - Iniciar: `cd vendor/ubits/packages/storybook && npm run storybook`
   - URL: http://localhost:6006
   - Ventaja: Mismo código que en repo
   - Uso: Testing de cambios locales

### Estructura de URLs:

```
Story (historia específica):
https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${storyName}

Docs (documentación):
https://ubits-storybook10.vercel.app/?path=/docs/${componentId}--docs

Ejemplo Button Primary:
https://ubits-storybook10.vercel.app/?path=/story/components-button--primary
```

---

## 🔄 Proceso del Skill

### Paso 1: Obtener ID de Componente

**Método 1: Desde Catálogo**
```typescript
const catalogo = await view_file({
  AbsolutePath: '/path/to/docs/referencia/CATALOGO-COMPONENTES-UBITS.md'
});

// Buscar componente por nombre
// Ejemplo: Button → components-button
```

**Método 2: Búsqueda en Storybook**
```typescript
await browser_subagent({
  Task: `
    Navigate to https://ubits-storybook10.vercel.app/
    Search for "${componentName}" in search bar
    Return the component ID found
  `
});
```

### Paso 2: Navegar a Historias Prioritarias

**Orden de prioridad:**

1. **FIRST: Implementation Story**
   ```
   ?path=/story/${componentId}--implementation
   ```
   - Código listo para copy/paste
   - Props mínimas necesarias
   - **Usar esta primero**

2. **SECOND: Docs**
   ```
   ?path=/docs/${componentId}--docs
   ```
   - Documentación completa
   - Todos los props explicados
   - Ejemplos de uso

3. **THIRD: Specific Stories**
   ```
   ?path=/story/${componentId}--primary
   ?path=/story/${componentId}--secondary
   ```
   - Variantes específicas configuradas
   - Útil para ver configuración exacta

4. **LAST: Default** (solo si falta algo)
   ```
   ?path=/story/${componentId}--default
   ```
   - Vista general con todos los controles
   - Buena para explorar
   - **NO usar para extracción** (todo mezclado)

### Paso 3: Extraer Información

```typescript
await browser_subagent({
  TaskName: "Extract Component Information",
  Task: `
    ORDEN DE EXTRACCIÓN:
    
    1. Navigate to implementation story:
       https://ubits-storybook10.vercel.app/?path=/story/${componentId}--implementation
       
       - Click "Show code" or "Code" tab
       - Extract complete HTML
       - This is copy/paste ready
    
    2. Navigate to Docs:
       https://ubits-storybook10.vercel.app/?path=/docs/${componentId}--docs
       
       - Extract component description
       - List all props with:
         * Name
         * Type
         * Default value
         * Description
       - Extract usage examples
    
    3. In Controls panel (any story):
       - List all controls available
       - Note control types (select, boolean, text)
       - Note default values
       - Note available options (for selects)
    
    4. Screenshots:
       - Component rendered
       - Code tab
       - Controls panel
       - Docs page
    
    RETURN IN FORMAT:
    {
      "html": "...",
      "props": [{name, type, default, description}],
      "stories": ["implementation", "primary", "secondary"],
      "controls": [{name, type, options, default}]
    }
  `,
  RecordingName: "storybook_extraction"
});
```

### Paso 4: Documentar Información

```markdown
Crear: docs/referencia/componentes/${componentName}.md

# ${componentName}

**ID Storybook:** \`${componentId}\`  
**Última extracción:** ${new Date().toISOString()}

## Historias Disponibles

${stories.map(s => `- ${s.name}: ${s.url}`).join('\n')}

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
${props.map(p => `| ${p.name} | ${p.type} | ${p.default} | ${p.description} |`).join('\n')}

## Código HTML (Implementation)

\`\`\`html
${extractedHTML}
\`\`\`

## Tokens CSS Usados

${tokens.map(t => `- \`var(${t})\``).join('\n')}

## Ejemplos de Uso

### Básico
\`\`\`html
${basicExample}
\`\`\`

### Con Props
\`\`\`html
${propsExample}
\`\`\`
```

---

## 🎯 Casos de Uso Comunes

### Caso 1: Verificar que Componente Existe

```typescript
// Antes de implementar, verificar existencia
const exists = await checkComponentExists("ComponentName");

if (!exists) {
  console.error("❌ Componente no encontrado en Storybook");
  console.log("Ver catálogo: docs/referencia/CATALOGO-COMPONENTES-UBITS.md");
}
```

### Caso 2: Listar Todas las Variantes

```typescript
// Para un componente, listar todas sus historias
await browser_subagent({
  Task: `
    Navigate to Storybook
    Search for ${componentName}
    In left sidebar, list all stories under this component
    Return: story names and their purpose
  `
});

// Ejemplo Button retorna:
// - default: Vista general
// - primary: Botón primario
// - secondary: Botón secundario
// - ghost: Botón fantasma
// - implementation: Código listo para usar
```

### Caso 3: Comparar Variantes

```typescript
// Ver diferencias entre variantes
const variants = ['primary', 'secondary', 'ghost'];

for (const variant of variants) {
  await browser_subagent({
    Task: `
      Navigate to ?path=/story/${componentId}--${variant}
      Screenshot the component
      Extract the props used
      Return differences
    `
  });
}
```

---

## 🚨 Reglas Críticas

### ✅ SIEMPRE:

1. **Priorizar historia "implementation"**
   - Tiene código optimizado
   - Props mínimas
   - Listo para copy/paste

2. **Guardar URL del template antes de navegar**
   ```typescript
   const snapshot = await browser_snapshot();
   const currentUrl = snapshot?.url;
   
   // ... navegar a Storybook ...
   
   // Regresar
   await browser_navigate({ url: currentUrl });
   ```

3. **Verificar tokens en código extraído**
   - Debe usar `var(--token-name)`
   - NO valores hardcodeados
   - Si tiene hardcoded → reportar

4. **Documentar historias encontradas**
   - Ayuda a futuras implementaciones
   - Permite reutilizar información

### ❌ NUNCA:

- Usar historia "default" para extracción
- Hardcodear valores sin consultar Storybook
- Asumir que un componente existe sin verificar
- Mezclar código de múltiples historias

---

## 📊 Reporte de Extracción

```markdown
## ✅ Extracción de Storybook: ${componentName}

**ID:** \`${componentId}\`  
**Fecha:** ${date}  
**Fuente:** ${sourceUrl}

### Historias Encontradas:
${stories.map(s => `- ${s.name} (${s.url})`).join('\n')}

### Props Extraídos:
${props.length} props documentados

### Código HTML:
${htmlLines} líneas de HTML

### Tokens Usados:
${tokens.length} tokens CSS

### Validación:
- ✅ Código usa tokens
- ✅ Estructura HTML válida
- ✅ Props documentados
- ✅ Screenshots capturados

### Archivos Creados:
- docs/referencia/componentes/${componentName}.md
- screenshots/${componentName}_*.png
```

---

## 💡 Tips

### Tip 1: Caché de Información

```typescript
// Si ya extrajiste un componente, no volver a extraer
// Check: docs/referencia/componentes/${componentName}.md

if (await fileExists(componentDocPath)) {
  // Leer info existente
  // Solo re-extraer si cambió algo
}
```

### Tip 2: Búsqueda por Categoría

```typescript
// Storybook organiza por categorías:
// - Components > Button
// - Components > DataTable
// - Forms > Input
// - Layout > Card
```

### Tip 3: Versiones

```typescript
// Storybook en Vercel puede tener versión diferente a local
// SIEMPRE usar Vercel como fuente de verdad
// Local solo para testing de cambios
```

---

## 🔗 Referencias

- **Workflow:** `.agent/workflows/extract-storybook.md`
- **Catálogo:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- **Storybook URL:** https://ubits-storybook10.vercel.app/

---

**Versión:** 1.0.0  
**Creado:** 2026-01-29  
**Antigravity:** Compatible  
**Reemplaza:** MCP `mcp_storybook_getComponentsProps` y `get_storybook_component`
