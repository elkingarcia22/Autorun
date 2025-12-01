const G = [
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
], U = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
function z(g) {
  const b = String(g.getDate()).padStart(2, "0"), y = String(g.getMonth() + 1).padStart(2, "0"), C = g.getFullYear();
  return `${b}/${y}/${C}`;
}
function M(g, b) {
  const y = new Date(g.getFullYear(), g.getMonth(), g.getDate()), C = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return y.getTime() - C.getTime();
}
function k(g, b) {
  return M(g, b) === 0;
}
function V(g, b, y) {
  const C = M(g, b), I = M(y, g);
  return C >= 0 && I >= 0;
}
function j(g) {
  const {
    mode: b = "single",
    selectedDate: y,
    endDate: C,
    minDate: I,
    maxDate: H,
    initialDate: T = /* @__PURE__ */ new Date(),
    className: A = "",
    style: $ = ""
  } = g, B = T, s = B.getFullYear(), h = B.getMonth(), m = new Date(s, h, 1), _ = new Date(s, h + 1, 0).getDate(), N = m.getDay(), q = (/* @__PURE__ */ new Date()).toDateString(), v = [
    "ubits-calendar",
    b === "range" ? "ubits-calendar--range" : "ubits-calendar--single",
    A
  ].filter(Boolean).join(" "), P = $ ? ` style="${$}"` : "", Y = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${G[h]}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__year-input" value="${s}" readonly style="cursor: pointer;">
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
      ${U.map((D) => `<div class="ubits-calendar__weekday">${D}</div>`).join("")}
    </div>
  `;
  let w = '<div class="ubits-calendar__days">';
  for (let D = 0; D < N; D++)
    w += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
  for (let D = 1; D <= _; D++) {
    const d = new Date(s, h, D), E = d.toDateString() === q;
    let i = ["ubits-calendar__day"];
    b === "single" && y && k(d, y) && i.push("ubits-calendar__day--selected"), b === "range" && y && (C ? k(d, y) ? i.push("ubits-calendar__day--range-start") : k(d, C) ? i.push("ubits-calendar__day--range-end") : V(d, y, C) && i.push("ubits-calendar__day--in-range") : k(d, y) && i.push("ubits-calendar__day--range-start")), E && i.push("ubits-calendar__day--today");
    let l = !1;
    I && M(d, I) < 0 && (l = !0, i.push("ubits-calendar__day--disabled")), H && M(d, H) > 0 && (l = !0, i.push("ubits-calendar__day--disabled"));
    const r = l ? " disabled" : "", f = z(d);
    w += `<button type="button" class="${i.join(" ")}" data-date="${f}"${r}>${D}</button>`;
  }
  return w += "</div>", `
    <div class="${v}"${P}>
      ${Y}
      ${L}
      ${w}
    </div>
  `.trim();
}
function J(g) {
  const {
    mode: b = "single",
    selectedDate: y,
    endDate: C,
    minDate: I,
    maxDate: H,
    initialDate: T = /* @__PURE__ */ new Date(),
    onDateSelect: A,
    onRangeSelect: $
  } = g, B = document.createElement("div");
  B.innerHTML = j(g);
  const s = B.firstElementChild;
  if (!s)
    throw new Error("No se pudo crear el calendario");
  let h = new Date(T), m = y ? new Date(y) : null, x = C ? new Date(C) : null;
  const _ = () => {
    s.innerHTML = j({
      ...g,
      mode: b,
      selectedDate: m,
      endDate: x,
      minDate: I,
      maxDate: H,
      initialDate: h
    }), N();
  }, N = () => {
    setTimeout(() => {
      const d = s.querySelector(".ubits-calendar__header"), o = s.querySelector(".ubits-calendar__nav-button--prev"), E = s.querySelector(".ubits-calendar__nav-button--next"), i = s.querySelector(".ubits-calendar__month-year");
      if (d && o && E && i) {
        console.log("🔍 [Calendar Header] ========== DIAGNÓSTICO ESPACIADO ==========");
        const l = window.getComputedStyle(d);
        console.log("📐 Header - Estilos computados:"), console.log("  display:", l.display), console.log("  flexDirection:", l.flexDirection), console.log("  justifyContent:", l.justifyContent), console.log("  alignItems:", l.alignItems), console.log("  gap:", l.gap), console.log("  padding:", l.padding), console.log("  paddingLeft:", l.paddingLeft), console.log("  paddingRight:", l.paddingRight), console.log("  paddingTop:", l.paddingTop), console.log("  paddingBottom:", l.paddingBottom), console.log("  width:", l.width), console.log("  margin:", l.margin), console.log("  marginLeft:", l.marginLeft), console.log("  marginRight:", l.marginRight);
        const r = d.getBoundingClientRect(), f = o.getBoundingClientRect(), t = E.getBoundingClientRect(), e = i.getBoundingClientRect();
        console.log("📏 Header - Dimensiones:"), console.log("  width:", r.width, "px"), console.log("  height:", r.height, "px"), console.log("  left:", r.left, "px"), console.log("  right:", r.right, "px"), console.log("📏 Botón Prev - Dimensiones:"), console.log("  width:", f.width, "px"), console.log("  height:", f.height, "px"), console.log("  left:", f.left, "px"), console.log("  right:", f.right, "px"), console.log("📏 Contenedor Mes/Año - Dimensiones:"), console.log("  width:", e.width, "px"), console.log("  height:", e.height, "px"), console.log("  left:", e.left, "px"), console.log("  right:", e.right, "px"), console.log("📏 Botón Next - Dimensiones:"), console.log("  width:", t.width, "px"), console.log("  height:", t.height, "px"), console.log("  left:", t.left, "px"), console.log("  right:", t.right, "px");
        const n = e.left - f.right, c = t.left - e.right;
        console.log("📏 Distancias:"), console.log("  Botón Prev → Inputs:", n.toFixed(2), "px"), console.log("  Inputs → Botón Next:", c.toFixed(2), "px");
        const p = window.getComputedStyle(o), u = window.getComputedStyle(E);
        console.log("🔘 Botón Prev - Estilos:"), console.log("  margin:", p.margin), console.log("  marginLeft:", p.marginLeft), console.log("  marginRight:", p.marginRight), console.log("  width:", p.width), console.log("  flexShrink:", p.flexShrink), console.log("  flexGrow:", p.flexGrow), console.log("🔘 Botón Next - Estilos:"), console.log("  margin:", u.margin), console.log("  marginLeft:", u.marginLeft), console.log("  marginRight:", u.marginRight), console.log("  width:", u.width), console.log("  flexShrink:", u.flexShrink), console.log("  flexGrow:", u.flexGrow);
        const a = window.getComputedStyle(i);
        console.log("📦 Contenedor Mes/Año - Estilos:"), console.log("  margin:", a.margin), console.log("  marginLeft:", a.marginLeft), console.log("  marginRight:", a.marginRight), console.log("  width:", a.width), console.log("  flex:", a.flex), console.log("  flexShrink:", a.flexShrink), console.log("  flexGrow:", a.flexGrow), console.log("🔍 [Calendar Header] ========== FIN DIAGNÓSTICO ==========");
      } else
        console.error("❌ [Calendar Header] Elementos no encontrados:", {
          header: !!d,
          prevBtn: !!o,
          nextBtn: !!E,
          monthYearContainer: !!i
        });
    }, 100);
    const v = s.querySelector(".ubits-calendar__nav-button--prev"), P = s.querySelector(".ubits-calendar__nav-button--next"), F = s.querySelector(".ubits-calendar__month-input"), Y = s.querySelector(".ubits-calendar__year-input"), L = s.querySelector(".ubits-calendar__month-dropdown"), w = s.querySelector(".ubits-calendar__year-dropdown");
    v?.addEventListener("click", () => {
      h.setMonth(h.getMonth() - 1), _();
    }), P?.addEventListener("click", () => {
      h.setMonth(h.getMonth() + 1), _();
    }), F?.addEventListener("click", (d) => {
      if (d.stopPropagation(), L) {
        const o = L;
        if (o.style.display === "block")
          o.style.display = "none";
        else {
          w && (w.style.display = "none");
          const i = G.map((t, e) => ({
            label: t,
            value: e,
            selected: e === h.getMonth()
          })), l = `month-list-${Date.now()}`, r = `month-scrollbar-${Date.now()}`, f = `
            <div style="position: relative; width: 100%;">
              <div id="${l}" class="ubits-list" role="list" style="max-height: 200px; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none;">
                ${i.map((t, e) => `
                  <div class="ubits-list-item ubits-list-item--sm ${t.selected ? "ubits-list-item--active" : ""}" 
                       role="listitem" 
                       data-value="${t.value}" 
                       style="cursor: pointer;">
                    ${t.label}
                  </div>
                `).join("")}
              </div>
              <div id="${r}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; pointer-events: none;"></div>
            </div>
            <style>
              #${l}::-webkit-scrollbar { display: none; }
            </style>
          `;
          o.innerHTML = f, o.style.display = "block", requestAnimationFrame(async () => {
            console.log("📅 [Calendar] ========== CREANDO SCROLLBAR PARA MESES ==========");
            const t = document.getElementById(l), e = document.getElementById(r);
            if (console.log("📅 [Calendar] List element encontrado:", !!t, t?.id), console.log("📅 [Calendar] Scrollbar container encontrado:", !!e, e?.id), !t) {
              console.error("❌ [Calendar] listElement no encontrado con id:", l);
              return;
            }
            if (!e) {
              console.error("❌ [Calendar] scrollbarContainer no encontrado con id:", r);
              return;
            }
            if (console.log("📅 [Calendar] List scrollHeight:", t.scrollHeight), console.log("📅 [Calendar] List clientHeight:", t.clientHeight), console.log("📅 [Calendar] Necesita scroll?", t.scrollHeight > t.clientHeight), t.scrollHeight > t.clientHeight) {
              console.log("📅 [Calendar] ✅ Scroll necesario, creando scrollbar UBITS...");
              try {
                const n = typeof window.createScrollbarLocal == "function";
                console.log("📅 [Calendar] createScrollbarLocal disponible?", n);
                let c = null;
                if (n)
                  console.log("📅 [Calendar] Usando createScrollbarLocal global"), c = window.createScrollbarLocal;
                else {
                  console.log("📅 [Calendar] Intentando importar ScrollProvider...");
                  try {
                    c = (await import("../../scroll/src/ScrollProvider.js")).createScrollbar, console.log("📅 [Calendar] ScrollProvider importado:", !!c);
                  } catch (a) {
                    console.error("❌ [Calendar] Error importando ScrollProvider:", a);
                  }
                }
                if (!c) {
                  console.error("❌ [Calendar] No se encontró función createScrollbar");
                  return;
                }
                const p = t.clientHeight;
                if (e.style.height = `${p}px`, console.log("📅 [Calendar] Altura del contenedor ajustada a:", p), !e || !t) {
                  console.error("❌ [Calendar] Elementos perdidos antes de crear scrollbar");
                  return;
                }
                let u = null;
                if (n) {
                  console.log("📅 [Calendar] Llamando createScrollbarLocal con firma:", 'createScrollbarLocal(element, container, "vertical")'), console.log("📅 [Calendar] listElement:", !!t, t?.id), console.log("📅 [Calendar] scrollbarContainer:", !!e, e?.id);
                  try {
                    u = c(t, e, "vertical"), console.log("📅 [Calendar] Scrollbar instance creada:", !!u, u), setTimeout(() => {
                      const a = e.querySelector(".ubits-scrollbar"), S = e.querySelector(".ubits-scrollbar__bar");
                      a && S && (a.style.display = "flex", S.style.opacity = "0.6", S.style.pointerEvents = "auto", console.log("📅 [Calendar] Estilos inline aplicados al scrollbar de meses"));
                    }, 50);
                  } catch (a) {
                    throw console.error("❌ [Calendar] Error al llamar createScrollbarLocal:", a), a;
                  }
                } else
                  console.log("📅 [Calendar] Llamando createScrollbar con opciones"), u = c({
                    orientation: "vertical",
                    targetId: l,
                    containerId: r
                  }), console.log("📅 [Calendar] Scrollbar instance creada:", !!u, u);
                u && e ? (e.style.pointerEvents = "auto", o._scrollbarInstance = u, console.log("✅ [Calendar] Scrollbar UBITS creado correctamente para meses")) : console.warn("⚠️ [Calendar] Scrollbar instance no se creó correctamente");
              } catch (n) {
                console.error("❌ [Calendar] Error creando scrollbar para lista de meses:", n), console.error("❌ [Calendar] Stack:", n.stack);
              }
            } else
              console.log("📅 [Calendar] ⚠️ No se necesita scroll (contenido cabe en el contenedor)");
            console.log("📅 [Calendar] ========== FIN CREACIÓN SCROLLBAR MESES ==========");
          }), o.querySelectorAll(".ubits-list-item").forEach((t) => {
            t.addEventListener("click", (e) => {
              e.stopPropagation();
              const n = parseInt(e.currentTarget.dataset.value || "0");
              if (h.setMonth(n), o._scrollbarInstance) {
                try {
                  o._scrollbarInstance.destroy();
                } catch {
                }
                delete o._scrollbarInstance;
              }
              o.style.display = "none", _();
            });
          });
        }
      }
    }), Y?.addEventListener("click", (d) => {
      if (d.stopPropagation(), w) {
        const o = w;
        if (o.style.display === "block")
          o.style.display = "none";
        else {
          L && (L.style.display = "none");
          const i = h.getFullYear(), l = Array.from({ length: 100 }, (e, n) => {
            const c = i - 50 + n;
            return {
              label: String(c),
              value: c,
              selected: c === i
            };
          }), r = `year-list-${Date.now()}`, f = `year-scrollbar-${Date.now()}`, t = `
            <div style="position: relative; width: 100%;">
              <div id="${r}" class="ubits-list" role="list" style="max-height: 200px; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none;">
                ${l.map((e) => `
                  <div class="ubits-list-item ubits-list-item--sm ${e.selected ? "ubits-list-item--active" : ""}" 
                       role="listitem" 
                       data-value="${e.value}" 
                       style="cursor: pointer;">
                    ${e.label}
                  </div>
                `).join("")}
              </div>
              <div id="${f}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; pointer-events: none;"></div>
            </div>
            <style>
              #${r}::-webkit-scrollbar { display: none; }
            </style>
          `;
          o.innerHTML = t, o.style.display = "block", requestAnimationFrame(async () => {
            console.log("📅 [Calendar] ========== CREANDO SCROLLBAR PARA AÑOS ==========");
            const e = document.getElementById(r), n = document.getElementById(f);
            if (console.log("📅 [Calendar] Year list element encontrado:", !!e, e?.id), console.log("📅 [Calendar] Year scrollbar container encontrado:", !!n, n?.id), !e) {
              console.error("❌ [Calendar] listElement no encontrado con id:", r);
              return;
            }
            if (!n) {
              console.error("❌ [Calendar] scrollbarContainer no encontrado con id:", f);
              return;
            }
            if (console.log("📅 [Calendar] Year list scrollHeight:", e.scrollHeight), console.log("📅 [Calendar] Year list clientHeight:", e.clientHeight), console.log("📅 [Calendar] Necesita scroll?", e.scrollHeight > e.clientHeight), e.scrollHeight > e.clientHeight) {
              console.log("📅 [Calendar] ✅ Scroll necesario, creando scrollbar UBITS...");
              try {
                const c = typeof window.createScrollbarLocal == "function";
                console.log("📅 [Calendar] createScrollbarLocal disponible?", c);
                let p = null;
                if (c)
                  console.log("📅 [Calendar] Usando createScrollbarLocal global"), p = window.createScrollbarLocal;
                else {
                  console.log("📅 [Calendar] Intentando importar ScrollProvider...");
                  try {
                    p = (await import("../../scroll/src/ScrollProvider.js")).createScrollbar, console.log("📅 [Calendar] ScrollProvider importado:", !!p);
                  } catch (S) {
                    console.error("❌ [Calendar] Error importando ScrollProvider:", S);
                  }
                }
                if (!p) {
                  console.error("❌ [Calendar] No se encontró función createScrollbar");
                  return;
                }
                const u = e.clientHeight;
                if (n.style.height = `${u}px`, console.log("📅 [Calendar] Altura del contenedor ajustada a:", u), !n || !e) {
                  console.error("❌ [Calendar] Elementos perdidos antes de crear scrollbar");
                  return;
                }
                let a = null;
                if (c) {
                  console.log("📅 [Calendar] Llamando createScrollbarLocal con firma:", 'createScrollbarLocal(element, container, "vertical")'), console.log("📅 [Calendar] listElement:", !!e, e?.id), console.log("📅 [Calendar] scrollbarContainer:", !!n, n?.id);
                  try {
                    a = p(e, n, "vertical"), console.log("📅 [Calendar] Year scrollbar instance creada:", !!a, a), setTimeout(() => {
                      const S = n.querySelector(".ubits-scrollbar"), R = n.querySelector(".ubits-scrollbar__bar");
                      S && R && (S.style.display = "flex", R.style.opacity = "0.6", R.style.pointerEvents = "auto", console.log("📅 [Calendar] Estilos inline aplicados al scrollbar de años"));
                    }, 50);
                  } catch (S) {
                    throw console.error("❌ [Calendar] Error al llamar createScrollbarLocal:", S), S;
                  }
                } else
                  console.log("📅 [Calendar] Llamando createScrollbar con opciones"), a = p({
                    orientation: "vertical",
                    targetId: r,
                    containerId: f
                  }), console.log("📅 [Calendar] Year scrollbar instance creada:", !!a, a);
                a && n ? (n.style.pointerEvents = "auto", o._scrollbarInstance = a, console.log("✅ [Calendar] Scrollbar UBITS creado correctamente para años")) : console.warn("⚠️ [Calendar] Scrollbar instance no se creó correctamente");
              } catch (c) {
                console.error("❌ [Calendar] Error creando scrollbar para lista de años:", c), console.error("❌ [Calendar] Stack:", c.stack);
              }
            } else
              console.log("📅 [Calendar] ⚠️ No se necesita scroll para años (contenido cabe en el contenedor)");
            console.log("📅 [Calendar] ========== FIN CREACIÓN SCROLLBAR AÑOS ==========");
          }), o.querySelectorAll(".ubits-list-item").forEach((e) => {
            e.addEventListener("click", (n) => {
              n.stopPropagation();
              const c = parseInt(String(n.currentTarget.dataset.value || i));
              if (h.setFullYear(c), o._scrollbarInstance) {
                try {
                  o._scrollbarInstance.destroy();
                } catch {
                }
                delete o._scrollbarInstance;
              }
              o.style.display = "none", _();
            });
          });
        }
      }
    }), document.addEventListener("click", () => {
      L && (L.style.display = "none"), w && (w.style.display = "none");
    }), s.querySelectorAll(".ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)").forEach((d) => {
      d.addEventListener("click", () => {
        const o = d.dataset.date || "", [E, i, l] = o.split("/"), r = new Date(parseInt(l), parseInt(i) - 1, parseInt(E));
        b === "single" ? (m = r, _(), A && A(r)) : b === "range" && (!m || m && x ? (m = r, x = null, _()) : m && !x && (M(r, m) < 0 ? (x = m, m = r) : x = r, _(), $ && m && x && $(m, x)));
      });
    });
  };
  return _(), {
    element: s,
    update: (v) => {
      v.selectedDate !== void 0 && (m = v.selectedDate ? new Date(v.selectedDate) : null), v.endDate !== void 0 && (x = v.endDate ? new Date(v.endDate) : null), v.initialDate && (h = new Date(v.initialDate)), Object.assign(g, v), _();
    },
    destroy: () => {
      s.parentElement && s.parentElement.removeChild(s);
    }
  };
}
export {
  J as createCalendar,
  j as renderCalendar
};
