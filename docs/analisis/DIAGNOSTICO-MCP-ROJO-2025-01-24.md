# 🔴 Diagnóstico: MCP se Pone Rojo al Usarlo

**Fecha:** 2025-01-24  
**Problema:** El MCP de autorun se pone rojo cuando se intenta usar, aunque estaba en verde  
**Estado:** 🔍 En Investigación

---

## 📋 Resumen del Problema

El usuario reporta que:
1. El MCP de autorun está en verde (activo) inicialmente
2. Cuando intenta usarlo, se pone rojo (error)
3. La implementación puede haber fallado

---

## ✅ Verificación de la Implementación

### **1. SelectionCard en el Código**

**Ubicación:** `prototypes/canvas-administrador-encuestas-2025-12-24.html`

**Estado:** ✅ **IMPLEMENTADO CORRECTAMENTE**

- ✅ Función `initSelectionCard()` implementada (línea 1344)
- ✅ Contenedor `#selection-card-container` existe (línea 769)
- ✅ Se inicializa cuando se activa el tab "lista-encuestas" (línea 1318)
- ✅ Configuración correcta:
  - Título: "Encuesta de satisfacción"
  - Descripción: "Encuesta para medir la satisfacción de los colaboradores"
  - Icono: `clipboard-list`
  - Estado: `default`
  - Tamaño: `md`

### **2. Resultado de autorun.apply()**

**Resultado:** ❌ **FALLÓ**

```json
{
  "success": false,
  "filesWritten": [],
  "verification": {
    "preImplementation": false,
    "postImplementation": false,
    "errors": [
      "Token no encontrado: --ubits-font-weight-bold. Tokens disponibles: 2733 total."
    ],
    "warnings": []
  },
  "components": [],
  "errors": [
    "Token no encontrado: --ubits-font-weight-bold. Tokens disponibles: 2733 total."
  ]
}
```

**Causa del Error:**
- `autorun.apply()` falló porque no encontró el token `--ubits-font-weight-bold`
- Aunque hay 2733 tokens disponibles, este token específico no está disponible
- Esto causó que `autorun.apply()` retornara `success: false`

**Impacto:**
- La implementación NO se completó a través de `autorun.apply()`
- Sin embargo, el código manual ya estaba implementado y funcionando
- El cambio manual (eliminar "- PRUEBA" del título) se aplicó correctamente

---

## 🔍 Posibles Causas del MCP en Rojo

### **1. Error en autorun.apply()** ⚠️ MÁS PROBABLE

**Problema:**
- `autorun.apply()` falló por token faltante
- El error puede haber causado que el MCP server se cierre o falle
- El SDK de MCP puede marcar el servidor como "error" cuando un tool falla

**Evidencia:**
- `autorun.apply()` retornó `success: false`
- Error: "Token no encontrado: --ubits-font-weight-bold"

**Solución:**
- Verificar por qué el token no se encuentra
- Mejorar manejo de errores en `autorun.apply()` para no cerrar el servidor
- Agregar fallback cuando un token no se encuentra

### **2. Error No Capturado en autorun.apply()** ⚠️ PROBABLE

**Problema:**
- Si `autorun.apply()` lanza un error no capturado, puede cerrar el proceso MCP
- Aunque mejoramos el manejo de errores en CLI, puede haber errores en `autorun.apply()` mismo

**Solución:**
- Revisar manejo de errores en `autorun.apply()`
- Asegurar que todos los errores se capturen y retornen como respuesta, no como excepciones

### **3. Error en JSON.stringify() del Resultado** ⚠️ POSIBLE

**Problema:**
- Si el resultado de `autorun.apply()` contiene objetos circulares o no serializables
- `JSON.stringify()` puede fallar y causar error no capturado

**Solución:**
- Validar que el resultado sea serializable antes de retornarlo
- Usar `JSON.stringify()` con replacer para objetos circulares

---

## 🛠️ Soluciones Propuestas

### **Solución 1: Mejorar Manejo de Errores en autorun.apply()** ⚠️ CRÍTICO

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Cambios:**
1. Capturar todos los errores y retornarlos como parte de la respuesta
2. No lanzar excepciones que puedan cerrar el servidor
3. Agregar fallback cuando tokens no se encuentran

### **Solución 2: Validar Resultado Antes de Retornar** ⚠️ ALTO

**Archivo:** `packages/autorun-core/src/mcp-server/autorunMCPServer.ts`

**Cambios:**
1. Validar que el resultado sea serializable antes de `JSON.stringify()`
2. Capturar errores de serialización y retornar error controlado

### **Solución 3: Investigar Token Faltante** ⚠️ MEDIO

**Problema:**
- Token `--ubits-font-weight-bold` no se encuentra
- Puede ser un problema de carga de tokens o nombre incorrecto

**Solución:**
- Verificar si el token existe con otro nombre
- Revisar carga de tokens en `autorun.apply()`
- Agregar logging detallado de tokens disponibles

---

## 📊 Estado Actual

### **Implementación:**
- ✅ SelectionCard está implementada correctamente en el código
- ✅ El código funciona (inicialización manual)
- ❌ `autorun.apply()` falló por token faltante

### **MCP Server:**
- ✅ Código del CLI está correcto
- ✅ Manejo de errores mejorado implementado
- ⚠️ Puede estar fallando cuando `autorun.apply()` retorna error

---

## 🎯 Próximos Pasos

1. ✅ **Completado:** Verificar implementación en código
2. ⏳ **Pendiente:** Investigar por qué el token `--ubits-font-weight-bold` no se encuentra
3. ⏳ **Pendiente:** Mejorar manejo de errores en `autorun.apply()` para no cerrar el servidor
4. ⏳ **Pendiente:** Validar serialización de resultados antes de retornar
5. ⏳ **Pendiente:** Probar MCP después de correcciones

---

## 📝 Notas

- La implementación manual funciona correctamente
- El problema es con `autorun.apply()` y el manejo de errores
- El MCP se pone rojo porque `autorun.apply()` falla y puede estar causando un error no capturado
- Necesitamos mejorar el manejo de errores para que el servidor no se cierre

---

**Última actualización:** 2025-01-24  
**Estado:** 🔍 Requiere Corrección de Manejo de Errores

