const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BovPifr4.js","./preload-helper-PPVm8Dsz.js"])))=>i.map(i=>d[i]);
import{_ as F}from"./preload-helper-PPVm8Dsz.js";import{c as q,r as A}from"./ListProvider-DvH0c9YJ.js";import"./iframe-BfFsla13.js";function j(e){const{containerId:t,label:n="",placeholder:i="",helperText:o="",size:r="md",state:c="default",type:l="text",showLabel:f=!0,showHelper:d=!1,showCounter:g=!1,maxLength:s=50,mandatory:b=!1,mandatoryType:h="obligatorio",leftIcon:a="",rightIcon:v="",value:p="",className:w="",attributes:$={}}=e;let u="";if(f&&n){const y=b?` <span class="ubits-input-mandatory">(${h})</span>`:"";u+=`<label class="ubits-input-label">${n}${y}</label>`}const m=a&&a.trim()!=="",L=v&&v.trim()!=="";m&&a.startsWith("fa-")?`${a}`:m&&`${a}`,L&&v.startsWith("fa-")?`${v}`:L&&`${v}`,u+='<div style="position: relative; display: inline-block; width: 100%;">';let C=v,T=L,M=a,P=m;const k=["ubits-input",`ubits-input--${r}`];c!=="default"&&k.push(`ubits-input--${c}`),w&&k.push(w);const E=c==="disabled"?" disabled":"",z=g?` maxlength="${s}"`:"",H=m?r==="xs"?"padding-left: 32px;":r==="sm"?"padding-left: 36px;":r==="md"?"padding-left: 40px;":"padding-left: 44px;":"",S=L?r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;":"";if(l==="select"){const y=e.selectOptions||[],x=p&&y.find(I=>I.value===p)?.text||i;u+=`<input type="text" class="${k.join(" ")}" style="width: 100%; ${H} ${S}" value="${x}" readonly>`,L||(C="fa-chevron-down",T=!0)}else if(l==="textarea"){let y=`width: 100%; min-height: 80px; resize: vertical; ${H} ${S}`;c==="disabled"&&(y+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),u+=`<textarea class="${k.join(" ")}" style="${y}" placeholder="${i}"${E}${z}>${p}</textarea>`}else if(l==="search"){let y=H,x=S;m||(M="fa-search",P=!0,y=r==="xs"?"padding-left: 32px;":r==="sm"?"padding-left: 36px;":r==="md"?"padding-left: 40px;":"padding-left: 44px;"),C="fa-times",T=!0,x=r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;";let I=`width: 100%; ${y} ${x}`;c==="disabled"&&(I+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),u+=`<input type="text" class="${k.join(" ")}" style="${I}" placeholder="${i}" value="${p}" autocomplete="off"${E}${z}>`}else if(l==="autocomplete"){let y=H,x=S;m||(M="fa-search",P=!0,y=r==="xs"?"padding-left: 32px;":r==="sm"?"padding-left: 36px;":r==="md"?"padding-left: 40px;":"padding-left: 44px;"),C="fa-times",T=!0,x=r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;";let I=`width: 100%; ${y} ${x}`;c==="disabled"&&(I+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),u+=`<input type="text" class="${k.join(" ")}" style="${I}" placeholder="${i}" value="${p}" autocomplete="off"${E}${z}>`}else if(l==="calendar"){let y=H,x=S;C="fa-calendar",T=!0,x=r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;";let I=`width: 100%; ${y} ${x}`;c==="disabled"&&(I+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),u+=`<input type="text" class="${k.join(" ")}" style="${I}" placeholder="${i}" value="${p}" readonly${E}>`}else if(l==="password"){let y=H,x=S;C="fa-eye",T=!0,x=r==="xs"?"padding-right: 32px;":r==="sm"?"padding-right: 36px;":r==="md"?"padding-right: 40px;":"padding-right: 44px;";let I=`width: 100%; ${y} ${x}`;c==="disabled"&&(I+="; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;"),u+=`<input type="password" class="${k.join(" ")}" style="${I}" placeholder="${i}" value="${p}"${E}${z}>`}else u+=`<input type="${l}" class="${k.join(" ")}" style="width: 100%; ${H} ${S}" placeholder="${i}" value="${p}"${E}${z}>`;if(P){const y=M.startsWith("fa-")?`far ${M}`:`far fa-${M}`;u+=`<i class="${y} ubits-input-icon-left" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`}if(T){const y=C.startsWith("fa-")?`far ${C}`:`far fa-${C}`;u+=`<i class="${y} ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`}u+="</div>",(d||g)&&(u+='<div class="ubits-input-helper">',d&&o&&(u+=`<span>${o}</span>`),g&&(u+=`<span class="ubits-input-counter">0/${s}</span>`),u+="</div>");const V=Object.entries($).map(([y,x])=>`${y}="${x}"`).join(" ");return V?`<div ${V}>${u}</div>`:u}function N(e){const{containerId:t,onChange:n,onFocus:i,onBlur:o,showCounter:r=!1,maxLength:c=50,type:l="text",selectOptions:f=[],autocompleteOptions:d=[],value:g=""}=e;if(!t)return console.error("UBITS Input: containerId es requerido"),null;const s=document.getElementById(t);if(!s)return console.error(`UBITS Input: No se encontró el contenedor con ID "${t}"`),null;const b=j(e);s.innerHTML=b;const h=s.querySelector('div[style*="position: relative"]'),a=s.querySelector(".ubits-input"),v=s.querySelector(".ubits-input-counter");if(!a||!h)return console.error("UBITS Input: No se pudo crear el elemento input"),null;if(getComputedStyle(s).position==="static"&&(s.style.position="relative"),l==="select"&&_(s,a,f,g,e.placeholder||"",n,e.size||"md"),l==="search"&&R(s,a,n),l==="autocomplete"&&U(s,a,d,n,e.size||"md"),l==="calendar"&&W(s,a,n),l==="password"&&B(s,a),r&&v&&Y(a,v,c),n&&typeof n=="function"){const p=l==="select"?"change":"input";a.addEventListener(p,w=>{n(w.target.value,w)})}return i&&typeof i=="function"&&a.addEventListener("focus",p=>{i(p.target.value,p)}),o&&typeof o=="function"&&a.addEventListener("blur",p=>{o(p.target.value,p)}),{element:h,inputElement:a,getValue:()=>a.value,setValue:p=>{a.value=p,r&&v&&O(v,p.length,c)},focus:()=>a.focus(),blur:()=>a.blur(),disable:()=>{a.disabled=!0,a.classList.add("ubits-input--disabled")},enable:()=>{a.disabled=!1,a.classList.remove("ubits-input--disabled")},setState:p=>{["ubits-input--hover","ubits-input--focus","ubits-input--active","ubits-input--invalid","ubits-input--disabled"].forEach($=>a.classList.remove($)),p!=="default"&&a.classList.add(`ubits-input--${p}`),p==="disabled"?a.disabled=!0:a.disabled=!1}}}function B(e,t){const n=e.querySelector('i[class*="fa-eye"]');if(n){let i=!1;n.style.pointerEvents="auto",n.style.cursor="pointer",n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),i=!i,i?(t.type="text",n.className="far fa-eye-slash ubits-input-icon-right"):(t.type="password",n.className="far fa-eye ubits-input-icon-right")})}}function R(e,t,n){const i=e.querySelector('i[class*="fa-times"]');if(i){i.style.display=t.value.length>0?"block":"none",i.style.pointerEvents="auto",i.style.cursor="pointer";const o=()=>{i.style.display=t.value.length>0?"block":"none"};t.addEventListener("input",o),i.addEventListener("click",r=>{r.preventDefault(),t.value="",t.focus(),o(),n&&n("")})}}function U(e,t,n,i,o="md"){const r=o==="xs"?"xs":o==="sm"?"sm":o==="md"?"md":"lg",c=e.querySelector('i[class*="fa-times"]');if(c){c.style.display=t.value.length>0?"block":"none",c.style.pointerEvents="auto",c.style.cursor="pointer";const d=()=>{c.style.display=t.value.length>0?"block":"none"};t.addEventListener("input",d),c.addEventListener("click",g=>{g.preventDefault(),t.value="",t.focus(),d();const s=e.querySelector(".ubits-autocomplete-list-container");s&&(s.style.display="none"),i&&i("")})}const l=document.createElement("div");l.className="ubits-autocomplete-list-container",l.style.cssText=`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `,e.appendChild(l);const f=(d=!1)=>{const g=t.value.toLowerCase();let s;if(d||g.length<1?s=n.slice(0,8):s=n.filter(a=>a.text.toLowerCase().includes(g)).slice(0,8),s.length===0){l.style.display="none";return}const b=s.map(a=>({label:a.text,state:"default",value:a.value,selected:!1})),h=`ubits-autocomplete-list-${e.id}`;l.id=h,l.innerHTML="";try{q({containerId:h,items:b,size:r,maxHeight:"200px",onSelectionChange:(a,v)=>{a&&a.value&&(t.value=a.label,l.style.display="none",c&&(c.style.display="block"),i&&i(a.value))}}),g.length>0&&l.querySelectorAll(".ubits-list-item").forEach(v=>{const p=v.textContent||"";if(p.toLowerCase().includes(g)){const w=new RegExp(`(${g})`,"gi"),$=p.replace(w,"<strong>$1</strong>");v.innerHTML=$}})}catch(a){console.warn("Using renderList fallback for autocomplete:",a);const v=A({items:b,size:r,maxHeight:"200px"});l.innerHTML=v,g.length>0&&l.querySelectorAll(".ubits-list-item").forEach($=>{const u=$.textContent||"";if(u.toLowerCase().includes(g)){const m=new RegExp(`(${g})`,"gi"),L=u.replace(m,"<strong>$1</strong>");$.innerHTML=L}}),l.querySelectorAll(".ubits-list-item").forEach((w,$)=>{const u=b[$];u&&u.state!=="disabled"&&w.addEventListener("click",()=>{t.value=u.label,l.style.display="none",c&&(c.style.display="block"),i&&i(u.value||"")})})}l.style.display="block"};t.addEventListener("focus",()=>{f(!0)}),t.addEventListener("input",()=>{f(!1)}),t.addEventListener("blur",()=>{setTimeout(()=>l.style.display="none",150)})}function _(e,t,n,i,o,r,c="md"){t.style.cursor="pointer";const l=c==="xs"?"xs":c==="sm"?"sm":c==="md"?"md":"lg",f=document.createElement("div");f.className="ubits-select-list-container",f.style.cssText=`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `,e.appendChild(f);const d=50;let g=0,s=[],b=!1;const h=(a=0)=>{b||(b=!0,setTimeout(()=>{const v=a*d,p=Math.min(v+d,n.length),$=n.slice(v,p).map(m=>({label:m.text,state:i===m.value?"active":"default",value:m.value,selected:i===m.value}));a===0?s=$:s=[...s,...$];const u=`ubits-select-list-${e.id}`;f.id=u,f.innerHTML="";try{q({containerId:u,items:s,size:l,maxHeight:"200px",onSelectionChange:(m,L)=>{m&&m.value&&(t.value=m.label,f.style.display="none",r&&r(m.value))}})}catch(m){console.warn("Using renderList fallback for select:",m);const L=A({items:s,size:l,maxHeight:"200px"});f.innerHTML=L,f.querySelectorAll(".ubits-list-item").forEach((T,M)=>{const P=s[M];P&&P.state!=="disabled"&&T.addEventListener("click",()=>{t.value=P.label,f.style.display="none",r&&r(P.value||"")})})}if(p<n.length){const m=f.querySelector(".ubits-list");if(m){const L=new IntersectionObserver(T=>{T[0].isIntersecting&&!b&&p<n.length&&(g++,h(g))},{root:m,rootMargin:"50px"}),C=f.querySelector(".ubits-list-item:last-child");C&&L.observe(C)}}b=!1},150))};t.addEventListener("click",()=>{f.style.display==="block"?f.style.display="none":(g=0,s=[],h(0),f.style.display="block")}),document.addEventListener("click",a=>{e.contains(a.target)||(f.style.display="none")})}function W(e,t,n){let i=null,o=null;const r=d=>{const g=String(d.getDate()).padStart(2,"0"),s=String(d.getMonth()+1).padStart(2,"0"),b=d.getFullYear();return`${g}/${s}/${b}`},c=d=>{if(!d)return null;const[g,s,b]=d.split("/");return!g||!s||!b?null:new Date(parseInt(b),parseInt(s)-1,parseInt(g))},l=async()=>{if(console.log("📅 [Calendar Picker] Mostrando calendario UBITS..."),t.type==="date"&&(console.warn('⚠️ [Calendar Picker] Input tiene type="date", cambiando a type="text"'),t.type="text",t.setAttribute("readonly","readonly")),o&&o.style.display!=="none"){console.log("📅 [Calendar Picker] Ocultando calendario..."),o.style.display="none";return}if(o||(console.log("📅 [Calendar Picker] Creando contenedor..."),o=document.createElement("div"),o.className="ubits-calendar-picker-container",o.style.cssText="position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px; display: none;",e.style.position="relative",e.appendChild(o)),i){console.log("📅 [Calendar Picker] Mostrando calendario existente..."),o.style.display="block";return}try{console.log("📅 [Calendar Picker] Cargando módulo CalendarProvider...");const d=await F(()=>import("./index-BovPifr4.js").then(h=>h.C),__vite__mapDeps([0,1]),import.meta.url),{createCalendar:g}=d;console.log("✅ [Calendar Picker] Módulo cargado correctamente");const s=t.value,b=c(s)||new Date;console.log("📅 [Calendar Picker] Fecha inicial:",b),console.log("📅 [Calendar Picker] Creando instancia del calendario..."),i=g({mode:"single",selectedDate:c(s),initialDate:b,onDateSelect:h=>{console.log("📅 [Calendar Picker] Fecha seleccionada:",h);const a=r(h);t.value=a,o&&(o.style.display="none"),n&&n(a)}}),o.appendChild(i.element),o.style.display="block",console.log("✅ [Calendar Picker] Calendario UBITS mostrado correctamente")}catch(d){console.error("❌ [Calendar Picker] Error cargando Calendar UBITS:",d),o&&(o.innerHTML='<div style="padding: 16px; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 8px; color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>',o.style.display="block")}};t.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),l()}),t.addEventListener("focus",d=>{d.preventDefault(),d.stopPropagation(),l()});const f=e.querySelector(".ubits-input-icon-right");f&&f.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),l()}),document.addEventListener("click",d=>{o&&!e.contains(d.target)&&(o.style.display="none")}),document.addEventListener("keydown",d=>{d.key==="Escape"&&o&&(o.style.display="none")})}function Y(e,t,n){const i=()=>{O(t,e.value.length,n),e.value.length>n&&(e.value=e.value.substring(0,n),O(t,n,n))};e.addEventListener("input",i),O(t,e.value.length,n)}function O(e,t,n){e.textContent=`${t}/${n}`,t>=n?e.classList.add("ubits-input-counter--limit"):e.classList.remove("ubits-input-counter--limit")}const Z={title:"Components/Input",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Input UBITS con soporte para múltiples tipos (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar), 4 tamaños (xs, sm, md, lg), 6 estados (default, hover, focus, active, invalid, disabled), iconos, helpers, contadores, y opciones mandatory/optional."}}},argTypes:{label:{control:{type:"text"},description:"Texto del label",table:{defaultValue:{summary:""}}},placeholder:{control:{type:"text"},description:"Texto del placeholder",table:{defaultValue:{summary:""}}},helperText:{control:{type:"text"},description:"Texto de ayuda (helper text)",table:{defaultValue:{summary:""}}},type:{control:{type:"select"},options:["text","email","password","number","tel","url","select","textarea","search","autocomplete","calendar"],description:"Tipo de input",table:{defaultValue:{summary:"text"},type:{summary:"text | email | password | number | tel | url | select | textarea | search | autocomplete | calendar"}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del input",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},state:{control:{type:"select"},options:["default","hover","focus","active","invalid","disabled"],description:"Estado del input",table:{defaultValue:{summary:"default"},type:{summary:"default | hover | focus | active | invalid | disabled"}}},showLabel:{control:{type:"boolean"},description:"Mostrar/ocultar label",table:{defaultValue:{summary:"true"}}},showHelper:{control:{type:"boolean"},description:"Mostrar/ocultar helper text",table:{defaultValue:{summary:"false"}}},showCounter:{control:{type:"boolean"},description:"Mostrar/ocultar contador de caracteres",table:{defaultValue:{summary:"false"}}},maxLength:{control:{type:"number"},description:"Máximo de caracteres para el contador",table:{defaultValue:{summary:"50"}}},mandatory:{control:{type:"boolean"},description:"Mostrar texto mandatory/optional",table:{defaultValue:{summary:"false"}}},mandatoryType:{control:{type:"select"},options:["obligatorio","opcional"],description:"Tipo de mandatory",table:{defaultValue:{summary:"obligatorio"},type:{summary:"obligatorio | opcional"}}},leftIcon:{control:{type:"text"},description:"Icono izquierdo (nombre FontAwesome sin prefijo, ej: user)",table:{defaultValue:{summary:""}}},rightIcon:{control:{type:"text"},description:"Icono derecho (nombre FontAwesome sin prefijo, ej: check)",table:{defaultValue:{summary:""}}},value:{control:{type:"text"},description:"Valor inicial del input",table:{defaultValue:{summary:""}}}}};function G(e=20){return Array.from({length:e},(t,n)=>({value:`opt-${n+1}`,text:`Opción ${n+1}`}))}function K(){return[{value:"apple",text:"Manzana"},{value:"banana",text:"Banana"},{value:"orange",text:"Naranja"},{value:"grape",text:"Uva"},{value:"strawberry",text:"Fresa"},{value:"watermelon",text:"Sandía"},{value:"pineapple",text:"Piña"},{value:"mango",text:"Mango"},{value:"kiwi",text:"Kiwi"},{value:"peach",text:"Durazno"},{value:"cherry",text:"Cereza"},{value:"blueberry",text:"Arándano"},{value:"papaya",text:"Papaya"},{value:"coconut",text:"Coco"},{value:"avocado",text:"Aguacate"}]}const D={args:{containerId:"input-storybook-container",label:"Label",placeholder:"Placeholder",helperText:"Helper text",type:"text",size:"md",state:"default",showLabel:!0,showHelper:!1,showCounter:!1,maxLength:50,mandatory:!1,mandatoryType:"obligatorio",leftIcon:"",rightIcon:"",value:""},render:e=>{const t=document.createElement("div");t.style.cssText="max-width: 600px; margin: 20px auto; padding: 20px;";const n=`input-storybook-${Math.random().toString(36).substr(2,9)}`,i={...e,containerId:n,selectOptions:e.type==="select"?G(20):void 0,autocompleteOptions:e.type==="autocomplete"?K():void 0};try{const o=document.createElement("div");o.id=n,t.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const c=document.getElementById(n);if(c)try{N(i)}catch(l){console.error("Error creating input:",l);const f=j(i);c.innerHTML=f}else console.error(`Container with ID "${n}" not found`)})});const r=document.createElement("div");r.style.cssText=`
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
      `,t.appendChild(r)}catch(o){console.error("Error rendering input:",o),t.innerHTML=`<div style="color: red; padding: 16px;">Error: ${o}</div>`}return t}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};const ee=["Default"];export{D as Default,ee as __namedExportsOrder,Z as default};
