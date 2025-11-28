import type { Preview } from '@storybook/html-vite'
import '../../tokens/dist/tokens.css'
import '../../typography/fonts.css'
import '../../typography/tokens-typography.css'
import '../../addons/status-tag/src/styles/status-tag.css'
import '../../addons/avatar/src/styles/avatar.css'
import '../../addons/drawer/src/styles/drawer.css'
import '../../addons/modal/src/styles/modal.css'
import '../../addons/scroll/src/styles/scroll.css'
import '../../addons/progress/src/styles/progress.css'
import '../../addons/file-upload/src/styles/file-upload.css'
import '../../addons/button/src/styles/button.css'
import '../../addons/badge/src/styles/badge.css'
import '../../addons/alert/src/styles/alert.css'
import '../../addons/toast/src/styles/toast.css'
import '../../addons/list/src/styles/list.css'
import '../../addons/input/src/styles/input.css'
import '../../addons/sidebar/src/styles/sidebar.css'
import '../../addons/subnav/src/styles/subnav.css'
import '../../addons/tabbar/src/styles/tabbar.css'
import '../../addons/card/src/styles/card.css'
import '../../addons/data-table/src/styles/data-table.css'
import '../../addons/pagination/src/styles/pagination.css'
import '../../addons/checkbox/src/styles/checkbox.css'
import '../../addons/toggle/src/styles/toggle.css'
import '../../addons/radio-button/src/styles/radio-button.css'
import '../../addons/selection-card/src/styles/selection-card.css'
import '../../addons/empty-state/src/styles/empty-state.css'
import '../../addons/tooltip/src/styles/tooltip.css'
import '../../addons/spinner/src/styles/spinner.css'
import '../../addons/calendar/src/styles/calendar.css'
import '../../addons/tabs/src/styles/tabs.css'
import '../../addons/segment-control/src/styles/segment-control.css'
import '../../addons/breadcrumb/src/styles/breadcrumb.css'
import '../../addons/stepper/src/styles/stepper.css'
import '../../addons/participants-menu/src/styles/participants-menu.css'
import '../../addons/metric-card/src/styles/metric-card.css'
import './fontawesome-icons.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      title: 'Theme',
      description: 'Select light or dark theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, ctx) => {
      const theme = ctx.globals.theme || 'light'
      document.body.setAttribute('data-theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
      // Asegurar que el fondo del body sea diferente al sidebar
      document.body.style.backgroundColor = 'var(--modifiers-normal-color-light-bg-2)'
      
      // Agregar CSS para hacer transparente el contenedor de Storybook
      const style = document.createElement('style')
      style.textContent = `
        .sb-previewBlock {
          background: transparent !important;
          border: none !important;
        }
        .sb-wrapper {
          background: transparent !important;
        }
        #storybook-root {
          background: transparent !important;
        }
      `
      document.head.appendChild(style)
      
      return story()
    },
  ],
}

export default preview