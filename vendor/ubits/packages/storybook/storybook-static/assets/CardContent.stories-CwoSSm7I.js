const l=["Curso","Cápsula","Charla","Artículo","Podcast","Libro","Ideas de libro","Caso de estudio","Documento técnico","Ejercicios de práctica","Ruta de aprendizaje"],c=["Accountability","Administración de negocios","Agilidad","Comunicación","Cumplimiento (Compliance)","Data skills","Desarrollo de software","Desarrollo web","Digital skills","e-Commerce","Emprendimiento","Experiencia del cliente","Gestión de procesos y operaciones","Gestión de proyectos","Gestión de recursos tecnológicos","Gestión del cambio","Gestión del riesgo","Gestión financiera","Herramientas tecnológicas","Inglés","Innovación","Inteligencia emocional","Lenguajes de Programación","Liderazgo","Marketing","Marketing digital","Negociación","People management","Product design","Productividad","Resolución de problemas","Trabajo en equipo","Ventas","Wellness"],d={Básico:"far fa-gauge-min",Intermedio:"far fa-gauge",Avanzado:"far fa-gauge-max"},p=["Español","Inglés","Portugués"],m={default:{class:"",text:""},progress:{class:"course-status--progress",text:"En progreso"},completed:{class:"course-status--completed",text:"Completado"}},r={UBITS:"assets/images/Favicons/UBITS.jpg",Microsoft:"assets/images/Favicons/Microsoft.jpg",Hubspot:"assets/images/Favicons/Hubspot.jpg","Harvard Business Publishing":"assets/images/Favicons/Harvard-Business-Publishing.jpg",TED:"assets/images/Favicons/TED.jpg",AWS:"assets/images/Favicons/AWS.jpg","Universidad de Los Andes":"assets/images/Favicons/Universidad-de-Los Andes.jpg","Advanced English":"assets/images/Favicons/Advanced-English.jpg","IE University":"assets/images/Favicons/IE-University-Publishing.jpg","Código Facilito":"assets/images/Favicons/Código-Facilito.jpg","Hackers del Talento":"assets/images/Favicons/Hackers-del-Talento.jpg","All Ears English":"assets/images/Favicons/All Ears English.jpg","American & British Academy":"assets/images/Favicons/American & British Academy.jpg","Bureau Veritas":"assets/images/Favicons/Bureau-Veritas.jpg",Welu:"assets/images/Favicons/Welu.jpg","Figsha Smart Consulting":"assets/images/Favicons/Figsha Smart Consulting.jpg",Instafit:"assets/images/Favicons/Instafit.jpg",WOBI:"assets/images/Favicons/WOBI.jpg"};function o(e,t="regular"){const s=t==="solid"?"fas":"far",a=e.startsWith("fa-")?e:`fa-${e}`;return`<i class="${s} ${a}"></i>`}function u(e){const t=m[e.status],s=t.class,a=t.text,i=d[e.level]||d.Intermedio;return`
    <div class="course-card" data-progress="${e.progress}" data-status="${e.status}">
      <div class="course-thumbnail-wrapper">
        <div class="course-thumbnail">
          <img src="${e.image}" alt="${e.title}" class="course-image">
        </div>
        <div class="course-progress-overlay">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${e.progress}%"></div>
          </div>
        </div>
      </div>
      <div class="course-content">
        <div class="course-header">
          <div class="course-type-status">
            <span class="course-type ubits-body-sm-regular">${e.type}</span>
            ${a?`<span class="course-status ${s} ubits-body-sm-bold">${a}</span>`:""}
          </div>
        </div>
        <h3 class="course-title ubits-body-sm-bold">${e.title}</h3>
        <div class="course-provider">
          <div class="provider-avatar">
            <img src="${e.providerLogo}" alt="${e.provider}" class="provider-icon">
          </div>
          <span class="provider-name ubits-body-sm-regular">${e.provider}</span>
        </div>
        <div class="course-competency">
          <div class="spec-icon">
            ${o("fa-tag","regular")}
          </div>
          <span class="ubits-body-sm-regular">${e.competency}</span>
        </div>
        <div class="course-specs">
          <div class="spec-item">
            <div class="spec-icon">
              ${o(i.replace("far ","").replace("fas ",""),i.startsWith("far")?"regular":"solid")}
            </div>
            <span class="ubits-body-sm-regular">${e.level}</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon">
              ${o("fa-clock","regular")}
            </div>
            <span class="ubits-body-sm-regular">${e.duration}</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon">
              ${o("fa-globe","regular")}
            </div>
            <span class="ubits-body-sm-regular">${e.language}</span>
          </div>
        </div>
      </div>
    </div>
  `.trim()}function g(e){const t=u(e),s=document.createElement("div");s.innerHTML=t;const a=s.firstElementChild;if(!a)throw new Error("Failed to create card element");return a}const f={title:"Layout/Card Content",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Card Content UBITS para mostrar contenido de aprendizaje. Soporta 11 tipos de contenido, 35 competencias oficiales, 18 proveedores, 3 niveles, 3 idiomas, y 3 estados (default, progress, completed)."}}},argTypes:{type:{control:{type:"select"},options:l,description:"Tipo de contenido",table:{defaultValue:{summary:"Curso"},type:{summary:l.join(" | ")}}},title:{control:{type:"text"},description:"Título del contenido",table:{defaultValue:{summary:"Segmenta la experiencia del cliente"}}},provider:{control:{type:"select"},options:Object.keys(r),description:"Proveedor/Aliado del contenido",table:{defaultValue:{summary:"UBITS"},type:{summary:Object.keys(r).join(" | ")}}},providerLogo:{control:{type:"text"},description:"Ruta al logo del proveedor (se deriva automáticamente del provider si no se proporciona)",table:{type:{summary:"string"}}},duration:{control:{type:"select"},options:["15 min","30 min","45 min","60 min","75 min","90 min","120 min","180 min","240 min"],description:"Duración del contenido",table:{defaultValue:{summary:"60 min"}}},level:{control:{type:"select"},options:["Básico","Intermedio","Avanzado"],description:"Nivel del contenido",table:{defaultValue:{summary:"Básico"},type:{summary:"Básico | Intermedio | Avanzado"}}},status:{control:{type:"select"},options:["default","progress","completed"],description:"Estado de la card",table:{defaultValue:{summary:"default"},type:{summary:"default | progress | completed"}}},progress:{control:{type:"range",min:0,max:100,step:1},description:"Progreso del contenido (0-100)",table:{defaultValue:{summary:"0"},type:{summary:"number (0-100)"}}},image:{control:{type:"text"},description:"Ruta a la imagen del contenido",table:{defaultValue:{summary:"images/cards-learn/segmenta-la-experiencia-del-cliente.jpg"}}},competency:{control:{type:"select"},options:c,description:"Competencia oficial UBITS",table:{defaultValue:{summary:"Product design"},type:{summary:c.join(" | ")}}},language:{control:{type:"select"},options:p,description:"Idioma del contenido",table:{defaultValue:{summary:"Español"},type:{summary:p.join(" | ")}}}}};function v(e){const t=r[e];return t?t.replace("assets/images/","/images/"):r.UBITS}function y(e){const t=e.provider||"UBITS",s=e.providerLogo||v(t);return{type:e.type||"Curso",title:e.title||"Segmenta la experiencia del cliente",provider:t,providerLogo:s,duration:e.duration||"60 min",level:e.level||"Básico",progress:e.progress??0,status:e.status||"default",image:e.image?e.image.startsWith("/")?e.image:`/${e.image}`:"/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg",competency:e.competency||"Product design",language:e.language||"Español"}}const n={args:{type:"Curso",title:"Segmenta la experiencia del cliente",provider:"UBITS",duration:"60 min",level:"Básico",progress:0,status:"default",competency:"Product design",language:"Español"},render:e=>{const t=y(e),s=document.createElement("div");s.style.display="flex",s.style.justifyContent="center",s.style.alignItems="flex-start",s.style.padding="48px",s.style.background="var(--modifiers-normal-color-light-bg-1)",s.style.border="1px solid var(--modifiers-normal-color-light-border-1)",s.style.borderRadius="8px",s.style.minHeight="400px";const a=document.createElement("div");a.style.maxWidth="360px",a.style.width="100%";const i=g(t);return a.appendChild(i),s.appendChild(a),s}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español'
  },
  render: args => {
    const cardData = buildCardData(args);

    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    container.style.borderRadius = '8px';
    container.style.minHeight = '400px';

    // Crear wrapper para la card (max-width 360px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '360px';
    wrapper.style.width = '100%';

    // Crear card
    const cardElement = createCard(cardData);
    wrapper.appendChild(cardElement);
    container.appendChild(wrapper);
    return container;
  }
}`,...n.parameters?.docs?.source}}};const b=["Default"];export{n as Default,b as __namedExportsOrder,f as default};
