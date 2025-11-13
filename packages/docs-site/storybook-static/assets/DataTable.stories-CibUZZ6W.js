const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BovPifr4.js","./preload-helper-PPVm8Dsz.js"])))=>i.map(i=>d[i]);
import{_ as je}from"./preload-helper-PPVm8Dsz.js";import{r as Ne}from"./CheckboxProvider-DIr0OIhT.js";import{r as $e}from"./ProgressProvider-OoWtyPYr.js";import{r as Ve}from"./StatusTagProvider-BsgFC12L.js";import{r as Re}from"./AvatarProvider-CF4x-oFR.js";import{r as qe}from"./ToggleProvider-tayloMCw.js";import{r as Fe}from"./RadioButtonProvider-CIXtywXC.js";import{r as we}from"./ButtonProvider-C3s0jBEY.js";import{c as He,r as _e}from"./ListProvider-CTqFAS6Y.js";import{createScrollbar as Me}from"./ScrollProvider-BVL7eCy8.js";import{r as Ge}from"./PaginationProvider-BSzfKDd0.js";import{c as We,r as Xe}from"./search-button-D3yzIsPK.js";import{c as Oe}from"./DrawerProvider-Ah5KiUc1.js";import{r as Ue,c as Je}from"./InputProvider-CfXMQ1E0.js";import{r as Ke}from"./EmptyStateProvider-DtTd6-aC.js";import"./iframe-Qhh1jVCN.js";import"./SpinnerProvider-o6XHV06V.js";function Ze(e,M,Q){const D=M.data[e.id],U=M.data;switch(Q){case"nombre":{const x=D||U.nombre||U.name||"";return e.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${x}</span>`:`<span class="ubits-body-md-regular">${x}</span>`}case"progreso":{let x=null;if(D!=null){if(typeof D=="number")x=D;else if(typeof D=="string"){const j=parseFloat(D.replace("%","").trim());isNaN(j)||(x=j)}}if(x===null&&U){const j=U.progress!==void 0?U.progress:U.progreso;if(j!=null){if(typeof j=="number")x=j;else if(typeof j=="string"){const u=parseFloat(j.replace("%","").trim());isNaN(u)||(x=u)}}}return x===null&&(x=50),x=Math.max(0,Math.min(100,x)),$e({value:x,size:"sm",variant:"default",indicator:`${Math.round(x)}%`})}case"nombre-avatar":{const x=D||U.nombre||U.name||"",k=U.avatar||U.avatarUrl||null;console.log("🖼️ [AVATAR] Renderizando nombre-avatar:",{columnId:e.id,rowId:M.id,nombre:x,avatar:k,cellData:U,hasAvatar:!!k,avatarType:typeof k});const j=e.avatarVariant||"initials",u=O=>O.split(" ").map(re=>re[0]).join("").toUpperCase().slice(0,2)||"U";let $="";if(j==="photo"){let O=null;k&&typeof k=="string"?O=k:k&&typeof k=="object"&&(O=k.imageUrl||k.url||null),!O&&U&&(O=U.imageUrl||U.avatarUrl||U.avatarImage||null),O?$=Re({imageUrl:O,size:"sm"}):$=Re({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(j==="initials"){if(k&&typeof k=="object"&&k.initials)console.log("🖼️ [AVATAR] Usando initials del objeto avatar:",k.initials),$=Re({initials:k.initials,size:"sm"});else{const O=u(x);console.log("🖼️ [AVATAR] Generando initials del nombre:",x,"->",O),$=Re({initials:O,size:"sm"})}console.log("🖼️ [AVATAR] HTML generado (initials):",$?$.substring(0,100):"VACÍO")}else{const O=k&&typeof k=="object"&&k.icon?k.icon:"user";console.log("🖼️ [AVATAR] Usando icon:",O),$=Re({icon:O,size:"sm"}),console.log("🖼️ [AVATAR] HTML generado (icon):",$?$.substring(0,100):"VACÍO")}const X=e.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${x}</span>`:`<span class="ubits-body-md-regular">${x}</span>`,V=`
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${$}
          ${X}
        </div>
      `;return console.log("🖼️ [AVATAR] HTML final:",V.substring(0,200)),V}case"nombre-avatar-texto":{const x=D||U.nombre||U.name||"",k=U.avatar||U.avatarUrl||null,j=U.area||U.areaNombre||U.textoComplementario||U.complementario||"",u=e.avatarVariant||"initials",$=V=>V.split(" ").map(O=>O[0]).join("").toUpperCase().slice(0,2)||"U";let t="";if(u==="photo"){let V=null;k&&typeof k=="string"?V=k:k&&typeof k=="object"&&(V=k.imageUrl||k.url||null),!V&&U&&(V=U.imageUrl||U.avatarUrl||U.avatarImage||null),V?t=Re({imageUrl:V,size:"sm"}):t=Re({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(u==="initials")if(k&&typeof k=="object"&&k.initials)t=Re({initials:k.initials,size:"sm"});else{const V=$(x);t=Re({initials:V,size:"sm"})}else{const V=k&&typeof k=="object"&&k.icon?k.icon:"user";t=Re({icon:V,size:"sm"})}const X=`<span class="ubits-body-md-regular">${x}</span>`;return`
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm, 12px);">
          ${t}
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${X}
            ${j?`<span class="ubits-body-sm-regular" style="color: var(--ubits-fg-1-medium);">${j}</span>`:""}
          </div>
        </div>
      `}case"estado":{const x={activo:"active",inactivo:"disabled",pendiente:"pending",completado:"completed",publicado:"published",cumplido:"fulfilled",creado:"created",error:"not-fulfilled",denegado:"denied",borrador:"draft","en-progreso":"in-progress",sincronizando:"syncing","pendiente-aprobacion":"pending-approval","no-iniciado":"not-started",finalizado:"finished",archivado:"archived",deshabilitado:"disabled",pausado:"paused",oculto:"hidden",cancelado:"denied"},k=D||U.estado||U.status||"pendiente",j=String(k).toLowerCase().trim(),u=x[j]||x.pendiente,t={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"}[u]||String(k),X=e.editable,V=Ve({label:t,status:u,size:"xs",rightIcon:X?"chevron-down":null,clickable:X});return X?`
          <div class="ubits-data-table__status-editable" data-row-id="${M.id}" data-column-id="${e.id}" data-editable="true" data-current-status="${u}">
            ${V}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${M.id}-${e.id}" style="display: none;"></div>
          </div>
        `:V}case"radio":{const x=D===!0||D==="true"||D===1||D===M.id||D===String(M.id),k=e.radioLabel!==!1&&e.radioLabel!==void 0,j=typeof e.radioLabel=="string"?e.radioLabel:k?String(M.data[e.id]||M.id):"",u=e.editable===!0,$=!u;return Fe({label:j,name:`radio-${e.id}`,value:String(M.id),checked:x,size:"md",disabled:$}).replace("<input",`<input data-row-id="${M.id}" data-column-id="${e.id}" data-radio-button="true" ${u?'data-editable="true"':""}`)}case"toggle":{const x=D===!0||D==="true"||D===1,k=e.toggleLabel!==!1&&e.toggleLabel!==void 0,j=typeof e.toggleLabel=="string"?e.toggleLabel:k?String(M.data[e.id]||M.id):"";return qe({label:j,checked:x,size:"md"}).replace("<input",`<input data-row-id="${M.id}" data-column-id="${e.id}" data-toggle-button="true"`)}case"checkbox":{const x=D===!0||D==="true"||D===1,k=e.checkboxLabel!==!1&&e.checkboxLabel!==void 0,j=typeof e.checkboxLabel=="string"?e.checkboxLabel:k?String(M.data[e.id]||M.id):"",u=e.editable===!0;return Ne({label:j,checked:x,size:"md",disabled:!u}).replace("<input",`<input data-row-id="${M.id}" data-column-id="${e.id}" data-checkbox-button="true" ${u?'data-editable="true"':""}`)}case"correo":{const x=D||"";return e.emailClickable!==!1?`<a href="mailto:${x}" class="ubits-body-md-regular" style="color: var(--ubits-accent-brand-static-inverted); text-decoration: none;">${x}</a>`:`<span class="ubits-body-md-regular">${x}</span>`}case"acciones":return we({text:"Eliminar",variant:"tertiary",size:"sm",icon:"trash",iconStyle:"regular",className:"ubits-data-table__action-button"});case"fecha":{const x=D||"";return e.editable===!0?`
            <div class="ubits-data-table__date-editable" data-row-id="${M.id}" data-column-id="${e.id}">
              <span class="ubits-body-md-regular ubits-data-table__date-display">${x||"Seleccionar fecha"}</span>
            </div>
          `:`<span class="ubits-body-md-regular">${x}</span>`}case"area":return`<span class="ubits-body-md-regular">${D||"Desarrollo"}</span>`;case"lider":return`<span class="ubits-body-md-regular">${D||"Juan Pérez"}</span>`;case"pais":return`<span class="ubits-body-md-regular">${D||"Colombia"}</span>`;case"ciudad":return`<span class="ubits-body-md-regular">${D||"Bogotá"}</span>`;case"drag-handle":return`
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${M.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;case"expand":{const x=M.expanded||!1;return`
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${x?"Colapsar":"Expandir"} fila"
          data-row-id="${M.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${x?"down":"right"}" aria-hidden="true"></i>
        </button>
      `}default:return`<span class="ubits-body-md-regular">${D||""}</span>`}}function Ye(e,M,Q=0){if(e.type!=="checkbox"&&(e.id==="checkbox"||e.id.startsWith("checkbox-"))){const j=M.data[e.id]||!1,$=Ne({label:"",checked:j,size:"md",className:"ubits-data-table__cell-checkbox"}).replace("<input",`<input data-row-id="${M.id}" data-column-id="${e.id}" aria-label="Checkbox ${e.title}"`),t=e.id==="checkbox-2"?"12px":"var(--ubits-spacing-md, 16px)",X=e.pinned?" ubits-data-table__cell--pinned":"",V=e.pinned?`position: sticky !important; left: ${Q}px !important; z-index: 12 !important;`:"",re=`${`text-align: center; vertical-align: middle; padding-left: ${t} !important;`}${V?" "+V:""}`;return`
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${X}" data-column-id="${e.id}" ${e.pinned?'data-pinned="true"':""} style="${re}">
        ${$}
      </td>
    `}if(e.type){const j=Ze(e,M,e.type),u=e.editable&&(e.type==="nombre"||e.type==="nombre-avatar"||e.type==="estado"||e.type==="fecha"||e.type==="checkbox"||e.type==="radio")&&e.type!=="drag-handle"&&e.type!=="expand",$=e.type==="drag-handle"?"ubits-data-table__cell--drag-handle":e.type==="expand"?"ubits-data-table__cell--expand":`ubits-data-table__cell--${e.type}`,t=u?"ubits-data-table__cell--editable":"",X=e.pinned?" ubits-data-table__cell--pinned":"",V=e.type==="drag-handle"||e.type==="expand"?"text-align: center; vertical-align: middle;":"",O=e.pinned?`position: sticky !important; left: ${Q}px !important; z-index: 12 !important;`:"",re=`${V}${O?" "+O:""}`,he=re?` style="${re}"`:"";e.pinned&&console.log("📌 [CELL TIPO] Columna fijada detectada:",{columnId:e.id,columnType:e.type,rowId:M.id,pinned:e.pinned,pinnedLeft:Q,pinnedClass:X,pinnedStyle:O,hasPinnedClass:X.includes("pinned"),hasPinnedStyle:O.includes("left"),hasPositionStyle:O.includes("sticky")});const Ee=u&&(e.type==="nombre"||e.type==="nombre-avatar"||e.type==="estado"||e.type==="fecha")?`data-row-id="${M.id}" data-column-id="${e.id}" data-editable="true"${e.pinned?' data-pinned="true"':""}`:`data-column-id="${e.id}"${e.pinned?' data-pinned="true"':""}`;return`
      <td class="ubits-data-table__cell ${$} ${t}${X}" ${Ee}${he}>
        ${j}
      </td>
    `}const U=e.renderCell?e.renderCell(M.data):M.data[e.id]||"",x=e.pinned?" ubits-data-table__cell--pinned":"",k=e.pinned?` style="position: sticky !important; left: ${Q}px !important; z-index: 12 !important;"`:"";return e.pinned&&console.log("📌 [CELL NORMAL] Columna fijada detectada:",{columnId:e.id,rowId:M.id,pinned:e.pinned,pinnedLeft:Q,pinnedClass:x,pinnedStyle:k,hasPinnedClass:x.includes("pinned"),hasPinnedStyle:k.includes("left"),hasPositionStyle:k.includes("sticky")}),`
    <td class="ubits-data-table__cell${x}" data-column-id="${e.id}"${e.pinned?' data-pinned="true"':""}${k}>
      ${U}
    </td>
  `}function Qe(e,M=!1,Q=!0,D=[],U=null,x=null,k=!0,j=0){if(e.type==="drag-handle"||e.type==="expand"){const ee=e.pinned?" ubits-data-table__column-header--pinned":"",me=e.pinned?`position: sticky !important; left: ${j}px !important; z-index: 10 !important;`:"",te=e.width?`width: ${e.width}px;`:"",ge=[me,te].filter(Boolean).join(" "),ae=ge?`style="${ge}"`:"";return`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${e.type}${ee}" 
        ${ae}
        data-column-id="${e.id}"
        ${e.pinned?'data-pinned="true"':""}
      >
      </th>
    `}const u=e.type!=="checkbox"&&(e.id==="checkbox"||e.id.startsWith("checkbox-"));if(e.type,u){const ee=D.length>0&&D.every(de=>de.data[e.id]===!0),me=D.some(de=>de.data[e.id]===!0),ge=Ne({label:"",checked:ee,indeterminate:me&&!ee,size:"md",className:"ubits-data-table__column-checkbox-header"}).replace("<input",`<input data-column-checkbox-header="${e.id}" aria-label="Seleccionar todos ${e.title}"`),ae=e.pinned?" ubits-data-table__column-header--pinned":"",I=e.pinned?`position: sticky !important; left: ${j}px !important; z-index: 10 !important;`:"",xe=e.width?`width: ${e.width}px;`:"",Ie=[I,xe].filter(Boolean).join(" "),G=Ie?`style="${Ie}"`:"";return`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${ae}" 
        ${G}
        data-column-id="${e.id}"
        ${e.pinned?'data-pinned="true"':""}
      >
        ${ge}
      </th>
    `}const $=e.type==="drag-handle"||e.type==="expand",t=M&&!u&&!$?`
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${e.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  `:"",X=!u&&!$&&Q?(()=>{const ee=U===e.id,me=ee?" ubits-data-table__column-sort--active":"";let te="arrow-up-a-z",ge="fas fa-sort-alpha-up";return ee&&x&&(x==="asc"?(te="arrow-up-a-z",ge="fas fa-sort-alpha-up"):(te="arrow-down-a-z",ge="fas fa-sort-alpha-down")),`
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${me}" 
           data-column-id="${e.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${e.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${te}"></wa-icon>
        <i class="${ge}" aria-hidden="true"></i>
      </div>
    `})():"",V=!u&&!$&&k?we({variant:"tertiary",size:"xs",icon:"ellipsis",iconStyle:"solid",iconOnly:!0,className:"ubits-data-table__column-menu-button",attributes:{"aria-label":`Menú de opciones de ${e.title}`,"data-column-id":e.id,"data-menu-button":"true"}}):"",O=`
    <div class="ubits-data-table__column-header-content">
      ${t}
      <span class="ubits-data-table__column-title">${e.title}</span>
      <div class="ubits-data-table__column-actions">
        ${X}
        ${V}
      </div>
    </div>
  `,re=e.pinned?" ubits-data-table__column-header--pinned":"",he=e.pinned?`left: ${j}px !important;`:"",Ee=e.width?`width: ${e.width}px;`:"",oe=e.pinned?"position: sticky !important;":"",ce=e.pinned?"z-index: 10 !important;":"",Ce=[oe,he,ce,Ee].filter(Boolean).join(" "),le=Ce?`style="${Ce}"`:"";e.pinned&&console.log("📌 [HEADER PRE-HTML] Antes de construir HTML:",{columnId:e.id,pinned:e.pinned,combinedStyle:Ce,combinedStyleLength:Ce.length,styleAttribute:le,willIncludeStyle:!!le});const Z=`
    <th 
      class="ubits-data-table__column-header${re}" 
      ${le} 
      data-column-id="${e.id}"
      ${e.pinned?'data-pinned="true"':""}
    >
      ${O}
    </th>
  `;return e.pinned&&console.log("📌 [HEADER HTML] HTML generado para columna fijada:",{columnId:e.id,htmlLength:Z.length,htmlIncludesSticky:Z.includes("sticky"),htmlIncludesLeft:Z.includes("left"),htmlIncludesPosition:Z.includes("position"),htmlIncludesWidth:Z.includes("width"),styleAttributeInHTML:Z.includes("style="),htmlPreview:Z.substring(0,400)}),Z}function ea(e,M,Q,D=[]){const U=e.expanded||!1,x=M.filter($=>$.visible!==!1),k=x.map(($,t)=>{const X=D[t]||0;return Ye($,e,X)}).join("");let u=`
    <tr class="${["ubits-data-table__row",U?"ubits-data-table__row--expanded":""].filter(Boolean).join(" ")}" data-row-id="${e.id}">
      ${k}
    </tr>
  `;if(U&&e.renderExpandedContent){const $=e.renderExpandedContent(e.data),t=x.length;console.log("📋 [ROW RENDER] Fila expandida - rowId:",e.id,"colspan:",t,"tiene contenido:",!!$),u+=`
      <tr class="ubits-data-table__row-expanded-row" data-expanded-for="${e.id}">
        <td class="ubits-data-table__row-expanded-content" colspan="${t}">
          ${$}
        </td>
      </tr>
    `}else U&&!e.renderExpandedContent&&console.warn("📋 [ROW RENDER] ⚠️ Fila marcada como expandida pero no tiene renderExpandedContent - rowId:",e.id);return u}function aa(e,M={}){const{header:Q,rows:D}=e;if(!Q)return"";const{title:U,showTitle:x=U!==void 0,counter:k,displayedItems:j,totalItems:u,showCounter:$=k!==void 0&&k!==!1,primaryButton:t,showPrimaryButton:X=t!==void 0,secondaryButtons:V=[],showSecondaryButtons:O=V!==void 0&&V.length>0,searchButton:re,showSearchButton:he=re!==void 0,filterButton:Ee,showFilterButton:oe=Ee!==void 0,columnSelectorButton:ce,showColumnSelectorButton:Ce=ce!==void 0}=Q,le=Q.__isSearchActive||!1,Z=Q.__searchTerm||"";let ee="";if($&&k){if(typeof k=="string")k==="total-only"?ee=`${u!==void 0?u:D.length} resultados`:ee=k;else if(k===!0){const de=j!==void 0?j:D.length,Se=u!==void 0?u:D.length;ee=`${de}/${Se} resultados`,console.log("🔢 [COUNTER] Calculando contador:",{displayedItems:j,totalItems:u,rowsLength:D.length,currentDisplayed:de,total:Se,counterText:ee})}}const me=x&&U?`
    <div class="ubits-data-table__header-title">
      <span class="ubits-body-md-bold ubits-data-table__header-title-text">${U}</span>
      ${ee?`<span class="ubits-data-table__header-counter ubits-body-sm-regular">${ee}</span>`:""}
    </div>
  `:ee?`
    <div class="ubits-data-table__header-title">
      <span class="ubits-data-table__header-counter ubits-body-sm-regular">${ee}</span>
    </div>
  `:"",te=X&&t?we({variant:"primary",size:"sm",icon:t.icon||"plus",iconStyle:t.iconStyle||"regular",iconOnly:!0,disabled:t.disabled||!1,loading:t.loading||!1,className:"ubits-data-table__header-primary-button",showTooltip:!0,tooltipText:t.text||"Nuevo"}):"",ge=O&&V.length>0?V.slice(0,2).map(de=>we({variant:"secondary",size:"sm",icon:de.icon||"download",iconStyle:de.iconStyle||"regular",iconOnly:!0,disabled:de.disabled||!1,loading:de.loading||!1,className:"ubits-data-table__header-secondary-button",showTooltip:!0,tooltipText:de.text||""})).join(""):"",ae=Object.keys(M).filter(de=>M[de]&&M[de].trim()!=="").length;let I=oe&&Ee?we({variant:"secondary",size:"sm",icon:"filter",iconStyle:"regular",iconOnly:!0,disabled:Ee.disabled||!1,active:Ee.active||!1||ae>0,badge:ae>0,className:"ubits-data-table__header-filter-button",showTooltip:!0,tooltipText:"Filtros"}):"";if(I&&ae>0){const de=`<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--primary ubits-button__badge">${ae}</span>`;I=I.replace('<span class="ubits-button__badge"></span>',de)}const xe=Ce&&ce?we({variant:"secondary",size:"sm",icon:"columns-3",iconStyle:"regular",iconOnly:!0,disabled:ce.disabled||!1,active:ce.active||!1,className:"ubits-data-table__header-column-selector-button",showTooltip:!0,tooltipText:"Seleccionar columnas"}):"",Ie=Z||re&&re.value||"",G=he&&re?Xe({active:le,size:"sm",state:le?"active":"default",disabled:re.disabled||!1,placeholder:re.placeholder||"Buscar...",value:Ie,width:248,className:"ubits-data-table__header-search-button"}):"";return!(me||te||ge||G||I||xe)?(console.warn("⚠️ [DATA TABLE HEADER] No hay elementos para renderizar, retornando vacío"),""):`
    <div class="ubits-data-table__header">
      ${me}
      <div class="ubits-data-table__header-actions">
        ${G}
        ${I}
        ${xe}
        ${ge}
        ${te}
      </div>
    </div>
  `.trim()}function ze(e,M=[],Q=[],D={}){const{columns:U,rows:x,className:k="",columnReorderable:j=!1,columnSortable:u=!0,rowReorderable:$=!1,rowExpandable:t=!0,showCheckbox:X=!0,showVerticalScrollbar:V=!1,showHorizontalScrollbar:O=!1,showColumnMenu:re=!0,showPagination:he=!1,currentPage:Ee=1,itemsPerPage:oe=10,paginationVariant:ce="default",paginationSize:Ce="md",lazyLoad:le,lazyLoadItemsPerBatch:Z=10,emptyState:ee}=e,me=e.header?.__searchTerm||"",te=he?!1:le!==!1;console.log("🔍 [RENDER] isLazyLoadEnabled calculado:",te,"| showPagination:",he,"| lazyLoad:",le);const ge=new Set,ae=U.filter(a=>ge.has(a.id)?(console.log("🔍 [RENDER DATA TABLE] ⚠️ COLUMNA DUPLICADA ELIMINADA:",a.id,a.title),!1):(ge.add(a.id),!0));console.log("🔍 [RENDER DATA TABLE] Columnas únicas:",ae.length,"de",U.length,"totales");let I=ae.filter(a=>a.visible!==!1);if(I=I.filter(a=>a.id!=="checkbox"),M.length>0){const a=M.filter(m=>m!=="checkbox"),s=new Map(I.map(m=>{const w={...m};return m.pinned!==void 0&&(w.pinned=m.pinned),[m.id,w]}));I=a.map(m=>{const w=s.get(m);if(w){const R=I.find(h=>h.id===m);R&&R.pinned!==void 0&&(w.pinned=R.pinned)}return w}).filter(m=>m!==void 0).concat(I.filter(m=>!a.includes(m.id)).map(m=>{const w={...m};return m.pinned!==void 0&&(w.pinned=m.pinned),w}))}else I=I.map(a=>{const s={...a};return a.pinned!==void 0&&(s.pinned=a.pinned),s});if(X!==!1){if(!I.some(s=>s.id==="checkbox-2")){const s={id:"checkbox-2",title:"",type:void 0,visible:!0,width:48};I.unshift(s)}}else I.map(a=>a.id),I=I.filter(a=>a.id!=="checkbox-2"),I.map(a=>a.id);if($){if(!I.some(s=>s.type==="drag-handle")){const s={id:"drag-handle",title:"",type:"drag-handle",visible:!0,width:32};I.unshift(s)}}else I=I.filter(a=>a.type!=="drag-handle");if(t){if(!I.some(s=>s.type==="expand")){const s={id:"expand",title:"",type:"expand",visible:!0,width:32},m=I.findIndex(w=>w.type==="drag-handle");m>=0?I.splice(m+1,0,s):I.unshift(s)}}else I=I.filter(a=>a.type!=="expand");const{checkboxSticky:xe=!1,dragHandleSticky:Ie=!1,expandSticky:G=!1}=e;I=I.map(a=>{const s={...a};return a.id==="checkbox-2"?xe===!0?s.pinned=!0:s.pinned=!1:a.type==="drag-handle"?Ie===!0?s.pinned=!0:s.pinned=!1:a.type==="expand"&&(G===!0?s.pinned=!0:s.pinned=!1),s.pinned&&!a.id.startsWith("checkbox")&&a.type!=="drag-handle"&&a.type,s}),I.filter(a=>a.pinned);const Pe=e.sortColumnId||null,de=e.sortDirection||null;let Se=[...x];if(Q.length>0){const a=new Map(x.map(s=>[s.id,s]));Se=Q.map(s=>a.get(s)).filter(s=>s!==void 0).concat(x.filter(s=>!Q.includes(s.id)))}Pe&&de&&(Se=[...Se].sort((a,s)=>{const m=a.data[Pe],w=s.data[Pe];if(m==null&&w==null)return 0;if(m==null)return 1;if(w==null)return-1;const R=String(m).toLowerCase(),h=String(w).toLowerCase();let S=0;return R<h?S=-1:R>h&&(S=1),de==="asc"?S:-S}));const B=(a,s,m)=>{let w=0;const R={columnId:a.id,steps:[]};for(let h=0;h<s;h++){const S=m[h];if(S&&S.pinned){let y=S.width;y||(S.type==="drag-handle"||S.type==="expand"?y=32:S.id==="checkbox-2"?y=48:y=150),w+=y,R.steps.push({step:`columna-${S.id}`,added:y,total:w,reason:`Columna fijada anterior: ${S.id} (tipo: ${S.type||"normal"})`})}else S&&!S.pinned&&R.steps.push({step:`columna-${S.id}`,added:0,total:w,reason:`Columna anterior no fijada: ${S.id}`})}return R.finalLeft=w,a.pinned,w},J=I.map((a,s)=>{const m=a.pinned?B(a,s,I):0;return a.pinned,Qe(a,j,u,Se,Pe,de,re,m)}).join("");let H=Se,K=1,ve="";const pe=e.__lazyLoadCurrentItems||Z;if(console.log("🔍 [RENDER] ========== FILAS DEBUG =========="),console.log("🔍 [RENDER] orderedRows.length:",Se.length),console.log("🔍 [RENDER] showPagination:",he),console.log("🔍 [RENDER] isLazyLoadEnabled:",te),console.log("🔍 [RENDER] lazyLoad option:",e.lazyLoad),console.log("🔍 [RENDER] currentLoadedItems:",pe),console.log("🔍 [RENDER] lazyLoadItemsPerBatch:",Z),he){const a=Se.length;K=Math.max(1,Math.ceil(a/oe));const s=Math.max(1,Math.min(Ee,K)),m=(s-1)*oe,w=m+oe;H=Se.slice(m,w),console.log("🔍 [RENDER] Modo PAGINACIÓN - totalRows:",a,"paginatedRows:",H.length);try{ve=Ge({currentPage:s,totalPages:K,totalItems:a,itemsPerPage:oe,variant:ce,size:Ce,maxVisiblePages:7,showFirst:!1,showLast:!1,showPrevNext:!0,showInfo:!1,showItemsPerPage:!1,itemsPerPageOptions:[10,20,50,100],className:"ubits-data-table__pagination"})}catch(R){console.error("❌ [PAGINATION] ERROR:",R),ve=""}}else te?(H=Se.slice(0,pe),console.log("🔍 [RENDER] Modo LAZY LOAD - Mostrando",H.length,"de",Se.length,"filas")):console.log("🔍 [RENDER] Modo SIN PAGINACIÓN NI LAZY LOAD - Mostrando todas las filas:",Se.length);console.log("🔍 [RENDER] paginatedRows.length final:",H.length),console.log("🔍 [RENDER] ========== FIN FILAS DEBUG ==========");let Le="";const ne=x.length===0,ue=H.length===0,ie=Object.keys(D).length>0,W=me&&me.trim()!=="";if(ue&&ee){let a;ne&&ee.noData?a=ee.noData:W&&ee.noSearchResults?a=ee.noSearchResults:ie&&ee.noFilterResults&&(a=ee.noFilterResults),a&&(Le=Ke({title:a.title||"No hay resultados",description:a.description,icon:a.icon,imageUrl:a.imageUrl,actionLabel:a.actionLabel,showPrimaryButton:a.showPrimaryButton||!1,primaryButtonIcon:a.primaryButtonIcon,showPrimaryButtonIcon:a.showPrimaryButtonIcon||!1,secondaryActionLabel:a.secondaryActionLabel,showSecondaryButton:a.showSecondaryButton||!1,secondaryButtonIcon:a.secondaryButtonIcon,showSecondaryButtonIcon:a.showSecondaryButtonIcon||!1,className:"ubits-data-table__empty-state"}))}const Te=H.map((a,s)=>{const m=I.map((w,R)=>w.pinned?B(w,R,I):0);return ea(a,I,s,m)}).join("");console.log("🔍 [RENDER] rowsHTML generado, número de <tr> en HTML:",(Te.match(/<tr/g)||[]).length),console.log("🔍 [RENDER] paginatedRows procesadas:",H.length);const be=Le||Te,fe=["ubits-data-table",k].filter(Boolean).join(" "),C=I.length,f=`
    <table class="${fe} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${J}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${Le?`<tr><td colspan="${C}" style="padding: 0;">${Le}</td></tr>`:be}
      </tbody>
    </table>
  `.trim(),r=I.some(a=>a.pinned);let b=O;r&&!O&&(b=!0);let p=V;if(te&&!he&&(p=!0),!he&&!te&&!p){const a=45+Se.length*45;a>600&&(p=!0,console.log("🔍 [RENDER] Habilitando scroll vertical automáticamente - altura estimada:",a,"px"))}let c;if(p||b){const a=[];p&&a.push("ubits-data-table__scrollable-container--vertical"),b&&a.push("ubits-data-table__scrollable-container--horizontal"),c=`<div class="ubits-data-table__scrollable-container ${a.join(" ")}">${f}</div>`}else c=f;const o=aa(e,D);let n;return he&&ve?n=`<div class="ubits-data-table__container">
      ${o}
      ${c}
      <div class="ubits-data-table__pagination-wrapper">${ve}</div>
    </div>`:o?n=`<div class="ubits-data-table__container">
        ${o}
        ${c}
      </div>`:n=c,n}function ta(e){const M=e.containerId?document.getElementById(e.containerId):document.body;if(!M)throw new Error(`Container with id "${e.containerId}" not found`);const Q=M.querySelector(".ubits-data-table"),D=M.querySelector(".ubits-data-table__scrollable-container");if(D){const J=D.querySelector(".ubits-data-table");if(J){const H=J;if(H._dataTableInstance)try{const K=H._dataTableInstance;K&&typeof K.destroy=="function"&&K.destroy()}catch(K){console.warn("Error destroying previous table instance:",K)}}D.remove()}else if(Q){const B=Q;if(B._dataTableInstance)try{const J=B._dataTableInstance;J&&typeof J.destroy=="function"&&J.destroy()}catch(J){console.warn("Error destroying previous table instance:",J)}Q.remove()}const U=e.lazyLoad!==!1&&!e.showPagination?e.lazyLoadItemsPerBatch||10:void 0,x={...e,__lazyLoadCurrentItems:U},k=ze(x),j=document.createElement("div");j.innerHTML=k.trim();const u=j.firstElementChild;if(!u)throw new Error("Failed to create data table 3 element");M.appendChild(u);const $=B=>{const J=new Set,H=[];for(const K of B)J.has(K.id)?console.log("🔍 [CREATE DATA TABLE] ⚠️ COLUMNA DUPLICADA ELIMINADA al inicializar:",K.id,K.title):(J.add(K.id),H.push({...K}));return H.length!==B.length&&console.log("🔍 [CREATE DATA TABLE] Columnas duplicadas eliminadas:",B.length,"->",H.length),H};let t={...e,columns:$(e.columns)},X=t.columns.filter(B=>B.visible!==!1).map(B=>B.id),V=t.rows.map(B=>B.id),O=null,re=null,he=null,Ee=null,oe="",ce=!1,Ce=null,le={},Z=null;const ee=(B,J,H)=>{if(!J||J.trim()==="")return B;const K=J.toLowerCase().trim(),ve=H.filter(pe=>pe.visible!==!1);return B.filter(pe=>ve.some(Le=>{const ne=pe.data[Le.id];return ne==null?!1:String(ne).toLowerCase().includes(K)}))},me=(B,J,H)=>{const K=Object.entries(J).filter(([ve,pe])=>pe&&pe.trim()!=="");return K.length===0?B:B.filter(ve=>K.every(([pe,Le])=>{const ne=H.find(be=>be.id===pe);if(!ne){const be=t.header?.filterButton?.filters?.find(b=>b.id===pe);if(!be)return!0;const fe=be.columnId,C=ve.data[fe];if(C==null)return!1;const f=String(C).toLowerCase().trim(),r=Le.toLowerCase().trim();switch(be.type){case"text":return f.includes(r);case"select":return f===r;case"number":return f===r||parseFloat(f)===parseFloat(r);case"date":return f.includes(r);default:return f.includes(r)}}const ue=ve.data[ne.id];if(ue==null)return!1;const ie=String(ue).toLowerCase().trim(),W=Le.toLowerCase().trim();switch(ne.type||"text"){case"estado":return ie===W;case"fecha":return ie.includes(W);case"progreso":const be=parseFloat(ie),fe=parseFloat(W);return!isNaN(be)&&!isNaN(fe)&&be===fe;case"nombre":case"nombre-avatar":case"nombre-avatar-texto":case"correo":case"area":case"lider":case"pais":case"ciudad":default:return ie.includes(W)}}))},te=t.showPagination?!1:t.lazyLoad!==!1,ge=t.lazyLoadItemsPerBatch||10;let ae=ge,I=null;const xe=()=>{if(I){const H=u.querySelector(".ubits-data-table__scrollable-container");H&&H.removeEventListener("scroll",I),window.removeEventListener("scroll",I,!0),I=null}const B=u.querySelector(".ubits-data-table__scrollable-container"),J=()=>{const H=t.rows.length;if(ae>=H)return;let K,ve,pe;if(B)K=B.scrollTop,ve=B.scrollHeight,pe=B.clientHeight;else{K=window.scrollY||document.documentElement.scrollTop,ve=document.documentElement.scrollHeight,pe=window.innerHeight;const ue=u.getBoundingClientRect().bottom+K;if(K+pe>=ue-200){const W=Math.min(ae+ge,H);W>ae&&(ae=W,console.log("📦 [LAZY LOAD] Cargando más items:",ae,"de",H),t.onLazyLoad&&t.onLazyLoad(ae,H),G(!0))}return}if((K+pe)/ve>=.8){const ne=Math.min(ae+ge,H);ne>ae&&(ae=ne,console.log("📦 [LAZY LOAD] Cargando más items:",ae,"de",H),t.onLazyLoad&&t.onLazyLoad(ae,H),G(!0))}};B?(I=J,B.addEventListener("scroll",I,{passive:!0}),console.log("✅ [LAZY LOAD] Listener agregado al contenedor scrollable")):(console.warn("⚠️ [LAZY LOAD] No se encontró contenedor scrollable, esperando renderizado..."),setTimeout(()=>{const H=u.querySelector(".ubits-data-table__scrollable-container");H?(I=J,H.addEventListener("scroll",I,{passive:!0}),console.log("✅ [LAZY LOAD] Contenedor scrollable encontrado después de esperar")):console.error("❌ [LAZY LOAD] No se pudo encontrar contenedor scrollable. El lazy load requiere scroll vertical activo.")},100))},Ie=()=>{u.querySelectorAll("wa-icon").forEach(J=>{const H=J.nextElementSibling;H&&H.tagName==="I"&&(customElements.get("wa-icon")?(J.style.display="inline-block",J.style.width="12px",J.style.height="12px",J.style.opacity="1",H.style.display="none"):(J.style.display="none",H.style.display="inline-block",H.style.fontSize="12px",H.style.width="12px",H.style.height="12px"))})},G=(B=!1)=>{const J=`render-${Date.now()}-${Math.random().toString(36).substr(2,5)}`,K=(new Error().stack?.split(`
`)||[]).slice(1,5).join(`
`);console.log(`🔄 [RENDER] ========== INICIO RENDER [${J}] ==========`),console.log("🔄 [RENDER] Stack trace:",K),console.log("🔄 [RENDER] preserveScroll:",B);const ve=K.includes("SELECT ALL")||K.includes("selectAll"),pe=K.includes("CHECKBOX")||K.includes("checkbox"),Le=K.includes("HTMLInputElement")&&pe;(ve||Le)&&console.warn("🔄 [RENDER] ⚠️ RENDER LLAMADO DESDE SELECT ALL O CHECKBOX HANDLER - Esto puede causar el salto!",{isFromSelectAll:ve,isFromCheckbox:pe,isFromSelectAllHandler:Le,callerInfo:K.split(`
`).slice(0,3)});let ne=0,ue=0,ie=0,W=B;const Te=u.querySelector(".ubits-data-table__scrollable-container");if(Te){ne=Te.scrollTop,ue=Te.scrollHeight,ie=Te.clientHeight;const h=ue>ie;h&&!B&&(W=!0,console.log(`🔄 [RENDER] 📍 Contenido con scroll detectado (scrollHeight: ${ue}px > clientHeight: ${ie}px), preservando automáticamente para evitar salto`)),ne>0&&!B&&!W&&(W=!0,console.log(`🔄 [RENDER] 📍 Scroll activo detectado (${ne}px), preservando automáticamente para evitar salto`)),console.log("🔄 [RENDER] 📍 Scroll guardado:",{scrollTop:ne,scrollHeight:ue,clientHeight:ie,maxScroll:ue-ie,scrollPercentage:ue>ie?ne/(ue-ie)*100:0,shouldPreserve:W,hasScrollableContent:h})}else console.log("🔄 [RENDER] ⚠️ No se encontró scrollableContainer, no se puede preservar scroll");let be=t.rows;Object.keys(le).length>0&&(be=me(be,le,t.columns)),oe&&(be=ee(be,oe,t.columns));const fe={...t,rows:be,columns:t.columns.map(h=>{const S={...h};return h.pinned!==void 0&&(S.pinned=h.pinned),S}),sortColumnId:he,sortDirection:Ee,__lazyLoadCurrentItems:ae,header:t.header?{...t.header,displayedItems:t.header.displayedItems!==void 0&&!oe&&Object.keys(le).length===0?t.header.displayedItems:be.length,__isSearchActive:ce,__searchTerm:oe}:void 0};console.log("🔍 [RENDER] Eliminando columnas duplicadas antes de renderizar..."),console.log("🔍 [RENDER] Columnas ANTES de eliminar duplicados:",fe.columns.length),console.log("🔍 [RENDER] IDs de columnas:",fe.columns.map(h=>h.id));const C=new Set,f=fe.columns.filter(h=>C.has(h.id)?(console.log("🔍 [RENDER] ⚠️ COLUMNA DUPLICADA ELIMINADA:",h.id,h.title),!1):(C.add(h.id),!0));console.log("🔍 [RENDER] Columnas DESPUÉS de eliminar duplicados:",f.length),console.log("🔍 [RENDER] IDs únicos:",Array.from(C)),fe.columns=f,console.log("🔍 [DATA TABLE] Renderizando:",{displayedItems:fe.header?.displayedItems,totalItems:fe.header?.totalItems,filteredRows:be.length,hasSearch:!!oe,hasFilters:Object.keys(le).length>0,uniqueColumnsCount:f.length});const r=ze(fe,X,V,le);console.log("🔄 [RENDER] HTML generado, longitud:",r.length),console.log("🔄 [RENDER] Reemplazando innerHTML del elemento (esto causa el brinco)..."),console.log("🔄 [RENDER] 📍 Estado ANTES de innerHTML:",{scrollTop:ne,scrollHeight:ue,clientHeight:ie,shouldPreserve:W});const b=performance.now();u.innerHTML=r.trim();const p=performance.now();if(console.log(`🔄 [RENDER] innerHTML reemplazado en ${(p-b).toFixed(2)}ms`),console.log("🔄 [RENDER] 📍 innerHTML reemplazado, ahora restaurando scroll..."),t.header?.searchButton&&t.header?.showSearchButton!==!1){const h=u.querySelector(".ubits-data-table__header-search-button");if(h){if(Ce)try{Ce.destroy()}catch{}if(!t.header?.searchButton)console.warn("🔍 [DATA TABLE] searchButton no está definido, saltando creación del componente");else{const S=document.createElement("div");S.style.display="none",document.body.appendChild(S),S.id="temp-search-button-container-"+Date.now(),Ce=We({containerId:S.id,active:ce,size:"sm",state:ce?"active":"default",disabled:t.header.searchButton.disabled||!1,placeholder:t.header.searchButton.placeholder||"Buscar...",value:oe,width:248,className:"ubits-data-table__header-search-button",onChange:L=>{const i=L.target.value;if(oe=i,t.header.searchButton.onChange&&t.header.searchButton.onChange(i),G(),t.header.searchButton.onSearch){const l=ee(t.rows,i,t.columns);console.log("🔍 [SEARCH] onSearch callback ejecutado desde SearchButton onChange:",{searchTerm:i,filteredRowsCount:l.length,componentId:t.containerId}),t.header.searchButton.onSearch(i,l)}},onClick:L=>{L.stopPropagation(),L.preventDefault(),ce=!0,t.header.searchButton.onClick&&t.header.searchButton.onClick(L),G(),setTimeout(()=>{const i=Ce?.element.querySelector(".ubits-search-button__input");i&&i.focus()},150)},onBlur:L=>{const i=L.target;setTimeout(()=>{if(!i.value.trim()&&document.activeElement!==i){const l=Ce?.element.querySelector(".ubits-search-button__clear");document.activeElement!==l&&(ce=!1,G())}},200)}});const y=Ce.element;h.parentNode?.replaceChild(y,h),ce&&y.style.width&&(console.log("🔍 [DATA TABLE] Removiendo width inline:",y.style.width),y.style.width=""),document.body.removeChild(S)}setTimeout(()=>{const S=u.querySelector(".ubits-data-table__header-search-button.ubits-search-button--active"),y=S?.previousElementSibling;if(S&&y){const L=S.getBoundingClientRect(),i=y.getBoundingClientRect(),l=window.getComputedStyle(S),d=S.querySelector(".ubits-search-button__input-wrapper"),g=d?window.getComputedStyle(d):null,E={actualGap:L.left-i.right,expectedGap:8,difference:L.left-i.right-8,searchButton:{left:L.left,width:L.width,right:L.right,marginLeft:l.marginLeft,marginRight:l.marginRight,inlineWidth:S.style.width||"none",computedWidth:l.width},prevButton:{right:i.right,width:i.width},inputWrapper:{width:g?.width||"N/A",computedWidth:g?.width||"N/A"}};if(console.log("🔍 [DATA TABLE] Posicionamiento del SearchButton activo:",E),Math.abs(E.actualGap-8)>1){const _=L.width,q=E.actualGap,F=8,A=-(_-32-F);console.log("🔍 [DATA TABLE] Cálculo de margin-left:",{buttonWidth:32,inputWidth:_,currentGap:q,desiredGap:F,neededMarginLeft:A,currentMarginLeft:l.marginLeft})}}},100),console.log("🔍 [DATA TABLE] SearchButton componente completo integrado")}}console.log("🔄 [RENDER] Llamando attachEventListeners()..."),Pe(),console.log("🔄 [RENDER] attachEventListeners() completado"),Ie(),console.log(`🔄 [RENDER] ========== FIN RENDER [${J}] ==========`),t.showPagination&&setTimeout(()=>{R()},100),te&&!t.showPagination&&xe();const c=W||ue>0&&ie>0&&ue>ie;c?(console.log("🔄 [RENDER] 📍 Restaurando scroll después del render..."),requestAnimationFrame(()=>{const h=u.querySelector(".ubits-data-table__scrollable-container");if(h){const S=h.scrollHeight,y=h.clientHeight,L=S-y,i=ue-ie,l=i>0?ne/i:0;if(console.log("🔄 [RENDER] 📍 Cálculo de restauración de scroll:",{old:{scrollTop:ne,scrollHeight:ue,clientHeight:ie,maxScroll:i},new:{scrollHeight:S,clientHeight:y,maxScroll:L},scrollPercentage:(l*100).toFixed(2)+"%",newScrollTop:L>0?l*L:0}),L>0){const d=l*L;h.scrollTop=d,console.log("🔄 [RENDER] 📍 Scroll restaurado:",{anterior:ne,nuevo:d,diferencia:Math.abs(d-ne),restauradoCorrectamente:Math.abs(d-ne)<10})}else console.log("🔄 [RENDER] ⚠️ No hay scroll disponible (maxScroll <= 0), no se puede restaurar")}else console.log("🔄 [RENDER] ⚠️ No se encontró scrollableContainer después del render, no se puede restaurar scroll")})):console.log("🔄 [RENDER] 📍 No se restaura scroll:",{shouldPreserve:W,savedScrollHeight:ue,savedClientHeight:ie,tieneScroll:ue>ie,shouldRestore:c}),console.log("🎨 [HOVER DEBUG] ========== VERIFICANDO HOVER DE FILAS ==========");const o=u.querySelectorAll(".ubits-data-table__row");console.log("🎨 [HOVER DEBUG] Filas encontradas:",o.length);const n=u.querySelector(".ubits-data-table__table"),a=u.querySelector(".ubits-data-table__tbody"),s=u.querySelector(".ubits-data-table__scrollable-container"),m=u.querySelector(".ubits-data-table");if(console.log("📏 [HEIGHT DEBUG] ========== VERIFICANDO ALTURAS =========="),n&&console.log("📏 [HEIGHT DEBUG] table.scrollHeight:",n.scrollHeight,"table.clientHeight:",n.clientHeight,"table.offsetHeight:",n.offsetHeight),a&&console.log("📏 [HEIGHT DEBUG] tbody.scrollHeight:",a.scrollHeight,"tbody.clientHeight:",a.clientHeight,"tbody.offsetHeight:",a.offsetHeight),s&&(console.log("📏 [HEIGHT DEBUG] scrollableContainer.scrollHeight:",s.scrollHeight,"scrollableContainer.clientHeight:",s.clientHeight,"scrollableContainer.offsetHeight:",s.offsetHeight),console.log("📏 [HEIGHT DEBUG] scrollableContainer max-height:",window.getComputedStyle(s).maxHeight)),m&&(console.log("📏 [HEIGHT DEBUG] dataTableContainer.scrollHeight:",m.scrollHeight,"dataTableContainer.clientHeight:",m.clientHeight,"dataTableContainer.offsetHeight:",m.offsetHeight),console.log("📏 [HEIGHT DEBUG] dataTableContainer max-height:",window.getComputedStyle(m).maxHeight)),o.length>0){const h=o[0],S=o[1],y=o[o.length-1];console.log("📏 [HEIGHT DEBUG] ========== COMPARACIÓN DE FILAS ==========");const L=h.getBoundingClientRect(),i=S?S.getBoundingClientRect():null;y.getBoundingClientRect();const l=window.innerHeight;console.log("📏 [HEIGHT DEBUG] Primera fila (funciona):"),console.log("  - offsetTop:",h.offsetTop),console.log("  - offsetHeight:",h.offsetHeight),console.log("  - getBoundingClientRect:",{top:L.top,bottom:L.bottom,left:L.left,right:L.right,width:L.width,height:L.height,visibleInViewport:L.top>=0&&L.bottom<=l}),S&&i&&(console.log("📏 [HEIGHT DEBUG] Segunda fila (no funciona):"),console.log("  - offsetTop:",S.offsetTop),console.log("  - offsetHeight:",S.offsetHeight),console.log("  - getBoundingClientRect:",{top:i.top,bottom:i.bottom,left:i.left,right:i.right,width:i.width,height:i.height,visibleInViewport:i.top>=0&&i.bottom<=l,belowViewport:i.top>l,aboveViewport:i.bottom<0}),console.log("  - viewportHeight:",l),console.log("  - Diferencia con primera fila (offsetTop):",S.offsetTop-h.offsetTop),console.log("  - Diferencia con primera fila (getBoundingClientRect.top):",i.top-L.top)),console.log("📏 [HEIGHT DEBUG] Última fila:"),console.log("  - offsetTop:",y.offsetTop),console.log("  - offsetHeight:",y.offsetHeight),console.log("  - getBoundingClientRect:",y.getBoundingClientRect()),console.log("📏 [HEIGHT DEBUG] Altura total estimada (última fila offsetTop + offsetHeight):",y.offsetTop+y.offsetHeight),console.log("📏 [HEIGHT DEBUG] ========== FIN COMPARACIÓN ==========")}if(console.log("📏 [HEIGHT DEBUG] ========== FIN ALTURAS =========="),o.forEach((h,S)=>{if(S===0){const y=h.querySelectorAll("td");console.log("🎨 [HOVER DEBUG] Celdas en la primera fila:",y.length),y.forEach((L,i)=>{const l=L,d=Array.from(l.classList),g=window.getComputedStyle(l).backgroundColor;console.log(`🎨 [HOVER DEBUG] Celda ${i}:`,{classes:d,computedBackground:g,hasDragHandle:d.includes("ubits-data-table__cell--drag-handle"),hasExpand:d.includes("ubits-data-table__cell--expand"),hasCheckbox:d.includes("ubits-data-table__cell--checkbox"),hasControlsColumn:d.includes("ubits-data-table__controls-column"),hasCell:d.includes("ubits-data-table__cell")})})}}),o.length>0){const h=o[0];h.addEventListener("mouseenter",()=>{console.log("🎨 [HOVER DEBUG] ========== HOVER ENTRÓ EN FILA =========="),h.querySelectorAll("td").forEach((y,L)=>{const i=y,l=Array.from(i.classList),d=window.getComputedStyle(i).backgroundColor;console.log(`🎨 [HOVER DEBUG] Celda ${L} en hover:`,{classes:l,computedBackground:d,hasDragHandle:l.includes("ubits-data-table__cell--drag-handle"),hasExpand:l.includes("ubits-data-table__cell--expand")})})}),h.addEventListener("mouseleave",()=>{console.log("🎨 [HOVER DEBUG] ========== HOVER SALIÓ DE FILA ==========")})}u.querySelectorAll("input[data-column-checkbox-header]").forEach(h=>{const S=h,y=S.getAttribute("data-column-checkbox-header");if(y){const L=t.rows.length>0&&t.rows.every(d=>d.data[y]===!0),i=t.rows.some(d=>d.data[y]===!0),l=i&&!L;S.indeterminate=l,console.log("📋 [INDETERMINATE] Header checkbox",y,"- indeterminate:",l,"(allChecked:",L,"someChecked:",i,")")}});const R=()=>{try{console.log("📄 [SPACING] ========== VERIFICANDO ESPACIADO DEL PAGINADOR ==========");const h=u.closest(".ubits-data-table__container")||u.querySelector(".ubits-data-table__container");if(console.log("📄 [SPACING] Container encontrado:",!!h),h){const S=window.getComputedStyle(h);console.log("📄 [SPACING] Container estilos:"),console.log("  - display:",S.display),console.log("  - flexDirection:",S.flexDirection),console.log("  - gap:",S.gap);const y=h.querySelector(".ubits-data-table__scrollable-container")||h.querySelector(".ubits-data-table");console.log("📄 [SPACING] Table container encontrado:",!!y);const i=(y?.querySelector(".ubits-data-table__table")||y)?.querySelector(".ubits-data-table__row:last-child");if(console.log("📄 [SPACING] Última fila encontrada:",!!i),y){const d=window.getComputedStyle(y);if(console.log("📄 [SPACING] Table container estilos:"),console.log("  - marginBottom:",d.marginBottom),console.log("  - paddingBottom:",d.paddingBottom),console.log("  - borderBottom:",d.borderBottom),i){const g=i.getBoundingClientRect();console.log("📄 [SPACING] Última fila posición:"),console.log("  - bottom:",g.bottom)}}const l=h.querySelector(".ubits-data-table__pagination-wrapper");if(console.log("📄 [SPACING] Pagination wrapper encontrado:",!!l),l){const d=window.getComputedStyle(l);console.log("📄 [SPACING] Pagination wrapper estilos:"),console.log("  - marginTop:",d.marginTop),console.log("  - marginBottom:",d.marginBottom),console.log("  - paddingTop:",d.paddingTop),console.log("  - paddingBottom:",d.paddingBottom),console.log("  - borderTop:",d.borderTop);const g=l.getBoundingClientRect();if(console.log("📄 [SPACING] Pagination wrapper posición:"),console.log("  - top:",g.top),i){const E=i.getBoundingClientRect(),T=g.top-E.bottom;console.log("📄 [SPACING] DISTANCIA CALCULADA:"),console.log("  - Última fila bottom:",E.bottom),console.log("  - Paginador top:",g.top),console.log("  - DISTANCIA:",T,"px"),console.log("  - Esperado: 16px")}else console.log("📄 [SPACING] ⚠️ No se pudo calcular distancia: última fila no encontrada")}else console.log("📄 [SPACING] ⚠️ Pagination wrapper NO encontrado")}else console.log("📄 [SPACING] ⚠️ Container NO encontrado");console.log("📄 [SPACING] ========== FIN VERIFICACIÓN ==========")}catch(h){console.error("📄 [SPACING] ❌ Error verificando espaciado:",h)}}},Pe=()=>{console.log("📎 [ATTACH] ========== INICIO attachEventListeners =========="),typeof window<"u"&&window.location&&window.location.href.includes("storybook");try{t.columnReorderable&&(u.hasAttribute("data-column-drag-listener")||(u.setAttribute("data-column-drag-listener","true"),u.addEventListener("dragstart",C=>{const r=C.target.closest(".ubits-data-table__column-drag-handle");if(r&&(O=r.getAttribute("data-column-id"),O)){C.dataTransfer.effectAllowed="move",C.dataTransfer.setData("text/plain",O);const b=r.closest(".ubits-data-table__column-header");b&&b.classList.add("ubits-data-table__column-header--dragging")}},!0),u.addEventListener("dragend",C=>{const r=C.target.closest(".ubits-data-table__column-drag-handle");if(r){const b=r.closest(".ubits-data-table__column-header");b&&b.classList.remove("ubits-data-table__column-header--dragging")}O=null},!0),u.addEventListener("dragover",C=>{const r=C.target.closest(".ubits-data-table__column-header");if(r&&O){const b=r.getAttribute("data-column-id");if(b&&b!==O){const p=b==="checkbox"||b.startsWith("checkbox-"),c=O==="checkbox"||O.startsWith("checkbox-");if(p)return;if(!c){const o=X.findIndex(n=>n==="checkbox"||n.startsWith("checkbox-"));if(o!==-1&&X.indexOf(b)<o)return}C.preventDefault(),C.dataTransfer.dropEffect="move",r.classList.add("ubits-data-table__column-header--drag-over")}}},!0),u.addEventListener("dragleave",C=>{const r=C.target.closest(".ubits-data-table__column-header");r&&r.classList.remove("ubits-data-table__column-header--drag-over")},!0),u.addEventListener("drop",C=>{const r=C.target.closest(".ubits-data-table__column-header");if(r){C.preventDefault(),r.classList.remove("ubits-data-table__column-header--drag-over");const b=r.getAttribute("data-column-id");if(!b||!O)return;const p=O==="checkbox"||O.startsWith("checkbox-"),c=b==="checkbox"||b.startsWith("checkbox-");if(p||c)return;if(O!==b){const o=X.indexOf(O),n=X.indexOf(b),a=X.findIndex(s=>s==="checkbox"||s.startsWith("checkbox-"));if(a===-1){o!==-1&&n!==-1&&(X.splice(o,1),X.splice(n,0,O),t.onColumnReorder&&t.onColumnReorder([...X]),G());return}if(n<a||o>a&&n<a)return;if(o!==-1&&n!==-1){const s=[...X];s.splice(o,1),s.splice(n,0,O);const m=s.findIndex(w=>w==="checkbox"||w.startsWith("checkbox-"));if(m!==-1&&m<a)return;X=s,t.onColumnReorder&&t.onColumnReorder([...X]),G()}}}},!0))),t.rowReorderable&&(u.hasAttribute("data-row-drag-listener")||(u.setAttribute("data-row-drag-listener","true"),u.addEventListener("dragstart",C=>{const r=C.target.closest(".ubits-data-table__row-drag-handle");if(!r)return;const b=r.getAttribute("data-row-id");if(b){const p=isNaN(Number(b))?b:Number(b);re=p,C.dataTransfer.effectAllowed="move",C.dataTransfer.setData("text/plain",String(p));const c=r.closest(".ubits-data-table__row");c&&c.classList.add("ubits-data-table__row--dragging")}},!0),u.addEventListener("dragend",C=>{const r=C.target.closest(".ubits-data-table__row-drag-handle");if(r){const b=r.closest(".ubits-data-table__row");b&&b.classList.remove("ubits-data-table__row--dragging")}re=null},!0),u.addEventListener("dragover",C=>{const r=C.target.closest(".ubits-data-table__row");if(r&&re!==null){const b=r.getAttribute("data-row-id");b&&(isNaN(Number(b))?b:Number(b))!==re&&(C.preventDefault(),C.dataTransfer.dropEffect="move",r.classList.add("ubits-data-table__row--drag-over"))}},!0),u.addEventListener("dragleave",C=>{const r=C.target.closest(".ubits-data-table__row");r&&r.classList.remove("ubits-data-table__row--drag-over")},!0),u.addEventListener("drop",C=>{const r=C.target.closest(".ubits-data-table__row");if(r){C.preventDefault(),r.classList.remove("ubits-data-table__row--drag-over");const b=r.getAttribute("data-row-id");if(!b||!re)return;const p=isNaN(Number(b))?b:Number(b),c=C.dataTransfer.getData("text/plain");if(c&&String(p)!==c){const o=isNaN(Number(c))?c:Number(c),n=V.indexOf(o),a=V.indexOf(p);n!==-1&&a!==-1&&(V.splice(n,1),V.splice(a,0,o),t.onRowReorder&&t.onRowReorder([...V]),G())}}},!0)));let B=!1;const J=u.querySelectorAll("input[data-column-checkbox-header]");console.log(`☑️ [SELECT ALL] Header checkboxes encontrados: ${J.length}`),J.forEach((C,f)=>{const r=C,b=r.getAttribute("data-column-checkbox-header");console.log(`☑️ [SELECT ALL] Configurando header checkbox ${f}: columnId=${b}`);const p=r.cloneNode(!0);p.checked=r.checked,b&&p.setAttribute("data-column-checkbox-header",b),Array.from(r.attributes).forEach(n=>{(n.name!=="data-column-checkbox-header"||!p.hasAttribute(n.name))&&p.setAttribute(n.name,n.value)}),r.parentNode?.replaceChild(p,r),console.log("☑️ [SELECT ALL] Checkbox clonado y reemplazado:",{columnId:b,hasHeaderAttr:p.hasAttribute("data-column-checkbox-header"),checked:p.checked,allAttributes:Array.from(p.attributes).map(n=>`${n.name}="${n.value}"`)}),console.log(`☑️ [SELECT ALL] Listener adjuntado al header checkbox ${f}`,{columnId:b,checkbox:p,hasHeaderAttr:p.hasAttribute("data-column-checkbox-header"),hasColumnId:p.hasAttribute("data-column-id"),hasRowId:p.hasAttribute("data-row-id"),allAttributes:Array.from(p.attributes).map(n=>`${n.name}="${n.value}"`)}),console.log(`☑️ [SELECT ALL] 🔧 Agregando listener con capture:true al checkbox ${f}`),console.log("☑️ [SELECT ALL] 🔍 Estado del checkbox ANTES de agregar listener:",{element:p,isConnected:p.isConnected,hasHeaderAttr:p.hasAttribute("data-column-checkbox-header"),checked:p.checked,parentElement:p.parentElement?.tagName,allAttrs:Array.from(p.attributes).map(n=>`${n.name}="${n.value}"`)});const c=n=>{console.log("☑️ [SELECT ALL] ========== SELECT ALL CAMBIÓ =========="),console.log(`☑️ [SELECT ALL] 🎯 HANDLER EJECUTÁNDOSE - timestamp: ${Date.now()}`),console.log("☑️ [SELECT ALL] 🔍 EVENTO RECIBIDO:",{eventPhase:n.eventPhase,bubbles:n.bubbles,cancelable:n.cancelable,defaultPrevented:n.defaultPrevented,isTrusted:n.isTrusted,timeStamp:n.timeStamp,target:n.target,currentTarget:n.currentTarget,targetType:n.target.tagName,targetId:n.target.id,targetClassName:n.target.className,targetHasHeaderAttr:n.target.hasAttribute("data-column-checkbox-header"),currentTargetHasHeaderAttr:n.currentTarget.hasAttribute("data-column-checkbox-header"),targetAllAttrs:Array.from(n.target.attributes).map(y=>`${y.name}="${y.value}"`),currentTargetAllAttrs:Array.from(n.currentTarget.attributes).map(y=>`${y.name}="${y.value}"`)}),n.stopPropagation(),n.stopImmediatePropagation();const a=n.target;if(!a.hasAttribute("data-column-checkbox-header")){console.log("☑️ [SELECT ALL] ⚠️ El input NO tiene data-column-checkbox-header, ignorando...",{input:a,allAttributes:Array.from(a.attributes).map(y=>`${y.name}="${y.value}"`)});return}const s=a.getAttribute("data-column-checkbox-header"),m=a.checked;console.log(`☑️ [SELECT ALL] columnId: ${s}, checked: ${m}`,{input:a,hasHeaderAttr:a.hasAttribute("data-column-checkbox-header"),hasColumnId:a.hasAttribute("data-column-id"),hasRowId:a.hasAttribute("data-row-id"),allAttributes:Array.from(a.attributes).map(y=>`${y.name}="${y.value}"`),eventPhase:n.eventPhase,bubbles:n.bubbles,cancelable:n.cancelable,defaultPrevented:n.defaultPrevented}),console.log("☑️ [SELECT ALL] ✅ Propagación ya detenida (se detuvo al inicio del handler)");const w=u.querySelector(".ubits-data-table__scrollable-container");let R=0,h=0,S=0;if(w?(R=w.scrollTop,h=w.scrollHeight,S=w.clientHeight,console.log("☑️ [SELECT ALL] 📍 Scroll ANTES de actualizar checkboxes:",{scrollTop:R,scrollHeight:h,clientHeight:S,maxScroll:h-S})):console.log("☑️ [SELECT ALL] ⚠️ No se encontró scrollableContainer antes de actualizar"),t.rows.forEach(y=>{y.data[s]=m}),console.log(`☑️ [SELECT ALL] Estado de todas las filas actualizado (${t.rows.length} filas)`),s==="checkbox-2"){const y=u.querySelectorAll(`input[data-column-id="${s}"][data-row-id]`);console.log(`☑️ [SELECT ALL] Checkboxes visibles encontrados: ${y.length}`),B=!0,console.log("☑️ [SELECT ALL] 🚩 Bandera isSelectAllInProgress activada"),y.forEach(A=>{const P=A,v=P.getAttribute("data-row-id");if(v){const Y=isNaN(Number(v))?v:Number(v),N=t.rows.find(ye=>ye.id===Y);N&&(N.data[s]=m),P.checked=m;const z=P.closest(".ubits-checkbox");if(z){const ye=z.querySelector(".ubits-checkbox__square");if(m){if(z.classList.add("ubits-checkbox--checked"),z.classList.remove("ubits-checkbox--indeterminate"),ye){const Ae=ye.querySelector(".ubits-checkbox__indeterminate");Ae&&Ae.remove();let se=ye.querySelector(".ubits-checkbox__checkmark");se||(se=document.createElement("span"),se.className="ubits-checkbox__checkmark",ye.appendChild(se));const Be=se.style.transition;se.style.transition="none",se.style.setProperty("opacity","1","important"),se.style.setProperty("transform","scale(1)","important"),se.style.setProperty("display","flex","important"),window.getComputedStyle(se).opacity,window.getComputedStyle(se).transform,window.getComputedStyle(se).display,se.offsetHeight,ye.offsetHeight,z.offsetHeight,setTimeout(()=>{se.style.transition=Be||""},0)}}else if(z.classList.remove("ubits-checkbox--checked"),z.classList.remove("ubits-checkbox--indeterminate"),ye){const Ae=ye.querySelector(".ubits-checkbox__checkmark");Ae&&Ae.remove();const se=ye.querySelector(".ubits-checkbox__indeterminate");se&&se.remove()}}}});const L=t.rows.length>0&&t.rows.every(A=>A.data[s]===!0),l=t.rows.some(A=>A.data[s]===!0)&&!L,d=a;d.checked=L,d.indeterminate=l;const g=d.closest(".ubits-checkbox");if(g){const A=g.querySelector(".ubits-checkbox__square");if(L){if(g.classList.add("ubits-checkbox--checked"),g.classList.remove("ubits-checkbox--indeterminate"),A){const P=A.querySelector(".ubits-checkbox__indeterminate");P&&P.remove(),g.classList.add("ubits-checkbox--checked"),g.offsetHeight;let v=A.querySelector(".ubits-checkbox__checkmark");v||(v=document.createElement("span"),v.className="ubits-checkbox__checkmark",A.appendChild(v));const Y=v.style.transition;v.style.transition="none",v.style.setProperty("opacity","1","important"),v.style.setProperty("transform","scale(1)","important"),v.style.setProperty("display","flex","important"),window.getComputedStyle(v).opacity,window.getComputedStyle(v).transform,window.getComputedStyle(v).display,v.offsetHeight,A.offsetHeight,g.offsetHeight,setTimeout(()=>{v.style.transition=Y||""},0)}}else if(l){if(g.classList.remove("ubits-checkbox--checked"),g.classList.add("ubits-checkbox--indeterminate"),A){const P=A.querySelector(".ubits-checkbox__checkmark");P&&P.remove();let v=A.querySelector(".ubits-checkbox__indeterminate");v||(v=document.createElement("span"),v.className="ubits-checkbox__indeterminate",A.appendChild(v)),v.style.setProperty("opacity","1","important"),v.style.setProperty("transform","scale(1)","important"),v.style.setProperty("display","flex","important")}}else if(g.classList.remove("ubits-checkbox--checked"),g.classList.remove("ubits-checkbox--indeterminate"),A){const P=A.querySelector(".ubits-checkbox__checkmark");P&&P.remove();const v=A.querySelector(".ubits-checkbox__indeterminate");v&&v.remove()}g.offsetHeight}u.offsetHeight,console.log(`☑️ [SELECT ALL] ✅ Checkboxes visibles actualizados - allChecked: ${L}, indeterminate: ${l}`),B=!1,console.log("☑️ [SELECT ALL] 🚩 Bandera isSelectAllInProgress desactivada");const E=t;if(E.onSelectAll){console.log("☑️ [SELECT ALL] 📞 Llamando onSelectAll callback..."),console.log("☑️ [SELECT ALL] 📞 Stack trace antes de llamar callback:",new Error().stack?.split(`
`).slice(1,5).join(`
`));const A=u.querySelector(".ubits-data-table__scrollable-container"),P=A?.scrollTop||0,v=A?.scrollHeight||0,Y=A?.clientHeight||0;console.log("☑️ [SELECT ALL] 📍 Scroll ANTES de onSelectAll callback:",{scrollTop:P,scrollHeight:v,clientHeight:Y,maxScroll:v-Y}),console.log("☑️ [SELECT ALL] 🔍 Verificando si hay renders pendientes...");try{E.onSelectAll(m),console.log("☑️ [SELECT ALL] ✅ onSelectAll callback completado sin errores")}catch(ke){console.error("☑️ [SELECT ALL] ❌ Error en onSelectAll callback:",ke)}const N=u.querySelector(".ubits-data-table__scrollable-container"),z=N?.scrollTop||0,ye=N?.scrollHeight||0,Ae=N?.clientHeight||0;console.log("☑️ [SELECT ALL] 📍 Scroll DESPUÉS de onSelectAll callback:",{scrollTop:z,scrollHeight:ye,clientHeight:Ae,maxScroll:ye-Ae});const se=Math.abs(z-P)>1,Be=Math.abs(ye-v)>1||Math.abs(Ae-Y)>1;se||Be?(console.warn("☑️ [SELECT ALL] ⚠️ El callback onSelectAll parece haber causado cambios:",{scrollCambió:se,scrollAntes:P,scrollDespues:z,diferenciaScroll:z-P,dimensionesCambiaron:Be,scrollHeightAntes:v,scrollHeightDespues:ye,clientHeightAntes:Y,clientHeightDespues:Ae}),se&&R>0&&N&&(console.log(`☑️ [SELECT ALL] 🔧 Intentando restaurar scroll a posición original: ${R}px`),N.scrollTop=R,setTimeout(()=>{const ke=N.scrollTop;console.log("☑️ [SELECT ALL] 📍 Scroll después de restaurar:",{original:R,restaurado:ke,diferencia:Math.abs(ke-R),restauradoCorrectamente:Math.abs(ke-R)<5})},50))):console.log("☑️ [SELECT ALL] ✅ El callback onSelectAll NO causó cambios visibles en el scroll")}console.log("☑️ [SELECT ALL] ✅ Optimizado: NO se llama render() - sin brinco");const T=u.querySelector(".ubits-data-table__scrollable-container"),_=T?.scrollTop||0,q=T?.scrollHeight||0,F=T?.clientHeight||0;console.log("☑️ [SELECT ALL] 📍 Scroll FINAL después de todas las actualizaciones:",{scrollTop:_,scrollHeight:q,clientHeight:F,maxScroll:q-F,comparaciónConInicial:{scrollTopInicial:R,scrollTopFinal:_,diferencia:Math.abs(_-R),seMantuvo:Math.abs(_-R)<5}})}else console.log("☑️ [SELECT ALL] ⚠️ Llamando render() - esto causará el brinco"),G();console.log("☑️ [SELECT ALL] ========== FIN ==========")};p.addEventListener("change",c,{capture:!0}),console.log("☑️ [SELECT ALL] ✅ Listener 'change' agregado con capture:true - handler function:",c);const o=n=>{console.log(`☑️ [SELECT ALL] 🖱️ CLICK recibido en header checkbox ${f} - timestamp: ${Date.now()}`);const a=n.target;console.log("☑️ [SELECT ALL] 🖱️ Click handler - checkbox estado:",{hasHeaderAttr:a.hasAttribute("data-column-checkbox-header"),checked:a.checked,allAttrs:Array.from(a.attributes).map(s=>`${s.name}="${s.value}"`)})};p.addEventListener("click",o,{capture:!0}),console.log("☑️ [SELECT ALL] ✅ Listener 'click' agregado con capture:true para debugging"),console.log("☑️ [SELECT ALL] 🔍 Estado del checkbox DESPUÉS de agregar listeners:",{element:p,isConnected:p.isConnected,hasHeaderAttr:p.hasAttribute("data-column-checkbox-header"),checked:p.checked,parentElement:p.parentElement?.tagName})}),u.querySelectorAll("input[data-column-id]:not([data-column-checkbox-header])").forEach(C=>{const f=C,r=f.getAttribute("data-row-id"),b=f.getAttribute("data-column-id"),p=f.cloneNode(!0);p.checked=f.checked,f.parentNode?.replaceChild(p,f),console.log(`☑️ [CHECKBOX] 🔧 Agregando listener con capture:false al checkbox rowId=${r} columnId=${b}`);const c=o=>{const n=o.target;if(n.hasAttribute("data-column-checkbox-header")){console.log("☑️ [CHECKBOX] 🚫 BLOQUEADO: Este es un checkbox del header, NO debería ejecutarse este handler!",{hasHeaderAttr:n.hasAttribute("data-column-checkbox-header"),hasColumnId:n.hasAttribute("data-column-id"),hasRowId:n.hasAttribute("data-row-id"),allAttributes:Array.from(n.attributes).map(h=>`${h.name}="${h.value}"`),eventPhase:o.eventPhase,bubbles:o.bubbles,cancelable:o.cancelable,defaultPrevented:o.defaultPrevented,target:o.target,currentTarget:o.currentTarget,stackTrace:new Error().stack?.split(`
`).slice(1,8).join(`
`)}),o.stopPropagation(),o.stopImmediatePropagation();return}if(console.log("☑️ [CHECKBOX] ========== CHECKBOX INDIVIDUAL EVENTO =========="),console.log(`☑️ [CHECKBOX] 🎯 HANDLER EJECUTÁNDOSE - timestamp: ${Date.now()}`),console.log("☑️ [CHECKBOX] 🔍 EVENTO RECIBIDO EN HANDLER INDIVIDUAL:",{rowId:r,columnId:b,hasHeaderAttr:n.hasAttribute("data-column-checkbox-header"),hasRowId:n.hasAttribute("data-row-id"),hasColumnId:n.hasAttribute("data-column-id"),eventPhase:o.eventPhase,defaultPrevented:o.defaultPrevented,isTrusted:o.isTrusted,timeStamp:o.timeStamp,isSelectAllInProgress:B,target:o.target,currentTarget:o.currentTarget,targetAllAttrs:Array.from(n.attributes).map(h=>`${h.name}="${h.value}"`),stackTrace:new Error().stack?.split(`
`).slice(1,5).join(`
`)}),B){console.log("☑️ [CHECKBOX] ⏭️ Ignorando evento - select all en progreso");return}const a=n.getAttribute("data-row-id"),s=n.getAttribute("data-column-id");if(!a||!s){console.log("☑️ [CHECKBOX] ⚠️ Ignorando checkbox sin data-row-id o data-column-id (probablemente header checkbox)",{hasRowId:!!a,hasColumnId:!!s,hasHeaderAttr:n.hasAttribute("data-column-checkbox-header"),allAttributes:Array.from(n.attributes).map(h=>`${h.name}="${h.value}"`)});return}console.log("☑️ [CHECKBOX] ========== CHECKBOX CAMBIÓ ==========");const m=isNaN(Number(a))?a:Number(a),w=n.checked;console.log(`☑️ [CHECKBOX] rowId: ${m}, columnId: ${s}, checked: ${w}`),console.log(`☑️ [CHECKBOX] Checkbox visual checked: ${n.checked}`),console.log("☑️ [CHECKBOX] Input element:",n),console.log("☑️ [CHECKBOX] Input parent:",n.parentElement);const R=t.rows.find(h=>h.id===m);if(R)if(R.data[s]=w,console.log("☑️ [CHECKBOX] Estado de fila actualizado"),s==="checkbox-2"){let h=n.closest(".ubits-checkbox");if(console.log("☑️ [CHECKBOX] checkboxContainer encontrado (closest):",h),h){const y=h.querySelector(`input[data-row-id="${m}"][data-column-id="${s}"]`);if(!y||y!==n){console.log("☑️ [CHECKBOX] ⚠️ checkboxContainer no coincide, buscando por data-row-id...");const L=u.querySelector(`input[data-row-id="${m}"][data-column-id="${s}"]`);L&&(h=L.closest(".ubits-checkbox"),console.log("☑️ [CHECKBOX] checkboxContainer encontrado (por data-row-id):",h))}else console.log("☑️ [CHECKBOX] ✅ checkboxContainer validado correctamente")}if(h){const y=h.querySelector(".ubits-checkbox__square");if(console.log("☑️ [CHECKBOX] checkboxSquare encontrado:",y),console.log("☑️ [CHECKBOX] checkboxContainer classes:",h.className),w)if(h.classList.add("ubits-checkbox--checked"),h.classList.remove("ubits-checkbox--indeterminate"),console.log("☑️ [CHECKBOX] Clases agregadas: checked"),y){const L=y.querySelector(".ubits-checkbox__indeterminate");L&&(L.remove(),console.log("☑️ [CHECKBOX] Indeterminate removido")),h.classList.add("ubits-checkbox--checked"),h.classList.remove("ubits-checkbox--indeterminate"),h.offsetHeight;let i=y.querySelector(".ubits-checkbox__checkmark");i?console.log("☑️ [CHECKBOX] ✅ Checkmark ya existe, reutilizando"):(i=document.createElement("span"),i.className="ubits-checkbox__checkmark",y.appendChild(i),console.log("☑️ [CHECKBOX] ✅ Checkmark creado y agregado al DOM"));const l=i.style.transition;i.style.transition="none",i.style.setProperty("opacity","1","important"),i.style.setProperty("transform","scale(1)","important"),i.style.setProperty("display","flex","important"),console.log("☑️ [CHECKBOX] Estilos forzados directamente con !important"),window.getComputedStyle(i).opacity,window.getComputedStyle(i).transform,window.getComputedStyle(i).display,i.offsetHeight,y.offsetHeight,h.offsetHeight,setTimeout(()=>{i.style.transition=l||""},0),requestAnimationFrame(()=>{const d=y.querySelector(".ubits-checkbox__checkmark");if(d){const g=window.getComputedStyle(d);console.log("☑️ [CHECKBOX] Verificación checkmark en DOM (después de RAF):",d),console.log(`☑️ [CHECKBOX] Checkmark opacity (computed): ${g.opacity}, transform (computed): ${g.transform}`),console.log(`☑️ [CHECKBOX] Checkmark display: ${g.display}`),console.log(`☑️ [CHECKBOX] Checkmark width: ${g.width}, height: ${g.height}`);const E=window.getComputedStyle(d,"::after");console.log(`☑️ [CHECKBOX] Checkmark ::after content: ${E.content}, display: ${E.display}`),(g.opacity==="0"||g.transform.includes("scale(0)"))&&(console.log("☑️ [CHECKBOX] ⚠️ CSS no aplicado correctamente después de forzar, reintentando..."),d.style.setProperty("opacity","1","important"),d.style.setProperty("transform","scale(1)","important"),d.style.setProperty("display","flex","important"),d.offsetHeight)}else console.log("☑️ [CHECKBOX] ⚠️ Checkmark no encontrado después de crearlo")})}else console.log("☑️ [CHECKBOX] ⚠️ checkboxSquare no encontrado");else if(h.classList.remove("ubits-checkbox--checked"),h.classList.remove("ubits-checkbox--indeterminate"),console.log("☑️ [CHECKBOX] Clases removidas: checked"),y){const L=y.querySelector(".ubits-checkbox__checkmark");L&&(L.remove(),console.log("☑️ [CHECKBOX] Checkmark removido"));const i=y.querySelector(".ubits-checkbox__indeterminate");i&&i.remove()}console.log("☑️ [CHECKBOX] ✅ Clase CSS del contenedor y checkmark actualizados")}else{console.log("☑️ [CHECKBOX] ⚠️ checkboxContainer no encontrado usando closest");const y=u.querySelectorAll(`input[data-row-id="${m}"][data-column-id="${b}"]`);if(console.log("☑️ [CHECKBOX] Checkboxes encontrados por data-row-id:",y.length),y.length>0){const i=(Array.from(y).find(l=>l===n)||y[0])?.closest(".ubits-checkbox");if(console.log("☑️ [CHECKBOX] Checkbox correcto encontrado:",i),i){const l=i.querySelector(".ubits-checkbox__square");if(w){if(i.classList.add("ubits-checkbox--checked"),i.classList.remove("ubits-checkbox--indeterminate"),l){const d=l.querySelector(".ubits-checkbox__indeterminate");d&&d.remove();let g=l.querySelector(".ubits-checkbox__checkmark");g||(g=document.createElement("span"),g.className="ubits-checkbox__checkmark",l.appendChild(g),console.log("☑️ [CHECKBOX] ✅ Checkmark creado (fallback)"))}}else if(i.classList.remove("ubits-checkbox--checked"),i.classList.remove("ubits-checkbox--indeterminate"),l){const d=l.querySelector(".ubits-checkbox__checkmark");d&&d.remove()}}}}const S=u.querySelector(`input[data-column-checkbox-header="${b}"]`);if(S){const y=t.rows.length>0&&t.rows.every(d=>d.data[b]===!0),i=t.rows.some(d=>d.data[b]===!0)&&!y;S.checked=y,S.indeterminate=i;const l=S.closest(".ubits-checkbox");if(l){const d=l.querySelector(".ubits-checkbox__square");if(y){if(l.classList.add("ubits-checkbox--checked"),l.classList.remove("ubits-checkbox--indeterminate"),d){const g=d.querySelector(".ubits-checkbox__indeterminate");g&&g.remove();let E=d.querySelector(".ubits-checkbox__checkmark");E||(E=document.createElement("span"),E.className="ubits-checkbox__checkmark",d.appendChild(E))}}else if(i){if(l.classList.remove("ubits-checkbox--checked"),l.classList.add("ubits-checkbox--indeterminate"),d){const g=d.querySelector(".ubits-checkbox__checkmark");g&&g.remove();let E=d.querySelector(".ubits-checkbox__indeterminate");E||(E=document.createElement("span"),E.className="ubits-checkbox__indeterminate",d.appendChild(E))}}else if(l.classList.remove("ubits-checkbox--checked"),l.classList.remove("ubits-checkbox--indeterminate"),d){const g=d.querySelector(".ubits-checkbox__checkmark");g&&g.remove();const E=d.querySelector(".ubits-checkbox__indeterminate");E&&E.remove()}}console.log(`☑️ [CHECKBOX] ✅ Header checkbox actualizado - allChecked: ${y}, indeterminate: ${i}`)}t.onRowSelect&&(console.log("☑️ [CHECKBOX] Llamando onRowSelect..."),t.onRowSelect(m,w),console.log("☑️ [CHECKBOX] onRowSelect completado")),console.log("☑️ [CHECKBOX] ✅ Optimizado: NO se llama render() - sin brinco")}else console.log("☑️ [CHECKBOX] ⚠️ Llamando render() - esto causará el brinco"),console.log(`☑️ [CHECKBOX] 🔍 RAZÓN: columnId="${s}" NO es checkbox-2, llamando render() desde handler individual`),console.log("☑️ [CHECKBOX] 🔍 Stack trace antes de render():",new Error().stack?.split(`
`).slice(1,6).join(`
`)),G();console.log("☑️ [CHECKBOX] ========== FIN ==========")};p.addEventListener("change",c,{capture:!1}),console.log("☑️ [CHECKBOX] ✅ Listener agregado con capture:false - handler function:",c)});const K=u.querySelectorAll('[data-expand-button="true"]');console.log("🔘 [EXPAND] Botones de expandir encontrados:",K.length),K.forEach((C,f)=>{const r=C.cloneNode(!0);C.parentNode?.replaceChild(r,C),r.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();const p=r.getAttribute("data-row-id"),c=isNaN(Number(p))?p:Number(p);console.log("🔘 [EXPAND] Click en botón de expandir - rowId:",c);const o=t.rows.find(n=>n.id===c);if(o){const n=o.expanded||!1;o.expanded=!n,console.log("🔘 [EXPAND] Fila encontrada - wasExpanded:",n,"-> expanded:",o.expanded),console.log("🔘 [EXPAND] Fila tiene renderExpandedContent:",!!o.renderExpandedContent),t.onRowExpand&&t.onRowExpand(c,o.expanded),console.log("🔘 [EXPAND] Llamando render()..."),G(),console.log("🔘 [EXPAND] Render() completado"),o.expanded&&requestAnimationFrame(()=>{const a=u.querySelector(`[data-row-id="${c}"]`);if(a){const s=a.nextElementSibling;if(s&&s.classList.contains("ubits-data-table__row-expanded-row")){console.log("🔘 [EXPAND] Haciendo scroll para mostrar contenido expandido");const m=u.querySelector(".ubits-data-table__scrollable-container--vertical");if(m){const w=a.offsetTop;m.scrollTop=w-50,console.log("🔘 [EXPAND] Scroll aplicado - scrollTop:",m.scrollTop)}else a.scrollIntoView({behavior:"smooth",block:"nearest"}),console.log("🔘 [EXPAND] ScrollIntoView aplicado (sin contenedor scrollable)")}}})}else console.warn("🔘 [EXPAND] ⚠️ Fila no encontrada para rowId:",c)})}),u.querySelectorAll('[data-sort-button="true"]').forEach(C=>{C.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation();const r=C.getAttribute("data-column-id");he===r?Ee=Ee==="asc"?"desc":"asc":(he=r,Ee="asc"),t.onSort&&t.onSort(r,Ee),G()})}),u.querySelectorAll('[data-menu-button="true"]').forEach(C=>{const f=C,r=f.getAttribute("data-column-id");if(!r||!t.columns.find(h=>h.id===r))return;const p=f.closest("th");if(!p){console.warn("⚠️ [MENU BUTTON] No se encontró el header cell");return}const c=p.hasAttribute("data-pinned")&&p.getAttribute("data-pinned")==="true",o=p.classList.contains("ubits-data-table__column-header--pinned"),n=typeof window<"u"&&!window.location?.href?.includes("storybook");let a,s=null;if(c||o){const S=u.querySelector(".ubits-data-table")?.closest(".ubits-data-table__scrollable-container")||u;a=S.querySelector(`.ubits-data-table__column-menu-dropdown[data-column-id="${r}"]`),a||(a=document.createElement("div"),a.className="ubits-data-table__column-menu-dropdown",a.setAttribute("data-column-id",r),a.style.cssText=`
            position: fixed;
            z-index: 10000 !important;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `,S.appendChild(a))}else a=p.querySelector(".ubits-data-table__column-menu-dropdown"),a||(a=document.createElement("div"),a.className="ubits-data-table__column-menu-dropdown",a.setAttribute("data-column-id",r),a.style.cssText=`
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000 !important;
            margin-top: 4px;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `,p.style.position="relative",p.appendChild(a));let m=!1;const w=()=>{a&&(a.style.display="none"),m=!1,R&&(document.removeEventListener("click",R),R=null),(c||o)&&a.parentElement&&a.parentElement!==p&&a.remove()};let R=null;f.addEventListener("click",h=>{const S=typeof window<"u"&&window.location&&!window.location.href.includes("storybook");h.preventDefault(),h.stopPropagation();const y=t.columns.find(q=>q.id===r);if(!y){console.error("❌ [COLUMN MENU] Columna no encontrada:",r);return}const L=y.pinned||!1;if(m){w();return}u.querySelectorAll(".ubits-data-table__column-menu-dropdown").forEach(q=>{q!==a&&(q.style.display="none")});const i=[{label:L?"Desfijar columna":"Fijar columna",value:"pin",state:"default"}];a.innerHTML="";const l=`column-menu-list-${r}-${Math.random().toString(36).substr(2,9)}`;a.id=l;try{const q=He({containerId:l,items:i,size:"sm",maxHeight:"200px",onSelectionChange:(F,A)=>{if(F&&F.value==="pin"){const P=t.columns.find(v=>v.id===r);if(P){const v=P.pinned||!1;P.pinned=!v,t.onColumnPin&&t.onColumnPin(r,P.pinned),G()}else console.error("❌ [COLUMN MENU] Columna no encontrada al intentar fijar:",r)}w()}})}catch(q){console.error("❌ [COLUMN MENU] Error al crear lista con createList:",q);const F=_e({items:i,size:"sm",maxHeight:"200px"});a.innerHTML=F,a.querySelectorAll(".ubits-list-item").forEach(P=>{P.addEventListener("click",()=>{const v=t.columns.find(Y=>Y.id===r);if(v){const Y=v.pinned||!1;v.pinned=!Y,t.onColumnPin&&t.onColumnPin(r,v.pinned),G()}w()})})}const d=p.hasAttribute("data-pinned")&&p.getAttribute("data-pinned")==="true",g=p.classList.contains("ubits-data-table__column-header--pinned"),E=d||g?1e4:1e3,T=f.getBoundingClientRect(),_=p.getBoundingClientRect();if(d||g){a.style.setProperty("position","fixed","important"),a.style.setProperty("top",`${T.bottom+4}px`,"important");const q=T.right-160;a.style.setProperty("left",`${q}px`,"important"),a.style.setProperty("right","auto","important"),a.style.setProperty("z-index",`${E}`,"important"),a.style.setProperty("display","block","important")}else a.style.position="absolute",a.style.top="100%",a.style.right="0",a.style.left="auto",a.style.zIndex=`${E}`,a.style.setProperty("z-index",`${E}`,"important"),a.style.display="block";m=!0,R=q=>{!a.contains(q.target)&&!f.contains(q.target)&&w()},setTimeout(()=>{document.addEventListener("click",R)},0)})}),u.querySelectorAll('[data-editable-text="true"]').forEach(C=>{const f=C.closest('[data-editable="true"]');if(!f)return;const r=f.getAttribute("data-row-id"),b=f.getAttribute("data-column-id");if(!r||!b)return;const p=isNaN(Number(r))?r:Number(r);C.addEventListener("keydown",c=>{c.key==="Enter"&&(c.preventDefault(),C.blur())}),C.addEventListener("blur",c=>{c.stopPropagation();const o=C.textContent||"",n=t.rows.find(a=>a.id===p);if(n){const a=t.columns.find(s=>s.id===b);a&&(a.type==="nombre"||a.type==="nombre-avatar")?(n.data.nombre=o.trim(),n.data[b]!==void 0&&(n.data[b]=o.trim())):a&&a.type==="estado"?(n.data[b]=o.trim(),n.data.estado=o.trim(),n.data.status=o.trim()):n.data[b]=o.trim()}}),C.addEventListener("dblclick",c=>{c.stopPropagation()}),C.addEventListener("click",c=>{c.stopPropagation()})}),u.querySelectorAll(".ubits-data-table__status-editable").forEach(C=>{const f=C.getAttribute("data-row-id"),r=C.getAttribute("data-column-id"),b=C.getAttribute("data-current-status");if(!f||!r)return;const p=isNaN(Number(f))?f:Number(f),c=C.querySelector(".ubits-status-tag"),o=C.querySelector(".ubits-data-table__status-dropdown");if(!c||!o)return;const n=[{value:"active",label:"Activo",status:"active"},{value:"completed",label:"Completado",status:"completed"},{value:"published",label:"Publicado",status:"published"},{value:"fulfilled",label:"Cumplido",status:"fulfilled"},{value:"created",label:"Creado",status:"created"},{value:"not-fulfilled",label:"No cumplido",status:"not-fulfilled"},{value:"denied",label:"Denegado",status:"denied"},{value:"draft",label:"Borrador",status:"draft"},{value:"in-progress",label:"En progreso",status:"in-progress"},{value:"syncing",label:"Sincronizando",status:"syncing"},{value:"pending",label:"Pendiente",status:"pending"},{value:"pending-approval",label:"Pendiente aprobación",status:"pending-approval"},{value:"not-started",label:"No iniciado",status:"not-started"},{value:"finished",label:"Finalizado",status:"finished"},{value:"archived",label:"Archivado",status:"archived"},{value:"disabled",label:"Deshabilitado",status:"disabled"},{value:"paused",label:"Pausado",status:"paused"},{value:"hidden",label:"Oculto",status:"hidden"}];let a=null,s=null,m=null,w=!1,R=0;const h=[],S=g=>{const E=[];let T=g;for(;T&&T!==document.body&&T!==document.documentElement;){const _=window.getComputedStyle(T),q=_.overflow+_.overflowX+_.overflowY,F=q.includes("auto")||q.includes("scroll"),A=T.scrollHeight>T.clientHeight||T.scrollWidth>T.clientWidth;(F||A)&&E.push(T),T=T.parentElement}return E},y=()=>{try{if(!o||o.style.display==="none"||!document.body.contains(o)){i();return}if(!c||!c.isConnected){i();return}const g=c.getBoundingClientRect(),E=g.bottom+4,T=g.left,_=o.style.top,q=o.style.left,F=`${E}px`,A=`${T}px`;(_!==F||q!==A)&&(o.style.top=F,o.style.left=A,R++)}catch{i()}},L=()=>{if(w)return;w=!0;const g=()=>{if(o.style.display==="none"||!document.body.contains(o)){i();return}y(),m=requestAnimationFrame(g)};g()},i=()=>{m&&(cancelAnimationFrame(m),m=null),w=!1,R=0};s=y;const l=()=>{i(),o.style.display="none";const g=o.__scrollbarInstance;if(g&&g.destroy){try{g.destroy()}catch{}o.__scrollbarInstance=null}o.parentElement===document.body&&C.appendChild(o),a&&(document.removeEventListener("click",a),a=null),s&&(window.removeEventListener("scroll",s,!0),u.removeEventListener("scroll",s,!0),h.forEach(E=>{E.removeEventListener("scroll",s,!0)}),h.length=0,s=null)},d=g=>{try{if(g.preventDefault(),g.stopPropagation(),!c||!o)return;u.querySelectorAll(".ubits-data-table__status-dropdown").forEach(N=>{if(N!==o&&(N.style.display="none",N.parentElement===document.body)){const z=u.querySelector(`[data-row-id="${N.getAttribute("data-row-id")}"][data-column-id="${N.getAttribute("data-column-id")}"]`);z&&z.appendChild(N)}});const E={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"},T=n.map(N=>({label:N.label,value:N.value,state:N.status===b?"active":"default",selected:N.status===b}));if(!document.querySelector('link[href*="scroll.css"]')){const N=document.createElement("link");N.rel="stylesheet",N.href="../../addons/scroll/src/styles/scroll.css",document.head.appendChild(N)}o.innerHTML="";const _=`status-list-${p}-${r}`,q=`status-scrollbar-${p}-${r}`;if(o.id=`status-dropdown-${p}-${r}`,o.innerHTML=`
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${_}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${q}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `,document.getElementById(_)){const N=document.createElement("style");N.textContent=`
            #${_}::-webkit-scrollbar {
              display: none;
            }
          `,document.head.appendChild(N)}o.parentElement!==document.body&&document.body.appendChild(o);const A=c.getBoundingClientRect();o.style.position="fixed",o.style.top=`${A.bottom+4}px`,o.style.left=`${A.left}px`,o.style.zIndex="1000",o.style.backgroundColor="var(--ubits-bg-1)",o.style.border="1px solid var(--ubits-border-1)",o.style.borderRadius="8px",o.style.display="block",o.style.minWidth="200px",o.style.maxWidth="300px",o.style.padding="4px",o.style.boxSizing="border-box",o.style.maxHeight="308px";const P=S(c);h.push(...P),y(),L(),window.addEventListener("scroll",y,!0),u.addEventListener("scroll",y,!0),P.forEach(N=>{N.addEventListener("scroll",y,!0)});let v=null;try{const N=He({containerId:_,items:T,size:"sm",maxHeight:"none",onSelectionChange:(z,ye)=>{if(z&&ye!==null){const Ae=n[ye];if(Ae){const se=t.rows.find(Be=>Be.id===p);if(se&&t.columns.find(ke=>ke.id===r)){const ke=E[Ae.status]||Ae.label;se.data[r]=ke,se.data.estado=ke,se.data.status=ke,G()}l()}}}});N&&(N.style.maxHeight="none",N.style.height="auto",N.style.overflow="visible",N.style.overflowY="visible",N.style.overflowX="visible"),requestAnimationFrame(()=>{if(typeof Me<"u")try{const z=document.getElementById(_);z&&z.scrollHeight>z.clientHeight&&(v=Me({containerId:q,targetId:_,orientation:"vertical",state:"default"}),v?.update&&v.update())}catch{}})}catch{}o.__scrollbarInstance=v;const Y=N=>{!o.contains(N.target)&&!c.contains(N.target)&&l()};a=Y,setTimeout(()=>{document.addEventListener("click",Y)},0)}catch{i()}};c.addEventListener("click",d)}),u.querySelectorAll('input[data-radio-button="true"][data-editable="true"]').forEach(C=>{const f=C,r=f.getAttribute("data-row-id"),b=f.getAttribute("data-column-id");if(!r||!b)return;const p=isNaN(Number(r))?r:Number(r),c=f.cloneNode(!0);f.parentNode?.replaceChild(c,f),c.addEventListener("change",o=>{if(o.stopPropagation(),c.checked){u.querySelectorAll(`input[data-radio-button="true"][data-column-id="${b}"]`).forEach(s=>{const m=s.getAttribute("data-row-id");if(m&&m!==String(p)){s.checked=!1;const w=t.rows.find(R=>String(R.id)===m);w&&(w.data[b]=!1)}});const a=t.rows.find(s=>String(s.id)===String(p));a&&(a.data[b]=!0,a.data[`${b}_value`]=p)}G()})}),u.querySelectorAll('input[data-checkbox-button="true"]:not([data-column-id="checkbox-2"])').forEach(C=>{const f=C,r=f.getAttribute("data-row-id"),b=f.getAttribute("data-column-id");if(!r||!b||b==="checkbox-2")return;const p=isNaN(Number(r))?r:Number(r),c=f.cloneNode(!0);f.parentNode?.replaceChild(c,f),c.addEventListener("change",o=>{o.stopPropagation();const n=t.rows.find(a=>String(a.id)===String(p));n&&(n.data[b]=c.checked,t.onRowSelect&&t.onRowSelect(p,c.checked),G())})}),console.log("☑️ [SELECT ALL] ⚠️ Handler alternativo DESHABILITADO - usando solo el handler optimizado");const W=u.querySelectorAll("input[data-column-checkbox-header]");console.log(`☑️ [SELECT ALL] 🔍 Verificando ${W.length} header checkboxes después de attachEventListeners...`),W.forEach((C,f)=>{const r=C,b=r.getAttribute("data-column-checkbox-header");console.log(`☑️ [SELECT ALL] 🔍 Header checkbox ${f} verificado:`,{columnId:b,element:r,checked:r.checked,hasHeaderAttr:r.hasAttribute("data-column-checkbox-header"),allAttrs:Array.from(r.attributes).map(o=>`${o.name}="${o.value}"`),parentElement:r.parentElement?.tagName,parentClasses:r.parentElement?.className,isConnected:r.isConnected,ownerDocument:r.ownerDocument===document});const p=()=>{console.log(`☑️ [SELECT ALL] 🧪 TEST: Header checkbox ${f} recibió evento click de prueba`)};r.addEventListener("click",p,{once:!0,capture:!0});const c=()=>{console.log(`☑️ [SELECT ALL] 🧪 TEST: Header checkbox ${f} recibió evento change de prueba`)};r.addEventListener("change",c,{once:!0,capture:!0})});const Te=typeof window<"u"&&window.location&&!window.location.href.includes("storybook");if(u.querySelectorAll(".ubits-data-table__date-editable").forEach((C,f)=>{const r=C.getAttribute("data-row-id"),b=C.getAttribute("data-column-id");if(!r||!b)return;const p=isNaN(Number(r))?r:Number(r),c=C.querySelector(".ubits-data-table__date-display");if(!c)return;let o=null,n=null,a=null,s=null,m=null,w=null;const R=l=>{const d=String(l.getDate()).padStart(2,"0"),g=String(l.getMonth()+1).padStart(2,"0"),E=l.getFullYear();return`${d}/${g}/${E}`},h=l=>{if(!l)return null;const[d,g,E]=l.split("/");if(d&&g&&E)return new Date(parseInt(E),parseInt(g)-1,parseInt(d));try{const T=new Date(l);if(!isNaN(T.getTime()))return T}catch{}return null},S=()=>{n&&(n.style.display="none",n.parentElement&&n.remove(),n=null),a&&(document.removeEventListener("click",a),a=null),s&&(document.removeEventListener("keydown",s),s=null),m&&(window.removeEventListener("scroll",m,!0),w&&w.removeEventListener("scroll",m,!0),m=null)},y=()=>{a=l=>{n&&!C.contains(l.target)&&!n.contains(l.target)&&S()},s=l=>{l.key==="Escape"&&n&&S()},m=l=>{if(!n)return;const d=n.querySelector(".ubits-calendar");if(d){const g=d.querySelector('.ubits-calendar__month-dropdown[style*="display: block"]'),E=d.querySelector('.ubits-calendar__year-dropdown[style*="display: block"]');if(g||E){const T=document.activeElement;if(T&&(n.contains(T)||T.closest(".ubits-calendar")||T.closest(".ubits-calendar__month-dropdown")||T.closest(".ubits-calendar__year-dropdown")||T.closest(".ubits-list")||T.closest('[id*="calendar-list"]')||T.closest('[id*="calendar-scrollbar"]')))return;if(l&&l.target){const _=l.target;if(n.contains(_)||_.closest(".ubits-calendar")||_.closest(".ubits-calendar__month-dropdown")||_.closest(".ubits-calendar__year-dropdown")||_.closest(".ubits-list")||_.closest('[id*="calendar-list"]')||_.closest('[id*="calendar-scrollbar"]'))return}return}}S()},document.addEventListener("click",a),document.addEventListener("keydown",s),w=u.querySelector(".ubits-data-table__scrollable-container"),w&&w.addEventListener("scroll",m,!0),window.addEventListener("scroll",m,!0)},L=async()=>{const l=[{id:"ubits-calendar-styles",fileName:"calendar.css",href:"../../addons/calendar/src/styles/calendar.css"},{id:"ubits-button-styles",fileName:"button.css",href:"../../addons/button/src/styles/button.css"},{id:"ubits-input-styles",fileName:"input.css",href:"../../addons/input/src/styles/input.css"},{id:"ubits-list-styles",fileName:"list.css",href:"../../addons/list/src/styles/list.css"}];for(const d of l){const g=document.getElementById(d.id),E=Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).find(_=>(_.href||"").includes(d.fileName)||_.id===d.id);if(g||E)continue;const T=document.createElement("link");T.rel="stylesheet",T.href=d.href,T.id=d.id,document.head.appendChild(T)}},i=async()=>{if(n&&n.style.display!=="none"){S();return}if(o&&n){const l=c.getBoundingClientRect();n.style.top=`${l.bottom+4}px`,n.style.left=`${l.left}px`,n.style.display="block",y();return}try{await L();const{createCalendar:l}=await je(async()=>{const{createCalendar:F}=await import("./index-BovPifr4.js").then(A=>A.i);return{createCalendar:F}},__vite__mapDeps([0,1]),import.meta.url),d=c.textContent||"",g=h(d);o=l({mode:"single",selectedDate:g,initialDate:g||new Date,onDateSelect:F=>{const A=R(F);c.textContent=A;const P=t.rows.find(v=>v.id===p);P&&(P.data[b]=A,P.data[`${b}_iso`]=F.toISOString().split("T")[0]),S(),G()}}),n=document.createElement("div"),n.className="ubits-data-table__calendar-container",n.setAttribute("data-row-id",String(p)),n.setAttribute("data-column-id",b);const T=c.getBoundingClientRect(),_=T.bottom+4,q=T.left;n.style.cssText=`
            position: fixed;
            top: ${_}px;
            left: ${q}px;
            z-index: 99999;
            display: block;
            margin: 0;
          `,document.body.appendChild(n),n.appendChild(o.element),y()}catch(l){console.error("❌ [CALENDAR] Error cargando Calendar UBITS:",l)}};c.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),i()})}),u.querySelectorAll('input[data-toggle-button="true"]').forEach(C=>{const f=C,r=f.getAttribute("data-row-id"),b=f.getAttribute("data-column-id");if(!r||!b)return;const p=isNaN(Number(r))?r:Number(r),c=f.cloneNode(!0);f.parentNode?.replaceChild(c,f),c.addEventListener("change",n=>{n.stopPropagation();const a=t.rows.find(s=>String(s.id)===String(p));a&&(a.data[b]=c.checked,G())});const o=c.closest(".ubits-toggle");o&&o.addEventListener("click",n=>{n.target!==c&&!c.contains(n.target)&&(n.preventDefault(),n.stopPropagation(),c.checked=!c.checked,c.dispatchEvent(new Event("change",{bubbles:!0})))})}),t.showPagination){const C=u.querySelector(".ubits-data-table__pagination");if(C){C.querySelectorAll(".ubits-pagination__page-button").forEach(p=>{p.addEventListener("click",()=>{const c=parseInt(p.textContent||"1");t.onPageChange&&t.onPageChange(c),t.currentPage=c,G()})}),C.querySelectorAll(".ubits-pagination__nav-button").forEach(p=>{p.addEventListener("click",()=>{const c=parseInt(C.getAttribute("data-current-page")||"1"),o=parseInt(C.getAttribute("data-total-pages")||"1"),n=p.getAttribute("aria-label")||"";let a=c;n.includes("Primera")||n.includes("First")?a=1:n.includes("Última")||n.includes("Last")?a=o:n.includes("Anterior")||n.includes("Previous")?a=Math.max(1,c-1):(n.includes("Siguiente")||n.includes("Next"))&&(a=Math.min(o,c+1)),a!==c&&(t.onPageChange&&t.onPageChange(a),t.currentPage=a,G())})});const b=C.querySelector(".ubits-pagination__select");b&&b.addEventListener("change",p=>{const c=p.target,o=parseInt(c.value);t.onItemsPerPageChange&&t.onItemsPerPageChange(o),t.itemsPerPage=o,t.currentPage=1,G()})}}if(t.header){const C=u.querySelector(".ubits-data-table__header");if(C){if(t.header.primaryButton&&t.header.showPrimaryButton!==!1){const f=C.querySelector(".ubits-data-table__header-primary-button");f&&t.header.primaryButton.onClick&&f.addEventListener("click",t.header.primaryButton.onClick)}if(t.header.secondaryButtons&&t.header.showSecondaryButtons!==!1&&C.querySelectorAll(".ubits-data-table__header-secondary-button").forEach((r,b)=>{const p=t.header.secondaryButtons[b];p&&p.onClick&&r.addEventListener("click",p.onClick)}),t.header.searchButton&&t.header.showSearchButton!==!1){console.log("🔍 [DATA TABLE] Configurando SearchButton:",{isSearchActive:ce,hasHeader:!!t.header,hasSearchButton:!!t.header.searchButton});const f=C.querySelector(".ubits-data-table__header-search-button"),r=f?.previousElementSibling,b=f?window.getComputedStyle(f):null,p=r?window.getComputedStyle(r):null;let c=null;if(f&&r){const o=r.getBoundingClientRect(),n=f.getBoundingClientRect(),a=n.left-o.right;c={prevButtonRight:o.right,searchBtnLeft:n.left,actualGap:a,expectedGap:8,difference:a-8,prevButtonWidth:o.width,searchBtnWidth:n.width,marginLeft:b?.marginLeft,marginRight:b?.marginRight}}if(console.log("🔍 [DATA TABLE] SearchButton encontrado:",{found:!!f,className:f?.className,tagName:f?.tagName,isActive:f?.classList.contains("ubits-search-button--active"),width:b?.width,prevButton:r?.tagName,gapInfo:c}),f){const o=f.querySelector("button"),n=f.tagName==="BUTTON",a=!!o;if(console.log("🔍 [DATA TABLE] Estado del SearchButton:",{isButton:n,hasButtonInside:a,isSearchActive:ce,shouldAddListener:(n||a)&&!ce}),(n||a)&&!ce){const m=n?f:o;console.log("🔍 [DATA TABLE] Agregando listener al botón de búsqueda"),m.addEventListener("click",w=>{console.log("🔍 [DATA TABLE] Click en botón de búsqueda detectado!"),w.stopPropagation(),w.preventDefault(),ce=!0,console.log("🔍 [DATA TABLE] isSearchActive cambiado a:",ce),t.header.searchButton.onClick&&t.header.searchButton.onClick(w),console.log("🔍 [DATA TABLE] Re-renderizando tabla..."),G(),setTimeout(()=>{const R=u.querySelector(".ubits-data-table__header-search-button");if(console.log("🔍 [DATA TABLE] Buscando input después de renderizar:",{found:!!R,tagName:R?.tagName}),R){const h=R.querySelector(".ubits-search-button__input");h?(console.log("🔍 [DATA TABLE] Enfocando input"),h.focus(),setTimeout(()=>{h.setSelectionRange(0,h.value.length)},10)):console.warn("🔍 [DATA TABLE] Input no encontrado después de renderizar")}},150)})}const s=f.querySelector(".ubits-search-button__input");if(s){s.value=oe;const m=L=>{if(oe=L,t.header.searchButton.onChange&&t.header.searchButton.onChange(L),G(),L&&setTimeout(()=>{const i=u.querySelector(".ubits-data-table__header-search-button");if(i){const l=i.querySelector(".ubits-search-button__input");l&&(l.focus(),l.setSelectionRange(l.value.length,l.value.length))}},50),t.header.searchButton.onSearch){const i=ee(t.rows,L,t.columns);t.header.searchButton.onSearch(L,i)}};s.addEventListener("input",L=>{const i=L.target.value;m(i)}),s.addEventListener("change",L=>{const i=L.target.value;m(i)});let w=null,R=!1,h=0;s.addEventListener("focus",()=>{R=!0,h=Date.now(),console.log("🔍 [DATA TABLE] Input recibió focus"),setTimeout(()=>{R=!1},200)}),s.addEventListener("blur",L=>{const l=Date.now()-h;if(console.log("🔍 [DATA TABLE] Input perdió focus:",{isFocusing:R,timeSinceFocus:l,searchTerm:oe,activeElement:document.activeElement?.tagName}),R||l<200){console.log("🔍 [DATA TABLE] Ignorando blur inmediato después de focus");return}w&&clearTimeout(w),w=setTimeout(()=>{const d=u.querySelector(".ubits-search-button__input"),g=document.activeElement,E=u.querySelector(".ubits-search-button__clear"),T=u.querySelector(".ubits-data-table__header-search-button"),_=d&&oe===""&&!d.value&&g!==E&&!T?.contains(g);console.log("🔍 [DATA TABLE] Evaluando cierre del SearchButton:",{hasInput:!!d,searchTerm:oe,inputValue:d?.value,activeElement:g?.tagName,isClearBtn:g===E,isInsideWrapper:T?.contains(g),shouldClose:_}),_&&(console.log("🔍 [DATA TABLE] Desactivando SearchButton por blur (vacío)"),ce=!1,G()),w=null},200)});const S=f.closest(".ubits-data-table__header-search-button");S&&S.addEventListener("mousedown",L=>{L.target.closest(".ubits-search-button__input-wrapper")&&L.preventDefault()});const y=f.querySelector(".ubits-search-button__clear");y&&y.addEventListener("click",L=>{L.stopPropagation(),L.preventDefault(),oe="",s.value="",ce=!1,m("")})}}}if(t.header.filterButton&&t.header.showFilterButton!==!1){const f=C.querySelector(".ubits-data-table__header-filter-button");f&&f.addEventListener("click",r=>{r.stopPropagation(),r.preventDefault();let b=t.header.filterButton.filters||[];if(b.length===0&&(b=t.columns.filter(c=>{const o=["drag-handle","expand","checkbox","radio","toggle","acciones"];return c.visible!==!1&&c.type&&!o.includes(c.type)}).map(c=>{let o="text",n;if(c.type==="estado"){o="select";const a=new Set;t.rows.forEach(s=>{const m=s.data[c.id];m!=null&&a.add(String(m))}),n=Array.from(a).map(s=>({value:s,label:s}))}else c.type==="fecha"?o="date":c.type==="progreso"?o="number":o="text";return{id:c.id,label:c.title,columnId:c.id,type:o,options:n}})),b.length===0){console.warn("🔍 [DATA TABLE] No hay columnas disponibles para filtrar"),t.header.filterButton.onClick&&t.header.filterButton.onClick(r);return}const p=()=>`
                  <div class="ubits-data-table__filters-container">
                    ${b.map(o=>{const n=le[o.id]||o.value||"";let a="";const s=`filter-input-${o.id}`;switch(o.type){case"text":case"number":case"date":a=Ue({containerId:s,label:o.label,type:o.type,value:n,placeholder:`Filtrar por ${o.label.toLowerCase()}...`,size:"md"});break;case"select":o.options&&o.options.length>0&&(a=Ue({containerId:s,label:o.label,type:"select",selectOptions:o.options,value:n,placeholder:`Seleccionar ${o.label.toLowerCase()}...`,size:"md"}));break}return`
                    <div class="ubits-data-table__filter-item" data-filter-id="${o.id}">
                      <div id="${s}">${a}</div>
                    </div>
                  `}).join("")}
                  </div>
                `;if(Z)try{Z.updateContent(p)}catch(c){console.error("🔍 [DATA TABLE] Error al actualizar drawer:",c),Z=Oe({title:"Filtros",complementaryText:"Aplica filtros para refinar los resultados",width:40,bodyContent:p,footerButtons:{secondary:{label:"Limpiar",onClick:o=>{o.preventDefault(),o.stopPropagation(),le={},t.header.filterButton.onClearFilters&&t.header.filterButton.onClearFilters(),G(),Z&&Z.close()}},primary:{label:"Aplicar",onClick:o=>{o.preventDefault(),o.stopPropagation();const n={};b.forEach(a=>{const s=Z.element.querySelector(`[data-filter-id="${a.id}"]`);if(s){const m=s.querySelector(".ubits-input");m&&m.value&&m.value.trim()!==""&&(n[a.id]=m.value.trim())}}),le=n,t.header.filterButton.onApplyFilters&&t.header.filterButton.onApplyFilters(le),G(),Z&&Z.close()}}},onClose:()=>{},closeOnOverlayClick:!0})}else try{Z=Oe({title:"Filtros",complementaryText:"Aplica filtros para refinar los resultados",width:40,bodyContent:p,footerButtons:{secondary:{label:"Limpiar",onClick:c=>{c.preventDefault(),c.stopPropagation(),le={},t.header.filterButton.onClearFilters&&t.header.filterButton.onClearFilters(),G(),Z&&Z.close()}},primary:{label:"Aplicar",onClick:c=>{c.preventDefault(),c.stopPropagation();const o={};b.forEach(n=>{const a=Z.element.querySelector(`[data-filter-id="${n.id}"]`);if(a){const s=a.querySelector(".ubits-input");s&&s.value&&s.value.trim()!==""&&(o[n.id]=s.value.trim())}}),le=o,t.header.filterButton.onApplyFilters&&t.header.filterButton.onApplyFilters(le),G(),Z&&Z.close()}}},onClose:()=>{},closeOnOverlayClick:!0})}catch(c){console.error("🔍 [DATA TABLE] Error al crear drawer:",c),t.header.filterButton.onClick&&t.header.filterButton.onClick(r);return}Z&&(Z.open(),setTimeout(()=>{Z&&b.forEach(c=>{const o=`filter-input-${c.id}`,n=Z.element.querySelector(`#${o}`);if(n){n.innerHTML="";const a=le[c.id]||c.value||"";let s={containerId:o,label:c.label,value:a,placeholder:c.type==="select"?`Seleccionar ${c.label.toLowerCase()}...`:`Filtrar por ${c.label.toLowerCase()}...`,size:"md"};c.type==="select"&&c.options?(s.type="select",s.selectOptions=c.options.map(m=>({value:m.value,text:m.label||m.value}))):s.type=c.type,Je(s)}})},300))})}if(t.header.columnSelectorButton&&t.header.showColumnSelectorButton!==!1){const f=C.querySelector(".ubits-data-table__header-column-selector-button");if(f){let r=null,b=!1;const p=()=>(r&&r.parentElement||(r=document.createElement("div"),r.className="ubits-data-table__column-selector-dropdown",r.style.display="none",document.body.appendChild(r)),r),c=()=>{if(!r||!f)return;const s=f.getBoundingClientRect(),m=r.offsetWidth||200;r.style.position="fixed",r.style.top=`${s.bottom+4}px`;const w=s.right-m;w<0?r.style.left="0px":r.style.left=`${w}px`,r.style.right="auto"};let o=null,n=null;const a=()=>{r&&(r.style.display="none",b=!1,n&&(document.removeEventListener("click",n),n=null),o&&(window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o),o=null))};f.addEventListener("click",s=>{if(s.preventDefault(),s.stopPropagation(),console.log("🔍 [COLUMN SELECTOR] ========== CLICK EN BOTÓN =========="),console.log("🔍 [COLUMN SELECTOR] Estado actual - isOpen:",b),b){console.log("🔍 [COLUMN SELECTOR] Dropdown ya está abierto, cerrando..."),a();return}const m=p();for(console.log("🔍 [COLUMN SELECTOR] Dropdown creado/obtenido:",{exists:!!m,hasChildren:m.children.length,innerHTMLLength:m.innerHTML.length}),console.log("🔍 [COLUMN SELECTOR] Limpiando dropdown completamente..."),console.log("🔍 [COLUMN SELECTOR] ANTES - children:",m.children.length,"innerHTML:",m.innerHTML.length,"chars");m.firstChild;)m.removeChild(m.firstChild);m.innerHTML="";const w=m.children.length,R=m.innerHTML.length;console.log("🔍 [COLUMN SELECTOR] DESPUÉS - children:",w,"innerHTML:",R,"chars"),(w>0||R>0)&&(console.error("🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown no está completamente limpio!"),m.innerHTML="",requestAnimationFrame(()=>{(m.children.length>0||m.innerHTML.length>0)&&console.error("🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown sigue sin estar limpio después de limpieza adicional!")}));const h="ubits-data-table-column-selector-list",S=document.getElementById(h);S&&(console.log("🔍 [COLUMN SELECTOR] ⚠️ Contenedor existente encontrado, removiendo..."),S.remove());const y=document.createElement("div");if(y.id=h,m.appendChild(y),console.log("🔍 [COLUMN SELECTOR] Contenedor de lista creado:",{id:y.id,parentExists:!!y.parentElement,hasChildren:y.children.length,innerHTML:y.innerHTML.length}),y){console.log("🔍 [COLUMN SELECTOR] ========== PROCESANDO COLUMNAS PARA CREAR LISTA =========="),console.log("🔍 [COLUMN SELECTOR] Total columnas en currentOptions:",t.columns.length);const l=$(t.columns);l.length!==t.columns.length&&(console.log("🔍 [COLUMN SELECTOR] ⚠️ DUPLICADOS ELIMINADOS:",t.columns.length,"->",l.length),t.columns=l);const d=l.filter(A=>{const P=["drag-handle","expand"],v=["checkbox","checkbox-2"];return!P.includes(A.type||"")&&!v.includes(A.id)&&A.id!=="checkbox"}),g=new Set,E=d.filter(A=>g.has(A.id)?(console.log("🔍 [COLUMN SELECTOR] ⚠️ DUPLICADO:",A.id),!1):(g.add(A.id),!0));console.log("🔍 [COLUMN SELECTOR] Columnas seleccionables finales:",E.length),console.log("🔍 [COLUMN SELECTOR] IDs:",E.map(A=>`${A.id}(${A.visible!==!1?"visible":"oculta"})`).join(", "));const T=E.filter(A=>A.visible!==!1).length;console.log("🔍 [COLUMN SELECTOR] Columnas visibles:",T);const _=E.map(A=>{const P=A.visible!==!1,v=P&&T===1;return{label:Ne({label:A.title,checked:P,size:"sm",disabled:v,className:"ubits-data-table__column-selector-checkbox"}).replace("<input",`<input data-column-selector-id="${A.id}"`),value:A.id,state:"default",selected:!1}}),q=new Set,F=_.filter(A=>q.has(A.value)?(console.log("🔍 [COLUMN SELECTOR] ⚠️ ITEM DUPLICADO:",A.value),!1):(q.add(A.value),!0));console.log("🔍 [COLUMN SELECTOR] Items únicos para lista:",F.length),console.log("🔍 [COLUMN SELECTOR] Valores:",F.map(A=>A.value).join(", "));try{console.log("🔍 [COLUMN SELECTOR] Llamando createList..."),He({containerId:h,items:F,size:"sm",maxHeight:"400px",className:"ubits-data-table__column-selector-list"}),console.log("🔍 [COLUMN SELECTOR] ✅ createList completado");const A=document.getElementById(h);if(A){const v=A.querySelector(".ubits-list")?.querySelectorAll(".ubits-list-item")||[];console.log("🔍 [COLUMN SELECTOR] Lista creada - items en DOM:",v.length)}else console.error("🔍 [COLUMN SELECTOR] ❌ Lista no encontrada después de createList")}catch(A){console.error("🔍 [COLUMN SELECTOR] ❌ Error en createList:",A),y.innerHTML=_e({containerId:h,items:F,size:"sm",maxHeight:"400px",className:"ubits-data-table__column-selector-list"}),console.log("🔍 [COLUMN SELECTOR] ✅ Fallback renderList usado")}}else console.error("🔍 [COLUMN SELECTOR] ❌ listContainer no existe");const L=()=>{console.log("🔍 [COLUMN SELECTOR] ========== UPDATE DROPDOWN CONTENT =========="),console.log("🔍 [COLUMN SELECTOR] Dropdown existe:",!!m),console.log("🔍 [COLUMN SELECTOR] Dropdown isOpen:",b);const l="ubits-data-table-column-selector-list";let d=m.querySelector(`#${l}`);console.log("🔍 [COLUMN SELECTOR] Buscando contenedor:",{found:!!d,hasChildren:d?d.children.length:0,innerHTMLLength:d?d.innerHTML.length:0}),(!d||!b)&&(console.log("🔍 [COLUMN SELECTOR] ⚠️ Contenedor no encontrado o dropdown cerrado, recreando..."),m.innerHTML="",d=document.createElement("div"),d.id=l,m.appendChild(d),console.log("🔍 [COLUMN SELECTOR] Contenedor recreado:",{id:d.id,parentExists:!!d.parentElement}));const g=$(t.columns);g.length!==t.columns.length&&(console.log("🔍 [COLUMN SELECTOR UPDATE] ⚠️ DUPLICADOS:",t.columns.length,"->",g.length),t.columns=g);const E=g.filter(v=>{const Y=["drag-handle","expand"],N=["checkbox","checkbox-2"];return!Y.includes(v.type||"")&&!N.includes(v.id)&&v.id!=="checkbox"}),T=new Set,_=E.filter(v=>T.has(v.id)?(console.log("🔍 [COLUMN SELECTOR UPDATE] ⚠️ DUPLICADO:",v.id),!1):(T.add(v.id),!0)),q=_.filter(v=>v.visible!==!1).length;console.log("🔍 [COLUMN SELECTOR UPDATE] Columnas:",_.length,"| Visibles:",q),console.log("🔍 [COLUMN SELECTOR UPDATE] IDs:",_.map(v=>`${v.id}(${v.visible!==!1?"V":"O"})`).join(", "));const F=_.map(v=>{const Y=v.visible!==!1,N=Y&&q===1;return{label:Ne({label:v.title,checked:Y,size:"sm",disabled:N,className:"ubits-data-table__column-selector-checkbox"}).replace("<input",`<input data-column-selector-id="${v.id}"`),value:v.id,state:"default",selected:!1}}),A=new Set,P=F.filter(v=>A.has(v.value)?(console.log("🔍 [COLUMN SELECTOR UPDATE] ⚠️ ITEM DUPLICADO:",v.value),!1):(A.add(v.value),!0));console.log("🔍 [COLUMN SELECTOR UPDATE] Items únicos:",P.length),console.log("🔍 [COLUMN SELECTOR UPDATE] Valores:",P.map(v=>v.value).join(", ")),console.log("🔍 [COLUMN SELECTOR UPDATE] Limpiando contenedor..."),console.log("🔍 [COLUMN SELECTOR UPDATE] ANTES - children:",d.children.length,"innerHTML:",d.innerHTML.length),d.innerHTML="",console.log("🔍 [COLUMN SELECTOR UPDATE] DESPUÉS - children:",d.children.length,"innerHTML:",d.innerHTML.length);try{console.log("🔍 [COLUMN SELECTOR UPDATE] Llamando createList..."),He({containerId:l,items:P,size:"sm",maxHeight:"400px",className:"ubits-data-table__column-selector-list"}),console.log("🔍 [COLUMN SELECTOR UPDATE] ✅ createList completado");const v=document.getElementById(l);if(v){const N=v.querySelector(".ubits-list")?.querySelectorAll(".ubits-list-item")||[];console.log("🔍 [COLUMN SELECTOR UPDATE] Lista creada - items en DOM:",N.length)}else console.error("🔍 [COLUMN SELECTOR UPDATE] ❌ Lista no encontrada")}catch(v){console.error("🔍 [COLUMN SELECTOR UPDATE] ❌ Error en createList:",v),d.innerHTML=_e({containerId:l,items:P,size:"sm",maxHeight:"400px",className:"ubits-data-table__column-selector-list"}),console.log("🔍 [COLUMN SELECTOR UPDATE] ✅ Fallback renderList usado")}setTimeout(()=>{i()},50)},i=()=>{m.querySelectorAll("input[data-column-selector-id]").forEach(d=>{const g=d,E=g.getAttribute("data-column-selector-id"),T=g.cloneNode(!0);g.parentNode?.replaceChild(T,g),T.addEventListener("change",_=>{if(_.stopPropagation(),_.preventDefault(),T.disabled){console.log("🔍 [COLUMN SELECTOR] Checkbox deshabilitado, ignorando cambio");return}const q=T.checked,F=t.columns.find(A=>A.id===E);if(F){if(!q){const P=t.columns.filter(z=>{const ye=["drag-handle","expand"],Ae=["checkbox","checkbox-2"];return!ye.includes(z.type||"")&&!Ae.includes(z.id)&&z.id!=="checkbox"}),v=new Set,Y=P.filter(z=>v.has(z.id)?!1:(v.add(z.id),!0)),N=Y.filter(z=>z.id===E?!1:z.visible!==!1);if(console.log("🔍 [COLUMN SELECTOR] Validación de ocultar columna:",{columnId:E,columnTitle:F.title,selectableColumnsCount:Y.length,wouldBeVisibleCount:N.length,selectableColumns:Y.map(z=>({id:z.id,title:z.title,visible:z.visible})),wouldBeVisible:N.map(z=>({id:z.id,title:z.title}))}),console.log("🔍 [COLUMN SELECTOR] Detalles completos:",JSON.stringify({columnId:E,columnTitle:F.title,selectableColumnsCount:Y.length,wouldBeVisibleCount:N.length,selectableColumns:Y.map(z=>({id:z.id,title:z.title,visible:z.visible})),wouldBeVisible:N.map(z=>({id:z.id,title:z.title}))},null,2)),N.length===0){T.checked=!0,console.warn("⚠️ No se pueden ocultar todas las columnas. Debe quedar al menos una columna visible.");return}}console.log("🔍 [COLUMN SELECTOR] ========== ACTUALIZANDO VISIBILIDAD =========="),console.log("🔍 [COLUMN SELECTOR] Columna encontrada:",{id:F.id,title:F.title,visibleActual:F.visible,visibleNuevo:q});const A=t.columns.filter(P=>P.id===E);console.log("🔍 [COLUMN SELECTOR] Columnas con el mismo ID:",A.length,A.map(P=>({id:P.id,title:P.title,visible:P.visible}))),F.visible=q,A.length>1&&(console.log("🔍 [COLUMN SELECTOR] ⚠️ ACTUALIZANDO COLUMNAS DUPLICADAS:",A.length),A.forEach((P,v)=>{P.id===E&&(P.visible=q,console.log("🔍 [COLUMN SELECTOR] Columna duplicada actualizada:",v,P.id,P.title,P.visible))})),console.log("🔍 [COLUMN SELECTOR] Estado después de actualizar:",{columnId:E,visible:F.visible,totalColumnsWithId:t.columns.filter(P=>P.id===E).length}),console.log("🔍 [COLUMN SELECTOR] Llamando updateDropdownContent..."),L(),console.log("🔍 [COLUMN SELECTOR] Llamando render() para actualizar tabla..."),G(),console.log("🔍 [COLUMN SELECTOR] Render completado")}})})};setTimeout(()=>{i()},100),m.style.display="block",requestAnimationFrame(()=>{c(),setTimeout(()=>{c()},10)}),b=!0,o=()=>{b&&r&&c()},window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),n=l=>{m&&!m.contains(l.target)&&!f.contains(l.target)&&(o&&(window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o)),a())},setTimeout(()=>{document.addEventListener("click",n)},0),t.header.columnSelectorButton.onClick&&t.header.columnSelectorButton.onClick(s)})}}}}try{const C=u.querySelector(".ubits-data-table__empty-state");if(C&&t.emptyState){const f=t.rows.length===0,r=oe&&oe.trim()!=="",b=Object.keys(le).length>0;let p;if(f&&t.emptyState.noData?p=t.emptyState.noData:r&&t.emptyState.noSearchResults?p=t.emptyState.noSearchResults:b&&t.emptyState.noFilterResults&&(p=t.emptyState.noFilterResults),p){if(p.onAction){const c=C.querySelector('[data-action="primary"]');c&&c.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),p.onAction?.()})}if(p.onSecondaryAction){const c=C.querySelector('[data-action="secondary"]');c&&c.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),p.onSecondaryAction?.()})}}}}catch(C){console.error("📎 [ATTACH] ❌ Error agregando listeners de empty state:",C)}}catch(B){console.error("📎 [ATTACH] ❌ Error en attachEventListeners:",B)}console.log("📎 [ATTACH] ========== FIN attachEventListeners ==========")};return G(),{element:u,destroy:()=>{if(Ce){try{Ce.destroy()}catch{}Ce=null}if(I){const B=u.querySelector(".ubits-data-table__scrollable-container")||u.querySelector(".ubits-data-table")||u;B&&B.removeEventListener("scroll",I),window.removeEventListener("scroll",I,!0),I=null}u&&u.parentNode&&u.parentNode.removeChild(u)},update:B=>{const J=t.showPagination;if(t={...t,...B},B.columns)console.log("🔍 [UPDATE] Eliminando duplicados de columnas actualizadas..."),t.columns=$(B.columns);else if(t.columns){const H=t.columns.length;t.columns=$(t.columns),t.columns.length!==H&&console.log("🔍 [UPDATE] Duplicados encontrados y eliminados:",H,"->",t.columns.length)}if(B.showPagination!==void 0&&B.showPagination!==J)if(B.showPagination){if(I){const H=u.querySelector(".ubits-data-table__scrollable-container")||u.querySelector(".ubits-data-table")||u;H&&H.removeEventListener("scroll",I),window.removeEventListener("scroll",I,!0),I=null}ae=ge}else ae=ge;B.columns&&(X=B.columns.filter(H=>H.visible!==!1).map(H=>H.id)),B.rows&&(V=B.rows.map(H=>H.id),ae=ge),G()}}}const va={title:"Components/Data Table",tags:["autodocs"],parameters:{docs:{description:{component:"Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas."}}},argTypes:{columnReorderable:{control:"boolean",description:"Permite reordenar columnas mediante drag & drop",table:{defaultValue:{summary:"true"}}},rowReorderable:{control:"boolean",description:"Permite reordenar filas mediante drag & drop",table:{defaultValue:{summary:"true"}}},rowExpandable:{control:"boolean",description:"Muestra el icono de expandir/colapsar en las filas",table:{defaultValue:{summary:"true"}}},columnSortable:{control:"boolean",description:"Muestra botones de ordenamiento en los headers de las columnas",table:{defaultValue:{summary:"true"}}},showCheckbox:{control:"boolean",description:"Muestra la columna de checkbox para selección múltiple",table:{defaultValue:{summary:"true"}}},showVerticalScrollbar:{control:"boolean",description:"Muestra scrollbar vertical",table:{defaultValue:{summary:"false"}}},showHorizontalScrollbar:{control:"boolean",description:"Muestra scrollbar horizontal",table:{defaultValue:{summary:"false"}}},showColumnMenu:{control:"boolean",description:"Muestra el botón de menú (3 puntos) en los headers de las columnas. Usa este menú para fijar/desfijar columnas.",table:{defaultValue:{summary:"true"}}},checkboxSticky:{control:"boolean",description:"Hace que la columna de checkbox sea sticky (fija) al hacer scroll horizontal",table:{defaultValue:{summary:"false"}}},dragHandleSticky:{control:"boolean",description:"Hace que la columna de drag handle (mover filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowReorderable esté habilitado.",table:{defaultValue:{summary:"false"}}},expandSticky:{control:"boolean",description:"Hace que la columna de expand (desplegar filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowExpandable esté habilitado.",table:{defaultValue:{summary:"false"}}},columnsCount:{control:{type:"number",min:1,max:10,step:1},description:"Número de columnas de datos a mostrar (excluyendo checkbox)",table:{defaultValue:{summary:"3"}}},columnType1:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 1 (Nombre)",table:{defaultValue:{summary:"nombre"}}},columnType2:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 2 (Email)",table:{defaultValue:{summary:"correo"}}},columnType3:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 3 (Estado)",table:{defaultValue:{summary:"estado"}}},columnType4:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 4",table:{defaultValue:{summary:"nombre"}}},column1AvatarVariant:{control:{type:"select"},options:["photo","initials","icon"],description:"Variante de avatar para columna 1 (solo si es nombre-avatar o nombre-avatar-texto)",table:{defaultValue:{summary:"initials"}}},column1Editable:{control:"boolean",description:"Hacer editable la columna 1 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column2EmailClickable:{control:"boolean",description:"Hacer el email clicable en columna 2 (solo si es correo)",table:{defaultValue:{summary:"true"}}},column3Editable:{control:"boolean",description:"Hacer editable la columna 3 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column3RadioLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es radio)",table:{defaultValue:{summary:"false"}}},column3ToggleLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es toggle)",table:{defaultValue:{summary:"false"}}},column3CheckboxLabel:{control:"boolean",description:"Mostrar label en checkbox de columna 3 (solo si es tipo checkbox). Si es true, muestra el label automáticamente. Este checkbox es diferente al checkbox fijo (checkbox-2) que está en una columna separada.",table:{defaultValue:{summary:"true"}}},showPagination:{control:"boolean",description:"Muestra el paginador debajo de la tabla",table:{defaultValue:{summary:"false"}}},currentPage:{control:{type:"number",min:1,step:1},description:"Página actual",table:{defaultValue:{summary:"1"}}},itemsPerPage:{control:{type:"number",min:5,max:100,step:5},description:"Items por página",table:{defaultValue:{summary:"10"}}},paginationVariant:{control:{type:"select"},options:["default","compact","minimal"],description:"Variante del paginador",table:{defaultValue:{summary:"default"}}},paginationSize:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del paginador",table:{defaultValue:{summary:"md"}}},headerTitle:{control:{type:"text"},description:"Título del header",table:{defaultValue:{summary:"Lista de elementos"}}},showHeaderTitle:{control:"boolean",description:"Mostrar título del header",table:{defaultValue:{summary:"true"}}},headerCounter:{control:{type:"select"},options:[!0,!1,"total-only"],description:'Modo del contador: true = "X/Y resultados", "total-only" = solo "Y resultados", false = oculto',table:{defaultValue:{summary:"true"}}},headerDisplayedItems:{control:{type:"number",min:1,step:1},description:"Items mostrados actualmente (para el contador X/Y)",table:{defaultValue:{summary:"32"}}},headerTotalItems:{control:{type:"number",min:1,step:1},description:"Total de items para el contador",table:{defaultValue:{summary:"206"}}},showHeaderPrimaryButton:{control:"boolean",description:"Mostrar botón primario",table:{defaultValue:{summary:"true"}}},headerPrimaryButtonText:{control:{type:"text"},description:"Texto del botón primario",table:{defaultValue:{summary:"Nuevo"}}},showHeaderSecondaryButtons:{control:"boolean",description:"Mostrar botones secundarios",table:{defaultValue:{summary:"true"}}},showHeaderSearchButton:{control:"boolean",description:"Mostrar botón de búsqueda",table:{defaultValue:{summary:"true"}}},showHeaderFilterButton:{control:"boolean",description:"Mostrar botón de filtros",table:{defaultValue:{summary:"true"}}},showHeaderColumnSelectorButton:{control:"boolean",description:"Mostrar botón de seleccionar columnas",table:{defaultValue:{summary:"true"}}},emptyStateNoDataTitle:{control:{type:"text"},description:"Título del empty state cuando no hay datos",table:{defaultValue:{summary:"No hay datos"}}},emptyStateNoDataDescription:{control:{type:"text"},description:"Descripción del empty state cuando no hay datos"},emptyStateNoDataIcon:{control:{type:"text"},description:'Icono FontAwesome del empty state cuando no hay datos (ej: "inbox", "database")'},emptyStateNoDataActionLabel:{control:{type:"text"},description:"Texto del botón de acción cuando no hay datos"},emptyStateNoDataShowPrimaryButton:{control:"boolean",description:"Mostrar botón primario cuando no hay datos",table:{defaultValue:{summary:"false"}}},emptyStateNoSearchResultsTitle:{control:{type:"text"},description:"Título del empty state cuando no hay resultados de búsqueda",table:{defaultValue:{summary:"No se encontraron resultados"}}},emptyStateNoSearchResultsDescription:{control:{type:"text"},description:"Descripción del empty state cuando no hay resultados de búsqueda"},emptyStateNoSearchResultsIcon:{control:{type:"text"},description:'Icono FontAwesome del empty state cuando no hay resultados de búsqueda (ej: "search")'},emptyStateNoSearchResultsActionLabel:{control:{type:"text"},description:"Texto del botón de acción cuando no hay resultados de búsqueda"},emptyStateNoSearchResultsShowPrimaryButton:{control:"boolean",description:"Mostrar botón primario cuando no hay resultados de búsqueda",table:{defaultValue:{summary:"false"}}},emptyStateNoFilterResultsTitle:{control:{type:"text"},description:"Título del empty state cuando no hay resultados de filtros",table:{defaultValue:{summary:"No hay resultados con los filtros aplicados"}}},emptyStateNoFilterResultsDescription:{control:{type:"text"},description:"Descripción del empty state cuando no hay resultados de filtros"},emptyStateNoFilterResultsIcon:{control:{type:"text"},description:'Icono FontAwesome del empty state cuando no hay resultados de filtros (ej: "filter")'},emptyStateNoFilterResultsActionLabel:{control:{type:"text"},description:"Texto del botón de acción cuando no hay resultados de filtros"},emptyStateNoFilterResultsShowPrimaryButton:{control:"boolean",description:"Mostrar botón primario cuando no hay resultados de filtros",table:{defaultValue:{summary:"true"}}}}},De={render:e=>{`${Date.now()}${Math.random().toString(36).substr(2,9)}`;const M=document.createElement("div");M.style.cssText=`
      padding: 20px;
      background: var(--ubits-bg-1, #ffffff);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;const Q=`data-table-story-container-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,D=document.createElement("div");D.id=Q,D.style.cssText=`
      width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `,M.querySelectorAll('[id^="data-table-story-container-"]').forEach(i=>{const l=i.querySelector(".ubits-data-table"),d=i.querySelector(".ubits-data-table__scrollable-container");if(d){const g=d.querySelector(".ubits-data-table");if(g){const E=g;if(E._dataTableInstance)try{const T=E._dataTableInstance;T&&typeof T.destroy=="function"&&T.destroy()}catch{}}}else if(l){const g=l;if(g._dataTableInstance)try{const E=g._dataTableInstance;E&&typeof E.destroy=="function"&&E.destroy()}catch{}}i.remove()});const x=e.columnsCount??3,k=e.columnType1??"nombre",j=e.columnType2??"correo",u=e.columnType3??"estado",$=e.columnType4??"nombre",t=e.columnType5??"nombre",X=e.columnType6??"nombre",V=e.columnType7??"pais",O=e.columnType8??"fecha",re=e.columnType9??"nombre",he=e.columnType10??"estado",Ee=e.column1AvatarVariant??"initials",oe=e.column1Editable??!1,ce=e.column2EmailClickable??!0,Ce=e.column3Editable??!1,le=e.column3RadioLabel??!1,Z=e.column3ToggleLabel??!1,ee=e.column3CheckboxLabel!==void 0?e.column3CheckboxLabel:!0,me={correo:{id:"email",title:"Email"},fecha:{id:"fecha",title:"Fecha"},nombre:{id:"nombre",title:"Nombre"},"nombre-avatar":{id:"nombre",title:"Nombre"},"nombre-avatar-texto":{id:"nombre",title:"Nombre"},estado:{id:"estado",title:"Estado"},progreso:{id:"progreso",title:"Progreso"},pais:{id:"pais",title:"País"},ciudad:{id:"ciudad",title:"Ciudad"},radio:{id:"radio",title:"Selección"},toggle:{id:"toggle",title:"Activo"},checkbox:{id:"checkbox-col",title:"Marcar"},telefono:{id:"telefono",title:"Teléfono"},categoria:{id:"categoria",title:"Categoría"},prioridad:{id:"prioridad",title:"Prioridad"}},te=(i,l,d,g={})=>{const E={id:l.id,title:l.title,type:i,visible:!0,width:d};return(i==="nombre-avatar"||i==="nombre-avatar-texto")&&(E.avatarVariant=g.avatarVariant||"initials"),["nombre","nombre-avatar","nombre-avatar-texto","estado","fecha","checkbox","radio"].includes(i)&&(E.editable=g.editable||!1),i==="correo"&&(E.emailClickable=g.emailClickable!==void 0?g.emailClickable:!0),i==="radio"&&(E.radioLabel=g.radioLabel!==void 0?g.radioLabel:!1),i==="toggle"&&(E.toggleLabel=g.toggleLabel!==void 0?g.toggleLabel:!1),i==="checkbox"&&(E.checkboxLabel=g.checkboxLabel!==void 0?g.checkboxLabel:!0),E},ge=me[k]||{id:"nombre",title:"Nombre"},ae=te(k,ge,200,{avatarVariant:Ee,editable:oe}),I=me[j]||{id:"email",title:"Email"},xe=te(j,I,250,{emailClickable:ce,editable:oe}),Ie=me[u]||{id:"estado",title:"Estado"},G=te(u,Ie,150,{editable:Ce,radioLabel:le,toggleLabel:Z,checkboxLabel:ee}),Pe=me[$]||{id:"progreso",title:"Progreso"},de=te($,Pe,180),Se=me[t]||{id:"telefono",title:"Teléfono"},B=me[X]||{id:"ciudad",title:"Ciudad"},J=me[V]||{id:"pais",title:"País"},H=me[O]||{id:"fecha",title:"Fecha"},K=me[re]||{id:"categoria",title:"Categoría"},ve=me[he]||{id:"prioridad",title:"Prioridad"},Le=[ae,xe,G,de,te(t,Se,150),te(X,B,150),te(V,J,150),te(O,H,150),te(re,K,150),te(he,ve,150)].slice(0,x),ne=(i,l)=>({...i,radio:l===1,toggle:i.estado==="Activo","checkbox-col":l%2===0,area:i.area||"",textoComplementario:i.area||"",progreso:i.progreso||0,telefono:i.telefono||"",ciudad:i.ciudad||"",pais:i.pais||"",fecha:i.fecha||"",categoria:i.categoria||"",prioridad:i.prioridad||""}),ie=[{id:1,nombre:"Juan Pérez",email:"juan.perez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"JP",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:2,nombre:"María García",email:"maria.garcia@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"MG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:3,nombre:"Carlos López",email:"carlos.lopez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"CL",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:4,nombre:"Ana Martínez",email:"ana.martinez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AM",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:5,nombre:"Pedro Rodríguez",email:"pedro.rodriguez@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"PR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:6,nombre:"Valentina Torres",email:"valentina.torres@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"VT",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:7,nombre:"Roberto Fernández",email:"roberto.fernandez@empresa.com",estado:"Inactivo",area:"Marketing",avatar:{initials:"RF",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:8,nombre:"Carmen Torres",email:"carmen.torres@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"CT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:9,nombre:"Diego Morales",email:"diego.morales@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"DM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:10,nombre:"Isabel Moreno",email:"isabel.moreno@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"IM",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:11,nombre:"Andrés Ramírez",email:"andres.ramirez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AR",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:12,nombre:"Patricia Sánchez",email:"patricia.sanchez@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"PS",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:13,nombre:"Fernando Castro",email:"fernando.castro@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"FC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:14,nombre:"Gabriela Herrera",email:"gabriela.herrera@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"GH",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:15,nombre:"Ricardo Mendoza",email:"ricardo.mendoza@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"RM",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:16,nombre:"Claudia Vargas",email:"claudia.vargas@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CV",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:17,nombre:"Javier Ortiz",email:"javier.ortiz@empresa.com",estado:"Inactivo",area:"Marketing",avatar:{initials:"JO",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:18,nombre:"Daniela Jiménez",email:"daniela.jimenez@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DJ",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:19,nombre:"Miguel Ángel Ruiz",email:"miguel.ruiz@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"MR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:20,nombre:"Elena Castillo",email:"elena.castillo@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"EC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:21,nombre:"Óscar Gutiérrez",email:"oscar.gutierrez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"OG",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:22,nombre:"Natalia Rojas",email:"natalia.rojas@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"NR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:23,nombre:"Luis Fernando Mejía",email:"luis.mejia@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:24,nombre:"Andrea Salazar",email:"andrea.salazar@empresa.com",estado:"Pendiente",area:"Recursos Humanos",avatar:{initials:"AS",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:25,nombre:"Cristian Peña",email:"cristian.pena@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"CP",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:26,nombre:"Monica Restrepo",email:"monica.restrepo@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"MR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:27,nombre:"Esteban Cardona",email:"esteban.cardona@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"EC",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:28,nombre:"Paola Agudelo",email:"paola.agudelo@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"PA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:29,nombre:"Sergio Velásquez",email:"sergio.velasquez@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"SV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:30,nombre:"Carolina Zapata",email:"carolina.zapata@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CZ",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:31,nombre:"Felipe Ospina",email:"felipe.ospina@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"FO",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:32,nombre:"Tatiana Montoya",email:"tatiana.montoya@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"TM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:33,nombre:"Alejandro Betancur",email:"alejandro.betancur@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"AB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:34,nombre:"Diana Cárdenas",email:"diana.cardenas@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"DC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:35,nombre:"Jorge Iván Londoño",email:"jorge.londono@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"JL",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:36,nombre:"Mariana Uribe",email:"mariana.uribe@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"MU",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:37,nombre:"Camilo Arango",email:"camilo.arango@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"CA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:38,nombre:"Liliana Osorio",email:"liliana.osorio@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"LO",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:39,nombre:"Andrés Felipe Quintero",email:"andres.quintero@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"AQ",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:40,nombre:"Sandra Milena Gómez",email:"sandra.gomez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"SG",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:41,nombre:"Héctor Fabio Muñoz",email:"hector.munoz@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"HM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:42,nombre:"Yenny Alexandra Parra",email:"yenny.parra@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"YP",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:43,nombre:"Jhon Jairo Vélez",email:"jhon.velez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"JV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:44,nombre:"Adriana Marcela Henao",email:"adriana.henao@empresa.com",estado:"Pendiente",area:"Recursos Humanos",avatar:{initials:"AH",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:45,nombre:"Edwin Mauricio Zapata",email:"edwin.zapata@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"EZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:46,nombre:"Mónica Patricia Bedoya",email:"monica.bedoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"MB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:47,nombre:"William Alberto Giraldo",email:"william.giraldo@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"WG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:48,nombre:"Angélica María Cano",email:"angelica.cano@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:49,nombre:"Leonardo Fabio Ríos",email:"leonardo.rios@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"LR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:50,nombre:"Claudia Patricia Arbeláez",email:"claudia.arbelaez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CA",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:51,nombre:"Jairo Alonso Tobón",email:"jairo.tobon@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:52,nombre:"Gloria Inés Mejía",email:"gloria.mejia@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"GM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:53,nombre:"Mauricio Esteban Lopera",email:"mauricio.lopera@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"ML",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:54,nombre:"Beatriz Elena Castrillón",email:"beatriz.castrillon@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"BC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:55,nombre:"César Augusto Restrepo",email:"cesar.restrepo@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CR",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:56,nombre:"Dora Luz Aguirre",email:"dora.aguirre@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:57,nombre:"Óscar Darío Valencia",email:"oscar.valencia@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"OV",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:58,nombre:"Nubia Esperanza Cardona",email:"nubia.cardona@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"NC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:59,nombre:"Alberto Mario Zapata",email:"alberto.zapata@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"AZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:60,nombre:"Esperanza María Ochoa",email:"esperanza.ochoa@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"EO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:61,nombre:"Jorge Mario Gallego",email:"jorge.gallego@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JG",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:62,nombre:"Blanca Nubia Arango",email:"blanca.arango@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"BA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:63,nombre:"Fabio Nelson Uribe",email:"fabio.uribe@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"FU",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:64,nombre:"Martha Cecilia Londoño",email:"martha.londono@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"ML",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:65,nombre:"Hernán Darío Osorio",email:"hernan.osorio@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"HO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:66,nombre:"Luz Dary Montoya",email:"luz.montoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:67,nombre:"Carlos Mario Betancur",email:"carlos.betancur@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"CB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:68,nombre:"Olga Lucía Cárdenas",email:"olga.cardenas@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"OC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:69,nombre:"Jairo Hernán Quintero",email:"jairo.quintero@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JQ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:70,nombre:"Amparo Gómez",email:"amparo.gomez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AG",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:71,nombre:"Gustavo Adolfo Muñoz",email:"gustavo.munoz@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"GM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:72,nombre:"Rosa Elena Parra",email:"rosa.parra@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"RP",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:73,nombre:"Alvaro de Jesús Vélez",email:"alvaro.velez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:74,nombre:"María Eugenia Henao",email:"maria.henao@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"MH",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:75,nombre:"Jhonatan Zapata",email:"jhonatan.zapata@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"JZ",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:76,nombre:"Yolanda Bedoya",email:"yolanda.bedoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"YB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:77,nombre:"Edison Giraldo",email:"edison.giraldo@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"EG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:78,nombre:"Luz Marina Cano",email:"luz.cano@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"LC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:79,nombre:"Jhon Fredy Ríos",email:"jhon.rios@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:80,nombre:"Nancy Arbeláez",email:"nancy.arbelaez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"NA",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:81,nombre:"Jairo Tobón",email:"jairo.tobon2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:82,nombre:"Gloria Mejía",email:"gloria.mejia2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"GM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:83,nombre:"Mauricio Lopera",email:"mauricio.lopera2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"ML",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:84,nombre:"Beatriz Castrillón",email:"beatriz.castrillon2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"BC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:85,nombre:"César Restrepo",email:"cesar.restrepo2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CR",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:86,nombre:"Dora Aguirre",email:"dora.aguirre2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:87,nombre:"Óscar Valencia",email:"oscar.valencia2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"OV",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:88,nombre:"Nubia Cardona",email:"nubia.cardona2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"NC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:89,nombre:"Alberto Zapata",email:"alberto.zapata2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"AZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:90,nombre:"Esperanza Ochoa",email:"esperanza.ochoa2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"EO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:91,nombre:"Jorge Gallego",email:"jorge.gallego2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JG",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:92,nombre:"Blanca Arango",email:"blanca.arango2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"BA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:93,nombre:"Fabio Uribe",email:"fabio.uribe2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"FU",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:94,nombre:"Martha Londoño",email:"martha.londono2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"ML",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:95,nombre:"Hernán Osorio",email:"hernan.osorio2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"HO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:96,nombre:"Luz Montoya",email:"luz.montoya2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:97,nombre:"Carlos Betancur",email:"carlos.betancur2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"CB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:98,nombre:"Olga Cárdenas",email:"olga.cardenas2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"OC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:99,nombre:"Jairo Quintero",email:"jairo.quintero2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JQ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:100,nombre:"Amparo Gómez",email:"amparo.gomez2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AG",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}}].map(l=>({id:l.id,data:ne({nombre:l.nombre,email:l.email,estado:l.estado,area:l.area,progreso:Math.floor(Math.random()*100),telefono:`+57 ${300+l.id} ${Math.floor(Math.random()*1e3)} ${Math.floor(Math.random()*1e4)}`,ciudad:["Bogotá","Medellín","Cali","Barranquilla","Cartagena"][Math.floor(Math.random()*5)],pais:"Colombia",fecha:`2024-${String(Math.floor(Math.random()*12)+1).padStart(2,"0")}-${String(Math.floor(Math.random()*28)+1).padStart(2,"0")}`,categoria:l.area,prioridad:["Alta","Media","Baja"][Math.floor(Math.random()*3)],"checkbox-2":!1,avatar:l.avatar},l.id),expanded:!1,renderExpandedContent:d=>`
            <div style="padding: var(--ubits-spacing-md, 16px);">
              <h4 style="margin: 0 0 var(--ubits-spacing-sm, 8px) 0; font-size: var(--ubits-font-size-sm, 14px); font-weight: 600; color: var(--ubits-fg-1-high, #1f2937);">
                Información adicional
              </h4>
              <p style="margin: 0; font-size: var(--ubits-font-size-sm, 13px); color: var(--ubits-fg-1-medium, #6b7280);">
                Detalles adicionales para ${d.nombre}
              </p>
            </div>
          `})),W={selectedRowIds:new Set,viewSelectedActive:!1},Te=i=>{const l=i.querySelector(".ubits-data-table__header");if(!l){console.log("🎯 [ACTION BAR] Header no encontrado");return}let d=i.querySelector(".ubits-data-table__action-bar");d||(d=document.createElement("div"),d.className="ubits-data-table__action-bar",d.style.cssText=`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: var(--ubits-spacing-sm) 0;
          gap: var(--ubits-spacing-xs);
          flex-wrap: wrap;
          background-color: var(--ubits-bg-1);
        `,l.insertAdjacentElement("afterend",d),console.log("🎯 [ACTION BAR] Barra creada"));const g=W.selectedRowIds.size,E=Array.from(W.selectedRowIds);if(console.log("🎯 [ACTION BAR] Renderizando - Selecciones:",{count:g,ids:E.slice(0,10),total:E.length}),g===0){d.style.display="none",console.log("🎯 [ACTION BAR] Barra ocultada - no hay selecciones");return}d.style.display="flex",console.log("🎯 [ACTION BAR] Barra mostrada - hay",g,"selección(es)");const T=`(${g})`,_=g>1;let q="";const F=W.viewSelectedActive,A=F?`Dejar de ver seleccionados ${T}`:`Ver seleccionados ${T}`,P=F?"eye-slash":"eye";_?(console.log("🎯 [ACTION BAR] Modo masivo - mostrando ver seleccionados, notificaciones y eliminar"),q=we({variant:"secondary",size:"sm",text:A,icon:P,iconStyle:"regular",active:F,attributes:{id:"action-btn-view-selected"}})+we({variant:"secondary",size:"sm",icon:"bell",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-notifications"}})+we({variant:"secondary",size:"sm",icon:"trash",iconStyle:"regular",iconOnly:!0,className:"ubits-button--error",attributes:{id:"action-btn-delete"}})):(console.log("🎯 [ACTION BAR] Modo individual - mostrando todos los botones"),q=we({variant:"secondary",size:"sm",text:A,icon:P,iconStyle:"regular",active:F,attributes:{id:"action-btn-view-selected"}})+we({variant:"secondary",size:"sm",icon:"bell",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-notifications"}})+we({variant:"secondary",size:"sm",icon:"copy",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-copy"}})+we({variant:"secondary",size:"sm",icon:"eye",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-view"}})+we({variant:"secondary",size:"sm",icon:"edit",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-edit"}})+we({variant:"secondary",size:"sm",icon:"download",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-download"}})+we({variant:"secondary",size:"sm",icon:"trash",iconStyle:"regular",iconOnly:!0,className:"ubits-button--error",attributes:{id:"action-btn-delete"}})),d.innerHTML=q;const v=d.querySelector("#action-btn-view-selected");v&&v.addEventListener("click",()=>{if(W.viewSelectedActive=!W.viewSelectedActive,fe){const Y=W.viewSelectedActive?ie.filter(N=>W.selectedRowIds.has(N.id)):ie;fe.update({rows:Y})}Te(i)}),["notifications","copy","view","edit","download","delete"].forEach(Y=>{const N=d.querySelector(`#action-btn-${Y}`);N&&N.addEventListener("click",()=>{console.log(`Action: ${Y}`,Array.from(W.selectedRowIds))})})};let be=null,fe=null;const C=e.dragHandleSticky??!1,f=C?!0:e.rowReorderable??!0,r=e.expandSticky??!1,b=r?!0:e.rowExpandable??!0,p=e.headerTitle??"Lista de elementos",c=e.showHeaderTitle!==void 0?e.showHeaderTitle:!0,o=e.headerCounter!==void 0?e.headerCounter:!0,n=e.headerDisplayedItems??32,a=e.headerTotalItems??206,s=e.showHeaderPrimaryButton!==void 0?e.showHeaderPrimaryButton:!0,m=e.headerPrimaryButtonText??"Nuevo",w=e.showHeaderSecondaryButtons!==void 0?e.showHeaderSecondaryButtons:!0,R=e.showHeaderSearchButton!==void 0?e.showHeaderSearchButton:!0,h=e.showHeaderFilterButton!==void 0?e.showHeaderFilterButton:!0,S=e.showHeaderColumnSelectorButton!==void 0?e.showHeaderColumnSelectorButton:!0,y={containerId:D.id,columns:Le,rows:ie,columnReorderable:e.columnReorderable??!0,rowReorderable:f,rowExpandable:b,columnSortable:e.columnSortable??!0,showCheckbox:e.showCheckbox??!0,showVerticalScrollbar:e.showVerticalScrollbar??!1,showHorizontalScrollbar:e.showHorizontalScrollbar??!1,showColumnMenu:e.showColumnMenu??!0,checkboxSticky:e.checkboxSticky??!1,dragHandleSticky:C,expandSticky:r,showPagination:e.showPagination??!1,currentPage:e.currentPage??1,itemsPerPage:e.itemsPerPage??10,paginationVariant:e.paginationVariant??"default",paginationSize:e.paginationSize??"md",lazyLoad:!1,header:{title:c?p:void 0,showTitle:c,counter:o==="total-only"?"total-only":!!o,displayedItems:n,totalItems:a,showCounter:o,primaryButton:s?{text:m,icon:"plus",iconStyle:"regular",onClick:i=>{console.log("Botón primario clickeado"),alert("Botón primario: "+m)}}:void 0,showPrimaryButton:s,secondaryButtons:w?[{text:"Exportar",icon:"download",iconStyle:"regular",onClick:i=>{console.log("Botón secundario 1 clickeado"),alert("Exportar")}},{text:"Importar",icon:"upload",iconStyle:"regular",onClick:i=>{console.log("Botón secundario 2 clickeado"),alert("Importar")}}]:void 0,showSecondaryButtons:w,searchButton:R?{placeholder:"Buscar...",value:"",onChange:i=>{console.log("Búsqueda:",i)},onClick:i=>{console.log("Botón de búsqueda clickeado")},onSearch:(i,l)=>{console.log("Búsqueda realizada:",i,"Filas encontradas:",l.length)}}:void 0,showSearchButton:R,filterButton:h?{onClick:i=>{console.log("Botón de filtros clickeado")},onApplyFilters:i=>{console.log("Filtros aplicados:",i)},onClearFilters:()=>{console.log("Filtros limpiados")}}:void 0,showFilterButton:h,columnSelectorButton:S?{onClick:i=>{console.log("Botón de seleccionar columnas clickeado")}}:void 0,showColumnSelectorButton:S},emptyState:{noData:{title:e.emptyStateNoDataTitle||"No hay datos",description:e.emptyStateNoDataDescription||"No se han agregado elementos aún. Comienza agregando tu primer elemento.",icon:e.emptyStateNoDataIcon||"inbox",actionLabel:e.emptyStateNoDataActionLabel,showPrimaryButton:e.emptyStateNoDataShowPrimaryButton||!1,onAction:e.emptyStateNoDataActionLabel?()=>{console.log("Empty state - No data: acción ejecutada"),alert("Acción ejecutada desde empty state (no hay datos)")}:void 0},noSearchResults:{title:e.emptyStateNoSearchResultsTitle||"No se encontraron resultados",description:e.emptyStateNoSearchResultsDescription||"Intenta con otros términos de búsqueda o ajusta los filtros.",icon:e.emptyStateNoSearchResultsIcon||"search",actionLabel:e.emptyStateNoSearchResultsActionLabel,showPrimaryButton:e.emptyStateNoSearchResultsShowPrimaryButton||!1,onAction:e.emptyStateNoSearchResultsActionLabel?()=>{console.log("Empty state - No search results: acción ejecutada"),alert("Acción ejecutada desde empty state (no hay resultados de búsqueda)")}:void 0},noFilterResults:{title:e.emptyStateNoFilterResultsTitle||"No hay resultados con los filtros aplicados",description:e.emptyStateNoFilterResultsDescription||"Intenta ajustar los filtros para ver más resultados.",icon:e.emptyStateNoFilterResultsIcon||"filter",actionLabel:e.emptyStateNoFilterResultsActionLabel||"Limpiar filtros",showPrimaryButton:e.emptyStateNoFilterResultsShowPrimaryButton!==void 0?e.emptyStateNoFilterResultsShowPrimaryButton:!0,onAction:()=>{console.log("Empty state - No filter results: limpiando filtros"),fe&&alert("Limpiando filtros...")}}},lazyLoad:!1,onPageChange:i=>{console.log("Page changed to:",i),e.onPageChange&&e.onPageChange(i)},onItemsPerPageChange:i=>{console.log("Items per page changed to:",i),e.onItemsPerPageChange&&e.onItemsPerPageChange(i)},onRowExpand:(i,l)=>{},onColumnReorder:i=>{},onRowReorder:i=>{},onSort:(i,l)=>{},onColumnPin:(i,l)=>{},onRowSelect:(i,l)=>{console.log("🎯 [ROW SELECT] ========== INICIO =========="),console.log("🎯 [ROW SELECT] rowId:",i,"selected:",l),console.log("🎯 [ROW SELECT] Estado ANTES:",{count:W.selectedRowIds.size,ids:Array.from(W.selectedRowIds)}),l?(W.selectedRowIds.add(i),console.log("🎯 [ROW SELECT] ✅ Fila agregada al estado")):(W.selectedRowIds.delete(i),console.log("🎯 [ROW SELECT] ❌ Fila removida del estado")),console.log("🎯 [ROW SELECT] Estado DESPUÉS:",{count:W.selectedRowIds.size,ids:Array.from(W.selectedRowIds)});const d=document.getElementById(Q);d?(console.log("🎯 [ROW SELECT] Actualizando barra de acciones..."),Te(d)):console.warn("🎯 [ROW SELECT] ⚠️ Container no encontrado:",Q),console.log("🎯 [ROW SELECT] ========== FIN ==========")},onSelectAll:i=>{console.log("🎯 [SELECT ALL] ========== INICIO =========="),console.log("🎯 [SELECT ALL] selected:",i),console.log("🎯 [SELECT ALL] Estado ANTES:",{count:W.selectedRowIds.size,ids:Array.from(W.selectedRowIds).slice(0,10)});const l=document.getElementById(Q);if(l){const d=l.querySelector(".ubits-data-table");if(d){const g=d.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]');console.log("🎯 [SELECT ALL] Checkboxes encontrados:",g.length),g.forEach(E=>{const T=E.getAttribute("data-row-id");if(T){const _=isNaN(Number(T))?T:Number(T);i?W.selectedRowIds.add(_):W.selectedRowIds.delete(_)}}),console.log("🎯 [SELECT ALL] Estado DESPUÉS:",{count:W.selectedRowIds.size,ids:Array.from(W.selectedRowIds).slice(0,10)})}else console.warn("🎯 [SELECT ALL] ⚠️ Tabla no encontrada");Te(l)}else console.warn("🎯 [SELECT ALL] ⚠️ Container no encontrado:",Q);console.log("🎯 [SELECT ALL] ========== FIN ==========")}};M.appendChild(D);const L=()=>{const i=document.getElementById(Q);if(!i)return!1;const l=i.querySelector(".ubits-data-table"),d=i.querySelector(".ubits-data-table__scrollable-container");return l||d?!1:(fe=ta(y),window.__storybookDataTableInstance=fe,setTimeout(()=>{const g=document.getElementById(Q);g&&(Te(g),be||(be=new MutationObserver(()=>{g.querySelector(".ubits-data-table__action-bar")||setTimeout(()=>{Te(g)},100)}),be.observe(g,{childList:!0,subtree:!0})))},200),!0)};return requestAnimationFrame(()=>{try{L()||setTimeout(()=>{L()},50)}catch(i){console.error("❌ [STORY] Error creating data table:",i)}}),M},args:{columnReorderable:!0,rowReorderable:!0,rowExpandable:!0,columnSortable:!0,showCheckbox:!0,showVerticalScrollbar:!1,showHorizontalScrollbar:!1,showColumnMenu:!0,checkboxSticky:!1,dragHandleSticky:!1,expandSticky:!1,columnsCount:3,columnType1:"nombre",columnType2:"correo",columnType3:"estado",columnType4:"nombre",column1AvatarVariant:"initials",column1Editable:!1,column2EmailClickable:!0,column3Editable:!1,column3RadioLabel:!1,column3ToggleLabel:!1,column3CheckboxLabel:!1,showPagination:!1,currentPage:1,itemsPerPage:10,paginationVariant:"default",paginationSize:"md",headerTitle:"Lista de elementos",showHeaderTitle:!0,headerCounter:!0,headerDisplayedItems:32,headerTotalItems:206,showHeaderPrimaryButton:!0,headerPrimaryButtonText:"Nuevo",showHeaderSecondaryButtons:!0,showHeaderSearchButton:!0,showHeaderFilterButton:!0,showHeaderColumnSelectorButton:!0}};De.parameters={...De.parameters,docs:{...De.parameters?.docs,source:{originalSource:`{
  render: args => {
    const renderId = \`story-render-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;

    // Contenedor principal con estilos UBITS
    const container = document.createElement('div');
    container.style.cssText = \`
      padding: 20px;
      background: var(--ubits-bg-1, #ffffff);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    \`;

    // Contenedor para la tabla - crear uno nuevo cada vez pero con ID único
    // Usar un ID único basado en timestamp para evitar conflictos entre renders
    const tableContainerId = \`data-table-story-container-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = \`
      width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    \`;

    // Buscar y limpiar cualquier tabla anterior en el contenedor principal
    // Esto previene renderizados duplicados cuando se cambian los tipos de columna
    const existingContainers = container.querySelectorAll('[id^="data-table-story-container-"]');
    existingContainers.forEach(oldContainer => {
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
                instance.destroy();
              }
            } catch (e) {
              // Silently ignore
            }
          }
        }
      } else if (oldTable) {
        const tableElement = oldTable as HTMLElement;
        if ((tableElement as any)._dataTableInstance) {
          try {
            const instance = (tableElement as any)._dataTableInstance;
            if (instance && typeof instance.destroy === 'function') {
              instance.destroy();
            }
          } catch (e) {
            // Silently ignore
          }
        }
      }
      oldContainer.remove();
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
        renderExpandedContent: data => {
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
        }
      }));
    };

    // Filas que coinciden con la implementación de la web (100 filas)
    // Incluir todos los campos necesarios para que funcionen con cualquier tipo de columna
    const rows: TableRow[] = generateAllRows();

    // ========== BARRA DE ACCIONES - IMPLEMENTACIÓN DESDE CERO ==========
    // Estado de selecciones (simple y limpio)
    const selectionState: {
      selectedRowIds: Set<string | number>;
      viewSelectedActive: boolean;
    } = {
      selectedRowIds: new Set(),
      viewSelectedActive: false
    };

    // Función para renderizar la barra de acciones
    const renderActionBar = (container: HTMLElement) => {
      const header = container.querySelector('.ubits-data-table__header');
      if (!header) {
        console.log('🎯 [ACTION BAR] Header no encontrado');
        return;
      }

      // Buscar barra existente
      let actionBar = container.querySelector('.ubits-data-table__action-bar') as HTMLElement;

      // Si no existe, crearla
      if (!actionBar) {
        actionBar = document.createElement('div');
        actionBar.className = 'ubits-data-table__action-bar';
        actionBar.style.cssText = \`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: var(--ubits-spacing-sm) 0;
          gap: var(--ubits-spacing-xs);
          flex-wrap: wrap;
          background-color: var(--ubits-bg-1);
        \`;
        header.insertAdjacentElement('afterend', actionBar);
        console.log('🎯 [ACTION BAR] Barra creada');
      }

      // Contar selecciones
      const selectedCount = selectionState.selectedRowIds.size;
      const selectedIds = Array.from(selectionState.selectedRowIds);
      console.log('🎯 [ACTION BAR] Renderizando - Selecciones:', {
        count: selectedCount,
        ids: selectedIds.slice(0, 10),
        // Mostrar solo los primeros 10
        total: selectedIds.length
      });

      // IMPORTANTE: Ocultar la barra si no hay selecciones, mostrarla si hay al menos una
      if (selectedCount === 0) {
        // Ocultar la barra cuando no hay selecciones
        actionBar.style.display = 'none';
        console.log('🎯 [ACTION BAR] Barra ocultada - no hay selecciones');
        return; // Salir temprano si no hay selecciones
      }

      // Mostrar la barra cuando hay selecciones
      actionBar.style.display = 'flex';
      console.log('🎯 [ACTION BAR] Barra mostrada - hay', selectedCount, 'selección(es)');
      const countText = \`(\${selectedCount})\`;
      const isMultipleSelection = selectedCount > 1;
      let buttonsHTML = '';

      // Estado del botón "Ver seleccionados" (compartido entre ambos modos)
      const isViewSelectedActive = selectionState.viewSelectedActive;
      const viewSelectedText = isViewSelectedActive ? \`Dejar de ver seleccionados \${countText}\` : \`Ver seleccionados \${countText}\`;
      const viewSelectedIcon = isViewSelectedActive ? 'eye-slash' : 'eye';
      if (isMultipleSelection) {
        // Si hay más de 1 selección: mostrar botones de acciones masivas (ver seleccionados, notificaciones y eliminar)
        console.log('🎯 [ACTION BAR] Modo masivo - mostrando ver seleccionados, notificaciones y eliminar');
        buttonsHTML = renderButton({
          variant: 'secondary',
          size: 'sm',
          text: viewSelectedText,
          icon: viewSelectedIcon,
          iconStyle: 'regular',
          active: isViewSelectedActive,
          attributes: {
            id: 'action-btn-view-selected'
          }
        }) + renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'bell',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: {
            id: 'action-btn-notifications'
          }
        }) + renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'trash',
          iconStyle: 'regular',
          iconOnly: true,
          className: 'ubits-button--error',
          attributes: {
            id: 'action-btn-delete'
          }
        });
      } else {
        // Si hay 1 selección: mostrar todos los botones (menú individual)
        console.log('🎯 [ACTION BAR] Modo individual - mostrando todos los botones');
        buttonsHTML = renderButton({
          variant: 'secondary',
          size: 'sm',
          text: viewSelectedText,
          icon: viewSelectedIcon,
          iconStyle: 'regular',
          active: isViewSelectedActive,
          attributes: {
            id: 'action-btn-view-selected'
          }
        }) + renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'bell',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: {
            id: 'action-btn-notifications'
          }
        }) + renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'copy',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: {
            id: 'action-btn-copy'
          }
        }) + renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'eye',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: {
            id: 'action-btn-view'
          }
        }) + renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'edit',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: {
            id: 'action-btn-edit'
          }
        }) + renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'download',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: {
            id: 'action-btn-download'
          }
        }) + renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'trash',
          iconStyle: 'regular',
          iconOnly: true,
          className: 'ubits-button--error',
          attributes: {
            id: 'action-btn-delete'
          }
        });
      }
      actionBar.innerHTML = buttonsHTML;

      // Agregar listeners
      const viewSelectedBtn = actionBar.querySelector('#action-btn-view-selected');
      if (viewSelectedBtn) {
        viewSelectedBtn.addEventListener('click', () => {
          selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
          // Re-renderizar tabla con filtro
          if (tableInstance) {
            const filteredRows = selectionState.viewSelectedActive ? rows.filter(row => selectionState.selectedRowIds.has(row.id)) : rows;
            tableInstance.update({
              rows: filteredRows
            });
          }
          renderActionBar(container);
        });
      }

      // Otros botones (placeholders)
      ['notifications', 'copy', 'view', 'edit', 'download', 'delete'].forEach(action => {
        const btn = actionBar.querySelector(\`#action-btn-\${action}\`);
        if (btn) {
          btn.addEventListener('click', () => {
            console.log(\`Action: \${action}\`, Array.from(selectionState.selectedRowIds));
          });
        }
      });
    };

    // MutationObserver para preservar la barra cuando el Data Table se re-renderiza
    let actionBarObserver: MutationObserver | null = null;
    let tableInstance: ReturnType<typeof createDataTable> | null = null;

    // Si dragHandleSticky está activado, asegurar que rowReorderable también esté activado
    // porque el drag-handle solo se crea cuando rowReorderable es true
    const dragHandleStickyValue = (args as any).dragHandleSticky ?? false;
    const rowReorderableValue = dragHandleStickyValue ? true : args.rowReorderable ?? true;

    // Si expandSticky está activado, asegurar que rowExpandable también esté activado
    const expandStickyValue = (args as any).expandSticky ?? false;
    const rowExpandableValue = expandStickyValue ? true : args.rowExpandable ?? true;

    // Configuración del header
    const headerTitle = (args as any).headerTitle ?? 'Lista de elementos';
    const showHeaderTitle = (args as any).showHeaderTitle !== undefined ? (args as any).showHeaderTitle : true;
    const headerCounter = (args as any).headerCounter !== undefined ? (args as any).headerCounter : true;
    const headerDisplayedItems = (args as any).headerDisplayedItems ?? 32;
    const headerTotalItems = (args as any).headerTotalItems ?? 206;
    const showHeaderPrimaryButton = (args as any).showHeaderPrimaryButton !== undefined ? (args as any).showHeaderPrimaryButton : true;
    const headerPrimaryButtonText = (args as any).headerPrimaryButtonText ?? 'Nuevo';
    const showHeaderSecondaryButtons = (args as any).showHeaderSecondaryButtons !== undefined ? (args as any).showHeaderSecondaryButtons : true;
    const showHeaderSearchButton = (args as any).showHeaderSearchButton !== undefined ? (args as any).showHeaderSearchButton : true;
    const showHeaderFilterButton = (args as any).showHeaderFilterButton !== undefined ? (args as any).showHeaderFilterButton : true;
    const showHeaderColumnSelectorButton = (args as any).showHeaderColumnSelectorButton !== undefined ? (args as any).showHeaderColumnSelectorButton : true;
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
      // Desactivar lazy load por defecto para mostrar todas las filas en Storybook
      lazyLoad: false,
      // Configuración del header
      header: {
        title: showHeaderTitle ? headerTitle : undefined,
        showTitle: showHeaderTitle,
        counter: headerCounter === 'total-only' ? 'total-only' : headerCounter ? true : false,
        displayedItems: headerDisplayedItems,
        totalItems: headerTotalItems,
        showCounter: headerCounter,
        primaryButton: showHeaderPrimaryButton ? {
          text: headerPrimaryButtonText,
          icon: 'plus',
          iconStyle: 'regular',
          onClick: e => {
            console.log('Botón primario clickeado');
            alert('Botón primario: ' + headerPrimaryButtonText);
          }
        } : undefined,
        showPrimaryButton: showHeaderPrimaryButton,
        secondaryButtons: showHeaderSecondaryButtons ? [{
          text: 'Exportar',
          icon: 'download',
          iconStyle: 'regular',
          onClick: e => {
            console.log('Botón secundario 1 clickeado');
            alert('Exportar');
          }
        }, {
          text: 'Importar',
          icon: 'upload',
          iconStyle: 'regular',
          onClick: e => {
            console.log('Botón secundario 2 clickeado');
            alert('Importar');
          }
        }] : undefined,
        showSecondaryButtons: showHeaderSecondaryButtons,
        searchButton: showHeaderSearchButton ? {
          placeholder: 'Buscar...',
          value: '',
          onChange: value => {
            console.log('Búsqueda:', value);
          },
          onClick: e => {
            console.log('Botón de búsqueda clickeado');
          },
          onSearch: (searchTerm, filteredRows) => {
            console.log('Búsqueda realizada:', searchTerm, 'Filas encontradas:', filteredRows.length);
          }
        } : undefined,
        showSearchButton: showHeaderSearchButton,
        filterButton: showHeaderFilterButton ? {
          onClick: e => {
            console.log('Botón de filtros clickeado');
            // Este onClick solo se ejecuta si no hay filtros configurados
          },
          // Los filtros se generan automáticamente basados en las columnas de la tabla
          // Si quieres filtros personalizados, puedes descomentar y configurar:
          // filters: [
          //   {
          //     id: 'nombre',
          //     label: 'Nombre',
          //     columnId: 'nombre',
          //     type: 'text'
          //   }
          // ],
          onApplyFilters: filters => {
            console.log('Filtros aplicados:', filters);
          },
          onClearFilters: () => {
            console.log('Filtros limpiados');
          }
        } : undefined,
        showFilterButton: showHeaderFilterButton,
        columnSelectorButton: showHeaderColumnSelectorButton ? {
          onClick: e => {
            console.log('Botón de seleccionar columnas clickeado');
            // El dropdown se maneja automáticamente, este onClick es opcional
          }
        } : undefined,
        showColumnSelectorButton: showHeaderColumnSelectorButton
      },
      // Configuración de Empty State
      emptyState: {
        noData: {
          title: (args as any).emptyStateNoDataTitle || 'No hay datos',
          description: (args as any).emptyStateNoDataDescription || 'No se han agregado elementos aún. Comienza agregando tu primer elemento.',
          icon: (args as any).emptyStateNoDataIcon || 'inbox',
          actionLabel: (args as any).emptyStateNoDataActionLabel,
          showPrimaryButton: (args as any).emptyStateNoDataShowPrimaryButton || false,
          onAction: (args as any).emptyStateNoDataActionLabel ? () => {
            console.log('Empty state - No data: acción ejecutada');
            alert('Acción ejecutada desde empty state (no hay datos)');
          } : undefined
        },
        noSearchResults: {
          title: (args as any).emptyStateNoSearchResultsTitle || 'No se encontraron resultados',
          description: (args as any).emptyStateNoSearchResultsDescription || 'Intenta con otros términos de búsqueda o ajusta los filtros.',
          icon: (args as any).emptyStateNoSearchResultsIcon || 'search',
          actionLabel: (args as any).emptyStateNoSearchResultsActionLabel,
          showPrimaryButton: (args as any).emptyStateNoSearchResultsShowPrimaryButton || false,
          onAction: (args as any).emptyStateNoSearchResultsActionLabel ? () => {
            console.log('Empty state - No search results: acción ejecutada');
            alert('Acción ejecutada desde empty state (no hay resultados de búsqueda)');
          } : undefined
        },
        noFilterResults: {
          title: (args as any).emptyStateNoFilterResultsTitle || 'No hay resultados con los filtros aplicados',
          description: (args as any).emptyStateNoFilterResultsDescription || 'Intenta ajustar los filtros para ver más resultados.',
          icon: (args as any).emptyStateNoFilterResultsIcon || 'filter',
          actionLabel: (args as any).emptyStateNoFilterResultsActionLabel || 'Limpiar filtros',
          showPrimaryButton: (args as any).emptyStateNoFilterResultsShowPrimaryButton !== undefined ? (args as any).emptyStateNoFilterResultsShowPrimaryButton : true,
          onAction: () => {
            console.log('Empty state - No filter results: limpiando filtros');
            // Limpiar filtros - esto se manejará automáticamente por el componente
            if (tableInstance) {
              // El componente manejará la limpieza de filtros
              alert('Limpiando filtros...');
            }
          }
        }
      },
      lazyLoad: false,
      // Asegurar que lazyLoad esté desactivado
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
        // Callback para filas expandidas
      },
      onColumnReorder: columnIds => {
        // Callback para reordenamiento de columnas
      },
      onRowReorder: rowIds => {
        // Callback para reordenamiento de filas
      },
      onSort: (columnId, direction) => {
        // Callback para ordenamiento
      },
      onColumnPin: (columnId, pinned) => {
        // El sistema interno ya actualiza el estado y re-renderiza
        // Este callback es solo para notificar cambios externos si es necesario
      },
      onRowSelect: (rowId, selected) => {
        console.log('🎯 [ROW SELECT] ========== INICIO ==========');
        console.log('🎯 [ROW SELECT] rowId:', rowId, 'selected:', selected);
        console.log('🎯 [ROW SELECT] Estado ANTES:', {
          count: selectionState.selectedRowIds.size,
          ids: Array.from(selectionState.selectedRowIds)
        });

        // Actualizar estado de selección
        if (selected) {
          selectionState.selectedRowIds.add(rowId);
          console.log('🎯 [ROW SELECT] ✅ Fila agregada al estado');
        } else {
          selectionState.selectedRowIds.delete(rowId);
          console.log('🎯 [ROW SELECT] ❌ Fila removida del estado');
        }
        console.log('🎯 [ROW SELECT] Estado DESPUÉS:', {
          count: selectionState.selectedRowIds.size,
          ids: Array.from(selectionState.selectedRowIds)
        });

        // Actualizar barra de acciones
        const container = document.getElementById(tableContainerId);
        if (container) {
          console.log('🎯 [ROW SELECT] Actualizando barra de acciones...');
          renderActionBar(container);
        } else {
          console.warn('🎯 [ROW SELECT] ⚠️ Container no encontrado:', tableContainerId);
        }
        console.log('🎯 [ROW SELECT] ========== FIN ==========');
      },
      onSelectAll: selected => {
        console.log('🎯 [SELECT ALL] ========== INICIO ==========');
        console.log('🎯 [SELECT ALL] selected:', selected);
        console.log('🎯 [SELECT ALL] Estado ANTES:', {
          count: selectionState.selectedRowIds.size,
          ids: Array.from(selectionState.selectedRowIds).slice(0, 10)
        });

        // Actualizar estado de selección - solo las filas visibles
        const container = document.getElementById(tableContainerId);
        if (container) {
          const table = container.querySelector('.ubits-data-table');
          if (table) {
            const checkboxes = table.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]');
            console.log('🎯 [SELECT ALL] Checkboxes encontrados:', checkboxes.length);
            checkboxes.forEach(cb => {
              const rowIdStr = cb.getAttribute('data-row-id');
              if (rowIdStr) {
                const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                if (selected) {
                  selectionState.selectedRowIds.add(rowId);
                } else {
                  selectionState.selectedRowIds.delete(rowId);
                }
              }
            });
            console.log('🎯 [SELECT ALL] Estado DESPUÉS:', {
              count: selectionState.selectedRowIds.size,
              ids: Array.from(selectionState.selectedRowIds).slice(0, 10)
            });
          } else {
            console.warn('🎯 [SELECT ALL] ⚠️ Tabla no encontrada');
          }
          renderActionBar(container);
        } else {
          console.warn('🎯 [SELECT ALL] ⚠️ Container no encontrado:', tableContainerId);
        }
        console.log('🎯 [SELECT ALL] ========== FIN ==========');
      }
    };

    // Agregar el contenedor de la tabla al contenedor principal
    container.appendChild(tableContainer);

    // Inicializar la tabla después de que se monte en el DOM
    // Usar requestAnimationFrame para asegurar que el DOM esté listo

    // Verificar si ya hay una tabla en el contenedor antes de crear una nueva
    // Esto previene renderizados duplicados cuando Storybook llama al render múltiples veces
    const checkAndCreateTable = () => {
      const containerElement = document.getElementById(tableContainerId);
      if (!containerElement) {
        return false;
      }

      // Verificar si ya hay una tabla en este contenedor
      const existingTable = containerElement.querySelector('.ubits-data-table');
      const existingScrollable = containerElement.querySelector('.ubits-data-table__scrollable-container');
      if (existingTable || existingScrollable) {
        return false;
      }
      tableInstance = createDataTable(options);

      // Guardar referencia a la instancia para poder inspeccionarla
      (window as any).__storybookDataTableInstance = tableInstance;

      // Renderizar barra de acciones después de crear la tabla
      setTimeout(() => {
        const container = document.getElementById(tableContainerId);
        if (container) {
          renderActionBar(container);

          // Configurar MutationObserver para preservar la barra
          if (!actionBarObserver) {
            actionBarObserver = new MutationObserver(() => {
              const bar = container.querySelector('.ubits-data-table__action-bar');
              if (!bar) {
                // La barra fue eliminada, reinsertarla
                setTimeout(() => {
                  renderActionBar(container);
                }, 100);
              }
            });
            actionBarObserver.observe(container, {
              childList: true,
              subtree: true
            });
          }
        }
      }, 200);
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
    paginationSize: 'md',
    // Controles del header
    headerTitle: 'Lista de elementos',
    showHeaderTitle: true,
    headerCounter: true,
    headerDisplayedItems: 32,
    headerTotalItems: 206,
    showHeaderPrimaryButton: true,
    headerPrimaryButtonText: 'Nuevo',
    showHeaderSecondaryButtons: true,
    showHeaderSearchButton: true,
    showHeaderFilterButton: true,
    showHeaderColumnSelectorButton: true
  }
}`,...De.parameters?.docs?.source}}};const Ea=["Default"];export{De as Default,Ea as __namedExportsOrder,va as default};
