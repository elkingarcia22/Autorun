// Tokens semánticos organizados por categoría
// NOTA: Los tokens de feedback accent y border usan los modificadores porque los tokens base están casi negros
// Los tokens de modificadores tienen nombres diferentes para light y dark, así que los organizamos por modo
export const SEMANTIC_TOKENS = {
  feedback: {
    accent: {
      light: [
        '--modifiers-normal-color-light-feedback-accent-success',
        '--modifiers-normal-color-light-feedback-accent-info',
        '--modifiers-normal-color-light-feedback-accent-warning',
        '--modifiers-normal-color-light-feedback-accent-error',
      ],
      dark: [
        '--modifiers-normal-color-dark-feedback-accent-success',
        '--modifiers-normal-color-dark-feedback-accent-info',
        '--modifiers-normal-color-dark-feedback-accent-warning',
        '--modifiers-normal-color-dark-feedback-accent-error',
      ],
    },
    border: {
      light: [
        '--modifiers-normal-color-light-feedback-border-success',
        '--modifiers-normal-color-light-feedback-border-info',
        '--modifiers-normal-color-light-feedback-border-warning',
        '--modifiers-normal-color-light-feedback-border-error',
      ],
      dark: [
        '--modifiers-normal-color-dark-feedback-border-success',
        '--modifiers-normal-color-dark-feedback-border-info',
        '--modifiers-normal-color-dark-feedback-border-warning',
        '--modifiers-normal-color-dark-feedback-border-error',
      ],
    },
    chart: {
      light: [
        '--modifiers-normal-color-light-feedback-chart-success-subtle',
        '--modifiers-normal-color-light-feedback-chart-success-bold',
        '--modifiers-normal-color-light-feedback-chart-info-subtle',
        '--modifiers-normal-color-light-feedback-chart-info-bold',
        '--modifiers-normal-color-light-feedback-chart-warning-subtle',
        '--modifiers-normal-color-light-feedback-chart-warning-bold',
        '--modifiers-normal-color-light-feedback-chart-error-subtle',
        '--modifiers-normal-color-light-feedback-chart-error-bold',
      ],
      dark: [
        '--modifiers-normal-color-dark-feedback-chart-success-subtle',
        '--modifiers-normal-color-dark-feedback-chart-success-bold',
        '--modifiers-normal-color-dark-feedback-chart-info-subtle',
        '--modifiers-normal-color-dark-feedback-chart-info-bold',
        '--modifiers-normal-color-dark-feedback-chart-warning-subtle',
        '--modifiers-normal-color-dark-feedback-chart-warning-bold',
        '--modifiers-normal-color-dark-feedback-chart-error-subtle',
        '--modifiers-normal-color-dark-feedback-chart-error-bold',
      ],
    },
  },
  brand: {
    light: [
      '--modifiers-normal-brand-light-bds-bg-secondary-shape',
      '--modifiers-normal-brand-light-bds-bg-primary-shape',
      '--modifiers-normal-brand-light-ubits-logo',
    ],
    dark: [
      '--modifiers-normal-brand-dark-bds-bg-secondary-shape',
      '--modifiers-normal-brand-dark-bds-bg-primary-shape',
      '--modifiers-normal-brand-dark-ubits-logo',
    ],
  },
  chart: [
    // Tokens de chart desde modifiers-normal-chart
    '--modifiers-normal-chart-color-fg-bold',
    '--modifiers-normal-chart-color-bg-blue-subtle',
    '--modifiers-normal-chart-color-bg-blue-bold',
    '--modifiers-normal-chart-color-bg-gray-subtle',
    '--modifiers-normal-chart-color-bg-gray-bold',
    '--modifiers-normal-chart-color-bg-yellow-subtle',
    '--modifiers-normal-chart-color-bg-yellow-bold',
    '--modifiers-normal-chart-color-bg-green-subtle',
    '--modifiers-normal-chart-color-bg-green-bold',
    '--modifiers-normal-chart-color-bg-teal-subtle',
    '--modifiers-normal-chart-color-bg-teal-bold',
    '--modifiers-normal-chart-color-bg-purple-subtle',
    '--modifiers-normal-chart-color-bg-purple-bold',
    '--modifiers-normal-chart-color-bg-pink-subtle',
    '--modifiers-normal-chart-color-bg-pink-bold',
    '--modifiers-normal-chart-color-bg-rose-subtle',
    '--modifiers-normal-chart-color-bg-rose-bold',
    '--modifiers-normal-chart-color-bg-level-1',
    '--modifiers-normal-chart-color-bg-neutral-blue-1',
    '--modifiers-normal-chart-color-bg-neutral-blue-2',
    '--modifiers-normal-chart-color-bg-neutral-blue-3',
    '--modifiers-normal-chart-color-bg-neutral-blue-4',
    '--modifiers-normal-chart-color-bg-neutral-blue-5',
    '--modifiers-normal-chart-color-bg-neutral-blue-6',
    '--modifiers-normal-chart-color-bg-neutral-blue-7',
    '--modifiers-normal-chart-color-bg-neutral-blue-8',
    '--modifiers-normal-chart-color-bg-neutral-blue-9',
    '--modifiers-normal-chart-color-bg-neutral-blue-10',
    '--modifiers-normal-chart-color-bg-neutral-blue-11',
    '--modifiers-normal-chart-color-bg-neutral-blue-12',
    '--modifiers-normal-chart-color-bg-neutral-blue-13',
    '--modifiers-normal-chart-color-bg-neutral-blue-14',
    '--modifiers-normal-chart-color-bg-neutral-blue-base',
  ],
};

