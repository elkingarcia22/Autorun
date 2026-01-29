# Preset UBITS Optimizado: Solo Add-ons Necesarios

## 🎯 Objetivo

Preset optimizado que incluye solo add-ons complementarios, sin solapamientos innecesarios.

---

## 📊 Análisis de Complementariedad

### **✅ Add-ons Complementarios (Todos Necesarios)**

#### **1. Desarrollo**
- ✅ **Storybook** - Componentes y documentación
- ✅ **Figma Sync** - Tokens desde Figma

#### **2. Calidad de Código**
- ✅ **ESLint** - Detecta errores
- ✅ **Prettier** - Formatea código
- **Relación:** Complementarios (diferentes propósitos)

#### **3. Testing**
- ✅ **Vitest** - Unit testing (rápido, ESM nativo)
- ✅ **Playwright** - E2E testing (flujos completos)
- ✅ **Chromatic** - Visual testing (screenshots)
- **Relación:** Todos complementarios (diferentes niveles)

#### **4. Seguridad**
- ✅ **Snyk** - Detecta vulnerabilidades
- ✅ **Renovate** - Actualiza dependencias
- **Relación:** Complementarios (detección + solución)

#### **5. Performance**
- ✅ **Lighthouse** - Auditoría web (runtime)
- ✅ **Bundle Analyzer** - Análisis de bundles (build-time)
- ✅ **Standalone** - Builds optimizados
- **Relación:** Complementarios (diferentes aspectos)

#### **6. Monitoreo**
- ✅ **Sentry** - Error monitoring técnico
- ✅ **Clarity** - Analytics y comportamiento
- **Relación:** Complementarios (técnico vs usuario)

#### **7. Deployment**
- ✅ **Vercel** - Deploy automático
- ✅ **GitHub** - Versionado y CI/CD
- ✅ **Codecov** - Code coverage
- **Relación:** Complementarios

#### **8. Feedback**
- ✅ **Feedback** - Feedback automatizado

---

## ⚠️ Decisiones de Optimización

### **1. Jest → Vitest** ✅

**Razón:**
- Vitest es más rápido
- ESM nativo
- TypeScript nativo
- Compatible con Jest API
- Mismo propósito (unit testing)

**Resultado:** Solo Vitest, no ambos

### **2. Docusaurus → Opcional** ✅

**Razón:**
- Para prototipos, Storybook es suficiente
- Storybook documenta componentes
- Docusaurus solo si necesitas docs generales

**Resultado:** Docusaurus no incluido por defecto (opcional)

---

## 📋 Preset Final Optimizado

### **Add-ons Incluidos (18 total):**

```typescript
const UBITS_PRESET_OPTIMIZED = {
  addons: [
    // Desarrollo (2)
    'storybook',
    'figma-sync',
    
    // Calidad (2)
    'eslint',
    'prettier',
    
    // Testing (3) - Todos complementarios
    'vitest',        // Unit
    'playwright',    // E2E
    'chromatic',     // Visual
    
    // Seguridad (2) - Complementarios
    'snyk',          // Detecta
    'renovate',      // Actualiza
    
    // Performance (3) - Complementarios
    'lighthouse',   // Runtime
    'bundle-analyzer', // Build-time
    'standalone',     // Optimización
    
    // Monitoreo (2) - Complementarios
    'sentry',        // Técnico
    'clarity',       // Usuario
    
    // Deployment (3) - Complementarios
    'vercel',
    'github',
    'codecov',
    
    // Feedback (1)
    'feedback',
  ]
};
```

**Total: 18 add-ons** - Todos complementarios, sin solapamientos

---

## 🎯 Por Qué Cada Add-on es Necesario

### **Testing (3 add-ons):**

| Add-on | Propósito | ¿Por qué es necesario? |
|--------|-----------|----------------------|
| **Vitest** | Unit testing | Prueba funciones/componentes individuales |
| **Playwright** | E2E testing | Prueba flujos completos de usuario |
| **Chromatic** | Visual testing | Detecta cambios visuales no deseados |

**Ejemplo:**
- Vitest: Prueba que `Button.render()` funciona
- Playwright: Prueba que el flujo "login → dashboard" funciona
- Chromatic: Detecta si el Button cambió visualmente

**Conclusión:** ✅ Los 3 son necesarios, no se solapan

---

### **Performance (3 add-ons):**

| Add-on | Propósito | ¿Por qué es necesario? |
|--------|-----------|----------------------|
| **Lighthouse** | Auditoría web | Métricas runtime (LCP, FID, CLS) |
| **Bundle Analyzer** | Análisis bundles | Tamaño de bundles JS/CSS |
| **Standalone** | Builds optimizados | Optimización de builds |

**Ejemplo:**
- Lighthouse: "LCP es 2.5s" (runtime)
- Bundle Analyzer: "button.js es 50KB" (build-time)
- Standalone: Optimiza el build completo

**Conclusión:** ✅ Los 3 son necesarios, diferentes aspectos

---

### **Monitoreo (2 add-ons):**

| Add-on | Propósito | ¿Por qué es necesario? |
|--------|-----------|----------------------|
| **Sentry** | Error monitoring | Errores técnicos, stack traces |
| **Clarity** | Analytics | Comportamiento de usuarios, heatmaps |

**Ejemplo:**
- Sentry: "Error: Cannot read property 'x' of undefined"
- Clarity: "Usuario hace click en botón X, luego navega a Y"

**Conclusión:** ✅ Ambos son necesarios, diferentes propósitos

---

## ✅ Validación Final

### **Checklist de Complementariedad:**

- [x] ✅ Vitest (unit) + Playwright (E2E) + Chromatic (visual) = Complementarios
- [x] ✅ ESLint (errores) + Prettier (formato) = Complementarios
- [x] ✅ Lighthouse (runtime) + Bundle Analyzer (build-time) = Complementarios
- [x] ✅ Sentry (técnico) + Clarity (usuario) = Complementarios
- [x] ✅ Snyk (detecta) + Renovate (actualiza) = Complementarios
- [x] ✅ Vercel (deploy) + GitHub (versionado) = Complementarios
- [x] ⚠️ Jest/Vitest = Solapan (elegimos Vitest)
- [x] ⚠️ Storybook/Docusaurus = Parcialmente solapan (Storybook suficiente)

---

## 🚀 Resultado

**Preset optimizado con 18 add-ons:**
- ✅ Todos complementarios
- ✅ Sin solapamientos
- ✅ Cada uno tiene propósito específico
- ✅ Cubre todas las necesidades de calidad

**No hay add-ons innecesarios** - Cada uno aporta valor único.

