import{r as D}from"./ProgressProvider-DCMY_PMl.js";import{r as y}from"./ButtonProvider-CX_wJeLD.js";import"./iframe-EN31ESOT.js";import"./ListProvider-Dp4g9_1Y.js";import"./SpinnerProvider-o6XHV06V.js";import"./preload-helper-PPVm8Dsz.js";function U(e){if(e===0)return"0 B";const t=1024,o=["B","KB","MB","GB"],r=Math.floor(Math.log(e)/Math.log(t));return Math.round(e/Math.pow(t,r)*100)/100+" "+o[r]}function H(e={}){const{state:t="default",files:o=[],maxFiles:r=6,maxSize:l=5242880,showFileSize:n=!0,showActions:f=!0,showProgress:d=!0,showIcon:s=!1,dropText:h="Arrastra tus archivos aquí",constraintsText:g,selectButtonText:v="Seleccionar archivos",fileName:x,fileExtension:S,fileSize:u,uploadText:O="Haz clic para subir archivo",fileStatus:J="pending",className:w=""}=e,z=o&&o.length>0,i=z&&t!=="files-list"?"files-list":t,$=g||`Máx. ${r} archivos · Hasta ${U(l)}`;if(i==="files-list"&&z){const b=r===1,_=b?o.slice(0,1):o,P=_.map((a,k)=>{const C=a.id||`file-${k}`,c=a.progress!==void 0?a.progress:0;a.status;const M=d&&a.status==="uploading"&&c>0,j=n===!0,V=M===!0;return`
        <div class="ubits-file-upload__file-item" data-file-id="${C}">
          <div class="ubits-file-upload__file-icon">
            <i class="far fa-file"></i>
          </div>
          <div class="ubits-file-upload__file-info">
            <div class="ubits-file-upload__file-name">${a.name}</div>
            ${j?`<div class="ubits-file-upload__file-size">${U(a.size)}</div>`:""}
            ${V?`
              <div class="ubits-file-upload__progress-container">
                ${(()=>{try{return D({size:"xs",value:c,variant:"default",indicator:`${c}%`})}catch(N){return console.error("Error rendering progress bar:",N),`<div class="ubits-progress-bar ubits-progress-bar--xs" style="height: 4px;">
                      <div class="ubits-progress-bar__container">
                        <div class="ubits-progress-bar__indicator-wrapper" style="width: ${c}%;"></div>
                      </div>
                      <span class="ubits-progress-bar__indicator">${c}%</span>
                    </div>`}})()}
              </div>
            `:""}
          </div>
          <button class="ubits-file-upload__file-remove" data-file-id="${C}" aria-label="Eliminar archivo">
            <i class="far fa-times"></i>
          </button>
        </div>
      `}).join(""),E=b?"":`
      <div class="ubits-file-upload__header">
        <h3 class="ubits-file-upload__title">Files (${_.length})</h3>
        <div class="ubits-file-upload__header-actions">
            ${y({variant:"secondary",size:"sm",text:"Agregar archivos",icon:"arrow-up-from-bracket",className:"ubits-file-upload__add-button",attributes:{"aria-label":"Agregar archivos"}})}
            ${y({variant:"error",size:"sm",text:"Eliminar todos",icon:"trash",className:"ubits-file-upload__remove-all-button",attributes:{"aria-label":"Eliminar todos"}})}
        </div>
      </div>
    `;return`
      <div class="ubits-file-upload ubits-file-upload--files-list ${b?"ubits-file-upload--single-mode":""} ${w}">
        ${E}
        <div class="ubits-file-upload__files-list">
          ${P}
        </div>
      </div>
    `.trim()}const B=["ubits-file-upload",`ubits-file-upload--${i}`,w].filter(Boolean).join(" ");let p="var(--modifiers-normal-color-light-border-1)",F="var(--modifiers-normal-color-light-bg-1)";i==="dragging"?p="var(--modifiers-normal-color-light-accent-brand)":i==="error"?p="var(--modifiers-normal-color-light-feedback-accent-error)":i==="disabled"&&(F="var(--modifiers-normal-color-light-bg-disabled)",p="var(--modifiers-normal-color-light-border-disabled)");const I=s?`
    <div class="ubits-file-upload__drop-icon">
      <i class="far fa-file"></i>
    </div>
  `:"",T=i==="disabled",A=y({variant:"secondary",size:"sm",text:v,icon:"arrow-up-from-bracket",disabled:T,className:"ubits-file-upload__select-button",attributes:T?{"aria-disabled":"true"}:{}});return`
    <div class="${B}" 
         style="background-color: ${F}; border-color: ${p};"
         tabindex="${i==="disabled"?"-1":"0"}"
         role="button"
         aria-disabled="${i==="disabled"?"true":"false"}">
      <div class="ubits-file-upload__drop-zone">
        ${I}
        <div class="ubits-file-upload__drop-content">
          <div class="ubits-file-upload__drop-text">${h}</div>
          <div class="ubits-file-upload__constraints">${$}</div>
        </div>
        ${A}
      </div>
    </div>
  `.trim()}const R={title:"Formularios/File Upload",tags:["autodocs"],parameters:{docs:{description:{component:"Componente File Upload personalizado UBITS. Diseño moderno con dos vistas: Drop Zone (área de arrastrar y soltar con icono circular) y Files List (lista de archivos con progreso). Usa componentes UBITS (Button) y tokens UBITS exclusivamente."}},layout:"fullscreen"},argTypes:{state:{control:{type:"select"},options:["default","dragging","error","disabled","files-list"],description:"Estado del componente.",table:{type:{summary:"string"},defaultValue:{summary:"default"},category:"Apariencia"}},files:{control:{type:"object"},description:"Array de archivos a mostrar (para vista files-list).",table:{type:{summary:"FileInfo[]"},defaultValue:{summary:"[]"},category:"Contenido"}},maxFiles:{control:{type:"number",min:1,max:20},description:"Número máximo de archivos permitidos.",table:{type:{summary:"number"},defaultValue:{summary:"6"},category:"Comportamiento"}},maxSize:{control:{type:"number",min:1024,step:1024},description:"Tamaño máximo por archivo en bytes.",table:{type:{summary:"number"},defaultValue:{summary:"5242880 (5MB)"},category:"Comportamiento"}},dropText:{control:{type:"text"},description:"Texto para el área de drop.",table:{type:{summary:"string"},defaultValue:{summary:"Arrastra tus archivos aquí"},category:"Contenido"}},selectButtonText:{control:{type:"text"},description:"Texto del botón de selección.",table:{type:{summary:"string"},defaultValue:{summary:"Seleccionar archivos"},category:"Contenido"}},showIcon:{control:{type:"boolean"},description:"Si se muestra el icono en el drop zone.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Apariencia"}},showFileSize:{control:{type:"boolean"},description:"Si se muestra el tamaño del archivo.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}},showProgress:{control:{type:"boolean"},description:"Si se muestra la barra de progreso.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}}}},m={args:{state:"default",files:[],maxFiles:6,maxSize:5242880,dropText:"Arrastra tus archivos aquí",selectButtonText:"Seleccionar archivos",showIcon:!1,showFileSize:!0,showProgress:!0},render:e=>{const t=document.createElement("div");t.style.cssText=`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--modifiers-normal-color-light-bg-2);
    `;const o=document.createElement("div");o.style.cssText=`
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md);
    `;const r=document.createElement("h2");r.textContent="File Upload",r.style.cssText=`
      color: var(--modifiers-normal-color-light-fg-1-high);
      font-size: var(--modifiers-normal-heading-h2-fontsize);
      font-weight: var(--weight-semibold, 600);
    `;const l=document.createElement("p");l.textContent="Componente File Upload con diseño moderno. Soporta dos vistas: Drop Zone (área de arrastrar y soltar) y Files List (lista de archivos con progreso). Usa componentes UBITS y tokens UBITS exclusivamente.",l.style.cssText=`
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-md-regular-fontsize);
      line-height: var(--modifiers-normal-body-md-regular-lineheight);
    `;const n=document.createElement("div");n.id=`file-upload-container-${Date.now()}`;const f=()=>{n.innerHTML="";let s=e.files||[];e.state==="files-list"&&(!s||s.length===0)&&(s=[{id:"file-1",name:"documento-ejemplo.pdf",size:2048576,progress:45,status:"uploading"},{id:"file-2",name:"imagen-ejemplo.jpg",size:1024e3,progress:100,status:"completed"},{id:"file-3",name:"archivo-ejemplo.docx",size:512e3,progress:0,status:"pending"}]);const g=s&&s.length>0?"files-list":e.state||"default",v=e.showFileSize!==void 0?e.showFileSize:!0,x=e.showProgress!==void 0?e.showProgress:!0,S={state:g,files:s,maxFiles:e.maxFiles||6,maxSize:e.maxSize||5242880,dropText:e.dropText||"Arrastra tus archivos aquí",selectButtonText:e.selectButtonText||"Seleccionar archivos",showIcon:e.showIcon!==void 0?e.showIcon:!1,showFileSize:v,showProgress:x};try{const u=H(S);n.innerHTML=u}catch(u){console.error("[FileUpload Storybook] Error rendering file upload:",u)}};f();let d=null;return setInterval(()=>{const s={showFileSize:e.showFileSize,showProgress:e.showProgress,showIcon:e.showIcon,state:e.state,files:e.files,maxFiles:e.maxFiles,maxSize:e.maxSize};(!d||JSON.stringify(s)!==JSON.stringify(d))&&(d=JSON.parse(JSON.stringify(s)),f())},100),o.appendChild(r),o.appendChild(l),o.appendChild(n),t.appendChild(o),t}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default',
    files: [],
    maxFiles: 6,
    maxSize: 5242880,
    // 5MB
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos',
    showIcon: false,
    showFileSize: true,
    showProgress: true
  },
  render: args => {
    const container = document.createElement('div');
    container.style.cssText = \`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--modifiers-normal-color-light-bg-2);
    \`;
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md);
    \`;
    const title = document.createElement('h2');
    title.textContent = 'File Upload';
    title.style.cssText = \`
      color: var(--modifiers-normal-color-light-fg-1-high);
      font-size: var(--modifiers-normal-heading-h2-fontsize);
      font-weight: var(--weight-semibold, 600);
    \`;
    const description = document.createElement('p');
    description.textContent = 'Componente File Upload con diseño moderno. Soporta dos vistas: Drop Zone (área de arrastrar y soltar) y Files List (lista de archivos con progreso). Usa componentes UBITS y tokens UBITS exclusivamente.';
    description.style.cssText = \`
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-md-regular-fontsize);
      line-height: var(--modifiers-normal-body-md-regular-lineheight);
    \`;
    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = \`file-upload-container-\${Date.now()}\`;
    const createFileUploadContent = () => {
      fileUploadContainer.innerHTML = '';

      // Determinar si mostrar vista de lista o drop zone
      let filesToUse = args.files || [];

      // Si el estado es 'files-list' pero no hay archivos, agregar archivos de ejemplo para probar los controles
      if (args.state === 'files-list' && (!filesToUse || filesToUse.length === 0)) {
        filesToUse = [{
          id: 'file-1',
          name: 'documento-ejemplo.pdf',
          size: 2048576,
          // 2MB
          progress: 45,
          status: 'uploading' as const
        }, {
          id: 'file-2',
          name: 'imagen-ejemplo.jpg',
          size: 1024000,
          // 1MB
          progress: 100,
          status: 'completed' as const
        }, {
          id: 'file-3',
          name: 'archivo-ejemplo.docx',
          size: 512000,
          // 512KB
          progress: 0,
          status: 'pending' as const
        }];
      }
      const hasFiles = filesToUse && filesToUse.length > 0;
      const actualState = hasFiles ? 'files-list' : args.state || 'default';
      const showFileSizeValue = args.showFileSize !== undefined ? args.showFileSize : true;
      const showProgressValue = args.showProgress !== undefined ? args.showProgress : true;
      const options: FileUploadOptions = {
        state: actualState,
        files: filesToUse,
        maxFiles: args.maxFiles || 6,
        maxSize: args.maxSize || 5242880,
        dropText: args.dropText || 'Arrastra tus archivos aquí',
        selectButtonText: args.selectButtonText || 'Seleccionar archivos',
        showIcon: args.showIcon !== undefined ? args.showIcon : false,
        showFileSize: showFileSizeValue,
        showProgress: showProgressValue
      };
      try {
        const html = renderFileUpload(options);
        fileUploadContainer.innerHTML = html;
      } catch (error) {
        console.error('[FileUpload Storybook] Error rendering file upload:', error);
      }
    };
    createFileUploadContent();

    // Usar un objeto para comparar cambios de forma más precisa
    let lastArgsSnapshot: any = null;
    const checkInterval = setInterval(() => {
      // Crear snapshot actual de los args relevantes
      const currentArgsSnapshot = {
        showFileSize: args.showFileSize,
        showProgress: args.showProgress,
        showIcon: args.showIcon,
        state: args.state,
        files: args.files,
        maxFiles: args.maxFiles,
        maxSize: args.maxSize
      };

      // Comparar con el snapshot anterior
      const argsChanged = !lastArgsSnapshot || JSON.stringify(currentArgsSnapshot) !== JSON.stringify(lastArgsSnapshot);
      if (argsChanged) {
        lastArgsSnapshot = JSON.parse(JSON.stringify(currentArgsSnapshot)); // Deep copy
        createFileUploadContent();
      }
    }, 100);
    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(fileUploadContainer);
    container.appendChild(wrapper);
    return container;
  }
}`,...m.parameters?.docs?.source}}};const W=["Default"];export{m as Default,W as __namedExportsOrder,R as default};
