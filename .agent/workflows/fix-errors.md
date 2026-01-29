---
description: Corregir errores comunes en implementaciones de componentes UBITS
---

# Corregir Errores Comunes

Workflow sistemático para identificar y corregir los errores más comunes al implementar componentes UBITS.

---

## 🎯 Cuándo Usar

- Después de ejecutar `validate-implementation` y encontrar errores
- Cuando el componente no se ve como esperado
- Cuando lint reporta errores

---

## 🚨 Categorías de Errores

### 1. Errores de Spacing/Layout

#### Error: Componente tiene margin/padding agregado

**Cómo detectar:**
```typescript
const content = await view_file({ AbsolutePath: targetFile });

// Buscar margin/padding en clases ubits-*
const hasSpacingIssue = content.match(/ubits-\w+[^>]*style\s*=\s*["'][^"']*(?:margin|padding)/);
```

**Cómo corregir:**
```typescript
await replace_file_content({
  TargetFile: targetFile,
  TargetContent: `<button class="ubits-button" style="margin-top: 20px">`,
  ReplacementContent: `<button class="ubits-button">`,
  // Mover spacing al contenedor padre
  // Agregar wrapper con gap si es necesario
});
```

**Solución completa:**
```html
<!-- ❌ Antes -->
<button class="ubits-button" style="margin-top: 20px">Guardar</button>
<button class="ubits-button" style="margin-top: 20px">Cancelar</button>

<!-- ✅ Después -->
<div class="button-group" style="display: flex; gap: var(--spacing-md)">
  <button class="ubits-button">Guardar</button>
  <button class="ubits-button">Cancelar</button>
</div>
```

---

### 2. Errores de Iconos

#### Error: Iconos con prefijo fa- incorrecto

**Cómo detectar:**
```typescript
// Buscar pattern: class="fa-solid fa-iconname"
const iconErrors = content.match(/class="fa-(solid|light|regular|thin)\s+fa-\w+"/g);
```

**Cómo corregir:**
```typescript
// Patrón: fa-{style} fa-{icon} → fa-{style} {icon}
const correctedContent = content.replace(
  /class="(fa-(?:solid|light|regular|thin))\s+fa-(\w+)"/g,
  'class="$1 $2"'
);

await replace_file_content({
  TargetFile: targetFile,
  TargetContent: content,
  ReplacementContent: correctedContent
});
```

**Ejemplos:**
```html
<!-- ❌ Incorrecto -->
<i class="fa-solid fa-user"></i>
<i class="fa-light fa-chevron-left"></i>

<!-- ✅ Correcto -->
<i class="fa-solid user"></i>
<i class="fa-light chevron-left"></i>
```

---

### 3. Errores de Tokens

#### Error: Valores hardcodeados en lugar de tokens

**Cómo detectar:**
```typescript
// Buscar valores hexadecimales, px hardcodeados, etc.
const hardcodedColors = content.match(/#[0-9a-fA-F]{3,6}/g);
const hardcodedSizes = content.match(/\d+px(?!\s*var)/g);
```

**Cómo corregir:**
```typescript
// Mapa de reemplazos comunes
const tokenMap = {
  '#333': 'var(--text-primary)',
  '#666': 'var(--text-secondary)',
  '#f5f5f5': 'var(--surface-secondary)',
  '16px': 'var(--spacing-md)',
  '8px': 'var(--spacing-sm)',
  '24px': 'var(--spacing-lg)'
};

let correctedContent = content;
for (const [hardcoded, token] of Object.entries(tokenMap)) {
  correctedContent = correctedContent.replace(
    new RegExp(hardcoded, 'g'),
    token
  );
}
```

**Ejemplo:**
```css
/* ❌ Antes */
.container {
  background: #f5f5f5;
  padding: 16px;
  color: #333;
}

/* ✅ Después */
.container {
  background: var(--surface-secondary);
  padding: var(--spacing-md);
  color: var(--text-primary);
}
```

---

### 4. Errores de Estructura HTML

#### Error: Etiquetas no cerradas

**Cómo detectar:**
// turbo
```bash
npm run lint:file path/to/file.html
```

**Cómo corregir:**
```typescript
// Identificar línea del error del lint output
// Agregar etiqueta de cierre faltante

await replace_file_content({
  TargetFile: targetFile,
  TargetContent: `<div class="wrapper">`,
  ReplacementContent: `<div class="wrapper">\n  <!-- contenido -->\n</div>`,
  StartLine: errorLine - 2,
  EndLine: errorLine + 2
});
```

---

### 5. Errores de Event Listeners

#### Error: Event listeners no funcionan

**Cómo detectar:**
```typescript
await browser_subagent({
  Task: `
    Navigate to page
    Click on ${componentSelector}
    Check console for errors
    Verify expected action happens
  `
});
```

**Cómo corregir:**
```html
<!-- ❌ Incorrecto: addEventListener sin DOMContentLoaded -->
<script>
  document.querySelector('.ubits-button').addEventListener('click', handler);
</script>

<!-- ✅ Correcto: Esperar DOM ready -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.ubits-button')?.addEventListener('click', handler);
  });
</script>
```

---

## 🔄 Proceso de Corrección

### Paso 1: Identificar Error

```typescript
// Desde reporte de validación
const validationReport = `...`;

// O ejecutar validación nueva
await validate_implementation();
```

### Paso 2: Clasificar Error

```
Error de spacing → Categoría 1
Error de iconos → Categoría 2
Error de tokens → Categoría 3
Error HTML → Categoría 4
Error JS → Categoría 5
```

### Paso 3: Aplicar Corrección

Usar el método apropiado de la categoría correspondiente.

### Paso 4: Re-validar

```typescript
// Ejecutar validación de nuevo
await validate_implementation();

// Debe pasar todas las verificaciones
```

---

## 📋 Checklist de Corrección

```markdown
- [ ] Identificado tipo de error
- [ ] Aplicada corrección apropiada
- [ ] Verificada corrección visualmente
- [ ] Re-ejecutado lint (si aplica)
- [ ] Actualizado código en archivo
- [ ] Re-validado componente completo
- [ ] Documentado cambio realizado
```

---

## 🛠️ Herramientas de Corrección Automática

### Script 1: Corregir Iconos

```typescript
async function fixIcons(filePath: string) {
  let content = await view_file({ AbsolutePath: filePath });
  
  // Corregir pattern fa-style fa-icon → fa-style icon
  content = content.replace(
    /class="(fa-(?:solid|light|regular|thin))\s+fa-(\w+)"/g,
    'class="$1 $2"'
  );
  
  await replace_file_content({
    TargetFile: filePath,
    TargetContent: originalContent,
    ReplacementContent: content
  });
}
```

### Script 2: Corregir Spacing

```typescript
async function fixSpacing(filePath: string) {
  let content = await view_file({ AbsolutePath: filePath });
  
  // Remover margin/padding de componentes UBITS
  content = content.replace(
    /(class="ubits-\w+"[^>]*)\s+style="[^"]*(?:margin|padding)[^"]*"/g,
    '$1'
  );
  
  await replace_file_content({
    TargetFile: filePath,
    TargetContent: originalContent,
    ReplacementContent: content
  });
}
```

### Script 3: Aplicar Tokens

```typescript
async function applyTokens(filePath: string) {
  let content = await view_file({ AbsolutePath: filePath });
  
  const replacements = {
    '#333333': 'var(--text-primary)',
    '#666666': 'var(--text-secondary)',
    '#f5f5f5': 'var(--surface-secondary)',
    '16px': 'var(--spacing-md)',
    '8px': 'var(--spacing-sm)'
  };
  
  for (const [old, newVal] of Object.entries(replacements)) {
    content = content.replaceAll(old, newVal);
  }
  
  await replace_file_content(...);
}
```

---

## 📊 Reporte de Corrección

```markdown
## ✅ Reporte de Correcciones

**Archivo:** \`${targetFile}\`  
**Fecha:** ${new Date().toISOString()}

### Errores Corregidos:

1. **${errorType}**
   - **Problema:** ${problemDescription}
   - **Solución aplicada:** ${solutionApplied}
   - **Resultado:** ✅ Corregido

### Re-validación:

| Aspecto | Antes | Después |
|---------|-------|---------|
| Lint | ❌ ${lintErrorsBefore} errores | ✅ 0 errores |
| Visual | ❌ ${visualIssues} | ✅ Correcto |
| Funcionalidad | ❌ No funciona | ✅ Funciona |

### Conclusión:

✅ Todas las correcciones aplicadas exitosamente
```

---

## 🔗 Referencias

- **Errores comunes:** `.agent/rules/04-errores.md`
- **Validación:** `.agent/workflows/validate-implementation.md`
- **Componentes:** `.agent/rules/02-componentes.md`

---

**Versión:** 1.0.0  
**Última actualización:** 2026-01-29  
**Antigravity:** Compatible
