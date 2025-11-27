# 📝 Nota sobre el Wizard

## Mensajes Externos

El mensaje que mencionas:

```
Próximo paso:
El wizard está esperando tu selección. Ejecuta en tu terminal:
cd /Users/elkinmac/Desktop/Encuestas4/Autorun
npm run init
...
```

**No está en nuestro código**. Este mensaje es generado automáticamente por Cursor u otra herramienta cuando detecta que un proceso está esperando input del usuario.

## Solución

Para evitar este mensaje, puedes:

1. **Usar modo automático** con variables de entorno:
   ```bash
   export AUTORUN_PROJECT_TYPE=ubits
   export AUTORUN_TEMPLATE=administrador
   export AUTORUN_MODULE=desempeno
   export AUTORUN_PRODUCT=objetivos
   npm run init
   ```

2. **Ejecutar directamente en terminal** (no a través de Cursor):
   ```bash
   cd /Users/elkinmac/Desktop/Encuestas4/Autorun
   npm run init
   ```

3. **El wizard ya está optimizado** para ser lo más directo posible y no generar mensajes confusos.

---

**Nota**: El wizard en sí no genera ese mensaje. Es una característica de Cursor que detecta procesos interactivos.

