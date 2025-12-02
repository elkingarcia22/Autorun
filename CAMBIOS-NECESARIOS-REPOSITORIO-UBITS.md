# 📋 Cambios Necesarios en el Repositorio UBITS de GitHub

## 🎯 Objetivo
Para que Vercel despliegue correctamente el Storybook con todos los archivos necesarios (templates, CSS, JS, tokens, assets), necesitamos agregar estos cambios al repositorio UBITS de GitHub.

---

## 📝 Cambios Requeridos

### 1. **Script de Copia de Archivos** (NUEVO)
**Ubicación:** `scripts/copy-ubits-files-to-storybook-static.js`

Este script copia todos los archivos necesarios de UBITS a `storybook-static/` para que estén disponibles en Vercel.

**Acción:** Copiar el archivo desde `Autorun/scripts/copy-ubits-files-to-storybook-static.js` al repositorio UBITS en `scripts/copy-ubits-files-to-storybook-static.js`

### 2. **Actualizar `vercel.json`** (MODIFICAR)
**Ubicación:** `packages/storybook/vercel.json`

**Contenido actualizado:**
```json
{
  "buildCommand": "npm run build-storybook && node ../../scripts/copy-ubits-files-to-storybook-static.js",
  "outputDirectory": "storybook-static",
  "framework": null,
  "devCommand": "npm run storybook",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
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

**Cambios:**
- `buildCommand` ahora incluye el script de copia después del build de Storybook
- Agregadas cabeceras CORS para permitir acceso desde Autorun

### 3. **Actualizar `package.json` de Storybook** (OPCIONAL)
**Ubicación:** `packages/storybook/package.json`

Si quieres que el script se ejecute automáticamente antes del build, puedes agregar:

```json
{
  "scripts": {
    "build-storybook": "storybook build && node ../../scripts/copy-ubits-files-to-storybook-static.js",
    "prebuild-storybook": "node ../../scripts/copy-ubits-files-to-storybook-static.js"
  }
}
```

**Nota:** El `vercel.json` ya incluye el script en el `buildCommand`, así que esto es opcional.

---

## 🚀 Pasos para Aplicar los Cambios

### Opción A: Manual (Recomendado)

1. **Clonar el repositorio UBITS:**
   ```bash
   git clone https://github.com/elkingarcia22/UBITS.git
   cd UBITS
   ```

2. **Copiar el script:**
   ```bash
   # Desde Autorun
   cp /Users/elkinmac/Desktop/Autorun/scripts/copy-ubits-files-to-storybook-static.js scripts/
   ```

3. **Actualizar `vercel.json`:**
   ```bash
   # Editar packages/storybook/vercel.json con el contenido de arriba
   ```

4. **Hacer commit y push:**
   ```bash
   git add scripts/copy-ubits-files-to-storybook-static.js packages/storybook/vercel.json
   git commit -m "feat: agregar script de copia de archivos para Vercel"
   git push origin main
   ```

### Opción B: Desde el Proyecto Autorun

Si tienes acceso al repositorio UBITS desde Autorun:

```bash
# Desde Autorun
cd vendor/ubits
git remote -v  # Verificar que apunta al repositorio correcto
git checkout -b feat/vercel-deployment
# Copiar archivos y hacer cambios
git add scripts/copy-ubits-files-to-storybook-static.js packages/storybook/vercel.json
git commit -m "feat: agregar script de copia de archivos para Vercel"
git push origin feat/vercel-deployment
# Crear Pull Request en GitHub
```

---

## ✅ Verificación

Después de hacer los cambios:

1. **Verificar que el script existe:**
   ```bash
   ls -la scripts/copy-ubits-files-to-storybook-static.js
   ```

2. **Verificar que `vercel.json` está actualizado:**
   ```bash
   cat packages/storybook/vercel.json | grep "copy-ubits-files"
   ```

3. **Probar el build localmente:**
   ```bash
   cd packages/storybook
   npm run build-storybook
   node ../../scripts/copy-ubits-files-to-storybook-static.js
   ls -la storybook-static/templates/
   ls -la storybook-static/tokens/dist/
   ```

4. **Hacer deploy en Vercel:**
   - Vercel detectará automáticamente los cambios en GitHub
   - El build debería ejecutar el script de copia
   - Los archivos deberían estar disponibles en la URL de Vercel

---

## 📚 Archivos que se Copiarán

El script copia automáticamente:

- ✅ Templates HTML (`templates/template-admin.html`, `templates/template-colaborador.html`)
- ✅ Tokens CSS (`tokens/dist/tokens.css`, `tokens/dist/figma-tokens.css`)
- ✅ Typography (`typography/fonts.css`, `typography/tokens-typography.css`)
- ✅ CSS de componentes (`components/*/src/styles/*.css`)
- ✅ Scripts de templates (`templates/components-loader.js`, `templates/config/*.js`, `templates/engine/*.js`)
- ✅ Assets (`templates/assets/`)
- ✅ UMD de DataTable (`components/data-table/dist/data-table.umd.js`)

**Total:** ~67 archivos copiados

---

## ⚠️ Notas Importantes

1. **El script debe ejecutarse DESPUÉS del build de Storybook** porque Storybook limpia `storybook-static/` antes de construir.

2. **El script detecta automáticamente la ubicación** de UBITS, así que funciona tanto en el repositorio UBITS como en Autorun.

3. **Las rutas en el script son relativas** desde la raíz del proyecto UBITS, no desde Autorun.

4. **El script es idempotente** - puedes ejecutarlo múltiples veces sin problemas.

---

## 🔄 Actualización Futura

Si se agregan nuevos componentes o archivos a UBITS que necesiten estar en Vercel:

1. Actualizar el array `filesToCopy` en `scripts/copy-ubits-files-to-storybook-static.js`
2. Hacer commit y push
3. Vercel automáticamente desplegará los cambios

