# 🚀 Autorun - Sistema de Prototipado Rápido

Sistema modular para crear prototipos de alta calidad con componentes UBITS, add-ons funcionales y herramientas de desarrollo integradas.

> ⚡ **Inicio rápido:** Lee [GETTING-STARTED.md](./GETTING-STARTED.md) para empezar en 5 minutos
> 
> ❓ **¿Problemas?** Consulta [QUICK-START.md](./QUICK-START.md) para soluciones rápidas

---

## ⚡ Inicio Rápido

### 1️⃣ Clonar e Instalar

```bash
# Clonar el repositorio (asegúrate de usar la rama correcta)
git clone https://github.com/elkingarcia22/Autorun.git
cd Autorun

# Instalar dependencias (ejecuta verificación automática)
npm install
```

**✅ Verificación automática:** Después de `npm install`, se ejecuta automáticamente una verificación que comprueba:
- Estructura del proyecto
- Scripts configurados
- Dependencias necesarias
- Archivos del wizard

Si todo está correcto, verás: `✅ ¡Todo está listo! Puedes ejecutar: npm run init`

### 2️⃣ Inicializar Proyecto

```bash
# Ejecutar wizard interactivo de inicialización
npm run init
```

El wizard te guiará paso a paso:
1. **Tipo de proyecto:** UBITS (predefinido) o Independiente (personalizado)
2. **Template:** Administrador o Colaborador (si eliges UBITS)
3. **Módulo:** Aprendizaje, Desempeño, Colaboradores, etc.
4. **Producto:** Producto específico dentro del módulo

**Lo que hace automáticamente:**
- ✅ Activa add-ons predefinidos según tu elección
- ✅ Carga componentes desde Storybook UBITS
- ✅ Habilita módulo en sidebar
- ✅ Configura subnav con productos
- ✅ Crea lienzo HTML listo para prototipar
- ✅ Valida contra estándares UBITS
- ✅ Guarda configuración en `autorun.config.json`

---

## 📁 Estructura del Proyecto

```
Autorun/
├── 📄 README.md                    # Este archivo
├── 📄 package.json                 # Scripts y dependencias principales
├── 📄 QUICK-START.md               # Guía rápida de solución de problemas
│
├── 📂 scripts/                     # Scripts de utilidad
│   └── verify-setup.js            # Verificación post-instalación
│
├── 📂 packages/
│   ├── 📂 autorun-core/            # 🧠 Núcleo del sistema
│   │   ├── src/
│   │   │   ├── cli/               # Scripts CLI
│   │   │   │   └── autorun-init.ts # Wizard de inicialización
│   │   │   ├── wizard/             # Wizard de setup
│   │   │   ├── AutorunHub.ts      # Hub principal
│   │   │   └── ...
│   │   └── package.json
│   │
│   ├── 📂 addons/                  # 🔌 Add-ons del sistema
│   │   ├── functional/            # Add-ons funcionales
│   │   │   ├── feedback/          # Feedback automatizado
│   │   │   ├── storybook/         # Storybook
│   │   │   ├── github/            # GitHub integration
│   │   │   └── ...
│   │   └── [component]/           # Add-ons de componentes
│   │       ├── button/
│   │       ├── alert/
│   │       └── ...
│   │
│   └── 📂 proyecto-app/            # 📱 Aplicación principal
│       └── tokens/
│           └── index.html          # Hub de documentación
│
└── 📂 docs/                        # 📚 Documentación adicional
    ├── GUIA-SETUP-UBITS.md
    └── ...
```

---

## 🛠️ Scripts Disponibles

### Scripts Principales

| Script | Descripción |
|--------|-------------|
| `npm run init` | 🎯 **Wizard de inicialización interactiva** (soporta respuestas automáticas) |
| `npm run verify` | ✅ Verificación manual del setup |
| `npm run dev` | 🚀 Servidor de desarrollo |
| `npm run build` | 📦 Build del proyecto |
| `npm run lint` | 🔍 Linter (Biome) |
| `npm run format` | ✨ Formateo de código |

### Scripts del Core

```bash
cd packages/autorun-core
npm run build      # Compilar TypeScript
npm run test       # Ejecutar tests
npm run test:watch # Tests en modo watch
```

---

## 🎯 Flujo de Trabajo

### Para Proyectos UBITS

1. **Inicializar:**
   ```bash
   npm run init
   # Selecciona: UBITS → Administrador/Colaborador → Módulo → Producto
   ```

2. **Desarrollar:**
   - Abre el lienzo creado en `prototypes/canvas-*.html`
   - Usa componentes UBITS desde Storybook
   - Prototipa con feedback automatizado

3. **Desplegar:**
   - El add-on de Vercel despliega automáticamente
   - El add-on de GitHub hace commits automáticos
   - El add-on de Clarity monitorea analytics

### Para Proyectos Independientes

1. **Inicializar:**
   ```bash
   npm run init
   # Selecciona: Independiente → Elige add-ons
   ```

2. **Configurar:**
   - Edita `autorun.config.json`
   - Activa add-ons según necesites

---

## 📚 Documentación

### Guías Principales

- **[QUICK-START.md](./QUICK-START.md)** - Solución rápida de problemas
- **[docs/GUIA-SETUP-UBITS.md](./docs/GUIA-SETUP-UBITS.md)** - Setup completo para UBITS
- **[packages/proyecto-app/tokens/index.html](./packages/proyecto-app/tokens/index.html)** - Hub de documentación interactiva

### Documentación de Add-ons

Cada add-on tiene su propio README en:
- `packages/addons/functional/[addon-name]/README.md`
- `packages/addons/[component-name]/README.md`

---

## ❓ Solución de Problemas

### El script `init` no existe

**Causa:** Repositorio clonado antes de que se agregara el script.

**Solución:**
```bash
# Verificar rama
git branch --show-current

# Actualizar
git pull origin main

# O clonar de nuevo
git clone https://github.com/elkingarcia22/Autorun.git
```

### Error al ejecutar `npm run init`

**Verificar:**
```bash
# 1. Verificar que tsx esté instalado
npm list tsx

# 2. Verificar estructura
npm run verify

# 3. Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### El wizard no carga componentes

**Verificar:**
- URL de Storybook en `packages/autorun-core/src/wizard/UBITSPreset.ts`
- Conexión a internet
- Que los componentes existan en Storybook

---

## 🔧 Configuración

### Archivo de Configuración

Después de ejecutar `npm run init`, se crea `autorun.config.json`:

```json
{
  "autorun": {
    "version": "1.0.0",
    "projectType": "ubits",
    "ubits": {
      "template": "administrador",
      "module": "desempeno",
      "product": "objetivos"
    },
    "addons": {
      "active": ["storybook", "feedback", "vercel", ...]
    }
  }
}
```

---

## 🎨 Add-ons Disponibles

### Add-ons Funcionales

- **Storybook** - Desarrollo y documentación de componentes
- **Feedback** - Feedback automatizado (n8n, Google Sheets, Gemini, Slack)
- **Vercel** - Deploy automático
- **GitHub** - Versionado y commits automáticos
- **Clarity** - Analytics y heatmaps
- **ESLint/Prettier** - Calidad de código
- **Vitest/Playwright** - Testing
- **Snyk** - Security scanning
- Y más...

### Add-ons de Componentes

- **Button** - Botones UBITS
- **Alert** - Alertas y notificaciones
- **Mask** - Overlays y onboarding
- **Welcome** - Pantallas de bienvenida
- **ButtonFeedback** - Botón de feedback

---

## 🚀 Próximos Pasos

1. ✅ Clonar e instalar
2. ✅ Ejecutar `npm run init`
3. ✅ Seleccionar configuración
4. ✅ Abrir lienzo creado
5. ✅ Prototipar con componentes UBITS
6. ✅ Activar feedback automatizado
7. ✅ Desplegar con Vercel

---

## 📞 Soporte

- **Documentación completa:** `packages/proyecto-app/tokens/index.html`
- **Issues:** [GitHub Issues](https://github.com/elkingarcia22/Autorun/issues)
- **Rama activa:** `main`

---

## 📄 Licencia

ISC
