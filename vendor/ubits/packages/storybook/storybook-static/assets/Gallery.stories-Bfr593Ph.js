import{r as _}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function L(o){const{items:t=[],layout:a="grid",size:s="md",columns:g=3,gap:c=16,showThumbnails:r=!1,lazyLoad:l=!1,lightbox:e=!1,aspectRatio:n,className:m="",onItemClick:d,onImageLoad:f,onImageError:h}=o;if(t.length===0)return'<div class="ubits-gallery ubits-gallery--empty">No hay imágenes para mostrar</div>';const v=["ubits-gallery",`ubits-gallery--${a}`,`ubits-gallery--${s}`,r&&"ubits-gallery--thumbnails",l&&"ubits-gallery--lazy",e&&"ubits-gallery--lightbox",m].filter(Boolean).join(" "),p=t.map((u,b)=>$(u,b,{showThumbnails:r,lazyLoad:l,lightbox:e,aspectRatio:n})).join(""),x=[`data-layout="${a}"`,`data-size="${s}"`,`data-columns="${g}"`,`data-gap="${c}"`,e&&'data-lightbox="true"',l&&'data-lazy="true"'].filter(Boolean).join(" "),i=`--gallery-gap: ${c}px; --gallery-columns: ${g};`;return`
    <div class="${v}" ${x} style="${i}">
      <div class="ubits-gallery__container">
        ${p}
      </div>
    </div>
  `}function $(o,t,a){const{id:s,image:g,thumbnail:c,title:r,description:l,alt:e}=o,n=a.showThumbnails&&c?c:g,m=e||r||`Imagen ${t+1}`,d=a.lazyLoad?'loading="lazy"':"",f=a.lightbox?'data-lightbox-item="true"':"",h=a.aspectRatio?`style="aspect-ratio: ${a.aspectRatio};"`:"";return`
    <div class="ubits-gallery-item" 
         data-item-id="${s}" 
         data-item-index="${t}"
         ${f}
         ${h}>
      <div class="ubits-gallery-item__image-wrapper">
        <img src="${n}" 
             alt="${m}" 
             class="ubits-gallery-item__image"
             ${d}
             data-full-image="${g}" />
        ${a.lightbox?'<div class="ubits-gallery-item__overlay"><i class="fas fa-expand"></i></div>':""}
      </div>
    </div>
  `}function E(o){const t=document.createElement("div");t.innerHTML=L(o);const a=t.firstElementChild;return a&&setTimeout(()=>{z(a,o)},0),a||t}function z(o,t){const a=o.querySelectorAll(".ubits-gallery-item"),s=o.getAttribute("data-lightbox")==="true",g=o.getAttribute("data-lazy")==="true";if(a.length!==0&&(a.forEach((c,r)=>{const l=c,e=l.getAttribute("data-item-id"),n=t.items.find(d=>String(d.id)===e);if(!n)return;l.addEventListener("click",d=>{d.preventDefault(),t.onItemClick&&t.onItemClick(n,r),s&&A(n,t.items,r)});const m=l.querySelector("img");m&&(m.addEventListener("load",()=>{t.onImageLoad&&t.onImageLoad(n,r)}),m.addEventListener("error",()=>{t.onImageError&&t.onImageError(n,r),m.style.display="none";const d=document.createElement("div");d.className="ubits-gallery-item__error",d.innerHTML='<i class="fas fa-image"></i><span>Error al cargar imagen</span>',l.querySelector(".ubits-gallery-item__image-wrapper")?.appendChild(d)}))}),g&&"IntersectionObserver"in window)){const c=new IntersectionObserver(r=>{r.forEach(l=>{if(l.isIntersecting){const e=l.target,n=e.getAttribute("data-full-image");n&&e.src!==n&&(e.src=n),c.unobserve(e)}})},{rootMargin:"50px"});a.forEach(r=>{const l=r.querySelector("img");l&&c.observe(l)})}}function A(o,t,a){const s=document.createElement("div");s.className="ubits-gallery-lightbox";const g=t.map((i,u)=>{const b=u===a?"ubits-gallery-lightbox__thumbnail--active":"",w=i.thumbnail||i.image;return`
      <div class="ubits-gallery-lightbox__thumbnail ${b}" 
           data-thumb-index="${u}"
           data-item-id="${i.id}">
        <img src="${w}" alt="${i.alt||i.title||`Thumbnail ${u+1}`}" />
      </div>
    `}).join(""),c=_({variant:"secondary",size:"sm",icon:"times",iconOnly:!0,className:"ubits-gallery-lightbox__close",attributes:{"aria-label":"Cerrar"}}),r=_({variant:"secondary",size:"md",icon:"chevron-left",iconOnly:!0,className:"ubits-gallery-lightbox__prev",attributes:{"aria-label":"Anterior"}}),l=_({variant:"secondary",size:"md",icon:"chevron-right",iconOnly:!0,className:"ubits-gallery-lightbox__next",attributes:{"aria-label":"Siguiente"}});s.innerHTML=`
    <div class="ubits-gallery-lightbox__content">
      ${c}
      <div class="ubits-gallery-lightbox__main">
        ${r}
        <div class="ubits-gallery-lightbox__image-wrapper">
          <img src="${o.image}" alt="${o.alt||o.title||"Imagen"}" class="ubits-gallery-lightbox__image" />
        </div>
        ${l}
      </div>
      <div class="ubits-gallery-lightbox__thumbnails">
        ${g}
      </div>
    </div>
  `,document.body.appendChild(s),document.body.style.overflow="hidden";let e=a;const n=s.querySelector(".ubits-gallery-lightbox__close"),m=()=>{s.remove(),document.body.style.overflow=""};n?.addEventListener("click",m),s.addEventListener("click",i=>{i.target===s&&m()});const d=s.querySelector(".ubits-gallery-lightbox__prev"),f=s.querySelector(".ubits-gallery-lightbox__next"),h=s.querySelector(".ubits-gallery-lightbox__image"),v=s.querySelectorAll(".ubits-gallery-lightbox__thumbnail"),p=()=>{const i=t[e];i&&h&&(h.src=i.image,h.alt=i.alt||i.title||"Imagen",v.forEach((u,b)=>{b===e?(u.classList.add("ubits-gallery-lightbox__thumbnail--active"),u.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})):u.classList.remove("ubits-gallery-lightbox__thumbnail--active")}))};v.forEach((i,u)=>{i.addEventListener("click",()=>{e=u,p()})}),d?.addEventListener("click",i=>{i.stopPropagation(),e=e>0?e-1:t.length-1,p()}),f?.addEventListener("click",i=>{i.stopPropagation(),e=e<t.length-1?e+1:0,p()});const x=i=>{i.key==="Escape"?(m(),document.removeEventListener("keydown",x)):i.key==="ArrowLeft"?(e=e>0?e-1:t.length-1,p()):i.key==="ArrowRight"&&(e=e<t.length-1?e+1:0,p())};document.addEventListener("keydown",x)}const S=[{id:1,image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",title:"Paisaje Montañoso",description:"Hermoso paisaje montañoso con cielo despejado",alt:"Paisaje montañoso"},{id:2,image:"https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop",title:"Océano Azul",description:"Vista del océano con olas suaves",alt:"Océano azul"},{id:3,image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop",title:"Bosque Verde",description:"Sendero a través de un bosque frondoso",alt:"Bosque verde"},{id:4,image:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop",title:"Ciudad al Atardecer",description:"Skyline de la ciudad durante el atardecer",alt:"Ciudad al atardecer"},{id:5,image:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop",title:"Lago Sereno",description:"Lago tranquilo rodeado de montañas",alt:"Lago sereno"},{id:6,image:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop",title:"Naturaleza Salvaje",description:"Paisaje natural con vegetación diversa",alt:"Naturaleza salvaje"},{id:7,image:"https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&h=200&fit=crop",title:"Cascada",description:"Cascada en medio del bosque",alt:"Cascada"},{id:8,image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop",title:"Aurora Boreal",description:"Aurora boreal en el cielo nocturno",alt:"Aurora boreal"},{id:9,image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",thumbnail:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",title:"Montañas Nevadas",description:"Cumbres nevadas bajo un cielo azul",alt:"Montañas nevadas"}],j={title:"Layout/Gallery",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Gallery UBITS para mostrar imágenes en diferentes layouts (grid, masonry, list) con múltiples tamaños, soporte para lightbox, lazy loading y thumbnails."}},layout:"padded"},argTypes:{items:{control:{type:"object"},description:"Array de items a mostrar en la galería",table:{type:{summary:"GalleryItem[]"}}},layout:{control:{type:"select"},options:["grid","masonry","list"],description:"Layout de la galería",table:{defaultValue:{summary:"grid"},type:{summary:"grid | masonry | list"}}},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Tamaño de la galería",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg | xl"}}},columns:{control:{type:"number",min:1,max:12,step:1},description:"Número de columnas (solo para layout grid)",table:{defaultValue:{summary:"3"},type:{summary:"number"}}},gap:{control:{type:"number",min:0,max:48,step:4},description:"Espacio entre items en píxeles",table:{defaultValue:{summary:"16"},type:{summary:"number (px)"}}},showThumbnails:{control:{type:"boolean"},description:"Mostrar thumbnails en lugar de imágenes completas",table:{defaultValue:{summary:"false"}}},lazyLoad:{control:{type:"boolean"},description:"Cargar imágenes de forma diferida (lazy loading)",table:{defaultValue:{summary:"false"}}},lightbox:{control:{type:"boolean"},description:"Activar lightbox al hacer click en las imágenes",table:{defaultValue:{summary:"false"}}},aspectRatio:{control:{type:"text"},description:"Aspect ratio para las imágenes (ej: 16/9, 1/1, 4/3)",table:{type:{summary:"string"}}},className:{control:{type:"text"},description:"Clase CSS adicional",table:{type:{summary:"string"}}}}},y={args:{items:S,layout:"grid",size:"md",columns:3,gap:16,showThumbnails:!1,lazyLoad:!1,lightbox:!0,aspectRatio:void 0,className:""},render:o=>{const t=E(o),a=document.createElement("div");return a.style.width="100%",a.style.margin="0 auto",a.appendChild(t),a}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: true,
    aspectRatio: undefined,
    className: ''
  },
  render: args => {
    // Usar createGallery que ya incluye la inicialización
    const gallery = createGallery(args);
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.margin = '0 auto';
    container.appendChild(gallery);
    return container;
  }
}`,...y.parameters?.docs?.source},description:{story:"Galería única con todos los controladores y tamaños",...y.parameters?.docs?.description}}};const N=["Default"];export{y as Default,N as __namedExportsOrder,j as default};
