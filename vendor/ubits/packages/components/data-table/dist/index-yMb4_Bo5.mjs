const E = [
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
], N = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
function Y(i) {
  const l = String(i.getDate()).padStart(2, "0"), o = String(i.getMonth() + 1).padStart(2, "0"), p = i.getFullYear();
  return `${l}/${o}/${p}`;
}
function I(i, l) {
  const o = new Date(i.getFullYear(), i.getMonth(), i.getDate()), p = new Date(l.getFullYear(), l.getMonth(), l.getDate());
  return o.getTime() - p.getTime();
}
function A(i, l) {
  return I(i, l) === 0;
}
function j(i, l, o) {
  const p = I(i, l), d = I(o, i);
  return p >= 0 && d >= 0;
}
function z(i, l) {
  const o = document.createElement("div");
  o.style.cssText = "position: relative; width: 100%;";
  const p = `calendar-list-container-${Date.now()}`, d = `calendar-list-${Date.now()}`, S = `calendar-scrollbar-${Date.now()}`;
  let x = `
    <div id="${p}" style="position: relative; width: 100%; max-height: 200px; overflow: hidden;">
      <div id="${d}" class="ubits-list" role="list" style="max-height: 200px; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 0; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
  `;
  i.forEach((n) => {
    const e = n.selected ? "active" : "default", t = [
      "ubits-list-item",
      "ubits-list-item--sm",
      e !== "default" ? `ubits-list-item--${e}` : ""
    ].filter(Boolean).join(" "), a = [];
    e === "active" && a.push('aria-selected="true"'), a.push('tabindex="0"'), a.push(`data-value="${n.value}"`), x += `
      <div class="${t}" role="listitem" ${a.join(" ")} style="cursor: pointer;">
        ${n.label}
      </div>
    `;
  }), x += `
      </div>
      <div id="${S}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; max-height: 200px; overflow: hidden; pointer-events: auto; z-index: 10;"></div>
    </div>
    <style>
      /* Ocultar scrollbar nativo completamente - solo mostrar UBITS scrollbar */
      #${d}::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
      #${d}::-webkit-scrollbar-track {
        display: none !important;
        background: transparent !important;
      }
      #${d}::-webkit-scrollbar-thumb {
        display: none !important;
        background: transparent !important;
      }
      /* Firefox */
      #${d} {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
    </style>
  `, o.innerHTML = x;
  const M = async () => {
    console.log("📜 [SCROLLBAR] ========== INICIO initScrollbar =========="), console.log("📜 [SCROLLBAR] listId:", d), console.log("📜 [SCROLLBAR] scrollbarContainerId:", S);
    const n = document.getElementById(d), e = document.getElementById(S);
    if (!n || !e) {
      console.log("📜 [SCROLLBAR] ❌ Elementos no encontrados:", {
        listElement: !!n,
        scrollbarContainer: !!e
      });
      return;
    }
    if (console.log("📜 [SCROLLBAR] Elementos encontrados:", {
      listElement: {
        scrollHeight: n.scrollHeight,
        clientHeight: n.clientHeight,
        offsetHeight: n.offsetHeight,
        maxHeight: n.style.maxHeight,
        computedMaxHeight: window.getComputedStyle(n).maxHeight
      },
      scrollbarContainer: {
        offsetHeight: e.offsetHeight,
        offsetWidth: e.offsetWidth,
        styleHeight: e.style.height,
        styleMaxHeight: e.style.maxHeight,
        computedHeight: window.getComputedStyle(e).height,
        computedMaxHeight: window.getComputedStyle(e).maxHeight
      }
    }), n.scrollHeight <= n.clientHeight) {
      console.log("📜 [SCROLLBAR] ⚠️ No necesita scroll:", {
        scrollHeight: n.scrollHeight,
        clientHeight: n.clientHeight
      });
      return;
    }
    console.log("📜 [SCROLLBAR] ✅ Necesita scroll, inicializando...");
    try {
      const t = window.createScrollbarLocal;
      if (typeof t == "function") {
        console.log("📜 [SCROLLBAR] Usando createScrollbarLocal");
        const h = t(n, e, "vertical");
        if (h) {
          o._scrollbarInstance = h, console.log("📜 [SCROLLBAR] ✅ Scrollbar creado con createScrollbarLocal");
          return;
        }
      }
      console.log("📜 [SCROLLBAR] Importando ScrollProvider...");
      const { createScrollbar: a } = await import("./index-g1dVilju.mjs").then((h) => h.S), s = a({
        orientation: "vertical",
        targetId: d,
        containerId: S
      });
      s ? (o._scrollbarInstance = s, console.log("📜 [SCROLLBAR] ✅ Scrollbar creado con ScrollProvider")) : console.log("📜 [SCROLLBAR] ⚠️ Scrollbar no se creó");
    } catch (t) {
      console.error("📜 [SCROLLBAR] ❌ Error inicializando scrollbar:", t);
    }
    console.log("📜 [SCROLLBAR] ========== FIN initScrollbar ==========");
  }, L = () => {
    console.log("📜 [SCROLLBAR] setupScrollbar llamado, isConnected:", o.isConnected), o.isConnected && requestAnimationFrame(() => {
      console.log("📜 [SCROLLBAR] requestAnimationFrame ejecutado, llamando initScrollbar"), M();
    });
  };
  if (o.parentElement)
    console.log("📜 [SCROLLBAR] Contenedor ya en DOM, inicializando inmediatamente"), L();
  else {
    console.log("📜 [SCROLLBAR] Contenedor no en DOM, configurando observer");
    const n = new MutationObserver(() => {
      o.isConnected && (console.log("📜 [SCROLLBAR] Contenedor conectado al DOM, inicializando"), n.disconnect(), L());
    });
    n.observe(document.body, { childList: !0, subtree: !0 }), setTimeout(() => {
      o.isConnected && (console.log("📜 [SCROLLBAR] Timeout alcanzado, inicializando"), n.disconnect(), L());
    }, 1e3);
  }
  return setTimeout(() => {
    const n = document.getElementById(d);
    n && n.querySelectorAll(".ubits-list-item").forEach((e) => {
      e.addEventListener("click", (t) => {
        t.preventDefault(), t.stopPropagation();
        const a = parseInt(t.currentTarget.dataset.value || "0"), s = o._scrollbarInstance;
        s && s.destroy && s.destroy(), l(a);
      });
    });
  }, 100), o;
}
function $(i) {
  const {
    mode: l = "single",
    selectedDate: o,
    endDate: p,
    minDate: d,
    maxDate: S,
    initialDate: x = /* @__PURE__ */ new Date(),
    className: M = "",
    style: L = ""
  } = i, n = x, e = n.getFullYear(), t = n.getMonth(), a = new Date(e, t, 1), h = new Date(e, t + 1, 0).getDate(), f = a.getDay(), T = (/* @__PURE__ */ new Date()).toDateString(), k = [
    "ubits-calendar",
    l === "range" ? "ubits-calendar--range" : "ubits-calendar--single",
    M
  ].filter(Boolean).join(" "), u = L ? ` style="${L}"` : "", c = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${E[t]}" readonly style="cursor: pointer;">
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
  `, w = `
    <div class="ubits-calendar__weekdays">
      ${N.map((y) => `<div class="ubits-calendar__weekday">${y}</div>`).join("")}
    </div>
  `;
  let C = '<div class="ubits-calendar__days">';
  for (let y = 0; y < f; y++)
    C += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
  for (let y = 1; y <= h; y++) {
    const v = new Date(e, t, y), r = v.toDateString() === T;
    let g = ["ubits-calendar__day"];
    l === "single" && o && A(v, o) && g.push("ubits-calendar__day--selected"), l === "range" && o && (p ? A(v, o) ? g.push("ubits-calendar__day--range-start") : A(v, p) ? g.push("ubits-calendar__day--range-end") : j(v, o, p) && g.push("ubits-calendar__day--in-range") : A(v, o) && g.push("ubits-calendar__day--range-start")), r && g.push("ubits-calendar__day--today");
    let _ = !1;
    d && I(v, d) < 0 && (_ = !0, g.push("ubits-calendar__day--disabled")), S && I(v, S) > 0 && (_ = !0, g.push("ubits-calendar__day--disabled"));
    const R = _ ? " disabled" : "", D = Y(v);
    C += `<button type="button" class="${g.join(" ")}" data-date="${D}"${R}>${y}</button>`;
  }
  return C += "</div>", `
    <div class="${k}"${u}>
      ${c}
      ${w}
      ${C}
    </div>
  `.trim();
}
function F(i) {
  const {
    mode: l = "single",
    selectedDate: o,
    endDate: p,
    minDate: d,
    maxDate: S,
    initialDate: x = /* @__PURE__ */ new Date(),
    onDateSelect: M,
    onRangeSelect: L
  } = i, n = document.createElement("div");
  n.innerHTML = $(i);
  const e = n.firstElementChild;
  if (!e)
    throw new Error("No se pudo crear el calendario");
  let t = new Date(x), a = o ? new Date(o) : null, s = p ? new Date(p) : null, h = !1;
  const f = () => {
    h || (h = !0, e.innerHTML = $({
      ...i,
      mode: l,
      selectedDate: a,
      endDate: s,
      minDate: d,
      maxDate: S,
      initialDate: t
    }), O(), setTimeout(() => {
      h = !1;
    }, 100));
  }, O = () => {
    const u = e.querySelector(".ubits-calendar__nav-button--prev"), H = e.querySelector(".ubits-calendar__nav-button--next"), c = e.querySelector(".ubits-calendar__month-input"), w = e.querySelector(".ubits-calendar__year-input"), C = e.querySelector(".ubits-calendar__month-dropdown"), y = e.querySelector(".ubits-calendar__year-dropdown");
    u?.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation(), t.setMonth(t.getMonth() - 1), c && (c.value = E[t.getMonth()]), w && (w.value = String(t.getFullYear())), f();
    }), H?.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation(), t.setMonth(t.getMonth() + 1), c && (c.value = E[t.getMonth()]), w && (w.value = String(t.getFullYear())), f();
    }), c?.addEventListener("click", (b) => {
      if (b.preventDefault(), b.stopPropagation(), C) {
        const r = C;
        if (r.style.display === "block")
          r.style.display = "none";
        else {
          y && (y.style.display = "none");
          const _ = E.map((D, m) => ({
            label: D,
            value: m,
            selected: m === t.getMonth()
          }));
          r.innerHTML = "";
          const R = z(_, (D) => {
            t.setMonth(D), r.style.display = "none", c && (c.value = E[D]), f();
          });
          r.appendChild(R), r.style.display = "block";
        }
      }
    }), w?.addEventListener("click", (b) => {
      if (b.preventDefault(), b.stopPropagation(), y) {
        const r = y;
        if (r.style.display === "block")
          r.style.display = "none";
        else {
          C && (C.style.display = "none");
          const _ = t.getFullYear(), R = Array.from({ length: 100 }, (m, q) => {
            const B = _ - 50 + q;
            return {
              label: String(B),
              value: B,
              selected: B === _
            };
          });
          r.innerHTML = "";
          const D = z(R, (m) => {
            t.setFullYear(m), r.style.display = "none", w && (w.value = String(m)), f();
          });
          r.appendChild(D), r.style.display = "block";
        }
      }
    }), e.querySelectorAll(".ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)").forEach((b) => {
      b.addEventListener("click", (r) => {
        r.preventDefault(), r.stopPropagation();
        const g = b.dataset.date || "", [_, R, D] = g.split("/"), m = new Date(parseInt(D), parseInt(R) - 1, parseInt(_));
        l === "single" ? (a = m, f(), M && M(m)) : l === "range" && (!a || a && s ? (a = m, s = null, f()) : a && !s && (I(m, a) < 0 ? (s = a, a = m) : s = m, f(), L && a && s && L(a, s)));
      });
    });
  };
  return f(), {
    element: e,
    update: (u) => {
      u.selectedDate !== void 0 && (a = u.selectedDate ? new Date(u.selectedDate) : null), u.endDate !== void 0 && (s = u.endDate ? new Date(u.endDate) : null), u.initialDate && (t = new Date(u.initialDate)), Object.assign(i, u), f();
    },
    destroy: () => {
      const u = e.querySelector(".ubits-calendar__month-dropdown"), H = e.querySelector(".ubits-calendar__year-dropdown");
      if (u) {
        const c = u._scrollbarInstance;
        c && c.destroy && c.destroy();
      }
      if (H) {
        const c = H._scrollbarInstance;
        c && c.destroy && c.destroy();
      }
      e.parentElement && e.parentElement.removeChild(e);
    }
  };
}
const P = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createCalendar: F,
  renderCalendar: $
}, Symbol.toStringTag, { value: "Module" })), V = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createCalendar: F,
  renderCalendar: $
}, Symbol.toStringTag, { value: "Module" }));
export {
  P as C,
  V as i
};
