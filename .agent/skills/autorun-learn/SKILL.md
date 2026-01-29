# 🧠 Skill: Autorun Learn

**Nombre:** autorun-learn  
**Propósito:** Aprender de implementaciones previas para mejorar futuras implementaciones  
**Tipo:** Sistema RAG (Retrieval-Augmented Generation)

---

## 📖 Descripción

Este skill permite a Antigravity aprender automáticamente de implementaciones previas, creando una base de conocimiento que mejora con cada uso.

**Funcionalidades:**
- Indexación automática de prototypes existentes
- Búsqueda de implementaciones similares
- Extracción de patrones exitosos
- Registro de nuevas implementaciones
- Métricas de aprendizaje continuo

---

## 🎯 Cuándo Usar

### Auto-invocación (Recomendado):

El skill debe invocarse automáticamente en estos momentos:

1. **Al iniciar sesión de Antigravity:**
   - Actualizar índice con nuevos prototypes
   - Cargar knowledge base

2. **Antes de implementar componente:**
   - Buscar implementaciones similares
   - Extraer mejores prácticas
   - Identificar errores a evitar

3. **Después de implementar componente:**
   - Registrar nueva implementación
   - Actualizar patrones
   - Incrementar métricas

### Invocación Manual:

```markdown
Usuario: "¿Qué has aprendido sobre DataTable?"
```

---

## 📋 Proceso Completo

### Fase 1: Inicialización (Al iniciar)

```markdown
1. Verificar si existe `.autorun/knowledge-base.json`
   - Si NO existe → Crear estructura base
   - Si existe → Cargar en memoria

2. Escanear `prototypes/` para nuevos archivos
   - Comparar con última indexación
   - Indexar solo archivos nuevos/modificados

3. Actualizar metadata
   - Total de implementaciones
   - Última actualización
   - Componentes únicos
```

**Archivo de control:** `.autorun/.last-indexed`
```json
{
  "last_indexed_at": "2026-01-29T14:00:00Z",
  "files_indexed": 15,
  "components_found": 25
}
```

---

### Fase 2: Búsqueda Pre-Implementación

**Trigger:** Usuario solicita implementar componente

```markdown
Proceso:

1. Identificar componente solicitado
   Ejemplo: "Implementa DataTable de usuarios"
   → Componente: DataTable
   → Contexto: usuarios, administrador

2. Buscar en knowledge base:
   {
     "query": {
       "component": "DataTable",
       "context_keywords": ["usuarios", "administrador"],
       "success_only": true
     }
   }

3. Rankear resultados por similitud:
   - Mismo componente: +10 puntos
   - Contexto similar: +5 puntos por keyword
   - Implementación exitosa: +3 puntos
   - Reciente: +1 punto por semana

4. Retornar top-3 más relevantes con detalles:
   - Archivo de referencia
   - Props usados
   - Errores evitados
   - Best practices aplicadas
```

---

### Fase 3: Implementación Asistida

**Durante la implementación:**

```markdown
1. Mostrar referencias encontradas

   "Encontré 3 implementaciones previas de DataTable:
   
   1. canvas-administrador-usuarios.html (más similar)
      - Props: data, columns, pagination, sorting
      - Evitó: error de formato de iconos
      - Tiempo: 2.5 min
   
   2. canvas-administrador-roles.html
      - Props: data, columns, filters
      - Tiempo: 3 min
   
   3. canvas-colaborador-reportes.html
      - Props: data, columns, pagination
      - Tiempo: 4 min"

2. Crear plan basado en referencias

   "Implementaré DataTable usando como referencia
   canvas-administrador-usuarios.html:
   
   ✅ Reutilizaré: estructura de pagination
   ✅ Aplicaré: gap en contenedor (aprendido)
   ⚠️ Evitaré: error de iconos (fa-solid fa-icon)
   
   Estimado: 2 min (vs 3-4 min sin referencia)"

3. Implementar con mejores prácticas

4. Validar resultado
```

---

### Fase 4: Registro Post-Implementación

**Después de validación:**

```markdown
1. Capturar información de implementación:
   - Componente usado
   - Props aplicados
   - Archivo destino
   - Errores encontrados (si los hubo)
   - Errores corregidos
   - Tiempo de implementación

2. Crear entrada en knowledge base:
   {
     "id": "impl_004",
     "component": "DataTable",
     "file": "prototypes/canvas-administrador-cursos-2026-01-29.html",
     "date": "2026-01-29T14:45:00Z",
     "context": "Gestión de cursos",
     "success": true,
     "errors_found": 0,
     "time_minutes": 2.1,
     "props_used": ["data", "columns", "pagination", "sorting"],
     "learned_from": ["impl_001"],
     "improvements": "Evitó error de iconos gracias a referencia"
   }

3. Actualizar patrones del componente:
   {
     "DataTable": {
       "usage_count": 4,  // +1
       "success_rate": 1.0,  // Recalcular
       "average_time": 2.9,  // Actualizar
       "common_props": [...],  // Actualizar frecuencias
       "best_practices": [...]  // Consolidar
     }
   }

4. Guardar knowledge base actualizado
   → .autorun/knowledge-base.json
```

---

## 🗂️ Estructura de la Knowledge Base

```json
{
  "implementations": [
    {
      "id": "impl_001",
      "component": "DataTable",
      "file": "prototypes/canvas-administrador-encuestas-2026-01-29.html",
      "date": "2026-01-29T10:30:00Z",
      "context": "Administrador de encuestas",
      "success": true,
      "errors_found": 2,
      "errors_fixed": true,
      "time_minutes": 3.5,
      "code_snippet": "<div class='ubits-datatable'>...</div>",
      "props_used": ["data", "columns", "pagination", "sorting", "filters"],
      "tags": ["administrador", "encuestas", "tabla"],
      "learned_from": [],
      "improvements": null,
      "error_details": [
        {
          "type": "icon-format",
          "before": "fa-solid fa-search",
          "after": "fa-solid search",
          "lesson": "Iconos no deben tener 'fa-' en nombre"
        }
      ]
    }
  ],
  "patterns": {
    "DataTable": {
      "usage_count": 3,
      "success_rate": 1.0,
      "average_time": 2.9,
      "common_props": {
        "data": 3,
        "columns": 3,
        "pagination": 3,
        "sorting": 3,
        "filters": 2
      },
      "common_errors": {
        "icon-format": 1,
        "spacing": 0
      },
      "best_practices": [
        "Usar gap en contenedor padre",
        "No margin directo en componente",
        "Tokens CSS para estilos"
      ],
      "first_used": "2026-01-29",
      "last_used": "2026-01-29"
    },
    "Button": {
      "usage_count": 15,
      "success_rate": 0.93,
      "average_time": 1.2,
      // ...
    }
  },
  "metadata": {
    "total_implementations": 25,
    "unique_components": 12,
    "total_errors_found": 8,
    "total_errors_fixed": 8,
    "average_success_rate": 0.92,
    "total_time_saved": "15min",
    "last_updated": "2026-01-29T14:45:00Z",
    "version": "1.0.0"
  }
}
```

---

## 📊 Métricas de Aprendizaje

### Métricas Automáticas:

```typescript
interface LearningMetrics {
  // Por componente
  componentMetrics: {
    [component: string]: {
      usageCount: number;
      successRate: number;  // 0.0 - 1.0
      averageTime: number;  // minutos
      errorReduction: number;  // % reducción errores
      timeImprovement: number;  // % mejora tiempo
    }
  };
  
  // Globales
  globalMetrics: {
    totalImplementations: number;
    averageSuccessRate: number;
    totalTimeSaved: number;  // minutos
    learningVelocity: number;  // mejora por implementación
  };
}
```

### Dashb oard de Métricas:

```markdown
## 📊 Learning Dashboard

### Componentes Más Usados:
1. Button - 15 usos (100% éxito, 1.2 min promedio)
2. DataTable - 4 usos (100% éxito, 2.9 min promedio)
3. Input - 8 usos (87% éxito, 1.5 min promedio)

### Mejora con el Tiempo:
- Primera DataTable: 4 min, 2 errores
- Última DataTable: 2.1 min, 0 errores
- **Mejora: 47% más rápido, 100% menos errores**

### Errores Más Comunes Evitados:
1. icon-format (evitado 4 veces)
2. spacing (evitado 2 veces)
3. tokens-css (evitado 1 vez)

### Tiempo Total Ahorrado:
**15 minutos** en 25 implementaciones
```

---

## 🚀 Integración con Workflows

### En implement-component.md:

```markdown
## Paso 1.5: Consultar Knowledge Base ⬅️ NUEVO

Antes de extraer de Storybook, consultar learning history:

```typescript
// Skill: autorun-learn
1. Buscar implementaciones similares
2. Si encontradas:
   a. Mostrar referencias
   b. Extraer mejores prácticas
   c. Listar errores a evitar
   d. Estimar tiempo con aprendizaje
3. Continuar con extracción Storybook
```

## Paso 7: Registrar en Knowledge Base ⬅️ NUEVO

Después de validación:

```typescript
// Skill: autorun-learn
1. Registrar implementación
2. Actualizar patrones
3. Calcular métricas
4. Guardar knowledge base
```
```

---

## 🎯 Casos de Uso

### Caso 1: Primera Implementación

```
Usuario: "Implementa un Accordion"

Antigravity (autorun-learn):
→ Buscando implementaciones previas de Accordion...
→ No encontrado. Esta será la primera.
→ Implementación sin referencias.
→ [Implementa normalmente]
→ [Encuentra 1 error de spacing]
→ [Corrige error]
→ Registrado como impl_001_Accordion
→ Aprend ido: evitar margin directo
```

### Caso 2: Segunda Implementación (CON aprendizaje)

```
Usuario: "Implementa otro Accordion"

Antigravity (autorun-learn):
→ Buscando implementaciones previas de Accordion...
→ ✅ Encontrado: 1 implementación previa
→ Referencia: canvas-admin-faqs.html
→ Aprendido: evitar margin directo
→ [Implementa con best practices]
→ [0 errores]
→ Success! 50% más rápido que primera vez
→ Registrado como impl_002_Accordion
```

---

## 🔄 Auto-Mejora Continua

El sistema mejora automáticamente:

1. **Con cada implementación:** Más datos → Mejor contexto
2. **Con cada error:** Aprende qué evitar
3. **Con cada éxito:** Consolida best practices
4. **Con el tiempo:** Patrones emergen naturalmente

**Resultado:** Sistema exponencialmente más inteligente

---

## ⚙️ Configuración

### Archivo: `.autorun/learn-config.json`

```json
{
  "enabled": true,
  "autoUpdate": true,
  "minSimilarityScore": 5,
  "maxReferencesToShow": 3,
  "trackMetrics": true,
  "saveHistory": true,
  "knowledgeBasePath": ".autorun/knowledge-base.json"
}
```

---

**Ver también:**
- `.agent/workflows/learn-from-history.md` - Workflow de aprendizaje
- `docs/analisis/SISTEMA-RAG-APRENDIZAJE.md` - Análisis completo del sistema RAG
