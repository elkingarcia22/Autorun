# ✅ Pre-Implementation Check Add-on

Add-on que verifica automáticamente que se sigan todos los pasos obligatorios antes de implementar cualquier componente UBITS.

## 🎯 Características

- ✅ **Verificación automática**: Detecta cuando se va a implementar un componente
- ✅ **Checklist obligatorio**: Verifica que se completen todos los pasos obligatorios
- ✅ **Bloqueo automático**: Bloquea la implementación si no se completan los pasos
- ✅ **Registro en Problem Tracker**: Registra intentos bloqueados automáticamente
- ✅ **Tracking de intentos**: Mantiene un registro de todos los intentos de implementación

## 📋 Pasos Obligatorios Verificados

1. **Consultar Storybook en Vercel (PRIMERO)** ⚠️ OBLIGATORIO
   - URL: `https://ubits-storybook10.vercel.app/`
   - Revisar pestaña "Code" y "Controls"

2. **Consultar Storybook MCP** ⚠️ OBLIGATORIO
   - Usar `mcp_storybook_getComponentList`
   - Usar `mcp_storybook_getComponentsProps`

3. **Consultar documentación específica** ⚠️ OBLIGATORIO
   - Leer `docs/referencia/componentes/[nombre-componente].md`

## ⚙️ Configuración

El add-on se configura automáticamente en `UBITS_ADDONS_CONFIG`:

```typescript
'pre-implementation-check': {
  enabled: true,
  blockOnMissingSteps: true,
  registerInProblemTracker: true,
  requiredSteps: ['storybookVercel', 'storybookMCP', 'documentation'],
}
```

## 🚀 Uso

### Verificar si se puede implementar

```typescript
const checkResult = await preImplementationCheckAddon.canImplement('DataTable');

if (!checkResult.allowed) {
  console.error('❌ IMPLEMENTACIÓN BLOQUEADA');
  console.error('Faltan pasos obligatorios:', checkResult.missingSteps);
  // Bloquear implementación
  return;
}

// Continuar con implementación
```

### Marcar paso como completado

```typescript
// Después de consultar Storybook en Vercel
await preImplementationCheckAddon.markStepCompleted('DataTable', 'storybookVercel');

// Después de consultar Storybook MCP
await preImplementationCheckAddon.markStepCompleted('DataTable', 'storybookMCP');

// Después de consultar documentación
await preImplementationCheckAddon.markStepCompleted('DataTable', 'documentation');
```

### Obtener checklist

```typescript
const checklist = preImplementationCheckAddon.getChecklist('DataTable');

console.log('Checklist:', {
  storybookVercel: checklist?.storybookVercel,
  storybookMCP: checklist?.storybookMCP,
  documentation: checklist?.documentation,
});
```

## 🔍 Debugging

### Verificar que el add-on está activo

```typescript
// En la consola del servidor
✅ Pre-Implementation Check Add-on: Inicializado
✅ Pre-Implementation Check Add-on: Activado
```

### Ver intentos de implementación

```typescript
const attempts = preImplementationCheckAddon.getImplementationAttempts();

attempts.forEach(attempt => {
  console.log(`Componente: ${attempt.componentName}`);
  console.log(`Bloqueado: ${attempt.blocked}`);
  console.log(`Razón: ${attempt.reason}`);
});
```

## ⚠️ Notas Importantes

1. **Bloqueo automático**: Si `blockOnMissingSteps: true`, la implementación se bloquea automáticamente si faltan pasos obligatorios
2. **Registro en Problem Tracker**: Los intentos bloqueados se registran automáticamente en Problem Tracker
3. **Tracking persistente**: Los checklists y intentos se mantienen durante la sesión

## 📚 Referencias

- `docs/guias/implementacion/CHECKLIST-PRE-IMPLEMENTACION.md` - Checklist obligatorio
- `docs/analisis/ANALISIS-PROCESO-IMPLEMENTACION-ACTUAL.md` - Análisis del proceso
- `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - Verificar Storybook
- `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - Usar MCPs








