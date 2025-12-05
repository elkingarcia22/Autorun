# 📦 TreeMenu

> **Componente UBITS:** `navegacin-tree-menu`  
> **Categoría:** Navegación  
> **API:** `window.createTreeMenu()` o `<ubits-tree-menu>`  
> **Storybook Local:** http://localhost:6006/?path=/story/navegacin-tree-menu--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-tree-menu--default

## 🎯 Descripción

Componente Tree Menu UBITS para mostrar estructuras jerárquicas con expandir/colapsar. Soporta iconos opcionales, múltiples niveles, chevron opcional y modo cascada o vertical.

**Características principales:**
- Estructura jerárquica con múltiples niveles
- Expandir/colapsar nodos
- Iconos opcionales en nodos
- Chevron opcional para expandir/colapsar
- 2 modos: cascada (con indentación) y vertical (sin indentación)
- 4 tamaños: xs, sm, md, lg
- Expandir todos por defecto opcional
- Navegación por teclado

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegacin-tree-menu--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-tree-menu--default
- **Código fuente:** `vendor/ubits/packages/components/tree-menu/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/tree-menu/src/types/TreeMenuOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/TreeMenu.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegacin-tree-menu--default`  
**URL Local:** http://localhost:6006/?path=/story/navegacin-tree-menu--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-tree-menu--default

**Descripción:**
TreeMenu con todos los controles disponibles. Permite configurar iconos, chevron, niveles, expansión por defecto, tamaño y modo.

**Características mostradas:**
- Iconos opcionales
- Chevron opcional
- Niveles configurables (1-5)
- Expansión por defecto configurable
- Tamaño configurable (xs, sm, md, lg)
- Modo cascada/vertical configurable

**Código de ejemplo:**
```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Engineering',
      icon: 'code',
      children: [
        {
          label: 'Frontend',
          icon: 'paint-brush',
          children: [
            { label: 'Design System', icon: 'palette' },
            { label: 'Web Platform', icon: 'globe' }
          ]
        },
        { label: 'Backend', icon: 'server' }
      ]
    }
  ],
  showIcons: true,
  showChevron: true,
  defaultExpanded: false,
  size: 'md',
  cascade: true,
  onNodeClick: (node, path) => {
    console.log('Nodo clickeado:', node.label, path);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `showIcons`: `true` - Mostrar iconos
- `showChevron`: `true` - Mostrar chevron
- `maxLevels`: `3` - Máximo 3 niveles
- `defaultExpanded`: `false` - No expandir por defecto
- `size`: `'md'` - Tamaño mediano
- `cascade`: `true` - Modo cascada

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el tree menu |
| `data` | `TreeNode[]` | - | Array de nodos del árbol (requerido) |
| `showIcons` | `boolean` | `true` | Mostrar iconos en los nodos del árbol |
| `showChevron` | `boolean` | `true` | Mostrar icono de chevron (flecha) para expandir/colapsar |
| `defaultExpanded` | `boolean` | `false` | Expandir todos los nodos por defecto |
| `size` | `string` | `'md'` | Tamaño del texto y espaciado. Opciones: `xs`, `sm`, `md`, `lg` |
| `cascade` | `boolean` | `true` | Modo cascada (con indentación) o vertical (sin indentación, se despliega hacia abajo) |
| `onNodeClick` | `function` | - | Callback que se ejecuta cuando se hace click en un nodo |
| `onNodeExpand` | `function` | - | Callback que se ejecuta cuando se expande un nodo |
| `onNodeCollapse` | `function` | - | Callback que se ejecuta cuando se colapsa un nodo |

### Estructura de TreeNode

```typescript
interface TreeNode {
  label: string;        // Texto del nodo
  icon?: string;        // Nombre del icono FontAwesome (opcional)
  children?: TreeNode[]; // Nodos hijos (opcional, define si es expandible)
  expanded?: boolean;   // Si el nodo está expandido (opcional)
  selected?: boolean;   // Si el nodo está seleccionado (opcional)
  disabled?: boolean;   // Si el nodo está deshabilitado (opcional)
}
```

---

## 🎨 Modos

### Modo Cascada

Con indentación, los hijos se muestran indentados debajo del padre.

```javascript
cascade: true
```

### Modo Vertical

Sin indentación, los hijos se despliegan hacia abajo sin indentación.

```javascript
cascade: false
```

---

## 🎨 Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: TreeMenu Básico

```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Carpeta 1',
      children: [
        { label: 'Archivo 1' },
        { label: 'Archivo 2' }
      ]
    },
    {
      label: 'Carpeta 2',
      children: [
        { label: 'Archivo 3' }
      ]
    }
  ]
});
```

### Ejemplo 2: TreeMenu con Iconos

```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Engineering',
      icon: 'code',
      children: [
        { label: 'Frontend', icon: 'paint-brush' },
        { label: 'Backend', icon: 'server' }
      ]
    }
  ],
  showIcons: true
});
```

### Ejemplo 3: TreeMenu sin Chevron

```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Carpeta',
      children: [
        { label: 'Archivo' }
      ]
    }
  ],
  showChevron: false
});
```

### Ejemplo 4: TreeMenu Expandido por Defecto

```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Carpeta',
      children: [
        { label: 'Archivo 1' },
        { label: 'Archivo 2' }
      ]
    }
  ],
  defaultExpanded: true
});
```

### Ejemplo 5: TreeMenu Vertical

```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Nivel 1',
      children: [
        {
          label: 'Nivel 2',
          children: [
            { label: 'Nivel 3' }
          ]
        }
      ]
    }
  ],
  cascade: false // Modo vertical
});
```

### Ejemplo 6: TreeMenu Pequeño

```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Carpeta',
      children: [
        { label: 'Archivo' }
      ]
    }
  ],
  size: 'sm'
});
```

### Ejemplo 7: TreeMenu con Callbacks

```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Carpeta',
      children: [
        { label: 'Archivo 1' },
        { label: 'Archivo 2' }
      ]
    }
  ],
  onNodeClick: (node, path) => {
    console.log('Nodo clickeado:', node.label);
    console.log('Ruta:', path); // ['Carpeta', 'Archivo 1']
    navigateToNode(node, path);
  },
  onNodeExpand: (node) => {
    console.log('Nodo expandido:', node.label);
    loadChildren(node);
  },
  onNodeCollapse: (node) => {
    console.log('Nodo colapsado:', node.label);
  }
});
```

### Ejemplo 8: TreeMenu Completo

```javascript
window.createTreeMenu({
  containerId: 'tree-menu-container',
  data: [
    {
      label: 'Engineering',
      icon: 'code',
      children: [
        {
          label: 'Frontend',
          icon: 'paint-brush',
          children: [
            { label: 'Design System', icon: 'palette' },
            { label: 'Web Platform', icon: 'globe' }
          ]
        },
        { label: 'Backend', icon: 'server' }
      ]
    },
    {
      label: 'Marketing',
      icon: 'chart-line',
      children: [
        { label: 'Content', icon: 'file-alt' }
      ]
    }
  ],
  showIcons: true,
  showChevron: true,
  defaultExpanded: false,
  size: 'md',
  cascade: true,
  onNodeClick: (node, path) => {
    handleNodeClick(node, path);
  }
});
```

---

## 🔄 Callbacks y Eventos

### onNodeClick

Se ejecuta cuando se hace click en un nodo.

```javascript
onNodeClick: (node, path) => {
  console.log('Nodo clickeado:', node.label);
  console.log('Ruta completa:', path); // Array con la ruta desde la raíz
  // Navegar
  navigateToNode(node);
  
  // Cargar contenido
  loadNodeContent(node);
  
  // Actualizar selección
  updateSelection(node);
}
```

**Parámetros:**
- `node` (TreeNode): Nodo clickeado
- `path` (string[]): Ruta completa desde la raíz hasta el nodo

### onNodeExpand

Se ejecuta cuando se expande un nodo.

```javascript
onNodeExpand: (node) => {
  console.log('Nodo expandido:', node.label);
  // Cargar hijos si no están cargados
  if (!node.children || node.children.length === 0) {
    loadChildren(node);
  }
}
```

**Parámetros:**
- `node` (TreeNode): Nodo expandido

### onNodeCollapse

Se ejecuta cuando se colapsa un nodo.

```javascript
onNodeCollapse: (node) => {
  console.log('Nodo colapsado:', node.label);
  // Opcionalmente limpiar contenido
  clearNodeContent(node);
}
```

**Parámetros:**
- `node` (TreeNode): Nodo colapsado

---

## 🎨 Características Visuales

### Chevron

- Se muestra solo en nodos con hijos
- Rotación al expandir/colapsar
- Estilo según tokens UBITS

### Iconos

- Se muestran a la izquierda del label
- Tamaño según tokens UBITS
- Opcionales

### Indentación (Modo Cascada)

- Cada nivel tiene indentación adicional
- Espaciado según tokens UBITS
- Visualmente claro la jerarquía

### Modo Vertical

- Sin indentación
- Los hijos se despliegan hacia abajo
- Estilo más compacto

---

## 🚨 Errores Comunes

### Error 1: Nodos sin Labels
**Problema:** Nodos sin label  
**Solución:** Cada nodo debe tener un label

```javascript
// ❌ Incorrecto - sin label
{ children: [{ label: 'Hijo' }] }

// ✅ Correcto - con label
{ label: 'Padre', children: [{ label: 'Hijo' }] }
```

### Error 2: Usar Iconos con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
icon: 'fa-folder'

// ✅ Correcto
icon: 'folder'
```

### Error 3: defaultExpanded sin Hijos
**Problema:** Usar `defaultExpanded: true` en nodos sin hijos  
**Solución:** Solo los nodos con hijos pueden expandirse

```javascript
// ❌ Incorrecto - nodo sin hijos no puede expandirse
{ label: 'Archivo', defaultExpanded: true }

// ✅ Correcto - nodo con hijos puede expandirse
{ label: 'Carpeta', children: [...], defaultExpanded: true }
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

