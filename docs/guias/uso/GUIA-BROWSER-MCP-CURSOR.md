# 🔌 Guía: Usar Browser MCP de Cursor con Autorun

> **⚠️ IMPORTANTE:** Esta guía explica cómo usar el browser integrado de Cursor (MCP) para trabajar con templates Autorun de manera más eficiente.

---

## 🎯 Objetivo

Usar el browser MCP de Cursor para:
- ✅ Abrir templates automáticamente en el browser integrado
- ✅ Analizar elementos visualmente
- ✅ Tomar snapshots y screenshots
- ✅ Generar instrucciones precisas para implementar cambios

---

## 📋 Prerequisitos

- ✅ Cursor con browser MCP habilitado
- ✅ Servidor local de Autorun corriendo (puerto 3000)
- ✅ Template generado y disponible

---

## 🚀 Flujo de Trabajo

### Paso 1: Iniciar Servidor Local

El servidor se inicia automáticamente con el wizard:

```bash
npm run init
```

O verifica que esté corriendo:

```bash
# El servidor debe estar en http://localhost:3000
# Si no está, el wizard lo iniciará automáticamente
```

### Paso 2: Obtener Información del Template

**Opción A: Usar Script Helper**

El agente de Cursor puede leer el script helper:

```javascript
// Leer información del template
const templateInfo = await getTemplateInfo('prototypes/canvas-encuestas.html');

// templateInfo contiene:
// - httpUrl: URL para navegar
// - mcpCommands: Comandos MCP listos para usar
// - instructions: Pasos a seguir
```

**Opción B: Construir Manualmente**

```javascript
const httpUrl = `http://localhost:3000/canvas-encuestas.html`;
```

### Paso 3: Navegar al Template

El agente de Cursor usa el browser MCP:

```javascript
// Navegar a la URL del template
mcp_cursor-ide-browser_browser_navigate({ 
  url: "http://localhost:3000/canvas-encuestas.html" 
})
```

### Paso 4: Analizar la Página

**Tomar Snapshot de Accesibilidad:**

```javascript
// Obtener estructura de accesibilidad
mcp_cursor-ide-browser_browser_snapshot()
```

Esto muestra:
- ✅ Estructura del DOM
- ✅ Elementos interactivos
- ✅ Roles ARIA
- ✅ Texto visible

**Tomar Screenshot:**

```javascript
// Screenshot completo de la página
mcp_cursor-ide-browser_browser_take_screenshot({ 
  fullPage: true 
})
```

**Activar VisBug (Manual):**

1. Una vez que la página está cargada en el browser de Cursor
2. Activa VisBug si está instalado
3. Selecciona elementos para medir spacing

### Paso 5: Identificar Elementos

**Usando Snapshot:**

El snapshot muestra la estructura que ayuda a identificar:
- Componentes UBITS (buscar en atributos/clases)
- Elementos interactivos
- Jerarquía del DOM

**Usando DevTools:**

1. Abre DevTools en el browser de Cursor (F12)
2. Inspecciona elemento
3. Busca atributos `data-ubits-*` o clases `ubits-*`

**Usando VisBug:**

1. Selecciona elemento visualmente
2. Mide distancias/paddings
3. Ajusta valores "al vuelo" para ver resultado

### Paso 6: Consultar Storybook MCP

**ANTES de implementar, consulta:**

```javascript
// Listar componentes disponibles
mcp_storybook_getComponentList()

// Obtener props del componente identificado
mcp_storybook_getComponentsProps(["DataTable"])
```

### Paso 7: Generar Instrucción

Con la información recopilada, genera una instrucción precisa:

**Usando Helper:**

```javascript
const instruction = generateCursorInstruction({
  component: "DataTable",
  file: "prototypes/canvas-encuestas.html",
  line: 145,
  property: "gap",
  currentValue: "24px",
  newValue: "16px",
  token: "--ubits-spacing-md"
});

// Resultado:
// "En el componente DataTable del archivo prototypes/canvas-encuestas.html (línea 145), 
//  cambia gap de 24px (--ubits-spacing-md) a 16px usando el token --ubits-spacing-md."
```

### Paso 8: Implementar

1. Pega la instrucción en Cursor
2. Cursor consulta Storybook MCP
3. Cursor implementa el cambio
4. Verifica resultado en el browser de Cursor

---

## 🛠️ Herramientas Browser MCP Disponibles

### Navegación

```javascript
// Navegar a URL
mcp_cursor-ide-browser_browser_navigate({ url: "http://localhost:3000/template.html" })

// Navegar hacia atrás
mcp_cursor-ide-browser_browser_navigate_back()
```

### Análisis

```javascript
// Snapshot de accesibilidad
mcp_cursor-ide-browser_browser_snapshot()

// Screenshot
mcp_cursor-ide-browser_browser_take_screenshot({ fullPage: true })

// Mensajes de consola
mcp_cursor-ide-browser_browser_console_messages()

// Requests de red
mcp_cursor-ide-browser_browser_network_requests()
```

### Interacción

```javascript
// Clic en elemento
mcp_cursor-ide-browser_browser_click({ 
  element: "Botón de crear",
  ref: "button[data-testid='create-button']"
})

// Escribir texto
mcp_cursor-ide-browser_browser_type({
  element: "Campo de búsqueda",
  ref: "input[type='search']",
  text: "Texto a escribir"
})

// Seleccionar opción
mcp_cursor-ide-browser_browser_select_option({
  element: "Dropdown",
  ref: "select[name='status']",
  values: ["active"]
})
```

---

## 📝 Ejemplo Completo

### Escenario: Reducir Gap entre Cards

**Paso 1: Obtener información del template**

```javascript
// El agente lee el helper
const templateInfo = await getTemplateInfo('prototypes/canvas-encuestas.html');
// templateInfo.httpUrl = "http://localhost:3000/canvas-encuestas.html"
```

**Paso 2: Navegar al template**

```javascript
mcp_cursor-ide-browser_browser_navigate({ 
  url: templateInfo.httpUrl 
})
```

**Paso 3: Tomar snapshot**

```javascript
const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
// Analizar snapshot para identificar estructura
```

**Paso 4: Activar VisBug y medir**

1. Usuario activa VisBug manualmente
2. Selecciona gap entre cards
3. Mide: "gap: 32px"
4. Ajusta a "16px" para ver resultado
5. Anota: "gap: 32px → 16px"

**Paso 5: Identificar componente**

```javascript
// Usar DevTools o snapshot para identificar
// Encuentra: class="ubits-card-container"
// Busca en código: prototypes/canvas-encuestas.html línea 120
```

**Paso 6: Consultar Storybook MCP**

```javascript
mcp_storybook_getComponentsProps(["Card"])
// Obtiene props y tokens disponibles
```

**Paso 7: Generar instrucción**

```javascript
const instruction = generateCursorInstruction({
  component: "CardContainer",
  file: "prototypes/canvas-encuestas.html",
  line: 120,
  property: "gap",
  currentValue: "32px",
  newValue: "16px",
  token: "--ubits-spacing-md"
});
```

**Paso 8: Implementar**

El agente pega la instrucción y Cursor implementa el cambio.

---

## ✅ Checklist de Uso

**Antes de empezar:**
- [ ] Servidor local corriendo (puerto 3000)
- [ ] Template generado
- [ ] Browser MCP de Cursor habilitado

**Durante el análisis:**
- [ ] Template abierto en browser MCP
- [ ] Snapshot tomado
- [ ] VisBug activado (si está disponible)
- [ ] Elemento identificado
- [ ] Valores medidos

**Antes de implementar:**
- [ ] Storybook MCP consultado
- [ ] Instrucción generada
- [ ] Componente y archivo identificados
- [ ] Tokens verificados

**Después de implementar:**
- [ ] Cambio verificado en browser MCP
- [ ] Valores correctos
- [ ] Sin errores

---

## 🚨 Errores Comunes

### Error 1: Browser MCP no navega

**Solución:**
- Verificar que el servidor local esté corriendo
- Verificar que la URL sea correcta
- Verificar que browser MCP esté habilitado en Cursor

### Error 2: No puedo ver la página

**Solución:**
- Verificar que el servidor esté en el puerto correcto
- Verificar que el archivo exista en `prototypes/`
- Recargar la página en el browser MCP

### Error 3: VisBug no funciona en browser MCP

**Solución:**
- VisBug funciona mejor en Chrome normal
- Usar browser MCP para análisis básico
- Usar Chrome normal para VisBug avanzado

---

## 🔗 Referencias

- **Guía VisBug:** `docs/guias/uso/GUIA-USO-VISBUG-AUTORUN.md`
- **Análisis herramientas:** `ANALISIS-HERRAMIENTAS-SELECCION-ELEMENTOS.md`
- **Script helper:** `scripts/helpers/browser-helper.js`
- **Proceso implementación:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`

---

**Última actualización:** 2025-01-03  
**Versión:** 1.0.0




