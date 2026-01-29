# 🛡️ Guía de Mitigación: Errores en Implementación de Componentes

**Fecha:** 2025-01-10  
**Propósito:** Prevenir errores de implementación y asegurar que los componentes se vean exactamente como en Storybook

---

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

### **1. ❌ Estructura HTML Incorrecta**

#### **Problema:**
- Implementar estructura HTML "adivinando" sin consultar código fuente
- Falta de elementos anidados requeridos (ej: `ubits-modal__header-text`, `ubits-modal__body-content`)
- Uso de elementos incorrectos (ej: `<h2>` en lugar de `<p class="ubits-heading-h2">`)

#### **✅ Solución:**
```typescript
// ❌ INCORRECTO: Adivinar estructura
const modalHTML = `<div class="ubits-modal__header">...</div>`;

// ✅ CORRECTO: Consultar código fuente primero
import { renderModal } from '@ubits/modal';
// O consultar ModalProvider.ts para estructura exacta
const modalHTML = renderModal({ title, bodyContent, size: 'md' });
```

**Checklist:**
- [ ] ✅ Consultar `{Component}Provider.ts` o `{Component}Provider.js` antes de implementar
- [ ] ✅ Usar estructura exacta del provider (no simplificar)
- [ ] ✅ Incluir todos los elementos anidados requeridos
- [ ] ✅ Verificar que las clases CSS coincidan exactamente

---

### **2. ❌ CSS No Cargado**

#### **Problema:**
- CSS del componente no está cargado en el template
- Estilos inline sobrescriben tokens CSS
- Animaciones y transiciones no funcionan

#### **✅ Solución:**
```typescript
// Verificar y cargar CSS antes de implementar
async function verifyAndLoadCSS(componentId: string, templatePath: string) {
  // 1. Verificar si CSS ya está cargado
  const cssLoaded = await checkCSSLoaded(componentId);
  
  if (!cssLoaded) {
    // 2. Obtener URL del CSS desde Storybook
    const cssUrl = `https://ubits-storybook10.vercel.app/components/${componentId}/src/styles/${componentId}.css`;
    
    // 3. Agregar link al template
    await addCSSLinkToTemplate(templatePath, cssUrl);
    
    // 4. Verificar que se cargó
    const verified = await verifyCSSLoaded(componentId);
    if (!verified) {
      throw new Error(`❌ No se pudo cargar CSS: ${cssUrl}`);
    }
  }
  
  return true;
}
```

**Checklist:**
- [ ] ✅ Verificar que CSS esté cargado antes de implementar
- [ ] ✅ Agregar link al CSS si no está cargado
- [ ] ✅ NO usar estilos inline (usar clases y tokens)
- [ ] ✅ Verificar que tokens CSS estén disponibles

---

### **3. ❌ Estilos Inline Sobrescriben Tokens**

#### **Problema:**
- Valores hardcodeados (`rgba(0, 0, 0, 0.5)`, `12px`, etc.) en lugar de tokens
- Estilos inline sobrescriben animaciones y transiciones
- Z-index y otros valores incorrectos

#### **✅ Solución:**
```typescript
// ❌ INCORRECTO: Estilos inline hardcodeados
const overlay = `<div style="background: rgba(0, 0, 0, 0.5); z-index: 10000;">`;

// ✅ CORRECTO: Solo clases CSS, sin estilos inline
const overlay = `<div class="ubits-modal-overlay ubits-modal-overlay--open">`;

// Si DEBES usar estilos inline, usar tokens:
const overlay = `<div style="background: var(--modifiers-normal-color-light-bg-dim);">`;
```

**Checklist:**
- [ ] ✅ NO usar estilos inline a menos que sea absolutamente necesario
- [ ] ✅ Si se usan estilos inline, usar tokens CSS (`var(--token-name)`)
- [ ] ✅ NO hardcodear valores (colores, spacing, z-index, etc.)
- [ ] ✅ Dejar que el CSS maneje animaciones y transiciones

---

### **4. ❌ No Se Consultó Storybook Correctamente**

#### **Problema:**
- No se extrajo código real desde Storybook
- Se usó fallback manual sin verificar estructura
- No se consultó código fuente

#### **✅ Solución:**
```typescript
// Proceso obligatorio antes de implementar
async function implementComponentFromStorybook(
  componentId: string,
  storyName: string = 'default'
) {
  // 1. Consultar Storybook en Vercel (NO Libraries UI para componentes UBITS)
  const storybookUrl = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${storyName}`;
  await navigateToStorybook(storybookUrl);
  
  // 2. Extraer código desde pestaña "Code"
  const codeTab = await clickTab('Code');
  const code = await extractCodeFromTab(codeTab);
  
  // 3. Consultar código fuente
  const sourceCode = await readFile(`vendor/ubits/packages/components/${componentId}/src/${componentId}Provider.ts`);
  
  // 4. Comparar estructura
  const structureMatches = compareStructure(code.html, sourceCode);
  if (!structureMatches) {
    throw new Error('❌ Estructura no coincide con código fuente');
  }
  
  // 5. Verificar CSS
  await verifyAndLoadCSS(componentId, templatePath);
  
  // 6. Implementar usando código exacto
  return code.html;
}
```

**Checklist:**
- [ ] ✅ Consultar Storybook en Vercel (NO Libraries UI)
- [ ] ✅ Extraer código desde pestaña "Code" (NO adivinar)
- [ ] ✅ Consultar código fuente (`{Component}Provider.ts`)
- [ ] ✅ Comparar estructura antes de implementar
- [ ] ✅ NO usar fallback manual sin verificar

---

### **5. ❌ Falta de Validación Visual**

#### **Problema:**
- No se probó visualmente antes de finalizar
- No se comparó con Storybook después de implementar
- Errores visuales no detectados

#### **✅ Solución:**
```typescript
// Validación visual obligatoria después de implementar
async function validateVisualImplementation(
  templateUrl: string,
  storybookUrl: string
) {
  // 1. Tomar snapshot del template
  await navigateToTemplate(templateUrl);
  const templateSnapshot = await takeVisualSnapshot();
  
  // 2. Tomar snapshot de Storybook
  await navigateToStorybook(storybookUrl);
  const storybookSnapshot = await takeVisualSnapshot();
  
  // 3. Comparar
  const comparison = await compareSnapshots(templateSnapshot, storybookSnapshot);
  
  if (!comparison.matches) {
    console.error('❌ Diferencias encontradas:', comparison.differences);
    throw new Error('❌ Implementación no coincide visualmente con Storybook');
  }
  
  return true;
}
```

**Checklist:**
- [ ] ✅ Probar visualmente en el template después de implementar
- [ ] ✅ Comparar con Storybook (snapshot visual)
- [ ] ✅ Verificar que animaciones funcionen
- [ ] ✅ Verificar que tokens CSS se apliquen
- [ ] ✅ Si no coincide, corregir inmediatamente

---

## 📋 PROCESO OBLIGATORIO DE IMPLEMENTACIÓN

### **FASE 1: PREPARACIÓN (ANTES de Implementar)**

```typescript
async function prepareImplementation(componentId: string) {
  // 1. Consultar Storybook
  const storybookUrl = await getStorybookUrl(componentId);
  await navigateToStorybook(storybookUrl);
  
  // 2. Extraer código
  const code = await extractCodeFromStorybook(componentId);
  
  // 3. Consultar código fuente
  const sourceCode = await getSourceCode(componentId);
  
  // 4. Comparar estructura
  const matches = compareStructure(code, sourceCode);
  if (!matches) {
    throw new Error('❌ Estructura no coincide');
  }
  
  // 5. Verificar CSS
  await verifyAndLoadCSS(componentId);
  
  return { code, sourceCode, cssLoaded: true };
}
```

### **FASE 2: IMPLEMENTACIÓN**

```typescript
async function implementComponent(
  componentId: string,
  code: string,
  templatePath: string
) {
  // 1. Insertar código en template
  await insertCodeIntoTemplate(templatePath, code);
  
  // 2. Verificar que se insertó correctamente
  const inserted = await verifyCodeInserted(templatePath, code);
  if (!inserted) {
    throw new Error('❌ Código no se insertó correctamente');
  }
  
  return true;
}
```

### **FASE 3: VALIDACIÓN (DESPUÉS de Implementar)**

```typescript
async function validateImplementation(
  componentId: string,
  templateUrl: string
) {
  // 1. Validación estructural
  const structureValid = await validateStructure(templateUrl, componentId);
  
  // 2. Validación de CSS
  const cssValid = await validateCSS(templateUrl, componentId);
  
  // 3. Validación visual
  const storybookUrl = await getStorybookUrl(componentId);
  const visualValid = await validateVisualImplementation(templateUrl, storybookUrl);
  
  if (!structureValid || !cssValid || !visualValid) {
    throw new Error('❌ Validación falló');
  }
  
  return true;
}
```

---

## 🎯 CHECKLIST COMPLETO

### **ANTES de Implementar:**
- [ ] ✅ Consultar Storybook en Vercel (URL correcta)
- [ ] ✅ Extraer código desde pestaña "Code"
- [ ] ✅ Consultar código fuente (`{Component}Provider.ts`)
- [ ] ✅ Verificar estructura HTML exacta
- [ ] ✅ Verificar que CSS esté cargado o agregarlo
- [ ] ✅ Verificar que tokens CSS estén disponibles
- [ ] ✅ NO usar estilos inline (usar clases y tokens)
- [ ] ✅ NO crear fallback manual sin verificar

### **DURANTE Implementación:**
- [ ] ✅ Usar estructura exacta del provider/código fuente
- [ ] ✅ Incluir todos los elementos anidados requeridos
- [ ] ✅ Usar clases CSS exactas (no simplificar)
- [ ] ✅ Cargar CSS si no está cargado
- [ ] ✅ Usar tokens CSS en lugar de valores hardcodeados
- [ ] ✅ NO usar estilos inline a menos que sea necesario

### **DESPUÉS de Implementar:**
- [ ] ✅ Probar visualmente en el template
- [ ] ✅ Comparar con Storybook (snapshot visual)
- [ ] ✅ Verificar que animaciones funcionen
- [ ] ✅ Verificar que tokens CSS se apliquen
- [ ] ✅ Verificar que estructura HTML sea correcta
- [ ] ✅ Si no coincide, corregir inmediatamente

---

## 🔧 HERRAMIENTAS Y HELPERS

### **1. Helper de Extracción desde Storybook**

```typescript
export async function extractExactCodeFromStorybook(
  componentId: string,
  storyName: string = 'default'
): Promise<{
  html: string;
  css: string[];
  js: string;
  structure: ComponentStructure;
}> {
  // Implementación completa en: packages/autorun-core/src/helpers/storybookCodeExtractor.ts
}
```

### **2. Helper de Verificación de CSS**

```typescript
export async function verifyAndLoadCSS(
  componentId: string,
  templatePath: string
): Promise<boolean> {
  // Implementación completa en: packages/autorun-core/src/helpers/cssVerifier.ts
}
```

### **3. Helper de Comparación Visual**

```typescript
export async function compareImplementationWithStorybook(
  templateUrl: string,
  storybookUrl: string
): Promise<ComparisonResult> {
  // Implementación completa en: packages/autorun-core/src/helpers/visualComparator.ts
}
```

---

## 📚 REFERENCIAS

- **Análisis detallado de fallos:** `docs/analisis/ANALISIS-DETALLADO-FALLOS-IMPLEMENTACION-MODAL.md`
- **Código fuente Modal:** `vendor/ubits/packages/components/modal/src/ModalProvider.ts`
- **CSS Modal:** `vendor/ubits/packages/components/modal/src/styles/modal.css`
- **Storybook Modal:** `https://ubits-storybook10.vercel.app/?path=/story/feedback-modal--default`

---

**Última actualización:** 2025-01-10  
**Versión:** 1.0.0  
**Estado:** ✅ **GUÍA COMPLETA - LISTA PARA USAR**

