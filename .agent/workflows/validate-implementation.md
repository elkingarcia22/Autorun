---
description: Validar implementación de componentes y corregir errores
---

# Validar Implementación

Workflow para validar que los componentes implementados cumplen con estándares UBITS y no tienen errores.

---

## 🎯 Cuándo Usar

- Después de implementar cualquier componente
- Antes de marcar una tarea como completada
- Cuando hay comportamiento inesperado

---

## ✅ Checklist de Validación

### 1. Validación de Código (Lint)

// turbo
```bash
# Ejecutar linter
npm run lint

# Si hay errores específicos en un archivo:
npm run lint:file path/to/file.html
```

**Errores comunes:**
- Etiquetas HTML sin cerrar
- Atributos duplicados
- Estructura HTML inválida

---

### 2. Validación Visual

```typescript
await browser_subagent({
  TaskName: "Visual Validation of Component",
  Task: `
    Navigate to http://localhost:3000/${templateFileName}
    
    VERIFICAR:
    
    1. Renderizado:
       - ✅ El componente aparece en pantalla
       - ✅ Sin errores en consola del navegador
       - ✅ Estilos se aplican correctamente
    
    2. Spacing:
       - ✅ Spacing entre elementos usa tokens (gap, no margin)
       - ✅ No hay spacing excesivo o muy ajustado
       - ✅ Componente se alinea con diseño
    
    3. Tokens:
       - ✅ Colores usan tokens (--text-primary, --surface-secondary)
       - ✅ Tamaños de fuente usan tokens (--font-size-md)
       - ✅ Spacing usa tokens (--spacing-md)
    
    4. Iconos:
       - ✅ Iconos aparecen correctamente
       - ✅ Tamaño de iconos es apropiado
       - ✅ Color de iconos usa tokens
    
    5. Interactividad (si aplica):
       - ✅ Hover states funcionan
       - ✅ Click events se disparan
       - ✅ Focus states son visibles
    
    Take screenshots of:
    - Component in normal state
    - Component in hover state (if interactive)
    - Component in different viewport sizes (if responsive)
    - Browser console (to show no errors)
    
    Return validation results with screenshots
  `,
  RecordingName: "component_validation"
});
```

---

### 3. Validación de Estructura HTML

```typescript
// Leer el archivo implementado
const content = await view_file({
  AbsolutePath: targetFilePath
});

// Verificar:
// ✅ Usa clases UBITS correctas (ubits-button, ubits-data-table, etc.)
// ✅ NO tiene estilos inline excesivos
// ✅ NO tiene margin/padding agregado a componentes
// ✅ Usa estructura semántica HTML5
```

**Checklist:**
```markdown
- [ ] Clases UBITS presentes
- [ ] Sin estilos inline innecesarios
- [ ] Sin margin/padding en componentes
- [ ] Estructura semántica (header, main, section, etc.)
- [ ] Accesibilidad básica (alt en imágenes, labels en inputs)
```

---

### 4. Validación de Tokens

```typescript
// Buscar en el código valores hardcodeados
const hardcodedValues = content.match(/(color|background|padding|margin):\s*[^v]/g);

if (hardcodedValues) {
  console.warn('❌ Valores hardcodeados encontrados:');
  console.warn(hardcodedValues);
  
  // Sugerir tokens equivalentes
  // Ejemplo: color: #333 → var(--text-primary)
}
```

**Tokens comunes:**
```css
/* Colores */
var(--text-primary)
var(--text-secondary)
var(--surface-primary)
var(--surface-secondary)
var(--accent-primary)

/* Spacing */
var(--spacing-xs)   /* 4px */
var(--spacing-sm)   /* 8px */
var(--spacing-md)   /* 16px */
var(--spacing-lg)   /* 24px */
var(--spacing-xl)   /* 32px */

/* Tipografía */
var(--font-size-sm)
var(--font-size-md)
var(--font-size-lg)
```

---

### 5. Validación de Funcionalidad

```typescript
// Si el componente es interactivo, crear test manual
await browser_subagent({
  TaskName: "Functional Testing",
  Task: `
    Navigate to component page
    
    TEST CASES:
    
    1. Primary functionality:
       - [Describir acción principal]
       - Expected: [Resultado esperado]
       - Verify: [Cómo verificar]
    
    2. Edge cases:
       - Empty state
       - Maximum data
       - Error states
    
    3. Event listeners:
       - Click events work
       - Form submissions work
       - Data updates correctly
    
    Return: Pass/Fail for each test case with evidence
  `,
  RecordingName: "functional_testing"
});
```

---

## 🚨 Errores Críticos a Verificar

### Error #1: Margin/Padding en Componentes

```html
<!-- ❌ MAL -->
<button class="ubits-button" style="margin-top: 20px">
  ...
</button>

<!-- ✅ BIEN -->
<div class="button-container" style="display: flex; gap: var(--spacing-md)">
  <button class="ubits-button">...</button>
</div>
```

### Error #2: Iconos Incorrectos

```html
<!-- ❌ MAL -->
<i class="fa-solid fa-user"></i>

<!-- ✅ BIEN -->
<i class="fa-solid user"></i>
```

### Error #3: Tokens No Usados

```css
/* ❌ MAL */
.container {
  background: #f5f5f5;
  padding: 16px;
}

/* ✅ BIEN */
.container {
  background: var(--surface-secondary);
  padding: var(--spacing-md);
}
```

---

## 📊 Reporte de Validación

Al finalizar, crear reporte:

```markdown
## ✅ Reporte de Validación: ${componentName}

**Archivo:** \`${targetFilePath}\`  
**Fecha:** ${new Date().toISOString()}

### Resultados:

| Aspecto | Estado | Notas |
|---------|--------|-------|
| Lint | ✅/❌ | ${lintNotes} |
| Visual | ✅/❌ | ${visualNotes} |
| Estructura HTML | ✅/❌ | ${structureNotes} |
| Tokens | ✅/❌ | ${tokensNotes} |
| Funcionalidad | ✅/❌ | ${functionalityNotes} |

### Errores Encontrados:

${errors.length > 0 ? errors.map(e => `- ${e}`).join('\n') : 'Ninguno'}

### Acciones Correctivas:

${fixes.length > 0 ? fixes.map(f => `- [ ] ${f}`).join('\n') : 'Ninguna necesaria'}

### Screenshots:

![Validación Visual](path/to/screenshot.png)

### Conclusión:

${allPassed ? '✅ Validación exitosa' : '❌ Requiere correcciones'}
```

---

## 🔄 Si Hay Errores

1. **Documentar errores** en reporte
2. **Usar workflow fix-errors** para corregir
3. **Re-validar** después de correcciones
4. **No continuar** hasta que validación pase

---

## 🔗 Referencias

- **Errores comunes:** `.agent/rules/04-errores.md`
- **Workflow de corrección:** `.agent/workflows/fix-errors.md`
- **Reglas de componentes:** `.agent/rules/02-componentes.md`

---

**Versión:** 1.0.0  
**Última actualización:** 2026-01-29  
**Antigravity:** Compatible
