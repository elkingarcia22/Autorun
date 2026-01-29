# 🚀 Plan: Integración Completa de Información de Storybook

> **Fecha:** 2025-01-10  
> **Objetivo:** Integrar TODA la información de Storybook para que Autorun actúe más rápido y no falle en implementación

---

## 🎯 Visión: Autorun con Información Completa

### **Estado Actual:**
- ⚠️ Autorun obtiene código y props básicas
- ⚠️ Implementa pero puede fallar por falta de información
- ⚠️ No tiene API, setup, best practices, ejemplos

### **Estado Deseado:**
- ✅ Autorun obtiene TODA la información de Storybook
- ✅ Implementa con información completa
- ✅ Valida contra información extraída
- ✅ Genera código preciso y funcional
- ✅ **NO falla** porque tiene toda la información necesaria

---

## 📋 Información que Necesitamos Extraer

### **1. Información Básica** ✅ (Ya implementado)
- ✅ Código HTML/JSX
- ✅ Props estructuradas
- ✅ Estructura HTML

### **2. Información Avanzada** ❌ (Falta implementar)
- ❌ **API del componente** (métodos, firmas, parámetros)
- ❌ **Setup requerido** (componente raíz, inicialización)
- ❌ **Component Composition** (dependencias, iconos)
- ❌ **Best Practices** (guías, valores por defecto)
- ❌ **Ejemplos del mundo real** (casos de uso prácticos)
- ❌ **Variaciones completas** (todas las combinaciones)

---

## 🔧 Implementación: Extractores Adicionales

### **1. Extractor de API** 🔴 CRÍTICO

**Archivo:** `packages/autorun-core/src/helpers/storybookAPIExtractor.ts`

**Funcionalidad:**
```typescript
export interface ComponentAPI {
  methods: Array<{
    name: string;
    signature: string;
    parameters: Array<{
      name: string;
      type: string;
      required: boolean;
      description?: string;
    }>;
    description?: string;
    examples?: string[];
  }>;
  setup?: {
    required: boolean;
    code: string;
    description: string;
  };
}

export async function extractAPIFromStorybook(
  componentId: string
): Promise<ComponentAPI> {
  // 1. Navegar a página de docs
  // 2. Buscar sección "Toast API" o "Usage"
  // 3. Extraer métodos y firmas
  // 4. Extraer setup requerido
  // 5. Retornar API estructurada
}
```

**Uso en implementación:**
```typescript
// Obtener API antes de implementar
const api = await extractAPIFromStorybook('functional-toast');

// Generar código con API correcta
const code = generateCodeWithAPI(api);
// Resultado: toast.success(title, description?, action?, position?)
```

---

### **2. Extractor de Component Composition** 🟡 VALIOSO

**Archivo:** `packages/autorun-core/src/helpers/storybookCompositionExtractor.ts`

**Funcionalidad:**
```typescript
export interface ComponentComposition {
  dependencies: Array<{
    name: string;
    purpose: string;
    importPath?: string;
    required: boolean;
  }>;
  setup?: {
    required: boolean;
    code: string;
    description: string;
    location: 'root' | 'component' | 'both';
  };
}

export async function extractCompositionFromStorybook(
  componentId: string
): Promise<ComponentComposition> {
  // 1. Buscar sección "Component Composition"
  // 2. Extraer dependencias
  // 3. Extraer setup requerido
  // 4. Retornar composición estructurada
}
```

**Uso en implementación:**
```typescript
// Obtener composición antes de implementar
const composition = await extractCompositionFromStorybook('functional-toast');

// Incluir dependencias en código
const code = generateCodeWithDependencies(composition);
// Resultado: import { FxButton } from "..."; import { CheckCircle } from "lucide-react";
```

---

### **3. Extractor de Best Practices** 🟡 VALIOSO

**Archivo:** `packages/autorun-core/src/helpers/storybookBestPracticesExtractor.ts`

**Funcionalidad:**
```typescript
export interface BestPractices {
  practices: Array<{
    title: string;
    description: string;
    examples?: string[];
  }>;
  defaults?: Record<string, any>;
  warnings?: string[];
  recommendations?: string[];
}

export async function extractBestPracticesFromStorybook(
  componentId: string
): Promise<BestPractices> {
  // 1. Buscar sección "Best Practices"
  // 2. Extraer prácticas
  // 3. Extraer valores por defecto
  // 4. Extraer advertencias
  // 5. Retornar prácticas estructuradas
}
```

**Uso en implementación:**
```typescript
// Obtener best practices antes de implementar
const practices = await extractBestPracticesFromStorybook('functional-toast');

// Validar implementación contra prácticas
const validation = validateAgainstBestPractices(implementation, practices);
// Resultado: Advertencias si no sigue prácticas
```

---

### **4. Extractor de Ejemplos del Mundo Real** 🟡 VALIOSO

**Archivo:** `packages/autorun-core/src/helpers/storybookRealWorldExamplesExtractor.ts`

**Funcionalidad:**
```typescript
export interface RealWorldExamples {
  examples: Array<{
    title: string;
    description: string;
    code: string;
    useCase: string;
    variant?: string;
    context?: string;
  }>;
}

export async function extractRealWorldExamplesFromStorybook(
  componentId: string
): Promise<RealWorldExamples> {
  // 1. Buscar sección "Real-World Examples" o "Examples"
  // 2. Extraer ejemplos
  // 3. Extraer código de cada ejemplo
  // 4. Extraer casos de uso
  // 5. Retornar ejemplos estructurados
}
```

**Uso en implementación:**
```typescript
// Obtener ejemplos antes de implementar
const examples = await extractRealWorldExamplesFromStorybook('functional-toast');

// Encontrar ejemplo más relevante
const relevantExample = findRelevantExample(examples, useCase);
// Resultado: Código de ejemplo para caso de uso específico
```

---

## 🔄 Integración en Flujo Automático

### **Flujo Actual:**
```
1. Detectar componente
2. Obtener código básico
3. Obtener props básicas
4. Generar código
5. Validar estructura
```

### **Flujo Mejorado:**
```
1. Detectar componente
2. Obtener TODA la información:
   - Código HTML/JSX
   - Props estructuradas
   - API completa
   - Setup requerido
   - Dependencias
   - Best practices
   - Ejemplos del mundo real
3. Generar código completo y preciso
4. Validar contra toda la información
5. Incluir setup y dependencias
6. Validar contra best practices
```

---

## 🚀 Implementación Completa

### **Paso 1: Crear Extractores Adicionales**

Voy a crear los 4 extractores adicionales que faltan.

### **Paso 2: Integrar en Helper Principal**

Actualizar `storybookImplementationHelper.ts` para usar todos los extractores.

### **Paso 3: Actualizar Generador de Código**

Actualizar `storybookCodeGenerator.ts` para usar API, setup, dependencias.

### **Paso 4: Actualizar Validador**

Actualizar `storybookStructureValidator.ts` para validar contra best practices.

---

## ✅ Resultado Esperado

Con toda esta información, Autorun podrá:

1. **✅ Implementar más rápido:**
   - Tiene toda la información de una vez
   - No necesita múltiples consultas
   - Genera código completo inmediatamente

2. **✅ No fallar en implementación:**
   - Tiene API exacta
   - Tiene setup requerido
   - Tiene dependencias
   - Tiene best practices
   - Tiene ejemplos del mundo real

3. **✅ Generar código preciso:**
   - Código con API correcta
   - Código con setup incluido
   - Código con dependencias
   - Código siguiendo best practices

4. **✅ Validar correctamente:**
   - Valida contra API
   - Valida contra setup
   - Valida contra best practices
   - Valida contra ejemplos

---

**¿Procedo a implementar todos los extractores adicionales?**
