# Plan de Migración: Tokens como Add-ons

## 🎯 Objetivo
Convertir el sistema de tokens actual en un sistema de add-ons intercambiables, manteniendo compatibilidad hacia atrás y sin romper nada.

## 📋 Estado Actual Guardado
- ✅ **Commit**: `a7fb34d` - "checkpoint: antes de migración tokens a add-ons"
- ✅ **Branch**: `fase-1-tokens`
- ✅ **Estado**: Todo guardado en GitHub

## 🔄 Estrategia: Sistema Híbrido
Mantener tokens estáticos funcionando + agregar add-ons como opcional.

---

## 📝 Fases de Migración

### **FASE 1: Preparación y Estructura** (Sin cambios funcionales) ✅ COMPLETADA
- [x] Paso 1.1: Guardar estado actual en GitHub (commit: a7fb34d)
- [x] Paso 1.2: Crear estructura base del add-on de tokens (commit: cc5e58f)
- [x] Paso 1.3: Crear interfaz `TokensAddon` (commit: cc5e58f)
- [x] Paso 1.4: Crear `TokensAddon` base (sin usar todavía) (commit: cc5e58f)
- [x] Paso 1.5: Tests básicos de estructura (commit: 943f8a5)

### **FASE 2: Implementación del Add-on** (Sin afectar producción) ✅ COMPLETADA
- [x] Paso 2.1: Implementar carga de tokens CSS (commit: 174d86a)
- [x] Paso 2.2: Implementar validación de tokens requeridos (commit: 95eaac3)
- [x] Paso 2.3: Implementar sistema de fallback (commit: ca9d26c)
- [x] Paso 2.4: Tests de carga y validación (commit: corregido)
- [x] Paso 2.5: Tests de fallback (commit: completado)

### **FASE 3: Sistema Híbrido** (Mantener compatibilidad)
- [ ] Paso 3.1: Crear `TokensManager` que soporte ambos sistemas
- [ ] Paso 3.2: Integrar con sistema de add-ons existente
- [ ] Paso 3.3: Tests de compatibilidad
- [ ] Paso 3.4: Verificar que todo sigue funcionando

### **FASE 4: Documentación y Validación**
- [ ] Paso 4.1: Documentar uso del nuevo sistema
- [ ] Paso 4.2: Crear script de validación de tokens
- [ ] Paso 4.3: Tests end-to-end
- [ ] Paso 4.4: Verificación final

---

## 🛡️ Reglas de Seguridad

1. **Nunca eliminar** código existente sin tener reemplazo funcionando
2. **Siempre mantener** compatibilidad hacia atrás
3. **Siempre hacer commit** después de cada paso exitoso
4. **Siempre probar** antes de continuar al siguiente paso
5. **Siempre tener** fallback disponible

---

## 🔙 Plan de Rollback

Si algo se rompe en cualquier paso:

```bash
# Volver al checkpoint
git reset --hard a7fb34d
git push --force
```

---

## ✅ Checklist de Verificación por Paso

Antes de continuar al siguiente paso, verificar:
- [ ] Código compila sin errores
- [ ] Tests pasan
- [ ] No hay errores en consola
- [ ] UI se ve correctamente
- [ ] Commit hecho y guardado

