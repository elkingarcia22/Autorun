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
    // ✅ Validar que tokens existen (con fallback si no están disponibles)
    const hasTokens = this.registry.getAll().length > 0;

    // ⚠️ CORRECCIÓN: NO usar assertExists() que lanza error - usar has() en su lugar
    // assertExists() lanza error y puede propagarse fuera del try-catch
    if (hasTokens) {
      // Verificar tokens sin lanzar errores
      const missingTokens: string[] = [];
      const requiredTokens = [
        '--ubits-bg-1',
        '--ubits-border-1',
        '--ubits-border-radius-md',
        '--ubits-spacing-md',
        '--ubits-spacing-xs',
        '--ubits-fg-1-medium',
        '--ubits-fg-1-high',
      ];

      for (const token of requiredTokens) {
        if (!this.registry.has(token)) {
          missingTokens.push(token);
        }
      }

      if (missingTokens.length > 0) {
        console.warn(
          `⚠️ [PrototypeTokenKit] Algunos tokens no están disponibles: ${missingTokens.join(', ')}, usando fallback`
        );
      }
    } else {
      console.warn(
        `⚠️ [PrototypeTokenKit] No hay tokens disponibles, usando valores por defecto`
      );
    }

    // Nota: font-size y font-weight tokens no existen en UBITS, usar valores directos permitidos
    // font-weight: bold es un valor CSS estándar permitido

    // Usar tokens si están disponibles, sino usar valores por defecto seguros
    const bgColor =
      hasTokens && this.registry.has('--ubits-bg-1')
        ? 'var(--ubits-bg-1)'
        : 'transparent';
    const borderColor =
      hasTokens && this.registry.has('--ubits-border-1')
        ? 'var(--ubits-border-1)'
        : 'transparent';
    const borderRadius =
      hasTokens && this.registry.has('--ubits-border-radius-md')
        ? 'var(--ubits-border-radius-md)'
        : '8px';
    const padding =
      hasTokens && this.registry.has('--ubits-spacing-md')
        ? 'var(--ubits-spacing-md)'
        : '12px';
    const marginBottom =
      hasTokens && this.registry.has('--ubits-spacing-xs')
        ? 'var(--ubits-spacing-xs)'
        : '4px';
    const titleColor =
      hasTokens && this.registry.has('--ubits-fg-1-medium')
        ? 'var(--ubits-fg-1-medium)'
        : 'inherit';
    const valueColor =
      hasTokens && this.registry.has('--ubits-fg-1-high')
        ? 'var(--ubits-fg-1-high)'
        : 'inherit';

    return `
<div class="ubits-kpi-card" style="
  background: ${bgColor};
  border: 1px solid ${borderColor};
  border-radius: ${borderRadius};
  padding: ${padding};
">
  <div class="ubits-kpi-card__title" style="
    color: ${titleColor};
    font-size: 12px;
    margin-bottom: ${marginBottom};
  ">${props.title}</div>
  <div class="ubits-kpi-card__value" style="
    color: ${valueColor};
    font-size: 24px;
    font-weight: bold;
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

    const filtersHtml = props.filters
      .map((filter) => {
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
      })
      .join('\n');

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
    // ⚠️ CORRECCIÓN: --ubits-fg-on-brand no existe, usar #ffffff (blanco) para texto sobre fondo de marca
    // O usar --ubits-fg-1-high si está disponible, pero para botón primario normalmente es blanco
    this.registry.assertExists('--ubits-border-radius-sm');

    // Obtener color de texto para botón primario (texto sobre fondo de marca)
    // Si existe un token para esto, usarlo; si no, usar blanco (#ffffff)
    const textOnBrandColor = this.registry.has('--ubits-fg-on-brand')
      ? 'var(--ubits-fg-on-brand)'
      : '#ffffff'; // Fallback seguro: blanco para texto sobre fondo de marca

    const actionHtml = props.action
      ? `
<button class="ubits-button ubits-button--primary" onclick="${props.action.onClick || ''}" style="
  padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
  background: var(--ubits-accent-brand);
  color: ${textOnBrandColor};
  border: none;
  border-radius: var(--ubits-border-radius-sm);
  font-size: 14px;
  cursor: pointer;
">${props.action.label}</button>`.trim()
      : '';

    return `
<div class="ubits-empty-state" style="
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--ubits-spacing-xl);
  text-align: center;
">
  ${
    props.icon
      ? `<div class="ubits-empty-state__icon" style="
    font-size: 48px;
    color: var(--ubits-fg-1-medium);
    margin-bottom: var(--ubits-spacing-md);
  ">${props.icon}</div>`
      : ''
  }
  <h3 class="ubits-empty-state__title" style="
    color: var(--ubits-fg-1-high);
    font-size: 20px;
    margin-bottom: var(--ubits-spacing-xs);
  ">${props.title}</h3>
  ${
    props.description
      ? `<p class="ubits-empty-state__description" style="
    color: var(--ubits-fg-1-medium);
    font-size: 14px;
    margin-bottom: var(--ubits-spacing-md);
  ">${props.description}</p>`
      : ''
  }
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
  ${
    props.subtitle
      ? `<p style="
    color: var(--ubits-fg-1-medium);
    font-size: 14px;
  ">${props.subtitle}</p>`
      : ''
  }
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
   * ✅ MEJORA: Genera Form Section usando tokens reales
   */
  generateFormSection(props: {
    title?: string;
    fields: Array<{
      label: string;
      type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
      value?: string;
      options?: string[];
    }>;
  }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-sm');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    this.registry.assertExists('--ubits-border-radius-sm');

    const fieldsHtml = props.fields
      .map((field) => {
        let inputHtml = '';

        if (field.type === 'textarea') {
          inputHtml = `<textarea style="
          width: 100%;
          padding: var(--ubits-spacing-sm);
          border: 1px solid var(--ubits-border-1);
          border-radius: var(--ubits-border-radius-sm);
          font-size: 14px;
          color: var(--ubits-fg-1-high);
          resize: vertical;
        ">${field.value || ''}</textarea>`;
        } else if (field.type === 'select') {
          const optionsHtml =
            field.options
              ?.map((opt) => `<option value="${opt}">${opt}</option>`)
              .join('') || '';
          inputHtml = `<select style="
          width: 100%;
          padding: var(--ubits-spacing-sm);
          border: 1px solid var(--ubits-border-1);
          border-radius: var(--ubits-border-radius-sm);
          font-size: 14px;
          color: var(--ubits-fg-1-high);
        ">${optionsHtml}</select>`;
        } else {
          inputHtml = `<input type="${field.type}" value="${field.value || ''}" style="
          width: 100%;
          padding: var(--ubits-spacing-sm);
          border: 1px solid var(--ubits-border-1);
          border-radius: var(--ubits-border-radius-sm);
          font-size: 14px;
          color: var(--ubits-fg-1-high);
        " />`;
        }

        return `
<div class="ubits-form-field" style="
  margin-bottom: var(--ubits-spacing-md);
">
  <label style="
    display: block;
    color: var(--ubits-fg-1-high);
    font-size: 14px;
    margin-bottom: var(--ubits-spacing-xs);
  ">${field.label}</label>
  ${inputHtml}
</div>`.trim();
      })
      .join('\n');

    const titleHtml = props.title
      ? `
<h3 style="
  color: var(--ubits-fg-1-high);
  font-size: 18px;
  margin-bottom: var(--ubits-spacing-md);
">${props.title}</h3>`.trim()
      : '';

    return `
<div class="ubits-form-section" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  ${titleHtml}
  ${fieldsHtml}
</div>`.trim();
  }

  /**
   * ✅ MEJORA: Genera Metric Card usando tokens reales
   */
  generateMetricCard(props: {
    title: string;
    value: string | number;
    change?: { value: string | number; trend: 'up' | 'down' | 'neutral' };
    icon?: string;
  }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    // Usar tokens disponibles (success/error pueden no existir, usar alternativas)
    // this.registry.assertExists('--ubits-accent-success'); // Puede no existir
    // this.registry.assertExists('--ubits-accent-error'); // Puede no existir

    // Usar tokens disponibles (success/error pueden no existir)
    const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
      if (trend === 'up') {
        // Intentar usar success, si no existe usar brand
        return this.registry.has('--ubits-accent-success')
          ? 'var(--ubits-accent-success)'
          : 'var(--ubits-accent-brand)';
      } else if (trend === 'down') {
        // Intentar usar error, si no existe usar fg-medium
        return this.registry.has('--ubits-accent-error')
          ? 'var(--ubits-accent-error)'
          : 'var(--ubits-fg-1-medium)';
      }
      return 'var(--ubits-fg-1-medium)';
    };

    const changeHtml = props.change
      ? `
<div class="ubits-metric-card__change" style="
  color: ${getTrendColor(props.change.trend)};
  font-size: 12px;
  margin-top: var(--ubits-spacing-xs);
">
  ${props.change.trend === 'up' ? '↑' : props.change.trend === 'down' ? '↓' : '→'} ${props.change.value}
</div>`.trim()
      : '';

    const iconHtml = props.icon
      ? `
<div class="ubits-metric-card__icon" style="
  font-size: 24px;
  color: var(--ubits-fg-1-medium);
  margin-bottom: var(--ubits-spacing-xs);
">${props.icon}</div>`.trim()
      : '';

    return `
<div class="ubits-metric-card" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  ${iconHtml}
  <div class="ubits-metric-card__title" style="
    color: var(--ubits-fg-1-medium);
    font-size: 12px;
    margin-bottom: var(--ubits-spacing-xs);
  ">${props.title}</div>
  <div class="ubits-metric-card__value" style="
    color: var(--ubits-fg-1-high);
    font-size: 28px;
    font-weight: 600;
  ">${props.value}</div>
  ${changeHtml}
</div>`.trim();
  }

  /**
   * ✅ MEJORA: Genera Action Bar usando tokens reales
   */
  generateActionBar(props: {
    actions: Array<{
      label: string;
      variant?: 'primary' | 'secondary' | 'tertiary';
      onClick?: string;
    }>;
  }): string {
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-sm');
    this.registry.assertExists('--ubits-accent-brand');
    // ⚠️ CORRECCIÓN: --ubits-fg-on-brand no existe, usar #ffffff (blanco) para texto sobre fondo de marca
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-border-radius-sm');

    // Obtener color de texto para botón primario (texto sobre fondo de marca)
    const textOnBrandColor = this.registry.has('--ubits-fg-on-brand')
      ? 'var(--ubits-fg-on-brand)'
      : '#ffffff'; // Fallback seguro: blanco para texto sobre fondo de marca

    const actionsHtml = props.actions
      .map((action) => {
        const isPrimary = action.variant === 'primary' || !action.variant;
        const styles = isPrimary
          ? `
  background: var(--ubits-accent-brand);
  color: ${textOnBrandColor};
  border: none;`
          : `
  background: transparent;
  color: var(--ubits-fg-1-high);
  border: 1px solid var(--ubits-border-1);`;

        return `
<button onclick="${action.onClick || ''}" style="
  padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
  ${styles}
  border-radius: var(--ubits-border-radius-sm);
  font-size: 14px;
  cursor: pointer;
  margin-right: var(--ubits-spacing-sm);
">${action.label}</button>`.trim();
      })
      .join('\n');

    return `
<div class="ubits-action-bar" style="
  display: flex;
  align-items: center;
  gap: var(--ubits-spacing-sm);
  padding: var(--ubits-spacing-md) 0;
">
  ${actionsHtml}
</div>`.trim();
  }

  /**
   * ✅ MEJORA: Genera Data Grid usando tokens reales
   */
  generateDataGrid(props: {
    columns: string[];
    data: string[][];
    pagination?: boolean;
  }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-sm');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    this.registry.assertExists('--ubits-bg-2');

    const headersHtml = props.columns
      .map(
        (col) => `
      <th style="
        padding: var(--ubits-spacing-sm);
        border-bottom: 1px solid var(--ubits-border-1);
        color: var(--ubits-fg-1-high);
        font-size: 14px;
        text-align: left;
        font-weight: 600;
      ">${col}</th>
    `
      )
      .join('');

    const rowsHtml = props.data
      .map(
        (row) => `
      <tr>
        ${row
          .map(
            (cell) => `
          <td style="
            padding: var(--ubits-spacing-sm);
            border-bottom: 1px solid var(--ubits-border-1);
            color: var(--ubits-fg-1-medium);
            font-size: 14px;
          ">${cell}</td>
        `
          )
          .join('')}
      </tr>
    `
      )
      .join('');

    const paginationHtml = props.pagination
      ? `
<div class="ubits-data-grid__pagination" style="
  padding: var(--ubits-spacing-sm);
  border-top: 1px solid var(--ubits-border-1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--ubits-spacing-sm);
">
  <button style="
    padding: var(--ubits-spacing-sm);
    border: 1px solid var(--ubits-border-1);
    background: transparent;
    color: var(--ubits-fg-1-high);
    border-radius: 4px;
    cursor: pointer;
  ">Anterior</button>
  <span style="color: var(--ubits-fg-1-medium); font-size: 14px;">Página 1</span>
  <button style="
    padding: var(--ubits-spacing-sm);
    border: 1px solid var(--ubits-border-1);
    background: transparent;
    color: var(--ubits-fg-1-high);
    border-radius: 4px;
    cursor: pointer;
  ">Siguiente</button>
</div>`.trim()
      : '';

    return `
<div class="ubits-data-grid" style="
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
  ${paginationHtml}
</div>`.trim();
  }

  /**
   * ✅ MEJORA: Genera Filter Panel usando tokens reales
   */
  generateFilterPanel(props: {
    title?: string;
    filters: Array<{
      label: string;
      type: 'text' | 'select' | 'date' | 'number' | 'checkbox';
      value?: any;
      options?: string[];
    }>;
  }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-sm');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    this.registry.assertExists('--ubits-border-radius-sm');

    const filtersHtml = props.filters
      .map((filter) => {
        let inputHtml = '';

        if (filter.type === 'checkbox') {
          inputHtml = `<input type="checkbox" ${filter.value ? 'checked' : ''} style="
          margin-right: var(--ubits-spacing-xs);
        " />`;
        } else if (filter.type === 'select') {
          const optionsHtml =
            filter.options
              ?.map((opt) => `<option value="${opt}">${opt}</option>`)
              .join('') || '';
          inputHtml = `<select style="
          width: 100%;
          padding: var(--ubits-spacing-sm);
          border: 1px solid var(--ubits-border-1);
          border-radius: var(--ubits-border-radius-sm);
          font-size: 14px;
          color: var(--ubits-fg-1-high);
        ">${optionsHtml}</select>`;
        } else {
          inputHtml = `<input type="${filter.type}" value="${filter.value || ''}" style="
          width: 100%;
          padding: var(--ubits-spacing-sm);
          border: 1px solid var(--ubits-border-1);
          border-radius: var(--ubits-border-radius-sm);
          font-size: 14px;
          color: var(--ubits-fg-1-high);
        " />`;
        }

        return `
<div class="ubits-filter-item" style="
  margin-bottom: var(--ubits-spacing-md);
">
  <label style="
    display: block;
    color: var(--ubits-fg-1-high);
    font-size: 14px;
    margin-bottom: var(--ubits-spacing-xs);
  ">${filter.label}</label>
  ${inputHtml}
</div>`.trim();
      })
      .join('\n');

    const titleHtml = props.title
      ? `
<h3 style="
  color: var(--ubits-fg-1-high);
  font-size: 16px;
  margin-bottom: var(--ubits-spacing-md);
">${props.title}</h3>`.trim()
      : '';

    return `
<div class="ubits-filter-panel" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  ${titleHtml}
  ${filtersHtml}
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

    const headersHtml = props.headers
      .map(
        (header) => `
      <th style="
        padding: var(--ubits-spacing-sm);
        border-bottom: 1px solid var(--ubits-border-1);
        color: var(--ubits-fg-1-high);
        font-size: 14px;
        text-align: left;
      ">${header}</th>
    `
      )
      .join('');

    const rowsHtml = props.rows
      .map(
        (row) => `
      <tr>
        ${row
          .map(
            (cell) => `
          <td style="
            padding: var(--ubits-spacing-sm);
            border-bottom: 1px solid var(--ubits-border-1);
            color: var(--ubits-fg-1-medium);
            font-size: 14px;
          ">${cell}</td>
        `
          )
          .join('')}
      </tr>
    `
      )
      .join('');

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
