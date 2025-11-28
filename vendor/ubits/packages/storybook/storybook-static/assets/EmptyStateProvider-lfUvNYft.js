import{r as u}from"./ButtonProvider-CX_wJeLD.js";function I(p){const{title:s,description:a,imageUrl:e,icon:i,iconSize:h="lg",actionLabel:o,onAction:L,showPrimaryButton:v=!1,primaryButtonIcon:n,showPrimaryButtonIcon:f=!1,secondaryActionLabel:c,onSecondaryAction:g,showSecondaryButton:$=!1,secondaryButtonIcon:r,showSecondaryButtonIcon:b=!1,className:_="",style:l=""}=p,B=["ubits-empty-state","ubits-empty-state--default",_].filter(Boolean).join(" "),S=l?` style="${l}"`:"";let t="";e?t=`
      <div class="ubits-empty-state__image">
        <img src="${e}" alt="${s}" />
      </div>
    `:i&&(t=`
      <div class="ubits-empty-state__icon">
        <i class="far fa-${i}"></i>
      </div>
    `);let m="";const y=v&&o?u({variant:"primary",size:"sm",text:o,icon:f&&n?n:void 0,className:"",attributes:{"data-action":"primary"}}):"",d=$&&c?u({variant:"secondary",size:"sm",text:c,icon:b&&r?r:void 0,className:"",attributes:{"data-action":"secondary"}}):"";return(y||d)&&(m=`
      <div class="ubits-empty-state__actions">
        ${d}
        ${y}
      </div>
    `),`
    <div class="${B}"${S}>
      ${t}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${s}</h3>
        ${a?`<p class="ubits-empty-state__description">${a}</p>`:""}
      </div>
      ${m}
    </div>
  `.trim()}export{I as r};
