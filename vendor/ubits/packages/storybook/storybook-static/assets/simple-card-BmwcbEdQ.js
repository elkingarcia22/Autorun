import{r as M}from"./ButtonProvider-CX_wJeLD.js";function x(e){const{title:s,subtitle:t,content:i="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",showHeader:o=!0,headerBackground:r="var(--modifiers-normal-color-light-bg-4)",headerDecorations:l=!0,backgroundColor:a="var(--modifiers-normal-color-light-bg-1)",borderColor:u="var(--modifiers-normal-color-light-border-1)",borderRadius:S="var(--ubits-border-radius-sm)",padding:b="var(--ubits-spacing-lg)",titleTypography:m="ubits-heading-h2",subtitleTypography:p="ubits-body-md",contentTypography:v="ubits-body-md",buttons:n=[{label:"Cancel",variant:"secondary",size:"md"},{label:"Save",variant:"primary",size:"md"}],showButtons:_=!0,variant:h="default",size:g="md",maxWidth:c,className:$=""}=e,f=["ubits-simple-card",`ubits-simple-card--${h}`,`ubits-simple-card--${g}`,$].filter(Boolean).join(" "),y=[`background: ${a}`,`border: 1px solid ${u}`,"border-radius: 8px !important",`padding: ${b}`,c?`max-width: ${c}`:""].filter(Boolean).join("; "),C=r!=="var(--modifiers-normal-color-light-bg-4)"?`style="background: ${r}"`:"",T=o?`
    <div class="ubits-simple-card__header" ${C}>
      ${l?`
        <div class="ubits-simple-card__header-decoration ubits-simple-card__header-decoration--left">
          <div class="ubits-simple-card__bubble">
            <div class="ubits-simple-card__bubble-content">
              <div class="ubits-simple-card__logo">A</div>
            </div>
          </div>
        </div>
        <div class="ubits-simple-card__header-decoration ubits-simple-card__header-decoration--right">
          <div class="ubits-simple-card__bubble ubits-simple-card__bubble--small">
            <div class="ubits-simple-card__bubble-content">
              <div class="ubits-simple-card__logo">A</div>
            </div>
          </div>
        </div>
      `:""}
    </div>
  `:"",L=s?`
    <h2 class="ubits-simple-card__title ${m}">${s}</h2>
  `:"",q=t?`
    <p class="ubits-simple-card__subtitle ${p}">${t}</p>
  `:"",E=i?`
    <div class="ubits-simple-card__content ${v}">${i}</div>
  `:"",H=_&&n.length>0?`
    <div class="ubits-simple-card__footer">
      ${n.map(d=>{const k={variant:d.variant||"secondary",size:d.size||"md",text:d.label,disabled:d.disabled||!1};return`<div class="ubits-simple-card__button">${M(k)}</div>`}).join("")}
    </div>
  `:"";return`
    <div class="${f}" style="${y}">
      ${T}
      <div class="ubits-simple-card__body">
        ${L}
        ${q}
        ${E}
      </div>
      ${H}
    </div>
  `.trim()}function z(e){const s=x(e),t=document.createElement("div");t.innerHTML=s;const i=t.firstElementChild;if(!i)throw new Error("Failed to create simple card element");return e.buttons&&e.buttons.length>0&&i.querySelectorAll(".ubits-button").forEach((r,l)=>{const a=e.buttons[l];a?.onClick&&r.addEventListener("click",a.onClick)}),i}export{z as c,x as r};
