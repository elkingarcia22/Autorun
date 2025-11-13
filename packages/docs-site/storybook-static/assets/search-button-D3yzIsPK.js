function C(){return`
    <i class="far fa-magnifying-glass ubits-search-button__icon" aria-hidden="true"></i>
  `}function L(){return`
    <button
      type="button"
      class="ubits-search-button__clear"
      aria-label="Limpiar búsqueda"
      tabindex="0"
    >
      <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
    </button>
  `}function p(t){const{active:u=!1,size:l="md",state:c="default",disabled:a=!1,placeholder:v="",value:d="",width:f=248,className:n=""}=t,e=a||c==="disabled",s=u||c==="active",r=C(),m=d&&d.trim().length>0?L():"";if(s){const b=["ubits-search-button","ubits-search-button--active",`ubits-search-button--${l}`,e?"ubits-search-button--disabled":"",n].filter(Boolean).join(" "),h=f?`width: ${f}px;`:"";return`
      <div class="${b}" style="${h}">
        <div class="ubits-search-button__input-wrapper">
          ${r}
          <input
            type="text"
            class="ubits-search-button__input"
            placeholder="${v}"
            value="${d}"
            ${e?"disabled":""}
            aria-label="Buscar"
          />
          ${m}
        </div>
      </div>
    `.trim()}return`
    <button
      type="button"
      class="${["ubits-button","ubits-button--secondary","ubits-button--icon-only",`ubits-button--${l}`,c==="hover"?"ubits-search-button--force-hover":"",n].filter(Boolean).join(" ")}"
      ${e?"disabled":""}
      aria-label="Buscar"
    >
      ${r}
    </button>
  `.trim()}function _(t){const u=t.containerId?document.getElementById(t.containerId):document.body;if(!u)throw new Error(`Container with id "${t.containerId}" not found`);const l=p(t),c=document.createElement("div");c.innerHTML=l.trim();const a=c.firstElementChild;if(!a)throw new Error("Failed to create search button element");if(u.appendChild(a),t.active||t.state==="active"){const n=a.querySelector(".ubits-search-button__input"),e=a.querySelector(".ubits-search-button__clear");n&&(t.onChange&&(n.addEventListener("input",t.onChange),n.addEventListener("change",t.onChange)),t.onFocus&&n.addEventListener("focus",t.onFocus),t.onBlur&&n.addEventListener("blur",t.onBlur)),e&&e.addEventListener("click",function(s){if(s.preventDefault(),s.stopPropagation(),n&&(n.value="",n.focus(),t.onChange)){const r=new Event("input",{bubbles:!0});n.dispatchEvent(r)}})}else{const n=a;n&&t.onClick&&n.addEventListener("click",t.onClick)}return{element:a,destroy:()=>{a.parentNode&&a.parentNode.removeChild(a)},update:n=>{const e={...t,...n},s=p(e),r=document.createElement("div");r.innerHTML=s.trim();const o=r.firstElementChild;if(o&&a.parentNode)if(a.parentNode.replaceChild(o,a),e.active||e.state==="active"){const i=o.querySelector(".ubits-search-button__input"),b=o.querySelector(".ubits-search-button__clear");i&&(e.onChange&&(i.addEventListener("input",e.onChange),i.addEventListener("change",e.onChange)),e.onFocus&&i.addEventListener("focus",e.onFocus),e.onBlur&&i.addEventListener("blur",e.onBlur)),b&&b.addEventListener("click",function(h){if(h.preventDefault(),h.stopPropagation(),i&&(i.value="",i.focus(),e.onChange)){const E=new Event("input",{bubbles:!0});i.dispatchEvent(E)}})}else{const i=o;i&&e.onClick&&i.addEventListener("click",e.onClick)}}}}export{_ as c,p as r};
