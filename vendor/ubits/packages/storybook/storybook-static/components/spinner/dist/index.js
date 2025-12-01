function p(n = {}) {
  const {
    size: s = "md",
    variant: t = "primary",
    animated: r = !0,
    label: e,
    fullScreen: l = !1,
    className: a = "",
    style: i = ""
  } = n, c = [
    "ubits-spinner",
    `ubits-spinner--${s}`,
    `ubits-spinner--${t}`,
    r ? "ubits-spinner--animated" : "",
    l ? "ubits-spinner--fullscreen" : "",
    a
  ].filter(Boolean).join(" "), u = i ? ` style="${i}"` : "";
  return `
    <div class="${c}"${u}>
      <div class="ubits-spinner__circle">
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
      </div>
      ${e ? `<span class="ubits-spinner__label">${e}</span>` : ""}
    </div>
  `.trim();
}
function v(n = {}) {
  const s = document.createElement("div");
  return s.innerHTML = p(n), s.querySelector(".ubits-spinner");
}
export {
  v as createSpinner,
  p as renderSpinner
};
