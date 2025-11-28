# 📚 Storybook UBITS

Documentación interactiva de todos los componentes del sistema de diseño UBITS.

## 🚀 Inicio Rápido

```bash
# Desde la raíz del proyecto
npm run storybook

# O desde este directorio
cd packages/storybook
npm run storybook
```

Storybook se abrirá en `http://localhost:6006`

## ⚠️ Primera Vez o Problemas?

Si es la primera vez que inicias Storybook o si encuentras problemas, **lee primero**:

👉 **[SETUP-STORYBOOK.md](./SETUP-STORYBOOK.md)** - Guía completa de configuración

Esta guía incluye:
- ✅ Configuración paso a paso
- ✅ Solución de problemas comunes
- ✅ Checklist de verificación
- ✅ Valores correctos de tokens
- ✅ Archivos de configuración completos

## 🔍 Verificación Rápida

Ejecuta el script de verificación antes de iniciar:

```bash
./verificar-setup.sh
```

Este script verifica:
- Archivos de configuración
- Dependencias instaladas
- Tokens generados
- Assets estáticos

## 📋 Checklist Rápido

Antes de iniciar Storybook:

- [ ] Dependencias instaladas: `npm install` (en `packages/storybook`)
- [ ] Tokens generados: `npm run build:tokens` (desde la raíz)
- [ ] Archivos de configuración existen (`.storybook/main.ts`, `.storybook/preview.ts`)
- [ ] Plugin existe (`.storybook/plugins/ignore-tsconfig-node-json.ts`)
- [ ] Assets existen (`stories/assets/images/`, `stories/assets/webfonts/`)
- [ ] FontAwesome CSS existe (`docs-site/.storybook/fontawesome-icons.css`)

## 🐛 Problemas Comunes

| Problema | Solución Rápida |
|----------|-----------------|
| No inicia | Verifica `.storybook/main.ts` existe |
| Imágenes 404 | Verifica `staticDirs` en `main.ts` |
| Sin iconos | Verifica FontAwesome CSS y webfonts |
| Sin estilos | Verifica imports en `preview.ts` |
| Colores incorrectos | Regenera tokens: `npm run build:tokens` |

**Para más detalles:** Consulta [SETUP-STORYBOOK.md](./SETUP-STORYBOOK.md)

## 📚 Estructura

```
packages/storybook/
├── .storybook/              # Configuración
│   ├── main.ts              # Config principal
│   ├── preview.ts           # Preview y estilos globales
│   └── plugins/             # Plugins personalizados
├── stories/                 # Stories de componentes
│   ├── *.stories.ts
│   └── assets/             # Imágenes y fuentes
├── docs-site/              # Configuración anterior (referencia)
└── SETUP-STORYBOOK.md      # Guía completa de setup
```

## 🎨 Tokens de Feedback

Los colores de feedback deben tener estos valores:

- **Success**: Verde `#41c433` (accent), `#e8f8e4` (bg)
- **Error**: Rojo `#e20d34` (accent), `#fff0ee` (bg)
- **Warning**: Naranja `#d68b0d` (accent), `#fff1e0` (bg)
- **Info**: Azul `#7397fe` (accent), `rgba(12, 91, 239, 0.15)` (bg)

Si los colores no se ven bien, regenera los tokens:
```bash
npm run build:tokens
```

---

**📖 Documentación completa:** [SETUP-STORYBOOK.md](./SETUP-STORYBOOK.md)

