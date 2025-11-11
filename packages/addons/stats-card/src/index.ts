/**
 * @ubits/stats-card
 * Export público del add-on StatsCard
 */

export { StatsCardAddon } from './StatsCardAddon';
export { renderStatsCard, createStatsCard } from './StatsCardProvider';
export { UBITSStatsCard } from './StatsCardComponent';
export type {
  StatsCardOptions,
  StatItem,
  StatsCardVariant,
  StatsCardSize
} from './types/StatsCardOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
  import('./StatsCardComponent').then(() => {
    console.log('✅ UBITS StatsCard component registered');
  });
}

