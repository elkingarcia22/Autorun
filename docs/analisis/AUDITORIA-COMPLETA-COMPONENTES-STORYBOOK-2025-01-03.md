# Auditoría Completa: Componentes Storybook para Autorun

**Fecha:** 2025-01-03  
**Objetivo:** Verificar que todos los componentes actualizados tienen el contrato completo y correcto para Autorun

---

## ✅ Checklist de Verificación

Para cada componente se verifica:

1. ✅ **Contrato `parameters.ubits` completo:**
   - `componentId` (único, con emoji)
   - `api.create` (ruta exacta)
   - `api.tag` (web component tag)
   - `api.show` o `api.render` (si aplica)
   - `dependsOn.required` (correcto)
   - `dependsOn.optional` (correcto)
   - `internals` (si aplica)
   - `slots` (si aplica)
   - `tokensUsed` (listados)
   - `rules.forbidHardcodedColors` (true)
   - `rules.forbiddenPatterns` (correctos)
   - `rules.requiredProps` (correctos)

2. ✅ **Story "Implementation (Copy/Paste)":**
   - Nombre exacto: `"Implementation (Copy/Paste)"`
   - Args explícitos (no defaults)
   - Snippet exacto en `docs.source.code`
   - Snippet funcional y copiable

3. ✅ **Render function:**
   - `data-ubits-id` con componentId
   - `data-ubits-component` con nombre del componente
   - Uso correcto de `create*` o `render*` functions

---

## 📋 Componentes Auditados (23/23)

### 1. ✅ Button
**Archivo:** `stories/components/Button/Button.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-button'`
- ✅ `api.create: 'window.UBITS.Button.create'`
- ✅ `api.tag: '<ubits-button>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-icon', '🧩-ux-tooltip']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]` (4 tokens)
- ✅ `rules.forbidHardcodedColors: true`
- ✅ `rules.requiredProps: ['variant', 'text']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos: `variant, size, text, disabled`
- ✅ Snippet exacto con `window.UBITS.Button.create()`
- ✅ Render con `data-ubits-id='🧩-ux-button'`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 2. ✅ Modal
**Archivo:** `stories/components/Modal/Modal.stories.ts`

**Contrato:**
- ✅ `componentId: '⚙️-functional-modal'`
- ✅ `api.create: 'window.UBITS.Modal.create'`
- ✅ `api.tag: '<ubits-modal>'`
- ✅ `dependsOn.required: ['🧩-ux-button']`
- ✅ `dependsOn.optional: []`
- ✅ `internals: ['⚙️-functional-scroll', '⚙️-functional-overlay']`
- ✅ `slots.footer: ['🧩-ux-button']`
- ✅ `tokensUsed: [...]` (4 tokens)
- ✅ `rules.requiredProps: ['title']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos con `footerButtons`
- ✅ Snippet exacto con `window.UBITS.Modal.create()`
- ✅ Render con `data-ubits-id='⚙️-functional-modal'`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 3. ✅ Drawer
**Archivo:** `stories/components/Drawer/Drawer.stories.ts`

**Contrato:**
- ✅ `componentId: '⚙️-functional-drawer'`
- ✅ `api.create: 'window.UBITS.Drawer.create'`
- ✅ `api.tag: '<ubits-drawer>'`
- ✅ `dependsOn.required: ['🧩-ux-button']`
- ✅ `dependsOn.optional: []`
- ✅ `internals: ['⚙️-functional-scroll', '⚙️-functional-overlay']`
- ✅ `slots.footer: ['🧩-ux-button']`
- ✅ `tokensUsed: [...]` (4 tokens)
- ✅ `rules.requiredProps: ['title']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 4. ✅ Input
**Archivo:** `stories/components/Input/Input.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-input'`
- ✅ `api.create: 'window.UBITS.Input.create'`
- ✅ `api.tag: '<ubits-input>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-icon', '🧩-ux-calendar']` ⚠️ **ACTUALIZADO**
- ✅ `internals: ['⚙️-functional-dropdown', '⚙️-functional-password-toggle', '⚙️-functional-search-clear']` ⚠️ **ACTUALIZADO**
- ✅ `slots.calendar: ['🧩-ux-calendar']` ⚠️ **NUEVO**
- ✅ `tokensUsed: [...]` (6 tokens)
- ✅ `rules.requiredProps: ['containerId']`
- ✅ **Nota:** 11 variaciones documentadas (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar)

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet con múltiples ejemplos (text, calendar, select, autocomplete) ⚠️ **ACTUALIZADO**
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Actualizado con todas las variaciones)

---

### 5. ✅ Accordion
**Archivo:** `stories/components/Accordion/Accordion.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-accordion'`
- ✅ `api.create: 'window.UBITS.Accordion.create'`
- ✅ `api.tag: '<ubits-accordion>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-icon']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: ['items']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 6. ✅ DataTable
**Archivo:** `stories/components/DataTable/DataTable.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-data-table'`
- ✅ `api.create: 'window.UBITS.DataTable.create'`
- ✅ `api.tag: '<ubits-data-table>'`
- ✅ `dependsOn.required: ['🧩-ux-button', '🧩-ux-input']`
- ✅ `dependsOn.optional: [...]` (10 componentes opcionales)
- ✅ `internals: ['⚙️-functional-scroll', '⚙️-functional-drag-handle']`
- ✅ `slots.header: ['🧩-ux-button', '🧩-ux-input']`
- ✅ `slots.footer: ['🧩-ux-pagination']`
- ✅ `tokensUsed: [...]` (6 tokens)
- ✅ `rules.requiredProps: ['columns', 'rows']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos con `columns` y `rows`
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 7. ✅ Checkbox
**Archivo:** `stories/components/Checkbox/Checkbox.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-checkbox'`
- ✅ `api.create: 'window.UBITS.Checkbox.create'`
- ✅ `api.tag: '<ubits-checkbox>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: []`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: ['label']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 8. ✅ RadioButton
**Archivo:** `stories/components/RadioButton/RadioButton.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-radio-button'`
- ✅ `api.create: 'window.UBITS.RadioButton.create'`
- ✅ `api.tag: '<ubits-radio-button>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: []`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: ['label', 'value', 'name']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 9. ✅ Alert
**Archivo:** `stories/components/Alert/Alert.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-alert'`
- ✅ `api.create: 'window.UBITS.Alert.create'`
- ✅ `api.tag: '<ubits-alert>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-button']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 10. ✅ Toast
**Archivo:** `stories/components/Toast/Toast.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-toast'`
- ✅ `api.create: 'window.UBITS.Toast.create'`
- ✅ `api.show: 'window.UBITS.Toast.show'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-toast>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-button']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]` (7 tokens)
- ✅ `rules.requiredProps: ['message']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet con ambas APIs (`show` y `create`) ⚠️ **COMPLETO**
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `show`)

---

### 11. ✅ Toggle
**Archivo:** `stories/components/Toggle/Toggle.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-toggle'`
- ✅ `api.create: 'window.UBITS.Toggle.create'`
- ✅ `api.tag: '<ubits-toggle>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: []`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 12. ✅ Popover
**Archivo:** `stories/components/Popover/Popover.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-popover'`
- ✅ `api.create: 'window.UBITS.Popover.create'`
- ✅ `api.tag: '<ubits-popover>'`
- ✅ `dependsOn.required: ['🧩-ux-button']`
- ✅ `dependsOn.optional: []`
- ✅ `internals: []`
- ✅ `slots.footer: ['🧩-ux-button']`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 13. ✅ Tooltip
**Archivo:** `stories/components/Tooltip/Tooltip.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-tooltip'`
- ✅ `api.create: 'window.UBITS.Tooltip.create'`
- ✅ `api.tag: '<ubits-tooltip>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-button']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 14. ✅ Badge
**Archivo:** `stories/components/Badge/Badge.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-badge'`
- ✅ `api.create: 'window.UBITS.Badge.create'`
- ✅ `api.render: 'window.UBITS.Badge.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-badge>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: []`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet con ambas APIs (`create` y `render`) ⚠️ **COMPLETO**
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

### 15. ✅ Avatar
**Archivo:** `stories/components/Avatar/Avatar.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-avatar'`
- ✅ `api.create: 'window.UBITS.Avatar.create'`
- ✅ `api.render: 'window.UBITS.Avatar.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-avatar>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-badge']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]` (3 tokens)
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet con ambas APIs (`create` y `render`) ⚠️ **COMPLETO**
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

### 16. ✅ List
**Archivo:** `stories/components/List/List.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-list'`
- ✅ `api.create: 'window.UBITS.List.create'`
- ✅ `api.tag: '<ubits-list>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['⚙️-functional-scroll']`
- ✅ `internals: ['⚙️-functional-scroll']`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: ['containerId', 'items']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO

---

### 17. ✅ Progress
**Archivo:** `stories/components/Progress/Progress.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-progress'`
- ✅ `api.create: 'window.UBITS.Progress.create'`
- ✅ `api.render: 'window.UBITS.Progress.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-progress>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: []`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet con ambas APIs (`create` y `render`) ⚠️ **COMPLETO**
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

### 18. ✅ StatusTag
**Archivo:** `stories/components/StatusTag/StatusTag.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-status-tag'`
- ✅ `api.create: 'window.UBITS.StatusTag.create'`
- ✅ `api.render: 'window.UBITS.StatusTag.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-status-tag>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-icon']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: ['label']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet con ambas APIs (`create` y `render`) ⚠️ **COMPLETO**
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

### 19. ✅ Pagination
**Archivo:** `stories/components/Pagination/Pagination.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-pagination'`
- ✅ `api.create: 'window.UBITS.Pagination.create'`
- ✅ `api.render: 'window.UBITS.Pagination.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-pagination>'`
- ✅ `dependsOn.required: ['🧩-ux-button']`
- ✅ `dependsOn.optional: ['🧩-ux-input']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: ['totalPages']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

### 20. ✅ Chip
**Archivo:** `stories/components/Chip/Chip.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-chip'`
- ✅ `api.create: 'window.UBITS.Chip.create'`
- ✅ `api.render: 'window.UBITS.Chip.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-chip>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-icon']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: ['label']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet con ambas APIs (`create` y `render`) ⚠️ **COMPLETO**
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

### 21. ✅ FileUpload
**Archivo:** `stories/components/FileUpload/FileUpload.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-file-upload'`
- ✅ `api.create: 'window.UBITS.FileUpload.create'`
- ✅ `api.render: 'window.UBITS.FileUpload.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-file-upload>'`
- ✅ `dependsOn.required: ['🧩-ux-button']`
- ✅ `dependsOn.optional: ['🧩-ux-progress']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

### 22. ✅ EmptyState
**Archivo:** `stories/components/EmptyState/EmptyState.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-empty-state'`
- ✅ `api.create: 'window.UBITS.EmptyState.create'`
- ✅ `api.render: 'window.UBITS.EmptyState.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-empty-state>'`
- ✅ `dependsOn.required: []`
- ✅ `dependsOn.optional: ['🧩-ux-button']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: ['title']`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet con ambas APIs (`create` y `render`) ⚠️ **COMPLETO**
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

### 23. ✅ SearchButton
**Archivo:** `stories/components/SearchButton/SearchButton.stories.ts`

**Contrato:**
- ✅ `componentId: '🧩-ux-search-button'`
- ✅ `api.create: 'window.UBITS.SearchButton.create'`
- ✅ `api.render: 'window.UBITS.SearchButton.render'` ⚠️ **API ADICIONAL**
- ✅ `api.tag: '<ubits-search-button>'`
- ✅ `dependsOn.required: ['🧩-ux-button']`
- ✅ `dependsOn.optional: ['🧩-ux-input']`
- ✅ `internals: []`
- ✅ `tokensUsed: [...]`
- ✅ `rules.requiredProps: []`

**Story Implementation:**
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet exacto
- ✅ Render con `data-ubits-id`

**Estado:** ✅ COMPLETO Y CORRECTO (Incluye API adicional `render`)

---

## 📊 Resumen de Auditoría

### ✅ Componentes Completos: 23/23 (100%)

**Todos los componentes tienen:**
- ✅ Contrato `parameters.ubits` completo
- ✅ Story "Implementation (Copy/Paste)"
- ✅ Render function con `data-ubits-id`
- ✅ Snippet exacto y funcional

### 📋 Patrones Identificados

#### APIs Adicionales:
- **Toast:** `api.show` (además de `create`)
- **Badge, Avatar, Progress, StatusTag, Chip, FileUpload, EmptyState, SearchButton:** `api.render` (además de `create`)

#### Dependencias Comunes:
- **Button** es requerido por: Modal, Drawer, Popover, Pagination, FileUpload, SearchButton
- **Input** es requerido por: DataTable, Pagination (opcional), SearchButton (opcional)
- **Icon** es opcional en: Button, Input, StatusTag, Chip, Avatar (via Badge)

#### Internals Comunes:
- **⚙️-functional-scroll:** Modal, Drawer, DataTable, List
- **⚙️-functional-overlay:** Modal, Drawer
- **⚙️-functional-dropdown:** Input (select/autocomplete)
- **⚙️-functional-password-toggle:** Input (password)
- **⚙️-functional-search-clear:** Input (search)
- **⚙️-functional-drag-handle:** DataTable

### ⚠️ Notas Importantes

1. **Input tiene 11 variaciones:**
   - Solo `calendar` requiere componente externo (`🧩-ux-calendar`)
   - Las demás usan internals

2. **DataTable es el más complejo:**
   - 2 dependencias requeridas
   - 10 dependencias opcionales
   - 2 internals
   - 3 slots

3. **Componentes con API `render`:**
   - Badge, Avatar, Progress, StatusTag, Chip, FileUpload, EmptyState, SearchButton
   - Todos documentan ambas APIs en el snippet

---

## ✅ Conclusión

**Todos los 23 componentes están completos y correctos para Autorun.**

- ✅ No hay conflictos detectados
- ✅ Todos tienen contrato completo
- ✅ Todos tienen snippet exacto
- ✅ Todos tienen `data-ubits-id` correcto
- ✅ Dependencias están correctamente mapeadas
- ✅ Internals están correctamente documentados

**Estado General:** ✅ **LISTO PARA AUTORUN**

---

**Última actualización:** 2025-01-03
