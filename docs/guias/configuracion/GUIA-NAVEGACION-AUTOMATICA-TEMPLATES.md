# Guía: Navegación Automática de Templates - 2025-01-03

**Objetivo:** Explicar cómo funciona la navegación automática de templates y las opciones disponibles.

---

## 🎯 Opciones Disponibles

### **Opción A: Automático desde Script CLI (Recomendado para Navegación)** ⭐

**Cómo funciona:**
- El script `autorun-init-hub.ts` detecta templates automáticamente
- Emite mensajes `[AUTORUN_BROWSER_URL]` y `[AUTORUN_TEMPLATE_DETECTED]`
- El agente intercepta estos mensajes y navega automáticamente

**Ventajas:**
- ✅ Todo automático
- ✅ No requiere intervención manual
- ✅ Funciona inmediatamente después de inicializar

**Desventajas:**
- ⚠️ El script CLI no puede ejecutar MCP directamente (solo Node.js)
- ⚠️ Requiere que el agente esté atento a los mensajes

**Estado:** ✅ **IMPLEMENTADO** - El script emite mensajes, el agente navega automáticamente

---

### **Opción B: Manual desde Chat de Cursor (Recomendado para Flujo Completo)**

**Cómo funciona:**
- El usuario dice "inicia autorun" en el chat
- El agente ejecuta `npm run autorun:init-hub`
- El agente lee los mensajes `[AUTORUN_BROWSER_URL]` en el output
- El agente navega automáticamente usando MCP

**Ventajas:**
- ✅ El agente tiene control completo
- ✅ Puede ejecutar `handleUserMessage()` después de navegar
- ✅ Puede verificar estado antes de continuar
- ✅ Puede manejar errores y casos especiales

**Desventajas:**
- ⚠️ Requiere que el agente esté activo
- ⚠️ Depende de que el agente lea los mensajes correctamente

**Estado:** ✅ **IMPLEMENTADO** - El agente navega automáticamente cuando ve los mensajes

---

## 🎯 Recomendación: Enfoque Híbrido ⭐

**Recomendamos usar Opción B (desde Chat de Cursor) porque:**

1. **Control del Agente:**
   - El agente puede ejecutar `handleUserMessage()` después de navegar
   - El agente puede verificar que todo esté correcto
   - El agente puede manejar errores

2. **Flujo Completo:**
   - Navegación automática ✅
   - Detección de componentes ✅
   - Consulta de MCP ✅
   - Implementación ✅

3. **Flexibilidad:**
   - El agente puede adaptarse a diferentes situaciones
   - El agente puede preguntar al usuario si es necesario
   - El agente puede manejar casos especiales

---

## 📋 Flujo Actual (Implementado)

### **Cuando el usuario dice "inicia autorun":**

1. **Agente ejecuta:** `npm run autorun:init-hub`
2. **Script detecta template** y emite:
   - `[AUTORUN_BROWSER_URL]http://localhost:3000/template.html[/AUTORUN_BROWSER_URL]`
   - `[AUTORUN_TEMPLATE_DETECTED]true[/AUTORUN_TEMPLATE_DETECTED]`
3. **Agente intercepta mensajes** automáticamente
4. **Agente navega automáticamente:**
   - `call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_navigate", arguments: { url: "..." } })`
   - `call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_snapshot" })`
5. **Agente ejecuta `handleUserMessage()`** si hay un mensaje del usuario
6. **Agente está listo** para implementar componentes

---

## ✅ Estado Actual

**✅ IMPLEMENTADO:**
- Detección automática de templates en `autorun-init-hub.ts`
- Emisión de mensajes `[AUTORUN_BROWSER_URL]` y `[AUTORUN_TEMPLATE_DETECTED]`
- Reglas en `.cursorrules` para interceptar mensajes automáticamente
- Navegación automática por el agente cuando ve los mensajes

**✅ FUNCIONANDO:**
- El sistema detecta templates automáticamente
- El sistema emite mensajes claros
- El agente navega automáticamente cuando ve los mensajes

---

## 💡 Recomendación Final

**✅ RECOMENDADO: Opción B (desde Chat de Cursor)**

**Razones:**
1. **Control del Agente:**
   - El agente puede ejecutar `handleUserMessage()` después de navegar
   - El agente puede verificar que todo esté correcto
   - El agente puede manejar errores y casos especiales

2. **Flujo Completo:**
   - Navegación automática ✅
   - Detección de componentes ✅
   - Consulta de MCP ✅
   - Implementación ✅

3. **Flexibilidad:**
   - El agente puede adaptarse a diferentes situaciones
   - El agente puede preguntar al usuario si es necesario
   - El agente puede manejar casos especiales

4. **Limitación Técnica:**
   - El script CLI (Node.js) NO puede ejecutar MCP directamente
   - Solo puede emitir mensajes que el agente intercepta
   - El agente SÍ puede ejecutar MCP automáticamente

**Cómo Funciona Actualmente:**
1. Usuario dice "inicia autorun" en el chat
2. Agente ejecuta `npm run autorun:init-hub`
3. Script detecta template y emite `[AUTORUN_BROWSER_URL]`
4. Agente intercepta mensaje automáticamente
5. Agente navega automáticamente usando MCP
6. Agente ejecuta `handleUserMessage()` si hay mensaje del usuario
7. Agente está listo para implementar

**El script CLI solo emite mensajes** - el agente ejecuta la navegación automáticamente cuando los ve.

---

**Última actualización:** 2025-01-03  
**Estado:** ✅ **IMPLEMENTADO Y FUNCIONANDO** - Recomendado usar desde Chat de Cursor
