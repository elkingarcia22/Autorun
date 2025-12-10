const k = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
], P = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
function N(i) {
  const s = String(i.getDate()).padStart(2, "0"), n = String(i.getMonth() + 1).padStart(2, "0"), p = i.getFullYear();
  return `${s}/${n}/${p}`;
}
function L(i, s) {
  const n = new Date(i.getFullYear(), i.getMonth(), i.getDate()), p = new Date(s.getFullYear(), s.getMonth(), s.getDate());
  return n.getTime() - p.getTime();
}
function C(i, s) {
  return L(i, s) === 0;
}
function R(i, s, n) {
  const p = L(i, s), u = L(n, i);
  return p >= 0 && u >= 0;
}
function j(i, s) {
  const n = document.createElement("div");
  n.style.cssText = "position: relative; width: 100%;";
  const p = `calendar-list-container-${Date.now()}`, u = `calendar-list-${Date.now()}`, M = `calendar-scrollbar-${Date.now()}`;
  let $ = `
    <div id="${p}" style="position: relative; width: 100%; max-height: 200px; overflow: hidden;">
      <div id="${u}" class="ubits-list" role="list" style="max-height: 200px; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 0; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
  `;
  i.forEach((r) => {
    const e = r.selected ? "active" : "default", t = [
      "ubits-list-item",
      "ubits-list-item--sm",
      e !== "default" ? `ubits-list-item--${e}` : ""
    ].filter(Boolean).join(" "), a = [];
    e === "active" && a.push('aria-selected="true"'), a.push('tabindex="0"'), a.push(`data-value="${r.value}"`), $ += `
      <div class="${t}" role="listitem" ${a.join(" ")} style="cursor: pointer;">
        ${r.label}
      </div>
    `;
  }), $ += `
      </div>
      <div id="${M}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; max-height: 200px; overflow: hidden; pointer-events: auto; z-index: 10;"></div>
    </div>
    <style>
      /* Ocultar scrollbar nativo completamente - solo mostrar UBITS scrollbar */
      #${u}::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
      #${u}::-webkit-scrollbar-track {
        display: none !important;
        background: transparent !important;
      }
      #${u}::-webkit-scrollbar-thumb {
        display: none !important;
        background: transparent !important;
      }
      /* Firefox */
      #${u} {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
    </style>
  `, n.innerHTML = $;
  const I = async () => {
    const r = document.getElementById(u), e = document.getElementById(M);
    if (!(!r || !e) && !(r.scrollHeight <= r.clientHeight))
      try {
        const t = window.createScrollbarLocal;
        if (typeof t == "function") {
          const g = t(r, e, "vertical");
          if (g) {
            n._scrollbarInstance = g;
            return;
          }
        }
        const { createScrollbar: a } = await import("./index-Ct0Xfho3.mjs").then((g) => g.S), l = a({
          orientation: "vertical",
          targetId: u,
          containerId: M
        });
        l && (n._scrollbarInstance = l);
      } catch (t) {
        console.error("📜 [SCROLLBAR] ❌ Error inicializando scrollbar:", t);
      }
  }, w = () => {
    n.isConnected && requestAnimationFrame(() => {
      I();
    });
  };
  if (n.parentElement)
    w();
  else {
    const r = new MutationObserver(() => {
      n.isConnected && (r.disconnect(), w());
    });
    r.observe(document.body, { childList: !0, subtree: !0 }), setTimeout(() => {
      n.isConnected && (r.disconnect(), w());
    }, 1e3);
  }
  return setTimeout(() => {
    const r = document.getElementById(u);
    r && r.querySelectorAll(".ubits-list-item").forEach((e) => {
      e.addEventListener("click", (t) => {
        t.preventDefault(), t.stopPropagation();
        const a = parseInt(t.currentTarget.dataset.value || "0"), l = n._scrollbarInstance;
        l && l.destroy && l.destroy(), s(a);
      });
    });
  }, 100), n;
}
function A(i) {
  const {
    mode: s = "single",
    selectedDate: n,
    endDate: p,
    minDate: u,
    maxDate: M,
    initialDate: $ = /* @__PURE__ */ new Date(),
    className: I = "",
    style: w = ""
  } = i, r = $, e = r.getFullYear(), t = r.getMonth(), a = new Date(e, t, 1), g = new Date(e, t + 1, 0).getDate(), v = a.getDay(), q = (/* @__PURE__ */ new Date()).toDateString(), F = [
    "ubits-calendar",
    s === "range" ? "ubits-calendar--range" : "ubits-calendar--single",
    I
  ].filter(Boolean).join(" "), d = w ? ` style="${w}"` : "", c = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${k[t]}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__year-input" value="${e}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--next" aria-label="Mes siguiente">
        <i class="far fa-chevron-right"></i>
      </button>
    </div>
  `, S = `
    <div class="ubits-calendar__weekdays">
      ${P.map((y) => `<div class="ubits-calendar__weekday">${y}</div>`).join("")}
    </div>
  `;
  let x = '<div class="ubits-calendar__days">';
  for (let y = 0; y < v; y++)
    x += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
  for (let y = 1; y <= g; y++) {
    const h = new Date(e, t, y), o = h.toDateString() === q;
    let f = ["ubits-calendar__day"];
    s === "single" && n && C(h, n) && f.push("ubits-calendar__day--selected"), s === "range" && n && (p ? C(h, n) ? f.push("ubits-calendar__day--range-start") : C(h, p) ? f.push("ubits-calendar__day--range-end") : R(h, n, p) && f.push("ubits-calendar__day--in-range") : C(h, n) && f.push("ubits-calendar__day--range-start")), o && f.push("ubits-calendar__day--today");
    let _ = !1;
    u && L(h, u) < 0 && (_ = !0, f.push("ubits-calendar__day--disabled")), M && L(h, M) > 0 && (_ = !0, f.push("ubits-calendar__day--disabled"));
    const E = _ ? " disabled" : "", D = N(h);
    x += `<button type="button" class="${f.join(" ")}" data-date="${D}"${E}>${y}</button>`;
  }
  return x += "</div>", `
    <div class="${F}"${d}>
      ${c}
      ${S}
      ${x}
    </div>
  `.trim();
}
function B(i) {
  const {
    mode: s = "single",
    selectedDate: n,
    endDate: p,
    minDate: u,
    maxDate: M,
    initialDate: $ = /* @__PURE__ */ new Date(),
    onDateSelect: I,
    onRangeSelect: w
  } = i, r = document.createElement("div");
  r.innerHTML = A(i);
  const e = r.firstElementChild;
  if (!e)
    throw new Error("No se pudo crear el calendario");
  let t = new Date($), a = n ? new Date(n) : null, l = p ? new Date(p) : null, g = !1;
  const v = () => {
    g || (g = !0, e.innerHTML = A({
      ...i,
      mode: s,
      selectedDate: a,
      endDate: l,
      minDate: u,
      maxDate: M,
      initialDate: t
    }), Y(), setTimeout(() => {
      g = !1;
    }, 100));
  }, Y = () => {
    const d = e.querySelector(".ubits-calendar__nav-button--prev"), T = e.querySelector(".ubits-calendar__nav-button--next"), c = e.querySelector(".ubits-calendar__month-input"), S = e.querySelector(".ubits-calendar__year-input"), x = e.querySelector(".ubits-calendar__month-dropdown"), y = e.querySelector(".ubits-calendar__year-dropdown");
    d?.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation(), t.setMonth(t.getMonth() - 1), c && (c.value = k[t.getMonth()]), S && (S.value = String(t.getFullYear())), v();
    }), T?.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation(), t.setMonth(t.getMonth() + 1), c && (c.value = k[t.getMonth()]), S && (S.value = String(t.getFullYear())), v();
    }), c?.addEventListener("click", (b) => {
      if (b.preventDefault(), b.stopPropagation(), x) {
        const o = x;
        if (o.style.display === "block")
          o.style.display = "none";
        else {
          y && (y.style.display = "none");
          const _ = k.map((D, m) => ({
            label: D,
            value: m,
            selected: m === t.getMonth()
          }));
          o.innerHTML = "";
          const E = j(_, (D) => {
            t.setMonth(D), o.style.display = "none", c && (c.value = k[D]), v();
          });
          o.appendChild(E), o.style.display = "block";
        }
      }
    }), S?.addEventListener("click", (b) => {
      if (b.preventDefault(), b.stopPropagation(), y) {
        const o = y;
        if (o.style.display === "block")
          o.style.display = "none";
        else {
          x && (x.style.display = "none");
          const _ = t.getFullYear(), E = Array.from({ length: 100 }, (m, z) => {
            const H = _ - 50 + z;
            return {
              label: String(H),
              value: H,
              selected: H === _
            };
          });
          o.innerHTML = "";
          const D = j(E, (m) => {
            t.setFullYear(m), o.style.display = "none", S && (S.value = String(m)), v();
          });
          o.appendChild(D), o.style.display = "block";
        }
      }
    }), e.querySelectorAll(
      ".ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)"
    ).forEach((b) => {
      b.addEventListener("click", (o) => {
        o.preventDefault(), o.stopPropagation();
        const f = b.dataset.date || "", [_, E, D] = f.split("/"), m = new Date(parseInt(D), parseInt(E) - 1, parseInt(_));
        s === "single" ? (a = m, v(), I && I(m)) : s === "range" && (!a || a && l ? (a = m, l = null, v()) : a && !l && (L(m, a) < 0 ? (l = a, a = m) : l = m, v(), w && a && l && w(a, l)));
      });
    });
  };
  return v(), {
    element: e,
    update: (d) => {
      d.selectedDate !== void 0 && (a = d.selectedDate ? new Date(d.selectedDate) : null), d.endDate !== void 0 && (l = d.endDate ? new Date(d.endDate) : null), d.initialDate && (t = new Date(d.initialDate)), Object.assign(i, d), v();
    },
    destroy: () => {
      const d = e.querySelector(".ubits-calendar__month-dropdown"), T = e.querySelector(".ubits-calendar__year-dropdown");
      if (d) {
        const c = d._scrollbarInstance;
        c && c.destroy && c.destroy();
      }
      if (T) {
        const c = T._scrollbarInstance;
        c && c.destroy && c.destroy();
      }
      e.parentElement && e.parentElement.removeChild(e);
    }
  };
}
const V = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createCalendar: B,
  renderCalendar: A
}, Symbol.toStringTag, { value: "Module" })), J = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createCalendar: B,
  renderCalendar: A
}, Symbol.toStringTag, { value: "Module" }));
export {
  V as C,
  J as i
};
