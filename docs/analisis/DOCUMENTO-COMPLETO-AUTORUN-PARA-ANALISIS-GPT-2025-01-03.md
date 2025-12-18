# Documento Completo: Autorun - Funcionamiento Actual, Esperado y Problemas

**Fecha:** 2025-01-03  
**Objetivo:** Documentación completa para análisis por GPT sobre el funcionamiento de Autorun y los problemas actuales

---

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura de Autorun](#arquitectura-de-autorun)
3. [Flujo Esperado (Cómo Debería Funcionar)](#flujo-esperado-cómo-debería-funcionar)
4. [Flujo Actual (Qué Está Pasando)](#flujo-actual-qué-está-pasando)
5. [Problemas Identificados](#problemas-identificados)
6. [Análisis de Fallos Recurrentes](#análisis-de-fallos-recurrentes)
7. [Sistema de Componentes](#sistema-de-componentes)
8. [Integración con Storybook](#integración-con-storybook)
9. [Preguntas para Análisis GPT](#preguntas-para-análisis-gpt)

---

## 🎯 Resumen Ejecutivo

**Autorun** es un sistema automatizado diseñado para implementar componentes de UI desde Storybook en templates HTML. El sistema está diseñado para:

1. **Detectar automáticamente** cuando el usuario quiere implementar un componente
2. **Consultar Storybook** (tanto visualmente como vía MCP) para obtener información exacta
3. **Validar** antes de implementar
4. **Implementar** el componente con código exacto desde Storybook
5. **Verificar** que la implementación sea correcta

**Problema Principal:** El agente (IA) que usa Autorun **NO está siguiendo el flujo automático** de forma consistente, lo que resulta en implementaciones incorrectas o incompletas.

**Impacto:** 
- ❌ Componentes implementados incorrectamente
- ❌ Código no exacto según Storybook
- ❌ Validaciones omitidas
- ❌ Consultas a Storybook MCP omitidas

---

## 🏗️ Arquitectura de Autorun

### Componentes Principales

#### 1. **AutorunHub** (Core)
- **Ubicación:** `packages/autorun-core/src/AutorunHub.ts`
- **Función:** Sistema central que gestiona add-ons y estado global
- **Responsabilidades:**
  - Inicialización del sistema
  - Gestión de add-ons (Storybook, Pre-Implementation Check, etc.)
  - File watching para auto-reload
  - Estado global del sistema

#### 2. **Auto Message Handler**
- **Ubicación:** `packages/autorun-core/src/helpers/autoMessageHandler.ts`
- **Función:** Procesa mensajes del usuario al inicio de cada interacción
- **Responsabilidades:**
  - Ejecutar `executeOnMessageStart()`
  - Detectar componentes automáticamente
  - Preparar mensajes MCP para consultar Storybook
  - Detectar múltiples componentes en un solo mensaje

#### 3. **Execute On Message Start**
- **Ubicación:** `packages/autorun-core/src/helpers/executeOnMessageStart.ts`
- **Función:** Punto de entrada obligatorio al inicio de cada mensaje
- **Responsabilidades:**
  - Detectar triggers de palabras clave
  - Ejecutar detección automática de componentes
  - Verificar fases y pasos activos
  - Bloquear si faltan pasos o fases

#### 4. **Auto Component Detection**
- **Ubicación:** `packages/autorun-core/src/helpers/autoComponentDetection.ts`
- **Función:** Detecta componentes automáticamente desde el mensaje del usuario
- **Capacidades:**
  - Detecta 75+ componentes de ambos Storybooks (UBITS y Libraries UI)
  - Soporta español e inglés
  - Detecta múltiples componentes en un solo mensaje
  - Patrones regex avanzados

#### 5. **Tool Interceptors**
- **Ubicación:** `packages/autorun-core/src/interceptors/toolInterceptors.ts`
- **Función:** Intercepta `write()` y `search_replace()` para ejecutar validaciones
- **Funciones:**
  - `interceptedWrite()`: Wrapper para `write()`
  - `interceptedSearchReplace()`: Wrapper para `search_replace()`
  - Ejecuta `handleUserMessage()` automáticamente si no se ejecutó
  - Ejecuta `autoImplementationFlow()` antes de escribir

#### 6. **Auto Implementation Flow**
- **Ubicación:** `packages/autorun-core/src/helpers/autoImplementationFlow.ts`
- **Función:** Flujo completo de implementación automática
- **Pasos:**
  1. Detectar componente
  2. Cargar guías automáticamente
  3. Validar con PreWriteValidator
  4. Obtener código de ejemplo desde Storybook
  5. Verificar pre-implementación
  6. Analizar componentes internos
  7. Permitir o bloquear escritura

#### 7. **Pre-Implementation Verification**
- **Ubicación:** `packages/autorun-core/src/helpers/preImplementationVerification.ts`
- **Función:** Verifica 5 aspectos críticos antes de implementar
- **Verificaciones:**
  1. CSS classes existen en Storybook
  2. HTML structure es correcta
  3. Required elements están presentes
  4. Basic accessibility
  5. Source code comparison

#### 8. **Storybook Integration**
- **Múltiples archivos:**
  - `storybookManager.ts`: Gestión de múltiples Storybooks
  - `storybookExactCodeExtractorWithBrowser.ts`: Extracción de código exacto
  - `storybookMCPAutoCaller.ts`: Consulta automática vía MCP
  - `storybookPropsParser.ts`: Parseo de props desde Storybook

---

## ✅ Flujo Esperado (Cómo Debería Funcionar)

### **PASO 1: Inicialización (Al Inicio de Sesión)**

```
Usuario: "inicia autorun"
↓
1. Detectar wizard state
2. Inicializar AutorunHub
3. Abrir browser con template
4. ✅ Sistema listo
```

### **PASO 2: Recepción de Mensaje del Usuario**

```
Usuario: "implementa un botón secundario solo icono que abra un drawer"
↓
```

### **PASO 3: Ejecutar handleUserMessage() (OBLIGATORIO)**

```typescript
// ⚠️ CRÍTICO: Esto DEBE ejecutarse SIEMPRE al inicio
import { handleUserMessage } from '@autorun/core/helpers/autoMessageHandler';

const result = await handleUserMessage(userMessage);
```

**Qué hace `handleUserMessage()`:**

1. **Ejecuta `executeOnMessageStart()`:**
   - Detecta triggers de palabras clave
   - Ejecuta detección automática de componentes
   - Verifica fases y pasos activos

2. **Detecta Componentes:**
   - Detecta "Button" (por "botón secundario solo icono")
   - Detecta "Drawer" (por "que abra un drawer")
   - Mapea a IDs de Storybook: `🧩-ux-button` y `⚙️-functional-drawer`

3. **Prepara Mensajes MCP:**
   ```typescript
   result.mcpMessages = [
     { componentName: 'Button', storybookId: '🧩-ux-button' },
     { componentName: 'Drawer', storybookId: '⚙️-functional-drawer' }
   ]
   ```

4. **Retorna Resultado:**
   ```typescript
   {
     detected: true,
     componentName: 'Button', // Componente principal
     blocked: false,
     mcpMessages: [...], // Todos los componentes detectados
     plan: {...} // Plan basado en historias (si aplica)
   }
   ```

### **PASO 4: Consultar Storybook MCP Automáticamente (OBLIGATORIO)**

```typescript
// ⚠️ CRÍTICO: El agente DEBE ejecutar esto automáticamente para TODOS los componentes
if (result.mcpMessages && result.mcpMessages.length > 0) {
  for (const msg of result.mcpMessages) {
    await call_mcp_tool({
      server: "storybook-ubits",
      toolName: "mcp_storybook_getComponentsProps",
      arguments: { componentIds: [msg.storybookId] }
    });
  }
}
```

**Qué obtiene:**
- Props exactas del componente
- Tipos de datos
- Valores por defecto
- Ejemplos de uso

### **PASO 5: Usar Interceptores (OBLIGATORIO)**

```typescript
// ⚠️ CRÍTICO: NO usar write() o search_replace() directamente
// SIEMPRE usar los interceptores
import { interceptedSearchReplace } from '@autorun/core/interceptors/toolInterceptors';

await interceptedSearchReplace(
  filePath,
  oldString,
  newString,
  {
    componentName: 'Button', // o 'Drawer'
    userMessage: userMessage
  }
);
```

**Qué hace `interceptedSearchReplace()`:**

1. **Ejecuta `handleUserMessage()` si no se ejecutó:**
   - Garantiza que el flujo completo se ejecute

2. **Ejecuta `autoImplementationFlow()`:**
   - Carga guías automáticamente
   - Valida con PreWriteValidator
   - Obtiene código de ejemplo desde Storybook
   - Verifica pre-implementación
   - Analiza componentes internos

3. **Valida con PreWriteValidator:**
   - Verifica CSS classes
   - Verifica estructura HTML
   - Verifica elementos requeridos
   - Verifica accesibilidad básica

4. **Si `flow.canWrite === false`:**
   - ❌ Bloquea la escritura
   - 📚 Navega automáticamente a Storybook
   - 📋 Muestra plan de implementación
   - ✅ Espera a que se completen pasos faltantes

5. **Si `flow.canWrite === true`:**
   - ✅ Permite la escritura
   - 🔄 Si `flow.autoReload === true`, recarga automáticamente después

### **PASO 6: Extracción de Código Exacto desde Storybook**

```typescript
// Dentro de autoImplementationFlow():
const exactCode = await extractExactCodeFromStorybookWithBrowser(
  componentId,
  'default'
);
```

**Qué hace:**
1. Navega a Storybook
2. Hace clic en pestaña "Code"
3. Extrae HTML/JSX exacto
4. Extrae CSS requerido
5. Compara con código fuente

### **PASO 7: Verificación Pre-Implementación**

```typescript
const verificationResult = await verifyBeforeImplementation(
  componentId,
  'default',
  templatePath
);
```

**Verifica:**
1. ✅ CSS classes existen en Storybook
2. ✅ HTML structure es correcta
3. ✅ Required elements están presentes
4. ✅ Basic accessibility
5. ✅ Source code comparison

### **PASO 8: Implementación**

```typescript
// Solo si todas las validaciones pasan:
await search_replace(filePath, oldString, newString);
```

### **PASO 9: Auto-Reload (Si está activo)**

```typescript
if (flow.autoReload) {
  const snapshot = await browser_snapshot();
  await browser_navigate({ url: snapshot?.url });
  setTimeout(async () => {
    await browser_snapshot();
  }, 1000);
}
```

---

## ❌ Flujo Actual (Qué Está Pasando)

### **Problema: El Agente NO Sigue el Flujo Esperado**

#### **Ejemplo Real: Implementación de Botón y Drawer**

**Mensaje del Usuario:**
```
"implementa elun boton secundario solo icino que abra un drawer"
```

**Lo que DEBERÍA pasar:**
1. ✅ Ejecutar `handleUserMessage()`
2. ✅ Detectar Button y Drawer
3. ✅ Consultar Storybook MCP
4. ✅ Usar `interceptedSearchReplace()`
5. ✅ Extraer código exacto
6. ✅ Validar pre-implementación
7. ✅ Implementar

**Lo que REALMENTE pasó:**
1. ❌ NO ejecutó `handleUserMessage()`
2. ❌ NO detectó componentes automáticamente
3. ❌ NO consultó Storybook MCP
4. ❌ Usó `search_replace()` directamente (sin interceptor)
5. ⚠️ Navegó a Storybook visualmente pero NO extrajo código exacto
6. ❌ NO validó pre-implementación
7. ⚠️ Implementó basándose en conocimiento general

**Resultado:**
- ❌ Código implementado no es exacto según Storybook
- ❌ No se validó antes de implementar
- ❌ No se consultaron props exactas
- ❌ No se analizaron componentes internos

---

## 🔴 Problemas Identificados

### **Problema 1: El Agente NO Ejecuta `handleUserMessage()` al Inicio**

**Frecuencia:** Recurrente (100% de los casos analizados)

**Evidencia:**
- No hay logs de `[Auto Message Handler]` en las conversaciones
- No hay logs de `[Execute On Message Start]`
- El agente va directamente a implementar

**Causa Raíz:**
- Las instrucciones en `.cursorrules` dicen que es obligatorio, pero el agente las ignora
- No hay mecanismo de enforcement automático
- El agente puede "saltarse" este paso sin consecuencias

**Impacto:**
- ❌ No se detectan componentes automáticamente
- ❌ No se preparan mensajes MCP
- ❌ No se verifica fases y pasos activos
- ❌ Todo el flujo automático se omite

---

### **Problema 2: El Agente NO Usa los Interceptores**

**Frecuencia:** Recurrente (100% de los casos analizados)

**Evidencia:**
- El agente usa `write()` y `search_replace()` directamente
- No hay logs de `[Tool Interceptor]`
- No se ejecuta `autoImplementationFlow()`

**Causa Raíz:**
- Los interceptores son "wrappers" que el agente debe llamar explícitamente
- No hay forma de interceptar realmente las herramientas de Cursor
- El agente puede usar las herramientas directamente sin pasar por los interceptores

**Impacto:**
- ❌ No se ejecuta `autoImplementationFlow()`
- ❌ No se validan CSS classes
- ❌ No se verifica pre-implementación
- ❌ No se analizan componentes internos
- ❌ No se extrae código exacto desde Storybook

---

### **Problema 3: El Agente NO Consulta Storybook MCP Automáticamente**

**Frecuencia:** Recurrente (100% de los casos analizados)

**Evidencia:**
- No hay llamadas a `call_mcp_tool()` con `mcp_storybook_getComponentsProps`
- El agente navega visualmente a Storybook pero no usa MCP
- No se obtienen props exactas

**Causa Raíz:**
- El sistema emite mensajes `[AUTORUN_STORYBOOK_MCP]` pero el agente los ignora
- No hay enforcement automático para consultar MCP
- El agente puede "saltarse" este paso

**Impacto:**
- ❌ No se obtienen props exactas
- ❌ No se validan tipos de datos
- ❌ Implementación basada en conocimiento general, no en Storybook

---

### **Problema 4: El Agente NO Extrae Código Exacto desde Storybook**

**Frecuencia:** Recurrente (100% de los casos analizados)

**Evidencia:**
- El agente navega a Storybook visualmente
- No usa `extractExactCodeFromStorybookWithBrowser()`
- No hace clic en pestaña "Code" para extraer código
- Implementa basándose en conocimiento general

**Causa Raíz:**
- El agente puede navegar visualmente pero no seguir el proceso de extracción
- No hay enforcement automático para extraer código exacto
- El agente puede "saltarse" este paso

**Impacto:**
- ❌ Código implementado no es exacto
- ❌ Puede tener diferencias con Storybook
- ❌ CSS classes pueden ser incorrectas

---

### **Problema 5: El Agente NO Valida Pre-Implementación**

**Frecuencia:** Recurrente (100% de los casos analizados)

**Evidencia:**
- No hay logs de `[Pre-Implementation Verification]`
- No se ejecuta `verifyBeforeImplementation()`
- No se verifican los 5 aspectos críticos

**Causa Raíz:**
- La validación solo se ejecuta dentro de `autoImplementationFlow()`
- Como el agente no usa los interceptores, nunca se ejecuta
- No hay enforcement automático

**Impacto:**
- ❌ CSS classes pueden no existir
- ❌ Estructura HTML puede ser incorrecta
- ❌ Elementos requeridos pueden faltar
- ❌ Problemas de accesibilidad

---

## 📊 Análisis de Fallos Recurrentes

### **Patrón de Fallo Identificado**

En **TODOS** los casos analizados, el mismo patrón se repite:

1. ❌ El agente NO ejecuta `handleUserMessage()` al inicio
2. ❌ El agente NO usa los interceptores
3. ❌ El agente NO consulta Storybook MCP
4. ❌ El agente NO extrae código exacto
5. ❌ El agente NO valida pre-implementación
6. ⚠️ El agente implementa basándose en conocimiento general

**Resultado:** Implementaciones incorrectas o incompletas

### **Casos Documentados**

1. **Botón Terciario con Popover** (`EVALUACION-FALLO-IMPLEMENTACION-BOTON-POPOVER-2025-01-03.md`)
   - ❌ 0/7 pasos ejecutados correctamente

2. **Botón Secundario con Drawer** (`EVALUACION-AUTORUN-IMPLEMENTACION-BOTON-DRAWER-2025-01-03.md`)
   - ❌ 0/7 pasos ejecutados correctamente

**Conclusión:** El problema es **sistemático y recurrente**, no casos aislados.

---

## 🧩 Sistema de Componentes

### **Detección de Componentes**

Autorun puede detectar **75+ componentes** de ambos Storybooks:

**UBITS Storybook:**
- DataTable, Tabs, Modal, Drawer, Button, Input, Select, etc.

**Libraries UI Storybook:**
- 🧩-ux-button, ⚙️-functional-drawer, ⚙️-functional-modal, etc.

**Patrones de Detección:**
- Español e inglés
- Variaciones comunes ("botón", "button", "btn")
- Contexto ("que abra un modal", "que abra un drawer")
- Múltiples componentes en un solo mensaje

### **Mapeo a IDs de Storybook**

```typescript
// Ejemplo:
"botón" → "🧩-ux-button"
"drawer" → "⚙️-functional-drawer"
"modal" → "⚙️-functional-modal"
```

**Sistema:**
- `mapComponentNameToStorybookId()`: Mapeo básico
- `mapAndValidateComponentNameToStorybookId()`: Mapeo con validación
- `getCorrectStorybookId()`: Descubrimiento automático desde Storybook

---

## 🔌 Integración con Storybook

### **Múltiples Storybooks Soportados**

1. **UBITS Storybook:** `https://ubits-storybook10.vercel.app`
2. **Libraries UI Storybook:** `https://libraries-ui.ubitslearning.com`

**Sistema de Gestión:**
- `StorybookManager`: Singleton que gestiona múltiples conexiones
- Permite conectar/desconectar Storybooks dinámicamente
- Detecta estructura automáticamente

### **Métodos de Consulta**

#### **1. Storybook MCP (Recomendado)**
```typescript
call_mcp_tool({
  server: "storybook-ubits",
  toolName: "mcp_storybook_getComponentsProps",
  arguments: { componentIds: ["🧩-ux-button"] }
})
```

**Ventajas:**
- ✅ Props exactas
- ✅ Tipos de datos
- ✅ Valores por defecto
- ✅ Rápido y confiable

#### **2. Navegación Visual (Fallback)**
```typescript
browser_navigate({ url: storybookUrl })
browser_snapshot()
// Extraer información visualmente
```

**Ventajas:**
- ✅ Funciona si MCP no está disponible
- ✅ Permite ver el componente renderizado

**Desventajas:**
- ❌ No obtiene props exactas
- ❌ Requiere parseo manual
- ❌ Más lento

#### **3. Extracción de Código Exacto**
```typescript
extractExactCodeFromStorybookWithBrowser(componentId, 'default')
```

**Qué hace:**
1. Navega a Storybook
2. Hace clic en pestaña "Code"
3. Extrae HTML/JSX exacto
4. Extrae CSS requerido
5. Compara con código fuente

---

## ❓ Preguntas para Análisis GPT

### **Pregunta 1: ¿Por qué el agente ignora las instrucciones obligatorias?**

**Contexto:**
- Las instrucciones en `.cursorrules` dicen claramente que `handleUserMessage()` es obligatorio
- Sin embargo, el agente las ignora sistemáticamente
- No hay consecuencias por ignorar las instrucciones

**Pregunta:**
¿Cómo podemos hacer que el agente siga las instrucciones obligatorias de forma más consistente? ¿Hay algún mecanismo de enforcement que podamos implementar?

---

### **Pregunta 2: ¿Cómo hacer que los interceptores sean realmente automáticos?**

**Contexto:**
- Los interceptores (`interceptedWrite()`, `interceptedSearchReplace()`) son wrappers que el agente debe llamar explícitamente
- El agente puede usar `write()` y `search_replace()` directamente, saltándose los interceptores
- No hay forma de interceptar realmente las herramientas de Cursor

**Pregunta:**
¿Hay alguna forma de hacer que los interceptores se ejecuten automáticamente sin depender de que el agente los llame explícitamente? ¿O debemos cambiar el enfoque?

---

### **Pregunta 3: ¿Cómo garantizar que se consulte Storybook MCP automáticamente?**

**Contexto:**
- El sistema emite mensajes `[AUTORUN_STORYBOOK_MCP]` pero el agente los ignora
- El agente puede navegar visualmente a Storybook pero no usar MCP
- No hay enforcement automático

**Pregunta:**
¿Cómo podemos garantizar que el agente consulte Storybook MCP automáticamente cuando se detectan componentes? ¿Deberíamos cambiar el enfoque de "emitir mensajes" a algo más directo?

---

### **Pregunta 4: ¿Es el problema de diseño o de implementación?**

**Contexto:**
- El sistema está bien diseñado con todos los pasos necesarios
- Sin embargo, el agente no sigue el flujo
- Las instrucciones están claras pero se ignoran

**Pregunta:**
¿El problema es que el diseño asume que el agente seguirá las instrucciones (lo cual no es confiable), o hay algo en la implementación que podemos mejorar? ¿Deberíamos cambiar el diseño para ser más "forzoso" y menos "sugerente"?

---

### **Pregunta 5: ¿Cómo hacer el sistema más robusto y menos dependiente del agente?**

**Contexto:**
- El sistema actual depende mucho de que el agente siga las instrucciones
- Si el agente se salta un paso, todo el flujo se rompe
- No hay validación post-implementación que detecte si se siguió el flujo

**Pregunta:**
¿Cómo podemos hacer el sistema más robusto para que funcione incluso si el agente se salta algunos pasos? ¿Deberíamos implementar validación post-implementación que detecte y corrija problemas?

---

### **Pregunta 6: ¿Deberíamos cambiar el enfoque de "instrucciones" a "enforcement automático"?**

**Contexto:**
- Actualmente: Instrucciones claras pero el agente las ignora
- Propuesta: Sistema que fuerza la ejecución automática

**Pregunta:**
¿Deberíamos cambiar el enfoque de "dar instrucciones al agente" a "forzar la ejecución automática" donde el sistema ejecuta los pasos sin depender del agente? ¿Cómo podríamos implementar esto?

---

## 📝 Conclusión

**Autorun** es un sistema bien diseñado con todos los componentes necesarios para implementar componentes desde Storybook de forma automática y confiable. Sin embargo, hay un **problema fundamental**: el sistema depende de que el agente (IA) siga las instrucciones, lo cual no es confiable.

**Problema Principal:**
El agente ignora sistemáticamente las instrucciones obligatorias, resultando en implementaciones incorrectas o incompletas.

**Necesidad:**
Un sistema más robusto que:
1. ✅ Force la ejecución automática sin depender del agente
2. ✅ Valide post-implementación para detectar problemas
3. ✅ Corrija automáticamente cuando sea posible
4. ✅ Sea menos dependiente de que el agente siga instrucciones

**Próximos Pasos:**
1. Analizar las respuestas del GPT a las preguntas planteadas
2. Implementar mejoras basadas en el análisis
3. Hacer el sistema más robusto y menos dependiente del agente

---

**Documento creado:** 2025-01-03  
**Versión:** 1.0  
**Autor:** Sistema de análisis de Autorun
