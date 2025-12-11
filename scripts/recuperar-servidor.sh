#!/bin/bash
# Script de recuperación automática del servidor después de reiniciar

echo "🔄 Recuperando servidor de Autorun..."
echo ""

# 1. Detener servidor personalizado (si existe)
if ps aux | grep -q "[s]tart-server.mjs"; then
    echo "⚠️  Deteniendo servidor personalizado..."
    pkill -f "start-server.mjs"
    sleep 1
    echo "✅ Servidor personalizado detenido"
else
    echo "✅ No hay servidor personalizado corriendo"
fi

# 2. Verificar puerto 3000
if lsof -i :3000 > /dev/null 2>&1; then
    echo "⚠️  Puerto 3000 está en uso"
    echo "   Procesos en el puerto 3000:"
    lsof -i :3000
    echo ""
    read -p "¿Deseas detener estos procesos? (s/n): " respuesta
    if [ "$respuesta" = "s" ] || [ "$respuesta" = "S" ]; then
        lsof -ti :3000 | xargs kill -9 2>/dev/null
        sleep 1
        echo "✅ Procesos detenidos"
    else
        echo "⚠️  No se detuvieron los procesos. Puede haber conflictos."
    fi
else
    echo "✅ Puerto 3000 está libre"
fi

# 3. Verificar disponibilidad del DataTable en Vercel
echo ""
echo "🔍 Verificando disponibilidad del DataTable en Vercel..."
VERCEL_URL="https://ubits-storybook10.vercel.app/components/data-table/dist/data-table.umd.js"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL")

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ DataTable está disponible en Vercel"
    echo "   URL: $VERCEL_URL"
    echo ""
    echo "💡 Puedes actualizar el HTML para usar Vercel:"
    echo "   Cambiar: /vendor/ubits/packages/components/data-table/dist/data-table.umd.js"
    echo "   Por:     /vercel-proxy/components/data-table/dist/data-table.umd.js"
else
    echo "⚠️  DataTable NO está disponible en Vercel (HTTP $HTTP_CODE)"
    echo "   Se mantendrá la ruta local temporalmente"
fi

# 4. Iniciar LocalServer oficial
echo ""
echo "🚀 Iniciando LocalServer oficial..."
echo ""

# Verificar si npm está disponible
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está disponible. Por favor, instala Node.js y npm."
    exit 1
fi

# Verificar si existe package.json
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

# Opción 1: Intentar iniciar con start-local-server.js
if [ -f "start-local-server.js" ]; then
    echo "📦 Iniciando servidor con start-local-server.js..."
    node start-local-server.js &
    SERVER_PID=$!
    sleep 2
    
    # Verificar si el servidor está corriendo
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ Servidor iniciado correctamente (PID: $SERVER_PID)"
        echo ""
        echo "🌐 Servidor disponible en: http://localhost:3000"
        echo ""
        echo "💡 Para detener el servidor:"
        echo "   kill $SERVER_PID"
        echo "   O presiona Ctrl+C en la terminal donde se inició"
        exit 0
    else
        echo "⚠️  El servidor no se inició correctamente"
    fi
fi

# Opción 2: Usar npm run init (si start-local-server.js falla)
echo ""
echo "📦 Intentando iniciar con npm run init..."
echo "   (Esto ejecutará el wizard si no está configurado)"
echo ""

read -p "¿Deseas ejecutar npm run init? (s/n): " respuesta
if [ "$respuesta" = "s" ] || [ "$respuesta" = "S" ]; then
    npm run init
else
    echo ""
    echo "💡 Para iniciar el servidor manualmente:"
    echo "   npm run init"
    echo "   O: node start-local-server.js"
fi




