#!/bin/bash
set -e

# Ir a la raíz del proyecto
cd "$(dirname "$0")/../../.."

# Construir tokens
echo "🔨 Construyendo tokens..."
npm run build:tokens

# Volver a docs-site y construir Storybook
cd packages/docs-site
echo "📚 Construyendo Storybook..."
npm run build-storybook

echo "✅ Build completado!"

