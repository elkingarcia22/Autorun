# 📚 Estructura Ideal de Storybook para Componentes

> **Fecha:** 2025-01-10  
> **Objetivo:** Definir la estructura ideal que debe tener cada componente en Storybook para que Autorun pueda implementarlo sin fallar

---

## 🎯 Propósito

Este documento define la **estructura ideal** que debe tener cada componente en Storybook para que:

1. ✅ Autorun pueda extraer toda la información necesaria
2. ✅ La implementación sea precisa y sin errores
3. ✅ El código generado sea funcional desde el inicio
4. ✅ La validación sea completa y efectiva

---

## 📋 Estructura Completa de un Componente en Storybook

### **Secciones Obligatorias (en orden):**

```
1. 📖 Descripción del Componente
2. 🎯 Features (Características)
3. 📝 Usage (Uso Básico)
4. 🔌 API (API Completa)
5. 🧩 Component Composition (Composición)
6. ♿ Accessibility (Accesibilidad)
7. ✅ Best Practices (Mejores Prácticas)
8. 📚 Examples (Ejemplos del Mundo Real)
9. 🎨 Stories (Historias/Stories)
```

---

## 1. 📖 Descripción del Componente

### **Ubicación:** Inicio de la página de docs

### **Formato:**
```markdown
## [Nombre del Componente]

[Descripción breve del componente y su propósito en 1-2 párrafos]

### Features

- **Feature 1**: Descripción breve
- **Feature 2**: Descripción breve
- **Feature 3**: Descripción breve
- ...
```

### **Ejemplo:**
```markdown
## Toast Component

Non-intrusive notification system for providing feedback to users through temporary messages. Built with accessibility in mind and fully customizable through themes.

### Features

- **Four Variants**: Success, info, warning, and error states
- **Auto-dismiss**: Configurable timeout (default 5 seconds)
- **Closable**: Optional manual dismissal with close button
- **Positioning**: Six position options (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
```

### **Información que debe contener:**
- ✅ Descripción clara del propósito
- ✅ Lista de características principales
- ✅ Casos de uso principales

---

## 2. 📝 Usage (Uso Básico)

### **Ubicación:** Después de Features

### **Formato:**
```markdown
### Usage

\`\`\`typescript
// 1. Setup requerido (si aplica)
import { ComponentName, ComponentProvider } from "@package/component";

function App() {
  return (
    <>
      <ComponentProvider /> {/* Si es requerido */}
      {/* Your app content */}
    </>
  );
}

// 2. Uso básico
import { ComponentName } from "@package/component";

function MyComponent() {
  return (
    <ComponentName
      prop1="value1"
      prop2="value2"
    />
  );
}
\`\`\`
```

### **Ejemplo:**
```markdown
### Usage

\`\`\`typescript
import { toast, FxToaster } from "@/components/ui/toast";
import { FxButton } from "@/components/ui/button";

// 1. Add FxToaster to your app root
function App() {
  return (
    <>
      <FxToaster />
      {/* Your app content */}
    </>
  );
}

// 2. Trigger toasts from anywhere
function MyComponent() {
  return (
    <FxButton onClick={() => {
      toast.success("Success!", "Your changes have been saved.");
    }}>
      Save Changes
    </FxButton>
  );
}
\`\`\`
```

### **Información que debe contener:**
- ✅ **Setup requerido** (si aplica) - Código completo
- ✅ **Imports necesarios** - Rutas exactas
- ✅ **Ejemplo básico** - Código funcional completo
- ✅ **Orden de uso** - Pasos numerados si aplica

---

## 3. 🔌 API (API Completa)

### **Ubicación:** Después de Usage

### **Formato:**
```markdown
### [Component Name] API

\`\`\`typescript
// Método 1
componentName.method1(param1: type, param2?: type, param3?: type): returnType

// Método 2
componentName.method2(param1: type, param2?: type): returnType

// Método 3
componentName.method3(param1: type): returnType

// Método especial
componentName.specialMethod(): void
\`\`\`

#### Parámetros

| Parámetro | Tipo | Requerido | Descripción | Default |
|-----------|------|-----------|-------------|---------|
| param1 | string | ✅ Sí | Descripción del parámetro | - |
| param2 | number | ❌ No | Descripción del parámetro | 0 |
| param3 | ReactNode | ❌ No | Descripción del parámetro | null |
```

### **Ejemplo:**
```markdown
### Toast API

\`\`\`typescript
// Success toast
toast.success(title: string, description?: string, action?: ReactNode, position?: string): void

// Info toast
toast.info(title: string, description?: string, action?: ReactNode, position?: string): void

// Warning toast
toast.warning(title: string, description?: string, action?: ReactNode, position?: string): void

// Error toast
toast.error(title: string, description?: string, action?: ReactNode, position?: string): void

// Custom toast
toast.custom(variant: string, title: string, description?: string, action?: ReactNode, position?: string): void

// Dismiss all toasts
toast.dismiss(): void
\`\`\`

#### Parámetros

| Parámetro | Tipo | Requerido | Descripción | Default |
|-----------|------|-----------|-------------|---------|
| title | string | ✅ Sí | Main heading text | - |
| description | string | ❌ No | Secondary description text | - |
| action | ReactNode | ❌ No | Action button or custom element | - |
| position | string | ❌ No | Toast position (top-left, top-center, etc.) | "top-right" |
```

### **Información que debe contener:**
- ✅ **Firmas de métodos** - Formato TypeScript exacto
- ✅ **Parámetros** - Tipo, requerido/opcional, descripción, default
- ✅ **Tipo de retorno** - Si aplica
- ✅ **Ejemplos de uso** - Para cada método

---

## 4. 🧩 Component Composition (Composición)

### **Ubicación:** Después de API

### **Formato:**
```markdown
### Component Composition

The [Component Name] component is built using:

- **[Dependency Name 1]**
  - Purpose: [Para qué se usa]
  - Import: `import { DependencyName1 } from "package-path"`
  - Required: ✅ Sí / ❌ No

- **[Dependency Name 2]**
  - Purpose: [Para qué se usa]
  - Import: `import { DependencyName2 } from "package-path"`
  - Required: ✅ Sí / ❌ No

- **[Icon Library]**
  - Purpose: [Para iconos específicos]
  - Icons used: [Lista de iconos]
  - Import: `import { IconName } from "icon-package"`
```

### **Ejemplo:**
```markdown
### Component Composition

The Toast component is built using:

- **FxButton**
  - Purpose: For action buttons and close button
  - Import: `import { FxButton } from "@/components/ui/button"`
  - Required: ✅ Sí

- **Lucide Icons**
  - Purpose: For variant-specific icons
  - Icons used: CheckCircle, Info, AlertTriangle, XCircle
  - Import: `import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react"`
  - Required: ✅ Sí
```

### **Información que debe contener:**
- ✅ **Dependencias** - Nombre exacto
- ✅ **Propósito** - Para qué se usa cada dependencia
- ✅ **Import path** - Ruta exacta de importación
- ✅ **Requerido** - Si es obligatorio o opcional
- ✅ **Iconos** - Lista de iconos usados (si aplica)

---

## 5. ♿ Accessibility (Accesibilidad)

### **Ubicación:** Después de Component Composition

### **Formato:**
```markdown
### Accessibility

- ✅ **[Feature 1]**: Descripción
- ✅ **[Feature 2]**: Descripción
- ✅ **[Feature 3]**: Descripción
- ✅ **Standards**: [WCAG AA, ARIA, etc.]

#### Features

**✅ [Feature Name]**: Descripción detallada

**✅ [Feature Name]**: Descripción detallada
```

### **Ejemplo:**
```markdown
### Accessibility

- ✅ **ARIA live regions**: For screen reader announcements
- ✅ **Keyboard navigation**: Dismissal with Escape key
- ✅ **Focus management**: For action buttons
- ✅ **Color contrast**: WCAG AA compliant (4.5:1 ratio)
- ✅ **Standards**: WCAG AA, ARIA support

#### Features

**✅ ARIA Live Regions**: Proper ARIA attributes for screen readers

**✅ Keyboard Dismissal**: Press Escape key to dismiss toast

**✅ Focus Management**: Action buttons are keyboard accessible
```

### **Información que debe contener:**
- ✅ **Características de accesibilidad** - Lista completa
- ✅ **Estándares cumplidos** - WCAG, ARIA, etc.
- ✅ **Detalles de implementación** - Cómo funciona cada feature

---

## 6. ✅ Best Practices (Mejores Prácticas)

### **Ubicación:** Después de Accessibility

### **Formato:**
```markdown
### Best Practices

1. **Practice Title**: Descripción detallada de la práctica y por qué es importante.

2. **Practice Title**: Descripción detallada de la práctica y por qué es importante.

3. **Practice Title**: Descripción detallada de la práctica y por qué es importante.

#### Default Values

- **Property Name**: `defaultValue` - Descripción
- **Property Name**: `defaultValue` - Descripción

#### Warnings

⚠️ **Warning Title**: Descripción de la advertencia y qué evitar.

⚠️ **Warning Title**: Descripción de la advertencia y qué evitar.
```

### **Ejemplo:**
```markdown
### Best Practices

1. **Use appropriate variants**: Match the toast variant to the context (success for confirmations, error for failures).

2. **Keep messages concise**: Users should understand the message at a glance.

3. **Include actions when needed**: Provide relevant actions (undo, view details, retry).

4. **Choose positions wisely**: Top-right is standard, but consider context (e.g., bottom for mobile).

5. **Don't overuse**: Too many toasts can overwhelm users.

6. **Auto-dismiss timing**: Default 5 seconds works for most cases, adjust for longer messages.

#### Default Values

- **autoDismiss**: `5000` (5 seconds) - Time before toast auto-dismisses
- **position**: `"top-right"` - Default position for toasts
- **closable**: `true` - Show close button by default

#### Warnings

⚠️ **Don't overuse**: Too many toasts can overwhelm users and reduce effectiveness.

⚠️ **Avoid long messages**: Keep descriptions concise for better user experience.
```

### **Información que debe contener:**
- ✅ **Prácticas recomendadas** - Lista numerada con descripciones
- ✅ **Valores por defecto** - Con descripciones
- ✅ **Advertencias** - Qué evitar y por qué

---

## 7. 📚 Examples (Ejemplos del Mundo Real)

### **Ubicación:** Después de Best Practices

### **Formato:**
```markdown
### Real-World Examples

Common toast patterns and use cases:

#### Example 1: [Use Case Name]

**Context**: [Cuándo usar este ejemplo]

**Code**:
\`\`\`typescript
// Código completo del ejemplo
\`\`\`

#### Example 2: [Use Case Name]

**Context**: [Cuándo usar este ejemplo]

**Code**:
\`\`\`typescript
// Código completo del ejemplo
\`\`\`
```

### **Ejemplo:**
```markdown
### Real-World Examples

Common toast patterns and use cases:

#### Example 1: Form Submission

**Context**: When a user submits a form successfully

**Code**:
\`\`\`typescript
<FxButton onClick={() => {
  toast.success(
    "Form Submitted",
    "Your form has been submitted successfully.",
    <FxButton variant="default" tone="success" size="sm">
      View Details
    </FxButton>
  );
}}>
  Submit Form
</FxButton>
\`\`\`

#### Example 2: File Upload

**Context**: When showing upload progress or completion

**Code**:
\`\`\`typescript
<FxButton onClick={() => {
  toast.info(
    "Upload Progress",
    "Your file is being uploaded. Please wait.",
    <FxButton variant="default" tone="info" size="sm">
      View Progress
    </FxButton>
  );
}}>
  Upload File
</FxButton>
\`\`\`
```

### **Información que debe contener:**
- ✅ **Casos de uso reales** - Situaciones comunes
- ✅ **Contexto** - Cuándo usar cada ejemplo
- ✅ **Código completo** - Listo para copiar y usar
- ✅ **Variante usada** - Qué variante del componente se usa

---

## 8. 🎨 Stories (Historias/Stories)

### **Ubicación:** Sección de Stories (separada de Docs)

### **Formato:**
Cada historia debe tener:

1. **Nombre descriptivo** - No usar solo "default"
2. **Descripción** - Qué demuestra la historia
3. **Código completo** - En la pestaña "Code"
4. **Controles** - En la pestaña "Controls"
5. **Documentación** - En la pestaña "Docs"

### **Ejemplo de Stories:**

```typescript
// ✅ CORRECTO: Historia específica
export const WithActionButton: Story = {
  name: 'With Action Button',
  description: 'Toast with an action button for user interaction',
  render: (args) => (
    <FxButton onClick={() => {
      toast.success(
        args.title,
        args.description,
        <FxButton variant="default" size="sm">
          {args.actionText}
        </FxButton>
      );
    }}>
      Show Toast
    </FxButton>
  ),
  args: {
    title: 'Update Available',
    description: 'A new version is ready to install.',
    actionText: 'Update Now',
  },
};

// ❌ INCORRECTO: Historia "default" con todo mezclado
export const Default: Story = {
  // No usar - tiene todo mezclado
};
```

### **Información que debe contener:**
- ✅ **Nombre descriptivo** - No "default"
- ✅ **Descripción clara** - Qué demuestra
- ✅ **Código completo** - En pestaña Code
- ✅ **Controles configurables** - En pestaña Controls
- ✅ **Una funcionalidad por historia** - No mezclar

---

## 9. 📊 Tabla de Props (En Controls)

### **Ubicación:** Pestaña "Controls" de Storybook

### **Formato:**
Storybook genera automáticamente la tabla desde `argTypes`, pero debe estar completa:

```typescript
export default {
  title: 'Functional/Toast',
  component: FxToast,
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: 'Visual style of the toast',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'success' },
      },
    },
    title: {
      control: 'text',
      description: 'Main heading text (required)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    // ... más props
  },
};
```

### **Información que debe contener:**
- ✅ **Nombre** - Nombre exacto de la prop
- ✅ **Descripción** - Descripción clara
- ✅ **Tipo** - Tipo de dato
- ✅ **Default** - Valor por defecto
- ✅ **Control** - Tipo de control (select, text, boolean, etc.)
- ✅ **Opciones** - Si es select, lista de opciones

---

## 📋 Checklist: Estructura Completa

### **Secciones Obligatorias:**

- [ ] ✅ **Descripción del Componente** - Con features
- [ ] ✅ **Usage** - Con setup y ejemplo básico
- [ ] ✅ **API** - Con firmas y parámetros
- [ ] ✅ **Component Composition** - Con dependencias
- [ ] ✅ **Accessibility** - Con características
- [ ] ✅ **Best Practices** - Con prácticas y valores por defecto
- [ ] ✅ **Real-World Examples** - Con casos de uso
- [ ] ✅ **Stories** - Con historias específicas (no "default")
- [ ] ✅ **Tabla de Props** - Completa en Controls

---

## 🎯 Ejemplo Completo: Estructura Ideal

```markdown
# Toast Component

## Toast Component

Non-intrusive notification system for providing feedback to users through temporary messages.

### Features

- **Four Variants**: Success, info, warning, and error states
- **Auto-dismiss**: Configurable timeout (default 5 seconds)
- **Closable**: Optional manual dismissal with close button
- **Positioning**: Six position options

### Usage

\`\`\`typescript
// 1. Add FxToaster to your app root
function App() {
  return (
    <>
      <FxToaster />
      {/* Your app content */}
    </>
  );
}

// 2. Trigger toasts
toast.success("Success!", "Your changes have been saved.");
\`\`\`

### Toast API

\`\`\`typescript
toast.success(title: string, description?: string, action?: ReactNode, position?: string): void
toast.info(title: string, description?: string, action?: ReactNode, position?: string): void
toast.warning(title: string, description?: string, action?: ReactNode, position?: string): void
toast.error(title: string, description?: string, action?: ReactNode, position?: string): void
toast.dismiss(): void
\`\`\`

### Component Composition

- **FxButton**: For action buttons and close button
- **Lucide Icons**: For variant-specific icons (CheckCircle, Info, AlertTriangle, XCircle)

### Accessibility

- ✅ ARIA live regions for screen reader announcements
- ✅ Keyboard dismissal with Escape key
- ✅ Focus management for action buttons
- ✅ WCAG AA compliant color contrast ratios

### Best Practices

1. **Use appropriate variants**: Match the toast variant to the context
2. **Keep messages concise**: Users should understand at a glance
3. **Include actions when needed**: Provide relevant actions
4. **Don't overuse**: Too many toasts can overwhelm users

#### Default Values

- **autoDismiss**: `5000` (5 seconds)
- **position**: `"top-right"`

### Real-World Examples

#### Form Submission

\`\`\`typescript
toast.success("Form Submitted", "Your form has been submitted successfully.");
\`\`\`

#### File Upload

\`\`\`typescript
toast.info("Upload Progress", "Your file is being uploaded.");
\`\`\`
```

---

## 🔍 Información Crítica por Sección

### **Para Extracción Automática:**

| Sección | Información Crítica | Por qué es Importante |
|---------|---------------------|----------------------|
| **Usage** | Setup requerido, imports | 🔴 Sin esto, el componente no funciona |
| **API** | Firmas exactas, parámetros | 🔴 Sin esto, se usa API incorrecta |
| **Component Composition** | Dependencias, imports | 🔴 Sin esto, faltan dependencias |
| **Best Practices** | Valores por defecto, advertencias | 🟡 Sin esto, puede haber malas prácticas |
| **Real-World Examples** | Casos de uso, código | 🟡 Sin esto, no hay ejemplos prácticos |
| **Stories** | Código completo, controles | 🟢 Sin esto, no hay ejemplos visuales |

---

## 📝 Formato de Código en Ejemplos

### **Requisitos:**

1. **✅ Código completo:**
   ```typescript
   // ✅ CORRECTO: Código completo
   import { Component } from "package";
   
   function App() {
     return <Component prop="value" />;
   }
   ```

2. **✅ Imports incluidos:**
   ```typescript
   // ✅ CORRECTO: Imports incluidos
   import { Component, Provider } from "package";
   import { Icon } from "icon-package";
   ```

3. **✅ Contexto completo:**
   ```typescript
   // ✅ CORRECTO: Contexto completo
   function MyComponent() {
     return (
       <div>
         <Component />
       </div>
     );
   }
   ```

4. **❌ NO fragmentos:**
   ```typescript
   // ❌ INCORRECTO: Solo fragmento
   <Component prop="value" />
   ```

---

## 🎯 Prioridades de Implementación

### **Fase 1: Crítico (Implementar primero):**
1. ✅ **Usage** - Setup y ejemplo básico
2. ✅ **API** - Firmas y parámetros
3. ✅ **Component Composition** - Dependencias

### **Fase 2: Importante (Implementar después):**
4. ✅ **Best Practices** - Prácticas y valores por defecto
5. ✅ **Real-World Examples** - Casos de uso

### **Fase 3: Útil (Implementar al final):**
6. ✅ **Accessibility** - Características de accesibilidad
7. ✅ **Stories** - Historias específicas

---

## 📋 Template para Nuevos Componentes

```markdown
# [Component Name] Component

[Descripción del componente]

### Features

- **Feature 1**: Descripción
- **Feature 2**: Descripción

### Usage

\`\`\`typescript
// Setup (si aplica)
import { Component, Provider } from "package";

function App() {
  return (
    <>
      <Provider />
      {/* Your app */}
    </>
  );
}

// Uso básico
import { Component } from "package";

<Component prop="value" />
\`\`\`

### [Component Name] API

\`\`\`typescript
component.method(param1: type, param2?: type): returnType
\`\`\`

### Component Composition

- **[Dependency]**: Purpose - Import path

### Accessibility

- ✅ Feature 1
- ✅ Feature 2

### Best Practices

1. **Practice 1**: Description
2. **Practice 2**: Description

#### Default Values

- **prop**: `value` - Description

### Real-World Examples

#### Example 1: Use Case

\`\`\`typescript
// Code
\`\`\`
```

---

## ✅ Checklist de Validación

Antes de considerar un componente "completo" en Storybook, verificar:

- [ ] ✅ Tiene descripción clara
- [ ] ✅ Tiene lista de features
- [ ] ✅ Tiene sección Usage con setup (si aplica)
- [ ] ✅ Tiene sección API con firmas exactas
- [ ] ✅ Tiene sección Component Composition con dependencias
- [ ] ✅ Tiene sección Accessibility
- [ ] ✅ Tiene sección Best Practices con valores por defecto
- [ ] ✅ Tiene sección Real-World Examples con casos de uso
- [ ] ✅ Tiene stories específicas (no solo "default")
- [ ] ✅ Tabla de props completa en Controls
- [ ] ✅ Todos los ejemplos de código son completos y funcionales

---

## 🎯 Conclusión

Esta estructura ideal garantiza que:

1. ✅ **Autorun puede extraer toda la información** necesaria
2. ✅ **La implementación es precisa** y sin errores
3. ✅ **El código generado es funcional** desde el inicio
4. ✅ **La validación es completa** y efectiva

**Próximos pasos:**
- Implementar esta estructura en cada componente del Storybook
- Validar que todos los componentes siguen esta estructura
- Actualizar componentes existentes para seguir esta estructura

---

**Última actualización:** 2025-01-10  
**Versión:** 1.0.0
