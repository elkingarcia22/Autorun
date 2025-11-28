import{r as ae}from"./AvatarProvider-CF4x-oFR.js";import{c as re}from"./InputProvider-schPVK84.js";import{r as ne}from"./ButtonProvider-CX_wJeLD.js";import{createScrollbar as Q}from"./ScrollProvider-BVL7eCy8.js";import{r as se}from"./StatusTagProvider-6gx2PeGG.js";import{c as ie}from"./DrawerProvider-c2gE_l1d.js";import{r as X}from"./CheckboxProvider-DIr0OIhT.js";import{r as Z}from"./EmptyStateProvider-lfUvNYft.js";import"./iframe-EN31ESOT.js";import"./preload-helper-PPVm8Dsz.js";import"./ListProvider-Dp4g9_1Y.js";import"./ModalProvider-Cwkz7B9R.js";import"./SpinnerProvider-o6XHV06V.js";const oe={bajo:{status:"completed",label:"Bajo"},medio:{status:"pending",label:"Medio"},alto:{status:"not-fulfilled",label:"Alto"},"muy-alto":{status:"denied",label:"Muy alto"}};function j(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function le(t){const c=oe[t],I={label:c.label,size:"xs",status:c.status,rightIcon:null,className:"ubits-participants-menu__status-tag"};return se(I)}function ce(t){const c={size:"sm",alt:t.name,className:"ubits-participants-menu__avatar"};return t.avatarImage?c.imageUrl=t.avatarImage:c.initials=t.name,ae(c)}function ee(t,c,I=!0,v=!0,A=!0){const y=["ubits-participants-menu__item",c?"ubits-participants-menu__item--selected":""].filter(Boolean).join(" "),b=c?"var(--modifiers-normal-color-light-accent-brand)":"var(--modifiers-normal-color-light-fg-1-high)",o=A&&t.status?le(t.status):"",C=I?ce(t):"";return`
    <div class="${y}" data-participant-id="${j(t.id)}" style="
      display: flex;
      align-items: center;
      gap: var(--ubits-spacing-sm);
      padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
      max-height: calc(var(--ubits-spacing-12) - var(--ubits-spacing-xs));
      min-height: calc(var(--ubits-spacing-12) - var(--ubits-spacing-xs));
      box-sizing: border-box;
      border-radius: var(--ubits-border-radius-md);
      cursor: pointer;
      transition: background-color 0.2s ease;
      ${c?"background-color: var(--modifiers-normal-color-light-bg-active);":""}
    ">
      ${C}
      <div class="ubits-participants-menu__item-content" style="
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: var(--ubits-spacing-none);
        justify-content: center;
      ">
        <div class="ubits-participants-menu__item-name ubits-body-sm-bold" style="
          color: ${b};
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-bold, 700);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
        ">
          ${j(t.name)}
        </div>
        ${v?`
        <div class="ubits-participants-menu__item-role ubits-body-sm-regular" style="
          color: var(--modifiers-normal-color-light-fg-1-medium);
          font-size: var(--modifiers-normal-body-sm-regular-fontsize);
          font-weight: var(--weight-regular, 400);
          line-height: var(--modifiers-normal-body-sm-regular-lineheight);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
          margin-top: calc(var(--ubits-spacing-xs) * -0.5);
        ">
          ${j(t.role)}
        </div>
        `:""}
      </div>
      ${o?`<div style="flex-shrink: 0;">${o}</div>`:""}
    </div>
  `.trim()}function Y(t){const{title:c="Participantes",searchPlaceholder:I="Buscar participan...",participants:v=[],selectedParticipantId:A,className:y="",showAvatar:b=!0,showRole:o=!0,showStatusTag:C=!0,enableScrollbar:_=!0}=t,E=["ubits-participants-menu",y].filter(Boolean).join(" "),R=_?v:v.slice(0,6),T=R.map(e=>{const s=e.id===A;return ee(e,s,b,o,C)}).join(""),z=t.searchInputId||(t.containerId?`participants-menu-search-${t.containerId}`:`participants-menu-search-${Date.now()}`),i=I,H=t.activeFilters||{roles:[],statuses:[]},l=(H.roles?.length||0)+(H.statuses?.length||0),N={variant:"secondary",size:"md",icon:"filter",iconStyle:"regular",iconOnly:!0,active:l>0,badge:l>0,className:"ubits-participants-menu__filter-button"};let w=ne(N);if(l>0){const e=`<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${l}</span>`;w=w.replace('<span class="ubits-button__badge"></span>',e)}else w=w.replace(/<span class="ubits-button__badge"><\/span>/g,"");const V=R.length===0,D=t.searchTerm&&t.searchTerm.trim()!=="",G=l>0;let p="";if(V){let e;D?e={title:"No se encontraron resultados",description:"Intenta con otros términos de búsqueda",icon:"search"}:G?e={title:"No hay resultados",description:"No se encontraron participantes con los filtros aplicados",icon:"filter"}:e={title:"No hay participantes",description:"No hay participantes para mostrar",icon:"users"},e&&(p=Z({title:j(e.title),description:e.description?j(e.description):void 0,icon:e.icon}))}return`
    <div class="${E}">
      <div class="ubits-participants-menu__header">
        <h2 class="ubits-participants-menu__title ubits-body-md-bold" style="
          margin: 0;
          font-size: var(--modifiers-normal-body-md-regular-fontsize);
          font-weight: var(--weight-bold, 700);
          line-height: var(--modifiers-normal-body-md-regular-lineheight);
          color: var(--modifiers-normal-color-light-fg-1-high);
          margin-bottom: var(--ubits-spacing-md);
        ">
          ${j(c)}
        </h2>
        <div class="ubits-participants-menu__search-container" style="
          display: flex;
          gap: var(--ubits-spacing-sm);
          margin-bottom: var(--ubits-spacing-md);
        ">
          <div class="ubits-participants-menu__search-input-wrapper" style="
            flex: 1;
          ">
            <div id="${z}" data-search-placeholder="${j(i)}"></div>
          </div>
          <div class="ubits-participants-menu__filter-button-wrapper">
            ${w}
          </div>
        </div>
      </div>
      <div class="ubits-participants-menu__list-wrapper" style="
        display: flex;
        flex: 1;
        min-height: 0;
        position: relative;
      ">
        <div 
          class="ubits-participants-menu__list" 
          id="participants-menu-list-${Date.now()}"
          data-scrollable="true"
          ${_?'data-ubits-scrollbar="true"':""}
          style="
            display: flex;
            flex-direction: column;
            gap: 2px;
            ${_?"overflow-y: auto;":"overflow-y: hidden;"}
            flex: 1;
            min-height: 0;
          "
        >
          ${V?p:T}
        </div>
      </div>
    </div>
  `.trim()}function ue(t){const{containerId:c,onParticipantSelect:I,onSearchChange:v,onFilterClick:A,onFilterChange:y,...b}=t;let o={roles:[],statuses:[]},C="";const _=Array.from(new Set(b.participants.map(e=>e.role))).sort(),E=["bajo","medio","alto","muy-alto"],q=c?`participants-menu-search-${c}`:`participants-menu-search-${Date.now()}`,R=()=>Y({...b,searchInputId:q,activeFilters:o,searchTerm:C}),T=document.createElement("div"),z=R();T.innerHTML=z;const i=T.firstElementChild;if(!i)throw console.error("❌ [ParticipantsMenu] No se pudo crear el elemento del menú"),new Error("No se pudo crear el menú de participantes");const H=()=>{let e=null;if(c){if(e=document.getElementById(c),!e){console.error("❌ [ParticipantsMenu] No se encontró el contenedor con ID:",c);const r=document.querySelectorAll(`[id="${c}"]`);r.length>0?e=r[0]:(console.error("❌ [ParticipantsMenu] No se encontró ningún elemento con ese ID"),e=document.body)}}else e=document.body;if(!e){console.error("❌ [ParticipantsMenu] No se pudo obtener un contenedor válido");return}e.appendChild(i),V(),w();const s=()=>{const r=_.map((u,P)=>{const d=`filter-role-${P}`;return`
          <div class="ubits-participants-menu__filter-item" data-filter-role="${u}">
            <div id="${d}"></div>
          </div>
        `}).join(""),n=E.map((u,P)=>{const d=`filter-status-${P}`;return`
          <div class="ubits-participants-menu__filter-item" data-filter-status="${u}">
            <div id="${d}"></div>
          </div>
        `}).join("");return`
        <div class="ubits-participants-menu__filters-container" style="padding: var(--ubits-spacing-6);">
          <div style="margin-bottom: var(--ubits-spacing-6);">
            <h3 style="
              font-size: var(--modifiers-normal-body-md-regular-fontsize);
              font-weight: var(--weight-bold, 700);
              color: var(--modifiers-normal-color-light-fg-1-high);
              margin: 0 0 var(--ubits-spacing-md) 0;
            ">Rol</h3>
            <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-sm);">
              ${r}
            </div>
          </div>
          <div style="margin-bottom: var(--ubits-spacing-6);">
            <h3 style="
              font-size: var(--modifiers-normal-body-md-regular-fontsize);
              font-weight: var(--weight-bold, 700);
              color: var(--modifiers-normal-color-light-fg-1-high);
              margin: 0 0 var(--ubits-spacing-md) 0;
            ">Estado</h3>
            <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-sm);">
              ${n}
            </div>
          </div>
        </div>
      `};let a=null,h=[];const x=()=>{if(a)try{a.updateContent(s)}catch(r){if(console.error("❌ [ParticipantsMenu] Error al actualizar drawer:",r),a){a.element.remove(),a=null,x();return}}else try{a=ie({title:"Filtros",complementaryText:"Selecciona los filtros que deseas aplicar",width:40,bodyContent:s,footerButtons:{secondary:{label:"Limpiar",onClick:r=>{r.preventDefault(),r.stopPropagation(),o={roles:[],statuses:[]},w(),y&&y(o),a&&(a.updateContent(s),setTimeout(()=>{k()},100))}},primary:{label:"Aplicar",onClick:r=>{r.preventDefault(),r.stopPropagation();const n={roles:[],statuses:[]};a&&(_.forEach((u,P)=>{const d=a.element.querySelector(`[data-filter-role="${u}"]`);if(d){const S=d.querySelector(".ubits-checkbox__input");S&&S.checked&&n.roles.push(u)}}),E.forEach((u,P)=>{const d=a.element.querySelector(`[data-filter-status="${u}"]`);if(d){const S=d.querySelector(".ubits-checkbox__input");S&&S.checked&&n.statuses.push(u)}})),o=n,w(),y&&y(o),a&&a.close()}}},closeOnOverlayClick:!0,onClose:()=>{h.forEach(r=>{try{r.destroy()}catch{}}),h=[]}})}catch(r){console.error("❌ [ParticipantsMenu] Error al crear drawer:",r),A&&A();return}a&&(a.open(),setTimeout(()=>{k()},300))},k=()=>{if(!a)return;h.forEach(n=>{try{n.destroy()}catch{}}),h=[],_.forEach((n,u)=>{const P=`filter-role-${u}`,d=a.element.querySelector(`#${P}`);if(d){d.innerHTML="";const S=o.roles.includes(n),$=X({label:n,name:"filter-role",value:n,checked:S,size:"md"}),M=document.createElement("div");M.innerHTML=$.trim();const m=M.firstElementChild;if(m){d.appendChild(m);const O=m.querySelector(".ubits-checkbox__input"),B=m.querySelector(".ubits-checkbox__square");O&&B&&O.addEventListener("change",K=>{const W=K.target.checked;m.classList.toggle("ubits-checkbox--checked",W);let f=B.querySelector(".ubits-checkbox__checkmark");W?(f||(f=document.createElement("span"),f.className="ubits-checkbox__checkmark",B.appendChild(f)),f.style.opacity="1",f.style.transform="scale(1)"):f&&(f.style.opacity="0",f.style.transform="scale(0)")}),h.push({element:m,destroy:()=>{m.parentNode&&m.parentNode.removeChild(m)},update:()=>{}})}}});const r={bajo:"Bajo",medio:"Medio",alto:"Alto","muy-alto":"Muy Alto"};E.forEach((n,u)=>{const P=`filter-status-${u}`,d=a.element.querySelector(`#${P}`);if(d){d.innerHTML="";const S=o.statuses.includes(n),$=X({label:r[n],name:"filter-status",value:n,checked:S,size:"md"}),M=document.createElement("div");M.innerHTML=$.trim();const m=M.firstElementChild;if(m){d.appendChild(m);const O=m.querySelector(".ubits-checkbox__input"),B=m.querySelector(".ubits-checkbox__square");O&&B&&O.addEventListener("change",K=>{const W=K.target.checked;m.classList.toggle("ubits-checkbox--checked",W);let f=B.querySelector(".ubits-checkbox__checkmark");W?(f||(f=document.createElement("span"),f.className="ubits-checkbox__checkmark",B.appendChild(f)),f.style.opacity="1",f.style.transform="scale(1)"):f&&(f.style.opacity="0",f.style.transform="scale(0)")}),h.push({element:m,destroy:()=>{m.parentNode&&m.parentNode.removeChild(m)},update:()=>{}})}}})},g=i.querySelector(".ubits-participants-menu__filter-button");g&&g.addEventListener("click",()=>{A&&A(),x()}),i.querySelectorAll("[data-participant-id]").forEach(r=>{const n=r.getAttribute("data-participant-id");r.addEventListener("click",()=>{if(n&&I){i.querySelectorAll(".ubits-participants-menu__item--selected").forEach(S=>{S.classList.remove("ubits-participants-menu__item--selected");const $=S.querySelector(".ubits-participants-menu__item-name");$&&($.style.color="var(--modifiers-normal-color-light-fg-1-high)"),S.style.backgroundColor=""}),r.classList.add("ubits-participants-menu__item--selected");const P=r.querySelector(".ubits-participants-menu__item-name");P&&(P.style.color="var(--modifiers-normal-color-light-accent-brand)"),r.style.backgroundColor="var(--modifiers-normal-color-light-bg-active)",i.querySelectorAll(".ubits-participants-menu__item--selected").length>1;try{I(n)}catch(S){console.error("❌ [ParticipantsMenu] Error al ejecutar onParticipantSelect:",S)}}})});let F=null;if(b.enableScrollbar!==!1){const r=i.querySelector('[data-scrollable="true"]');if(r&&r.id){const n=i.querySelector(".ubits-participants-menu__list-wrapper");if(n){const u=`participants-menu-scrollbar-${Date.now()}`;F=document.createElement("div"),F.id=u,F.style.cssText=`
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 8px;
            pointer-events: none;
          `,n.style.position="relative",n.appendChild(F),Q({containerId:u,targetId:r.id,orientation:"vertical"})}}}else{const r=i.querySelector('[data-scrollable="true"]');r&&r.removeAttribute("data-ubits-scrollbar")}};let l=null,N=!1;const w=()=>{const e=i.querySelector(".ubits-participants-menu__filter-button");if(!e)return;const s=(o.roles?.length||0)+(o.statuses?.length||0),a=e.querySelector(".ubits-button__badge");if(s>0){if(a)if(a.classList.contains("ubits-badge--number"))a.textContent=`${s}`;else{const h=`<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${s}</span>`,x=document.createElement("div");x.innerHTML=h;const k=x.firstElementChild;k&&a.parentNode&&a.parentNode.replaceChild(k,a)}else{const h=document.createElement("span");h.className="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge",h.textContent=`${s}`,e.appendChild(h)}e.classList.add("ubits-button--active")}else a&&a.remove(),e.classList.remove("ubits-button--active")},V=()=>{setTimeout(()=>{const e=i.querySelector(`#${q}`);if(e){const s=e.getAttribute("data-search-placeholder")||t.searchPlaceholder||"Buscar participan...",a=t.preservedSearchValue||"",h={containerId:q,type:"search",size:"md",placeholder:s,showLabel:!1,className:"ubits-participants-menu__search-input",value:a,onChange:(x,k)=>{if(!N){if(C=x||"",v)try{v(x)}catch(g){console.error("[ParticipantsMenu] Error en onSearchChange:",g)}w()}}};a&&(N=!0),l=re(h),l?.inputElement?(a&&l.inputElement.value!==a&&l.setValue(a),setTimeout(()=>{N=!1},150)):(N=!1,console.error("[ParticipantsMenu] No se pudo crear input"))}},0)};c?requestAnimationFrame(()=>{document.getElementById(c)?H():requestAnimationFrame(H)}):H();const D=(e,s)=>{const a=i.querySelector(".ubits-participants-menu__list");if(!a)return;const x=b.enableScrollbar!==!1?e:e.slice(0,6),k=x.map(n=>{const u=n.id===s;return ee(n,u,b.showAvatar!==!1,b.showRole!==!1,b.showStatusTag!==!1)}).join(""),g=x.length===0,L=C&&C.trim()!=="",F=(o.roles?.length||0)+(o.statuses?.length||0)>0;let r="";if(g){let n;L?n={title:"No se encontraron resultados",description:"Intenta con otros términos de búsqueda",icon:"search"}:F?n={title:"No hay resultados",description:"No se encontraron participantes con los filtros aplicados",icon:"filter"}:n={title:"No hay participantes",description:"No hay participantes para mostrar",icon:"users"},n&&(r=Z({title:j(n.title),description:n.description?j(n.description):void 0,icon:n.icon}))}a.innerHTML=g?r:k,g||i.querySelectorAll("[data-participant-id]").forEach(u=>{const P=u.getAttribute("data-participant-id"),d=u.cloneNode(!0);u.parentNode?.replaceChild(d,u),d.addEventListener("click",()=>{if(P&&I){i.querySelectorAll(".ubits-participants-menu__item--selected").forEach(M=>{M.classList.remove("ubits-participants-menu__item--selected");const m=M.querySelector(".ubits-participants-menu__item-name");m&&(m.style.color="var(--modifiers-normal-color-light-fg-1-high)"),M.style.backgroundColor=""}),d.classList.add("ubits-participants-menu__item--selected");const $=d.querySelector(".ubits-participants-menu__item-name");$&&($.style.color="var(--modifiers-normal-color-light-accent-brand)"),d.style.backgroundColor="var(--modifiers-normal-color-light-bg-active)";try{I(P)}catch(M){console.error("❌ [ParticipantsMenu] Error al ejecutar onParticipantSelect:",M)}}})}),w()};return{element:i,update:e=>{if(e.participants&&Object.keys(e).every(g=>g==="participants"||g==="selectedParticipantId")&&l){D(e.participants,e.selectedParticipantId);return}if(e.enableScrollbar!==void 0&&e.enableScrollbar!==b.enableScrollbar){const g=i.querySelector(".ubits-participants-menu__list-wrapper");if(g){const L=g.querySelector('[id^="participants-menu-scrollbar-"]');L&&L.remove()}}const a={...b,...e},h=Y({...a,searchInputId:q,activeFilters:o,searchTerm:C}),x=document.createElement("div");x.innerHTML=h;const k=x.firstElementChild;if(k&&i.parentNode)if(i.parentNode.replaceChild(k,i),Object.assign(i,k),V(),w(),a.enableScrollbar!==!1){const g=i.querySelector('[data-scrollable="true"]');if(g&&g.id){const L=i.querySelector(".ubits-participants-menu__list-wrapper");if(L){const F=`participants-menu-scrollbar-${Date.now()}`,r=document.createElement("div");r.id=F,r.style.cssText=`
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 8px;
              pointer-events: none;
            `,L.style.position="relative",L.appendChild(r),Q({containerId:F,targetId:g.id,orientation:"vertical"})}}}else{const g=i.querySelector('[data-scrollable="true"]');g&&g.removeAttribute("data-ubits-scrollbar")}},updateParticipantsList:D,destroy:()=>{i.parentNode&&i.parentNode.removeChild(i)}}}const Ce={title:"Navegación/Menu de Participantes",tags:["autodocs"],parameters:{docs:{description:{component:"Componente de menú lateral UBITS para mostrar una lista de participantes. Incluye búsqueda, filtro y lista de participantes con avatar, nombre, rol y estado."}},layout:"fullscreen"},argTypes:{title:{control:{type:"text"},description:"Título del menú",table:{type:{summary:"string"},defaultValue:{summary:"Participantes"},category:"Contenido"}},searchPlaceholder:{control:{type:"text"},description:"Placeholder del input de búsqueda",table:{type:{summary:"string"},defaultValue:{summary:"Buscar participan..."},category:"Contenido"}},showAvatar:{control:{type:"boolean"},description:"Mostrar avatar de los participantes",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Apariencia"}},showRole:{control:{type:"boolean"},description:"Mostrar rol (texto complementario) de los participantes",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Apariencia"}},showStatusTag:{control:{type:"boolean"},description:"Mostrar status tag de los participantes",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Apariencia"}},enableScrollbar:{control:{type:"boolean"},description:"Activar scrollbar de UBITS para la lista de participantes",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Funcionalidad"}},selectedParticipantId:{control:{type:"select"},options:["1","2","3","4","5","6","7","8","9",void 0],description:"ID del participante seleccionado",table:{type:{summary:"string"},defaultValue:{summary:"1"},category:"Estado"}}}},J=[{id:"1",name:"Elkin Garcia",role:"Producto",avatarImage:"https://randomuser.me/api/portraits/men/1.jpg",status:"bajo",selected:!0},{id:"2",name:"Estefanía Rojas",role:"Ventas",avatarImage:"https://randomuser.me/api/portraits/women/2.jpg",status:"muy-alto"},{id:"3",name:"Ligia salazar",role:"Ventas",avatarImage:"https://randomuser.me/api/portraits/women/3.jpg",status:"muy-alto"},{id:"4",name:"Cristian Perez",role:"Recursos humanos",avatarImage:"https://randomuser.me/api/portraits/men/4.jpg",status:"muy-alto"},{id:"5",name:"Matias Castillo",role:"Tecnología",avatarImage:"https://randomuser.me/api/portraits/women/5.jpg",status:"muy-alto"},{id:"6",name:"Nelson Prado",role:"Producto",avatarImage:"https://randomuser.me/api/portraits/men/6.jpg",status:"muy-alto"},{id:"7",name:"Alisson Vélez",role:"Tecnología",avatarImage:"https://randomuser.me/api/portraits/women/7.jpg",status:"muy-alto"},{id:"8",name:"Andres Lopez",role:"Producto",avatarImage:"https://randomuser.me/api/portraits/men/8.jpg",status:"muy-alto"},{id:"9",name:"Carlos Torres",role:"Tecnología",avatarImage:"https://randomuser.me/api/portraits/men/9.jpg",status:"muy-alto"},{id:"10",name:"María González",role:"Marketing",avatarImage:"https://randomuser.me/api/portraits/women/10.jpg",status:"medio"},{id:"11",name:"Juan Martínez",role:"Ventas",avatarImage:"https://randomuser.me/api/portraits/men/11.jpg",status:"alto"},{id:"12",name:"Ana Rodríguez",role:"Producto",avatarImage:"https://randomuser.me/api/portraits/women/12.jpg",status:"bajo"},{id:"13",name:"Pedro Sánchez",role:"Tecnología",avatarImage:"https://randomuser.me/api/portraits/men/13.jpg",status:"medio"},{id:"14",name:"Patricia Fernández",role:"Recursos humanos",avatarImage:"https://randomuser.me/api/portraits/women/14.jpg",status:"alto"},{id:"15",name:"Diego Ramírez",role:"Marketing",avatarImage:"https://randomuser.me/api/portraits/men/15.jpg",status:"bajo"},{id:"16",name:"Valentina Morales",role:"Ventas",avatarImage:"https://randomuser.me/api/portraits/women/16.jpg",status:"medio"},{id:"17",name:"Ricardo Herrera",role:"Producto",avatarImage:"https://randomuser.me/api/portraits/men/17.jpg",status:"alto"},{id:"18",name:"Carmen Jiménez",role:"Tecnología",avatarImage:"https://randomuser.me/api/portraits/women/18.jpg",status:"bajo"},{id:"19",name:"Fernando Castro",role:"Marketing",avatarImage:"https://randomuser.me/api/portraits/men/19.jpg",status:"medio"},{id:"20",name:"Isabel Ruiz",role:"Recursos humanos",avatarImage:"https://randomuser.me/api/portraits/women/20.jpg",status:"alto"}],U={args:{title:"Participantes",searchPlaceholder:"Buscar participan...",participants:J,selectedParticipantId:"1",showAvatar:!0,showRole:!0,showStatusTag:!0,enableScrollbar:!0},render:t=>{const c=document.createElement("div");c.style.cssText=`
      width: 100%;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      position: relative;
      border: none;
      overflow: hidden;
    `;const I=document.createElement("div");I.style.cssText="max-width: 500px; width: 100%; margin: 0 auto;";const v=document.createElement("div"),A=`participants-menu-container-${Date.now()}`;v.id=A,v.style.cssText=`
      width: 100%;
      height: 100%;
    `,I.appendChild(v),c.appendChild(I);let y="",b=!1,o=!1,C=null,_=!1,E=null,q={roles:[],statuses:[]};const R=l=>JSON.stringify({title:l.title,searchPlaceholder:l.searchPlaceholder,selectedParticipantId:l.selectedParticipantId,showAvatar:l.showAvatar,showRole:l.showRole,showStatusTag:l.showStatusTag});let T=R(t);const z=()=>{const l=v.querySelector(".ubits-participants-menu"),N=l?l.querySelector(".ubits-input"):v.querySelector(".ubits-input");let w=0,V=!1;N&&(y=N.value||"",w=N.selectionStart||0,V=document.activeElement===N),v.innerHTML="";const D=(t.participants||J).map(p=>({...p,selected:!1})),G={title:t.title||"Participantes",searchPlaceholder:t.searchPlaceholder||"Buscar participan...",participants:D,selectedParticipantId:t.selectedParticipantId,showAvatar:t.showAvatar!==void 0?t.showAvatar:!0,showRole:t.showRole!==void 0?t.showRole:!0,showStatusTag:t.showStatusTag!==void 0?t.showStatusTag:!0,enableScrollbar:t.enableScrollbar!==void 0?t.enableScrollbar:!0,preservedSearchValue:y,onParticipantSelect:p=>{b=!0,t.selectedParticipantId=p,T=R(t)},onSearchChange:p=>{y=p||"",C&&clearTimeout(C),C=setTimeout(()=>{_=!0;let e=[...J];p&&p.trim()!==""&&(e=e.filter(s=>{const a=s.name.toLowerCase().includes(p.toLowerCase()),h=s.role.toLowerCase().includes(p.toLowerCase());return a||h})),q.roles.length>0&&(e=e.filter(s=>q.roles.includes(s.role))),q.statuses.length>0&&(e=e.filter(s=>s.status&&q.statuses.includes(s.status))),t.participants=e,E?.updateParticipantsList?(o=!0,E.updateParticipantsList(e,t.selectedParticipantId),T=R(t),setTimeout(()=>{_=!1,o=!1},100)):(o=!0,z(),setTimeout(()=>{_=!1,o=!1},50)),C=null},300)},onFilterClick:()=>{},onFilterChange:p=>{q=p;let e=[...J];p.roles.length>0&&(e=e.filter(s=>p.roles.includes(s.role))),p.statuses.length>0&&(e=e.filter(s=>s.status&&p.statuses.includes(s.status))),y&&y.trim()!==""&&(e=e.filter(s=>{const a=s.name.toLowerCase().includes(y.toLowerCase()),h=s.role.toLowerCase().includes(y.toLowerCase());return a||h})),t.participants=e,E?.updateParticipantsList?(o=!0,E.updateParticipantsList(e,t.selectedParticipantId),T=R(t),setTimeout(()=>{o=!1},100)):(o=!0,z(),setTimeout(()=>{o=!1},50))},containerId:A};setTimeout(()=>{try{const p=v.querySelector(".ubits-participants-menu");p&&p.remove(),E=ue(G),V&&setTimeout(()=>{const e=v.querySelector(".ubits-input");if(e){e.focus();const s=e.value||"",a=Math.min(w,s.length);e.setSelectionRange(a,a)}},100)}catch(p){console.error("[Story] Error:",p)}},0)};z();let i=null;return(()=>{i||(i=setInterval(()=>{if(_)return;const l=R(t);if(l!==T){if(b){b=!1,T=l;return}if(o){o=!1,T=l;return}T=l,z()}},100))})(),c}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Participantes',
    searchPlaceholder: 'Buscar participan...',
    participants: sampleParticipants,
    selectedParticipantId: '1',
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: args => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = \`
      width: 100%;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      position: relative;
      border: none;
      overflow: hidden;
    \`;

    // Wrapper para limitar el ancho
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto;';

    // Contenedor para el menú
    const menuContainer = document.createElement('div');
    const containerId = \`participants-menu-container-\${Date.now()}\`;
    menuContainer.id = containerId;
    menuContainer.style.cssText = \`
      width: 100%;
      height: 100%;
    \`;

    // Insertar el contenedor del menú en el wrapper
    wrapper.appendChild(menuContainer);
    // Insertar el wrapper en el container
    container.appendChild(wrapper);

    // Variable para preservar el valor del input de búsqueda
    let preservedSearchValue = '';
    // Flag para evitar re-render cuando viene de selección interna
    let skipNextRender = false;
    // Flag para evitar re-render cuando viene de búsqueda
    let skipNextRenderFromSearch = false;
    // Timeout para debounce del buscador
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;
    // Flag para indicar que se está procesando una búsqueda
    let isProcessingSearch = false;
    // Referencia a la instancia del menú para poder usar updateParticipantsList
    let menuInstance: ReturnType<typeof createParticipantsMenu> | null = null;
    // Estado de filtros activos
    let activeFilters: {
      roles: string[];
      statuses: ParticipantStatus[];
    } = {
      roles: [],
      statuses: []
    };

    // Función para obtener solo los args relevantes (sin participants)
    const getRelevantArgs = (args: any) => {
      return JSON.stringify({
        title: args.title,
        searchPlaceholder: args.searchPlaceholder,
        selectedParticipantId: args.selectedParticipantId,
        showAvatar: args.showAvatar,
        showRole: args.showRole,
        showStatusTag: args.showStatusTag
        // NO incluir participants aquí para evitar re-renders por búsqueda
      });
    };
    let lastArgs = getRelevantArgs(args);
    const createMenuContent = () => {
      // Preservar el valor y posición del cursor del input antes de limpiar
      const existingMenu = menuContainer.querySelector('.ubits-participants-menu');
      const existingInput = existingMenu ? existingMenu.querySelector('.ubits-input') as HTMLInputElement : menuContainer.querySelector('.ubits-input') as HTMLInputElement;
      let cursorPosition = 0;
      let shouldRestoreFocus = false;
      if (existingInput) {
        preservedSearchValue = existingInput.value || '';
        cursorPosition = existingInput.selectionStart || 0;
        shouldRestoreFocus = document.activeElement === existingInput;
      }
      menuContainer.innerHTML = '';

      // Limpiar participant.selected de todos los participantes para evitar que quede pegado
      const cleanedParticipants = (args.participants || sampleParticipants).map(p => ({
        ...p,
        selected: false // Limpiar selected para que solo use selectedParticipantId
      }));

      // Crear opciones del menú
      const menuOptions: ParticipantsMenuOptions = {
        title: args.title || 'Participantes',
        searchPlaceholder: args.searchPlaceholder || 'Buscar participan...',
        participants: cleanedParticipants,
        selectedParticipantId: args.selectedParticipantId,
        showAvatar: args.showAvatar !== undefined ? args.showAvatar : true,
        showRole: args.showRole !== undefined ? args.showRole : true,
        showStatusTag: args.showStatusTag !== undefined ? args.showStatusTag : true,
        enableScrollbar: args.enableScrollbar !== undefined ? args.enableScrollbar : true,
        preservedSearchValue: preservedSearchValue,
        // Pasar el valor preservado
        onParticipantSelect: participantId => {
          // Activar flag para evitar re-render cuando el intervalo detecte el cambio
          skipNextRender = true;
          // Actualizar selección sin re-renderizar
          args.selectedParticipantId = participantId;
          // Actualizar lastArgs inmediatamente para que el setInterval no detecte cambios
          lastArgs = getRelevantArgs(args);
          // NO llamar createMenuContent() - la selección visual ya se actualizó en el componente
          // El flag skipNextRender evitará que el intervalo cause un re-render
        },
        onSearchChange: searchText => {
          preservedSearchValue = searchText || '';
          if (searchTimeout) {
            clearTimeout(searchTimeout);
          }
          searchTimeout = setTimeout(() => {
            isProcessingSearch = true;
            let filteredParticipants: Participant[] = [...sampleParticipants];

            // Aplicar búsqueda de texto
            if (searchText && searchText.trim() !== '') {
              filteredParticipants = filteredParticipants.filter(p => {
                const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
                const matchesRole = p.role.toLowerCase().includes(searchText.toLowerCase());
                return matchesName || matchesRole;
              });
            }

            // Aplicar filtros de roles
            if (activeFilters.roles.length > 0) {
              filteredParticipants = filteredParticipants.filter(p => activeFilters.roles.includes(p.role));
            }

            // Aplicar filtros de estados
            if (activeFilters.statuses.length > 0) {
              filteredParticipants = filteredParticipants.filter(p => p.status && activeFilters.statuses.includes(p.status));
            }
            args.participants = filteredParticipants;
            if (menuInstance?.updateParticipantsList) {
              skipNextRenderFromSearch = true;
              menuInstance.updateParticipantsList(filteredParticipants, args.selectedParticipantId);
              // Actualizar lastArgs inmediatamente para que el setInterval no detecte cambios
              lastArgs = getRelevantArgs(args);
              setTimeout(() => {
                isProcessingSearch = false;
                skipNextRenderFromSearch = false;
              }, 100); // Aumentar tiempo para asegurar que el setInterval no detecte cambios
            } else {
              skipNextRenderFromSearch = true;
              createMenuContent();
              setTimeout(() => {
                isProcessingSearch = false;
                skipNextRenderFromSearch = false;
              }, 50);
            }
            searchTimeout = null;
          }, 300);
        },
        onFilterClick: () => {
          // Handler para click en filtros
        },
        onFilterChange: filters => {
          activeFilters = filters;

          // Aplicar filtros a los participantes
          let filteredParticipants = [...sampleParticipants];

          // Filtrar por roles
          if (filters.roles.length > 0) {
            filteredParticipants = filteredParticipants.filter(p => filters.roles.includes(p.role));
          }

          // Filtrar por estados
          if (filters.statuses.length > 0) {
            filteredParticipants = filteredParticipants.filter(p => p.status && filters.statuses.includes(p.status));
          }

          // También aplicar búsqueda si hay texto
          if (preservedSearchValue && preservedSearchValue.trim() !== '') {
            filteredParticipants = filteredParticipants.filter(p => {
              const matchesName = p.name.toLowerCase().includes(preservedSearchValue.toLowerCase());
              const matchesRole = p.role.toLowerCase().includes(preservedSearchValue.toLowerCase());
              return matchesName || matchesRole;
            });
          }
          args.participants = filteredParticipants;
          if (menuInstance?.updateParticipantsList) {
            skipNextRenderFromSearch = true;
            menuInstance.updateParticipantsList(filteredParticipants, args.selectedParticipantId);
            lastArgs = getRelevantArgs(args);
            setTimeout(() => {
              skipNextRenderFromSearch = false;
            }, 100);
          } else {
            skipNextRenderFromSearch = true;
            createMenuContent();
            setTimeout(() => {
              skipNextRenderFromSearch = false;
            }, 50);
          }
        },
        containerId: containerId
      };
      setTimeout(() => {
        try {
          const existingMenu = menuContainer.querySelector('.ubits-participants-menu');
          if (existingMenu) {
            existingMenu.remove();
          }
          menuInstance = createParticipantsMenu(menuOptions);
          if (shouldRestoreFocus) {
            setTimeout(() => {
              const newInput = menuContainer.querySelector('.ubits-input') as HTMLInputElement;
              if (newInput) {
                newInput.focus();
                const currentValue = newInput.value || '';
                const safePosition = Math.min(cursorPosition, currentValue.length);
                newInput.setSelectionRange(safePosition, safePosition);
              }
            }, 100);
          }
        } catch (error) {
          console.error('[Story] Error:', error);
        }
      }, 0);
    };

    // Crear contenido inicial
    createMenuContent();

    // Observar cambios en args
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    const startWatching = () => {
      if (checkInterval) return;
      checkInterval = setInterval(() => {
        // Si se está procesando una búsqueda, no verificar cambios
        if (isProcessingSearch) {
          return;
        }
        const currentArgs = getRelevantArgs(args);
        if (currentArgs !== lastArgs) {
          if (skipNextRender) {
            skipNextRender = false;
            lastArgs = currentArgs;
            return;
          }
          if (skipNextRenderFromSearch) {
            skipNextRenderFromSearch = false;
            lastArgs = currentArgs;
            return;
          }
          lastArgs = currentArgs;
          createMenuContent();
        }
      }, 100);
    };
    startWatching();

    // El menuContainer ya fue insertado arriba, no necesitamos insertarlo de nuevo
    return container;
  }
}`,...U.parameters?.docs?.source}}};const xe=["Default"];export{U as Default,xe as __namedExportsOrder,Ce as default};
