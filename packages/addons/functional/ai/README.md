# 🤖 AI Assistant Add-on

Add-on funcional de **AI Assistant** para Autorun que proporciona asistencia de IA con Ollama o Gemini.

## 🎯 Características

- ✅ **Múltiples proveedores** - Soporte para Ollama (local) y Gemini (Google)
- ✅ **Generación de código** - Genera código basado en descripciones
- ✅ **Análisis de código** - Analiza código y sugiere mejoras
- ✅ **Refactorización** - Refactoriza código según instrucciones
- ✅ **Documentación automática** - Genera documentación JSDoc/TSDoc
- ✅ **Auto-suggest** - Sugerencias automáticas al cambiar archivos
- ✅ **Completado de texto** - Completado inteligente de texto

## 📦 Instalación

El add-on ya está incluido en Autorun. No requiere dependencias adicionales.

### Para usar Ollama (Local)

1. Instala Ollama desde [ollama.ai](https://ollama.ai)
2. Descarga un modelo:
```bash
ollama pull llama2
```

### Para usar Gemini (Google)

1. Obtén una API key de [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Configura la API key en variables de entorno o configuración

## ⚙️ Configuración

Agrega la configuración de AI en tu `.ubits/project-config.json`:

```json
{
  "autoframe": {
    "addons": {
      "config": {
        "ai": {
          "provider": "ollama",
          "ollama": {
            "baseUrl": "http://localhost:11434",
            "model": "llama2"
          },
          "gemini": {
            "apiKey": "tu-gemini-api-key",
            "model": "gemini-pro"
          },
          "autoSuggest": false,
          "maxTokens": 1000,
          "temperature": 0.7
        }
      }
    }
  }
}
```

**O usa variables de entorno:**

```bash
export OLLAMA_BASE_URL="http://localhost:11434"
export OLLAMA_MODEL="llama2"
export GEMINI_API_KEY="tu-api-key"
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `provider` | `string` | Proveedor (`ollama`, `gemini`) | `ollama` |
| `ollama.baseUrl` | `string` | URL de Ollama | `http://localhost:11434` |
| `ollama.model` | `string` | Modelo de Ollama | `llama2` |
| `gemini.apiKey` | `string` | API key de Gemini | - |
| `gemini.model` | `string` | Modelo de Gemini | `gemini-pro` |
| `autoSuggest` | `boolean` | Sugerencias automáticas | `false` |
| `maxTokens` | `number` | Máximo de tokens | `1000` |
| `temperature` | `number` | Temperatura (0-1) | `0.7` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutoframeHub } from '@autoframe/core';

const hub = new AutoframeHub();
await hub.initialize();

// Activar AI
await hub.activateAddon('ai');
```

### Completar Texto

```typescript
// Obtener servicio de completado
const complete = hub.getService('ai', 'complete');

// Completar texto
const result = await complete('Escribe una función que calcule el factorial de un número');

console.log(result.text);
```

### Generar Código

```typescript
const generateCode = hub.getService('ai', 'generateCode');

// Generar código desde descripción
const code = await generateCode(
  'Función que valida un email',
  'typescript'
);

console.log(code);
// function validateEmail(email: string): boolean { ... }
```

### Analizar Código

```typescript
const analyzeCode = hub.getService('ai', 'analyzeCode');

const code = `
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}
`;

const analysis = await analyzeCode(code, 'javascript');

analysis.suggestions.forEach(suggestion => {
  console.log(`Línea ${suggestion.line}: ${suggestion.message}`);
  if (suggestion.suggestion) {
    console.log(`  Sugerencia: ${suggestion.suggestion}`);
  }
});
```

### Refactorizar Código

```typescript
const refactorCode = hub.getService('ai', 'refactorCode');

const code = `
function processData(data) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].active) {
      result.push(data[i].name.toUpperCase());
    }
  }
  return result;
}
`;

const refactored = await refactorCode(
  code,
  'Usar métodos funcionales de array en lugar de loops',
  'javascript'
);
```

### Generar Documentación

```typescript
const generateDocumentation = hub.getService('ai', 'generateDocumentation');

const code = `
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
`;

const docs = await generateDocumentation(code, 'typescript');
console.log(docs);
// /**
//  * Calcula el total de una lista de items
//  * @param items - Array de items
//  * @returns El total calculado
//  */
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `complete` | Completa texto con IA | `(prompt: string, options?) => Promise<AICompletion>` |
| `analyzeCode` | Analiza código y genera sugerencias | `(code: string, language?) => Promise<AICodeAnalysis>` |
| `generateCode` | Genera código desde descripción | `(description: string, language?) => Promise<string>` |
| `refactorCode` | Refactoriza código | `(code: string, instructions: string, language?) => Promise<string>` |
| `generateDocumentation` | Genera documentación | `(code: string, language?) => Promise<string>` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración | `() => AIConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<AIConfig>)` |

## 📝 Ejemplos de Uso

### Auto-suggest al Escribir Código

```typescript
// Configurar auto-suggest
await hub.configureAddon('ai', {
  autoSuggest: true,
  provider: 'ollama'
});

// Cuando cambies archivos, recibirás sugerencias automáticas
```

### Integración con Editor

```typescript
// En un editor de código, usar AI para completar
async function onCodeChange(code: string) {
  const complete = hub.getService('ai', 'complete');
  
  // Obtener sugerencia de continuación
  const suggestion = await complete(`Completa este código:\n${code}\n\nSiguiente línea:`);
  
  return suggestion.text;
}
```

### Code Review Automático

```typescript
// Antes de commit, analizar código
const analyzeCode = hub.getService('ai', 'analyzeCode');

const fileContent = await fs.readFile('src/utils.ts', 'utf-8');
const analysis = await analyzeCode(fileContent, 'typescript');

if (analysis.suggestions.some(s => s.severity === 'error')) {
  console.error('❌ Errores encontrados, no se puede hacer commit');
} else {
  console.log('✅ Código aprobado');
}
```

## 🐛 Troubleshooting

### Error: "Ollama no está disponible"

1. Verifica que Ollama esté instalado y ejecutándose:
```bash
ollama serve
```

2. Verifica que el modelo esté descargado:
```bash
ollama list
```

3. Verifica la URL en la configuración

### Error: "Gemini API key no configurada"

1. Obtén una API key de [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Configura `GEMINI_API_KEY` en variables de entorno
3. O configúrala en `.ubits/project-config.json`

### Respuestas muy lentas

1. Usa un modelo más pequeño (ej: `llama2:7b` en lugar de `llama2:13b`)
2. Reduce `maxTokens` en la configuración
3. Para Ollama, asegúrate de tener suficiente RAM

### Código generado no es correcto

1. Ajusta `temperature` (menor = más determinista)
2. Proporciona más contexto en el prompt
3. Especifica el lenguaje de programación claramente

## 📚 Referencias

- [Ollama Documentation](https://github.com/ollama/ollama)
- [Google Gemini API](https://ai.google.dev/docs)
- [Ollama Models](https://ollama.ai/library)

## 🔗 Integración con Otros Add-ons

AI Assistant se integra con:
- **GitHub Add-on**: Puede generar mensajes de commit inteligentes
- **JEST Add-on**: Puede generar tests automáticamente
- **Storybook Add-on**: Puede generar stories automáticamente

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024

