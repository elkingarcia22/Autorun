# 📦 UBITS en Vendor - Guía de Portabilidad

## 🎯 ¿Qué es vendor/ubits/?

`vendor/ubits/` es una copia completa de UBITS dentro del proyecto Autorun para máxima portabilidad.

**Ventajas:**
- ✅ Funciona en cualquier computador
- ✅ Funciona en otros Cursor chats
- ✅ No depende de rutas absolutas
- ✅ Todo versionado en Git
- ✅ Rutas relativas simples

---

## 📁 Estructura

```
Autorun/
├── vendor/
│   └── ubits/
│       └── packages/
│           ├── components/      # 50+ componentes UBITS
│           ├── tokens/          # Sistema de tokens
│           ├── typography/      # Tipografía
│           └── templates/       # Templates y scripts
└── prototypes/
    └── canvas-*.html           # Templates generados (usan rutas relativas)
```

---

## 🔄 Cómo Funciona

### **1. Generación de Templates**

Cuando se genera un template:
1. ✅ Busca primero en `vendor/ubits/packages/` (portable)
2. ⚠️ Si no existe, busca en `Desktop/UBITS/packages/` (legacy)
3. ✅ Usa rutas relativas desde `prototypes/` hacia `vendor/ubits/packages/`

### **2. Rutas en Templates Generados**

**Rutas relativas (preferido):**
```html
<link rel="stylesheet" href="../vendor/ubits/packages/tokens/dist/tokens.css" />
<script src="../vendor/ubits/packages/templates/components-loader.js"></script>
<script src="../vendor/ubits/packages/components/data-table/dist/data-table.umd.js"></script>
```

**Rutas absolutas (legacy, solo si no existe vendor/ubits/):**
```html
<link rel="stylesheet" href="file:///Users/elkinmac/Desktop/UBITS/packages/tokens/dist/tokens.css" />
```

---

## ✅ Componentes Disponibles

### **En components-loader.js:**
- ✅ `window.createSidebar(options)`
- ✅ `window.createSubNav(options)`
- ✅ `window.createTabBar(options)`
- ✅ `window.createTabs(options, containerId)` ⭐ NUEVO

### **Desde UMD (data-table.umd.js):**
- ✅ `window.createDataTable(options)` ⭐ NUEVO
- ✅ `window.renderDataTable(options)`
- ✅ `window.UBITSDataTable.createDataTable(options)`

---

## 🔍 Verificación

Ejecuta el script de verificación:

```bash
node scripts/verify-ubits-vendor.js
```

Este script verifica:
- ✅ Que existe `vendor/ubits/packages/`
- ✅ Que todos los archivos críticos están presentes
- ✅ Que todos los componentes críticos están presentes
- ✅ Que `components-loader.js` tiene `createTabs`
- ✅ Que `data-table.umd.js` existe

---

## 🔄 Actualizar UBITS

Cuando UBITS se actualiza, copiar la nueva versión:

```bash
# Desde la raíz de Autorun
rm -rf vendor/ubits/packages
cp -r /Users/elkinmac/Desktop/UBITS/packages vendor/ubits/
```

O crear un script de sincronización:

```bash
# scripts/sync-ubits.sh
#!/bin/bash
SOURCE="/Users/elkinmac/Desktop/UBITS/packages"
DEST="vendor/ubits/packages"

echo "🔄 Sincronizando UBITS..."
rm -rf "$DEST"
cp -r "$SOURCE" "$DEST"
echo "✅ UBITS sincronizado"
```

---

## 📝 Notas Importantes

1. **NO modificar archivos en vendor/ubits/** - Es una copia de UBITS
2. **Rutas relativas funcionan con servidor HTTP** - Usa `npx serve prototypes/` o similar
3. **Fallback a Desktop/UBITS/** - Si no existe vendor/ubits/, se usa Desktop/UBITS/ con rutas absolutas
4. **Versionado Git** - Considera agregar `vendor/ubits/` a `.gitignore` si es muy grande, o usar Git LFS

---

## 🚀 Uso en Otros Computadores

1. Clonar el repositorio Autorun
2. Verificar que existe `vendor/ubits/packages/`
3. Si no existe, copiar UBITS a `vendor/ubits/packages/`
4. Generar templates - funcionarán con rutas relativas
5. Servir con HTTP: `npx serve prototypes/`

---

## 📚 Referencias

- **Inventario completo:** `INVENTARIO-COMPLETO-UBITS.md`
- **Análisis UBITS:** `ANALISIS-UBITS-COMPLETO.md`
- **Análisis portabilidad:** `ANALISIS-PORTABILIDAD-UBITS.md`
- **Estrategia:** `ESTRATEGIA-COMPONENTES-UBITS.md`

