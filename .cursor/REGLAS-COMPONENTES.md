# 🎯 Reglas de Componentes UBITS

> **⚠️ CRÍTICO:** Estas reglas deben seguirse al trabajar con componentes UBITS.

---

## 1. **USAR SOLO COMPONENTES UBITS EXISTENTES**

- ❌ NO crear nuevos componentes
- ❌ NO duplicar componentes
- ✅ Usar componentes que ya existen: `window.createSidebar()`, `window.createSubNav()`, `window.createTabBar()`, `window.createTabs()`, `window.createDataTable()`, etc.
- ✅ Los componentes están en: `vendor/ubits/packages/components/` (portable) o `Desktop/UBITS/packages/components/` (legacy)

---

## 1.1. **ANÁLISIS Y FORMATO CORRECTO DE ICONOS** ⚠️ CRÍTICO

### ANÁLISIS DE ICONOS DESDE IMÁGENES:
- ❌ **NUNCA asumir el primer resultado** de FontAwesome
- ✅ **SIEMPRE verificar variaciones:** `chart-pie`, `chart-pie-simple`, `pie-chart`
- ✅ **SIEMPRE verificar si es "simple":** Si la imagen muestra un icono minimalista, usar `-simple`
- ✅ **SIEMPRE comparar visualmente** con la descripción de la imagen
- ✅ **SIEMPRE documentar** el icono completo con nombre y estilo
- **Consultar:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` para el proceso completo

### FORMATO CORRECTO EN `window.createTabs()`:
- ❌ **NUNCA usar:** `icon: 'far fa-home'` o `icon: 'fas fa-user'` o `icon: 'fa-chart-pie-simple'`
- ❌ **NUNCA omitir sufijos:** Si es `chart-pie-simple`, usar `chart-pie-simple` (no `chart-pie`)
- ✅ **SIEMPRE usar:** `icon: 'home'` o `icon: 'chart-pie-simple'` (solo el nombre, sin prefijos `fa-`)
- El componente automáticamente agrega `fa-` y el estilo (`far` para inactivo, `fas` para activo)
- Ejemplo correcto:
  ```javascript
  window.createTabs({
    tabs: [
      { id: 'tab1', label: 'Tab 1', icon: 'list-ul' },  // ✅ CORRECTO
      { id: 'tab2', label: 'Tab 2', icon: 'chart-pie-simple' }   // ✅ CORRECTO (con -simple)
    ]
  }, 'container-id')
  ```

---

## 2. **USAR TOKENS UBITS CORRECTAMENTE**

- ✅ Light mode: `--ubits-accent-brand-static` (siempre azul #0c5bef)
- ✅ Dark mode: `--modifiers-normal-color-dark-accent-blue` (#8c91fa)
- ✅ Los modifiers tienen versión light y dark
- ✅ Static = mismo color en light y dark
- ✅ Normal = diferente color en light y dark
- ✅ NO sobrescribir tokens con `!important` - dejar que el componente use sus propios tokens

---

## 3. **RUTAS RELATIVAS (PREFERIDO) O ABSOLUTAS file:// (LEGACY)**

- ✅ **PREFERIDO:** Usar rutas relativas desde `prototypes/` hacia `vendor/ubits/packages/`
- ✅ Ejemplo relativo: `../vendor/ubits/packages/tokens/dist/tokens.css`
- ✅ **LEGACY:** Si no existe `vendor/ubits/`, usar rutas absolutas `file://` hacia `Desktop/UBITS/`
- ✅ El template carga automáticamente `tokens.css` y `figma-tokens.css`
- ✅ El template carga automáticamente `data-table.umd.js` para el componente DataTable

---

## 4. **UBITS EN VENDOR (PORTABLE)**

- ✅ UBITS está copiado en `vendor/ubits/packages/` para portabilidad
- ✅ Los templates usan rutas relativas desde `prototypes/` hacia `vendor/ubits/packages/`
- ✅ Funciona en cualquier computador sin rutas absolutas
- ✅ Los templates están en `prototypes/canvas-*.html`
- ⚠️ **LEGACY:** Si no existe `vendor/ubits/`, se usa `Desktop/UBITS/` con rutas absolutas

---

## 5. **ESTRUCTURA DE TOKENS**

- Los tokens de modifiers tienen estructura: `--modifiers-[tipo]-color-[theme]-[categoria]-[color]`
- Ejemplo: `--modifiers-normal-color-dark-accent-blue`
- `normal` = cambia entre light/dark
- `static` = mismo color en light/dark
- `light`/`dark` = tema específico
- `accent-blue` = categoría y color

---

## 🔍 IDENTIFICACIÓN DE COMPONENTES DESDE IMÁGENES

**⚠️ REGLA CRÍTICA:** Cuando recibas una imagen o solicitud de componente:

1. **SIEMPRE consultar primero:**
   - Abrir `CATALOGO-COMPONENTES-UBITS.md`
   - Buscar componente similar en el catálogo
   - Verificar componentes disponibles: `window.UBITS`, `window.createSidebar`, etc.

2. **SIEMPRE preguntar si no estás seguro:**
   - "¿Este componente que muestras es un componente UBITS existente?"
   - "¿O quieres que lo cree usando los tokens de UBITS?"
   - **NUNCA asumas** - es mejor preguntar que crear algo incorrecto

3. **SIEMPRE usar componentes existentes:**
   - Si identificas un componente UBITS, úsalo
   - NO crees duplicados
   - NO crees nuevos componentes sin preguntar primero

4. **Proceso obligatorio:**
   - Analizar imagen/solicitud
   - Consultar catálogo
   - Verificar componentes disponibles
   - **Preguntar al usuario si no estás seguro**
   - Usar componente existente o crear con tokens UBITS

**Ver guía completa:** `docs/guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md`

---

## 🔍 VERIFICACIÓN ANTES DE TRABAJAR

1. Verificar que existe `vendor/ubits/packages/` (preferido) o `Desktop/UBITS/packages/` (legacy)
2. Verificar que el template carga `tokens.css` y `figma-tokens.css`
3. Verificar que los componentes están disponibles:
   - `window.createSidebar`
   - `window.createSubNav`
   - `window.createTabBar`
   - `window.createTabs` ⭐ (nuevo)
   - `window.createDataTable` ⭐ (nuevo, desde UMD)
4. Verificar que los tokens están disponibles en la consola del navegador

---

**Ver también:**
- `ESTRATEGIA-COMPONENTES-UBITS.md` - Estrategia completa
- `CATALOGO-COMPONENTES-UBITS.md` - Catálogo completo
- `docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md` - Cómo usar componentes

