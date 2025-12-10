# 🔄 Auto Reload Add-on

Add-on que recarga automáticamente la página del navegador cuando se detectan cambios en archivos. También agrega logs automáticos cuando hay errores y recarga después de arreglar problemas.

## 🎯 Características

- ✅ **Recarga automática**: Recarga la página cuando se detectan cambios en archivos `.html`, `.js` o `.css` en `prototypes/`
- ✅ **Logs automáticos**: Agrega logs automáticos cuando hay errores
- ✅ **Recarga después de arreglar**: Recarga automáticamente después de arreglar errores para ver los nuevos logs
- ✅ **Cooldown inteligente**: Evita recargas excesivas con un cooldown de 2 segundos

## 📋 Requisitos

- Browser MCP de Cursor disponible (para recarga automática)
- Add-on activado en la configuración de UBITS

## ⚙️ Configuración

El add-on se configura automáticamente en `UBITS_ADDONS_CONFIG`:

```typescript
'auto-reload': {
  enabled: true,
  reloadOnFileChange: true,
  autoLogErrors: true,
  reloadAfterFix: true,
}
```

## 🚀 Uso

### Recarga Automática

El add-on detecta automáticamente cambios en archivos y recarga la página:

```typescript
// Al guardar prototypes/canvas-encuestas.html
// → El sistema detecta el cambio
// → Espera 500ms para asegurar que el archivo se guardó
// → Recarga la página automáticamente
```

### Logs Automáticos

Cuando hay un error, el add-on agrega logs automáticamente:

```typescript
// Error detectado
await autoReloadAddon.onError(new Error('Checkbox no funciona'), { rowId: '123' });

// Logs agregados:
// 🔴 AutoReload: Error detectado, agregando logs automáticos...
//    Error: Checkbox no funciona
//    Contexto: { rowId: '123' }
```

### Recarga Después de Arreglar

Después de arreglar un error, el add-on recarga automáticamente:

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
✅ AutoReload Add-on inicializado con Browser MCP
🔄 AutoReload: URL detectada - http://localhost:3000/canvas-encuestas.html
```

### Verificar recargas automáticas

```typescript
// Al guardar un archivo
🔄 AutoReload: Cambio detectado en prototypes/canvas-encuestas.html
🔄 AutoReload: Recargando página - http://localhost:3000/canvas-encuestas.html
✅ AutoReload: Página recargada exitosamente
```

## ⚠️ Notas Importantes

1. **Browser MCP requerido**: La recarga automática solo funciona si el Browser MCP está disponible
2. **Solo archivos en prototypes/**: Solo se recargan archivos `.html`, `.js` o `.css` en `prototypes/`
3. **Cooldown de 2 segundos**: El sistema tiene un cooldown de 2 segundos entre recargas para evitar recargas excesivas

## 📚 Referencias

- `docs/guias/configuracion/GUIA-AUTO-RELOAD-LOGS.md` - Guía completa de uso
- `packages/addons/functional/auto-reload/src/AutoReloadAddon.ts` - Código fuente




