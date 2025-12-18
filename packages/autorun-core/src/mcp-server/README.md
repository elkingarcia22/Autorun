# Autorun MCP Server

**Servidor MCP (Model Context Protocol) para Autorun**

Este servidor MCP expone tools que permiten implementar componentes desde Storybook de forma **forzosa y automática**, garantizando que se ejecute todo el flujo completo.

---

## 🎯 Objetivo

Resolver el problema de que el agente (IA) puede saltarse el flujo automático de Autorun usando `write()` y `search_replace()` directamente. Con el MCP server, el agente **DEBE** usar `autorun.apply()`, que es el único camino válido.

---

## 📋 Estructura

```
mcp-server/
├── types.ts                    # Tipos TypeScript para todos los tools
├── autorunMCPServer.ts         # Servidor MCP principal
├── index.ts                    # Exportaciones
├── helpers/
│   ├── addonOrchestrator.ts    # Orquestador de add-ons
│   └── codeMarkGenerator.ts    # Generador de marcas Autorun
└── tools/
    ├── autorunPlan.ts          # Tool: autorun.plan()
    ├── autorunApply.ts          # Tool: autorun.apply() ⭐ CRÍTICO
    ├── autorunVerify.ts        # Tool: autorun.verify()
    ├── autorunChecklist.ts     # Tool: autorun.checklist()
    ├── autorunStorybookStart.ts # Tool: autorun.storybook.start()
    ├── autorunStorybookBuild.ts # Tool: autorun.storybook.build()
    ├── autorunProblemsList.ts  # Tool: autorun.problems.list()
    ├── autorunGitHubCommit.ts  # Tool: autorun.github.commit()
    ├── autorunLint.ts           # Tool: autorun.lint()
    └── autorunVisualTest.ts    # Tool: autorun.visual.test()
```

---

## 🚀 Instalación

### **Automática:**

```bash
npm run autorun:install-mcp
```

### **Manual:**

1. Compilar proyecto:
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
      "args": ["packages/autorun-core/dist/cli/autorun-mcp-server.js"],
      "env": { "NODE_ENV": "production" }
    }
  }
}
```

3. Reiniciar Cursor

---

## 🔧 Tools Disponibles

### **Tools Principales:**

1. **`autorun.plan(message)`** - Genera plan sin ejecutar
2. **`autorun.apply({ message, targetFiles?, options? })`** ⭐ - Implementa componentes
3. **`autorun.verify({ targetFiles | 'diff', options? })`** - Verifica implementación

### **Tools de Add-ons:**

4. **`autorun.checklist({ componentName })`** - Obtiene checklist
5. **`autorun.storybook.start({ port?, host? })`** - Inicia Storybook
6. **`autorun.storybook.build({ outputDir? })`** - Construye Storybook
7. **`autorun.problems.list({ category?, severity?, limit? })`** - Lista problemas
8. **`autorun.github.commit({ files, message, push? })`** - Commit manual
9. **`autorun.lint({ files, fix? })`** - Ejecuta ESLint
10. **`autorun.visual.test({ componentId?, storyId? })`** - Tests visuales

---

## 📚 Documentación

- **Instalación:** `docs/guias/configuracion/GUIA-INSTALACION-AUTORUN-MCP-SERVER.md`
- **Uso:** `docs/guias/implementacion/GUIA-USO-AUTORUN-MCP-SERVER.md`
- **Plan de Implementación:** `docs/analisis/PLAN-IMPLEMENTACION-AUTORUN-MCP-SERVER-2025-01-03.md`
- **Integración con Add-ons:** `docs/analisis/PLAN-INTEGRACION-MCP-SERVER-CON-ADDONS-2025-01-03.md`

---

**Versión:** 1.0.0  
**Fecha:** 2025-01-03
