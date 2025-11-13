# 📊 Análisis Comparativo: Tokens Figma vs Proyecto Actual

## ⚠️ Limitación Técnica

No es posible acceder directamente a las **Variables de Figma** (tokens) a través de la API porque:
- El token de API requiere el scope `file_variables:read` que no está disponible
- Los tokens en Figma están almacenados como Variables, no como texto plano

## 📋 Tokens Actuales en el Proyecto

### Resumen General
- **Total de tokens únicos**: ~400+ tokens
- **Categorías**: 30 categorías
- **Modos**: Light y Dark

### Categorías de Tokens Existentes

#### 1. **Brand** (12 tokens)
- `ubits-accent-brand` y variantes (inverted, static)
- `ubits-accent-success`
- `ubits-logo` y variantes

#### 2. **Foreground** (25 tokens)
- `ubits-fg-1-high/medium` y variantes
- `ubits-fg-2-high/medium` y variantes
- `ubits-fg-disabled`, `ubits-fg-on-disabled`
- `ubits-fg-bold`

#### 3. **Colores Foreground por Color** (8 tokens cada uno)
- **Blue**: `ubits-fg-blue-subtle` y variantes
- **Gray**: `ubits-fg-gray-subtle` y variantes
- **Yellow**: `ubits-fg-yellow-subtle`, `ubits-fg-yellow-bold` y variantes
- **Green**: `ubits-fg-green-subtle` y variantes
- **Teal**: `ubits-fg-teal-subtle` y variantes
- **Purple**: `ubits-fg-purple-subtle` y variantes
- **Pink**: `ubits-fg-pink-subtle` y variantes
- **Rose**: `ubits-fg-rose-subtle` y variantes

#### 4. **Background** (8 tokens)
- `ubits-bg-1` a `ubits-bg-5`
- `ubits-bg-active`
- `ubits-bg-dim`
- `ubits-bg-disabled`

#### 5. **Borders** (48 tokens total)
- **Main**: `ubits-border-1`, `ubits-border-2`, `ubits-border-disabled`
- **Colored**: blue, gray, green, teal, indigo, purple, pink, yellow, rose
- **Variantes**: inverted, static, static-inverted para cada uno

#### 6. **Feedback** (74 tokens total)
- **Success** (14 tokens): bg-subtle, fg-subtle, accent, borders y variantes
- **Info** (14 tokens): bg-subtle, fg-subtle, accent, borders y variantes
- **Warning** (16 tokens): bg-subtle, fg-subtle, fg-bold, accent, borders y variantes
- **Error** (14 tokens): bg-subtle, fg-subtle, accent, borders y variantes
- **Borders** (16 tokens): success, info, warning, error con variantes

#### 7. **Spacing** (24 tokens)
- `ubits-spacing-none` hasta `ubits-spacing-96`
- Valores: 0, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 64px, 80px, 96px, 128px, 160px, 192px, 256px, 320px, 384px

#### 8. **Border Radius** (7 tokens)
- `ubits-border-radius-none` hasta `ubits-border-radius-full`
- Valores: 0, 4px, 8px, 12px, 16px, 20px, 1000px

#### 9. **Componentes Específicos**
- **Sidebar** (10 tokens)
- **Button** (18 tokens)
- **Chart** (2 tokens)
- **Toast** (1 token)
- **BottomNav** (1 token)

## 🔍 Estructura de Tokens en Figma (según API)

### Secciones Encontradas:
1. **💎 Color** (43 elementos)
   - Primitive token colors
   - Semantic token colors
   - Token nesting structure

2. **💎 Typography** (63 elementos)
   - Tipografía y estilos de texto

3. **💎 Spacing** (11 elementos)
   - Tokens de espaciado

4. **💎 Border Radius** (4 elementos)
   - Tokens de radio de borde

5. **💎 Elevation** (2 elementos)
   - Tokens de elevación/sombras

## 📝 Checklist de Comparación Manual

Para completar el análisis, necesitamos comparar manualmente:

### ✅ Colores
- [ ] Verificar todos los colores primitivos en Figma
- [ ] Comparar colores semánticos (foreground, background)
- [ ] Verificar colores de feedback (success, info, warning, error)
- [ ] Comparar colores de borders
- [ ] Verificar colores de componentes específicos

### ✅ Tipografía
- [ ] Comparar tokens de tipografía
- [ ] Verificar tamaños de fuente
- [ ] Comparar pesos de fuente
- [ ] Verificar line-heights

### ✅ Spacing
- [ ] Comparar valores de spacing
- [ ] Verificar si hay nuevos valores
- [ ] Verificar si hay valores obsoletos

### ✅ Border Radius
- [ ] Comparar valores de border-radius
- [ ] Verificar si hay nuevos valores

### ✅ Elevation
- [ ] Verificar tokens de elevación (sombras)
- [ ] Comparar con los estilos de elevación existentes

## 🎯 Próximos Pasos

1. **Opción 1**: Exportar tokens desde Figma usando el plugin "Figma Tokens"
   - Instalar el plugin en Figma
   - Exportar tokens como JSON
   - Comparar con `packages/tokens/tokens.json`

2. **Opción 2**: Revisar manualmente en Figma
   - Abrir la página "💎->Tokens" en Figma
   - Revisar cada sección
   - Documentar tokens nuevos o actualizados

3. **Opción 3**: Generar nuevo token de API con scope `file_variables:read`
   - Ir a Figma Settings → Account → Personal access tokens
   - Crear nuevo token con scope `file_variables:read`
   - Usar para acceder directamente a las variables

## 📂 Archivos del Proyecto

- **Tokens JSON**: `packages/tokens/tokens.json`
- **Tokens CSS**: `packages/tokens/dist/tokens.css`
- **Configuración**: `packages/tokens/style-dictionary.config.json`

## 🔧 Comandos Útiles

```bash
# Recompilar tokens después de actualizar
cd packages/tokens && npm run build

# Ver tokens actuales
cat packages/tokens/tokens.json | python3 -m json.tool | less
```

