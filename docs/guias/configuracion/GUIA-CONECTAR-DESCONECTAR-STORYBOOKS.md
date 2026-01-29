# 🔌 Guía: Conectar y Desconectar Storybooks en Autorun

**Fecha:** 2025-12-17  
**Objetivo:** Permitir que Autorun funcione con cualquier Storybook, no solo el de UBITS

---

## 🎯 Problema Resuelto

**Antes:**
- ❌ Autorun estaba hardcodeado para usar solo el Storybook de UBITS
- ❌ No se podía cambiar fácilmente a otro Storybook
- ❌ El MCP estaba configurado solo para UBITS
- ❌ Los mapeos de componentes eran estáticos

**Ahora:**
- ✅ Autorun puede conectarse a cualquier Storybook
- ✅ Sistema de conexión/desconexión dinámico
- ✅ MCP se configura automáticamente según el Storybook activo
- ✅ Mapeos de componentes se detectan automáticamente
- ✅ Múltiples Storybooks pueden estar conectados simultáneamente

---

## 🚀 Uso Rápido

### **1. Conectar un Storybook**

```bash
npm run storybook:connect -- --url https://libraries-ui.ubitslearning.com --name "Libraries UI" --set-active
```

**Parámetros:**
- `--url` (requerido): URL base del Storybook
- `--name` (opcional): Nombre descriptivo (default: "Storybook")
- `--id` (opcional): ID único (se genera automáticamente si no se proporciona)
- `--bypass-token` (opcional): Token de bypass si el Storybook está protegido
- `--set-active` (opcional): Establecer como Storybook activo inmediatamente

**Ejemplo:**
```bash
# Conectar Libraries UI
npm run storybook:connect -- --url https://libraries-ui.ubitslearning.com --name "Libraries UI" --set-active

# Conectar UBITS (si no está ya conectado)
npm run storybook:connect -- --url https://ubits-storybook10.vercel.app --name "UBITS" --bypass-token dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT --set-active
```

---

### **2. Listar Storybooks Conectados**

```bash
npm run storybook:list
```

**Salida:**
```
📚 Storybooks Conectados:

  ⭐ Libraries UI (libraries-ui-ubitslearning-com)
     URL: https://libraries-ui.ubitslearning.com
     Conectado: 17/12/2025, 00:45:00
     ⚠️ ACTIVO

  UBITS (ubits-storybook10-vercel-app)
     URL: https://ubits-storybook10.vercel.app
     Conectado: 17/12/2025, 00:30:00

⭐ Storybook activo: Libraries UI
```

---

### **3. Cambiar Storybook Activo**

```bash
npm run storybook:set-active -- --id libraries-ui-ubitslearning-com
```

**Parámetros:**
- `--id` (requerido): ID del Storybook a activar

---

### **4. Desconectar un Storybook**

```bash
npm run storybook:disconnect -- --id libraries-ui-ubitslearning-com
```

**Parámetros:**
- `--id` (requerido): ID del Storybook a desconectar

**Nota:** Si desconectas el Storybook activo, se cambiará automáticamente a otro Storybook conectado (si hay alguno).

---

## 🔧 Funcionamiento Interno

### **1. StorybookManager**

El sistema usa `StorybookManager` para gestionar múltiples Storybooks:

```typescript
import { StorybookManager } from '@autorun/core/helpers/storybookManager';

const manager = StorybookManager.getInstance();

// Conectar Storybook
await manager.connectStorybook({
  id: 'libraries-ui',
  name: 'Libraries UI',
  url: 'https://libraries-ui.ubitslearning.com',
  mcpEnabled: true,
}, { setAsActive: true });

// Obtener Storybook activo
const active = manager.getActiveStorybook();
console.log(active?.config.url); // https://libraries-ui.ubitslearning.com

// Construir URL
const url = manager.buildStorybookUrl('/index.json');
// https://libraries-ui.ubitslearning.com/index.json
```

---

### **2. Detección Automática de Estructura**

Cuando conectas un Storybook, el sistema automáticamente:

1. **Verifica accesibilidad:**
   - Intenta acceder a `/index.json`
   - Verifica que el Storybook esté disponible

2. **Detecta estructura:**
   - Extrae mapeo de componentes desde `index.json`
   - Identifica nombres de componentes y sus IDs
   - Crea mapeo dinámico: `{ "Button": "basicos-button", "Modal": "functional-modal", ... }`

3. **Configura MCP:**
   - Configura automáticamente el MCP de Storybook
   - Usa la URL del Storybook activo

---

### **3. Mapeo Dinámico de Componentes**

**Antes (estático):**
```typescript
// Hardcodeado para UBITS
Button: 'basicos-button'
Modal: 'feedback-modal'
```

**Ahora (dinámico):**
```typescript
// Se detecta automáticamente desde index.json del Storybook activo
// Si el Storybook tiene "Básicos/Button" → Button: 'basicos-button'
// Si el Storybook tiene "Functional/Modal" → Modal: 'functional-modal'
```

---

## 📋 Ejemplos de Uso

### **Ejemplo 1: Conectar Libraries UI**

```bash
# 1. Conectar
npm run storybook:connect -- --url https://libraries-ui.ubitslearning.com --name "Libraries UI" --set-active

# 2. Verificar
npm run storybook:list

# 3. Usar en Autorun
# Autorun automáticamente usará este Storybook para todas las operaciones
```

---

### **Ejemplo 2: Cambiar entre Storybooks**

```bash
# 1. Conectar Libraries UI
npm run storybook:connect -- --url https://libraries-ui.ubitslearning.com --name "Libraries UI"

# 2. Conectar UBITS
npm run storybook:connect -- --url https://ubits-storybook10.vercel.app --name "UBITS" --bypass-token dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT

# 3. Cambiar a Libraries UI
npm run storybook:set-active -- --id libraries-ui-ubitslearning-com

# 4. Cambiar a UBITS
npm run storybook:set-active -- --id ubits-storybook10-vercel-app
```

---

### **Ejemplo 3: Desconectar y Limpiar**

```bash
# 1. Listar Storybooks
npm run storybook:list

# 2. Desconectar uno específico
npm run storybook:disconnect -- --id libraries-ui-ubitslearning-com

# 3. Verificar que se cambió el activo (si era el desconectado)
npm run storybook:list
```

---

## 🔄 Integración con Autorun

### **1. Uso Automático**

Una vez conectado un Storybook, Autorun lo usa automáticamente:

- ✅ `executeOnMessageStart()` usa el Storybook activo
- ✅ `mapComponentNameToStorybookId()` usa el mapeo del Storybook activo
- ✅ `getStorybookUrlWithFallback()` usa la URL del Storybook activo
- ✅ MCP se configura automáticamente

---

### **2. Configuración Persistente**

Las conexiones se guardan en `.autorun/storybooks.json`:

```json
{
  "activeStorybookId": "libraries-ui-ubitslearning-com",
  "connections": {
    "libraries-ui-ubitslearning-com": {
      "config": {
        "id": "libraries-ui-ubitslearning-com",
        "name": "Libraries UI",
        "url": "https://libraries-ui.ubitslearning.com",
        "indexJsonUrl": "https://libraries-ui.ubitslearning.com/index.json",
        "mcpEnabled": true,
        "componentMapping": {
          "Button": "basicos-button",
          "Modal": "functional-modal"
        }
      },
      "connected": true,
      "connectedAt": "2025-12-17T00:45:00.000Z",
      "lastUsed": "2025-12-17T00:45:00.000Z"
    }
  }
}
```

---

## 🚨 Consideraciones

### **1. MCP de Storybook**

- El MCP se configura automáticamente cuando conectas un Storybook
- Solo un Storybook puede tener MCP activo a la vez (el activo)
- Si cambias el Storybook activo, el MCP se reconfigura automáticamente

### **2. Mapeo de Componentes**

- El mapeo se detecta automáticamente desde `index.json`
- Si un componente no está en el mapeo, se usa formato kebab-case como fallback
- Puedes agregar mapeos manuales editando `.autorun/storybooks.json`

### **3. Tokens de Bypass**

- Algunos Storybooks (como UBITS en Vercel) requieren tokens de bypass
- Proporciona el token con `--bypass-token` al conectar
- El token se usa automáticamente al construir URLs

---

## 📚 Referencias

- **StorybookManager:** `packages/autorun-core/src/helpers/storybookManager.ts`
- **CLI:** `packages/autorun-core/src/cli/storybook-connect.ts`
- **Configuración:** `.autorun/storybooks.json`

---

**Última actualización:** 2025-12-17  
**Estado:** ✅ **IMPLEMENTADO** - Sistema de conexión/desconexión de Storybooks funcional
