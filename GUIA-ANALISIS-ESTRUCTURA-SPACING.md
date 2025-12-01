# 📐 Guía: Análisis de Estructura y Spacing

Esta guía establece el proceso **OBLIGATORIO** para analizar la estructura (contenedores) y spacing (espaciados) de una interfaz antes de implementarla. **NUNCA implementar sin analizar primero la estructura y spacing.**

---

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"Analizar antes de estructurar"** - Identificar qué elementos van en contenedores, cuáles no, y el spacing específico entre cada elemento antes de escribir código HTML/CSS.

---

## 📋 PROCESO DE ANÁLISIS (OBLIGATORIO)

### **PASO 1: ANALIZAR ESTRUCTURA Y CONTENEDORES** 🏗️

#### **1.1: Identificar Orden de Elementos**

**Preguntas clave:**
- ¿Qué elemento va primero?
- ¿Qué elemento va después?
- ¿Cuál es la jerarquía visual de arriba hacia abajo?

**Ejemplo:**
```markdown
### Orden de elementos (de arriba hacia abajo):
1. Header (ya existe en el template)
2. SubNav (ya existe en el template)
3. Tabs de navegación
4. Barra de acciones
5. DataTable
```

---

#### **1.2: Identificar Contenedores** ⚠️ CRÍTICO

**Preguntas clave:**
- ¿Qué elementos van en contenedores?
- ¿Qué elementos NO van en contenedores?
- ¿Qué elementos van en contenedores independientes?
- ¿Hay un contenedor principal o múltiples contenedores?

**Reglas importantes:**
- ❌ **NO asumir** que todo va en un solo contenedor
- ✅ **Analizar visualmente** si cada elemento necesita su propio contenedor
- ✅ **Verificar** si el componente UBITS ya maneja su propio contenedor

**Ejemplo de análisis correcto:**
```markdown
### Análisis de contenedores:

#### Elementos SIN contenedor (van directo en el body/main):
- ✅ **SubNav:** No necesita contenedor, el componente ya lo maneja
- ✅ **Tabs:** No necesita contenedor, el componente se renderiza directo

#### Elementos CON contenedor independiente:
- ✅ **Barra de acciones:** 
  - Contenedor: `<div id="actions-bar">`
  - Razón: Necesita contenedor para agrupar input + botones y aplicar flexbox
  
- ✅ **DataTable:**
  - Contenedor: `<div id="table-container">`
  - Razón: El componente DataTable requiere un contenedor con ID específico

### Estructura HTML resultante:
```html
<!-- SubNav (sin contenedor, ya renderizado por el componente) -->
<!-- Tabs (sin contenedor, se renderiza directo) -->
<div id="actions-bar">
  <!-- Input de búsqueda y botones -->
</div>
<div id="table-container">
  <!-- DataTable se renderiza aquí -->
</div>
```
```

**Ejemplo de análisis incorrecto:**
```markdown
❌ INCORRECTO: Todo en un solo contenedor
```html
<div id="main-container">
  <!-- Tabs -->
  <!-- Barra de acciones -->
  <!-- DataTable -->
</div>
```

✅ CORRECTO: Contenedores independientes según necesidad
```html
<!-- Tabs (sin contenedor) -->
<div id="actions-bar">
  <!-- Barra de acciones -->
</div>
<div id="table-container">
  <!-- DataTable -->
</div>
```
```

---

### **PASO 2: ANALIZAR SPACING ESPECÍFICO** 📏

#### **2.1: Identificar Spacing Entre Elementos**

**Preguntas clave:**
- ¿Cuánto espacio hay entre cada elemento?
- ¿Los elementos están pegados o hay espacio?
- ¿El spacing es consistente o varía?

**Proceso:**
1. **Medir visualmente** el espacio entre elementos
2. **Mapear a tokens UBITS** más cercanos
3. **Documentar cada spacing** específicamente

**Tokens de spacing disponibles:**
```css
--ubits-spacing-none: 0px
--ubits-spacing-xs: 4px
--ubits-spacing-sm: 8px
--ubits-spacing-md: 12px
--ubits-spacing-lg: 16px
--ubits-spacing-xl: 20px
--ubits-spacing-2xl: 24px
--ubits-spacing-3xl: 28px
--ubits-spacing-4xl: 32px
--ubits-spacing-5xl: 36px
--ubits-spacing-6xl: 40px
--ubits-spacing-8: 32px
--ubits-spacing-10: 40px
--ubits-spacing-12: 48px
--ubits-spacing-16: 64px
--ubits-spacing-20: 80px
--ubits-spacing-24: 96px
```

**Ejemplo de análisis:**
```markdown
### Spacing entre elementos:

1. **Entre SubNav y Tabs:**
   - Visual: Pegados (0px)
   - Token: `--ubits-spacing-none`
   - CSS: `margin-top: 0` o sin margin

2. **Entre Tabs y Barra de acciones:**
   - Visual: ~16px de espacio
   - Token: `--ubits-spacing-lg`
   - CSS: `margin-top: var(--ubits-spacing-lg)`

3. **Entre Barra de acciones y DataTable:**
   - Visual: ~16px de espacio
   - Token: `--ubits-spacing-lg`
   - CSS: `margin-top: var(--ubits-spacing-lg)`
```

---

#### **2.2: Identificar Spacing Dentro de Elementos**

**Preguntas clave:**
- ¿Cuánto padding tiene cada contenedor?
- ¿Cuánto gap hay entre elementos dentro de un contenedor?
- ¿Hay spacing interno en los componentes?

**Ejemplo de análisis:**
```markdown
### Spacing dentro de elementos:

1. **Contenedor de Barra de acciones:**
   - Padding: Ninguno (0px)
   - Token padding: `--ubits-spacing-none`
   - Gap entre elementos (input + botones): ~8px
   - Token gap: `--ubits-spacing-sm`
   - CSS: 
     ```css
     #actions-bar {
       padding: var(--ubits-spacing-none);
       display: flex;
       gap: var(--ubits-spacing-sm);
     }
     ```

2. **Contenedor de DataTable:**
   - Padding: Ninguno (0px)
   - Token padding: `--ubits-spacing-none`
   - CSS:
     ```css
     #table-container {
       padding: var(--ubits-spacing-none);
     }
     ```
```

---

#### **2.3: Crear Mapa Completo de Spacing**

**Formato de documentación:**
```markdown
## 📐 Mapa Completo de Spacing

### Spacing entre elementos principales:
| Entre | Espacio visual | Token UBITS | CSS |
|-------|----------------|-------------|-----|
| SubNav → Tabs | 0px (pegados) | `--ubits-spacing-none` | `margin-top: 0` |
| Tabs → Barra acciones | 16px | `--ubits-spacing-lg` | `margin-top: var(--ubits-spacing-lg)` |
| Barra acciones → DataTable | 16px | `--ubits-spacing-lg` | `margin-top: var(--ubits-spacing-lg)` |

### Spacing dentro de contenedores:
| Contenedor | Padding | Gap interno | Tokens |
|------------|---------|-------------|--------|
| `#actions-bar` | 0px | 8px | `padding: var(--ubits-spacing-none)`, `gap: var(--ubits-spacing-sm)` |
| `#table-container` | 0px | N/A | `padding: var(--ubits-spacing-none)` |

### Spacing dentro de componentes:
| Componente | Spacing interno | Notas |
|------------|-----------------|-------|
| Tabs | Maneja su propio spacing | No aplicar spacing adicional |
| DataTable | Maneja su propio spacing | No aplicar spacing adicional |
```

---

### **PASO 3: PRESENTAR ANÁLISIS AL USUARIO** 👤

**Formato de presentación:**
```markdown
## 📋 Análisis de Estructura y Spacing

### Orden de elementos:
1. SubNav (ya existe)
2. Tabs
3. Barra de acciones
4. DataTable

### Contenedores:
- ❌ **Tabs:** NO van en contenedor (se renderizan directo)
- ✅ **Barra de acciones:** SÍ va en contenedor `<div id="actions-bar">`
- ✅ **DataTable:** SÍ va en contenedor `<div id="table-container">`

### Spacing entre elementos:
- SubNav → Tabs: `--ubits-spacing-none` (0px, pegados)
- Tabs → Barra acciones: `--ubits-spacing-lg` (16px)
- Barra acciones → DataTable: `--ubits-spacing-lg` (16px)

### Spacing dentro de contenedores:
- `#actions-bar`: padding `--ubits-spacing-none`, gap `--ubits-spacing-sm`
- `#table-container`: padding `--ubits-spacing-none`

### ¿Este análisis es correcto?
```

---

## 🚨 REGLAS CRÍTICAS

### **1. NUNCA Asumir Contenedores**
- ❌ NO asumir que todo va en un solo contenedor
- ❌ NO poner elementos en contenedores innecesarios
- ✅ SIEMPRE analizar visualmente si cada elemento necesita contenedor
- ✅ SIEMPRE verificar si el componente UBITS ya maneja su contenedor

### **2. SIEMPRE Analizar Spacing Específicamente**
- ❌ NO usar spacing genérico (`--ubits-spacing-md` para todo)
- ❌ NO adivinar el spacing
- ✅ SIEMPRE medir visualmente el espacio
- ✅ SIEMPRE mapear a tokens UBITS específicos
- ✅ SIEMPRE documentar cada spacing

### **3. SIEMPRE Documentar Estructura**
- ❌ NO implementar sin documentar estructura
- ✅ SIEMPRE crear mapa de contenedores
- ✅ SIEMPRE crear mapa de spacing
- ✅ SIEMPRE presentar análisis al usuario

### **4. SIEMPRE Verificar Componentes UBITS**
- ❌ NO crear contenedores para componentes que ya los manejan
- ✅ SIEMPRE verificar documentación del componente
- ✅ SIEMPRE verificar si el componente requiere contenedor con ID específico

---

## 🎯 EJEMPLOS COMPLETOS

### **Ejemplo 1: Interfaz con Tabs y DataTable**

**Análisis de estructura:**
```markdown
### Estructura identificada:
1. SubNav (sin contenedor, ya renderizado)
2. Tabs (sin contenedor, se renderiza directo)
3. DataTable (en contenedor con ID específico)

### Contenedores:
- ❌ Tabs: NO necesita contenedor
  - Razón: `window.createTabs()` se renderiza directo en el elemento con ID
- ✅ DataTable: SÍ necesita contenedor
  - Contenedor: `<div id="encuestas-table-container">`
  - Razón: `window.createDataTable()` requiere contenedor con ID específico
```

**Análisis de spacing:**
```markdown
### Spacing identificado:
- SubNav → Tabs: `--ubits-spacing-none` (0px, pegados)
- Tabs → DataTable: `--ubits-spacing-lg` (16px)
```

**Implementación:**
```html
<!-- SubNav ya renderizado -->
<!-- Tabs se renderiza directo -->
<div id="encuestas-tabs-container"></div>

<!-- Spacing entre Tabs y DataTable -->
<div id="encuestas-table-container" style="margin-top: var(--ubits-spacing-lg);"></div>
```

---

### **Ejemplo 2: Interfaz con Barra de Acciones y DataTable**

**Análisis de estructura:**
```markdown
### Estructura identificada:
1. Tabs (sin contenedor)
2. Barra de acciones (en contenedor)
3. DataTable (en contenedor)

### Contenedores:
- ❌ Tabs: NO necesita contenedor
- ✅ Barra de acciones: SÍ necesita contenedor
  - Contenedor: `<div id="actions-bar">`
  - Razón: Agrupar input + botones, aplicar flexbox
- ✅ DataTable: SÍ necesita contenedor
  - Contenedor: `<div id="table-container">`
```

**Análisis de spacing:**
```markdown
### Spacing identificado:
- Tabs → Barra acciones: `--ubits-spacing-lg` (16px)
- Barra acciones → DataTable: `--ubits-spacing-lg` (16px)
- Dentro de barra acciones (gap): `--ubits-spacing-sm` (8px)
```

**Implementación:**
```html
<!-- Tabs -->
<div id="tabs-container"></div>

<!-- Barra de acciones con spacing y gap -->
<div id="actions-bar" style="margin-top: var(--ubits-spacing-lg); display: flex; gap: var(--ubits-spacing-sm);">
  <ubits-input type="search"></ubits-input>
  <ubits-button variant="ghost"></ubits-button>
  <ubits-button variant="primary"></ubits-button>
</div>

<!-- DataTable con spacing -->
<div id="table-container" style="margin-top: var(--ubits-spacing-lg);"></div>
```

---

## 🔗 Referencias

- **Guía de implementación:** `GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Tokens de spacing:** `vendor/ubits/packages/tokens/tokens.json` (sección "spacing")
- **Catálogo de componentes:** `CATALOGO-COMPONENTES-UBITS.md`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

