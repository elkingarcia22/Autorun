function u(i={}){const{size:e="md",variant:t="primary",animated:r=!0,label:s,fullScreen:a=!1,className:l="",style:n=""}=i,c=["ubits-spinner",`ubits-spinner--${e}`,`ubits-spinner--${t}`,r?"ubits-spinner--animated":"",a?"ubits-spinner--fullscreen":"",l].filter(Boolean).join(" "),p=n?` style="${n}"`:"";return`
    <div class="${c}"${p}>
      <div class="ubits-spinner__circle">
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
      </div>
      ${s?`<span class="ubits-spinner__label">${s}</span>`:""}
    </div>
  `.trim()}export{u as r};
