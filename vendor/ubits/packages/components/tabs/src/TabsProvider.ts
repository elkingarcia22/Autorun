import type { TabsOptions, TabItem } from './types/TabsOptions';

/**
 * Helper para renderizar iconos FontAwesome
 * @param iconName - Nombre del icono (ej: "fa-th" o "th")
 * @param isActive - Si el tab está activo (usa solid), si no (usa regular)
 */
function renderIconHelper(iconName?: string, isActive: boolean = false): string {
	if (!iconName) return '';

	// Normalizar icono: asegurar que tiene prefijo fa-
	let normalizedIcon = iconName;
	if (!normalizedIcon.startsWith('fa-')) {
		normalizedIcon = `fa-${normalizedIcon}`;
	}

	// Determinar estilo según estado activo
	// Active: solid (fas), Inactive: regular (far)
	const iconStyle = isActive ? 'fas' : 'far';

	// Si ya tiene prefijo far o fas, reemplazarlo según el estado
	if (normalizedIcon.startsWith('far ') || normalizedIcon.startsWith('fas ')) {
		// Extraer solo el nombre del icono sin el prefijo
		const iconNameOnly = normalizedIcon.replace(/^(far|fas)\s+/, '');
		return `<i class="${iconStyle} ${iconNameOnly}"></i>`;
	}

	// Si no tiene prefijo, agregar el estilo correspondiente
	return `<i class="${iconStyle} ${normalizedIcon}"></i>`;
}

/**
 * Renderiza el HTML del componente Tabs
 */
export function renderTabs(options: TabsOptions): string {
	const { tabs, activeTabId, className = '' } = options;

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
			const iconHTML = tab.icon ? renderIconHelper(tab.icon, isActive) : '';

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
function initTabListeners(tabsElement: HTMLElement, options: TabsOptions): void {
	// Remover listeners anteriores si existen (marcar con data attribute)
	const existingTabs = tabsElement.querySelectorAll<HTMLElement>(
		'.ubits-tab[data-listener-attached]',
	);
	existingTabs.forEach((tab) => {
		const clonedTab = tab.cloneNode(true) as HTMLElement;
		tab.parentNode?.replaceChild(clonedTab, tab);
	});

	const tabs = tabsElement.querySelectorAll<HTMLElement>('.ubits-tab:not(.ubits-tab--disabled)');

	const handleTabClick = (tabElement: HTMLElement) => {
		const tabId = tabElement.getAttribute('data-tab-id');
		const url = tabElement.getAttribute('data-url');

		console.log('🔵 [Tabs] handleTabClick - Tab clickeado:', tabId);
		console.log('🔵 [Tabs] handleTabClick - URL:', url);
		console.log('🔵 [Tabs] handleTabClick - Elemento:', tabElement);

		// Remover active de todos los tabs y actualizar iconos
		tabsElement.querySelectorAll('.ubits-tab').forEach((t) => {
			const currentTabId = t.getAttribute('data-tab-id');
			console.log('🔵 [Tabs] Removiendo active de tab:', currentTabId);

			t.classList.remove('ubits-tab--active');
			console.log('🔵 [Tabs] Clases después de remover active:', t.className);

			// Actualizar icono del tab inactivo (regular)
			const iconElement = t.querySelector('i');
			if (iconElement) {
				console.log('🔵 [Tabs] Icono antes de actualizar:', iconElement.className);
				const iconName = iconElement.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
				console.log('🔵 [Tabs] Nombre del icono extraído:', iconName);
				if (iconName) {
					iconElement.className = `far fa-${iconName}`;
					console.log('🔵 [Tabs] Icono después de actualizar a regular:', iconElement.className);
				} else {
					console.warn('⚠️ [Tabs] No se pudo extraer el nombre del icono');
				}
			} else {
				console.warn('⚠️ [Tabs] No se encontró elemento <i> en el tab:', currentTabId);
			}
		});

		// Agregar active al tab clickeado y actualizar icono
		console.log('🔵 [Tabs] Agregando active a tab:', tabId);
		tabElement.classList.add('ubits-tab--active');
		console.log('🔵 [Tabs] Clases después de agregar active:', tabElement.className);

		// Actualizar icono del tab activo (solid)
		const activeIconElement = tabElement.querySelector('i');
		if (activeIconElement) {
			console.log('🔵 [Tabs] Icono activo antes de actualizar:', activeIconElement.className);
			const iconName = activeIconElement.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
			console.log('🔵 [Tabs] Nombre del icono activo extraído:', iconName);
			if (iconName) {
				activeIconElement.className = `fas fa-${iconName}`;
				console.log(
					'🔵 [Tabs] Icono activo después de actualizar a solid:',
					activeIconElement.className,
				);
			} else {
				console.warn('⚠️ [Tabs] No se pudo extraer el nombre del icono activo');
			}
		} else {
			console.warn('⚠️ [Tabs] No se encontró elemento <i> en el tab activo:', tabId);
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
	console.log('🔵 [Tabs] Agregando event listeners a', tabs.length, 'tabs');
	tabs.forEach((tab, index) => {
		const tabId = tab.getAttribute('data-tab-id');
		console.log('🔵 [Tabs] Agregando listener a tab', index, '- ID:', tabId);
		tab.setAttribute('data-listener-attached', 'true');
		tab.addEventListener('click', (e) => {
			console.log('🔵 [Tabs] Click detectado en tab:', tabId);
			e.preventDefault();
			handleTabClick(tab);
		});
		console.log('🔵 [Tabs] ✅ Listener agregado a tab:', tabId);
	});
	console.log('🔵 [Tabs] ✅ Todos los listeners agregados correctamente');
}

/**
 * Crea un componente Tabs interactivo en el DOM
 */
export function createTabs(options: TabsOptions, containerId?: string): HTMLElement {
	const container = containerId
		? document.getElementById(containerId) || document.createElement('div')
		: document.createElement('div');

	if (containerId && !container.id) {
		container.id = containerId;
	}

	container.innerHTML = renderTabs(options);

	// Inicializar listeners - buscar el elemento .ubits-tabs dentro del contenedor
	requestAnimationFrame(() => {
		const tabsElement = container.querySelector('.ubits-tabs') as HTMLElement;
		if (tabsElement) {
			initTabListeners(tabsElement, options);
		} else {
			// Fallback: usar el contenedor directamente si no se encuentra .ubits-tabs
			initTabListeners(container, options);
		}
	});

	return container;
}
