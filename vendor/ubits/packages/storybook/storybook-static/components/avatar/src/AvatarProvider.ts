import type { AvatarOptions } from './types/AvatarOptions';

/**
 * Función helper para renderizar badge (usando el componente badge existente)
 * Si renderBadge está disponible globalmente, lo usa; sino genera HTML manualmente
 */
function renderBadgeForAvatar(options: {
  type: 'dot' | 'number';
  size: 'md';
  variant: 'success' | 'error' | 'info' | 'warning' | 'primary';
  absolute: boolean;
  position: 'bottom-right';
  className: string;
  content?: string | number | null;
}): string {
  // Si renderBadge está disponible globalmente, usarlo
  if (typeof (window as any).renderBadge === 'function') {
    return (window as any).renderBadge(options);
  }
  
  // Fallback: generar HTML manualmente usando las clases del badge component
  const { type, size, variant, absolute, position, className, content } = options;
  const classes = [
    'ubits-badge',
    `ubits-badge--${size}`,
    type === 'dot' ? 'ubits-badge--dot' : '',
    type === 'number' ? 'ubits-badge--number' : '',
    `ubits-badge--${variant}`,
    absolute ? 'ubits-badge--absolute' : '',
    absolute && position ? `ubits-badge--absolute-${position}` : '',
    className
  ].filter(Boolean).join(' ');
  
  const badgeContent = type === 'number' && content !== undefined && content !== null 
    ? String(content) 
    : '';
  
  return `<span class="${classes}">${badgeContent}</span>`;
}

/**
 * Tamaños del avatar en píxeles
 */
const AVATAR_SIZES: Record<string, number> = {
  xs: 20,
  sm: 28,
  md: 36,      // 36px  
  lg: 40      // 40px             
};

/**
 * Tamaños del badge - siempre 10px (md) independientemente del tamaño del avatar
 */
const BADGE_SIZE = 'md' as const; // Siempre 10px

/**
 * Mapeo de colores de badge a variantes del badge component
 */
const BADGE_VARIANTS: Record<string, 'success' | 'error' | 'info' | 'warning' | 'primary'> = {
  green: 'success',
  red: 'error',
  blue: 'info',
  orange: 'warning',
  gray: 'primary'
};

/**
 * Padding del icono según el tamaño del avatar
 */
const ICON_PADDING: Record<string, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 10
};

/**
 * Tamaño de fuente para iniciales según el tamaño del avatar
 */
const INITIALS_FONT_SIZE: Record<string, string> = {
  xs: 'var(--font-body-xs-size, 11px)',
  sm: 'var(--font-body-sm-size, 13px)',
  md: 'var(--font-body-md-size, 16px)',
  lg: 'var(--font-body-lg-size, 18px)'
};

/**
 * Imagen por defecto del avatar
 */
const DEFAULT_AVATAR_IMAGE = '../assets/images/Profile-image.jpg';

/**
 * Determina la variante del avatar basada en las opciones
 */
function getAvatarVariant(options: AvatarOptions): 'photo' | 'initials' | 'icon' {
  if (options.imageUrl) return 'photo';
  if (options.initials) return 'initials';
  return 'icon';
}

/**
 * Genera las iniciales a partir de un texto
 */
function generateInitials(text: string): string {
  const words = text.trim().split(/\s+/);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Renderiza el HTML de un Avatar
 */
export function renderAvatar(options: AvatarOptions = {} as AvatarOptions): string {
  const {
    imageUrl,
    initials,
    icon = 'user',
    size = 'md',
    badgeColor,
    badgeContent,
    alt = 'Avatar',
    className = '',
    onClick
  } = options;

  const variant = getAvatarVariant(options);
  const avatarSize = AVATAR_SIZES[size] || AVATAR_SIZES.md;
  const iconPadding = ICON_PADDING[size] || ICON_PADDING.md;
  const initialsFontSize = INITIALS_FONT_SIZE[size] || INITIALS_FONT_SIZE.md;

  // Construir clases
  const classes = [
    'ubits-avatar',
    `ubits-avatar--${size}`,
    `ubits-avatar--${variant}`,
    className
  ].filter(Boolean).join(' ');

  // Estilos inline para el tamaño
  const avatarStyles = `
    width: ${avatarSize}px;
    height: ${avatarSize}px;
    min-width: ${avatarSize}px;
    min-height: ${avatarSize}px;
  `.trim();

  // Contenido del avatar según la variante
  let avatarContent = '';

  if (variant === 'photo' && imageUrl) {
    avatarContent = `<div class="ubits-avatar-image-container"><img src="${imageUrl}" alt="${alt}" class="ubits-avatar-image" /></div>`;
  } else if (variant === 'initials') {
    const displayInitials = initials ? generateInitials(initials) : '';
    avatarContent = `<span class="ubits-avatar-initials" style="font-size: ${initialsFontSize};">${displayInitials}</span>`;
  } else {
    // Variante icon
    const iconSize = avatarSize - (iconPadding * 2);
    avatarContent = `<i class="far fa-${icon}" style="font-size: ${iconSize}px;"></i>`;
  }

  // Badge HTML usando el componente badge existente
  // Siempre usa tamaño md (10px) y permite contenido (texto/números)
  const badgeHTML = badgeColor
    ? renderBadgeForAvatar({
        type: badgeContent !== undefined && badgeContent !== null && badgeContent !== '' ? 'number' : 'dot',
        size: BADGE_SIZE,
        variant: BADGE_VARIANTS[badgeColor] || 'success',
        absolute: true,
        position: 'bottom-right',
        className: 'ubits-avatar-badge-wrapper',
        content: badgeContent
      })
    : '';

  // Construir el HTML completo
  return `
    <div class="${classes}" style="${avatarStyles}" ${onClick ? 'role="button" tabindex="0"' : ''} data-variant="${variant}">
      ${avatarContent}
      ${badgeHTML}
    </div>
  `.trim();
}

/**
 * Crea un elemento Avatar programáticamente
 */
export function createAvatar(options: AvatarOptions = {} as AvatarOptions): HTMLDivElement {
  const div = document.createElement('div');
  div.innerHTML = renderAvatar(options);
  const avatar = div.querySelector('.ubits-avatar') as HTMLDivElement;

  // Agregar event listener si hay onClick
  if (options.onClick && avatar) {
    avatar.addEventListener('click', options.onClick);
    avatar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        options.onClick?.(e as any);
      }
    });
  }

  return avatar;
}

