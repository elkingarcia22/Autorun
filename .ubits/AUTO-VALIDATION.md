# 🤖 Sistema de Auto-Validación UBITS

## ✅ **Validación 100% Automática - Sin Intervención Manual**

El sistema está configurado para **validar y corregir automáticamente** sin que tengas que hacer nada.

## 🚀 **Cómo Funciona**

### **1. Pre-Commit Hook Automático**
Cuando hagas `git commit`, el sistema:
1. ✅ Detecta archivos modificados automáticamente
2. ✅ Ejecuta el validador UBITS
3. ✅ Corrige errores automáticamente (colores, tipografía)
4. ✅ Bloquea el commit si hay errores que no puede corregir

### **2. Comandos Manuales (Opcionales)**

```bash
# Solo validar (sin corregir)
npm run validate

# Validar y corregir automáticamente
npm run validate:fix

# Validar todos los archivos (no solo staged)
npm run validate:all:fix
```

## 📋 **Qué Corrige Automáticamente**

### ✅ **1. Clases de Tipografía Prohibidas**
- `ubits-h1` → `ubits-heading-h1`
- `ubits-title` → `ubits-body-md-bold`
- `ubits-body-lg-bold` → `ubits-heading-h1`
- Y más...

### ✅ **2. Colores Hardcodeados Comunes**
- `white` → `var(--ubits-bg-1)`
- `black` → `var(--ubits-fg-1-high)`
- `#ffffff` → `var(--ubits-bg-1)`
- `#000000` → `var(--ubits-fg-1-high)`
- Y más...

## 🔧 **Instalación (Solo Primera Vez)**

Si Husky no está instalado, ejecuta:

```bash
npm install
```

Esto instalará Husky y configurará el pre-commit hook automáticamente.

## ⚙️ **Configuración**

El sistema está completamente configurado en:
- **Hook:** `.husky/pre-commit` - Se ejecuta automáticamente en cada commit
- **Script:** `scripts/validate-ubits.cjs` - Validador con auto-fix
- **Config:** `package.json` - Scripts npm configurados

## 🎯 **Flujo de Trabajo Automático**

```
1. Modificas código
   ↓
2. Haces git add .
   ↓
3. Haces git commit
   ↓
4. 🔄 Pre-commit hook se ejecuta AUTOMÁTICAMENTE
   ↓
5. ✅ Sistema valida y corrige automáticamente
   ↓
6. Si todo está bien → Commit se completa
   Si hay errores no corregibles → Commit bloqueado
```

## 🚨 **Si el Commit es Bloqueado**

Si el sistema encuentra errores que no puede corregir automáticamente:

1. Revisa los errores mostrados
2. Corrígelos manualmente
3. Ejecuta `npm run validate:fix` para corregir lo que pueda
4. Intenta hacer commit de nuevo

## 📝 **Ejemplo de Uso**

```bash
# Modificas un archivo
echo "color: white;" >> test.css

# Agregas al staging
git add test.css

# Intentas hacer commit
git commit -m "Test"

# 🔄 El sistema automáticamente:
#   1. Detecta el color hardcodeado
#   2. Lo corrige a var(--ubits-bg-1)
#   3. Permite el commit

# ✅ Commit completado con correcciones aplicadas
```

## 💡 **Notas Importantes**

- ✅ **No necesitas ejecutar nada manualmente** - Todo es automático
- ✅ **Las correcciones se aplican directamente** a los archivos
- ✅ **Si el commit pasa, las correcciones están aplicadas**
- ⚠️ **Revisa los cambios** con `git diff` si quieres ver qué corrigió

## 🔍 **Verificar que Funciona**

```bash
# Verificar que el hook está instalado
cat .husky/pre-commit

# Debería mostrar:
# npm run validate:fix
```

¡Listo! El sistema ahora valida y corrige automáticamente sin que tengas que hacer nada. 🎉

