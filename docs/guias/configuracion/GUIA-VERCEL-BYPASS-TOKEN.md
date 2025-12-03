# 🔐 Guía: Obtener Token de Bypass de Vercel para Storybook

Esta guía explica cómo obtener un token de bypass de Vercel para acceder al Storybook protegido sin restricciones.

## 🎯 ¿Qué necesitas de Vercel?

Para acceder al Storybook en Vercel sin restricciones, necesitas:

1. **Un token de "Protection Bypass for Automation"** del proyecto en Vercel
2. **El nombre del proyecto** en Vercel (ya lo tenemos: `ubits-storybook10`)

## 📋 Pasos para Obtener el Token

### Paso 1: Acceder a la Configuración del Proyecto

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Selecciona el proyecto: **ubits-storybook10** (o el proyecto donde está desplegado el Storybook)
3. Ve a **Settings** → **Deployment Protection**

### Paso 2: Crear el Token de Bypass

1. En la sección **"Protection Bypass for Automation"**, haz clic en **"Add Secret"**
2. Se te pedirá:
   - **Name**: Un nombre para el secret (ej: `storybook-bypass-token`)
   - **Value**: Vercel generará automáticamente un token, o puedes crear uno personalizado
3. **Guarda el token** que se genera (solo se muestra una vez)

### Paso 3: Usar el Token

Una vez que tengas el token, puedes usarlo de tres formas:

#### **Opción A: Como Query Parameter (Más Fácil)**

```
https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=TU_TOKEN_AQUI
```

#### **Opción B: Como Header HTTP**

```bash
curl -H "x-vercel-protection-bypass: TU_TOKEN_AQUI" \
  https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/index.json
```

#### **Opción C: Configurar Cookie (Para Navegador)**

```javascript
// En la consola del navegador
document.cookie = "x-vercel-protection-bypass=TU_TOKEN_AQUI; path=/";
```

## 🔧 Configuración para el Wizard de Autorun

Una vez que tengas el token, puedes configurarlo de dos formas:

### **Método 1: Variable de Entorno**

```bash
export VERCEL_BYPASS_TOKEN="tu_token_aqui"
```

Luego el wizard puede usar:
```
https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${VERCEL_BYPASS_TOKEN}
```

### **Método 2: Modificar UBITSPreset.ts**

Actualizar la URL en `packages/autorun-core/src/wizard/UBITSPreset.ts`:

```typescript
storybook: {
  url: 'https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=TU_TOKEN_AQUI',
  useStorybookComponents: true,
  loadTemplate: 'desktop',
},
```

## ⚠️ Consideraciones de Seguridad

1. **No subas el token a Git**: Agrega el token a `.gitignore` o usa variables de entorno
2. **Rota el token periódicamente**: Por seguridad, cambia el token cada cierto tiempo
3. **Limita el acceso**: Solo comparte el token con personas que necesiten acceso automatizado

## 🧪 Verificar que el Token Funciona

Antes de usar el token en el wizard, verifica que funciona:

```bash
# Reemplaza TU_TOKEN_AQUI con tu token real
curl "https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=TU_TOKEN_AQUI" | head -20
```

Si funciona, deberías ver el JSON del `index.json` del Storybook.

## 📚 Referencias

- [Vercel Protection Bypass for Automation](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation)
- [Vercel Deployment Protection](https://vercel.com/docs/deployment-protection)

