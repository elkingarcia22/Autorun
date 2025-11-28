#!/bin/bash
# Script de verificación rápida para Templates UBITS

echo "🔍 Verificando configuración de Templates UBITS..."
echo ""

ERRORS=0
WARNINGS=0

# Verificar archivos de templates
echo "📋 Verificando archivos de templates..."
if [ ! -f "template-admin.html" ]; then
  echo "❌ Falta: template-admin.html"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ template-admin.html existe"
fi

if [ ! -f "template-colaborador.html" ]; then
  echo "❌ Falta: template-colaborador.html"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ template-colaborador.html existe"
fi

# Verificar scripts requeridos
echo ""
echo "📜 Verificando scripts requeridos..."
REQUIRED_SCRIPTS=(
  "components-loader.js"
  "config/products.js"
  "config/theme-manager.js"
  "config/responsive-manager.js"
  "engine/template-loader.js"
  "engine/content-manager.js"
)

for script in "${REQUIRED_SCRIPTS[@]}"; do
  if [ ! -f "$script" ]; then
    echo "❌ Falta: $script"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ $script existe"
  fi
done

# Verificar rutas CSS en templates
echo ""
echo "🎨 Verificando rutas CSS en templates..."
if grep -q "../addons/" template-admin.html 2>/dev/null; then
  echo "⚠️  template-admin.html usa rutas ../addons/ (debería ser ../components/)"
  WARNINGS=$((WARNINGS + 1))
else
  echo "✅ template-admin.html usa rutas correctas"
fi

if grep -q "../addons/" template-colaborador.html 2>/dev/null; then
  echo "⚠️  template-colaborador.html usa rutas ../addons/ (debería ser ../components/)"
  WARNINGS=$((WARNINGS + 1))
else
  echo "✅ template-colaborador.html usa rutas correctas"
fi

# Verificar tokens
echo ""
echo "🎨 Verificando tokens..."
if [ ! -f "../../tokens/dist/tokens.css" ]; then
  echo "⚠️  Tokens no generados. Ejecuta: npm run build:tokens"
  WARNINGS=$((WARNINGS + 1))
else
  echo "✅ Tokens generados"
fi

# Verificar assets
echo ""
echo "🖼️  Verificando assets..."
if [ ! -d "assets/fontawesome" ]; then
  echo "⚠️  Directorio assets/fontawesome no existe"
  WARNINGS=$((WARNINGS + 1))
else
  if [ ! -f "assets/fontawesome/css/all.min.css" ]; then
    echo "⚠️  FontAwesome CSS no encontrado"
    WARNINGS=$((WARNINGS + 1))
  else
    echo "✅ FontAwesome CSS existe"
  fi
fi

if [ ! -d "assets/images" ]; then
  echo "⚠️  Directorio assets/images no existe"
  WARNINGS=$((WARNINGS + 1))
else
  echo "✅ Directorio de imágenes existe"
fi

# Verificar componentes CSS
echo ""
echo "📦 Verificando componentes CSS..."
COMPONENTS=(
  "sidebar"
  "subnav"
  "tabbar"
  "button"
  "alert"
  "input"
  "card"
)

MISSING_CSS=0
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

for component in "${COMPONENTS[@]}"; do
  CSS_PATH="$PROJECT_ROOT/packages/components/${component}/src/styles/${component}.css"
  if [ ! -f "$CSS_PATH" ]; then
    echo "⚠️  Falta CSS: $CSS_PATH"
    MISSING_CSS=$((MISSING_CSS + 1))
  fi
done

if [ $MISSING_CSS -eq 0 ]; then
  echo "✅ Componentes CSS principales existen"
else
  echo "⚠️  Faltan $MISSING_CSS archivos CSS de componentes"
  WARNINGS=$((WARNINGS + MISSING_CSS))
fi

# Verificar contenedores en templates
echo ""
echo "📦 Verificando contenedores en templates..."
if grep -q 'id="sidebar-container"' template-admin.html 2>/dev/null && \
   grep -q 'id="top-nav-container"' template-admin.html 2>/dev/null && \
   grep -q 'id="tab-bar-container"' template-admin.html 2>/dev/null; then
  echo "✅ template-admin.html tiene todos los contenedores"
else
  echo "⚠️  template-admin.html falta algún contenedor"
  WARNINGS=$((WARNINGS + 1))
fi

if grep -q 'id="sidebar-container"' template-colaborador.html 2>/dev/null && \
   grep -q 'id="top-nav-container"' template-colaborador.html 2>/dev/null && \
   grep -q 'id="tab-bar-container"' template-colaborador.html 2>/dev/null; then
  echo "✅ template-colaborador.html tiene todos los contenedores"
else
  echo "⚠️  template-colaborador.html falta algún contenedor"
  WARNINGS=$((WARNINGS + 1))
fi

# Resumen
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo "✅ ¡Todo está configurado correctamente!"
  echo "🚀 Puedes iniciar un servidor HTTP y abrir los templates"
  echo ""
  echo "Ejemplo:"
  echo "  python3 -m http.server 8000"
  echo "  # Luego abre: http://localhost:8000/template-admin.html"
elif [ $ERRORS -eq 0 ]; then
  echo "⚠️  Se encontraron $WARNINGS advertencia(s). Revisa los mensajes arriba."
  echo "📖 Consulta SETUP-TEMPLATES.md para más detalles"
  echo ""
  echo "Los templates pueden funcionar, pero revisa las advertencias."
else
  echo "❌ Se encontraron $ERRORS error(es) y $WARNINGS advertencia(s)."
  echo "📖 Consulta SETUP-TEMPLATES.md para más detalles"
  echo ""
  echo "⚠️  Corrige los errores antes de usar los templates."
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit $ERRORS

