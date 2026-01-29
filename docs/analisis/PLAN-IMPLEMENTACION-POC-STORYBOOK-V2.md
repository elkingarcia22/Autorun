# 📋 Plan de Implementación: POC Storybook V2

> **Fecha:** 2025-01-23  
> **Objetivo:** Implementar prueba de concepto del nuevo sistema de extracción de componentes desde Storybook local

---

## 🎯 Objetivo de la POC

Crear un sistema simple y confiable que extraiga código de implementación directamente desde archivos `.stories.ts` locales, sin depender de APIs externas, navegación manual, o múltiples fuentes de verdad.

---

## 📋 Fase 1: Setup y Análisis (Día 1)

### **Paso 1.1: Verificar Storybook Local**

```bash
# Verificar estructura
ls -la vendor/ubits/packages/storybook
ls -la vendor/ubits/packages/components/

# Buscar archivos .stories.ts
find vendor/ubits/packages/components -name "*.stories.ts" | head -10

# Analizar estructura de un componente
cat vendor/ubits/packages/components/button/src/button.stories.ts | head -50
```

**Objetivo:** Entender la estructura real de archivos y cómo están organizados los componentes.

---

### **Paso 1.2: Crear Estructura de POC**

```bash
# Crear directorio de POC
mkdir -p packages/autorun-core/src/poc/storybook-v2

# Crear archivos base
touch packages/autorun-core/src/poc/storybook-v2/fileExtractor.ts
touch packages/autorun-core/src/poc/storybook-v2/codeParser.ts
touch packages/autorun-core/src/poc/storybook-v2/htmlGenerator.ts
touch packages/autorun-core/src/poc/storybook-v2/simpleImplementation.ts
touch packages/autorun-core/src/poc/storybook-v2/index.ts
touch packages/autorun-core/src/poc/storybook-v2/README.md
```

---

### **Paso 1.3: Analizar Estructura de Historias**

**Tarea:** Leer varios archivos `.stories.ts` y entender:
- Cómo se estructuran las historias
- Cómo se expone código de implementación
- Qué formato tienen los ejemplos de código
- Cómo se definen props

**Archivos a analizar:**
- `vendor/ubits/packages/components/button/src/button.stories.ts`
- `vendor/ubits/packages/components/data-table/src/data-table.stories.ts`
- `vendor/ubits/packages/components/modal/src/modal.stories.ts`

---

## 📋 Fase 2: Extractor de Archivos (Día 2)

### **Paso 2.1: Implementar Buscador de Archivos**

**Archivo:** `packages/autorun-core/src/poc/storybook-v2/fileExtractor.ts`

**Funcionalidad:**
```typescript
export interface StoryFile {
  componentId: string;
  filePath: string;
  content: string;
  found: boolean;
}

/**
 * Busca archivo .stories.ts para un componente
 */
export async function findStoryFile(componentId: string): Promise<StoryFile | null> {
  // 1. Normalizar componentId (ej: "data-data-table" -> "data-table")
  // 2. Buscar en múltiples ubicaciones posibles
  // 3. Leer archivo si existe
  // 4. Retornar resultado
}
```

**Ubicaciones a buscar:**
1. `vendor/ubits/packages/components/{componentId}/src/{componentId}.stories.ts`
2. `vendor/ubits/packages/components/{componentId}/src/{componentId}.stories.tsx`
3. `vendor/ubits/packages/addons/{componentId}/src/{componentId}.stories.ts`
4. Buscar recursivamente si no se encuentra

---

### **Paso 2.2: Implementar Mapeo de Componentes**

**Funcionalidad:**
```typescript
/**
 * Mapea nombre de componente a ID de Storybook
 */
export function mapComponentNameToId(componentName: string): string {
  // Mapeo directo basado en convenciones
  // Ej: "DataTable" -> "data-data-table"
  // Ej: "Button" -> "basicos-button"
}
```

**Estrategia:**
- Usar convenciones conocidas
- Buscar en `index.json` si está disponible
- Fallback a búsqueda por nombre

---

## 📋 Fase 3: Parser de Código (Día 3)

### **Paso 3.1: Analizar Estructura de Historias**

**Tarea:** Entender cómo se estructura el código en `.stories.ts`:
- ¿Cómo se define el código de implementación?
- ¿Está en `parameters.docs.source.code`?
- ¿Está en el `render` function?
- ¿Hay historias específicas para implementación?

---

### **Paso 3.2: Implementar Parser Básico**

**Archivo:** `packages/autorun-core/src/poc/storybook-v2/codeParser.ts`

**Funcionalidad:**
```typescript
export interface ParsedStory {
  name: string;
  code: string;
  props?: Record<string, any>;
  imports?: string[];
  html?: string;
  js?: string;
}

/**
 * Parsea código de una historia específica
 */
export function parseStoryCode(
  storyContent: string,
  storyName: string
): ParsedStory | null {
  // 1. Parsear TypeScript usando parser simple o regex
  // 2. Buscar historia por nombre
  // 3. Extraer código de implementación
  // 4. Extraer props y configuración
  // 5. Extraer imports si existen
}
```

**Estrategias de parsing:**
1. **Regex simple:** Para casos básicos
2. **TypeScript parser:** Para casos complejos (usar `@typescript-eslint/parser`)
3. **CSF parser:** Si Storybook expone parser (investigar)

---

### **Paso 3.3: Extraer Código de Implementación**

**Funcionalidad:**
```typescript
/**
 * Extrae código HTML/JS de una historia
 */
export function extractImplementationCode(story: ParsedStory): {
  html: string;
  js?: string;
  css?: string[];
} {
  // 1. Identificar tipo de código (HTML, JSX, JS)
  // 2. Extraer código limpio
  // 3. Separar HTML, JS, CSS si es necesario
  // 4. Retornar estructura completa
}
```

---

## 📋 Fase 4: Generador de HTML (Día 4)

### **Paso 4.1: Implementar Generador Básico**

**Archivo:** `packages/autorun-core/src/poc/storybook-v2/htmlGenerator.ts`

**Funcionalidad:**
```typescript
export interface GeneratedHTML {
  html: string;
  scripts: string[];
  styles: string[];
  complete: string; // HTML completo listo para usar
}

/**
 * Genera HTML completo desde código parseado
 */
export function generateHTMLFromStory(
  parsedStory: ParsedStory,
  componentId: string
): GeneratedHTML {
  // 1. Convertir código de Storybook a HTML
  // 2. Agregar scripts UMD necesarios
  // 3. Agregar estilos necesarios
  // 4. Generar HTML completo con todo incluido
}
```

---

### **Paso 4.2: Manejar Dependencias**

**Funcionalidad:**
```typescript
/**
 * Identifica y resuelve dependencias del componente
 */
export function resolveComponentDependencies(
  componentId: string,
  parsedStory: ParsedStory
): {
  scripts: string[];
  styles: string[];
} {
  // 1. Identificar componentes usados internamente
  // 2. Buscar scripts UMD necesarios
  // 3. Buscar estilos necesarios
  // 4. Retornar lista completa de dependencias
}
```

---

## 📋 Fase 5: Integración Simple (Día 5)

### **Paso 5.1: Crear Flujo Simplificado**

**Archivo:** `packages/autorun-core/src/poc/storybook-v2/simpleImplementation.ts`

**Funcionalidad:**
```typescript
export interface ImplementationResult {
  success: boolean;
  html?: string;
  error?: string;
  warnings?: string[];
}

/**
 * Implementa componente de forma simple y directa
 */
export async function implementComponentSimple(
  componentId: string,
  storyName: string = 'implementation',
  targetFile: string
): Promise<ImplementationResult> {
  try {
    // 1. Buscar archivo .stories.ts
    const storyFile = await findStoryFile(componentId);
    if (!storyFile) {
      return {
        success: false,
        error: `Story file not found for ${componentId}`
      };
    }
    
    // 2. Parsear código
    const parsedStory = parseStoryCode(storyFile.content, storyName);
    if (!parsedStory) {
      return {
        success: false,
        error: `Story ${storyName} not found in ${componentId}`
      };
    }
    
    // 3. Generar HTML
    const generated = generateHTMLFromStory(parsedStory, componentId);
    
    // 4. Retornar resultado
    return {
      success: true,
      html: generated.complete,
      warnings: [] // Agregar warnings si es necesario
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

---

### **Paso 5.2: Crear API Pública**

**Archivo:** `packages/autorun-core/src/poc/storybook-v2/index.ts`

```typescript
export {
  findStoryFile,
  parseStoryCode,
  generateHTMLFromStory,
  implementComponentSimple,
  type StoryFile,
  type ParsedStory,
  type GeneratedHTML,
  type ImplementationResult
};
```

---

## 📋 Fase 6: Pruebas (Día 6)

### **Paso 6.1: Crear Script de Prueba**

**Archivo:** `scripts/test-poc-storybook-v2.ts`

```typescript
import { implementComponentSimple } from '../packages/autorun-core/src/poc/storybook-v2';

async function testPOC() {
  console.log('🧪 Probando POC Storybook V2...\n');
  
  // Test 1: Button
  console.log('Test 1: Button');
  const buttonResult = await implementComponentSimple(
    'basicos-button',
    'default',
    'test-output/button.html'
  );
  console.log('Resultado:', buttonResult.success ? '✅' : '❌');
  if (!buttonResult.success) {
    console.log('Error:', buttonResult.error);
  }
  
  // Test 2: DataTable
  console.log('\nTest 2: DataTable');
  const tableResult = await implementComponentSimple(
    'data-data-table',
    'default',
    'test-output/table.html'
  );
  console.log('Resultado:', tableResult.success ? '✅' : '❌');
  if (!tableResult.success) {
    console.log('Error:', tableResult.error);
  }
  
  // ... más tests
}

testPOC().catch(console.error);
```

---

### **Paso 6.2: Comparar con Sistema Actual**

**Tarea:** Comparar resultados:
- Código generado vs código actual
- Tiempo de ejecución
- Confiabilidad
- Complejidad

---

## 📋 Fase 7: Documentación (Día 7)

### **Paso 7.1: Documentar POC**

**Archivo:** `packages/autorun-core/src/poc/storybook-v2/README.md`

**Contenido:**
- Objetivo de la POC
- Cómo funciona
- Cómo usarla
- Resultados de pruebas
- Comparación con sistema actual
- Recomendaciones

---

### **Paso 7.2: Crear Guía de Uso**

**Archivo:** `docs/guias/poc/GUIA-USO-STORYBOOK-V2.md`

**Contenido:**
- Cómo usar el nuevo sistema
- Ejemplos de uso
- Troubleshooting
- Limitaciones conocidas

---

## ✅ Checklist de Implementación

### **Fase 1: Setup**
- [ ] Verificar Storybook local
- [ ] Crear estructura de directorios
- [ ] Analizar estructura de historias

### **Fase 2: Extractor**
- [ ] Implementar `findStoryFile()`
- [ ] Implementar mapeo de componentes
- [ ] Probar con componentes reales

### **Fase 3: Parser**
- [ ] Implementar `parseStoryCode()`
- [ ] Implementar extracción de código
- [ ] Probar con diferentes tipos de historias

### **Fase 4: Generador**
- [ ] Implementar `generateHTMLFromStory()`
- [ ] Implementar resolución de dependencias
- [ ] Probar generación de HTML completo

### **Fase 5: Integración**
- [ ] Implementar `implementComponentSimple()`
- [ ] Crear API pública
- [ ] Probar flujo completo

### **Fase 6: Pruebas**
- [ ] Crear script de prueba
- [ ] Probar con múltiples componentes
- [ ] Comparar con sistema actual

### **Fase 7: Documentación**
- [ ] Documentar POC
- [ ] Crear guía de uso
- [ ] Documentar resultados

---

## 🎯 Criterios de Éxito

### **Técnicos:**
- ✅ Puede extraer código de al menos 5 componentes diferentes
- ✅ Genera HTML válido y funcional
- ✅ Tiempo de ejecución < 2 segundos por componente
- ✅ Tasa de éxito > 90%

### **Funcionales:**
- ✅ Código generado es correcto y funcional
- ✅ Incluye todas las dependencias necesarias
- ✅ Es fácil de usar y entender
- ✅ Es más confiable que el sistema actual

---

## 📊 Métricas a Medir

1. **Tiempo de ejecución:** ¿Cuánto tarda en extraer e implementar?
2. **Tasa de éxito:** ¿Qué porcentaje de componentes funciona?
3. **Precisión:** ¿El código generado es correcto?
4. **Complejidad:** ¿Es más simple que el sistema actual?
5. **Mantenibilidad:** ¿Es más fácil de mantener?

---

**Última actualización:** 2025-01-23  
**Estado:** 📋 Plan Listo para Implementación  
**Prioridad:** 🔴 CRÍTICA

