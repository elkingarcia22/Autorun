# 🎯 Prompt Inicial para Cursor AI - Template UBITS

## Instrucciones para Iniciar un Nuevo Proyecto UBITS

Estás trabajando con el **Template UBITS**, un sistema completo para crear aplicaciones UBITS con diseño system, componentes modulares y validación automática.

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/elkingarcia22/prototipo-template.git
cd prototipo-template
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Inicializar el Proyecto

Ejecuta el comando de inicialización interactiva:

```bash
npm run init
```

Este comando te pedirá:
1. **URL del repositorio GitHub** donde quieres trabajar
2. **Perfil a usar**:
   - **Colaborador**: Para usuarios normales con acceso a módulos básicos (Aprendizaje, Desempeño, Diagnóstico)
   - **Administrador**: Para administradores con acceso completo (Gestión de usuarios, Evaluaciones 360°, LMS, etc.)

### Paso 4: Seleccionar el Template Correcto

Según el perfil seleccionado, el sistema configurará automáticamente:

- **Si seleccionaste "Colaborador"**:
  - Usa `packages/playground-app/template-colaborador.html`
  - Sidebar con módulos básicos
  - Sin acceso a administración

- **Si seleccionaste "Administrador"**:
  - Usa `packages/playground-app/template-admin.html`
  - Sidebar con módulos de administración
  - Acceso completo a todas las funciones

### Paso 5: Iniciar Desarrollo

```bash
# Terminal 1: Activar auto-commit y validación automática
npm run watch

# Terminal 2: Iniciar servidor de desarrollo
npm run dev
```

Abre el archivo correspondiente en tu navegador según el perfil seleccionado.

### Paso 6: Trabajar con el Template

#### Reglas Importantes:

1. **Siempre usa tokens UBITS** para colores, tipografía y espaciado
2. **Reutiliza componentes existentes** en lugar de crear nuevos
3. **Mantén la consistencia** con el diseño system
4. **Valida tu código** con `npm run validate` antes de hacer commit

#### Archivos Clave:

- `packages/playground-app/config/products.js` - Configuración de modos y productos
- `packages/playground-app/components-loader.js` - Lógica de componentes
- `packages/playground-app/engine/content-manager.js` - Gestión de contenido
- `.ubits/validation-rules.md` - Reglas de validación
- `.ubits/component-inventory.json` - Inventario de componentes

### Paso 7: Integrar Add-ons (Opcional)

Cuando estés listo, puedes integrar add-ons adicionales:

```bash
npm run integrate:addons
```

Esto te permitirá integrar:
- Microsoft Clarity (Analytics)
- Onboarding (Guía interactiva)
- Feedback Automation (Sistema de feedback)

### Paso 8: Desplegar

Al finalizar el desarrollo:

```bash
npm run deploy
```

Esto te guiará para desplegar en:
- Vercel (Recomendado)
- Render

---

## 📚 Documentación Adicional

- **Guía Completa**: Ver `GUIA-COMPLETA.md`
- **Reglas Cursor**: Ver `.cursorrules`
- **Validación**: Ver `.ubits/AUTO-VALIDATION.md`
- **Componentes**: Ver `.ubits/component-inventory.json`

---

## 🎨 Tokens y Componentes Disponibles

### Tokens de Color:
- `var(--ubits-bg-1)` - Fondo principal
- `var(--ubits-fg-1-high)` - Texto principal
- `var(--ubits-accent-brand)` - Color de marca
- `var(--ubits-border-1)` - Borde principal

### Tokens de Tipografía:
- `.ubits-heading-h1` - Título principal
- `.ubits-body-lg` - Texto grande
- `.ubits-body-md` - Texto mediano

### Componentes:
- `ubits-sidebar` - Navegación lateral
- `ubits-tabbar` - Navegación móvil
- `ubits-sub-nav` - Pestañas de navegación
- `ubits-button` - Botones
- `ubits-input` - Campos de entrada
- `ubits-card-content` - Tarjetas de contenido
- `ubits-alert` - Alertas
- `ubits-toast` - Notificaciones
- `ubits-badge` - Etiquetas

---

## ✅ Checklist de Inicio

- [ ] Clonado el repositorio
- [ ] Instaladas las dependencias (`npm install`)
- [ ] Ejecutado `npm run init` y seleccionado perfil
- [ ] Activado `npm run watch` para auto-commit
- [ ] Iniciado `npm run dev` para desarrollo
- [ ] Revisada la documentación en `GUIA-COMPLETA.md`
- [ ] Entendidas las reglas de validación en `.ubits/validation-rules.md`

---

**¡Listo para desarrollar!** 🚀

Cualquier duda, consulta la documentación completa o revisa los archivos de ejemplo en `packages/playground-app/`.

