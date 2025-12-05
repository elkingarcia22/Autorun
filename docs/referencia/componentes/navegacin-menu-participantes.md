# 📦 Menu de Participantes

> **Componente UBITS:** `navegación-menu-participantes`  
> **Categoría:** Navegación  
> **API:** `window.createParticipantsMenu()` o `<ubits-participants-menu>`  
> **Storybook Local:** http://localhost:6006/?path=/story/navegacin-menu-de-participantes--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-menu-de-participantes--default

## 🎯 Descripción

Componente de menú lateral UBITS para mostrar una lista de participantes. Incluye búsqueda, filtro y lista de participantes con avatar, nombre, rol y estado.

**Características principales:**
- Título del menú configurable
- Búsqueda de participantes por nombre o rol
- Filtros por roles y estados
- Lista de participantes con avatar, nombre, rol y estado
- Participante seleccionado destacado
- Scrollbar de UBITS opcional
- Callbacks para selección, búsqueda y filtros
- Estado de cada participante (bajo, medio, alto, muy-alto)

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegacin-menu-de-participantes--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-menu-de-participantes--default
- **Código fuente:** `vendor/ubits/packages/addons/participants-menu/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/participants-menu/src/types/ParticipantsMenuOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/ParticipantsMenu.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegación-menu-de-participantes--default`  
**URL Local:** http://localhost:6006/?path=/story/navegacin-menu-de-participantes--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-menu-de-participantes--default

**Descripción:**
Menu de Participantes con todos los controles disponibles. Permite configurar título, placeholder de búsqueda, participantes, selección, y opciones de visualización.

**Características mostradas:**
- Título del menú
- Input de búsqueda
- Lista de participantes con avatar, nombre, rol y estado
- Participante seleccionado destacado
- Scrollbar de UBITS
- Filtros por roles y estados

**Código de ejemplo:**
```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  searchPlaceholder: 'Buscar participan...',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      avatarImage: 'https://example.com/avatar1.jpg',
      status: 'bajo',
      selected: true
    },
    {
      id: '2',
      name: 'Estefanía Rojas',
      role: 'Ventas',
      avatarImage: 'https://example.com/avatar2.jpg',
      status: 'muy-alto'
    }
  ],
  selectedParticipantId: '1',
  showAvatar: true,
  showRole: true,
  showStatusTag: true,
  enableScrollbar: true,
  onParticipantSelect: (participantId) => {
    console.log('Participante seleccionado:', participantId);
  },
  onSearchChange: (searchText) => {
    console.log('Búsqueda:', searchText);
  },
  onFilterChange: (filters) => {
    console.log('Filtros:', filters);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Participantes'` - Título del menú
- `searchPlaceholder`: `'Buscar participan...'` - Placeholder del input de búsqueda
- `participants`: Array de participantes
- `selectedParticipantId`: `'1'` - ID del participante seleccionado
- `showAvatar`: `true` - Mostrar avatar
- `showRole`: `true` - Mostrar rol
- `showStatusTag`: `true` - Mostrar status tag
- `enableScrollbar`: `true` - Activar scrollbar de UBITS

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el menú |
| `title` | `string` | `'Participantes'` | Título del menú |
| `searchPlaceholder` | `string` | `'Buscar participan...'` | Placeholder del input de búsqueda |
| `participants` | `Participant[]` | `[]` | Array de participantes (requerido) |
| `selectedParticipantId` | `string` | - | ID del participante seleccionado |
| `showAvatar` | `boolean` | `true` | Mostrar avatar de los participantes |
| `showRole` | `boolean` | `true` | Mostrar rol (texto complementario) de los participantes |
| `showStatusTag` | `boolean` | `true` | Mostrar status tag de los participantes |
| `enableScrollbar` | `boolean` | `true` | Activar scrollbar de UBITS para la lista de participantes |
| `preservedSearchValue` | `string` | - | Valor preservado del input de búsqueda (interno) |
| `onParticipantSelect` | `function` | - | Callback que se ejecuta cuando se selecciona un participante |
| `onSearchChange` | `function` | - | Callback que se ejecuta cuando cambia el texto de búsqueda |
| `onFilterClick` | `function` | - | Callback que se ejecuta cuando se hace click en el botón de filtros |
| `onFilterChange` | `function` | - | Callback que se ejecuta cuando cambian los filtros |

### Estructura de Participant

```typescript
interface Participant {
  id: string;                    // ID único del participante (requerido)
  name: string;                   // Nombre del participante (requerido)
  role: string;                   // Rol del participante (requerido)
  avatarImage?: string;           // URL de la imagen del avatar (opcional)
  status?: ParticipantStatus;    // Estado del participante (opcional)
  selected?: boolean;             // Si el participante está seleccionado (opcional)
}
```

### Estados de Participante (ParticipantStatus)

| Estado | Descripción |
|--------|-------------|
| `'bajo'` | Estado bajo |
| `'medio'` | Estado medio |
| `'alto'` | Estado alto |
| `'muy-alto'` | Estado muy alto |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Menu de Participantes Básico

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      avatarImage: 'https://example.com/avatar1.jpg',
      status: 'bajo'
    },
    {
      id: '2',
      name: 'Estefanía Rojas',
      role: 'Ventas',
      avatarImage: 'https://example.com/avatar2.jpg',
      status: 'muy-alto'
    }
  ]
});
```

### Ejemplo 2: Menu de Participantes con Selección

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      avatarImage: 'https://example.com/avatar1.jpg',
      status: 'bajo'
    },
    {
      id: '2',
      name: 'Estefanía Rojas',
      role: 'Ventas',
      avatarImage: 'https://example.com/avatar2.jpg',
      status: 'muy-alto'
    }
  ],
  selectedParticipantId: '1',
  onParticipantSelect: (participantId) => {
    console.log('Participante seleccionado:', participantId);
    loadParticipantDetails(participantId);
  }
});
```

### Ejemplo 3: Menu de Participantes con Búsqueda

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  searchPlaceholder: 'Buscar por nombre o rol...',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      avatarImage: 'https://example.com/avatar1.jpg',
      status: 'bajo'
    }
  ],
  onSearchChange: (searchText) => {
    console.log('Búsqueda:', searchText);
    // Filtrar participantes
    const filtered = filterParticipants(searchText);
    updateParticipantsList(filtered);
  }
});
```

### Ejemplo 4: Menu de Participantes sin Avatar

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      status: 'bajo'
    }
  ],
  showAvatar: false
});
```

### Ejemplo 5: Menu de Participantes sin Rol

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      avatarImage: 'https://example.com/avatar1.jpg',
      status: 'bajo'
    }
  ],
  showRole: false
});
```

### Ejemplo 6: Menu de Participantes sin Status Tag

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      avatarImage: 'https://example.com/avatar1.jpg'
    }
  ],
  showStatusTag: false
});
```

### Ejemplo 7: Menu de Participantes sin Scrollbar

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      avatarImage: 'https://example.com/avatar1.jpg',
      status: 'bajo'
    }
  ],
  enableScrollbar: false
});
```

### Ejemplo 8: Menu de Participantes con Filtros

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      avatarImage: 'https://example.com/avatar1.jpg',
      status: 'bajo'
    }
  ],
  onFilterClick: () => {
    console.log('Filtros clickeados');
    openFilterModal();
  },
  onFilterChange: (filters) => {
    console.log('Filtros aplicados:', filters);
    // Filtrar participantes
    const filtered = applyFilters(filters);
    updateParticipantsList(filtered);
  }
});
```

### Ejemplo 9: Menu de Participantes Dinámico

```javascript
let participants = [
  {
    id: '1',
    name: 'Elkin Garcia',
    role: 'Producto',
    avatarImage: 'https://example.com/avatar1.jpg',
    status: 'bajo'
  }
];

let menuInstance = null;

function updateParticipantsMenu() {
  if (menuInstance) {
    menuInstance.destroy();
  }
  
  menuInstance = window.createParticipantsMenu({
    containerId: 'participants-menu-container',
    title: 'Participantes',
    participants: participants,
    selectedParticipantId: getSelectedParticipantId(),
    onParticipantSelect: (participantId) => {
      setSelectedParticipantId(participantId);
      updateParticipantsMenu();
    },
    onSearchChange: (searchText) => {
      // Filtrar participantes
      const filtered = filterParticipants(searchText);
      if (menuInstance?.updateParticipantsList) {
        menuInstance.updateParticipantsList(filtered, getSelectedParticipantId());
      }
    }
  });
}

// Agregar nuevo participante
function addParticipant(participant) {
  participants.push(participant);
  updateParticipantsMenu();
}

// Inicializar
updateParticipantsMenu();
```

### Ejemplo 10: Menu de Participantes Completo

```javascript
window.createParticipantsMenu({
  containerId: 'participants-menu-container',
  title: 'Participantes',
  searchPlaceholder: 'Buscar participan...',
  participants: [
    {
      id: '1',
      name: 'Elkin Garcia',
      role: 'Producto',
      avatarImage: 'https://example.com/avatar1.jpg',
      status: 'bajo'
    },
    {
      id: '2',
      name: 'Estefanía Rojas',
      role: 'Ventas',
      avatarImage: 'https://example.com/avatar2.jpg',
      status: 'muy-alto'
    },
    {
      id: '3',
      name: 'Ligia Salazar',
      role: 'Ventas',
      avatarImage: 'https://example.com/avatar3.jpg',
      status: 'muy-alto'
    }
  ],
  selectedParticipantId: '1',
  showAvatar: true,
  showRole: true,
  showStatusTag: true,
  enableScrollbar: true,
  onParticipantSelect: (participantId) => {
    console.log('Participante seleccionado:', participantId);
    loadParticipantDetails(participantId);
    updateSelectedParticipant(participantId);
  },
  onSearchChange: (searchText) => {
    console.log('Búsqueda:', searchText);
    // Filtrar participantes
    const filtered = filterParticipants(searchText);
    if (menuInstance?.updateParticipantsList) {
      menuInstance.updateParticipantsList(filtered, selectedParticipantId);
    }
  },
  onFilterClick: () => {
    console.log('Filtros clickeados');
    openFilterModal();
  },
  onFilterChange: (filters) => {
    console.log('Filtros aplicados:', filters);
    // Aplicar filtros
    const filtered = applyFilters(filters);
    if (menuInstance?.updateParticipantsList) {
      menuInstance.updateParticipantsList(filtered, selectedParticipantId);
    }
  }
});
```

---

## 🔄 Callbacks y Eventos

### onParticipantSelect

Se ejecuta cuando se selecciona un participante.

```javascript
onParticipantSelect: (participantId) => {
  console.log('Participante seleccionado:', participantId);
  // Cargar detalles del participante
  loadParticipantDetails(participantId);
  
  // Actualizar estado
  setSelectedParticipantId(participantId);
  
  // Navegar
  navigateToParticipant(participantId);
}
```

**Parámetros:**
- `participantId` (string): ID del participante seleccionado

### onSearchChange

Se ejecuta cuando cambia el texto de búsqueda (con debounce de 300ms).

```javascript
onSearchChange: (searchText) => {
  console.log('Búsqueda:', searchText);
  // Filtrar participantes
  const filtered = participants.filter(p => {
    const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = p.role.toLowerCase().includes(searchText.toLowerCase());
    return matchesName || matchesRole;
  });
  
  // Actualizar lista
  if (menuInstance?.updateParticipantsList) {
    menuInstance.updateParticipantsList(filtered, selectedParticipantId);
  }
}
```

**Parámetros:**
- `searchText` (string): Texto de búsqueda

### onFilterChange

Se ejecuta cuando cambian los filtros (roles o estados).

```javascript
onFilterChange: (filters) => {
  console.log('Filtros aplicados:', filters);
  // filters = { roles: string[], statuses: ParticipantStatus[] }
  
  // Aplicar filtros
  let filtered = [...participants];
  
  // Filtrar por roles
  if (filters.roles.length > 0) {
    filtered = filtered.filter(p => filters.roles.includes(p.role));
  }
  
  // Filtrar por estados
  if (filters.statuses.length > 0) {
    filtered = filtered.filter(p => 
      p.status && filters.statuses.includes(p.status)
    );
  }
  
  // Actualizar lista
  if (menuInstance?.updateParticipantsList) {
    menuInstance.updateParticipantsList(filtered, selectedParticipantId);
  }
}
```

**Parámetros:**
- `filters` (object): Objeto con `roles` (string[]) y `statuses` (ParticipantStatus[])

### onFilterClick

Se ejecuta cuando se hace click en el botón de filtros.

```javascript
onFilterClick: () => {
  console.log('Filtros clickeados');
  // Abrir modal de filtros
  openFilterModal();
}
```

---

## 🔄 Métodos de la Instancia

### updateParticipantsList

Actualiza la lista de participantes sin recrear el menú completo.

```javascript
if (menuInstance?.updateParticipantsList) {
  menuInstance.updateParticipantsList(newParticipants, selectedParticipantId);
}
```

**Parámetros:**
- `participants` (Participant[]): Nueva lista de participantes
- `selectedParticipantId` (string): ID del participante seleccionado

### destroy

Destruye la instancia del menú y limpia los recursos.

```javascript
if (menuInstance) {
  menuInstance.destroy();
  menuInstance = null;
}
```

---

## 🎨 Características Visuales

### Estructura

- **Header:** Título del menú
- **Búsqueda:** Input de búsqueda con placeholder
- **Filtros:** Botón de filtros (opcional)
- **Lista:** Lista de participantes con scrollbar opcional

### Participante

- **Avatar:** Imagen del participante (opcional)
- **Nombre:** Nombre del participante
- **Rol:** Texto complementario (opcional)
- **Status Tag:** Tag de estado (opcional)
- **Selección:** Estado destacado cuando está seleccionado

### Scrollbar

- Scrollbar de UBITS opcional
- Aparece cuando hay muchos participantes
- Estilo personalizado de UBITS

---

## 🚨 Errores Comunes

### Error 1: Participantes sin ID
**Problema:** Participantes sin ID único  
**Solución:** Cada participante debe tener un ID único

```javascript
// ❌ Incorrecto - sin ID
participants: [
  { name: 'Elkin Garcia', role: 'Producto' }
]

// ✅ Correcto - con ID
participants: [
  { id: '1', name: 'Elkin Garcia', role: 'Producto' }
]
```

### Error 2: Participantes sin Nombre o Rol
**Problema:** Participantes sin nombre o rol  
**Solución:** Cada participante debe tener nombre y rol

```javascript
// ❌ Incorrecto - sin nombre o rol
participants: [
  { id: '1', name: 'Elkin Garcia' } // Falta role
]

// ✅ Correcto - con nombre y rol
participants: [
  { id: '1', name: 'Elkin Garcia', role: 'Producto' }
]
```

### Error 3: selectedParticipantId No Coincide
**Problema:** selectedParticipantId no coincide con ningún participante  
**Solución:** Asegurar que selectedParticipantId exista en los participantes

```javascript
// ❌ Incorrecto - ID no existe
participants: [
  { id: '1', name: 'Elkin Garcia', role: 'Producto' }
],
selectedParticipantId: '2' // No existe

// ✅ Correcto - ID existe
participants: [
  { id: '1', name: 'Elkin Garcia', role: 'Producto' },
  { id: '2', name: 'Estefanía Rojas', role: 'Ventas' }
],
selectedParticipantId: '1' // Existe
```

### Error 4: Estado Inválido
**Problema:** Usar un estado que no existe  
**Solución:** Usar solo los estados válidos

```javascript
// ❌ Incorrecto - estado inválido
status: 'excelente'

// ✅ Correcto - estado válido
status: 'muy-alto'
// O
status: 'alto'
// O
status: 'medio'
// O
status: 'bajo'
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Menu](./navegacin-menu.md) - Componente relacionado
- [Avatar](./bsicos-avatar.md) - Componente relacionado
- [Status Tag](./bsicos-status-tag.md) - Componente relacionado
- [Scrollbar](./bsicos-scrollbar.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

