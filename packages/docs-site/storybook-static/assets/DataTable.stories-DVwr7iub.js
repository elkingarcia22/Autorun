const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BovPifr4.js","./preload-helper-PPVm8Dsz.js"])))=>i.map(i=>d[i]);
import{_ as Le}from"./preload-helper-PPVm8Dsz.js";import{r as xe}from"./CheckboxProvider-DIr0OIhT.js";import{r as Ie}from"./ProgressProvider-OoWtyPYr.js";import{r as Me}from"./StatusTagProvider-BsgFC12L.js";import{r as ue}from"./AvatarProvider-CF4x-oFR.js";import{r as Re}from"./ToggleProvider-tayloMCw.js";import{r as je}from"./RadioButtonProvider-CIXtywXC.js";import{r as Ee}from"./ButtonProvider-CWHxZvq1.js";import{c as Se,r as _e}from"./ListProvider-DvH0c9YJ.js";import{createScrollbar as ke}from"./ScrollProvider-BVL7eCy8.js";import{r as Ue}from"./PaginationProvider-Baho4EoP.js";import"./iframe-BfFsla13.js";import"./SpinnerProvider-o6XHV06V.js";function De(e,x,z){const y=x.data[e.id],h=x.data;switch(z){case"nombre":{const b=y||h.nombre||h.name||"";return e.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${b}</span>`:`<span class="ubits-body-md-regular">${b}</span>`}case"progreso":{let b=null;if(y!=null){if(typeof y=="number")b=y;else if(typeof y=="string"){const w=parseFloat(y.replace("%","").trim());isNaN(w)||(b=w)}}if(b===null&&h){const w=h.progress!==void 0?h.progress:h.progreso;if(w!=null){if(typeof w=="number")b=w;else if(typeof w=="string"){const d=parseFloat(w.replace("%","").trim());isNaN(d)||(b=d)}}}return b===null&&(b=50),b=Math.max(0,Math.min(100,b)),Ie({value:b,size:"sm",variant:"default",indicator:`${Math.round(b)}%`})}case"nombre-avatar":{const b=y||h.nombre||h.name||"",p=h.avatar||h.avatarUrl||null;console.log("🖼️ [AVATAR] Renderizando nombre-avatar:",{columnId:e.id,rowId:x.id,nombre:b,avatar:p,cellData:h,hasAvatar:!!p,avatarType:typeof p});const w=e.avatarVariant||"initials",d=E=>E.split(" ").map(Z=>Z[0]).join("").toUpperCase().slice(0,2)||"U";let i="";if(w==="photo"){let E=null;p&&typeof p=="string"?E=p:p&&typeof p=="object"&&(E=p.imageUrl||p.url||null),!E&&h&&(E=h.imageUrl||h.avatarUrl||h.avatarImage||null),E?i=ue({imageUrl:E,size:"sm"}):i=ue({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(w==="initials"){if(p&&typeof p=="object"&&p.initials)console.log("🖼️ [AVATAR] Usando initials del objeto avatar:",p.initials),i=ue({initials:p.initials,size:"sm"});else{const E=d(b);console.log("🖼️ [AVATAR] Generando initials del nombre:",b,"->",E),i=ue({initials:E,size:"sm"})}console.log("🖼️ [AVATAR] HTML generado (initials):",i?i.substring(0,100):"VACÍO")}else{const E=p&&typeof p=="object"&&p.icon?p.icon:"user";console.log("🖼️ [AVATAR] Usando icon:",E),i=ue({icon:E,size:"sm"}),console.log("🖼️ [AVATAR] HTML generado (icon):",i?i.substring(0,100):"VACÍO")}const j=e.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${b}</span>`:`<span class="ubits-body-md-regular">${b}</span>`,P=`
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${i}
          ${j}
        </div>
      `;return console.log("🖼️ [AVATAR] HTML final:",P.substring(0,200)),P}case"nombre-avatar-texto":{const b=y||h.nombre||h.name||"",p=h.avatar||h.avatarUrl||null,w=h.area||h.areaNombre||h.textoComplementario||h.complementario||"",d=e.avatarVariant||"initials",i=P=>P.split(" ").map(E=>E[0]).join("").toUpperCase().slice(0,2)||"U";let S="";if(d==="photo"){let P=null;p&&typeof p=="string"?P=p:p&&typeof p=="object"&&(P=p.imageUrl||p.url||null),!P&&h&&(P=h.imageUrl||h.avatarUrl||h.avatarImage||null),P?S=ue({imageUrl:P,size:"sm"}):S=ue({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(d==="initials")if(p&&typeof p=="object"&&p.initials)S=ue({initials:p.initials,size:"sm"});else{const P=i(b);S=ue({initials:P,size:"sm"})}else{const P=p&&typeof p=="object"&&p.icon?p.icon:"user";S=ue({icon:P,size:"sm"})}const j=`<span class="ubits-body-md-regular">${b}</span>`;return`
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm, 12px);">
          ${S}
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${j}
            ${w?`<span class="ubits-body-sm-regular" style="color: var(--ubits-fg-1-medium);">${w}</span>`:""}
          </div>
        </div>
      `}case"estado":{const b={activo:"active",inactivo:"disabled",pendiente:"pending",completado:"completed",publicado:"published",cumplido:"fulfilled",creado:"created",error:"not-fulfilled",denegado:"denied",borrador:"draft","en-progreso":"in-progress",sincronizando:"syncing","pendiente-aprobacion":"pending-approval","no-iniciado":"not-started",finalizado:"finished",archivado:"archived",deshabilitado:"disabled",pausado:"paused",oculto:"hidden",cancelado:"denied"},p=y||h.estado||h.status||"pendiente",w=String(p).toLowerCase().trim(),d=b[w]||b.pendiente,S={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"}[d]||String(p),j=e.editable,P=Me({label:S,status:d,size:"xs",rightIcon:j?"chevron-down":null,clickable:j});return j?`
          <div class="ubits-data-table__status-editable" data-row-id="${x.id}" data-column-id="${e.id}" data-editable="true" data-current-status="${d}">
            ${P}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${x.id}-${e.id}" style="display: none;"></div>
          </div>
        `:P}case"radio":{const b=y===!0||y==="true"||y===1||y===x.id||y===String(x.id),p=e.radioLabel!==!1&&e.radioLabel!==void 0,w=typeof e.radioLabel=="string"?e.radioLabel:p?String(x.data[e.id]||x.id):"",d=e.editable===!0,i=!d;return je({label:w,name:`radio-${e.id}`,value:String(x.id),checked:b,size:"md",disabled:i}).replace("<input",`<input data-row-id="${x.id}" data-column-id="${e.id}" data-radio-button="true" ${d?'data-editable="true"':""}`)}case"toggle":{const b=y===!0||y==="true"||y===1,p=e.toggleLabel!==!1&&e.toggleLabel!==void 0,w=typeof e.toggleLabel=="string"?e.toggleLabel:p?String(x.data[e.id]||x.id):"";return Re({label:w,checked:b,size:"md"}).replace("<input",`<input data-row-id="${x.id}" data-column-id="${e.id}" data-toggle-button="true"`)}case"checkbox":{const b=y===!0||y==="true"||y===1,p=e.checkboxLabel!==!1&&e.checkboxLabel!==void 0,w=typeof e.checkboxLabel=="string"?e.checkboxLabel:p?String(x.data[e.id]||x.id):"",d=e.editable===!0;return xe({label:w,checked:b,size:"md",disabled:!d}).replace("<input",`<input data-row-id="${x.id}" data-column-id="${e.id}" data-checkbox-button="true" ${d?'data-editable="true"':""}`)}case"correo":{const b=y||"";return e.emailClickable!==!1?`<a href="mailto:${b}" class="ubits-body-md-regular" style="color: var(--ubits-accent-brand-static-inverted); text-decoration: none;">${b}</a>`:`<span class="ubits-body-md-regular">${b}</span>`}case"acciones":return Ee({text:"Eliminar",variant:"tertiary",size:"sm",icon:"trash",iconStyle:"regular",className:"ubits-data-table__action-button"});case"fecha":{const b=y||"";return e.editable===!0?`
            <div class="ubits-data-table__date-editable" data-row-id="${x.id}" data-column-id="${e.id}">
              <span class="ubits-body-md-regular ubits-data-table__date-display">${b||"Seleccionar fecha"}</span>
            </div>
          `:`<span class="ubits-body-md-regular">${b}</span>`}case"area":return`<span class="ubits-body-md-regular">${y||"Desarrollo"}</span>`;case"lider":return`<span class="ubits-body-md-regular">${y||"Juan Pérez"}</span>`;case"pais":return`<span class="ubits-body-md-regular">${y||"Colombia"}</span>`;case"ciudad":return`<span class="ubits-body-md-regular">${y||"Bogotá"}</span>`;case"drag-handle":return`
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${x.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;case"expand":{const b=x.expanded||!1;return`
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${b?"Colapsar":"Expandir"} fila"
          data-row-id="${x.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${b?"down":"right"}" aria-hidden="true"></i>
        </button>
      `}default:return`<span class="ubits-body-md-regular">${y||""}</span>`}}function ze(e,x,z=0){if(e.type!=="checkbox"&&(e.id==="checkbox"||e.id.startsWith("checkbox-"))){const w=x.data[e.id]||!1,i=xe({label:"",checked:w,size:"md",className:"ubits-data-table__cell-checkbox"}).replace("<input",`<input data-row-id="${x.id}" data-column-id="${e.id}" aria-label="Checkbox ${e.title}"`),S=e.id==="checkbox-2"?"12px":"var(--ubits-spacing-md, 16px)",j=e.pinned?" ubits-data-table__cell--pinned":"",P=e.pinned?`position: sticky !important; left: ${z}px !important; z-index: 12 !important;`:"",Z=`${`text-align: center; vertical-align: middle; padding-left: ${S} !important;`}${P?" "+P:""}`;return`
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${j}" data-column-id="${e.id}" ${e.pinned?'data-pinned="true"':""} style="${Z}">
        ${i}
      </td>
    `}if(e.type){const w=De(e,x,e.type),d=e.editable&&(e.type==="nombre"||e.type==="nombre-avatar"||e.type==="estado"||e.type==="fecha"||e.type==="checkbox"||e.type==="radio")&&e.type!=="drag-handle"&&e.type!=="expand",i=e.type==="drag-handle"?"ubits-data-table__cell--drag-handle":e.type==="expand"?"ubits-data-table__cell--expand":`ubits-data-table__cell--${e.type}`,S=d?"ubits-data-table__cell--editable":"",j=e.pinned?" ubits-data-table__cell--pinned":"",P=e.type==="drag-handle"||e.type==="expand"?"text-align: center; vertical-align: middle;":"",E=e.pinned?`position: sticky !important; left: ${z}px !important; z-index: 12 !important;`:"",Z=`${P}${E?" "+E:""}`,ee=Z?` style="${Z}"`:"";e.pinned&&console.log("📌 [CELL TIPO] Columna fijada detectada:",{columnId:e.id,columnType:e.type,rowId:x.id,pinned:e.pinned,pinnedLeft:z,pinnedClass:j,pinnedStyle:E,hasPinnedClass:j.includes("pinned"),hasPinnedStyle:E.includes("left"),hasPositionStyle:E.includes("sticky")});const le=d&&(e.type==="nombre"||e.type==="nombre-avatar"||e.type==="estado"||e.type==="fecha")?`data-row-id="${x.id}" data-column-id="${e.id}" data-editable="true"${e.pinned?' data-pinned="true"':""}`:`data-column-id="${e.id}"${e.pinned?' data-pinned="true"':""}`;return`
      <td class="ubits-data-table__cell ${i} ${S}${j}" ${le}${ee}>
        ${w}
      </td>
    `}const h=e.renderCell?e.renderCell(x.data):x.data[e.id]||"",b=e.pinned?" ubits-data-table__cell--pinned":"",p=e.pinned?` style="position: sticky !important; left: ${z}px !important; z-index: 12 !important;"`:"";return e.pinned&&console.log("📌 [CELL NORMAL] Columna fijada detectada:",{columnId:e.id,rowId:x.id,pinned:e.pinned,pinnedLeft:z,pinnedClass:b,pinnedStyle:p,hasPinnedClass:b.includes("pinned"),hasPinnedStyle:p.includes("left"),hasPositionStyle:p.includes("sticky")}),`
    <td class="ubits-data-table__cell${b}" data-column-id="${e.id}"${e.pinned?' data-pinned="true"':""}${p}>
      ${h}
    </td>
  `}function He(e,x=!1,z=!0,y=[],h=null,b=null,p=!0,w=0){if(e.type==="drag-handle"||e.type==="expand"){const u=e.pinned?" ubits-data-table__column-header--pinned":"",ge=e.pinned?`position: sticky !important; left: ${w}px !important; z-index: 10 !important;`:"",W=e.width?`width: ${e.width}px;`:"",Y=[ge,W].filter(Boolean).join(" "),v=Y?`style="${Y}"`:"";return`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${e.type}${u}" 
        ${v}
        data-column-id="${e.id}"
        ${e.pinned?'data-pinned="true"':""}
      >
      </th>
    `}const d=e.type!=="checkbox"&&(e.id==="checkbox"||e.id.startsWith("checkbox-"));if(e.type,d){const u=y.length>0&&y.every(X=>X.data[e.id]===!0),ge=y.some(X=>X.data[e.id]===!0),Y=xe({label:"",checked:u,indeterminate:ge&&!u,size:"md",className:"ubits-data-table__column-checkbox-header"}).replace("<input",`<input data-column-checkbox-header="${e.id}" aria-label="Seleccionar todos ${e.title}"`),v=e.pinned?" ubits-data-table__column-header--pinned":"",M=e.pinned?`position: sticky !important; left: ${w}px !important; z-index: 10 !important;`:"",f=e.width?`width: ${e.width}px;`:"",V=[M,f].filter(Boolean).join(" "),ce=V?`style="${V}"`:"";return`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${v}" 
        ${ce}
        data-column-id="${e.id}"
        ${e.pinned?'data-pinned="true"':""}
      >
        ${Y}
      </th>
    `}const i=e.type==="drag-handle"||e.type==="expand",S=x&&!d&&!i?`
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${e.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  `:"",j=!d&&!i&&z?(()=>{const u=h===e.id,ge=u?" ubits-data-table__column-sort--active":"";let W="arrow-up-a-z",Y="fas fa-sort-alpha-up";return u&&b&&(b==="asc"?(W="arrow-up-a-z",Y="fas fa-sort-alpha-up"):(W="arrow-down-a-z",Y="fas fa-sort-alpha-down")),`
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${ge}" 
           data-column-id="${e.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${e.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${W}"></wa-icon>
        <i class="${Y}" aria-hidden="true"></i>
      </div>
    `})():"",P=!d&&!i&&p?Ee({variant:"tertiary",size:"xs",icon:"ellipsis",iconStyle:"solid",iconOnly:!0,className:"ubits-data-table__column-menu-button",attributes:{"aria-label":`Menú de opciones de ${e.title}`,"data-column-id":e.id,"data-menu-button":"true"}}):"",E=`
    <div class="ubits-data-table__column-header-content">
      ${S}
      <span class="ubits-data-table__column-title">${e.title}</span>
      <div class="ubits-data-table__column-actions">
        ${j}
        ${P}
      </div>
    </div>
  `,Z=e.pinned?" ubits-data-table__column-header--pinned":"",ee=e.pinned?`left: ${w}px !important;`:"",le=e.width?`width: ${e.width}px;`:"",de=e.pinned?"position: sticky !important;":"",F=e.pinned?"z-index: 10 !important;":"",N=[de,ee,F,le].filter(Boolean).join(" "),be=N?`style="${N}"`:"";e.pinned&&console.log("📌 [HEADER PRE-HTML] Antes de construir HTML:",{columnId:e.id,pinned:e.pinned,combinedStyle:N,combinedStyleLength:N.length,styleAttribute:be,willIncludeStyle:!!be});const ae=`
    <th 
      class="ubits-data-table__column-header${Z}" 
      ${be} 
      data-column-id="${e.id}"
      ${e.pinned?'data-pinned="true"':""}
    >
      ${E}
    </th>
  `;return e.pinned&&console.log("📌 [HEADER HTML] HTML generado para columna fijada:",{columnId:e.id,htmlLength:ae.length,htmlIncludesSticky:ae.includes("sticky"),htmlIncludesLeft:ae.includes("left"),htmlIncludesPosition:ae.includes("position"),htmlIncludesWidth:ae.includes("width"),styleAttributeInHTML:ae.includes("style="),htmlPreview:ae.substring(0,400)}),ae}function $e(e,x,z,y=[]){const h=e.expanded||!1,b=x.filter(i=>i.visible!==!1),p=b.map((i,S)=>{const j=y[S]||0;return ze(i,e,j)}).join("");let d=`
    <tr class="${["ubits-data-table__row",h?"ubits-data-table__row--expanded":""].filter(Boolean).join(" ")}" data-row-id="${e.id}">
      ${p}
    </tr>
  `;if(h&&e.renderExpandedContent){const i=e.renderExpandedContent(e.data),S=b.length;d+=`
      <tr class="ubits-data-table__row-expanded-row">
        <td class="ubits-data-table__row-expanded-content" colspan="${S}">
          ${i}
        </td>
      </tr>
    `}return d}function Te(e,x=[],z=[]){const{columns:y,rows:h,className:b="",columnReorderable:p=!1,columnSortable:w=!0,rowReorderable:d=!1,rowExpandable:i=!0,showCheckbox:S=!0,showVerticalScrollbar:j=!1,showHorizontalScrollbar:P=!1,showColumnMenu:E=!0,showPagination:Z=!1,currentPage:ee=1,itemsPerPage:le=10,paginationVariant:de="default",paginationSize:F="md",lazyLoad:N,lazyLoadItemsPerBatch:be=10}=e,ae=Z?!1:N!==!1;let u=y.filter(o=>o.visible!==!1);if(u=u.filter(o=>o.id!=="checkbox"),x.length>0){const o=x.filter(t=>t!=="checkbox"),n=new Map(u.map(t=>{const r={...t};return t.pinned!==void 0&&(r.pinned=t.pinned),[t.id,r]}));u=o.map(t=>{const r=n.get(t);if(r){const l=u.find(A=>A.id===t);l&&l.pinned!==void 0&&(r.pinned=l.pinned)}return r}).filter(t=>t!==void 0).concat(u.filter(t=>!o.includes(t.id)).map(t=>{const r={...t};return t.pinned!==void 0&&(r.pinned=t.pinned),r}))}else u=u.map(o=>{const n={...o};return o.pinned!==void 0&&(n.pinned=o.pinned),n});if(S!==!1){if(!u.some(n=>n.id==="checkbox-2")){const n={id:"checkbox-2",title:"",type:void 0,visible:!0,width:48};u.unshift(n)}}else u.map(o=>o.id),u=u.filter(o=>o.id!=="checkbox-2"),u.map(o=>o.id);if(d){if(!u.some(n=>n.type==="drag-handle")){const n={id:"drag-handle",title:"",type:"drag-handle",visible:!0,width:32};u.unshift(n)}}else u=u.filter(o=>o.type!=="drag-handle");if(i){if(!u.some(n=>n.type==="expand")){const n={id:"expand",title:"",type:"expand",visible:!0,width:32},t=u.findIndex(r=>r.type==="drag-handle");t>=0?u.splice(t+1,0,n):u.unshift(n)}}else u=u.filter(o=>o.type!=="expand");const{checkboxSticky:ge=!1,dragHandleSticky:W=!1,expandSticky:Y=!1}=e;u=u.map(o=>{const n={...o};return o.id==="checkbox-2"?ge===!0?n.pinned=!0:n.pinned=!1:o.type==="drag-handle"?W===!0?n.pinned=!0:n.pinned=!1:o.type==="expand"&&(Y===!0?n.pinned=!0:n.pinned=!1),n.pinned&&!o.id.startsWith("checkbox")&&o.type!=="drag-handle"&&o.type,n}),u.filter(o=>o.pinned);const v=e.sortColumnId||null,M=e.sortDirection||null;let f=[...h];if(z.length>0){const o=new Map(h.map(n=>[n.id,n]));f=z.map(n=>o.get(n)).filter(n=>n!==void 0).concat(h.filter(n=>!z.includes(n.id)))}v&&M&&(f=[...f].sort((o,n)=>{const t=o.data[v],r=n.data[v];if(t==null&&r==null)return 0;if(t==null)return 1;if(r==null)return-1;const l=String(t).toLowerCase(),A=String(r).toLowerCase();let C=0;return l<A?C=-1:l>A&&(C=1),M==="asc"?C:-C}));const V=(o,n,t)=>{let r=0;const l={columnId:o.id,steps:[]};for(let A=0;A<n;A++){const C=t[A];if(C&&C.pinned){let _=C.width;_||(C.type==="drag-handle"||C.type==="expand"?_=32:C.id==="checkbox-2"?_=48:_=150),r+=_,l.steps.push({step:`columna-${C.id}`,added:_,total:r,reason:`Columna fijada anterior: ${C.id} (tipo: ${C.type||"normal"})`})}else C&&!C.pinned&&l.steps.push({step:`columna-${C.id}`,added:0,total:r,reason:`Columna anterior no fijada: ${C.id}`})}return l.finalLeft=r,o.pinned,r},ce=u.map((o,n)=>{const t=o.pinned?V(o,n,u):0;return o.pinned,He(o,p,w,f,v,M,E,t)}).join("");let ne=f,X=1,me="";const fe=e.__lazyLoadCurrentItems||be;if(Z){const o=f.length;X=Math.max(1,Math.ceil(o/le));const n=Math.max(1,Math.min(ee,X)),t=(n-1)*le,r=t+le;ne=f.slice(t,r);try{me=Ue({currentPage:n,totalPages:X,totalItems:o,itemsPerPage:le,variant:de,size:F,maxVisiblePages:7,showFirst:!1,showLast:!1,showPrevNext:!0,showInfo:!1,showItemsPerPage:!1,itemsPerPageOptions:[10,20,50,100],className:"ubits-data-table__pagination"})}catch(l){console.error("❌ [PAGINATION] ERROR:",l),me=""}}else ae&&(ne=f.slice(0,fe),console.log("📦 [LAZY LOAD] Mostrando",ne.length,"de",f.length,"filas"));const L=ne.map((o,n)=>{const t=u.map((r,l)=>r.pinned?V(r,l,u):0);return $e(o,u,n,t)}).join(""),B=["ubits-data-table",b].filter(Boolean).join(" ");u.length;const q=`
    <table class="${B} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${ce}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${L}
      </tbody>
    </table>
  `.trim(),ie=u.some(o=>o.pinned);let s=P;ie&&!P&&(s=!0);let m=j;ae&&!Z&&(m=!0);let a;if(m||s){const o=[];m&&o.push("ubits-data-table__scrollable-container--vertical"),s&&o.push("ubits-data-table__scrollable-container--horizontal"),a=`<div class="ubits-data-table__scrollable-container ${o.join(" ")}">${q}</div>`}else a=q;let c;return Z&&me?c=`<div class="ubits-data-table__container">
      ${a}
      <div class="ubits-data-table__pagination-wrapper">${me}</div>
    </div>`:c=a,c}function Ne(e){const x=e.containerId?document.getElementById(e.containerId):document.body;if(!x)throw new Error(`Container with id "${e.containerId}" not found`);const z=x.querySelector(".ubits-data-table"),y=x.querySelector(".ubits-data-table__scrollable-container");if(y){const M=y.querySelector(".ubits-data-table");if(M){const f=M;if(f._dataTableInstance)try{const V=f._dataTableInstance;V&&typeof V.destroy=="function"&&V.destroy()}catch(V){console.warn("Error destroying previous table instance:",V)}}y.remove()}else if(z){const v=z;if(v._dataTableInstance)try{const M=v._dataTableInstance;M&&typeof M.destroy=="function"&&M.destroy()}catch(M){console.warn("Error destroying previous table instance:",M)}z.remove()}const h=e.lazyLoad!==!1&&!e.showPagination?e.lazyLoadItemsPerBatch||10:void 0,b={...e,__lazyLoadCurrentItems:h},p=Te(b),w=document.createElement("div");w.innerHTML=p.trim();const d=w.firstElementChild;if(!d)throw new Error("Failed to create data table 3 element");x.appendChild(d);let i={...e,columns:e.columns.map(v=>({...v}))},S=i.columns.filter(v=>v.visible!==!1).map(v=>v.id),j=i.rows.map(v=>v.id),P=null,E=null,Z=null,ee=null;const le=i.showPagination?!1:i.lazyLoad!==!1,de=i.lazyLoadItemsPerBatch||10;let F=de,N=null;const be=()=>{if(N){const f=d.querySelector(".ubits-data-table__scrollable-container");f&&f.removeEventListener("scroll",N),window.removeEventListener("scroll",N,!0),N=null}const v=d.querySelector(".ubits-data-table__scrollable-container"),M=()=>{const f=i.rows.length;if(F>=f)return;let V,ce,ne;if(v)V=v.scrollTop,ce=v.scrollHeight,ne=v.clientHeight;else{V=window.scrollY||document.documentElement.scrollTop,ce=document.documentElement.scrollHeight,ne=window.innerHeight;const fe=d.getBoundingClientRect().bottom+V;if(V+ne>=fe-200){const B=Math.min(F+de,f);B>F&&(F=B,console.log("📦 [LAZY LOAD] Cargando más items:",F,"de",f),i.onLazyLoad&&i.onLazyLoad(F,f),u(!0))}return}if((V+ne)/ce>=.8){const me=Math.min(F+de,f);me>F&&(F=me,console.log("📦 [LAZY LOAD] Cargando más items:",F,"de",f),i.onLazyLoad&&i.onLazyLoad(F,f),u(!0))}};v?(N=M,v.addEventListener("scroll",N,{passive:!0}),console.log("✅ [LAZY LOAD] Listener agregado al contenedor scrollable")):(console.warn("⚠️ [LAZY LOAD] No se encontró contenedor scrollable, esperando renderizado..."),setTimeout(()=>{const f=d.querySelector(".ubits-data-table__scrollable-container");f?(N=M,f.addEventListener("scroll",N,{passive:!0}),console.log("✅ [LAZY LOAD] Contenedor scrollable encontrado después de esperar")):console.error("❌ [LAZY LOAD] No se pudo encontrar contenedor scrollable. El lazy load requiere scroll vertical activo.")},100))},ae=()=>{d.querySelectorAll("wa-icon").forEach(M=>{const f=M.nextElementSibling;f&&f.tagName==="I"&&(customElements.get("wa-icon")?(M.style.display="inline-block",M.style.width="12px",M.style.height="12px",M.style.opacity="1",f.style.display="none"):(M.style.display="none",f.style.display="inline-block",f.style.fontSize="12px",f.style.width="12px",f.style.height="12px"))})},u=(v=!1)=>{let M=0,f=0,V=0;if(v){const L=d.querySelector(".ubits-data-table__scrollable-container");L&&(M=L.scrollTop,f=L.scrollHeight,V=L.clientHeight)}const ce={...i,columns:i.columns.map(L=>{const B={...L};return L.pinned!==void 0&&(B.pinned=L.pinned),B}),sortColumnId:Z,sortDirection:ee,__lazyLoadCurrentItems:F},ne=Te(ce,S,j);d.innerHTML=ne.trim(),ge(),ae(),i.showPagination&&setTimeout(()=>{fe()},100),le&&!i.showPagination&&(be(),v&&requestAnimationFrame(()=>{const L=d.querySelector(".ubits-data-table__scrollable-container");if(L&&f>0&&V>0){const B=f-V,q=B>0?M/B:0,ie=L.scrollHeight,s=L.clientHeight,m=ie-s;m>0&&(L.scrollTop=q*m)}})),console.log("🎨 [HOVER DEBUG] ========== VERIFICANDO HOVER DE FILAS ==========");const X=d.querySelectorAll(".ubits-data-table__row");if(console.log("🎨 [HOVER DEBUG] Filas encontradas:",X.length),X.forEach((L,B)=>{if(B===0){const q=L.querySelectorAll("td");console.log("🎨 [HOVER DEBUG] Celdas en la primera fila:",q.length),q.forEach((ie,s)=>{const m=ie,a=Array.from(m.classList),c=window.getComputedStyle(m).backgroundColor;console.log(`🎨 [HOVER DEBUG] Celda ${s}:`,{classes:a,computedBackground:c,hasDragHandle:a.includes("ubits-data-table__cell--drag-handle"),hasExpand:a.includes("ubits-data-table__cell--expand"),hasCheckbox:a.includes("ubits-data-table__cell--checkbox"),hasControlsColumn:a.includes("ubits-data-table__controls-column"),hasCell:a.includes("ubits-data-table__cell")})})}}),X.length>0){const L=X[0];L.addEventListener("mouseenter",()=>{console.log("🎨 [HOVER DEBUG] ========== HOVER ENTRÓ EN FILA =========="),L.querySelectorAll("td").forEach((q,ie)=>{const s=q,m=Array.from(s.classList),a=window.getComputedStyle(s).backgroundColor;console.log(`🎨 [HOVER DEBUG] Celda ${ie} en hover:`,{classes:m,computedBackground:a,hasDragHandle:m.includes("ubits-data-table__cell--drag-handle"),hasExpand:m.includes("ubits-data-table__cell--expand")})})}),L.addEventListener("mouseleave",()=>{console.log("🎨 [HOVER DEBUG] ========== HOVER SALIÓ DE FILA ==========")})}d.querySelectorAll("input[data-column-checkbox-header]").forEach(L=>{const B=L,q=B.getAttribute("data-column-checkbox-header");if(q){const ie=i.rows.length>0&&i.rows.every(a=>a.data[q]===!0),s=i.rows.some(a=>a.data[q]===!0),m=s&&!ie;B.indeterminate=m,console.log("📋 [INDETERMINATE] Header checkbox",q,"- indeterminate:",m,"(allChecked:",ie,"someChecked:",s,")")}});const fe=()=>{try{console.log("📄 [SPACING] ========== VERIFICANDO ESPACIADO DEL PAGINADOR ==========");const L=d.closest(".ubits-data-table__container")||d.querySelector(".ubits-data-table__container");if(console.log("📄 [SPACING] Container encontrado:",!!L),L){const B=window.getComputedStyle(L);console.log("📄 [SPACING] Container estilos:"),console.log("  - display:",B.display),console.log("  - flexDirection:",B.flexDirection),console.log("  - gap:",B.gap);const q=L.querySelector(".ubits-data-table__scrollable-container")||L.querySelector(".ubits-data-table");console.log("📄 [SPACING] Table container encontrado:",!!q);const s=(q?.querySelector(".ubits-data-table__table")||q)?.querySelector(".ubits-data-table__row:last-child");if(console.log("📄 [SPACING] Última fila encontrada:",!!s),q){const a=window.getComputedStyle(q);if(console.log("📄 [SPACING] Table container estilos:"),console.log("  - marginBottom:",a.marginBottom),console.log("  - paddingBottom:",a.paddingBottom),console.log("  - borderBottom:",a.borderBottom),s){const c=s.getBoundingClientRect();console.log("📄 [SPACING] Última fila posición:"),console.log("  - bottom:",c.bottom)}}const m=L.querySelector(".ubits-data-table__pagination-wrapper");if(console.log("📄 [SPACING] Pagination wrapper encontrado:",!!m),m){const a=window.getComputedStyle(m);console.log("📄 [SPACING] Pagination wrapper estilos:"),console.log("  - marginTop:",a.marginTop),console.log("  - marginBottom:",a.marginBottom),console.log("  - paddingTop:",a.paddingTop),console.log("  - paddingBottom:",a.paddingBottom),console.log("  - borderTop:",a.borderTop);const c=m.getBoundingClientRect();if(console.log("📄 [SPACING] Pagination wrapper posición:"),console.log("  - top:",c.top),s){const o=s.getBoundingClientRect(),n=c.top-o.bottom;console.log("📄 [SPACING] DISTANCIA CALCULADA:"),console.log("  - Última fila bottom:",o.bottom),console.log("  - Paginador top:",c.top),console.log("  - DISTANCIA:",n,"px"),console.log("  - Esperado: 16px")}else console.log("📄 [SPACING] ⚠️ No se pudo calcular distancia: última fila no encontrada")}else console.log("📄 [SPACING] ⚠️ Pagination wrapper NO encontrado")}else console.log("📄 [SPACING] ⚠️ Container NO encontrado");console.log("📄 [SPACING] ========== FIN VERIFICACIÓN ==========")}catch(L){console.error("📄 [SPACING] ❌ Error verificando espaciado:",L)}}},ge=()=>{typeof window<"u"&&window.location&&window.location.href.includes("storybook");try{i.columnReorderable&&(d.hasAttribute("data-column-drag-listener")||(d.setAttribute("data-column-drag-listener","true"),d.addEventListener("dragstart",s=>{const a=s.target.closest(".ubits-data-table__column-drag-handle");if(a&&(P=a.getAttribute("data-column-id"),P)){s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",P);const c=a.closest(".ubits-data-table__column-header");c&&c.classList.add("ubits-data-table__column-header--dragging")}},!0),d.addEventListener("dragend",s=>{const a=s.target.closest(".ubits-data-table__column-drag-handle");if(a){const c=a.closest(".ubits-data-table__column-header");c&&c.classList.remove("ubits-data-table__column-header--dragging")}P=null},!0),d.addEventListener("dragover",s=>{const a=s.target.closest(".ubits-data-table__column-header");if(a&&P){const c=a.getAttribute("data-column-id");if(c&&c!==P){const o=c==="checkbox"||c.startsWith("checkbox-"),n=P==="checkbox"||P.startsWith("checkbox-");if(o)return;if(!n){const t=S.findIndex(r=>r==="checkbox"||r.startsWith("checkbox-"));if(t!==-1&&S.indexOf(c)<t)return}s.preventDefault(),s.dataTransfer.dropEffect="move",a.classList.add("ubits-data-table__column-header--drag-over")}}},!0),d.addEventListener("dragleave",s=>{const a=s.target.closest(".ubits-data-table__column-header");a&&a.classList.remove("ubits-data-table__column-header--drag-over")},!0),d.addEventListener("drop",s=>{const a=s.target.closest(".ubits-data-table__column-header");if(a){s.preventDefault(),a.classList.remove("ubits-data-table__column-header--drag-over");const c=a.getAttribute("data-column-id");if(!c||!P)return;const o=P==="checkbox"||P.startsWith("checkbox-"),n=c==="checkbox"||c.startsWith("checkbox-");if(o||n)return;if(P!==c){const t=S.indexOf(P),r=S.indexOf(c),l=S.findIndex(A=>A==="checkbox"||A.startsWith("checkbox-"));if(l===-1){t!==-1&&r!==-1&&(S.splice(t,1),S.splice(r,0,P),i.onColumnReorder&&i.onColumnReorder([...S]),u());return}if(r<l||t>l&&r<l)return;if(t!==-1&&r!==-1){const A=[...S];A.splice(t,1),A.splice(r,0,P);const C=A.findIndex(_=>_==="checkbox"||_.startsWith("checkbox-"));if(C!==-1&&C<l)return;S=A,i.onColumnReorder&&i.onColumnReorder([...S]),u()}}}},!0))),i.rowReorderable&&(d.hasAttribute("data-row-drag-listener")||(d.setAttribute("data-row-drag-listener","true"),d.addEventListener("dragstart",s=>{const a=s.target.closest(".ubits-data-table__row-drag-handle");if(!a)return;const c=a.getAttribute("data-row-id");if(c){const o=isNaN(Number(c))?c:Number(c);E=o,s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",String(o));const n=a.closest(".ubits-data-table__row");n&&n.classList.add("ubits-data-table__row--dragging")}},!0),d.addEventListener("dragend",s=>{const a=s.target.closest(".ubits-data-table__row-drag-handle");if(a){const c=a.closest(".ubits-data-table__row");c&&c.classList.remove("ubits-data-table__row--dragging")}E=null},!0),d.addEventListener("dragover",s=>{const a=s.target.closest(".ubits-data-table__row");if(a&&E!==null){const c=a.getAttribute("data-row-id");c&&(isNaN(Number(c))?c:Number(c))!==E&&(s.preventDefault(),s.dataTransfer.dropEffect="move",a.classList.add("ubits-data-table__row--drag-over"))}},!0),d.addEventListener("dragleave",s=>{const a=s.target.closest(".ubits-data-table__row");a&&a.classList.remove("ubits-data-table__row--drag-over")},!0),d.addEventListener("drop",s=>{const a=s.target.closest(".ubits-data-table__row");if(a){s.preventDefault(),a.classList.remove("ubits-data-table__row--drag-over");const c=a.getAttribute("data-row-id");if(!c||!E)return;const o=isNaN(Number(c))?c:Number(c),n=s.dataTransfer.getData("text/plain");if(n&&String(o)!==n){const t=isNaN(Number(n))?n:Number(n),r=j.indexOf(t),l=j.indexOf(o);r!==-1&&l!==-1&&(j.splice(r,1),j.splice(l,0,t),i.onRowReorder&&i.onRowReorder([...j]),u())}}},!0))),d.querySelectorAll("input[data-column-id]").forEach(s=>{s.addEventListener("change",m=>{const a=m.target,c=a.getAttribute("data-row-id"),o=a.getAttribute("data-column-id"),n=isNaN(Number(c))?c:Number(c),t=a.checked,r=i.rows.find(l=>l.id===n);r&&(r.data[o]=t),u()})}),d.querySelectorAll("input[data-column-checkbox-header]").forEach(s=>{s.addEventListener("change",m=>{const a=m.target,c=a.getAttribute("data-column-checkbox-header"),o=a.checked;i.rows.forEach(n=>{n.data[c]=o}),u()})}),d.querySelectorAll('[data-expand-button="true"]').forEach(s=>{s.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const a=s.getAttribute("data-row-id"),c=isNaN(Number(a))?a:Number(a),o=i.rows.find(n=>n.id===c);if(o){const n=o.expanded||!1;o.expanded=!n,i.onRowExpand&&i.onRowExpand(c,o.expanded),u()}})}),d.querySelectorAll('[data-sort-button="true"]').forEach(s=>{s.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const a=s.getAttribute("data-column-id");Z===a?ee=ee==="asc"?"desc":"asc":(Z=a,ee="asc"),i.onSort&&i.onSort(a,ee),u()})}),d.querySelectorAll('[data-menu-button="true"]').forEach(s=>{const m=s,a=m.getAttribute("data-column-id");if(!a||!i.columns.find(k=>k.id===a))return;const o=m.closest("th");if(!o){console.warn("⚠️ [MENU BUTTON] No se encontró el header cell");return}const n=o.hasAttribute("data-pinned")&&o.getAttribute("data-pinned")==="true",t=o.classList.contains("ubits-data-table__column-header--pinned"),r=typeof window<"u"&&!window.location?.href?.includes("storybook");let l,A=null;if(n||t){const Q=d.querySelector(".ubits-data-table")?.closest(".ubits-data-table__scrollable-container")||d;l=Q.querySelector(`.ubits-data-table__column-menu-dropdown[data-column-id="${a}"]`),l||(l=document.createElement("div"),l.className="ubits-data-table__column-menu-dropdown",l.setAttribute("data-column-id",a),l.style.cssText=`
            position: fixed;
            z-index: 10000 !important;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `,Q.appendChild(l))}else l=o.querySelector(".ubits-data-table__column-menu-dropdown"),l||(l=document.createElement("div"),l.className="ubits-data-table__column-menu-dropdown",l.setAttribute("data-column-id",a),l.style.cssText=`
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000 !important;
            margin-top: 4px;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `,o.style.position="relative",o.appendChild(l));let C=!1;const _=()=>{l&&(l.style.display="none"),C=!1,g&&(document.removeEventListener("click",g),g=null),(n||t)&&l.parentElement&&l.parentElement!==o&&l.remove()};let g=null;m.addEventListener("click",k=>{const Q=typeof window<"u"&&window.location&&!window.location.href.includes("storybook");k.preventDefault(),k.stopPropagation();const R=i.columns.find(G=>G.id===a);if(!R){console.error("❌ [COLUMN MENU] Columna no encontrada:",a);return}const H=R.pinned||!1;if(C){_();return}d.querySelectorAll(".ubits-data-table__column-menu-dropdown").forEach(G=>{G!==l&&(G.style.display="none")});const K=[{label:H?"Desfijar columna":"Fijar columna",value:"pin",state:"default"}];l.innerHTML="";const I=`column-menu-list-${a}-${Math.random().toString(36).substr(2,9)}`;l.id=I;try{const G=Se({containerId:I,items:K,size:"sm",maxHeight:"200px",onSelectionChange:(oe,re)=>{if(oe&&oe.value==="pin"){const se=i.columns.find(te=>te.id===a);if(se){const te=se.pinned||!1;se.pinned=!te,i.onColumnPin&&i.onColumnPin(a,se.pinned),u()}else console.error("❌ [COLUMN MENU] Columna no encontrada al intentar fijar:",a)}_()}})}catch(G){console.error("❌ [COLUMN MENU] Error al crear lista con createList:",G);const oe=_e({items:K,size:"sm",maxHeight:"200px"});l.innerHTML=oe,l.querySelectorAll(".ubits-list-item").forEach(se=>{se.addEventListener("click",()=>{const te=i.columns.find(he=>he.id===a);if(te){const he=te.pinned||!1;te.pinned=!he,i.onColumnPin&&i.onColumnPin(a,te.pinned),u()}_()})})}const J=o.hasAttribute("data-pinned")&&o.getAttribute("data-pinned")==="true",D=o.classList.contains("ubits-data-table__column-header--pinned"),O=J||D?1e4:1e3,T=m.getBoundingClientRect(),$=o.getBoundingClientRect();if(J||D){l.style.setProperty("position","fixed","important"),l.style.setProperty("top",`${T.bottom+4}px`,"important");const G=T.right-160;l.style.setProperty("left",`${G}px`,"important"),l.style.setProperty("right","auto","important"),l.style.setProperty("z-index",`${O}`,"important"),l.style.setProperty("display","block","important")}else l.style.position="absolute",l.style.top="100%",l.style.right="0",l.style.left="auto",l.style.zIndex=`${O}`,l.style.setProperty("z-index",`${O}`,"important"),l.style.display="block";C=!0,g=G=>{!l.contains(G.target)&&!m.contains(G.target)&&_()},setTimeout(()=>{document.addEventListener("click",g)},0)})}),d.querySelectorAll('[data-editable-text="true"]').forEach(s=>{const m=s.closest('[data-editable="true"]');if(!m)return;const a=m.getAttribute("data-row-id"),c=m.getAttribute("data-column-id");if(!a||!c)return;const o=isNaN(Number(a))?a:Number(a);s.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),s.blur())}),s.addEventListener("blur",n=>{n.stopPropagation();const t=s.textContent||"",r=i.rows.find(l=>l.id===o);if(r){const l=i.columns.find(A=>A.id===c);l&&(l.type==="nombre"||l.type==="nombre-avatar")?(r.data.nombre=t.trim(),r.data[c]!==void 0&&(r.data[c]=t.trim())):l&&l.type==="estado"?(r.data[c]=t.trim(),r.data.estado=t.trim(),r.data.status=t.trim()):r.data[c]=t.trim()}}),s.addEventListener("dblclick",n=>{n.stopPropagation()}),s.addEventListener("click",n=>{n.stopPropagation()})}),d.querySelectorAll(".ubits-data-table__status-editable").forEach(s=>{const m=s.getAttribute("data-row-id"),a=s.getAttribute("data-column-id"),c=s.getAttribute("data-current-status");if(!m||!a)return;const o=isNaN(Number(m))?m:Number(m),n=s.querySelector(".ubits-status-tag"),t=s.querySelector(".ubits-data-table__status-dropdown");if(!n||!t)return;const r=[{value:"active",label:"Activo",status:"active"},{value:"completed",label:"Completado",status:"completed"},{value:"published",label:"Publicado",status:"published"},{value:"fulfilled",label:"Cumplido",status:"fulfilled"},{value:"created",label:"Creado",status:"created"},{value:"not-fulfilled",label:"No cumplido",status:"not-fulfilled"},{value:"denied",label:"Denegado",status:"denied"},{value:"draft",label:"Borrador",status:"draft"},{value:"in-progress",label:"En progreso",status:"in-progress"},{value:"syncing",label:"Sincronizando",status:"syncing"},{value:"pending",label:"Pendiente",status:"pending"},{value:"pending-approval",label:"Pendiente aprobación",status:"pending-approval"},{value:"not-started",label:"No iniciado",status:"not-started"},{value:"finished",label:"Finalizado",status:"finished"},{value:"archived",label:"Archivado",status:"archived"},{value:"disabled",label:"Deshabilitado",status:"disabled"},{value:"paused",label:"Pausado",status:"paused"},{value:"hidden",label:"Oculto",status:"hidden"}];let l=null,A=null,C=null,_=!1,g=0;const k=[],Q=D=>{const O=[];let T=D;for(;T&&T!==document.body&&T!==document.documentElement;){const $=window.getComputedStyle(T),G=$.overflow+$.overflowX+$.overflowY,oe=G.includes("auto")||G.includes("scroll"),re=T.scrollHeight>T.clientHeight||T.scrollWidth>T.clientWidth;(oe||re)&&O.push(T),T=T.parentElement}return O},R=()=>{try{if(!t||t.style.display==="none"||!document.body.contains(t)){K();return}if(!n||!n.isConnected){K();return}const D=n.getBoundingClientRect(),O=D.bottom+4,T=D.left,$=t.style.top,G=t.style.left,oe=`${O}px`,re=`${T}px`;($!==oe||G!==re)&&(t.style.top=oe,t.style.left=re,g++)}catch{K()}},H=()=>{if(_)return;_=!0;const D=()=>{if(t.style.display==="none"||!document.body.contains(t)){K();return}R(),C=requestAnimationFrame(D)};D()},K=()=>{C&&(cancelAnimationFrame(C),C=null),_=!1,g=0};A=R;const I=()=>{K(),t.style.display="none";const D=t.__scrollbarInstance;if(D&&D.destroy){try{D.destroy()}catch{}t.__scrollbarInstance=null}t.parentElement===document.body&&s.appendChild(t),l&&(document.removeEventListener("click",l),l=null),A&&(window.removeEventListener("scroll",A,!0),d.removeEventListener("scroll",A,!0),k.forEach(O=>{O.removeEventListener("scroll",A,!0)}),k.length=0,A=null)},J=D=>{try{if(D.preventDefault(),D.stopPropagation(),!n||!t)return;d.querySelectorAll(".ubits-data-table__status-dropdown").forEach(U=>{if(U!==t&&(U.style.display="none",U.parentElement===document.body)){const pe=d.querySelector(`[data-row-id="${U.getAttribute("data-row-id")}"][data-column-id="${U.getAttribute("data-column-id")}"]`);pe&&pe.appendChild(U)}});const O={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"},T=r.map(U=>({label:U.label,value:U.value,state:U.status===c?"active":"default",selected:U.status===c}));if(!document.querySelector('link[href*="scroll.css"]')){const U=document.createElement("link");U.rel="stylesheet",U.href="../../addons/scroll/src/styles/scroll.css",document.head.appendChild(U)}t.innerHTML="";const $=`status-list-${o}-${a}`,G=`status-scrollbar-${o}-${a}`;if(t.id=`status-dropdown-${o}-${a}`,t.innerHTML=`
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${$}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${G}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `,document.getElementById($)){const U=document.createElement("style");U.textContent=`
            #${$}::-webkit-scrollbar {
              display: none;
            }
          `,document.head.appendChild(U)}t.parentElement!==document.body&&document.body.appendChild(t);const re=n.getBoundingClientRect();t.style.position="fixed",t.style.top=`${re.bottom+4}px`,t.style.left=`${re.left}px`,t.style.zIndex="1000",t.style.backgroundColor="var(--ubits-bg-1)",t.style.border="1px solid var(--ubits-border-1)",t.style.borderRadius="8px",t.style.display="block",t.style.minWidth="200px",t.style.maxWidth="300px",t.style.padding="4px",t.style.boxSizing="border-box",t.style.maxHeight="308px";const se=Q(n);k.push(...se),R(),H(),window.addEventListener("scroll",R,!0),d.addEventListener("scroll",R,!0),se.forEach(U=>{U.addEventListener("scroll",R,!0)});let te=null;try{const U=Se({containerId:$,items:T,size:"sm",maxHeight:"none",onSelectionChange:(pe,we)=>{if(pe&&we!==null){const Pe=r[we];if(Pe){const Ce=i.rows.find(Ae=>Ae.id===o);if(Ce&&i.columns.find(ve=>ve.id===a)){const ve=O[Pe.status]||Pe.label;Ce.data[a]=ve,Ce.data.estado=ve,Ce.data.status=ve,u()}I()}}}});U&&(U.style.maxHeight="none",U.style.height="auto",U.style.overflow="visible",U.style.overflowY="visible",U.style.overflowX="visible"),requestAnimationFrame(()=>{if(typeof ke<"u")try{const pe=document.getElementById($);pe&&pe.scrollHeight>pe.clientHeight&&(te=ke({containerId:G,targetId:$,orientation:"vertical",state:"default"}),te?.update&&te.update())}catch{}})}catch{}t.__scrollbarInstance=te;const he=U=>{!t.contains(U.target)&&!n.contains(U.target)&&I()};l=he,setTimeout(()=>{document.addEventListener("click",he)},0)}catch{K()}};n.addEventListener("click",J)}),d.querySelectorAll('input[data-radio-button="true"][data-editable="true"]').forEach(s=>{const m=s,a=m.getAttribute("data-row-id"),c=m.getAttribute("data-column-id");if(!a||!c)return;const o=isNaN(Number(a))?a:Number(a),n=m.cloneNode(!0);m.parentNode?.replaceChild(n,m),n.addEventListener("change",t=>{if(t.stopPropagation(),n.checked){d.querySelectorAll(`input[data-radio-button="true"][data-column-id="${c}"]`).forEach(A=>{const C=A.getAttribute("data-row-id");if(C&&C!==String(o)){A.checked=!1;const _=i.rows.find(g=>String(g.id)===C);_&&(_.data[c]=!1)}});const l=i.rows.find(A=>String(A.id)===String(o));l&&(l.data[c]=!0,l.data[`${c}_value`]=o)}u()})}),d.querySelectorAll('input[data-checkbox-button="true"]').forEach(s=>{const m=s,a=m.getAttribute("data-row-id"),c=m.getAttribute("data-column-id");if(!a||!c)return;const o=isNaN(Number(a))?a:Number(a),n=m.cloneNode(!0);m.parentNode?.replaceChild(n,m),n.addEventListener("change",t=>{t.stopPropagation();const r=i.rows.find(l=>String(l.id)===String(o));r&&(r.data[c]=n.checked,i.onRowSelect&&i.onRowSelect(o,n.checked),u())})}),d.querySelectorAll("input[data-column-checkbox-header]").forEach(s=>{const m=s,a=m.getAttribute("data-column-checkbox-header");if(!a)return;const c=m.cloneNode(!0);m.parentNode?.replaceChild(c,m),c.addEventListener("change",o=>{o.stopPropagation();const n=c.checked;i.rows.forEach(t=>{t.data||(t.data={}),t.data[a]=n}),i.onSelectAll&&i.onSelectAll(n),u()})});const B=typeof window<"u"&&window.location&&!window.location.href.includes("storybook");if(d.querySelectorAll(".ubits-data-table__date-editable").forEach((s,m)=>{const a=s.getAttribute("data-row-id"),c=s.getAttribute("data-column-id");if(!a||!c)return;const o=isNaN(Number(a))?a:Number(a),n=s.querySelector(".ubits-data-table__date-display");if(!n)return;let t=null,r=null,l=null,A=null,C=null,_=null;const g=I=>{const J=String(I.getDate()).padStart(2,"0"),D=String(I.getMonth()+1).padStart(2,"0"),O=I.getFullYear();return`${J}/${D}/${O}`},k=I=>{if(!I)return null;const[J,D,O]=I.split("/");if(J&&D&&O)return new Date(parseInt(O),parseInt(D)-1,parseInt(J));try{const T=new Date(I);if(!isNaN(T.getTime()))return T}catch{}return null},Q=()=>{r&&(r.style.display="none",r.parentElement&&r.remove(),r=null),l&&(document.removeEventListener("click",l),l=null),A&&(document.removeEventListener("keydown",A),A=null),C&&(window.removeEventListener("scroll",C,!0),_&&_.removeEventListener("scroll",C,!0),C=null)},R=()=>{l=I=>{r&&!s.contains(I.target)&&!r.contains(I.target)&&Q()},A=I=>{I.key==="Escape"&&r&&Q()},C=I=>{if(!r)return;const J=r.querySelector(".ubits-calendar");if(J){const D=J.querySelector('.ubits-calendar__month-dropdown[style*="display: block"]'),O=J.querySelector('.ubits-calendar__year-dropdown[style*="display: block"]');if(D||O){const T=document.activeElement;if(T&&(r.contains(T)||T.closest(".ubits-calendar")||T.closest(".ubits-calendar__month-dropdown")||T.closest(".ubits-calendar__year-dropdown")||T.closest(".ubits-list")||T.closest('[id*="calendar-list"]')||T.closest('[id*="calendar-scrollbar"]')))return;if(I&&I.target){const $=I.target;if(r.contains($)||$.closest(".ubits-calendar")||$.closest(".ubits-calendar__month-dropdown")||$.closest(".ubits-calendar__year-dropdown")||$.closest(".ubits-list")||$.closest('[id*="calendar-list"]')||$.closest('[id*="calendar-scrollbar"]'))return}return}}Q()},document.addEventListener("click",l),document.addEventListener("keydown",A),_=d.querySelector(".ubits-data-table__scrollable-container"),_&&_.addEventListener("scroll",C,!0),window.addEventListener("scroll",C,!0)},H=async()=>{const I=[{id:"ubits-calendar-styles",fileName:"calendar.css",href:"../../addons/calendar/src/styles/calendar.css"},{id:"ubits-button-styles",fileName:"button.css",href:"../../addons/button/src/styles/button.css"},{id:"ubits-input-styles",fileName:"input.css",href:"../../addons/input/src/styles/input.css"},{id:"ubits-list-styles",fileName:"list.css",href:"../../addons/list/src/styles/list.css"}];for(const J of I){const D=document.getElementById(J.id),O=Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).find($=>($.href||"").includes(J.fileName)||$.id===J.id);if(D||O)continue;const T=document.createElement("link");T.rel="stylesheet",T.href=J.href,T.id=J.id,document.head.appendChild(T)}},K=async()=>{if(r&&r.style.display!=="none"){Q();return}if(t&&r){const I=n.getBoundingClientRect();r.style.top=`${I.bottom+4}px`,r.style.left=`${I.left}px`,r.style.display="block",R();return}try{await H();const{createCalendar:I}=await Le(async()=>{const{createCalendar:oe}=await import("./index-BovPifr4.js").then(re=>re.i);return{createCalendar:oe}},__vite__mapDeps([0,1]),import.meta.url),J=n.textContent||"",D=k(J);t=I({mode:"single",selectedDate:D,initialDate:D||new Date,onDateSelect:oe=>{const re=g(oe);n.textContent=re;const se=i.rows.find(te=>te.id===o);se&&(se.data[c]=re,se.data[`${c}_iso`]=oe.toISOString().split("T")[0]),Q(),u()}}),r=document.createElement("div"),r.className="ubits-data-table__calendar-container",r.setAttribute("data-row-id",String(o)),r.setAttribute("data-column-id",c);const T=n.getBoundingClientRect(),$=T.bottom+4,G=T.left;r.style.cssText=`
            position: fixed;
            top: ${$}px;
            left: ${G}px;
            z-index: 99999;
            display: block;
            margin: 0;
          `,document.body.appendChild(r),r.appendChild(t.element),R()}catch(I){console.error("❌ [CALENDAR] Error cargando Calendar UBITS:",I)}};n.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),K()})}),d.querySelectorAll('input[data-toggle-button="true"]').forEach(s=>{const m=s,a=m.getAttribute("data-row-id"),c=m.getAttribute("data-column-id");if(!a||!c)return;const o=isNaN(Number(a))?a:Number(a),n=m.cloneNode(!0);m.parentNode?.replaceChild(n,m),n.addEventListener("change",r=>{r.stopPropagation();const l=i.rows.find(A=>String(A.id)===String(o));l&&(l.data[c]=n.checked,u())});const t=n.closest(".ubits-toggle");t&&t.addEventListener("click",r=>{r.target!==n&&!n.contains(r.target)&&(r.preventDefault(),r.stopPropagation(),n.checked=!n.checked,n.dispatchEvent(new Event("change",{bubbles:!0})))})}),i.showPagination){const s=d.querySelector(".ubits-data-table__pagination");if(s){s.querySelectorAll(".ubits-pagination__page-button").forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.textContent||"1");i.onPageChange&&i.onPageChange(n),i.currentPage=n,u()})}),s.querySelectorAll(".ubits-pagination__nav-button").forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(s.getAttribute("data-current-page")||"1"),t=parseInt(s.getAttribute("data-total-pages")||"1"),r=o.getAttribute("aria-label")||"";let l=n;r.includes("Primera")||r.includes("First")?l=1:r.includes("Última")||r.includes("Last")?l=t:r.includes("Anterior")||r.includes("Previous")?l=Math.max(1,n-1):(r.includes("Siguiente")||r.includes("Next"))&&(l=Math.min(t,n+1)),l!==n&&(i.onPageChange&&i.onPageChange(l),i.currentPage=l,u())})});const c=s.querySelector(".ubits-pagination__select");c&&c.addEventListener("change",o=>{const n=o.target,t=parseInt(n.value);i.onItemsPerPageChange&&i.onItemsPerPageChange(t),i.itemsPerPage=t,i.currentPage=1,u()})}}}catch{}};return u(),{element:d,destroy:()=>{if(N){const v=d.querySelector(".ubits-data-table__scrollable-container")||d.querySelector(".ubits-data-table")||d;v&&v.removeEventListener("scroll",N),window.removeEventListener("scroll",N,!0),N=null}d&&d.parentNode&&d.parentNode.removeChild(d)},update:v=>{const M=i.showPagination;if(i={...i,...v},v.showPagination!==void 0&&v.showPagination!==M)if(v.showPagination){if(N){const f=d.querySelector(".ubits-data-table__scrollable-container")||d.querySelector(".ubits-data-table")||d;f&&f.removeEventListener("scroll",N),window.removeEventListener("scroll",N,!0),N=null}F=de}else F=de;v.columns&&(S=v.columns.filter(f=>f.visible!==!1).map(f=>f.id)),v.rows&&(j=v.rows.map(f=>f.id),F=de),u()}}}const ea={title:"Components/Data Table",tags:["autodocs"],parameters:{docs:{description:{component:"Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas."}}},argTypes:{columnReorderable:{control:"boolean",description:"Permite reordenar columnas mediante drag & drop",table:{defaultValue:{summary:"true"}}},rowReorderable:{control:"boolean",description:"Permite reordenar filas mediante drag & drop",table:{defaultValue:{summary:"true"}}},rowExpandable:{control:"boolean",description:"Muestra el icono de expandir/colapsar en las filas",table:{defaultValue:{summary:"true"}}},columnSortable:{control:"boolean",description:"Muestra botones de ordenamiento en los headers de las columnas",table:{defaultValue:{summary:"true"}}},showCheckbox:{control:"boolean",description:"Muestra la columna de checkbox para selección múltiple",table:{defaultValue:{summary:"true"}}},showVerticalScrollbar:{control:"boolean",description:"Muestra scrollbar vertical",table:{defaultValue:{summary:"false"}}},showHorizontalScrollbar:{control:"boolean",description:"Muestra scrollbar horizontal",table:{defaultValue:{summary:"false"}}},showColumnMenu:{control:"boolean",description:"Muestra el botón de menú (3 puntos) en los headers de las columnas. Usa este menú para fijar/desfijar columnas.",table:{defaultValue:{summary:"true"}}},checkboxSticky:{control:"boolean",description:"Hace que la columna de checkbox sea sticky (fija) al hacer scroll horizontal",table:{defaultValue:{summary:"false"}}},dragHandleSticky:{control:"boolean",description:"Hace que la columna de drag handle (mover filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowReorderable esté habilitado.",table:{defaultValue:{summary:"false"}}},expandSticky:{control:"boolean",description:"Hace que la columna de expand (desplegar filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowExpandable esté habilitado.",table:{defaultValue:{summary:"false"}}},columnsCount:{control:{type:"number",min:1,max:10,step:1},description:"Número de columnas de datos a mostrar (excluyendo checkbox)",table:{defaultValue:{summary:"3"}}},columnType1:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 1 (Nombre)",table:{defaultValue:{summary:"nombre"}}},columnType2:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 2 (Email)",table:{defaultValue:{summary:"correo"}}},columnType3:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 3 (Estado)",table:{defaultValue:{summary:"estado"}}},columnType4:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 4",table:{defaultValue:{summary:"nombre"}}},column1AvatarVariant:{control:{type:"select"},options:["photo","initials","icon"],description:"Variante de avatar para columna 1 (solo si es nombre-avatar o nombre-avatar-texto)",table:{defaultValue:{summary:"initials"}}},column1Editable:{control:"boolean",description:"Hacer editable la columna 1 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column2EmailClickable:{control:"boolean",description:"Hacer el email clicable en columna 2 (solo si es correo)",table:{defaultValue:{summary:"true"}}},column3Editable:{control:"boolean",description:"Hacer editable la columna 3 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column3RadioLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es radio)",table:{defaultValue:{summary:"false"}}},column3ToggleLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es toggle)",table:{defaultValue:{summary:"false"}}},column3CheckboxLabel:{control:"boolean",description:"Mostrar label en checkbox de columna 3 (solo si es tipo checkbox). Si es true, muestra el label automáticamente. Este checkbox es diferente al checkbox fijo (checkbox-2) que está en una columna separada.",table:{defaultValue:{summary:"true"}}},showPagination:{control:"boolean",description:"Muestra el paginador debajo de la tabla",table:{defaultValue:{summary:"false"}}},currentPage:{control:{type:"number",min:1,step:1},description:"Página actual",table:{defaultValue:{summary:"1"}}},itemsPerPage:{control:{type:"number",min:5,max:100,step:5},description:"Items por página",table:{defaultValue:{summary:"10"}}},paginationVariant:{control:{type:"select"},options:["default","compact","minimal"],description:"Variante del paginador",table:{defaultValue:{summary:"default"}}},paginationSize:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del paginador",table:{defaultValue:{summary:"md"}}}}},ye={render:e=>{const x=`story-render-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;console.log(`📖 [STORY] ========== INICIO RENDER [${x}] ==========`),console.log("📖 [STORY] Stack trace:",new Error().stack?.split(`
`).slice(1,4).join(`
`));const z=document.createElement("div");z.style.padding="20px",z.style.background="var(--ubits-bg-1, #ffffff)",z.style.borderRadius="8px",z.style.width="100%",z.style.maxWidth="100%";const y=`data-table-story-container-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,h=document.createElement("div");h.id=y,h.style.width="100%",h.style.overflow="auto";const b=z.querySelectorAll('[id^="data-table-story-container-"]');console.log("📖 [STORY] Contenedores existentes encontrados:",b.length),b.forEach(g=>{console.log("📖 [STORY] 🧹 Limpiando contenedor anterior:",g.id);const k=g.querySelector(".ubits-data-table"),Q=g.querySelector(".ubits-data-table__scrollable-container");if(Q){const R=Q.querySelector(".ubits-data-table");if(R){const H=R;if(H._dataTableInstance)try{const K=H._dataTableInstance;K&&typeof K.destroy=="function"&&(console.log("📖 [STORY] 🧹 Destruyendo instancia de tabla en scrollable container"),K.destroy())}catch(K){console.warn("Error destroying previous table instance:",K)}}}else if(k){const R=k;if(R._dataTableInstance)try{const H=R._dataTableInstance;H&&typeof H.destroy=="function"&&(console.log("📖 [STORY] 🧹 Destruyendo instancia de tabla directa"),H.destroy())}catch(H){console.warn("Error destroying previous table instance:",H)}}g.remove(),console.log("📖 [STORY] ✅ Contenedor anterior removido")});const p=e.columnsCount??3,w=e.columnType1??"nombre",d=e.columnType2??"correo",i=e.columnType3??"estado",S=e.columnType4??"nombre",j=e.columnType5??"nombre",P=e.columnType6??"nombre",E=e.columnType7??"pais",Z=e.columnType8??"fecha",ee=e.columnType9??"nombre",le=e.columnType10??"estado",de=e.column1AvatarVariant??"initials",F=e.column1Editable??!1,N=e.column2EmailClickable??!0,be=e.column3Editable??!1,ae=e.column3RadioLabel??!1,u=e.column3ToggleLabel??!1,ge=e.column3CheckboxLabel!==void 0?e.column3CheckboxLabel:!0,W={correo:{id:"email",title:"Email"},fecha:{id:"fecha",title:"Fecha"},nombre:{id:"nombre",title:"Nombre"},"nombre-avatar":{id:"nombre",title:"Nombre"},"nombre-avatar-texto":{id:"nombre",title:"Nombre"},estado:{id:"estado",title:"Estado"},progreso:{id:"progreso",title:"Progreso"},pais:{id:"pais",title:"País"},ciudad:{id:"ciudad",title:"Ciudad"},radio:{id:"radio",title:"Selección"},toggle:{id:"toggle",title:"Activo"},checkbox:{id:"checkbox-col",title:"Marcar"},telefono:{id:"telefono",title:"Teléfono"},categoria:{id:"categoria",title:"Categoría"},prioridad:{id:"prioridad",title:"Prioridad"}},Y=(g,k,Q,R={})=>{const H={id:k.id,title:k.title,type:g,visible:!0,width:Q};return(g==="nombre-avatar"||g==="nombre-avatar-texto")&&(H.avatarVariant=R.avatarVariant||"initials"),["nombre","nombre-avatar","nombre-avatar-texto","estado","fecha","checkbox","radio"].includes(g)&&(H.editable=R.editable||!1),g==="correo"&&(H.emailClickable=R.emailClickable!==void 0?R.emailClickable:!0),g==="radio"&&(H.radioLabel=R.radioLabel!==void 0?R.radioLabel:!1),g==="toggle"&&(H.toggleLabel=R.toggleLabel!==void 0?R.toggleLabel:!1),g==="checkbox"&&(H.checkboxLabel=R.checkboxLabel!==void 0?R.checkboxLabel:!0),H},v=W[w]||{id:"nombre",title:"Nombre"},M=Y(w,v,200,{avatarVariant:de,editable:F}),f=W[d]||{id:"email",title:"Email"},V=Y(d,f,250,{emailClickable:N,editable:F}),ce=W[i]||{id:"estado",title:"Estado"},ne=Y(i,ce,150,{editable:be,radioLabel:ae,toggleLabel:u,checkboxLabel:ge}),X=W[S]||{id:"progreso",title:"Progreso"},me=Y(S,X,180),fe=W[j]||{id:"telefono",title:"Teléfono"},L=W[P]||{id:"ciudad",title:"Ciudad"},B=W[E]||{id:"pais",title:"País"},q=W[Z]||{id:"fecha",title:"Fecha"},ie=W[ee]||{id:"categoria",title:"Categoría"},s=W[le]||{id:"prioridad",title:"Prioridad"},a=[M,V,ne,me,Y(j,fe,150),Y(P,L,150),Y(E,B,150),Y(Z,q,150),Y(ee,ie,150),Y(le,s,150)].slice(0,p),c=(g,k)=>({...g,radio:k===1,toggle:g.estado==="Activo","checkbox-col":k%2===0,area:g.area||"",textoComplementario:g.area||"",progreso:g.progreso||0,telefono:g.telefono||"",ciudad:g.ciudad||"",pais:g.pais||"",fecha:g.fecha||"",categoria:g.categoria||"",prioridad:g.prioridad||""}),n=[{id:1,nombre:"Juan Pérez",email:"juan.perez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"JP",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:2,nombre:"María García",email:"maria.garcia@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"MG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:3,nombre:"Carlos López",email:"carlos.lopez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"CL",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:4,nombre:"Ana Martínez",email:"ana.martinez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AM",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:5,nombre:"Pedro Rodríguez",email:"pedro.rodriguez@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"PR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:6,nombre:"Valentina Torres",email:"valentina.torres@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"VT",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:7,nombre:"Roberto Fernández",email:"roberto.fernandez@empresa.com",estado:"Inactivo",area:"Marketing",avatar:{initials:"RF",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:8,nombre:"Carmen Torres",email:"carmen.torres@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"CT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:9,nombre:"Diego Morales",email:"diego.morales@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"DM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:10,nombre:"Isabel Moreno",email:"isabel.moreno@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"IM",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:11,nombre:"Andrés Ramírez",email:"andres.ramirez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AR",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:12,nombre:"Patricia Sánchez",email:"patricia.sanchez@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"PS",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:13,nombre:"Fernando Castro",email:"fernando.castro@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"FC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:14,nombre:"Gabriela Herrera",email:"gabriela.herrera@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"GH",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:15,nombre:"Ricardo Mendoza",email:"ricardo.mendoza@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"RM",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:16,nombre:"Claudia Vargas",email:"claudia.vargas@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CV",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:17,nombre:"Javier Ortiz",email:"javier.ortiz@empresa.com",estado:"Inactivo",area:"Marketing",avatar:{initials:"JO",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:18,nombre:"Daniela Jiménez",email:"daniela.jimenez@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DJ",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:19,nombre:"Miguel Ángel Ruiz",email:"miguel.ruiz@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"MR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:20,nombre:"Elena Castillo",email:"elena.castillo@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"EC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:21,nombre:"Óscar Gutiérrez",email:"oscar.gutierrez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"OG",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:22,nombre:"Natalia Rojas",email:"natalia.rojas@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"NR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:23,nombre:"Luis Fernando Mejía",email:"luis.mejia@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:24,nombre:"Andrea Salazar",email:"andrea.salazar@empresa.com",estado:"Pendiente",area:"Recursos Humanos",avatar:{initials:"AS",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:25,nombre:"Cristian Peña",email:"cristian.pena@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"CP",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:26,nombre:"Monica Restrepo",email:"monica.restrepo@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"MR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:27,nombre:"Esteban Cardona",email:"esteban.cardona@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"EC",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:28,nombre:"Paola Agudelo",email:"paola.agudelo@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"PA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:29,nombre:"Sergio Velásquez",email:"sergio.velasquez@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"SV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:30,nombre:"Carolina Zapata",email:"carolina.zapata@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CZ",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:31,nombre:"Felipe Ospina",email:"felipe.ospina@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"FO",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:32,nombre:"Tatiana Montoya",email:"tatiana.montoya@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"TM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:33,nombre:"Alejandro Betancur",email:"alejandro.betancur@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"AB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:34,nombre:"Diana Cárdenas",email:"diana.cardenas@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"DC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:35,nombre:"Jorge Iván Londoño",email:"jorge.londono@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"JL",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:36,nombre:"Mariana Uribe",email:"mariana.uribe@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"MU",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:37,nombre:"Camilo Arango",email:"camilo.arango@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"CA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:38,nombre:"Liliana Osorio",email:"liliana.osorio@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"LO",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:39,nombre:"Andrés Felipe Quintero",email:"andres.quintero@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"AQ",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:40,nombre:"Sandra Milena Gómez",email:"sandra.gomez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"SG",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:41,nombre:"Héctor Fabio Muñoz",email:"hector.munoz@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"HM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:42,nombre:"Yenny Alexandra Parra",email:"yenny.parra@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"YP",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:43,nombre:"Jhon Jairo Vélez",email:"jhon.velez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"JV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:44,nombre:"Adriana Marcela Henao",email:"adriana.henao@empresa.com",estado:"Pendiente",area:"Recursos Humanos",avatar:{initials:"AH",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:45,nombre:"Edwin Mauricio Zapata",email:"edwin.zapata@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"EZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:46,nombre:"Mónica Patricia Bedoya",email:"monica.bedoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"MB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:47,nombre:"William Alberto Giraldo",email:"william.giraldo@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"WG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:48,nombre:"Angélica María Cano",email:"angelica.cano@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:49,nombre:"Leonardo Fabio Ríos",email:"leonardo.rios@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"LR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:50,nombre:"Claudia Patricia Arbeláez",email:"claudia.arbelaez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CA",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:51,nombre:"Jairo Alonso Tobón",email:"jairo.tobon@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:52,nombre:"Gloria Inés Mejía",email:"gloria.mejia@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"GM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:53,nombre:"Mauricio Esteban Lopera",email:"mauricio.lopera@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"ML",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:54,nombre:"Beatriz Elena Castrillón",email:"beatriz.castrillon@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"BC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:55,nombre:"César Augusto Restrepo",email:"cesar.restrepo@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CR",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:56,nombre:"Dora Luz Aguirre",email:"dora.aguirre@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:57,nombre:"Óscar Darío Valencia",email:"oscar.valencia@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"OV",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:58,nombre:"Nubia Esperanza Cardona",email:"nubia.cardona@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"NC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:59,nombre:"Alberto Mario Zapata",email:"alberto.zapata@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"AZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:60,nombre:"Esperanza María Ochoa",email:"esperanza.ochoa@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"EO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:61,nombre:"Jorge Mario Gallego",email:"jorge.gallego@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JG",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:62,nombre:"Blanca Nubia Arango",email:"blanca.arango@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"BA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:63,nombre:"Fabio Nelson Uribe",email:"fabio.uribe@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"FU",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:64,nombre:"Martha Cecilia Londoño",email:"martha.londono@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"ML",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:65,nombre:"Hernán Darío Osorio",email:"hernan.osorio@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"HO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:66,nombre:"Luz Dary Montoya",email:"luz.montoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:67,nombre:"Carlos Mario Betancur",email:"carlos.betancur@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"CB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:68,nombre:"Olga Lucía Cárdenas",email:"olga.cardenas@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"OC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:69,nombre:"Jairo Hernán Quintero",email:"jairo.quintero@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JQ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:70,nombre:"Amparo Gómez",email:"amparo.gomez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AG",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:71,nombre:"Gustavo Adolfo Muñoz",email:"gustavo.munoz@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"GM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:72,nombre:"Rosa Elena Parra",email:"rosa.parra@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"RP",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:73,nombre:"Alvaro de Jesús Vélez",email:"alvaro.velez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:74,nombre:"María Eugenia Henao",email:"maria.henao@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"MH",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:75,nombre:"Jhonatan Zapata",email:"jhonatan.zapata@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"JZ",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:76,nombre:"Yolanda Bedoya",email:"yolanda.bedoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"YB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:77,nombre:"Edison Giraldo",email:"edison.giraldo@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"EG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:78,nombre:"Luz Marina Cano",email:"luz.cano@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"LC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:79,nombre:"Jhon Fredy Ríos",email:"jhon.rios@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:80,nombre:"Nancy Arbeláez",email:"nancy.arbelaez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"NA",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:81,nombre:"Jairo Tobón",email:"jairo.tobon2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:82,nombre:"Gloria Mejía",email:"gloria.mejia2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"GM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:83,nombre:"Mauricio Lopera",email:"mauricio.lopera2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"ML",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:84,nombre:"Beatriz Castrillón",email:"beatriz.castrillon2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"BC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:85,nombre:"César Restrepo",email:"cesar.restrepo2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CR",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:86,nombre:"Dora Aguirre",email:"dora.aguirre2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:87,nombre:"Óscar Valencia",email:"oscar.valencia2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"OV",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:88,nombre:"Nubia Cardona",email:"nubia.cardona2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"NC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:89,nombre:"Alberto Zapata",email:"alberto.zapata2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"AZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:90,nombre:"Esperanza Ochoa",email:"esperanza.ochoa2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"EO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:91,nombre:"Jorge Gallego",email:"jorge.gallego2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JG",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:92,nombre:"Blanca Arango",email:"blanca.arango2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"BA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:93,nombre:"Fabio Uribe",email:"fabio.uribe2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"FU",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:94,nombre:"Martha Londoño",email:"martha.londono2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"ML",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:95,nombre:"Hernán Osorio",email:"hernan.osorio2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"HO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:96,nombre:"Luz Montoya",email:"luz.montoya2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:97,nombre:"Carlos Betancur",email:"carlos.betancur2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"CB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:98,nombre:"Olga Cárdenas",email:"olga.cardenas2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"OC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:99,nombre:"Jairo Quintero",email:"jairo.quintero2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JQ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:100,nombre:"Amparo Gómez",email:"amparo.gomez2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AG",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}}].map(k=>({id:k.id,data:c({nombre:k.nombre,email:k.email,estado:k.estado,area:k.area,progreso:Math.floor(Math.random()*100),telefono:`+57 ${300+k.id} ${Math.floor(Math.random()*1e3)} ${Math.floor(Math.random()*1e4)}`,ciudad:["Bogotá","Medellín","Cali","Barranquilla","Cartagena"][Math.floor(Math.random()*5)],pais:"Colombia",fecha:`2024-${String(Math.floor(Math.random()*12)+1).padStart(2,"0")}-${String(Math.floor(Math.random()*28)+1).padStart(2,"0")}`,categoria:k.area,prioridad:["Alta","Media","Baja"][Math.floor(Math.random()*3)],"checkbox-2":!1,avatar:k.avatar},k.id),expanded:!1,renderExpandedContent:k.id===1?Q=>`
            <div style="padding: var(--ubits-spacing-md, 16px);">
              <h4 style="margin: 0 0 var(--ubits-spacing-sm, 8px) 0; font-size: var(--ubits-font-size-sm, 14px); font-weight: 600; color: var(--ubits-fg-1-high, #1f2937);">
                Información adicional
              </h4>
              <p style="margin: 0; font-size: var(--ubits-font-size-sm, 13px); color: var(--ubits-fg-1-medium, #6b7280);">
                Detalles adicionales para ${Q.nombre}
              </p>
            </div>
          `:void 0})),t=e.dragHandleSticky??!1,r=t?!0:e.rowReorderable??!0,l=e.expandSticky??!1,A=l?!0:e.rowExpandable??!0;console.log("📖 [STORY] ========== ESTADO INICIAL DE COLUMNAS =========="),console.log("📖 [STORY] Columnas antes de crear tabla:",a.map(g=>({id:g.id,title:g.title,pinned:g.pinned||!1,type:g.type}))),console.log("📖 [STORY] ========== FIN ESTADO INICIAL ==========");const C={containerId:h.id,columns:a,rows:n,columnReorderable:e.columnReorderable??!0,rowReorderable:r,rowExpandable:A,columnSortable:e.columnSortable??!0,showCheckbox:e.showCheckbox??!0,showVerticalScrollbar:e.showVerticalScrollbar??!1,showHorizontalScrollbar:e.showHorizontalScrollbar??!1,showColumnMenu:e.showColumnMenu??!0,checkboxSticky:e.checkboxSticky??!1,dragHandleSticky:t,expandSticky:l,showPagination:e.showPagination??!1,currentPage:e.currentPage??1,itemsPerPage:e.itemsPerPage??10,paginationVariant:e.paginationVariant??"default",paginationSize:e.paginationSize??"md",onPageChange:g=>{console.log("Page changed to:",g),e.onPageChange&&e.onPageChange(g)},onItemsPerPageChange:g=>{console.log("Items per page changed to:",g),e.onItemsPerPageChange&&e.onItemsPerPageChange(g)},onRowExpand:(g,k)=>{console.log("Row expanded:",g,k)},onColumnReorder:g=>{console.log("Columns reordered:",g)},onRowReorder:g=>{console.log("Rows reordered:",g)},onSort:(g,k)=>{console.log("Column sorted:",g,k)},onColumnPin:(g,k)=>{console.log("📌 [STORY] ========== onColumnPin CALLBACK =========="),console.log("📌 [STORY] columnId:",g),console.log("📌 [STORY] pinned:",k),console.log("📌 [STORY] Stack trace:",new Error().stack?.split(`
`).slice(1,4).join(`
`)),console.log("📌 [STORY] ========== FIN onColumnPin CALLBACK ==========")},onRowSelect:(g,k)=>{console.log("Row selected:",g,k)},onSelectAll:g=>{console.log("Select all:",g)}};z.appendChild(h),console.log("📖 [STORY] Contenedor agregado al DOM. ID:",y),console.log("📖 [STORY] Tipos de columna:",{columnType1:w,columnType2:d,columnType3:i,columnType4:S,columnsCount:a.length}),console.log("📖 [STORY] Container ID:",y);const _=()=>{const g=document.getElementById(y);if(!g)return console.warn(`⚠️ [STORY] Contenedor ${y} no encontrado en DOM`),!1;const k=g.querySelector(".ubits-data-table"),Q=g.querySelector(".ubits-data-table__scrollable-container");if(k||Q)return console.log("📖 [STORY] ⚠️ Ya existe una tabla en el contenedor, omitiendo creación"),!1;console.log("📖 [STORY] Contenedor encontrado, creando tabla..."),console.log("📖 [STORY] Opciones pasadas a createDataTable:",{containerId:C.containerId,columnsCount:C.columns.length,showColumnMenu:C.showColumnMenu,columnsPinned:C.columns.filter(H=>H.pinned).map(H=>H.id)});const R=Ne(C);return console.log("📖 [STORY] ✅ Tabla creada, instancia:",R),window.__storybookDataTableInstance=R,console.log("📖 [STORY] Instancia guardada en window.__storybookDataTableInstance"),!0};return requestAnimationFrame(()=>{try{_()||setTimeout(()=>{_()},50)}catch(g){console.error("❌ [STORY] Error creating data table:",g)}console.log(`📖 [STORY] ========== FIN RENDER [${x}] ==========`)}),z},args:{columnReorderable:!0,rowReorderable:!0,rowExpandable:!0,columnSortable:!0,showCheckbox:!0,showVerticalScrollbar:!1,showHorizontalScrollbar:!1,showColumnMenu:!0,checkboxSticky:!1,dragHandleSticky:!1,expandSticky:!1,columnsCount:3,columnType1:"nombre",columnType2:"correo",columnType3:"estado",columnType4:"nombre",column1AvatarVariant:"initials",column1Editable:!1,column2EmailClickable:!0,column3Editable:!1,column3RadioLabel:!1,column3ToggleLabel:!1,column3CheckboxLabel:!1,showPagination:!1,currentPage:1,itemsPerPage:10,paginationVariant:"default",paginationSize:"md"}};ye.parameters={...ye.parameters,docs:{...ye.parameters?.docs,source:{originalSource:`{
  render: args => {
    const renderId = \`story-render-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
    console.log(\`📖 [STORY] ========== INICIO RENDER [\${renderId}] ==========\`);
    console.log(\`📖 [STORY] Stack trace:\`, new Error().stack?.split('\\n').slice(1, 4).join('\\n'));

    // Contenedor principal con estilos UBITS
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '100%';

    // Contenedor para la tabla - crear uno nuevo cada vez pero con ID único
    // Usar un ID único basado en timestamp para evitar conflictos entre renders
    const tableContainerId = \`data-table-story-container-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.width = '100%';
    tableContainer.style.overflow = 'auto';

    // Buscar y limpiar cualquier tabla anterior en el contenedor principal
    // Esto previene renderizados duplicados cuando se cambian los tipos de columna
    const existingContainers = container.querySelectorAll('[id^="data-table-story-container-"]');
    console.log(\`📖 [STORY] Contenedores existentes encontrados:\`, existingContainers.length);
    existingContainers.forEach(oldContainer => {
      console.log(\`📖 [STORY] 🧹 Limpiando contenedor anterior:\`, oldContainer.id);
      // Buscar tabla directa o dentro de contenedor scrollable
      const oldTable = oldContainer.querySelector('.ubits-data-table');
      const oldScrollableContainer = oldContainer.querySelector('.ubits-data-table__scrollable-container');
      if (oldScrollableContainer) {
        const tableInside = oldScrollableContainer.querySelector('.ubits-data-table');
        if (tableInside) {
          const tableElement = tableInside as HTMLElement;
          if ((tableElement as any)._dataTableInstance) {
            try {
              const instance = (tableElement as any)._dataTableInstance;
              if (instance && typeof instance.destroy === 'function') {
                console.log(\`📖 [STORY] 🧹 Destruyendo instancia de tabla en scrollable container\`);
                instance.destroy();
              }
            } catch (e) {
              console.warn('Error destroying previous table instance:', e);
            }
          }
        }
      } else if (oldTable) {
        const tableElement = oldTable as HTMLElement;
        if ((tableElement as any)._dataTableInstance) {
          try {
            const instance = (tableElement as any)._dataTableInstance;
            if (instance && typeof instance.destroy === 'function') {
              console.log(\`📖 [STORY] 🧹 Destruyendo instancia de tabla directa\`);
              instance.destroy();
            }
          } catch (e) {
            console.warn('Error destroying previous table instance:', e);
          }
        }
      }
      oldContainer.remove();
      console.log(\`📖 [STORY] ✅ Contenedor anterior removido\`);
    });

    // Generar columnas dinámicamente según columnsCount
    const columnsCount = args.columnsCount ?? 3;

    // Tipos de columna disponibles (pueden ser controlados desde Storybook)
    // Leer directamente de args para asegurar que se actualicen cuando cambien
    // Valores por defecto coinciden con la web: nombre, correo, estado (sin progreso por defecto)
    const columnType1 = args.columnType1 ?? 'nombre';
    const columnType2 = args.columnType2 ?? 'correo';
    const columnType3 = args.columnType3 ?? 'estado';
    const columnType4 = args.columnType4 ?? 'nombre';
    const columnType5 = (args as any).columnType5 ?? 'nombre';
    const columnType6 = (args as any).columnType6 ?? 'nombre';
    const columnType7 = (args as any).columnType7 ?? 'pais';
    const columnType8 = (args as any).columnType8 ?? 'fecha';
    const columnType9 = (args as any).columnType9 ?? 'nombre';
    const columnType10 = (args as any).columnType10 ?? 'estado';

    // Controles adicionales para columnas
    const column1AvatarVariant = args.column1AvatarVariant ?? 'initials';
    const column1Editable = args.column1Editable ?? false;
    const column2EmailClickable = args.column2EmailClickable ?? true;
    const column3Editable = args.column3Editable ?? false;
    const column3RadioLabel = args.column3RadioLabel ?? false;
    const column3ToggleLabel = args.column3ToggleLabel ?? false;
    // Para checkbox, por defecto mostrar label (true) para diferenciarlo del checkbox fijo
    const column3CheckboxLabel = args.column3CheckboxLabel !== undefined ? args.column3CheckboxLabel : true;

    // Construir columnas con sus controles
    // IMPORTANTE: Construir desde cero para evitar propiedades residuales cuando cambia el tipo

    // Mapeo de tipos a IDs y títulos (usar para todas las columnas)
    // IMPORTANTE: Los IDs deben coincidir con los campos de datos en las filas
    // Para tipos interactivos (radio, toggle, checkbox), usamos IDs únicos para evitar conflictos
    const columnTypeMapping: Record<string, {
      id: string;
      title: string;
    }> = {
      'correo': {
        id: 'email',
        title: 'Email'
      },
      'fecha': {
        id: 'fecha',
        title: 'Fecha'
      },
      'nombre': {
        id: 'nombre',
        title: 'Nombre'
      },
      'nombre-avatar': {
        id: 'nombre',
        title: 'Nombre'
      },
      'nombre-avatar-texto': {
        id: 'nombre',
        title: 'Nombre'
      },
      'estado': {
        id: 'estado',
        title: 'Estado'
      },
      'progreso': {
        id: 'progreso',
        title: 'Progreso'
      },
      'pais': {
        id: 'pais',
        title: 'País'
      },
      'ciudad': {
        id: 'ciudad',
        title: 'Ciudad'
      },
      'radio': {
        id: 'radio',
        title: 'Selección'
      },
      'toggle': {
        id: 'toggle',
        title: 'Activo'
      },
      'checkbox': {
        id: 'checkbox-col',
        title: 'Marcar'
      },
      'telefono': {
        id: 'telefono',
        title: 'Teléfono'
      },
      'categoria': {
        id: 'categoria',
        title: 'Categoría'
      },
      'prioridad': {
        id: 'prioridad',
        title: 'Prioridad'
      }
    };

    // Función helper para construir columnas limpiamente según el tipo
    const buildColumn = (columnType: string, config: {
      id: string;
      title: string;
    }, width: number, options: {
      avatarVariant?: 'photo' | 'initials' | 'icon';
      editable?: boolean;
      emailClickable?: boolean;
      radioLabel?: boolean;
      toggleLabel?: boolean;
      checkboxLabel?: boolean;
    } = {}): TableColumn => {
      const column: TableColumn = {
        id: config.id,
        title: config.title,
        type: columnType as any,
        visible: true,
        width: width
      };

      // Agregar propiedades SOLO según el tipo actual
      if (columnType === 'nombre-avatar' || columnType === 'nombre-avatar-texto') {
        column.avatarVariant = options.avatarVariant || 'initials';
      }
      const editableTypes = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
      if (editableTypes.includes(columnType)) {
        column.editable = options.editable || false;
      }
      if (columnType === 'correo') {
        column.emailClickable = options.emailClickable !== undefined ? options.emailClickable : true;
      }
      if (columnType === 'radio') {
        column.radioLabel = options.radioLabel !== undefined ? options.radioLabel : false;
      }
      if (columnType === 'toggle') {
        column.toggleLabel = options.toggleLabel !== undefined ? options.toggleLabel : false;
      }
      if (columnType === 'checkbox') {
        // Por defecto, mostrar label para diferenciarlo del checkbox fijo (checkbox-2)
        // Si checkboxLabel es true, se mostrará el label automáticamente
        // Si checkboxLabel es un string, se usará ese texto como label
        // Si checkboxLabel es false, no se mostrará label
        column.checkboxLabel = options.checkboxLabel !== undefined ? options.checkboxLabel : true;
      }

      // IMPORTANTE: NO agregar propiedades de otros tipos - esto previene que aparezcan en tipos incorrectos

      return column;
    };

    // Columna 1 - ID y título dinámicos según el tipo
    const col1Config = columnTypeMapping[columnType1] || {
      id: 'nombre',
      title: 'Nombre'
    };
    const col1 = buildColumn(columnType1, col1Config, 200, {
      avatarVariant: column1AvatarVariant,
      editable: column1Editable
    });

    // Columna 2 - ID y título dinámicos según el tipo
    const col2Config = columnTypeMapping[columnType2] || {
      id: 'email',
      title: 'Email'
    };
    const col2 = buildColumn(columnType2, col2Config, 250, {
      emailClickable: column2EmailClickable,
      editable: column1Editable // Usar el control de columna 1 para simplicidad
    });

    // Columna 3 - ID y título dinámicos según el tipo
    const col3Config = columnTypeMapping[columnType3] || {
      id: 'estado',
      title: 'Estado'
    };
    const col3 = buildColumn(columnType3, col3Config, 150, {
      editable: column3Editable,
      radioLabel: column3RadioLabel,
      toggleLabel: column3ToggleLabel,
      checkboxLabel: column3CheckboxLabel
    });

    // Columna 4 - ID y título dinámicos según el tipo
    const col4Config = columnTypeMapping[columnType4] || {
      id: 'progreso',
      title: 'Progreso'
    };
    const col4 = buildColumn(columnType4, col4Config, 180);

    // Columnas adicionales (5-10) - también con ID y título dinámicos
    const col5Config = columnTypeMapping[columnType5] || {
      id: 'telefono',
      title: 'Teléfono'
    };
    const col6Config = columnTypeMapping[columnType6] || {
      id: 'ciudad',
      title: 'Ciudad'
    };
    const col7Config = columnTypeMapping[columnType7] || {
      id: 'pais',
      title: 'País'
    };
    const col8Config = columnTypeMapping[columnType8] || {
      id: 'fecha',
      title: 'Fecha'
    };
    const col9Config = columnTypeMapping[columnType9] || {
      id: 'categoria',
      title: 'Categoría'
    };
    const col10Config = columnTypeMapping[columnType10] || {
      id: 'prioridad',
      title: 'Prioridad'
    };
    const allColumns: TableColumn[] = [col1, col2, col3, col4, buildColumn(columnType5, col5Config, 150), buildColumn(columnType6, col6Config, 150), buildColumn(columnType7, col7Config, 150), buildColumn(columnType8, col8Config, 150), buildColumn(columnType9, col9Config, 150), buildColumn(columnType10, col10Config, 150)];

    // Seleccionar solo las columnas necesarias según columnsCount
    const columns: TableColumn[] = allColumns.slice(0, columnsCount);

    // Función helper para enriquecer los datos de las filas con campos para tipos interactivos
    // Coincide con la implementación de la web
    const enrichRowData = (rowData: any, rowId: number) => {
      return {
        ...rowData,
        // Campos para tipos interactivos
        radio: rowId === 1,
        // Solo el primer radio está seleccionado por defecto
        toggle: rowData.estado === 'Activo',
        // Toggle activo si el estado es 'Activo'
        'checkbox-col': rowId % 2 === 0,
        // Checkbox alternado para demostración
        // Campo para nombre-avatar-texto (texto complementario debajo del nombre)
        area: rowData.area || '',
        // Área de trabajo
        textoComplementario: rowData.area || '',
        // Texto complementario
        // Campos adicionales para cuando se usen tipos específicos
        progreso: rowData.progreso || 0,
        telefono: rowData.telefono || '',
        ciudad: rowData.ciudad || '',
        pais: rowData.pais || '',
        fecha: rowData.fecha || '',
        categoria: rowData.categoria || '',
        prioridad: rowData.prioridad || ''
      };
    };

    // Función helper para generar todas las 100 filas (igual que en la web)
    const generateAllRows = (): TableRow[] => {
      const allRowsData = [{
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan.perez@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'JP',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 2,
        nombre: 'María García',
        email: 'maria.garcia@empresa.com',
        estado: 'Inactivo',
        area: 'Diseño',
        avatar: {
          initials: 'MG',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 3,
        nombre: 'Carlos López',
        email: 'carlos.lopez@empresa.com',
        estado: 'Activo',
        area: 'Marketing',
        avatar: {
          initials: 'CL',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 4,
        nombre: 'Ana Martínez',
        email: 'ana.martinez@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'AM',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 5,
        nombre: 'Pedro Rodríguez',
        email: 'pedro.rodriguez@empresa.com',
        estado: 'Pendiente',
        area: 'Ventas',
        avatar: {
          initials: 'PR',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 6,
        nombre: 'Valentina Torres',
        email: 'valentina.torres@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'VT',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 7,
        nombre: 'Roberto Fernández',
        email: 'roberto.fernandez@empresa.com',
        estado: 'Inactivo',
        area: 'Marketing',
        avatar: {
          initials: 'RF',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 8,
        nombre: 'Carmen Torres',
        email: 'carmen.torres@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'CT',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 9,
        nombre: 'Diego Morales',
        email: 'diego.morales@empresa.com',
        estado: 'Pendiente',
        area: 'Ventas',
        avatar: {
          initials: 'DM',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 10,
        nombre: 'Isabel Moreno',
        email: 'isabel.moreno@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'IM',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 11,
        nombre: 'Andrés Ramírez',
        email: 'andres.ramirez@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'AR',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 12,
        nombre: 'Patricia Sánchez',
        email: 'patricia.sanchez@empresa.com',
        estado: 'Inactivo',
        area: 'Diseño',
        avatar: {
          initials: 'PS',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 13,
        nombre: 'Fernando Castro',
        email: 'fernando.castro@empresa.com',
        estado: 'Activo',
        area: 'Marketing',
        avatar: {
          initials: 'FC',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 14,
        nombre: 'Gabriela Herrera',
        email: 'gabriela.herrera@empresa.com',
        estado: 'Pendiente',
        area: 'Ventas',
        avatar: {
          initials: 'GH',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 15,
        nombre: 'Ricardo Mendoza',
        email: 'ricardo.mendoza@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'RM',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 16,
        nombre: 'Claudia Vargas',
        email: 'claudia.vargas@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'CV',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 17,
        nombre: 'Javier Ortiz',
        email: 'javier.ortiz@empresa.com',
        estado: 'Inactivo',
        area: 'Marketing',
        avatar: {
          initials: 'JO',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 18,
        nombre: 'Daniela Jiménez',
        email: 'daniela.jimenez@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'DJ',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 19,
        nombre: 'Miguel Ángel Ruiz',
        email: 'miguel.ruiz@empresa.com',
        estado: 'Pendiente',
        area: 'Ventas',
        avatar: {
          initials: 'MR',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 20,
        nombre: 'Elena Castillo',
        email: 'elena.castillo@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'EC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 21,
        nombre: 'Óscar Gutiérrez',
        email: 'oscar.gutierrez@empresa.com',
        estado: 'Activo',
        area: 'Marketing',
        avatar: {
          initials: 'OG',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 22,
        nombre: 'Natalia Rojas',
        email: 'natalia.rojas@empresa.com',
        estado: 'Inactivo',
        area: 'Diseño',
        avatar: {
          initials: 'NR',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 23,
        nombre: 'Luis Fernando Mejía',
        email: 'luis.mejia@empresa.com',
        estado: 'Activo',
        area: 'Ventas',
        avatar: {
          initials: 'LM',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 24,
        nombre: 'Andrea Salazar',
        email: 'andrea.salazar@empresa.com',
        estado: 'Pendiente',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'AS',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 25,
        nombre: 'Cristian Peña',
        email: 'cristian.pena@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'CP',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 26,
        nombre: 'Monica Restrepo',
        email: 'monica.restrepo@empresa.com',
        estado: 'Activo',
        area: 'Marketing',
        avatar: {
          initials: 'MR',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 27,
        nombre: 'Esteban Cardona',
        email: 'esteban.cardona@empresa.com',
        estado: 'Inactivo',
        area: 'Diseño',
        avatar: {
          initials: 'EC',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 28,
        nombre: 'Paola Agudelo',
        email: 'paola.agudelo@empresa.com',
        estado: 'Activo',
        area: 'Ventas',
        avatar: {
          initials: 'PA',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 29,
        nombre: 'Sergio Velásquez',
        email: 'sergio.velasquez@empresa.com',
        estado: 'Pendiente',
        area: 'Desarrollo',
        avatar: {
          initials: 'SV',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 30,
        nombre: 'Carolina Zapata',
        email: 'carolina.zapata@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'CZ',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 31,
        nombre: 'Felipe Ospina',
        email: 'felipe.ospina@empresa.com',
        estado: 'Activo',
        area: 'Marketing',
        avatar: {
          initials: 'FO',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 32,
        nombre: 'Tatiana Montoya',
        email: 'tatiana.montoya@empresa.com',
        estado: 'Inactivo',
        area: 'Diseño',
        avatar: {
          initials: 'TM',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 33,
        nombre: 'Alejandro Betancur',
        email: 'alejandro.betancur@empresa.com',
        estado: 'Activo',
        area: 'Ventas',
        avatar: {
          initials: 'AB',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 34,
        nombre: 'Diana Cárdenas',
        email: 'diana.cardenas@empresa.com',
        estado: 'Pendiente',
        area: 'Desarrollo',
        avatar: {
          initials: 'DC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 35,
        nombre: 'Jorge Iván Londoño',
        email: 'jorge.londono@empresa.com',
        estado: 'Activo',
        area: 'Marketing',
        avatar: {
          initials: 'JL',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 36,
        nombre: 'Mariana Uribe',
        email: 'mariana.uribe@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'MU',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 37,
        nombre: 'Camilo Arango',
        email: 'camilo.arango@empresa.com',
        estado: 'Inactivo',
        area: 'Diseño',
        avatar: {
          initials: 'CA',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 38,
        nombre: 'Liliana Osorio',
        email: 'liliana.osorio@empresa.com',
        estado: 'Activo',
        area: 'Ventas',
        avatar: {
          initials: 'LO',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 39,
        nombre: 'Andrés Felipe Quintero',
        email: 'andres.quintero@empresa.com',
        estado: 'Pendiente',
        area: 'Desarrollo',
        avatar: {
          initials: 'AQ',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 40,
        nombre: 'Sandra Milena Gómez',
        email: 'sandra.gomez@empresa.com',
        estado: 'Activo',
        area: 'Marketing',
        avatar: {
          initials: 'SG',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 41,
        nombre: 'Héctor Fabio Muñoz',
        email: 'hector.munoz@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'HM',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 42,
        nombre: 'Yenny Alexandra Parra',
        email: 'yenny.parra@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'YP',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 43,
        nombre: 'Jhon Jairo Vélez',
        email: 'jhon.velez@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'JV',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 44,
        nombre: 'Adriana Marcela Henao',
        email: 'adriana.henao@empresa.com',
        estado: 'Pendiente',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'AH',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 45,
        nombre: 'Edwin Mauricio Zapata',
        email: 'edwin.zapata@empresa.com',
        estado: 'Activo',
        area: 'Marketing',
        avatar: {
          initials: 'EZ',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 46,
        nombre: 'Mónica Patricia Bedoya',
        email: 'monica.bedoya@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'MB',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 47,
        nombre: 'William Alberto Giraldo',
        email: 'william.giraldo@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'WG',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 48,
        nombre: 'Angélica María Cano',
        email: 'angelica.cano@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'AC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 49,
        nombre: 'Leonardo Fabio Ríos',
        email: 'leonardo.rios@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'LR',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 50,
        nombre: 'Claudia Patricia Arbeláez',
        email: 'claudia.arbelaez@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'CA',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 51,
        nombre: 'Jairo Alonso Tobón',
        email: 'jairo.tobon@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'JT',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 52,
        nombre: 'Gloria Inés Mejía',
        email: 'gloria.mejia@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'GM',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 53,
        nombre: 'Mauricio Esteban Lopera',
        email: 'mauricio.lopera@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'ML',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 54,
        nombre: 'Beatriz Elena Castrillón',
        email: 'beatriz.castrillon@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'BC',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 55,
        nombre: 'César Augusto Restrepo',
        email: 'cesar.restrepo@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'CR',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 56,
        nombre: 'Dora Luz Aguirre',
        email: 'dora.aguirre@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'DA',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 57,
        nombre: 'Óscar Darío Valencia',
        email: 'oscar.valencia@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'OV',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 58,
        nombre: 'Nubia Esperanza Cardona',
        email: 'nubia.cardona@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'NC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 59,
        nombre: 'Alberto Mario Zapata',
        email: 'alberto.zapata@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'AZ',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 60,
        nombre: 'Esperanza María Ochoa',
        email: 'esperanza.ochoa@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'EO',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 61,
        nombre: 'Jorge Mario Gallego',
        email: 'jorge.gallego@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'JG',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 62,
        nombre: 'Blanca Nubia Arango',
        email: 'blanca.arango@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'BA',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 63,
        nombre: 'Fabio Nelson Uribe',
        email: 'fabio.uribe@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'FU',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 64,
        nombre: 'Martha Cecilia Londoño',
        email: 'martha.londono@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'ML',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 65,
        nombre: 'Hernán Darío Osorio',
        email: 'hernan.osorio@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'HO',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 66,
        nombre: 'Luz Dary Montoya',
        email: 'luz.montoya@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'LM',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 67,
        nombre: 'Carlos Mario Betancur',
        email: 'carlos.betancur@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'CB',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 68,
        nombre: 'Olga Lucía Cárdenas',
        email: 'olga.cardenas@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'OC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 69,
        nombre: 'Jairo Hernán Quintero',
        email: 'jairo.quintero@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'JQ',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 70,
        nombre: 'Amparo Gómez',
        email: 'amparo.gomez@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'AG',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 71,
        nombre: 'Gustavo Adolfo Muñoz',
        email: 'gustavo.munoz@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'GM',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 72,
        nombre: 'Rosa Elena Parra',
        email: 'rosa.parra@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'RP',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 73,
        nombre: 'Alvaro de Jesús Vélez',
        email: 'alvaro.velez@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'AV',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 74,
        nombre: 'María Eugenia Henao',
        email: 'maria.henao@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'MH',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 75,
        nombre: 'Jhonatan Zapata',
        email: 'jhonatan.zapata@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'JZ',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 76,
        nombre: 'Yolanda Bedoya',
        email: 'yolanda.bedoya@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'YB',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 77,
        nombre: 'Edison Giraldo',
        email: 'edison.giraldo@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'EG',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 78,
        nombre: 'Luz Marina Cano',
        email: 'luz.cano@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'LC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 79,
        nombre: 'Jhon Fredy Ríos',
        email: 'jhon.rios@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'JR',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 80,
        nombre: 'Nancy Arbeláez',
        email: 'nancy.arbelaez@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'NA',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 81,
        nombre: 'Jairo Tobón',
        email: 'jairo.tobon2@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'JT',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 82,
        nombre: 'Gloria Mejía',
        email: 'gloria.mejia2@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'GM',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 83,
        nombre: 'Mauricio Lopera',
        email: 'mauricio.lopera2@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'ML',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 84,
        nombre: 'Beatriz Castrillón',
        email: 'beatriz.castrillon2@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'BC',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 85,
        nombre: 'César Restrepo',
        email: 'cesar.restrepo2@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'CR',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 86,
        nombre: 'Dora Aguirre',
        email: 'dora.aguirre2@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'DA',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 87,
        nombre: 'Óscar Valencia',
        email: 'oscar.valencia2@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'OV',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 88,
        nombre: 'Nubia Cardona',
        email: 'nubia.cardona2@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'NC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 89,
        nombre: 'Alberto Zapata',
        email: 'alberto.zapata2@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'AZ',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 90,
        nombre: 'Esperanza Ochoa',
        email: 'esperanza.ochoa2@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'EO',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 91,
        nombre: 'Jorge Gallego',
        email: 'jorge.gallego2@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'JG',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 92,
        nombre: 'Blanca Arango',
        email: 'blanca.arango2@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'BA',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 93,
        nombre: 'Fabio Uribe',
        email: 'fabio.uribe2@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'FU',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 94,
        nombre: 'Martha Londoño',
        email: 'martha.londono2@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'ML',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 95,
        nombre: 'Hernán Osorio',
        email: 'hernan.osorio2@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'HO',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 96,
        nombre: 'Luz Montoya',
        email: 'luz.montoya2@empresa.com',
        estado: 'Activo',
        area: 'Diseño',
        avatar: {
          initials: 'LM',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 97,
        nombre: 'Carlos Betancur',
        email: 'carlos.betancur2@empresa.com',
        estado: 'Inactivo',
        area: 'Ventas',
        avatar: {
          initials: 'CB',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 98,
        nombre: 'Olga Cárdenas',
        email: 'olga.cardenas2@empresa.com',
        estado: 'Activo',
        area: 'Desarrollo',
        avatar: {
          initials: 'OC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 99,
        nombre: 'Jairo Quintero',
        email: 'jairo.quintero2@empresa.com',
        estado: 'Pendiente',
        area: 'Marketing',
        avatar: {
          initials: 'JQ',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      }, {
        id: 100,
        nombre: 'Amparo Gómez',
        email: 'amparo.gomez2@empresa.com',
        estado: 'Activo',
        area: 'Recursos Humanos',
        avatar: {
          initials: 'AG',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      }];
      return allRowsData.map(rowData => ({
        id: rowData.id,
        data: enrichRowData({
          nombre: rowData.nombre,
          email: rowData.email,
          estado: rowData.estado,
          area: rowData.area,
          progreso: Math.floor(Math.random() * 100),
          telefono: \`+57 \${300 + rowData.id} \${Math.floor(Math.random() * 1000)} \${Math.floor(Math.random() * 10000)}\`,
          ciudad: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'][Math.floor(Math.random() * 5)],
          pais: 'Colombia',
          fecha: \`2024-\${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-\${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}\`,
          categoria: rowData.area,
          prioridad: ['Alta', 'Media', 'Baja'][Math.floor(Math.random() * 3)],
          'checkbox-2': false,
          avatar: rowData.avatar
        }, rowData.id),
        expanded: false,
        renderExpandedContent: rowData.id === 1 ? data => {
          return \`
            <div style="padding: var(--ubits-spacing-md, 16px);">
              <h4 style="margin: 0 0 var(--ubits-spacing-sm, 8px) 0; font-size: var(--ubits-font-size-sm, 14px); font-weight: 600; color: var(--ubits-fg-1-high, #1f2937);">
                Información adicional
              </h4>
              <p style="margin: 0; font-size: var(--ubits-font-size-sm, 13px); color: var(--ubits-fg-1-medium, #6b7280);">
                Detalles adicionales para \${data.nombre}
              </p>
            </div>
          \`;
        } : undefined
      }));
    };

    // Filas que coinciden con la implementación de la web (100 filas)
    // Incluir todos los campos necesarios para que funcionen con cualquier tipo de columna
    const rows: TableRow[] = generateAllRows();

    // Si dragHandleSticky está activado, asegurar que rowReorderable también esté activado
    // porque el drag-handle solo se crea cuando rowReorderable es true
    const dragHandleStickyValue = (args as any).dragHandleSticky ?? false;
    const rowReorderableValue = dragHandleStickyValue ? true : args.rowReorderable ?? true;

    // Si expandSticky está activado, asegurar que rowExpandable también esté activado
    const expandStickyValue = (args as any).expandSticky ?? false;
    const rowExpandableValue = expandStickyValue ? true : args.rowExpandable ?? true;

    // Log del estado inicial de las columnas antes de crear la tabla
    console.log('📖 [STORY] ========== ESTADO INICIAL DE COLUMNAS ==========');
    console.log('📖 [STORY] Columnas antes de crear tabla:', columns.map(col => ({
      id: col.id,
      title: col.title,
      pinned: col.pinned || false,
      type: col.type
    })));
    console.log('📖 [STORY] ========== FIN ESTADO INICIAL ==========');
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      // Valores por defecto coinciden con la web: columnReorderable y rowReorderable son true
      columnReorderable: args.columnReorderable ?? true,
      rowReorderable: rowReorderableValue,
      rowExpandable: rowExpandableValue,
      columnSortable: args.columnSortable ?? true,
      showCheckbox: args.showCheckbox ?? true,
      showVerticalScrollbar: args.showVerticalScrollbar ?? false,
      showHorizontalScrollbar: args.showHorizontalScrollbar ?? false,
      showColumnMenu: args.showColumnMenu ?? true,
      checkboxSticky: (args as any).checkboxSticky ?? false,
      dragHandleSticky: dragHandleStickyValue,
      expandSticky: expandStickyValue,
      // Opciones de paginación
      showPagination: args.showPagination ?? false,
      currentPage: args.currentPage ?? 1,
      itemsPerPage: args.itemsPerPage ?? 10,
      paginationVariant: args.paginationVariant ?? 'default',
      paginationSize: args.paginationSize ?? 'md',
      onPageChange: page => {
        console.log('Page changed to:', page);
        // En Storybook, actualizar el args para que se refleje en los controles
        if ((args as any).onPageChange) {
          (args as any).onPageChange(page);
        }
      },
      onItemsPerPageChange: itemsPerPage => {
        console.log('Items per page changed to:', itemsPerPage);
        // En Storybook, actualizar el args para que se refleje en los controles
        if ((args as any).onItemsPerPageChange) {
          (args as any).onItemsPerPageChange(itemsPerPage);
        }
      },
      onRowExpand: (rowId, expanded) => {
        console.log('Row expanded:', rowId, expanded);
      },
      onColumnReorder: columnIds => {
        console.log('Columns reordered:', columnIds);
      },
      onRowReorder: rowIds => {
        console.log('Rows reordered:', rowIds);
      },
      onSort: (columnId, direction) => {
        console.log('Column sorted:', columnId, direction);
      },
      onColumnPin: (columnId, pinned) => {
        console.log('📌 [STORY] ========== onColumnPin CALLBACK ==========');
        console.log('📌 [STORY] columnId:', columnId);
        console.log('📌 [STORY] pinned:', pinned);
        console.log('📌 [STORY] Stack trace:', new Error().stack?.split('\\n').slice(1, 4).join('\\n'));
        // El sistema interno ya actualiza el estado y re-renderiza
        // Este callback es solo para notificar cambios externos si es necesario
        console.log('📌 [STORY] ========== FIN onColumnPin CALLBACK ==========');
      },
      onRowSelect: (rowId, selected) => {
        console.log('Row selected:', rowId, selected);
      },
      onSelectAll: selected => {
        console.log('Select all:', selected);
      }
    };

    // Agregar el contenedor de la tabla al contenedor principal
    container.appendChild(tableContainer);
    console.log(\`📖 [STORY] Contenedor agregado al DOM. ID:\`, tableContainerId);

    // Inicializar la tabla después de que se monte en el DOM
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    console.log(\`📖 [STORY] Tipos de columna:\`, {
      columnType1,
      columnType2,
      columnType3,
      columnType4,
      columnsCount: columns.length
    });
    console.log(\`📖 [STORY] Container ID:\`, tableContainerId);

    // Verificar si ya hay una tabla en el contenedor antes de crear una nueva
    // Esto previene renderizados duplicados cuando Storybook llama al render múltiples veces
    const checkAndCreateTable = () => {
      const containerElement = document.getElementById(tableContainerId);
      if (!containerElement) {
        console.warn(\`⚠️ [STORY] Contenedor \${tableContainerId} no encontrado en DOM\`);
        return false;
      }

      // Verificar si ya hay una tabla en este contenedor
      const existingTable = containerElement.querySelector('.ubits-data-table');
      const existingScrollable = containerElement.querySelector('.ubits-data-table__scrollable-container');
      if (existingTable || existingScrollable) {
        console.log(\`📖 [STORY] ⚠️ Ya existe una tabla en el contenedor, omitiendo creación\`);
        return false;
      }
      console.log(\`📖 [STORY] Contenedor encontrado, creando tabla...\`);
      console.log(\`📖 [STORY] Opciones pasadas a createDataTable:\`, {
        containerId: options.containerId,
        columnsCount: options.columns.length,
        showColumnMenu: options.showColumnMenu,
        columnsPinned: options.columns.filter(col => col.pinned).map(col => col.id)
      });
      const tableInstance = createDataTable(options);
      console.log(\`📖 [STORY] ✅ Tabla creada, instancia:\`, tableInstance);

      // Guardar referencia a la instancia para poder inspeccionarla
      (window as any).__storybookDataTableInstance = tableInstance;
      console.log(\`📖 [STORY] Instancia guardada en window.__storybookDataTableInstance\`);
      return true;
    };
    requestAnimationFrame(() => {
      try {
        if (!checkAndCreateTable()) {
          // Si no se pudo crear, reintentar después de un pequeño delay
          setTimeout(() => {
            checkAndCreateTable();
          }, 50);
        }
      } catch (error) {
        console.error(\`❌ [STORY] Error creating data table:\`, error);
      }
      console.log(\`📖 [STORY] ========== FIN RENDER [\${renderId}] ==========\`);
    });
    return container;
  },
  args: {
    // Valores por defecto coinciden con la web
    columnReorderable: true,
    rowReorderable: true,
    rowExpandable: true,
    columnSortable: true,
    showCheckbox: true,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: true,
    checkboxSticky: false,
    dragHandleSticky: false,
    expandSticky: false,
    columnsCount: 3,
    // Coincide con la web (3 columnas por defecto)
    columnType1: 'nombre',
    // Coincide con la web (nombre simple, no nombre-avatar)
    columnType2: 'correo',
    columnType3: 'estado',
    columnType4: 'nombre',
    // Cambiado de 'progreso' para que coincida mejor
    column1AvatarVariant: 'initials',
    column1Editable: false,
    column2EmailClickable: true,
    column3Editable: false,
    column3RadioLabel: false,
    column3ToggleLabel: false,
    column3CheckboxLabel: false,
    showPagination: false,
    currentPage: 1,
    itemsPerPage: 10,
    paginationVariant: 'default',
    paginationSize: 'md'
  }
}`,...ye.parameters?.docs?.source}}};const aa=["Default"];export{ye as Default,aa as __namedExportsOrder,ea as default};
