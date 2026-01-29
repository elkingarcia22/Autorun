# ✅ Implementación: Búsqueda de Historia "code"

**Fecha:** 2025-01-23  
**Estado:** ✅ Implementado

---

## 📋 Resumen

Se implementó la búsqueda de historia "code" en Storybook, priorizándola sobre "implementation" según la sugerencia del usuario.

---

## 🔧 Cambios Implementados

### **1. Nueva Función: `findCodeStory()`**

**Archivo:** `packages/autorun-core/src/helpers/codePropsCombiner.ts`

**Función:**
```typescript
export async function findCodeStory(componentId: string): Promise<string | null> {
  // Buscar historia "code" en el componente
  // Retorna el nombre de la historia si existe, null si no
}
```

**Características:**
- ✅ Busca historia con nombre "code" o ID que contenga "code"
- ✅ Prioriza sobre "implementation"
- ✅ Retorna `null` si no existe (permite fallback)

### **2. Modificado: `findImplementationStory()`**

**Cambio:**
- ✅ Ahora busca "code" primero antes de buscar "implementation"
- ✅ Si "code" existe, la retorna
- ✅ Si no, busca "implementation" como antes

**Flujo:**
```typescript
1. Buscar historia "code"
2. Si existe → retornar "code"
3. Si no existe → buscar "implementation"
4. Si existe → retornar "implementation"
5. Si no existe → retornar "default"
```

### **3. Modificado: `extractExactCodeFromStorybookWithBrowser()`**

**Cambio:**
- ✅ Prioriza historia "code" sobre "implementation"
- ✅ Busca "code" primero cuando `storyName === 'default'`
- ✅ Fallback a "implementation" si "code" no existe

---

## 🔄 Flujo Completo

### **Escenario 1: Historia "code" Existe**

```
1. extractExactCodeFromStorybookWithBrowser(componentId, 'default')
2. findCodeStory(componentId) → ✅ Encontrada: "code"
3. Usar historia "code" para extracción
4. Código visible directamente (sin botones)
5. Extracción exitosa con fetch()
```

### **Escenario 2: Historia "code" No Existe**

```
1. extractExactCodeFromStorybookWithBrowser(componentId, 'default')
2. findCodeStory(componentId) → ❌ No encontrada
3. findImplementationStory(componentId) → ✅ Encontrada: "implementation"
4. Usar historia "implementation" para extracción
5. Código puede requerir Browser MCP
```

### **Escenario 3: Ninguna Historia Especial Existe**

```
1. extractExactCodeFromStorybookWithBrowser(componentId, 'default')
2. findCodeStory(componentId) → ❌ No encontrada
3. findImplementationStory(componentId) → ❌ No encontrada
4. Usar historia "default"
5. Código puede requerir Browser MCP
```

---

## ✅ Ventajas

1. **Priorización Inteligente:** Busca "code" primero (más fácil de extraer)
2. **Fallback Automático:** Si "code" no existe, usa "implementation"
3. **Compatibilidad:** Funciona con componentes que no tienen "code"
4. **Extensible:** Fácil agregar más historias prioritarias en el futuro

---

## 📋 Próximos Pasos

1. ⏳ **Crear historia "code" en RadioButton** - Como prueba
2. ⏳ **Probar extracción con historia "code"** - Verificar que funciona
3. ⏳ **Extender a otros componentes** - Si funciona bien
4. ⏳ **Documentar en Storybook** - Guía para crear historias "code"

---

## 🔧 Crear Historia "code" en Storybook

Para crear la historia "code" en un componente:

```typescript
// En el archivo .stories.ts del componente
export const Code = {
  name: 'Code',
  parameters: {
    docs: {
      description: {
        component: 'Código completo de implementación'
      }
    }
  },
  render: () => {
    return html`
      <div style="padding: 20px;">
        <h2>Código de Implementación</h2>
        <pre><code>
window.UBITS.RadioButton.create({
  containerId: 'radio-container',
  label: 'Opción 1',
  value: 'option1',
  name: 'tipo',
  checked: false,
  size: 'md',
  state: 'default',
  disabled: false
});
        </code></pre>
      </div>
    `;
  }
};
```

---

## 📊 Estado

- ✅ Función `findCodeStory()` implementada
- ✅ `findImplementationStory()` modificado para buscar "code" primero
- ✅ `extractExactCodeFromStorybookWithBrowser()` prioriza "code"
- ⏳ Pendiente: Crear historia "code" en RadioButton como prueba
- ⏳ Pendiente: Probar extracción con historia "code"

