# 🎨 Guía Paso a Paso: Activar VisBug en Cursor

> **Guía detallada para activar y usar VisBug con Autorun**

---

## ⚠️ Importante: VisBug y el Browser de Cursor

**VisBug es una extensión de Chrome**, y el browser integrado de Cursor puede o no soportar extensiones dependiendo de su implementación.

**Tienes 2 opciones:**

### Opción A: Usar VisBug en Navegador Externo (Recomendado) ✅
- El wizard abre automáticamente el navegador externo
- VisBug funciona perfectamente ahí
- Puedes medir y ajustar spacing visualmente

### Opción B: Usar Browser MCP de Cursor
- El browser MCP de Cursor puede no soportar extensiones
- Pero puedes usar las herramientas MCP para análisis
- VisBug puede no estar disponible

---

## 🚀 Opción A: Activar VisBug en Navegador Externo (Paso a Paso)

### Paso 1: Instalar VisBug en Chrome

1. **Abre Google Chrome** (no el browser de Cursor)
2. **Ve a Chrome Web Store:**
   - Abre: https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc
   - O busca "VisBug" en Chrome Web Store
3. **Instala la extensión:**
   - Clic en "Agregar a Chrome"
   - Confirma la instalación
   - Verás el ícono de VisBug en la barra de extensiones

### Paso 2: Ejecutar el Wizard

```bash
npm run init
```

**Lo que pasa:**
- ✅ El wizard abre automáticamente el navegador externo (Chrome)
- ✅ El template se carga en: `http://localhost:3000/canvas-encuestas.html`
- ✅ También se abre en el browser MCP de Cursor (automáticamente)

### Paso 3: Activar VisBug en el Navegador Externo

1. **Ve al navegador externo** (Chrome) que se abrió automáticamente
2. **Busca el ícono de VisBug:**
   - Está en la barra de extensiones (arriba a la derecha)
   - Ícono: cuadradito con líneas (herramienta de diseño)
3. **Activa VisBug:**
   - Clic en el ícono de VisBug
   - O presiona el atajo (si está configurado)
4. **Verás la interfaz de VisBug:**
   - Overlay sobre la página
   - Herramientas de selección y medición
   - Panel de propiedades

### Paso 4: Usar VisBug para Medir Spacing

1. **Selecciona un elemento:**
   - Clic en cualquier elemento de la página
   - VisBug resalta el elemento
   - Muestra información: padding, margin, tamaño
2. **Mide distancias:**
   - Clic en el espacio entre elementos
   - VisBug muestra la distancia exacta
   - Ejemplo: "32px" entre cards
3. **Ajusta valores "al vuelo":**
   - Selecciona el elemento
   - En el panel de VisBug, cambia padding/margin
   - Ve el resultado inmediatamente
   - Ejemplo: Cambiar "gap: 32px" a "16px"
4. **Anota los valores:**
   - Valores actuales: "gap: 32px"
   - Valores nuevos: "gap: 16px"
   - Token a usar: "spacing.md" (16px)

### Paso 5: Generar Instrucción para Cursor

Con los valores anotados, ve a Cursor y di:

```
En el contenedor de cards del template canvas-encuestas.html,
reduce el gap de 32px (spacing.xl) a 16px (spacing.md)
usando el token --ubits-spacing-md.
```

---

## 🔌 Opción B: Usar Browser MCP de Cursor (Sin VisBug)

Si VisBug no está disponible en el browser de Cursor, puedes usar las herramientas MCP:

### Paso 1: El Wizard Abre Automáticamente

```bash
npm run init
```

El agente de Cursor detecta automáticamente la URL y abre en browser MCP.

### Paso 2: Usar Herramientas MCP para Análisis

**El agente puede ejecutar automáticamente:**

```javascript
// Ver estructura de la página
mcp_cursor-ide-browser_browser_snapshot()

// Tomar screenshot
mcp_cursor-ide-browser_browser_take_screenshot({ fullPage: true })

// Ver mensajes de consola
mcp_cursor-ide-browser_browser_console_messages()
```

### Paso 3: Medir Spacing Manualmente

**Si VisBug no está disponible:**

1. **Usa DevTools en el browser MCP:**
   - F12 o Cmd+Option+I
   - Selecciona elemento (Ctrl+Shift+C)
   - Ve a "Computed" → Box Model
   - Mide padding, margin, gap

2. **O usa el navegador externo:**
   - El wizard también abre el navegador externo
   - Usa VisBug ahí
   - Anota valores
   - Implementa en Cursor

---

## 📋 Checklist Completo

### Antes de Empezar
- [ ] Chrome instalado
- [ ] VisBug instalado en Chrome
- [ ] Servidor local corriendo (se inicia con `npm run init`)

### Durante el Uso
- [ ] Wizard ejecutado (`npm run init`)
- [ ] Navegador externo abierto automáticamente
- [ ] Browser MCP de Cursor abierto automáticamente
- [ ] VisBug activado en navegador externo
- [ ] Elemento seleccionado
- [ ] Valores medidos y anotados

### Después de Medir
- [ ] Valores anotados (actuales y nuevos)
- [ ] Componente identificado
- [ ] Instrucción generada para Cursor
- [ ] Cambio implementado

---

## 🎯 Ejemplo Práctico Completo

### Escenario: Reducir Gap entre Cards

**Paso 1: Ejecutar Wizard**
```bash
npm run init
```
→ Navegador externo se abre en: `http://localhost:3000/canvas-encuestas.html`
→ Browser MCP de Cursor también se abre automáticamente

**Paso 2: Activar VisBug en Navegador Externo**
1. Ve al navegador externo (Chrome)
2. Busca ícono de VisBug en barra de extensiones
3. Clic en el ícono
4. VisBug se activa (overlay sobre la página)

**Paso 3: Medir Gap**
1. Con VisBug activo, selecciona el espacio entre cards
2. VisBug muestra: "gap: 32px"
3. En el panel de VisBug, cambia a "16px"
4. Ve el resultado inmediatamente
5. Anota: "gap: 32px → 16px"

**Paso 4: Identificar Componente**
1. Abre DevTools (F12) en el navegador externo
2. Inspecciona el contenedor de cards
3. Busca: `class="ubits-card-container"` o `data-ubits-component="card"`
4. Anota: archivo `canvas-encuestas.html`, línea 120

**Paso 5: Implementar en Cursor**
Ve a Cursor y di:
```
En el contenedor de cards del template canvas-encuestas.html (línea 120),
reduce el gap de 32px (spacing.xl) a 16px (spacing.md)
usando el token --ubits-spacing-md.
```

Cursor implementa el cambio automáticamente.

---

## 🚨 Solución de Problemas

### Problema 1: No veo el ícono de VisBug

**Solución:**
1. Verifica que VisBug esté instalado:
   - Chrome → chrome://extensions/
   - Busca "VisBug"
   - Debe estar "Activado"
2. Si no está, instálalo:
   - https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc
3. Recarga la página después de instalar

### Problema 2: VisBug no se activa

**Solución:**
1. Verifica que estés en Chrome (no en otro navegador)
2. Recarga la página (F5)
3. Intenta activar VisBug de nuevo
4. Si no funciona, desinstala y reinstala la extensión

### Problema 3: El navegador externo no se abre

**Solución:**
1. Verifica que el servidor esté corriendo:
   ```bash
   # El servidor se inicia automáticamente con npm run init
   # Debe estar en http://localhost:3000
   ```
2. Abre manualmente:
   ```bash
   # Abre Chrome y ve a:
   http://localhost:3000/canvas-encuestas.html
   ```
3. O usa el script helper:
   ```bash
   npm run open:browser prototypes/canvas-encuestas.html
   ```

### Problema 4: VisBug no funciona en Browser MCP de Cursor

**Solución:**
- **Normal:** El browser MCP de Cursor puede no soportar extensiones
- **Solución:** Usa VisBug en el navegador externo (Chrome)
- El wizard abre ambos automáticamente
- Usa VisBug en Chrome, analiza en browser MCP de Cursor

---

## 💡 Tips y Trucos

1. **Atajos de VisBug:**
   - Algunas versiones tienen atajos de teclado
   - Revisa la configuración de la extensión

2. **Combinar Herramientas:**
   - VisBug para medir visualmente
   - DevTools para valores exactos
   - Browser MCP para análisis automático

3. **Workflow Recomendado:**
   - Mide con VisBug (rápido y visual)
   - Verifica con DevTools (valores exactos)
   - Analiza con Browser MCP (estructura)

---

## 🔗 Referencias

- **VisBug GitHub:** https://github.com/GoogleChromeLabs/ProjectVisBug
- **Guía completa VisBug:** `docs/guias/uso/GUIA-USO-VISBUG-AUTORUN.md`
- **Guía Browser MCP:** `docs/guias/uso/GUIA-BROWSER-MCP-CURSOR.md`
- **Guía rápida herramientas:** `GUIA-RAPIDA-HERRAMIENTAS-INSpeccion.md`

---

**Última actualización:** 2025-01-03  
**Versión:** 1.0.0




