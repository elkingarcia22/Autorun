# 🛡️ Sistema de Validación UBITS

Este directorio contiene el sistema de validación robusto y escalable para asegurar que **siempre** se usen los tokens y componentes oficiales de UBITS.

## 🚀 **Validación 100% Automática**

✅ **NO necesitas hacer nada manual** - El sistema valida y corrige automáticamente en cada commit.

Ver `.ubits/AUTO-VALIDATION.md` para detalles completos.

## 📁 **Estructura**

```
.ubits/
├── component-inventory.json    # Inventario completo de componentes existentes
├── validation-rules.md         # Reglas de validación detalladas
├── AUTO-VALIDATION.md          # Guía de validación automática
└── README.md                   # Este archivo
```

## 🎯 **Objetivo**

Prevenir que se:
- ❌ Creen componentes que ya existen
- ❌ Usen colores hardcodeados en lugar de tokens
- ❌ Inventen clases de tipografía que no existen
- ❌ Usen componentes sin importar sus CSS

## ⚡ **Cómo Funciona (Automático)**

1. Modificas código
2. Haces `git commit`
3. **El sistema valida y corrige automáticamente**
4. Si todo está bien → Commit completado
5. Si hay errores no corregibles → Commit bloqueado

## 📋 **Inventario de Componentes**

El archivo `component-inventory.json` contiene:
- ✅ Todos los componentes existentes
- ✅ Sus funciones/provider
- ✅ Archivos CSS requeridos
- ✅ Variantes, tamaños y estados disponibles
- ✅ Tokens válidos de tipografía y color

### **Cómo Agregar un Nuevo Componente:**

1. Crear el componente en `packages/addons/[nombre]/`
2. Agregar entrada en `component-inventory.json`:
```json
{
  "nuevo-componente": {
    "name": "Nuevo Componente",
    "package": "@ubits/nuevo-componente",
    "path": "packages/addons/nuevo-componente",
    "provider": "createNuevoComponente",
    "globalFunction": "window.createNuevoComponente",
    "cssFile": "packages/addons/nuevo-componente/src/styles/nuevo-componente.css"
  }
}
```

## ✅ **Reglas de Validación**

Ver `validation-rules.md` para detalles completos.

### **Resumen:**
1. ✅ Siempre usar tokens UBITS (`var(--ubits-*)`)
2. ✅ Siempre usar componentes existentes
3. ✅ Siempre usar tipografía UBITS oficial
4. ✅ Siempre importar CSS de componentes
5. ✅ Verificar inventario antes de crear

## 🔧 **Comandos (Opcionales - Todo es Automático)**

```bash
# Solo si quieres validar manualmente
npm run validate          # Validar archivos en staging
npm run validate:fix      # Validar y corregir automáticamente
npm run validate:all      # Validar todos los archivos
npm run validate:all:fix  # Validar y corregir todos los archivos
```

## 📚 **Referencias**

- **Validación Automática:** `.ubits/AUTO-VALIDATION.md`
- **Inventario:** `.ubits/component-inventory.json`
- **Reglas:** `.ubits/validation-rules.md`
- **Script:** `scripts/validate-ubits.cjs`
- **Validador Visual:** `template-ubits/validador-ubits.html`
