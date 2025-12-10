# 📊 Guía: Generar Items para DataTable

Esta guía explica el proceso **OBLIGATORIO** para generar items/filas para DataTable con variedad y cantidad apropiada.

---

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"Cantidad y variedad realistas"** - Generar suficientes items para reflejar la imagen (mínimo 10-15 si hay scroll) y con variedad en los datos para que se vea realista.

---

## 📋 PROCESO COMPLETO (OBLIGATORIO)

### **PASO 1: CONTAR ITEMS EN LA IMAGEN** ⚠️ CRÍTICO

**ANTES de generar items, SIEMPRE contar cuántos items/filas hay en la imagen:**

1. **Contar filas visibles:**
   - ¿Cuántas filas se ven completamente en la imagen?
   - ¿Hay scroll o paginación visible?
   - ¿La tabla llega hasta abajo de la imagen?

2. **Verificar contador en header:**
   - ¿Hay un contador en el header? (ej: "206 encuestas")
   - Si existe, usar ese número como referencia para la cantidad total

3. **Estimar cantidad total:**
   - Si hay scroll, estimar cuántos items hay en total
   - Si no hay scroll, contar las filas visibles exactamente

4. **Documentar en el análisis:**
   ```markdown
   ## 📊 Análisis de Cantidad de Items
   
   ### Items/Filas identificados:
   - **Filas visibles en imagen:** 12 filas
   - **Scroll visible:** Sí (la tabla continúa más abajo)
   - **Contador en header:** "206 encuestas"
   - **Cantidad total estimada:** 206 items
   - **Items a crear en implementación:** Mínimo 15-20 items para mostrar scroll correctamente
   ```

**⚠️ REGLA CRÍTICA:** NO crear solo 2-3 items de ejemplo. Crear una cantidad razonable que refleje la imagen (mínimo 10-15 items si hay scroll, o la cantidad exacta si se ve completa).

---

### **PASO 2: IDENTIFICAR VARIEDAD DE DATOS** 🔍

**Analizar qué tipos de datos hay en cada columna para generar variedad:**

1. **Columnas de texto:**
   - ¿Qué valores posibles hay? (ej: tipos de encuesta: "Cultura", "Satisfacción", "Clima")
   - ¿Hay patrones? (ej: nombres con años, fases, etc.)

2. **Columnas de estado:**
   - ¿Qué estados posibles hay? (ej: "en-progreso", "completada", "pausada", "programada")
   - ¿Hay distribución específica? (ej: más en-progreso que completadas)

3. **Columnas de fecha:**
   - ¿Qué rango de fechas? (ej: diferentes meses, años)
   - ¿Hay patrones? (ej: fechas de inicio y cierre relacionadas)

4. **Columnas numéricas:**
   - ¿Qué rango de valores? (ej: participantes entre 50 y 350)
   - ¿Hay distribución específica? (ej: más valores en el medio)

5. **Columnas de progreso:**
   - ¿Qué rango de valores? (ej: 0-100%)
   - ¿Hay distribución específica? (ej: más valores entre 30-70%)

**Ejemplo de análisis:**
```markdown
### Variedad de datos identificada:
- **Tipo:** Cultura, Satisfacción, Clima, Desempeño, Innovación (5 tipos)
- **Estado:** en-progreso, completada, pausada, programada (4 estados)
- **Fechas:** Diferentes meses del año, años 2025-2026
- **Participantes:** Entre 50 y 350 (variedad aleatoria)
- **Avance:** Entre 0 y 100% (variedad aleatoria)
```

---

### **PASO 3: GENERAR ITEMS CON VARIEDAD** 🛠️

**Usar una función generadora para crear items con variedad:**

#### **Patrón Básico:**

```javascript
rows: (() => {
  // Definir arrays de valores posibles
  const tipos = ['Cultura', 'Satisfacción', 'Clima', 'Desempeño', 'Innovación'];
  const estados = ['en-progreso', 'completada', 'pausada', 'programada'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  // Determinar cantidad según análisis
  const cantidadItems = 20; // Mínimo para mostrar scroll si hay scroll en la imagen
  
  // Generar items
  const items = [];
  for (let i = 1; i <= cantidadItems; i++) {
    items.push({
      id: `encuesta-${i}`,
      data: {
        nombre: `${tipos[i % tipos.length]} ${2025 + (i % 2)}${i > 10 ? ' - ' + (i > 15 ? 'Segunda' : 'Primera') + ' fase' : ''}`,
        tipo: tipos[i % tipos.length],
        estado: estados[i % estados.length],
        inicio: `${(i % 28) + 1} - ${meses[(i - 1) % meses.length]} - ${2025 + (i % 2)}`,
        cierre: `${((i + 5) % 28) + 1} - ${meses[i % meses.length]} - ${2025 + (i % 2)}`,
        participantes: String(Math.floor(Math.random() * 300) + 50),
        avance: Math.floor(Math.random() * 100)
      }
    });
  }
  
  return items;
})()
```

#### **Patrón con Distribución Específica:**

```javascript
rows: (() => {
  const tipos = ['Cultura', 'Satisfacción', 'Clima', 'Desempeño', 'Innovación'];
  const estados = ['en-progreso', 'completada', 'pausada', 'programada'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  const cantidadItems = 20;
  const items = [];
  
  for (let i = 1; i <= cantidadItems; i++) {
    // Distribución específica: más en-progreso que otros estados
    let estado;
    if (i % 3 === 0) {
      estado = 'en-progreso'; // 33% en-progreso
    } else if (i % 5 === 0) {
      estado = 'completada'; // 20% completada
    } else if (i % 7 === 0) {
      estado = 'pausada'; // 14% pausada
    } else {
      estado = 'programada'; // 33% programada
    }
    
    items.push({
      id: `encuesta-${i}`,
      data: {
        nombre: `${tipos[i % tipos.length]} ${2025 + (i % 2)}`,
        tipo: tipos[i % tipos.length],
        estado: estado,
        inicio: `${(i % 28) + 1} - ${meses[(i - 1) % meses.length]} - ${2025 + (i % 2)}`,
        cierre: `${((i + 5) % 28) + 1} - ${meses[i % meses.length]} - ${2025 + (i % 2)}`,
        participantes: String(Math.floor(Math.random() * 300) + 50),
        avance: Math.floor(Math.random() * 100)
      }
    });
  }
  
  return items;
})()
```

#### **Patrón con Datos Más Realistas:**

```javascript
rows: (() => {
  const tipos = ['Cultura', 'Satisfacción', 'Clima', 'Desempeño', 'Innovación'];
  const estados = ['en-progreso', 'completada', 'pausada', 'programada'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  const cantidadItems = 20;
  const items = [];
  
  for (let i = 1; i <= cantidadItems; i++) {
    const tipo = tipos[i % tipos.length];
    const año = 2025 + (i % 2);
    const mesIndex = (i - 1) % meses.length;
    const mesInicio = meses[mesIndex];
    const mesCierre = meses[(mesIndex + 1) % meses.length];
    const diaInicio = (i % 28) + 1;
    const diaCierre = ((i + 5) % 28) + 1;
    
    // Avance relacionado con el estado
    let estado, avance;
    if (i % 3 === 0) {
      estado = 'en-progreso';
      avance = Math.floor(Math.random() * 70) + 10; // 10-80%
    } else if (i % 5 === 0) {
      estado = 'completada';
      avance = 100; // Siempre 100% si está completada
    } else if (i % 7 === 0) {
      estado = 'pausada';
      avance = Math.floor(Math.random() * 50) + 20; // 20-70%
    } else {
      estado = 'programada';
      avance = 0; // Siempre 0% si está programada
    }
    
    items.push({
      id: `encuesta-${i}`,
      data: {
        nombre: `${tipo} ${año}${i > 10 ? ' - ' + (i > 15 ? 'Segunda' : 'Primera') + ' fase' : ''}`,
        tipo: tipo,
        estado: estado,
        inicio: `${diaInicio} - ${mesInicio} - ${año}`,
        cierre: `${diaCierre} - ${mesCierre} - ${año}`,
        participantes: String(Math.floor(Math.random() * 300) + 50),
        avance: avance
      }
    });
  }
  
  return items;
})()
```

---

## ✅ CHECKLIST OBLIGATORIO

Al generar items para DataTable:

- [ ] **Contar filas visibles en la imagen**
  - ¿Cuántas filas se ven completamente?
  - ¿Hay scroll o paginación visible?

- [ ] **Verificar contador en header**
  - ¿Hay un contador? (ej: "206 encuestas")
  - Si existe, usar ese número como referencia

- [ ] **Estimar cantidad total**
  - Si hay scroll, estimar cuántos items hay en total
  - Si no hay scroll, contar las filas visibles exactamente

- [ ] **Documentar en el análisis**
  - Filas visibles: [X] filas
  - Scroll: Sí / No
  - Contador: "[texto]" (si existe)
  - Items a crear: [X] items

- [ ] **Identificar variedad de datos**
  - ¿Qué valores posibles hay en cada columna?
  - ¿Hay patrones o distribuciones específicas?

- [ ] **Generar items con variedad**
  - Usar arrays de valores posibles
  - Usar operador módulo (`%`) para distribuir valores
  - Agregar variación aleatoria donde sea apropiado
  - Relacionar valores cuando tenga sentido (ej: avance con estado)

- [ ] **Verificar cantidad generada**
  - Mínimo 10-15 items si hay scroll
  - Cantidad exacta si se ve completa
  - NO crear solo 2-3 items de ejemplo

---

## 🚨 ERRORES COMUNES A EVITAR

### **Error 1: Solo 2-3 Items de Ejemplo**

❌ **INCORRECTO:**
```javascript
rows: [
  { id: '1', data: { nombre: 'Encuesta 1', ... } },
  { id: '2', data: { nombre: 'Encuesta 2', ... } },
  { id: '3', data: { nombre: 'Encuesta 3', ... } }
]
```

✅ **CORRECTO:**
```javascript
rows: (() => {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    items.push({
      id: `encuesta-${i}`,
      data: { nombre: `Encuesta ${i}`, ... }
    });
  }
  return items;
})()
```

### **Error 2: Sin Variedad en los Datos**

❌ **INCORRECTO:**
```javascript
// Todos los items tienen los mismos valores
rows: Array(20).fill(null).map((_, i) => ({
  id: `encuesta-${i + 1}`,
  data: {
    nombre: 'Cultura 2025',
    tipo: 'Cultura',
    estado: 'en-progreso',
    // ... todos iguales
  }
}))
```

✅ **CORRECTO:**
```javascript
// Items con variedad
const tipos = ['Cultura', 'Satisfacción', 'Clima', 'Desempeño', 'Innovación'];
const estados = ['en-progreso', 'completada', 'pausada', 'programada'];

rows: (() => {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    items.push({
      id: `encuesta-${i}`,
      data: {
        nombre: `${tipos[i % tipos.length]} ${2025 + (i % 2)}`,
        tipo: tipos[i % tipos.length],
        estado: estados[i % estados.length],
        // ... valores variados
      }
    });
  }
  return items;
})()
```

### **Error 3: No Relacionar Valores Lógicos**

❌ **INCORRECTO:**
```javascript
// Estado "completada" pero avance 50% (no tiene sentido)
{
  estado: 'completada',
  avance: 50
}
```

✅ **CORRECTO:**
```javascript
// Estado "completada" siempre tiene avance 100%
let estado, avance;
if (estado === 'completada') {
  avance = 100;
} else if (estado === 'programada') {
  avance = 0;
} else {
  avance = Math.floor(Math.random() * 70) + 10;
}
```

---

## 📚 EJEMPLOS POR TIPO DE COLUMNA

### **Columnas de Texto:**

```javascript
// Variedad con arrays
const tipos = ['Cultura', 'Satisfacción', 'Clima', 'Desempeño', 'Innovación'];
const nombres = tipos.map(tipo => `${tipo} ${2025 + Math.floor(Math.random() * 2)}`);

// Usar operador módulo para distribuir
tipo: tipos[i % tipos.length]
```

### **Columnas de Estado:**

```javascript
// Variedad con arrays
const estados = ['en-progreso', 'completada', 'pausada', 'programada'];

// Distribución específica
let estado;
if (i % 3 === 0) {
  estado = 'en-progreso'; // 33%
} else if (i % 5 === 0) {
  estado = 'completada'; // 20%
} else {
  estado = estados[i % estados.length];
}
```

### **Columnas de Fecha:**

```javascript
// Variedad con meses y días
const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
               'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const año = 2025 + (i % 2);
const mesIndex = (i - 1) % meses.length;
const mes = meses[mesIndex];
const dia = (i % 28) + 1;

inicio: `${dia} - ${mes} - ${año}`
```

### **Columnas Numéricas:**

```javascript
// Variedad con rango aleatorio
participantes: String(Math.floor(Math.random() * 300) + 50) // 50-350

// Variedad con distribución específica
participantes: String(Math.floor(Math.random() * 200) + 100) // 100-300
```

### **Columnas de Progreso:**

```javascript
// Variedad con rango aleatorio
avance: Math.floor(Math.random() * 100) // 0-100%

// Relacionado con estado
let avance;
if (estado === 'completada') {
  avance = 100;
} else if (estado === 'programada') {
  avance = 0;
} else {
  avance = Math.floor(Math.random() * 70) + 10; // 10-80%
}
```

---

## 🔗 Referencias

- **Guía de análisis DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Error crítico:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #15

---

## 💡 Resumen

1. **Contar** items en la imagen (filas visibles, scroll, contador)
2. **Identificar** variedad de datos (valores posibles, patrones, distribuciones)
3. **Generar** items con variedad usando arrays y operador módulo
4. **Relacionar** valores cuando tenga sentido (ej: avance con estado)
5. **Verificar** cantidad generada (mínimo 10-15 si hay scroll)

---

**Última actualización:** Diciembre 2024









