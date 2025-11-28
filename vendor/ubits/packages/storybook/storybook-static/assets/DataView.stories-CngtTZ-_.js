import{r as _}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function T(t="INSTOCK"){const o={INSTOCK:{text:"INSTOCK",class:"ubits-data-view__stock-badge--instock"},LOWSTOCK:{text:"LOWSTOCK",class:"ubits-data-view__stock-badge--lowstock"},OUTOFSTOCK:{text:"OUTOFSTOCK",class:"ubits-data-view__stock-badge--outofstock"}},e=o[t]||o.INSTOCK;return`<span class="ubits-data-view__stock-badge ${e.class}">${e.text}</span>`}function I(t){const o=Math.floor(t),e=t%1>=.5,u=5-o-(e?1:0);let c="";for(let a=0;a<o;a++)c+='<i class="fas fa-star ubits-data-view__star ubits-data-view__star--filled"></i>';e&&(c+='<i class="fas fa-star-half-alt ubits-data-view__star ubits-data-view__star--half"></i>');for(let a=0;a<u;a++)c+='<i class="far fa-star ubits-data-view__star ubits-data-view__star--empty"></i>';return`
    <div class="ubits-data-view__rating">
      ${c}
      <span class="ubits-body-sm-regular ubits-data-view__rating-number">${t}</span>
    </div>
  `}function V(t){return new Intl.NumberFormat("es-CO",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(t)}function k(t,o,e){const{showCategory:u=!0,showRating:c=!0,showPrice:a=!0,showWishlist:w=!0,showBuyButton:n=!0,buyButtonText:g="Buy Now",buyButtonIcon:p="shopping-cart",wishlistIcon:s="heart"}=e,l=t.id||`product-${o}`,d=t.stockStatus||"INSTOCK",i=t.inWishlist||!1;return`
    <div class="ubits-data-view__item" data-product-id="${l}" data-index="${o}">
      <div class="ubits-data-view__image-wrapper">
        <img 
          src="${t.image}" 
          alt="${t.imageAlt||t.name}" 
          class="ubits-data-view__image"
        />
        ${T(d)}
      </div>
      <div class="ubits-data-view__content">
        <div class="ubits-data-view__main">
          ${u?`<div class="ubits-body-sm-regular ubits-data-view__category">${t.category}</div>`:""}
          <h3 class="ubits-body-md-semibold ubits-data-view__name">${t.name}</h3>
          ${c?I(t.rating):""}
        </div>
        <div class="ubits-data-view__right">
          ${a?`<span class="ubits-body-md-bold ubits-data-view__price">${V(t.price)}</span>`:""}
          <div class="ubits-data-view__actions">
            ${w?_({variant:"secondary",size:"sm",icon:s,iconStyle:i?"solid":"regular",iconOnly:!0,className:`ubits-data-view__wishlist-button ${i?"ubits-data-view__wishlist-button--active":""}`,attributes:{"data-action":"wishlist","aria-label":i?"Remover de favoritos":"Agregar a favoritos"}}):""}
            ${n?_({variant:"primary",size:"sm",text:g,icon:p,iconStyle:"solid",className:"ubits-data-view__buy-button",attributes:{"data-action":"buy"}}):""}
          </div>
        </div>
      </div>
    </div>
  `}function x(t){const{products:o=[],containerId:e,size:u="md",className:c="",attributes:a={}}=t,n=["ubits-data-view",`ubits-data-view--${u}`,c].filter(Boolean).join(" "),g=Object.entries(a).map(([l,d])=>`${l}="${d}"`).join(" "),p=e?`id="${e}"`:"";let s=`<div class="${n}" ${p} ${g}>`;return o.forEach((l,d)=>{s+=k(l,d,t)}),s+="</div>",s}function B(t){if(typeof document>"u")throw new Error("createDataView requiere un entorno con DOM (navegador)");const{container:o,containerId:e,products:u=[],size:c="md",onProductClick:a,onBuyClick:w,onWishlistClick:n,className:g="",attributes:p={}}=t,s=o||document.createElement("div"),l=`ubits-data-view--${c}`;return s.className=["ubits-data-view",l,g].filter(Boolean).join(" "),e&&(s.id=e),Object.entries(p).forEach(([i,m])=>{s.setAttribute(i,m)}),s.innerHTML=x(t),s.querySelectorAll(".ubits-data-view__item").forEach((i,m)=>{const r=u[m];if(!r)return;a&&i.addEventListener("click",b=>{b.target.closest("button")||a(r,m,i)});const h=i.querySelector('[data-action="buy"]');h&&w&&h.addEventListener("click",b=>{b.stopPropagation(),w(r,m,i)});const f=i.querySelector('[data-action="wishlist"]');f&&n&&f.addEventListener("click",b=>{b.stopPropagation(),n(r,m,i)})}),s}const j={title:"Data/DataView",tags:["autodocs"],parameters:{docs:{description:{component:"Componente DataView UBITS para mostrar listas de productos con imagen, categoría, nombre, rating, precio, botón de favoritos y botón de compra. Usa tokens UBITS para colores, tipografía y espaciado."}},layout:"padded"},argTypes:{productCount:{control:{type:"number",min:1,max:10,step:1},description:"Número de productos a mostrar",table:{defaultValue:{summary:"5"},type:{summary:"number"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del componente (sm: imagen 80px, md: imagen 120px, lg: imagen 160px)",table:{defaultValue:{summary:"md"},type:{summary:"sm | md | lg"},category:"Tamaño"}},showCategory:{control:{type:"boolean"},description:"Mostrar categoría del producto",table:{defaultValue:{summary:"true"}}},showRating:{control:{type:"boolean"},description:"Mostrar rating con estrellas",table:{defaultValue:{summary:"true"}}},showPrice:{control:{type:"boolean"},description:"Mostrar precio del producto",table:{defaultValue:{summary:"true"}}},showWishlist:{control:{type:"boolean"},description:"Mostrar botón de favoritos",table:{defaultValue:{summary:"true"}}},showBuyButton:{control:{type:"boolean"},description:"Mostrar botón de compra",table:{defaultValue:{summary:"true"}}},buyButtonText:{control:{type:"text"},description:"Texto del botón de compra",table:{defaultValue:{summary:"Buy Now"}}},buyButtonIcon:{control:{type:"text"},description:"Icono del botón de compra (nombre FontAwesome sin prefijo fa-)",table:{defaultValue:{summary:"shopping-cart"}}},wishlistIcon:{control:{type:"text"},description:"Icono del botón de favoritos (nombre FontAwesome sin prefijo fa-)",table:{defaultValue:{summary:"heart"}}},defaultStockStatus:{control:{type:"select"},options:["INSTOCK","LOWSTOCK","OUTOFSTOCK"],description:"Estado de stock por defecto para los productos",table:{defaultValue:{summary:"INSTOCK"},type:{summary:"INSTOCK | LOWSTOCK | OUTOFSTOCK"}}},defaultRating:{control:{type:"number",min:0,max:5,step:.5},description:"Rating por defecto para los productos",table:{defaultValue:{summary:"4"},type:{summary:"number (0-5)"}}},defaultPrice:{control:{type:"number",min:0,step:1},description:"Precio por defecto para los productos",table:{defaultValue:{summary:"50"},type:{summary:"number"}}}}};function $(t,o="INSTOCK",e=4,u=50){const c=["Accessories","Fitness","Clothing","Electronics","Home"],a=["Bamboo Watch","Black Watch","Blue Band","Blue T-Shirt","Bracelet","Wireless Headphones","Smart Watch","Running Shoes","Yoga Mat","Water Bottle"];return Array.from({length:t},(w,n)=>{const g=n%c.length,p=n%a.length,s=["INSTOCK","LOWSTOCK","OUTOFSTOCK"],l=n%s.length,d=[3,3.5,4,4.5,5],i=n%d.length,m=[15,29,50,65,72,79,100],r=n%m.length,h=["/images/cards-learn/administracion-efectiva-del-tiempo.jpg","/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg","/images/cards-learn/introduccion-al-backend-node-js.jpeg","/images/cards-learn/introduccion-al-desarrollo-web.jpeg","/images/cards-learn/como-ejercer-el-liderazgo-inclusivo.jpeg","/images/cards-learn/flexbox-y-grid.jpeg","/images/cards-learn/react-context-api.jpeg","/images/cards-learn/agilidad-emocional.jpeg","/images/cards-learn/primeros-pasos-en-react.jpeg","/images/cards-learn/neuroliderazgo-configura-tu-mente.jpeg"];return{id:`product-${n+1}`,image:h[n%h.length],imageAlt:a[p],category:c[g],name:a[p],rating:e!==4?e:d[i],price:u!==50?u:m[r],stockStatus:o!=="INSTOCK"?o:s[l],inWishlist:n%3===0}})}const v={args:{productCount:5,size:"md",showCategory:!0,showRating:!0,showPrice:!0,showWishlist:!0,showBuyButton:!0,buyButtonText:"Buy Now",buyButtonIcon:"shopping-cart",wishlistIcon:"heart",defaultStockStatus:"INSTOCK",defaultRating:4,defaultPrice:50},render:t=>{const{productCount:o=5,size:e="md",defaultStockStatus:u="INSTOCK",defaultRating:c=4,defaultPrice:a=50,showCategory:w=!0,showRating:n=!0,showPrice:g=!0,showWishlist:p=!0,showBuyButton:s=!0,buyButtonText:l="Buy Now",buyButtonIcon:d="shopping-cart",wishlistIcon:i="heart"}=t,m=$(o,u,c,a),r=document.createElement("div");r.id="data-view-container",r.style.width="100%",r.style.maxWidth="800px",r.style.margin="0 auto",r.style.background="var(--modifiers-normal-color-light-bg-2)",r.style.border="1px solid var(--modifiers-normal-color-light-border-1)";const f=(()=>{const b={products:m,size:e,showCategory:w,showRating:n,showPrice:g,showWishlist:p,showBuyButton:s,buyButtonText:l,buyButtonIcon:d,wishlistIcon:i,onProductClick:(y,C)=>{},onBuyClick:(y,C)=>{alert(`Comprar: ${y.name} - $${y.price}`)},onWishlistClick:(y,C)=>{y.inWishlist=!y.inWishlist;const S=r.querySelector(".ubits-data-view");S&&S.remove();const O=B(b);r.appendChild(O)}};return B(b)})();return r.appendChild(f),r}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    productCount: 5,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    buyButtonText: 'Buy Now',
    buyButtonIcon: 'shopping-cart',
    wishlistIcon: 'heart',
    defaultStockStatus: 'INSTOCK',
    defaultRating: 4,
    defaultPrice: 50
  },
  render: args => {
    const {
      productCount = 5,
      size = 'md',
      defaultStockStatus = 'INSTOCK',
      defaultRating = 4,
      defaultPrice = 50,
      showCategory = true,
      showRating = true,
      showPrice = true,
      showWishlist = true,
      showBuyButton = true,
      buyButtonText = 'Buy Now',
      buyButtonIcon = 'shopping-cart',
      wishlistIcon = 'heart'
    } = args;

    // Generar productos
    const products = generateProducts(productCount, defaultStockStatus, defaultRating, defaultPrice);

    // Crear contenedor
    const container = document.createElement('div');
    container.id = 'data-view-container';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';

    // Función para re-renderizar el DataView
    const renderDataViewComponent = () => {
      const dataViewOptions: DataViewOptions = {
        products,
        size,
        showCategory,
        showRating,
        showPrice,
        showWishlist,
        showBuyButton,
        buyButtonText,
        buyButtonIcon,
        wishlistIcon,
        onProductClick: (product, index) => {
          // Handler para click en producto
        },
        onBuyClick: (product, index) => {
          alert(\`Comprar: \${product.name} - $\${product.price}\`);
        },
        onWishlistClick: (product, index) => {
          product.inWishlist = !product.inWishlist;
          // Re-renderizar el componente
          const dataViewElement = container.querySelector('.ubits-data-view');
          if (dataViewElement) {
            dataViewElement.remove();
          }
          const newDataView = createDataView(dataViewOptions);
          container.appendChild(newDataView);
        }
      };
      return createDataView(dataViewOptions);
    };

    // Crear DataView inicial
    const dataView = renderDataViewComponent();
    container.appendChild(dataView);
    return container;
  }
}`,...v.parameters?.docs?.source}}};const z=["Default"];export{v as Default,z as __namedExportsOrder,j as default};
