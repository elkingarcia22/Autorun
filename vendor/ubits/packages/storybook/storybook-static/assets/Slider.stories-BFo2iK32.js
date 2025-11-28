import{c as Y}from"./InputProvider-schPVK84.js";import"./preload-helper-PPVm8Dsz.js";import"./ListProvider-Dp4g9_1Y.js";import"./iframe-EN31ESOT.js";import"./ModalProvider-Cwkz7B9R.js";function ne(o){const{containerId:h,label:S="",helperText:b="",size:d="md",state:f="default",orientation:m="horizontal",mode:z="single",min:l=0,max:v=100,step:B=1,value:O=50,values:$=[25,75],showInputs:D=!1,showLabel:W=!0,showHelper:U=!1,showMarks:g=!1,marks:G=[],showRangeGuide:E=!1,className:L="",attributes:C={}}=o,P=D||E,u=f==="disabled",V=m==="vertical",x=z==="range",k=x?$[0]:O;x&&$[1];const M=["ubits-slider"];V&&M.push("ubits-slider--vertical"),d&&M.push(`ubits-slider--${d}`),u&&M.push("ubits-slider--disabled"),L&&M.push(L);let i=`<div class="${M.join(" ")}" id="${h}">`;if(W&&S&&(i+=`<label class="ubits-slider-label">${S}</label>`),i+='<div class="ubits-slider-main-wrapper">',P&&x&&(i+=`<div class="ubits-slider-input" id="${h}-input-min"></div>`),i+='<div class="ubits-slider-wrapper">',i+='<div class="ubits-slider-track-container" style="position: relative; flex: 1;">',i+='<div class="ubits-slider-track">',x){const p=($[0]-l)/(v-l)*100,s=($[1]-l)/(v-l)*100-p;V?i+=`<div class="ubits-slider-track-range" style="bottom: ${p}%; height: ${s}%;"></div>`:i+=`<div class="ubits-slider-track-range" style="left: ${p}%; width: ${s}%;"></div>`}else{const p=(k-l)/(v-l)*100;V?i+=`<div class="ubits-slider-track-fill" style="height: ${p}%; bottom: 0;"></div>`:i+=`<div class="ubits-slider-track-fill" style="width: ${p}%;"></div>`}if(g&&G.length>0&&(i+='<div class="ubits-slider-marks">',G.forEach(p=>{const w=(p-l)/(v-l)*100;V?i+=`<div class="ubits-slider-mark" style="top: ${100-w}%; left: 50%;"></div>`:i+=`<div class="ubits-slider-mark" style="left: ${w}%; top: 50%;"></div>`}),i+="</div>"),x){const p=($[0]-l)/(v-l)*100,w=($[1]-l)/(v-l)*100;V?(i+=`<div class="ubits-slider-thumb ubits-slider-thumb--min" style="top: ${100-p}%; left: 50%;" data-value="${$[0]}" tabindex="0" ${u?"disabled":""}></div>`,i+=`<div class="ubits-slider-thumb ubits-slider-thumb--max" style="top: ${100-w}%; left: 50%;" data-value="${$[1]}" tabindex="0" ${u?"disabled":""}></div>`):(i+=`<div class="ubits-slider-thumb ubits-slider-thumb--min" style="left: ${p}%; top: 50%;" data-value="${$[0]}" tabindex="0" ${u?"disabled":""}></div>`,i+=`<div class="ubits-slider-thumb ubits-slider-thumb--max" style="left: ${w}%; top: 50%;" data-value="${$[1]}" tabindex="0" ${u?"disabled":""}></div>`)}else{const p=(k-l)/(v-l)*100;V?i+=`<div class="ubits-slider-thumb" style="top: ${100-p}%; left: 50%;" data-value="${k}" tabindex="0" ${u?"disabled":""}></div>`:i+=`<div class="ubits-slider-thumb" style="left: ${p}%; top: 50%;" data-value="${k}" tabindex="0" ${u?"disabled":""}></div>`}if(i+="</div>",i+="</div>",i+="</div>",P&&(x?i+=`<div class="ubits-slider-input" id="${h}-input-max"></div>`:i+=`<div class="ubits-slider-input" id="${h}-input-value"></div>`),i+="</div>",!V){if(i+='<div class="ubits-slider-range-guide-wrapper">',i+=`<div class="ubits-slider-range-guide" id="${h}-range-guide">`,E){const p=v-l;let s=Math.ceil(p/10);const I=Math.pow(10,Math.floor(Math.log10(s))),T=s/I;let R=I;T<=1?R=I:T<=2?R=2*I:T<=5?R=5*I:R=10*I;let H=l;for(;H<=v;){const X=(H-l)/(v-l)*100;i+=`<span class="ubits-slider-range-guide-value" style="left: ${X}%">${Math.round(H)}</span>`,H+=R}}else{i+=`<span class="ubits-slider-range-guide-value ubits-slider-range-guide-value--bold" style="left: 0%">${l}</span>`;const p=x?$[1]:O;i+=`<span class="ubits-slider-range-guide-value ubits-slider-range-guide-value--bold" id="${h}-range-guide-current" style="left: 100%">${p}</span>`}i+="</div>",i+="</div>"}U&&b&&(i+='<div class="ubits-input-helper">',i+=`<span>${b}</span>`,i+="</div>"),i+="</div>";const J=Object.entries(C).map(([p,w])=>`${p}="${w}"`).join(" ");return J?`<div ${J}>${i}</div>`:i}function _(o){const{containerId:h,onChange:S,onRangeChange:b,min:d=0,max:f=100,step:m=1,mode:z="single",value:l=50,values:v=[25,75],orientation:B="horizontal",showInputs:O=!1,state:$="default",size:D="md",showRangeGuide:W=!1}=o,U=O||W;if(!h)return console.error("UBITS Slider: containerId es requerido"),null;const g=document.getElementById(h);if(!g)return console.error(`UBITS Slider: No se encontró el contenedor con ID "${h}"`),null;const G=ne(o);g.innerHTML=G;const E=g.querySelector(`#${h}`)||g.querySelector(".ubits-slider");if(!E)return console.error("UBITS Slider: No se encontró el elemento slider"),null;const L=g.querySelector(".ubits-slider-track"),C=g.querySelectorAll(".ubits-slider-thumb"),P=g.querySelector(`#${h}-value-display`),u=z==="range",V=B==="vertical",x=$==="disabled";let k=null,M=null,i=null;const J=()=>{if(U){if(u){const t=`${h}-input-min`;let e=E.querySelector(`#${t}`);if(e||(e=g.querySelector(`#${t}`)),e||(e=document.getElementById(t)),e){e.style.width="100px",e.style.minWidth="80px",e.style.maxWidth="100px",e.style.flexShrink="0";try{k=Y({containerId:t,type:"number",size:D,state:x?"disabled":"default",value:v[0].toString(),showLabel:!1,showHelper:!1});const a=e.querySelector("input");if(a&&(a.setAttribute("data-slider-input","min"),a.setAttribute("min",d.toString()),a.setAttribute("max",f.toString()),a.setAttribute("step",m.toString())),k){const c=e.querySelector('div[style*="position: relative"]');c&&(c.style.width="100%",c.style.maxWidth="100%")}}catch(a){console.warn("Error creating min input:",a)}}else console.error("UBITS Slider: No se encontró el contenedor del input min:",t);const n=`${h}-input-max`;let r=E.querySelector(`#${n}`);if(r||(r=g.querySelector(`#${n}`)),r||(r=document.getElementById(n)),r){r.style.width="100px",r.style.minWidth="80px",r.style.maxWidth="100px",r.style.flexShrink="0";try{M=Y({containerId:n,type:"number",size:D,state:x?"disabled":"default",value:v[1].toString(),showLabel:!1,showHelper:!1});const a=r.querySelector("input");if(a&&(a.setAttribute("data-slider-input","max"),a.setAttribute("min",d.toString()),a.setAttribute("max",f.toString()),a.setAttribute("step",m.toString())),M){const c=r.querySelector('div[style*="position: relative"]');c&&(c.style.width="100%",c.style.maxWidth="100%")}}catch(a){console.warn("Error creating max input:",a)}}else console.error("UBITS Slider: No se encontró el contenedor del input max:",n)}else{const t=`${h}-input-value`;let e=E.querySelector(`#${t}`);if(e||(e=g.querySelector(`#${t}`)),e||(e=document.getElementById(t)),e){e.style.width="100px",e.style.minWidth="80px",e.style.maxWidth="100px",e.style.flexShrink="0";try{i=Y({containerId:t,type:"number",size:D,state:x?"disabled":"default",value:l.toString(),showLabel:!1,showHelper:!1});const n=e.querySelector("input");if(n&&(n.setAttribute("data-slider-input","value"),n.setAttribute("min",d.toString()),n.setAttribute("max",f.toString()),n.setAttribute("step",m.toString())),i){const r=e.querySelector('div[style*="position: relative"]');r&&(r.style.width="100%",r.style.maxWidth="100%")}}catch(n){console.warn("Error creating value input:",n)}}else console.error("UBITS Slider: No se encontró el contenedor del input value:",t)}w=p(),ae()}},p=()=>g.querySelectorAll("input[data-slider-input]");let w=p();if(U&&requestAnimationFrame(()=>{requestAnimationFrame(()=>{J()})}),!E||!L||C.length===0)return console.error("UBITS Slider: No se pudo crear el elemento slider"),null;let s=u?[...v]:l,I=!1,T=null;const R=(t,e)=>{const n=L.getBoundingClientRect();let r;V?r=1-(e-n.top)/n.height:r=(t-n.left)/n.width,r=Math.max(0,Math.min(1,r));const a=d+r*(f-d),c=Math.round(a/m)*m;return Math.max(d,Math.min(f,c))},H=(t,e)=>{const n=(e-d)/(f-d)*100;V?(t.style.top=`${100-n}%`,t.style.left="50%"):(t.style.left=`${n}%`,t.style.top="50%"),t.setAttribute("data-value",e.toString())},X=()=>{const t=g.querySelector(".ubits-slider-track-fill"),e=g.querySelector(".ubits-slider-track-range");if(u){if(e){const n=s[0],r=s[1],a=(n-d)/(f-d)*100,c=(r-d)/(f-d)*100;if(V){const y=L.getBoundingClientRect(),A=g.querySelectorAll(".ubits-slider-thumb");if(A.length>=2&&y.height>0){const N=Array.from(A).find(j=>j.classList.contains("ubits-slider-thumb--min")),Z=Array.from(A).find(j=>j.classList.contains("ubits-slider-thumb--max"));if(N&&Z){const j=N.getBoundingClientRect();Z.getBoundingClientRect();const ee=j.height/y.height*100,te=Math.max(0,a-ee/2),le=Math.max(0,c-ee/2)-te;e.style.bottom=`${te}%`,e.style.height=`${le}%`}else e.style.bottom=`${a}%`,e.style.height=`${c-a}%`}else e.style.bottom=`${a}%`,e.style.height=`${c-a}%`}else{const y=c-a;e.style.left=`${a}%`,e.style.width=`${y}%`}}}else if(t){const n=(s-d)/(f-d)*100;if(V){const r=L.getBoundingClientRect(),a=g.querySelector(".ubits-slider-thumb");if(a&&r.height>0){const y=a.getBoundingClientRect().height/r.height*100,A=Math.max(0,n-y/2);t.style.height=`${A}%`,t.style.bottom="0"}else t.style.height=`${n}%`,t.style.bottom="0"}else t.style.width=`${n}%`}},se=()=>{if(w=p(),w.forEach(e=>{const n=e.getAttribute("data-slider-input");n==="value"&&!u?e.value=s.toString():n==="min"&&u?e.value=s[0].toString():n==="max"&&u&&(e.value=s[1].toString())}),i&&!u&&i.setValue(s.toString()),k&&u&&k.setValue(s[0].toString()),M&&u&&M.setValue(s[1].toString()),P)if(u){const[e,n]=s;P.textContent=`${e} - ${n}`}else P.textContent=s.toString();const t=g.querySelector(`#${h}-range-guide-current`);if(t&&!W)if(u){const e=s[1];t.textContent=e.toString()}else t.textContent=s.toString()},q=()=>{if(u){const[t,e]=s,n=g.querySelector(".ubits-slider-thumb--min"),r=g.querySelector(".ubits-slider-thumb--max");n&&H(n,t),r&&H(r,e)}else{const t=C[0];t&&H(t,s)}X(),se()},re=(t,e)=>{x||(t.preventDefault(),I=!0,T=e,e.style.cursor="grabbing")},K=t=>{if(!I||!T||x)return;t.preventDefault();const e=R(t.clientX,t.clientY);if(u){const[n,r]=s;if(T.classList.contains("ubits-slider-thumb--min"))s=[Math.min(e,r-m),r];else{const c=Math.max(e,n+m);s=[n,c]}b&&b(s,t)}else s=e,S&&S(e,t);q()},Q=()=>{T&&(T.style.cursor="grab"),I=!1,T=null},ie=t=>{if(x||I)return;const e=R(t.clientX,t.clientY);if(u){const[n,r]=s,a=Math.abs(e-n),c=Math.abs(e-r);if(a<c)s=[Math.min(e,r-m),r],b&&b(s,t);else{const y=Math.max(e,n+m);s=[n,y],b&&b(s,t)}}else s=e,S&&S(e,t);q()};C.length===0?console.error("UBITS Slider: No se encontraron thumbs para agregar event listeners"):C.forEach(t=>{t.addEventListener("mousedown",e=>re(e,t)),t.addEventListener("touchstart",e=>{x||(e.preventDefault(),I=!0,T=t)},{passive:!1})}),L?L.addEventListener("click",ie):console.error("UBITS Slider: No se encontró el track para agregar event listener"),document.addEventListener("mousemove",K),document.addEventListener("mouseup",Q),document.addEventListener("touchmove",t=>{if(!I||!T||x)return;t.preventDefault();const e=t.touches[0];e&&K(new MouseEvent("mousemove",{clientX:e.clientX,clientY:e.clientY}))},{passive:!1}),document.addEventListener("touchend",Q);const ae=()=>{w=p(),w.forEach(t=>{const e=t.cloneNode(!0);t.parentNode?.replaceChild(e,t),e.addEventListener("input",n=>{if(x)return;const r=parseFloat(e.value);if(isNaN(r))return;const a=Math.max(d,Math.min(f,r)),c=e.getAttribute("data-slider-input");if(u){const[y,A]=s;if(c==="min")s=[Math.min(a,A-m),A],b&&b(s,n);else if(c==="max"){const N=Math.max(a,y+m);s=[y,N],b&&b(s,n)}}else s=a,S&&S(a,n);q()}),e.addEventListener("blur",n=>{const r=parseFloat(e.value);if(isNaN(r)){q();return}const a=Math.max(d,Math.min(f,r)),c=e.getAttribute("data-slider-input");if(u){const[y,A]=s;if(c==="min")s=[Math.min(a,A-m),A];else if(c==="max"){const N=Math.max(a,y+m);s=[y,N]}}else s=a;q()})})};return C.forEach(t=>{t.addEventListener("keydown",e=>{if(x)return;let n;if(u){const[r,a]=s,c=t.classList.contains("ubits-slider-thumb--min"),y=c?r:a;switch(e.key){case"ArrowRight":case"ArrowUp":n=Math.min(y+m,f);break;case"ArrowLeft":case"ArrowDown":n=Math.max(y-m,d);break;case"Home":n=c?d:r;break;case"End":n=c?a:f;break;default:return}c?s=[Math.min(n,a-m),a]:s=[r,Math.max(n,r+m)],b&&b(s,e)}else{const r=s;switch(e.key){case"ArrowRight":case"ArrowUp":n=Math.min(r+m,f);break;case"ArrowLeft":case"ArrowDown":n=Math.max(r-m,d);break;case"Home":n=d;break;case"End":n=f;break;default:return}s=n,S&&S(n,e)}e.preventDefault(),q()})}),q(),{element:E,getValue:()=>s,setValue:t=>{if(u&&Array.isArray(t)){const[e,n]=t;e>=d&&e<=f&&n>=d&&n<=f&&e<=n&&(s=[e,n],q())}else!u&&typeof t=="number"&&t>=d&&t<=f&&(s=t,q())},disable:()=>{E.classList.add("ubits-slider--disabled"),C.forEach(t=>{t.classList.add("ubits-slider-thumb--disabled"),t.setAttribute("disabled","")}),w.forEach(t=>{t.disabled=!0}),k&&k.disable(),M&&M.disable(),i&&i.disable()},enable:()=>{E.classList.remove("ubits-slider--disabled"),C.forEach(t=>{t.classList.remove("ubits-slider-thumb--disabled"),t.removeAttribute("disabled")}),w.forEach(t=>{t.disabled=!1}),k&&k.enable(),M&&M.enable(),i&&i.enable()},setState:t=>{if(t==="disabled"){const e=_({...o,state:"disabled"});e&&e.disable()}else{const e=_({...o,state:"default"});e&&e.enable()}}}}const fe={title:"Formularios/Slider",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Componente Slider UBITS con soporte para orientación horizontal/vertical, modo single/range, inputs opcionales, marcas, y todos los tamaños y estados."}}},argTypes:{label:{control:{type:"text"},description:"Texto del label",table:{defaultValue:{summary:""}}},helperText:{control:{type:"text"},description:"Texto de ayuda (helper text)",table:{defaultValue:{summary:""}}},size:{control:{type:"select"},options:["xs","sm","md","lg"],description:"Tamaño del slider",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg"}}},state:{control:{type:"select"},options:["default","disabled"],description:"Estado del slider",table:{defaultValue:{summary:"default"},type:{summary:"default | disabled"}}},orientation:{control:{type:"select"},options:["horizontal","vertical"],description:"Orientación del slider",table:{defaultValue:{summary:"horizontal"},type:{summary:"horizontal | vertical"}}},mode:{control:{type:"select"},options:["single","range"],description:"Modo del slider: single (un valor) o range (dos valores)",table:{defaultValue:{summary:"single"},type:{summary:"single | range"}}},min:{control:{type:"number"},description:"Valor mínimo",table:{defaultValue:{summary:"0"}}},max:{control:{type:"number"},description:"Valor máximo",table:{defaultValue:{summary:"100"}}},step:{control:{type:"number",min:.1,step:.1},description:"Paso (step) del slider",table:{defaultValue:{summary:"1"}}},value:{control:{type:"number"},description:"Valor inicial (para modo single)",table:{defaultValue:{summary:"50"}},if:{arg:"mode",eq:"single"}},valuesString:{control:{type:"text"},description:"Valores iniciales como JSON array [min, max] (para modo range)",table:{defaultValue:{summary:"[25, 75]"}},if:{arg:"mode",eq:"range"}},showInputs:{control:{type:"boolean"},description:"Mostrar inputs numéricos",table:{defaultValue:{summary:"false"}}},showLabel:{control:{type:"boolean"},description:"Mostrar/ocultar label",table:{defaultValue:{summary:"true"}}},showHelper:{control:{type:"boolean"},description:"Mostrar/ocultar helper text",table:{defaultValue:{summary:"false"}}},showMarks:{control:{type:"boolean"},description:"Mostrar marcas/ticks en el slider",table:{defaultValue:{summary:"false"}}},marksString:{control:{type:"text"},description:"Valores donde mostrar marcas como JSON array (ej: [0, 25, 50, 75, 100])",table:{defaultValue:{summary:"[]"}},if:{arg:"showMarks",eq:!0}},showRangeGuide:{control:{type:"boolean"},description:"Mostrar guía visual del rango debajo del slider (ej: 0 - 100)",table:{defaultValue:{summary:"false"}}}}},F={args:{containerId:"slider-storybook-container",label:"Volumen",helperText:"Ajusta el volumen del reproductor",size:"md",state:"default",orientation:"horizontal",mode:"single",min:0,max:100,step:1,value:50,valuesString:"[25, 75]",showInputs:!1,showLabel:!0,showHelper:!1,showMarks:!1,marksString:"[0, 25, 50, 75, 100]",showRangeGuide:!1},render:o=>{const h=document.createElement("div");h.style.cssText=`
      max-width: ${o.orientation==="vertical"?"200px":"800px"};
      margin: 20px auto;
      padding: 20px;
      min-height: ${o.orientation==="vertical"?"400px":"auto"};
    `;const S=`slider-storybook-${Math.random().toString(36).substr(2,9)}`;let b;if(o.mode==="range")try{const l=JSON.parse(o.valuesString||"[25, 75]");Array.isArray(l)&&l.length===2?b=[l[0],l[1]]:b=[25,75]}catch{b=[25,75]}let d;if(o.showMarks&&o.marksString)try{d=JSON.parse(o.marksString),Array.isArray(d)||(d=[])}catch{d=[]}const f={containerId:S,label:o.label,helperText:o.helperText,size:o.size,state:o.state,orientation:o.orientation,mode:o.mode,min:o.min,max:o.max,step:o.step,value:o.mode==="single"?o.value:void 0,values:o.mode==="range"?b:void 0,showInputs:o.showInputs,showLabel:o.showLabel,showHelper:o.showHelper,showMarks:o.showMarks,marks:d,showRangeGuide:o.showRangeGuide,onChange:l=>{},onRangeChange:l=>{}},m=document.createElement("div");m.id=S,o.orientation==="vertical"?m.style.cssText=`
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      `:m.style.cssText=`
        width: 100%;
        margin-bottom: 20px;
      `,h.appendChild(m);const z=()=>{const l=document.getElementById(S);if(!l){console.error(`Container with ID "${S}" not found`);return}l.innerHTML="";try{const v=_(f);v&&(l.sliderInstance=v)}catch(v){console.error("Error creating slider:",v);try{const B=ne(f);l.innerHTML=B}catch(B){console.error("Error rendering slider:",B),l.innerHTML=`<div style="color: red; padding: 16px;">Error: ${B}</div>`}}};return requestAnimationFrame(()=>{requestAnimationFrame(()=>{z()})}),h.updateSlider=z,h}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    containerId: 'slider-storybook-container',
    label: 'Volumen',
    helperText: 'Ajusta el volumen del reproductor',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    valuesString: '[25, 75]',
    showInputs: false,
    showLabel: true,
    showHelper: false,
    showMarks: false,
    marksString: '[0, 25, 50, 75, 100]',
    showRangeGuide: false
  },
  render: args => {
    // Crear contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      max-width: \${args.orientation === 'vertical' ? '200px' : '800px'};
      margin: 20px auto;
      padding: 20px;
      min-height: \${args.orientation === 'vertical' ? '400px' : 'auto'};
    \`;

    // Generar un ID único para el contenedor del slider
    const containerId = \`slider-storybook-\${Math.random().toString(36).substr(2, 9)}\`;

    // Parsear valuesString si es range mode
    let values: [number, number] | undefined;
    if (args.mode === 'range') {
      try {
        const parsed = JSON.parse(args.valuesString || '[25, 75]');
        if (Array.isArray(parsed) && parsed.length === 2) {
          values = [parsed[0], parsed[1]];
        } else {
          values = [25, 75];
        }
      } catch (e) {
        values = [25, 75];
      }
    }

    // Parsear marksString si showMarks es true
    let marks: number[] | undefined;
    if (args.showMarks && args.marksString) {
      try {
        marks = JSON.parse(args.marksString);
        if (!Array.isArray(marks)) {
          marks = [];
        }
      } catch (e) {
        marks = [];
      }
    }

    // Preparar opciones del slider
    const sliderOptions: SliderOptions = {
      containerId,
      label: args.label,
      helperText: args.helperText,
      size: args.size,
      state: args.state,
      orientation: args.orientation,
      mode: args.mode,
      min: args.min,
      max: args.max,
      step: args.step,
      value: args.mode === 'single' ? args.value : undefined,
      values: args.mode === 'range' ? values : undefined,
      showInputs: args.showInputs,
      showLabel: args.showLabel,
      showHelper: args.showHelper,
      showMarks: args.showMarks,
      marks: marks,
      showRangeGuide: args.showRangeGuide,
      onChange: value => {
        // Callback cuando cambia el valor (modo single)
      },
      onRangeChange: values => {
        // Callback cuando cambian los valores (modo range)
      }
    };

    // Crear contenedor interno para el slider
    const sliderContainer = document.createElement('div');
    sliderContainer.id = containerId;

    // Ajustar estilos según orientación
    if (args.orientation === 'vertical') {
      sliderContainer.style.cssText = \`
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      \`;
    } else {
      sliderContainer.style.cssText = \`
        width: 100%;
        margin-bottom: 20px;
      \`;
    }
    wrapper.appendChild(sliderContainer);

    // Función para crear/actualizar el slider
    const createSliderInstance = () => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(\`Container with ID "\${containerId}" not found\`);
        return;
      }

      // Limpiar contenedor antes de crear nuevo slider
      container.innerHTML = '';
      try {
        // Crear el slider
        const sliderInstance = createSlider(sliderOptions);
        if (sliderInstance) {
          // Guardar referencia para poder actualizar valores si es necesario
          (container as any).sliderInstance = sliderInstance;
        }
      } catch (err) {
        console.error('Error creating slider:', err);
        // Fallback: usar renderSlider si createSlider falla
        try {
          const sliderHTML = renderSlider(sliderOptions);
          container.innerHTML = sliderHTML;
        } catch (renderErr) {
          console.error('Error rendering slider:', renderErr);
          container.innerHTML = \`<div style="color: red; padding: 16px;">Error: \${renderErr}</div>\`;
        }
      }
    };

    // Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        createSliderInstance();
      });
    });

    // Retornar wrapper con método para actualizar cuando cambien los args
    (wrapper as any).updateSlider = createSliderInstance;
    return wrapper;
  }
}`,...F.parameters?.docs?.source},description:{story:"Story única con todos los controles",...F.parameters?.docs?.description}}};const he=["Default"];export{F as Default,he as __namedExportsOrder,fe as default};
