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
], z = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
function N(i) {
  const s = String(i.getDate()).padStart(2, "0"), a = String(i.getMonth() + 1).padStart(2, "0"), p = i.getFullYear();
  return `${s}/${a}/${p}`;
}
function I(i, s) {
  const a = new Date(i.getFullYear(), i.getMonth(), i.getDate()), p = new Date(s.getFullYear(), s.getMonth(), s.getDate());
  return a.getTime() - p.getTime();
}
function A(i, s) {
  return I(i, s) === 0;
}
function Y(i, s, a) {
  const p = I(i, s), d = I(a, i);
  return p >= 0 && d >= 0;
}
function T(i, s) {
  const a = document.createElement("div");
  a.style.cssText = "position: relative; width: 100%;";
  const p = `calendar-list-container-${Date.now()}`, d = `calendar-list-${Date.now()}`, _ = `calendar-scrollbar-${Date.now()}`;
  let x = `
    <div id="${p}" style="position: relative; width: 100%; max-height: 200px; overflow: hidden;">
      <div id="${d}" class="ubits-list" role="list" style="max-height: 200px; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 0; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
  `;
  i.forEach((n) => {
    const t = n.selected ? "active" : "default", e = [
      "ubits-list-item",
      "ubits-list-item--sm",
      t !== "default" ? `ubits-list-item--${t}` : ""
    ].filter(Boolean).join(" "), o = [];
    t === "active" && o.push('aria-selected="true"'), o.push('tabindex="0"'), o.push(`data-value="${n.value}"`), x += `
      <div class="${e}" role="listitem" ${o.join(" ")} style="cursor: pointer;">
        ${n.label}
      </div>
    `;
  }), x += `
      </div>
      <div id="${_}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; max-height: 200px; overflow: hidden; pointer-events: auto; z-index: 10;"></div>
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
  `, a.innerHTML = x;
  const M = async () => {
    console.log("📜 [SCROLLBAR] ========== INICIO initScrollbar =========="), console.log("📜 [SCROLLBAR] listId:", d), console.log("📜 [SCROLLBAR] scrollbarContainerId:", _);
    const n = document.getElementById(d), t = document.getElementById(_);
    if (!n || !t) {
      console.log("📜 [SCROLLBAR] ❌ Elementos no encontrados:", {
        listElement: !!n,
        scrollbarContainer: !!t
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
        offsetHeight: t.offsetHeight,
        offsetWidth: t.offsetWidth,
        styleHeight: t.style.height,
        styleMaxHeight: t.style.maxHeight,
        computedHeight: window.getComputedStyle(t).height,
        computedMaxHeight: window.getComputedStyle(t).maxHeight
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
      const e = window.createScrollbarLocal;
      if (typeof e == "function") {
        console.log("📜 [SCROLLBAR] Usando createScrollbarLocal");
        const C = e(n, t, "vertical");
        if (C) {
          a._scrollbarInstance = C, console.log("📜 [SCROLLBAR] ✅ Scrollbar creado con createScrollbarLocal");
          return;
        }
      }
      console.log("📜 [SCROLLBAR] Importando ScrollProvider...");
      const { createScrollbar: o } = await import("./ScrollProvider-DqDnIEet.js"), r = o({
        orientation: "vertical",
        targetId: d,
        containerId: _
      });
      r ? (a._scrollbarInstance = r, console.log("📜 [SCROLLBAR] ✅ Scrollbar creado con ScrollProvider")) : console.log("📜 [SCROLLBAR] ⚠️ Scrollbar no se creó");
    } catch (e) {
      console.error("📜 [SCROLLBAR] ❌ Error inicializando scrollbar:", e);
    }
    console.log("📜 [SCROLLBAR] ========== FIN initScrollbar ==========");
  }, S = () => {
    console.log("📜 [SCROLLBAR] setupScrollbar llamado, isConnected:", a.isConnected), a.isConnected && requestAnimationFrame(() => {
      console.log("📜 [SCROLLBAR] requestAnimationFrame ejecutado, llamando initScrollbar"), M();
    });
  };
  if (a.parentElement)
    console.log("📜 [SCROLLBAR] Contenedor ya en DOM, inicializando inmediatamente"), S();
  else {
    console.log("📜 [SCROLLBAR] Contenedor no en DOM, configurando observer");
    const n = new MutationObserver(() => {
      a.isConnected && (console.log("📜 [SCROLLBAR] Contenedor conectado al DOM, inicializando"), n.disconnect(), S());
    });
    n.observe(document.body, { childList: !0, subtree: !0 }), setTimeout(() => {
      a.isConnected && (console.log("📜 [SCROLLBAR] Timeout alcanzado, inicializando"), n.disconnect(), S());
    }, 1e3);
  }
  return setTimeout(() => {
    const n = document.getElementById(d);
    n && n.querySelectorAll(".ubits-list-item").forEach((t) => {
      t.addEventListener("click", (e) => {
        e.preventDefault(), e.stopPropagation();
        const o = parseInt(e.currentTarget.dataset.value || "0"), r = a._scrollbarInstance;
        r && r.destroy && r.destroy(), s(o);
      });
    });
  }, 100), a;
}
function F(i) {
  const { mode: s = "single", selectedDate: a, endDate: p, minDate: d, maxDate: _, initialDate: x = /* @__PURE__ */ new Date(), className: M = "", style: S = "" } = i, n = x, t = n.getFullYear(), e = n.getMonth(), o = new Date(t, e, 1), C = new Date(t, e + 1, 0).getDate(), f = o.getDay(), k = (/* @__PURE__ */ new Date()).toDateString(), O = [
    "ubits-calendar",
    s === "range" ? "ubits-calendar--range" : "ubits-calendar--single",
    M
  ].filter(Boolean).join(" "), u = S ? ` style="${S}"` : "", c = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${E[e]}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__year-input" value="${t}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--next" aria-label="Mes siguiente">
        <i class="far fa-chevron-right"></i>
      </button>
    </div>
  `, L = `
    <div class="ubits-calendar__weekdays">
      ${z.map((y) => `<div class="ubits-calendar__weekday">${y}</div>`).join("")}
    </div>
  `;
  let w = '<div class="ubits-calendar__days">';
  for (let y = 0; y < f; y++)
    w += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
  for (let y = 1; y <= C; y++) {
    const h = new Date(t, e, y), l = h.toDateString() === k;
    let g = ["ubits-calendar__day"];
    s === "single" && a && A(h, a) && g.push("ubits-calendar__day--selected"), s === "range" && a && (p ? A(h, a) ? g.push("ubits-calendar__day--range-start") : A(h, p) ? g.push("ubits-calendar__day--range-end") : Y(h, a, p) && g.push("ubits-calendar__day--in-range") : A(h, a) && g.push("ubits-calendar__day--range-start")), l && g.push("ubits-calendar__day--today");
    let v = !1;
    d && I(h, d) < 0 && (v = !0, g.push("ubits-calendar__day--disabled")), _ && I(h, _) > 0 && (v = !0, g.push("ubits-calendar__day--disabled"));
    const R = v ? " disabled" : "", D = N(h);
    w += `<button type="button" class="${g.join(" ")}" data-date="${D}"${R}>${y}</button>`;
  }
  return w += "</div>", `
    <div class="${O}"${u}>
      ${c}
      ${L}
      ${w}
    </div>
  `.trim();
}
function P(i) {
  const { mode: s = "single", selectedDate: a, endDate: p, minDate: d, maxDate: _, initialDate: x = /* @__PURE__ */ new Date(), onDateSelect: M, onRangeSelect: S } = i, n = document.createElement("div");
  n.innerHTML = F(i);
  const t = n.firstElementChild;
  if (!t)
    throw new Error("No se pudo crear el calendario");
  let e = new Date(x), o = a ? new Date(a) : null, r = p ? new Date(p) : null, C = !1;
  const f = () => {
    C || (C = !0, t.innerHTML = F({
      ...i,
      mode: s,
      selectedDate: o,
      endDate: r,
      minDate: d,
      maxDate: _,
      initialDate: e
    }), B(), setTimeout(() => {
      C = !1;
    }, 100));
  }, B = () => {
    const u = t.querySelector(".ubits-calendar__nav-button--prev"), H = t.querySelector(".ubits-calendar__nav-button--next"), c = t.querySelector(".ubits-calendar__month-input"), L = t.querySelector(".ubits-calendar__year-input"), w = t.querySelector(".ubits-calendar__month-dropdown"), y = t.querySelector(".ubits-calendar__year-dropdown");
    u?.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation(), e.setMonth(e.getMonth() - 1), c && (c.value = E[e.getMonth()]), L && (L.value = String(e.getFullYear())), f();
    }), H?.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation(), e.setMonth(e.getMonth() + 1), c && (c.value = E[e.getMonth()]), L && (L.value = String(e.getFullYear())), f();
    }), c?.addEventListener("click", (b) => {
      if (b.preventDefault(), b.stopPropagation(), w) {
        const l = w;
        if (l.style.display === "block")
          l.style.display = "none";
        else {
          y && (y.style.display = "none");
          const v = E.map((D, m) => ({
            label: D,
            value: m,
            selected: m === e.getMonth()
          }));
          l.innerHTML = "";
          const R = T(v, (D) => {
            e.setMonth(D), l.style.display = "none", c && (c.value = E[D]), f();
          });
          l.appendChild(R), l.style.display = "block";
        }
      }
    }), L?.addEventListener("click", (b) => {
      if (b.preventDefault(), b.stopPropagation(), y) {
        const l = y;
        if (l.style.display === "block")
          l.style.display = "none";
        else {
          w && (w.style.display = "none");
          const v = e.getFullYear(), R = Array.from({ length: 100 }, (m, q) => {
            const $ = v - 50 + q;
            return {
              label: String($),
              value: $,
              selected: $ === v
            };
          });
          l.innerHTML = "";
          const D = T(R, (m) => {
            e.setFullYear(m), l.style.display = "none", L && (L.value = String(m)), f();
          });
          l.appendChild(D), l.style.display = "block";
        }
      }
    }), t.querySelectorAll(".ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)").forEach((b) => {
      b.addEventListener("click", (l) => {
        l.preventDefault(), l.stopPropagation();
        const g = b.dataset.date || "", [v, R, D] = g.split("/"), m = new Date(parseInt(D), parseInt(R) - 1, parseInt(v));
        s === "single" ? (o = m, f(), M && M(m)) : s === "range" && (!o || o && r ? (o = m, r = null, f()) : o && !r && (I(m, o) < 0 ? (r = o, o = m) : r = m, f(), S && o && r && S(o, r)));
      });
    });
  };
  return f(), {
    element: t,
    update: (u) => {
      u.selectedDate !== void 0 && (o = u.selectedDate ? new Date(u.selectedDate) : null), u.endDate !== void 0 && (r = u.endDate ? new Date(u.endDate) : null), u.initialDate && (e = new Date(u.initialDate)), Object.assign(i, u), f();
    },
    destroy: () => {
      const u = t.querySelector(".ubits-calendar__month-dropdown"), H = t.querySelector(".ubits-calendar__year-dropdown");
      if (u) {
        const c = u._scrollbarInstance;
        c && c.destroy && c.destroy();
      }
      if (H) {
        const c = H._scrollbarInstance;
        c && c.destroy && c.destroy();
      }
      t.parentElement && t.parentElement.removeChild(t);
    }
  };
}
export {
  P as createCalendar,
  F as renderCalendar
};
