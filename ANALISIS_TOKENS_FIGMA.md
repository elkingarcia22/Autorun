# Análisis de Tokens: Comparación Figma vs Proyecto Actual

## ⚠️ Limitación de Acceso

El token de API de Figma proporcionado no tiene el scope `file_variables:read` necesario para leer las variables/tokens directamente desde la API.

**Solución requerida:**
1. Generar un nuevo token de API en Figma con el scope `file_variables:read`
2. O exportar manualmente los tokens desde Figma como JSON
3. O compartir capturas de pantalla de las secciones de tokens

## 📋 Tokens Actuales en el Proyecto (por categorías)

### 1. Brand
- `ubits-accent-brand` y variantes (inverted, static)
- `ubits-accent-success`
- `ubits-logo` y variantes

### 2. Foreground
- `ubits-fg-1-high/medium` y variantes
- `ubits-fg-2-high/medium` y variantes
- `ubits-fg-disabled`, `ubits-fg-on-disabled`
- `ubits-fg-bold`
- Colores foreground: blue, gray, yellow, green, teal, purple, pink, rose (con variantes subtle/bold)

### 3. Background
- `ubits-bg-1` a `ubits-bg-5`
- `ubits-bg-active`
- `ubits-bg-dim`
- `ubits-bg-disabled`

### 4. Borders
- `ubits-border-1`, `ubits-border-2`
- `ubits-border-disabled`
- Borders coloreados: blue, gray, green, teal, indigo, purple, pink, yellow, rose
- Variantes: inverted, static, static-inverted

### 5. Feedback
- Success, Info, Warning, Error
- Cada uno con: bg-subtle, fg-subtle, accent, borders
- Variantes: inverted, static, hover

### 6. Spacing
- `ubits-spacing-none` hasta `ubits-spacing-96`
- Valores: 0, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 64px, 80px, 96px, 128px, 160px, 192px, 256px, 320px, 384px

### 7. Border Radius
- `ubits-border-radius-none` hasta `ubits-border-radius-full`
- Valores: 0, 4px, 8px, 12px, 16px, 20px, 1000px

### 8. Componentes específicos
- Sidebar
- Button
- Chart
- Toast
- BottomNav

## 🔄 Próximos Pasos

Una vez que tengamos acceso a los tokens de Figma, compararemos:

1. **Tokens faltantes**: Tokens en Figma que no están en el proyecto
2. **Tokens actualizados**: Tokens que existen en ambos pero con valores diferentes
3. **Tokens obsoletos**: Tokens en el proyecto que ya no existen en Figma
4. **Nuevas categorías**: Categorías de tokens nuevas en Figma

## 📝 Notas

- El archivo de tokens está en: `packages/tokens/tokens.json`
- El CSS compilado está en: `packages/tokens/dist/tokens.css`
- Se usa Style Dictionary para compilar los tokens

