# Preset UBITS: Add-ons para Prototipos de Alta Calidad

## 🎯 Objetivo

Garantizar que todos los prototipos generados cumplan con los más altos estándares de calidad UBITS mediante un preset completo de add-ons.

---

## 📦 Add-ons Incluidos en el Preset

### **1. Desarrollo y Componentes** ⭐⭐⭐

#### **Storybook**
- Desarrollo y documentación de componentes
- Carga de componentes desde Storybook UBITS
- Visualización de componentes

#### **Figma Sync**
- Sincronización automática de tokens desde Figma
- Mantiene tokens actualizados
- Asegura consistencia visual

---

### **2. Calidad de Código** ⭐⭐⭐

#### **ESLint**
- **Detección rápida de errores**
- Linting automático
- Auto-fix cuando es posible
- Pre-commit hooks
- Reglas estrictas UBITS

**Configuración:**
```json
{
  "configFile": ".eslintrc.ubits.json",
  "fix": true,
  "preCommit": true,
  "rules": "ubits-strict"
}
```

#### **Prettier**
- Formateo consistente
- Auto-format en save
- Pre-commit hooks
- Configuración UBITS

---

### **3. Testing** ⭐⭐⭐

#### **Jest**
- Unit testing rápido
- Coverage mínimo: 80%
- Tests automáticos en CI/CD

#### **Playwright**
- E2E testing
- Tests de flujos completos
- Screenshots automáticos
- 2 retries por defecto

#### **Chromatic**
- **Visual testing de componentes**
- Detecta cambios visuales
- Comparación con Storybook
- Requiere aprobación manual

---

### **4. Seguridad** ⭐⭐⭐

#### **Snyk**
- **Security scanning automático**
- Escanea en cada build
- Bloquea deploy si hay vulnerabilidades críticas
- Threshold: medium
- Monitoreo continuo

#### **Renovate**
- Actualizaciones automáticas de dependencias
- Pull requests automáticos
- Mantiene dependencias seguras

---

### **5. Performance y Optimización** ⭐⭐

#### **Lighthouse**
- Auditoría de performance automática
- Test en cada deploy
- Score mínimo requerido: 90
- Categorías: performance, accessibility, best-practices, SEO

#### **Bundle Analyzer**
- Análisis de bundles
- Detecta dependencias grandes
- Optimiza componentes
- Tamaño máximo: 500KB

#### **Standalone**
- Builds optimizados
- Extracción de componentes
- Tree-shaking automático

---

### **6. Monitoreo y Analytics** ⭐⭐

#### **Sentry**
- **Error monitoring en tiempo real**
- Captura automática de errores
- Breadcrumbs para debugging
- Contexto de usuario

#### **Clarity**
- Analytics y heatmaps
- Comportamiento de usuarios
- Sesiones grabadas

---

### **7. Documentación Automatizada** ⭐⭐

#### **Docusaurus**
- **Generación automática de documentación**
- Fuente: Storybook
- Incluye componentes, tokens y ejemplos
- Actualización automática

---

### **8. Deployment y CI/CD** ⭐⭐

#### **Vercel**
- Deploy automático
- Preview deployments
- Integración con GitHub

#### **GitHub**
- Versionado automático
- CI/CD integrado
- Auto-commit

#### **Codecov**
- Code coverage tracking
- Coverage mínimo: 80%
- Reportes en PRs

---

### **9. Feedback** ⭐

#### **Feedback**
- Feedback automatizado
- Integración con n8n, Google Sheets, Gemini, Slack
- Componentes desde Storybook

---

## 🛡️ Component Validator

### **Nuevo Sistema de Validación**

El `ComponentValidator` asegura que:

1. ✅ **Solo se usen componentes oficiales UBITS**
   - Detecta componentes custom
   - Bloquea modificaciones a componentes oficiales

2. ✅ **Solo se usen tokens UBITS**
   - Detecta valores hardcodeados
   - Sugiere tokens correctos
   - Valida prefijo `--ubits-*`

3. ✅ **No se modifiquen estilos de componentes**
   - Detecta estilos inline
   - Detecta clases custom
   - Asegura uso de clases oficiales

4. ✅ **Uso correcto de componentes de Storybook**
   - Verifica carga desde Storybook
   - Detecta imports directos
   - Asegura uso de API oficial

---

## 🔄 Flujo de Validación

```
1. Desarrollo
   ├─► ESLint detecta errores
   ├─► Prettier formatea
   └─► TypeScript valida tipos
   ↓
2. Validación de Componentes (ComponentValidator)
   ├─► Valida componentes oficiales
   ├─► Valida tokens UBITS
   ├─► Valida estilos
   └─► Valida uso de Storybook
   ↓
3. Testing
   ├─► Jest (unit tests)
   ├─► Playwright (E2E tests)
   └─► Chromatic (visual tests)
   ↓
4. Seguridad
   ├─► Snyk escanea vulnerabilidades
   └─► Renovate actualiza dependencias
   ↓
5. Performance
   ├─► Lighthouse audita
   └─► Bundle Analyzer optimiza
   ↓
6. Documentación
   ├─► Docusaurus genera docs
   └─► Storybook documenta componentes
   ↓
7. Deployment
   ├─► Vercel despliega
   ├─► Codecov reporta coverage
   └─► Sentry monitorea errores
```

---

## 📋 Configuración Completa

### **Preset Mínimo (Esencial):**

```typescript
const UBITS_MINIMUM = [
  'storybook',
  'eslint',
  'prettier',
  'jest',
  'snyk',
  'lighthouse',
  'sentry',
  'vercel',
  'github'
];
```

### **Preset Completo (Recomendado):**

Incluye todos los add-ons listados arriba para máxima calidad.

---

## ✅ Beneficios

1. **Detección Rápida de Errores:**
   - ESLint detecta errores antes de commit
   - TypeScript valida tipos
   - Sentry monitorea en producción

2. **Seguridad:**
   - Snyk escanea vulnerabilidades
   - Renovate mantiene dependencias actualizadas
   - Bloquea deploys inseguros

3. **Protección de Componentes:**
   - ComponentValidator asegura uso correcto
   - Bloquea modificaciones no autorizadas
   - Valida tokens y estilos

4. **Calidad Garantizada:**
   - Testing completo (unit, E2E, visual)
   - Performance optimizado
   - Documentación automática

5. **Estándares UBITS:**
   - Tokens oficiales
   - Componentes oficiales
   - Estilos consistentes

---

## 🚀 Uso

```typescript
import { AutorunHub, UBITSPreset } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Cargar preset UBITS completo
for (const addonId of UBITSPreset.addons) {
  const config = UBITS_ADDONS_CONFIG[addonId];
  await hub.activateAddon(addonId, config);
}
```

---

## 📚 Referencias

- [Análisis Add-ons UBITS Calidad](./ANALISIS-ADDONS-UBITS-CALIDAD.md)
- [Guía Setup UBITS](./GUIA-SETUP-UBITS.md)
- [Uso Componentes Storybook](./USO-COMPONENTES-STORYBOOK.md)

