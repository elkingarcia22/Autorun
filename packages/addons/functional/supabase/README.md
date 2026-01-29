# 🗄️ Supabase Add-on

Add-on funcional de **Supabase** para Autorun que proporciona base de datos, autenticación y storage.

## 🎯 Características

- ✅ **Base de datos PostgreSQL** - Consultas, inserción, actualización y eliminación
- ✅ **Autenticación** - Registro, login, logout y gestión de sesiones
- ✅ **Storage** - Subida, descarga y gestión de archivos
- ✅ **Real-time** - Suscripciones a cambios en tiempo real
- ✅ **Edge Functions** - Ejecución de funciones serverless
- ✅ **Row Level Security** - Seguridad a nivel de fila
- ✅ **Gestión de sesiones** - Persistencia y refresh automático de tokens

## 📦 Instalación

El add-on ya está incluido en Autorun. Necesitas instalar el cliente de Supabase:

```bash
npm install @supabase/supabase-js
```

## ⚙️ Configuración

### 1. Obtener Credenciales de Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a Settings > API
3. Copia la URL del proyecto y la anon key

### 2. Configurar en el Proyecto

Agrega la configuración de Supabase en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "supabase": {
          "url": "https://tu-proyecto.supabase.co",
          "anonKey": "tu-anon-key",
          "serviceRoleKey": "tu-service-role-key-opcional",
          "autoConnect": true,
          "auth": {
            "persistSession": true,
            "autoRefreshToken": true,
            "detectSessionInUrl": true
          }
        }
      }
    }
  }
}
```

**O usa variables de entorno:**

```bash
export SUPABASE_URL="https://tu-proyecto.supabase.co"
export SUPABASE_ANON_KEY="tu-anon-key"
export SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key"
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `url` | `string` | **Requerido.** URL del proyecto Supabase | - |
| `anonKey` | `string` | **Requerido.** Anon key pública | - |
| `serviceRoleKey` | `string` | Service role key (solo backend) | - |
| `autoConnect` | `boolean` | Conectar automáticamente | `true` |
| `auth.persistSession` | `boolean` | Persistir sesión en localStorage | `true` |
| `auth.autoRefreshToken` | `boolean` | Refresh automático de tokens | `true` |
| `auth.detectSessionInUrl` | `boolean` | Detectar sesión en URL | `true` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Supabase
await hub.activateAddon('supabase');
```

### Autenticación

```typescript
// Registrar usuario
const signUp = hub.getService('supabase', 'signUp');
const { user, session, error } = await signUp('usuario@example.com', 'password123', {
  data: { name: 'Juan' }
});

// Iniciar sesión
const signIn = hub.getService('supabase', 'signIn');
const { user, session, error } = await signIn('usuario@example.com', 'password123');

// Cerrar sesión
const signOut = hub.getService('supabase', 'signOut');
await signOut();

// Obtener usuario actual
const getUser = hub.getService('supabase', 'getUser');
const user = await getUser();

// Obtener sesión actual
const getSession = hub.getService('supabase', 'getSession');
const session = getSession();
```

### Consultas a Base de Datos

```typescript
// Consultar datos
const query = hub.getService('supabase', 'query');

// Obtener todos los usuarios
const users = await query('users');

// Consulta con filtros
const filtered = await query('products', {
  filter: { category: 'electronics' },
  order: { column: 'created_at', ascending: false },
  limit: 10
});

// Insertar datos
const insert = hub.getService('supabase', 'insert');
const newProduct = await insert('products', {
  name: 'Producto',
  price: 99.99,
  category: 'electronics'
});

// Actualizar datos
const update = hub.getService('supabase', 'update');
await update('products', 
  { price: 89.99 },
  { id: 1 }
);

// Eliminar datos
const deleteData = hub.getService('supabase', 'delete');
await deleteData('products', { id: 1 });
```

### Storage

```typescript
// Subir archivo
const uploadFile = hub.getService('supabase', 'uploadFile');
const file = new File(['contenido'], 'archivo.txt', { type: 'text/plain' });
const { path, error } = await uploadFile('avatars', 'user-123/avatar.jpg', file);

// Descargar archivo
const downloadFile = hub.getService('supabase', 'downloadFile');
const { data, error } = await downloadFile('avatars', 'user-123/avatar.jpg');

// Obtener URL pública
const getPublicUrl = hub.getService('supabase', 'getPublicUrl');
const url = getPublicUrl('avatars', 'user-123/avatar.jpg');
```

### Real-time

```typescript
// Suscribirse a cambios
const subscribe = hub.getService('supabase', 'subscribe');

const subscription = subscribe('products', (payload) => {
  console.log('Cambio detectado:', payload);
  
  if (payload.eventType === 'INSERT') {
    console.log('Nuevo producto:', payload.new);
  } else if (payload.eventType === 'UPDATE') {
    console.log('Producto actualizado:', payload.new);
  } else if (payload.eventType === 'DELETE') {
    console.log('Producto eliminado:', payload.old);
  }
});

// Desuscribirse
subscription.unsubscribe();
```

## 🛠️ Servicios Disponibles

### Autenticación

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `signUp` | Registra un nuevo usuario | `(email: string, password: string, options?) => Promise<AuthResult>` |
| `signIn` | Inicia sesión | `(email: string, password: string) => Promise<AuthResult>` |
| `signOut` | Cierra sesión | `() => Promise<{error}>` |
| `getUser` | Obtiene usuario actual | `() => Promise<User>` |
| `getSession` | Obtiene sesión actual | `() => Session` |

### Base de Datos

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `query` | Consulta datos | `(table: string, options?) => Promise<any[]>` |
| `insert` | Inserta datos | `(table: string, data) => Promise<any>` |
| `update` | Actualiza datos | `(table: string, data, filter) => Promise<any>` |
| `delete` | Elimina datos | `(table: string, filter) => Promise<any>` |

### Storage

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `uploadFile` | Sube archivo | `(bucket: string, path: string, file: File) => Promise<UploadResult>` |
| `downloadFile` | Descarga archivo | `(bucket: string, path: string) => Promise<DownloadResult>` |
| `getPublicUrl` | Obtiene URL pública | `(bucket: string, path: string) => string` |

### Real-time

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `subscribe` | Suscribe a cambios | `(table: string, callback, filter?) => Subscription` |

## 📝 Ejemplos de Uso

### Sistema de Autenticación Completo

```typescript
// Componente de login
async function handleLogin(email: string, password: string) {
  const signIn = hub.getService('supabase', 'signIn');
  const { user, session, error } = await signIn(email, password);
  
  if (error) {
    console.error('Error al iniciar sesión:', error);
    return;
  }
  
  console.log('Usuario autenticado:', user);
  // Redirigir a dashboard
}

// Verificar autenticación al cargar
async function checkAuth() {
  const getUser = hub.getService('supabase', 'getUser');
  const user = await getUser();
  
  if (!user) {
    // Redirigir a login
    return;
  }
  
  // Usuario autenticado, continuar
}
```

### CRUD Completo

```typescript
// Crear producto
const insert = hub.getService('supabase', 'insert');
const product = await insert('products', {
  name: 'Laptop',
  price: 999.99,
  category: 'electronics',
  stock: 10
});

// Leer productos
const query = hub.getService('supabase', 'query');
const products = await query('products', {
  filter: { category: 'electronics' },
  order: { column: 'price', ascending: false }
});

// Actualizar producto
const update = hub.getService('supabase', 'update');
await update('products', 
  { stock: 5 },
  { id: product.id }
);

// Eliminar producto
const deleteData = hub.getService('supabase', 'delete');
await deleteData('products', { id: product.id });
```

### Sistema de Notificaciones en Tiempo Real

```typescript
// Suscribirse a notificaciones
const subscribe = hub.getService('supabase', 'subscribe');

subscribe('notifications', (payload) => {
  if (payload.eventType === 'INSERT') {
    showNotification(payload.new);
  }
}, 'user_id=eq.current_user_id()');
```

## 🐛 Troubleshooting

### Error: "Supabase URL o anonKey no configurados"

1. Verifica que `url` y `anonKey` estén configurados en `autorun.config.json`
2. O configura las variables de entorno `SUPABASE_URL` y `SUPABASE_ANON_KEY`
3. Obtén las credenciales desde el dashboard de Supabase

### Error: "Supabase client no está disponible"

1. Instala el cliente de Supabase:
```bash
npm install @supabase/supabase-js
```

2. Verifica que el add-on esté inicializado correctamente

### Error de autenticación

1. Verifica que las credenciales sean correctas
2. Verifica que Row Level Security esté configurado correctamente
3. Revisa los logs de Supabase en el dashboard

### Real-time no funciona

1. Verifica que Real-time esté habilitado en Supabase
2. Verifica que tengas permisos para suscribirte a la tabla
3. Verifica la conexión a internet

## 📚 Referencias

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

## 🔗 Integración con Otros Add-ons

Supabase se integra con:
- **Clarity Add-on**: Trackea eventos de autenticación
- **GitHub Add-on**: Puede commitear cambios de schema
- **Vercel Add-on**: Variables de entorno para deploy

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024


