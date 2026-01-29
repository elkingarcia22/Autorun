# 🚀 Inicio Rápido - Autorun

> ⚡ **Empieza aquí** - Guía de 5 minutos para comenzar con Autorun

---

## 📋 Paso 1: Clonar e Instalar

```bash
# Clonar el repositorio
git clone https://github.com/elkingarcia22/Autorun.git
cd Autorun

# Instalar dependencias del proyecto (verificación automática incluida)
npm install

# Instalar dependencias de Storybook
cd vendor/ubits/packages/storybook
npm install
cd ../../../../

# Instalar Autorun MCP Server (se ejecuta automáticamente después de npm install)
# Si no se instaló automáticamente, ejecuta:
npm run autorun:install-mcp
```

**✅ Verificación automática:** Después de `npm install`, se ejecuta automáticamente una verificación que comprueba:
- Estructura del proyecto
- Scripts configurados
- Dependencias necesarias
- Archivos del wizard
- **Instalación automática del Autorun MCP Server** (se configura en `.cursor/mcp.json`)

Si todo está correcto, verás: `✅ ¡Todo está listo! Puedes ejecutar: npm run init`

**⚠️ IMPORTANTE:** Después de la instalación, **reinicia Cursor** para que cargue el Autorun MCP Server.

---

## 📋 Paso 2: Configurar Scripts (Opcional pero Recomendado)

```bash
# Desde dentro del directorio Autorun
npm run setup-project
```

Esto creará un `package.json` en la raíz del proyecto (un nivel arriba de Autorun) con los scripts necesarios para ejecutar el wizard desde cualquier directorio del proyecto.

**Estructura resultante:**
```
MiProyecto/
├── Autorun/          ← Aquí ejecutas: npm run setup-project
│   └── ...
└── package.json      ← Se crea automáticamente aquí
```

---

## 📋 Paso 3: Inicializar el Wizard

### Opción 1: Desde cualquier directorio (Recomendado) ⭐

```bash
# Desde MiProyecto/ o cualquier subdirectorio
npm run wizard
```

El script buscará automáticamente el directorio `Autorun` y ejecutará el wizard.

### Opción 2: Desde dentro de Autorun (Tradicional)

```bash
# Desde dentro del directorio Autorun
cd Autorun
npm run init
```

**💡 Por qué en la terminal:**
- El wizard necesita acceso interactivo a stdin/stdout para leer tus respuestas
- El chat de Cursor no puede proporcionar input interactivo correctamente
- Ejecutar en la terminal garantiza que puedas responder todas las preguntas

---

## 🎯 El Wizard Te Preguntará

1. **🎯 Template:** 
   - Administrador (Todos los módulos disponibles)
   - Colaborador (Módulos limitados)

2. **📦 Módulo y Producto:**
   - Selecciona el módulo (Aprendizaje, Desempeño, Empresa, Encuestas, etc.)
   - Selecciona el producto específico dentro del módulo (o módulo solo)

3. **🔒 Navegación:**
   - ¿Quieres desactivar la navegación a otros módulos en el prototipo?
   - Si seleccionas "Sí", solo podrás navegar al módulo seleccionado (útil para evitar que el usuario se pierda)

4. **🔌 Add-ons:**
   - Instalar solo los add-ons por defecto
   - O agregar otros add-ons adicionales

5. **🐙 GitHub:**
   - ¿Quieres configurar GitHub ahora? (opcional, se puede configurar después)

---

## ✅ ¿Qué hace el wizard automáticamente?

El wizard ejecuta en orden:

1. ✅ Clona y verifica repositorio UBITS (si no existe `vendor/ubits/`)
2. ✅ Conecta con Storybook UBITS
3. ✅ Carga componentes desde Storybook
4. ✅ Instala add-ons seleccionados
5. ✅ Configura sidebar y subnav para tu módulo
6. ✅ Crea ambos templates (administrador y colaborador)
7. ✅ Valida templates creados
8. ✅ Abre solo el template seleccionado en el navegador

---

## 📝 Notas Importantes

- **Portabilidad:** El proyecto incluye `vendor/ubits/packages/` para que funcione en cualquier computador sin configuración adicional
- **Templates:** Ambos templates se crean siempre, pero solo se abre el seleccionado
- **GitHub:** Se puede configurar durante el wizard o después
- **Configuración:** Todo se guarda en `.ubits/project-config.json` y `autorun.config.json`

---

## 🚀 Siguiente Paso

Una vez inicializado, puedes:

1. Trabajar en el template abierto
2. Cambiar entre templates manualmente abriendo el otro archivo en `prototypes/`
3. Continuar prototipando con componentes UBITS desde Storybook

---

## 📚 Documentación Adicional

Para más información sobre:
- **Uso de componentes UBITS:** Ver `docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md`
- **Proceso de implementación:** Ver `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Errores comunes:** Ver `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- **Wizard automático:** Ver `docs/guias/uso/GUIA-USO-WIZARD-AUTOMATICO.md`
- **Solución de problemas:** Ver `QUICK-START.md`

---

## ❓ ¿Problemas?

Consulta **[QUICK-START.md](./QUICK-START.md)** para soluciones rápidas a problemas comunes.

