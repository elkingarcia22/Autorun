# 📦 Instalación - Template Básico UBITS

Guía paso a paso para configurar el template básico.

---

## 🎯 Requisitos Previos

- Acceso a los archivos de componentes UBITS en `vendor/ubits/`
- Servidor web local (opcional, para probar)

---

## 📋 Pasos de Instalación

### **1. Copiar Tokens CSS**

```bash
# Desde la raíz del proyecto
cp vendor/ubits/packages/tokens/dist/tokens.css templates/basico/css/tokens.css
```

**O manualmente:**
- Buscar `vendor/ubits/packages/tokens/dist/tokens.css`
- Copiar a `templates/basico/css/tokens.css`

---

### **2. Copiar CSS de Componentes**

Para cada componente que quieras usar:

```bash
# Ejemplo: RadioButton
cp vendor/ubits/packages/components/radio-button/src/styles/radio-button.css templates/basico/css/components/

# Ejemplo: Button
cp vendor/ubits/packages/components/button/src/styles/button.css templates/basico/css/components/
```

**O manualmente:**
- Buscar el CSS del componente en `vendor/ubits/packages/components/[nombre]/src/styles/`
- Copiar a `templates/basico/css/components/`

---

### **3. Copiar JS de Componentes**

Para cada componente que quieras usar:

```bash
# Ejemplo: RadioButton (TypeScript - necesita compilar primero)
# Opción 1: Compilar TypeScript
cd vendor/ubits/packages/components/radio-button
npm run build
cp dist/RadioButtonProvider.js ../../../../templates/basico/js/components/radio-button.js

# Opción 2: Usar directamente el TypeScript (si el navegador soporta)
cp src/RadioButtonProvider.ts templates/basico/js/components/radio-button.ts
```

**O manualmente:**
- Buscar el Provider del componente en `vendor/ubits/packages/components/[nombre]/src/[Nombre]Provider.ts`
- Compilar o copiar directamente
- Copiar a `templates/basico/js/components/`

---

### **4. Configurar HTML**

Editar `templates/basico/index.html` o crear tu propio HTML:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Template</title>
  
  <!-- CSS -->
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/components/radio-button.css">
</head>
<body>
  <div class="content-area">
    <div id="radiobutton-group"></div>
  </div>

  <!-- JS -->
  <script src="js/components/radio-button.js"></script>
  <script>
    // Inicialización
    window.UBITS.RadioButton.create({
      containerId: 'radiobutton-group',
      label: 'Opción 1',
      value: 'opcion1',
      name: 'grupo',
      checked: true
    });
  </script>
</body>
</html>
```

---

## ✅ Verificación

1. **Abrir el HTML en el navegador**
2. **Verificar que el CSS se carga** (inspeccionar elementos)
3. **Verificar que el JS se carga** (consola del navegador)
4. **Verificar que el componente funciona** (interactuar con él)

---

## 🔧 Troubleshooting

### **CSS no se carga**
- Verificar que el archivo existe en `css/components/`
- Verificar la ruta en el `<link>` del HTML
- Verificar permisos del archivo

### **JS no se carga**
- Verificar que el archivo existe en `js/components/`
- Verificar la ruta en el `<script>` del HTML
- Verificar errores en la consola del navegador
- Verificar que `window.UBITS` está disponible después de cargar el script

### **Componente no funciona**
- Verificar que el componente está registrado en `window.UBITS`
- Verificar que el contenedor existe en el DOM
- Verificar errores en la consola del navegador
- Verificar que las props son correctas

---

## 📚 Ejemplos

Ver ejemplos completos en `templates/basico/examples/`:
- `radio-button.html` - Ejemplo completo de RadioButton

---

## 🎯 Próximos Pasos

1. Copiar componentes necesarios
2. Configurar HTML según necesidad
3. Probar en navegador
4. Integrar con backend

---

**Última actualización:** 2025-01-23

