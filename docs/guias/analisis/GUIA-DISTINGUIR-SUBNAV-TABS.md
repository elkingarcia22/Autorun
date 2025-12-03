# 🔍 Guía: Cómo Distinguir SubNav de Tabs

## ⚠️ PROBLEMA COMÚN

**Error frecuente:** Confundir los tabs del SubNav (que ya existen en el template) con el componente Tabs adicional (que se implementa con `window.createTabs()`).

---

## 🎯 DIFERENCIAS CLAVE

### **SubNav** (`window.createSubNav()`)

**Características visuales:**
- ✅ Barra horizontal debajo del header principal
- ✅ Tabs/pestañas para navegar entre productos de un módulo
- ✅ Ubicación: Entre el header y el contenido principal
- ✅ Altura: ~40px (barra delgada)
- ✅ Fondo: `var(--ubits-bg-1)` (fondo claro)
- ✅ Clase CSS: `.ubits-sub-nav`

**Ejemplos en la imagen:**
- Barra horizontal con tabs "Encuestas" y "Datos demográficos" debajo del header
- Es la navegación secundaria del módulo

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
- ✅ Ubicación: Dentro de `.content-area`, después del SubNav
- ✅ Altura: Variable (más grande que SubNav)
- ✅ Fondo: Transparente o con fondo del contenido
- ✅ Clase CSS: `.ubits-tabs`

**Ejemplos en la imagen:**
- Tabs adicionales dentro del contenido para cambiar entre vistas
- NO es la barra debajo del header (esa es SubNav)

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
1. ¿Hay una barra horizontal con tabs debajo del header?
2. ¿Es la navegación secundaria del módulo?
3. ¿Muestra opciones como "Encuestas", "Datos demográficos", etc.?

**Si la respuesta es SÍ:**
- ✅ Es SubNav
- ✅ Ya existe en el template
- ✅ NO se implementa
- ✅ Documentar: "SubNav: Ya existe (tabs: [X, Y])"

---

### **PASO 2: Identificar Tabs Adicionales**

**Preguntas clave:**
1. ¿Hay tabs adicionales dentro del contenido principal?
2. ¿Son tabs para cambiar entre vistas dentro de la misma sección?
3. ¿NO son los tabs del SubNav?

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

### **Ejemplo 1: Solo SubNav (NO hay Tabs adicionales)**

```
┌─────────────────────────────────────┐
│ Header (SODIMAC logo)               │
├─────────────────────────────────────┤
│ SubNav: [Encuestas] [Datos demog.] │ ← SubNav (ya existe)
├─────────────────────────────────────┤
│ Contenido principal                 │
│ (DataTable, etc.)                   │
└─────────────────────────────────────┘
```

**Análisis correcto:**
```markdown
### Componentes identificados:
1. SubNav - Ya existe (tabs: "Encuestas", "Datos demográficos")
2. Tabs - NO (solo SubNav existe)
3. DataTable - Implementar
```

---

### **Ejemplo 2: SubNav + Tabs Adicionales**

```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ SubNav: [Producto 1] [Producto 2]   │ ← SubNav (ya existe)
├─────────────────────────────────────┤
│ Tabs: [Vista Lista] [Vista Grid]   │ ← Tabs (implementar)
├─────────────────────────────────────┤
│ Contenido principal                 │
└─────────────────────────────────────┘
```

**Análisis correcto:**
```markdown
### Componentes identificados:
1. SubNav - Ya existe (tabs: "Producto 1", "Producto 2")
2. Tabs - Implementar (tabs: "Vista Lista", "Vista Grid")
3. DataTable - Implementar
```

---

## ✅ CHECKLIST DE ANÁLISIS

Al analizar una imagen:

- [ ] **Identificar SubNav:**
  - [ ] ¿Hay barra horizontal con tabs debajo del header?
  - [ ] ¿Es navegación secundaria del módulo?
  - [ ] ¿Ya existe en el template? → Documentar: "SubNav: Ya existe"
  - [ ] ¿NO se implementa? → Correcto

- [ ] **Identificar Tabs adicionales:**
  - [ ] ¿Hay tabs adicionales dentro del contenido?
  - [ ] ¿NO son los tabs del SubNav?
  - [ ] ¿Se implementan con `window.createTabs()`? → Documentar: "Tabs: Implementar"
  - [ ] ¿NO hay tabs adicionales? → Documentar: "Tabs: NO"

- [ ] **Verificar que NO se confundan:**
  - [ ] SubNav ≠ Tabs
  - [ ] SubNav ya existe, Tabs se implementa
  - [ ] Si solo hay SubNav, NO implementar Tabs

---

## 🚨 ERRORES COMUNES A EVITAR

### **Error 1: Implementar Tabs cuando solo existe SubNav**

❌ **INCORRECTO:**
```markdown
### Componentes identificados:
1. SubNav - Ya existe
2. Tabs - Implementar (tabs: "Encuestas", "Datos demográficos") ← ❌ Estos son del SubNav
```

✅ **CORRECTO:**
```markdown
### Componentes identificados:
1. SubNav - Ya existe (tabs: "Encuestas", "Datos demográficos")
2. Tabs - NO (solo SubNav existe)
```

### **Error 2: No distinguir visualmente**

❌ **INCORRECTO:**
- Ver tabs en la imagen → Asumir que son Tabs adicionales
- No verificar si son del SubNav

✅ **CORRECTO:**
- Verificar ubicación: ¿Debajo del header? → SubNav
- Verificar ubicación: ¿Dentro del contenido? → Tabs adicionales
- Verificar si ya existe: ¿Está en el template? → SubNav

---

## 📚 Referencias

- **SubNav:** `CATALOGO-COMPONENTES-UBITS.md` - Sección 2
- **Tabs:** `CATALOGO-COMPONENTES-UBITS.md` - Sección 3.1
- **Análisis SubNav:** `docs/ANALISIS-SUBNAV-COMPLETO.md`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

