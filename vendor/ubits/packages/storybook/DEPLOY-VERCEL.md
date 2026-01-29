# 🚀 Guía de Despliegue en Vercel - Solución de Problemas

## ⚠️ Problema Conocido

Al desplegar desde `packages/storybook`, Vercel puede tener problemas con el comando `cd ../.. && npm install` en monorepos, mostrando el error:

```
npm error Tracker "idealTree" already exists
```

## ✅ Soluciones

### Solución 1: Configuración Manual en Dashboard de Vercel (Recomendada)

1. **Ve a [vercel.com](https://vercel.com) y conecta tu repositorio**

2. **Configura el proyecto manualmente:**
   - **Root Directory**: `packages/storybook`
   - **Framework Preset**: Other
   - **Build Command**: `bash scripts/build.sh`
   - **Output Directory**: `storybook-static`
   - **Install Command**: (dejar vacío o usar solo `npm install`)

3. **Variables de entorno**: No se requieren

4. **Hacer clic en "Deploy"**

### Solución 2: Desplegar Archivos Estáticos Ya Construidos

Si ya construiste Storybook localmente:

```bash
# 1. Construir localmente
cd packages/storybook
npm run build-storybook

# 2. Desplegar solo los archivos estáticos
npx vercel --prod storybook-static
```

### Solución 3: Usar GitHub Actions + Vercel

Configurar GitHub Actions para construir y desplegar automáticamente:

```yaml
# .github/workflows/deploy-storybook.yml
name: Deploy Storybook
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:tokens
      - run: cd packages/storybook && npm run build-storybook
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: packages/storybook/storybook-static
```

### Solución 4: Usar Vercel CLI con Configuración Simplificada

Actualizar `vercel.json` para no usar `installCommand` personalizado:

```json
{
  "buildCommand": "bash scripts/build.sh",
  "outputDirectory": "storybook-static",
  "framework": null,
  "devCommand": "npm run storybook",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Luego desplegar:

```bash
cd packages/storybook
npx vercel --prod
```

## 🔧 Verificación Local

Antes de desplegar, verifica que todo funciona localmente:

```bash
# 1. Construir tokens
npm run build:tokens

# 2. Construir Storybook
cd packages/storybook
npm run build-storybook

# 3. Verificar que storybook-static existe
ls -la storybook-static

# 4. Probar servidor local (opcional)
npx serve storybook-static
```

## 📝 Notas Importantes

- **Monorepos**: Vercel puede tener problemas con workspaces de npm. La solución más confiable es configurar manualmente desde el dashboard.
- **Build Script**: El script `scripts/build.sh` ya maneja correctamente la construcción de tokens y Storybook.
- **Output Directory**: Siempre debe ser `storybook-static` (generado por `storybook build`).

## 🆘 Si Nada Funciona

1. **Desplegar manualmente los archivos estáticos:**
   ```bash
   cd packages/storybook
   npm run build-storybook
   npx vercel --prod storybook-static
   ```

2. **Usar otro servicio de hosting:**
   - Netlify
   - GitHub Pages
   - Cloudflare Pages

3. **Contactar soporte de Vercel** con los logs del error.

