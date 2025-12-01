(function(r,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(r=typeof globalThis<"u"?globalThis:r||self,l(r.UbitsSearchButton={}))})(this,(function(r){"use strict";function l(){return`
    <i class="far fa-magnifying-glass ubits-search-button__icon" aria-hidden="true"></i>
  `}function B(){return`
    <button
      type="button"
      class="ubits-search-button__clear"
      aria-label="Limpiar búsqueda"
      tabindex="0"
    >
      <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
    </button>
  `}function h(t){const{active:d=!1,size:b="md",state:s="default",disabled:i=!1,placeholder:p="",value:f="",width:m=248,className:n=""}=t,e=i||s==="disabled",o=d||s==="active",c=l(),E=f&&f.trim().length>0?B():"";return o?`
      <div class="${["ubits-search-button","ubits-search-button--active",`ubits-search-button--${b}`,e?"ubits-search-button--disabled":"",n].filter(Boolean).join(" ")}" style="width: ${m}px;">
        <div class="ubits-search-button__input-wrapper">
          ${c}
          <input
            type="text"
            class="ubits-search-button__input"
            placeholder="${p}"
            value="${f}"
            ${e?"disabled":""}
            aria-label="Buscar"
          />
          ${E}
        </div>
      </div>
    `.trim():`
    <button
      type="button"
      class="${["ubits-button","ubits-button--secondary","ubits-button--icon-only",`ubits-button--${b}`,s==="hover"?"ubits-search-button--force-hover":"",n].filter(Boolean).join(" ")}"
      ${e?"disabled":""}
      aria-label="Buscar"
    >
      ${c}
    </button>
  `.trim()}function g(t){const d=t.containerId?document.getElementById(t.containerId):document.body;if(!d)throw new Error(`Container with id "${t.containerId}" not found`);const b=h(t),s=document.createElement("div");s.innerHTML=b.trim();const i=s.firstElementChild;if(!i)throw new Error("Failed to create search button element");if(d.appendChild(i),t.active||t.state==="active"){const n=i.querySelector(".ubits-search-button__input"),e=i.querySelector(".ubits-search-button__clear");n&&(t.onChange&&(n.addEventListener("input",t.onChange),n.addEventListener("change",t.onChange)),t.onFocus&&n.addEventListener("focus",t.onFocus),t.onBlur&&n.addEventListener("blur",t.onBlur)),e&&e.addEventListener("click",function(o){if(o.preventDefault(),o.stopPropagation(),n&&(n.value="",n.focus(),t.onChange)){const c=new Event("input",{bubbles:!0});n.dispatchEvent(c)}})}else{const n=i;n&&t.onClick&&n.addEventListener("click",t.onClick)}return{element:i,destroy:()=>{i.parentNode&&i.parentNode.removeChild(i)},update:n=>{const e={...t,...n},o=h(e),c=document.createElement("div");c.innerHTML=o.trim();const u=c.firstElementChild;if(u&&i.parentNode)if(i.parentNode.replaceChild(u,i),e.active||e.state==="active"){const a=u.querySelector(".ubits-search-button__input"),v=u.querySelector(".ubits-search-button__clear");a&&(e.onChange&&(a.addEventListener("input",e.onChange),a.addEventListener("change",e.onChange)),e.onFocus&&a.addEventListener("focus",e.onFocus),e.onBlur&&a.addEventListener("blur",e.onBlur)),v&&v.addEventListener("click",function(C){if(C.preventDefault(),C.stopPropagation(),a&&(a.value="",a.focus(),e.onChange)){const y=new Event("input",{bubbles:!0});a.dispatchEvent(y)}})}else{const a=u;a&&e.onClick&&a.addEventListener("click",e.onClick)}}}}r.createSearchButton=g,r.renderSearchButton=h,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));
