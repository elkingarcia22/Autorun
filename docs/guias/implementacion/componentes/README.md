# 📚 Estrategias de Implementación por Componente

Este directorio contiene estrategias específicas de implementación para cada componente UBITS. Estas estrategias complementan la [estrategia general](../ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md) con detalles específicos y lecciones aprendidas de cada componente.

---

## 📋 Estructura

Cada archivo sigue el formato:
- `ESTRATEGIA-[NOMBRE-COMPONENTE].md`

**Ejemplos:**
- `ESTRATEGIA-TOOLTIP-POPOVER.md` - Estrategia para Tooltip y Popover
- `ESTRATEGIA-MODAL.md` - Estrategia para Modal ⚠️ **OBLIGATORIO**
- `ESTRATEGIA-DATATABLE.md` - Estrategia para DataTable (cuando se cree)

---

## 🎯 Cuándo Consultar

**Consultar estrategia específica ANTES de implementar:**
1. ✅ Al implementar un componente por primera vez
2. ✅ Cuando se encuentren errores específicos del componente
3. ✅ Cuando se necesite entender detalles técnicos específicos
4. ✅ Cuando se quiera evitar errores comunes del componente

---

## 📚 Estrategias Disponibles

### **Tooltip y Popover**
- **Archivo:** `ESTRATEGIA-TOOLTIP-POPOVER.md`
- **Cuándo usar:** Al implementar Tooltip o Popover
- **Temas cubiertos:**
  - Detección de contenedor principal
  - Ajuste dinámico de ancho
  - Cálculo de posición óptima
  - Entender `tailPosition` correctamente
  - Validación de valores NaN

### **Modal** ⚠️ **OBLIGATORIO**
- **Archivo:** `ESTRATEGIA-MODAL.md`
- **Cuándo usar:** Al implementar Modal
- **Temas cubiertos:**
  - Verificar múltiples namespaces para `createModal`
  - Implementar fallback HTML exacto (estructura de ModalProvider.ts)
  - Inicialización independiente de otros componentes
  - Inicialización con reintentos para el botón
  - Limpiar instancias anteriores antes de crear nuevas
  - Manejo correcto de event listeners

---

## 🔄 Relación con Estrategia General

**Estrategia General:**
- Aplica a TODOS los componentes
- Errores comunes generales
- Proceso de implementación estándar
- Checklist general

**Estrategias Específicas:**
- Aplican a componentes específicos
- Errores comunes específicos
- Detalles técnicos del componente
- Checklist específico del componente

**Ambas deben seguirse:**
1. Primero: Consultar estrategia general
2. Segundo: Consultar estrategia específica (si existe)
3. Tercero: Implementar siguiendo ambas

---

## 📝 Cómo Crear una Nueva Estrategia

1. **Crear archivo:** `ESTRATEGIA-[NOMBRE].md`
2. **Incluir secciones:**
   - Objetivo
   - Checklist Pre-Implementación
   - Conceptos Críticos
   - Implementación Obligatoria (por fases)
   - Checklist Completo
   - Errores Comunes a Evitar
   - Referencias
3. **Actualizar este README** con la nueva estrategia

---

**Última actualización:** 2025-12-10
