# 🎯 Plan: Eliminar Todo el Hardcodeo - Extraer Todo desde Storybook

**Fecha:** 2025-01-24  
**Objetivo:** Eliminar TODO el hardcodeo y extraer toda la información dinámicamente desde Storybook

---

## 📊 Estado Actual

### **❌ Hardcodeado Actualmente:**
1. **Mapeos nombres → IDs** (`storybookMCPNameMapper.ts`)
2. **Patrones de detección** (`autoMessageHandler.ts`)
3. **Clases CSS esperadas** (validadores)

### **✅ Ya Dinámico:**
1. Listado de componentes (`getComponentList()`)
2. Props del componente (`getComponentsProps()`)
3. Código HTML/JS (`getComponentCode()`)
4. Documentación (página Docs)

---

## 🎯 Plan de Implementación

### **FASE 1: Extraer Mapeos desde index.json** ⭐ PRIORIDAD ALTA

**Objetivo:** Eliminar `STORYBOOK_ID_TO_COMPONENT_NAME` y `ADDITIONAL_COMPONENT_NAME_MAPPINGS`

**Estrategia:**
1. Consultar `index.json` de Storybook
2. Extraer todos los componentes con sus IDs y títulos
3. Generar mapeos dinámicamente:
   - `componentId` → `title` (ej: `formularios-radio-button` → `Formularios/Radio Button`)
   - `componentName` → `title` (ej: `RadioButton` → `Formularios/Radio Button`)
4. Cachear mapeos en memoria (actualizar periódicamente)

**Archivos a modificar:**
- `packages/autorun-core/src/helpers/storybookMCPNameMapper.ts` → Convertir a generador dinámico
- Crear: `packages/autorun-core/src/helpers/storybookDynamicMapper.ts`

---

### **FASE 2: Generar Patrones de Detección Dinámicamente** ⭐ PRIORIDAD ALTA

**Objetivo:** Eliminar patrones hardcodeados en `autoMessageHandler.ts`

**Estrategia:**
1. Obtener nombres de componentes desde Storybook
2. Generar patrones automáticamente:
   - Nombre completo: `"Formularios/Radio Button"` → `/\bradio\s*button\b/i`
   - Nombre corto: `"RadioButton"` → `/\bradiobutton\b/i`
   - Variaciones: `"Radio Button"` → `/\bradio\s*button\b/i`, `/\bradio\s*bot[oó]n\b/i`
3. Priorizar componentes más específicos (RadioButton antes que Button)

**Archivos a modificar:**
- `packages/autorun-core/src/helpers/autoMessageHandler.ts` → Generar patrones dinámicamente
- Crear: `packages/autorun-core/src/helpers/dynamicPatternGenerator.ts`

---

### **FASE 3: Extraer Clases CSS desde Storybook** ⭐ PRIORIDAD MEDIA

**Objetivo:** Eliminar clases CSS hardcodeadas en validadores

**Estrategia:**
1. Extraer código HTML desde Storybook (historia "implementation")
2. Parsear HTML para encontrar clases CSS usadas
3. Generar lista de clases esperadas dinámicamente
4. Cachear clases por componente

**Archivos a modificar:**
- `packages/autorun-core/src/helpers/cssClassValidator.ts`
- `packages/autorun-core/src/helpers/verifyBeforeImplementation.ts`
- `packages/autorun-core/src/helpers/preImplementationVerification.ts`
- Crear: `packages/autorun-core/src/helpers/storybookCSSExtractor.ts`

---

### **FASE 4: Sistema de Cache Inteligente** ⭐ PRIORIDAD MEDIA

**Objetivo:** Cachear información extraída para mejorar rendimiento

**Estrategia:**
1. Cachear mapeos extraídos desde `index.json`
2. Cachear patrones generados
3. Cachear clases CSS extraídas
4. Invalidar cache cuando Storybook se actualiza
5. Actualizar cache periódicamente (cada X horas)

**Archivos a crear:**
- `packages/autorun-core/src/helpers/storybookCache.ts`

---

## 🔧 Implementación Detallada

### **1. Extraer Mapeos desde index.json**

**Nuevo archivo:** `packages/autorun-core/src/helpers/storybookDynamicMapper.ts`

```typescript
/**
 * Generador dinámico de mapeos desde Storybook index.json
 * Elimina necesidad de mapeos hardcodeados
 */
export class StorybookDynamicMapper {
  private static cache: {
    idToName: Record<string, string>;
    nameToId: Record<string, string>;
    shortNameToFullName: Record<string, string>;
    lastUpdate: number;
  } | null = null;

  /**
   * Obtener mapeos desde index.json de Storybook
   */
  static async getMappingsFromStorybook(): Promise<{
    idToName: Record<string, string>;
    nameToId: Record<string, string>;
    shortNameToFullName: Record<string, string>;
  }> {
    // Si hay cache válido, usar cache
    if (this.cache && Date.now() - this.cache.lastUpdate < 3600000) {
      return {
        idToName: this.cache.idToName,
        nameToId: this.cache.nameToId,
        shortNameToFullName: this.cache.shortNameToFullName,
      };
    }

    // Obtener index.json desde Storybook activo
    const { StorybookManager } = await import('./storybookManager');
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();

    if (!activeConfig) {
      throw new Error('No hay Storybook activo configurado');
    }

    const indexUrl = activeConfig.indexJsonUrl || `${activeConfig.url}/index.json`;
    const response = await fetch(indexUrl);
    const indexData = await response.json();

    // Extraer mapeos desde index.json
    const idToName: Record<string, string> = {};
    const nameToId: Record<string, string> = {};
    const shortNameToFullName: Record<string, string> = {};

    for (const [storyId, entry] of Object.entries(indexData.entries)) {
      if (typeof entry === 'object' && entry !== null) {
        const entryObj = entry as any;
        const title = entryObj.title || '';
        const componentId = storyId.split('--')[0];

        if (title && componentId) {
          // Mapeo: ID → Nombre completo
          idToName[componentId] = title;

          // Mapeo: Nombre completo → ID
          nameToId[title] = componentId;

          // Mapeo: Nombre corto → Nombre completo
          const parts = title.split('/');
          const shortName = parts[parts.length - 1];
          if (shortName && !shortNameToFullName[shortName]) {
            shortNameToFullName[shortName] = title;
          }

          // También mapear variaciones (ej: "RadioButton" → "Formularios/Radio Button")
          const pascalCase = shortName.replace(/\s+/g, '');
          if (pascalCase && pascalCase !== shortName) {
            shortNameToFullName[pascalCase] = title;
          }
        }
      }
    }

    // Actualizar cache
    this.cache = {
      idToName,
      nameToId,
      shortNameToFullName,
      lastUpdate: Date.now(),
    };

    return { idToName, nameToId, shortNameToFullName };
  }

  /**
   * Convertir ID de Storybook a nombre de componente
   */
  static async storybookIdToComponentName(storybookId: string): Promise<string | null> {
    const { idToName } = await this.getMappingsFromStorybook();
    return idToName[storybookId] || null;
  }

  /**
   * Convertir nombre de componente a ID de Storybook
   */
  static async componentNameToStorybookId(componentName: string): Promise<string | null> {
    const { nameToId, shortNameToFullName } = await this.getMappingsFromStorybook();

    // Intentar nombre completo primero
    if (nameToId[componentName]) {
      return nameToId[componentName];
    }

    // Intentar nombre corto
    const fullName = shortNameToFullName[componentName];
    if (fullName && nameToId[fullName]) {
      return nameToId[fullName];
    }

    return null;
  }
}
```

---

### **2. Generar Patrones de Detección Dinámicamente**

**Nuevo archivo:** `packages/autorun-core/src/helpers/dynamicPatternGenerator.ts`

```typescript
/**
 * Generador dinámico de patrones de detección desde nombres de componentes
 */
export class DynamicPatternGenerator {
  /**
   * Generar patrones de detección para un componente
   */
  static generatePatterns(componentName: string, fullName: string): RegExp[] {
    const patterns: RegExp[] = [];

    // Extraer nombre corto (última parte del nombre completo)
    const shortName = fullName.split('/').pop() || componentName;

    // Patrón 1: Nombre completo (ej: "Formularios/Radio Button")
    patterns.push(new RegExp(`\\b${this.escapeRegex(fullName)}\\b`, 'i'));

    // Patrón 2: Nombre corto con espacios (ej: "Radio Button")
    if (shortName.includes(' ')) {
      const words = shortName.split(' ');
      patterns.push(new RegExp(`\\b${words.join('\\s*')}\\b`, 'i'));
      // Variación en español
      patterns.push(new RegExp(`\\b${words[0]}\\s*${this.translateToSpanish(words[1])}\\b`, 'i'));
    }

    // Patrón 3: Nombre corto sin espacios (ej: "RadioButton")
    const pascalCase = shortName.replace(/\s+/g, '');
    patterns.push(new RegExp(`\\b${pascalCase}\\b`, 'i'));

    // Patrón 4: Nombre en camelCase (ej: "radioButton")
    const camelCase = pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
    patterns.push(new RegExp(`\\b${camelCase}\\b`, 'i'));

    // Patrón 5: Nombre en kebab-case (ej: "radio-button")
    const kebabCase = shortName.toLowerCase().replace(/\s+/g, '-');
    patterns.push(new RegExp(`\\b${kebabCase}\\b`, 'i'));

    // Patrón 6: Con palabras clave de acción
    const actionKeywords = ['implementar', 'crear', 'agregar', 'poner', 'hacer'];
    for (const keyword of actionKeywords) {
      patterns.push(new RegExp(`(?:${keyword}).*${this.escapeRegex(shortName)}`, 'i'));
    }

    return patterns;
  }

  private static escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private static translateToSpanish(word: string): string {
    const translations: Record<string, string> = {
      'Button': 'bot[oó]n',
      'Input': 'entrada',
      'Select': 'selecci[oó]n',
      // ... más traducciones
    };
    return translations[word] || word;
  }
}
```

---

### **3. Extraer Clases CSS desde Storybook**

**Nuevo archivo:** `packages/autorun-core/src/helpers/storybookCSSExtractor.ts`

```typescript
/**
 * Extraer clases CSS usadas en componentes desde Storybook
 */
export class StorybookCSSExtractor {
  /**
   * Extraer clases CSS desde código HTML de Storybook
   */
  static async extractCSSClasses(componentId: string): Promise<string[]> {
    // Obtener código HTML desde historia "implementation"
    const { extractExactCodeFromStorybookWithBrowser } = await import(
      './storybookExactCodeExtractorWithBrowser'
    );
    const codeResult = await extractExactCodeFromStorybookWithBrowser(
      componentId,
      'implementation'
    );

    if (!codeResult.html) {
      return [];
    }

    // Parsear HTML para encontrar clases CSS
    const classRegex = /class=["']([^"']+)["']/gi;
    const classes = new Set<string>();

    let match;
    while ((match = classRegex.exec(codeResult.html)) !== null) {
      const classList = match[1].split(/\s+/);
      classList.forEach((cls) => {
        if (cls.trim()) {
          classes.add(cls.trim());
        }
      });
    }

    return Array.from(classes);
  }
}
```

---

## 📋 Checklist de Implementación

### **FASE 1: Mapeos Dinámicos**
- [ ] Crear `storybookDynamicMapper.ts`
- [ ] Implementar extracción desde `index.json`
- [ ] Implementar sistema de cache
- [ ] Reemplazar `storybookMCPNameMapper.ts` con mapeos dinámicos
- [ ] Probar con RadioButton

### **FASE 2: Patrones Dinámicos**
- [ ] Crear `dynamicPatternGenerator.ts`
- [ ] Implementar generación de patrones
- [ ] Modificar `autoMessageHandler.ts` para usar patrones dinámicos
- [ ] Probar detección de componentes

### **FASE 3: Clases CSS Dinámicas**
- [ ] Crear `storybookCSSExtractor.ts`
- [ ] Implementar extracción de clases CSS
- [ ] Modificar validadores para usar clases extraídas
- [ ] Probar validación de clases

### **FASE 4: Cache Inteligente**
- [ ] Crear `storybookCache.ts`
- [ ] Implementar sistema de cache
- [ ] Implementar invalidación de cache
- [ ] ] Probar rendimiento

---

## 🎯 Resultado Esperado

**Después de implementar:**
- ✅ **0 mapeos hardcodeados** - Todo viene de `index.json`
- ✅ **0 patrones hardcodeados** - Todo se genera dinámicamente
- ✅ **0 clases CSS hardcodeadas** - Todo se extrae desde Storybook
- ✅ **Sistema 100% dinámico** - Siempre actualizado con Storybook

---

**Última actualización:** 2025-01-24  
**Estado:** 📋 **PLAN CREADO** - Listo para implementar

