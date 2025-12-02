#!/bin/bash
# Script para ejecutar el wizard de Autorun desde cualquier directorio del proyecto
# Busca automáticamente el directorio Autorun y ejecuta npm run init

# Función para buscar el directorio Autorun
find_autorun() {
    local current_dir="$PWD"
    
    # Buscar hacia arriba desde el directorio actual
    while [ "$current_dir" != "/" ]; do
        if [ -d "$current_dir/Autorun" ] && [ -f "$current_dir/Autorun/package.json" ]; then
            echo "$current_dir/Autorun"
            return 0
        fi
        current_dir=$(dirname "$current_dir")
    done
    
    # Si no se encuentra, buscar en el directorio actual
    if [ -d "./Autorun" ] && [ -f "./Autorun/package.json" ]; then
        echo "./Autorun"
        return 0
    fi
    
    return 1
}

# Buscar directorio Autorun
AUTORUN_DIR=$(find_autorun)

if [ -z "$AUTORUN_DIR" ]; then
    echo "❌ No se encontró el directorio Autorun."
    echo "💡 Asegúrate de estar en un proyecto que contiene Autorun."
    echo "💡 O ejecuta desde el directorio Autorun directamente:"
    echo "   cd Autorun && npm run init"
    exit 1
fi

echo "📁 Directorio Autorun encontrado: $AUTORUN_DIR"
echo "🚀 Ejecutando wizard de inicialización...\n"

# Cambiar al directorio Autorun y ejecutar init
cd "$AUTORUN_DIR" || exit 1
npm run init "$@"

