# 🚨 Errores Comunes a Evitar

> **⚠️ CRÍTICO:** Revisa esta lista antes de implementar cualquier componente.

---

## ERRORES CRÍTICOS

1. ❌ **Crear componentes sin consultar el catálogo primero** - SIEMPRE consulta `CATALOGO-COMPONENTES-UBITS.md`
2. ❌ **Asumir que un componente no existe** - Pregunta al usuario si no estás seguro
3. ❌ Crear nuevos componentes en lugar de usar los existentes
4. ❌ Sobrescribir tokens con `!important` en CSS inyectado
5. ❌ Usar rutas absolutas cuando existe `vendor/ubits/` (usar relativas)
6. ❌ Modificar archivos en `vendor/ubits/` o `Desktop/UBITS/`
7. ❌ Intentar cargar desde Storybook en templates generados
8. ❌ Usar tokens incorrectos (ej: usar `dark-accent` en lugar de `modifiers-normal-color-dark-accent-blue`)
9. ❌ **Crear componentes duplicados** - Siempre verifica si existe antes de crear
10. ❌ **Usar `<ubits-tabs>` o `<ubits-data-table>` como custom elements** - Usar `window.createTabs()` y `window.createDataTable()` en su lugar

---

## 11. ❌ **ANÁLISIS Y FORMATO INCORRECTO DE ICONOS** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Asumir el primer resultado de FontAwesome sin verificar variaciones
- ❌ INCORRECTO: Omitir sufijos como `-simple` (ej: usar `chart-pie` cuando es `chart-pie-simple`)
- ❌ INCORRECTO: `icon: 'far fa-home'` o `icon: 'fas fa-user'` o `icon: 'fa-chart-pie-simple'`
- ✅ CORRECTO: Analizar visualmente, listar variaciones, verificar si es "simple", comparar con imagen
- ✅ CORRECTO: `icon: 'home'` o `icon: 'chart-pie-simple'` (solo el nombre, sin prefijos `fa-`, con sufijos si aplica)
- El componente automáticamente agrega `fa-` y el estilo (`far`/`fas`) según si el tab está activo
- **Ver:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` para el proceso completo de análisis
- **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` para detalles completos

---

## 12. ❌ **IMPLEMENTAR TODAS LAS FUNCIONALIDADES DE DATATABLE DE GOLPE** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Implementar checkboxes + drag & drop + ordenamiento + filtros + buscador en un solo paso
- ✅ CORRECTO: Implementar UNA funcionalidad a la vez, pedir aprobación, y solo después continuar
- ✅ CORRECTO: Analizar columnas primero (cantidad y tipo) antes de crear el DataTable
- ✅ CORRECTO: Usar componentes UBITS (`<ubits-input>` y `<ubits-button>`) para el buscador personalizado
- **Ver:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md` para el proceso completo

---

## 13. ❌ **NO REVISAR VARIANTES Y CONTROLADORES ANTES DE IMPLEMENTAR** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Implementar componente sin revisar sus opciones, variantes y funcionalidades
- ✅ CORRECTO: Revisar archivo de tipos del componente ANTES de implementar
- ✅ CORRECTO: Identificar variantes, controladores (opciones booleanas) y funcionalidades
- ✅ CORRECTO: Dividir funcionalidades en tareas independientes

---

## 14. ❌ **SUBNAV DESAPARECE DESPUÉS DE CREARSE** - ⚠️ CRÍTICO ⭐ NUEVO

- ❌ INCORRECTO: Implementar SubNav sin sistema de restauración automática
- ❌ INCORRECTO: Agregar logs de diagnóstico excesivos y no removerlos después
- ✅ CORRECTO: SIEMPRE implementar sistema de restauración automática que verifica cada 500ms si el contenedor está vacío
- ✅ CORRECTO: Interceptar `updateSubNav` y `handleSectionChange` para mantener el tab activo
- ✅ CORRECTO: Solo agregar logs esenciales, remover logs de debugging después de resolver
- **Ver:** `docs/guias/implementacion/GUIA-ERROR-SUBNAV-DESAPARECE-DESPUES-CREARSE.md` - ⚠️ **OBLIGATORIO**
- ✅ CORRECTO: Mostrar plan al usuario antes de implementar

---

## 14. ❌ **NO EJECUTAR VALIDACIÓN AUTOMÁTICA DESPUÉS DE IMPLEMENTAR** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Implementar componente sin ejecutar `npm run lint`
- ✅ CORRECTO: Ejecutar `npm run lint` DESPUÉS de cada implementación
- ✅ CORRECTO: Corregir errores automáticamente si los hay
- ✅ CORRECTO: Repetir validación hasta que pase
- ✅ CORRECTO: Mostrar resultado de validación al usuario

---

## 15. ❌ **METER TODO EN UN SOLO CONTENEDOR O NO ANALIZAR ESTRUCTURA** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Asumir que todo va en un solo contenedor
- ❌ INCORRECTO: Poner elementos en contenedores innecesarios
- ❌ INCORRECTO: No analizar qué elementos van en contenedores y cuáles no
- ✅ CORRECTO: Analizar visualmente si cada elemento necesita contenedor
- ✅ CORRECTO: Verificar si el componente UBITS ya maneja su contenedor
- ✅ CORRECTO: Crear contenedores independientes solo cuando sea necesario
- ✅ CORRECTO: Documentar estructura de contenedores antes de implementar
- **Ver:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` para el proceso completo

---

## 16. ❌ **NO ANALIZAR SPACING ESPECÍFICAMENTE** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Usar spacing genérico para todo (`--ubits-spacing-md`)
- ❌ INCORRECTO: Adivinar el spacing sin medir visualmente
- ❌ INCORRECTO: No documentar spacing entre elementos
- ✅ CORRECTO: Medir visualmente el espacio entre cada elemento
- ✅ CORRECTO: Mapear a tokens UBITS específicos (xs, sm, md, lg, xl, etc.)
- ✅ CORRECTO: Documentar spacing entre elementos y dentro de contenedores
- ✅ CORRECTO: Crear mapa completo de spacing antes de implementar
- **Ver:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` para el proceso completo

---

## 17. ❌ **IMPLEMENTAR COMPONENTES EN TODOS LOS MÓDULOS** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Inicializar tabs/componentes sin verificar el módulo actual
- ❌ INCORRECTO: Implementar componentes que aparecen en TODOS los módulos (inicio, empresa, aprendizaje, etc.)
- ✅ CORRECTO: Verificar módulo actual ANTES de inicializar: `const currentModule = document.body.getAttribute('data-module')`
- ✅ CORRECTO: Retornar temprano (`return`) si no estamos en el módulo correcto
- ✅ CORRECTO: Aplicar verificación a TODAS las funciones de inicialización (tabs, DataTable, interceptaciones, observers)
- **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #8 para detalles completos

---

## 18. ❌ **ELIMINAR HEADERSECTION EN TODOS LOS MÓDULOS** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Eliminar HeaderSection sin verificar el módulo/sección actual
- ❌ INCORRECTO: Interceptar ContentManager para eliminar HeaderSection en TODOS los módulos
- ❌ INCORRECTO: Observer que elimina HeaderSection sin verificar módulo
- ✅ CORRECTO: Verificar módulo/sección ANTES de eliminar: `if (section !== 'encuestas') return`
- ✅ CORRECTO: Verificar en observer: `if (currentSection !== 'encuestas') return`
- ✅ CORRECTO: Llamar al método original para otros módulos (mantener HeaderSection)
- ✅ CORRECTO: Solo eliminar HeaderSection en el módulo específico donde la imagen no lo muestra
- **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #9 para detalles completos

---

## 19. ❌ **AGREGAR ELEMENTOS AL DOM SIN INTERCEPTAR CONTENTMANAGER** - ⚠️ CRÍTICO

- ❌ INCORRECTO: Agregar elementos a `.content-area` sin interceptar `updateContent`
- ❌ INCORRECTO: Asumir que los elementos estarán siempre disponibles
- ❌ INCORRECTO: No investigar el comportamiento de `ContentManager.updateContent`
- ✅ CORRECTO: Leer `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` antes de agregar elementos
- ✅ CORRECTO: Investigar el código fuente del ContentManager (línea 680: `contentArea.innerHTML = ''`)
- ✅ CORRECTO: Interceptar `updateContent` para preservar elementos personalizados
- ✅ CORRECTO: Guardar elementos ANTES de llamar al método original
- ✅ CORRECTO: Restaurar elementos DESPUÉS de que se actualice el contenido
- ✅ CORRECTO: Verificar módulo/sección antes de preservar elementos
- **Ver:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` para detalles completos

---

**Ver también:**
- `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Guía completa de errores comunes

