# 🛡️ Guía Completa: Sistema Blindado de Autorun

> **⚠️ CRÍTICO:** Este documento explica cómo funciona el sistema completo de blindaje que garantiza que el agente SIEMPRE siga el proceso paso a paso.

---

## 🎯 Objetivo

Garantizar que el agente **SIEMPRE** siga el proceso paso a paso sin saltarse fases, usando múltiples capas de blindaje automático.

---

## 🛡️ Capas de Blindaje

### **Capa 1: Sistema de Triggers Automáticos** ⭐

**Archivo:** `packages/autorun-core/src/helpers/keywordTriggerSystem.ts`

**Funcionalidad:**
- Detecta palabras clave automáticamente (`implementar`, `crear`, `agregar`, etc.)
- Detecta patrones de componentes (`data table`, `tabs`, `modal`, etc.)
- Activa flujo paso a paso automáticamente
- Bloquea si detecta intención de no implementar

**Triggers implementados:**
- ✅ Triggers de implementación (ALTA prioridad)
- ✅ Triggers de verificación (MEDIA prioridad)
- ✅ Triggers de documentación (BAJA prioridad)
- ✅ Triggers de bloqueo (ALTA prioridad)

**Ejemplo:**
```
Usuario: "implementar una data table"
↓
Sistema detecta: trigger "implementar" + "data table"
↓
Sistema activa: flujo paso a paso completo automáticamente
```

---

### **Capa 2: Ejecución Automática al Inicio** ⭐

**Archivo:** `packages/autorun-core/src/helpers/executeOnMessageStart.ts`

**Funcionalidad:**
- Se ejecuta automáticamente al inicio de cada mensaje
- Integrado con sistema de triggers
- Detecta componentes automáticamente
- Verifica con Pre-Implementation Check
- Obtiene plan basado en historias
- Bloquea si faltan pasos o fases

**Flujo:**
```
1. executeOnMessageStart() se ejecuta automáticamente
2. KeywordTriggerSystem detecta triggers
3. executeAutoDetectionOnMessage() detecta componentes
4. Pre-Implementation Check verifica checklist
5. Si bloqueado → Mostrar razón y plan
6. Si no bloqueado → Continuar con implementación
```

---

### **Capa 3: Validación de Fases en Orden** ⭐

**Archivo:** `packages/autorun-core/src/validation/PhaseValidator.ts`

**Funcionalidad:**
- Valida orden de fases (FASE 0 → 0.1 → 0.5 → 0.6 → 1 → 2)
- Marca fases como completadas
- Obtiene siguiente fase requerida
- Tracking persistente de fases completadas
- Bloquea si se intenta saltar fases

**Fases definidas:**
1. FASE_0_VERIFICACION_SCRIPTS - Verificar script UMD
2. FASE_0.1_REVISAR_COMPONENTE - Revisar Storybook y documentación
3. FASE_0.5_ANALIZAR_ESTRUCTURA - Analizar estructura y spacing
4. FASE_0.6_CONTAR_ITEMS - Contar items/filas
5. FASE_1_ANALISIS_COLUMNAS - Analizar columnas
6. FASE_2_IMPLEMENTACION_BASICA - Implementar componente básico

**Ejemplo:**
```
Intento: Saltar FASE 0 y empezar en FASE 1
↓
PhaseValidator valida: FASE 0 no está completada
↓
Sistema bloquea: "Debes completar FASE_0_VERIFICACION_SCRIPTS antes de continuar"
```

---

### **Capa 4: Guía Paso a Paso Activa** ⭐

**Archivo:** `packages/autorun-core/src/helpers/activeStepGuide.ts`

**Funcionalidad:**
- Muestra siguiente paso obligatorio
- Bloquea hasta completar cada paso
- Proporciona acciones requeridas específicas
- Incluye URLs de Storybook y guías
- Verifica automáticamente si el paso está completado

**Ejemplo:**
```
ActiveStepGuide.getCurrentStep('DataTable')
↓
Retorna: {
  hasActiveStep: true,
  currentStep: {
    phase: 'FASE_0_VERIFICACION_SCRIPTS',
    step: 'Verificar Script UMD',
    description: 'Verificar que el script UMD esté cargado',
    requiredActions: [
      'Verificar que el script data-table.umd.js está en el HTML',
      'Verificar que window.createDataTable está disponible',
      ...
    ],
    storybookUrl: 'https://ubits-storybook10.vercel.app/...',
    guides: ['docs/guias/implementacion/GUIA-ERROR-SCRIPT-UMD-DATATABLE-NO-CARGA.md']
  },
  blocked: true,
  reason: 'Debes completar: Verificar que el script UMD esté cargado'
}
```

---

### **Capa 5: Interceptores Mejorados** ⭐

**Archivo:** `packages/autorun-core/src/interceptors/toolInterceptors.ts`

**Mejoras:**
- Valida fase actual ANTES de permitir write() o search_replace()
- Verifica paso activo con ActiveStepGuide
- Bloquea si el paso activo no está completado
- Muestra acciones requeridas y guías
- Integrado con PhaseValidator

**Flujo:**
```
1. Agente intenta usar write() o search_replace()
2. interceptedWrite() o interceptedSearchReplace() se ejecuta
3. ActiveStepGuide verifica paso activo
4. PhaseValidator valida orden de fases
5. Si paso no completado → Bloquear
6. Si paso completado → Permitir escribir
```

---

## 🔄 Flujo Completo Blindado

```
1. Usuario envía mensaje
   ↓
2. 🎯 KeywordTriggerSystem detecta triggers automáticamente
   ├─ ¿Trigger de implementación? → Activar flujo
   ├─ ¿Trigger de bloqueo? → Bloquear
   └─ ¿Otro trigger? → Ejecutar acción correspondiente
   ↓
3. 🚀 executeOnMessageStart() se ejecuta automáticamente
   ├─ Detección automática de componentes
   ├─ Verificación con Pre-Implementation Check
   └─ Obtención de plan basado en historias
   ↓
4. 📋 ActiveStepGuide obtiene paso activo actual
   ├─ ¿Hay paso activo? → Bloquear hasta completarlo
   └─ ¿No hay paso activo? → Continuar
   ↓
5. 🔍 PhaseValidator valida orden de fases
   ├─ ¿Orden válido? → Continuar
   └─ ¿Orden inválido? → Bloquear y mostrar siguiente fase
   ↓
6. 🛡️ Interceptores validan ANTES de escribir
   ├─ ¿Paso activo completado? → Permitir escribir
   └─ ¿Paso activo NO completado? → Bloquear
   ↓
7. ✅ Implementación permitida solo si TODAS las capas pasan
```

---

## 📋 Checklist Automático Completo

### **Al Inicio de Cada Mensaje:**
- [x] KeywordTriggerSystem detecta triggers automáticamente
- [x] executeOnMessageStart() se ejecuta automáticamente
- [x] ActiveStepGuide obtiene paso activo actual
- [x] Si está bloqueado, mostrar razón y plan

### **Antes de Cada Fase:**
- [x] PhaseValidator valida orden de fases
- [x] ActiveStepGuide verifica paso activo
- [x] Si orden inválido, bloquear y mostrar siguiente fase

### **Antes de Escribir Código:**
- [x] Interceptores validan paso activo
- [x] PhaseValidator valida orden de fases
- [x] Si paso no completado, bloquear

### **Después de Cada Fase:**
- [x] PhaseValidator marca fase como completada
- [x] ActiveStepGuide obtiene siguiente paso
- [x] Continuar con siguiente fase

---

## 🚨 Reglas Críticas

### **Regla #1: Triggers Automáticos**
- ✅ Los triggers se detectan automáticamente
- ✅ NO es necesario mencionar comandos específicos
- ✅ El sistema activa el flujo correspondiente automáticamente

### **Regla #2: Fases en Orden**
- ✅ NO se pueden saltar fases
- ✅ Se valida orden antes de continuar
- ✅ Se bloquea si orden inválido

### **Regla #3: Guía Activa**
- ✅ Muestra siguiente paso obligatorio
- ✅ Bloquea hasta completar cada paso
- ✅ Proporciona acciones específicas

### **Regla #4: Interceptores**
- ✅ Valida ANTES de escribir código
- ✅ Bloquea si paso activo no completado
- ✅ Muestra acciones requeridas

### **Regla #5: Tracking Persistente**
- ✅ Guarda fases completadas
- ✅ Persiste entre sesiones
- ✅ No permite retroceder fases

---

## 🔗 Referencias

- **Sistema de triggers:** `packages/autorun-core/src/helpers/keywordTriggerSystem.ts`
- **Ejecución automática:** `packages/autorun-core/src/helpers/executeOnMessageStart.ts`
- **Validador de fases:** `packages/autorun-core/src/validation/PhaseValidator.ts`
- **Guía activa:** `packages/autorun-core/src/helpers/activeStepGuide.ts`
- **Interceptores:** `packages/autorun-core/src/interceptors/toolInterceptors.ts`
- **Guía de triggers:** `docs/guias/implementacion/GUIA-SISTEMA-TRIGGERS-AUTOMATICOS.md`
- **Guía paso a paso:** `docs/guias/implementacion/GUIA-SISTEMA-PASO-A-PASO-AUTOMATICO.md`
- **Resumen completo:** `docs/analisis/RESUMEN-COMPLETO-SISTEMA-BLINDADO-AUTORUN.md`

---

**Última actualización:** 2025-01-11  
**Estado:** ✅ Sistema Completo Implementado y Blindado
