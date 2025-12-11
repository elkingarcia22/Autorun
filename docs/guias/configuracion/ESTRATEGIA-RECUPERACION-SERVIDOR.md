# 🔄 Estrategia de Recuperación: Volver al Flujo Normal con Vercel

## 📋 Problema Actual

**Situación:**
- Después de reiniciar la computadora, el `LocalServer` se detiene
- El servidor personalizado (`start-server.mjs`) es una solución temporal
- El DataTable se carga localmente (`/vendor/ubits/packages/`) en lugar de Vercel

**Objetivo:**
- Volver al flujo normal usando `LocalServer` oficial
- Cargar todos los recursos desde Vercel (incluyendo DataTable)
- Tener un proceso claro de recuperación

---

## 🎯 Estrategia de Recuperación

### **PASO 1: Verificar Estado Actual**

Antes de hacer cambios, verificar:

```bash
# 1. Verificar si el servidor personalizado está corriendo
ps aux | grep "start-server.mjs" | grep -v grep

# 2. Verificar si LocalServer oficial está corriendo
ps aux | grep "LocalServer\|start-local-server" | grep -v grep

# 3. Verificar configuración de Autorun
cat .ubits/project-config.json
```

### **PASO 2: Detener Servidor Personalizado (si está corriendo)**

```bash
# Detener el servidor personalizado
pkill -f "start-server.mjs"

# Verificar que se detuvo
ps aux | grep "start-server.mjs" | grep -v grep
# (No debe mostrar nada)
```

### **PASO 3: Verificar Ruta del DataTable en Vercel**

**✅ CONFIRMADO: El DataTable está disponible en Vercel**

```bash
# Verificar disponibilidad (ya verificado - HTTP 200)
curl -I "https://ubits-storybook10.vercel.app/components/data-table/dist/data-table.umd.js"
# Respuesta: HTTP/2 200 ✅
```

**Resultado:**
- ✅ El DataTable está disponible en Vercel
- ✅ El HTML ya está actualizado para usar Vercel
- ✅ Todo funcionará desde Vercel automáticamente

### **PASO 4: Actualizar HTML para Usar Vercel**

**✅ COMPLETADO: El HTML ya está actualizado para usar Vercel**

**Archivo:** `prototypes/canvas-administrador-encuestas-2025-12-09.html`

**Línea ~1031 (ya actualizada):**
```html
<script src="/vercel-proxy/components/data-table/dist/data-table.umd.js"></script>
```

**Nota:** Si trabajas en otro template y necesitas actualizar manualmente, cambia:
- ❌ `/vendor/ubits/packages/components/data-table/dist/data-table.umd.js` (local)
- ✅ `/vercel-proxy/components/data-table/dist/data-table.umd.js` (Vercel)

### **PASO 5: Iniciar LocalServer Oficial**

```bash
# Opción 1: Usar el wizard (recomendado - inicia todo automáticamente)
npm run init

# Opción 2: Iniciar solo el servidor
node start-local-server.js

# Opción 3: Iniciar AutorunHub (que puede iniciar el servidor)
npm run autorun:init-hub
```

**El wizard automáticamente:**
- ✅ Inicia el `LocalServer` oficial
- ✅ Configura el proxy a Vercel
- ✅ Inicializa AutorunHub
- ✅ Mantiene el proceso vivo

### **PASO 6: Verificar que Todo Funciona**

1. **Abrir el navegador:** `http://localhost:3000/canvas-administrador-encuestas-2025-12-09.html`
2. **Verificar en consola del navegador:**
   - ✅ No hay errores 404
   - ✅ `createDataTable` está disponible
   - ✅ El DataTable se renderiza correctamente

3. **Verificar en terminal:**
   - ✅ `LocalServer` está corriendo
   - ✅ Proxy a Vercel funciona (ver logs de proxy)

---

## 🔄 Proceso Completo de Recuperación

### **Escenario: Reinicio de Computadora**

```bash
# 1. Detener servidor personalizado (si existe)
pkill -f "start-server.mjs"

# 2. Verificar que no hay conflictos
lsof -i :3000
# Si hay algo en el puerto 3000, detenerlo:
# kill -9 <PID>

# 3. Iniciar flujo normal
npm run init
# O si ya está configurado:
npm run autorun:init-hub

# 4. Verificar que funciona
# Abrir: http://localhost:3000/canvas-administrador-encuestas-2025-12-09.html
```

### **Escenario: Servidor se Cayó Durante el Trabajo**

```bash
# 1. Verificar qué servidor está corriendo
ps aux | grep -E "start-server|LocalServer" | grep -v grep

# 2. Si hay servidor personalizado, detenerlo
pkill -f "start-server.mjs"

# 3. Iniciar LocalServer oficial
node start-local-server.js
# O:
npm run autorun:init-hub
```

---

## 📊 Comparación: Servidor Personalizado vs LocalServer Oficial

| Aspecto | Servidor Personalizado | LocalServer Oficial |
|---------|------------------------|---------------------|
| **Inicio** | `node start-server.mjs` | `npm run init` o `node start-local-server.js` |
| **Proxy Vercel** | ✅ Sí | ✅ Sí |
| **DataTable** | Local (`/vendor/`) | Vercel (`/vercel-proxy/`) |
| **Funcionalidades** | Básicas | Completas |
| **Manejo de Errores** | Básico | Avanzado |
| **Recomendado** | Temporal | Producción |

---

## ⚠️ Reglas Críticas

### **1. SIEMPRE Usar LocalServer Oficial en Producción**

El servidor personalizado (`start-server.mjs`) es **SOLO para emergencias**. Para trabajo normal:

```bash
# ✅ CORRECTO
npm run init
# O
node start-local-server.js

# ❌ EVITAR (solo emergencias)
node start-server.mjs
```

### **2. SIEMPRE Cargar DataTable desde Vercel (si está disponible)**

Si el DataTable está disponible en Vercel, **SIEMPRE** usar la ruta de Vercel:

```html
<!-- ✅ CORRECTO (si está en Vercel) -->
<script src="/vercel-proxy/components/data-table/dist/data-table.umd.js"></script>

<!-- ❌ EVITAR (solo si NO está en Vercel) -->
<script src="/vendor/ubits/packages/components/data-table/dist/data-table.umd.js"></script>
```

### **3. Verificar Disponibilidad en Vercel ANTES de Cambiar**

Antes de cambiar la ruta del DataTable a Vercel, **SIEMPRE** verificar:

```bash
curl -I "https://ubits-storybook10.vercel.app/components/data-table/dist/data-table.umd.js"
```

**Solo cambiar si:**
- ✅ Respuesta es `200 OK`
- ✅ El archivo existe y es accesible

---

## 🔍 Verificación de Estado

### **Comando Rápido para Verificar Todo:**

```bash
#!/bin/bash
echo "🔍 Verificando estado del servidor..."
echo ""

# Verificar servidor personalizado
if ps aux | grep -q "[s]tart-server.mjs"; then
    echo "⚠️  Servidor personalizado está corriendo"
    echo "   PID: $(ps aux | grep '[s]tart-server.mjs' | awk '{print $2}')"
else
    echo "✅ Servidor personalizado NO está corriendo"
fi

# Verificar LocalServer oficial
if ps aux | grep -q "[L]ocalServer\|[s]tart-local-server"; then
    echo "✅ LocalServer oficial está corriendo"
    echo "   PID: $(ps aux | grep '[L]ocalServer\|[s]tart-local-server' | awk '{print $2}')"
else
    echo "⚠️  LocalServer oficial NO está corriendo"
fi

# Verificar puerto 3000
if lsof -i :3000 > /dev/null 2>&1; then
    echo "✅ Puerto 3000 está en uso"
    lsof -i :3000
else
    echo "⚠️  Puerto 3000 NO está en uso"
fi

echo ""
echo "💡 Para iniciar LocalServer oficial:"
echo "   npm run init"
echo "   O: node start-local-server.js"
```

---

## 🎯 Checklist de Recuperación

### **Después de Reiniciar la Computadora:**

- [ ] Detener servidor personalizado (si existe)
- [ ] Verificar que el puerto 3000 está libre
- [ ] Verificar disponibilidad del DataTable en Vercel
- [ ] Actualizar HTML para usar Vercel (si está disponible)
- [ ] Iniciar LocalServer oficial (`npm run init` o `node start-local-server.js`)
- [ ] Verificar que el servidor está corriendo
- [ ] Abrir el template en el navegador
- [ ] Verificar que el DataTable se carga correctamente
- [ ] Verificar que no hay errores en la consola

---

## 📝 Notas Finales

1. **El servidor personalizado es temporal** - Úsalo solo si el LocalServer oficial no funciona
2. **Siempre intenta cargar desde Vercel primero** - Es más confiable y actualizado
3. **El wizard (`npm run init`) es la forma recomendada** - Inicia todo automáticamente
4. **Mantén la terminal abierta** - El servidor se detiene si cierras la terminal
5. **Usa `Ctrl+C` para detener** - No cierres la terminal directamente

---

## 🚀 Comandos Rápidos

```bash
# Iniciar todo (recomendado)
npm run init

# Solo iniciar servidor
node start-local-server.js

# Solo inicializar AutorunHub
npm run autorun:init-hub

# Detener servidor personalizado
pkill -f "start-server.mjs"

# Verificar estado
ps aux | grep -E "start-server|LocalServer" | grep -v grep
```




