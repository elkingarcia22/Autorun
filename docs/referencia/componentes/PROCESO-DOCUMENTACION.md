# 📚 Proceso de Documentación de Componentes desde Storybook Local

Este documento explica el proceso paso a paso para documentar componentes UBITS usando el Storybook local en `http://localhost:6006/`.

---

## 🎯 Objetivo

Documentar todos los componentes UBITS con:
- Descripción completa
- Todas las historias disponibles
- Código de ejemplo de cada historia
- Tabla completa de props y opciones
- Ejemplos prácticos
- Errores comunes

---

## 🚀 Proceso Paso a Paso

### Paso 1: Preparar Storybook Local

1. Asegúrate de que Storybook esté corriendo:
   ```bash
   # En el directorio de UBITS
   cd vendor/ubits/packages/storybook
   npm run storybook
   ```

2. Verifica que esté accesible en: `http://localhost:6006/`

---

### Paso 2: Para Cada Componente

#### 2.1. Navegar al Componente

1. Abre `http://localhost:6006/` en el navegador
2. Busca el componente en el menú lateral (ej: "Data/Data Table")
3. Haz click en el componente
4. Selecciona la historia "Default" (o la primera disponible)

**URL de ejemplo:** `http://localhost:6006/?path=/story/data-data-table--default`

#### 2.2. Extraer Información de la Pestaña "Docs"

1. Haz click en la pestaña **"Docs"** (si está disponible)
2. Copia la **descripción del componente**
3. Lee cualquier información adicional sobre uso y casos de uso

#### 2.3. Extraer Información de la Pestaña "Code"

1. Haz click en la pestaña **"Code"**
2. Copia el **código completo** de ejemplo
3. Identifica las **opciones utilizadas** en el código

**Ejemplo de código a copiar:**
```javascript
// Código completo desde Storybook
```

#### 2.4. Extraer Información de la Pestaña "Controls"

1. Haz click en la pestaña **"Controls"**
2. Revisa la **tabla completa de props**
3. Para cada prop, copia:
   - Nombre de la prop
   - Tipo de dato
   - Valor por defecto
   - Descripción

**Formato de tabla:**
| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `prop1` | `type1` | `default1` | Descripción desde Controls |
| `prop2` | `type2` | `default2` | Descripción desde Controls |

#### 2.5. Identificar Todas las Historias

1. Revisa el **menú lateral** del componente
2. Lista **todas las historias** disponibles (ej: "Default", "With Icons", etc.)
3. Para cada historia:
   - Navega a la historia
   - Copia el código de ejemplo
   - Documenta las diferencias con "Default"

---

### Paso 3: Completar la Documentación

Usa la plantilla generada en `docs/referencia/componentes/[componente].md` y completa:

1. **Descripción:** Pega la descripción desde "Docs"
2. **Historias:** Documenta cada historia con su código
3. **Props:** Pega la tabla completa desde "Controls"
4. **Ejemplos:** Crea ejemplos prácticos basados en las historias
5. **Errores comunes:** Agrega errores específicos del componente

---

## 🔧 Herramientas Disponibles

### MCP de Storybook

Puedes usar el MCP para obtener información rápidamente:

```javascript
// Obtener lista de componentes
mcp_storybook_getComponentList()

// Obtener props de un componente específico
mcp_storybook_getComponentsProps(['Data/Data Table'])
```

### Scripts de Generación

```bash
# Generar plantillas base
node scripts/document-components-from-storybook.js
```

---

## 📋 Checklist por Componente

Para cada componente, verifica:

- [ ] Navegado a Storybook local
- [ ] Descripción copiada desde "Docs"
- [ ] Código de ejemplo copiado desde "Code"
- [ ] Tabla de props copiada desde "Controls"
- [ ] Todas las historias listadas
- [ ] Código de cada historia documentado
- [ ] Ejemplos prácticos agregados
- [ ] Errores comunes documentados
- [ ] URLs de Storybook (local y Vercel) correctas
- [ ] Referencias a guías relacionadas

---

## 🎯 Componentes Prioritarios

1. ✅ **Data/Data Table** - Ya documentado
2. ✅ **Navegación/Tabs** - Ya documentado
3. ✅ **Básicos/Button** - Ya documentado
4. ✅ **Formularios/Input** - Ya documentado
5. ✅ **Navegación/Sidebar** - Ya documentado
6. ⏳ **Navegación/SubNav** - Pendiente
7. ⏳ **Feedback/Alert** - Pendiente
8. ⏳ **Feedback/Modal** - Pendiente
9. ⏳ **Layout/Card Content** - Pendiente
10. ⏳ **Formularios/Checkbox** - Pendiente

---

## 💡 Tips

- **Usa el navegador MCP** para navegar automáticamente a cada componente
- **Toma screenshots** si es necesario para documentar visualmente
- **Copia código directamente** desde la pestaña "Code" de Storybook
- **Verifica en Vercel** también para comparar versiones

---

**Última actualización:** 2025-01-03

