# 🚀 UBITS Playground Template

Sistema completo de inicialización y gestión de proyectos UBITS con validación automática, auto-commit y despliegue.

## 📋 **Inicio Rápido**

### **1. Inicializar Nuevo Proyecto**

```bash
npm run init
```

Este comando interactivo te guiará paso a paso:

1. ✅ Solicita URL del repositorio GitHub
2. ✅ Permite seleccionar perfil (Colaborador/Administrador)
3. ✅ Configura el template automáticamente
4. ✅ Inicializa Git y configura remoto
5. ✅ Instala dependencias
6. ✅ Configura auto-commit y validación

### **2. Activar Auto-Commit y Validación**

```bash
npm run watch
```

Esto activa:
- ✅ Validación automática de código UBITS
- ✅ Auto-fix de errores comunes
- ✅ Commits automáticos al detectar cambios
- ✅ Prevención de commits con errores

### **3. Iniciar Desarrollo**

```bash
npm run dev
```

Abre `packages/playground-app/template-qa.html` en tu navegador.

## 🔧 **Scripts Disponibles**

### **Inicialización**
- `npm run init` - Inicializar nuevo proyecto (interactivo)

### **Validación**
- `npm run validate` - Validar código (solo archivos en staging)
- `npm run validate:fix` - Validar y corregir automáticamente
- `npm run validate:all` - Validar todos los archivos
- `npm run validate:all:fix` - Validar y corregir todos los archivos

### **Desarrollo**
- `npm run watch` - Activar auto-commit y validación automática
- `npm run dev` - Iniciar servidor de desarrollo

### **Integración**
- `npm run integrate:addons` - Integrar add-ons (Clarity, Onboarding, Feedback)

### **Despliegue**
- `npm run deploy` - Guía interactiva para desplegar en Vercel o Render

## 📚 **Flujo Completo del Proyecto**

### **Fase 1: Inicialización**
```bash
npm run init
```
- Seleccionar repositorio
- Elegir perfil (Colaborador/Administrador)
- Template configurado automáticamente

### **Fase 2: Desarrollo**
```bash
npm run watch  # En una terminal
npm run dev    # En otra terminal
```
- Trabajas normalmente
- Sistema valida y hace commit automáticamente
- Solo necesitas corregir errores no auto-corregibles

### **Fase 3: Integración de Add-ons**
```bash
npm run integrate:addons
```
- Integra Clarity (analytics)
- Integra Onboarding (guía de usuario)
- Integra Feedback Automation (sistema de feedback)

### **Fase 4: Despliegue**
```bash
npm run deploy
```
- Selecciona plataforma (Vercel/Render)
- Configura despliegue automáticamente
- Instrucciones para completar

## 🛡️ **Sistema de Validación Automática**

### **Qué Valida**
- ✅ Colores hardcodeados → Sugiere tokens UBITS
- ✅ Clases de tipografía prohibidas → Sugiere clases oficiales
- ✅ Componentes custom → Sugiere usar componentes oficiales
- ✅ CSS faltante → Sugiere imports necesarios

### **Qué Corrige Automáticamente**
- ✅ `white` → `var(--ubits-bg-1)`
- ✅ `black` → `var(--ubits-fg-1-high)`
- ✅ `ubits-h1` → `ubits-heading-h1`
- ✅ `ubits-body-lg-bold` → `ubits-heading-h1`
- Y más...

## 📦 **Add-ons Disponibles**

### **Microsoft Clarity**
Analytics y grabaciones de sesión para análisis de usuario.

### **Onboarding**
Sistema de guía interactiva para nuevos usuarios.

### **Feedback Automation**
Sistema automatizado de recolección y gestión de feedback.

## 🚀 **Despliegue**

### **Vercel (Recomendado)**
```bash
npm run deploy
# Selecciona opción 1
vercel --prod
```

### **Render**
```bash
npm run deploy
# Selecciona opción 2
# Sigue instrucciones en render.com
```

## 📁 **Estructura del Proyecto**

```
proyecto/
├── packages/
│   ├── addons/          # Componentes como add-ons
│   ├── playground-app/  # Aplicación principal
│   └── ...
├── scripts/
│   ├── init-project.cjs     # Inicialización
│   ├── integrate-addons.cjs # Integración de add-ons
│   ├── deploy.cjs           # Despliegue
│   └── validate-ubits.cjs   # Validación
├── .ubits/
│   ├── component-inventory.json  # Inventario de componentes
│   ├── project-config.json       # Configuración del proyecto
│   └── ...
└── .husky/
    └── pre-commit      # Hook de validación automática
```

## 🔍 **Configuración del Proyecto**

Ver `.ubits/project-config.json` para:
- Perfil seleccionado
- Repositorio configurado
- Add-ons integrados
- Configuración de despliegue

## 📚 **Documentación**

- **Validación:** `.ubits/AUTO-VALIDATION.md`
- **Componentes:** `.ubits/component-inventory.json`
- **Reglas:** `.ubits/validation-rules.md`
- **Cómo Funciona:** `.ubits/COMO-FUNCIONA.md`

## 💡 **Workflow Recomendado**

1. **Inicializar:** `npm run init`
2. **Activar watch:** `npm run watch` (dejar corriendo)
3. **Desarrollar:** Trabajas normalmente, el sistema valida y commitea
4. **Integrar add-ons:** `npm run integrate:addons` (cuando estés listo)
5. **Desplegar:** `npm run deploy` (al finalizar)

## ✅ **Ventajas**

- ✅ **Sin intervención manual** - Todo es automático
- ✅ **Calidad garantizada** - Validación en cada commit
- ✅ **Corrección automática** - Menos trabajo para ti
- ✅ **Flujo completo** - De inicio a despliegue
- ✅ **Configuración simple** - Todo guiado interactivamente

---

**¿Listo para empezar?** Ejecuta `npm run init` 🚀
