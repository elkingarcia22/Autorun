# 🔒 Snyk Add-on

Add-on funcional de **Snyk** para Autorun que proporciona security scanning y detección de vulnerabilidades.

## 🎯 Características

- ✅ **Escaneo de vulnerabilidades** - Detecta vulnerabilidades en dependencias
- ✅ **Monitoreo continuo** - Monitorea dependencias en Snyk
- ✅ **Integración con CI/CD** - Escanea antes de deploy
- ✅ **Thresholds configurables** - Niveles de severidad configurables
- ✅ **Fail on error** - Opción para cancelar deploy si hay vulnerabilidades
- ✅ **Reportes de seguridad** - Reportes detallados de vulnerabilidades
- ✅ **Integración con Snyk Cloud** - Monitoreo en la nube

## 📦 Instalación

El add-on ya está incluido en Autorun. Para usar Snyk, instala la dependencia:

```bash
npm install -g snyk
```

Luego autentica con Snyk:

```bash
snyk auth
```

O proporciona un token en la configuración.

## ⚙️ Configuración

Agrega la configuración de Snyk en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "snyk": {
          "enabled": true,
          "token": "tu-snyk-token",
          "org": "tu-org",
          "severityThreshold": "medium",
          "failOnError": false,
          "monitor": true
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `enabled` | `boolean` | Habilitar Snyk | `true` |
| `token` | `string` | Token de autenticación de Snyk | - |
| `org` | `string` | Organización de Snyk | - |
| `severityThreshold` | `string` | Umbral de severidad (`low`, `medium`, `high`, `critical`) | `medium` |
| `failOnError` | `boolean` | Cancelar deploy si hay vulnerabilidades | `false` |
| `monitor` | `boolean` | Monitorear dependencias después de deploy | `true` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Snyk
await hub.activateAddon('snyk');
```

### Escanear Vulnerabilidades

```typescript
// Obtener servicio de Snyk
const scan = hub.getService('snyk', 'scan');

// Escanear vulnerabilidades
const result = await scan({
  severityThreshold: 'high',
  failOnError: false
});

if (result.success) {
  console.log('✅ No se encontraron vulnerabilidades críticas');
} else {
  console.error(`❌ ${result.vulnerabilitiesFound} vulnerabilidades encontradas`);
  if (result.vulnerabilities) {
    result.vulnerabilities.forEach(vuln => {
      console.log(`  ${vuln.severity.toUpperCase()}: ${vuln.package} - ${vuln.title}`);
    });
  }
}
```

### Monitorear Dependencias

```typescript
// Monitorear dependencias en Snyk
const monitor = hub.getService('snyk', 'monitor');
const result = await monitor();

if (result.success) {
  console.log('✅ Monitoreo completado');
}
```

## 🔄 Flujo Automático

### Escaneo Antes de Deploy

El add-on escanea vulnerabilidades automáticamente antes de cada deploy:

```typescript
await hub.activateAddon('snyk');
await hub.activateAddon('vercel');

// Configurar para fallar en vulnerabilidades críticas
await hub.configureAddon('snyk', {
  severityThreshold: 'high',
  failOnError: true
});

// Trigger deploy
await hub.triggerEvent('beforeDeploy');
// Snyk escaneará automáticamente
// Si hay vulnerabilidades críticas, el deploy se cancela
```

### Monitoreo Después de Deploy

El add-on monitorea dependencias después de cada deploy:

```typescript
await hub.configureAddon('snyk', {
  monitor: true
});

// Trigger deploy
await hub.triggerEvent('afterDeploy');
// Snyk monitoreará automáticamente
```

## 📊 Ejemplo Completo

### Configuración Completa

```json
{
  "autorun": {
    "addons": {
      "active": ["snyk", "vercel"],
      "config": {
        "snyk": {
          "enabled": true,
          "token": "tu-snyk-token",
          "org": "tu-org",
          "severityThreshold": "high",
          "failOnError": true,
          "monitor": true
        }
      }
    }
  }
}
```

### Uso en Código

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar add-ons
await hub.activateAddon('snyk');
await hub.activateAddon('vercel');

// Escanear vulnerabilidades manualmente
const scan = hub.getService('snyk', 'scan');
const result = await scan({
  severityThreshold: 'high',
  failOnError: false
});

if (result.vulnerabilitiesFound && result.vulnerabilitiesFound > 0) {
  console.log(`⚠️  ${result.vulnerabilitiesFound} vulnerabilidades encontradas:`);
  console.log(`   Críticas: ${result.critical}`);
  console.log(`   Altas: ${result.high}`);
  console.log(`   Medias: ${result.medium}`);
  console.log(`   Bajas: ${result.low}`);
  
  if (result.vulnerabilities) {
    result.vulnerabilities.forEach(vuln => {
      console.log(`   - ${vuln.severity.toUpperCase()}: ${vuln.package}`);
      console.log(`     ${vuln.title}`);
      if (vuln.url) {
        console.log(`     Más info: ${vuln.url}`);
      }
    });
  }
} else {
  console.log('✅ No se encontraron vulnerabilidades');
  
  // Deploy seguro
  await hub.triggerEvent('beforeDeploy');
}
```

## 🎯 Casos de Uso

### Caso 1: CI/CD Integration

```typescript
// En CI/CD, fallar si hay vulnerabilidades críticas
hub.on('beforeDeploy', async () => {
  const scan = hub.getService('snyk', 'scan');
  const result = await scan({
    severityThreshold: 'critical',
    failOnError: true
  });
  
  if (!result.success) {
    throw new Error('Vulnerabilidades críticas encontradas');
  }
});
```

### Caso 2: Monitoreo Continuo

```typescript
// Monitorear dependencias periódicamente
hub.on('schedule', async () => {
  const monitor = hub.getService('snyk', 'monitor');
  await monitor();
});
```

### Caso 3: Reportes de Seguridad

```typescript
// Generar reporte de seguridad
const scan = hub.getService('snyk', 'scan');
const result = await scan();

// Enviar reporte a equipo de seguridad
if (result.vulnerabilitiesFound && result.vulnerabilitiesFound > 0) {
  // Notificar al equipo
  console.log('Reporte de seguridad generado');
}
```

## 🔗 Integración con Otros Add-ons

### Vercel Add-on

Escaneo automático antes de deploy:

```typescript
await hub.activateAddon('snyk');
await hub.activateAddon('vercel');

// Escaneo automático antes de deploy
await hub.triggerEvent('beforeDeploy');
```

### GitHub Add-on

Commit de reportes de seguridad:

```typescript
hub.on('afterSnykScan', async (scanResult) => {
  if (scanResult.reportPath) {
    await hub.getService('github', 'commit')({
      message: 'security: update vulnerability report',
      files: [scanResult.reportPath]
    });
  }
});
```

## 🐛 Troubleshooting

### Snyk no está instalado

1. Instala Snyk: `npm install -g snyk`
2. Autentica: `snyk auth` o proporciona token en configuración
3. Reinicia el Hub

### No se encuentran vulnerabilidades

1. Verifica que `enabled` está en `true`
2. Verifica que Snyk está autenticado
3. Verifica que el proyecto tiene dependencias
4. Revisa los logs para errores

### Error de autenticación

1. Verifica que el token es correcto
2. Ejecuta `snyk auth` manualmente
3. Verifica que la organización existe

## 📚 Referencias

- [Snyk Documentation](https://docs.snyk.io/)
- [Snyk CLI](https://docs.snyk.io/snyk-cli)
- [Snyk Security](https://snyk.io/)

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Compatibilidad**: Vercel, GitHub, CI/CD

