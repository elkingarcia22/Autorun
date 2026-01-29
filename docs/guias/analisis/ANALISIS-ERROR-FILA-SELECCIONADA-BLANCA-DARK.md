# 🔍 Análisis: Error - Fila Seleccionada se Ve Blanca en Modo Dark

## ❌ PROBLEMA IDENTIFICADO

**Cuando se activa un checkbox en una fila del DataTable en modo dark, la fila se pone en un estado "blanco" (como si fuera modo light) y luego desaparece.**

**Síntomas:**
- Al activar un checkbox, la fila se ve blanca momentáneamente
- El color no coincide con el tema dark
- La fila parece estar en modo light aunque el tema sea dark
- El efecto desaparece después de un momento

## 🎯 Comportamiento Esperado

**La fila seleccionada debe mantener el color correcto según el tema:**
- **Modo light:** Usar `--modifiers-normal-color-light-bg-1`
- **Modo dark:** Usar `--modifiers-normal-color-dark-bg-1`

**No debe haber parpadeo o cambio de color incorrecto al seleccionar una fila.**

## 🔍 Causa Raíz

### **1. Token Hardcodeado para Modo Light**

**Problema:**
- El código del DataTable usa `--modifiers-normal-color-light-bg-1` hardcodeado
- No detecta el tema actual (light o dark)
- Siempre aplica el token de modo light, incluso en modo dark

**Código original (incorrecto):**
```typescript
// ❌ INCORRECTO: Token hardcodeado para modo light
const bg1Value = getComputedStyle(document.documentElement)
  .getPropertyValue('--modifiers-normal-color-light-bg-1')
  .trim();

rowElement.style.setProperty('background-color', bg1Value, 'important');
```

**Causa:**
- No se considera el tema actual al aplicar estilos
- Se asume que siempre es modo light
- No hay detección dinámica del tema

### **2. Estilos Inline con !important**

**Problema:**
- Los estilos se aplican inline con `!important`
- Esto sobrescribe cualquier CSS que intente corregir el color
- El CSS personalizado no puede sobrescribir los estilos inline

**Causa:**
- Los estilos inline tienen mayor especificidad que CSS
- El `!important` hace que sea difícil sobrescribir
- No hay forma de corregir desde CSS externo

### **3. No Usar Tokens Dinámicos**

**Problema:**
- No se detecta el tema actual antes de aplicar estilos
- No se usa el token correcto según el tema
- Se usa siempre el mismo token sin importar el tema

**Causa:**
- Falta de lógica para detectar el tema
- No se consulta `data-theme` en `body` o `documentElement`
- No se selecciona el token apropiado dinámicamente

## ✅ Solución

### **Paso 1: Detectar Tema Actual**

**SIEMPRE detectar el tema antes de aplicar estilos:**

```typescript
// ✅ CORRECTO: Detectar tema actual
const currentTheme = document.body.getAttribute('data-theme') || 
                     document.documentElement.getAttribute('data-theme') || 
                     'light';
```

### **Paso 2: Seleccionar Token Correcto**

**SIEMPRE usar el token correcto según el tema:**

```typescript
// ✅ CORRECTO: Seleccionar token según tema
const bgTokenName = currentTheme === 'dark' 
  ? '--modifiers-normal-color-dark-bg-1'
  : '--modifiers-normal-color-light-bg-1';

const bg1Value = getComputedStyle(document.documentElement)
  .getPropertyValue(bgTokenName)
  .trim();
```

### **Paso 3: Aplicar Estilos con Token Correcto**

**SIEMPRE aplicar estilos usando el token correcto:**

```typescript
// ✅ CORRECTO: Aplicar con token correcto
rowElement.style.setProperty('background-color', bg1Value, 'important');

cells.forEach((cell) => {
  (cell as HTMLElement).style.setProperty(
    'background-color',
    bg1Value,
    'important',
  );
});
```

### **Paso 4: CSS de Respaldo (Opcional pero Recomendado)**

**Agregar CSS de respaldo para modo dark:**

```css
/* ✅ CORRECTO: CSS de respaldo para modo dark */
body[data-theme="dark"] #encuestas-table-container .ubits-data-table__row--clear-hover,
html[data-theme="dark"] #encuestas-table-container .ubits-data-table__row--clear-hover {
  background-color: var(--modifiers-normal-color-dark-bg-1) !important;
}

body[data-theme="dark"] #encuestas-table-container .ubits-data-table__row--clear-hover .ubits-data-table__cell,
html[data-theme="dark"] #encuestas-table-container .ubits-data-table__row--clear-hover .ubits-data-table__cell {
  background-color: var(--modifiers-normal-color-dark-bg-1) !important;
}
```

## 🔑 Puntos Clave

1. **Detectar tema dinámicamente**: Siempre detectar el tema actual antes de aplicar estilos
2. **Usar tokens correctos**: Usar `--modifiers-normal-color-dark-bg-1` en dark y `--modifiers-normal-color-light-bg-1` en light
3. **No hardcodear tokens**: No usar tokens de un solo tema sin verificar el tema actual
4. **CSS de respaldo**: Agregar CSS de respaldo para casos edge donde los estilos inline no se apliquen correctamente

## 📝 Regla de Oro

**SIEMPRE que apliques estilos que dependen del tema:**

1. ✅ **Detectar tema actual:**
   ```typescript
   const currentTheme = document.body.getAttribute('data-theme') || 
                        document.documentElement.getAttribute('data-theme') || 
                        'light';
   ```

2. ✅ **Seleccionar token correcto:**
   ```typescript
   const tokenName = currentTheme === 'dark' 
     ? '--modifiers-normal-color-dark-*'
     : '--modifiers-normal-color-light-*';
   ```

3. ✅ **Obtener valor del token:**
   ```typescript
   const tokenValue = getComputedStyle(document.documentElement)
     .getPropertyValue(tokenName)
     .trim();
   ```

4. ✅ **Aplicar estilos:**
   ```typescript
   element.style.setProperty('property', tokenValue, 'important');
   ```

5. ✅ **Agregar CSS de respaldo (opcional):**
   ```css
   body[data-theme="dark"] .selector {
     property: var(--modifiers-normal-color-dark-*) !important;
   }
   ```

## 🔗 Referencias

- **Código del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (líneas 3730-3755)
- **Guía de análisis de DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
- **Theme Manager:** `vendor/ubits/packages/templates/config/theme-manager.js`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0












