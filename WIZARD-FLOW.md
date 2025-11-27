# 🔄 Flujo del Wizard UBITS

## Orden Correcto de Ejecución

### Fase 1: Preguntas Interactivas (el usuario debe responder)

1. **Paso 1: Selección de template**
   - Pregunta: ¿Qué template quieres usar?
   - Opciones: Administrador / Colaborador
   - **ESPERA respuesta del usuario**

2. **Paso 2: Selección de módulo y producto**
   - Pregunta: ¿En qué módulo quieres trabajar?
   - Muestra módulos según el template seleccionado
   - **ESPERA respuesta del usuario**
   - Si el módulo tiene productos, pregunta por producto
   - **ESPERA respuesta del usuario**

3. **Paso 3: Add-ons adicionales (opcional)**
   - Pregunta: ¿Quieres agregar add-ons adicionales?
   - **ESPERA respuesta del usuario**
   - Si dice sí, muestra add-ons disponibles
   - **ESPERA selección del usuario**

### Fase 2: Ejecución Automática (después de todas las preguntas)

4. **Paso 4: Conectar con Storybook**
   - Ejecuta automáticamente
   - No requiere input del usuario

5. **Paso 5: Cargar componentes desde Storybook**
   - Ejecuta automáticamente
   - No requiere input del usuario

6. **Paso 6: Instalar add-ons por defecto**
   - Muestra lista de add-ons
   - Ejecuta instalación automáticamente

7. **Paso 7: Configurar sidebar y subnav**
   - Ejecuta automáticamente

8. **Paso 8: Crear lienzo**
   - Ejecuta automáticamente

9. **Paso 9: Validar lienzo**
   - Ejecuta automáticamente

## ⚠️ Problema Detectado

Si ves que se ejecutan los pasos 4-5 (Storybook y Componentes) **ANTES** de preguntar por el template, significa que:

1. **Estás ejecutando código viejo** - Haz `git pull` para obtener la versión actualizada
2. **Hay caché de tsx** - Limpia con: `rm -rf node_modules/.cache .tsx-cache`
3. **El archivo no se actualizó** - Verifica que el commit `f1b77ee` esté en tu repositorio

## ✅ Solución

```bash
# 1. Asegúrate de tener la última versión
git pull origin main

# 2. Limpia caché
rm -rf node_modules/.cache .tsx-cache

# 3. Ejecuta el wizard
npm run init
```

El wizard debería:
- ✅ Preguntar por template PRIMERO
- ✅ Preguntar por módulo SEGUNDO
- ✅ Preguntar por producto (si aplica) TERCERO
- ✅ Ejecutar pasos automáticos DESPUÉS

