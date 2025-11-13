# 📥 Guía: Exportar Tokens desde Figma usando el Plugin Figma Tokens

## 🎯 Objetivo

Exportar todos los tokens de diseño desde Figma como archivo JSON para compararlos con los tokens del proyecto.

## 📋 Pasos Detallados

### Paso 1: Instalar el Plugin Figma Tokens

1. Abre Figma
2. Ve al archivo de tokens: `https://www.figma.com/design/7wPFICfZXiz2C7t7LXs6Q6/Tokens`
3. En la barra superior, haz clic en el menú de plugins (o presiona `Cmd/Ctrl + /`)
4. Busca "**Figma Tokens**" o "**Tokens Studio for Figma**"
5. Si no lo tienes instalado:
   - Haz clic en "Browse plugins in Community"
   - Busca "Figma Tokens" o "Tokens Studio for Figma"
   - Haz clic en "Install"
6. Si ya lo tienes instalado, solo búscalo en "Installed"

### Paso 2: Abrir el Plugin

1. Con el archivo de tokens abierto en Figma
2. Ve al menú de plugins: `Plugins` → `Figma Tokens` (o `Tokens Studio for Figma`)
3. Se abrirá un panel lateral con el plugin

### Paso 3: Configurar la Exportación

1. En el panel del plugin, busca la sección de **"Export"** o **"Sync"**
2. Selecciona el formato de exportación:
   - **Formato recomendado**: `JSON` o `JSON (nested)`
   - Esto exportará todos los tokens en un formato estructurado

### Paso 4: Exportar los Tokens

1. Haz clic en el botón **"Export"** o **"Download"**
2. El plugin generará un archivo JSON con todos los tokens
3. Guarda el archivo en tu computadora

### Paso 5: Guardar en el Proyecto

1. Copia el archivo JSON exportado
2. Muévelo a la raíz del proyecto Autoframe
3. Renómbralo como: `figma-tokens.json`

**Ubicación final:**
```
/Users/elkinmac/Desktop/Autoframe/figma-tokens.json
```

### Paso 6: Ejecutar la Comparación

Una vez que tengas el archivo `figma-tokens.json` en la raíz del proyecto:

```bash
cd /Users/elkinmac/Desktop/Autoframe
node scripts/compare-figma-tokens.js
```

El script te mostrará:
- ✅ Tokens que están sincronizados
- ➕ Tokens que faltan en el proyecto (están en Figma pero no en el proyecto)
- ➖ Tokens obsoletos (están en el proyecto pero no en Figma)
- 🔄 Tokens con valores diferentes

## 🔄 Alternativa: Si el Plugin no Funciona

Si el plugin "Figma Tokens" no está disponible o no funciona, puedes usar:

### Opción A: Plugin "Tokens" (alternativo)

1. Busca el plugin "**Tokens**" en la comunidad de Figma
2. Sigue los mismos pasos de exportación

### Opción B: Exportar Manualmente desde Variables de Figma

1. En Figma, ve a la página "💎->Tokens"
2. Abre el panel de Variables: `Right sidebar` → `Variables` (icono de variables)
3. Revisa cada colección de variables
4. Documenta manualmente los tokens y sus valores

### Opción C: Usar la API de Figma (si tienes el scope correcto)

Si generas un nuevo token de API con el scope `file_variables:read`, puedo acceder directamente a las variables.

## 📝 Estructura Esperada del JSON

El archivo `figma-tokens.json` debería tener una estructura similar a:

```json
{
  "color": {
    "brand": {
      "ubits-accent-brand": {
        "value": "#0c5bef",
        "type": "color"
      }
    }
  },
  "spacing": {
    "ubits-spacing-xs": {
      "value": "4px",
      "type": "dimension"
    }
  }
}
```

O puede estar en formato anidado como el proyecto actual.

## ✅ Verificación

Después de exportar, verifica que el archivo:

1. ✅ Existe en la raíz del proyecto
2. ✅ Es un JSON válido (puedes abrirlo en un editor)
3. ✅ Contiene tokens con nombres que empiezan con `ubits-`

## 🚀 Siguiente Paso

Una vez que tengas el archivo `figma-tokens.json`, ejecuta:

```bash
node scripts/compare-figma-tokens.js
```

Y te mostraré un análisis completo de las diferencias entre Figma y el proyecto.

## 💡 Tips

- Si el plugin no encuentra los tokens, asegúrate de estar en la página correcta de Figma (💎->Tokens)
- Algunos plugins requieren que los tokens estén en formato específico
- Si tienes problemas, puedes compartir una captura de pantalla del plugin y te ayudo

