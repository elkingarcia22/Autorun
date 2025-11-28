import { createAvatar, renderAvatar } from './AvatarProvider';
import type { AvatarOptions } from './types/AvatarOptions';
import './styles/avatar.css';
// El CSS del badge se carga en el playground/Storybook, no aquí

export { createAvatar, renderAvatar };
export type { AvatarOptions };

// Exponer globalmente para el playground y otros usos directos
if (typeof window !== 'undefined') {
  (window as any).createAvatar = createAvatar;
  (window as any).renderAvatar = renderAvatar;
}

