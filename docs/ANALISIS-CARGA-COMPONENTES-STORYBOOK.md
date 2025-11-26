# Análisis: Carga de Componentes desde URL Pública de Storybook

## 🎯 Pregunta Principal

**¿Se puede construir/tomar componentes solo con la URL pública de Vercel del Storybook, sin necesidad del repositorio?**

---

## 📋 Requisitos para Cargar Componentes desde Storybook

### **Archivos Necesarios**

Para cargar un componente desde Storybook, se necesitan los siguientes archivos:

1. **`manifest.json`** - Metadatos del componente
   - Nombre, versión, tipo
   - Lista de componentes (tags, paths)
   - Rutas a estilos CSS
   - Dependencias

2. **Archivo JavaScript del componente** (`.js`)
   - Código compilado del componente
   - Debe exportar una clase que implemente `IComponentAddon`
   - Debe registrar Web Components si aplica

3. **Archivo CSS del componente** (`.css`)
   - Estilos del componente
   - Usa tokens CSS (variables `--ubits-*`)

### **Estructura del Manifest**

```json
{
  "name": "@autorun/button",
  "version": "1.0.0",
  "type": "component",
  "components": [
    {
      "name": "autorun-button",
      "tag": "autorun-button",
      "path": "./button.js"  // Ruta relativa o absoluta
    }
  ],
  "styles": ["./button.css"],  // Rutas a CSS
  "dependencies": {
    "@autorun/core": "^1.0.0"
  }
}
```

---

## 🔍 Análisis: ¿Qué Ofrece Storybook en Vercel?

### **Lo que Storybook SÍ ofrece:**

1. ✅ **Aplicación Storybook completa**
   - HTML, CSS, JS de la aplicación Storybook
   - Stories renderizadas
   - Navegación y UI de Storybook

2. ✅ **Assets estáticos** (en `/assets/`)
   - Bundles de Storybook
   - Fuentes, imágenes
   - CSS globales

### **Lo que Storybook NO ofrece por defecto:**

1. ❌ **Manifests individuales por componente**
   - Storybook no genera `manifest.json` por componente automáticamente
   - Cada componente necesitaría su propio manifest

2. ❌ **Bundles individuales por componente**
   - Storybook genera un bundle grande (`main.js`, `runtime.js`)
   - No genera bundles separados por componente por defecto

3. ❌ **CSS separado por componente**
   - Los estilos están en el bundle principal
   - No hay CSS individual por componente

---

## ✅ Solución: ¿Se Puede Hacer?

### **Opción 1: Con Build Personalizado (Recomendado)**

**SÍ, se puede hacer**, pero requiere:

1. **Build personalizado que genere:**
   - `manifest.json` por componente
   - Bundle JS individual por componente
   - CSS individual por componente

2. **Estructura en Storybook:**
   ```
   storybook-static/
   ├── components/
   │   ├── button/
   │   │   ├── manifest.json
   │   │   ├── button.js
   │   │   └── button.css
   │   ├── alert/
   │   │   ├── manifest.json
   │   │   ├── alert.js
   │   │   └── alert.css
   ```

3. **URLs públicas:**
   - `https://storybook.vercel.app/components/button/manifest.json`
   - `https://storybook.vercel.app/components/button/button.js`
   - `https://storybook.vercel.app/components/button/button.css`

### **Opción 2: Sin Build Personalizado (Limitado)**

**NO, no se puede hacer directamente** porque:

- Storybook no expone componentes individuales
- No hay manifests disponibles
- Los bundles están combinados
- No hay forma de extraer un componente específico

---

## 🛠️ Implementación Necesaria

### **1. Script de Build para Generar Manifests**

```typescript
// scripts/generate-component-manifests.ts
import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

async function generateManifests() {
  const componentsDir = 'packages/addons';
  const outputDir = 'storybook-static/components';
  
  const components = ['button', 'alert', 'mask', 'welcome', 'button-feedback'];
  
  for (const component of components) {
    const manifest = {
      name: `@autorun/${component}`,
      version: '1.0.0',
      type: 'component',
      components: [{
        name: `autorun-${component}`,
        tag: `autorun-${component}`,
        path: `./${component}.js`
      }],
      styles: [`./${component}.css`]
    };
    
    writeFileSync(
      join(outputDir, component, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
  }
}
```

### **2. Build de Componentes Individuales**

```typescript
// vite.config.component.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ButtonAddon',
      fileName: 'button',
      formats: ['es']
    },
    rollupOptions: {
      external: ['@autorun/core'],
      output: {
        dir: 'dist/components/button'
      }
    }
  }
});
```

### **3. Función de Carga desde URL**

```typescript
// packages/autorun-core/src/ComponentLoader.ts
export class ComponentLoader {
  async loadFromStorybook(options: {
    manifestUrl: string;
  }): Promise<void> {
    // 1. Fetch manifest
    const manifest = await fetch(options.manifestUrl).then(r => r.json());
    
    // 2. Resolver rutas (relativas o absolutas)
    const baseUrl = new URL(options.manifestUrl).origin;
    
    // 3. Cargar CSS
    for (const stylePath of manifest.styles) {
      const styleUrl = stylePath.startsWith('http') 
        ? stylePath 
        : `${baseUrl}/${manifest.name.replace('@autorun/', '')}/${stylePath}`;
      
      await this.loadCSS(styleUrl);
    }
    
    // 4. Cargar JavaScript
    for (const component of manifest.components) {
      const jsUrl = component.path.startsWith('http')
        ? component.path
        : `${baseUrl}/${manifest.name.replace('@autorun/', '')}/${component.path}`;
      
      await this.loadJS(jsUrl);
    }
    
    // 5. Registrar componente
    await this.registerComponent(manifest);
  }
  
  private async loadCSS(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
  
  private async loadJS(url: string): Promise<void> {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = url;
    document.head.appendChild(script);
  }
}
```

---

## 📊 Comparación: Con vs Sin Repositorio

| Aspecto | Con Repositorio | Solo URL Storybook |
|---------|----------------|-------------------|
| **Manifests** | ✅ Generados automáticamente | ⚠️ Requiere build personalizado |
| **Bundles JS** | ✅ Disponibles en `dist/` | ⚠️ Requiere build separado |
| **CSS** | ✅ Disponible en `dist/` | ⚠️ Requiere extracción |
| **TypeScript** | ✅ Código fuente disponible | ❌ Solo código compilado |
| **Dependencias** | ✅ `package.json` disponible | ⚠️ Debe estar en manifest |
| **Tests** | ✅ Disponibles | ❌ No disponibles |
| **Documentación** | ✅ README disponible | ⚠️ Solo en Storybook |

---

## ✅ Conclusión

### **Respuesta Corta:**

**SÍ, se puede hacer**, pero requiere:

1. ✅ **Build personalizado** que genere manifests y bundles individuales
2. ✅ **Estructura de archivos** en Storybook estático
3. ✅ **URLs públicas** accesibles desde Vercel
4. ✅ **CORS configurado** para permitir carga desde otros dominios

### **Respuesta Larga:**

**Sin el repositorio, necesitas:**

1. **Preparar el Storybook build:**
   - Generar manifests por componente
   - Generar bundles JS individuales
   - Extraer CSS por componente
   - Subir todo a Vercel

2. **Implementar el loader:**
   - Función `loadFromStorybook()` que:
     - Fetch del manifest
     - Resuelva rutas relativas/absolutas
     - Cargue CSS y JS dinámicamente
     - Registre componentes

3. **Ventajas:**
   - ✅ No necesitas clonar repositorio
   - ✅ Componentes siempre actualizados (último deploy)
   - ✅ Fácil de cambiar versiones

4. **Desventajas:**
   - ⚠️ Requiere build personalizado
   - ⚠️ No tienes código fuente
   - ⚠️ Dependencias deben estar resueltas
   - ⚠️ Debugging más difícil

---

## 🚀 Recomendación

### **Opción Recomendada: Híbrida**

1. **Para desarrollo:** Usar repositorio (código fuente, tests, etc.)
2. **Para producción:** Usar URL de Storybook (componentes compilados)
3. **Para ambos:** Implementar loader que soporte ambas fuentes

```typescript
// Cargar desde repositorio (desarrollo)
await loadComponent({
  source: 'local',
  path: './packages/addons/button'
});

// Cargar desde Storybook (producción)
await loadComponent({
  source: 'storybook',
  manifestUrl: 'https://storybook.vercel.app/components/button/manifest.json'
});
```

---

## 📝 Checklist de Implementación

Para hacer esto funcionar, necesitas:

- [ ] Script que genere manifests por componente
- [ ] Build que genere bundles individuales
- [ ] Extracción de CSS por componente
- [ ] Implementar `ComponentLoader.loadFromStorybook()`
- [ ] Configurar CORS en Vercel
- [ ] Documentar estructura de URLs
- [ ] Testing de carga desde URL
- [ ] Manejo de errores y fallbacks

---

## 🔗 Referencias

- [Guía: Cambiar Componentes desde Storybook](./GUIA-CAMBIAR-COMPONENTES-DESDE-STORYBOOK.md)
- [Arquitectura: Componentes como Add-ons](./ARQUITECTURA-COMPONENTES-ADDONS.md)

