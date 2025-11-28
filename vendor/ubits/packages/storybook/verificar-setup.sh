#!/bin/bash
# Script de verificación rápida para Storybook UBITS

echo "🔍 Verificando configuración de Storybook..."
echo ""

ERRORS=0

# Verificar archivos de configuración
echo "📋 Verificando archivos de configuración..."
if [ ! -f ".storybook/main.ts" ]; then
  echo "❌ Falta: .storybook/main.ts"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ .storybook/main.ts existe"
fi

if [ ! -f ".storybook/preview.ts" ]; then
  echo "❌ Falta: .storybook/preview.ts"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ .storybook/preview.ts existe"
fi

if [ ! -f ".storybook/plugins/ignore-tsconfig-node-json.ts" ]; then
  echo "❌ Falta: .storybook/plugins/ignore-tsconfig-node-json.ts"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ Plugin ignore-tsconfig-node-json.ts existe"
fi

# Verificar dependencias
echo ""
echo "📦 Verificando dependencias..."
if [ ! -d "node_modules/@storybook/html-vite" ]; then
  echo "❌ Falta: @storybook/html-vite"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ @storybook/html-vite instalado"
fi

# Verificar tokens
echo ""
echo "🎨 Verificando tokens..."
if [ ! -f "../../tokens/dist/tokens.css" ]; then
  echo "⚠️  Tokens no generados. Ejecuta: npm run build:tokens"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ Tokens generados"
fi

# Verificar assets
echo ""
echo "🖼️  Verificando assets..."
if [ ! -d "stories/assets/images" ]; then
  echo "⚠️  Directorio stories/assets/images no existe"
else
  echo "✅ Directorio de imágenes existe"
fi

if [ ! -d "stories/assets/webfonts" ]; then
  echo "⚠️  Directorio stories/assets/webfonts no existe"
else
  echo "✅ Directorio de fuentes existe"
fi

if [ ! -f "docs-site/.storybook/fontawesome-icons.css" ]; then
  echo "⚠️  FontAwesome CSS no encontrado"
else
  echo "✅ FontAwesome CSS existe"
fi

# Resumen
echo ""
if [ $ERRORS -eq 0 ]; then
  echo "✅ Todo está configurado correctamente!"
  echo "🚀 Puedes iniciar Storybook con: npm run storybook"
else
  echo "❌ Se encontraron $ERRORS problema(s). Revisa los mensajes arriba."
  echo "📖 Consulta SETUP-STORYBOOK.md para más detalles"
fi

exit $ERRORS

