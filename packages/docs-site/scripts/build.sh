#!/bin/bash
set -e

# Detectar la raíz del proyecto (donde está el package.json principal)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Verificar que estamos en el lugar correcto
if [ ! -f "$PROJECT_ROOT/package.json" ]; then
  echo "❌ Error: No se encontró package.json en la raíz del proyecto"
  echo "   Buscado en: $PROJECT_ROOT"
  exit 1
fi

# Ir a la raíz del proyecto
cd "$PROJECT_ROOT"

# Construir tokens
echo "🔨 Construyendo tokens..."
npm run build:tokens

# Construir Storybook
cd packages/docs-site
echo "📚 Construyendo Storybook..."
npm run build-storybook

echo "✅ Build completado!"

