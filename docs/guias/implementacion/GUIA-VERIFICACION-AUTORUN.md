# 🔍 Guía: Verificación de Autorun

## 🎯 Objetivo

Asegurar que Autorun esté funcionando correctamente antes de implementar componentes.

---

## ✅ Verificación Rápida

### 1. Inicializar y Verificar (Código)

```typescript
import { 
  getAutorunHub, 
  isAutorunHubInitialized,
  ensureAutorunHubInitialized,
  getAutorunHubStatus 
} from '@autorun/core';

// Inicializar si no está inicializado
if (!isAutorunHubInitialized()) {
  console.log('🚀 Inicializando AutorunHub...');
  await ensureAutorunHubInitialized();
}

// Verificar estado
const status = await getAutorunHubStatus();
console.log('📊 Estado de Autorun:', status);
```

### 2. Logs Esperados

**Si Autorun está funcionando, deberías ver:**

```
🚀 AutorunAgent: Inicializando AutorunHub...
✅ AutorunAgent: AutorunHub inicializado correctamente
   - File watching activo
   - Add-ons cargados
✅ AutorunHub: File watching iniciado
✅ Pre-Implementation Check Add-on: Inicializado
✅ AutoReload Add-on inicializado
```

### 3. Verificación de Componentes

**FileWatcher:**
- ✅ Debe estar activo
- ✅ Debe detectar cambios en `prototypes/`
- ✅ Debe emitir eventos `fileChange`

**Pre-Implementation Check:**
- ✅ Debe estar activo
- ✅ Debe detectar patrones de componentes
- ✅ Debe bloquear implementaciones sin checklist

**Auto-Reload:**
- ✅ Debe estar activo
- ✅ Debe recargar navegador automáticamente

---

## 🔍 Verificación Detallada

### Estado de AutorunHub

```typescript
const status = await getAutorunHubStatus();
// Debe retornar:
{
  initialized: true,
  fileWatching: true,
  activeAddons: ['pre-implementation-check', 'auto-reload', 'problem-tracker']
}
```

### Verificar FileWatcher

```typescript
const hub = await getAutorunHub();
const fileWatcher = (hub as any).fileWatcher;
if (fileWatcher) {
  console.log('✅ FileWatcher está activo');
} else {
  console.error('❌ FileWatcher NO está activo');
}
```

### Verificar Add-ons

```typescript
const hub = await getAutorunHub();
const activeAddons = (hub as any).getActiveAddons();
console.log('Add-ons activos:', activeAddons.map((a: any) => a.id));
```

---

## ❌ Problemas Comunes

### 1. AutorunHub no se inicializa

**Síntomas:**
- No hay logs de inicialización
- `isAutorunHubInitialized()` retorna `false`

**Solución:**
```bash
npm run init
```

### 2. FileWatcher no está activo

**Síntomas:**
- No hay logs de "File watching iniciado"
- No se detectan cambios automáticamente

**Solución:**
- Verificar que `fileWatching.enabled` está en `true` en `.ubits/project-config.json`
- Reiniciar AutorunHub: `await restartAutorunHub()`

### 3. Pre-Implementation Check no detecta

**Síntomas:**
- No hay logs de "IMPLEMENTACIÓN BLOQUEADA"
- No se detectan componentes automáticamente

**Solución:**
- Verificar que el add-on está activo en la configuración
- Verificar que FileWatcher está activo (necesario para recibir eventos)

---

## 📋 Checklist de Verificación

Antes de implementar cualquier componente:

- [ ] AutorunHub está inicializado (`isAutorunHubInitialized() === true`)
- [ ] FileWatcher está activo (`status.fileWatching === true`)
- [ ] Pre-Implementation Check está activo (en `status.activeAddons`)
- [ ] Auto-Reload está activo (en `status.activeAddons`)
- [ ] Logs de inicialización están presentes
- [ ] No hay errores en la consola

---

## 🚀 Uso Automático

La función `ensureAutorunHubInitialized()` se puede usar para verificación automática:

```typescript
// Antes de cualquier operación crítica
await ensureAutorunHubInitialized();
// Ahora puedes usar Autorun con confianza
```




