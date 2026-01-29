# ⚡ Quick Reference - Reglas Críticas de Autorun

> **Referencia rápida** con solo las reglas más críticas. Para detalles completos, ver `.cursor/rules/`

---

## 🚨 VERIFICACIÓN INICIAL OBLIGATORIA

**ANTES de cualquier acción, ejecutar:**
```bash
npm run autorun:init-hub
```

**Verificar que veas:**
- ✅ "AutorunHub inicializado correctamente"
- ✅ "File Watching: ✅ activo"

**Si falla:** Ejecutar `npm run init` primero

---

## 🔄 FLUJO OBLIGATORIO: ANÁLISIS → PLAN → CHECKLIST → IMPLEMENTACIÓN

**⚠️ SIEMPRE seguir este flujo para cualquier implementación:**

1. **🔍 ANÁLISIS** - Analizar componentes, iconos, spacing, estructura
2. **📋 PLAN** - Crear plan detallado y mostrarlo al usuario
3. **✅ CHECKLIST** - Crear checklist para cada componente/tarea
4. **🛠️ IMPLEMENTACIÓN** - Implementar paso a paso, UNA tarea a la vez

**❌ NUNCA:** Implementar todo de una vez sin análisis y plan.

**Ver:** `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md` - ⚠️ **OBLIGATORIO**

---

## 🔍 DETECCIÓN DE IMÁGENES

**Si detectas:**
- `<image>` o `<image_description>` en el mensaje
- Palabras: "imagen", "crear desde imagen", "home de [módulo]"
- Solicitudes: "crea el home", "haz la interfaz"

**ENTONCES:**
1. 🛑 **DETENER TODO** - No usar `write()` ni `search_replace()`
2. 📖 **LEER:** `.cursor/rules/02-bloqueo-imagen.md`
3. 📖 **LEER:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
4. 🔍 **ANALIZAR** imagen detalladamente
5. 📝 **MOSTRAR** análisis completo al usuario
6. ⏸️ **ESPERAR** aprobación explícita
7. ✅ **SOLO DESPUÉS** implementar UNA tarea a la vez

---

## ✅ CHECKLIST MÍNIMO ANTES DE IMPLEMENTAR COMPONENTE

### Fase 1: Consulta (OBLIGATORIO)
- [ ] Consultar `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- [ ] Consultar Storybook en Vercel: `https://ubits-storybook10.vercel.app/`
  - [ ] Revisar pestaña "Code"
  - [ ] Revisar pestaña "Controls"
- [ ] Consultar Storybook MCP: `mcp_storybook_getComponentsProps(['componente'])`

### Fase 2: Verificación (OBLIGATORIO)
- [ ] Verificar formato de iconos: `icon: 'home'` (NO `'far fa-home'`)
- [ ] Verificar que NO se agreguen estilos extra automáticamente
- [ ] Verificar que NO se agregue `margin-top` al contenedor

### Fase 3: Implementación (OBLIGATORIO)
- [ ] Implementar UNA funcionalidad a la vez
- [ ] Pedir aprobación antes de continuar
- [ ] Validar después de cada paso

**Ver checklist completo:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`

---

## 🚫 ERRORES CRÍTICOS A EVITAR

1. ❌ **Crear componentes sin consultar catálogo primero**
2. ❌ **Agregar estilos extra automáticamente** (padding, margin, etc.)
3. ❌ **Agregar margin-top al contenedor** (usar `gap` del padre)
4. ❌ **Implementar todo de golpe** (dividir en tareas pequeñas)
5. ❌ **Usar formato incorrecto de iconos** (`'far fa-home'` → `'home'`)

**Ver lista completa:** `.cursor/rules/05-errores.md`

---

## 🔌 USO OBLIGATORIO DE MCPs Y STORYBOOK

**⚠️ CRÍTICO: Consultar Storybook las veces que requiera:**
- ✅ **Una vez por cada historia** de Storybook
- ✅ **Una vez por cada funcionalidad** específica
- ✅ **Antes de implementar cada tarea** del plan

**NO es solo una vez al inicio, sino múltiples veces durante el proceso.**

**ANTES de implementar cada tarea/funcionalidad:**
1. Consultar Storybook en Vercel (historia específica)
2. Consultar Storybook MCP para props exactas
3. Revisar pestaña "Code" y "Controls"
4. Volver al template después de consultar
5. Implementar SOLO esa funcionalidad

**Ver:** `docs/guias/CUANDO-CONSULTAR-STORYBOOK.md` - ⚠️ **OBLIGATORIO**

---

## 📚 REFERENCIAS RÁPIDAS

- **Reglas completas:** `.cursor/rules/index.md`
- **Detección de imágenes:** `.cursor/rules/01-deteccion-imagen.md`
- **Bloqueo para imágenes:** `.cursor/rules/02-bloqueo-imagen.md`
- **Reglas de componentes:** `.cursor/rules/03-componentes.md`
- **Reglas de implementación:** `.cursor/rules/04-implementacion.md`
- **Errores comunes:** `.cursor/rules/05-errores.md`
- **Implementación automática:** `.cursor/rules/06-implementacion-automatica.md`

---

**Última actualización:** 2025-01-03




