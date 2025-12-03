# ⚡ Solución Rápida de Problemas - Autorun

> ❓ **¿Tienes un problema?** Consulta esta guía para soluciones rápidas

---

## 🚨 Problemas Comunes

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

---

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

---

### El wizard no carga componentes

**Verificar:**
- URL de Storybook en `packages/autorun-core/src/wizard/UBITSPreset.ts`
- Conexión a internet
- Que los componentes existan en Storybook

**Solución:**
- El sistema tiene fallback automático a `vendor/ubits/` si Storybook no está disponible
- Verifica que `vendor/ubits/packages/` existe

---

### Los cambios en HTML no se ven en localhost

**Solución 1: Recargar el navegador (Forzar recarga)**

**En macOS/Linux:**
- `Cmd + Shift + R` (Chrome/Firefox/Safari)
- O `Ctrl + Shift + R` (Chrome/Firefox)

**En Windows:**
- `Ctrl + Shift + R` (Chrome/Firefox)
- O `Ctrl + F5` (Chrome/Firefox)

**Solución 2: Verificar que el archivo se guardó**

1. Abre el archivo HTML en tu editor (Cursor)
2. Verifica que los cambios están guardados (el archivo no debe tener el indicador de "sin guardar")
3. Guarda manualmente si es necesario: `Cmd + S` (macOS) o `Ctrl + S` (Windows/Linux)

**Solución 3: Verificar que estás editando el archivo correcto**

El servidor local sirve archivos desde `prototypes/`. Asegúrate de que estás editando el archivo correcto:

```bash
# La URL debería ser algo como:
# http://localhost:3000/canvas-administrador-encuestas-2025-12-02.html

# El archivo físico debería estar en:
# prototypes/canvas-administrador-encuestas-2025-12-02.html
```

**Solución 4: Verificar que el servidor está corriendo**

1. Verifica en la terminal que el servidor está corriendo:
   ```
   ✅ Servidor HTTP local iniciado en http://localhost:3000
   ```

2. Si el servidor no está corriendo, reinicia el wizard:
   ```bash
   npm run wizard
   ```

**Solución 5: Abrir las herramientas de desarrollador**

1. Abre las herramientas de desarrollador en el navegador:
   - `Cmd + Option + I` (macOS Chrome/Firefox)
   - `Ctrl + Shift + I` (Windows/Linux Chrome/Firefox)
   - `Cmd + Option + C` (macOS Safari)

2. Ve a la pestaña "Network" (Red)
3. Marca "Disable cache" (Desactivar caché)
4. Recarga la página (`Cmd + R` o `Ctrl + R`)

---

### Sidebar carga template incorrecto (Colaborador en lugar de Administrador)

**Síntomas:**
- El sidebar aparece en modo "Colaborador" cuando debería ser "Administrador"
- Los módulos visibles no coinciden con lo esperado

**Solución:**
- Este problema ya está resuelto en versiones recientes del wizard
- Si persiste, regenera el template ejecutando el wizard de nuevo
- Verifica en la consola del navegador que aparece: `🔍 [Wizard] detectCurrentProduct() llamado, retornando: template-admin`

**Más información:** Ver `GUIA-PROBLEMAS-COMUNES-WIZARD.md`

---

### No carga desde Vercel

**Solución:**
1. Verificar que Vercel está desplegado y accesible
2. Verificar que el bypass token es correcto
3. Revisar logs del servidor local para ver errores del proxy
4. El sistema tiene fallback automático a `vendor/ubits/` si Vercel no está disponible

**Más información:** Ver `GUIA-DUALIDAD-VERCEL-LOCAL.md`

---

### No carga desde vendor/ubits/

**Solución:**
1. Verificar que `vendor/ubits/packages/` existe
2. Verificar que los archivos críticos están presentes:
   - `templates/template-admin.html`
   - `tokens/dist/tokens.css`
   - `templates/components-loader.js`
3. Si falta, ejecuta el wizard de nuevo para clonar UBITS

---

### Problemas de validación (lint)

**Solución rápida:**
```bash
# Lint de archivos específicos
npm run lint:file -- <archivo>

# Lint de un template específico
npm run lint:prototypes -- prototypes/canvas-*.html

# Lint rápido (solo código fuente)
npm run lint

# Si necesitas lint de todo (puede ser lento)
npm run lint:all
```

**Más información:** Ver `GUIA-PROBLEMAS-VALIDACION.md`

---

### Error: "Cannot find module" o problemas de importación

**Solución:**
```bash
# 1. Verificar que las dependencias están instaladas
npm install

# 2. Verificar estructura del proyecto
npm run verify

# 3. Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

### El wizard se queda colgado o no responde

**Solución:**
1. Verifica que estás ejecutando desde la terminal (no desde el chat de Cursor)
2. Verifica que tienes conexión a internet (para cargar componentes desde Storybook)
3. Presiona `Ctrl + C` para cancelar y vuelve a intentar
4. Si persiste, verifica los logs en la consola

**Más información:** Ver `GUIA-PROBLEMAS-COMUNES-WIZARD.md`

---

## 🔍 Verificación del Setup

Para verificar que todo está correcto:

```bash
# Verificación completa
npm run verify
```

Esto verificará:
- ✅ Estructura del proyecto
- ✅ Scripts configurados
- ✅ Dependencias necesarias
- ✅ Archivos del wizard

---

## 📚 Más Ayuda

- **Documentación completa:** [README.md](./README.md)
- **Guía de problemas del wizard:** [GUIA-PROBLEMAS-COMUNES-WIZARD.md](./GUIA-PROBLEMAS-COMUNES-WIZARD.md)
- **Guía de validación:** [GUIA-PROBLEMAS-VALIDACION.md](./GUIA-PROBLEMAS-VALIDACION.md)
- **Guía de servidor local:** [GUIA-SERVIDOR-LOCAL.md](./GUIA-SERVIDOR-LOCAL.md)
- **Guía de Vercel/Local:** [GUIA-DUALIDAD-VERCEL-LOCAL.md](./GUIA-DUALIDAD-VERCEL-LOCAL.md)

---

## 🆘 Si Nada Funciona

1. **Verifica la versión de Node.js:**
   ```bash
   node --version  # Debe ser >= 18
   ```

2. **Verifica la versión de npm:**
   ```bash
   npm --version  # Debe ser >= 9
   ```

3. **Limpia todo y reinstala:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Regenera el template:**
   ```bash
   npm run init
   ```

5. **Abre un issue en GitHub** con:
   - Versión de Node.js y npm
   - Sistema operativo
   - Mensaje de error completo
   - Pasos para reproducir

---

**Última actualización:** 2025-01-03

