# 📚 Guía: Documentar Componentes desde Storybook Local

Esta guía explica cómo documentar componentes UBITS usando el Storybook local en `http://localhost:6006/`.

---

## 🎯 Proceso Recomendado

### Paso 1: Verificar Storybook Local

1. Asegúrate de que Storybook esté corriendo:
   ```bash
   # En el directorio de UBITS
   npm run storybook
   ```

2. Verifica que esté accesible en: `http://localhost:6006/`

---

### Paso 2: Navegar al Componente

1. Abre `http://localhost:6006/` en el navegador
2. Busca el componente en el menú lateral
3. Haz click en el componente para ver sus historias

---

### Paso 3: Extraer Información

Para cada componente, extrae:

#### Información Básica
- **Nombre del componente** (ej: "Data Table")
- **Categoría** (ej: "Data")
- **Descripción** (de la pestaña "Docs" o "Description")

#### Historias Disponibles
- **Lista de historias** (ej: "Default", "With Icons", etc.)
- **ID de cada historia** (ej: `data-data-table--default`)
- **URL de cada historia** (ej: `http://localhost:6006/?path=/story/data-data-table--default`)

#### Código de Ejemplo
- **Pestaña "Code"**: Copia el código de ejemplo completo
- **Pestaña "Controls"**: Revisa todas las opciones disponibles
- **Pestaña "Docs"**: Lee la documentación completa

#### Props y Opciones
- **Tabla de props** (de la pestaña "Controls")
- **Tipos de datos** para cada prop
- **Valores por defecto**
- **Descripciones** de cada prop

---

### Paso 4: Generar Documentación

Usa la plantilla en `docs/referencia/componentes/[componente].md`:

```markdown
# 📦 [Nombre del Componente]

> **Componente UBITS:** `[slug]`  
> **Categoría:** [Categoría]  
> **API:** `window.create[Nombre]()` o `<ubits-[slug]>`  
> **Storybook Local:** http://localhost:6006/?path=/story/[slug]--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/[slug]--default

## 🎯 Descripción

[Descripción del componente desde Storybook]

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/[slug]--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/[slug]--default
- **Código fuente:** `vendor/ubits/packages/components/[slug]/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/[slug]/src/types/[Nombre]Options.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/[Nombre].stories.ts`

---

## 📚 Historias de Storybook

### Historia 1: [Nombre de la Historia]

**ID en Storybook:** `[slug]--[historia]`  
**URL Local:** http://localhost:6006/?path=/story/[slug]--[historia]  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/[slug]--[historia]

**Descripción:**
[Descripción de la historia desde Storybook]

**Código de ejemplo:**
\`\`\`javascript
// Copiar desde la pestaña "Code" de Storybook
\`\`\`

**Opciones utilizadas:**
- `option1`: `value1` - Descripción
- `option2`: `value2` - Descripción

**Casos de uso:**
- Caso de uso 1
- Caso de uso 2

---

## ⚙️ Opciones y Props Completas

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `prop1` | `type1` | `default1` | Descripción desde Controls |
| `prop2` | `type2` | `default2` | Descripción desde Controls |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: [Título]
\`\`\`javascript
// Código de ejemplo desde Storybook
\`\`\`

---

## 🚨 Errores Comunes

[Agregar errores comunes específicos del componente]

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
```

---

## 🔧 Herramientas Disponibles

### MCP de Storybook

Puedes usar el MCP de Storybook para obtener información:

```javascript
// Obtener lista de componentes
mcp_storybook_getComponentList()

// Obtener props de componentes
mcp_storybook_getComponentsProps([
  'Data/Data Table',
  'Navegación/Tabs',
  'Básicos/Button'
])
```

### Script de Generación

```bash
# Generar documentación base
node scripts/generate-component-docs-from-storybook.js
```

---

## 📋 Checklist de Documentación

Para cada componente, verifica:

- [ ] Nombre y categoría correctos
- [ ] Descripción completa
- [ ] Todas las historias listadas
- [ ] URLs de Storybook (local y Vercel) correctas
- [ ] Código de ejemplo de cada historia
- [ ] Tabla completa de props desde "Controls"
- [ ] Ejemplos prácticos
- [ ] Errores comunes documentados
- [ ] Referencias a guías relacionadas

---

## 🎯 Componentes Prioritarios

1. **Data/Data Table** - Tabla de datos
2. **Navegación/Tabs** - Tabs de navegación
3. **Básicos/Button** - Botones
4. **Formularios/Input** - Inputs
5. **Navegación/Sidebar** - Sidebar
6. **Navegación/SubNav** - SubNav
7. **Feedback/Alert** - Alertas
8. **Feedback/Modal** - Modales
9. **Layout/Card Content** - Tarjetas
10. **Formularios/Checkbox** - Checkboxes

---

**Última actualización:** 2025-01-03

