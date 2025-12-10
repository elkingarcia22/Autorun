# 🔍 Análisis: Herramientas de Selección de Elementos para Autorun

**Fecha:** 2025-01-03  
**Contexto:** Evaluación de recomendaciones de ChatGPT vs. necesidades específicas del proyecto Autorun

---

## 📊 Resumen Ejecutivo

### Recomendaciones de ChatGPT
1. **Chrome DevTools** (básico) - Box Model + Layout overlays
2. **VisBug** (extensión Chrome) - Edición visual tipo Figma
3. **React/Vue DevTools** - Identificar componentes del framework
4. **SelectorGadget** - Generar selectores CSS

### Evaluación para Autorun
- ✅ **VisBug** es la mejor opción para el flujo de trabajo actual
- ⚠️ **Chrome DevTools** es necesario pero insuficiente
- ❌ **React/Vue DevTools** no aplica (templates HTML estáticos)
- ⚠️ **SelectorGadget** útil pero no crítico

### Recomendación Final
**Combo ideal:** VisBug + Chrome DevTools + **NUEVA herramienta integrada** (add-on de Autorun)

---

## 🎯 Contexto del Proyecto Autorun

### Características Clave
- ✅ **Templates HTML estáticos** (no React/Vue)
- ✅ **Componentes UBITS** cargados desde Storybook
- ✅ **Proceso estructurado** de análisis de imágenes
- ✅ **Integración con MCPs** (Storybook, Figma, GitHub)
- ✅ **Style Dictionary** para tokens de diseño
- ✅ **Flujo:** Imagen → Análisis → Identificación → Implementación

### Necesidades Específicas
1. **Identificar componentes UBITS** en la interfaz
2. **Medir spacing/gaps/paddings** visualmente
3. **Mapear elementos visuales a código** (templates HTML)
4. **Generar instrucciones precisas** para Cursor
5. **Verificar tokens** de Style Dictionary

---

## 📋 Análisis Detallado de Recomendaciones

### 1. Chrome DevTools (Box Model + Layout)

#### ✅ Ventajas
- **Precisión absoluta** para padding, margin, border
- **Overlays de Flex/Grid** para ver gaps y alineación
- **Computed styles** con valores finales aplicados
- **100% gratuito** y nativo
- **Funciona con cualquier stack** (incluido HTML estático)

#### ⚠️ Limitaciones para Autorun
- **No identifica componentes UBITS** automáticamente
- **No mapea a código** (no sabe qué archivo modificar)
- **No genera instrucciones** para Cursor
- **Proceso manual** (copiar valores, buscar en código)

#### 🎯 Uso Recomendado
**SÍ usar para:**
- Verificar valores exactos después de identificar componente
- Medir spacing cuando VisBug no es suficiente
- Debugging de estilos aplicados

**NO usar para:**
- Identificación inicial de componentes
- Generación de instrucciones para Cursor

---

### 2. VisBug (Extensión Chrome)

#### ✅ Ventajas
- **Edición visual** tipo Figma (ajustar valores en vivo)
- **Distancias visuales** entre elementos
- **Overlays de padding/margin** muy claros
- **Gratuito y open source**
- **Ideal para prototipado rápido**

#### ⚠️ Limitaciones para Autorun
- **No identifica componentes UBITS** (solo elementos HTML)
- **No mapea a código** (no sabe qué archivo modificar)
- **No genera instrucciones** para Cursor
- **No verifica tokens** de Style Dictionary

#### 🎯 Uso Recomendado
**SÍ usar para:**
- Identificar gaps/paddings visualmente
- Probar valores antes de implementar
- Medir distancias entre elementos
- Ajustar valores "al vuelo" para ver resultado

**NO usar para:**
- Identificar qué componente UBITS es
- Generar instrucciones automáticas para Cursor

---

### 3. React/Vue DevTools

#### ❌ No Aplica para Autorun
- **Autorun usa templates HTML estáticos**, no React/Vue
- **Componentes UBITS** se cargan dinámicamente desde Storybook
- **No hay árbol de componentes** del framework

#### 🎯 Alternativa Necesaria
En lugar de React DevTools, Autorun necesita:
- **Identificador de componentes UBITS** en el DOM
- **Mapeo de elementos HTML a componentes UBITS**
- **Información de props** desde Storybook MCP

---

### 4. SelectorGadget / Element Selectors

#### ✅ Ventajas
- **Genera selectores CSS** precisos
- **Útil para automatización** (Playwright, scraping)
- **Gratuito**

#### ⚠️ Limitaciones para Autorun
- **No identifica componentes UBITS**
- **No mapea a código**
- **No genera instrucciones** para Cursor
- **Menos útil** que VisBug para el flujo visual

#### 🎯 Uso Recomendado
**SÍ usar para:**
- Generar selectores para tests E2E (Playwright)
- Identificar elementos específicos para scraping

**NO usar para:**
- Flujo principal de identificación de componentes
- Generación de instrucciones para Cursor

---

## 🚀 Recomendación: Solución Integrada para Autorun

### Problema Principal
**Ninguna herramienta externa identifica componentes UBITS ni genera instrucciones para Cursor.**

### Solución Propuesta: Add-on de Autorun

#### 🎯 "Autorun Inspector" (Add-on Nuevo)

**Características:**
1. **Identificación de Componentes UBITS**
   - Detecta qué componente UBITS está renderizado en cada elemento
   - Muestra props y configuración actual
   - Enlaza con Storybook MCP para información completa

2. **Medición Visual Integrada**
   - Overlays de spacing/gaps/paddings (similar a VisBug)
   - Muestra tokens de Style Dictionary usados
   - Valores en tokens (no solo píxeles)

3. **Generación de Instrucciones para Cursor**
   - Genera prompt preciso para Cursor
   - Incluye: componente, props, tokens, archivo a modificar
   - Formato: "En el componente X, cambia gap de Y a Z usando token spacing.md"

4. **Integración con MCPs**
   - Consulta Storybook MCP para props exactas
   - Consulta Figma MCP para tokens de diseño
   - Mapea elementos visuales a código

#### 📋 Ejemplo de Uso

```javascript
// Usuario selecciona elemento en la interfaz
// Autorun Inspector muestra:

{
  component: "DataTable",
  props: {
    showCheckbox: true,
    columnSortable: true,
    gap: "var(--ubits-spacing-lg)" // 24px
  },
  file: "prototypes/canvas-encuestas.html",
  line: 145,
  instruction: "En el DataTable de encuestas, reduce el gap de spacing.lg (24px) a spacing.md (16px)"
}
```

#### 🛠️ Implementación

**Opción A: Extensión de Chrome**
- Similar a VisBug pero específica para Autorun
- Se integra con templates HTML de Autorun
- Consulta MCPs disponibles

**Opción B: Add-on de Autorun**
- Se carga automáticamente en templates
- API global: `window.AUTORUN.Inspector`
- Integrado con el sistema de add-ons existente

**Opción C: Integración con Browser MCP de Cursor**
- Usar `mcp_cursor-ide-browser_*` tools
- Script que analiza elementos seleccionados
- Genera instrucciones automáticamente

---

## 🎯 Recomendación Final: Stack de Herramientas

### Para el Flujo Actual de Autorun

#### 1. **VisBug** ⭐ (PRIMARIA)
**Cuándo usar:**
- Identificar gaps/paddings visualmente
- Medir distancias entre elementos
- Probar valores antes de implementar

**Flujo:**
1. Abrir template en Chrome
2. Activar VisBug
3. Seleccionar elemento problemático
4. Ver/ajustar spacing visualmente
5. Anotar valores (ej: "gap de 32px a 16px")
6. Ir a Cursor con instrucción: "En el componente X, reduce gap de 32px a 16px usando token spacing.md"

#### 2. **Chrome DevTools** (SECUNDARIA)
**Cuándo usar:**
- Verificar valores exactos después de identificar
- Debugging de estilos aplicados
- Ver computed styles finales

**Flujo:**
1. Después de identificar componente con VisBug
2. Abrir DevTools (F12)
3. Seleccionar elemento (Ctrl+Shift+C)
4. Ver Box Model para valores exactos
5. Verificar que coinciden con tokens

#### 3. **Autorun Inspector** (FUTURO) ⭐⭐
**Cuándo usar:**
- Identificación automática de componentes UBITS
- Generación de instrucciones para Cursor
- Verificación de tokens

**Flujo:**
1. Activar Autorun Inspector en template
2. Seleccionar elemento
3. Ver: componente UBITS, props, tokens, archivo
4. Copiar instrucción generada
5. Pegar en Cursor

#### 4. **Storybook MCP** (OBLIGATORIO)
**Cuándo usar:**
- ANTES de implementar cualquier componente
- Consultar props exactas
- Verificar estructura

**Flujo:**
1. Identificar componente con VisBug/Inspector
2. Consultar Storybook MCP en Cursor
3. Obtener props exactas
4. Implementar con información correcta

---

## 📊 Comparativa: ChatGPT vs. Recomendación Autorun

| Herramienta | ChatGPT | Autorun | Razón |
|-------------|---------|---------|-------|
| **Chrome DevTools** | ✅ Básico | ✅ Secundaria | Necesaria pero insuficiente |
| **VisBug** | ✅ Recomendada | ✅ **PRIMARIA** | Ideal para flujo visual |
| **React DevTools** | ✅ Si usa React | ❌ No aplica | Templates HTML estáticos |
| **SelectorGadget** | ✅ Útil | ⚠️ Opcional | Menos útil que VisBug |
| **Autorun Inspector** | ❌ No existe | ✅ **FUTURO** | Necesidad específica |

---

## 🚀 Plan de Implementación

### Fase 1: Setup Inmediato (Hoy)
1. ✅ Instalar **VisBug** en Chrome
2. ✅ Configurar **Chrome DevTools** con shortcuts
3. ✅ Documentar flujo: VisBug → Anotar valores → Cursor

### Fase 2: Mejora del Flujo (Próxima semana)
1. ✅ Crear guía: "Cómo usar VisBug con Autorun"
2. ✅ Crear plantilla de instrucciones para Cursor
3. ✅ Integrar con proceso de análisis de imágenes

### Fase 3: Add-on Inspector (Futuro)
1. ✅ Diseñar API del add-on
2. ✅ Implementar identificación de componentes UBITS
3. ✅ Integrar con MCPs (Storybook, Figma)
4. ✅ Generar instrucciones automáticas para Cursor

---

## 📝 Guía de Uso: VisBug + Autorun

### Paso 1: Identificar Elemento
1. Abrir template en Chrome: `http://localhost:5173/prototypes/canvas-*.html`
2. Activar VisBug (extensión)
3. Seleccionar elemento problemático (ej: gap entre cards)

### Paso 2: Medir y Ajustar
1. VisBug muestra distancias/paddings
2. Ajustar valores "al vuelo" para ver resultado
3. Anotar valores finales (ej: "gap: 24px → 16px")

### Paso 3: Identificar Componente
1. En DevTools, inspeccionar elemento
2. Buscar clases/atributos UBITS (ej: `data-ubits-component="card"`)
3. O consultar Storybook MCP para identificar componente

### Paso 4: Generar Instrucción para Cursor
```
En el componente Card del template canvas-encuestas.html,
reduce el gap entre cards de 24px (spacing.lg) a 16px (spacing.md)
usando tokens de Style Dictionary.
```

### Paso 5: Implementar
1. Pegar instrucción en Cursor
2. Cursor consulta Storybook MCP
3. Cursor implementa cambio usando tokens correctos

---

## 🎯 Conclusión

### Lo que ChatGPT Recomendó
- ✅ **VisBug** es excelente (coincide con nuestra recomendación)
- ✅ **Chrome DevTools** es necesario (coincide)
- ⚠️ **React DevTools** no aplica (correcto, no usamos React)
- ⚠️ **SelectorGadget** es opcional (menos útil que VisBug)

### Lo que Falta (Necesidad Específica de Autorun)
- ❌ **Identificación automática de componentes UBITS**
- ❌ **Mapeo de elementos visuales a código**
- ❌ **Generación de instrucciones para Cursor**
- ❌ **Integración con MCPs y tokens**

### Recomendación Final
1. **Usar VisBug + Chrome DevTools** (setup inmediato)
2. **Crear add-on "Autorun Inspector"** (futuro)
3. **Integrar con MCPs** para información completa
4. **Generar instrucciones automáticas** para Cursor

---

## 📚 Referencias

- **VisBug:** https://github.com/GoogleChromeLabs/ProjectVisBug
- **Chrome DevTools:** https://developer.chrome.com/docs/devtools/
- **Storybook MCP:** `docs/guias/configuracion/GUIA-SETUP-MCP-AUTOMATICO.md`
- **Proceso de análisis:** `.cursor/rules/01-deteccion-imagen.md`

---

**Última actualización:** 2025-01-03  
**Autor:** Análisis basado en necesidades específicas del proyecto Autorun




