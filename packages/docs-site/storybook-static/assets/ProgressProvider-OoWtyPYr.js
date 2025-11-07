const u={yellow:"var(--ubits-fg-yellow-subtle-inverted, #ffd555)",green:"var(--ubits-feedback-accent-success, #56ce51)",gray:"var(--ubits-bg-4, #dbdde0)",info:"var(--ubits-feedback-accent-info-static-inverted, #4a74ee)",error:"var(--ubits-button-badge, #cf0e34)"},y={xs:{height:4,indicatorFontSize:"var(--font-body-xs-size, 11px)"},sm:{height:8,indicatorFontSize:"var(--font-body-sm-size, 13px)"},md:{height:16,indicatorFontSize:"var(--font-body-md-size, 16px)"},lg:{height:20,indicatorFontSize:"var(--font-body-lg-size, 18px)"}};function S(g){const{size:n="md",value:c=0,variant:d="default",segments:e=[],indicator:s,className:p=""}=g,v=y[n],m=["ubits-progress-bar",`ubits-progress-bar--${n}`,d==="multi-color"?"ubits-progress-bar--multi-color":"",p].filter(Boolean).join(" ");let l="";s!==void 0&&s!==!1&&(l=`<span class="ubits-progress-bar__indicator">${typeof s=="string"?s:`${Math.round(c)}%`}</span>`);let i="";if(d==="multi-color"&&e.length>0){const o=e.reduce((t,r)=>t+r.value,0),b=Math.max(0,100-o),a=[...e];b>0&&a.push({value:b,color:"gray"}),i=`<div class="ubits-progress-bar__indicator-wrapper">${a.map((t,r)=>{const f=t.value,h=u[t.color]||u.gray,x=r===0,$=r===a.length-1;return`<div 
        class="ubits-progress-bar__segment" 
        style="width: ${f}%; background-color: ${h}; ${`border-radius: ${x?"1000px 0 0 1000px":$?"0 1000px 1000px 0":"0"};`}"
        data-color="${t.color}"
      ></div>`}).join("")}</div>`}else i=`<div 
      class="ubits-progress-bar__indicator-wrapper" 
      style="width: ${Math.max(0,Math.min(100,c))}%;"
    ></div>`;return`
    <div class="${m}" style="height: ${v.height}px;">
      <div class="ubits-progress-bar__container">
        ${i}
      </div>
      ${l}
    </div>
  `.trim()}export{S as r};
