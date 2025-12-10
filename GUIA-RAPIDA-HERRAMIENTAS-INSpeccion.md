# 🛠️ Guía Rápida: Cómo Usar las Herramientas de Inspección

> **Guía práctica para usar VisBug, Chrome DevTools y Browser MCP de Cursor con Autorun**

---

## 🚀 Inicio Rápido

### 1. Ejecutar el Wizard

```bash
npm run init
```

El wizard:
- ✅ Abre el navegador externo automáticamente
- ✅ Muestra la URL en formato especial
- ✅ El agente de Cursor detecta automáticamente y abre en browser MCP interno

### 2. Ver el Template en Browser de Cursor

**Automático:** El agente de Cursor detecta la URL y la abre automáticamente.

**Manual:** Si necesitas abrir manualmente:
```bash
npm run open:browser prototypes/canvas-encuestas.html
```

Luego el agente ejecuta:
```javascript
mcp_cursor-ide-browser_browser_navigate({ url: "http://localhost:3000/..." })
```

---

## 🎨 Usar VisBug (Medir Spacing Visualmente)

### Instalación

1. Instala la extensión de Chrome:
   - https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc
   - O busca "VisBug" en Chrome Web Store

### Uso

1. **Abre el template** (en navegador externo o browser de Cursor)
2. **Activa VisBug:**
   - Clic en el ícono de VisBug en la barra de extensiones
   - O presiona el atajo (si está configurado)
3. **Selecciona un elemento:**
   - Clic en cualquier elemento de la página
   - VisBug muestra distancias, padding, margin
4. **Ajusta valores "al vuelo":**
   - Cambia padding/margin para ver resultado
   - Anota valores finales (ej: "gap: 24px → 16px")

### Ejemplo Práctico

**Problema:** Gap demasiado grande entre cards

**Proceso:**
1. Activa VisBug
2. Selecciona el espacio entre cards
3. VisBug muestra: "gap: 32px"
4. Ajusta a "16px" para ver resultado
5. Anota: "gap: 32px → 16px"
6. Ve a Cursor y di: "En el contenedor de cards, reduce el gap de 32px a 16px usando token spacing.md"

---

## 🔍 Usar Chrome DevTools (Valores Exactos)

### Acceso

- **F12** o **Ctrl+Shift+I** (Windows/Linux)
- **Cmd+Option+I** (macOS)
- Clic derecho → "Inspeccionar"

### Uso para Medir Spacing

1. **Abre DevTools**
2. **Selecciona elemento:**
   - Clic derecho → "Inspeccionar"
   - O usa el selector (Ctrl+Shift+C)
3. **Ve al Box Model:**
   - Panel derecho → Pestaña "Computed"
   - Busca el Box Model visual
   - Muestra: padding, margin, border exactos
4. **Verifica tokens:**
   - Busca en "Styles" los tokens usados
   - Ej: `margin-top: var(--ubits-spacing-lg)`

### Ejemplo Práctico

**Problema:** Necesitas el valor exacto de padding

**Proceso:**
1. Abre DevTools (F12)
2. Selecciona el elemento
3. Ve a "Computed" → Box Model
4. Ve: "padding: 24px" (valor final aplicado)
5. Ve a "Styles" → Busca el token usado
6. Encuentra: `padding: var(--ubits-spacing-lg)` (24px)

---

## 🔌 Usar Browser MCP de Cursor (Análisis Automático)

### Comandos Disponibles

#### 1. Navegar a URL

```javascript
mcp_cursor-ide-browser_browser_navigate({ 
  url: "http://localhost:3000/canvas-encuestas.html" 
})
```

#### 2. Tomar Snapshot (Estructura de Accesibilidad)

```javascript
mcp_cursor-ide-browser_browser_snapshot()
```

**Muestra:**
- Estructura del DOM
- Elementos interactivos
- Roles ARIA
- Texto visible

#### 3. Tomar Screenshot

```javascript
mcp_cursor-ide-browser_browser_take_screenshot({ 
  fullPage: true 
})
```

#### 4. Ver Mensajes de Consola

```javascript
mcp_cursor-ide-browser_browser_console_messages()
```

#### 5. Ver Requests de Red

```javascript
mcp_cursor-ide-browser_browser_network_requests()
```

### Flujo Completo de Análisis

**Paso 1: Navegar**
```javascript
mcp_cursor-ide-browser_browser_navigate({ url: "http://localhost:3000/..." })
```

**Paso 2: Analizar**
```javascript
mcp_cursor-ide-browser_browser_snapshot()
// Analiza la estructura para identificar componentes
```

**Paso 3: Inspeccionar (si es necesario)**
```javascript
mcp_cursor-ide-browser_browser_click({ 
  element: "Botón de crear",
  ref: "button[data-testid='create']"
})
```

---

## 📋 Flujo de Trabajo Completo

### Escenario: Reducir Gap entre Cards

**1. Ejecutar Wizard:**
```bash
npm run init
```
→ Template se abre automáticamente en navegador externo y browser de Cursor

**2. Activar VisBug:**
- Clic en ícono de VisBug
- Seleccionar gap entre cards
- Ver: "gap: 32px"
- Ajustar a "16px" para ver resultado
- Anotar: "gap: 32px → 16px"

**3. Identificar Componente (DevTools):**
- F12 → DevTools
- Inspeccionar contenedor de cards
- Buscar: `class="ubits-card-container"` o `data-ubits-component="card"`
- Verificar archivo: `prototypes/canvas-encuestas.html` línea 120

**4. Consultar Storybook MCP:**
```javascript
mcp_storybook_getComponentsProps(["Card"])
```
→ Obtener props y tokens disponibles

**5. Generar Instrucción para Cursor:**
```
En el contenedor de cards del template canvas-encuestas.html (línea 120),
reduce el gap de 32px (spacing.xl) a 16px (spacing.md)
usando el token --ubits-spacing-md.
```

**6. Implementar:**
- Pegar instrucción en Cursor
- Cursor consulta Storybook MCP
- Cursor implementa cambio
- Verificar resultado en browser de Cursor

---

## 🎯 Casos de Uso Comunes

### Caso 1: Medir Spacing entre Elementos

**Herramienta:** VisBug

1. Activar VisBug
2. Seleccionar espacio entre elementos
3. Ver distancia mostrada
4. Ajustar para ver resultado
5. Anotar valores

### Caso 2: Ver Valores Exactos Aplicados

**Herramienta:** Chrome DevTools

1. F12 → DevTools
2. Seleccionar elemento (Ctrl+Shift+C)
3. Ver Box Model en "Computed"
4. Ver tokens en "Styles"

### Caso 3: Identificar Componente UBITS

**Herramienta:** Browser MCP de Cursor + DevTools

1. Usar `browser_snapshot()` para ver estructura
2. Buscar atributos `data-ubits-*` o clases `ubits-*`
3. Consultar Storybook MCP para confirmar

### Caso 4: Analizar Funcionalidad

**Herramienta:** Browser MCP de Cursor

1. Navegar con `browser_navigate()`
2. Tomar snapshot con `browser_snapshot()`
3. Interactuar con `browser_click()`
4. Ver cambios en tiempo real

---

## ✅ Checklist de Uso

**Antes de empezar:**
- [ ] VisBug instalado en Chrome
- [ ] Servidor local corriendo (puerto 3000)
- [ ] Template generado
- [ ] Browser MCP de Cursor habilitado

**Durante el análisis:**
- [ ] Template abierto en browser MCP
- [ ] VisBug activado (si necesitas medir spacing)
- [ ] DevTools abierto (si necesitas valores exactos)
- [ ] Elemento identificado
- [ ] Valores medidos y anotados

**Antes de implementar:**
- [ ] Storybook MCP consultado
- [ ] Instrucción generada con:
  - [ ] Componente identificado
  - [ ] Archivo y línea
  - [ ] Valores actuales y nuevos
  - [ ] Tokens a usar

---

## 🔗 Referencias

- **Guía completa VisBug:** `docs/guias/uso/GUIA-USO-VISBUG-AUTORUN.md`
- **Guía Browser MCP:** `docs/guias/uso/GUIA-BROWSER-MCP-CURSOR.md`
- **Análisis herramientas:** `ANALISIS-HERRAMIENTAS-SELECCION-ELEMENTOS.md`
- **Script helper:** `scripts/open-in-cursor-browser.js`

---

## 💡 Tips Rápidos

1. **VisBug** → Para medir y ajustar spacing visualmente
2. **DevTools** → Para valores exactos y tokens
3. **Browser MCP** → Para análisis automático y snapshots
4. **Combinar** → Usa VisBug para medir, DevTools para verificar, Browser MCP para analizar

---

**Última actualización:** 2025-01-03  
**Versión:** 1.0.0




