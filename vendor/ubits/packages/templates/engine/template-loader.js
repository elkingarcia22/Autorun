/**
 * Template Loader
 * Carga componentes dinámicamente desde add-ons
 * Usa configuración centralizada de productos
 */

class TemplateLoader {
	constructor() {
		this.loadedComponents = new Map();
		this.componentStyles = new Set();
		this.initialized = false;
	}

	/**
	 * Inicializa el Template Loader
	 */
	init() {
		if (this.initialized) return;

		// Cargar componentes base necesarios
		this.loadBaseStyles();

		this.initialized = true;
		console.log('✅ Template Loader inicializado');
	}

	/**
	 * Carga los estilos base necesarios
	 */
	loadBaseStyles() {
		// Los estilos ya están cargados en el HTML
		// Esta función puede usarse para cargar estilos dinámicamente si es necesario
	}

	/**
	 * Carga un componente usando el loader existente
	 * @param {string} componentName - Nombre del componente ('sidebar', 'subnav', 'tabbar')
	 * @param {object} config - Configuración del componente
	 * @param {string} containerId - ID del contenedor donde renderizar
	 */
	async loadComponent(componentName, config, containerId) {
		console.log(`📦 Cargando componente: ${componentName} en contenedor: ${containerId}`);
		console.log(`[loadComponent] Verificando contenedor "${containerId}"...`);

		const container = document.getElementById(containerId);
		if (!container) {
			console.error(`[loadComponent] ❌ Contenedor "${containerId}" NO EXISTE en el DOM`);
			return null;
		}
		console.log(`[loadComponent] ✅ Contenedor "${containerId}" encontrado`);

		try {
			switch (componentName.toLowerCase()) {
				case 'sidebar':
					console.log('[loadComponent] Verificando window.createSidebar...');

					// Esperar a que createSidebar esté disponible
					if (typeof window.createSidebar !== 'function') {
						console.log('[loadComponent] ⏳ Esperando a window.createSidebar...');
						try {
							await this.waitForGlobal('createSidebar');
						} catch (e) {
							console.error(`[loadComponent] ❌ Timeout esperando a createSidebar: ${e.message}`);
							// Report failure to Autorun Boot Report if possible
							if (window.__AUTORUN_BOOT_REPORT__) {
								window.__AUTORUN_BOOT_REPORT__.errors.push("Missing global: createSidebar");
								window.__AUTORUN_BOOT_REPORT__.status = "FAILED";
							}
							return null;
						}
					}

					if (typeof window.createSidebar === 'function') {
						console.log('[loadComponent] ✅ createSidebar es una función, llamando...');
						const sidebarOptions = {
							...config,
							containerId: containerId,
							onDarkModeToggle: (isDark) => {
								if (window.UBITS_ThemeManager) {
									window.UBITS_ThemeManager.setTheme(isDark ? 'dark' : 'light');
								}
								if (config.onDarkModeToggle) {
									config.onDarkModeToggle(isDark);
								}
							},
						};
						console.log(
							'[loadComponent] Opciones para createSidebar:',
							JSON.stringify(sidebarOptions, null, 2),
						);
						const sidebarElement = window.createSidebar(sidebarOptions);
						console.log('[loadComponent] createSidebar retornó:', sidebarElement);
						this.loadedComponents.set(containerId, {
							type: 'sidebar',
							element: sidebarElement,
						});
						return sidebarElement;
					} else {
						console.error(
							'[loadComponent] ❌ window.createSidebar NO es una función (incluso después de esperar):',
							typeof window.createSidebar,
						);
					}
					break;

				case 'subnav':
				case 'sub-nav':
					if (typeof window.createSubNav === 'function') {
						const subNavElement = window.createSubNav({
							...config,
							containerId: containerId,
						});
						this.loadedComponents.set(containerId, {
							type: 'subnav',
							element: subNavElement,
						});
						return subNavElement;
					}
					break;

				case 'tabbar':
				case 'tab-bar':
					console.log('[loadComponent] Verificando window.createTabBar...');

					// Esperar a que createTabBar esté disponible
					if (typeof window.createTabBar !== 'function') {
						console.log('[loadComponent] ⏳ Esperando a window.createTabBar...');
						try {
							await this.waitForGlobal('createTabBar');
						} catch (e) {
							console.error(`[loadComponent] ❌ Timeout esperando a createTabBar: ${e.message}`);
							// Report failure to Autorun Boot Report if possible
							if (window.__AUTORUN_BOOT_REPORT__) {
								window.__AUTORUN_BOOT_REPORT__.errors.push("Missing global: createTabBar");
								window.__AUTORUN_BOOT_REPORT__.status = "FAILED";
							}
							return null;
						}
					}

					if (typeof window.createTabBar === 'function') {
						console.log('[loadComponent] ✅ createTabBar es una función, llamando...');
						const tabBarConfig = {
							...config,
							containerId: containerId,
							visible: window.UBITS_ResponsiveManager
								? !window.UBITS_ResponsiveManager.isDesktopOrMore()
								: window.innerWidth < 1024,
							onDarkModeToggle: (isDark) => {
								if (window.UBITS_ThemeManager) {
									window.UBITS_ThemeManager.setTheme(isDark ? 'dark' : 'light');
								}
								if (config.onDarkModeToggle) {
									config.onDarkModeToggle(isDark);
								}
							},
							// Preservar callbacks originales si existen
							onTabChange: config.onTabChange,
							onFloatingMenuItemClick: config.onFloatingMenuItemClick,
							onProfileMenuItemClick: config.onProfileMenuItemClick,
						};
						console.log(
							'[loadComponent] Opciones para createTabBar:',
							JSON.stringify(tabBarConfig, null, 2),
						);
						const tabBarElement = window.createTabBar(tabBarConfig);
						console.log('[loadComponent] createTabBar retornó:', tabBarElement);
						this.loadedComponents.set(containerId, {
							type: 'tabbar',
							element: tabBarElement,
						});
						return tabBarElement;
					} else {
						console.error(
							'[loadComponent] ❌ window.createTabBar NO es una función (incluso después de esperar):',
							typeof window.createTabBar,
						);
					}
					break;

				default:
					console.error(`❌ Componente desconocido: ${componentName}`);
					return null;
			}
		} catch (error) {
			console.error(`❌ Error cargando componente ${componentName}:`, error);
			console.error('Stack:', error.stack);
			return null;
		}
	}

	/**
	 * Carga todos los componentes de un producto
	 * @param {object} productConfig - Configuración del producto
	 * @param {object} containerIds - IDs de los contenedores
	 */
	async loadProduct(productConfig, containerIds) {
		console.log(`🚀 Cargando producto: ${productConfig.name}`);
		console.log('[TemplateLoader] ProductConfig:', JSON.stringify(productConfig, null, 2));
		console.log('[TemplateLoader] ContainerIds:', containerIds);

		const results = {};

		// Cargar Sidebar
		if (containerIds.sidebar && productConfig.sidebar) {
			console.log('[TemplateLoader] 📦 Intentando cargar sidebar...');
			console.log(
				'[TemplateLoader] Sidebar config:',
				JSON.stringify(productConfig.sidebar, null, 2),
			);
			results.sidebar = await this.loadComponent('sidebar', productConfig.sidebar, containerIds.sidebar);
			console.log('[TemplateLoader] ✅ Sidebar resultado:', results.sidebar);
		} else {
			console.warn('[TemplateLoader] ⚠️ No se puede cargar sidebar:', {
				hasContainer: !!containerIds.sidebar,
				hasConfig: !!productConfig.sidebar,
			});
		}

		// ⚠️ IMPORTANTE: NO cargar SubNav aquí
		// El SubNav debe ser manejado EXCLUSIVAMENTE por ContentManager
		// porque depende de qué sección del Sidebar esté activa
		// El ContentManager lo actualizará cuando se cambie de sección
		if (containerIds.subnav) {
			// Solo asegurar que el contenedor existe, pero NO cargar configuración del producto
			const subNavContainer = document.getElementById(containerIds.subnav);
			if (subNavContainer) {
				// Dejar vacío - ContentManager lo manejará
				subNavContainer.innerHTML = '';
				console.log('📌 [TemplateLoader] SubNav container preparado, esperando ContentManager');
			}
		}

		// Cargar TabBar
		if (containerIds.tabbar && productConfig.tabbar) {
			console.log('[TemplateLoader] 📦 Intentando cargar tabbar...');
			console.log('[TemplateLoader] Tabbar config:', JSON.stringify(productConfig.tabbar, null, 2));
			results.tabbar = await this.loadComponent('tabbar', productConfig.tabbar, containerIds.tabbar);
			console.log('[TemplateLoader] ✅ Tabbar resultado:', results.tabbar);
		} else {
			console.warn('[TemplateLoader] ⚠️ No se puede cargar tabbar:', {
				hasContainer: !!containerIds.tabbar,
				hasConfig: !!productConfig.tabbar,
			});
		}

		console.log('✅ Producto cargado:', results);
		return results;
	}

	/**
	 * Recarga un componente (útil para hot reload)
	 * @param {string} containerId - ID del contenedor
	 */
	reloadComponent(containerId) {
		const component = this.loadedComponents.get(containerId);
		if (!component) {
			console.warn(`⚠️ Componente no encontrado en contenedor: ${containerId}`);
			return;
		}

		console.log(`🔄 Recargando componente: ${component.type} en ${containerId}`);

		// Limpiar contenedor
		const container = document.getElementById(containerId);
		if (container) {
			container.innerHTML = '';
		}

		// El componente debería recargarse desde la configuración del producto
		// Esto se implementaría con hot-reload
	}

	/**
	 * Espera a que una variable global esté disponible
	 * @param {string} name - Nombre de la variable global
	 * @param {number} timeout - Timeout en ms (default 10000)
	 */
	waitForGlobal(name, timeout = 10000) {
		return new Promise((resolve, reject) => {
			if (typeof window[name] !== 'undefined') {
				resolve(window[name]);
				return;
			}

			console.log(`⏳ Waiting for global: ${name}`);
			const startTime = Date.now();
			const interval = setInterval(() => {
				if (typeof window[name] !== 'undefined') {
					clearInterval(interval);
					console.log(`✅ Global found: ${name}`);
					resolve(window[name]);
				} else if (Date.now() - startTime > timeout) {
					clearInterval(interval);
					reject(new Error(`Timeout waiting for global: ${name}`));
				}
			}, 100);
		});
	}
}

// Crear instancia global solo si no existe
if (!window.UBITS_TemplateLoader) {
	window.UBITS_TemplateLoader = new TemplateLoader();

	// Inicializar automáticamente cuando el DOM esté listo
	// ⚠️ PREVENIR múltiples inicializaciones
	let templateLoaderInitialized = false;
	const initTemplateLoader = () => {
		if (templateLoaderInitialized) {
			console.warn('⚠️ [TemplateLoader] Ya inicializado, ignorando...');
			return;
		}
		templateLoaderInitialized = true;
		window.UBITS_TemplateLoader.init();
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initTemplateLoader);
	} else {
		initTemplateLoader();
	}
}

console.log('✅ Template Loader cargado');
