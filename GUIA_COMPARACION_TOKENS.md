# 🔍 Guía para Comparar Tokens de Figma con el Proyecto

## 📋 Situación Actual

He analizado los tokens actuales del proyecto y he identificado la estructura de tokens en Figma. Sin embargo, **no puedo acceder directamente a las Variables de Figma** porque el token de API no tiene el scope `file_variables:read` necesario.

## 📊 Resumen de Tokens del Proyecto

- **Total de tokens**: 302 tokens únicos
- **Categorías**: 30 categorías
- **Modos**: Light y Dark

### Categorías Principales:

1. **Brand** (12 tokens)
2. **Foreground** (25 tokens) + Colores por tipo (8 tokens cada uno: blue, gray, yellow, green, teal, purple, pink, rose)
3. **Background** (8 tokens)
4. **Borders** (48 tokens: main, colored, inverted, static)
5. **Feedback** (74 tokens: success, info, warning, error)
6. **Spacing** (24 tokens)
7. **Border Radius** (7 tokens)
8. **Componentes específicos**: Sidebar, Button, Chart, Toast, BottomNav

## 🎯 Opciones para Obtener Tokens de Figma

### Opción 1: Plugin Figma Tokens (Recomendado) ⭐

1. Instalar el plugin "Figma Tokens" en Figma
2. Abrir el archivo de tokens en Figma
3. Usar el plugin para exportar todos los tokens como JSON
4. Guardar el archivo como `figma-tokens.json` en la raíz del proyecto
5. Ejecutar el script de comparación:
   ```bash
   node scripts/compare-figma-tokens.js
   ```

### Opción 2: Exportar Manualmente desde Figma

1. Abrir la página "💎->Tokens" en Figma
2. Revisar cada sección:
   - 💎 Color
   - 💎 Typography
   - 💎 Spacing
   - 💎 Border Radius
   - 💎 Elevation
3. Documentar manualmente:
   - Tokens nuevos
   - Tokens con valores actualizados
   - Tokens que faltan en el proyecto

### Opción 3: Generar Token de API con Scope Correcto

1. Ir a Figma → Settings → Account → Personal access tokens
2. Crear un nuevo token
3. **Asegurarse de incluir el scope**: `file_variables:read`
4. Compartir el nuevo token para que pueda acceder directamente

## 📝 Checklist de Comparación por Categoría

### 🎨 Colores

#### Primitive Colors
- [ ] Verificar todos los colores primitivos (si existen en Figma)
- [ ] Comparar valores hex/rgb

#### Semantic Colors
- [ ] **Foreground**: `ubits-fg-1-*`, `ubits-fg-2-*`
- [ ] **Background**: `ubits-bg-1` a `ubits-bg-5`
- [ ] **Colores por tipo**: blue, gray, yellow, green, teal, purple, pink, rose
- [ ] Verificar variantes: inverted, static, hover

#### Feedback Colors
- [ ] Success: bg-subtle, fg-subtle, accent, borders
- [ ] Info: bg-subtle, fg-subtle, accent, borders
- [ ] Warning: bg-subtle, fg-subtle, fg-bold, accent, borders
- [ ] Error: bg-subtle, fg-subtle, accent, borders

#### Border Colors
- [ ] Main: `ubits-border-1`, `ubits-border-2`, `ubits-border-disabled`
- [ ] Colored: blue, gray, green, teal, indigo, purple, pink, yellow, rose
- [ ] Variantes: inverted, static, static-inverted

### 📐 Spacing

- [ ] Comparar todos los valores de spacing
- [ ] Verificar si hay nuevos valores (ej: `ubits-spacing-14`, `ubits-spacing-18`)
- [ ] Verificar si hay valores obsoletos

**Valores actuales**: 0, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 64px, 80px, 96px, 128px, 160px, 192px, 256px, 320px, 384px

### 🔲 Border Radius

- [ ] Comparar valores de border-radius
- [ ] Verificar si hay nuevos valores

**Valores actuales**: 0, 4px, 8px, 12px, 16px, 20px, 1000px

### 📏 Typography

- [ ] Comparar tokens de tipografía (si existen en Figma)
- [ ] Verificar tamaños de fuente
- [ ] Comparar pesos de fuente (regular, semibold, bold)
- [ ] Verificar line-heights

### 🌓 Elevation

- [ ] Verificar tokens de elevación (sombras)
- [ ] Comparar con estilos existentes en el proyecto

## 🔧 Scripts Disponibles

### Script de Comparación

He creado un script en `scripts/compare-figma-tokens.js` que:
- Lee los tokens del proyecto
- Compara con tokens de Figma (si se proporciona `figma-tokens.json`)
- Identifica tokens faltantes, obsoletos y con valores diferentes

**Uso:**
```bash
# 1. Exportar tokens de Figma como figma-tokens.json
# 2. Ejecutar:
node scripts/compare-figma-tokens.js
```

## 📂 Archivos Relevantes

- **Tokens del proyecto**: `packages/tokens/tokens.json`
- **CSS compilado**: `packages/tokens/dist/tokens.css`
- **Configuración**: `packages/tokens/style-dictionary.config.json`
- **Script de comparación**: `scripts/compare-figma-tokens.js`
- **Análisis detallado**: `ANALISIS_TOKENS_COMPARACION.md`

## 🚀 Próximos Pasos

1. **Obtener tokens de Figma** usando una de las opciones arriba
2. **Ejecutar el script de comparación** para identificar diferencias
3. **Actualizar `tokens.json`** con los nuevos/actualizados tokens
4. **Recompilar tokens**: `cd packages/tokens && npm run build`
5. **Verificar** que los cambios se reflejen correctamente

## 💡 Recomendación

La forma más eficiente es usar el **plugin Figma Tokens** para exportar todos los tokens como JSON. Esto permitirá:
- Comparación automática
- Identificación precisa de diferencias
- Actualización sistemática de tokens

¿Quieres que te ayude a configurar el plugin o prefieres hacer la comparación manualmente?

