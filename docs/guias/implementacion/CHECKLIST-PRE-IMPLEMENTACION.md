# ✅ Checklist Pre-Implementación de Componentes UBITS

## ⚠️ CRÍTICO: Este checklist DEBE completarse ANTES de implementar cualquier componente

---

## 📋 CHECKLIST OBLIGATORIO

### **FASE 1: CONSULTA OBLIGATORIA** 📚

#### ✅ **1.1 Consultar Storybook en Vercel (PRIMERO)** ⚠️ OBLIGATORIO

- [ ] **Acceder al Storybook en Vercel**
  - URL: `https://ubits-storybook10.vercel.app/`
  - Buscar componente específico (ej: `data-data-table`)
  - **⚠️ CRÍTICO:** Verificar que es el despliegue más reciente

- [ ] **Revisar pestaña "Code"**
  - [ ] Ver estructura de columnas
  - [ ] Ver estructura de filas
  - [ ] Ver configuración completa
  - [ ] **⚠️ CRÍTICO:** Copiar código exacto si es necesario

- [ ] **Revisar pestaña "Controls"**
  - [ ] Ver todos los tipos disponibles
  - [ ] Ver todas las opciones disponibles
  - [ ] Ver valores por defecto
  - [ ] **⚠️ CRÍTICO:** Verificar que las opciones que voy a usar existen

- [ ] **Documentar verificación**
  - [ ] Fecha de verificación
  - [ ] Versión consultada
  - [ ] Diferencias encontradas (si las hay)

**Guía:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - ⚠️ **OBLIGATORIO**

---

#### ✅ **1.2 Consultar Storybook MCP** ⚠️ OBLIGATORIO

- [ ] **Listar componentes disponibles**
  ```
  Usar: mcp_storybook_getComponentList
  ```
  - [ ] Verificar que el componente existe
  - [ ] Verificar el nombre exacto del componente

- [ ] **Obtener props detallados**
  ```
  Usar: mcp_storybook_getComponentsProps con el nombre del componente
  ```
  - [ ] Obtener todas las props disponibles
  - [ ] Verificar tipos de datos
  - [ ] Verificar valores por defecto
  - [ ] Verificar props requeridas vs opcionales

**Guía:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - ⚠️ **OBLIGATORIO**

---

#### ✅ **1.3 Consultar Documentación Específica** ⚠️ OBLIGATORIO

- [ ] **Leer documentación específica del componente**
  - [ ] `docs/referencia/componentes/[nombre-componente].md`
  - [ ] Ver mapeo completo en: `docs/referencia/componentes/README.md`

- [ ] **Identificar subcomponentes y subfuncionalidades**
  - [ ] **Subcomponentes:** Partes del componente (ej: Modal tiene Header, Body, Footer)
  - [ ] **Subfuncionalidades:** Funcionalidades específicas (ej: DataTable tiene checkboxes, action bar, filtros)
  - [ ] **Tipos/Variantes:** Diferentes tipos disponibles (ej: 11 tipos de columnas en DataTable)
  - [ ] **Estados:** Estados del componente (ej: activo, inactivo, disabled)

- [ ] **Leer reglas generales**
  - [ ] `.cursor/rules/03-componentes.md`
  - [ ] `.cursor/rules/04-implementacion.md`
  - [ ] `docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md`

**Guía:** `docs/referencia/ESTRATEGIA-IMPLEMENTACION-AUTOMATICA.md` - ⚠️ **OBLIGATORIO**

---

#### ✅ **1.4 Consultar Otros MCPs (si aplica)**

- [ ] **Figma MCP** (si necesito tokens de diseño)
  - [ ] Consultar tokens de diseño
  - [ ] Obtener colores, spacing, tipografía exactos

- [ ] **GitHub MCP** (si necesito código de ejemplo)
  - [ ] Consultar código de componentes en repositorios
  - [ ] Obtener ejemplos de implementación

- [ ] **Vercel MCP** (si necesito información de deployment)
  - [ ] Consultar deployments
  - [ ] Obtener información de proyectos

---

### **FASE 2: COMPARACIÓN Y VERIFICACIÓN** 🔍

- [ ] **Comparar Storybook en Vercel con código local**
  - [ ] ¿Los tipos de columnas coinciden?
  - [ ] ¿Las opciones disponibles coinciden?
  - [ ] ¿La estructura de datos coincide?

- [ ] **Si hay diferencias:**
  - [ ] ✅ Usar la versión del Storybook en Vercel (es la más actualizada)
  - [ ] ✅ Actualizar la implementación para usar la versión más reciente
  - [ ] ✅ Documentar los cambios

- [ ] **Verificar valores válidos:**
  - [ ] Para cada tipo de columna
  - [ ] Para cada opción de configuración

---

### **FASE 3: PLANIFICACIÓN** 📋

- [ ] **Dividir en tareas pequeñas:**
  - [ ] Tarea 1: Configuración básica
  - [ ] Tarea 2: Columnas y tipos
  - [ ] Tarea 3: Filas y datos
  - [ ] Tarea 4: Funcionalidades adicionales
  - [ ] etc.

- [ ] **Pedir aprobación antes de continuar:**
  - [ ] Mostrar plan al usuario
  - [ ] Esperar aprobación
  - [ ] Continuar solo después de aprobación

---

### **FASE 4: IMPLEMENTACIÓN** 🛠️

- [ ] **Usar información exacta:**
  - [ ] Props exactas obtenidas del Storybook en Vercel
  - [ ] Tokens exactos obtenidos del Storybook
  - [ ] Estructura exacta del componente
  - [ ] Variantes correctas

---

## 🚨 BLOQUEO AUTOMÁTICO

**Si NO se completan los pasos obligatorios (1.1, 1.2, 1.3), la implementación DEBE bloquearse.**

**Mensaje de error:**
```
❌ IMPLEMENTACIÓN BLOQUEADA

No se puede implementar el componente sin completar el checklist obligatorio:

- [ ] Consultar Storybook en Vercel (PRIMERO) ⚠️ OBLIGATORIO
- [ ] Consultar Storybook MCP ⚠️ OBLIGATORIO
- [ ] Consultar documentación específica ⚠️ OBLIGATORIO

Por favor, completa estos pasos antes de continuar.
```

---

## 📚 Referencias

- `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - ⚠️ **OBLIGATORIO**
- `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - ⚠️ **OBLIGATORIO**
- `docs/referencia/ESTRATEGIA-IMPLEMENTACION-AUTOMATICA.md` - ⚠️ **OBLIGATORIO**
- `.cursorrules` - Líneas 63-101

---

**Última actualización:** Diciembre 2024




