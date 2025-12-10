# 📋 Checklist: Guía de Uso

## ⚠️ IMPORTANTE

Este checklist es **OBLIGATORIO** antes de implementar cualquier componente UBITS. Está diseñado para evitar errores comunes que se han documentado pero que siguen ocurriendo.

---

## 🎯 Propósito

El checklist asegura que:
1. ✅ Se consulten todas las fuentes necesarias (Storybook, MCPs, documentación)
2. ✅ Se verifiquen todos los errores comunes documentados
3. ✅ Se implemente el componente exactamente como viene en Storybook
4. ✅ NO se agreguen estilos extra automáticamente
5. ✅ NO se agregue margin-top al contenedor de componentes

---

## 📖 Cómo Usar el Checklist

### **Paso 1: Leer el Checklist Completo**

Antes de implementar cualquier componente, leer:
```
docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md
```

### **Paso 2: Completar Cada Fase**

El checklist está dividido en 4 fases:

1. **FASE 1: PREPARACIÓN Y CONSULTA** - Consultar documentación y Storybook
2. **FASE 2: VERIFICACIÓN DE ERRORES COMUNES** - Verificar errores documentados
3. **FASE 3: IMPLEMENTACIÓN** - Implementar el componente
4. **FASE 4: VERIFICACIÓN POST-IMPLEMENTACIÓN** - Verificar que todo esté correcto

### **Paso 3: Marcar Items Completados**

Mientras completas cada fase, verificar mentalmente que cada item esté completo antes de continuar.

### **Paso 4: Verificar Antes de Implementar**

Antes de escribir código, verificar que:
- ✅ Todas las fases 1 y 2 estén completas
- ✅ Se haya consultado Storybook
- ✅ Se hayan verificado los errores comunes
- ✅ Se sepa exactamente cómo viene el componente por defecto

---

## 🚨 Errores Más Comunes a Evitar

### **Error #55: Agregar margin-top al Contenedor**
- ❌ NO agregar `margin-top` inline: `<div style="margin-top: 16px;"></div>`
- ❌ NO agregar `margin-top` en CSS: `#container { margin-top: 16px; }`
- ✅ Usar `gap` del contenedor padre: `.main-content { gap: 16px; }`

### **Error #53: Agregar Estilos Extra Automáticamente**
- ❌ NO agregar padding, margin, background automáticamente
- ✅ Solo agregar si el usuario dice EXPLÍCITAMENTE "agregar [estilo]"

### **Error #1: Formato de Iconos**
- ❌ NO usar prefijos: `icon: 'far fa-home'`
- ✅ Solo nombre: `icon: 'home'`

---

## 📚 Referencias

- **Checklist completo:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
- **Errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- **No agregar estilos extra:** `docs/guias/implementacion/GUIA-NO-AGREGAR-ESTILOS-EXTRA-COMPONENTES.md`

---

**Última actualización:** 2025-01-09

