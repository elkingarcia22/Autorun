# 🚀 Inicio Rápido de Autorun

## 📋 Proceso de Instalación

1. **Crear carpeta del proyecto:**
   ```bash
   mkdir MiProyecto
   cd MiProyecto
   ```

2. **Clonar Autorun dentro de la carpeta:**
   ```bash
   git clone https://github.com/elkingarcia22/Autorun.git
   cd Autorun
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Configurar scripts en la raíz del proyecto (opcional pero recomendado):**
   ```bash
   # Desde Autorun/
   npm run setup-project
   ```
   Esto creará un `package.json` en la raíz del proyecto con los scripts necesarios.

5. **Ejecutar el wizard:**
   ```bash
   # Desde cualquier directorio del proyecto
   npm run wizard
   # O desde dentro de Autorun/
   cd Autorun && npm run init
   ```

## ⚠️ IMPORTANTE

**Ahora puedes ejecutar el wizard desde cualquier directorio del proyecto:**

### Opción 1: Desde cualquier directorio (Recomendado) ⭐

```bash
# Desde MiProyecto/ o cualquier subdirectorio
npm run wizard
# O usando el script directamente:
node Autorun/scripts/run-init.js
```

El script buscará automáticamente el directorio `Autorun` y ejecutará el wizard.

### Opción 2: Desde dentro de Autorun (Tradicional)

```bash
cd MiProyecto/Autorun
npm run init
```

**NO desde la carpeta del proyecto sin el script:**
```bash
cd MiProyecto
npm run init  # ❌ Esto NO funcionará (a menos que uses npm run wizard)
```

## 🎯 Estructura de Carpetas

```
MiProyecto/
├── Autorun/          ← Aquí está el proyecto Autorun
│   ├── package.json  ← El script "init" está aquí
│   └── ...
└── prototypes/       ← Los templates se crean aquí (después del wizard)
```

## 💡 Consejo

Si quieres ejecutar desde la carpeta del proyecto, puedes crear un alias o script:

```bash
# Desde MiProyecto/
cd Autorun && npm run init
```

O crear un script en `MiProyecto/package.json`:

```json
{
  "scripts": {
    "init": "cd Autorun && npm run init"
  }
}
```

