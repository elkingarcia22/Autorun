import{r as P}from"./ButtonProvider-C3s0jBEY.js";function L(f,n,t){const i=[];if(n<=t)for(let s=1;s<=n;s++)i.push(s);else{const s=Math.floor(t/2);let e=Math.max(1,f-s),g=Math.min(n,e+t-1);g-e<t-1&&(e=Math.max(1,g-t+1));for(let m=e;m<=g;m++)i.push(m)}return i}function B(f,n,t="md",i){return P({variant:n?"secondary":"tertiary",size:t==="sm"?"sm":t==="lg"?"lg":"md",text:String(f),active:n,className:"ubits-pagination__page-button"})}function N(f){const{currentPage:n=1,totalPages:t,totalItems:i,itemsPerPage:s,variant:e="default",size:g="md",maxVisiblePages:m=7,showFirst:v=!0,showLast:d=!0,showPrevNext:o=!0,showInfo:h=!1,showItemsPerPage:l=!1,itemsPerPageOptions:b=[10,20,50,100],className:S="",attributes:I={},labels:M={}}=f,c=Math.max(1,Math.min(n,t)),x=["ubits-pagination",`ubits-pagination--${e}`,`ubits-pagination--${g}`,S].filter(Boolean).join(" "),C=[...Object.entries(I).map(([r,u])=>`${r}="${u}"`)].filter(Boolean).join(" "),a={first:"Primera",last:"Última",previous:"Anterior",next:"Siguiente",page:"Página",of:"de",items:"items",itemsPerPage:"Por página",...M};let $="";if(h&&i!==void 0){const r=(c-1)*(s||10)+1,u=Math.min(c*(s||10),i);$=`
      <div class="ubits-pagination__info">
        <span class="ubits-body-sm">${r}-${u} ${a.of} ${i} ${a.items}</span>
      </div>
    `}let y="";if(l){const r=`ubits-pagination-items-per-page-${Date.now()}`;y=`
      <div class="ubits-pagination__items-per-page">
        <label for="${r}" class="ubits-body-sm">${a.itemsPerPage}:</label>
        <select id="${r}" class="ubits-pagination__select ubits-body-sm">
          ${b.map(u=>`<option value="${u}" ${u===s?"selected":""}>${u}</option>`).join("")}
        </select>
      </div>
    `}const _=g==="sm"?"sm":g==="lg"?"lg":"md",p=[];if(v&&e==="default"&&p.push(P({variant:"tertiary",size:_,icon:"angle-double-left",iconStyle:"solid",iconOnly:!0,disabled:c===1,className:"ubits-pagination__nav-button",attributes:{"aria-label":a.first,title:a.first}})),o&&p.push(P({variant:"tertiary",size:_,icon:"chevron-left",iconStyle:"solid",iconOnly:!0,disabled:c===1,className:"ubits-pagination__nav-button",attributes:{"aria-label":a.previous,title:a.previous}})),e==="default"){const r=L(c,t,m);r[0]>1&&p.push('<span class="ubits-pagination__ellipsis">...</span>'),r.forEach(u=>{p.push(B(u,u===c,g))}),r[r.length-1]<t&&p.push('<span class="ubits-pagination__ellipsis">...</span>')}else e==="compact"&&p.push(`
      <span class="ubits-pagination__page-info ubits-body-md">
        ${a.page} ${c} ${a.of} ${t}
      </span>
    `);return o&&p.push(P({variant:"tertiary",size:_,icon:"chevron-right",iconStyle:"solid",iconOnly:!0,disabled:c===t,className:"ubits-pagination__nav-button",attributes:{"aria-label":a.next,title:a.next}})),d&&e==="default"&&p.push(P({variant:"tertiary",size:_,icon:"angle-double-right",iconStyle:"solid",iconOnly:!0,disabled:c===t,className:"ubits-pagination__nav-button",attributes:{"aria-label":a.last,title:a.last}})),`
    <div class="${x}" ${C} data-current-page="${c}" data-total-pages="${t}">
      ${$}
      ${y}
      <div class="ubits-pagination__controls">
        ${p.join("")}
      </div>
    </div>
  `}function E(f){const{containerId:n,...t}=f;if(!n)return console.error("❌ [Pagination] containerId es requerido para createPagination"),null;const i=document.getElementById(n);if(!i)return console.error(`❌ [Pagination] Contenedor con ID "${n}" no encontrado`),null;const s=N(t);i.innerHTML=s;const e=i.querySelector(".ubits-pagination");if(!e)return console.error("❌ [Pagination] No se pudo crear el elemento de paginación"),null;e.querySelectorAll(".ubits-pagination__page-button").forEach(d=>{d.addEventListener("click",()=>{const o=parseInt(d.textContent||"1");t.onPageChange&&t.onPageChange(o)})}),e.querySelectorAll(".ubits-pagination__nav-button").forEach(d=>{d.addEventListener("click",()=>{const o=parseInt(e.getAttribute("data-current-page")||"1"),h=parseInt(e.getAttribute("data-total-pages")||"1"),l=d.getAttribute("aria-label")||"";let b=o;l.includes("Primera")||l.includes("First")?b=1:l.includes("Última")||l.includes("Last")?b=h:l.includes("Anterior")||l.includes("Previous")?b=Math.max(1,o-1):(l.includes("Siguiente")||l.includes("Next"))&&(b=Math.min(h,o+1)),b!==o&&t.onPageChange&&t.onPageChange(b)})});const v=e.querySelector(".ubits-pagination__select");return v&&t.onItemsPerPageChange&&v.addEventListener("change",d=>{const o=d.target,h=parseInt(o.value);t.onItemsPerPageChange?.(h)}),console.log("✅ [Pagination] Paginador creado exitosamente"),e}export{E as c,N as r};
