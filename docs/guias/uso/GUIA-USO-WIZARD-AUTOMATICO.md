# 🤖 Guía: Uso del Wizard en Modo Automático

Esta guía explica cómo usar el wizard de Autorun en modo automático, permitiendo que tanto el usuario como el asistente de Cursor puedan interactuar con él.

---

## 🎯 Dos Modos de Uso

### **Modo 1: Interactivo (Usuario)** 👤

El usuario puede ejecutar el wizard normalmente y responder las preguntas manualmente:

```bash
npm run init
```

El wizard preguntará:
1. ¿En qué template quieres trabajar? (1-2)
2. ¿En qué producto quieres trabajar? (1-16)
3. ¿Qué add-ons quieres instalar?

---

### **Modo 2: Automático (Asistente Cursor)** 🤖

El asistente de Cursor puede ejecutar el wizard con respuestas automáticas usando dos métodos:

#### **Método A: Variable de Entorno `AUTORUN_ANSWERS`**

```bash
AUTORUN_ANSWERS="1,16" npm run init
```

**Formato:** Respuestas separadas por coma o nueva línea
- `"1,16"` → Template 1 (Administrador), Producto 16 (Encuestas)
- `"1\n16"` → También funciona con saltos de línea

#### **Método B: Argumento `--answers`**

```bash
npm run init -- --answers="1,16"
```

**Formato:** Igual que la variable de entorno

#### **Método C: Variables de Entorno Específicas** (Recomendado)

```bash
AUTORUN_TEMPLATE=administrador AUTORUN_MODULE=encuestas npm run init
```

**Variables disponibles:**
- `AUTORUN_TEMPLATE`: `administrador` o `colaborador`
- `AUTORUN_MODULE`: ID del módulo (ej: `encuestas`, `desempeno`, `aprendizaje`)
- `AUTORUN_PRODUCT`: ID del producto (opcional, para módulos con productos)
- `AUTORUN_SKIP_GITHUB`: `true` para omitir configuración de GitHub
- `AUTORUN_GITHUB_URL`: URL del repositorio GitHub (si se quiere configurar automáticamente)

---

## 📋 Ejemplos de Uso

### **Ejemplo 1: Encuestas (Módulo solo)**

```bash
# Método 1: Variable de entorno específica (RECOMENDADO)
AUTORUN_TEMPLATE=administrador AUTORUN_MODULE=encuestas npm run init

# Método 2: Respuestas automáticas
AUTORUN_ANSWERS="1,16" npm run init

# Método 3: Argumento
npm run init -- --answers="1,16"
```

### **Ejemplo 2: Desempeño - Evaluaciones 360**

```bash
# Método 1: Variable de entorno específica (RECOMENDADO)
AUTORUN_TEMPLATE=administrador AUTORUN_MODULE=desempeno AUTORUN_PRODUCT=evaluations npm run init

# Método 2: Respuestas automáticas (necesitas saber el número de opción)
AUTORUN_ANSWERS="1,12" npm run init
```

### **Ejemplo 3: Con configuración de GitHub**

```bash
AUTORUN_TEMPLATE=administrador \
AUTORUN_MODULE=encuestas \
AUTORUN_GITHUB_URL="https://github.com/usuario/repo" \
npm run init
```

---

## 🔄 Comportamiento del Wizard

### **Cuando hay respuestas automáticas:**

1. ✅ El wizard detecta automáticamente el modo automático
2. ✅ Muestra mensaje: `🤖 Modo automático activado (respuestas del asistente)`
3. ✅ Usa las respuestas automáticas sin esperar input del usuario
4. ✅ Omite configuración de GitHub (a menos que se proporcione `AUTORUN_GITHUB_URL`)
5. ✅ Continúa con el proceso normal de generación de templates

### **Cuando NO hay respuestas automáticas:**

1. ✅ El wizard funciona en modo interactivo normal
2. ✅ Espera input del usuario para cada pregunta
3. ✅ Permite al usuario seleccionar opciones manualmente

---

## 🛠️ Para el Asistente de Cursor

Cuando el usuario solicita ejecutar el wizard, el asistente puede:

### **Opción 1: Usar variables de entorno específicas** (Más confiable)

```bash
AUTORUN_TEMPLATE=administrador AUTORUN_MODULE=encuestas npm run init
```

**Ventajas:**
- ✅ No depende del orden de las opciones
- ✅ Más explícito y claro
- ✅ Funciona incluso si cambian las opciones del wizard

### **Opción 2: Usar respuestas automáticas** (Más rápido)

```bash
AUTORUN_ANSWERS="1,16" npm run init
```

**Ventajas:**
- ✅ Más corto
- ✅ Funciona igual que el usuario escribiendo manualmente

**Desventajas:**
- ⚠️ Depende del orden de las opciones
- ⚠️ Puede romperse si cambian las opciones

---

## 📝 Mapeo de Opciones Comunes

### **Templates:**
- `1` = `administrador`
- `2` = `colaborador`

### **Módulos (Administrador):**
- `1` = Inicio
- `2-7` = Empresa (Gestión usuarios, Organigrama, etc.)
- `8-11` = Aprendizaje (LMS, Plan formación, etc.)
- `12-14` = Desempeño (Evaluaciones, Objetivos, Matriz)
- `15` = Diagnóstico
- `16` = Encuestas

### **Módulos (Colaborador):**
- `1-4` = Aprendizaje
- `5-8` = Desempeño
- `9-10` = Planes

---

## ⚠️ Notas Importantes

1. **El wizard cierra readline automáticamente** cuando termina, por lo que no intenta preguntar más después de completar
2. **GitHub se omite automáticamente** en modo automático para evitar errores de readline cerrado
3. **Las respuestas automáticas se consumen en orden** - la primera respuesta va a la primera pregunta, la segunda a la segunda, etc.
4. **Si una respuesta automática es inválida**, el wizard usa el valor por defecto (si existe) o la primera opción

---

## 🔗 Referencias

- **Código del wizard:** `packages/autorun-core/src/wizard/InitializationWizard.ts`
- **Código del prompt:** `packages/autorun-core/src/wizard/InteractivePrompt.ts`
- **CLI:** `packages/autorun-core/src/cli/autorun-init.ts`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

