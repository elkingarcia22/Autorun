# 📚 Plan: Documentación de Componentes con Historias de Storybook

## 🎯 Objetivo

Crear documentación completa de cada componente UBITS que incluya:
- ✅ Todas las historias (stories) disponibles en Storybook
- ✅ Variantes y opciones de cada historia
- ✅ Ejemplos de código de cada historia
- ✅ Enlaces directos a Storybook en Vercel
- ✅ Contexto completo de funcionalidades

---

## 📋 Estructura Propuesta

### Opción A: Integrar en Catálogo Existente (RECOMENDADO)

**Estructura:**
```
docs/referencia/
├── catalogo-componentes.md          # Catálogo principal (actual)
├── componentes/                     # ⭐ NUEVO: Documentación detallada
│   ├── button.md                    # Documentación completa de Button
│   ├── data-table.md                # Documentación completa de DataTable
│   ├── tabs.md                      # Documentación completa de Tabs
│   ├── sidebar.md                   # Documentación completa de Sidebar
│   └── ...                          # Un archivo por componente
│
└── componentes-template.md          # ⭐ NUEVO: Plantilla para nuevos componentes
```

**Ventajas:**
- ✅ Mantiene el catálogo simple para identificación rápida
- ✅ Documentación detallada separada pero accesible
- ✅ Fácil de mantener y actualizar
- ✅ No sobrecarga el catálogo principal

---

### Opción B: Expandir Catálogo Actual

**Estructura:**
```
docs/referencia/
└── catalogo-componentes.md          # Expandido con todas las historias
```

**Desventajas:**
- ❌ Archivo muy grande (difícil de navegar)
- ❌ Mezcla información básica con detallada
- ❌ Más difícil de mantener

---

## 📖 Formato de Documentación por Componente

### Estructura Estándar

```markdown
# 📦 [Nombre del Componente]

> **Componente UBITS:** `[nombre-técnico]`  
> **API:** `window.create[Nombre]()` o `<ubits-[nombre]>`  
> **Storybook:** [Enlace directo]

## 🎯 Descripción

[Descripción breve del componente y su propósito]

## 🔗 Enlaces Rápidos

- **Storybook en Vercel:** [URL completa]
- **Código fuente:** `vendor/ubits/packages/components/[nombre]/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/[nombre]/src/types/[Nombre]Options.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/[Nombre].stories.ts`

## 📚 Historias de Storybook

### Historia 1: [Nombre de la Historia]

**ID en Storybook:** `[categoria]-[nombre-componente]--[nombre-historia]`  
**URL:** `https://ubits-storybook10.vercel.app/?path=/story/[categoria]-[nombre-componente]--[nombre-historia]`

**Descripción:**
[Qué muestra esta historia]

**Variantes mostradas:**
- Variante 1: [Descripción]
- Variante 2: [Descripción]

**Código de ejemplo:**
```javascript
// Código exacto de la historia
window.create[Nombre]({
  // ... configuración
});
```

**Opciones utilizadas:**
- `opcion1`: [valor] - [Descripción]
- `opcion2`: [valor] - [Descripción]

**Casos de uso:**
- [Cuándo usar esta variante]
- [Ejemplo de uso]

---

### Historia 2: [Nombre de la Historia]

[Repetir estructura para cada historia]

---

## ⚙️ Opciones y Props Completas

### Opciones Principales

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `opcion1` | `string` | `'default'` | [Descripción] |
| `opcion2` | `boolean` | `false` | [Descripción] |

### Variantes Disponibles

- `variante1`: [Descripción y cuándo usar]
- `variante2`: [Descripción y cuándo usar]

### Callbacks y Eventos

- `onClick`: Se dispara cuando [descripción]
- `onChange`: Se dispara cuando [descripción]

---

## 🎨 Tokens Utilizados

- `--ubits-[token]`: [Descripción]
- `--ubits-[token]`: [Descripción]

---

## 🚨 Errores Comunes

### Error 1: [Descripción del error]
**Solución:** [Solución]

---

## 📖 Referencias

- [Guía relacionada 1](ruta)
- [Guía relacionada 2](ruta)
```

---

## 🔄 Proceso de Generación

### Fase 1: Análisis de Stories Existentes

**Script:** `scripts/generate-component-docs.js`

**Proceso:**
1. Leer todos los archivos `.stories.ts` en `vendor/ubits/packages/storybook/stories/`
2. Extraer:
   - Nombre del componente
   - Todas las historias (export const ...)
   - Configuración de cada historia
   - Código de ejemplo
   - Opciones utilizadas
3. Generar archivo markdown por componente

**Ejemplo de extracción:**
```javascript
// Leer Button.stories.ts
const stories = [
  {
    name: 'Default',
    id: 'basicos-button--default',
    code: `window.UBITS.Button.create({ variant: 'primary' })`,
    options: { variant: 'primary', size: 'md' }
  },
  {
    name: 'With Icon',
    id: 'basicos-button--with-icon',
    code: `...`,
    options: { ... }
  }
]
```

---

### Fase 2: Generación de Documentación

**Para cada componente:**

1. **Crear archivo base:**
   ```bash
   docs/referencia/componentes/button.md
   ```

2. **Rellenar con información:**
   - Descripción del componente
   - Enlaces a Storybook
   - Todas las historias encontradas
   - Código de ejemplo de cada historia

3. **Agregar información adicional:**
   - Opciones completas (desde tipos TypeScript)
   - Tokens utilizados
   - Errores comunes (desde guías existentes)

---

### Fase 3: Integración con Catálogo

**Actualizar `CATALOGO-COMPONENTES-UBITS.md`:**

```markdown
### 1. **Button** (`window.UBITS.Button` o `<ubits-button>`)

**Descripción visual:**
[Descripción actual]

**Uso básico:**
[Ejemplo actual]

**📚 Documentación completa:** [Ver todas las historias de Storybook](docs/referencia/componentes/button.md)

**🔗 Storybook:** [Ver en Storybook](https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default)
```

---

## 🛠️ Script de Generación

### `scripts/generate-component-docs.js`

```javascript
#!/usr/bin/env node

/**
 * Genera documentación de componentes desde archivos .stories.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storiesDir = path.join(__dirname, '../vendor/ubits/packages/storybook/stories');
const outputDir = path.join(__dirname, '../docs/referencia/componentes');

// Función para leer y parsear archivo .stories.ts
function parseStoriesFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const componentName = path.basename(filePath, '.stories.ts');
  
  // Extraer historias usando regex o parser
  const stories = extractStories(content);
  
  return {
    componentName,
    stories
  };
}

// Función para generar markdown
function generateMarkdown(component) {
  // Generar contenido markdown según plantilla
  return `# 📦 ${component.componentName}\n\n...`;
}

// Proceso principal
function main() {
  // 1. Leer todos los .stories.ts
  const storyFiles = fs.readdirSync(storiesDir)
    .filter(file => file.endsWith('.stories.ts'));
  
  // 2. Procesar cada archivo
  storyFiles.forEach(file => {
    const filePath = path.join(storiesDir, file);
    const component = parseStoriesFile(filePath);
    const markdown = generateMarkdown(component);
    
    // 3. Escribir archivo markdown
    const outputPath = path.join(outputDir, `${component.componentName.toLowerCase()}.md`);
    fs.writeFileSync(outputPath, markdown);
  });
  
  console.log('✅ Documentación generada');
}

main();
```

---

## 📊 Ejemplo: Documentación de Button

```markdown
# 📦 Button

> **Componente UBITS:** `button`  
> **API:** `window.UBITS.Button.create()` o `<ubits-button>`  
> **Storybook:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default

## 🎯 Descripción

Botón interactivo con múltiples variantes, tamaños y estados. Componente base para acciones en la interfaz.

## 🔗 Enlaces Rápidos

- **Storybook en Vercel:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default
- **Código fuente:** `vendor/ubits/packages/components/button/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/button/src/types/ButtonOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Button.stories.ts`

## 📚 Historias de Storybook

### Historia 1: Default

**ID en Storybook:** `basicos-button--default`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default

**Descripción:**
Botón básico con variante primaria y tamaño mediano.

**Variantes mostradas:**
- Variante: `primary`
- Tamaño: `md`

**Código de ejemplo:**
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  label: 'Click me'
});
```

**Opciones utilizadas:**
- `variant`: `'primary'` - Variante primaria (azul)
- `size`: `'md'` - Tamaño mediano

**Casos de uso:**
- Acción principal en formularios
- Botones de confirmación
- CTAs principales

---

### Historia 2: With Icon

**ID en Storybook:** `basicos-button--with-icon`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--with-icon

**Descripción:**
Botón con icono a la izquierda del texto.

**Variantes mostradas:**
- Variante: `primary`
- Tamaño: `md`
- Icono: `plus` (FontAwesome)

**Código de ejemplo:**
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  label: 'Agregar',
  icon: 'plus',
  iconPosition: 'left'
});
```

**Opciones utilizadas:**
- `icon`: `'plus'` - Nombre del icono FontAwesome (sin prefijos)
- `iconPosition`: `'left'` - Posición del icono

**Casos de uso:**
- Botones de agregar/crear
- Acciones con iconos descriptivos
- Mejorar UX con iconos

---

### Historia 3: All Variants

**ID en Storybook:** `basicos-button--all-variants`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--all-variants

**Descripción:**
Muestra todas las variantes disponibles del botón.

**Variantes mostradas:**
- `primary` - Botón primario (azul)
- `secondary` - Botón secundario (gris)
- `outline` - Botón con borde
- `ghost` - Botón transparente

**Código de ejemplo:**
```javascript
// Variante primary
window.UBITS.Button.create({
  variant: 'primary',
  label: 'Primary'
});

// Variante secondary
window.UBITS.Button.create({
  variant: 'secondary',
  label: 'Secondary'
});

// Variante outline
window.UBITS.Button.create({
  variant: 'outline',
  label: 'Outline'
});

// Variante ghost
window.UBITS.Button.create({
  variant: 'ghost',
  label: 'Ghost'
});
```

**Casos de uso:**
- Ver todas las opciones disponibles
- Comparar variantes visualmente
- Elegir variante apropiada

---

## ⚙️ Opciones y Props Completas

### Opciones Principales

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Variante visual del botón |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `label` | `string` | `''` | Texto del botón |
| `icon` | `string` | `undefined` | Nombre del icono FontAwesome (sin prefijos) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posición del icono |
| `disabled` | `boolean` | `false` | Deshabilitar botón |
| `loading` | `boolean` | `false` | Mostrar estado de carga |

### Variantes Disponibles

- `primary`: Botón principal (azul) - Usar para acciones principales
- `secondary`: Botón secundario (gris) - Usar para acciones secundarias
- `outline`: Botón con borde - Usar para acciones menos importantes
- `ghost`: Botón transparente - Usar para acciones terciarias

### Tamaños Disponibles

- `sm`: Pequeño (32px altura)
- `md`: Mediano (40px altura) - Default
- `lg`: Grande (48px altura)

### Callbacks y Eventos

- `onClick`: Se dispara cuando se hace click en el botón
  ```javascript
  window.UBITS.Button.create({
    label: 'Click me',
    onClick: (event) => {
      console.log('Button clicked!');
    }
  });
  ```

---

## 🎨 Tokens Utilizados

- `--ubits-accent-brand-static`: Color azul primario (#0c5bef)
- `--ubits-spacing-sm`: Espaciado pequeño (8px)
- `--ubits-spacing-md`: Espaciado mediano (12px)
- `--ubits-spacing-lg`: Espaciado grande (16px)

---

## 🚨 Errores Comunes

### Error 1: Usar Prefijos en Iconos
**Problema:** Usar `'far fa-plus'` en lugar de `'plus'`  
**Solución:** Usar solo el nombre del icono sin prefijos  
**Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

### Error 2: No Especificar Variante
**Problema:** Asumir que el botón es primario por defecto  
**Solución:** Siempre especificar `variant` explícitamente

---

## 📖 Referencias

- [Guía de uso de componentes](docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Catálogo de componentes](../catalogo-componentes.md)
- [Errores comunes](docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md)
```

---

## 🎯 Plan de Implementación

### Fase 1: Preparación (Semana 1)

1. ✅ Crear estructura de directorios
   ```bash
   mkdir -p docs/referencia/componentes
   ```

2. ✅ Crear plantilla de documentación
   ```bash
   docs/referencia/componentes-template.md
   ```

3. ✅ Crear script de generación base
   ```bash
   scripts/generate-component-docs.js
   ```

### Fase 2: Generación Automática (Semana 2)

1. ✅ Implementar parser de archivos `.stories.ts`
2. ✅ Extraer información de cada historia
3. ✅ Generar markdown automáticamente
4. ✅ Validar formato generado

### Fase 3: Documentación Manual (Semana 3)

1. ✅ Revisar y completar documentación generada
2. ✅ Agregar información adicional:
   - Descripciones detalladas
   - Casos de uso
   - Errores comunes
   - Tokens utilizados
3. ✅ Agregar ejemplos prácticos

### Fase 4: Integración (Semana 4)

1. ✅ Actualizar `CATALOGO-COMPONENTES-UBITS.md` con enlaces
2. ✅ Actualizar guías existentes con referencias
3. ✅ Crear índice de componentes documentados
4. ✅ Validar todos los enlaces

---

## 📊 Componentes Prioritarios

### Prioridad ALTA (Documentar Primero)

1. **DataTable** - Componente más complejo y usado
2. **Tabs** - Componente común con múltiples variantes
3. **Button** - Componente base muy usado
4. **Input** - Componente de formulario esencial
5. **Sidebar** - Componente de navegación principal

### Prioridad MEDIA

6. **SubNav** - Navegación secundaria
7. **Alert** - Feedback al usuario
8. **Modal** - Diálogos y overlays
9. **Card** - Contenedor común
10. **List** - Lista de elementos

### Prioridad BAJA

11. Resto de componentes según necesidad

---

## 🔄 Mantenimiento

### Actualización Automática

**Script:** `npm run docs:update-components`

**Proceso:**
1. Leer archivos `.stories.ts` actualizados
2. Comparar con documentación existente
3. Actualizar solo historias nuevas o modificadas
4. Generar reporte de cambios

### Actualización Manual

**Cuándo actualizar manualmente:**
- Cuando se agregan nuevas historias
- Cuando cambian opciones del componente
- Cuando se actualiza Storybook en Vercel
- Cuando se identifican errores comunes nuevos

---

## ✅ Checklist de Implementación

### Preparación
- [ ] Crear estructura de directorios
- [ ] Crear plantilla de documentación
- [ ] Crear script de generación base

### Generación
- [ ] Implementar parser de `.stories.ts`
- [ ] Extraer información de historias
- [ ] Generar markdown automáticamente
- [ ] Validar formato

### Documentación
- [ ] Documentar componentes prioritarios (5 primeros)
- [ ] Agregar información adicional
- [ ] Revisar y corregir
- [ ] Validar enlaces a Storybook

### Integración
- [ ] Actualizar catálogo con enlaces
- [ ] Actualizar guías existentes
- [ ] Crear índice
- [ ] Validar todos los enlaces

---

## 🎯 Resultado Esperado

### Antes
- ❌ Información dispersa en múltiples archivos
- ❌ No hay lista completa de historias por componente
- ❌ Difícil saber qué variantes existen
- ❌ No hay enlaces directos a Storybook

### Después
- ✅ Documentación completa por componente
- ✅ Todas las historias listadas y documentadas
- ✅ Enlaces directos a cada historia en Storybook
- ✅ Código de ejemplo para cada historia
- ✅ Información de opciones y props completa
- ✅ Fácil de mantener y actualizar

---

**Última actualización:** 2025-01-03










