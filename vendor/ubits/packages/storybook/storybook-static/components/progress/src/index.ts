import { createProgressBar, renderProgressBar } from './ProgressProvider';
import type { ProgressOptions, ProgressSegment } from './types/ProgressOptions';
import './styles/progress.css';

export { createProgressBar, renderProgressBar };
export type { ProgressOptions, ProgressSegment };

if (typeof window !== 'undefined') {
  (window as any).createProgressBar = createProgressBar;
  (window as any).renderProgressBar = renderProgressBar;
}

