# 🔄 Guía: Recarga Automática y Logs Automáticos

## 📋 Resumen

El sistema de **Auto-Reload y Logs Automáticos** permite que Autorun:
1. **Recargue automáticamente la página** cuando se detectan cambios en archivos
2. **Agregue logs automáticos** cuando hay errores
3. **Recargue después de arreglar errores** para ver los nuevos logs

## 🎯 Objetivo

**Problema anterior:**
- El usuario tenía que recargar manualmente la página después de cada cambio
- Los logs no se actualizaban sin recargar manualmente
- El lint se ejecutaba automáticamente después de cada cambio, ralentizando el flujo

**Solución:**
- Recarga automática de página cuando se detectan cambios
- Logs automáticos cuando hay errores
- Lint solo cuando el usuario lo pide o hay un error real

## 🔧 Configuración

### 1. Add-on Auto-Reload

El add-on `auto-reload` se activa automáticamente cuando:
- Hay un Browser MCP disponible
- Se detectan cambios en archivos `.html`, `.js` o `.css` en `prototypes/`

### 2. Desactivar Lint Automático

**Antes:**
```markdown
- ✅ SIEMPRE ejecutar `npm run lint` después de implementar
```

**Ahora:**
```markdown
- ⚠️ NO ejecutar `npm run lint` automáticamente (solo cuando el usuario lo pida o haya un error real)
```

## 🚀 Uso

### Recarga Automática

El sistema recarga automáticamente la página cuando:
1. Se guarda un archivo `.html`, `.js` o `.css` en `prototypes/`
2. Han pasado al menos 2 segundos desde la última recarga (cooldown)

**Ejemplo:**
```typescript
// Al guardar prototypes/canvas-encuestas.html
// → El sistema detecta el cambio
// → Espera 500ms para asegurar que el archivo se guardó
// → Recarga la página automáticamente
```

### Logs Automáticos

Cuando hay un error, el sistema:
1. Detecta el error automáticamente
2. Agrega logs en la consola del servidor
3. Intenta agregar logs en la consola del navegador (si Browser MCP está disponible)

**Ejemplo:**
```typescript
// Error detectado
onError(new Error('Checkbox no funciona'), { rowId: '123' });

// Logs agregados:
// 🔴 AutoReload: Error detectado, agregando logs automáticos...
//    Error: Checkbox no funciona
//    Contexto: { rowId: '123' }
```

### Recarga Después de Arreglar

Después de arreglar un error, el sistema:
1. Recarga automáticamente la página
2. Espera 1 segundo
3. Toma un snapshot para verificar que la recarga fue exitosa

**Ejemplo:**
```typescript
// Después de arreglar un error
await autoReloadAddon.reloadAfterFix();

// → Recarga la página
// → Espera 1 segundo
// → Toma snapshot
// → Logs: ✅ AutoReload: Página recargada exitosamente
```

## 🔍 Debugging

### Verificar que Auto-Reload está activo

```typescript
// En la consola del servidor
✅ AutoReload Add-on inicializado
🔄 AutoReload: URL detectada - http://localhost:3000/canvas-encuestas.html
```

### Verificar recargas automáticas

```typescript
// Al guardar un archivo
🔄 AutoReload: Cambio detectado en prototypes/canvas-encuestas.html
🔄 AutoReload: Recargando página - http://localhost:3000/canvas-encuestas.html
✅ AutoReload: Página recargada exitosamente
```

### Verificar logs automáticos

```typescript
// Cuando hay un error
🔴 AutoReload: Error detectado, agregando logs automáticos...
   Error: Checkbox no funciona
   Contexto: { rowId: '123' }
```

## ⚙️ Configuración Avanzada

### Cooldown de Recarga

El sistema tiene un cooldown de 2 segundos entre recargas para evitar recargas excesivas:

```typescript
private readonly RELOAD_COOLDOWN = 2000; // 2 segundos
```

### Delay Antes de Recargar

El sistema espera 500ms después de detectar un cambio para asegurar que el archivo se guardó:

```typescript
setTimeout(async () => {
  await this.reloadPage();
}, 500);
```

## 🐛 Troubleshooting

### La página no se recarga automáticamente

**Verificar:**
1. ¿El add-on está activo?
   ```typescript
   console.log('AutoReload activo:', autoReloadAddon.active);
   ```

2. ¿El Browser MCP está disponible?
   ```typescript
   console.log('Browser MCP:', autoReloadAddon.browserMCP);
   ```

3. ¿El archivo está en `prototypes/`?
   - Solo se recargan archivos en `prototypes/`
   - Solo se recargan archivos `.html`, `.js` o `.css`

### Los logs no aparecen en el navegador

**Causa:** El Browser MCP puede no tener acceso a ejecutar scripts en el navegador.

**Solución:** Los logs aparecen en la consola del servidor. Para ver logs en el navegador, usar `browser_console_messages` del Browser MCP.

### Recargas muy frecuentes

**Causa:** Múltiples cambios en poco tiempo.

**Solución:** El sistema tiene un cooldown de 2 segundos. Si necesitas cambiar el cooldown:

```typescript
private readonly RELOAD_COOLDOWN = 5000; // 5 segundos
```

## 📚 Referencias

- `packages/addons/functional/auto-reload/src/AutoReloadAddon.ts`
- `docs/guias/configuracion/GUIA-INSTALACION-MCP-ADDONS.md`

## 🔄 Flujo Completo

```
1. Usuario hace cambio en archivo
   ↓
2. Sistema detecta cambio (onFileChange)
   ↓
3. Verifica que es archivo relevante (prototypes/*.html|js|css)
   ↓
4. Espera 500ms (asegurar que archivo se guardó)
   ↓
5. Recarga página (browserMCP.navigate)
   ↓
6. Espera 1 segundo
   ↓
7. Toma snapshot (verificar recarga exitosa)
   ↓
8. Logs: ✅ Página recargada exitosamente
```

## ⚠️ Notas Importantes

1. **Lint automático desactivado**: El lint ya no se ejecuta automáticamente después de cada cambio. Solo se ejecuta cuando:
   - El usuario lo pide explícitamente
   - Hay un error real que necesita verificación

2. **Recarga automática**: La recarga automática solo funciona si:
   - El Browser MCP está disponible
   - La URL actual está disponible
   - El archivo está en `prototypes/`

3. **Logs automáticos**: Los logs automáticos aparecen en:
   - Consola del servidor (siempre)
   - Consola del navegador (si Browser MCP tiene acceso)




