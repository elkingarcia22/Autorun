console.log("🔵 [data-view/DataViewProvider.ts] Iniciando carga de DataViewProvider...");
console.log("✅ [data-view/DataViewProvider.ts] Tipos importados correctamente");
console.log("✅ [data-view/DataViewProvider.ts] Estilos data-view.css importados");
console.log("✅ [data-view/DataViewProvider.ts] Estilos button.css importados");
function $(t, s = "regular") {
  const a = s === "solid" ? "fas" : "far", r = t.startsWith("fa-") ? t : `fa-${t}`;
  return `<i class="${a} ${r}"></i>`;
}
function h(t = "INSTOCK") {
  const s = {
    INSTOCK: { text: "INSTOCK", class: "ubits-data-view__stock-badge--instock" },
    LOWSTOCK: { text: "LOWSTOCK", class: "ubits-data-view__stock-badge--lowstock" },
    OUTOFSTOCK: { text: "OUTOFSTOCK", class: "ubits-data-view__stock-badge--outofstock" }
  }, a = s[t] || s.INSTOCK;
  return `<span class="ubits-data-view__stock-badge ${a.class}">${a.text}</span>`;
}
function y(t) {
  const s = Math.floor(t), a = t % 1 >= 0.5, r = 5 - s - (a ? 1 : 0);
  let n = "";
  for (let i = 0; i < s; i++)
    n += '<i class="fas fa-star ubits-data-view__star ubits-data-view__star--filled"></i>';
  a && (n += '<i class="fas fa-star-half-alt ubits-data-view__star ubits-data-view__star--half"></i>');
  for (let i = 0; i < r; i++)
    n += '<i class="far fa-star ubits-data-view__star ubits-data-view__star--empty"></i>';
  return `
    <div class="ubits-data-view__rating">
      ${n}
      <span class="ubits-body-sm-regular ubits-data-view__rating-number">${t}</span>
    </div>
  `;
}
function p(t) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(t);
}
function C(t, s, a) {
  const {
    showCategory: r = !0,
    showRating: n = !0,
    showPrice: i = !0,
    showWishlist: b = !0,
    showBuyButton: d = !0,
    buyButtonText: v = "Buy Now",
    buyButtonIcon: w = "shopping-cart",
    wishlistIcon: e = "heart"
  } = a, c = t.id || `product-${s}`, u = t.stockStatus || "INSTOCK", o = t.inWishlist || !1;
  return `
    <div class="ubits-data-view__item" data-product-id="${c}" data-index="${s}">
      <div class="ubits-data-view__image-wrapper">
        <img 
          src="${t.image}" 
          alt="${t.imageAlt || t.name}" 
          class="ubits-data-view__image"
        />
        ${h(u)}
      </div>
      <div class="ubits-data-view__content">
        <div class="ubits-data-view__main">
          ${r ? `<div class="ubits-body-sm-regular ubits-data-view__category">${t.category}</div>` : ""}
          <h3 class="ubits-body-md-semibold ubits-data-view__name">${t.name}</h3>
          ${n ? y(t.rating) : ""}
        </div>
        <div class="ubits-data-view__right">
          ${i ? `<span class="ubits-body-md-bold ubits-data-view__price">${p(t.price)}</span>` : ""}
          <div class="ubits-data-view__actions">
            ${b ? `
              <button 
                class="ubits-button ubits-button--secondary ubits-button--sm ubits-data-view__wishlist-button ${o ? "ubits-data-view__wishlist-button--active" : ""}"
                data-action="wishlist"
                aria-label="${o ? "Remover de favoritos" : "Agregar a favoritos"}"
              >
                ${$(e, o ? "solid" : "regular")}
              </button>
            ` : ""}
            ${d ? `
              <button class="ubits-button ubits-button--primary ubits-button--sm ubits-data-view__buy-button" data-action="buy">
                ${$(w, "solid")}
                <span>${v}</span>
              </button>
            ` : ""}
          </div>
        </div>
      </div>
    </div>
  `;
}
function O(t) {
  console.log("🔵 [data-view] renderDataView llamado con opciones:", {
    productsCount: t.products?.length || 0,
    size: t.size,
    containerId: t.containerId
  });
  const {
    products: s = [],
    containerId: a,
    size: r = "md",
    className: n = "",
    attributes: i = {}
  } = t, d = ["ubits-data-view", `ubits-data-view--${r}`, n].filter(Boolean).join(" "), v = Object.entries(i).map(([c, u]) => `${c}="${u}"`).join(" "), w = a ? `id="${a}"` : "";
  let e = `<div class="${d}" ${w} ${v}>`;
  return s.forEach((c, u) => {
    e += C(c, u, t);
  }), e += "</div>", e;
}
function I(t) {
  if (console.log("🔵 [data-view] createDataView llamado con opciones:", {
    productsCount: t.products?.length || 0,
    size: t.size,
    containerId: t.containerId,
    hasContainer: !!t.container
  }), typeof document > "u")
    throw new Error("createDataView requiere un entorno con DOM (navegador)");
  const {
    container: s,
    containerId: a,
    products: r = [],
    size: n = "md",
    onProductClick: i,
    onBuyClick: b,
    onWishlistClick: d,
    className: v = "",
    attributes: w = {}
  } = t, e = s || document.createElement("div"), c = `ubits-data-view--${n}`;
  return e.className = ["ubits-data-view", c, v].filter(Boolean).join(" "), a && (e.id = a), Object.entries(w).forEach(([o, l]) => {
    e.setAttribute(o, l);
  }), e.innerHTML = O(t), e.querySelectorAll(".ubits-data-view__item").forEach((o, l) => {
    const f = r[l];
    if (!f) return;
    i && o.addEventListener("click", (_) => {
      _.target.closest("button") || i(f, l, o);
    });
    const m = o.querySelector('[data-action="buy"]');
    m && b && m.addEventListener("click", (_) => {
      _.stopPropagation(), b(f, l, o);
    });
    const g = o.querySelector('[data-action="wishlist"]');
    g && d && g.addEventListener("click", (_) => {
      _.stopPropagation(), d(f, l, o);
    });
  }), e;
}
export {
  I as createDataView,
  O as renderDataView
};
