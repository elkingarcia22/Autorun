# 🎨 Guía: Usar VisBug con Autorun

> **⚠️ IMPORTANTE:** Esta guía explica cómo usar VisBug (y otras herramientas de inspección) junto con el browser de Cursor para mejorar el flujo de trabajo con templates Autorun.

---

## 🎯 Objetivo

Usar herramientas visuales de inspección (VisBug, Chrome DevTools) junto con el browser integrado de Cursor para:
- ✅ Identificar componentes UBITS visualmente
- ✅ Medir gaps, paddings y spacing
- ✅ Generar instrucciones precisas para Cursor
- ✅ Verificar tokens de Style Dictionary

---

## 📋 Prerequisitos

- ✅ VisBug instalado en Chrome (extensión)
- ✅ Cursor con browser MCP habilitado
- ✅ Servidor local de Autorun corriendo
- ✅ Template generado y disponible

---

## 🚀 Flujo de Trabajo Completo

### Paso 1: Iniciar Servidor Local

El servidor local se inicia automáticamente cuando ejecutas el wizard:

```bash
npm run init
```

O manualmente:

```bash
# El servidor se inicia en http://localhost:3000
# Los templates están en prototypes/
```

### Paso 2: Abrir Template en Browser de Cursor

**Opción A: Desde el Agente de Cursor (Recomendado)**

El agente de Cursor puede usar el browser MCP para abrir automáticamente:

```javascript
// El agente ejecuta:
mcp_cursor-ide-browser_browser_navigate({ 
  url: "http://localhost:3000/canvas-encuestas.html" 
})
```

**Opción B: Manualmente**

1. Ejecuta el script helper:
   ```bash
   node scripts/open-in-cursor-browser.js prototypes/canvas-encuestas.html
   ```
2. Copia la URL mostrada
3. Pide al agente de Cursor que navegue a esa URL usando browser MCP

### Paso 3: Activar VisBug

**En el browser de Cursor:**

1. Una vez que la página está cargada, activa VisBug
2. VisBug se activa automáticamente si está instalado en Chrome
3. Si no está instalado, instálalo desde: https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc

**Características de VisBug:**
- ✅ Selección visual de elementos
- ✅ Medición de distancias
- ✅ Edición de padding/margin en vivo
- ✅ Overlays de spacing

### Paso 4: Identificar Elemento Problemático

1. **Selecciona el elemento** con VisBug (clic en el elemento)
2. **Mide distancias:**
   - VisBug muestra distancias a otros elementos
   - Muestra padding y margin visualmente
3. **Ajusta valores "al vuelo":**
   - Cambia padding/margin para ver resultado
   - Anota valores finales (ej: "gap: 24px → 16px")

### Paso 5: Identificar Componente UBITS

**Opción A: Usando DevTools en Browser de Cursor**

1. Abre DevTools (F12 o clic derecho → Inspeccionar)
2. Selecciona el elemento
3. Busca atributos/clases UBITS:
   - `data-ubits-component="card"`
   - `class="ubits-card"`
   - `window.createDataTable(...)`

**Opción B: Usando Snapshot de Accesibilidad**

El agente de Cursor puede tomar un snapshot:

```javascript
mcp_cursor-ide-browser_browser_snapshot()
```

Esto muestra la estructura de accesibilidad que puede ayudar a identificar componentes.

### Paso 6: Consultar Storybook MCP

**ANTES de implementar, consulta:**

```javascript
// El agente consulta:
mcp_storybook_getComponentsProps(["DataTable"])
// O el componente identificado
```

Esto te da:
- ✅ Props exactas del componente
- ✅ Tokens usados
- ✅ Estructura correcta

### Paso 7: Generar Instrucción para Cursor

Con la información recopilada, genera una instrucción precisa:

**Ejemplo de instrucción:**

```
En el componente DataTable del template canvas-encuestas.html,
reduce el gap entre filas de 24px (spacing.lg) a 16px (spacing.md)
usando tokens de Style Dictionary.

El componente está en la línea 145 del archivo.
Usa la prop 'gap' del DataTable con el token '--ubits-spacing-md'.
```

### Paso 8: Implementar con Cursor

1. Pega la instrucción en Cursor
2. Cursor consulta Storybook MCP para props exactas
3. Cursor implementa el cambio usando tokens correctos
4. Verifica el resultado en el browser de Cursor

---

## 🛠️ Herramientas Disponibles

### 1. VisBug (Extensión Chrome)

**Instalación:**
- Chrome Web Store: https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc
- GitHub: https://github.com/GoogleChromeLabs/ProjectVisBug

**Características:**
- ✅ Selección visual de elementos
- ✅ Medición de distancias
- ✅ Edición de padding/margin en vivo
- ✅ Overlays de spacing
- ✅ Ajuste de valores "al vuelo"

**Uso:**
1. Activa VisBug (extensión)
2. Selecciona elemento
3. Ajusta valores visualmente
4. Anota valores finales

### 2. Chrome DevTools

**Acceso:**
- F12 o Ctrl+Shift+I
- Clic derecho → Inspeccionar

**Características:**
- ✅ Box Model (padding, margin, border)
- ✅ Computed styles (valores finales)
- ✅ Flex/Grid overlays (gaps, alineación)
- ✅ Selector CSS preciso

**Uso:**
1. Abre DevTools
2. Selecciona elemento (Ctrl+Shift+C)
3. Ve Box Model para valores exactos
4. Verifica tokens usados

### 3. Browser MCP de Cursor

**Herramientas disponibles:**
- `browser_navigate` - Navegar a URL
- `browser_snapshot` - Snapshot de accesibilidad
- `browser_take_screenshot` - Screenshot
- `browser_click` - Clic en elemento
- `browser_type` - Escribir texto
- `browser_console_messages` - Mensajes de consola

**Uso desde el agente:**
```javascript
// Navegar a template
mcp_cursor-ide-browser_browser_navigate({ 
  url: "http://localhost:3000/canvas-encuestas.html" 
})

// Tomar snapshot
mcp_cursor-ide-browser_browser_snapshot()

// Tomar screenshot
mcp_cursor-ide-browser_browser_take_screenshot()
```

### 4. Storybook MCP

**Herramientas disponibles:**
- `mcp_storybook_getComponentList` - Listar componentes
- `mcp_storybook_getComponentsProps` - Props de componentes

**Uso:**
```javascript
// Listar componentes
mcp_storybook_getComponentList()

// Obtener props
mcp_storybook_getComponentsProps(["DataTable"])
```

---

## 📝 Ejemplos Prácticos

### Ejemplo 1: Reducir Gap entre Cards

**Situación:** Gap demasiado grande entre cards en el template.

**Proceso:**

1. **Abrir template en browser de Cursor:**
   ```javascript
   mcp_cursor-ide-browser_browser_navigate({ 
     url: "http://localhost:3000/canvas-encuestas.html" 
   })
   ```

2. **Activar VisBug y seleccionar gap:**
   - Seleccionar espacio entre cards
   - VisBug muestra: "gap: 32px"
   - Ajustar a "16px" para ver resultado
   - Anotar: "gap: 32px → 16px"

3. **Identificar componente:**
   - DevTools muestra: `class="ubits-card-container"`
   - Buscar en código: `prototypes/canvas-encuestas.html`

4. **Consultar Storybook MCP:**
   ```javascript
   mcp_storybook_getComponentsProps(["Card"])
   ```

5. **Generar instrucción:**
   ```
   En el contenedor de cards del template canvas-encuestas.html,
   reduce el gap de 32px (spacing.xl) a 16px (spacing.md)
   usando el token --ubits-spacing-md.
   ```

6. **Implementar con Cursor:**
   - Cursor busca el contenedor
   - Cambia gap usando token correcto
   - Verifica resultado

### Ejemplo 2: Ajustar Padding de DataTable

**Situación:** Padding interno del DataTable demasiado grande.

**Proceso:**

1. **Abrir template y activar VisBug**
2. **Seleccionar DataTable:**
   - VisBug muestra: "padding: 24px"
   - Ajustar a "16px"
   - Anotar: "padding: 24px → 16px"

3. **Identificar componente:**
   - DevTools: `window.createDataTable(...)`
   - Buscar en código línea donde se crea

4. **Consultar Storybook MCP:**
   ```javascript
   mcp_storybook_getComponentsProps(["DataTable"])
   ```

5. **Generar instrucción:**
   ```
   En el DataTable de encuestas (línea 145),
   reduce el padding interno de 24px (spacing.lg) a 16px (spacing.md)
   usando la prop 'padding' del DataTable con token --ubits-spacing-md.
   ```

6. **Implementar:**
   - Cursor modifica la prop `padding` del DataTable
   - Usa token correcto
   - Verifica resultado

---

## ✅ Checklist de Uso

**Antes de empezar:**
- [ ] VisBug instalado en Chrome
- [ ] Servidor local corriendo (puerto 3000)
- [ ] Template generado y disponible
- [ ] Browser MCP de Cursor habilitado

**Durante el análisis:**
- [ ] Template abierto en browser de Cursor
- [ ] VisBug activado
- [ ] Elemento problemático identificado
- [ ] Valores medidos y anotados
- [ ] Componente UBITS identificado
- [ ] Storybook MCP consultado

**Antes de implementar:**
- [ ] Instrucción generada con:
  - [ ] Componente identificado
  - [ ] Archivo y línea
  - [ ] Valores actuales y nuevos
  - [ ] Tokens a usar
- [ ] Storybook MCP consultado para props exactas

**Después de implementar:**
- [ ] Cambio verificado en browser de Cursor
- [ ] Valores correctos aplicados
- [ ] Tokens usados correctamente
- [ ] No hay errores en consola

---

## 🚨 Errores Comunes

### Error 1: VisBug no se activa

**Solución:**
- Verificar que VisBug esté instalado
- Recargar la página
- Verificar que estés en Chrome (no en browser de Cursor si es diferente)

### Error 2: No puedo identificar el componente

**Solución:**
- Usar DevTools para inspeccionar elemento
- Buscar atributos `data-ubits-*` o clases `ubits-*`
- Consultar código del template para ver cómo se crea
- Usar Storybook MCP para listar componentes disponibles

### Error 3: Valores no coinciden con tokens

**Solución:**
- Consultar Storybook MCP para tokens exactos
- Verificar tokens en `tokens/` del proyecto
- Usar valores de tokens, no píxeles directos

### Error 4: Browser MCP no funciona

**Solución:**
- Verificar que browser MCP esté habilitado en Cursor
- Verificar que la URL sea accesible (servidor local corriendo)
- Usar fallback: abrir en Chrome normal y usar VisBug ahí

---

## 🔗 Referencias

- **Análisis herramientas:** `ANALISIS-HERRAMIENTAS-SELECCION-ELEMENTOS.md`
- **VisBug GitHub:** https://github.com/GoogleChromeLabs/ProjectVisBug
- **Chrome DevTools:** https://developer.chrome.com/docs/devtools/
- **Storybook MCP:** `docs/guias/configuracion/GUIA-SETUP-MCP-AUTOMATICO.md`
- **Proceso implementación:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`

---

**Última actualización:** 2025-01-03  
**Versión:** 1.0.0








