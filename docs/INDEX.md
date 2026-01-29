# 📚 Índice Maestro de Documentación - Autorun

**Última actualización:** 2026-01-29  
**Versión:** 2.0.0 (Migración a Antigravity)

> ⭐ **NUEVO:** Proyecto migrado a Antigravity. Reglas ahora modularizadas en `.agent/rules/`

> **⚠️ MCP SERVER DEPRECATED**  
> El MCP Server de Autorun está deprecado. Usa Workflows y Skills en `.agent/`  
> **Ver guía:** [MIGRATION.md](../MIGRATION.md)

---

## 🚀 Inicio Rápido

### Para Nuevos Usuarios:

- **[GETTING-STARTED.md](../GETTING-STARTED.md)** - ⭐ Empezar en 5 minutos
- **[QUICK-START.md](../QUICK-START.md)** - Solución de problemas
- **[README.md](../README.md)** - Visión general del proyecto

### Para Usuarios de Antigravity:

- **[.agent/rules/index.md](../.agent/rules/index.md)** - ⚠️ **OBLIGATORIO** Reglas modularizadas
- **[.agent/workflows/README.md](../.agent/workflows/README.md)** - Workflows (reemplazan MCP)
- **[.agent/skills/README.md](../.agent/skills/README.md)** - Skills reutilizables
- **[MIGRATION.md](../MIGRATION.md)** - 🔄 Migrar de MCP a Workflows/Skills


---

## 📖 Guías por Categoría

### 🔍 Análisis (`guias/analisis/`)

Guías para analizar estructura, iconos y spacing antes de implementar:

- **[GUIA-ANALISIS-ESTRUCTURA-SPACING.md](guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md)** - Análisis de estructura (contenedores) y spacing
- **[GUIA-ANALISIS-ICONOS-DETALLADO.md](guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md)** - Análisis detallado de iconos FontAwesome (variaciones, simple, etc.)
- **[GUIA-ANALISIS-DATATABLE-COMPLETO.md](guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md)** - Análisis completo del DataTable
- **[GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md](guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md)** - Análisis de funcionalidades del DataTable
- **[GUIA-DISTINGUIR-SUBNAV-TABS.md](guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md)** - Cómo distinguir SubNav de Tabs

**Ver todas:** [guias/analisis/](guias/analisis/)

---

### 🛠️ Implementación (`guias/implementacion/`)

Guías paso a paso para implementar componentes y funcionalidades:

- **[GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md](guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md)** - ⭐ Proceso de implementación paso a paso
- **[GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md](guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md)** - Crear desde imagen DESPUÉS del wizard
- **[GUIA-ELIMINAR-HEADERSECTION.md](guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md)** - ⚠️ Eliminar HeaderSection correctamente (solución completa)
- **[GUIA-SISTEMA-AUTOMATICO-PROBLEMAS-SOLUCIONES.md](guias/implementacion/GUIA-SISTEMA-AUTOMATICO-PROBLEMAS-SOLUCIONES.md)** - 🤖 Sistema automático de captura de problemas y soluciones
- **[GUIA-IMPLEMENTACION-POR-HISTORIAS-STORYBOOK.md](guias/implementacion/GUIA-IMPLEMENTACION-POR-HISTORIAS-STORYBOOK.md)** - ⭐ **NUEVO:** Implementar componentes dividiendo por historias de Storybook
- **[GUIA-NO-AGREGAR-ESTILOS-EXTRA-COMPONENTES.md](guias/implementacion/GUIA-NO-AGREGAR-ESTILOS-EXTRA-COMPONENTES.md)** - ⚠️ **CRÍTICO:** NO agregar padding, margin ni estilos extra a componentes automáticamente
- **[GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md](guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md)** - Implementación de DataTable funcionalidad por funcionalidad
- **[GUIA-USO-MCP-EN-IMPLEMENTACION.md](guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md)** - Usar MCPs para consultar componentes
- **[GUIA-VERIFICAR-STORYBOOK-VERCEL.md](guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md)** - Verificar Storybook en Vercel antes de implementar

**Ver todas:** [guias/implementacion/](guias/implementacion/)

### 🐛 Problemas y Soluciones (`problems-solutions/`)

Base de datos de problemas encontrados y soluciones aplicadas:

- **[Índice de Problemas y Soluciones](problems-solutions/index.json)** - ⭐ Índice completo de todos los problemas y soluciones
- **HeaderSection:** [Problema](problems-solutions/headersection/issue-001.md) | [Solución](problems-solutions/headersection/solution-001.md)

**Ver todas:** [problems-solutions/](problems-solutions/)

### 🤖 Add-ons (`packages/addons/functional/`)

Add-ons funcionales disponibles:

- **[Problem Tracker](packages/addons/functional/problem-tracker/README.md)** - ⭐ **NUEVO:** Sistema automático de captura de problemas y soluciones
- **[Feedback](packages/addons/functional/feedback/README.md)** - Sistema de recopilación de feedback

**Ver todos:** [packages/addons/functional/](packages/addons/functional/)

---

### 📖 Referencia (`guias/referencia/`)

Referencias rápidas de componentes, errores comunes y mejores prácticas:

- **[GUIA-USO-COMPONENTES-UBITS.md](guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)** - Cómo usar componentes UBITS
- **[GUIA-IDENTIFICACION-COMPONENTES.md](guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)** - Cómo identificar componentes desde imágenes
- **[GUIA-ERRORES-COMUNES-UBITS.md](guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md)** - ⚠️ Errores comunes a evitar
- **[GUIA-REVISION-COMPONENTES-UBITS.md](guias/referencia/GUIA-REVISION-COMPONENTES-UBITS.md)** - Cómo revisar componentes antes de implementar
- **[GUIA-CONTENTMANAGER-UPDATECONTENT.md](guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md)** - Prevenir eliminación de elementos al actualizar contenido

**Ver todas:** [guias/referencia/](guias/referencia/)

---

### 📚 Referencia de Componentes (`referencia/`)

Documentación detallada de componentes:

- **[catalogo-componentes.md](referencia/CATALOGO-COMPONENTES-UBITS.md)** - ⭐ Catálogo completo de componentes UBITS
- **[estrategia-componentes.md](referencia/ESTRATEGIA-COMPONENTES-UBITS.md)** - Estrategia de uso de componentes
- **[guia-trabajo-template.md](referencia/GUIA-TRABAJO-TEMPLATE.md)** - Guía completa para trabajar con templates

**Componentes documentados:** [referencia/componentes/](referencia/componentes/)

---

### 🔧 Configuración (`guias/configuracion/`)

Configuración de servicios externos:

- **[GUIA-SETUP-MCP-AUTOMATICO.md](guias/configuracion/GUIA-SETUP-MCP-AUTOMATICO.md)** - Setup automático de MCP
- **[GUIA-CONFIGURACION-STORYBOOK-MCP.md](guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md)** - Configuración de Storybook MCP
- **[GUIA-DUALIDAD-VERCEL-LOCAL.md](guias/configuracion/GUIA-DUALIDAD-VERCEL-LOCAL.md)** - Dualidad Vercel/Local
- **[GUIA-VERCEL-BYPASS-TOKEN.md](guias/configuracion/GUIA-VERCEL-BYPASS-TOKEN.md)** - Bypass token de Vercel
- **[GUIA-FALLBACK-STORYBOOK-GITHUB.md](guias/configuracion/GUIA-FALLBACK-STORYBOOK-GITHUB.md)** - 🔄 **NUEVO:** Sistema de fallback automático de Storybook a GitHub

**Ver todas:** [guias/configuracion/](guias/configuracion/)

---

### 🔧 Troubleshooting (`guias/troubleshooting/`)

Solución de problemas comunes:

- **[GUIA-PROBLEMAS-COMUNES-WIZARD.md](guias/troubleshooting/GUIA-PROBLEMAS-COMUNES-WIZARD.md)** - Problemas comunes del wizard y soluciones
- **[GUIA-PROBLEMAS-VALIDACION.md](guias/troubleshooting/GUIA-PROBLEMAS-VALIDACION.md)** - Problemas de validación y soluciones

**Ver todas:** [guias/troubleshooting/](guias/troubleshooting/)

---

### 📱 Uso (`guias/uso/`)

Guías de uso del wizard, templates y servidor local:

- **[GUIA-USO-WIZARD-AUTOMATICO.md](guias/uso/GUIA-USO-WIZARD-AUTOMATICO.md)** - Uso del wizard automático
- **[GUIA-TEMPLATES-WIZARD.md](guias/uso/GUIA-TEMPLATES-WIZARD.md)** - Templates creados por el wizard
- **[GUIA-SERVIDOR-LOCAL.md](guias/uso/GUIA-SERVIDOR-LOCAL.md)** - Guía del servidor local

**Ver todas:** [guias/uso/](guias/uso/)

---

### 🔌 Integración (`guias/integracion/`)

Guías de integración con servicios externos:

- **[GUIA-INTEGRACION-MCP.md](guias/integracion/GUIA-INTEGRACION-MCP.md)** - Integración con MCP

**Ver todas:** [guias/integracion/](guias/integracion/)

---

### 🔄 Recuperación (`guias/recuperacion/`)

Guías de recuperación de contenido:

- **[GUIA-PROCESO-RESTAURACION-CONTENIDO.md](guias/recuperacion/GUIA-PROCESO-RESTAURACION-CONTENIDO.md)** - Proceso de restauración de contenido

**Ver todas:** [guias/recuperacion/](guias/recuperacion/)

---

## 🗺️ Mapas de Flujo

### Flujo de Inicialización

1. Clonar repositorio
2. Instalar dependencias (`npm install`)
3. Configurar scripts (`npm run setup-project`)
4. Ejecutar wizard (`npm run wizard`)
5. Seleccionar template, módulo y producto
6. Trabajar en template generado

**Ver:** [INDEX.md](../INDEX.md)

---

### Flujo de Implementación desde Imagen

1. Detectar triggers de imagen
2. Leer guías obligatorias
3. Identificar template existente
4. Analizar imagen detalladamente
5. Crear plan de implementación
6. Mostrar análisis al usuario
7. Esperar aprobación
8. Implementar paso a paso

**Ver:** [guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md](guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md)

---

## 🔍 Búsqueda Rápida

### Quiero...

- **Empezar rápido:** [GETTING-STARTED.md](../GETTING-STARTED.md)
- **Resolver un problema:** [QUICK-START.md](../QUICK-START.md)
- **Implementar algo:** [guias/implementacion/](guias/implementacion/)
- **Entender componentes:** [guias/referencia/](guias/referencia/) o [referencia/componentes/](referencia/componentes/)
- **Configurar servicios:** [guias/configuracion/](guias/configuracion/)
- **Ver errores comunes:** [guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md](guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md)

---

## 📊 Análisis y Resúmenes (`analisis/`)

Documentos de análisis técnico y resúmenes de implementación:

- **[ANALISIS-PROBLEMAS-IMPLEMENTACION.md](analisis/ANALISIS-PROBLEMAS-IMPLEMENTACION.md)** - Análisis de problemas en la implementación
- **[ANALISIS-SISTEMA-IMPLEMENTACION-POR-HISTORIAS.md](analisis/ANALISIS-SISTEMA-IMPLEMENTACION-POR-HISTORIAS.md)** - ⭐ **NUEVO:** Análisis completo del sistema de implementación por historias de Storybook
- **[RESUMEN-FINAL.md](analisis/RESUMEN-FINAL.md)** - Resumen final del proyecto
- **[RESUMEN-IMPLEMENTACION-UBITS.md](analisis/RESUMEN-IMPLEMENTACION-UBITS.md)** - Resumen de implementación UBITS
- **[RESUMEN-IMPLEMENTACION-ADDONS.md](analisis/RESUMEN-IMPLEMENTACION-ADDONS.md)** - Resumen de implementación de add-ons
- **[RESUMEN-INTEGRACION-MCP.md](analisis/RESUMEN-INTEGRACION-MCP.md)** - Resumen de integración MCP

**Ver todas:** [analisis/](analisis/)

---

## 🔌 Add-ons (`addons/`)

Documentación de add-ons:

- **[ADDONS-FUNCIONALES-COMPLETO.md](addons/ADDONS-FUNCIONALES-COMPLETO.md)** - Add-ons funcionales completos
- **[RECOMENDACIONES-ADDONS.md](addons/RECOMENDACIONES-ADDONS.md)** - Recomendaciones de add-ons

**Ver todas:** [addons/](addons/)

---

## 📄 Documentación General

- **[GUIA-COMPLETA-AUTORUN.md](GUIA-COMPLETA-AUTORUN.md)** - Guía completa del proyecto Autorun
- **[GUIA-SETUP-UBITS.md](GUIA-SETUP-UBITS.md)** - Setup completo para proyectos UBITS

---

## 🎯 Reglas y Configuración (⭐ NUEVO en Antigravity)

### Reglas Modularizadas (`.agent/rules/`):

- **[.agent/rules/index.md](../.agent/rules/index.md)** - Índice completo de reglas
- **[.agent/rules/00-inicio.md](../.agent/rules/00-inicio.md)** - Verificación inicial (OBLIGATORIO)
- **[.agent/rules/01-deteccion-imagen.md](../.agent/rules/01-deteccion-imagen.md)** - Sistema de triggers
- **[.agent/rules/02-componentes.md](../.agent/rules/02-componentes.md)** - Uso de componentes UBITS
- **[.agent/rules/03-implementacion.md](../.agent/rules/03-implementacion.md)** - Proceso de implementación
- **[.agent/rules/04-errores.md](../.agent/rules/04-errores.md)** - Errores comunes

### Archivo Principal:

- **[.cursorrules](../.cursorrules)** - ⚠️ Índice simplificado (reducido de 962 → 130 líneas)

---

**Última actualización:** 2026-01-29  
**Versión:** 2.0.0 (Migración a Antigravity)
