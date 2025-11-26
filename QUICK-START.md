# ⚡ Quick Start - Solución Rápida

Guía rápida para resolver problemas comunes al iniciar con Autorun.

---

## ❌ Problema: El script `init` no existe

### Síntomas

```bash
npm run init
# Error: Missing script: "init"
```

### Solución Rápida

```bash
# 1. Verificar rama actual
git branch --show-current

# 2. Actualizar desde la rama correcta
git pull origin fase-1-tokens

# 3. Reinstalar dependencias
npm install

# 4. Verificar que ahora existe
npm run init
```

### Si sigue sin funcionar

```bash
# Clonar de nuevo desde la rama correcta
cd ..
rm -rf Autorun
git clone -b fase-1-tokens https://github.com/elkingarcia22/Autorun.git
cd Autorun
npm install
npm run init
```

---

## ❌ Problema: Error al ejecutar `npm run init`

### Síntomas

```bash
npm run init
# Error: Cannot find module 'tsx'
```

### Solución

```bash
# tsx se instala automáticamente, pero si falla:
npm install -D tsx

# Luego ejecutar de nuevo
npm run init
```

---

## ❌ Problema: El wizard no encuentra archivos

### Síntomas

```
Error: Cannot find module '../AutorunHub'
```

### Solución

```bash
# Verificar que la estructura esté completa
npm run verify

# Si hay errores, reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Verificación Completa

Ejecuta este comando para verificar todo:

```bash
npm run verify
```

Deberías ver:
```
✅ Verificaciones exitosas: 14
✅ ¡Todo está listo! Puedes ejecutar: npm run init
```

---

## 📋 Checklist de Setup

- [ ] Repositorio clonado desde `fase-1-tokens`
- [ ] `npm install` ejecutado sin errores
- [ ] `npm run verify` muestra todo correcto
- [ ] `npm run init` ejecuta el wizard
- [ ] El wizard muestra las opciones correctamente

---

## 🔍 Verificar Estado

```bash
# Ver scripts disponibles
npm run

# Verificar package.json
cat package.json | grep -A 5 '"scripts"'

# Verificar que tsx esté instalado
npm list tsx

# Verificar estructura
ls -la packages/autorun-core/src/cli/
```

---

## 💡 Tips

1. **Siempre usa la rama `fase-1-tokens`** al clonar
2. **Ejecuta `npm run verify`** si algo no funciona
3. **Revisa `QUICK-START.md`** para problemas comunes
4. **Consulta el README.md principal** para documentación completa

---

¿Sigue sin funcionar? Revisa el [README.md](./README.md) completo o abre un issue en GitHub.
