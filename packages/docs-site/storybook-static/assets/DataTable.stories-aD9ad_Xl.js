const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CalendarProvider-BYVqZ8Vm.js","./preload-helper-PPVm8Dsz.js"])))=>i.map(i=>d[i]);
import{_ as xe}from"./preload-helper-PPVm8Dsz.js";import{r as ue}from"./CheckboxProvider-DIr0OIhT.js";import{r as we}from"./ProgressProvider-OoWtyPYr.js";import{r as ve}from"./StatusTagProvider-BsgFC12L.js";import{r as ee}from"./AvatarProvider-CF4x-oFR.js";import{r as Se}from"./ToggleProvider-tayloMCw.js";import{r as Ee}from"./RadioButtonProvider-CIXtywXC.js";import{r as Ce}from"./ButtonProvider-NeRKx_iR.js";import{c as he,r as Le}from"./ListProvider-rXce0ADx.js";import{createScrollbar as fe}from"./ScrollProvider-BVL7eCy8.js";import"./iframe-CHGeu5ha.js";import"./SpinnerProvider-o6XHV06V.js";function ke(o,h,H){const C=h.data[o.id],r=h.data;switch(H){case"nombre":{const d=C||r.nombre||r.name||"";return o.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${d}</span>`:`<span class="ubits-body-md-regular">${d}</span>`}case"progreso":{let d=null;if(C!=null){if(typeof C=="number")d=C;else if(typeof C=="string"){const f=parseFloat(C.replace("%","").trim());isNaN(f)||(d=f)}}if(d===null&&r){const f=r.progress!==void 0?r.progress:r.progreso;if(f!=null){if(typeof f=="number")d=f;else if(typeof f=="string"){const b=parseFloat(f.replace("%","").trim());isNaN(b)||(d=b)}}}return d===null&&(d=50),d=Math.max(0,Math.min(100,d)),we({value:d,size:"sm",variant:"default",indicator:`${Math.round(d)}%`})}case"nombre-avatar":{const d=C||r.nombre||r.name||"",u=r.avatar||r.avatarUrl||null,f=o.avatarVariant||"initials",b=y=>y.split(" ").map(T=>T[0]).join("").toUpperCase().slice(0,2)||"U";let v="";if(f==="photo"){let y=null;u&&typeof u=="string"?y=u:u&&typeof u=="object"&&(y=u.imageUrl||u.url||null),!y&&r&&(y=r.imageUrl||r.avatarUrl||r.avatarImage||null),y?v=ee({imageUrl:y,size:"sm"}):v=ee({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(f==="initials")if(u&&typeof u=="object"&&u.initials)v=ee({initials:u.initials,size:"sm"});else{const y=b(d);v=ee({initials:y,size:"sm"})}else{const y=u&&typeof u=="object"&&u.icon?u.icon:"user";v=ee({icon:y,size:"sm"})}const k=o.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${d}</span>`:`<span class="ubits-body-md-regular">${d}</span>`;return`
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${v}
          ${k}
        </div>
      `}case"nombre-avatar-texto":{const d=C||r.nombre||r.name||"",u=r.avatar||r.avatarUrl||null,f=r.area||r.areaNombre||r.textoComplementario||r.complementario||"",b=o.avatarVariant||"initials",v=y=>y.split(" ").map(T=>T[0]).join("").toUpperCase().slice(0,2)||"U";let S="";if(b==="photo"){let y=null;u&&typeof u=="string"?y=u:u&&typeof u=="object"&&(y=u.imageUrl||u.url||null),!y&&r&&(y=r.imageUrl||r.avatarUrl||r.avatarImage||null),y?S=ee({imageUrl:y,size:"sm"}):S=ee({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(b==="initials")if(u&&typeof u=="object"&&u.initials)S=ee({initials:u.initials,size:"sm"});else{const y=v(d);S=ee({initials:y,size:"sm"})}else{const y=u&&typeof u=="object"&&u.icon?u.icon:"user";S=ee({icon:y,size:"sm"})}const k=`<span class="ubits-body-md-regular">${d}</span>`;return`
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm, 12px);">
          ${S}
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${k}
            ${f?`<span class="ubits-body-sm-regular" style="color: var(--ubits-fg-1-medium);">${f}</span>`:""}
          </div>
        </div>
      `}case"estado":{const d={activo:"active",inactivo:"disabled",pendiente:"pending",completado:"completed",publicado:"published",cumplido:"fulfilled",creado:"created",error:"not-fulfilled",denegado:"denied",borrador:"draft","en-progreso":"in-progress",sincronizando:"syncing","pendiente-aprobacion":"pending-approval","no-iniciado":"not-started",finalizado:"finished",archivado:"archived",deshabilitado:"disabled",pausado:"paused",oculto:"hidden",cancelado:"denied"},u=C||r.estado||r.status||"pendiente",f=String(u).toLowerCase().trim(),b=d[f]||d.pendiente,S={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"}[b]||String(u),k=o.editable,y=ve({label:S,status:b,size:"xs",rightIcon:k?"chevron-down":null,clickable:k});return k?`
          <div class="ubits-data-table__status-editable" data-row-id="${h.id}" data-column-id="${o.id}" data-editable="true" data-current-status="${b}">
            ${y}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${h.id}-${o.id}" style="display: none;"></div>
          </div>
        `:y}case"radio":{const d=C===!0||C==="true"||C===1||C===h.id||C===String(h.id),u=o.radioLabel!==!1&&o.radioLabel!==void 0,f=typeof o.radioLabel=="string"?o.radioLabel:u?String(h.data[o.id]||h.id):"",b=o.editable===!0,v=!b;return Ee({label:f,name:`radio-${o.id}`,value:String(h.id),checked:d,size:"md",disabled:v}).replace("<input",`<input data-row-id="${h.id}" data-column-id="${o.id}" data-radio-button="true" ${b?'data-editable="true"':""}`)}case"toggle":{const d=C===!0||C==="true"||C===1,u=o.toggleLabel!==!1&&o.toggleLabel!==void 0,f=typeof o.toggleLabel=="string"?o.toggleLabel:u?String(h.data[o.id]||h.id):"";return Se({label:f,checked:d,size:"md"}).replace("<input",`<input data-row-id="${h.id}" data-column-id="${o.id}" data-toggle-button="true"`)}case"checkbox":{const d=C===!0||C==="true"||C===1,u=o.checkboxLabel!==!1&&o.checkboxLabel!==void 0,f=typeof o.checkboxLabel=="string"?o.checkboxLabel:u?String(h.data[o.id]||h.id):"",b=o.editable===!0;return ue({label:f,checked:d,size:"md",disabled:!b}).replace("<input",`<input data-row-id="${h.id}" data-column-id="${o.id}" data-checkbox-button="true" ${b?'data-editable="true"':""}`)}case"correo":{const d=C||"";return o.emailClickable!==!1?`<a href="mailto:${d}" class="ubits-body-md-regular" style="color: var(--ubits-accent-brand-static-inverted); text-decoration: none;">${d}</a>`:`<span class="ubits-body-md-regular">${d}</span>`}case"acciones":return Ce({text:"Eliminar",variant:"tertiary",size:"sm",icon:"trash",iconStyle:"regular",className:"ubits-data-table__action-button"});case"fecha":{const d=C||"";return o.editable?`
          <div class="ubits-data-table__date-editable" data-row-id="${h.id}" data-column-id="${o.id}" data-editable="true">
            <span class="ubits-body-md-regular ubits-data-table__date-display">${d||"Seleccionar fecha"}</span>
            <div class="ubits-data-table__calendar-container" style="position: absolute; top: 100%; left: 0; z-index: 99999; margin-top: 4px; display: none;"></div>
          </div>
        `:`<span class="ubits-body-md-regular">${d}</span>`}case"area":return`<span class="ubits-body-md-regular">${C||"Desarrollo"}</span>`;case"lider":return`<span class="ubits-body-md-regular">${C||"Juan Pérez"}</span>`;case"pais":return`<span class="ubits-body-md-regular">${C||"Colombia"}</span>`;case"ciudad":return`<span class="ubits-body-md-regular">${C||"Bogotá"}</span>`;case"drag-handle":return`
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${h.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;case"expand":{const d=h.expanded||!1;return`
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${d?"Colapsar":"Expandir"} fila"
          data-row-id="${h.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${d?"down":"right"}" aria-hidden="true"></i>
        </button>
      `}default:return`<span class="ubits-body-md-regular">${C||""}</span>`}}function Te(o,h,H=0){if(o.id==="checkbox"||o.id.startsWith("checkbox-")){const u=h.data[o.id]||!1;console.log("📦 [CELL] Renderizando celda checkbox, column.id:",o.id,"row.id:",h.id,"checkboxValue:",u);const b=ue({label:"",checked:u,size:"md",className:"ubits-data-table__cell-checkbox"}).replace("<input",`<input data-row-id="${h.id}" data-column-id="${o.id}" aria-label="Checkbox ${o.title}"`),v=o.id==="checkbox-2"?"12px":"var(--ubits-spacing-md, 16px)",S=o.pinned?" ubits-data-table__cell--pinned":"",k=o.pinned?`position: sticky !important; left: ${H}px !important; z-index: 12 !important;`:"",T=`${`text-align: center; vertical-align: middle; padding-left: ${v} !important;`}${k?" "+k:""}`;o.pinned&&console.log("📌 [CELL CHECKBOX] Columna fijada detectada:",{columnId:o.id,rowId:h.id,pinned:o.pinned,pinnedLeft:H,pinnedClass:S,pinnedStyle:k,cellStyle:T,hasPinnedClass:S.includes("pinned"),hasPinnedStyle:k.includes("left"),hasPositionStyle:k.includes("sticky")});const m=`
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${S}" data-column-id="${o.id}" ${o.pinned?'data-pinned="true"':""} style="${T}">
        ${b}
      </td>
    `;return console.log("📦 [CELL] Celda HTML generada para",o.id,"row",h.id,"length:",m.length),console.log("📦 [CELL] ¿Celda contiene checkbox-2?",m.includes("checkbox-2")),m}if(o.type){const u=ke(o,h,o.type),f=o.editable&&(o.type==="nombre"||o.type==="nombre-avatar"||o.type==="estado"||o.type==="fecha"||o.type==="checkbox"||o.type==="radio")&&o.type!=="drag-handle"&&o.type!=="expand",b=o.type==="drag-handle"?"ubits-data-table__cell--drag-handle":o.type==="expand"?"ubits-data-table__cell--expand":`ubits-data-table__cell--${o.type}`,v=f?"ubits-data-table__cell--editable":"",S=o.pinned?" ubits-data-table__cell--pinned":"",k=o.type==="drag-handle"||o.type==="expand"?"text-align: center; vertical-align: middle;":"",y=o.pinned?`position: sticky; left: ${H}px;`:"",T=`${k}${y?" "+y:""}`,m=T?` style="${T}"`:"";o.pinned&&console.log("📌 [CELL TIPO] Columna fijada detectada:",{columnId:o.id,columnType:o.type,rowId:h.id,pinned:o.pinned,pinnedLeft:H,pinnedClass:S,pinnedStyle:y,hasPinnedClass:S.includes("pinned"),hasPinnedStyle:y.includes("left"),hasPositionStyle:y.includes("sticky")});const Z=f&&(o.type==="nombre"||o.type==="nombre-avatar"||o.type==="estado"||o.type==="fecha")?`data-row-id="${h.id}" data-column-id="${o.id}" data-editable="true"${o.pinned?' data-pinned="true"':""}`:`data-column-id="${o.id}"${o.pinned?' data-pinned="true"':""}`;return`
      <td class="ubits-data-table__cell ${b} ${v}${S}" ${Z}${m}>
        ${u}
      </td>
    `}const C=o.renderCell?o.renderCell(h.data):h.data[o.id]||"",r=o.pinned?" ubits-data-table__cell--pinned":"",d=o.pinned?` style="position: sticky; left: ${H}px;"`:"";return o.pinned&&console.log("📌 [CELL NORMAL] Columna fijada detectada:",{columnId:o.id,rowId:h.id,pinned:o.pinned,pinnedLeft:H,pinnedClass:r,pinnedStyle:d,hasPinnedClass:r.includes("pinned"),hasPinnedStyle:d.includes("left"),hasPositionStyle:d.includes("sticky")}),`
    <td class="ubits-data-table__cell${r}" data-column-id="${o.id}"${o.pinned?' data-pinned="true"':""}${d}>
      ${C}
    </td>
  `}function Ie(o,h=!1,H=!0,C=[],r=null,d=null,u=!0,f=0){if(o.type==="drag-handle"||o.type==="expand"){const _=o.pinned?" ubits-data-table__column-header--pinned":"",D=o.pinned?`position: sticky !important; left: ${f}px !important; z-index: 10 !important;`:"",B=o.width?`width: ${o.width}px;`:"",z=[D,B].filter(Boolean).join(" "),U=z?`style="${z}"`:"";return`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${o.type}${_}" 
        ${U}
        data-column-id="${o.id}"
        ${o.pinned?'data-pinned="true"':""}
      >
      </th>
    `}if(o.id==="checkbox"||o.id.startsWith("checkbox-")){console.log("📋 [HEADER] Renderizando header de checkbox, column.id:",o.id);const _=C.length>0&&C.every(t=>t.data[o.id]===!0),D=C.some(t=>t.data[o.id]===!0);console.log("📋 [HEADER] allChecked:",_,"someChecked:",D,"rows.length:",C.length);const z=ue({label:"",checked:_,indeterminate:D&&!_,size:"md",className:"ubits-data-table__column-checkbox-header"}).replace("<input",`<input data-column-checkbox-header="${o.id}" aria-label="Seleccionar todos ${o.title}"`),U=o.pinned?" ubits-data-table__column-header--pinned":"",R=o.pinned?`position: sticky !important; left: ${f}px !important; z-index: 10 !important;`:"",w=o.width?`width: ${o.width}px;`:"",g=[R,w].filter(Boolean).join(" "),l=g?`style="${g}"`:"",e=`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${U}" 
        ${l}
        data-column-id="${o.id}"
        ${o.pinned?'data-pinned="true"':""}
      >
        ${z}
      </th>
    `;return console.log("📋 [HEADER] Header HTML generado para",o.id,"length:",e.length),console.log("📋 [HEADER] ¿Header contiene checkbox-2?",e.includes("checkbox-2")),e}const b=o.id==="checkbox"||o.id.startsWith("checkbox-"),v=o.type==="drag-handle"||o.type==="expand",S=h&&!b&&!v?`
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${o.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  `:"",k=!b&&!v&&H?(()=>{const _=r===o.id,D=_?" ubits-data-table__column-sort--active":"";let B="arrow-up-a-z",z="fas fa-sort-alpha-up";_&&d&&(d==="asc"?(B="arrow-up-a-z",z="fas fa-sort-alpha-up"):(B="arrow-down-a-z",z="fas fa-sort-alpha-down"));const U=`
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${D}" 
           data-column-id="${o.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${o.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${B}"></wa-icon>
        <i class="${z}" aria-hidden="true"></i>
      </div>
    `;return console.log("✅ [SORT BUTTON] Botón creado para:",{columnId:o.id,columnTitle:o.title,isSorted:_,sortDirection:d,iconName:B,htmlLength:U.length}),U})():"";!k&&!b&&console.log("⚠️ [SORT BUTTON] No se creó botón para:",{columnId:o.id,columnTitle:o.title,isCheckboxColumn:b,isControlColumn:v,columnSortable:H});const y=!b&&!v&&u?Ce({variant:"tertiary",size:"xs",icon:"ellipsis",iconStyle:"solid",iconOnly:!0,className:"ubits-data-table__column-menu-button",attributes:{"aria-label":`Menú de opciones de ${o.title}`,"data-column-id":o.id,"data-menu-button":"true"}}):"",T=`
    <div class="ubits-data-table__column-header-content">
      ${S}
      <span class="ubits-data-table__column-title">${o.title}</span>
      <div class="ubits-data-table__column-actions">
        ${k}
        ${y}
      </div>
    </div>
  `,m=o.pinned?" ubits-data-table__column-header--pinned":"",Z=o.pinned?`left: ${f}px !important;`:"",te=o.width?`width: ${o.width}px;`:"",O=o.pinned?"position: sticky !important;":"",A=o.pinned?"z-index: 10 !important;":"",M=[O,Z,A,te].filter(Boolean).join(" ");o.pinned&&console.log("📌 [HEADER] Columna fijada detectada en renderColumnHeader:",{columnId:o.id,columnTitle:o.title,pinned:o.pinned,pinnedLeft:f,pinnedClass:m,pinnedStyle:Z,positionStyle:O,widthStyle:te,combinedStyle:M,combinedStyleLength:M.length,combinedStyleIncludesSticky:M.includes("sticky"),combinedStyleIncludesLeft:M.includes("left"),hasPinnedClass:m.includes("pinned"),hasPinnedStyle:Z.includes("left"),hasPositionStyle:O.includes("sticky"),willApplyStyle:!!M});const E=M?`style="${M}"`:"";o.pinned&&console.log("📌 [HEADER PRE-HTML] Antes de construir HTML:",{columnId:o.id,pinned:o.pinned,combinedStyle:M,combinedStyleLength:M.length,styleAttribute:E,willIncludeStyle:!!E});const I=`
    <th 
      class="ubits-data-table__column-header${m}" 
      ${E} 
      data-column-id="${o.id}"
      ${o.pinned?'data-pinned="true"':""}
    >
      ${T}
    </th>
  `;return o.pinned&&console.log("📌 [HEADER HTML] HTML generado para columna fijada:",{columnId:o.id,htmlLength:I.length,htmlIncludesSticky:I.includes("sticky"),htmlIncludesLeft:I.includes("left"),htmlIncludesPosition:I.includes("position"),htmlIncludesWidth:I.includes("width"),styleAttributeInHTML:I.includes("style="),htmlPreview:I.substring(0,400)}),I}function Re(o,h,H,C=[]){const r=o.expanded||!1,d=h.filter(v=>v.visible!==!1),u=d.map((v,S)=>{const k=C[S]||0;return Te(v,o,k)}).join(""),f=["ubits-data-table__row",r?"ubits-data-table__row--expanded":""].filter(Boolean).join(" ");H===0&&(console.log("🔍 [ROW ALIGNMENT] ========== PRIMERA FILA =========="),console.log("📊 row.id:",o.id),console.log("📊 visibleColumns count:",d.length),console.log("📊 visibleColumns IDs:",d.map(v=>v.id)),console.log("📊 cellsHTML count (td tags):",(u.match(/<td/g)||[]).length),console.log("📊 Total cells count:",(u.match(/<td/g)||[]).length),console.log("🔍 [ROW ALIGNMENT] ========== FIN =========="));let b=`
    <tr class="${f}" data-row-id="${o.id}">
      ${u}
    </tr>
  `;if(r&&o.renderExpandedContent){const v=o.renderExpandedContent(o.data),S=d.length;b+=`
      <tr class="ubits-data-table__row-expanded-row">
        <td class="ubits-data-table__row-expanded-content" colspan="${S}">
          ${v}
        </td>
      </tr>
    `}return b}function ye(o,h=[],H=[]){const{columns:C,rows:r,className:d="",columnReorderable:u=!1,columnSortable:f=!0,rowReorderable:b=!1,rowExpandable:v=!0,showCheckbox:S=!0,showVerticalScrollbar:k=!1,showHorizontalScrollbar:y=!1,showColumnMenu:T=!0}=o;console.log("🎨 [RENDER] ========== INICIO RENDER =========="),console.log("🎨 [RENDER] renderDataTable llamado con showCheckbox:",S),console.log("🎨 [RENDER] renderDataTable llamado con showVerticalScrollbar:",k),console.log("🎨 [RENDER] renderDataTable llamado con showHorizontalScrollbar:",y),console.log("🎨 [RENDER] renderDataTable llamado con showColumnMenu:",T),console.log("🎨 [RENDER] Columnas recibidas:",C.map(e=>({id:e.id,visible:e.visible,pinned:e.pinned}))),console.log("🎨 [RENDER] Número de filas:",r.length),console.log("🎨 [RENDER] Estado pinned de columnas:",C.map(e=>({id:e.id,pinned:e.pinned,pinnedType:typeof e.pinned})));let m=C.filter(e=>e.visible!==!1);if(m=m.filter(e=>e.id!=="checkbox"),console.log("🔍 [CHECKBOX] Columna checkbox eliminada. Columnas restantes:",m.map(e=>e.id)),h.length>0){const e=h.filter(a=>a!=="checkbox"),t=new Map(m.map(a=>[a.id,a]));m=e.map(a=>t.get(a)).filter(a=>a!==void 0).concat(m.filter(a=>!e.includes(a.id)))}if(console.log("🎯 [CHECKBOX-2] Evaluando showCheckbox:",S,"(showCheckbox !== false:",S!==!1,")"),S!==!1){const e=m.some(t=>t.id==="checkbox-2");if(console.log("🎯 [CHECKBOX-2] checkbox2Exists:",e),e)console.log("🔍 [CHECKBOX-2] La columna checkbox-2 ya existe");else{console.log("🔍 [CHECKBOX-2] Creando nueva columna checkbox-2 al inicio");const t={id:"checkbox-2",title:"",type:void 0,visible:!0,width:48};m.unshift(t),console.log("🔍 [CHECKBOX-2] Columna agregada al inicio. IDs de columnas visibles:",m.map(a=>a.id))}}else{const e=m.map(a=>a.id);m=m.filter(a=>a.id!=="checkbox-2");const t=m.map(a=>a.id);console.log("🔍 [CHECKBOX-2] Columna checkbox-2 eliminada porque showCheckbox es false"),console.log("🔍 [CHECKBOX-2] Antes del filtro:",e),console.log("🔍 [CHECKBOX-2] Después del filtro:",t)}if(console.log("🎯 [CHECKBOX-2] Columnas finales antes de renderizar:",m.map(e=>e.id)),b){if(!m.some(t=>t.type==="drag-handle")){const t={id:"drag-handle",title:"",type:"drag-handle",visible:!0,width:32};m.unshift(t),console.log("🔧 [CONTROLS] Columna drag-handle agregada")}}else m=m.filter(e=>e.type!=="drag-handle");if(v){if(!m.some(t=>t.type==="expand")){const t={id:"expand",title:"",type:"expand",visible:!0,width:32},a=m.findIndex(s=>s.type==="drag-handle");a>=0?m.splice(a+1,0,t):m.unshift(t),console.log("🔧 [CONTROLS] Columna expand agregada")}}else m=m.filter(e=>e.type!=="expand");const{checkboxSticky:Z=!1,dragHandleSticky:te=!1,expandSticky:O=!1}=o;m=m.map(e=>{const t={...e};return e.id==="checkbox-2"&&Z===!0?(t.pinned=!0,console.log("🔧 [STICKY] Checkbox marcado como pinned")):e.type==="drag-handle"&&te===!0?(t.pinned=!0,console.log("🔧 [STICKY] Drag-handle marcado como pinned")):e.type==="expand"&&O===!0?(t.pinned=!0,console.log("🔧 [STICKY] Expand marcado como pinned")):(e.id==="checkbox-2"||e.type==="drag-handle"||e.type==="expand")&&(t.pinned=!1),t});const A=o.sortColumnId||null,M=o.sortDirection||null;let E=[...r];if(H.length>0){const e=new Map(r.map(t=>[t.id,t]));E=H.map(t=>e.get(t)).filter(t=>t!==void 0).concat(r.filter(t=>!H.includes(t.id)))}A&&M&&(E=[...E].sort((e,t)=>{const a=e.data[A],s=t.data[A];if(a==null&&s==null)return 0;if(a==null)return 1;if(s==null)return-1;const n=String(a).toLowerCase(),i=String(s).toLowerCase();let c=0;return n<i?c=-1:n>i&&(c=1),M==="asc"?c:-c})),console.log("🔍 [HEADER ALIGNMENT] ========== INICIO =========="),console.log("📊 rowReorderable:",b),console.log("📊 rowExpandable:",v),console.log("📊 visibleColumns count:",m.length),console.log("📊 visibleColumns IDs:",m.map(e=>e.id));const I=(e,t,a)=>{let s=0;const n={columnId:e.id,columnIndex:t,steps:[]};for(let i=0;i<t;i++){const c=a[i];if(c&&c.pinned){let p=c.width;p||(c.type==="drag-handle"||c.type==="expand"?p=32:c.id==="checkbox-2"?p=48:p=150),s+=p,n.steps.push({step:`columna-${c.id}`,added:p,total:s,reason:`Columna fijada anterior: ${c.id} (tipo: ${c.type||"normal"})`})}else c&&!c.pinned&&n.steps.push({step:`columna-${c.id}`,added:0,total:s,reason:`Columna anterior no fijada: ${c.id}`})}return n.finalLeft=s,e.pinned&&console.log("📌 [PINNED LEFT] Cálculo detallado para columna",e.id,":",n),s};console.log("🔍 [RENDER HEADERS] Iniciando renderizado de headers..."),console.log("🔍 [RENDER HEADERS] showCheckbox:",S),console.log("🔍 [RENDER HEADERS] Columnas con pinned:",m.filter(e=>e.pinned).map(e=>({id:e.id,pinned:e.pinned})));const _=m.map((e,t)=>{const a=e.pinned?I(e,t,m):0;return e.pinned&&console.log("🔍 [RENDER HEADERS] Columna fijada:",e.id,"index:",t,"pinnedLeft calculado:",a),Ie(e,u,f,E,A,M,T,a)}).join("");console.log("📊 columnHeadersHTML length:",_.length),console.log("📊 columnHeadersHTML preview:",_.substring(0,200)),console.log("🔍 [RENDER ROWS] Iniciando renderizado de filas..."),console.log("🔍 [RENDER ROWS] Número de filas:",E.length);const D=E.map((e,t)=>{const a=m.map((s,n)=>{if(s.pinned){const i=I(s,n,m);return t===0&&console.log("🔍 [RENDER ROWS] Fila 0, columna fijada:",s.id,"colIndex:",n,"pinnedLeft:",i),i}return 0});return Re(e,m,t,a)}).join("");console.log("📊 rowsHTML count:",E.length),console.log("📊 rowsHTML preview:",D.substring(0,300));const B=["ubits-data-table",d].filter(Boolean).join(" "),z=m.length;console.log("📊 Total headers count:",z),console.log("📊 - columnHeaders:",m.length);const U=`
    <table class="${B} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${_}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${D}
      </tbody>
    </table>
  `.trim(),R=m.some(e=>e.pinned);console.log("📊 [SCROLL] showVerticalScrollbar:",k),console.log("📊 [SCROLL] showHorizontalScrollbar:",y),console.log("📊 [SCROLL] hasPinnedColumns:",R),console.log("📊 [SCROLL] Columnas fijadas:",m.filter(e=>e.pinned).map(e=>({id:e.id,type:e.type}))),console.log("📊 [SCROLL] tableHTML length:",U.length),console.log("📊 [SCROLL] ¿Hay checkbox-2 en columnHeadersHTML?",_.includes("checkbox-2")),console.log("📊 [SCROLL] ¿Hay checkbox-2 en rowsHTML?",D.includes("checkbox-2"));let w=y;R&&!y&&(console.log("⚠️ [SCROLL] ⚠️ Hay columnas fijadas pero no hay scroll horizontal activo"),console.log("⚠️ [SCROLL] ⚠️ Activando scroll horizontal automáticamente para que sticky funcione"),w=!0);const g=m.reduce((e,t)=>{const a=t.width||150;return e+a});console.log("📊 [SCROLL] Ancho total de columnas calculado:",g,"px"),console.log("📊 [SCROLL] Número de columnas visibles:",m.length),console.log("📊 [SCROLL] Anchos de columnas:",m.map(e=>({id:e.id,width:e.width||150})));let l;if(k||w){const e=[];k&&e.push("ubits-data-table__scrollable-container--vertical"),w&&e.push("ubits-data-table__scrollable-container--horizontal"),console.log("📊 [SCROLL] ✅ Envolviendo tabla en contenedor scrollable"),console.log("📊 [SCROLL] Clases de scroll:",e.join(" ")),console.log("📊 [SCROLL] showHorizontalScrollbar activo:",y),console.log("📊 [SCROLL] Ancho total esperado de columnas:",g,"px"),l=`<div class="ubits-data-table__scrollable-container ${e.join(" ")}">${U}</div>`,console.log("📊 [SCROLL] HTML con contenedor scrollable generado, length:",l.length),console.log("📊 [SCROLL] ¿HTML contiene scrollable-container?",l.includes("scrollable-container")),console.log("📊 [SCROLL] ¿HTML contiene scrollable-container--horizontal?",l.includes("scrollable-container--horizontal")),console.log("📊 [SCROLL] ¿HTML contiene checkbox-2?",l.includes("checkbox-2"))}else console.log("📊 [SCROLL] ❌ NO envolviendo, usando tabla directamente"),l=U;return console.log("📊 [SCROLL] HTML final length:",l.length),console.log("📊 [SCROLL] HTML final preview (primeros 800 chars):",l.substring(0,800)),console.log("📊 [SCROLL] ¿HTML final contiene checkbox-2?",l.includes("checkbox-2")),console.log("📊 [SCROLL] ¿HTML final contiene scrollable-container?",l.includes("scrollable-container")),console.log("📊 [SCROLL] ¿HTML final contiene scrollable-container--horizontal?",l.includes("scrollable-container--horizontal")),console.log("🔍 [HEADER ALIGNMENT] ========== FIN RENDER =========="),l}function Ne(o){const h=o.containerId?document.getElementById(o.containerId):document.body;if(!h)throw new Error(`Container with id "${o.containerId}" not found`);const H=ye(o),C=document.createElement("div");C.innerHTML=H.trim();const r=C.firstElementChild;if(!r)throw new Error("Failed to create data table 3 element");h.appendChild(r);let d={...o},u=d.columns.filter(O=>O.visible!==!1).map(O=>O.id),f=d.rows.map(O=>O.id),b=null,v=null,S=null,k=null;const y=()=>{const O=r.querySelectorAll("wa-icon");console.log("🔍 [ICONS] Inicializando fallbacks de iconos:",{totalIcons:O.length,waIconDefined:!!customElements.get("wa-icon")}),O.forEach((A,M)=>{const E=A.nextElementSibling,I=A.getAttribute("name");console.log(`🔍 [ICONS] Icono ${M+1}:`,{name:I,hasNextSibling:!!E,nextSiblingTag:E?.tagName,waIconDisplay:window.getComputedStyle(A).display,waIconWidth:window.getComputedStyle(A).width,waIconHeight:window.getComputedStyle(A).height,waIconOpacity:window.getComputedStyle(A).opacity}),E&&E.tagName==="I"&&(customElements.get("wa-icon")?(A.style.display="inline-block",A.style.width="12px",A.style.height="12px",A.style.opacity="1",E.style.display="none",console.log(`✅ [ICONS] Icono ${M+1} (${I}): usando wa-icon`)):(A.style.display="none",E.style.display="inline-block",E.style.fontSize="12px",E.style.width="12px",E.style.height="12px",console.log(`⚠️ [ICONS] Icono ${M+1} (${I}): usando fallback`)))})},T=()=>{const O=ye({...d,sortColumnId:S,sortDirection:k},u,f);r.innerHTML=O.trim(),m(),y(),r.querySelectorAll("input[data-column-checkbox-header]").forEach(E=>{const I=E,_=I.getAttribute("data-column-checkbox-header");if(_){const D=d.rows.length>0&&d.rows.every(U=>U.data[_]===!0),B=d.rows.some(U=>U.data[_]===!0),z=B&&!D;I.indeterminate=z,console.log("📋 [INDETERMINATE] Header checkbox",_,"- indeterminate:",z,"(allChecked:",D,"someChecked:",B,")")}}),console.log("🔍 [PADDING CHECK] ========== INICIANDO VERIFICACIÓN =========="),console.log("📊 Element disponible:",!!r),console.log("📊 Element tagName:",r.tagName),console.log("📊 Element className:",r.className),console.log("📊 Element innerHTML length:",r.innerHTML.length),console.log("📊 Element innerHTML preview (primeros 500 chars):",r.innerHTML.substring(0,500));const M=()=>{try{console.log("🔍 [PADDING CHECK] ========== DESPUÉS DEL RENDERIZADO =========="),console.log("📊 element.tagName:",r.tagName),console.log("📊 element.className:",r.className);const E=r.classList.contains("ubits-data-table__scrollable-container")?r:r.querySelector(".ubits-data-table__scrollable-container"),I=E?E.querySelector(".ubits-data-table__table"):r.querySelector(".ubits-data-table__table")||r;console.log("📊 scrollableContainer encontrado:",!!E),console.log("📊 actualTable encontrado:",!!I),console.log("📊 actualTable tagName:",I?.tagName);const _=I||r,D=_.querySelectorAll(".ubits-data-table__controls-column"),B=_.querySelectorAll(".ubits-data-table__controls-column-header");if(console.log("📊 [CONTROLS] Elementos encontrados:",{columns:D.length,headers:B.length}),D.length>0){const w=D[0],g=window.getComputedStyle(w);console.log("📊 [CONTROLS COLUMN] Estilos computados:"),console.log("  - padding:",g.padding),console.log("  - paddingTop:",g.paddingTop),console.log("  - paddingRight:",g.paddingRight),console.log("  - paddingBottom:",g.paddingBottom),console.log("  - paddingLeft:",g.paddingLeft),console.log("  - width:",g.width),console.log("  - minWidth:",g.minWidth),console.log("  - maxWidth:",g.maxWidth),console.log("  - boxSizing:",g.boxSizing),console.log("  - marginLeft:",g.marginLeft),console.log("  - marginRight:",g.marginRight);const l=w.nextElementSibling;if(l){const e=window.getComputedStyle(l);console.log("📊 [FIRST DATA CELL] Primera celda después de controles:"),console.log("  - tagName:",l.tagName),console.log("  - className:",l.className),console.log("  - padding:",e.padding),console.log("  - paddingLeft:",e.paddingLeft),console.log("  - marginLeft:",e.marginLeft),console.log("  - width:",e.width);const t=w.getBoundingClientRect(),a=l.getBoundingClientRect(),s=a.left-t.right;console.log("📊 [GAP CALCULATION] Espacio entre controles y primera celda:"),console.log("  - controlsRect.right:",t.right),console.log("  - firstDataRect.left:",a.left),console.log("  - GAP calculado:",s,"px")}else console.log("⚠️ [FIRST DATA CELL] No se encontró celda de datos después de controles")}else console.log("⚠️ [CONTROLS COLUMN] No se encontró ninguna columna de controles");if(B.length>0){const w=B[0],g=window.getComputedStyle(w);console.log("📊 [CONTROLS HEADER] Estilos computados:"),console.log("  - padding:",g.padding),console.log("  - paddingTop:",g.paddingTop),console.log("  - paddingRight:",g.paddingRight),console.log("  - paddingBottom:",g.paddingBottom),console.log("  - paddingLeft:",g.paddingLeft),console.log("  - width:",g.width),console.log("  - minWidth:",g.minWidth),console.log("  - maxWidth:",g.maxWidth),console.log("  - boxSizing:",g.boxSizing),console.log("  - marginLeft:",g.marginLeft),console.log("  - marginRight:",g.marginRight)}else console.log("⚠️ [CONTROLS HEADER] No se encontró ningún header de controles");const z=_.querySelectorAll('.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]'),U=_.querySelectorAll('.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"], .ubits-data-table__column-header--checkbox[data-column-id^="checkbox-"]');if(console.log("📊 [CHECKBOX] Buscando checkbox cells con selector:",'.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]'),console.log("📊 [CHECKBOX] Elementos encontrados:",{cells:z.length,headers:U.length}),E){console.log("📊 [CHECKBOX] ✅ Contenedor scrollable encontrado, buscando checkbox dentro de él");const w=E.querySelectorAll('.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]'),g=E.querySelectorAll('.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"], .ubits-data-table__column-header--checkbox[data-column-id^="checkbox-"]');if(console.log("📊 [CHECKBOX] Elementos encontrados dentro del scrollable:",{cells:w.length,headers:g.length}),w.length>0){const l=w[0],e=window.getComputedStyle(l);console.log("📊 [CHECKBOX CELL] Estilos computados (dentro scrollable):"),console.log("  - padding:",e.padding),console.log("  - paddingTop:",e.paddingTop),console.log("  - paddingRight:",e.paddingRight),console.log("  - paddingBottom:",e.paddingBottom),console.log("  - paddingLeft:",e.paddingLeft),console.log("  - width:",e.width),console.log("  - minWidth:",e.minWidth),console.log("  - maxWidth:",e.maxWidth),console.log("  - boxSizing:",e.boxSizing),console.log("  - marginLeft:",e.marginLeft),console.log("  - marginRight:",e.marginRight),console.log("  - position:",e.position),console.log("  - left:",e.left),console.log("  - zIndex:",e.zIndex)}}else console.log("📊 [CHECKBOX] ❌ No hay contenedor scrollable, buscando directamente en element");if(z.length>0){const w=z[0],g=window.getComputedStyle(w);console.log("📊 [CHECKBOX CELL] Estilos computados:"),console.log("  - padding:",g.padding),console.log("  - paddingTop:",g.paddingTop),console.log("  - paddingRight:",g.paddingRight),console.log("  - paddingBottom:",g.paddingBottom),console.log("  - paddingLeft:",g.paddingLeft),console.log("  - width:",g.width),console.log("  - minWidth:",g.minWidth),console.log("  - maxWidth:",g.maxWidth),console.log("  - boxSizing:",g.boxSizing),console.log("  - marginLeft:",g.marginLeft),console.log("  - marginRight:",g.marginRight),console.log("  - position:",g.position),console.log("  - left:",g.left),console.log("  - zIndex:",g.zIndex)}else{console.log("⚠️ [CHECKBOX CELL] No se encontró ninguna celda de checkbox");const w=r.querySelectorAll("td[data-column-id]");console.log("📊 [CHECKBOX] Total celdas con data-column-id:",w.length),w.forEach((g,l)=>{const e=g.getAttribute("data-column-id");e&&e.includes("checkbox")&&console.log(`📊 [CHECKBOX] Celda ${l} tiene data-column-id="${e}"`)})}if(U.length>0){const w=U[0],g=window.getComputedStyle(w);console.log("📊 [CHECKBOX HEADER] Estilos computados:"),console.log("  - padding:",g.padding),console.log("  - paddingTop:",g.paddingTop),console.log("  - paddingRight:",g.paddingRight),console.log("  - paddingBottom:",g.paddingBottom),console.log("  - paddingLeft:",g.paddingLeft),console.log("  - width:",g.width),console.log("  - minWidth:",g.minWidth),console.log("  - maxWidth:",g.maxWidth),console.log("  - boxSizing:",g.boxSizing),console.log("  - marginLeft:",g.marginLeft),console.log("  - marginRight:",g.marginRight),console.log("  - position:",g.position),console.log("  - left:",g.left),console.log("  - zIndex:",g.zIndex)}else{console.log("⚠️ [CHECKBOX HEADER] No se encontró ningún header de checkbox");const w=r.querySelectorAll("th[data-column-id]");console.log("📊 [CHECKBOX] Total headers con data-column-id:",w.length),w.forEach((g,l)=>{const e=g.getAttribute("data-column-id");e&&e.includes("checkbox")&&console.log(`📊 [CHECKBOX] Header ${l} tiene data-column-id="${e}"`)})}if(z.length>0&&D.length>0){const w=z[0],g=D[0],l=w.getBoundingClientRect(),e=g.getBoundingClientRect(),t=e.left-l.right;console.log("📊 [DISTANCE] Distancia entre checkbox y controles:",t,"px"),console.log("  - checkbox right:",l.right),console.log("  - controls left:",e.left),console.log("  - checkbox width:",l.width),console.log("  - controls width:",e.width)}console.log("🔍 [HORIZONTAL SCROLL] ========== VERIFICACIÓN SCROLL HORIZONTAL ==========");const R=r.classList.contains("ubits-data-table__scrollable-container--horizontal")?r:r.querySelector(".ubits-data-table__scrollable-container--horizontal");if(R){console.log("✅ [HORIZONTAL SCROLL] Contenedor scrollable horizontal encontrado");const w=window.getComputedStyle(R),g=R.getBoundingClientRect();console.log("📊 [HORIZONTAL SCROLL] Estilos del contenedor:"),console.log("  - className:",R.className),console.log("  - overflow-x:",w.overflowX),console.log("  - overflow-y:",w.overflowY),console.log("  - width:",w.width),console.log("  - max-width:",w.maxWidth),console.log("  - min-width:",w.minWidth),console.log("  - box-sizing:",w.boxSizing),console.log("  - position:",w.position),console.log("  - display:",w.display),console.log("📊 [HORIZONTAL SCROLL] Dimensiones del contenedor:"),console.log("  - clientWidth:",R.clientWidth),console.log("  - scrollWidth:",R.scrollWidth),console.log("  - offsetWidth:",R.offsetWidth),console.log("  - getBoundingClientRect().width:",g.width);const l=R.scrollWidth>R.clientWidth;console.log("📊 [HORIZONTAL SCROLL] ¿Hay scroll disponible?",l),console.log("  - scrollWidth:",R.scrollWidth),console.log("  - clientWidth:",R.clientWidth),console.log("  - Diferencia:",R.scrollWidth-R.clientWidth,"px");const e=R.querySelector(".ubits-data-table__table");if(e){const a=window.getComputedStyle(e),s=e.getBoundingClientRect();console.log("📊 [HORIZONTAL SCROLL] Estilos de la tabla:"),console.log("  - width:",a.width),console.log("  - min-width:",a.minWidth),console.log("  - max-width:",a.maxWidth),console.log("  - getBoundingClientRect().width:",s.width);const n=e.querySelectorAll("th[data-column-id], td[data-column-id]");let i=0;const c={},p=new Set;n.forEach(x=>{const $=x.getAttribute("data-column-id");$&&p.add($)}),p.forEach(x=>{const $=e.querySelector(`[data-column-id="${x}"]`);if($){const W=$.getBoundingClientRect().width;c[x]=W,i+=W}}),console.log("📊 [HORIZONTAL SCROLL] Anchos de columnas:"),console.log("  - Total columnas encontradas:",p.size),console.log("  - Ancho total calculado:",i,"px"),console.log("  - Ancho del contenedor:",R.clientWidth,"px"),console.log("  - Ancho de la tabla:",s.width,"px"),console.log("  - Anchos por columna:",c);const L=s.width>R.clientWidth;console.log("📊 [HORIZONTAL SCROLL] ¿La tabla es más ancha que el contenedor?",L),console.log("  - Tabla width:",s.width,"px"),console.log("  - Contenedor clientWidth:",R.clientWidth,"px"),console.log("  - Diferencia:",s.width-R.clientWidth,"px")}else console.log("⚠️ [HORIZONTAL SCROLL] No se encontró la tabla dentro del contenedor");const t=R.parentElement;if(t){const a=window.getComputedStyle(t),s=t.getBoundingClientRect();console.log("📊 [HORIZONTAL SCROLL] Contenedor padre:"),console.log("  - tagName:",t.tagName),console.log("  - className:",t.className),console.log("  - width:",a.width),console.log("  - max-width:",a.maxWidth),console.log("  - getBoundingClientRect().width:",s.width)}}else{console.log("❌ [HORIZONTAL SCROLL] No se encontró contenedor scrollable horizontal"),console.log("📊 [HORIZONTAL SCROLL] Element classes:",r.className),console.log("📊 [HORIZONTAL SCROLL] Element innerHTML preview:",r.innerHTML.substring(0,500));const w=r.querySelector(".ubits-data-table__scrollable-container");w&&(console.log("📊 [HORIZONTAL SCROLL] Se encontró un contenedor scrollable pero sin clase horizontal:"),console.log("  - className:",w.className))}console.log("🔍 [HORIZONTAL SCROLL] ========== FIN VERIFICACIÓN =========="),console.log("🔍 [PADDING CHECK] ========== FIN ==========")}catch(E){console.error("❌ [PADDING CHECK] Error:",E)}};M(),setTimeout(M,100),setTimeout(M,500),setTimeout(M,1e3)},m=()=>{try{d.columnReorderable&&(r.hasAttribute("data-column-drag-listener")||(r.setAttribute("data-column-drag-listener","true"),r.addEventListener("dragstart",l=>{const t=l.target.closest(".ubits-data-table__column-drag-handle");if(t&&(b=t.getAttribute("data-column-id"),b)){l.dataTransfer.effectAllowed="move",l.dataTransfer.setData("text/plain",b);const a=t.closest(".ubits-data-table__column-header");a&&a.classList.add("ubits-data-table__column-header--dragging")}},!0),r.addEventListener("dragend",l=>{const t=l.target.closest(".ubits-data-table__column-drag-handle");if(t){const a=t.closest(".ubits-data-table__column-header");a&&a.classList.remove("ubits-data-table__column-header--dragging")}b=null},!0),r.addEventListener("dragover",l=>{const t=l.target.closest(".ubits-data-table__column-header");if(t&&b){const a=t.getAttribute("data-column-id");if(a&&a!==b){const s=a==="checkbox"||a.startsWith("checkbox-"),n=b==="checkbox"||b.startsWith("checkbox-");if(s)return;if(!n){const i=u.findIndex(c=>c==="checkbox"||c.startsWith("checkbox-"));if(i!==-1&&u.indexOf(a)<i)return}l.preventDefault(),l.dataTransfer.dropEffect="move",t.classList.add("ubits-data-table__column-header--drag-over")}}},!0),r.addEventListener("dragleave",l=>{const t=l.target.closest(".ubits-data-table__column-header");t&&t.classList.remove("ubits-data-table__column-header--drag-over")},!0),r.addEventListener("drop",l=>{const t=l.target.closest(".ubits-data-table__column-header");if(t){l.preventDefault(),t.classList.remove("ubits-data-table__column-header--drag-over");const a=t.getAttribute("data-column-id");if(!a||!b)return;const s=b==="checkbox"||b.startsWith("checkbox-"),n=a==="checkbox"||a.startsWith("checkbox-");if(s||n)return;if(b!==a){const i=u.indexOf(b),c=u.indexOf(a),p=u.findIndex(L=>L==="checkbox"||L.startsWith("checkbox-"));if(p===-1){i!==-1&&c!==-1&&(u.splice(i,1),u.splice(c,0,b),d.onColumnReorder&&d.onColumnReorder([...u]),T());return}if(c<p||i>p&&c<p)return;if(i!==-1&&c!==-1){const L=[...u];L.splice(i,1),L.splice(c,0,b);const x=L.findIndex($=>$==="checkbox"||$.startsWith("checkbox-"));if(x!==-1&&x<p)return;u=L,d.onColumnReorder&&d.onColumnReorder([...u]),T()}}}},!0))),d.rowReorderable&&(r.hasAttribute("data-row-drag-listener")||(r.setAttribute("data-row-drag-listener","true"),r.addEventListener("dragstart",l=>{const t=l.target.closest(".ubits-data-table__row-drag-handle");if(!t)return;const a=t.getAttribute("data-row-id");if(a){const s=isNaN(Number(a))?a:Number(a);v=s,l.dataTransfer.effectAllowed="move",l.dataTransfer.setData("text/plain",String(s));const n=t.closest(".ubits-data-table__row");n&&n.classList.add("ubits-data-table__row--dragging")}},!0),r.addEventListener("dragend",l=>{const t=l.target.closest(".ubits-data-table__row-drag-handle");if(t){const a=t.closest(".ubits-data-table__row");a&&a.classList.remove("ubits-data-table__row--dragging")}v=null},!0),r.addEventListener("dragover",l=>{const t=l.target.closest(".ubits-data-table__row");if(t&&v!==null){const a=t.getAttribute("data-row-id");a&&(isNaN(Number(a))?a:Number(a))!==v&&(l.preventDefault(),l.dataTransfer.dropEffect="move",t.classList.add("ubits-data-table__row--drag-over"))}},!0),r.addEventListener("dragleave",l=>{const t=l.target.closest(".ubits-data-table__row");t&&t.classList.remove("ubits-data-table__row--drag-over")},!0),r.addEventListener("drop",l=>{const t=l.target.closest(".ubits-data-table__row");if(t){l.preventDefault(),t.classList.remove("ubits-data-table__row--drag-over");const a=t.getAttribute("data-row-id");if(!a||!v)return;const s=isNaN(Number(a))?a:Number(a),n=l.dataTransfer.getData("text/plain");if(n&&String(s)!==n){const i=isNaN(Number(n))?n:Number(n),c=f.indexOf(i),p=f.indexOf(s);c!==-1&&p!==-1&&(f.splice(c,1),f.splice(p,0,i),d.onRowReorder&&d.onRowReorder([...f]),T())}}},!0))),r.querySelectorAll("input[data-column-id]").forEach(l=>{l.addEventListener("change",e=>{const t=e.target,a=t.getAttribute("data-row-id"),s=t.getAttribute("data-column-id"),n=isNaN(Number(a))?a:Number(a),i=t.checked,c=d.rows.find(p=>p.id===n);c&&(c.data[s]=i),T()})}),r.querySelectorAll("input[data-column-checkbox-header]").forEach(l=>{l.addEventListener("change",e=>{const t=e.target,a=t.getAttribute("data-column-checkbox-header"),s=t.checked;d.rows.forEach(n=>{n.data[a]=s}),T()})}),r.querySelectorAll('[data-expand-button="true"]').forEach(l=>{l.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation();const t=l.getAttribute("data-row-id"),a=isNaN(Number(t))?t:Number(t),s=d.rows.find(n=>n.id===a);if(s){const n=s.expanded||!1;s.expanded=!n,d.onRowExpand&&d.onRowExpand(a,s.expanded),T()}})});const E=r.querySelectorAll(".ubits-data-table__column-drag-handle"),I=r.querySelectorAll('[data-sort-button="true"]');if(E.length>0&&I.length>0){const l=E[0],e=I[0],t=window.getComputedStyle(l),a=window.getComputedStyle(e),s=l.querySelector("wa-icon")||l.querySelector("i"),n=e.querySelector("wa-icon")||e.querySelector("i"),i=s?window.getComputedStyle(s):null,c=n?window.getComputedStyle(n):null;console.log("🔍 [STYLES COMPARISON] ========== DRAG HANDLE =========="),console.log("Container - display:",t.display),console.log("Container - width:",t.width),console.log("Container - height:",t.height),console.log("Container - padding:",t.padding),console.log("Container - margin:",t.margin),console.log("Container - color:",t.color),console.log("Container - backgroundColor:",t.backgroundColor),console.log("Container - border:",t.border),console.log("Container - borderRadius:",t.borderRadius),console.log("Container - cursor:",t.cursor),console.log("Container - fontSize:",t.fontSize),console.log("Container - lineHeight:",t.lineHeight),i?(console.log("Icon - display:",i.display),console.log("Icon - width:",i.width),console.log("Icon - height:",i.height),console.log("Icon - fontSize:",i.fontSize),console.log("Icon - color:",i.color),console.log("Icon - margin:",i.margin),console.log("Icon - padding:",i.padding),console.log("Icon - lineHeight:",i.lineHeight),console.log("Icon - verticalAlign:",i.verticalAlign)):console.log("Icon: NO ICON FOUND"),s?(console.log("Icon Element - tagName:",s.tagName),console.log("Icon Element - className:",s.className),console.log("Icon Element - innerHTML:",s.innerHTML.substring(0,100))):console.log("Icon Element: NO ICON ELEMENT"),console.log("🔍 [STYLES COMPARISON] ========== SORT BUTTON =========="),console.log("Container - display:",a.display),console.log("Container - width:",a.width),console.log("Container - height:",a.height),console.log("Container - padding:",a.padding),console.log("Container - margin:",a.margin),console.log("Container - color:",a.color),console.log("Container - backgroundColor:",a.backgroundColor),console.log("Container - border:",a.border),console.log("Container - borderRadius:",a.borderRadius),console.log("Container - cursor:",a.cursor),console.log("Container - fontSize:",a.fontSize),console.log("Container - lineHeight:",a.lineHeight),c?(console.log("Icon - display:",c.display),console.log("Icon - width:",c.width),console.log("Icon - height:",c.height),console.log("Icon - fontSize:",c.fontSize),console.log("Icon - color:",c.color),console.log("Icon - margin:",c.margin),console.log("Icon - padding:",c.padding),console.log("Icon - lineHeight:",c.lineHeight),console.log("Icon - verticalAlign:",c.verticalAlign)):console.log("Icon: NO ICON FOUND"),n?(console.log("Icon Element - tagName:",n.tagName),console.log("Icon Element - className:",n.className),console.log("Icon Element - innerHTML:",n.innerHTML.substring(0,100))):console.log("Icon Element: NO ICON ELEMENT"),console.log("🔍 [STYLES COMPARISON] ========== DIFFERENCES ==========");const p=[];t.width!==a.width&&p.push(`width: ${t.width} vs ${a.width}`),t.height!==a.height&&p.push(`height: ${t.height} vs ${a.height}`),t.padding!==a.padding&&p.push(`padding: ${t.padding} vs ${a.padding}`),t.margin!==a.margin&&p.push(`margin: ${t.margin} vs ${a.margin}`),t.color!==a.color&&p.push(`color: ${t.color} vs ${a.color}`),t.backgroundColor!==a.backgroundColor&&p.push(`backgroundColor: ${t.backgroundColor} vs ${a.backgroundColor}`),t.border!==a.border&&p.push(`border: ${t.border} vs ${a.border}`),t.borderRadius!==a.borderRadius&&p.push(`borderRadius: ${t.borderRadius} vs ${a.borderRadius}`),i&&c&&(i.color!==c.color&&p.push(`icon.color: ${i.color} vs ${c.color}`),i.fontSize!==c.fontSize&&p.push(`icon.fontSize: ${i.fontSize} vs ${c.fontSize}`),i.width!==c.width&&p.push(`icon.width: ${i.width} vs ${c.width}`),i.height!==c.height&&p.push(`icon.height: ${i.height} vs ${c.height}`)),p.length>0?(console.log("❌ DIFERENCIAS ENCONTRADAS:"),p.forEach((L,x)=>{console.log(`  ${x+1}. ${L}`)})):console.log("✅ NO DIFFERENCES FOUND")}console.log("🔍 [SORT BUTTON] Botones encontrados:",{count:I.length,buttons:Array.from(I).map(l=>({columnId:l.getAttribute("data-column-id"),classes:l.className,innerHTML:l.innerHTML.substring(0,100),waIcons:l.querySelectorAll("wa-icon").length,computedStyle:{display:window.getComputedStyle(l).display,width:window.getComputedStyle(l).width,height:window.getComputedStyle(l).height,visibility:window.getComputedStyle(l).visibility,opacity:window.getComputedStyle(l).opacity,color:window.getComputedStyle(l).color,backgroundColor:window.getComputedStyle(l).backgroundColor,padding:window.getComputedStyle(l).padding,margin:window.getComputedStyle(l).margin}}))}),I.forEach(l=>{const e=l,t=e.querySelectorAll("wa-icon"),a=e.classList.contains("ubits-data-table__column-sort--active");console.log("🔍 [SORT BUTTON] Verificando botón:",{columnId:e.getAttribute("data-column-id"),isActive:a,waIconsCount:t.length,innerHTML:e.innerHTML.substring(0,150),waIcons:Array.from(t).map(n=>{const i=window.getComputedStyle(n);return{name:n.getAttribute("name"),display:i.display,width:i.width,height:i.height,opacity:i.opacity,visibility:i.visibility,color:i.color,fontSize:i.fontSize,isConnected:n.isConnected,parentElement:n.parentElement?.tagName,nextSibling:n.nextSibling?.nodeName}}),buttonComputedStyle:{display:window.getComputedStyle(e).display,width:window.getComputedStyle(e).width,height:window.getComputedStyle(e).height,opacity:window.getComputedStyle(e).opacity,visibility:window.getComputedStyle(e).visibility}});const s=Array.from(t).find(n=>n.getAttribute("name")==="arrow-down-z-a");s&&console.log("🔍 [SORT BUTTON] Icono arrow-down-z-a encontrado:",{element:s,name:s.getAttribute("name"),computedStyle:{display:window.getComputedStyle(s).display,width:window.getComputedStyle(s).width,height:window.getComputedStyle(s).height,opacity:window.getComputedStyle(s).opacity,visibility:window.getComputedStyle(s).visibility,color:window.getComputedStyle(s).color},inlineStyle:s.style.cssText,classes:s.className,parentClasses:s.parentElement?.className}),l.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const i=l.getAttribute("data-column-id");console.log("🔍 [SORT BUTTON] Click en botón:",{columnId:i,currentSortColumnId:S,currentSortDirection:k}),S===i?k=k==="asc"?"desc":"asc":(S=i,k="asc"),console.log("✅ [SORT BUTTON] Nuevo estado:",{sortColumnId:S,sortDirection:k}),d.onSort&&d.onSort(i,k),T()})}),r.querySelectorAll('[data-menu-button="true"]').forEach(l=>{const e=l,t=e.getAttribute("data-column-id");if(!t||!d.columns.find(L=>L.id===t))return;const s=e.closest("th");if(!s){console.warn("⚠️ [MENU BUTTON] No se encontró el header cell");return}let n=s.querySelector(".ubits-data-table__column-menu-dropdown");if(!n){n=document.createElement("div"),n.className="ubits-data-table__column-menu-dropdown",n.setAttribute("data-column-id",t),n.style.cssText=`
          position: absolute;
          top: 100%;
          right: 0;
          z-index: 1000;
          margin-top: 4px;
          display: none;
          width: 160px;
          max-width: 160px;
          box-sizing: border-box;
        `;const L=s.hasAttribute("data-pinned")&&s.getAttribute("data-pinned")==="true",x=s.classList.contains("ubits-data-table__column-header--pinned");!L&&!x?s.style.position="relative":(console.log("⚠️ [COLUMN MENU] Columna fijada detectada, NO estableciendo position: relative para preservar position: sticky",{columnId:t,isPinned:L,hasStickyClass:x,currentPosition:s.style.position,computedPosition:window.getComputedStyle(s).position}),(window.getComputedStyle(s).position==="sticky"||s.style.position==="sticky")&&(s.style.position="sticky",console.log("✅ [COLUMN MENU] position: sticky preservado para columna fijada"))),s.appendChild(n)}let i=!1;const c=()=>{n&&(n.style.display="none"),i=!1,p&&(document.removeEventListener("click",p),p=null)};let p=null;e.addEventListener("click",L=>{console.log("🔍 [COLUMN MENU] Click en botón de menú, columna:",t),L.preventDefault(),L.stopPropagation();const x=d.columns.find(P=>P.id===t);if(!x){console.error("❌ [COLUMN MENU] Columna no encontrada:",t);return}const $=x.pinned||!1;if(console.log("🔍 [COLUMN MENU] Estado de columna - pinned:",$),i){console.log("🔍 [COLUMN MENU] Dropdown ya abierto, cerrando..."),c();return}r.querySelectorAll(".ubits-data-table__column-menu-dropdown").forEach(P=>{P!==n&&(P.style.display="none")});const W=[{label:$?"Desfijar columna":"Fijar columna",value:"pin",state:"default"}];n.innerHTML="";const q=`column-menu-list-${t}-${Math.random().toString(36).substr(2,9)}`;n.id=q;try{console.log("🔍 [COLUMN MENU] Creando lista UBITS con createList, containerId:",q);const P=he({containerId:q,items:W,size:"sm",maxHeight:"200px",onSelectionChange:(F,K)=>{if(console.log("🔍 [COLUMN MENU] Item seleccionado del dropdown:",F?.label,"value:",F?.value),F&&F.value==="pin"){const J=d.columns.find(X=>X.id===t);if(J){const X=J.pinned||!1;J.pinned=!X,console.log("✅ [COLUMN MENU] Columna",t,X?"desfijada":"fijada","- nuevo estado pinned:",J.pinned),d.onColumnPin&&d.onColumnPin(t,J.pinned),T()}else console.error("❌ [COLUMN MENU] Columna no encontrada al intentar fijar:",t)}c()}});console.log("✅ [COLUMN MENU] Lista UBITS creada exitosamente, elemento:",P)}catch(P){console.error("❌ [COLUMN MENU] Error al crear lista con createList:",P),console.log("🔍 [COLUMN MENU] Usando fallback renderList...");const F=Le({items:W,size:"sm",maxHeight:"200px"});n.innerHTML=F,console.log("✅ [COLUMN MENU] HTML de lista renderizado, length:",F.length);const K=n.querySelectorAll(".ubits-list-item");console.log("🔍 [COLUMN MENU] Items encontrados en fallback:",K.length),K.forEach(J=>{J.addEventListener("click",()=>{console.log("🔍 [COLUMN MENU] Click en item del dropdown (fallback)");const X=d.columns.find(j=>j.id===t);if(X){const j=X.pinned||!1;X.pinned=!j,console.log("✅ [COLUMN MENU] Columna",t,j?"desfijada":"fijada","- nuevo estado pinned:",X.pinned),d.onColumnPin&&d.onColumnPin(t,X.pinned),T()}c()})})}const Y=e.getBoundingClientRect();n.style.position="fixed",n.style.top=`${Y.bottom+4}px`,n.style.left=`${Y.left}px`,n.style.display="block",i=!0,console.log("✅ [COLUMN MENU] Dropdown mostrado y posicionado:",{top:n.style.top,left:n.style.left,width:n.offsetWidth,height:n.offsetHeight,innerHTML:n.innerHTML.substring(0,200)}),p=P=>{!n.contains(P.target)&&!e.contains(P.target)&&c()},setTimeout(()=>{document.addEventListener("click",p)},0)})}),r.querySelectorAll('[data-editable-text="true"]').forEach(l=>{const e=l.closest('[data-editable="true"]');if(!e)return;const t=e.getAttribute("data-row-id"),a=e.getAttribute("data-column-id");if(!t||!a)return;const s=isNaN(Number(t))?t:Number(t);l.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),l.blur())}),l.addEventListener("blur",n=>{n.stopPropagation();const i=l.textContent||"",c=d.rows.find(p=>p.id===s);if(c){const p=d.columns.find(L=>L.id===a);p&&(p.type==="nombre"||p.type==="nombre-avatar")?(c.data.nombre=i.trim(),c.data[a]!==void 0&&(c.data[a]=i.trim())):p&&p.type==="estado"?(c.data[a]=i.trim(),c.data.estado=i.trim(),c.data.status=i.trim()):c.data[a]=i.trim()}}),l.addEventListener("dblclick",n=>{n.stopPropagation()}),l.addEventListener("click",n=>{n.stopPropagation()})}),r.querySelectorAll(".ubits-data-table__status-editable").forEach(l=>{const e=l.getAttribute("data-row-id"),t=l.getAttribute("data-column-id"),a=l.getAttribute("data-current-status");if(!e||!t)return;const s=isNaN(Number(e))?e:Number(e),n=l.querySelector(".ubits-status-tag"),i=l.querySelector(".ubits-data-table__status-dropdown");if(!n||!i)return;const c=[{value:"active",label:"Activo",status:"active"},{value:"completed",label:"Completado",status:"completed"},{value:"published",label:"Publicado",status:"published"},{value:"fulfilled",label:"Cumplido",status:"fulfilled"},{value:"created",label:"Creado",status:"created"},{value:"not-fulfilled",label:"No cumplido",status:"not-fulfilled"},{value:"denied",label:"Denegado",status:"denied"},{value:"draft",label:"Borrador",status:"draft"},{value:"in-progress",label:"En progreso",status:"in-progress"},{value:"syncing",label:"Sincronizando",status:"syncing"},{value:"pending",label:"Pendiente",status:"pending"},{value:"pending-approval",label:"Pendiente aprobación",status:"pending-approval"},{value:"not-started",label:"No iniciado",status:"not-started"},{value:"finished",label:"Finalizado",status:"finished"},{value:"archived",label:"Archivado",status:"archived"},{value:"disabled",label:"Deshabilitado",status:"disabled"},{value:"paused",label:"Pausado",status:"paused"},{value:"hidden",label:"Oculto",status:"hidden"}];let p=null,L=null,x=null,$=!1,W=0;const q=[],Y=j=>{const Q=[];let V=j;for(;V&&V!==document.body&&V!==document.documentElement;){const G=window.getComputedStyle(V),ae=G.overflow+G.overflowX+G.overflowY,le=ae.includes("auto")||ae.includes("scroll"),ne=V.scrollHeight>V.clientHeight||V.scrollWidth>V.clientWidth;(le||ne)&&Q.push(V),V=V.parentElement}return Q},P=()=>{try{if(!i||i.style.display==="none"||!document.body.contains(i)){K();return}if(!n||!n.isConnected){K();return}const j=n.getBoundingClientRect(),Q=j.bottom+4,V=j.left,G=i.style.top,ae=i.style.left,le=`${Q}px`,ne=`${V}px`;(G!==le||ae!==ne)&&(i.style.top=le,i.style.left=ne,W++)}catch{K()}},F=()=>{if($)return;$=!0;const j=()=>{if(i.style.display==="none"||!document.body.contains(i)){K();return}P(),x=requestAnimationFrame(j)};j()},K=()=>{x&&(cancelAnimationFrame(x),x=null),$=!1,W=0};L=P;const J=()=>{K(),i.style.display="none";const j=i.__scrollbarInstance;if(j&&j.destroy){try{j.destroy()}catch{}i.__scrollbarInstance=null}i.parentElement===document.body&&l.appendChild(i),p&&(document.removeEventListener("click",p),p=null),L&&(window.removeEventListener("scroll",L,!0),r.removeEventListener("scroll",L,!0),q.forEach(Q=>{Q.removeEventListener("scroll",L,!0)}),q.length=0,L=null)},X=j=>{try{if(j.preventDefault(),j.stopPropagation(),!n||!i)return;r.querySelectorAll(".ubits-data-table__status-dropdown").forEach(N=>{if(N!==i&&(N.style.display="none",N.parentElement===document.body)){const oe=r.querySelector(`[data-row-id="${N.getAttribute("data-row-id")}"][data-column-id="${N.getAttribute("data-column-id")}"]`);oe&&oe.appendChild(N)}});const Q={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"},V=c.map(N=>({label:N.label,value:N.value,state:N.status===a?"active":"default",selected:N.status===a}));if(!document.querySelector('link[href*="scroll.css"]')){const N=document.createElement("link");N.rel="stylesheet",N.href="../../addons/scroll/src/styles/scroll.css",document.head.appendChild(N)}i.innerHTML="";const G=`status-list-${s}-${t}`,ae=`status-scrollbar-${s}-${t}`;if(i.id=`status-dropdown-${s}-${t}`,i.innerHTML=`
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${G}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${ae}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `,document.getElementById(G)){const N=document.createElement("style");N.textContent=`
            #${G}::-webkit-scrollbar {
              display: none;
            }
          `,document.head.appendChild(N)}i.parentElement!==document.body&&document.body.appendChild(i);const ne=n.getBoundingClientRect();i.style.position="fixed",i.style.top=`${ne.bottom+4}px`,i.style.left=`${ne.left}px`,i.style.zIndex="1000",i.style.backgroundColor="var(--ubits-bg-1)",i.style.border="1px solid var(--ubits-border-1)",i.style.borderRadius="8px",i.style.display="block",i.style.minWidth="200px",i.style.maxWidth="300px",i.style.padding="4px",i.style.boxSizing="border-box",i.style.maxHeight="308px";const ge=Y(n);q.push(...ge),P(),F(),window.addEventListener("scroll",P,!0),r.addEventListener("scroll",P,!0),ge.forEach(N=>{N.addEventListener("scroll",P,!0)});let se=null;try{const N=he({containerId:G,items:V,size:"sm",maxHeight:"none",onSelectionChange:(oe,me)=>{if(oe&&me!==null){const ce=c[me];if(ce){const re=d.rows.find(be=>be.id===s);if(re&&d.columns.find(ie=>ie.id===t)){const ie=Q[ce.status]||ce.label;re.data[t]=ie,re.data.estado=ie,re.data.status=ie,T()}J()}}}});N&&(N.style.maxHeight="none",N.style.height="auto",N.style.overflow="visible",N.style.overflowY="visible",N.style.overflowX="visible"),requestAnimationFrame(()=>{if(typeof fe<"u")try{const oe=document.getElementById(G);oe&&oe.scrollHeight>oe.clientHeight&&(se=fe({containerId:ae,targetId:G,orientation:"vertical",state:"default"}),se?.update&&se.update())}catch{}})}catch{}i.__scrollbarInstance=se;const pe=N=>{!i.contains(N.target)&&!n.contains(N.target)&&J()};p=pe,setTimeout(()=>{document.addEventListener("click",pe)},0)}catch{K()}};n.addEventListener("click",X)}),r.querySelectorAll('input[data-radio-button="true"][data-editable="true"]').forEach(l=>{const e=l,t=e.getAttribute("data-row-id"),a=e.getAttribute("data-column-id");if(!t||!a)return;const s=isNaN(Number(t))?t:Number(t),n=e.cloneNode(!0);e.parentNode?.replaceChild(n,e),n.addEventListener("change",i=>{if(i.stopPropagation(),n.checked){r.querySelectorAll(`input[data-radio-button="true"][data-column-id="${a}"]`).forEach(L=>{const x=L.getAttribute("data-row-id");if(x&&x!==String(s)){L.checked=!1;const $=d.rows.find(W=>String(W.id)===x);$&&($.data[a]=!1)}});const p=d.rows.find(L=>String(L.id)===String(s));p&&(p.data[a]=!0,p.data[`${a}_value`]=s)}T()})}),r.querySelectorAll('input[data-checkbox-button="true"]').forEach(l=>{const e=l,t=e.getAttribute("data-row-id"),a=e.getAttribute("data-column-id");if(!t||!a)return;const s=isNaN(Number(t))?t:Number(t),n=e.cloneNode(!0);e.parentNode?.replaceChild(n,e),n.addEventListener("change",i=>{i.stopPropagation();const c=d.rows.find(p=>String(p.id)===String(s));c&&(c.data[a]=n.checked,d.onRowSelect&&d.onRowSelect(s,n.checked),T())})}),r.querySelectorAll("input[data-column-checkbox-header]").forEach(l=>{const e=l,t=e.getAttribute("data-column-checkbox-header");if(!t)return;const a=e.cloneNode(!0);e.parentNode?.replaceChild(a,e),a.addEventListener("change",s=>{s.stopPropagation();const n=a.checked;d.rows.forEach(i=>{i.data||(i.data={}),i.data[t]=n}),d.onSelectAll&&d.onSelectAll(n),T()})}),r.querySelectorAll(".ubits-data-table__date-editable").forEach(l=>{const e=l.getAttribute("data-row-id"),t=l.getAttribute("data-column-id");if(!e||!t)return;const a=isNaN(Number(e))?e:Number(e),s=l.querySelector(".ubits-data-table__date-display"),n=l.querySelector(".ubits-data-table__calendar-container");if(!s||!n)return;let i=null;const c=x=>{const $=String(x.getDate()).padStart(2,"0"),W=String(x.getMonth()+1).padStart(2,"0"),q=x.getFullYear();return`${$}/${W}/${q}`},p=x=>{if(!x)return null;const[$,W,q]=x.split("/");if($&&W&&q)return new Date(parseInt(q),parseInt(W)-1,parseInt($));try{const Y=new Date(x);if(!isNaN(Y.getTime()))return Y}catch{}return null},L=async()=>{if(n.style.display!=="none"){n.style.display="none";return}if(i){n.style.display="block";return}try{const x=await xe(()=>import("./CalendarProvider-BYVqZ8Vm.js"),__vite__mapDeps([0,1]),import.meta.url),{createCalendar:$}=x,W=s.textContent||"",q=p(W)||new Date;i=$({mode:"single",selectedDate:p(W),initialDate:q,onDateSelect:Y=>{const P=c(Y);s.textContent=P,n&&(n.style.display="none");const F=d.rows.find(K=>K.id===a);F&&(F.data[t]=P,F.data[`${t}_iso`]=Y.toISOString().split("T")[0]),T()}}),n.appendChild(i.element),n.style.display="block"}catch(x){console.error("❌ [Data Table] Error cargando Calendar UBITS:",x),n.innerHTML='<div style="padding: 16px; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 8px; color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>',n.style.display="block"}};s.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),L()}),document.addEventListener("click",x=>{n&&!l.contains(x.target)&&(n.style.display="none")}),document.addEventListener("keydown",x=>{x.key==="Escape"&&n&&(n.style.display="none")})}),r.querySelectorAll('input[data-toggle-button="true"]').forEach(l=>{const e=l,t=e.getAttribute("data-row-id"),a=e.getAttribute("data-column-id");if(!t||!a)return;const s=isNaN(Number(t))?t:Number(t),n=e.cloneNode(!0);e.parentNode?.replaceChild(n,e),n.addEventListener("change",c=>{c.stopPropagation();const p=d.rows.find(L=>String(L.id)===String(s));p&&(p.data[a]=n.checked,T())});const i=n.closest(".ubits-toggle");i&&i.addEventListener("click",c=>{c.target!==n&&!n.contains(c.target)&&(c.preventDefault(),c.stopPropagation(),n.checked=!n.checked,n.dispatchEvent(new Event("change",{bubbles:!0})))})})}catch{}};return T(),{element:r,destroy:()=>{r&&r.parentNode&&r.parentNode.removeChild(r)},update:O=>{d={...d,...O},O.columns&&(u=O.columns.filter(A=>A.visible!==!1).map(A=>A.id)),O.rows&&(f=O.rows.map(A=>A.id)),T()}}}const We={title:"Components/Data Table",tags:["autodocs"],parameters:{docs:{description:{component:"Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas."}}},argTypes:{columnReorderable:{control:"boolean",description:"Permite reordenar columnas mediante drag & drop",table:{defaultValue:{summary:"false"}}},rowReorderable:{control:"boolean",description:"Permite reordenar filas mediante drag & drop",table:{defaultValue:{summary:"false"}}},rowExpandable:{control:"boolean",description:"Muestra el icono de expandir/colapsar en las filas",table:{defaultValue:{summary:"true"}}},columnSortable:{control:"boolean",description:"Muestra botones de ordenamiento en los headers de las columnas",table:{defaultValue:{summary:"true"}}},showCheckbox:{control:"boolean",description:"Muestra la columna de checkbox para selección múltiple",table:{defaultValue:{summary:"true"}}},showVerticalScrollbar:{control:"boolean",description:"Muestra scrollbar vertical",table:{defaultValue:{summary:"false"}}},showHorizontalScrollbar:{control:"boolean",description:"Muestra scrollbar horizontal",table:{defaultValue:{summary:"false"}}},showColumnMenu:{control:"boolean",description:"Muestra el botón de menú en los headers de las columnas",table:{defaultValue:{summary:"true"}}},checkboxSticky:{control:"boolean",description:"Hace que la columna de checkbox sea sticky (fija) al hacer scroll horizontal",table:{defaultValue:{summary:"false"}}},dragHandleSticky:{control:"boolean",description:"Hace que la columna de drag handle (mover filas) sea sticky (fija) al hacer scroll horizontal",table:{defaultValue:{summary:"false"}}},expandSticky:{control:"boolean",description:"Hace que la columna de expand (desplegar filas) sea sticky (fija) al hacer scroll horizontal",table:{defaultValue:{summary:"false"}}},columnsCount:{control:{type:"number",min:1,max:10,step:1},description:"Número de columnas de datos a mostrar (excluyendo checkbox)",table:{defaultValue:{summary:"4"}}},columnType1:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 1 (Nombre)",table:{defaultValue:{summary:"nombre-avatar"}}},columnType2:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 2 (Email)",table:{defaultValue:{summary:"correo"}}},columnType3:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 3 (Estado)",table:{defaultValue:{summary:"estado"}}},columnType4:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 4 (Progreso)",table:{defaultValue:{summary:"progreso"}}},column1AvatarVariant:{control:{type:"select"},options:["photo","initials","icon"],description:"Variante de avatar para columna 1 (solo si es nombre-avatar o nombre-avatar-texto)",table:{defaultValue:{summary:"initials"}}},column1Editable:{control:"boolean",description:"Hacer editable la columna 1 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column2EmailClickable:{control:"boolean",description:"Hacer el email clicable en columna 2 (solo si es correo)",table:{defaultValue:{summary:"true"}}},column3Editable:{control:"boolean",description:"Hacer editable la columna 3 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column3RadioLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es radio)",table:{defaultValue:{summary:"false"}}},column3ToggleLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es toggle)",table:{defaultValue:{summary:"false"}}},column3CheckboxLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es checkbox)",table:{defaultValue:{summary:"false"}}}}},de={render:o=>{const h=document.createElement("div");h.style.padding="20px",h.style.background="var(--ubits-bg-1, #ffffff)",h.style.borderRadius="8px",h.style.width="100%",h.style.maxWidth="100%";const H=document.createElement("div");H.id=`data-table-story-container-${Date.now()}`,H.style.width="100%",H.style.overflow="auto";const C=o.columnsCount??4,r=o.columnType1??"nombre-avatar",d=o.columnType2??"correo",u=o.columnType3??"estado",f=o.columnType4??"progreso",b=o.columnType5??"nombre",v=o.columnType6??"nombre",S=o.columnType7??"pais",k=o.columnType8??"fecha",y=o.columnType9??"nombre",T=o.columnType10??"estado",m=o.column1AvatarVariant??"initials",Z=o.column1Editable??!1,te=o.column2EmailClickable??!0,O=o.column3Editable??!1,A=o.column3RadioLabel??!1,M=o.column3ToggleLabel??!1,E=o.column3CheckboxLabel??!1,I={id:"nombre",title:"Nombre",type:r,visible:!0,width:200};(r==="nombre-avatar"||r==="nombre-avatar-texto")&&(I.avatarVariant=m),["nombre","nombre-avatar","nombre-avatar-texto","estado","fecha","checkbox","radio"].includes(r)&&(I.editable=Z);const B={correo:{id:"email",title:"Email"},fecha:{id:"fecha",title:"Fecha"},nombre:{id:"nombre",title:"Nombre"},"nombre-avatar":{id:"nombre",title:"Nombre"},"nombre-avatar-texto":{id:"nombre",title:"Nombre"},estado:{id:"estado",title:"Estado"},progreso:{id:"progreso",title:"Progreso"},pais:{id:"pais",title:"País"},ciudad:{id:"ciudad",title:"Ciudad"},radio:{id:"estado",title:"Estado"},toggle:{id:"estado",title:"Estado"},checkbox:{id:"estado",title:"Estado"}}[d]||{id:"email",title:"Email"},z={id:B.id,title:B.title,type:d,visible:!0,width:250};d==="correo"&&(z.emailClickable=te),["nombre","nombre-avatar","nombre-avatar-texto","estado","fecha","checkbox","radio"].includes(d)&&(z.editable=Z);const R={id:"estado",title:"Estado",type:u,visible:!0,width:150};["nombre","nombre-avatar","nombre-avatar-texto","estado","fecha","checkbox","radio"].includes(u)&&(R.editable=O),u==="radio"?R.radioLabel=!!A:u==="toggle"?R.toggleLabel=!!M:u==="checkbox"&&(R.checkboxLabel=!!E);const l=[I,z,R,{id:"progreso",title:"Progreso",type:f,visible:!0,width:180},{id:"telefono",title:"Teléfono",type:b,visible:!0,width:150},{id:"ciudad",title:"Ciudad",type:v,visible:!0,width:150},{id:"pais",title:"País",type:S,visible:!0,width:150},{id:"fecha",title:"Fecha",type:k,visible:!0,width:150},{id:"categoria",title:"Categoría",type:y,visible:!0,width:150},{id:"prioridad",title:"Prioridad",type:T,visible:!0,width:150}].slice(0,C),e=[{id:1,data:{nombre:"Juan Pérez",email:"juan.perez@empresa.com",estado:"Activo",progreso:75,telefono:"+57 300 123 4567",ciudad:"Bogotá",pais:"Colombia",fecha:"2024-01-15",categoria:"Desarrollo",prioridad:"Alta","checkbox-2":!1,avatar:{initials:"JP",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},expanded:!1,renderExpandedContent:a=>`
          <div style="padding: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Información adicional</h4>
            <p style="margin: 0; font-size: 13px; color: var(--ubits-body-md-regular-2, #6b7280);">
              Detalles adicionales para ${a.nombre}
            </p>
          </div>
        `},{id:2,data:{nombre:"María García",email:"maria.garcia@empresa.com",estado:"Inactivo",progreso:45,telefono:"+57 301 234 5678",ciudad:"Medellín",pais:"Colombia",fecha:"2024-02-20",categoria:"Diseño",prioridad:"Media","checkbox-2":!0,avatar:{initials:"MG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:3,data:{nombre:"Carlos López",email:"carlos.lopez@empresa.com",estado:"Activo",progreso:90,telefono:"+57 302 345 6789",ciudad:"Cali",pais:"Colombia",fecha:"2024-03-10",categoria:"Marketing",prioridad:"Baja","checkbox-2":!1,avatar:{initials:"CL",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},expanded:!1,renderExpandedContent:a=>`
          <div style="padding: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Información adicional</h4>
            <p style="margin: 0; font-size: 13px; color: var(--ubits-body-md-regular-2, #6b7280);">
              Detalles adicionales para ${a.nombre}
            </p>
          </div>
        `},{id:4,data:{nombre:"Ana Martínez",email:"ana.martinez@empresa.com",estado:"Pendiente",progreso:30,telefono:"+57 303 456 7890",ciudad:"Barranquilla",pais:"Colombia",fecha:"2024-04-05",categoria:"Ventas",prioridad:"Alta","checkbox-2":!0,avatar:{initials:"AM",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:5,data:{nombre:"Pedro Sánchez",email:"pedro.sanchez@empresa.com",estado:"Activo",progreso:100,telefono:"+57 304 567 8901",ciudad:"Cartagena",pais:"Colombia",fecha:"2024-05-12",categoria:"Soporte",prioridad:"Media","checkbox-2":!1,avatar:{initials:"PS",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:6,data:{nombre:"Patricia Rodríguez",email:"patricia.rodriguez@empresa.com",estado:"Activo",progreso:60,telefono:"+57 305 678 9012",ciudad:"Bucaramanga",pais:"Colombia",fecha:"2024-06-18",categoria:"Recursos Humanos",prioridad:"Baja","checkbox-2":!0,avatar:{initials:"PR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:7,data:{nombre:"Roberto Silva",email:"roberto.silva@empresa.com",estado:"Inactivo",progreso:25,telefono:"+57 306 789 0123",ciudad:"Pereira",pais:"Colombia",fecha:"2024-07-22",categoria:"Finanzas",prioridad:"Alta","checkbox-2":!1,avatar:{initials:"RS",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:8,data:{nombre:"Carmen Vargas",email:"carmen.vargas@empresa.com",estado:"Activo",progreso:85,telefono:"+57 307 890 1234",ciudad:"Santa Marta",pais:"Colombia",fecha:"2024-08-05",categoria:"Operaciones",prioridad:"Media","checkbox-2":!0,avatar:{initials:"CV",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:9,data:{nombre:"Diego Morales",email:"diego.morales@empresa.com",estado:"Pendiente",progreso:50,telefono:"+57 308 901 2345",ciudad:"Manizales",pais:"Colombia",fecha:"2024-09-10",categoria:"Tecnología",prioridad:"Baja","checkbox-2":!1,avatar:{initials:"DM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:10,data:{nombre:"Daniela Herrera",email:"daniela.herrera@empresa.com",estado:"Activo",progreso:95,telefono:"+57 309 012 3456",ciudad:"Armenia",pais:"Colombia",fecha:"2024-10-15",categoria:"Innovación",prioridad:"Alta","checkbox-2":!0,avatar:{initials:"DH",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:11,data:{nombre:"Andrés Castro",email:"andres.castro@empresa.com",estado:"Activo",progreso:70,telefono:"+57 310 123 4567",ciudad:"Villavicencio",pais:"Colombia",fecha:"2024-11-20",categoria:"Logística",prioridad:"Media","checkbox-2":!1,avatar:{initials:"AC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:12,data:{nombre:"Valentina Rojas",email:"valentina.rojas@empresa.com",estado:"Inactivo",progreso:40,telefono:"+57 311 234 5678",ciudad:"Ibagué",pais:"Colombia",fecha:"2024-12-25",categoria:"Calidad",prioridad:"Baja","checkbox-2":!0,avatar:{initials:"VR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:13,data:{nombre:"Fernando Gutiérrez",email:"fernando.gutierrez@empresa.com",estado:"Activo",progreso:80,telefono:"+57 312 345 6789",ciudad:"Pasto",pais:"Colombia",fecha:"2025-01-08",categoria:"Investigación",prioridad:"Alta","checkbox-2":!1,avatar:{initials:"FG",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:14,data:{nombre:"Isabella Ramírez",email:"isabella.ramirez@empresa.com",estado:"Pendiente",progreso:55,telefono:"+57 313 456 7890",ciudad:"Tunja",pais:"Colombia",fecha:"2025-02-12",categoria:"Comunicaciones",prioridad:"Media","checkbox-2":!0,avatar:{initials:"IR",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:15,data:{nombre:"Sebastián Torres",email:"sebastian.torres@empresa.com",estado:"Activo",progreso:65,telefono:"+57 314 567 8901",ciudad:"Neiva",pais:"Colombia",fecha:"2025-03-18",categoria:"Estrategia",prioridad:"Baja","checkbox-2":!1,avatar:{initials:"ST",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1}],t={containerId:H.id,columns:l,rows:e,columnReorderable:o.columnReorderable??!1,rowReorderable:o.rowReorderable??!1,rowExpandable:o.rowExpandable??!0,columnSortable:o.columnSortable??!0,showCheckbox:o.showCheckbox??!0,showVerticalScrollbar:o.showVerticalScrollbar??!1,showHorizontalScrollbar:o.showHorizontalScrollbar??!1,showColumnMenu:o.showColumnMenu??!0,checkboxSticky:o.checkboxSticky??!1,dragHandleSticky:o.dragHandleSticky??!1,expandSticky:o.expandSticky??!1,onRowExpand:(a,s)=>{console.log("Row expanded:",a,s)},onColumnReorder:a=>{console.log("Columns reordered:",a)},onRowReorder:a=>{console.log("Rows reordered:",a)},onSort:(a,s)=>{console.log("Column sorted:",a,s)},onColumnPin:(a,s)=>{console.log("Column pinned:",a,s)},onRowSelect:(a,s)=>{console.log("Row selected:",a,s)},onSelectAll:a=>{console.log("Select all:",a)}};return h.appendChild(H),setTimeout(()=>{try{const a=H.querySelector(".ubits-data-table");if(a){const s=a;if(s._dataTableInstance)try{const n=s._dataTableInstance;n&&typeof n.destroy=="function"&&n.destroy()}catch(n){console.warn("Error destroying previous table instance:",n)}}H.innerHTML="",console.log("🔄 [DataTable Story] Reconstruyendo tabla con tipos:",{columnType1:r,columnType2:d,columnType3:u,columnType4:f,columns:l.map(s=>({id:s.id,type:s.type,title:s.title}))}),Ne(t)}catch(a){console.error("Error creating data table:",a)}},100),h},args:{columnReorderable:!1,rowReorderable:!1,rowExpandable:!0,columnSortable:!0,showCheckbox:!0,showVerticalScrollbar:!1,showHorizontalScrollbar:!1,showColumnMenu:!0,checkboxSticky:!1,dragHandleSticky:!1,expandSticky:!1,columnsCount:4,columnType1:"nombre-avatar",columnType2:"correo",columnType3:"estado",columnType4:"progreso",column1AvatarVariant:"initials",column1Editable:!1,column2EmailClickable:!0,column3Editable:!1,column3RadioLabel:!1,column3ToggleLabel:!1,column3CheckboxLabel:!1}};de.parameters={...de.parameters,docs:{...de.parameters?.docs,source:{originalSource:`{
  render: args => {
    // Contenedor principal con estilos UBITS
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '100%';

    // Contenedor para la tabla - usar ID único para forzar reconstrucción
    const tableContainer = document.createElement('div');
    tableContainer.id = \`data-table-story-container-\${Date.now()}\`;
    tableContainer.style.width = '100%';
    tableContainer.style.overflow = 'auto';

    // Generar columnas dinámicamente según columnsCount
    const columnsCount = args.columnsCount ?? 4;

    // Tipos de columna disponibles (pueden ser controlados desde Storybook)
    // Leer directamente de args para asegurar que se actualicen cuando cambien
    const columnType1 = args.columnType1 ?? 'nombre-avatar';
    const columnType2 = args.columnType2 ?? 'correo';
    const columnType3 = args.columnType3 ?? 'estado';
    const columnType4 = args.columnType4 ?? 'progreso';
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
    const column3CheckboxLabel = args.column3CheckboxLabel ?? false;

    // Construir columnas con sus controles
    // IMPORTANTE: Construir desde cero para evitar propiedades residuales cuando cambia el tipo

    // Columna 1
    const col1: TableColumn = {
      id: 'nombre',
      title: 'Nombre',
      type: columnType1 as any,
      visible: true,
      width: 200
    };

    // Agregar propiedades específicas SOLO si el tipo las requiere
    if (columnType1 === 'nombre-avatar' || columnType1 === 'nombre-avatar-texto') {
      col1.avatarVariant = column1AvatarVariant as 'photo' | 'initials' | 'icon';
    }
    const editableTypes1 = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
    if (editableTypes1.includes(columnType1)) {
      col1.editable = column1Editable;
    }

    // Columna 2 - IMPORTANTE: Cambiar ID y título según el tipo para usar el campo correcto de los datos
    // Mapeo de tipos a IDs y títulos
    const column2Mapping: Record<string, {
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
        id: 'estado',
        title: 'Estado'
      },
      'toggle': {
        id: 'estado',
        title: 'Estado'
      },
      'checkbox': {
        id: 'estado',
        title: 'Estado'
      }
    };
    const col2Config = column2Mapping[columnType2] || {
      id: 'email',
      title: 'Email'
    };
    const col2: TableColumn = {
      id: col2Config.id,
      title: col2Config.title,
      type: columnType2 as any,
      visible: true,
      width: 250
    };

    // SOLO agregar emailClickable si el tipo es correo
    if (columnType2 === 'correo') {
      col2.emailClickable = column2EmailClickable;
    }

    // Si el tipo es editable, agregar editable
    const editableTypes2 = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
    if (editableTypes2.includes(columnType2)) {
      col2.editable = column1Editable; // Usar el control de columna 1 para simplicidad
    }

    // Columna 3
    const col3: TableColumn = {
      id: 'estado',
      title: 'Estado',
      type: columnType3 as any,
      visible: true,
      width: 150
    };
    const editableTypes3 = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
    if (editableTypes3.includes(columnType3)) {
      col3.editable = column3Editable;
    }

    // Agregar labels SOLO según el tipo actual - limpiar otros tipos
    if (columnType3 === 'radio') {
      col3.radioLabel = column3RadioLabel ? true : false;
    } else if (columnType3 === 'toggle') {
      col3.toggleLabel = column3ToggleLabel ? true : false;
    } else if (columnType3 === 'checkbox') {
      col3.checkboxLabel = column3CheckboxLabel ? true : false;
    }
    const allColumns: TableColumn[] = [col1, col2, col3, {
      id: 'progreso',
      title: 'Progreso',
      type: columnType4 as any,
      visible: true,
      width: 180
    }, {
      id: 'telefono',
      title: 'Teléfono',
      type: columnType5 as any,
      visible: true,
      width: 150
    }, {
      id: 'ciudad',
      title: 'Ciudad',
      type: columnType6 as any,
      visible: true,
      width: 150
    }, {
      id: 'pais',
      title: 'País',
      type: columnType7 as any,
      visible: true,
      width: 150
    }, {
      id: 'fecha',
      title: 'Fecha',
      type: columnType8 as any,
      visible: true,
      width: 150
    }, {
      id: 'categoria',
      title: 'Categoría',
      type: columnType9 as any,
      visible: true,
      width: 150
    }, {
      id: 'prioridad',
      title: 'Prioridad',
      type: columnType10 as any,
      visible: true,
      width: 150
    }];

    // Seleccionar solo las columnas necesarias según columnsCount
    const columns: TableColumn[] = allColumns.slice(0, columnsCount);
    const rows: TableRow[] = [{
      id: 1,
      data: {
        nombre: 'Juan Pérez',
        email: 'juan.perez@empresa.com',
        estado: 'Activo',
        progreso: 75,
        telefono: '+57 300 123 4567',
        ciudad: 'Bogotá',
        pais: 'Colombia',
        fecha: '2024-01-15',
        categoria: 'Desarrollo',
        prioridad: 'Alta',
        'checkbox-2': false,
        avatar: {
          initials: 'JP',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false,
      renderExpandedContent: data => \`
          <div style="padding: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Información adicional</h4>
            <p style="margin: 0; font-size: 13px; color: var(--ubits-body-md-regular-2, #6b7280);">
              Detalles adicionales para \${data.nombre}
            </p>
          </div>
        \`
    }, {
      id: 2,
      data: {
        nombre: 'María García',
        email: 'maria.garcia@empresa.com',
        estado: 'Inactivo',
        progreso: 45,
        telefono: '+57 301 234 5678',
        ciudad: 'Medellín',
        pais: 'Colombia',
        fecha: '2024-02-20',
        categoria: 'Diseño',
        prioridad: 'Media',
        'checkbox-2': true,
        avatar: {
          initials: 'MG',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 3,
      data: {
        nombre: 'Carlos López',
        email: 'carlos.lopez@empresa.com',
        estado: 'Activo',
        progreso: 90,
        telefono: '+57 302 345 6789',
        ciudad: 'Cali',
        pais: 'Colombia',
        fecha: '2024-03-10',
        categoria: 'Marketing',
        prioridad: 'Baja',
        'checkbox-2': false,
        avatar: {
          initials: 'CL',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false,
      renderExpandedContent: data => \`
          <div style="padding: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Información adicional</h4>
            <p style="margin: 0; font-size: 13px; color: var(--ubits-body-md-regular-2, #6b7280);">
              Detalles adicionales para \${data.nombre}
            </p>
          </div>
        \`
    }, {
      id: 4,
      data: {
        nombre: 'Ana Martínez',
        email: 'ana.martinez@empresa.com',
        estado: 'Pendiente',
        progreso: 30,
        telefono: '+57 303 456 7890',
        ciudad: 'Barranquilla',
        pais: 'Colombia',
        fecha: '2024-04-05',
        categoria: 'Ventas',
        prioridad: 'Alta',
        'checkbox-2': true,
        avatar: {
          initials: 'AM',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 5,
      data: {
        nombre: 'Pedro Sánchez',
        email: 'pedro.sanchez@empresa.com',
        estado: 'Activo',
        progreso: 100,
        telefono: '+57 304 567 8901',
        ciudad: 'Cartagena',
        pais: 'Colombia',
        fecha: '2024-05-12',
        categoria: 'Soporte',
        prioridad: 'Media',
        'checkbox-2': false,
        avatar: {
          initials: 'PS',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 6,
      data: {
        nombre: 'Patricia Rodríguez',
        email: 'patricia.rodriguez@empresa.com',
        estado: 'Activo',
        progreso: 60,
        telefono: '+57 305 678 9012',
        ciudad: 'Bucaramanga',
        pais: 'Colombia',
        fecha: '2024-06-18',
        categoria: 'Recursos Humanos',
        prioridad: 'Baja',
        'checkbox-2': true,
        avatar: {
          initials: 'PR',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 7,
      data: {
        nombre: 'Roberto Silva',
        email: 'roberto.silva@empresa.com',
        estado: 'Inactivo',
        progreso: 25,
        telefono: '+57 306 789 0123',
        ciudad: 'Pereira',
        pais: 'Colombia',
        fecha: '2024-07-22',
        categoria: 'Finanzas',
        prioridad: 'Alta',
        'checkbox-2': false,
        avatar: {
          initials: 'RS',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 8,
      data: {
        nombre: 'Carmen Vargas',
        email: 'carmen.vargas@empresa.com',
        estado: 'Activo',
        progreso: 85,
        telefono: '+57 307 890 1234',
        ciudad: 'Santa Marta',
        pais: 'Colombia',
        fecha: '2024-08-05',
        categoria: 'Operaciones',
        prioridad: 'Media',
        'checkbox-2': true,
        avatar: {
          initials: 'CV',
          badgeColor: 'pink',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 9,
      data: {
        nombre: 'Diego Morales',
        email: 'diego.morales@empresa.com',
        estado: 'Pendiente',
        progreso: 50,
        telefono: '+57 308 901 2345',
        ciudad: 'Manizales',
        pais: 'Colombia',
        fecha: '2024-09-10',
        categoria: 'Tecnología',
        prioridad: 'Baja',
        'checkbox-2': false,
        avatar: {
          initials: 'DM',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 10,
      data: {
        nombre: 'Daniela Herrera',
        email: 'daniela.herrera@empresa.com',
        estado: 'Activo',
        progreso: 95,
        telefono: '+57 309 012 3456',
        ciudad: 'Armenia',
        pais: 'Colombia',
        fecha: '2024-10-15',
        categoria: 'Innovación',
        prioridad: 'Alta',
        'checkbox-2': true,
        avatar: {
          initials: 'DH',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 11,
      data: {
        nombre: 'Andrés Castro',
        email: 'andres.castro@empresa.com',
        estado: 'Activo',
        progreso: 70,
        telefono: '+57 310 123 4567',
        ciudad: 'Villavicencio',
        pais: 'Colombia',
        fecha: '2024-11-20',
        categoria: 'Logística',
        prioridad: 'Media',
        'checkbox-2': false,
        avatar: {
          initials: 'AC',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 12,
      data: {
        nombre: 'Valentina Rojas',
        email: 'valentina.rojas@empresa.com',
        estado: 'Inactivo',
        progreso: 40,
        telefono: '+57 311 234 5678',
        ciudad: 'Ibagué',
        pais: 'Colombia',
        fecha: '2024-12-25',
        categoria: 'Calidad',
        prioridad: 'Baja',
        'checkbox-2': true,
        avatar: {
          initials: 'VR',
          badgeColor: 'orange',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 13,
      data: {
        nombre: 'Fernando Gutiérrez',
        email: 'fernando.gutierrez@empresa.com',
        estado: 'Activo',
        progreso: 80,
        telefono: '+57 312 345 6789',
        ciudad: 'Pasto',
        pais: 'Colombia',
        fecha: '2025-01-08',
        categoria: 'Investigación',
        prioridad: 'Alta',
        'checkbox-2': false,
        avatar: {
          initials: 'FG',
          badgeColor: 'green',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 14,
      data: {
        nombre: 'Isabella Ramírez',
        email: 'isabella.ramirez@empresa.com',
        estado: 'Pendiente',
        progreso: 55,
        telefono: '+57 313 456 7890',
        ciudad: 'Tunja',
        pais: 'Colombia',
        fecha: '2025-02-12',
        categoria: 'Comunicaciones',
        prioridad: 'Media',
        'checkbox-2': true,
        avatar: {
          initials: 'IR',
          badgeColor: 'purple',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }, {
      id: 15,
      data: {
        nombre: 'Sebastián Torres',
        email: 'sebastian.torres@empresa.com',
        estado: 'Activo',
        progreso: 65,
        telefono: '+57 314 567 8901',
        ciudad: 'Neiva',
        pais: 'Colombia',
        fecha: '2025-03-18',
        categoria: 'Estrategia',
        prioridad: 'Baja',
        'checkbox-2': false,
        avatar: {
          initials: 'ST',
          badgeColor: 'blue',
          imageUrl: '/images/Profile-image.jpg'
        }
      },
      expanded: false
    }];
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: args.columnReorderable ?? false,
      rowReorderable: args.rowReorderable ?? false,
      rowExpandable: args.rowExpandable ?? true,
      columnSortable: args.columnSortable ?? true,
      showCheckbox: args.showCheckbox ?? true,
      showVerticalScrollbar: args.showVerticalScrollbar ?? false,
      showHorizontalScrollbar: args.showHorizontalScrollbar ?? false,
      showColumnMenu: args.showColumnMenu ?? true,
      checkboxSticky: (args as any).checkboxSticky ?? false,
      dragHandleSticky: (args as any).dragHandleSticky ?? false,
      expandSticky: (args as any).expandSticky ?? false,
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
        console.log('Column pinned:', columnId, pinned);
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

    // Inicializar la tabla después de que se monte en el DOM
    setTimeout(() => {
      try {
        // Limpiar cualquier tabla anterior que pueda existir
        const existingTable = tableContainer.querySelector('.ubits-data-table');
        if (existingTable) {
          // Intentar destruir la instancia anterior si existe
          const tableElement = existingTable as HTMLElement;
          if ((tableElement as any)._dataTableInstance) {
            try {
              const instance = (tableElement as any)._dataTableInstance;
              if (instance && typeof instance.destroy === 'function') {
                instance.destroy();
              }
            } catch (e) {
              console.warn('Error destroying previous table instance:', e);
            }
          }
        }

        // Limpiar el contenedor completamente antes de crear nueva tabla
        tableContainer.innerHTML = '';

        // Log para debugging
        console.log('🔄 [DataTable Story] Reconstruyendo tabla con tipos:', {
          columnType1,
          columnType2,
          columnType3,
          columnType4,
          columns: columns.map(c => ({
            id: c.id,
            type: c.type,
            title: c.title
          }))
        });

        // Crear la nueva tabla
        createDataTable(options);
      } catch (error) {
        console.error('Error creating data table:', error);
      }
    }, 100);
    return container;
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: true,
    columnSortable: true,
    showCheckbox: true,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: true,
    checkboxSticky: false,
    dragHandleSticky: false,
    expandSticky: false,
    columnsCount: 4,
    columnType1: 'nombre-avatar',
    columnType2: 'correo',
    columnType3: 'estado',
    columnType4: 'progreso',
    column1AvatarVariant: 'initials',
    column1Editable: false,
    column2EmailClickable: true,
    column3Editable: false,
    column3RadioLabel: false,
    column3ToggleLabel: false,
    column3CheckboxLabel: false
  }
}`,...de.parameters?.docs?.source}}};const Ve=["Default"];export{de as Default,Ve as __namedExportsOrder,We as default};
