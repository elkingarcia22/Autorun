/**
 * Tipos para el componente Welcome
 */

export interface WelcomeFeature {
	icon?: string;
	text: string;
}

export interface WelcomeOptions {
	/**
	 * Título principal
	 */
	title?: string;

	/**
	 * Subtítulo/descripción
	 */
	subtitle?: string;

	/**
	 * Lista de características/features
	 */
	features?: WelcomeFeature[];

	/**
	 * Mostrar banner superior
	 * @default true
	 */
	showBanner?: boolean;

	/**
	 * Texto del banner
	 * @default 'Construyamos juntos'
	 */
	bannerText?: string;

	/**
	 * Icono del banner (FontAwesome)
	 * @default 'fa-rocket'
	 */
	bannerIcon?: string;

	/**
	 * Mostrar caja de información
	 * @default true
	 */
	showInfoBox?: boolean;

	/**
	 * Título de la caja de información
	 * @default '¡IMPORTANTE!'
	 */
	infoBoxTitle?: string;

	/**
	 * Texto de la caja de información
	 */
	infoBoxText?: string;

	/**
	 * Texto del botón
	 * @default 'Comenzar'
	 */
	buttonText?: string;

	/**
	 * Icono del botón (FontAwesome)
	 * @default 'fa-rocket'
	 */
	buttonIcon?: string;

	/**
	 * Variante del botón
	 * @default 'primary'
	 */
	buttonVariant?: 'primary' | 'secondary' | 'tertiary';

	/**
	 * Tamaño del botón
	 * @default 'lg'
	 */
	buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	/**
	 * Callback cuando se hace clic en el botón "Comenzar"
	 */
	onStart?: () => void;

	/**
	 * URL de la imagen (opcional)
	 */
	imageUrl?: string;

	/**
	 * Alt text de la imagen
	 * @default 'Prototipo AUTORUN'
	 */
	imageAlt?: string;

	/**
	 * Tamaño de la imagen
	 * @default 'medium'
	 */
	imageSize?: 'small' | 'medium' | 'large';

	/**
	 * Layout de la página
	 * @default 'no-image'
	 */
	layout?: 'image-right' | 'image-left' | 'no-image';

	/**
	 * Alineación del texto
	 * @default 'left'
	 */
	textAlignment?: 'left' | 'center';

	/**
	 * Alineación del botón
	 * @default 'center'
	 */
	buttonAlignment?: 'left' | 'center' | 'right';

	/**
	 * Estilo del contenedor
	 * @default 'default'
	 */
	containerStyle?: 'default' | 'compact' | 'wide' | 'minimal';

	/**
	 * Clases CSS adicionales
	 */
	className?: string;
}
