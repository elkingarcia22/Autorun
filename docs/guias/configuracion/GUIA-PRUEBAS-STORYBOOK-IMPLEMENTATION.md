# 🧪 Guía: Pruebas de Storybook Implementation

> **Fecha:** 2025-01-10  
> **Objetivo:** Documentar el sistema de pruebas automáticas de funcionalidades de Storybook Implementation

---

## 🎯 Propósito

El sistema de pruebas verifica automáticamente que todas las funcionalidades de extracción e implementación desde Storybook funcionan correctamente.

---

## 🚀 Ejecución Automática

### **1. Al Inicializar AutorunHub**

Las pruebas se ejecutan automáticamente cuando se inicializa AutorunHub:

```bash
npm run autorun:init-hub
```

**Salida esperada:**
```
🚀 Inicializando AutorunHub...
✅ AutorunHub inicializado correctamente
📊 Estado de Autorun:
   - Inicializado: ✅
   - File Watching: ✅ activo

🧪 Probando funcionalidades de Storybook Implementation...
⚡ [Quick Test] Probando funcionalidades básicas para: functional-toast
   ✅ Quick test pasó
   ✅ Pruebas de Storybook Implementation: OK
   📚 Todas las funcionalidades están operativas
```

### **2. Desde el Wizard**

Las pruebas se ejecutan automáticamente cuando el wizard carga componentes desde Storybook.

---

## 🧪 Pruebas Incluidas

### **Test 1: Parser de Código**
- ✅ Extrae código desde Storybook
- ✅ Parsea múltiples bloques
- ✅ Detecta imports

### **Test 2: Parser de Props**
- ✅ Extrae props desde Storybook
- ✅ Identifica props requeridas vs opcionales
- ✅ Extrae tipos y valores por defecto

### **Test 3: Extractor de API**
- ✅ Extrae métodos de API
- ✅ Parsea firmas
- ✅ Extrae setup requerido

### **Test 4: Extractor de Composition**
- ✅ Extrae dependencias
- ✅ Extrae setup requerido

### **Test 5: Extractor de Best Practices**
- ✅ Extrae prácticas recomendadas
- ✅ Extrae valores por defecto
- ✅ Extrae advertencias

### **Test 6: Extractor de Ejemplos del Mundo Real**
- ✅ Extrae ejemplos prácticos
- ✅ Extrae casos de uso

### **Test 7: Implementación Completa**
- ✅ Genera código completo
- ✅ Incluye setup y dependencias
- ✅ Incluye toda la información

### **Test 8: Validación**
- ✅ Valida estructura HTML
- ✅ Valida props
- ✅ Valida contra API y best practices

---

## 📋 Ejecución Manual

### **Prueba Rápida (Recomendada)**

```typescript
import { runQuickTest } from '@autorun/core/helpers/storybookImplementationTester';

// Prueba rápida con componente por defecto
const passed = await runQuickTest();
// Retorna: true si pasó, false si falló
```

### **Suite Completa de Pruebas**

```typescript
import { runStorybookImplementationTests } from '@autorun/core/helpers/storybookImplementationTester';

// Ejecutar todas las pruebas
const result = await runStorybookImplementationTests('functional-toast');

console.log(`Total: ${result.totalTests}`);
console.log(`Pasadas: ${result.passedTests}`);
console.log(`Fallidas: ${result.failedTests}`);
console.log(`Todas pasaron: ${result.allPassed}`);

// Ver detalles de cada prueba
result.results.forEach((test) => {
  console.log(`${test.success ? '✅' : '❌'} ${test.testName}`);
  if (test.error) {
    console.log(`   Error: ${test.error}`);
  }
  if (test.details) {
    console.log(`   Detalles:`, test.details);
  }
});
```

---

## ⚙️ Configuración

### **Deshabilitar Pruebas Automáticas**

En `.ubits/project-config.json`:

```json
{
  "autorun": {
    "testStorybookImplementation": false
  }
}
```

Por defecto, las pruebas están habilitadas (`true`).

---

## 🔍 Interpretación de Resultados

### **✅ Todas las Pruebas Pasaron**

```
✅ Pruebas de Storybook Implementation: OK
📚 Todas las funcionalidades están operativas
```

**Significado:**
- ✅ Todas las funcionalidades funcionan correctamente
- ✅ Puedes usar implementación desde Storybook sin problemas

### **⚠️ Algunas Pruebas Fallaron**

```
⚠️ Algunas pruebas de Storybook Implementation fallaron
💡 Esto puede ser normal si el componente no está disponible en Storybook
```

**Posibles causas:**
- ⚠️ El componente de prueba no está disponible en Storybook
- ⚠️ Storybook no está accesible
- ⚠️ El componente no tiene la estructura ideal documentada

**Qué hacer:**
- ✅ Verificar que Storybook está disponible
- ✅ Verificar que el componente existe
- ✅ Revisar logs para ver qué prueba falló específicamente

---

## 📊 Detalles de Pruebas

### **Prueba Rápida (Quick Test)**

**Qué prueba:**
- ✅ Implementación completa básica
- ✅ Generación de código

**Cuándo usar:**
- ✅ Verificación rápida al iniciar
- ✅ Verificar que todo funciona

**Tiempo estimado:** < 5 segundos

### **Suite Completa**

**Qué prueba:**
- ✅ Todas las funcionalidades individuales
- ✅ Integración completa
- ✅ Validación

**Cuándo usar:**
- ✅ Diagnóstico de problemas
- ✅ Verificación completa después de cambios

**Tiempo estimado:** 10-30 segundos

---

## 🐛 Solución de Problemas

### **Problema: Pruebas fallan con "No se pudo obtener HTML"**

**Causa:** Storybook no está accesible o la URL es incorrecta.

**Solución:**
1. Verificar que Storybook está disponible
2. Verificar URL en configuración
3. Verificar conectividad de red

### **Problema: Pruebas fallan con "No se extrajeron bloques de código"**

**Causa:** El componente no tiene código en Storybook o la estructura es diferente.

**Solución:**
1. Verificar que el componente existe en Storybook
2. Verificar que tiene sección "Usage" o "Examples"
3. Revisar estructura del componente en Storybook

### **Problema: Pruebas fallan con "No se extrajeron props"**

**Causa:** El componente no tiene tabla de props en Storybook.

**Solución:**
1. Verificar que el componente tiene pestaña "Controls"
2. Verificar que tiene tabla de props en docs
3. Revisar estructura del componente

---

## 📝 Logs de Pruebas

Las pruebas generan logs detallados:

```
🧪 [Storybook Implementation Tester] ========================================
🧪 [Storybook Implementation Tester] Ejecutando pruebas para: functional-toast
🧪 [Storybook Implementation Tester] ========================================

🧪 [Test] Parser de código...
   ✅ 3 bloques de código extraídos
🧪 [Test] Parser de props...
   ✅ 8 props extraídas
🧪 [Test] Extractor de API...
   ✅ 6 métodos de API extraídos
...

📊 [Storybook Implementation Tester] ========================================
📊 [Storybook Implementation Tester] Resultados:
   Total: 8
   ✅ Pasadas: 8
   ❌ Fallidas: 0
   ✅ TODAS LAS PRUEBAS PASARON
📊 [Storybook Implementation Tester] ========================================
```

---

## ✅ Checklist de Verificación

Después de ejecutar las pruebas, verificar:

- [ ] ✅ Todas las pruebas pasaron
- [ ] ✅ No hay errores críticos
- [ ] ✅ Los extractores funcionan correctamente
- [ ] ✅ La implementación genera código
- [ ] ✅ La validación funciona

Si alguna prueba falla:

- [ ] ⚠️ Revisar logs para identificar qué falló
- [ ] ⚠️ Verificar que Storybook está disponible
- [ ] ⚠️ Verificar que el componente existe
- [ ] ⚠️ Verificar estructura del componente en Storybook

---

## 🎯 Conclusión

El sistema de pruebas automáticas garantiza que:

1. ✅ **Todas las funcionalidades funcionan** correctamente
2. ✅ **La implementación es precisa** y sin errores
3. ✅ **Los extractores funcionan** como se espera
4. ✅ **La validación es efectiva**

**Ejecución automática:**
- ✅ Al inicializar AutorunHub
- ✅ Desde el wizard
- ✅ No bloquea si falla (solo advierte)

---

**Última actualización:** 2025-01-10  
**Versión:** 1.0.0
