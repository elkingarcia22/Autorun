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
├── fileExtractor.ts      # Busca archivos .stories.ts
├── codeParser.ts         # Parsea código de historias
├── htmlGenerator.ts      # Genera HTML completo
├── simpleImplementation.ts # Flujo simplificado
├── index.ts              # API pública
└── README.md            # Esta documentación
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
- ✅ **Parser de código** - Implementado
  - Parsea código de historias (para compatibilidad futura)
  - Extrae props y imports
- ✅ **Generador de HTML** - Implementado
  - Genera HTML desde README (ejemplos)
  - Genera HTML desde Provider (funciones de renderizado)
  - Incluye dependencias (CSS, scripts)
  - Genera HTML completo listo para usar
- ✅ **Integración Simple** - Implementado
  - `implementComponentSimple()` - Implementa componente completo
  - `generateComponentHTML()` - Solo genera HTML sin escribir archivo

---

## 🎯 Próximos Pasos

1. Implementar extractor de archivos
2. Implementar parser básico
3. Probar con componente simple (Button)
4. Mejorar según resultados
5. Integrar con Autorun

---

**Última actualización:** 2025-01-23
