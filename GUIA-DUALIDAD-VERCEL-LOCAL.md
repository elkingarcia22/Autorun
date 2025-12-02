# 🔄 Guía: Dualidad Vercel / Local (vendor/ubits/)

Esta guía explica cómo funciona el sistema dual que permite usar tanto Vercel (principal) como archivos locales de `vendor/ubits/` (fallback).

## 🎯 Objetivo

Mantener ambas opciones funcionando:
- **Principal:** Cargar todo desde Vercel Storybook (sin necesidad de archivos locales)
- **Fallback:** Usar `vendor/ubits/` local si Vercel no está disponible o si se prefiere trabajar offline

## 🔄 Cómo Funciona

### Prioridad 1: Vercel (Principal)

El sistema intenta primero cargar todo desde Vercel:

1. **Template HTML:** Se carga desde `https://ubits-storybook...vercel.app/templates/template-admin.html`
2. **Assets (CSS, JS, imágenes):** Se cargan a través del proxy local (`/vercel-proxy/...`)
3. **Ventajas:**
   - ✅ No requiere archivos locales
   - ✅ Siempre tiene la versión más reciente
   - ✅ Funciona en cualquier computador sin clonar UBITS

### Prioridad 2: vendor/ubits/ (Fallback)

Si Vercel falla o no está disponible, el sistema automáticamente usa archivos locales:

1. **Template HTML:** Se carga desde `vendor/ubits/packages/templates/template-admin.html`
2. **Assets (CSS, JS, imágenes):** Se cargan usando rutas relativas (`../vendor/ubits/packages/...`)
3. **Ventajas:**
   - ✅ Funciona offline
   - ✅ No depende de internet
   - ✅ Útil para desarrollo local

## 📋 Detección Automática

El código detecta automáticamente qué usar basándose en:

```typescript
// En CanvasCreator.ts
const isVercelUrl = basePathToUBITS.startsWith('https://') || basePathToUBITS.startsWith('http://');

if (isVercelUrl) {
    // Usar Vercel (proxy local)
    return `href="/vercel-proxy/tokens/dist/tokens.css"`;
} else {
    // Usar vendor/ubits/ local
    return `href="${basePath}../vendor/ubits/packages/tokens/dist/tokens.css"`;
}
```

## 🔍 Flujo de Carga

```
1. Intenta cargar desde Vercel
   ├─ ✅ Éxito → Usa Vercel (proxy local)
   └─ ❌ Falla → Intenta fallback local
       ├─ ✅ vendor/ubits/ existe → Usa local
       └─ ❌ No existe → Error
```

## 🛠️ Configuración

### Para Usar Solo Vercel (Recomendado)

No necesitas hacer nada. El sistema usa Vercel por defecto.

### Para Usar Solo Local (Offline)

1. **Opción A:** Desconectar internet (el sistema automáticamente usará fallback)
2. **Opción B:** Modificar `UBITS_PRESET.storybook.url` para que apunte a una ruta local:
   ```typescript
   // En UBITSPreset.ts
   url: '../vendor/ubits/packages/', // En lugar de URL de Vercel
   ```

### Para Mantener Ambos (Actual)

El sistema ya está configurado para mantener ambos. Solo asegúrate de que:
- ✅ `vendor/ubits/` existe en el proyecto (para fallback)
- ✅ Vercel está disponible (para uso principal)

## 📁 Estructura de Archivos

### Con Vercel (Principal)
```
prototypes/
└── canvas-*.html
    ├── CSS: /vercel-proxy/tokens/dist/tokens.css
    ├── JS: /vercel-proxy/templates/components-loader.js
    └── Assets: /vercel-proxy/templates/assets/...
```

### Con Local (Fallback)
```
prototypes/
└── canvas-*.html
    ├── CSS: ../vendor/ubits/packages/tokens/dist/tokens.css
    ├── JS: ../vendor/ubits/packages/templates/components-loader.js
    └── Assets: ../vendor/ubits/packages/templates/assets/...
vendor/
└── ubits/
    └── packages/
        ├── tokens/
        ├── templates/
        └── components/
```

## ✅ Verificación

### Verificar que Vercel Funciona

```bash
# El template debe cargar sin errores
curl http://localhost:3002/canvas-administrador-encuestas-*.html

# Los archivos deben cargarse desde Vercel
curl http://localhost:3002/vercel-proxy/templates/components-loader.js
```

### Verificar que Fallback Funciona

1. Desconectar internet
2. Ejecutar wizard: `npm run init`
3. El sistema debe detectar que Vercel no está disponible
4. Debe usar automáticamente `vendor/ubits/`

## 🚨 Troubleshooting

### Problema: "No carga desde Vercel"

**Solución:**
1. Verificar que Vercel está desplegado y accesible
2. Verificar que el bypass token es correcto
3. Revisar logs del servidor local para ver errores del proxy

### Problema: "No carga desde vendor/ubits/"

**Solución:**
1. Verificar que `vendor/ubits/packages/` existe
2. Verificar que los archivos críticos están presentes:
   - `templates/template-admin.html`
   - `tokens/dist/tokens.css`
   - `templates/components-loader.js`

### Problema: "Usa Vercel cuando debería usar local"

**Solución:**
- El sistema siempre intenta Vercel primero (por diseño)
- Si quieres forzar local, modifica `UBITS_PRESET.storybook.url` temporalmente

## 📝 Notas Importantes

1. **Vercel es Principal:** El sistema siempre intenta Vercel primero
2. **Fallback Automático:** Si Vercel falla, automáticamente usa local
3. **Sin Configuración:** No necesitas configurar nada, funciona automáticamente
4. **Mantener Ambos:** Es recomendable mantener `vendor/ubits/` como respaldo

## 🎉 Beneficios

- ✅ **Flexibilidad:** Puedes trabajar online (Vercel) u offline (local)
- ✅ **Portabilidad:** Funciona en cualquier computador (Vercel) o con archivos locales
- ✅ **Robustez:** Si Vercel falla, automáticamente usa local
- ✅ **Sin Configuración:** Todo funciona automáticamente

