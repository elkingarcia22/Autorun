# Variaciones Completas del Componente Input

**Fecha:** 2025-01-03  
**Objetivo:** Documentar todas las variaciones del componente Input y sus dependencias

---

## 📋 Tipos de Input (11 variaciones)

El componente Input UBITS soporta **11 tipos diferentes**, cada uno con funcionalidades específicas:

### 1. **text** (Básico)
- Input de texto simple
- Sin dependencias adicionales
- Sin subcomponentes

### 2. **email** (Básico)
- Input de email con validación HTML5
- Sin dependencias adicionales
- Sin subcomponentes

### 3. **password** (Con subcomponente)
- Input de contraseña con toggle mostrar/ocultar
- **Internals:** `⚙️-functional-password-toggle`
- Sin dependencias externas

### 4. **number** (Básico)
- Input numérico
- Sin dependencias adicionales
- Sin subcomponentes

### 5. **tel** (Básico)
- Input de teléfono
- Sin dependencias adicionales
- Sin subcomponentes

### 6. **url** (Básico)
- Input de URL
- Sin dependencias adicionales
- Sin subcomponentes

### 7. **select** (Con subcomponente)
- Select con dropdown personalizado
- **Internals:** `⚙️-functional-dropdown`
- **Requiere:** `selectOptions: SelectOption[]`
- Sin dependencias externas

### 8. **textarea** (Básico)
- Área de texto multilínea
- Soporta barra de herramientas de texto enriquecido (opcional)
- Sin dependencias adicionales
- Sin subcomponentes

### 9. **search** (Con subcomponente)
- Input de búsqueda con botón de limpiar
- **Internals:** `⚙️-functional-search-clear`
- Sin dependencias externas

### 10. **autocomplete** (Con subcomponente)
- Input con autocompletado y dropdown de sugerencias
- **Internals:** `⚙️-functional-dropdown`
- **Requiere:** `autocompleteOptions: AutocompleteOption[]`
- Sin dependencias externas

### 11. **calendar** (Con componente externo) ⭐
- Input de fecha con date picker
- **Dependencia:** `🧩-ux-calendar` (componente Calendar UBITS)
- **Slot:** `calendar: ["🧩-ux-calendar"]`
- **Requiere:** Importar `CalendarProvider` dinámicamente
- **Nota:** Este es el único tipo que requiere un componente externo

---

## 🔗 Dependencias por Tipo

### Sin Dependencias Externas:
- `text`
- `email`
- `number`
- `tel`
- `url`
- `textarea`
- `password` (usa internal: password-toggle)
- `search` (usa internal: search-clear)
- `select` (usa internal: dropdown)
- `autocomplete` (usa internal: dropdown)

### Con Dependencia Externa:
- `calendar` → **Requiere:** `🧩-ux-calendar`

---

## 📦 Estructura del Contrato

```typescript
ubits: createUBITSContract({
  componentId: '🧩-ux-input',
  api: {
    create: 'window.UBITS.Input.create',
    tag: '<ubits-input>',
  },
  dependsOn: {
    required: [], // Input base no requiere otros componentes
    optional: [
      '🧩-ux-icon', // Iconos son opcionales
      '🧩-ux-calendar', // Calendar es requerido SOLO cuando type='calendar'
    ],
  },
  internals: [
    '⚙️-functional-dropdown', // Para select/autocomplete
    '⚙️-functional-password-toggle', // Para password
    '⚙️-functional-search-clear', // Para search
  ],
  slots: {
    calendar: ['🧩-ux-calendar'], // Solo cuando type='calendar'
  },
  // ...
})
```

---

## 🎯 Ejemplos de Uso por Tipo

### Tipo `text` (Básico)
```typescript
window.UBITS.Input.create({
  containerId: 'input-text',
  label: 'Nombre',
  type: 'text',
  placeholder: 'Escribe tu nombre'
});
```

### Tipo `calendar` (Requiere Calendar)
```typescript
// ⚠️ IMPORTANTE: type='calendar' requiere que el componente Calendar esté disponible
window.UBITS.Input.create({
  containerId: 'input-calendar',
  label: 'Fecha',
  type: 'calendar',
  placeholder: 'Selecciona una fecha'
});
```

### Tipo `select` (Requiere selectOptions)
```typescript
window.UBITS.Input.create({
  containerId: 'input-select',
  label: 'País',
  type: 'select',
  selectOptions: [
    { value: 'co', text: 'Colombia' },
    { value: 'mx', text: 'México' }
  ]
});
```

### Tipo `autocomplete` (Requiere autocompleteOptions)
```typescript
window.UBITS.Input.create({
  containerId: 'input-autocomplete',
  label: 'Ciudad',
  type: 'autocomplete',
  autocompleteOptions: [
    { value: 'bogota', text: 'Bogotá' },
    { value: 'medellin', text: 'Medellín' }
  ]
});
```

---

## ⚠️ Notas Importantes

1. **Calendar es el único tipo con dependencia externa:**
   - Los demás tipos usan internals (funcionalidades internas)
   - Calendar requiere el componente `🧩-ux-calendar` que se carga dinámicamente

2. **Select y Autocomplete comparten el mismo internal:**
   - Ambos usan `⚙️-functional-dropdown`
   - La diferencia está en el comportamiento (select = selección única, autocomplete = búsqueda con sugerencias)

3. **Password y Search tienen internals específicos:**
   - Password: toggle mostrar/ocultar
   - Search: botón de limpiar

4. **Textarea puede tener barra de herramientas:**
   - `showRichTextToolbar: true` activa una barra de herramientas de texto enriquecido
   - Esto es opcional y no requiere dependencias externas

---

**Última actualización:** 2025-01-03
