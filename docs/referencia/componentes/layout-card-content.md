# 📦 Card Content

> **Componente UBITS:** `layout-card-content`  
> **Categoría:** Layout  
> **API:** `window.createCard()` o `<ubits-card-content>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-card-content--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-card-content--default

## 🎯 Descripción

Componente Card Content UBITS para mostrar contenido de aprendizaje. Soporta 11 tipos de contenido, 35 competencias oficiales, 18 proveedores, 3 niveles, 3 idiomas, y 3 estados (default, progress, completed).

**Características principales:**
- 11 tipos de contenido diferentes
- 35 competencias oficiales UBITS
- 18 proveedores/aliados
- 3 niveles: Básico, Intermedio, Avanzado
- 3 idiomas: Español, Inglés, Portugués
- 3 estados: default, progress, completed
- Barra de progreso (0-100%)
- Imagen del contenido
- Logo del proveedor
- Duración del contenido

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-card-content--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-card-content--default
- **Código fuente:** `vendor/ubits/packages/components/card/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/card/src/types/CardContentOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/CardContent.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-card-content--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-card-content--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-card-content--default

**Descripción:**
Card Content con todos los controles disponibles. Permite configurar tipo, título, proveedor, duración, nivel, estado, progreso, competencia e idioma.

**Características mostradas:**
- Tipo de contenido configurable
- Título configurable
- Proveedor configurable (18 opciones)
- Duración configurable
- Nivel configurable (Básico, Intermedio, Avanzado)
- Estado configurable (default, progress, completed)
- Progreso configurable (0-100%)
- Competencia configurable (35 opciones)
- Idioma configurable (Español, Inglés, Portugués)
- Imagen configurable

**Código de ejemplo:**
```javascript
window.createCard({
  type: 'Curso',
  title: 'Segmenta la experiencia del cliente',
  provider: 'UBITS',
  duration: '60 min',
  level: 'Básico',
  progress: 0,
  status: 'default',
  competency: 'Product design',
  language: 'Español',
  image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg'
});
```

**Opciones utilizadas en la historia Default:**
- `type`: `'Curso'` - Tipo de contenido
- `title`: `'Segmenta la experiencia del cliente'` - Título
- `provider`: `'UBITS'` - Proveedor
- `duration`: `'60 min'` - Duración
- `level`: `'Básico'` - Nivel
- `status`: `'default'` - Estado
- `progress`: `0` - Progreso
- `competency`: `'Product design'` - Competencia
- `language`: `'Español'` - Idioma

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `type` | `string` | `'Curso'` | Tipo de contenido. Opciones: 11 tipos disponibles (ver sección Tipos de Contenido) |
| `title` | `string` | - | Título del contenido |
| `provider` | `string` | `'UBITS'` | Proveedor/Aliado del contenido. Opciones: 18 proveedores disponibles |
| `providerLogo` | `string` | - | Ruta al logo del proveedor (se deriva automáticamente del provider si no se proporciona) |
| `duration` | `string` | `'60 min'` | Duración del contenido. Opciones: `15 min`, `30 min`, `45 min`, `60 min`, `75 min`, `90 min`, `120 min`, `180 min`, `240 min` |
| `level` | `string` | `'Básico'` | Nivel del contenido. Opciones: `Básico`, `Intermedio`, `Avanzado` |
| `status` | `string` | `'default'` | Estado de la card. Opciones: `default`, `progress`, `completed` |
| `progress` | `number` | `0` | Progreso del contenido (0-100). Solo visible si `status: 'progress'` |
| `image` | `string` | - | Ruta a la imagen del contenido |
| `competency` | `string` | - | Competencia oficial UBITS. Opciones: 35 competencias disponibles |
| `language` | `string` | `'Español'` | Idioma del contenido. Opciones: `Español`, `Inglés`, `Portugués` |

---

## 📊 Tipos de Contenido Disponibles

El componente soporta 11 tipos de contenido diferentes. Consulta `CONTENT_TYPES` en el código fuente para ver la lista completa.

**Ejemplos comunes:**
- Curso
- Video
- Artículo
- Podcast
- Webinar
- (y 6 más)

---

## 🏢 Proveedores Disponibles

El componente soporta 18 proveedores/aliados. Consulta `PROVIDERS` en el código fuente para ver la lista completa.

**Ejemplos comunes:**
- UBITS
- LinkedIn Learning
- Coursera
- (y 15 más)

---

## 🎯 Competencias Disponibles

El componente soporta 35 competencias oficiales UBITS. Consulta `COMPETENCIES` en el código fuente para ver la lista completa.

**Ejemplos comunes:**
- Product design
- Marketing
- Desarrollo
- (y 32 más)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Card Básica

```javascript
window.createCard({
  type: 'Curso',
  title: 'Introducción a React',
  provider: 'UBITS',
  duration: '60 min',
  level: 'Básico',
  status: 'default',
  competency: 'Desarrollo',
  language: 'Español',
  image: '/images/cards-learn/react-intro.jpg'
});
```

### Ejemplo 2: Card con Progreso

```javascript
window.createCard({
  type: 'Curso',
  title: 'Avanzado en JavaScript',
  provider: 'UBITS',
  duration: '120 min',
  level: 'Avanzado',
  status: 'progress',
  progress: 65, // 65% completado
  competency: 'Desarrollo',
  language: 'Español',
  image: '/images/cards-learn/js-advanced.jpg'
});
```

### Ejemplo 3: Card Completada

```javascript
window.createCard({
  type: 'Curso',
  title: 'Fundamentos de Diseño',
  provider: 'UBITS',
  duration: '90 min',
  level: 'Intermedio',
  status: 'completed',
  progress: 100, // 100% completado
  competency: 'Product design',
  language: 'Español',
  image: '/images/cards-learn/design-fundamentals.jpg'
});
```

### Ejemplo 4: Card con Proveedor Externo

```javascript
window.createCard({
  type: 'Video',
  title: 'Marketing Digital Avanzado',
  provider: 'LinkedIn Learning',
  providerLogo: '/images/providers/linkedin.svg',
  duration: '180 min',
  level: 'Avanzado',
  status: 'default',
  competency: 'Marketing',
  language: 'Inglés',
  image: '/images/cards-learn/marketing-advanced.jpg'
});
```

### Ejemplo 5: Card en Inglés

```javascript
window.createCard({
  type: 'Curso',
  title: 'Advanced React Patterns',
  provider: 'UBITS',
  duration: '240 min',
  level: 'Avanzado',
  status: 'progress',
  progress: 30,
  competency: 'Desarrollo',
  language: 'Inglés',
  image: '/images/cards-learn/react-patterns.jpg'
});
```

---

## 🎨 Estados Visuales

### Estado: Default

- Sin indicador de progreso
- Botón de acción principal (ej: "Comenzar")
- Sin badge de completado

### Estado: Progress

- Barra de progreso visible
- Porcentaje de progreso mostrado
- Botón de acción cambia a "Continuar"

### Estado: Completed

- Badge de completado visible
- Progreso al 100%
- Botón de acción cambia a "Ver certificado" o similar

---

## 🚨 Errores Comunes

### Error 1: Progreso sin Estado Progress
**Problema:** Usar `progress` sin `status: 'progress'`  
**Solución:** Siempre usar `status: 'progress'` cuando hay progreso

```javascript
// ❌ Incorrecto
progress: 50,
status: 'default'  // Progreso no se mostrará

// ✅ Correcto
progress: 50,
status: 'progress'  // Progreso se mostrará
```

### Error 2: Rutas de Imágenes Incorrectas
**Problema:** Usar rutas relativas incorrectas para imágenes  
**Solución:** Usar rutas absolutas desde la raíz del proyecto

```javascript
// ❌ Incorrecto
image: 'images/card.jpg'

// ✅ Correcto
image: '/images/cards-learn/card.jpg'
```

### Error 3: Competencia No Válida
**Problema:** Usar una competencia que no existe en la lista  
**Solución:** Verificar que la competencia esté en `COMPETENCIES`

```javascript
// ❌ Incorrecto
competency: 'Competencia Inexistente'

// ✅ Correcto - usar una de las 35 competencias oficiales
competency: 'Product design'
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local
