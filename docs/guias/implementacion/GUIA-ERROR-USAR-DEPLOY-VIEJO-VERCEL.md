# 🔍 Guía: Error - Usar Deploy Viejo de Vercel en lugar del Más Reciente

## ❌ PROBLEMA IDENTIFICADO

Al implementar componentes UBITS, se está consultando un despliegue viejo de Vercel en lugar del despliegue más reciente, causando que:

1. **Se usen versiones desactualizadas** de los componentes
2. **Se implementen funcionalidades que ya cambiaron** en la versión más reciente
3. **Se usen estilos CSS que ya no son válidos** (ej: padding del DataTable, estructura de inputs)
4. **Se consulten props o opciones que ya no existen** o que cambiaron
5. **Se implementen componentes con estructura incorrecta** comparada con la versión actual

---

## 🎯 CAUSA RAÍZ DEL ERROR

### **Error Principal: URL Hardcodeada de Deployment Específico**

**Problema 1: Usar URL de Deployment Específico en lugar de URL Principal**
- Se está usando una URL de deployment específico: `https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app`
- Esta URL apunta a un deployment específico que puede estar desactualizado
- **NO se actualiza automáticamente** cuando hay un nuevo deployment

**Problema 2: No Verificar Deployment Más Reciente**
- No se verifica cuál es el deployment más reciente antes de consultar
- Se asume que la URL hardcodeada es la más reciente
- No se consulta Vercel para obtener el deployment más reciente

**Problema 3: Múltiples URLs de Storybook**
- Hay múltiples URLs de Storybook en Vercel:
  - `https://ubits-storybook10.vercel.app/` (URL principal/producción - **SIEMPRE apunta al más reciente**)
  - `https://ubits-storybook10-{hash}-elkin-garcias-projects-a0b1beb6.vercel.app` (URLs de deployments específicos - pueden estar desactualizados)
- **NO se verifica cuál es la más reciente** antes de consultar

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **1. Usar URL Principal en lugar de URL de Deployment Específico**

**⚠️ CRÍTICO:** Usar la URL principal que siempre apunta al deployment más reciente:

```typescript
// ❌ INCORRECTO: URL de deployment específico (puede estar desactualizado)
url: 'https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app',

// ✅ CORRECTO: URL principal (siempre apunta al deployment más reciente)
url: 'https://ubits-storybook10.vercel.app',
```

**⚠️ CRÍTICO:**
- La URL principal (`https://ubits-storybook10.vercel.app`) **SIEMPRE apunta al deployment más reciente en producción**
- Las URLs de deployments específicos (`https://ubits-storybook10-{hash}-...`) pueden estar desactualizados
- **SIEMPRE usar la URL principal** para asegurar que se consulta la versión más reciente

---

### **2. Verificar Deployment Más Reciente Antes de Consultar**

**⚠️ OBLIGATORIO:** Antes de consultar cualquier componente:

1. **Verificar proyecto en Vercel:**
   ```typescript
   // Usar Vercel MCP para obtener el deployment más reciente
   const project = await mcp_vercel_get_project({
     projectId: 'prj_ygCB7HnHGg5qEglaMRDPSl1fPy8g', // ubits-storybook1.0
     teamId: 'team_SXXBFwSNz9TQfQ5aCMgKacdf'
   });
   
   const latestDeployment = project.latestDeployment;
   console.log('📋 Deployment más reciente:', latestDeployment.url);
   ```

2. **Usar URL principal:**
   - La URL principal (`https://ubits-storybook10.vercel.app`) siempre apunta al deployment más reciente
   - No es necesario verificar deployments específicos si se usa la URL principal

---

### **3. Actualizar UBITSPreset.ts con URL Principal**

**⚠️ CRÍTICO:** Actualizar `UBITSPreset.ts` para usar la URL principal:

```typescript
export const UBITS_PRESET: UBITSConfig = {
  storybook: {
    // ⚠️ CRÍTICO: Usar URL principal que siempre apunta al deployment más reciente
    // URL principal: https://ubits-storybook10.vercel.app/ (siempre apunta al deployment más reciente)
    // NO usar URLs de deployments específicos (pueden estar desactualizados)
    url: 'https://ubits-storybook10.vercel.app',
    bypassToken: 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT',
    // ... resto de configuración
  }
};
```

---

## 📋 CHECKLIST OBLIGATORIO

Al consultar Storybook en Vercel:

### **Verificación de URL:**
- [ ] **Usar URL principal:** `https://ubits-storybook10.vercel.app/` (NO URLs de deployments específicos)
- [ ] **Verificar que la URL apunta al deployment más reciente:** Consultar Vercel MCP si es necesario
- [ ] **Actualizar UBITSPreset.ts:** Si hay una URL más reciente, actualizar el código

### **Consulta de Componentes:**
- [ ] **Acceder al Storybook más reciente:** Usar la URL principal
- [ ] **Revisar pestaña "Code":** Ver código exacto del componente
- [ ] **Revisar pestaña "Controls":** Ver todas las opciones disponibles
- [ ] **Comparar con código local:** Identificar diferencias

### **Implementación:**
- [ ] **Usar versión más reciente:** Si hay diferencias, usar versión del Storybook
- [ ] **Actualizar implementación:** Seguir estructura del Storybook más reciente
- [ ] **Documentar cambios:** Si hay diferencias significativas, documentarlas

---

## 🔍 ESTRUCTURA CORRECTA DE URLs

### **URLs Disponibles:**

1. **URL Principal (RECOMENDADA):**
   ```
   https://ubits-storybook10.vercel.app/
   ```
   - ✅ **SIEMPRE apunta al deployment más reciente en producción**
   - ✅ Se actualiza automáticamente cuando hay un nuevo deployment
   - ✅ **USAR ESTA URL** para consultas

2. **URLs de Deployments Específicos (NO RECOMENDADAS):**
   ```
   https://ubits-storybook10-{hash}-elkin-garcias-projects-a0b1beb6.vercel.app
   ```
   - ❌ Pueden estar desactualizados
   - ❌ No se actualizan automáticamente
   - ❌ **NO usar estas URLs** para consultas

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: Usar URL de Deployment Específico**

**Problema:**
```typescript
// ❌ INCORRECTO: URL de deployment específico (puede estar desactualizado)
url: 'https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app',
```

**Síntomas:**
- Se consultan versiones desactualizadas de componentes
- Se implementan funcionalidades que ya cambiaron
- Se usan estilos CSS que ya no son válidos

**✅ SOLUCIÓN:**
```typescript
// ✅ CORRECTO: URL principal (siempre apunta al más reciente)
url: 'https://ubits-storybook10.vercel.app',
```

---

### **❌ ERROR 2: No Verificar Deployment Más Reciente**

**Problema:**
- Asumir que la URL hardcodeada es la más reciente
- No verificar en Vercel cuál es el deployment más reciente
- No actualizar la URL cuando hay un nuevo deployment

**✅ SOLUCIÓN:**
- Usar la URL principal que siempre apunta al más reciente
- Si es necesario verificar, usar Vercel MCP para obtener el deployment más reciente
- Documentar cómo verificar la URL más reciente

---

### **❌ ERROR 3: No Actualizar URLs en el Código**

**Problema:**
- URLs hardcodeadas en múltiples lugares
- No se actualizan cuando hay un nuevo deployment
- Diferentes partes del código usan diferentes URLs

**✅ SOLUCIÓN:**
- Centralizar la URL en `UBITSPreset.ts`
- Usar la URL principal en lugar de URLs específicas
- Actualizar todas las referencias cuando sea necesario

---

## 📚 REFERENCIAS

- **Análisis completo:** `docs/guias/analisis/ANALISIS-ERROR-USAR-DESPLIEGUE-VIEJO-VERCEL.md`
- **Guía de verificación:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md`
- **Código del preset:** `packages/autorun-core/src/wizard/UBITSPreset.ts`
- **Helper de componentes:** `packages/autorun-core/src/helpers/componentHelpers.ts`

---

## ✅ VERIFICACIÓN

Después de actualizar la URL, verificar:

1. **URL en UBITSPreset.ts:**
   ```typescript
   // Debe ser: 'https://ubits-storybook10.vercel.app'
   console.log('📋 Storybook URL:', UBITS_PRESET.storybook.url);
   ```

2. **URL en componentHelpers.ts:**
   ```typescript
   // Debe ser: 'https://ubits-storybook10.vercel.app/'
   const baseURL = 'https://ubits-storybook10.vercel.app/';
   ```

3. **Consultar Storybook:**
   - Abrir `https://ubits-storybook10.vercel.app/` en el navegador
   - Verificar que el componente esté actualizado
   - Comparar con implementación local

---

**Última actualización:** 2025-12-05  
**Versión:** 1.0.0








