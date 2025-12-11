# 📄 Ejemplo: Deploy de Archivo Estático (index.html)

Este ejemplo muestra cómo usar el add-on de Vercel para desplegar un archivo estático como el `index.html`, similar a como lo hicimos manualmente.

## 🎯 Caso de Uso

Desplegar el `index.html` de `packages/proyecto-app/tokens/index.html` a Vercel con configuración personalizada.

## 📋 Configuración

```json
{
  "autorun": {
    "addons": {
      "active": ["vercel"],
      "config": {
        "vercel": {
          "token": "tu-vercel-token",
          "teamId": "tu-team-id-opcional",
          "useCLI": true,
          "projectName": "autorun-index"
        }
      }
    }
  }
}
```

## 🚀 Código de Ejemplo

```typescript
import { AutorunHub } from '@autorun/core';
import { readFileSync } from 'fs';
import { join } from 'path';

const hub = new AutorunHub();
await hub.initialize();
await hub.activateAddon('vercel');

// Leer el index.html
const indexHtmlPath = join(process.cwd(), 'packages/proyecto-app/tokens/index.html');
const indexHtmlContent = readFileSync(indexHtmlPath, 'utf-8');

// Obtener servicio de deploy
const deploy = hub.getService('vercel', 'deploy');

// Hacer deploy con vercel.json incluido
const deployment = await deploy({
  projectName: 'autorun-index',
  files: {
    'index.html': indexHtmlContent
  },
  vercelJson: {
    version: 2,
    buildCommand: null,
    outputDirectory: '.',
    framework: null,
    installCommand: null,
    cleanUrls: true,
    trailingSlash: false,
    rewrites: [
      {
        source: '/(.*)',
        destination: '/index.html'
      }
    ],
    headers: [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ]
      }
    ]
  },
  target: 'production'
});

console.log('✅ Deploy completado:', deployment.url);
```

## 🔄 Actualizar Deployment

Para actualizar el deployment después de modificar el `index.html`:

```typescript
// Leer el nuevo contenido
const newContent = readFileSync(indexHtmlPath, 'utf-8');

// Hacer deploy nuevamente (mismo proyecto)
const newDeployment = await deploy({
  projectName: 'autorun-index',
  files: {
    'index.html': newContent
  },
  vercelJson: {
    // misma configuración...
  },
  target: 'production'
});
```

## 📝 Notas Importantes

1. **useCLI: true** (por defecto): El add-on usa el CLI de Vercel, que es más simple y confiable para archivos estáticos.

2. **vercel.json**: Se incluye automáticamente en el deploy cuando se proporciona en `options.vercelJson`.

3. **Sin build**: Para archivos estáticos, `buildCommand`, `installCommand` y `framework` deben ser `null`.

4. **Output Directory**: Para archivos estáticos en la raíz, usar `"."`.

## 🆚 Comparación con Deploy Manual

**Deploy Manual:**
```bash
cd deploy
npx vercel --prod --yes
```

**Con Add-on:**
```typescript
await deploy({
  files: { 'index.html': content },
  vercelJson: { /* config */ },
  target: 'production'
});
```

Ambos métodos producen el mismo resultado, pero el add-on permite automatizar el proceso desde código.



