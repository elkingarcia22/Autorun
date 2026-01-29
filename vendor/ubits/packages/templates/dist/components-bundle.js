(function() {
  "use strict";
  function renderIconHelper$i(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderAccordionItem(item, options, itemId) {
    const { variant = "list", chevronPosition = "right", showIcons = true } = options;
    const isBoxed = variant === "boxed";
    const chevronLeft = chevronPosition === "left";
    const chevronRight = chevronPosition === "right";
    const itemClasses = ["ubits-accordion-item", isBoxed && "ubits-accordion-item--boxed"].filter(Boolean).join(" ");
    const chevronHTML = chevronLeft || chevronRight ? `<i class="far fa-chevron-down ubits-accordion-chevron" data-chevron-id="${itemId}"></i>` : "";
    const iconHTML = showIcons && item.icon ? `<span class="ubits-accordion-icon">${renderIconHelper$i(item.icon, item.iconStyle || "regular")}</span>` : "";
    const headerContent = chevronLeft ? `${chevronHTML}${iconHTML}<div class="ubits-accordion-header-content"><span class="ubits-accordion-title">${item.title}</span>${item.subHeader ? `<span class="ubits-accordion-subheader">${item.subHeader}</span>` : ""}</div>` : `${iconHTML}<div class="ubits-accordion-header-content"><span class="ubits-accordion-title">${item.title}</span>${item.subHeader ? `<span class="ubits-accordion-subheader">${item.subHeader}</span>` : ""}</div>${chevronHTML}`;
    const bodyContent = item.content ? `<div class="ubits-accordion-body-content">${item.content}</div>` : "";
    return `
    <div class="${itemClasses}" data-accordion-id="${itemId}">
      <div class="ubits-accordion-header" data-header-id="${itemId}">
        ${headerContent}
      </div>
      <div class="ubits-accordion-body" data-body-id="${itemId}">
        ${bodyContent}
      </div>
    </div>
  `;
  }
  function renderAccordion(options) {
    const { items, variant = "list", chevronPosition = "right", className = "" } = options;
    const accordionClasses = [
      "ubits-accordion",
      `ubits-accordion--${variant}`,
      `ubits-accordion--chevron-${chevronPosition}`,
      className
    ].filter(Boolean).join(" ");
    const itemsHTML = items.map((item) => renderAccordionItem(item, options, item.id)).join("");
    return `<div class="${accordionClasses}" data-allow-multiple="${options.allowMultiple || false}">
    ${itemsHTML}
  </div>`;
  }
  function createAccordion(container, options) {
    const target = typeof container === "string" ? document.querySelector(container) : container;
    if (!target) {
      console.error("❌ [createAccordion] Container no encontrado:", container);
      return null;
    }
    const html = renderAccordion(options);
    target.innerHTML = html;
    const accordionElement = target.querySelector(".ubits-accordion");
    if (!accordionElement) {
      console.error("❌ [createAccordion] Accordion no se renderizó correctamente");
      return null;
    }
    initAccordion(accordionElement, options);
    return accordionElement;
  }
  function initAccordion(element, options) {
    const allowMultiple = options.allowMultiple || false;
    const defaultOpen = options.defaultOpen || [];
    defaultOpen.forEach((id) => {
      const body = element.querySelector(`[data-body-id="${id}"]`);
      const header = element.querySelector(`[data-header-id="${id}"]`);
      const chevron = element.querySelector(`[data-chevron-id="${id}"]`);
      if (body && header && chevron) {
        body.style.display = "block";
        header.classList.add("ubits-accordion-header--open");
        chevron.style.transform = "rotate(180deg)";
      }
    });
    const headers = element.querySelectorAll(".ubits-accordion-header");
    headers.forEach((header) => {
      header.addEventListener("click", (e) => {
        e.stopPropagation();
        const headerId = header.getAttribute("data-header-id");
        if (!headerId) return;
        const body = element.querySelector(`[data-body-id="${headerId}"]`);
        const chevron = element.querySelector(`[data-chevron-id="${headerId}"]`);
        if (!body || !chevron) return;
        const isOpen = body.style.display === "block";
        if (!allowMultiple && !isOpen) {
          const allBodies = element.querySelectorAll(".ubits-accordion-body");
          const allHeaders = element.querySelectorAll(".ubits-accordion-header");
          const allChevrons = element.querySelectorAll(".ubits-accordion-chevron");
          allBodies.forEach((b) => {
            if (b !== body) b.style.display = "none";
          });
          allHeaders.forEach((h) => {
            if (h !== header) h.classList.remove("ubits-accordion-header--open");
          });
          allChevrons.forEach((c) => {
            if (c !== chevron) c.style.transform = "rotate(0deg)";
          });
        }
        if (isOpen) {
          body.style.display = "none";
          header.classList.remove("ubits-accordion-header--open");
          chevron.style.transform = "rotate(0deg)";
        } else {
          body.style.display = "block";
          header.classList.add("ubits-accordion-header--open");
          chevron.style.transform = "rotate(180deg)";
        }
      });
    });
  }
  const Accordion = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createAccordion,
    renderAccordion
  }, Symbol.toStringTag, { value: "Module" }));
  const iconMap$1 = {
    success: "fa-check-circle",
    info: "fa-info-circle",
    warning: "fa-exclamation-triangle",
    error: "fa-times-circle"
  };
  function renderIconHelper$h(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderAlert(options = {}) {
    const { type = "success", message = "", closable = true, className = "" } = options;
    const iconClass = iconMap$1[type] || iconMap$1.success;
    const classes = [
      "ubits-alert",
      `ubits-alert--${type}`,
      !closable && "ubits-alert--no-close",
      className
    ].filter(Boolean).join(" ");
    return `
    <div class="${classes}" role="alert" aria-live="polite">
      <div class="ubits-alert__icon">
        ${renderIconHelper$h(iconClass, "regular")}
      </div>
      <div class="ubits-alert__content">
        <div class="ubits-alert__text">${message}</div>
      </div>
      ${closable ? `
        <button class="ubits-alert__close" aria-label="Cerrar alerta">
          ${renderIconHelper$h("fa-times", "regular")}
        </button>
      ` : ""}
    </div>
  `.trim();
  }
  function createAlert(options = {}) {
    const div = document.createElement("div");
    div.innerHTML = renderAlert(options);
    const alert2 = div.querySelector(".ubits-alert");
    if (!alert2) {
      throw new Error("Failed to create alert element");
    }
    if (options.closable !== false) {
      const closeButton = alert2.querySelector(".ubits-alert__close");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          if (options.onClose) {
            options.onClose();
          }
          alert2.classList.add("ubits-alert--closing");
          setTimeout(() => {
            if (alert2.parentNode) {
              alert2.parentNode.removeChild(alert2);
            }
          }, 300);
        });
      }
    }
    if (options.duration && options.duration > 0) {
      setTimeout(() => {
        const closeBtn = alert2.querySelector(".ubits-alert__close");
        if (closeBtn) {
          closeBtn.click();
        } else {
          alert2.classList.add("ubits-alert--closing");
          setTimeout(() => {
            if (alert2.parentNode) {
              alert2.parentNode.removeChild(alert2);
            }
            if (options.onClose) {
              options.onClose();
            }
          }, 300);
        }
      }, options.duration);
    }
    const parent = alert2.parentElement;
    if (parent) {
      parent.replaceChild(alert2, parent);
    }
    return alert2;
  }
  function showAlert(type, message, options = {}) {
    const containerId = options.container ? void 0 : options.containerId;
    const container = options.container || (containerId ? document.getElementById(containerId || "") : document.body);
    if (!container) {
      console.error("Alert container not found:", containerId);
      return null;
    }
    const alert2 = createAlert({
      type,
      message,
      ...options,
      container
    });
    container.appendChild(alert2);
    return alert2;
  }
  class UBITSAlert extends HTMLElement {
    constructor() {
      super(...arguments);
      this.options = {};
      this.closeTimeout = null;
    }
    static get observedAttributes() {
      return ["type", "message", "closable", "duration"];
    }
    connectedCallback() {
      this.updateOptions();
      this.render();
      this.attachEventListeners();
      this.setupAutoClose();
    }
    attributeChangedCallback() {
      this.updateOptions();
      this.render();
      this.attachEventListeners();
      this.setupAutoClose();
    }
    disconnectedCallback() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
    }
    updateOptions() {
      this.options = {
        type: this.getAttribute("type") || "success",
        message: this.getAttribute("message") || this.textContent?.trim() || "",
        closable: this.getAttribute("closable") !== "false",
        duration: this.getAttribute("duration") ? parseInt(this.getAttribute("duration") || "0", 10) : 0,
        className: this.getAttribute("class") || ""
      };
    }
    render() {
      this.innerHTML = renderAlert(this.options);
      this.setAttribute("role", "alert");
      this.setAttribute("aria-live", "polite");
    }
    attachEventListeners() {
      const closeButton = this.querySelector(".ubits-alert__close");
      if (closeButton) {
        const newCloseButton = closeButton.cloneNode(true);
        closeButton.parentNode?.replaceChild(newCloseButton, closeButton);
        newCloseButton.addEventListener("click", () => {
          this.close();
        });
      }
    }
    setupAutoClose() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      if (this.options.duration && this.options.duration > 0) {
        this.closeTimeout = window.setTimeout(() => {
          this.close();
        }, this.options.duration);
      }
    }
    /**
     * Cierra el alert con animación
     */
    close() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      this.classList.add("ubits-alert--closing");
      setTimeout(() => {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
        this.dispatchEvent(
          new CustomEvent("alert-closed", {
            bubbles: true,
            detail: { type: this.options.type }
          })
        );
      }, 300);
    }
    /**
     * Actualiza el mensaje del alert
     */
    updateMessage(newMessage) {
      this.options.message = newMessage;
      const textElement = this.querySelector(".ubits-alert__text");
      if (textElement) {
        textElement.textContent = newMessage;
      }
    }
    /**
     * Actualiza el tipo del alert
     */
    updateType(newType) {
      this.options.type = newType;
      this.setAttribute("type", newType);
      this.render();
      this.attachEventListeners();
    }
  }
  if (typeof window !== "undefined" && !customElements.get("ubits-alert")) {
    customElements.define("ubits-alert", UBITSAlert);
  }
  const AlertComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    UBITSAlert
  }, Symbol.toStringTag, { value: "Module" }));
  class AlertAddon {
    constructor() {
      this.name = "@ubits/alert";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-alert")) {
        customElements.define("ubits-alert", UBITSAlert);
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.Alert = {
          render: (options) => {
            const { renderAlert: renderAlert2 } = require("./AlertProvider");
            return renderAlert2(options);
          },
          create: (options) => {
            const { createAlert: createAlert2 } = require("./AlertProvider");
            return createAlert2(options);
          },
          show: (type, message, options) => {
            const { showAlert: showAlert2 } = require("./AlertProvider");
            return showAlert2(type, message, options);
          }
        };
      }
      console.log("✅ Alert add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined" && window.UBITS?.Alert) {
        delete window.UBITS.Alert;
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-alert",
          tag: "ubits-alert",
          documentation: "https://ubits.design/components/alert"
        }
      ];
    }
    getStyles() {
      return ["./styles/alert.css"];
    }
  }
  if (typeof window !== "undefined") {
    Promise.resolve().then(() => AlertComponent).then(() => {
      console.log("✅ UBITS Alert component registered");
    });
  }
  const Alert = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AlertAddon,
    UBITSAlert,
    createAlert,
    renderAlert,
    showAlert
  }, Symbol.toStringTag, { value: "Module" }));
  function renderBadgeForAvatar(options) {
    if (typeof window.renderBadge === "function") {
      return window.renderBadge(options);
    }
    const { type, size, variant, absolute, position, className, content } = options;
    const classes = [
      "ubits-badge",
      `ubits-badge--${size}`,
      type === "dot" ? "ubits-badge--dot" : "",
      type === "number" ? "ubits-badge--number" : "",
      `ubits-badge--${variant}`,
      absolute ? "ubits-badge--absolute" : "",
      absolute && position ? `ubits-badge--absolute-${position}` : "",
      className
    ].filter(Boolean).join(" ");
    const badgeContent = type === "number" && content !== void 0 && content !== null ? String(content) : "";
    return `<span class="${classes}">${badgeContent}</span>`;
  }
  const AVATAR_SIZES = {
    xs: 20,
    sm: 28,
    md: 36,
    // 36px
    lg: 40
    // 40px
  };
  const BADGE_SIZE = "md";
  const BADGE_VARIANTS = {
    green: "success",
    red: "error",
    blue: "info",
    orange: "warning",
    gray: "primary"
  };
  const ICON_PADDING = {
    xs: 6,
    sm: 8,
    md: 10,
    lg: 10
  };
  const INITIALS_FONT_SIZE = {
    xs: "var(--font-body-xs-size, 11px)",
    sm: "var(--font-body-sm-size, 13px)",
    md: "var(--font-body-md-size, 16px)",
    lg: "var(--font-body-lg-size, 18px)"
  };
  function getAvatarVariant(options) {
    if (options.imageUrl) return "photo";
    if (options.initials) return "initials";
    return "icon";
  }
  function generateInitials(text) {
    const words = text.trim().split(/\s+/);
    if (words.length === 0) return "";
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  function renderAvatar(options = {}) {
    const {
      imageUrl,
      initials,
      icon = "user",
      size = "md",
      badgeColor,
      badgeContent,
      alt = "Avatar",
      className = "",
      onClick
    } = options;
    const variant = getAvatarVariant(options);
    const avatarSize = AVATAR_SIZES[size] || AVATAR_SIZES.md;
    const iconPadding = ICON_PADDING[size] || ICON_PADDING.md;
    const initialsFontSize = INITIALS_FONT_SIZE[size] || INITIALS_FONT_SIZE.md;
    const classes = ["ubits-avatar", `ubits-avatar--${size}`, `ubits-avatar--${variant}`, className].filter(Boolean).join(" ");
    const avatarStyles = `
    width: ${avatarSize}px;
    height: ${avatarSize}px;
    min-width: ${avatarSize}px;
    min-height: ${avatarSize}px;
  `.trim();
    let avatarContent = "";
    if (variant === "photo" && imageUrl) {
      avatarContent = `<div class="ubits-avatar-image-container"><img src="${imageUrl}" alt="${alt}" class="ubits-avatar-image" /></div>`;
    } else if (variant === "initials") {
      const displayInitials = initials ? generateInitials(initials) : "";
      avatarContent = `<span class="ubits-avatar-initials" style="font-size: ${initialsFontSize};">${displayInitials}</span>`;
    } else {
      const iconSize = avatarSize - iconPadding * 2;
      avatarContent = `<i class="far fa-${icon}" style="font-size: ${iconSize}px;"></i>`;
    }
    const badgeHTML = badgeColor ? renderBadgeForAvatar({
      type: badgeContent !== void 0 && badgeContent !== null && badgeContent !== "" ? "number" : "dot",
      size: BADGE_SIZE,
      variant: BADGE_VARIANTS[badgeColor] || "success",
      absolute: true,
      position: "bottom-right",
      className: "ubits-avatar-badge-wrapper",
      content: badgeContent
    }) : "";
    return `
    <div class="${classes}" style="${avatarStyles}" ${onClick ? 'role="button" tabindex="0"' : ""} data-variant="${variant}">
      ${avatarContent}
      ${badgeHTML}
    </div>
  `.trim();
  }
  function createAvatar(options = {}) {
    const div = document.createElement("div");
    div.innerHTML = renderAvatar(options);
    const avatar = div.querySelector(".ubits-avatar");
    if (options.onClick && avatar) {
      avatar.addEventListener("click", options.onClick);
      avatar.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          options.onClick?.(e);
        }
      });
    }
    return avatar;
  }
  if (typeof window !== "undefined") {
    window.createAvatar = createAvatar;
    window.renderAvatar = renderAvatar;
  }
  const Avatar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createAvatar,
    renderAvatar
  }, Symbol.toStringTag, { value: "Module" }));
  function renderBadge(options = {}) {
    const {
      content,
      size = "md",
      type,
      variant = "primary",
      style,
      absolute = false,
      position = "top-right",
      className = "",
      label,
      showLabel = false,
      labelTypography = "ubits-body-md-regular"
    } = options;
    const badgeType = type || (content !== void 0 && content !== null && content !== "" ? "number" : "dot");
    const classes = [
      "ubits-badge",
      size !== "md" ? `ubits-badge--${size}` : "",
      badgeType === "dot" ? "ubits-badge--dot" : "",
      badgeType === "number" ? "ubits-badge--number" : "",
      `ubits-badge--${variant}`,
      style ? `ubits-badge--${style}` : "",
      absolute ? `ubits-badge--absolute` : "",
      absolute && position ? `ubits-badge--absolute-${position}` : "",
      className
    ].filter(Boolean).join(" ");
    const badgeContent = badgeType === "number" && content !== void 0 && content !== null ? String(content) : "";
    const needsDot = style && ["light", "neutral", "bold"].includes(style);
    let badgeInnerContent = "";
    if (needsDot) {
      const variantColors = {
        primary: "var(--modifiers-normal-color-light-feedback-accent-error)",
        secondary: "var(--modifiers-normal-color-light-fg-1-medium)",
        success: "var(--modifiers-normal-color-light-feedback-accent-success)",
        warning: "var(--modifiers-normal-color-light-feedback-accent-warning)",
        error: "var(--modifiers-normal-color-light-feedback-accent-error)",
        info: "var(--modifiers-normal-color-light-feedback-accent-info)"
      };
      const normalizedVariant = String(variant || "primary").toLowerCase().trim();
      const dotColor = variantColors[normalizedVariant] || variantColors["primary"];
      const textColor = style === "bold" ? dotColor : "var(--modifiers-normal-color-light-bg-1)";
      const dotBgColor = style === "bold" ? "var(--modifiers-normal-color-light-bg-1)" : dotColor;
      if (badgeType === "number" && badgeContent) {
        const numberDotSize = size === "xs" ? "18px" : size === "sm" ? "20px" : size === "md" ? "22px" : "24px";
        if (style === "bold") {
          const fontSize = size === "xs" ? "10px" : size === "sm" ? "11px" : size === "md" ? "12px" : "13px";
          const dotHtml = `<span class="ubits-badge__dot ubits-badge__dot--number" style="width: ${numberDotSize}; height: ${numberDotSize}; min-width: ${numberDotSize}; background-color: var(--modifiers-normal-color-light-bg-1); border-radius: 50%; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; margin-right: 0; padding: 0; margin: 0; box-sizing: border-box; position: relative;"><span class="ubits-badge__number-inner" style="display: block !important; line-height: 1 !important; font-size: ${fontSize} !important; font-weight: 600 !important; color: ${dotColor} !important; text-align: center !important; margin: 0 !important; padding: 0 !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; box-sizing: border-box !important;">${badgeContent}</span></span>`;
          badgeInnerContent = dotHtml;
        } else {
          const fontSize = size === "xs" ? "10px" : size === "sm" ? "11px" : size === "md" ? "12px" : "13px";
          const dotHtml = `<span class="ubits-badge__dot ubits-badge__dot--number" style="width: ${numberDotSize}; height: ${numberDotSize}; min-width: ${numberDotSize}; background-color: ${dotBgColor}; border-radius: 50%; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; margin-right: 0; color: ${textColor}; font-size: ${fontSize}; font-weight: 600; line-height: 1; padding: 0; margin: 0;">${badgeContent}</span>`;
          badgeInnerContent = dotHtml;
        }
      } else {
        const dotSize = size === "xs" ? "6px" : size === "sm" ? "7px" : size === "md" ? "8px" : "10px";
        const finalDotBgColor = style === "bold" ? "var(--modifiers-normal-color-light-bg-1)" : dotBgColor;
        const finalColor = style === "bold" ? "var(--modifiers-normal-color-light-bg-1)" : finalDotBgColor;
        const dotHtml = `<span class="ubits-badge__dot" style="width: ${dotSize}; height: ${dotSize}; background-color: ${finalColor}; background: ${finalColor}; border-radius: 50%; flex-shrink: 0; display: inline-block; margin-right: 0;"></span>`;
        badgeInnerContent = dotHtml;
      }
    } else {
      badgeInnerContent = badgeType === "dot" ? "" : badgeContent;
    }
    const badgeHtml = `<span class="${classes}">${badgeInnerContent}</span>`;
    if (style && ["light", "neutral", "bold"].includes(style)) {
      if (showLabel) {
        const labelText = label || badgeContent || "";
        if (labelText) {
          const labelColor = style === "bold" ? 'style="color: var(--ubits-fg-on-accent, #ffffff) !important;"' : "";
          const finalHtml2 = `<div class="ubits-badge-wrapper">
          ${badgeHtml}
          <span class="${labelTypography}" ${labelColor}>${labelText}</span>
        </div>`;
          return finalHtml2;
        }
      }
      const finalHtml = `<div class="ubits-badge-wrapper">
      ${badgeHtml}
    </div>`;
      return finalHtml;
    }
    if (label && showLabel) {
      return `<div class="ubits-badge-wrapper">
      ${badgeHtml}
      <span class="${labelTypography}">${label}</span>
    </div>`;
    }
    return badgeHtml;
  }
  function renderButtonBadge() {
    return '<span class="ubits-button__badge"></span>';
  }
  function createBadge(options = {}) {
    const div = document.createElement("div");
    div.innerHTML = renderBadge(options);
    return div.querySelector(".ubits-badge");
  }
  const Badge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createBadge,
    renderBadge,
    renderButtonBadge
  }, Symbol.toStringTag, { value: "Module" }));
  function renderList(options) {
    const { items, size = "md", maxHeight = "400px", className = "", attributes = {} } = options;
    const containerClasses = ["ubits-list", className].filter(Boolean).join(" ");
    const containerAttrs = Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
    let listHTML = `<div class="${containerClasses}" role="list" style="max-height: ${maxHeight};" ${containerAttrs}>`;
    items.forEach((item, index) => {
      const itemId = item.value || `list-item-${index}`;
      const itemState = item.state || (item.selected ? "active" : "default");
      const itemClasses = [
        "ubits-list-item",
        `ubits-list-item--${size}`,
        itemState !== "default" ? `ubits-list-item--${itemState}` : ""
      ].filter(Boolean).join(" ");
      const itemAttrs = [];
      if (item.selected) {
        itemAttrs.push('aria-selected="true"');
      }
      if (itemState === "disabled") {
        itemAttrs.push('aria-disabled="true"');
      } else {
        itemAttrs.push('tabindex="0"');
      }
      itemAttrs.push(`data-value="${itemId}"`);
      itemAttrs.push(`data-index="${index}"`);
      if (item.attributes) {
        Object.entries(item.attributes).forEach(([key, value]) => {
          itemAttrs.push(`${key}="${value}"`);
        });
      }
      listHTML += `
      <div class="${itemClasses}" role="listitem" ${itemAttrs.join(" ")}>
        ${item.label}
      </div>
    `;
    });
    listHTML += "</div>";
    return listHTML;
  }
  function createList(options) {
    const { containerId, items, size = "md", onSelectionChange, multiple = false } = options;
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    const listHTML = renderList(options);
    container.innerHTML = listHTML;
    const listElement = container.querySelector(".ubits-list");
    if (!listElement) {
      throw new Error("Failed to create list element");
    }
    const listItems = listElement.querySelectorAll(".ubits-list-item");
    let selectedIndex = null;
    listItems.forEach((itemEl, index) => {
      const item = items[index];
      if (!item) return;
      if (item.state !== "disabled") {
        itemEl.addEventListener("click", () => {
          if (item.onClick) {
            item.onClick(item, index);
          }
          if (!multiple) {
            if (selectedIndex !== null && selectedIndex !== index) {
              const prevItem = listItems[selectedIndex];
              prevItem.classList.remove("ubits-list-item--active");
              prevItem.removeAttribute("aria-selected");
            }
            if (selectedIndex !== index) {
              itemEl.classList.add("ubits-list-item--active");
              itemEl.setAttribute("aria-selected", "true");
              selectedIndex = index;
              if (onSelectionChange) {
                onSelectionChange(item, index);
              }
            } else {
              itemEl.classList.remove("ubits-list-item--active");
              itemEl.removeAttribute("aria-selected");
              selectedIndex = null;
              if (onSelectionChange) {
                onSelectionChange(null, null);
              }
            }
          } else {
            const isSelected = itemEl.classList.contains("ubits-list-item--active");
            if (isSelected) {
              itemEl.classList.remove("ubits-list-item--active");
              itemEl.removeAttribute("aria-selected");
            } else {
              itemEl.classList.add("ubits-list-item--active");
              itemEl.setAttribute("aria-selected", "true");
            }
            if (onSelectionChange) {
              const selectedItems = Array.from(listItems).map((el, idx) => {
                if (el.classList.contains("ubits-list-item--active")) {
                  return { item: items[idx], index: idx };
                }
                return null;
              }).filter(Boolean);
              if (selectedItems.length > 0) {
                const last = selectedItems[selectedItems.length - 1];
                onSelectionChange(last.item, last.index);
              } else {
                onSelectionChange(null, null);
              }
            }
          }
        });
      }
      if (item.state !== "disabled") {
        itemEl.addEventListener("keydown", (e) => {
          const currentIndex = index;
          let targetIndex = null;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            targetIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            targetIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            itemEl.click();
            return;
          } else if (e.key === "Home") {
            e.preventDefault();
            targetIndex = 0;
          } else if (e.key === "End") {
            e.preventDefault();
            targetIndex = items.length - 1;
          }
          if (targetIndex !== null) {
            const targetItem = listItems[targetIndex];
            if (targetItem && items[targetIndex]?.state !== "disabled") {
              targetItem.focus();
              targetItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
          }
        });
      }
    });
    return listElement;
  }
  function renderSpinner(options = {}) {
    const {
      size = "md",
      variant = "primary",
      animated = true,
      label,
      fullScreen = false,
      className = "",
      style = ""
    } = options;
    const classes = [
      "ubits-spinner",
      `ubits-spinner--${size}`,
      `ubits-spinner--${variant}`,
      animated ? "ubits-spinner--animated" : "",
      fullScreen ? "ubits-spinner--fullscreen" : "",
      className
    ].filter(Boolean).join(" ");
    const styleAttr = style ? ` style="${style}"` : "";
    const spinnerHTML = `
    <div class="${classes}"${styleAttr}>
      <div class="ubits-spinner__circle">
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
      </div>
      ${label ? `<span class="ubits-spinner__label">${label}</span>` : ""}
    </div>
  `;
    return spinnerHTML.trim();
  }
  function createSpinner(options = {}) {
    const div = document.createElement("div");
    div.innerHTML = renderSpinner(options);
    return div.querySelector(".ubits-spinner");
  }
  function renderIconHelper$g(iconName, iconStyle = "regular") {
    try {
      const iconClass = iconStyle === "solid" ? "fas" : "far";
      const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
      return `<i class="${iconClass} ${name}"></i>`;
    } catch (e) {
      const iconClass = iconStyle === "solid" ? "fas" : "far";
      const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
      return `<i class="${iconClass} ${name}"></i>`;
    }
  }
  function renderButton(options) {
    const {
      variant = "primary",
      size = "md",
      text = "",
      icon,
      iconStyle = "regular",
      iconOnly = false,
      disabled = false,
      loading = false,
      loadingText,
      badge = false,
      active = false,
      fullWidth = false,
      block = false,
      iconPosition = "left",
      className = "",
      attributes = {},
      dropdown = false,
      showTooltip = false,
      tooltipText = ""
    } = options;
    const classes = [
      "ubits-button",
      `ubits-button--${variant}`,
      `ubits-button--${size}`,
      active && "ubits-button--active",
      iconOnly && "ubits-button--icon-only",
      loading && "ubits-button--loading",
      fullWidth && "ubits-button--full-width",
      block && "ubits-button--block",
      iconPosition === "right" && "ubits-button--icon-right",
      dropdown && "ubits-button--dropdown",
      className
    ].filter(Boolean).join(" ");
    const attrs = [
      disabled && "disabled",
      loading && 'data-loading="true"',
      loading && 'aria-busy="true"',
      ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
    ].filter(Boolean).join(" ");
    let iconHTML = "";
    if (icon) {
      iconHTML = renderIconHelper$g(icon, iconStyle);
    }
    let finalIconHTML = iconHTML;
    let finalIconPosition = iconPosition;
    if (dropdown && !icon && text) {
      finalIconHTML = renderIconHelper$g("chevron-down", iconStyle);
      finalIconPosition = "right";
    } else if (dropdown && icon && iconPosition === "left" && text) {
      finalIconHTML = `${iconHTML}${renderIconHelper$g("chevron-down", iconStyle)}`;
    } else if (dropdown && !text) {
      finalIconHTML = icon ? `${iconHTML}${renderIconHelper$g("chevron-down", iconStyle)}` : renderIconHelper$g("chevron-down", iconStyle);
    }
    const spinnerSizeMap = {
      xs: "xs",
      sm: "sm",
      md: "sm",
      lg: "md",
      xl: "lg"
    };
    const spinnerSize = spinnerSizeMap[size] || "sm";
    const spinnerVariantMap = {
      primary: "primary",
      secondary: "secondary",
      tertiary: "secondary",
      active: "primary"
    };
    const spinnerVariant = spinnerVariantMap[variant] || "primary";
    const spinnerHTML = loading ? renderSpinner({
      size: spinnerSize,
      variant: spinnerVariant,
      animated: true,
      className: "ubits-button__spinner"
    }) : "";
    let content = "";
    if (loading && loadingText) {
      content = `${spinnerHTML}<span class="button-text">${loadingText}</span>`;
    } else if (loading && !text) {
      content = spinnerHTML;
    } else if (loading && text) {
      if (iconPosition === "right") {
        content = `<span class="button-text">${text}</span>${spinnerHTML}`;
      } else {
        content = `${spinnerHTML}<span class="button-text">${text}</span>`;
      }
    } else if (iconOnly && icon) {
      content = iconHTML;
    } else if (finalIconHTML && text) {
      if (dropdown && icon && iconPosition === "left") {
        content = `${renderIconHelper$g(icon, iconStyle)}<span>${text}</span>${renderIconHelper$g("chevron-down", iconStyle)}`;
      } else if (finalIconPosition === "right") {
        content = `<span>${text}</span>${finalIconHTML}`;
      } else {
        content = `${finalIconHTML}<span>${text}</span>`;
      }
    } else if (text) {
      content = dropdown ? `<span>${text}</span>${renderIconHelper$g("chevron-down", iconStyle)}` : `<span>${text}</span>`;
    } else if (finalIconHTML) {
      content = finalIconHTML;
    }
    const badgeHTML = badge ? '<span class="ubits-button__badge"></span>' : "";
    const titleAttr = iconOnly && showTooltip && tooltipText ? `title="${tooltipText}"` : "";
    return `
    <button class="${classes}" ${attrs} ${titleAttr}>
      ${content}
      ${badgeHTML}
    </button>
  `.trim();
  }
  function createButton(options) {
    const div = document.createElement("div");
    div.style.position = "relative";
    div.style.display = "inline-block";
    div.innerHTML = renderButton(options);
    const button = div.querySelector("button");
    if (!button) {
      throw new Error("Failed to create button element");
    }
    if (options.onClick) {
      button.addEventListener("click", options.onClick);
    }
    if (options.dropdown && options.dropdownOptions && options.dropdownOptions.length > 0) {
      const dropdownContainer = document.createElement("div");
      dropdownContainer.className = "ubits-button-dropdown-container";
      dropdownContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      margin-top: 4px;
      display: none;
      min-width: 100%;
    `;
      div.appendChild(dropdownContainer);
      const listSize = options.size === "xs" ? "xs" : options.size === "sm" ? "sm" : options.size === "md" ? "md" : "lg";
      const listItems = options.dropdownOptions.map((option) => ({
        label: option.label,
        state: "default",
        value: option.value || option.label,
        selected: false
      }));
      let isOpen = false;
      const toggleDropdown = () => {
        if (isOpen) {
          dropdownContainer.style.display = "none";
          isOpen = false;
          return;
        }
        const listId = `button-dropdown-${Math.random().toString(36).substr(2, 9)}`;
        dropdownContainer.id = listId;
        dropdownContainer.innerHTML = "";
        try {
          createList({
            containerId: listId,
            items: listItems,
            size: listSize,
            maxHeight: "200px",
            onSelectionChange: (selectedItem, index) => {
              if (selectedItem && options.dropdownOptions && options.dropdownOptions[index]) {
                const option = options.dropdownOptions[index];
                if (option.onClick) {
                  option.onClick(new MouseEvent("click"), {
                    label: selectedItem.label,
                    value: selectedItem.value
                  });
                }
                dropdownContainer.style.display = "none";
                isOpen = false;
              }
            }
          });
        } catch (error) {
          console.warn("Using renderList fallback for button dropdown:", error);
          const listHTML = renderList({
            items: listItems,
            size: listSize,
            maxHeight: "200px"
          });
          dropdownContainer.innerHTML = listHTML;
          const listItemsElements = dropdownContainer.querySelectorAll(".ubits-list-item");
          listItemsElements.forEach((itemEl, idx) => {
            const item = listItems[idx];
            if (item && item.state !== "disabled" && options.dropdownOptions && options.dropdownOptions[idx]) {
              itemEl.addEventListener("click", () => {
                const option = options.dropdownOptions[idx];
                if (option.onClick) {
                  option.onClick(new MouseEvent("click"), { label: item.label, value: item.value });
                }
                dropdownContainer.style.display = "none";
                isOpen = false;
              });
            }
          });
        }
        dropdownContainer.style.display = "block";
        isOpen = true;
      };
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!options.disabled && !options.loading) {
          toggleDropdown();
        }
      });
      document.addEventListener("click", (e) => {
        if (!div.contains(e.target)) {
          dropdownContainer.style.display = "none";
          isOpen = false;
        }
      });
    }
    if (options.dropdown) {
      return button;
    }
    return button;
  }
  const COLOR_TOKENS = {
    yellow: "var(--modifiers-normal-color-light-feedback-chart-warning-bold)",
    green: "var(--modifiers-normal-color-light-feedback-accent-success)",
    gray: "var(--modifiers-normal-color-light-bg-4)",
    info: "var(--modifiers-normal-color-light-feedback-chart-info-bold)",
    error: "var(--modifiers-normal-color-light-feedback-accent-error)"
  };
  const PROGRESS_SIZES = {
    xs: { height: 4, indicatorFontSize: "var(--modifiers-normal-body-xs-regular-fontsize)" },
    sm: { height: 8, indicatorFontSize: "var(--modifiers-normal-body-sm-regular-fontsize)" },
    md: { height: 16, indicatorFontSize: "var(--modifiers-normal-body-md-regular-fontsize)" },
    lg: { height: 20, indicatorFontSize: "var(--modifiers-normal-body-lg-regular-fontsize)" }
  };
  function renderProgressBar(options) {
    const {
      size = "md",
      value = 0,
      variant = "default",
      segments = [],
      indicator,
      className = ""
    } = options;
    const sizeConfig = PROGRESS_SIZES[size];
    const classes = [
      "ubits-progress-bar",
      `ubits-progress-bar--${size}`,
      variant === "multi-color" ? "ubits-progress-bar--multi-color" : "",
      className
    ].filter(Boolean).join(" ");
    let indicatorHtml = "";
    if (indicator !== void 0 && indicator !== false) {
      const indicatorText = typeof indicator === "string" ? indicator : `${Math.round(value)}%`;
      indicatorHtml = `<span class="ubits-progress-bar__indicator">${indicatorText}</span>`;
    }
    let progressIndicatorHtml = "";
    if (variant === "multi-color" && segments.length > 0) {
      const totalDefined = segments.reduce((sum, seg) => sum + seg.value, 0);
      const remainder = Math.max(0, 100 - totalDefined);
      const allSegments = [...segments];
      if (remainder > 0) {
        allSegments.push({ value: remainder, color: "gray" });
      }
      const segmentsHtml = allSegments.map((segment, index) => {
        const width = segment.value;
        const color = COLOR_TOKENS[segment.color] || COLOR_TOKENS.gray;
        const isFirst = index === 0;
        const isLast = index === allSegments.length - 1;
        const borderRadius = `border-radius: ${isFirst ? "1000px 0 0 1000px" : isLast ? "0 1000px 1000px 0" : "0"};`;
        return `<div 
        class="ubits-progress-bar__segment" 
        style="width: ${width}%; background-color: ${color}; ${borderRadius}"
        data-color="${segment.color}"
      ></div>`;
      }).join("");
      progressIndicatorHtml = `<div class="ubits-progress-bar__indicator-wrapper">${segmentsHtml}</div>`;
    } else {
      const clampedValue = Math.max(0, Math.min(100, value));
      progressIndicatorHtml = `<div 
      class="ubits-progress-bar__indicator-wrapper" 
      style="width: ${clampedValue}%;"
    ></div>`;
    }
    return `
    <div class="${classes}" style="height: ${sizeConfig.height}px;">
      <div class="ubits-progress-bar__container">
        ${progressIndicatorHtml}
      </div>
      ${indicatorHtml}
    </div>
  `.trim();
  }
  function createProgressBar(options) {
    const { containerId, ...restOptions } = options;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderProgressBar(restOptions);
    const progressBarElement = wrapper.firstElementChild;
    if (!progressBarElement) {
      throw new Error("No se pudo crear el progress bar");
    }
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    container.appendChild(progressBarElement);
    const update = (newOptions) => {
      const updatedOptions = { ...restOptions, ...newOptions };
      const newHtml = renderProgressBar(updatedOptions);
      const newWrapper = document.createElement("div");
      newWrapper.innerHTML = newHtml;
      const newElement = newWrapper.firstElementChild;
      if (newElement && progressBarElement.parentNode) {
        progressBarElement.parentNode.replaceChild(newElement, progressBarElement);
        Object.assign(progressBarElement, newElement);
      }
    };
    const destroy = () => {
      if (progressBarElement.parentNode) {
        progressBarElement.parentNode.removeChild(progressBarElement);
      }
    };
    return {
      element: progressBarElement,
      update,
      destroy
    };
  }
  function calculatePercentage$2(current, total) {
    if (total === 0) return 0;
    return Math.round(current / total * 100);
  }
  function calculateChartRange(barData) {
    if (barData.length === 0) return { max: 100, min: 0 };
    const max = Math.max(...barData);
    const min = Math.min(...barData);
    const roundedMax = Math.ceil(max / 20) * 20;
    const roundedMin = Math.floor(min / 20) * 20;
    return {
      max: roundedMax || 100,
      min: roundedMin || 0
    };
  }
  const BAR_WIDTHS_BY_SIZE = {
    xs: 4,
    // Igual que la altura del progress bar xs
    sm: 8,
    // Igual que la altura del progress bar sm
    md: 16,
    // Igual que la altura del progress bar md
    lg: 20
    // Igual que la altura del progress bar lg
  };
  function renderBarChart(barData, barLabels = [], maxValue, minValue, barColor = "var(--ubits-chart-color-bg-neutral-blue-base)", chartBackgroundColor = "var(--modifiers-normal-color-light-bg-1)", gridLineColor = "var(--modifiers-normal-color-light-border-1)", width = 360, height = 158, showNegativeValues = true, showGridLines = true, size = "md") {
    const dataForRange = showNegativeValues ? barData : barData.filter((v) => v >= 0);
    const range = maxValue !== void 0 && minValue !== void 0 ? { max: maxValue, min: showNegativeValues ? minValue : 0 } : calculateChartRange(dataForRange);
    const { max, min } = range;
    const rangeSize = max - min;
    barData.length;
    const paddingLeft = Math.max(30, Math.min(35, width * 0.08));
    const paddingRight = 4;
    const paddingTop = 8;
    const paddingBottom = 25;
    const chartHeight = height - paddingTop - paddingBottom;
    const zeroY = paddingTop + max / rangeSize * chartHeight;
    const barsToRender = barData.map((value, index) => {
      const displayValue = showNegativeValues ? value : Math.max(0, value);
      const displayIsPositive = displayValue >= 0;
      let barHeightValue;
      if (displayIsPositive) {
        barHeightValue = displayValue / max * (zeroY - paddingTop);
      } else {
        const minAbs = Math.abs(min);
        barHeightValue = Math.abs(displayValue) / minAbs * (paddingTop + chartHeight - zeroY);
      }
      const shouldRender = barHeightValue >= 0.5 && Math.abs(displayValue) >= 0.01;
      return {
        index,
        value: displayValue,
        label: barLabels[index] || `${index + 1}`,
        isPositive: displayIsPositive,
        shouldRender
      };
    });
    const renderableBars = barsToRender.filter((bar) => bar.shouldRender);
    const renderableBarCount = renderableBars.length;
    if (renderableBarCount === 0) {
      return `
      <svg 
        class="ubits-bar-metric-card__chart-svg" 
        width="100%" 
        height="100%" 
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="none"
      >
      </svg>
    `;
    }
    const totalGaps = renderableBarCount - 1;
    const barWidth = BAR_WIDTHS_BY_SIZE[size] || BAR_WIDTHS_BY_SIZE.md;
    const baseGapSize = 6;
    const totalBarsWidth = renderableBarCount * barWidth;
    const totalBaseGapsWidth = totalGaps * baseGapSize;
    const totalBaseUsedWidth = totalBarsWidth + totalBaseGapsWidth;
    const spaceAfterYAxis = 8;
    const adjustedPaddingLeft = paddingLeft + spaceAfterYAxis;
    const adjustedBarsAreaWidth = width - adjustedPaddingLeft - paddingRight;
    const extraSpace = adjustedBarsAreaWidth - totalBaseUsedWidth;
    const gapSize = totalGaps > 0 ? baseGapSize + extraSpace / totalGaps : 0;
    const bars = renderableBars.map((barInfo, renderIndex) => {
      const x = adjustedPaddingLeft + renderIndex * (barWidth + gapSize);
      let barY;
      let barHeightValue;
      if (barInfo.isPositive) {
        barHeightValue = barInfo.value / max * (zeroY - paddingTop);
        barY = zeroY - barHeightValue;
      } else {
        const minAbs = Math.abs(min);
        barHeightValue = Math.abs(barInfo.value) / minAbs * (paddingTop + chartHeight - zeroY);
        barY = zeroY;
      }
      return {
        x,
        y: barY,
        width: barWidth,
        height: barHeightValue,
        value: barInfo.value,
        label: barInfo.label,
        isPositive: barInfo.isPositive,
        index: barInfo.index
        // Agregar index para los logs
      };
    });
    const gridLines = [];
    const gridSteps = 5;
    for (let i = 0; i <= gridSteps; i++) {
      const value = min + rangeSize / gridSteps * i;
      const y = paddingTop + (max - value) / rangeSize * chartHeight;
      gridLines.push({
        y,
        value: Math.round(value)
      });
    }
    const lastBar = bars[bars.length - 1];
    lastBar ? lastBar.x + lastBar.width : 0;
    const firstBar = bars[0];
    firstBar?.x || 0;
    return `
    <svg 
      class="ubits-bar-metric-card__chart-svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 ${width} ${height}"
      preserveAspectRatio="none"
    >
      <!-- Números del eje Y (siempre visibles) -->
      ${gridLines.map(
      (line) => `
        <text
          x="${paddingLeft - 5}"
          y="${line.y + 4}"
          font-family="var(--font-sans)"
          font-size="var(--font-body-sm-size, 13px)"
          font-weight="var(--weight-regular, 400)"
          fill="var(--modifiers-normal-color-light-fg-2-medium)"
          text-anchor="end"
          style="font-size: var(--font-body-sm-size, 13px) !important; font-weight: var(--weight-regular, 400) !important;"
        >${line.value}</text>
      `
    ).join("")}
      
      <!-- Líneas de grilla horizontales (solo si showGridLines está activado) -->
      ${showGridLines ? gridLines.map(
      (line) => `
        <line
          x1="${adjustedPaddingLeft}"
          y1="${line.y}"
          x2="${width - paddingRight}"
          y2="${line.y}"
          stroke="${gridLineColor}"
          stroke-width="1"
          stroke-dasharray="2,2"
          opacity="0.3"
        />
      `
    ).join("") : ""}
      
      <!-- Línea cero si hay valores negativos y positivos -->
      ${showGridLines && min < 0 && max > 0 ? `
        <line
          x1="${adjustedPaddingLeft}"
          y1="${zeroY}"
          x2="${width - paddingRight}"
          y2="${zeroY}"
          stroke="${gridLineColor}"
          stroke-width="1.5"
          opacity="0.6"
        />
      ` : ""}
      
      <!-- Línea vertical del eje Y -->
      ${showGridLines ? `
        <line
          x1="${paddingLeft}"
          y1="${paddingTop}"
          x2="${paddingLeft}"
          y2="${height - paddingBottom}"
          stroke="${gridLineColor}"
          stroke-width="1"
          opacity="0.6"
        />
      ` : ""}
      
      <!-- Barras -->
      ${bars.map((bar) => {
      const rx = bar.width / 2;
      const isPositive = bar.isPositive;
      let path;
      if (isPositive) {
        const x1 = bar.x;
        const y1 = bar.y;
        const x2 = bar.x + bar.width;
        bar.y;
        bar.x + bar.width;
        const y3 = bar.y + bar.height;
        bar.x;
        bar.y + bar.height;
        path = `M ${x1} ${y1 + rx} Q ${x1} ${y1} ${x1 + rx} ${y1} L ${x2 - rx} ${y1} Q ${x2} ${y1} ${x2} ${y1 + rx} L ${x2} ${y3} L ${x1} ${y3} Z`;
      } else {
        const x1 = bar.x;
        const y1 = bar.y;
        const x2 = bar.x + bar.width;
        const y2 = bar.y;
        bar.x + bar.width;
        const y3 = bar.y + bar.height;
        bar.x;
        bar.y + bar.height;
        path = `M ${x1} ${y1} L ${x2} ${y2} L ${x2} ${y3 - rx} Q ${x2} ${y3} ${x2 - rx} ${y3} L ${x1 + rx} ${y3} Q ${x1} ${y3} ${x1} ${y3 - rx} Z`;
      }
      const fillValue = barColor;
      return `
        <g class="ubits-bar-metric-card__bar-group">
          <path
            d="${path}"
            fill="${fillValue}"
            class="ubits-bar-metric-card__bar"
          />
          <text
          x="${bar.x + bar.width / 2}"
          y="${height - 5}"
          font-family="var(--font-sans)"
          font-size="var(--font-body-sm-size, 13px)"
          font-weight="var(--weight-regular, 400)"
          class="ubits-bar-metric-card__bar-label"
          fill="var(--modifiers-normal-color-light-fg-2-medium)"
          text-anchor="middle"
          style="font-size: var(--font-body-sm-size, 13px) !important; font-weight: var(--weight-regular, 400) !important; font-family: var(--font-sans) !important;"
        >${bar.label}</text>
        </g>
      `;
    }).join("")}
    </svg>
  `;
  }
  function renderCategory$2(category, size = "md") {
    const percentage = category.percentage ?? calculatePercentage$2(category.current, category.total);
    const labelClass = size === "sm" ? "ubits-body-sm-regular" : size === "lg" ? "ubits-body-md-regular" : "ubits-body-sm-regular";
    const valueClass = size === "sm" ? "ubits-body-sm-regular" : size === "lg" ? "ubits-body-md-regular" : "ubits-body-sm-regular";
    const percentageClass = size === "sm" ? "ubits-body-md-bold" : size === "lg" ? "ubits-body-md-bold" : "ubits-body-md-bold";
    return `
    <div class="ubits-bar-metric-card__category">
      <div class="ubits-bar-metric-card__category-label ${labelClass}">
        ${category.label}
      </div>
      <div class="ubits-bar-metric-card__category-value ${valueClass}">
        ${category.current}/${category.total} <span class="ubits-bar-metric-card__category-percentage ${percentageClass}">${percentage}%</span>
      </div>
    </div>
  `;
  }
  function renderCategoryWithProgressBar(category, size = "md", barColor = "var(--ubits-chart-color-bg-neutral-blue-base)") {
    const percentage = category.percentage ?? calculatePercentage$2(category.current, category.total);
    const labelClass = size === "sm" ? "ubits-body-sm-regular" : size === "lg" ? "ubits-body-md-regular" : "ubits-body-sm-regular";
    const percentageClass = size === "sm" ? "ubits-body-md-bold" : size === "lg" ? "ubits-body-md-bold" : "ubits-body-md-bold";
    const progressBarSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
    const progressBarHTML = renderProgressBar({
      size: progressBarSize,
      value: percentage,
      variant: "default",
      indicator: false,
      // No usar el indicador por defecto, lo agregaremos manualmente
      className: "ubits-bar-metric-card__progress-bar"
    });
    const indicatorHTML = `<span class="ubits-progress-bar__indicator">${category.current}/${category.total} <span class="${percentageClass}">${percentage}%</span></span>`;
    const progressBarWithIndicator = progressBarHTML.replace(
      /(<\/div>\s*)(<\/div>\s*)$/,
      `$1${indicatorHTML}$2`
    );
    return `
    <div class="ubits-bar-metric-card__category ubits-bar-metric-card__category--with-progress">
      <div class="ubits-bar-metric-card__category-header">
        <div class="ubits-bar-metric-card__category-label ${labelClass}">
          ${category.label}
        </div>
      </div>
      <div class="ubits-bar-metric-card__category-progress-wrapper">
        ${progressBarWithIndicator}
      </div>
    </div>
  `;
  }
  function renderBarMetricCard(options) {
    const {
      title = "Métricas",
      responseCount = 0,
      showResponseCount = false,
      barData = [],
      barLabels = [],
      maxValue,
      minValue,
      categories = [],
      layout = "vertical",
      size = "md",
      showTitle = true,
      showBarChart = true,
      showCategories = true,
      showInfoIcon = true,
      showActionButton = true,
      showNegativeValues = true,
      showGridLines = true,
      barColor = "var(--ubits-chart-color-bg-neutral-blue-base)",
      chartBackgroundColor = "var(--modifiers-normal-color-light-bg-1)",
      gridLineColor = "var(--modifiers-normal-color-light-border-1)",
      className = "",
      attributes = {}
    } = options;
    const classes = [
      "ubits-bar-metric-card",
      `ubits-bar-metric-card--${layout}`,
      `ubits-bar-metric-card--${size}`,
      className
    ].filter(Boolean).join(" ");
    const attrs = [...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)].filter(Boolean).join(" ");
    const cardPadding = 12;
    const baseCardWidth = 392;
    const chartWidth = baseCardWidth - cardPadding * 2;
    const chartHeight = 158;
    const titleClass = "ubits-body-md-bold";
    const infoIconHTML = showInfoIcon ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "circle-info",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Información",
        type: "button"
      }
    }) : "";
    const actionButtonHTML = showActionButton ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "chevron-right",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Ver más",
        type: "button"
      }
    }) : "";
    const responseCountHTML = showResponseCount && responseCount !== void 0 ? `
      <div class="ubits-bar-metric-card__response-count">
        <span class="ubits-body-xs-regular">${responseCount} ${responseCount === 1 ? "respuesta" : "respuestas"}</span>
      </div>
    ` : "";
    const titleHTML = showTitle ? `
      <div class="ubits-bar-metric-card__header">
        <div class="ubits-bar-metric-card__title-group">
          <h3 class="ubits-bar-metric-card__title ${titleClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-bar-metric-card__action-button">${actionButtonHTML}</div>` : ""}
      </div>
      ${responseCountHTML}
    ` : "";
    const resolveColorToken2 = (token) => {
      if (typeof window !== "undefined" && window.document && window.getComputedStyle) {
        try {
          const root = document.documentElement;
          const tokenName = token.replace(/var\(|\)/g, "").trim();
          const resolved = getComputedStyle(root).getPropertyValue(tokenName).trim();
          if (resolved) {
            const cleaned2 = resolved.replace(/\)+$/, "").trim();
            return cleaned2;
          } else {
            const allStyles = Array.from(document.styleSheets);
            let foundValue = null;
            for (const sheet of allStyles) {
              try {
                const rules = Array.from(sheet.cssRules || []);
                for (const rule of rules) {
                  if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
                    const style = rule.style;
                    const value = style.getPropertyValue(tokenName);
                    if (value) {
                      foundValue = value.trim().replace(/\)+$/, "").trim();
                      break;
                    }
                  }
                }
                if (foundValue) break;
              } catch (e) {
              }
            }
            if (foundValue) {
              return foundValue;
            }
          }
        } catch (e) {
        }
      }
      if (token === "var(--ubits-chart-color-bg-neutral-blue-base)") {
        return "#557593";
      }
      const cleaned = token.replace(/\)+$/, "").trim();
      if (cleaned !== token) {
        return cleaned;
      }
      return token;
    };
    let resolvedBarColor = barColor.startsWith("var(") ? resolveColorToken2(barColor) : barColor;
    resolvedBarColor = resolvedBarColor.replace(/\)+$/, "").trim();
    const barChartHTML = showBarChart && barData.length > 0 && layout !== "horizontal" ? (() => {
      const chartHTML = renderBarChart(
        barData,
        barLabels,
        maxValue,
        minValue,
        resolvedBarColor,
        chartBackgroundColor,
        gridLineColor,
        chartWidth,
        chartHeight,
        options.showNegativeValues !== void 0 ? options.showNegativeValues : true,
        options.showGridLines !== void 0 ? options.showGridLines : true,
        size
        // Pasar el tamaño para que las barras tengan el grosor correcto
      );
      return `
          <div class="ubits-bar-metric-card__chart-wrapper" style="background-color: ${chartBackgroundColor};">
            <div class="ubits-bar-metric-card__chart-inner">
              ${chartHTML}
            </div>
          </div>
        `;
    })() : "";
    const categoriesHTML = showCategories && categories.length > 0 ? (() => {
      if (layout === "horizontal") {
        return `
            <div class="ubits-bar-metric-card__categories">
              ${categories.map((cat) => renderCategoryWithProgressBar(cat, size, resolvedBarColor)).join("")}
            </div>
          `;
      } else {
        return `
            <div class="ubits-bar-metric-card__categories">
              ${categories.map((cat) => renderCategory$2(cat, size)).join("")}
            </div>
          `;
      }
    })() : "";
    return `
    <div class="${classes}" ${attrs}>
      ${titleHTML}
      <div class="ubits-bar-metric-card__content">
        ${barChartHTML}
        ${categoriesHTML}
      </div>
    </div>
  `;
  }
  function createBarMetricCard(options) {
    const { containerId, ...cardOptions } = options;
    if (!containerId) {
      console.error("❌ [BarMetricCard] containerId es requerido para createBarMetricCard");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ [BarMetricCard] Contenedor con ID "${containerId}" no encontrado`);
      return null;
    }
    const html = renderBarMetricCard(cardOptions);
    container.innerHTML = html;
    const cardElement = container.querySelector(".ubits-bar-metric-card");
    if (!cardElement) {
      console.error("❌ [BarMetricCard] No se pudo crear el elemento de la tarjeta");
      return null;
    }
    if (cardOptions.onClick) {
      cardElement.addEventListener("click", cardOptions.onClick);
    }
    return cardElement;
  }
  const BarMetricCard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createBarMetricCard,
    renderBarMetricCard
  }, Symbol.toStringTag, { value: "Module" }));
  function renderBreadcrumb(options) {
    const { items, separator = ">", className = "" } = options;
    if (!items || items.length === 0) {
      return '<nav class="ubits-breadcrumb" aria-label="Breadcrumb"></nav>';
    }
    const itemsWithActive = items.map((item, index) => ({
      ...item,
      active: index === items.length - 1
    }));
    const itemsHTML = itemsWithActive.map((item, index) => {
      const isActive = item.active;
      index === itemsWithActive.length - 1;
      const activeClass = isActive ? "ubits-breadcrumb__item--active" : "";
      const disabledClass = item.disabled ? "ubits-breadcrumb__item--disabled" : "";
      const classes = ["ubits-breadcrumb__item", activeClass, disabledClass].filter(Boolean).join(" ");
      const isClickable = !isActive && !item.disabled;
      if (isClickable) {
        if (item.url) {
          return `
          <a 
            href="${item.url}" 
            class="${classes}"
            data-breadcrumb-id="${item.id}"
            ${item.onClick ? 'data-has-click-handler="true"' : ""}
          >
            ${item.label}
          </a>
        `;
        } else {
          return `
          <button 
            class="${classes}"
            data-breadcrumb-id="${item.id}"
            ${item.onClick ? 'data-has-click-handler="true"' : ""}
          >
            ${item.label}
          </button>
        `;
        }
      } else {
        return `
        <span 
          class="${classes}"
          data-breadcrumb-id="${item.id}"
          ${item.disabled ? 'aria-disabled="true"' : ""}
        >
          ${item.label}
        </span>
      `;
      }
    }).join(`<span class="ubits-breadcrumb__separator" aria-hidden="true">${separator}</span>`);
    const containerClasses = ["ubits-breadcrumb", className].filter(Boolean).join(" ");
    return `
    <nav class="${containerClasses}" aria-label="Breadcrumb">
      <ol class="ubits-breadcrumb__list">
        ${itemsHTML}
      </ol>
    </nav>
  `.trim();
  }
  function initBreadcrumbListeners(breadcrumbElement, options) {
    const existingItems = breadcrumbElement.querySelectorAll(
      ".ubits-breadcrumb__item[data-listener-attached]"
    );
    existingItems.forEach((item) => {
      const clonedItem = item.cloneNode(true);
      item.parentNode?.replaceChild(clonedItem, item);
    });
    const items = breadcrumbElement.querySelectorAll(
      ".ubits-breadcrumb__item:not(.ubits-breadcrumb__item--disabled):not(.ubits-breadcrumb__item--active)"
    );
    const handleItemClick = (itemElement, event) => {
      const itemId = itemElement.getAttribute("data-breadcrumb-id");
      const url = itemElement.href;
      if (itemElement.tagName === "A" && url && !itemElement.hasAttribute("data-has-click-handler")) {
        return;
      }
      event.preventDefault();
      const itemConfig = options.items.find((item) => item.id === itemId);
      if (itemConfig && itemConfig.onClick) {
        itemConfig.onClick(event);
      }
      if (options.onItemClick) {
        options.onItemClick(itemId || "", itemElement);
      }
      const customEvent = new CustomEvent("breadcrumbItemClick", {
        detail: { itemId, itemElement }
      });
      document.dispatchEvent(customEvent);
    };
    items.forEach((item) => {
      item.setAttribute("data-listener-attached", "true");
      item.addEventListener("click", (e) => handleItemClick(item, e));
    });
  }
  function createBreadcrumb(options, containerId) {
    const container = containerId ? document.getElementById(containerId) || document.createElement("div") : document.createElement("div");
    if (containerId && !container.id) {
      container.id = containerId;
    }
    container.innerHTML = renderBreadcrumb(options);
    requestAnimationFrame(() => {
      const breadcrumbElement = container.querySelector(".ubits-breadcrumb");
      if (breadcrumbElement) {
        initBreadcrumbListeners(breadcrumbElement, options);
      } else {
        initBreadcrumbListeners(container, options);
      }
    });
    return container;
  }
  const Breadcrumb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createBreadcrumb,
    renderBreadcrumb
  }, Symbol.toStringTag, { value: "Module" }));
  class UBITSButton extends HTMLElement {
    constructor() {
      super(...arguments);
      this.options = {};
    }
    static get observedAttributes() {
      return [
        "variant",
        "size",
        "icon",
        "icon-style",
        "icon-only",
        "disabled",
        "loading",
        "loading-text",
        "badge",
        "active",
        "full-width",
        "block",
        "icon-position",
        "class"
      ];
    }
    connectedCallback() {
      this.updateOptions();
      this.render();
      this.attachEventListeners();
    }
    attributeChangedCallback() {
      this.updateOptions();
      this.render();
    }
    disconnectedCallback() {
    }
    updateOptions() {
      this.options = {
        variant: this.getAttribute("variant") || "primary",
        size: this.getAttribute("size") || "md",
        text: this.textContent?.trim() || "",
        icon: this.getAttribute("icon") || void 0,
        iconStyle: this.getAttribute("icon-style") || "regular",
        iconOnly: this.hasAttribute("icon-only"),
        disabled: this.hasAttribute("disabled") || this.getAttribute("aria-disabled") === "true",
        loading: this.hasAttribute("loading") || this.getAttribute("data-loading") === "true",
        loadingText: this.getAttribute("loading-text") || void 0,
        badge: this.hasAttribute("badge"),
        active: this.hasAttribute("active"),
        fullWidth: this.hasAttribute("full-width"),
        block: this.hasAttribute("block"),
        iconPosition: this.getAttribute("icon-position") || "left",
        className: this.getAttribute("class") || ""
      };
    }
    render() {
      this.innerHTML = renderButton(this.options);
      if (this.options.loading) {
        this.setAttribute("aria-busy", "true");
        this.setAttribute("aria-label", this.options.loadingText || "Cargando...");
      } else {
        this.removeAttribute("aria-busy");
      }
      if (this.options.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
    attachEventListeners() {
      this.querySelector("button") || this;
    }
    // Métodos públicos para actualizar el botón
    setLoading(loading) {
      if (loading) {
        this.setAttribute("data-loading", "true");
      } else {
        this.removeAttribute("data-loading");
      }
    }
    setDisabled(disabled) {
      if (disabled) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }
    setText(text) {
      this.textContent = text;
    }
    setIcon(icon) {
      this.setAttribute("icon", icon);
    }
  }
  if (!customElements.get("ubits-button")) {
    customElements.define("ubits-button", UBITSButton);
  }
  const ButtonComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    UBITSButton
  }, Symbol.toStringTag, { value: "Module" }));
  class ButtonAddon {
    constructor() {
      this.name = "@ubits/button";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-button")) {
        customElements.define("ubits-button", UBITSButton);
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.Button = {
          render: (options) => {
            const { renderButton: renderButton2 } = require("./ButtonProvider");
            return renderButton2(options);
          },
          create: (options) => {
            const { createButton: createButton2 } = require("./ButtonProvider");
            return createButton2(options);
          }
        };
      }
      console.log("✅ Button add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined" && window.UBITS?.Button) {
        delete window.UBITS.Button;
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-button",
          tag: "ubits-button",
          documentation: "https://ubits.design/components/button"
        }
      ];
    }
    getStyles() {
      return ["./styles/button.css"];
    }
  }
  if (typeof window !== "undefined") {
    Promise.resolve().then(() => ButtonComponent).then(() => {
      console.log("✅ UBITS Button component registered");
    });
  }
  const Button = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ButtonAddon,
    UBITSButton,
    createButton,
    renderButton
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$f(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderButtonAI(options) {
    const {
      variant = "primary",
      size = "md",
      text = "",
      icon,
      iconStyle = "regular",
      iconOnly = false,
      disabled = false,
      badge = false,
      active = false,
      className = "",
      attributes = {}
    } = options;
    const classes = [
      "ubits-button-ai",
      `ubits-button-ai--${variant}`,
      `ubits-button-ai--${size}`,
      active && "ubits-button-ai--active",
      iconOnly && "ubits-button-ai--icon-only",
      badge && "ubits-button-ai--badge",
      className
    ].filter(Boolean).join(" ");
    const attrs = [
      disabled && "disabled",
      ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
    ].filter(Boolean).join(" ");
    let iconHTML = "";
    if (icon) {
      iconHTML = renderIconHelper$f(icon, iconStyle);
    }
    const badgeHTML = badge ? '<span class="ubits-button-ai__badge"></span>' : "";
    let contentHTML = "";
    if (iconOnly) {
      contentHTML = iconHTML;
    } else if (icon && text) {
      contentHTML = `${iconHTML}<span>${text}</span>`;
    } else if (text) {
      contentHTML = `<span>${text}</span>`;
    } else if (icon) {
      contentHTML = iconHTML;
    }
    const html = `
    <button class="${classes}" ${attrs}>
      ${contentHTML}
      ${badgeHTML}
    </button>
  `.trim();
    return html;
  }
  function createButtonAI(options) {
    const div = document.createElement("div");
    div.innerHTML = renderButtonAI(options);
    const button = div.querySelector("button");
    if (!button) {
      console.error("ButtonAI: No se pudo crear el botón");
      return null;
    }
    if (options.onClick) {
      button.addEventListener("click", options.onClick);
    }
    return button;
  }
  const ButtonAi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createButtonAI,
    renderButtonAI
  }, Symbol.toStringTag, { value: "Module" }));
  const MODAL_SIZES = {
    sm: "320px",
    md: "480px",
    lg: "640px",
    xl: "800px",
    full: "1280px"
  };
  function renderModal(options) {
    const {
      title,
      bodyContent = "",
      size = "md",
      fullScreen = false,
      footerButtons,
      className = ""
    } = options;
    const modalWidth = MODAL_SIZES[size] || MODAL_SIZES.md;
    const modalSizeClass = `ubits-modal--size-${size}`;
    const fullScreenClass = fullScreen ? "ubits-modal--full-screen" : "";
    const classes = ["ubits-modal", modalSizeClass, fullScreenClass, className].filter(Boolean).join(" ");
    const headerHTML = `
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${title}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `;
    const bodyHTMLContent = typeof bodyContent === "function" ? bodyContent() : bodyContent || '<div class="ubits-modal__placeholder">Contenido del modal</div>';
    const bodyHTML = `
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${bodyHTMLContent}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `;
    const footerHTML = footerButtons ? `
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${footerButtons.tertiary ? `
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.tertiary.label}</span>
          </button>
        </div>
        ` : ""}
        <div class="ubits-modal__footer-right">
          ${footerButtons.secondary ? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.secondary.label}</span>
          </button>
          ` : ""}
          ${footerButtons.primary ? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.primary.label}</span>
          </button>
          ` : ""}
        </div>
      </div>
    </div>
  ` : "";
    return `
    <div class="ubits-modal-overlay">
      <div class="${classes}" style="max-width: ${modalWidth};">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
  }
  function createModal(options) {
    const { containerId, onClose, closeOnOverlayClick = true, open = false } = options;
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderModal(options);
    const modalOverlay = wrapper.firstElementChild;
    if (!modalOverlay) {
      throw new Error("No se pudo crear el modal");
    }
    modalOverlay.querySelector(".ubits-modal");
    const closeButton = modalOverlay.querySelector(".ubits-modal__close");
    const overlay = modalOverlay;
    const openModal = () => {
      modalOverlay.classList.add("ubits-modal-overlay--open");
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      modalOverlay.classList.remove("ubits-modal-overlay--open");
      document.body.style.overflow = "";
      if (onClose) {
        onClose();
      }
    };
    const updateContent = (content) => {
      const bodyContentElement = modalOverlay.querySelector(".ubits-modal__body-content");
      if (bodyContentElement) {
        const contentHTML = typeof content === "function" ? content() : content;
        bodyContentElement.innerHTML = contentHTML;
      }
    };
    if (closeButton) {
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      });
    }
    if (closeOnOverlayClick && overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          closeModal();
        }
      });
    }
    const handleEsc = (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("ubits-modal-overlay--open")) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEsc);
    if (options.footerButtons) {
      const tertiaryButton = modalOverlay.querySelector(
        ".ubits-modal__footer-left .ubits-modal__footer-button"
      );
      const secondaryButton = modalOverlay.querySelector(
        ".ubits-modal__footer-right .ubits-button--secondary"
      );
      const primaryButton = modalOverlay.querySelector(
        ".ubits-modal__footer-right .ubits-button--primary"
      );
      if (tertiaryButton && options.footerButtons.tertiary?.onClick) {
        tertiaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          options.footerButtons.tertiary.onClick(e);
        });
      }
      if (secondaryButton && options.footerButtons.secondary?.onClick) {
        secondaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          options.footerButtons.secondary.onClick(e);
        });
      }
      if (primaryButton && options.footerButtons.primary?.onClick) {
        primaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          options.footerButtons.primary.onClick(e);
        });
      }
    }
    container.appendChild(modalOverlay);
    if (open) {
      openModal();
    }
    return {
      element: modalOverlay,
      open: openModal,
      close: closeModal,
      updateContent
    };
  }
  function renderInput(options) {
    const {
      containerId,
      label = "",
      placeholder = "",
      helperText = "",
      size = "md",
      state = "default",
      type = "text",
      showLabel = true,
      showHelper = false,
      showCounter = false,
      maxLength = 50,
      mandatory = false,
      mandatoryType = "obligatorio",
      leftIcon = "",
      rightIcon = "",
      value = "",
      className = "",
      attributes = {},
      showRichTextToolbar = false
    } = options;
    let inputHTML = "";
    if (showLabel && label) {
      const mandatoryText = mandatory ? ` <span class="ubits-input-mandatory">(${mandatoryType})</span>` : "";
      inputHTML += `<label class="ubits-input-label">${label}${mandatoryText}</label>`;
    }
    const hasLeftIcon = leftIcon && leftIcon.trim() !== "";
    const hasRightIcon = rightIcon && rightIcon.trim() !== "";
    hasLeftIcon && leftIcon.startsWith("fa-") ? `far ${leftIcon}` : hasLeftIcon ? `far fa-${leftIcon}` : "";
    hasRightIcon && rightIcon.startsWith("fa-") ? `far ${rightIcon}` : hasRightIcon ? `far fa-${rightIcon}` : "";
    inputHTML += `<div style="position: relative; display: inline-block; width: 100%;">`;
    let finalRightIcon = rightIcon;
    let finalHasRightIcon = hasRightIcon;
    let finalLeftIcon = leftIcon;
    let finalHasLeftIcon = hasLeftIcon;
    const inputClasses = ["ubits-input", `ubits-input--${size}`];
    if (state !== "default") {
      inputClasses.push(`ubits-input--${state}`);
    }
    if (className) {
      inputClasses.push(className);
    }
    const disabledAttr = state === "disabled" ? " disabled" : "";
    const maxLengthAttr = showCounter ? ` maxlength="${maxLength}"` : "";
    const paddingLeft = hasLeftIcon ? "padding-left: 40px;" : "padding-left: 12px;";
    const paddingRight = hasRightIcon ? "padding-right: 40px;" : "padding-right: 12px;";
    if (type === "select") {
      const selectOptions = options.selectOptions || [];
      const selectValue = value ? selectOptions.find((opt) => opt.value === value)?.text || placeholder : placeholder;
      inputHTML += `<input type="text" class="${inputClasses.join(" ")}" style="width: 100%; ${paddingLeft} ${paddingRight}" value="${selectValue}" readonly>`;
      if (!hasRightIcon) {
        finalRightIcon = "fa-chevron-down";
        finalHasRightIcon = true;
        if (paddingRight === "padding-right: 12px;") {
          const newPaddingRight = "padding-right: 40px;";
          inputHTML = inputHTML.replace(
            `style="width: 100%; ${paddingLeft} ${paddingRight}"`,
            `style="width: 100%; ${paddingLeft} ${newPaddingRight}"`
          );
        }
      }
    } else if (type === "textarea") {
      if (showRichTextToolbar) {
        inputHTML += `<div class="ubits-input-rich-text-wrapper">`;
        inputHTML += `
        <div class="ubits-input-rich-text-toolbar" data-container-id="${containerId}">
          <button type="button" class="ubits-rich-text-btn" data-command="bold" title="Negrita">
            <i class="fas fa-bold"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="italic" title="Cursiva">
            <i class="fas fa-italic"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="underline" title="Subrayado">
            <i class="fas fa-underline"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyLeft" title="Alinear izquierda">
            <i class="fas fa-align-left"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyCenter" title="Alinear centro">
            <i class="fas fa-align-center"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyRight" title="Alinear derecha">
            <i class="fas fa-align-right"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="insertUnorderedList" title="Lista con viñetas">
            <i class="fas fa-list-ul"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="insertOrderedList" title="Lista numerada">
            <i class="fas fa-list-ol"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="insertImage" title="Insertar imagen">
            <i class="fas fa-image"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="insertTable" title="Insertar tabla">
            <i class="fas fa-table"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="createLink" title="Insertar enlace">
            <i class="fas fa-link"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="code" title="Código">
            <i class="fas fa-code"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="removeFormat" title="Limpiar formato">
            <i class="fas fa-remove-format"></i>
          </button>
        </div>
      `;
        let textareaStyle = `width: 100%; min-height: 80px; resize: vertical; ${paddingLeft} ${paddingRight}; border: none; border-radius: 0;`;
        if (state === "disabled") {
          textareaStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important;`;
        }
        const textareaId = `${containerId}-textarea`;
        inputHTML += `<textarea id="${textareaId}" class="${inputClasses.join(" ")}" style="${textareaStyle}" placeholder="${placeholder}"${disabledAttr}${maxLengthAttr}>${value}</textarea>`;
        inputHTML += `</div>`;
      } else {
        let textareaStyle = `width: 100%; min-height: 80px; resize: vertical; ${paddingLeft} ${paddingRight}`;
        if (state === "disabled") {
          textareaStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        const textareaId = `${containerId}-textarea`;
        inputHTML += `<textarea id="${textareaId}" class="${inputClasses.join(" ")}" style="${textareaStyle}" placeholder="${placeholder}"${disabledAttr}${maxLengthAttr}>${value}</textarea>`;
      }
    } else if (type === "search") {
      let searchPaddingLeft = paddingLeft;
      let searchPaddingRight = paddingRight;
      if (!hasLeftIcon) {
        finalLeftIcon = "fa-search";
        finalHasLeftIcon = true;
        searchPaddingLeft = size === "xs" ? "padding-left: 32px;" : size === "sm" ? "padding-left: 36px;" : size === "md" ? "padding-left: 40px;" : "padding-left: 44px;";
      }
      if (!hasRightIcon) {
        finalRightIcon = "fa-times";
        finalHasRightIcon = true;
        searchPaddingRight = size === "xs" ? "padding-right: 32px;" : size === "sm" ? "padding-right: 36px;" : size === "md" ? "padding-right: 40px;" : "padding-right: 44px;";
      }
      let searchStyle = `width: 100%; ${searchPaddingLeft} ${searchPaddingRight}`;
      if (state === "disabled") {
        searchStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
      }
      inputHTML += `<input type="text" class="${inputClasses.join(" ")}" style="${searchStyle}" placeholder="${placeholder}" value="${value}" autocomplete="off"${disabledAttr}${maxLengthAttr}>`;
    } else if (type === "autocomplete") {
      let autocompletePaddingLeft = paddingLeft;
      let autocompletePaddingRight = paddingRight;
      if (!hasLeftIcon) {
        finalLeftIcon = "fa-search";
        finalHasLeftIcon = true;
        autocompletePaddingLeft = size === "xs" ? "padding-left: 32px;" : size === "sm" ? "padding-left: 36px;" : size === "md" ? "padding-left: 40px;" : "padding-left: 44px;";
      }
      if (!hasRightIcon) {
        finalRightIcon = "fa-times";
        finalHasRightIcon = true;
        autocompletePaddingRight = size === "xs" ? "padding-right: 32px;" : size === "sm" ? "padding-right: 36px;" : size === "md" ? "padding-right: 40px;" : "padding-right: 44px;";
      }
      let autocompleteStyle = `width: 100%; ${autocompletePaddingLeft} ${autocompletePaddingRight}`;
      if (state === "disabled") {
        autocompleteStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
      }
      inputHTML += `<input type="text" class="${inputClasses.join(" ")}" style="${autocompleteStyle}" placeholder="${placeholder}" value="${value}" autocomplete="off"${disabledAttr}${maxLengthAttr}>`;
    } else if (type === "calendar") {
      let calendarPaddingLeft = paddingLeft;
      let calendarPaddingRight = paddingRight;
      if (!hasRightIcon) {
        finalRightIcon = "fa-calendar";
        finalHasRightIcon = true;
        calendarPaddingRight = size === "xs" ? "padding-right: 32px;" : size === "sm" ? "padding-right: 36px;" : size === "md" ? "padding-right: 40px;" : "padding-right: 44px;";
      }
      let calendarStyle = `width: 100%; ${calendarPaddingLeft} ${calendarPaddingRight}`;
      if (state === "disabled") {
        calendarStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
      }
      inputHTML += `<input type="text" class="${inputClasses.join(" ")}" style="${calendarStyle}" placeholder="${placeholder}" value="${value}" readonly${disabledAttr}>`;
    } else if (type === "password") {
      let passwordPaddingLeft = paddingLeft;
      let passwordPaddingRight = paddingRight;
      if (!hasRightIcon) {
        finalRightIcon = "fa-eye";
        finalHasRightIcon = true;
        passwordPaddingRight = size === "xs" ? "padding-right: 32px;" : size === "sm" ? "padding-right: 36px;" : size === "md" ? "padding-right: 40px;" : "padding-right: 44px;";
      }
      let passwordStyle = `width: 100%; ${passwordPaddingLeft} ${passwordPaddingRight}`;
      if (state === "disabled") {
        passwordStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
      }
      inputHTML += `<input type="password" class="${inputClasses.join(" ")}" style="${passwordStyle}" placeholder="${placeholder}" value="${value}"${disabledAttr}${maxLengthAttr}>`;
    } else {
      inputHTML += `<input type="${type}" class="${inputClasses.join(" ")}" style="width: 100%; ${paddingLeft} ${paddingRight}" placeholder="${placeholder}" value="${value}"${disabledAttr}${maxLengthAttr}>`;
    }
    if (finalHasLeftIcon) {
      const leftIconClass = finalLeftIcon.startsWith("fa-") ? `far ${finalLeftIcon}` : `far fa-${finalLeftIcon}`;
      inputHTML += `<i class="${leftIconClass} ubits-input-icon-left" style="position: absolute; left: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
    }
    if (finalHasRightIcon) {
      const rightIconClass = finalRightIcon.startsWith("fa-") ? `far ${finalRightIcon}` : `far fa-${finalRightIcon}`;
      inputHTML += `<i class="${rightIconClass} ubits-input-icon-right" style="position: absolute; right: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
    }
    inputHTML += "</div>";
    if (showHelper || showCounter) {
      inputHTML += '<div class="ubits-input-helper">';
      if (showHelper && helperText) {
        inputHTML += `<span>${helperText}</span>`;
      }
      if (showCounter) {
        inputHTML += `<span class="ubits-input-counter">0/${maxLength}</span>`;
      }
      inputHTML += "</div>";
    }
    const attrs = Object.entries(attributes).map(([key, val]) => `${key}="${val}"`).join(" ");
    if (attrs) {
      return `<div ${attrs}>${inputHTML}</div>`;
    }
    return inputHTML;
  }
  function createInput(options) {
    const {
      containerId,
      onChange,
      onFocus,
      onBlur,
      showCounter = false,
      maxLength = 50,
      type = "text",
      selectOptions = [],
      autocompleteOptions = [],
      value = ""
    } = options;
    if (!containerId) {
      console.error("UBITS Input: containerId es requerido");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`UBITS Input: No se encontró el contenedor con ID "${containerId}"`);
      return null;
    }
    const inputHTML = renderInput(options);
    container.innerHTML = inputHTML;
    const wrapper = container.querySelector('div[style*="position: relative"]');
    const inputElement = container.querySelector(".ubits-input");
    const counterElement = container.querySelector(".ubits-input-counter");
    if (!inputElement || !wrapper) {
      console.error("UBITS Input: No se pudo crear el elemento input");
      return null;
    }
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
    if (type === "select") {
      createSelectDropdown(
        container,
        inputElement,
        selectOptions,
        value,
        options.placeholder || "",
        onChange,
        options.size || "md"
      );
    }
    if (type === "search") {
      createSearchClear(container, inputElement, onChange);
    }
    if (type === "autocomplete") {
      createAutocompleteDropdown(
        container,
        inputElement,
        autocompleteOptions,
        onChange,
        options.size || "md"
      );
    }
    if (type === "calendar") {
      createCalendarPicker(container, inputElement, onChange);
    }
    if (type === "password") {
      createPasswordToggle(container, inputElement);
    }
    if (type === "textarea" && options.showRichTextToolbar) {
      setupRichTextToolbar(container, inputElement, options.onChange);
    } else if (type === "textarea" && !options.showRichTextToolbar) {
      setupTextareaPlaceholderAlignment(container, inputElement);
    }
    if (showCounter && counterElement) {
      setupCharacterCounter(inputElement, counterElement, maxLength);
    }
    if (onChange && typeof onChange === "function") {
      const eventType = type === "select" ? "change" : "input";
      inputElement.addEventListener(eventType, (e) => {
        onChange(e.target.value, e);
      });
    }
    if (onFocus && typeof onFocus === "function") {
      inputElement.addEventListener("focus", (e) => {
        onFocus(e.target.value, e);
      });
    }
    if (onBlur && typeof onBlur === "function") {
      inputElement.addEventListener("blur", (e) => {
        onBlur(e.target.value, e);
      });
    }
    return {
      element: wrapper,
      inputElement,
      getValue: () => inputElement.value,
      setValue: (newValue) => {
        inputElement.value = newValue;
        if (showCounter && counterElement) {
          updateCounter(counterElement, newValue.length, maxLength);
        }
      },
      focus: () => inputElement.focus(),
      blur: () => inputElement.blur(),
      disable: () => {
        inputElement.disabled = true;
        inputElement.classList.add("ubits-input--disabled");
      },
      enable: () => {
        inputElement.disabled = false;
        inputElement.classList.remove("ubits-input--disabled");
      },
      setState: (newState) => {
        const stateClasses = [
          "ubits-input--hover",
          "ubits-input--focus",
          "ubits-input--active",
          "ubits-input--invalid",
          "ubits-input--disabled"
        ];
        stateClasses.forEach((cls) => inputElement.classList.remove(cls));
        if (newState !== "default") {
          inputElement.classList.add(`ubits-input--${newState}`);
        }
        if (newState === "disabled") {
          inputElement.disabled = true;
        } else {
          inputElement.disabled = false;
        }
        if (type === "textarea" && options.showRichTextToolbar) {
          const richTextWrapper = inputElement.closest(".ubits-input-rich-text-wrapper");
          const toolbar = richTextWrapper?.querySelector(".ubits-input-rich-text-toolbar");
          if (toolbar) {
            const toolbarBorderBottom = window.getComputedStyle(toolbar).borderBottom;
            window.getComputedStyle(toolbar).borderTop;
            if (toolbarBorderBottom && toolbarBorderBottom !== "none" && toolbarBorderBottom !== "0px") {
              console.warn(
                `[Rich Text] ⚠️ Línea divisoria detectada en setState("${newState}"), removiendo...`
              );
              toolbar.style.borderBottom = "none";
              toolbar.style.borderTop = "none";
            }
          }
        }
      }
    };
  }
  function createPasswordToggle(container, inputElement) {
    const toggleIcon = container.querySelector(".ubits-input-icon-right");
    if (toggleIcon) {
      let isPasswordVisible = false;
      toggleIcon.style.pointerEvents = "auto";
      toggleIcon.style.cursor = "pointer";
      const originalIconClass = toggleIcon.className;
      const isCustomIcon = !originalIconClass.includes("fa-eye");
      toggleIcon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        isPasswordVisible = !isPasswordVisible;
        if (isPasswordVisible) {
          inputElement.type = "text";
          if (!isCustomIcon) {
            toggleIcon.className = "far fa-eye-slash ubits-input-icon-right";
          }
        } else {
          inputElement.type = "password";
          if (!isCustomIcon) {
            toggleIcon.className = "far fa-eye ubits-input-icon-right";
          }
        }
      });
    }
  }
  function createSearchClear(container, inputElement, onChange) {
    const clearIcon = container.querySelector(".ubits-input-icon-right");
    if (clearIcon) {
      clearIcon.style.display = inputElement.value.length > 0 ? "block" : "none";
      clearIcon.style.pointerEvents = "auto";
      clearIcon.style.cursor = "pointer";
      const toggleClearIcon = () => {
        clearIcon.style.display = inputElement.value.length > 0 ? "block" : "none";
      };
      inputElement.addEventListener("input", toggleClearIcon);
      clearIcon.addEventListener("click", (e) => {
        e.preventDefault();
        inputElement.value = "";
        inputElement.focus();
        toggleClearIcon();
        if (onChange) onChange("");
      });
    }
  }
  function createAutocompleteDropdown(container, inputElement, autocompleteOptions, onChange, inputSize = "md") {
    const listSize = inputSize === "xs" ? "xs" : inputSize === "sm" ? "sm" : inputSize === "md" ? "md" : "lg";
    const clearIcon = container.querySelector(".ubits-input-icon-right");
    if (clearIcon) {
      clearIcon.style.display = inputElement.value.length > 0 ? "block" : "none";
      clearIcon.style.pointerEvents = "auto";
      clearIcon.style.cursor = "pointer";
      const toggleClearIcon = () => {
        clearIcon.style.display = inputElement.value.length > 0 ? "block" : "none";
      };
      inputElement.addEventListener("input", toggleClearIcon);
      clearIcon.addEventListener("click", (e) => {
        e.preventDefault();
        inputElement.value = "";
        inputElement.focus();
        toggleClearIcon();
        const listContainer2 = container.querySelector(".ubits-autocomplete-list-container");
        if (listContainer2) listContainer2.style.display = "none";
        if (onChange) onChange("");
      });
    }
    const listContainer = document.createElement("div");
    listContainer.className = "ubits-autocomplete-list-container";
    listContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `;
    container.appendChild(listContainer);
    const updateAutocompleteList = (showAll = false) => {
      const searchText = inputElement.value.toLowerCase();
      let filtered;
      if (showAll || searchText.length < 1) {
        filtered = autocompleteOptions.slice(0, 8);
      } else {
        filtered = autocompleteOptions.filter((opt) => opt.text.toLowerCase().includes(searchText)).slice(0, 8);
      }
      if (filtered.length === 0) {
        listContainer.style.display = "none";
        return;
      }
      const listItems = filtered.map((option) => ({
        label: option.text,
        state: "default",
        value: option.value,
        selected: false
      }));
      const listId = `ubits-autocomplete-list-${container.id}`;
      listContainer.id = listId;
      listContainer.innerHTML = "";
      try {
        createList({
          containerId: listId,
          items: listItems,
          size: listSize,
          maxHeight: "200px",
          onSelectionChange: (selectedItem, index) => {
            if (selectedItem && selectedItem.value) {
              inputElement.value = selectedItem.label;
              listContainer.style.display = "none";
              if (clearIcon) clearIcon.style.display = "block";
              if (onChange) onChange(selectedItem.value);
            }
          }
        });
        if (searchText.length > 0) {
          const listItemsElements = listContainer.querySelectorAll(".ubits-list-item");
          listItemsElements.forEach((itemEl) => {
            const text = itemEl.textContent || "";
            if (text.toLowerCase().includes(searchText)) {
              const regex = new RegExp(`(${searchText})`, "gi");
              const highlighted = text.replace(regex, "<strong>$1</strong>");
              itemEl.innerHTML = highlighted;
            }
          });
        }
      } catch (error) {
        console.warn("Using renderList fallback for autocomplete:", error);
        const listHTML = renderList({
          items: listItems,
          size: listSize,
          maxHeight: "200px"
        });
        listContainer.innerHTML = listHTML;
        if (searchText.length > 0) {
          const listItemsElements2 = listContainer.querySelectorAll(".ubits-list-item");
          listItemsElements2.forEach((itemEl) => {
            const text = itemEl.textContent || "";
            if (text.toLowerCase().includes(searchText)) {
              const regex = new RegExp(`(${searchText})`, "gi");
              const highlighted = text.replace(regex, "<strong>$1</strong>");
              itemEl.innerHTML = highlighted;
            }
          });
        }
        const listItemsElements = listContainer.querySelectorAll(".ubits-list-item");
        listItemsElements.forEach((itemEl, idx) => {
          const item = listItems[idx];
          if (item && item.state !== "disabled") {
            itemEl.addEventListener("click", () => {
              inputElement.value = item.label;
              listContainer.style.display = "none";
              if (clearIcon) clearIcon.style.display = "block";
              if (onChange) onChange(item.value || "");
            });
          }
        });
      }
      listContainer.style.display = "block";
    };
    inputElement.addEventListener("focus", () => {
      updateAutocompleteList(true);
    });
    inputElement.addEventListener("input", () => {
      updateAutocompleteList(false);
    });
    inputElement.addEventListener("blur", () => {
      setTimeout(() => listContainer.style.display = "none", 150);
    });
  }
  function createSelectDropdown(container, inputElement, selectOptions, value, placeholder, onChange, inputSize = "md") {
    inputElement.style.cursor = "pointer";
    const listSize = inputSize === "xs" ? "xs" : inputSize === "sm" ? "sm" : inputSize === "md" ? "md" : "lg";
    const listContainer = document.createElement("div");
    listContainer.className = "ubits-select-list-container";
    listContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `;
    container.appendChild(listContainer);
    const itemsPerPage = 50;
    let currentPage = 0;
    let allLoadedItems = [];
    let isLoading = false;
    const loadOptions = (page = 0) => {
      if (isLoading) return;
      isLoading = true;
      setTimeout(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, selectOptions.length);
        const pageOptions = selectOptions.slice(startIndex, endIndex);
        const newItems = pageOptions.map((option) => ({
          label: option.text,
          state: value === option.value ? "active" : "default",
          value: option.value,
          selected: value === option.value
        }));
        if (page === 0) {
          allLoadedItems = newItems;
        } else {
          allLoadedItems = [...allLoadedItems, ...newItems];
        }
        const listId = `ubits-select-list-${container.id}`;
        listContainer.id = listId;
        listContainer.innerHTML = "";
        try {
          createList({
            containerId: listId,
            items: allLoadedItems,
            size: listSize,
            maxHeight: "200px",
            onSelectionChange: (selectedItem, index) => {
              if (selectedItem && selectedItem.value) {
                inputElement.value = selectedItem.label;
                listContainer.style.display = "none";
                if (onChange) onChange(selectedItem.value);
              }
            }
          });
        } catch (error) {
          console.warn("Using renderList fallback for select:", error);
          const listHTML = renderList({
            items: allLoadedItems,
            size: listSize,
            maxHeight: "200px"
          });
          listContainer.innerHTML = listHTML;
          const listItems = listContainer.querySelectorAll(".ubits-list-item");
          listItems.forEach((itemEl, idx) => {
            const item = allLoadedItems[idx];
            if (item && item.state !== "disabled") {
              itemEl.addEventListener("click", () => {
                inputElement.value = item.label;
                listContainer.style.display = "none";
                if (onChange) onChange(item.value || "");
              });
            }
          });
        }
        if (endIndex < selectOptions.length) {
          const listElement = listContainer.querySelector(".ubits-list");
          if (listElement) {
            const observer = new IntersectionObserver(
              (entries) => {
                if (entries[0].isIntersecting && !isLoading && endIndex < selectOptions.length) {
                  currentPage++;
                  loadOptions(currentPage);
                }
              },
              { root: listElement, rootMargin: "50px" }
            );
            const lastItem = listContainer.querySelector(".ubits-list-item:last-child");
            if (lastItem) {
              observer.observe(lastItem);
            }
          }
        }
        isLoading = false;
      }, 150);
    };
    inputElement.addEventListener("click", () => {
      const isVisible = listContainer.style.display === "block";
      if (!isVisible) {
        currentPage = 0;
        allLoadedItems = [];
        loadOptions(0);
        listContainer.style.display = "block";
      } else {
        listContainer.style.display = "none";
      }
    });
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        listContainer.style.display = "none";
      }
    });
  }
  function createCalendarPicker(container, inputElement, onChange) {
    let calendarInstance = null;
    let calendarContainer = null;
    const formatDate2 = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    const parseDate = (dateStr) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split("/");
      if (!day || !month || !year) return null;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };
    const showCalendar = async () => {
      if (inputElement.type === "date") {
        inputElement.type = "text";
        inputElement.setAttribute("readonly", "readonly");
      }
      if (calendarContainer && calendarContainer.style.display !== "none") {
        calendarContainer.style.display = "none";
        return;
      }
      if (!calendarContainer) {
        calendarContainer = document.createElement("div");
        calendarContainer.className = "ubits-calendar-picker-container";
        calendarContainer.style.cssText = "position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px; display: none;";
        container.style.position = "relative";
        container.appendChild(calendarContainer);
      }
      if (calendarInstance) {
        calendarContainer.style.display = "block";
        return;
      }
      try {
        const calendarModule = await Promise.resolve().then(() => CalendarProvider);
        const { createCalendar: createCalendar2 } = calendarModule;
        const currentValue = inputElement.value;
        const initialDate = parseDate(currentValue) || /* @__PURE__ */ new Date();
        calendarInstance = createCalendar2({
          mode: "single",
          selectedDate: parseDate(currentValue),
          initialDate,
          onDateSelect: (date) => {
            const formattedDate = formatDate2(date);
            inputElement.value = formattedDate;
            if (calendarContainer) {
              calendarContainer.style.display = "none";
            }
            if (onChange) {
              onChange(formattedDate);
            }
          }
        });
        calendarContainer.appendChild(calendarInstance.element);
        calendarContainer.style.display = "block";
      } catch (error) {
        console.error("❌ [Calendar Picker] Error cargando Calendar UBITS:", error);
        if (calendarContainer) {
          calendarContainer.innerHTML = `<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>`;
          calendarContainer.style.display = "block";
        }
      }
    };
    inputElement.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showCalendar();
    });
    inputElement.addEventListener("focus", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showCalendar();
    });
    const calendarIcon = container.querySelector(".ubits-input-icon-right");
    if (calendarIcon) {
      calendarIcon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        showCalendar();
      });
    }
    document.addEventListener("click", (e) => {
      if (calendarContainer && !container.contains(e.target)) {
        calendarContainer.style.display = "none";
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && calendarContainer) {
        calendarContainer.style.display = "none";
      }
    });
  }
  function setupCharacterCounter(inputElement, counterElement, maxLength) {
    const handleInput = () => {
      updateCounter(counterElement, inputElement.value.length, maxLength);
      if (inputElement.value.length > maxLength) {
        inputElement.value = inputElement.value.substring(0, maxLength);
        updateCounter(counterElement, maxLength, maxLength);
      }
    };
    inputElement.addEventListener("input", handleInput);
    updateCounter(counterElement, inputElement.value.length, maxLength);
  }
  function updateCounter(counterElement, currentLength, maxLength) {
    counterElement.textContent = `${currentLength}/${maxLength}`;
    if (currentLength >= maxLength) {
      counterElement.classList.add("ubits-input-counter--limit");
    } else {
      counterElement.classList.remove("ubits-input-counter--limit");
    }
  }
  function showInsertImageModal(editableDiv, syncContent) {
    const modalId = `ubits-rich-text-image-modal-${Date.now()}`;
    const inputId = `${modalId}-input`;
    const modalOptions = {
      title: "Insertar imagen",
      size: "md",
      bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL de la imagen:
        </label>
        <div style="display: flex; gap: var(--ubits-spacing-sm, 8px); align-items: flex-start;">
          <input 
            type="text" 
            id="${inputId}"
            class="ubits-input ubits-input--md"
            placeholder="https://ejemplo.com/imagen.jpg"
            style="flex: 1;"
          />
          <button 
            type="button"
            id="${modalId}-insert-btn"
            class="ubits-button ubits-button--primary ubits-button--md"
          >
            <span>Insertar imagen</span>
          </button>
        </div>
      </div>
    `,
      footerButtons: {
        secondary: {
          label: "Cancelar",
          onClick: () => {
          }
        }
      },
      onClose: () => {
        const modal2 = document.getElementById(modalId)?.closest(".ubits-modal-overlay");
        if (modal2) {
          setTimeout(() => modal2.remove(), 300);
        }
      },
      closeOnOverlayClick: true,
      open: true
    };
    const modal = createModal(modalOptions);
    const modalElement = modal.element;
    modalElement.id = modalId;
    const insertBtn = document.getElementById(`${modalId}-insert-btn`);
    const urlInput = document.getElementById(inputId);
    if (insertBtn && urlInput) {
      const handleInsert = () => {
        const url = urlInput.value.trim();
        if (url) {
          const img = document.createElement("img");
          img.src = url;
          img.style.maxWidth = "100%";
          img.style.height = "auto";
          img.style.display = "block";
          img.style.margin = `var(--ubits-spacing-sm, 8px) 0`;
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            selection.getRangeAt(0).insertNode(img);
          } else {
            editableDiv.appendChild(img);
          }
          syncContent();
          modal.close();
        }
      };
      insertBtn.addEventListener("click", handleInsert);
      urlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleInsert();
        }
      });
      const cancelBtn = modalElement.querySelector(".ubits-button--secondary");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
          modal.close();
        });
      }
    }
  }
  function showInsertTableModal(editableDiv, syncContent) {
    const modalId = `ubits-rich-text-table-modal-${Date.now()}`;
    const rowsInputId = `${modalId}-rows`;
    const colsInputId = `${modalId}-cols`;
    const modalOptions = {
      title: "Insertar tabla",
      size: "sm",
      bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--ubits-spacing-lg, 16px);">
          <div>
            <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
              Filas:
            </label>
            <input 
              type="number" 
              id="${rowsInputId}"
              class="ubits-input ubits-input--md"
              value="2"
              min="1"
              max="20"
              style="width: 100%;"
            />
          </div>
          <div>
            <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
              Columnas:
            </label>
            <input 
              type="number" 
              id="${colsInputId}"
              class="ubits-input ubits-input--md"
              value="2"
              min="1"
              max="20"
              style="width: 100%;"
            />
          </div>
        </div>
      </div>
    `,
      footerButtons: {
        secondary: {
          label: "Cancelar",
          onClick: () => {
          }
        },
        primary: {
          label: "Insertar",
          onClick: () => {
          }
        }
      },
      onClose: () => {
        const modal2 = document.getElementById(modalId)?.closest(".ubits-modal-overlay");
        if (modal2) {
          setTimeout(() => modal2.remove(), 300);
        }
      },
      closeOnOverlayClick: true,
      open: true
    };
    const modal = createModal(modalOptions);
    const modalElement = modal.element;
    modalElement.id = modalId;
    const insertBtn = modalElement.querySelector(".ubits-button--primary");
    const rowsInput = document.getElementById(rowsInputId);
    const colsInput = document.getElementById(colsInputId);
    if (insertBtn && rowsInput && colsInput) {
      insertBtn.addEventListener("click", () => {
        const rows = parseInt(rowsInput.value) || 2;
        const cols = parseInt(colsInput.value) || 2;
        if (rows > 0 && cols > 0) {
          const table = document.createElement("table");
          table.style.borderCollapse = "collapse";
          table.style.width = "100%";
          table.style.margin = `var(--ubits-spacing-sm, 8px) 0`;
          table.style.border = `1px solid var(--ubits-border-1)`;
          for (let i = 0; i < rows; i++) {
            const tr = document.createElement("tr");
            for (let j = 0; j < cols; j++) {
              const td = document.createElement("td");
              td.style.border = `1px solid var(--ubits-border-1)`;
              td.style.padding = `var(--ubits-spacing-sm, 8px)`;
              td.style.minWidth = "50px";
              td.textContent = " ";
              tr.appendChild(td);
            }
            table.appendChild(tr);
          }
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            selection.getRangeAt(0).insertNode(table);
          } else {
            editableDiv.appendChild(table);
          }
          syncContent();
          modal.close();
        }
      });
    }
    const cancelBtn = modalElement.querySelector(".ubits-button--secondary");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        modal.close();
      });
    }
  }
  function showCreateLinkModal(editableDiv, syncContent) {
    const modalId = `ubits-rich-text-link-modal-${Date.now()}`;
    const inputId = `${modalId}-input`;
    const modalOptions = {
      title: "Insertar enlace",
      size: "md",
      bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL del enlace:
        </label>
        <input 
          type="text" 
          id="${inputId}"
          class="ubits-input ubits-input--md"
          placeholder="https://ejemplo.com"
          style="width: 100%; box-sizing: border-box;"
        />
      </div>
    `,
      footerButtons: {
        secondary: {
          label: "Cancelar",
          onClick: () => {
          }
        },
        primary: {
          label: "Insertar",
          onClick: () => {
          }
        }
      },
      onClose: () => {
        const modal2 = document.getElementById(modalId)?.closest(".ubits-modal-overlay");
        if (modal2) {
          setTimeout(() => modal2.remove(), 300);
        }
      },
      closeOnOverlayClick: true,
      open: true
    };
    const modal = createModal(modalOptions);
    const modalElement = modal.element;
    modalElement.id = modalId;
    const insertBtn = modalElement.querySelector(".ubits-button--primary");
    const urlInput = document.getElementById(inputId);
    if (insertBtn && urlInput) {
      insertBtn.addEventListener("click", () => {
        const url = urlInput.value.trim();
        if (url) {
          document.execCommand("createLink", false, url);
          syncContent();
          modal.close();
        }
      });
    }
    const cancelBtn = modalElement.querySelector(".ubits-button--secondary");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        modal.close();
      });
    }
    if (urlInput) {
      urlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (insertBtn) {
            insertBtn.click();
          }
        }
      });
    }
  }
  function setupRichTextToolbar(container, textareaElement, onChange) {
    const toolbar = container.querySelector(".ubits-input-rich-text-toolbar");
    if (!toolbar) return;
    const richTextWrapper = textareaElement.closest(".ubits-input-rich-text-wrapper");
    if (!richTextWrapper) return;
    const placeholder = textareaElement.placeholder || "";
    const editableDiv = document.createElement("div");
    editableDiv.className = textareaElement.className;
    const computedStyle = window.getComputedStyle(textareaElement);
    editableDiv.style.cssText = textareaElement.style.cssText;
    editableDiv.style.position = "relative";
    editableDiv.style.padding = computedStyle.padding || "12px 12px";
    editableDiv.style.margin = "0";
    editableDiv.style.outline = "none";
    editableDiv.style.overflow = "auto";
    editableDiv.style.minHeight = computedStyle.minHeight || "80px";
    editableDiv.style.resize = "vertical";
    editableDiv.contentEditable = "true";
    editableDiv.setAttribute("data-placeholder", placeholder);
    let inputWrapper = container.closest(".ubits-input-wrapper");
    if (!inputWrapper) {
      inputWrapper = container.parentElement?.closest(".ubits-input-wrapper");
    }
    if (!inputWrapper) {
      const containerParent = document.getElementById(container.id)?.parentElement;
      inputWrapper = containerParent?.closest(".ubits-input-wrapper");
    }
    console.log("[Rich Text Placeholder] ===== DEBUG ALINEAMIENTO =====");
    console.log("[Rich Text Placeholder] inputWrapper:", inputWrapper);
    console.log("[Rich Text Placeholder] container:", container);
    console.log("[Rich Text Placeholder] container.parentElement:", container.parentElement);
    console.log("[Rich Text Placeholder] richTextWrapper:", richTextWrapper);
    console.log(
      "[Rich Text Placeholder] richTextWrapper.parentElement:",
      richTextWrapper?.parentElement
    );
    let leftIconElement = null;
    if (inputWrapper) {
      leftIconElement = inputWrapper.querySelector(".ubits-input-icon-left");
    }
    if (!leftIconElement && container.parentElement) {
      leftIconElement = container.parentElement.querySelector(".ubits-input-icon-left");
    }
    if (!leftIconElement && richTextWrapper?.parentElement) {
      leftIconElement = richTextWrapper.parentElement.querySelector(".ubits-input-icon-left");
    }
    if (!leftIconElement) {
      const allIcons = document.querySelectorAll(".ubits-input-icon-left");
      for (const icon of Array.from(allIcons)) {
        const iconElement = icon;
        const containerRect = container.getBoundingClientRect();
        const iconRect = iconElement.getBoundingClientRect();
        if (Math.abs(iconRect.top - containerRect.top) < 100) {
          leftIconElement = iconElement;
          break;
        }
      }
    }
    const hasLeftIcon = leftIconElement !== null;
    console.log("[Rich Text Placeholder] leftIconElement:", leftIconElement);
    console.log("[Rich Text Placeholder] hasLeftIcon:", hasLeftIcon);
    if (hasLeftIcon && leftIconElement) {
      const iconRect = leftIconElement.getBoundingClientRect();
      const iconComputedStyle = window.getComputedStyle(leftIconElement);
      const iconLeft = iconComputedStyle.left;
      const iconTop = iconComputedStyle.top;
      const iconTransform = iconComputedStyle.transform;
      console.log("[Rich Text Placeholder] Icono encontrado:", leftIconElement);
      console.log("[Rich Text Placeholder] Icono rect:", iconRect);
      console.log("[Rich Text Placeholder] Icono left (computed):", iconLeft);
      console.log("[Rich Text Placeholder] Icono top (computed):", iconTop);
      console.log("[Rich Text Placeholder] Icono transform:", iconTransform);
      const paddingLeft = computedStyle.paddingLeft || "12px";
      const paddingTop = computedStyle.paddingTop || "12px";
      const paddingRight = computedStyle.paddingRight || "12px";
      const paddingBottom = computedStyle.paddingBottom || "12px";
      console.log("[Rich Text Placeholder] Textarea padding:", {
        left: paddingLeft,
        top: paddingTop,
        right: paddingRight,
        bottom: paddingBottom
      });
      const editableRect = editableDiv.getBoundingClientRect();
      console.log("[Rich Text Placeholder] EditableDiv rect:", editableRect);
      const relativeIconLeft = iconRect.left - editableRect.left;
      const relativeIconTop = iconRect.top - editableRect.top;
      const relativeIconBottom = iconRect.bottom - editableRect.top;
      console.log("[Rich Text Placeholder] Icono posición relativa:", {
        left: relativeIconLeft,
        top: relativeIconTop,
        bottom: relativeIconBottom
      });
      const lineHeight = computedStyle.lineHeight || "1.5";
      const fontSize = computedStyle.fontSize || "14px";
      console.log("[Rich Text Placeholder] Texto:", {
        fontSize,
        lineHeight
      });
      editableDiv.setAttribute("data-has-left-icon", "true");
      editableDiv.style.setProperty("--placeholder-left", paddingLeft);
      editableDiv.style.setProperty("--placeholder-top", paddingTop);
      console.log("[Rich Text Placeholder] Variables CSS establecidas:", {
        "--placeholder-left": paddingLeft,
        "--placeholder-top": paddingTop
      });
      requestAnimationFrame(() => {
        editableDiv.querySelector("::before") || window.getComputedStyle(editableDiv, "::before");
        const placeholderStyle = window.getComputedStyle(editableDiv, "::before");
        console.log("[Rich Text Placeholder] Después de render:", {
          placeholderLeft: placeholderStyle.left,
          placeholderTop: placeholderStyle.top,
          placeholderWidth: placeholderStyle.width,
          placeholderHeight: placeholderStyle.height
        });
      });
    } else {
      const paddingTop = computedStyle.paddingTop || "12px";
      const paddingLeft = computedStyle.paddingLeft || "12px";
      console.log("[Rich Text Placeholder] Sin icono, usando valores por defecto:", {
        paddingTop,
        paddingLeft
      });
      editableDiv.style.setProperty("--placeholder-top", paddingTop);
      editableDiv.style.setProperty("--placeholder-left", paddingLeft);
    }
    console.log("[Rich Text Placeholder] ===== FIN DEBUG =====");
    if (textareaElement.value && textareaElement.value.trim()) {
      editableDiv.innerHTML = textareaElement.value;
    } else {
      editableDiv.classList.add("ubits-rich-text-placeholder");
    }
    textareaElement.style.display = "none";
    textareaElement.setAttribute("data-rich-text-editor", "true");
    richTextWrapper.insertBefore(editableDiv, textareaElement);
    if (hasLeftIcon && leftIconElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          let iconAfterInsert = leftIconElement;
          if (inputWrapper) {
            iconAfterInsert = inputWrapper.querySelector(".ubits-input-icon-left") || leftIconElement;
          }
          if (!iconAfterInsert && container.parentElement) {
            iconAfterInsert = container.parentElement.querySelector(".ubits-input-icon-left") || leftIconElement;
          }
          if (iconAfterInsert) {
            const iconRect = iconAfterInsert.getBoundingClientRect();
            const editableRect = editableDiv.getBoundingClientRect();
            console.log("[Rich Text Placeholder] Después de insertar en DOM:");
            console.log("[Rich Text Placeholder] Icono rect:", iconRect);
            console.log("[Rich Text Placeholder] EditableDiv rect:", editableRect);
            if (editableRect.width > 0 && editableRect.height > 0) {
              const relativeIconTop = iconRect.top - editableRect.top;
              const relativeIconBottom = iconRect.bottom - editableRect.top;
              const relativeIconLeft = iconRect.left - editableRect.left;
              console.log("[Rich Text Placeholder] Posiciones relativas:", {
                iconTop: relativeIconTop,
                iconBottom: relativeIconBottom,
                iconLeft: relativeIconLeft,
                iconCenterY: relativeIconTop + iconRect.height / 2
              });
              const iconCenterY = relativeIconTop + iconRect.height / 2;
              const fontSize = parseFloat(computedStyle.fontSize || "16px");
              const lineHeightValue = computedStyle.lineHeight;
              let lineHeight;
              if (lineHeightValue === "normal") {
                lineHeight = fontSize * 1.2;
              } else if (lineHeightValue.includes("px")) {
                lineHeight = parseFloat(lineHeightValue);
              } else {
                lineHeight = fontSize * parseFloat(lineHeightValue);
              }
              const paddingTop = parseFloat(computedStyle.paddingTop || "12px");
              const textBaselineY = paddingTop + fontSize * 0.75;
              const offset = iconCenterY - textBaselineY;
              const adjustedTop = paddingTop + offset;
              console.log("[Rich Text Placeholder] Cálculos de alineamiento:", {
                iconCenterY,
                fontSize,
                lineHeight,
                paddingTop,
                textBaselineY,
                offset,
                adjustedTop
              });
              const finalTop = Math.max(0, adjustedTop);
              const currentPadding = editableDiv.style.padding || computedStyle.padding || "12px 12px";
              const paddingParts = currentPadding.split(" ");
              const paddingRight = paddingParts[1] || paddingParts[0] || "12px";
              const paddingBottom = paddingParts[2] || paddingParts[0] || "12px";
              const paddingLeft = paddingParts[3] || paddingParts[1] || paddingParts[0] || "40px";
              editableDiv.style.padding = `${finalTop}px ${paddingRight} ${paddingBottom} ${paddingLeft}`;
              editableDiv.style.setProperty("--placeholder-top", `${finalTop}px`);
              editableDiv.style.setProperty("--placeholder-left", paddingLeft);
              console.log("[Rich Text Placeholder] Variables CSS finales:", {
                "--placeholder-top": `${finalTop}px`,
                "--placeholder-left": paddingLeft,
                "editableDiv padding actualizado": `${finalTop}px ${paddingRight} ${paddingBottom} ${paddingLeft}`
              });
            } else {
              console.warn("[Rich Text Placeholder] EditableDiv aún no tiene dimensiones válidas");
            }
          }
        });
      });
    }
    const syncContent = (event) => {
      const textContent = editableDiv.innerText || "";
      textareaElement.value = textContent;
      if (onChange) {
        onChange(textContent, event);
      }
      if (!textContent.trim()) {
        editableDiv.classList.add("ubits-rich-text-placeholder");
      } else {
        editableDiv.classList.remove("ubits-rich-text-placeholder");
      }
    };
    editableDiv.addEventListener("input", syncContent);
    editableDiv.addEventListener("blur", syncContent);
    editableDiv.addEventListener("focus", () => {
      if (editableDiv.classList.contains("ubits-rich-text-placeholder")) {
        editableDiv.textContent = "";
        editableDiv.classList.remove("ubits-rich-text-placeholder");
      }
      const toolbar2 = richTextWrapper.querySelector(".ubits-input-rich-text-toolbar");
      if (toolbar2) {
        const toolbarBorderBottom = window.getComputedStyle(toolbar2).borderBottom;
        window.getComputedStyle(toolbar2).borderTop;
        if (toolbarBorderBottom && toolbarBorderBottom !== "none" && toolbarBorderBottom !== "0px") {
          console.warn(`[Rich Text] ⚠️ Línea divisoria detectada en focus, removiendo...`);
          toolbar2.style.borderBottom = "none";
          toolbar2.style.borderTop = "none";
        }
      }
    });
    richTextWrapper.addEventListener("mouseenter", () => {
      const toolbar2 = richTextWrapper.querySelector(".ubits-input-rich-text-toolbar");
      if (toolbar2) {
        const toolbarBorderBottom = window.getComputedStyle(toolbar2).borderBottom;
        if (toolbarBorderBottom && toolbarBorderBottom !== "none" && toolbarBorderBottom !== "0px") {
          console.warn(`[Rich Text] ⚠️ Línea divisoria detectada en hover, removiendo...`);
          toolbar2.style.borderBottom = "none";
          toolbar2.style.borderTop = "none";
        }
      }
    });
    const toolbarButtons = toolbar.querySelectorAll(".ubits-rich-text-btn");
    toolbarButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        editableDiv.focus();
        const command = button.getAttribute("data-command");
        if (!command) return;
        if (command === "insertImage") {
          showInsertImageModal(editableDiv, syncContent);
        } else if (command === "insertTable") {
          showInsertTableModal(editableDiv, syncContent);
        } else if (command === "createLink") {
          showCreateLinkModal(editableDiv, syncContent);
        } else if (command === "code") {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const code = document.createElement("code");
            code.style.background = "var(--ubits-bg-2)";
            code.style.padding = `var(--ubits-spacing-xs, 2px) var(--ubits-spacing-sm, 4px)`;
            code.style.borderRadius = `var(--ubits-border-radius-sm, 4px)`;
            code.style.fontFamily = "var(--font-mono, monospace)";
            try {
              range.surroundContents(code);
            } catch (e2) {
              code.textContent = range.toString();
              range.deleteContents();
              range.insertNode(code);
            }
          }
        } else {
          document.execCommand(command, false, void 0);
        }
        syncContent();
      });
    });
  }
  function setupTextareaPlaceholderAlignment(container, textareaElement) {
    let inputWrapper = container.closest(".ubits-input-wrapper");
    if (!inputWrapper) {
      inputWrapper = container.parentElement?.closest(".ubits-input-wrapper");
    }
    if (!inputWrapper) {
      const containerParent = document.getElementById(container.id)?.parentElement;
      inputWrapper = containerParent?.closest(".ubits-input-wrapper");
    }
    let leftIconElement = null;
    if (inputWrapper) {
      leftIconElement = inputWrapper.querySelector(".ubits-input-icon-left");
    }
    if (!leftIconElement && container.parentElement) {
      leftIconElement = container.parentElement.querySelector(".ubits-input-icon-left");
    }
    if (!leftIconElement) {
      const allIcons = document.querySelectorAll(".ubits-input-icon-left");
      for (const icon of Array.from(allIcons)) {
        const iconElement = icon;
        const containerRect = container.getBoundingClientRect();
        const iconRect = iconElement.getBoundingClientRect();
        if (Math.abs(iconRect.top - containerRect.top) < 100) {
          leftIconElement = iconElement;
          break;
        }
      }
    }
    const hasLeftIcon = leftIconElement !== null;
    if (!hasLeftIcon || !leftIconElement) {
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const iconAfterRender = inputWrapper?.querySelector(".ubits-input-icon-left") || leftIconElement;
        if (iconAfterRender && textareaElement) {
          const iconRect = iconAfterRender.getBoundingClientRect();
          const textareaRect = textareaElement.getBoundingClientRect();
          if (textareaRect.width > 0 && textareaRect.height > 0) {
            const relativeIconTop = iconRect.top - textareaRect.top;
            iconRect.bottom - textareaRect.top;
            iconRect.left - textareaRect.left;
            const iconCenterY = relativeIconTop + iconRect.height / 2;
            const computedStyle = window.getComputedStyle(textareaElement);
            const fontSize = parseFloat(computedStyle.fontSize || "16px");
            const paddingTop = parseFloat(computedStyle.paddingTop || "12px");
            const textBaselineY = paddingTop + fontSize * 0.75;
            const offset = iconCenterY - textBaselineY;
            const adjustedTop = paddingTop + offset;
            const finalTop = Math.max(0, adjustedTop);
            const currentPadding = computedStyle.padding || "12px 12px";
            const paddingParts = currentPadding.split(" ");
            const paddingRight = paddingParts[1] || paddingParts[0] || "12px";
            const paddingBottom = paddingParts[2] || paddingParts[0] || "12px";
            const paddingLeft = paddingParts[3] || paddingParts[1] || paddingParts[0] || "40px";
            textareaElement.style.padding = `${finalTop}px ${paddingRight} ${paddingBottom} ${paddingLeft}`;
          }
        }
      });
    });
  }
  const DEFAULT_DURATIONS = {
    success: 3500,
    info: 3500,
    warning: 5e3,
    error: 6500
  };
  const DEFAULTS = {
    maxVisible: 3,
    pauseOnHover: true
  };
  const iconMap = {
    success: "fa-check-circle",
    info: "fa-info-circle",
    warning: "fa-exclamation-triangle",
    error: "fa-times-circle"
  };
  function renderIconHelper$e(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "regular" ? "far" : "fas";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function ensureContainer(containerId) {
    const id = containerId || "ubits-toast-container";
    let container = document.getElementById(id);
    if (!container) {
      container = document.createElement("div");
      container.id = id;
      container.style.cssText = `
      position: fixed;
      top: var(--p-spacing-mode-1-lg, 16px);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--p-spacing-mode-1-md, 12px);
      width: 100%;
      max-width: 560px;
      min-width: 320px;
      padding: 0 var(--p-spacing-mode-1-lg, 16px);
      box-sizing: border-box;
      z-index: 10000;
      pointer-events: none;
    `;
      document.body.appendChild(container);
    }
    return container;
  }
  function getAriaRole(type) {
    if (type === "warning" || type === "error") {
      return { role: "alert", ariaLive: "assertive" };
    }
    return { role: "status", ariaLive: "polite" };
  }
  function limitStack(container, maxVisible) {
    const toasts = Array.from(container.querySelectorAll(".ubits-toast"));
    if (toasts.length <= maxVisible) return;
    const overflow = toasts.length - maxVisible;
    for (let i = 0; i < overflow; i++) {
      safelyRemove(toasts[i]);
    }
  }
  function safelyRemove(toast) {
    if (!toast) return;
    toast.classList.add("ubits-toast--exit");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 180);
  }
  function renderToast(options) {
    const {
      type = "info",
      title = "",
      message = "",
      noClose = false,
      action,
      className = "",
      attributes = {}
    } = options;
    const iconClass = iconMap[type] || iconMap.info;
    const { role, ariaLive } = getAriaRole(type);
    const classes = ["ubits-toast", `ubits-toast--${type}`, className].filter(Boolean).join(" ");
    const attrs = Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
    const headerHTML = `
    <div class="ubits-toast__header">
      <div class="ubits-toast__icon" aria-hidden="true">${renderIconHelper$e(iconClass, "regular")}</div>
      <div class="ubits-toast__title">${title || ""}</div>
      ${!noClose ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "times",
      iconOnly: true,
      className: "ubits-toast__close",
      attributes: {
        "aria-label": "Cerrar notificación"
      }
    }) : ""}
    </div>
  `;
    const actionButton = action && action.label && typeof action.onClick === "function" ? `
      <div class="ubits-toast__actions">
        <button class="ubits-toast__action ubits-toast__action--${type}" type="button" data-toast-action>
          <span>${action.label}</span>
        </button>
      </div>
    ` : "";
    return `
    <div class="${classes}" role="${role}" aria-live="${ariaLive}" ${attrs}>
      <div class="ubits-toast__content">
        ${headerHTML}
        <div class="ubits-toast__body">${message}</div>
        ${actionButton}
      </div>
    </div>
  `.trim();
  }
  function createToast(options) {
    const div = document.createElement("div");
    div.innerHTML = renderToast(options);
    const toast = div.querySelector(".ubits-toast");
    if (!toast) {
      throw new Error("Failed to create toast element");
    }
    const tempParent = toast.parentElement;
    if (tempParent) {
      tempParent.removeChild(toast);
    }
    if (!options.noClose) {
      const closeButton = toast.querySelector(".ubits-toast__close");
      if (closeButton) {
        closeButton.addEventListener("click", (e) => {
          e.stopPropagation();
          safelyRemove(toast);
          if (options.onClose) {
            options.onClose();
          }
        });
      }
    }
    const actionButton = toast.querySelector("[data-toast-action]");
    if (actionButton && options.action) {
      actionButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (options.action && options.action.onClick) {
          options.action.onClick();
        }
      });
    }
    return toast;
  }
  function showToast(type, message, options = {}) {
    const container = ensureContainer(options.containerId);
    const toast = createToast({
      type,
      message,
      ...options
    });
    container.appendChild(toast);
    limitStack(container, DEFAULTS.maxVisible);
    requestAnimationFrame(() => {
      toast.classList.add("ubits-toast--enter");
    });
    const baseDuration = DEFAULT_DURATIONS[type] || DEFAULT_DURATIONS.info;
    const duration = typeof options.duration === "number" ? options.duration : baseDuration;
    if (duration > 0) {
      let remaining = duration;
      let timerId = null;
      let startTs = null;
      const startTimer = () => {
        if (duration <= 0) return;
        startTs = performance.now();
        timerId = setTimeout(() => {
          safelyRemove(toast);
          if (options.onClose) {
            options.onClose();
          }
        }, remaining);
      };
      const pauseTimer = () => {
        if (!timerId) return;
        clearTimeout(timerId);
        timerId = null;
        if (startTs) {
          const elapsed = performance.now() - startTs;
          remaining = Math.max(0, remaining - elapsed);
        }
      };
      const pauseOnHover = options.pauseOnHover !== false && DEFAULTS.pauseOnHover;
      if (pauseOnHover) {
        toast.addEventListener("mouseenter", pauseTimer);
        toast.addEventListener("mouseleave", startTimer);
        toast.addEventListener("focusin", pauseTimer);
        toast.addEventListener("focusout", startTimer);
      }
      startTimer();
      const cleanup = () => {
        toast.removeEventListener("mouseenter", pauseTimer);
        toast.removeEventListener("mouseleave", startTimer);
        toast.removeEventListener("focusin", pauseTimer);
        toast.removeEventListener("focusout", startTimer);
        if (timerId) {
          clearTimeout(timerId);
        }
      };
      const observer = new MutationObserver(() => {
        if (!toast.parentNode) {
          cleanup();
          observer.disconnect();
        }
      });
      observer.observe(container, { childList: true });
    }
    return toast;
  }
  function showToastHelper(type, message, options = {}) {
    showToast(type, message, options);
  }
  function renderIconHelper$d(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "regular" ? "far" : "fas";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function createButtonFeedback(options) {
    const {
      containerId,
      text = "",
      icon = "comment-dots",
      position = "bottom-right",
      offset = 24,
      modalTitle = "Deja tu Feedback",
      sectionOptions = [
        { value: "home", text: "Home" },
        { value: "encuestas", text: "Encuestas" }
      ],
      defaultSection = "",
      commentPlaceholder = "¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?",
      n8nWebhookUrl,
      onFeedbackSent,
      onCancel,
      onClose,
      visible = true,
      className = ""
    } = options;
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    let sectionValue = defaultSection || (sectionOptions.length > 0 ? sectionOptions[0].value : "");
    let commentValue = "";
    let modalInstance = null;
    let formContainerId = "";
    const createModalContent = () => {
      formContainerId = `ubits-button-feedback-form-${Math.random().toString(36).substr(2, 9)}`;
      const closeButtonHTML = renderButton({
        variant: "secondary",
        size: "sm",
        icon: "times",
        iconStyle: "regular",
        iconOnly: true,
        className: "ubits-button-feedback-modal__close"
      });
      const headerHTML = `
      <div class="ubits-button-feedback-modal__header">
        <div class="ubits-button-feedback-modal__header-content">
          <div class="ubits-button-feedback-modal__header-icon">
            ${renderIconHelper$d("comment-dots", "regular")}
          </div>
          <h2 class="ubits-heading-h2 ubits-button-feedback-modal__header-title">${modalTitle}</h2>
        </div>
        ${closeButtonHTML}
      </div>
    `;
      const formHTML = `
      <div class="ubits-button-feedback-form" id="${formContainerId}">
        <div class="ubits-button-feedback-form__field">
          <div id="${formContainerId}-section"></div>
        </div>
        <div class="ubits-button-feedback-form__field">
          <div id="${formContainerId}-comment"></div>
        </div>
      </div>
    `;
      return headerHTML + formHTML;
    };
    const toggleModal = () => {
      if (modalInstance) {
        closeModal();
        return;
      }
      const existingModals = document.querySelectorAll(".ubits-button-feedback-modal");
      existingModals.forEach((modal) => {
        const overlay = modal.closest(".ubits-modal-overlay");
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      });
      modalInstance = createModal({
        title: "",
        // El título está en el bodyContent
        bodyContent: createModalContent(),
        size: "md",
        open: true,
        // Abrir el modal automáticamente
        containerId,
        closeOnOverlayClick: false,
        // No cerrar al hacer clic fuera
        className: "ubits-button-feedback-modal",
        // Clase para estilos personalizados
        footerButtons: {
          tertiary: {
            label: "Cancelar",
            onClick: () => {
              if (onCancel) {
                onCancel();
              }
              closeModal();
            }
          },
          primary: {
            label: "Enviar Feedback",
            onClick: async () => {
              const sectionContainer = document.getElementById(`${formContainerId}-section`);
              const commentContainer = document.getElementById(`${formContainerId}-comment`);
              if (sectionContainer) {
                const sectionElement = sectionContainer.querySelector(
                  ".ubits-input"
                );
                if (sectionElement) {
                  sectionValue = sectionElement.value;
                }
              }
              if (commentContainer) {
                const commentElement = commentContainer.querySelector(
                  "textarea"
                );
                if (commentElement) {
                  commentValue = commentElement.value;
                }
              }
              if (!commentValue.trim()) {
                showToast("warning", "Por favor, ingresa un comentario");
                return;
              }
              if (n8nWebhookUrl) {
                try {
                  const response = await fetch(n8nWebhookUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      section: sectionValue,
                      comment: commentValue,
                      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                      url: window.location.href
                    })
                  });
                  if (!response.ok) {
                    throw new Error("Error al enviar feedback");
                  }
                  if (onFeedbackSent) {
                    onFeedbackSent({
                      section: sectionValue,
                      comment: commentValue
                    });
                  }
                  closeModal();
                  showToast("success", "¡Gracias por tu feedback!");
                } catch (error) {
                  console.error("Error enviando feedback:", error);
                  showToast("error", "Error al enviar el feedback. Por favor, intenta de nuevo.");
                }
              } else {
                if (onFeedbackSent) {
                  onFeedbackSent({
                    section: sectionValue,
                    comment: commentValue
                  });
                }
                closeModal();
              }
            }
          }
        },
        onClose: () => {
          button.classList.remove("ubits-button--active");
          if (onClose) {
            onClose();
          }
          modalInstance = null;
        }
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const modalOverlay = modalInstance?.element;
          const modal = modalOverlay?.querySelector(".ubits-button-feedback-modal");
          if (modalOverlay && modal && button) {
            modalOverlay.style.backgroundColor = "transparent";
            modalOverlay.style.pointerEvents = "none";
            const modalHeader = modal.querySelector(".ubits-modal__header");
            if (modalHeader) {
              modalHeader.style.display = "none";
            }
            const closeButton = modal.querySelector(
              ".ubits-button-feedback-modal__close"
            );
            if (closeButton) {
              closeButton.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
              });
            }
            button.classList.add("ubits-button--active");
            const buttonRect = button.getBoundingClientRect();
            modalOverlay.style.position = "fixed";
            modalOverlay.style.top = "0";
            modalOverlay.style.left = "0";
            modalOverlay.style.right = "0";
            modalOverlay.style.bottom = "0";
            modalOverlay.style.display = "flex";
            modalOverlay.style.alignItems = "flex-end";
            modalOverlay.style.justifyContent = position === "bottom-right" || position === "top-right" ? "flex-end" : "flex-start";
            modalOverlay.style.paddingBottom = `${buttonRect.height + offset + 16}px`;
            modalOverlay.style.paddingRight = position === "bottom-right" || position === "top-right" ? `${offset}px` : "auto";
            modalOverlay.style.paddingLeft = position === "bottom-left" || position === "top-left" ? `${offset}px` : "auto";
            modal.style.pointerEvents = "auto";
          }
        });
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const sectionContainer = document.getElementById(`${formContainerId}-section`);
          const commentContainer = document.getElementById(`${formContainerId}-comment`);
          if (sectionContainer) {
            try {
              const sectionInputInstance = createInput({
                containerId: `${formContainerId}-section`,
                label: "Sección actual:",
                type: "select",
                size: "md",
                value: sectionValue,
                selectOptions: sectionOptions.map((opt) => ({ value: opt.value, text: opt.text })),
                showLabel: true,
                showHelper: false,
                onChange: (value) => {
                  sectionValue = value;
                }
              });
            } catch (error) {
              console.error("Error creando select de sección:", error);
            }
          }
          if (commentContainer) {
            try {
              const commentInputInstance = createInput({
                containerId: `${formContainerId}-comment`,
                label: "Tu comentario:",
                type: "textarea",
                size: "md",
                value: commentValue,
                placeholder: commentPlaceholder,
                showLabel: true,
                showHelper: false,
                attributes: {
                  rows: "6",
                  style: "resize: vertical; min-height: 120px;"
                },
                onChange: (value) => {
                  commentValue = value;
                }
              });
            } catch (error) {
              console.error("Error creando textarea de comentario:", error);
            }
          }
        });
      });
    };
    const closeModal = () => {
      if (modalInstance) {
        const instance = modalInstance;
        const modalElement = instance.element;
        modalInstance = null;
        instance.close();
        if (modalElement && modalElement.parentNode) {
          modalElement.parentNode.removeChild(modalElement);
        }
        button.classList.remove("ubits-button--active");
      }
    };
    const finalIcon = icon || "comment-dots";
    const finalText = text || "";
    const buttonOptions = {
      variant: "primary",
      size: "md",
      text: finalText,
      // Texto del botón
      icon: finalIcon,
      // Icono del botón
      iconStyle: "regular",
      floating: true,
      // Activar variante floating
      iconOnly: !finalText && true,
      // Solo icono si no hay texto
      className: `ubits-button-feedback--${position} ${className}`.trim(),
      attributes: {
        "aria-label": "Deja tu feedback"
      },
      onClick: () => {
        toggleModal();
      }
    };
    const button = createButton(buttonOptions);
    if (buttonOptions.floating && !button.classList.contains("ubits-button--floating")) {
      button.classList.add("ubits-button--floating");
    }
    button.style.position = "fixed";
    button.style.zIndex = "9998";
    if (position === "bottom-right") {
      button.style.bottom = `${offset}px`;
      button.style.right = `${offset}px`;
      button.style.top = "auto";
      button.style.left = "auto";
    } else if (position === "bottom-left") {
      button.style.bottom = `${offset}px`;
      button.style.left = `${offset}px`;
      button.style.top = "auto";
      button.style.right = "auto";
    } else if (position === "top-right") {
      button.style.top = `${offset}px`;
      button.style.right = `${offset}px`;
      button.style.bottom = "auto";
      button.style.left = "auto";
    } else if (position === "top-left") {
      button.style.top = `${offset}px`;
      button.style.left = `${offset}px`;
      button.style.bottom = "auto";
      button.style.right = "auto";
    }
    const show = () => {
      button.classList.remove("ubits-button-feedback--hidden");
    };
    const hide = () => {
      button.classList.add("ubits-button-feedback--hidden");
    };
    const open = () => {
      toggleModal();
    };
    const destroy = () => {
      closeModal();
      if (button.parentElement) {
        button.parentElement.removeChild(button);
      }
    };
    container.appendChild(button);
    if (!visible) {
      hide();
    }
    return {
      element: button,
      show,
      hide,
      open,
      close: closeModal,
      destroy
    };
  }
  const ButtonFeedback = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createButtonFeedback
  }, Symbol.toStringTag, { value: "Module" }));
  const MONTH_NAMES = [
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
  ];
  const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  function compareDates(date1, date2) {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() - d2.getTime();
  }
  function isSameDay(date1, date2) {
    return compareDates(date1, date2) === 0;
  }
  function isDateInRange(date, startDate, endDate) {
    const dateTime = compareDates(date, startDate);
    const endTime = compareDates(endDate, date);
    return dateTime >= 0 && endTime >= 0;
  }
  function createListDropdown(items, onSelect) {
    const container = document.createElement("div");
    container.style.cssText = "position: relative; width: 100%;";
    const listContainerId = `calendar-list-container-${Date.now()}`;
    const listId = `calendar-list-${Date.now()}`;
    const scrollbarContainerId = `calendar-scrollbar-${Date.now()}`;
    let listHTML = `
    <div id="${listContainerId}" style="position: relative; width: 100%; max-height: 200px; overflow: hidden;">
      <div id="${listId}" class="ubits-list" role="list" style="max-height: 200px; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 0; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
  `;
    items.forEach((item) => {
      const itemState = item.selected ? "active" : "default";
      const itemClasses = [
        "ubits-list-item",
        "ubits-list-item--sm",
        itemState !== "default" ? `ubits-list-item--${itemState}` : ""
      ].filter(Boolean).join(" ");
      const itemAttrs = [];
      if (itemState === "active") {
        itemAttrs.push('aria-selected="true"');
      }
      itemAttrs.push('tabindex="0"');
      itemAttrs.push(`data-value="${item.value}"`);
      listHTML += `
      <div class="${itemClasses}" role="listitem" ${itemAttrs.join(" ")} style="cursor: pointer;">
        ${item.label}
      </div>
    `;
    });
    listHTML += `
      </div>
      <div id="${scrollbarContainerId}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; max-height: 200px; overflow: hidden; pointer-events: auto; z-index: 10;"></div>
    </div>
    <style>
      /* Ocultar scrollbar nativo completamente - solo mostrar UBITS scrollbar */
      #${listId}::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
      #${listId}::-webkit-scrollbar-track {
        display: none !important;
        background: transparent !important;
      }
      #${listId}::-webkit-scrollbar-thumb {
        display: none !important;
        background: transparent !important;
      }
      /* Firefox */
      #${listId} {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
    </style>
  `;
    container.innerHTML = listHTML;
    const initScrollbar = async () => {
      const listElement = document.getElementById(listId);
      const scrollbarContainer = document.getElementById(scrollbarContainerId);
      if (!listElement || !scrollbarContainer) {
        return;
      }
      if (listElement.scrollHeight <= listElement.clientHeight) {
        return;
      }
      try {
        const createScrollbarLocal = window.createScrollbarLocal;
        if (typeof createScrollbarLocal === "function") {
          const scrollbarInstance2 = createScrollbarLocal(listElement, scrollbarContainer, "vertical");
          if (scrollbarInstance2) {
            container._scrollbarInstance = scrollbarInstance2;
            return;
          }
        }
        const { createScrollbar: createScrollbar2 } = await Promise.resolve().then(() => ScrollProvider);
        const scrollbarInstance = createScrollbar2({
          orientation: "vertical",
          targetId: listId,
          containerId: scrollbarContainerId
        });
        if (scrollbarInstance) {
          container._scrollbarInstance = scrollbarInstance;
        }
      } catch (error) {
        console.error("📜 [SCROLLBAR] ❌ Error inicializando scrollbar:", error);
      }
    };
    const setupScrollbar = () => {
      if (container.isConnected) {
        requestAnimationFrame(() => {
          initScrollbar();
        });
      }
    };
    if (container.parentElement) {
      setupScrollbar();
    } else {
      const observer = new MutationObserver(() => {
        if (container.isConnected) {
          observer.disconnect();
          setupScrollbar();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        if (container.isConnected) {
          observer.disconnect();
          setupScrollbar();
        }
      }, 1e3);
    }
    setTimeout(() => {
      const listElement = document.getElementById(listId);
      if (listElement) {
        listElement.querySelectorAll(".ubits-list-item").forEach((item) => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const value = parseInt(e.currentTarget.dataset.value || "0");
            const scrollbarInstance = container._scrollbarInstance;
            if (scrollbarInstance && scrollbarInstance.destroy) {
              scrollbarInstance.destroy();
            }
            onSelect(value);
          });
        });
      }
    }, 100);
    return container;
  }
  function renderCalendar(options) {
    const {
      mode = "single",
      selectedDate,
      endDate,
      minDate,
      maxDate,
      initialDate = /* @__PURE__ */ new Date(),
      className = "",
      style = ""
    } = options;
    const currentDate = initialDate;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const today = /* @__PURE__ */ new Date();
    const todayString = today.toDateString();
    const classes = [
      "ubits-calendar",
      mode === "range" ? "ubits-calendar--range" : "ubits-calendar--single",
      className
    ].filter(Boolean).join(" ");
    const combinedStyle = style ? ` style="${style}"` : "";
    const selectedMonthName = MONTH_NAMES[month];
    const headerHTML = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${selectedMonthName}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__year-input" value="${year}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--next" aria-label="Mes siguiente">
        <i class="far fa-chevron-right"></i>
      </button>
    </div>
  `;
    const weekdaysHTML = `
    <div class="ubits-calendar__weekdays">
      ${DAY_NAMES.map((day) => `<div class="ubits-calendar__weekday">${day}</div>`).join("")}
    </div>
  `;
    let daysHTML = '<div class="ubits-calendar__days">';
    for (let i = 0; i < startingDay; i++) {
      daysHTML += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toDateString();
      const isToday = dateString === todayString;
      let dayClasses = ["ubits-calendar__day"];
      if (mode === "single" && selectedDate && isSameDay(date, selectedDate)) {
        dayClasses.push("ubits-calendar__day--selected");
      }
      if (mode === "range" && selectedDate) {
        if (endDate) {
          if (isSameDay(date, selectedDate)) {
            dayClasses.push("ubits-calendar__day--range-start");
          } else if (isSameDay(date, endDate)) {
            dayClasses.push("ubits-calendar__day--range-end");
          } else if (isDateInRange(date, selectedDate, endDate)) {
            dayClasses.push("ubits-calendar__day--in-range");
          }
        } else {
          if (isSameDay(date, selectedDate)) {
            dayClasses.push("ubits-calendar__day--range-start");
          }
        }
      }
      if (isToday) {
        dayClasses.push("ubits-calendar__day--today");
      }
      let isDisabled = false;
      if (minDate && compareDates(date, minDate) < 0) {
        isDisabled = true;
        dayClasses.push("ubits-calendar__day--disabled");
      }
      if (maxDate && compareDates(date, maxDate) > 0) {
        isDisabled = true;
        dayClasses.push("ubits-calendar__day--disabled");
      }
      const disabledAttr = isDisabled ? " disabled" : "";
      const dataDate = formatDate(date);
      daysHTML += `<button type="button" class="${dayClasses.join(" ")}" data-date="${dataDate}"${disabledAttr}>${day}</button>`;
    }
    daysHTML += "</div>";
    return `
    <div class="${classes}"${combinedStyle}>
      ${headerHTML}
      ${weekdaysHTML}
      ${daysHTML}
    </div>
  `.trim();
  }
  function createCalendar(options) {
    const {
      mode = "single",
      selectedDate,
      endDate,
      minDate,
      maxDate,
      initialDate = /* @__PURE__ */ new Date(),
      onDateSelect,
      onRangeSelect
    } = options;
    const container = document.createElement("div");
    container.innerHTML = renderCalendar(options);
    const calendar = container.firstElementChild;
    if (!calendar) {
      throw new Error("No se pudo crear el calendario");
    }
    let currentDate = new Date(initialDate);
    let currentSelectedDate = selectedDate ? new Date(selectedDate) : null;
    let currentEndDate = endDate ? new Date(endDate) : null;
    let isRendering = false;
    const render = () => {
      if (isRendering) {
        return;
      }
      isRendering = true;
      calendar.innerHTML = renderCalendar({
        ...options,
        mode,
        selectedDate: currentSelectedDate,
        endDate: currentEndDate,
        minDate,
        maxDate,
        initialDate: currentDate
      });
      setupEventListeners();
      setTimeout(() => {
        isRendering = false;
      }, 100);
    };
    const setupEventListeners = () => {
      const prevBtn = calendar.querySelector(".ubits-calendar__nav-button--prev");
      const nextBtn = calendar.querySelector(".ubits-calendar__nav-button--next");
      const monthInput = calendar.querySelector(".ubits-calendar__month-input");
      const yearInput = calendar.querySelector(".ubits-calendar__year-input");
      const monthDropdown = calendar.querySelector(".ubits-calendar__month-dropdown");
      const yearDropdown = calendar.querySelector(".ubits-calendar__year-dropdown");
      prevBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() - 1);
        if (monthInput) {
          monthInput.value = MONTH_NAMES[currentDate.getMonth()];
        }
        if (yearInput) {
          yearInput.value = String(currentDate.getFullYear());
        }
        render();
      });
      nextBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() + 1);
        if (monthInput) {
          monthInput.value = MONTH_NAMES[currentDate.getMonth()];
        }
        if (yearInput) {
          yearInput.value = String(currentDate.getFullYear());
        }
        render();
      });
      monthInput?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (monthDropdown) {
          const monthDropdownEl = monthDropdown;
          const isVisible = monthDropdownEl.style.display === "block";
          if (!isVisible) {
            if (yearDropdown) {
              yearDropdown.style.display = "none";
            }
            const monthItems = MONTH_NAMES.map((name, index) => ({
              label: name,
              value: index,
              selected: index === currentDate.getMonth()
            }));
            monthDropdownEl.innerHTML = "";
            const dropdownContent = createListDropdown(monthItems, (value) => {
              currentDate.setMonth(value);
              monthDropdownEl.style.display = "none";
              if (monthInput) {
                monthInput.value = MONTH_NAMES[value];
              }
              render();
            });
            monthDropdownEl.appendChild(dropdownContent);
            monthDropdownEl.style.display = "block";
          } else {
            monthDropdownEl.style.display = "none";
          }
        }
      });
      yearInput?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (yearDropdown) {
          const yearDropdownEl = yearDropdown;
          const isVisible = yearDropdownEl.style.display === "block";
          if (!isVisible) {
            if (monthDropdown) {
              monthDropdown.style.display = "none";
            }
            const currentYear = currentDate.getFullYear();
            const yearItems = Array.from({ length: 100 }, (_, i) => {
              const yearOption = currentYear - 50 + i;
              return {
                label: String(yearOption),
                value: yearOption,
                selected: yearOption === currentYear
              };
            });
            yearDropdownEl.innerHTML = "";
            const dropdownContent = createListDropdown(yearItems, (value) => {
              currentDate.setFullYear(value);
              yearDropdownEl.style.display = "none";
              if (yearInput) {
                yearInput.value = String(value);
              }
              render();
            });
            yearDropdownEl.appendChild(dropdownContent);
            yearDropdownEl.style.display = "block";
          } else {
            yearDropdownEl.style.display = "none";
          }
        }
      });
      const dayButtons = calendar.querySelectorAll(
        ".ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)"
      );
      dayButtons.forEach((dayBtn) => {
        dayBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const dateStr = dayBtn.dataset.date || "";
          const [day, month, year] = dateStr.split("/");
          const clickedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          if (mode === "single") {
            currentSelectedDate = clickedDate;
            render();
            if (onDateSelect) {
              onDateSelect(clickedDate);
            }
          } else if (mode === "range") {
            if (!currentSelectedDate || currentSelectedDate && currentEndDate) {
              currentSelectedDate = clickedDate;
              currentEndDate = null;
              render();
            } else if (currentSelectedDate && !currentEndDate) {
              if (compareDates(clickedDate, currentSelectedDate) < 0) {
                currentEndDate = currentSelectedDate;
                currentSelectedDate = clickedDate;
              } else {
                currentEndDate = clickedDate;
              }
              render();
              if (onRangeSelect && currentSelectedDate && currentEndDate) {
                onRangeSelect(currentSelectedDate, currentEndDate);
              }
            }
          }
        });
      });
    };
    render();
    const update = (newOptions) => {
      if (newOptions.selectedDate !== void 0) {
        currentSelectedDate = newOptions.selectedDate ? new Date(newOptions.selectedDate) : null;
      }
      if (newOptions.endDate !== void 0) {
        currentEndDate = newOptions.endDate ? new Date(newOptions.endDate) : null;
      }
      if (newOptions.initialDate) {
        currentDate = new Date(newOptions.initialDate);
      }
      Object.assign(options, newOptions);
      render();
    };
    const destroy = () => {
      const monthDropdown = calendar.querySelector(".ubits-calendar__month-dropdown");
      const yearDropdown = calendar.querySelector(".ubits-calendar__year-dropdown");
      if (monthDropdown) {
        const scrollbarInstance = monthDropdown._scrollbarInstance;
        if (scrollbarInstance && scrollbarInstance.destroy) {
          scrollbarInstance.destroy();
        }
      }
      if (yearDropdown) {
        const scrollbarInstance = yearDropdown._scrollbarInstance;
        if (scrollbarInstance && scrollbarInstance.destroy) {
          scrollbarInstance.destroy();
        }
      }
      if (calendar.parentElement) {
        calendar.parentElement.removeChild(calendar);
      }
    };
    return {
      element: calendar,
      update,
      destroy
    };
  }
  const CalendarProvider = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createCalendar,
    renderCalendar
  }, Symbol.toStringTag, { value: "Module" }));
  const Calendar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createCalendar,
    renderCalendar
  }, Symbol.toStringTag, { value: "Module" }));
  const CONTENT_TYPES = [
    "Curso",
    "Cápsula",
    "Charla",
    "Artículo",
    "Podcast",
    "Libro",
    "Ideas de libro",
    "Caso de estudio",
    "Documento técnico",
    "Ejercicios de práctica",
    "Ruta de aprendizaje"
  ];
  const COMPETENCIES = [
    "Accountability",
    "Administración de negocios",
    "Agilidad",
    "Comunicación",
    "Cumplimiento (Compliance)",
    "Data skills",
    "Desarrollo de software",
    "Desarrollo web",
    "Digital skills",
    "e-Commerce",
    "Emprendimiento",
    "Experiencia del cliente",
    "Gestión de procesos y operaciones",
    "Gestión de proyectos",
    "Gestión de recursos tecnológicos",
    "Gestión del cambio",
    "Gestión del riesgo",
    "Gestión financiera",
    "Herramientas tecnológicas",
    "Inglés",
    "Innovación",
    "Inteligencia emocional",
    "Lenguajes de Programación",
    "Liderazgo",
    "Marketing",
    "Marketing digital",
    "Negociación",
    "People management",
    "Product design",
    "Productividad",
    "Resolución de problemas",
    "Trabajo en equipo",
    "Ventas",
    "Wellness"
  ];
  const LEVELS = {
    Básico: "far fa-gauge-min",
    Intermedio: "far fa-gauge",
    Avanzado: "far fa-gauge-max"
  };
  const DURATIONS = [
    "15 min",
    "30 min",
    "45 min",
    "60 min",
    "75 min",
    "90 min",
    "120 min",
    "180 min",
    "240 min"
  ];
  const LANGUAGES = ["Español", "Inglés", "Portugués"];
  const STATUSES = {
    default: { class: "", text: "" },
    progress: { class: "course-status--progress", text: "En progreso" },
    completed: { class: "course-status--completed", text: "Completado" }
  };
  const PROVIDERS = {
    UBITS: "assets/images/Favicons/UBITS.jpg",
    Microsoft: "assets/images/Favicons/Microsoft.jpg",
    Hubspot: "assets/images/Favicons/Hubspot.jpg",
    "Harvard Business Publishing": "assets/images/Favicons/Harvard-Business-Publishing.jpg",
    TED: "assets/images/Favicons/TED.jpg",
    AWS: "assets/images/Favicons/AWS.jpg",
    "Universidad de Los Andes": "assets/images/Favicons/Universidad-de-Los Andes.jpg",
    "Advanced English": "assets/images/Favicons/Advanced-English.jpg",
    "IE University": "assets/images/Favicons/IE-University-Publishing.jpg",
    "Código Facilito": "assets/images/Favicons/Código-Facilito.jpg",
    "Hackers del Talento": "assets/images/Favicons/Hackers-del-Talento.jpg",
    "All Ears English": "assets/images/Favicons/All Ears English.jpg",
    "American & British Academy": "assets/images/Favicons/American & British Academy.jpg",
    "Bureau Veritas": "assets/images/Favicons/Bureau-Veritas.jpg",
    Welu: "assets/images/Favicons/Welu.jpg",
    "Figsha Smart Consulting": "assets/images/Favicons/Figsha Smart Consulting.jpg",
    Instafit: "assets/images/Favicons/Instafit.jpg",
    WOBI: "assets/images/Favicons/WOBI.jpg"
  };
  function getRecommendedDuration(type) {
    if (type === "Cápsula") return "15 min";
    if (type === "Artículo") return "15 min";
    if (type === "Ruta de aprendizaje") return "120 min";
    return "60 min";
  }
  function validateCardData(cardData) {
    const errors = [];
    if (!CONTENT_TYPES.includes(cardData.type)) {
      errors.push(`Tipo de contenido no válido: ${cardData.type}`);
    }
    if (!COMPETENCIES.includes(cardData.competency)) {
      errors.push(`Competencia no válida: ${cardData.competency}`);
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }
  function renderIconHelper$c(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderCardContent(cardData) {
    const statusConfig = STATUSES[cardData.status];
    const statusClass = statusConfig.class;
    const statusText = statusConfig.text;
    const levelIcon = LEVELS[cardData.level] || LEVELS["Intermedio"];
    return `
    <div class="course-card" data-progress="${cardData.progress}" data-status="${cardData.status}">
      <div class="course-thumbnail-wrapper">
        <div class="course-thumbnail">
          <img src="${cardData.image}" alt="${cardData.title}" class="course-image">
        </div>
        <div class="course-progress-overlay">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${cardData.progress}%"></div>
          </div>
        </div>
      </div>
      <div class="course-content">
        <div class="course-header">
          <div class="course-type-status">
            <span class="course-type ubits-body-sm-regular">${cardData.type}</span>
            ${statusText ? `<span class="course-status ${statusClass} ubits-body-sm-bold">${statusText}</span>` : ""}
          </div>
        </div>
        <h3 class="course-title ubits-body-sm-bold">${cardData.title}</h3>
        <div class="course-provider">
          <div class="provider-avatar">
            <img src="${cardData.providerLogo}" alt="${cardData.provider}" class="provider-icon">
          </div>
          <span class="provider-name ubits-body-sm-regular">${cardData.provider}</span>
        </div>
        <div class="course-competency">
          <div class="spec-icon">
            ${renderIconHelper$c("fa-tag", "regular")}
          </div>
          <span class="ubits-body-sm-regular">${cardData.competency}</span>
        </div>
        <div class="course-specs">
          <div class="spec-item">
            <div class="spec-icon">
              ${renderIconHelper$c(levelIcon.replace("far ", "").replace("fas ", ""), levelIcon.startsWith("far") ? "regular" : "solid")}
            </div>
            <span class="ubits-body-sm-regular">${cardData.level}</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon">
              ${renderIconHelper$c("fa-clock", "regular")}
            </div>
            <span class="ubits-body-sm-regular">${cardData.duration}</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon">
              ${renderIconHelper$c("fa-globe", "regular")}
            </div>
            <span class="ubits-body-sm-regular">${cardData.language}</span>
          </div>
        </div>
      </div>
    </div>
  `.trim();
  }
  function loadCardContent(options) {
    const { containerId, container, cards, onClick } = options;
    let targetContainer = null;
    if (container) {
      targetContainer = container;
    } else if (containerId) {
      targetContainer = document.getElementById(containerId);
    }
    if (!targetContainer) {
      console.error(`Container not found: ${containerId || "container element"}`);
      return;
    }
    targetContainer.innerHTML = "";
    cards.forEach((cardData, index) => {
      const cardHTML = renderCardContent(cardData);
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = cardHTML;
      const cardElement = tempDiv.firstElementChild;
      if (!cardElement) {
        console.error("Failed to create card element");
        return;
      }
      if (onClick) {
        cardElement.addEventListener("click", () => {
          onClick(cardData, index, cardElement);
        });
      }
      targetContainer.appendChild(cardElement);
    });
  }
  function createCard(cardData) {
    const cardHTML = renderCardContent(cardData);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cardHTML;
    const cardElement = tempDiv.firstElementChild;
    if (!cardElement) {
      throw new Error("Failed to create card element");
    }
    return cardElement;
  }
  function renderSimpleCard(options) {
    const {
      title,
      subtitle,
      content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
      showHeader = true,
      headerBackground = "var(--modifiers-normal-color-light-bg-4)",
      headerDecorations = true,
      backgroundColor = "var(--modifiers-normal-color-light-bg-1)",
      borderColor = "var(--modifiers-normal-color-light-border-1)",
      borderRadius = "var(--ubits-border-radius-sm)",
      // Constante: 8px
      padding = "var(--ubits-spacing-lg)",
      titleTypography = "ubits-heading-h2",
      subtitleTypography = "ubits-body-md",
      contentTypography = "ubits-body-md",
      buttons = [
        { label: "Cancel", variant: "secondary", size: "md" },
        { label: "Save", variant: "primary", size: "md" }
      ],
      showButtons = true,
      variant = "default",
      size = "md",
      maxWidth,
      className = ""
    } = options;
    const cardClasses = [
      "ubits-simple-card",
      `ubits-simple-card--${variant}`,
      `ubits-simple-card--${size}`,
      className
    ].filter(Boolean).join(" ");
    const cardStyles = [
      `background: ${backgroundColor}`,
      `border: 1px solid ${borderColor}`,
      // Border constante 1px
      `border-radius: 8px !important`,
      // Border-radius constante 8px - FORZADO
      `padding: ${padding}`,
      maxWidth ? `max-width: ${maxWidth}` : ""
    ].filter(Boolean).join("; ");
    const headerStyle = headerBackground !== "var(--modifiers-normal-color-light-bg-4)" ? `style="background: ${headerBackground}"` : "";
    const headerHTML = showHeader ? `
    <div class="ubits-simple-card__header" ${headerStyle}>
      ${headerDecorations ? `
        <div class="ubits-simple-card__header-decoration ubits-simple-card__header-decoration--left">
          <div class="ubits-simple-card__bubble">
            <div class="ubits-simple-card__bubble-content">
              <div class="ubits-simple-card__logo">A</div>
            </div>
          </div>
        </div>
        <div class="ubits-simple-card__header-decoration ubits-simple-card__header-decoration--right">
          <div class="ubits-simple-card__bubble ubits-simple-card__bubble--small">
            <div class="ubits-simple-card__bubble-content">
              <div class="ubits-simple-card__logo">A</div>
            </div>
          </div>
        </div>
      ` : ""}
    </div>
  ` : "";
    const titleHTML = title ? `
    <h2 class="ubits-simple-card__title ${titleTypography}">${title}</h2>
  ` : "";
    const subtitleHTML = subtitle ? `
    <p class="ubits-simple-card__subtitle ${subtitleTypography}">${subtitle}</p>
  ` : "";
    const contentHTML = content ? `
    <div class="ubits-simple-card__content ${contentTypography}">${content}</div>
  ` : "";
    const buttonsHTML = showButtons && buttons.length > 0 ? `
    <div class="ubits-simple-card__footer">
      ${buttons.map((button) => {
      const buttonOptions = {
        variant: button.variant || "secondary",
        size: button.size || "md",
        text: button.label,
        disabled: button.disabled || false
      };
      return `<div class="ubits-simple-card__button">${renderButton(buttonOptions)}</div>`;
    }).join("")}
    </div>
  ` : "";
    return `
    <div class="${cardClasses}" style="${cardStyles}">
      ${headerHTML}
      <div class="ubits-simple-card__body">
        ${titleHTML}
        ${subtitleHTML}
        ${contentHTML}
      </div>
      ${buttonsHTML}
    </div>
  `.trim();
  }
  function createSimpleCard(options) {
    const cardHTML = renderSimpleCard(options);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cardHTML;
    const cardElement = tempDiv.firstElementChild;
    if (!cardElement) {
      throw new Error("Failed to create simple card element");
    }
    if (options.buttons && options.buttons.length > 0) {
      const buttonElements = cardElement.querySelectorAll(".ubits-button");
      buttonElements.forEach((buttonEl, index) => {
        const buttonConfig = options.buttons[index];
        if (buttonConfig?.onClick) {
          buttonEl.addEventListener("click", buttonConfig.onClick);
        }
      });
    }
    return cardElement;
  }
  const Card = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    COMPETENCIES,
    CONTENT_TYPES,
    DURATIONS,
    LANGUAGES,
    LEVELS,
    PROVIDERS,
    STATUSES,
    createCard,
    createSimpleCard,
    getRecommendedDuration,
    loadCardContent,
    renderCardContent,
    renderSimpleCard,
    validateCardData
  }, Symbol.toStringTag, { value: "Module" }));
  function renderCarousel(options) {
    const {
      items = [],
      itemsPerView = 3,
      showArrows = true,
      showDots = true,
      autoplay = false,
      autoplayInterval = 3e3,
      loop = false,
      gap = 16,
      arrowPosition = "outside",
      dotPosition = "bottom",
      className = "",
      onItemClick,
      onSlideChange
    } = options;
    if (items.length === 0) {
      return '<div class="ubits-carousel ubits-carousel--empty">No hay items para mostrar</div>';
    }
    const classes = [
      "ubits-carousel",
      arrowPosition === "inside" && "ubits-carousel--arrows-inside",
      dotPosition === "top" && "ubits-carousel--dots-top",
      className
    ].filter(Boolean).join(" ");
    const itemsHTML = items.map((item, index) => renderCarouselItem(item, index)).join("");
    const dotsHTML = showDots ? renderDots(items.length, itemsPerView) : "";
    const dataAttrs = [
      `data-items-per-view="${itemsPerView}"`,
      autoplay && `data-autoplay="true"`,
      autoplay && `data-autoplay-interval="${autoplayInterval}"`,
      loop && `data-loop="true"`,
      `data-gap="${gap}"`
    ].filter(Boolean).join(" ");
    return `
    <div class="${classes}" ${dataAttrs} style="--carousel-gap: ${gap}px;">
      <div class="ubits-carousel__content-wrapper">
        ${showArrows ? renderPrevArrow() : ""}
        <div class="ubits-carousel__container">
          <div class="ubits-carousel__track">
            ${itemsHTML}
          </div>
        </div>
        ${showArrows ? renderNextArrow() : ""}
      </div>
      ${dotsHTML}
    </div>
  `;
  }
  function renderCarouselItem(item, index, onItemClick) {
    const { id } = item;
    const { id: _, onItemClick: __, ...simpleCardOptions } = item;
    const cardOptions = {
      ...simpleCardOptions,
      maxWidth: void 0
      // No forzar maxWidth, dejar que la variante lo maneje
    };
    const cardHTML = renderSimpleCard(cardOptions);
    return `
    <div class="ubits-carousel-item" data-item-id="${id}" data-item-index="${index}">
      ${cardHTML}
    </div>
  `;
  }
  function renderPrevArrow() {
    return `
    <button class="ubits-carousel__arrow ubits-carousel__arrow--prev" 
            data-action="prev" 
            aria-label="Anterior">
      <i class="fas fa-chevron-left"></i>
    </button>
  `;
  }
  function renderNextArrow() {
    return `
    <button class="ubits-carousel__arrow ubits-carousel__arrow--next" 
            data-action="next" 
            aria-label="Siguiente">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
  }
  function renderDots(totalItems, itemsPerView) {
    const totalPages = Math.ceil(totalItems / itemsPerView);
    const dots = Array.from({ length: totalPages }, (_, index) => {
      const isActive = index === 0 ? "ubits-carousel__dot--active" : "";
      return `
      <button class="ubits-carousel__dot ${isActive}" 
              data-dot-index="${index}" 
              aria-label="Ir a página ${index + 1}">
      </button>
    `;
    }).join("");
    return `<div class="ubits-carousel__dots">${dots}</div>`;
  }
  function createCarousel(options) {
    const container = document.createElement("div");
    container.innerHTML = renderCarousel(options);
    const carousel = container.firstElementChild;
    if (carousel) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializeCarousel(carousel, options);
        });
      });
    }
    return carousel || container;
  }
  function initializeCarousel(element, options) {
    const track = element.querySelector(".ubits-carousel__track");
    const items = element.querySelectorAll(".ubits-carousel-item");
    const prevButton = element.querySelector(".ubits-carousel__arrow--prev");
    const nextButton = element.querySelector(".ubits-carousel__arrow--next");
    const dots = element.querySelectorAll(".ubits-carousel__dot");
    if (!track || items.length === 0) return;
    const itemsPerView = parseInt(element.getAttribute("data-items-per-view") || "3");
    const gap = parseInt(element.getAttribute("data-gap") || "16");
    const autoplay = element.getAttribute("data-autoplay") === "true";
    const autoplayInterval = parseInt(element.getAttribute("data-autoplay-interval") || "3000");
    const loop = element.getAttribute("data-loop") === "true";
    let currentIndex = 0;
    let autoplayTimer = null;
    const setupItems = () => {
      let maxHeight = 0;
      items.forEach((item) => {
        const simpleCard = item.querySelector(".ubits-simple-card");
        if (simpleCard) {
          item.style.width = "auto";
          item.style.minWidth = "0";
          item.style.flexShrink = "0";
          const cardHeight = simpleCard.offsetHeight || simpleCard.getBoundingClientRect().height;
          if (cardHeight > maxHeight) {
            maxHeight = cardHeight;
          }
        }
      });
      if (maxHeight > 0) {
        items.forEach((item) => {
          const simpleCard = item.querySelector(".ubits-simple-card");
          if (simpleCard) {
            simpleCard.style.height = `${maxHeight}px`;
          }
        });
      }
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupItems();
        });
      });
    });
    const getCardWidth = () => {
      if (items.length === 0) return 0;
      const firstItem = items[0];
      const firstCard = firstItem.querySelector(".ubits-simple-card");
      if (firstCard && firstCard.offsetWidth > 0) {
        return firstCard.offsetWidth + gap;
      }
      if (firstCard) {
        const cardRect = firstCard.getBoundingClientRect();
        if (cardRect.width > 0) {
          return cardRect.width + gap;
        }
      }
      const container = element.querySelector(".ubits-carousel__container");
      if (container && container.offsetWidth > 0) {
        return container.offsetWidth / itemsPerView;
      }
      return 300;
    };
    const updatePosition = () => {
      const cardWidth = getCardWidth();
      const translateX = -currentIndex * cardWidth;
      track.style.transform = `translateX(${translateX}px)`;
      dots.forEach((dot, index) => {
        const pageIndex = Math.floor(currentIndex / itemsPerView);
        if (index === pageIndex) {
          dot.classList.add("ubits-carousel__dot--active");
        } else {
          dot.classList.remove("ubits-carousel__dot--active");
        }
      });
      if (options.onSlideChange) {
        options.onSlideChange(currentIndex);
      }
    };
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else if (loop) {
          currentIndex = items.length - itemsPerView;
        }
        updatePosition();
        resetAutoplay();
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const maxIndex = Math.max(0, items.length - itemsPerView);
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else if (loop) {
          currentIndex = 0;
        }
        updatePosition();
        resetAutoplay();
      });
    }
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index * itemsPerView;
        updatePosition();
        resetAutoplay();
      });
    });
    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        const target = e.target;
        if (target.closest("button") || target.closest(".ubits-button")) return;
        const itemId = item.getAttribute("data-item-id");
        const carouselItem = options.items.find((i) => String(i.id) === itemId);
        if (carouselItem && carouselItem.onItemClick) {
          carouselItem.onItemClick(carouselItem);
        } else if (carouselItem && options.onItemClick) {
          options.onItemClick(carouselItem);
        }
      });
    });
    const startAutoplay = () => {
      if (autoplay) {
        autoplayTimer = window.setInterval(() => {
          const maxIndex = Math.max(0, items.length - itemsPerView);
          if (currentIndex < maxIndex) {
            currentIndex++;
          } else if (loop) {
            currentIndex = 0;
          } else {
            currentIndex = 0;
          }
          updatePosition();
        }, autoplayInterval);
      }
    };
    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };
    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };
    element.addEventListener("mouseenter", stopAutoplay);
    element.addEventListener("mouseleave", startAutoplay);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updatePosition();
        startAutoplay();
      });
    });
  }
  class UBITSCarousel extends HTMLElement {
    constructor() {
      super(...arguments);
      this.options = { items: [] };
    }
    static get observedAttributes() {
      return [
        "items-per-view",
        "show-arrows",
        "show-dots",
        "autoplay",
        "autoplay-interval",
        "loop",
        "gap",
        "arrow-position",
        "dot-position",
        "class"
      ];
    }
    connectedCallback() {
      this.updateOptions();
      this.render();
    }
    attributeChangedCallback() {
      this.updateOptions();
      this.render();
    }
    disconnectedCallback() {
    }
    updateOptions() {
      let items = [];
      const itemsData = this.getAttribute("data-items");
      if (itemsData) {
        try {
          items = JSON.parse(itemsData);
        } catch (e) {
          console.error("Error parsing carousel items:", e);
        }
      }
      this.options = {
        items,
        itemsPerView: parseInt(this.getAttribute("items-per-view") || "3"),
        showArrows: this.getAttribute("show-arrows") !== "false",
        showDots: this.getAttribute("show-dots") !== "false",
        autoplay: this.getAttribute("autoplay") === "true",
        autoplayInterval: parseInt(this.getAttribute("autoplay-interval") || "3000"),
        loop: this.getAttribute("loop") === "true",
        gap: parseInt(this.getAttribute("gap") || "16"),
        arrowPosition: this.getAttribute("arrow-position") || "outside",
        dotPosition: this.getAttribute("dot-position") || "bottom",
        className: this.getAttribute("class") || ""
      };
    }
    render() {
      this.innerHTML = renderCarousel(this.options);
      const carouselElement = this.querySelector(".ubits-carousel");
      if (carouselElement) {
        const { initializeCarousel: initializeCarousel2 } = require("./CarouselProvider");
        initializeCarousel2(carouselElement, this.options);
      }
    }
    // Métodos públicos para actualizar el carrusel
    setItems(items) {
      this.options.items = items;
      this.setAttribute("data-items", JSON.stringify(items));
      this.render();
    }
    next() {
      const nextButton = this.querySelector('[data-action="next"]');
      if (nextButton) {
        nextButton.click();
      }
    }
    prev() {
      const prevButton = this.querySelector('[data-action="prev"]');
      if (prevButton) {
        prevButton.click();
      }
    }
    goTo(index) {
      const dot = this.querySelector(`[data-dot-index="${index}"]`);
      if (dot) {
        dot.click();
      }
    }
  }
  class CarouselAddon {
    constructor() {
      this.name = "@ubits/carousel";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-carousel")) {
        customElements.define("ubits-carousel", UBITSCarousel);
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.Carousel = {
          render: (options) => {
            const { renderCarousel: renderCarousel2 } = require("./CarouselProvider");
            return renderCarousel2(options);
          },
          create: (options) => {
            const { createCarousel: createCarousel2 } = require("./CarouselProvider");
            return createCarousel2(options);
          }
        };
        if (!window.createCarousel) {
          window.createCarousel = (options) => {
            const { createCarousel: createCarousel2 } = require("./CarouselProvider");
            return createCarousel2(options);
          };
        }
      }
      console.log("✅ Carousel add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined" && window.UBITS?.Carousel) {
        delete window.UBITS.Carousel;
        delete window.createCarousel;
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-carousel",
          tag: "ubits-carousel",
          documentation: "https://ubits.design/components/carousel"
        }
      ];
    }
    getStyles() {
      return ["./styles/carousel.css"];
    }
  }
  const Carousel = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    CarouselAddon,
    UBITSCarousel,
    createCarousel,
    initializeCarousel,
    renderCarousel
  }, Symbol.toStringTag, { value: "Module" }));
  function renderCheckbox(options) {
    const {
      label,
      complementaryText,
      value = "",
      name = "",
      checked = false,
      indeterminate = false,
      size = "md",
      state = "default",
      disabled = false,
      className = ""
    } = options;
    const isDisabled = disabled || state === "disabled";
    const classes = [
      "ubits-checkbox",
      `ubits-checkbox--${size}`,
      state !== "default" ? `ubits-checkbox--${state}` : "",
      checked ? "ubits-checkbox--checked" : "",
      indeterminate ? "ubits-checkbox--indeterminate" : "",
      isDisabled ? "ubits-checkbox--disabled" : "",
      className
    ].filter(Boolean).join(" ");
    const checkboxInput = `
    <input
      type="checkbox"
      id="checkbox-${name}-${value || "default"}"
      ${name ? `name="${name}"` : ""}
      ${value ? `value="${value}"` : ""}
      ${checked ? "checked" : ""}
      ${indeterminate ? 'data-indeterminate="true"' : ""}
      ${isDisabled ? "disabled" : ""}
      class="ubits-checkbox__input"
    />
  `;
    const checkboxSquare = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${indeterminate ? '<span class="ubits-checkbox__indeterminate"></span>' : ""}
      ${checked && !indeterminate ? '<span class="ubits-checkbox__checkmark"></span>' : ""}
      ${!checked && !indeterminate && state === "active" ? '<span class="ubits-checkbox__checkmark"></span>' : ""}
    </span>
  `;
    const labelHTML = `
    <span class="ubits-checkbox__label">${label}</span>
  `;
    const complementaryTextHTML = complementaryText ? `<span class="ubits-checkbox__complementary-text">${complementaryText}</span>` : "";
    const textContentHTML = `
    <div class="ubits-checkbox__text-content">
      ${labelHTML}
      ${complementaryTextHTML}
    </div>
  `;
    return `
    <label class="${classes}">
      ${checkboxInput}
      ${checkboxSquare}
      ${textContentHTML}
    </label>
  `.trim();
  }
  function createCheckbox(options) {
    const container = options.containerId ? document.getElementById(options.containerId) : document.body;
    if (!container) {
      throw new Error(`Container with id "${options.containerId}" not found`);
    }
    const checkboxHTML = renderCheckbox(options);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = checkboxHTML.trim();
    const element = tempDiv.firstElementChild;
    if (!element) {
      throw new Error("Failed to create checkbox element");
    }
    container.appendChild(element);
    const inputElement = element.querySelector(".ubits-checkbox__input");
    if (inputElement) {
      if (options.indeterminate) {
        inputElement.indeterminate = true;
      }
      if (options.onChange) {
        inputElement.addEventListener("change", options.onChange);
      }
    }
    const destroy = () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
    const update = (newOptions) => {
      const updatedOptions = { ...options, ...newOptions };
      const newHTML = renderCheckbox(updatedOptions);
      const tempDiv2 = document.createElement("div");
      tempDiv2.innerHTML = newHTML.trim();
      const newElement = tempDiv2.firstElementChild;
      if (newElement && element.parentNode) {
        element.parentNode.replaceChild(newElement, element);
        const newInputElement = newElement.querySelector(
          ".ubits-checkbox__input"
        );
        if (newInputElement) {
          if (updatedOptions.indeterminate) {
            newInputElement.indeterminate = true;
          }
          if (updatedOptions.onChange) {
            newInputElement.addEventListener("change", updatedOptions.onChange);
          }
        }
      }
    };
    return {
      element,
      destroy,
      update
    };
  }
  const Checkbox = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createCheckbox,
    renderCheckbox
  }, Symbol.toStringTag, { value: "Module" }));
  function renderChip(options = {}) {
    const {
      label = "",
      size = "md",
      state = "default",
      leftIcon,
      rightIcon,
      clickable = false,
      closable = false,
      className = ""
    } = options;
    const classes = [
      "ubits-chip",
      `ubits-chip--${size}`,
      state !== "default" ? `ubits-chip--${state}` : "",
      clickable ? "ubits-chip--clickable" : "",
      closable ? "ubits-chip--closable" : "",
      className
    ].filter(Boolean).join(" ");
    const leftIconHTML = leftIcon ? `<span class="ubits-chip__left-icon" aria-hidden="true"><i class="far fa-${leftIcon}"></i></span>` : "";
    const rightIconHTML = closable || rightIcon ? `<button class="ubits-chip__right-icon" type="button" aria-label="Cerrar chip" ${state === "disabled" ? "disabled" : ""}>
        <i class="far fa-${rightIcon || "xmark"}"></i>
      </button>` : "";
    const role = clickable ? "button" : "none";
    const tabIndex = clickable && state !== "disabled" ? "0" : "-1";
    const ariaDisabled = state === "disabled" ? "true" : "false";
    return `
    <span class="${classes}" role="${role}" tabindex="${tabIndex}" aria-disabled="${ariaDisabled}">
      ${leftIconHTML}
      <span class="ubits-chip__label">${label}</span>
      ${rightIconHTML}
    </span>
  `.trim();
  }
  function createChip(options = {}) {
    const { containerId, onClick, onClose } = options;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderChip(options);
    const chip = wrapper.firstElementChild;
    if (!chip) {
      throw new Error("No se pudo crear el chip");
    }
    if (onClick && options.state !== "disabled") {
      chip.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      });
    }
    const closeButton = chip.querySelector(".ubits-chip__right-icon");
    if (closeButton && onClose) {
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(e);
      });
    }
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    container.appendChild(chip);
    const destroy = () => {
      if (chip.parentElement) {
        chip.parentElement.removeChild(chip);
      }
    };
    const update = (newOptions) => {
      const updatedOptions = { ...options, ...newOptions };
      const wrapper2 = document.createElement("div");
      wrapper2.innerHTML = renderChip(updatedOptions);
      const newChip = wrapper2.firstElementChild;
      if (newChip && chip.parentElement) {
        if (updatedOptions.onClick && updatedOptions.state !== "disabled") {
          newChip.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            updatedOptions.onClick(e);
          });
        }
        const newCloseButton = newChip.querySelector(".ubits-chip__right-icon");
        if (newCloseButton && updatedOptions.onClose) {
          newCloseButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            updatedOptions.onClose(e);
          });
        }
        chip.parentElement.replaceChild(newChip, chip);
        return newChip;
      }
    };
    return {
      element: chip,
      destroy,
      update
    };
  }
  const Chip = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createChip,
    renderChip
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$b(iconName, iconStyle = "regular", iconColor) {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    const colorStyle = iconColor ? `style="color: ${iconColor};"` : "";
    return `<i class="${iconClass} ${name}" ${colorStyle}></i>`;
  }
  const FACES = [
    { icon: "face-angry", label: "Muy malo", color: "var(--ubits-feedback-accent-error)" },
    { icon: "face-sad-tear", label: "Malo", color: "var(--ubits-feedback-fg-warning-subtle-hover)" },
    { icon: "face-meh", label: "Regular", color: "var(--ubits-feedback-accent-info)" },
    { icon: "face-smile", label: "Bueno", color: "var(--ubits-feedback-accent-success)" },
    { icon: "face-smile-beam", label: "Muy bueno", color: "var(--ubits-feedback-accent-success)" }
  ];
  function renderFacesRating(score) {
    const totalFaces = 5;
    const roundedScore = Math.round(score);
    const selectedFaceIndex = Math.min(Math.max(roundedScore - 1, 0), totalFaces - 1);
    let facesHTML = "";
    for (let i = 0; i < totalFaces; i++) {
      const face = FACES[i];
      const isSelected = i === selectedFaceIndex;
      const faceClass = isSelected ? "ubits-csat-metric-card__face ubits-csat-metric-card__face--selected" : "ubits-csat-metric-card__face ubits-csat-metric-card__face--empty";
      const faceColor = isSelected ? face.color : "var(--modifiers-normal-color-light-border-1)";
      facesHTML += `
      <div class="ubits-csat-metric-card__face-wrapper">
        <i class="far fa-${face.icon} ${faceClass}" style="color: ${faceColor};"></i>
        <span class="ubits-csat-metric-card__face-label">${face.label}</span>
      </div>
    `;
    }
    return facesHTML;
  }
  function renderCSATMetricCard(options) {
    const {
      title,
      totalResponses = 0,
      responsesLabel = "respuestas",
      average = 0,
      averageLabel = "Promedio:",
      score = 0,
      titleIcon,
      titleIconStyle = "regular",
      titleIconColor,
      showInfoIcon = false,
      showActionButton = false,
      size = "md",
      className = "",
      attributes = {}
    } = options;
    const classes = ["ubits-csat-metric-card", `ubits-csat-metric-card--${size}`, className].filter(Boolean).join(" ");
    const attrs = [...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)].filter(Boolean).join(" ");
    const titleIconHTML = titleIcon ? `<div class="ubits-csat-metric-card__title-icon">${renderIconHelper$b(titleIcon, titleIconStyle, titleIconColor)}</div>` : "";
    const infoIconHTML = showInfoIcon ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "circle-info",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Información",
        type: "button"
      }
    }) : "";
    const actionButtonHTML = showActionButton ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "chevron-right",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Ver más",
        type: "button"
      }
    }) : "";
    const titleSizeClass = "ubits-body-md-bold";
    const statsClass = "ubits-body-sm-regular";
    const formattedAverage = average.toFixed(2);
    const facesHTML = renderFacesRating(score);
    return `
    <div class="${classes}" ${attrs}>
      <div class="ubits-csat-metric-card__header">
        ${titleIconHTML}
        <div class="ubits-csat-metric-card__title-group">
          <h3 class="ubits-csat-metric-card__title ${titleSizeClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-csat-metric-card__action-button">${actionButtonHTML}</div>` : ""}
      </div>
      <div class="ubits-csat-metric-card__body">
        <div class="ubits-csat-metric-card__stats">
          <span class="ubits-csat-metric-card__responses ${statsClass}">${totalResponses} ${responsesLabel}</span>
          <span class="ubits-csat-metric-card__average ${statsClass}">${averageLabel} (${formattedAverage})</span>
        </div>
        <div class="ubits-csat-metric-card__chart">
          <div class="ubits-csat-metric-card__faces">
            ${facesHTML}
          </div>
        </div>
      </div>
    </div>
  `;
  }
  function createCSATMetricCard(options) {
    const { containerId, ...cardOptions } = options;
    if (!containerId) {
      console.error("❌ [CSATMetricCard] containerId es requerido para createCSATMetricCard");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ [CSATMetricCard] Contenedor con ID "${containerId}" no encontrado`);
      return null;
    }
    const html = renderCSATMetricCard(cardOptions);
    container.innerHTML = html;
    const cardElement = container.querySelector(".ubits-csat-metric-card");
    if (!cardElement) {
      console.error("❌ [CSATMetricCard] No se pudo crear el elemento de la tarjeta");
      return null;
    }
    if (cardOptions.onClick) {
      cardElement.addEventListener("click", cardOptions.onClick);
    }
    console.log("✅ [CSATMetricCard] Tarjeta creada exitosamente");
    return cardElement;
  }
  const CsatMetricCard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createCSATMetricCard,
    renderCSATMetricCard
  }, Symbol.toStringTag, { value: "Module" }));
  const STATUS_COLORS = {
    // Estados verdes (success) - Valores exactos de Figma
    completed: {
      bg: "var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-success)"
    },
    published: {
      bg: "var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-success)"
    },
    fulfilled: {
      bg: "var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-success)"
    },
    created: {
      bg: "var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-success)"
    },
    active: {
      bg: "var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-success)"
    },
    // Estados rojos (error) - Valores exactos de Figma
    "not-fulfilled": {
      bg: "var(--modifiers-normal-color-light-feedback-bg-error-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-error)"
    },
    denied: {
      bg: "var(--modifiers-normal-color-light-feedback-bg-error-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-error)"
    },
    // Estados azules (info) - Valores exactos de Figma con gradiente
    draft: {
      bg: "var(--modifiers-normal-color-light-bg-active)",
      text: "var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)",
      border: "var(--modifiers-normal-color-light-accent-brand)"
    },
    "in-progress": {
      bg: "var(--modifiers-normal-color-light-bg-active)",
      text: "var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)",
      border: "var(--modifiers-normal-color-light-accent-brand)"
    },
    syncing: {
      bg: "var(--modifiers-normal-color-light-bg-active)",
      text: "var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)",
      border: "var(--modifiers-normal-color-light-accent-brand)"
    },
    // Estados naranjas/amarillos (warning) - Valores exactos de Figma
    pending: {
      bg: "var(--modifiers-normal-color-light-feedback-bg-warning-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-warning-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-warning)"
    },
    "pending-approval": {
      bg: "var(--modifiers-normal-color-light-feedback-bg-warning-subtle-default)",
      text: "var(--modifiers-normal-color-light-feedback-fg-warning-subtle-default)",
      border: "var(--modifiers-normal-color-light-feedback-border-warning)"
    },
    // Estados grises (neutral) - Valores exactos de Figma
    "not-started": {
      bg: "var(--modifiers-normal-color-light-bg-2)",
      text: "var(--modifiers-normal-color-light-fg-1-medium)",
      border: "var(--modifiers-normal-color-light-border-1)"
    },
    finished: {
      bg: "var(--modifiers-normal-color-light-bg-2)",
      text: "var(--modifiers-normal-color-light-fg-1-medium)",
      border: "var(--modifiers-normal-color-light-border-1)"
    },
    archived: {
      bg: "var(--modifiers-normal-color-light-bg-2)",
      text: "var(--modifiers-normal-color-light-fg-1-medium)",
      border: "var(--modifiers-normal-color-light-border-1)"
    },
    disabled: {
      bg: "var(--modifiers-normal-color-light-bg-2)",
      text: "var(--modifiers-normal-color-light-fg-1-medium)",
      border: "var(--modifiers-normal-color-light-border-1)"
    },
    paused: {
      bg: "var(--modifiers-normal-color-light-bg-2)",
      text: "var(--modifiers-normal-color-light-fg-1-medium)",
      border: "var(--modifiers-normal-color-light-border-1)"
    },
    hidden: {
      bg: "var(--modifiers-normal-color-light-bg-2)",
      text: "var(--modifiers-normal-color-light-fg-1-medium)",
      border: "var(--modifiers-normal-color-light-border-1)"
    }
  };
  function renderStatusTag(options = {}) {
    const {
      label = "",
      size = "md",
      status = "pending",
      leftIcon,
      rightIcon = "chevron-down",
      clickable = false,
      className = ""
    } = options;
    const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;
    const leftIconHTML = leftIcon ? `<span class="ubits-status-tag-left-icon"><i class="far fa-${leftIcon}"></i></span>` : "";
    const rightIconHTML = rightIcon !== null && rightIcon !== void 0 ? `<span class="ubits-status-tag-right-icon"><i class="far fa-${rightIcon}"></i></span>` : "";
    const classes = [
      "ubits-status-tag",
      `ubits-status-tag--${size}`,
      clickable ? "ubits-status-tag--clickable" : "",
      className
    ].filter(Boolean).join(" ");
    const isInfoStatus = status === "draft" || status === "in-progress" || status === "syncing";
    const bgStyle = isInfoStatus ? `background: linear-gradient(90deg, var(--modifiers-normal-color-light-bg-active) 0%, var(--modifiers-normal-color-light-bg-active) 100%), linear-gradient(90deg, var(--modifiers-normal-color-light-bg-1) 0%, var(--modifiers-normal-color-light-bg-1) 100%); background-color: ${colors.bg};` : `background-color: ${colors.bg};`;
    const inlineStyles = `
    ${bgStyle}
    color: ${colors.text};
    border-color: ${colors.border};
  `.trim();
    return `
    <span class="${classes}" style="${inlineStyles}" data-status="${status}">
      ${leftIconHTML}
      <span class="ubits-status-tag-label">${label}</span>
      ${rightIconHTML}
    </span>
  `.trim();
  }
  function createStatusTag(options = {}) {
    const div = document.createElement("div");
    div.innerHTML = renderStatusTag(options);
    const tag = div.querySelector(".ubits-status-tag");
    if (options.clickable && options.onClick) {
      tag.addEventListener("click", options.onClick);
    }
    return tag;
  }
  function renderToggle(options) {
    const {
      label,
      complementaryText,
      value = "",
      name = "",
      checked = false,
      size = "md",
      state = "default",
      disabled = false,
      className = ""
    } = options;
    const isDisabled = disabled || state === "disabled";
    const classes = [
      "ubits-toggle",
      `ubits-toggle--${size}`,
      state !== "default" ? `ubits-toggle--${state}` : "",
      checked ? "ubits-toggle--checked" : "",
      isDisabled ? "ubits-toggle--disabled" : "",
      className
    ].filter(Boolean).join(" ");
    const toggleInput = `
    <input
      type="checkbox"
      id="toggle-${name}-${value || "default"}"
      ${name ? `name="${name}"` : ""}
      ${value ? `value="${value}"` : ""}
      ${checked ? "checked" : ""}
      ${isDisabled ? "disabled" : ""}
      class="ubits-toggle__input"
      role="switch"
      aria-checked="${checked}"
    />
  `;
    const toggleTrack = `
    <span class="ubits-toggle__track" aria-hidden="true">
      <span class="ubits-toggle__thumb"></span>
    </span>
  `;
    let textContentHTML = "";
    if (label || complementaryText) {
      const labelHTML = label ? `<span class="ubits-toggle__label">${label}</span>` : "";
      const complementaryTextHTML = complementaryText ? `<span class="ubits-toggle__complementary-text">${complementaryText}</span>` : "";
      textContentHTML = `
      <div class="ubits-toggle__text-content">
        ${labelHTML}
        ${complementaryTextHTML}
      </div>
    `;
    }
    const wrapperTag = label || complementaryText ? "label" : "div";
    const wrapperClass = label || complementaryText ? classes : `${classes} ubits-toggle--no-label`;
    return `
    <${wrapperTag} class="${wrapperClass}">
      ${toggleInput}
      ${textContentHTML}
      ${toggleTrack}
    </${wrapperTag}>
  `.trim();
  }
  function createToggle(options) {
    const container = options.containerId ? document.getElementById(options.containerId) : document.body;
    if (!container) {
      throw new Error(`Container with id "${options.containerId}" not found`);
    }
    const toggleHTML = renderToggle(options);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = toggleHTML.trim();
    const element = tempDiv.firstElementChild;
    if (!element) {
      throw new Error("Failed to create toggle element");
    }
    container.appendChild(element);
    const inputElement = element.querySelector(".ubits-toggle__input");
    if (inputElement && options.onChange) {
      inputElement.addEventListener("change", options.onChange);
    }
    const destroy = () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
    const update = (newOptions) => {
      const updatedOptions = { ...options, ...newOptions };
      const newHTML = renderToggle(updatedOptions);
      const tempDiv2 = document.createElement("div");
      tempDiv2.innerHTML = newHTML.trim();
      const newElement = tempDiv2.firstElementChild;
      if (newElement && element.parentNode) {
        element.parentNode.replaceChild(newElement, element);
        const newInputElement = newElement.querySelector(".ubits-toggle__input");
        if (newInputElement && updatedOptions.onChange) {
          newInputElement.addEventListener("change", updatedOptions.onChange);
        }
      }
    };
    return {
      element,
      destroy,
      update
    };
  }
  function renderRadioButton(options) {
    const {
      label,
      complementaryText,
      value,
      name,
      checked = false,
      size = "md",
      state = "default",
      disabled = false,
      className = ""
    } = options;
    const isDisabled = disabled || state === "disabled";
    const classes = [
      "ubits-radio-button",
      `ubits-radio-button--${size}`,
      state !== "default" ? `ubits-radio-button--${state}` : "",
      checked ? "ubits-radio-button--checked" : "",
      isDisabled ? "ubits-radio-button--disabled" : "",
      className
    ].filter(Boolean).join(" ");
    const radioInput = `
    <input
      type="radio"
      id="radio-${name}-${value}"
      name="${name}"
      value="${value}"
      ${checked ? "checked" : ""}
      ${isDisabled ? "disabled" : ""}
      class="ubits-radio-button__input"
    />
  `;
    const radioCircle = `
    <span class="ubits-radio-button__circle" aria-hidden="true">
      ${checked || state === "active" && !checked ? '<span class="ubits-radio-button__dot"></span>' : ""}
    </span>
  `;
    const labelHTML = `
    <span class="ubits-radio-button__label">${label}</span>
  `;
    const complementaryTextHTML = complementaryText ? `<span class="ubits-radio-button__complementary-text">${complementaryText}</span>` : "";
    const textContentHTML = `
    <div class="ubits-radio-button__text-content">
      ${labelHTML}
      ${complementaryTextHTML}
    </div>
  `;
    return `
    <label class="${classes}">
      ${radioInput}
      ${radioCircle}
      ${textContentHTML}
    </label>
  `.trim();
  }
  function createRadioButton(options) {
    const { containerId, onChange } = options;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderRadioButton(options);
    const radioButton = wrapper.firstElementChild;
    if (!radioButton) {
      throw new Error("No se pudo crear el radio button");
    }
    const inputElement = radioButton.querySelector(".ubits-radio-button__input");
    if (inputElement && onChange) {
      inputElement.addEventListener("change", onChange);
    }
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    container.appendChild(radioButton);
    const destroy = () => {
      if (radioButton.parentElement) {
        radioButton.parentElement.removeChild(radioButton);
      }
    };
    const update = (newOptions) => {
      const updatedOptions = { ...options, ...newOptions };
      const wrapper2 = document.createElement("div");
      wrapper2.innerHTML = renderRadioButton(updatedOptions);
      const newRadioButton = wrapper2.firstElementChild;
      if (newRadioButton && radioButton.parentElement) {
        const newInputElement = newRadioButton.querySelector(
          ".ubits-radio-button__input"
        );
        if (newInputElement && updatedOptions.onChange) {
          newInputElement.addEventListener("change", updatedOptions.onChange);
        }
        radioButton.parentElement.replaceChild(newRadioButton, radioButton);
        return newRadioButton;
      }
    };
    return {
      element: radioButton,
      destroy,
      update
    };
  }
  function renderScrollbar(options) {
    const { orientation = "vertical", state = "default", className = "" } = options;
    const classes = [
      "ubits-scrollbar",
      `ubits-scrollbar--${orientation}`,
      state ? `ubits-scrollbar--${state}` : "",
      className
    ].filter(Boolean).join(" ");
    return `
    <div class="${classes}">
      <div class="ubits-scrollbar__bar"></div>
    </div>
  `.trim();
  }
  function createScrollbar(options) {
    const {
      containerId,
      targetId,
      orientation = "vertical",
      state = "default",
      className = ""
    } = options;
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderScrollbar({ orientation, state, className });
    const scrollbarElement = wrapper.firstElementChild;
    if (!scrollbarElement) {
      throw new Error("No se pudo crear el scrollbar");
    }
    const barElement = scrollbarElement.querySelector(".ubits-scrollbar__bar");
    if (!barElement) {
      throw new Error("No se pudo encontrar la barra del scrollbar");
    }
    let targetElement = null;
    if (targetId) {
      targetElement = document.getElementById(targetId);
    } else if (containerId) {
      const scrollable = container.querySelector("[data-scrollable]");
      if (scrollable) {
        targetElement = scrollable;
      }
    }
    const updateScrollbar = () => {
      if (!targetElement || !barElement) return;
      const isVertical = orientation === "vertical";
      const scrollProperty = isVertical ? "scrollTop" : "scrollLeft";
      const clientProperty = isVertical ? "clientHeight" : "clientWidth";
      const scrollSizeProperty = isVertical ? "scrollHeight" : "scrollWidth";
      const scroll = targetElement[scrollProperty];
      const clientSize = targetElement[clientProperty];
      const scrollSize = targetElement[scrollSizeProperty];
      if (scrollSize <= clientSize) {
        barElement.style.opacity = "0";
        return;
      }
      const scrollbarSize = isVertical ? scrollbarElement.clientHeight : scrollbarElement.clientWidth;
      const thumbSize = Math.max(clientSize / scrollSize * scrollbarSize, 20);
      const maxThumbPosition = scrollbarSize - thumbSize;
      const thumbPosition = scroll / (scrollSize - clientSize) * maxThumbPosition;
      if (isVertical) {
        barElement.style.height = `${thumbSize}px`;
        barElement.style.transform = `translateY(${thumbPosition}px)`;
      } else {
        barElement.style.width = `${thumbSize}px`;
        barElement.style.transform = `translateX(${thumbPosition}px)`;
      }
      barElement.style.opacity = "1";
    };
    const handleScrollbarClick = (e) => {
      if (!targetElement || !barElement) return;
      if (e.target === barElement) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const isVertical = orientation === "vertical";
      const rect = scrollbarElement.getBoundingClientRect();
      const clickPosition = isVertical ? e.clientY - rect.top : e.clientX - rect.left;
      const scrollbarSize = isVertical ? scrollbarElement.clientHeight : scrollbarElement.clientWidth;
      const percentage = clickPosition / scrollbarSize;
      const clientProperty = isVertical ? "clientHeight" : "clientWidth";
      const scrollSizeProperty = isVertical ? "scrollHeight" : "scrollWidth";
      const scrollProperty = isVertical ? "scrollTop" : "scrollLeft";
      const clientSize = targetElement[clientProperty];
      const scrollSize = targetElement[scrollSizeProperty];
      const maxScroll = scrollSize - clientSize;
      targetElement[scrollProperty] = percentage * maxScroll;
    };
    let isDragging = false;
    let startPosition = 0;
    let startScroll = 0;
    const handleMouseDown = (e) => {
      if (!targetElement || !barElement) return;
      if (e.target !== barElement) return;
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      const isVertical = orientation === "vertical";
      startPosition = isVertical ? e.clientY : e.clientX;
      startScroll = isVertical ? targetElement.scrollTop : targetElement.scrollLeft;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMove = (e) => {
      if (!isDragging || !targetElement || !barElement) return;
      const isVertical = orientation === "vertical";
      const currentPosition = isVertical ? e.clientY : e.clientX;
      const delta = currentPosition - startPosition;
      const scrollbarSize = isVertical ? scrollbarElement.clientHeight : scrollbarElement.clientWidth;
      const clientSize = isVertical ? targetElement.clientHeight : targetElement.clientWidth;
      const scrollSize = isVertical ? targetElement.scrollHeight : targetElement.scrollWidth;
      const maxScroll = scrollSize - clientSize;
      const scrollRatio = maxScroll / scrollbarSize;
      const newScroll = startScroll + delta * scrollRatio;
      if (isVertical) {
        targetElement.scrollTop = Math.max(0, Math.min(maxScroll, newScroll));
      } else {
        targetElement.scrollLeft = Math.max(0, Math.min(maxScroll, newScroll));
      }
    };
    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    if (targetElement) {
      targetElement.addEventListener("scroll", updateScrollbar);
      targetElement.addEventListener("resize", updateScrollbar);
      const resizeObserver = new ResizeObserver(() => {
        updateScrollbar();
      });
      resizeObserver.observe(targetElement);
      scrollbarElement.__resizeObserver = resizeObserver;
    }
    scrollbarElement.addEventListener("click", handleScrollbarClick);
    barElement.addEventListener("mousedown", handleMouseDown);
    scrollbarElement.__handleMouseUp = handleMouseUp;
    scrollbarElement.__handleMouseMove = handleMouseMove;
    container.appendChild(scrollbarElement);
    setTimeout(() => {
      updateScrollbar();
    }, 100);
    return {
      element: scrollbarElement,
      update: updateScrollbar,
      destroy: () => {
        if (targetElement) {
          targetElement.removeEventListener("scroll", updateScrollbar);
          targetElement.removeEventListener("resize", updateScrollbar);
          const resizeObserver = scrollbarElement.__resizeObserver;
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
        }
        scrollbarElement.removeEventListener("click", handleScrollbarClick);
        barElement.removeEventListener("mousedown", handleMouseDown);
        if (scrollbarElement.__handleMouseUp) {
          document.removeEventListener("mousemove", scrollbarElement.__handleMouseMove);
          document.removeEventListener("mouseup", scrollbarElement.__handleMouseUp);
        }
        scrollbarElement.remove();
      }
    };
  }
  const ScrollProvider = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createScrollbar,
    renderScrollbar
  }, Symbol.toStringTag, { value: "Module" }));
  function calculateVisiblePages(currentPage, totalPages, maxVisiblePages) {
    const pages = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  }
  function renderPageButton(page, isActive, size = "md", onClick) {
    const buttonSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
    return renderButton({
      variant: isActive ? "secondary" : "tertiary",
      size: buttonSize,
      text: String(page),
      active: isActive,
      className: "ubits-pagination__page-button"
    });
  }
  function renderPagination(options) {
    const {
      currentPage = 1,
      totalPages,
      totalItems,
      itemsPerPage,
      variant = "default",
      size = "md",
      maxVisiblePages = 7,
      showFirst = true,
      showLast = true,
      showPrevNext = true,
      showInfo = false,
      showItemsPerPage = false,
      itemsPerPageOptions = [10, 20, 50, 100],
      className = "",
      attributes = {},
      labels = {}
    } = options;
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
    const classes = [
      "ubits-pagination",
      `ubits-pagination--${variant}`,
      `ubits-pagination--${size}`,
      className
    ].filter(Boolean).join(" ");
    const attrs = [...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)].filter(Boolean).join(" ");
    const defaultLabels = {
      first: "Primera",
      last: "Última",
      previous: "Anterior",
      next: "Siguiente",
      page: "Página",
      of: "de",
      items: "items",
      itemsPerPage: "Por página",
      ...labels
    };
    let infoHTML = "";
    if (showInfo && totalItems !== void 0) {
      const start = (validCurrentPage - 1) * (itemsPerPage || 10) + 1;
      const end = Math.min(validCurrentPage * (itemsPerPage || 10), totalItems);
      infoHTML = `
      <div class="ubits-pagination__info">
        <span class="ubits-body-sm">${start}-${end} ${defaultLabels.of} ${totalItems} ${defaultLabels.items}</span>
      </div>
    `;
    }
    let itemsPerPageHTML = "";
    if (showItemsPerPage) {
      const selectId = `ubits-pagination-items-per-page-${Date.now()}`;
      const listId = `ubits-pagination-list-${Date.now()}`;
      const currentValue = itemsPerPage || itemsPerPageOptions[0];
      itemsPerPageOptions.map((opt) => ({
        label: String(opt),
        value: String(opt),
        state: "default",
        selected: opt === currentValue
      }));
      itemsPerPageHTML = `
      <div class="ubits-pagination__items-per-page">
        <label class="ubits-body-sm">${defaultLabels.itemsPerPage}:</label>
        <div class="ubits-pagination__select-wrapper" style="position: relative; display: inline-block;">
          <button 
            type="button" 
            class="ubits-pagination__select-button ubits-body-sm" 
            id="${selectId}"
            data-list-id="${listId}"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            ${currentValue}
            <i class="fas fa-chevron-down" style="margin-left: var(--ubits-spacing-xs); font-size: var(--modifiers-normal-body-xs-regular-fontsize);"></i>
          </button>
          <div id="${listId}" class="ubits-pagination__list-container" style="display: none;"></div>
        </div>
      </div>
    `;
    }
    const buttonSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
    const buttons = [];
    if (showFirst && variant === "default") {
      buttons.push(
        renderButton({
          variant: "tertiary",
          size: buttonSize,
          icon: "angle-double-left",
          iconStyle: "solid",
          iconOnly: true,
          disabled: validCurrentPage === 1,
          className: "ubits-pagination__nav-button",
          attributes: {
            "aria-label": defaultLabels.first,
            title: defaultLabels.first
          }
        })
      );
    }
    if (showPrevNext) {
      buttons.push(
        renderButton({
          variant: "tertiary",
          size: buttonSize,
          icon: "chevron-left",
          iconStyle: "solid",
          iconOnly: true,
          disabled: validCurrentPage === 1,
          className: "ubits-pagination__nav-button",
          attributes: {
            "aria-label": defaultLabels.previous,
            title: defaultLabels.previous
          }
        })
      );
    }
    if (variant === "default") {
      const visiblePages = calculateVisiblePages(validCurrentPage, totalPages, maxVisiblePages);
      if (visiblePages[0] > 1) {
        buttons.push(`<span class="ubits-pagination__ellipsis">...</span>`);
      }
      visiblePages.forEach((page) => {
        buttons.push(renderPageButton(page, page === validCurrentPage, size));
      });
      if (visiblePages[visiblePages.length - 1] < totalPages) {
        buttons.push(`<span class="ubits-pagination__ellipsis">...</span>`);
      }
    } else if (variant === "compact") {
      buttons.push(`
      <span class="ubits-pagination__page-info ubits-body-md">
        ${defaultLabels.page} ${validCurrentPage} ${defaultLabels.of} ${totalPages}
      </span>
    `);
    } else ;
    if (showPrevNext) {
      buttons.push(
        renderButton({
          variant: "tertiary",
          size: buttonSize,
          icon: "chevron-right",
          iconStyle: "solid",
          iconOnly: true,
          disabled: validCurrentPage === totalPages,
          className: "ubits-pagination__nav-button",
          attributes: {
            "aria-label": defaultLabels.next,
            title: defaultLabels.next
          }
        })
      );
    }
    if (showLast && variant === "default") {
      buttons.push(
        renderButton({
          variant: "tertiary",
          size: buttonSize,
          icon: "angle-double-right",
          iconStyle: "solid",
          iconOnly: true,
          disabled: validCurrentPage === totalPages,
          className: "ubits-pagination__nav-button",
          attributes: {
            "aria-label": defaultLabels.last,
            title: defaultLabels.last
          }
        })
      );
    }
    return `
    <div class="${classes}" ${attrs} data-current-page="${validCurrentPage}" data-total-pages="${totalPages}">
      ${infoHTML}
      ${itemsPerPageHTML}
      <div class="ubits-pagination__controls">
        ${buttons.join("")}
      </div>
    </div>
  `;
  }
  function createPagination(options) {
    const { containerId, ...paginationOptions } = options;
    if (!containerId) {
      console.error("❌ [Pagination] containerId es requerido para createPagination");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ [Pagination] Contenedor con ID "${containerId}" no encontrado`);
      return null;
    }
    const html = renderPagination(paginationOptions);
    container.innerHTML = html;
    const paginationElement = container.querySelector(".ubits-pagination");
    if (!paginationElement) {
      console.error("❌ [Pagination] No se pudo crear el elemento de paginación");
      return null;
    }
    const pageButtons = paginationElement.querySelectorAll(".ubits-pagination__page-button");
    pageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const page = parseInt(button.textContent || "1");
        if (paginationOptions.onPageChange) {
          paginationOptions.onPageChange(page);
        }
      });
    });
    const navButtons = paginationElement.querySelectorAll(".ubits-pagination__nav-button");
    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const currentPage = parseInt(paginationElement.getAttribute("data-current-page") || "1");
        const totalPages = parseInt(paginationElement.getAttribute("data-total-pages") || "1");
        const ariaLabel = button.getAttribute("aria-label") || "";
        let newPage = currentPage;
        if (ariaLabel.includes("Primera") || ariaLabel.includes("First")) {
          newPage = 1;
        } else if (ariaLabel.includes("Última") || ariaLabel.includes("Last")) {
          newPage = totalPages;
        } else if (ariaLabel.includes("Anterior") || ariaLabel.includes("Previous")) {
          newPage = Math.max(1, currentPage - 1);
        } else if (ariaLabel.includes("Siguiente") || ariaLabel.includes("Next")) {
          newPage = Math.min(totalPages, currentPage + 1);
        }
        if (newPage !== currentPage && paginationOptions.onPageChange) {
          paginationOptions.onPageChange(newPage);
        }
      });
    });
    const selectButton = paginationElement.querySelector(
      ".ubits-pagination__select-button"
    );
    const listContainer = paginationElement.querySelector(
      ".ubits-pagination__list-container"
    );
    if (selectButton && listContainer) {
      const listId = selectButton.getAttribute("data-list-id") || `ubits-pagination-list-${Date.now()}`;
      const currentValue = paginationOptions.itemsPerPage || paginationOptions.itemsPerPageOptions?.[0] || 10;
      listContainer.id = listId;
      const listItems = (paginationOptions.itemsPerPageOptions || [10, 20, 50, 100]).map(
        (opt) => ({
          label: String(opt),
          value: String(opt),
          state: "default",
          selected: opt === currentValue
        })
      );
      let isOpen = false;
      const toggleDropdown = () => {
        if (isOpen) {
          listContainer.style.display = "none";
          selectButton.setAttribute("aria-expanded", "false");
          isOpen = false;
          return;
        }
        listContainer.innerHTML = "";
        const paginationSize = paginationOptions.size || "md";
        const listSize = paginationSize === "sm" ? "sm" : paginationSize === "lg" ? "lg" : "md";
        const container2 = document.getElementById(listId);
        if (!container2) {
          console.error("❌ [Pagination] Container not found:", listId);
          console.error("❌ [Pagination] Buscando en todo el documento...");
          const allContainers = document.querySelectorAll('[id*="pagination"]');
          console.error(
            "❌ [Pagination] Contenedores encontrados:",
            Array.from(allContainers).map((el) => ({
              id: el.id,
              tagName: el.tagName,
              className: el.className
            }))
          );
          return;
        }
        try {
          const listElement = createList({
            containerId: listId,
            items: listItems,
            size: listSize,
            maxHeight: "none",
            // Altura dinámica según número de items
            onSelectionChange: (selectedItem, index) => {
              if (selectedItem && paginationOptions.itemsPerPageOptions && paginationOptions.itemsPerPageOptions[index] !== void 0) {
                const value = paginationOptions.itemsPerPageOptions[index];
                const icon = selectButton.querySelector("i");
                if (icon) {
                  selectButton.innerHTML = `${value} ${icon.outerHTML}`;
                } else {
                  selectButton.textContent = String(value);
                }
                listContainer.style.display = "none";
                selectButton.setAttribute("aria-expanded", "false");
                isOpen = false;
                if (paginationOptions.onItemsPerPageChange) {
                  paginationOptions.onItemsPerPageChange(value);
                } else {
                  console.warn("⚠️ [Pagination] onItemsPerPageChange no está definido");
                }
              } else {
                console.warn("⚠️ [Pagination] selectedItem o itemsPerPageOptions no válidos");
              }
            }
          });
          const createdList = container2.querySelector(".ubits-list");
          listContainer.style.display = "block";
          selectButton.setAttribute("aria-expanded", "true");
          isOpen = true;
        } catch (error) {
          console.error("❌ [Pagination] Error creating items per page list:", error);
          console.error("❌ [Pagination] Error stack:", error instanceof Error ? error.stack : "N/A");
        }
      };
      selectButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown();
      });
      document.addEventListener("click", (e) => {
        if (isOpen && !listContainer.contains(e.target) && !selectButton.contains(e.target)) {
          listContainer.style.display = "none";
          selectButton.setAttribute("aria-expanded", "false");
          isOpen = false;
        }
      });
    } else {
      console.error("❌ [Pagination] Select button or list container not found");
      console.error("❌ [Pagination] selectButton:", selectButton);
      console.error("❌ [Pagination] listContainer:", listContainer);
      console.error(
        "❌ [Pagination] paginationElement HTML:",
        paginationElement.innerHTML.substring(0, 500)
      );
    }
    return paginationElement;
  }
  function renderClearButton() {
    return `
    <button
      type="button"
      class="ubits-search-button__clear"
      aria-label="Limpiar búsqueda"
      tabindex="0"
    >
      <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
    </button>
  `;
  }
  function renderSearchButton(options) {
    const {
      active = false,
      size = "md",
      state = "default",
      disabled = false,
      placeholder = "",
      value = "",
      width = 248,
      className = ""
    } = options;
    const isDisabled = disabled || state === "disabled";
    const isSearchActive = active || state === "active";
    const showClearButton = value && value.trim().length > 0;
    const clearButtonHTML = showClearButton ? renderClearButton() : "";
    if (isSearchActive) {
      const inputWrapperClasses = [
        "ubits-search-button",
        "ubits-search-button--active",
        `ubits-search-button--${size}`,
        isDisabled ? "ubits-search-button--disabled" : "",
        className
      ].filter(Boolean).join(" ");
      const widthStyle = width ? `width: ${width}px;` : "";
      const inputHTML = renderInput({
        type: "text",
        size,
        placeholder,
        value,
        showLabel: false,
        showHelper: false,
        className: "ubits-search-button__input",
        state: isDisabled ? "disabled" : "default"
      });
      let inputContent = inputHTML;
      const wrapperMatch = inputHTML.match(
        /^<div[^>]*style="[^"]*position:\s*relative[^"]*"[^>]*>(.*?)<\/div>$/s
      );
      if (wrapperMatch && wrapperMatch[1]) {
        inputContent = wrapperMatch[1].trim();
        inputContent = inputContent.replace(/padding-left:\s*\d+px;/g, "padding-left: 0;");
      }
      inputContent = inputContent.replace(
        /(<input[^>]*class="[^"]*ubits-search-button__input[^"]*"[^>]*)(>)/,
        '$1 aria-label="Buscar"$2'
      );
      const finalHTML = `
      <div class="${inputWrapperClasses}" style="${widthStyle}">
        <div class="ubits-search-button__input-wrapper">
          ${inputContent}
          ${clearButtonHTML}
        </div>
      </div>
    `.trim();
      return finalHTML;
    }
    const additionalClasses = [state === "hover" ? "ubits-search-button--force-hover" : "", className].filter(Boolean).join(" ");
    return renderButton({
      variant: "secondary",
      size,
      icon: "magnifying-glass",
      iconOnly: true,
      disabled: isDisabled,
      className: additionalClasses,
      attributes: {
        "aria-label": "Buscar"
      }
    });
  }
  function createSearchButton(options) {
    const container = options.containerId ? document.getElementById(options.containerId) : document.body;
    if (!container) {
      throw new Error(`Container with id "${options.containerId}" not found`);
    }
    const searchHTML = renderSearchButton(options);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = searchHTML.trim();
    const element = tempDiv.firstElementChild;
    if (!element) {
      throw new Error("Failed to create search button element");
    }
    container.appendChild(element);
    const isSearchActive = options.active || options.state === "active";
    if (isSearchActive) {
      const inputElement = element.querySelector(".ubits-search-button__input");
      const clearButton = element.querySelector(".ubits-search-button__clear");
      if (inputElement) {
        if (options.onChange) {
          inputElement.addEventListener("input", options.onChange);
          inputElement.addEventListener("change", options.onChange);
        }
        if (options.onFocus) {
          inputElement.addEventListener("focus", options.onFocus);
        }
        if (options.onBlur) {
          inputElement.addEventListener("blur", options.onBlur);
        }
      }
      if (clearButton) {
        clearButton.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (inputElement) {
            inputElement.value = "";
            inputElement.focus();
            if (options.onChange) {
              const event = new Event("input", { bubbles: true });
              inputElement.dispatchEvent(event);
            }
          }
        });
      }
    } else {
      const buttonElement = element;
      if (buttonElement && options.onClick) {
        buttonElement.addEventListener("click", options.onClick);
      }
    }
    const destroy = () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
    const update = (newOptions) => {
      const updatedOptions = { ...options, ...newOptions };
      const isSearchActive2 = updatedOptions.active || updatedOptions.state === "active";
      const wasSearchActive = options.active || options.state === "active";
      if (isSearchActive2 && wasSearchActive) {
        const currentInput = element.querySelector(".ubits-search-button__input");
        element.querySelector(
          ".ubits-search-button__clear"
        );
        if (currentInput && newOptions.value !== void 0 && newOptions.value !== currentInput.value) {
          const cursorPosition = currentInput.selectionStart || 0;
          currentInput.value = newOptions.value || "";
          currentInput.setSelectionRange(cursorPosition, cursorPosition);
          return;
        }
        if (currentInput && newOptions.placeholder !== void 0) {
          currentInput.placeholder = newOptions.placeholder || "";
        }
        if (currentInput && newOptions.disabled !== void 0) {
          currentInput.disabled = newOptions.disabled || false;
        }
        const significantChanges = ["active", "state", "size", "width", "className"];
        const hasSignificantChange = significantChanges.some(
          (key) => newOptions[key] !== void 0 && newOptions[key] !== options[key]
        );
        if (!hasSignificantChange) {
          return;
        }
      }
      const newHTML = renderSearchButton(updatedOptions);
      const tempDiv2 = document.createElement("div");
      tempDiv2.innerHTML = newHTML.trim();
      const newElement = tempDiv2.firstElementChild;
      if (newElement && element.parentNode) {
        let shouldRestoreFocus = false;
        let cursorPosition = 0;
        if (isSearchActive2 && wasSearchActive) {
          const oldInput = element.querySelector(".ubits-search-button__input");
          if (oldInput && oldInput === document.activeElement) {
            shouldRestoreFocus = true;
            cursorPosition = oldInput.selectionStart || 0;
          }
        }
        element.parentNode.replaceChild(newElement, element);
        if (isSearchActive2) {
          const inputElement = newElement.querySelector(
            ".ubits-search-button__input"
          );
          const clearButton = newElement.querySelector(
            ".ubits-search-button__clear"
          );
          if (inputElement) {
            if (shouldRestoreFocus) {
              inputElement.focus();
              inputElement.setSelectionRange(cursorPosition, cursorPosition);
            }
            if (updatedOptions.onChange) {
              inputElement.addEventListener("input", updatedOptions.onChange);
              inputElement.addEventListener("change", updatedOptions.onChange);
            }
            if (updatedOptions.onFocus) {
              inputElement.addEventListener("focus", updatedOptions.onFocus);
            }
            if (updatedOptions.onBlur) {
              inputElement.addEventListener("blur", updatedOptions.onBlur);
            }
          }
          if (clearButton) {
            clearButton.addEventListener("click", function(e) {
              e.preventDefault();
              e.stopPropagation();
              if (inputElement) {
                inputElement.value = "";
                inputElement.focus();
                if (updatedOptions.onChange) {
                  const event = new Event("input", { bubbles: true });
                  inputElement.dispatchEvent(event);
                }
              }
            });
          }
        } else {
          const buttonElement = newElement;
          if (buttonElement && updatedOptions.onClick) {
            buttonElement.addEventListener("click", updatedOptions.onClick);
          }
        }
      }
    };
    return {
      element,
      destroy,
      update
    };
  }
  function renderEmptyState(options) {
    const {
      title,
      description,
      imageUrl,
      icon,
      iconSize = "lg",
      actionLabel,
      onAction,
      showPrimaryButton = false,
      primaryButtonIcon,
      showPrimaryButtonIcon = false,
      secondaryActionLabel,
      onSecondaryAction,
      showSecondaryButton = false,
      secondaryButtonIcon,
      showSecondaryButtonIcon = false,
      className = "",
      style = ""
    } = options;
    const classes = ["ubits-empty-state", "ubits-empty-state--default", className].filter(Boolean).join(" ");
    const styleAttr = style ? ` style="${style}"` : "";
    let visualElement = "";
    if (imageUrl) {
      visualElement = `
      <div class="ubits-empty-state__image">
        <img src="${imageUrl}" alt="${title}" />
      </div>
    `;
    } else if (icon) {
      visualElement = `
      <div class="ubits-empty-state__icon">
        <i class="far fa-${icon}"></i>
      </div>
    `;
    }
    let actionsHTML = "";
    const primaryButton = showPrimaryButton && actionLabel ? renderButton({
      variant: "primary",
      size: "sm",
      text: actionLabel,
      icon: showPrimaryButtonIcon && primaryButtonIcon ? primaryButtonIcon : void 0,
      className: "",
      attributes: {
        "data-action": "primary"
      }
    }) : "";
    const secondaryButton = showSecondaryButton && secondaryActionLabel ? renderButton({
      variant: "secondary",
      size: "sm",
      text: secondaryActionLabel,
      icon: showSecondaryButtonIcon && secondaryButtonIcon ? secondaryButtonIcon : void 0,
      className: "",
      attributes: {
        "data-action": "secondary"
      }
    }) : "";
    if (primaryButton || secondaryButton) {
      actionsHTML = `
      <div class="ubits-empty-state__actions">
        ${secondaryButton}
        ${primaryButton}
      </div>
    `;
    }
    const emptyStateHTML = `
    <div class="${classes}"${styleAttr}>
      ${visualElement}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${title}</h3>
        ${description ? `<p class="ubits-empty-state__description">${description}</p>` : ""}
      </div>
      ${actionsHTML}
    </div>
  `;
    return emptyStateHTML.trim();
  }
  function createEmptyState(options) {
    const div = document.createElement("div");
    div.innerHTML = renderEmptyState(options);
    const emptyState = div.querySelector(".ubits-empty-state");
    if (options.onAction) {
      const actionButton = emptyState.querySelector('[data-action="primary"]');
      if (actionButton) {
        actionButton.addEventListener("click", options.onAction);
      }
    }
    if (options.onSecondaryAction) {
      const secondaryButton = emptyState.querySelector('[data-action="secondary"]');
      if (secondaryButton) {
        secondaryButton.addEventListener("click", options.onSecondaryAction);
      }
    }
    return emptyState;
  }
  function renderDrawer(options) {
    const {
      title,
      complementaryText,
      width = 40,
      bodyContent = "",
      footerButtons,
      className = ""
    } = options;
    const drawerWidthClass = `ubits-drawer--width-${width}`;
    const classes = ["ubits-drawer", drawerWidthClass, className].filter(Boolean).join(" ");
    const headerHTML = `
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${title}</p>
        </div>
        ${complementaryText ? `
        <div class="ubits-drawer__header-complementary">
          <p class="ubits-body-sm-regular">${complementaryText}</p>
        </div>
        ` : ""}
      </div>
      ${renderButton({
      variant: "secondary",
      size: "md",
      icon: "fa-times",
      iconOnly: true,
      className: "ubits-drawer__close"
    })}
    </div>
  `;
    const bodyHTMLContent = typeof bodyContent === "function" ? bodyContent() : bodyContent || '<div class="ubits-drawer__placeholder">Contenido del drawer</div>';
    const bodyHTML = `
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${bodyHTMLContent}
      </div>
      <div class="ubits-drawer__scrollbar">
        <div class="ubits-drawer__scrollbar-bar"></div>
      </div>
    </div>
  `;
    const footerHTML = footerButtons ? `
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        ${footerButtons.tertiary ? `
        <div class="ubits-drawer__footer-left">
          ${renderButton({
      variant: "tertiary",
      size: "md",
      text: footerButtons.tertiary.label,
      className: "ubits-drawer__footer-button"
    })}
        </div>
        ` : ""}
        <div class="ubits-drawer__footer-right">
          ${footerButtons.secondary ? renderButton({
      variant: "secondary",
      size: "md",
      text: footerButtons.secondary.label,
      className: "ubits-drawer__footer-button"
    }) : ""}
          ${footerButtons.primary ? renderButton({
      variant: "primary",
      size: "md",
      text: footerButtons.primary.label,
      className: "ubits-drawer__footer-button"
    }) : ""}
        </div>
      </div>
    </div>
  ` : "";
    return `
    <div class="ubits-drawer-overlay">
      <div class="${classes}">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
  }
  function createDrawer(options) {
    const { containerId, onClose, closeOnOverlayClick = true, open = false } = options;
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderDrawer(options);
    const drawerOverlay = wrapper.firstElementChild;
    if (!drawerOverlay) {
      throw new Error("No se pudo crear el drawer");
    }
    drawerOverlay.querySelector(".ubits-drawer");
    const closeButton = drawerOverlay.querySelector(".ubits-drawer__close");
    const overlay = drawerOverlay;
    const openDrawer = () => {
      drawerOverlay.classList.add("ubits-drawer-overlay--open");
      document.body.style.overflow = "hidden";
    };
    const closeDrawer = () => {
      drawerOverlay.classList.remove("ubits-drawer-overlay--open");
      document.body.style.overflow = "";
      if (onClose) {
        onClose();
      }
    };
    const updateContent = (content) => {
      const bodyContentElement = drawerOverlay.querySelector(".ubits-drawer__body-content");
      if (bodyContentElement) {
        const contentHTML = typeof content === "function" ? content() : content;
        bodyContentElement.innerHTML = contentHTML;
      }
    };
    if (closeButton) {
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
      });
    }
    if (closeOnOverlayClick && overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          closeDrawer();
        }
      });
    }
    const handleEsc = (e) => {
      if (e.key === "Escape" && drawerOverlay.classList.contains("ubits-drawer-overlay--open")) {
        closeDrawer();
      }
    };
    document.addEventListener("keydown", handleEsc);
    if (options.footerButtons) {
      const tertiaryButton = drawerOverlay.querySelector(
        ".ubits-drawer__footer-left .ubits-drawer__footer-button"
      );
      const secondaryButton = drawerOverlay.querySelector(
        ".ubits-drawer__footer-right .ubits-button--secondary.ubits-drawer__footer-button"
      );
      const primaryButton = drawerOverlay.querySelector(
        ".ubits-drawer__footer-right .ubits-button--primary.ubits-drawer__footer-button"
      );
      if (tertiaryButton && options.footerButtons.tertiary?.onClick) {
        tertiaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          options.footerButtons.tertiary.onClick(e);
        });
      }
      if (secondaryButton && options.footerButtons.secondary?.onClick) {
        secondaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          options.footerButtons.secondary.onClick(e);
        });
      }
      if (primaryButton && options.footerButtons.primary?.onClick) {
        primaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          options.footerButtons.primary.onClick(e);
        });
      }
    }
    container.appendChild(drawerOverlay);
    if (open) {
      openDrawer();
    }
    return {
      element: drawerOverlay,
      open: openDrawer,
      close: closeDrawer,
      updateContent
    };
  }
  function renderCellByType(column, row, columnType) {
    const cellValue = row.data[column.id];
    const cellData = row.data;
    switch (columnType) {
      case "nombre": {
        const nombre = cellValue || cellData.nombre || cellData.name || "";
        const isEditable = column.editable;
        const nombreElement = isEditable ? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${nombre}</span>` : `<span class="ubits-body-md-regular">${nombre}</span>`;
        return nombreElement;
      }
      case "progreso": {
        let progressValue = null;
        if (cellValue !== void 0 && cellValue !== null) {
          if (typeof cellValue === "number") {
            progressValue = cellValue;
          } else if (typeof cellValue === "string") {
            const parsed = parseFloat(cellValue.replace("%", "").trim());
            if (!isNaN(parsed)) {
              progressValue = parsed;
            }
          }
        }
        if (progressValue === null && cellData) {
          const progressProp = cellData.progress !== void 0 ? cellData.progress : cellData.progreso;
          if (progressProp !== void 0 && progressProp !== null) {
            if (typeof progressProp === "number") {
              progressValue = progressProp;
            } else if (typeof progressProp === "string") {
              const parsed = parseFloat(progressProp.replace("%", "").trim());
              if (!isNaN(parsed)) {
                progressValue = parsed;
              }
            }
          }
        }
        if (progressValue === null) {
          progressValue = 50;
        }
        progressValue = Math.max(0, Math.min(100, progressValue));
        const progressBarHTML = renderProgressBar({
          value: progressValue,
          size: "sm",
          variant: "default",
          indicator: `${Math.round(progressValue)}%`
        });
        return progressBarHTML;
      }
      case "nombre-avatar": {
        const nombre = cellValue || cellData.nombre || cellData.name || "";
        const avatar = cellData.avatar || cellData.avatarUrl || null;
        const avatarVariant = column.avatarVariant || "initials";
        const generateInitials2 = (name) => {
          return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
        };
        let avatarHTML = "";
        if (avatarVariant === "photo") {
          let imageUrl = null;
          if (avatar && typeof avatar === "string") {
            imageUrl = avatar;
          } else if (avatar && typeof avatar === "object") {
            imageUrl = avatar.imageUrl || avatar.url || null;
          }
          if (!imageUrl && cellData) {
            imageUrl = cellData.imageUrl || cellData.avatarUrl || cellData.avatarImage || null;
          }
          if (imageUrl) {
            avatarHTML = renderAvatar({
              imageUrl,
              size: "sm"
            });
          } else {
            avatarHTML = renderAvatar({
              imageUrl: "../assets/images/Profile-image.jpg",
              size: "sm"
            });
          }
        } else if (avatarVariant === "initials") {
          if (avatar && typeof avatar === "object" && avatar.initials) {
            avatarHTML = renderAvatar({
              initials: avatar.initials,
              size: "sm"
            });
          } else {
            const initials = generateInitials2(nombre);
            avatarHTML = renderAvatar({
              initials,
              size: "sm"
            });
          }
        } else {
          const iconName = avatar && typeof avatar === "object" && avatar.icon ? avatar.icon : "user";
          avatarHTML = renderAvatar({
            icon: iconName,
            size: "sm"
          });
        }
        const isEditable = column.editable;
        const nombreElement = isEditable ? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${nombre}</span>` : `<span class="ubits-body-md-regular">${nombre}</span>`;
        const finalHTML = `
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm);">
          ${avatarHTML}
          ${nombreElement}
        </div>
      `;
        return finalHTML;
      }
      case "nombre-avatar-texto": {
        const nombre = cellValue || cellData.nombre || cellData.name || "";
        const avatar = cellData.avatar || cellData.avatarUrl || null;
        const textoComplementario = cellData.area || cellData.areaNombre || cellData.textoComplementario || cellData.complementario || "";
        const avatarVariant = column.avatarVariant || "initials";
        const generateInitials2 = (name) => {
          return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
        };
        let avatarHTML = "";
        if (avatarVariant === "photo") {
          let imageUrl = null;
          if (avatar && typeof avatar === "string") {
            imageUrl = avatar;
          } else if (avatar && typeof avatar === "object") {
            imageUrl = avatar.imageUrl || avatar.url || null;
          }
          if (!imageUrl && cellData) {
            imageUrl = cellData.imageUrl || cellData.avatarUrl || cellData.avatarImage || null;
          }
          if (imageUrl) {
            avatarHTML = renderAvatar({
              imageUrl,
              size: "sm"
            });
          } else {
            avatarHTML = renderAvatar({
              imageUrl: "../assets/images/Profile-image.jpg",
              size: "sm"
            });
          }
        } else if (avatarVariant === "initials") {
          if (avatar && typeof avatar === "object" && avatar.initials) {
            avatarHTML = renderAvatar({
              initials: avatar.initials,
              size: "sm"
            });
          } else {
            const initials = generateInitials2(nombre);
            avatarHTML = renderAvatar({
              initials,
              size: "sm"
            });
          }
        } else {
          const iconName = avatar && typeof avatar === "object" && avatar.icon ? avatar.icon : "user";
          avatarHTML = renderAvatar({
            icon: iconName,
            size: "sm"
          });
        }
        const nombreElement = `<span class="ubits-body-md-regular">${nombre}</span>`;
        return `
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm);">
          ${avatarHTML}
          <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-xs);">
            ${nombreElement}
            ${textoComplementario ? `<span class="ubits-body-sm-regular" style="color: var(--modifiers-normal-color-light-fg-1-medium);">${textoComplementario}</span>` : ""}
          </div>
        </div>
      `;
      }
      case "estado": {
        const statusMap = {
          activo: "active",
          inactivo: "disabled",
          pendiente: "pending",
          completado: "completed",
          publicado: "published",
          cumplido: "fulfilled",
          creado: "created",
          error: "not-fulfilled",
          denegado: "denied",
          borrador: "draft",
          "en-progreso": "in-progress",
          sincronizando: "syncing",
          "pendiente-aprobacion": "pending-approval",
          "no-iniciado": "not-started",
          finalizado: "finished",
          archivado: "archived",
          deshabilitado: "disabled",
          pausado: "paused",
          oculto: "hidden",
          cancelado: "denied"
        };
        const currentEstado = cellValue || cellData.estado || cellData.status || "pendiente";
        const estadoKey = String(currentEstado).toLowerCase().trim();
        const ubitsStatus = statusMap[estadoKey] || statusMap["pendiente"];
        const statusLabels = {
          active: "Activo",
          completed: "Completado",
          published: "Publicado",
          fulfilled: "Cumplido",
          created: "Creado",
          "not-fulfilled": "No cumplido",
          denied: "Denegado",
          draft: "Borrador",
          "in-progress": "En progreso",
          syncing: "Sincronizando",
          pending: "Pendiente",
          "pending-approval": "Pendiente aprobación",
          "not-started": "No iniciado",
          finished: "Finalizado",
          archived: "Archivado",
          disabled: "Deshabilitado",
          paused: "Pausado",
          hidden: "Oculto"
        };
        const label = statusLabels[ubitsStatus] || String(currentEstado);
        const isEditable = column.editable;
        const statusTagHTML = renderStatusTag({
          label,
          status: ubitsStatus,
          size: "xs",
          rightIcon: isEditable ? "chevron-down" : null,
          clickable: isEditable
        });
        if (isEditable) {
          return `
          <div class="ubits-data-table__status-editable" data-row-id="${row.id}" data-column-id="${column.id}" data-editable="true" data-current-status="${ubitsStatus}">
            ${statusTagHTML}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${row.id}-${column.id}" style="display: none;"></div>
          </div>
        `;
        }
        return statusTagHTML;
      }
      case "radio": {
        const checked = cellValue === true || cellValue === "true" || cellValue === 1 || cellValue === row.id || cellValue === String(row.id);
        const showLabel = column.radioLabel !== false && column.radioLabel !== void 0;
        const labelText = typeof column.radioLabel === "string" ? column.radioLabel : showLabel ? String(row.data[column.id] || row.id) : "";
        const isEditable = column.editable === true;
        const disabled = !isEditable;
        const radioHTML = renderRadioButton({
          label: labelText,
          name: `radio-${column.id}`,
          value: String(row.id),
          checked,
          size: "md",
          disabled
        });
        return radioHTML.replace(
          "<input",
          `<input data-row-id="${row.id}" data-column-id="${column.id}" data-radio-button="true" ${isEditable ? 'data-editable="true"' : ""}`
        );
      }
      case "toggle": {
        const checked = cellValue === true || cellValue === "true" || cellValue === 1;
        const showLabel = column.toggleLabel !== false && column.toggleLabel !== void 0;
        const labelText = typeof column.toggleLabel === "string" ? column.toggleLabel : showLabel ? String(row.data[column.id] || row.id) : "";
        const toggleHTML = renderToggle({
          label: labelText,
          checked,
          size: "md"
        });
        return toggleHTML.replace(
          "<input",
          `<input data-row-id="${row.id}" data-column-id="${column.id}" data-toggle-button="true"`
        );
      }
      case "checkbox": {
        const checked = cellValue === true || cellValue === "true" || cellValue === 1;
        const showLabel = column.checkboxLabel !== false && column.checkboxLabel !== void 0;
        const labelText = typeof column.checkboxLabel === "string" ? column.checkboxLabel : showLabel ? String(row.data[column.id] || row.id) : "";
        const isEditable = column.editable === true;
        const disabled = !isEditable;
        const checkboxHTML = renderCheckbox({
          label: labelText,
          checked,
          size: "md",
          disabled
        });
        const finalHTML = checkboxHTML.replace(
          "<input",
          `<input data-row-id="${row.id}" data-column-id="${column.id}" data-checkbox-button="true" ${isEditable ? 'data-editable="true"' : ""}`
        );
        return finalHTML;
      }
      case "correo": {
        const email = cellValue || "";
        const isClickable = column.emailClickable !== false;
        if (isClickable) {
          return `<a href="mailto:${email}" class="ubits-body-md-regular" style="color: var(--modifiers-normal-color-light-accent-brand); text-decoration: none;">${email}</a>`;
        } else {
          return `<span class="ubits-body-md-regular">${email}</span>`;
        }
      }
      case "acciones": {
        const buttonHTML = renderButton({
          text: "Eliminar",
          variant: "error",
          size: "sm",
          icon: "trash",
          iconStyle: "regular",
          className: "ubits-data-table__action-button",
          attributes: {
            "data-row-id": String(row.id),
            "data-column-id": column.id
          }
        });
        return buttonHTML;
      }
      case "fecha": {
        const fecha = cellValue || "";
        const isEditable = column.editable === true;
        if (isEditable) {
          return `
            <div class="ubits-data-table__date-editable" data-row-id="${row.id}" data-column-id="${column.id}">
              <span class="ubits-body-md-regular ubits-data-table__date-display">${fecha || "Seleccionar fecha"}</span>
            </div>
          `;
        }
        return `<span class="ubits-body-md-regular">${fecha}</span>`;
      }
      case "area": {
        const areaText = cellValue || "Desarrollo";
        return `<span class="ubits-body-md-regular">${areaText}</span>`;
      }
      case "lider": {
        const liderText = cellValue || "Juan Pérez";
        return `<span class="ubits-body-md-regular">${liderText}</span>`;
      }
      case "pais": {
        const paisText = cellValue || "Colombia";
        return `<span class="ubits-body-md-regular">${paisText}</span>`;
      }
      case "ciudad": {
        const ciudadText = cellValue || "Bogotá";
        return `<span class="ubits-body-md-regular">${ciudadText}</span>`;
      }
      case "drag-handle": {
        return `
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${row.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;
      }
      case "expand": {
        const isExpanded = row.expanded || false;
        return `
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${isExpanded ? "Colapsar" : "Expandir"} fila"
          data-row-id="${row.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${isExpanded ? "down" : "right"}" aria-hidden="true"></i>
        </button>
      `;
      }
      default:
        return `<span class="ubits-body-md-regular">${cellValue || ""}</span>`;
    }
  }
  function renderCell(column, row, pinnedLeft = 0) {
    const isFixedCheckboxColumn = column.type !== "checkbox" && (column.id === "checkbox" || column.id.startsWith("checkbox-"));
    if (isFixedCheckboxColumn) {
      const checkboxValue = row.data[column.id] || false;
      const checkboxHTML = renderCheckbox({
        label: "",
        checked: checkboxValue,
        size: "md",
        className: "ubits-data-table__cell-checkbox"
      });
      const checkbox = checkboxHTML.replace(
        "<input",
        `<input data-row-id="${row.id}" data-column-id="${column.id}" aria-label="Checkbox ${column.title}"`
      );
      const paddingLeft = column.id === "checkbox-2" ? "12px" : "var(--ubits-spacing-md)";
      const pinnedClass2 = column.pinned ? " ubits-data-table__cell--pinned" : "";
      const pinnedStyle2 = column.pinned ? `position: sticky !important; left: ${pinnedLeft}px !important; z-index: 12 !important;` : "";
      const baseStyle = `text-align: center; vertical-align: middle; padding-left: ${paddingLeft} !important;`;
      const cellStyle = `${baseStyle}${pinnedStyle2 ? " " + pinnedStyle2 : ""}`;
      const cellHTML = `
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${pinnedClass2}" data-column-id="${column.id}" ${column.pinned ? 'data-pinned="true"' : ""} style="${cellStyle}">
        ${checkbox}
      </td>
    `;
      return cellHTML;
    }
    if (column.type) {
      const content2 = renderCellByType(column, row, column.type);
      const isEditable = column.editable && (column.type === "nombre" || column.type === "nombre-avatar" || column.type === "estado" || column.type === "fecha" || column.type === "checkbox" || column.type === "radio") && column.type !== "drag-handle" && column.type !== "expand";
      const typeClass = column.type === "drag-handle" ? "ubits-data-table__cell--drag-handle" : column.type === "expand" ? "ubits-data-table__cell--expand" : `ubits-data-table__cell--${column.type}`;
      const editableClass = isEditable ? "ubits-data-table__cell--editable" : "";
      const pinnedClass2 = column.pinned ? " ubits-data-table__cell--pinned" : "";
      const controlStyles = column.type === "drag-handle" || column.type === "expand" ? "text-align: center; vertical-align: middle;" : "";
      const pinnedStyle2 = column.pinned ? `position: sticky !important; left: ${pinnedLeft}px !important; z-index: 12 !important;` : "";
      const cellStyle = `${controlStyles}${pinnedStyle2 ? " " + pinnedStyle2 : ""}`;
      const styleAttr = cellStyle ? ` style="${cellStyle}"` : "";
      const dataAttrs = isEditable && (column.type === "nombre" || column.type === "nombre-avatar" || column.type === "estado" || column.type === "fecha") ? `data-row-id="${row.id}" data-column-id="${column.id}" data-editable="true"${column.pinned ? ' data-pinned="true"' : ""}` : `data-column-id="${column.id}"${column.pinned ? ' data-pinned="true"' : ""}`;
      return `
      <td class="ubits-data-table__cell ${typeClass} ${editableClass}${pinnedClass2}" ${dataAttrs}${styleAttr}>
        ${content2}
      </td>
    `;
    }
    const content = column.renderCell ? column.renderCell(row.data) : row.data[column.id] || "";
    const pinnedClass = column.pinned ? " ubits-data-table__cell--pinned" : "";
    const pinnedStyle = column.pinned ? ` style="position: sticky !important; left: ${pinnedLeft}px !important; z-index: 12 !important;"` : "";
    return `
    <td class="ubits-data-table__cell${pinnedClass}" data-column-id="${column.id}"${column.pinned ? ' data-pinned="true"' : ""}${pinnedStyle}>
      ${content}
    </td>
  `;
  }
  function renderColumnHeader(column, columnReorderable = false, columnSortable = true, rows = [], sortColumnId = null, sortDirection = null, showColumnMenu = true, pinnedLeft = 0) {
    if (column.type === "drag-handle" || column.type === "expand") {
      const pinnedClass2 = column.pinned ? " ubits-data-table__column-header--pinned" : "";
      const pinnedStyle2 = column.pinned ? `position: sticky !important; left: ${pinnedLeft}px !important; z-index: 10 !important;` : "";
      const widthStyle2 = column.width ? `width: ${column.width}px;` : "";
      const combinedStyle2 = [pinnedStyle2, widthStyle2].filter(Boolean).join(" ");
      const styleAttribute2 = combinedStyle2 ? `style="${combinedStyle2}"` : "";
      return `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${column.type}${pinnedClass2}" 
        ${styleAttribute2}
        data-column-id="${column.id}"
        ${column.pinned ? 'data-pinned="true"' : ""}
      >
      </th>
    `;
    }
    const isFixedCheckboxColumn = column.type !== "checkbox" && (column.id === "checkbox" || column.id.startsWith("checkbox-"));
    column.type === "checkbox";
    if (isFixedCheckboxColumn) {
      const allChecked = rows.length > 0 && rows.every((row) => row.data[column.id] === true);
      const someChecked = rows.some((row) => row.data[column.id] === true);
      const checkboxHTML = renderCheckbox({
        label: "",
        checked: allChecked,
        indeterminate: someChecked && !allChecked,
        size: "md",
        className: "ubits-data-table__column-checkbox-header"
      });
      const checkbox = checkboxHTML.replace(
        "<input",
        `<input data-column-checkbox-header="${column.id}" aria-label="Seleccionar todos ${column.title}"`
      );
      const pinnedClass2 = column.pinned ? " ubits-data-table__column-header--pinned" : "";
      const pinnedStyle2 = column.pinned ? `position: sticky !important; left: ${pinnedLeft}px !important; z-index: 10 !important;` : "";
      const widthStyle2 = column.width ? `width: ${column.width}px;` : "";
      const combinedStyle2 = [pinnedStyle2, widthStyle2].filter(Boolean).join(" ");
      const styleAttribute2 = combinedStyle2 ? `style="${combinedStyle2}"` : "";
      const headerHTML2 = `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${pinnedClass2}" 
        ${styleAttribute2}
        data-column-id="${column.id}"
        ${column.pinned ? 'data-pinned="true"' : ""}
      >
        ${checkbox}
      </th>
    `;
      return headerHTML2;
    }
    const isControlColumn = column.type === "drag-handle" || column.type === "expand";
    const dragHandle = columnReorderable && !isFixedCheckboxColumn && !isControlColumn ? `
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${column.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  ` : "";
    const sortButton = !isFixedCheckboxColumn && !isControlColumn && columnSortable ? (() => {
      const isSorted = sortColumnId === column.id;
      const activeClass = isSorted ? " ubits-data-table__column-sort--active" : "";
      let iconName = "arrow-up-a-z";
      let fallbackIcon = "fas fa-sort-alpha-up";
      if (isSorted && sortDirection) {
        if (sortDirection === "asc") {
          iconName = "arrow-up-a-z";
          fallbackIcon = "fas fa-sort-alpha-up";
        } else {
          iconName = "arrow-down-a-z";
          fallbackIcon = "fas fa-sort-alpha-down";
        }
      }
      const sortButtonHTML = `
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${activeClass}" 
           data-column-id="${column.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${column.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${iconName}"></wa-icon>
        <i class="${fallbackIcon}" aria-hidden="true"></i>
      </div>
    `;
      return sortButtonHTML;
    })() : "";
    const menuButton = !isFixedCheckboxColumn && !isControlColumn && showColumnMenu ? (() => {
      const buttonHTML = renderButton({
        variant: "tertiary",
        size: "xs",
        icon: "ellipsis",
        iconStyle: "solid",
        iconOnly: true,
        className: "ubits-data-table__column-menu-button",
        attributes: {
          "aria-label": `Menú de opciones de ${column.title}`,
          "data-column-id": column.id,
          "data-menu-button": "true"
        }
      });
      return buttonHTML;
    })() : "";
    const headerContent = `
    <div class="ubits-data-table__column-header-content">
      ${dragHandle}
      <span class="ubits-data-table__column-title">${column.title}</span>
      <div class="ubits-data-table__column-actions">
        ${sortButton}
        ${menuButton}
      </div>
    </div>
  `;
    const pinnedClass = column.pinned ? " ubits-data-table__column-header--pinned" : "";
    const pinnedStyle = column.pinned ? `left: ${pinnedLeft}px !important;` : "";
    const widthStyle = column.width ? `width: ${column.width}px;` : "";
    const positionStyle = column.pinned ? "position: sticky !important;" : "";
    const zIndexStyle = column.pinned ? "z-index: 10 !important;" : "";
    const combinedStyle = [positionStyle, pinnedStyle, zIndexStyle, widthStyle].filter(Boolean).join(" ");
    const styleAttribute = combinedStyle ? `style="${combinedStyle}"` : "";
    const headerHTML = `
    <th 
      class="ubits-data-table__column-header${pinnedClass}" 
      ${styleAttribute} 
      data-column-id="${column.id}"
      ${column.pinned ? 'data-pinned="true"' : ""}
    >
      ${headerContent}
    </th>
  `;
    return headerHTML;
  }
  function renderRow(row, columns, rowIndex, pinnedLefts = []) {
    const isExpanded = row.expanded || false;
    const visibleColumns = columns.filter((col) => col.visible !== false);
    const cellsHTML = visibleColumns.map((col, index) => {
      const pinnedLeft = pinnedLefts[index] || 0;
      return renderCell(col, row, pinnedLeft);
    }).join("");
    const rowClasses = ["ubits-data-table__row", isExpanded ? "ubits-data-table__row--expanded" : ""].filter(Boolean).join(" ");
    let rowHTML = `
    <tr class="${rowClasses}" data-row-id="${row.id}">
      ${cellsHTML}
    </tr>
  `;
    if (isExpanded && row.renderExpandedContent) {
      const expandedContent = row.renderExpandedContent(row.data);
      const colspan = visibleColumns.length;
      rowHTML += `
      <tr class="ubits-data-table__row-expanded-row" data-expanded-for="${row.id}">
        <td class="ubits-data-table__row-expanded-content" colspan="${colspan}">
          ${expandedContent}
        </td>
      </tr>
    `;
    } else if (isExpanded && !row.renderExpandedContent) {
      console.warn(
        "📋 [ROW RENDER] ⚠️ Fila marcada como expandida pero no tiene renderExpandedContent - rowId:",
        row.id
      );
    }
    return rowHTML;
  }
  function renderDataTableHeader(options) {
    const { header, rows } = options;
    if (!header) {
      return "";
    }
    const {
      title,
      showTitle = title !== void 0,
      counter,
      displayedItems,
      totalItems,
      showCounter = counter !== void 0 && counter !== false,
      primaryButton,
      showPrimaryButton = primaryButton !== void 0,
      secondaryButtons = [],
      showSecondaryButtons = secondaryButtons !== void 0 && secondaryButtons.length > 0,
      searchButton,
      showSearchButton = searchButton !== void 0,
      filterButton,
      showFilterButton = filterButton !== void 0,
      columnSelectorButton,
      showColumnSelectorButton = columnSelectorButton !== void 0
    } = header;
    const isSearchActive = header.__isSearchActive || false;
    const searchTerm = header.__searchTerm || "";
    let counterText = "";
    if (showCounter && counter) {
      if (typeof counter === "string") {
        if (counter === "total-only") {
          const total = totalItems !== void 0 ? totalItems : rows.length;
          counterText = `${total} resultados`;
        } else {
          counterText = counter;
        }
      } else if (counter === true) {
        const currentDisplayed = displayedItems !== void 0 ? displayedItems : rows.length;
        const total = totalItems !== void 0 ? totalItems : rows.length;
        counterText = `${currentDisplayed}/${total} resultados`;
      }
    }
    const titleSection = showTitle && title ? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-body-md-bold ubits-data-table__header-title-text">${title}</span>
      ${counterText ? `<span class="ubits-data-table__header-counter ubits-body-sm-regular">${counterText}</span>` : ""}
    </div>
  ` : counterText ? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-data-table__header-counter ubits-body-sm-regular">${counterText}</span>
    </div>
  ` : "";
    const primaryButtonHTML = showPrimaryButton && primaryButton ? renderButton({
      variant: "primary",
      size: "sm",
      text: primaryButton.text || "",
      // Agregar texto si está disponible
      icon: primaryButton.icon || "plus",
      iconStyle: primaryButton.iconStyle || "regular",
      iconOnly: !primaryButton.text,
      // iconOnly solo si NO hay texto
      disabled: primaryButton.disabled || false,
      loading: primaryButton.loading || false,
      className: "ubits-data-table__header-primary-button",
      showTooltip: !primaryButton.text,
      // Tooltip solo si es iconOnly
      tooltipText: primaryButton.text || "Nuevo"
    }) : "";
    const secondaryButtonsHTML = showSecondaryButtons && secondaryButtons.length > 0 ? secondaryButtons.slice(0, 2).map(
      (btn) => renderButton({
        variant: "secondary",
        size: "sm",
        text: btn.text || "",
        // Agregar texto si está disponible
        icon: btn.icon || "download",
        iconStyle: btn.iconStyle || "regular",
        iconOnly: !btn.text,
        // iconOnly solo si NO hay texto
        disabled: btn.disabled || false,
        loading: btn.loading || false,
        className: "ubits-data-table__header-secondary-button",
        showTooltip: !btn.text,
        // Tooltip solo si es iconOnly
        tooltipText: btn.text || ""
      })
    ).join("") : "";
    const filterButtonHTML = showFilterButton && filterButton ? renderButton({
      variant: "secondary",
      size: "sm",
      icon: "filter",
      iconStyle: "regular",
      iconOnly: true,
      disabled: filterButton.disabled || false,
      active: filterButton.active || false,
      className: "ubits-data-table__header-filter-button",
      showTooltip: true,
      tooltipText: "Filtros"
    }) : "";
    const columnSelectorButtonHTML = showColumnSelectorButton && columnSelectorButton ? renderButton({
      variant: "secondary",
      size: "sm",
      icon: "columns-3",
      iconStyle: "regular",
      iconOnly: true,
      disabled: columnSelectorButton.disabled || false,
      active: columnSelectorButton.active || false,
      className: "ubits-data-table__header-column-selector-button",
      showTooltip: true,
      tooltipText: "Seleccionar columnas"
    }) : "";
    const currentSearchValue = searchTerm || searchButton && searchButton.value || "";
    const searchButtonHTML = showSearchButton && searchButton ? renderSearchButton({
      active: isSearchActive,
      size: "sm",
      state: isSearchActive ? "active" : "default",
      disabled: searchButton.disabled || false,
      placeholder: searchButton.placeholder || "Buscar...",
      value: currentSearchValue,
      width: 248,
      className: "ubits-data-table__header-search-button"
    }) : "";
    const hasAnyElement = !!(titleSection || primaryButtonHTML || secondaryButtonsHTML || searchButtonHTML || filterButtonHTML || columnSelectorButtonHTML);
    if (!hasAnyElement) {
      console.warn("⚠️ [DATA TABLE HEADER] No hay elementos para renderizar, retornando vacío");
      return "";
    }
    return `
    <div class="ubits-data-table__header">
      ${titleSection}
      <div class="ubits-data-table__header-actions">
        ${searchButtonHTML}
        ${filterButtonHTML}
        ${columnSelectorButtonHTML}
        ${secondaryButtonsHTML}
        ${primaryButtonHTML}
      </div>
    </div>
  `.trim();
  }
  function renderDataTable(options, columnOrder = [], rowOrder = []) {
    const {
      columns,
      rows,
      className = "",
      columnReorderable = false,
      columnSortable = true,
      rowReorderable = false,
      rowExpandable = true,
      showCheckbox = true,
      showVerticalScrollbar = false,
      showHorizontalScrollbar = false,
      showColumnMenu = true,
      showPagination = false,
      currentPage = 1,
      itemsPerPage = 10,
      paginationVariant = "default",
      paginationSize = "md",
      lazyLoad,
      lazyLoadItemsPerBatch = 10,
      emptyState
    } = options;
    const searchTerm = options.header?.__searchTerm || "";
    const isLazyLoadEnabled = showPagination ? false : lazyLoad !== false;
    const seenIds = /* @__PURE__ */ new Set();
    const uniqueColumns = columns.filter((col) => {
      if (seenIds.has(col.id)) {
        return false;
      }
      seenIds.add(col.id);
      return true;
    });
    let visibleColumns = uniqueColumns.filter((col) => col.visible !== false);
    visibleColumns = visibleColumns.filter((col) => col.id !== "checkbox");
    if (columnOrder.length > 0) {
      const filteredColumnOrder = columnOrder.filter((id) => id !== "checkbox");
      const columnMap = new Map(
        visibleColumns.map((col) => {
          const copy = { ...col };
          if (col.pinned !== void 0) {
            copy.pinned = col.pinned;
          }
          return [col.id, copy];
        })
      );
      visibleColumns = filteredColumnOrder.map((id) => {
        const col = columnMap.get(id);
        if (col) {
          const original = visibleColumns.find((c) => c.id === id);
          if (original && original.pinned !== void 0) {
            col.pinned = original.pinned;
          }
        }
        return col;
      }).filter((col) => col !== void 0).concat(
        visibleColumns.filter((col) => !filteredColumnOrder.includes(col.id)).map((col) => {
          const copy = { ...col };
          if (col.pinned !== void 0) {
            copy.pinned = col.pinned;
          }
          return copy;
        })
      );
    } else {
      visibleColumns = visibleColumns.map((col) => {
        const copy = { ...col };
        if (col.pinned !== void 0) {
          copy.pinned = col.pinned;
        }
        return copy;
      });
    }
    if (showCheckbox !== false) {
      const checkbox2Exists = visibleColumns.some((col) => col.id === "checkbox-2");
      if (!checkbox2Exists) {
        const newCheckboxColumn = {
          id: "checkbox-2",
          title: "",
          type: void 0,
          visible: true,
          width: 48
        };
        visibleColumns.unshift(newCheckboxColumn);
      }
    } else {
      visibleColumns.map((col) => col.id);
      visibleColumns = visibleColumns.filter((col) => col.id !== "checkbox-2");
      visibleColumns.map((col) => col.id);
    }
    if (rowReorderable) {
      const dragHandleExists = visibleColumns.some((col) => col.type === "drag-handle");
      if (!dragHandleExists) {
        const dragHandleColumn = {
          id: "drag-handle",
          title: "",
          type: "drag-handle",
          visible: true,
          width: 32
        };
        visibleColumns.unshift(dragHandleColumn);
      }
    } else {
      visibleColumns = visibleColumns.filter((col) => col.type !== "drag-handle");
    }
    if (rowExpandable) {
      const expandExists = visibleColumns.some((col) => col.type === "expand");
      if (!expandExists) {
        const expandColumn = {
          id: "expand",
          title: "",
          type: "expand",
          visible: true,
          width: 32
        };
        const dragHandleIndex = visibleColumns.findIndex((col) => col.type === "drag-handle");
        if (dragHandleIndex >= 0) {
          visibleColumns.splice(dragHandleIndex + 1, 0, expandColumn);
        } else {
          visibleColumns.unshift(expandColumn);
        }
      }
    } else {
      visibleColumns = visibleColumns.filter((col) => col.type !== "expand");
    }
    const { checkboxSticky = false, dragHandleSticky = false, expandSticky = false } = options;
    visibleColumns = visibleColumns.map((col) => {
      const colCopy = { ...col };
      if (col.id === "checkbox-2") {
        if (checkboxSticky === true) {
          colCopy.pinned = true;
        } else {
          colCopy.pinned = false;
        }
      } else if (col.type === "drag-handle") {
        if (dragHandleSticky === true) {
          colCopy.pinned = true;
        } else {
          colCopy.pinned = false;
        }
      } else if (col.type === "expand") {
        if (expandSticky === true) {
          colCopy.pinned = true;
        } else {
          colCopy.pinned = false;
        }
      }
      if (colCopy.pinned && !col.id.startsWith("checkbox") && col.type !== "drag-handle" && col.type !== "expand") ;
      return colCopy;
    });
    visibleColumns.filter((col) => col.pinned);
    const sortColumnId = options.sortColumnId || null;
    const sortDirection = options.sortDirection || null;
    let orderedRows = [...rows];
    if (rowOrder.length > 0) {
      const rowMap = new Map(rows.map((row) => [row.id, row]));
      orderedRows = rowOrder.map((id) => rowMap.get(id)).filter((row) => row !== void 0).concat(rows.filter((row) => !rowOrder.includes(row.id)));
    }
    if (sortColumnId && sortDirection) {
      orderedRows = [...orderedRows].sort((a, b) => {
        const aValue = a.data[sortColumnId];
        const bValue = b.data[sortColumnId];
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        let comparison = 0;
        if (aStr < bStr) {
          comparison = -1;
        } else if (aStr > bStr) {
          comparison = 1;
        }
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }
    const calculatePinnedLeft = (column, columnIndex, allColumns) => {
      let left = 0;
      const debugInfo = {
        columnId: column.id,
        steps: []
      };
      for (let i = 0; i < columnIndex; i++) {
        const prevCol = allColumns[i];
        if (prevCol && prevCol.pinned) {
          let prevWidth = prevCol.width;
          if (!prevWidth) {
            if (prevCol.type === "drag-handle") {
              prevWidth = 32;
            } else if (prevCol.type === "expand") {
              prevWidth = 32;
            } else if (prevCol.id === "checkbox-2") {
              prevWidth = 48;
            } else {
              prevWidth = 150;
            }
          }
          left += prevWidth;
          debugInfo.steps.push({
            step: `columna-${prevCol.id}`,
            added: prevWidth,
            total: left,
            reason: `Columna fijada anterior: ${prevCol.id} (tipo: ${prevCol.type || "normal"})`
          });
        } else if (prevCol && !prevCol.pinned) {
          debugInfo.steps.push({
            step: `columna-${prevCol.id}`,
            added: 0,
            total: left,
            reason: `Columna anterior no fijada: ${prevCol.id}`
          });
        }
      }
      debugInfo.finalLeft = left;
      if (column.pinned) ;
      return left;
    };
    const columnHeadersHTML = visibleColumns.map((col, index) => {
      const pinnedLeft = col.pinned ? calculatePinnedLeft(col, index, visibleColumns) : 0;
      if (col.pinned) ;
      return renderColumnHeader(
        col,
        columnReorderable,
        columnSortable,
        orderedRows,
        sortColumnId,
        sortDirection,
        showColumnMenu,
        pinnedLeft
      );
    }).join("");
    let paginatedRows = orderedRows;
    let totalPages = 1;
    let paginationHTML = "";
    const currentLoadedItems = options.__lazyLoadCurrentItems || lazyLoadItemsPerBatch;
    if (showPagination) {
      const totalRows = orderedRows.length;
      totalPages = Math.max(1, Math.ceil(totalRows / itemsPerPage));
      const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
      const startIndex = (validCurrentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      paginatedRows = orderedRows.slice(startIndex, endIndex);
      try {
        paginationHTML = renderPagination({
          currentPage: validCurrentPage,
          totalPages,
          totalItems: totalRows,
          itemsPerPage,
          variant: paginationVariant,
          size: paginationSize,
          maxVisiblePages: 7,
          showFirst: false,
          // Sin botón Primera
          showLast: false,
          // Sin botón Última
          showPrevNext: true,
          // Solo Anterior/Siguiente
          showInfo: false,
          // Sin información de items
          showItemsPerPage: false,
          // Sin selector de items por página
          itemsPerPageOptions: [10, 20, 50, 100],
          className: "ubits-data-table__pagination"
        });
      } catch (error) {
        console.error("❌ [PAGINATION] ERROR:", error);
        paginationHTML = "";
      }
    } else if (isLazyLoadEnabled) {
      paginatedRows = orderedRows.slice(0, currentLoadedItems);
    }
    let emptyStateHTML = "";
    const hasNoData = rows.length === 0;
    const hasNoResults = paginatedRows.length === 0;
    const hasSearchTerm = searchTerm && searchTerm.trim() !== "";
    if (hasNoResults && emptyState) {
      let emptyStateConfig;
      if (hasNoData && emptyState.noData) {
        emptyStateConfig = emptyState.noData;
      } else if (hasSearchTerm && emptyState.noSearchResults) {
        emptyStateConfig = emptyState.noSearchResults;
      }
      if (emptyStateConfig) {
        emptyStateHTML = renderEmptyState({
          title: emptyStateConfig.title || "No hay resultados",
          description: emptyStateConfig.description,
          icon: emptyStateConfig.icon,
          imageUrl: emptyStateConfig.imageUrl,
          actionLabel: emptyStateConfig.actionLabel,
          showPrimaryButton: emptyStateConfig.showPrimaryButton || false,
          primaryButtonIcon: emptyStateConfig.primaryButtonIcon,
          showPrimaryButtonIcon: emptyStateConfig.showPrimaryButtonIcon || false,
          secondaryActionLabel: emptyStateConfig.secondaryActionLabel,
          showSecondaryButton: emptyStateConfig.showSecondaryButton || false,
          secondaryButtonIcon: emptyStateConfig.secondaryButtonIcon,
          showSecondaryButtonIcon: emptyStateConfig.showSecondaryButtonIcon || false,
          className: "ubits-data-table__empty-state"
        });
      }
    }
    const rowsHTML = paginatedRows.map((row, index) => {
      const pinnedLefts = visibleColumns.map((col, colIndex) => {
        if (col.pinned) {
          const left = calculatePinnedLeft(col, colIndex, visibleColumns);
          return left;
        }
        return 0;
      });
      return renderRow(row, visibleColumns, index, pinnedLefts);
    }).join("");
    const tbodyContent = emptyStateHTML || rowsHTML;
    const classes = ["ubits-data-table", className].filter(Boolean).join(" ");
    const headerCount = visibleColumns.length;
    const tableHTML = `
    <table class="${classes} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${columnHeadersHTML}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${emptyStateHTML ? `<tr><td colspan="${headerCount}" style="padding: 0;">${emptyStateHTML}</td></tr>` : tbodyContent}
      </tbody>
    </table>
  `.trim();
    const hasPinnedColumns = visibleColumns.some((col) => col.pinned);
    let finalShowHorizontalScrollbar = showHorizontalScrollbar;
    if (hasPinnedColumns && !showHorizontalScrollbar) {
      finalShowHorizontalScrollbar = true;
    }
    let finalShowVerticalScrollbar = showVerticalScrollbar;
    if (isLazyLoadEnabled && !showPagination) {
      finalShowVerticalScrollbar = true;
    }
    if (!showPagination && !isLazyLoadEnabled && !finalShowVerticalScrollbar) {
      const estimatedHeight = 45 + orderedRows.length * 45;
      if (estimatedHeight > 600) {
        finalShowVerticalScrollbar = true;
      }
    }
    let tableContainerHTML;
    if (finalShowVerticalScrollbar || finalShowHorizontalScrollbar) {
      const scrollClasses = [];
      if (finalShowVerticalScrollbar) {
        scrollClasses.push("ubits-data-table__scrollable-container--vertical");
      }
      if (finalShowHorizontalScrollbar) {
        scrollClasses.push("ubits-data-table__scrollable-container--horizontal");
      }
      tableContainerHTML = `<div class="ubits-data-table__scrollable-container ${scrollClasses.join(" ")}">${tableHTML}</div>`;
    } else {
      tableContainerHTML = tableHTML;
    }
    const headerHTML = renderDataTableHeader(options);
    let html;
    if (showPagination && paginationHTML) {
      html = `<div class="ubits-data-table__container">
      ${headerHTML}
      ${tableContainerHTML}
      <div class="ubits-data-table__pagination-wrapper">${paginationHTML}</div>
    </div>`;
    } else {
      if (headerHTML) {
        html = `<div class="ubits-data-table__container">
        ${headerHTML}
        ${tableContainerHTML}
      </div>`;
      } else {
        html = tableContainerHTML;
      }
    }
    return html;
  }
  function createDataTable(options) {
    const container = options.containerId ? document.getElementById(options.containerId) : document.body;
    if (!container) {
      throw new Error(`Container with id "${options.containerId}" not found`);
    }
    const existingTable = container.querySelector(".ubits-data-table");
    const existingScrollableContainer = container.querySelector(
      ".ubits-data-table__scrollable-container"
    );
    if (existingScrollableContainer) {
      const scrollableElement = existingScrollableContainer;
      const tableInside = scrollableElement.querySelector(".ubits-data-table");
      if (tableInside) {
        const tableElement = tableInside;
        if (tableElement._dataTableInstance) {
          try {
            const instance = tableElement._dataTableInstance;
            if (instance && typeof instance.destroy === "function") {
              instance.destroy();
            }
          } catch (e) {
            console.warn("Error destroying previous table instance:", e);
          }
        }
      }
      existingScrollableContainer.remove();
    } else if (existingTable) {
      const tableElement = existingTable;
      if (tableElement._dataTableInstance) {
        try {
          const instance = tableElement._dataTableInstance;
          if (instance && typeof instance.destroy === "function") {
            instance.destroy();
          }
        } catch (e) {
          console.warn("Error destroying previous table instance:", e);
        }
      }
      existingTable.remove();
    }
    const initialLazyLoadItems = options.lazyLoad !== false && !options.showPagination ? options.lazyLoadItemsPerBatch || 10 : void 0;
    const initialOptions = {
      ...options,
      __lazyLoadCurrentItems: initialLazyLoadItems
    };
    const tableHTML = renderDataTable(initialOptions);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = tableHTML.trim();
    const element = tempDiv.firstElementChild;
    if (!element) {
      throw new Error("Failed to create data table 3 element");
    }
    container.appendChild(element);
    const removeDuplicateColumns = (cols) => {
      const seenIds = /* @__PURE__ */ new Set();
      const unique = [];
      for (const col of cols) {
        if (!seenIds.has(col.id)) {
          seenIds.add(col.id);
          unique.push({ ...col });
        }
      }
      if (unique.length !== cols.length) ;
      return unique;
    };
    let currentOptions = {
      ...options,
      columns: removeDuplicateColumns(options.columns)
    };
    let columnOrder = currentOptions.columns.filter((col) => col.visible !== false).map((col) => col.id);
    let rowOrder = currentOptions.rows.map((row) => row.id);
    let draggedColumnId = null;
    let draggedRowId = null;
    let sortColumnId = null;
    let sortDirection = null;
    let searchTerm = "";
    let isSearchActive = false;
    let searchButtonInstance = null;
    const filterRowsBySearch = (rows, searchTerm2, columns) => {
      if (!searchTerm2 || searchTerm2.trim() === "") {
        return rows;
      }
      const normalizedSearch = searchTerm2.toLowerCase().trim();
      const visibleColumns = columns.filter((col) => col.visible !== false);
      return rows.filter((row) => {
        return visibleColumns.some((column) => {
          const cellValue = row.data[column.id];
          if (cellValue == null) return false;
          const cellValueStr = String(cellValue).toLowerCase();
          return cellValueStr.includes(normalizedSearch);
        });
      });
    };
    const isLazyLoadEnabled = currentOptions.showPagination ? false : currentOptions.lazyLoad !== false;
    const lazyLoadItemsPerBatch = currentOptions.lazyLoadItemsPerBatch || 10;
    let lazyLoadCurrentItems = lazyLoadItemsPerBatch;
    let lazyLoadScrollListener = null;
    const setupLazyLoad = () => {
      if (lazyLoadScrollListener) {
        const scrollableContainer2 = element.querySelector(
          ".ubits-data-table__scrollable-container"
        );
        if (scrollableContainer2) {
          scrollableContainer2.removeEventListener("scroll", lazyLoadScrollListener);
        }
        window.removeEventListener("scroll", lazyLoadScrollListener, true);
        lazyLoadScrollListener = null;
      }
      const scrollableContainer = element.querySelector(
        ".ubits-data-table__scrollable-container"
      );
      const checkScroll = () => {
        const totalRows = currentOptions.rows.length;
        if (lazyLoadCurrentItems >= totalRows) {
          return;
        }
        let scrollTop;
        let scrollHeight;
        let clientHeight;
        if (scrollableContainer) {
          scrollTop = scrollableContainer.scrollTop;
          scrollHeight = scrollableContainer.scrollHeight;
          clientHeight = scrollableContainer.clientHeight;
        } else {
          scrollTop = window.scrollY || document.documentElement.scrollTop;
          scrollHeight = document.documentElement.scrollHeight;
          clientHeight = window.innerHeight;
          const elementRect = element.getBoundingClientRect();
          const elementBottom = elementRect.bottom + scrollTop;
          const viewportBottom = scrollTop + clientHeight;
          if (viewportBottom >= elementBottom - 200) {
            const newLoadedItems = Math.min(lazyLoadCurrentItems + lazyLoadItemsPerBatch, totalRows);
            if (newLoadedItems > lazyLoadCurrentItems) {
              lazyLoadCurrentItems = newLoadedItems;
              if (currentOptions.onLazyLoad) {
                currentOptions.onLazyLoad(lazyLoadCurrentItems, totalRows);
              }
              render(true);
            }
          }
          return;
        }
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
        if (scrollPercentage >= 0.8) {
          const newLoadedItems = Math.min(lazyLoadCurrentItems + lazyLoadItemsPerBatch, totalRows);
          if (newLoadedItems > lazyLoadCurrentItems) {
            lazyLoadCurrentItems = newLoadedItems;
            if (currentOptions.onLazyLoad) {
              currentOptions.onLazyLoad(lazyLoadCurrentItems, totalRows);
            }
            render(true);
          }
        }
      };
      if (!scrollableContainer) {
        console.warn("⚠️ [LAZY LOAD] No se encontró contenedor scrollable, esperando renderizado...");
        setTimeout(() => {
          const retryScrollableContainer = element.querySelector(
            ".ubits-data-table__scrollable-container"
          );
          if (retryScrollableContainer) {
            lazyLoadScrollListener = checkScroll;
            retryScrollableContainer.addEventListener("scroll", lazyLoadScrollListener, {
              passive: true
            });
          } else {
            console.error(
              "❌ [LAZY LOAD] No se pudo encontrar contenedor scrollable. El lazy load requiere scroll vertical activo."
            );
          }
        }, 100);
      } else {
        lazyLoadScrollListener = checkScroll;
        scrollableContainer.addEventListener("scroll", lazyLoadScrollListener, { passive: true });
      }
    };
    const initializeIconFallbacks = () => {
      const waIcons = element.querySelectorAll("wa-icon");
      waIcons.forEach((waIcon, index) => {
        const faIcon = waIcon.nextElementSibling;
        const parent = waIcon.parentElement;
        const isDragHandle = parent && parent.classList.contains("ubits-data-table__column-drag-handle");
        if (faIcon && faIcon.tagName === "I") {
          if (customElements.get("wa-icon")) {
            if (isDragHandle) {
              waIcon.style.display = "block";
              waIcon.style.width = "14px";
              waIcon.style.height = "14px";
              waIcon.style.opacity = "1";
              waIcon.style.margin = "0";
              waIcon.style.padding = "0";
              waIcon.style.position = "absolute";
              waIcon.style.top = "50%";
              waIcon.style.left = "50%";
              waIcon.style.transform = "translate(-50%, -50%)";
              window.getComputedStyle(waIcon);
              if (parent) {
                window.getComputedStyle(parent);
                parent.getBoundingClientRect();
              }
            } else {
              waIcon.style.display = "inline-block";
              waIcon.style.width = "12px";
              waIcon.style.height = "12px";
              waIcon.style.opacity = "1";
            }
            faIcon.style.display = "none";
          } else {
            waIcon.style.display = "none";
            if (isDragHandle) {
              faIcon.style.display = "block";
              faIcon.style.fontSize = "14px";
              faIcon.style.width = "14px";
              faIcon.style.height = "14px";
              faIcon.style.margin = "0";
              faIcon.style.padding = "0";
              faIcon.style.lineHeight = "1";
              faIcon.style.position = "absolute";
              faIcon.style.top = "50%";
              faIcon.style.left = "50%";
              faIcon.style.transform = "translate(-50%, -50%)";
              faIcon.style.boxSizing = "border-box";
              faIcon.style.textAlign = "center";
              faIcon.style.verticalAlign = "middle";
              window.getComputedStyle(faIcon);
              faIcon.getBoundingClientRect();
              if (parent) {
                window.getComputedStyle(parent);
                parent.getBoundingClientRect();
              }
            } else {
              faIcon.style.display = "inline-block";
              faIcon.style.fontSize = "12px";
              faIcon.style.width = "12px";
              faIcon.style.height = "12px";
            }
          }
        }
      });
    };
    const render = (preserveScroll = false) => {
      `render-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      let savedScrollTop = 0;
      let savedScrollHeight = 0;
      let savedClientHeight = 0;
      let shouldPreserveScroll = preserveScroll;
      const scrollableContainer = element.querySelector(
        ".ubits-data-table__scrollable-container"
      );
      if (scrollableContainer) {
        savedScrollTop = scrollableContainer.scrollTop;
        savedScrollHeight = scrollableContainer.scrollHeight;
        savedClientHeight = scrollableContainer.clientHeight;
        const hasScrollableContent = savedScrollHeight > savedClientHeight;
        if (hasScrollableContent && !preserveScroll) {
          shouldPreserveScroll = true;
        }
        if (savedScrollTop > 0 && !preserveScroll && !shouldPreserveScroll) {
          shouldPreserveScroll = true;
        }
      }
      let filteredRows = currentOptions.rows;
      if (searchTerm) {
        filteredRows = filterRowsBySearch(filteredRows, searchTerm, currentOptions.columns);
      }
      const renderOptions = {
        ...currentOptions,
        rows: filteredRows,
        columns: currentOptions.columns.map((col) => {
          const copy = { ...col };
          if (col.pinned !== void 0) {
            copy.pinned = col.pinned;
          }
          return copy;
        }),
        sortColumnId,
        sortDirection,
        // Pasar el estado de lazy load
        __lazyLoadCurrentItems: lazyLoadCurrentItems,
        // Actualizar displayedItems en el header solo si no está explícitamente definido
        // Si ya está definido (por ejemplo, desde el input), mantener ese valor
        header: currentOptions.header ? {
          ...currentOptions.header,
          // Solo actualizar displayedItems si no está definido explícitamente o si hay búsqueda activa
          displayedItems: currentOptions.header.displayedItems !== void 0 && !searchTerm ? currentOptions.header.displayedItems : filteredRows.length,
          // Pasar el estado activo del SearchButton y el término de búsqueda a través de las opciones
          __isSearchActive: isSearchActive,
          __searchTerm: searchTerm
        } : void 0
      };
      const seenColumnIds = /* @__PURE__ */ new Set();
      const uniqueColumns = renderOptions.columns.filter((col) => {
        if (seenColumnIds.has(col.id)) {
          return false;
        }
        seenColumnIds.add(col.id);
        return true;
      });
      renderOptions.columns = uniqueColumns;
      const newHTML = renderDataTable(renderOptions, columnOrder, rowOrder);
      performance.now();
      element.innerHTML = newHTML.trim();
      performance.now();
      if (currentOptions.header?.searchButton && currentOptions.header?.showSearchButton !== false) {
        const searchButtonPlaceholder = element.querySelector(
          ".ubits-data-table__header-search-button"
        );
        if (searchButtonPlaceholder) {
          if (searchButtonInstance) {
            try {
              searchButtonInstance.destroy();
            } catch (e) {
            }
          }
          if (!currentOptions.header?.searchButton) {
            console.warn(
              "🔍 [DATA TABLE] searchButton no está definido, saltando creación del componente"
            );
          } else {
            const tempContainer = document.createElement("div");
            tempContainer.style.display = "none";
            document.body.appendChild(tempContainer);
            tempContainer.id = "temp-search-button-container-" + Date.now();
            searchButtonInstance = createSearchButton({
              containerId: tempContainer.id,
              active: isSearchActive,
              size: "sm",
              state: isSearchActive ? "active" : "default",
              disabled: currentOptions.header.searchButton.disabled || false,
              placeholder: currentOptions.header.searchButton.placeholder || "Buscar...",
              value: searchTerm,
              width: 248,
              className: "ubits-data-table__header-search-button",
              onChange: (e) => {
                const value = e.target.value;
                searchTerm = value;
                if (currentOptions.header.searchButton.onChange) {
                  currentOptions.header.searchButton.onChange(value);
                }
                render();
                if (currentOptions.header.searchButton.onSearch) {
                  const filteredRows2 = filterRowsBySearch(
                    currentOptions.rows,
                    value,
                    currentOptions.columns
                  );
                  currentOptions.header.searchButton.onSearch(value, filteredRows2);
                }
              },
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
                isSearchActive = true;
                if (currentOptions.header.searchButton.onClick) {
                  currentOptions.header.searchButton.onClick(e);
                }
                render();
                setTimeout(() => {
                  const input = searchButtonInstance?.element.querySelector(
                    ".ubits-search-button__input"
                  );
                  if (input) {
                    input.focus();
                  }
                }, 150);
              },
              onBlur: (e) => {
                const input = e.target;
                setTimeout(() => {
                  if (!input.value.trim() && document.activeElement !== input) {
                    const clearBtn = searchButtonInstance?.element.querySelector(
                      ".ubits-search-button__clear"
                    );
                    if (document.activeElement !== clearBtn) {
                      isSearchActive = false;
                      render();
                    }
                  }
                }, 200);
              }
            });
            const searchButtonElement = searchButtonInstance.element;
            searchButtonPlaceholder.parentNode?.replaceChild(
              searchButtonElement,
              searchButtonPlaceholder
            );
            if (isSearchActive && searchButtonElement.style.width) {
              searchButtonElement.style.width = "";
            }
            document.body.removeChild(tempContainer);
          }
          setTimeout(() => {
            const activeSearchBtn = element.querySelector(
              ".ubits-data-table__header-search-button.ubits-search-button--active"
            );
            const prevButton = activeSearchBtn?.previousElementSibling;
            if (activeSearchBtn && prevButton) {
              const searchRect = activeSearchBtn.getBoundingClientRect();
              const prevRect = prevButton.getBoundingClientRect();
              const computedStyle = window.getComputedStyle(activeSearchBtn);
              const inputWrapper = activeSearchBtn.querySelector(
                ".ubits-search-button__input-wrapper"
              );
              const inputWrapperStyle = inputWrapper ? window.getComputedStyle(inputWrapper) : null;
              const gapInfo = {
                actualGap: searchRect.left - prevRect.right,
                difference: searchRect.left - prevRect.right - 8,
                searchButton: {
                  left: searchRect.left,
                  width: searchRect.width,
                  right: searchRect.right,
                  marginLeft: computedStyle.marginLeft,
                  marginRight: computedStyle.marginRight,
                  inlineWidth: activeSearchBtn.style.width || "none",
                  computedWidth: computedStyle.width
                },
                prevButton: {
                  right: prevRect.right,
                  width: prevRect.width
                },
                inputWrapper: {
                  width: inputWrapperStyle?.width || "N/A",
                  computedWidth: inputWrapperStyle?.width || "N/A"
                }
              };
              if (Math.abs(gapInfo.actualGap - 8) > 1) {
                searchRect.width;
              }
            }
          }, 100);
        }
      }
      attachEventListeners();
      initializeIconFallbacks();
      if (currentOptions.showPagination) {
        setTimeout(() => {
          checkPaginationSpacing();
        }, 100);
      }
      if (isLazyLoadEnabled && !currentOptions.showPagination) {
        setupLazyLoad();
      }
      const shouldRestoreScroll = shouldPreserveScroll || savedScrollHeight > 0 && savedClientHeight > 0 && savedScrollHeight > savedClientHeight;
      if (shouldRestoreScroll) {
        requestAnimationFrame(() => {
          const newScrollableContainer = element.querySelector(
            ".ubits-data-table__scrollable-container"
          );
          if (newScrollableContainer) {
            const newScrollHeight = newScrollableContainer.scrollHeight;
            const newClientHeight = newScrollableContainer.clientHeight;
            const newMaxScroll = newScrollHeight - newClientHeight;
            const oldMaxScroll = savedScrollHeight - savedClientHeight;
            const scrollPercentage = oldMaxScroll > 0 ? savedScrollTop / oldMaxScroll : 0;
            if (newMaxScroll > 0) {
              const newScrollTop = scrollPercentage * newMaxScroll;
              newScrollableContainer.scrollTop = newScrollTop;
            }
          }
        });
      }
      const rows = element.querySelectorAll(".ubits-data-table__row");
      element.querySelector(".ubits-data-table__table");
      element.querySelector(".ubits-data-table__tbody");
      element.querySelector(
        ".ubits-data-table__scrollable-container"
      );
      element.querySelector(".ubits-data-table");
      if (rows.length > 0) {
        const firstRow = rows[0];
        const secondRow = rows[1];
        const lastRow = rows[rows.length - 1];
        firstRow.getBoundingClientRect();
        secondRow ? secondRow.getBoundingClientRect() : null;
        lastRow.getBoundingClientRect();
      }
      rows.forEach((row, index) => {
        if (index === 0) {
          const cells = row.querySelectorAll("td");
          cells.forEach((cell, cellIndex) => {
            const cellElement = cell;
            Array.from(cellElement.classList);
            window.getComputedStyle(cellElement).backgroundColor;
          });
        }
      });
      if (rows.length > 0) {
        const firstRow = rows[0];
        firstRow.addEventListener("mouseenter", () => {
          const cells = firstRow.querySelectorAll("td");
          cells.forEach((cell, index) => {
            const cellElement = cell;
            Array.from(cellElement.classList);
            window.getComputedStyle(cellElement).backgroundColor;
          });
        });
        firstRow.addEventListener("mouseleave", () => {
        });
      }
      const checkboxHeaders = element.querySelectorAll("input[data-column-checkbox-header]");
      checkboxHeaders.forEach((input) => {
        const headerInput = input;
        const columnId = headerInput.getAttribute("data-column-checkbox-header");
        if (columnId) {
          const allChecked = currentOptions.rows.length > 0 && currentOptions.rows.every((row) => row.data[columnId] === true);
          const someChecked = currentOptions.rows.some((row) => row.data[columnId] === true);
          const isIndeterminate = someChecked && !allChecked;
          headerInput.indeterminate = isIndeterminate;
        }
      });
      const checkPaginationSpacing = () => {
        try {
          const container2 = element.closest(".ubits-data-table__container") || element.querySelector(".ubits-data-table__container");
          if (container2) {
            const containerComputed = window.getComputedStyle(container2);
            const tableContainer = container2.querySelector(".ubits-data-table__scrollable-container") || container2.querySelector(".ubits-data-table");
            const actualTable = tableContainer?.querySelector(".ubits-data-table__table") || tableContainer;
            const lastRow = actualTable?.querySelector(
              ".ubits-data-table__row:last-child"
            );
            if (tableContainer) {
              const tableComputed = window.getComputedStyle(tableContainer);
              if (lastRow) {
                const lastRowRect = lastRow.getBoundingClientRect();
              }
            }
            const paginationWrapper = container2.querySelector(
              ".ubits-data-table__pagination-wrapper"
            );
            if (paginationWrapper) {
              const paginationComputed = window.getComputedStyle(paginationWrapper);
              const paginationRect = paginationWrapper.getBoundingClientRect();
              if (lastRow) {
                const lastRowRect = lastRow.getBoundingClientRect();
                const distance = paginationRect.top - lastRowRect.bottom;
              } else {
              }
            } else {
            }
          } else {
          }
        } catch (error) {
          console.error("📄 [SPACING] ❌ Error verificando espaciado:", error);
        }
      };
    };
    const attachEventListeners = () => {
      console.log("🔵 [DATA TABLE ATTACH] ========== INICIO attachEventListeners ==========");
      console.log("🔵 [DATA TABLE ATTACH] currentOptions existe:", !!currentOptions);
      console.log(
        "🔵 [DATA TABLE ATTACH] currentOptions.onRowSelect existe:",
        !!currentOptions?.onRowSelect
      );
      console.log("🔵 [DATA TABLE ATTACH] Tipo de onRowSelect:", typeof currentOptions?.onRowSelect);
      console.log("🔵 [DATA TABLE ATTACH] currentOptions keys:", Object.keys(currentOptions || {}));
      if (currentOptions?.header) {
        console.log("🔵 [DATA TABLE ATTACH] currentOptions.header existe");
        console.log(
          "🔵 [DATA TABLE ATTACH] currentOptions.header.searchButton existe:",
          !!currentOptions.header.searchButton
        );
      }
      console.log("🔵 [DATA TABLE ATTACH] ========== FIN VERIFICACIÓN INICIAL ==========");
      typeof window !== "undefined" && window.location && !window.location.href.includes("storybook");
      try {
        if (currentOptions.columnReorderable) {
          if (!element.hasAttribute("data-column-drag-listener")) {
            element.setAttribute("data-column-drag-listener", "true");
            element.addEventListener(
              "dragstart",
              (e) => {
                const target = e.target;
                const dragHandle = target.closest(".ubits-data-table__column-drag-handle");
                if (dragHandle) {
                  draggedColumnId = dragHandle.getAttribute("data-column-id");
                  if (draggedColumnId) {
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/plain", draggedColumnId);
                    const header = dragHandle.closest(".ubits-data-table__column-header");
                    if (header) {
                      header.classList.add("ubits-data-table__column-header--dragging");
                    }
                  }
                }
              },
              true
            );
            element.addEventListener(
              "dragend",
              (e) => {
                const target = e.target;
                const dragHandle = target.closest(".ubits-data-table__column-drag-handle");
                if (dragHandle) {
                  const header = dragHandle.closest(".ubits-data-table__column-header");
                  if (header) {
                    header.classList.remove("ubits-data-table__column-header--dragging");
                  }
                }
                draggedColumnId = null;
              },
              true
            );
            element.addEventListener(
              "dragover",
              (e) => {
                const target = e.target;
                const header = target.closest(".ubits-data-table__column-header");
                if (header && draggedColumnId) {
                  const columnId = header.getAttribute("data-column-id");
                  if (columnId && columnId !== draggedColumnId) {
                    const isTargetCheckbox = columnId === "checkbox" || columnId.startsWith("checkbox-");
                    const isDraggedCheckbox = draggedColumnId === "checkbox" || draggedColumnId.startsWith("checkbox-");
                    if (isTargetCheckbox) {
                      return;
                    }
                    if (!isDraggedCheckbox) {
                      const checkboxColumnIndex = columnOrder.findIndex(
                        (id) => id === "checkbox" || id.startsWith("checkbox-")
                      );
                      if (checkboxColumnIndex !== -1) {
                        const targetIndex = columnOrder.indexOf(columnId);
                        if (targetIndex < checkboxColumnIndex) {
                          return;
                        }
                      }
                    }
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                    header.classList.add("ubits-data-table__column-header--drag-over");
                  }
                }
              },
              true
            );
            element.addEventListener(
              "dragleave",
              (e) => {
                const target = e.target;
                const header = target.closest(".ubits-data-table__column-header");
                if (header) {
                  header.classList.remove("ubits-data-table__column-header--drag-over");
                }
              },
              true
            );
            element.addEventListener(
              "drop",
              (e) => {
                const target = e.target;
                const header = target.closest(".ubits-data-table__column-header");
                if (header) {
                  e.preventDefault();
                  header.classList.remove("ubits-data-table__column-header--drag-over");
                  const columnId = header.getAttribute("data-column-id");
                  if (!columnId || !draggedColumnId) return;
                  const isDraggedCheckbox = draggedColumnId === "checkbox" || draggedColumnId.startsWith("checkbox-");
                  const isTargetCheckbox = columnId === "checkbox" || columnId.startsWith("checkbox-");
                  if (isDraggedCheckbox) {
                    return;
                  }
                  if (isTargetCheckbox) {
                    return;
                  }
                  if (draggedColumnId !== columnId) {
                    const currentIndex = columnOrder.indexOf(draggedColumnId);
                    const targetIndex = columnOrder.indexOf(columnId);
                    const checkboxColumnIndex = columnOrder.findIndex(
                      (id) => id === "checkbox" || id.startsWith("checkbox-")
                    );
                    if (checkboxColumnIndex === -1) {
                      if (currentIndex !== -1 && targetIndex !== -1) {
                        columnOrder.splice(currentIndex, 1);
                        columnOrder.splice(targetIndex, 0, draggedColumnId);
                        if (currentOptions.onColumnReorder) {
                          currentOptions.onColumnReorder([...columnOrder]);
                        }
                        render();
                      }
                      return;
                    }
                    if (targetIndex < checkboxColumnIndex) {
                      return;
                    }
                    if (currentIndex > checkboxColumnIndex && targetIndex < checkboxColumnIndex) {
                      return;
                    }
                    if (currentIndex !== -1 && targetIndex !== -1) {
                      const newOrder = [...columnOrder];
                      newOrder.splice(currentIndex, 1);
                      newOrder.splice(targetIndex, 0, draggedColumnId);
                      const newCheckboxIndex = newOrder.findIndex(
                        (id) => id === "checkbox" || id.startsWith("checkbox-")
                      );
                      if (newCheckboxIndex !== -1 && newCheckboxIndex < checkboxColumnIndex) {
                        return;
                      }
                      columnOrder = newOrder;
                      if (currentOptions.onColumnReorder) {
                        currentOptions.onColumnReorder([...columnOrder]);
                      }
                      render();
                    }
                  }
                }
              },
              true
            );
          }
        }
        if (currentOptions.rowReorderable) {
          if (!element.hasAttribute("data-row-drag-listener")) {
            element.setAttribute("data-row-drag-listener", "true");
            element.addEventListener(
              "dragstart",
              (e) => {
                const target = e.target;
                const dragHandle = target.closest(".ubits-data-table__row-drag-handle");
                if (!dragHandle) return;
                const rowIdStr = dragHandle.getAttribute("data-row-id");
                if (rowIdStr) {
                  const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                  draggedRowId = rowId;
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", String(rowId));
                  const row = dragHandle.closest(".ubits-data-table__row");
                  if (row) {
                    row.classList.add("ubits-data-table__row--dragging");
                  }
                }
              },
              true
            );
            element.addEventListener(
              "dragend",
              (e) => {
                const target = e.target;
                const dragHandle = target.closest(".ubits-data-table__row-drag-handle");
                if (dragHandle) {
                  const row = dragHandle.closest(".ubits-data-table__row");
                  if (row) {
                    row.classList.remove("ubits-data-table__row--dragging");
                  }
                }
                draggedRowId = null;
              },
              true
            );
            element.addEventListener(
              "dragover",
              (e) => {
                const target = e.target;
                const row = target.closest(".ubits-data-table__row");
                if (row && draggedRowId !== null) {
                  const rowIdStr = row.getAttribute("data-row-id");
                  if (rowIdStr) {
                    const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                    if (rowId !== draggedRowId) {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = "move";
                      row.classList.add("ubits-data-table__row--drag-over");
                    }
                  }
                }
              },
              true
            );
            element.addEventListener(
              "dragleave",
              (e) => {
                const target = e.target;
                const row = target.closest(".ubits-data-table__row");
                if (row) {
                  row.classList.remove("ubits-data-table__row--drag-over");
                }
              },
              true
            );
            element.addEventListener(
              "drop",
              (e) => {
                const target = e.target;
                const row = target.closest(".ubits-data-table__row");
                if (row) {
                  e.preventDefault();
                  row.classList.remove("ubits-data-table__row--drag-over");
                  const rowIdStr = row.getAttribute("data-row-id");
                  if (!rowIdStr || !draggedRowId) return;
                  const targetRowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                  const droppedRowId = e.dataTransfer.getData("text/plain");
                  if (droppedRowId && String(targetRowId) !== droppedRowId) {
                    const droppedId = isNaN(Number(droppedRowId)) ? droppedRowId : Number(droppedRowId);
                    const currentIndex = rowOrder.indexOf(droppedId);
                    const targetIndex = rowOrder.indexOf(targetRowId);
                    if (currentIndex !== -1 && targetIndex !== -1) {
                      rowOrder.splice(currentIndex, 1);
                      rowOrder.splice(targetIndex, 0, droppedId);
                      if (currentOptions.onRowReorder) {
                        currentOptions.onRowReorder([...rowOrder]);
                      }
                      render();
                    }
                  }
                }
              },
              true
            );
          }
        }
        let isSelectAllInProgress = false;
        const columnCheckboxHeaders = element.querySelectorAll("input[data-column-checkbox-header]");
        columnCheckboxHeaders.forEach((checkbox, index) => {
          const originalCheckbox = checkbox;
          const columnId = originalCheckbox.getAttribute("data-column-checkbox-header");
          const newCheckbox = originalCheckbox.cloneNode(true);
          newCheckbox.checked = originalCheckbox.checked;
          if (columnId) {
            newCheckbox.setAttribute("data-column-checkbox-header", columnId);
          }
          Array.from(originalCheckbox.attributes).forEach((attr) => {
            if (attr.name !== "data-column-checkbox-header" || !newCheckbox.hasAttribute(attr.name)) {
              newCheckbox.setAttribute(attr.name, attr.value);
            }
          });
          originalCheckbox.parentNode?.replaceChild(newCheckbox, originalCheckbox);
          const selectAllHandler = (e) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
            const input = e.target;
            if (!input.hasAttribute("data-column-checkbox-header")) {
              return;
            }
            const currentColumnId = input.getAttribute("data-column-checkbox-header");
            const isChecked = input.checked;
            const scrollableContainerBefore = element.querySelector(
              ".ubits-data-table__scrollable-container"
            );
            let savedScrollBeforeSelectAll = 0;
            let savedScrollHeightBeforeSelectAll = 0;
            let savedClientHeightBeforeSelectAll = 0;
            if (scrollableContainerBefore) {
              savedScrollBeforeSelectAll = scrollableContainerBefore.scrollTop;
              savedScrollHeightBeforeSelectAll = scrollableContainerBefore.scrollHeight;
              savedClientHeightBeforeSelectAll = scrollableContainerBefore.clientHeight;
            } else {
            }
            currentOptions.rows.forEach((row) => {
              row.data[currentColumnId] = isChecked;
            });
            if (currentColumnId === "checkbox-2") {
              const visibleCheckboxes = element.querySelectorAll(
                `input[data-column-id="${currentColumnId}"][data-row-id]`
              );
              isSelectAllInProgress = true;
              visibleCheckboxes.forEach((cb) => {
                const checkbox2 = cb;
                const rowIdStr = checkbox2.getAttribute("data-row-id");
                if (rowIdStr) {
                  const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                  const row = currentOptions.rows.find((r) => r.id === rowId);
                  if (row) {
                    row.data[currentColumnId] = isChecked;
                  }
                  checkbox2.checked = isChecked;
                  const checkboxContainer = checkbox2.closest(".ubits-checkbox");
                  if (checkboxContainer) {
                    const checkboxSquare = checkboxContainer.querySelector(
                      ".ubits-checkbox__square"
                    );
                    if (isChecked) {
                      checkboxContainer.classList.add("ubits-checkbox--checked");
                      checkboxContainer.classList.remove("ubits-checkbox--indeterminate");
                      if (checkboxSquare) {
                        const indeterminateEl = checkboxSquare.querySelector(
                          ".ubits-checkbox__indeterminate"
                        );
                        if (indeterminateEl) {
                          indeterminateEl.remove();
                        }
                        let checkmarkEl = checkboxSquare.querySelector(
                          ".ubits-checkbox__checkmark"
                        );
                        if (!checkmarkEl) {
                          checkmarkEl = document.createElement("span");
                          checkmarkEl.className = "ubits-checkbox__checkmark";
                          checkboxSquare.appendChild(checkmarkEl);
                        }
                        const originalTransition = checkmarkEl.style.transition;
                        checkmarkEl.style.transition = "none";
                        checkmarkEl.style.setProperty("opacity", "1", "important");
                        checkmarkEl.style.setProperty("transform", "scale(1)", "important");
                        checkmarkEl.style.setProperty("display", "flex", "important");
                        window.getComputedStyle(checkmarkEl).opacity;
                        window.getComputedStyle(checkmarkEl).transform;
                        window.getComputedStyle(checkmarkEl).display;
                        void checkmarkEl.offsetHeight;
                        void checkboxSquare.offsetHeight;
                        void checkboxContainer.offsetHeight;
                        setTimeout(() => {
                          checkmarkEl.style.transition = originalTransition || "";
                        }, 0);
                      }
                    } else {
                      checkboxContainer.classList.remove("ubits-checkbox--checked");
                      checkboxContainer.classList.remove("ubits-checkbox--indeterminate");
                      if (checkboxSquare) {
                        const checkmarkEl = checkboxSquare.querySelector(
                          ".ubits-checkbox__checkmark"
                        );
                        if (checkmarkEl) {
                          checkmarkEl.remove();
                        }
                        const indeterminateEl = checkboxSquare.querySelector(
                          ".ubits-checkbox__indeterminate"
                        );
                        if (indeterminateEl) {
                          indeterminateEl.remove();
                        }
                      }
                    }
                  }
                }
              });
              const allChecked = currentOptions.rows.length > 0 && currentOptions.rows.every((r) => r.data[currentColumnId] === true);
              const someChecked = currentOptions.rows.some((r) => r.data[currentColumnId] === true);
              const isIndeterminate = someChecked && !allChecked;
              const headerCheckbox = input;
              headerCheckbox.checked = allChecked;
              headerCheckbox.indeterminate = isIndeterminate;
              const headerCheckboxContainer = headerCheckbox.closest(
                ".ubits-checkbox"
              );
              if (headerCheckboxContainer) {
                const headerCheckboxSquare = headerCheckboxContainer.querySelector(
                  ".ubits-checkbox__square"
                );
                if (allChecked) {
                  headerCheckboxContainer.classList.add("ubits-checkbox--checked");
                  headerCheckboxContainer.classList.remove("ubits-checkbox--indeterminate");
                  if (headerCheckboxSquare) {
                    const indeterminateEl = headerCheckboxSquare.querySelector(
                      ".ubits-checkbox__indeterminate"
                    );
                    if (indeterminateEl) {
                      indeterminateEl.remove();
                    }
                    headerCheckboxContainer.classList.add("ubits-checkbox--checked");
                    void headerCheckboxContainer.offsetHeight;
                    let checkmarkEl = headerCheckboxSquare.querySelector(
                      ".ubits-checkbox__checkmark"
                    );
                    if (!checkmarkEl) {
                      checkmarkEl = document.createElement("span");
                      checkmarkEl.className = "ubits-checkbox__checkmark";
                      headerCheckboxSquare.appendChild(checkmarkEl);
                    }
                    const originalTransition = checkmarkEl.style.transition;
                    checkmarkEl.style.transition = "none";
                    checkmarkEl.style.setProperty("opacity", "1", "important");
                    checkmarkEl.style.setProperty("transform", "scale(1)", "important");
                    checkmarkEl.style.setProperty("display", "flex", "important");
                    window.getComputedStyle(checkmarkEl).opacity;
                    window.getComputedStyle(checkmarkEl).transform;
                    window.getComputedStyle(checkmarkEl).display;
                    void checkmarkEl.offsetHeight;
                    void headerCheckboxSquare.offsetHeight;
                    void headerCheckboxContainer.offsetHeight;
                    setTimeout(() => {
                      checkmarkEl.style.transition = originalTransition || "";
                    }, 0);
                  }
                } else if (isIndeterminate) {
                  headerCheckboxContainer.classList.remove("ubits-checkbox--checked");
                  headerCheckboxContainer.classList.add("ubits-checkbox--indeterminate");
                  if (headerCheckboxSquare) {
                    const checkmarkEl = headerCheckboxSquare.querySelector(
                      ".ubits-checkbox__checkmark"
                    );
                    if (checkmarkEl) {
                      checkmarkEl.remove();
                    }
                    let indeterminateEl = headerCheckboxSquare.querySelector(
                      ".ubits-checkbox__indeterminate"
                    );
                    if (!indeterminateEl) {
                      indeterminateEl = document.createElement("span");
                      indeterminateEl.className = "ubits-checkbox__indeterminate";
                      headerCheckboxSquare.appendChild(indeterminateEl);
                    }
                    indeterminateEl.style.setProperty("opacity", "1", "important");
                    indeterminateEl.style.setProperty("transform", "scale(1)", "important");
                    indeterminateEl.style.setProperty("display", "flex", "important");
                  }
                } else {
                  headerCheckboxContainer.classList.remove("ubits-checkbox--checked");
                  headerCheckboxContainer.classList.remove("ubits-checkbox--indeterminate");
                  if (headerCheckboxSquare) {
                    const checkmarkEl = headerCheckboxSquare.querySelector(
                      ".ubits-checkbox__checkmark"
                    );
                    if (checkmarkEl) {
                      checkmarkEl.remove();
                    }
                    const indeterminateEl = headerCheckboxSquare.querySelector(
                      ".ubits-checkbox__indeterminate"
                    );
                    if (indeterminateEl) {
                      indeterminateEl.remove();
                    }
                  }
                }
                void headerCheckboxContainer.offsetHeight;
              }
              void element.offsetHeight;
              isSelectAllInProgress = false;
              const optionsWithSelectAll = currentOptions;
              if (optionsWithSelectAll.onSelectAll) {
                const scrollableContainerBeforeCallback = element.querySelector(
                  ".ubits-data-table__scrollable-container"
                );
                const scrollBeforeCallback = scrollableContainerBeforeCallback?.scrollTop || 0;
                const scrollHeightBeforeCallback = scrollableContainerBeforeCallback?.scrollHeight || 0;
                const clientHeightBeforeCallback = scrollableContainerBeforeCallback?.clientHeight || 0;
                try {
                  optionsWithSelectAll.onSelectAll(isChecked);
                } catch (error) {
                  console.error(`☑️ [SELECT ALL] ❌ Error en onSelectAll callback:`, error);
                }
                const scrollableContainerAfterCallback = element.querySelector(
                  ".ubits-data-table__scrollable-container"
                );
                const scrollAfterCallback = scrollableContainerAfterCallback?.scrollTop || 0;
                const scrollHeightAfterCallback = scrollableContainerAfterCallback?.scrollHeight || 0;
                const clientHeightAfterCallback = scrollableContainerAfterCallback?.clientHeight || 0;
                const scrollChanged = Math.abs(scrollAfterCallback - scrollBeforeCallback) > 1;
                const dimensionsChanged = Math.abs(scrollHeightAfterCallback - scrollHeightBeforeCallback) > 1 || Math.abs(clientHeightAfterCallback - clientHeightBeforeCallback) > 1;
                if (scrollChanged || dimensionsChanged) {
                  console.warn(
                    `☑️ [SELECT ALL] ⚠️ El callback onSelectAll parece haber causado cambios:`,
                    {
                      scrollCambió: scrollChanged,
                      scrollAntes: scrollBeforeCallback,
                      scrollDespues: scrollAfterCallback,
                      diferenciaScroll: scrollAfterCallback - scrollBeforeCallback,
                      dimensionesCambiaron: dimensionsChanged,
                      scrollHeightAntes: scrollHeightBeforeCallback,
                      scrollHeightDespues: scrollHeightAfterCallback,
                      clientHeightAntes: clientHeightBeforeCallback,
                      clientHeightDespues: clientHeightAfterCallback
                    }
                  );
                  if (scrollChanged && savedScrollBeforeSelectAll > 0 && scrollableContainerAfterCallback) {
                    scrollableContainerAfterCallback.scrollTop = savedScrollBeforeSelectAll;
                    setTimeout(() => {
                      const finalScroll = scrollableContainerAfterCallback.scrollTop;
                    }, 50);
                  }
                }
              }
              const scrollableContainerFinal = element.querySelector(
                ".ubits-data-table__scrollable-container"
              );
              const scrollFinal = scrollableContainerFinal?.scrollTop || 0;
              const scrollHeightFinal = scrollableContainerFinal?.scrollHeight || 0;
              const clientHeightFinal = scrollableContainerFinal?.clientHeight || 0;
            } else {
              render();
            }
          };
          newCheckbox.addEventListener("change", selectAllHandler, { capture: true });
          const selectAllClickHandler = (e) => {
            const input = e.target;
            return;
          };
          newCheckbox.addEventListener("click", selectAllClickHandler, { capture: true });
        });
        const cellCheckboxes = element.querySelectorAll(
          "input[data-column-id]:not([data-column-checkbox-header])"
        );
        cellCheckboxes.forEach((checkbox) => {
          const originalCheckbox = checkbox;
          const rowIdStr = originalCheckbox.getAttribute("data-row-id");
          const columnId = originalCheckbox.getAttribute("data-column-id");
          const newCheckbox = originalCheckbox.cloneNode(true);
          newCheckbox.checked = originalCheckbox.checked;
          originalCheckbox.parentNode?.replaceChild(newCheckbox, originalCheckbox);
          const checkboxIndividualHandler = (e) => {
            console.log(
              "🔵 [DATA TABLE CHECKBOX HANDLER] ========== CHECKBOX CHANGE EVENT =========="
            );
            console.log("🔵 [DATA TABLE CHECKBOX HANDLER] Event type:", e.type);
            console.log("🔵 [DATA TABLE CHECKBOX HANDLER] Event target:", e.target);
            const input = e.target;
            console.log("🔵 [DATA TABLE CHECKBOX HANDLER] Input element:", input);
            console.log("🔵 [DATA TABLE CHECKBOX HANDLER] Input checked:", input?.checked);
            console.log(
              "🔵 [DATA TABLE CHECKBOX HANDLER] Input data-row-id:",
              input?.getAttribute("data-row-id")
            );
            console.log(
              "🔵 [DATA TABLE CHECKBOX HANDLER] Input data-column-id:",
              input?.getAttribute("data-column-id")
            );
            console.log(
              "🔵 [DATA TABLE CHECKBOX HANDLER] Input has data-column-checkbox-header:",
              input?.hasAttribute("data-column-checkbox-header")
            );
            if (input.hasAttribute("data-column-checkbox-header")) {
              console.log("🔵 [DATA TABLE CHECKBOX HANDLER] ⚠️ Es checkbox del header, ignorando...");
              e.stopPropagation();
              e.stopImmediatePropagation();
              return;
            }
            if (isSelectAllInProgress) {
              console.log("🔵 [DATA TABLE CHECKBOX HANDLER] ⚠️ Select all en progreso, ignorando...");
              return;
            }
            const currentRowIdStr = input.getAttribute("data-row-id");
            const currentColumnId = input.getAttribute("data-column-id");
            console.log("🔵 [DATA TABLE CHECKBOX HANDLER] currentRowIdStr:", currentRowIdStr);
            console.log("🔵 [DATA TABLE CHECKBOX HANDLER] currentColumnId:", currentColumnId);
            if (!currentRowIdStr || !currentColumnId) {
              console.warn(
                "⚠️ [DATA TABLE CHECKBOX HANDLER] No tiene data-row-id o data-column-id, ignorando..."
              );
              return;
            }
            const rowId = isNaN(Number(currentRowIdStr)) ? currentRowIdStr : Number(currentRowIdStr);
            const isChecked = input.checked;
            console.log("🔵 [DATA TABLE CHECKBOX HANDLER] rowId procesado:", rowId);
            console.log("🔵 [DATA TABLE CHECKBOX HANDLER] isChecked:", isChecked);
            const row = currentOptions.rows.find((r) => r.id === rowId);
            if (row) {
              row.data[currentColumnId] = isChecked;
              if (currentColumnId === "checkbox-2") {
                let checkboxContainer = input.closest(".ubits-checkbox");
                if (checkboxContainer) {
                  const containerInput = checkboxContainer.querySelector(
                    `input[data-row-id="${rowId}"][data-column-id="${currentColumnId}"]`
                  );
                  if (!containerInput || containerInput !== input) {
                    const correctInput = element.querySelector(
                      `input[data-row-id="${rowId}"][data-column-id="${currentColumnId}"]`
                    );
                    if (correctInput) {
                      checkboxContainer = correctInput.closest(".ubits-checkbox");
                    }
                  } else {
                  }
                }
                if (checkboxContainer) {
                  const checkboxSquare = checkboxContainer.querySelector(
                    ".ubits-checkbox__square"
                  );
                  if (isChecked) {
                    checkboxContainer.classList.add("ubits-checkbox--checked");
                    checkboxContainer.classList.remove("ubits-checkbox--indeterminate");
                    if (checkboxSquare) {
                      const indeterminateEl = checkboxSquare.querySelector(
                        ".ubits-checkbox__indeterminate"
                      );
                      if (indeterminateEl) {
                        indeterminateEl.remove();
                      }
                      checkboxContainer.classList.add("ubits-checkbox--checked");
                      checkboxContainer.classList.remove("ubits-checkbox--indeterminate");
                      void checkboxContainer.offsetHeight;
                      let checkmarkEl = checkboxSquare.querySelector(
                        ".ubits-checkbox__checkmark"
                      );
                      if (!checkmarkEl) {
                        checkmarkEl = document.createElement("span");
                        checkmarkEl.className = "ubits-checkbox__checkmark";
                        checkboxSquare.appendChild(checkmarkEl);
                      } else {
                      }
                      const originalTransition = checkmarkEl.style.transition;
                      checkmarkEl.style.transition = "none";
                      checkmarkEl.style.setProperty("opacity", "1", "important");
                      checkmarkEl.style.setProperty("transform", "scale(1)", "important");
                      checkmarkEl.style.setProperty("display", "flex", "important");
                      window.getComputedStyle(checkmarkEl).opacity;
                      window.getComputedStyle(checkmarkEl).transform;
                      window.getComputedStyle(checkmarkEl).display;
                      void checkmarkEl.offsetHeight;
                      void checkboxSquare.offsetHeight;
                      void checkboxContainer.offsetHeight;
                      setTimeout(() => {
                        checkmarkEl.style.transition = originalTransition || "";
                      }, 0);
                      requestAnimationFrame(() => {
                        const verifyCheckmark = checkboxSquare.querySelector(
                          ".ubits-checkbox__checkmark"
                        );
                        if (verifyCheckmark) {
                          const computedStyles = window.getComputedStyle(verifyCheckmark);
                          const afterStyles = window.getComputedStyle(verifyCheckmark, "::after");
                          if (computedStyles.opacity === "0" || computedStyles.transform.includes("scale(0)")) {
                            verifyCheckmark.style.setProperty("opacity", "1", "important");
                            verifyCheckmark.style.setProperty("transform", "scale(1)", "important");
                            verifyCheckmark.style.setProperty("display", "flex", "important");
                            void verifyCheckmark.offsetHeight;
                          }
                        } else {
                        }
                      });
                    } else {
                    }
                  } else {
                    checkboxContainer.classList.remove("ubits-checkbox--checked");
                    checkboxContainer.classList.remove("ubits-checkbox--indeterminate");
                    if (checkboxSquare) {
                      const checkmarkEl = checkboxSquare.querySelector(".ubits-checkbox__checkmark");
                      if (checkmarkEl) {
                        checkmarkEl.remove();
                      }
                      const indeterminateEl = checkboxSquare.querySelector(
                        ".ubits-checkbox__indeterminate"
                      );
                      if (indeterminateEl) {
                        indeterminateEl.remove();
                      }
                    }
                  }
                } else {
                  const allCheckboxes = element.querySelectorAll(
                    `input[data-row-id="${rowId}"][data-column-id="${columnId}"]`
                  );
                  if (allCheckboxes.length > 0) {
                    const correctInput = Array.from(allCheckboxes).find((cb) => cb === input) || allCheckboxes[0];
                    const correctContainer = correctInput?.closest(".ubits-checkbox");
                    if (correctContainer) {
                      const checkboxSquare = correctContainer.querySelector(
                        ".ubits-checkbox__square"
                      );
                      if (isChecked) {
                        correctContainer.classList.add("ubits-checkbox--checked");
                        correctContainer.classList.remove("ubits-checkbox--indeterminate");
                        if (checkboxSquare) {
                          const indeterminateEl = checkboxSquare.querySelector(
                            ".ubits-checkbox__indeterminate"
                          );
                          if (indeterminateEl) {
                            indeterminateEl.remove();
                          }
                          let checkmarkEl = checkboxSquare.querySelector(
                            ".ubits-checkbox__checkmark"
                          );
                          if (!checkmarkEl) {
                            checkmarkEl = document.createElement("span");
                            checkmarkEl.className = "ubits-checkbox__checkmark";
                            checkboxSquare.appendChild(checkmarkEl);
                          }
                        }
                      } else {
                        correctContainer.classList.remove("ubits-checkbox--checked");
                        correctContainer.classList.remove("ubits-checkbox--indeterminate");
                        if (checkboxSquare) {
                          const checkmarkEl = checkboxSquare.querySelector(
                            ".ubits-checkbox__checkmark"
                          );
                          if (checkmarkEl) {
                            checkmarkEl.remove();
                          }
                        }
                      }
                    }
                  }
                }
                const headerCheckbox = element.querySelector(
                  `input[data-column-checkbox-header="${columnId}"]`
                );
                if (headerCheckbox) {
                  const allChecked = currentOptions.rows.length > 0 && currentOptions.rows.every((r) => r.data[columnId] === true);
                  const someChecked = currentOptions.rows.some((r) => r.data[columnId] === true);
                  const isIndeterminate = someChecked && !allChecked;
                  headerCheckbox.checked = allChecked;
                  headerCheckbox.indeterminate = isIndeterminate;
                  const headerCheckboxContainer = headerCheckbox.closest(
                    ".ubits-checkbox"
                  );
                  if (headerCheckboxContainer) {
                    const headerCheckboxSquare = headerCheckboxContainer.querySelector(
                      ".ubits-checkbox__square"
                    );
                    if (allChecked) {
                      headerCheckboxContainer.classList.add("ubits-checkbox--checked");
                      headerCheckboxContainer.classList.remove("ubits-checkbox--indeterminate");
                      if (headerCheckboxSquare) {
                        const indeterminateEl = headerCheckboxSquare.querySelector(
                          ".ubits-checkbox__indeterminate"
                        );
                        if (indeterminateEl) {
                          indeterminateEl.remove();
                        }
                        let checkmarkEl = headerCheckboxSquare.querySelector(
                          ".ubits-checkbox__checkmark"
                        );
                        if (!checkmarkEl) {
                          checkmarkEl = document.createElement("span");
                          checkmarkEl.className = "ubits-checkbox__checkmark";
                          headerCheckboxSquare.appendChild(checkmarkEl);
                        }
                      }
                    } else if (isIndeterminate) {
                      headerCheckboxContainer.classList.remove("ubits-checkbox--checked");
                      headerCheckboxContainer.classList.add("ubits-checkbox--indeterminate");
                      if (headerCheckboxSquare) {
                        const checkmarkEl = headerCheckboxSquare.querySelector(
                          ".ubits-checkbox__checkmark"
                        );
                        if (checkmarkEl) {
                          checkmarkEl.remove();
                        }
                        let indeterminateEl = headerCheckboxSquare.querySelector(
                          ".ubits-checkbox__indeterminate"
                        );
                        if (!indeterminateEl) {
                          indeterminateEl = document.createElement("span");
                          indeterminateEl.className = "ubits-checkbox__indeterminate";
                          headerCheckboxSquare.appendChild(indeterminateEl);
                        }
                      }
                    } else {
                      headerCheckboxContainer.classList.remove("ubits-checkbox--checked");
                      headerCheckboxContainer.classList.remove("ubits-checkbox--indeterminate");
                      if (headerCheckboxSquare) {
                        const checkmarkEl = headerCheckboxSquare.querySelector(
                          ".ubits-checkbox__checkmark"
                        );
                        if (checkmarkEl) {
                          checkmarkEl.remove();
                        }
                        const indeterminateEl = headerCheckboxSquare.querySelector(
                          ".ubits-checkbox__indeterminate"
                        );
                        if (indeterminateEl) {
                          indeterminateEl.remove();
                        }
                      }
                    }
                  }
                }
                const rowElement = newCheckbox.closest(".ubits-data-table__row");
                if (rowElement) {
                  const beforeClasses = Array.from(rowElement.classList);
                  const computedStyleBefore = window.getComputedStyle(rowElement);
                  const bgBefore = computedStyleBefore.backgroundColor;
                  const cells = rowElement.querySelectorAll(".ubits-data-table__cell");
                  const originalPointerEvents = rowElement.style.pointerEvents;
                  rowElement.style.pointerEvents = "none";
                  void rowElement.offsetHeight;
                  const currentTheme = document.body.getAttribute("data-theme") || document.documentElement.getAttribute("data-theme") || "light";
                  const bgTokenName = currentTheme === "dark" ? "--modifiers-normal-color-dark-bg-1" : "--modifiers-normal-color-light-bg-1";
                  const bg1Value = getComputedStyle(document.documentElement).getPropertyValue(bgTokenName).trim();
                  rowElement.classList.add("ubits-data-table__row--clear-hover");
                  rowElement.style.setProperty("background-color", bg1Value, "important");
                  cells.forEach((cell, index) => {
                    cell.style.setProperty(
                      "background-color",
                      bg1Value,
                      "important"
                    );
                  });
                  void rowElement.offsetHeight;
                  rowElement.style.pointerEvents = originalPointerEvents || "";
                  const computedStyleAfter = window.getComputedStyle(rowElement);
                  const bgAfter = computedStyleAfter.backgroundColor;
                  const afterClasses = Array.from(rowElement.classList);
                  cells.forEach((cell, index) => {
                    const cellStyle = window.getComputedStyle(cell);
                    const cellBg = cellStyle.backgroundColor;
                  });
                  requestAnimationFrame(() => {
                    setTimeout(() => {
                      const beforeRemove = window.getComputedStyle(rowElement).backgroundColor;
                      rowElement.classList.remove("ubits-data-table__row--clear-hover");
                      rowElement.style.removeProperty("background-color");
                      cells.forEach((cell) => {
                        cell.style.removeProperty("background-color");
                      });
                      const afterRemove = window.getComputedStyle(rowElement).backgroundColor;
                    }, 150);
                  });
                } else {
                }
                console.log(
                  "🔵 [DATA TABLE CHECKBOX] ========== VERIFICACIÓN ANTES DE LLAMAR CALLBACK =========="
                );
                console.log("🔵 [DATA TABLE CHECKBOX] rowId:", rowId);
                console.log("🔵 [DATA TABLE CHECKBOX] isChecked:", isChecked);
                console.log("🔵 [DATA TABLE CHECKBOX] currentOptions existe:", !!currentOptions);
                console.log(
                  "🔵 [DATA TABLE CHECKBOX] currentOptions.onRowSelect existe:",
                  !!currentOptions?.onRowSelect
                );
                console.log(
                  "🔵 [DATA TABLE CHECKBOX] Tipo de onRowSelect:",
                  typeof currentOptions?.onRowSelect
                );
                if (currentOptions.onRowSelect) {
                  console.log(
                    "🔵 [DATA TABLE] ✅ Llamando onRowSelect con rowId:",
                    rowId,
                    "isChecked:",
                    isChecked
                  );
                  try {
                    currentOptions.onRowSelect(rowId, isChecked);
                    console.log("🔵 [DATA TABLE] ✅ onRowSelect ejecutado correctamente");
                  } catch (error) {
                    console.error("❌ [DATA TABLE] Error al ejecutar onRowSelect:", error);
                  }
                } else {
                  console.warn("⚠️ [DATA TABLE] onRowSelect no está definido en currentOptions");
                  console.warn(
                    "⚠️ [DATA TABLE] currentOptions keys:",
                    Object.keys(currentOptions || {})
                  );
                }
                console.log("🔵 [DATA TABLE CHECKBOX] ========== FIN VERIFICACIÓN ==========");
              } else {
                render();
              }
            }
          };
          newCheckbox.addEventListener("change", checkboxIndividualHandler, { capture: false });
        });
        const expandButtons = element.querySelectorAll('[data-expand-button="true"]');
        expandButtons.forEach((button, index) => {
          const newButton = button.cloneNode(true);
          button.parentNode?.replaceChild(newButton, button);
          newButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const rowIdStr = newButton.getAttribute("data-row-id");
            const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
            const row = currentOptions.rows.find((r) => r.id === rowId);
            if (row) {
              const wasExpanded = row.expanded || false;
              row.expanded = !wasExpanded;
              if (currentOptions.onRowExpand) {
                currentOptions.onRowExpand(rowId, row.expanded);
              }
              render();
              if (row.expanded) {
                requestAnimationFrame(() => {
                  const rowElement = element.querySelector(`[data-row-id="${rowId}"]`);
                  if (rowElement) {
                    const expandedRow = rowElement.nextElementSibling;
                    if (expandedRow && expandedRow.classList.contains("ubits-data-table__row-expanded-row")) {
                      const scrollableContainer = element.querySelector(
                        ".ubits-data-table__scrollable-container--vertical"
                      );
                      if (scrollableContainer) {
                        const rowTop = rowElement.offsetTop;
                        scrollableContainer.scrollTop = rowTop - 50;
                      } else {
                        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
                      }
                    }
                  }
                });
              }
            } else {
              console.warn("🔘 [EXPAND] ⚠️ Fila no encontrada para rowId:", rowId);
            }
          });
        });
        const sortButtons = element.querySelectorAll('[data-sort-button="true"]');
        sortButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const columnId = button.getAttribute("data-column-id");
            if (sortColumnId === columnId) {
              sortDirection = sortDirection === "asc" ? "desc" : "asc";
            } else {
              sortColumnId = columnId;
              sortDirection = "asc";
            }
            if (currentOptions.onSort) {
              console.log(
                "🔵 [DATA TABLE] Llamando onSort con columnId:",
                columnId,
                "direction:",
                sortDirection
              );
              currentOptions.onSort(columnId, sortDirection);
            } else {
              console.warn("⚠️ [DATA TABLE] onSort no está definido");
            }
            render();
          });
        });
        const menuButtons = element.querySelectorAll('[data-menu-button="true"]');
        menuButtons.forEach((button) => {
          const btn = button;
          const columnId = btn.getAttribute("data-column-id");
          if (!columnId) {
            return;
          }
          const column = currentOptions.columns.find((col) => col.id === columnId);
          if (!column) {
            return;
          }
          const headerCell = btn.closest("th");
          if (!headerCell) {
            console.warn("⚠️ [MENU BUTTON] No se encontró el header cell");
            return;
          }
          const isPinned = headerCell.hasAttribute("data-pinned") && headerCell.getAttribute("data-pinned") === "true";
          const hasStickyClass = headerCell.classList.contains(
            "ubits-data-table__column-header--pinned"
          );
          const isWeb3 = typeof window !== "undefined" && !window.location?.href?.includes("storybook");
          let dropdown;
          let dropdownContainer = null;
          if (isPinned || hasStickyClass) {
            const tableElement = element.querySelector(".ubits-data-table");
            const rootContainer = tableElement?.closest(".ubits-data-table__scrollable-container") || element;
            dropdown = rootContainer.querySelector(
              `.ubits-data-table__column-menu-dropdown[data-column-id="${columnId}"]`
            );
            if (!dropdown) {
              dropdown = document.createElement("div");
              dropdown.className = "ubits-data-table__column-menu-dropdown";
              dropdown.setAttribute("data-column-id", columnId);
              dropdown.style.cssText = `
            position: fixed;
            z-index: 10000 !important;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `;
              rootContainer.appendChild(dropdown);
            }
          } else {
            dropdown = headerCell.querySelector(
              ".ubits-data-table__column-menu-dropdown"
            );
            if (!dropdown) {
              dropdown = document.createElement("div");
              dropdown.className = "ubits-data-table__column-menu-dropdown";
              dropdown.setAttribute("data-column-id", columnId);
              dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000 !important;
            margin-top: 4px;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `;
              headerCell.style.position = "relative";
              headerCell.appendChild(dropdown);
            }
          }
          let isOpen = false;
          const closeDropdown = () => {
            if (dropdown) {
              dropdown.style.display = "none";
            }
            isOpen = false;
            if (handleOutsideClickRef) {
              document.removeEventListener("click", handleOutsideClickRef);
              handleOutsideClickRef = null;
            }
            if ((isPinned || hasStickyClass) && dropdown.parentElement && dropdown.parentElement !== headerCell) {
              dropdown.remove();
            }
          };
          let handleOutsideClickRef = null;
          btn.addEventListener("click", (e) => {
            const isWeb4 = typeof window !== "undefined" && window.location && !window.location.href.includes("storybook");
            e.preventDefault();
            e.stopPropagation();
            const currentColumn = currentOptions.columns.find((col) => col.id === columnId);
            if (!currentColumn) {
              console.error("❌ [COLUMN MENU] Columna no encontrada:", columnId);
              return;
            }
            const isPinned2 = currentColumn.pinned || false;
            if (isOpen) {
              closeDropdown();
              return;
            }
            element.querySelectorAll(".ubits-data-table__column-menu-dropdown").forEach((dd) => {
              if (dd !== dropdown) {
                dd.style.display = "none";
              }
            });
            const listItems = [
              {
                label: isPinned2 ? "Desfijar columna" : "Fijar columna",
                value: "pin",
                state: "default"
              }
            ];
            dropdown.innerHTML = "";
            const listId = `column-menu-list-${columnId}-${Math.random().toString(36).substr(2, 9)}`;
            dropdown.id = listId;
            try {
              const listElement = createList({
                containerId: listId,
                items: listItems,
                size: "sm",
                maxHeight: "200px",
                onSelectionChange: (selectedItem, index) => {
                  if (selectedItem && selectedItem.value === "pin") {
                    const column2 = currentOptions.columns.find((col) => col.id === columnId);
                    if (column2) {
                      const oldPinned = column2.pinned || false;
                      column2.pinned = !oldPinned;
                      if (currentOptions.onColumnPin) {
                        console.log(
                          "🔵 [DATA TABLE] Llamando onColumnPin con columnId:",
                          columnId,
                          "pinned:",
                          column2.pinned
                        );
                        currentOptions.onColumnPin(columnId, column2.pinned);
                      } else {
                        console.warn("⚠️ [DATA TABLE] onColumnPin no está definido");
                      }
                      render();
                    } else {
                      console.error(
                        "❌ [COLUMN MENU] Columna no encontrada al intentar fijar:",
                        columnId
                      );
                    }
                  }
                  closeDropdown();
                }
              });
            } catch (error) {
              console.error("❌ [COLUMN MENU] Error al crear lista con createList:", error);
              const listHTML = renderList({
                items: listItems,
                size: "sm",
                maxHeight: "200px"
              });
              dropdown.innerHTML = listHTML;
              const listItemsElements = dropdown.querySelectorAll(".ubits-list-item");
              listItemsElements.forEach((itemEl) => {
                itemEl.addEventListener("click", () => {
                  const column2 = currentOptions.columns.find((col) => col.id === columnId);
                  if (column2) {
                    const oldPinned = column2.pinned || false;
                    column2.pinned = !oldPinned;
                    if (currentOptions.onColumnPin) {
                      currentOptions.onColumnPin(columnId, column2.pinned);
                    }
                    render();
                  }
                  closeDropdown();
                });
              });
            }
            const isCurrentlyPinned = headerCell.hasAttribute("data-pinned") && headerCell.getAttribute("data-pinned") === "true";
            const hasStickyClassNow = headerCell.classList.contains(
              "ubits-data-table__column-header--pinned"
            );
            const dropdownZIndex = isCurrentlyPinned || hasStickyClassNow ? 1e4 : 1e3;
            const btnRect = btn.getBoundingClientRect();
            const headerCellRect = headerCell.getBoundingClientRect();
            if (isCurrentlyPinned || hasStickyClassNow) {
              dropdown.style.setProperty("position", "fixed", "important");
              dropdown.style.setProperty("top", `${btnRect.bottom + 4}px`, "important");
              const calculatedLeft = btnRect.right - 160;
              dropdown.style.setProperty("left", `${calculatedLeft}px`, "important");
              dropdown.style.setProperty("right", "auto", "important");
              dropdown.style.setProperty("z-index", `${dropdownZIndex}`, "important");
              dropdown.style.setProperty("display", "block", "important");
            } else {
              dropdown.style.position = "absolute";
              dropdown.style.top = "100%";
              dropdown.style.right = "0";
              dropdown.style.left = "auto";
              dropdown.style.zIndex = `${dropdownZIndex}`;
              dropdown.style.setProperty("z-index", `${dropdownZIndex}`, "important");
              dropdown.style.display = "block";
            }
            isOpen = true;
            handleOutsideClickRef = (e2) => {
              if (!dropdown.contains(e2.target) && !btn.contains(e2.target)) {
                closeDropdown();
              }
            };
            setTimeout(() => {
              document.addEventListener("click", handleOutsideClickRef);
            }, 0);
          });
        });
        const actionButtons = element.querySelectorAll(".ubits-data-table__action-button");
        actionButtons.forEach((button) => {
          const btn = button;
          const rowIdStr = btn.getAttribute("data-row-id");
          const columnId = btn.getAttribute("data-column-id");
          if (!rowIdStr) {
            console.warn("⚠️ [ACTION BUTTONS] No se encontró el data-row-id en el botón");
            return;
          }
          const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
          const newButton = btn.cloneNode(true);
          btn.parentNode?.replaceChild(newButton, btn);
          newButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const row = currentOptions.rows.find((r) => r.id === rowId);
            if (row) {
              if (currentOptions.onRowAction) {
                currentOptions.onRowAction(rowId, row);
              } else {
                alert(`Acción ejecutada para fila: ${rowId}`);
              }
            } else {
              console.warn("⚠️ [ACTION BUTTONS] Fila no encontrada para rowId:", rowId);
            }
          });
        });
        const showContextMenuValue = currentOptions.showContextMenu !== false;
        if (showContextMenuValue) {
          const tableRows = element.querySelectorAll("tr.ubits-data-table__row[data-row-id]");
          if (tableRows.length === 0) {
            console.warn(
              "🖱️ [CONTEXT MENU] ⚠️ No se encontraron filas con selector: tr.ubits-data-table__row[data-row-id]"
            );
            const altRows = element.querySelectorAll("[data-row-id]");
            if (altRows.length > 0) {
              altRows.forEach((rowElement, index) => {
                const row = rowElement;
                const rowIdStr = row.getAttribute("data-row-id");
                if (!rowIdStr) {
                  console.warn("🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:", index);
                  return;
                }
                const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                const contextMenuContainer2 = document.getElementById("ubits-data-table-context-menu") || (() => {
                  const container2 = document.createElement("div");
                  container2.id = "ubits-data-table-context-menu";
                  container2.style.cssText = `
                position: fixed;
                z-index: 10000;
                display: none;
                background-color: var(--modifiers-normal-color-light-bg-1);
                border: 1px solid var(--modifiers-normal-color-light-border-1);
                border-radius: var(--ubits-border-radius-md);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                min-width: 200px;
                max-width: 300px;
              `;
                  document.body.appendChild(container2);
                  return container2;
                })();
                row.addEventListener("contextmenu", (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert(
                    `Click derecho en fila ${rowId} - Menú contextual (implementación completa pendiente)`
                  );
                });
              });
              return;
            }
          } else {
          }
          let contextMenuContainer = document.getElementById(
            "ubits-data-table-context-menu"
          );
          if (!contextMenuContainer) {
            contextMenuContainer = document.createElement("div");
            contextMenuContainer.id = "ubits-data-table-context-menu";
            contextMenuContainer.style.cssText = `
          position: fixed;
          z-index: 10000;
          display: none;
          background-color: var(--modifiers-normal-color-light-bg-1);
          border: 1px solid var(--modifiers-normal-color-light-border-1);
          border-radius: var(--ubits-border-radius-md, 8px);
          box-shadow: var(--ubits-elevation-2, 0 4px 6px rgba(0, 0, 0, 0.1));
          min-width: 200px;
          max-width: 300px;
        `;
            document.body.appendChild(contextMenuContainer);
          }
          let currentContextMenuRowId = null;
          let handleContextMenuOutsideClick = null;
          const closeContextMenu = () => {
            if (contextMenuContainer) {
              contextMenuContainer.style.display = "none";
              contextMenuContainer.innerHTML = "";
            }
            currentContextMenuRowId = null;
            if (handleContextMenuOutsideClick) {
              document.removeEventListener("click", handleContextMenuOutsideClick);
              document.removeEventListener("contextmenu", handleContextMenuOutsideClick);
              handleContextMenuOutsideClick = null;
            }
          };
          tableRows.forEach((rowElement, index) => {
            const row = rowElement;
            const rowIdStr = row.getAttribute("data-row-id");
            if (!rowIdStr) {
              console.warn("🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:", index);
              return;
            }
            const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
            row.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              e.stopPropagation();
              const rowData = currentOptions.rows.find((r) => r.id === rowId);
              if (!rowData) {
                console.warn("🖱️ [CONTEXT MENU] ⚠️ Fila no encontrada en currentOptions.rows:", rowId);
                return;
              }
              currentContextMenuRowId = rowId;
              closeContextMenu();
              const createLabelWithIcon = (icon, text) => {
                return `<div style="display: flex; align-items: center; gap: var(--ubits-spacing-xs);">
            <i class="far fa-${icon}" style="font-size: 14px; width: 16px; text-align: center;"></i>
            <span>${text}</span>
          </div>`;
              };
              const menuItems = [
                {
                  label: createLabelWithIcon("eye", "Ver seleccionados"),
                  value: "view-selected",
                  state: "default",
                  onClick: () => {
                    closeContextMenu();
                  }
                },
                {
                  label: createLabelWithIcon("bell", "Notificaciones"),
                  value: "notifications",
                  state: "default",
                  onClick: () => {
                    closeContextMenu();
                    alert(`Notificaciones para fila: ${rowId}`);
                  }
                },
                {
                  label: createLabelWithIcon("copy", "Copiar"),
                  value: "copy",
                  state: "default",
                  onClick: () => {
                    closeContextMenu();
                    alert(`Copiar para fila: ${rowId}`);
                  }
                },
                {
                  label: createLabelWithIcon("eye", "Ver"),
                  value: "view",
                  state: "default",
                  onClick: () => {
                    closeContextMenu();
                    alert(`Ver para fila: ${rowId}`);
                  }
                },
                {
                  label: createLabelWithIcon("edit", "Editar"),
                  value: "edit",
                  state: "default",
                  onClick: () => {
                    closeContextMenu();
                    alert(`Editar para fila: ${rowId}`);
                  }
                },
                {
                  label: createLabelWithIcon("download", "Descargar"),
                  value: "download",
                  state: "default",
                  onClick: () => {
                    closeContextMenu();
                    alert(`Descargar para fila: ${rowId}`);
                  }
                },
                {
                  label: createLabelWithIcon("trash", "Eliminar"),
                  value: "delete",
                  state: "default",
                  onClick: () => {
                    closeContextMenu();
                    alert(`Eliminar para fila: ${rowId}`);
                  }
                }
              ];
              const menuId = `context-menu-list-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              if (!contextMenuContainer) {
                console.error("🖱️ [CONTEXT MENU] ❌ contextMenuContainer es null!");
                return;
              }
              const listContainer = document.createElement("div");
              listContainer.id = menuId;
              contextMenuContainer.innerHTML = "";
              contextMenuContainer.appendChild(listContainer);
              try {
                const listElement = createList({
                  containerId: menuId,
                  items: menuItems,
                  size: "sm",
                  maxHeight: "400px",
                  onSelectionChange: (item, index2) => {
                    if (item && item.onClick) {
                      item.onClick();
                    }
                  }
                });
                const x = e.clientX;
                const y = e.clientY;
                contextMenuContainer.style.left = `${x}px`;
                contextMenuContainer.style.top = `${y}px`;
                contextMenuContainer.style.display = "block";
                requestAnimationFrame(() => {
                  const rect = contextMenuContainer.getBoundingClientRect();
                  const windowWidth = window.innerWidth;
                  const windowHeight = window.innerHeight;
                  if (rect.right > windowWidth) {
                    contextMenuContainer.style.left = `${windowWidth - rect.width - 10}px`;
                  }
                  if (rect.bottom > windowHeight) {
                    contextMenuContainer.style.top = `${windowHeight - rect.height - 10}px`;
                  }
                });
                handleContextMenuOutsideClick = (e2) => {
                  if (!contextMenuContainer.contains(e2.target)) {
                    closeContextMenu();
                  }
                };
                setTimeout(() => {
                  document.addEventListener("click", handleContextMenuOutsideClick);
                  document.addEventListener("contextmenu", handleContextMenuOutsideClick);
                }, 0);
              } catch (error) {
                console.error("🖱️ [CONTEXT MENU] ❌ Error al crear menú contextual:", error);
                console.error(
                  "🖱️ [CONTEXT MENU] Stack:",
                  error instanceof Error ? error.stack : "N/A"
                );
                const listHTML = renderList({
                  items: menuItems,
                  size: "sm",
                  maxHeight: "400px"
                });
                listContainer.innerHTML = listHTML;
                const listItems = listContainer.querySelectorAll(".ubits-list-item");
                listItems.forEach((itemEl, index2) => {
                  const item = menuItems[index2];
                  if (item && item.onClick) {
                    itemEl.addEventListener("click", () => {
                      item.onClick();
                    });
                  }
                });
                const x = e.clientX;
                const y = e.clientY;
                contextMenuContainer.style.left = `${x}px`;
                contextMenuContainer.style.top = `${y}px`;
                contextMenuContainer.style.display = "block";
                requestAnimationFrame(() => {
                  const rect = contextMenuContainer.getBoundingClientRect();
                  const windowWidth = window.innerWidth;
                  const windowHeight = window.innerHeight;
                  if (rect.right > windowWidth) {
                    contextMenuContainer.style.left = `${windowWidth - rect.width - 10}px`;
                  }
                  if (rect.bottom > windowHeight) {
                    contextMenuContainer.style.top = `${windowHeight - rect.height - 10}px`;
                  }
                });
                handleContextMenuOutsideClick = (e2) => {
                  if (!contextMenuContainer.contains(e2.target)) {
                    closeContextMenu();
                  }
                };
                setTimeout(() => {
                  document.addEventListener("click", handleContextMenuOutsideClick);
                  document.addEventListener("contextmenu", handleContextMenuOutsideClick);
                }, 0);
              }
            });
          });
        } else {
        }
        const editableFields = element.querySelectorAll('[data-editable-text="true"]');
        editableFields.forEach((field) => {
          const cell = field.closest('[data-editable="true"]');
          if (!cell) return;
          const rowIdStr = cell.getAttribute("data-row-id");
          const columnId = cell.getAttribute("data-column-id");
          if (!rowIdStr || !columnId) return;
          const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
          field.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              field.blur();
            }
          });
          field.addEventListener("blur", (e) => {
            e.stopPropagation();
            const newValue = field.textContent || "";
            const row = currentOptions.rows.find((r) => r.id === rowId);
            if (row) {
              const col = currentOptions.columns.find((c) => c.id === columnId);
              if (col && (col.type === "nombre" || col.type === "nombre-avatar")) {
                row.data.nombre = newValue.trim();
                if (row.data[columnId] !== void 0) {
                  row.data[columnId] = newValue.trim();
                }
              } else if (col && col.type === "estado") {
                row.data[columnId] = newValue.trim();
                row.data.estado = newValue.trim();
                row.data.status = newValue.trim();
              } else {
                row.data[columnId] = newValue.trim();
              }
            }
          });
          field.addEventListener("dblclick", (e) => {
            e.stopPropagation();
          });
          field.addEventListener("click", (e) => {
            e.stopPropagation();
          });
        });
        const statusEditables = element.querySelectorAll(".ubits-data-table__status-editable");
        statusEditables.forEach((container2) => {
          const rowIdStr = container2.getAttribute("data-row-id");
          const columnId = container2.getAttribute("data-column-id");
          const currentStatus = container2.getAttribute("data-current-status");
          if (!rowIdStr || !columnId) return;
          const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
          const statusTag = container2.querySelector(".ubits-status-tag");
          const dropdown = container2.querySelector(
            ".ubits-data-table__status-dropdown"
          );
          if (!statusTag || !dropdown) return;
          const statusOptions = [
            { value: "active", label: "Activo", status: "active" },
            { value: "completed", label: "Completado", status: "completed" },
            { value: "published", label: "Publicado", status: "published" },
            { value: "fulfilled", label: "Cumplido", status: "fulfilled" },
            { value: "created", label: "Creado", status: "created" },
            { value: "not-fulfilled", label: "No cumplido", status: "not-fulfilled" },
            { value: "denied", label: "Denegado", status: "denied" },
            { value: "draft", label: "Borrador", status: "draft" },
            { value: "in-progress", label: "En progreso", status: "in-progress" },
            { value: "syncing", label: "Sincronizando", status: "syncing" },
            { value: "pending", label: "Pendiente", status: "pending" },
            { value: "pending-approval", label: "Pendiente aprobación", status: "pending-approval" },
            { value: "not-started", label: "No iniciado", status: "not-started" },
            { value: "finished", label: "Finalizado", status: "finished" },
            { value: "archived", label: "Archivado", status: "archived" },
            { value: "disabled", label: "Deshabilitado", status: "disabled" },
            { value: "paused", label: "Pausado", status: "paused" },
            { value: "hidden", label: "Oculto", status: "hidden" }
          ];
          let handleOutsideClickRef = null;
          let updateDropdownPositionRef = null;
          let animationFrameId = null;
          let isUpdating = false;
          let updateCount = 0;
          const scrollContainers = [];
          const findScrollContainers = (el) => {
            const containers = [];
            let current = el;
            while (current && current !== document.body && current !== document.documentElement) {
              const style = window.getComputedStyle(current);
              const overflow = style.overflow + style.overflowX + style.overflowY;
              const hasOverflow = overflow.includes("auto") || overflow.includes("scroll");
              const hasScrollContent = current.scrollHeight > current.clientHeight || current.scrollWidth > current.clientWidth;
              if (hasOverflow || hasScrollContent) {
                containers.push(current);
              }
              current = current.parentElement;
            }
            return containers;
          };
          const updateDropdownPosition = () => {
            try {
              if (!dropdown || dropdown.style.display === "none" || !document.body.contains(dropdown)) {
                stopUpdating();
                return;
              }
              if (!statusTag || !statusTag.isConnected) {
                stopUpdating();
                return;
              }
              const rect = statusTag.getBoundingClientRect();
              const top = rect.bottom + 4;
              const left = rect.left;
              const currentTop = dropdown.style.top;
              const currentLeft = dropdown.style.left;
              const newTop = `${top}px`;
              const newLeft = `${left}px`;
              if (currentTop !== newTop || currentLeft !== newLeft) {
                dropdown.style.top = newTop;
                dropdown.style.left = newLeft;
                updateCount++;
              }
            } catch (error) {
              stopUpdating();
            }
          };
          const startUpdating = () => {
            if (isUpdating) return;
            isUpdating = true;
            const update2 = () => {
              if (dropdown.style.display === "none" || !document.body.contains(dropdown)) {
                stopUpdating();
                return;
              }
              updateDropdownPosition();
              animationFrameId = requestAnimationFrame(update2);
            };
            update2();
          };
          const stopUpdating = () => {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
            isUpdating = false;
            updateCount = 0;
          };
          updateDropdownPositionRef = updateDropdownPosition;
          const closeDropdown = () => {
            stopUpdating();
            dropdown.style.display = "none";
            const scrollbarInstance = dropdown.__scrollbarInstance;
            if (scrollbarInstance && scrollbarInstance.destroy) {
              try {
                scrollbarInstance.destroy();
              } catch (e) {
              }
              dropdown.__scrollbarInstance = null;
            }
            if (dropdown.parentElement === document.body) {
              container2.appendChild(dropdown);
            }
            if (handleOutsideClickRef) {
              document.removeEventListener("click", handleOutsideClickRef);
              handleOutsideClickRef = null;
            }
            if (updateDropdownPositionRef) {
              window.removeEventListener("scroll", updateDropdownPositionRef, true);
              element.removeEventListener("scroll", updateDropdownPositionRef, true);
              scrollContainers.forEach((container3) => {
                container3.removeEventListener("scroll", updateDropdownPositionRef, true);
              });
              scrollContainers.length = 0;
              updateDropdownPositionRef = null;
            }
          };
          const openDropdown = (e) => {
            try {
              e.preventDefault();
              e.stopPropagation();
              if (!statusTag || !dropdown) return;
              element.querySelectorAll(".ubits-data-table__status-dropdown").forEach((dd) => {
                if (dd !== dropdown) {
                  dd.style.display = "none";
                  if (dd.parentElement === document.body) {
                    const originalContainer = element.querySelector(
                      `[data-row-id="${dd.getAttribute("data-row-id")}"][data-column-id="${dd.getAttribute("data-column-id")}"]`
                    );
                    if (originalContainer) {
                      originalContainer.appendChild(dd);
                    }
                  }
                }
              });
              const statusToLabel = {
                active: "Activo",
                completed: "Completado",
                published: "Publicado",
                fulfilled: "Cumplido",
                created: "Creado",
                "not-fulfilled": "No cumplido",
                denied: "Denegado",
                draft: "Borrador",
                "in-progress": "En progreso",
                syncing: "Sincronizando",
                pending: "Pendiente",
                "pending-approval": "Pendiente aprobación",
                "not-started": "No iniciado",
                finished: "Finalizado",
                archived: "Archivado",
                disabled: "Deshabilitado",
                paused: "Pausado",
                hidden: "Oculto"
              };
              const listItems = statusOptions.map((option) => ({
                label: option.label,
                value: option.value,
                state: option.status === currentStatus ? "active" : "default",
                selected: option.status === currentStatus
              }));
              if (!document.querySelector('link[href*="scroll.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "../../addons/scroll/src/styles/scroll.css";
                document.head.appendChild(link);
              }
              dropdown.innerHTML = "";
              const listContainerId = `status-list-${rowId}-${columnId}`;
              const scrollbarContainerId = `status-scrollbar-${rowId}-${columnId}`;
              dropdown.id = `status-dropdown-${rowId}-${columnId}`;
              dropdown.innerHTML = `
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${listContainerId}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${scrollbarContainerId}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `;
              const listContainer = document.getElementById(listContainerId);
              if (listContainer) {
                const style = document.createElement("style");
                style.textContent = `
            #${listContainerId}::-webkit-scrollbar {
              display: none;
            }
          `;
                document.head.appendChild(style);
              }
              if (dropdown.parentElement !== document.body) {
                document.body.appendChild(dropdown);
              }
              const rect = statusTag.getBoundingClientRect();
              dropdown.style.position = "fixed";
              dropdown.style.top = `${rect.bottom + 4}px`;
              dropdown.style.left = `${rect.left}px`;
              dropdown.style.zIndex = "1000";
              dropdown.style.backgroundColor = "var(--modifiers-normal-color-light-bg-1)";
              dropdown.style.border = "1px solid var(--modifiers-normal-color-light-border-1)";
              dropdown.style.borderRadius = "var(--ubits-border-radius-sm)";
              dropdown.style.display = "block";
              dropdown.style.minWidth = "200px";
              dropdown.style.maxWidth = "300px";
              dropdown.style.padding = "4px";
              dropdown.style.boxSizing = "border-box";
              dropdown.style.maxHeight = "308px";
              const containers = findScrollContainers(statusTag);
              scrollContainers.push(...containers);
              updateDropdownPosition();
              startUpdating();
              window.addEventListener("scroll", updateDropdownPosition, true);
              element.addEventListener("scroll", updateDropdownPosition, true);
              containers.forEach((container3) => {
                container3.addEventListener("scroll", updateDropdownPosition, true);
              });
              let scrollbarInstance = null;
              try {
                const listElement = createList({
                  containerId: listContainerId,
                  items: listItems,
                  size: "sm",
                  maxHeight: "none",
                  onSelectionChange: (selectedItem, index) => {
                    if (selectedItem && index !== null) {
                      const option = statusOptions[index];
                      if (option) {
                        const row = currentOptions.rows.find((r) => r.id === rowId);
                        if (row) {
                          const col = currentOptions.columns.find((c) => c.id === columnId);
                          if (col) {
                            const labelToSave = statusToLabel[option.status] || option.label;
                            row.data[columnId] = labelToSave;
                            row.data.estado = labelToSave;
                            row.data.status = labelToSave;
                            render();
                          }
                        }
                        closeDropdown();
                      }
                    }
                  }
                });
                if (listElement) {
                  listElement.style.maxHeight = "none";
                  listElement.style.height = "auto";
                  listElement.style.overflow = "visible";
                  listElement.style.overflowY = "visible";
                  listElement.style.overflowX = "visible";
                }
                requestAnimationFrame(() => {
                  if (typeof createScrollbar !== "undefined") {
                    try {
                      const targetElement = document.getElementById(listContainerId);
                      if (targetElement && targetElement.scrollHeight > targetElement.clientHeight) {
                        scrollbarInstance = createScrollbar({
                          containerId: scrollbarContainerId,
                          targetId: listContainerId,
                          orientation: "vertical",
                          state: "default"
                        });
                        if (scrollbarInstance?.update) {
                          scrollbarInstance.update();
                        }
                      }
                    } catch (scrollbarError) {
                    }
                  }
                });
              } catch (error) {
              }
              dropdown.__scrollbarInstance = scrollbarInstance;
              const handleOutsideClick = (e2) => {
                if (!dropdown.contains(e2.target) && !statusTag.contains(e2.target)) {
                  closeDropdown();
                }
              };
              handleOutsideClickRef = handleOutsideClick;
              setTimeout(() => {
                document.addEventListener("click", handleOutsideClick);
              }, 0);
            } catch (error) {
              stopUpdating();
            }
          };
          statusTag.addEventListener("click", openDropdown);
        });
        const radioButtons = element.querySelectorAll(
          'input[data-radio-button="true"][data-editable="true"]'
        );
        radioButtons.forEach((radio) => {
          const input = radio;
          const rowIdStr = input.getAttribute("data-row-id");
          const columnId = input.getAttribute("data-column-id");
          if (!rowIdStr || !columnId) return;
          const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
          const newInput = input.cloneNode(true);
          input.parentNode?.replaceChild(newInput, input);
          newInput.addEventListener("change", (e) => {
            e.stopPropagation();
            if (newInput.checked) {
              const allRadiosInGroup = element.querySelectorAll(
                `input[data-radio-button="true"][data-column-id="${columnId}"]`
              );
              allRadiosInGroup.forEach((otherRadio) => {
                const otherRowIdStr = otherRadio.getAttribute("data-row-id");
                if (otherRowIdStr && otherRowIdStr !== String(rowId)) {
                  otherRadio.checked = false;
                  const otherRow = currentOptions.rows.find((r) => String(r.id) === otherRowIdStr);
                  if (otherRow) {
                    otherRow.data[columnId] = false;
                  }
                }
              });
              const row = currentOptions.rows.find((r) => String(r.id) === String(rowId));
              if (row) {
                row.data[columnId] = true;
                row.data[`${columnId}_value`] = rowId;
              }
            }
            render();
          });
        });
        const checkboxButtons = element.querySelectorAll(
          'input[data-checkbox-button="true"]:not([data-column-id="checkbox-2"])'
        );
        checkboxButtons.forEach((checkbox) => {
          const input = checkbox;
          const rowIdStr = input.getAttribute("data-row-id");
          const columnId = input.getAttribute("data-column-id");
          if (!rowIdStr || !columnId) return;
          if (columnId === "checkbox-2") {
            return;
          }
          const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
          const newInput = input.cloneNode(true);
          input.parentNode?.replaceChild(newInput, input);
          newInput.addEventListener("change", (e) => {
            e.stopPropagation();
            const row = currentOptions.rows.find((r) => String(r.id) === String(rowId));
            if (row) {
              row.data[columnId] = newInput.checked;
              if (currentOptions.onRowSelect) {
                currentOptions.onRowSelect(rowId, newInput.checked);
              }
              render();
            }
          });
        });
        const headerCheckboxesWithoutHandler = element.querySelectorAll(
          "input[data-column-checkbox-header]"
        );
        headerCheckboxesWithoutHandler.forEach((checkbox, index) => {
          const input = checkbox;
          const columnId = input.getAttribute("data-column-checkbox-header");
          const testClickHandler = () => {
          };
          input.addEventListener("click", testClickHandler, { once: true, capture: true });
          const testChangeHandler = () => {
          };
          input.addEventListener("change", testChangeHandler, { once: true, capture: true });
        });
        const isWeb2 = typeof window !== "undefined" && window.location && !window.location.href.includes("storybook");
        const dateEditables = element.querySelectorAll(".ubits-data-table__date-editable");
        dateEditables.forEach((dateEditableContainer, index) => {
          const rowIdStr = dateEditableContainer.getAttribute("data-row-id");
          const columnId = dateEditableContainer.getAttribute("data-column-id");
          if (!rowIdStr || !columnId) {
            return;
          }
          const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
          const dateDisplay = dateEditableContainer.querySelector(
            ".ubits-data-table__date-display"
          );
          if (!dateDisplay) {
            return;
          }
          let calendarInstance = null;
          let externalCalendarContainer = null;
          let handleOutsideClickRef = null;
          let handleEscapeKeyRef = null;
          let handleScrollRef = null;
          let scrollableContainer = null;
          const formatDate2 = (date) => {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          };
          const parseDate = (dateStr) => {
            if (!dateStr) return null;
            const [day, month, year] = dateStr.split("/");
            if (day && month && year) {
              return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            }
            try {
              const date = new Date(dateStr);
              if (!isNaN(date.getTime())) {
                return date;
              }
            } catch (e) {
            }
            return null;
          };
          const closeCalendar = () => {
            if (externalCalendarContainer) {
              externalCalendarContainer.style.display = "none";
              if (externalCalendarContainer.parentElement) {
                externalCalendarContainer.remove();
              }
              externalCalendarContainer = null;
            }
            if (handleOutsideClickRef) {
              document.removeEventListener("click", handleOutsideClickRef);
              handleOutsideClickRef = null;
            }
            if (handleEscapeKeyRef) {
              document.removeEventListener("keydown", handleEscapeKeyRef);
              handleEscapeKeyRef = null;
            }
            if (handleScrollRef) {
              window.removeEventListener("scroll", handleScrollRef, true);
              if (scrollableContainer) {
                scrollableContainer.removeEventListener("scroll", handleScrollRef, true);
              }
              handleScrollRef = null;
            }
          };
          const addCalendarListeners = () => {
            handleOutsideClickRef = (e) => {
              if (externalCalendarContainer && !dateEditableContainer.contains(e.target) && !externalCalendarContainer.contains(e.target)) {
                closeCalendar();
              }
            };
            handleEscapeKeyRef = (e) => {
              if (e.key === "Escape" && externalCalendarContainer) {
                closeCalendar();
              }
            };
            handleScrollRef = (e) => {
              if (!externalCalendarContainer) {
                return;
              }
              const calendarElement = externalCalendarContainer.querySelector(".ubits-calendar");
              if (calendarElement) {
                const monthDropdown = calendarElement.querySelector(
                  '.ubits-calendar__month-dropdown[style*="display: block"]'
                );
                const yearDropdown = calendarElement.querySelector(
                  '.ubits-calendar__year-dropdown[style*="display: block"]'
                );
                if (monthDropdown || yearDropdown) {
                  const activeElement = document.activeElement;
                  if (activeElement) {
                    if (externalCalendarContainer.contains(activeElement) || activeElement.closest(".ubits-calendar") || activeElement.closest(".ubits-calendar__month-dropdown") || activeElement.closest(".ubits-calendar__year-dropdown") || activeElement.closest(".ubits-list") || activeElement.closest('[id*="calendar-list"]') || activeElement.closest('[id*="calendar-scrollbar"]')) {
                      return;
                    }
                  }
                  if (e && e.target) {
                    const target = e.target;
                    if (externalCalendarContainer.contains(target) || target.closest(".ubits-calendar") || target.closest(".ubits-calendar__month-dropdown") || target.closest(".ubits-calendar__year-dropdown") || target.closest(".ubits-list") || target.closest('[id*="calendar-list"]') || target.closest('[id*="calendar-scrollbar"]')) {
                      return;
                    }
                  }
                  return;
                }
              }
              closeCalendar();
            };
            document.addEventListener("click", handleOutsideClickRef);
            document.addEventListener("keydown", handleEscapeKeyRef);
            scrollableContainer = element.querySelector(
              ".ubits-data-table__scrollable-container"
            );
            if (scrollableContainer) {
              scrollableContainer.addEventListener("scroll", handleScrollRef, true);
            }
            window.addEventListener("scroll", handleScrollRef, true);
          };
          const loadCalendarStyles = async () => {
            const stylesToLoad = [
              {
                id: "ubits-calendar-styles",
                fileName: "calendar.css",
                href: "../../addons/calendar/src/styles/calendar.css"
              },
              {
                id: "ubits-button-styles",
                fileName: "button.css",
                href: "../../addons/button/src/styles/button.css"
              },
              {
                id: "ubits-input-styles",
                fileName: "input.css",
                href: "../../addons/input/src/styles/input.css"
              },
              {
                id: "ubits-list-styles",
                fileName: "list.css",
                href: "../../addons/list/src/styles/list.css"
              }
            ];
            for (const style of stylesToLoad) {
              const existingStyle = document.getElementById(style.id);
              const existingLink = Array.from(
                document.head.querySelectorAll('link[rel="stylesheet"]')
              ).find((link) => {
                const href = link.href || "";
                return href.includes(style.fileName) || link.id === style.id;
              });
              if (existingStyle || existingLink) {
                continue;
              }
              const linkElement = document.createElement("link");
              linkElement.rel = "stylesheet";
              linkElement.href = style.href;
              linkElement.id = style.id;
              document.head.appendChild(linkElement);
            }
          };
          const showCalendar = async () => {
            if (externalCalendarContainer && externalCalendarContainer.style.display !== "none") {
              closeCalendar();
              return;
            }
            if (calendarInstance && externalCalendarContainer) {
              const dateDisplayRect = dateDisplay.getBoundingClientRect();
              externalCalendarContainer.style.top = `${dateDisplayRect.bottom + 4}px`;
              externalCalendarContainer.style.left = `${dateDisplayRect.left}px`;
              externalCalendarContainer.style.display = "block";
              addCalendarListeners();
              return;
            }
            try {
              await loadCalendarStyles();
              const { createCalendar: createCalendar2 } = await Promise.resolve().then(() => Calendar);
              const currentValue = dateDisplay.textContent || "";
              const parsedDate = parseDate(currentValue);
              const initialDate = parsedDate || /* @__PURE__ */ new Date();
              calendarInstance = createCalendar2({
                mode: "single",
                selectedDate: parsedDate,
                initialDate,
                onDateSelect: (date) => {
                  const formattedDate = formatDate2(date);
                  dateDisplay.textContent = formattedDate;
                  const row = currentOptions.rows.find((r) => r.id === rowId);
                  if (row) {
                    row.data[columnId] = formattedDate;
                    row.data[`${columnId}_iso`] = date.toISOString().split("T")[0];
                  }
                  closeCalendar();
                  render();
                }
              });
              externalCalendarContainer = document.createElement("div");
              externalCalendarContainer.className = "ubits-data-table__calendar-container";
              externalCalendarContainer.setAttribute("data-row-id", String(rowId));
              externalCalendarContainer.setAttribute("data-column-id", columnId);
              const dateDisplayRect = dateDisplay.getBoundingClientRect();
              const topPosition = dateDisplayRect.bottom + 4;
              const leftPosition = dateDisplayRect.left;
              externalCalendarContainer.style.cssText = `
            position: fixed;
            top: ${topPosition}px;
            left: ${leftPosition}px;
            z-index: 99999;
            display: block;
            margin: 0;
          `;
              document.body.appendChild(externalCalendarContainer);
              externalCalendarContainer.appendChild(calendarInstance.element);
              addCalendarListeners();
            } catch (error) {
              console.error("❌ [CALENDAR] Error cargando Calendar UBITS:", error);
            }
          };
          dateDisplay.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            showCalendar();
          });
        });
        const toggleButtons = element.querySelectorAll('input[data-toggle-button="true"]');
        toggleButtons.forEach((toggle) => {
          const input = toggle;
          const rowIdStr = input.getAttribute("data-row-id");
          const columnId = input.getAttribute("data-column-id");
          if (!rowIdStr || !columnId) return;
          const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
          const newInput = input.cloneNode(true);
          input.parentNode?.replaceChild(newInput, input);
          newInput.addEventListener("change", (e) => {
            e.stopPropagation();
            const row = currentOptions.rows.find((r) => String(r.id) === String(rowId));
            if (row) {
              row.data[columnId] = newInput.checked;
              render();
            }
          });
          const wrapper = newInput.closest(".ubits-toggle");
          if (wrapper) {
            wrapper.addEventListener("click", (e) => {
              if (e.target !== newInput && !newInput.contains(e.target)) {
                e.preventDefault();
                e.stopPropagation();
                newInput.checked = !newInput.checked;
                newInput.dispatchEvent(new Event("change", { bubbles: true }));
              }
            });
          }
        });
        if (currentOptions.showPagination) {
          const paginationElement = element.querySelector(".ubits-data-table__pagination");
          if (paginationElement) {
            const pageButtons = paginationElement.querySelectorAll(".ubits-pagination__page-button");
            pageButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const page = parseInt(button.textContent || "1");
                if (currentOptions.onPageChange) {
                  currentOptions.onPageChange(page);
                }
                currentOptions.currentPage = page;
                render();
              });
            });
            const navButtons = paginationElement.querySelectorAll(".ubits-pagination__nav-button");
            navButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const currentPage = parseInt(
                  paginationElement.getAttribute("data-current-page") || "1"
                );
                const totalPages = parseInt(
                  paginationElement.getAttribute("data-total-pages") || "1"
                );
                const ariaLabel = button.getAttribute("aria-label") || "";
                let newPage = currentPage;
                if (ariaLabel.includes("Primera") || ariaLabel.includes("First")) {
                  newPage = 1;
                } else if (ariaLabel.includes("Última") || ariaLabel.includes("Last")) {
                  newPage = totalPages;
                } else if (ariaLabel.includes("Anterior") || ariaLabel.includes("Previous")) {
                  newPage = Math.max(1, currentPage - 1);
                } else if (ariaLabel.includes("Siguiente") || ariaLabel.includes("Next")) {
                  newPage = Math.min(totalPages, currentPage + 1);
                }
                if (newPage !== currentPage) {
                  if (currentOptions.onPageChange) {
                    currentOptions.onPageChange(newPage);
                  }
                  currentOptions.currentPage = newPage;
                  render();
                }
              });
            });
            const itemsPerPageSelect = paginationElement.querySelector(
              ".ubits-pagination__select"
            );
            if (itemsPerPageSelect) {
              itemsPerPageSelect.addEventListener("change", (e) => {
                const target = e.target;
                const value = parseInt(target.value);
                if (currentOptions.onItemsPerPageChange) {
                  currentOptions.onItemsPerPageChange(value);
                }
                currentOptions.itemsPerPage = value;
                currentOptions.currentPage = 1;
                render();
              });
            }
          }
        }
        if (currentOptions.header) {
          const headerElement = element.querySelector(".ubits-data-table__header");
          if (headerElement) {
            if (currentOptions.header.primaryButton && currentOptions.header.showPrimaryButton !== false) {
              const primaryBtn = headerElement.querySelector(
                ".ubits-data-table__header-primary-button"
              );
              if (primaryBtn && currentOptions.header.primaryButton.onClick) {
                primaryBtn.addEventListener("click", currentOptions.header.primaryButton.onClick);
              }
            }
            if (currentOptions.header.secondaryButtons && currentOptions.header.showSecondaryButtons !== false) {
              const secondaryBtns = headerElement.querySelectorAll(
                ".ubits-data-table__header-secondary-button"
              );
              secondaryBtns.forEach((btn, index) => {
                const buttonConfig = currentOptions.header.secondaryButtons[index];
                if (buttonConfig && buttonConfig.onClick) {
                  btn.addEventListener("click", buttonConfig.onClick);
                }
              });
            }
            if (currentOptions.header.searchButton && currentOptions.header.showSearchButton !== false) {
              const searchBtn = headerElement.querySelector(
                ".ubits-data-table__header-search-button"
              );
              const prevButton = searchBtn?.previousElementSibling;
              const computedStyle = searchBtn ? window.getComputedStyle(searchBtn) : null;
              const prevComputedStyle = prevButton ? window.getComputedStyle(prevButton) : null;
              let gapInfo = null;
              if (searchBtn && prevButton) {
                const prevRect = prevButton.getBoundingClientRect();
                const searchRect = searchBtn.getBoundingClientRect();
                const actualGap = searchRect.left - prevRect.right;
                gapInfo = {
                  prevButtonRight: prevRect.right,
                  searchBtnLeft: searchRect.left,
                  actualGap,
                  expectedGap: 8,
                  difference: actualGap - 8,
                  prevButtonWidth: prevRect.width,
                  searchBtnWidth: searchRect.width,
                  marginLeft: computedStyle?.marginLeft,
                  marginRight: computedStyle?.marginRight
                };
              }
              if (searchBtn) {
                const searchButtonElement = searchBtn.querySelector("button");
                const isButton = searchBtn.tagName === "BUTTON";
                const hasButtonInside = !!searchButtonElement;
                if ((isButton || hasButtonInside) && !isSearchActive) {
                  const buttonToUse = isButton ? searchBtn : searchButtonElement;
                  buttonToUse.addEventListener("click", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    isSearchActive = true;
                    if (currentOptions.header.searchButton.onClick) {
                      currentOptions.header.searchButton.onClick(e);
                    }
                    render();
                    setTimeout(() => {
                      const newSearchBtn = element.querySelector(
                        ".ubits-data-table__header-search-button"
                      );
                      if (newSearchBtn) {
                        const input = newSearchBtn.querySelector(
                          ".ubits-search-button__input"
                        );
                        if (input) {
                          input.focus();
                          setTimeout(() => {
                            input.setSelectionRange(0, input.value.length);
                          }, 10);
                        } else {
                          console.warn("🔍 [DATA TABLE] Input no encontrado después de renderizar");
                        }
                      }
                    }, 150);
                  });
                }
                const searchInput = searchBtn.querySelector(
                  ".ubits-search-button__input"
                );
                if (searchInput) {
                  searchInput.value = searchTerm;
                  const handleSearch = (value) => {
                    searchTerm = value;
                    if (currentOptions.header.searchButton.onChange) {
                      console.log("🔵 [DATA TABLE] Llamando searchButton.onChange con valor:", value);
                      currentOptions.header.searchButton.onChange(value);
                    } else {
                      console.warn("⚠️ [DATA TABLE] searchButton.onChange no está definido");
                    }
                    render();
                    if (value) {
                      setTimeout(() => {
                        const newSearchBtn = element.querySelector(
                          ".ubits-data-table__header-search-button"
                        );
                        if (newSearchBtn) {
                          const input = newSearchBtn.querySelector(
                            ".ubits-search-button__input"
                          );
                          if (input) {
                            input.focus();
                            input.setSelectionRange(input.value.length, input.value.length);
                          }
                        }
                      }, 50);
                    }
                    if (currentOptions.header.searchButton.onSearch) {
                      const filteredRows = filterRowsBySearch(
                        currentOptions.rows,
                        value,
                        currentOptions.columns
                      );
                      currentOptions.header.searchButton.onSearch(value, filteredRows);
                    }
                  };
                  searchInput.addEventListener("input", (e) => {
                    const value = e.target.value;
                    handleSearch(value);
                  });
                  searchInput.addEventListener("change", (e) => {
                    const value = e.target.value;
                    handleSearch(value);
                  });
                  let blurTimeout = null;
                  let isFocusing = false;
                  let focusTime = 0;
                  searchInput.addEventListener("focus", () => {
                    isFocusing = true;
                    focusTime = Date.now();
                    setTimeout(() => {
                      isFocusing = false;
                    }, 200);
                  });
                  searchInput.addEventListener("blur", (e) => {
                    const blurTime = Date.now();
                    const timeSinceFocus = blurTime - focusTime;
                    if (isFocusing || timeSinceFocus < 200) {
                      return;
                    }
                    if (blurTimeout) {
                      clearTimeout(blurTimeout);
                    }
                    blurTimeout = setTimeout(() => {
                      const currentInput = element.querySelector(
                        ".ubits-search-button__input"
                      );
                      const activeElement = document.activeElement;
                      const clearBtn2 = element.querySelector(
                        ".ubits-search-button__clear"
                      );
                      const searchButtonWrapper2 = element.querySelector(
                        ".ubits-data-table__header-search-button"
                      );
                      const shouldClose = currentInput && searchTerm === "" && !currentInput.value && activeElement !== clearBtn2 && !searchButtonWrapper2?.contains(activeElement);
                      if (shouldClose) {
                        isSearchActive = false;
                        render();
                      }
                      blurTimeout = null;
                    }, 200);
                  });
                  const searchButtonWrapper = searchBtn.closest(
                    ".ubits-data-table__header-search-button"
                  );
                  if (searchButtonWrapper) {
                    searchButtonWrapper.addEventListener("mousedown", (e) => {
                      const target = e.target;
                      if (target.closest(".ubits-search-button__input-wrapper")) {
                        e.preventDefault();
                      }
                    });
                  }
                  const clearBtn = searchBtn.querySelector(
                    ".ubits-search-button__clear"
                  );
                  if (clearBtn) {
                    clearBtn.addEventListener("click", (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      searchTerm = "";
                      searchInput.value = "";
                      isSearchActive = false;
                      handleSearch("");
                    });
                  }
                }
              }
            }
            if (currentOptions.header.filterButton && currentOptions.header.showFilterButton !== false) {
              const filterBtn = headerElement.querySelector(
                ".ubits-data-table__header-filter-button"
              );
              if (filterBtn) {
                filterBtn.addEventListener("click", (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (currentOptions.header.filterButton?.onClick) {
                    currentOptions.header.filterButton.onClick(e);
                    return;
                  }
                  const drawer = createDrawer({
                    title: "Filtros",
                    complementaryText: "Aplica filtros para refinar los resultados",
                    width: 40,
                    bodyContent: () => {
                      return '<div id="filters-container"></div>';
                    },
                    footerButtons: {
                      secondary: {
                        label: "Limpiar",
                        onClick: (e2) => {
                          e2.preventDefault();
                          if (currentOptions.header.filterButton?.onClearFilters) {
                            currentOptions.header.filterButton.onClearFilters();
                          }
                          drawer.close();
                        }
                      },
                      primary: {
                        label: "Aplicar",
                        onClick: (e2) => {
                          e2.preventDefault();
                          const filters = {};
                          const inputs = drawer.element.querySelectorAll(
                            "#filters-container .ubits-input"
                          );
                          inputs.forEach((input) => {
                            const htmlInput = input;
                            if (htmlInput.value) {
                              const filterId = htmlInput.getAttribute("data-filter-id");
                              if (filterId) {
                                filters[filterId] = htmlInput.value;
                              }
                            }
                          });
                          if (currentOptions.header.filterButton?.onApplyFilters) {
                            currentOptions.header.filterButton.onApplyFilters(filters);
                          }
                          drawer.close();
                        }
                      }
                    },
                    onClose: () => {
                      if (drawer.element?.parentElement) {
                        drawer.element.remove();
                      }
                    },
                    open: true
                  });
                  setTimeout(() => {
                    const container2 = drawer.element?.querySelector(
                      "#filters-container"
                    );
                    if (!container2) return;
                    const filters = currentOptions.header.filterButton?.filters || [];
                    if (filters.length > 0) {
                      filters.forEach((filter) => {
                        const filterDiv = document.createElement("div");
                        filterDiv.id = `filter-${filter.id}`;
                        container2.appendChild(filterDiv);
                        const inputOptions = {
                          containerId: `filter-${filter.id}`,
                          label: filter.label,
                          type: filter.type === "date" ? "calendar" : filter.type,
                          value: filter.value || "",
                          size: "md"
                        };
                        if (filter.type === "select" && filter.options) {
                          inputOptions.selectOptions = filter.options.map((opt) => ({
                            value: opt.value,
                            text: opt.label || opt.value
                          }));
                        }
                        createInput(inputOptions);
                      });
                    } else {
                      createInput({
                        containerId: "filters-container",
                        label: "Prueba",
                        type: "text",
                        placeholder: "Escribe algo",
                        size: "md"
                      });
                    }
                  }, 200);
                });
              }
            }
            if (currentOptions.header.columnSelectorButton && currentOptions.header.showColumnSelectorButton !== false) {
              const columnSelectorBtn = headerElement.querySelector(
                ".ubits-data-table__header-column-selector-button"
              );
              if (columnSelectorBtn) {
                let dropdown = null;
                let isOpen = false;
                const createDropdown = () => {
                  if (dropdown && dropdown.parentElement) {
                    return dropdown;
                  }
                  dropdown = document.createElement("div");
                  dropdown.className = "ubits-data-table__column-selector-dropdown";
                  dropdown.style.display = "none";
                  document.body.appendChild(dropdown);
                  return dropdown;
                };
                const updateDropdownPosition = () => {
                  if (!dropdown || !columnSelectorBtn) return;
                  const rect = columnSelectorBtn.getBoundingClientRect();
                  const dropdownWidth = dropdown.offsetWidth || 200;
                  dropdown.style.position = "fixed";
                  dropdown.style.top = `${rect.bottom + 4}px`;
                  const desiredLeft = rect.right - dropdownWidth;
                  if (desiredLeft < 0) {
                    dropdown.style.left = "0px";
                  } else {
                    dropdown.style.left = `${desiredLeft}px`;
                  }
                  dropdown.style.right = "auto";
                };
                let updatePosition = null;
                let handleOutsideClickRef = null;
                const closeDropdown = () => {
                  if (dropdown) {
                    dropdown.style.display = "none";
                    isOpen = false;
                    if (handleOutsideClickRef) {
                      document.removeEventListener("click", handleOutsideClickRef);
                      handleOutsideClickRef = null;
                    }
                    if (updatePosition) {
                      window.removeEventListener("scroll", updatePosition, true);
                      window.removeEventListener("resize", updatePosition);
                      updatePosition = null;
                    }
                  }
                };
                columnSelectorBtn.addEventListener("click", (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isOpen) {
                    closeDropdown();
                    return;
                  }
                  const dropdownElement = createDropdown();
                  while (dropdownElement.firstChild) {
                    dropdownElement.removeChild(dropdownElement.firstChild);
                  }
                  dropdownElement.innerHTML = "";
                  const afterCleanChildren = dropdownElement.children.length;
                  const afterCleanInnerHTML = dropdownElement.innerHTML.length;
                  if (afterCleanChildren > 0 || afterCleanInnerHTML > 0) {
                    console.error(
                      "🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown no está completamente limpio!"
                    );
                    dropdownElement.innerHTML = "";
                    requestAnimationFrame(() => {
                      if (dropdownElement.children.length > 0 || dropdownElement.innerHTML.length > 0) {
                        console.error(
                          "🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown sigue sin estar limpio después de limpieza adicional!"
                        );
                      }
                    });
                  }
                  const listContainerId = "ubits-data-table-column-selector-list";
                  const existingContainer = document.getElementById(listContainerId);
                  if (existingContainer) {
                    existingContainer.remove();
                  }
                  const listContainer = document.createElement("div");
                  listContainer.id = listContainerId;
                  dropdownElement.appendChild(listContainer);
                  if (listContainer) {
                    const uniqueCurrentColumns = removeDuplicateColumns(currentOptions.columns);
                    if (uniqueCurrentColumns.length !== currentOptions.columns.length) {
                      currentOptions.columns = uniqueCurrentColumns;
                    }
                    const allSelectableColumns = uniqueCurrentColumns.filter((col) => {
                      const excludedTypes = ["drag-handle", "expand"];
                      const excludedIds = ["checkbox", "checkbox-2"];
                      return !excludedTypes.includes(col.type || "") && !excludedIds.includes(col.id) && col.id !== "checkbox";
                    });
                    const seenIds = /* @__PURE__ */ new Set();
                    const selectableColumns = allSelectableColumns.filter((col) => {
                      if (seenIds.has(col.id)) {
                        return false;
                      }
                      seenIds.add(col.id);
                      return true;
                    });
                    const visibleCount = selectableColumns.filter(
                      (col) => col.visible !== false
                    ).length;
                    const listItems = selectableColumns.map((col) => {
                      const isVisible = col.visible !== false;
                      const isLastVisible = isVisible && visibleCount === 1;
                      const checkboxHTML = renderCheckbox({
                        label: col.title,
                        checked: isVisible,
                        size: "sm",
                        disabled: isLastVisible,
                        className: "ubits-data-table__column-selector-checkbox"
                      });
                      const checkboxWithData = checkboxHTML.replace(
                        "<input",
                        `<input data-column-selector-id="${col.id}"`
                      );
                      return {
                        label: checkboxWithData,
                        value: col.id,
                        state: "default",
                        selected: false
                      };
                    });
                    const seenItemValues = /* @__PURE__ */ new Set();
                    const uniqueListItems = listItems.filter((item) => {
                      if (seenItemValues.has(item.value)) {
                        return false;
                      }
                      seenItemValues.add(item.value);
                      return true;
                    });
                    try {
                      createList({
                        containerId: listContainerId,
                        items: uniqueListItems,
                        size: "sm",
                        maxHeight: "400px",
                        className: "ubits-data-table__column-selector-list"
                      });
                      const createdList = document.getElementById(listContainerId);
                      if (createdList) {
                        const listElement = createdList.querySelector(".ubits-list");
                        const listItems2 = listElement?.querySelectorAll(".ubits-list-item") || [];
                      } else {
                        console.error(
                          "🔍 [COLUMN SELECTOR] ❌ Lista no encontrada después de createList"
                        );
                      }
                    } catch (error) {
                      console.error("🔍 [COLUMN SELECTOR] ❌ Error en createList:", error);
                      listContainer.innerHTML = renderList({
                        containerId: listContainerId,
                        items: uniqueListItems,
                        size: "sm",
                        maxHeight: "400px",
                        className: "ubits-data-table__column-selector-list"
                      });
                    }
                  } else {
                    console.error("🔍 [COLUMN SELECTOR] ❌ listContainer no existe");
                  }
                  const updateDropdownContent = () => {
                    const listContainerId2 = "ubits-data-table-column-selector-list";
                    let listContainer2 = dropdownElement.querySelector(
                      `#${listContainerId2}`
                    );
                    if (!listContainer2 || !isOpen) {
                      dropdownElement.innerHTML = "";
                      listContainer2 = document.createElement("div");
                      listContainer2.id = listContainerId2;
                      dropdownElement.appendChild(listContainer2);
                    }
                    const uniqueCurrentColumns = removeDuplicateColumns(currentOptions.columns);
                    if (uniqueCurrentColumns.length !== currentOptions.columns.length) {
                      currentOptions.columns = uniqueCurrentColumns;
                    }
                    const allSelectableColumns = uniqueCurrentColumns.filter((col) => {
                      const excludedTypes = ["drag-handle", "expand"];
                      const excludedIds = ["checkbox", "checkbox-2"];
                      return !excludedTypes.includes(col.type || "") && !excludedIds.includes(col.id) && col.id !== "checkbox";
                    });
                    const seenIds = /* @__PURE__ */ new Set();
                    const selectableColumns = allSelectableColumns.filter((col) => {
                      if (seenIds.has(col.id)) {
                        return false;
                      }
                      seenIds.add(col.id);
                      return true;
                    });
                    const visibleCount = selectableColumns.filter(
                      (col) => col.visible !== false
                    ).length;
                    const listItems = selectableColumns.map((col) => {
                      const isVisible = col.visible !== false;
                      const isLastVisible = isVisible && visibleCount === 1;
                      const checkboxHTML = renderCheckbox({
                        label: col.title,
                        checked: isVisible,
                        size: "sm",
                        disabled: isLastVisible,
                        className: "ubits-data-table__column-selector-checkbox"
                      });
                      const checkboxWithData = checkboxHTML.replace(
                        "<input",
                        `<input data-column-selector-id="${col.id}"`
                      );
                      return {
                        label: checkboxWithData,
                        value: col.id,
                        state: "default",
                        selected: false
                      };
                    });
                    const seenItemValues = /* @__PURE__ */ new Set();
                    const uniqueListItems = listItems.filter((item) => {
                      if (seenItemValues.has(item.value)) {
                        return false;
                      }
                      seenItemValues.add(item.value);
                      return true;
                    });
                    listContainer2.innerHTML = "";
                    try {
                      createList({
                        containerId: listContainerId2,
                        items: uniqueListItems,
                        size: "sm",
                        maxHeight: "400px",
                        className: "ubits-data-table__column-selector-list"
                      });
                      const createdList = document.getElementById(listContainerId2);
                      if (createdList) {
                        const listElement = createdList.querySelector(".ubits-list");
                        const items = listElement?.querySelectorAll(".ubits-list-item") || [];
                      } else {
                        console.error("🔍 [COLUMN SELECTOR UPDATE] ❌ Lista no encontrada");
                      }
                    } catch (error) {
                      console.error("🔍 [COLUMN SELECTOR UPDATE] ❌ Error en createList:", error);
                      listContainer2.innerHTML = renderList({
                        containerId: listContainerId2,
                        items: uniqueListItems,
                        size: "sm",
                        maxHeight: "400px",
                        className: "ubits-data-table__column-selector-list"
                      });
                    }
                    setTimeout(() => {
                      attachCheckboxListeners();
                    }, 50);
                  };
                  const attachCheckboxListeners = () => {
                    const checkboxes = dropdownElement.querySelectorAll(
                      "input[data-column-selector-id]"
                    );
                    checkboxes.forEach((checkbox) => {
                      const input = checkbox;
                      const columnId = input.getAttribute("data-column-selector-id");
                      const newInput = input.cloneNode(true);
                      input.parentNode?.replaceChild(newInput, input);
                      newInput.addEventListener("change", (e2) => {
                        e2.stopPropagation();
                        e2.preventDefault();
                        if (newInput.disabled) {
                          return;
                        }
                        const isChecked = newInput.checked;
                        const column = currentOptions.columns.find((col) => col.id === columnId);
                        if (column) {
                          if (!isChecked) {
                            const allSelectableColumns = currentOptions.columns.filter((col) => {
                              const excludedTypes = ["drag-handle", "expand"];
                              const excludedIds = ["checkbox", "checkbox-2"];
                              return !excludedTypes.includes(col.type || "") && !excludedIds.includes(col.id) && col.id !== "checkbox";
                            });
                            const seenIds = /* @__PURE__ */ new Set();
                            const selectableColumns = allSelectableColumns.filter((col) => {
                              if (seenIds.has(col.id)) {
                                return false;
                              }
                              seenIds.add(col.id);
                              return true;
                            });
                            const wouldBeVisible = selectableColumns.filter((col) => {
                              if (col.id === columnId) {
                                return false;
                              }
                              return col.visible !== false;
                            });
                            if (wouldBeVisible.length === 0) {
                              newInput.checked = true;
                              console.warn(
                                "⚠️ No se pueden ocultar todas las columnas. Debe quedar al menos una columna visible."
                              );
                              return;
                            }
                          }
                          const columnsWithSameId = currentOptions.columns.filter(
                            (col) => col.id === columnId
                          );
                          column.visible = isChecked;
                          if (columnsWithSameId.length > 1) {
                            columnsWithSameId.forEach((col, index) => {
                              if (col.id === columnId) {
                                col.visible = isChecked;
                              }
                            });
                          }
                          if (currentOptions.onColumnVisibilityChange) {
                            const visibleColumns = currentOptions.columns.filter((col) => col.visible !== false).map((col) => col.id);
                            console.log(
                              "🔵 [DATA TABLE] Llamando onColumnVisibilityChange con columnas:",
                              visibleColumns
                            );
                            currentOptions.onColumnVisibilityChange(visibleColumns);
                          } else {
                            console.warn("⚠️ [DATA TABLE] onColumnVisibilityChange no está definido");
                          }
                          updateDropdownContent();
                          render();
                        }
                      });
                    });
                  };
                  setTimeout(() => {
                    attachCheckboxListeners();
                  }, 100);
                  dropdownElement.style.display = "block";
                  requestAnimationFrame(() => {
                    updateDropdownPosition();
                    setTimeout(() => {
                      updateDropdownPosition();
                    }, 10);
                  });
                  isOpen = true;
                  updatePosition = () => {
                    if (isOpen && dropdown) {
                      updateDropdownPosition();
                    }
                  };
                  window.addEventListener("scroll", updatePosition, true);
                  window.addEventListener("resize", updatePosition);
                  handleOutsideClickRef = (e2) => {
                    if (dropdownElement && !dropdownElement.contains(e2.target) && !columnSelectorBtn.contains(e2.target)) {
                      if (updatePosition) {
                        window.removeEventListener("scroll", updatePosition, true);
                        window.removeEventListener("resize", updatePosition);
                      }
                      closeDropdown();
                    }
                  };
                  setTimeout(() => {
                    document.addEventListener("click", handleOutsideClickRef);
                  }, 0);
                  if (currentOptions.header.columnSelectorButton.onClick) {
                    currentOptions.header.columnSelectorButton.onClick(e);
                  }
                });
              }
            }
          }
        }
        try {
          const emptyStateElement = element.querySelector(".ubits-data-table__empty-state");
          if (emptyStateElement && currentOptions.emptyState) {
            const hasNoData = currentOptions.rows.length === 0;
            const hasSearchTerm = searchTerm && searchTerm.trim() !== "";
            let emptyStateConfig;
            if (hasNoData && currentOptions.emptyState.noData) {
              emptyStateConfig = currentOptions.emptyState.noData;
            } else if (hasSearchTerm && currentOptions.emptyState.noSearchResults) {
              emptyStateConfig = currentOptions.emptyState.noSearchResults;
            }
            if (emptyStateConfig) {
              if (emptyStateConfig.onAction) {
                const primaryButton = emptyStateElement.querySelector('[data-action="primary"]');
                if (primaryButton) {
                  primaryButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    emptyStateConfig.onAction?.();
                  });
                }
              }
              if (emptyStateConfig.onSecondaryAction) {
                const secondaryButton = emptyStateElement.querySelector('[data-action="secondary"]');
                if (secondaryButton) {
                  secondaryButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    emptyStateConfig.onSecondaryAction?.();
                  });
                }
              }
            }
          }
        } catch (error) {
          console.error(`📎 [ATTACH] ❌ Error agregando listeners de empty state:`, error);
        }
      } catch (error) {
        console.error(`📎 [ATTACH] ❌ Error en attachEventListeners:`, error);
      }
    };
    render();
    const update = (newOptions) => {
      const previousShowPagination = currentOptions.showPagination;
      currentOptions = { ...currentOptions, ...newOptions };
      if (newOptions.columns) {
        currentOptions.columns = removeDuplicateColumns(newOptions.columns);
      } else if (currentOptions.columns) {
        const beforeCount = currentOptions.columns.length;
        currentOptions.columns = removeDuplicateColumns(currentOptions.columns);
        if (currentOptions.columns.length !== beforeCount) ;
      }
      if (newOptions.showPagination !== void 0 && newOptions.showPagination !== previousShowPagination) {
        if (newOptions.showPagination) {
          if (lazyLoadScrollListener) {
            const scrollableContainer = element.querySelector(".ubits-data-table__scrollable-container") || element.querySelector(".ubits-data-table") || element;
            if (scrollableContainer) {
              scrollableContainer.removeEventListener("scroll", lazyLoadScrollListener);
            }
            window.removeEventListener("scroll", lazyLoadScrollListener, true);
            lazyLoadScrollListener = null;
          }
          lazyLoadCurrentItems = lazyLoadItemsPerBatch;
        } else {
          lazyLoadCurrentItems = lazyLoadItemsPerBatch;
        }
      }
      if (newOptions.columns) {
        columnOrder = newOptions.columns.filter((col) => col.visible !== false).map((col) => col.id);
      }
      if (newOptions.rows) {
        rowOrder = newOptions.rows.map((row) => row.id);
        lazyLoadCurrentItems = lazyLoadItemsPerBatch;
      }
      render();
    };
    const destroy = () => {
      if (searchButtonInstance) {
        try {
          searchButtonInstance.destroy();
        } catch (e) {
        }
        searchButtonInstance = null;
      }
      if (lazyLoadScrollListener) {
        const scrollableContainer = element.querySelector(".ubits-data-table__scrollable-container") || element.querySelector(".ubits-data-table") || element;
        if (scrollableContainer) {
          scrollableContainer.removeEventListener("scroll", lazyLoadScrollListener);
        }
        window.removeEventListener("scroll", lazyLoadScrollListener, true);
        lazyLoadScrollListener = null;
      }
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
    return {
      element,
      destroy,
      update
    };
  }
  if (typeof window !== "undefined") {
    window.UBITSDataTable = {
      renderDataTable,
      createDataTable
    };
    window.renderDataTable = renderDataTable;
    window.createDataTable = createDataTable;
  }
  const DataTable = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createDataTable,
    renderDataTable
  }, Symbol.toStringTag, { value: "Module" }));
  function renderStockBadge(status = "INSTOCK") {
    const statusConfig = {
      INSTOCK: { text: "INSTOCK", class: "ubits-data-view__stock-badge--instock" },
      LOWSTOCK: { text: "LOWSTOCK", class: "ubits-data-view__stock-badge--lowstock" },
      OUTOFSTOCK: { text: "OUTOFSTOCK", class: "ubits-data-view__stock-badge--outofstock" }
    };
    const config = statusConfig[status] || statusConfig.INSTOCK;
    return `<span class="ubits-data-view__stock-badge ${config.class}">${config.text}</span>`;
  }
  function renderRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    let starsHTML = "";
    for (let i = 0; i < fullStars; i++) {
      starsHTML += `<i class="fas fa-star ubits-data-view__star ubits-data-view__star--filled"></i>`;
    }
    if (hasHalfStar) {
      starsHTML += `<i class="fas fa-star-half-alt ubits-data-view__star ubits-data-view__star--half"></i>`;
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += `<i class="far fa-star ubits-data-view__star ubits-data-view__star--empty"></i>`;
    }
    return `
    <div class="ubits-data-view__rating">
      ${starsHTML}
      <span class="ubits-body-sm-regular ubits-data-view__rating-number">${rating}</span>
    </div>
  `;
  }
  function formatPrice(price) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }
  function renderProduct(product, index, options) {
    const {
      showCategory = true,
      showRating = true,
      showPrice = true,
      showWishlist = true,
      showBuyButton = true,
      buyButtonText = "Buy Now",
      buyButtonIcon = "shopping-cart",
      wishlistIcon = "heart"
    } = options;
    const productId = product.id || `product-${index}`;
    const stockStatus = product.stockStatus || "INSTOCK";
    const inWishlist = product.inWishlist || false;
    return `
    <div class="ubits-data-view__item" data-product-id="${productId}" data-index="${index}">
      <div class="ubits-data-view__image-wrapper">
        <img 
          src="${product.image}" 
          alt="${product.imageAlt || product.name}" 
          class="ubits-data-view__image"
        />
        ${renderStockBadge(stockStatus)}
      </div>
      <div class="ubits-data-view__content">
        <div class="ubits-data-view__main">
          ${showCategory ? `<div class="ubits-body-sm-regular ubits-data-view__category">${product.category}</div>` : ""}
          <h3 class="ubits-body-md-semibold ubits-data-view__name">${product.name}</h3>
          ${showRating ? renderRating(product.rating) : ""}
        </div>
        <div class="ubits-data-view__right">
          ${showPrice ? `<span class="ubits-body-md-bold ubits-data-view__price">${formatPrice(product.price)}</span>` : ""}
          <div class="ubits-data-view__actions">
            ${showWishlist ? renderButton({
      variant: "secondary",
      size: "sm",
      icon: wishlistIcon,
      iconStyle: inWishlist ? "solid" : "regular",
      iconOnly: true,
      className: `ubits-data-view__wishlist-button ${inWishlist ? "ubits-data-view__wishlist-button--active" : ""}`,
      attributes: {
        "data-action": "wishlist",
        "aria-label": inWishlist ? "Remover de favoritos" : "Agregar a favoritos"
      }
    }) : ""}
            ${showBuyButton ? renderButton({
      variant: "primary",
      size: "sm",
      text: buyButtonText,
      icon: buyButtonIcon,
      iconStyle: "solid",
      className: "ubits-data-view__buy-button",
      attributes: {
        "data-action": "buy"
      }
    }) : ""}
          </div>
        </div>
      </div>
    </div>
  `;
  }
  function renderDataView(options) {
    const { products = [], containerId, size = "md", className = "", attributes = {} } = options;
    const sizeClass = `ubits-data-view--${size}`;
    const containerClasses = ["ubits-data-view", sizeClass, className].filter(Boolean).join(" ");
    const containerAttrs = Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
    const idAttr = containerId ? `id="${containerId}"` : "";
    let html = `<div class="${containerClasses}" ${idAttr} ${containerAttrs}>`;
    products.forEach((product, index) => {
      html += renderProduct(product, index, options);
    });
    html += "</div>";
    return html;
  }
  function createDataView(options) {
    if (typeof document === "undefined") {
      throw new Error("createDataView requiere un entorno con DOM (navegador)");
    }
    const {
      container,
      containerId,
      products = [],
      size = "md",
      onProductClick,
      onBuyClick,
      onWishlistClick,
      className = "",
      attributes = {}
    } = options;
    const element = container || document.createElement("div");
    const sizeClass = `ubits-data-view--${size}`;
    element.className = ["ubits-data-view", sizeClass, className].filter(Boolean).join(" ");
    if (containerId) {
      element.id = containerId;
    }
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    element.innerHTML = renderDataView(options);
    const items = element.querySelectorAll(".ubits-data-view__item");
    items.forEach((item, index) => {
      const product = products[index];
      if (!product) return;
      if (onProductClick) {
        item.addEventListener("click", (e) => {
          const target = e.target;
          if (!target.closest("button")) {
            onProductClick(product, index, item);
          }
        });
      }
      const buyButton = item.querySelector('[data-action="buy"]');
      if (buyButton && onBuyClick) {
        buyButton.addEventListener("click", (e) => {
          e.stopPropagation();
          onBuyClick(product, index, item);
        });
      }
      const wishlistButton = item.querySelector('[data-action="wishlist"]');
      if (wishlistButton && onWishlistClick) {
        wishlistButton.addEventListener("click", (e) => {
          e.stopPropagation();
          onWishlistClick(product, index, item);
        });
      }
    });
    return element;
  }
  const DataView = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createDataView,
    renderDataView
  }, Symbol.toStringTag, { value: "Module" }));
  if (typeof window !== "undefined") {
    window.createDrawer = createDrawer;
    window.renderDrawer = renderDrawer;
  }
  const Drawer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createDrawer,
    renderDrawer
  }, Symbol.toStringTag, { value: "Module" }));
  const EmptyState = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createEmptyState,
    renderEmptyState
  }, Symbol.toStringTag, { value: "Module" }));
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  }
  function renderFileUpload(options = {}) {
    const {
      state = "default",
      files = [],
      maxFiles = 6,
      maxSize = 5242880,
      // 5MB
      showFileSize = true,
      showActions = true,
      showProgress = true,
      showIcon = false,
      dropText = "Arrastra tus archivos aquí",
      constraintsText,
      selectButtonText = "Seleccionar archivos",
      // Legacy support
      fileName,
      fileExtension,
      fileSize,
      uploadText = "Haz clic para subir archivo",
      fileStatus = "pending",
      className = ""
    } = options;
    const hasFiles = files && files.length > 0;
    const actualState = hasFiles && state !== "files-list" ? "files-list" : state;
    const finalConstraintsText = constraintsText || `Máx. ${maxFiles} archivos · Hasta ${formatFileSize(maxSize)}`;
    if (actualState === "files-list" && hasFiles) {
      const isSingleMode = maxFiles === 1;
      const filesToShow = isSingleMode ? files.slice(0, 1) : files;
      const filesListHtml = filesToShow.map((file, index) => {
        const fileId = file.id || `file-${index}`;
        const fileProgress = file.progress !== void 0 ? file.progress : 0;
        file.status || "pending";
        const showFileProgress = showProgress && file.status === "uploading" && fileProgress > 0;
        const shouldShowFileSize = showFileSize === true;
        const shouldShowProgress = showFileProgress === true;
        return `
        <div class="ubits-file-upload__file-item" data-file-id="${fileId}">
          <div class="ubits-file-upload__file-icon">
            <i class="far fa-file"></i>
          </div>
          <div class="ubits-file-upload__file-info">
            <div class="ubits-file-upload__file-name">${file.name}</div>
            ${shouldShowFileSize ? `<div class="ubits-file-upload__file-size">${formatFileSize(file.size)}</div>` : ""}
            ${shouldShowProgress ? `
              <div class="ubits-file-upload__progress-container">
                ${(() => {
          try {
            return renderProgressBar({
              size: "xs",
              value: fileProgress,
              variant: "default",
              indicator: `${fileProgress}%`
            });
          } catch (error) {
            console.error("Error rendering progress bar:", error);
            return `<div class="ubits-progress-bar ubits-progress-bar--xs" style="height: 4px;">
                      <div class="ubits-progress-bar__container">
                        <div class="ubits-progress-bar__indicator-wrapper" style="width: ${fileProgress}%;"></div>
                      </div>
                      <span class="ubits-progress-bar__indicator">${fileProgress}%</span>
                    </div>`;
          }
        })()}
              </div>
            ` : ""}
          </div>
          <button class="ubits-file-upload__file-remove" data-file-id="${fileId}" aria-label="Eliminar archivo">
            <i class="far fa-times"></i>
          </button>
        </div>
      `;
      }).join("");
      const headerHtml = isSingleMode ? "" : `
      <div class="ubits-file-upload__header">
        <h3 class="ubits-file-upload__title">Files (${filesToShow.length})</h3>
        <div class="ubits-file-upload__header-actions">
            ${renderButton({
        variant: "secondary",
        size: "sm",
        text: "Agregar archivos",
        icon: "arrow-up-from-bracket",
        className: "ubits-file-upload__add-button",
        attributes: {
          "aria-label": "Agregar archivos"
        }
      })}
            ${renderButton({
        variant: "error",
        size: "sm",
        text: "Eliminar todos",
        icon: "trash",
        className: "ubits-file-upload__remove-all-button",
        attributes: {
          "aria-label": "Eliminar todos"
        }
      })}
        </div>
      </div>
    `;
      return `
      <div class="ubits-file-upload ubits-file-upload--files-list ${isSingleMode ? "ubits-file-upload--single-mode" : ""} ${className}">
        ${headerHtml}
        <div class="ubits-file-upload__files-list">
          ${filesListHtml}
        </div>
      </div>
    `.trim();
    }
    const classes = ["ubits-file-upload", `ubits-file-upload--${actualState}`, className].filter(Boolean).join(" ");
    let borderColor = "var(--modifiers-normal-color-light-border-1)";
    let backgroundColor = "var(--modifiers-normal-color-light-bg-1)";
    if (actualState === "dragging") {
      borderColor = "var(--modifiers-normal-color-light-accent-brand)";
    } else if (actualState === "error") {
      borderColor = "var(--modifiers-normal-color-light-feedback-accent-error)";
    } else if (actualState === "disabled") {
      backgroundColor = "var(--modifiers-normal-color-light-bg-disabled)";
      borderColor = "var(--modifiers-normal-color-light-border-disabled)";
    }
    const iconHtml = showIcon ? `
    <div class="ubits-file-upload__drop-icon">
      <i class="far fa-file"></i>
    </div>
  ` : "";
    const isDisabled = actualState === "disabled";
    const selectButtonHtml = renderButton({
      variant: "secondary",
      size: "sm",
      text: selectButtonText,
      icon: "arrow-up-from-bracket",
      disabled: isDisabled,
      className: "ubits-file-upload__select-button",
      attributes: isDisabled ? {
        "aria-disabled": "true"
      } : {}
    });
    return `
    <div class="${classes}" 
         style="background-color: ${backgroundColor}; border-color: ${borderColor};"
         tabindex="${actualState === "disabled" ? "-1" : "0"}"
         role="button"
         aria-disabled="${actualState === "disabled" ? "true" : "false"}">
      <div class="ubits-file-upload__drop-zone">
        ${iconHtml}
        <div class="ubits-file-upload__drop-content">
          <div class="ubits-file-upload__drop-text">${dropText}</div>
          <div class="ubits-file-upload__constraints">${finalConstraintsText}</div>
        </div>
        ${selectButtonHtml}
      </div>
    </div>
  `.trim();
  }
  function createFileUpload(options = {}) {
    const {
      containerId,
      onClick,
      onAddFiles,
      onRemoveAll,
      onReupload,
      onRemove,
      onDragOver,
      onDrop,
      ...restOptions
    } = options;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderFileUpload(restOptions);
    const fileUploadElement = wrapper.firstElementChild;
    if (!fileUploadElement) {
      throw new Error("No se pudo crear el file upload");
    }
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    container.appendChild(fileUploadElement);
    if (onClick && options.state !== "disabled" && options.state !== "filled") {
      fileUploadElement.addEventListener("click", (e) => {
        const target = e.target;
        if (!target.closest(".ubits-file-upload__actions")) {
          onClick();
        }
      });
    }
    if (options.state !== "disabled" && options.state !== "filled") {
      fileUploadElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDragOver) {
          onDragOver(e);
        } else {
          fileUploadElement.classList.add("ubits-file-upload--dragging");
        }
      });
      fileUploadElement.addEventListener("dragleave", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileUploadElement.classList.remove("ubits-file-upload--dragging");
      });
      fileUploadElement.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileUploadElement.classList.remove("ubits-file-upload--dragging");
        if (onDrop) {
          onDrop(e);
        }
      });
    }
    const reuploadButton = fileUploadElement.querySelector(".ubits-file-upload__action--reupload");
    if (reuploadButton && onReupload) {
      reuploadButton.addEventListener("click", (e) => {
        e.stopPropagation();
        onReupload();
      });
    }
    const removeButton = fileUploadElement.querySelector(".ubits-file-upload__action--remove");
    if (removeButton && onRemove) {
      removeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        onRemove();
      });
    }
    const addFilesButton = fileUploadElement.querySelector(".ubits-file-upload__add-button");
    if (addFilesButton && onAddFiles) {
      addFilesButton.addEventListener("click", (e) => {
        e.stopPropagation();
        onAddFiles();
      });
    } else if (addFilesButton && onClick) {
      addFilesButton.addEventListener("click", (e) => {
        e.stopPropagation();
        onClick();
      });
    }
    const removeAllButton = fileUploadElement.querySelector(".ubits-file-upload__remove-all-button");
    if (removeAllButton && onRemoveAll) {
      removeAllButton.addEventListener("click", (e) => {
        e.stopPropagation();
        onRemoveAll();
      });
    }
    const fileRemoveButtons = fileUploadElement.querySelectorAll(".ubits-file-upload__file-remove");
    fileRemoveButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const fileId = button.getAttribute("data-file-id");
        if (onRemove) {
          onRemove(fileId);
        }
      });
    });
    const selectButton = fileUploadElement.querySelector(".ubits-file-upload__select-button");
    if (selectButton && onClick) {
      selectButton.addEventListener("click", (e) => {
        e.stopPropagation();
        onClick();
      });
    }
    const update = (newOptions) => {
      const updatedOptions = { ...restOptions, ...newOptions };
      const newHtml = renderFileUpload(updatedOptions);
      const newWrapper = document.createElement("div");
      newWrapper.innerHTML = newHtml;
      const newElement = newWrapper.firstElementChild;
      if (newElement && fileUploadElement.parentNode) {
        fileUploadElement.parentNode.replaceChild(newElement, fileUploadElement);
        if (updatedOptions.onClick && updatedOptions.state !== "disabled" && updatedOptions.state !== "filled") {
          newElement.addEventListener("click", (e) => {
            const target = e.target;
            if (!target.closest(".ubits-file-upload__actions")) {
              updatedOptions.onClick?.();
            }
          });
        }
        if (updatedOptions.state !== "disabled" && updatedOptions.state !== "filled") {
          newElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (updatedOptions.onDragOver) {
              updatedOptions.onDragOver(e);
            } else {
              newElement.classList.add("ubits-file-upload--dragging");
            }
          });
          newElement.addEventListener("dragleave", (e) => {
            e.preventDefault();
            e.stopPropagation();
            newElement.classList.remove("ubits-file-upload--dragging");
          });
          newElement.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            newElement.classList.remove("ubits-file-upload--dragging");
            if (updatedOptions.onDrop) {
              updatedOptions.onDrop(e);
            }
          });
        }
        const newReuploadButton = newElement.querySelector(".ubits-file-upload__action--reupload");
        if (newReuploadButton && updatedOptions.onReupload) {
          newReuploadButton.addEventListener("click", (e) => {
            e.stopPropagation();
            updatedOptions.onReupload?.();
          });
        }
        const newRemoveButton = newElement.querySelector(".ubits-file-upload__action--remove");
        if (newRemoveButton && updatedOptions.onRemove) {
          newRemoveButton.addEventListener("click", (e) => {
            e.stopPropagation();
            updatedOptions.onRemove?.();
          });
        }
      }
    };
    const destroy = () => {
      if (fileUploadElement.parentNode) {
        fileUploadElement.parentNode.removeChild(fileUploadElement);
      }
    };
    return {
      element: fileUploadElement,
      update,
      destroy
    };
  }
  if (typeof window !== "undefined") {
    window.createFileUpload = createFileUpload;
    window.renderFileUpload = renderFileUpload;
  }
  const FileUpload = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createFileUpload,
    renderFileUpload
  }, Symbol.toStringTag, { value: "Module" }));
  function renderGallery(options) {
    const {
      items = [],
      layout = "grid",
      size = "md",
      columns = 3,
      gap = 16,
      showThumbnails = false,
      lazyLoad = false,
      lightbox = false,
      aspectRatio,
      className = "",
      onItemClick,
      onImageLoad,
      onImageError
    } = options;
    if (items.length === 0) {
      return '<div class="ubits-gallery ubits-gallery--empty">No hay imágenes para mostrar</div>';
    }
    const classes = [
      "ubits-gallery",
      `ubits-gallery--${layout}`,
      `ubits-gallery--${size}`,
      showThumbnails && "ubits-gallery--thumbnails",
      lazyLoad && "ubits-gallery--lazy",
      lightbox && "ubits-gallery--lightbox",
      className
    ].filter(Boolean).join(" ");
    const itemsHTML = items.map(
      (item, index) => renderGalleryItem(item, index, {
        showThumbnails,
        lazyLoad,
        lightbox,
        aspectRatio
      })
    ).join("");
    const dataAttrs = [
      `data-layout="${layout}"`,
      `data-size="${size}"`,
      `data-columns="${columns}"`,
      `data-gap="${gap}"`,
      lightbox && 'data-lightbox="true"',
      lazyLoad && 'data-lazy="true"'
    ].filter(Boolean).join(" ");
    const style = `--gallery-gap: ${gap}px; --gallery-columns: ${columns};`;
    return `
    <div class="${classes}" ${dataAttrs} style="${style}">
      <div class="ubits-gallery__container">
        ${itemsHTML}
      </div>
    </div>
  `;
  }
  function renderGalleryItem(item, index, options) {
    const { id, image, thumbnail, title, description, alt } = item;
    const imageSrc = options.showThumbnails && thumbnail ? thumbnail : image;
    const imageAlt = alt || title || `Imagen ${index + 1}`;
    const loadingAttr = options.lazyLoad ? 'loading="lazy"' : "";
    const lightboxAttr = options.lightbox ? 'data-lightbox-item="true"' : "";
    const aspectRatioStyle = options.aspectRatio ? `style="aspect-ratio: ${options.aspectRatio};"` : "";
    return `
    <div class="ubits-gallery-item" 
         data-item-id="${id}" 
         data-item-index="${index}"
         ${lightboxAttr}
         ${aspectRatioStyle}>
      <div class="ubits-gallery-item__image-wrapper">
        <img src="${imageSrc}" 
             alt="${imageAlt}" 
             class="ubits-gallery-item__image"
             ${loadingAttr}
             data-full-image="${image}" />
        ${options.lightbox ? '<div class="ubits-gallery-item__overlay"><i class="fas fa-expand"></i></div>' : ""}
      </div>
    </div>
  `;
  }
  function createGallery(options) {
    const container = document.createElement("div");
    container.innerHTML = renderGallery(options);
    const gallery = container.firstElementChild;
    if (gallery) {
      setTimeout(() => {
        initializeGallery(gallery, options);
      }, 0);
    }
    return gallery || container;
  }
  function initializeGallery(element, options) {
    const items = element.querySelectorAll(".ubits-gallery-item");
    const lightbox = element.getAttribute("data-lightbox") === "true";
    const lazyLoad = element.getAttribute("data-lazy") === "true";
    if (items.length === 0) return;
    items.forEach((item, index) => {
      const itemElement = item;
      const itemId = itemElement.getAttribute("data-item-id");
      const galleryItem = options.items.find((i) => String(i.id) === itemId);
      if (!galleryItem) return;
      itemElement.addEventListener("click", (e) => {
        e.preventDefault();
        if (options.onItemClick) {
          options.onItemClick(galleryItem, index);
        }
        if (lightbox) {
          openLightbox(galleryItem, options.items, index);
        }
      });
      const img = itemElement.querySelector("img");
      if (img) {
        img.addEventListener("load", () => {
          if (options.onImageLoad) {
            options.onImageLoad(galleryItem, index);
          }
        });
        img.addEventListener("error", () => {
          if (options.onImageError) {
            options.onImageError(galleryItem, index);
          }
          img.style.display = "none";
          const errorDiv = document.createElement("div");
          errorDiv.className = "ubits-gallery-item__error";
          errorDiv.innerHTML = '<i class="fas fa-image"></i><span>Error al cargar imagen</span>';
          itemElement.querySelector(".ubits-gallery-item__image-wrapper")?.appendChild(errorDiv);
        });
      }
    });
    if (lazyLoad && "IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const fullImage = img.getAttribute("data-full-image");
              if (fullImage && img.src !== fullImage) {
                img.src = fullImage;
              }
              imageObserver.unobserve(img);
            }
          });
        },
        {
          // rootMargin usa un valor razonable para lazy loading (equivalente a spacing-12 = 48px, aproximado a 50px)
          rootMargin: "50px"
        }
      );
      items.forEach((item) => {
        const img = item.querySelector("img");
        if (img) {
          imageObserver.observe(img);
        }
      });
    }
  }
  function openLightbox(item, allItems, currentIndex) {
    const overlay = document.createElement("div");
    overlay.className = "ubits-gallery-lightbox";
    const thumbnailsHTML = allItems.map((thumbItem, idx) => {
      const isActive = idx === currentIndex ? "ubits-gallery-lightbox__thumbnail--active" : "";
      const thumbSrc = thumbItem.thumbnail || thumbItem.image;
      return `
      <div class="ubits-gallery-lightbox__thumbnail ${isActive}" 
           data-thumb-index="${idx}"
           data-item-id="${thumbItem.id}">
        <img src="${thumbSrc}" alt="${thumbItem.alt || thumbItem.title || `Thumbnail ${idx + 1}`}" />
      </div>
    `;
    }).join("");
    const closeButton = renderButton({
      variant: "secondary",
      size: "sm",
      icon: "times",
      iconOnly: true,
      className: "ubits-gallery-lightbox__close",
      attributes: {
        "aria-label": "Cerrar"
      }
    });
    const prevButton = renderButton({
      variant: "secondary",
      size: "md",
      icon: "chevron-left",
      iconOnly: true,
      className: "ubits-gallery-lightbox__prev",
      attributes: {
        "aria-label": "Anterior"
      }
    });
    const nextButton = renderButton({
      variant: "secondary",
      size: "md",
      icon: "chevron-right",
      iconOnly: true,
      className: "ubits-gallery-lightbox__next",
      attributes: {
        "aria-label": "Siguiente"
      }
    });
    overlay.innerHTML = `
    <div class="ubits-gallery-lightbox__content">
      ${closeButton}
      <div class="ubits-gallery-lightbox__main">
        ${prevButton}
        <div class="ubits-gallery-lightbox__image-wrapper">
          <img src="${item.image}" alt="${item.alt || item.title || "Imagen"}" class="ubits-gallery-lightbox__image" />
        </div>
        ${nextButton}
      </div>
      <div class="ubits-gallery-lightbox__thumbnails">
        ${thumbnailsHTML}
      </div>
    </div>
  `;
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    let currentIdx = currentIndex;
    const closeBtn = overlay.querySelector(".ubits-gallery-lightbox__close");
    const closeLightbox = () => {
      overlay.remove();
      document.body.style.overflow = "";
    };
    closeBtn?.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeLightbox();
      }
    });
    const prevBtn = overlay.querySelector(".ubits-gallery-lightbox__prev");
    const nextBtn = overlay.querySelector(".ubits-gallery-lightbox__next");
    const lightboxImage = overlay.querySelector(".ubits-gallery-lightbox__image");
    const thumbnails = overlay.querySelectorAll(
      ".ubits-gallery-lightbox__thumbnail"
    );
    const updateLightbox = () => {
      const currentItem = allItems[currentIdx];
      if (currentItem && lightboxImage) {
        lightboxImage.src = currentItem.image;
        lightboxImage.alt = currentItem.alt || currentItem.title || "Imagen";
        thumbnails.forEach((thumb, idx) => {
          if (idx === currentIdx) {
            thumb.classList.add("ubits-gallery-lightbox__thumbnail--active");
            thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          } else {
            thumb.classList.remove("ubits-gallery-lightbox__thumbnail--active");
          }
        });
      }
    };
    thumbnails.forEach((thumb, idx) => {
      thumb.addEventListener("click", () => {
        currentIdx = idx;
        updateLightbox();
      });
    });
    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIdx = currentIdx > 0 ? currentIdx - 1 : allItems.length - 1;
      updateLightbox();
    });
    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIdx = currentIdx < allItems.length - 1 ? currentIdx + 1 : 0;
      updateLightbox();
    });
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
        document.removeEventListener("keydown", handleKeyDown);
      } else if (e.key === "ArrowLeft") {
        currentIdx = currentIdx > 0 ? currentIdx - 1 : allItems.length - 1;
        updateLightbox();
      } else if (e.key === "ArrowRight") {
        currentIdx = currentIdx < allItems.length - 1 ? currentIdx + 1 : 0;
        updateLightbox();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }
  class UBITSGallery extends HTMLElement {
    constructor() {
      super(...arguments);
      this.options = { items: [] };
    }
    static get observedAttributes() {
      return [
        "layout",
        "size",
        "columns",
        "gap",
        "show-thumbnails",
        "lazy-load",
        "lightbox",
        "aspect-ratio",
        "class"
      ];
    }
    connectedCallback() {
      this.updateOptions();
      this.render();
    }
    attributeChangedCallback() {
      this.updateOptions();
      this.render();
    }
    disconnectedCallback() {
    }
    updateOptions() {
      let items = [];
      const itemsData = this.getAttribute("data-items");
      if (itemsData) {
        try {
          items = JSON.parse(itemsData);
        } catch (e) {
          console.error("Error parsing gallery items:", e);
        }
      }
      this.options = {
        items,
        layout: this.getAttribute("layout") || "grid",
        size: this.getAttribute("size") || "md",
        columns: parseInt(this.getAttribute("columns") || "3"),
        gap: parseInt(this.getAttribute("gap") || "16"),
        showThumbnails: this.getAttribute("show-thumbnails") === "true",
        lazyLoad: this.getAttribute("lazy-load") === "true",
        lightbox: this.getAttribute("lightbox") === "true",
        aspectRatio: this.getAttribute("aspect-ratio") || void 0,
        className: this.getAttribute("class") || ""
      };
    }
    render() {
      this.innerHTML = renderGallery(this.options);
      const galleryElement = this.querySelector(".ubits-gallery");
      if (galleryElement) {
        const { initializeGallery: initializeGallery2 } = require("./GalleryProvider");
        initializeGallery2(galleryElement, this.options);
      }
    }
    // Métodos públicos para actualizar la galería
    setItems(items) {
      this.options.items = items;
      this.setAttribute("data-items", JSON.stringify(items));
      this.render();
    }
    setLayout(layout) {
      this.options.layout = layout;
      this.setAttribute("layout", layout || "grid");
      this.render();
    }
    setSize(size) {
      this.options.size = size;
      this.setAttribute("size", size || "md");
      this.render();
    }
  }
  class GalleryAddon {
    constructor() {
      this.name = "@ubits/gallery";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-gallery")) {
        customElements.define("ubits-gallery", UBITSGallery);
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.Gallery = {
          render: (options) => {
            const { renderGallery: renderGallery2 } = require("./GalleryProvider");
            return renderGallery2(options);
          },
          create: (options) => {
            const { createGallery: createGallery2 } = require("./GalleryProvider");
            return createGallery2(options);
          }
        };
        if (!window.createGallery) {
          window.createGallery = (options) => {
            const { createGallery: createGallery2 } = require("./GalleryProvider");
            return createGallery2(options);
          };
        }
      }
      console.log("✅ Gallery add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined" && window.UBITS?.Gallery) {
        delete window.UBITS.Gallery;
        delete window.createGallery;
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-gallery",
          tag: "ubits-gallery",
          documentation: "https://ubits.design/components/gallery"
        }
      ];
    }
    getStyles() {
      return ["./styles/gallery.css"];
    }
  }
  const Gallery = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    GalleryAddon,
    UBITSGallery,
    createGallery,
    initializeGallery,
    renderGallery
  }, Symbol.toStringTag, { value: "Module" }));
  function renderTooltip$1(options) {
    const {
      title,
      showTitle = true,
      description,
      showDescription = true,
      primaryButtonLabel,
      showPrimaryButton = false,
      primaryButtonIcon,
      showPrimaryButtonIcon = false,
      secondaryButtonLabel,
      showSecondaryButton = false,
      secondaryButtonIcon,
      showSecondaryButtonIcon = false,
      tertiaryButtonLabel,
      showTertiaryButton = false,
      tertiaryButtonIcon,
      showTertiaryButtonIcon = false,
      width = "md",
      tailPosition = "top",
      tailOffset = 0,
      className = "",
      style = ""
    } = options;
    const buttonSizeMap = {
      sm: "xs",
      md: "sm",
      lg: "md"
    };
    const buttonSize = buttonSizeMap[width] || "sm";
    const buttonCount = (showPrimaryButton ? 1 : 0) + (showSecondaryButton ? 1 : 0) + (showTertiaryButton ? 1 : 0);
    const baseMinWidths = { sm: 120, md: 160, lg: 200 };
    const baseMaxWidths = { sm: 240, md: 320, lg: 400 };
    let minWidth = baseMinWidths[width] || baseMinWidths.md;
    let maxWidth = baseMaxWidths[width] || baseMaxWidths.md;
    if (buttonCount === 3) {
      maxWidth = Math.max(maxWidth, 420);
    } else if (buttonCount === 2) {
      maxWidth = Math.max(maxWidth, 360);
    }
    const tooltipWidthStyle = `min-width: ${minWidth}px; max-width: ${maxWidth}px; width: auto;`;
    const tailPositionClass = `ubits-tooltip--tail-${tailPosition}`;
    const classes = ["ubits-tooltip", tailPositionClass, className].filter(Boolean).join(" ");
    const combinedStyle = `${tooltipWidthStyle}${style ? `; ${style}` : ""}`;
    const styleAttr = ` style="${combinedStyle}"`;
    let tailStyle = "";
    if (tailOffset) {
      if (tailPosition === "top" || tailPosition === "bottom") {
        tailStyle = `transform: translateX(calc(-50% + ${tailOffset}px));`;
      } else {
        tailStyle = `transform: translateY(calc(-50% + ${tailOffset}px));`;
      }
    }
    const tailHTML = `
    <div class="ubits-tooltip__tail"${tailStyle ? ` style="${tailStyle}"` : ""}>
      <div class="ubits-tooltip__tail-inner"></div>
    </div>
  `;
    const headerHTML = showTitle && title ? `
    <div class="ubits-tooltip__header">
      <div class="ubits-tooltip__header-title">
        <p class="ubits-body-md-semibold">${title}</p>
      </div>
    </div>
  ` : "";
    const bodyHTML = showDescription && description ? `
    <div class="ubits-tooltip__body">
      <div class="ubits-tooltip__body-content">
        <p class="ubits-body-md">${description}</p>
      </div>
    </div>
  ` : "";
    let footerHTML = "";
    const hasButtons = showPrimaryButton || showSecondaryButton || showTertiaryButton;
    if (hasButtons) {
      let primaryButtonContent = primaryButtonLabel || "";
      if (showPrimaryButtonIcon && primaryButtonIcon) {
        primaryButtonContent = `<i class="far fa-${primaryButtonIcon}"></i> ${primaryButtonContent}`;
      }
      const primaryButton = showPrimaryButton && primaryButtonLabel ? `<button class="ubits-button ubits-button--primary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="primary" type="button">${primaryButtonContent}</button>` : "";
      let secondaryButtonContent = secondaryButtonLabel || "";
      if (showSecondaryButtonIcon && secondaryButtonIcon) {
        secondaryButtonContent = `<i class="far fa-${secondaryButtonIcon}"></i> ${secondaryButtonContent}`;
      }
      const secondaryButton = showSecondaryButton && secondaryButtonLabel ? `<button class="ubits-button ubits-button--secondary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="secondary" type="button">${secondaryButtonContent}</button>` : "";
      let tertiaryButtonContent = tertiaryButtonLabel || "";
      if (showTertiaryButtonIcon && tertiaryButtonIcon) {
        tertiaryButtonContent = `<i class="far fa-${tertiaryButtonIcon}"></i> ${tertiaryButtonContent}`;
      }
      const tertiaryButton = showTertiaryButton && tertiaryButtonLabel ? `<button class="ubits-button ubits-button--tertiary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="tertiary" type="button">${tertiaryButtonContent}</button>` : "";
      footerHTML = `
      <div class="ubits-tooltip__footer">
        <div class="ubits-tooltip__footer-actions${!showTertiaryButton ? " ubits-tooltip__footer-actions--no-tertiary" : ""}">
          ${tertiaryButton ? `
          <div class="ubits-tooltip__footer-left">
            ${tertiaryButton}
          </div>
          ` : ""}
          <div class="ubits-tooltip__footer-right">
            ${secondaryButton}
            ${primaryButton}
          </div>
        </div>
      </div>
    `;
    }
    return `
    <div class="${classes}"${styleAttr}>
      ${tailHTML}
      <div class="ubits-tooltip__content">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
  }
  function createTooltip$1(options) {
    const {
      onClose,
      closeOnOutsideClick = true,
      open = false,
      position,
      referenceElement,
      onPrimaryAction,
      onSecondaryAction,
      onTertiaryAction
    } = options;
    const container = document.body;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderTooltip$1(options);
    const tooltip = wrapper.firstElementChild;
    if (!tooltip) {
      throw new Error("No se pudo crear el tooltip");
    }
    if (position) {
      tooltip.style.position = "fixed";
      const tailPosition = options.tailPosition || "top";
      if (tailPosition === "top" || tailPosition === "bottom") {
        if (position.left !== void 0) {
          tooltip.style.left = `${position.left}px`;
          tooltip.style.transform = "translateX(-50%)";
        }
        if (position.top !== void 0) {
          tooltip.style.top = `${position.top}px`;
        }
      } else if (tailPosition === "left") {
        if (position.top !== void 0) {
          tooltip.style.top = `${position.top}px`;
          tooltip.style.transform = "translateY(-50%)";
        }
        if (position.left !== void 0) {
          tooltip.style.left = `${position.left}px`;
        }
      } else if (tailPosition === "right") {
        if (position.top !== void 0) {
          tooltip.style.top = `${position.top}px`;
          tooltip.style.transform = "translateY(-50%)";
        }
        if (position.left !== void 0) {
          tooltip.style.left = `${position.left}px`;
        }
      }
    }
    const openTooltip = () => {
      tooltip.classList.add("ubits-tooltip--open");
      if (position) {
        tooltip.style.position = "fixed";
        const tailPosition = options.tailPosition || "top";
        if (tailPosition === "top" || tailPosition === "bottom") {
          if (position.left !== void 0) {
            tooltip.style.left = `${position.left}px`;
            tooltip.style.transform = "translateX(-50%)";
          }
          if (position.top !== void 0) {
            tooltip.style.top = `${position.top}px`;
          }
        } else if (tailPosition === "left") {
          if (position.top !== void 0) {
            tooltip.style.top = `${position.top}px`;
            tooltip.style.transform = "translateY(-50%)";
          }
          if (position.left !== void 0) {
            tooltip.style.left = `${position.left}px`;
          }
        } else if (tailPosition === "right") {
          if (position.top !== void 0) {
            tooltip.style.top = `${position.top}px`;
            tooltip.style.transform = "translateY(-50%)";
          }
          if (position.left !== void 0) {
            tooltip.style.left = `${position.left}px`;
          }
        }
      } else if (referenceElement) {
        const rect = referenceElement.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        tooltip.style.position = "fixed";
        tooltip.style.top = `${rect.bottom + 8}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
      }
    };
    const closeTooltip = () => {
      tooltip.classList.remove("ubits-tooltip--open");
      if (onClose) {
        onClose();
      }
    };
    const updatePosition = (newPosition) => {
      const tailPosition = options.tailPosition || "top";
      if (newPosition.top !== void 0) tooltip.style.top = `${newPosition.top}px`;
      if (newPosition.left !== void 0) tooltip.style.left = `${newPosition.left}px`;
      if (newPosition.right !== void 0) tooltip.style.right = `${newPosition.right}px`;
      if (newPosition.bottom !== void 0) tooltip.style.bottom = `${newPosition.bottom}px`;
      if (tailPosition === "top" || tailPosition === "bottom") {
        if (newPosition.left !== void 0) {
          tooltip.style.transform = "translateX(-50%)";
        }
      } else if (tailPosition === "left" || tailPosition === "right") {
        if (newPosition.top !== void 0) {
          tooltip.style.transform = "translateY(-50%)";
        }
      }
    };
    let destroy = () => {
      if (tooltip.parentElement) {
        tooltip.parentElement.removeChild(tooltip);
      }
    };
    if (closeOnOutsideClick) {
      const handleClickOutside = (e) => {
        const target = e.target;
        if (tooltip.classList.contains("ubits-tooltip--open") && !tooltip.contains(target)) {
          const clickedElement = target;
          const isTriggerButton = clickedElement.closest && clickedElement.closest("[data-tooltip-trigger]");
          if (!isTriggerButton) {
            closeTooltip();
          }
        }
      };
      document.addEventListener("click", handleClickOutside, true);
      const originalDestroy2 = destroy;
      destroy = () => {
        document.removeEventListener("click", handleClickOutside, true);
        originalDestroy2();
      };
    }
    if (onPrimaryAction) {
      const primaryButton = tooltip.querySelector('[data-action="primary"]');
      if (primaryButton) {
        primaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          onPrimaryAction();
        });
      }
    }
    if (onSecondaryAction) {
      const secondaryButton = tooltip.querySelector('[data-action="secondary"]');
      if (secondaryButton) {
        secondaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          onSecondaryAction();
        });
      }
    }
    if (onTertiaryAction) {
      const tertiaryButton = tooltip.querySelector('[data-action="tertiary"]');
      if (tertiaryButton) {
        tertiaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          onTertiaryAction();
        });
      }
    }
    const centerTooltipTail = () => {
      const tailElement = tooltip.querySelector(".ubits-tooltip__tail");
      if (!tailElement) return;
      const tailPosition = options.tailPosition || "top";
      const tailOffset = options.tailOffset || 0;
      const hasOffset = tailOffset !== 0;
      if (!hasOffset) {
        tailElement.style.removeProperty("left");
        tailElement.style.removeProperty("right");
        tailElement.style.removeProperty("top");
        tailElement.style.removeProperty("bottom");
        tailElement.style.removeProperty("transform");
        tailElement.style.removeProperty("margin-left");
        tailElement.style.removeProperty("margin-right");
      } else {
        if (tailPosition === "top" || tailPosition === "bottom") {
          tailElement.style.left = "50%";
          tailElement.style.right = "auto";
          tailElement.style.transform = `translateX(calc(-50% + ${tailOffset}px))`;
          if (tailPosition === "bottom") {
            tailElement.style.transform += " rotate(180deg)";
          }
        } else {
          tailElement.style.top = "50%";
          tailElement.style.bottom = "auto";
          tailElement.style.transform = `translateY(calc(-50% + ${tailOffset}px))`;
        }
      }
      void tailElement.offsetHeight;
    };
    if (typeof ResizeObserver !== "undefined") {
      try {
        const resizeObserver = new ResizeObserver(() => {
          centerTooltipTail();
        });
        resizeObserver.observe(tooltip);
        tooltip._tailResizeObserver = resizeObserver;
        setTimeout(() => {
          centerTooltipTail();
        }, 50);
      } catch (error) {
        console.warn("⚠️ [TooltipProvider] Error al crear ResizeObserver:", error);
        setTimeout(() => {
          centerTooltipTail();
        }, 50);
      }
    } else {
      setTimeout(() => {
        centerTooltipTail();
      }, 100);
    }
    const originalDestroy = destroy;
    destroy = () => {
      if (tooltip._tailResizeObserver) {
        tooltip._tailResizeObserver.disconnect();
        delete tooltip._tailResizeObserver;
      }
      originalDestroy();
    };
    container.appendChild(tooltip);
    if (open) {
      openTooltip();
    }
    return {
      element: tooltip,
      open: openTooltip,
      close: closeTooltip,
      updatePosition,
      destroy
    };
  }
  function renderHeaderSection(options) {
    const {
      title = "",
      showTitle = true,
      showBackButton = false,
      showInfoButton = false,
      showStatusTag = false,
      statusTag,
      actions = [],
      showActions = true,
      showBreadcrumb = false,
      breadcrumb,
      className = ""
    } = options;
    const classes = ["ubits-header-section", className].filter(Boolean).join(" ");
    const backButtonHTML = showBackButton ? renderButton({
      variant: "secondary",
      size: "md",
      icon: "arrow-left",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "data-back-button": "true",
        "aria-label": "Volver"
      }
    }) : "";
    const infoButtonHTML = showInfoButton ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "circle-info",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "data-info-button": "true",
        "aria-label": "Información"
      }
    }) : "";
    const statusTagHTML = showStatusTag && statusTag ? renderStatusTag({
      ...statusTag,
      size: statusTag.size || "sm",
      rightIcon: null
      // Ocultar icono derecho
    }) : "";
    let titleHTML = "";
    if (showTitle && title) {
      titleHTML = `
      <div class="ubits-header-section__title-wrapper">
        ${backButtonHTML}
        <div class="ubits-header-section__title-group">
          <h2 class="ubits-heading-h2">${title}</h2>
          ${infoButtonHTML}
          ${statusTagHTML ? `<div class="ubits-header-section__status-tag-wrapper">${statusTagHTML}</div>` : ""}
        </div>
      </div>
    `;
    } else if (showBackButton || showInfoButton || showStatusTag) {
      titleHTML = `
      <div class="ubits-header-section__title-wrapper">
        ${backButtonHTML}
        <div class="ubits-header-section__title-group">
          ${infoButtonHTML}
          ${statusTagHTML ? `<div class="ubits-header-section__status-tag-wrapper">${statusTagHTML}</div>` : ""}
        </div>
      </div>
    `;
    }
    const showSecondaryButton = options.showSecondaryButton || false;
    const secondaryButtonHTML = showSecondaryButton ? renderButton({
      variant: "secondary",
      size: "md",
      text: options.secondaryButtonText || "",
      icon: options.secondaryButtonIcon,
      iconStyle: "regular",
      attributes: {
        "data-secondary-button": "true",
        "aria-label": options.secondaryButtonText || "Botón secundario"
      }
    }) : "";
    const showOptionsButton = options.showOptionsButton || false;
    const optionsButtonHTML = showOptionsButton ? renderButton({
      variant: "secondary",
      size: "md",
      icon: "ellipsis",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "data-options-button": "true",
        "aria-label": "Más opciones"
      }
    }) : "";
    const normalActions = actions.filter((action) => action.id !== "ai-button");
    const aiAction = actions.find((action) => action.id === "ai-button");
    const secondaryActions = normalActions.filter(
      (action) => action.variant === "secondary" || !action.variant
    );
    const primaryActions = normalActions.filter((action) => action.variant === "primary");
    let actionsHTML = "";
    if (showActions && actions.length > 0) {
      const secondaryActionsButtons = secondaryActions.map((action) => {
        const buttonOptions = {
          ...action,
          size: "md",
          // Forzar tamaño md para acciones
          text: action.text,
          onClick: action.onClick
        };
        return renderButton(buttonOptions);
      }).join("");
      let aiButtonHTML = "";
      if (aiAction) {
        aiButtonHTML = renderButtonAI({
          variant: "secondary",
          size: "md",
          text: aiAction.text || "AI button",
          icon: aiAction.icon || "sparkles",
          iconStyle: aiAction.iconStyle || "regular",
          iconOnly: false,
          disabled: false,
          badge: false,
          active: false
        });
      }
      const primaryActionsButtons = primaryActions.map((action) => {
        const buttonOptions = {
          ...action,
          size: "md",
          // Forzar tamaño md para acciones
          text: action.text,
          onClick: action.onClick
        };
        return renderButton(buttonOptions);
      }).join("");
      actionsHTML = `
      <div class="ubits-header-section__actions">
        ${aiButtonHTML}
        ${secondaryButtonHTML}
        ${secondaryActionsButtons}
        ${primaryActionsButtons}
        ${optionsButtonHTML}
      </div>
    `;
    } else if (showSecondaryButton || showOptionsButton) {
      actionsHTML = `
      <div class="ubits-header-section__actions">
        ${secondaryButtonHTML}
        ${optionsButtonHTML}
      </div>
    `;
    }
    const breadcrumbHTML = showBreadcrumb && breadcrumb ? renderBreadcrumb(breadcrumb) : "";
    const html = `
    <div class="${classes}">
      <div class="ubits-header-section__content">
        ${titleHTML}
        ${actionsHTML}
      </div>
      ${breadcrumbHTML ? `<div class="ubits-header-section__breadcrumb-wrapper">${breadcrumbHTML}</div>` : ""}
    </div>
  `;
    return html.trim();
  }
  function createHeaderSection(options) {
    const {
      containerId,
      container: providedContainer,
      title,
      showTitle = true,
      showBackButton = false,
      showInfoButton = false,
      infoTooltipText = "",
      showStatusTag = false,
      statusTag,
      actions = [],
      showActions = true,
      showSecondaryButton = false,
      showOptionsButton = false,
      showBreadcrumb = false,
      breadcrumb,
      onBackClick,
      onInfoClick,
      onSecondaryButtonClick,
      onOptionsClick
    } = options;
    let container = null;
    if (providedContainer) {
      container = providedContainer;
    } else if (containerId) {
      container = document.getElementById(containerId);
    }
    if (!container) {
      console.error("HeaderSection: Contenedor no encontrado");
      return null;
    }
    const html = renderHeaderSection({
      ...options
    });
    container.innerHTML = html;
    const headerElement = container.querySelector(".ubits-header-section");
    if (!headerElement) {
      console.error("HeaderSection: Elemento no encontrado después de renderizar");
      return null;
    }
    if (showBackButton) {
      const backButton = headerElement.querySelector('[data-back-button="true"]');
      if (backButton) {
        const actualButton = backButton.closest("button") || backButton;
        if (actualButton && onBackClick) {
          actualButton.addEventListener("click", onBackClick);
        }
      }
    }
    if (showInfoButton && infoTooltipText) {
      const infoButton = headerElement.querySelector('[data-info-button="true"]');
      if (infoButton) {
        const actualButton = infoButton.closest("button") || infoButton;
        let tooltipInstance = null;
        let isTooltipOpen = false;
        const updateTooltipPosition = () => {
          if (!tooltipInstance || !isTooltipOpen) return;
          const rect = actualButton.getBoundingClientRect();
          const tooltipElement = tooltipInstance.element;
          const tooltipRect = tooltipElement.getBoundingClientRect();
          const tooltipLeft = rect.left + rect.width / 2;
          const spacingSm = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--ubits-spacing-sm").replace("px", "")
          ) || 8;
          const tooltipTop = rect.top - tooltipRect.height - spacingSm;
          tooltipInstance.updatePosition({
            top: tooltipTop,
            left: tooltipLeft
          });
        };
        const openTooltip = () => {
          if (!tooltipInstance) {
            const rect = actualButton.getBoundingClientRect();
            tooltipInstance = createTooltip$1({
              description: infoTooltipText,
              showDescription: true,
              showTitle: false,
              showPrimaryButton: false,
              showSecondaryButton: false,
              showTertiaryButton: false,
              width: "sm",
              tailPosition: "bottom",
              // Tail apunta hacia abajo (tooltip arriba)
              position: {
                left: rect.left + rect.width / 2,
                top: rect.top - 200
                // Posición temporal, se ajustará después
              },
              closeOnOutsideClick: true,
              onClose: () => {
                isTooltipOpen = false;
                actualButton.classList.remove("ubits-button--active");
              }
            });
            requestAnimationFrame(() => {
              updateTooltipPosition();
            });
          }
          tooltipInstance.open();
          isTooltipOpen = true;
          actualButton.classList.add("ubits-button--active");
          updateTooltipPosition();
        };
        const closeTooltip = () => {
          if (tooltipInstance && isTooltipOpen) {
            tooltipInstance.close();
            isTooltipOpen = false;
            actualButton.classList.remove("ubits-button--active");
          }
        };
        actualButton.addEventListener("click", (e) => {
          e.stopPropagation();
          if (isTooltipOpen) {
            closeTooltip();
          } else {
            openTooltip();
          }
          if (onInfoClick) {
            onInfoClick(e);
          }
        });
        document.addEventListener("click", (e) => {
          if (isTooltipOpen && tooltipInstance && !actualButton.contains(e.target) && !tooltipInstance.element.contains(e.target)) {
            closeTooltip();
          }
        });
        let scrollTimeout = null;
        const handleScroll = () => {
          if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
          }
          scrollTimeout = requestAnimationFrame(() => {
            if (isTooltipOpen) {
              updateTooltipPosition();
            }
          });
        };
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleScroll);
        const originalDestroy = () => {
          window.removeEventListener("scroll", handleScroll, true);
          window.removeEventListener("resize", handleScroll);
          if (tooltipInstance) {
            tooltipInstance.destroy();
            tooltipInstance = null;
          }
        };
        headerElement.__headerSectionCleanup = originalDestroy;
      }
    }
    if (showStatusTag && statusTag) {
      const statusTagElement = headerElement.querySelector(".ubits-status-tag");
      if (statusTagElement && statusTag.onClick) {
        statusTagElement.addEventListener("click", statusTag.onClick);
        statusTagElement.style.cursor = "pointer";
      }
    }
    if (showActions && actions.length > 0) {
      const normalActions = actions.filter((action) => action.id !== "ai-button");
      const aiAction = actions.find((action) => action.id === "ai-button");
      const secondaryActions = normalActions.filter(
        (action) => action.variant === "secondary" || !action.variant
      );
      const primaryActions = normalActions.filter((action) => action.variant === "primary");
      const secondaryActionButtons = headerElement.querySelectorAll(
        '.ubits-header-section__actions .ubits-button:not([data-options-button="true"]):not([data-secondary-button="true"]):not(.ubits-button-ai):not(.ubits-button--primary)'
      );
      secondaryActionButtons.forEach((button, index) => {
        const action = secondaryActions[index];
        if (action && action.onClick) {
          button.addEventListener("click", action.onClick);
        }
      });
      if (aiAction) {
        const aiButton = headerElement.querySelector(
          ".ubits-header-section__actions .ubits-button-ai"
        );
        if (aiButton && aiAction.onClick) {
          aiButton.addEventListener("click", aiAction.onClick);
        }
      }
      const primaryActionButtons = headerElement.querySelectorAll(
        ".ubits-header-section__actions .ubits-button--primary"
      );
      primaryActionButtons.forEach((button, index) => {
        const action = primaryActions[index];
        if (action && action.onClick) {
          button.addEventListener("click", action.onClick);
        }
      });
    }
    if (showSecondaryButton) {
      const secondaryButton = headerElement.querySelector(
        '[data-secondary-button="true"]'
      );
      if (secondaryButton) {
        const actualButton = secondaryButton.closest("button") || secondaryButton;
        if (actualButton && onSecondaryButtonClick) {
          actualButton.addEventListener("click", onSecondaryButtonClick);
        }
      }
    }
    if (showOptionsButton) {
      const optionsButton = headerElement.querySelector(
        '[data-options-button="true"]'
      );
      if (optionsButton) {
        const actualButton = optionsButton.closest("button") || optionsButton;
        const dropdownContainer = document.createElement("div");
        dropdownContainer.className = "ubits-header-section-options-dropdown";
        const spacing12 = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--ubits-spacing-12").replace("px", "")
        ) || 48;
        const minWidth = spacing12 * 2.5;
        dropdownContainer.style.cssText = `
        position: fixed;
        z-index: 1000;
        display: none;
        min-width: ${minWidth}px;
      `;
        document.body.appendChild(dropdownContainer);
        let isOpen = false;
        const toggleDropdown = (e) => {
          e.stopPropagation();
          if (isOpen) {
            dropdownContainer.style.display = "none";
            isOpen = false;
            actualButton.classList.remove("ubits-button--active");
            return;
          }
          const buttonRect = actualButton.getBoundingClientRect();
          const spacingSm = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--ubits-spacing-sm").replace("px", "")
          ) || 8;
          dropdownContainer.style.display = "block";
          dropdownContainer.style.top = `${buttonRect.bottom + window.scrollY + spacingSm}px`;
          dropdownContainer.style.right = `${window.innerWidth - buttonRect.right}px`;
          if (options.optionsMenuItems && options.optionsMenuItems.length > 0) {
            const listId = `header-section-options-menu-${Date.now()}`;
            dropdownContainer.id = listId;
            dropdownContainer.innerHTML = "";
            const listItems = options.optionsMenuItems.map((item) => ({
              label: item.label,
              state: item.state || "default",
              value: item.value || item.label,
              selected: false
            }));
            try {
              createList({
                containerId: listId,
                items: listItems,
                size: "md",
                maxHeight: "none",
                onSelectionChange: (selectedItem, index) => {
                  if (selectedItem && options.optionsMenuItems && options.optionsMenuItems[index]) {
                    const menuItem = options.optionsMenuItems[index];
                    if (menuItem.onClick) {
                      menuItem.onClick(new MouseEvent("click"), {
                        label: selectedItem.label,
                        value: selectedItem.value
                      });
                    }
                    dropdownContainer.style.display = "none";
                    isOpen = false;
                    actualButton.classList.remove("ubits-button--active");
                  }
                }
              });
              setTimeout(() => {
                const listElement = dropdownContainer.querySelector(".ubits-list");
                if (listElement && listItems.length > 5) {
                  listElement.style.maxHeight = "calc(var(--ubits-spacing-12) * 6)";
                  listElement.style.overflowY = "auto";
                }
              }, 0);
            } catch (error) {
              console.error("Error creating options menu:", error);
            }
          }
          isOpen = true;
          actualButton.classList.add("ubits-button--active");
          if (onOptionsClick) {
            onOptionsClick(e);
          }
        };
        actualButton.addEventListener("click", toggleDropdown);
        const closeDropdown = (e) => {
          if (isOpen && !dropdownContainer.contains(e.target) && !actualButton.contains(e.target)) {
            dropdownContainer.style.display = "none";
            isOpen = false;
            actualButton.classList.remove("ubits-button--active");
          }
        };
        document.addEventListener("click", closeDropdown);
        headerElement.__optionsDropdownCleanup = () => {
          document.removeEventListener("click", closeDropdown);
        };
      }
    }
    if (showBreadcrumb && breadcrumb) {
      const breadcrumbWrapper = headerElement.querySelector(
        ".ubits-header-section__breadcrumb-wrapper"
      );
      if (breadcrumbWrapper) {
        const breadcrumbContainerId = `header-section-breadcrumb-${Date.now()}`;
        breadcrumbWrapper.id = breadcrumbContainerId;
        breadcrumbWrapper.innerHTML = "";
        try {
          createBreadcrumb(breadcrumb, breadcrumbContainerId);
        } catch (error) {
          console.error("Error creating breadcrumb:", error);
          breadcrumbWrapper.innerHTML = renderBreadcrumb(breadcrumb);
        }
      }
    }
    return headerElement;
  }
  const HeaderSection = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createHeaderSection,
    renderHeaderSection
  }, Symbol.toStringTag, { value: "Module" }));
  class UBITSInput extends HTMLElement {
    constructor() {
      super(...arguments);
      this.inputInstance = null;
    }
    static get observedAttributes() {
      return [
        "container-id",
        "label",
        "placeholder",
        "helper-text",
        "size",
        "state",
        "type",
        "show-label",
        "show-helper",
        "show-counter",
        "max-length",
        "mandatory",
        "mandatory-type",
        "left-icon",
        "right-icon",
        "value"
      ];
    }
    connectedCallback() {
      this.updateOptions();
      this.render();
    }
    attributeChangedCallback() {
      this.updateOptions();
      this.render();
    }
    updateOptions() {
      const containerId = this.getAttribute("container-id") || this.id || `ubits-input-${Math.random().toString(36).substr(2, 9)}`;
      if (!document.getElementById(containerId)) {
        const container = document.createElement("div");
        container.id = containerId;
        this.appendChild(container);
      }
      this.options = {
        containerId,
        label: this.getAttribute("label") || "",
        placeholder: this.getAttribute("placeholder") || "",
        helperText: this.getAttribute("helper-text") || "",
        size: this.getAttribute("size") || "md",
        state: this.getAttribute("state") || "default",
        type: this.getAttribute("type") || "text",
        showLabel: this.hasAttribute("show-label") ? this.getAttribute("show-label") !== "false" : true,
        showHelper: this.hasAttribute("show-helper") ? this.getAttribute("show-helper") !== "false" : false,
        showCounter: this.hasAttribute("show-counter") ? this.getAttribute("show-counter") !== "false" : false,
        maxLength: this.hasAttribute("max-length") ? parseInt(this.getAttribute("max-length") || "50", 10) : 50,
        mandatory: this.hasAttribute("mandatory") ? this.getAttribute("mandatory") !== "false" : false,
        mandatoryType: this.getAttribute("mandatory-type") || "obligatorio",
        leftIcon: this.getAttribute("left-icon") || "",
        rightIcon: this.getAttribute("right-icon") || "",
        value: this.getAttribute("value") || ""
      };
      const selectOptionsAttr = this.getAttribute("select-options");
      if (selectOptionsAttr) {
        try {
          this.options.selectOptions = JSON.parse(selectOptionsAttr);
        } catch (e) {
          console.warn("UBITS Input: Error parsing select-options", e);
        }
      }
      const autocompleteOptionsAttr = this.getAttribute("autocomplete-options");
      if (autocompleteOptionsAttr) {
        try {
          this.options.autocompleteOptions = JSON.parse(autocompleteOptionsAttr);
        } catch (e) {
          console.warn("UBITS Input: Error parsing autocomplete-options", e);
        }
      }
    }
    render() {
      const container = document.getElementById(this.options.containerId);
      if (!container) return;
      container.innerHTML = "";
      this.inputInstance = createInput(this.options);
      if (this.inputInstance) {
        const onChangeHandler = this.getAttribute("on-change");
        if (onChangeHandler && this.inputInstance.inputElement) {
          this.inputInstance.inputElement.addEventListener("input", (e) => {
            const event = new CustomEvent("ubits-input-change", {
              bubbles: true,
              detail: { value: e.target.value }
            });
            this.dispatchEvent(event);
          });
        }
      }
    }
    // Métodos públicos
    getValue() {
      return this.inputInstance?.getValue() || "";
    }
    setValue(value) {
      if (this.inputInstance) {
        this.inputInstance.setValue(value);
        this.setAttribute("value", value);
      }
    }
    focus() {
      this.inputInstance?.focus();
    }
    blur() {
      this.inputInstance?.blur();
    }
    disable() {
      if (this.inputInstance) {
        this.inputInstance.disable();
        this.setAttribute("state", "disabled");
      }
    }
    enable() {
      if (this.inputInstance) {
        this.inputInstance.enable();
        this.setAttribute("state", "default");
      }
    }
    setState(newState) {
      if (this.inputInstance) {
        this.inputInstance.setState(newState);
        this.setAttribute("state", newState);
      }
    }
  }
  if (typeof window !== "undefined" && !customElements.get("ubits-input")) {
    customElements.define("ubits-input", UBITSInput);
  }
  const InputComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    UBITSInput
  }, Symbol.toStringTag, { value: "Module" }));
  class InputAddon {
    constructor() {
      this.name = "@ubits/input";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-input")) {
        customElements.define("ubits-input", UBITSInput);
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.Input = {
          create: (options) => {
            const { createInput: createInput2 } = require("./InputProvider");
            return createInput2(options);
          },
          render: (options) => {
            const { renderInput: renderInput2 } = require("./InputProvider");
            return renderInput2(options);
          }
        };
        if (!window.createInput) {
          window.createInput = (options) => {
            const { createInput: createInput2 } = require("./InputProvider");
            return createInput2(options);
          };
        }
      }
      console.log("✅ Input add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined" && window.UBITS?.Input) {
        delete window.UBITS.Input;
        delete window.createInput;
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-input",
          tag: "ubits-input",
          documentation: "https://ubits.design/components/input"
          // Placeholder
        }
      ];
    }
    getStyles() {
      return ["./styles/input.css"];
    }
  }
  if (typeof window !== "undefined") {
    Promise.resolve().then(() => InputComponent).then(() => {
      console.log("✅ UBITS Input component registered");
    });
  }
  const Input = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    InputAddon,
    UBITSInput,
    createInput,
    renderInput
  }, Symbol.toStringTag, { value: "Module" }));
  class UBITSList extends HTMLElement {
    constructor() {
      super(...arguments);
      this.options = null;
    }
    connectedCallback() {
      this.render();
    }
    static get observedAttributes() {
      return ["max-height", "multiple"];
    }
    attributeChangedCallback() {
      this.render();
    }
    render() {
      const containerId = this.id || "ubits-list-container";
      if (!document.getElementById(containerId)) {
        this.id = containerId;
      }
      const items = this.getItemsFromAttributes();
      if (items.length === 0) {
        this.innerHTML = '<div class="ubits-list">No hay items</div>';
        return;
      }
      const maxHeight = this.getAttribute("max-height") || "400px";
      const multiple = this.hasAttribute("multiple");
      const options = {
        containerId,
        items,
        maxHeight,
        multiple,
        onSelectionChange: (item, index) => {
          this.dispatchEvent(
            new CustomEvent("selection-change", {
              detail: { item, index },
              bubbles: true
            })
          );
        }
      };
      this.options = options;
      createList(options);
    }
    getItemsFromAttributes() {
      const itemsJson = this.getAttribute("items");
      if (itemsJson) {
        try {
          return JSON.parse(itemsJson);
        } catch {
          return [];
        }
      }
      const slots = this.querySelectorAll("ubits-list-item");
      if (slots.length > 0) {
        return Array.from(slots).map((slot, index) => ({
          label: slot.textContent || "",
          state: slot.getAttribute("state") || "default",
          value: slot.getAttribute("value") || `item-${index}`,
          selected: slot.hasAttribute("selected")
        }));
      }
      return [];
    }
    // Métodos públicos para actualizar la lista
    updateItems(items) {
      if (this.options) {
        this.options.items = items;
        createList(this.options);
      }
    }
    selectItem(index) {
      if (this.options && this.options.items[index]) {
        const item = this.options.items[index];
        if (item.state !== "disabled") {
          item.selected = true;
          this.render();
        }
      }
    }
    getSelectedItems() {
      if (!this.options) return [];
      return this.options.items.filter((item) => item.selected);
    }
  }
  customElements.define("ubits-list", UBITSList);
  const ListComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    UBITSList
  }, Symbol.toStringTag, { value: "Module" }));
  class ListAddon {
    constructor() {
      this.name = "@ubits/list";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-list")) {
        customElements.define("ubits-list", UBITSList);
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.List = {
          render: (options) => {
            const { renderList: renderList2 } = require("./ListProvider");
            return renderList2(options);
          },
          create: (options) => {
            const { createList: createList2 } = require("./ListProvider");
            return createList2(options);
          }
        };
      }
      console.log("✅ List add-on initialized");
    }
    destroy() {
      console.log("List add-on destroyed");
    }
    getComponents() {
      return [
        {
          name: "List",
          tag: "ubits-list",
          documentation: "Componente de lista con estados (default, hover, active, disabled)"
        }
      ];
    }
    getStyles() {
      return ["./styles/list.css"];
    }
  }
  if (typeof window !== "undefined") {
    Promise.resolve().then(() => ListComponent).then(() => {
      console.log("✅ UBITS List component registered");
    });
  }
  const List = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ListAddon,
    UBITSList,
    createList,
    renderList
  }, Symbol.toStringTag, { value: "Module" }));
  const POPOVER_WIDTHS = {
    sm: "240px",
    md: "360px",
    lg: "400px",
    xl: "480px"
  };
  function renderPopover$1(options) {
    const {
      title,
      bodyContent = "",
      width = "md",
      tailPosition = "top",
      tailOffset = 0,
      footerButtons,
      className = ""
    } = options;
    const popoverWidth = POPOVER_WIDTHS[width] || POPOVER_WIDTHS.md;
    const popoverWidthClass = `ubits-popover--width-${width}`;
    const tailPositionClass = `ubits-popover--tail-${tailPosition}`;
    const classes = ["ubits-popover", popoverWidthClass, tailPositionClass, className].filter(Boolean).join(" ");
    const tailHTML = `
    <div class="ubits-popover__tail" style="${tailPosition === "top" || tailPosition === "bottom" ? `left: ${tailOffset ? `calc(50% + ${tailOffset}px)` : "50%"};` : `top: ${tailOffset ? `calc(50% + ${tailOffset}px)` : "50%"};`}">
      <div class="ubits-popover__tail-inner"></div>
    </div>
  `;
    const headerHTML = title ? `
    <div class="ubits-popover__header">
      <div class="ubits-popover__header-title">
        <p class="ubits-body-md-semibold">${title}</p>
      </div>
    </div>
  ` : "";
    const bodyHTMLContent = typeof bodyContent === "function" ? bodyContent() : bodyContent || '<div class="ubits-popover__placeholder">Contenido del popover</div>';
    const bodyHTML = `
    <div class="ubits-popover__body">
      <div class="ubits-popover__body-content">
        ${bodyHTMLContent}
      </div>
      <div class="ubits-popover__scrollbar">
        <div class="ubits-popover__scrollbar-bar"></div>
      </div>
    </div>
  `;
    const footerHTML = footerButtons ? `
    <div class="ubits-popover__footer">
      <div class="ubits-popover__footer-actions${!footerButtons.tertiary ? " ubits-popover__footer-actions--no-tertiary" : ""}">
        ${footerButtons.tertiary ? `
        <div class="ubits-popover__footer-left">
          ${renderButton({
      variant: "tertiary",
      size: "md",
      text: footerButtons.tertiary.label,
      className: "ubits-popover__footer-button"
    })}
        </div>
        ` : ""}
        <div class="ubits-popover__footer-right">
          ${footerButtons.secondary ? renderButton({
      variant: "secondary",
      size: "md",
      text: footerButtons.secondary.label,
      className: "ubits-popover__footer-button"
    }) : ""}
          ${footerButtons.primary ? renderButton({
      variant: "primary",
      size: "md",
      text: footerButtons.primary.label,
      className: "ubits-popover__footer-button"
    }) : ""}
        </div>
      </div>
    </div>
  ` : "";
    return `
    <div class="${classes}" style="width: ${popoverWidth};">
      ${tailHTML}
      <div class="ubits-popover__content">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
  }
  function createPopover$1(options) {
    const {
      containerId,
      onClose,
      closeOnOutsideClick = true,
      open = false,
      position,
      referenceElement
    } = options;
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderPopover$1(options);
    const popover = wrapper.firstElementChild;
    if (!popover) {
      throw new Error("No se pudo crear el popover");
    }
    if (position) {
      popover.style.position = "fixed";
      const tailPosition = options.tailPosition || "top";
      if (tailPosition === "top" || tailPosition === "bottom") {
        if (position.left !== void 0) {
          popover.style.left = `${position.left}px`;
          popover.style.transform = "translateX(-50%)";
        }
        if (position.top !== void 0) {
          popover.style.top = `${position.top}px`;
        }
      } else if (tailPosition === "left") {
        if (position.top !== void 0) {
          popover.style.top = `${position.top}px`;
          popover.style.transform = "translateY(-50%)";
        }
        if (position.left !== void 0) {
          popover.style.left = `${position.left}px`;
        }
      } else if (tailPosition === "right") {
        if (position.top !== void 0) {
          popover.style.top = `${position.top}px`;
          popover.style.transform = "translateY(-50%)";
        }
        if (position.left !== void 0) {
          popover.style.left = `${position.left}px`;
        }
      }
    }
    const openPopover = () => {
      popover.classList.add("ubits-popover--open");
      if (position) {
        popover.style.position = "fixed";
        const tailPosition = options.tailPosition || "top";
        if (tailPosition === "top" || tailPosition === "bottom") {
          if (position.left !== void 0) {
            popover.style.left = `${position.left}px`;
            popover.style.transform = "translateX(-50%)";
          }
          if (position.top !== void 0) {
            popover.style.top = `${position.top}px`;
          }
        } else if (tailPosition === "left") {
          if (position.top !== void 0) {
            popover.style.top = `${position.top}px`;
            popover.style.transform = "translateY(-50%)";
          }
          if (position.left !== void 0) {
            popover.style.left = `${position.left}px`;
          }
        } else if (tailPosition === "right") {
          if (position.top !== void 0) {
            popover.style.top = `${position.top}px`;
            popover.style.transform = "translateY(-50%)";
          }
          if (position.left !== void 0) {
            popover.style.left = `${position.left}px`;
          }
        }
      } else if (referenceElement) {
        const rect = referenceElement.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();
        popover.style.position = "fixed";
        popover.style.top = `${rect.bottom + 8}px`;
        popover.style.left = `${rect.left + rect.width / 2 - popoverRect.width / 2}px`;
      }
    };
    const closePopover = () => {
      popover.classList.remove("ubits-popover--open");
      if (onClose) {
        onClose();
      }
    };
    const updateContent = (content) => {
      const bodyContentElement = popover.querySelector(".ubits-popover__body-content");
      if (bodyContentElement) {
        const contentHTML = typeof content === "function" ? content() : content;
        bodyContentElement.innerHTML = contentHTML;
      }
    };
    const updatePosition = (newPosition) => {
      const tailPosition = options.tailPosition || "top";
      if (newPosition.top !== void 0) popover.style.top = `${newPosition.top}px`;
      if (newPosition.left !== void 0) popover.style.left = `${newPosition.left}px`;
      if (newPosition.right !== void 0) popover.style.right = `${newPosition.right}px`;
      if (newPosition.bottom !== void 0) popover.style.bottom = `${newPosition.bottom}px`;
      if (tailPosition === "top" || tailPosition === "bottom") {
        if (newPosition.left !== void 0) {
          popover.style.transform = "translateX(-50%)";
        }
      } else if (tailPosition === "left" || tailPosition === "right") {
        if (newPosition.top !== void 0) {
          popover.style.transform = "translateY(-50%)";
        }
      }
    };
    let destroy = () => {
      if (popover.parentElement) {
        popover.parentElement.removeChild(popover);
      }
    };
    if (closeOnOutsideClick) {
      const handleClickOutside = (e) => {
        const target = e.target;
        if (popover.classList.contains("ubits-popover--open") && !popover.contains(target)) {
          const clickedElement = target;
          const isTriggerButton = clickedElement.closest && clickedElement.closest("[data-popover-trigger]");
          if (!isTriggerButton) {
            closePopover();
          }
        }
      };
      document.addEventListener("click", handleClickOutside, true);
      const originalDestroy = destroy;
      destroy = () => {
        document.removeEventListener("click", handleClickOutside, true);
        originalDestroy();
      };
    }
    if (options.footerButtons) {
      const tertiaryButton = popover.querySelector(
        ".ubits-popover__footer-left .ubits-popover__footer-button"
      );
      const secondaryButton = popover.querySelector(
        ".ubits-popover__footer-right .ubits-button--secondary.ubits-popover__footer-button"
      );
      const primaryButton = popover.querySelector(
        ".ubits-popover__footer-right .ubits-button--primary.ubits-popover__footer-button"
      );
      if (tertiaryButton && options.footerButtons.tertiary?.onClick) {
        tertiaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          options.footerButtons.tertiary.onClick(e);
        });
      }
      if (secondaryButton && options.footerButtons.secondary?.onClick) {
        secondaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          options.footerButtons.secondary.onClick(e);
        });
      }
      if (primaryButton && options.footerButtons.primary?.onClick) {
        primaryButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          options.footerButtons.primary.onClick(e);
        });
      }
    }
    container.appendChild(popover);
    if (open) {
      openPopover();
    }
    return {
      element: popover,
      open: openPopover,
      close: closePopover,
      updateContent,
      updatePosition,
      destroy
    };
  }
  function updateMaskLayers(overlay, targetElement, padding, savedRect) {
    const rect = savedRect || targetElement.getBoundingClientRect();
    const leftCompensation = overlay.__leftCompensation || 0;
    const topCompensation = overlay.__topCompensation || 0;
    const isBodyFixed = document.body.style.position === "fixed";
    isBodyFixed ? 0 : window.pageYOffset || document.documentElement.scrollTop;
    isBodyFixed ? 0 : window.pageXOffset || document.documentElement.scrollLeft;
    const top = rect.top - padding + topCompensation;
    const left = rect.left - padding + leftCompensation;
    const width = rect.width + padding * 2;
    const height = rect.height + padding * 2;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const topLayer = overlay.querySelector(".ubits-mask-layer--top");
    const bottomLayer = overlay.querySelector(".ubits-mask-layer--bottom");
    const leftLayer = overlay.querySelector(".ubits-mask-layer--left");
    const rightLayer = overlay.querySelector(".ubits-mask-layer--right");
    const highlight = overlay.querySelector(".ubits-mask-highlight");
    if (topLayer) {
      const topHeight = Math.max(0, top);
      topLayer.style.height = `${topHeight}px`;
    }
    if (bottomLayer) {
      const bottomTop = top + height;
      const bottomHeight = Math.max(0, windowHeight - bottomTop);
      bottomLayer.style.top = `${bottomTop}px`;
      bottomLayer.style.height = `${bottomHeight}px`;
    }
    if (leftLayer) {
      const leftWidth = Math.max(0, left);
      leftLayer.style.top = `${Math.max(0, top)}px`;
      leftLayer.style.width = `${leftWidth}px`;
      leftLayer.style.height = `${height}px`;
    }
    if (rightLayer) {
      const rightLeft = left + width;
      const rightWidth = Math.max(0, windowWidth - rightLeft);
      rightLayer.style.top = `${Math.max(0, top)}px`;
      rightLayer.style.left = `${rightLeft}px`;
      rightLayer.style.width = `${rightWidth}px`;
      rightLayer.style.height = `${height}px`;
    }
    if (highlight) {
      highlight.style.top = `${top}px`;
      highlight.style.left = `${left}px`;
      highlight.style.width = `${width}px`;
      highlight.style.height = `${height}px`;
    } else {
      console.warn("⚠️ [Mask] No se encontró el elemento highlight");
    }
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  }
  function calculatePopoverPosition(targetRect, popoverWidth, popoverHeight, position, offset) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;
    let finalPosition = position;
    let top = 0;
    let left = 0;
    let tailPosition = "top";
    if (position === "auto") {
      const spaceTop = targetRect.top;
      const spaceBottom = windowHeight - targetRect.bottom;
      const spaceLeft = targetRect.left;
      const spaceRight = windowWidth - targetRect.right;
      if (spaceBottom >= popoverHeight + offset && spaceBottom >= spaceTop) {
        finalPosition = "bottom";
      } else if (spaceTop >= popoverHeight + offset) {
        finalPosition = "top";
      } else if (spaceRight >= popoverWidth + offset) {
        finalPosition = "right";
      } else if (spaceLeft >= popoverWidth + offset) {
        finalPosition = "left";
      } else {
        finalPosition = "bottom";
      }
    }
    switch (finalPosition) {
      case "top":
        tailPosition = "bottom";
        top = targetRect.top - popoverHeight - offset;
        left = centerX;
        break;
      case "bottom":
        tailPosition = "top";
        top = targetRect.bottom + offset;
        left = centerX;
        break;
      case "left":
        tailPosition = "right";
        top = centerY;
        left = targetRect.left - popoverWidth - offset;
        break;
      case "right":
        tailPosition = "left";
        top = centerY;
        left = targetRect.right + offset;
        break;
    }
    return { top, left, tailPosition };
  }
  function renderMask$1(options) {
    const { className = "" } = options;
    const classes = ["ubits-mask-overlay", className].filter(Boolean).join(" ");
    return `
    <div class="${classes}">
      <div class="ubits-mask-layer ubits-mask-layer--top"></div>
      <div class="ubits-mask-layer ubits-mask-layer--bottom"></div>
      <div class="ubits-mask-layer ubits-mask-layer--left"></div>
      <div class="ubits-mask-layer ubits-mask-layer--right"></div>
      <div class="ubits-mask-highlight"></div>
      <div class="ubits-mask-popover-container"></div>
    </div>
  `.trim();
  }
  function createMask$1(options) {
    const {
      containerId,
      targetElement: initialTarget,
      popover: popoverOptions,
      padding = 8,
      closeOnOverlayClick = true,
      onClose,
      open = false,
      popoverPosition = "auto",
      popoverOffset = 12
    } = options;
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderMask$1(options);
    const overlay = wrapper.firstElementChild;
    if (!overlay) {
      throw new Error("No se pudo crear la máscara");
    }
    const getTargetElement = () => {
      if (typeof initialTarget === "string") {
        return document.querySelector(initialTarget);
      } else {
        return initialTarget;
      }
    };
    let targetElement = getTargetElement();
    const popoverContainer = overlay.querySelector(".ubits-mask-popover-container");
    let popoverInstance = null;
    let savedScrollY = 0;
    let savedScrollX = 0;
    let savedTargetRect = null;
    const updateMaskPosition = () => {
      if (!targetElement) {
        console.warn("⚠️ [Mask.updateMaskPosition] No hay targetElement");
        return;
      }
      const shouldRecalculate = !savedTargetRect;
      const rectToUse = shouldRecalculate ? targetElement.getBoundingClientRect() : savedTargetRect;
      overlay.__leftCompensation || 0;
      overlay.__topCompensation || 0;
      const targetRect = updateMaskLayers(overlay, targetElement, padding, rectToUse);
      if (popoverInstance && popoverContainer) {
        const popoverElement = popoverInstance.element;
        const popoverRect = popoverElement.getBoundingClientRect();
        const position = calculatePopoverPosition(
          targetRect,
          popoverRect.width || 360,
          popoverRect.height || 200,
          popoverPosition,
          popoverOffset
        );
        popoverInstance.updatePosition({
          top: position.top,
          left: position.left
        });
        if (popoverOptions.tailPosition !== position.tailPosition) {
          if (popoverInstance) {
            popoverInstance.destroy();
          }
          popoverInstance = createPopover$1({
            ...popoverOptions,
            tailPosition: position.tailPosition,
            position: {
              top: position.top,
              left: position.left
            },
            open: true
          });
          popoverContainer.appendChild(popoverInstance.element);
        }
      }
    };
    const createPopoverInstance = () => {
      if (!targetElement || !popoverContainer) return;
      const targetRect = targetElement.getBoundingClientRect();
      const position = calculatePopoverPosition(
        {
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height
        },
        360,
        // Ancho estimado
        200,
        // Alto estimado
        popoverPosition,
        popoverOffset
      );
      popoverInstance = createPopover$1({
        ...popoverOptions,
        tailPosition: position.tailPosition,
        position: {
          top: position.top,
          left: position.left
        },
        open: true,
        onClose: () => {
          if (popoverOptions.onClose) {
            popoverOptions.onClose();
          }
          closeMask();
        }
      });
      popoverContainer.appendChild(popoverInstance.element);
      requestAnimationFrame(() => {
        updateMaskPosition();
      });
    };
    const openMask = () => {
      targetElement = getTargetElement();
      if (!targetElement) {
        console.error("❌ [Mask] No se encontró el elemento objetivo al abrir:", initialTarget);
        return;
      }
      savedScrollY = window.scrollY || window.pageYOffset || 0;
      savedScrollX = window.scrollX || window.pageXOffset || 0;
      const rectBefore = targetElement.getBoundingClientRect();
      overlay.classList.add("ubits-mask-overlay--open");
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = `-${savedScrollX}px`;
      document.body.style.width = "100%";
      overlay.__modifiedParents = [];
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const rectAfter = targetElement.getBoundingClientRect();
          const topDiff = rectAfter.top - rectBefore.top;
          const leftDiff = rectAfter.left - rectBefore.left;
          if (Math.abs(leftDiff) > 0.1 || Math.abs(topDiff) > 0.1) {
            savedTargetRect = rectAfter;
            overlay.__leftCompensation = 0;
            overlay.__topCompensation = 0;
          } else {
            savedTargetRect = rectBefore;
            overlay.__leftCompensation = 0;
            overlay.__topCompensation = 0;
          }
          updateMaskPosition();
          createPopoverInstance();
          const handleResize = () => {
            savedTargetRect = null;
            updateMaskPosition();
          };
          window.addEventListener("scroll", updateMaskPosition, true);
          window.addEventListener("resize", handleResize);
          overlay.__handleResize = handleResize;
          overlay.__handleScroll = updateMaskPosition;
        });
      });
    };
    const closeMask = () => {
      overlay.classList.remove("ubits-mask-overlay--open");
      savedTargetRect = null;
      const handleResize = overlay.__handleResize;
      const handleScroll = overlay.__handleScroll;
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll, true);
      }
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.paddingRight = "";
      const mainElement = document.querySelector("main") || document.querySelector(".main-content") || document.querySelector("#main");
      if (mainElement) {
        mainElement.style.paddingRight = "";
      }
      const modifiedParents = overlay.__modifiedParents || [];
      modifiedParents.forEach((el) => {
        el.style.paddingRight = "";
      });
      overlay.__modifiedParents = [];
      overlay.__leftCompensation = 0;
      overlay.__topCompensation = 0;
      window.scrollTo(savedScrollX, savedScrollY);
      if (popoverInstance) {
        popoverInstance.destroy();
        popoverInstance = null;
      }
      window.removeEventListener("scroll", updateMaskPosition, true);
      window.removeEventListener("resize", updateMaskPosition);
      if (onClose) {
        onClose();
      }
    };
    const updateTarget = (newTarget) => {
      if (typeof newTarget === "string") {
        targetElement = document.querySelector(newTarget);
      } else {
        targetElement = newTarget;
      }
      if (!targetElement) {
        console.error("❌ [Mask] No se encontró el nuevo elemento objetivo:", newTarget);
        return;
      }
      if (overlay.classList.contains("ubits-mask-overlay--open")) {
        updateMaskPosition();
      }
    };
    const destroy = () => {
      closeMask();
      if (overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
      }
    };
    if (closeOnOverlayClick) {
      overlay.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("ubits-mask-layer") || target.classList.contains("ubits-mask-overlay")) {
          closeMask();
        }
      });
    }
    container.appendChild(overlay);
    if (open) {
      if (!targetElement) {
        requestAnimationFrame(() => {
          targetElement = getTargetElement();
          if (targetElement) {
            openMask();
          } else {
            setTimeout(() => {
              targetElement = getTargetElement();
              if (targetElement) {
                openMask();
              }
            }, 100);
          }
        });
      } else {
        openMask();
      }
    }
    return {
      element: overlay,
      open: openMask,
      close: closeMask,
      updateTarget,
      destroy
    };
  }
  if (typeof window !== "undefined") {
    window.createMask = createMask;
    window.renderMask = renderMask;
    if (!window.UBITSMask) {
      window.UBITSMask = {};
    }
    window.UBITSMask.createMask = createMask;
    window.UBITSMask.renderMask = renderMask;
  }
  const Mask = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createMask: createMask$1,
    renderMask: renderMask$1
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$a(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderMenuBadge(badge) {
    const badgeOptions = {
      content: typeof badge.content === "number" ? String(badge.content) : badge.content,
      variant: badge.variant || "error",
      // Cambiar de 'primary' a 'error' (primary ya no existe)
      type: "number",
      size: "sm",
      style: "light"
      // Usar style light para badges en menu
    };
    return renderBadge(badgeOptions);
  }
  function renderMenuItem(item, sectionId) {
    const classes = [
      "ubits-menu-item",
      item.active && "ubits-menu-item--active",
      item.disabled && "ubits-menu-item--disabled"
    ].filter(Boolean).join(" ");
    const iconHTML = item.icon ? renderIconHelper$a(item.icon, item.iconStyle) : "";
    const badgeHTML = item.badge ? renderMenuBadge(item.badge) : "";
    const rightContent = badgeHTML;
    const onClickAttr = item.onClick ? 'data-has-click-handler="true"' : "";
    const hrefAttr = item.href ? `data-href="${item.href}"` : "";
    const disabledAttr = item.disabled ? "disabled" : "";
    return `
    <button 
      class="${classes}" 
      data-item-id="${item.id}"
      data-section-id="${sectionId}"
      ${onClickAttr}
      ${hrefAttr}
      ${disabledAttr}
    >
      ${iconHTML ? `<span class="ubits-menu-item-icon">${iconHTML}</span>` : ""}
      <span class="ubits-menu-item-label">${item.label}</span>
      ${rightContent ? `<span class="ubits-menu-item-right">${rightContent}</span>` : ""}
    </button>
  `;
  }
  function renderSection(section) {
    return `
    <div class="ubits-menu-section" data-section-id="${section.id}">
      <h3 class="ubits-menu-section-title">${section.title}</h3>
      <div class="ubits-menu-section-items">
        ${section.items.map((item) => renderMenuItem(item, section.id)).join("")}
      </div>
    </div>
  `;
  }
  function renderUserInfo(userInfo) {
    if (!userInfo) return "";
    const onClickAttr = userInfo.onAvatarClick ? 'data-has-click-handler="true"' : "";
    return `
    <div class="ubits-menu-user-info">
      <div class="ubits-menu-user-avatar" ${onClickAttr}>
        <img src="${userInfo.avatarImage}" alt="${userInfo.name}" />
      </div>
      <div class="ubits-menu-user-details">
        <div class="ubits-menu-user-name">${userInfo.name}</div>
        <div class="ubits-menu-user-role">${userInfo.role}</div>
      </div>
    </div>
  `;
  }
  function renderMenu(options) {
    const {
      logoImage,
      appName,
      logoHref,
      sections,
      userInfo,
      width,
      className = "",
      attributes = {}
    } = options;
    const containerClasses = ["ubits-menu", className].filter(Boolean).join(" ");
    const containerAttrs = Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
    const widthStyle = width ? `width: ${typeof width === "number" ? `${width}px` : width};` : "";
    const logoHTML = logoImage ? `
    <div class="ubits-menu-header">
      <div class="ubits-menu-logo" ${logoHref ? `data-href="${logoHref}"` : ""}>
        <img src="${logoImage}" alt="${appName || "Logo"}" />
      </div>
      ${appName ? `<div class="ubits-menu-app-name">${appName}</div>` : ""}
    </div>
  ` : "";
    const sectionsHTML = sections.map((section) => renderSection(section)).join("");
    const userInfoHTML = renderUserInfo(userInfo);
    return `
    <aside class="${containerClasses}" ${containerAttrs} style="${widthStyle}">
      ${logoHTML}
      <div class="ubits-menu-body">
        ${sectionsHTML}
      </div>
      ${userInfoHTML}
    </aside>
  `.trim();
  }
  function initMenuEvents(menuElement, options) {
    const logoElement = menuElement.querySelector(".ubits-menu-logo");
    if (logoElement && options.logoHref) {
      logoElement.addEventListener("click", () => {
        window.location.href = options.logoHref;
      });
    }
    const menuItems = menuElement.querySelectorAll(".ubits-menu-item");
    menuItems.forEach((itemElement) => {
      const itemId = itemElement.getAttribute("data-item-id");
      const sectionId = itemElement.getAttribute("data-section-id");
      if (!itemId || !sectionId) return;
      const section = options.sections.find((s) => s.id === sectionId);
      const item = section?.items.find((i) => i.id === itemId);
      if (!item) return;
      itemElement.addEventListener("click", (e) => {
        e.preventDefault();
        if (item.disabled) return;
        menuItems.forEach((btn) => btn.classList.remove("ubits-menu-item--active"));
        itemElement.classList.add("ubits-menu-item--active");
        if (options.onActiveItemChange) {
          options.onActiveItemChange(itemId, sectionId);
        }
        if (item.onClick) {
          item.onClick(e, item);
        } else if (item.href) {
          window.location.href = item.href;
        }
      });
    });
    const avatarElement = menuElement.querySelector(".ubits-menu-user-avatar");
    if (avatarElement && options.userInfo?.onAvatarClick) {
      avatarElement.addEventListener("click", (e) => {
        e.preventDefault();
        options.userInfo.onAvatarClick();
      });
    }
  }
  function createMenu(options) {
    const { containerId } = options;
    let container = null;
    if (containerId) {
      container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Container with id "${containerId}" not found`);
      }
    } else {
      container = document.createElement("div");
      document.body.appendChild(container);
    }
    const menuHTML = renderMenu(options);
    container.innerHTML = menuHTML;
    const menuElement = container.querySelector(".ubits-menu");
    if (!menuElement) {
      throw new Error("Failed to create menu element");
    }
    initMenuEvents(menuElement, options);
    return menuElement;
  }
  function updateActiveMenuItem(containerId, itemId, sectionId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const menuElement = container.querySelector(".ubits-menu");
    if (!menuElement) return;
    const allItems = menuElement.querySelectorAll(".ubits-menu-item");
    allItems.forEach((item) => item.classList.remove("ubits-menu-item--active"));
    const targetItem = menuElement.querySelector(
      `[data-item-id="${itemId}"][data-section-id="${sectionId}"]`
    );
    if (targetItem) {
      targetItem.classList.add("ubits-menu-item--active");
    }
  }
  const Menu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createMenu,
    renderMenu,
    updateActiveMenuItem
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$9(iconName, iconStyle = "regular", iconColor) {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    const colorStyle = iconColor ? `style="color: ${iconColor};"` : "";
    return `<i class="${iconClass} ${name}" ${colorStyle}></i>`;
  }
  function formatValue$1(value) {
    if (typeof value === "number") {
      return value.toLocaleString("es-ES");
    }
    return String(value);
  }
  function renderMetricCard(options) {
    const {
      title,
      value,
      label,
      titleIcon,
      titleIconStyle = "regular",
      titleIconColor,
      showInfoIcon = false,
      showActionButton = false,
      size = "md",
      className = "",
      attributes = {}
    } = options;
    const classes = ["ubits-metric-card", `ubits-metric-card--${size}`, className].filter(Boolean).join(" ");
    const attrs = [...Object.entries(attributes).map(([key, value2]) => `${key}="${value2}"`)].filter(Boolean).join(" ");
    const titleIconHTML = titleIcon ? `<div class="ubits-metric-card__title-icon">${renderIconHelper$9(titleIcon, titleIconStyle, titleIconColor)}</div>` : "";
    const infoIconHTML = showInfoIcon ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "circle-info",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Información",
        type: "button"
      }
    }) : "";
    const actionButtonHTML = showActionButton ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "chevron-right",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Ver más",
        type: "button"
      }
    }) : "";
    const titleSizeClass = "ubits-body-md-regular";
    const labelSizeClass = size === "sm" ? "ubits-body-sm-regular" : "ubits-body-md-regular";
    const valueClass = "ubits-heading-h2";
    const formattedValue = formatValue$1(value);
    return `
    <div class="${classes}" ${attrs}>
      <div class="ubits-metric-card__header">
        ${titleIconHTML}
        <div class="ubits-metric-card__title-group">
          <h3 class="ubits-metric-card__title ${titleSizeClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-metric-card__action-button">${actionButtonHTML}</div>` : ""}
      </div>
      <div class="ubits-metric-card__body">
        <div class="ubits-metric-card__value-wrapper">
          <h2 class="ubits-metric-card__value ${valueClass}">${formattedValue}</h2>
          <div class="ubits-metric-card__label ${labelSizeClass}">${label}</div>
        </div>
      </div>
    </div>
  `;
  }
  function createMetricCard(options) {
    const { containerId, ...cardOptions } = options;
    if (!containerId) {
      console.error("❌ [MetricCard] containerId es requerido para createMetricCard");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ [MetricCard] Contenedor con ID "${containerId}" no encontrado`);
      return null;
    }
    const html = renderMetricCard(cardOptions);
    container.innerHTML = html;
    const cardElement = container.querySelector(".ubits-metric-card");
    if (!cardElement) {
      console.error("❌ [MetricCard] No se pudo crear el elemento de la tarjeta");
      return null;
    }
    if (cardOptions.onClick) {
      cardElement.addEventListener("click", cardOptions.onClick);
    }
    console.log("✅ [MetricCard] Tarjeta creada exitosamente");
    return cardElement;
  }
  const MetricCard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createMetricCard,
    renderMetricCard
  }, Symbol.toStringTag, { value: "Module" }));
  if (typeof window !== "undefined") {
    window.createModal = createModal;
    window.renderModal = renderModal;
    if (!window.UBITSModal) {
      window.UBITSModal = {};
    }
    window.UBITSModal.createModal = createModal;
    window.UBITSModal.renderModal = renderModal;
  }
  const Modal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createModal,
    renderModal
  }, Symbol.toStringTag, { value: "Module" }));
  function calculatePercentage$1(current, total) {
    if (total === 0) return 0;
    return Math.round(current / total * 100);
  }
  function renderSemicircularGauge(score, size = 200, strokeWidth = 16, lowColor = "var(--modifiers-normal-color-light-feedback-accent-error)", mediumColor = "var(--modifiers-normal-color-light-feedback-accent-warning)", highColor = "var(--modifiers-normal-color-light-feedback-accent-success)", backgroundColor = "var(--modifiers-normal-color-light-bg-3)") {
    const padding = strokeWidth / 2;
    const radius = (size - padding * 2) / 2;
    const centerX = size / 2;
    const centerY = size - padding;
    const startAngle = 180;
    const endAngle = 0;
    const angleToCoords = (angleDeg, r) => {
      const angleRad = angleDeg * Math.PI / 180;
      const x = centerX + r * Math.cos(angleRad);
      const y = centerY + r * Math.sin(angleRad);
      return { x, y };
    };
    const startCoords = angleToCoords(startAngle, radius);
    const endCoords = angleToCoords(endAngle, radius);
    const backgroundPath = `M ${startCoords.x} ${startCoords.y} A ${radius} ${radius} 0 1 1 ${endCoords.x} ${endCoords.y}`;
    const progressColor = "var(--modifiers-normal-chart-color-bg-neutral-blue-base)";
    let scoreAngle;
    if (score <= 50) {
      scoreAngle = 180 + score / 50 * 90;
    } else {
      scoreAngle = 270 + (score - 50) / 50 * 90;
      if (scoreAngle >= 360) {
        scoreAngle = scoreAngle - 360;
      }
    }
    const scoreCoords = angleToCoords(scoreAngle, radius);
    const angleDiff = scoreAngle > startAngle ? scoreAngle - startAngle : 360 - startAngle + scoreAngle;
    const progressLargeArcFlag = angleDiff > 180 ? 1 : 0;
    const progressPath = `M ${startCoords.x} ${startCoords.y} A ${radius} ${radius} 0 ${progressLargeArcFlag} 1 ${scoreCoords.x} ${scoreCoords.y}`;
    const topPoint = angleToCoords(270, radius);
    const halfMoonCenterY = centerY - radius / 2;
    const halfMoonCenterPercent = halfMoonCenterY / size * 100;
    const marks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const markElements = marks.map((mark) => {
      let markAngle;
      if (mark <= 50) {
        markAngle = 180 + mark / 50 * 90;
      } else {
        markAngle = 270 + (mark - 50) / 50 * 90;
        if (markAngle >= 360) {
          markAngle = markAngle - 360;
        }
      }
      const textDistance = radius + 20;
      const textPos = angleToCoords(markAngle, textDistance);
      return `
      <text
        x="${textPos.x}"
        y="${textPos.y}"
        font-family="var(--font-family-noto-sans-font-family)"
        font-size="var(--modifiers-normal-body-sm-regular-fontsize)"
        font-weight="var(--weight-regular, 400)"
        fill="var(--modifiers-normal-color-light-fg-2-medium)"
        text-anchor="middle"
        dominant-baseline="middle"
        style="font-size: var(--modifiers-normal-body-sm-regular-fontsize) !important; font-weight: var(--weight-regular, 400) !important; font-family: var(--font-family-noto-sans-font-family) !important;"
      >${mark}</text>
    `;
    }).join("");
    const viewBoxPadding = 30;
    const viewBoxSize = size + viewBoxPadding * 2;
    const viewBoxStartY = topPoint.y - 20;
    const viewBoxHeight = size - viewBoxStartY + viewBoxPadding;
    return `
    <svg 
      class="ubits-nps-card__gauge-svg" 
      width="${size}" 
      height="${size}" 
      viewBox="${-viewBoxPadding} ${viewBoxStartY} ${viewBoxSize} ${viewBoxHeight}"
      data-half-moon-center="${halfMoonCenterPercent}"
      style="overflow: visible; display: block;"
    >
      <!-- Media luna básica (arco gris de fondo) -->
      <path
        d="${backgroundPath}"
        fill="none"
        stroke="${backgroundColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
      />
      
      <!-- Arco de progreso (relleno hasta el score) -->
      <path
        d="${progressPath}"
        fill="none"
        stroke="${progressColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        class="ubits-nps-card__gauge-progress"
      />
      
      <!-- Números alrededor de la media luna -->
      ${markElements}
    </svg>
  `;
  }
  function renderCategory$1(category, size = "md") {
    const percentage = category.percentage ?? calculatePercentage$1(category.current, category.total);
    const labelClass = size === "sm" ? "ubits-body-sm-regular" : size === "lg" ? "ubits-body-md-regular" : "ubits-body-sm-regular";
    const valueClass = size === "sm" ? "ubits-body-sm-regular" : size === "lg" ? "ubits-body-md-regular" : "ubits-body-sm-regular";
    const percentageClass = "ubits-body-md-bold";
    return `
    <div class="ubits-nps-card__category">
      <div class="ubits-nps-card__category-label ${labelClass}">
        ${category.label}
      </div>
      <div class="ubits-nps-card__category-value ${valueClass}">
        ${category.current}/${category.total} <span class="ubits-nps-card__category-percentage ${percentageClass}">${percentage}%</span>
      </div>
    </div>
  `;
  }
  function renderNPSCard(options) {
    const {
      title = "Nivel de confianza",
      score = 0,
      scoreLabel = "Puntuación",
      totalResponses = 0,
      responsesLabel = "respuestas",
      categories = [],
      size = "md",
      showTitle = true,
      showResponsesCount = true,
      showGauge = true,
      showCategories = true,
      showInfoIcon = false,
      showActionButton = false,
      lowColor = "var(--modifiers-normal-color-light-feedback-accent-error)",
      mediumColor = "var(--modifiers-normal-color-light-feedback-accent-warning)",
      highColor = "var(--modifiers-normal-color-light-feedback-accent-success)",
      gaugeBackgroundColor = "var(--modifiers-normal-color-light-bg-3)",
      className = "",
      attributes = {}
    } = options;
    const classes = ["ubits-nps-card", `ubits-nps-card--${size}`, className].filter(Boolean).join(" ");
    const attrs = [...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)].filter(Boolean).join(" ");
    const gaugeSize = 360;
    const strokeWidth = 24;
    const titleClass = "ubits-body-md-bold";
    const responsesCountClass = "ubits-body-sm-regular";
    const scoreClass = "ubits-display-3-bold";
    const scoreLabelClass = "ubits-body-sm-bold";
    const infoIconHTML = showInfoIcon ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "circle-info",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Información",
        type: "button"
      }
    }) : "";
    const actionButtonHTML = showActionButton ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "chevron-right",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Ver más",
        type: "button"
      }
    }) : "";
    const headerHTML = showTitle || showResponsesCount ? `
      <div class="ubits-nps-card__header" style="margin-bottom: -16px !important; padding-bottom: 0 !important;">
        <div class="ubits-nps-card__title-group">
          ${showTitle ? `<h3 class="ubits-nps-card__title ${titleClass}">${title}</h3>` : ""}
          ${infoIconHTML}
        </div>
        ${showResponsesCount ? `<div class="ubits-nps-card__responses-count ${responsesCountClass}">${totalResponses} ${responsesLabel}</div>` : ""}
        ${actionButtonHTML ? `<div class="ubits-nps-card__action-button">${actionButtonHTML}</div>` : ""}
      </div>
    ` : "";
    const textPadding = strokeWidth / 2;
    const textRadius = (gaugeSize - textPadding * 2) / 2;
    const textCenterY = gaugeSize - textPadding;
    const textPositionY = textCenterY - textRadius * 0.75;
    const textPositionPercent = textPositionY / gaugeSize * 100;
    const gaugeHTML = showGauge ? `
      <div class="ubits-nps-card__gauge-wrapper" style="--text-position: ${textPositionPercent}%;">
        ${renderSemicircularGauge(
      score,
      gaugeSize,
      strokeWidth,
      lowColor,
      mediumColor,
      highColor,
      gaugeBackgroundColor
    )}
        <div class="ubits-nps-card__gauge-content">
          <div class="ubits-nps-card__gauge-score ${scoreClass}">
            ${score}
          </div>
          <div class="ubits-nps-card__gauge-label ${scoreLabelClass}">
            ${scoreLabel}
          </div>
        </div>
      </div>
    ` : "";
    const categoriesHTML = showCategories && categories.length > 0 ? `
      <div class="ubits-nps-card__categories">
        ${categories.map((cat) => renderCategory$1(cat, size)).join("")}
      </div>
    ` : "";
    const contentStyle = !showCategories || categories.length === 0 ? "padding-bottom: 12px;" : "";
    return `
    <div class="${classes}" ${attrs}>
      ${headerHTML}
      <div class="ubits-nps-card__content" style="${contentStyle}">
        ${gaugeHTML}
        ${categoriesHTML}
      </div>
    </div>
  `;
  }
  function createNPSCard(options) {
    const { containerId, ...cardOptions } = options;
    if (!containerId) {
      console.error("❌ [NPSCard] containerId es requerido para createNPSCard");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ [NPSCard] Contenedor con ID "${containerId}" no encontrado`);
      return null;
    }
    const html = renderNPSCard(cardOptions);
    container.innerHTML = html;
    const cardElement = container.querySelector(".ubits-nps-card");
    if (!cardElement) {
      console.error("❌ [NPSCard] No se pudo crear el elemento de la tarjeta");
      return null;
    }
    if (cardOptions.onClick) {
      cardElement.addEventListener("click", cardOptions.onClick);
    }
    console.log("✅ [NPSCard] Tarjeta creada exitosamente");
    return cardElement;
  }
  const NpsCard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createNPSCard,
    renderNPSCard
  }, Symbol.toStringTag, { value: "Module" }));
  class UBITSPagination extends HTMLElement {
    constructor() {
      super(...arguments);
      this.options = {
        totalPages: 1
      };
    }
    connectedCallback() {
      this.render();
    }
    static get observedAttributes() {
      return ["variant", "size", "current-page", "total-pages"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
    setOptions(options) {
      this.options = { ...this.options, ...options };
      this.render();
    }
    getOptions() {
      return { ...this.options };
    }
    render() {
      const variant = this.getAttribute("variant") || this.options.variant;
      const size = this.getAttribute("size") || this.options.size;
      const currentPage = parseInt(
        this.getAttribute("current-page") || String(this.options.currentPage || 1)
      );
      const totalPages = parseInt(
        this.getAttribute("total-pages") || String(this.options.totalPages || 1)
      );
      const finalOptions = {
        ...this.options,
        variant,
        size,
        currentPage,
        totalPages
      };
      this.innerHTML = renderPagination(finalOptions);
      if (this.options.onPageChange) {
        const buttons = this.querySelectorAll("button");
        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const page = parseInt(button.getAttribute("data-page") || "1");
            this.options.onPageChange?.(page);
          });
        });
      }
    }
  }
  if (typeof window !== "undefined" && !customElements.get("ubits-pagination")) {
    customElements.define("ubits-pagination", UBITSPagination);
  }
  const PaginationComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    UBITSPagination
  }, Symbol.toStringTag, { value: "Module" }));
  class PaginationAddon {
    constructor() {
      this.name = "@ubits/pagination";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-pagination")) {
        customElements.define("ubits-pagination", UBITSPagination);
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.Pagination = {
          render: (options) => {
            const { renderPagination: renderPagination2 } = require("./PaginationProvider");
            return renderPagination2(options);
          },
          create: (options) => {
            const { createPagination: createPagination2 } = require("./PaginationProvider");
            return createPagination2(options);
          }
        };
      }
      console.log("✅ Pagination add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined" && window.UBITS?.Pagination) {
        delete window.UBITS.Pagination;
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-pagination",
          tag: "ubits-pagination",
          documentation: "https://ubits.design/components/pagination"
        }
      ];
    }
    getStyles() {
      return ["./styles/pagination.css"];
    }
  }
  if (typeof window !== "undefined") {
    Promise.resolve().then(() => PaginationComponent).then(() => {
      console.log("✅ UBITS Pagination component registered");
    });
  }
  const Pagination = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    PaginationAddon,
    UBITSPagination,
    createPagination,
    renderPagination
  }, Symbol.toStringTag, { value: "Module" }));
  const STATUS_TAG_MAPPING = {
    bajo: {
      status: "completed",
      // Verde
      label: "Bajo"
    },
    medio: {
      status: "pending",
      // Naranja/Amarillo
      label: "Medio"
    },
    alto: {
      status: "not-fulfilled",
      // Rojo
      label: "Alto"
    },
    "muy-alto": {
      status: "denied",
      // Rojo
      label: "Muy alto"
    }
  };
  function escapeHtml$1(text) {
    if (typeof text !== "string") {
      return "";
    }
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function renderParticipantStatusTag(status) {
    const mapping = STATUS_TAG_MAPPING[status];
    const statusTagOptions = {
      label: mapping.label,
      size: "xs",
      status: mapping.status,
      rightIcon: null,
      // Sin icono derecho
      className: "ubits-participants-menu__status-tag"
    };
    return renderStatusTag(statusTagOptions);
  }
  function renderParticipantAvatar(participant) {
    const avatarOptions = {
      size: "sm",
      // 28px para el menú de participantes
      alt: participant.name,
      className: "ubits-participants-menu__avatar"
    };
    if (participant.avatarImage) {
      avatarOptions.imageUrl = participant.avatarImage;
    } else {
      avatarOptions.initials = participant.name;
    }
    return renderAvatar(avatarOptions);
  }
  function renderParticipant(participant, isSelected, showAvatar = true, showRole = true, showStatusTag = true) {
    const itemClasses = [
      "ubits-participants-menu__item",
      isSelected ? "ubits-participants-menu__item--selected" : ""
    ].filter(Boolean).join(" ");
    const nameColor = isSelected ? "var(--modifiers-normal-color-light-accent-brand)" : "var(--modifiers-normal-color-light-fg-1-high)";
    const statusTag = showStatusTag && participant.status ? renderParticipantStatusTag(participant.status) : "";
    const avatar = showAvatar ? renderParticipantAvatar(participant) : "";
    return `
    <div class="${itemClasses}" data-participant-id="${escapeHtml$1(participant.id)}" style="
      display: flex;
      align-items: center;
      gap: var(--ubits-spacing-sm);
      padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
      max-height: calc(var(--ubits-spacing-12) - var(--ubits-spacing-xs));
      min-height: calc(var(--ubits-spacing-12) - var(--ubits-spacing-xs));
      box-sizing: border-box;
      border-radius: var(--ubits-border-radius-md);
      cursor: pointer;
      transition: background-color 0.2s ease;
      ${isSelected ? "background-color: var(--modifiers-normal-color-light-bg-active);" : ""}
    ">
      ${avatar}
      <div class="ubits-participants-menu__item-content" style="
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: var(--ubits-spacing-none);
        justify-content: center;
      ">
        <div class="ubits-participants-menu__item-name ubits-body-sm-bold" style="
          color: ${nameColor};
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-bold, 700);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
        ">
          ${escapeHtml$1(participant.name)}
        </div>
        ${showRole ? `
        <div class="ubits-participants-menu__item-role ubits-body-sm-regular" style="
          color: var(--modifiers-normal-color-light-fg-1-medium);
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-regular, 400);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
          margin-top: calc(var(--ubits-spacing-xs) * -0.5);
        ">
          ${escapeHtml$1(participant.role)}
        </div>
        ` : ""}
      </div>
      ${statusTag ? `<div style="flex-shrink: 0;">${statusTag}</div>` : ""}
    </div>
  `.trim();
  }
  function renderParticipantsMenu(options) {
    const {
      title = "Participantes",
      searchPlaceholder = "Buscar participan...",
      participants = [],
      selectedParticipantId,
      className = "",
      showAvatar = true,
      showRole = true,
      showStatusTag = true,
      enableScrollbar = true
    } = options;
    const classes = ["ubits-participants-menu", className].filter(Boolean).join(" ");
    const maxItemsWithoutScroll = 6;
    const participantsToShow = enableScrollbar ? participants : participants.slice(0, maxItemsWithoutScroll);
    const participantsHtml = participantsToShow.map((participant) => {
      const isSelected = participant.id === selectedParticipantId;
      return renderParticipant(participant, isSelected, showAvatar, showRole, showStatusTag);
    }).join("");
    const searchInputId = options.searchInputId || (options.containerId ? `participants-menu-search-${options.containerId}` : `participants-menu-search-${Date.now()}`);
    const searchInputPlaceholder = searchPlaceholder;
    const activeFilters = options.activeFilters || { roles: [], statuses: [] };
    const activeFiltersCount = (activeFilters.roles?.length || 0) + (activeFilters.statuses?.length || 0);
    const filterButtonOptions = {
      variant: "secondary",
      size: "md",
      icon: "filter",
      iconStyle: "regular",
      iconOnly: true,
      active: activeFiltersCount > 0,
      badge: activeFiltersCount > 0,
      // Solo mostrar badge si hay filtros activos
      className: "ubits-participants-menu__filter-button"
    };
    let filterButtonHtml = renderButton(filterButtonOptions);
    if (activeFiltersCount > 0) {
      const badgeHTML = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${activeFiltersCount}</span>`;
      filterButtonHtml = filterButtonHtml.replace(
        '<span class="ubits-button__badge"></span>',
        badgeHTML
      );
    } else {
      filterButtonHtml = filterButtonHtml.replace(/<span class="ubits-button__badge"><\/span>/g, "");
    }
    const hasNoResults = participantsToShow.length === 0;
    const hasSearchTerm = options.searchTerm && options.searchTerm.trim() !== "";
    const hasActiveFilters = activeFiltersCount > 0;
    let emptyStateHTML = "";
    if (hasNoResults) {
      let emptyStateConfig;
      if (hasSearchTerm) {
        emptyStateConfig = {
          title: "No se encontraron resultados",
          description: "Intenta con otros términos de búsqueda",
          icon: "search"
        };
      } else if (hasActiveFilters) {
        emptyStateConfig = {
          title: "No hay resultados",
          description: "No se encontraron participantes con los filtros aplicados",
          icon: "filter"
        };
      } else {
        emptyStateConfig = {
          title: "No hay participantes",
          description: "No hay participantes para mostrar",
          icon: "users"
        };
      }
      if (emptyStateConfig) {
        emptyStateHTML = renderEmptyState({
          title: escapeHtml$1(emptyStateConfig.title),
          description: emptyStateConfig.description ? escapeHtml$1(emptyStateConfig.description) : void 0,
          icon: emptyStateConfig.icon
        });
      }
    }
    return `
    <div class="${classes}">
      <div class="ubits-participants-menu__header">
        <h2 class="ubits-participants-menu__title ubits-body-md-bold" style="
          margin: 0;
          font-size: var(--modifiers-normal-body-md-regular-fontsize);
          font-weight: var(--weight-bold, 700);
          line-height: var(--modifiers-normal-body-md-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-high);
          margin-bottom: var(--ubits-spacing-md);
        ">
          ${escapeHtml$1(title)}
        </h2>
        <div class="ubits-participants-menu__search-container" style="
          display: flex;
          gap: var(--ubits-spacing-sm);
          margin-bottom: var(--ubits-spacing-md);
        ">
          <div class="ubits-participants-menu__search-input-wrapper" style="
            flex: 1;
          ">
            <div id="${searchInputId}" data-search-placeholder="${escapeHtml$1(searchInputPlaceholder)}"></div>
          </div>
          <div class="ubits-participants-menu__filter-button-wrapper">
            ${filterButtonHtml}
          </div>
        </div>
      </div>
      <div class="ubits-participants-menu__list-wrapper" style="
        display: flex;
        flex: 1;
        min-height: 0;
        position: relative;
      ">
        <div 
          class="ubits-participants-menu__list" 
          id="participants-menu-list-${Date.now()}"
          data-scrollable="true"
          ${enableScrollbar ? 'data-ubits-scrollbar="true"' : ""}
          style="
            display: flex;
            flex-direction: column;
            gap: 2px;
            ${enableScrollbar ? "overflow-y: auto;" : "overflow-y: hidden;"}
            flex: 1;
            min-height: 0;
          "
        >
          ${hasNoResults ? emptyStateHTML : participantsHtml}
        </div>
      </div>
    </div>
  `.trim();
  }
  function createParticipantsMenu(options) {
    const {
      containerId,
      onParticipantSelect,
      onSearchChange,
      onFilterClick,
      onFilterChange,
      ...restOptions
    } = options;
    let activeFilters = {
      roles: [],
      statuses: []
    };
    let currentSearchTerm = "";
    const allRoles = Array.from(new Set(restOptions.participants.map((p) => p.role))).sort();
    const allStatuses = ["bajo", "medio", "alto", "muy-alto"];
    const searchInputId = containerId ? `participants-menu-search-${containerId}` : `participants-menu-search-${Date.now()}`;
    const renderMenu2 = () => {
      return renderParticipantsMenu({
        ...restOptions,
        searchInputId,
        activeFilters,
        searchTerm: currentSearchTerm
      });
    };
    const wrapper = document.createElement("div");
    const menuHtml = renderMenu2();
    wrapper.innerHTML = menuHtml;
    const menuElement = wrapper.firstElementChild;
    if (!menuElement) {
      console.error("❌ [ParticipantsMenu] No se pudo crear el elemento del menú");
      throw new Error("No se pudo crear el menú de participantes");
    }
    const insertMenu = () => {
      let container = null;
      if (containerId) {
        container = document.getElementById(containerId);
        if (!container) {
          console.error("❌ [ParticipantsMenu] No se encontró el contenedor con ID:", containerId);
          const allElements = document.querySelectorAll(`[id="${containerId}"]`);
          if (allElements.length > 0) {
            container = allElements[0];
          } else {
            console.error("❌ [ParticipantsMenu] No se encontró ningún elemento con ese ID");
            container = document.body;
          }
        }
      } else {
        container = document.body;
      }
      if (!container) {
        console.error("❌ [ParticipantsMenu] No se pudo obtener un contenedor válido");
        return;
      }
      container.appendChild(menuElement);
      initializeInput();
      updateFilterBadge();
      const renderFiltersContent = () => {
        const rolesHTML = allRoles.map((role, index) => {
          const containerId2 = `filter-role-${index}`;
          return `
          <div class="ubits-participants-menu__filter-item" data-filter-role="${role}">
            <div id="${containerId2}"></div>
          </div>
        `;
        }).join("");
        const statusesHTML = allStatuses.map((status, index) => {
          const containerId2 = `filter-status-${index}`;
          return `
          <div class="ubits-participants-menu__filter-item" data-filter-status="${status}">
            <div id="${containerId2}"></div>
          </div>
        `;
        }).join("");
        return `
        <div class="ubits-participants-menu__filters-container" style="padding: var(--ubits-spacing-6);">
          <div style="margin-bottom: var(--ubits-spacing-6);">
            <h3 style="
              font-size: var(--modifiers-normal-body-md-regular-fontsize);
              font-weight: var(--weight-bold, 700);
              color: var(--modifiers-normal-color-light-fg-1-high);
              margin: 0 0 var(--ubits-spacing-md) 0;
            ">Rol</h3>
            <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-sm);">
              ${rolesHTML}
            </div>
          </div>
          <div style="margin-bottom: var(--ubits-spacing-6);">
            <h3 style="
              font-size: var(--modifiers-normal-body-md-regular-fontsize);
              font-weight: var(--weight-bold, 700);
              color: var(--modifiers-normal-color-light-fg-1-high);
              margin: 0 0 var(--ubits-spacing-md) 0;
            ">Estado</h3>
            <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-sm);">
              ${statusesHTML}
            </div>
          </div>
        </div>
      `;
      };
      let drawerInstance = null;
      let checkboxInstances = [];
      const openFilterDrawer = () => {
        if (!drawerInstance) {
          try {
            drawerInstance = createDrawer({
              title: "Filtros",
              complementaryText: "Selecciona los filtros que deseas aplicar",
              width: 40,
              bodyContent: renderFiltersContent,
              footerButtons: {
                secondary: {
                  label: "Limpiar",
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    activeFilters = { roles: [], statuses: [] };
                    updateFilterBadge();
                    if (onFilterChange) {
                      onFilterChange(activeFilters);
                    }
                    if (drawerInstance) {
                      drawerInstance.updateContent(renderFiltersContent);
                      setTimeout(() => {
                        createFilterCheckboxes();
                      }, 100);
                    }
                  }
                },
                primary: {
                  label: "Aplicar",
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newFilters = {
                      roles: [],
                      statuses: []
                    };
                    if (drawerInstance) {
                      allRoles.forEach((role, index) => {
                        const filterItem = drawerInstance.element.querySelector(
                          `[data-filter-role="${role}"]`
                        );
                        if (filterItem) {
                          const checkbox = filterItem.querySelector(
                            ".ubits-checkbox__input"
                          );
                          if (checkbox && checkbox.checked) {
                            newFilters.roles.push(role);
                          }
                        }
                      });
                      allStatuses.forEach((status, index) => {
                        const filterItem = drawerInstance.element.querySelector(
                          `[data-filter-status="${status}"]`
                        );
                        if (filterItem) {
                          const checkbox = filterItem.querySelector(
                            ".ubits-checkbox__input"
                          );
                          if (checkbox && checkbox.checked) {
                            newFilters.statuses.push(status);
                          }
                        }
                      });
                    }
                    activeFilters = newFilters;
                    updateFilterBadge();
                    if (onFilterChange) {
                      onFilterChange(activeFilters);
                    }
                    if (drawerInstance) {
                      drawerInstance.close();
                    }
                  }
                }
              },
              closeOnOverlayClick: true,
              onClose: () => {
                checkboxInstances.forEach((instance) => {
                  try {
                    instance.destroy();
                  } catch (e) {
                  }
                });
                checkboxInstances = [];
              }
            });
          } catch (error) {
            console.error("❌ [ParticipantsMenu] Error al crear drawer:", error);
            if (onFilterClick) {
              onFilterClick();
            }
            return;
          }
        } else {
          try {
            drawerInstance.updateContent(renderFiltersContent);
          } catch (error) {
            console.error("❌ [ParticipantsMenu] Error al actualizar drawer:", error);
            if (drawerInstance) {
              drawerInstance.element.remove();
              drawerInstance = null;
              openFilterDrawer();
              return;
            }
          }
        }
        if (drawerInstance) {
          drawerInstance.open();
          setTimeout(() => {
            createFilterCheckboxes();
          }, 300);
        }
      };
      const createFilterCheckboxes = () => {
        if (!drawerInstance) return;
        checkboxInstances.forEach((instance) => {
          try {
            instance.destroy();
          } catch (e) {
          }
        });
        checkboxInstances = [];
        allRoles.forEach((role, index) => {
          const containerId2 = `filter-role-${index}`;
          const inputContainer = drawerInstance.element.querySelector(
            `#${containerId2}`
          );
          if (inputContainer) {
            inputContainer.innerHTML = "";
            const isChecked = activeFilters.roles.includes(role);
            const checkboxHTML = renderCheckbox({
              label: role,
              name: "filter-role",
              value: role,
              checked: isChecked,
              size: "md"
            });
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = checkboxHTML.trim();
            const checkboxElement = tempDiv.firstElementChild;
            if (checkboxElement) {
              inputContainer.appendChild(checkboxElement);
              const inputElement = checkboxElement.querySelector(
                ".ubits-checkbox__input"
              );
              const squareElement = checkboxElement.querySelector(
                ".ubits-checkbox__square"
              );
              if (inputElement && squareElement) {
                inputElement.addEventListener("change", (e) => {
                  const target = e.target;
                  const isChecked2 = target.checked;
                  checkboxElement.classList.toggle("ubits-checkbox--checked", isChecked2);
                  let checkmarkElement = squareElement.querySelector(
                    ".ubits-checkbox__checkmark"
                  );
                  if (isChecked2) {
                    if (!checkmarkElement) {
                      checkmarkElement = document.createElement("span");
                      checkmarkElement.className = "ubits-checkbox__checkmark";
                      squareElement.appendChild(checkmarkElement);
                    }
                    checkmarkElement.style.opacity = "1";
                    checkmarkElement.style.transform = "scale(1)";
                  } else {
                    if (checkmarkElement) {
                      checkmarkElement.style.opacity = "0";
                      checkmarkElement.style.transform = "scale(0)";
                    }
                  }
                });
              }
              checkboxInstances.push({
                element: checkboxElement,
                destroy: () => {
                  if (checkboxElement.parentNode) {
                    checkboxElement.parentNode.removeChild(checkboxElement);
                  }
                },
                update: () => {
                }
              });
            }
          }
        });
        const statusLabels = {
          bajo: "Bajo",
          medio: "Medio",
          alto: "Alto",
          "muy-alto": "Muy Alto"
        };
        allStatuses.forEach((status, index) => {
          const containerId2 = `filter-status-${index}`;
          const inputContainer = drawerInstance.element.querySelector(
            `#${containerId2}`
          );
          if (inputContainer) {
            inputContainer.innerHTML = "";
            const isChecked = activeFilters.statuses.includes(status);
            const checkboxHTML = renderCheckbox({
              label: statusLabels[status],
              name: "filter-status",
              value: status,
              checked: isChecked,
              size: "md"
            });
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = checkboxHTML.trim();
            const checkboxElement = tempDiv.firstElementChild;
            if (checkboxElement) {
              inputContainer.appendChild(checkboxElement);
              const inputElement = checkboxElement.querySelector(
                ".ubits-checkbox__input"
              );
              const squareElement = checkboxElement.querySelector(
                ".ubits-checkbox__square"
              );
              if (inputElement && squareElement) {
                inputElement.addEventListener("change", (e) => {
                  const target = e.target;
                  const isChecked2 = target.checked;
                  checkboxElement.classList.toggle("ubits-checkbox--checked", isChecked2);
                  let checkmarkElement = squareElement.querySelector(
                    ".ubits-checkbox__checkmark"
                  );
                  if (isChecked2) {
                    if (!checkmarkElement) {
                      checkmarkElement = document.createElement("span");
                      checkmarkElement.className = "ubits-checkbox__checkmark";
                      squareElement.appendChild(checkmarkElement);
                    }
                    checkmarkElement.style.opacity = "1";
                    checkmarkElement.style.transform = "scale(1)";
                  } else {
                    if (checkmarkElement) {
                      checkmarkElement.style.opacity = "0";
                      checkmarkElement.style.transform = "scale(0)";
                    }
                  }
                });
              }
              checkboxInstances.push({
                element: checkboxElement,
                destroy: () => {
                  if (checkboxElement.parentNode) {
                    checkboxElement.parentNode.removeChild(checkboxElement);
                  }
                },
                update: () => {
                }
              });
            }
          }
        });
      };
      const filterButton = menuElement.querySelector(
        ".ubits-participants-menu__filter-button"
      );
      if (filterButton) {
        filterButton.addEventListener("click", () => {
          if (onFilterClick) {
            onFilterClick();
          }
          openFilterDrawer();
        });
      }
      const participantItems = menuElement.querySelectorAll("[data-participant-id]");
      participantItems.forEach((item) => {
        const participantId = item.getAttribute("data-participant-id");
        item.addEventListener("click", () => {
          if (participantId && onParticipantSelect) {
            const allPreviousSelected = menuElement.querySelectorAll(
              ".ubits-participants-menu__item--selected"
            );
            allPreviousSelected.forEach((previousItem) => {
              previousItem.classList.remove("ubits-participants-menu__item--selected");
              const previousName = previousItem.querySelector(
                ".ubits-participants-menu__item-name"
              );
              if (previousName) {
                previousName.style.color = "var(--modifiers-normal-color-light-fg-1-high)";
              }
              previousItem.style.backgroundColor = "";
            });
            item.classList.add("ubits-participants-menu__item--selected");
            const newName = item.querySelector(".ubits-participants-menu__item-name");
            if (newName) {
              newName.style.color = "var(--modifiers-normal-color-light-accent-brand)";
            }
            item.style.backgroundColor = "var(--modifiers-normal-color-light-bg-active)";
            const allSelected = menuElement.querySelectorAll(
              ".ubits-participants-menu__item--selected"
            );
            if (allSelected.length > 1) ;
            try {
              onParticipantSelect(participantId);
            } catch (error) {
              console.error("❌ [ParticipantsMenu] Error al ejecutar onParticipantSelect:", error);
            }
          }
        });
      });
      let scrollbarContainer = null;
      if (restOptions.enableScrollbar !== false) {
        const listElement = menuElement.querySelector('[data-scrollable="true"]');
        if (listElement && listElement.id) {
          const listWrapper = menuElement.querySelector(
            ".ubits-participants-menu__list-wrapper"
          );
          if (listWrapper) {
            const scrollbarContainerId = `participants-menu-scrollbar-${Date.now()}`;
            scrollbarContainer = document.createElement("div");
            scrollbarContainer.id = scrollbarContainerId;
            scrollbarContainer.style.cssText = `
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 8px;
            pointer-events: none;
          `;
            listWrapper.style.position = "relative";
            listWrapper.appendChild(scrollbarContainer);
            createScrollbar({
              containerId: scrollbarContainerId,
              targetId: listElement.id,
              orientation: "vertical"
            });
          }
        }
      } else {
        const listElement = menuElement.querySelector('[data-scrollable="true"]');
        if (listElement) {
          listElement.removeAttribute("data-ubits-scrollbar");
        }
      }
    };
    let inputInstance = null;
    let isRestoringValue = false;
    const updateFilterBadge = () => {
      const filterButton = menuElement.querySelector(
        ".ubits-participants-menu__filter-button"
      );
      if (!filterButton) return;
      const activeFiltersCount = (activeFilters.roles?.length || 0) + (activeFilters.statuses?.length || 0);
      const badgeElement = filterButton.querySelector(".ubits-button__badge");
      if (activeFiltersCount > 0) {
        if (badgeElement) {
          if (badgeElement.classList.contains("ubits-badge--number")) {
            badgeElement.textContent = `${activeFiltersCount}`;
          } else {
            const newBadgeHTML = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${activeFiltersCount}</span>`;
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = newBadgeHTML;
            const newBadge = tempDiv.firstElementChild;
            if (newBadge && badgeElement.parentNode) {
              badgeElement.parentNode.replaceChild(newBadge, badgeElement);
            }
          }
        } else {
          const newBadge = document.createElement("span");
          newBadge.className = "ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge";
          newBadge.textContent = `${activeFiltersCount}`;
          filterButton.appendChild(newBadge);
        }
        filterButton.classList.add("ubits-button--active");
      } else {
        if (badgeElement) {
          badgeElement.remove();
        }
        filterButton.classList.remove("ubits-button--active");
      }
    };
    const initializeInput = () => {
      setTimeout(() => {
        const searchInputContainer = menuElement.querySelector(`#${searchInputId}`);
        if (searchInputContainer) {
          const placeholder = searchInputContainer.getAttribute("data-search-placeholder") || options.searchPlaceholder || "Buscar participan...";
          const preservedValue = options.preservedSearchValue || "";
          const inputOptions = {
            containerId: searchInputId,
            type: "search",
            size: "md",
            placeholder,
            showLabel: false,
            className: "ubits-participants-menu__search-input",
            value: preservedValue,
            onChange: (value, event) => {
              if (isRestoringValue) {
                return;
              }
              currentSearchTerm = value || "";
              if (onSearchChange) {
                try {
                  onSearchChange(value);
                } catch (error) {
                  console.error("[ParticipantsMenu] Error en onSearchChange:", error);
                }
              }
              updateFilterBadge();
            }
          };
          if (preservedValue) {
            isRestoringValue = true;
          }
          inputInstance = createInput(inputOptions);
          if (inputInstance?.inputElement) {
            if (preservedValue && inputInstance.inputElement.value !== preservedValue) {
              inputInstance.setValue(preservedValue);
            }
            setTimeout(() => {
              isRestoringValue = false;
            }, 150);
          } else {
            isRestoringValue = false;
            console.error("[ParticipantsMenu] No se pudo crear input");
          }
        }
      }, 0);
    };
    if (containerId) {
      requestAnimationFrame(() => {
        if (!document.getElementById(containerId)) {
          requestAnimationFrame(insertMenu);
        } else {
          insertMenu();
        }
      });
    } else {
      insertMenu();
    }
    const updateParticipantsList = (newParticipants, newSelectedParticipantId) => {
      const listElement = menuElement.querySelector(".ubits-participants-menu__list");
      if (!listElement) {
        return;
      }
      const maxItemsWithoutScroll = 6;
      const participantsToShow = restOptions.enableScrollbar !== false ? newParticipants : newParticipants.slice(0, maxItemsWithoutScroll);
      const participantsHtml = participantsToShow.map((participant) => {
        const isSelected = participant.id === newSelectedParticipantId;
        return renderParticipant(
          participant,
          isSelected,
          restOptions.showAvatar !== false,
          restOptions.showRole !== false,
          restOptions.showStatusTag !== false
        );
      }).join("");
      const hasNoResults = participantsToShow.length === 0;
      const hasSearchTerm = currentSearchTerm && currentSearchTerm.trim() !== "";
      const hasActiveFilters = (activeFilters.roles?.length || 0) + (activeFilters.statuses?.length || 0) > 0;
      let emptyStateHTML = "";
      if (hasNoResults) {
        let emptyStateConfig;
        if (hasSearchTerm) {
          emptyStateConfig = {
            title: "No se encontraron resultados",
            description: "Intenta con otros términos de búsqueda",
            icon: "search"
          };
        } else if (hasActiveFilters) {
          emptyStateConfig = {
            title: "No hay resultados",
            description: "No se encontraron participantes con los filtros aplicados",
            icon: "filter"
          };
        } else {
          emptyStateConfig = {
            title: "No hay participantes",
            description: "No hay participantes para mostrar",
            icon: "users"
          };
        }
        if (emptyStateConfig) {
          emptyStateHTML = renderEmptyState({
            title: escapeHtml$1(emptyStateConfig.title),
            description: emptyStateConfig.description ? escapeHtml$1(emptyStateConfig.description) : void 0,
            icon: emptyStateConfig.icon
          });
        }
      }
      listElement.innerHTML = hasNoResults ? emptyStateHTML : participantsHtml;
      if (!hasNoResults) {
        const participantItems = menuElement.querySelectorAll("[data-participant-id]");
        participantItems.forEach((item) => {
          const participantId = item.getAttribute("data-participant-id");
          const newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
          newItem.addEventListener("click", () => {
            if (participantId && onParticipantSelect) {
              const allPreviousSelected = menuElement.querySelectorAll(
                ".ubits-participants-menu__item--selected"
              );
              allPreviousSelected.forEach((previousItem) => {
                previousItem.classList.remove("ubits-participants-menu__item--selected");
                const previousName = previousItem.querySelector(
                  ".ubits-participants-menu__item-name"
                );
                if (previousName) {
                  previousName.style.color = "var(--modifiers-normal-color-light-fg-1-high)";
                }
                previousItem.style.backgroundColor = "";
              });
              newItem.classList.add("ubits-participants-menu__item--selected");
              const newName = newItem.querySelector(
                ".ubits-participants-menu__item-name"
              );
              if (newName) {
                newName.style.color = "var(--modifiers-normal-color-light-accent-brand)";
              }
              newItem.style.backgroundColor = "var(--modifiers-normal-color-light-bg-active)";
              try {
                onParticipantSelect(participantId);
              } catch (error) {
                console.error("❌ [ParticipantsMenu] Error al ejecutar onParticipantSelect:", error);
              }
            }
          });
        });
      }
      updateFilterBadge();
    };
    const update = (newOptions) => {
      const onlyParticipantsChanged = newOptions.participants && Object.keys(newOptions).every(
        (key) => key === "participants" || key === "selectedParticipantId"
      );
      if (onlyParticipantsChanged && inputInstance) {
        updateParticipantsList(newOptions.participants, newOptions.selectedParticipantId);
        return;
      }
      if (newOptions.enableScrollbar !== void 0 && newOptions.enableScrollbar !== restOptions.enableScrollbar) {
        const listWrapper = menuElement.querySelector(
          ".ubits-participants-menu__list-wrapper"
        );
        if (listWrapper) {
          const existingScrollbar = listWrapper.querySelector(
            '[id^="participants-menu-scrollbar-"]'
          );
          if (existingScrollbar) {
            existingScrollbar.remove();
          }
        }
      }
      const updatedOptions = { ...restOptions, ...newOptions };
      const newHtml = renderParticipantsMenu({
        ...updatedOptions,
        searchInputId,
        activeFilters,
        searchTerm: currentSearchTerm
      });
      const newWrapper = document.createElement("div");
      newWrapper.innerHTML = newHtml;
      const newElement = newWrapper.firstElementChild;
      if (newElement && menuElement.parentNode) {
        menuElement.parentNode.replaceChild(newElement, menuElement);
        Object.assign(menuElement, newElement);
        initializeInput();
        updateFilterBadge();
        if (updatedOptions.enableScrollbar !== false) {
          const listElement = menuElement.querySelector('[data-scrollable="true"]');
          if (listElement && listElement.id) {
            const listWrapper = menuElement.querySelector(
              ".ubits-participants-menu__list-wrapper"
            );
            if (listWrapper) {
              const scrollbarContainerId = `participants-menu-scrollbar-${Date.now()}`;
              const scrollbarContainer = document.createElement("div");
              scrollbarContainer.id = scrollbarContainerId;
              scrollbarContainer.style.cssText = `
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 8px;
              pointer-events: none;
            `;
              listWrapper.style.position = "relative";
              listWrapper.appendChild(scrollbarContainer);
              createScrollbar({
                containerId: scrollbarContainerId,
                targetId: listElement.id,
                orientation: "vertical"
              });
            }
          }
        } else {
          const listElement = menuElement.querySelector('[data-scrollable="true"]');
          if (listElement) {
            listElement.removeAttribute("data-ubits-scrollbar");
          }
        }
      }
    };
    const destroy = () => {
      if (menuElement.parentNode) {
        menuElement.parentNode.removeChild(menuElement);
      }
    };
    return {
      element: menuElement,
      update,
      updateParticipantsList,
      // Exponer método para actualizar solo la lista
      destroy
    };
  }
  const ParticipantsMenu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createParticipantsMenu,
    renderParticipantsMenu
  }, Symbol.toStringTag, { value: "Module" }));
  if (typeof window !== "undefined") {
    window.createPopover = createPopover;
    window.renderPopover = renderPopover;
    if (!window.UBITSPopover) {
      window.UBITSPopover = {};
    }
    window.UBITSPopover.createPopover = createPopover;
    window.UBITSPopover.renderPopover = renderPopover;
  }
  const Popover = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createPopover: createPopover$1,
    renderPopover: renderPopover$1
  }, Symbol.toStringTag, { value: "Module" }));
  if (typeof window !== "undefined") {
    window.createProgressBar = createProgressBar;
    window.renderProgressBar = renderProgressBar;
  }
  const Progress = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createProgressBar,
    renderProgressBar
  }, Symbol.toStringTag, { value: "Module" }));
  function calculatePercentage(current, total) {
    if (total === 0) return 0;
    return Math.round(current / total * 100);
  }
  function resolveColorToken(token) {
    if (typeof window === "undefined" || !window.document || !window.getComputedStyle) {
      return token;
    }
    try {
      const root = document.documentElement;
      const tokenName = token.replace(/var\(|\)/g, "").trim();
      const resolved = getComputedStyle(root).getPropertyValue(tokenName).trim();
      if (resolved) {
        const cleaned = resolved.replace(/[()]/g, "").trim();
        return cleaned;
      } else {
        return token;
      }
    } catch (error) {
      return token;
    }
  }
  function renderCircularProgress(percentage, size = 120, strokeWidth = 12, progressColor = "var(--modifiers-normal-color-light-accent-brand)", backgroundColor = "var(--modifiers-normal-color-light-bg-3)") {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - percentage / 100 * circumference;
    const center = size / 2;
    const resolvedProgressColor = progressColor.startsWith("var(") ? resolveColorToken(progressColor) : progressColor;
    const resolvedBackgroundColor = backgroundColor.startsWith("var(") ? resolveColorToken(backgroundColor) : backgroundColor;
    return `
    <svg 
      class="ubits-progress-general-card__circle-svg" 
      width="${size}" 
      height="${size}" 
      viewBox="0 0 ${size} ${size}"
    >
      <!-- Círculo de fondo -->
      <circle
        cx="${center}"
        cy="${center}"
        r="${radius}"
        fill="none"
        stroke="${resolvedBackgroundColor}"
        stroke-width="${strokeWidth}"
      />
      <!-- Círculo de progreso -->
      <circle
        cx="${center}"
        cy="${center}"
        r="${radius}"
        fill="none"
        stroke="${resolvedProgressColor}"
        stroke-width="${strokeWidth}"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"
        stroke-linecap="round"
        transform="rotate(-90 ${center} ${center})"
        class="ubits-progress-general-card__circle-progress"
      />
    </svg>
  `;
  }
  function renderCategory(category, size = "md") {
    const percentage = category.percentage ?? calculatePercentage(category.current, category.total);
    const labelClass = size === "sm" ? "ubits-body-sm-regular" : size === "lg" ? "ubits-body-md-regular" : "ubits-body-sm-regular";
    const valueClass = size === "sm" ? "ubits-body-sm-regular" : size === "lg" ? "ubits-body-md-regular" : "ubits-body-sm-regular";
    const percentageClass = size === "sm" ? "ubits-body-sm-bold" : size === "lg" ? "ubits-body-md-bold" : "ubits-body-md-bold";
    return `
    <div class="ubits-progress-general-card__category">
      <div class="ubits-progress-general-card__category-label ${labelClass}">
        ${category.label}
      </div>
      <div class="ubits-progress-general-card__category-value ${valueClass}">
        ${category.current}/${category.total} <span class="ubits-progress-general-card__category-percentage ${percentageClass}">${percentage}%</span>
      </div>
    </div>
  `;
  }
  function renderProgressGeneralCard(options) {
    const {
      title = "Progreso general",
      mainPercentage = 50,
      mainLabel = "Ciclos",
      categories = [],
      layout = "vertical",
      size = "md",
      showTitle = true,
      showCircularProgress = true,
      showCategories = true,
      showInfoIcon = false,
      showActionButton = false,
      progressColor = "var(--ubits-chart-color-bg-neutral-blue-base)",
      circleBackgroundColor = "var(--modifiers-normal-color-light-bg-3)",
      className = "",
      attributes = {}
    } = options;
    const classes = [
      "ubits-progress-general-card",
      `ubits-progress-general-card--${layout}`,
      `ubits-progress-general-card--${size}`,
      className
    ].filter(Boolean).join(" ");
    const attrs = [...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)].filter(Boolean).join(" ");
    const circleSize = 158;
    const strokeWidth = 16;
    const titleClass = "ubits-body-md-bold";
    const percentageClass = "ubits-heading-h2";
    const mainLabelClass = "ubits-body-sm-bold";
    const infoIconHTML = showInfoIcon ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "circle-info",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Información",
        type: "button"
      }
    }) : "";
    const actionButtonHTML = showActionButton ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "chevron-right",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Ver más",
        type: "button"
      }
    }) : "";
    const titleHTML = showTitle ? `
      <div class="ubits-progress-general-card__header">
        <div class="ubits-progress-general-card__title-group">
          <h3 class="ubits-progress-general-card__title ${titleClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-progress-general-card__action-button">${actionButtonHTML}</div>` : ""}
      </div>
    ` : "";
    const circularProgressHTML = showCircularProgress ? `
      <div class="ubits-progress-general-card__circle-wrapper">
        ${renderCircularProgress(
      mainPercentage,
      circleSize,
      strokeWidth,
      progressColor,
      circleBackgroundColor
    )}
        <div class="ubits-progress-general-card__circle-content">
          <div class="ubits-progress-general-card__circle-percentage ${percentageClass}">
            ${mainPercentage}%
          </div>
          <div class="ubits-progress-general-card__circle-label ${mainLabelClass}">
            ${mainLabel}
          </div>
        </div>
      </div>
    ` : "";
    const categoriesHTML = showCategories && categories.length > 0 ? `
      <div class="ubits-progress-general-card__categories">
        ${categories.map((cat) => renderCategory(cat, size)).join("")}
      </div>
    ` : "";
    return `
    <div class="${classes}" ${attrs}>
      ${titleHTML}
      <div class="ubits-progress-general-card__content">
        ${circularProgressHTML}
        ${categoriesHTML}
      </div>
    </div>
  `;
  }
  function createProgressGeneralCard(options) {
    const { containerId, ...cardOptions } = options;
    if (!containerId) {
      console.error(
        "❌ [ProgressGeneralCard] containerId es requerido para createProgressGeneralCard"
      );
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ [ProgressGeneralCard] Contenedor con ID "${containerId}" no encontrado`);
      return null;
    }
    const html = renderProgressGeneralCard(cardOptions);
    container.innerHTML = html;
    const cardElement = container.querySelector(".ubits-progress-general-card");
    if (!cardElement) {
      console.error("❌ [ProgressGeneralCard] No se pudo crear el elemento de la tarjeta");
      return null;
    }
    if (cardOptions.onClick) {
      cardElement.addEventListener("click", cardOptions.onClick);
    }
    return cardElement;
  }
  const ProgressGeneralCard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createProgressGeneralCard,
    renderProgressGeneralCard
  }, Symbol.toStringTag, { value: "Module" }));
  const RadioButton = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createRadioButton,
    renderRadioButton
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$8(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderSaveIndicator(options = {}) {
    const {
      state = "saved",
      savingText = "Guardando...",
      recentlySavedText = "Cambios guardados",
      className = "",
      attributes = {}
    } = options;
    const classes = [
      "ubits-save-indicator",
      `ubits-save-indicator--${state}`,
      className || null
    ].filter(Boolean).join(" ");
    const attrs = [
      ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
    ].filter(Boolean).join(" ");
    let content = "";
    switch (state) {
      case "saved":
        content = `
        <span class="ubits-save-indicator__icon-wrapper">
          ${renderIconHelper$8("cloud", "regular")}
          <i class="fas fa-check ubits-save-indicator__overlay-icon"></i>
        </span>
      `.trim();
        break;
      case "saving":
        const spinnerHTML = renderSpinner({
          size: "sm",
          variant: "primary",
          animated: true,
          className: "ubits-save-indicator__spinner"
        });
        content = `${spinnerHTML}<span class="ubits-save-indicator__text">${savingText}</span>`;
        break;
      case "failed":
        content = `
        <span class="ubits-save-indicator__icon-wrapper">
          ${renderIconHelper$8("cloud", "regular")}
          <i class="fas fa-exclamation-triangle ubits-save-indicator__overlay-icon ubits-save-indicator__overlay-icon--error"></i>
        </span>
      `.trim();
        break;
      case "recently-saved":
        content = `
        <span class="ubits-save-indicator__icon-wrapper">
          ${renderIconHelper$8("cloud", "regular")}
          <i class="fas fa-check ubits-save-indicator__overlay-icon"></i>
        </span>
        <span class="ubits-save-indicator__text">${recentlySavedText}</span>
      `.trim();
        break;
    }
    return `
    <button class="${classes}" ${attrs} type="button" aria-label="Estado de guardado: ${state}">
      ${content}
    </button>
  `.trim();
  }
  function createSaveIndicator(options = {}) {
    const div = document.createElement("div");
    div.style.position = "relative";
    div.style.display = "inline-block";
    const htmlString = renderSaveIndicator(options);
    div.innerHTML = htmlString;
    const button = div.querySelector("button");
    if (!button) {
      throw new Error("Failed to create save indicator element");
    }
    if (options.onClick) {
      button.addEventListener("click", options.onClick);
    }
    return button;
  }
  const SaveIndicator = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createSaveIndicator,
    renderSaveIndicator
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$7(iconName, iconStyle = "regular", iconColor) {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    const colorStyle = iconColor ? `style="color: ${iconColor};"` : "";
    return `<i class="${iconClass} ${name}" ${colorStyle}></i>`;
  }
  function renderStarRating(score) {
    const totalStars = 5;
    const filledStars = Math.round(score);
    const emptyStars = totalStars - filledStars;
    let starsHTML = "";
    for (let i = 0; i < filledStars; i++) {
      const starNumber = i + 1;
      starsHTML += `
      <div class="ubits-score-card-metrics__star-wrapper">
        <i class="fas fa-star ubits-score-card-metrics__star ubits-score-card-metrics__star--filled"></i>
        <span class="ubits-score-card-metrics__star-number">${starNumber}</span>
      </div>
    `;
    }
    for (let i = 0; i < emptyStars; i++) {
      const starNumber = filledStars + i + 1;
      starsHTML += `
      <div class="ubits-score-card-metrics__star-wrapper">
        <i class="far fa-star ubits-score-card-metrics__star ubits-score-card-metrics__star--empty"></i>
        <span class="ubits-score-card-metrics__star-number">${starNumber}</span>
      </div>
    `;
    }
    return starsHTML;
  }
  function renderScoreCardMetrics(options) {
    const {
      title,
      totalResponses = 0,
      responsesLabel = "respuestas",
      average = 0,
      averageLabel = "Promedio:",
      score = 0,
      leftLabel = "0",
      rightLabel = "5",
      chartDescription = "0 a 5 del gráfico",
      titleIcon,
      titleIconStyle = "regular",
      titleIconColor,
      showInfoIcon = false,
      showActionButton = false,
      size = "md",
      className = "",
      attributes = {}
    } = options;
    const classes = ["ubits-score-card-metrics", `ubits-score-card-metrics--${size}`, className].filter(Boolean).join(" ");
    const attrs = [...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)].filter(Boolean).join(" ");
    const titleIconHTML = titleIcon ? `<div class="ubits-score-card-metrics__title-icon">${renderIconHelper$7(titleIcon, titleIconStyle, titleIconColor)}</div>` : "";
    const infoIconHTML = showInfoIcon ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "circle-info",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Información",
        type: "button"
      }
    }) : "";
    const actionButtonHTML = showActionButton ? renderButton({
      variant: "tertiary",
      size: "sm",
      icon: "chevron-right",
      iconStyle: "regular",
      iconOnly: true,
      attributes: {
        "aria-label": "Ver más",
        type: "button"
      }
    }) : "";
    const titleSizeClass = "ubits-body-md-bold";
    const statsClass = "ubits-body-sm-regular";
    const formattedAverage = average.toFixed(2);
    const starsHTML = renderStarRating(score);
    return `
    <div class="${classes}" ${attrs}>
      <div class="ubits-score-card-metrics__header">
        ${titleIconHTML}
        <div class="ubits-score-card-metrics__title-group">
          <h3 class="ubits-score-card-metrics__title ${titleSizeClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-score-card-metrics__action-button">${actionButtonHTML}</div>` : ""}
      </div>
      <div class="ubits-score-card-metrics__body">
        <div class="ubits-score-card-metrics__stats">
          <span class="ubits-score-card-metrics__responses ${statsClass}">${totalResponses} ${responsesLabel}</span>
          <span class="ubits-score-card-metrics__average ${statsClass}">${averageLabel} (${formattedAverage})</span>
        </div>
        <div class="ubits-score-card-metrics__chart">
          <div class="ubits-score-card-metrics__stars">
            ${starsHTML}
          </div>
        </div>
      </div>
    </div>
  `;
  }
  function createScoreCardMetrics(options) {
    const { containerId, ...cardOptions } = options;
    if (!containerId) {
      console.error("❌ [ScoreCardMetrics] containerId es requerido para createScoreCardMetrics");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ [ScoreCardMetrics] Contenedor con ID "${containerId}" no encontrado`);
      return null;
    }
    const html = renderScoreCardMetrics(cardOptions);
    container.innerHTML = html;
    const cardElement = container.querySelector(".ubits-score-card-metrics");
    if (!cardElement) {
      console.error("❌ [ScoreCardMetrics] No se pudo crear el elemento de la tarjeta");
      return null;
    }
    if (cardOptions.onClick) {
      cardElement.addEventListener("click", cardOptions.onClick);
    }
    console.log("✅ [ScoreCardMetrics] Tarjeta creada exitosamente");
    return cardElement;
  }
  const ScoreCardMetrics = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createScoreCardMetrics,
    renderScoreCardMetrics
  }, Symbol.toStringTag, { value: "Module" }));
  if (typeof window !== "undefined") {
    window.createScrollbar = createScrollbar;
    window.renderScrollbar = renderScrollbar;
  }
  const Scroll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createScrollbar,
    renderScrollbar
  }, Symbol.toStringTag, { value: "Module" }));
  const SearchButton = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createSearchButton,
    renderSearchButton
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$6(iconName, isActive = false) {
    if (!iconName) return "";
    let normalizedIcon = iconName;
    if (!normalizedIcon.startsWith("fa-")) {
      normalizedIcon = `fa-${normalizedIcon}`;
    }
    const iconStyle = isActive ? "fas" : "far";
    if (normalizedIcon.startsWith("far ") || normalizedIcon.startsWith("fas ")) {
      const iconNameOnly = normalizedIcon.replace(/^(far|fas)\s+/, "");
      return `<i class="${iconStyle} ${iconNameOnly}"></i>`;
    }
    return `<i class="${iconStyle} ${normalizedIcon}"></i>`;
  }
  function renderSegmentControl(options) {
    const { segments, activeSegmentId, className = "" } = options;
    if (!segments || segments.length === 0) {
      return '<div class="ubits-segment-control"></div>';
    }
    let activeId = activeSegmentId;
    if (!activeId) {
      const activeSegment = segments.find((segment) => segment.active);
      activeId = activeSegment ? activeSegment.id : segments[0].id;
    }
    const segmentsHTML = segments.map((segment) => {
      const isActive = segment.id === activeId;
      const activeClass = isActive ? "ubits-segment--active" : "";
      const disabledClass = segment.disabled ? "ubits-segment--disabled" : "";
      const classes = ["ubits-segment", activeClass, disabledClass].filter(Boolean).join(" ");
      const iconHTML = segment.icon ? renderIconHelper$6(segment.icon, isActive) : "";
      return `
      <button 
        class="${classes}" 
        data-segment-id="${segment.id}"
        ${segment.disabled ? "disabled" : ""}
        ${segment.url ? `data-url="${segment.url}"` : ""}
        ${segment.onClick ? 'data-has-click-handler="true"' : ""}
      >
        ${iconHTML}
        <span class="ubits-segment__label">${segment.label}</span>
      </button>
    `;
    }).join("");
    const containerClasses = ["ubits-segment-control", className].filter(Boolean).join(" ");
    return `
    <div class="${containerClasses}">
      ${segmentsHTML}
    </div>
  `.trim();
  }
  function initSegmentListeners(segmentsElement, options) {
    const existingSegments = segmentsElement.querySelectorAll(
      ".ubits-segment[data-listener-attached]"
    );
    existingSegments.forEach((segment) => {
      const clonedSegment = segment.cloneNode(true);
      segment.parentNode?.replaceChild(clonedSegment, segment);
    });
    const segments = segmentsElement.querySelectorAll(
      ".ubits-segment:not(.ubits-segment--disabled)"
    );
    const handleSegmentClick = (segmentElement) => {
      const segmentId = segmentElement.getAttribute("data-segment-id");
      const url = segmentElement.getAttribute("data-url");
      segmentsElement.querySelectorAll(".ubits-segment").forEach((s) => {
        s.classList.remove("ubits-segment--active");
      });
      segmentElement.classList.add("ubits-segment--active");
      segmentsElement.querySelectorAll(".ubits-segment").forEach((s) => {
        const isActive = s.classList.contains("ubits-segment--active");
        const iconElement = s.querySelector("i");
        if (iconElement) {
          const iconName = iconElement.className.replace(/^(far|fas)\s+/, "").replace(/^fa-/, "");
          const iconStyle = isActive ? "fas" : "far";
          iconElement.className = `${iconStyle} fa-${iconName}`;
        }
      });
      if (url) {
        window.location.href = url;
        return;
      }
      const segmentConfig = options.segments.find((s) => s.id === segmentId);
      if (segmentConfig && segmentConfig.onClick) {
        segmentConfig.onClick(new MouseEvent("click"));
      }
      if (options.onSegmentChange) {
        options.onSegmentChange(segmentId || "", segmentElement);
      }
      const event = new CustomEvent("segmentControlSegmentClick", {
        detail: { segmentId, segmentElement }
      });
      document.dispatchEvent(event);
    };
    segments.forEach((segment) => {
      segment.setAttribute("data-listener-attached", "true");
      segment.addEventListener("click", (e) => {
        e.preventDefault();
        handleSegmentClick(segment);
      });
    });
  }
  function createSegmentControl(options, containerId) {
    const container = containerId ? document.getElementById(containerId) || document.createElement("div") : document.createElement("div");
    if (containerId && !container.id) {
      container.id = containerId;
    }
    container.innerHTML = renderSegmentControl(options);
    requestAnimationFrame(() => {
      const segmentsElement = container.querySelector(".ubits-segment-control");
      if (segmentsElement) {
        initSegmentListeners(segmentsElement, options);
      } else {
        initSegmentListeners(container, options);
      }
    });
    return container;
  }
  const SegmentControl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createSegmentControl,
    renderSegmentControl
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$5(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderSelectionCard(cardData) {
    const {
      id,
      title,
      description,
      icon,
      iconStyle = "regular",
      image,
      selectionCount,
      state = "default",
      size = "md"
    } = cardData;
    const isSelected = state === "selected";
    const isDisabled = state === "disabled";
    const classes = [
      "ubits-selection-card",
      `ubits-selection-card--${size}`,
      state !== "default" ? `ubits-selection-card--${state}` : "",
      isSelected ? "ubits-selection-card--selected" : ""
    ].filter(Boolean).join(" ");
    let iconHTML = "";
    if (icon && !image) {
      iconHTML = `
      <div class="ubits-selection-card__icon">
        ${renderIconHelper$5(icon, iconStyle)}
      </div>
    `;
    }
    let imageHTML = "";
    if (image) {
      imageHTML = `
      <div class="ubits-selection-card__image">
        <img src="${image}" alt="${title}" />
      </div>
    `;
    }
    let selectionCountHTML = "";
    if (selectionCount) {
      const { current, total } = selectionCount;
      selectionCountHTML = `
      <div class="ubits-selection-card__selection-count">
        <span class="ubits-selection-card__selection-count-number ubits-body-md-bold">${current}/${total}</span>
        <span class="ubits-selection-card__selection-count-text ubits-body-md-regular">seleccionados</span>
      </div>
    `;
    }
    const radioButtonHTML = renderRadioButton({
      label: "",
      value: id,
      name: `selection-card-group-${id}`,
      checked: isSelected,
      size: "md",
      state: isDisabled ? "disabled" : "default",
      disabled: isDisabled,
      className: "ubits-selection-card__radio-button"
    });
    const html = `
    <div class="${classes}" data-card-id="${id}" ${isDisabled ? 'aria-disabled="true"' : ""} ${!isDisabled ? 'tabindex="0"' : ""}>
      ${imageHTML}
      <div class="ubits-selection-card__content">
        <h3 class="ubits-selection-card__title ubits-body-md-semibold">
          ${iconHTML}
          <span>${title}</span>
        </h3>
        ${description ? `<p class="ubits-selection-card__description ubits-body-sm">${description}</p>` : ""}
        ${selectionCountHTML}
      </div>
      <div class="ubits-selection-card__radio-wrapper">
        ${radioButtonHTML}
      </div>
    </div>
  `.trim();
    if (typeof window !== "undefined") {
      getComputedStyle(document.documentElement);
    }
    return html;
  }
  function loadSelectionCards(options) {
    const {
      containerId,
      cards,
      multiple = false,
      selectedIds = [],
      onSelectionChange,
      onClick
    } = options;
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) {
      console.error(`❌ [SelectionCard] Contenedor con ID "${containerId}" no encontrado`);
      return;
    }
    targetContainer.innerHTML = "";
    cards.forEach((cardData, index) => {
      const isSelected = selectedIds.includes(cardData.id);
      const cardDataWithState = {
        ...cardData,
        state: isSelected ? "selected" : cardData.state || "default"
      };
      const cardHTML = renderSelectionCard(cardDataWithState);
      const wrapper = document.createElement("div");
      wrapper.innerHTML = cardHTML;
      const cardElement = wrapper.firstElementChild;
      if (!cardElement) return;
      if (cardDataWithState.state !== "disabled") {
        cardElement.addEventListener("click", () => {
          if (cardDataWithState.state === "disabled") return;
          const currentSelectedIds = [...selectedIds];
          const cardIndex = currentSelectedIds.indexOf(cardData.id);
          if (multiple) {
            if (cardIndex > -1) {
              currentSelectedIds.splice(cardIndex, 1);
              cardElement.classList.remove("ubits-selection-card--selected");
              cardDataWithState.state = "default";
              const radioInput = cardElement.querySelector(
                '.ubits-selection-card__radio-button input[type="radio"]'
              );
              const radioButton = cardElement.querySelector(".ubits-selection-card__radio-button");
              if (radioInput) radioInput.checked = false;
              if (radioButton) {
                radioButton.classList.remove("ubits-radio-button--checked");
                const dot = radioButton.querySelector(".ubits-radio-button__dot");
                if (dot) dot.remove();
              }
            } else {
              currentSelectedIds.push(cardData.id);
              cardElement.classList.add("ubits-selection-card--selected");
              cardDataWithState.state = "selected";
              const radioInput = cardElement.querySelector(
                '.ubits-selection-card__radio-button input[type="radio"]'
              );
              const radioButton = cardElement.querySelector(".ubits-selection-card__radio-button");
              if (radioInput) radioInput.checked = true;
              if (radioButton) {
                radioButton.classList.add("ubits-radio-button--checked");
                const circle = radioButton.querySelector(".ubits-radio-button__circle");
                if (circle && !circle.querySelector(".ubits-radio-button__dot")) {
                  const dot = document.createElement("span");
                  dot.className = "ubits-radio-button__dot";
                  circle.appendChild(dot);
                }
              }
            }
          } else {
            const allCards = targetContainer.querySelectorAll(".ubits-selection-card");
            allCards.forEach((card) => {
              card.classList.remove("ubits-selection-card--selected");
              const cardId = card.getAttribute("data-card-id");
              if (cardId) {
                const cardIndex2 = currentSelectedIds.indexOf(cardId);
                if (cardIndex2 > -1) {
                  currentSelectedIds.splice(cardIndex2, 1);
                }
              }
              const radioInput = card.querySelector(
                '.ubits-selection-card__radio-button input[type="radio"]'
              );
              const radioButton = card.querySelector(".ubits-selection-card__radio-button");
              if (radioInput) radioInput.checked = false;
              if (radioButton) {
                radioButton.classList.remove("ubits-radio-button--checked");
                const dot = radioButton.querySelector(".ubits-radio-button__dot");
                if (dot) dot.remove();
              }
            });
            if (cardIndex === -1) {
              currentSelectedIds.push(cardData.id);
              cardElement.classList.add("ubits-selection-card--selected");
              cardDataWithState.state = "selected";
              const radioInput = cardElement.querySelector(
                '.ubits-selection-card__radio-button input[type="radio"]'
              );
              const radioButton = cardElement.querySelector(".ubits-selection-card__radio-button");
              if (radioInput) radioInput.checked = true;
              if (radioButton) {
                radioButton.classList.add("ubits-radio-button--checked");
                const circle = radioButton.querySelector(".ubits-radio-button__circle");
                if (circle && !circle.querySelector(".ubits-radio-button__dot")) {
                  const dot = document.createElement("span");
                  dot.className = "ubits-radio-button__dot";
                  circle.appendChild(dot);
                }
              }
            }
          }
          const updatedCard = cards.find((c) => c.id === cardData.id);
          if (updatedCard) {
            updatedCard.state = cardDataWithState.state;
          }
          const selectedCards = cards.filter((c) => currentSelectedIds.includes(c.id));
          onSelectionChange?.(selectedCards, currentSelectedIds);
          onClick?.(cardData, index, cardElement);
        });
        cardElement.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            cardElement.click();
          }
        });
      }
      targetContainer.appendChild(cardElement);
    });
  }
  function createSelectionCard(cardData) {
    const cardHTML = renderSelectionCard(cardData);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = cardHTML.trim();
    const cardElement = wrapper.firstElementChild;
    if (!cardElement) {
      console.error("❌ [SelectionCard] Error al parsear HTML. HTML generado:", cardHTML);
      throw new Error(
        "No se pudo crear el elemento selection-card. Verifica que el HTML sea válido."
      );
    }
    if (!cardElement.classList.contains("ubits-selection-card")) {
      console.warn("⚠️ [SelectionCard] El elemento no tiene la clase base ubits-selection-card");
    }
    setTimeout(() => {
      const computedStyle = window.getComputedStyle(cardElement);
      const rootStyle = window.getComputedStyle(document.documentElement);
      ({
        "--modifiers-normal-color-light-border-1": rootStyle.getPropertyValue("--modifiers-normal-color-light-border-1").trim() || "NO ENCONTRADO",
        "--modifiers-static-inverted-color-light-accent-brand": rootStyle.getPropertyValue("--modifiers-static-inverted-color-light-accent-brand").trim() || "NO ENCONTRADO",
        "--modifiers-normal-color-light-bg-1": rootStyle.getPropertyValue("--modifiers-normal-color-light-bg-1").trim() || "NO ENCONTRADO",
        "--ubits-spacing-lg": rootStyle.getPropertyValue("--ubits-spacing-lg").trim() || "NO ENCONTRADO",
        "--ubits-spacing-sm": rootStyle.getPropertyValue("--ubits-spacing-sm").trim() || "NO ENCONTRADO",
        "--ubits-border-radius-md": rootStyle.getPropertyValue("--ubits-border-radius-md").trim() || "NO ENCONTRADO",
        "--font-body-md-size": rootStyle.getPropertyValue("--font-body-md-size").trim() || "NO ENCONTRADO",
        "--font-body-md-line": rootStyle.getPropertyValue("--font-body-md-line").trim() || "NO ENCONTRADO",
        "--weight-semibold": rootStyle.getPropertyValue("--weight-semibold").trim() || "NO ENCONTRADO",
        "--font-sans": rootStyle.getPropertyValue("--font-sans").trim() || "NO ENCONTRADO"
      });
      ({
        border: computedStyle.border,
        borderWidth: computedStyle.borderWidth,
        borderStyle: computedStyle.borderStyle,
        borderColor: computedStyle.borderColor,
        backgroundColor: computedStyle.backgroundColor,
        padding: computedStyle.padding,
        gap: computedStyle.gap,
        borderRadius: computedStyle.borderRadius,
        classes: Array.from(cardElement.classList)
      });
      const titleElement = cardElement.querySelector(".ubits-selection-card__title");
      if (titleElement) {
        const titleStyle = window.getComputedStyle(titleElement);
        ({
          fontSize: titleStyle.fontSize,
          fontWeight: titleStyle.fontWeight,
          lineHeight: titleStyle.lineHeight,
          fontFamily: titleStyle.fontFamily
        });
      }
      cardElement.classList.contains("ubits-selection-card--selected");
    }, 100);
    return cardElement;
  }
  const SelectionCard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createSelectionCard,
    loadSelectionCards,
    renderSelectionCard
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$4(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "regular" ? "far" : "fas";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function adjustSidebarHeight(sidebarElement) {
    const windowHeight = window.innerHeight;
    const topMargin = 16;
    const bottomMargin = 16;
    const availableHeight = windowHeight - topMargin - bottomMargin;
    const minHeight = 578;
    const sidebarHeight = Math.max(minHeight, availableHeight);
    sidebarElement.style.height = `${sidebarHeight}px`;
    sidebarElement.style.top = `${topMargin}px`;
  }
  function renderSidebar(options) {
    const {
      variant = "colaborador",
      bodyButtons,
      footerButtons = [],
      logoHref,
      logoImage = "images/Ubits-logo.svg",
      profileMenuItems = [],
      avatarImage = "images/Profile-image.jpg",
      darkModeEnabled = true,
      className = "",
      attributes = {}
    } = options;
    const defaultLogoHref = variant === "admin" ? "admin.html" : "index.html";
    const finalLogoHref = logoHref || defaultLogoHref;
    const containerClasses = ["ubits-sidebar", className].filter(Boolean).join(" ");
    const containerAttrs = Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
    const bodyButtonsHTML = bodyButtons.map((button) => {
      const buttonClasses = [
        "ubits-sidebar-nav-button",
        button.state === "active" ? "active" : "",
        button.state === "disabled" ? "disabled" : ""
      ].filter(Boolean).join(" ");
      const onClickAttr = button.onClick ? 'data-has-click-handler="true"' : "";
      const hrefAttr = button.href ? `data-href="${button.href}"` : "";
      return `
      <button 
        class="${buttonClasses}" 
        data-section="${button.section}" 
        data-tooltip="${button.tooltip}"
        ${onClickAttr}
        ${hrefAttr}
        ${button.state === "disabled" ? "disabled" : ""}
      >
        ${renderIconHelper$4(button.icon)}
      </button>
    `;
    }).join("\n");
    const footerButtonsHTML = footerButtons.map((button) => {
      const buttonClasses = [
        "ubits-sidebar-nav-button",
        button.id ? `id="ubits-${button.id}"` : "",
        button.state === "active" ? "active" : "",
        button.state === "disabled" ? "disabled" : ""
      ].filter(Boolean).join(" ");
      const onClickAttr = button.onClick ? 'data-has-click-handler="true"' : "";
      const hrefAttr = button.href ? `data-href="${button.href}"` : "";
      return `
      <button 
        class="${buttonClasses}" 
        ${button.id ? `id="ubits-${button.id}"` : ""}
        data-section="${button.section}" 
        data-tooltip="${button.tooltip}"
        ${button.id === "darkmode-toggle" ? 'data-theme="light"' : ""}
        ${onClickAttr}
        ${hrefAttr}
        ${button.state === "disabled" ? "disabled" : ""}
      >
        ${renderIconHelper$4(button.icon)}
      </button>
    `;
    }).join("\n");
    const darkModeToggleHTML = darkModeEnabled ? `
    <button 
      class="ubits-sidebar-nav-button" 
      id="ubits-darkmode-toggle" 
      data-tooltip="Modo oscuro" 
      data-theme="light"
      data-has-click-handler="true"
    >
      ${renderIconHelper$4("fa-moon", "regular")}
    </button>
  ` : "";
    const profileMenuHTML = profileMenuItems.length > 0 ? `
    <div class="ubits-sidebar-profile-menu" id="ubits-sidebar-profile-menu">
      ${profileMenuItems.map((item) => {
      if (item.divider) {
        return '<div class="ubits-sidebar-profile-menu-divider"></div>';
      }
      const onClickAttr = item.onClick ? 'data-has-click-handler="true"' : "";
      const hrefAttr = item.href ? `data-href="${item.href}"` : "";
      return `
          <div class="ubits-sidebar-profile-menu-item" ${onClickAttr} ${hrefAttr}>
            ${renderIconHelper$4(item.icon)}
            <span>${item.label}</span>
          </div>
        `;
    }).join("")}
    </div>
  ` : "";
    return `
    <aside class="${containerClasses}" id="ubits-sidebar" ${containerAttrs}>
      <div class="ubits-sidebar-main">
        <div class="ubits-sidebar-header">
          <div class="ubits-sidebar-logo" data-href="${finalLogoHref}">
            <img src="${logoImage}" alt="UBITS Logo" />
          </div>
        </div>
        <div class="ubits-sidebar-body">
          ${bodyButtonsHTML}
        </div>
      </div>
      <div class="ubits-sidebar-footer">
        ${footerButtonsHTML}
        ${darkModeToggleHTML}
        <div class="ubits-sidebar-user-avatar-container">
          <div class="ubits-sidebar-user-avatar" data-has-click-handler="${options.onAvatarClick ? "true" : ""}">
            <img src="${avatarImage}" alt="Usuario" class="ubits-sidebar-avatar-image" />
          </div>
        </div>
      </div>
    </aside>
    ${profileMenuHTML}
    <div class="ubits-sidebar-tooltip" id="ubits-sidebar-tooltip"></div>
  `.trim();
  }
  function initTooltips(sidebarElement) {
    const tooltipElement = document.getElementById("ubits-sidebar-tooltip");
    if (!tooltipElement) return;
    const sidebarContainer = sidebarElement.parentElement;
    if (!sidebarContainer) return;
    const buttons = sidebarElement.querySelectorAll("[data-tooltip]");
    buttons.forEach((button) => {
      const tooltipText = button.getAttribute("data-tooltip");
      if (!tooltipText) return;
      button.addEventListener("mouseenter", () => {
        const buttonRect = button.getBoundingClientRect();
        const containerRect = sidebarContainer.getBoundingClientRect();
        const tooltip = tooltipElement;
        tooltip.textContent = tooltipText;
        tooltip.style.visibility = "hidden";
        tooltip.style.display = "block";
        tooltip.classList.add("show");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const tooltipRect = tooltip.getBoundingClientRect();
            const tooltipHeight = tooltipRect.height;
            const left = buttonRect.right - containerRect.left + 12;
            const top = buttonRect.top - containerRect.top + buttonRect.height / 2 - tooltipHeight / 2;
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
            tooltip.style.visibility = "visible";
          });
        });
      });
      button.addEventListener("mouseleave", () => {
        tooltipElement.classList.remove("show");
        tooltipElement.style.visibility = "hidden";
      });
    });
  }
  function initProfileMenu(sidebarElement, options) {
    const avatarElement = sidebarElement.querySelector(".ubits-sidebar-user-avatar");
    const menuElement = document.getElementById("ubits-sidebar-profile-menu");
    if (!avatarElement || !menuElement) return;
    const containerId = options.containerId;
    const sidebarContainer = containerId ? document.getElementById(containerId) : sidebarElement.parentElement;
    const updateMenuPosition = () => {
      if (!sidebarContainer || sidebarContainer === document.body) return;
      const sidebarRect = sidebarElement.getBoundingClientRect();
      const containerRect = sidebarContainer.getBoundingClientRect();
      const menuLeft = sidebarRect.left - containerRect.left + 96;
      const menuBottom = 27;
      menuElement.style.position = "absolute";
      menuElement.style.left = `${menuLeft}px`;
      menuElement.style.bottom = `${menuBottom}px`;
    };
    if (sidebarContainer && sidebarContainer !== document.body) {
      const containerStyle = window.getComputedStyle(sidebarContainer);
      if (containerStyle.position === "static") {
        sidebarContainer.style.position = "relative";
      }
      updateMenuPosition();
      window.addEventListener("resize", updateMenuPosition);
    } else {
      menuElement.style.position = "fixed";
      menuElement.style.left = "96px";
      menuElement.style.bottom = "27px";
    }
    let showTimeout = null;
    let hideTimeout = null;
    const showMenu = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      if (showTimeout) {
        clearTimeout(showTimeout);
      }
      if (sidebarContainer && sidebarContainer !== document.body) {
        updateMenuPosition();
      }
      showTimeout = window.setTimeout(() => {
        menuElement.classList.add("show");
        menuElement.style.display = "block";
      }, 100);
    };
    const hideMenu = () => {
      if (showTimeout) {
        clearTimeout(showTimeout);
        showTimeout = null;
      }
      hideTimeout = window.setTimeout(() => {
        menuElement.classList.remove("show");
        menuElement.style.display = "none";
      }, 200);
    };
    avatarElement.addEventListener("mouseenter", showMenu);
    avatarElement.addEventListener("mouseleave", hideMenu);
    menuElement.addEventListener("mouseenter", showMenu);
    menuElement.addEventListener("mouseleave", hideMenu);
    if (options.onAvatarClick) {
      avatarElement.addEventListener("click", (e) => {
        e.preventDefault();
        options.onAvatarClick?.();
      });
    } else {
      const href = avatarElement.getAttribute("data-href");
      if (href) {
        avatarElement.addEventListener("click", () => {
          window.location.href = href;
        });
      }
    }
    const menuItems = menuElement.querySelectorAll(".ubits-sidebar-profile-menu-item");
    menuItems.forEach((item, index) => {
      const menuItem = options.profileMenuItems?.[index];
      if (!menuItem || menuItem.divider) return;
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (menuItem.onClick) {
          menuItem.onClick();
        } else if (menuItem.href) {
          window.location.href = menuItem.href;
        }
        hideMenu();
      });
    });
  }
  function initDarkModeToggle(sidebarElement, options) {
    const darkModeButton = sidebarElement.querySelector("#ubits-darkmode-toggle");
    if (!darkModeButton) return;
    const containerId = options.containerId;
    let sidebarContainer = null;
    if (containerId) {
      sidebarContainer = document.getElementById(containerId);
    }
    if (!sidebarContainer) {
      sidebarContainer = sidebarElement.parentElement;
    }
    const updateIcon = (theme) => {
      const iconElement = darkModeButton.querySelector("i");
      if (iconElement) {
        iconElement.classList.remove(
          "fa-moon",
          "fa-sun",
          "fa-sun-bright",
          "far",
          "fas",
          "fa-solid",
          "fa-regular"
        );
        iconElement.classList.add("ubits-icon-transition");
        requestAnimationFrame(() => {
          if (theme === "dark") {
            iconElement.classList.add("fa-solid", "fa-sun-bright");
          } else {
            iconElement.classList.add("far", "fa-moon");
          }
        });
        setTimeout(() => {
          iconElement.classList.remove("ubits-icon-transition");
        }, 400);
      }
    };
    darkModeButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const currentTheme = darkModeButton.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      darkModeButton.setAttribute("data-theme", newTheme);
      updateIcon(newTheme);
      if (sidebarContainer) {
        sidebarContainer.setAttribute("data-theme", newTheme);
      }
      if (options.onDarkModeToggle) {
        options.onDarkModeToggle(newTheme === "dark");
      }
    });
  }
  function createSidebar(options) {
    const { containerId, bodyButtons, height } = options;
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === "static") {
      container.style.position = "relative";
    }
    const sidebarHTML = renderSidebar(options);
    container.innerHTML = sidebarHTML;
    const sidebarElement = container.querySelector(".ubits-sidebar");
    const menuElement = document.getElementById("ubits-sidebar-profile-menu");
    if (menuElement && !container.contains(menuElement)) {
      container.appendChild(menuElement);
    }
    const tooltipElement = document.getElementById("ubits-sidebar-tooltip");
    if (tooltipElement && !container.contains(tooltipElement)) {
      container.appendChild(tooltipElement);
    }
    if (!sidebarElement) {
      throw new Error("Failed to create sidebar element");
    }
    if (height) {
      sidebarElement.style.height = typeof height === "number" ? `${height}px` : height;
    } else {
      adjustSidebarHeight(sidebarElement);
      window.addEventListener("resize", () => adjustSidebarHeight(sidebarElement));
    }
    initTooltips(sidebarElement);
    initProfileMenu(sidebarElement, options);
    if (options.darkModeEnabled !== false) {
      initDarkModeToggle(sidebarElement, options);
    }
    const bodyButtonsElements = sidebarElement.querySelectorAll(
      ".ubits-sidebar-body .ubits-sidebar-nav-button"
    );
    bodyButtonsElements.forEach((button, index) => {
      const buttonConfig = bodyButtons[index];
      if (!buttonConfig) return;
      button.addEventListener("click", (e) => {
        e.preventDefault();
        if (buttonConfig.state === "disabled") return;
        bodyButtonsElements.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        if (options.onActiveButtonChange) {
          options.onActiveButtonChange(buttonConfig.section);
        }
        if (buttonConfig.onClick) {
          buttonConfig.onClick(e);
        } else if (buttonConfig.href) {
          window.location.href = buttonConfig.href;
        }
      });
    });
    const footerButtonsElements = sidebarElement.querySelectorAll(
      ".ubits-sidebar-footer .ubits-sidebar-nav-button"
    );
    footerButtonsElements.forEach((button, index) => {
      const buttonConfig = options.footerButtons?.[index];
      if (!buttonConfig) return;
      if (button.id === "ubits-darkmode-toggle") return;
      button.addEventListener("click", (e) => {
        e.preventDefault();
        if (buttonConfig.state === "disabled") return;
        if (buttonConfig.onClick) {
          buttonConfig.onClick(e);
        } else if (buttonConfig.href) {
          window.location.href = buttonConfig.href;
        }
      });
    });
    const logoElement = sidebarElement.querySelector(".ubits-sidebar-logo");
    if (logoElement) {
      const logoHref = logoElement.getAttribute("data-href");
      if (logoHref) {
        logoElement.addEventListener("click", () => {
          window.location.href = logoHref;
        });
      }
    }
    return sidebarElement;
  }
  function updateActiveSidebarButton(containerId, section) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const sidebarElement = container.querySelector(".ubits-sidebar");
    if (!sidebarElement) return;
    const allButtons = sidebarElement.querySelectorAll(".ubits-sidebar-nav-button");
    allButtons.forEach((btn) => btn.classList.remove("active"));
    const targetButton = sidebarElement.querySelector(`[data-section="${section}"]`);
    if (targetButton) {
      targetButton.classList.add("active");
    }
  }
  if (typeof window !== "undefined") {
    console.log("✅ UBITS Sidebar component ready");
  }
  const Sidebar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createSidebar,
    renderSidebar,
    updateActiveSidebarButton
  }, Symbol.toStringTag, { value: "Module" }));
  function renderSkeleton(options = {}) {
    const {
      variant = "text",
      size = "md",
      width,
      height,
      lines = 1,
      animated = true,
      className = "",
      style = ""
    } = options;
    const classes = [
      "ubits-skeleton",
      `ubits-skeleton--${variant}`,
      size !== "md" ? `ubits-skeleton--${size}` : "",
      animated ? "ubits-skeleton--animated" : "",
      className
    ].filter(Boolean).join(" ");
    const sizeStyles = [];
    if (width) {
      if (width === "full") {
        sizeStyles.push("width: 100%");
      } else if (typeof width === "number") {
        sizeStyles.push(`width: ${width}px`);
      } else {
        sizeStyles.push(`width: ${width}`);
      }
    }
    if (height) {
      if (typeof height === "number") {
        sizeStyles.push(`height: ${height}px`);
      } else {
        sizeStyles.push(`height: ${height}`);
      }
    }
    const inlineStyles = [...sizeStyles, style].filter(Boolean).join("; ");
    const styleAttr = inlineStyles ? ` style="${inlineStyles}"` : "";
    if (variant === "text") {
      const lineElements = Array.from({ length: lines }, (_, index) => {
        const isLastLine = index === lines - 1;
        const lineWidth = isLastLine && lines > 1 ? "60%" : "100%";
        return `<span class="ubits-skeleton__line" style="width: ${lineWidth}"></span>`;
      }).join("");
      return `<div class="${classes}"${styleAttr}>${lineElements}</div>`;
    }
    if (variant === "circle") {
      return `<div class="${classes}"${styleAttr}></div>`;
    }
    if (variant === "rectangle") {
      return `<div class="${classes}"${styleAttr}></div>`;
    }
    return `<div class="${classes}"${styleAttr}></div>`;
  }
  function createSkeleton(options = {}) {
    const div = document.createElement("div");
    div.innerHTML = renderSkeleton(options);
    return div.querySelector(".ubits-skeleton");
  }
  const Skeleton = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createSkeleton,
    renderSkeleton
  }, Symbol.toStringTag, { value: "Module" }));
  class SliderAddon {
    constructor() {
      this.name = "@ubits/slider";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (typeof window !== "undefined" && typeof HTMLElement !== "undefined") {
        if (!customElements.get("ubits-slider")) {
          const { UBITSSlider: UBITSSlider2 } = await Promise.resolve().then(() => SliderComponent);
          customElements.define("ubits-slider", UBITSSlider2);
          console.log("✅ [SliderAddon] Web Component ubits-slider registrado");
        }
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.Slider = {
          create: (options) => {
            const { createSlider: createSlider2 } = require("./SliderProvider");
            return createSlider2(options);
          },
          render: (options) => {
            const { renderSlider: renderSlider2 } = require("./SliderProvider");
            return renderSlider2(options);
          }
        };
        if (!window.createSlider) {
          window.createSlider = (options) => {
            const { createSlider: createSlider2 } = require("./SliderProvider");
            return createSlider2(options);
          };
        }
      }
      console.log("✅ Slider add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined" && window.UBITS?.Slider) {
        delete window.UBITS.Slider;
        delete window.createSlider;
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-slider",
          tag: "ubits-slider",
          documentation: "https://ubits.design/components/slider"
          // Placeholder
        }
      ];
    }
    getStyles() {
      return ["./styles/slider.css"];
    }
  }
  function renderSlider(options) {
    const {
      containerId,
      label = "",
      helperText = "",
      size = "md",
      state = "default",
      orientation = "horizontal",
      mode = "single",
      min = 0,
      max = 100,
      step = 1,
      value = 50,
      values = [25, 75],
      showInputs = false,
      showLabel = true,
      showHelper = false,
      showMarks = false,
      marks = [],
      showRangeGuide = false,
      className = "",
      attributes = {}
    } = options;
    const effectiveShowInputs = showInputs || showRangeGuide;
    const isDisabled = state === "disabled";
    const isVertical = orientation === "vertical";
    const isRange = mode === "range";
    const currentValue = isRange ? values[0] : value;
    isRange ? values[1] : null;
    const sliderClasses = ["ubits-slider"];
    if (isVertical) sliderClasses.push("ubits-slider--vertical");
    if (size) sliderClasses.push(`ubits-slider--${size}`);
    if (isDisabled) sliderClasses.push("ubits-slider--disabled");
    if (className) sliderClasses.push(className);
    let sliderHTML = `<div class="${sliderClasses.join(" ")}" id="${containerId}">`;
    if (showLabel && label) {
      sliderHTML += `<label class="ubits-slider-label">${label}</label>`;
    }
    sliderHTML += '<div class="ubits-slider-main-wrapper">';
    if (effectiveShowInputs && isRange) {
      sliderHTML += `<div class="ubits-slider-input" id="${containerId}-input-min"></div>`;
    }
    sliderHTML += '<div class="ubits-slider-wrapper">';
    sliderHTML += '<div class="ubits-slider-track-container" style="position: relative; flex: 1;">';
    sliderHTML += '<div class="ubits-slider-track">';
    if (!isRange) {
      const percentage = (currentValue - min) / (max - min) * 100;
      if (isVertical) {
        sliderHTML += `<div class="ubits-slider-track-fill" style="height: ${percentage}%; bottom: 0;"></div>`;
      } else {
        sliderHTML += `<div class="ubits-slider-track-fill" style="width: ${percentage}%;"></div>`;
      }
    } else {
      const minPercentage = (values[0] - min) / (max - min) * 100;
      const maxPercentage = (values[1] - min) / (max - min) * 100;
      const rangeWidth = maxPercentage - minPercentage;
      if (isVertical) {
        sliderHTML += `<div class="ubits-slider-track-range" style="bottom: ${minPercentage}%; height: ${rangeWidth}%;"></div>`;
      } else {
        sliderHTML += `<div class="ubits-slider-track-range" style="left: ${minPercentage}%; width: ${rangeWidth}%;"></div>`;
      }
    }
    if (showMarks && marks.length > 0) {
      sliderHTML += '<div class="ubits-slider-marks">';
      marks.forEach((markValue) => {
        const markPercentage = (markValue - min) / (max - min) * 100;
        if (isVertical) {
          sliderHTML += `<div class="ubits-slider-mark" style="top: ${100 - markPercentage}%; left: 50%;"></div>`;
        } else {
          sliderHTML += `<div class="ubits-slider-mark" style="left: ${markPercentage}%; top: 50%;"></div>`;
        }
      });
      sliderHTML += "</div>";
    }
    if (!isRange) {
      const thumbPercentage = (currentValue - min) / (max - min) * 100;
      if (isVertical) {
        sliderHTML += `<div class="ubits-slider-thumb" style="top: ${100 - thumbPercentage}%; left: 50%;" data-value="${currentValue}" tabindex="0" ${isDisabled ? "disabled" : ""}></div>`;
      } else {
        sliderHTML += `<div class="ubits-slider-thumb" style="left: ${thumbPercentage}%; top: 50%;" data-value="${currentValue}" tabindex="0" ${isDisabled ? "disabled" : ""}></div>`;
      }
    } else {
      const minPercentage = (values[0] - min) / (max - min) * 100;
      const maxPercentage = (values[1] - min) / (max - min) * 100;
      if (isVertical) {
        sliderHTML += `<div class="ubits-slider-thumb ubits-slider-thumb--min" style="top: ${100 - minPercentage}%; left: 50%;" data-value="${values[0]}" tabindex="0" ${isDisabled ? "disabled" : ""}></div>`;
        sliderHTML += `<div class="ubits-slider-thumb ubits-slider-thumb--max" style="top: ${100 - maxPercentage}%; left: 50%;" data-value="${values[1]}" tabindex="0" ${isDisabled ? "disabled" : ""}></div>`;
      } else {
        sliderHTML += `<div class="ubits-slider-thumb ubits-slider-thumb--min" style="left: ${minPercentage}%; top: 50%;" data-value="${values[0]}" tabindex="0" ${isDisabled ? "disabled" : ""}></div>`;
        sliderHTML += `<div class="ubits-slider-thumb ubits-slider-thumb--max" style="left: ${maxPercentage}%; top: 50%;" data-value="${values[1]}" tabindex="0" ${isDisabled ? "disabled" : ""}></div>`;
      }
    }
    sliderHTML += "</div>";
    sliderHTML += "</div>";
    sliderHTML += "</div>";
    if (effectiveShowInputs) {
      if (isRange) {
        sliderHTML += `<div class="ubits-slider-input" id="${containerId}-input-max"></div>`;
      } else {
        sliderHTML += `<div class="ubits-slider-input" id="${containerId}-input-value"></div>`;
      }
    }
    sliderHTML += "</div>";
    if (!isVertical) {
      sliderHTML += `<div class="ubits-slider-range-guide-wrapper">`;
      sliderHTML += `<div class="ubits-slider-range-guide" id="${containerId}-range-guide">`;
      if (showRangeGuide) {
        const range = max - min;
        const idealNumSteps = 10;
        let guideStep = Math.ceil(range / idealNumSteps);
        const magnitude = Math.pow(10, Math.floor(Math.log10(guideStep)));
        const normalized = guideStep / magnitude;
        let niceStep = magnitude;
        if (normalized <= 1) niceStep = magnitude;
        else if (normalized <= 2) niceStep = 2 * magnitude;
        else if (normalized <= 5) niceStep = 5 * magnitude;
        else niceStep = 10 * magnitude;
        let guideValue = min;
        while (guideValue <= max) {
          const percentage = (guideValue - min) / (max - min) * 100;
          sliderHTML += `<span class="ubits-slider-range-guide-value" style="left: ${percentage}%">${Math.round(guideValue)}</span>`;
          guideValue += niceStep;
        }
      } else {
        sliderHTML += `<span class="ubits-slider-range-guide-value ubits-slider-range-guide-value--bold" style="left: 0%">${min}</span>`;
        const currentDisplayValue = isRange ? values[1] : value;
        sliderHTML += `<span class="ubits-slider-range-guide-value ubits-slider-range-guide-value--bold" id="${containerId}-range-guide-current" style="left: 100%">${currentDisplayValue}</span>`;
      }
      sliderHTML += `</div>`;
      sliderHTML += `</div>`;
    }
    if (showHelper && helperText) {
      sliderHTML += `<div class="ubits-input-helper">`;
      sliderHTML += `<span>${helperText}</span>`;
      sliderHTML += `</div>`;
    }
    sliderHTML += "</div>";
    const attrs = Object.entries(attributes).map(([key, val]) => `${key}="${val}"`).join(" ");
    if (attrs) {
      return `<div ${attrs}>${sliderHTML}</div>`;
    }
    return sliderHTML;
  }
  function createSlider(options) {
    const {
      containerId,
      onChange,
      onRangeChange,
      min = 0,
      max = 100,
      step = 1,
      mode = "single",
      value = 50,
      values = [25, 75],
      orientation = "horizontal",
      showInputs = false,
      state = "default",
      size = "md",
      showRangeGuide = false
    } = options;
    const effectiveShowInputs = showInputs || showRangeGuide;
    if (!containerId) {
      console.error("UBITS Slider: containerId es requerido");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`UBITS Slider: No se encontró el contenedor con ID "${containerId}"`);
      return null;
    }
    const sliderHTML = renderSlider(options);
    container.innerHTML = sliderHTML;
    const sliderElement = container.querySelector(`#${containerId}`) || container.querySelector(".ubits-slider");
    if (!sliderElement) {
      console.error("UBITS Slider: No se encontró el elemento slider");
      return null;
    }
    const track = container.querySelector(".ubits-slider-track");
    const thumbs = container.querySelectorAll(".ubits-slider-thumb");
    const valueDisplay = container.querySelector(`#${containerId}-value-display`);
    const isRange = mode === "range";
    const isVertical = orientation === "vertical";
    const isDisabled = state === "disabled";
    let inputMinInstance = null;
    let inputMaxInstance = null;
    let inputValueInstance = null;
    const createInputs = () => {
      if (!effectiveShowInputs) return;
      if (isRange) {
        const inputMinContainerId = `${containerId}-input-min`;
        let inputMinContainer = sliderElement.querySelector(
          `#${inputMinContainerId}`
        );
        if (!inputMinContainer) {
          inputMinContainer = container.querySelector(
            `#${inputMinContainerId}`
          );
        }
        if (!inputMinContainer) {
          inputMinContainer = document.getElementById(inputMinContainerId);
        }
        if (inputMinContainer) {
          inputMinContainer.style.width = "100px";
          inputMinContainer.style.minWidth = "80px";
          inputMinContainer.style.maxWidth = "100px";
          inputMinContainer.style.flexShrink = "0";
          try {
            inputMinInstance = createInput({
              containerId: inputMinContainerId,
              type: "number",
              size,
              state: isDisabled ? "disabled" : "default",
              value: values[0].toString(),
              showLabel: false,
              showHelper: false
            });
            const inputElement = inputMinContainer.querySelector("input");
            if (inputElement) {
              inputElement.setAttribute("data-slider-input", "min");
              inputElement.setAttribute("min", min.toString());
              inputElement.setAttribute("max", max.toString());
              inputElement.setAttribute("step", step.toString());
            }
            if (inputMinInstance) {
              const inputWrapper = inputMinContainer.querySelector(
                'div[style*="position: relative"]'
              );
              if (inputWrapper) {
                inputWrapper.style.width = "100%";
                inputWrapper.style.maxWidth = "100%";
              }
            }
          } catch (e) {
            console.warn("Error creating min input:", e);
          }
        } else {
          console.error(
            "UBITS Slider: No se encontró el contenedor del input min:",
            inputMinContainerId
          );
        }
        const inputMaxContainerId = `${containerId}-input-max`;
        let inputMaxContainer = sliderElement.querySelector(
          `#${inputMaxContainerId}`
        );
        if (!inputMaxContainer) {
          inputMaxContainer = container.querySelector(
            `#${inputMaxContainerId}`
          );
        }
        if (!inputMaxContainer) {
          inputMaxContainer = document.getElementById(inputMaxContainerId);
        }
        if (inputMaxContainer) {
          inputMaxContainer.style.width = "100px";
          inputMaxContainer.style.minWidth = "80px";
          inputMaxContainer.style.maxWidth = "100px";
          inputMaxContainer.style.flexShrink = "0";
          try {
            inputMaxInstance = createInput({
              containerId: inputMaxContainerId,
              type: "number",
              size,
              state: isDisabled ? "disabled" : "default",
              value: values[1].toString(),
              showLabel: false,
              showHelper: false
            });
            const inputElement = inputMaxContainer.querySelector("input");
            if (inputElement) {
              inputElement.setAttribute("data-slider-input", "max");
              inputElement.setAttribute("min", min.toString());
              inputElement.setAttribute("max", max.toString());
              inputElement.setAttribute("step", step.toString());
            }
            if (inputMaxInstance) {
              const inputWrapper = inputMaxContainer.querySelector(
                'div[style*="position: relative"]'
              );
              if (inputWrapper) {
                inputWrapper.style.width = "100%";
                inputWrapper.style.maxWidth = "100%";
              }
            }
          } catch (e) {
            console.warn("Error creating max input:", e);
          }
        } else {
          console.error(
            "UBITS Slider: No se encontró el contenedor del input max:",
            inputMaxContainerId
          );
        }
      } else {
        const inputValueContainerId = `${containerId}-input-value`;
        let inputValueContainer = sliderElement.querySelector(
          `#${inputValueContainerId}`
        );
        if (!inputValueContainer) {
          inputValueContainer = container.querySelector(
            `#${inputValueContainerId}`
          );
        }
        if (!inputValueContainer) {
          inputValueContainer = document.getElementById(inputValueContainerId);
        }
        if (inputValueContainer) {
          inputValueContainer.style.width = "100px";
          inputValueContainer.style.minWidth = "80px";
          inputValueContainer.style.maxWidth = "100px";
          inputValueContainer.style.flexShrink = "0";
          try {
            inputValueInstance = createInput({
              containerId: inputValueContainerId,
              type: "number",
              size,
              state: isDisabled ? "disabled" : "default",
              value: value.toString(),
              showLabel: false,
              showHelper: false
            });
            const inputElement = inputValueContainer.querySelector("input");
            if (inputElement) {
              inputElement.setAttribute("data-slider-input", "value");
              inputElement.setAttribute("min", min.toString());
              inputElement.setAttribute("max", max.toString());
              inputElement.setAttribute("step", step.toString());
            }
            if (inputValueInstance) {
              const inputWrapper = inputValueContainer.querySelector(
                'div[style*="position: relative"]'
              );
              if (inputWrapper) {
                inputWrapper.style.width = "100%";
                inputWrapper.style.maxWidth = "100%";
              }
            }
          } catch (e) {
            console.warn("Error creating value input:", e);
          }
        } else {
          console.error(
            "UBITS Slider: No se encontró el contenedor del input value:",
            inputValueContainerId
          );
        }
      }
      inputElements = getInputElements();
      setupInputListeners();
    };
    const getInputElements = () => {
      return container.querySelectorAll("input[data-slider-input]");
    };
    let inputElements = getInputElements();
    if (effectiveShowInputs) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          createInputs();
        });
      });
    }
    if (!sliderElement || !track || thumbs.length === 0) {
      console.error("UBITS Slider: No se pudo crear el elemento slider");
      return null;
    }
    let currentValue = isRange ? [...values] : value;
    let isDragging = false;
    let activeThumb = null;
    const getValueFromPosition = (clientX, clientY) => {
      const rect = track.getBoundingClientRect();
      let percentage;
      if (isVertical) {
        const y = clientY - rect.top;
        percentage = 1 - y / rect.height;
      } else {
        const x = clientX - rect.left;
        percentage = x / rect.width;
      }
      percentage = Math.max(0, Math.min(1, percentage));
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, steppedValue));
    };
    const updateThumbPosition = (thumb, val) => {
      const percentage = (val - min) / (max - min) * 100;
      if (isVertical) {
        thumb.style.top = `${100 - percentage}%`;
        thumb.style.left = "50%";
      } else {
        thumb.style.left = `${percentage}%`;
        thumb.style.top = "50%";
      }
      thumb.setAttribute("data-value", val.toString());
    };
    const updateTrackFill = () => {
      const trackFill = container.querySelector(".ubits-slider-track-fill");
      const trackRange = container.querySelector(".ubits-slider-track-range");
      if (isRange) {
        if (trackRange) {
          const minVal = currentValue[0];
          const maxVal = currentValue[1];
          const minPercentage = (minVal - min) / (max - min) * 100;
          const maxPercentage = (maxVal - min) / (max - min) * 100;
          if (isVertical) {
            const trackRect = track.getBoundingClientRect();
            const thumbElements = container.querySelectorAll(
              ".ubits-slider-thumb"
            );
            if (thumbElements.length >= 2 && trackRect.height > 0) {
              const minThumb = Array.from(thumbElements).find(
                (t) => t.classList.contains("ubits-slider-thumb--min")
              );
              const maxThumb = Array.from(thumbElements).find(
                (t) => t.classList.contains("ubits-slider-thumb--max")
              );
              if (minThumb && maxThumb) {
                const minThumbRect = minThumb.getBoundingClientRect();
                maxThumb.getBoundingClientRect();
                const thumbHeightPercent = minThumbRect.height / trackRect.height * 100;
                const adjustedMinPercentage = Math.max(0, minPercentage - thumbHeightPercent / 2);
                const adjustedMaxPercentage = Math.max(0, maxPercentage - thumbHeightPercent / 2);
                const adjustedRangeWidth = adjustedMaxPercentage - adjustedMinPercentage;
                trackRange.style.bottom = `${adjustedMinPercentage}%`;
                trackRange.style.height = `${adjustedRangeWidth}%`;
              } else {
                trackRange.style.bottom = `${minPercentage}%`;
                trackRange.style.height = `${maxPercentage - minPercentage}%`;
              }
            } else {
              trackRange.style.bottom = `${minPercentage}%`;
              trackRange.style.height = `${maxPercentage - minPercentage}%`;
            }
          } else {
            const rangeWidth = maxPercentage - minPercentage;
            trackRange.style.left = `${minPercentage}%`;
            trackRange.style.width = `${rangeWidth}%`;
          }
        }
      } else {
        if (trackFill) {
          const percentage = (currentValue - min) / (max - min) * 100;
          if (isVertical) {
            const trackRect = track.getBoundingClientRect();
            const thumbElement = container.querySelector(".ubits-slider-thumb");
            if (thumbElement && trackRect.height > 0) {
              const thumbRect = thumbElement.getBoundingClientRect();
              const thumbHeightPercent = thumbRect.height / trackRect.height * 100;
              const adjustedPercentage = Math.max(0, percentage - thumbHeightPercent / 2);
              trackFill.style.height = `${adjustedPercentage}%`;
              trackFill.style.bottom = "0";
            } else {
              trackFill.style.height = `${percentage}%`;
              trackFill.style.bottom = "0";
            }
          } else {
            trackFill.style.width = `${percentage}%`;
          }
        }
      }
    };
    const updateInputs = () => {
      inputElements = getInputElements();
      inputElements.forEach((input) => {
        const inputType = input.getAttribute("data-slider-input");
        if (inputType === "value" && !isRange) {
          input.value = currentValue.toString();
        } else if (inputType === "min" && isRange) {
          input.value = currentValue[0].toString();
        } else if (inputType === "max" && isRange) {
          input.value = currentValue[1].toString();
        }
      });
      if (inputValueInstance && !isRange) {
        inputValueInstance.setValue(currentValue.toString());
      }
      if (inputMinInstance && isRange) {
        inputMinInstance.setValue(currentValue[0].toString());
      }
      if (inputMaxInstance && isRange) {
        inputMaxInstance.setValue(currentValue[1].toString());
      }
      if (valueDisplay) {
        if (isRange) {
          const [minVal, maxVal] = currentValue;
          valueDisplay.textContent = `${minVal} - ${maxVal}`;
        } else {
          valueDisplay.textContent = currentValue.toString();
        }
      }
      const rangeGuideCurrent = container.querySelector(
        `#${containerId}-range-guide-current`
      );
      if (rangeGuideCurrent && !showRangeGuide) {
        if (isRange) {
          const maxVal = currentValue[1];
          rangeGuideCurrent.textContent = maxVal.toString();
        } else {
          rangeGuideCurrent.textContent = currentValue.toString();
        }
      }
    };
    const updateSlider = () => {
      if (isRange) {
        const [minVal, maxVal] = currentValue;
        const minThumb = container.querySelector(".ubits-slider-thumb--min");
        const maxThumb = container.querySelector(".ubits-slider-thumb--max");
        if (minThumb) updateThumbPosition(minThumb, minVal);
        if (maxThumb) updateThumbPosition(maxThumb, maxVal);
      } else {
        const thumb = thumbs[0];
        if (thumb) updateThumbPosition(thumb, currentValue);
      }
      updateTrackFill();
      updateInputs();
    };
    const handleThumbMouseDown = (e, thumb) => {
      if (isDisabled) return;
      e.preventDefault();
      isDragging = true;
      activeThumb = thumb;
      thumb.style.cursor = "grabbing";
    };
    const handleMouseMove = (e) => {
      if (!isDragging || !activeThumb || isDisabled) return;
      e.preventDefault();
      const newValue = getValueFromPosition(e.clientX, e.clientY);
      if (isRange) {
        const [minVal, maxVal] = currentValue;
        const isMinThumb = activeThumb.classList.contains("ubits-slider-thumb--min");
        if (isMinThumb) {
          const newMin = Math.min(newValue, maxVal - step);
          currentValue = [newMin, maxVal];
        } else {
          const newMax = Math.max(newValue, minVal + step);
          currentValue = [minVal, newMax];
        }
        if (onRangeChange) {
          onRangeChange(currentValue, e);
        }
      } else {
        currentValue = newValue;
        if (onChange) {
          onChange(newValue, e);
        }
      }
      updateSlider();
    };
    const handleMouseUp = () => {
      if (activeThumb) {
        activeThumb.style.cursor = "grab";
      }
      isDragging = false;
      activeThumb = null;
    };
    const handleTrackClick = (e) => {
      if (isDisabled || isDragging) return;
      const newValue = getValueFromPosition(e.clientX, e.clientY);
      if (isRange) {
        const [minVal, maxVal] = currentValue;
        const distanceToMin = Math.abs(newValue - minVal);
        const distanceToMax = Math.abs(newValue - maxVal);
        if (distanceToMin < distanceToMax) {
          const newMin = Math.min(newValue, maxVal - step);
          currentValue = [newMin, maxVal];
          if (onRangeChange) {
            onRangeChange(currentValue, e);
          }
        } else {
          const newMax = Math.max(newValue, minVal + step);
          currentValue = [minVal, newMax];
          if (onRangeChange) {
            onRangeChange(currentValue, e);
          }
        }
      } else {
        currentValue = newValue;
        if (onChange) {
          onChange(newValue, e);
        }
      }
      updateSlider();
    };
    if (thumbs.length === 0) {
      console.error("UBITS Slider: No se encontraron thumbs para agregar event listeners");
    } else {
      thumbs.forEach((thumb) => {
        thumb.addEventListener("mousedown", (e) => handleThumbMouseDown(e, thumb));
        thumb.addEventListener(
          "touchstart",
          (e) => {
            if (isDisabled) return;
            e.preventDefault();
            isDragging = true;
            activeThumb = thumb;
          },
          { passive: false }
        );
      });
    }
    if (track) {
      track.addEventListener("click", handleTrackClick);
    } else {
      console.error("UBITS Slider: No se encontró el track para agregar event listener");
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging || !activeThumb || isDisabled) return;
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) {
          handleMouseMove(
            new MouseEvent("mousemove", {
              clientX: touch.clientX,
              clientY: touch.clientY
            })
          );
        }
      },
      { passive: false }
    );
    document.addEventListener("touchend", handleMouseUp);
    const setupInputListeners = () => {
      inputElements = getInputElements();
      inputElements.forEach((input) => {
        const newInput = input.cloneNode(true);
        input.parentNode?.replaceChild(newInput, input);
        newInput.addEventListener("input", (e) => {
          if (isDisabled) return;
          const inputValue = parseFloat(newInput.value);
          if (isNaN(inputValue)) return;
          const clampedValue = Math.max(min, Math.min(max, inputValue));
          const inputType = newInput.getAttribute("data-slider-input");
          if (isRange) {
            const [minVal, maxVal] = currentValue;
            if (inputType === "min") {
              const newMin = Math.min(clampedValue, maxVal - step);
              currentValue = [newMin, maxVal];
              if (onRangeChange) {
                onRangeChange(currentValue, e);
              }
            } else if (inputType === "max") {
              const newMax = Math.max(clampedValue, minVal + step);
              currentValue = [minVal, newMax];
              if (onRangeChange) {
                onRangeChange(currentValue, e);
              }
            }
          } else {
            currentValue = clampedValue;
            if (onChange) {
              onChange(clampedValue, e);
            }
          }
          updateSlider();
        });
        newInput.addEventListener("blur", (e) => {
          const inputValue = parseFloat(newInput.value);
          if (isNaN(inputValue)) {
            updateSlider();
            return;
          }
          const clampedValue = Math.max(min, Math.min(max, inputValue));
          const inputType = newInput.getAttribute("data-slider-input");
          if (isRange) {
            const [minVal, maxVal] = currentValue;
            if (inputType === "min") {
              const newMin = Math.min(clampedValue, maxVal - step);
              currentValue = [newMin, maxVal];
            } else if (inputType === "max") {
              const newMax = Math.max(clampedValue, minVal + step);
              currentValue = [minVal, newMax];
            }
          } else {
            currentValue = clampedValue;
          }
          updateSlider();
        });
      });
    };
    thumbs.forEach((thumb) => {
      thumb.addEventListener("keydown", (e) => {
        if (isDisabled) return;
        let newValue;
        if (isRange) {
          const [minVal, maxVal] = currentValue;
          const isMinThumb = thumb.classList.contains("ubits-slider-thumb--min");
          const currentVal = isMinThumb ? minVal : maxVal;
          switch (e.key) {
            case "ArrowRight":
            case "ArrowUp":
              newValue = Math.min(currentVal + step, max);
              break;
            case "ArrowLeft":
            case "ArrowDown":
              newValue = Math.max(currentVal - step, min);
              break;
            case "Home":
              newValue = isMinThumb ? min : minVal;
              break;
            case "End":
              newValue = isMinThumb ? maxVal : max;
              break;
            default:
              return;
          }
          if (isMinThumb) {
            currentValue = [Math.min(newValue, maxVal - step), maxVal];
          } else {
            currentValue = [minVal, Math.max(newValue, minVal + step)];
          }
          if (onRangeChange) {
            onRangeChange(currentValue, e);
          }
        } else {
          const currentVal = currentValue;
          switch (e.key) {
            case "ArrowRight":
            case "ArrowUp":
              newValue = Math.min(currentVal + step, max);
              break;
            case "ArrowLeft":
            case "ArrowDown":
              newValue = Math.max(currentVal - step, min);
              break;
            case "Home":
              newValue = min;
              break;
            case "End":
              newValue = max;
              break;
            default:
              return;
          }
          currentValue = newValue;
          if (onChange) {
            onChange(newValue, e);
          }
        }
        e.preventDefault();
        updateSlider();
      });
    });
    updateSlider();
    return {
      element: sliderElement,
      getValue: () => currentValue,
      setValue: (newValue) => {
        if (isRange && Array.isArray(newValue)) {
          const [newMin, newMax] = newValue;
          if (newMin >= min && newMin <= max && newMax >= min && newMax <= max && newMin <= newMax) {
            currentValue = [newMin, newMax];
            updateSlider();
          }
        } else if (!isRange && typeof newValue === "number") {
          if (newValue >= min && newValue <= max) {
            currentValue = newValue;
            updateSlider();
          }
        }
      },
      disable: () => {
        sliderElement.classList.add("ubits-slider--disabled");
        thumbs.forEach((thumb) => {
          thumb.classList.add("ubits-slider-thumb--disabled");
          thumb.setAttribute("disabled", "");
        });
        inputElements.forEach((input) => {
          input.disabled = true;
        });
        if (inputMinInstance) inputMinInstance.disable();
        if (inputMaxInstance) inputMaxInstance.disable();
        if (inputValueInstance) inputValueInstance.disable();
      },
      enable: () => {
        sliderElement.classList.remove("ubits-slider--disabled");
        thumbs.forEach((thumb) => {
          thumb.classList.remove("ubits-slider-thumb--disabled");
          thumb.removeAttribute("disabled");
        });
        inputElements.forEach((input) => {
          input.disabled = false;
        });
        if (inputMinInstance) inputMinInstance.enable();
        if (inputMaxInstance) inputMaxInstance.enable();
        if (inputValueInstance) inputValueInstance.enable();
      },
      setState: (newState) => {
        if (newState === "disabled") {
          const instance = createSlider({ ...options, state: "disabled" });
          if (instance) {
            instance.disable();
          }
        } else {
          const instance = createSlider({ ...options, state: "default" });
          if (instance) {
            instance.enable();
          }
        }
      }
    };
  }
  const Slider = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    SliderAddon,
    createSlider,
    renderSlider
  }, Symbol.toStringTag, { value: "Module" }));
  const Spinner = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createSpinner,
    renderSpinner
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$3(iconName, iconStyle = "regular", iconColor) {
    const iconClass = iconStyle === "solid" ? "fas" : "far";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    const colorStyle = iconColor ? `style="color: ${iconColor};"` : "";
    return `<i class="${iconClass} ${name}" ${colorStyle}></i>`;
  }
  function formatValue(value) {
    if (typeof value === "number") {
      return value.toLocaleString("es-ES");
    }
    return String(value);
  }
  function renderStatItem(item, size = "md") {
    const { label, value, icon, iconStyle = "regular", iconColor, change, description } = item;
    const formattedValue = formatValue(value);
    const valueSizeClass = size === "sm" ? "ubits-body-sm" : size === "lg" ? "ubits-body-lg" : "ubits-body-md";
    const labelSizeClass = size === "sm" ? "ubits-body-xs" : "ubits-body-sm";
    const iconHTML = icon ? renderIconHelper$3(icon, iconStyle, iconColor) : "";
    let changeHTML = "";
    if (change) {
      const changeType = change.type;
      const changeClass = changeType === "increase" ? "ubits-stats-card__change--increase" : changeType === "decrease" ? "ubits-stats-card__change--decrease" : "ubits-stats-card__change--neutral";
      const changeIcon = changeType === "increase" ? "arrow-up" : changeType === "decrease" ? "arrow-down" : "minus";
      const changeLabel = change.label || `${Math.abs(change.value)}%`;
      changeHTML = `
      <div class="ubits-stats-card__change ${changeClass}">
        ${renderIconHelper$3(changeIcon, "solid")}
        <span class="${labelSizeClass}">${changeLabel}</span>
      </div>
    `;
    }
    const descriptionHTML = description ? `<p class="ubits-stats-card__description ${labelSizeClass}">${description}</p>` : "";
    return `
    <div class="ubits-stats-card__item">
      ${iconHTML ? `<div class="ubits-stats-card__icon">${iconHTML}</div>` : ""}
      <div class="ubits-stats-card__content">
        <div class="ubits-stats-card__label ${labelSizeClass}">${label}</div>
        <div class="ubits-stats-card__value ${valueSizeClass}">${formattedValue}</div>
        ${changeHTML}
        ${descriptionHTML}
      </div>
    </div>
  `;
  }
  function renderStatsCard(options) {
    const {
      title,
      variant = "default",
      size = "md",
      stats,
      layout = "grid",
      columns = 2,
      bordered = true,
      elevated = false,
      className = "",
      attributes = {},
      showAction = false,
      actionLabel = "Ver más"
    } = options;
    const classes = [
      "ubits-stats-card",
      `ubits-stats-card--${variant}`,
      `ubits-stats-card--${size}`,
      `ubits-stats-card--${layout}`,
      bordered && "ubits-stats-card--bordered",
      elevated && "ubits-stats-card--elevated",
      className
    ].filter(Boolean).join(" ");
    const attrs = [...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)].filter(Boolean).join(" ");
    const titleHTML = title ? `<div class="ubits-stats-card__header">
         <h3 class="ubits-stats-card__title ubits-heading-h3">${title}</h3>
         ${showAction ? `
           <button class="ubits-stats-card__action" type="button" aria-label="${actionLabel}">
             ${renderIconHelper$3("chevron-right", "solid")}
           </button>
         ` : ""}
       </div>` : "";
    const statsHTML = stats.map((item) => renderStatItem(item, size)).join("");
    const gridClass = layout === "grid" ? `ubits-stats-card__grid ubits-stats-card__grid--${columns}` : "";
    const containerClass = layout === "grid" ? gridClass : "ubits-stats-card__list";
    return `
    <div class="${classes}" ${attrs}>
      ${titleHTML}
      <div class="ubits-stats-card__body">
        <div class="${containerClass}">
          ${statsHTML}
        </div>
      </div>
    </div>
  `;
  }
  function createStatsCard(options) {
    const { containerId, ...cardOptions } = options;
    if (!containerId) {
      console.error("❌ [StatsCard] containerId es requerido para createStatsCard");
      return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ [StatsCard] Contenedor con ID "${containerId}" no encontrado`);
      return null;
    }
    const html = renderStatsCard(cardOptions);
    container.innerHTML = html;
    const cardElement = container.querySelector(".ubits-stats-card");
    if (!cardElement) {
      console.error("❌ [StatsCard] No se pudo crear el elemento de la tarjeta");
      return null;
    }
    if (cardOptions.onClick) {
      cardElement.addEventListener("click", cardOptions.onClick);
    }
    if (cardOptions.onAction && cardOptions.showAction) {
      const actionButton = cardElement.querySelector(".ubits-stats-card__action");
      if (actionButton) {
        actionButton.addEventListener("click", (e) => {
          e.stopPropagation();
          cardOptions.onAction?.(e);
        });
      }
    }
    console.log("✅ [StatsCard] Tarjeta creada exitosamente");
    return cardElement;
  }
  class UBITSStatsCard extends HTMLElement {
    constructor() {
      super(...arguments);
      this.options = {
        stats: []
      };
    }
    connectedCallback() {
      this.render();
    }
    static get observedAttributes() {
      return ["variant", "size", "layout", "columns", "bordered", "elevated"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
    setOptions(options) {
      this.options = { ...this.options, ...options };
      this.render();
    }
    getOptions() {
      return { ...this.options };
    }
    render() {
      const variant = this.getAttribute("variant") || this.options.variant;
      const size = this.getAttribute("size") || this.options.size;
      const layout = this.getAttribute("layout") || this.options.layout;
      const columns = parseInt(this.getAttribute("columns") || "2");
      const bordered = this.hasAttribute("bordered") || this.options.bordered;
      const elevated = this.hasAttribute("elevated") || this.options.elevated;
      const finalOptions = {
        ...this.options,
        variant,
        size,
        layout,
        columns,
        bordered,
        elevated
      };
      this.innerHTML = renderStatsCard(finalOptions);
      if (this.options.onClick) {
        this.addEventListener("click", this.options.onClick);
      }
    }
  }
  if (typeof window !== "undefined" && !customElements.get("ubits-stats-card")) {
    customElements.define("ubits-stats-card", UBITSStatsCard);
  }
  const StatsCardComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    UBITSStatsCard
  }, Symbol.toStringTag, { value: "Module" }));
  class StatsCardAddon {
    constructor() {
      this.name = "@ubits/stats-card";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-stats-card")) {
        customElements.define("ubits-stats-card", UBITSStatsCard);
      }
      if (typeof window !== "undefined") {
        window.UBITS = window.UBITS || {};
        window.UBITS.StatsCard = {
          render: (options) => {
            const { renderStatsCard: renderStatsCard2 } = require("./StatsCardProvider");
            return renderStatsCard2(options);
          },
          create: (options) => {
            const { createStatsCard: createStatsCard2 } = require("./StatsCardProvider");
            return createStatsCard2(options);
          }
        };
      }
      console.log("✅ StatsCard add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined" && window.UBITS?.StatsCard) {
        delete window.UBITS.StatsCard;
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-stats-card",
          tag: "ubits-stats-card",
          documentation: "https://ubits.design/components/stats-card"
        }
      ];
    }
    getStyles() {
      return ["./styles/stats-card.css"];
    }
  }
  if (typeof window !== "undefined") {
    Promise.resolve().then(() => StatsCardComponent).then(() => {
      console.log("✅ UBITS StatsCard component registered");
    });
  }
  const StatsCard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    StatsCardAddon,
    UBITSStatsCard,
    createStatsCard,
    renderStatsCard
  }, Symbol.toStringTag, { value: "Module" }));
  if (typeof window !== "undefined") {
    window.UBITS = window.UBITS || {};
    window.UBITS.StatusTag = {
      render: renderStatusTag,
      create: createStatusTag
    };
    if (!window.createStatusTag) {
      window.createStatusTag = createStatusTag;
    }
    if (!window.renderStatusTag) {
      window.renderStatusTag = renderStatusTag;
    }
  }
  const StatusTag = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createStatusTag,
    renderStatusTag
  }, Symbol.toStringTag, { value: "Module" }));
  function renderStepper(options) {
    const {
      orientation = "horizontal",
      size = "md",
      showTitle = true,
      showDescription = true,
      steps = [],
      className = ""
    } = options;
    if (steps.length === 0) {
      return "";
    }
    const classes = [
      "ubits-stepper",
      `ubits-stepper--${orientation}`,
      `ubits-stepper--${size}`,
      className
    ].filter(Boolean).join(" ");
    const stepsHtml = steps.map((step, index) => {
      const isLast = index === steps.length - 1;
      const stepState = step.state || (index === 0 ? "active" : "default");
      const connectorState = "default";
      return renderStep(
        step,
        stepState,
        isLast,
        orientation,
        showTitle,
        showDescription,
        connectorState
      );
    }).join("");
    return `
    <div class="${classes}">
      ${stepsHtml}
    </div>
  `.trim();
  }
  function renderStep(step, state, isLast, orientation, showTitle, showDescription, connectorState = "default") {
    const stepClasses = [
      "ubits-stepper__step",
      `ubits-stepper__step--${state}`,
      isLast ? "ubits-stepper__step--last" : ""
    ].filter(Boolean).join(" ");
    const indicator = renderStepIndicator(step.number, state);
    const connector = !isLast ? renderConnector(connectorState, orientation) : "";
    const content = renderStepContent(
      showTitle ? step.title : void 0,
      showDescription ? step.description : void 0
    );
    if (orientation === "vertical") {
      return `
      <div class="${stepClasses}">
        <div class="ubits-stepper__step-wrapper">
          ${indicator}
          <div class="ubits-stepper__step-content">
            ${content}
          </div>
        </div>
        ${connector}
      </div>
    `.trim();
    } else {
      return `
      <div class="${stepClasses}">
        ${indicator}
        ${content}
        ${connector}
      </div>
    `.trim();
    }
  }
  function renderStepIndicator(number, state) {
    const indicatorClasses = ["ubits-stepper__indicator", `ubits-stepper__indicator--${state}`].filter(Boolean).join(" ");
    let content = "";
    if (state === "completed") {
      content = `
      <svg class="ubits-stepper__checkmark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    } else {
      content = `<span class="ubits-stepper__number">${number}</span>`;
    }
    return `
    <div class="${indicatorClasses}">
      ${content}
    </div>
  `.trim();
  }
  function renderConnector(state, orientation) {
    const connectorClasses = ["ubits-stepper__connector", `ubits-stepper__connector--${orientation}`].filter(Boolean).join(" ");
    return `<div class="${connectorClasses}"></div>`;
  }
  function renderStepContent(title, description) {
    const titleHtml = title ? `<h3 class="ubits-stepper__title ubits-body-md-semibold">${escapeHtml(title)}</h3>` : "";
    const descriptionHtml = description ? `<p class="ubits-stepper__description ubits-body-sm-regular">${escapeHtml(description)}</p>` : "";
    if (!titleHtml && !descriptionHtml) {
      return '<div class="ubits-stepper__step-content ubits-stepper__step-content--empty"></div>';
    }
    return `
    <div class="ubits-stepper__step-content">
      <div class="ubits-stepper__content-wrapper">
        ${titleHtml}
        ${descriptionHtml}
      </div>
    </div>
  `.trim();
  }
  function escapeHtml(text) {
    if (typeof text !== "string") {
      return "";
    }
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function createStepper(options) {
    const { containerId, ...restOptions } = options;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderStepper(restOptions);
    const stepperElement = wrapper.firstElementChild;
    if (!stepperElement) {
      throw new Error("No se pudo crear el stepper");
    }
    let container;
    if (containerId) {
      container = document.getElementById(containerId) || document.body;
    } else {
      container = document.body;
    }
    container.appendChild(stepperElement);
    const update = (newOptions) => {
      const updatedOptions = { ...restOptions, ...newOptions };
      const newHtml = renderStepper(updatedOptions);
      const newWrapper = document.createElement("div");
      newWrapper.innerHTML = newHtml;
      const newElement = newWrapper.firstElementChild;
      if (newElement && stepperElement.parentNode) {
        stepperElement.parentNode.replaceChild(newElement, stepperElement);
        Object.assign(stepperElement, newElement);
      }
    };
    const destroy = () => {
      if (stepperElement.parentNode) {
        stepperElement.parentNode.removeChild(stepperElement);
      }
    };
    return {
      element: stepperElement,
      update,
      destroy
    };
  }
  const Stepper = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createStepper,
    renderStepper
  }, Symbol.toStringTag, { value: "Module" }));
  const SUBNAV_VARIANTS = {
    template: {
      name: "Plantilla",
      tabs: [
        { id: "section1", label: "Sección 1", icon: "far fa-home" },
        { id: "section2", label: "Sección 2", icon: "far fa-book" },
        { id: "section3", label: "Sección 3", icon: "far fa-chart-line" },
        { id: "section4", label: "Sección 4", icon: "far fa-cog" },
        { id: "section5", label: "Sección 5", icon: "far fa-star" }
      ]
    },
    aprendizaje: {
      name: "Aprendizaje",
      tabs: [
        { id: "home", label: "Inicio", icon: "far fa-home", url: "home-learn.html" },
        { id: "catalog", label: "Catálogo", icon: "far fa-book", url: "catalogo.html" },
        {
          id: "corporate",
          label: "U. Corporativa",
          icon: "far fa-building-columns",
          url: "u-corporativa.html"
        },
        {
          id: "study-zone",
          label: "Zona de estudio",
          icon: "far fa-books",
          url: "zona-estudio.html"
        }
      ]
    },
    desempeno: {
      name: "Desempeño",
      tabs: [
        {
          id: "evaluations",
          label: "Evaluaciones 360",
          icon: "far fa-chart-pie",
          url: "evaluaciones-360.html"
        },
        { id: "objectives", label: "Objetivos", icon: "far fa-bullseye", url: "objetivos.html" },
        { id: "metrics", label: "Métricas", icon: "far fa-chart-line", url: "metricas.html" },
        { id: "reports", label: "Reportes", icon: "far fa-file-chart-line", url: "reportes.html" }
      ]
    },
    encuestas: {
      name: "Encuestas",
      tabs: [
        {
          id: "encuestas",
          label: "Encuestas",
          icon: "far fa-clipboard-list-check",
          url: "encuestas.html"
        }
      ]
    },
    tareas: {
      name: "Tareas",
      tabs: [
        { id: "plans", label: "Planes", icon: "far fa-layer-group", url: "planes.html" },
        { id: "tasks", label: "Tareas", icon: "far fa-tasks", url: "tareas.html" }
      ]
    },
    empresa: {
      name: "Empresa",
      tabs: [
        { id: "gestion-usuarios", label: "Gestión de usuarios", icon: "far fa-users" },
        { id: "organigrama", label: "Organigrama", icon: "far fa-sitemap" },
        { id: "datos-empresa", label: "Datos de empresa", icon: "far fa-building" },
        { id: "personalizacion", label: "Personalización", icon: "far fa-paint-brush" },
        { id: "roles-permisos", label: "Roles y permisos", icon: "far fa-user-shield" },
        { id: "comunicaciones", label: "Comunicaciones", icon: "far fa-envelope" }
      ]
    },
    "admin-aprendizaje": {
      name: "Aprendizaje",
      tabs: [
        { id: "lms-cursos", label: "LMS - Cursos propios", icon: "far fa-book" },
        { id: "plan-formacion", label: "Plan de formación", icon: "far fa-clipboard-list-check" },
        { id: "certificados", label: "Certificados", icon: "far fa-file-certificate" },
        { id: "metricas-empresa", label: "Métricas de empresa", icon: "far fa-chart-line" }
      ]
    },
    "admin-desempeno": {
      name: "Desempeño",
      tabs: [
        { id: "evaluations", label: "Evaluaciones 360", icon: "far fa-chart-pie" },
        { id: "objectives", label: "Objetivos", icon: "far fa-bullseye" },
        { id: "matriz-talento", label: "Matriz de Talento", icon: "far fa-sitemap" }
      ]
    }
  };
  function getSubNavConfig(variant) {
    return SUBNAV_VARIANTS[variant] || SUBNAV_VARIANTS.template;
  }
  function renderIconHelper$2(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "regular" ? "far" : "fas";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderSubNav(options) {
    const { variant = "template", tabs: customTabs, activeTabId, showIcons = false } = options;
    const config = getSubNavConfig(variant);
    const tabs = variant === "template" && customTabs && customTabs.length > 0 ? customTabs : config.tabs;
    const activeId = activeTabId || (tabs.length > 0 ? tabs[0].id : "");
    const tabsHTML = tabs.map((tab) => {
      const isActive = tab.id === activeId || tab.active;
      const activeClass = isActive ? "ubits-sub-nav-tab--active" : "";
      const iconHTML = showIcons ? renderIconHelper$2(tab.icon) : "";
      return `
      <button 
        class="ubits-sub-nav-tab ${activeClass}" 
        data-tab="${tab.id}"
        ${tab.url ? `data-url="${tab.url}"` : ""}
        ${tab.onClick ? 'data-has-click-handler="true"' : ""}
      >
        ${iconHTML}
        <span>${tab.label}</span>
      </button>
    `;
    }).join("");
    return `
    <nav class="ubits-sub-nav" data-variant="${variant}">
      <div class="ubits-sub-nav-tabs">
        ${tabsHTML}
      </div>
    </nav>
  `.trim();
  }
  function initTabListeners$1(subNavElement, options) {
    const tabs = subNavElement.querySelectorAll(".ubits-sub-nav-tab");
    const handleTabClick = (tabElement) => {
      const tabId = tabElement.getAttribute("data-tab");
      const url = tabElement.getAttribute("data-url");
      tabs.forEach((t) => t.classList.remove("ubits-sub-nav-tab--active"));
      tabElement.classList.add("ubits-sub-nav-tab--active");
      if (url) {
        window.location.href = url;
        return;
      }
      const config = getSubNavConfig(options.variant || "template");
      const allTabs = options.variant === "template" && options.tabs && options.tabs.length > 0 ? options.tabs : config.tabs;
      const tabConfig = allTabs.find((t) => t.id === tabId);
      if (tabConfig && tabConfig.onClick) {
        tabConfig.onClick(new MouseEvent("click"));
      }
      if (options.onTabChange) {
        options.onTabChange(tabId || "", tabElement);
      }
      const event = new CustomEvent("subNavTabClick", {
        detail: { tabId, tabElement }
      });
      document.dispatchEvent(event);
    };
    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        handleTabClick(tab);
      });
    });
  }
  function createSubNav(options) {
    const { containerId } = options;
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    const subNavHTML = renderSubNav(options);
    container.innerHTML = subNavHTML;
    const subNavElement = container.querySelector(".ubits-sub-nav");
    if (!subNavElement) {
      throw new Error("Failed to create sub-nav element");
    }
    initTabListeners$1(subNavElement, options);
    return subNavElement;
  }
  function updateActiveSubNavTab(containerId, tabId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const subNavElement = container.querySelector(".ubits-sub-nav");
    if (!subNavElement) return;
    const tabs = subNavElement.querySelectorAll(".ubits-sub-nav-tab");
    tabs.forEach((t) => t.classList.remove("ubits-sub-nav-tab--active"));
    const targetTab = subNavElement.querySelector(`.ubits-sub-nav-tab[data-tab="${tabId}"]`);
    if (targetTab) {
      targetTab.classList.add("ubits-sub-nav-tab--active");
    }
  }
  const Subnav = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    SUBNAV_VARIANTS,
    createSubNav,
    getSubNavConfig,
    renderSubNav,
    updateActiveSubNavTab
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper$1(iconName, iconStyle = "regular") {
    const iconClass = iconStyle === "regular" ? "far" : "fas";
    const name = iconName.startsWith("fa-") ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
  }
  function renderTabBar(options) {
    const { items, activeTabId, visible = false, className = "" } = options;
    const containerClasses = ["ubits-tabbar", visible ? "ubits-tabbar--visible" : "", className].filter(Boolean).join(" ");
    const itemsHTML = items.map((item) => {
      const isActive = item.id === activeTabId;
      const itemClasses = ["ubits-tabbar-item", isActive ? "ubits-tabbar-item--active" : ""].filter(Boolean).join(" ");
      let iconOrAvatarHTML = "";
      if (item.avatar) {
        iconOrAvatarHTML = `<img src="${item.avatar}" alt="${item.avatarAlt || item.label}" class="ubits-tabbar-avatar">`;
      } else if (item.icon) {
        iconOrAvatarHTML = `<span class="ubits-tabbar-icon">${renderIconHelper$1(item.icon)}</span>`;
      }
      return `
      <div 
        class="${itemClasses}" 
        data-tab-id="${item.id}"
        data-has-click-handler="${item.onClick ? "true" : "false"}"
      >
        ${iconOrAvatarHTML}
        <span class="ubits-tabbar-text">${item.label}</span>
      </div>
    `;
    }).join("\n");
    return `
    <div class="${containerClasses}" id="ubits-tabbar">
      <div class="ubits-tabbar-content">
        ${itemsHTML}
      </div>
    </div>
  `;
  }
  function createTabBar(options) {
    const {
      containerId,
      container: providedContainer,
      items,
      activeTabId,
      onTabChange,
      visible = false,
      darkModeEnabled = false,
      onDarkModeToggle
    } = options;
    let container = null;
    if (providedContainer) {
      container = providedContainer;
    } else if (containerId) {
      container = document.getElementById(containerId);
    }
    if (!container) {
      console.error("TabBar: Contenedor no encontrado");
      return null;
    }
    const isPreview = container.classList.contains("ubits-tabbar-preview-container");
    const html = renderTabBar({
      ...options,
      visible: visible || isPreview,
      className: isPreview ? "ubits-tabbar--preview" : ""
    });
    container.innerHTML = html;
    if (isPreview) {
      const containerStyle = window.getComputedStyle(container);
      if (containerStyle.position === "static") {
        container.style.position = "relative";
      }
    }
    const tabBarElement = container.querySelector(".ubits-tabbar");
    if (!tabBarElement) {
      console.error("TabBar: Elemento no encontrado después de renderizar");
      return null;
    }
    const treeMenuSize = options.treeMenuSize || "md";
    initTabBarListeners(
      tabBarElement,
      items,
      onTabChange,
      darkModeEnabled,
      onDarkModeToggle,
      options.floatingMenuSections,
      options.profileMenuItems,
      options.onFloatingMenuItemClick,
      options.onProfileMenuItemClick,
      container,
      treeMenuSize
    );
    return tabBarElement;
  }
  function renderTreeNode(item, level = 0, size = "md", uniqueId = "floating-menu") {
    const hasChildren = item.children && item.children.length > 0 || item.subitems?.length > 0;
    const isLink = item.isLink || !hasChildren && item.url;
    const nodeId = `${uniqueId}-node-${level}-${item.id}`;
    const padding = size === "xs" ? "8px 12px" : size === "sm" ? "10px 14px" : size === "lg" ? "16px 20px" : "12px 16px";
    const minHeight = size === "xs" ? "28px" : size === "sm" ? "32px" : size === "lg" ? "48px" : "40px";
    const fontSize = size === "xs" ? "var(--font-body-xs-size, 11px)" : size === "sm" ? "var(--font-body-sm-size, 13px)" : size === "lg" ? "var(--font-body-lg-size, 20px)" : "var(--font-body-md-size, 16px)";
    const lineHeight = size === "xs" ? "var(--font-body-xs-line, 16.5px)" : size === "sm" ? "var(--font-body-sm-line, 19.5px)" : size === "lg" ? "var(--font-body-lg-line, 30px)" : "var(--font-body-md-line, 24px)";
    const iconSize = size === "xs" ? "12px" : size === "sm" ? "14px" : size === "lg" ? "18px" : "16px";
    const chevronSize = size === "xs" ? "10px" : size === "sm" ? "12px" : size === "lg" ? "16px" : "14px";
    const typographyClass = size === "xs" ? "ubits-body-xs-regular" : size === "sm" ? "ubits-body-sm-regular" : size === "lg" ? "ubits-body-lg-regular" : "ubits-body-md-regular";
    if (isLink) {
      const iconHTML2 = level === 0 && item.icon ? `
      <span class="ubits-tree-node__icon" style="font-size: ${iconSize};">
        ${renderIconHelper$1(item.icon)}
      </span>
    ` : "";
      return `
      <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${level}">
        <a 
          href="${item.url || "#"}" 
          class="ubits-tree-node__content" 
          data-section-id="${item.id}"
          data-size="${size}"
          style="min-height: ${minHeight} !important; padding: ${padding} !important; font-size: ${fontSize} !important; line-height: ${lineHeight} !important; margin: 0 !important; border: none !important; text-decoration: none; display: flex; align-items: center; gap: var(--ubits-spacing-sm, 8px);"
          role="treeitem"
          aria-label="${item.title}"
        >
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
          ${iconHTML2}
          <span class="ubits-tree-node__label ${typographyClass}" style="line-height: ${lineHeight};">${item.title}</span>
        </a>
      </div>
    `;
    }
    const children = item.children || item.subitems?.map((sub) => ({
      id: sub.id,
      title: sub.title,
      icon: sub.icon,
      url: sub.url,
      children: void 0
    })) || [];
    const childrenHTML = children.map((child) => renderTreeNode(child, level + 1, size, uniqueId)).join("");
    const iconHTML = level === 0 && item.icon ? `
    <span class="ubits-tree-node__icon" style="font-size: ${iconSize};">
      ${renderIconHelper$1(item.icon)}
    </span>
  ` : "";
    return `
    <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${level}">
      <div 
        class="ubits-tree-node__content ubits-tree-node__content--expandable" 
        data-node-id="${nodeId}"
        data-size="${size}"
        data-expanded="false"
        style="min-height: ${minHeight} !important; padding: ${padding} !important; font-size: ${fontSize} !important; line-height: ${lineHeight} !important; margin: 0 !important; border: none !important; cursor: pointer; display: flex; align-items: center; gap: var(--ubits-spacing-sm, 8px);"
        role="button"
        tabindex="0"
        aria-expanded="false"
        aria-label="${item.title}"
      >
        <span class="ubits-tree-node__chevron" style="width: ${chevronSize}; height: ${chevronSize};">
          <i class="far fa-chevron-right" style="font-size: ${chevronSize};"></i>
        </span>
        ${iconHTML}
        <span class="ubits-tree-node__label ${typographyClass}" style="line-height: ${lineHeight};">${item.title}</span>
      </div>
      <div class="ubits-tree-node__children ubits-tree-node__children--vertical" data-children-id="${nodeId}" style="display: none;">
        ${childrenHTML}
      </div>
    </div>
  `;
  }
  function renderFloatingMenu(sections, size = "md") {
    const uniqueId = `floating-menu-${Date.now()}`;
    const treeHTML = sections.map((section) => renderTreeNode(section, 0, size, uniqueId)).join("");
    return `
    <div class="ubits-floating-menu" id="ubits-floating-menu">
      <div class="ubits-floating-menu-header">
        <h2 class="ubits-floating-menu-title">Módulos</h2>
        <button class="ubits-floating-menu-close" id="ubits-floating-menu-close">
          ${renderIconHelper$1("times")}
        </button>
      </div>
      <div class="ubits-floating-menu-content">
        <div class="ubits-tree-menu ubits-tree-menu--vertical" role="tree">
          ${treeHTML}
        </div>
      </div>
    </div>
  `;
  }
  function renderProfileTreeMenuItem(item, level = 0, size = "md") {
    const hasChildren = item.children && item.children.length > 0;
    const indent = level * 24;
    const sizeClass = `ubits-profile-tree-${hasChildren ? "header" : "link"}--${size}`;
    const iconHTML = level === 0 ? `<i class="far fa-${item.icon} ubits-profile-tree-icon"></i>` : "";
    if (!hasChildren) {
      return `
      <div class="ubits-profile-tree-item" data-profile-item-id="${item.id}" data-tree-level="${level}" style="padding-left: ${indent}px;">
        <a href="${item.url || "#"}" class="ubits-profile-tree-link ${sizeClass}" ${item.onClick ? 'data-has-onclick="true"' : ""}>
          ${iconHTML}
          <span class="ubits-profile-tree-text">${item.label}</span>
        </a>
      </div>
    `;
    }
    const childrenHTML = item.children.map((child) => renderProfileTreeMenuItem(child, level + 1, size)).join("");
    return `
    <div class="ubits-profile-tree-item" data-profile-item-id="${item.id}" data-tree-level="${level}" style="padding-left: ${indent}px;">
      <div class="ubits-profile-tree-node" data-tree-node-id="${item.id}">
        <div class="ubits-profile-tree-header ${sizeClass}">
          ${iconHTML}
          <span class="ubits-profile-tree-text">${item.label}</span>
          <i class="far fa-chevron-down ubits-profile-tree-chevron" data-chevron-id="${item.id}"></i>
        </div>
        <div class="ubits-profile-tree-children" data-tree-children-id="${item.id}" style="display: none;">
          ${childrenHTML}
        </div>
      </div>
    </div>
  `;
  }
  function renderProfileMenu(items, size = "md") {
    const itemsHTML = items.map((item) => renderProfileTreeMenuItem(item, 0, size)).join("");
    return `
    <div class="ubits-profile-menu" id="ubits-profile-menu">
      ${itemsHTML}
    </div>
  `;
  }
  function initTabBarListeners(tabBarElement, items, onTabChange, darkModeEnabled = false, onDarkModeToggle, floatingMenuSections, profileMenuItems, onFloatingMenuItemClick, onProfileMenuItemClick, container, treeMenuSize = "md") {
    const tabItems = tabBarElement.querySelectorAll(".ubits-tabbar-item");
    const tabBarContainer = container || tabBarElement.parentElement;
    const isPreview = tabBarContainer?.classList.contains("ubits-tabbar-preview-container");
    let floatingMenuContainer = null;
    let profileMenuContainer = null;
    if (floatingMenuSections && floatingMenuSections.length > 0) {
      floatingMenuContainer = document.getElementById("ubits-floating-menu-container") || document.createElement("div");
      floatingMenuContainer.id = "ubits-floating-menu-container";
      if (isPreview) {
        floatingMenuContainer.style.cssText = "position: absolute; top: 0; left: 0; right: 0; bottom: 68px; width: 100%; height: 500px; z-index: 2000; overflow: visible; display: none;";
      } else {
        floatingMenuContainer.style.cssText = "";
      }
      if (!document.getElementById("ubits-floating-menu-container")) {
        if (tabBarContainer) {
          tabBarContainer.appendChild(floatingMenuContainer);
        } else {
          document.body.appendChild(floatingMenuContainer);
        }
      }
      const floatingMenuHTML = renderFloatingMenu(floatingMenuSections, treeMenuSize);
      floatingMenuContainer.innerHTML = floatingMenuHTML;
      initFloatingMenuListeners(floatingMenuContainer, onFloatingMenuItemClick);
    }
    if (profileMenuItems && profileMenuItems.length > 0) {
      profileMenuContainer = document.getElementById("ubits-profile-menu-container") || document.createElement("div");
      profileMenuContainer.id = "ubits-profile-menu-container";
      if (isPreview) {
        profileMenuContainer.style.cssText = "position: absolute; bottom: 68px; left: 0; right: 0; width: 100%; max-width: 100%; z-index: 2001; overflow: visible; display: none;";
      } else {
        profileMenuContainer.style.cssText = "";
      }
      if (!document.getElementById("ubits-profile-menu-container")) {
        if (tabBarContainer) {
          tabBarContainer.appendChild(profileMenuContainer);
        } else {
          document.body.appendChild(profileMenuContainer);
        }
      }
      const profileMenuHTML = renderProfileMenu(profileMenuItems, treeMenuSize);
      profileMenuContainer.innerHTML = profileMenuHTML;
      if (isPreview) {
        const profileMenu = profileMenuContainer.querySelector(".ubits-profile-menu");
        if (profileMenu) {
          profileMenu.classList.add("ubits-profile-menu--preview");
          profileMenu.style.cssText = "position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;";
        }
      }
      initProfileMenuListeners(profileMenuContainer, profileMenuItems, onProfileMenuItemClick);
    }
    tabItems.forEach((tabItemElement) => {
      const itemElement = tabItemElement;
      const tabId = itemElement.getAttribute("data-tab-id");
      if (!tabId) return;
      const item = items.find((i) => i.id === tabId);
      if (!item) return;
      itemElement.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (tabId === "modo-oscuro" && darkModeEnabled) {
          toggleDarkMode(tabBarElement, onDarkModeToggle);
          if (floatingMenuContainer) {
            floatingMenuContainer.style.display = "none";
            const floatingMenu = floatingMenuContainer.querySelector(
              ".ubits-floating-menu"
            );
            if (floatingMenu) {
              floatingMenu.classList.remove("ubits-floating-menu--show");
            }
          }
          if (profileMenuContainer) {
            profileMenuContainer.style.display = "none";
            const profileMenu = profileMenuContainer.querySelector(
              ".ubits-profile-menu"
            );
            if (profileMenu) {
              profileMenu.classList.remove("ubits-profile-menu--show");
            }
          }
          return;
        }
        if (tabId === "modulos" && floatingMenuContainer) {
          const floatingMenu = floatingMenuContainer.querySelector(
            ".ubits-floating-menu"
          );
          if (floatingMenu) {
            if (floatingMenu.classList.contains("ubits-floating-menu--show")) {
              floatingMenu.classList.remove("ubits-floating-menu--show");
            } else {
              floatingMenu.classList.add("ubits-floating-menu--show");
              if (isPreview && floatingMenuContainer) {
                floatingMenu.classList.add("ubits-floating-menu--preview");
                const tabBarRect = tabBarElement.getBoundingClientRect();
                const containerRect = container ? container.getBoundingClientRect() : { top: 0 };
                const tabBarHeight = 60;
                const spaceBetween = 8;
                tabBarRect.top - containerRect.top;
                floatingMenuContainer.style.display = "block";
                floatingMenuContainer.style.position = "absolute";
                floatingMenuContainer.style.top = "0";
                floatingMenuContainer.style.left = "0";
                floatingMenuContainer.style.right = "0";
                floatingMenuContainer.style.bottom = `${tabBarHeight + spaceBetween}px`;
                floatingMenuContainer.style.width = "100%";
                floatingMenuContainer.style.height = "";
                floatingMenuContainer.style.zIndex = "2000";
                floatingMenuContainer.style.overflow = "visible";
                floatingMenuContainer.style.boxSizing = "border-box";
                floatingMenu.style.cssText = "position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; max-width: 100%; display: block; box-sizing: border-box;";
              }
              if (profileMenuContainer) {
                const profileMenu = profileMenuContainer.querySelector(
                  ".ubits-profile-menu"
                );
                if (profileMenu) {
                  profileMenu.classList.remove("ubits-profile-menu--show");
                }
                profileMenuContainer.style.display = "none";
              }
            }
          }
          return;
        }
        if (tabId === "perfil" && profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector(
            ".ubits-profile-menu"
          );
          if (profileMenu) {
            if (profileMenu.classList.contains("ubits-profile-menu--show")) {
              profileMenu.classList.remove("ubits-profile-menu--show");
              profileMenuContainer.style.display = "none";
            } else {
              profileMenu.classList.add("ubits-profile-menu--show");
              if (isPreview && profileMenuContainer) {
                tabBarElement.getBoundingClientRect();
                profileMenuContainer.style.display = "block";
                profileMenuContainer.style.position = "absolute";
                profileMenuContainer.style.bottom = "68px";
                profileMenuContainer.style.left = "0";
                profileMenuContainer.style.right = "0";
                profileMenuContainer.style.width = "100%";
                profileMenuContainer.style.maxWidth = "100%";
                profileMenuContainer.style.zIndex = "2001";
                profileMenuContainer.style.overflow = "visible";
                const profileMenuInner = profileMenuContainer.querySelector(
                  ".ubits-profile-menu"
                );
                if (profileMenuInner) {
                  profileMenuInner.style.cssText = "position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;";
                  profileMenuInner.classList.add("ubits-profile-menu--preview");
                }
              }
              if (floatingMenuContainer) {
                const floatingMenu = floatingMenuContainer.querySelector(
                  ".ubits-floating-menu"
                );
                if (floatingMenu) {
                  floatingMenu.classList.remove("ubits-floating-menu--show");
                }
              }
            }
          }
          return;
        }
        if (item.onClick) {
          item.onClick(item, event);
        }
        updateActiveTab(tabBarElement, tabId);
        if (onTabChange) {
          onTabChange(tabId, item, itemElement);
        }
      });
    });
  }
  function initFloatingMenuListeners(container, onFloatingMenuItemClick) {
    const floatingMenu = container.querySelector(".ubits-floating-menu");
    if (!floatingMenu) return;
    const closeButton = floatingMenu.querySelector("#ubits-floating-menu-close");
    if (closeButton) {
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (container) {
          container.style.display = "none";
        }
        if (floatingMenu) {
          floatingMenu.classList.remove("ubits-floating-menu--show");
        }
      });
    }
    const treeElement = floatingMenu.querySelector(".ubits-tree-menu");
    if (treeElement) {
      treeElement.addEventListener("click", (e) => {
        const target = e.target;
        const content = target.closest(".ubits-tree-node__content");
        if (!content) return;
        if (content.classList.contains("ubits-tree-node__content--expandable")) {
          const nodeId = content.getAttribute("data-node-id");
          const children = treeElement.querySelector(`[data-children-id="${nodeId}"]`);
          const chevron = content.querySelector(".ubits-tree-node__chevron i");
          const isExpanded = content.getAttribute("data-expanded") === "true";
          if (children) {
            if (isExpanded) {
              children.style.display = "none";
              content.setAttribute("data-expanded", "false");
              content.setAttribute("aria-expanded", "false");
              if (chevron) {
                chevron.className = "far fa-chevron-right";
              }
            } else {
              children.style.display = "block";
              content.setAttribute("data-expanded", "true");
              content.setAttribute("aria-expanded", "true");
              if (chevron) {
                chevron.className = "far fa-chevron-down";
              }
            }
          }
        }
        const allContents = treeElement.querySelectorAll(".ubits-tree-node__content");
        allContents.forEach((node) => {
          node.classList.remove("ubits-tree-node__content--active");
          node.removeAttribute("aria-selected");
        });
        content.classList.add("ubits-tree-node__content--active");
        content.setAttribute("aria-selected", "true");
        if (!content.classList.contains("ubits-tree-node__content--expandable")) {
          const sectionId = content.getAttribute("data-section-id");
          const url = content.getAttribute("href");
          if (onFloatingMenuItemClick && sectionId) {
            onFloatingMenuItemClick(sectionId, void 0, url || void 0);
          }
        }
      });
      treeElement.addEventListener("keydown", (e) => {
        const target = e.target;
        const content = target.closest(".ubits-tree-node__content");
        if (!content) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          content.click();
        }
      });
    }
    const escHandler = (e) => {
      if (e.key === "Escape" && floatingMenu.classList.contains("ubits-floating-menu--show")) {
        container.style.display = "none";
        floatingMenu.classList.remove("ubits-floating-menu--show");
      }
    };
    document.addEventListener("keydown", escHandler);
    const clickOutsideHandler = (e) => {
      if (floatingMenu.classList.contains("ubits-floating-menu--show")) {
        const target = e.target;
        if (!floatingMenu.contains(target) && !target.closest('[data-tab-id="modulos"]')) {
          container.style.display = "none";
          floatingMenu.classList.remove("ubits-floating-menu--show");
        }
      }
    };
    document.addEventListener("click", clickOutsideHandler);
  }
  function initProfileMenuListeners(container, items, onProfileMenuItemClick) {
    const profileMenu = container.querySelector(".ubits-profile-menu");
    if (!profileMenu) return;
    const treeNodes = profileMenu.querySelectorAll(".ubits-profile-tree-node");
    treeNodes.forEach((node) => {
      const header = node.querySelector(".ubits-profile-tree-header");
      if (header) {
        header.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const nodeId = node.getAttribute("data-tree-node-id");
          if (nodeId) {
            toggleProfileTreeMenuNode(profileMenu, nodeId);
          }
        });
      }
    });
    const links = profileMenu.querySelectorAll(".ubits-profile-tree-link");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const itemId = link.closest("[data-profile-item-id]")?.getAttribute("data-profile-item-id");
        profileMenu.querySelectorAll(".ubits-profile-tree-link").forEach((l) => {
          l.classList.remove("ubits-profile-tree-link--active");
        });
        link.classList.add("ubits-profile-tree-link--active");
        if (itemId) {
          const item = items.find((i) => i.id === itemId);
          if (item) {
            if (item.onClick) {
              item.onClick();
            } else if (item.url) {
              window.location.href = item.url;
            }
            if (onProfileMenuItemClick) {
              onProfileMenuItemClick(itemId, item);
            }
            hideProfileMenu();
          }
        }
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && profileMenu.classList.contains("ubits-profile-menu--show")) {
        hideProfileMenu();
      }
    });
    document.addEventListener("click", (e) => {
      if (profileMenu.classList.contains("ubits-profile-menu--show")) {
        const target = e.target;
        if (!profileMenu.contains(target) && !target.closest('[data-tab-id="perfil"]')) {
          hideProfileMenu();
        }
      }
    });
  }
  function toggleProfileTreeMenuNode(container, nodeId) {
    const children = container.querySelector(`[data-tree-children-id="${nodeId}"]`);
    const chevron = container.querySelector(`[data-chevron-id="${nodeId}"]`);
    const header = container.querySelector(
      `[data-tree-node-id="${nodeId}"] .ubits-profile-tree-header`
    );
    if (!children || !chevron) {
      console.warn(`Profile tree menu node not found: ${nodeId}`, {
        children: !!children,
        chevron: !!chevron
      });
      return;
    }
    const computedStyle = window.getComputedStyle(children);
    const isCurrentlyOpen = computedStyle.display !== "none";
    if (isCurrentlyOpen) {
      children.style.display = "none";
      chevron.style.transform = "rotate(0deg)";
      if (header) header.classList.remove("ubits-profile-tree-header--active");
    } else {
      children.style.display = "block";
      chevron.style.transform = "rotate(180deg)";
      if (header) header.classList.add("ubits-profile-tree-header--active");
    }
  }
  function hideProfileMenu() {
    const profileMenu = document.getElementById("ubits-profile-menu");
    if (profileMenu) {
      profileMenu.classList.remove("ubits-profile-menu--show");
    }
  }
  function updateActiveTab(tabBarElement, activeTabId) {
    const allTabs = tabBarElement.querySelectorAll(".ubits-tabbar-item");
    allTabs.forEach((tab) => {
      const tabId = tab.getAttribute("data-tab-id");
      if (tabId === activeTabId) {
        tab.classList.add("ubits-tabbar-item--active");
      } else {
        tab.classList.remove("ubits-tabbar-item--active");
      }
    });
  }
  function toggleDarkMode(tabBarElement, onDarkModeToggle) {
    let themeContainer = tabBarElement.closest("[data-theme]");
    if (!themeContainer) {
      themeContainer = document.body;
    }
    const currentTheme = themeContainer.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    themeContainer.setAttribute("data-theme", newTheme);
    if (onDarkModeToggle) {
      onDarkModeToggle(newTheme === "dark");
    }
  }
  const defaultFloatingMenuSections = [
    {
      id: "aprendizaje",
      title: "Aprendizaje",
      icon: "graduation-cap",
      subitems: [
        { id: "inicio", title: "Inicio", icon: "home", url: "home-learn.html" },
        { id: "catalogo", title: "Catálogo", icon: "book", url: "catalogo.html" },
        {
          id: "corporativa",
          title: "U. Corporativa",
          icon: "building-columns",
          url: "u-corporativa.html"
        },
        { id: "zona-estudio", title: "Zona de estudio", icon: "books", url: "zona-estudio.html" }
      ]
    },
    {
      id: "diagnostico",
      title: "Diagnóstico",
      icon: "chart-mixed",
      url: "diagnostico.html",
      isLink: true,
      clickable: true
    },
    {
      id: "desempeno",
      title: "Desempeño",
      icon: "bars-progress",
      subitems: [
        {
          id: "evaluaciones-360",
          title: "Evaluaciones 360",
          icon: "chart-pie",
          url: "evaluaciones-360.html"
        },
        { id: "objetivos", title: "Objetivos", icon: "bullseye", url: "objetivos.html" },
        { id: "metricas", title: "Métricas", icon: "chart-line", url: "metricas.html" },
        { id: "reportes", title: "Reportes", icon: "file-chart-line", url: "reportes.html" }
      ]
    },
    {
      id: "encuestas",
      title: "Encuestas",
      icon: "clipboard-list-check",
      url: "encuestas.html",
      isLink: true,
      clickable: false
    },
    {
      id: "reclutamiento",
      title: "Reclutamiento",
      icon: "users",
      url: "reclutamiento.html",
      isLink: true,
      clickable: true
    },
    {
      id: "tareas",
      title: "Tareas",
      icon: "layer-group",
      subitems: [
        { id: "planes", title: "Planes", icon: "calendar", url: "planes.html" },
        { id: "tareas", title: "Tareas", icon: "tasks", url: "tareas.html" }
      ]
    },
    {
      id: "ubits-ai",
      title: "UBITS AI",
      icon: "sparkles",
      url: "ubits-ai.html",
      isLink: true,
      clickable: true
    }
  ];
  const defaultProfileMenuItems = [
    {
      id: "ver-perfil",
      label: "Ver mi perfil",
      icon: "user",
      url: "profile.html"
    },
    {
      id: "cambio-contraseña",
      label: "Cambio de contraseña",
      icon: "key",
      onClick: () => {
      }
    },
    {
      id: "cerrar-sesion",
      label: "Cerrar sesión",
      icon: "sign-out-alt",
      onClick: () => {
      }
    }
  ];
  const Tabbar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createTabBar,
    defaultFloatingMenuSections,
    defaultProfileMenuItems,
    renderTabBar
  }, Symbol.toStringTag, { value: "Module" }));
  function renderIconHelper(iconName, isActive = false) {
    if (!iconName) return "";
    let normalizedIcon = iconName;
    if (!normalizedIcon.startsWith("fa-")) {
      normalizedIcon = `fa-${normalizedIcon}`;
    }
    const iconStyle = isActive ? "fas" : "far";
    if (normalizedIcon.startsWith("far ") || normalizedIcon.startsWith("fas ")) {
      const iconNameOnly = normalizedIcon.replace(/^(far|fas)\s+/, "");
      return `<i class="${iconStyle} ${iconNameOnly}"></i>`;
    }
    return `<i class="${iconStyle} ${normalizedIcon}"></i>`;
  }
  function renderTabs(options) {
    const { tabs, activeTabId, className = "" } = options;
    if (!tabs || tabs.length === 0) {
      return '<div class="ubits-tabs"></div>';
    }
    let activeId = activeTabId;
    if (!activeId) {
      const activeTab = tabs.find((tab) => tab.active);
      activeId = activeTab ? activeTab.id : tabs[0].id;
    }
    const tabsHTML = tabs.map((tab) => {
      const isActive = tab.id === activeId;
      const activeClass = isActive ? "ubits-tab--active" : "";
      const disabledClass = tab.disabled ? "ubits-tab--disabled" : "";
      const classes = ["ubits-tab", activeClass, disabledClass].filter(Boolean).join(" ");
      const iconHTML = tab.icon ? renderIconHelper(tab.icon, isActive) : "";
      return `
      <button 
        class="${classes}" 
        data-tab-id="${tab.id}"
        ${tab.disabled ? "disabled" : ""}
        ${tab.url ? `data-url="${tab.url}"` : ""}
        ${tab.onClick ? 'data-has-click-handler="true"' : ""}
      >
        ${iconHTML}
        <span class="ubits-tab__label">${tab.label}</span>
      </button>
    `;
    }).join("");
    const containerClasses = ["ubits-tabs", className].filter(Boolean).join(" ");
    return `
    <div class="${containerClasses}">
      ${tabsHTML}
    </div>
  `.trim();
  }
  function initTabListeners(tabsElement, options) {
    const existingTabs = tabsElement.querySelectorAll(
      ".ubits-tab[data-listener-attached]"
    );
    existingTabs.forEach((tab) => {
      const clonedTab = tab.cloneNode(true);
      tab.parentNode?.replaceChild(clonedTab, tab);
    });
    const tabs = tabsElement.querySelectorAll(".ubits-tab:not(.ubits-tab--disabled)");
    const handleTabClick = (tabElement) => {
      const tabId = tabElement.getAttribute("data-tab-id");
      const url = tabElement.getAttribute("data-url");
      console.log("🔵 [Tabs] handleTabClick - Tab clickeado:", tabId);
      console.log("🔵 [Tabs] handleTabClick - URL:", url);
      console.log("🔵 [Tabs] handleTabClick - Elemento:", tabElement);
      tabsElement.querySelectorAll(".ubits-tab").forEach((t) => {
        const currentTabId = t.getAttribute("data-tab-id");
        console.log("🔵 [Tabs] Removiendo active de tab:", currentTabId);
        t.classList.remove("ubits-tab--active");
        console.log("🔵 [Tabs] Clases después de remover active:", t.className);
        const iconElement = t.querySelector("i");
        if (iconElement) {
          console.log("🔵 [Tabs] Icono antes de actualizar:", iconElement.className);
          const iconName = iconElement.className.replace(/^(fas|far)\s+/, "").replace(/^fa-/, "");
          console.log("🔵 [Tabs] Nombre del icono extraído:", iconName);
          if (iconName) {
            iconElement.className = `far fa-${iconName}`;
            console.log("🔵 [Tabs] Icono después de actualizar a regular:", iconElement.className);
          } else {
            console.warn("⚠️ [Tabs] No se pudo extraer el nombre del icono");
          }
        } else {
          console.warn("⚠️ [Tabs] No se encontró elemento <i> en el tab:", currentTabId);
        }
      });
      console.log("🔵 [Tabs] Agregando active a tab:", tabId);
      tabElement.classList.add("ubits-tab--active");
      console.log("🔵 [Tabs] Clases después de agregar active:", tabElement.className);
      const activeIconElement = tabElement.querySelector("i");
      if (activeIconElement) {
        console.log("🔵 [Tabs] Icono activo antes de actualizar:", activeIconElement.className);
        const iconName = activeIconElement.className.replace(/^(fas|far)\s+/, "").replace(/^fa-/, "");
        console.log("🔵 [Tabs] Nombre del icono activo extraído:", iconName);
        if (iconName) {
          activeIconElement.className = `fas fa-${iconName}`;
          console.log(
            "🔵 [Tabs] Icono activo después de actualizar a solid:",
            activeIconElement.className
          );
        } else {
          console.warn("⚠️ [Tabs] No se pudo extraer el nombre del icono activo");
        }
      } else {
        console.warn("⚠️ [Tabs] No se encontró elemento <i> en el tab activo:", tabId);
      }
      if (url) {
        window.location.href = url;
        return;
      }
      const tabConfig = options.tabs.find((t) => t.id === tabId);
      if (tabConfig && tabConfig.onClick) {
        tabConfig.onClick(new MouseEvent("click"));
      }
      if (options.onTabChange) {
        options.onTabChange(tabId || "", tabElement);
      }
      const event = new CustomEvent("tabsTabClick", {
        detail: { tabId, tabElement }
      });
      document.dispatchEvent(event);
    };
    console.log("🔵 [Tabs] Agregando event listeners a", tabs.length, "tabs");
    tabs.forEach((tab, index) => {
      const tabId = tab.getAttribute("data-tab-id");
      console.log("🔵 [Tabs] Agregando listener a tab", index, "- ID:", tabId);
      tab.setAttribute("data-listener-attached", "true");
      tab.addEventListener("click", (e) => {
        console.log("🔵 [Tabs] Click detectado en tab:", tabId);
        e.preventDefault();
        handleTabClick(tab);
      });
      console.log("🔵 [Tabs] ✅ Listener agregado a tab:", tabId);
    });
    console.log("🔵 [Tabs] ✅ Todos los listeners agregados correctamente");
  }
  function createTabs(options, containerId) {
    const container = containerId ? document.getElementById(containerId) || document.createElement("div") : document.createElement("div");
    if (containerId && !container.id) {
      container.id = containerId;
    }
    container.innerHTML = renderTabs(options);
    requestAnimationFrame(() => {
      const tabsElement = container.querySelector(".ubits-tabs");
      if (tabsElement) {
        initTabListeners(tabsElement, options);
      } else {
        initTabListeners(container, options);
      }
    });
    return container;
  }
  const Tabs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createTabs,
    renderTabs
  }, Symbol.toStringTag, { value: "Module" }));
  class UBITSToast extends HTMLElement {
    constructor() {
      super(...arguments);
      this.options = { message: "" };
      this.timerId = null;
      this.startTs = null;
      this.remaining = 0;
    }
    static get observedAttributes() {
      return ["type", "message", "duration", "no-close", "pause-on-hover"];
    }
    connectedCallback() {
      this.updateOptions();
      this.render();
      this.attachEventListeners();
      this.setupTimer();
    }
    attributeChangedCallback() {
      this.updateOptions();
      this.render();
      this.attachEventListeners();
      this.setupTimer();
    }
    disconnectedCallback() {
      this.clearTimer();
    }
    updateOptions() {
      this.options = {
        type: this.getAttribute("type") || "info",
        message: this.getAttribute("message") || this.textContent?.trim() || "",
        duration: this.getAttribute("duration") ? parseInt(this.getAttribute("duration") || "0", 10) : 0,
        noClose: this.getAttribute("no-close") === "true",
        pauseOnHover: this.getAttribute("pause-on-hover") !== "false",
        className: this.getAttribute("class") || ""
      };
    }
    render() {
      this.innerHTML = renderToast(this.options);
      const type = this.options.type || "info";
      if (type === "warning" || type === "error") {
        this.setAttribute("role", "alert");
        this.setAttribute("aria-live", "assertive");
      } else {
        this.setAttribute("role", "status");
        this.setAttribute("aria-live", "polite");
      }
      requestAnimationFrame(() => {
        this.classList.add("ubits-toast--enter");
      });
    }
    attachEventListeners() {
      const closeButton = this.querySelector(".ubits-toast__close");
      if (closeButton) {
        const newCloseButton = closeButton.cloneNode(true);
        closeButton.parentNode?.replaceChild(newCloseButton, closeButton);
        newCloseButton.addEventListener("click", () => {
          this.close();
        });
      }
      const actionButton = this.querySelector("[data-toast-action]");
      if (actionButton) {
        const newActionButton = actionButton.cloneNode(true);
        actionButton.parentNode?.replaceChild(newActionButton, actionButton);
        newActionButton.addEventListener("click", () => {
          this.dispatchEvent(
            new CustomEvent("toast-action", {
              bubbles: true
            })
          );
        });
      }
      if (this.options.pauseOnHover && this.options.duration && this.options.duration > 0) {
        this.addEventListener("mouseenter", this.pauseTimer.bind(this));
        this.addEventListener("mouseleave", this.startTimer.bind(this));
        this.addEventListener("focusin", this.pauseTimer.bind(this));
        this.addEventListener("focusout", this.startTimer.bind(this));
      }
    }
    setupTimer() {
      this.clearTimer();
      if (!this.options.duration || this.options.duration <= 0) {
        return;
      }
      this.remaining = this.options.duration;
      this.startTimer();
    }
    startTimer() {
      if (this.remaining <= 0) return;
      this.startTs = performance.now();
      this.timerId = setTimeout(() => {
        this.close();
      }, this.remaining);
    }
    pauseTimer() {
      if (!this.timerId) return;
      clearTimeout(this.timerId);
      this.timerId = null;
      if (this.startTs) {
        const elapsed = performance.now() - this.startTs;
        this.remaining = Math.max(0, this.remaining - elapsed);
      }
    }
    clearTimer() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }
    /**
     * Cierra el toast con animación
     */
    close() {
      this.clearTimer();
      this.classList.add("ubits-toast--exit");
      setTimeout(() => {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
        this.dispatchEvent(
          new CustomEvent("toast-closed", {
            bubbles: true,
            detail: { type: this.options.type }
          })
        );
      }, 180);
    }
    /**
     * Actualiza el mensaje del toast
     */
    updateMessage(newMessage) {
      this.options.message = newMessage;
      this.setAttribute("message", newMessage);
      const textElement = this.querySelector(".ubits-toast__text");
      if (textElement) {
        textElement.textContent = newMessage;
      }
    }
    /**
     * Actualiza el tipo del toast
     */
    updateType(newType) {
      this.options.type = newType;
      this.setAttribute("type", newType);
      this.render();
      this.attachEventListeners();
      this.setupTimer();
    }
  }
  if (typeof window !== "undefined" && !customElements.get("ubits-toast")) {
    customElements.define("ubits-toast", UBITSToast);
  }
  const ToastComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    UBITSToast
  }, Symbol.toStringTag, { value: "Module" }));
  class ToastAddon {
    constructor() {
      this.name = "@ubits/toast";
      this.version = "1.0.0";
    }
    async initialize(context) {
      if (!customElements.get("ubits-toast")) {
        customElements.define("ubits-toast", UBITSToast);
      }
      if (typeof window !== "undefined") {
        const containerId = "ubits-toast-container";
        let container = document.getElementById(containerId);
        if (!container) {
          container = document.createElement("div");
          container.id = containerId;
          document.body.appendChild(container);
        }
        window.UBITS = window.UBITS || {};
        window.UBITS.Toast = {
          render: (options) => {
            const { renderToast: renderToast2 } = require("./ToastProvider");
            return renderToast2(options);
          },
          create: (options) => {
            const { createToast: createToast2 } = require("./ToastProvider");
            return createToast2(options);
          },
          show: (type, message, options) => {
            const { showToast: showToast2 } = require("./ToastProvider");
            return showToast2(type, message, options);
          }
        };
        if (!window.showToast) {
          window.showToast = (type, message, options = {}) => {
            const { showToast: showToast2 } = require("./ToastProvider");
            return showToast2(type, message, options);
          };
        }
      }
      console.log("✅ Toast add-on initialized");
    }
    destroy() {
      if (typeof window !== "undefined") {
        if (window.UBITS?.Toast) {
          delete window.UBITS.Toast;
        }
        if (window.showToast) {
          delete window.showToast;
        }
      }
    }
    getComponents() {
      return [
        {
          name: "ubits-toast",
          tag: "ubits-toast",
          documentation: "https://ubits.design/components/toast"
        }
      ];
    }
    getStyles() {
      return ["./styles/toast.css"];
    }
  }
  if (typeof window !== "undefined") {
    Promise.resolve().then(() => ToastComponent).then(() => {
      console.log("✅ UBITS Toast component registered");
    });
  }
  const Toast = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ToastAddon,
    UBITSToast,
    createToast,
    renderToast,
    showToast,
    showToastHelper
  }, Symbol.toStringTag, { value: "Module" }));
  const Toggle = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createToggle,
    renderToggle
  }, Symbol.toStringTag, { value: "Module" }));
  class UBITSTokensAddon {
    constructor() {
      this.name = "@ubits/tokens-ubits";
      this.version = "1.0.0";
      this.tokensCSS = "";
      this.tokensJS = {};
      this.styleElement = null;
      this.linkElement = null;
      this.isInitialized = false;
      this.requiredTokens = [
        // Button tokens
        "--ubits-button-primary-bg-default",
        "--ubits-button-primary-hover",
        "--ubits-button-primary-pressed",
        "--ubits-btn-primary-fg",
        "--ubits-btn-secondary-bg-default",
        "--ubits-btn-secondary-fg-default",
        "--ubits-btn-secondary-border",
        "--ubits-btn-tertiary-fg-default",
        // Background tokens
        "--ubits-bg-1",
        "--ubits-bg-2",
        "--ubits-bg-3",
        "--ubits-bg-active",
        "--ubits-bg-disabled-button",
        // Foreground tokens
        "--ubits-fg-1-high",
        "--ubits-fg-1-medium",
        "--ubits-fg-1-low",
        "--ubits-fg-on-disabled-button",
        // Border tokens
        "--ubits-border-1",
        "--ubits-border-2",
        "--ubits-border-disabled-button",
        // Accent tokens
        "--ubits-accent-brand-static-inverted",
        "--ubits-accent-success",
        "--ubits-accent-error",
        // Spacing tokens (al menos algunos básicos)
        "--ubits-spacing-2",
        "--ubits-spacing-3",
        "--ubits-spacing-4",
        // Focus ring
        "--ubits-button-focus-ring"
      ];
      this.tokensCSSPath = "../../tokens/dist/tokens.css";
      this.fallbackTokensCSSPath = "../../tokens/dist/tokens.css";
      this.validationResult = null;
    }
    /**
     * Configurar ruta de tokens CSS (opcional)
     */
    setTokensCSSPath(path) {
      this.tokensCSSPath = path;
    }
    /**
     * Configurar ruta de fallback (opcional)
     */
    setFallbackTokensCSSPath(path) {
      this.fallbackTokensCSSPath = path;
    }
    /**
     * Verifica si hay tokens estáticos ya cargados en el DOM
     */
    hasStaticTokensLoaded() {
      if (typeof document === "undefined") {
        return false;
      }
      const tokensLink = document.querySelector('link[href*="tokens.css"]');
      if (tokensLink) {
        return true;
      }
      const styles = document.querySelectorAll("style");
      for (const style of styles) {
        if (style.textContent && style.textContent.includes("--ubits-")) {
          return true;
        }
      }
      return false;
    }
    /**
     * Carga tokens estáticos como fallback
     */
    async loadFallbackTokens() {
      if (typeof document === "undefined") {
        throw new Error("Document no disponible para fallback");
      }
      console.warn("⚠️ Usando fallback: cargando tokens estáticos");
      const fallbackLink = document.createElement("link");
      fallbackLink.rel = "stylesheet";
      fallbackLink.href = this.fallbackTokensCSSPath;
      fallbackLink.id = "ubits-tokens-fallback";
      return new Promise((resolve, reject) => {
        fallbackLink.onload = () => {
          this.linkElement = fallbackLink;
          console.log("✅ Tokens de fallback cargados correctamente");
          resolve();
        };
        fallbackLink.onerror = () => {
          console.error("❌ Error cargando tokens de fallback");
          reject(new Error("No se pudieron cargar tokens ni siquiera como fallback"));
        };
        document.head.appendChild(fallbackLink);
        setTimeout(() => {
          if (!fallbackLink.sheet) {
            reject(new Error("Timeout cargando tokens de fallback"));
          }
        }, 5e3);
      });
    }
    async initialize(context) {
      if (this.isInitialized) {
        console.warn("TokensAddon ya está inicializado");
        return;
      }
      try {
        if (this.hasStaticTokensLoaded()) {
          console.log("✅ Tokens UBITS ya cargados estáticamente (modo compatibilidad)");
          this.isInitialized = true;
          await this.extractTokensFromDOM();
          const validation = this.validateDetailed();
          if (validation.isValid) {
            console.log("✅ Tokens estáticos validados correctamente");
          } else {
            console.warn("⚠️ Tokens estáticos incompletos, pero usando como fallback");
          }
          return;
        }
        try {
          await this.loadTokensCSS();
          this.isInitialized = true;
          const validation = this.validateDetailed();
          if (!validation.isValid) {
            console.warn(
              "⚠️ Algunos tokens requeridos no están disponibles:",
              validation.missingTokens
            );
          } else {
            console.log("✅ TokensAddon UBITS inicializado y cargado - Todos los tokens válidos");
          }
        } catch (loadError) {
          console.error("❌ Error cargando tokens desde add-on:", loadError);
          console.log("🔄 Intentando fallback...");
          try {
            await this.loadFallbackTokens();
            this.isInitialized = true;
            console.log("✅ Tokens cargados mediante fallback");
          } catch (fallbackError) {
            console.error("❌ Error en fallback también:", fallbackError);
            const validation = this.validateDetailed();
            if (validation.presentTokens.length > 0) {
              console.warn(
                `⚠️ Solo ${validation.presentTokens.length}/${validation.totalRequired} tokens disponibles`
              );
              this.isInitialized = true;
            } else {
              throw new Error("No se pudieron cargar tokens de ninguna forma");
            }
          }
        }
      } catch (error) {
        console.error("❌ Error crítico inicializando TokensAddon:", error);
        this.isInitialized = false;
      }
    }
    /**
     * Carga tokens CSS desde el add-on
     */
    async loadTokensCSS() {
      if (typeof document === "undefined") {
        throw new Error("Document no disponible");
      }
      try {
        const response = await fetch(this.tokensCSSPath);
        if (!response.ok) {
          throw new Error(`No se pudo cargar tokens.css desde ${this.tokensCSSPath}`);
        }
        this.tokensCSS = await response.text();
        this.styleElement = document.createElement("style");
        this.styleElement.id = "ubits-tokens-addon";
        this.styleElement.textContent = this.tokensCSS;
        document.head.appendChild(this.styleElement);
        console.log("✅ Tokens CSS cargados desde add-on");
      } catch (fetchError) {
        console.warn("⚠️ No se pudo cargar tokens con fetch, usando <link> como fallback");
        this.linkElement = document.createElement("link");
        this.linkElement.rel = "stylesheet";
        this.linkElement.href = this.tokensCSSPath;
        this.linkElement.id = "ubits-tokens-addon-link";
        document.head.appendChild(this.linkElement);
        await new Promise((resolve, reject) => {
          this.linkElement.onload = () => resolve();
          this.linkElement.onerror = () => reject(new Error("Error cargando tokens.css"));
          setTimeout(() => reject(new Error("Timeout cargando tokens.css")), 5e3);
        });
      }
    }
    /**
     * Extrae tokens del DOM cuando ya están cargados estáticamente
     */
    async extractTokensFromDOM() {
      if (typeof document === "undefined") {
        return;
      }
      const testElement = document.createElement("div");
      testElement.style.position = "absolute";
      testElement.style.visibility = "hidden";
      document.body.appendChild(testElement);
      const sampleTokens = [
        "--ubits-accent-brand-static-inverted",
        "--ubits-bg-1",
        "--ubits-fg-1-high"
      ];
      const loadedTokens = sampleTokens.filter((token) => {
        testElement.style.setProperty(token, "test");
        const value = getComputedStyle(testElement).getPropertyValue(token);
        return value !== "";
      });
      document.body.removeChild(testElement);
      if (loadedTokens.length === sampleTokens.length) {
        console.log("✅ Tokens verificados en DOM");
      } else {
        console.warn("⚠️ Algunos tokens no están disponibles en el DOM");
      }
    }
    destroy() {
      if (this.styleElement) {
        this.styleElement.remove();
        this.styleElement = null;
      }
      if (this.linkElement) {
        this.linkElement.remove();
        this.linkElement = null;
      }
      this.isInitialized = false;
      this.tokensCSS = "";
      this.tokensJS = {};
    }
    getTokensCSS() {
      if (this.tokensCSS) {
        return this.tokensCSS;
      }
      if (this.styleElement && this.styleElement.textContent) {
        return this.styleElement.textContent;
      }
      if (this.linkElement) {
        return "[Tokens cargados vía <link>]";
      }
      return "";
    }
    getTokensJS() {
      return this.tokensJS;
    }
    /**
     * Valida que los tokens requeridos existan en el DOM
     * @returns true si todos los tokens requeridos están presentes
     */
    validate() {
      return this.validateDetailed().isValid;
    }
    /**
     * Valida tokens y retorna resultado detallado
     */
    validateDetailed() {
      if (this.validationResult && this.isInitialized) {
        return this.validationResult;
      }
      if (typeof document === "undefined") {
        this.validationResult = {
          isValid: false,
          missingTokens: [...this.requiredTokens],
          presentTokens: [],
          totalRequired: this.requiredTokens.length
        };
        return this.validationResult;
      }
      const testElement = document.createElement("div");
      testElement.style.position = "absolute";
      testElement.style.visibility = "hidden";
      testElement.style.top = "-9999px";
      document.body.appendChild(testElement);
      const missingTokens = [];
      const presentTokens = [];
      this.requiredTokens.forEach((token) => {
        testElement.style.setProperty(token, "test-value");
        const computedValue = getComputedStyle(testElement).getPropertyValue(token);
        if (computedValue && computedValue !== "") {
          presentTokens.push(token);
        } else {
          missingTokens.push(token);
        }
      });
      document.body.removeChild(testElement);
      this.validationResult = {
        isValid: missingTokens.length === 0,
        missingTokens,
        presentTokens,
        totalRequired: this.requiredTokens.length
      };
      return this.validationResult;
    }
    /**
     * Obtiene el resultado de la última validación
     */
    getValidationResult() {
      return this.validationResult;
    }
    /**
     * Limpia el cache de validación (útil después de cambios)
     */
    clearValidationCache() {
      this.validationResult = null;
    }
    getTokenList() {
      if (this.tokensCSS) {
        const matches = this.tokensCSS.matchAll(/--ubits-[^:;]+/g);
        return Array.from(matches, (m) => m[0].trim());
      }
      return [...this.requiredTokens];
    }
    hasToken(tokenName) {
      if (typeof document === "undefined") {
        return false;
      }
      const testElement = document.createElement("div");
      document.body.appendChild(testElement);
      testElement.style.setProperty(tokenName, "test");
      const value = getComputedStyle(testElement).getPropertyValue(tokenName);
      document.body.removeChild(testElement);
      return value !== "";
    }
  }
  class TokensManager {
    constructor(options = {}) {
      this.tokensAddon = null;
      this.staticTokensLoaded = false;
      this.isInitialized = false;
      this.staticTokensPath = options.staticTokensPath || "../../tokens/dist/tokens.css";
      this.tokensAddonManifestPath = options.tokensAddonManifestPath;
      this.autoLoadStatic = options.autoLoadStatic !== false;
      this.validateAfterLoad = options.validateAfterLoad !== false;
    }
    /**
     * Inicializa el gestor de tokens
     * Intenta cargar desde add-on, si falla usa tokens estáticos
     */
    async initialize(context = {}) {
      if (this.isInitialized) {
        console.warn("TokensManager ya está inicializado");
        return;
      }
      try {
        if (this.hasStaticTokensLoaded()) {
          console.log("✅ TokensManager: Tokens estáticos ya cargados (modo compatibilidad)");
          this.staticTokensLoaded = true;
          this.isInitialized = true;
          if (this.validateAfterLoad) {
            await this.validateTokens();
          }
          return;
        }
        if (this.tokensAddonManifestPath) {
          try {
            await this.loadTokensAddon(context);
            this.isInitialized = true;
            if (this.validateAfterLoad) {
              await this.validateTokens();
            }
            return;
          } catch (addonError) {
            console.warn("⚠️ TokensManager: Error cargando add-on, usando fallback:", addonError);
          }
        }
        if (this.autoLoadStatic) {
          await this.loadStaticTokens();
          this.staticTokensLoaded = true;
          this.isInitialized = true;
          if (this.validateAfterLoad) {
            await this.validateTokens();
          }
        } else {
          throw new Error("No se pudo cargar tokens y autoLoadStatic está deshabilitado");
        }
      } catch (error) {
        console.error("❌ TokensManager: Error crítico inicializando:", error);
        this.isInitialized = false;
      }
    }
    /**
     * Carga tokens desde add-on
     */
    async loadTokensAddon(context) {
      if (!this.tokensAddonManifestPath) {
        throw new Error("tokensAddonManifestPath no configurado");
      }
      this.tokensAddon = new UBITSTokensAddon();
      await this.tokensAddon.initialize(context);
      console.log("✅ TokensManager: Tokens cargados desde add-on");
    }
    /**
     * Carga tokens estáticos
     */
    async loadStaticTokens() {
      if (typeof document === "undefined") {
        throw new Error("Document no disponible");
      }
      if (this.hasStaticTokensLoaded()) {
        this.staticTokensLoaded = true;
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = this.staticTokensPath;
      link.id = "ubits-tokens-static";
      return new Promise((resolve, reject) => {
        link.onload = () => {
          this.staticTokensLoaded = true;
          console.log("✅ TokensManager: Tokens estáticos cargados");
          resolve();
        };
        link.onerror = () => {
          reject(new Error(`Error cargando tokens estáticos desde ${this.staticTokensPath}`));
        };
        document.head.appendChild(link);
        setTimeout(() => {
          if (!link.sheet) {
            reject(new Error("Timeout cargando tokens estáticos"));
          }
        }, 5e3);
      });
    }
    /**
     * Verifica si hay tokens estáticos cargados
     */
    hasStaticTokensLoaded() {
      if (typeof document === "undefined") {
        return false;
      }
      const tokensLink = document.querySelector('link[href*="tokens.css"]');
      if (tokensLink) {
        return true;
      }
      const styles = document.querySelectorAll("style");
      for (const style of styles) {
        if (style.textContent && style.textContent.includes("--ubits-")) {
          return true;
        }
      }
      return false;
    }
    /**
     * Valida que los tokens estén disponibles
     */
    async validateTokens() {
      if (this.tokensAddon) {
        return this.tokensAddon.validate();
      }
      const tempAddon = new UBITSTokensAddon();
      await tempAddon.initialize({});
      const isValid = tempAddon.validate();
      tempAddon.destroy();
      return isValid;
    }
    /**
     * Obtiene información sobre los tokens cargados
     */
    getTokensInfo() {
      return {
        source: this.tokensAddon ? "addon" : this.staticTokensLoaded ? "static" : "unknown",
        isValid: this.tokensAddon ? this.tokensAddon.validate() : false,
        tokensAddon: this.tokensAddon || void 0
      };
    }
    /**
     * Cambia a un add-on de tokens diferente
     */
    async switchTokensAddon(addonPath, context = {}) {
      if (this.tokensAddon) {
        this.tokensAddon.destroy();
        this.tokensAddon = null;
      }
      this.tokensAddonManifestPath = addonPath;
      await this.loadTokensAddon(context);
      console.log("✅ TokensManager: Cambiado a nuevo add-on de tokens");
    }
    /**
     * Limpia recursos
     */
    destroy() {
      if (this.tokensAddon) {
        this.tokensAddon.destroy();
        this.tokensAddon = null;
      }
      this.isInitialized = false;
    }
  }
  let globalTokensManager = null;
  function getTokensManager(options) {
    if (!globalTokensManager) {
      globalTokensManager = new TokensManager(options);
    }
    return globalTokensManager;
  }
  async function initializeTokensManager(options) {
    const manager = getTokensManager(options);
    await manager.initialize();
  }
  function initializeTokensIntegration() {
    if (typeof window === "undefined") {
      return;
    }
    if (!window.UBITS) {
      window.UBITS = {};
    }
    const tokensAPI = {
      async initialize(options = {}) {
        await initializeTokensManager(options);
      },
      getManager() {
        return getTokensManager();
      },
      async loadAddon(manifestPath) {
        const manager = getTokensManager();
        await manager.switchTokensAddon(manifestPath);
        const info = manager.getTokensInfo();
        return info.tokensAddon;
      },
      async applyFromSource(source) {
        const { applyTokensFromStorybook: applyTokensFromStorybook2 } = await Promise.resolve().then(() => createTokensAddon);
        await applyTokensFromStorybook2(source, {
          validate: true,
          replaceExisting: true
        });
      },
      async validate() {
        const manager = getTokensManager();
        return await manager.validateTokens();
      },
      getInfo() {
        const manager = getTokensManager();
        const info = manager.getTokensInfo();
        return {
          source: info.source,
          isValid: info.isValid
        };
      }
    };
    window.UBITS.Tokens = tokensAPI;
    console.log("✅ Tokens integration initialized");
  }
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeTokensIntegration);
    } else {
      initializeTokensIntegration();
    }
  }
  const TokensAddonIntegration = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    initializeTokensIntegration
  }, Symbol.toStringTag, { value: "Module" }));
  async function createTokensAddonFromSource(source, name = "custom-tokens") {
    let tokensCSS = "";
    if (source.css) {
      tokensCSS = source.css;
    } else if (source.cssUrl) {
      const response = await fetch(source.cssUrl);
      tokensCSS = await response.text();
    } else if (source.json) {
      tokensCSS = convertTokensJSONToCSS(source.json);
    } else if (source.jsonUrl) {
      const response = await fetch(source.jsonUrl);
      const json = await response.json();
      tokensCSS = convertTokensJSONToCSS(json);
    } else {
      throw new Error(
        "Debe proporcionar al menos una fuente de tokens (css, cssUrl, json, o jsonUrl)"
      );
    }
    return new CustomTokensAddon(name, tokensCSS);
  }
  function convertTokensJSONToCSS(tokens) {
    const lines = [":root {"];
    function flatten(obj, prefix = "") {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}-${key}` : key;
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          flatten(value, fullKey);
        } else {
          const cssVar = fullKey.startsWith("--ubits-") ? fullKey : `--ubits-${fullKey}`;
          lines.push(`  ${cssVar}: ${value};`);
        }
      }
    }
    if (tokens.light) {
      flatten(tokens.light);
    } else {
      flatten(tokens);
    }
    lines.push("}");
    if (tokens.dark) {
      let flattenDark = function(obj, prefix = "") {
        for (const [key, value] of Object.entries(obj)) {
          const fullKey = prefix ? `${prefix}-${key}` : key;
          if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            flattenDark(value, fullKey);
          } else {
            const cssVar = fullKey.startsWith("--ubits-") ? fullKey : `--ubits-${fullKey}`;
            lines.push(`  ${cssVar}: ${value};`);
          }
        }
      };
      lines.push("");
      lines.push('[data-theme="dark"] {');
      flattenDark(tokens.dark);
      lines.push("}");
    }
    return lines.join("\n");
  }
  class CustomTokensAddon extends UBITSTokensAddon {
    constructor(name, tokensCSS) {
      super();
      this.name = `@ubits/tokens-${name}`;
      this.customTokensCSS = tokensCSS;
    }
    async initialize(context) {
      if (this.isInitialized) {
        return;
      }
      try {
        if (typeof document !== "undefined") {
          const styleElement = document.createElement("style");
          styleElement.id = `ubits-tokens-${this.name.replace(/[^a-z0-9]/gi, "-")}`;
          styleElement.textContent = this.customTokensCSS;
          document.head.appendChild(styleElement);
          this.styleElement = styleElement;
          this.tokensCSS = this.customTokensCSS;
        }
        this.isInitialized = true;
        const validation = this.validateDetailed();
        if (!validation.isValid) {
          console.warn("⚠️ Algunos tokens requeridos no están disponibles:", validation.missingTokens);
        } else {
          console.log(`✅ TokensAddon "${this.name}" inicializado y cargado`);
        }
      } catch (error) {
        console.error("❌ Error inicializando CustomTokensAddon:", error);
        throw error;
      }
    }
    getTokensCSS() {
      return this.customTokensCSS;
    }
  }
  async function applyTokensFromStorybook(source, options = {}) {
    const { validate = true, replaceExisting = true } = options;
    const addon = await createTokensAddonFromSource(source, "storybook");
    if (replaceExisting && typeof document !== "undefined") {
      const existingTokens = document.querySelectorAll(
        'style[id^="ubits-tokens"], link[href*="tokens.css"]'
      );
      existingTokens.forEach((el) => {
        if (el.tagName === "LINK" && el.id !== "ubits-tokens-static") {
          el.remove();
        }
      });
    }
    await addon.initialize({});
    if (validate) {
      const isValid = addon.validate();
      if (!isValid) {
        const validation = addon.validateDetailed();
        console.warn("⚠️ Tokens de Storybook incompletos:", validation.missingTokens);
      } else {
        console.log("✅ Tokens de Storybook aplicados y validados correctamente");
      }
    }
    if (typeof window !== "undefined" && window.UBITS?.Tokens) {
      window.UBITS.Tokens.currentAddon = addon;
    }
  }
  const createTokensAddon = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    applyTokensFromStorybook,
    convertTokensJSONToCSS,
    createTokensAddonFromSource
  }, Symbol.toStringTag, { value: "Module" }));
  async function cambiarTokensDesdeStorybook(storybookUrl, options = {}) {
    console.log("🔄 Cambiando tokens desde Storybook...");
    try {
      await applyTokensFromStorybook(
        { cssUrl: storybookUrl },
        {
          validate: options.validar !== false,
          replaceExisting: options.reemplazar !== false
        }
      );
      console.log("✅ Tokens cambiados exitosamente");
      console.log("📦 Todos los componentes ahora usan los nuevos tokens");
      return true;
    } catch (error) {
      console.error("❌ Error cambiando tokens:", error);
      return false;
    }
  }
  if (typeof window !== "undefined") {
    window.cambiarTokensDesdeStorybook = cambiarTokensDesdeStorybook;
  }
  class ComponentManager {
    constructor() {
      this.loadedComponents = /* @__PURE__ */ new Map();
      this.loadedStyles = /* @__PURE__ */ new Set();
    }
    /**
     * Carga un componente desde una fuente (Storybook, manifest, etc.)
     */
    async loadComponent(source, context = {}) {
      let manifest;
      if (source.manifest) {
        manifest = source.manifest;
      } else if (source.manifestUrl) {
        const response = await fetch(source.manifestUrl);
        manifest = await response.json();
      } else {
        throw new Error("Debe proporcionar manifest o manifestUrl");
      }
      if (this.loadedComponents.has(manifest.name)) {
        console.warn(`Componente ${manifest.name} ya está cargado`);
        return this.loadedComponents.get(manifest.name);
      }
      if (manifest.styles && manifest.styles.length > 0) {
        await this.loadStyles(manifest.styles, source.manifestUrl);
      } else if (source.cssUrls && source.cssUrls.length > 0) {
        await this.loadStyles(source.cssUrls);
      }
      const componentAddon = await this.loadComponentCode(manifest, source.jsUrl, context);
      this.loadedComponents.set(manifest.name, componentAddon);
      console.log(`✅ Componente ${manifest.name} cargado exitosamente`);
      return componentAddon;
    }
    /**
     * Carga estilos CSS
     */
    async loadStyles(styles, baseUrl) {
      for (const stylePath of styles) {
        const fullUrl = baseUrl ? new URL(stylePath, baseUrl).href : stylePath;
        if (this.loadedStyles.has(fullUrl)) {
          continue;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = fullUrl;
        link.id = `ubits-component-style-${fullUrl.replace(/[^a-z0-9]/gi, "-")}`;
        await new Promise((resolve, reject) => {
          link.onload = () => {
            this.loadedStyles.add(fullUrl);
            resolve();
          };
          link.onerror = () => reject(new Error(`Error cargando CSS: ${fullUrl}`));
          document.head.appendChild(link);
        });
      }
    }
    /**
     * Carga el código del componente
     */
    async loadComponentCode(manifest, jsUrl, context = {}) {
      if (!manifest) {
        throw new Error("Manifest requerido");
      }
      const componentPath = jsUrl || manifest.components[0]?.path;
      if (!componentPath) {
        throw new Error("No se pudo determinar la ruta del componente");
      }
      const fullJsUrl = componentPath.startsWith("http") ? componentPath : new URL(componentPath, window.location.href).href;
      try {
        const module = await import(
          /* @vite-ignore */
          fullJsUrl
        );
        const AddonClass = module.default || module[manifest.name] || module.ComponentAddon;
        if (!AddonClass) {
          throw new Error(`No se pudo encontrar la clase del add-on en ${fullJsUrl}`);
        }
        const addon = new AddonClass();
        await addon.initialize(context);
        return addon;
      } catch (error) {
        console.error(`Error cargando componente ${manifest.name}:`, error);
        throw error;
      }
    }
    /**
     * Reemplaza un componente existente con uno nuevo
     */
    async replaceComponent(componentName, source, context = {}) {
      const existing = this.loadedComponents.get(componentName);
      if (existing) {
        existing.destroy();
        this.loadedComponents.delete(componentName);
      }
      return await this.loadComponent(source, context);
    }
    /**
     * Obtiene información de componentes cargados
     */
    getLoadedComponents() {
      return Array.from(this.loadedComponents.values()).map((addon) => ({
        name: addon.name,
        version: addon.version,
        components: addon.getComponents()
      }));
    }
    /**
     * Verifica si un componente está cargado
     */
    isComponentLoaded(name) {
      return this.loadedComponents.has(name);
    }
    /**
     * Limpia todos los componentes
     */
    destroy() {
      for (const addon of this.loadedComponents.values()) {
        addon.destroy();
      }
      this.loadedComponents.clear();
      this.loadedStyles.clear();
    }
  }
  let globalComponentManager = null;
  function getComponentManager() {
    if (!globalComponentManager) {
      globalComponentManager = new ComponentManager();
    }
    return globalComponentManager;
  }
  async function loadComponentFromStorybook(source, options = {}) {
    const { replaceExisting = true, context = {} } = options;
    const manager = getComponentManager();
    try {
      if (source.manifestUrl) {
        const response = await fetch(source.manifestUrl);
        const manifest = await response.json();
        if (replaceExisting && manager.isComponentLoaded(manifest.name)) {
          console.log(`🔄 Reemplazando componente ${manifest.name}...`);
          await manager.replaceComponent(manifest.name, source, context);
        } else {
          await manager.loadComponent(source, context);
        }
      } else if (source.manifest) {
        if (replaceExisting && manager.isComponentLoaded(source.manifest.name)) {
          console.log(`🔄 Reemplazando componente ${source.manifest.name}...`);
          await manager.replaceComponent(source.manifest.name, source, context);
        } else {
          await manager.loadComponent(source, context);
        }
      } else {
        throw new Error("Debe proporcionar manifestUrl o manifest");
      }
      console.log("✅ Componente cargado desde Storybook exitosamente");
    } catch (error) {
      console.error("❌ Error cargando componente desde Storybook:", error);
      throw error;
    }
  }
  async function cambiarComponenteDesdeStorybook(storybookManifestUrl, options = {}) {
    console.log("🔄 Cambiando componente desde Storybook...");
    try {
      await loadComponentFromStorybook(
        { manifestUrl: storybookManifestUrl },
        {
          replaceExisting: options.reemplazar !== false,
          context: options.contexto || {}
        }
      );
      console.log("✅ Componente cambiado exitosamente");
      console.log("📦 El componente ahora está disponible para usar");
      return true;
    } catch (error) {
      console.error("❌ Error cambiando componente:", error);
      return false;
    }
  }
  async function loadComponentsFromStorybook(sources, options = {}) {
    console.log(`🔄 Cargando ${sources.length} componentes desde Storybook...`);
    for (const source of sources) {
      try {
        await loadComponentFromStorybook(source, options);
      } catch (error) {
        console.error(`⚠️ Error cargando componente:`, error);
      }
    }
    console.log("✅ Componentes cargados desde Storybook");
  }
  if (typeof window !== "undefined") {
    window.cambiarComponenteDesdeStorybook = cambiarComponenteDesdeStorybook;
    window.loadComponentFromStorybook = loadComponentFromStorybook;
  }
  function initializeComponentsIntegration() {
    if (typeof window === "undefined") {
      return;
    }
    if (!window.UBITS) {
      window.UBITS = {};
    }
    const componentsAPI = {
      async loadComponent(source, context = {}) {
        const manager = getComponentManager();
        return await manager.loadComponent(source, context);
      },
      async loadFromStorybook(source, options = {}) {
        await loadComponentFromStorybook(source, options);
      },
      async replaceComponent(componentName, source, context = {}) {
        const manager = getComponentManager();
        return await manager.replaceComponent(componentName, source, context);
      },
      getManager() {
        return getComponentManager();
      },
      getLoadedComponents() {
        const manager = getComponentManager();
        return manager.getLoadedComponents();
      },
      isLoaded(componentName) {
        const manager = getComponentManager();
        return manager.isComponentLoaded(componentName);
      }
    };
    window.UBITS.Components = componentsAPI;
    console.log("✅ Components integration initialized");
  }
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeComponentsIntegration);
    } else {
      initializeComponentsIntegration();
    }
  }
  if (typeof window !== "undefined") {
    Promise.resolve().then(() => TokensAddonIntegration).then((module) => {
      module.initializeTokensIntegration();
    });
  }
  const TokensUbits = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ComponentManager,
    TokensManager,
    UBITSTokensAddon,
    applyTokensFromStorybook,
    cambiarComponenteDesdeStorybook,
    cambiarTokensDesdeStorybook,
    convertTokensJSONToCSS,
    createTokensAddonFromSource,
    getComponentManager,
    getTokensManager,
    initializeComponentsIntegration,
    initializeTokensIntegration,
    initializeTokensManager,
    loadComponentFromStorybook,
    loadComponentsFromStorybook
  }, Symbol.toStringTag, { value: "Module" }));
  if (typeof window !== "undefined") {
    window.createTooltip = createTooltip;
    window.renderTooltip = renderTooltip;
    if (!window.UBITSTooltip) {
      window.UBITSTooltip = {};
    }
    window.UBITSTooltip.createTooltip = createTooltip;
    window.UBITSTooltip.renderTooltip = renderTooltip;
  }
  const Tooltip = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createTooltip: createTooltip$1,
    renderTooltip: renderTooltip$1
  }, Symbol.toStringTag, { value: "Module" }));
  window.UBITS = window.UBITS || {};
  console.log("🔧 Initializing UBITS Components Bundle...");
  window.UBITS.Accordion = Accordion;
  window.UBITS.Alert = Alert;
  window.UBITS.Avatar = Avatar;
  window.UBITS.Badge = Badge;
  window.UBITS.BarMetricCard = BarMetricCard;
  window.UBITS.Breadcrumb = Breadcrumb;
  window.UBITS.Button = Button;
  window.UBITS.ButtonAi = ButtonAi;
  window.UBITS.ButtonFeedback = ButtonFeedback;
  window.UBITS.Calendar = Calendar;
  window.UBITS.Card = Card;
  window.UBITS.Carousel = Carousel;
  window.UBITS.Checkbox = Checkbox;
  window.UBITS.Chip = Chip;
  window.UBITS.CsatMetricCard = CsatMetricCard;
  window.UBITS.DataTable = DataTable;
  window.UBITS.DataView = DataView;
  window.UBITS.Drawer = Drawer;
  window.UBITS.EmptyState = EmptyState;
  window.UBITS.FileUpload = FileUpload;
  window.UBITS.Gallery = Gallery;
  window.UBITS.HeaderSection = HeaderSection;
  window.UBITS.Input = Input;
  window.UBITS.List = List;
  window.UBITS.Mask = Mask;
  window.UBITS.Menu = Menu;
  window.UBITS.MetricCard = MetricCard;
  window.UBITS.Modal = Modal;
  window.UBITS.NpsCard = NpsCard;
  window.UBITS.Pagination = Pagination;
  window.UBITS.ParticipantsMenu = ParticipantsMenu;
  window.UBITS.Popover = Popover;
  window.UBITS.Progress = Progress;
  window.UBITS.ProgressGeneralCard = ProgressGeneralCard;
  window.UBITS.RadioButton = RadioButton;
  window.UBITS.SaveIndicator = SaveIndicator;
  window.UBITS.ScoreCardMetrics = ScoreCardMetrics;
  window.UBITS.Scroll = Scroll;
  window.UBITS.SearchButton = SearchButton;
  window.UBITS.SegmentControl = SegmentControl;
  window.UBITS.SelectionCard = SelectionCard;
  window.UBITS.Sidebar = Sidebar;
  window.UBITS.Skeleton = Skeleton;
  window.UBITS.Slider = Slider;
  window.UBITS.Spinner = Spinner;
  window.UBITS.StatsCard = StatsCard;
  window.UBITS.StatusTag = StatusTag;
  window.UBITS.Stepper = Stepper;
  window.UBITS.Subnav = Subnav;
  window.UBITS.Tabbar = Tabbar;
  window.UBITS.Tabs = Tabs;
  window.UBITS.Toast = Toast;
  window.UBITS.Toggle = Toggle;
  window.UBITS.TokensUbits = TokensUbits;
  window.UBITS.Tooltip = Tooltip;
  console.log("✅ UBITS Components Bundle Loaded.", window.UBITS);
  class UBITSSlider extends HTMLElement {
    constructor() {
      super(...arguments);
      this.sliderInstance = null;
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
      this.updateOptions();
      this.render();
    }
    attributeChangedCallback() {
      this.updateOptions();
      this.render();
    }
    updateOptions() {
      const containerId = this.getAttribute("container-id") || this.id || `ubits-slider-${Math.random().toString(36).substr(2, 9)}`;
      if (!document.getElementById(containerId)) {
        const container = document.createElement("div");
        container.id = containerId;
        this.appendChild(container);
      }
      let values;
      const valuesAttr = this.getAttribute("values");
      if (valuesAttr) {
        try {
          const parsed = JSON.parse(valuesAttr);
          if (Array.isArray(parsed) && parsed.length === 2) {
            values = [parsed[0], parsed[1]];
          }
        } catch (e) {
          console.warn("UBITS Slider: Error parsing values", e);
        }
      }
      let marks;
      const marksAttr = this.getAttribute("marks");
      if (marksAttr) {
        try {
          marks = JSON.parse(marksAttr);
        } catch (e) {
          console.warn("UBITS Slider: Error parsing marks", e);
        }
      }
      this.options = {
        containerId,
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
        values: values || [25, 75],
        showInputs: this.hasAttribute("show-inputs") ? this.getAttribute("show-inputs") !== "false" : false,
        showLabel: this.hasAttribute("show-label") ? this.getAttribute("show-label") !== "false" : true,
        showHelper: this.hasAttribute("show-helper") ? this.getAttribute("show-helper") !== "false" : false,
        showMarks: this.hasAttribute("show-marks") ? this.getAttribute("show-marks") !== "false" : false,
        marks: marks || []
      };
    }
    render() {
      const container = document.getElementById(this.options.containerId);
      if (!container) return;
      container.innerHTML = "";
      this.sliderInstance = createSlider({
        ...this.options,
        onChange: (value, event) => {
          this.setAttribute("value", value.toString());
          this.dispatchEvent(
            new CustomEvent("ubits-slider-change", {
              bubbles: true,
              detail: { value }
            })
          );
        },
        onRangeChange: (values, event) => {
          this.setAttribute("values", JSON.stringify(values));
          this.dispatchEvent(
            new CustomEvent("ubits-slider-range-change", {
              bubbles: true,
              detail: { values }
            })
          );
        }
      });
    }
    // Métodos públicos
    getValue() {
      return this.sliderInstance?.getValue() || (this.options.mode === "range" ? [25, 75] : 50);
    }
    setValue(value) {
      if (this.sliderInstance) {
        this.sliderInstance.setValue(value);
        if (this.options.mode === "range" && Array.isArray(value)) {
          this.setAttribute("values", JSON.stringify(value));
        } else if (typeof value === "number") {
          this.setAttribute("value", value.toString());
        }
      }
    }
    disable() {
      if (this.sliderInstance) {
        this.sliderInstance.disable();
        this.setAttribute("state", "disabled");
      }
    }
    enable() {
      if (this.sliderInstance) {
        this.sliderInstance.enable();
        this.setAttribute("state", "default");
      }
    }
    setState(newState) {
      if (this.sliderInstance) {
        this.sliderInstance.setState(newState);
        this.setAttribute("state", newState);
      }
    }
  }
  if (typeof window !== "undefined" && !customElements.get("ubits-slider")) {
    customElements.define("ubits-slider", UBITSSlider);
  }
  const SliderComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    UBITSSlider
  }, Symbol.toStringTag, { value: "Module" }));
})();
