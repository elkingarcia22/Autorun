# 🔄 Cómo Funciona el Sistema de Validación Automática

## ❌ **NO Hace Autocommits**

El sistema **NO hace commits automáticos**. Tú sigues controlando cuándo hacer commit.

## ✅ **Qué SÍ Hace Automáticamente**

El sistema **solo valida y corrige** cuando **TÚ decides hacer commit**:

### **Flujo Normal:**

```
1. Modificas archivos (como siempre)
   ↓
2. Decides hacer commit: git add . && git commit -m "mensaje"
   ↓
3. 🔄 AQUÍ se ejecuta la validación automáticamente (pre-commit hook)
   ↓
4. Sistema corrige errores automáticamente en los archivos
   ↓
5. Si todo está bien → Commit se completa ✅
   Si hay errores no corregibles → Commit se bloquea ❌
```

## 📋 **Ejemplo Práctico**

### **Escenario 1: Todo va bien**

```bash
# 1. Modificas un archivo
echo "color: white;" >> test.css

# 2. Agregas y haces commit
git add test.css
git commit -m "Actualizar estilos"

# 3. 🔄 Pre-commit hook se ejecuta automáticamente:
#    - Detecta: color: white
#    - Corrige a: color: var(--ubits-bg-1)
#    - Archivo guardado con corrección

# 4. ✅ Commit completado exitosamente
#    (El archivo ya está corregido)
```

### **Escenario 2: Hay errores no corregibles**

```bash
# 1. Tienes código con errores complejos
git add archivo.ts
git commit -m "Nueva feature"

# 2. 🔄 Pre-commit hook se ejecuta:
#    - Intenta corregir lo que puede
#    - Encuentra errores que no puede corregir automáticamente

# 3. ❌ Commit BLOQUEADO con mensaje:
#    "Error: Componente custom detectado. Usar createButton() oficial"
#    "Ejecuta: npm run validate:fix para más detalles"

# 4. Corriges manualmente el error
# 5. Intentas commit de nuevo → ✅ Pasa la validación
```

## 🎯 **Resumen**

| Acción | Automático | Manual |
|--------|-----------|--------|
| **Validar código** | ✅ Sí (en pre-commit) | Opcional con `npm run validate` |
| **Corregir errores** | ✅ Sí (auto-fix) | Solo si hay errores no corregibles |
| **Hacer commit** | ❌ No | ✅ Tú decides cuándo |

## 💡 **Ventajas**

- ✅ **No pierdes control** - Tú decides cuándo commitear
- ✅ **No hay commits inesperados** - Todo bajo tu control
- ✅ **Validación automática** - Sin esfuerzo manual
- ✅ **Corrección automática** - Menos trabajo para ti
- ✅ **Calidad garantizada** - Solo commits validados pasan

## 🚨 **Importante**

El sistema **NUNCA**:
- ❌ Hace commits por ti
- ❌ Modifica archivos sin tu conocimiento (solo al hacer commit)
- ❌ Fuerza cambios sin tu aprobación

El sistema **SÍ**:
- ✅ Valida automáticamente cuando haces commit
- ✅ Corrige automáticamente antes del commit
- ✅ Te informa si hay problemas

## 🔧 **Si Quieres Validar Sin Hacer Commit**

```bash
# Solo validar (sin commit)
npm run validate

# Validar y corregir (sin commit)
npm run validate:fix
```

Estos comandos te permiten validar/corregir **sin hacer commit**, útil para revisar cambios antes de commitear.

