function m(i){const{label:l,complementaryText:n,value:a="",name:t="",checked:c=!1,indeterminate:e=!1,size:o="md",state:s="default",disabled:u=!1,className:d=""}=i,b=u||s==="disabled",k=["ubits-checkbox",`ubits-checkbox--${o}`,s!=="default"?`ubits-checkbox--${s}`:"",c?"ubits-checkbox--checked":"",e?"ubits-checkbox--indeterminate":"",b?"ubits-checkbox--disabled":"",d].filter(Boolean).join(" "),h=`
    <input
      type="checkbox"
      id="checkbox-${t}-${a||"default"}"
      ${t?`name="${t}"`:""}
      ${a?`value="${a}"`:""}
      ${c?"checked":""}
      ${e?'data-indeterminate="true"':""}
      ${b?"disabled":""}
      class="ubits-checkbox__input"
    />
  `,x=`
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${e?'<span class="ubits-checkbox__indeterminate"></span>':""}
      ${c&&!e?'<span class="ubits-checkbox__checkmark"></span>':""}
      ${!c&&!e&&s==="active"?'<span class="ubits-checkbox__checkmark"></span>':""}
    </span>
  `,r=`
    <span class="ubits-checkbox__label">${l}</span>
  `,$=n?`<span class="ubits-checkbox__complementary-text">${n}</span>`:"",p=`
    <div class="ubits-checkbox__text-content">
      ${r}
      ${$}
    </div>
  `;return`
    <label class="${k}">
      ${h}
      ${x}
      ${p}
    </label>
  `.trim()}export{m as r};
