// Test completo de los index.ts
import { renderDataView, createDataView } from './packages/addons/data-view/dist/index.js';
import { renderSlider, createSlider, SliderAddon } from './packages/addons/slider/dist/index.js';

console.log('✅ Todos los imports funcionaron');
console.log('data-view exports:', { renderDataView: typeof renderDataView, createDataView: typeof createDataView });
console.log('slider exports:', { renderSlider: typeof renderSlider, createSlider: typeof createSlider, SliderAddon: typeof SliderAddon });

// Probar renderDataView
const html1 = renderDataView({
  products: [{ image: 'test.jpg', category: 'Test', name: 'Test', rating: 4, price: 100 }]
});
console.log('✅ renderDataView funciona');

// Probar renderSlider
const html2 = renderSlider({ containerId: 'test', value: 50 });
console.log('✅ renderSlider funciona');

console.log('✅ TODOS LOS INDEX.TS FUNCIONAN');
