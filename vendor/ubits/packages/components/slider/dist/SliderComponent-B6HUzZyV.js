import { createSlider as n } from "./index.js";
class h extends HTMLElement {
  constructor() {
    super(...arguments), this.sliderInstance = null;
  }
  static get observedAttributes() {
    return [
      "container-id",
      "label",
      "helper-text",
      "size",
      "state",
      "orientation",
      "mode",
      "min",
      "max",
      "step",
      "value",
      "values",
      "show-inputs",
      "show-label",
      "show-helper",
      "show-marks",
      "marks"
    ];
  }
  connectedCallback() {
    this.updateOptions(), this.render();
  }
  attributeChangedCallback() {
    this.updateOptions(), this.render();
  }
  updateOptions() {
    const t = this.getAttribute("container-id") || this.id || `ubits-slider-${Math.random().toString(36).substr(2, 9)}`;
    if (!document.getElementById(t)) {
      const e = document.createElement("div");
      e.id = t, this.appendChild(e);
    }
    let s;
    const i = this.getAttribute("values");
    if (i)
      try {
        const e = JSON.parse(i);
        Array.isArray(e) && e.length === 2 && (s = [e[0], e[1]]);
      } catch (e) {
        console.warn("UBITS Slider: Error parsing values", e);
      }
    let r;
    const a = this.getAttribute("marks");
    if (a)
      try {
        r = JSON.parse(a);
      } catch (e) {
        console.warn("UBITS Slider: Error parsing marks", e);
      }
    this.options = {
      containerId: t,
      label: this.getAttribute("label") || "",
      helperText: this.getAttribute("helper-text") || "",
      size: this.getAttribute("size") || "md",
      state: this.getAttribute("state") || "default",
      orientation: this.getAttribute("orientation") || "horizontal",
      mode: this.getAttribute("mode") || "single",
      min: this.hasAttribute("min") ? parseFloat(this.getAttribute("min") || "0") : 0,
      max: this.hasAttribute("max") ? parseFloat(this.getAttribute("max") || "100") : 100,
      step: this.hasAttribute("step") ? parseFloat(this.getAttribute("step") || "1") : 1,
      value: this.hasAttribute("value") ? parseFloat(this.getAttribute("value") || "50") : 50,
      values: s || [25, 75],
      showInputs: this.hasAttribute("show-inputs") ? this.getAttribute("show-inputs") !== "false" : !1,
      showLabel: this.hasAttribute("show-label") ? this.getAttribute("show-label") !== "false" : !0,
      showHelper: this.hasAttribute("show-helper") ? this.getAttribute("show-helper") !== "false" : !1,
      showMarks: this.hasAttribute("show-marks") ? this.getAttribute("show-marks") !== "false" : !1,
      marks: r || []
    };
  }
  render() {
    const t = document.getElementById(this.options.containerId);
    t && (t.innerHTML = "", this.sliderInstance = n({
      ...this.options,
      onChange: (s, i) => {
        this.setAttribute("value", s.toString()), this.dispatchEvent(new CustomEvent("ubits-slider-change", {
          bubbles: !0,
          detail: { value: s }
        }));
      },
      onRangeChange: (s, i) => {
        this.setAttribute("values", JSON.stringify(s)), this.dispatchEvent(new CustomEvent("ubits-slider-range-change", {
          bubbles: !0,
          detail: { values: s }
        }));
      }
    }));
  }
  // Métodos públicos
  getValue() {
    return this.sliderInstance?.getValue() || (this.options.mode === "range" ? [25, 75] : 50);
  }
  setValue(t) {
    this.sliderInstance && (this.sliderInstance.setValue(t), this.options.mode === "range" && Array.isArray(t) ? this.setAttribute("values", JSON.stringify(t)) : typeof t == "number" && this.setAttribute("value", t.toString()));
  }
  disable() {
    this.sliderInstance && (this.sliderInstance.disable(), this.setAttribute("state", "disabled"));
  }
  enable() {
    this.sliderInstance && (this.sliderInstance.enable(), this.setAttribute("state", "default"));
  }
  setState(t) {
    this.sliderInstance && (this.sliderInstance.setState(t), this.setAttribute("state", t));
  }
}
typeof window < "u" && !customElements.get("ubits-slider") && customElements.define("ubits-slider", h);
export {
  h as UBITSSlider
};
