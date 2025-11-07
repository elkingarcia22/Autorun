import"./iframe-DpxOG777.js";import"./preload-helper-PPVm8Dsz.js";function C(e){if(e===0)return"0 B";const n=1024,i=["B","KB","MB","GB"],a=Math.floor(Math.log(e)/Math.log(n));return Math.round(e/Math.pow(n,a)*100)/100+" "+i[a]}function w(e={}){const{state:n="default",fileName:i,fileExtension:a,fileSize:s,showFileSize:t=!0,showActions:r=!0,uploadText:f="Haz clic para subir archivo",fileStatus:u="pending",className:l=""}=e,v=["ubits-file-upload",`ubits-file-upload--${n}`,l].filter(Boolean).join(" ");let p="var(--ubits-border-1, #d0d2d5)",o="var(--ubits-bg-1, #ffffff)",d="var(--ubits-fg-1-medium, #5c646f)";n==="dragging"?p="var(--ubits-accent-brand, #0c5bef)":n==="error"?p="var(--ubits-feedback-accent-error, #e9343c)":n==="disabled"?(o="var(--ubits-bg-disabled, #edeeef)",p="var(--ubits-border-disabled, #e1e2e5)",d="var(--ubits-fg-on-disabled, #8d9199)"):n==="filled"&&(p="var(--ubits-border-1, #d0d2d5)",o="var(--ubits-bg-2, #f3f3f4)",d="var(--ubits-fg-1-high, #303a47)");let c="";n==="filled"?c=`
      <div class="ubits-file-upload__icon-filled">
        <i class="far fa-file-check"></i>
      </div>
    `:n==="dragging"||n==="error"||n==="disabled"?c=`
      <div class="ubits-file-upload__icon-large">
        <i class="far fa-arrow-up-from-bracket"></i>
      </div>
    `:c=`
      <div class="ubits-file-upload__icon-container">
        <i class="far fa-file-arrow-up"></i>
      </div>
    `;let h="";if(n==="filled")h=`
      <div class="ubits-file-upload__file-name">
        ${a?`${i||"archivo"}.${a}`:i||"archivo"}
      </div>
    `;else if(i||a){const m=[];m.push(f||"Haz clic para subir archivo"),a&&(m.push("."),m.push(a)),h=`
      <div class="ubits-file-upload__file-name">
        ${m.join("")}
      </div>
    `}else h=`
      <div class="ubits-file-upload__file-name">
        ${f}
      </div>
    `;let x="";t&&s&&s>0&&(x=`
      <div class="ubits-file-upload__file-size">
        ${C(s)}
      </div>
    `);let y="";return r&&(n==="filled"?y=`
        <div class="ubits-file-upload__actions">
          <button class="ubits-file-upload__action ubits-file-upload__action--remove" aria-label="Eliminar archivo">
            <i class="far fa-xmark"></i>
          </button>
        </div>
      `:(n==="default"||n==="error")&&(y=`
      <div class="ubits-file-upload__actions">
        <button class="ubits-file-upload__action ubits-file-upload__action--reupload" aria-label="Re-subir archivo">
          <i class="far fa-arrow-up-from-bracket"></i>
        </button>
        <button class="ubits-file-upload__action ubits-file-upload__action--remove" aria-label="Eliminar archivo">
          <i class="far fa-trash"></i>
        </button>
      </div>
    `)),`
    <div class="${v}" 
         style="background-color: ${o}; border-color: ${p}; color: ${d};"
         tabindex="${n==="disabled"||n==="filled"?"-1":"0"}"
         role="${n==="filled"?"region":"button"}"
         aria-disabled="${n==="disabled"?"true":"false"}">
      <div class="ubits-file-upload__container">
        ${c}
        <div class="ubits-file-upload__content">
          ${h}
          ${x}
        </div>
      </div>
      ${y}
    </div>
  `.trim()}const E={title:"Components/File Upload",tags:["autodocs"],parameters:{docs:{description:{component:"Componente File Upload personalizado UBITS. Se usa para subir archivos con drag & drop. Soporta múltiples estados (default, dragging, error, disabled) y muestra información del archivo (nombre, extensión, tamaño). Incluye botones de acción opcionales (re-subir y eliminar)."}},layout:"fullscreen"},argTypes:{state:{control:{type:"select"},options:["default","dragging","error","disabled","filled"],description:"Estado del componente.",table:{type:{summary:"string"},defaultValue:{summary:"default"},category:"Apariencia"}},fileName:{control:{type:"text"},description:"Nombre del archivo a mostrar.",table:{type:{summary:"string"},defaultValue:{summary:'""'},category:"Contenido"}},fileExtension:{control:{type:"text"},description:"Extensión del archivo (ej: pdf, jpg, docx).",table:{type:{summary:"string"},defaultValue:{summary:'""'},category:"Contenido"}},fileSize:{control:{type:"number",min:0,step:1024},description:"Tamaño del archivo en bytes (se mostrará formateado automáticamente).",table:{type:{summary:"number"},defaultValue:{summary:"0"},category:"Contenido"}},showFileSize:{control:{type:"boolean"},description:"Si se muestra el tamaño del archivo.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}},showActions:{control:{type:"boolean"},description:"Si se muestran los botones de acción (re-subir y eliminar).",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Comportamiento"}},uploadText:{control:{type:"text"},description:"Text personalizado para el área de upload.",table:{type:{summary:"string"},defaultValue:{summary:"Haz clic para subir archivo"},category:"Contenido"}},fileStatus:{control:{type:"select"},options:["pending","completed","error","uploading"],description:"Estado del archivo subido (para estado filled).",table:{type:{summary:"string"},defaultValue:{summary:"pending"},category:"Contenido"}}}},g={args:{state:"default",fileName:"",fileExtension:"",fileSize:0,showFileSize:!0,showActions:!0,uploadText:"Haz clic para subir archivo"},render:e=>{const n=document.createElement("div");n.style.cssText=`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    `;const i=document.createElement("div");i.style.cssText=`
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;const a=document.createElement("h2");a.textContent="File Upload",a.style.cssText=`
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    `;const s=document.createElement("p");s.textContent="Componente para subir archivos con drag & drop. Soporta múltiples estados y muestra información del archivo.",s.style.cssText=`
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    `;const t=document.createElement("div");t.id=`file-upload-container-${Date.now()}`,t.style.cssText=`
      width: 100%;
      margin: 0 auto;
    `;let r=null;const f=()=>{if(t.innerHTML="",r){try{r.destroy()}catch{}r=null}const o={state:e.state||"default",fileName:e.fileName,fileExtension:e.fileExtension,fileSize:e.fileSize!==void 0?e.fileSize:0,showFileSize:e.showFileSize!==void 0?e.showFileSize:!0,showActions:e.showActions!==void 0?e.showActions:!0,uploadText:e.uploadText||"Haz clic para subir archivo",containerId:t.id};try{const d=w(o);t.innerHTML=d;const c=t.querySelector(".ubits-file-upload");c&&(r={element:c,destroy:()=>{t.innerHTML=""},update:()=>{}})}catch{}};f();let u=JSON.stringify(e),l=null;(()=>{l||(l=setInterval(()=>{const o=JSON.stringify(e);o!==u&&(u=o,f())},100))})();const p=()=>{if(l&&(clearInterval(l),l=null),t.innerHTML="",r)try{r.destroy()}catch{}};return n.addEventListener("DOMNodeRemoved",p),i.appendChild(a),i.appendChild(s),i.appendChild(t),n.appendChild(i),n}},b={args:{state:"filled",fileName:"Screenshot 2025-11-04 at 2.41.10 PM",fileExtension:"png",fileSize:116549,showFileSize:!0,showActions:!0,uploadText:"Haz clic para subir archivo",fileStatus:"pending"},render:e=>{const n=document.createElement("div");n.style.cssText=`
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    `;const i=document.createElement("div");i.style.cssText=`
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;const a=document.createElement("h2");a.textContent="File Upload - Estado Filled",a.style.cssText=`
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    `;const s=document.createElement("p");s.textContent="Estado filled muestra el archivo ya subido con un icono de check y opción para eliminarlo.",s.style.cssText=`
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    `;const t=document.createElement("div");t.id=`file-upload-container-filled-${Date.now()}`,t.style.cssText=`
      width: 100%;
      margin: 0 auto;
    `;let r=null;const f=()=>{if(t.innerHTML="",r){try{r.destroy()}catch{}r=null}const o={state:e.state||"filled",fileName:e.fileName,fileExtension:e.fileExtension,fileSize:e.fileSize!==void 0?e.fileSize:0,showFileSize:e.showFileSize!==void 0?e.showFileSize:!0,showActions:e.showActions!==void 0?e.showActions:!0,uploadText:e.uploadText||"Haz clic para subir archivo",fileStatus:e.fileStatus||"pending",containerId:t.id};try{const d=w(o);t.innerHTML=d;const c=t.querySelector(".ubits-file-upload");c&&(r={element:c,destroy:()=>{t.innerHTML=""},update:()=>{}})}catch{}};f();let u=JSON.stringify(e),l=null;(()=>{l||(l=setInterval(()=>{const o=JSON.stringify(e);o!==u&&(u=o,f())},100))})();const p=()=>{if(l&&(clearInterval(l),l=null),t.innerHTML="",r)try{r.destroy()}catch{}};return n.addEventListener("DOMNodeRemoved",p),i.appendChild(a),i.appendChild(s),i.appendChild(t),n.appendChild(i),n}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default',
    fileName: '',
    fileExtension: '',
    fileSize: 0,
    showFileSize: true,
    showActions: true,
    uploadText: 'Haz clic para subir archivo'
  },
  render: args => {
    // Crear contenedor fullscreen
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

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    \`;

    // Título
    const title = document.createElement('h2');
    title.textContent = 'File Upload';
    title.style.cssText = \`
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    \`;

    // Descripción
    const description = document.createElement('p');
    description.textContent = 'Componente para subir archivos con drag & drop. Soporta múltiples estados y muestra información del archivo.';
    description.style.cssText = \`
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    \`;

    // Contenedor para el file upload
    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = \`file-upload-container-\${Date.now()}\`;
    fileUploadContainer.style.cssText = \`
      width: 100%;
      margin: 0 auto;
    \`;
    let fileUploadInstance: any = null;
    const createFileUploadContent = () => {
      // Limpiar completamente el contenedor primero
      fileUploadContainer.innerHTML = '';

      // Limpiar instancia anterior
      if (fileUploadInstance) {
        try {
          fileUploadInstance.destroy();
        } catch (e) {
          // Ignorar errores de destrucción
        }
        fileUploadInstance = null;
      }

      // Preparar opciones
      const options: FileUploadOptions = {
        state: args.state || 'default',
        fileName: args.fileName,
        fileExtension: args.fileExtension,
        fileSize: args.fileSize !== undefined ? args.fileSize : 0,
        showFileSize: args.showFileSize !== undefined ? args.showFileSize : true,
        showActions: args.showActions !== undefined ? args.showActions : true,
        uploadText: args.uploadText || 'Haz clic para subir archivo',
        containerId: fileUploadContainer.id
      };

      // Crear file upload directamente en el contenedor usando renderFileUpload
      try {
        const html = renderFileUpload(options);
        fileUploadContainer.innerHTML = html;

        // Crear instancia simulada para mantener compatibilidad
        const fileUploadElement = fileUploadContainer.querySelector('.ubits-file-upload') as HTMLElement;
        if (fileUploadElement) {
          fileUploadInstance = {
            element: fileUploadElement,
            destroy: () => {
              fileUploadContainer.innerHTML = '';
            },
            update: () => {}
          };
        }
      } catch (error) {
        // Error al crear file upload
      }
    };

    // Crear contenido inicial
    createFileUploadContent();

    // Observar cambios en args usando un intervalo más eficiente
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    const startWatching = () => {
      if (checkInterval) return;
      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createFileUploadContent();
        }
      }, 100);
    };
    startWatching();

    // Limpiar al desmontar
    const cleanup = () => {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      fileUploadContainer.innerHTML = '';
      if (fileUploadInstance) {
        try {
          fileUploadInstance.destroy();
        } catch (e) {
          // Ignorar errores
        }
      }
    };
    container.addEventListener('DOMNodeRemoved', cleanup);
    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(fileUploadContainer);
    container.appendChild(wrapper);
    return container;
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'filled',
    fileName: 'Screenshot 2025-11-04 at 2.41.10 PM',
    fileExtension: 'png',
    fileSize: 116549,
    showFileSize: true,
    showActions: true,
    uploadText: 'Haz clic para subir archivo',
    fileStatus: 'pending'
  },
  render: args => {
    // Crear contenedor fullscreen
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

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    \`;

    // Título
    const title = document.createElement('h2');
    title.textContent = 'File Upload - Estado Filled';
    title.style.cssText = \`
      margin: 0 0 16px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    \`;

    // Descripción
    const description = document.createElement('p');
    description.textContent = 'Estado filled muestra el archivo ya subido con un icono de check y opción para eliminarlo.';
    description.style.cssText = \`
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    \`;

    // Contenedor para el file upload
    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = \`file-upload-container-filled-\${Date.now()}\`;
    fileUploadContainer.style.cssText = \`
      width: 100%;
      margin: 0 auto;
    \`;
    let fileUploadInstance: any = null;
    const createFileUploadContent = () => {
      // Limpiar completamente el contenedor primero
      fileUploadContainer.innerHTML = '';

      // Limpiar instancia anterior
      if (fileUploadInstance) {
        try {
          fileUploadInstance.destroy();
        } catch (e) {
          // Ignorar errores de destrucción
        }
        fileUploadInstance = null;
      }

      // Preparar opciones
      const options: FileUploadOptions = {
        state: args.state || 'filled',
        fileName: args.fileName,
        fileExtension: args.fileExtension,
        fileSize: args.fileSize !== undefined ? args.fileSize : 0,
        showFileSize: args.showFileSize !== undefined ? args.showFileSize : true,
        showActions: args.showActions !== undefined ? args.showActions : true,
        uploadText: args.uploadText || 'Haz clic para subir archivo',
        fileStatus: args.fileStatus || 'pending',
        containerId: fileUploadContainer.id
      };

      // Crear file upload directamente en el contenedor usando renderFileUpload
      try {
        const html = renderFileUpload(options);
        fileUploadContainer.innerHTML = html;

        // Crear instancia simulada para mantener compatibilidad
        const fileUploadElement = fileUploadContainer.querySelector('.ubits-file-upload') as HTMLElement;
        if (fileUploadElement) {
          fileUploadInstance = {
            element: fileUploadElement,
            destroy: () => {
              fileUploadContainer.innerHTML = '';
            },
            update: () => {}
          };
        }
      } catch (error) {
        // Error al crear file upload
      }
    };

    // Crear contenido inicial
    createFileUploadContent();

    // Observar cambios en args usando un intervalo más eficiente
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    const startWatching = () => {
      if (checkInterval) return;
      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createFileUploadContent();
        }
      }, 100);
    };
    startWatching();

    // Limpiar al desmontar
    const cleanup = () => {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      fileUploadContainer.innerHTML = '';
      if (fileUploadInstance) {
        try {
          fileUploadInstance.destroy();
        } catch (e) {
          // Ignorar errores
        }
      }
    };
    container.addEventListener('DOMNodeRemoved', cleanup);
    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(fileUploadContainer);
    container.appendChild(wrapper);
    return container;
  }
}`,...b.parameters?.docs?.source}}};const T=["Default","Filled"];export{g as Default,b as Filled,T as __namedExportsOrder,E as default};
