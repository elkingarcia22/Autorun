function h(a){if(typeof window.renderBadge=="function")return window.renderBadge(a);const{type:t,size:o,variant:c,absolute:s,position:i,className:e,content:n}=a,u=["ubits-badge",`ubits-badge--${o}`,t==="dot"?"ubits-badge--dot":"",t==="number"?"ubits-badge--number":"",`ubits-badge--${c}`,s?"ubits-badge--absolute":"",s&&i?`ubits-badge--absolute-${i}`:"",e].filter(Boolean).join(" "),b=t==="number"&&n!==void 0&&n!==null?String(n):"";return`<span class="${u}">${b}</span>`}const m={xs:20,sm:28,md:36,lg:40},z="md",I={green:"success",red:"error",blue:"info",orange:"warning",gray:"primary"},v={xs:6,sm:8,md:10,lg:10},p={xs:"var(--font-body-xs-size, 11px)",sm:"var(--font-body-sm-size, 13px)",md:"var(--font-body-md-size, 16px)",lg:"var(--font-body-lg-size, 18px)"};function S(a){return a.imageUrl?"photo":a.initials?"initials":"icon"}function w(a){const t=a.trim().split(/\s+/);return t.length===0?"":t.length===1?t[0].substring(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}function C(a={}){const{imageUrl:t,initials:o,icon:c="user",size:s="md",badgeColor:i,badgeContent:e,alt:n="Avatar",className:u="",onClick:b}=a,l=S(a),r=m[s]||m.md,f=v[s]||v.md,$=p[s]||p.md,x=["ubits-avatar",`ubits-avatar--${s}`,`ubits-avatar--${l}`,u].filter(Boolean).join(" "),y=`
    width: ${r}px;
    height: ${r}px;
    min-width: ${r}px;
    min-height: ${r}px;
  `.trim();let d="";if(l==="photo"&&t)d=`<div class="ubits-avatar-image-container"><img src="${t}" alt="${n}" class="ubits-avatar-image" /></div>`;else if(l==="initials"){const g=o?w(o):"";d=`<span class="ubits-avatar-initials" style="font-size: ${$};">${g}</span>`}else{const g=r-f*2;d=`<i class="far fa-${c}" style="font-size: ${g}px;"></i>`}const A=i?h({type:e!=null&&e!==""?"number":"dot",size:z,variant:I[i]||"success",absolute:!0,position:"bottom-right",className:"ubits-avatar-badge-wrapper",content:e}):"";return`
    <div class="${x}" style="${y}" ${b?'role="button" tabindex="0"':""} data-variant="${l}">
      ${d}
      ${A}
    </div>
  `.trim()}export{C as r};
