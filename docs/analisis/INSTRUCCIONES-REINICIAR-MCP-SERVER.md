# Instrucciones para Reiniciar el Servidor MCP de Autorun

## 🔄 Reinicio del Servidor MCP

El servidor MCP de Autorun se ejecuta automáticamente cuando Cursor se inicia. Para aplicar cambios en el código, necesitas reiniciar Cursor.

### Opción 1: Reiniciar Cursor (Recomendado)

1. **Cierra Cursor completamente**
2. **Vuelve a abrir Cursor**
3. El servidor MCP se iniciará automáticamente con el código actualizado

### Opción 2: Recargar Ventana de Cursor

1. Presiona `Cmd+Shift+P` (Mac) o `Ctrl+Shift+P` (Windows/Linux)
2. Escribe "Reload Window" o "Recargar Ventana"
3. Selecciona "Developer: Reload Window"
4. El servidor MCP se reiniciará automáticamente

### Opción 3: Verificar que el Servidor Está Corriendo

Si quieres verificar que el servidor está corriendo correctamente:

```bash
# Ver procesos del servidor MCP
ps aux | grep "autorun-mcp-server" | grep -v grep

# Si no hay procesos, el servidor se iniciará automáticamente cuando Cursor lo necesite
```

### ⚠️ Nota Importante

El servidor MCP se ejecuta como un proceso separado gestionado por Cursor. No necesitas ejecutarlo manualmente con `npm run autorun:mcp-server` a menos que estés haciendo pruebas locales.

## ✅ Verificación

Después de reiniciar Cursor, puedes verificar que el servidor está funcionando correctamente probando `autorun.apply()`:

```typescript
// Desde el agente de Cursor
await mcp_autorun_autorun_apply({
  message: "implementar un botón",
  targetFiles: ["prototypes/canvas-administrador-encuestas-2025-12-23.html"]
});
```

Si funciona correctamente, deberías ver `success: true` en lugar de errores de "Faltan pasos obligatorios".


