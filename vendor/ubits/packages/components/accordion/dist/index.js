function y(o, t = "regular") {
  const c = t === "solid" ? "fas" : "far", a = o.startsWith("fa-") ? o : `fa-${o}`;
  return `<i class="${c} ${a}"></i>`;
}
function v(o, t, c) {
  const {
    variant: a = "list",
    chevronPosition: n = "right",
    showIcons: e = !0
  } = t, i = a === "boxed", r = n === "left", s = n === "right", l = [
    "ubits-accordion-item",
    i && "ubits-accordion-item--boxed"
  ].filter(Boolean).join(" "), u = r || s ? `<i class="far fa-chevron-down ubits-accordion-chevron" data-chevron-id="${c}"></i>` : "", b = e && o.icon ? `<span class="ubits-accordion-icon">${y(o.icon, o.iconStyle || "regular")}</span>` : "", h = r ? `${u}${b}<div class="ubits-accordion-header-content"><span class="ubits-accordion-title">${o.title}</span>${o.subHeader ? `<span class="ubits-accordion-subheader">${o.subHeader}</span>` : ""}</div>` : `${b}<div class="ubits-accordion-header-content"><span class="ubits-accordion-title">${o.title}</span>${o.subHeader ? `<span class="ubits-accordion-subheader">${o.subHeader}</span>` : ""}</div>${u}`, f = o.content ? `<div class="ubits-accordion-body-content">${o.content}</div>` : "";
  return `
    <div class="${l}" data-accordion-id="${c}">
      <div class="ubits-accordion-header" data-header-id="${c}">
        ${h}
      </div>
      <div class="ubits-accordion-body" data-body-id="${c}">
        ${f}
      </div>
    </div>
  `;
}
function $(o) {
  const {
    items: t,
    variant: c = "list",
    chevronPosition: a = "right",
    className: n = ""
  } = o, e = [
    "ubits-accordion",
    `ubits-accordion--${c}`,
    `ubits-accordion--chevron-${a}`,
    n
  ].filter(Boolean).join(" "), i = t.map((r) => v(r, o, r.id)).join("");
  return `<div class="${e}" data-allow-multiple="${o.allowMultiple || !1}">
    ${i}
  </div>`;
}
function g(o, t) {
  const c = typeof o == "string" ? document.querySelector(o) : o;
  if (!c)
    return console.error("❌ [createAccordion] Container no encontrado:", o), null;
  const a = $(t);
  c.innerHTML = a;
  const n = c.querySelector(".ubits-accordion");
  return n ? (p(n, t), n) : (console.error("❌ [createAccordion] Accordion no se renderizó correctamente"), null);
}
function p(o, t) {
  const c = t.allowMultiple || !1;
  (t.defaultOpen || []).forEach((e) => {
    const i = o.querySelector(`[data-body-id="${e}"]`), r = o.querySelector(`[data-header-id="${e}"]`), s = o.querySelector(`[data-chevron-id="${e}"]`);
    i && r && s && (i.style.display = "block", r.classList.add("ubits-accordion-header--open"), s.style.transform = "rotate(180deg)");
  }), o.querySelectorAll(".ubits-accordion-header").forEach((e) => {
    e.addEventListener("click", (i) => {
      i.stopPropagation();
      const r = e.getAttribute("data-header-id");
      if (!r) return;
      const s = o.querySelector(`[data-body-id="${r}"]`), l = o.querySelector(`[data-chevron-id="${r}"]`);
      if (!s || !l) return;
      const u = s.style.display === "block";
      if (!c && !u) {
        const b = o.querySelectorAll(".ubits-accordion-body"), h = o.querySelectorAll(".ubits-accordion-header"), f = o.querySelectorAll(".ubits-accordion-chevron");
        b.forEach((d) => {
          d !== s && (d.style.display = "none");
        }), h.forEach((d) => {
          d !== e && d.classList.remove("ubits-accordion-header--open");
        }), f.forEach((d) => {
          d !== l && (d.style.transform = "rotate(0deg)");
        });
      }
      u ? (s.style.display = "none", e.classList.remove("ubits-accordion-header--open"), l.style.transform = "rotate(0deg)") : (s.style.display = "block", e.classList.add("ubits-accordion-header--open"), l.style.transform = "rotate(180deg)");
    });
  });
}
export {
  g as createAccordion,
  $ as renderAccordion
};
