# 🌍 Internationalization (i18n) Add-on

Add-on funcional de **i18n** para Autorun que proporciona internacionalización y localización para múltiples idiomas.

## 🎯 Características

- ✅ **Gestión de traducciones** - Carga y gestión de traducciones por idioma
- ✅ **Detección automática** - Detecta el idioma del navegador o almacenamiento
- ✅ **Cambio dinámico** - Cambio de idioma en tiempo de ejecución
- ✅ **Pluralización** - Soporte para plurales según reglas de idioma
- ✅ **Formateo** - Formateo de fechas, números y monedas por locale
- ✅ **Interpolación** - Interpolación de parámetros en traducciones
- ✅ **Fallback** - Sistema de fallback a idioma por defecto
- ✅ **Persistencia** - Guarda preferencia de idioma en localStorage

## 📦 Instalación

El add-on ya está incluido en Autorun. No requiere dependencias adicionales.

## ⚙️ Configuración

Agrega la configuración de i18n en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "i18n": {
          "defaultLocale": "es",
          "supportedLocales": ["es", "en", "fr", "de"],
          "fallbackLocale": "es",
          "translationsPath": "locales",
          "detectLocale": true,
          "storageKey": "i18n-locale"
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `defaultLocale` | `string` | Idioma por defecto | `es` |
| `supportedLocales` | `string[]` | Idiomas soportados | `['es', 'en']` |
| `fallbackLocale` | `string` | Idioma de fallback | `es` |
| `translationsPath` | `string` | Ruta a archivos de traducción | `locales` |
| `detectLocale` | `boolean` | Detectar idioma automáticamente | `true` |
| `storageKey` | `string` | Clave para localStorage | `i18n-locale` |

## 📁 Estructura de Traducciones

Crea archivos JSON en el directorio `locales/`:

```
locales/
├── es.json
├── en.json
├── fr.json
└── de.json
```

**Ejemplo `locales/es.json`:**
```json
{
  "welcome": "Bienvenido",
  "hello": "Hola {{name}}",
  "items": {
    "one": "{{count}} artículo",
    "other": "{{count}} artículos"
  },
  "date": "Fecha",
  "price": "Precio"
}
```

**Ejemplo `locales/en.json`:**
```json
{
  "welcome": "Welcome",
  "hello": "Hello {{name}}",
  "items": {
    "one": "{{count}} item",
    "other": "{{count}} items"
  },
  "date": "Date",
  "price": "Price"
}
```

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar i18n
await hub.activateAddon('i18n');
```

### Traducir Texto

```typescript
// Obtener servicio de traducción
const t = hub.getService('i18n', 't');

// Traducción simple
const welcome = t('welcome');
// "Bienvenido" (si locale es 'es')

// Traducción con parámetros
const greeting = t('hello', { name: 'Juan' });
// "Hola Juan"
```

### Cambiar Idioma

```typescript
const changeLocale = hub.getService('i18n', 'changeLocale');

// Cambiar a inglés
await changeLocale('en');

// Cambiar a francés
await changeLocale('fr');
```

### Pluralización

```typescript
const plural = hub.getService('i18n', 'plural');

// 1 artículo
const one = plural('items', 1);
// "1 artículo"

// 5 artículos
const many = plural('items', 5);
// "5 artículos"
```

### Formateo de Fechas

```typescript
const formatDate = hub.getService('i18n', 'formatDate');

const date = new Date();
const formatted = formatDate(date, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// "15 de diciembre de 2024" (es)
// "December 15, 2024" (en)
```

### Formateo de Números

```typescript
const formatNumber = hub.getService('i18n', 'formatNumber');

const number = 1234.56;
const formatted = formatNumber(number);
// "1.234,56" (es)
// "1,234.56" (en)
```

### Formateo de Moneda

```typescript
const formatCurrency = hub.getService('i18n', 'formatCurrency');

const amount = 99.99;
const formatted = formatCurrency(amount, 'USD');
// "$99.99" (en)
// "99,99 US$" (es)
```

### Agregar Traducciones Dinámicamente

```typescript
const addTranslations = hub.getService('i18n', 'addTranslations');

// Agregar traducciones para un locale
addTranslations('es', {
  'custom.key': 'Valor personalizado',
  'nested': {
    'key': 'Valor anidado'
  }
});
```

## 🎨 Ejemplo en React

```typescript
import { useEffect, useState } from 'react';

function MyComponent() {
  const [locale, setLocale] = useState('es');
  const t = hub.getService('i18n', 't');
  const changeLocale = hub.getService('i18n', 'changeLocale');

  useEffect(() => {
    changeLocale(locale);
  }, [locale]);

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello', { name: 'Usuario' })}</p>
      
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `t` | Traduce una clave | `(key: string, params?) => string` |
| `changeLocale` | Cambia el locale | `(locale: string) => Promise<void>` |
| `getCurrentLocale` | Obtiene el locale actual | `() => string` |
| `getSupportedLocales` | Obtiene locales soportados | `() => string[]` |
| `addTranslations` | Agrega traducciones | `(locale: string, translations: TranslationData)` |
| `formatDate` | Formatea una fecha | `(date: Date, options?) => string` |
| `formatNumber` | Formatea un número | `(number: number, options?) => string` |
| `formatCurrency` | Formatea una moneda | `(amount: number, currency?) => string` |
| `plural` | Pluraliza una clave | `(key: string, count: number, params?) => string` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración | `() => I18nConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<I18nConfig>)` |

## 📝 Ejemplos de Uso

### Selector de Idioma

```typescript
const supportedLocales = hub.getService('i18n', 'getSupportedLocales');
const changeLocale = hub.getService('i18n', 'changeLocale');
const getCurrentLocale = hub.getService('i18n', 'getCurrentLocale');

function LanguageSelector() {
  const current = getCurrentLocale();
  const locales = supportedLocales();

  return (
    <select value={current} onChange={(e) => changeLocale(e.target.value)}>
      {locales.map(locale => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
```

### Formulario con Traducciones

```typescript
const t = hub.getService('i18n', 't');
const formatCurrency = hub.getService('i18n', 'formatCurrency');

function ProductForm({ product }) {
  return (
    <form>
      <label>{t('product.name')}</label>
      <input defaultValue={product.name} />
      
      <label>{t('product.price')}</label>
      <span>{formatCurrency(product.price, 'USD')}</span>
      
      <button>{t('form.submit')}</button>
    </form>
  );
}
```

## 🔔 Eventos

El add-on emite eventos cuando cambia el locale:

```typescript
window.addEventListener('i18n:locale-changed', (event) => {
  console.log('Locale cambiado a:', event.detail.locale);
  // Actualizar UI
});
```

## 🐛 Troubleshooting

### Traducciones no se cargan

1. Verifica que los archivos JSON estén en la ruta correcta (`locales/`)
2. Verifica que los archivos tengan formato JSON válido
3. Verifica que `translationsPath` esté configurado correctamente

### Locale no se detecta

1. Verifica que el locale esté en `supportedLocales`
2. Verifica que `detectLocale` esté en `true`
3. Verifica que el navegador tenga configurado un idioma soportado

### Traducciones no se actualizan

1. Verifica que hayas llamado `changeLocale()` después de agregar traducciones
2. Verifica que las claves coincidan exactamente
3. Verifica que el formato de las traducciones sea correcto

## 📚 Referencias

- [MDN: Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [Unicode CLDR](http://cldr.unicode.org/)
- [i18n Best Practices](https://www.i18next.com/principles/fallback)

## 🔗 Integración con Otros Add-ons

i18n se integra con:
- **Component Add-ons**: Traduce textos de componentes automáticamente
- **Clarity Add-on**: Puede trackear cambios de idioma

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024


