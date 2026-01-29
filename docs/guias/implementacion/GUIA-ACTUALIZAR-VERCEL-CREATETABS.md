# 🚀 Guía: Actualizar Vercel con window.createTabs

## 🎯 Objetivo

Actualizar el repositorio de UBITS en GitHub para que Vercel tenga `window.createTabs` disponible.

---

## 📋 Pasos para Actualizar Vercel

### **PASO 1: Verificar el Repositorio de UBITS**

**Repositorio:** `https://github.com/elkingarcia22/UBITS`

**Archivo a actualizar:** `packages/templates/components-loader.js`

**Rama:** `main` (o la rama que Vercel está desplegando)

---

### **PASO 2: Obtener el Código que Falta**

El archivo local (`vendor/ubits/packages/templates/components-loader.js`) tiene el código completo. Necesitas agregar estas funciones al archivo en GitHub:

1. **`renderTabsIconHelper(iconName, isActive)`** - Helper para renderizar iconos de tabs
2. **`renderTabs(options)`** - Renderiza el HTML del componente Tabs
3. **`initTabsListeners(tabsElement, options)`** - Inicializa los event listeners
4. **`window.createTabs(options, containerId)`** - Función global principal

---

### **PASO 3: Ubicación en el Archivo**

El código debe agregarse **ANTES** de la sección `// ======================================== // DATA TABLE COMPONENT // ========================================` (alrededor de la línea 2390).

**Ubicación exacta:**
- Después de `window.createTabBar`
- Antes de `// DATA TABLE COMPONENT`

---

### **PASO 4: Código a Agregar**

```javascript
// ========================================
// TABS COMPONENT
// ========================================

/**
 * Helper para renderizar iconos de tabs
 * @param {string} iconName - Nombre del icono (sin prefijo fa-)
 * @param {boolean} isActive - Si el tab está activo (usa solid si activo, regular si inactivo)
 * @returns {string} HTML del icono
 */
function renderTabsIconHelper(iconName, isActive = false) {
	// Remover prefijo fa- si existe
	let name = iconName.startsWith('fa-') ? iconName.replace('fa-', '') : iconName;
	
	// Determinar estilo según si está activo
	const iconStyle = isActive ? 'fas' : 'far';
	
	return `<i class="${iconStyle} fa-${name}"></i>`;
}

/**
 * Renderiza el HTML del componente Tabs
 */
function renderTabs(options) {
	const tabs = options.tabs || [];
	const activeTabId = options.activeTabId;
	const className = options.className || '';

	if (!tabs || tabs.length === 0) {
		return '<div class="ubits-tabs"></div>';
	}

	// Determinar tab activo
	let activeId = activeTabId;
	if (!activeId) {
		const activeTab = tabs.find((tab) => tab.active);
		activeId = activeTab ? activeTab.id : tabs[0].id;
	}

	// Renderizar tabs
	const tabsHTML = tabs
		.map((tab) => {
			const isActive = tab.id === activeId;
			const activeClass = isActive ? 'ubits-tab--active' : '';
			const disabledClass = tab.disabled ? 'ubits-tab--disabled' : '';
			const classes = ['ubits-tab', activeClass, disabledClass].filter(Boolean).join(' ');

			// Pasar isActive para determinar si usa solid (active) o regular (inactive)
			const iconHTML = tab.icon ? renderTabsIconHelper(tab.icon, isActive) : '';

			return `
      <button 
        class="${classes}" 
        data-tab-id="${tab.id}"
        ${tab.disabled ? 'disabled' : ''}
        ${tab.url ? `data-url="${tab.url}"` : ''}
        ${tab.onClick ? 'data-has-click-handler="true"' : ''}
      >
        ${iconHTML}
        <span class="ubits-tab__label">${tab.label}</span>
      </button>
    `;
		})
		.join('');

	const containerClasses = ['ubits-tabs', className].filter(Boolean).join(' ');

	return `
    <div class="${containerClasses}">
      ${tabsHTML}
    </div>
  `.trim();
}

/**
 * Inicializa los event listeners de los tabs
 */
function initTabsListeners(tabsElement, options) {
	// Remover listeners anteriores si existen (marcar con data attribute)
	const existingTabs = tabsElement.querySelectorAll('.ubits-tab[data-listener-attached]');
	existingTabs.forEach((tab) => {
		const clonedTab = tab.cloneNode(true);
		tab.parentNode?.replaceChild(clonedTab, tab);
	});

	const tabs = tabsElement.querySelectorAll('.ubits-tab:not(.ubits-tab--disabled)');

	const handleTabClick = (tabElement) => {
		const tabId = tabElement.getAttribute('data-tab-id');
		const url = tabElement.getAttribute('data-url');

		// Remover active de todos los tabs y actualizar iconos
		tabsElement.querySelectorAll('.ubits-tab').forEach((t) => {
			t.classList.remove('ubits-tab--active');
			
			// Actualizar icono del tab inactivo (regular)
			const iconElement = t.querySelector('i');
			if (iconElement) {
				const iconName = iconElement.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
				if (iconName) {
					iconElement.className = `far fa-${iconName}`;
				}
			}
		});

		// Agregar active al tab clickeado y actualizar icono
		tabElement.classList.add('ubits-tab--active');
		
		// Actualizar icono del tab activo (solid)
		const activeIconElement = tabElement.querySelector('i');
		if (activeIconElement) {
			const iconName = activeIconElement.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
			if (iconName) {
				activeIconElement.className = `fas fa-${iconName}`;
			}
		}

		// Navegar a URL si existe
		if (url) {
			window.location.href = url;
			return;
		}

		// Buscar el callback onClick del tab original
		const tabConfig = options.tabs.find((t) => t.id === tabId);

		if (tabConfig && tabConfig.onClick) {
			tabConfig.onClick(new MouseEvent('click'));
		}

		// Llamar callback si existe
		if (options.onTabChange) {
			options.onTabChange(tabId || '', tabElement);
		}

		// Disparar evento personalizado
		const event = new CustomEvent('tabsTabClick', {
			detail: { tabId: tabId, tabElement: tabElement },
		});
		document.dispatchEvent(event);
	};

	// Event listeners para tabs
	tabs.forEach((tab, index) => {
		const tabId = tab.getAttribute('data-tab-id');
		tab.setAttribute('data-listener-attached', 'true');
		tab.addEventListener('click', (e) => {
			e.preventDefault();
			handleTabClick(tab);
		});
	});
}

/**
 * Crea un componente Tabs interactivo en el DOM
 */
window.createTabs = function (options, containerId) {
	const container = containerId
		? document.getElementById(containerId) || document.createElement('div')
		: document.createElement('div');

	if (containerId && !container.id) {
		container.id = containerId;
	}

	container.innerHTML = renderTabs(options);

	// Inicializar listeners - buscar el elemento .ubits-tabs dentro del contenedor
	requestAnimationFrame(() => {
		const tabsElement = container.querySelector('.ubits-tabs');
		if (tabsElement) {
			initTabsListeners(tabsElement, options);
		} else {
			// Fallback: usar el contenedor directamente si no se encuentra .ubits-tabs
			initTabsListeners(container, options);
		}
	});

	return container;
};
```

---

### **PASO 5: Actualizar en GitHub**

#### **Opción A: Usando GitHub Web Interface**

1. **Ir a:** `https://github.com/elkingarcia22/UBITS`
2. **Navegar a:** `packages/templates/components-loader.js`
3. **Hacer clic en:** ✏️ Edit (lápiz)
4. **Buscar:** La línea que dice `// ======================================== // DATA TABLE COMPONENT`
5. **Pegar el código ANTES de esa línea**
6. **Commit:** 
   - Título: `feat: add window.createTabs to components-loader.js`
   - Descripción: `Adds renderTabs, initTabsListeners, and window.createTabs functions to support Tabs component`
7. **Hacer clic en:** "Commit changes"

#### **Opción B: Usando Git CLI**

```bash
# 1. Clonar el repositorio (si no lo tienes)
git clone https://github.com/elkingarcia22/UBITS.git
cd UBITS

# 2. Crear una rama nueva
git checkout -b feat/add-createTabs

# 3. Editar el archivo
# Agregar el código en packages/templates/components-loader.js
# (antes de la sección DATA TABLE COMPONENT)

# 4. Agregar y commitear
git add packages/templates/components-loader.js
git commit -m "feat: add window.createTabs to components-loader.js

Adds renderTabs, initTabsListeners, and window.createTabs functions to support Tabs component"

# 5. Push
git push origin feat/add-createTabs

# 6. Crear Pull Request en GitHub
# O mergear directamente a main si tienes permisos
git checkout main
git merge feat/add-createTabs
git push origin main
```

#### **Opción C: Usando GitHub MCP (Recomendado)**

Si tienes acceso al GitHub MCP, puedo actualizar el archivo directamente:

```javascript
// Usar mcp_project-0-Autorun-github_create_or_update_file
// Para actualizar el archivo en GitHub
```

---

### **PASO 6: Verificar que Vercel se Actualizó**

**Después de hacer push a GitHub:**

1. **Esperar 1-2 minutos** para que Vercel detecte el cambio
2. **Verificar en Vercel Dashboard:**
   - Ir a: `https://vercel.com/dashboard`
   - Buscar el proyecto: `ubits-storybook10` (o el nombre correcto)
   - Verificar que hay un nuevo deployment

3. **Verificar en el navegador:**
   ```javascript
   // Abrir: https://ubits-storybook10.vercel.app/templates/components-loader.js
   // Buscar: window.createTabs
   // Debe aparecer la función
   ```

4. **Probar en el template:**
   ```javascript
   // En la consola del navegador:
   console.log('createTabs disponible:', typeof window.createTabs === 'function');
   // Debe mostrar: ✅ createTabs disponible: true
   ```

---

## 🔍 Verificación del Código

### **Antes de hacer commit, verificar:**

1. ✅ El código está en la ubicación correcta (antes de DATA TABLE COMPONENT)
2. ✅ Todas las funciones están presentes:
   - `renderTabsIconHelper`
   - `renderTabs`
   - `initTabsListeners`
   - `window.createTabs`
3. ✅ No hay errores de sintaxis
4. ✅ El código coincide con el archivo local

---

## 📚 Referencias

- **Repositorio:** `https://github.com/elkingarcia22/UBITS`
- **Archivo local:** `vendor/ubits/packages/templates/components-loader.js` (líneas 2176-2388)
- **Vercel URL:** `https://ubits-storybook10.vercel.app/templates/components-loader.js`
- **Guía de solución:** `docs/guias/implementacion/GUIA-SOLUCION-VERCEL-CREATETABS-FALTA.md`

---

## ⚠️ Notas Importantes

1. **Vercel despliega automáticamente** cuando detecta cambios en GitHub
2. **Puede tardar 1-2 minutos** en actualizarse
3. **Si Vercel no se actualiza automáticamente:**
   - Verificar que el repositorio está conectado en Vercel
   - Verificar que la rama correcta está configurada
   - Hacer un redeploy manual en Vercel Dashboard

4. **Después de actualizar:**
   - El sistema automáticamente usará Vercel (no necesitará fallback a local)
   - Los logs mostrarán: `Fuente: Vercel` en lugar de `Fuente: LOCAL (fallback)`

---

**Última actualización:** 2025-12-10  
**Estado:** ⚠️ Pendiente de actualizar en GitHub




