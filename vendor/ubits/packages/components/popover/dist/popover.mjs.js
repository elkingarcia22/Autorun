const x = {
  sm: "240px",
  md: "360px",
  lg: "400px",
  xl: "480px"
};
function g(r) {
  const {
    title: a,
    bodyContent: p = "",
    width: f = "md",
    tailPosition: d = "top",
    tailOffset: e = 0,
    footerButtons: n,
    className: c = ""
  } = r, v = x[f] || x.md, t = `ubits-popover--width-${f}`, u = `ubits-popover--tail-${d}`, b = [
    "ubits-popover",
    t,
    u,
    c
  ].filter(Boolean).join(" "), m = `
    <div class="ubits-popover__tail" style="${d === "top" || d === "bottom" ? `left: ${e ? `calc(50% + ${e}px)` : "50%"};` : `top: ${e ? `calc(50% + ${e}px)` : "50%"};`}">
      <div class="ubits-popover__tail-inner"></div>
    </div>
  `, _ = a ? `
    <div class="ubits-popover__header">
      <div class="ubits-popover__header-title">
        <p class="ubits-body-md-semibold">${a}</p>
      </div>
    </div>
  ` : "", o = `
    <div class="ubits-popover__body">
      <div class="ubits-popover__body-content">
        ${typeof p == "function" ? p() : p || '<div class="ubits-popover__placeholder">Contenido del popover</div>'}
      </div>
      <div class="ubits-popover__scrollbar">
        <div class="ubits-popover__scrollbar-bar"></div>
      </div>
    </div>
  `, i = n ? `
    <div class="ubits-popover__footer">
      <div class="ubits-popover__footer-actions${n.tertiary ? "" : " ubits-popover__footer-actions--no-tertiary"}">
        ${n.tertiary ? `
        <div class="ubits-popover__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${n.tertiary.label}</span>
          </button>
        </div>
        ` : ""}
        <div class="ubits-popover__footer-right">
          ${n.secondary ? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${n.secondary.label}</span>
          </button>
          ` : ""}
          ${n.primary ? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${n.primary.label}</span>
          </button>
          ` : ""}
        </div>
      </div>
    </div>
  ` : "";
  return `
    <div class="${b}" style="width: ${v};">
      ${m}
      <div class="ubits-popover__content">
        ${_}
        ${o}
        ${i}
      </div>
    </div>
  `.trim();
}
function P(r) {
  const {
    containerId: a,
    onClose: p,
    closeOnOutsideClick: f = !0,
    open: d = !1,
    position: e,
    referenceElement: n
  } = r;
  let c;
  a ? c = document.getElementById(a) || document.body : c = document.body;
  const v = document.createElement("div");
  v.innerHTML = g(r);
  const t = v.firstElementChild;
  if (!t)
    throw new Error("No se pudo crear el popover");
  if (e) {
    t.style.position = "fixed";
    const o = r.tailPosition || "top";
    o === "top" || o === "bottom" ? (e.left !== void 0 && (t.style.left = `${e.left}px`, t.style.transform = "translateX(-50%)"), e.top !== void 0 && (t.style.top = `${e.top}px`)) : o === "left" ? (e.top !== void 0 && (t.style.top = `${e.top}px`, t.style.transform = "translateY(-50%)"), e.left !== void 0 && (t.style.left = `${e.left}px`)) : o === "right" && (e.top !== void 0 && (t.style.top = `${e.top}px`, t.style.transform = "translateY(-50%)"), e.left !== void 0 && (t.style.left = `${e.left}px`));
  }
  const u = () => {
    if (t.classList.add("ubits-popover--open"), e) {
      t.style.position = "fixed";
      const o = r.tailPosition || "top";
      o === "top" || o === "bottom" ? (e.left !== void 0 && (t.style.left = `${e.left}px`, t.style.transform = "translateX(-50%)"), e.top !== void 0 && (t.style.top = `${e.top}px`)) : o === "left" ? (e.top !== void 0 && (t.style.top = `${e.top}px`, t.style.transform = "translateY(-50%)"), e.left !== void 0 && (t.style.left = `${e.left}px`)) : o === "right" && (e.top !== void 0 && (t.style.top = `${e.top}px`, t.style.transform = "translateY(-50%)"), e.left !== void 0 && (t.style.left = `${e.left}px`));
    } else if (n) {
      const o = n.getBoundingClientRect(), i = t.getBoundingClientRect();
      t.style.position = "fixed", t.style.top = `${o.bottom + 8}px`, t.style.left = `${o.left + o.width / 2 - i.width / 2}px`;
    }
  }, b = () => {
    t.classList.remove("ubits-popover--open"), p && p();
  }, m = (o) => {
    const i = t.querySelector(".ubits-popover__body-content");
    if (i) {
      const l = typeof o == "function" ? o() : o;
      i.innerHTML = l;
    }
  }, _ = (o) => {
    const i = r.tailPosition || "top";
    o.top !== void 0 && (t.style.top = `${o.top}px`), o.left !== void 0 && (t.style.left = `${o.left}px`), o.right !== void 0 && (t.style.right = `${o.right}px`), o.bottom !== void 0 && (t.style.bottom = `${o.bottom}px`), i === "top" || i === "bottom" ? o.left !== void 0 && (t.style.transform = "translateX(-50%)") : (i === "left" || i === "right") && o.top !== void 0 && (t.style.transform = "translateY(-50%)");
  };
  let y = () => {
    t.parentElement && t.parentElement.removeChild(t);
  };
  if (f) {
    const o = (l) => {
      const s = l.target;
      if (t.classList.contains("ubits-popover--open") && !t.contains(s)) {
        const $ = s;
        $.closest && $.closest("[data-popover-trigger]") || b();
      }
    };
    document.addEventListener("click", o, !0);
    const i = y;
    y = () => {
      document.removeEventListener("click", o, !0), i();
    };
  }
  if (r.footerButtons) {
    const o = t.querySelector(".ubits-popover__footer-left .ubits-popover__footer-button"), i = t.querySelector(".ubits-popover__footer-right .ubits-button--secondary"), l = t.querySelector(".ubits-popover__footer-right .ubits-button--primary");
    o && r.footerButtons.tertiary?.onClick && o.addEventListener("click", (s) => {
      s.preventDefault(), s.stopPropagation(), r.footerButtons.tertiary.onClick(s);
    }), i && r.footerButtons.secondary?.onClick && i.addEventListener("click", (s) => {
      s.preventDefault(), s.stopPropagation(), r.footerButtons.secondary.onClick(s);
    }), l && r.footerButtons.primary?.onClick && l.addEventListener("click", (s) => {
      s.preventDefault(), s.stopPropagation(), r.footerButtons.primary.onClick(s);
    });
  }
  return c.appendChild(t), d && u(), {
    element: t,
    open: u,
    close: b,
    updateContent: m,
    updatePosition: _,
    destroy: y
  };
}
typeof window < "u" && (window.createPopover = createPopover, window.renderPopover = renderPopover, window.UBITSPopover || (window.UBITSPopover = {}), window.UBITSPopover.createPopover = createPopover, window.UBITSPopover.renderPopover = renderPopover);
export {
  P as createPopover,
  g as renderPopover
};
