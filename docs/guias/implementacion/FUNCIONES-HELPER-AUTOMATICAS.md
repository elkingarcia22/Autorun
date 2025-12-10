# 🔧 Funciones Helper Automáticas para Implementación

## 🎯 Objetivo

Automatizar las consultas obligatorias antes de implementar componentes UBITS, reduciendo la fricción y garantizando que siempre se sigan los procesos correctos.

---

## 📚 Funciones Helper Disponibles

### **1. `checkComponentBeforeImplementation(componentName: string)`**

Función helper que automáticamente:
1. Consulta Storybook MCP
2. Consulta Storybook en Vercel (vía web scraping)
3. Consulta documentación local
4. Verifica con Pre-Implementation Check add-on
5. Muestra resumen de lo encontrado

**Uso:**
```typescript
// Antes de implementar cualquier componente
const result = await checkComponentBeforeImplementation('Tabs');

if (result.allowed) {
  // Proceder con implementación
} else {
  // Mostrar pasos faltantes
  console.error('Pasos faltantes:', result.missingSteps);
}
```

---

### **2. `autoConsultStorybookMCP(componentName: string)`**

Consulta automáticamente Storybook MCP y marca el paso como completado.

**Uso:**
```typescript
// Consultar Storybook MCP automáticamente
const props = await autoConsultStorybookMCP('Tabs');

// Props ya están disponibles y el paso está marcado como completado
console.log('Props disponibles:', props);
```

---

### **3. `autoConsultStorybookVercel(componentName: string)`**

Consulta automáticamente Storybook en Vercel y extrae información relevante.

**Uso:**
```typescript
// Consultar Storybook en Vercel automáticamente
const storybookInfo = await autoConsultStorybookVercel('Tabs');

// Información disponible
console.log('URL:', storybookInfo.url);
console.log('Código de ejemplo:', storybookInfo.code);
console.log('Controles disponibles:', storybookInfo.controls);
```

---

### **4. `autoConsultDocumentation(componentName: string)`**

Consulta automáticamente la documentación local y marca el paso como completado.

**Uso:**
```typescript
// Consultar documentación automáticamente
const docs = await autoConsultDocumentation('Tabs');

// Documentación disponible
console.log('Documentación:', docs.content);
console.log('Ejemplos:', docs.examples);
```

---

## 🔄 Flujo Automático Completo

### **Implementación Automática con Verificación:**

```typescript
async function implementComponentSafely(componentName: string, implementation: () => Promise<void>) {
  // 1. Verificar con Pre-Implementation Check
  const preCheckAddon = getPreImplementationCheckAddon();
  const checkResult = await preCheckAddon.canImplement(componentName);
  
  if (!checkResult.allowed) {
    // 2. Completar pasos faltantes automáticamente
    console.log('🔍 Completando checklist automáticamente...');
    
    // Consultar Storybook MCP
    if (!checkResult.checklist.storybookMCP) {
      await autoConsultStorybookMCP(componentName);
      await preCheckAddon.markStepCompleted(componentName, 'storybookMCP');
    }
    
    // Consultar Storybook en Vercel
    if (!checkResult.checklist.storybookVercel) {
      await autoConsultStorybookVercel(componentName);
      await preCheckAddon.markStepCompleted(componentName, 'storybookVercel');
    }
    
    // Consultar documentación
    if (!checkResult.checklist.documentation) {
      await autoConsultDocumentation(componentName);
      await preCheckAddon.markStepCompleted(componentName, 'documentation');
    }
    
    // 3. Verificar nuevamente
    const finalCheck = await preCheckAddon.canImplement(componentName);
    if (!finalCheck.allowed) {
      throw new Error(`No se puede implementar ${componentName}: ${finalCheck.reason}`);
    }
  }
  
  // 4. Proceder con implementación
  await implementation();
}
```

---

## 🚀 Uso en Cursor Agent

### **Prompt Automático para Agente:**

Cuando el agente detecta un intento de implementación, debe:

1. **Detectar automáticamente:**
   ```typescript
   // El Pre-Implementation Check add-on ya detecta automáticamente
   // cuando se escribe código con patrones como window.createTabs()
   ```

2. **Consultar automáticamente:**
   ```typescript
   // Usar funciones helper
   const props = await autoConsultStorybookMCP('Tabs');
   const storybookInfo = await autoConsultStorybookVercel('Tabs');
   const docs = await autoConsultDocumentation('Tabs');
   ```

3. **Mostrar información:**
   ```typescript
   console.log('📚 Información consultada:');
   console.log('- Props:', props);
   console.log('- Storybook:', storybookInfo.url);
   console.log('- Documentación:', docs.path);
   ```

4. **Implementar con información correcta:**
   ```typescript
   // Usar props exactas obtenidas
   window.createTabs({
     tabs: props.exampleTabs,
     activeTabId: props.defaultActiveTabId,
     onTabChange: props.onTabChangeExample
   }, containerId);
   ```

---

## 📋 Checklist Automático

Las funciones helper automáticamente:
- ✅ Consultan todas las fuentes necesarias
- ✅ Marcan pasos como completados en Pre-Implementation Check
- ✅ Extraen información relevante (props, ejemplos, controles)
- ✅ Muestran resumen de lo encontrado
- ✅ Bloquean implementación si falta información crítica

---

## 🔧 Implementación Técnica

### **Estructura de Funciones Helper:**

```typescript
// packages/autorun-core/src/helpers/componentHelpers.ts

export async function autoConsultStorybookMCP(componentName: string): Promise<any> {
  // 1. Mapear nombre a nombre de componente en Storybook
  const storybookName = mapComponentNameToStorybook(componentName);
  
  // 2. Consultar Storybook MCP
  const props = await mcp_storybook_getComponentsProps([storybookName]);
  
  // 3. Marcar paso como completado
  const preCheckAddon = getPreImplementationCheckAddon();
  await preCheckAddon.markStepCompleted(componentName, 'storybookMCP');
  
  return props;
}

export async function autoConsultStorybookVercel(componentName: string): Promise<any> {
  // 1. Mapear nombre a URL de Storybook
  const url = mapComponentNameToStorybookURL(componentName);
  
  // 2. Scrapear Storybook en Vercel
  const content = await scrapeStorybookVercel(url);
  
  // 3. Extraer información relevante
  const info = extractStorybookInfo(content);
  
  // 4. Marcar paso como completado
  const preCheckAddon = getPreImplementationCheckAddon();
  await preCheckAddon.markStepCompleted(componentName, 'storybookVercel');
  
  return info;
}

export async function autoConsultDocumentation(componentName: string): Promise<any> {
  // 1. Mapear nombre a archivo de documentación
  const docPath = mapComponentNameToDocFile(componentName);
  
  // 2. Leer documentación
  const content = await readDocumentation(docPath);
  
  // 3. Marcar paso como completado
  const preCheckAddon = getPreImplementationCheckAddon();
  await preCheckAddon.markStepCompleted(componentName, 'documentation');
  
  return content;
}
```

---

## ✅ Beneficios

1. **Automatización completa:** No requiere recordar pasos manuales
2. **Consistencia:** Siempre se consultan las mismas fuentes
3. **Trazabilidad:** Todos los pasos quedan registrados
4. **Bloqueo automático:** No se puede implementar sin completar checklist
5. **Información completa:** Siempre se tiene la información más actualizada

---

## 🎯 Próximos Pasos

1. ✅ Implementar funciones helper en `packages/autorun-core/src/helpers/`
2. ✅ Integrar con Pre-Implementation Check add-on
3. ✅ Actualizar reglas en `.cursorrules` para usar funciones helper
4. ✅ Crear ejemplos de uso en documentación
5. ✅ Probar con implementación real de componente




