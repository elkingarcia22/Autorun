/**
 * Sidebar Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderSidebar, createSidebar } from '../../../../components/sidebar/src/SidebarProvider';
import { getSidebarConfig } from '../../../../components/sidebar/src/configs/sidebarVariants';
import type { SidebarOptions, SidebarVariant } from '../../../../components/sidebar/src/types/SidebarOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/sidebar/src/styles/sidebar.css';

const meta: Meta<
	SidebarOptions & {
		variant?: SidebarVariant;
		activeButton?: string;
	}
> = {
	title: 'Navegación/Sidebar',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Sidebar UBITS de navegación lateral con 2 variantes (colaborador y admin). Incluye tooltips internos, menú de perfil interno, dark mode toggle y ajuste dinámico de altura. Ancho fijo 96px.',
			},
		},
		layout: 'fullscreen',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-sidebar',
			api: {
				create: 'window.UBITS.Sidebar.create',
				tag: '<ubits-sidebar>',
			},
			dependsOn: {
				required: [], // Sidebar no depende de otros componentes
				optional: [], // No hay componentes opcionales
			},
			internals: [
				'⚙️-functional-tooltip', // Tooltips internos para botones
				'⚙️-functional-profile-menu', // Menú de perfil interno
				'⚙️-functional-dark-mode-toggle', // Toggle de dark mode interno
			],
			slots: {
				header: [], // Logo es interno
				body: [], // Botones de navegación son internos
				footer: [], // Footer buttons y avatar son internos
			},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-border-1',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['containerId', 'bodyButtons'],
			},
		}),
	},
	args: {
		containerId: 'sidebar-story-container',
		variant: 'colaborador',
		activeButton: '',
		darkModeEnabled: true,
		logoImage: '/images/Ubits-logo.svg',
		avatarImage: '/images/Profile-image.jpg',
	} as SidebarOptions & { variant?: SidebarVariant; activeButton?: string },
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['colaborador', 'admin'],
			description: 'Variante del sidebar: colaborador o admin',
			table: {
				defaultValue: { summary: 'colaborador' },
				type: { summary: 'colaborador | admin' },
			},
		},
		activeButton: {
			control: { type: 'select' },
			options: [
				'',
				'admin',
				'aprendizaje',
				'diagnóstico',
				'desempeño',
				'encuestas',
				'reclutamiento',
				'tareas',
				'ubits-ai',
				'inicio',
				'empresa',
			],
			description: 'Sección activa del sidebar (depende de la variante)',
			table: {
				defaultValue: { summary: '' },
				type: { summary: 'string' },
			},
		},
		darkModeEnabled: {
			control: { type: 'boolean' },
			description: 'Si el dark mode toggle está habilitado',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
	},
};

export default meta;
type Story = StoryObj<SidebarOptions & { variant?: SidebarVariant; activeButton?: string }>;

// Función helper para obtener configuración según variante
function getSidebarButtons(variant: SidebarVariant) {
	const config = getSidebarConfig(variant);
	return {
		bodyButtons: config.bodyButtons,
		footerButtons: config.footerButtons,
		profileMenuItems: config.profileMenuItems,
	};
}

// Función para actualizar botón activo
function updateActiveButton(buttons: any[], activeButton: string) {
	return buttons.map((btn) => ({
		...btn,
		state: btn.section === activeButton ? ('active' as const) : ('default' as const),
	}));
}

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		containerId: 'sidebar-implementation-container',
		variant: 'colaborador',
		activeButton: '',
		darkModeEnabled: true,
		logoImage: '/images/Ubits-logo.svg',
		avatarImage: '/images/Profile-image.jpg',
	} as SidebarOptions & { variant?: SidebarVariant; activeButton?: string },
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="sidebar-implementation-container" style="position: relative; width: 96px; height: 650px;"></div>

// 2. Crear sidebar con configuración explícita
window.UBITS.Sidebar.create({
  containerId: 'sidebar-implementation-container',
  variant: 'colaborador', // o 'admin'
  bodyButtons: [
    { section: 'admin', icon: 'fa-laptop', tooltip: 'Administrador', href: 'admin.html' },
    { section: 'aprendizaje', icon: 'fa-graduation-cap', tooltip: 'Aprendizaje', href: 'home-learn.html' },
    { section: 'diagnóstico', icon: 'fa-chart-mixed', tooltip: 'Diagnóstico', href: 'diagnostico.html' },
    { section: 'desempeño', icon: 'fa-bars-progress', tooltip: 'Desempeño', href: 'evaluaciones-360.html' },
    { section: 'encuestas', icon: 'fa-clipboard', tooltip: 'Encuestas', href: 'encuestas.html' },
    { section: 'reclutamiento', icon: 'fa-users', tooltip: 'Reclutamiento', href: 'reclutamiento.html' },
    { section: 'tareas', icon: 'fa-layer-group', tooltip: 'Tareas', href: 'planes.html' },
    { section: 'ubits-ai', icon: 'fa-sparkles', tooltip: 'UBITS AI', href: 'ubits-ai.html' }
  ],
  footerButtons: [], // Solo en variante 'admin'
  profileMenuItems: [
    { id: 'perfil', icon: 'fa-user', label: 'Ver mi perfil' },
    { id: 'admin-mode', icon: 'fa-laptop', label: 'Modo Administrador', href: 'template-admin.html' },
    { id: 'password', icon: 'fa-key', label: 'Cambio de contraseña' },
    { id: 'logout', icon: 'fa-sign-out', label: 'Cerrar sesión' }
  ],
  logoImage: '/images/Ubits-logo.svg',
  avatarImage: '/images/Profile-image.jpg',
  darkModeEnabled: true,
  height: 650
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-sidebar');
		container.setAttribute('data-ubits-component', 'Sidebar');
		container.id = args.containerId || 'sidebar-implementation-container';
		container.style.cssText = `
      position: relative;
      width: 96px;
      height: 650px;
      flex-shrink: 0;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

		const variant = args.variant || 'colaborador';
		const activeButton = args.activeButton || '';
		const config = getSidebarButtons(variant);

		// Actualizar botones con estado activo
		const bodyButtons = updateActiveButton(config.bodyButtons, activeButton);
		const footerButtons = activeButton
			? updateActiveButton(config.footerButtons || [], activeButton)
			: config.footerButtons || [];

		const sidebarOptions: SidebarOptions = {
			containerId: container.id,
			variant: variant,
			bodyButtons: bodyButtons,
			footerButtons: footerButtons,
			profileMenuItems: config.profileMenuItems,
			logoHref: variant === 'admin' ? 'admin.html' : 'index.html',
			logoImage: args.logoImage || '/images/Ubits-logo.svg',
			avatarImage: args.avatarImage || '/images/Profile-image.jpg',
			darkModeEnabled: args.darkModeEnabled !== false,
			height: 650,
			onActiveButtonChange: (section) => {
				// Active button changed
			},
			onDarkModeToggle: (isDark) => {
				// Dark mode toggled
			},
			onAvatarClick: () => {
				// Avatar clicked
			},
		};

		try {
			createSidebar(sidebarOptions);
		} catch (error) {
			console.error('Error creating sidebar:', error);
			const sidebarHTML = renderSidebar(sidebarOptions);
			container.innerHTML = sidebarHTML;
		}

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		containerId: 'sidebar-story-container',
		variant: 'colaborador',
		activeButton: '',
		darkModeEnabled: true,
		logoImage: '/images/Ubits-logo.svg',
		avatarImage: '/images/Profile-image.jpg',
	} as SidebarOptions & { variant?: SidebarVariant; activeButton?: string },
	render: (args) => {
		// Crear un wrapper más amplio para el sidebar y la info (horizontal)
		let wrapper = document.getElementById('sidebar-story-wrapper');
		if (!wrapper) {
			wrapper = document.createElement('div');
			wrapper.id = 'sidebar-story-wrapper';
			wrapper.style.cssText = `
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      `;
			document.body.appendChild(wrapper);
		} else {
			wrapper.innerHTML = '';
			wrapper.style.cssText = `
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      `;
		}

		// Contenedor solo para el sidebar
		const container = document.createElement('div');
		container.id = args.containerId || 'sidebar-story-container';
		container.style.cssText = `
      position: relative;
      width: 96px;
      height: 650px;
      flex-shrink: 0;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

		// Agregar el contenedor al wrapper ANTES de crear el sidebar
		wrapper.appendChild(container);

		const variant = args.variant || 'colaborador';
		const activeButton = args.activeButton || '';
		const config = getSidebarButtons(variant);

		// Actualizar botones con estado activo
		const bodyButtons = updateActiveButton(config.bodyButtons, activeButton);
		const footerButtons = activeButton
			? updateActiveButton(config.footerButtons || [], activeButton)
			: config.footerButtons || [];

		const sidebarOptions: SidebarOptions = {
			containerId: container.id,
			variant: variant,
			bodyButtons: bodyButtons,
			footerButtons: footerButtons,
			profileMenuItems: config.profileMenuItems,
			logoHref: variant === 'admin' ? 'admin.html' : 'index.html',
			logoImage: args.logoImage || '/images/Ubits-logo.svg',
			avatarImage: args.avatarImage || '/images/Profile-image.jpg',
			darkModeEnabled: args.darkModeEnabled !== false,
			height: 650,
			onActiveButtonChange: (section) => {
				// Active button changed
			},
			onDarkModeToggle: (isDark) => {
				// Dark mode toggled
			},
			onAvatarClick: () => {
				// Avatar clicked
			},
		};

		try {
			createSidebar(sidebarOptions);
		} catch (error) {
			console.error('Error creating sidebar:', error);
			const sidebarHTML = renderSidebar(sidebarOptions);
			container.innerHTML = sidebarHTML;
		}

		// Agregar información del sidebar (formato horizontal con CSS Grid) - AL LADO del sidebar
		const info = document.createElement('div');
		info.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-2);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      line-height: 1.6;
      flex: 1;
      min-width: 400px;
      max-width: 600px;
      font-family: var(--font-family-noto-sans-font-family);
      margin-top: 80px;
    `;

		// Crear el contenedor de información usando CSS Grid
		const infoGrid = document.createElement('div');
		infoGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 12px 32px;
      margin-bottom: 12px;
      align-items: baseline;
    `;

		infoGrid.innerHTML = `
      <div style="white-space: nowrap;"><strong>Variante:</strong> <span style="font-weight: 400;">${variant === 'colaborador' ? 'Colaborador' : 'Admin'}</span></div>
      <div style="white-space: nowrap;"><strong>Botón activo:</strong> <span style="font-weight: 400;">${activeButton || 'Ninguno'}</span></div>
      <div style="white-space: nowrap;"><strong>Dark mode:</strong> <span style="font-weight: 400;">${args.darkModeEnabled !== false ? 'Habilitado' : 'Deshabilitado'}</span></div>
    `;

		info.appendChild(infoGrid);

		// Agregar el texto de instrucciones
		const instructions = document.createElement('div');
		instructions.style.cssText = `
      border-top: 1px solid var(--modifiers-normal-color-light-border-1);
      font-style: italic;
    `;
		instructions.textContent =
			'Haz hover sobre los botones para ver los tooltips. Haz hover sobre el avatar para ver el menú de perfil. Haz clic en el botón de dark mode para cambiar el tema.';
		info.appendChild(instructions);

		wrapper.appendChild(info);

		return wrapper;
	},
};
