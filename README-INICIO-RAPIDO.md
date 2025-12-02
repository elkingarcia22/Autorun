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

4. **Ejecutar el wizard:**
   ```bash
   npm run init
   ```

## ⚠️ IMPORTANTE

**Siempre ejecuta `npm run init` desde dentro del directorio `Autorun`:**

```bash
cd MiProyecto/Autorun
npm run init
```

**NO desde la carpeta del proyecto:**
```bash
cd MiProyecto
npm run init  # ❌ Esto NO funcionará
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

