import type { Meta, StoryObj } from '@storybook/html';
import { renderMenu, createMenu } from '../../../../components/menu/src/MenuProvider';
import type {
	MenuOptions,
	MenuSection,
	MenuItem,
	MenuUserInfo,
} from '../../../../components/menu/src/types/MenuOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/menu/src/styles/menu.css';
import '../../../../components/badge/src/styles/badge.css';

/**
 * Menu Component Stories
 *
 * Componente de navegación lateral con secciones, items, shortcuts, badges e información de usuario.
 */
const meta = {
	title: 'Navegación/Menu',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Menu UBITS de navegación lateral con secciones, items, shortcuts, badges e información de usuario. Usa tokens UBITS para colores, tipografía y espaciado.',
			},
		},
		// ⭐ CONTRATO UBITS para Autorun
		ubits: createUBITSContract({
			componentId: '🧩-ux-menu',
			api: {
				create: 'window.UBITS.Menu.create',
				tag: '<ubits-menu>',
			},
			dependsOn: {
				required: [], // Menu no requiere otros componentes UBITS
				optional: ['🧩-ux-badge'], // Badge es opcional (para badges en items)
			},
			internals: [], // Menu no tiene componentes internos privados
			slots: {}, // Menu no tiene slots
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-1-low',
				'--modifiers-normal-color-light-fg-1-disabled',
				'--modifiers-normal-color-light-feedback-bg-success',
				'--modifiers-normal-color-light-feedback-bg-warning',
				'--modifiers-normal-color-light-feedback-bg-error',
				'--modifiers-normal-color-light-feedback-bg-info',
				'--font-family-noto-sans-font-family',
				'--modifiers-normal-body-sm-regular-fontsize',
				'--modifiers-normal-body-sm-regular-lineheight',
				'--modifiers-normal-body-md-regular-fontsize',
				'--modifiers-normal-body-md-regular-lineheight',
				'--weight-semibold',
				'--weight-medium',
				'--weight-regular',
				'--spacing-xs',
				'--spacing-sm',
				'--spacing-md',
				'--spacing-lg',
				'--radius-sm',
				'--radius-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['sections'],
			},
		}),
	},
	argTypes: {
		containerId: {
			control: false,
			description: 'ID del contenedor donde se renderizará el menú (opcional)',
			table: {
				type: { summary: 'string' },
			},
		},
		logoImage: {
			control: { type: 'text' },
			description: 'URL de la imagen del logo',
			table: {
				type: { summary: 'string' },
			},
		},
		appName: {
			control: { type: 'text' },
			description: 'Nombre de la aplicación',
			table: {
				type: { summary: 'string' },
			},
		},
		logoHref: {
			control: { type: 'text' },
			description: 'URL a la que redirige el logo',
			table: {
				type: { summary: 'string' },
			},
		},
		width: {
			control: { type: 'number' },
			description: 'Ancho del menú en píxeles',
			table: {
				type: { summary: 'number | string' },
				defaultValue: { summary: 280 },
			},
		},
		sections: {
			control: { type: 'object' },
			description: 'Secciones del menú (requerido)',
			table: {
				type: { summary: 'MenuSection[]' },
			},
		},
		userInfo: {
			control: { type: 'object' },
			description: 'Información del usuario (opcional)',
			table: {
				type: { summary: 'MenuUserInfo' },
			},
		},
		onActiveItemChange: {
			control: false,
			description: 'Callback cuando cambia el item activo',
			table: {
				type: { summary: '(itemId: string, sectionId: string) => void' },
			},
		},
	},
} satisfies Meta<MenuOptions>;

export default meta;
type Story = StoryObj<MenuOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		containerId: 'menu-implementation-container',
		logoImage: '/images/autoframe-logo-light.svg',
		appName: 'AUTOFROME',
		logoHref: '#',
		width: 280,
		sections: [
			{
				id: 'documents',
				title: 'Documents',
				items: [
					{
						id: 'new',
						label: 'New',
						icon: 'plus',
						iconStyle: 'regular',
						active: false,
					},
					{
						id: 'search',
						label: 'Search',
						icon: 'search',
						iconStyle: 'regular',
						active: false,
					},
				],
			},
			{
				id: 'profile',
				title: 'Profile',
				items: [
					{
						id: 'settings',
						label: 'Settings',
						icon: 'gear',
						iconStyle: 'regular',
						active: true,
					},
					{
						id: 'messages',
						label: 'Messages',
						icon: 'envelope',
						iconStyle: 'regular',
						badge: {
							content: 2,
							variant: 'error',
						},
						active: false,
					},
				],
			},
		],
		userInfo: {
			avatarImage: '/images/Profile-image.jpg',
			name: 'Amy Elsner',
			role: 'Admin',
		},
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="menu-implementation-container"></div>

// 2. Crear Menu
window.UBITS.Menu.create({
  containerId: 'menu-implementation-container',
  logoImage: '/images/autoframe-logo-light.svg',
  appName: 'AUTOFROME',
  logoHref: '#',
  width: 280,
  sections: [
    {
      id: 'documents',
      title: 'Documents',
      items: [
        {
          id: 'new',
          label: 'New',
          icon: 'plus',
          iconStyle: 'regular',
          active: false
        },
        {
          id: 'search',
          label: 'Search',
          icon: 'search',
          iconStyle: 'regular',
          active: false
        }
      ]
    },
    {
      id: 'profile',
      title: 'Profile',
      items: [
        {
          id: 'settings',
          label: 'Settings',
          icon: 'gear',
          iconStyle: 'regular',
          active: true
        },
        {
          id: 'messages',
          label: 'Messages',
          icon: 'envelope',
          iconStyle: 'regular',
          badge: {
            content: 2,
            variant: 'error'
          },
          active: false
        }
      ]
    }
  ],
  userInfo: {
    avatarImage: '/images/Profile-image.jpg',
    name: 'Amy Elsner',
    role: 'Admin'
  },
  onActiveItemChange: (itemId, sectionId) => {
    console.log('Item activo cambiado:', itemId, sectionId);
  }
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-menu');
		container.setAttribute('data-ubits-component', 'Menu');
		container.style.cssText = `
      display: flex;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
      width: 100%;
      height: 600px;
    `;

		// Crear contenedor interno para el Menu
		const menuContainer = document.createElement('div');
		menuContainer.id = args.containerId || 'menu-implementation-container';
		menuContainer.style.cssText = `
      position: relative;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;
		container.appendChild(menuContainer);

		// Crear Menu
		try {
			createMenu({
				containerId: menuContainer.id,
				logoImage: args.logoImage,
				appName: args.appName,
				logoHref: args.logoHref,
				width: args.width || 280,
				sections: args.sections || [],
				userInfo: args.userInfo,
				onActiveItemChange: args.onActiveItemChange,
			});
		} catch (error) {
			console.error('Error creando Menu:', error);
			menuContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		return container;
	},
};

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
	args: {
		containerId: 'menu-story-container',
		logoImage: '/images/autoframe-logo-light.svg',
		appName: 'AUTOFROME',
		logoHref: '#',
		width: 280,
		sections: [
			{
				id: 'documents',
				title: 'Documents',
				items: [
					{
						id: 'new',
						label: 'New',
						icon: 'plus',
						iconStyle: 'regular',
						active: false,
					},
					{
						id: 'search',
						label: 'Search',
						icon: 'search',
						iconStyle: 'regular',
						active: false,
					},
				],
			},
			{
				id: 'profile',
				title: 'Profile',
				items: [
					{
						id: 'settings',
						label: 'Settings',
						icon: 'gear',
						iconStyle: 'regular',
						active: true,
					},
					{
						id: 'messages',
						label: 'Messages',
						icon: 'envelope',
						iconStyle: 'regular',
						badge: {
							content: 2,
							variant: 'error',
						},
						active: false,
					},
					{
						id: 'logout',
						label: 'Logout',
						icon: 'sign-out',
						iconStyle: 'regular',
						active: false,
					},
				],
			},
		],
		userInfo: {
			avatarImage: '/images/Profile-image.jpg',
			name: 'Amy Elsner',
			role: 'Admin',
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      display: flex;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
    `;

		// Contenedor del menú
		const menuContainer = document.createElement('div');
		menuContainer.id = args.containerId || 'menu-story-container';
		menuContainer.style.cssText = `
      position: relative;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;

		// Crear Menu
		try {
			createMenu({
				containerId: menuContainer.id,
				logoImage: args.logoImage,
				appName: args.appName,
				logoHref: args.logoHref,
				width: args.width || 280,
				sections: args.sections || [],
				userInfo: args.userInfo,
				onActiveItemChange: (itemId, sectionId) => {
					console.log('Item activo cambiado:', itemId, sectionId);
				},
			});
		} catch (error) {
			console.error('Error creando Menu:', error);
			menuContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		container.appendChild(menuContainer);

		// Panel de información (opcional)
		const infoPanel = document.createElement('div');
		infoPanel.style.cssText = `
      flex: 1;
      background: var(--modifiers-normal-color-light-bg-1);
      border-left: 1px solid var(--modifiers-normal-color-light-border-1);
      overflow-y: auto;
      padding: 24px;
      font-family: var(--font-family-noto-sans-font-family);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
    `;

		infoPanel.innerHTML = `
      <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Menu</h3>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Logo de Autoframe y nombre de la aplicación</li>
        <li>Secciones con títulos</li>
        <li>Items con iconos, texto y badges</li>
        <li>Información del usuario al final</li>
      </ul>
      <p style="margin-top: 16px;">
        <strong>Nota:</strong> Usa los controles en el panel lateral para personalizar todos los aspectos del menú.
      </p>
    `;

		container.appendChild(infoPanel);

		return container;
	},
};
