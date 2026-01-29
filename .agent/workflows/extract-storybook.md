---
description: Extraer código y props de componentes desde Storybook UBITS
---

# Extraer Componente desde Storybook

Workflow para extraer código HTML, props y documentación de componentes desde Storybook usando `browser_subagent`.

---

## 🎯 Cuándo Usar

- Necesitas el código exacto de un componente UBITS
- Quieres ver todas las variantes disponibles (historias)
- Necesitas documentar props y controles de un componente

---

## 📋 Prerequisitos

- [ ] Storybook ID conocido (ej: `components-button--primary`)
  - Si no lo conoces, consultar: `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`

---

## 🔄 Proceso

### Paso 1: Navegar a Storybook

**Opción A: Storybook Local**

// turbo
```bash
cd vendor/ubits/packages/storybook && npm run storybook
```

URL: http://localhost:6006

**Opción B: Storybook en Vercel (Recomendado)**

URL: https://ubits-storybook10.vercel.app/

💡 **Ventaja:** Siempre tiene la versión más reciente

---

### Paso 2: Extraer Código con Browser Subagent

```typescript
await browser_subagent({
  TaskName: "Extracting Storybook Component Code",
  Task: `
    Navigate to https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${storyName}
    
    ORDEN DE EXTRACCIÓN:
    
    1. IMPLEMENTATION story (si existe):
       - Navigate to ?path=/story/${componentId}--implementation
       - Click "Show code" or "Code" tab
       - Extract HTML from code snippet
       - This is copy/paste ready code
    
    2. DOCS page:
       - Navigate to ?path=/docs/${componentId}--docs
       - Extract:
         * Component description
         * All available props with types and defaults
         * Usage examples
         * Visual variants
    
    3. Controls/Props panel:
       - In any story, look at right panel
       - List all controls available:
         * Control name
         * Control type (select, boolean, text, etc.)
         * Default value
         * Available options (for select controls)
    
    4. Take screenshots of:
       - Rendered component
       - Code tab
       - Controls panel
       - Docs page
    
    RETURN:
    - Complete HTML code
    - List of all props with defaults
    - List of all stories/variants
    - Screenshots for reference
  `,
  RecordingName: "storybook_extraction"
});
```

---

### Paso 3: Documentar Información Extraída

```markdown
Crear archivo: `docs/referencia/componentes/${componentName}.md`

# ${componentName}

**ID Storybook:** \`${componentId}\`  
**Última extracción:** ${new Date().toISOString()}

## Historias Disponibles

${stories.map(s => `- **${s.name}:** ${s.description}`).join('\n')}

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
${props.map(p => `| ${p.name} | ${p.type} | ${p.default} | ${p.description} |`).join('\n')}

## Código HTML

### Story: ${storyName}

\`\`\`html
${extractedHTML}
\`\`\`

## Tokens Usados

${tokens.map(t => `- \`var(${t})\``).join('\n')}

## Screenshots

![${componentName} - Rendered](path/to/screenshot1.png)
![${componentName} - Code](path/to/screenshot2.png)
```

---

### Paso 4: Validar Código Extraído

```typescript
// Verificar que el código tiene:
// ✅ Clases UBITS correctas (ej: "ubits-button")
// ✅ Tokens CSS en lugar de valores hardcodeados
// ✅ Iconos con formato correcto (sin prefijo fa-)
// ✅ Atributos data-* si los tiene

// Si falta algo, volver a Paso 2 y re-extraer
```

---

## 🎯 Historias Prioritarias por Componente

Las historias tienen diferentes propósitos:

### 1. **Implementation** (⭐ PRIORITARIA)
- Código listo para copy/paste
- Props mínimas necesarias
- **Usar esta PRIMERO**

### 2. **Docs**
- Documentación completa
- Todos los props explicados
- Ejemplos de uso

### 3. **Default**
- Vista general con todos los controles
- Buena para explorar opciones
- **NO usar para extracción de código** (tiene todo mezclado)

### 4. **Historias específicas** (ej: Primary, Secondary)
- Variante específica configurada
- Útil para ver configuración exacta

---

## 📊 Orden de Navegación Recomendado

```
1. FIRST: /story/${id}--implementation  → Código copy/paste
2. SECOND: /docs/${id}--docs            → Documentación completa  
3. THIRD: /story/${id}--default         → Solo si falta algo
4. LAST: /story/${id}--${variant}       → Variantes específicas
```

---

## 🚨 Errores Comunes

### Error: No encuentro el código

**Solución:** Busca la pestaña "Code" o "Show code" en la UI de Storybook

### Error: El código tiene valores hardcodeados

**Solución:** Revisa la historia "implementation" en lugar de "default"

### Error: Los iconos aparecen con fa- prefijo

**Solución:** Remover manualmente. Cambiar `fa-solid fa-user` → `fa-solid user`

---

## 💡 Tips

### Tip 1: Guardar URL del template

Antes de navegar a Storybook, guarda la URL actual para regresar:

```typescript
const snapshot = await browser_snapshot();
const currentUrl = snapshot?.url;

// ... navegar a Storybook ...

// Regresar
await browser_navigate({ url: currentUrl });
```

### Tip 2: Múltiples componentes

Para extraer múltiples componentes, hazlo UNO a la vez:

```typescript
for (const componentId of componentIds) {
  await extractFromStorybook(componentId);
  // Documentar antes de continuar con el siguiente
}
```

### Tip 3: Verificar versión

Storybook en Vercel puede tener versión diferente a local:

- **Vercel:** Siempre deployment más reciente
- **Local:** Versión en `vendor/ubits/packages/storybook`

💡 **Recomendación:** Usar Vercel como fuente de verdad

---

## 🔗 Referencias

- **Catálogo:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- **Workflow de implementación:** `.agent/workflows/implement-component.md`
- **Reglas de componentes:** `.agent/rules/02-componentes.md`

---

**Versión:** 1.0.0  
**Última actualización:** 2026-01-29  
**Antigravity:** Compatible
