# ✅ Autorun MCP Server v2

**Servidor MCP completamente reescrito desde cero - limpio, robusto y bien estructurado**

## 🎯 Objetivo

Crear un servidor MCP limpio y funcional que:
- ✅ Integre con las funciones existentes de Autorun
- ✅ Mantenga estructura limpia y fácil de mantener
- ✅ Funcione correctamente sin errores
- ✅ Sea robusto y maneje errores correctamente

## 📋 Estructura

```
mcp-server-v2/
├── types.ts              # Tipos TypeScript limpios
├── server.ts             # Servidor MCP principal
├── cli.ts                # Punto de entrada CLI
├── tools/
│   ├── apply.ts          # Tool: autorun.apply() ⭐ CRÍTICO
│   ├── verify.ts         # Tool: autorun.verify()
│   └── plan.ts           # Tool: autorun.plan()
└── README.md             # Esta documentación
```

## 🚀 Uso

### Instalación

1. Compilar el proyecto:
```bash
cd packages/autorun-core
npm run build
```

2. Configurar `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "autorun": {
      "command": "node",
      "args": [
        "packages/autorun-core/dist/cli/autorun-mcp-server-v2.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

3. Reiniciar Cursor completamente

### Tools Disponibles (11 tools)

#### **Tools Principales:**

1. **`autorun.plan`** - Genera plan de implementación sin ejecutar
2. **`autorun.apply`** ⭐ - Ejecuta TODO el flujo de implementación automáticamente
3. **`autorun.verify`** - Verifica archivos generados correctamente
4. **`autorun.checklist`** - Obtiene checklist de implementación

#### **Tools de Storybook:**

5. **`autorun.storybook.start`** - Inicia servidor de Storybook local
6. **`autorun.storybook.build`** - Construye Storybook estático
7. **`autorun.storybook.extract`** - Extrae código HTML/JS desde Storybook

#### **Tools de Add-ons:**

8. **`autorun.problems.list`** - Lista problemas detectados por Problem Tracker
9. **`autorun.github.commit`** - Hace commit manual de archivos en GitHub
10. **`autorun.lint`** - Ejecuta ESLint en archivos
11. **`autorun.visual.test`** - Ejecuta tests visuales con Chromatic

**Todos los tools integran con las funciones existentes del MCP anterior, manteniendo compatibilidad total.**

## 🔧 Características

### ✅ Integración Limpia
- Usa las funciones existentes de Autorun (`autorunApply`, `autorunVerify`, `autorunPlan`)
- Mantiene estructura limpia y fácil de mantener
- No duplica código innecesariamente

### ✅ Manejo de Errores Robusto
- Captura y maneja errores correctamente
- Retorna mensajes de error claros
- No cierra el servidor por errores recuperables

### ✅ Logging Claro
- Usa `console.error` para logs (stderr)
- Logs estructurados y fáciles de seguir
- Información de debug útil

## 🐛 Solución de Problemas

### El servidor no inicia
1. Verificar que el proyecto esté compilado: `npm run build`
2. Verificar que el path en `.cursor/mcp.json` sea correcto
3. Reiniciar Cursor completamente

### Los tools no funcionan
1. Verificar logs en `View > Output > MCP` en Cursor
2. Verificar que las funciones originales de Autorun estén disponibles
3. Verificar que AutorunHub esté inicializado

### Errores de importación
1. Verificar que todas las dependencias estén instaladas
2. Verificar que el build esté actualizado
3. Verificar paths de importación

## 📝 Notas

- ⚠️ Este MCP v2 integra con las funciones existentes de Autorun
- ⚠️ No duplica lógica, solo proporciona una interfaz limpia
- ⚠️ Todos los tools usan las funciones originales del MCP anterior
- ⚠️ El objetivo es tener un servidor MCP limpio y funcional

