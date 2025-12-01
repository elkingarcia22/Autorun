function k(a = {}) {
  const { size: s = "md", variant: e = "primary", animated: t = !0, label: i, fullScreen: n = !1, className: r = "", style: u = "" } = a, l = [
    "ubits-spinner",
    `ubits-spinner--${s}`,
    `ubits-spinner--${e}`,
    t ? "ubits-spinner--animated" : "",
    n ? "ubits-spinner--fullscreen" : "",
    r
  ].filter(Boolean).join(" "), p = u ? ` style="${u}"` : "";
  return `
    <div class="${l}"${p}>
      <div class="ubits-spinner__circle">
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
      </div>
      ${i ? `<span class="ubits-spinner__label">${i}</span>` : ""}
    </div>
  `.trim();
}
function _(a, s = "regular") {
  try {
    const e = s === "solid" ? "fas" : "far", t = a.startsWith("fa-") ? a : `fa-${a}`;
    return `<i class="${e} ${t}"></i>`;
  } catch {
    const t = s === "solid" ? "fas" : "far", i = a.startsWith("fa-") ? a : `fa-${a}`;
    return `<i class="${t} ${i}"></i>`;
  }
}
function S(a) {
  const { variant: s = "primary", size: e = "md", text: t = "", icon: i, iconStyle: n = "regular", iconOnly: r = !1, disabled: u = !1, loading: l = !1, loadingText: p, badge: d = !1, active: P = !1, fullWidth: b = !1, block: v = !1, iconPosition: w = "left", className: x = "", attributes: z = {}, dropdown: o = !1, showTooltip: B = !1, tooltipText: I = "" } = a, c = [
    "ubits-button",
    `ubits-button--${s}`,
    `ubits-button--${e}`,
    P && "ubits-button--active",
    r && "ubits-button--icon-only",
    l && "ubits-button--loading",
    b && "ubits-button--full-width",
    v && "ubits-button--block",
    w === "right" && "ubits-button--icon-right",
    o && "ubits-button--dropdown",
    x
  ].filter(Boolean).join(" "), M = [
    u && "disabled",
    l && 'data-loading="true"',
    l && 'aria-busy="true"',
    ...Object.entries(z).map(([H, j]) => `${H}="${j}"`)
  ].filter(Boolean).join(" ");
  let y = "";
  i && (y = _(i, n));
  let g = y, f = w;
  o && !i && t ? (g = _("chevron-down", n), f = "right") : o && i && w === "left" && t ? g = `${y}${_("chevron-down", n)}` : o && !t && (g = i ? `${y}${_("chevron-down", n)}` : _("chevron-down", n));
  const h = {
    xs: "xs",
    sm: "sm",
    md: "sm",
    lg: "md",
    xl: "lg"
  }[e] || "sm", A = {
    primary: "primary",
    secondary: "secondary",
    tertiary: "secondary",
    active: "primary"
  }[s] || "primary", T = l ? k({
    size: h,
    variant: A,
    animated: !0,
    className: "ubits-button__spinner"
  }) : "";
  let $ = "";
  l && p ? $ = `${T}<span class="button-text">${p}</span>` : l && !t ? $ = T : l && t ? w === "right" ? $ = `<span class="button-text">${t}</span>${T}` : $ = `${T}<span class="button-text">${t}</span>` : r && i ? $ = y : g && t ? o && i && w === "left" ? $ = `${_(i, n)}<span>${t}</span>${_("chevron-down", n)}` : f === "right" ? $ = `<span>${t}</span>${g}` : $ = `${g}<span>${t}</span>` : t ? $ = o ? `<span>${t}</span>${_("chevron-down", n)}` : `<span>${t}</span>` : g && ($ = g);
  const E = d ? '<span class="ubits-button__badge"></span>' : "", O = r && B && I ? `title="${I}"` : "";
  return `
    <button class="${c}" ${M} ${O}>
      ${$}
      ${E}
    </button>
  `.trim();
}
function q(a, s, e) {
  const t = [];
  if (s <= e)
    for (let i = 1; i <= s; i++)
      t.push(i);
  else {
    const i = Math.floor(e / 2);
    let n = Math.max(1, a - i), r = Math.min(s, n + e - 1);
    r - n < e - 1 && (n = Math.max(1, r - e + 1));
    for (let u = n; u <= r; u++)
      t.push(u);
  }
  return t;
}
function N(a, s, e = "md", t) {
  return S({
    variant: s ? "secondary" : "tertiary",
    size: e === "sm" ? "sm" : e === "lg" ? "lg" : "md",
    text: String(a),
    active: s,
    className: "ubits-pagination__page-button"
  });
}
function L(a) {
  const {
    currentPage: s = 1,
    totalPages: e,
    totalItems: t,
    itemsPerPage: i,
    variant: n = "default",
    size: r = "md",
    maxVisiblePages: u = 7,
    showFirst: l = !0,
    showLast: p = !0,
    showPrevNext: d = !0,
    showInfo: P = !1,
    showItemsPerPage: b = !1,
    itemsPerPageOptions: v = [10, 20, 50, 100],
    className: w = "",
    attributes: x = {},
    labels: z = {}
  } = a, o = Math.max(1, Math.min(s, e)), B = [
    "ubits-pagination",
    `ubits-pagination--${n}`,
    `ubits-pagination--${r}`,
    w
  ].filter(Boolean).join(" "), I = [
    ...Object.entries(x).map(([m, h]) => `${m}="${h}"`)
  ].filter(Boolean).join(" "), c = {
    first: "Primera",
    last: "Última",
    previous: "Anterior",
    next: "Siguiente",
    page: "Página",
    of: "de",
    items: "items",
    itemsPerPage: "Por página",
    ...z
  };
  let M = "";
  if (P && t !== void 0) {
    const m = (o - 1) * (i || 10) + 1, h = Math.min(o * (i || 10), t);
    M = `
      <div class="ubits-pagination__info">
        <span class="ubits-body-sm">${m}-${h} ${c.of} ${t} ${c.items}</span>
      </div>
    `;
  }
  let y = "";
  if (b) {
    const m = `ubits-pagination-items-per-page-${Date.now()}`;
    y = `
      <div class="ubits-pagination__items-per-page">
        <label for="${m}" class="ubits-body-sm">${c.itemsPerPage}:</label>
        <select id="${m}" class="ubits-pagination__select ubits-body-sm">
          ${v.map(
      (h) => `<option value="${h}" ${h === i ? "selected" : ""}>${h}</option>`
    ).join("")}
        </select>
      </div>
    `;
  }
  const g = r === "sm" ? "sm" : r === "lg" ? "lg" : "md", f = [];
  if (l && n === "default" && f.push(S({
    variant: "tertiary",
    size: g,
    icon: "angle-double-left",
    iconStyle: "solid",
    iconOnly: !0,
    disabled: o === 1,
    className: "ubits-pagination__nav-button",
    attributes: {
      "aria-label": c.first,
      title: c.first
    }
  })), d && f.push(S({
    variant: "tertiary",
    size: g,
    icon: "chevron-left",
    iconStyle: "solid",
    iconOnly: !0,
    disabled: o === 1,
    className: "ubits-pagination__nav-button",
    attributes: {
      "aria-label": c.previous,
      title: c.previous
    }
  })), n === "default") {
    const m = q(o, e, u);
    m[0] > 1 && f.push('<span class="ubits-pagination__ellipsis">...</span>'), m.forEach((h) => {
      f.push(N(h, h === o, r));
    }), m[m.length - 1] < e && f.push('<span class="ubits-pagination__ellipsis">...</span>');
  } else n === "compact" && f.push(`
      <span class="ubits-pagination__page-info ubits-body-md">
        ${c.page} ${o} ${c.of} ${e}
      </span>
    `);
  return d && f.push(S({
    variant: "tertiary",
    size: g,
    icon: "chevron-right",
    iconStyle: "solid",
    iconOnly: !0,
    disabled: o === e,
    className: "ubits-pagination__nav-button",
    attributes: {
      "aria-label": c.next,
      title: c.next
    }
  })), p && n === "default" && f.push(S({
    variant: "tertiary",
    size: g,
    icon: "angle-double-right",
    iconStyle: "solid",
    iconOnly: !0,
    disabled: o === e,
    className: "ubits-pagination__nav-button",
    attributes: {
      "aria-label": c.last,
      title: c.last
    }
  })), `
    <div class="${B}" ${I} data-current-page="${o}" data-total-pages="${e}">
      ${M}
      ${y}
      <div class="ubits-pagination__controls">
        ${f.join("")}
      </div>
    </div>
  `;
}
function D(a) {
  const { containerId: s, ...e } = a;
  if (!s)
    return console.error("❌ [Pagination] containerId es requerido para createPagination"), null;
  const t = document.getElementById(s);
  if (!t)
    return console.error(`❌ [Pagination] Contenedor con ID "${s}" no encontrado`), null;
  const i = L(e);
  t.innerHTML = i;
  const n = t.querySelector(".ubits-pagination");
  if (!n)
    return console.error("❌ [Pagination] No se pudo crear el elemento de paginación"), null;
  n.querySelectorAll(".ubits-pagination__page-button").forEach((p) => {
    p.addEventListener("click", () => {
      const d = parseInt(p.textContent || "1");
      e.onPageChange && e.onPageChange(d);
    });
  }), n.querySelectorAll(".ubits-pagination__nav-button").forEach((p) => {
    p.addEventListener("click", () => {
      const d = parseInt(n.getAttribute("data-current-page") || "1"), P = parseInt(n.getAttribute("data-total-pages") || "1"), b = p.getAttribute("aria-label") || "";
      let v = d;
      b.includes("Primera") || b.includes("First") ? v = 1 : b.includes("Última") || b.includes("Last") ? v = P : b.includes("Anterior") || b.includes("Previous") ? v = Math.max(1, d - 1) : (b.includes("Siguiente") || b.includes("Next")) && (v = Math.min(P, d + 1)), v !== d && e.onPageChange && e.onPageChange(v);
    });
  });
  const l = n.querySelector(".ubits-pagination__select");
  return l && e.onItemsPerPageChange && l.addEventListener("change", (p) => {
    const d = p.target, P = parseInt(d.value);
    e.onItemsPerPageChange?.(P);
  }), console.log("✅ [Pagination] Paginador creado exitosamente"), n;
}
class C extends HTMLElement {
  constructor() {
    super(...arguments), this.options = {
      totalPages: 1
    };
  }
  connectedCallback() {
    this.render();
  }
  static get observedAttributes() {
    return ["variant", "size", "current-page", "total-pages"];
  }
  attributeChangedCallback(s, e, t) {
    e !== t && this.render();
  }
  setOptions(s) {
    this.options = { ...this.options, ...s }, this.render();
  }
  getOptions() {
    return { ...this.options };
  }
  render() {
    const s = this.getAttribute("variant") || this.options.variant, e = this.getAttribute("size") || this.options.size, t = parseInt(this.getAttribute("current-page") || String(this.options.currentPage || 1)), i = parseInt(this.getAttribute("total-pages") || String(this.options.totalPages || 1)), n = {
      ...this.options,
      variant: s,
      size: e,
      currentPage: t,
      totalPages: i
    };
    this.innerHTML = L(n), this.options.onPageChange && this.querySelectorAll("button").forEach((u) => {
      u.addEventListener("click", () => {
        const l = parseInt(u.getAttribute("data-page") || "1");
        this.options.onPageChange?.(l);
      });
    });
  }
}
typeof window < "u" && !customElements.get("ubits-pagination") && customElements.define("ubits-pagination", C);
const U = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UBITSPagination: C
}, Symbol.toStringTag, { value: "Module" }));
class F {
  constructor() {
    this.name = "@ubits/pagination", this.version = "1.0.0";
  }
  async initialize(s) {
    customElements.get("ubits-pagination") || customElements.define("ubits-pagination", C), typeof window < "u" && (window.UBITS = window.UBITS || {}, window.UBITS.Pagination = {
      render: (e) => {
        const { renderPagination: t } = require("./PaginationProvider");
        return t(e);
      },
      create: (e) => {
        const { createPagination: t } = require("./PaginationProvider");
        return t(e);
      }
    }), console.log("✅ Pagination add-on initialized");
  }
  destroy() {
    typeof window < "u" && window.UBITS?.Pagination && delete window.UBITS.Pagination;
  }
  getComponents() {
    return [{
      name: "ubits-pagination",
      tag: "ubits-pagination",
      documentation: "https://ubits.design/components/pagination"
    }];
  }
  getStyles() {
    return ["./styles/pagination.css"];
  }
}
typeof window < "u" && Promise.resolve().then(() => U).then(() => {
  console.log("✅ UBITS Pagination component registered");
});
export {
  F as PaginationAddon,
  C as UBITSPagination,
  D as createPagination,
  L as renderPagination
};
