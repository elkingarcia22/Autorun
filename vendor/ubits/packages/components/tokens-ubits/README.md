# @ubits/tokens-ubits

Add-on de tokens UBITS oficiales como sistema intercambiable.

## ✨ Características

- ✅ **Sistema híbrido**: Soporta tokens estáticos y add-ons
- ✅ **Compatibilidad hacia atrás**: No rompe código existente
- ✅ **Fallback automático**: Si falla add-on, usa tokens estáticos
- ✅ **Validación**: Verifica que todos los tokens requeridos estén disponibles
- ✅ **API global**: Integrado con `window.UBITS.Tokens`

## 📦 Instalación

```bash
# El add-on ya está incluido en el proyecto
# No requiere instalación adicional
```

## 🚀 Uso

### Opción 1: Uso Automático (Recomendado)

El add-on se auto-inicializa cuando se importa:

```typescript
import '@ubits/tokens-ubits';

// Los tokens se cargan automáticamente
// Usa tokens estáticos si ya están cargados
// O carga desde add-on si está configurado
```

### Opción 2: Uso Manual con TokensManager

```typescript
import { TokensManager } from '@ubits/tokens-ubits';

const manager = new TokensManager({
  staticTokensPath: '../../tokens/dist/tokens.css',
  autoLoadStatic: true,
  validateAfterLoad: true
});

await manager.initialize();
```

### Opción 3: API Global

```javascript
// Después de cargar el add-on
window.UBITS.Tokens.initialize({
  staticTokensPath: '../../tokens/dist/tokens.css'
});

// Validar tokens
const isValid = await window.UBITS.Tokens.validate();

// Obtener información
const info = window.UBITS.Tokens.getInfo();
console.log(info.source); // 'static' | 'addon' | 'unknown'
```

## 🔄 Cambiar entre Tokens

### Cargar Tokens Personalizados

```typescript
import { getTokensManager } from '@ubits/tokens-ubits';

const manager = getTokensManager();
await manager.switchTokensAddon('/addons/tokens-custom/manifest.json');
```

### Usar API Global

```javascript
await window.UBITS.Tokens.loadAddon('/addons/tokens-custom/manifest.json');
```

## ✅ Validación

```typescript
import { getTokensManager } from '@ubits/tokens-ubits';

const manager = getTokensManager();
const isValid = await manager.validateTokens();

if (!isValid) {
  const info = manager.getTokensInfo();
  console.warn('Tokens incompletos:', info);
}
```

## 🛡️ Compatibilidad

- ✅ **Tokens estáticos**: Sigue funcionando como antes
- ✅ **HTML existente**: No requiere cambios
- ✅ **Componentes**: Siguen usando `var(--ubits-*)` normalmente
- ✅ **Sin breaking changes**: Todo es opcional

## 📚 API

### TokensManager

```typescript
class TokensManager {
  initialize(context?: AppContext): Promise<void>;
  validateTokens(): Promise<boolean>;
  getTokensInfo(): TokensInfo;
  switchTokensAddon(path: string, context?: AppContext): Promise<void>;
  destroy(): void;
}
```

### window.UBITS.Tokens

```typescript
interface UBITSTokensAPI {
  initialize(options?: TokensManagerOptions): Promise<void>;
  getManager(): TokensManager;
  loadAddon(manifestPath: string): Promise<TokensAddon>;
  validate(): Promise<boolean>;
  getInfo(): { source: string; isValid: boolean };
}
```

## 🔧 Configuración

### Opciones del TokensManager

```typescript
interface TokensManagerOptions {
  staticTokensPath?: string;           // Ruta a tokens estáticos
  tokensAddonManifestPath?: string;    // Ruta al manifest del add-on
  autoLoadStatic?: boolean;            // Cargar estáticos automáticamente
  validateAfterLoad?: boolean;         // Validar después de cargar
}
```

## 🎯 Ejemplos

### Ejemplo 1: Uso Básico (Automático)

```html
<!-- En tu HTML -->
<link rel="stylesheet" href="../../tokens/dist/tokens.css" />
<script type="module">
  import '@ubits/tokens-ubits';
  // Los tokens ya están cargados, el add-on los detecta
</script>
```

### Ejemplo 2: Cargar Add-on Personalizado

```typescript
import { initializeTokensManager } from '@ubits/tokens-ubits';

await initializeTokensManager({
  tokensAddonManifestPath: '/addons/tokens-mi-empresa/manifest.json',
  autoLoadStatic: true // Fallback si falla
});
```

### Ejemplo 3: Validar Tokens

```typescript
import { getTokensManager } from '@ubits/tokens-ubits';

const manager = getTokensManager();
const isValid = await manager.validateTokens();

if (!isValid) {
  const info = manager.getTokensInfo();
  console.error('Tokens faltantes:', info);
}
```

## 🔍 Debugging

```javascript
// Ver información de tokens cargados
const info = window.UBITS.Tokens.getInfo();
console.log('Fuente:', info.source); // 'static' | 'addon'
console.log('Válido:', info.isValid);

// Obtener manager para más detalles
const manager = window.UBITS.Tokens.getManager();
const detailedInfo = manager.getTokensInfo();
```

## 📝 Notas

- Los tokens estáticos tienen prioridad si ya están cargados
- El add-on solo carga si no hay tokens estáticos
- El fallback es automático y transparente
- No hay breaking changes: todo es opcional

