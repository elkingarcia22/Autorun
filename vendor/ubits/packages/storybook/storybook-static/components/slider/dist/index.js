class Tt {
  constructor() {
    this.name = "@ubits/slider", this.version = "1.0.0";
  }
  async initialize(n) {
    if (typeof window < "u" && typeof HTMLElement < "u" && !customElements.get("ubits-slider")) {
      const { UBITSSlider: s } = await import("./SliderComponent-B6HUzZyV.js");
      customElements.define("ubits-slider", s), console.log("✅ [SliderAddon] Web Component ubits-slider registrado");
    }
    typeof window < "u" && (window.UBITS = window.UBITS || {}, window.UBITS.Slider = {
      create: (s) => {
        const { createSlider: c } = require("./SliderProvider");
        return c(s);
      },
      render: (s) => {
        const { renderSlider: c } = require("./SliderProvider");
        return c(s);
      }
    }, window.createSlider || (window.createSlider = (s) => {
      const { createSlider: c } = require("./SliderProvider");
      return c(s);
    })), console.log("✅ Slider add-on initialized");
  }
  destroy() {
    typeof window < "u" && window.UBITS?.Slider && (delete window.UBITS.Slider, delete window.createSlider);
  }
  getComponents() {
    return [{
      name: "ubits-slider",
      tag: "ubits-slider",
      documentation: "https://ubits.design/components/slider"
      // Placeholder
    }];
  }
  getStyles() {
    return ["./styles/slider.css"];
  }
}
function Z(u) {
  const { items: n, size: s = "md", maxHeight: c = "400px", className: a = "", attributes: r = {} } = u, e = ["ubits-list", a].filter(Boolean).join(" "), o = Object.entries(r).map(([i, g]) => `${i}="${g}"`).join(" ");
  let p = `<div class="${e}" role="list" style="max-height: ${c};" ${o}>`;
  return n.forEach((i, g) => {
    const b = i.value || `list-item-${g}`, y = i.state || (i.selected ? "active" : "default"), m = [
      "ubits-list-item",
      `ubits-list-item--${s}`,
      y !== "default" ? `ubits-list-item--${y}` : ""
    ].filter(Boolean).join(" "), t = [];
    i.selected && t.push('aria-selected="true"'), y === "disabled" ? t.push('aria-disabled="true"') : t.push('tabindex="0"'), t.push(`data-value="${b}"`), t.push(`data-index="${g}"`), i.attributes && Object.entries(i.attributes).forEach(([h, d]) => {
      t.push(`${h}="${d}"`);
    }), p += `
      <div class="${m}" role="listitem" ${t.join(" ")}>
        ${i.label}
      </div>
    `;
  }), p += "</div>", p;
}
function ot(u) {
  const { containerId: n, items: s, size: c = "md", onSelectionChange: a, multiple: r = !1 } = u, e = document.getElementById(n);
  if (!e)
    throw new Error(`Container with id "${n}" not found`);
  const o = Z(u);
  e.innerHTML = o;
  const p = e.querySelector(".ubits-list");
  if (!p)
    throw new Error("Failed to create list element");
  const i = p.querySelectorAll(".ubits-list-item");
  let g = null;
  return i.forEach((b, y) => {
    const m = s[y];
    m && (m.state !== "disabled" && b.addEventListener("click", () => {
      if (m.onClick && m.onClick(m, y), r) {
        if (b.classList.contains("ubits-list-item--active") ? (b.classList.remove("ubits-list-item--active"), b.removeAttribute("aria-selected")) : (b.classList.add("ubits-list-item--active"), b.setAttribute("aria-selected", "true")), a) {
          const h = Array.from(i).map((d, T) => d.classList.contains("ubits-list-item--active") ? { item: s[T], index: T } : null).filter(Boolean);
          if (h.length > 0) {
            const d = h[h.length - 1];
            a(d.item, d.index);
          } else
            a(null, null);
        }
      } else {
        if (g !== null && g !== y) {
          const t = i[g];
          t.classList.remove("ubits-list-item--active"), t.removeAttribute("aria-selected");
        }
        g !== y ? (b.classList.add("ubits-list-item--active"), b.setAttribute("aria-selected", "true"), g = y, a && a(m, y)) : (b.classList.remove("ubits-list-item--active"), b.removeAttribute("aria-selected"), g = null, a && a(null, null));
      }
    }), m.state !== "disabled" && b.addEventListener("keydown", (t) => {
      const h = y;
      let d = null;
      if (t.key === "ArrowDown")
        t.preventDefault(), d = h < s.length - 1 ? h + 1 : 0;
      else if (t.key === "ArrowUp")
        t.preventDefault(), d = h > 0 ? h - 1 : s.length - 1;
      else if (t.key === "Enter" || t.key === " ") {
        t.preventDefault(), b.click();
        return;
      } else t.key === "Home" ? (t.preventDefault(), d = 0) : t.key === "End" && (t.preventDefault(), d = s.length - 1);
      if (d !== null) {
        const T = i[d];
        T && s[d]?.state !== "disabled" && (T.focus(), T.scrollIntoView({ block: "nearest", behavior: "smooth" }));
      }
    }));
  }), p;
}
const st = {
  sm: "320px",
  md: "480px",
  lg: "640px",
  xl: "800px",
  full: "1280px"
};
function ut(u) {
  const { title: n, bodyContent: s = "", size: c = "md", fullScreen: a = !1, footerButtons: r, className: e = "" } = u, o = st[c] || st.md, g = [
    "ubits-modal",
    `ubits-modal--size-${c}`,
    a ? "ubits-modal--full-screen" : "",
    e
  ].filter(Boolean).join(" "), b = `
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${n}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `, m = `
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${typeof s == "function" ? s() : s || '<div class="ubits-modal__placeholder">Contenido del modal</div>'}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `, t = r ? `
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${r.tertiary ? `
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${r.tertiary.label}</span>
          </button>
        </div>
        ` : ""}
        <div class="ubits-modal__footer-right">
          ${r.secondary ? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${r.secondary.label}</span>
          </button>
          ` : ""}
          ${r.primary ? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${r.primary.label}</span>
          </button>
          ` : ""}
        </div>
      </div>
    </div>
  ` : "";
  return `
    <div class="ubits-modal-overlay">
      <div class="${g}" style="max-width: ${o};">
        ${b}
        ${m}
        ${t}
      </div>
    </div>
  `.trim();
}
function J(u) {
  const { containerId: n, onClose: s, closeOnOverlayClick: c = !0, open: a = !1 } = u;
  let r;
  n ? r = document.getElementById(n) || document.body : r = document.body;
  const e = document.createElement("div");
  e.innerHTML = ut(u);
  const o = e.firstElementChild;
  if (!o)
    throw new Error("No se pudo crear el modal");
  o.querySelector(".ubits-modal");
  const p = o.querySelector(".ubits-modal__close"), i = o, g = () => {
    o.classList.add("ubits-modal-overlay--open"), document.body.style.overflow = "hidden";
  }, b = () => {
    o.classList.remove("ubits-modal-overlay--open"), document.body.style.overflow = "", s && s();
  }, y = (t) => {
    const h = o.querySelector(".ubits-modal__body-content");
    if (h) {
      const d = typeof t == "function" ? t() : t;
      h.innerHTML = d;
    }
  };
  p && p.addEventListener("click", (t) => {
    t.preventDefault(), t.stopPropagation(), b();
  }), c && i && i.addEventListener("click", (t) => {
    t.target === i && b();
  });
  const m = (t) => {
    t.key === "Escape" && o.classList.contains("ubits-modal-overlay--open") && b();
  };
  if (document.addEventListener("keydown", m), u.footerButtons) {
    const t = o.querySelector(".ubits-modal__footer-left .ubits-modal__footer-button"), h = o.querySelector(".ubits-modal__footer-right .ubits-button--secondary"), d = o.querySelector(".ubits-modal__footer-right .ubits-button--primary");
    t && u.footerButtons.tertiary?.onClick && t.addEventListener("click", (T) => {
      T.preventDefault(), u.footerButtons.tertiary.onClick(T);
    }), h && u.footerButtons.secondary?.onClick && h.addEventListener("click", (T) => {
      T.preventDefault(), u.footerButtons.secondary.onClick(T);
    }), d && u.footerButtons.primary?.onClick && d.addEventListener("click", (T) => {
      T.preventDefault(), u.footerButtons.primary.onClick(T);
    });
  }
  return r.appendChild(o), a && g(), {
    element: o,
    open: g,
    close: b,
    updateContent: y
  };
}
function pt(u) {
  const { containerId: n, label: s = "", placeholder: c = "", helperText: a = "", size: r = "md", state: e = "default", type: o = "text", showLabel: p = !0, showHelper: i = !1, showCounter: g = !1, maxLength: b = 50, mandatory: y = !1, mandatoryType: m = "obligatorio", leftIcon: t = "", rightIcon: h = "", value: d = "", className: T = "", attributes: S = {}, showRichTextToolbar: k = !1 } = u;
  let w = "";
  if (p && s) {
    const M = y ? ` <span class="ubits-input-mandatory">(${m})</span>` : "";
    w += `<label class="ubits-input-label">${s}${M}</label>`;
  }
  const q = t && t.trim() !== "", I = h && h.trim() !== "";
  q && t.startsWith("fa-") ? `${t}` : q && `${t}`, I && h.startsWith("fa-") ? `${h}` : I && `${h}`, w += '<div style="position: relative; display: inline-block; width: 100%;">';
  let R = h, B = I, D = t, V = q;
  const v = ["ubits-input", `ubits-input--${r}`];
  e !== "default" && v.push(`ubits-input--${e}`), T && v.push(T);
  const j = e === "disabled" ? " disabled" : "", E = g ? ` maxlength="${b}"` : "", P = q ? "padding-left: 40px;" : "padding-left: 12px;", $ = I ? "padding-right: 40px;" : "padding-right: 12px;";
  if (o === "select") {
    const M = u.selectOptions || [], H = d && M.find((_) => _.value === d)?.text || c;
    w += `<input type="text" class="${v.join(" ")}" style="width: 100%; ${P} ${$}" value="${H}" readonly>`, I || (R = "fa-chevron-down", B = !0, $ === "padding-right: 12px;" && (w = w.replace(`style="width: 100%; ${P} ${$}"`, `style="width: 100%; ${P} padding-right: 40px;"`)));
  } else if (o === "textarea")
    if (k) {
      w += '<div class="ubits-input-rich-text-wrapper">', w += `
        <div class="ubits-input-rich-text-toolbar" data-container-id="${n}">
          <button type="button" class="ubits-rich-text-btn" data-command="bold" title="Negrita">
            <i class="fas fa-bold"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="italic" title="Cursiva">
            <i class="fas fa-italic"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="underline" title="Subrayado">
            <i class="fas fa-underline"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyLeft" title="Alinear izquierda">
            <i class="fas fa-align-left"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyCenter" title="Alinear centro">
            <i class="fas fa-align-center"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyRight" title="Alinear derecha">
            <i class="fas fa-align-right"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="insertUnorderedList" title="Lista con viñetas">
            <i class="fas fa-list-ul"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="insertOrderedList" title="Lista numerada">
            <i class="fas fa-list-ol"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="insertImage" title="Insertar imagen">
            <i class="fas fa-image"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="insertTable" title="Insertar tabla">
            <i class="fas fa-table"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="createLink" title="Insertar enlace">
            <i class="fas fa-link"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="code" title="Código">
            <i class="fas fa-code"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="removeFormat" title="Limpiar formato">
            <i class="fas fa-remove-format"></i>
          </button>
        </div>
      `;
      let M = `width: 100%; min-height: 80px; resize: vertical; ${P} ${$}; border: none; border-radius: 0;`;
      e === "disabled" && (M += "; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important;");
      const H = `${n}-textarea`;
      w += `<textarea id="${H}" class="${v.join(" ")}" style="${M}" placeholder="${c}"${j}${E}>${d}</textarea>`, w += "</div>";
    } else {
      let M = `width: 100%; min-height: 80px; resize: vertical; ${P} ${$}`;
      e === "disabled" && (M += "; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;");
      const H = `${n}-textarea`;
      w += `<textarea id="${H}" class="${v.join(" ")}" style="${M}" placeholder="${c}"${j}${E}>${d}</textarea>`;
    }
  else if (o === "search") {
    let M = P, H = $;
    q || (D = "fa-search", V = !0, M = r === "xs" ? "padding-left: 32px;" : r === "sm" ? "padding-left: 36px;" : r === "md" ? "padding-left: 40px;" : "padding-left: 44px;"), I || (R = "fa-times", B = !0, H = r === "xs" ? "padding-right: 32px;" : r === "sm" ? "padding-right: 36px;" : r === "md" ? "padding-right: 40px;" : "padding-right: 44px;");
    let _ = `width: 100%; ${M} ${H}`;
    e === "disabled" && (_ += "; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"), w += `<input type="text" class="${v.join(" ")}" style="${_}" placeholder="${c}" value="${d}" autocomplete="off"${j}${E}>`;
  } else if (o === "autocomplete") {
    let M = P, H = $;
    q || (D = "fa-search", V = !0, M = r === "xs" ? "padding-left: 32px;" : r === "sm" ? "padding-left: 36px;" : r === "md" ? "padding-left: 40px;" : "padding-left: 44px;"), I || (R = "fa-times", B = !0, H = r === "xs" ? "padding-right: 32px;" : r === "sm" ? "padding-right: 36px;" : r === "md" ? "padding-right: 40px;" : "padding-right: 44px;");
    let _ = `width: 100%; ${M} ${H}`;
    e === "disabled" && (_ += "; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"), w += `<input type="text" class="${v.join(" ")}" style="${_}" placeholder="${c}" value="${d}" autocomplete="off"${j}${E}>`;
  } else if (o === "calendar") {
    let M = P, H = $;
    I || (R = "fa-calendar", B = !0, H = r === "xs" ? "padding-right: 32px;" : r === "sm" ? "padding-right: 36px;" : r === "md" ? "padding-right: 40px;" : "padding-right: 44px;");
    let _ = `width: 100%; ${M} ${H}`;
    e === "disabled" && (_ += "; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"), w += `<input type="text" class="${v.join(" ")}" style="${_}" placeholder="${c}" value="${d}" readonly${j}>`;
  } else if (o === "password") {
    let M = P, H = $;
    I || (R = "fa-eye", B = !0, H = r === "xs" ? "padding-right: 32px;" : r === "sm" ? "padding-right: 36px;" : r === "md" ? "padding-right: 40px;" : "padding-right: 44px;");
    let _ = `width: 100%; ${M} ${H}`;
    e === "disabled" && (_ += "; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"), w += `<input type="password" class="${v.join(" ")}" style="${_}" placeholder="${c}" value="${d}"${j}${E}>`;
  } else
    w += `<input type="${o}" class="${v.join(" ")}" style="width: 100%; ${P} ${$}" placeholder="${c}" value="${d}"${j}${E}>`;
  if (V) {
    const M = D.startsWith("fa-") ? `far ${D}` : `far fa-${D}`;
    w += `<i class="${M} ubits-input-icon-left" style="position: absolute; left: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
  }
  if (B) {
    const M = R.startsWith("fa-") ? `far ${R}` : `far fa-${R}`;
    w += `<i class="${M} ubits-input-icon-right" style="position: absolute; right: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
  }
  w += "</div>", (i || g) && (w += '<div class="ubits-input-helper">', i && a && (w += `<span>${a}</span>`), g && (w += `<span class="ubits-input-counter">0/${b}</span>`), w += "</div>");
  const z = Object.entries(S).map(([M, H]) => `${M}="${H}"`).join(" ");
  return z ? `<div ${z}>${w}</div>` : w;
}
function X(u) {
  const { containerId: n, onChange: s, onFocus: c, onBlur: a, showCounter: r = !1, maxLength: e = 50, type: o = "text", selectOptions: p = [], autocompleteOptions: i = [], value: g = "" } = u;
  if (!n)
    return console.error("UBITS Input: containerId es requerido"), null;
  const b = document.getElementById(n);
  if (!b)
    return console.error(`UBITS Input: No se encontró el contenedor con ID "${n}"`), null;
  const y = pt(u);
  b.innerHTML = y;
  const m = b.querySelector('div[style*="position: relative"]'), t = b.querySelector(".ubits-input"), h = b.querySelector(".ubits-input-counter");
  if (!t || !m)
    return console.error("UBITS Input: No se pudo crear el elemento input"), null;
  if (getComputedStyle(b).position === "static" && (b.style.position = "relative"), o === "select" && gt(b, t, p, g, u.placeholder || "", s, u.size || "md"), o === "search" && ft(b, t, s), o === "autocomplete" && mt(b, t, i, s, u.size || "md"), o === "calendar" && ht(b, t, s), o === "password" && bt(b, t), o === "textarea" && u.showRichTextToolbar ? wt(b, t, u.onChange) : o === "textarea" && !u.showRichTextToolbar && St(b, t), r && h && yt(t, h, e), s && typeof s == "function") {
    const d = o === "select" ? "change" : "input";
    t.addEventListener(d, (T) => {
      s(T.target.value, T);
    });
  }
  return c && typeof c == "function" && t.addEventListener("focus", (d) => {
    c(d.target.value, d);
  }), a && typeof a == "function" && t.addEventListener("blur", (d) => {
    a(d.target.value, d);
  }), {
    element: m,
    inputElement: t,
    getValue: () => t.value,
    setValue: (d) => {
      t.value = d, r && h && Y(h, d.length, e);
    },
    focus: () => t.focus(),
    blur: () => t.blur(),
    disable: () => {
      t.disabled = !0, t.classList.add("ubits-input--disabled");
    },
    enable: () => {
      t.disabled = !1, t.classList.remove("ubits-input--disabled");
    },
    setState: (d) => {
      if (["ubits-input--hover", "ubits-input--focus", "ubits-input--active", "ubits-input--invalid", "ubits-input--disabled"].forEach((S) => t.classList.remove(S)), d !== "default" && t.classList.add(`ubits-input--${d}`), d === "disabled" ? t.disabled = !0 : t.disabled = !1, o === "textarea" && u.showRichTextToolbar) {
        const k = t.closest(".ubits-input-rich-text-wrapper")?.querySelector(".ubits-input-rich-text-toolbar");
        if (k) {
          const w = window.getComputedStyle(k).borderBottom;
          window.getComputedStyle(k).borderTop, w && w !== "none" && w !== "0px" && (console.warn(`[Rich Text] ⚠️ Línea divisoria detectada en setState("${d}"), removiendo...`), k.style.borderBottom = "none", k.style.borderTop = "none");
        }
      }
    }
  };
}
function bt(u, n) {
  const s = u.querySelector(".ubits-input-icon-right");
  if (s) {
    let c = !1;
    s.style.pointerEvents = "auto", s.style.cursor = "pointer";
    const r = !s.className.includes("fa-eye");
    s.addEventListener("click", (e) => {
      e.preventDefault(), e.stopPropagation(), c = !c, c ? (n.type = "text", r || (s.className = "far fa-eye-slash ubits-input-icon-right")) : (n.type = "password", r || (s.className = "far fa-eye ubits-input-icon-right"));
    });
  }
}
function ft(u, n, s) {
  const c = u.querySelector(".ubits-input-icon-right");
  if (c) {
    c.style.display = n.value.length > 0 ? "block" : "none", c.style.pointerEvents = "auto", c.style.cursor = "pointer";
    const a = () => {
      c.style.display = n.value.length > 0 ? "block" : "none";
    };
    n.addEventListener("input", a), c.addEventListener("click", (r) => {
      r.preventDefault(), n.value = "", n.focus(), a(), s && s("");
    });
  }
}
function mt(u, n, s, c, a = "md") {
  const r = a === "xs" ? "xs" : a === "sm" ? "sm" : a === "md" ? "md" : "lg", e = u.querySelector(".ubits-input-icon-right");
  if (e) {
    e.style.display = n.value.length > 0 ? "block" : "none", e.style.pointerEvents = "auto", e.style.cursor = "pointer";
    const i = () => {
      e.style.display = n.value.length > 0 ? "block" : "none";
    };
    n.addEventListener("input", i), e.addEventListener("click", (g) => {
      g.preventDefault(), n.value = "", n.focus(), i();
      const b = u.querySelector(".ubits-autocomplete-list-container");
      b && (b.style.display = "none"), c && c("");
    });
  }
  const o = document.createElement("div");
  o.className = "ubits-autocomplete-list-container", o.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `, u.appendChild(o);
  const p = (i = !1) => {
    const g = n.value.toLowerCase();
    let b;
    if (i || g.length < 1 ? b = s.slice(0, 8) : b = s.filter((t) => t.text.toLowerCase().includes(g)).slice(0, 8), b.length === 0) {
      o.style.display = "none";
      return;
    }
    const y = b.map((t) => ({
      label: t.text,
      state: "default",
      value: t.value,
      selected: !1
    })), m = `ubits-autocomplete-list-${u.id}`;
    o.id = m, o.innerHTML = "";
    try {
      ot({
        containerId: m,
        items: y,
        size: r,
        maxHeight: "200px",
        onSelectionChange: (t, h) => {
          t && t.value && (n.value = t.label, o.style.display = "none", e && (e.style.display = "block"), c && c(t.value));
        }
      }), g.length > 0 && o.querySelectorAll(".ubits-list-item").forEach((h) => {
        const d = h.textContent || "";
        if (d.toLowerCase().includes(g)) {
          const T = new RegExp(`(${g})`, "gi"), S = d.replace(T, "<strong>$1</strong>");
          h.innerHTML = S;
        }
      });
    } catch (t) {
      console.warn("Using renderList fallback for autocomplete:", t);
      const h = Z({
        items: y,
        size: r,
        maxHeight: "200px"
      });
      o.innerHTML = h, g.length > 0 && o.querySelectorAll(".ubits-list-item").forEach((S) => {
        const k = S.textContent || "";
        if (k.toLowerCase().includes(g)) {
          const w = new RegExp(`(${g})`, "gi"), q = k.replace(w, "<strong>$1</strong>");
          S.innerHTML = q;
        }
      }), o.querySelectorAll(".ubits-list-item").forEach((T, S) => {
        const k = y[S];
        k && k.state !== "disabled" && T.addEventListener("click", () => {
          n.value = k.label, o.style.display = "none", e && (e.style.display = "block"), c && c(k.value || "");
        });
      });
    }
    o.style.display = "block";
  };
  n.addEventListener("focus", () => {
    p(!0);
  }), n.addEventListener("input", () => {
    p(!1);
  }), n.addEventListener("blur", () => {
    setTimeout(() => o.style.display = "none", 150);
  });
}
function gt(u, n, s, c, a, r, e = "md") {
  n.style.cursor = "pointer";
  const o = e === "xs" ? "xs" : e === "sm" ? "sm" : e === "md" ? "md" : "lg", p = document.createElement("div");
  p.className = "ubits-select-list-container", p.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `, u.appendChild(p);
  const i = 50;
  let g = 0, b = [], y = !1;
  const m = (t = 0) => {
    y || (y = !0, setTimeout(() => {
      const h = t * i, d = Math.min(h + i, s.length), S = s.slice(h, d).map((w) => ({
        label: w.text,
        state: c === w.value ? "active" : "default",
        value: w.value,
        selected: c === w.value
      }));
      t === 0 ? b = S : b = [...b, ...S];
      const k = `ubits-select-list-${u.id}`;
      p.id = k, p.innerHTML = "";
      try {
        ot({
          containerId: k,
          items: b,
          size: o,
          maxHeight: "200px",
          onSelectionChange: (w, q) => {
            w && w.value && (n.value = w.label, p.style.display = "none", r && r(w.value));
          }
        });
      } catch (w) {
        console.warn("Using renderList fallback for select:", w);
        const q = Z({
          items: b,
          size: o,
          maxHeight: "200px"
        });
        p.innerHTML = q, p.querySelectorAll(".ubits-list-item").forEach((R, B) => {
          const D = b[B];
          D && D.state !== "disabled" && R.addEventListener("click", () => {
            n.value = D.label, p.style.display = "none", r && r(D.value || "");
          });
        });
      }
      if (d < s.length) {
        const w = p.querySelector(".ubits-list");
        if (w) {
          const q = new IntersectionObserver((R) => {
            R[0].isIntersecting && !y && d < s.length && (g++, m(g));
          }, { root: w, rootMargin: "50px" }), I = p.querySelector(".ubits-list-item:last-child");
          I && q.observe(I);
        }
      }
      y = !1;
    }, 150));
  };
  n.addEventListener("click", () => {
    p.style.display === "block" ? p.style.display = "none" : (g = 0, b = [], m(0), p.style.display = "block");
  }), document.addEventListener("click", (t) => {
    u.contains(t.target) || (p.style.display = "none");
  });
}
function ht(u, n, s) {
  let c = null, a = null;
  const r = (i) => {
    const g = String(i.getDate()).padStart(2, "0"), b = String(i.getMonth() + 1).padStart(2, "0"), y = i.getFullYear();
    return `${g}/${b}/${y}`;
  }, e = (i) => {
    if (!i)
      return null;
    const [g, b, y] = i.split("/");
    return !g || !b || !y ? null : new Date(parseInt(y), parseInt(b) - 1, parseInt(g));
  }, o = async () => {
    if (n.type === "date" && (n.type = "text", n.setAttribute("readonly", "readonly")), a && a.style.display !== "none") {
      a.style.display = "none";
      return;
    }
    if (a || (a = document.createElement("div"), a.className = "ubits-calendar-picker-container", a.style.cssText = "position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px; display: none;", u.style.position = "relative", u.appendChild(a)), c) {
      a.style.display = "block";
      return;
    }
    try {
      const i = await import("./CalendarProvider-Cxg4VLQZ.js"), { createCalendar: g } = i, b = n.value, y = e(b) || /* @__PURE__ */ new Date();
      c = g({
        mode: "single",
        selectedDate: e(b),
        initialDate: y,
        onDateSelect: (m) => {
          const t = r(m);
          n.value = t, a && (a.style.display = "none"), s && s(t);
        }
      }), a.appendChild(c.element), a.style.display = "block";
    } catch (i) {
      console.error("❌ [Calendar Picker] Error cargando Calendar UBITS:", i), a && (a.innerHTML = '<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>', a.style.display = "block");
    }
  };
  n.addEventListener("click", (i) => {
    i.preventDefault(), i.stopPropagation(), o();
  }), n.addEventListener("focus", (i) => {
    i.preventDefault(), i.stopPropagation(), o();
  });
  const p = u.querySelector(".ubits-input-icon-right");
  p && p.addEventListener("click", (i) => {
    i.preventDefault(), i.stopPropagation(), o();
  }), document.addEventListener("click", (i) => {
    a && !u.contains(i.target) && (a.style.display = "none");
  }), document.addEventListener("keydown", (i) => {
    i.key === "Escape" && a && (a.style.display = "none");
  });
}
function yt(u, n, s) {
  const c = () => {
    Y(n, u.value.length, s), u.value.length > s && (u.value = u.value.substring(0, s), Y(n, s, s));
  };
  u.addEventListener("input", c), Y(n, u.value.length, s);
}
function Y(u, n, s) {
  u.textContent = `${n}/${s}`, n >= s ? u.classList.add("ubits-input-counter--limit") : u.classList.remove("ubits-input-counter--limit");
}
function vt(u, n) {
  const s = `ubits-rich-text-image-modal-${Date.now()}`, c = `${s}-input`, a = {
    title: "Insertar imagen",
    size: "md",
    bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL de la imagen:
        </label>
        <div style="display: flex; gap: var(--ubits-spacing-sm, 8px); align-items: flex-start;">
          <input 
            type="text" 
            id="${c}"
            class="ubits-input ubits-input--md"
            placeholder="https://ejemplo.com/imagen.jpg"
            style="flex: 1;"
          />
          <button 
            type="button"
            id="${s}-insert-btn"
            class="ubits-button ubits-button--primary ubits-button--md"
          >
            <span>Insertar imagen</span>
          </button>
        </div>
      </div>
    `,
    footerButtons: {
      secondary: {
        label: "Cancelar",
        onClick: () => {
        }
      }
    },
    onClose: () => {
      const i = document.getElementById(s)?.closest(".ubits-modal-overlay");
      i && setTimeout(() => i.remove(), 300);
    },
    closeOnOverlayClick: !0,
    open: !0
  }, r = J(a), e = r.element;
  e.id = s;
  const o = document.getElementById(`${s}-insert-btn`), p = document.getElementById(c);
  if (o && p) {
    const i = () => {
      const b = p.value.trim();
      if (b) {
        const y = document.createElement("img");
        y.src = b, y.style.maxWidth = "100%", y.style.height = "auto", y.style.display = "block", y.style.margin = "var(--ubits-spacing-sm, 8px) 0";
        const m = window.getSelection();
        m && m.rangeCount > 0 ? m.getRangeAt(0).insertNode(y) : u.appendChild(y), n(), r.close();
      }
    };
    o.addEventListener("click", i), p.addEventListener("keydown", (b) => {
      b.key === "Enter" && (b.preventDefault(), i());
    });
    const g = e.querySelector(".ubits-button--secondary");
    g && g.addEventListener("click", () => {
      r.close();
    });
  }
}
function xt(u, n) {
  const s = `ubits-rich-text-table-modal-${Date.now()}`, c = `${s}-rows`, a = `${s}-cols`, r = {
    title: "Insertar tabla",
    size: "sm",
    bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--ubits-spacing-lg, 16px);">
          <div>
            <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
              Filas:
            </label>
            <input 
              type="number" 
              id="${c}"
              class="ubits-input ubits-input--md"
              value="2"
              min="1"
              max="20"
              style="width: 100%;"
            />
          </div>
          <div>
            <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
              Columnas:
            </label>
            <input 
              type="number" 
              id="${a}"
              class="ubits-input ubits-input--md"
              value="2"
              min="1"
              max="20"
              style="width: 100%;"
            />
          </div>
        </div>
      </div>
    `,
    footerButtons: {
      secondary: {
        label: "Cancelar",
        onClick: () => {
        }
      },
      primary: {
        label: "Insertar",
        onClick: () => {
        }
      }
    },
    onClose: () => {
      const y = document.getElementById(s)?.closest(".ubits-modal-overlay");
      y && setTimeout(() => y.remove(), 300);
    },
    closeOnOverlayClick: !0,
    open: !0
  }, e = J(r), o = e.element;
  o.id = s;
  const p = o.querySelector(".ubits-button--primary"), i = document.getElementById(c), g = document.getElementById(a);
  p && i && g && p.addEventListener("click", () => {
    const y = parseInt(i.value) || 2, m = parseInt(g.value) || 2;
    if (y > 0 && m > 0) {
      const t = document.createElement("table");
      t.style.borderCollapse = "collapse", t.style.width = "100%", t.style.margin = "var(--ubits-spacing-sm, 8px) 0", t.style.border = "1px solid var(--ubits-border-1)";
      for (let d = 0; d < y; d++) {
        const T = document.createElement("tr");
        for (let S = 0; S < m; S++) {
          const k = document.createElement("td");
          k.style.border = "1px solid var(--ubits-border-1)", k.style.padding = "var(--ubits-spacing-sm, 8px)", k.style.minWidth = "50px", k.textContent = " ", T.appendChild(k);
        }
        t.appendChild(T);
      }
      const h = window.getSelection();
      h && h.rangeCount > 0 ? h.getRangeAt(0).insertNode(t) : u.appendChild(t), n(), e.close();
    }
  });
  const b = o.querySelector(".ubits-button--secondary");
  b && b.addEventListener("click", () => {
    e.close();
  });
}
function $t(u, n) {
  const s = `ubits-rich-text-link-modal-${Date.now()}`, c = `${s}-input`, a = {
    title: "Insertar enlace",
    size: "md",
    bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL del enlace:
        </label>
        <input 
          type="text" 
          id="${c}"
          class="ubits-input ubits-input--md"
          placeholder="https://ejemplo.com"
          style="width: 100%; box-sizing: border-box;"
        />
      </div>
    `,
    footerButtons: {
      secondary: {
        label: "Cancelar",
        onClick: () => {
        }
      },
      primary: {
        label: "Insertar",
        onClick: () => {
        }
      }
    },
    onClose: () => {
      const g = document.getElementById(s)?.closest(".ubits-modal-overlay");
      g && setTimeout(() => g.remove(), 300);
    },
    closeOnOverlayClick: !0,
    open: !0
  }, r = J(a), e = r.element;
  e.id = s;
  const o = e.querySelector(".ubits-button--primary"), p = document.getElementById(c);
  o && p && o.addEventListener("click", () => {
    const g = p.value.trim();
    g && (document.execCommand("createLink", !1, g), n(), r.close());
  });
  const i = e.querySelector(".ubits-button--secondary");
  i && i.addEventListener("click", () => {
    r.close();
  }), p && p.addEventListener("keydown", (g) => {
    g.key === "Enter" && (g.preventDefault(), o && o.click());
  });
}
function wt(u, n, s) {
  const c = u.querySelector(".ubits-input-rich-text-toolbar");
  if (!c)
    return;
  const a = n.closest(".ubits-input-rich-text-wrapper");
  if (!a)
    return;
  const r = n.placeholder || "", e = document.createElement("div");
  e.className = n.className;
  const o = window.getComputedStyle(n);
  e.style.cssText = n.style.cssText, e.style.position = "relative", e.style.padding = o.padding || "12px 12px", e.style.margin = "0", e.style.outline = "none", e.style.overflow = "auto", e.style.minHeight = o.minHeight || "80px", e.style.resize = "vertical", e.contentEditable = "true", e.setAttribute("data-placeholder", r);
  let p = u.closest(".ubits-input-wrapper");
  p || (p = u.parentElement?.closest(".ubits-input-wrapper")), p || (p = document.getElementById(u.id)?.parentElement?.closest(".ubits-input-wrapper")), console.log("[Rich Text Placeholder] ===== DEBUG ALINEAMIENTO ====="), console.log("[Rich Text Placeholder] inputWrapper:", p), console.log("[Rich Text Placeholder] container:", u), console.log("[Rich Text Placeholder] container.parentElement:", u.parentElement), console.log("[Rich Text Placeholder] richTextWrapper:", a), console.log("[Rich Text Placeholder] richTextWrapper.parentElement:", a?.parentElement);
  let i = null;
  if (p && (i = p.querySelector(".ubits-input-icon-left")), !i && u.parentElement && (i = u.parentElement.querySelector(".ubits-input-icon-left")), !i && a?.parentElement && (i = a.parentElement.querySelector(".ubits-input-icon-left")), !i) {
    const m = document.querySelectorAll(".ubits-input-icon-left");
    for (const t of Array.from(m)) {
      const h = t, d = u.getBoundingClientRect(), T = h.getBoundingClientRect();
      if (Math.abs(T.top - d.top) < 100) {
        i = h;
        break;
      }
    }
  }
  const g = i !== null;
  if (console.log("[Rich Text Placeholder] leftIconElement:", i), console.log("[Rich Text Placeholder] hasLeftIcon:", g), g && i) {
    const m = i.getBoundingClientRect(), t = window.getComputedStyle(i), h = t.left, d = t.top, T = t.transform;
    console.log("[Rich Text Placeholder] Icono encontrado:", i), console.log("[Rich Text Placeholder] Icono rect:", m), console.log("[Rich Text Placeholder] Icono left (computed):", h), console.log("[Rich Text Placeholder] Icono top (computed):", d), console.log("[Rich Text Placeholder] Icono transform:", T);
    const S = o.paddingLeft || "12px", k = o.paddingTop || "12px", w = o.paddingRight || "12px", q = o.paddingBottom || "12px";
    console.log("[Rich Text Placeholder] Textarea padding:", {
      left: S,
      top: k,
      right: w,
      bottom: q
    });
    const I = e.getBoundingClientRect();
    console.log("[Rich Text Placeholder] EditableDiv rect:", I);
    const R = m.left - I.left, B = m.top - I.top, D = m.bottom - I.top;
    console.log("[Rich Text Placeholder] Icono posición relativa:", {
      left: R,
      top: B,
      bottom: D
    });
    const V = o.lineHeight || "1.5", v = o.fontSize || "14px";
    console.log("[Rich Text Placeholder] Texto:", {
      fontSize: v,
      lineHeight: V
    }), e.setAttribute("data-has-left-icon", "true"), e.style.setProperty("--placeholder-left", S), e.style.setProperty("--placeholder-top", k), console.log("[Rich Text Placeholder] Variables CSS establecidas:", {
      "--placeholder-left": S,
      "--placeholder-top": k
    }), requestAnimationFrame(() => {
      e.querySelector("::before") || window.getComputedStyle(e, "::before");
      const j = window.getComputedStyle(e, "::before");
      console.log("[Rich Text Placeholder] Después de render:", {
        placeholderLeft: j.left,
        placeholderTop: j.top,
        placeholderWidth: j.width,
        placeholderHeight: j.height
      });
    });
  } else {
    const m = o.paddingTop || "12px", t = o.paddingLeft || "12px";
    console.log("[Rich Text Placeholder] Sin icono, usando valores por defecto:", {
      paddingTop: m,
      paddingLeft: t
    }), e.style.setProperty("--placeholder-top", m), e.style.setProperty("--placeholder-left", t);
  }
  console.log("[Rich Text Placeholder] ===== FIN DEBUG ====="), n.value && n.value.trim() ? e.innerHTML = n.value : e.classList.add("ubits-rich-text-placeholder"), n.style.display = "none", n.setAttribute("data-rich-text-editor", "true"), a.insertBefore(e, n), g && i && requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      let m = i;
      if (p && (m = p.querySelector(".ubits-input-icon-left") || i), !m && u.parentElement && (m = u.parentElement.querySelector(".ubits-input-icon-left") || i), m) {
        const t = m.getBoundingClientRect(), h = e.getBoundingClientRect();
        if (console.log("[Rich Text Placeholder] Después de insertar en DOM:"), console.log("[Rich Text Placeholder] Icono rect:", t), console.log("[Rich Text Placeholder] EditableDiv rect:", h), h.width > 0 && h.height > 0) {
          const d = t.top - h.top, T = t.bottom - h.top, S = t.left - h.left;
          console.log("[Rich Text Placeholder] Posiciones relativas:", {
            iconTop: d,
            iconBottom: T,
            iconLeft: S,
            iconCenterY: d + t.height / 2
          });
          const k = d + t.height / 2, w = parseFloat(o.fontSize || "16px"), q = o.lineHeight;
          let I;
          q === "normal" ? I = w * 1.2 : q.includes("px") ? I = parseFloat(q) : I = w * parseFloat(q);
          const R = parseFloat(o.paddingTop || "12px"), B = R + w * 0.75, D = k - B, V = R + D;
          console.log("[Rich Text Placeholder] Cálculos de alineamiento:", {
            iconCenterY: k,
            fontSize: w,
            lineHeight: I,
            paddingTop: R,
            textBaselineY: B,
            offset: D,
            adjustedTop: V
          });
          const v = Math.max(0, V), E = (e.style.padding || o.padding || "12px 12px").split(" "), P = E[1] || E[0] || "12px", $ = E[2] || E[0] || "12px", z = E[3] || E[1] || E[0] || "40px";
          e.style.padding = `${v}px ${P} ${$} ${z}`, e.style.setProperty("--placeholder-top", `${v}px`), e.style.setProperty("--placeholder-left", z), console.log("[Rich Text Placeholder] Variables CSS finales:", {
            "--placeholder-top": `${v}px`,
            "--placeholder-left": z,
            "editableDiv padding actualizado": `${v}px ${P} ${$} ${z}`
          });
        } else
          console.warn("[Rich Text Placeholder] EditableDiv aún no tiene dimensiones válidas");
      }
    });
  });
  const b = (m) => {
    const t = e.innerText || "";
    n.value = t, s && s(t, m), t.trim() ? e.classList.remove("ubits-rich-text-placeholder") : e.classList.add("ubits-rich-text-placeholder");
  };
  e.addEventListener("input", b), e.addEventListener("blur", b), e.addEventListener("focus", () => {
    e.classList.contains("ubits-rich-text-placeholder") && (e.textContent = "", e.classList.remove("ubits-rich-text-placeholder"));
    const m = a.querySelector(".ubits-input-rich-text-toolbar");
    if (m) {
      const t = window.getComputedStyle(m).borderBottom;
      window.getComputedStyle(m).borderTop, t && t !== "none" && t !== "0px" && (console.warn("[Rich Text] ⚠️ Línea divisoria detectada en focus, removiendo..."), m.style.borderBottom = "none", m.style.borderTop = "none");
    }
  }), a.addEventListener("mouseenter", () => {
    const m = a.querySelector(".ubits-input-rich-text-toolbar");
    if (m) {
      const t = window.getComputedStyle(m).borderBottom;
      t && t !== "none" && t !== "0px" && (console.warn("[Rich Text] ⚠️ Línea divisoria detectada en hover, removiendo..."), m.style.borderBottom = "none", m.style.borderTop = "none");
    }
  }), c.querySelectorAll(".ubits-rich-text-btn").forEach((m) => {
    m.addEventListener("click", (t) => {
      t.preventDefault(), e.focus();
      const h = m.getAttribute("data-command");
      if (h) {
        if (h === "insertImage")
          vt(e, b);
        else if (h === "insertTable")
          xt(e, b);
        else if (h === "createLink")
          $t(e, b);
        else if (h === "code") {
          const d = window.getSelection();
          if (d && d.rangeCount > 0) {
            const T = d.getRangeAt(0), S = document.createElement("code");
            S.style.background = "var(--ubits-bg-2)", S.style.padding = "var(--ubits-spacing-xs, 2px) var(--ubits-spacing-sm, 4px)", S.style.borderRadius = "var(--ubits-border-radius-sm, 4px)", S.style.fontFamily = "var(--font-mono, monospace)";
            try {
              T.surroundContents(S);
            } catch {
              S.textContent = T.toString(), T.deleteContents(), T.insertNode(S);
            }
          }
        } else
          document.execCommand(h, !1, void 0);
        b();
      }
    });
  });
}
function St(u, n) {
  let s = u.closest(".ubits-input-wrapper");
  s || (s = u.parentElement?.closest(".ubits-input-wrapper")), s || (s = document.getElementById(u.id)?.parentElement?.closest(".ubits-input-wrapper"));
  let c = null;
  if (s && (c = s.querySelector(".ubits-input-icon-left")), !c && u.parentElement && (c = u.parentElement.querySelector(".ubits-input-icon-left")), !c) {
    const r = document.querySelectorAll(".ubits-input-icon-left");
    for (const e of Array.from(r)) {
      const o = e, p = u.getBoundingClientRect(), i = o.getBoundingClientRect();
      if (Math.abs(i.top - p.top) < 100) {
        c = o;
        break;
      }
    }
  }
  !(c !== null) || !c || requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const r = s?.querySelector(".ubits-input-icon-left") || c;
      if (r && n) {
        const e = r.getBoundingClientRect(), o = n.getBoundingClientRect();
        if (o.width > 0 && o.height > 0) {
          const p = e.top - o.top;
          e.bottom - o.top, e.left - o.left;
          const i = p + e.height / 2, g = window.getComputedStyle(n), b = parseFloat(g.fontSize || "16px"), y = parseFloat(g.paddingTop || "12px"), m = y + b * 0.75, t = i - m, h = y + t, d = Math.max(0, h), S = (g.padding || "12px 12px").split(" "), k = S[1] || S[0] || "12px", w = S[2] || S[0] || "12px", q = S[3] || S[1] || S[0] || "40px";
          n.style.padding = `${d}px ${k} ${w} ${q}`;
        }
      }
    });
  });
}
function It(u) {
  const {
    containerId: n,
    label: s = "",
    helperText: c = "",
    size: a = "md",
    state: r = "default",
    orientation: e = "horizontal",
    mode: o = "single",
    min: p = 0,
    max: i = 100,
    step: g = 1,
    value: b = 50,
    values: y = [25, 75],
    showInputs: m = !1,
    showLabel: t = !0,
    showHelper: h = !1,
    showMarks: d = !1,
    marks: T = [],
    showRangeGuide: S = !1,
    className: k = "",
    attributes: w = {}
  } = u, q = m || S, I = r === "disabled", R = e === "vertical", B = o === "range", D = B ? y[0] : b;
  B && y[1];
  const V = ["ubits-slider"];
  R && V.push("ubits-slider--vertical"), a && V.push(`ubits-slider--${a}`), I && V.push("ubits-slider--disabled"), k && V.push(k);
  let v = `<div class="${V.join(" ")}" id="${n}">`;
  if (t && s && (v += `<label class="ubits-slider-label">${s}</label>`), v += '<div class="ubits-slider-main-wrapper">', q && B && (v += `<div class="ubits-slider-input" id="${n}-input-min"></div>`), v += '<div class="ubits-slider-wrapper">', v += '<div class="ubits-slider-track-container" style="position: relative; flex: 1;">', v += '<div class="ubits-slider-track">', B) {
    const E = (y[0] - p) / (i - p) * 100, $ = (y[1] - p) / (i - p) * 100 - E;
    R ? v += `<div class="ubits-slider-track-range" style="bottom: ${E}%; height: ${$}%;"></div>` : v += `<div class="ubits-slider-track-range" style="left: ${E}%; width: ${$}%;"></div>`;
  } else {
    const E = (D - p) / (i - p) * 100;
    R ? v += `<div class="ubits-slider-track-fill" style="height: ${E}%; bottom: 0;"></div>` : v += `<div class="ubits-slider-track-fill" style="width: ${E}%;"></div>`;
  }
  if (d && T.length > 0 && (v += '<div class="ubits-slider-marks">', T.forEach((E) => {
    const P = (E - p) / (i - p) * 100;
    R ? v += `<div class="ubits-slider-mark" style="top: ${100 - P}%; left: 50%;"></div>` : v += `<div class="ubits-slider-mark" style="left: ${P}%; top: 50%;"></div>`;
  }), v += "</div>"), B) {
    const E = (y[0] - p) / (i - p) * 100, P = (y[1] - p) / (i - p) * 100;
    R ? (v += `<div class="ubits-slider-thumb ubits-slider-thumb--min" style="top: ${100 - E}%; left: 50%;" data-value="${y[0]}" tabindex="0" ${I ? "disabled" : ""}></div>`, v += `<div class="ubits-slider-thumb ubits-slider-thumb--max" style="top: ${100 - P}%; left: 50%;" data-value="${y[1]}" tabindex="0" ${I ? "disabled" : ""}></div>`) : (v += `<div class="ubits-slider-thumb ubits-slider-thumb--min" style="left: ${E}%; top: 50%;" data-value="${y[0]}" tabindex="0" ${I ? "disabled" : ""}></div>`, v += `<div class="ubits-slider-thumb ubits-slider-thumb--max" style="left: ${P}%; top: 50%;" data-value="${y[1]}" tabindex="0" ${I ? "disabled" : ""}></div>`);
  } else {
    const E = (D - p) / (i - p) * 100;
    R ? v += `<div class="ubits-slider-thumb" style="top: ${100 - E}%; left: 50%;" data-value="${D}" tabindex="0" ${I ? "disabled" : ""}></div>` : v += `<div class="ubits-slider-thumb" style="left: ${E}%; top: 50%;" data-value="${D}" tabindex="0" ${I ? "disabled" : ""}></div>`;
  }
  if (v += "</div>", v += "</div>", v += "</div>", q && (B ? v += `<div class="ubits-slider-input" id="${n}-input-max"></div>` : v += `<div class="ubits-slider-input" id="${n}-input-value"></div>`), v += "</div>", !R) {
    if (v += '<div class="ubits-slider-range-guide-wrapper">', v += `<div class="ubits-slider-range-guide" id="${n}-range-guide">`, S) {
      const E = i - p;
      let $ = Math.ceil(E / 10);
      const z = Math.pow(10, Math.floor(Math.log10($))), M = $ / z;
      let H = z;
      M <= 1 ? H = z : M <= 2 ? H = 2 * z : M <= 5 ? H = 5 * z : H = 10 * z;
      let _ = p;
      for (; _ <= i; ) {
        const G = (_ - p) / (i - p) * 100;
        v += `<span class="ubits-slider-range-guide-value" style="left: ${G}%">${Math.round(_)}</span>`, _ += H;
      }
    } else {
      v += `<span class="ubits-slider-range-guide-value ubits-slider-range-guide-value--bold" style="left: 0%">${p}</span>`;
      const E = B ? y[1] : b;
      v += `<span class="ubits-slider-range-guide-value ubits-slider-range-guide-value--bold" id="${n}-range-guide-current" style="left: 100%">${E}</span>`;
    }
    v += "</div>", v += "</div>";
  }
  h && c && (v += '<div class="ubits-input-helper">', v += `<span>${c}</span>`, v += "</div>"), v += "</div>";
  const j = Object.entries(w).map(([E, P]) => `${E}="${P}"`).join(" ");
  return j ? `<div ${j}>${v}</div>` : v;
}
function nt(u) {
  const {
    containerId: n,
    onChange: s,
    onRangeChange: c,
    min: a = 0,
    max: r = 100,
    step: e = 1,
    mode: o = "single",
    value: p = 50,
    values: i = [25, 75],
    orientation: g = "horizontal",
    showInputs: b = !1,
    state: y = "default",
    size: m = "md",
    showRangeGuide: t = !1
  } = u, h = b || t;
  if (!n)
    return console.error("UBITS Slider: containerId es requerido"), null;
  const d = document.getElementById(n);
  if (!d)
    return console.error(`UBITS Slider: No se encontró el contenedor con ID "${n}"`), null;
  const T = It(u);
  d.innerHTML = T;
  const S = d.querySelector(`#${n}`) || d.querySelector(".ubits-slider");
  if (!S)
    return console.error("UBITS Slider: No se encontró el elemento slider"), null;
  const k = d.querySelector(".ubits-slider-track"), w = d.querySelectorAll(".ubits-slider-thumb"), q = d.querySelector(`#${n}-value-display`), I = o === "range", R = g === "vertical", B = y === "disabled";
  let D = null, V = null, v = null;
  const j = () => {
    if (h) {
      if (I) {
        const f = `${n}-input-min`;
        let l = S.querySelector(`#${f}`);
        if (l || (l = d.querySelector(`#${f}`)), l || (l = document.getElementById(f)), l) {
          l.style.width = "100px", l.style.minWidth = "80px", l.style.maxWidth = "100px", l.style.flexShrink = "0";
          try {
            D = X({
              containerId: f,
              type: "number",
              size: m,
              state: B ? "disabled" : "default",
              value: i[0].toString(),
              showLabel: !1,
              showHelper: !1
            });
            const C = l.querySelector("input");
            if (C && (C.setAttribute("data-slider-input", "min"), C.setAttribute("min", a.toString()), C.setAttribute("max", r.toString()), C.setAttribute("step", e.toString())), D) {
              const A = l.querySelector('div[style*="position: relative"]');
              A && (A.style.width = "100%", A.style.maxWidth = "100%");
            }
          } catch (C) {
            console.warn("Error creating min input:", C);
          }
        } else
          console.error("UBITS Slider: No se encontró el contenedor del input min:", f);
        const x = `${n}-input-max`;
        let L = S.querySelector(`#${x}`);
        if (L || (L = d.querySelector(`#${x}`)), L || (L = document.getElementById(x)), L) {
          L.style.width = "100px", L.style.minWidth = "80px", L.style.maxWidth = "100px", L.style.flexShrink = "0";
          try {
            V = X({
              containerId: x,
              type: "number",
              size: m,
              state: B ? "disabled" : "default",
              value: i[1].toString(),
              showLabel: !1,
              showHelper: !1
            });
            const C = L.querySelector("input");
            if (C && (C.setAttribute("data-slider-input", "max"), C.setAttribute("min", a.toString()), C.setAttribute("max", r.toString()), C.setAttribute("step", e.toString())), V) {
              const A = L.querySelector('div[style*="position: relative"]');
              A && (A.style.width = "100%", A.style.maxWidth = "100%");
            }
          } catch (C) {
            console.warn("Error creating max input:", C);
          }
        } else
          console.error("UBITS Slider: No se encontró el contenedor del input max:", x);
      } else {
        const f = `${n}-input-value`;
        let l = S.querySelector(`#${f}`);
        if (l || (l = d.querySelector(`#${f}`)), l || (l = document.getElementById(f)), l) {
          l.style.width = "100px", l.style.minWidth = "80px", l.style.maxWidth = "100px", l.style.flexShrink = "0";
          try {
            v = X({
              containerId: f,
              type: "number",
              size: m,
              state: B ? "disabled" : "default",
              value: p.toString(),
              showLabel: !1,
              showHelper: !1
            });
            const x = l.querySelector("input");
            if (x && (x.setAttribute("data-slider-input", "value"), x.setAttribute("min", a.toString()), x.setAttribute("max", r.toString()), x.setAttribute("step", e.toString())), v) {
              const L = l.querySelector('div[style*="position: relative"]');
              L && (L.style.width = "100%", L.style.maxWidth = "100%");
            }
          } catch (x) {
            console.warn("Error creating value input:", x);
          }
        } else
          console.error("UBITS Slider: No se encontró el contenedor del input value:", f);
      }
      P = E(), ct();
    }
  }, E = () => d.querySelectorAll("input[data-slider-input]");
  let P = E();
  if (h && requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      j();
    });
  }), !S || !k || w.length === 0)
    return console.error("UBITS Slider: No se pudo crear el elemento slider"), null;
  let $ = I ? [...i] : p, z = !1, M = null;
  const H = (f, l) => {
    const x = k.getBoundingClientRect();
    let L;
    R ? L = 1 - (l - x.top) / x.height : L = (f - x.left) / x.width, L = Math.max(0, Math.min(1, L));
    const C = a + L * (r - a), A = Math.round(C / e) * e;
    return Math.max(a, Math.min(r, A));
  }, _ = (f, l) => {
    const x = (l - a) / (r - a) * 100;
    R ? (f.style.top = `${100 - x}%`, f.style.left = "50%") : (f.style.left = `${x}%`, f.style.top = "50%"), f.setAttribute("data-value", l.toString());
  }, G = () => {
    const f = d.querySelector(".ubits-slider-track-fill"), l = d.querySelector(".ubits-slider-track-range");
    if (I) {
      if (l) {
        const x = $[0], L = $[1], C = (x - a) / (r - a) * 100, A = (L - a) / (r - a) * 100;
        if (R) {
          const N = k.getBoundingClientRect(), W = d.querySelectorAll(".ubits-slider-thumb");
          if (W.length >= 2 && N.height > 0) {
            const F = Array.from(W).find((O) => O.classList.contains("ubits-slider-thumb--min")), tt = Array.from(W).find((O) => O.classList.contains("ubits-slider-thumb--max"));
            if (F && tt) {
              const O = F.getBoundingClientRect();
              tt.getBoundingClientRect();
              const et = O.height / N.height * 100, it = Math.max(0, C - et / 2), dt = Math.max(0, A - et / 2) - it;
              l.style.bottom = `${it}%`, l.style.height = `${dt}%`;
            } else
              l.style.bottom = `${C}%`, l.style.height = `${A - C}%`;
          } else
            l.style.bottom = `${C}%`, l.style.height = `${A - C}%`;
        } else {
          const N = A - C;
          l.style.left = `${C}%`, l.style.width = `${N}%`;
        }
      }
    } else if (f) {
      const x = ($ - a) / (r - a) * 100;
      if (R) {
        const L = k.getBoundingClientRect(), C = d.querySelector(".ubits-slider-thumb");
        if (C && L.height > 0) {
          const N = C.getBoundingClientRect().height / L.height * 100, W = Math.max(0, x - N / 2);
          f.style.height = `${W}%`, f.style.bottom = "0";
        } else
          f.style.height = `${x}%`, f.style.bottom = "0";
      } else
        f.style.width = `${x}%`;
    }
  }, lt = () => {
    if (P = E(), P.forEach((l) => {
      const x = l.getAttribute("data-slider-input");
      x === "value" && !I ? l.value = $.toString() : x === "min" && I ? l.value = $[0].toString() : x === "max" && I && (l.value = $[1].toString());
    }), v && !I && v.setValue($.toString()), D && I && D.setValue($[0].toString()), V && I && V.setValue($[1].toString()), q)
      if (I) {
        const [l, x] = $;
        q.textContent = `${l} - ${x}`;
      } else
        q.textContent = $.toString();
    const f = d.querySelector(`#${n}-range-guide-current`);
    if (f && !t)
      if (I) {
        const l = $[1];
        f.textContent = l.toString();
      } else
        f.textContent = $.toString();
  }, U = () => {
    if (I) {
      const [f, l] = $, x = d.querySelector(".ubits-slider-thumb--min"), L = d.querySelector(".ubits-slider-thumb--max");
      x && _(x, f), L && _(L, l);
    } else {
      const f = w[0];
      f && _(f, $);
    }
    G(), lt();
  }, at = (f, l) => {
    B || (f.preventDefault(), z = !0, M = l, l.style.cursor = "grabbing");
  }, K = (f) => {
    if (!z || !M || B) return;
    f.preventDefault();
    const l = H(f.clientX, f.clientY);
    if (I) {
      const [x, L] = $;
      if (M.classList.contains("ubits-slider-thumb--min"))
        $ = [Math.min(l, L - e), L];
      else {
        const A = Math.max(l, x + e);
        $ = [x, A];
      }
      c && c($, f);
    } else
      $ = l, s && s(l, f);
    U();
  }, Q = () => {
    M && (M.style.cursor = "grab"), z = !1, M = null;
  }, rt = (f) => {
    if (B || z) return;
    const l = H(f.clientX, f.clientY);
    if (I) {
      const [x, L] = $, C = Math.abs(l - x), A = Math.abs(l - L);
      if (C < A)
        $ = [Math.min(l, L - e), L], c && c($, f);
      else {
        const N = Math.max(l, x + e);
        $ = [x, N], c && c($, f);
      }
    } else
      $ = l, s && s(l, f);
    U();
  };
  w.length === 0 ? console.error("UBITS Slider: No se encontraron thumbs para agregar event listeners") : w.forEach((f) => {
    f.addEventListener("mousedown", (l) => at(l, f)), f.addEventListener("touchstart", (l) => {
      B || (l.preventDefault(), z = !0, M = f);
    }, { passive: !1 });
  }), k ? k.addEventListener("click", rt) : console.error("UBITS Slider: No se encontró el track para agregar event listener"), document.addEventListener("mousemove", K), document.addEventListener("mouseup", Q), document.addEventListener("touchmove", (f) => {
    if (!z || !M || B) return;
    f.preventDefault();
    const l = f.touches[0];
    l && K(new MouseEvent("mousemove", {
      clientX: l.clientX,
      clientY: l.clientY
    }));
  }, { passive: !1 }), document.addEventListener("touchend", Q);
  const ct = () => {
    P = E(), P.forEach((f) => {
      const l = f.cloneNode(!0);
      f.parentNode?.replaceChild(l, f), l.addEventListener("input", (x) => {
        if (B) return;
        const L = parseFloat(l.value);
        if (isNaN(L)) return;
        const C = Math.max(a, Math.min(r, L)), A = l.getAttribute("data-slider-input");
        if (I) {
          const [N, W] = $;
          if (A === "min")
            $ = [Math.min(C, W - e), W], c && c($, x);
          else if (A === "max") {
            const F = Math.max(C, N + e);
            $ = [N, F], c && c($, x);
          }
        } else
          $ = C, s && s(C, x);
        U();
      }), l.addEventListener("blur", (x) => {
        const L = parseFloat(l.value);
        if (isNaN(L)) {
          U();
          return;
        }
        const C = Math.max(a, Math.min(r, L)), A = l.getAttribute("data-slider-input");
        if (I) {
          const [N, W] = $;
          if (A === "min")
            $ = [Math.min(C, W - e), W];
          else if (A === "max") {
            const F = Math.max(C, N + e);
            $ = [N, F];
          }
        } else
          $ = C;
        U();
      });
    });
  };
  return w.forEach((f) => {
    f.addEventListener("keydown", (l) => {
      if (B) return;
      let x;
      if (I) {
        const [L, C] = $, A = f.classList.contains("ubits-slider-thumb--min"), N = A ? L : C;
        switch (l.key) {
          case "ArrowRight":
          case "ArrowUp":
            x = Math.min(N + e, r);
            break;
          case "ArrowLeft":
          case "ArrowDown":
            x = Math.max(N - e, a);
            break;
          case "Home":
            x = A ? a : L;
            break;
          case "End":
            x = A ? C : r;
            break;
          default:
            return;
        }
        A ? $ = [Math.min(x, C - e), C] : $ = [L, Math.max(x, L + e)], c && c($, l);
      } else {
        const L = $;
        switch (l.key) {
          case "ArrowRight":
          case "ArrowUp":
            x = Math.min(L + e, r);
            break;
          case "ArrowLeft":
          case "ArrowDown":
            x = Math.max(L - e, a);
            break;
          case "Home":
            x = a;
            break;
          case "End":
            x = r;
            break;
          default:
            return;
        }
        $ = x, s && s(x, l);
      }
      l.preventDefault(), U();
    });
  }), U(), {
    element: S,
    getValue: () => $,
    setValue: (f) => {
      if (I && Array.isArray(f)) {
        const [l, x] = f;
        l >= a && l <= r && x >= a && x <= r && l <= x && ($ = [l, x], U());
      } else !I && typeof f == "number" && f >= a && f <= r && ($ = f, U());
    },
    disable: () => {
      S.classList.add("ubits-slider--disabled"), w.forEach((f) => {
        f.classList.add("ubits-slider-thumb--disabled"), f.setAttribute("disabled", "");
      }), P.forEach((f) => {
        f.disabled = !0;
      }), D && D.disable(), V && V.disable(), v && v.disable();
    },
    enable: () => {
      S.classList.remove("ubits-slider--disabled"), w.forEach((f) => {
        f.classList.remove("ubits-slider-thumb--disabled"), f.removeAttribute("disabled");
      }), P.forEach((f) => {
        f.disabled = !1;
      }), D && D.enable(), V && V.enable(), v && v.enable();
    },
    setState: (f) => {
      if (f === "disabled") {
        const l = nt({ ...u, state: "disabled" });
        l && l.disable();
      } else {
        const l = nt({ ...u, state: "default" });
        l && l.enable();
      }
    }
  };
}
export {
  Tt as SliderAddon,
  nt as createSlider,
  It as renderSlider
};
