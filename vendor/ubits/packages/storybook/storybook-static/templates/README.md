# 📄 Templates UBITS

Templates listos para usar con el sistema de diseño UBITS: modo Colaborador y modo Administrador.

## 🚀 Inicio Rápido

```bash
# Desde la raíz del proyecto
npm run templates:serve

# O desde este directorio
cd packages/templates
python3 -m http.server 8000
```

Luego abre:
- **Administrador**: `http://localhost:8000/template-admin.html`
- **Colaborador**: `http://localhost:8000/template-colaborador.html`

## ⚠️ Primera Vez o Problemas?

Si es la primera vez o si encuentras problemas, **lee primero**:

👉 **[SETUP-TEMPLATES.md](./SETUP-TEMPLATES.md)** - Guía completa de configuración

Esta guía incluye:
- ✅ Configuración paso a paso
- ✅ Solución de problemas comunes
- ✅ Checklist de verificación
- ✅ Comandos útiles
- ✅ Estructura de archivos

## 🔍 Verificación Rápida

Ejecuta el script de verificación antes de iniciar:

```bash
npm run templates:verify

# O directamente
./verificar-setup.sh
```

Este script verifica:
- Archivos de templates
- Scripts requeridos
- Rutas CSS correctas
- Tokens generados
- Assets estáticos

## 📋 Checklist Rápido

Antes de iniciar los templates:

- [ ] Tokens generados: `npm run build:tokens` (desde la raíz)
- [ ] Dependencias instaladas: `npm install`
- [ ] Servidor HTTP corriendo (NO usar `file://`)
- [ ] Rutas CSS usan `../components/` (no `../addons/`)
- [ ] FontAwesome en `assets/fontawesome/`
- [ ] Imágenes en `assets/images/`

## 🐛 Problemas Comunes

| Problema | Solución Rápida |
|----------|-----------------|
| Sin estilos | Verifica rutas CSS y regenera tokens |
| CORS error | Usa servidor HTTP, no `file://` |
| Componentes vacíos | Verifica IDs de contenedores y scripts |
| Sin iconos | Verifica FontAwesome CSS y webfonts |
| Colores incorrectos | Regenera tokens: `npm run build:tokens` |

**Para más detalles:** Consulta [SETUP-TEMPLATES.md](./SETUP-TEMPLATES.md)

## 📚 Estructura

```
packages/templates/
├── template-admin.html          # Template administrador
├── template-colaborador.html    # Template colaborador
├── components-loader.js         # Cargador de componentes
├── config/                      # Configuración
│   ├── products.js             # Configuración de productos
│   ├── theme-manager.js         # Gestión de temas
│   └── responsive-manager.js   # Gestión responsive
├── engine/                      # Motor de templates
│   ├── template-loader.js       # Cargador de templates
│   └── content-manager.js      # Gestor de contenido
├── assets/                      # Assets estáticos
│   ├── fontawesome/            # FontAwesome Pro
│   └── images/                 # Imágenes
└── SETUP-TEMPLATES.md          # Guía completa de setup
```

## 🎨 Características

- ✅ **Modo Colaborador**: Módulos básicos (Aprendizaje, Desempeño, Diagnóstico)
- ✅ **Modo Administrador**: Acceso completo (Empresa, LMS, 360°, Diagnóstico, API)
- ✅ **Responsive**: Sidebar en desktop, TabBar en móvil
- ✅ **Temas**: Light y Dark mode
- ✅ **Componentes**: Todos los componentes UBITS con estilos

## 🔄 Comandos Útiles

```bash
# Regenerar tokens
npm run build:tokens

# Verificar configuración
npm run templates:verify

# Iniciar servidor
npm run templates:serve

# Ver logs en consola del navegador
# Abre DevTools (F12) y revisa la consola
```

---

**📖 Documentación completa:** [SETUP-TEMPLATES.md](./SETUP-TEMPLATES.md)

