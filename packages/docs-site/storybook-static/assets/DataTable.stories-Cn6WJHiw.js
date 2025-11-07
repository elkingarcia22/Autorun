import{r as ue}from"./CheckboxProvider-DIr0OIhT.js";import{r as Ce}from"./ProgressProvider-OoWtyPYr.js";import{r as xe}from"./StatusTagProvider-BsgFC12L.js";import{r as Z}from"./AvatarProvider-CF4x-oFR.js";import{r as we}from"./ToggleProvider-tayloMCw.js";import{r as ve}from"./RadioButtonProvider-CIXtywXC.js";import{r as ce}from"./ButtonProvider-DuF2BcOZ.js";import{c as he,r as Le}from"./ListProvider-DPCKuQ24.js";import{c as fe}from"./ScrollProvider-DeKjMEqs.js";import"./iframe-Cv55Ao8S.js";import"./preload-helper-PPVm8Dsz.js";function Ee(o,f,O){const C=f.data[o.id],r=f.data;switch(O){case"nombre":{const d=C||r.nombre||r.name||"";return o.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${d}</span>`:`<span class="ubits-body-md-regular">${d}</span>`}case"progreso":{let d=null;if(C!=null){if(typeof C=="number")d=C;else if(typeof C=="string"){const h=parseFloat(C.replace("%","").trim());isNaN(h)||(d=h)}}if(d===null&&r){const h=r.progress!==void 0?r.progress:r.progreso;if(h!=null){if(typeof h=="number")d=h;else if(typeof h=="string"){const m=parseFloat(h.replace("%","").trim());isNaN(m)||(d=m)}}}return d===null&&(d=50),d=Math.max(0,Math.min(100,d)),Ce({value:d,size:"sm",variant:"default",indicator:`${Math.round(d)}%`})}case"nombre-avatar":{const d=C||r.nombre||r.name||"",u=r.avatar||r.avatarUrl||null,h=o.avatarVariant||"initials",m=y=>y.split(" ").map(S=>S[0]).join("").toUpperCase().slice(0,2)||"U";let v="";if(h==="photo"){let y=null;u&&typeof u=="string"?y=u:u&&typeof u=="object"&&(y=u.imageUrl||u.url||null),!y&&r&&(y=r.imageUrl||r.avatarUrl||r.avatarImage||null),y?v=Z({imageUrl:y,size:"sm"}):v=Z({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(h==="initials")if(u&&typeof u=="object"&&u.initials)v=Z({initials:u.initials,size:"sm"});else{const y=m(d);v=Z({initials:y,size:"sm"})}else{const y=u&&typeof u=="object"&&u.icon?u.icon:"user";v=Z({icon:y,size:"sm"})}const E=o.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${d}</span>`:`<span class="ubits-body-md-regular">${d}</span>`;return`
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${v}
          ${E}
        </div>
      `}case"nombre-avatar-texto":{const d=C||r.nombre||r.name||"",u=r.avatar||r.avatarUrl||null,h=r.area||r.areaNombre||r.textoComplementario||r.complementario||"",m=o.avatarVariant||"initials",v=y=>y.split(" ").map(S=>S[0]).join("").toUpperCase().slice(0,2)||"U";let L="";if(m==="photo"){let y=null;u&&typeof u=="string"?y=u:u&&typeof u=="object"&&(y=u.imageUrl||u.url||null),!y&&r&&(y=r.imageUrl||r.avatarUrl||r.avatarImage||null),y?L=Z({imageUrl:y,size:"sm"}):L=Z({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(m==="initials")if(u&&typeof u=="object"&&u.initials)L=Z({initials:u.initials,size:"sm"});else{const y=v(d);L=Z({initials:y,size:"sm"})}else{const y=u&&typeof u=="object"&&u.icon?u.icon:"user";L=Z({icon:y,size:"sm"})}const E=`<span class="ubits-body-md-regular">${d}</span>`;return`
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm, 12px);">
          ${L}
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${E}
            ${h?`<span class="ubits-body-sm-regular" style="color: var(--ubits-fg-1-medium);">${h}</span>`:""}
          </div>
        </div>
      `}case"estado":{const d={activo:"active",inactivo:"disabled",pendiente:"pending",completado:"completed",publicado:"published",cumplido:"fulfilled",creado:"created",error:"not-fulfilled",denegado:"denied",borrador:"draft","en-progreso":"in-progress",sincronizando:"syncing","pendiente-aprobacion":"pending-approval","no-iniciado":"not-started",finalizado:"finished",archivado:"archived",deshabilitado:"disabled",pausado:"paused",oculto:"hidden",cancelado:"denied"},u=C||r.estado||r.status||"pendiente",h=String(u).toLowerCase().trim(),m=d[h]||d.pendiente,L={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"}[m]||String(u),E=o.editable,y=xe({label:L,status:m,size:"sm",rightIcon:E?"chevron-down":null,clickable:E});return E?`
          <div class="ubits-data-table__status-editable" data-row-id="${f.id}" data-column-id="${o.id}" data-editable="true" data-current-status="${m}">
            ${y}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${f.id}-${o.id}" style="display: none;"></div>
          </div>
        `:y}case"radio":{const d=C===!0||C==="true"||C===1||C===f.id||C===String(f.id),u=o.radioLabel!==!1&&o.radioLabel!==void 0,h=typeof o.radioLabel=="string"?o.radioLabel:u?String(f.data[o.id]||f.id):"",m=o.editable===!0,v=!m;return ve({label:h,name:`radio-${o.id}`,value:String(f.id),checked:d,size:"md",disabled:v}).replace("<input",`<input data-row-id="${f.id}" data-column-id="${o.id}" data-radio-button="true" ${m?'data-editable="true"':""}`)}case"toggle":{const d=C===!0||C==="true"||C===1,u=o.toggleLabel!==!1&&o.toggleLabel!==void 0,h=typeof o.toggleLabel=="string"?o.toggleLabel:u?String(f.data[o.id]||f.id):"";return we({label:h,checked:d,size:"md"}).replace("<input",`<input data-row-id="${f.id}" data-column-id="${o.id}" data-toggle-button="true"`)}case"checkbox":{const d=C===!0||C==="true"||C===1,u=o.checkboxLabel!==!1&&o.checkboxLabel!==void 0,h=typeof o.checkboxLabel=="string"?o.checkboxLabel:u?String(f.data[o.id]||f.id):"",m=o.editable===!0;return ue({label:h,checked:d,size:"md",disabled:!m}).replace("<input",`<input data-row-id="${f.id}" data-column-id="${o.id}" data-checkbox-button="true" ${m?'data-editable="true"':""}`)}case"correo":{const d=C||"";return o.emailClickable!==!1?`<a href="mailto:${d}" class="ubits-body-md-regular" style="color: var(--ubits-accent-brand-static-inverted); text-decoration: none;">${d}</a>`:`<span class="ubits-body-md-regular">${d}</span>`}case"acciones":return ce({text:"Eliminar",variant:"tertiary",size:"sm",icon:"trash",iconStyle:"regular",className:"ubits-data-table__action-button"});case"fecha":{const d=C||"";if(o.editable){let h="";if(d)try{const m=new Date(d);isNaN(m.getTime())||(h=m.toISOString().split("T")[0])}catch{h=new Date().toISOString().split("T")[0]}else h=new Date().toISOString().split("T")[0];return`
          <div class="ubits-data-table__date-editable" data-row-id="${f.id}" data-column-id="${o.id}" data-editable="true">
            <span class="ubits-body-md-regular ubits-data-table__date-display">${d||"Seleccionar fecha"}</span>
            <input type="date" class="ubits-data-table__date-input" value="${h}" style="display: none;" data-row-id="${f.id}" data-column-id="${o.id}">
          </div>
        `}return`<span class="ubits-body-md-regular">${d}</span>`}case"area":return`<span class="ubits-body-md-regular">${C||"Desarrollo"}</span>`;case"lider":return`<span class="ubits-body-md-regular">${C||"Juan Pérez"}</span>`;case"pais":return`<span class="ubits-body-md-regular">${C||"Colombia"}</span>`;case"ciudad":return`<span class="ubits-body-md-regular">${C||"Bogotá"}</span>`;case"drag-handle":return`
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${f.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;case"expand":{const d=f.expanded||!1;return`
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${d?"Colapsar":"Expandir"} fila"
          data-row-id="${f.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${d?"down":"right"}" aria-hidden="true"></i>
        </button>
      `}default:return`<span class="ubits-body-md-regular">${C||""}</span>`}}function Se(o,f,O=0){if(o.id==="checkbox"||o.id.startsWith("checkbox-")){const u=f.data[o.id]||!1;console.log("📦 [CELL] Renderizando celda checkbox, column.id:",o.id,"row.id:",f.id,"checkboxValue:",u);const m=ue({label:"",checked:u,size:"md",className:"ubits-data-table__cell-checkbox"}).replace("<input",`<input data-row-id="${f.id}" data-column-id="${o.id}" aria-label="Checkbox ${o.title}"`),v=o.id==="checkbox-2"?"12px":"var(--ubits-spacing-md, 16px)",L=o.pinned?" ubits-data-table__cell--pinned":"",E=o.pinned?`position: sticky !important; left: ${O}px !important; z-index: 12 !important;`:"",S=`${`text-align: center; vertical-align: middle; padding-left: ${v} !important;`}${E?" "+E:""}`;o.pinned&&console.log("📌 [CELL CHECKBOX] Columna fijada detectada:",{columnId:o.id,rowId:f.id,pinned:o.pinned,pinnedLeft:O,pinnedClass:L,pinnedStyle:E,cellStyle:S,hasPinnedClass:L.includes("pinned"),hasPinnedStyle:E.includes("left"),hasPositionStyle:E.includes("sticky")});const b=`
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${L}" data-column-id="${o.id}" ${o.pinned?'data-pinned="true"':""} style="${S}">
        ${m}
      </td>
    `;return console.log("📦 [CELL] Celda HTML generada para",o.id,"row",f.id,"length:",b.length),console.log("📦 [CELL] ¿Celda contiene checkbox-2?",b.includes("checkbox-2")),b}if(o.type){const u=Ee(o,f,o.type),h=o.editable&&(o.type==="nombre"||o.type==="nombre-avatar"||o.type==="estado"||o.type==="fecha"||o.type==="checkbox"||o.type==="radio")&&o.type!=="drag-handle"&&o.type!=="expand",m=o.type==="drag-handle"?"ubits-data-table__cell--drag-handle":o.type==="expand"?"ubits-data-table__cell--expand":`ubits-data-table__cell--${o.type}`,v=h?"ubits-data-table__cell--editable":"",L=o.pinned?" ubits-data-table__cell--pinned":"",E=o.type==="drag-handle"||o.type==="expand"?"text-align: center; vertical-align: middle;":"",y=o.pinned?`position: sticky; left: ${O}px;`:"",S=`${E}${y?" "+y:""}`,b=S?` style="${S}"`:"";o.pinned&&console.log("📌 [CELL TIPO] Columna fijada detectada:",{columnId:o.id,columnType:o.type,rowId:f.id,pinned:o.pinned,pinnedLeft:O,pinnedClass:L,pinnedStyle:y,hasPinnedClass:L.includes("pinned"),hasPinnedStyle:y.includes("left"),hasPositionStyle:y.includes("sticky")});const q=h&&(o.type==="nombre"||o.type==="nombre-avatar"||o.type==="estado"||o.type==="fecha")?`data-row-id="${f.id}" data-column-id="${o.id}" data-editable="true"${o.pinned?' data-pinned="true"':""}`:`data-column-id="${o.id}"${o.pinned?' data-pinned="true"':""}`;return`
      <td class="ubits-data-table__cell ${m} ${v}${L}" ${q}${b}>
        ${u}
      </td>
    `}const C=o.renderCell?o.renderCell(f.data):f.data[o.id]||"",r=o.pinned?" ubits-data-table__cell--pinned":"",d=o.pinned?` style="position: sticky; left: ${O}px;"`:"";return o.pinned&&console.log("📌 [CELL NORMAL] Columna fijada detectada:",{columnId:o.id,rowId:f.id,pinned:o.pinned,pinnedLeft:O,pinnedClass:r,pinnedStyle:d,hasPinnedClass:r.includes("pinned"),hasPinnedStyle:d.includes("left"),hasPositionStyle:d.includes("sticky")}),`
    <td class="ubits-data-table__cell${r}" data-column-id="${o.id}"${o.pinned?' data-pinned="true"':""}${d}>
      ${C}
    </td>
  `}function Te(o,f=!1,O=!0,C=[],r=null,d=null,u=!0,h=0){if(o.type==="drag-handle"||o.type==="expand"){const $=o.pinned?" ubits-data-table__column-header--pinned":"",P=o.pinned?`position: sticky !important; left: ${h}px !important; z-index: 10 !important;`:"",D=o.width?`width: ${o.width}px;`:"",U=[P,D].filter(Boolean).join(" "),k=U?`style="${U}"`:"";return`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${o.type}${$}" 
        ${k}
        data-column-id="${o.id}"
        ${o.pinned?'data-pinned="true"':""}
      >
      </th>
    `}if(o.id==="checkbox"||o.id.startsWith("checkbox-")){console.log("📋 [HEADER] Renderizando header de checkbox, column.id:",o.id);const $=C.length>0&&C.every(t=>t.data[o.id]===!0),P=C.some(t=>t.data[o.id]===!0);console.log("📋 [HEADER] allChecked:",$,"someChecked:",P,"rows.length:",C.length);const U=ue({label:"",checked:$,indeterminate:P&&!$,size:"md",className:"ubits-data-table__column-checkbox-header"}).replace("<input",`<input data-column-checkbox-header="${o.id}" aria-label="Seleccionar todos ${o.title}"`),k=o.pinned?" ubits-data-table__column-header--pinned":"",w=o.pinned?`position: sticky !important; left: ${h}px !important; z-index: 10 !important;`:"",p=o.width?`width: ${o.width}px;`:"",s=[w,p].filter(Boolean).join(" "),a=s?`style="${s}"`:"",e=`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${k}" 
        ${a}
        data-column-id="${o.id}"
        ${o.pinned?'data-pinned="true"':""}
      >
        ${U}
      </th>
    `;return console.log("📋 [HEADER] Header HTML generado para",o.id,"length:",e.length),console.log("📋 [HEADER] ¿Header contiene checkbox-2?",e.includes("checkbox-2")),e}const m=o.id==="checkbox"||o.id.startsWith("checkbox-"),v=o.type==="drag-handle"||o.type==="expand",L=f&&!m&&!v?`
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${o.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  `:"",E=!m&&!v&&O?(()=>{const $=r===o.id,P=$&&d==="asc",D=$&&d==="desc";let U="sort-alpha-asc";P?U="sort-alpha-asc":D&&(U="sort-alpha-desc");const k=ce({variant:"tertiary",size:"xs",icon:U,iconStyle:"solid",iconOnly:!0,active:$,className:"ubits-data-table__column-sort-button",attributes:{"aria-label":`Ordenar ${o.title}`,"data-column-id":o.id,"data-sort-button":"true"}});return $?k:k.replace(/<i class="([^"]*)"([^>]*)>/,'<i class="$1" style="opacity: 0.4;"$2>')})():"";!E&&!m&&console.log("⚠️ [SORT BUTTON] No se creó botón para:",{columnId:o.id,columnTitle:o.title,isCheckboxColumn:m,columnSortable:O});const y=!m&&!v&&u?ce({variant:"tertiary",size:"xs",icon:"ellipsis",iconStyle:"solid",iconOnly:!0,className:"ubits-data-table__column-menu-button",attributes:{"aria-label":`Menú de opciones de ${o.title}`,"data-column-id":o.id,"data-menu-button":"true"}}):"",S=`
    <div class="ubits-data-table__column-header-content">
      ${L}
      <span class="ubits-data-table__column-title">${o.title}</span>
      <div class="ubits-data-table__column-actions">
        ${E}
        ${y}
      </div>
    </div>
  `,b=o.pinned?" ubits-data-table__column-header--pinned":"",q=o.pinned?`left: ${h}px !important;`:"",Q=o.width?`width: ${o.width}px;`:"",_=o.pinned?"position: sticky !important;":"",T=o.pinned?"z-index: 10 !important;":"",A=[_,q,T,Q].filter(Boolean).join(" ");o.pinned&&console.log("📌 [HEADER] Columna fijada detectada en renderColumnHeader:",{columnId:o.id,columnTitle:o.title,pinned:o.pinned,pinnedLeft:h,pinnedClass:b,pinnedStyle:q,positionStyle:_,widthStyle:Q,combinedStyle:A,combinedStyleLength:A.length,combinedStyleIncludesSticky:A.includes("sticky"),combinedStyleIncludesLeft:A.includes("left"),hasPinnedClass:b.includes("pinned"),hasPinnedStyle:q.includes("left"),hasPositionStyle:_.includes("sticky"),willApplyStyle:!!A});const R=A?`style="${A}"`:"";o.pinned&&console.log("📌 [HEADER PRE-HTML] Antes de construir HTML:",{columnId:o.id,pinned:o.pinned,combinedStyle:A,combinedStyleLength:A.length,styleAttribute:R,willIncludeStyle:!!R});const N=`
    <th 
      class="ubits-data-table__column-header${b}" 
      ${R} 
      data-column-id="${o.id}"
      ${o.pinned?'data-pinned="true"':""}
    >
      ${S}
    </th>
  `;return o.pinned&&console.log("📌 [HEADER HTML] HTML generado para columna fijada:",{columnId:o.id,htmlLength:N.length,htmlIncludesSticky:N.includes("sticky"),htmlIncludesLeft:N.includes("left"),htmlIncludesPosition:N.includes("position"),htmlIncludesWidth:N.includes("width"),styleAttributeInHTML:N.includes("style="),htmlPreview:N.substring(0,400)}),N}function ke(o,f,O,C=[]){const r=o.expanded||!1,d=f.filter(v=>v.visible!==!1),u=d.map((v,L)=>{const E=C[L]||0;return Se(v,o,E)}).join(""),h=["ubits-data-table__row",r?"ubits-data-table__row--expanded":""].filter(Boolean).join(" ");O===0&&(console.log("🔍 [ROW ALIGNMENT] ========== PRIMERA FILA =========="),console.log("📊 row.id:",o.id),console.log("📊 visibleColumns count:",d.length),console.log("📊 visibleColumns IDs:",d.map(v=>v.id)),console.log("📊 cellsHTML count (td tags):",(u.match(/<td/g)||[]).length),console.log("📊 Total cells count:",(u.match(/<td/g)||[]).length),console.log("🔍 [ROW ALIGNMENT] ========== FIN =========="));let m=`
    <tr class="${h}" data-row-id="${o.id}">
      ${u}
    </tr>
  `;if(r&&o.renderExpandedContent){const v=o.renderExpandedContent(o.data),L=d.length;m+=`
      <tr class="ubits-data-table__row-expanded-row">
        <td class="ubits-data-table__row-expanded-content" colspan="${L}">
          ${v}
        </td>
      </tr>
    `}return m}function ye(o,f=[],O=[]){const{columns:C,rows:r,className:d="",columnReorderable:u=!1,columnSortable:h=!0,rowReorderable:m=!1,rowExpandable:v=!0,showCheckbox:L=!0,showVerticalScrollbar:E=!1,showHorizontalScrollbar:y=!1,showColumnMenu:S=!0}=o;console.log("🎨 [RENDER] ========== INICIO RENDER =========="),console.log("🎨 [RENDER] renderDataTable llamado con showCheckbox:",L),console.log("🎨 [RENDER] renderDataTable llamado con showVerticalScrollbar:",E),console.log("🎨 [RENDER] renderDataTable llamado con showHorizontalScrollbar:",y),console.log("🎨 [RENDER] renderDataTable llamado con showColumnMenu:",S),console.log("🎨 [RENDER] Columnas recibidas:",C.map(e=>({id:e.id,visible:e.visible,pinned:e.pinned}))),console.log("🎨 [RENDER] Número de filas:",r.length),console.log("🎨 [RENDER] Estado pinned de columnas:",C.map(e=>({id:e.id,pinned:e.pinned,pinnedType:typeof e.pinned})));let b=C.filter(e=>e.visible!==!1);if(b=b.filter(e=>e.id!=="checkbox"),console.log("🔍 [CHECKBOX] Columna checkbox eliminada. Columnas restantes:",b.map(e=>e.id)),f.length>0){const e=f.filter(i=>i!=="checkbox"),t=new Map(b.map(i=>[i.id,i]));b=e.map(i=>t.get(i)).filter(i=>i!==void 0).concat(b.filter(i=>!e.includes(i.id)))}if(console.log("🎯 [CHECKBOX-2] Evaluando showCheckbox:",L,"(showCheckbox !== false:",L!==!1,")"),L!==!1){const e=b.some(t=>t.id==="checkbox-2");if(console.log("🎯 [CHECKBOX-2] checkbox2Exists:",e),e)console.log("🔍 [CHECKBOX-2] La columna checkbox-2 ya existe");else{console.log("🔍 [CHECKBOX-2] Creando nueva columna checkbox-2 al inicio");const t={id:"checkbox-2",title:"",type:void 0,visible:!0,width:48};b.unshift(t),console.log("🔍 [CHECKBOX-2] Columna agregada al inicio. IDs de columnas visibles:",b.map(i=>i.id))}}else{const e=b.map(i=>i.id);b=b.filter(i=>i.id!=="checkbox-2");const t=b.map(i=>i.id);console.log("🔍 [CHECKBOX-2] Columna checkbox-2 eliminada porque showCheckbox es false"),console.log("🔍 [CHECKBOX-2] Antes del filtro:",e),console.log("🔍 [CHECKBOX-2] Después del filtro:",t)}if(console.log("🎯 [CHECKBOX-2] Columnas finales antes de renderizar:",b.map(e=>e.id)),m){if(!b.some(t=>t.type==="drag-handle")){const t={id:"drag-handle",title:"",type:"drag-handle",visible:!0,width:32};b.unshift(t),console.log("🔧 [CONTROLS] Columna drag-handle agregada")}}else b=b.filter(e=>e.type!=="drag-handle");if(v){if(!b.some(t=>t.type==="expand")){const t={id:"expand",title:"",type:"expand",visible:!0,width:32},i=b.findIndex(n=>n.type==="drag-handle");i>=0?b.splice(i+1,0,t):b.unshift(t),console.log("🔧 [CONTROLS] Columna expand agregada")}}else b=b.filter(e=>e.type!=="expand");const{checkboxSticky:q=!1,dragHandleSticky:Q=!1,expandSticky:_=!1}=o;b=b.map(e=>{const t={...e};return e.id==="checkbox-2"&&q===!0?(t.pinned=!0,console.log("🔧 [STICKY] Checkbox marcado como pinned")):e.type==="drag-handle"&&Q===!0?(t.pinned=!0,console.log("🔧 [STICKY] Drag-handle marcado como pinned")):e.type==="expand"&&_===!0?(t.pinned=!0,console.log("🔧 [STICKY] Expand marcado como pinned")):(e.id==="checkbox-2"||e.type==="drag-handle"||e.type==="expand")&&(t.pinned=!1),t});const T=o.sortColumnId||null,A=o.sortDirection||null;let R=[...r];if(O.length>0){const e=new Map(r.map(t=>[t.id,t]));R=O.map(t=>e.get(t)).filter(t=>t!==void 0).concat(r.filter(t=>!O.includes(t.id)))}T&&A&&(R=[...R].sort((e,t)=>{const i=e.data[T],n=t.data[T];if(i==null&&n==null)return 0;if(i==null)return 1;if(n==null)return-1;const l=String(i).toLowerCase(),c=String(n).toLowerCase();let g=0;return l<c?g=-1:l>c&&(g=1),A==="asc"?g:-g})),console.log("🔍 [HEADER ALIGNMENT] ========== INICIO =========="),console.log("📊 rowReorderable:",m),console.log("📊 rowExpandable:",v),console.log("📊 visibleColumns count:",b.length),console.log("📊 visibleColumns IDs:",b.map(e=>e.id));const N=(e,t,i)=>{let n=0;const l={columnId:e.id,columnIndex:t,steps:[]};for(let c=0;c<t;c++){const g=i[c];if(g&&g.pinned){let x=g.width;x||(g.type==="drag-handle"||g.type==="expand"?x=32:g.id==="checkbox-2"?x=48:x=150),n+=x,l.steps.push({step:`columna-${g.id}`,added:x,total:n,reason:`Columna fijada anterior: ${g.id} (tipo: ${g.type||"normal"})`})}else g&&!g.pinned&&l.steps.push({step:`columna-${g.id}`,added:0,total:n,reason:`Columna anterior no fijada: ${g.id}`})}return l.finalLeft=n,e.pinned&&console.log("📌 [PINNED LEFT] Cálculo detallado para columna",e.id,":",l),n};console.log("🔍 [RENDER HEADERS] Iniciando renderizado de headers..."),console.log("🔍 [RENDER HEADERS] showCheckbox:",L),console.log("🔍 [RENDER HEADERS] Columnas con pinned:",b.filter(e=>e.pinned).map(e=>({id:e.id,pinned:e.pinned})));const $=b.map((e,t)=>{const i=e.pinned?N(e,t,b):0;return e.pinned&&console.log("🔍 [RENDER HEADERS] Columna fijada:",e.id,"index:",t,"pinnedLeft calculado:",i),Te(e,u,h,R,T,A,S,i)}).join("");console.log("📊 columnHeadersHTML length:",$.length),console.log("📊 columnHeadersHTML preview:",$.substring(0,200)),console.log("🔍 [RENDER ROWS] Iniciando renderizado de filas..."),console.log("🔍 [RENDER ROWS] Número de filas:",R.length);const P=R.map((e,t)=>{const i=b.map((n,l)=>{if(n.pinned){const c=N(n,l,b);return t===0&&console.log("🔍 [RENDER ROWS] Fila 0, columna fijada:",n.id,"colIndex:",l,"pinnedLeft:",c),c}return 0});return ke(e,b,t,i)}).join("");console.log("📊 rowsHTML count:",R.length),console.log("📊 rowsHTML preview:",P.substring(0,300));const D=["ubits-data-table",d].filter(Boolean).join(" "),U=b.length;console.log("📊 Total headers count:",U),console.log("📊 - columnHeaders:",b.length);const k=`
    <table class="${D} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${$}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${P}
      </tbody>
    </table>
  `.trim(),w=b.some(e=>e.pinned);console.log("📊 [SCROLL] showVerticalScrollbar:",E),console.log("📊 [SCROLL] showHorizontalScrollbar:",y),console.log("📊 [SCROLL] hasPinnedColumns:",w),console.log("📊 [SCROLL] Columnas fijadas:",b.filter(e=>e.pinned).map(e=>({id:e.id,type:e.type}))),console.log("📊 [SCROLL] tableHTML length:",k.length),console.log("📊 [SCROLL] ¿Hay checkbox-2 en columnHeadersHTML?",$.includes("checkbox-2")),console.log("📊 [SCROLL] ¿Hay checkbox-2 en rowsHTML?",P.includes("checkbox-2"));let p=y;w&&!y&&(console.log("⚠️ [SCROLL] ⚠️ Hay columnas fijadas pero no hay scroll horizontal activo"),console.log("⚠️ [SCROLL] ⚠️ Activando scroll horizontal automáticamente para que sticky funcione"),p=!0);const s=b.reduce((e,t)=>{const i=t.width||150;return e+i});console.log("📊 [SCROLL] Ancho total de columnas calculado:",s,"px"),console.log("📊 [SCROLL] Número de columnas visibles:",b.length),console.log("📊 [SCROLL] Anchos de columnas:",b.map(e=>({id:e.id,width:e.width||150})));let a;if(E||p){const e=[];E&&e.push("ubits-data-table__scrollable-container--vertical"),p&&e.push("ubits-data-table__scrollable-container--horizontal"),console.log("📊 [SCROLL] ✅ Envolviendo tabla en contenedor scrollable"),console.log("📊 [SCROLL] Clases de scroll:",e.join(" ")),console.log("📊 [SCROLL] showHorizontalScrollbar activo:",y),console.log("📊 [SCROLL] Ancho total esperado de columnas:",s,"px"),a=`<div class="ubits-data-table__scrollable-container ${e.join(" ")}">${k}</div>`,console.log("📊 [SCROLL] HTML con contenedor scrollable generado, length:",a.length),console.log("📊 [SCROLL] ¿HTML contiene scrollable-container?",a.includes("scrollable-container")),console.log("📊 [SCROLL] ¿HTML contiene scrollable-container--horizontal?",a.includes("scrollable-container--horizontal")),console.log("📊 [SCROLL] ¿HTML contiene checkbox-2?",a.includes("checkbox-2"))}else console.log("📊 [SCROLL] ❌ NO envolviendo, usando tabla directamente"),a=k;return console.log("📊 [SCROLL] HTML final length:",a.length),console.log("📊 [SCROLL] HTML final preview (primeros 800 chars):",a.substring(0,800)),console.log("📊 [SCROLL] ¿HTML final contiene checkbox-2?",a.includes("checkbox-2")),console.log("📊 [SCROLL] ¿HTML final contiene scrollable-container?",a.includes("scrollable-container")),console.log("📊 [SCROLL] ¿HTML final contiene scrollable-container--horizontal?",a.includes("scrollable-container--horizontal")),console.log("🔍 [HEADER ALIGNMENT] ========== FIN RENDER =========="),a}function Ie(o){const f=o.containerId?document.getElementById(o.containerId):document.body;if(!f)throw new Error(`Container with id "${o.containerId}" not found`);const O=ye(o),C=document.createElement("div");C.innerHTML=O.trim();const r=C.firstElementChild;if(!r)throw new Error("Failed to create data table 3 element");f.appendChild(r);let d={...o},u=d.columns.filter(_=>_.visible!==!1).map(_=>_.id),h=d.rows.map(_=>_.id),m=null,v=null,L=null,E=null;const y=()=>{const _=r.querySelectorAll("wa-icon");console.log("🔍 [ICONS] Inicializando fallbacks de iconos:",{totalIcons:_.length,waIconDefined:!!customElements.get("wa-icon")}),_.forEach((T,A)=>{const R=T.nextElementSibling,N=T.getAttribute("name");console.log(`🔍 [ICONS] Icono ${A+1}:`,{name:N,hasNextSibling:!!R,nextSiblingTag:R?.tagName,waIconDisplay:window.getComputedStyle(T).display,waIconWidth:window.getComputedStyle(T).width,waIconHeight:window.getComputedStyle(T).height,waIconOpacity:window.getComputedStyle(T).opacity}),R&&R.tagName==="I"&&(customElements.get("wa-icon")?(T.style.display="inline-block",T.style.width="12px",T.style.height="12px",T.style.opacity="1",R.style.display="none",console.log(`✅ [ICONS] Icono ${A+1} (${N}): usando wa-icon`)):(T.style.display="none",R.style.display="inline-block",R.style.fontSize="12px",R.style.width="12px",R.style.height="12px",console.log(`⚠️ [ICONS] Icono ${A+1} (${N}): usando fallback`)))})},S=()=>{const _=ye({...d,sortColumnId:L,sortDirection:E},u,h);r.innerHTML=_.trim(),b(),y(),console.log("🔍 [PADDING CHECK] ========== INICIANDO VERIFICACIÓN =========="),console.log("📊 Element disponible:",!!r),console.log("📊 Element tagName:",r.tagName),console.log("📊 Element className:",r.className),console.log("📊 Element innerHTML length:",r.innerHTML.length),console.log("📊 Element innerHTML preview (primeros 500 chars):",r.innerHTML.substring(0,500));const T=()=>{try{console.log("🔍 [PADDING CHECK] ========== DESPUÉS DEL RENDERIZADO =========="),console.log("📊 element.tagName:",r.tagName),console.log("📊 element.className:",r.className);const A=r.classList.contains("ubits-data-table__scrollable-container")?r:r.querySelector(".ubits-data-table__scrollable-container"),R=A?A.querySelector(".ubits-data-table__table"):r.querySelector(".ubits-data-table__table")||r;console.log("📊 scrollableContainer encontrado:",!!A),console.log("📊 actualTable encontrado:",!!R),console.log("📊 actualTable tagName:",R?.tagName);const N=R||r,$=N.querySelectorAll(".ubits-data-table__controls-column"),P=N.querySelectorAll(".ubits-data-table__controls-column-header");if(console.log("📊 [CONTROLS] Elementos encontrados:",{columns:$.length,headers:P.length}),$.length>0){const w=$[0],p=window.getComputedStyle(w);console.log("📊 [CONTROLS COLUMN] Estilos computados:"),console.log("  - padding:",p.padding),console.log("  - paddingTop:",p.paddingTop),console.log("  - paddingRight:",p.paddingRight),console.log("  - paddingBottom:",p.paddingBottom),console.log("  - paddingLeft:",p.paddingLeft),console.log("  - width:",p.width),console.log("  - minWidth:",p.minWidth),console.log("  - maxWidth:",p.maxWidth),console.log("  - boxSizing:",p.boxSizing),console.log("  - marginLeft:",p.marginLeft),console.log("  - marginRight:",p.marginRight);const s=w.nextElementSibling;if(s){const a=window.getComputedStyle(s);console.log("📊 [FIRST DATA CELL] Primera celda después de controles:"),console.log("  - tagName:",s.tagName),console.log("  - className:",s.className),console.log("  - padding:",a.padding),console.log("  - paddingLeft:",a.paddingLeft),console.log("  - marginLeft:",a.marginLeft),console.log("  - width:",a.width);const e=w.getBoundingClientRect(),t=s.getBoundingClientRect(),i=t.left-e.right;console.log("📊 [GAP CALCULATION] Espacio entre controles y primera celda:"),console.log("  - controlsRect.right:",e.right),console.log("  - firstDataRect.left:",t.left),console.log("  - GAP calculado:",i,"px")}else console.log("⚠️ [FIRST DATA CELL] No se encontró celda de datos después de controles")}else console.log("⚠️ [CONTROLS COLUMN] No se encontró ninguna columna de controles");if(P.length>0){const w=P[0],p=window.getComputedStyle(w);console.log("📊 [CONTROLS HEADER] Estilos computados:"),console.log("  - padding:",p.padding),console.log("  - paddingTop:",p.paddingTop),console.log("  - paddingRight:",p.paddingRight),console.log("  - paddingBottom:",p.paddingBottom),console.log("  - paddingLeft:",p.paddingLeft),console.log("  - width:",p.width),console.log("  - minWidth:",p.minWidth),console.log("  - maxWidth:",p.maxWidth),console.log("  - boxSizing:",p.boxSizing),console.log("  - marginLeft:",p.marginLeft),console.log("  - marginRight:",p.marginRight)}else console.log("⚠️ [CONTROLS HEADER] No se encontró ningún header de controles");const D=N.querySelectorAll('.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]'),U=N.querySelectorAll('.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"], .ubits-data-table__column-header--checkbox[data-column-id^="checkbox-"]');if(console.log("📊 [CHECKBOX] Buscando checkbox cells con selector:",'.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]'),console.log("📊 [CHECKBOX] Elementos encontrados:",{cells:D.length,headers:U.length}),A){console.log("📊 [CHECKBOX] ✅ Contenedor scrollable encontrado, buscando checkbox dentro de él");const w=A.querySelectorAll('.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]'),p=A.querySelectorAll('.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"], .ubits-data-table__column-header--checkbox[data-column-id^="checkbox-"]');if(console.log("📊 [CHECKBOX] Elementos encontrados dentro del scrollable:",{cells:w.length,headers:p.length}),w.length>0){const s=w[0],a=window.getComputedStyle(s);console.log("📊 [CHECKBOX CELL] Estilos computados (dentro scrollable):"),console.log("  - padding:",a.padding),console.log("  - paddingTop:",a.paddingTop),console.log("  - paddingRight:",a.paddingRight),console.log("  - paddingBottom:",a.paddingBottom),console.log("  - paddingLeft:",a.paddingLeft),console.log("  - width:",a.width),console.log("  - minWidth:",a.minWidth),console.log("  - maxWidth:",a.maxWidth),console.log("  - boxSizing:",a.boxSizing),console.log("  - marginLeft:",a.marginLeft),console.log("  - marginRight:",a.marginRight),console.log("  - position:",a.position),console.log("  - left:",a.left),console.log("  - zIndex:",a.zIndex)}}else console.log("📊 [CHECKBOX] ❌ No hay contenedor scrollable, buscando directamente en element");if(D.length>0){const w=D[0],p=window.getComputedStyle(w);console.log("📊 [CHECKBOX CELL] Estilos computados:"),console.log("  - padding:",p.padding),console.log("  - paddingTop:",p.paddingTop),console.log("  - paddingRight:",p.paddingRight),console.log("  - paddingBottom:",p.paddingBottom),console.log("  - paddingLeft:",p.paddingLeft),console.log("  - width:",p.width),console.log("  - minWidth:",p.minWidth),console.log("  - maxWidth:",p.maxWidth),console.log("  - boxSizing:",p.boxSizing),console.log("  - marginLeft:",p.marginLeft),console.log("  - marginRight:",p.marginRight),console.log("  - position:",p.position),console.log("  - left:",p.left),console.log("  - zIndex:",p.zIndex)}else{console.log("⚠️ [CHECKBOX CELL] No se encontró ninguna celda de checkbox");const w=r.querySelectorAll("td[data-column-id]");console.log("📊 [CHECKBOX] Total celdas con data-column-id:",w.length),w.forEach((p,s)=>{const a=p.getAttribute("data-column-id");a&&a.includes("checkbox")&&console.log(`📊 [CHECKBOX] Celda ${s} tiene data-column-id="${a}"`)})}if(U.length>0){const w=U[0],p=window.getComputedStyle(w);console.log("📊 [CHECKBOX HEADER] Estilos computados:"),console.log("  - padding:",p.padding),console.log("  - paddingTop:",p.paddingTop),console.log("  - paddingRight:",p.paddingRight),console.log("  - paddingBottom:",p.paddingBottom),console.log("  - paddingLeft:",p.paddingLeft),console.log("  - width:",p.width),console.log("  - minWidth:",p.minWidth),console.log("  - maxWidth:",p.maxWidth),console.log("  - boxSizing:",p.boxSizing),console.log("  - marginLeft:",p.marginLeft),console.log("  - marginRight:",p.marginRight),console.log("  - position:",p.position),console.log("  - left:",p.left),console.log("  - zIndex:",p.zIndex)}else{console.log("⚠️ [CHECKBOX HEADER] No se encontró ningún header de checkbox");const w=r.querySelectorAll("th[data-column-id]");console.log("📊 [CHECKBOX] Total headers con data-column-id:",w.length),w.forEach((p,s)=>{const a=p.getAttribute("data-column-id");a&&a.includes("checkbox")&&console.log(`📊 [CHECKBOX] Header ${s} tiene data-column-id="${a}"`)})}if(D.length>0&&$.length>0){const w=D[0],p=$[0],s=w.getBoundingClientRect(),a=p.getBoundingClientRect(),e=a.left-s.right;console.log("📊 [DISTANCE] Distancia entre checkbox y controles:",e,"px"),console.log("  - checkbox right:",s.right),console.log("  - controls left:",a.left),console.log("  - checkbox width:",s.width),console.log("  - controls width:",a.width)}console.log("🔍 [HORIZONTAL SCROLL] ========== VERIFICACIÓN SCROLL HORIZONTAL ==========");const k=r.classList.contains("ubits-data-table__scrollable-container--horizontal")?r:r.querySelector(".ubits-data-table__scrollable-container--horizontal");if(k){console.log("✅ [HORIZONTAL SCROLL] Contenedor scrollable horizontal encontrado");const w=window.getComputedStyle(k),p=k.getBoundingClientRect();console.log("📊 [HORIZONTAL SCROLL] Estilos del contenedor:"),console.log("  - className:",k.className),console.log("  - overflow-x:",w.overflowX),console.log("  - overflow-y:",w.overflowY),console.log("  - width:",w.width),console.log("  - max-width:",w.maxWidth),console.log("  - min-width:",w.minWidth),console.log("  - box-sizing:",w.boxSizing),console.log("  - position:",w.position),console.log("  - display:",w.display),console.log("📊 [HORIZONTAL SCROLL] Dimensiones del contenedor:"),console.log("  - clientWidth:",k.clientWidth),console.log("  - scrollWidth:",k.scrollWidth),console.log("  - offsetWidth:",k.offsetWidth),console.log("  - getBoundingClientRect().width:",p.width);const s=k.scrollWidth>k.clientWidth;console.log("📊 [HORIZONTAL SCROLL] ¿Hay scroll disponible?",s),console.log("  - scrollWidth:",k.scrollWidth),console.log("  - clientWidth:",k.clientWidth),console.log("  - Diferencia:",k.scrollWidth-k.clientWidth,"px");const a=k.querySelector(".ubits-data-table__table");if(a){const t=window.getComputedStyle(a),i=a.getBoundingClientRect();console.log("📊 [HORIZONTAL SCROLL] Estilos de la tabla:"),console.log("  - width:",t.width),console.log("  - min-width:",t.minWidth),console.log("  - max-width:",t.maxWidth),console.log("  - getBoundingClientRect().width:",i.width);const n=a.querySelectorAll("th[data-column-id], td[data-column-id]");let l=0;const c={},g=new Set;n.forEach(H=>{const M=H.getAttribute("data-column-id");M&&g.add(M)}),g.forEach(H=>{const M=a.querySelector(`[data-column-id="${H}"]`);if(M){const F=M.getBoundingClientRect().width;c[H]=F,l+=F}}),console.log("📊 [HORIZONTAL SCROLL] Anchos de columnas:"),console.log("  - Total columnas encontradas:",g.size),console.log("  - Ancho total calculado:",l,"px"),console.log("  - Ancho del contenedor:",k.clientWidth,"px"),console.log("  - Ancho de la tabla:",i.width,"px"),console.log("  - Anchos por columna:",c);const x=i.width>k.clientWidth;console.log("📊 [HORIZONTAL SCROLL] ¿La tabla es más ancha que el contenedor?",x),console.log("  - Tabla width:",i.width,"px"),console.log("  - Contenedor clientWidth:",k.clientWidth,"px"),console.log("  - Diferencia:",i.width-k.clientWidth,"px")}else console.log("⚠️ [HORIZONTAL SCROLL] No se encontró la tabla dentro del contenedor");const e=k.parentElement;if(e){const t=window.getComputedStyle(e),i=e.getBoundingClientRect();console.log("📊 [HORIZONTAL SCROLL] Contenedor padre:"),console.log("  - tagName:",e.tagName),console.log("  - className:",e.className),console.log("  - width:",t.width),console.log("  - max-width:",t.maxWidth),console.log("  - getBoundingClientRect().width:",i.width)}}else{console.log("❌ [HORIZONTAL SCROLL] No se encontró contenedor scrollable horizontal"),console.log("📊 [HORIZONTAL SCROLL] Element classes:",r.className),console.log("📊 [HORIZONTAL SCROLL] Element innerHTML preview:",r.innerHTML.substring(0,500));const w=r.querySelector(".ubits-data-table__scrollable-container");w&&(console.log("📊 [HORIZONTAL SCROLL] Se encontró un contenedor scrollable pero sin clase horizontal:"),console.log("  - className:",w.className))}console.log("🔍 [HORIZONTAL SCROLL] ========== FIN VERIFICACIÓN =========="),console.log("🔍 [PADDING CHECK] ========== FIN ==========")}catch(A){console.error("❌ [PADDING CHECK] Error:",A)}};T(),setTimeout(T,100),setTimeout(T,500),setTimeout(T,1e3)},b=()=>{try{d.columnReorderable&&(r.hasAttribute("data-column-drag-listener")||(r.setAttribute("data-column-drag-listener","true"),r.addEventListener("dragstart",s=>{const e=s.target.closest(".ubits-data-table__column-drag-handle");if(e&&(m=e.getAttribute("data-column-id"),m)){s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",m);const t=e.closest(".ubits-data-table__column-header");t&&t.classList.add("ubits-data-table__column-header--dragging")}},!0),r.addEventListener("dragend",s=>{const e=s.target.closest(".ubits-data-table__column-drag-handle");if(e){const t=e.closest(".ubits-data-table__column-header");t&&t.classList.remove("ubits-data-table__column-header--dragging")}m=null},!0),r.addEventListener("dragover",s=>{const e=s.target.closest(".ubits-data-table__column-header");if(e&&m){const t=e.getAttribute("data-column-id");if(t&&t!==m){const i=t==="checkbox"||t.startsWith("checkbox-"),n=m==="checkbox"||m.startsWith("checkbox-");if(i)return;if(!n){const l=u.findIndex(c=>c==="checkbox"||c.startsWith("checkbox-"));if(l!==-1&&u.indexOf(t)<l)return}s.preventDefault(),s.dataTransfer.dropEffect="move",e.classList.add("ubits-data-table__column-header--drag-over")}}},!0),r.addEventListener("dragleave",s=>{const e=s.target.closest(".ubits-data-table__column-header");e&&e.classList.remove("ubits-data-table__column-header--drag-over")},!0),r.addEventListener("drop",s=>{const e=s.target.closest(".ubits-data-table__column-header");if(e){s.preventDefault(),e.classList.remove("ubits-data-table__column-header--drag-over");const t=e.getAttribute("data-column-id");if(!t||!m)return;const i=m==="checkbox"||m.startsWith("checkbox-"),n=t==="checkbox"||t.startsWith("checkbox-");if(i||n)return;if(m!==t){const l=u.indexOf(m),c=u.indexOf(t),g=u.findIndex(x=>x==="checkbox"||x.startsWith("checkbox-"));if(g===-1){l!==-1&&c!==-1&&(u.splice(l,1),u.splice(c,0,m),d.onColumnReorder&&d.onColumnReorder([...u]),S());return}if(c<g||l>g&&c<g)return;if(l!==-1&&c!==-1){const x=[...u];x.splice(l,1),x.splice(c,0,m);const H=x.findIndex(M=>M==="checkbox"||M.startsWith("checkbox-"));if(H!==-1&&H<g)return;u=x,d.onColumnReorder&&d.onColumnReorder([...u]),S()}}}},!0))),d.rowReorderable&&(r.hasAttribute("data-row-drag-listener")||(r.setAttribute("data-row-drag-listener","true"),r.addEventListener("dragstart",s=>{const e=s.target.closest(".ubits-data-table__row-drag-handle");if(!e)return;const t=e.getAttribute("data-row-id");if(t){const i=isNaN(Number(t))?t:Number(t);v=i,s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",String(i));const n=e.closest(".ubits-data-table__row");n&&n.classList.add("ubits-data-table__row--dragging")}},!0),r.addEventListener("dragend",s=>{const e=s.target.closest(".ubits-data-table__row-drag-handle");if(e){const t=e.closest(".ubits-data-table__row");t&&t.classList.remove("ubits-data-table__row--dragging")}v=null},!0),r.addEventListener("dragover",s=>{const e=s.target.closest(".ubits-data-table__row");if(e&&v!==null){const t=e.getAttribute("data-row-id");t&&(isNaN(Number(t))?t:Number(t))!==v&&(s.preventDefault(),s.dataTransfer.dropEffect="move",e.classList.add("ubits-data-table__row--drag-over"))}},!0),r.addEventListener("dragleave",s=>{const e=s.target.closest(".ubits-data-table__row");e&&e.classList.remove("ubits-data-table__row--drag-over")},!0),r.addEventListener("drop",s=>{const e=s.target.closest(".ubits-data-table__row");if(e){s.preventDefault(),e.classList.remove("ubits-data-table__row--drag-over");const t=e.getAttribute("data-row-id");if(!t||!v)return;const i=isNaN(Number(t))?t:Number(t),n=s.dataTransfer.getData("text/plain");if(n&&String(i)!==n){const l=isNaN(Number(n))?n:Number(n),c=h.indexOf(l),g=h.indexOf(i);c!==-1&&g!==-1&&(h.splice(c,1),h.splice(g,0,l),d.onRowReorder&&d.onRowReorder([...h]),S())}}},!0))),r.querySelectorAll("input[data-column-id]").forEach(s=>{s.addEventListener("change",a=>{const e=a.target,t=e.getAttribute("data-row-id"),i=e.getAttribute("data-column-id"),n=isNaN(Number(t))?t:Number(t),l=e.checked,c=d.rows.find(g=>g.id===n);c&&(c.data[i]=l),S()})}),r.querySelectorAll("input[data-column-checkbox-header]").forEach(s=>{s.addEventListener("change",a=>{const e=a.target,t=e.getAttribute("data-column-checkbox-header"),i=e.checked;d.rows.forEach(n=>{n.data[t]=i}),S()})}),r.querySelectorAll('[data-expand-button="true"]').forEach(s=>{s.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const e=s.getAttribute("data-row-id"),t=isNaN(Number(e))?e:Number(e),i=d.rows.find(n=>n.id===t);if(i){const n=i.expanded||!1;i.expanded=!n,d.onRowExpand&&d.onRowExpand(t,i.expanded),S()}})});const R=r.querySelectorAll(".ubits-data-table__column-drag-handle"),N=r.querySelectorAll('[data-sort-button="true"]');if(R.length>0&&N.length>0){const s=R[0],a=N[0],e=window.getComputedStyle(s),t=window.getComputedStyle(a),i=s.querySelector("wa-icon")||s.querySelector("i"),n=a.querySelector("wa-icon")||a.querySelector("i"),l=i?window.getComputedStyle(i):null,c=n?window.getComputedStyle(n):null;console.log("🔍 [STYLES COMPARISON] ========== DRAG HANDLE =========="),console.log("Container - display:",e.display),console.log("Container - width:",e.width),console.log("Container - height:",e.height),console.log("Container - padding:",e.padding),console.log("Container - margin:",e.margin),console.log("Container - color:",e.color),console.log("Container - backgroundColor:",e.backgroundColor),console.log("Container - border:",e.border),console.log("Container - borderRadius:",e.borderRadius),console.log("Container - cursor:",e.cursor),console.log("Container - fontSize:",e.fontSize),console.log("Container - lineHeight:",e.lineHeight),l?(console.log("Icon - display:",l.display),console.log("Icon - width:",l.width),console.log("Icon - height:",l.height),console.log("Icon - fontSize:",l.fontSize),console.log("Icon - color:",l.color),console.log("Icon - margin:",l.margin),console.log("Icon - padding:",l.padding),console.log("Icon - lineHeight:",l.lineHeight),console.log("Icon - verticalAlign:",l.verticalAlign)):console.log("Icon: NO ICON FOUND"),i?(console.log("Icon Element - tagName:",i.tagName),console.log("Icon Element - className:",i.className),console.log("Icon Element - innerHTML:",i.innerHTML.substring(0,100))):console.log("Icon Element: NO ICON ELEMENT"),console.log("🔍 [STYLES COMPARISON] ========== SORT BUTTON =========="),console.log("Container - display:",t.display),console.log("Container - width:",t.width),console.log("Container - height:",t.height),console.log("Container - padding:",t.padding),console.log("Container - margin:",t.margin),console.log("Container - color:",t.color),console.log("Container - backgroundColor:",t.backgroundColor),console.log("Container - border:",t.border),console.log("Container - borderRadius:",t.borderRadius),console.log("Container - cursor:",t.cursor),console.log("Container - fontSize:",t.fontSize),console.log("Container - lineHeight:",t.lineHeight),c?(console.log("Icon - display:",c.display),console.log("Icon - width:",c.width),console.log("Icon - height:",c.height),console.log("Icon - fontSize:",c.fontSize),console.log("Icon - color:",c.color),console.log("Icon - margin:",c.margin),console.log("Icon - padding:",c.padding),console.log("Icon - lineHeight:",c.lineHeight),console.log("Icon - verticalAlign:",c.verticalAlign)):console.log("Icon: NO ICON FOUND"),n?(console.log("Icon Element - tagName:",n.tagName),console.log("Icon Element - className:",n.className),console.log("Icon Element - innerHTML:",n.innerHTML.substring(0,100))):console.log("Icon Element: NO ICON ELEMENT"),console.log("🔍 [STYLES COMPARISON] ========== DIFFERENCES ==========");const g=[];e.width!==t.width&&g.push(`width: ${e.width} vs ${t.width}`),e.height!==t.height&&g.push(`height: ${e.height} vs ${t.height}`),e.padding!==t.padding&&g.push(`padding: ${e.padding} vs ${t.padding}`),e.margin!==t.margin&&g.push(`margin: ${e.margin} vs ${t.margin}`),e.color!==t.color&&g.push(`color: ${e.color} vs ${t.color}`),e.backgroundColor!==t.backgroundColor&&g.push(`backgroundColor: ${e.backgroundColor} vs ${t.backgroundColor}`),e.border!==t.border&&g.push(`border: ${e.border} vs ${t.border}`),e.borderRadius!==t.borderRadius&&g.push(`borderRadius: ${e.borderRadius} vs ${t.borderRadius}`),l&&c&&(l.color!==c.color&&g.push(`icon.color: ${l.color} vs ${c.color}`),l.fontSize!==c.fontSize&&g.push(`icon.fontSize: ${l.fontSize} vs ${c.fontSize}`),l.width!==c.width&&g.push(`icon.width: ${l.width} vs ${c.width}`),l.height!==c.height&&g.push(`icon.height: ${l.height} vs ${c.height}`)),g.length>0?(console.log("❌ DIFERENCIAS ENCONTRADAS:"),g.forEach((x,H)=>{console.log(`  ${H+1}. ${x}`)})):console.log("✅ NO DIFFERENCES FOUND")}console.log("🔍 [SORT BUTTON] Botones encontrados:",{count:N.length,buttons:Array.from(N).map(s=>({columnId:s.getAttribute("data-column-id"),classes:s.className,innerHTML:s.innerHTML.substring(0,100),waIcons:s.querySelectorAll("wa-icon").length,computedStyle:{display:window.getComputedStyle(s).display,width:window.getComputedStyle(s).width,height:window.getComputedStyle(s).height,visibility:window.getComputedStyle(s).visibility,opacity:window.getComputedStyle(s).opacity,color:window.getComputedStyle(s).color,backgroundColor:window.getComputedStyle(s).backgroundColor,padding:window.getComputedStyle(s).padding,margin:window.getComputedStyle(s).margin}}))}),N.forEach(s=>{const a=s,e=a.querySelectorAll("wa-icon"),t=a.classList.contains("ubits-data-table__column-sort--active");console.log("🔍 [SORT BUTTON] Verificando botón:",{columnId:a.getAttribute("data-column-id"),isActive:t,waIconsCount:e.length,innerHTML:a.innerHTML.substring(0,150),waIcons:Array.from(e).map(n=>{const l=window.getComputedStyle(n);return{name:n.getAttribute("name"),display:l.display,width:l.width,height:l.height,opacity:l.opacity,visibility:l.visibility,color:l.color,fontSize:l.fontSize,isConnected:n.isConnected,parentElement:n.parentElement?.tagName,nextSibling:n.nextSibling?.nodeName}}),buttonComputedStyle:{display:window.getComputedStyle(a).display,width:window.getComputedStyle(a).width,height:window.getComputedStyle(a).height,opacity:window.getComputedStyle(a).opacity,visibility:window.getComputedStyle(a).visibility}});const i=Array.from(e).find(n=>n.getAttribute("name")==="arrow-down-z-a");i&&console.log("🔍 [SORT BUTTON] Icono arrow-down-z-a encontrado:",{element:i,name:i.getAttribute("name"),computedStyle:{display:window.getComputedStyle(i).display,width:window.getComputedStyle(i).width,height:window.getComputedStyle(i).height,opacity:window.getComputedStyle(i).opacity,visibility:window.getComputedStyle(i).visibility,color:window.getComputedStyle(i).color},inlineStyle:i.style.cssText,classes:i.className,parentClasses:i.parentElement?.className}),s.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const l=s.getAttribute("data-column-id");console.log("🔍 [SORT BUTTON] Click en botón:",{columnId:l,currentSortColumnId:L,currentSortDirection:E}),L===l?E=E==="asc"?"desc":"asc":(L=l,E="asc"),console.log("✅ [SORT BUTTON] Nuevo estado:",{sortColumnId:L,sortDirection:E}),d.onSort&&d.onSort(l,E),S()})}),r.querySelectorAll('[data-menu-button="true"]').forEach(s=>{const a=s,e=a.getAttribute("data-column-id");if(!e||!d.columns.find(x=>x.id===e))return;const i=a.closest("th");if(!i){console.warn("⚠️ [MENU BUTTON] No se encontró el header cell");return}let n=i.querySelector(".ubits-data-table__column-menu-dropdown");if(!n){n=document.createElement("div"),n.className="ubits-data-table__column-menu-dropdown",n.setAttribute("data-column-id",e),n.style.cssText=`
          position: absolute;
          top: 100%;
          right: 0;
          z-index: 1000;
          margin-top: 4px;
          display: none;
          width: 160px;
          max-width: 160px;
          box-sizing: border-box;
        `;const x=i.hasAttribute("data-pinned")&&i.getAttribute("data-pinned")==="true",H=i.classList.contains("ubits-data-table__column-header--pinned");!x&&!H?i.style.position="relative":(console.log("⚠️ [COLUMN MENU] Columna fijada detectada, NO estableciendo position: relative para preservar position: sticky",{columnId:e,isPinned:x,hasStickyClass:H,currentPosition:i.style.position,computedPosition:window.getComputedStyle(i).position}),(window.getComputedStyle(i).position==="sticky"||i.style.position==="sticky")&&(i.style.position="sticky",console.log("✅ [COLUMN MENU] position: sticky preservado para columna fijada"))),i.appendChild(n)}let l=!1;const c=()=>{n&&(n.style.display="none"),l=!1,g&&(document.removeEventListener("click",g),g=null)};let g=null;a.addEventListener("click",x=>{console.log("🔍 [COLUMN MENU] Click en botón de menú, columna:",e),x.preventDefault(),x.stopPropagation();const H=d.columns.find(B=>B.id===e);if(!H){console.error("❌ [COLUMN MENU] Columna no encontrada:",e);return}const M=H.pinned||!1;if(console.log("🔍 [COLUMN MENU] Estado de columna - pinned:",M),l){console.log("🔍 [COLUMN MENU] Dropdown ya abierto, cerrando..."),c();return}r.querySelectorAll(".ubits-data-table__column-menu-dropdown").forEach(B=>{B!==n&&(B.style.display="none")});const F=[{label:M?"Desfijar columna":"Fijar columna",value:"pin",state:"default"}];n.innerHTML="";const ee=`column-menu-list-${e}-${Math.random().toString(36).substr(2,9)}`;n.id=ee;try{console.log("🔍 [COLUMN MENU] Creando lista UBITS con createList, containerId:",ee);const B=he({containerId:ee,items:F,size:"sm",maxHeight:"200px",onSelectionChange:(Y,K)=>{if(console.log("🔍 [COLUMN MENU] Item seleccionado del dropdown:",Y?.label,"value:",Y?.value),Y&&Y.value==="pin"){const X=d.columns.find(W=>W.id===e);if(X){const W=X.pinned||!1;X.pinned=!W,console.log("✅ [COLUMN MENU] Columna",e,W?"desfijada":"fijada","- nuevo estado pinned:",X.pinned),d.onColumnPin&&d.onColumnPin(e,X.pinned),S()}else console.error("❌ [COLUMN MENU] Columna no encontrada al intentar fijar:",e)}c()}});console.log("✅ [COLUMN MENU] Lista UBITS creada exitosamente, elemento:",B)}catch(B){console.error("❌ [COLUMN MENU] Error al crear lista con createList:",B),console.log("🔍 [COLUMN MENU] Usando fallback renderList...");const Y=Le({items:F,size:"sm",maxHeight:"200px"});n.innerHTML=Y,console.log("✅ [COLUMN MENU] HTML de lista renderizado, length:",Y.length);const K=n.querySelectorAll(".ubits-list-item");console.log("🔍 [COLUMN MENU] Items encontrados en fallback:",K.length),K.forEach(X=>{X.addEventListener("click",()=>{console.log("🔍 [COLUMN MENU] Click en item del dropdown (fallback)");const W=d.columns.find(z=>z.id===e);if(W){const z=W.pinned||!1;W.pinned=!z,console.log("✅ [COLUMN MENU] Columna",e,z?"desfijada":"fijada","- nuevo estado pinned:",W.pinned),d.onColumnPin&&d.onColumnPin(e,W.pinned),S()}c()})})}const le=a.getBoundingClientRect();n.style.position="fixed",n.style.top=`${le.bottom+4}px`,n.style.left=`${le.left}px`,n.style.display="block",l=!0,console.log("✅ [COLUMN MENU] Dropdown mostrado y posicionado:",{top:n.style.top,left:n.style.left,width:n.offsetWidth,height:n.offsetHeight,innerHTML:n.innerHTML.substring(0,200)}),g=B=>{!n.contains(B.target)&&!a.contains(B.target)&&c()},setTimeout(()=>{document.addEventListener("click",g)},0)})}),r.querySelectorAll('[data-editable-text="true"]').forEach(s=>{const a=s.closest('[data-editable="true"]');if(!a)return;const e=a.getAttribute("data-row-id"),t=a.getAttribute("data-column-id");if(!e||!t)return;const i=isNaN(Number(e))?e:Number(e);s.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),s.blur())}),s.addEventListener("blur",n=>{n.stopPropagation();const l=s.textContent||"",c=d.rows.find(g=>g.id===i);if(c){const g=d.columns.find(x=>x.id===t);g&&(g.type==="nombre"||g.type==="nombre-avatar")?(c.data.nombre=l.trim(),c.data[t]!==void 0&&(c.data[t]=l.trim())):g&&g.type==="estado"?(c.data[t]=l.trim(),c.data.estado=l.trim(),c.data.status=l.trim()):c.data[t]=l.trim()}}),s.addEventListener("dblclick",n=>{n.stopPropagation()}),s.addEventListener("click",n=>{n.stopPropagation()})}),r.querySelectorAll(".ubits-data-table__status-editable").forEach(s=>{const a=s.getAttribute("data-row-id"),e=s.getAttribute("data-column-id"),t=s.getAttribute("data-current-status");if(!a||!e)return;const i=isNaN(Number(a))?a:Number(a),n=s.querySelector(".ubits-status-tag"),l=s.querySelector(".ubits-data-table__status-dropdown");if(!n||!l)return;const c=[{value:"active",label:"Activo",status:"active"},{value:"completed",label:"Completado",status:"completed"},{value:"published",label:"Publicado",status:"published"},{value:"fulfilled",label:"Cumplido",status:"fulfilled"},{value:"created",label:"Creado",status:"created"},{value:"not-fulfilled",label:"No cumplido",status:"not-fulfilled"},{value:"denied",label:"Denegado",status:"denied"},{value:"draft",label:"Borrador",status:"draft"},{value:"in-progress",label:"En progreso",status:"in-progress"},{value:"syncing",label:"Sincronizando",status:"syncing"},{value:"pending",label:"Pendiente",status:"pending"},{value:"pending-approval",label:"Pendiente aprobación",status:"pending-approval"},{value:"not-started",label:"No iniciado",status:"not-started"},{value:"finished",label:"Finalizado",status:"finished"},{value:"archived",label:"Archivado",status:"archived"},{value:"disabled",label:"Deshabilitado",status:"disabled"},{value:"paused",label:"Pausado",status:"paused"},{value:"hidden",label:"Oculto",status:"hidden"}];let g=null,x=null,H=null,M=!1,F=0;const ee=[],le=z=>{const G=[];let j=z;for(;j&&j!==document.body&&j!==document.documentElement;){const V=window.getComputedStyle(j),oe=V.overflow+V.overflowX+V.overflowY,ae=oe.includes("auto")||oe.includes("scroll"),te=j.scrollHeight>j.clientHeight||j.scrollWidth>j.clientWidth;(ae||te)&&G.push(j),j=j.parentElement}return G},B=()=>{try{if(!l||l.style.display==="none"||!document.body.contains(l)){K();return}if(!n||!n.isConnected){K();return}const z=n.getBoundingClientRect(),G=z.bottom+4,j=z.left,V=l.style.top,oe=l.style.left,ae=`${G}px`,te=`${j}px`;(V!==ae||oe!==te)&&(l.style.top=ae,l.style.left=te,F++)}catch{K()}},Y=()=>{if(M)return;M=!0;const z=()=>{if(l.style.display==="none"||!document.body.contains(l)){K();return}B(),H=requestAnimationFrame(z)};z()},K=()=>{H&&(cancelAnimationFrame(H),H=null),M=!1,F=0};x=B;const X=()=>{K(),l.style.display="none";const z=l.__scrollbarInstance;if(z&&z.destroy){try{z.destroy()}catch{}l.__scrollbarInstance=null}l.parentElement===document.body&&s.appendChild(l),g&&(document.removeEventListener("click",g),g=null),x&&(window.removeEventListener("scroll",x,!0),r.removeEventListener("scroll",x,!0),ee.forEach(G=>{G.removeEventListener("scroll",x,!0)}),ee.length=0,x=null)},W=z=>{try{if(z.preventDefault(),z.stopPropagation(),!n||!l)return;r.querySelectorAll(".ubits-data-table__status-dropdown").forEach(I=>{if(I!==l&&(I.style.display="none",I.parentElement===document.body)){const J=r.querySelector(`[data-row-id="${I.getAttribute("data-row-id")}"][data-column-id="${I.getAttribute("data-column-id")}"]`);J&&J.appendChild(I)}});const G={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"},j=c.map(I=>({label:I.label,value:I.value,state:I.status===t?"active":"default",selected:I.status===t}));if(!document.querySelector('link[href*="scroll.css"]')){const I=document.createElement("link");I.rel="stylesheet",I.href="../../addons/scroll/src/styles/scroll.css",document.head.appendChild(I)}l.innerHTML="";const V=`status-list-${i}-${e}`,oe=`status-scrollbar-${i}-${e}`;if(l.id=`status-dropdown-${i}-${e}`,l.innerHTML=`
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${V}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${oe}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `,document.getElementById(V)){const I=document.createElement("style");I.textContent=`
            #${V}::-webkit-scrollbar {
              display: none;
            }
          `,document.head.appendChild(I)}l.parentElement!==document.body&&document.body.appendChild(l);const te=n.getBoundingClientRect();l.style.position="fixed",l.style.top=`${te.bottom+4}px`,l.style.left=`${te.left}px`,l.style.zIndex="1000",l.style.backgroundColor="var(--ubits-bg-1)",l.style.border="1px solid var(--ubits-border-1)",l.style.borderRadius="8px",l.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)",l.style.display="block",l.style.minWidth="200px",l.style.maxWidth="300px",l.style.padding="4px",l.style.boxSizing="border-box",l.style.maxHeight="308px";const ge=le(n);ee.push(...ge),B(),Y(),window.addEventListener("scroll",B,!0),r.addEventListener("scroll",B,!0),ge.forEach(I=>{I.addEventListener("scroll",B,!0)});let ie=null;try{const I=he({containerId:V,items:j,size:"sm",maxHeight:"none",onSelectionChange:(J,me)=>{if(J&&me!==null){const de=c[me];if(de){const se=d.rows.find(be=>be.id===i);if(se&&d.columns.find(ne=>ne.id===e)){const ne=G[de.status]||de.label;se.data[e]=ne,se.data.estado=ne,se.data.status=ne,S()}X()}}}});I&&(I.style.maxHeight="none",I.style.height="auto",I.style.overflow="visible",I.style.overflowY="visible",I.style.overflowX="visible"),requestAnimationFrame(()=>{if(typeof fe<"u")try{const J=document.getElementById(V);J&&J.scrollHeight>J.clientHeight&&(ie=fe({containerId:oe,targetId:V,orientation:"vertical",state:"default"}),ie?.update&&ie.update())}catch{}})}catch{}l.__scrollbarInstance=ie;const pe=I=>{!l.contains(I.target)&&!n.contains(I.target)&&X()};g=pe,setTimeout(()=>{document.addEventListener("click",pe)},0)}catch{K()}};n.addEventListener("click",W)}),r.querySelectorAll('input[data-radio-button="true"][data-editable="true"]').forEach(s=>{const a=s,e=a.getAttribute("data-row-id"),t=a.getAttribute("data-column-id");if(!e||!t)return;const i=isNaN(Number(e))?e:Number(e),n=a.cloneNode(!0);a.parentNode?.replaceChild(n,a),n.addEventListener("change",l=>{if(l.stopPropagation(),n.checked){r.querySelectorAll(`input[data-radio-button="true"][data-column-id="${t}"]`).forEach(x=>{const H=x.getAttribute("data-row-id");if(H&&H!==String(i)){x.checked=!1;const M=d.rows.find(F=>String(F.id)===H);M&&(M.data[t]=!1)}});const g=d.rows.find(x=>String(x.id)===String(i));g&&(g.data[t]=!0,g.data[`${t}_value`]=i)}S()})}),r.querySelectorAll('input[data-checkbox-button="true"][data-editable="true"]').forEach(s=>{const a=s,e=a.getAttribute("data-row-id"),t=a.getAttribute("data-column-id");if(!e||!t)return;const i=isNaN(Number(e))?e:Number(e),n=a.cloneNode(!0);a.parentNode?.replaceChild(n,a),n.addEventListener("change",l=>{l.stopPropagation();const c=d.rows.find(g=>String(g.id)===String(i));c&&(c.data[t]=n.checked,S())})}),r.querySelectorAll(".ubits-data-table__date-editable").forEach(s=>{const a=s.getAttribute("data-row-id"),e=s.getAttribute("data-column-id");if(!a||!e)return;const t=isNaN(Number(a))?a:Number(a),i=s.querySelector(".ubits-data-table__date-display"),n=s.querySelector(".ubits-data-table__date-input");!i||!n||(i.addEventListener("click",l=>{l.stopPropagation(),n.style.display="block",n.style.position="absolute",n.style.opacity="0",n.style.width="100%",n.style.height="100%",n.style.top="0",n.style.left="0",n.style.cursor="pointer",n.focus(),n.showPicker?.(),setTimeout(()=>{n.click()},0)}),n.addEventListener("change",l=>{l.stopPropagation();const c=n.value;if(c){const x=new Date(c).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"});i.textContent=x,n.style.display="none";const H=d.rows.find(M=>M.id===t);H&&(H.data[e]=x,H.data[`${e}_iso`]=c),S()}}),n.addEventListener("blur",()=>{n.style.display="none"}))}),r.querySelectorAll('input[data-toggle-button="true"]').forEach(s=>{const a=s,e=a.getAttribute("data-row-id"),t=a.getAttribute("data-column-id");if(!e||!t)return;const i=isNaN(Number(e))?e:Number(e),n=a.cloneNode(!0);a.parentNode?.replaceChild(n,a),n.addEventListener("change",c=>{c.stopPropagation();const g=d.rows.find(x=>String(x.id)===String(i));g&&(g.data[t]=n.checked,S())});const l=n.closest(".ubits-toggle");l&&l.addEventListener("click",c=>{c.target!==n&&!n.contains(c.target)&&(c.preventDefault(),c.stopPropagation(),n.checked=!n.checked,n.dispatchEvent(new Event("change",{bubbles:!0})))})})}catch{}};return S(),{element:r,destroy:()=>{r&&r.parentNode&&r.parentNode.removeChild(r)},update:_=>{d={...d,..._},_.columns&&(u=_.columns.filter(T=>T.visible!==!1).map(T=>T.id)),_.rows&&(h=_.rows.map(T=>T.id)),S()}}}const Be={title:"Components/Data Table",tags:["autodocs"],parameters:{docs:{description:{component:"Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas."}}},argTypes:{columnReorderable:{control:"boolean",description:"Permite reordenar columnas mediante drag & drop",table:{defaultValue:{summary:"false"}}},rowReorderable:{control:"boolean",description:"Permite reordenar filas mediante drag & drop",table:{defaultValue:{summary:"false"}}},rowExpandable:{control:"boolean",description:"Muestra el icono de expandir/colapsar en las filas",table:{defaultValue:{summary:"true"}}},columnSortable:{control:"boolean",description:"Muestra botones de ordenamiento en los headers de las columnas",table:{defaultValue:{summary:"true"}}},showCheckbox:{control:"boolean",description:"Muestra la columna de checkbox para selección múltiple",table:{defaultValue:{summary:"true"}}},showVerticalScrollbar:{control:"boolean",description:"Muestra scrollbar vertical",table:{defaultValue:{summary:"false"}}},showHorizontalScrollbar:{control:"boolean",description:"Muestra scrollbar horizontal",table:{defaultValue:{summary:"false"}}},showColumnMenu:{control:"boolean",description:"Muestra el botón de menú en los headers de las columnas",table:{defaultValue:{summary:"true"}}},columnsCount:{control:{type:"number",min:1,max:10,step:1},description:"Número de columnas de datos a mostrar (excluyendo checkbox)",table:{defaultValue:{summary:"4"}}},columnType1:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 1 (Nombre)",table:{defaultValue:{summary:"nombre-avatar"}}},columnType2:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 2 (Email)",table:{defaultValue:{summary:"correo"}}},columnType3:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 3 (Estado)",table:{defaultValue:{summary:"estado"}}},columnType4:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 4 (Progreso)",table:{defaultValue:{summary:"progreso"}}},column1AvatarVariant:{control:{type:"select"},options:["photo","initials","icon"],description:"Variante de avatar para columna 1 (solo si es nombre-avatar o nombre-avatar-texto)",table:{defaultValue:{summary:"initials"}}},column1Editable:{control:"boolean",description:"Hacer editable la columna 1 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column2EmailClickable:{control:"boolean",description:"Hacer el email clicable en columna 2 (solo si es correo)",table:{defaultValue:{summary:"true"}}},column3Editable:{control:"boolean",description:"Hacer editable la columna 3 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column3RadioLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es radio)",table:{defaultValue:{summary:"false"}}},column3ToggleLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es toggle)",table:{defaultValue:{summary:"false"}}},column3CheckboxLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es checkbox)",table:{defaultValue:{summary:"false"}}}}},re={render:o=>{const f=document.createElement("div");f.style.padding="20px",f.style.background="var(--ubits-bg-1, #ffffff)",f.style.borderRadius="8px",f.style.width="100%",f.style.maxWidth="100%";const O=document.createElement("div");O.id="data-table-story-container",O.style.width="100%",O.style.overflow="auto";const C=o.columnsCount??4,r=o.columnType1||"nombre-avatar",d=o.columnType2||"correo",u=o.columnType3||"estado",h=o.columnType4||"progreso",m=o.columnType5||"nombre",v=o.columnType6||"nombre",L=o.columnType7||"pais",E=o.columnType8||"fecha",y=o.columnType9||"nombre",S=o.columnType10||"estado",b=o.column1AvatarVariant||"initials",q=o.column1Editable||!1,Q=o.column2EmailClickable!==void 0?o.column2EmailClickable:!0,_=o.column3Editable||!1,T=o.column3RadioLabel||!1,A=o.column3ToggleLabel||!1,R=o.column3CheckboxLabel||!1,N={id:"nombre",title:"Nombre",type:r,visible:!0,width:200};(r==="nombre-avatar"||r==="nombre-avatar-texto")&&(N.avatarVariant=b),["nombre","nombre-avatar","nombre-avatar-texto","estado","fecha","checkbox","radio"].includes(r)&&(N.editable=q);const P={id:"email",title:"Email",type:d,visible:!0,width:250};d==="correo"&&(P.emailClickable=Q);const D={id:"estado",title:"Estado",type:u,visible:!0,width:150};["nombre","nombre-avatar","nombre-avatar-texto","estado","fecha","checkbox","radio"].includes(u)&&(D.editable=_),u==="radio"?D.radioLabel=!!T:u==="toggle"?D.toggleLabel=!!A:u==="checkbox"&&(D.checkboxLabel=!!R);const s={containerId:"data-table-story-container",columns:[N,P,D,{id:"progreso",title:"Progreso",type:h,visible:!0,width:180},{id:"telefono",title:"Teléfono",type:m,visible:!0,width:150},{id:"ciudad",title:"Ciudad",type:v,visible:!0,width:150},{id:"pais",title:"País",type:L,visible:!0,width:150},{id:"fecha",title:"Fecha",type:E,visible:!0,width:150},{id:"categoria",title:"Categoría",type:y,visible:!0,width:150},{id:"prioridad",title:"Prioridad",type:S,visible:!0,width:150}].slice(0,C),rows:[{id:1,data:{nombre:"Juan Pérez",email:"juan.perez@empresa.com",estado:"Activo",progreso:75,telefono:"+57 300 123 4567",ciudad:"Bogotá",pais:"Colombia",fecha:"2024-01-15",categoria:"Desarrollo",prioridad:"Alta","checkbox-2":!1,avatar:{initials:"JP",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},expanded:!1,renderExpandedContent:a=>`
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
        `},{id:4,data:{nombre:"Ana Martínez",email:"ana.martinez@empresa.com",estado:"Pendiente",progreso:30,telefono:"+57 303 456 7890",ciudad:"Barranquilla",pais:"Colombia",fecha:"2024-04-05",categoria:"Ventas",prioridad:"Alta","checkbox-2":!0,avatar:{initials:"AM",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:5,data:{nombre:"Pedro Sánchez",email:"pedro.sanchez@empresa.com",estado:"Activo",progreso:100,telefono:"+57 304 567 8901",ciudad:"Cartagena",pais:"Colombia",fecha:"2024-05-12",categoria:"Soporte",prioridad:"Media","checkbox-2":!1,avatar:{initials:"PS",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:6,data:{nombre:"Patricia Rodríguez",email:"patricia.rodriguez@empresa.com",estado:"Activo",progreso:60,telefono:"+57 305 678 9012",ciudad:"Bucaramanga",pais:"Colombia",fecha:"2024-06-18",categoria:"Recursos Humanos",prioridad:"Baja","checkbox-2":!0,avatar:{initials:"PR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:7,data:{nombre:"Roberto Silva",email:"roberto.silva@empresa.com",estado:"Inactivo",progreso:25,telefono:"+57 306 789 0123",ciudad:"Pereira",pais:"Colombia",fecha:"2024-07-22",categoria:"Finanzas",prioridad:"Alta","checkbox-2":!1,avatar:{initials:"RS",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:8,data:{nombre:"Carmen Vargas",email:"carmen.vargas@empresa.com",estado:"Activo",progreso:85,telefono:"+57 307 890 1234",ciudad:"Santa Marta",pais:"Colombia",fecha:"2024-08-05",categoria:"Operaciones",prioridad:"Media","checkbox-2":!0,avatar:{initials:"CV",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:9,data:{nombre:"Diego Morales",email:"diego.morales@empresa.com",estado:"Pendiente",progreso:50,telefono:"+57 308 901 2345",ciudad:"Manizales",pais:"Colombia",fecha:"2024-09-10",categoria:"Tecnología",prioridad:"Baja","checkbox-2":!1,avatar:{initials:"DM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:10,data:{nombre:"Daniela Herrera",email:"daniela.herrera@empresa.com",estado:"Activo",progreso:95,telefono:"+57 309 012 3456",ciudad:"Armenia",pais:"Colombia",fecha:"2024-10-15",categoria:"Innovación",prioridad:"Alta","checkbox-2":!0,avatar:{initials:"DH",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:11,data:{nombre:"Andrés Castro",email:"andres.castro@empresa.com",estado:"Activo",progreso:70,telefono:"+57 310 123 4567",ciudad:"Villavicencio",pais:"Colombia",fecha:"2024-11-20",categoria:"Logística",prioridad:"Media","checkbox-2":!1,avatar:{initials:"AC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:12,data:{nombre:"Valentina Rojas",email:"valentina.rojas@empresa.com",estado:"Inactivo",progreso:40,telefono:"+57 311 234 5678",ciudad:"Ibagué",pais:"Colombia",fecha:"2024-12-25",categoria:"Calidad",prioridad:"Baja","checkbox-2":!0,avatar:{initials:"VR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:13,data:{nombre:"Fernando Gutiérrez",email:"fernando.gutierrez@empresa.com",estado:"Activo",progreso:80,telefono:"+57 312 345 6789",ciudad:"Pasto",pais:"Colombia",fecha:"2025-01-08",categoria:"Investigación",prioridad:"Alta","checkbox-2":!1,avatar:{initials:"FG",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:14,data:{nombre:"Isabella Ramírez",email:"isabella.ramirez@empresa.com",estado:"Pendiente",progreso:55,telefono:"+57 313 456 7890",ciudad:"Tunja",pais:"Colombia",fecha:"2025-02-12",categoria:"Comunicaciones",prioridad:"Media","checkbox-2":!0,avatar:{initials:"IR",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},expanded:!1},{id:15,data:{nombre:"Sebastián Torres",email:"sebastian.torres@empresa.com",estado:"Activo",progreso:65,telefono:"+57 314 567 8901",ciudad:"Neiva",pais:"Colombia",fecha:"2025-03-18",categoria:"Estrategia",prioridad:"Baja","checkbox-2":!1,avatar:{initials:"ST",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},expanded:!1}],columnReorderable:o.columnReorderable??!1,rowReorderable:o.rowReorderable??!1,rowExpandable:o.rowExpandable??!0,columnSortable:o.columnSortable??!0,showCheckbox:o.showCheckbox??!0,showVerticalScrollbar:o.showVerticalScrollbar??!1,showHorizontalScrollbar:o.showHorizontalScrollbar??!1,showColumnMenu:o.showColumnMenu??!0,onRowExpand:(a,e)=>{console.log("Row expanded:",a,e)},onColumnReorder:a=>{console.log("Columns reordered:",a)},onRowReorder:a=>{console.log("Rows reordered:",a)},onSort:(a,e)=>{console.log("Column sorted:",a,e)},onColumnPin:(a,e)=>{console.log("Column pinned:",a,e)}};return f.appendChild(O),setTimeout(()=>{try{Ie(s)}catch(a){console.error("Error creating data table:",a)}},100),f},args:{columnReorderable:!1,rowReorderable:!1,rowExpandable:!0,columnSortable:!0,showCheckbox:!0,showVerticalScrollbar:!1,showHorizontalScrollbar:!1,showColumnMenu:!0,columnsCount:4,columnType1:"nombre-avatar",columnType2:"correo",columnType3:"estado",columnType4:"progreso",column1AvatarVariant:"initials",column1Editable:!1,column2EmailClickable:!0,column3Editable:!1,column3RadioLabel:!1,column3ToggleLabel:!1,column3CheckboxLabel:!1}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
  render: args => {
    // Contenedor principal con estilos UBITS
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '100%';

    // Contenedor para la tabla
    const tableContainer = document.createElement('div');
    tableContainer.id = 'data-table-story-container';
    tableContainer.style.width = '100%';
    tableContainer.style.overflow = 'auto';

    // Generar columnas dinámicamente según columnsCount
    const columnsCount = args.columnsCount ?? 4;

    // Tipos de columna disponibles (pueden ser controlados desde Storybook)
    const columnType1 = (args as any).columnType1 || 'nombre-avatar';
    const columnType2 = (args as any).columnType2 || 'correo';
    const columnType3 = (args as any).columnType3 || 'estado';
    const columnType4 = (args as any).columnType4 || 'progreso';
    const columnType5 = (args as any).columnType5 || 'nombre';
    const columnType6 = (args as any).columnType6 || 'nombre';
    const columnType7 = (args as any).columnType7 || 'pais';
    const columnType8 = (args as any).columnType8 || 'fecha';
    const columnType9 = (args as any).columnType9 || 'nombre';
    const columnType10 = (args as any).columnType10 || 'estado';

    // Controles adicionales para columnas
    const column1AvatarVariant = (args as any).column1AvatarVariant || 'initials';
    const column1Editable = (args as any).column1Editable || false;
    const column2EmailClickable = (args as any).column2EmailClickable !== undefined ? (args as any).column2EmailClickable : true;
    const column3Editable = (args as any).column3Editable || false;
    const column3RadioLabel = (args as any).column3RadioLabel || false;
    const column3ToggleLabel = (args as any).column3ToggleLabel || false;
    const column3CheckboxLabel = (args as any).column3CheckboxLabel || false;

    // Construir columnas con sus controles
    const col1: TableColumn = {
      id: 'nombre',
      title: 'Nombre',
      type: columnType1 as any,
      visible: true,
      width: 200
    };

    // Agregar avatarVariant solo si el tipo es nombre-avatar o nombre-avatar-texto
    if (columnType1 === 'nombre-avatar' || columnType1 === 'nombre-avatar-texto') {
      col1.avatarVariant = column1AvatarVariant as 'photo' | 'initials' | 'icon';
    }

    // Agregar editable solo si el tipo lo permite
    const editableTypes1 = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
    if (editableTypes1.includes(columnType1)) {
      col1.editable = column1Editable;
    }
    const col2: TableColumn = {
      id: 'email',
      title: 'Email',
      type: columnType2 as any,
      visible: true,
      width: 250
    };

    // Agregar emailClickable solo si el tipo es correo
    if (columnType2 === 'correo') {
      col2.emailClickable = column2EmailClickable;
    }
    const col3: TableColumn = {
      id: 'estado',
      title: 'Estado',
      type: columnType3 as any,
      visible: true,
      width: 150
    };

    // Agregar editable solo si el tipo lo permite
    const editableTypes3 = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
    if (editableTypes3.includes(columnType3)) {
      col3.editable = column3Editable;
    }

    // Agregar labels según el tipo
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
      containerId: 'data-table-story-container',
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
      }
    };

    // Agregar el contenedor de la tabla al contenedor principal
    container.appendChild(tableContainer);

    // Inicializar la tabla después de que se monte en el DOM
    setTimeout(() => {
      try {
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
}`,...re.parameters?.docs?.source}}};const Ue=["Default"];export{re as Default,Ue as __namedExportsOrder,Be as default};
