#!/bin/bash
# Script para desplegar el index.html a Vercel

set -e

echo "🚀 Desplegando index.html a Vercel..."

# Copiar el index.html al directorio de deploy
cp packages/proyecto-app/tokens/index.html deploy/index.html

echo "✅ Archivo copiado a deploy/"

# Ir al directorio de deploy y desplegar
cd deploy

# Desplegar a producción
npx vercel --prod --yes

echo "✅ Deploy completado!"



