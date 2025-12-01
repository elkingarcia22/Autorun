function _(a, s = "regular", t) {
  const e = s === "solid" ? "fas" : "far", r = a.startsWith("fa-") ? a : `fa-${a}`, n = t ? `style="color: ${t};"` : "";
  return `<i class="${e} ${r}" ${n}></i>`;
}
function w(a) {
  return typeof a == "number" ? a.toLocaleString("es-ES") : String(a);
}
function T(a, s = "md") {
  const { label: t, value: e, icon: r, iconStyle: n = "regular", iconColor: o, change: i, description: l } = a, h = w(e), p = s === "sm" ? "ubits-body-sm" : s === "lg" ? "ubits-body-lg" : "ubits-body-md", d = s === "sm" ? "ubits-body-xs" : "ubits-body-sm", u = r ? _(r, n, o) : "";
  let b = "";
  if (i) {
    const c = i.type, m = c === "increase" ? "ubits-stats-card__change--increase" : c === "decrease" ? "ubits-stats-card__change--decrease" : "ubits-stats-card__change--neutral", f = c === "increase" ? "arrow-up" : c === "decrease" ? "arrow-down" : "minus", $ = i.label || `${Math.abs(i.value)}%`;
    b = `
      <div class="ubits-stats-card__change ${m}">
        ${_(f, "solid")}
        <span class="${d}">${$}</span>
      </div>
    `;
  }
  const g = l ? `<p class="ubits-stats-card__description ${d}">${l}</p>` : "";
  return `
    <div class="ubits-stats-card__item">
      ${u ? `<div class="ubits-stats-card__icon">${u}</div>` : ""}
      <div class="ubits-stats-card__content">
        <div class="ubits-stats-card__label ${d}">${t}</div>
        <div class="ubits-stats-card__value ${p}">${h}</div>
        ${b}
        ${g}
      </div>
    </div>
  `;
}
function C(a) {
  const {
    title: s,
    variant: t = "default",
    size: e = "md",
    stats: r,
    layout: n = "grid",
    columns: o = 2,
    bordered: i = !0,
    elevated: l = !1,
    className: h = "",
    attributes: p = {},
    showAction: d = !1,
    actionLabel: u = "Ver más"
  } = a, b = [
    "ubits-stats-card",
    `ubits-stats-card--${t}`,
    `ubits-stats-card--${e}`,
    `ubits-stats-card--${n}`,
    i && "ubits-stats-card--bordered",
    l && "ubits-stats-card--elevated",
    h
  ].filter(Boolean).join(" "), g = [
    ...Object.entries(p).map(([v, y]) => `${v}="${y}"`)
  ].filter(Boolean).join(" "), c = s ? `<div class="ubits-stats-card__header">
         <h3 class="ubits-stats-card__title ubits-heading-h3">${s}</h3>
         ${d ? `
           <button class="ubits-stats-card__action" type="button" aria-label="${u}">
             ${_("chevron-right", "solid")}
           </button>
         ` : ""}
       </div>` : "", m = r.map((v) => T(v, e)).join(""), f = n === "grid" ? `ubits-stats-card__grid ubits-stats-card__grid--${o}` : "";
  return `
    <div class="${b}" ${g}>
      ${c}
      <div class="ubits-stats-card__body">
        <div class="${n === "grid" ? f : "ubits-stats-card__list"}">
          ${m}
        </div>
      </div>
    </div>
  `;
}
function L(a) {
  const { containerId: s, ...t } = a;
  if (!s)
    return console.error("❌ [StatsCard] containerId es requerido para createStatsCard"), null;
  const e = document.getElementById(s);
  if (!e)
    return console.error(`❌ [StatsCard] Contenedor con ID "${s}" no encontrado`), null;
  const r = C(t);
  e.innerHTML = r;
  const n = e.querySelector(".ubits-stats-card");
  if (!n)
    return console.error("❌ [StatsCard] No se pudo crear el elemento de la tarjeta"), null;
  if (t.onClick && n.addEventListener("click", t.onClick), t.onAction && t.showAction) {
    const o = n.querySelector(".ubits-stats-card__action");
    o && o.addEventListener("click", (i) => {
      i.stopPropagation(), t.onAction?.(i);
    });
  }
  return console.log("✅ [StatsCard] Tarjeta creada exitosamente"), n;
}
class S extends HTMLElement {
  constructor() {
    super(...arguments), this.options = {
      stats: []
    };
  }
  connectedCallback() {
    this.render();
  }
  static get observedAttributes() {
    return ["variant", "size", "layout", "columns", "bordered", "elevated"];
  }
  attributeChangedCallback(s, t, e) {
    t !== e && this.render();
  }
  setOptions(s) {
    this.options = { ...this.options, ...s }, this.render();
  }
  getOptions() {
    return { ...this.options };
  }
  render() {
    const s = this.getAttribute("variant") || this.options.variant, t = this.getAttribute("size") || this.options.size, e = this.getAttribute("layout") || this.options.layout, r = parseInt(this.getAttribute("columns") || "2"), n = this.hasAttribute("bordered") || this.options.bordered, o = this.hasAttribute("elevated") || this.options.elevated, i = {
      ...this.options,
      variant: s,
      size: t,
      layout: e,
      columns: r,
      bordered: n,
      elevated: o
    };
    this.innerHTML = C(i), this.options.onClick && this.addEventListener("click", this.options.onClick);
  }
}
typeof window < "u" && !customElements.get("ubits-stats-card") && customElements.define("ubits-stats-card", S);
const I = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UBITSStatsCard: S
}, Symbol.toStringTag, { value: "Module" }));
class A {
  constructor() {
    this.name = "@ubits/stats-card", this.version = "1.0.0";
  }
  async initialize(s) {
    customElements.get("ubits-stats-card") || customElements.define("ubits-stats-card", S), typeof window < "u" && (window.UBITS = window.UBITS || {}, window.UBITS.StatsCard = {
      render: (t) => {
        const { renderStatsCard: e } = require("./StatsCardProvider");
        return e(t);
      },
      create: (t) => {
        const { createStatsCard: e } = require("./StatsCardProvider");
        return e(t);
      }
    }), console.log("✅ StatsCard add-on initialized");
  }
  destroy() {
    typeof window < "u" && window.UBITS?.StatsCard && delete window.UBITS.StatsCard;
  }
  getComponents() {
    return [{
      name: "ubits-stats-card",
      tag: "ubits-stats-card",
      documentation: "https://ubits.design/components/stats-card"
    }];
  }
  getStyles() {
    return ["./styles/stats-card.css"];
  }
}
typeof window < "u" && Promise.resolve().then(() => I).then(() => {
  console.log("✅ UBITS StatsCard component registered");
});
export {
  A as StatsCardAddon,
  S as UBITSStatsCard,
  L as createStatsCard,
  C as renderStatsCard
};
