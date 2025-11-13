function I(p){const{title:n,description:e,imageUrl:i,icon:o,iconSize:L="lg",actionLabel:c,onAction:g,showPrimaryButton:$=!1,primaryButtonIcon:u,showPrimaryButtonIcon:f=!1,secondaryActionLabel:r,onSecondaryAction:w,showSecondaryButton:_=!1,secondaryButtonIcon:l,showSecondaryButtonIcon:v=!1,className:B="",style:y=""}=p,S=["ubits-empty-state","ubits-empty-state--default",B].filter(Boolean).join(" "),h=y?` style="${y}"`:"";let t="";i?t=`
      <div class="ubits-empty-state__image">
        <img src="${i}" alt="${n}" />
      </div>
    `:o&&(t=`
      <div class="ubits-empty-state__icon">
        <i class="far fa-${o}"></i>
      </div>
    `);let b="",s=c||"";f&&u&&(s=`<i class="far fa-${u}"></i> ${s}`);let a=r||"";v&&l&&(a=`<i class="far fa-${l}"></i> ${a}`);const m=$&&c?`<button class="ubits-button ubits-button--primary ubits-button--sm" data-action="primary" type="button">${s}</button>`:"",d=_&&r?`<button class="ubits-button ubits-button--secondary ubits-button--sm" data-action="secondary" type="button">${a}</button>`:"";return(m||d)&&(b=`
      <div class="ubits-empty-state__actions">
        ${d}
        ${m}
      </div>
    `),`
    <div class="${S}"${h}>
      ${t}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${n}</h3>
        ${e?`<p class="ubits-empty-state__description">${e}</p>`:""}
      </div>
      ${b}
    </div>
  `.trim()}export{I as r};
