# 🤖 Wizard Automático - Autorun

## ✅ Cambios Implementados

El wizard ahora es **completamente automático** y habla en **primera persona**.

### Características

1. **Sin input manual**: No pide nada al usuario, todo es automático
2. **Primera persona**: Todos los mensajes usan "Estoy", "Voy a", "He detectado"
3. **Valores por defecto**: Usa valores inteligentes por defecto si no se especifican
4. **Flujo fluido**: No hay interrupciones, todo fluye automáticamente

### Valores por Defecto

Si no configuras variables de entorno, el wizard usa:

- **Tipo de proyecto**: `ubits` (por defecto)
- **Template**: `administrador` (por defecto)
- **Módulo**: `desempeno` (por defecto)
- **Producto**: Primer producto del módulo (por defecto)

### Uso

```bash
# Ejecutar directamente - Todo automático
npm run init

# El wizard:
# 1. Detecta que quieres UBITS (por defecto)
# 2. Usa template administrador (por defecto)
# 3. Usa módulo desempeño (por defecto)
# 4. Usa primer producto del módulo (por defecto)
# 5. Configura todo automáticamente
# 6. Crea el lienzo
# ✅ Todo sin preguntar nada
```

### Personalización (Opcional)

Si quieres personalizar, usa variables de entorno:

```bash
export AUTORUN_PROJECT_TYPE=ubits
export AUTORUN_TEMPLATE=colaborador
export AUTORUN_MODULE=aprendizaje
export AUTORUN_PRODUCT=catalogo

npm run init
```

### Ejemplo de Salida

```
🚀 ¡Hola! Soy tu asistente de Autorun.

Voy a configurar tu proyecto automáticamente.

✅ He detectado que quieres trabajar en UBITS. Perfecto, voy a configurarlo ahora.

🎯 Perfecto, voy a configurar tu proyecto UBITS ahora.

📦 Paso 1: Estoy cargando el preset UBITS con add-ons optimizados...
   ✅ 18 add-ons activados
   ✅ Preset cargado correctamente

🔗 Paso 2: Estoy conectando con Storybook UBITS...
   ✅ Storybook configurado: https://...
   ✅ Conectado a Storybook

🧩 Paso 3: Estoy cargando componentes desde Storybook...
   ✅ 5 componentes cargados
   ✅ Componentes cargados

📋 Paso 4: Estoy seleccionando el template...
   ✅ Usaré el template: administrador (por defecto)
   ✅ Template: administrador

📦 Paso 5: Estoy seleccionando el módulo y producto...
   ✅ Usaré el módulo: desempeño (por defecto)
   ✅ Usaré el producto: objetivos (por defecto)
   ✅ Módulo: desempeño, Producto: objetivos

⚙️  Paso 6: Estoy configurando sidebar y subnav para "desempeño"...
   ✅ Sidebar y subnav configurados

🎨 Paso 7: Estoy creando tu lienzo de trabajo...
   ✅ Lienzo creado: prototypes/canvas-administrador-desempeno-objetivos.html

🔍 Paso 8: Estoy validando que todo cumpla con los estándares UBITS...
   ✅ Validación completada

🎉 ¡Excelente! Tu proyecto UBITS está listo.

📋 Resumen de tu configuración:
   📁 Lienzo: prototypes/canvas-administrador-desempeno-objetivos.html
   🎯 Template: administrador
   📦 Módulo: desempeño
   🎨 Producto: objetivos

🚀 Ya puedes empezar a trabajar. ¡Éxito con tu proyecto!
```

---

**Resultado**: El wizard es completamente automático, fluido y no requiere ningún input del usuario.

