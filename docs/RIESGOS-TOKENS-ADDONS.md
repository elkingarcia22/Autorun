# Análisis de Riesgos: Tokens como Add-ons

## 🎯 Resumen Ejecutivo

**Respuesta corta**: **SÍ hay riesgos**, pero son **mitigables** y **controlables** si se implementa correctamente.

---

## ⚠️ Riesgos Identificados

### **1. Riesgo ALTO: Carga de Tokens**

#### **Problema Actual**
```html
<!-- Carga estática en HTML -->
<link rel="stylesheet" href="../../tokens/dist/tokens.css" />
```

#### **Riesgo si cambiamos a add-ons**
- ❌ Si el add-on no carga, **todos los componentes se rompen**
- ❌ Si hay error en la carga asíncrona, **pantalla en blanco**
- ❌ Si se carga después de los componentes, **estilos sin aplicar**

#### **Impacto**
- 🔴 **CRÍTICO**: Sin tokens = sin estilos = UI rota
- 🔴 **ALTO**: Afecta a TODOS los componentes
- 🔴 **ALTO**: Difícil de debuggear

---

### **2. Riesgo MEDIO: Compatibilidad hacia atrás**

#### **Problema**
Los archivos HTML actuales esperan:
```html
<link rel="stylesheet" href="../../tokens/dist/tokens.css" />
```

Si cambiamos a add-ons, estos archivos **se romperían**.

#### **Impacto**
- 🟡 **MEDIO**: Requiere actualizar todos los HTML
- 🟡 **MEDIO**: Playground actual dejaría de funcionar
- 🟡 **MEDIO**: Templates (admin, colaborador) necesitan cambios

---

### **3. Riesgo MEDIO: Build y Generación**

#### **Problema Actual**
```bash
npm run build:tokens  # Genera tokens.css desde tokens.json
```

#### **Riesgo**
- ⚠️ Si el add-on no genera tokens.css correctamente
- ⚠️ Si hay error en Style Dictionary
- ⚠️ Si la estructura de tokens.json cambia

#### **Impacto**
- 🟡 **MEDIO**: Build podría fallar
- 🟡 **MEDIO**: CI/CD podría romperse

---

### **4. Riesgo BAJO: Validación**

#### **Problema Actual**
El validador verifica:
```javascript
// Busca var(--ubits-*)
const hasTokens = /var\(--ubits-[^)]+\)/g.test(css);
```

#### **Riesgo**
- 🟢 **BAJO**: La validación seguiría funcionando
- 🟢 **BAJO**: Solo cambia la fuente de tokens, no el uso

---

### **5. Riesgo BAJO: Dependencias de Componentes**

#### **Problema Actual**
```json
// package.json de componentes
{
  "dependencies": {
    "@ubits/tokens": "workspace:*"
  }
}
```

#### **Riesgo**
- 🟢 **BAJO**: Los componentes ya usan `var(--ubits-*)`
- 🟢 **BAJO**: No dependen directamente del archivo tokens.css
- 🟢 **BAJO**: Solo necesitan que las variables CSS existan

---

## 🛡️ Estrategias de Mitigación

### **Estrategia 1: Compatibilidad Hacia Atrás (RECOMENDADA)**

#### **Implementación**
Mantener **ambos sistemas** funcionando:

```typescript
// Sistema híbrido: tokens estáticos + add-ons opcionales
class TokensManager {
  // Cargar tokens base (siempre)
  async loadBaseTokens() {
    // Cargar tokens.css estático (como antes)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    link.id = 'ubits-tokens-base';
    document.head.appendChild(link);
  }

  // Cargar add-on de tokens (opcional, sobrescribe)
  async loadTokensAddon(addonPath: string) {
    // Cargar add-on
    const addon = await loadAddon(addonPath);
    
    // Sobrescribir tokens base
    const style = document.createElement('style');
    style.id = 'ubits-tokens-addon';
    style.textContent = addon.getTokensCSS();
    document.head.appendChild(style);
    
    // Remover tokens base si add-on tiene todo
    if (addon.isComplete()) {
      document.getElementById('ubits-tokens-base')?.remove();
    }
  }
}
```

#### **Ventajas**
- ✅ **Cero breaking changes**: HTML actual sigue funcionando
- ✅ **Migración gradual**: Puedes usar add-ons cuando quieras
- ✅ **Rollback fácil**: Si falla, tokens base siguen ahí

---

### **Estrategia 2: Validación Pre-carga**

#### **Implementación**
Validar tokens **antes** de cargar componentes:

```typescript
class TokensAddon {
  async initialize(context: AppContext): Promise<void> {
    // 1. Validar que tokens tengan todas las propiedades requeridas
    if (!this.validateRequiredTokens()) {
      throw new Error('Tokens incompletos. Faltan propiedades requeridas.');
    }

    // 2. Validar formato
    if (!this.validateFormat()) {
      throw new Error('Formato de tokens inválido.');
    }

    // 3. Cargar tokens
    await this.loadTokens();

    // 4. Verificar que se aplicaron correctamente
    if (!this.verifyApplied()) {
      throw new Error('Tokens no se aplicaron correctamente.');
    }
  }

  private validateRequiredTokens(): boolean {
    const required = [
      '--ubits-button-primary-bg-default',
      '--ubits-button-primary-hover',
      '--ubits-fg-1-high',
      '--ubits-bg-1',
      // ... todos los tokens requeridos
    ];

    return required.every(token => 
      this.tokensCSS.includes(token)
    );
  }

  private verifyApplied(): boolean {
    // Verificar que las variables CSS existen en el DOM
    const testEl = document.createElement('div');
    testEl.style.setProperty('--ubits-test', 'test');
    const computed = getComputedStyle(testEl);
    return computed.getPropertyValue('--ubits-test') === 'test';
  }
}
```

#### **Ventajas**
- ✅ **Fail-fast**: Si hay error, se detecta antes de romper UI
- ✅ **Debugging fácil**: Sabes exactamente qué falta
- ✅ **Prevención**: No carga si no está completo

---

### **Estrategia 3: Fallback Automático**

#### **Implementación**
Si el add-on falla, usar tokens base:

```typescript
class TokensManager {
  async loadTokensAddon(addonPath: string): Promise<boolean> {
    try {
      const addon = await loadAddon(addonPath);
      await addon.initialize();
      return true;
    } catch (error) {
      console.error('Error cargando tokens add-on:', error);
      
      // Fallback: usar tokens base
      console.warn('Usando tokens base como fallback');
      await this.loadBaseTokens();
      return false;
    }
  }
}
```

#### **Ventajas**
- ✅ **Resiliente**: Nunca deja la UI sin estilos
- ✅ **Graceful degradation**: Funciona aunque falle
- ✅ **Producción-safe**: No rompe en producción

---

### **Estrategia 4: Testing Exhaustivo**

#### **Implementación**
Tests para cada escenario:

```typescript
describe('Tokens Add-on', () => {
  test('debe cargar tokens correctamente', async () => {
    const addon = new TokensAddon();
    await addon.initialize();
    expect(addon.getTokensCSS()).toBeTruthy();
  });

  test('debe validar tokens requeridos', () => {
    const addon = new TokensAddon();
    expect(addon.validate()).toBe(true);
  });

  test('debe fallar si faltan tokens requeridos', () => {
    const addon = new TokensAddon();
    addon.tokensCSS = ':root { --ubits-test: red; }';
    expect(addon.validate()).toBe(false);
  });

  test('debe aplicar tokens en el DOM', async () => {
    const addon = new TokensAddon();
    await addon.initialize();
    
    const el = document.createElement('div');
    el.style.color = 'var(--ubits-fg-1-high)';
    document.body.appendChild(el);
    
    const computed = getComputedStyle(el);
    expect(computed.color).not.toBe('');
  });
});
```

#### **Ventajas**
- ✅ **Confianza**: Sabes que funciona antes de deploy
- ✅ **Regresión**: Detecta problemas antes
- ✅ **Documentación**: Tests documentan el comportamiento

---

## 📊 Matriz de Riesgos vs Mitigación

| Riesgo | Severidad | Probabilidad | Mitigación | Riesgo Final |
|--------|-----------|--------------|------------|--------------|
| **Carga de tokens falla** | 🔴 ALTA | 🟡 MEDIA | Fallback + Validación | 🟢 BAJO |
| **Compatibilidad hacia atrás** | 🟡 MEDIA | 🟢 BAJA | Sistema híbrido | 🟢 BAJO |
| **Build falla** | 🟡 MEDIA | 🟢 BAJA | Tests + Validación | 🟢 BAJO |
| **Validación rota** | 🟢 BAJA | 🟢 BAJA | Tests | 🟢 BAJO |
| **Dependencias rotas** | 🟢 BAJA | 🟢 BAJA | Compatibilidad | 🟢 BAJO |

---

## ✅ Plan de Implementación Seguro

### **Fase 1: Preparación (Sin cambios)**
1. ✅ Crear estructura de add-on de tokens
2. ✅ Implementar interfaz `TokensAddon`
3. ✅ Tests exhaustivos
4. ✅ Validación de tokens requeridos

### **Fase 2: Sistema Híbrido (Sin breaking changes)**
1. ✅ Mantener carga estática de tokens.css
2. ✅ Agregar sistema de add-ons como opcional
3. ✅ Fallback automático si add-on falla
4. ✅ Testing en desarrollo

### **Fase 3: Migración Gradual (Opcional)**
1. ⚠️ Migrar templates uno por uno
2. ⚠️ Validar que todo funciona
3. ⚠️ Rollback si hay problemas

### **Fase 4: Consolidación (Solo si todo OK)**
1. ⚠️ Hacer add-ons el método principal
2. ⚠️ Mantener carga estática como fallback
3. ⚠️ Documentar migración

---

## 🎯 Recomendación Final

### **¿Es seguro implementar? SÍ, con estas condiciones:**

1. ✅ **Sistema híbrido**: Mantener tokens estáticos + add-ons opcionales
2. ✅ **Fallback automático**: Si add-on falla, usar tokens base
3. ✅ **Validación exhaustiva**: Verificar tokens antes de usar
4. ✅ **Testing completo**: Tests para todos los escenarios
5. ✅ **Migración gradual**: No cambiar todo de golpe

### **¿Qué NO hacer?**

1. ❌ **NO eliminar** carga estática de tokens.css
2. ❌ **NO hacer** add-ons obligatorios desde el inicio
3. ❌ **NO cambiar** estructura sin tests
4. ❌ **NO romper** compatibilidad hacia atrás

### **¿Cuándo es seguro?**

- ✅ Cuando tengas **sistema híbrido** funcionando
- ✅ Cuando tengas **fallback automático**
- ✅ Cuando tengas **tests completos**
- ✅ Cuando hayas **probado en desarrollo**

---

## 🔍 Checklist de Seguridad

Antes de implementar, verifica:

- [ ] Sistema híbrido implementado (tokens estáticos + add-ons)
- [ ] Fallback automático si add-on falla
- [ ] Validación de tokens requeridos
- [ ] Tests para carga de tokens
- [ ] Tests para validación
- [ ] Tests para fallback
- [ ] Documentación de migración
- [ ] Plan de rollback
- [ ] Pruebas en desarrollo
- [ ] Pruebas en staging

---

## 📝 Conclusión

**Riesgo inicial**: 🟡 MEDIO-ALTO  
**Riesgo con mitigación**: 🟢 BAJO

Con las estrategias de mitigación correctas, el riesgo es **mínimo y controlable**. La clave es:

1. **No romper** lo que ya funciona
2. **Agregar** funcionalidad nueva como opcional
3. **Validar** todo antes de usar
4. **Tener** fallback siempre disponible

**Recomendación**: Implementar con **sistema híbrido** y **migración gradual**.

