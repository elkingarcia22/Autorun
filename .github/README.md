# 📖 Índice de Documentación

Guía rápida para encontrar la documentación que necesitas.

---

## 🚀 Para Empezar

1. **[GETTING-STARTED.md](../GETTING-STARTED.md)** ⭐ - Empieza aquí (5 minutos)
2. **[README.md](../README.md)** - Documentación completa del proyecto
3. **[QUICK-START.md](../QUICK-START.md)** - Solución rápida de problemas

---

## 📁 Estructura de Documentación

### Documentos Principales (Raíz)

| Archivo | Descripción |
|---------|-------------|
| `README.md` | 📖 Documentación completa del proyecto |
| `GETTING-STARTED.md` | 🚀 Guía de inicio rápido |
| `QUICK-START.md` | ⚡ Solución de problemas comunes |

### Documentos en `/docs`

| Archivo | Descripción |
|---------|-------------|
| `GUIA-SETUP-UBITS.md` | 🎯 Setup completo para proyectos UBITS |
| `ANALISIS-SETUP-UBITS.md` | 🔍 Análisis técnico del setup UBITS |
| `PRESET-UBITS-OPTIMIZADO.md` | ⚙️ Preset optimizado de add-ons |
| `DETECCION-CONFLICTOS-ADDONS.md` | 🔧 Sistema de detección de conflictos |

---

## 🗂️ Estructura del Proyecto

```
Autorun/
├── 📄 GETTING-STARTED.md      ← Empieza aquí
├── 📄 README.md               ← Documentación completa
├── 📄 QUICK-START.md          ← Solución de problemas
│
├── 📂 scripts/                ← Scripts de utilidad
│   └── verify-setup.js        ← Verificación post-instalación
│
├── 📂 packages/
│   ├── autorun-core/          ← Núcleo del sistema
│   │   ├── src/
│   │   │   ├── cli/          ← Scripts CLI
│   │   │   │   └── autorun-init.ts  ← Wizard de inicialización
│   │   │   └── wizard/       ← Sistema de wizard
│   │   └── README.md
│   │
│   ├── addons/                ← Add-ons del sistema
│   │   ├── functional/        ← Add-ons funcionales
│   │   └── [component]/       ← Add-ons de componentes
│   │
│   └── proyecto-app/          ← Aplicación principal
│       └── tokens/
│           └── index.html     ← Hub de documentación interactiva
│
└── 📂 docs/                   ← Documentación adicional
    ├── GUIA-SETUP-UBITS.md
    └── ...
```

---

## 🔍 Dónde Encontrar Qué

### Quiero empezar rápido
→ **[GETTING-STARTED.md](../GETTING-STARTED.md)**

### Tengo un problema
→ **[QUICK-START.md](../QUICK-START.md)**

### Quiero entender el proyecto completo
→ **[README.md](../README.md)**

### Quiero configurar UBITS
→ **[docs/GUIA-SETUP-UBITS.md](../docs/GUIA-SETUP-UBITS.md)**

### Quiero ver la documentación interactiva
→ **[packages/proyecto-app/tokens/index.html](../packages/proyecto-app/tokens/index.html)**

### Quiero entender los add-ons
→ Cada add-on tiene su `README.md` en `packages/addons/[nombre]/README.md`

---

## 🛠️ Scripts Importantes

| Comando | Qué hace |
|---------|----------|
| `npm run init` | 🎯 Wizard de inicialización |
| `npm run verify` | ✅ Verificar setup |
| `npm run dev` | 🚀 Servidor desarrollo |

Ver todos: `npm run` o revisa `package.json`

---

## 📞 Ayuda

- **Problemas comunes:** [QUICK-START.md](../QUICK-START.md)
- **Documentación completa:** [README.md](../README.md)
- **Issues:** GitHub Issues
