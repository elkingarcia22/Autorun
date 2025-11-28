# 🔍 Guía: Identificación de Componentes UBITS desde Imágenes

Esta guía explica el proceso que **DEBES seguir** cuando recibas una imagen o solicitud para crear/modificar un componente en templates UBITS.

---

## ⚠️ PROBLEMA COMÚN

**Error típico:**
- Usuario envía imagen de una tabla
- Asistente crea una tabla nueva sin verificar
- La tabla no usa componentes UBITS
- Se duplica funcionalidad

**Solución:**
- Identificar primero si es componente UBITS
- Preguntar si no estás seguro
- Usar componentes existentes siempre que sea posible

---

## 📋 PROCESO OBLIGATORIO

### **Paso 1: Analizar la Imagen/Solicitud**

Cuando recibas una imagen o solicitud de componente:

1. **Identificar el tipo de elemento:**
   - ¿Es una tabla? → Verificar `<ubits-table>`
   - ¿Es un botón? → Verificar `<ubits-button>`
   - ¿Es una tarjeta? → Verificar `<ubits-card>`
   - ¿Es un formulario? → Verificar `<ubits-input>`, `<ubits-button>`
   - ¿Es una barra lateral? → Verificar `window.createSidebar()`
   - ¿Es una barra de tabs? → Verificar `window.createSubNav()`

2. **Buscar características UBITS:**
   - Colores azules característicos (#0c5bef, #8c91fa)
   - Estilo consistente con design system
   - Estructura similar a componentes conocidos

3. **Consultar catálogo:**
   - Abrir `CATALOGO-COMPONENTES-UBITS.md`
   - Buscar componente similar
   - Leer descripción visual

---

### **Paso 2: Verificar Componentes Disponibles**

Antes de crear cualquier cosa, verifica qué componentes están disponibles:

```javascript
// En la consola del navegador (si tienes acceso)
console.log(window.UBITS); // Ver todos los componentes UBITS
console.log(window.createSidebar); // Ver funciones de navegación
console.log(window.AUTORUN.Components.getLoadedComponents()); // Ver componentes cargados
```

**Componentes comunes UBITS:**
- `window.createSidebar()` - Sidebar
- `window.createSubNav()` - SubNav
- `window.createTabBar()` - TabBar
- `window.UBITS.Button` - Botones
- `window.UBITS.Alert` - Alertas
- `window.UBITS.Card` - Tarjetas
- `window.UBITS.Input` - Inputs
- `window.UBITS.Table` - Tablas
- `window.UBITS.Modal` - Modales

---

### **Paso 3: Decisión - ¿Es Componente UBITS?**

#### **Opción A: Identificaste un Componente UBITS Existente**

✅ **Acción correcta:**
```javascript
// Usar el componente existente
const table = window.UBITS.Table.create({
  columns: ['Nombre', 'Email'],
  data: [...]
});
```

❌ **NO hacer:**
```javascript
// NO crear nuevo componente
class MyTable extends HTMLElement { ... } // ❌
```

---

#### **Opción B: NO Estás Seguro si es Componente UBITS**

✅ **Acción correcta: PREGUNTAR AL USUARIO**

**Pregunta estándar:**
```
He analizado la imagen/solicitud que enviaste. Veo que necesitas [tipo de componente: tabla/botón/tarjeta/etc].

Antes de proceder, necesito confirmar:

1. ¿Este componente que muestras es un componente UBITS existente que ya tenemos?
   - Si es así, puedo implementarlo usando el componente UBITS existente.

2. ¿O quieres que cree un nuevo componente usando los tokens y estilos de UBITS?
   - Si es así, lo crearé siguiendo los estándares UBITS.

Por favor, confirma cuál es el caso para proceder correctamente.
```

---

#### **Opción C: Claramente NO es Componente UBITS**

✅ **Acción correcta: PREGUNTAR SI QUIERE CREARLO CON TOKENS UBITS**

**Pregunta estándar:**
```
Veo que necesitas [tipo de componente]. Este no parece ser un componente UBITS estándar.

¿Quieres que lo cree usando los tokens y estilos de UBITS para mantener consistencia con el design system?

Si es así, lo implementaré usando:
- Tokens UBITS (--modifiers-normal-color-light-accent-blue, etc.)
- Estilos consistentes con el design system
- Componentes base de UBITS como referencia
```

---

## 🎯 Ejemplos de Identificación

### **Ejemplo 1: Tabla**

**Imagen recibida:**
- Tabla con filas y columnas
- Header con fondo diferente
- Filas alternadas

**Proceso:**
1. ✅ Identificar: Es una tabla
2. ✅ Consultar catálogo: `<ubits-table>` existe
3. ✅ Verificar: `window.UBITS.Table` disponible
4. ✅ Implementar: Usar componente existente

**Código correcto:**
```html
<ubits-table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Juan</td>
      <td>juan@example.com</td>
    </tr>
  </tbody>
</ubits-table>
```

---

### **Ejemplo 2: Botón Personalizado**

**Imagen recibida:**
- Botón con diseño especial
- No coincide exactamente con variantes estándar

**Proceso:**
1. ✅ Identificar: Es un botón pero con diseño especial
2. ❓ Consultar catálogo: Botones existen pero diseño es diferente
3. ❓ **PREGUNTAR AL USUARIO:**
   - "¿Este botón es un componente UBITS existente con alguna variante especial?"
   - "¿O quieres que lo cree usando los tokens de UBITS?"

---

### **Ejemplo 3: Componente Desconocido**

**Imagen recibida:**
- Componente que no reconoces
- No está en el catálogo

**Proceso:**
1. ✅ Identificar: Componente desconocido
2. ✅ Consultar catálogo: No encontrado
3. ✅ **PREGUNTAR AL USUARIO:**
   ```
   No reconozco este componente en el catálogo de UBITS.
   
   ¿Es un componente UBITS existente que no está documentado?
   ¿O quieres que lo cree usando los tokens y estilos de UBITS?
   ```

---

## 📝 Checklist de Identificación

Antes de crear o modificar cualquier componente, verifica:

- [ ] ¿He analizado la imagen/solicitud?
- [ ] ¿He consultado `CATALOGO-COMPONENTES-UBITS.md`?
- [ ] ¿He verificado componentes disponibles en `window.UBITS`?
- [ ] ¿He identificado si es un componente UBITS existente?
- [ ] ¿He preguntado al usuario si no estoy seguro?
- [ ] ¿He confirmado que debo crear uno nuevo (si aplica)?

---

## 🚨 Reglas Críticas

### **Regla 1: SIEMPRE Consultar Primero**
❌ **NUNCA** crees un componente sin consultar el catálogo primero.

### **Regla 2: SIEMPRE Preguntar si No Estás Seguro**
❌ **NUNCA** asumas. Si no estás seguro, pregunta.

### **Regla 3: SIEMPRE Usar Componentes Existentes**
❌ **NUNCA** dupliques funcionalidad. Usa componentes UBITS existentes.

### **Regla 4: SIEMPRE Usar Tokens UBITS**
✅ **SIEMPRE** usa tokens UBITS al crear componentes nuevos.

---

## 🔗 Referencias Rápidas

- **Catálogo:** `CATALOGO-COMPONENTES-UBITS.md`
- **Guía de uso:** `GUIA-USO-COMPONENTES-UBITS.md`
- **Estrategia:** `ESTRATEGIA-COMPONENTES-UBITS.md`
- **Reglas del repo:** Ver `.cursorrules` o reglas del repositorio

---

## 💡 Preguntas Frecuentes

**P: ¿Qué hago si la imagen muestra algo que no reconozco?**
R: Pregunta al usuario si es un componente UBITS o si quiere que lo cree.

**P: ¿Qué hago si el componente existe pero necesita personalización?**
R: Usa el componente existente con sus props/variantes. NO crees uno nuevo.

**P: ¿Qué hago si el usuario insiste en crear un componente nuevo?**
R: Créalo usando tokens UBITS y siguiendo los estándares del design system.

**P: ¿Cómo sé si un componente es UBITS o no?**
R: Consulta el catálogo, verifica `window.UBITS`, y si no estás seguro, pregunta.

---

## ✅ Resumen

1. **Analiza** la imagen/solicitud
2. **Consulta** el catálogo de componentes
3. **Verifica** componentes disponibles
4. **Pregunta** si no estás seguro
5. **Usa** componentes existentes siempre que sea posible
6. **Crea** con tokens UBITS si es necesario crear uno nuevo

**Recuerda: Es mejor preguntar que crear algo incorrecto.**

