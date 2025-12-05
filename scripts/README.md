# 🔧 Scripts de Autorun

Documentación de todos los scripts de utilidad del proyecto.

---

## 📋 Scripts Principales

### `verify-setup.js`
**Propósito:** Verificar que el setup del proyecto está correcto  
**Uso:** `npm run verify`  
**Verifica:**
- Estructura del proyecto
- Scripts configurados
- Dependencias necesarias
- Archivos del wizard

**Ubicación:** `scripts/verify-setup.js`

---

### `create-project-package-json.js`
**Propósito:** Crear `package.json` en la raíz del proyecto  
**Uso:** `npm run setup-project`  
**Crea:** Scripts para ejecutar wizard desde cualquier directorio

**Ubicación:** `scripts/create-project-package-json.js`

**Ejemplo de estructura resultante:**
```
MiProyecto/
├── Autorun/          ← Aquí ejecutas: npm run setup-project
│   └── ...
└── package.json      ← Se crea automáticamente aquí
```

---

### `run-init.js`
**Propósito:** Ejecutar wizard de inicialización  
**Uso:** `npm run wizard`  
**Busca:** Directorio `Autorun` y ejecuta wizard

**Ubicación:** `scripts/run-init.js`

---

## 🔑 Scripts de Tokens

### `convert-figma-to-css-vars.cjs`
**Propósito:** Convertir tokens de Figma a CSS variables  
**Uso:** `node scripts/convert-figma-to-css-vars.cjs`

**Ubicación:** `scripts/tokens/convert-figma-to-css-vars.cjs`

---

### `compare-figma-tokens.js`
**Propósito:** Comparar tokens de Figma  
**Uso:** `node scripts/compare-figma-tokens.js`

**Ubicación:** `scripts/tokens/compare-figma-tokens.js`

---

### `compare-all-figma-tokens.cjs`
**Propósito:** Comparar todos los tokens de Figma  
**Uso:** `node scripts/compare-all-figma-tokens.cjs`

---

### `count-all-figma-tokens.cjs`
**Propósito:** Contar todos los tokens de Figma  
**Uso:** `node scripts/count-all-figma-tokens.cjs`

---

### `read-figma-tokens.cjs`
**Propósito:** Leer tokens de Figma  
**Uso:** `node scripts/read-figma-tokens.cjs`

---

### `read-figma-tokens.js`
**Propósito:** Leer tokens de Figma (versión JavaScript)  
**Uso:** `node scripts/read-figma-tokens.js`

---

### `resolver-todos-tokens-figma.cjs`
**Propósito:** Resolver todos los tokens de Figma  
**Uso:** `node scripts/resolver-todos-tokens-figma.cjs`

---

### `generate-storybook-tokens.cjs`
**Propósito:** Generar tokens para Storybook  
**Uso:** `node scripts/generate-storybook-tokens.cjs`

---

### `extract-all-figma-tokens-for-story.cjs`
**Propósito:** Extraer todos los tokens de Figma para stories  
**Uso:** `node scripts/extract-all-figma-tokens-for-story.cjs`

---

### `verificar-tokens-storybook-figma.cjs`
**Propósito:** Verificar tokens entre Storybook y Figma  
**Uso:** `node scripts/verificar-tokens-storybook-figma.cjs`

---

## 📚 Scripts de Storybook

### `copy-ubits-files-to-storybook-static.js`
**Propósito:** Copiar archivos UBITS a Storybook estático  
**Uso:** `node scripts/copy-ubits-files-to-storybook-static.js`

---

### `copy-ubits-files-to-storybook-static-UBITS.js`
**Propósito:** Copiar archivos UBITS a Storybook estático (versión UBITS)  
**Uso:** `node scripts/copy-ubits-files-to-storybook-static-UBITS.js`

---

### `setup-storybook-mcp.sh`
**Propósito:** Configurar Storybook MCP  
**Uso:** `bash scripts/setup-storybook-mcp.sh`

---

## 🔍 Scripts de Verificación

### `verify-ubits-vendor.js`
**Propósito:** Verificar que existe `vendor/ubits/`  
**Uso:** `node scripts/verify-ubits-vendor.js`

---

### `verify-vercel.js`
**Propósito:** Verificar conexión con Vercel  
**Uso:** `node scripts/verify-vercel.js`

---

## 🛠️ Scripts de Utilidad

### `identify-template.js`
**Propósito:** Identificar template existente  
**Uso:** `node scripts/identify-template.js`

---

### `run-init.sh`
**Propósito:** Ejecutar wizard (versión shell)  
**Uso:** `bash scripts/run-init.sh`

---

## 📊 Scripts de Comparación (Python)

### `compare-figma-tokens-detailed.py`
**Propósito:** Comparar tokens de Figma (análisis detallado)  
**Uso:** `python scripts/compare-figma-tokens-detailed.py`

---

### `compare-figma-tokens-full.py`
**Propósito:** Comparar tokens de Figma (análisis completo)  
**Uso:** `python scripts/compare-figma-tokens-full.py`

---

### `compare-figma-project-tokens.cjs`
**Propósito:** Comparar tokens de proyecto de Figma  
**Uso:** `node scripts/compare-figma-project-tokens.cjs`

---

### `compare-tokens-by-hex.py`
**Propósito:** Comparar tokens por valor hexadecimal  
**Uso:** `python scripts/compare-tokens-by-hex.py`

---

### `compare-tokens-complete.py`
**Propósito:** Comparar tokens (análisis completo)  
**Uso:** `python scripts/compare-tokens-complete.py`

---

### `compare-tokens-hex-complete.py`
**Propósito:** Comparar tokens por hex (análisis completo)  
**Uso:** `python scripts/compare-tokens-hex-complete.py`

---

## 📝 Notas

- La mayoría de scripts están en JavaScript (`.js`) o CommonJS (`.cjs`)
- Algunos scripts están en Python (`.py`)
- Los scripts de tokens están relacionados con la integración con Figma
- Los scripts de Storybook están relacionados con la generación de documentación

---

## 🔄 Organización Propuesta

Los scripts están organizados en:
- **Core:** Scripts principales del sistema
- **Tokens:** Scripts relacionados con tokens de Figma
- **Storybook:** Scripts relacionados con Storybook

---

**Última actualización:** 2025-01-03

