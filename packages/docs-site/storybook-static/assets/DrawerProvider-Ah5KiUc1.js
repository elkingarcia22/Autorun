import{r as p}from"./ButtonProvider-C3s0jBEY.js";function m(r){const{title:u,complementaryText:a,width:f=40,bodyContent:i="",footerButtons:o,className:l=""}=r,b=["ubits-drawer",`ubits-drawer--width-${f}`,l].filter(Boolean).join(" "),d=`
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${u}</p>
        </div>
        ${a?`
        <div class="ubits-drawer__header-complementary">
          <p class="ubits-body-sm-regular">${a}</p>
        </div>
        `:""}
      </div>
      ${p({variant:"secondary",size:"md",icon:"fa-times",iconOnly:!0,className:"ubits-drawer__close"})}
    </div>
  `,n=`
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${typeof i=="function"?i():i||'<div class="ubits-drawer__placeholder">Contenido del drawer</div>'}
      </div>
      <div class="ubits-drawer__scrollbar">
        <div class="ubits-drawer__scrollbar-bar"></div>
      </div>
    </div>
  `,w=o?`
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        ${o.tertiary?`
        <div class="ubits-drawer__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${o.tertiary.label}</span>
          </button>
        </div>
        `:""}
        <div class="ubits-drawer__footer-right">
          ${o.secondary?`
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${o.secondary.label}</span>
          </button>
          `:""}
          ${o.primary?`
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${o.primary.label}</span>
          </button>
          `:""}
        </div>
      </div>
    </div>
  `:"";return`
    <div class="ubits-drawer-overlay">
      <div class="${b}">
        ${d}
        ${n}
        ${w}
      </div>
    </div>
  `.trim()}function C(r){const{containerId:u,onClose:a,closeOnOverlayClick:f=!0,open:i=!1}=r;let o;u?o=document.getElementById(u)||document.body:o=document.body;const l=document.createElement("div");l.innerHTML=m(r);const t=l.firstElementChild;if(!t)throw new Error("No se pudo crear el drawer");t.querySelector(".ubits-drawer");const b=t.querySelector(".ubits-drawer__close"),d=t,v=()=>{t.classList.add("ubits-drawer-overlay--open"),document.body.style.overflow="hidden"},n=()=>{t.classList.remove("ubits-drawer-overlay--open"),document.body.style.overflow="",a&&a()},w=e=>{const c=t.querySelector(".ubits-drawer__body-content");if(c){const y=typeof e=="function"?e():e;c.innerHTML=y}};b&&b.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),n()}),f&&d&&d.addEventListener("click",e=>{e.target===d&&n()});const _=e=>{e.key==="Escape"&&t.classList.contains("ubits-drawer-overlay--open")&&n()};if(document.addEventListener("keydown",_),r.footerButtons){const e=t.querySelector(".ubits-drawer__footer-left .ubits-drawer__footer-button"),c=t.querySelector(".ubits-drawer__footer-right .ubits-button--secondary"),y=t.querySelector(".ubits-drawer__footer-right .ubits-button--primary");e&&r.footerButtons.tertiary?.onClick&&e.addEventListener("click",s=>{s.preventDefault(),r.footerButtons.tertiary.onClick(s)}),c&&r.footerButtons.secondary?.onClick&&c.addEventListener("click",s=>{s.preventDefault(),r.footerButtons.secondary.onClick(s)}),y&&r.footerButtons.primary?.onClick&&y.addEventListener("click",s=>{s.preventDefault(),r.footerButtons.primary.onClick(s)})}return o.appendChild(t),i&&v(),{element:t,open:v,close:n,updateContent:w}}export{C as c};
