# 📚 Guía: Exponer Archivos UBITS en Storybook de Vercel

Esta guía explica cómo modificar el build de Storybook para exponer los archivos necesarios (templates, CSS, JS, tokens, assets) en el despliegue de Vercel.

## 🎯 Objetivo

Hacer que los archivos de UBITS estén disponibles en Vercel para que Autorun pueda cargarlos directamente desde el Storybook desplegado, eliminando la necesidad de `vendor/ubits/` local.

## 📋 Archivos Necesarios

Los siguientes archivos deben estar disponibles en Vercel:

### 1. Templates HTML
- `/templates/template-admin.html`
- `/templates/template-colaborador.html`

### 2. Tokens CSS
- `/tokens/dist/tokens.css`
- `/tokens/dist/figma-tokens.css`

### 3. Typography
- `/typography/fonts.css`
- `/typography/tokens-typography.css`

### 4. CSS de Componentes
- `/components/sidebar/src/styles/sidebar.css`
- `/components/subnav/src/styles/subnav.css`
- `/components/tabbar/src/styles/tabbar.css`
- `/components/*/src/styles/*.css` (todos los componentes)

### 5. Scripts de Templates
- `/templates/components-loader.js`
- `/templates/config/products.js`
- `/templates/config/theme-manager.js`
- `/templates/config/responsive-manager.js`
- `/templates/engine/template-loader.js`
- `/templates/engine/content-manager.js`

### 6. Assets
- `/templates/assets/fontawesome/` (completo)
- `/templates/assets/images/` (completo)

### 7. UMD de DataTable
- `/components/data-table/dist/data-table.umd.js`

---

## 🛠️ Solución: Script de Copia Automática

### Opción 1: Usar Script Automático (Recomendado)

He creado un script que copia automáticamente todos los archivos necesarios:

```bash
# Desde el proyecto Autorun
node scripts/copy-ubits-files-to-storybook-static.js

# O desde el proyecto UBITS
cd vendor/ubits/packages/storybook
node ../../../../scripts/copy-ubits-files-to-storybook-static.js
```

El script:
1. ✅ Detecta automáticamente la ubicación de UBITS
2. ✅ Copia todos los archivos necesarios a `storybook-static/`
3. ✅ Mantiene la estructura de directorios correcta
4. ✅ Muestra un resumen de archivos copiados

### Opción 2: Integrar en package.json de Storybook

Agregar al `package.json` del proyecto Storybook:

```json
{
  "scripts": {
    "build-storybook": "build-storybook",
    "copy-ubits-files": "node ../../../../scripts/copy-ubits-files-to-storybook-static.js",
    "build": "npm run build-storybook && npm run copy-ubits-files"
  }
}
```

---

## 📁 Estructura Resultante en storybook-static/

Después de ejecutar el script, `storybook-static/` debería tener:

```
storybook-static/
├── templates/
│   ├── template-admin.html
│   ├── template-colaborador.html
│   ├── components-loader.js
│   ├── config/
│   │   ├── products.js
│   │   ├── theme-manager.js
│   │   └── responsive-manager.js
│   ├── engine/
│   │   ├── template-loader.js
│   │   └── content-manager.js
│   └── assets/
│       ├── fontawesome/
│       └── images/
├── tokens/
│   └── dist/
│       ├── tokens.css
│       └── figma-tokens.css
├── typography/
│   ├── fonts.css
│   └── tokens-typography.css
└── components/
    ├── sidebar/
    │   └── src/
    │       └── styles/
    │           └── sidebar.css
    ├── subnav/
    │   └── src/
    │       └── styles/
    │           └── subnav.css
    ├── data-table/
    │   └── dist/
    │       └── data-table.umd.js
    └── ... (todos los demás componentes)
```

---

## 🚀 Proceso Completo

### Paso 1: Ejecutar Script de Copia

```bash
# Desde Autorun
cd /Users/elkinmac/Desktop/Autorun
node scripts/copy-ubits-files-to-storybook-static.js
```

### Paso 2: Verificar Archivos Copiados

```bash
# Verificar que los archivos estén en storybook-static/
ls -la vendor/ubits/packages/storybook/storybook-static/templates/
ls -la vendor/ubits/packages/storybook/storybook-static/tokens/dist/
ls -la vendor/ubits/packages/storybook/storybook-static/components/
```

### Paso 3: Build y Deploy de Storybook

```bash
# Desde el proyecto UBITS Storybook
cd vendor/ubits/packages/storybook
npm run build-storybook
# O si está integrado:
npm run build

# Deploy a Vercel (automático si está configurado)
# O manualmente:
vercel deploy storybook-static
```

### Paso 4: Verificar en Vercel

Después del deploy, verificar que los archivos estén accesibles:

```bash
# Verificar template
curl "https://ubits-storybook.vercel.app/templates/template-admin.html?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=TOKEN"

# Verificar tokens
curl "https://ubits-storybook.vercel.app/tokens/dist/tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=TOKEN"
```

---

## ⚙️ Configuración de Vercel

### vercel.json (Opcional)

Si necesitas configuración especial, crear `vercel.json` en el proyecto Storybook:

```json
{
  "public": true,
  "rewrites": [
    {
      "source": "/templates/:path*",
      "destination": "/templates/:path*"
    },
    {
      "source": "/components/:path*",
      "destination": "/components/:path*"
    },
    {
      "source": "/tokens/:path*",
      "destination": "/tokens/:path*"
    },
    {
      "source": "/typography/:path*",
      "destination": "/typography/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, OPTIONS"
        }
      ]
    }
  ]
}
```

---

## ✅ Verificación

Después del deploy, probar el wizard de Autorun:

```bash
cd /Users/elkinmac/Desktop/Autorun
AUTORUN_ANSWERS="1,16,s,1,n" npm run init
```

Debería:
1. ✅ Intentar cargar desde Vercel
2. ✅ Cargar exitosamente (sin HTTP 401)
3. ✅ No hacer fallback a vendor/ubits/

---

## 🐛 Troubleshooting

### Error: HTTP 401 Unauthorized

**Causa:** Vercel está bloqueando el acceso.

**Solución:** 
- Verificar que el bypass token esté correcto en `UBITSPreset.ts`
- Verificar que la URL incluya los query parameters correctos

### Error: 404 Not Found

**Causa:** Los archivos no están en `storybook-static/`.

**Solución:**
- Ejecutar el script de copia nuevamente
- Verificar que los archivos estén en la ubicación correcta
- Verificar que el build de Storybook incluya estos archivos

### Error: CORS

**Causa:** Vercel no permite CORS.

**Solución:**
- Agregar configuración de CORS en `vercel.json`
- O verificar que los headers estén configurados correctamente

---

## 📝 Notas

- El script debe ejecutarse **después** de `npm run build-storybook`
- Los archivos se copian a `storybook-static/` que es lo que se despliega a Vercel
- El script mantiene la estructura de directorios original
- Si algún archivo no existe, el script muestra una advertencia pero continúa

