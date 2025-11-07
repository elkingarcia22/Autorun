function h(b){const{label:e,complementaryText:t,value:s="",name:l="",checked:a=!1,size:d="md",state:o="default",disabled:u=!1,className:$=""}=b,n=u||o==="disabled",c=["ubits-toggle",`ubits-toggle--${d}`,o!=="default"?`ubits-toggle--${o}`:"",a?"ubits-toggle--checked":"",n?"ubits-toggle--disabled":"",$].filter(Boolean).join(" "),r=`
    <input
      type="checkbox"
      id="toggle-${l}-${s||"default"}"
      ${l?`name="${l}"`:""}
      ${s?`value="${s}"`:""}
      ${a?"checked":""}
      ${n?"disabled":""}
      class="ubits-toggle__input"
      role="switch"
      aria-checked="${a}"
    />
  `,p=`
    <span class="ubits-toggle__track" aria-hidden="true">
      <span class="ubits-toggle__thumb"></span>
    </span>
  `;let i="";if(e||t){const _=e?`<span class="ubits-toggle__label">${e}</span>`:"",f=t?`<span class="ubits-toggle__complementary-text">${t}</span>`:"";i=`
      <div class="ubits-toggle__text-content">
        ${_}
        ${f}
      </div>
    `}const g=e||t?"label":"div",m=e||t?c:`${c} ubits-toggle--no-label`;return`
    <${g} class="${m}">
      ${r}
      ${i}
      ${p}
    </${g}>
  `.trim()}export{h as r};
