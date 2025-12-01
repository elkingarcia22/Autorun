#!/bin/bash

# Script para configurar Storybook MCP en Cursor
# Este script ayuda a configurar el servidor MCP de Storybook

echo "🔧 Configuración de Storybook MCP para Cursor"
echo ""

# Detectar sistema operativo
if [[ "$OSTYPE" == "darwin"* ]]; then
    MCP_CONFIG_PATH="$HOME/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json"
    echo "📱 Sistema detectado: macOS"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    MCP_CONFIG_PATH="$HOME/.config/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json"
    echo "📱 Sistema detectado: Linux"
else
    echo "⚠️  Sistema operativo no reconocido. Por favor, configura manualmente."
    exit 1
fi

echo "📁 Ruta de configuración: $MCP_CONFIG_PATH"
echo ""

# Verificar si Storybook está corriendo
echo "🔍 Verificando Storybook local..."
if curl -s http://localhost:6006/index.json > /dev/null 2>&1; then
    echo "✅ Storybook local está corriendo en http://localhost:6006"
    STORYBOOK_URL="http://localhost:6006/index.json"
else
    echo "⚠️  Storybook local no está corriendo"
    echo "   Iniciando Storybook..."
    cd vendor/ubits/packages/storybook
    npm run storybook > /dev/null 2>&1 &
    sleep 5
    if curl -s http://localhost:6006/index.json > /dev/null 2>&1; then
        echo "✅ Storybook iniciado correctamente"
        STORYBOOK_URL="http://localhost:6006/index.json"
    else
        echo "❌ No se pudo iniciar Storybook. Usando URL de Vercel como fallback."
        STORYBOOK_URL="https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/index.json"
    fi
    cd - > /dev/null
fi

echo ""
echo "📝 Configuración MCP:"
echo "   STORYBOOK_URL: $STORYBOOK_URL"
echo ""

# Crear directorio si no existe
mkdir -p "$(dirname "$MCP_CONFIG_PATH")"

# Crear o actualizar configuración
if [ -f "$MCP_CONFIG_PATH" ]; then
    echo "📄 Archivo de configuración existe. Creando backup..."
    cp "$MCP_CONFIG_PATH" "${MCP_CONFIG_PATH}.backup.$(date +%Y%m%d_%H%M%S)"
    
    # Verificar si ya existe la configuración de storybook-ubits
    if grep -q "storybook-ubits" "$MCP_CONFIG_PATH"; then
        echo "⚠️  La configuración de storybook-ubits ya existe."
        echo "   Por favor, actualiza manualmente la URL si es necesario."
    else
        echo "➕ Agregando configuración de storybook-ubits..."
        # Aquí necesitarías usar jq o similar para agregar al JSON
        echo "   Por favor, agrega manualmente la configuración (ver GUIA-CONFIGURACION-STORYBOOK-MCP.md)"
    fi
else
    echo "📄 Creando nuevo archivo de configuración..."
    cat > "$MCP_CONFIG_PATH" << JSON
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "$STORYBOOK_URL"
      }
    }
  }
}
JSON
    echo "✅ Archivo de configuración creado"
fi

echo ""
echo "✅ Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Reinicia Cursor para que los cambios surtan efecto"
echo "   2. Verifica que el MCP esté funcionando preguntando al asistente:"
echo "      'Lista los componentes disponibles en Storybook'"
echo ""
echo "📚 Para más información, consulta: GUIA-CONFIGURACION-STORYBOOK-MCP.md"
