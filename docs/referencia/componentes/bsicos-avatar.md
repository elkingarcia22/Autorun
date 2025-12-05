# 📦 Avatar

> **Componente UBITS:** `bsicos-avatar`  
> **Categoría:** Básicos  
> **API:** `window.createAvatar()` o `<ubits-avatar>`  
> **Storybook Local:** http://localhost:6006/?path=/story/bsicos-avatar--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-avatar--default

## 🎯 Descripción

Componente Avatar UBITS con soporte para imagen, iniciales e icono. Múltiples tamaños y badge opcional con contenido (texto/números). Usa tokens UBITS exclusivamente.

**Características principales:**
- 3 variantes: Photo (imagen), Initials (iniciales), Icon (icono)
- 4 tamaños: xs (20px), sm (28px), md (36px), lg (40px)
- Badge opcional con colores y contenido
- Click handler opcional
- Accesibilidad con alt text

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/bsicos-avatar--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-avatar--default
- **Código fuente:** `vendor/ubits/packages/components/avatar/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/avatar/src/types/AvatarOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Avatar.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `bsicos-avatar--default`  
**URL Local:** http://localhost:6006/?path=/story/bsicos-avatar--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-avatar--default

**Descripción:**
Avatar con todos los controles disponibles. Permite configurar variante (imagen/iniciales/icono), tamaño, badge y accesibilidad.

**Características mostradas:**
- Variante configurable (Photo, Initials, Icon)
- Tamaño configurable (xs, sm, md, lg)
- Badge opcional con color y contenido
- Alt text para accesibilidad
- Click handler opcional

**Código de ejemplo:**
```javascript
window.createAvatar({
  imageUrl: '/images/Profile-image.jpg',
  size: 'md',
  badgeColor: 'green',
  badgeContent: '5',
  alt: 'Avatar del usuario',
  onClick: (event) => {
    console.log('Avatar clickeado');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `imageUrl`: `'/images/Profile-image.jpg'` - Imagen del avatar
- `size`: `'md'` - Tamaño mediano
- `badgeColor`: `''` - Sin badge
- `alt`: `'Avatar'` - Texto alternativo

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `imageUrl` | `string` | - | URL de la imagen del avatar (para variante Photo). Si se proporciona, se usa la variante Photo. |
| `initials` | `string` | - | Texto para mostrar como iniciales (para variante Initials). Ej: "John Doe" genera "JD". Si se proporciona sin imageUrl, se usa la variante Initials. |
| `icon` | `string` | `'user'` | Nombre del icono FontAwesome (para variante Icon). Ej: "user", "robot". Se usa si no hay imageUrl ni initials. |
| `size` | `string` | `'md'` | Tamaño del avatar. Opciones: `xs` (20px), `sm` (28px), `md` (36px), `lg` (40px) |
| `badgeColor` | `string` | - | Color del badge. Si se proporciona, se muestra el badge. Opciones: `green`, `red`, `blue`, `orange`, `gray`. Dejar vacío para ocultar. |
| `badgeContent` | `string \| number` | - | Contenido del badge (número o texto). Si no se proporciona o está vacío, se muestra solo el punto (dot). Ej: "5", "99+", "Nuevo" |
| `alt` | `string` | `'Avatar'` | Texto alternativo para accesibilidad (solo para variante Photo) |
| `onClick` | `function` | - | Función a ejecutar cuando se hace clic en el avatar |
| `className` | `string` | `''` | Clases CSS adicionales |

---

## 🎨 Variantes

### Variante Photo (Imagen)

Se usa cuando se proporciona `imageUrl`. Muestra la imagen del usuario.

```javascript
window.createAvatar({
  imageUrl: '/images/user.jpg',
  size: 'md',
  alt: 'Foto de perfil'
});
```

### Variante Initials (Iniciales)

Se usa cuando se proporciona `initials` sin `imageUrl`. Muestra las iniciales del nombre.

```javascript
window.createAvatar({
  initials: 'John Doe', // Genera "JD"
  size: 'md'
});
```

### Variante Icon (Icono)

Se usa cuando no hay `imageUrl` ni `initials`. Muestra un icono FontAwesome.

```javascript
window.createAvatar({
  icon: 'user',
  size: 'md'
});
```

**Prioridad de variantes:**
1. Si hay `imageUrl` → Photo
2. Si hay `initials` (sin `imageUrl`) → Initials
3. Si no hay ninguno → Icon

---

## 🎨 Tamaños

- **`xs`**: Extra pequeño (20px)
- **`sm`**: Pequeño (28px)
- **`md`**: Mediano (36px) - default
- **`lg`**: Grande (40px)

---

## 🏷️ Badge

### Colores Disponibles

- `green` - Verde
- `red` - Rojo
- `blue` - Azul
- `orange` - Naranja
- `gray` - Gris

### Tipos de Badge

1. **Badge con contenido:** Muestra texto o número
   ```javascript
   badgeColor: 'red',
   badgeContent: '5'
   ```

2. **Badge dot (punto):** Solo muestra el punto sin contenido
   ```javascript
   badgeColor: 'green',
   badgeContent: '' // o undefined
   ```

3. **Sin badge:** No mostrar badge
   ```javascript
   badgeColor: '' // o undefined
   ```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Avatar con Imagen

```javascript
window.createAvatar({
  imageUrl: '/images/profile.jpg',
  size: 'md',
  alt: 'Foto de perfil de Juan'
});
```

### Ejemplo 2: Avatar con Iniciales

```javascript
window.createAvatar({
  initials: 'María García',
  size: 'lg'
});
// Muestra "MG"
```

### Ejemplo 3: Avatar con Icono

```javascript
window.createAvatar({
  icon: 'robot',
  size: 'sm'
});
```

### Ejemplo 4: Avatar con Badge de Notificación

```javascript
window.createAvatar({
  imageUrl: '/images/user.jpg',
  size: 'md',
  badgeColor: 'red',
  badgeContent: '3',
  alt: 'Usuario con notificaciones'
});
```

### Ejemplo 5: Avatar con Badge Dot (Punto)

```javascript
window.createAvatar({
  imageUrl: '/images/user.jpg',
  size: 'md',
  badgeColor: 'green',
  badgeContent: '', // Solo punto
  alt: 'Usuario en línea'
});
```

### Ejemplo 6: Avatar Clickeable

```javascript
window.createAvatar({
  imageUrl: '/images/user.jpg',
  size: 'md',
  alt: 'Perfil',
  onClick: (event) => {
    window.location.href = '/profile';
  }
});
```

### Ejemplo 7: Avatar Pequeño con Badge

```javascript
window.createAvatar({
  initials: 'JD',
  size: 'xs',
  badgeColor: 'blue',
  badgeContent: 'Nuevo'
});
```

### Ejemplo 8: Avatar Grande sin Badge

```javascript
window.createAvatar({
  imageUrl: '/images/admin.jpg',
  size: 'lg',
  alt: 'Administrador'
});
```

### Ejemplo 9: Avatar con Badge de Estado

```javascript
// Usuario en línea
window.createAvatar({
  imageUrl: '/images/user.jpg',
  size: 'md',
  badgeColor: 'green',
  badgeContent: '', // Solo punto verde
  alt: 'Usuario en línea'
});

// Usuario con mensajes pendientes
window.createAvatar({
  imageUrl: '/images/user.jpg',
  size: 'md',
  badgeColor: 'red',
  badgeContent: '12',
  alt: 'Usuario con mensajes'
});
```

### Ejemplo 10: Avatar con Fallback a Iniciales

```javascript
// Si la imagen falla, mostrar iniciales
const avatarOptions = {
  size: 'md',
  alt: 'Avatar'
};

// Intentar cargar imagen
const img = new Image();
img.onload = () => {
  avatarOptions.imageUrl = '/images/user.jpg';
  window.createAvatar(avatarOptions);
};
img.onerror = () => {
  // Fallback a iniciales
  avatarOptions.initials = 'John Doe';
  window.createAvatar(avatarOptions);
};
img.src = '/images/user.jpg';
```

---

## 🔄 Callbacks y Eventos

### onClick

Se ejecuta cuando se hace clic en el avatar.

```javascript
onClick: (event) => {
  console.log('Avatar clickeado');
  // Navegar a perfil
  navigateToProfile();
  
  // O abrir modal
  openProfileModal();
}
```

**Parámetros:**
- `event` (Event): Evento nativo del click

**Nota:** El avatar también es accesible por teclado (Enter o Espacio).

---

## 🎨 Características Visuales

### Forma

- **Circular:** Todos los avatares son circulares
- **Bordes:** Bordes suaves según tokens UBITS
- **Sombra:** Sombra sutil según tamaño

### Badge

- **Posición:** Esquina superior derecha
- **Tamaño:** Se ajusta según el tamaño del avatar
- **Contenido:** Texto o número centrado
- **Dot:** Punto pequeño si no hay contenido

---

## 🚨 Errores Comunes

### Error 1: Múltiples Variantes Simultáneas
**Problema:** Proporcionar `imageUrl`, `initials` e `icon` al mismo tiempo  
**Solución:** Usar solo una variante (prioridad: imageUrl > initials > icon)

```javascript
// ❌ Incorrecto - múltiples variantes
window.createAvatar({
  imageUrl: '/images/user.jpg',
  initials: 'JD',
  icon: 'user'
  // Se usará imageUrl, los demás se ignoran
});

// ✅ Correcto - una variante
window.createAvatar({
  imageUrl: '/images/user.jpg'
  // O solo initials, o solo icon
});
```

### Error 2: Badge sin Color
**Problema:** Proporcionar `badgeContent` sin `badgeColor`  
**Solución:** Siempre proporcionar `badgeColor` si quieres mostrar badge

```javascript
// ❌ Incorrecto - badge sin color
badgeContent: '5',
badgeColor: '' // No se mostrará

// ✅ Correcto - badge con color
badgeColor: 'red',
badgeContent: '5'
```

### Error 3: Iniciales Vacías o Muy Largas
**Problema:** Iniciales que no se generan correctamente  
**Solución:** Proporcionar nombre completo o iniciales manuales

```javascript
// ❌ Incorrecto - puede generar iniciales incorrectas
initials: ''

// ✅ Correcto - nombre completo
initials: 'John Doe' // Genera "JD"

// ✅ Correcto - iniciales manuales
initials: 'JD'
```

### Error 4: Imagen Rota sin Fallback
**Problema:** Avatar con imagen que no carga  
**Solución:** Implementar fallback a iniciales o icono

```javascript
// ✅ Correcto - con fallback
const avatar = window.createAvatar({
  imageUrl: '/images/user.jpg',
  initials: 'JD', // Fallback si la imagen falla
  size: 'md'
});

// Verificar si la imagen cargó
const img = avatar.querySelector('img');
if (img) {
  img.onerror = () => {
    // Cambiar a iniciales si la imagen falla
    avatar.innerHTML = window.renderAvatar({
      initials: 'JD',
      size: 'md'
    });
  };
}
```

### Error 5: Usar Iconos con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
icon: 'fa-user'

// ✅ Correcto
icon: 'user'
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

