import{r as A}from"./simple-card-BmwcbEdQ.js";import"./iframe-EN31ESOT.js";import"./ButtonProvider-CX_wJeLD.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function P(e){const{items:i=[],itemsPerView:l=3,showArrows:t=!0,showDots:c=!0,autoplay:n=!1,autoplayInterval:u=3e3,loop:d=!1,gap:v=16,arrowPosition:I="outside",dotPosition:z="bottom",className:h="",onItemClick:s,onSlideChange:y}=e;if(i.length===0)return'<div class="ubits-carousel ubits-carousel--empty">No hay items para mostrar</div>';const S=["ubits-carousel",I==="inside"&&"ubits-carousel--arrows-inside",z==="top"&&"ubits-carousel--dots-top",h].filter(Boolean).join(" "),V=i.map((C,g)=>x(C,g)).join(""),b=c?H(i.length,l):"",f=[`data-items-per-view="${l}"`,n&&'data-autoplay="true"',n&&`data-autoplay-interval="${u}"`,d&&'data-loop="true"',`data-gap="${v}"`].filter(Boolean).join(" ");return`
    <div class="${S}" ${f} style="--carousel-gap: ${v}px;">
      <div class="ubits-carousel__content-wrapper">
        ${t?D():""}
        <div class="ubits-carousel__container">
          <div class="ubits-carousel__track">
            ${V}
          </div>
        </div>
        ${t?B():""}
      </div>
      ${b}
    </div>
  `}function x(e,i,l){const{id:t}=e,{id:c,onItemClick:n,...u}=e,d={...u,maxWidth:void 0},v=A(d);return`
    <div class="ubits-carousel-item" data-item-id="${t}" data-item-index="${i}">
      ${v}
    </div>
  `}function D(){return`
    <button class="ubits-carousel__arrow ubits-carousel__arrow--prev" 
            data-action="prev" 
            aria-label="Anterior">
      <i class="fas fa-chevron-left"></i>
    </button>
  `}function B(){return`
    <button class="ubits-carousel__arrow ubits-carousel__arrow--next" 
            data-action="next" 
            aria-label="Siguiente">
      <i class="fas fa-chevron-right"></i>
    </button>
  `}function H(e,i){const l=Math.ceil(e/i);return`<div class="ubits-carousel__dots">${Array.from({length:l},(c,n)=>`
      <button class="ubits-carousel__dot ${n===0?"ubits-carousel__dot--active":""}" 
              data-dot-index="${n}" 
              aria-label="Ir a página ${n+1}">
      </button>
    `).join("")}</div>`}function k(e,i){const l=e.querySelector(".ubits-carousel__track"),t=e.querySelectorAll(".ubits-carousel-item"),c=e.querySelector(".ubits-carousel__arrow--prev"),n=e.querySelector(".ubits-carousel__arrow--next"),u=e.querySelectorAll(".ubits-carousel__dot");if(!l||t.length===0)return;const d=parseInt(e.getAttribute("data-items-per-view")||"3"),v=parseInt(e.getAttribute("data-gap")||"16"),I=e.getAttribute("data-autoplay")==="true",z=parseInt(e.getAttribute("data-autoplay-interval")||"3000"),h=e.getAttribute("data-loop")==="true";let s=0,y=null;const S=()=>{let o=0;t.forEach(a=>{const r=a.querySelector(".ubits-simple-card");if(r){a.style.width="auto",a.style.minWidth="0",a.style.flexShrink="0";const m=r.offsetHeight||r.getBoundingClientRect().height;m>o&&(o=m)}}),o>0&&t.forEach(a=>{const r=a.querySelector(".ubits-simple-card");r&&(r.style.height=`${o}px`)})};requestAnimationFrame(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{S()})})});const V=()=>{if(t.length===0)return 0;const a=t[0].querySelector(".ubits-simple-card");if(a&&a.offsetWidth>0)return a.offsetWidth+v;if(a){const m=a.getBoundingClientRect();if(m.width>0)return m.width+v}const r=e.querySelector(".ubits-carousel__container");return r&&r.offsetWidth>0?r.offsetWidth/d:300},b=()=>{const o=V(),a=-s*o;l.style.transform=`translateX(${a}px)`,u.forEach((r,m)=>{const p=Math.floor(s/d);m===p?r.classList.add("ubits-carousel__dot--active"):r.classList.remove("ubits-carousel__dot--active")}),i.onSlideChange&&i.onSlideChange(s)};c&&c.addEventListener("click",()=>{s>0?s--:h&&(s=t.length-d),b(),g()}),n&&n.addEventListener("click",()=>{const o=Math.max(0,t.length-d);s<o?s++:h&&(s=0),b(),g()}),u.forEach((o,a)=>{o.addEventListener("click",()=>{s=a*d,b(),g()})}),t.forEach(o=>{o.addEventListener("click",a=>{const r=a.target;if(r.closest("button")||r.closest(".ubits-button"))return;const m=o.getAttribute("data-item-id"),p=i.items.find(_=>String(_.id)===m);p&&p.onItemClick?p.onItemClick(p):p&&i.onItemClick&&i.onItemClick(p)})});const f=()=>{I&&(y=window.setInterval(()=>{const o=Math.max(0,t.length-d);s<o?s++:s=0,b()},z))},C=()=>{y&&(clearInterval(y),y=null)},g=()=>{C(),f()};e.addEventListener("mouseenter",C),e.addEventListener("mouseleave",f),requestAnimationFrame(()=>{requestAnimationFrame(()=>{b(),f()})})}const F=[{id:1,title:"Bamboo Watch",subtitle:"Reloj de madera elegante",content:"Diseño minimalista con correa de cuero genuino. Perfecto para ocasiones formales e informales.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:2,title:"Black Watch",subtitle:"Reloj clásico negro",content:"Diseño atemporal con esfera blanca y correa negra. Ideal para el uso diario.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:3,title:"Blue Band",subtitle:"Pulsera fitness azul",content:"Pulsera inteligente con seguimiento de actividad física y monitoreo de salud.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:4,title:"Smart Watch",subtitle:"Reloj inteligente premium",content:"Tecnología avanzada con pantalla táctil, GPS integrado y resistencia al agua.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:5,title:"Classic Watch",subtitle:"Reloj clásico tradicional",content:"Diseño elegante y sofisticado para ocasiones especiales. Movimiento automático.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:6,title:"Sport Watch",subtitle:"Reloj deportivo",content:"Resistente al agua y diseñado para atletas. Cronómetro y múltiples funciones deportivas.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:7,title:"Luxury Watch",subtitle:"Reloj de lujo",content:"Edición limitada con materiales premium. Diseño exclusivo para coleccionistas.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:8,title:"Digital Watch",subtitle:"Reloj digital moderno",content:"Pantalla LED de alta resolución con múltiples funciones y conectividad Bluetooth.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:9,title:"Vintage Watch",subtitle:"Reloj vintage",content:"Diseño retro con mecanismo de cuerda manual. Perfecto para amantes de lo clásico.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:10,title:"Fitness Tracker",subtitle:"Monitor de actividad",content:"Seguimiento completo de actividad física, sueño y salud cardiovascular.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:11,title:"Diving Watch",subtitle:"Reloj de buceo",content:"Resistente hasta 300 metros de profundidad. Ideal para deportes acuáticos.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]},{id:12,title:"Chronograph Watch",subtitle:"Cronógrafo profesional",content:"Precisión milimétrica con funciones de cronometraje avanzadas para profesionales.",showHeader:!0,headerDecorations:!0,variant:"elevated",size:"md",showButtons:!0,buttons:[{label:"Ver más",variant:"primary",size:"md"},{label:"Favorito",variant:"secondary",size:"md"}]}],j={title:"Layout/Carousel",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Carousel UBITS para mostrar Simple Cards en un carrusel navegable. Incluye navegación con flechas, indicadores de paginación, autoplay y soporte para diferentes tamaños de cards."}},layout:"padded"},argTypes:{itemsPerView:{control:{type:"number",min:1,max:6,step:1},description:"Número de items visibles a la vez",table:{defaultValue:{summary:"3"},type:{summary:"number"}}},showArrows:{control:{type:"boolean"},description:"Mostrar flechas de navegación",table:{defaultValue:{summary:"true"}}},showDots:{control:{type:"boolean"},description:"Mostrar indicadores de paginación (dots)",table:{defaultValue:{summary:"true"}}},autoplay:{control:{type:"boolean"},description:"Auto-reproducir el carrusel",table:{defaultValue:{summary:"false"}}},autoplayInterval:{control:{type:"number",min:1e3,max:1e4,step:500},description:"Intervalo en milisegundos para autoplay",table:{defaultValue:{summary:"3000"},type:{summary:"number (ms)"}}},loop:{control:{type:"boolean"},description:"Loop infinito (volver al inicio al llegar al final)",table:{defaultValue:{summary:"false"}}},gap:{control:{type:"number",min:0,max:48,step:4},description:"Espacio entre items en píxeles",table:{defaultValue:{summary:"16"},type:{summary:"number (px)"}}},arrowPosition:{control:{type:"select"},options:["inside","outside"],description:"Posición de las flechas de navegación",table:{defaultValue:{summary:"outside"},type:{summary:"inside | outside"}}},dotPosition:{control:{type:"select"},options:["bottom","top"],description:"Posición de los indicadores de paginación",table:{defaultValue:{summary:"bottom"},type:{summary:"bottom | top"}}},cardSize:{control:{type:"select"},options:["sm","md","lg","xl"],description:"Tamaño de las Simple Cards",table:{defaultValue:{summary:"md"},type:{summary:"sm | md | lg | xl"}}},cardVariant:{control:{type:"select"},options:["default","elevated","bordered","flat"],description:"Variante de las Simple Cards",table:{defaultValue:{summary:"elevated"},type:{summary:"default | elevated | bordered | flat"}}},showCardHeader:{control:{type:"boolean"},description:"Mostrar header en las Simple Cards",table:{defaultValue:{summary:"true"}}},showCardButtons:{control:{type:"boolean"},description:"Mostrar botones en las Simple Cards",table:{defaultValue:{summary:"true"}}},className:{control:{type:"text"},description:"Clase CSS adicional",table:{type:{summary:"string"}}}}},w={args:{itemsPerView:3,showArrows:!0,showDots:!0,autoplay:!1,autoplayInterval:3e3,loop:!1,gap:16,arrowPosition:"outside",dotPosition:"bottom",cardSize:"md",cardVariant:"elevated",showCardHeader:!0,showCardButtons:!0,onItemClick:e=>{},onSlideChange:e=>{}},render:e=>{const l={items:F.map(n=>({...n,size:e.cardSize||"md",variant:e.cardVariant||"elevated",showHeader:e.showCardHeader!==!1,showButtons:e.showCardButtons!==!1,onItemClick:u=>{e.onItemClick&&e.onItemClick(u)}})),itemsPerView:e.itemsPerView,showArrows:e.showArrows,showDots:e.showDots,autoplay:e.autoplay,autoplayInterval:e.autoplayInterval,loop:e.loop,gap:e.gap,arrowPosition:e.arrowPosition,dotPosition:e.dotPosition,className:e.className,onItemClick:e.onItemClick,onSlideChange:e.onSlideChange},t=document.createElement("div");t.innerHTML=P(l);const c=t.querySelector(".ubits-carousel");return c&&requestAnimationFrame(()=>{requestAnimationFrame(()=>{k(c,l)})}),t}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
    onItemClick: (item: CarouselItem) => {
      // Handler para click en item
    },
    onSlideChange: (currentIndex: number) => {
      // Handler para cambio de slide
    }
  },
  render: args => {
    // Aplicar configuración de cards a todos los items
    const itemsWithConfig = sampleItems.map(item => ({
      ...item,
      size: args.cardSize || 'md',
      variant: args.cardVariant || 'elevated',
      showHeader: args.showCardHeader !== false,
      showButtons: args.showCardButtons !== false,
      onItemClick: (item: CarouselItem) => {
        if (args.onItemClick) {
          args.onItemClick(item);
        }
      }
    }));
    const carouselOptions: CarouselOptions = {
      items: itemsWithConfig,
      itemsPerView: args.itemsPerView,
      showArrows: args.showArrows,
      showDots: args.showDots,
      autoplay: args.autoplay,
      autoplayInterval: args.autoplayInterval,
      loop: args.loop,
      gap: args.gap,
      arrowPosition: args.arrowPosition,
      dotPosition: args.dotPosition,
      className: args.className,
      onItemClick: args.onItemClick,
      onSlideChange: args.onSlideChange
    };

    // Crear contenedor
    const container = document.createElement('div');

    // Renderizar HTML primero
    container.innerHTML = renderCarousel(carouselOptions);
    const carouselElement = container.querySelector('.ubits-carousel') as HTMLElement;

    // Inicializar después de que el DOM esté listo usando requestAnimationFrame
    if (carouselElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializeCarousel(carouselElement, carouselOptions);
        });
      });
    }
    return container;
  }
}`,...w.parameters?.docs?.source},description:{story:"Carrusel completo con todos los controles",...w.parameters?.docs?.description}}};const R=["Default"];export{w as Default,R as __namedExportsOrder,j as default};
