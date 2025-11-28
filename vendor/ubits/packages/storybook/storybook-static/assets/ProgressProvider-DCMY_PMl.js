const g={yellow:"var(--modifiers-normal-color-light-feedback-chart-warning-bold)",green:"var(--modifiers-normal-color-light-feedback-accent-success)",gray:"var(--modifiers-normal-color-light-bg-4)",info:"var(--modifiers-normal-color-light-feedback-chart-info-bold)",error:"var(--modifiers-normal-color-light-feedback-accent-error)"},_={xs:{height:4,indicatorFontSize:"var(--modifiers-normal-body-xs-regular-fontsize)"},sm:{height:8,indicatorFontSize:"var(--modifiers-normal-body-sm-regular-fontsize)"},md:{height:16,indicatorFontSize:"var(--modifiers-normal-body-md-regular-fontsize)"},lg:{height:20,indicatorFontSize:"var(--modifiers-normal-body-lg-regular-fontsize)"}};function S(u){const{size:l="md",value:n=0,variant:c="default",segments:s=[],indicator:o,className:b=""}=u,f=_[l],h=["ubits-progress-bar",`ubits-progress-bar--${l}`,c==="multi-color"?"ubits-progress-bar--multi-color":"",b].filter(Boolean).join(" ");let d="";o!==void 0&&o!==!1&&(d=`<span class="ubits-progress-bar__indicator">${typeof o=="string"?o:`${Math.round(n)}%`}</span>`);let e="";if(c==="multi-color"&&s.length>0){const t=s.reduce((r,i)=>r+i.value,0),m=Math.max(0,100-t),a=[...s];m>0&&a.push({value:m,color:"gray"}),e=`<div class="ubits-progress-bar__indicator-wrapper">${a.map((r,i)=>{const p=r.value,v=g[r.color]||g.gray,$=i===0,y=i===a.length-1;return`<div 
        class="ubits-progress-bar__segment" 
        style="width: ${p}%; background-color: ${v}; ${`border-radius: ${$?"1000px 0 0 1000px":y?"0 1000px 1000px 0":"0"};`}"
        data-color="${r.color}"
      ></div>`}).join("")}</div>`}else e=`<div 
      class="ubits-progress-bar__indicator-wrapper" 
      style="width: ${Math.max(0,Math.min(100,n))}%;"
    ></div>`;return`
    <div class="${h}" style="height: ${f.height}px;">
      <div class="ubits-progress-bar__container">
        ${e}
      </div>
      ${d}
    </div>
  `.trim()}export{S as r};
