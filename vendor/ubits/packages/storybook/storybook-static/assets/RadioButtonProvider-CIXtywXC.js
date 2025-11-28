function f(o){const{label:d,complementaryText:s,value:e,name:i,checked:t=!1,size:l="md",state:a="default",disabled:u=!1,className:b=""}=o,n=u||a==="disabled",c=["ubits-radio-button",`ubits-radio-button--${l}`,a!=="default"?`ubits-radio-button--${a}`:"",t?"ubits-radio-button--checked":"",n?"ubits-radio-button--disabled":"",b].filter(Boolean).join(" "),r=`
    <input
      type="radio"
      id="radio-${i}-${e}"
      name="${i}"
      value="${e}"
      ${t?"checked":""}
      ${n?"disabled":""}
      class="ubits-radio-button__input"
    />
  `,$=`
    <span class="ubits-radio-button__circle" aria-hidden="true">
      ${t||a==="active"&&!t?'<span class="ubits-radio-button__dot"></span>':""}
    </span>
  `,p=`
    <span class="ubits-radio-button__label">${d}</span>
  `,_=s?`<span class="ubits-radio-button__complementary-text">${s}</span>`:"",m=`
    <div class="ubits-radio-button__text-content">
      ${p}
      ${_}
    </div>
  `;return`
    <label class="${c}">
      ${r}
      ${$}
      ${m}
    </label>
  `.trim()}export{f as r};
