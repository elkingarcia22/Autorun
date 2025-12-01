# 🔍 Guía: Revisión de Componentes UBITS Antes de Implementar

Esta guía establece el proceso **OBLIGATORIO** para revisar componentes UBITS antes de implementarlos. **NUNCA implementar un componente sin revisar primero sus variantes, controladores y funcionalidades.**

---

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"Conoce antes de implementar"** - Revisar el archivo de tipos del componente para identificar todas sus capacidades y dividir la implementación en tareas independientes.

---

## 📋 PROCESO DE REVISIÓN (OBLIGATORIO)

### **Paso 1: Localizar Archivo de Tipos** 📁

**Ubicación estándar:**
```
vendor/ubits/packages/components/[nombre-componente]/src/types/[Nombre]Options.ts
```

**Ejemplos:**
- Button: `vendor/ubits/packages/components/button/src/types/ButtonOptions.ts`
- DataTable: `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- Input: `vendor/ubits/packages/components/input/src/types/InputOptions.ts`
- Tabs: `vendor/ubits/packages/components/tabs/src/types/TabsOptions.ts`
- Sidebar: `vendor/ubits/packages/components/sidebar/src/types/SidebarOptions.ts`
- SubNav: `vendor/ubits/packages/components/subnav/src/types/SubNavOptions.ts`

---

### **Paso 2: Identificar Variantes** 🎨

**¿Qué son las variantes?**
- Opciones que cambian la apariencia o comportamiento del componente
- Generalmente son tipos union (ej: `'primary' | 'secondary' | 'ghost'`)
- Pueden ser tamaños (ej: `'sm' | 'md' | 'lg'`)

**Buscar en el archivo de tipos:**
```typescript
// Ejemplo: ButtonOptions.ts
variant?: ButtonVariant;  // 'primary' | 'secondary' | 'ghost' | 'danger'
size?: ButtonSize;        // 'sm' | 'md' | 'lg'
```

**Listar todas las variantes encontradas:**
```markdown
### Variantes identificadas:
- **variant:** 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
- **size:** 'sm' | 'md' | 'lg'
```

---

### **Paso 3: Identificar Controladores** 🎛️

**¿Qué son los controladores?**
- Opciones booleanas que "prende/apaga" funcionalidades
- Opciones de configuración que habilitan/deshabilitan características
- Callbacks/eventos que se pueden configurar

**Buscar en el archivo de tipos:**
```typescript
// Ejemplo: DataTableOptions.ts
showCheckbox?: boolean;              // Controlador: prende/apaga checkboxes
rowReorderable?: boolean;            // Controlador: prende/apaga arrastrar filas
columnReorderable?: boolean;         // Controlador: prende/apaga arrastrar columnas
columnSortable?: boolean;            // Controlador: prende/apaga ordenamiento
onRowSelect?: (rows) => void;        // Callback: evento de selección
onSort?: (column, direction) => void; // Callback: evento de ordenamiento
```

**Listar todos los controladores encontrados:**
```markdown
### Controladores identificados:
- **showCheckbox:** boolean - Prende/apaga checkboxes
- **rowReorderable:** boolean - Prende/apaga arrastrar filas
- **columnReorderable:** boolean - Prende/apaga arrastrar columnas
- **columnSortable:** boolean - Prende/apaga ordenamiento
- **onRowSelect:** callback - Evento cuando se selecciona una fila
- **onSort:** callback - Evento cuando se ordena una columna
```

---

### **Paso 4: Identificar Funcionalidades** ⚙️

**¿Qué son las funcionalidades?**
- Características completas que el componente puede hacer
- Cada controlador generalmente corresponde a una funcionalidad
- Pueden ser combinaciones de opciones

**Mapear controladores a funcionalidades:**
```markdown
### Funcionalidades identificadas:
1. **Checkboxes** - Controlado por: `showCheckbox: true`
2. **Arrastrar y soltar filas** - Controlado por: `rowReorderable: true`
3. **Arrastrar y soltar columnas** - Controlado por: `columnReorderable: true`
4. **Ordenamiento** - Controlado por: `columnSortable: true`
5. **Fijar columnas** - Controlado por: `column.sticky: 'left' | 'right'`
6. **Selector de columnas** - Controlado por: `header.columnSelectorButton: true`
7. **Barra de acciones (selección única)** - Controlado por: `header.actionBar.showOnSingleSelect: true`
8. **Barra de acciones (selección múltiple)** - Controlado por: `header.actionBar.showOnMultipleSelect: true`
9. **Dropdown con filtros** - Controlado por: `header.filterButton: true`
10. **Buscador** - Controlado por: `search.enabled: true` o implementación personalizada
```

---

### **Paso 5: Dividir en Tareas Independientes** 📝

**Cada funcionalidad = Una tarea independiente**

**Ejemplo de división para DataTable:**
```markdown
### Plan de implementación:
- **Tarea 1:** DataTable básico (solo estructura y columnas)
- **Tarea 2:** Checkboxes (`showCheckbox: true`)
- **Tarea 3:** Arrastrar y soltar filas (`rowReorderable: true`)
- **Tarea 4:** Arrastrar y soltar columnas (`columnReorderable: true`)
- **Tarea 5:** Ordenamiento (`columnSortable: true`)
- **Tarea 6:** Fijar columnas (`column.sticky`)
- **Tarea 7:** Selector de columnas (`header.columnSelectorButton: true`)
- **Tarea 8:** Barra de acciones (selección única) (`header.actionBar.showOnSingleSelect: true`)
- **Tarea 9:** Barra de acciones (selección múltiple) (`header.actionBar.showOnMultipleSelect: true`)
- **Tarea 10:** Dropdown con filtros (`header.filterButton: true`)
- **Tarea 11:** Buscador (implementación personalizada con componentes UBITS)
```

---

### **Paso 6: Presentar Plan al Usuario** 👤

**Formato de presentación:**
```markdown
## 🔍 Revisión de Componente: [Nombre del Componente]

### Archivo de tipos revisado:
`vendor/ubits/packages/components/[nombre]/src/types/[Nombre]Options.ts`

### Variantes identificadas:
- [Lista de variantes]

### Controladores identificados:
- [Lista de controladores con descripción]

### Funcionalidades identificadas:
1. [Funcionalidad 1] - Controlado por: [controlador]
2. [Funcionalidad 2] - Controlado por: [controlador]
...

### Plan de implementación:
- Tarea 1: [Funcionalidad básica]
- Tarea 2: [Funcionalidad 2]
...

### ¿Aprobamos este plan?
```

---

## 🎯 EJEMPLOS COMPLETOS

### **Ejemplo 1: Revisión de Button**

**Archivo:** `vendor/ubits/packages/components/button/src/types/ButtonOptions.ts`

**Variantes identificadas:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
- `size`: 'sm' | 'md' | 'lg'

**Controladores identificados:**
- `disabled`: boolean - Deshabilita el botón
- `loading`: boolean - Muestra estado de carga
- `iconOnly`: boolean - Solo muestra icono, sin texto
- `fullWidth`: boolean - Ancho completo
- `dropdown`: boolean - Activa funcionalidad dropdown
- `showTooltip`: boolean - Muestra tooltip (solo icon-only)

**Funcionalidades identificadas:**
1. Botón básico (texto + variante)
2. Botón con icono (`icon: string`)
3. Botón icon-only (`iconOnly: true`)
4. Botón con loading (`loading: true`)
5. Botón deshabilitado (`disabled: true`)
6. Botón con dropdown (`dropdown: true`)
7. Botón con tooltip (`showTooltip: true`)

---

### **Ejemplo 2: Revisión de DataTable**

**Archivo:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`

**Variantes identificadas:**
- Tipos de columna: 'text' | 'estado' | 'fecha' | 'progreso' | 'checkbox' | 'acciones'
- Tipos de fila: datos normales, grupos

**Controladores identificados:**
- `showCheckbox`: boolean - Prende/apaga checkboxes
- `rowReorderable`: boolean - Prende/apaga arrastrar filas
- `columnReorderable`: boolean - Prende/apaga arrastrar columnas
- `columnSortable`: boolean - Prende/apaga ordenamiento
- `header.filterButton`: boolean - Prende/apaga botón de filtros
- `header.columnSelectorButton`: boolean - Prende/apaga selector de columnas
- `header.actionBar.showOnSingleSelect`: boolean - Prende/apaga barra acciones (1 fila)
- `header.actionBar.showOnMultipleSelect`: boolean - Prende/apaga barra acciones (múltiples)

**Funcionalidades identificadas:**
1. Checkboxes (`showCheckbox: true`)
2. Arrastrar y soltar filas (`rowReorderable: true`)
3. Arrastrar y soltar columnas (`columnReorderable: true`)
4. Ordenamiento (`columnSortable: true`)
5. Fijar columnas (`column.sticky: 'left' | 'right'`)
6. Selector de columnas (`header.columnSelectorButton: true`)
7. Barra de acciones (selección única) (`header.actionBar.showOnSingleSelect: true`)
8. Barra de acciones (selección múltiple) (`header.actionBar.showOnMultipleSelect: true`)
9. Dropdown con filtros (`header.filterButton: true`)
10. Buscador (implementación personalizada)

---

## 🚨 REGLAS CRÍTICAS

### **1. NUNCA Implementar Sin Revisar**
- ❌ NO implementar componente sin leer su archivo de tipos
- ✅ SIEMPRE revisar variantes, controladores y funcionalidades primero

### **2. SIEMPRE Dividir Funcionalidades**
- ❌ NO implementar todas las funcionalidades de golpe
- ✅ SIEMPRE dividir en tareas independientes (una funcionalidad = una tarea)

### **3. SIEMPRE Presentar Plan**
- ❌ NO implementar sin mostrar plan al usuario
- ✅ SIEMPRE mostrar variantes, controladores y plan de implementación
- ✅ SIEMPRE esperar aprobación explícita

### **4. SIEMPRE Mapear Controladores a Funcionalidades**
- ❌ NO confundir controladores con funcionalidades
- ✅ SIEMPRE entender qué controlador activa qué funcionalidad
- ✅ SIEMPRE documentar la relación controlador-funcionalidad

---

## 🔗 Referencias

- **Guía de implementación:** `GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Guía de DataTable:** `GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Catálogo de componentes:** `CATALOGO-COMPONENTES-UBITS.md`
- **Componentes UBITS:** `vendor/ubits/packages/components/`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

