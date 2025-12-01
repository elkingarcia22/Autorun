(function(c,u){typeof exports=="object"&&typeof module<"u"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(c=typeof globalThis<"u"?globalThis:c||self,u(c.UBITSDataView={}))})(this,(function(c){"use strict";console.log("🔵 [data-view/DataViewProvider.ts] Iniciando carga de DataViewProvider..."),console.log("✅ [data-view/DataViewProvider.ts] Tipos importados correctamente"),console.log("✅ [data-view/DataViewProvider.ts] Estilos data-view.css importados"),console.log("✅ [data-view/DataViewProvider.ts] Estilos button.css importados");function u(t,s="regular"){const a=s==="solid"?"fas":"far",r=t.startsWith("fa-")?t:`fa-${t}`;return`<i class="${a} ${r}"></i>`}function p(t="INSTOCK"){const s={INSTOCK:{text:"INSTOCK",class:"ubits-data-view__stock-badge--instock"},LOWSTOCK:{text:"LOWSTOCK",class:"ubits-data-view__stock-badge--lowstock"},OUTOFSTOCK:{text:"OUTOFSTOCK",class:"ubits-data-view__stock-badge--outofstock"}},a=s[t]||s.INSTOCK;return`<span class="ubits-data-view__stock-badge ${a.class}">${a.text}</span>`}function C(t){const s=Math.floor(t),a=t%1>=.5,r=5-s-(a?1:0);let n="";for(let i=0;i<s;i++)n+='<i class="fas fa-star ubits-data-view__star ubits-data-view__star--filled"></i>';a&&(n+='<i class="fas fa-star-half-alt ubits-data-view__star ubits-data-view__star--half"></i>');for(let i=0;i<r;i++)n+='<i class="far fa-star ubits-data-view__star ubits-data-view__star--empty"></i>';return`
    <div class="ubits-data-view__rating">
      ${n}
      <span class="ubits-body-sm-regular ubits-data-view__rating-number">${t}</span>
    </div>
  `}function S(t){return new Intl.NumberFormat("es-CO",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(t)}function O(t,s,a){const{showCategory:r=!0,showRating:n=!0,showPrice:i=!0,showWishlist:w=!0,showBuyButton:l=!0,buyButtonText:f="Buy Now",buyButtonIcon:_="shopping-cart",wishlistIcon:e="heart"}=a,d=t.id||`product-${s}`,b=t.stockStatus||"INSTOCK",o=t.inWishlist||!1;return`
    <div class="ubits-data-view__item" data-product-id="${d}" data-index="${s}">
      <div class="ubits-data-view__image-wrapper">
        <img 
          src="${t.image}" 
          alt="${t.imageAlt||t.name}" 
          class="ubits-data-view__image"
        />
        ${p(b)}
      </div>
      <div class="ubits-data-view__content">
        <div class="ubits-data-view__main">
          ${r?`<div class="ubits-body-sm-regular ubits-data-view__category">${t.category}</div>`:""}
          <h3 class="ubits-body-md-semibold ubits-data-view__name">${t.name}</h3>
          ${n?C(t.rating):""}
        </div>
        <div class="ubits-data-view__right">
          ${i?`<span class="ubits-body-md-bold ubits-data-view__price">${S(t.price)}</span>`:""}
          <div class="ubits-data-view__actions">
            ${w?`
              <button 
                class="ubits-button ubits-button--secondary ubits-button--sm ubits-data-view__wishlist-button ${o?"ubits-data-view__wishlist-button--active":""}"
                data-action="wishlist"
                aria-label="${o?"Remover de favoritos":"Agregar a favoritos"}"
              >
                ${u(e,o?"solid":"regular")}
              </button>
            `:""}
            ${l?`
              <button class="ubits-button ubits-button--primary ubits-button--sm ubits-data-view__buy-button" data-action="buy">
                ${u(_,"solid")}
                <span>${f}</span>
              </button>
            `:""}
          </div>
        </div>
      </div>
    </div>
  `}function h(t){console.log("🔵 [data-view] renderDataView llamado con opciones:",{productsCount:t.products?.length||0,size:t.size,containerId:t.containerId});const{products:s=[],containerId:a,size:r="md",className:n="",attributes:i={}}=t,l=["ubits-data-view",`ubits-data-view--${r}`,n].filter(Boolean).join(" "),f=Object.entries(i).map(([d,b])=>`${d}="${b}"`).join(" "),_=a?`id="${a}"`:"";let e=`<div class="${l}" ${_} ${f}>`;return s.forEach((d,b)=>{e+=O(d,b,t)}),e+="</div>",e}function T(t){if(console.log("🔵 [data-view] createDataView llamado con opciones:",{productsCount:t.products?.length||0,size:t.size,containerId:t.containerId,hasContainer:!!t.container}),typeof document>"u")throw new Error("createDataView requiere un entorno con DOM (navegador)");const{container:s,containerId:a,products:r=[],size:n="md",onProductClick:i,onBuyClick:w,onWishlistClick:l,className:f="",attributes:_={}}=t,e=s||document.createElement("div"),d=`ubits-data-view--${n}`;return e.className=["ubits-data-view",d,f].filter(Boolean).join(" "),a&&(e.id=a),Object.entries(_).forEach(([o,v])=>{e.setAttribute(o,v)}),e.innerHTML=h(t),e.querySelectorAll(".ubits-data-view__item").forEach((o,v)=>{const g=r[v];if(!g)return;i&&o.addEventListener("click",m=>{m.target.closest("button")||i(g,v,o)});const $=o.querySelector('[data-action="buy"]');$&&w&&$.addEventListener("click",m=>{m.stopPropagation(),w(g,v,o)});const y=o.querySelector('[data-action="wishlist"]');y&&l&&y.addEventListener("click",m=>{m.stopPropagation(),l(g,v,o)})}),e}c.createDataView=T,c.renderDataView=h,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})}));
