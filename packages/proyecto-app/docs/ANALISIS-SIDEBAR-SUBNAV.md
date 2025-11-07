# Análisis: Relación Sidebar ↔ SubNav ↔ Contenido

## Resumen
Este documento analiza la relación entre el Sidebar (colaborador/admin), SubNav, y contenido dinámico.

## Sidebar Variants

### 1. Sidebar "Colaborador" (variant: 'colaborador')
**Botones del body:**
1. `admin` → SubNav: `template` (admin-inicio, admin-empresa, admin-config)
2. `aprendizaje` → SubNav: `aprendizaje` (home, catalog, corporate, study-zone)
3. `diagnóstico` → SubNav: `template` (diagnostico-general, diagnostico-resultados)
4. `desempeño` → SubNav: `desempeno` (evaluations, objectives, metrics, reports)
5. `encuestas` → SubNav: `template` (encuestas-general)
6. `reclutamiento` → SubNav: `template` (reclutamiento-general)
7. `tareas` → SubNav: `template` (planes, tasks)
8. `ubits-ai` → **NO tiene SubNav** (variant: null)

**Footer:** Sin botones

### 2. Sidebar "Admin" (variant: 'admin')
**Botones del body:**
1. `inicio` → SubNav: `template` (section1, section2, section3)
2. `empresa` → SubNav: `empresa` (gestion-usuarios, organigrama, datos-empresa, personalizacion, roles-permisos, comunicaciones)
3. `aprendizaje` → SubNav: `admin-aprendizaje` (lms-cursos, plan-formacion, certificados, metricas-empresa)
4. `diagnóstico` → SubNav: `template` (diagnostico-general, diagnostico-resultados)
5. `desempeño` → SubNav: `admin-desempeño` (evaluations, objectives, matriz-talento)
6. `encuestas` → SubNav: `template` (encuestas-general)

**Footer:**
- `api` → Sin SubNav específico
- `centro-de-ayuda` → Sin SubNav específico

## Mapeo Sección → SubNav

| Sección Sidebar | Variante SubNav | Tabs | Notas |
|---|---|---|---|
| `admin` (colaborador) | `template` | admin-inicio, admin-empresa, admin-config | |
| `aprendizaje` (colaborador) | `aprendizaje` | home, catalog, corporate, **study-zone** | ✅ CORRECTO |
| `diagnóstico` | `template` | diagnostico-general, diagnostico-resultados | |
| `desempeño` | `desempeno` | evaluations, objectives, metrics, reports | |
| `encuestas` | `template` | encuestas-general | |
| `reclutamiento` | `template` | reclutamiento-general | |
| `tareas` | `template` | planes, tasks | |
| `ubits-ai` | **null** (sin SubNav) | - | Se oculta el SubNav |
| `inicio` (admin) | `template` | section1, section2, section3 | |
| `empresa` (admin) | `empresa` | gestion-usuarios, organigrama, datos-empresa, personalizacion, roles-permisos, comunicaciones | |
| `aprendizaje` (admin) | `admin-aprendizaje` | lms-cursos, plan-formacion, certificados, metricas-empresa | DIFERENTE a colaborador |
| `desempeño` (admin) | `admin-desempeño` | evaluations, objectives, matriz-talento | DIFERENTE a colaborador |

## Problemas Identificados

### Problema 1: Secciones Admin Faltantes
El `ContentManager.getSubNavForSection()` no tiene mapeos para:
- `inicio` (admin)
- `empresa` (admin)
- `aprendizaje` (admin) - tiene uno genérico pero debería ser `admin-aprendizaje`
- `desempeño` (admin) - tiene uno genérico pero debería ser `admin-desempeño`

### Problema 2: Contenido Faltante
El `ContentManager.getContentForSection()` no tiene contenido para:
- Todos los tabs de `admin` (admin-inicio, admin-empresa, admin-config)
- Todos los tabs de `empresa` (admin)
- Todos los tabs de `admin-aprendizaje`
- Todos los tabs de `admin-desempeño`

### Problema 3: Callback onTabChange
Cuando se hace clic en un tab del SubNav (ej: `study-zone`), el callback `onTabChange` debería llamar a `updateContent(section, tabId)`, pero puede que no se esté ejecutando correctamente.

## Plan de Corrección

1. ✅ **TAREA 1**: Documentar relación completa (ESTE DOCUMENTO)
2. ⏳ **TAREA 2**: Corregir `getSubNavForSection()` para incluir todas las secciones de admin
3. ⏳ **TAREA 3**: Agregar contenido para todas las subsecciones faltantes
4. ⏳ **TAREA 4**: Verificar y corregir el callback `onTabChange` en SubNav
5. ⏳ **TAREA 5**: Probar específicamente "Zona de estudio" (study-zone) para verificar que carga

