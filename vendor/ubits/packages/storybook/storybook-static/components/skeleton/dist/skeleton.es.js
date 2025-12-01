function p(o = {}) {
  const {
    variant: e = "text",
    size: c = "md",
    width: s,
    height: i,
    lines: r = 1,
    animated: a = !0,
    className: d = "",
    style: h = ""
  } = o, n = [
    "ubits-skeleton",
    `ubits-skeleton--${e}`,
    c !== "md" ? `ubits-skeleton--${c}` : "",
    a ? "ubits-skeleton--animated" : "",
    d
  ].filter(Boolean).join(" "), t = [];
  s && (s === "full" ? t.push("width: 100%") : typeof s == "number" ? t.push(`width: ${s}px`) : t.push(`width: ${s}`)), i && (typeof i == "number" ? t.push(`height: ${i}px`) : t.push(`height: ${i}`));
  const u = [...t, h].filter(Boolean).join("; "), l = u ? ` style="${u}"` : "";
  if (e === "text") {
    const $ = Array.from({ length: r }, (m, f) => `<span class="ubits-skeleton__line" style="width: ${f === r - 1 && r > 1 ? "60%" : "100%"}"></span>`).join("");
    return `<div class="${n}"${l}>${$}</div>`;
  }
  return e === "circle" ? `<div class="${n}"${l}></div>` : e === "rectangle" ? `<div class="${n}"${l}></div>` : `<div class="${n}"${l}></div>`;
}
function b(o = {}) {
  const e = document.createElement("div");
  return e.innerHTML = p(o), e.querySelector(".ubits-skeleton");
}
export {
  b as createSkeleton,
  p as renderSkeleton
};
