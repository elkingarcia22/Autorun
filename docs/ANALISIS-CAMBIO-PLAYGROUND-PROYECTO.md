# Análisis: Cambio de "playground" a "proyecto"

## Situación Actual

### 1. Estructura Actual
- **`packages/playground-app/`**: Contiene los templates de UBITS (colaborador y admin)
  - `template-admin.html` - Template de UBITS para administradores
  - `template-colaborador.html` - Template de UBITS para colaboradores
  - `tokens/index.html` - Documentación de tokens
  - `config/`, `engine/`, `utils/` - Sistema de gestión de contenido

### 2. Importante: Templates son de UBITS
- Los templates `template-admin.html` y `template-colaborador.html` son **de UBITS**, no de Autoframe
- Estos templates se conservarán temporalmente
- En el futuro, todo lo de UBITS se moverá a un repositorio propio (último paso)

## Cambios Necesarios

### Fase 1: Renombrar Directorio
- `packages/playground-app/` → `packages/proyecto-app/` (o `packages/proyecto/`)

### Fase 2: Cambiar Referencias en Archivos
Archivos que contienen referencias a "playground":
1. `packages/playground-app/tokens/index.html` - Referencia en estructura del proyecto
2. `packages/playground-app/template-admin.html` - Título: "UBITS Playground"
3. `packages/playground-app/template-colaborador.html` - Título: "UBITS Playground"
4. `packages/addons/design/templates-admin/src/template-admin.html` - Título: "Autoframe Playground"
5. `packages/addons/design/templates-colaborador/src/template-colaborador.html` - Título: "Autoframe Playground"
6. `docs/PLAN-DOCUMENTACION-HUB.md` - Referencia a `packages/playground-app/`
7. Comentarios en CSS que mencionan "playground antiguo"

### Fase 3: Actualizar Referencias en Código
- Scripts que referencian `playground-app`
- Configuraciones que apuntan a `playground-app`
- Imports/requires que usan rutas con `playground-app`

## Estrategia

### Opción 1: Renombrar a `proyecto-app`
- Mantiene consistencia con el nombre actual
- Fácil de encontrar y entender

### Opción 2: Renombrar a `proyecto`
- Más corto y directo
- Menos verboso

**Recomendación**: `proyecto-app` para mantener claridad

## Notas Importantes

1. **Templates de UBITS**: Los templates deben mantener su identidad como "UBITS" en los títulos, pero la carpeta será "proyecto"
2. **Templates de Autoframe**: Los templates en `packages/addons/design/templates-*/` son de Autoframe y deben decir "Autoframe Proyecto"
3. **Conservar funcionalidad**: Todos los cambios deben mantener la funcionalidad existente
4. **Último paso**: Mover todo lo de UBITS a repositorio propio (se hará después)

## Archivos a Modificar

### Archivos Principales
- [ ] `packages/playground-app/` → Renombrar directorio
- [ ] `packages/playground-app/template-admin.html` - Cambiar título y comentarios
- [ ] `packages/playground-app/template-colaborador.html` - Cambiar título y comentarios
- [ ] `packages/playground-app/tokens/index.html` - Cambiar referencia en estructura

### Archivos de Add-ons Autoframe
- [ ] `packages/addons/design/templates-admin/src/template-admin.html` - Cambiar título
- [ ] `packages/addons/design/templates-colaborador/src/template-colaborador.html` - Cambiar título

### Documentación
- [ ] `docs/PLAN-DOCUMENTACION-HUB.md` - Actualizar rutas

### Scripts (si existen referencias)
- [ ] Verificar scripts que referencien `playground-app`

## Plan de Ejecución

1. **Análisis completo** ✅ (este documento)
2. **Renombrar directorio** `packages/playground-app/` → `packages/proyecto-app/`
3. **Actualizar referencias en archivos HTML**
4. **Actualizar referencias en documentación**
5. **Verificar scripts y configuraciones**
6. **Probar que todo funciona**

