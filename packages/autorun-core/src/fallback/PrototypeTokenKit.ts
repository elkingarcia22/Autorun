import { GlobalTokenRegistry } from '../tokens/GlobalTokenRegistry';

/**
 * ✅ Props para KPI Card
 */
export interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
}

/**
 * ✅ Props para Filters Row
 */
export interface FiltersRowProps {
  filters: Array<{
    label: string;
    type: 'text' | 'select' | 'date' | 'number';
    value?: any;
  }>;
}

/**
 * ✅ Props para Empty State
 */
export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: {
    label: string;
    onClick?: string;
  };
}

/**
 * ✅ PrototypeTokenKit - Genera widgets tokenizados para Mode B
 * 
 * Regla de oro Mode B:
 * - ❌ NO emitir colores hardcodeados (#, rgb, hsl, rgba, hsla)
 * - ✅ Usar tokens reales --ubits-* / --modifiers-*
 * - ✅ NO usar fallbacks en colores (ideal)
 * - ✅ Si usas fallback, solo keywords seguras: transparent, currentColor, inherit, initial, unset
 * - ✅ En tamaños sí puedes permitir fallback numérico (16px, 1rem, 0) pero no es obligatorio
 */
export class PrototypeTokenKit {
  private registry: GlobalTokenRegistry;

  constructor(registry: GlobalTokenRegistry) {
    this.registry = registry;
  }

  /**
   * ✅ Genera KPI Card usando tokens reales (sin hardcoded colors)
   */
  generateKpiCard(props: KpiCardProps): string {
    // ✅ Validar que tokens existen
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-fg-1-medium');
    this.registry.assertExists('--ubits-fg-1-high');
    // Nota: font-size tokens no existen en UBITS, usar valores directos permitidos para tamaños
    this.registry.assertExists('--ubits-font-weight-bold');

    return `
<div class="ubits-kpi-card" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  <div class="ubits-kpi-card__title" style="
    color: var(--ubits-fg-1-medium);
    font-size: 12px;
    margin-bottom: var(--ubits-spacing-xs);
  ">${props.title}</div>
  <div class="ubits-kpi-card__value" style="
    color: var(--ubits-fg-1-high);
    font-size: 24px;
    font-weight: var(--ubits-font-weight-bold);
  ">${props.value}</div>
</div>`.trim();
  }

  /**
   * ✅ Genera Filters Row usando tokens reales
   */
  generateFiltersRow(props: FiltersRowProps): string {
    this.registry.assertExists('--ubits-bg-2');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-spacing-sm');
    this.registry.assertExists('--ubits-fg-1-medium');
    // Nota: font-size tokens no existen en UBITS, usar valores directos permitidos para tamaños
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-sm');

    const filtersHtml = props.filters.map(filter => {
      return `
<div class="ubits-filter-item" style="
  display: flex;
  flex-direction: column;
  gap: var(--ubits-spacing-xs);
  margin-right: var(--ubits-spacing-md);
">
  <label style="
    color: var(--ubits-fg-1-medium);
    font-size: 12px;
  ">${filter.label}</label>
  <input type="${filter.type}" value="${filter.value || ''}" style="
    padding: var(--ubits-spacing-sm);
    border: 1px solid var(--ubits-border-1);
    border-radius: var(--ubits-border-radius-sm);
    font-size: 14px;
  " />
</div>`.trim();
    }).join('\n');

    return `
<div class="ubits-filters-row" style="
  display: flex;
  flex-wrap: wrap;
  gap: var(--ubits-spacing-md);
  padding: var(--ubits-spacing-md);
  background: var(--ubits-bg-2);
  border-radius: var(--ubits-border-radius-md);
">
  ${filtersHtml}
</div>`.trim();
  }

  /**
   * ✅ Genera Empty State usando tokens reales
   */
  generateEmptyState(props: EmptyStateProps): string {
    this.registry.assertExists('--ubits-spacing-xl');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-spacing-sm');
    // Nota: --ubits-fg-1-low no existe, usar --ubits-fg-1-medium como alternativa
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    // Nota: font-size tokens no existen en UBITS, usar valores directos permitidos para tamaños
    this.registry.assertExists('--ubits-accent-brand');
    this.registry.assertExists('--ubits-fg-on-brand');
    this.registry.assertExists('--ubits-border-radius-sm');

    const actionHtml = props.action ? `
<button class="ubits-button ubits-button--primary" onclick="${props.action.onClick || ''}" style="
  padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
  background: var(--ubits-accent-brand);
  color: var(--ubits-fg-on-brand);
  border: none;
  border-radius: var(--ubits-border-radius-sm);
  font-size: 14px;
  cursor: pointer;
">${props.action.label}</button>`.trim() : '';

    return `
<div class="ubits-empty-state" style="
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--ubits-spacing-xl);
  text-align: center;
">
  ${props.icon ? `<div class="ubits-empty-state__icon" style="
    font-size: 48px;
    color: var(--ubits-fg-1-medium);
    margin-bottom: var(--ubits-spacing-md);
  ">${props.icon}</div>` : ''}
  <h3 class="ubits-empty-state__title" style="
    color: var(--ubits-fg-1-high);
    font-size: 20px;
    margin-bottom: var(--ubits-spacing-xs);
  ">${props.title}</h3>
  ${props.description ? `<p class="ubits-empty-state__description" style="
    color: var(--ubits-fg-1-medium);
    font-size: 14px;
    margin-bottom: var(--ubits-spacing-md);
  ">${props.description}</p>` : ''}
  ${actionHtml}
</div>`.trim();
  }

  /**
   * ✅ Genera Section Header usando tokens reales
   */
  generateSectionHeader(props: { title: string; subtitle?: string }): string {
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    // Nota: font-size tokens no existen en UBITS, usar valores directos permitidos para tamaños
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');

    return `
<div class="ubits-section-header" style="
  margin-bottom: var(--ubits-spacing-md);
">
  <h2 style="
    color: var(--ubits-fg-1-high);
    font-size: 20px;
    margin-bottom: var(--ubits-spacing-xs);
  ">${props.title}</h2>
  ${props.subtitle ? `<p style="
    color: var(--ubits-fg-1-medium);
    font-size: 14px;
  ">${props.subtitle}</p>` : ''}
</div>`.trim();
  }

  /**
   * ✅ Genera Panel usando tokens reales
   */
  generatePanel(props: { children: string }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');

    return `
<div class="ubits-panel" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  ${props.children}
</div>`.trim();
  }

  /**
   * ✅ Genera Simple Card usando tokens reales
   */
  generateSimpleCard(props: { title: string; content: string }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-fg-1-high');
    // Nota: font-size tokens no existen en UBITS, usar valores directos permitidos para tamaños

    return `
<div class="ubits-simple-card" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  <h3 style="
    color: var(--ubits-fg-1-high);
    font-size: 18px;
    margin-bottom: var(--ubits-spacing-md);
  ">${props.title}</h3>
  <div>${props.content}</div>
</div>`.trim();
  }

  /**
   * ✅ Genera Table Shell usando tokens reales (si no hay DataTable)
   */
  generateTableShell(props: { headers: string[]; rows: string[][] }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-sm');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    // Nota: font-size tokens no existen en UBITS, usar valores directos permitidos para tamaños
    this.registry.assertExists('--ubits-bg-2');

    const headersHtml = props.headers.map(header => `
      <th style="
        padding: var(--ubits-spacing-sm);
        border-bottom: 1px solid var(--ubits-border-1);
        color: var(--ubits-fg-1-high);
        font-size: 14px;
        text-align: left;
      ">${header}</th>
    `).join('');

    const rowsHtml = props.rows.map(row => `
      <tr>
        ${row.map(cell => `
          <td style="
            padding: var(--ubits-spacing-sm);
            border-bottom: 1px solid var(--ubits-border-1);
            color: var(--ubits-fg-1-medium);
            font-size: 14px;
          ">${cell}</td>
        `).join('')}
      </tr>
    `).join('');

    return `
<div class="ubits-table-shell" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  overflow: hidden;
">
  <table style="width: 100%; border-collapse: collapse;">
    <thead style="background: var(--ubits-bg-2);">
      <tr>
        ${headersHtml}
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</div>`.trim();
  }
}

