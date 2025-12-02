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

# Construir tokens directamente desde packages/tokens/build-css.cjs
# Este script solo usa módulos nativos de Node.js, no requiere dependencias
TOKENS_DIR="$PROJECT_ROOT/packages/tokens"
TOKENS_DIST="$TOKENS_DIR/dist"

echo "🔨 Construyendo tokens..."
if [ -f "$TOKENS_DIR/build-css.cjs" ]; then
  # Ejecutar build-css.cjs directamente (solo usa fs y path, módulos nativos)
  cd "$TOKENS_DIR"
  node build-css.cjs
  cd "$PROJECT_ROOT"
  echo "✅ Tokens construidos exitosamente"
elif [ -f "$TOKENS_DIST/tokens.css" ] && [ -f "$TOKENS_DIST/figma-tokens.css" ]; then
  echo "✅ Tokens ya existen, saltando construcción..."
else
  echo "⚠️  No se encontró build-css.cjs ni tokens pre-construidos"
  if [ ! -f "$TOKENS_DIST/tokens.css" ]; then
    echo "❌ Error: Tokens no encontrados y no se pudieron construir"
    exit 1
  fi
fi

# Construir Storybook
cd packages/storybook
echo "📚 Construyendo Storybook..."
npx storybook build

echo "✅ Build completado!"

