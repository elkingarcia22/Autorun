import type { Preview } from '@storybook/html-vite'
import '../../tokens/dist/tokens.css'
import '../../tokens/dist/figma-tokens.css'
import '../../typography/fonts.css'
import '../../typography/tokens-typography.css'
import '../../addons/status-tag/src/styles/status-tag.css'
import '../../components/avatar/src/styles/avatar.css'
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
import '../../addons/header-section/src/styles/header-section.css'
import '../../addons/status-tag/src/styles/status-tag.css'
import '../../components/button-ai/src/styles/button-ai.css'
import '../docs-site/.storybook/fontawesome-icons.css'

// Script para limpiar caché de Storybook y redirigir IDs antiguos
if (typeof window !== 'undefined') {
  // Suprimir errores de extensiones del navegador que no afectan la funcionalidad
  window.addEventListener('error', (event) => {
    if (
      event.message?.includes('message channel closed') ||
      event.message?.includes('asynchronous response')
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });

  // Suprimir errores de promesas rechazadas relacionadas con extensiones
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason?.message?.includes('message channel closed') ||
      event.reason?.message?.includes('asynchronous response')
    ) {
      event.preventDefault();
      return false;
    }
  });
  // Limpiar localStorage y sessionStorage de Storybook que pueden tener IDs antiguos
  const clearStorybookCache = () => {
    try {
      const keysToRemove: string[] = []
      
      // Buscar todas las claves relacionadas con Storybook
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.includes('storybook') || key.includes('sb-'))) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch (e) {
          // Ignorar errores
        }
      })
      
      // Limpiar sessionStorage también
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key && (key.includes('storybook') || key.includes('sb-'))) {
          try {
            sessionStorage.removeItem(key)
          } catch (e) {
            // Ignorar errores
          }
        }
      }
      
      // Caché limpiado silenciosamente
    } catch (e) {
      // Ignorar errores de localStorage
    }
  }
  
  // Función para intentar encontrar el nuevo ID basándose en el nombre del componente
  const findNewStoryId = (oldStoryId: string): string | null => {
    // Extraer el nombre del componente y el variant del ID antiguo
    // Ejemplo: "components-data-table--default" -> "data-table--default"
    const match = oldStoryId.match(/^components-(.+)$/)
    if (match) {
      const componentPart = match[1] // "data-table--default"
      
      // Intentar encontrar el nuevo ID en las categorías posibles
      const categories = ['formularios', 'data', 'navegacion', 'feedback', 'charts', 'layout', 'basicos']
      
      for (const category of categories) {
        const newId = `${category}-${componentPart}`
        // Verificar si existe en el índice de stories (esto se hace después de que Storybook cargue)
        // Por ahora, solo intentamos con las categorías más probables
        if (componentPart.startsWith('data-')) {
          return `data-${componentPart.replace('data-', '')}`
        }
      }
    }
    
    return null
  }
  
  // Limpiar caché al cargar
  clearStorybookCache()
  
  // Intentar redirigir si hay un ID antiguo en la URL
  const checkAndRedirect = () => {
    const currentPath = window.location.pathname + window.location.search
    const storyMatch = currentPath.match(/\/story\/([^/?]+)/)
    
    if (storyMatch) {
      const storyId = storyMatch[1]
      
      // Si el ID comienza con "components-", intentar encontrar el nuevo
      if (storyId.startsWith('components-')) {
        const newStoryId = findNewStoryId(storyId)
        
        if (newStoryId) {
          const newPath = currentPath.replace(`/${storyId}`, `/${newStoryId}`)
          window.history.replaceState({}, '', newPath)
          // Recargar la página para que Storybook cargue el nuevo story
          window.location.reload()
          return
        } else {
          // Si no encontramos el nuevo ID, redirigir a la página principal
          window.location.href = window.location.origin + window.location.pathname.replace(/\/story\/.*/, '')
        }
      }
    }
  }
  
  // Ejecutar después de un breve delay para que Storybook se inicialice
  setTimeout(checkAndRedirect, 100)
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Tokens UBITS',
          [
            'Tokens UBITS',
            '01. Modificadores (.modifiers)',
            '02. Semánticos',
            '03. Componentes',
            '04. Effects',
            '05. Tipografía',
            '06. Spacing',
            '07. Text Styles',
            '08. Border Radius',
          ],
          'Templates',
          [
            'Templates',
            'Templates UBITS Desktop',
            'Welcome Test',
          ],
        ],
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
      
      // Limpiar componentes flotantes que no pertenecen a esta historia
      const storyId = ctx.id || ''
      const isTooltipStory = storyId.includes('tooltip')
      const isPopoverStory = storyId.includes('popover')
      const isButtonFeedbackStory = storyId.includes('button-feedback')
      const isModalStory = storyId.includes('modal')
      const isDrawerStory = storyId.includes('drawer')
      const isToastStory = storyId.includes('toast')
      const isAlertStory = storyId.includes('alert')
      const isMaskStory = storyId.includes('mask')
      
      // Limpiar tooltips si no es la historia de tooltip
      if (!isTooltipStory) {
        const tooltips = document.querySelectorAll('.ubits-tooltip')
        tooltips.forEach((tooltip) => {
          try {
            if (tooltip.parentElement) {
              tooltip.parentElement.removeChild(tooltip)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar popovers si no es la historia de popover
      if (!isPopoverStory) {
        const popovers = document.querySelectorAll('.ubits-popover')
        popovers.forEach((popover) => {
          try {
            if (popover.parentElement) {
              popover.parentElement.removeChild(popover)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar modales si no es la historia de modal
      if (!isModalStory) {
        const modalOverlays = document.querySelectorAll('.ubits-modal-overlay')
        modalOverlays.forEach((overlay) => {
          try {
            if (overlay.parentElement) {
              overlay.parentElement.removeChild(overlay)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar drawers si no es la historia de drawer
      if (!isDrawerStory) {
        const drawerOverlays = document.querySelectorAll('.ubits-drawer-overlay')
        drawerOverlays.forEach((overlay) => {
          try {
            if (overlay.parentElement) {
              overlay.parentElement.removeChild(overlay)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar toasts si no es la historia de toast
      if (!isToastStory) {
        const toasts = document.querySelectorAll('.ubits-toast')
        toasts.forEach((toast) => {
          try {
            if (toast.parentElement) {
              toast.parentElement.removeChild(toast)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
        // También limpiar el contenedor de toasts si existe
        const toastContainer = document.getElementById('ubits-toast-container')
        if (toastContainer) {
          try {
            toastContainer.innerHTML = ''
          } catch (e) {
            // Ignorar errores
          }
        }
      }
      
      // Limpiar alerts si no es la historia de alert
      if (!isAlertStory) {
        const alerts = document.querySelectorAll('.ubits-alert')
        alerts.forEach((alert) => {
          try {
            if (alert.parentElement) {
              alert.parentElement.removeChild(alert)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar máscaras si no es la historia de mask
      if (!isMaskStory) {
        const maskOverlays = document.querySelectorAll('.ubits-mask-overlay')
        maskOverlays.forEach((overlay) => {
          try {
            // Cerrar la máscara antes de eliminarla para restaurar el body
            overlay.classList.remove('ubits-mask-overlay--open')
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.width = ''
            document.body.style.paddingRight = ''
            
            if (overlay.parentElement) {
              overlay.parentElement.removeChild(overlay)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar button feedback si no es la historia de button feedback
      if (!isButtonFeedbackStory) {
        const feedbackButtons = document.querySelectorAll(
          '.ubits-button-feedback--bottom-right, .ubits-button-feedback--bottom-left, .ubits-button-feedback--top-right, .ubits-button-feedback--top-left'
        )
        feedbackButtons.forEach((button) => {
          try {
            if (button.parentElement) {
              button.parentElement.removeChild(button)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
        
        // También limpiar modales de feedback
        const feedbackModals = document.querySelectorAll('.ubits-button-feedback-modal')
        feedbackModals.forEach((modal) => {
          const overlay = modal.closest('.ubits-modal-overlay')
          if (overlay && overlay.parentElement) {
            try {
              overlay.parentElement.removeChild(overlay)
            } catch (e) {
              // Ignorar errores
            }
          }
        })
      }
      
      // Determinar el color de fondo según el tema
      const bgColor = theme === 'dark' 
        ? 'var(--modifiers-normal-color-dark-bg-2)' 
        : 'var(--modifiers-normal-color-light-bg-2)'
      
      // Asegurar que el fondo del body sea diferente al sidebar
      document.body.style.backgroundColor = bgColor
      
      // Agregar CSS para el preview de Storybook con fondo según el tema
      const styleId = 'storybook-preview-theme-style'
      let style = document.getElementById(styleId) as HTMLStyleElement
      if (!style) {
        style = document.createElement('style')
        style.id = styleId
        document.head.appendChild(style)
      }
      
      style.textContent = `
        .sb-previewBlock {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'transparent'} !important;
          border: none !important;
        }
        .sb-wrapper {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'transparent'} !important;
        }
        #storybook-root {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'transparent'} !important;
        }
        /* Fondo para el preview en la documentación */
        .docs-story {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'var(--modifiers-normal-color-light-bg-2)'} !important;
        }
        .sbdocs-preview {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'var(--modifiers-normal-color-light-bg-2)'} !important;
        }
        .os-host {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'var(--modifiers-normal-color-light-bg-2)'} !important;
        }
      `
      
      return story()
    },
  ],
}

export default preview

