# 📋 Instrucciones: Copiar Cambios al Repositorio UBITS

## 🎯 Objetivo
Copiar los archivos necesarios desde Autorun al repositorio UBITS de GitHub para que Vercel pueda desplegar correctamente.

---

## 📝 Archivos a Copiar

### 1. **Script de Copia** (NUEVO)
**Origen:** `Autorun/scripts/copy-ubits-files-to-storybook-static-UBITS.js`  
**Destino en UBITS:** `scripts/copy-ubits-files-to-storybook-static.js`

### 2. **vercel.json Actualizado** (MODIFICAR)
**Origen:** `Autorun/vendor/ubits/packages/storybook/vercel.json.UBITS`  
**Destino en UBITS:** `packages/storybook/vercel.json` (reemplazar el existente)

---

## 🚀 Pasos para Copiar

### Paso 1: Clonar el Repositorio UBITS

```bash
# Ir a un directorio temporal
cd ~/Desktop
git clone https://github.com/elkingarcia22/UBITS.git
cd UBITS
```

### Paso 2: Copiar el Script

```bash
# Copiar el script desde Autorun
cp /Users/elkinmac/Desktop/Autorun/scripts/copy-ubits-files-to-storybook-static-UBITS.js scripts/copy-ubits-files-to-storybook-static.js

# Dar permisos de ejecución
chmod +x scripts/copy-ubits-files-to-storybook-static.js
```

### Paso 3: Actualizar vercel.json

```bash
# Copiar el vercel.json actualizado
cp /Users/elkinmac/Desktop/Autorun/vendor/ubits/packages/storybook/vercel.json.UBITS packages/storybook/vercel.json
```

### Paso 4: Verificar los Cambios

```bash
# Verificar que el script existe
ls -la scripts/copy-ubits-files-to-storybook-static.js

# Verificar que vercel.json está actualizado
cat packages/storybook/vercel.json | grep "copy-ubits-files"
```

Deberías ver:
```json
"buildCommand": "npm run build-storybook && node ../../scripts/copy-ubits-files-to-storybook-static.js"
```

### Paso 5: Probar Localmente (Opcional)

```bash
# Construir Storybook
cd packages/storybook
npm run build-storybook

# Ejecutar el script de copia
node ../../scripts/copy-ubits-files-to-storybook-static.js

# Verificar que los archivos se copiaron
ls -la storybook-static/templates/
ls -la storybook-static/tokens/dist/
```

### Paso 6: Hacer Commit y Push

```bash
# Volver a la raíz del repositorio UBITS
cd ../..

# Agregar los cambios
git add scripts/copy-ubits-files-to-storybook-static.js
git add packages/storybook/vercel.json

# Hacer commit
git commit -m "feat: agregar script de copia de archivos para deploy en Vercel

- Agrega script para copiar templates, CSS, JS, tokens y assets a storybook-static/
- Actualiza vercel.json para ejecutar el script después del build
- Permite que Autorun cargue recursos directamente desde Vercel"

# Push a GitHub
git push origin main
```

### Paso 7: Verificar en Vercel

1. Vercel detectará automáticamente el push a GitHub
2. Iniciará un nuevo deploy
3. El build debería ejecutar el script de copia
4. Los archivos deberían estar disponibles en la URL de Vercel

---

## ✅ Verificación Final

Después del deploy en Vercel, verifica que los archivos están disponibles:

1. **Templates:**
   ```
   https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/templates/template-admin.html?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT
   ```

2. **Tokens:**
   ```
   https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/tokens/dist/tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT
   ```

3. **Scripts:**
   ```
   https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/templates/components-loader.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT
   ```

Si puedes acceder a estos archivos, ¡todo está funcionando correctamente! 🎉

---

## 🔄 Si Algo Sale Mal

Si el deploy falla:

1. **Verificar logs en Vercel:**
   - Ve al dashboard de Vercel
   - Revisa los logs del deploy
   - Busca errores relacionados con el script

2. **Probar el script localmente:**
   ```bash
   cd packages/storybook
   npm run build-storybook
   node ../../scripts/copy-ubits-files-to-storybook-static.js
   ```

3. **Verificar rutas:**
   - El script debe ejecutarse desde la raíz del repositorio UBITS
   - O desde `packages/storybook/` con la ruta `../../scripts/...`

---

## 📚 Notas

- El script detecta automáticamente desde dónde se ejecuta
- Funciona tanto desde la raíz del repo como desde `packages/storybook/`
- Copia ~67 archivos a `storybook-static/`
- El script es idempotente (puede ejecutarse múltiples veces)

