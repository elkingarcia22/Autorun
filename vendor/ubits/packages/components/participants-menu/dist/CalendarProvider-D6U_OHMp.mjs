const A = [
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
  const s = String(i.getDate()).padStart(2, "0"), o = String(i.getMonth() + 1).padStart(2, "0"), p = i.getFullYear();
  return `${s}/${o}/${p}`;
}
function E(i, s) {
  const o = new Date(i.getFullYear(), i.getMonth(), i.getDate()), p = new Date(s.getFullYear(), s.getMonth(), s.getDate());
  return o.getTime() - p.getTime();
}
function I(i, s) {
  return E(i, s) === 0;
}
function Y(i, s, o) {
  const p = E(i, s), u = E(o, i);
  return p >= 0 && u >= 0;
}
function T(i, s) {
  const o = document.createElement("div");
  o.style.cssText = "position: relative; width: 100%;";
  const p = `calendar-list-container-${Date.now()}`, u = `calendar-list-${Date.now()}`, L = `calendar-scrollbar-${Date.now()}`;
  let R = `
    <div id="${p}" style="position: relative; width: 100%; max-height: 200px; overflow: hidden;">
      <div id="${u}" class="ubits-list" role="list" style="max-height: 200px; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 0; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
  `;
  i.forEach((n) => {
    const e = n.selected ? "active" : "default", t = [
      "ubits-list-item",
      "ubits-list-item--sm",
      e !== "default" ? `ubits-list-item--${e}` : ""
    ].filter(Boolean).join(" "), a = [];
    e === "active" && a.push('aria-selected="true"'), a.push('tabindex="0"'), a.push(`data-value="${n.value}"`), R += `
      <div class="${t}" role="listitem" ${a.join(" ")} style="cursor: pointer;">
        ${n.label}
      </div>
    `;
  }), R += `
      </div>
      <div id="${L}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; max-height: 200px; overflow: hidden; pointer-events: auto; z-index: 10;"></div>
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
  `, o.innerHTML = R;
  const H = async () => {
    console.log("📜 [SCROLLBAR] ========== INICIO initScrollbar =========="), console.log("📜 [SCROLLBAR] listId:", u), console.log("📜 [SCROLLBAR] scrollbarContainerId:", L);
    const n = document.getElementById(u), e = document.getElementById(L);
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
        const v = t(n, e, "vertical");
        if (v) {
          o._scrollbarInstance = v, console.log("📜 [SCROLLBAR] ✅ Scrollbar creado con createScrollbarLocal");
          return;
        }
      }
      console.log("📜 [SCROLLBAR] Importando ScrollProvider...");
      const { createScrollbar: a } = await import("./index-CC2oLldf.mjs").then((v) => v.S), d = a({
        orientation: "vertical",
        targetId: u,
        containerId: L
      });
      d ? (o._scrollbarInstance = d, console.log("📜 [SCROLLBAR] ✅ Scrollbar creado con ScrollProvider")) : console.log("📜 [SCROLLBAR] ⚠️ Scrollbar no se creó");
    } catch (t) {
      console.error("📜 [SCROLLBAR] ❌ Error inicializando scrollbar:", t);
    }
    console.log("📜 [SCROLLBAR] ========== FIN initScrollbar ==========");
  }, w = () => {
    console.log("📜 [SCROLLBAR] setupScrollbar llamado, isConnected:", o.isConnected), o.isConnected && requestAnimationFrame(() => {
      console.log("📜 [SCROLLBAR] requestAnimationFrame ejecutado, llamando initScrollbar"), H();
    });
  };
  if (o.parentElement)
    console.log("📜 [SCROLLBAR] Contenedor ya en DOM, inicializando inmediatamente"), w();
  else {
    console.log("📜 [SCROLLBAR] Contenedor no en DOM, configurando observer");
    const n = new MutationObserver(() => {
      o.isConnected && (console.log("📜 [SCROLLBAR] Contenedor conectado al DOM, inicializando"), n.disconnect(), w());
    });
    n.observe(document.body, { childList: !0, subtree: !0 }), setTimeout(() => {
      o.isConnected && (console.log("📜 [SCROLLBAR] Timeout alcanzado, inicializando"), n.disconnect(), w());
    }, 1e3);
  }
  return setTimeout(() => {
    const n = document.getElementById(u);
    n && n.querySelectorAll(".ubits-list-item").forEach((e) => {
      e.addEventListener("click", (t) => {
        t.preventDefault(), t.stopPropagation();
        const a = parseInt(t.currentTarget.dataset.value || "0"), d = o._scrollbarInstance;
        d && d.destroy && d.destroy(), s(a);
      });
    });
  }, 100), o;
}
function F(i) {
  const {
    mode: s = "single",
    selectedDate: o,
    endDate: p,
    minDate: u,
    maxDate: L,
    initialDate: R = /* @__PURE__ */ new Date(),
    className: H = "",
    style: w = ""
  } = i, n = R, e = n.getFullYear(), t = n.getMonth(), a = new Date(e, t, 1), v = new Date(e, t + 1, 0).getDate(), f = a.getDay(), k = (/* @__PURE__ */ new Date()).toDateString(), O = [
    "ubits-calendar",
    s === "range" ? "ubits-calendar--range" : "ubits-calendar--single",
    H
  ].filter(Boolean).join(" "), r = w ? ` style="${w}"` : "", l = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${A[t]}" readonly style="cursor: pointer;">
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
  `, h = `
    <div class="ubits-calendar__weekdays">
      ${z.map((y) => `<div class="ubits-calendar__weekday">${y}</div>`).join("")}
    </div>
  `;
  let C = '<div class="ubits-calendar__days">';
  for (let y = 0; y < f; y++)
    C += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
  for (let y = 1; y <= v; y++) {
    const D = new Date(e, t, y), c = D.toDateString() === k;
    let g = ["ubits-calendar__day"];
    s === "single" && o && I(D, o) && g.push("ubits-calendar__day--selected"), s === "range" && o && (p ? I(D, o) ? g.push("ubits-calendar__day--range-start") : I(D, p) ? g.push("ubits-calendar__day--range-end") : Y(D, o, p) && g.push("ubits-calendar__day--in-range") : I(D, o) && g.push("ubits-calendar__day--range-start")), c && g.push("ubits-calendar__day--today");
    let _ = !1;
    u && E(D, u) < 0 && (_ = !0, g.push("ubits-calendar__day--disabled")), L && E(D, L) > 0 && (_ = !0, g.push("ubits-calendar__day--disabled"));
    const M = _ ? " disabled" : "", S = N(D);
    C += `<button type="button" class="${g.join(" ")}" data-date="${S}"${M}>${y}</button>`;
  }
  return C += "</div>", `
    <div class="${O}"${r}>
      ${l}
      ${h}
      ${C}
    </div>
  `.trim();
}
function P(i) {
  const {
    mode: s = "single",
    selectedDate: o,
    endDate: p,
    minDate: u,
    maxDate: L,
    initialDate: R = /* @__PURE__ */ new Date(),
    onDateSelect: H,
    onRangeSelect: w
  } = i, n = document.createElement("div");
  n.innerHTML = F(i);
  const e = n.firstElementChild;
  if (!e)
    throw new Error("No se pudo crear el calendario");
  let t = new Date(R), a = o ? new Date(o) : null, d = p ? new Date(p) : null, v = !1;
  const f = () => {
    v || (v = !0, e.innerHTML = F({
      ...i,
      mode: s,
      selectedDate: a,
      endDate: d,
      minDate: u,
      maxDate: L,
      initialDate: t
    }), B(), setTimeout(() => {
      v = !1;
    }, 100));
  }, B = () => {
    const r = e.querySelector(".ubits-calendar__nav-button--prev"), x = e.querySelector(".ubits-calendar__nav-button--next"), l = e.querySelector(".ubits-calendar__month-input"), h = e.querySelector(".ubits-calendar__year-input"), C = e.querySelector(".ubits-calendar__month-dropdown"), y = e.querySelector(".ubits-calendar__year-dropdown");
    r == null || r.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation(), t.setMonth(t.getMonth() - 1), l && (l.value = A[t.getMonth()]), h && (h.value = String(t.getFullYear())), f();
    }), x == null || x.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation(), t.setMonth(t.getMonth() + 1), l && (l.value = A[t.getMonth()]), h && (h.value = String(t.getFullYear())), f();
    }), l == null || l.addEventListener("click", (b) => {
      if (b.preventDefault(), b.stopPropagation(), C) {
        const c = C;
        if (c.style.display === "block")
          c.style.display = "none";
        else {
          y && (y.style.display = "none");
          const _ = A.map((S, m) => ({
            label: S,
            value: m,
            selected: m === t.getMonth()
          }));
          c.innerHTML = "";
          const M = T(_, (S) => {
            t.setMonth(S), c.style.display = "none", l && (l.value = A[S]), f();
          });
          c.appendChild(M), c.style.display = "block";
        }
      }
    }), h == null || h.addEventListener("click", (b) => {
      if (b.preventDefault(), b.stopPropagation(), y) {
        const c = y;
        if (c.style.display === "block")
          c.style.display = "none";
        else {
          C && (C.style.display = "none");
          const _ = t.getFullYear(), M = Array.from({ length: 100 }, (m, q) => {
            const $ = _ - 50 + q;
            return {
              label: String($),
              value: $,
              selected: $ === _
            };
          });
          c.innerHTML = "";
          const S = T(M, (m) => {
            t.setFullYear(m), c.style.display = "none", h && (h.value = String(m)), f();
          });
          c.appendChild(S), c.style.display = "block";
        }
      }
    }), e.querySelectorAll(".ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)").forEach((b) => {
      b.addEventListener("click", (c) => {
        c.preventDefault(), c.stopPropagation();
        const g = b.dataset.date || "", [_, M, S] = g.split("/"), m = new Date(parseInt(S), parseInt(M) - 1, parseInt(_));
        s === "single" ? (a = m, f(), H && H(m)) : s === "range" && (!a || a && d ? (a = m, d = null, f()) : a && !d && (E(m, a) < 0 ? (d = a, a = m) : d = m, f(), w && a && d && w(a, d)));
      });
    });
  };
  return f(), {
    element: e,
    update: (r) => {
      r.selectedDate !== void 0 && (a = r.selectedDate ? new Date(r.selectedDate) : null), r.endDate !== void 0 && (d = r.endDate ? new Date(r.endDate) : null), r.initialDate && (t = new Date(r.initialDate)), Object.assign(i, r), f();
    },
    destroy: () => {
      const r = e.querySelector(".ubits-calendar__month-dropdown"), x = e.querySelector(".ubits-calendar__year-dropdown");
      if (r) {
        const l = r._scrollbarInstance;
        l && l.destroy && l.destroy();
      }
      if (x) {
        const l = x._scrollbarInstance;
        l && l.destroy && l.destroy();
      }
      e.parentElement && e.parentElement.removeChild(e);
    }
  };
}
export {
  P as createCalendar,
  F as renderCalendar
};
