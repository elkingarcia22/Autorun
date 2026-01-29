# 🚀 Deploy de index.html a Vercel

Este directorio contiene los archivos necesarios para desplegar el `index.html` en Vercel.

## 📋 Archivos

- `index.html` - Archivo HTML principal con toda la documentación de add-ons
- `vercel.json` - Configuración de Vercel para servir el archivo estático

## 🚀 Comandos de Deploy

### Deploy a Producción
```bash
cd deploy
npx vercel --prod --yes
```

### Deploy Preview
```bash
cd deploy
npx vercel
```

### Actualizar el index.html
```bash
# Desde la raíz del proyecto
cp packages/proyecto-app/tokens/index.html deploy/index.html
cd deploy
npx vercel --prod --yes
```

## 🌐 URLs

- **Producción**: https://autorun-index-d908qya54-elkin-garcias-projects-a0b1beb6.vercel.app
- **Dashboard**: https://vercel.com/elkin-garcias-projects-a0b1beb6/autorun-index

## 📝 Notas

- El archivo `index.html` es completamente estático (todo inline)
- No se requieren dependencias ni build
- El deploy es instantáneo
- Para actualizar, solo copia el nuevo `index.html` y vuelve a desplegar



