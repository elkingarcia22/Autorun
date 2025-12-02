# 📋 Plan de Migración: Usar Solo Storybook de Vercel

## 🎯 Objetivo
Migrar Autorun para que funcione **SOLO** con el Storybook de Vercel, eliminando la dependencia de `vendor/ubits/` y archivos locales.

## ✅ Estado Actual Guardado
- ✅ Commit realizado: `0e313f5` - "feat: Remover border y elevación del SubNav + guías Storybook MCP"

---

## 📝 Micropasos de Implementación

### **FASE 1: Análisis y Preparación**

#### **Paso 1.1: Identificar archivos necesarios del template**
- [ ] Listar todos los CSS que carga el template
- [ ] Listar todos los JS que carga el template
- [ ] Listar todos los assets (FontAwesome, imágenes)
- [ ] Documentar estructura de rutas actual

#### **Paso 1.2: Verificar disponibilidad en Storybook de Vercel**
- [ ] Verificar si Storybook expone templates HTML
- [ ] Verificar si Storybook expone CSS de componentes
- [ ] Verificar si Storybook expone JS de componentes
- [ ] Verificar si Storybook expone tokens CSS
- [ ] Verificar si Storybook expone assets

---

### **FASE 2: Crear Servidor HTTP Local**

#### **Paso 2.1: Crear servidor HTTP simple**
- [ ] Crear `packages/autorun-core/src/server/LocalServer.ts`
- [ ] Implementar servidor HTTP con Node.js `http` module
- [ ] Servir archivos estáticos desde `prototypes/`
- [ ] Configurar CORS para permitir cargar desde Vercel
- [ ] Puerto por defecto: 3000

#### **Paso 2.2: Integrar servidor en InitializationWizard**
- [ ] Agregar método `startLocalServer()` en `InitializationWizard.ts`
- [ ] Iniciar servidor antes de abrir template
- [ ] Abrir template en `http://localhost:3000/` en lugar de `file://`

---

### **FASE 3: Modificar CanvasCreator para usar Vercel**

#### **Paso 3.1: Modificar loadTemplateFromStorybook**
- [ ] Cambiar para cargar template desde Vercel usando `fetch()`
- [ ] URL: `https://ubits-storybook.vercel.app/templates/template-admin.html`
- [ ] Manejar errores si no está disponible
- [ ] Mantener fallback a vendor/ubits/ temporalmente

#### **Paso 3.2: Modificar adjustTemplatePaths para URLs de Vercel**
- [ ] Cambiar rutas relativas a URLs de Vercel
- [ ] Patrón: `https://ubits-storybook.vercel.app/tokens/dist/tokens.css`
- [ ] Patrón: `https://ubits-storybook.vercel.app/components/sidebar/src/styles/sidebar.css`
- [ ] Patrón: `https://ubits-storybook.vercel.app/templates/components-loader.js`
- [ ] Usar `getUrl()` helper de `UBITSPreset` para incluir bypass token

#### **Paso 3.3: Actualizar addDataTableUMD**
- [ ] Cambiar ruta de data-table.umd.js a URL de Vercel
- [ ] URL: `https://ubits-storybook.vercel.app/components/data-table/dist/data-table.umd.js`

---

### **FASE 4: Modificar Storybook Build (En proyecto UBITS)**

#### **Paso 4.1: Crear script de build para exponer archivos**
- [ ] Crear script que copie templates a `storybook-static/templates/`
- [ ] Copiar CSS de componentes a `storybook-static/components/[name]/src/styles/`
- [ ] Copiar JS de componentes a `storybook-static/components/[name]/dist/`
- [ ] Copiar tokens a `storybook-static/tokens/dist/`
- [ ] Copiar assets a `storybook-static/assets/`

#### **Paso 4.2: Actualizar vercel.json o configuración de despliegue**
- [ ] Configurar Vercel para servir archivos estáticos
- [ ] Asegurar que todos los archivos estén accesibles vía URL

---

### **FASE 5: Actualizar openTemplateInBrowser**

#### **Paso 5.1: Cambiar de file:// a http://localhost**
- [ ] Modificar `openTemplateInBrowser` en `InitializationWizard.ts`
- [ ] Usar `http://localhost:3000/canvas-*.html` en lugar de `file://`
- [ ] Verificar que el servidor esté corriendo antes de abrir

---

### **FASE 6: Pruebas y Validación**

#### **Paso 6.1: Probar wizard completo**
- [ ] Ejecutar wizard desde cero
- [ ] Verificar que template se carga desde Vercel
- [ ] Verificar que CSS se carga correctamente
- [ ] Verificar que JS se carga correctamente
- [ ] Verificar que componentes funcionan

#### **Paso 6.2: Verificar en navegador**
- [ ] Abrir template en navegador
- [ ] Verificar consola sin errores CORS
- [ ] Verificar que todos los recursos cargan
- [ ] Verificar que componentes se renderizan

---

### **FASE 7: Limpieza (Opcional)**

#### **Paso 7.1: Eliminar vendor/ubits/**
- [ ] Solo después de verificar que TODO funciona
- [ ] Actualizar `.gitignore` si es necesario
- [ ] Actualizar documentación

---

## 🔍 Archivos a Modificar

1. `packages/autorun-core/src/wizard/CanvasCreator.ts`
   - `loadTemplateFromStorybook()` - Cargar desde Vercel
   - `adjustTemplatePaths()` - Cambiar a URLs de Vercel
   - `addDataTableUMD()` - Cambiar a URL de Vercel

2. `packages/autorun-core/src/wizard/InitializationWizard.ts`
   - `openTemplateInBrowser()` - Usar http://localhost
   - Agregar `startLocalServer()` - Iniciar servidor HTTP

3. `packages/autorun-core/src/server/LocalServer.ts` (NUEVO)
   - Servidor HTTP simple para servir templates

4. `vendor/ubits/packages/storybook/` (En proyecto UBITS)
   - Script de build para exponer archivos
   - Configuración de Vercel

---

## ⚠️ Consideraciones

1. **CORS**: El servidor local debe permitir CORS para cargar desde Vercel
2. **Bypass Token**: Usar `getUrl()` de `UBITSPreset` para incluir token
3. **Fallback**: Mantener fallback a vendor/ubits/ temporalmente
4. **Internet**: Requiere conexión a internet para funcionar
5. **Vercel Disponibilidad**: Depende de que Vercel esté disponible

---

## 📊 Orden de Ejecución

1. ✅ **Paso 1**: Análisis (ya hecho parcialmente)
2. ⏭️ **Paso 2**: Crear servidor HTTP local
3. ⏭️ **Paso 3**: Modificar CanvasCreator
4. ⏭️ **Paso 4**: Modificar Storybook build (en proyecto UBITS)
5. ⏭️ **Paso 5**: Actualizar openTemplateInBrowser
6. ⏭️ **Paso 6**: Pruebas
7. ⏭️ **Paso 7**: Limpieza (opcional)

