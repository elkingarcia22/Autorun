function m(t) {
  const {
    label: l,
    complementaryText: b,
    value: c = "",
    name: e = "",
    checked: n = !1,
    indeterminate: a = !1,
    size: h = "md",
    state: i = "default",
    disabled: s = !1,
    className: u = ""
  } = t, o = s || i === "disabled", r = [
    "ubits-checkbox",
    `ubits-checkbox--${h}`,
    i !== "default" ? `ubits-checkbox--${i}` : "",
    n ? "ubits-checkbox--checked" : "",
    a ? "ubits-checkbox--indeterminate" : "",
    o ? "ubits-checkbox--disabled" : "",
    u
  ].filter(Boolean).join(" "), d = `
    <input
      type="checkbox"
      id="checkbox-${e}-${c || "default"}"
      ${e ? `name="${e}"` : ""}
      ${c ? `value="${c}"` : ""}
      ${n ? "checked" : ""}
      ${a ? 'data-indeterminate="true"' : ""}
      ${o ? "disabled" : ""}
      class="ubits-checkbox__input"
    />
  `, k = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${a ? '<span class="ubits-checkbox__indeterminate"></span>' : ""}
      ${n && !a ? '<span class="ubits-checkbox__checkmark"></span>' : ""}
      ${!n && !a && i === "active" ? '<span class="ubits-checkbox__checkmark"></span>' : ""}
    </span>
  `, p = `
    <span class="ubits-checkbox__label">${l}</span>
  `, x = b ? `<span class="ubits-checkbox__complementary-text">${b}</span>` : "", $ = `
    <div class="ubits-checkbox__text-content">
      ${p}
      ${x}
    </div>
  `;
  return `
    <label class="${r}">
      ${d}
      ${k}
      ${$}
    </label>
  `.trim();
}
function f(t) {
  const l = t.containerId ? document.getElementById(t.containerId) : document.body;
  if (!l)
    throw new Error(`Container with id "${t.containerId}" not found`);
  const b = m(t), c = document.createElement("div");
  c.innerHTML = b.trim();
  const e = c.firstElementChild;
  if (!e)
    throw new Error("Failed to create checkbox element");
  l.appendChild(e);
  const n = e.querySelector(".ubits-checkbox__input");
  return n && (t.indeterminate && (n.indeterminate = !0), t.onChange && n.addEventListener("change", t.onChange)), {
    element: e,
    destroy: () => {
      e.parentNode && e.parentNode.removeChild(e);
    },
    update: (i) => {
      const s = { ...t, ...i }, u = m(s), o = document.createElement("div");
      o.innerHTML = u.trim();
      const r = o.firstElementChild;
      if (r && e.parentNode) {
        e.parentNode.replaceChild(r, e);
        const d = r.querySelector(".ubits-checkbox__input");
        d && (s.indeterminate && (d.indeterminate = !0), s.onChange && d.addEventListener("change", s.onChange));
      }
    }
  };
}
export {
  f as createCheckbox,
  m as renderCheckbox
};
