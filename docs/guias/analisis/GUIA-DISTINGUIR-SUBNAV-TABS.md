# 🔍 Guía: Cómo Distinguir SubNav de Tabs

## ⚠️ PROBLEMA COMÚN

**Error frecuente:** Confundir los tabs del SubNav (que muestran el NOMBRE DEL PRODUCTO/MÓDULO) con el componente Tabs adicional (que muestra VISTAS DENTRO DEL PRODUCTO y se implementa con `window.createTabs()`).

---

## 🎯 DIFERENCIAS CLAVE

### **SubNav** (`window.createSubNav()`)

**Características visuales:**
- ✅ Barra horizontal debajo del header principal
- ✅ **Muestra el NOMBRE DEL PRODUCTO/MÓDULO** (ej: "Encuestas", "Aprendizaje", "Desempeño")
- ✅ **Solo UN tab** si hay un solo producto, o **varios tabs** si hay varios productos del módulo
- ✅ Ubicación: Entre el header y el contenido principal
- ✅ Altura: ~40px (barra delgada)
- ✅ Fondo: `var(--ubits-bg-1)` (fondo claro)
- ✅ Clase CSS: `.ubits-sub-nav`

**Ejemplos en la imagen:**
- Barra horizontal con tab "Encuestas" (nombre del producto) debajo del header
- Es la navegación secundaria del módulo que muestra PRODUCTOS, no vistas

**¿Se implementa?**
- ❌ **NO** - Ya viene en el template
- ✅ Se crea automáticamente por `ContentManager` cuando se activa un módulo
- ✅ Ya está configurado en `products.js` para cada módulo

**Cómo verificar si existe:**
```javascript
// SubNav ya existe si el módulo está activo
const subNav = document.querySelector('.ubits-sub-nav');
if (subNav) {
  console.log('✅ SubNav ya existe, NO implementar');
}
```

---

### **Tabs** (`window.createTabs()`)

**Características visuales:**
- ✅ Tabs/pestañas horizontales dentro del contenido principal
- ✅ **Muestra VISTAS DENTRO DEL PRODUCTO** (ej: "Encuestas", "Datos demográficos" dentro del producto "Encuestas")
- ✅ **Varios tabs** para cambiar entre diferentes vistas/secciones del mismo producto
- ✅ Ubicación: Dentro de `.content-area`, después del SubNav
- ✅ Altura: Variable (más grande que SubNav)
- ✅ Fondo: Transparente o con fondo del contenido
- ✅ Clase CSS: `.ubits-tabs`

**Ejemplos en la imagen:**
- Tabs "Encuestas" y "Datos demográficos" dentro del contenido (vistas dentro del producto "Encuestas")
- NO es la barra debajo del header (esa es SubNav que muestra el nombre del producto)

**¿Se implementa?**
- ✅ **SÍ** - Se implementa con `window.createTabs()`
- ✅ Se agrega dentro del contenido principal
- ✅ Requiere contenedor con ID específico

**Cómo identificar si se necesita:**
```javascript
// Si hay tabs adicionales dentro del contenido (no en SubNav)
// Ejemplo: Tabs para cambiar entre "Vista lista" y "Vista grid"
window.createTabs({
  tabs: [
    { id: 'vista-lista', label: 'Lista', icon: 'list' },
    { id: 'vista-grid', label: 'Grid', icon: 'th-large' }
  ]
}, 'tabs-container');
```

---

## 📋 PROCESO DE ANÁLISIS CORRECTO

### **PASO 1: Identificar SubNav**

**Preguntas clave:**
1. ¿Hay una barra horizontal con tab(s) debajo del header?
2. ¿Muestra el **NOMBRE DEL PRODUCTO/MÓDULO** (ej: "Encuestas", "Aprendizaje")?
3. ¿Es la navegación secundaria del módulo que muestra PRODUCTOS, no vistas?

**⚠️ CRÍTICO:** SubNav muestra PRODUCTOS, no vistas dentro del producto.

**Si la respuesta es SÍ:**
- ✅ Es SubNav
- ✅ Ya existe en el template
- ✅ NO se implementa
- ✅ Documentar: "SubNav: Ya existe (producto: [X])" o "SubNav: Ya existe (productos: [X, Y])"

---

### **PASO 2: Identificar Tabs Adicionales**

**Preguntas clave:**
1. ¿Hay tabs adicionales dentro del contenido principal (después del SubNav)?
2. ¿Son tabs para cambiar entre **VISTAS DENTRO DEL PRODUCTO** (ej: "Encuestas", "Datos demográficos" dentro del producto "Encuestas")?
3. ¿NO son el tab del SubNav (que muestra el nombre del producto)?

**⚠️ CRÍTICO:** Tabs muestra VISTAS dentro del producto, no el nombre del producto.

**Si la respuesta es SÍ:**
- ✅ Es componente Tabs
- ✅ Se implementa con `window.createTabs()`
- ✅ Requiere contenedor con ID
- ✅ Documentar: "Tabs: Implementar (tabs: [X, Y])"

**Si la respuesta es NO:**
- ✅ NO hay tabs adicionales
- ✅ Solo existe SubNav
- ✅ Documentar: "Tabs: NO (solo SubNav existe)"

---

## 🎯 EJEMPLOS VISUALES

### **Ejemplo 1: SubNav + Tabs (CASO REAL - Home de Encuestas)**

```
┌─────────────────────────────────────┐
│ Header (SODIMAC logo)               │
├─────────────────────────────────────┤
│ SubNav: [Encuestas]                 │ ← SubNav (ya existe, muestra PRODUCTO)
├─────────────────────────────────────┤
│ Tabs: [Encuestas] [Datos demog.]    │ ← Tabs (implementar, muestra VISTAS)
├─────────────────────────────────────┤
│ Contenido principal                 │
│ (DataTable, etc.)                   │
└─────────────────────────────────────┘
```

**Análisis correcto:**
```markdown
### Componentes identificados:
1. SubNav - Ya existe (producto: "Encuestas")
2. Tabs - Implementar (tabs: "Encuestas", "Datos demográficos")
3. DataTable - Implementar
```

**⚠️ CRÍTICO:** 
- SubNav muestra el **NOMBRE DEL PRODUCTO** ("Encuestas")
- Tabs muestra las **VISTAS DENTRO DEL PRODUCTO** ("Encuestas", "Datos demográficos")

---

### **Ejemplo 2: Solo SubNav (NO hay Tabs adicionales)**

```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ SubNav: [Producto 1] [Producto 2]   │ ← SubNav (ya existe, muestra PRODUCTOS)
├─────────────────────────────────────┤
│ Contenido principal                 │
│ (DataTable, etc.)                   │
└─────────────────────────────────────┘
```

**Análisis correcto:**
```markdown
### Componentes identificados:
1. SubNav - Ya existe (productos: "Producto 1", "Producto 2")
2. Tabs - NO (solo SubNav existe, no hay vistas dentro del producto)
3. DataTable - Implementar
```

---

## ✅ CHECKLIST DE ANÁLISIS

Al analizar una imagen:

- [ ] **Identificar SubNav:**
  - [ ] ¿Hay barra horizontal con tab(s) debajo del header?
  - [ ] ¿Muestra el **NOMBRE DEL PRODUCTO/MÓDULO** (no vistas)?
  - [ ] ¿Es navegación secundaria del módulo que muestra PRODUCTOS?
  - [ ] ¿Ya existe en el template? → Documentar: "SubNav: Ya existe (producto: [X])"
  - [ ] ¿NO se implementa? → Correcto

- [ ] **Identificar Tabs adicionales:**
  - [ ] ¿Hay tabs adicionales dentro del contenido (después del SubNav)?
  - [ ] ¿Muestran **VISTAS DENTRO DEL PRODUCTO** (no el nombre del producto)?
  - [ ] ¿NO son el tab del SubNav?
  - [ ] ¿Se implementan con `window.createTabs()`? → Documentar: "Tabs: Implementar (tabs: [X, Y])"
  - [ ] ¿NO hay tabs adicionales? → Documentar: "Tabs: NO (solo SubNav existe)"

- [ ] **Verificar que NO se confundan:**
  - [ ] SubNav muestra PRODUCTOS, Tabs muestra VISTAS
  - [ ] SubNav ≠ Tabs
  - [ ] SubNav ya existe, Tabs se implementa
  - [ ] Si solo hay SubNav (sin vistas), NO implementar Tabs

---

## 🚨 ERRORES COMUNES A EVITAR

### **Error 1: Confundir SubNav con Tabs (ERROR COMÚN)**

❌ **INCORRECTO:**
```markdown
### Componentes identificados:
1. SubNav - Ya existe (tabs: "Encuestas", "Datos demográficos") ← ❌ ERROR: SubNav solo muestra el PRODUCTO "Encuestas"
2. Tabs - NO (solo SubNav existe) ← ❌ ERROR: Los tabs "Encuestas" y "Datos demográficos" son VISTAS, no el SubNav
```

✅ **CORRECTO:**
```markdown
### Componentes identificados:
1. SubNav - Ya existe (producto: "Encuestas") ← ✅ SubNav muestra el NOMBRE DEL PRODUCTO
2. Tabs - Implementar (tabs: "Encuestas", "Datos demográficos") ← ✅ Tabs muestra las VISTAS dentro del producto
```

**⚠️ CRÍTICO:** 
- SubNav muestra el **NOMBRE DEL PRODUCTO** ("Encuestas")
- Tabs muestra las **VISTAS DENTRO DEL PRODUCTO** ("Encuestas", "Datos demográficos")

### **Error 2: No distinguir entre PRODUCTO y VISTAS**

❌ **INCORRECTO:**
- Ver tabs "Encuestas" y "Datos demográficos" → Asumir que son del SubNav
- No verificar si muestran el PRODUCTO o las VISTAS dentro del producto

✅ **CORRECTO:**
- **SubNav:** ¿Muestra el NOMBRE DEL PRODUCTO? (ej: "Encuestas") → SubNav
- **Tabs:** ¿Muestra VISTAS DENTRO DEL PRODUCTO? (ej: "Encuestas", "Datos demográficos") → Tabs
- Verificar ubicación: ¿Debajo del header? → SubNav (producto)
- Verificar ubicación: ¿Dentro del contenido? → Tabs (vistas)
- Verificar si ya existe: ¿Está en el template? → SubNav (producto)

---

## 📚 Referencias

- **SubNav:** `CATALOGO-COMPONENTES-UBITS.md` - Sección 2
- **Tabs:** `CATALOGO-COMPONENTES-UBITS.md` - Sección 3.1
- **Análisis SubNav:** `docs/ANALISIS-SUBNAV-COMPLETO.md`

---

---

## 🎯 RESUMEN CRÍTICO

**Diferencia fundamental:**
- **SubNav:** Muestra el **NOMBRE DEL PRODUCTO/MÓDULO** (ej: "Encuestas")
- **Tabs:** Muestra las **VISTAS DENTRO DEL PRODUCTO** (ej: "Encuestas", "Datos demográficos")

**En el caso del home de encuestas:**
- **SubNav (arriba):** Tab "Encuestas" (nombre del producto) → Ya existe, NO implementar
- **Tabs (abajo):** Tabs "Encuestas" y "Datos demográficos" (vistas dentro del producto) → Implementar con `window.createTabs()`

**Última actualización:** Diciembre 2024  
**Versión:** 2.0.0 (corregido error de confusión SubNav vs Tabs)

