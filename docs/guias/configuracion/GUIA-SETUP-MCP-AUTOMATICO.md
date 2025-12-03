# 🔧 Guía: Configuración Automática de MCPs

Esta guía explica qué se configura automáticamente y qué requiere configuración manual cuando clonas el repositorio en una nueva computadora.

## ✅ Lo que queda automático (en el repositorio)

### 1. Configuración de Storybook
- ✅ **`vendor/ubits/packages/storybook/.storybook/main.ts`** - Configuración del addon MCP
- ✅ **`vendor/ubits/packages/storybook/package.json`** - Dependencia del addon

**Cuando clonas el repositorio:**
- Los archivos de configuración ya están incluidos
- Solo necesitas ejecutar `npm install` en el directorio de Storybook

### 2. Código del Wizard
- ✅ **`packages/autorun-core/src/MCPInstaller.ts`** - Configuración de servidores MCP
- ✅ **`packages/autorun-core/src/wizard/InitializationWizard.ts`** - Lógica de instalación

**Cuando clonas el repositorio:**
- El código ya está incluido
- Solo necesitas ejecutar `npm run build` en `packages/autorun-core`

## ⚠️ Lo que requiere configuración manual

### 1. Instalación de dependencias
Después de clonar, necesitas instalar las dependencias:

```bash
# En el directorio de Storybook
cd vendor/ubits/packages/storybook
npm install
```

Esto instalará `@storybook/addon-mcp` automáticamente porque está en `package.json`.

### 2. Archivo `.cursor/mcp.json`
Este archivo es **local a cada computadora** y **NO debe estar en el repositorio** (es configuración personal).

**Opciones:**

#### Opción A: Usar el wizard (Recomendado)
```bash
npm run init
```
Cuando el wizard pregunte por MCP, responde "S" y configurará automáticamente todos los MCPs.

#### Opción B: Configuración manual
Crea `.cursor/mcp.json` manualmente:

```json
{
  "mcpServers": {
    "storybook": {
      "url": "http://localhost:6006/mcp"
    },
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    },
    "vercel": {
      "url": "https://mcp.vercel.com"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {}
    },
    "clarity": {
      "command": "npx",
      "args": ["-y", "@microsoft/clarity-mcp-server"],
      "env": {}
    }
  }
}
```

#### Opción C: Script automático
Ejecuta el script de configuración:

```bash
./scripts/setup-storybook-mcp.sh
```

## 🚀 Proceso completo para nueva computadora

### Paso 1: Clonar el repositorio
```bash
git clone <repo-url>
cd Autorun
```

### Paso 2: Instalar dependencias del proyecto
```bash
npm install
```

### Paso 3: Instalar dependencias de Storybook
```bash
cd vendor/ubits/packages/storybook
npm install
```

### Paso 4: Configurar MCPs
```bash
# Opción A: Usar el wizard (recomendado)
cd ../../../
npm run init

# Opción B: Script automático
./scripts/setup-storybook-mcp.sh

# Opción C: Manual
# Crear .cursor/mcp.json con la configuración de arriba
```

### Paso 5: Compilar el código
```bash
cd packages/autorun-core
npm run build
```

### Paso 6: Reiniciar Cursor
Cierra y vuelve a abrir Cursor para que cargue la nueva configuración MCP.

## 📋 Checklist de verificación

Después de clonar, verifica:

- [ ] `vendor/ubits/packages/storybook/package.json` contiene `@storybook/addon-mcp`
- [ ] `vendor/ubits/packages/storybook/.storybook/main.ts` incluye el addon
- [ ] `npm install` ejecutado en `vendor/ubits/packages/storybook`
- [ ] `.cursor/mcp.json` existe y tiene la configuración correcta
- [ ] Storybook puede iniciarse: `cd vendor/ubits/packages/storybook && npm run storybook`
- [ ] El servidor MCP está disponible: `curl http://localhost:6006/mcp` (cuando Storybook está corriendo)

## 🔄 Automatización futura

Para hacer esto completamente automático, podrías:

1. **Agregar un script post-install:**
   ```json
   // package.json
   {
     "scripts": {
       "postinstall": "cd vendor/ubits/packages/storybook && npm install"
     }
   }
   ```

2. **Crear un template de `.cursor/mcp.json`:**
   - Crear `.cursor/mcp.json.template`
   - El script copia el template a `.cursor/mcp.json`

3. **Integrar en el wizard:**
   - El wizard ya detecta y configura MCPs automáticamente
   - Solo necesitas ejecutar `npm run init` después de clonar

## 📝 Notas importantes

- **`.cursor/mcp.json` NO debe estar en Git** - Es configuración local
- **`vendor/ubits/` SÍ está en Git** - Incluye la configuración de Storybook
- **El addon se instala automáticamente** cuando ejecutas `npm install` en Storybook
- **Los servidores remotos (Figma, Supabase, Vercel) no requieren instalación** - Solo URL

## ❓ Preguntas frecuentes

### ¿Por qué `.cursor/mcp.json` no está en el repositorio?
Porque es configuración local de Cursor. Cada desarrollador puede tener diferentes MCPs configurados o diferentes credenciales.

### ¿Puedo automatizar la creación de `.cursor/mcp.json`?
Sí, el wizard (`npm run init`) lo hace automáticamente. También puedes usar el script `setup-storybook-mcp.sh`.

### ¿Qué pasa si no instalo el addon de Storybook?
El MCP de Storybook no funcionará, pero los demás MCPs (Figma, Supabase, Vercel) seguirán funcionando porque usan servidores remotos.

### ¿Necesito configurar credenciales?
- **Figma, Supabase, Vercel:** No, usan OAuth automático
- **GitHub, Clarity:** Sí, necesitas tokens en variables de entorno o en la configuración

