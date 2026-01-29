# 🔍 Guía: Verificar Storybook en Vercel Antes de Implementar

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"SIEMPRE verificar la versión más reciente del Storybook en Vercel antes de implementar cualquier componente"** - El Storybook en Vercel es la fuente de verdad más actualizada.

---

## 🚨 PROBLEMA IDENTIFICADO

**El código local puede estar desactualizado comparado con el Storybook en Vercel.**

**Síntomas:**
- Implementaciones que no coinciden con el Storybook
- Tipos de columnas que no funcionan como se espera
- Opciones que no están disponibles en el código local pero sí en el Storybook
- Estructura de datos diferente

---

## 📋 PROCESO OBLIGATORIO

### **PASO 1: Acceder al Storybook en Vercel**

**⚠️ CRÍTICO: Usar URL Principal (SIEMPRE apunta al deployment más reciente)**

**URL Base:** `https://ubits-storybook10.vercel.app/`
- ✅ **SIEMPRE usar esta URL** (apunta al deployment más reciente en producción)
- ❌ **NO usar URLs de deployments específicos** (pueden estar desactualizados)
- ✅ Se actualiza automáticamente cuando hay un nuevo deployment

**Para DataTable específicamente:**
- URL: `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default`
- ⚠️ **CRÍTICO:** Verificar qué historias existen antes de consultar (ver: `docs/guias/implementacion/GUIA-ERROR-CONSULTAR-HISTORIA-STORYBOOK-INEXISTENTE.md`)
- O buscar: `data-data-table` en el buscador del Storybook

**⚠️ IMPORTANTE:**
- Si ves una URL como `https://ubits-storybook10-{hash}-...vercel.app`, **NO la uses**
- **SIEMPRE usar** `https://ubits-storybook10.vercel.app/` que es la URL principal
- Ver guía: `docs/guias/implementacion/GUIA-ERROR-USAR-DEPLOY-VIEJO-VERCEL.md` - ⚠️ **OBLIGATORIO**

---

### **PASO 2: Revisar Pestaña "Code"**

**Qué buscar:**
1. **Estructura de columnas:**
   - ¿Qué tipos de columnas se usan?
   - ¿Cómo se configuran?
   - ¿Qué opciones tienen?

2. **Estructura de filas:**
   - ¿Cómo se estructuran los datos?
   - ¿Qué propiedades tienen?
   - ¿Cómo se mapean los valores?

3. **Configuración del DataTable:**
   - ¿Qué opciones se usan?
   - ¿Cómo se configuran los callbacks?
   - ¿Qué valores por defecto se usan?

**Ejemplo de lo que deberías ver:**
```javascript
window.createDataTable({
  containerId: 'table-container',
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'nombre' },
    { id: 'estado', title: 'Estado', type: 'estado' },
    { id: 'avance', title: 'Avance', type: 'progreso' }
  ],
  rows: [
    {
      id: 1,
      data: {
        nombre: 'Ejemplo',
        estado: 'activo',
        avance: 75
      }
    }
  ],
  // ... más opciones
});
```

---

### **PASO 3: Revisar Pestaña "Controls"**

**Qué buscar:**
1. **Tipos de columnas disponibles:**
   - Lista completa de tipos (nombre, nombre-avatar, progreso, estado, fecha, pais, ciudad, etc.)
   - Verificar que todos los tipos que necesitas estén disponibles

2. **Opciones de configuración:**
   - `showCheckbox`, `rowExpandable`, `columnSortable`, etc.
   - Valores por defecto de cada opción
   - Opciones del header (title, counter, buttons, etc.)

3. **Opciones específicas de columnas:**
   - `editable`, `avatarVariant`, `emailClickable`, etc.
   - Valores válidos para cada opción

---

### **PASO 4: Comparar con Código Local**

**Verificar:**
1. **Tipos de columnas:**
   - ¿El código local tiene los mismos tipos que el Storybook?
   - ¿Faltan tipos en el código local?

2. **Opciones disponibles:**
   - ¿Todas las opciones del Storybook están en el código local?
   - ¿Hay opciones nuevas en el Storybook que no están en el código local?

3. **Estructura de datos:**
   - ¿La estructura de filas y columnas coincide?
   - ¿Los valores de ejemplo coinciden?

**Si hay diferencias:**
- ✅ Usar la versión del Storybook en Vercel (es la más actualizada)
- ✅ Actualizar la implementación para usar la versión más reciente
- ✅ Documentar los cambios si es necesario

---

### **PASO 5: Verificar Valores Válidos**

**Para tipo `estado`:**
- Valores válidos en español: `'activo'`, `'inactivo'`, `'pendiente'`, `'completado'`, `'en-progreso'`, `'pausada'`, `'programada'`, etc.
- Estos se mapean automáticamente a estados UBITS internos

**Para tipo `progreso`:**
- Valores válidos: números (0-100) o strings con porcentaje (`"75"`, `"75%"`)
- Si no hay valor, usa 50% por defecto

**Para tipo `fecha`:**
- Formato esperado: strings con formato de fecha
- Verificar en el Storybook el formato exacto

---

## ✅ CHECKLIST OBLIGATORIO

**⚠️ CRÍTICO: Este checklist DEBE completarse ANTES de implementar cualquier componente.**

Antes de implementar cualquier componente:

- [ ] **Acceder al Storybook en Vercel**
  - URL: `https://ubits-storybook10.vercel.app/`
  - Buscar el componente específico
  - **⚠️ CRÍTICO:** Verificar que es el despliegue más reciente

- [ ] **Revisar pestaña "Code"**
  - Ver estructura de columnas
  - Ver estructura de filas
  - Ver configuración completa
  - **⚠️ CRÍTICO:** Copiar código exacto si es necesario

- [ ] **Revisar pestaña "Controls"**
  - Ver todos los tipos disponibles
  - Ver todas las opciones disponibles
  - Ver valores por defecto
  - **⚠️ CRÍTICO:** Verificar que las opciones que vas a usar existen

- [ ] **Comparar con código local**
  - Verificar que tipos coincidan
  - Verificar que opciones coincidan
  - **⚠️ CRÍTICO:** Si hay diferencias, usar versión del Storybook (es la más actualizada)

- [ ] **Verificar valores válidos**
  - Para cada tipo de columna
  - Para cada opción de configuración

- [ ] **Verificar versión del UMD (si aplica)**
  - Verificar qué versión del UMD se está cargando
  - Comparar con versión del Storybook
  - **⚠️ CRÍTICO:** Si hay diferencias, actualizar el UMD

- [ ] **Documentar verificación**
  - Fecha de verificación
  - Versión consultada
  - Diferencias encontradas (si las hay)
  - **⚠️ CRÍTICO:** Documentar en el análisis del componente

---

## 🚨 ERRORES COMUNES A EVITAR

### **Error 1: Usar Solo Código Local**

❌ **INCORRECTO:**
```javascript
// Usar solo el código local sin verificar Storybook
window.createDataTable({
  columns: [
    { id: 'estado', title: 'Estado', type: 'estado' }
  ]
});
```

✅ **CORRECTO:**
```javascript
// 1. Primero verificar Storybook en Vercel
// 2. Ver estructura exacta en pestaña "Code"
// 3. Ver tipos disponibles en pestaña "Controls"
// 4. Luego implementar con la versión más reciente
window.createDataTable({
  columns: [
    { id: 'estado', title: 'Estado', type: 'estado' }
  ]
});
```

### **Error 2: Asumir Tipos sin Verificar**

❌ **INCORRECTO:**
```javascript
// Asumir tipos sin verificar en Storybook
{ id: 'estado', title: 'Estado', type: 'text' } // ❌ Incorrecto
```

✅ **CORRECTO:**
```javascript
// Verificar en Storybook que 'estado' es un tipo válido
{ id: 'estado', title: 'Estado', type: 'estado' } // ✅ Correcto
```

### **Error 3: No Verificar Valores Válidos**

❌ **INCORRECTO:**
```javascript
// Usar valores sin verificar si son válidos
data: {
  estado: 'active' // ❌ Puede que no funcione (debe ser 'activo' en español)
}
```

✅ **CORRECTO:**
```javascript
// Verificar en Storybook valores válidos
data: {
  estado: 'activo' // ✅ Correcto (en español)
}
```

---

## 🔗 Referencias

- **Storybook en Vercel:** `https://ubits-storybook10.vercel.app/`
- **DataTable específico:** `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default`
- **Error consultar historia inexistente:** `docs/guias/implementacion/GUIA-ERROR-CONSULTAR-HISTORIA-STORYBOOK-INEXISTENTE.md` - ⚠️ **OBLIGATORIO**
- **Código local:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Análisis de error despliegue viejo:** `docs/guias/analisis/ANALISIS-ERROR-USAR-DESPLIEGUE-VIEJO-VERCEL.md` - ⚠️ **OBLIGATORIO**
- **Análisis de error no verificar versión:** `docs/guias/analisis/ANALISIS-ERROR-NO-VERIFICAR-VERSION-DATATABLE-VERCEL.md` - ⚠️ **OBLIGATORIO**

---

## ⚠️ ADVERTENCIA CRÍTICA: Verificar Versión Más Reciente

**ANTES de consultar cualquier componente, DEBES:**

1. ✅ **Verificar que estás usando la URL más reciente** de Storybook
2. ✅ **NO usar URLs de deployments viejos** sin verificar
3. ✅ **Comparar el código del Storybook con el código local** para identificar diferencias
4. ✅ **Usar SIEMPRE la versión del Storybook** si hay diferencias (es la más actualizada)

**Ver análisis completo:** `docs/guias/analisis/ANALISIS-ERROR-USAR-DESPLIEGUE-VIEJO-VERCEL.md`

---

## 💡 Resumen

1. **SIEMPRE** verificar cuál es el despliegue más reciente de Storybook
2. **SIEMPRE** acceder al Storybook más reciente en Vercel antes de implementar
3. **SIEMPRE** revisar pestaña "Code" para ver estructura exacta
4. **SIEMPRE** revisar pestaña "Controls" para ver opciones disponibles
5. **SIEMPRE** comparar con código local y usar versión más reciente
6. **SIEMPRE** verificar valores válidos para cada tipo
7. **SIEMPRE** verificar CSS del componente en el Storybook (padding, margin, etc.)

---

**Última actualización:** Diciembre 2024

