function A(s){const{title:d,showTitle:T=!0,description:$,showDescription:e=!0,primaryButtonLabel:u,showPrimaryButton:n=!1,primaryButtonIcon:y,showPrimaryButtonIcon:h=!1,secondaryButtonLabel:_,showSecondaryButton:a=!1,secondaryButtonIcon:o,showSecondaryButtonIcon:g=!1,tertiaryButtonLabel:b,showTertiaryButton:c=!1,tertiaryButtonIcon:l,showTertiaryButtonIcon:f=!1,width:m="md",tailPosition:t="top",tailOffset:i=0,className:r="",style:p=""}=s,x={sm:"xs",md:"sm",lg:"md"}[m]||"sm",E=(n?1:0)+(a?1:0)+(c?1:0),S={sm:120,md:160,lg:200},z={sm:240,md:320,lg:400};let R=S[m]||S.md,v=z[m]||z.md;E===3?v=Math.max(v,420):E===2&&(v=Math.max(v,360));const k=`min-width: ${R}px; max-width: ${v}px; width: auto;`,Y=["ubits-tooltip",`ubits-tooltip--tail-${t}`,r].filter(Boolean).join(" "),D=` style="${`${k}${p?`; ${p}`:""}`}"`;let B="";i&&(t==="top"||t==="bottom"?B=`transform: translateX(calc(-50% + ${i}px));`:B=`transform: translateY(calc(-50% + ${i}px));`);const H=`
    <div class="ubits-tooltip__tail"${B?` style="${B}"`:""}>
      <div class="ubits-tooltip__tail-inner"></div>
    </div>
  `,I=T&&d?`
    <div class="ubits-tooltip__header">
      <div class="ubits-tooltip__header-title">
        <p class="ubits-body-md-semibold">${d}</p>
      </div>
    </div>
  `:"",W=e&&$?`
    <div class="ubits-tooltip__body">
      <div class="ubits-tooltip__body-content">
        <p class="ubits-body-md">${$}</p>
      </div>
    </div>
  `:"";let M="";if(n||a||c){let L=u||"";h&&y&&(L=`<i class="far fa-${y}"></i> ${L}`);const X=n&&u?`<button class="ubits-button ubits-button--primary ubits-button--${x} ubits-tooltip__footer-button" data-action="primary" type="button">${L}</button>`:"";let O=_||"";g&&o&&(O=`<i class="far fa-${o}"></i> ${O}`);const q=a&&_?`<button class="ubits-button ubits-button--secondary ubits-button--${x} ubits-tooltip__footer-button" data-action="secondary" type="button">${O}</button>`:"";let C=b||"";f&&l&&(C=`<i class="far fa-${l}"></i> ${C}`);const w=c&&b?`<button class="ubits-button ubits-button--tertiary ubits-button--${x} ubits-tooltip__footer-button" data-action="tertiary" type="button">${C}</button>`:"";M=`
      <div class="ubits-tooltip__footer">
        <div class="ubits-tooltip__footer-actions${c?"":" ubits-tooltip__footer-actions--no-tertiary"}">
          ${w?`
          <div class="ubits-tooltip__footer-left">
            ${w}
          </div>
          `:""}
          <div class="ubits-tooltip__footer-right">
            ${q}
            ${X}
          </div>
        </div>
      </div>
    `}return`
    <div class="${Y}"${D}>
      ${H}
      <div class="ubits-tooltip__content">
        ${I}
        ${W}
        ${M}
      </div>
    </div>
  `.trim()}function G(s){const{onClose:d,closeOnOutsideClick:T=!0,open:$=!1,position:e,referenceElement:u,onPrimaryAction:n,onSecondaryAction:y,onTertiaryAction:h}=s,_=document.body,a=document.createElement("div");a.innerHTML=A(s);const o=a.firstElementChild;if(!o)throw new Error("No se pudo crear el tooltip");if(e){o.style.position="fixed";const t=s.tailPosition||"top";t==="top"||t==="bottom"?(e.left!==void 0&&(o.style.left=`${e.left}px`,o.style.transform="translateX(-50%)"),e.top!==void 0&&(o.style.top=`${e.top}px`)):t==="left"?(e.top!==void 0&&(o.style.top=`${e.top}px`,o.style.transform="translateY(-50%)"),e.left!==void 0&&(o.style.left=`${e.left}px`)):t==="right"&&(e.top!==void 0&&(o.style.top=`${e.top}px`,o.style.transform="translateY(-50%)"),e.left!==void 0&&(o.style.left=`${e.left}px`))}const g=()=>{if(o.classList.add("ubits-tooltip--open"),e){o.style.position="fixed";const t=s.tailPosition||"top";t==="top"||t==="bottom"?(e.left!==void 0&&(o.style.left=`${e.left}px`,o.style.transform="translateX(-50%)"),e.top!==void 0&&(o.style.top=`${e.top}px`)):t==="left"?(e.top!==void 0&&(o.style.top=`${e.top}px`,o.style.transform="translateY(-50%)"),e.left!==void 0&&(o.style.left=`${e.left}px`)):t==="right"&&(e.top!==void 0&&(o.style.top=`${e.top}px`,o.style.transform="translateY(-50%)"),e.left!==void 0&&(o.style.left=`${e.left}px`))}else if(u){const t=u.getBoundingClientRect(),i=o.getBoundingClientRect();o.style.position="fixed",o.style.top=`${t.bottom+8}px`,o.style.left=`${t.left+t.width/2-i.width/2}px`}},b=()=>{o.classList.remove("ubits-tooltip--open"),d&&d()},c=t=>{const i=s.tailPosition||"top";t.top!==void 0&&(o.style.top=`${t.top}px`),t.left!==void 0&&(o.style.left=`${t.left}px`),t.right!==void 0&&(o.style.right=`${t.right}px`),t.bottom!==void 0&&(o.style.bottom=`${t.bottom}px`),i==="top"||i==="bottom"?t.left!==void 0&&(o.style.transform="translateX(-50%)"):(i==="left"||i==="right")&&t.top!==void 0&&(o.style.transform="translateY(-50%)")};let l=()=>{o.parentElement&&o.parentElement.removeChild(o)};if(T){const t=r=>{const p=r.target;if(o.classList.contains("ubits-tooltip--open")&&!o.contains(p)){const P=p;P.closest&&P.closest("[data-tooltip-trigger]")||b()}};document.addEventListener("click",t,!0);const i=l;l=()=>{document.removeEventListener("click",t,!0),i()}}if(n){const t=o.querySelector('[data-action="primary"]');t&&t.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()})}if(y){const t=o.querySelector('[data-action="secondary"]');t&&t.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),y()})}if(h){const t=o.querySelector('[data-action="tertiary"]');t&&t.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),h()})}const f=()=>{const t=o.querySelector(".ubits-tooltip__tail");if(!t)return;const i=s.tailPosition||"top",r=s.tailOffset||0;r!==0?i==="top"||i==="bottom"?(t.style.left="50%",t.style.right="auto",t.style.transform=`translateX(calc(-50% + ${r}px))`,i==="bottom"&&(t.style.transform+=" rotate(180deg)")):(t.style.top="50%",t.style.bottom="auto",t.style.transform=`translateY(calc(-50% + ${r}px))`):(t.style.removeProperty("left"),t.style.removeProperty("right"),t.style.removeProperty("top"),t.style.removeProperty("bottom"),t.style.removeProperty("transform"),t.style.removeProperty("margin-left"),t.style.removeProperty("margin-right")),t.offsetHeight};if(typeof ResizeObserver<"u")try{const t=new ResizeObserver(()=>{f()});t.observe(o),o._tailResizeObserver=t,setTimeout(()=>{f()},50)}catch(t){console.warn("⚠️ [TooltipProvider] Error al crear ResizeObserver:",t),setTimeout(()=>{f()},50)}else setTimeout(()=>{f()},100);const m=l;return l=()=>{o._tailResizeObserver&&(o._tailResizeObserver.disconnect(),delete o._tailResizeObserver),m()},_.appendChild(o),$&&g(),{element:o,open:g,close:b,updatePosition:c,destroy:l}}export{G as c};
