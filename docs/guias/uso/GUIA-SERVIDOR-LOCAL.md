# 🌐 Guía del Servidor Local

## 🔍 Problema: Los cambios en HTML no se ven en localhost

Si estás modificando archivos HTML pero los cambios no aparecen en el navegador, sigue estos pasos:

### ✅ Solución 1: Recargar el navegador (Forzar recarga)

**En macOS/Linux:**
- `Cmd + Shift + R` (Chrome/Firefox/Safari)
- O `Ctrl + Shift + R` (Chrome/Firefox)

**En Windows:**
- `Ctrl + Shift + R` (Chrome/Firefox)
- O `Ctrl + F5` (Chrome/Firefox)

Esto fuerza al navegador a descargar la versión más reciente del archivo, ignorando la caché.

### ✅ Solución 2: Verificar que el archivo se guardó

1. **Abre el archivo HTML en tu editor** (Cursor)
2. **Verifica que los cambios están guardados** (el archivo no debe tener el indicador de "sin guardar")
3. **Guarda manualmente** si es necesario: `Cmd + S` (macOS) o `Ctrl + S` (Windows/Linux)

### ✅ Solución 3: Verificar que estás editando el archivo correcto

El servidor local sirve archivos desde `prototypes/`. Asegúrate de que estás editando el archivo correcto:

```bash
# Verificar qué archivo está abierto en el navegador
# La URL debería ser algo como:
# http://localhost:3000/canvas-administrador-encuestas-2025-12-02.html

# El archivo físico debería estar en:
# prototypes/canvas-administrador-encuestas-2025-12-02.html
```

### ✅ Solución 4: Verificar que el servidor está corriendo

1. **Verifica en la terminal** que el servidor está corriendo:
   ```
   ✅ Servidor HTTP local iniciado en http://localhost:3000
   ```

2. **Si el servidor no está corriendo**, reinicia el wizard:
   ```bash
   npm run wizard
   ```

### ✅ Solución 5: Abrir las herramientas de desarrollador

1. **Abre las herramientas de desarrollador** en el navegador:
   - `Cmd + Option + I` (macOS Chrome/Firefox)
   - `Ctrl + Shift + I` (Windows/Linux Chrome/Firefox)
   - `Cmd + Option + C` (macOS Safari)

2. **Ve a la pestaña "Network" (Red)**
3. **Marca "Disable cache" (Desactivar caché)**
4. **Recarga la página** (`Cmd + R` o `Ctrl + R`)

Esto desactiva la caché mientras las herramientas de desarrollador están abiertas.

### ✅ Solución 6: Verificar headers del servidor

El servidor ahora envía headers para evitar caché en archivos HTML y JS:
- `Cache-Control: no-cache, no-store, must-revalidate`
- `Pragma: no-cache`
- `Expires: 0`

Si aún ves problemas, verifica en las herramientas de desarrollador (pestaña Network) que estos headers están presentes.

### 🔧 Debugging: Verificar que el servidor lee el archivo correcto

1. **Abre la consola del navegador** (F12 o Cmd+Option+I)
2. **Ve a la pestaña "Network"**
3. **Recarga la página** (Cmd+R o Ctrl+R)
4. **Haz clic en el archivo HTML** en la lista de Network
5. **Verifica la pestaña "Headers"** - debería mostrar:
   - Status: 200 OK
   - Cache-Control: no-cache, no-store, must-revalidate

### 📝 Notas Importantes

- **El servidor lee el archivo desde el disco en cada solicitud** - no usa caché del servidor
- **Los cambios se reflejan inmediatamente** después de guardar el archivo y recargar el navegador
- **Si usas hot-reload o auto-reload**, puede que necesites configurarlo por separado
- **El servidor local solo sirve archivos estáticos** - no tiene hot-reload automático

### 🚀 Mejores Prácticas

1. **Mantén el navegador abierto** mientras trabajas
2. **Usa "Disable cache" en las herramientas de desarrollador** durante el desarrollo
3. **Guarda el archivo antes de recargar** el navegador
4. **Verifica la URL** en el navegador para asegurarte de que estás viendo el archivo correcto

---

**Si después de seguir estos pasos los cambios aún no se ven, verifica:**
- ¿El archivo se está guardando correctamente?
- ¿Estás editando el archivo correcto?
- ¿El servidor está corriendo en el puerto correcto?
- ¿Hay errores en la consola del navegador?

