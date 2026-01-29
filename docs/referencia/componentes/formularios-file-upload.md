# 📦 File Upload

> **Componente UBITS:** `formularios-file-upload`  
> **Categoría:** Formularios  
> **API:** `window.createFileUpload()` o `<ubits-file-upload>`  
> **Storybook Local:** http://localhost:6006/?path=/story/formularios-file-upload--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-file-upload--default

## 🎯 Descripción

Componente File Upload personalizado UBITS. Diseño moderno con dos vistas: Drop Zone (área de arrastrar y soltar con icono circular) y Files List (lista de archivos con progreso). Usa componentes UBITS (Button) y tokens UBITS exclusivamente.

**Características principales:**
- 2 vistas: Drop Zone (arrastrar y soltar) y Files List (lista de archivos)
- 5 estados: default, dragging, error, disabled, files-list
- Drag and drop nativo
- Validación de tamaño y cantidad de archivos
- Barra de progreso por archivo
- Estados de archivo: pending, uploading, completed, error
- Icono opcional en drop zone
- Tamaño de archivo visible opcional

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/formularios-file-upload--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-file-upload--default
- **Código fuente:** `vendor/ubits/packages/components/file-upload/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/file-upload/src/types/FileUploadOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/FileUpload.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `formularios-file-upload--default`  
**URL Local:** http://localhost:6006/?path=/story/formularios-file-upload--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-file-upload--default

**Descripción:**
File Upload con todos los controles disponibles. Permite configurar estado, archivos, límites, textos y opciones de visualización.

**Características mostradas:**
- Estado configurable (default, dragging, error, disabled, files-list)
- Archivos configurables
- Límites configurables (maxFiles, maxSize)
- Textos configurables (dropText, selectButtonText)
- Opciones de visualización (showIcon, showFileSize, showProgress)

**Código de ejemplo:**
```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  state: 'default',
  files: [],
  maxFiles: 6,
  maxSize: 5242880, // 5MB
  dropText: 'Arrastra tus archivos aquí',
  selectButtonText: 'Seleccionar archivos',
  showIcon: false,
  showFileSize: true,
  showProgress: true,
  onFileSelect: (files) => {
    console.log('Archivos seleccionados:', files);
    handleFiles(files);
  },
  onFileRemove: (fileId) => {
    console.log('Archivo removido:', fileId);
    removeFile(fileId);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `state`: `'default'` - Estado por defecto
- `maxFiles`: `6` - Máximo 6 archivos
- `maxSize`: `5242880` - 5MB máximo por archivo
- `showProgress`: `true` - Mostrar barra de progreso

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el file upload |
| `state` | `string` | `'default'` | Estado del componente. Opciones: `default`, `dragging`, `error`, `disabled`, `files-list` |
| `files` | `FileInfo[]` | `[]` | Array de archivos a mostrar (para vista files-list) |
| `maxFiles` | `number` | `6` | Número máximo de archivos permitidos |
| `maxSize` | `number` | `5242880` | Tamaño máximo por archivo en bytes (default: 5MB) |
| `dropText` | `string` | `'Arrastra tus archivos aquí'` | Texto para el área de drop |
| `selectButtonText` | `string` | `'Seleccionar archivos'` | Texto del botón de selección |
| `showIcon` | `boolean` | `false` | Si se muestra el icono en el drop zone |
| `showFileSize` | `boolean` | `true` | Si se muestra el tamaño del archivo |
| `showProgress` | `boolean` | `true` | Si se muestra la barra de progreso |
| `onFileSelect` | `function` | - | Callback que se ejecuta cuando se seleccionan archivos |
| `onFileRemove` | `function` | - | Callback que se ejecuta cuando se remueve un archivo |
| `onFileUpload` | `function` | - | Callback que se ejecuta cuando se sube un archivo |

### Estructura de FileInfo

```typescript
interface FileInfo {
  id: string;              // ID único del archivo
  name: string;           // Nombre del archivo
  size: number;           // Tamaño en bytes
  progress?: number;      // Progreso de subida (0-100)
  status?: 'pending' | 'uploading' | 'completed' | 'error'; // Estado del archivo
  error?: string;         // Mensaje de error (si status es 'error')
}
```

---

## 🎨 Estados y Vistas

### Estados

- **`default`**: Estado normal (drop zone visible)
- **`dragging`**: Estado cuando se arrastra un archivo sobre el drop zone
- **`error`**: Estado de error
- **`disabled`**: Estado deshabilitado (no interactivo)
- **`files-list`**: Vista de lista de archivos (cuando hay archivos)

### Vistas

**Drop Zone:**
- Área de arrastrar y soltar
- Icono opcional
- Botón de selección
- Texto de ayuda

**Files List:**
- Lista de archivos con información
- Barra de progreso por archivo
- Botón de remover por archivo
- Estados de cada archivo

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: File Upload Básico

```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  state: 'default',
  onFileSelect: (files) => {
    console.log('Archivos seleccionados:', files);
    handleFiles(files);
  }
});
```

### Ejemplo 2: File Upload con Límites

```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  maxFiles: 3,
  maxSize: 10485760, // 10MB
  onFileSelect: (files) => {
    // Validar archivos
    const validFiles = files.filter(file => {
      if (file.size > 10485760) {
        showError('El archivo excede el tamaño máximo');
        return false;
      }
      return true;
    });
    handleFiles(validFiles);
  }
});
```

### Ejemplo 3: File Upload con Icono

```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  showIcon: true,
  dropText: 'Arrastra tus archivos aquí o haz click para seleccionar',
  onFileSelect: (files) => {
    handleFiles(files);
  }
});
```

### Ejemplo 4: File Upload con Archivos Pre-cargados

```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  state: 'files-list',
  files: [
    {
      id: 'file-1',
      name: 'documento.pdf',
      size: 2048576,
      progress: 100,
      status: 'completed'
    },
    {
      id: 'file-2',
      name: 'imagen.jpg',
      size: 1024000,
      progress: 45,
      status: 'uploading'
    }
  ],
  onFileRemove: (fileId) => {
    removeFile(fileId);
  }
});
```

### Ejemplo 5: File Upload con Progreso

```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  showProgress: true,
  onFileSelect: (files) => {
    files.forEach((file, index) => {
      const fileId = `file-${index}`;
      // Agregar archivo con estado uploading
      addFile({
        id: fileId,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading'
      });
      
      // Simular progreso
      uploadFile(file, (progress) => {
        updateFileProgress(fileId, progress);
      });
    });
  }
});
```

### Ejemplo 6: File Upload Deshabilitado

```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  state: 'disabled',
  dropText: 'Carga de archivos deshabilitada'
});
```

### Ejemplo 7: File Upload con Textos Personalizados

```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  dropText: 'Arrastra tus documentos aquí',
  selectButtonText: 'Buscar archivos',
  onFileSelect: (files) => {
    handleFiles(files);
  }
});
```

### Ejemplo 8: File Upload sin Tamaño de Archivo

```javascript
window.createFileUpload({
  containerId: 'file-upload-container',
  showFileSize: false,
  onFileSelect: (files) => {
    handleFiles(files);
  }
});
```

### Ejemplo 9: File Upload Completo

```javascript
let uploadedFiles = [];

window.createFileUpload({
  containerId: 'file-upload-container',
  maxFiles: 5,
  maxSize: 5242880, // 5MB
  showIcon: true,
  showFileSize: true,
  showProgress: true,
  dropText: 'Arrastra tus archivos aquí o haz click para seleccionar',
  selectButtonText: 'Seleccionar archivos',
  onFileSelect: (files) => {
    console.log('Archivos seleccionados:', files);
    
    // Validar cantidad
    if (uploadedFiles.length + files.length > 5) {
      showError('Máximo 5 archivos permitidos');
      return;
    }
    
    // Agregar archivos
    files.forEach((file, index) => {
      const fileId = `file-${Date.now()}-${index}`;
      uploadedFiles.push({
        id: fileId,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading'
      });
      
      // Subir archivo
      uploadFile(file, fileId);
    });
    
    // Actualizar vista
    updateFileUploadView();
  },
  onFileRemove: (fileId) => {
    uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
    updateFileUploadView();
  }
});

function updateFileUploadView() {
  window.createFileUpload({
    containerId: 'file-upload-container',
    state: uploadedFiles.length > 0 ? 'files-list' : 'default',
    files: uploadedFiles,
    // ... otras opciones
  });
}
```

---

## 🔄 Callbacks y Eventos

### onFileSelect

Se ejecuta cuando se seleccionan archivos (por drag & drop o click).

```javascript
onFileSelect: (files) => {
  console.log('Archivos seleccionados:', files);
  // Validar archivos
  const validFiles = validateFiles(files);
  
  // Agregar a lista
  addFilesToList(validFiles);
  
  // Iniciar subida
  startUpload(validFiles);
}
```

**Parámetros:**
- `files` (File[]): Array de archivos seleccionados (File objects nativos)

### onFileRemove

Se ejecuta cuando se remueve un archivo de la lista.

```javascript
onFileRemove: (fileId) => {
  console.log('Archivo removido:', fileId);
  // Remover de lista
  removeFileFromList(fileId);
  
  // Cancelar subida si está en progreso
  cancelUpload(fileId);
}
```

**Parámetros:**
- `fileId` (string): ID del archivo removido

### onFileUpload

Se ejecuta cuando se completa la subida de un archivo.

```javascript
onFileUpload: (fileId, result) => {
  console.log('Archivo subido:', fileId, result);
  // Actualizar estado
  updateFileStatus(fileId, 'completed');
  
  // Guardar URL del archivo
  saveFileUrl(fileId, result.url);
}
```

**Parámetros:**
- `fileId` (string): ID del archivo subido
- `result` (object): Resultado de la subida (puede incluir URL, etc.)

---

## 🎨 Características Visuales

### Drop Zone

- Área grande con borde punteado
- Icono opcional en el centro
- Botón de selección
- Texto de ayuda
- Efecto visual al arrastrar archivos

### Files List

- Lista de archivos con información
- Nombre del archivo
- Tamaño del archivo (opcional)
- Barra de progreso (opcional)
- Botón de remover
- Estados visuales (pending, uploading, completed, error)

---

## 🚨 Errores Comunes

### Error 1: No Validar Tamaño de Archivos
**Problema:** No validar tamaño antes de agregar archivos  
**Solución:** Validar tamaño en `onFileSelect`

```javascript
// ❌ Incorrecto - no valida tamaño
onFileSelect: (files) => {
  addFiles(files);
}

// ✅ Correcto - valida tamaño
onFileSelect: (files) => {
  const validFiles = files.filter(file => {
    if (file.size > maxSize) {
      showError(`El archivo ${file.name} excede el tamaño máximo`);
      return false;
    }
    return true;
  });
  addFiles(validFiles);
}
```

### Error 2: No Validar Cantidad de Archivos
**Problema:** No validar cantidad máxima de archivos  
**Solución:** Validar cantidad en `onFileSelect`

```javascript
// ❌ Incorrecto - no valida cantidad
onFileSelect: (files) => {
  addFiles(files);
}

// ✅ Correcto - valida cantidad
onFileSelect: (files) => {
  if (uploadedFiles.length + files.length > maxFiles) {
    showError(`Máximo ${maxFiles} archivos permitidos`);
    return;
  }
  addFiles(files);
}
```

### Error 3: No Actualizar Progreso
**Problema:** No actualizar progreso durante la subida  
**Solución:** Actualizar progreso en el callback de subida

```javascript
// ❌ Incorrecto - no actualiza progreso
uploadFile(file, () => {
  // Falta actualizar progreso
});

// ✅ Correcto - actualiza progreso
uploadFile(file, (progress) => {
  updateFileProgress(fileId, progress);
  if (progress === 100) {
    updateFileStatus(fileId, 'completed');
  }
});
```

### Error 4: Files List sin Archivos
**Problema:** Usar `state: 'files-list'` sin archivos  
**Solución:** Proporcionar archivos cuando se usa files-list

```javascript
// ❌ Incorrecto - files-list sin archivos
state: 'files-list',
files: []

// ✅ Correcto - files-list con archivos
state: 'files-list',
files: [
  { id: '1', name: 'file.pdf', size: 1024, status: 'completed' }
]
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

