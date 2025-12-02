# 🔒 Seguridad - Vulnerabilidades de Dependencias

## 📊 Estado Actual

**Vulnerabilidades detectadas:** 6 moderadas

### ✅ Corregidas
- ✅ **glob** (alta) - Corregida automáticamente con `npm audit fix`

### ⚠️ Pendientes (Solo Desarrollo)
- ⚠️ **esbuild** (6 moderadas) - Relacionadas con `vitest` y sus dependencias internas

## 🔍 Detalles de las Vulnerabilidades Pendientes

### Vulnerabilidades Moderadas (6)

**Paquetes afectados:**
- `esbuild <=0.24.2` (en dependencias de vitest)
- `vite 0.11.0 - 6.1.6` (en dependencias de vitest)
- `vitest` y sus dependencias (`@vitest/mocker`, `vite-node`, `@vitest/coverage-v8`)

**Severidad:** Moderada

**Descripción:** 
Permite que cualquier sitio web envíe solicitudes al servidor de desarrollo y lea la respuesta.

**Impacto:**
- ⚠️ **Solo afecta el entorno de desarrollo** (servidor de desarrollo local)
- ✅ **NO afecta producción** (no se usa en builds de producción)
- ✅ **NO afecta el código ejecutado en navegador**

**Solución disponible:**
```bash
npm audit fix --force
```
⚠️ **Nota:** Esto actualizará `vitest` a la versión 4.0.15, que es un **breaking change**.

## 🛡️ Recomendaciones

### Para Desarrollo Local
Las vulnerabilidades actuales son **aceptables para desarrollo** porque:
1. Solo afectan el servidor de desarrollo local
2. No se exponen en producción
3. Requieren acceso local a tu máquina

### Para Corregir Completamente
Si deseas corregir todas las vulnerabilidades:

1. **Opción 1: Actualizar vitest (Breaking Change)**
   ```bash
   npm audit fix --force
   ```
   ⚠️ Esto actualizará vitest a 4.0.15, que puede requerir cambios en los tests.

2. **Opción 2: Esperar actualización de vitest**
   - Monitorear actualizaciones de vitest 2.x que corrijan las vulnerabilidades
   - Actualizar cuando esté disponible sin breaking changes

## 📝 Monitoreo

Para revisar vulnerabilidades periódicamente:
```bash
npm audit
```

Para ver detalles específicos:
```bash
npm audit --json
```

## 🔗 Referencias

- [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99) - Vulnerabilidad de esbuild
- [npm audit documentation](https://docs.npmjs.com/cli/v10/commands/npm-audit)

