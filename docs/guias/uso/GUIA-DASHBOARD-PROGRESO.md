# 📊 Guía: Dashboard de Progreso para Implementación por Historias

## 🎯 Objetivo

Usar el dashboard de progreso para visualizar y gestionar la implementación de componentes por historias de Storybook.

---

## 🚀 Uso Básico

### Iniciar Dashboard

```typescript
import { ImplementationDashboard } from '@autorun/core/helpers';

const dashboard = new ImplementationDashboard('prototypes/canvas-encuestas.html');

// Iniciar para un componente
await dashboard.start('DataTable', 5); // 5 historias a implementar
```

### Actualizar Progreso de Historia

```typescript
// Marcar historia como en progreso
await dashboard.updateStory('columnas-reordenables', 'Columnas Reordenables', {
  status: 'in-progress',
  checklistCompleted: 0,
  checklistTotal: 4,
});

// Actualizar progreso del checklist
await dashboard.updateStory('columnas-reordenables', 'Columnas Reordenables', {
  status: 'in-progress',
  checklistCompleted: 2,
  checklistTotal: 4,
});

// Marcar como completada
await dashboard.updateStory('columnas-reordenables', 'Columnas Reordenables', {
  status: 'completed',
  checklistCompleted: 4,
  checklistTotal: 4,
});
```

### Hacer Rollback

```typescript
// Si una historia falla, hacer rollback a la última exitosa
const success = await dashboard.rollback();
if (success) {
  console.log('✅ Rollback exitoso. Continuando desde última historia exitosa.');
}
```

### Obtener Dashboard Actual

```typescript
const dashboardState = dashboard.getDashboard();
if (dashboardState) {
  console.log(`Progreso: ${dashboardState.percentage}%`);
  console.log(`Tiempo transcurrido: ${dashboardState.timeElapsed} minutos`);
  if (dashboardState.timeRemaining) {
    console.log(`Tiempo restante: ${dashboardState.timeRemaining} minutos`);
  }
}
```

### Finalizar Dashboard

```typescript
await dashboard.finish();
// Limpia snapshots antiguos y muestra resumen final
```

---

## 📊 Ejemplo Completo

```typescript
import { ImplementationDashboard } from '@autorun/core/helpers';

async function implementComponentByStories(componentName: string, totalStories: number) {
  const dashboard = new ImplementationDashboard('prototypes/canvas-encuestas.html');
  
  // Iniciar dashboard
  await dashboard.start(componentName, totalStories);
  
  // Para cada historia
  for (let i = 0; i < totalStories; i++) {
    const storyId = `story-${i}`;
    const storyName = `Historia ${i + 1}`;
    
    try {
      // Marcar como en progreso
      await dashboard.updateStory(storyId, storyName, {
        status: 'in-progress',
        checklistCompleted: 0,
        checklistTotal: 4,
      });
      
      // Implementar historia...
      // (código de implementación)
      
      // Actualizar progreso del checklist
      await dashboard.updateStory(storyId, storyName, {
        checklistCompleted: 2,
        checklistTotal: 4,
      });
      
      // Completar checklist
      await dashboard.updateStory(storyId, storyName, {
        checklistCompleted: 4,
        checklistTotal: 4,
      });
      
      // Marcar como completada
      await dashboard.updateStory(storyId, storyName, {
        status: 'completed',
      });
      
    } catch (error) {
      // Si falla, marcar como fallida
      await dashboard.updateStory(storyId, storyName, {
        status: 'failed',
        errors: [error.message],
      });
      
      // Hacer rollback
      const rolledBack = await dashboard.rollback();
      if (rolledBack) {
        console.log('✅ Rollback exitoso. Reintentando...');
        i--; // Reintentar esta historia
      } else {
        throw error; // No se pudo hacer rollback
      }
    }
  }
  
  // Finalizar
  await dashboard.finish();
}
```

---

## 🔄 Sistema de Rollback

El dashboard guarda automáticamente un snapshot del estado antes de implementar cada historia. Si una historia falla, puedes hacer rollback para volver al estado anterior.

**Snapshots guardados en:**
- `prototypes/canvas-encuestas.snapshot.{storyId}.html`

**Limpieza automática:**
- Se mantienen solo los últimos 3 snapshots
- Se limpian automáticamente al finalizar el dashboard

---

## 📊 Visualización del Dashboard

El dashboard muestra:
- **Progreso general:** Porcentaje completado
- **Barra de progreso visual:** `[████████░░░░] 80%`
- **Estado de cada historia:** ⏳ Pending, 🔄 In Progress, ✅ Completed, ❌ Failed
- **Checklist por historia:** Items completados/total
- **Tiempo:** Transcurrido y estimado restante
- **Opciones de rollback:** Si está disponible

---

## ⚠️ Notas Importantes

1. **Snapshots:** Se guardan automáticamente antes de cada historia
2. **Limpieza:** Snapshots antiguos se eliminan automáticamente
3. **Rollback:** Solo disponible si hay historias exitosas anteriores
4. **Validación:** Verifica que el checklist esté completo antes de continuar

---

**Última actualización:** 2025-01-03




