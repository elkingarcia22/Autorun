# 🧙 Guía del Wizard de Inicialización

## Modo Automático

El wizard ahora soporta respuestas automáticas mediante variables de entorno o argumentos.

### Usando Variables de Entorno

```bash
# Configurar respuestas automáticas
export AUTORUN_PROJECT_TYPE=ubits
export AUTORUN_TEMPLATE=administrador
export AUTORUN_MODULE=desempeno
export AUTORUN_PRODUCT=objetivos

# Ejecutar wizard (usará las respuestas automáticas)
npm run init
```

### Usando Argumentos

```bash
# Ejecutar con proyecto predefinido
npm run init -- --project=ubits
```

### Respuestas Disponibles

- **AUTORUN_PROJECT_TYPE**: `ubits` o `independent`
- **AUTORUN_TEMPLATE**: `administrador` o `colaborador`
- **AUTORUN_MODULE**: ID del módulo (ej: `desempeno`, `aprendizaje`)
- **AUTORUN_PRODUCT**: ID del producto (ej: `objetivos`, `evaluaciones-360`)

## Modo Interactivo

Si no se proporcionan respuestas automáticas, el wizard pregunta interactivamente en primera persona:

```
🚀 ¡Hola! Soy tu asistente de Autorun.

Te voy a guiar paso a paso para configurar tu proyecto.

📋 ¿En qué tipo de proyecto quieres trabajar?
⭐ 1. UBITS (Configuración predefinida con add-ons optimizados)
   2. Proyecto Independiente (Configuración personalizada)
```

## Ejemplo Completo Automático

```bash
# Configurar todo automáticamente
export AUTORUN_PROJECT_TYPE=ubits
export AUTORUN_TEMPLATE=administrador
export AUTORUN_MODULE=desempeno
export AUTORUN_PRODUCT=objetivos

# Ejecutar
npm run init

# El wizard usará estas respuestas y continuará automáticamente
```

---

**Nota**: El wizard ahora es más conversacional y guiado, usando primera persona para una mejor experiencia.

