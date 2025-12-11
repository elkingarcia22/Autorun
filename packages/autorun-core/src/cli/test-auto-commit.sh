#!/bin/bash
# Script de prueba para verificar auto-commit del GitHub add-on

echo "🚀 Iniciando prueba de auto-commit..."
echo ""

# Iniciar daemon en background
echo "1️⃣ Iniciando AutorunHub daemon..."
npm run autorun:daemon > /tmp/autorun-test.log 2>&1 &
DAEMON_PID=$!
echo "   Daemon PID: $DAEMON_PID"
echo "   Esperando 10 segundos para inicialización..."
sleep 10

# Verificar que está corriendo
if ! ps -p $DAEMON_PID > /dev/null; then
    echo "❌ El daemon no está corriendo. Revisa /tmp/autorun-test.log"
    exit 1
fi

echo "✅ Daemon corriendo"
echo ""

# Hacer un cambio
TEST_FILE="prototypes/test-auto-commit-$(date +%s).txt"
echo "2️⃣ Creando archivo de prueba: $TEST_FILE"
echo "🧪 TEST AUTO-COMMIT - $(date +%Y-%m-%d\ %H:%M:%S)" > "$TEST_FILE"
echo "✅ Archivo creado"
echo ""

# Esperar commit
echo "3️⃣ Esperando commit automático (10 segundos)..."
sleep 10

# Verificar commit
echo "4️⃣ Verificando commit..."
LAST_COMMIT=$(git log --oneline -1)
echo "   Último commit: $LAST_COMMIT"

if git log --oneline -1 | grep -q "Auto-commit"; then
    echo "✅ ¡Commit automático detectado!"
else
    echo "⚠️  No se detectó commit automático"
    echo "   Revisa los logs: tail -50 /tmp/autorun-test.log | grep -E '\[GitHub|FileWatcher'"
fi

# Detener daemon
echo ""
echo "5️⃣ Deteniendo daemon..."
kill $DAEMON_PID 2>/dev/null
sleep 2

# Limpiar
if [ -f "$TEST_FILE" ]; then
    echo "   Archivo de prueba: $TEST_FILE"
fi

echo ""
echo "✅ Prueba completada"



