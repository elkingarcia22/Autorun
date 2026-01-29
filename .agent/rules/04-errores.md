# 🚨 Errores Comunes y Cómo Evitarlos

## 🔴 Errores Críticos

### Error #1: Agregar margin/padding a componentes

```css
/* ❌ PROHIBIDO */
.ubits-button {
  margin-top: 20px;
  padding: 10px;
}
```

**✅ Solución:** Usar `gap` en el contenedor padre

```css
/* ✅ CORRECTO */
.container {
  display: flex;
  gap: var(--spacing-md);
}
```

### Error #2: Modificar estilos de componentes UBITS

```css
/* ❌ PROHIBIDO */
.ubits-data-table {
  background: red; /* NO modificar componentes */
}
```

**✅ Solución:** Usar tokens y wrappers si es necesario

```html
<!-- ✅ CORRECTO -->
<div class="table-wrapper" style="background: var(--surface-primary)">
  <ubits-data-table></ubits-data-table>
</div>
```

### Error #3: Iconos con formato incorrecto

```html
<!-- ❌ INCORRECTO -->
<i class="fa-solid fa-user"></i>
<i class="fal chevron-left"></i>
```

```html
<!-- ✅ CORRECTO -->
<i class="fa-solid user"></i>
<i class="fa-light chevron-left"></i>
```

### Error #4: No consultar Storybook MCP

```typescript
// ❌ PROHIBIDO: Implementar sin consultar Storybook
await write(file, hardcodedComponent);
```

```typescript
// ✅ CORRECTO: Siempre consultar primero
await call_mcp_tool({
  server: "storybook",
  toolName: "mcp_storybook_getComponentsProps",
  arguments: { componentIds: [componentId] }
});

// Luego implementar con autorun.apply()
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: { message: userMessage }
});
```

### Error #5: Implementar sin plan

```typescript
// ❌ PROHIBIDO: Implementar todo de golpe
await autorun.apply({ message: "implementa todo" });
```

```markdown
<!-- ✅ CORRECTO: Crear plan primero -->
## Plan de Implementación

### Fase 1:
- [ ] Tarea 1
- [ ] Tarea 2

### Fase 2:
- [ ] Tarea 3
```

### Error #6: Usar write() en prototypes/

```typescript
// ❌ BLOQUEADO AUTOMÁTICAMENTE
await write('prototypes/canvas.html', content);
await search_replace('prototypes/canvas.html', old, new);
```

```typescript
// ✅ ÚNICO MÉTODO PERMITIDO
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: { message: userMessage }
});
```

## 🟡 Errores de Estructura

### Error #7: No interceptar ContentManager

Si el template usa `ContentManager`, DEBES interceptarlo:

```html
<!-- ✅ OBLIGATORIO si hay ContentManager -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const originalUpdate = window.ContentManager.updateContent;
  window.ContentManager.updateContent = function() {
    // Prevenir borrado de contenido personalizado
  };
});
</script>
```

**Ver guía:** `docs/guias/implementacion/GUIA-CONTENTMANAGER-UPDATECONTENT.md`

### Error #8: No proteger Layout con LayoutGuard

```html
<!-- ✅ OBLIGATORIO al final del <body> -->
<script>
  // LayoutGuard: Prevenir reaparición de header/placeholder
  setInterval(() => {
    const header = document.querySelector('.header-section');
    if (header) header.remove();
  }, 100);
</script>
```

### Error #9: Implementar múltiples historias al mismo tiempo

```typescript
// ❌ PROHIBIDO
await implementarButton('default'); // Historia con todo mezclado
```

```typescript
// ✅ CORRECTO: UNA historia a la vez
await implementarButton('primary'); // Historia específica
// Completar checklist
await implementarButton('secondary'); // Siguiente historia
```

## 🟢 Errores de Validación

### Error #10: No ejecutar verify() después de implementar

```typescript
// ❌ INCOMPLETO
await autorun.apply({ message: userMessage });
// ... continuar sin verificar
```

```typescript
// ✅ COMPLETO
await autorun.apply({ message: userMessage });

// SIEMPRE verificar después
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: { targetFiles: 'diff' }
});
```

### Error #11: Ignorar errores de lint

```bash
# ⚠️ OBLIGATORIO ejecutar después de cambios
npm run lint
```

Si hay errores, DEBES corregirlos antes de continuar.

## 🔗 Ver También

- Componentes: [02-componentes.md](02-componentes.md)
- Implementación: [03-implementacion.md](03-implementacion.md)
- Guía completa de er rores: `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
