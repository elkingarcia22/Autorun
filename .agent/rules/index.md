# 📚 Índice de Reglas - Autorun

## 🎯 Reglas Principales

Este directorio contiene las reglas modularizadas para trabajar con Autorun en Antigravity.

### Orden de Lectura Recomendado:

1. **[00-inicio.md](00-inicio.md)** - ⚠️ OBLIGATORIO
   - Verificación inicial de cada sesión
   - Inicialización de AutorunHub
   - Ejecución de handleUserMessage()

2. **[01-deteccion-imagen.md](01-deteccion-imagen.md)** - Sistema de triggers
   - Detección automática de imágenes
   - Proceso de análisis previo
   - Bloqueo hasta plan aprobado

3. **[02-componentes.md](02-componentes.md)** - Uso de componentes UBITS
   - Catálogo de 80+ componentes
   - Reglas de uso correcto
   - Tokens y estilos

4. **[03-implementacion.md](03-implementacion.md)** - Proceso de implementación
   - Flujo obligatorio con autorun.apply()
   - Implementación por historias de Storybook
   - Watermarks y verificación

5. **[04-errores.md](04-errores.md)** - Errores comunes
   - 11+ errores documentados
   - Soluciones específicas
   - Prevención

## 🔑 Reglas Críticas (Resumen)

### ✅ SIEMPRE:
- Ejecutar `handleUserMessage()` al inicio
- Usar `autorun.apply()` para implementar
- Consultar Storybook MCP antes de implementar
- Crear plan y pedir aprobación
- Implementar UNA tarea a la vez
- Verificar con `autorun.verify()`

### ❌ NUNCA:
- Usar `write()` o `search_replace()` en `prototypes/`
- Agregar margin/padding a componentes UBITS
- Implementar sin consultar Storybook
- Implementar todo de golpe sin plan
- Modificar estilos de componentes directamente

## 🔗 Documentación Adicional

### Guías Completas (en `docs/`):
- `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md`
- `docs/guias/implementacion/GUIA-IMPLEMENTACION-MAESTRA.md`
- `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

### Workflows (en `.agent/workflows/`):
- *Pendiente:* Se crearán workflows específicos en Fase 2

### Skills (en `.agent/skills/`):
- *Pendiente:* Se crearán skills reutilizables en Fase 3

## 📖 Cómo Usar Este Índice

1. **Al iniciar sesión:** Lee [00-inicio.md](00-inicio.md)
2. **Si implementas algo:** Lee [03-implementacion.md](03-implementacion.md)
3. **Si hay imagen:** Lee [01-deteccion-imagen.md](01-deteccion-imagen.md)
4. **Si hay errores:** Consulta [04-errores.md](04-errores.md)
5. **Para componentes:** Consulta [02-componentes.md](02-componentes.md)

## 🆕 Novedades de Antigravity

Esta estructura modular reemplaza el archivo `.cursorrules` monolítico (962 líneas) con reglas enfocadas y mantenibles.

**Ventajas:**
- ✅ Más fácil de mantener
- ✅ Más fácil de encontrar información
- ✅ Menos redundancia
- ✅ Mejor organización
- ✅ Compatible con workflows y skills de Antigravity

---

**Última actualización:** 2026-01-29  
**Versión:** 1.0.0 (Migración Antigravity)
