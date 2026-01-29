# 📦 Drawer Navigation

> **Componente UBITS:** `feedback-drawer-navigation`  
> **Categoría:** Feedback  
> **API:** `window.createDrawer()` o `<ubits-drawer>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-drawer-navigation--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-drawer-navigation--default

## 🎯 Descripción

Componente Drawer Navigation UBITS que se desliza desde la derecha de la pantalla. Ideal para formularios, filtros o vistas de detalle. Soporta diferentes anchos, un header con título y texto complementario, un body con contenido scrollable y un footer con botones de acción.

**Características principales:**
- Ancho configurable como porcentaje del viewport (100, 80, 60, 50, 40, 30)
- Header con título y texto complementario opcional
- Body con contenido HTML personalizado y scroll automático
- Footer con botones opcionales (primary, secondary, tertiary)
- Animación de deslizamiento desde la derecha
- Overlay de fondo opcional
- Cierre al hacer click en overlay (opcional)
- Responsive: en móvil siempre es 100% de ancho

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-drawer-navigation--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-drawer-navigation--default
- **Código fuente:** `vendor/ubits/packages/components/drawer/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/drawer/src/types/DrawerOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Drawer.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-drawer-navigation--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-drawer-navigation--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-drawer-navigation--default

**Descripción:**
Drawer con todos los controles disponibles. Permite configurar título, texto complementario, ancho, contenido del body, botones del footer y comportamiento de cierre.

**Características mostradas:**
- Título configurable
- Texto complementario opcional
- Ancho configurable (100, 80, 60, 50, 40, 30)
- Contenido HTML personalizado
- Botones del footer configurables (primary, secondary, tertiary)
- Cierre al hacer click en overlay configurable

**Código de ejemplo:**
```javascript
window.createDrawer({
  title: 'Crear dato demográfico',
  complementaryText: '',
  width: 40, // 40% del viewport
  bodyContent: `
    <div style="padding: 16px;">
      <p>Contenido del drawer</p>
    </div>
  `,
  footerButtons: {
    tertiary: {
      enabled: true,
      label: 'Cancelar',
      onClick: () => {
        drawerInstance.close();
      }
    },
    secondary: {
      enabled: true,
      label: 'Guardar',
      onClick: () => {
        saveData();
      }
    },
    primary: {
      enabled: true,
      label: 'Crear',
      onClick: () => {
        createData();
      }
    }
  },
  closeOnOverlayClick: true,
  onClose: () => {
    console.log('Drawer cerrado');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Crear dato demográfico'` - Título del drawer
- `width`: `40` - 40% del viewport
- `footerButtons`: Botones del footer habilitados
- `closeOnOverlayClick`: `true` - Cerrar al hacer click en overlay

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | - | Título principal del drawer |
| `complementaryText` | `string` | - | Texto secundario opcional que aparece debajo del título |
| `width` | `number` | `40` | Ancho del drawer como porcentaje del viewport. Opciones: `100`, `80`, `60`, `50`, `40`, `30`. En móvil siempre es 100% |
| `bodyContent` | `string \| function` | - | Contenido HTML del cuerpo del drawer. Puede ser una cadena HTML o una función que devuelve HTML |
| `footerButtons` | `object` | - | Botones del footer (opcional) |
| `closeOnOverlayClick` | `boolean` | `true` | Si el drawer se cierra al hacer clic fuera de él (en el overlay) |
| `onClose` | `function` | - | Callback que se ejecuta cuando el drawer se cierra |

### Estructura de footerButtons

```typescript
interface FooterButtons {
  primary?: {
    enabled: boolean;
    label: string;
    onClick: () => void;
  };
  secondary?: {
    enabled: boolean;
    label: string;
    onClick: () => void;
  };
  tertiary?: {
    enabled: boolean;
    label: string;
    onClick: () => void;
  };
}
```

---

## 🎨 Anchos Disponibles

- **`100`**: Ancho completo (100% del viewport)
- **`80`**: 80% del viewport
- **`60`**: 60% del viewport
- **`50`**: 50% del viewport
- **`40`**: 40% del viewport - default
- **`30`**: 30% del viewport

**Nota:** En dispositivos móviles, el drawer siempre ocupa el 100% del ancho independientemente del valor configurado.

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Drawer Básico

```javascript
const drawerInstance = window.createDrawer({
  title: 'Formulario',
  width: 40,
  bodyContent: `
    <div style="padding: 16px;">
      <p>Contenido del formulario</p>
    </div>
  `,
  onClose: () => {
    console.log('Drawer cerrado');
  }
});
```

### Ejemplo 2: Drawer con Texto Complementario

```javascript
window.createDrawer({
  title: 'Crear nuevo elemento',
  complementaryText: 'Completa los campos para crear un nuevo elemento',
  width: 50,
  bodyContent: `
    <div style="padding: 16px;">
      <form>
        <input type="text" placeholder="Nombre" />
      </form>
    </div>
  `
});
```

### Ejemplo 3: Drawer con Botones del Footer

```javascript
window.createDrawer({
  title: 'Confirmar acción',
  width: 40,
  bodyContent: `
    <div style="padding: 16px;">
      <p>¿Estás seguro de que deseas continuar?</p>
    </div>
  `,
  footerButtons: {
    tertiary: {
      enabled: true,
      label: 'Cancelar',
      onClick: () => {
        drawerInstance.close();
      }
    },
    primary: {
      enabled: true,
      label: 'Confirmar',
      onClick: () => {
        executeAction();
        drawerInstance.close();
      }
    }
  }
});
```

### Ejemplo 4: Drawer Ancho (80%)

```javascript
window.createDrawer({
  title: 'Vista de detalle',
  width: 80,
  bodyContent: `
    <div style="padding: 16px;">
      <h3>Información detallada</h3>
      <p>Contenido extenso...</p>
    </div>
  `
});
```

### Ejemplo 5: Drawer Estrecho (30%)

```javascript
window.createDrawer({
  title: 'Filtros',
  width: 30,
  bodyContent: `
    <div style="padding: 16px;">
      <h4>Filtros disponibles</h4>
      <div>
        <label>Filtro 1</label>
        <input type="checkbox" />
      </div>
    </div>
  `
});
```

### Ejemplo 6: Drawer que No se Cierra con Click en Overlay

```javascript
window.createDrawer({
  title: 'Información importante',
  width: 40,
  bodyContent: `
    <div style="padding: 16px;">
      <p>Lee esto antes de continuar.</p>
    </div>
  `,
  closeOnOverlayClick: false, // No cerrar al hacer click en overlay
  footerButtons: {
    primary: {
      enabled: true,
      label: 'Entendido',
      onClick: () => {
        drawerInstance.close();
      }
    }
  }
});
```

### Ejemplo 7: Drawer con Contenido Dinámico

```javascript
window.createDrawer({
  title: 'Lista dinámica',
  width: 50,
  bodyContent: () => {
    // Generar contenido dinámicamente
    const items = getItems();
    return `
      <div style="padding: 16px;">
        <ul>
          ${items.map(item => `<li>${item.name}</li>`).join('')}
        </ul>
      </div>
    `;
  }
});
```

### Ejemplo 8: Drawer con Formulario Completo

```javascript
window.createDrawer({
  title: 'Crear usuario',
  complementaryText: 'Completa todos los campos requeridos',
  width: 40,
  bodyContent: `
    <div style="padding: 16px;">
      <form id="user-form">
        <div style="margin-bottom: 16px;">
          <label>Nombre</label>
          <input type="text" name="name" required />
        </div>
        <div style="margin-bottom: 16px;">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div style="margin-bottom: 16px;">
          <label>Rol</label>
          <select name="role">
            <option>Administrador</option>
            <option>Usuario</option>
          </select>
        </div>
      </form>
    </div>
  `,
  footerButtons: {
    tertiary: {
      enabled: true,
      label: 'Cancelar',
      onClick: () => {
        drawerInstance.close();
      }
    },
    primary: {
      enabled: true,
      label: 'Crear',
      onClick: () => {
        const form = document.getElementById('user-form');
        if (form.checkValidity()) {
          createUser(new FormData(form));
          drawerInstance.close();
        }
      }
    }
  }
});
```

---

## 🔄 Callbacks y Eventos

### onClose

Se ejecuta cuando el drawer se cierra.

```javascript
onClose: () => {
  console.log('Drawer cerrado');
  // Limpiar estado, etc.
  cleanup();
  
  // Guardar preferencias
  savePreferences();
}
```

### onClick de Botones del Footer

Se ejecuta cuando se hace click en los botones del footer.

```javascript
footerButtons: {
  primary: {
    enabled: true,
    label: 'Guardar',
    onClick: () => {
      console.log('Botón primario clickeado');
      saveData();
      // Cerrar drawer después de guardar
      drawerInstance.close();
    }
  },
  secondary: {
    enabled: true,
    label: 'Aplicar',
    onClick: () => {
      console.log('Botón secundario clickeado');
      applyChanges();
    }
  },
  tertiary: {
    enabled: true,
    label: 'Cancelar',
    onClick: () => {
      console.log('Botón terciario clickeado');
      // Cerrar drawer
      drawerInstance.close();
    }
  }
}
```

---

## 🎨 Características Visuales

### Animación

- **Apertura:** Deslizamiento desde la derecha con animación suave
- **Cierre:** Deslizamiento hacia la derecha con animación suave
- **Overlay:** Fondo oscuro semitransparente que aparece detrás del drawer

### Header

- Título principal con tipografía UBITS
- Texto complementario opcional debajo del título
- Botón de cerrar (X) en la esquina superior derecha

### Body

- Contenido HTML personalizado
- Scroll automático si el contenido excede la altura disponible
- Padding interno según tokens UBITS

### Footer

- Botones opcionales (primary, secondary, tertiary)
- Orden: tertiary (izquierda), secondary y primary (derecha)
- Se oculta si no hay botones habilitados
- Fondo con borde superior según tokens UBITS

---

## 🚨 Errores Comunes

### Error 1: No Cerrar Drawer Manualmente
**Problema:** Drawer permanece abierto después de acciones  
**Solución:** Cerrar drawer manualmente en los callbacks

```javascript
let drawerInstance = null;

drawerInstance = window.createDrawer({
  title: 'Drawer',
  footerButtons: {
    primary: {
      enabled: true,
      label: 'Aceptar',
      onClick: () => {
        // Cerrar drawer después de la acción
        if (drawerInstance && drawerInstance.close) {
          drawerInstance.close();
        }
      }
    }
  }
});
```

### Error 2: Contenido HTML Mal Formado
**Problema:** Contenido HTML que rompe el layout  
**Solución:** Asegurar HTML válido y usar estilos UBITS

```javascript
// ❌ Incorrecto - HTML mal formado
bodyContent: '<div><p>Texto</div>'

// ✅ Correcto - HTML válido
bodyContent: '<div><p>Texto</p></div>'

// ✅ Correcto - con estilos UBITS
bodyContent: `
  <div style="padding: 16px;">
    <p style="font-size: var(--modifiers-normal-body-sm-regular-fontsize);">
      Texto con estilos UBITS
    </p>
  </div>
`
```

### Error 3: Ancho Muy Pequeño en Desktop
**Problema:** Drawer muy estrecho que dificulta la lectura  
**Solución:** Usar anchos apropiados según el contenido

```javascript
// ❌ Incorrecto - muy estrecho para formulario
width: 30, // Muy estrecho para formularios

// ✅ Correcto - ancho apropiado
width: 40, // Adecuado para formularios
// o
width: 50 // Para contenido más extenso
```

### Error 4: No Manejar Cierre del Drawer
**Problema:** No limpiar estado cuando el drawer se cierra  
**Solución:** Implementar callback `onClose` para limpiar estado

```javascript
// ❌ Incorrecto - no limpia estado
window.createDrawer({
  title: 'Drawer',
  bodyContent: '<form id="my-form">...</form>'
  // Falta onClose
});

// ✅ Correcto - limpia estado
window.createDrawer({
  title: 'Drawer',
  bodyContent: '<form id="my-form">...</form>',
  onClose: () => {
    // Limpiar formulario
    document.getElementById('my-form').reset();
    // Limpiar estado
    clearFormState();
  }
});
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

