import * as fs from 'fs/promises';

async function manualImplement() {
    const filePath = '/Users/elkinmac/Desktop/Autorun/prototypes/canvas-administrador-encuestas-2025-12-30.html';
    let html = await fs.readFile(filePath, 'utf-8');

    // 1. Preparar el CSS (Simplificado para el canvas)
    const css = `
    /* Custom Grid for Metrics */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
      padding: 0 16px;
    }
    .ubits-metric-card {
      display: flex;
      flex-direction: column;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-sm);
      padding: var(--ubits-spacing-sm);
      gap: var(--ubits-spacing-md);
      transition: all 0.2s ease;
      width: 100%;
      box-sizing: border-box;
    }
    .ubits-metric-card__header { display: flex; align-items: center; gap: 8px; }
    .ubits-metric-card__title { margin: 0; color: var(--modifiers-normal-color-light-fg-1-high); }
    .ubits-metric-card__value { margin: 8px 0 0 0; color: var(--modifiers-normal-color-light-fg-1-high); font-size: 24px; font-weight: 600; }
    .ubits-metric-card__label { color: var(--modifiers-normal-color-light-fg-2-medium); font-size: 14px; }
    [data-theme="dark"] .ubits-metric-card { background: var(--modifiers-normal-color-dark-bg-1); }
  `;

    // 2. Preparar el HTML
    const content = `
    <div class="metrics-grid">
      <div id="metric-total" class="ubits-metric-card">
        <div class="ubits-metric-card__header">
          <i class="far fa-clipboard-list-check"></i>
          <h3 class="ubits-metric-card__title ubits-body-md-regular">Total Encuestas</h3>
        </div>
        <div class="ubits-metric-card__body">
          <h2 class="ubits-metric-card__value ubits-heading-h2">2.543</h2>
          <div class="ubits-metric-card__label ubits-body-sm-regular">Enviadas este mes</div>
        </div>
      </div>
      <div id="metric-rate" class="ubits-metric-card">
        <div class="ubits-metric-card__header">
          <i class="far fa-chart-line-up"></i>
          <h3 class="ubits-metric-card__title ubits-body-md-regular">Tasa de Respuesta</h3>
        </div>
        <div class="ubits-metric-card__body">
          <h2 class="ubits-metric-card__value ubits-heading-h2">85%</h2>
          <div class="ubits-metric-card__label ubits-body-sm-regular">+5% vs mes anterior</div>
        </div>
      </div>
      <div id="metric-csat" class="ubits-metric-card">
        <div class="ubits-metric-card__header">
          <i class="far fa-star"></i>
          <h3 class="ubits-metric-card__title ubits-body-md-regular">Satisfacción</h3>
        </div>
        <div class="ubits-metric-card__body">
          <h2 class="ubits-metric-card__value ubits-heading-h2">4.8/5</h2>
          <div class="ubits-metric-card__label ubits-body-sm-regular">Promedio CSAT</div>
        </div>
      </div>
    </div>
  `;

    // Inyectar CSS en el head si no existe
    if (!html.includes('/* Custom Grid for Metrics */')) {
        html = html.replace('</head>', `<style>${css}</style>\n</head>`);
    }

    // Inyectar Contenido en el ancla
    const anchorContent = '<!-- AUTORUN:ANCHOR:CONTENT -->';
    html = html.replace(anchorContent, `${anchorContent}\n${content}`);

    await fs.writeFile(filePath, html);
    console.log('✅ Manual implementation successful.');
}

manualImplement();
