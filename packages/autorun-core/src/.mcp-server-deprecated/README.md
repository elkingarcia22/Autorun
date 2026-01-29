# ⚠️ MCP Server - DEPRECADO

**Este directorio contiene el MCP Server viejo que ha sido reemplazado por el MCP v2.**

## 📋 Estado

- ❌ **DEPRECADO** - No usar
- ✅ **Reemplazado por:** `mcp-server-v2/`
- 📅 **Fecha de deprecación:** 2025-01-24

## 🔄 Migración

El nuevo MCP v2 está en `packages/autorun-core/src/mcp-server-v2/` y se instala automáticamente con el wizard.

**No es necesario hacer nada manualmente** - el wizard ya usa el nuevo MCP v2.

## 📁 Estructura Actual

Este directorio todavía contiene:
- `tools/` - Tools del MCP viejo (aún se usan desde mcp-server-v2)
- `helpers/` - Helpers del MCP viejo (aún se usan desde mcp-server-v2)
- `types.ts` - Tipos (aún se usan desde mcp-server-v2)
- `index.ts` - Exportaciones (aún se usan desde mcp-server-v2)

**Nota:** Los tools y helpers del MCP viejo todavía se usan desde el MCP v2, por lo que NO deben eliminarse todavía.

## 🗑️ Eliminación Futura

Este directorio puede ser eliminado después de:
1. ✅ Verificar que el MCP v2 funciona correctamente
2. ✅ Migrar todos los tools y helpers al MCP v2
3. ✅ Actualizar todas las referencias
