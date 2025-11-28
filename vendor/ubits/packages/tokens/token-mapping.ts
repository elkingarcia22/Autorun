/**
 * Token Mapping: Tokens Antiguos → Tokens Nuevos (Figma)
 * 
 * Este archivo contiene el mapeo completo de tokens antiguos (--ubits-*)
 * a tokens nuevos (--modifiers-normal-*, --color-*) del sistema Figma.
 * 
 * Se usa para migración automática de componentes.
 */

export interface TokenMapping {
  /** Token antiguo (--ubits-*) */
  old: string;
  /** Token nuevo (--modifiers-normal-* o --color-*) */
  new: string;
  /** Categoría del token */
  category: 'accent' | 'foreground' | 'background' | 'border' | 'button' | 'spacing' | 'typography' | 'effects' | 'other';
  /** Notas sobre el mapeo */
  notes?: string;
}

/**
 * Mapeo completo de tokens antiguos a nuevos
 * 
 * Estructura:
 * - Normal: tokens sin modificadores (modifiers-normal)
 * - Inverted: tokens invertidos (modifiers-inverted)
 * - Static: tokens estáticos (modifiers-static)
 * - Static Inverted: tokens estáticos invertidos (modifiers-static-inverted)
 */
export const TOKEN_MAPPING: TokenMapping[] = [
  // ============================================
  // ACCENT TOKENS
  // ============================================
  {
    old: '--ubits-accent-brand',
    new: '--modifiers-normal-color-light-accent-brand',
    category: 'accent',
    notes: 'Accent brand en modo normal, light'
  },
  {
    old: '--ubits-accent-brand-inverted',
    new: '--modifiers-inverted-color-light-accent-brand',
    category: 'accent',
    notes: 'Accent brand invertido'
  },
  {
    old: '--ubits-accent-brand-static',
    new: '--modifiers-static-color-light-accent-brand',
    category: 'accent',
    notes: 'Accent brand estático'
  },
  {
    old: '--ubits-accent-brand-static-inverted',
    new: '--modifiers-static-inverted-color-light-accent-brand',
    category: 'accent',
    notes: 'Accent brand estático invertido'
  },
  {
    old: '--ubits-accent-success',
    new: '--modifiers-normal-color-light-feedback-accent-success',
    category: 'accent',
    notes: 'Accent success (feedback)'
  },

  // ============================================
  // FOREGROUND TOKENS
  // ============================================
  {
    old: '--ubits-fg-1-high',
    new: '--modifiers-normal-color-light-fg-1-high',
    category: 'foreground',
    notes: 'Foreground 1 high, normal, light'
  },
  {
    old: '--ubits-fg-1-high-inverted',
    new: '--modifiers-inverted-color-light-fg-1-high',
    category: 'foreground',
    notes: 'Foreground 1 high invertido'
  },
  {
    old: '--ubits-fg-1-medium',
    new: '--modifiers-normal-color-light-fg-1-medium',
    category: 'foreground',
    notes: 'Foreground 1 medium, normal, light'
  },
  {
    old: '--ubits-fg-1-medium-inverted',
    new: '--modifiers-inverted-color-light-fg-1-medium',
    category: 'foreground',
    notes: 'Foreground 1 medium invertido'
  },
  {
    old: '--ubits-fg-2-high',
    new: '--modifiers-normal-color-light-fg-2-high',
    category: 'foreground',
    notes: 'Foreground 2 high, normal, light'
  },
  {
    old: '--ubits-fg-2-medium',
    new: '--modifiers-normal-color-light-fg-2-medium',
    category: 'foreground',
    notes: 'Foreground 2 medium, normal, light'
  },
  {
    old: '--ubits-fg-disabled',
    new: '--modifiers-normal-color-light-fg-disabled',
    category: 'foreground',
    notes: 'Foreground disabled'
  },
  {
    old: '--ubits-fg-on-disabled',
    new: '--modifiers-normal-color-light-fg-on-disabled',
    category: 'foreground',
    notes: 'Foreground on disabled'
  },
  {
    old: '--ubits-fg-bold',
    new: '--modifiers-normal-color-light-fg-bold',
    category: 'foreground',
    notes: 'Foreground bold'
  },

  // ============================================
  // BACKGROUND TOKENS
  // ============================================
  {
    old: '--ubits-bg-1',
    new: '--modifiers-normal-color-light-bg-1',
    category: 'background',
    notes: 'Background 1, normal, light'
  },
  {
    old: '--ubits-bg-2',
    new: '--modifiers-normal-color-light-bg-2',
    category: 'background',
    notes: 'Background 2, normal, light'
  },
  {
    old: '--ubits-bg-3',
    new: '--modifiers-normal-color-light-bg-3',
    category: 'background',
    notes: 'Background 3, normal, light'
  },
  {
    old: '--ubits-bg-4',
    new: '--modifiers-normal-color-light-bg-4',
    category: 'background',
    notes: 'Background 4, normal, light'
  },
  {
    old: '--ubits-bg-5',
    new: '--modifiers-normal-color-light-bg-5',
    category: 'background',
    notes: 'Background 5, normal, light'
  },
  {
    old: '--ubits-bg-active',
    new: '--modifiers-normal-color-light-bg-active',
    category: 'background',
    notes: 'Background active'
  },
  {
    old: '--ubits-bg-active-button',
    new: '--modifiers-normal-color-light-bg-active',
    category: 'background',
    notes: 'Background active button (usa mismo token que bg-active)'
  },
  {
    old: '--ubits-bg-disabled',
    new: '--modifiers-normal-color-light-bg-disabled',
    category: 'background',
    notes: 'Background disabled'
  },
  {
    old: '--ubits-bg-dim',
    new: '--modifiers-normal-color-light-bg-dim',
    category: 'background',
    notes: 'Background dim'
  },

  // ============================================
  // BORDER TOKENS
  // ============================================
  {
    old: '--ubits-border-1',
    new: '--modifiers-normal-color-light-border-1',
    category: 'border',
    notes: 'Border 1, normal, light'
  },
  {
    old: '--ubits-border-2',
    new: '--modifiers-normal-color-light-border-2',
    category: 'border',
    notes: 'Border 2, normal, light'
  },

  // ============================================
  // BUTTON TOKENS
  // ============================================
  {
    old: '--ubits-button-primary-bg-default',
    new: '--modifiers-normal-button-color-light-brand-primary-bg-default',
    category: 'button',
    notes: 'Button primary background default, brand tone'
  },
  {
    old: '--ubits-button-primary-hover',
    new: '--modifiers-normal-button-color-light-brand-primary-bg-hover',
    category: 'button',
    notes: 'Button primary background hover, brand tone'
  },
  {
    old: '--ubits-button-primary-pressed',
    new: '--modifiers-normal-button-color-light-brand-primary-bg-pressed',
    category: 'button',
    notes: 'Button primary background pressed, brand tone'
  },
  // NOTA: --ubits-btn-primary-fg NO tiene equivalente en figma-tokens.css
  // Los botones primary usan color fijo (blanco) o se mantiene el token original
  // {
  //   old: '--ubits-btn-primary-fg',
  //   new: '--ubits-btn-primary-fg', // Mantener original
  //   category: 'button',
  //   notes: 'NO MIGRAR - No tiene equivalente en figma-tokens.css'
  // },
  {
    old: '--ubits-btn-secondary-bg-default',
    new: '--modifiers-normal-button-color-light-brand-secondary-bg-default',
    category: 'button',
    notes: 'Button secondary background default, brand tone'
  },
  {
    old: '--ubits-btn-secondary-bg-hover',
    new: '--modifiers-normal-button-color-light-brand-secondary-bg-hover',
    category: 'button',
    notes: 'Button secondary background hover, brand tone'
  },
  {
    old: '--ubits-btn-secondary-bg-pressed',
    new: '--modifiers-normal-button-color-light-brand-secondary-bg-pressed',
    category: 'button',
    notes: 'Button secondary background pressed, brand tone'
  },
  {
    old: '--ubits-btn-secondary-fg-default',
    new: '--modifiers-normal-button-color-light-brand-secondary-fg-default',
    category: 'button',
    notes: 'Button secondary foreground default, brand tone'
  },
  {
    old: '--ubits-btn-secondary-border',
    new: '--modifiers-normal-button-color-light-brand-secondary-border',
    category: 'button',
    notes: 'Button secondary border, brand tone (sin -default)'
  },
  {
    old: '--ubits-btn-tertiary-fg',
    new: '--modifiers-normal-button-color-light-brand-tertiary-fg',
    category: 'button',
    notes: 'Button tertiary foreground, brand tone (sin -default)'
  },
  {
    old: '--ubits-btn-tertiary-bg-hover',
    new: '--modifiers-normal-button-color-light-brand-tertiary-bg-hover',
    category: 'button',
    notes: 'Button tertiary background hover, brand tone'
  },
  {
    old: '--ubits-btn-tertiary-bg-pressed',
    new: '--modifiers-normal-button-color-light-brand-tertiary-bg-pressed',
    category: 'button',
    notes: 'Button tertiary background pressed, brand tone'
  },
  {
    old: '--ubits-button-active-bg',
    new: '--modifiers-normal-color-light-bg-active',
    category: 'button',
    notes: 'Button active background (usa bg-active)'
  },
  {
    old: '--ubits-button-active-fg',
    new: '--modifiers-normal-color-light-accent-brand',
    category: 'button',
    notes: 'Button active foreground (usa accent-brand)'
  },
  // NOTA: --ubits-button-focus-ring NO tiene equivalente exacto en figma-tokens.css
  // Mantener el token original
  // {
  //   old: '--ubits-button-focus-ring',
  //   new: '--ubits-button-focus-ring', // Mantener original
  //   category: 'button',
  //   notes: 'NO MIGRAR - No tiene equivalente en figma-tokens.css'
  // },
  {
    old: '--ubits-bg-disabled-button',
    new: '--modifiers-normal-color-light-bg-disabled',
    category: 'button',
    notes: 'Button disabled background (usa bg-disabled)'
  },
  {
    old: '--ubits-border-disabled-button',
    new: '--modifiers-normal-color-light-border-disabled',
    category: 'button',
    notes: 'Button disabled border'
  },
  {
    old: '--ubits-fg-on-disabled-button',
    new: '--modifiers-normal-color-light-fg-on-disabled',
    category: 'button',
    notes: 'Button disabled foreground (usa fg-on-disabled)'
  },
  {
    old: '--ubits-button-badge',
    new: '--modifiers-normal-color-light-feedback-accent-error',
    category: 'button',
    notes: 'Button badge (usa feedback error como color de badge)'
  },

  // ============================================
  // SPACING TOKENS
  // ============================================
  {
    old: '--ubits-spacing-xs',
    new: '--p-spacing-mode-1-xs',
    category: 'spacing',
    notes: 'Spacing extra small'
  },
  {
    old: '--ubits-spacing-sm',
    new: '--p-spacing-mode-1-sm',
    category: 'spacing',
    notes: 'Spacing small'
  },
  {
    old: '--ubits-spacing-md',
    new: '--p-spacing-mode-1-md',
    category: 'spacing',
    notes: 'Spacing medium'
  },
  {
    old: '--ubits-spacing-lg',
    new: '--p-spacing-mode-1-lg',
    category: 'spacing',
    notes: 'Spacing large'
  },
  {
    old: '--ubits-spacing-xl',
    new: '--p-spacing-mode-1-xl',
    category: 'spacing',
    notes: 'Spacing extra large'
  },
  {
    old: '--ubits-spacing-none',
    new: '--ubits-spacing-none',
    category: 'spacing',
    notes: 'Spacing none (0px) - Mantener token UBITS original'
  },

  // ============================================
  // BORDER RADIUS TOKENS
  // ============================================
  {
    old: '--ubits-border-radius-none',
    new: '--ubits-border-radius-none',
    category: 'border-radius',
    notes: 'Border radius none (0) - Mantener token UBITS original'
  },
  {
    old: '--ubits-border-radius-xs',
    new: '--ubits-border-radius-xs',
    category: 'border-radius',
    notes: 'Border radius extra small (4px) - Mantener token UBITS original'
  },
  {
    old: '--ubits-border-radius-sm',
    new: '--ubits-border-radius-sm',
    category: 'border-radius',
    notes: 'Border radius small (8px) - Mantener token UBITS original'
  },
  {
    old: '--ubits-border-radius-md',
    new: '--ubits-border-radius-md',
    category: 'border-radius',
    notes: 'Border radius medium (12px) - Mantener token UBITS original'
  },
  {
    old: '--ubits-border-radius-lg',
    new: '--ubits-border-radius-lg',
    category: 'border-radius',
    notes: 'Border radius large (16px) - Mantener token UBITS original'
  },
  {
    old: '--ubits-border-radius-xl',
    new: '--ubits-border-radius-xl',
    category: 'border-radius',
    notes: 'Border radius extra large (20px) - Mantener token UBITS original'
  },
  {
    old: '--ubits-border-radius-full',
    new: '--ubits-border-radius-full',
    category: 'border-radius',
    notes: 'Border radius full (1000px) - Mantener token UBITS original'
  },

  // ============================================
  // TYPOGRAPHY TOKENS
  // ============================================
  {
    old: '--font-sans',
    new: '--font-family-noto-sans-font-family',
    category: 'typography',
    notes: 'Font family Noto Sans'
  },
  {
    old: '--font-body-sm-size',
    new: '--modifiers-normal-body-sm-regular-fontsize',
    category: 'typography',
    notes: 'Body small font size (13px)'
  },
  {
    old: '--font-body-sm-line',
    new: '--modifiers-normal-body-sm-regular-lineheight',
    category: 'typography',
    notes: 'Body small line height (23.4px)'
  },
  {
    old: '--font-body-md-size',
    new: '--modifiers-normal-body-md-regular-fontsize',
    category: 'typography',
    notes: 'Body medium font size (16px)'
  },
  {
    old: '--font-body-md-line',
    new: '--modifiers-normal-body-md-regular-lineheight',
    category: 'typography',
    notes: 'Body medium line height (28.8px)'
  },
  {
    old: '--font-body-xs-size',
    new: '--modifiers-normal-body-xs-regular-fontsize',
    category: 'typography',
    notes: 'Body extra small font size (11px)'
  },
  {
    old: '--font-body-xs-line',
    new: '--modifiers-normal-body-xs-regular-lineheight',
    category: 'typography',
    notes: 'Body extra small line height (19.8px)'
  },
  // NOTA: font-weight está acoplado a estilos específicos en Figma
  // Mapear según el contexto (body-sm-regular, body-sm-semibold, body-sm-bold, etc.)
  // Por defecto, usar regular, pero ajustar manualmente según el contexto
  {
    old: '--weight-regular',
    new: '--modifiers-normal-body-sm-regular-fontweight',
    category: 'typography',
    notes: 'Font weight regular (usar body-sm-regular por defecto, ajustar según contexto)'
  },
  {
    old: '--weight-semibold',
    new: '--modifiers-normal-body-sm-semibold-fontweight',
    category: 'typography',
    notes: 'Font weight semibold (usar body-sm-semibold por defecto, ajustar según contexto)'
  },
  {
    old: '--weight-bold',
    new: '--modifiers-normal-body-sm-bold-fontweight',
    category: 'typography',
    notes: 'Font weight bold (usar body-sm-bold por defecto, ajustar según contexto)'
  },

  // ============================================
  // EFFECTS TOKENS
  // ============================================
  {
    old: '--ubits-bottom-nav-shadow-opacity',
    new: '--modifiers-normal-elevation-bottom-nav-shadow-opacity',
    category: 'effects',
    notes: 'Bottom navigation shadow opacity'
  },
  {
    old: '--modifiers-normal-focus-color',
    new: '--modifiers-normal-focus-color',
    category: 'effects',
    notes: 'Focus color effect (rgba(82, 151, 244, 0.3)) - Token de Figma'
  },

  // ============================================
  // SCROLL BAR TOKENS
  // ============================================
  {
    old: '--ubits-scroll-bar-color-bg-default',
    new: '--color-scroll-bar-color-bg-default',
    category: 'scroll-bar',
    notes: 'Scroll bar background default - Token de Figma con light/dark'
  },
  {
    old: '--ubits-scroll-bar-color-bg-hover',
    new: '--color-scroll-bar-color-bg-hover',
    category: 'scroll-bar',
    notes: 'Scroll bar background hover - Token de Figma con light/dark'
  },
  {
    old: '--ubits-scroll-bar-color-bg-dragged',
    new: '--color-scroll-bar-color-bg-dragged',
    category: 'scroll-bar',
    notes: 'Scroll bar background dragged - Token de Figma con light/dark'
  },
  // NOTA: --ubits-elevation-floating NO existe como token único en figma-tokens.css
  // Existen tokens separados para cada parte de la sombra
  // Mantener el token original o usar los tokens de elevation individuales
  // {
  //   old: '--ubits-elevation-floating',
  //   new: '--ubits-elevation-floating', // Mantener original
  //   category: 'effects',
  //   notes: 'NO MIGRAR - No tiene equivalente único en figma-tokens.css'
  // },
];

/**
 * Obtiene el mapeo para un token antiguo
 */
export function getTokenMapping(oldToken: string): TokenMapping | undefined {
  return TOKEN_MAPPING.find(m => m.old === oldToken);
}

/**
 * Obtiene todos los mapeos de una categoría
 */
export function getMappingsByCategory(category: TokenMapping['category']): TokenMapping[] {
  return TOKEN_MAPPING.filter(m => m.category === category);
}

/**
 * Verifica si un token antiguo tiene mapeo
 */
export function hasMapping(oldToken: string): boolean {
  return TOKEN_MAPPING.some(m => m.old === oldToken);
}

/**
 * Obtiene el token nuevo equivalente
 */
export function getNewToken(oldToken: string): string | null {
  const mapping = getTokenMapping(oldToken);
  return mapping ? mapping.new : null;
}

/**
 * Genera un objeto de mapeo simple (old -> new) para uso en scripts
 */
export function getMappingObject(): Record<string, string> {
  const mapping: Record<string, string> = {};
  TOKEN_MAPPING.forEach(m => {
    mapping[m.old] = m.new;
  });
  return mapping;
}

