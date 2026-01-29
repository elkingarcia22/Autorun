# 🛡️ Estrategia Específica: Implementación de Modal

> **⚠️ CRÍTICO:** Esta estrategia específica DEBE seguirse al implementar el componente **Modal** de UBITS.
>
> **📚 Estrategia General:** Ver `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`  
> **🔄 Flujo Completo:** Ver `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md`  
> **✅ Checklist Obligatorio:** Ver `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`

---

## 🎯 Objetivo

Garantizar que el Modal se implemente correctamente desde el inicio, evitando:
- ❌ Modal que no se abre al hacer clic en el botón
- ❌ Dependencia de `window.createModal` que puede no estar disponible
- ❌ Modal que solo funciona una vez
- ❌ Estructura HTML incorrecta
- ❌ Event listeners que no funcionan

---

## 🔄 Integración con Flujo Automático de Autorun

**⚠️ IMPORTANTE:** Esta estrategia se carga **AUTOMÁTICAMENTE** cuando Autorun detecta que se va a implementar un Modal.

### **Cómo Funciona:**

1. **Detección Automática:**
   - `executeOnMessageStart()` detecta "modal" en el mensaje del usuario
   - `autoComponentDetection` identifica el componente como "Modal"

2. **Carga Automática de Guías:**
   - `loadRequiredGuides('Modal')` carga automáticamente:
     - ✅ Guías generales (siempre)
     - ✅ `ESTRATEGIA-MODAL.md` (esta estrategia)
     - ✅ `docs/referencia/componentes/modal.md`
     - ✅ `docs/referencia/componentes/feedback-modal.md`

3. **Validación Automática:**
   - `PreWriteValidator` verifica que se siguió el checklist
   - `ComponentImplementationValidator` valida el código implementado
   - Si hay errores, se bloquea la implementación

4. **Aplicación del Patrón:**
   - Autorun aplica automáticamente el patrón documentado aquí
   - Verifica múltiples namespaces
   - Implementa fallback HTML si es necesario
   - Inicializa independientemente

**Ver:** `docs/guias/implementacion/GUIA-SISTEMA-LECTURA-AUTOMATICA-IMPLEMENTADO.md`

---

## 📋 Checklist Pre-Implementación

### **FASE 1: Consulta Obligatoria** ⚠️ OBLIGATORIO

- [ ] ✅ Consultar Storybook en Vercel: `https://ubits-storybook10.vercel.app/?path=/story/functional-modal--default`
- [ ] ✅ Revisar pestaña "Code" para estructura exacta
- [ ] ✅ Revisar pestaña "Controls" para props disponibles
- [ ] ✅ Consultar Storybook MCP: `mcp_storybook_getComponentsProps(['functional-modal'])`
- [ ] ✅ Leer documentación: `docs/referencia/componentes/feedback-modal.md`
- [ ] ✅ Verificar que el CSS del modal esté incluido: `components/modal/src/styles/modal.css`

---

## 🛠️ Patrón de Implementación Obligatorio

### **PASO 1: Verificar Disponibilidad de APIs** ⚠️ CRÍTICO

**Problema común:** `window.createModal` puede no estar disponible porque:
- `components-loader.js` se carga de forma asíncrona
- El script puede fallar al cargar desde Vercel
- El componente puede estar en otro namespace

**Solución obligatoria:** Implementar con múltiples fallbacks

```javascript
// ⚠️ OBLIGATORIO: Verificar múltiples namespaces
const getCreateModal = () => {
    // Intentar múltiples ubicaciones donde puede estar createModal
    if (typeof window.createModal === 'function') {
        return window.createModal;
    }
    if (window.UBITS && window.UBITS.Modal && typeof window.UBITS.Modal.create === 'function') {
        return window.UBITS.Modal.create;
    }
    if (window.UBITSModal && typeof window.UBITSModal.createModal === 'function') {
        return window.UBITSModal.createModal;
    }
    return null;
};

// ⚠️ OBLIGATORIO: Usar fallback HTML si APIs no están disponibles
const createModalWithFallback = (options) => {
    const createModalFn = getCreateModal();
    
    if (createModalFn) {
        console.log('✅ [Modal] Usando API createModal');
        try {
            return createModalFn(options);
        } catch (error) {
            console.warn('⚠️ [Modal] Error al usar API createModal, usando fallback:', error);
        }
    }
    
    // Fallback: Crear modal manualmente con HTML exacto
    console.log('⚠️ [Modal] APIs no disponibles, usando fallback HTML');
    return createModalHTMLFallback(options);
};
```

---

### **PASO 2: Implementar Fallback HTML Exacto** ⚠️ CRÍTICO

**⚠️ IMPORTANTE:** El fallback HTML DEBE seguir la estructura EXACTA de `ModalProvider.ts`

```javascript
const createModalHTMLFallback = (options) => {
    const { title, bodyContent, footerButtons, onClose, closeOnOverlayClick = true } = options;
    
    // ⚠️ ESTRUCTURA EXACTA del ModalProvider.ts - NO MODIFICAR
    const overlay = document.createElement('div');
    overlay.className = 'ubits-modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'ubits-modal ubits-modal--size-md';
    modal.style.maxWidth = 'calc(var(--ubits-spacing-12) * 6)';
    
    // Header
    const header = document.createElement('div');
    header.className = 'ubits-modal__header';
    header.innerHTML = `
        <div class="ubits-modal__header-text">
            <div class="ubits-modal__header-title">
                <p class="ubits-heading-h2">${title || 'Modal'}</p>
            </div>
        </div>
        <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
            <i class="far fa-times"></i>
        </button>
    `;
    
    // Body
    const body = document.createElement('div');
    body.className = 'ubits-modal__body';
    body.innerHTML = `
        <div class="ubits-modal__body-content">
            ${typeof bodyContent === 'function' ? bodyContent() : bodyContent || ''}
        </div>
        <div class="ubits-modal__scrollbar">
            <div class="ubits-modal__scrollbar-bar"></div>
        </div>
    `;
    
    // Footer
    const footer = document.createElement('div');
    footer.className = 'ubits-modal__footer';
    let footerHTML = '<div class="ubits-modal__footer-actions"><div class="ubits-modal__footer-right">';
    
    if (footerButtons?.secondary) {
        footerHTML += `<button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" data-action="secondary">
            <span>${footerButtons.secondary.label}</span>
        </button>`;
    }
    if (footerButtons?.primary) {
        footerHTML += `<button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" data-action="primary">
            <span>${footerButtons.primary.label}</span>
        </button>`;
    }
    footerHTML += '</div></div>';
    footer.innerHTML = footerHTML;
    
    // Ensamblar modal
    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(footer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Funciones de control
    const openModal = () => {
        overlay.classList.add('ubits-modal-overlay--open');
        document.body.style.overflow = 'hidden';
        console.log('✅ [Modal] Modal abierto (fallback HTML)');
    };
    
    const closeModal = () => {
        overlay.classList.remove('ubits-modal-overlay--open');
        document.body.style.overflow = '';
        if (onClose) {
            onClose();
        }
    };
    
    // Event listeners
    const closeButton = overlay.querySelector('.ubits-modal__close');
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }
    
    if (closeOnOverlayClick) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }
    
    // Cerrar con ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('ubits-modal-overlay--open')) {
            closeModal();
        }
    };
    document.addEventListener('keydown', handleEsc);
    
    // Botones del footer
    if (footerButtons?.secondary) {
        const secondaryBtn = overlay.querySelector('[data-action="secondary"]');
        if (secondaryBtn && footerButtons.secondary.onClick) {
            secondaryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                footerButtons.secondary.onClick(e);
                closeModal();
            });
        }
    }
    
    if (footerButtons?.primary) {
        const primaryBtn = overlay.querySelector('[data-action="primary"]');
        if (primaryBtn && footerButtons.primary.onClick) {
            primaryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                footerButtons.primary.onClick(e);
                closeModal();
            });
        }
    }
    
    // Retornar objeto con métodos open/close
    return {
        element: overlay,
        open: openModal,
        close: closeModal,
        updateContent: (content) => {
            const bodyContentEl = overlay.querySelector('.ubits-modal__body-content');
            if (bodyContentEl) {
                bodyContentEl.innerHTML = typeof content === 'function' ? content() : content;
            }
        }
    };
};
```

---

### **PASO 3: Inicializar Botón con Reintentos** ⚠️ CRÍTICO

**Problema común:** El botón puede no existir cuando se ejecuta el script

**Solución obligatoria:** Implementar con reintentos y límite de tiempo

```javascript
// ⚠️ OBLIGATORIO: Inicializar botón con reintentos
const initModalButton = () => {
    const openModalButton = document.getElementById('open-modal-button');
    if (openModalButton) {
        // Remover listeners anteriores si existen (evitar duplicados)
        const newButton = openModalButton.cloneNode(true);
        openModalButton.parentNode.replaceChild(newButton, openModalButton);
        
        let modalInstance = null;
        
        newButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔘 [Modal] Botón clickeado, abriendo modal...');
            
            // Cerrar modal anterior si existe
            if (modalInstance && modalInstance.close) {
                modalInstance.close();
                modalInstance = null;
            }
            
            // Crear nuevo modal
            modalInstance = createModalWithFallback({
                title: 'Modal de Ejemplo',
                bodyContent: '<p>Este es un modal implementado desde Storybook.</p>',
                size: 'md',
                footerButtons: {
                    secondary: {
                        label: 'Cerrar',
                        onClick: () => {
                            console.log('🔘 [Modal] Botón cerrar clickeado');
                        }
                    },
                    primary: {
                        label: 'Aceptar',
                        onClick: () => {
                            console.log('🔘 [Modal] Botón aceptar clickeado');
                        }
                    }
                },
                onClose: () => {
                    console.log('🔘 [Modal] Modal cerrado');
                    modalInstance = null;
                },
                closeOnOverlayClick: true
            });
            
            // Abrir el modal
            if (modalInstance && modalInstance.open) {
                modalInstance.open();
                console.log('✅ [Modal] Modal abierto exitosamente');
            } else {
                console.error('❌ [Modal] No se pudo crear el modal');
                alert('Error: No se pudo crear el modal. Revisa la consola para más detalles.');
            }
        });
        console.log('✅ [Modal] Event listener agregado al botón');
    } else {
        // Reintentar si el botón no existe aún
        if (!initModalButton.attempts) initModalButton.attempts = 0;
        initModalButton.attempts++;
        if (initModalButton.attempts < 50) { // Máximo 5 segundos
            setTimeout(initModalButton, 100);
        } else {
            console.error('❌ [Modal] Botón open-modal-button no encontrado después de 5 segundos');
        }
    }
};

// Inicializar inmediatamente
initModalButton();
```

---

### **PASO 4: Inicialización Independiente** ⚠️ CRÍTICO

**Problema común:** El modal se inicializa dentro de una función que depende de otro componente (ej: HeaderSection)

**Solución obligatoria:** Inicializar el modal de forma independiente

```javascript
// ⚠️ CORRECTO: Inicializar modal independientemente
function initializeHeaderSectionAndModal() {
    // Inicializar HeaderSection (opcional, puede no estar disponible)
    const initHeaderSection = () => {
        // ... código del HeaderSection ...
    };
    initHeaderSection(); // No bloquea la inicialización del modal
    
    // ⚠️ CRÍTICO: Inicializar Modal INDEPENDIENTEMENTE
    // El modal DEBE funcionar aunque HeaderSection falle
    let modalInstance = null;
    // ... código del modal ...
    initModalButton(); // Se ejecuta siempre
}
```

---

## 🚨 Errores Comunes a Evitar

### **Error #1: Asumir que `window.createModal` está disponible**

**❌ INCORRECTO:**
```javascript
// Asume que createModal está disponible
const modal = window.createModal({...});
```

**✅ CORRECTO:**
```javascript
// Verifica múltiples namespaces y usa fallback
const createModalFn = getCreateModal();
if (createModalFn) {
    return createModalFn(options);
}
return createModalHTMLFallback(options);
```

---

### **Error #2: Modal solo funciona una vez**

**❌ INCORRECTO:**
```javascript
let modalInstance = null;
if (modalInstance) {
    return; // No permite abrir el modal de nuevo
}
```

**✅ CORRECTO:**
```javascript
let modalInstance = null;
if (modalInstance && modalInstance.close) {
    modalInstance.close(); // Cierra el anterior
    modalInstance = null;
}
// Crear nuevo modal
modalInstance = createModalWithFallback({...});
```

---

### **Error #3: Depender de otro componente para inicializar**

**❌ INCORRECTO:**
```javascript
const checkAndInitialize = () => {
    if (typeof window.createHeaderSection !== 'function') {
        setTimeout(checkAndInitialize, 100);
        return; // El modal nunca se inicializa si HeaderSection falla
    }
    // Inicializar modal aquí
};
```

**✅ CORRECTO:**
```javascript
// Inicializar HeaderSection (opcional)
initHeaderSection();

// Inicializar Modal (INDEPENDIENTE)
initModalButton(); // Se ejecuta siempre
```

---

### **Error #4: No limpiar instancias anteriores**

**❌ INCORRECTO:**
```javascript
// Crear modal sin verificar si ya existe uno
modalInstance = createModalWithFallback({...});
```

**✅ CORRECTO:**
```javascript
// Cerrar y limpiar instancia anterior
if (modalInstance && modalInstance.close) {
    modalInstance.close();
    modalInstance = null;
}
// Crear nuevo modal
modalInstance = createModalWithFallback({...});
```

---

## ✅ Checklist Final Antes de Escribir

### **Checklist Específico de Modal:**
- [ ] ✅ Verifiqué múltiples namespaces para `createModal`
- [ ] ✅ Implementé fallback HTML exacto (estructura de ModalProvider.ts)
- [ ] ✅ Inicialicé el botón con reintentos (máximo 5 segundos)
- [ ] ✅ El modal se inicializa independientemente de otros componentes
- [ ] ✅ Limpio instancias anteriores antes de crear nuevas
- [ ] ✅ El modal se puede abrir múltiples veces
- [ ] ✅ El CSS del modal está incluido en el HTML
- [ ] ✅ Los event listeners están correctamente configurados
- [ ] ✅ El modal se cierra con X, overlay y ESC
- [ ] ✅ Los botones del footer funcionan correctamente

---

## 🔄 Cómo se Aplica Automáticamente

**Cuando Autorun detecta que se va a implementar un Modal:**

1. **Carga automática de esta estrategia:**
   - `loadRequiredGuides('Modal')` carga `ESTRATEGIA-MODAL.md` automáticamente
   - Se ejecuta en `autoImplementationFlow()` antes de validar

2. **Validación automática:**
   - `ComponentImplementationValidator` verifica que se siguió el patrón
   - Si falta verificación de namespaces o fallback, se bloquea

3. **Aplicación del patrón:**
   - Autorun aplica automáticamente el código documentado aquí
   - Verifica múltiples namespaces
   - Implementa fallback HTML si es necesario

**Ver flujo completo:** `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md`

---

## 📚 Referencias

- **Documentación del componente:** `docs/referencia/componentes/feedback-modal.md`
- **Código fuente:** `vendor/ubits/packages/components/modal/src/ModalProvider.ts`
- **Storybook:** `https://ubits-storybook10.vercel.app/?path=/story/functional-modal--default`
- **Estrategia General:** `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`
- **Checklist Obligatorio:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
- **Sistema de Lectura Automática:** `docs/guias/implementacion/GUIA-SISTEMA-LECTURA-AUTOMATICA-IMPLEMENTADO.md`

---

**Última actualización:** 2025-12-16  
**Lecciones aprendidas de:** Prueba de implementación Modal 2025-12-16  
**Integrado con:** Flujo automático de Autorun (guidesLoader.ts, autoImplementationFlow.ts, PreWriteValidator.ts)
