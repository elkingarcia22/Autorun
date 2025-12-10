#!/bin/bash

# Script para configurar Storybook MCP automáticamente
# Este script instala el addon @storybook/addon-mcp y lo configura

set -e

echo "🔧 Configurando Storybook MCP..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Detectar la ubicación del Storybook
STORYBOOK_DIR="vendor/ubits/packages/storybook"

if [ ! -d "$STORYBOOK_DIR" ]; then
    echo "❌ No se encontró el directorio de Storybook en: $STORYBOOK_DIR"
    echo "💡 Verifica que vendor/ubits/packages/storybook existe"
    exit 1
fi

cd "$STORYBOOK_DIR"

echo "📦 Instalando @storybook/addon-mcp..."
npm install -D @storybook/addon-mcp

echo "✅ Addon instalado"

# Verificar si el addon ya está en main.ts
if grep -q "@storybook/addon-mcp" .storybook/main.ts 2>/dev/null; then
    echo "✅ Addon ya está configurado en .storybook/main.ts"
    else
    echo "⚠️  Necesitas agregar manualmente el addon a .storybook/main.ts:"
echo ""
    echo "   addons: ["
    echo "     getAbsolutePath('@storybook/addon-docs'),"
    echo "     getAbsolutePath('@storybook/addon-mcp')  // ← Agregar esta línea"
    echo "   ],"
echo ""
    echo "💡 O ejecuta este script nuevamente después de agregarlo manualmente"
fi

echo ""
echo "${GREEN}✅ Storybook MCP configurado${NC}"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Asegúrate de que el addon esté en .storybook/main.ts"
echo "   2. Inicia Storybook: npm run storybook"
echo "   3. El servidor MCP estará disponible en: http://localhost:6006/mcp"
echo "   4. Configura .cursor/mcp.json con:"
echo "      {"
echo "        \"mcpServers\": {"
echo "          \"storybook\": {"
echo "            \"url\": \"http://localhost:6006/mcp\""
echo "          }"
echo "        }"
echo "      }"
