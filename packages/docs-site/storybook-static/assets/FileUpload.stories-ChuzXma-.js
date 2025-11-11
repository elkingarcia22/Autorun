import{r as k}from"./ProgressProvider-OoWtyPYr.js";import"./iframe-BfFsla13.js";import"./preload-helper-PPVm8Dsz.js";function T(e){if(e===0)return"0 B";const s=1024,t=["B","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(s));return Math.round(e/Math.pow(s,o)*100)/100+" "+t[o]}function A(e={}){const{state:s="default",files:t=[],maxFiles:o=6,maxSize:r=5242880,showFileSize:i=!0,showActions:f=!0,showProgress:c=!0,showIcon:l=!1,dropText:h="Arrastra tus archivos aquí",constraintsText:m,selectButtonText:d="Seleccionar archivos",fileName:D,fileExtension:M,fileSize:I,uploadText:P="Haz clic para subir archivo",fileStatus:H="pending",className:v=""}=e,x=t&&t.length>0,a=x&&s!=="files-list"?"files-list":s,F=m||`Máx. ${o} archivos · Hasta ${T(r)}`;if(a==="files-list"&&x){const b=o===1,w=b?t.slice(0,1):t,U=w.map((n,B)=>{const S=n.id||`file-${B}`,g=n.progress!==void 0?n.progress:0;n.status;const E=c&&n.status==="uploading"&&g>0;return`
        <div class="ubits-file-upload__file-item" data-file-id="${S}">
          <div class="ubits-file-upload__file-icon">
            <i class="far fa-file"></i>
          </div>
          <div class="ubits-file-upload__file-info">
            <div class="ubits-file-upload__file-name">${n.name}</div>
            ${i?`<div class="ubits-file-upload__file-size">${T(n.size)}</div>`:""}
            ${E?`
              <div class="ubits-file-upload__progress-container">
                ${k({size:"xs",value:g,variant:"default",indicator:`${g}%`})}
              </div>
            `:""}
          </div>
          <button class="ubits-file-upload__file-remove" data-file-id="${S}" aria-label="Eliminar archivo">
            <i class="far fa-times"></i>
          </button>
        </div>
      `}).join(""),$=b?"":`
      <div class="ubits-file-upload__header">
        <h3 class="ubits-file-upload__title">Files (${w.length})</h3>
        <div class="ubits-file-upload__header-actions">
            <button class="ubits-button ubits-button--secondary ubits-button--sm ubits-file-upload__add-button" aria-label="Agregar archivos">
              <i class="far fa-arrow-up-from-bracket"></i> Agregar archivos
            </button>
            <button class="ubits-button ubits-button--secondary ubits-button--sm ubits-file-upload__remove-all-button" aria-label="Eliminar todos">
              <i class="far fa-trash"></i> Eliminar todos
            </button>
        </div>
      </div>
    `;return`
      <div class="ubits-file-upload ubits-file-upload--files-list ${b?"ubits-file-upload--single-mode":""} ${v}">
        ${$}
        <div class="ubits-file-upload__files-list">
          ${U}
        </div>
      </div>
    `.trim()}const _=["ubits-file-upload",`ubits-file-upload--${a}`,v].filter(Boolean).join(" ");let u="var(--ubits-border-1, #d0d2d5)",y="var(--ubits-bg-1, #ffffff)";a==="dragging"?u="var(--ubits-accent-brand-static-inverted, #0c5bef)":a==="error"?u="var(--ubits-feedback-accent-error, #e9343c)":a==="disabled"&&(y="var(--ubits-bg-disabled, #edeeef)",u="var(--ubits-border-disabled, #e1e2e5)");const C=l?`
    <div class="ubits-file-upload__drop-icon">
      <i class="far fa-file"></i>
    </div>
  `:"",z=`
    <button class="ubits-button ubits-button--secondary ubits-button--sm ubits-file-upload__select-button" type="button">
      <i class="far fa-arrow-up-from-bracket"></i> ${d}
    </button>
  `;return`
    <div class="${_}" 
         style="background-color: ${y}; border-color: ${u};"
         tabindex="${a==="disabled"?"-1":"0"}"
         role="button"
         aria-disabled="${a==="disabled"?"true":"false"}">
      <div class="ubits-file-upload__drop-zone">
        ${C}
        <div class="ubits-file-upload__drop-content">
          <div class="ubits-file-upload__drop-text">${h}</div>
          <div class="ubits-file-upload__constraints">${F}</div>
        </div>
        ${z}
      </div>
    </div>
  `.trim()}const O={title:"Components/File Upload",tags:["autodocs"],parameters:{docs:{description:{component:"Componente File Upload personalizado UBITS. Diseño moderno con dos vistas: Drop Zone (área de arrastrar y soltar con icono circular) y Files List (lista de archivos con progreso). Usa componentes UBITS (Button) y tokens UBITS exclusivamente."}},layout:"fullscreen"},argTypes:{state:{control:{type:"select"},options:["default","dragging","error","disabled","files-list"],description:"Estado del componente.",table:{type:{summary:"string"},defaultValue:{summary:"default"},category:"Apariencia"}},files:{control:{type:"object"},description:"Array de archivos a mostrar (para vista files-list).",table:{type:{summary:"FileInfo[]"},defaultValue:{summary:"[]"},category:"Contenido"}},maxFiles:{control:{type:"number",min:1,max:20},description:"Número máximo de archivos permitidos.",table:{type:{summary:"number"},defaultValue:{summary:"6"},category:"Comportamiento"}},maxSize:{control:{type:"number",min:1024,step:1024},description:"Tamaño máximo por archivo en bytes.",table:{type:{summary:"number"},defaultValue:{summary:"5242880 (5MB)"},category:"Comportamiento"}},dropText:{control:{type:"text"},description:"Texto para el área de drop.",table:{type:{summary:"string"},defaultValue:{summary:"Drop your files here"},category:"Contenido"}},selectButtonText:{control:{type:"text"},description:"Texto del botón de selección.",table:{type:{summary:"string"},defaultValue:{summary:"Select images"},category:"Contenido"}},showFileSize:{control:{type:"boolean"},description:"Si se muestra el tamaño del archivo.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}},showProgress:{control:{type:"boolean"},description:"Si se muestra la barra de progreso.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}}}},p={args:{state:"default",files:[],maxFiles:6,maxSize:5242880,dropText:"Drop your files here",selectButtonText:"Select images",showFileSize:!0,showProgress:!0},render:e=>{const s=document.createElement("div");s.style.cssText=`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    `;const t=document.createElement("div");t.style.cssText=`
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;const o=document.createElement("h2");o.textContent="File Upload",o.style.cssText=`
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    `;const r=document.createElement("p");r.textContent="Componente File Upload con diseño moderno. Soporta dos vistas: Drop Zone (área de arrastrar y soltar) y Files List (lista de archivos con progreso). Usa componentes UBITS y tokens UBITS exclusivamente.",r.style.cssText=`
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    `;const i=document.createElement("div");i.id=`file-upload-container-${Date.now()}`,i.style.cssText="width: 100%; margin: 0 auto;";const f=()=>{i.innerHTML="";const m={state:e.files&&e.files.length>0?"files-list":e.state||"default",files:e.files||[],maxFiles:e.maxFiles||6,maxSize:e.maxSize||5242880,dropText:e.dropText||"Drop your files here",selectButtonText:e.selectButtonText||"Select images",showFileSize:e.showFileSize!==void 0?e.showFileSize:!0,showProgress:e.showProgress!==void 0?e.showProgress:!0};try{const d=A(m);i.innerHTML=d}catch(d){console.error("Error rendering file upload:",d)}};f();let c=JSON.stringify(e);return setInterval(()=>{const l=JSON.stringify(e);l!==c&&(c=l,f())},100),t.appendChild(o),t.appendChild(r),t.appendChild(i),s.appendChild(t),s}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default',
    files: [],
    maxFiles: 6,
    maxSize: 5242880,
    // 5MB
    dropText: 'Drop your files here',
    selectButtonText: 'Select images',
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
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    \`;
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    \`;
    const title = document.createElement('h2');
    title.textContent = 'File Upload';
    title.style.cssText = \`
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    \`;
    const description = document.createElement('p');
    description.textContent = 'Componente File Upload con diseño moderno. Soporta dos vistas: Drop Zone (área de arrastrar y soltar) y Files List (lista de archivos con progreso). Usa componentes UBITS y tokens UBITS exclusivamente.';
    description.style.cssText = \`
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    \`;
    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = \`file-upload-container-\${Date.now()}\`;
    fileUploadContainer.style.cssText = \`width: 100%; margin: 0 auto;\`;
    const createFileUploadContent = () => {
      fileUploadContainer.innerHTML = '';

      // Determinar si mostrar vista de lista o drop zone
      const hasFiles = args.files && args.files.length > 0;
      const actualState = hasFiles ? 'files-list' : args.state || 'default';
      const options: FileUploadOptions = {
        state: actualState,
        files: args.files || [],
        maxFiles: args.maxFiles || 6,
        maxSize: args.maxSize || 5242880,
        dropText: args.dropText || 'Drop your files here',
        selectButtonText: args.selectButtonText || 'Select images',
        showFileSize: args.showFileSize !== undefined ? args.showFileSize : true,
        showProgress: args.showProgress !== undefined ? args.showProgress : true
      };
      try {
        const html = renderFileUpload(options);
        fileUploadContainer.innerHTML = html;
      } catch (error) {
        console.error('Error rendering file upload:', error);
      }
    };
    createFileUploadContent();
    let lastArgs = JSON.stringify(args);
    const checkInterval = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        createFileUploadContent();
      }
    }, 100);
    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(fileUploadContainer);
    container.appendChild(wrapper);
    return container;
  }
}`,...p.parameters?.docs?.source}}};const j=["Default"];export{p as Default,j as __namedExportsOrder,O as default};
