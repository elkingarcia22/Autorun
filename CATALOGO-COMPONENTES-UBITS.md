# 📚 Catálogo de Componentes UBITS

Este catálogo ayuda a identificar componentes UBITS existentes antes de crear nuevos. **SIEMPRE consulta este catálogo cuando recibas una imagen o solicitud de componente.**

---

## 🎯 Componentes de Navegación

### 1. **Sidebar** (`window.createSidebar()`)
**Descripción visual:**
- Barra lateral izquierda con menú de navegación
- Iconos de módulos (Inicio, Empresa, Aprendizaje, Desempeño, etc.)
- Avatar de usuario en la parte inferior
- Variantes: `administrador` y `colaborador`
- Se expande/colapsa

**Cómo identificar:**
- Barra vertical en el lado izquierdo
- Lista de módulos con iconos
- Perfil de usuario abajo
- Logo UBITS arriba

**Uso:**
```javascript
window.createSidebar({
  variant: 'administrador', // o 'colaborador'
  enabledModules: ['inicio', 'empresa', 'aprendizaje']
});
```

---

### 2. **SubNav** (`window.createSubNav()`)
**Descripción visual:**
- Barra horizontal debajo del header
- Tabs/pestañas para navegar entre productos de un módulo
- Ejemplo: En "Aprendizaje" muestra tabs: "LMS - Cursos", "Plan de formación", etc.

**Cómo identificar:**
- Barra horizontal con tabs
- Debajo del header principal
- Muestra opciones de navegación secundaria

**Uso:**
```javascript
window.createSubNav({
  variant: 'aprendizaje', // o 'desempeno', 'template'
  items: [
    { id: 'lms-cursos', name: 'LMS - Cursos', icon: 'far fa-book' }
  ]
});
```

---

### 3. **TabBar** (`window.createTabBar()`)
**Descripción visual:**
- Barra de tabs en la parte inferior (móvil)
- Iconos grandes para navegación táctil
- Solo visible en dispositivos móviles

**Cómo identificar:**
- Barra inferior con iconos grandes
- Solo en vista móvil
- Navegación principal para móvil

**Uso:**
```javascript
window.createTabBar({
  items: [
    { id: 'inicio', icon: 'far fa-home', label: 'Inicio' }
  ]
});
```

---

### 3.1. **Tabs** (`window.createTabs()`) ⭐
**Descripción visual:**
- Tabs/pestañas horizontales para navegación dentro de una sección
- Iconos opcionales en cada tab
- Un tab activo (resaltado)
- Usado para sub-navegación dentro de contenido

**Cómo identificar:**
- Tabs horizontales dentro del contenido
- No es el SubNav (que está debajo del header)
- No es el TabBar (que está en la parte inferior móvil)
- Tabs para cambiar entre vistas dentro de una sección

**Uso:**
```javascript
// ⚠️ IMPORTANTE: Para iconos, usar SOLO el nombre (sin 'far fa-' o 'fas fa-')
window.createTabs({
  tabs: [
    { 
      id: 'tab1', 
      label: 'Tab 1', 
      icon: 'home'  // ✅ CORRECTO: solo el nombre
    },
    { 
      id: 'tab2', 
      label: 'Tab 2', 
      icon: 'user'  // ✅ CORRECTO: solo el nombre
    }
  ],
  activeTabId: 'tab1',
  onTabChange: (tabId, tabElement) => {
    console.log('Tab cambiado:', tabId);
  }
}, 'tabs-container');
```

**⚠️ ERROR COMÚN A EVITAR:**
```javascript
// ❌ INCORRECTO: NO usar prefijos en iconos
{ id: 'tab1', label: 'Tab 1', icon: 'far fa-home' }  // ❌ MAL
{ id: 'tab1', label: 'Tab 1', icon: 'fas fa-user' }  // ❌ MAL

// ✅ CORRECTO: Solo el nombre del icono
{ id: 'tab1', label: 'Tab 1', icon: 'home' }  // ✅ BIEN
{ id: 'tab1', label: 'Tab 1', icon: 'user' }  // ✅ BIEN
```

**Ver:** `GUIA-ERRORES-COMUNES-UBITS.md` para más detalles sobre este error.

---

## 🎨 Componentes de UI Base

### 4. **Button** (`window.UBITS.Button` o `<ubits-button>`)
**Descripción visual:**
- Botón con variantes: `primary`, `secondary`, `outline`, `ghost`
- Colores: azul primario (#0c5bef en light, #8c91fa en dark)
- Tamaños: `sm`, `md`, `lg`
- Estados: normal, hover, disabled, loading

**Cómo identificar:**
- Botón rectangular con texto
- Puede tener icono
- Colores azules característicos de UBITS
- Bordes redondeados

**Uso:**
```javascript
// Web Component
<ubits-button variant="primary" size="md">Click me</ubits-button>

// API
window.UBITS.Button.create({
  variant: 'primary',
  label: 'Click me',
  size: 'md'
});
```

---

### 5. **Alert** (`<ubits-alert>` o `window.UBITS.Alert`)
**Descripción visual:**
- Caja de alerta con icono
- Variantes: `info`, `success`, `warning`, `error`
- Colores según tipo
- Puede cerrarse

**Cómo identificar:**
- Caja con borde de color
- Icono a la izquierda
- Texto de mensaje
- Botón de cerrar (opcional)

**Uso:**
```html
<ubits-alert variant="info" closable>
  Este es un mensaje informativo
</ubits-alert>
```

---

### 6. **Card** (`<ubits-card>` o `window.UBITS.Card`)
**Descripción visual:**
- Tarjeta con sombra
- Contenedor con padding
- Bordes redondeados
- Fondo blanco (light) o gris oscuro (dark)

**Cómo identificar:**
- Caja con sombra
- Contenido dentro
- Bordes redondeados
- Padding interno

**Uso:**
```html
<ubits-card>
  <h3>Título</h3>
  <p>Contenido de la tarjeta</p>
</ubits-card>
```

---

### 7. **Input** (`<ubits-input>` o `window.UBITS.Input`)
**Descripción visual:**
- Campo de texto con label
- Borde que cambia de color al focus
- Placeholder
- Estados: normal, focus, error, disabled

**Cómo identificar:**
- Campo de texto rectangular
- Label arriba o como placeholder
- Borde que se resalta al hacer focus

**Uso:**
```html
<ubits-input 
  label="Nombre" 
  placeholder="Ingresa tu nombre"
  type="text"
></ubits-input>
```

---

### 8. **Table** (`<ubits-table>` o `window.UBITS.Table`)
**Descripción visual:**
- Tabla con filas y columnas
- Header con fondo diferente
- Filas alternadas (zebra striping)
- Bordes sutiles
- Paginación (opcional)

**Cómo identificar:**
- Estructura de tabla HTML
- Filas y columnas
- Header destacado
- Alternancia de colores en filas

**Uso:**
```html
<ubits-table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Juan</td>
      <td>juan@example.com</td>
    </tr>
  </tbody>
</ubits-table>
```

---

### 9. **Modal** (`<ubits-modal>` o `window.UBITS.Modal`)
**Descripción visual:**
- Ventana flotante sobre el contenido
- Fondo oscuro (overlay)
- Contenido centrado
- Botón de cerrar (X)
- Título y cuerpo

**Cómo identificar:**
- Ventana flotante
- Fondo oscuro detrás
- Botón X para cerrar
- Contenido centrado

**Uso:**
```html
<ubits-modal open>
  <h2>Título del Modal</h2>
  <p>Contenido del modal</p>
</ubits-modal>
```

---

## 📋 Componentes Especiales

### 10. **Welcome** (`autorun-welcome`)
**Descripción visual:**
- Pantalla de bienvenida
- Mensaje de inicio
- Puede tener ilustración

**Cómo identificar:**
- Pantalla completa o sección grande
- Mensaje de bienvenida
- Diseño centrado

---

### 11. **Button Feedback** (`autorun-button-feedback`)
**Descripción visual:**
- Botón con funcionalidad de feedback
- Puede mostrar estado de envío
- Integrado con sistema de feedback

**Cómo identificar:**
- Botón especial con funcionalidad de feedback
- Puede tener icono de feedback

---

### 12. **Mask** (`autorun-mask`)
**Descripción visual:**
- Overlay/máscara sobre contenido
- Usado para loading, bloqueo, etc.
- Fondo semitransparente

**Cómo identificar:**
- Capa sobre contenido
- Fondo oscuro semitransparente
- Puede tener spinner o mensaje

---

## 🔍 Cómo Identificar Componentes desde Imágenes

### Proceso de Identificación:

1. **Analizar la estructura visual:**
   - ¿Es una barra lateral? → Sidebar
   - ¿Es una barra horizontal con tabs? → SubNav
   - ¿Es un botón? → Button
   - ¿Es una tabla? → Table
   - ¿Es una tarjeta? → Card

2. **Verificar características UBITS:**
   - Colores azules (#0c5bef o #8c91fa)
   - Estilo consistente con design system
   - Tokens UBITS (no colores hardcodeados)

3. **Consultar este catálogo:**
   - Buscar componente similar
   - Verificar si existe antes de crear

4. **Si no encuentras coincidencia:**
   - **PREGUNTAR AL USUARIO:**
     - "¿Este componente que muestras es un componente UBITS existente?"
     - "¿O quieres que lo cree usando los tokens de UBITS?"

---

## ✅ Checklist Antes de Crear un Componente

- [ ] ¿He revisado este catálogo?
- [ ] ¿He buscado en los componentes disponibles?
- [ ] ¿He verificado si existe algo similar?
- [ ] ¿He preguntado al usuario si es un componente UBITS?
- [ ] ¿He confirmado que debo crear uno nuevo?

---

## 🚨 Regla de Oro

> **NUNCA crees un componente nuevo sin antes:**
> 1. Consultar este catálogo
> 2. Buscar componentes similares
> 3. Preguntar al usuario si es un componente UBITS existente
> 4. Si no es UBITS, preguntar si quiere crearlo con tokens UBITS

---

## 📚 Referencias

- **Storybook UBITS:** https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app
- **Componentes disponibles:** `window.UBITS` y `window.AUTORUN.Components`
- **Guía de uso:** `GUIA-USO-COMPONENTES-UBITS.md`
- **Estrategia:** `ESTRATEGIA-COMPONENTES-UBITS.md`

