import{r as v}from"./ButtonProvider-CX_wJeLD.js";function p(r){const{title:l,complementaryText:i,width:f=40,bodyContent:d="",footerButtons:o,className:u=""}=r,b=["ubits-drawer",`ubits-drawer--width-${f}`,u].filter(Boolean).join(" "),n=`
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${l}</p>
        </div>
        ${i?`
        <div class="ubits-drawer__header-complementary">
          <p class="ubits-body-sm-regular">${i}</p>
        </div>
        `:""}
      </div>
      ${v({variant:"secondary",size:"md",icon:"fa-times",iconOnly:!0,className:"ubits-drawer__close"})}
    </div>
  `,a=`
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${typeof d=="function"?d():d||'<div class="ubits-drawer__placeholder">Contenido del drawer</div>'}
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
          ${v({variant:"tertiary",size:"md",text:o.tertiary.label,className:"ubits-drawer__footer-button"})}
        </div>
        `:""}
        <div class="ubits-drawer__footer-right">
          ${o.secondary?v({variant:"secondary",size:"md",text:o.secondary.label,className:"ubits-drawer__footer-button"}):""}
          ${o.primary?v({variant:"primary",size:"md",text:o.primary.label,className:"ubits-drawer__footer-button"}):""}
        </div>
      </div>
    </div>
  `:"";return`
    <div class="ubits-drawer-overlay">
      <div class="${b}">
        ${n}
        ${a}
        ${w}
      </div>
    </div>
  `.trim()}function C(r){const{containerId:l,onClose:i,closeOnOverlayClick:f=!0,open:d=!1}=r;let o;l?o=document.getElementById(l)||document.body:o=document.body;const u=document.createElement("div");u.innerHTML=p(r);const e=u.firstElementChild;if(!e)throw new Error("No se pudo crear el drawer");e.querySelector(".ubits-drawer");const b=e.querySelector(".ubits-drawer__close"),n=e,_=()=>{e.classList.add("ubits-drawer-overlay--open"),document.body.style.overflow="hidden"},a=()=>{e.classList.remove("ubits-drawer-overlay--open"),document.body.style.overflow="",i&&i()},w=t=>{const c=e.querySelector(".ubits-drawer__body-content");if(c){const y=typeof t=="function"?t():t;c.innerHTML=y}};b&&b.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),a()}),f&&n&&n.addEventListener("click",t=>{t.target===n&&a()});const m=t=>{t.key==="Escape"&&e.classList.contains("ubits-drawer-overlay--open")&&a()};if(document.addEventListener("keydown",m),r.footerButtons){const t=e.querySelector(".ubits-drawer__footer-left .ubits-drawer__footer-button"),c=e.querySelector(".ubits-drawer__footer-right .ubits-button--secondary.ubits-drawer__footer-button"),y=e.querySelector(".ubits-drawer__footer-right .ubits-button--primary.ubits-drawer__footer-button");t&&r.footerButtons.tertiary?.onClick&&t.addEventListener("click",s=>{s.preventDefault(),r.footerButtons.tertiary.onClick(s)}),c&&r.footerButtons.secondary?.onClick&&c.addEventListener("click",s=>{s.preventDefault(),r.footerButtons.secondary.onClick(s)}),y&&r.footerButtons.primary?.onClick&&y.addEventListener("click",s=>{s.preventDefault(),r.footerButtons.primary.onClick(s)})}return o.appendChild(e),d&&_(),{element:e,open:_,close:a,updateContent:w}}export{C as c};
