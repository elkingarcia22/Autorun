# 🔍 Guía: Detección Automática de Necesidad de Eliminar HeaderSection

## ⚠️ PROBLEMA

Cuando se crea o modifica un archivo HTML en `prototypes/` con `data-module="encuestas"`, el sistema debe detectar automáticamente si necesita la interceptación de ContentManager para eliminar HeaderSection y content-sections.

**Problema actual:** El sistema no detecta automáticamente esta necesidad, causando que se cometa el mismo error repetidamente.

---

## ✅ SOLUCIÓN: Verificación Automática

### **Regla de Detección:**

**Cuando se detecta:**
- Archivo HTML en `prototypes/` 
- Con `data-module="encuestas"` en el `<body>`
- Y NO contiene la interceptación de ContentManager

**El sistema debe:**
1. Alertar automáticamente al agente
2. Sugerir aplicar la solución de `headersection-solution-001`
3. Mostrar la guía `GUIA-ELIMINAR-HEADERSECTION.md`

---

## 🔧 Implementación en Add-ons

### **1. Pre-Implementation Check Addon**

**Mejora necesaria:** Agregar detección de archivos HTML con `data-module="encuestas"`

```typescript
// En PreImplementationCheckAddon.ts
async onFileChange(filePath: string, content?: string): Promise<void> {
    // ... código existente ...
    
    // ⭐ NUEVO: Detectar archivos HTML de módulo "encuestas"
    if (filePath.includes('prototypes/') && filePath.endsWith('.html')) {
        if (!content) {
            content = await fs.readFile(filePath, 'utf-8');
        }
        
        // Verificar si es módulo "encuestas"
        const isEncuestasModule = /data-module\s*=\s*["']encuestas["']/i.test(content);
        
        if (isEncuestasModule) {
            // Verificar si tiene interceptación de ContentManager
            const hasInterception = /ContentManager\.updateContent.*_encuestasIntercepted/i.test(content) ||
                                   /interceptContentManagerImmediately/i.test(content);
            
            if (!hasInterception) {
                console.warn(`
🚨 PRE-IMPLEMENTATION CHECK: Archivo HTML de módulo "encuestas" detectado

Archivo: ${filePath}
Problema: Falta interceptación de ContentManager para eliminar HeaderSection

⚠️ ACCIÓN REQUERIDA:
1. Aplicar solución de headersection-solution-001
2. Ver guía: docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md
3. Agregar interceptación de ContentManager.updateContent
4. Agregar MutationObserver para limpieza agresiva

📚 Referencias:
- Problema: docs/problems-solutions/headersection/issue-001.md
- Solución: docs/problems-solutions/headersection/solution-001.md
- Guía: docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md
                `.trim());
                
                // Registrar en Problem Tracker
                if (this.problemTrackerAddon) {
                    await this.problemTrackerAddon.service?.detectProblem?.(
                        `Archivo HTML de módulo "encuestas" sin interceptación de ContentManager`,
                        {
                            category: 'ContentManager',
                            severity: 'high',
                            archivo: filePath,
                            suggestedSolution: 'headersection-solution-001',
                        }
                    );
                }
            }
        }
    }
}
```

### **2. Problem Tracker Addon**

**Mejora necesaria:** Agregar patrón de detección para archivos HTML de módulo "encuestas"

```typescript
// En ProblemTrackerService.ts
private setupProblemPatterns(): void {
    this.problemPatterns = [
        // ... patrones existentes ...
        
        // ⭐ NUEVO: Detectar archivos HTML de módulo "encuestas" sin interceptación
        {
            pattern: /data-module\s*=\s*["']encuestas["'][\s\S]*?(?!ContentManager\.updateContent.*_encuestasIntercepted|interceptContentManagerImmediately)/i,
            category: 'ContentManager',
            severity: 'high',
            description: 'Archivo HTML de módulo "encuestas" sin interceptación de ContentManager',
            suggestedSolution: 'headersection-solution-001',
        },
    ];
}
```

### **3. FileWatcher (Auto Reload Addon)**

**Mejora necesaria:** Verificar automáticamente cuando se crea un archivo HTML

```typescript
// En AutoReloadAddon.ts o FileWatcher
async onFileCreated(filePath: string): Promise<void> {
    if (filePath.includes('prototypes/') && filePath.endsWith('.html')) {
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Verificar si es módulo "encuestas"
        const isEncuestasModule = /data-module\s*=\s*["']encuestas["']/i.test(content);
        
        if (isEncuestasModule) {
            // Verificar si tiene interceptación
            const hasInterception = /ContentManager\.updateContent.*_encuestasIntercepted/i.test(content);
            
            if (!hasInterception) {
                // Notificar a Pre-Implementation Check
                const preImplCheck = this.context?.hub?.getAddon?.('pre-implementation-check');
                if (preImplCheck) {
                    await preImplCheck.onFileChange(filePath, content);
                }
            }
        }
    }
}
```

---

## 📋 Checklist de Verificación

Cuando se crea o modifica un archivo HTML con `data-module="encuestas"`, verificar:

- [ ] ¿Tiene interceptación de `ContentManager.updateContent`?
- [ ] ¿Tiene verificación de módulo (`currentModule !== 'encuestas'`)?
- [ ] ¿Tiene MutationObserver para limpieza agresiva?
- [ ] ¿Elimina CSS de `#header-section-container`?
- [ ] ¿Elimina CSS de `.content-sections`?
- [ ] ¿Elimina HTML estático de HeaderSection y content-sections?

**Si falta alguno → Alertar automáticamente**

---

## 🔄 Flujo Automático

```
1. FileWatcher detecta archivo HTML creado/modificado
   ↓
2. Verificar si tiene `data-module="encuestas"`
   ↓
3. Verificar si tiene interceptación de ContentManager
   ↓
4. Si NO tiene → Pre-Implementation Check alerta
   ↓
5. Problem Tracker registra problema
   ↓
6. Mostrar guía y solución al agente
```

---

## 📚 Referencias

- **Problema:** `docs/problems-solutions/headersection/issue-001.md`
- **Solución:** `docs/problems-solutions/headersection/solution-001.md`
- **Guía de implementación:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`
- **Error común:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #9

---

**Última actualización:** 2025-12-10



