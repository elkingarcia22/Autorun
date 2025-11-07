#!/bin/bash

# Script para desplegar Storybook a Vercel

echo "🚀 Desplegando Storybook a Vercel..."

# Ir al directorio de docs-site
cd "$(dirname "$0")/.."

# Verificar que el build existe
if [ ! -d "storybook-static" ]; then
  echo "📦 Construyendo Storybook..."
  npm run build-storybook
fi

# Desplegar a Vercel
echo "🌐 Desplegando a Vercel..."
npx vercel --prod --yes

echo "✅ Storybook desplegado exitosamente!"

