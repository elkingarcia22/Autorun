function y(t,e="regular"){const n=e==="solid"?"fas":"far",s=t.startsWith("fa-")?t:`fa-${t}`;return`<i class="${n} ${s}"></i>`}function B(t){const{variant:e="primary",size:n="md",text:s="",icon:i,iconStyle:c="regular",iconOnly:r=!1,disabled:u=!1,badge:l=!1,active:b=!1,className:f="",attributes:d={}}=t,$=["ubits-button-ai",`ubits-button-ai--${e}`,`ubits-button-ai--${n}`,b&&"ubits-button-ai--active",r&&"ubits-button-ai--icon-only",l&&"ubits-button-ai--badge",f].filter(Boolean).join(" "),p=[u&&"disabled",...Object.entries(d).map(([g,v])=>`${g}="${v}"`)].filter(Boolean).join(" ");let o="";i&&(o=y(i,c));const m=l?'<span class="ubits-button-ai__badge"></span>':"";let a="";return r?a=o:i&&s?a=`${o}<span>${s}</span>`:s?a=`<span>${s}</span>`:i&&(a=o),`
    <button class="${$}" ${p}>
      ${a}
      ${m}
    </button>
  `.trim()}function L(t){const e=document.createElement("div");e.innerHTML=B(t);const n=e.querySelector("button");return n?(t.onClick&&n.addEventListener("click",t.onClick),n):(console.error("ButtonAI: No se pudo crear el botón"),null)}export{L as c,B as r};
