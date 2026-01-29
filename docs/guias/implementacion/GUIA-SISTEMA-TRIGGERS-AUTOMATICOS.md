# 🎯 Guía: Sistema de Triggers Automáticos

> **⚠️ CRÍTICO:** Este sistema detecta automáticamente palabras clave y activa el flujo paso a paso sin intervención manual.

---

## 🎯 Objetivo

Garantizar que el sistema se active automáticamente cuando el usuario menciona intención de implementar componentes, sin necesidad de recordar comandos específicos.

---

## 🔍 Triggers Detectados Automáticamente

### **Triggers de Implementación (ALTA PRIORIDAD)**

**Palabras clave:**
- `implementar`, `crear`, `agregar`, `añadir`, `hacer`

**Componentes detectados:**
- **DataTable:** `implementar data table`, `crear tabla`, `agregar data-table`
- **Tabs:** `implementar tabs`, `crear tabs`, `agregar tabs`
- **Modal:** `implementar modal`, `crear modal`, `agregar modal`
- **Button:** `implementar button`, `crear botón`, `agregar button`
- **SubNav:** `implementar subnav`, `crear subnav`, `agregar subnav`

**Acción:** Activa automáticamente el flujo paso a paso completo.

---

### **Triggers de Verificación (MEDIA PRIORIDAD)**

**Palabras clave:**
- `verificar`, `revisar`, `comprobar`, `chequear`

**Patrones:**
- `verificar componente`, `revisar implementación`, `comprobar checklist`

**Acción:** Verifica el checklist sin activar el flujo completo.

---

### **Triggers de Documentación (BAJA PRIORIDAD)**

**Palabras clave:**
- `documentación`, `guía`, `docs`, `ayuda`

**Patrones:**
- `ver documentación`, `mostrar guía`, `consultar docs`

**Acción:** Carga guías automáticamente.

---

### **Triggers de Bloqueo (ALTA PRIORIDAD)**

**Palabras clave:**
- `no`, `no hacer`, `no implementar`, `esperar`, `parar`

**Patrones:**
- `no implementar`, `no crear`, `esperar implementación`, `parar implementación`

**Acción:** Bloquea la implementación automáticamente.

---

## 🔄 Flujo Automático

```
1. Usuario envía mensaje
   ↓
2. Sistema detecta triggers automáticamente
   ↓
3. ¿Trigger de implementación detectado?
   ├─ SÍ → Activar flujo paso a paso completo
   └─ NO → Continuar normalmente
   ↓
4. ¿Trigger de bloqueo detectado?
   ├─ SÍ → Bloquear implementación
   └─ NO → Continuar
   ↓
5. Ejecutar acción correspondiente
```

---

## 📋 Ejemplos de Uso

### **Ejemplo 1: Implementar DataTable**

**Mensaje del usuario:**
```
"implementar una data table de lista de encuestas"
```

**Sistema detecta:**
- ✅ Trigger: `implementar` + `data table`
- ✅ Componente: `DataTable`
- ✅ Acción: `activate-step-by-step`

**Sistema ejecuta automáticamente:**
1. `executeOnMessageStart()` se ejecuta
2. Detección automática de componente
3. Verificación con Pre-Implementation Check
4. Validación de fases
5. Obtención de plan basado en historias
6. Bloqueo si faltan pasos o fases

---

### **Ejemplo 2: Verificar Checklist**

**Mensaje del usuario:**
```
"verificar el checklist de DataTable"
```

**Sistema detecta:**
- ✅ Trigger: `verificar` + `checklist`
- ✅ Acción: `verify-checklist`

**Sistema ejecuta automáticamente:**
1. Verifica checklist con Pre-Implementation Check
2. Muestra pasos faltantes
3. NO activa flujo completo

---

### **Ejemplo 3: Bloquear Implementación**

**Mensaje del usuario:**
```
"no implementar todavía, esperar"
```

**Sistema detecta:**
- ✅ Trigger: `no` + `implementar` + `esperar`
- ✅ Acción: `block-implementation`

**Sistema ejecuta automáticamente:**
1. Bloquea cualquier intento de implementación
2. Muestra razón del bloqueo

---

## 🚨 Reglas Críticas

### **Regla #1: Triggers se Ejecutan Automáticamente**
- ✅ Los triggers se detectan automáticamente al inicio de cada mensaje
- ✅ NO es necesario mencionar comandos específicos
- ✅ El sistema activa el flujo correspondiente automáticamente

### **Regla #2: Prioridad de Triggers**
- ✅ Triggers de ALTA prioridad tienen precedencia
- ✅ Si hay múltiples triggers, se ejecuta el de mayor prioridad
- ✅ Triggers de bloqueo siempre tienen precedencia

### **Regla #3: Triggers No Son Opcionales**
- ✅ Los triggers se ejecutan siempre, no se pueden desactivar
- ✅ El sistema garantiza que se active el flujo correcto
- ✅ NO se puede saltar la detección de triggers

---

## 🔗 Referencias

- **Sistema de triggers:** `packages/autorun-core/src/helpers/keywordTriggerSystem.ts`
- **Ejecución automática:** `packages/autorun-core/src/helpers/executeOnMessageStart.ts`
- **Guía paso a paso:** `docs/guias/implementacion/GUIA-SISTEMA-PASO-A-PASO-AUTOMATICO.md`

---

**Última actualización:** 2025-01-11  
**Estado:** ✅ Sistema Implementado y Funcionando
