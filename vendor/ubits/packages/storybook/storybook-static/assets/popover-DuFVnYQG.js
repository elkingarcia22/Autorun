import{r as $}from"./ButtonProvider-CX_wJeLD.js";const g={sm:"240px",md:"360px",lg:"400px",xl:"480px"};function h(s){const{title:a,bodyContent:n="",width:f="md",tailPosition:c="top",tailOffset:e=0,footerButtons:l,className:d=""}=s,v=g[f]||g.md,t=`ubits-popover--width-${f}`,u=`ubits-popover--tail-${c}`,y=["ubits-popover",t,u,d].filter(Boolean).join(" "),m=`
    <div class="ubits-popover__tail" style="${c==="top"||c==="bottom"?`left: ${e?`calc(50% + ${e}px)`:"50%"};`:`top: ${e?`calc(50% + ${e}px)`:"50%"};`}">
      <div class="ubits-popover__tail-inner"></div>
    </div>
  `,_=a?`
    <div class="ubits-popover__header">
      <div class="ubits-popover__header-title">
        <p class="ubits-body-md-semibold">${a}</p>
      </div>
    </div>
  `:"",o=`
    <div class="ubits-popover__body">
      <div class="ubits-popover__body-content">
        ${typeof n=="function"?n():n||'<div class="ubits-popover__placeholder">Contenido del popover</div>'}
      </div>
      <div class="ubits-popover__scrollbar">
        <div class="ubits-popover__scrollbar-bar"></div>
      </div>
    </div>
  `,i=l?`
    <div class="ubits-popover__footer">
      <div class="ubits-popover__footer-actions${l.tertiary?"":" ubits-popover__footer-actions--no-tertiary"}">
        ${l.tertiary?`
        <div class="ubits-popover__footer-left">
          ${$({variant:"tertiary",size:"md",text:l.tertiary.label,className:"ubits-popover__footer-button"})}
        </div>
        `:""}
        <div class="ubits-popover__footer-right">
          ${l.secondary?$({variant:"secondary",size:"md",text:l.secondary.label,className:"ubits-popover__footer-button"}):""}
          ${l.primary?$({variant:"primary",size:"md",text:l.primary.label,className:"ubits-popover__footer-button"}):""}
        </div>
      </div>
    </div>
  `:"";return`
    <div class="${y}" style="width: ${v};">
      ${m}
      <div class="ubits-popover__content">
        ${_}
        ${o}
        ${i}
      </div>
    </div>
  `.trim()}function L(s){const{containerId:a,onClose:n,closeOnOutsideClick:f=!0,open:c=!1,position:e,referenceElement:l}=s;let d;a?d=document.getElementById(a)||document.body:d=document.body;const v=document.createElement("div");v.innerHTML=h(s);const t=v.firstElementChild;if(!t)throw new Error("No se pudo crear el popover");if(e){t.style.position="fixed";const o=s.tailPosition||"top";o==="top"||o==="bottom"?(e.left!==void 0&&(t.style.left=`${e.left}px`,t.style.transform="translateX(-50%)"),e.top!==void 0&&(t.style.top=`${e.top}px`)):o==="left"?(e.top!==void 0&&(t.style.top=`${e.top}px`,t.style.transform="translateY(-50%)"),e.left!==void 0&&(t.style.left=`${e.left}px`)):o==="right"&&(e.top!==void 0&&(t.style.top=`${e.top}px`,t.style.transform="translateY(-50%)"),e.left!==void 0&&(t.style.left=`${e.left}px`))}const u=()=>{if(t.classList.add("ubits-popover--open"),e){t.style.position="fixed";const o=s.tailPosition||"top";o==="top"||o==="bottom"?(e.left!==void 0&&(t.style.left=`${e.left}px`,t.style.transform="translateX(-50%)"),e.top!==void 0&&(t.style.top=`${e.top}px`)):o==="left"?(e.top!==void 0&&(t.style.top=`${e.top}px`,t.style.transform="translateY(-50%)"),e.left!==void 0&&(t.style.left=`${e.left}px`)):o==="right"&&(e.top!==void 0&&(t.style.top=`${e.top}px`,t.style.transform="translateY(-50%)"),e.left!==void 0&&(t.style.left=`${e.left}px`))}else if(l){const o=l.getBoundingClientRect(),i=t.getBoundingClientRect();t.style.position="fixed",t.style.top=`${o.bottom+8}px`,t.style.left=`${o.left+o.width/2-i.width/2}px`}},y=()=>{t.classList.remove("ubits-popover--open"),n&&n()},m=o=>{const i=t.querySelector(".ubits-popover__body-content");if(i){const p=typeof o=="function"?o():o;i.innerHTML=p}},_=o=>{const i=s.tailPosition||"top";o.top!==void 0&&(t.style.top=`${o.top}px`),o.left!==void 0&&(t.style.left=`${o.left}px`),o.right!==void 0&&(t.style.right=`${o.right}px`),o.bottom!==void 0&&(t.style.bottom=`${o.bottom}px`),i==="top"||i==="bottom"?o.left!==void 0&&(t.style.transform="translateX(-50%)"):(i==="left"||i==="right")&&o.top!==void 0&&(t.style.transform="translateY(-50%)")};let b=()=>{t.parentElement&&t.parentElement.removeChild(t)};if(f){const o=p=>{const r=p.target;if(t.classList.contains("ubits-popover--open")&&!t.contains(r)){const x=r;x.closest&&x.closest("[data-popover-trigger]")||y()}};document.addEventListener("click",o,!0);const i=b;b=()=>{document.removeEventListener("click",o,!0),i()}}if(s.footerButtons){const o=t.querySelector(".ubits-popover__footer-left .ubits-popover__footer-button"),i=t.querySelector(".ubits-popover__footer-right .ubits-button--secondary.ubits-popover__footer-button"),p=t.querySelector(".ubits-popover__footer-right .ubits-button--primary.ubits-popover__footer-button");o&&s.footerButtons.tertiary?.onClick&&o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),s.footerButtons.tertiary.onClick(r)}),i&&s.footerButtons.secondary?.onClick&&i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),s.footerButtons.secondary.onClick(r)}),p&&s.footerButtons.primary?.onClick&&p.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),s.footerButtons.primary.onClick(r)})}return d.appendChild(t),c&&u(),{element:t,open:u,close:y,updateContent:m,updatePosition:_,destroy:b}}export{L as c};
