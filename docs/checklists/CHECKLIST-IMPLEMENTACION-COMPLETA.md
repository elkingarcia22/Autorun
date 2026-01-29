# ✅ Checklist Maestro de Implementación

Checklist completo para implementar interfaces desde imágenes o solicitudes.

---

## 🔍 Fase 1: Análisis

### Detección
- [ ] Verificados triggers de imagen
- [ ] Leídas guías obligatorias
- [ ] Identificado template existente

### Análisis de Imagen
- [ ] Componentes UBITS identificados
- [ ] Estructura analizada (contenedores y orden)
- [ ] Spacing medido visualmente (NO asumido)
- [ ] Iconos verificados con variaciones
- [ ] Funcionalidades listadas
- [ ] HeaderSection verificado (¿está o no está?)
- [ ] SubNav vs Tabs distinguidos correctamente

### Si hay DataTable
- [ ] Consultado Storybook en Vercel
- [ ] Leída guía de funcionalidades: `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md`
- [ ] Listadas TODAS las funcionalidades con SÍ/NO
- [ ] Columnas analizadas (cantidad y tipo)
- [ ] Items contados en la imagen

---

## 📋 Fase 2: Planificación

- [ ] Plan de implementación creado
- [ ] Tareas divididas en pasos pequeños
- [ ] Plan mostrado al usuario
- [ ] Aprobación recibida

### Planificación de ContentManager
- [ ] Verificado si se agregan elementos a `.content-area`
- [ ] Leída guía: `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- [ ] Planificada interceptación de `updateContent` (si aplica)

---

## 🛠️ Fase 3: Implementación

### Por Cada Tarea

#### Antes de Implementar
- [ ] Consultado Storybook en Vercel (versión más reciente)
- [ ] Revisada pestaña "Code" para estructura exacta
- [ ] Revisada pestaña "Controls" para opciones disponibles
- [ ] Revisado archivo de tipos del componente (si aplica)
- [ ] Verificado módulo actual antes de inicializar

#### Durante la Implementación
- [ ] Tarea implementada completamente
- [ ] Logs apropiados agregados (prefijos, emojis, contexto)
- [ ] ContentManager interceptado (si aplica)
- [ ] Event listeners agregados correctamente
- [ ] Verificado módulo/sección antes de preservar elementos

#### Después de Implementar
- [ ] Validación ejecutada (`npm run lint`)
- [ ] Errores corregidos automáticamente
- [ ] Funcionalidad verificada manualmente
- [ ] Logs verificados en consola
- [ ] Event listeners funcionan correctamente
- [ ] Resultado mostrado al usuario
- [ ] Aprobación recibida antes de continuar

---

## 🎯 Verificación Final

- [ ] Todos los componentes funcionan
- [ ] Event listeners funcionan (especialmente después de restaurar HTML)
- [ ] ContentManager interceptado correctamente (si aplica)
- [ ] Módulo verificado correctamente
- [ ] Validación pasa sin errores
- [ ] Spacing coincide con la imagen (medido visualmente)
- [ ] Iconos correctos (con variaciones verificadas)
- [ ] HeaderSection manejado correctamente
- [ ] SubNav vs Tabs distinguidos correctamente

### Si hay DataTable
- [ ] Todas las funcionalidades implementadas según análisis
- [ ] Funcionalidades NO presentes desactivadas
- [ ] Tipos de columnas correctos
- [ ] Altura dinámica configurada (si aplica)
- [ ] Action Bar implementado (si `showCheckbox: true`)
- [ ] Selecciones rastreadas correctamente

---

## 🚨 Errores Comunes a Verificar

- [ ] NO se asumió spacing sin medir visualmente
- [ ] NO se implementó todo de golpe
- [ ] NO se omitieron sufijos en iconos (`-simple` si aplica)
- [ ] NO se usaron prefijos en iconos (`fa-` no necesario)
- [ ] NO se aplicó padding al contenedor interno del componente
- [ ] NO se dejó `.content-sections` por defecto cuando hay componentes personalizados
- [ ] NO se asumió que elementos restaurados tienen event listeners
- [ ] NO se implementaron componentes en todos los módulos
- [ ] NO se eliminó HeaderSection en todos los módulos

---

## 📖 Referencias

- **Guía maestra:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-MAESTRA.md`
- **Proceso completo:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- **ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`

---

**Última actualización:** 2025-01-03










