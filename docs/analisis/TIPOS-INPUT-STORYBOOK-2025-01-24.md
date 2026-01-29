# 📋 Tipos de Input Disponibles en Storybook

**Fecha:** 2025-01-24  
**Componente:** Input  
**Fuente:** Storybook MCP + Código fuente

---

## 📊 Resumen

El componente **Input** de UBITS soporta **11 tipos diferentes** de inputs, cada uno con funcionalidades específicas.

---

## 📝 Lista Completa de Tipos de Input

### **1. `text`** 📝
- **Descripción:** Campo de texto simple
- **Uso:** Nombres, descripciones, texto libre
- **Dependencias:** Ninguna
- **Subcomponentes:** Ninguno
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'text',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre'
  });
  ```

### **2. `email`** 📧
- **Descripción:** Campo de email con validación HTML5
- **Uso:** Direcciones de correo electrónico
- **Dependencias:** Ninguna
- **Subcomponentes:** Ninguno
- **Validación:** Automática (HTML5)
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'email',
    label: 'Email',
    placeholder: 'correo@ejemplo.com'
  });
  ```

### **3. `password`** 🔒
- **Descripción:** Campo de contraseña con toggle mostrar/ocultar
- **Uso:** Campos de contraseña (oculta caracteres)
- **Dependencias:** Ninguna
- **Subcomponentes:** `⚙️-functional-password-toggle` (toggle mostrar/ocultar)
- **Características:** Botón para mostrar/ocultar contraseña
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña'
  });
  ```

### **4. `number`** 🔢
- **Descripción:** Campo numérico
- **Uso:** Valores numéricos
- **Dependencias:** Ninguna
- **Subcomponentes:** Ninguno
- **Características:** Validación numérica, controles de incremento/decremento
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'number',
    label: 'Cantidad',
    placeholder: '0'
  });
  ```

### **5. `tel`** 📞
- **Descripción:** Campo de teléfono
- **Uso:** Números telefónicos
- **Dependencias:** Ninguna
- **Subcomponentes:** Ninguno
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'tel',
    label: 'Teléfono',
    placeholder: '+57 300 123 4567'
  });
  ```

### **6. `url`** 🔗
- **Descripción:** Campo de URL
- **Uso:** Enlaces web
- **Dependencias:** Ninguna
- **Subcomponentes:** Ninguno
- **Validación:** Automática (HTML5)
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'url',
    label: 'URL',
    placeholder: 'https://ejemplo.com'
  });
  ```

### **7. `select`** 📋
- **Descripción:** Selector con dropdown personalizado
- **Uso:** Lista desplegable de opciones predefinidas
- **Dependencias:** Ninguna
- **Subcomponentes:** `⚙️-functional-dropdown` (dropdown personalizado)
- **Requiere:** `selectOptions: SelectOption[]`
- **Estructura de SelectOption:**
  ```typescript
  interface SelectOption {
    value: string;  // Valor de la opción
    text: string;  // Texto visible
  }
  ```
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'select',
    label: 'País',
    selectOptions: [
      { value: 'co', text: 'Colombia' },
      { value: 'mx', text: 'México' },
      { value: 'ar', text: 'Argentina' }
    ]
  });
  ```

### **8. `textarea`** 📄
- **Descripción:** Área de texto multilínea
- **Uso:** Texto largo, comentarios, descripciones extensas
- **Dependencias:** Ninguna
- **Subcomponentes:** Ninguno
- **Características:** 
  - Soporta barra de herramientas de texto enriquecido (opcional)
  - `showRichTextToolbar: boolean` (default: false)
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'textarea',
    label: 'Comentarios',
    placeholder: 'Escribe tus comentarios aquí...',
    showRichTextToolbar: true  // Opcional
  });
  ```

### **9. `search`** 🔍
- **Descripción:** Campo de búsqueda con botón de limpiar
- **Uso:** Campos de búsqueda
- **Dependencias:** Ninguna
- **Subcomponentes:** `⚙️-functional-search-clear` (botón de limpiar)
- **Características:** Botón para limpiar el campo de búsqueda
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'search',
    label: 'Buscar',
    placeholder: 'Buscar...'
  });
  ```

### **10. `autocomplete`** 🔤
- **Descripción:** Input con autocompletado y dropdown de sugerencias
- **Uso:** Búsqueda con sugerencias automáticas
- **Dependencias:** Ninguna
- **Subcomponentes:** `⚙️-functional-dropdown` (dropdown de sugerencias)
- **Requiere:** `autocompleteOptions: AutocompleteOption[]`
- **Estructura de AutocompleteOption:**
  ```typescript
  interface AutocompleteOption {
    value: string;  // Valor de la opción
    text: string;  // Texto visible
  }
  ```
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'autocomplete',
    label: 'Ciudad',
    placeholder: 'Buscar ciudad...',
    autocompleteOptions: [
      { value: 'bogota', text: 'Bogotá' },
      { value: 'medellin', text: 'Medellín' },
      { value: 'cali', text: 'Cali' }
    ]
  });
  ```

### **11. `calendar`** 📅
- **Descripción:** Input de fecha con date picker
- **Uso:** Selección de fechas
- **Dependencias:** `🧩-ux-calendar` (componente Calendar UBITS)
- **Subcomponentes:** Ninguno (usa componente externo)
- **Características:** 
  - Requiere importar `CalendarProvider` dinámicamente
  - Campo readonly que abre calendario al hacer clic
- **Ejemplo:**
  ```javascript
  window.UBITS.Input.create({
    containerId: 'input-container',
    type: 'calendar',
    label: 'Fecha',
    placeholder: 'Selecciona una fecha'
  });
  ```

---

## 📊 Clasificación de Tipos

### **Tipos Básicos (6):**
1. `text` - Texto simple
2. `email` - Email
3. `password` - Contraseña
4. `number` - Número
5. `tel` - Teléfono
6. `url` - URL

### **Tipos Avanzados (5):**
7. `select` - Selector con dropdown
8. `textarea` - Área de texto multilínea
9. `search` - Búsqueda con botón limpiar
10. `autocomplete` - Autocompletado con sugerencias
11. `calendar` - Selector de fecha

---

## 🔧 Tipos con Subcomponentes Internos

### **Con Subcomponentes (4):**
- **`password`** → `⚙️-functional-password-toggle`
- **`select`** → `⚙️-functional-dropdown`
- **`search`** → `⚙️-functional-search-clear`
- **`autocomplete`** → `⚙️-functional-dropdown`

### **Con Dependencias Externas (1):**
- **`calendar`** → `🧩-ux-calendar` (componente Calendar UBITS)

---

## 📋 Tipos que Requieren Opciones Adicionales

### **Requieren `selectOptions`:**
- `select` - Requiere array de `SelectOption[]`

### **Requieren `autocompleteOptions`:**
- `autocomplete` - Requiere array de `AutocompleteOption[]`

---

## 🎨 Tamaños Disponibles

Todos los tipos de input soportan los siguientes tamaños:

- **`xs`** - Extra pequeño
- **`sm`** - Pequeño
- **`md`** - Mediano (default)
- **`lg`** - Grande

---

## 🎯 Estados Disponibles

Todos los tipos de input soportan los siguientes estados:

- **`default`** - Estado por defecto
- **`hover`** - Al pasar el mouse
- **`focus`** - Cuando tiene foco
- **`active`** - Cuando está activo
- **`invalid`** - Cuando es inválido
- **`disabled`** - Cuando está deshabilitado

---

## 📚 Fuentes de Información

1. **Storybook MCP:** Props obtenidas dinámicamente
2. **Código fuente:** `vendor/ubits/packages/components/input/src/types/InputOptions.ts`
3. **Documentación:** `docs/referencia/componentes/input.md`

---

## ✅ Verificación

**Total de tipos:** 11  
**Tipos básicos:** 6  
**Tipos avanzados:** 5  
**Con subcomponentes:** 4  
**Con dependencias externas:** 1

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ **LISTA COMPLETA** - Todos los tipos documentados

