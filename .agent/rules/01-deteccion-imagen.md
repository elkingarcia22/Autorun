# 🔍 Detección de Imágenes - Triggers y Proceso

## 🚨 Auto-Detección de Triggers

El sistema detecta automáticamente cuando hay imágenes o triggers de implementación en el mensaje del usuario.

### Triggers Detectados Automáticamente:

- Palabras clave: `implementar`, `crear`, `agregar`, `añadir`, etc.
- Imágenes adjuntas o mencionadas
- Referencias a diseños o mockups

## ⚠️ Proceso Cuando se Detecta Imagen

Cuando `handleUserMessage()` detecta un trigger:

### 1. Bloqueo Automático

```typescript
const result = await handleUserMessage(userMessage);

if (result.blocked) {
  // ❌ NO continuar hasta completar análisis
  console.error(`❌ BLOQUEADO: ${result.reason}`);
}
```

### 2. Análisis Obligatorio

**ANTES de implementar, DEBES:**

1. ✅ Identificar template existente
2. ✅ Analizar imagen detalladamente:
   - Componentes UBITS necesarios
   - Estructura y layout
   - Spacing y tokens
   - Iconos con variaciones
   - Funcionalidades requeridas

### 3. Crear Plan de Implementación

```markdown
## Plan de Implementación

### Componentes Detectados:
- [ ] Componente 1 (ID de Storybook: xxx)
- [ ] Componente 2 (ID de Storybook: xxx)

### Tareas:
1. [ ] Tarea específica 1
2. [ ] Tarea específica 2

### Validación:
- [ ] Lint pasa
- [ ] Layout correcto
- [ ] Funcionalidad completa
```

### 4. Esperar Aprobación

**⚠️ CRÍTICO:** NO implementar hasta que el usuario apruebe el plan.

## 🔗 Ver También

- Inicio: [00-inicio.md](00-inicio.md)
- Componentes: [02-componentes.md](02-componentes.md)
- Implementación: [03-implementacion.md](03-implementacion.md)
