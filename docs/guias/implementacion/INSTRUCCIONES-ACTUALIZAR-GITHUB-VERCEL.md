# 🚀 Instrucciones: Actualizar GitHub para Vercel

## ⚠️ Estado Actual

**NO, el archivo aún NO está guardado en el repositorio de UBITS.**

El archivo local (`vendor/ubits/packages/templates/components-loader.js`) tiene `window.createTabs`, pero el archivo en GitHub NO lo tiene todavía.

---

## 📋 Opciones para Actualizar

### **Opción 1: Script Automático (Recomendado)** ⭐

**Requisitos:**
- Token de GitHub con permisos de escritura en el repositorio `elkingarcia22/UBITS`

**Pasos:**

1. **Obtener token de GitHub:**
   - Ir a: `https://github.com/settings/tokens`
   - Crear nuevo token (classic)
   - Permisos: `repo` (acceso completo a repositorios)
   - Copiar el token

2. **Configurar token:**
   ```bash
   export GITHUB_TOKEN=tu_token_aqui
   ```

3. **Ejecutar script:**
   ```bash
   node scripts/update-components-loader-github.js
   ```

**El script automáticamente:**
- ✅ Lee el archivo local con `window.createTabs`
- ✅ Obtiene el SHA del archivo actual en GitHub
- ✅ Actualiza el archivo en GitHub
- ✅ Crea un commit con el mensaje correcto

---

### **Opción 2: Manual (GitHub Web Interface)** 🌐

**Pasos:**

1. **Ir a GitHub:**
   - URL: `https://github.com/elkingarcia22/UBITS`
   - Navegar a: `packages/templates/components-loader.js`

2. **Editar el archivo:**
   - Hacer clic en el botón ✏️ **Edit** (lápiz)

3. **Buscar la ubicación:**
   - Buscar: `// ========================================`
   - Buscar: `// DATA TABLE COMPONENT`
   - Debe estar alrededor de la línea 2390

4. **Agregar el código ANTES de `// DATA TABLE COMPONENT`:**
   
   Ver el código completo en: `docs/guias/implementacion/GUIA-ACTUALIZAR-VERCEL-CREATETABS.md` (PASO 4)

   O copiar desde el archivo local las líneas 2170-2388:
   ```bash
   # Ver el código en:
   vendor/ubits/packages/templates/components-loader.js
   # Líneas: 2170-2388
   ```

5. **Hacer commit:**
   - Título: `feat: add window.createTabs to components-loader.js`
   - Descripción: `Adds renderTabs, initTabsListeners, and window.createTabs functions to support Tabs component`
   - Hacer clic en: **"Commit changes"**

---

### **Opción 3: Git CLI** 💻

**Pasos:**

```bash
# 1. Clonar el repositorio (si no lo tienes)
git clone https://github.com/elkingarcia22/UBITS.git
cd UBITS

# 2. Crear una rama nueva
git checkout -b feat/add-createTabs

# 3. Copiar el archivo local al repositorio
cp /Users/elkinmac/Desktop/Autorun/vendor/ubits/packages/templates/components-loader.js \
   packages/templates/components-loader.js

# 4. Verificar que tiene window.createTabs
grep -n "window.createTabs" packages/templates/components-loader.js
# Debe mostrar: 2365:window.createTabs = function (options, containerId) {

# 5. Agregar y commitear
git add packages/templates/components-loader.js
git commit -m "feat: add window.createTabs to components-loader.js

Adds renderTabs, initTabsListeners, and window.createTabs functions to support Tabs component"

# 6. Push
git push origin feat/add-createTabs

# 7. Crear Pull Request en GitHub
# O mergear directamente a main si tienes permisos
git checkout main
git merge feat/add-createTabs
git push origin main
```

---

## ✅ Verificación Después de Actualizar

**Después de hacer push a GitHub:**

1. **Esperar 1-2 minutos** para que Vercel detecte el cambio automáticamente

2. **Verificar en Vercel Dashboard:**
   - Ir a: `https://vercel.com/dashboard`
   - Buscar el proyecto: `ubits-storybook10` (o el nombre correcto)
   - Verificar que hay un nuevo deployment

3. **Verificar en el navegador:**
   ```javascript
   // Abrir: https://ubits-storybook10.vercel.app/templates/components-loader.js
   // Buscar: window.createTabs
   // Debe aparecer la función (línea 2365)
   ```

4. **Probar en el template:**
   ```javascript
   // En la consola del navegador:
   console.log('createTabs disponible:', typeof window.createTabs === 'function');
   // Debe mostrar: ✅ createTabs disponible: true
   ```

---

## 📝 Notas Importantes

1. **Vercel despliega automáticamente** cuando detecta cambios en GitHub
2. **Puede tardar 1-2 minutos** en actualizarse
3. **Si Vercel no se actualiza automáticamente:**
   - Verificar que el repositorio está conectado en Vercel
   - Verificar que la rama correcta está configurada (`main`)
   - Hacer un redeploy manual en Vercel Dashboard

4. **Después de actualizar:**
   - El sistema automáticamente usará Vercel (no necesitará fallback a local)
   - Los logs mostrarán: `Fuente: Vercel` en lugar de `Fuente: LOCAL (fallback)`

---

## 🔗 Referencias

- **Repositorio:** `https://github.com/elkingarcia22/UBITS`
- **Archivo local:** `vendor/ubits/packages/templates/components-loader.js` (líneas 2170-2388)
- **Vercel URL:** `https://ubits-storybook10.vercel.app/templates/components-loader.js`
- **Guía completa:** `docs/guias/implementacion/GUIA-ACTUALIZAR-VERCEL-CREATETABS.md`
- **Script automático:** `scripts/update-components-loader-github.js`

---

**Última actualización:** 2025-12-10  
**Estado:** ⚠️ **PENDIENTE** - El archivo NO está guardado en GitHub todavía
