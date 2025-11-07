import{c as P,r as A}from"./ListProvider-DPCKuQ24.js";import"./iframe-Cv55Ao8S.js";import"./preload-helper-PPVm8Dsz.js";function j(e){const{containerId:s,label:n="",placeholder:t="",helperText:c="",size:r="md",state:u="default",type:o="text",showLabel:l=!0,showHelper:h=!1,showCounter:y=!1,maxLength:d=50,mandatory:w=!1,mandatoryType:S="obligatorio",leftIcon:a="",rightIcon:b="",value:i="",className:L="",attributes:$={}}=e;let f="";if(l&&n){const v=w?` <span class="ubits-input-mandatory">(${S})</span>`:"";f+=`<label class="ubits-input-label">${n}${v}</label>`}const g=a&&a.trim()!=="",p=b&&b.trim()!=="";g&&a.startsWith("fa-")?`${a}`:g&&`${a}`,p&&b.startsWith("fa-")?`${b}`:p&&`${b}`,f+='<div style="position: relative; display: inline-block; width: 100%;">';let m=b,x=p,C=a,T=g;const k=["ubits-input",`ubits-input--${r}`];u!=="default"&&k.push(`ubits-input--${u}`),L&&k.push(L);const E=u==="disabled"?" disabled":"",z=y?` maxlength="${d}"`:"",H=g?r==="xs"?"padding-left: 32px;":r==="sm"?"padding-left: 36px;":r==="md"?"padding-left: 40px;":"padding-left: 44px;":"",D=p?r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;":"";if(o==="select"){const v=e.selectOptions||[],I=i&&v.find(M=>M.value===i)?.text||t;f+=`<input type="text" class="${k.join(" ")}" style="width: 100%; ${H} ${D}" value="${I}" readonly>`,p||(m="fa-chevron-down",x=!0)}else if(o==="textarea"){let v=`width: 100%; min-height: 80px; resize: vertical; ${H} ${D}`;u==="disabled"&&(v+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),f+=`<textarea class="${k.join(" ")}" style="${v}" placeholder="${t}"${E}${z}>${i}</textarea>`}else if(o==="search"){let v=H,I=D;g||(C="fa-search",T=!0,v=r==="xs"?"padding-left: 32px;":r==="sm"?"padding-left: 36px;":r==="md"?"padding-left: 40px;":"padding-left: 44px;"),m="fa-times",x=!0,I=r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;";let M=`width: 100%; ${v} ${I}`;u==="disabled"&&(M+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),f+=`<input type="text" class="${k.join(" ")}" style="${M}" placeholder="${t}" value="${i}" autocomplete="off"${E}${z}>`}else if(o==="autocomplete"){let v=H,I=D;g||(C="fa-search",T=!0,v=r==="xs"?"padding-left: 32px;":r==="sm"?"padding-left: 36px;":r==="md"?"padding-left: 40px;":"padding-left: 44px;"),m="fa-times",x=!0,I=r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;";let M=`width: 100%; ${v} ${I}`;u==="disabled"&&(M+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),f+=`<input type="text" class="${k.join(" ")}" style="${M}" placeholder="${t}" value="${i}" autocomplete="off"${E}${z}>`}else if(o==="calendar"){let v=H,I=D;m="fa-calendar",x=!0,I=r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;";let M=`width: 100%; ${v} ${I}`;u==="disabled"&&(M+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),f+=`<input type="text" class="${k.join(" ")}" style="${M}" placeholder="${t}" value="${i}" readonly${E}>`}else if(o==="password"){let v=H,I=D;m="fa-eye",x=!0,I=r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;";let M=`width: 100%; ${v} ${I}`;u==="disabled"&&(M+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),f+=`<input type="password" class="${k.join(" ")}" style="${M}" placeholder="${t}" value="${i}"${E}${z}>`}else f+=`<input type="${o}" class="${k.join(" ")}" style="width: 100%; ${H} ${D}" placeholder="${t}" value="${i}"${E}${z}>`;if(T){const v=C.startsWith("fa-")?`far ${C}`:`far fa-${C}`;f+=`<i class="${v} ubits-input-icon-left" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`}if(x){const v=m.startsWith("fa-")?`far ${m}`:`far fa-${m}`;f+=`<i class="${v} ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`}f+="</div>",(h||y)&&(f+='<div class="ubits-input-helper">',h&&c&&(f+=`<span>${c}</span>`),y&&(f+=`<span class="ubits-input-counter">0/${d}</span>`),f+="</div>");const V=Object.entries($).map(([v,I])=>`${v}="${I}"`).join(" ");return V?`<div ${V}>${f}</div>`:f}function N(e){const{containerId:s,onChange:n,onFocus:t,onBlur:c,showCounter:r=!1,maxLength:u=50,type:o="text",selectOptions:l=[],autocompleteOptions:h=[],value:y=""}=e;if(!s)return console.error("UBITS Input: containerId es requerido"),null;const d=document.getElementById(s);if(!d)return console.error(`UBITS Input: No se encontró el contenedor con ID "${s}"`),null;const w=j(e);d.innerHTML=w;const S=d.querySelector('div[style*="position: relative"]'),a=d.querySelector(".ubits-input"),b=d.querySelector(".ubits-input-counter");if(!a||!S)return console.error("UBITS Input: No se pudo crear el elemento input"),null;if(getComputedStyle(d).position==="static"&&(d.style.position="relative"),o==="select"&&U(d,a,l,y,e.placeholder||"",n,e.size||"md"),o==="search"&&B(d,a,n),o==="autocomplete"&&R(d,a,h,n,e.size||"md"),o==="calendar"&&Y(d,a,n),o==="password"&&F(d,a),r&&b&&W(a,b,u),n&&typeof n=="function"){const i=o==="select"?"change":"input";a.addEventListener(i,L=>{n(L.target.value,L)})}return t&&typeof t=="function"&&a.addEventListener("focus",i=>{t(i.target.value,i)}),c&&typeof c=="function"&&a.addEventListener("blur",i=>{c(i.target.value,i)}),{element:S,inputElement:a,getValue:()=>a.value,setValue:i=>{a.value=i,r&&b&&q(b,i.length,u)},focus:()=>a.focus(),blur:()=>a.blur(),disable:()=>{a.disabled=!0,a.classList.add("ubits-input--disabled")},enable:()=>{a.disabled=!1,a.classList.remove("ubits-input--disabled")},setState:i=>{["ubits-input--hover","ubits-input--focus","ubits-input--active","ubits-input--invalid","ubits-input--disabled"].forEach($=>a.classList.remove($)),i!=="default"&&a.classList.add(`ubits-input--${i}`),i==="disabled"?a.disabled=!0:a.disabled=!1}}}function F(e,s){const n=e.querySelector('i[class*="fa-eye"]');if(n){let t=!1;n.style.pointerEvents="auto",n.style.cursor="pointer",n.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),t=!t,t?(s.type="text",n.className="far fa-eye-slash ubits-input-icon-right"):(s.type="password",n.className="far fa-eye ubits-input-icon-right")})}}function B(e,s,n){const t=e.querySelector('i[class*="fa-times"]');if(t){t.style.display=s.value.length>0?"block":"none",t.style.pointerEvents="auto",t.style.cursor="pointer";const c=()=>{t.style.display=s.value.length>0?"block":"none"};s.addEventListener("input",c),t.addEventListener("click",r=>{r.preventDefault(),s.value="",s.focus(),c(),n&&n("")})}}function R(e,s,n,t,c="md"){const r=c==="xs"?"xs":c==="sm"?"sm":c==="md"?"md":"lg",u=e.querySelector('i[class*="fa-times"]');if(u){u.style.display=s.value.length>0?"block":"none",u.style.pointerEvents="auto",u.style.cursor="pointer";const h=()=>{u.style.display=s.value.length>0?"block":"none"};s.addEventListener("input",h),u.addEventListener("click",y=>{y.preventDefault(),s.value="",s.focus(),h();const d=e.querySelector(".ubits-autocomplete-list-container");d&&(d.style.display="none"),t&&t("")})}const o=document.createElement("div");o.className="ubits-autocomplete-list-container",o.style.cssText=`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `,e.appendChild(o);const l=(h=!1)=>{const y=s.value.toLowerCase();let d;if(h||y.length<1?d=n.slice(0,8):d=n.filter(a=>a.text.toLowerCase().includes(y)).slice(0,8),d.length===0){o.style.display="none";return}const w=d.map(a=>({label:a.text,state:"default",value:a.value,selected:!1})),S=`ubits-autocomplete-list-${e.id}`;o.id=S,o.innerHTML="";try{P({containerId:S,items:w,size:r,maxHeight:"200px",onSelectionChange:(a,b)=>{a&&a.value&&(s.value=a.label,o.style.display="none",u&&(u.style.display="block"),t&&t(a.value))}}),y.length>0&&o.querySelectorAll(".ubits-list-item").forEach(b=>{const i=b.textContent||"";if(i.toLowerCase().includes(y)){const L=new RegExp(`(${y})`,"gi"),$=i.replace(L,"<strong>$1</strong>");b.innerHTML=$}})}catch(a){console.warn("Using renderList fallback for autocomplete:",a);const b=A({items:w,size:r,maxHeight:"200px"});o.innerHTML=b,y.length>0&&o.querySelectorAll(".ubits-list-item").forEach($=>{const f=$.textContent||"";if(f.toLowerCase().includes(y)){const g=new RegExp(`(${y})`,"gi"),p=f.replace(g,"<strong>$1</strong>");$.innerHTML=p}}),o.querySelectorAll(".ubits-list-item").forEach((L,$)=>{const f=w[$];f&&f.state!=="disabled"&&L.addEventListener("click",()=>{s.value=f.label,o.style.display="none",u&&(u.style.display="block"),t&&t(f.value||"")})})}o.style.display="block"};s.addEventListener("focus",()=>{l(!0)}),s.addEventListener("input",()=>{l(!1)}),s.addEventListener("blur",()=>{setTimeout(()=>o.style.display="none",150)})}function U(e,s,n,t,c,r,u="md"){s.style.cursor="pointer";const o=u==="xs"?"xs":u==="sm"?"sm":u==="md"?"md":"lg",l=document.createElement("div");l.className="ubits-select-list-container",l.style.cssText=`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `,e.appendChild(l);const h=50;let y=0,d=[],w=!1;const S=(a=0)=>{w||(w=!0,setTimeout(()=>{const b=a*h,i=Math.min(b+h,n.length),$=n.slice(b,i).map(g=>({label:g.text,state:t===g.value?"active":"default",value:g.value,selected:t===g.value}));a===0?d=$:d=[...d,...$];const f=`ubits-select-list-${e.id}`;l.id=f,l.innerHTML="";try{P({containerId:f,items:d,size:o,maxHeight:"200px",onSelectionChange:(g,p)=>{g&&g.value&&(s.value=g.label,l.style.display="none",r&&r(g.value))}})}catch(g){console.warn("Using renderList fallback for select:",g);const p=A({items:d,size:o,maxHeight:"200px"});l.innerHTML=p,l.querySelectorAll(".ubits-list-item").forEach((x,C)=>{const T=d[C];T&&T.state!=="disabled"&&x.addEventListener("click",()=>{s.value=T.label,l.style.display="none",r&&r(T.value||"")})})}if(i<n.length){const g=l.querySelector(".ubits-list");if(g){const p=new IntersectionObserver(x=>{x[0].isIntersecting&&!w&&i<n.length&&(y++,S(y))},{root:g,rootMargin:"50px"}),m=l.querySelector(".ubits-list-item:last-child");m&&p.observe(m)}}w=!1},150))};s.addEventListener("click",()=>{l.style.display==="block"?l.style.display="none":(y=0,d=[],S(0),l.style.display="block")}),document.addEventListener("click",a=>{e.contains(a.target)||(l.style.display="none")})}function Y(e,s,n){const t=document.createElement("div");t.className="ubits-calendar-picker",e.appendChild(t);let c=new Date,r=null;const u=l=>{const h=String(l.getDate()).padStart(2,"0"),y=String(l.getMonth()+1).padStart(2,"0"),d=l.getFullYear();return`${h}/${y}/${d}`},o=()=>{const l=c.getFullYear(),h=c.getMonth(),y=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],d=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],w=new Date(l,h,1),a=new Date(l,h+1,0).getDate(),b=w.getDay();let i=`
      <div class="ubits-calendar-header">
        <button class="ubits-calendar-prev" type="button"><i class="far fa-chevron-left"></i></button>
        <div class="ubits-calendar-selectors">
          <select class="ubits-calendar-month-select">
            ${y.map((p,m)=>`<option value="${m}" ${m===h?"selected":""}>${p}</option>`).join("")}
          </select>
          <select class="ubits-calendar-year-select">
            ${Array.from({length:100},(p,m)=>{const x=c.getFullYear()-50+m;return`<option value="${x}" ${x===l?"selected":""}>${x}</option>`}).join("")}
          </select>
        </div>
        <button class="ubits-calendar-next" type="button"><i class="far fa-chevron-right"></i></button>
      </div>
      <div class="ubits-calendar-weekdays">
        ${d.map(p=>`<div class="ubits-calendar-weekday">${p}</div>`).join("")}
      </div>
      <div class="ubits-calendar-days">
    `;for(let p=0;p<b;p++)i+='<div class="ubits-calendar-day ubits-calendar-day--empty"></div>';for(let p=1;p<=a;p++){const m=new Date(l,h,p),x=m.toDateString()===new Date().toDateString(),C=r&&m.toDateString()===r.toDateString();let T="ubits-calendar-day";x&&(T+=" ubits-calendar-day--today"),C&&(T+=" ubits-calendar-day--selected"),i+=`<div class="${T}" data-date="${u(m)}">${p}</div>`}i+="</div>",t.innerHTML=i;const L=t.querySelector(".ubits-calendar-prev"),$=t.querySelector(".ubits-calendar-next"),f=t.querySelector(".ubits-calendar-month-select"),g=t.querySelector(".ubits-calendar-year-select");L?.addEventListener("click",()=>{c.setMonth(c.getMonth()-1),o()}),$?.addEventListener("click",()=>{c.setMonth(c.getMonth()+1),o()}),f?.addEventListener("change",p=>{c.setMonth(parseInt(p.target.value)),o()}),g?.addEventListener("change",p=>{c.setFullYear(parseInt(p.target.value)),o()}),t.querySelectorAll(".ubits-calendar-day:not(.ubits-calendar-day--empty)").forEach(p=>{p.addEventListener("click",()=>{const m=p.dataset.date||"",[x,C,T]=m.split("/");r=new Date(parseInt(T),parseInt(C)-1,parseInt(x)),s.value=m,t.style.display="none",n&&n(m)})})};s.addEventListener("click",()=>{t.style.display==="none"||!t.style.display?(t.style.display="block",o()):t.style.display="none"}),document.addEventListener("click",l=>{e.contains(l.target)||(t.style.display="none")})}function W(e,s,n){const t=()=>{q(s,e.value.length,n),e.value.length>n&&(e.value=e.value.substring(0,n),q(s,n,n))};e.addEventListener("input",t),q(s,e.value.length,n)}function q(e,s,n){e.textContent=`${s}/${n}`,s>=n?e.classList.add("ubits-input-counter--limit"):e.classList.remove("ubits-input-counter--limit")}const X={title:"Components/Input",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Input UBITS con soporte para múltiples tipos (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar), 4 tamaños (xs, sm, md, lg), 6 estados (default, hover, focus, active, invalid, disabled), iconos, helpers, contadores, y opciones mandatory/optional."}}},argTypes:{label:{control:{type:"text"},description:"Texto del label",table:{defaultValue:{summary:""}}},placeholder:{control:{type:"text"},description:"Texto del placeholder",table:{defaultValue:{summary:""}}},helperText:{control:{type:"text"},description:"Texto de ayuda (helper text)",table:{defaultValue:{summary:""}}},type:{control:{type:"select"},options:["text","email","password","number","tel","url","select","textarea","search","autocomplete","calendar"],description:"Tipo de input",table:{defaultValue:{summary:"text"},type:{summary:"text | email | password | number | tel | url | select | textarea | search | autocomplete | calendar"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del input",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},state:{control:{type:"select"},options:["default","hover","focus","active","invalid","disabled"],description:"Estado del input",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | focus | active | invalid | disabled"}}},showLabel:{control:{type:"boolean"},description:"Mostrar/ocultar label",table:{defaultValue:{summary:"true"}}},showHelper:{control:{type:"boolean"},description:"Mostrar/ocultar helper text",table:{defaultValue:{summary:"false"}}},showCounter:{control:{type:"boolean"},description:"Mostrar/ocultar contador de caracteres",table:{defaultValue:{summary:"false"}}},maxLength:{control:{type:"number"},description:"Máximo de caracteres para el contador",table:{defaultValue:{summary:"50"}}},mandatory:{control:{type:"boolean"},description:"Mostrar texto mandatory/optional",table:{defaultValue:{summary:"false"}}},mandatoryType:{control:{type:"select"},options:["obligatorio","opcional"],description:"Tipo de mandatory",table:{defaultValue:{summary:"obligatorio"},type:{summary:"obligatorio | opcional"}}},leftIcon:{control:{type:"text"},description:"Icono izquierdo (nombre FontAwesome sin prefijo, ej: user)",table:{defaultValue:{summary:""}}},rightIcon:{control:{type:"text"},description:"Icono derecho (nombre FontAwesome sin prefijo, ej: check)",table:{defaultValue:{summary:""}}},value:{control:{type:"text"},description:"Valor inicial del input",table:{defaultValue:{summary:""}}}}};function _(e=20){return Array.from({length:e},(s,n)=>({value:`opt-${n+1}`,text:`Opción ${n+1}`}))}function J(){return[{value:"apple",text:"Manzana"},{value:"banana",text:"Banana"},{value:"orange",text:"Naranja"},{value:"grape",text:"Uva"},{value:"strawberry",text:"Fresa"},{value:"watermelon",text:"Sandía"},{value:"pineapple",text:"Piña"},{value:"mango",text:"Mango"},{value:"kiwi",text:"Kiwi"},{value:"peach",text:"Durazno"},{value:"cherry",text:"Cereza"},{value:"blueberry",text:"Arándano"},{value:"papaya",text:"Papaya"},{value:"coconut",text:"Coco"},{value:"avocado",text:"Aguacate"}]}const O={args:{containerId:"input-storybook-container",label:"Label",placeholder:"Placeholder",helperText:"Helper text",type:"text",size:"md",state:"default",showLabel:!0,showHelper:!1,showCounter:!1,maxLength:50,mandatory:!1,mandatoryType:"obligatorio",leftIcon:"",rightIcon:"",value:""},render:e=>{const s=document.createElement("div");s.style.cssText="max-width: 600px; margin: 20px auto; padding: 20px;";const n=`input-storybook-${Math.random().toString(36).substr(2,9)}`,t={...e,containerId:n,selectOptions:e.type==="select"?_(20):void 0,autocompleteOptions:e.type==="autocomplete"?J():void 0};try{const c=document.createElement("div");c.id=n,s.appendChild(c),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const u=document.getElementById(n);if(u)try{N(t)}catch(o){console.error("Error creating input:",o);const l=j(t);u.innerHTML=l}else console.error(`Container with ID "${n}" not found`)})});const r=document.createElement("div");r.style.cssText=`
        margin-top: 20px;
        padding: 16px;
        background: var(--ubits-bg-2);
        border-radius: 8px;
        font-family: var(--font-sans);
        font-size: 14px;
      `,r.innerHTML=`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--ubits-fg-1-high);">Información del Input</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
          <div><strong>Tipo:</strong> ${e.type}</div>
          <div><strong>Tamaño:</strong> ${e.size}</div>
          <div><strong>Estado:</strong> ${e.state}</div>
          <div><strong>Label:</strong> ${e.showLabel?"Visible":"Oculto"}</div>
          <div><strong>Helper:</strong> ${e.showHelper?"Visible":"Oculto"}</div>
          <div><strong>Counter:</strong> ${e.showCounter?"Visible":"Oculto"}</div>
          <div><strong>Mandatory:</strong> ${e.mandatory?e.mandatoryType:"No"}</div>
          <div><strong>Iconos:</strong> ${e.leftIcon?`Izq: ${e.leftIcon}`:""} ${e.rightIcon?`Der: ${e.rightIcon}`:"Ninguno"}</div>
        </div>
      `,s.appendChild(r)}catch(c){console.error("Error rendering input:",c),s.innerHTML=`<div style="color: red; padding: 16px;">Error: ${c}</div>`}return s}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    containerId: 'input-storybook-container',
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    type: 'text',
    size: 'md',
    state: 'default',
    showLabel: true,
    showHelper: false,
    showCounter: false,
    maxLength: 50,
    mandatory: false,
    mandatoryType: 'obligatorio',
    leftIcon: '',
    rightIcon: '',
    value: ''
  },
  render: args => {
    // Crear contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 600px; margin: 20px auto; padding: 20px;';

    // Generar un ID único para el contenedor del input
    const containerId = \`input-storybook-\${Math.random().toString(36).substr(2, 9)}\`;

    // Preparar opciones según el tipo
    const inputOptions: InputOptions = {
      ...args,
      containerId,
      selectOptions: args.type === 'select' ? generateSelectOptions(20) : undefined,
      autocompleteOptions: args.type === 'autocomplete' ? generateAutocompleteOptions() : undefined
    };
    try {
      // Crear contenedor interno para el input
      const inputContainer = document.createElement('div');
      inputContainer.id = containerId;
      wrapper.appendChild(inputContainer);

      // Después de agregar el contenedor al wrapper, usar createInput
      // Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const container = document.getElementById(containerId);
          if (container) {
            // createInput buscará el contenedor y renderizará el HTML + inicializará funcionalidades interactivas
            try {
              createInput(inputOptions);
            } catch (err) {
              console.error('Error creating input:', err);
              // Fallback: usar renderInput si createInput falla
              const inputHTML = renderInput(inputOptions);
              container.innerHTML = inputHTML;
            }
          } else {
            console.error(\`Container with ID "\${containerId}" not found\`);
          }
        });
      });

      // Panel de información
      const infoPanel = document.createElement('div');
      infoPanel.style.cssText = \`
        margin-top: 20px;
        padding: 16px;
        background: var(--ubits-bg-2);
        border-radius: 8px;
        font-family: var(--font-sans);
        font-size: 14px;
      \`;
      infoPanel.innerHTML = \`
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--ubits-fg-1-high);">Información del Input</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
          <div><strong>Tipo:</strong> \${args.type}</div>
          <div><strong>Tamaño:</strong> \${args.size}</div>
          <div><strong>Estado:</strong> \${args.state}</div>
          <div><strong>Label:</strong> \${args.showLabel ? 'Visible' : 'Oculto'}</div>
          <div><strong>Helper:</strong> \${args.showHelper ? 'Visible' : 'Oculto'}</div>
          <div><strong>Counter:</strong> \${args.showCounter ? 'Visible' : 'Oculto'}</div>
          <div><strong>Mandatory:</strong> \${args.mandatory ? args.mandatoryType : 'No'}</div>
          <div><strong>Iconos:</strong> \${args.leftIcon ? \`Izq: \${args.leftIcon}\` : ''} \${args.rightIcon ? \`Der: \${args.rightIcon}\` : 'Ninguno'}</div>
        </div>
      \`;
      wrapper.appendChild(infoPanel);
    } catch (error) {
      console.error('Error rendering input:', error);
      wrapper.innerHTML = \`<div style="color: red; padding: 16px;">Error: \${error}</div>\`;
    }
    return wrapper;
  }
}`,...O.parameters?.docs?.source}}};const Z=["Default"];export{O as Default,Z as __namedExportsOrder,X as default};
