import{_ as z}from"./preload-helper-PPVm8Dsz.js";const k=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],N=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];function R(r){const s=String(r.getDate()).padStart(2,"0"),n=String(r.getMonth()+1).padStart(2,"0"),p=r.getFullYear();return`${s}/${n}/${p}`}function L(r,s){const n=new Date(r.getFullYear(),r.getMonth(),r.getDate()),p=new Date(s.getFullYear(),s.getMonth(),s.getDate());return n.getTime()-p.getTime()}function C(r,s){return L(r,s)===0}function V(r,s,n){const p=L(r,s),u=L(n,r);return p>=0&&u>=0}function P(r,s){const n=document.createElement("div");n.style.cssText="position: relative; width: 100%;";const p=`calendar-list-container-${Date.now()}`,u=`calendar-list-${Date.now()}`,M=`calendar-scrollbar-${Date.now()}`;let $=`
    <div id="${p}" style="position: relative; width: 100%; max-height: 200px; overflow: hidden;">
      <div id="${u}" class="ubits-list" role="list" style="max-height: 200px; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 0; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
  `;r.forEach(i=>{const e=i.selected?"active":"default",t=["ubits-list-item","ubits-list-item--sm",e!=="default"?`ubits-list-item--${e}`:""].filter(Boolean).join(" "),a=[];e==="active"&&a.push('aria-selected="true"'),a.push('tabindex="0"'),a.push(`data-value="${i.value}"`),$+=`
      <div class="${t}" role="listitem" ${a.join(" ")} style="cursor: pointer;">
        ${i.label}
      </div>
    `}),$+=`
      </div>
      <div id="${M}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; max-height: 200px; overflow: hidden; pointer-events: auto; z-index: 10;"></div>
    </div>
    <style>
      /* Ocultar scrollbar nativo completamente - solo mostrar UBITS scrollbar */
      #${u}::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
      #${u}::-webkit-scrollbar-track {
        display: none !important;
        background: transparent !important;
      }
      #${u}::-webkit-scrollbar-thumb {
        display: none !important;
        background: transparent !important;
      }
      /* Firefox */
      #${u} {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
    </style>
  `,n.innerHTML=$;const I=async()=>{const i=document.getElementById(u),e=document.getElementById(M);if(!(!i||!e)&&!(i.scrollHeight<=i.clientHeight))try{const t=window.createScrollbarLocal;if(typeof t=="function"){const g=t(i,e,"vertical");if(g){n._scrollbarInstance=g;return}}const{createScrollbar:a}=await z(async()=>{const{createScrollbar:g}=await import("./ScrollProvider-BVL7eCy8.js");return{createScrollbar:g}},[],import.meta.url),l=a({orientation:"vertical",targetId:u,containerId:M});l&&(n._scrollbarInstance=l)}catch(t){console.error("📜 [SCROLLBAR] ❌ Error inicializando scrollbar:",t)}},w=()=>{n.isConnected&&requestAnimationFrame(()=>{I()})};if(n.parentElement)w();else{const i=new MutationObserver(()=>{n.isConnected&&(i.disconnect(),w())});i.observe(document.body,{childList:!0,subtree:!0}),setTimeout(()=>{n.isConnected&&(i.disconnect(),w())},1e3)}return setTimeout(()=>{const i=document.getElementById(u);i&&i.querySelectorAll(".ubits-list-item").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const a=parseInt(t.currentTarget.dataset.value||"0"),l=n._scrollbarInstance;l&&l.destroy&&l.destroy(),s(a)})})},100),n}function A(r){const{mode:s="single",selectedDate:n,endDate:p,minDate:u,maxDate:M,initialDate:$=new Date,className:I="",style:w=""}=r,i=$,e=i.getFullYear(),t=i.getMonth(),a=new Date(e,t,1),g=new Date(e,t+1,0).getDate(),v=a.getDay(),q=new Date().toDateString(),F=["ubits-calendar",s==="range"?"ubits-calendar--range":"ubits-calendar--single",I].filter(Boolean).join(" "),d=w?` style="${w}"`:"",c=`
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${k[t]}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__year-input" value="${e}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--next" aria-label="Mes siguiente">
        <i class="far fa-chevron-right"></i>
      </button>
    </div>
  `,S=`
    <div class="ubits-calendar__weekdays">
      ${N.map(y=>`<div class="ubits-calendar__weekday">${y}</div>`).join("")}
    </div>
  `;let x='<div class="ubits-calendar__days">';for(let y=0;y<v;y++)x+='<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';for(let y=1;y<=g;y++){const _=new Date(e,t,y),o=_.toDateString()===q;let m=["ubits-calendar__day"];s==="single"&&n&&C(_,n)&&m.push("ubits-calendar__day--selected"),s==="range"&&n&&(p?C(_,n)?m.push("ubits-calendar__day--range-start"):C(_,p)?m.push("ubits-calendar__day--range-end"):V(_,n,p)&&m.push("ubits-calendar__day--in-range"):C(_,n)&&m.push("ubits-calendar__day--range-start")),o&&m.push("ubits-calendar__day--today");let h=!1;u&&L(_,u)<0&&(h=!0,m.push("ubits-calendar__day--disabled")),M&&L(_,M)>0&&(h=!0,m.push("ubits-calendar__day--disabled"));const E=h?" disabled":"",D=R(_);x+=`<button type="button" class="${m.join(" ")}" data-date="${D}"${E}>${y}</button>`}return x+="</div>",`
    <div class="${F}"${d}>
      ${c}
      ${S}
      ${x}
    </div>
  `.trim()}function j(r){const{mode:s="single",selectedDate:n,endDate:p,minDate:u,maxDate:M,initialDate:$=new Date,onDateSelect:I,onRangeSelect:w}=r,i=document.createElement("div");i.innerHTML=A(r);const e=i.firstElementChild;if(!e)throw new Error("No se pudo crear el calendario");let t=new Date($),a=n?new Date(n):null,l=p?new Date(p):null,g=!1;const v=()=>{g||(g=!0,e.innerHTML=A({...r,mode:s,selectedDate:a,endDate:l,minDate:u,maxDate:M,initialDate:t}),Y(),setTimeout(()=>{g=!1},100))},Y=()=>{const d=e.querySelector(".ubits-calendar__nav-button--prev"),T=e.querySelector(".ubits-calendar__nav-button--next"),c=e.querySelector(".ubits-calendar__month-input"),S=e.querySelector(".ubits-calendar__year-input"),x=e.querySelector(".ubits-calendar__month-dropdown"),y=e.querySelector(".ubits-calendar__year-dropdown");d?.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),t.setMonth(t.getMonth()-1),c&&(c.value=k[t.getMonth()]),S&&(S.value=String(t.getFullYear())),v()}),T?.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),t.setMonth(t.getMonth()+1),c&&(c.value=k[t.getMonth()]),S&&(S.value=String(t.getFullYear())),v()}),c?.addEventListener("click",b=>{if(b.preventDefault(),b.stopPropagation(),x){const o=x;if(o.style.display==="block")o.style.display="none";else{y&&(y.style.display="none");const h=k.map((D,f)=>({label:D,value:f,selected:f===t.getMonth()}));o.innerHTML="";const E=P(h,D=>{t.setMonth(D),o.style.display="none",c&&(c.value=k[D]),v()});o.appendChild(E),o.style.display="block"}}}),S?.addEventListener("click",b=>{if(b.preventDefault(),b.stopPropagation(),y){const o=y;if(o.style.display==="block")o.style.display="none";else{x&&(x.style.display="none");const h=t.getFullYear(),E=Array.from({length:100},(f,B)=>{const H=h-50+B;return{label:String(H),value:H,selected:H===h}});o.innerHTML="";const D=P(E,f=>{t.setFullYear(f),o.style.display="none",S&&(S.value=String(f)),v()});o.appendChild(D),o.style.display="block"}}}),e.querySelectorAll(".ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)").forEach(b=>{b.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const m=b.dataset.date||"",[h,E,D]=m.split("/"),f=new Date(parseInt(D),parseInt(E)-1,parseInt(h));s==="single"?(a=f,v(),I&&I(f)):s==="range"&&(!a||a&&l?(a=f,l=null,v()):a&&!l&&(L(f,a)<0?(l=a,a=f):l=f,v(),w&&a&&l&&w(a,l)))})})};return v(),{element:e,update:d=>{d.selectedDate!==void 0&&(a=d.selectedDate?new Date(d.selectedDate):null),d.endDate!==void 0&&(l=d.endDate?new Date(d.endDate):null),d.initialDate&&(t=new Date(d.initialDate)),Object.assign(r,d),v()},destroy:()=>{const d=e.querySelector(".ubits-calendar__month-dropdown"),T=e.querySelector(".ubits-calendar__year-dropdown");if(d){const c=d._scrollbarInstance;c&&c.destroy&&c.destroy()}if(T){const c=T._scrollbarInstance;c&&c.destroy&&c.destroy()}e.parentElement&&e.parentElement.removeChild(e)}}}const J=Object.freeze(Object.defineProperty({__proto__:null,createCalendar:j,renderCalendar:A},Symbol.toStringTag,{value:"Module"})),U=Object.freeze(Object.defineProperty({__proto__:null,createCalendar:j,renderCalendar:A},Symbol.toStringTag,{value:"Module"}));export{J as C,j as c,U as i};
