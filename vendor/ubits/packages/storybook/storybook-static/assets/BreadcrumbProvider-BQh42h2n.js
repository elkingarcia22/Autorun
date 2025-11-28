function h(s){const{items:t,separator:r=">",className:i=""}=s;if(!t||t.length===0)return'<nav class="ubits-breadcrumb" aria-label="Breadcrumb"></nav>';const d=t.map((e,l)=>({...e,active:l===t.length-1})),a=d.map((e,l)=>{const n=e.active;d.length-1;const b=n?"ubits-breadcrumb__item--active":"",u=e.disabled?"ubits-breadcrumb__item--disabled":"",o=["ubits-breadcrumb__item",b,u].filter(Boolean).join(" ");return!n&&!e.disabled?e.url?`
          <a 
            href="${e.url}" 
            class="${o}"
            data-breadcrumb-id="${e.id}"
            ${e.onClick?'data-has-click-handler="true"':""}
          >
            ${e.label}
          </a>
        `:`
          <button 
            class="${o}"
            data-breadcrumb-id="${e.id}"
            ${e.onClick?'data-has-click-handler="true"':""}
          >
            ${e.label}
          </button>
        `:`
        <span 
          class="${o}"
          data-breadcrumb-id="${e.id}"
          ${e.disabled?'aria-disabled="true"':""}
        >
          ${e.label}
        </span>
      `}).join(`<span class="ubits-breadcrumb__separator" aria-hidden="true">${r}</span>`);return`
    <nav class="${["ubits-breadcrumb",i].filter(Boolean).join(" ")}" aria-label="Breadcrumb">
      <ol class="ubits-breadcrumb__list">
        ${a}
      </ol>
    </nav>
  `.trim()}function m(s,t){s.querySelectorAll(".ubits-breadcrumb__item[data-listener-attached]").forEach(a=>{const c=a.cloneNode(!0);a.parentNode?.replaceChild(c,a)});const i=s.querySelectorAll(".ubits-breadcrumb__item:not(.ubits-breadcrumb__item--disabled):not(.ubits-breadcrumb__item--active)"),d=(a,c)=>{const e=a.getAttribute("data-breadcrumb-id"),l=a.href;if(a.tagName==="A"&&l&&!a.hasAttribute("data-has-click-handler"))return;c.preventDefault();const n=t.items.find(u=>u.id===e);n&&n.onClick&&n.onClick(c),t.onItemClick&&t.onItemClick(e||"",a);const b=new CustomEvent("breadcrumbItemClick",{detail:{itemId:e,itemElement:a}});document.dispatchEvent(b)};i.forEach(a=>{a.setAttribute("data-listener-attached","true"),a.addEventListener("click",c=>d(a,c))})}function _(s,t){const r=t&&document.getElementById(t)||document.createElement("div");return t&&!r.id&&(r.id=t),r.innerHTML=h(s),requestAnimationFrame(()=>{const i=r.querySelector(".ubits-breadcrumb");m(i||r,s)}),r}export{_ as c,h as r};
