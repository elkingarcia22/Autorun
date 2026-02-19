export const WRAPPER_PRESETS = {
  /**
   * Card column layout (380px max width)
   * Used for: Card, Badge, small components
   */
  cardColumn: {
    maxWidth: '380px',
    margin: '0',
    display: 'block',
  },
  /**
   * Full width layout
   * Used for: Accordion, Table, DataView, wide components
   */
  fullWidth: {
    maxWidth: 'none',
    width: '100%',
    display: 'block',
  },
  /**
   * Centered layout (800px max width)
   * Used for: Modal, forms, centered content
   */
  centered: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'block',
  },
  /**
   * Inline layout
   * Used for: Button, Chip, inline components
   */
  inline: {
    display: 'inline-block',
    maxWidth: 'none',
  },
};

export type WrapperPresetName = keyof typeof WRAPPER_PRESETS;

export function createWrapper(
  containerId: string,
  preset: WrapperPresetName = 'fullWidth',
  componentId?: string
): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'autorun-mount';
  wrapper.dataset.preset = preset;
  if (componentId) {
    wrapper.dataset.componentId = componentId;
  }
  const container = document.createElement('div');
  container.id = containerId;
  wrapper.appendChild(container);
  return wrapper;
}

export function getWrapperPresetsCSS(): string {
  return `
/* Autorun Mount Wrappers */
.autorun-mount {
  position: relative;
  box-sizing: border-box;
}

.autorun-mount[data-preset="cardColumn"] {
  max-width: 380px;
  margin: 0;
  display: block;
}

.autorun-mount[data-preset="fullWidth"] {
  max-width: none;
  width: 100%;
  display: block;
}

.autorun-mount[data-preset="centered"] {
  max-width: 800px;
  margin: 0 auto;
  display: block;
}

.autorun-mount[data-preset="inline"] {
  display: inline-block;
  max-width: none;
}

/* Placeholder for failed mounts */
.autorun-mount-failed {
  padding: 16px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  color: #856404;
  font-family: monospace;
  font-size: 12px;
  margin: 8px 0;
}

.autorun-mount-failed strong {
  display: block;
  margin-bottom: 4px;
}
  `.trim();
}

export function injectWrapperPresetsCSS(doc: Document = document) {
  if (doc.getElementById('autorun-wrapper-presets')) {
    return;
  }
  const style = doc.createElement('style');
  style.id = 'autorun-wrapper-presets';
  style.textContent = getWrapperPresetsCSS();
  doc.head.appendChild(style);
  console.log('[WrapperPresets] ✅ CSS injected');
}

export function getRecommendedPreset(componentId: string): WrapperPresetName {
  const componentName = componentId.split('/')[1]?.toLowerCase() || '';
  if (
    ['accordion', 'table', 'dataview', 'tabs', 'subnav'].includes(componentName)
  ) {
    return 'fullWidth';
  }
  if (
    ['card', 'simplecard', 'selectioncard', 'badge', 'avatar'].includes(
      componentName
    )
  ) {
    return 'cardColumn';
  }
  if (['button', 'chip', 'statustag', 'spinner'].includes(componentName)) {
    return 'inline';
  }
  if (['modal', 'drawer'].includes(componentName)) {
    return 'centered';
  }
  return 'fullWidth';
}
