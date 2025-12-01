(function(l,d){typeof exports=="object"&&typeof module<"u"?d(exports):typeof define=="function"&&define.amd?define(["exports"],d):(l=typeof globalThis<"u"?globalThis:l||self,d(l.UBITSModal={}))})(this,(function(l){"use strict";const d={sm:"320px",md:"480px",lg:"640px",xl:"800px",full:"1280px"};function u(e){const{title:c,bodyContent:i="",size:b="md",fullScreen:_=!1,footerButtons:n,className:f=""}=e,t=d[b]||d.md,y=["ubits-modal",`ubits-modal--size-${b}`,_?"ubits-modal--full-screen":"",f].filter(Boolean).join(" "),a=`
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${c}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `,w=`
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${typeof i=="function"?i():i||'<div class="ubits-modal__placeholder">Contenido del modal</div>'}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `,o=n?`
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${n.tertiary?`
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${n.tertiary.label}</span>
          </button>
        </div>
        `:""}
        <div class="ubits-modal__footer-right">
          ${n.secondary?`
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${n.secondary.label}</span>
          </button>
          `:""}
          ${n.primary?`
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${n.primary.label}</span>
          </button>
          `:""}
        </div>
      </div>
    </div>
  `:"";return`
    <div class="ubits-modal-overlay">
      <div class="${y}" style="max-width: ${t};">
        ${a}
        ${w}
        ${o}
      </div>
    </div>
  `.trim()}function p(e){const{containerId:c,onClose:i,closeOnOverlayClick:b=!0,open:_=!1}=e;let n;c?n=document.getElementById(c)||document.body:n=document.body;const f=document.createElement("div");f.innerHTML=u(e);const t=f.firstElementChild;if(!t)throw new Error("No se pudo crear el modal");t.querySelector(".ubits-modal");const M=t.querySelector(".ubits-modal__close"),m=t,y=()=>{t.classList.add("ubits-modal-overlay--open"),document.body.style.overflow="hidden"},a=()=>{t.classList.remove("ubits-modal-overlay--open"),document.body.style.overflow="",i&&i()},C=o=>{const r=t.querySelector(".ubits-modal__body-content");if(r){const v=typeof o=="function"?o():o;r.innerHTML=v}};M&&M.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),a()}),b&&m&&m.addEventListener("click",o=>{o.target===m&&a()});const w=o=>{o.key==="Escape"&&t.classList.contains("ubits-modal-overlay--open")&&a()};if(document.addEventListener("keydown",w),e.footerButtons){const o=t.querySelector(".ubits-modal__footer-left .ubits-modal__footer-button"),r=t.querySelector(".ubits-modal__footer-right .ubits-button--secondary"),v=t.querySelector(".ubits-modal__footer-right .ubits-button--primary");o&&e.footerButtons.tertiary?.onClick&&o.addEventListener("click",s=>{s.preventDefault(),e.footerButtons.tertiary.onClick(s)}),r&&e.footerButtons.secondary?.onClick&&r.addEventListener("click",s=>{s.preventDefault(),e.footerButtons.secondary.onClick(s)}),v&&e.footerButtons.primary?.onClick&&v.addEventListener("click",s=>{s.preventDefault(),e.footerButtons.primary.onClick(s)})}return n.appendChild(t),_&&y(),{element:t,open:y,close:a,updateContent:C}}typeof window<"u"&&(window.createModal=p,window.renderModal=u,window.UBITSModal||(window.UBITSModal={}),window.UBITSModal.createModal=p,window.UBITSModal.renderModal=u),l.createModal=p,l.renderModal=u,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})}));
