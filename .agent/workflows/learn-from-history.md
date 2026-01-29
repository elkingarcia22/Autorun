---
description: Aprender de implementaciones previas para mejorar futuras implementaciones
---

# 🧠 Workflow: Aprender del Historial

**Propósito:** Indexar y aprender de implementaciones previas para mejorar calidad y velocidad

---

## 🎯 Cuándo Usar

- **Antes de implementar:** Buscar implementaciones similares previas
- **Después de implementar:** Registrar nueva implementación en knowledge base
- **Al iniciar sesión:** Actualizar índice con nuevos prototypes

---

## 📋 Proceso

### Paso 1: Cargar Knowledge Base

```bash
# Verificar si existe knowledge base
ls .autorun/knowledge-base.json

# Si no existe, crear estructura base
mkdir -p .autorun
```

**Estructura base:**
```json
{
  "implementations": [],
  "patterns": {},
  "metadata": {
    "total_implementations": 0,
    "last_updated": "2026-01-29T00:00:00Z"
  }
}
```

---

### Paso 2: Indexar Prototypes Existentes

**Escanear directorio prototypes/:**
```bash
ls -la prototypes/canvas-*.html
```

**Para cada archivo:**
1. Extraer nombre del canvas
2. Leer contenido HTML
3. Identificar componentes UBITS usados
4. Extraer fecha de creación
5. Detectar errores corregidos (si hay comentarios)

**Información a registrar:**
- Archivo: `prototypes/canvas-administrador-encuestas-2026-01-29.html`
- Componentes: `['DataTable', 'Button', 'Input', 'Modal']`
- Fecha: `2026-01-29`
- Contexto: `"Administrador de encuestas"`
- Tags: `['administrador', 'encuestas', 'tabla']`

---

### Paso 3: Buscar Implementaciones Similares

**Antes de implementar nuevo componente:**

```markdown
Usuario: "Implementa una DataTable de usuarios"

1. Buscar en knowledge base:
   - Componente: "DataTable"
   - Contexto similar: "usuarios", "administrador"

2. Encontrar top-3 más relevantes:
   - canvas-administrador-encuestas.html (DataTable)
   - canvas-administrador-roles.html (DataTable)
   - canvas-colaborador-reportes.html (DataTable)

3. Analizar patrones comunes:
   - Todos usan: pagination, sorting, filters
   - Errores comunes evitados: icon-format, spacing
   - Best practices: gap en contenedor, tokens CSS
```

---

### Paso 4: Usar Referencia al Implementar

**Workflow ajustado:**

```markdown
## Implementación con Aprendizaje

1. **Consultar knowledge base** ⬅️ NUEVO
   - Buscar implementaciones similares
   - Extraer patrones exitosos
   - Identificar errores comunes a evitar

2. **Consultar catálogo**
   - docs/referencia/CATALOGO-COMPONENTES-UBITS.md

3. **Extraer de Storybook**
   - browser_subagent → Storybook

4. **Crear plan** ⬅️ MEJORADO
   - Incluir referencias de knowledge base
   - Mencionar patrones a reutilizar
   - Listar errores a evitar

5. **Implementar**
   - replace_file_content

6. **Validar**
   - Workflow: validate-implementation.md

7. **Registrar en knowledge base** ⬅️ NUEVO
   - Guardar nueva implementación
   - Marcar si fue exitosa
   - Actualizar patrones
```

---

### Paso 5: Actualizar Knowledge Base

**Después de implementación exitosa:**

```json
{
  "implementations": [
    {
      "id": "impl_003",
      "component": "DataTable",
      "file": "prototypes/canvas-administrador-usuarios-2026-01-29.html",
      "date": "2026-01-29",
      "context": "Administrador de usuarios con permisos",
      "success": true,
      "errors_found": [],
      "code_snippet": "<div class='ubits-datatable' data-options='...'></div>",
      "props_used": ["data", "columns", "pagination", "sorting", "filters"],
      "tags": ["administrador", "usuarios", "permisos"],
      "learned_from": ["impl_001", "impl_002"],
      "improvements": "Evitó errores de iconos gracias a referencia previa"
    }
  ],
  "patterns": {
    "DataTable": {
      "usage_count": 4,
      "success_rate": 1.0,
      "common_props": ["data", "columns", "pagination", "sorting"],
      "common_errors_avoided": ["icon-format", "spacing"],
      "best_practices": [
        "Usar gap en contenedor padre",
        "No margin directo en componente",
        "Aplicar tokens CSS para colores"
      ],
      "average_time": "3min"
    }
  }
}
```

---

## 🔍 Ejemplo Completo

### Escenario: Segunda vez implementando DataTable

**Request:**
```
Usuario: "Implementa una DataTable para gestión de cursos"
```

**Proceso con RAG:**

```markdown
1. BUSCAR en knowledge base
   → Encontrado: 3 implementaciones previas de DataTable
   → Más similar: canvas-administrador-usuarios.html
   → Patrones identificados:
     ✅ Usar pagination + sorting + filters
     ✅ Aplicar gap: var(--spacing-4) en contenedor
     ⚠️ Error común evitado: formato de iconos

2. CONSULTAR catálogo
   → DataTable está en CATALOGO-COMPONENTES-UBITS.md
   → Storybook: components-data-table--implementation

3. EXTRAER de Storybook
   → browser_subagent obtiene código

4. CREAR PLAN con referencia:
   "Implementaré DataTable para cursos, usando como referencia
   la implementación exitosa de canvas-administrador-usuarios.html.
   Reutilizaré estructura de pagination y evitaré el error de
   formato de iconos que se corrigió anteriormente."

5. IMPLEMENTAR
   → Aplica código con mejores prácticas aprendidas

6. VALIDAR
   → 0 errores (aprendió de referencias)

7. REGISTRAR
   → Nueva implementación agregada a knowledge base
   → Success rate DataTable: 100% (4 de 4)
```

**Resultado:** Implementación más rápida y sin errores

---

## 📊 Métricas de Aprendizaje

El sistema trackea automáticamente:

- **Success Rate**: % implementaciones sin errores
- **Time Reduction**: Mejora en tiempo de implementación
- **Error Avoidance**: Errores evitados gracias a aprendizaje
- **Pattern Recognition**: Patrones identificados automáticamente
- **Reuse Rate**: % código reutilizado vs creado desde cero

---

## 🎯 Beneficios

### Para el Usuario:
- ⚡ **Más rápido**: Reutiliza código probado
- 🎯 **Más preciso**: Evita errores conocidos
- 📈 **Mejora continua**: Cada uso mejora el sistema

### Para el Sistema:
- 🧠 **Más inteligente**: Aprende patrones
- 📚 **Base de conocimiento**: Crece orgánicamente
- 🔄 **Auto-mejora**: Sin intervención manual

---

## 🚀 Próximos Pasos

**Fase 1 (Actual):**
- ✅ Indexación básica de prototypes
- ✅ Búsqueda simple por componente
- ✅ Registro de nuevas implementaciones

**Fase 2 (Futuro):**
- 🔮 Embeddings semánticos
- 🔮 Búsqueda por similitud contextual
- 🔮 Sugerencias proactivas

**Fase 3 (Futuro):**
- 🔮 Predicción de errores
- 🔮 Optimización automática de código
- 🔮 A/B testing de implementaciones

---

**Ver también:**
- `.agent/skills/autorun-learn/SKILL.md` - Skill de aprendizaje
- `docs/analisis/SISTEMA-RAG-APRENDIZAJE.md` - Análisis completo
