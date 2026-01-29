# 🧪 POC: Storybook V2 - Extracción Local

> **Estado:** 🚧 En Desarrollo  
> **Objetivo:** Crear sistema simple y confiable para extraer código de componentes desde Storybook local

---

## 🎯 Objetivo

Crear un sistema que extraiga código de implementación directamente desde archivos `.stories.ts` locales, sin depender de:

- ❌ APIs externas (Vercel)
- ❌ Navegación manual (Browser MCP)
- ❌ Múltiples fuentes de verdad
- ❌ MCPs que requieren ejecución manual

---

## 📋 Estructura

```
packages/autorun-core/src/poc/storybook-v2/
├── fileExtractor.ts         # Busca archivos .stories.ts
├── codeParser.ts            # Parsea código de historias
├── htmlGenerator.ts         # Genera HTML completo
├── simpleImplementation.ts   # Flujo simplificado
├── componentPreserver.ts    # ⭐ Sistema automático de preservación
├── eventListenerManager.ts  # ⭐ Sistema de event listeners persistente
├── dependencyChecker.ts      # ⭐ Verificación de dependencias
├── autoPreserveHelper.ts    # ⭐ Helper de alto nivel
├── storybookParser.ts       # Parser de .stories.ts
├── index.ts                 # API pública
├── USAGE-EXAMPLE.md         # Ejemplos de uso
└── README.md                # Esta documentación
```

---

## 🚀 Uso Básico

```typescript
import { implementComponentSimple } from '@autorun/core/poc/storybook-v2';

// Implementar componente
const result = await implementComponentSimple(
  'basicos-button', // ID del componente
  'default', // Nombre de la historia
  'output/button.html' // Archivo destino
);

if (result.success) {
  console.log('✅ Código generado:', result.html);
} else {
  console.error('❌ Error:', result.error);
}
```

---

## 📚 API

### `findStoryFile(componentId: string)`

Busca archivo `.stories.ts` para un componente.

```typescript
const storyFile = await findStoryFile('basicos-button');
if (storyFile) {
  console.log('Archivo encontrado:', storyFile.filePath);
}
```

### `parseStoryCode(content: string, storyName: string)`

Parsea código de una historia específica.

```typescript
const parsed = parseStoryCode(storyFile.content, 'default');
console.log('Código:', parsed.code);
console.log('Props:', parsed.props);
```

### `generateHTMLFromStory(parsedStory, componentId)`

Genera HTML completo desde código parseado.

```typescript
const html = generateHTMLFromStory(parsed, 'basicos-button');
console.log('HTML completo:', html.complete);
```

### `implementComponentSimple(componentId, storyName, targetFile)`

Flujo completo simplificado.

```typescript
const result = await implementComponentSimple(
  'basicos-button',
  'default',
  'output/button.html'
);
```

---

## 🧪 Pruebas

```bash
# Ejecutar pruebas
tsx scripts/test-poc-storybook-v2.ts

# El script prueba:
# - Button
# - DataTable
# - Modal
```

**Salida esperada:**

- ✅ Búsqueda de archivos (Provider, README)
- ✅ Generación de HTML
- ✅ Creación de archivos en `test-output/`

---

## 📊 Estado Actual

- ✅ **Extractor de archivos** - Implementado
  - Busca `*Provider.ts` (funciones de renderizado)
  - Busca `README.md` (documentación con ejemplos)
  - Busca `*Component.ts` (Web Components)
  - Busca `.stories.ts` (historias de Storybook)
- ✅ **Parser de código** - Implementado
  - Parsea código de historias
  - Extrae props y imports
  - Parsea contrato UBITS (`parameters.ubits`)
- ✅ **Generador de HTML** - Implementado
  - Genera HTML desde README (ejemplos)
  - Genera HTML desde Provider (funciones de renderizado)
  - Genera HTML desde historias "Implementation (Copy/Paste)"
  - Incluye dependencias (CSS, scripts)
  - Genera HTML completo listo para usar
- ✅ **Integración Simple** - Implementado
  - `implementComponentSimple()` - Implementa componente completo
  - `generateComponentHTML()` - Solo genera HTML sin escribir archivo
- ✅ **Sistemas Automáticos** - ⭐ **NUEVO**
  - `ComponentPreserver` - Preserva componentes automáticamente cuando ContentManager limpia contenido
  - `EventListenerManager` - Gestiona event listeners de forma persistente
  - `DependencyChecker` - Verifica que dependencias estén disponibles
  - `autoPreserveComponent()` - Helper de alto nivel que configura todo automáticamente

---

## ⭐ Sistemas Automáticos (NUEVO)

### **ComponentPreserver**

Preserva componentes automáticamente cuando `ContentManager.updateContent()` limpia el contenido.

```typescript
import ComponentPreserver from '@autorun/core/poc/storybook-v2/componentPreserver';

ComponentPreserver.preserve('radio-button', 'radiobutton-group-tipo', {
  onChange: handleChange,
});
```

### **EventListenerManager**

Gestiona event listeners de forma persistente, re-agregándolos después de recrear HTML.

```typescript
import EventListenerManager from '@autorun/core/poc/storybook-v2/eventListenerManager';

EventListenerManager.register('radio-button', [
  {
    selector: '.ubits-radio-button__input',
    event: 'change',
    handler: handleChange,
  },
]);
```

### **DependencyChecker**

Verifica que las dependencias necesarias estén disponibles.

```typescript
import DependencyChecker from '@autorun/core/poc/storybook-v2/dependencyChecker';

const check = await DependencyChecker.waitForDependencies('radio-button', 5000);
DependencyChecker.report('radio-button');
```

### **AutoPreserveHelper**

Helper de alto nivel que configura todo automáticamente.

```typescript
import { autoPreserveRadioButton } from '@autorun/core/poc/storybook-v2';

await autoPreserveRadioButton('radiobutton-group-tipo', handleChange);
```

**Ver ejemplos completos:** `USAGE-EXAMPLE.md`

---

## 🎯 Próximos Pasos

1. ✅ Implementar extractor de archivos
2. ✅ Implementar parser básico
3. ✅ Implementar sistemas automáticos
4. ✅ Crear template simplificado para backend
5. ⏳ Probar con más componentes (Button, DataTable, etc.)
6. ⏳ Integrar con Autorun
7. ⏳ Agregar tests unitarios

---

## 📚 Documentación Adicional

- **Ejemplos de Uso:** `USAGE-EXAMPLE.md`
- **Análisis Completo:** `docs/analisis/ANALISIS-POC-STORYBOOK-V2-RADIOBUTTON.md`
- **Plan de Mejoras:** `docs/analisis/PLAN-MEJORAS-POC-STORYBOOK-V2.md`
- **Template Básico:** `templates/basico/README.md`

---

**Última actualización:** 2025-01-23
