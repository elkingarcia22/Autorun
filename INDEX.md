# 🚀 Instrucciones de Inicialización - Autorun

Este documento contiene las instrucciones para inicializar un proyecto Autorun desde cero usando Cursor.

## 📋 Flujo de Inicialización Completo

Cuando se inicializa un proyecto Autorun, sigue estos pasos en orden:

### 1️⃣ Clonar e Instalar Dependencias

```bash
# Clonar el repositorio
git clone https://github.com/elkingarcia22/Autorun.git
cd Autorun

# Instalar dependencias
npm install
```

**Verificación:** Si ves `✅ ¡Todo está listo! Puedes ejecutar: npm run init`, todo está correcto.

---

### 2️⃣ Instalar Add-ons por Defecto

Los add-ons por defecto se instalan automáticamente cuando se ejecuta el wizard. No requiere acción manual.

**Add-ons incluidos por defecto:**
- 📚 Storybook - Desarrollo y documentación de componentes
- 🎨 Figma Sync - Sincronización de tokens desde Figma
- 🔍 ESLint - Detección de errores de código
- ✨ Prettier - Formateo automático de código
- 🧪 Vitest - Unit testing (rápido y moderno)
- 🎭 Playwright - Testing end-to-end
- 🖼️ Chromatic - Visual testing y comparación
- 🔒 Snyk - Escaneo de vulnerabilidades
- 🔄 Renovate - Actualizaciones automáticas
- ⚡ Lighthouse - Análisis de rendimiento
- 📊 Bundle Analyzer - Análisis de tamaño de bundle
- 🚀 Standalone - Componentes standalone
- 🐛 Sentry - Monitoreo de errores
- 👁️ Clarity - Análisis de comportamiento de usuarios
- ☁️ Vercel - Despliegue en Vercel
- 🐙 GitHub - Integración con GitHub
- 📈 Codecov - Cobertura de código
- 💬 Feedback - Sistema de feedback automatizado

---

### 3️⃣ Configurar GitHub

**El wizard pregunta automáticamente por la URL del repositorio GitHub** antes de instalar los add-ons.

**Flujo:**
1. El wizard pregunta: `🐙 ¿Cuál es la URL de tu repositorio GitHub? (presiona Enter para omitir)`
2. Puedes proporcionar la URL (ej: `https://github.com/tu-usuario/tu-repo.git`)
3. O presionar Enter para omitir (se puede configurar después)

**Configuración automática:**
- Si proporcionas la URL, se guarda automáticamente en la configuración
- El add-on de GitHub se configurará con:
  - `repositoryUrl`: La URL que proporcionaste
  - `branch`: `main` (por defecto)
  - `autoCommit`: `true` (por defecto)

---

### 4️⃣ Inicializar el Wizard

Ejecuta el wizard interactivo:

```bash
npm run init
```

**El wizard te preguntará:**

1. **🎯 Template:** 
   - Administrador (Todos los módulos disponibles)
   - Colaborador (Módulos limitados)

2. **📦 Módulo y Producto:**
   - Selecciona el módulo (Aprendizaje, Desempeño, Empresa, etc.)
   - Selecciona el producto específico dentro del módulo

3. **🔌 Add-ons:**
   - Instalar solo los add-ons por defecto
   - O agregar otros add-ons adicionales

---

### 5️⃣ Creación de Templates

**IMPORTANTE:** El wizard crea **ambos templates** (administrador y colaborador) automáticamente, pero **solo abre el template que seleccionaste** en el navegador.

**Flujo de creación:**
1. El wizard crea el template **administrador** con tu módulo y producto seleccionados
2. El wizard crea el template **colaborador** con tu módulo y producto seleccionados
3. Solo el template que seleccionaste se abre automáticamente en el navegador

**Templates creados:**
- `prototypes/canvas-administrador-[modulo]-[producto]-[fecha].html`
- `prototypes/canvas-colaborador-[modulo]-[producto]-[fecha].html`

**Template abierto:**
- Solo el template que seleccionaste durante el wizard se abre automáticamente en el navegador
- El otro template está disponible en la carpeta `prototypes/` para abrirlo manualmente cuando lo necesites

---

## 🎯 Resumen del Flujo Completo

```bash
# 1. Clonar e instalar
git clone https://github.com/elkingarcia22/Autorun.git
cd Autorun
npm install

# 2. Inicializar (esto hace todo automáticamente):
npm run init
```

**El wizard ejecuta en orden:**
1. ✅ Clona y verifica repositorio UBITS
2. ✅ Conecta con Storybook UBITS
3. ✅ Carga componentes desde Storybook
4. ✅ **Pregunta por URL de GitHub** (opcional)
5. ✅ Instala add-ons por defecto
6. ✅ Configura sidebar y subnav
7. ✅ **Crea ambos templates** (administrador y colaborador)
8. ✅ Valida templates creados
9. ✅ **Abre solo el template seleccionado** en el navegador

---

## 📝 Notas Importantes

- **Templates:** Ambos templates se crean siempre, pero solo se abre el seleccionado
- **GitHub:** Se configura automáticamente si el add-on está instalado
- **Add-ons:** Los add-ons por defecto se instalan automáticamente durante el wizard
- **Configuración:** Todo se guarda en `.ubits/project-config.json` y `autorun.config.json`

---

## 🔧 Configuración Manual (Opcional)

Si prefieres configurar manualmente sin el wizard:

```bash
# Configurar variables de entorno
export AUTORUN_PROJECT_TYPE=ubits
export AUTORUN_TEMPLATE=administrador
export AUTORUN_MODULE=desempeno
export AUTORUN_PRODUCT=matriz-talento
export AUTORUN_GITHUB_URL=https://github.com/tu-usuario/tu-repo.git

# Ejecutar wizard (usará las respuestas automáticas)
npm run init
```

---

## ✅ Verificación Final

Después de la inicialización, verifica:

1. ✅ Ambos templates creados en `prototypes/`
2. ✅ Template seleccionado abierto en el navegador
3. ✅ Add-ons instalados correctamente
4. ✅ GitHub configurado (si se proporcionó URL)
5. ✅ Configuración guardada en `.ubits/project-config.json`

---

## 🚀 Siguiente Paso

Una vez inicializado, puedes:

1. Trabajar en el template abierto
2. Cambiar entre templates manualmente abriendo el otro archivo
3. Continuar prototipando con componentes UBITS desde Storybook

