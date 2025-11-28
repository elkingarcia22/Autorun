const p={sm:"320px",md:"480px",lg:"640px",xl:"800px",full:"1280px"};function C(e){const{title:d,bodyContent:l="",size:r="md",fullScreen:f=!1,footerButtons:s,className:c=""}=e,t=p[r]||p.md,b=["ubits-modal",`ubits-modal--size-${r}`,f?"ubits-modal--full-screen":"",c].filter(Boolean).join(" "),a=`
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${d}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `,v=`
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${typeof l=="function"?l():l||'<div class="ubits-modal__placeholder">Contenido del modal</div>'}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `,o=s?`
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${s.tertiary?`
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${s.tertiary.label}</span>
          </button>
        </div>
        `:""}
        <div class="ubits-modal__footer-right">
          ${s.secondary?`
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${s.secondary.label}</span>
          </button>
          `:""}
          ${s.primary?`
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${s.primary.label}</span>
          </button>
          `:""}
        </div>
      </div>
    </div>
  `:"";return`
    <div class="ubits-modal-overlay">
      <div class="${b}" style="max-width: ${t};">
        ${a}
        ${v}
        ${o}
      </div>
    </div>
  `.trim()}function L(e){const{containerId:d,onClose:l,closeOnOverlayClick:r=!0,open:f=!1}=e;let s;d?s=document.getElementById(d)||document.body:s=document.body;const c=document.createElement("div");c.innerHTML=C(e);const t=c.firstElementChild;if(!t)throw new Error("No se pudo crear el modal");t.querySelector(".ubits-modal");const y=t.querySelector(".ubits-modal__close"),u=t,b=()=>{t.classList.add("ubits-modal-overlay--open"),document.body.style.overflow="hidden"},a=()=>{t.classList.remove("ubits-modal-overlay--open"),document.body.style.overflow="",l&&l()},_=o=>{const i=t.querySelector(".ubits-modal__body-content");if(i){const m=typeof o=="function"?o():o;i.innerHTML=m}};y&&y.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),a()}),r&&u&&u.addEventListener("click",o=>{o.target===u&&a()});const v=o=>{o.key==="Escape"&&t.classList.contains("ubits-modal-overlay--open")&&a()};if(document.addEventListener("keydown",v),e.footerButtons){const o=t.querySelector(".ubits-modal__footer-left .ubits-modal__footer-button"),i=t.querySelector(".ubits-modal__footer-right .ubits-button--secondary"),m=t.querySelector(".ubits-modal__footer-right .ubits-button--primary");o&&e.footerButtons.tertiary?.onClick&&o.addEventListener("click",n=>{n.preventDefault(),e.footerButtons.tertiary.onClick(n)}),i&&e.footerButtons.secondary?.onClick&&i.addEventListener("click",n=>{n.preventDefault(),e.footerButtons.secondary.onClick(n)}),m&&e.footerButtons.primary?.onClick&&m.addEventListener("click",n=>{n.preventDefault(),e.footerButtons.primary.onClick(n)})}return s.appendChild(t),f&&b(),{element:t,open:b,close:a,updateContent:_}}export{L as c};
