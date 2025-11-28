const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BoEJW2yg.js","./preload-helper-PPVm8Dsz.js"])))=>i.map(i=>d[i]);
import{_ as Ve}from"./preload-helper-PPVm8Dsz.js";import{r as Ne}from"./CheckboxProvider-DIr0OIhT.js";import{r as Oe}from"./ProgressProvider-DCMY_PMl.js";import{r as Fe}from"./StatusTagProvider-6gx2PeGG.js";import{r as Ie}from"./AvatarProvider-CF4x-oFR.js";import{r as Ge}from"./ToggleProvider-tayloMCw.js";import{r as Je}from"./RadioButtonProvider-CIXtywXC.js";import{r as Se}from"./ButtonProvider-CX_wJeLD.js";import{c as He,r as De}from"./ListProvider-Dp4g9_1Y.js";import{createScrollbar as ze}from"./ScrollProvider-BVL7eCy8.js";import{r as We}from"./PaginationProvider-D87LW9fs.js";import{c as Ze,r as Ye}from"./search-button-CsKVyrkP.js";import{c as Ue}from"./DrawerProvider-c2gE_l1d.js";import{r as $e,c as Xe}from"./InputProvider-schPVK84.js";import{r as Qe}from"./EmptyStateProvider-lfUvNYft.js";import"./iframe-EN31ESOT.js";import"./SpinnerProvider-o6XHV06V.js";import"./ModalProvider-Cwkz7B9R.js";function Ke(e,D,ae){const R=D.data[e.id],q=D.data;switch(ae){case"nombre":{const k=R||q.nombre||q.name||"";return e.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${k}</span>`:`<span class="ubits-body-md-regular">${k}</span>`}case"progreso":{let k=null;if(R!=null){if(typeof R=="number")k=R;else if(typeof R=="string"){const V=parseFloat(R.replace("%","").trim());isNaN(V)||(k=V)}}if(k===null&&q){const V=q.progress!==void 0?q.progress:q.progreso;if(V!=null){if(typeof V=="number")k=V;else if(typeof V=="string"){const m=parseFloat(V.replace("%","").trim());isNaN(m)||(k=m)}}}return k===null&&(k=50),k=Math.max(0,Math.min(100,k)),Oe({value:k,size:"sm",variant:"default",indicator:`${Math.round(k)}%`})}case"nombre-avatar":{const k=R||q.nombre||q.name||"",x=q.avatar||q.avatarUrl||null,V=e.avatarVariant||"initials",m=O=>O.split(" ").map(te=>te[0]).join("").toUpperCase().slice(0,2)||"U";let J="";if(V==="photo"){let O=null;x&&typeof x=="string"?O=x:x&&typeof x=="object"&&(O=x.imageUrl||x.url||null),!O&&q&&(O=q.imageUrl||q.avatarUrl||q.avatarImage||null),O?J=Ie({imageUrl:O,size:"sm"}):J=Ie({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(V==="initials")if(x&&typeof x=="object"&&x.initials)J=Ie({initials:x.initials,size:"sm"});else{const O=m(k);J=Ie({initials:O,size:"sm"})}else{const O=x&&typeof x=="object"&&x.icon?x.icon:"user";J=Ie({icon:O,size:"sm"})}const W=e.editable?`<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${k}</span>`:`<span class="ubits-body-md-regular">${k}</span>`;return`
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm);">
          ${J}
          ${W}
        </div>
      `}case"nombre-avatar-texto":{const k=R||q.nombre||q.name||"",x=q.avatar||q.avatarUrl||null,V=q.area||q.areaNombre||q.textoComplementario||q.complementario||"",m=e.avatarVariant||"initials",J=F=>F.split(" ").map(O=>O[0]).join("").toUpperCase().slice(0,2)||"U";let t="";if(m==="photo"){let F=null;x&&typeof x=="string"?F=x:x&&typeof x=="object"&&(F=x.imageUrl||x.url||null),!F&&q&&(F=q.imageUrl||q.avatarUrl||q.avatarImage||null),F?t=Ie({imageUrl:F,size:"sm"}):t=Ie({imageUrl:"../assets/images/Profile-image.jpg",size:"sm"})}else if(m==="initials")if(x&&typeof x=="object"&&x.initials)t=Ie({initials:x.initials,size:"sm"});else{const F=J(k);t=Ie({initials:F,size:"sm"})}else{const F=x&&typeof x=="object"&&x.icon?x.icon:"user";t=Ie({icon:F,size:"sm"})}const W=`<span class="ubits-body-md-regular">${k}</span>`;return`
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm);">
          ${t}
          <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-xs);">
            ${W}
            ${V?`<span class="ubits-body-sm-regular" style="color: var(--modifiers-normal-color-light-fg-1-medium);">${V}</span>`:""}
          </div>
        </div>
      `}case"estado":{const k={activo:"active",inactivo:"disabled",pendiente:"pending",completado:"completed",publicado:"published",cumplido:"fulfilled",creado:"created",error:"not-fulfilled",denegado:"denied",borrador:"draft","en-progreso":"in-progress",sincronizando:"syncing","pendiente-aprobacion":"pending-approval","no-iniciado":"not-started",finalizado:"finished",archivado:"archived",deshabilitado:"disabled",pausado:"paused",oculto:"hidden",cancelado:"denied"},x=R||q.estado||q.status||"pendiente",V=String(x).toLowerCase().trim(),m=k[V]||k.pendiente,t={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"}[m]||String(x),W=e.editable,F=Fe({label:t,status:m,size:"xs",rightIcon:W?"chevron-down":null,clickable:W});return W?`
          <div class="ubits-data-table__status-editable" data-row-id="${D.id}" data-column-id="${e.id}" data-editable="true" data-current-status="${m}">
            ${F}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${D.id}-${e.id}" style="display: none;"></div>
          </div>
        `:F}case"radio":{const k=R===!0||R==="true"||R===1||R===D.id||R===String(D.id),x=e.radioLabel!==!1&&e.radioLabel!==void 0,V=typeof e.radioLabel=="string"?e.radioLabel:x?String(D.data[e.id]||D.id):"",m=e.editable===!0,J=!m;return Je({label:V,name:`radio-${e.id}`,value:String(D.id),checked:k,size:"md",disabled:J}).replace("<input",`<input data-row-id="${D.id}" data-column-id="${e.id}" data-radio-button="true" ${m?'data-editable="true"':""}`)}case"toggle":{const k=R===!0||R==="true"||R===1,x=e.toggleLabel!==!1&&e.toggleLabel!==void 0,V=typeof e.toggleLabel=="string"?e.toggleLabel:x?String(D.data[e.id]||D.id):"";return Ge({label:V,checked:k,size:"md"}).replace("<input",`<input data-row-id="${D.id}" data-column-id="${e.id}" data-toggle-button="true"`)}case"checkbox":{const k=R===!0||R==="true"||R===1,x=e.checkboxLabel!==!1&&e.checkboxLabel!==void 0,V=typeof e.checkboxLabel=="string"?e.checkboxLabel:x?String(D.data[e.id]||D.id):"",m=e.editable===!0;return Ne({label:V,checked:k,size:"md",disabled:!m}).replace("<input",`<input data-row-id="${D.id}" data-column-id="${e.id}" data-checkbox-button="true" ${m?'data-editable="true"':""}`)}case"correo":{const k=R||"";return e.emailClickable!==!1?`<a href="mailto:${k}" class="ubits-body-md-regular" style="color: var(--modifiers-normal-color-light-accent-brand); text-decoration: none;">${k}</a>`:`<span class="ubits-body-md-regular">${k}</span>`}case"acciones":return Se({text:"Eliminar",variant:"error",size:"sm",icon:"trash",iconStyle:"regular",className:"ubits-data-table__action-button",attributes:{"data-row-id":String(D.id),"data-column-id":e.id}});case"fecha":{const k=R||"";return e.editable===!0?`
            <div class="ubits-data-table__date-editable" data-row-id="${D.id}" data-column-id="${e.id}">
              <span class="ubits-body-md-regular ubits-data-table__date-display">${k||"Seleccionar fecha"}</span>
            </div>
          `:`<span class="ubits-body-md-regular">${k}</span>`}case"area":return`<span class="ubits-body-md-regular">${R||"Desarrollo"}</span>`;case"lider":return`<span class="ubits-body-md-regular">${R||"Juan Pérez"}</span>`;case"pais":return`<span class="ubits-body-md-regular">${R||"Colombia"}</span>`;case"ciudad":return`<span class="ubits-body-md-regular">${R||"Bogotá"}</span>`;case"drag-handle":return`
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${D.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;case"expand":{const k=D.expanded||!1;return`
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${k?"Colapsar":"Expandir"} fila"
          data-row-id="${D.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${k?"down":"right"}" aria-hidden="true"></i>
        </button>
      `}default:return`<span class="ubits-body-md-regular">${R||""}</span>`}}function ea(e,D,ae=0){if(e.type!=="checkbox"&&(e.id==="checkbox"||e.id.startsWith("checkbox-"))){const V=D.data[e.id]||!1,J=Ne({label:"",checked:V,size:"md",className:"ubits-data-table__cell-checkbox"}).replace("<input",`<input data-row-id="${D.id}" data-column-id="${e.id}" aria-label="Checkbox ${e.title}"`),t=e.id==="checkbox-2"?"12px":"var(--ubits-spacing-md)",W=e.pinned?" ubits-data-table__cell--pinned":"",F=e.pinned?`position: sticky !important; left: ${ae}px !important; z-index: 12 !important;`:"",te=`${`text-align: center; vertical-align: middle; padding-left: ${t} !important;`}${F?" "+F:""}`;return`
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${W}" data-column-id="${e.id}" ${e.pinned?'data-pinned="true"':""} style="${te}">
        ${J}
      </td>
    `}if(e.type){const V=Ke(e,D,e.type),m=e.editable&&(e.type==="nombre"||e.type==="nombre-avatar"||e.type==="estado"||e.type==="fecha"||e.type==="checkbox"||e.type==="radio")&&e.type!=="drag-handle"&&e.type!=="expand",J=e.type==="drag-handle"?"ubits-data-table__cell--drag-handle":e.type==="expand"?"ubits-data-table__cell--expand":`ubits-data-table__cell--${e.type}`,t=m?"ubits-data-table__cell--editable":"",W=e.pinned?" ubits-data-table__cell--pinned":"",F=e.type==="drag-handle"||e.type==="expand"?"text-align: center; vertical-align: middle;":"",O=e.pinned?`position: sticky !important; left: ${ae}px !important; z-index: 12 !important;`:"",te=`${F}${O?" "+O:""}`,ye=te?` style="${te}"`:"",Ce=m&&(e.type==="nombre"||e.type==="nombre-avatar"||e.type==="estado"||e.type==="fecha")?`data-row-id="${D.id}" data-column-id="${e.id}" data-editable="true"${e.pinned?' data-pinned="true"':""}`:`data-column-id="${e.id}"${e.pinned?' data-pinned="true"':""}`;return`
      <td class="ubits-data-table__cell ${J} ${t}${W}" ${Ce}${ye}>
        ${V}
      </td>
    `}const q=e.renderCell?e.renderCell(D.data):D.data[e.id]||"",k=e.pinned?" ubits-data-table__cell--pinned":"",x=e.pinned?` style="position: sticky !important; left: ${ae}px !important; z-index: 12 !important;"`:"";return`
    <td class="ubits-data-table__cell${k}" data-column-id="${e.id}"${e.pinned?' data-pinned="true"':""}${x}>
      ${q}
    </td>
  `}function aa(e,D=!1,ae=!0,R=[],q=null,k=null,x=!0,V=0){if(e.type==="drag-handle"||e.type==="expand"){const K=e.pinned?" ubits-data-table__column-header--pinned":"",ce=e.pinned?`position: sticky !important; left: ${V}px !important; z-index: 10 !important;`:"",ne=e.width?`width: ${e.width}px;`:"",be=[ce,ne].filter(Boolean).join(" "),oe=be?`style="${be}"`:"";return`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${e.type}${K}" 
        ${oe}
        data-column-id="${e.id}"
        ${e.pinned?'data-pinned="true"':""}
      >
      </th>
    `}const m=e.type!=="checkbox"&&(e.id==="checkbox"||e.id.startsWith("checkbox-"));if(e.type,m){const K=R.length>0&&R.every(de=>de.data[e.id]===!0),ce=R.some(de=>de.data[e.id]===!0),be=Ne({label:"",checked:K,indeterminate:ce&&!K,size:"md",className:"ubits-data-table__column-checkbox-header"}).replace("<input",`<input data-column-checkbox-header="${e.id}" aria-label="Seleccionar todos ${e.title}"`),oe=e.pinned?" ubits-data-table__column-header--pinned":"",P=e.pinned?`position: sticky !important; left: ${V}px !important; z-index: 10 !important;`:"",Ee=e.width?`width: ${e.width}px;`:"",Te=[P,Ee].filter(Boolean).join(" "),G=Te?`style="${Te}"`:"";return`
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${oe}" 
        ${G}
        data-column-id="${e.id}"
        ${e.pinned?'data-pinned="true"':""}
      >
        ${be}
      </th>
    `}const J=e.type==="drag-handle"||e.type==="expand",t=D&&!m&&!J?`
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${e.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  `:"",W=!m&&!J&&ae?(()=>{const K=q===e.id,ce=K?" ubits-data-table__column-sort--active":"";let ne="arrow-up-a-z",be="fas fa-sort-alpha-up";return K&&k&&(k==="asc"?(ne="arrow-up-a-z",be="fas fa-sort-alpha-up"):(ne="arrow-down-a-z",be="fas fa-sort-alpha-down")),`
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${ce}" 
           data-column-id="${e.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${e.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${ne}"></wa-icon>
        <i class="${be}" aria-hidden="true"></i>
      </div>
    `})():"",F=!m&&!J&&x?Se({variant:"tertiary",size:"xs",icon:"ellipsis",iconStyle:"solid",iconOnly:!0,className:"ubits-data-table__column-menu-button",attributes:{"aria-label":`Menú de opciones de ${e.title}`,"data-column-id":e.id,"data-menu-button":"true"}}):"",O=`
    <div class="ubits-data-table__column-header-content">
      ${t}
      <span class="ubits-data-table__column-title">${e.title}</span>
      <div class="ubits-data-table__column-actions">
        ${W}
        ${F}
      </div>
    </div>
  `,te=e.pinned?" ubits-data-table__column-header--pinned":"",ye=e.pinned?`left: ${V}px !important;`:"",Ce=e.width?`width: ${e.width}px;`:"",se=e.pinned?"position: sticky !important;":"",fe=e.pinned?"z-index: 10 !important;":"",we=[se,ye,fe,Ce].filter(Boolean).join(" "),pe=we?`style="${we}"`:"";return`
    <th 
      class="ubits-data-table__column-header${te}" 
      ${pe} 
      data-column-id="${e.id}"
      ${e.pinned?'data-pinned="true"':""}
    >
      ${O}
    </th>
  `}function ta(e,D,ae,R=[]){const q=e.expanded||!1,k=D.filter(J=>J.visible!==!1),x=k.map((J,t)=>{const W=R[t]||0;return ea(J,e,W)}).join("");let m=`
    <tr class="${["ubits-data-table__row",q?"ubits-data-table__row--expanded":""].filter(Boolean).join(" ")}" data-row-id="${e.id}">
      ${x}
    </tr>
  `;if(q&&e.renderExpandedContent){const J=e.renderExpandedContent(e.data),t=k.length;m+=`
      <tr class="ubits-data-table__row-expanded-row" data-expanded-for="${e.id}">
        <td class="ubits-data-table__row-expanded-content" colspan="${t}">
          ${J}
        </td>
      </tr>
    `}else q&&!e.renderExpandedContent&&console.warn("📋 [ROW RENDER] ⚠️ Fila marcada como expandida pero no tiene renderExpandedContent - rowId:",e.id);return m}function na(e,D={}){const{header:ae,rows:R}=e;if(!ae)return"";const{title:q,showTitle:k=q!==void 0,counter:x,displayedItems:V,totalItems:m,showCounter:J=x!==void 0&&x!==!1,primaryButton:t,showPrimaryButton:W=t!==void 0,secondaryButtons:F=[],showSecondaryButtons:O=F!==void 0&&F.length>0,searchButton:te,showSearchButton:ye=te!==void 0,filterButton:Ce,showFilterButton:se=Ce!==void 0,columnSelectorButton:fe,showColumnSelectorButton:we=fe!==void 0}=ae,pe=ae.__isSearchActive||!1,le=ae.__searchTerm||"";let K="";if(J&&x){if(typeof x=="string")x==="total-only"?K=`${m!==void 0?m:R.length} resultados`:K=x;else if(x===!0){const de=V!==void 0?V:R.length,xe=m!==void 0?m:R.length;K=`${de}/${xe} resultados`}}const ce=k&&q?`
    <div class="ubits-data-table__header-title">
      <span class="ubits-body-md-bold ubits-data-table__header-title-text">${q}</span>
      ${K?`<span class="ubits-data-table__header-counter ubits-body-sm-regular">${K}</span>`:""}
    </div>
  `:K?`
    <div class="ubits-data-table__header-title">
      <span class="ubits-data-table__header-counter ubits-body-sm-regular">${K}</span>
    </div>
  `:"",ne=W&&t?Se({variant:"primary",size:"sm",icon:t.icon||"plus",iconStyle:t.iconStyle||"regular",iconOnly:!0,disabled:t.disabled||!1,loading:t.loading||!1,className:"ubits-data-table__header-primary-button",showTooltip:!0,tooltipText:t.text||"Nuevo"}):"",be=O&&F.length>0?F.slice(0,2).map(de=>Se({variant:"secondary",size:"sm",icon:de.icon||"download",iconStyle:de.iconStyle||"regular",iconOnly:!0,disabled:de.disabled||!1,loading:de.loading||!1,className:"ubits-data-table__header-secondary-button",showTooltip:!0,tooltipText:de.text||""})).join(""):"",oe=Object.keys(D).filter(de=>D[de]&&D[de].trim()!=="").length;let P=se&&Ce?Se({variant:"secondary",size:"sm",icon:"filter",iconStyle:"regular",iconOnly:!0,disabled:Ce.disabled||!1,active:Ce.active||!1||oe>0,badge:oe>0,className:"ubits-data-table__header-filter-button",showTooltip:!0,tooltipText:"Filtros"}):"";if(P&&oe>0){const de=`<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${oe}</span>`;P=P.replace('<span class="ubits-button__badge"></span>',de)}const Ee=we&&fe?Se({variant:"secondary",size:"sm",icon:"columns-3",iconStyle:"regular",iconOnly:!0,disabled:fe.disabled||!1,active:fe.active||!1,className:"ubits-data-table__header-column-selector-button",showTooltip:!0,tooltipText:"Seleccionar columnas"}):"",Te=le||te&&te.value||"",G=ye&&te?Ye({active:pe,size:"sm",state:pe?"active":"default",disabled:te.disabled||!1,placeholder:te.placeholder||"Buscar...",value:Te,width:248,className:"ubits-data-table__header-search-button"}):"";return!(ce||ne||be||G||P||Ee)?(console.warn("⚠️ [DATA TABLE HEADER] No hay elementos para renderizar, retornando vacío"),""):`
    <div class="ubits-data-table__header">
      ${ce}
      <div class="ubits-data-table__header-actions">
        ${G}
        ${P}
        ${Ee}
        ${be}
        ${ne}
      </div>
    </div>
  `.trim()}function qe(e,D=[],ae=[],R={}){const{columns:q,rows:k,className:x="",columnReorderable:V=!1,columnSortable:m=!0,rowReorderable:J=!1,rowExpandable:t=!0,showCheckbox:W=!0,showVerticalScrollbar:F=!1,showHorizontalScrollbar:O=!1,showColumnMenu:te=!0,showPagination:ye=!1,currentPage:Ce=1,itemsPerPage:se=10,paginationVariant:fe="default",paginationSize:we="md",lazyLoad:pe,lazyLoadItemsPerBatch:le=10,emptyState:K}=e,ce=e.header?.__searchTerm||"",ne=ye?!1:pe!==!1,be=new Set;let P=q.filter(a=>be.has(a.id)?!1:(be.add(a.id),!0)).filter(a=>a.visible!==!1);if(P=P.filter(a=>a.id!=="checkbox"),D.length>0){const a=D.filter(i=>i!=="checkbox"),n=new Map(P.map(i=>{const b={...i};return i.pinned!==void 0&&(b.pinned=i.pinned),[i.id,b]}));P=a.map(i=>{const b=n.get(i);if(b){const p=P.find(E=>E.id===i);p&&p.pinned!==void 0&&(b.pinned=p.pinned)}return b}).filter(i=>i!==void 0).concat(P.filter(i=>!a.includes(i.id)).map(i=>{const b={...i};return i.pinned!==void 0&&(b.pinned=i.pinned),b}))}else P=P.map(a=>{const n={...a};return a.pinned!==void 0&&(n.pinned=a.pinned),n});if(W!==!1){if(!P.some(n=>n.id==="checkbox-2")){const n={id:"checkbox-2",title:"",type:void 0,visible:!0,width:48};P.unshift(n)}}else P.map(a=>a.id),P=P.filter(a=>a.id!=="checkbox-2"),P.map(a=>a.id);if(J){if(!P.some(n=>n.type==="drag-handle")){const n={id:"drag-handle",title:"",type:"drag-handle",visible:!0,width:32};P.unshift(n)}}else P=P.filter(a=>a.type!=="drag-handle");if(t){if(!P.some(n=>n.type==="expand")){const n={id:"expand",title:"",type:"expand",visible:!0,width:32},i=P.findIndex(b=>b.type==="drag-handle");i>=0?P.splice(i+1,0,n):P.unshift(n)}}else P=P.filter(a=>a.type!=="expand");const{checkboxSticky:Ee=!1,dragHandleSticky:Te=!1,expandSticky:G=!1}=e;P=P.map(a=>{const n={...a};return a.id==="checkbox-2"?Ee===!0?n.pinned=!0:n.pinned=!1:a.type==="drag-handle"?Te===!0?n.pinned=!0:n.pinned=!1:a.type==="expand"&&(G===!0?n.pinned=!0:n.pinned=!1),n.pinned&&!a.id.startsWith("checkbox")&&a.type!=="drag-handle"&&a.type,n}),P.filter(a=>a.pinned);const Le=e.sortColumnId||null,de=e.sortDirection||null;let xe=[...k];if(ae.length>0){const a=new Map(k.map(n=>[n.id,n]));xe=ae.map(n=>a.get(n)).filter(n=>n!==void 0).concat(k.filter(n=>!ae.includes(n.id)))}Le&&de&&(xe=[...xe].sort((a,n)=>{const i=a.data[Le],b=n.data[Le];if(i==null&&b==null)return 0;if(i==null)return 1;if(b==null)return-1;const p=String(i).toLowerCase(),E=String(b).toLowerCase();let S=0;return p<E?S=-1:p>E&&(S=1),de==="asc"?S:-S}));const M=(a,n,i)=>{let b=0;const p={columnId:a.id,steps:[]};for(let E=0;E<n;E++){const S=i[E];if(S&&S.pinned){let _=S.width;_||(S.type==="drag-handle"||S.type==="expand"?_=32:S.id==="checkbox-2"?_=48:_=150),b+=_,p.steps.push({step:`columna-${S.id}`,added:_,total:b,reason:`Columna fijada anterior: ${S.id} (tipo: ${S.type||"normal"})`})}else S&&!S.pinned&&p.steps.push({step:`columna-${S.id}`,added:0,total:b,reason:`Columna anterior no fijada: ${S.id}`})}return p.finalLeft=b,a.pinned,b},N=P.map((a,n)=>{const i=a.pinned?M(a,n,P):0;return a.pinned,aa(a,V,m,xe,Le,de,te,i)}).join("");let z=xe,B=1,X="";const ie=e.__lazyLoadCurrentItems||le;if(ye){const a=xe.length;B=Math.max(1,Math.ceil(a/se));const n=Math.max(1,Math.min(Ce,B)),i=(n-1)*se,b=i+se;z=xe.slice(i,b);try{X=We({currentPage:n,totalPages:B,totalItems:a,itemsPerPage:se,variant:fe,size:we,maxVisiblePages:7,showFirst:!1,showLast:!1,showPrevNext:!0,showInfo:!1,showItemsPerPage:!1,itemsPerPageOptions:[10,20,50,100],className:"ubits-data-table__pagination"})}catch(p){console.error("❌ [PAGINATION] ERROR:",p),X=""}}else ne&&(z=xe.slice(0,ie));let he="";const ve=k.length===0,Pe=z.length===0,ke=Object.keys(R).length>0,ue=ce&&ce.trim()!=="";if(Pe&&K){let a;ve&&K.noData?a=K.noData:ue&&K.noSearchResults?a=K.noSearchResults:ke&&K.noFilterResults&&(a=K.noFilterResults),a&&(he=Qe({title:a.title||"No hay resultados",description:a.description,icon:a.icon,imageUrl:a.imageUrl,actionLabel:a.actionLabel,showPrimaryButton:a.showPrimaryButton||!1,primaryButtonIcon:a.primaryButtonIcon,showPrimaryButtonIcon:a.showPrimaryButtonIcon||!1,secondaryActionLabel:a.secondaryActionLabel,showSecondaryButton:a.showSecondaryButton||!1,secondaryButtonIcon:a.secondaryButtonIcon,showSecondaryButtonIcon:a.showSecondaryButtonIcon||!1,className:"ubits-data-table__empty-state"}))}const _e=z.map((a,n)=>{const i=P.map((b,p)=>b.pinned?M(b,p,P):0);return ta(a,P,n,i)}).join(""),me=he||_e,Ae=["ubits-data-table",x].filter(Boolean).join(" "),Be=P.length,U=`
    <table class="${Ae} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${N}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${he?`<tr><td colspan="${Be}" style="padding: 0;">${he}</td></tr>`:me}
      </tbody>
    </table>
  `.trim(),c=P.some(a=>a.pinned);let s=O;c&&!O&&(s=!0);let o=F;ne&&!ye&&(o=!0),!ye&&!ne&&!o&&45+xe.length*45>600&&(o=!0);let l;if(o||s){const a=[];o&&a.push("ubits-data-table__scrollable-container--vertical"),s&&a.push("ubits-data-table__scrollable-container--horizontal"),l=`<div class="ubits-data-table__scrollable-container ${a.join(" ")}">${U}</div>`}else l=U;const u=na(e,R);let r;return ye&&X?r=`<div class="ubits-data-table__container">
      ${u}
      ${l}
      <div class="ubits-data-table__pagination-wrapper">${X}</div>
    </div>`:u?r=`<div class="ubits-data-table__container">
        ${u}
        ${l}
      </div>`:r=l,r}function oa(e){const D=e.containerId?document.getElementById(e.containerId):document.body;if(!D)throw new Error(`Container with id "${e.containerId}" not found`);const ae=D.querySelector(".ubits-data-table"),R=D.querySelector(".ubits-data-table__scrollable-container");if(R){const N=R.querySelector(".ubits-data-table");if(N){const z=N;if(z._dataTableInstance)try{const B=z._dataTableInstance;B&&typeof B.destroy=="function"&&B.destroy()}catch(B){console.warn("Error destroying previous table instance:",B)}}R.remove()}else if(ae){const M=ae;if(M._dataTableInstance)try{const N=M._dataTableInstance;N&&typeof N.destroy=="function"&&N.destroy()}catch(N){console.warn("Error destroying previous table instance:",N)}ae.remove()}const q=e.lazyLoad!==!1&&!e.showPagination?e.lazyLoadItemsPerBatch||10:void 0,k={...e,__lazyLoadCurrentItems:q},x=qe(k),V=document.createElement("div");V.innerHTML=x.trim();const m=V.firstElementChild;if(!m)throw new Error("Failed to create data table 3 element");D.appendChild(m);const J=M=>{const N=new Set,z=[];for(const B of M)N.has(B.id)||(N.add(B.id),z.push({...B}));return z.length,M.length,z};let t={...e,columns:J(e.columns)},W=t.columns.filter(M=>M.visible!==!1).map(M=>M.id),F=t.rows.map(M=>M.id),O=null,te=null,ye=null,Ce=null,se="",fe=!1,we=null,pe={},le=null;const K=(M,N,z)=>{if(!N||N.trim()==="")return M;const B=N.toLowerCase().trim(),X=z.filter(ie=>ie.visible!==!1);return M.filter(ie=>X.some(he=>{const ve=ie.data[he.id];return ve==null?!1:String(ve).toLowerCase().includes(B)}))},ce=(M,N,z)=>{const B=Object.entries(N).filter(([X,ie])=>ie&&ie.trim()!=="");return B.length===0?M:M.filter(X=>B.every(([ie,he])=>{const ve=z.find(me=>me.id===ie);if(!ve){const me=t.header?.filterButton?.filters?.find(s=>s.id===ie);if(!me)return!0;const Ae=me.columnId,Be=X.data[Ae];if(Be==null)return!1;const U=String(Be).toLowerCase().trim(),c=he.toLowerCase().trim();switch(me.type){case"text":return U.includes(c);case"select":return U===c;case"number":return U===c||parseFloat(U)===parseFloat(c);case"date":return U.includes(c);default:return U.includes(c)}}const Pe=X.data[ve.id];if(Pe==null)return!1;const ke=String(Pe).toLowerCase().trim(),ue=he.toLowerCase().trim();switch(ve.type||"text"){case"estado":return ke===ue;case"fecha":return ke.includes(ue);case"progreso":const me=parseFloat(ke),Ae=parseFloat(ue);return!isNaN(me)&&!isNaN(Ae)&&me===Ae;case"nombre":case"nombre-avatar":case"nombre-avatar-texto":case"correo":case"area":case"lider":case"pais":case"ciudad":default:return ke.includes(ue)}}))},ne=t.showPagination?!1:t.lazyLoad!==!1,be=t.lazyLoadItemsPerBatch||10;let oe=be,P=null;const Ee=()=>{if(P){const z=m.querySelector(".ubits-data-table__scrollable-container");z&&z.removeEventListener("scroll",P),window.removeEventListener("scroll",P,!0),P=null}const M=m.querySelector(".ubits-data-table__scrollable-container"),N=()=>{const z=t.rows.length;if(oe>=z)return;let B,X,ie;if(M)B=M.scrollTop,X=M.scrollHeight,ie=M.clientHeight;else{B=window.scrollY||document.documentElement.scrollTop,X=document.documentElement.scrollHeight,ie=window.innerHeight;const Pe=m.getBoundingClientRect().bottom+B;if(B+ie>=Pe-200){const ue=Math.min(oe+be,z);ue>oe&&(oe=ue,t.onLazyLoad&&t.onLazyLoad(oe,z),G(!0))}return}if((B+ie)/X>=.8){const ve=Math.min(oe+be,z);ve>oe&&(oe=ve,t.onLazyLoad&&t.onLazyLoad(oe,z),G(!0))}};M?(P=N,M.addEventListener("scroll",P,{passive:!0})):(console.warn("⚠️ [LAZY LOAD] No se encontró contenedor scrollable, esperando renderizado..."),setTimeout(()=>{const z=m.querySelector(".ubits-data-table__scrollable-container");z?(P=N,z.addEventListener("scroll",P,{passive:!0})):console.error("❌ [LAZY LOAD] No se pudo encontrar contenedor scrollable. El lazy load requiere scroll vertical activo.")},100))},Te=()=>{m.querySelectorAll("wa-icon").forEach((N,z)=>{const B=N.nextElementSibling,X=N.parentElement,ie=X&&X.classList.contains("ubits-data-table__column-drag-handle");B&&B.tagName==="I"&&(customElements.get("wa-icon")?(ie?(N.style.display="block",N.style.width="14px",N.style.height="14px",N.style.opacity="1",N.style.margin="0",N.style.padding="0",N.style.position="absolute",N.style.top="50%",N.style.left="50%",N.style.transform="translate(-50%, -50%)",window.getComputedStyle(N),X&&(window.getComputedStyle(X),X.getBoundingClientRect())):(N.style.display="inline-block",N.style.width="12px",N.style.height="12px",N.style.opacity="1"),B.style.display="none"):(N.style.display="none",ie?(B.style.display="block",B.style.fontSize="14px",B.style.width="14px",B.style.height="14px",B.style.margin="0",B.style.padding="0",B.style.lineHeight="1",B.style.position="absolute",B.style.top="50%",B.style.left="50%",B.style.transform="translate(-50%, -50%)",B.style.boxSizing="border-box",B.style.textAlign="center",B.style.verticalAlign="middle",window.getComputedStyle(B),B.getBoundingClientRect(),X&&(window.getComputedStyle(X),X.getBoundingClientRect())):(B.style.display="inline-block",B.style.fontSize="12px",B.style.width="12px",B.style.height="12px")))})},G=(M=!1)=>{`${Date.now()}${Math.random().toString(36).substr(2,5)}`;let N=0,z=0,B=0,X=M;const ie=m.querySelector(".ubits-data-table__scrollable-container");ie&&(N=ie.scrollTop,z=ie.scrollHeight,B=ie.clientHeight,z>B&&!M&&(X=!0),N>0&&!M&&!X&&(X=!0));let he=t.rows;Object.keys(pe).length>0&&(he=ce(he,pe,t.columns)),se&&(he=K(he,se,t.columns));const ve={...t,rows:he,columns:t.columns.map(U=>{const c={...U};return U.pinned!==void 0&&(c.pinned=U.pinned),c}),sortColumnId:ye,sortDirection:Ce,__lazyLoadCurrentItems:oe,header:t.header?{...t.header,displayedItems:t.header.displayedItems!==void 0&&!se&&Object.keys(pe).length===0?t.header.displayedItems:he.length,__isSearchActive:fe,__searchTerm:se}:void 0},Pe=new Set,ke=ve.columns.filter(U=>Pe.has(U.id)?!1:(Pe.add(U.id),!0));ve.columns=ke;const ue=qe(ve,W,F,pe);if(performance.now(),m.innerHTML=ue.trim(),performance.now(),t.header?.searchButton&&t.header?.showSearchButton!==!1){const U=m.querySelector(".ubits-data-table__header-search-button");if(U){if(we)try{we.destroy()}catch{}if(!t.header?.searchButton)console.warn("🔍 [DATA TABLE] searchButton no está definido, saltando creación del componente");else{const c=document.createElement("div");c.style.display="none",document.body.appendChild(c),c.id="temp-search-button-container-"+Date.now(),we=Ze({containerId:c.id,active:fe,size:"sm",state:fe?"active":"default",disabled:t.header.searchButton.disabled||!1,placeholder:t.header.searchButton.placeholder||"Buscar...",value:se,width:248,className:"ubits-data-table__header-search-button",onChange:o=>{const l=o.target.value;if(se=l,t.header.searchButton.onChange&&t.header.searchButton.onChange(l),G(),t.header.searchButton.onSearch){const u=K(t.rows,l,t.columns);t.header.searchButton.onSearch(l,u)}},onClick:o=>{o.stopPropagation(),o.preventDefault(),fe=!0,t.header.searchButton.onClick&&t.header.searchButton.onClick(o),G(),setTimeout(()=>{const l=we?.element.querySelector(".ubits-search-button__input");l&&l.focus()},150)},onBlur:o=>{const l=o.target;setTimeout(()=>{if(!l.value.trim()&&document.activeElement!==l){const u=we?.element.querySelector(".ubits-search-button__clear");document.activeElement!==u&&(fe=!1,G())}},200)}});const s=we.element;U.parentNode?.replaceChild(s,U),fe&&s.style.width&&(s.style.width=""),document.body.removeChild(c)}setTimeout(()=>{const c=m.querySelector(".ubits-data-table__header-search-button.ubits-search-button--active"),s=c?.previousElementSibling;if(c&&s){const o=c.getBoundingClientRect(),l=s.getBoundingClientRect(),u=window.getComputedStyle(c),r=c.querySelector(".ubits-search-button__input-wrapper"),a=r?window.getComputedStyle(r):null,n={actualGap:o.left-l.right,difference:o.left-l.right-8,searchButton:{left:o.left,width:o.width,right:o.right,marginLeft:u.marginLeft,marginRight:u.marginRight,inlineWidth:c.style.width||"none",computedWidth:u.width},prevButton:{right:l.right,width:l.width},inputWrapper:{width:a?.width||"N/A",computedWidth:a?.width||"N/A"}};Math.abs(n.actualGap-8)>1&&o.width}},100)}}Le(),Te(),t.showPagination&&setTimeout(()=>{Be()},100),ne&&!t.showPagination&&Ee(),(X||z>0&&B>0&&z>B)&&requestAnimationFrame(()=>{const U=m.querySelector(".ubits-data-table__scrollable-container");if(U){const c=U.scrollHeight,s=U.clientHeight,o=c-s,l=z-B,u=l>0?N/l:0;if(o>0){const r=u*o;U.scrollTop=r}}});const me=m.querySelectorAll(".ubits-data-table__row");if(m.querySelector(".ubits-data-table__table"),m.querySelector(".ubits-data-table__tbody"),m.querySelector(".ubits-data-table__scrollable-container"),m.querySelector(".ubits-data-table"),me.length>0){const U=me[0],c=me[1],s=me[me.length-1];U.getBoundingClientRect(),c&&c.getBoundingClientRect(),s.getBoundingClientRect()}if(me.forEach((U,c)=>{c===0&&U.querySelectorAll("td").forEach((o,l)=>{const u=o;Array.from(u.classList),window.getComputedStyle(u).backgroundColor})}),me.length>0){const U=me[0];U.addEventListener("mouseenter",()=>{U.querySelectorAll("td").forEach((s,o)=>{const l=s;Array.from(l.classList),window.getComputedStyle(l).backgroundColor})}),U.addEventListener("mouseleave",()=>{})}m.querySelectorAll("input[data-column-checkbox-header]").forEach(U=>{const c=U,s=c.getAttribute("data-column-checkbox-header");if(s){const o=t.rows.length>0&&t.rows.every(r=>r.data[s]===!0),u=t.rows.some(r=>r.data[s]===!0)&&!o;c.indeterminate=u}});const Be=()=>{try{const U=m.closest(".ubits-data-table__container")||m.querySelector(".ubits-data-table__container");if(U){const c=window.getComputedStyle(U),s=U.querySelector(".ubits-data-table__scrollable-container")||U.querySelector(".ubits-data-table"),l=(s?.querySelector(".ubits-data-table__table")||s)?.querySelector(".ubits-data-table__row:last-child");if(s){const r=window.getComputedStyle(s);if(l){const a=l.getBoundingClientRect()}}const u=U.querySelector(".ubits-data-table__pagination-wrapper");if(u){const r=window.getComputedStyle(u),a=u.getBoundingClientRect();if(l){const n=l.getBoundingClientRect(),i=a.top-n.bottom}}}}catch(U){console.error("📄 [SPACING] ❌ Error verificando espaciado:",U)}}},Le=()=>{typeof window<"u"&&window.location&&window.location.href.includes("storybook");try{t.columnReorderable&&(m.hasAttribute("data-column-drag-listener")||(m.setAttribute("data-column-drag-listener","true"),m.addEventListener("dragstart",c=>{const o=c.target.closest(".ubits-data-table__column-drag-handle");if(o&&(O=o.getAttribute("data-column-id"),O)){c.dataTransfer.effectAllowed="move",c.dataTransfer.setData("text/plain",O);const l=o.closest(".ubits-data-table__column-header");l&&l.classList.add("ubits-data-table__column-header--dragging")}},!0),m.addEventListener("dragend",c=>{const o=c.target.closest(".ubits-data-table__column-drag-handle");if(o){const l=o.closest(".ubits-data-table__column-header");l&&l.classList.remove("ubits-data-table__column-header--dragging")}O=null},!0),m.addEventListener("dragover",c=>{const o=c.target.closest(".ubits-data-table__column-header");if(o&&O){const l=o.getAttribute("data-column-id");if(l&&l!==O){const u=l==="checkbox"||l.startsWith("checkbox-"),r=O==="checkbox"||O.startsWith("checkbox-");if(u)return;if(!r){const a=W.findIndex(n=>n==="checkbox"||n.startsWith("checkbox-"));if(a!==-1&&W.indexOf(l)<a)return}c.preventDefault(),c.dataTransfer.dropEffect="move",o.classList.add("ubits-data-table__column-header--drag-over")}}},!0),m.addEventListener("dragleave",c=>{const o=c.target.closest(".ubits-data-table__column-header");o&&o.classList.remove("ubits-data-table__column-header--drag-over")},!0),m.addEventListener("drop",c=>{const o=c.target.closest(".ubits-data-table__column-header");if(o){c.preventDefault(),o.classList.remove("ubits-data-table__column-header--drag-over");const l=o.getAttribute("data-column-id");if(!l||!O)return;const u=O==="checkbox"||O.startsWith("checkbox-"),r=l==="checkbox"||l.startsWith("checkbox-");if(u||r)return;if(O!==l){const a=W.indexOf(O),n=W.indexOf(l),i=W.findIndex(b=>b==="checkbox"||b.startsWith("checkbox-"));if(i===-1){a!==-1&&n!==-1&&(W.splice(a,1),W.splice(n,0,O),t.onColumnReorder&&t.onColumnReorder([...W]),G());return}if(n<i||a>i&&n<i)return;if(a!==-1&&n!==-1){const b=[...W];b.splice(a,1),b.splice(n,0,O);const p=b.findIndex(E=>E==="checkbox"||E.startsWith("checkbox-"));if(p!==-1&&p<i)return;W=b,t.onColumnReorder&&t.onColumnReorder([...W]),G()}}}},!0))),t.rowReorderable&&(m.hasAttribute("data-row-drag-listener")||(m.setAttribute("data-row-drag-listener","true"),m.addEventListener("dragstart",c=>{const o=c.target.closest(".ubits-data-table__row-drag-handle");if(!o)return;const l=o.getAttribute("data-row-id");if(l){const u=isNaN(Number(l))?l:Number(l);te=u,c.dataTransfer.effectAllowed="move",c.dataTransfer.setData("text/plain",String(u));const r=o.closest(".ubits-data-table__row");r&&r.classList.add("ubits-data-table__row--dragging")}},!0),m.addEventListener("dragend",c=>{const o=c.target.closest(".ubits-data-table__row-drag-handle");if(o){const l=o.closest(".ubits-data-table__row");l&&l.classList.remove("ubits-data-table__row--dragging")}te=null},!0),m.addEventListener("dragover",c=>{const o=c.target.closest(".ubits-data-table__row");if(o&&te!==null){const l=o.getAttribute("data-row-id");l&&(isNaN(Number(l))?l:Number(l))!==te&&(c.preventDefault(),c.dataTransfer.dropEffect="move",o.classList.add("ubits-data-table__row--drag-over"))}},!0),m.addEventListener("dragleave",c=>{const o=c.target.closest(".ubits-data-table__row");o&&o.classList.remove("ubits-data-table__row--drag-over")},!0),m.addEventListener("drop",c=>{const o=c.target.closest(".ubits-data-table__row");if(o){c.preventDefault(),o.classList.remove("ubits-data-table__row--drag-over");const l=o.getAttribute("data-row-id");if(!l||!te)return;const u=isNaN(Number(l))?l:Number(l),r=c.dataTransfer.getData("text/plain");if(r&&String(u)!==r){const a=isNaN(Number(r))?r:Number(r),n=F.indexOf(a),i=F.indexOf(u);n!==-1&&i!==-1&&(F.splice(n,1),F.splice(i,0,a),t.onRowReorder&&t.onRowReorder([...F]),G())}}},!0)));let M=!1;if(m.querySelectorAll("input[data-column-checkbox-header]").forEach((c,s)=>{const o=c,l=o.getAttribute("data-column-checkbox-header"),u=o.cloneNode(!0);u.checked=o.checked,l&&u.setAttribute("data-column-checkbox-header",l),Array.from(o.attributes).forEach(n=>{(n.name!=="data-column-checkbox-header"||!u.hasAttribute(n.name))&&u.setAttribute(n.name,n.value)}),o.parentNode?.replaceChild(u,o);const r=n=>{n.stopPropagation(),n.stopImmediatePropagation();const i=n.target;if(!i.hasAttribute("data-column-checkbox-header"))return;const b=i.getAttribute("data-column-checkbox-header"),p=i.checked,E=m.querySelector(".ubits-data-table__scrollable-container");let S=0,_=0,ee=0;if(E&&(S=E.scrollTop,_=E.scrollHeight,ee=E.clientHeight),t.rows.forEach(j=>{j.data[b]=p}),b==="checkbox-2"){const j=m.querySelectorAll(`input[data-column-id="${b}"][data-row-id]`);M=!0,j.forEach(h=>{const A=h,y=A.getAttribute("data-row-id");if(y){const re=isNaN(Number(y))?y:Number(y),H=t.rows.find(ge=>ge.id===re);H&&(H.data[b]=p),A.checked=p;const Z=A.closest(".ubits-checkbox");if(Z){const ge=Z.querySelector(".ubits-checkbox__square");if(p){if(Z.classList.add("ubits-checkbox--checked"),Z.classList.remove("ubits-checkbox--indeterminate"),ge){const Y=ge.querySelector(".ubits-checkbox__indeterminate");Y&&Y.remove();let Q=ge.querySelector(".ubits-checkbox__checkmark");Q||(Q=document.createElement("span"),Q.className="ubits-checkbox__checkmark",ge.appendChild(Q));const Re=Q.style.transition;Q.style.transition="none",Q.style.setProperty("opacity","1","important"),Q.style.setProperty("transform","scale(1)","important"),Q.style.setProperty("display","flex","important"),window.getComputedStyle(Q).opacity,window.getComputedStyle(Q).transform,window.getComputedStyle(Q).display,Q.offsetHeight,ge.offsetHeight,Z.offsetHeight,setTimeout(()=>{Q.style.transition=Re||""},0)}}else if(Z.classList.remove("ubits-checkbox--checked"),Z.classList.remove("ubits-checkbox--indeterminate"),ge){const Y=ge.querySelector(".ubits-checkbox__checkmark");Y&&Y.remove();const Q=ge.querySelector(".ubits-checkbox__indeterminate");Q&&Q.remove()}}}});const T=t.rows.length>0&&t.rows.every(h=>h.data[b]===!0),f=t.rows.some(h=>h.data[b]===!0)&&!T,v=i;v.checked=T,v.indeterminate=f;const g=v.closest(".ubits-checkbox");if(g){const h=g.querySelector(".ubits-checkbox__square");if(T){if(g.classList.add("ubits-checkbox--checked"),g.classList.remove("ubits-checkbox--indeterminate"),h){const A=h.querySelector(".ubits-checkbox__indeterminate");A&&A.remove(),g.classList.add("ubits-checkbox--checked"),g.offsetHeight;let y=h.querySelector(".ubits-checkbox__checkmark");y||(y=document.createElement("span"),y.className="ubits-checkbox__checkmark",h.appendChild(y));const re=y.style.transition;y.style.transition="none",y.style.setProperty("opacity","1","important"),y.style.setProperty("transform","scale(1)","important"),y.style.setProperty("display","flex","important"),window.getComputedStyle(y).opacity,window.getComputedStyle(y).transform,window.getComputedStyle(y).display,y.offsetHeight,h.offsetHeight,g.offsetHeight,setTimeout(()=>{y.style.transition=re||""},0)}}else if(f){if(g.classList.remove("ubits-checkbox--checked"),g.classList.add("ubits-checkbox--indeterminate"),h){const A=h.querySelector(".ubits-checkbox__checkmark");A&&A.remove();let y=h.querySelector(".ubits-checkbox__indeterminate");y||(y=document.createElement("span"),y.className="ubits-checkbox__indeterminate",h.appendChild(y)),y.style.setProperty("opacity","1","important"),y.style.setProperty("transform","scale(1)","important"),y.style.setProperty("display","flex","important")}}else if(g.classList.remove("ubits-checkbox--checked"),g.classList.remove("ubits-checkbox--indeterminate"),h){const A=h.querySelector(".ubits-checkbox__checkmark");A&&A.remove();const y=h.querySelector(".ubits-checkbox__indeterminate");y&&y.remove()}g.offsetHeight}m.offsetHeight,M=!1;const w=t;if(w.onSelectAll){const h=m.querySelector(".ubits-data-table__scrollable-container"),A=h?.scrollTop||0,y=h?.scrollHeight||0,re=h?.clientHeight||0;try{w.onSelectAll(p)}catch(Me){console.error("☑️ [SELECT ALL] ❌ Error en onSelectAll callback:",Me)}const H=m.querySelector(".ubits-data-table__scrollable-container"),Z=H?.scrollTop||0,ge=H?.scrollHeight||0,Y=H?.clientHeight||0,Q=Math.abs(Z-A)>1,Re=Math.abs(ge-y)>1||Math.abs(Y-re)>1;(Q||Re)&&(console.warn("☑️ [SELECT ALL] ⚠️ El callback onSelectAll parece haber causado cambios:",{scrollCambió:Q,scrollAntes:A,scrollDespues:Z,diferenciaScroll:Z-A,dimensionesCambiaron:Re,scrollHeightAntes:y,scrollHeightDespues:ge,clientHeightAntes:re,clientHeightDespues:Y}),Q&&S>0&&H&&(H.scrollTop=S,setTimeout(()=>{const Me=H.scrollTop},50)))}const d=m.querySelector(".ubits-data-table__scrollable-container"),C=d?.scrollTop||0,L=d?.scrollHeight||0,I=d?.clientHeight||0}else G()};u.addEventListener("change",r,{capture:!0});const a=n=>{const i=n.target};u.addEventListener("click",a,{capture:!0})}),m.querySelectorAll("input[data-column-id]:not([data-column-checkbox-header])").forEach(c=>{const s=c,o=s.getAttribute("data-row-id"),l=s.getAttribute("data-column-id"),u=s.cloneNode(!0);u.checked=s.checked,s.parentNode?.replaceChild(u,s);const r=a=>{const n=a.target;if(n.hasAttribute("data-column-checkbox-header")){a.stopPropagation(),a.stopImmediatePropagation();return}if(M)return;const i=n.getAttribute("data-row-id"),b=n.getAttribute("data-column-id");if(!i||!b)return;const p=isNaN(Number(i))?i:Number(i),E=n.checked,S=t.rows.find(_=>_.id===p);if(S)if(S.data[b]=E,b==="checkbox-2"){let _=n.closest(".ubits-checkbox");if(_){const T=_.querySelector(`input[data-row-id="${p}"][data-column-id="${b}"]`);if(!T||T!==n){const $=m.querySelector(`input[data-row-id="${p}"][data-column-id="${b}"]`);$&&(_=$.closest(".ubits-checkbox"))}}if(_){const T=_.querySelector(".ubits-checkbox__square");if(E){if(_.classList.add("ubits-checkbox--checked"),_.classList.remove("ubits-checkbox--indeterminate"),T){const $=T.querySelector(".ubits-checkbox__indeterminate");$&&$.remove(),_.classList.add("ubits-checkbox--checked"),_.classList.remove("ubits-checkbox--indeterminate"),_.offsetHeight;let f=T.querySelector(".ubits-checkbox__checkmark");f||(f=document.createElement("span"),f.className="ubits-checkbox__checkmark",T.appendChild(f));const v=f.style.transition;f.style.transition="none",f.style.setProperty("opacity","1","important"),f.style.setProperty("transform","scale(1)","important"),f.style.setProperty("display","flex","important"),window.getComputedStyle(f).opacity,window.getComputedStyle(f).transform,window.getComputedStyle(f).display,f.offsetHeight,T.offsetHeight,_.offsetHeight,setTimeout(()=>{f.style.transition=v||""},0),requestAnimationFrame(()=>{const g=T.querySelector(".ubits-checkbox__checkmark");if(g){const w=window.getComputedStyle(g),d=window.getComputedStyle(g,"::after");(w.opacity==="0"||w.transform.includes("scale(0)"))&&(g.style.setProperty("opacity","1","important"),g.style.setProperty("transform","scale(1)","important"),g.style.setProperty("display","flex","important"),g.offsetHeight)}})}}else if(_.classList.remove("ubits-checkbox--checked"),_.classList.remove("ubits-checkbox--indeterminate"),T){const $=T.querySelector(".ubits-checkbox__checkmark");$&&$.remove();const f=T.querySelector(".ubits-checkbox__indeterminate");f&&f.remove()}}else{const T=m.querySelectorAll(`input[data-row-id="${p}"][data-column-id="${l}"]`);if(T.length>0){const f=(Array.from(T).find(v=>v===n)||T[0])?.closest(".ubits-checkbox");if(f){const v=f.querySelector(".ubits-checkbox__square");if(E){if(f.classList.add("ubits-checkbox--checked"),f.classList.remove("ubits-checkbox--indeterminate"),v){const g=v.querySelector(".ubits-checkbox__indeterminate");g&&g.remove();let w=v.querySelector(".ubits-checkbox__checkmark");w||(w=document.createElement("span"),w.className="ubits-checkbox__checkmark",v.appendChild(w))}}else if(f.classList.remove("ubits-checkbox--checked"),f.classList.remove("ubits-checkbox--indeterminate"),v){const g=v.querySelector(".ubits-checkbox__checkmark");g&&g.remove()}}}}const ee=m.querySelector(`input[data-column-checkbox-header="${l}"]`);if(ee){const T=t.rows.length>0&&t.rows.every(g=>g.data[l]===!0),f=t.rows.some(g=>g.data[l]===!0)&&!T;ee.checked=T,ee.indeterminate=f;const v=ee.closest(".ubits-checkbox");if(v){const g=v.querySelector(".ubits-checkbox__square");if(T){if(v.classList.add("ubits-checkbox--checked"),v.classList.remove("ubits-checkbox--indeterminate"),g){const w=g.querySelector(".ubits-checkbox__indeterminate");w&&w.remove();let d=g.querySelector(".ubits-checkbox__checkmark");d||(d=document.createElement("span"),d.className="ubits-checkbox__checkmark",g.appendChild(d))}}else if(f){if(v.classList.remove("ubits-checkbox--checked"),v.classList.add("ubits-checkbox--indeterminate"),g){const w=g.querySelector(".ubits-checkbox__checkmark");w&&w.remove();let d=g.querySelector(".ubits-checkbox__indeterminate");d||(d=document.createElement("span"),d.className="ubits-checkbox__indeterminate",g.appendChild(d))}}else if(v.classList.remove("ubits-checkbox--checked"),v.classList.remove("ubits-checkbox--indeterminate"),g){const w=g.querySelector(".ubits-checkbox__checkmark");w&&w.remove();const d=g.querySelector(".ubits-checkbox__indeterminate");d&&d.remove()}}}const j=u.closest(".ubits-data-table__row");if(j){const T=Array.from(j.classList),f=window.getComputedStyle(j).backgroundColor,v=j.querySelectorAll(".ubits-data-table__cell"),g=j.style.pointerEvents;j.style.pointerEvents="none",j.offsetHeight;const w=getComputedStyle(document.documentElement).getPropertyValue("--modifiers-normal-color-light-bg-1").trim();j.classList.add("ubits-data-table__row--clear-hover"),j.style.setProperty("background-color",w,"important"),v.forEach((I,h)=>{I.style.setProperty("background-color",w,"important")}),j.offsetHeight,j.style.pointerEvents=g||"";const C=window.getComputedStyle(j).backgroundColor,L=Array.from(j.classList);v.forEach((I,h)=>{const y=window.getComputedStyle(I).backgroundColor}),requestAnimationFrame(()=>{setTimeout(()=>{const I=window.getComputedStyle(j).backgroundColor;j.classList.remove("ubits-data-table__row--clear-hover"),j.style.removeProperty("background-color"),v.forEach(A=>{A.style.removeProperty("background-color")});const h=window.getComputedStyle(j).backgroundColor},150)})}t.onRowSelect&&t.onRowSelect(p,E)}else G()};u.addEventListener("change",r,{capture:!1})}),m.querySelectorAll('[data-expand-button="true"]').forEach((c,s)=>{const o=c.cloneNode(!0);c.parentNode?.replaceChild(o,c),o.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const u=o.getAttribute("data-row-id"),r=isNaN(Number(u))?u:Number(u),a=t.rows.find(n=>n.id===r);if(a){const n=a.expanded||!1;a.expanded=!n,t.onRowExpand&&t.onRowExpand(r,a.expanded),G(),a.expanded&&requestAnimationFrame(()=>{const i=m.querySelector(`[data-row-id="${r}"]`);if(i){const b=i.nextElementSibling;if(b&&b.classList.contains("ubits-data-table__row-expanded-row")){const p=m.querySelector(".ubits-data-table__scrollable-container--vertical");if(p){const E=i.offsetTop;p.scrollTop=E-50}else i.scrollIntoView({behavior:"smooth",block:"nearest"})}}})}else console.warn("🔘 [EXPAND] ⚠️ Fila no encontrada para rowId:",r)})}),m.querySelectorAll('[data-sort-button="true"]').forEach(c=>{c.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const o=c.getAttribute("data-column-id");ye===o?Ce=Ce==="asc"?"desc":"asc":(ye=o,Ce="asc"),t.onSort&&t.onSort(o,Ce),G()})}),m.querySelectorAll('[data-menu-button="true"]').forEach(c=>{const s=c,o=s.getAttribute("data-column-id");if(!o||!t.columns.find(_=>_.id===o))return;const u=s.closest("th");if(!u){console.warn("⚠️ [MENU BUTTON] No se encontró el header cell");return}const r=u.hasAttribute("data-pinned")&&u.getAttribute("data-pinned")==="true",a=u.classList.contains("ubits-data-table__column-header--pinned"),n=typeof window<"u"&&!window.location?.href?.includes("storybook");let i,b=null;if(r||a){const ee=m.querySelector(".ubits-data-table")?.closest(".ubits-data-table__scrollable-container")||m;i=ee.querySelector(`.ubits-data-table__column-menu-dropdown[data-column-id="${o}"]`),i||(i=document.createElement("div"),i.className="ubits-data-table__column-menu-dropdown",i.setAttribute("data-column-id",o),i.style.cssText=`
            position: fixed;
            z-index: 10000 !important;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `,ee.appendChild(i))}else i=u.querySelector(".ubits-data-table__column-menu-dropdown"),i||(i=document.createElement("div"),i.className="ubits-data-table__column-menu-dropdown",i.setAttribute("data-column-id",o),i.style.cssText=`
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000 !important;
            margin-top: 4px;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `,u.style.position="relative",u.appendChild(i));let p=!1;const E=()=>{i&&(i.style.display="none"),p=!1,S&&(document.removeEventListener("click",S),S=null),(r||a)&&i.parentElement&&i.parentElement!==u&&i.remove()};let S=null;s.addEventListener("click",_=>{const ee=typeof window<"u"&&window.location&&!window.location.href.includes("storybook");_.preventDefault(),_.stopPropagation();const j=t.columns.find(L=>L.id===o);if(!j){console.error("❌ [COLUMN MENU] Columna no encontrada:",o);return}const T=j.pinned||!1;if(p){E();return}m.querySelectorAll(".ubits-data-table__column-menu-dropdown").forEach(L=>{L!==i&&(L.style.display="none")});const $=[{label:T?"Desfijar columna":"Fijar columna",value:"pin",state:"default"}];i.innerHTML="";const f=`column-menu-list-${o}-${Math.random().toString(36).substr(2,9)}`;i.id=f;try{const L=He({containerId:f,items:$,size:"sm",maxHeight:"200px",onSelectionChange:(I,h)=>{if(I&&I.value==="pin"){const A=t.columns.find(y=>y.id===o);if(A){const y=A.pinned||!1;A.pinned=!y,t.onColumnPin&&t.onColumnPin(o,A.pinned),G()}else console.error("❌ [COLUMN MENU] Columna no encontrada al intentar fijar:",o)}E()}})}catch(L){console.error("❌ [COLUMN MENU] Error al crear lista con createList:",L);const I=De({items:$,size:"sm",maxHeight:"200px"});i.innerHTML=I,i.querySelectorAll(".ubits-list-item").forEach(A=>{A.addEventListener("click",()=>{const y=t.columns.find(re=>re.id===o);if(y){const re=y.pinned||!1;y.pinned=!re,t.onColumnPin&&t.onColumnPin(o,y.pinned),G()}E()})})}const v=u.hasAttribute("data-pinned")&&u.getAttribute("data-pinned")==="true",g=u.classList.contains("ubits-data-table__column-header--pinned"),w=v||g?1e4:1e3,d=s.getBoundingClientRect(),C=u.getBoundingClientRect();if(v||g){i.style.setProperty("position","fixed","important"),i.style.setProperty("top",`${d.bottom+4}px`,"important");const L=d.right-160;i.style.setProperty("left",`${L}px`,"important"),i.style.setProperty("right","auto","important"),i.style.setProperty("z-index",`${w}`,"important"),i.style.setProperty("display","block","important")}else i.style.position="absolute",i.style.top="100%",i.style.right="0",i.style.left="auto",i.style.zIndex=`${w}`,i.style.setProperty("z-index",`${w}`,"important"),i.style.display="block";p=!0,S=L=>{!i.contains(L.target)&&!s.contains(L.target)&&E()},setTimeout(()=>{document.addEventListener("click",S)},0)})}),m.querySelectorAll(".ubits-data-table__action-button").forEach(c=>{const s=c,o=s.getAttribute("data-row-id"),l=s.getAttribute("data-column-id");if(!o){console.warn("⚠️ [ACTION BUTTONS] No se encontró el data-row-id en el botón");return}const u=isNaN(Number(o))?o:Number(o),r=s.cloneNode(!0);s.parentNode?.replaceChild(r,s),r.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=t.rows.find(i=>i.id===u);n?t.onRowAction?t.onRowAction(u,n):alert(`Acción ejecutada para fila: ${u}`):console.warn("⚠️ [ACTION BUTTONS] Fila no encontrada para rowId:",u)})}),t.showContextMenu!==!1){const c=m.querySelectorAll("tr.ubits-data-table__row[data-row-id]");if(c.length===0){console.warn("🖱️ [CONTEXT MENU] ⚠️ No se encontraron filas con selector: tr.ubits-data-table__row[data-row-id]");const r=m.querySelectorAll("[data-row-id]");if(r.length>0){r.forEach((a,n)=>{const i=a,b=i.getAttribute("data-row-id");if(!b){console.warn("🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:",n);return}const p=isNaN(Number(b))?b:Number(b),E=document.getElementById("ubits-data-table-context-menu")||(()=>{const S=document.createElement("div");return S.id="ubits-data-table-context-menu",S.style.cssText=`
                position: fixed;
                z-index: 10000;
                display: none;
                background-color: var(--modifiers-normal-color-light-bg-1);
                border: 1px solid var(--modifiers-normal-color-light-border-1);
                border-radius: var(--ubits-border-radius-md);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                min-width: 200px;
                max-width: 300px;
              `,document.body.appendChild(S),S})();i.addEventListener("contextmenu",S=>{S.preventDefault(),S.stopPropagation(),alert(`Click derecho en fila ${p} - Menú contextual (implementación completa pendiente)`)})});return}}let s=document.getElementById("ubits-data-table-context-menu");s||(s=document.createElement("div"),s.id="ubits-data-table-context-menu",s.style.cssText=`
          position: fixed;
          z-index: 10000;
          display: none;
          background-color: var(--modifiers-normal-color-light-bg-1);
          border: 1px solid var(--modifiers-normal-color-light-border-1);
          border-radius: var(--ubits-border-radius-md, 8px);
          box-shadow: var(--ubits-elevation-2, 0 4px 6px rgba(0, 0, 0, 0.1));
          min-width: 200px;
          max-width: 300px;
        `,document.body.appendChild(s));let o=null,l=null;const u=()=>{s&&(s.style.display="none",s.innerHTML=""),o=null,l&&(document.removeEventListener("click",l),document.removeEventListener("contextmenu",l),l=null)};c.forEach((r,a)=>{const n=r,i=n.getAttribute("data-row-id");if(!i){console.warn("🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:",a);return}const b=isNaN(Number(i))?i:Number(i);n.addEventListener("contextmenu",p=>{if(p.preventDefault(),p.stopPropagation(),!t.rows.find(T=>T.id===b)){console.warn("🖱️ [CONTEXT MENU] ⚠️ Fila no encontrada en currentOptions.rows:",b);return}o=b,u();const S=(T,$)=>`<div style="display: flex; align-items: center; gap: var(--ubits-spacing-xs);">
            <i class="far fa-${T}" style="font-size: 14px; width: 16px; text-align: center;"></i>
            <span>${$}</span>
          </div>`,_=[{label:S("eye","Ver seleccionados"),value:"view-selected",state:"default",onClick:()=>{u()}},{label:S("bell","Notificaciones"),value:"notifications",state:"default",onClick:()=>{u(),alert(`Notificaciones para fila: ${b}`)}},{label:S("copy","Copiar"),value:"copy",state:"default",onClick:()=>{u(),alert(`Copiar para fila: ${b}`)}},{label:S("eye","Ver"),value:"view",state:"default",onClick:()=>{u(),alert(`Ver para fila: ${b}`)}},{label:S("edit","Editar"),value:"edit",state:"default",onClick:()=>{u(),alert(`Editar para fila: ${b}`)}},{label:S("download","Descargar"),value:"download",state:"default",onClick:()=>{u(),alert(`Descargar para fila: ${b}`)}},{label:S("trash","Eliminar"),value:"delete",state:"default",onClick:()=>{u(),alert(`Eliminar para fila: ${b}`)}}],ee=`context-menu-list-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;if(!s){console.error("🖱️ [CONTEXT MENU] ❌ contextMenuContainer es null!");return}const j=document.createElement("div");j.id=ee,s.innerHTML="",s.appendChild(j);try{const T=He({containerId:ee,items:_,size:"sm",maxHeight:"400px",onSelectionChange:(v,g)=>{v&&v.onClick&&v.onClick()}}),$=p.clientX,f=p.clientY;s.style.left=`${$}px`,s.style.top=`${f}px`,s.style.display="block",requestAnimationFrame(()=>{const v=s.getBoundingClientRect(),g=window.innerWidth,w=window.innerHeight;v.right>g&&(s.style.left=`${g-v.width-10}px`),v.bottom>w&&(s.style.top=`${w-v.height-10}px`)}),l=v=>{s.contains(v.target)||u()},setTimeout(()=>{document.addEventListener("click",l),document.addEventListener("contextmenu",l)},0)}catch(T){console.error("🖱️ [CONTEXT MENU] ❌ Error al crear menú contextual:",T),console.error("🖱️ [CONTEXT MENU] Stack:",T instanceof Error?T.stack:"N/A");const $=De({items:_,size:"sm",maxHeight:"400px"});j.innerHTML=$,j.querySelectorAll(".ubits-list-item").forEach((w,d)=>{const C=_[d];C&&C.onClick&&w.addEventListener("click",()=>{C.onClick()})});const v=p.clientX,g=p.clientY;s.style.left=`${v}px`,s.style.top=`${g}px`,s.style.display="block",requestAnimationFrame(()=>{const w=s.getBoundingClientRect(),d=window.innerWidth,C=window.innerHeight;w.right>d&&(s.style.left=`${d-w.width-10}px`),w.bottom>C&&(s.style.top=`${C-w.height-10}px`)}),l=w=>{s.contains(w.target)||u()},setTimeout(()=>{document.addEventListener("click",l),document.addEventListener("contextmenu",l)},0)}})})}m.querySelectorAll('[data-editable-text="true"]').forEach(c=>{const s=c.closest('[data-editable="true"]');if(!s)return;const o=s.getAttribute("data-row-id"),l=s.getAttribute("data-column-id");if(!o||!l)return;const u=isNaN(Number(o))?o:Number(o);c.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),c.blur())}),c.addEventListener("blur",r=>{r.stopPropagation();const a=c.textContent||"",n=t.rows.find(i=>i.id===u);if(n){const i=t.columns.find(b=>b.id===l);i&&(i.type==="nombre"||i.type==="nombre-avatar")?(n.data.nombre=a.trim(),n.data[l]!==void 0&&(n.data[l]=a.trim())):i&&i.type==="estado"?(n.data[l]=a.trim(),n.data.estado=a.trim(),n.data.status=a.trim()):n.data[l]=a.trim()}}),c.addEventListener("dblclick",r=>{r.stopPropagation()}),c.addEventListener("click",r=>{r.stopPropagation()})}),m.querySelectorAll(".ubits-data-table__status-editable").forEach(c=>{const s=c.getAttribute("data-row-id"),o=c.getAttribute("data-column-id"),l=c.getAttribute("data-current-status");if(!s||!o)return;const u=isNaN(Number(s))?s:Number(s),r=c.querySelector(".ubits-status-tag"),a=c.querySelector(".ubits-data-table__status-dropdown");if(!r||!a)return;const n=[{value:"active",label:"Activo",status:"active"},{value:"completed",label:"Completado",status:"completed"},{value:"published",label:"Publicado",status:"published"},{value:"fulfilled",label:"Cumplido",status:"fulfilled"},{value:"created",label:"Creado",status:"created"},{value:"not-fulfilled",label:"No cumplido",status:"not-fulfilled"},{value:"denied",label:"Denegado",status:"denied"},{value:"draft",label:"Borrador",status:"draft"},{value:"in-progress",label:"En progreso",status:"in-progress"},{value:"syncing",label:"Sincronizando",status:"syncing"},{value:"pending",label:"Pendiente",status:"pending"},{value:"pending-approval",label:"Pendiente aprobación",status:"pending-approval"},{value:"not-started",label:"No iniciado",status:"not-started"},{value:"finished",label:"Finalizado",status:"finished"},{value:"archived",label:"Archivado",status:"archived"},{value:"disabled",label:"Deshabilitado",status:"disabled"},{value:"paused",label:"Pausado",status:"paused"},{value:"hidden",label:"Oculto",status:"hidden"}];let i=null,b=null,p=null,E=!1,S=0;const _=[],ee=g=>{const w=[];let d=g;for(;d&&d!==document.body&&d!==document.documentElement;){const C=window.getComputedStyle(d),L=C.overflow+C.overflowX+C.overflowY,I=L.includes("auto")||L.includes("scroll"),h=d.scrollHeight>d.clientHeight||d.scrollWidth>d.clientWidth;(I||h)&&w.push(d),d=d.parentElement}return w},j=()=>{try{if(!a||a.style.display==="none"||!document.body.contains(a)){$();return}if(!r||!r.isConnected){$();return}const g=r.getBoundingClientRect(),w=g.bottom+4,d=g.left,C=a.style.top,L=a.style.left,I=`${w}px`,h=`${d}px`;(C!==I||L!==h)&&(a.style.top=I,a.style.left=h,S++)}catch{$()}},T=()=>{if(E)return;E=!0;const g=()=>{if(a.style.display==="none"||!document.body.contains(a)){$();return}j(),p=requestAnimationFrame(g)};g()},$=()=>{p&&(cancelAnimationFrame(p),p=null),E=!1,S=0};b=j;const f=()=>{$(),a.style.display="none";const g=a.__scrollbarInstance;if(g&&g.destroy){try{g.destroy()}catch{}a.__scrollbarInstance=null}a.parentElement===document.body&&c.appendChild(a),i&&(document.removeEventListener("click",i),i=null),b&&(window.removeEventListener("scroll",b,!0),m.removeEventListener("scroll",b,!0),_.forEach(w=>{w.removeEventListener("scroll",b,!0)}),_.length=0,b=null)},v=g=>{try{if(g.preventDefault(),g.stopPropagation(),!r||!a)return;m.querySelectorAll(".ubits-data-table__status-dropdown").forEach(H=>{if(H!==a&&(H.style.display="none",H.parentElement===document.body)){const Z=m.querySelector(`[data-row-id="${H.getAttribute("data-row-id")}"][data-column-id="${H.getAttribute("data-column-id")}"]`);Z&&Z.appendChild(H)}});const w={active:"Activo",completed:"Completado",published:"Publicado",fulfilled:"Cumplido",created:"Creado","not-fulfilled":"No cumplido",denied:"Denegado",draft:"Borrador","in-progress":"En progreso",syncing:"Sincronizando",pending:"Pendiente","pending-approval":"Pendiente aprobación","not-started":"No iniciado",finished:"Finalizado",archived:"Archivado",disabled:"Deshabilitado",paused:"Pausado",hidden:"Oculto"},d=n.map(H=>({label:H.label,value:H.value,state:H.status===l?"active":"default",selected:H.status===l}));if(!document.querySelector('link[href*="scroll.css"]')){const H=document.createElement("link");H.rel="stylesheet",H.href="../../addons/scroll/src/styles/scroll.css",document.head.appendChild(H)}a.innerHTML="";const C=`status-list-${u}-${o}`,L=`status-scrollbar-${u}-${o}`;if(a.id=`status-dropdown-${u}-${o}`,a.innerHTML=`
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${C}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${L}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `,document.getElementById(C)){const H=document.createElement("style");H.textContent=`
            #${C}::-webkit-scrollbar {
              display: none;
            }
          `,document.head.appendChild(H)}a.parentElement!==document.body&&document.body.appendChild(a);const h=r.getBoundingClientRect();a.style.position="fixed",a.style.top=`${h.bottom+4}px`,a.style.left=`${h.left}px`,a.style.zIndex="1000",a.style.backgroundColor="var(--modifiers-normal-color-light-bg-1)",a.style.border="1px solid var(--modifiers-normal-color-light-border-1)",a.style.borderRadius="var(--ubits-border-radius-sm)",a.style.display="block",a.style.minWidth="200px",a.style.maxWidth="300px",a.style.padding="4px",a.style.boxSizing="border-box",a.style.maxHeight="308px";const A=ee(r);_.push(...A),j(),T(),window.addEventListener("scroll",j,!0),m.addEventListener("scroll",j,!0),A.forEach(H=>{H.addEventListener("scroll",j,!0)});let y=null;try{const H=He({containerId:C,items:d,size:"sm",maxHeight:"none",onSelectionChange:(Z,ge)=>{if(Z&&ge!==null){const Y=n[ge];if(Y){const Q=t.rows.find(Re=>Re.id===u);if(Q&&t.columns.find(Me=>Me.id===o)){const Me=w[Y.status]||Y.label;Q.data[o]=Me,Q.data.estado=Me,Q.data.status=Me,G()}f()}}}});H&&(H.style.maxHeight="none",H.style.height="auto",H.style.overflow="visible",H.style.overflowY="visible",H.style.overflowX="visible"),requestAnimationFrame(()=>{if(typeof ze<"u")try{const Z=document.getElementById(C);Z&&Z.scrollHeight>Z.clientHeight&&(y=ze({containerId:L,targetId:C,orientation:"vertical",state:"default"}),y?.update&&y.update())}catch{}})}catch{}a.__scrollbarInstance=y;const re=H=>{!a.contains(H.target)&&!r.contains(H.target)&&f()};i=re,setTimeout(()=>{document.addEventListener("click",re)},0)}catch{$()}};r.addEventListener("click",v)}),m.querySelectorAll('input[data-radio-button="true"][data-editable="true"]').forEach(c=>{const s=c,o=s.getAttribute("data-row-id"),l=s.getAttribute("data-column-id");if(!o||!l)return;const u=isNaN(Number(o))?o:Number(o),r=s.cloneNode(!0);s.parentNode?.replaceChild(r,s),r.addEventListener("change",a=>{if(a.stopPropagation(),r.checked){m.querySelectorAll(`input[data-radio-button="true"][data-column-id="${l}"]`).forEach(b=>{const p=b.getAttribute("data-row-id");if(p&&p!==String(u)){b.checked=!1;const E=t.rows.find(S=>String(S.id)===p);E&&(E.data[l]=!1)}});const i=t.rows.find(b=>String(b.id)===String(u));i&&(i.data[l]=!0,i.data[`${l}_value`]=u)}G()})}),m.querySelectorAll('input[data-checkbox-button="true"]:not([data-column-id="checkbox-2"])').forEach(c=>{const s=c,o=s.getAttribute("data-row-id"),l=s.getAttribute("data-column-id");if(!o||!l||l==="checkbox-2")return;const u=isNaN(Number(o))?o:Number(o),r=s.cloneNode(!0);s.parentNode?.replaceChild(r,s),r.addEventListener("change",a=>{a.stopPropagation();const n=t.rows.find(i=>String(i.id)===String(u));n&&(n.data[l]=r.checked,t.onRowSelect&&t.onRowSelect(u,r.checked),G())})}),m.querySelectorAll("input[data-column-checkbox-header]").forEach((c,s)=>{const o=c,l=o.getAttribute("data-column-checkbox-header"),u=()=>{};o.addEventListener("click",u,{once:!0,capture:!0});const r=()=>{};o.addEventListener("change",r,{once:!0,capture:!0})});const Ae=typeof window<"u"&&window.location&&!window.location.href.includes("storybook");if(m.querySelectorAll(".ubits-data-table__date-editable").forEach((c,s)=>{const o=c.getAttribute("data-row-id"),l=c.getAttribute("data-column-id");if(!o||!l)return;const u=isNaN(Number(o))?o:Number(o),r=c.querySelector(".ubits-data-table__date-display");if(!r)return;let a=null,n=null,i=null,b=null,p=null,E=null;const S=f=>{const v=String(f.getDate()).padStart(2,"0"),g=String(f.getMonth()+1).padStart(2,"0"),w=f.getFullYear();return`${v}/${g}/${w}`},_=f=>{if(!f)return null;const[v,g,w]=f.split("/");if(v&&g&&w)return new Date(parseInt(w),parseInt(g)-1,parseInt(v));try{const d=new Date(f);if(!isNaN(d.getTime()))return d}catch{}return null},ee=()=>{n&&(n.style.display="none",n.parentElement&&n.remove(),n=null),i&&(document.removeEventListener("click",i),i=null),b&&(document.removeEventListener("keydown",b),b=null),p&&(window.removeEventListener("scroll",p,!0),E&&E.removeEventListener("scroll",p,!0),p=null)},j=()=>{i=f=>{n&&!c.contains(f.target)&&!n.contains(f.target)&&ee()},b=f=>{f.key==="Escape"&&n&&ee()},p=f=>{if(!n)return;const v=n.querySelector(".ubits-calendar");if(v){const g=v.querySelector('.ubits-calendar__month-dropdown[style*="display: block"]'),w=v.querySelector('.ubits-calendar__year-dropdown[style*="display: block"]');if(g||w){const d=document.activeElement;if(d&&(n.contains(d)||d.closest(".ubits-calendar")||d.closest(".ubits-calendar__month-dropdown")||d.closest(".ubits-calendar__year-dropdown")||d.closest(".ubits-list")||d.closest('[id*="calendar-list"]')||d.closest('[id*="calendar-scrollbar"]')))return;if(f&&f.target){const C=f.target;if(n.contains(C)||C.closest(".ubits-calendar")||C.closest(".ubits-calendar__month-dropdown")||C.closest(".ubits-calendar__year-dropdown")||C.closest(".ubits-list")||C.closest('[id*="calendar-list"]')||C.closest('[id*="calendar-scrollbar"]'))return}return}}ee()},document.addEventListener("click",i),document.addEventListener("keydown",b),E=m.querySelector(".ubits-data-table__scrollable-container"),E&&E.addEventListener("scroll",p,!0),window.addEventListener("scroll",p,!0)},T=async()=>{const f=[{id:"ubits-calendar-styles",fileName:"calendar.css",href:"../../addons/calendar/src/styles/calendar.css"},{id:"ubits-button-styles",fileName:"button.css",href:"../../addons/button/src/styles/button.css"},{id:"ubits-input-styles",fileName:"input.css",href:"../../addons/input/src/styles/input.css"},{id:"ubits-list-styles",fileName:"list.css",href:"../../addons/list/src/styles/list.css"}];for(const v of f){const g=document.getElementById(v.id),w=Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).find(C=>(C.href||"").includes(v.fileName)||C.id===v.id);if(g||w)continue;const d=document.createElement("link");d.rel="stylesheet",d.href=v.href,d.id=v.id,document.head.appendChild(d)}},$=async()=>{if(n&&n.style.display!=="none"){ee();return}if(a&&n){const f=r.getBoundingClientRect();n.style.top=`${f.bottom+4}px`,n.style.left=`${f.left}px`,n.style.display="block",j();return}try{await T();const{createCalendar:f}=await Ve(async()=>{const{createCalendar:I}=await import("./index-BoEJW2yg.js").then(h=>h.i);return{createCalendar:I}},__vite__mapDeps([0,1]),import.meta.url),v=r.textContent||"",g=_(v);a=f({mode:"single",selectedDate:g,initialDate:g||new Date,onDateSelect:I=>{const h=S(I);r.textContent=h;const A=t.rows.find(y=>y.id===u);A&&(A.data[l]=h,A.data[`${l}_iso`]=I.toISOString().split("T")[0]),ee(),G()}}),n=document.createElement("div"),n.className="ubits-data-table__calendar-container",n.setAttribute("data-row-id",String(u)),n.setAttribute("data-column-id",l);const d=r.getBoundingClientRect(),C=d.bottom+4,L=d.left;n.style.cssText=`
            position: fixed;
            top: ${C}px;
            left: ${L}px;
            z-index: 99999;
            display: block;
            margin: 0;
          `,document.body.appendChild(n),n.appendChild(a.element),j()}catch(f){console.error("❌ [CALENDAR] Error cargando Calendar UBITS:",f)}};r.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),$()})}),m.querySelectorAll('input[data-toggle-button="true"]').forEach(c=>{const s=c,o=s.getAttribute("data-row-id"),l=s.getAttribute("data-column-id");if(!o||!l)return;const u=isNaN(Number(o))?o:Number(o),r=s.cloneNode(!0);s.parentNode?.replaceChild(r,s),r.addEventListener("change",n=>{n.stopPropagation();const i=t.rows.find(b=>String(b.id)===String(u));i&&(i.data[l]=r.checked,G())});const a=r.closest(".ubits-toggle");a&&a.addEventListener("click",n=>{n.target!==r&&!r.contains(n.target)&&(n.preventDefault(),n.stopPropagation(),r.checked=!r.checked,r.dispatchEvent(new Event("change",{bubbles:!0})))})}),t.showPagination){const c=m.querySelector(".ubits-data-table__pagination");if(c){c.querySelectorAll(".ubits-pagination__page-button").forEach(u=>{u.addEventListener("click",()=>{const r=parseInt(u.textContent||"1");t.onPageChange&&t.onPageChange(r),t.currentPage=r,G()})}),c.querySelectorAll(".ubits-pagination__nav-button").forEach(u=>{u.addEventListener("click",()=>{const r=parseInt(c.getAttribute("data-current-page")||"1"),a=parseInt(c.getAttribute("data-total-pages")||"1"),n=u.getAttribute("aria-label")||"";let i=r;n.includes("Primera")||n.includes("First")?i=1:n.includes("Última")||n.includes("Last")?i=a:n.includes("Anterior")||n.includes("Previous")?i=Math.max(1,r-1):(n.includes("Siguiente")||n.includes("Next"))&&(i=Math.min(a,r+1)),i!==r&&(t.onPageChange&&t.onPageChange(i),t.currentPage=i,G())})});const l=c.querySelector(".ubits-pagination__select");l&&l.addEventListener("change",u=>{const r=u.target,a=parseInt(r.value);t.onItemsPerPageChange&&t.onItemsPerPageChange(a),t.itemsPerPage=a,t.currentPage=1,G()})}}if(t.header){const c=m.querySelector(".ubits-data-table__header");if(c){if(t.header.primaryButton&&t.header.showPrimaryButton!==!1){const s=c.querySelector(".ubits-data-table__header-primary-button");s&&t.header.primaryButton.onClick&&s.addEventListener("click",t.header.primaryButton.onClick)}if(t.header.secondaryButtons&&t.header.showSecondaryButtons!==!1&&c.querySelectorAll(".ubits-data-table__header-secondary-button").forEach((o,l)=>{const u=t.header.secondaryButtons[l];u&&u.onClick&&o.addEventListener("click",u.onClick)}),t.header.searchButton&&t.header.showSearchButton!==!1){const s=c.querySelector(".ubits-data-table__header-search-button"),o=s?.previousElementSibling,l=s?window.getComputedStyle(s):null,u=o?window.getComputedStyle(o):null;let r=null;if(s&&o){const a=o.getBoundingClientRect(),n=s.getBoundingClientRect(),i=n.left-a.right;r={prevButtonRight:a.right,searchBtnLeft:n.left,actualGap:i,expectedGap:8,difference:i-8,prevButtonWidth:a.width,searchBtnWidth:n.width,marginLeft:l?.marginLeft,marginRight:l?.marginRight}}if(s){const a=s.querySelector("button"),n=s.tagName==="BUTTON";(n||!!a)&&!fe&&(n?s:a).addEventListener("click",E=>{E.stopPropagation(),E.preventDefault(),fe=!0,t.header.searchButton.onClick&&t.header.searchButton.onClick(E),G(),setTimeout(()=>{const S=m.querySelector(".ubits-data-table__header-search-button");if(S){const _=S.querySelector(".ubits-search-button__input");_?(_.focus(),setTimeout(()=>{_.setSelectionRange(0,_.value.length)},10)):console.warn("🔍 [DATA TABLE] Input no encontrado después de renderizar")}},150)});const b=s.querySelector(".ubits-search-button__input");if(b){b.value=se;const p=T=>{if(se=T,t.header.searchButton.onChange&&t.header.searchButton.onChange(T),G(),T&&setTimeout(()=>{const $=m.querySelector(".ubits-data-table__header-search-button");if($){const f=$.querySelector(".ubits-search-button__input");f&&(f.focus(),f.setSelectionRange(f.value.length,f.value.length))}},50),t.header.searchButton.onSearch){const $=K(t.rows,T,t.columns);t.header.searchButton.onSearch(T,$)}};b.addEventListener("input",T=>{const $=T.target.value;p($)}),b.addEventListener("change",T=>{const $=T.target.value;p($)});let E=null,S=!1,_=0;b.addEventListener("focus",()=>{S=!0,_=Date.now(),setTimeout(()=>{S=!1},200)}),b.addEventListener("blur",T=>{const f=Date.now()-_;S||f<200||(E&&clearTimeout(E),E=setTimeout(()=>{const v=m.querySelector(".ubits-search-button__input"),g=document.activeElement,w=m.querySelector(".ubits-search-button__clear"),d=m.querySelector(".ubits-data-table__header-search-button");v&&se===""&&!v.value&&g!==w&&!d?.contains(g)&&(fe=!1,G()),E=null},200))});const ee=s.closest(".ubits-data-table__header-search-button");ee&&ee.addEventListener("mousedown",T=>{T.target.closest(".ubits-search-button__input-wrapper")&&T.preventDefault()});const j=s.querySelector(".ubits-search-button__clear");j&&j.addEventListener("click",T=>{T.stopPropagation(),T.preventDefault(),se="",b.value="",fe=!1,p("")})}}}if(t.header.filterButton&&t.header.showFilterButton!==!1){const s=c.querySelector(".ubits-data-table__header-filter-button");s&&s.addEventListener("click",o=>{o.stopPropagation(),o.preventDefault();let l=t.header.filterButton.filters||[];if(l.length===0&&(l=t.columns.filter(r=>{const a=["drag-handle","expand","checkbox","radio","toggle","acciones"];return r.visible!==!1&&r.type&&!a.includes(r.type)}).map(r=>{let a="text",n;if(r.type==="estado"){a="select";const i=new Set;t.rows.forEach(b=>{const p=b.data[r.id];p!=null&&i.add(String(p))}),n=Array.from(i).map(b=>({value:b,label:b}))}else r.type==="fecha"?a="date":r.type==="progreso"?a="number":a="text";return{id:r.id,label:r.title,columnId:r.id,type:a,options:n}})),l.length===0){console.warn("🔍 [DATA TABLE] No hay columnas disponibles para filtrar"),t.header.filterButton.onClick&&t.header.filterButton.onClick(o);return}const u=()=>`
                  <div class="ubits-data-table__filters-container">
                    ${l.map(a=>{const n=pe[a.id]||a.value||"";let i="";const b=`filter-input-${a.id}`;switch(a.type){case"text":case"number":case"date":i=$e({containerId:b,label:a.label,type:a.type,value:n,placeholder:`Filtrar por ${a.label.toLowerCase()}...`,size:"md"});break;case"select":a.options&&a.options.length>0&&(i=$e({containerId:b,label:a.label,type:"select",selectOptions:a.options,value:n,placeholder:`Seleccionar ${a.label.toLowerCase()}...`,size:"md"}));break}return`
                    <div class="ubits-data-table__filter-item" data-filter-id="${a.id}">
                      <div id="${b}">${i}</div>
                    </div>
                  `}).join("")}
                  </div>
                `;if(le)try{le.updateContent(u)}catch(r){console.error("🔍 [DATA TABLE] Error al actualizar drawer:",r),le=Ue({title:"Filtros",complementaryText:"Aplica filtros para refinar los resultados",width:40,bodyContent:u,footerButtons:{secondary:{label:"Limpiar",onClick:a=>{a.preventDefault(),a.stopPropagation(),pe={},t.header.filterButton.onClearFilters&&t.header.filterButton.onClearFilters(),G(),le&&le.close()}},primary:{label:"Aplicar",onClick:a=>{a.preventDefault(),a.stopPropagation();const n={};l.forEach(i=>{const b=le.element.querySelector(`[data-filter-id="${i.id}"]`);if(b){const p=b.querySelector(".ubits-input");p&&p.value&&p.value.trim()!==""&&(n[i.id]=p.value.trim())}}),pe=n,t.header.filterButton.onApplyFilters&&t.header.filterButton.onApplyFilters(pe),G(),le&&le.close()}}},onClose:()=>{},closeOnOverlayClick:!0})}else try{le=Ue({title:"Filtros",complementaryText:"Aplica filtros para refinar los resultados",width:40,bodyContent:u,footerButtons:{secondary:{label:"Limpiar",onClick:r=>{r.preventDefault(),r.stopPropagation(),pe={},t.header.filterButton.onClearFilters&&t.header.filterButton.onClearFilters(),G(),le&&le.close()}},primary:{label:"Aplicar",onClick:r=>{r.preventDefault(),r.stopPropagation();const a={};l.forEach(n=>{const i=le.element.querySelector(`[data-filter-id="${n.id}"]`);if(i){const b=i.querySelector(".ubits-input");b&&b.value&&b.value.trim()!==""&&(a[n.id]=b.value.trim())}}),pe=a,t.header.filterButton.onApplyFilters&&t.header.filterButton.onApplyFilters(pe),G(),le&&le.close()}}},onClose:()=>{},closeOnOverlayClick:!0})}catch(r){console.error("🔍 [DATA TABLE] Error al crear drawer:",r),t.header.filterButton.onClick&&t.header.filterButton.onClick(o);return}le&&(le.open(),setTimeout(()=>{le&&l.forEach(r=>{const a=`filter-input-${r.id}`,n=le.element.querySelector(`#${a}`);if(n){n.innerHTML="";const i=pe[r.id]||r.value||"";let b={containerId:a,label:r.label,value:i,placeholder:r.type==="select"?`Seleccionar ${r.label.toLowerCase()}...`:`Filtrar por ${r.label.toLowerCase()}...`,size:"md"};r.type==="select"&&r.options?(b.type="select",b.selectOptions=r.options.map(p=>({value:p.value,text:p.label||p.value}))):b.type=r.type,Xe(b)}})},300))})}if(t.header.columnSelectorButton&&t.header.showColumnSelectorButton!==!1){const s=c.querySelector(".ubits-data-table__header-column-selector-button");if(s){let o=null,l=!1;const u=()=>(o&&o.parentElement||(o=document.createElement("div"),o.className="ubits-data-table__column-selector-dropdown",o.style.display="none",document.body.appendChild(o)),o),r=()=>{if(!o||!s)return;const b=s.getBoundingClientRect(),p=o.offsetWidth||200;o.style.position="fixed",o.style.top=`${b.bottom+4}px`;const E=b.right-p;E<0?o.style.left="0px":o.style.left=`${E}px`,o.style.right="auto"};let a=null,n=null;const i=()=>{o&&(o.style.display="none",l=!1,n&&(document.removeEventListener("click",n),n=null),a&&(window.removeEventListener("scroll",a,!0),window.removeEventListener("resize",a),a=null))};s.addEventListener("click",b=>{if(b.preventDefault(),b.stopPropagation(),l){i();return}const p=u();for(;p.firstChild;)p.removeChild(p.firstChild);p.innerHTML="";const E=p.children.length,S=p.innerHTML.length;(E>0||S>0)&&(console.error("🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown no está completamente limpio!"),p.innerHTML="",requestAnimationFrame(()=>{(p.children.length>0||p.innerHTML.length>0)&&console.error("🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown sigue sin estar limpio después de limpieza adicional!")}));const _="ubits-data-table-column-selector-list",ee=document.getElementById(_);ee&&ee.remove();const j=document.createElement("div");if(j.id=_,p.appendChild(j),j){const f=J(t.columns);f.length!==t.columns.length&&(t.columns=f);const v=f.filter(h=>{const A=["drag-handle","expand"],y=["checkbox","checkbox-2"];return!A.includes(h.type||"")&&!y.includes(h.id)&&h.id!=="checkbox"}),g=new Set,w=v.filter(h=>g.has(h.id)?!1:(g.add(h.id),!0)),d=w.filter(h=>h.visible!==!1).length,C=w.map(h=>{const A=h.visible!==!1,y=A&&d===1;return{label:Ne({label:h.title,checked:A,size:"sm",disabled:y,className:"ubits-data-table__column-selector-checkbox"}).replace("<input",`<input data-column-selector-id="${h.id}"`),value:h.id,state:"default",selected:!1}}),L=new Set,I=C.filter(h=>L.has(h.value)?!1:(L.add(h.value),!0));try{He({containerId:_,items:I,size:"sm",maxHeight:"400px",className:"ubits-data-table__column-selector-list"});const h=document.getElementById(_);if(h){const y=h.querySelector(".ubits-list")?.querySelectorAll(".ubits-list-item")||[]}else console.error("🔍 [COLUMN SELECTOR] ❌ Lista no encontrada después de createList")}catch(h){console.error("🔍 [COLUMN SELECTOR] ❌ Error en createList:",h),j.innerHTML=De({containerId:_,items:I,size:"sm",maxHeight:"400px",className:"ubits-data-table__column-selector-list"})}}else console.error("🔍 [COLUMN SELECTOR] ❌ listContainer no existe");const T=()=>{const f="ubits-data-table-column-selector-list";let v=p.querySelector(`#${f}`);(!v||!l)&&(p.innerHTML="",v=document.createElement("div"),v.id=f,p.appendChild(v));const g=J(t.columns);g.length!==t.columns.length&&(t.columns=g);const w=g.filter(y=>{const re=["drag-handle","expand"],H=["checkbox","checkbox-2"];return!re.includes(y.type||"")&&!H.includes(y.id)&&y.id!=="checkbox"}),d=new Set,C=w.filter(y=>d.has(y.id)?!1:(d.add(y.id),!0)),L=C.filter(y=>y.visible!==!1).length,I=C.map(y=>{const re=y.visible!==!1,H=re&&L===1;return{label:Ne({label:y.title,checked:re,size:"sm",disabled:H,className:"ubits-data-table__column-selector-checkbox"}).replace("<input",`<input data-column-selector-id="${y.id}"`),value:y.id,state:"default",selected:!1}}),h=new Set,A=I.filter(y=>h.has(y.value)?!1:(h.add(y.value),!0));v.innerHTML="";try{He({containerId:f,items:A,size:"sm",maxHeight:"400px",className:"ubits-data-table__column-selector-list"});const y=document.getElementById(f);if(y){const H=y.querySelector(".ubits-list")?.querySelectorAll(".ubits-list-item")||[]}else console.error("🔍 [COLUMN SELECTOR UPDATE] ❌ Lista no encontrada")}catch(y){console.error("🔍 [COLUMN SELECTOR UPDATE] ❌ Error en createList:",y),v.innerHTML=De({containerId:f,items:A,size:"sm",maxHeight:"400px",className:"ubits-data-table__column-selector-list"})}setTimeout(()=>{$()},50)},$=()=>{p.querySelectorAll("input[data-column-selector-id]").forEach(v=>{const g=v,w=g.getAttribute("data-column-selector-id"),d=g.cloneNode(!0);g.parentNode?.replaceChild(d,g),d.addEventListener("change",C=>{if(C.stopPropagation(),C.preventDefault(),d.disabled)return;const L=d.checked,I=t.columns.find(h=>h.id===w);if(I){if(!L){const A=t.columns.filter(Z=>{const ge=["drag-handle","expand"],Y=["checkbox","checkbox-2"];return!ge.includes(Z.type||"")&&!Y.includes(Z.id)&&Z.id!=="checkbox"}),y=new Set;if(A.filter(Z=>y.has(Z.id)?!1:(y.add(Z.id),!0)).filter(Z=>Z.id===w?!1:Z.visible!==!1).length===0){d.checked=!0,console.warn("⚠️ No se pueden ocultar todas las columnas. Debe quedar al menos una columna visible.");return}}const h=t.columns.filter(A=>A.id===w);I.visible=L,h.length>1&&h.forEach((A,y)=>{A.id===w&&(A.visible=L)}),T(),G()}})})};setTimeout(()=>{$()},100),p.style.display="block",requestAnimationFrame(()=>{r(),setTimeout(()=>{r()},10)}),l=!0,a=()=>{l&&o&&r()},window.addEventListener("scroll",a,!0),window.addEventListener("resize",a),n=f=>{p&&!p.contains(f.target)&&!s.contains(f.target)&&(a&&(window.removeEventListener("scroll",a,!0),window.removeEventListener("resize",a)),i())},setTimeout(()=>{document.addEventListener("click",n)},0),t.header.columnSelectorButton.onClick&&t.header.columnSelectorButton.onClick(b)})}}}}try{const c=m.querySelector(".ubits-data-table__empty-state");if(c&&t.emptyState){const s=t.rows.length===0,o=se&&se.trim()!=="",l=Object.keys(pe).length>0;let u;if(s&&t.emptyState.noData?u=t.emptyState.noData:o&&t.emptyState.noSearchResults?u=t.emptyState.noSearchResults:l&&t.emptyState.noFilterResults&&(u=t.emptyState.noFilterResults),u){if(u.onAction){const r=c.querySelector('[data-action="primary"]');r&&r.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),u.onAction?.()})}if(u.onSecondaryAction){const r=c.querySelector('[data-action="secondary"]');r&&r.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),u.onSecondaryAction?.()})}}}}catch(c){console.error("📎 [ATTACH] ❌ Error agregando listeners de empty state:",c)}}catch(M){console.error("📎 [ATTACH] ❌ Error en attachEventListeners:",M)}};return G(),{element:m,destroy:()=>{if(we){try{we.destroy()}catch{}we=null}if(P){const M=m.querySelector(".ubits-data-table__scrollable-container")||m.querySelector(".ubits-data-table")||m;M&&M.removeEventListener("scroll",P),window.removeEventListener("scroll",P,!0),P=null}m&&m.parentNode&&m.parentNode.removeChild(m)},update:M=>{const N=t.showPagination;if(t={...t,...M},M.columns)t.columns=J(M.columns);else if(t.columns){const z=t.columns.length;t.columns=J(t.columns),t.columns.length}if(M.showPagination!==void 0&&M.showPagination!==N)if(M.showPagination){if(P){const z=m.querySelector(".ubits-data-table__scrollable-container")||m.querySelector(".ubits-data-table")||m;z&&z.removeEventListener("scroll",P),window.removeEventListener("scroll",P,!0),P=null}oe=be}else oe=be;M.columns&&(W=M.columns.filter(z=>z.visible!==!1).map(z=>z.id)),M.rows&&(F=M.rows.map(z=>z.id),oe=be),G()}}}const xa={title:"Data/Data Table",tags:["autodocs"],parameters:{docs:{description:{component:"Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas."}}},argTypes:{columnReorderable:{control:"boolean",description:"Permite reordenar columnas mediante drag & drop",table:{defaultValue:{summary:"true"}}},rowReorderable:{control:"boolean",description:"Permite reordenar filas mediante drag & drop",table:{defaultValue:{summary:"true"}}},rowExpandable:{control:"boolean",description:"Muestra el icono de expandir/colapsar en las filas",table:{defaultValue:{summary:"true"}}},columnSortable:{control:"boolean",description:"Muestra botones de ordenamiento en los headers de las columnas",table:{defaultValue:{summary:"true"}}},showCheckbox:{control:"boolean",description:"Muestra la columna de checkbox para selección múltiple",table:{defaultValue:{summary:"true"}}},showVerticalScrollbar:{control:"boolean",description:"Muestra scrollbar vertical",table:{defaultValue:{summary:"false"}}},showHorizontalScrollbar:{control:"boolean",description:"Muestra scrollbar horizontal",table:{defaultValue:{summary:"false"}}},showColumnMenu:{control:"boolean",description:"Muestra el botón de menú (3 puntos) en los headers de las columnas. Usa este menú para fijar/desfijar columnas.",table:{defaultValue:{summary:"true"}}},showContextMenu:{control:"boolean",description:"Muestra el menú contextual (click derecho) en las filas con las opciones de acciones.",table:{defaultValue:{summary:"true"}}},checkboxSticky:{control:"boolean",description:"Hace que la columna de checkbox sea sticky (fija) al hacer scroll horizontal",table:{defaultValue:{summary:"false"}}},dragHandleSticky:{control:"boolean",description:"Hace que la columna de drag handle (mover filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowReorderable esté habilitado.",table:{defaultValue:{summary:"false"}}},expandSticky:{control:"boolean",description:"Hace que la columna de expand (desplegar filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowExpandable esté habilitado.",table:{defaultValue:{summary:"false"}}},columnsCount:{control:{type:"number",min:1,max:10,step:1},description:"Número de columnas de datos a mostrar (excluyendo checkbox)",table:{defaultValue:{summary:"3"}}},columnType1:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 1 (Nombre)",table:{defaultValue:{summary:"nombre"}}},columnType2:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 2 (Email)",table:{defaultValue:{summary:"correo"}}},columnType3:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 3 (Estado)",table:{defaultValue:{summary:"estado"}}},columnType4:{control:{type:"select"},options:["nombre","nombre-avatar","nombre-avatar-texto","progreso","estado","radio","toggle","checkbox","correo","fecha","pais","ciudad"],description:"Tipo de columna 4",table:{defaultValue:{summary:"nombre"}}},column1AvatarVariant:{control:{type:"select"},options:["photo","initials","icon"],description:"Variante de avatar para columna 1 (solo si es nombre-avatar o nombre-avatar-texto)",table:{defaultValue:{summary:"initials"}}},column1Editable:{control:"boolean",description:"Hacer editable la columna 1 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column2EmailClickable:{control:"boolean",description:"Hacer el email clicable en columna 2 (solo si es correo)",table:{defaultValue:{summary:"true"}}},column3Editable:{control:"boolean",description:"Hacer editable la columna 3 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)",table:{defaultValue:{summary:"false"}}},column3RadioLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es radio)",table:{defaultValue:{summary:"false"}}},column3ToggleLabel:{control:"boolean",description:"Mostrar label en columna 3 (solo si es toggle)",table:{defaultValue:{summary:"false"}}},column3CheckboxLabel:{control:"boolean",description:"Mostrar label en checkbox de columna 3 (solo si es tipo checkbox). Si es true, muestra el label automáticamente. Este checkbox es diferente al checkbox fijo (checkbox-2) que está en una columna separada.",table:{defaultValue:{summary:"true"}}},showPagination:{control:"boolean",description:"Muestra el paginador debajo de la tabla",table:{defaultValue:{summary:"false"}}},currentPage:{control:{type:"number",min:1,step:1},description:"Página actual",table:{defaultValue:{summary:"1"}}},itemsPerPage:{control:{type:"number",min:5,max:100,step:5},description:"Items por página",table:{defaultValue:{summary:"10"}}},paginationVariant:{control:{type:"select"},options:["default","compact","minimal"],description:"Variante del paginador",table:{defaultValue:{summary:"default"}}},paginationSize:{control:{type:"select"},options:["sm","md","lg"],description:"Tamaño del paginador",table:{defaultValue:{summary:"md"}}},headerTitle:{control:{type:"text"},description:"Título del header",table:{defaultValue:{summary:"Lista de elementos"}}},showHeaderTitle:{control:"boolean",description:"Mostrar título del header",table:{defaultValue:{summary:"true"}}},headerCounter:{control:{type:"select"},options:[!0,!1,"total-only"],description:'Modo del contador: true = "X/Y resultados", "total-only" = solo "Y resultados", false = oculto',table:{defaultValue:{summary:"true"}}},headerDisplayedItems:{control:{type:"number",min:1,step:1},description:"Items mostrados actualmente (para el contador X/Y)",table:{defaultValue:{summary:"32"}}},headerTotalItems:{control:{type:"number",min:1,step:1},description:"Total de items para el contador",table:{defaultValue:{summary:"206"}}},showHeaderPrimaryButton:{control:"boolean",description:"Mostrar botón primario",table:{defaultValue:{summary:"true"}}},headerPrimaryButtonText:{control:{type:"text"},description:"Texto del botón primario",table:{defaultValue:{summary:"Nuevo"}}},showHeaderSecondaryButtons:{control:"boolean",description:"Mostrar botones secundarios",table:{defaultValue:{summary:"true"}}},showHeaderSearchButton:{control:"boolean",description:"Mostrar botón de búsqueda",table:{defaultValue:{summary:"true"}}},showHeaderFilterButton:{control:"boolean",description:"Mostrar botón de filtros",table:{defaultValue:{summary:"true"}}},showHeaderColumnSelectorButton:{control:"boolean",description:"Mostrar botón de seleccionar columnas",table:{defaultValue:{summary:"true"}}},showActionButtonViewSelected:{control:"boolean",description:'Mostrar botón "Ver seleccionados" en la barra de acciones',table:{defaultValue:{summary:"true"}}},showActionButtonNotifications:{control:"boolean",description:'Mostrar botón "Notificaciones" en la barra de acciones',table:{defaultValue:{summary:"true"}}},showActionButtonCopy:{control:"boolean",description:'Mostrar botón "Copiar" en la barra de acciones (solo modo individual)',table:{defaultValue:{summary:"true"}}},showActionButtonView:{control:"boolean",description:'Mostrar botón "Ver" en la barra de acciones (solo modo individual)',table:{defaultValue:{summary:"true"}}},showActionButtonEdit:{control:"boolean",description:'Mostrar botón "Editar" en la barra de acciones (solo modo individual)',table:{defaultValue:{summary:"true"}}},showActionButtonDownload:{control:"boolean",description:'Mostrar botón "Descargar" en la barra de acciones (solo modo individual)',table:{defaultValue:{summary:"true"}}},showActionButtonDelete:{control:"boolean",description:'Mostrar botón "Eliminar" en la barra de acciones',table:{defaultValue:{summary:"true"}}},emptyStateNoDataTitle:{control:{type:"text"},description:"Título del empty state cuando no hay datos",table:{defaultValue:{summary:"No hay datos"}}},emptyStateNoDataDescription:{control:{type:"text"},description:"Descripción del empty state cuando no hay datos"},emptyStateNoDataIcon:{control:{type:"text"},description:'Icono FontAwesome del empty state cuando no hay datos (ej: "inbox", "database")'},emptyStateNoDataActionLabel:{control:{type:"text"},description:"Texto del botón de acción cuando no hay datos"},emptyStateNoDataShowPrimaryButton:{control:"boolean",description:"Mostrar botón primario cuando no hay datos",table:{defaultValue:{summary:"false"}}},emptyStateNoSearchResultsTitle:{control:{type:"text"},description:"Título del empty state cuando no hay resultados de búsqueda",table:{defaultValue:{summary:"No se encontraron resultados"}}},emptyStateNoSearchResultsDescription:{control:{type:"text"},description:"Descripción del empty state cuando no hay resultados de búsqueda"},emptyStateNoSearchResultsIcon:{control:{type:"text"},description:'Icono FontAwesome del empty state cuando no hay resultados de búsqueda (ej: "search")'},emptyStateNoSearchResultsActionLabel:{control:{type:"text"},description:"Texto del botón de acción cuando no hay resultados de búsqueda"},emptyStateNoSearchResultsShowPrimaryButton:{control:"boolean",description:"Mostrar botón primario cuando no hay resultados de búsqueda",table:{defaultValue:{summary:"false"}}},emptyStateNoFilterResultsTitle:{control:{type:"text"},description:"Título del empty state cuando no hay resultados de filtros",table:{defaultValue:{summary:"No hay resultados con los filtros aplicados"}}},emptyStateNoFilterResultsDescription:{control:{type:"text"},description:"Descripción del empty state cuando no hay resultados de filtros"},emptyStateNoFilterResultsIcon:{control:{type:"text"},description:'Icono FontAwesome del empty state cuando no hay resultados de filtros (ej: "filter")'},emptyStateNoFilterResultsActionLabel:{control:{type:"text"},description:"Texto del botón de acción cuando no hay resultados de filtros"},emptyStateNoFilterResultsShowPrimaryButton:{control:"boolean",description:"Mostrar botón primario cuando no hay resultados de filtros",table:{defaultValue:{summary:"true"}}}}},je={render:e=>{`${Date.now()}${Math.random().toString(36).substr(2,9)}`;const D=document.createElement("div");D.style.cssText=`
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;const ae=`data-table-story-container-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,R=document.createElement("div");R.id=ae,R.style.cssText=`
      width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `,D.querySelectorAll('[id^="data-table-story-container-"]').forEach(d=>{const C=d.querySelector(".ubits-data-table"),L=d.querySelector(".ubits-data-table__scrollable-container");if(L){const I=L.querySelector(".ubits-data-table");if(I){const h=I;if(h._dataTableInstance)try{const A=h._dataTableInstance;A&&typeof A.destroy=="function"&&A.destroy()}catch{}}}else if(C){const I=C;if(I._dataTableInstance)try{const h=I._dataTableInstance;h&&typeof h.destroy=="function"&&h.destroy()}catch{}}d.remove()});const k=e.columnsCount??3,x=e.columnType1??"nombre",V=e.columnType2??"correo",m=e.columnType3??"estado",J=e.columnType4??"nombre",t=e.columnType5??"nombre",W=e.columnType6??"nombre",F=e.columnType7??"pais",O=e.columnType8??"fecha",te=e.columnType9??"nombre",ye=e.columnType10??"estado",Ce=e.column1AvatarVariant??"initials",se=e.column1Editable??!1,fe=e.column2EmailClickable??!0,we=e.column3Editable??!1,pe=e.column3RadioLabel??!1,le=e.column3ToggleLabel??!1,K=e.column3CheckboxLabel!==void 0?e.column3CheckboxLabel:!0,ce={correo:{id:"email",title:"Email"},fecha:{id:"fecha",title:"Fecha"},nombre:{id:"nombre",title:"Nombre"},"nombre-avatar":{id:"nombre",title:"Nombre"},"nombre-avatar-texto":{id:"nombre",title:"Nombre"},estado:{id:"estado",title:"Estado"},progreso:{id:"progreso",title:"Progreso"},pais:{id:"pais",title:"País"},ciudad:{id:"ciudad",title:"Ciudad"},radio:{id:"radio",title:"Selección"},toggle:{id:"toggle",title:"Activo"},checkbox:{id:"checkbox-col",title:"Marcar"},telefono:{id:"telefono",title:"Teléfono"},categoria:{id:"categoria",title:"Categoría"},prioridad:{id:"prioridad",title:"Prioridad"}},ne=(d,C,L,I={})=>{const h={id:C.id,title:C.title,type:d,visible:!0,width:L};return(d==="nombre-avatar"||d==="nombre-avatar-texto")&&(h.avatarVariant=I.avatarVariant||"initials"),["nombre","nombre-avatar","nombre-avatar-texto","estado","fecha","checkbox","radio"].includes(d)&&(h.editable=I.editable||!1),d==="correo"&&(h.emailClickable=I.emailClickable!==void 0?I.emailClickable:!0),d==="radio"&&(h.radioLabel=I.radioLabel!==void 0?I.radioLabel:!1),d==="toggle"&&(h.toggleLabel=I.toggleLabel!==void 0?I.toggleLabel:!1),d==="checkbox"&&(h.checkboxLabel=I.checkboxLabel!==void 0?I.checkboxLabel:!0),h},be=ce[x]||{id:"nombre",title:"Nombre"},oe=ne(x,be,200,{avatarVariant:Ce,editable:se}),P=ce[V]||{id:"email",title:"Email"},Ee=ne(V,P,250,{emailClickable:fe,editable:se}),Te=ce[m]||{id:"estado",title:"Estado"},G=ne(m,Te,150,{editable:we,radioLabel:pe,toggleLabel:le,checkboxLabel:K}),Le=ce[J]||{id:"progreso",title:"Progreso"},de=ne(J,Le,180),xe=ce[t]||{id:"telefono",title:"Teléfono"},M=ce[W]||{id:"ciudad",title:"Ciudad"},N=ce[F]||{id:"pais",title:"País"},z=ce[O]||{id:"fecha",title:"Fecha"},B=ce[te]||{id:"categoria",title:"Categoría"},X=ce[ye]||{id:"prioridad",title:"Prioridad"},he=[oe,Ee,G,de,ne(t,xe,150),ne(W,M,150),ne(F,N,150),ne(O,z,150),ne(te,B,150),ne(ye,X,150)].slice(0,k),ve=(d,C)=>({...d,radio:C===1,toggle:d.estado==="Activo","checkbox-col":C%2===0,area:d.area||"",textoComplementario:d.area||"",progreso:d.progreso||0,telefono:d.telefono||"",ciudad:d.ciudad||"",pais:d.pais||"",fecha:d.fecha||"",categoria:d.categoria||"",prioridad:d.prioridad||""}),ke=[{id:1,nombre:"Juan Pérez",email:"juan.perez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"JP",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:2,nombre:"María García",email:"maria.garcia@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"MG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:3,nombre:"Carlos López",email:"carlos.lopez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"CL",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:4,nombre:"Ana Martínez",email:"ana.martinez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AM",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:5,nombre:"Pedro Rodríguez",email:"pedro.rodriguez@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"PR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:6,nombre:"Valentina Torres",email:"valentina.torres@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"VT",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:7,nombre:"Roberto Fernández",email:"roberto.fernandez@empresa.com",estado:"Inactivo",area:"Marketing",avatar:{initials:"RF",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:8,nombre:"Carmen Torres",email:"carmen.torres@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"CT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:9,nombre:"Diego Morales",email:"diego.morales@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"DM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:10,nombre:"Isabel Moreno",email:"isabel.moreno@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"IM",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:11,nombre:"Andrés Ramírez",email:"andres.ramirez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AR",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:12,nombre:"Patricia Sánchez",email:"patricia.sanchez@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"PS",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:13,nombre:"Fernando Castro",email:"fernando.castro@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"FC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:14,nombre:"Gabriela Herrera",email:"gabriela.herrera@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"GH",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:15,nombre:"Ricardo Mendoza",email:"ricardo.mendoza@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"RM",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:16,nombre:"Claudia Vargas",email:"claudia.vargas@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CV",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:17,nombre:"Javier Ortiz",email:"javier.ortiz@empresa.com",estado:"Inactivo",area:"Marketing",avatar:{initials:"JO",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:18,nombre:"Daniela Jiménez",email:"daniela.jimenez@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DJ",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:19,nombre:"Miguel Ángel Ruiz",email:"miguel.ruiz@empresa.com",estado:"Pendiente",area:"Ventas",avatar:{initials:"MR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:20,nombre:"Elena Castillo",email:"elena.castillo@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"EC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:21,nombre:"Óscar Gutiérrez",email:"oscar.gutierrez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"OG",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:22,nombre:"Natalia Rojas",email:"natalia.rojas@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"NR",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:23,nombre:"Luis Fernando Mejía",email:"luis.mejia@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:24,nombre:"Andrea Salazar",email:"andrea.salazar@empresa.com",estado:"Pendiente",area:"Recursos Humanos",avatar:{initials:"AS",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:25,nombre:"Cristian Peña",email:"cristian.pena@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"CP",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:26,nombre:"Monica Restrepo",email:"monica.restrepo@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"MR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:27,nombre:"Esteban Cardona",email:"esteban.cardona@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"EC",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:28,nombre:"Paola Agudelo",email:"paola.agudelo@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"PA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:29,nombre:"Sergio Velásquez",email:"sergio.velasquez@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"SV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:30,nombre:"Carolina Zapata",email:"carolina.zapata@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CZ",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:31,nombre:"Felipe Ospina",email:"felipe.ospina@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"FO",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:32,nombre:"Tatiana Montoya",email:"tatiana.montoya@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"TM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:33,nombre:"Alejandro Betancur",email:"alejandro.betancur@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"AB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:34,nombre:"Diana Cárdenas",email:"diana.cardenas@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"DC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:35,nombre:"Jorge Iván Londoño",email:"jorge.londono@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"JL",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:36,nombre:"Mariana Uribe",email:"mariana.uribe@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"MU",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:37,nombre:"Camilo Arango",email:"camilo.arango@empresa.com",estado:"Inactivo",area:"Diseño",avatar:{initials:"CA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:38,nombre:"Liliana Osorio",email:"liliana.osorio@empresa.com",estado:"Activo",area:"Ventas",avatar:{initials:"LO",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:39,nombre:"Andrés Felipe Quintero",email:"andres.quintero@empresa.com",estado:"Pendiente",area:"Desarrollo",avatar:{initials:"AQ",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:40,nombre:"Sandra Milena Gómez",email:"sandra.gomez@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"SG",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:41,nombre:"Héctor Fabio Muñoz",email:"hector.munoz@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"HM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:42,nombre:"Yenny Alexandra Parra",email:"yenny.parra@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"YP",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:43,nombre:"Jhon Jairo Vélez",email:"jhon.velez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"JV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:44,nombre:"Adriana Marcela Henao",email:"adriana.henao@empresa.com",estado:"Pendiente",area:"Recursos Humanos",avatar:{initials:"AH",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:45,nombre:"Edwin Mauricio Zapata",email:"edwin.zapata@empresa.com",estado:"Activo",area:"Marketing",avatar:{initials:"EZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:46,nombre:"Mónica Patricia Bedoya",email:"monica.bedoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"MB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:47,nombre:"William Alberto Giraldo",email:"william.giraldo@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"WG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:48,nombre:"Angélica María Cano",email:"angelica.cano@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:49,nombre:"Leonardo Fabio Ríos",email:"leonardo.rios@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"LR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:50,nombre:"Claudia Patricia Arbeláez",email:"claudia.arbelaez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CA",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:51,nombre:"Jairo Alonso Tobón",email:"jairo.tobon@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:52,nombre:"Gloria Inés Mejía",email:"gloria.mejia@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"GM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:53,nombre:"Mauricio Esteban Lopera",email:"mauricio.lopera@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"ML",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:54,nombre:"Beatriz Elena Castrillón",email:"beatriz.castrillon@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"BC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:55,nombre:"César Augusto Restrepo",email:"cesar.restrepo@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CR",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:56,nombre:"Dora Luz Aguirre",email:"dora.aguirre@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:57,nombre:"Óscar Darío Valencia",email:"oscar.valencia@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"OV",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:58,nombre:"Nubia Esperanza Cardona",email:"nubia.cardona@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"NC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:59,nombre:"Alberto Mario Zapata",email:"alberto.zapata@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"AZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:60,nombre:"Esperanza María Ochoa",email:"esperanza.ochoa@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"EO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:61,nombre:"Jorge Mario Gallego",email:"jorge.gallego@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JG",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:62,nombre:"Blanca Nubia Arango",email:"blanca.arango@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"BA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:63,nombre:"Fabio Nelson Uribe",email:"fabio.uribe@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"FU",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:64,nombre:"Martha Cecilia Londoño",email:"martha.londono@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"ML",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:65,nombre:"Hernán Darío Osorio",email:"hernan.osorio@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"HO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:66,nombre:"Luz Dary Montoya",email:"luz.montoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:67,nombre:"Carlos Mario Betancur",email:"carlos.betancur@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"CB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:68,nombre:"Olga Lucía Cárdenas",email:"olga.cardenas@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"OC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:69,nombre:"Jairo Hernán Quintero",email:"jairo.quintero@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JQ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:70,nombre:"Amparo Gómez",email:"amparo.gomez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AG",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:71,nombre:"Gustavo Adolfo Muñoz",email:"gustavo.munoz@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"GM",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:72,nombre:"Rosa Elena Parra",email:"rosa.parra@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"RP",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:73,nombre:"Alvaro de Jesús Vélez",email:"alvaro.velez@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"AV",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:74,nombre:"María Eugenia Henao",email:"maria.henao@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"MH",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:75,nombre:"Jhonatan Zapata",email:"jhonatan.zapata@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"JZ",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:76,nombre:"Yolanda Bedoya",email:"yolanda.bedoya@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"YB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:77,nombre:"Edison Giraldo",email:"edison.giraldo@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"EG",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:78,nombre:"Luz Marina Cano",email:"luz.cano@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"LC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:79,nombre:"Jhon Fredy Ríos",email:"jhon.rios@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JR",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:80,nombre:"Nancy Arbeláez",email:"nancy.arbelaez@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"NA",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:81,nombre:"Jairo Tobón",email:"jairo.tobon2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JT",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:82,nombre:"Gloria Mejía",email:"gloria.mejia2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"GM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:83,nombre:"Mauricio Lopera",email:"mauricio.lopera2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"ML",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:84,nombre:"Beatriz Castrillón",email:"beatriz.castrillon2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"BC",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:85,nombre:"César Restrepo",email:"cesar.restrepo2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"CR",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:86,nombre:"Dora Aguirre",email:"dora.aguirre2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"DA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:87,nombre:"Óscar Valencia",email:"oscar.valencia2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"OV",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:88,nombre:"Nubia Cardona",email:"nubia.cardona2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"NC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:89,nombre:"Alberto Zapata",email:"alberto.zapata2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"AZ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:90,nombre:"Esperanza Ochoa",email:"esperanza.ochoa2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"EO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:91,nombre:"Jorge Gallego",email:"jorge.gallego2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"JG",badgeColor:"pink",imageUrl:"/images/Profile-image.jpg"}},{id:92,nombre:"Blanca Arango",email:"blanca.arango2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"BA",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:93,nombre:"Fabio Uribe",email:"fabio.uribe2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"FU",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:94,nombre:"Martha Londoño",email:"martha.londono2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"ML",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:95,nombre:"Hernán Osorio",email:"hernan.osorio2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"HO",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}},{id:96,nombre:"Luz Montoya",email:"luz.montoya2@empresa.com",estado:"Activo",area:"Diseño",avatar:{initials:"LM",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:97,nombre:"Carlos Betancur",email:"carlos.betancur2@empresa.com",estado:"Inactivo",area:"Ventas",avatar:{initials:"CB",badgeColor:"blue",imageUrl:"/images/Profile-image.jpg"}},{id:98,nombre:"Olga Cárdenas",email:"olga.cardenas2@empresa.com",estado:"Activo",area:"Desarrollo",avatar:{initials:"OC",badgeColor:"green",imageUrl:"/images/Profile-image.jpg"}},{id:99,nombre:"Jairo Quintero",email:"jairo.quintero2@empresa.com",estado:"Pendiente",area:"Marketing",avatar:{initials:"JQ",badgeColor:"orange",imageUrl:"/images/Profile-image.jpg"}},{id:100,nombre:"Amparo Gómez",email:"amparo.gomez2@empresa.com",estado:"Activo",area:"Recursos Humanos",avatar:{initials:"AG",badgeColor:"purple",imageUrl:"/images/Profile-image.jpg"}}].map(C=>({id:C.id,data:ve({nombre:C.nombre,email:C.email,estado:C.estado,area:C.area,progreso:Math.floor(Math.random()*100),telefono:`+57 ${300+C.id} ${Math.floor(Math.random()*1e3)} ${Math.floor(Math.random()*1e4)}`,ciudad:["Bogotá","Medellín","Cali","Barranquilla","Cartagena"][Math.floor(Math.random()*5)],pais:"Colombia",fecha:`2024-${String(Math.floor(Math.random()*12)+1).padStart(2,"0")}-${String(Math.floor(Math.random()*28)+1).padStart(2,"0")}`,categoria:C.area,prioridad:["Alta","Media","Baja"][Math.floor(Math.random()*3)],"checkbox-2":!1,avatar:C.avatar},C.id),expanded:!1,renderExpandedContent:L=>`
                Información adicional
              </h4>
              <p style="margin: 0; font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);">
                Detalles adicionales para ${L.nombre}
              </p>
            </div>
          `})),ue={selectedRowIds:new Set,viewSelectedActive:!1},_e=d=>{const C=d.querySelector(".ubits-data-table__header");if(!C)return;let L=d.querySelector(".ubits-data-table__action-bar");L||(L=document.createElement("div"),L.className="ubits-data-table__action-bar",L.style.cssText=`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          background-color: var(--modifiers-normal-color-light-bg-1);
        `,C.insertAdjacentElement("afterend",L));const I=ue.selectedRowIds.size;if(Array.from(ue.selectedRowIds),I===0){L.style.display="none";return}L.style.display="flex";const h=`(${I})`,A=I>1;let y="";const re=ue.viewSelectedActive,H=re?`Dejar de ver seleccionados ${h}`:`Ver seleccionados ${h}`,Z=re?"eye-slash":"eye";if(A){const Y=[];_&&Y.push(Se({variant:"secondary",size:"sm",text:H,icon:Z,iconStyle:"regular",active:re,attributes:{id:"action-btn-view-selected"}})),ee&&Y.push(Se({variant:"secondary",size:"sm",icon:"bell",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-notifications"}})),v&&Y.push(Se({variant:"error",size:"sm",icon:"trash",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-delete"}})),y=Y.join("")}else{const Y=[];_&&Y.push(Se({variant:"secondary",size:"sm",text:H,icon:Z,iconStyle:"regular",active:re,attributes:{id:"action-btn-view-selected"}})),ee&&Y.push(Se({variant:"secondary",size:"sm",icon:"bell",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-notifications"}})),j&&Y.push(Se({variant:"secondary",size:"sm",icon:"copy",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-copy"}})),T&&Y.push(Se({variant:"secondary",size:"sm",icon:"eye",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-view"}})),$&&Y.push(Se({variant:"secondary",size:"sm",icon:"edit",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-edit"}})),f&&Y.push(Se({variant:"secondary",size:"sm",icon:"download",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-download"}})),v&&Y.push(Se({variant:"error",size:"sm",icon:"trash",iconStyle:"regular",iconOnly:!0,attributes:{id:"action-btn-delete"}})),y=Y.join("")}L.innerHTML=y;const ge=L.querySelector("#action-btn-view-selected");ge&&ge.addEventListener("click",()=>{if(ue.viewSelectedActive=!ue.viewSelectedActive,Ae){const Y=ue.viewSelectedActive?ke.filter(Q=>ue.selectedRowIds.has(Q.id)):ke;Ae.update({rows:Y})}_e(d)}),["notifications","copy","view","edit","download","delete"].forEach(Y=>{const Q=L.querySelector(`#action-btn-${Y}`);Q&&Q.addEventListener("click",()=>{})})};let me=null,Ae=null;const Be=e.dragHandleSticky??!1,U=Be?!0:e.rowReorderable??!0,c=e.expandSticky??!1,s=c?!0:e.rowExpandable??!0,o=e.headerTitle??"Lista de elementos",l=e.showHeaderTitle!==void 0?e.showHeaderTitle:!0,u=e.headerCounter!==void 0?e.headerCounter:!0,r=e.headerDisplayedItems??32,a=e.headerTotalItems??206,n=e.showHeaderPrimaryButton!==void 0?e.showHeaderPrimaryButton:!0,i=e.headerPrimaryButtonText??"Nuevo",b=e.showHeaderSecondaryButtons!==void 0?e.showHeaderSecondaryButtons:!0,p=e.showHeaderSearchButton!==void 0?e.showHeaderSearchButton:!0,E=e.showHeaderFilterButton!==void 0?e.showHeaderFilterButton:!0,S=e.showHeaderColumnSelectorButton!==void 0?e.showHeaderColumnSelectorButton:!0,_=e.showActionButtonViewSelected!==void 0?e.showActionButtonViewSelected:!0,ee=e.showActionButtonNotifications!==void 0?e.showActionButtonNotifications:!0,j=e.showActionButtonCopy!==void 0?e.showActionButtonCopy:!0,T=e.showActionButtonView!==void 0?e.showActionButtonView:!0,$=e.showActionButtonEdit!==void 0?e.showActionButtonEdit:!0,f=e.showActionButtonDownload!==void 0?e.showActionButtonDownload:!0,v=e.showActionButtonDelete!==void 0?e.showActionButtonDelete:!0,g={containerId:R.id,columns:he,rows:ke,columnReorderable:e.columnReorderable??!0,rowReorderable:U,rowExpandable:s,columnSortable:e.columnSortable??!0,showCheckbox:e.showCheckbox??!0,showVerticalScrollbar:e.showVerticalScrollbar??!1,showHorizontalScrollbar:e.showHorizontalScrollbar??!1,showColumnMenu:e.showColumnMenu??!0,showContextMenu:e.showContextMenu??!0,checkboxSticky:e.checkboxSticky??!1,dragHandleSticky:Be,expandSticky:c,showPagination:e.showPagination??!1,currentPage:e.currentPage??1,itemsPerPage:e.itemsPerPage??10,paginationVariant:e.paginationVariant??"default",paginationSize:e.paginationSize??"md",lazyLoad:!1,header:{title:l?o:void 0,showTitle:l,counter:u==="total-only"?"total-only":!!u,displayedItems:r,totalItems:a,showCounter:u,primaryButton:n?{text:i,icon:"plus",iconStyle:"regular",onClick:d=>{alert("Botón primario: "+i)}}:void 0,showPrimaryButton:n,secondaryButtons:b?[{text:"Exportar",icon:"download",iconStyle:"regular",onClick:d=>{alert("Exportar")}},{text:"Importar",icon:"upload",iconStyle:"regular",onClick:d=>{alert("Importar")}}]:void 0,showSecondaryButtons:b,searchButton:p?{placeholder:"Buscar...",value:"",onChange:d=>{},onClick:d=>{},onSearch:(d,C)=>{}}:void 0,showSearchButton:p,filterButton:E?{onClick:d=>{},onApplyFilters:d=>{},onClearFilters:()=>{}}:void 0,showFilterButton:E,columnSelectorButton:S?{onClick:d=>{}}:void 0,showColumnSelectorButton:S},emptyState:{noData:{title:e.emptyStateNoDataTitle||"No hay datos",description:e.emptyStateNoDataDescription||"No se han agregado elementos aún. Comienza agregando tu primer elemento.",icon:e.emptyStateNoDataIcon||"inbox",actionLabel:e.emptyStateNoDataActionLabel,showPrimaryButton:e.emptyStateNoDataShowPrimaryButton||!1,onAction:e.emptyStateNoDataActionLabel?()=>{alert("Acción ejecutada desde empty state (no hay datos)")}:void 0},noSearchResults:{title:e.emptyStateNoSearchResultsTitle||"No se encontraron resultados",description:e.emptyStateNoSearchResultsDescription||"Intenta con otros términos de búsqueda o ajusta los filtros.",icon:e.emptyStateNoSearchResultsIcon||"search",actionLabel:e.emptyStateNoSearchResultsActionLabel,showPrimaryButton:e.emptyStateNoSearchResultsShowPrimaryButton||!1,onAction:e.emptyStateNoSearchResultsActionLabel?()=>{alert("Acción ejecutada desde empty state (no hay resultados de búsqueda)")}:void 0},noFilterResults:{title:e.emptyStateNoFilterResultsTitle||"No hay resultados con los filtros aplicados",description:e.emptyStateNoFilterResultsDescription||"Intenta ajustar los filtros para ver más resultados.",icon:e.emptyStateNoFilterResultsIcon||"filter",actionLabel:e.emptyStateNoFilterResultsActionLabel||"Limpiar filtros",showPrimaryButton:e.emptyStateNoFilterResultsShowPrimaryButton!==void 0?e.emptyStateNoFilterResultsShowPrimaryButton:!0,onAction:()=>{Ae&&alert("Limpiando filtros...")}}},onPageChange:d=>{e.onPageChange&&e.onPageChange(d)},onItemsPerPageChange:d=>{e.onItemsPerPageChange&&e.onItemsPerPageChange(d)},onRowExpand:(d,C)=>{},onColumnReorder:d=>{},onRowReorder:d=>{},onSort:(d,C)=>{},onColumnPin:(d,C)=>{},onRowSelect:(d,C)=>{C?ue.selectedRowIds.add(d):ue.selectedRowIds.delete(d);const L=document.getElementById(ae);L&&_e(L)},onSelectAll:d=>{const C=document.getElementById(ae);if(C){const L=C.querySelector(".ubits-data-table");L&&L.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]').forEach(h=>{const A=h.getAttribute("data-row-id");if(A){const y=isNaN(Number(A))?A:Number(A);d?ue.selectedRowIds.add(y):ue.selectedRowIds.delete(y)}}),_e(C)}}};D.appendChild(R);const w=()=>{const d=document.getElementById(ae);if(!d)return!1;const C=d.querySelector(".ubits-data-table"),L=d.querySelector(".ubits-data-table__scrollable-container");return C||L?!1:(Ae=oa(g),window.__storybookDataTableInstance=Ae,setTimeout(()=>{const I=document.getElementById(ae);I&&(_e(I),me||(me=new MutationObserver(()=>{I.querySelector(".ubits-data-table__action-bar")||setTimeout(()=>{_e(I)},100)}),me.observe(I,{childList:!0,subtree:!0})))},200),!0)};return requestAnimationFrame(()=>{try{w()||setTimeout(()=>{w()},50)}catch(d){console.error("❌ [STORY] Error creating data table:",d)}}),D},args:{columnReorderable:!0,rowReorderable:!0,rowExpandable:!0,columnSortable:!0,showCheckbox:!0,showVerticalScrollbar:!1,showHorizontalScrollbar:!1,showColumnMenu:!0,showContextMenu:!0,checkboxSticky:!1,dragHandleSticky:!1,expandSticky:!1,columnsCount:3,columnType1:"nombre",columnType2:"correo",columnType3:"estado",columnType4:"nombre",column1AvatarVariant:"initials",column1Editable:!1,column2EmailClickable:!0,column3Editable:!1,column3RadioLabel:!1,column3ToggleLabel:!1,column3CheckboxLabel:!1,showPagination:!1,currentPage:1,itemsPerPage:10,paginationVariant:"default",paginationSize:"md",headerTitle:"Lista de elementos",showHeaderTitle:!0,headerCounter:!0,headerDisplayedItems:32,headerTotalItems:206,showHeaderPrimaryButton:!0,headerPrimaryButtonText:"Nuevo",showHeaderSecondaryButtons:!0,showHeaderSearchButton:!0,showHeaderFilterButton:!0,showHeaderColumnSelectorButton:!0}};je.parameters={...je.parameters,docs:{...je.parameters?.docs,source:{originalSource:`{
  render: args => {
    const renderId = \`story-render-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;

    // Contenedor principal con estilos UBITS
    const container = document.createElement('div');
    container.style.cssText = \`
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
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
                Información adicional
              </h4>
              <p style="margin: 0; font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);">
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
          flex-wrap: wrap;
          background-color: var(--modifiers-normal-color-light-bg-1);
        \`;
        header.insertAdjacentElement('afterend', actionBar);
      }

      // Contar selecciones
      const selectedCount = selectionState.selectedRowIds.size;
      const selectedIds = Array.from(selectionState.selectedRowIds);

      // IMPORTANTE: Ocultar la barra si no hay selecciones, mostrarla si hay al menos una
      if (selectedCount === 0) {
        // Ocultar la barra cuando no hay selecciones
        actionBar.style.display = 'none';
        return; // Salir temprano si no hay selecciones
      }

      // Mostrar la barra cuando hay selecciones
      actionBar.style.display = 'flex';
      const countText = \`(\${selectedCount})\`;
      const isMultipleSelection = selectedCount > 1;
      let buttonsHTML = '';

      // Estado del botón "Ver seleccionados" (compartido entre ambos modos)
      const isViewSelectedActive = selectionState.viewSelectedActive;
      const viewSelectedText = isViewSelectedActive ? \`Dejar de ver seleccionados \${countText}\` : \`Ver seleccionados \${countText}\`;
      const viewSelectedIcon = isViewSelectedActive ? 'eye-slash' : 'eye';
      if (isMultipleSelection) {
        // Si hay más de 1 selección: mostrar botones de acciones masivas (ver seleccionados, notificaciones y eliminar)

        const buttons: string[] = [];
        if (showActionButtonViewSelected) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            text: viewSelectedText,
            icon: viewSelectedIcon,
            iconStyle: 'regular',
            active: isViewSelectedActive,
            attributes: {
              id: 'action-btn-view-selected'
            }
          }));
        }
        if (showActionButtonNotifications) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'bell',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: {
              id: 'action-btn-notifications'
            }
          }));
        }
        if (showActionButtonDelete) {
          buttons.push(renderButton({
            variant: 'error',
            size: 'sm',
            icon: 'trash',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: {
              id: 'action-btn-delete'
            }
          }));
        }
        buttonsHTML = buttons.join('');
      } else {
        // Si hay 1 selección: mostrar todos los botones (menú individual)

        const buttons: string[] = [];
        if (showActionButtonViewSelected) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            text: viewSelectedText,
            icon: viewSelectedIcon,
            iconStyle: 'regular',
            active: isViewSelectedActive,
            attributes: {
              id: 'action-btn-view-selected'
            }
          }));
        }
        if (showActionButtonNotifications) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'bell',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: {
              id: 'action-btn-notifications'
            }
          }));
        }
        if (showActionButtonCopy) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'copy',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: {
              id: 'action-btn-copy'
            }
          }));
        }
        if (showActionButtonView) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'eye',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: {
              id: 'action-btn-view'
            }
          }));
        }
        if (showActionButtonEdit) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'edit',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: {
              id: 'action-btn-edit'
            }
          }));
        }
        if (showActionButtonDownload) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'download',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: {
              id: 'action-btn-download'
            }
          }));
        }
        if (showActionButtonDelete) {
          buttons.push(renderButton({
            variant: 'error',
            size: 'sm',
            icon: 'trash',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: {
              id: 'action-btn-delete'
            }
          }));
        }
        buttonsHTML = buttons.join('');
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
          btn.addEventListener('click', () => {});
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

    // Controles de la barra de acciones
    const showActionButtonViewSelected = (args as any).showActionButtonViewSelected !== undefined ? (args as any).showActionButtonViewSelected : true;
    const showActionButtonNotifications = (args as any).showActionButtonNotifications !== undefined ? (args as any).showActionButtonNotifications : true;
    const showActionButtonCopy = (args as any).showActionButtonCopy !== undefined ? (args as any).showActionButtonCopy : true;
    const showActionButtonView = (args as any).showActionButtonView !== undefined ? (args as any).showActionButtonView : true;
    const showActionButtonEdit = (args as any).showActionButtonEdit !== undefined ? (args as any).showActionButtonEdit : true;
    const showActionButtonDownload = (args as any).showActionButtonDownload !== undefined ? (args as any).showActionButtonDownload : true;
    const showActionButtonDelete = (args as any).showActionButtonDelete !== undefined ? (args as any).showActionButtonDelete : true;
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
      showContextMenu: args.showContextMenu ?? true,
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
            alert('Botón primario: ' + headerPrimaryButtonText);
          }
        } : undefined,
        showPrimaryButton: showHeaderPrimaryButton,
        secondaryButtons: showHeaderSecondaryButtons ? [{
          text: 'Exportar',
          icon: 'download',
          iconStyle: 'regular',
          onClick: e => {
            alert('Exportar');
          }
        }, {
          text: 'Importar',
          icon: 'upload',
          iconStyle: 'regular',
          onClick: e => {
            alert('Importar');
          }
        }] : undefined,
        showSecondaryButtons: showHeaderSecondaryButtons,
        searchButton: showHeaderSearchButton ? {
          placeholder: 'Buscar...',
          value: '',
          onChange: value => {},
          onClick: e => {},
          onSearch: (searchTerm, filteredRows) => {}
        } : undefined,
        showSearchButton: showHeaderSearchButton,
        filterButton: showHeaderFilterButton ? {
          onClick: e => {
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
          onApplyFilters: filters => {},
          onClearFilters: () => {}
        } : undefined,
        showFilterButton: showHeaderFilterButton,
        columnSelectorButton: showHeaderColumnSelectorButton ? {
          onClick: e => {
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
            // Limpiar filtros - esto se manejará automáticamente por el componente
            if (tableInstance) {
              // El componente manejará la limpieza de filtros
              alert('Limpiando filtros...');
            }
          }
        }
      },
      onPageChange: page => {
        // En Storybook, actualizar el args para que se refleje en los controles
        if ((args as any).onPageChange) {
          (args as any).onPageChange(page);
        }
      },
      onItemsPerPageChange: itemsPerPage => {
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
        // Actualizar estado de selección
        if (selected) {
          selectionState.selectedRowIds.add(rowId);
        } else {
          selectionState.selectedRowIds.delete(rowId);
        }

        // Actualizar barra de acciones
        const container = document.getElementById(tableContainerId);
        if (container) {
          renderActionBar(container);
        } else {
          // Container no encontrado
        }
      },
      onSelectAll: selected => {
        // Actualizar estado de selección - solo las filas visibles
        const container = document.getElementById(tableContainerId);
        if (container) {
          const table = container.querySelector('.ubits-data-table');
          if (table) {
            const checkboxes = table.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]');
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
          } else {
            // Tabla no encontrada
          }
          renderActionBar(container);
        } else {
          // Container no encontrado
        }
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
    showContextMenu: true,
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
}`,...je.parameters?.docs?.source}}};const ka=["Default"];export{je as Default,ka as __namedExportsOrder,xa as default};
