import{r as x}from"./ButtonProvider-CX_wJeLD.js";const g={success:3500,info:3500,warning:5e3,error:6500},_={maxVisible:3,pauseOnHover:!0},L={success:"fa-check-circle",info:"fa-info-circle",warning:"fa-exclamation-triangle",error:"fa-times-circle"};function $(e,i="regular"){const t=i==="regular"?"far":"fas",o=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${t} ${o}"></i>`}function C(e){const i=e||"ubits-toast-container";let t=document.getElementById(i);return t||(t=document.createElement("div"),t.id=i,t.style.cssText=`
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
    `,document.body.appendChild(t)),t}function E(e){return e==="warning"||e==="error"?{role:"alert",ariaLive:"assertive"}:{role:"status",ariaLive:"polite"}}function T(e,i){const t=Array.from(e.querySelectorAll(".ubits-toast"));if(t.length<=i)return;const o=t.length-i;for(let n=0;n<o;n++)b(t[n])}function b(e){e&&(e.classList.add("ubits-toast--exit"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},180))}function y(e){const{type:i="info",title:t="",message:o="",noClose:n=!1,action:s,className:r="",attributes:u={}}=e,a=L[i]||L.info,{role:d,ariaLive:c}=E(i),l=["ubits-toast",`ubits-toast--${i}`,r].filter(Boolean).join(" "),p=Object.entries(u).map(([v,h])=>`${v}="${h}"`).join(" "),m=`
    <div class="ubits-toast__header">
      <div class="ubits-toast__icon" aria-hidden="true">${$(a,"regular")}</div>
      <div class="ubits-toast__title">${t||""}</div>
      ${n?"":x({variant:"tertiary",size:"sm",icon:"times",iconOnly:!0,className:"ubits-toast__close",attributes:{"aria-label":"Cerrar notificación"}})}
    </div>
  `,f=s&&s.label&&typeof s.onClick=="function"?`
      <div class="ubits-toast__actions">
        <button class="ubits-toast__action ubits-toast__action--${i}" type="button" data-toast-action>
          <span>${s.label}</span>
        </button>
      </div>
    `:"";return`
    <div class="${l}" role="${d}" aria-live="${c}" ${p}>
      <div class="ubits-toast__content">
        ${m}
        <div class="ubits-toast__body">${o}</div>
        ${f}
      </div>
    </div>
  `.trim()}function w(e){const i=document.createElement("div");i.innerHTML=y(e);const t=i.querySelector(".ubits-toast");if(!t)throw new Error("Failed to create toast element");const o=t.parentElement;if(o&&o.removeChild(t),!e.noClose){const s=t.querySelector(".ubits-toast__close");s&&s.addEventListener("click",r=>{r.stopPropagation(),b(t),e.onClose&&e.onClose()})}const n=t.querySelector("[data-toast-action]");return n&&e.action&&n.addEventListener("click",s=>{s.stopPropagation(),e.action&&e.action.onClick&&e.action.onClick()}),t}function H(e,i,t={}){const o=C(t.containerId),n=w({type:e,message:i,...t});o.appendChild(n),T(o,_.maxVisible),requestAnimationFrame(()=>{n.classList.add("ubits-toast--enter")});const s=g[e]||g.info,r=typeof t.duration=="number"?t.duration:s;if(r>0){let u=r,a=null,d=null;const c=()=>{r<=0||(d=performance.now(),a=setTimeout(()=>{b(n),t.onClose&&t.onClose()},u))},l=()=>{if(a&&(clearTimeout(a),a=null,d)){const v=performance.now()-d;u=Math.max(0,u-v)}};t.pauseOnHover!==!1&&_.pauseOnHover&&(n.addEventListener("mouseenter",l),n.addEventListener("mouseleave",c),n.addEventListener("focusin",l),n.addEventListener("focusout",c)),c();const m=()=>{n.removeEventListener("mouseenter",l),n.removeEventListener("mouseleave",c),n.removeEventListener("focusin",l),n.removeEventListener("focusout",c),a&&clearTimeout(a)},f=new MutationObserver(()=>{n.parentNode||(m(),f.disconnect())});f.observe(o,{childList:!0})}return n}export{y as r,H as s};
