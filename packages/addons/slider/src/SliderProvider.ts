/**
 * SliderProvider
 * Lógica de renderizado y gestión del componente Slider
 * Incluye todas las variantes: horizontal/vertical, single/range, con/sin inputs
 */

import type { SliderOptions, SliderMode, SliderOrientation } from './types/SliderOptions';
import { createInput } from '../../input/src/InputProvider';
import type { InputOptions } from '../../input/src/types/InputOptions';

/**
 * Renderiza un slider UBITS como HTML string
 */
export function renderSlider(options: SliderOptions): string {
  const {
    containerId,
    label = '',
    helperText = '',
    size = 'md',
    state = 'default',
    orientation = 'horizontal',
    mode = 'single',
    min = 0,
    max = 100,
    step = 1,
    value = 50,
    values = [25, 75],
    showInputs = false,
    showLabel = true,
    showHelper = false,
    showMarks = false,
    marks = [],
    showRangeGuide = false,
    className = '',
    attributes = {}
  } = options;

  // Si showRangeGuide está activo, activar automáticamente los inputs
  const effectiveShowInputs = showInputs || showRangeGuide;

  const isDisabled = state === 'disabled';
  const isVertical = orientation === 'vertical';
  const isRange = mode === 'range';
  const currentValue = isRange ? values[0] : value;
  const currentValue2 = isRange ? values[1] : null;

  // Clases base
  const sliderClasses = ['ubits-slider'];
  if (isVertical) sliderClasses.push('ubits-slider--vertical');
  if (size) sliderClasses.push(`ubits-slider--${size}`);
  if (isDisabled) sliderClasses.push('ubits-slider--disabled');
  if (className) sliderClasses.push(className);

  let sliderHTML = `<div class="${sliderClasses.join(' ')}" id="${containerId}">`;

  // Label
  if (showLabel && label) {
    sliderHTML += `<label class="ubits-slider-label">${label}</label>`;
  }

  // Wrapper principal que contiene slider e inputs
  sliderHTML += '<div class="ubits-slider-main-wrapper">';
  
  // Input izquierdo (solo para range) - activar si showInputs o showRangeGuide está activo
  if (effectiveShowInputs && isRange) {
    sliderHTML += `<div class="ubits-slider-input" id="${containerId}-input-min"></div>`;
  }
  
  // Wrapper del slider
  sliderHTML += '<div class="ubits-slider-wrapper">';

  // Track container
  sliderHTML += '<div class="ubits-slider-track-container" style="position: relative; flex: 1;">';
  sliderHTML += '<div class="ubits-slider-track">';

  // Track fill (para modo single)
  if (!isRange) {
    const percentage = ((currentValue - min) / (max - min)) * 100;
    if (isVertical) {
      // En vertical, el thumb está en top: ${100 - percentage}% con transform: translate(-50%, 50%)
      // El transform mueve el thumb 50% de su altura hacia abajo, así que el centro está en:
      // top position (${100 - percentage}%) + 50% de altura del thumb
      // El fill debe ir hasta el centro del thumb, que está ligeramente más abajo que ${100 - percentage}%
      // Para simplificar, usamos el porcentaje directamente ya que el offset del transform es pequeño
      sliderHTML += `<div class="ubits-slider-track-fill" style="height: ${percentage}%; bottom: 0;"></div>`;
    } else {
      sliderHTML += `<div class="ubits-slider-track-fill" style="width: ${percentage}%;"></div>`;
    }
  } else {
    // Track range (para modo range)
    const minPercentage = ((values[0] - min) / (max - min)) * 100;
    const maxPercentage = ((values[1] - min) / (max - min)) * 100;
    const rangeWidth = maxPercentage - minPercentage;
    if (isVertical) {
      sliderHTML += `<div class="ubits-slider-track-range" style="bottom: ${minPercentage}%; height: ${rangeWidth}%;"></div>`;
    } else {
      sliderHTML += `<div class="ubits-slider-track-range" style="left: ${minPercentage}%; width: ${rangeWidth}%;"></div>`;
    }
  }

  // Marks
  if (showMarks && marks.length > 0) {
    sliderHTML += '<div class="ubits-slider-marks">';
    marks.forEach((markValue) => {
      const markPercentage = ((markValue - min) / (max - min)) * 100;
      if (isVertical) {
        sliderHTML += `<div class="ubits-slider-mark" style="top: ${100 - markPercentage}%; left: 50%;"></div>`;
      } else {
        sliderHTML += `<div class="ubits-slider-mark" style="left: ${markPercentage}%; top: 50%;"></div>`;
      }
    });
    sliderHTML += '</div>';
  }

  // Thumb(s)
  if (!isRange) {
    const thumbPercentage = ((currentValue - min) / (max - min)) * 100;
    if (isVertical) {
      sliderHTML += `<div class="ubits-slider-thumb" style="top: ${100 - thumbPercentage}%; left: 50%;" data-value="${currentValue}" tabindex="0" ${isDisabled ? 'disabled' : ''}></div>`;
    } else {
      sliderHTML += `<div class="ubits-slider-thumb" style="left: ${thumbPercentage}%; top: 50%;" data-value="${currentValue}" tabindex="0" ${isDisabled ? 'disabled' : ''}></div>`;
    }
  } else {
    const minPercentage = ((values[0] - min) / (max - min)) * 100;
    const maxPercentage = ((values[1] - min) / (max - min)) * 100;
    if (isVertical) {
      sliderHTML += `<div class="ubits-slider-thumb ubits-slider-thumb--min" style="top: ${100 - minPercentage}%; left: 50%;" data-value="${values[0]}" tabindex="0" ${isDisabled ? 'disabled' : ''}></div>`;
      sliderHTML += `<div class="ubits-slider-thumb ubits-slider-thumb--max" style="top: ${100 - maxPercentage}%; left: 50%;" data-value="${values[1]}" tabindex="0" ${isDisabled ? 'disabled' : ''}></div>`;
    } else {
      sliderHTML += `<div class="ubits-slider-thumb ubits-slider-thumb--min" style="left: ${minPercentage}%; top: 50%;" data-value="${values[0]}" tabindex="0" ${isDisabled ? 'disabled' : ''}></div>`;
      sliderHTML += `<div class="ubits-slider-thumb ubits-slider-thumb--max" style="left: ${maxPercentage}%; top: 50%;" data-value="${values[1]}" tabindex="0" ${isDisabled ? 'disabled' : ''}></div>`;
    }
  }

  sliderHTML += '</div>'; // .ubits-slider-track
  sliderHTML += '</div>'; // .ubits-slider-track-container

  sliderHTML += '</div>'; // .ubits-slider-wrapper

  // Input derecho (para range y single) - activar si showInputs o showRangeGuide está activo
  if (effectiveShowInputs) {
    if (isRange) {
      sliderHTML += `<div class="ubits-slider-input" id="${containerId}-input-max"></div>`;
    } else {
      sliderHTML += `<div class="ubits-slider-input" id="${containerId}-input-value"></div>`;
    }
  }

  sliderHTML += '</div>'; // .ubits-slider-main-wrapper

  // Guía visual del rango (debajo del slider, alineada con el wrapper)
  if (!isVertical) {
    sliderHTML += `<div class="ubits-slider-range-guide-wrapper">`;
    sliderHTML += `<div class="ubits-slider-range-guide" id="${containerId}-range-guide">`;
    
    if (showRangeGuide) {
      // Calcular valores intermedios para la regla (tipo regla: 10, 20, 30, etc.)
      const range = max - min;
      const idealNumSteps = 10;
      let guideStep = Math.ceil(range / idealNumSteps);
      
      const magnitude = Math.pow(10, Math.floor(Math.log10(guideStep)));
      const normalized = guideStep / magnitude;
      let niceStep = magnitude;
      if (normalized <= 1) niceStep = magnitude;
      else if (normalized <= 2) niceStep = 2 * magnitude;
      else if (normalized <= 5) niceStep = 5 * magnitude;
      else niceStep = 10 * magnitude;
      
      // Mostrar todos los valores intermedios
      let guideValue = min;
      while (guideValue <= max) {
        const percentage = ((guideValue - min) / (max - min)) * 100;
        sliderHTML += `<span class="ubits-slider-range-guide-value" style="left: ${percentage}%">${Math.round(guideValue)}</span>`;
        guideValue += niceStep;
      }
    } else {
      // Cuando la regleta está desactivada, mostrar min a la izquierda y valor actual a la derecha
      // Estos dos valores deben estar en bold
      sliderHTML += `<span class="ubits-slider-range-guide-value ubits-slider-range-guide-value--bold" style="left: 0%">${min}</span>`;
      // El valor de la derecha se actualizará dinámicamente según el valor actual
      const currentDisplayValue = isRange ? values[1] : value;
      sliderHTML += `<span class="ubits-slider-range-guide-value ubits-slider-range-guide-value--bold" id="${containerId}-range-guide-current" style="left: 100%">${currentDisplayValue}</span>`;
    }
    
    sliderHTML += `</div>`;
    sliderHTML += `</div>`;
  }

  // Helper text (debajo de la regleta o valores 0-100)
  if (showHelper && helperText) {
    sliderHTML += `<div class="ubits-input-helper">`;
    sliderHTML += `<span>${helperText}</span>`;
    sliderHTML += `</div>`;
  }

  sliderHTML += '</div>'; // .ubits-slider

  // Agregar atributos adicionales
  const attrs = Object.entries(attributes)
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ');

  if (attrs) {
    return `<div ${attrs}>${sliderHTML}</div>`;
  }

  return sliderHTML;
}

/**
 * Crea un elemento slider programáticamente
 */
export function createSlider(options: SliderOptions): {
  element: HTMLDivElement;
  getValue: () => number | [number, number];
  setValue: (value: number | [number, number]) => void;
  disable: () => void;
  enable: () => void;
  setState: (newState: 'default' | 'disabled') => void;
} | null {
  const {
    containerId,
    onChange,
    onRangeChange,
    min = 0,
    max = 100,
    step = 1,
    mode = 'single',
    value = 50,
    values = [25, 75],
    orientation = 'horizontal',
    showInputs = false,
    state = 'default',
    size = 'md',
    showRangeGuide = false
  } = options;

  // Si showRangeGuide está activo, activar automáticamente los inputs
  const effectiveShowInputs = showInputs || showRangeGuide;

  // Validar parámetros requeridos
  if (!containerId) {
    console.error('UBITS Slider: containerId es requerido');
    return null;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`UBITS Slider: No se encontró el contenedor con ID "${containerId}"`);
    return null;
  }

  // Renderizar HTML
  const sliderHTML = renderSlider(options);
  container.innerHTML = sliderHTML;

  // Obtener elementos del DOM
  const sliderElement = container.querySelector(`#${containerId}`) as HTMLDivElement || container.querySelector('.ubits-slider') as HTMLDivElement;
  
  if (!sliderElement) {
    console.error('UBITS Slider: No se encontró el elemento slider');
    return null;
  }
  
  // Obtener elementos después de asegurar que el slider existe
  const track = container.querySelector('.ubits-slider-track') as HTMLDivElement;
  const thumbs = container.querySelectorAll('.ubits-slider-thumb') as NodeListOf<HTMLDivElement>;
  const valueDisplay = container.querySelector(`#${containerId}-value-display`) as HTMLElement;
  
  // Definir variables de estado antes de createInputs
  const isRange = mode === 'range';
  const isVertical = orientation === 'vertical';
  const isDisabled = state === 'disabled';
  
  // Crear inputs UBITS si showInputs es true (usar requestAnimationFrame para asegurar que el DOM esté listo)
  let inputMinInstance: ReturnType<typeof createInput> | null = null;
  let inputMaxInstance: ReturnType<typeof createInput> | null = null;
  let inputValueInstance: ReturnType<typeof createInput> | null = null;
  
  const createInputs = () => {
    if (!effectiveShowInputs) return;
    
    // Buscar dentro del sliderElement (donde están los inputs)
    if (isRange) {
      // Input min (izquierda)
      const inputMinContainerId = `${containerId}-input-min`;
      let inputMinContainer: HTMLElement | null = sliderElement.querySelector(`#${inputMinContainerId}`) as HTMLElement | null;
      if (!inputMinContainer) {
        inputMinContainer = container.querySelector(`#${inputMinContainerId}`) as HTMLElement | null;
      }
      if (!inputMinContainer) {
        inputMinContainer = document.getElementById(inputMinContainerId) as HTMLElement | null;
      }
      if (inputMinContainer) {
        // Asegurar que el contenedor tenga el tamaño correcto
        inputMinContainer.style.width = '100px';
        inputMinContainer.style.minWidth = '80px';
        inputMinContainer.style.maxWidth = '100px';
        inputMinContainer.style.flexShrink = '0';
        try {
          // El contenedor ya existe, createInput lo llenará con el HTML del input
          inputMinInstance = createInput({
            containerId: inputMinContainerId,
            type: 'number',
            size: size,
            state: isDisabled ? 'disabled' : 'default',
            value: values[0].toString(),
            showLabel: false,
            showHelper: false
          });
          
          // Agregar atributos al input después de crearlo
          const inputElement = inputMinContainer.querySelector('input') as HTMLInputElement;
          if (inputElement) {
            inputElement.setAttribute('data-slider-input', 'min');
            inputElement.setAttribute('min', min.toString());
            inputElement.setAttribute('max', max.toString());
            inputElement.setAttribute('step', step.toString());
          }
          // Asegurar que el wrapper del input no se expanda
          if (inputMinInstance) {
            const inputWrapper = inputMinContainer.querySelector('div[style*="position: relative"]') as HTMLElement;
            if (inputWrapper) {
              inputWrapper.style.width = '100%';
              inputWrapper.style.maxWidth = '100%';
            }
          }
        } catch (e) {
          console.warn('Error creating min input:', e);
        }
      } else {
        console.error('UBITS Slider: No se encontró el contenedor del input min:', inputMinContainerId);
      }
      
      // Input max (derecha)
      const inputMaxContainerId = `${containerId}-input-max`;
      let inputMaxContainer: HTMLElement | null = sliderElement.querySelector(`#${inputMaxContainerId}`) as HTMLElement | null;
      if (!inputMaxContainer) {
        inputMaxContainer = container.querySelector(`#${inputMaxContainerId}`) as HTMLElement | null;
      }
      if (!inputMaxContainer) {
        inputMaxContainer = document.getElementById(inputMaxContainerId) as HTMLElement | null;
      }
      if (inputMaxContainer) {
        // Asegurar que el contenedor tenga el tamaño correcto
        inputMaxContainer.style.width = '100px';
        inputMaxContainer.style.minWidth = '80px';
        inputMaxContainer.style.maxWidth = '100px';
        inputMaxContainer.style.flexShrink = '0';
        try {
          inputMaxInstance = createInput({
            containerId: inputMaxContainerId,
            type: 'number',
            size: size,
            state: isDisabled ? 'disabled' : 'default',
            value: values[1].toString(),
            showLabel: false,
            showHelper: false
          });
          
          // Agregar atributos al input después de crearlo
          const inputElement = inputMaxContainer.querySelector('input') as HTMLInputElement;
          if (inputElement) {
            inputElement.setAttribute('data-slider-input', 'max');
            inputElement.setAttribute('min', min.toString());
            inputElement.setAttribute('max', max.toString());
            inputElement.setAttribute('step', step.toString());
          }
          // Asegurar que el wrapper del input no se expanda
          if (inputMaxInstance) {
            const inputWrapper = inputMaxContainer.querySelector('div[style*="position: relative"]') as HTMLElement;
            if (inputWrapper) {
              inputWrapper.style.width = '100%';
              inputWrapper.style.maxWidth = '100%';
            }
          }
        } catch (e) {
          console.warn('Error creating max input:', e);
        }
      } else {
        console.error('UBITS Slider: No se encontró el contenedor del input max:', inputMaxContainerId);
      }
    } else {
      // Input value (derecha, solo para single)
      const inputValueContainerId = `${containerId}-input-value`;
      let inputValueContainer: HTMLElement | null = sliderElement.querySelector(`#${inputValueContainerId}`) as HTMLElement | null;
      if (!inputValueContainer) {
        inputValueContainer = container.querySelector(`#${inputValueContainerId}`) as HTMLElement | null;
      }
      if (!inputValueContainer) {
        inputValueContainer = document.getElementById(inputValueContainerId) as HTMLElement | null;
      }
      if (inputValueContainer) {
        // Asegurar que el contenedor tenga el tamaño correcto
        inputValueContainer.style.width = '100px';
        inputValueContainer.style.minWidth = '80px';
        inputValueContainer.style.maxWidth = '100px';
        inputValueContainer.style.flexShrink = '0';
        try {
          inputValueInstance = createInput({
            containerId: inputValueContainerId,
            type: 'number',
            size: size,
            state: isDisabled ? 'disabled' : 'default',
            value: value.toString(),
            showLabel: false,
            showHelper: false
          });
          
          // Agregar atributos al input después de crearlo
          const inputElement = inputValueContainer.querySelector('input') as HTMLInputElement;
          if (inputElement) {
            inputElement.setAttribute('data-slider-input', 'value');
            inputElement.setAttribute('min', min.toString());
            inputElement.setAttribute('max', max.toString());
            inputElement.setAttribute('step', step.toString());
          }
          // Asegurar que el wrapper del input no se expanda
          if (inputValueInstance) {
            const inputWrapper = inputValueContainer.querySelector('div[style*="position: relative"]') as HTMLElement;
            if (inputWrapper) {
              inputWrapper.style.width = '100%';
              inputWrapper.style.maxWidth = '100%';
            }
          }
        } catch (e) {
          console.warn('Error creating value input:', e);
        }
      } else {
        console.error('UBITS Slider: No se encontró el contenedor del input value:', inputValueContainerId);
      }
    }
    
    // Re-obtener inputs después de crearlos
    inputElements = getInputElements();
    // Configurar listeners después de crear los inputs
    setupInputListeners();
  };
  
  // Obtener referencias a los inputs reales (después de crearlos)
  const getInputElements = () => {
    return container.querySelectorAll('input[data-slider-input]') as NodeListOf<HTMLInputElement>;
  };
  
  let inputElements = getInputElements();
  
  // Crear inputs después de que el DOM esté listo
  if (effectiveShowInputs) {
    // Usar requestAnimationFrame doble para asegurar que el DOM esté completamente renderizado
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        createInputs();
      });
    });
  }

  if (!sliderElement || !track || thumbs.length === 0) {
    console.error('UBITS Slider: No se pudo crear el elemento slider');
    return null;
  }

  // Estado interno
  let currentValue = isRange ? [...values] as [number, number] : value;
  let isDragging = false;
  let activeThumb: HTMLDivElement | null = null;

  // Función para calcular el valor desde la posición
  const getValueFromPosition = (clientX: number, clientY: number): number => {
    const rect = track.getBoundingClientRect();
    let percentage: number;

    if (isVertical) {
      const y = clientY - rect.top;
      percentage = 1 - (y / rect.height);
    } else {
      const x = clientX - rect.left;
      percentage = x / rect.width;
    }

    percentage = Math.max(0, Math.min(1, percentage));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  // Función para actualizar la posición del thumb
  const updateThumbPosition = (thumb: HTMLDivElement, val: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    if (isVertical) {
      // En vertical, el thumb se posiciona desde arriba
      // El transform: translate(-50%, 50%) centra el thumb, moviendo 50% de su altura hacia abajo
      // El centro del thumb está en: top + (50% de altura) = ${100 - percentage}% + offset
      thumb.style.top = `${100 - percentage}%`;
      thumb.style.left = '50%';
    } else {
      thumb.style.left = `${percentage}%`;
      thumb.style.top = '50%';
    }
    thumb.setAttribute('data-value', val.toString());
  };

  // Función para actualizar el track fill
  const updateTrackFill = () => {
    const trackFill = container.querySelector('.ubits-slider-track-fill') as HTMLDivElement;
    const trackRange = container.querySelector('.ubits-slider-track-range') as HTMLDivElement;

    if (isRange) {
      if (trackRange) {
        const minVal = (currentValue as [number, number])[0];
        const maxVal = (currentValue as [number, number])[1];
        const minPercentage = ((minVal - min) / (max - min)) * 100;
        const maxPercentage = ((maxVal - min) / (max - min)) * 100;
        if (isVertical) {
          // En vertical, necesitamos ajustar para que el range termine en los centros de los thumbs
          const trackRect = track.getBoundingClientRect();
          const thumbElements = container.querySelectorAll('.ubits-slider-thumb') as NodeListOf<HTMLDivElement>;
          if (thumbElements.length >= 2 && trackRect.height > 0) {
            const minThumb = Array.from(thumbElements).find(t => t.classList.contains('ubits-slider-thumb--min'));
            const maxThumb = Array.from(thumbElements).find(t => t.classList.contains('ubits-slider-thumb--max'));
            if (minThumb && maxThumb) {
              const minThumbRect = minThumb.getBoundingClientRect();
              const maxThumbRect = maxThumb.getBoundingClientRect();
              const thumbHeightPercent = (minThumbRect.height / trackRect.height) * 100;
              
              // Ajustar el bottom para que termine en el centro del thumb min
              const adjustedMinPercentage = Math.max(0, minPercentage - (thumbHeightPercent / 2));
              // Ajustar la altura para que termine en el centro del thumb max
              const adjustedMaxPercentage = Math.max(0, maxPercentage - (thumbHeightPercent / 2));
              const adjustedRangeWidth = adjustedMaxPercentage - adjustedMinPercentage;
              
              trackRange.style.bottom = `${adjustedMinPercentage}%`;
              trackRange.style.height = `${adjustedRangeWidth}%`;
            } else {
              // Fallback
              trackRange.style.bottom = `${minPercentage}%`;
              trackRange.style.height = `${maxPercentage - minPercentage}%`;
            }
          } else {
            // Fallback
            trackRange.style.bottom = `${minPercentage}%`;
            trackRange.style.height = `${maxPercentage - minPercentage}%`;
          }
        } else {
          const rangeWidth = maxPercentage - minPercentage;
          trackRange.style.left = `${minPercentage}%`;
          trackRange.style.width = `${rangeWidth}%`;
        }
      }
    } else {
      if (trackFill) {
        const percentage = ((currentValue as number - min) / (max - min)) * 100;
        if (isVertical) {
          // En vertical, el thumb está en top: ${100 - percentage}% con transform: translate(-50%, 50%)
          // El transform mueve el thumb 50% de su altura hacia abajo, así que el centro está más abajo
          // Para calcular la posición exacta del centro, necesitamos la altura del thumb y del track
          const trackRect = track.getBoundingClientRect();
          const thumbElement = container.querySelector('.ubits-slider-thumb') as HTMLDivElement;
          if (thumbElement && trackRect.height > 0) {
            const thumbRect = thumbElement.getBoundingClientRect();
            const thumbHeightPercent = (thumbRect.height / trackRect.height) * 100;
            // El centro del thumb está en: top + (50% de altura del thumb)
            // top = ${100 - percentage}%, así que el centro está en ${100 - percentage + thumbHeightPercent/2}%
            // Desde abajo, eso es ${percentage - thumbHeightPercent/2}%
            const adjustedPercentage = Math.max(0, percentage - (thumbHeightPercent / 2));
            trackFill.style.height = `${adjustedPercentage}%`;
            trackFill.style.bottom = '0';
          } else {
            // Fallback: usar el porcentaje directamente
            trackFill.style.height = `${percentage}%`;
            trackFill.style.bottom = '0';
          }
        } else {
          trackFill.style.width = `${percentage}%`;
        }
      }
    }
  };

  // Función para actualizar inputs y medición
  const updateInputs = () => {
    // Re-obtener inputs por si acaso se crearon después
    inputElements = getInputElements();
    
    inputElements.forEach((input) => {
      const inputType = input.getAttribute('data-slider-input');
      if (inputType === 'value' && !isRange) {
        input.value = (currentValue as number).toString();
      } else if (inputType === 'min' && isRange) {
        input.value = (currentValue as [number, number])[0].toString();
      } else if (inputType === 'max' && isRange) {
        input.value = (currentValue as [number, number])[1].toString();
      }
    });
    
    // Actualizar inputs UBITS si existen
    if (inputValueInstance && !isRange) {
      inputValueInstance.setValue((currentValue as number).toString());
    }
    if (inputMinInstance && isRange) {
      inputMinInstance.setValue((currentValue as [number, number])[0].toString());
    }
    if (inputMaxInstance && isRange) {
      inputMaxInstance.setValue((currentValue as [number, number])[1].toString());
    }
    
    // Actualizar medición de valor (solo si existe, es decir, si no hay inputs)
    if (valueDisplay) {
      if (isRange) {
        const [minVal, maxVal] = currentValue as [number, number];
        valueDisplay.textContent = `${minVal} - ${maxVal}`;
      } else {
        valueDisplay.textContent = (currentValue as number).toString();
      }
    }
    
    // Actualizar valor de la guía cuando la regleta está desactivada
    const rangeGuideCurrent = container.querySelector(`#${containerId}-range-guide-current`) as HTMLElement;
    if (rangeGuideCurrent && !showRangeGuide) {
      if (isRange) {
        const maxVal = (currentValue as [number, number])[1];
        rangeGuideCurrent.textContent = maxVal.toString();
      } else {
        rangeGuideCurrent.textContent = (currentValue as number).toString();
      }
    }
  };

  // Función para actualizar todo
  const updateSlider = () => {
    if (isRange) {
      const [minVal, maxVal] = currentValue as [number, number];
      const minThumb = container.querySelector('.ubits-slider-thumb--min') as HTMLDivElement;
      const maxThumb = container.querySelector('.ubits-slider-thumb--max') as HTMLDivElement;
      if (minThumb) updateThumbPosition(minThumb, minVal);
      if (maxThumb) updateThumbPosition(maxThumb, maxVal);
    } else {
      const thumb = thumbs[0];
      if (thumb) updateThumbPosition(thumb, currentValue as number);
    }
    updateTrackFill();
    updateInputs();
  };

  // Event listeners para thumbs
  const handleThumbMouseDown = (e: MouseEvent, thumb: HTMLDivElement) => {
    if (isDisabled) return;
    e.preventDefault();
    isDragging = true;
    activeThumb = thumb;
    thumb.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !activeThumb || isDisabled) return;
    e.preventDefault();

    const newValue = getValueFromPosition(e.clientX, e.clientY);

    if (isRange) {
      const [minVal, maxVal] = currentValue as [number, number];
      const isMinThumb = activeThumb.classList.contains('ubits-slider-thumb--min');

      if (isMinThumb) {
        const newMin = Math.min(newValue, maxVal - step);
        currentValue = [newMin, maxVal] as [number, number];
      } else {
        const newMax = Math.max(newValue, minVal + step);
        currentValue = [minVal, newMax] as [number, number];
      }

      if (onRangeChange) {
        onRangeChange(currentValue as [number, number], e);
      }
    } else {
      currentValue = newValue;
      if (onChange) {
        onChange(newValue, e);
      }
    }

    updateSlider();
  };

  const handleMouseUp = () => {
    if (activeThumb) {
      activeThumb.style.cursor = 'grab';
    }
    isDragging = false;
    activeThumb = null;
  };

  // Event listeners para track click
  const handleTrackClick = (e: MouseEvent) => {
    if (isDisabled || isDragging) return;
    const newValue = getValueFromPosition(e.clientX, e.clientY);

    if (isRange) {
      const [minVal, maxVal] = currentValue as [number, number];
      const distanceToMin = Math.abs(newValue - minVal);
      const distanceToMax = Math.abs(newValue - maxVal);

      if (distanceToMin < distanceToMax) {
        const newMin = Math.min(newValue, maxVal - step);
        currentValue = [newMin, maxVal] as [number, number];
        if (onRangeChange) {
          onRangeChange(currentValue as [number, number], e);
        }
      } else {
        const newMax = Math.max(newValue, minVal + step);
        currentValue = [minVal, newMax] as [number, number];
        if (onRangeChange) {
          onRangeChange(currentValue as [number, number], e);
        }
      }
    } else {
      currentValue = newValue;
      if (onChange) {
        onChange(newValue, e);
      }
    }

    updateSlider();
  };

  // Agregar event listeners
  if (thumbs.length === 0) {
    console.error('UBITS Slider: No se encontraron thumbs para agregar event listeners');
  } else {
    thumbs.forEach((thumb) => {
      thumb.addEventListener('mousedown', (e) => handleThumbMouseDown(e, thumb));
      thumb.addEventListener('touchstart', (e) => {
        if (isDisabled) return;
        e.preventDefault();
        isDragging = true;
        activeThumb = thumb;
      }, { passive: false });
    });
  }

  if (track) {
    track.addEventListener('click', handleTrackClick);
  } else {
    console.error('UBITS Slider: No se encontró el track para agregar event listener');
  }

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchmove', (e) => {
    if (!isDragging || !activeThumb || isDisabled) return;
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      handleMouseMove(new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      }));
    }
  }, { passive: false });
  document.addEventListener('touchend', handleMouseUp);

  // Event listeners para inputs (tanto los inputs UBITS como los nativos)
  const setupInputListeners = () => {
    // Re-obtener inputs por si acaso se crearon después
    inputElements = getInputElements();
    
    inputElements.forEach((input) => {
      // Remover listeners anteriores si existen
      const newInput = input.cloneNode(true) as HTMLInputElement;
      input.parentNode?.replaceChild(newInput, input);
      
      newInput.addEventListener('input', (e) => {
        if (isDisabled) return;
        const inputValue = parseFloat(newInput.value);
        if (isNaN(inputValue)) return;

        const clampedValue = Math.max(min, Math.min(max, inputValue));
        const inputType = newInput.getAttribute('data-slider-input');

        if (isRange) {
          const [minVal, maxVal] = currentValue as [number, number];
          if (inputType === 'min') {
            const newMin = Math.min(clampedValue, maxVal - step);
            currentValue = [newMin, maxVal] as [number, number];
            if (onRangeChange) {
              onRangeChange(currentValue as [number, number], e);
            }
          } else if (inputType === 'max') {
            const newMax = Math.max(clampedValue, minVal + step);
            currentValue = [minVal, newMax] as [number, number];
            if (onRangeChange) {
              onRangeChange(currentValue as [number, number], e);
            }
          }
        } else {
          currentValue = clampedValue;
          if (onChange) {
            onChange(clampedValue, e);
          }
        }

        updateSlider();
      });
      
      newInput.addEventListener('blur', (e) => {
        // Asegurar que el valor esté dentro del rango al perder el foco
        const inputValue = parseFloat(newInput.value);
        if (isNaN(inputValue)) {
          // Si no es un número válido, restaurar el valor anterior
          updateSlider();
          return;
        }
        const clampedValue = Math.max(min, Math.min(max, inputValue));
        const inputType = newInput.getAttribute('data-slider-input');

        if (isRange) {
          const [minVal, maxVal] = currentValue as [number, number];
          if (inputType === 'min') {
            const newMin = Math.min(clampedValue, maxVal - step);
            currentValue = [newMin, maxVal] as [number, number];
          } else if (inputType === 'max') {
            const newMax = Math.max(clampedValue, minVal + step);
            currentValue = [minVal, newMax] as [number, number];
          }
        } else {
          currentValue = clampedValue;
        }

        updateSlider();
      });
    });
  };
  
  // setupInputListeners se llamará desde createInputs después de crear los inputs

  // Keyboard navigation
  thumbs.forEach((thumb) => {
    thumb.addEventListener('keydown', (e) => {
      if (isDisabled) return;
      let newValue: number;

      if (isRange) {
        const [minVal, maxVal] = currentValue as [number, number];
        const isMinThumb = thumb.classList.contains('ubits-slider-thumb--min');
        const currentVal = isMinThumb ? minVal : maxVal;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            newValue = Math.min(currentVal + step, max);
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            newValue = Math.max(currentVal - step, min);
            break;
          case 'Home':
            newValue = isMinThumb ? min : minVal;
            break;
          case 'End':
            newValue = isMinThumb ? maxVal : max;
            break;
          default:
            return;
        }

        if (isMinThumb) {
          currentValue = [Math.min(newValue, maxVal - step), maxVal] as [number, number];
        } else {
          currentValue = [minVal, Math.max(newValue, minVal + step)] as [number, number];
        }

        if (onRangeChange) {
          onRangeChange(currentValue as [number, number], e);
        }
      } else {
        const currentVal = currentValue as number;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            newValue = Math.min(currentVal + step, max);
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            newValue = Math.max(currentVal - step, min);
            break;
          case 'Home':
            newValue = min;
            break;
          case 'End':
            newValue = max;
            break;
          default:
            return;
        }

        currentValue = newValue;
        if (onChange) {
          onChange(newValue, e);
        }
      }

      e.preventDefault();
      updateSlider();
    });
  });

  // Inicializar posiciones
  updateSlider();

  // Métodos
  return {
    element: sliderElement,
    getValue: () => currentValue,
    setValue: (newValue: number | [number, number]) => {
      if (isRange && Array.isArray(newValue)) {
        const [newMin, newMax] = newValue;
        if (newMin >= min && newMin <= max && newMax >= min && newMax <= max && newMin <= newMax) {
          currentValue = [newMin, newMax] as [number, number];
          updateSlider();
        }
      } else if (!isRange && typeof newValue === 'number') {
        if (newValue >= min && newValue <= max) {
          currentValue = newValue;
          updateSlider();
        }
      }
    },
    disable: () => {
      sliderElement.classList.add('ubits-slider--disabled');
      thumbs.forEach((thumb) => {
        thumb.classList.add('ubits-slider-thumb--disabled');
        thumb.setAttribute('disabled', '');
      });
      inputElements.forEach((input) => {
        input.disabled = true;
      });
      // Deshabilitar inputs UBITS
      if (inputMinInstance) inputMinInstance.disable();
      if (inputMaxInstance) inputMaxInstance.disable();
      if (inputValueInstance) inputValueInstance.disable();
    },
    enable: () => {
      sliderElement.classList.remove('ubits-slider--disabled');
      thumbs.forEach((thumb) => {
        thumb.classList.remove('ubits-slider-thumb--disabled');
        thumb.removeAttribute('disabled');
      });
      inputElements.forEach((input) => {
        input.disabled = false;
      });
      // Habilitar inputs UBITS
      if (inputMinInstance) inputMinInstance.enable();
      if (inputMaxInstance) inputMaxInstance.enable();
      if (inputValueInstance) inputValueInstance.enable();
    },
    setState: (newState: 'default' | 'disabled') => {
      if (newState === 'disabled') {
        // Llamar a disable
        const instance = createSlider({ ...options, state: 'disabled' });
        if (instance) {
          instance.disable();
        }
      } else {
        // Llamar a enable
        const instance = createSlider({ ...options, state: 'default' });
        if (instance) {
          instance.enable();
        }
      }
    }
  };
}

