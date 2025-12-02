# 🚀 Instrucciones de Inicialización - Autorun

Este documento contiene las instrucciones para inicializar un proyecto Autorun desde cero usando Cursor.

## 📋 Paso 1: Clonar e Instalar Dependencias

```bash
# Clonar el repositorio
git clone https://github.com/elkingarcia22/Autorun.git
cd Autorun

# Instalar dependencias
npm install
```

**Verificación:** Si ves `✅ ¡Todo está listo! Puedes ejecutar: npm run init`, todo está correcto.

---

## 📋 Paso 2: Configurar Scripts en la Raíz del Proyecto

**⚠️ IMPORTANTE: Ejecuta este comando en la TERMINAL, NO en el chat de Cursor.**

```bash
# Desde dentro del directorio Autorun
npm run setup-project
```

Este comando creará un `package.json` en la raíz del proyecto (un nivel arriba de Autorun) con los scripts necesarios para ejecutar el wizard desde cualquier directorio del proyecto.

**Ejemplo de estructura:**
```
MiProyecto/
├── Autorun/          ← Aquí ejecutas: npm run setup-project
│   └── ...
└── package.json      ← Se crea automáticamente aquí
```

---

## 🎯 Paso 3: Inicializar el Wizard

**⚠️ IMPORTANTE: Ejecuta este comando en la TERMINAL, NO en el chat de Cursor.**

Una vez configurado, ejecuta el wizard interactivo desde la raíz del proyecto:

```bash
# Desde la raíz del proyecto (un nivel arriba de Autorun)
npm run wizard
```

O desde dentro de Autorun:

```bash
# Desde dentro del directorio Autorun
cd Autorun
npm run init
```

**💡 Por qué en la terminal:**
- El wizard necesita acceso interactivo a stdin/stdout para leer tus respuestas
- El chat de Cursor no puede proporcionar input interactivo correctamente
- Ejecutar en la terminal garantiza que puedas responder todas las preguntas

**El wizard te preguntará:**

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
- **Uso de componentes UBITS:** Ver `GUIA-USO-COMPONENTES-UBITS.md`
- **Proceso de implementación:** Ver `GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Errores comunes:** Ver `GUIA-ERRORES-COMUNES-UBITS.md`
- **Wizard automático:** Ver `GUIA-USO-WIZARD-AUTOMATICO.md`
