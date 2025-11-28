function g(e={}){const{variant:i="text",size:t="md",width:l,height:s,lines:n=1,animated:m=!0,className:p="",style:u=""}=e,o=["ubits-skeleton",`ubits-skeleton--${i}`,t!=="md"?`ubits-skeleton--${t}`:"",m?"ubits-skeleton--animated":"",p].filter(Boolean).join(" "),r=[];l&&(l==="full"?r.push("width: 100%"):typeof l=="number"?r.push(`width: ${l}px`):r.push(`width: ${l}`)),s&&(typeof s=="number"?r.push(`height: ${s}px`):r.push(`height: ${s}`));const c=[...r,u].filter(Boolean).join("; "),a=c?` style="${c}"`:"";if(i==="text"){const h=Array.from({length:n},(f,y)=>`<span class="ubits-skeleton__line" style="width: ${y===n-1&&n>1?"60%":"100%"}"></span>`).join("");return`<div class="${o}"${a}>${h}</div>`}return i==="circle"?`<div class="${o}"${a}></div>`:i==="rectangle"?`<div class="${o}"${a}></div>`:`<div class="${o}"${a}></div>`}const w={title:"Básicos/Skeleton",tags:["autodocs"],parameters:{docs:{description:{component:"Componente Skeleton UBITS para mostrar placeholders de carga. Soporta múltiples variantes (text, circle, rectangle, custom), tamaños y animaciones."}}},argTypes:{variant:{control:{type:"select"},options:["text","circle","rectangle","custom"],description:"Variante del skeleton",table:{defaultValue:{summary:"text"},type:{summary:"text | circle | rectangle | custom"}}},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Tamaño del skeleton",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg | xl"}}},width:{control:{type:"text"},description:'Ancho del skeleton (número en px, porcentaje, o "full")',table:{defaultValue:{summary:"full"}}},height:{control:{type:"text"},description:"Alto del skeleton (número en px o porcentaje)"},lines:{control:{type:"number",min:1,max:10},description:'Número de líneas de texto (solo para variant="text")',table:{defaultValue:{summary:"1"}}},animated:{control:{type:"boolean"},description:"Si el skeleton debe tener animación de pulso",table:{defaultValue:{summary:"true"}}}}},d={args:{variant:"text",size:"md",width:"full",height:"",lines:3,animated:!0},render:e=>{const i=document.createElement("div");i.style.padding="40px",i.style.background="var(--modifiers-normal-color-light-bg-1)",i.style.width="100%",i.style.minHeight="300px",i.style.boxSizing="border-box";const t=document.createElement("div");t.style.background="var(--modifiers-normal-color-light-bg-1)",t.style.padding="48px",t.style.border="none",t.style.marginBottom="24px",t.style.minHeight="200px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.boxSizing="border-box";const l=document.createElement("div");l.style.width="100%",l.style.boxSizing="border-box";const s=g(e);l.innerHTML=s;const n=l.querySelector(".ubits-skeleton");return n&&(e.variant==="text"?(n.style.width="100%",n.style.maxWidth="100%"):e.variant==="circle"?(n.style.width="",n.style.height="",n.style.margin="0 auto",n.style.display="inline-block"):(e.variant==="rectangle"||e.variant==="custom")&&(e.width==="full"||!e.width?n.style.width="100%":e.width&&(n.style.width=typeof e.width=="number"?`${e.width}px`:e.width),e.height&&(n.style.height=typeof e.height=="number"?`${e.height}px`:e.height))),t.appendChild(l),i.appendChild(t),i}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    height: '',
    lines: 3,
    animated: true
  },
  render: args => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.width = '100%';
    container.style.minHeight = '300px';
    container.style.boxSizing = 'border-box';

    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.border = 'none';
    preview.style.marginBottom = '24px';
    preview.style.minHeight = '200px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';

    // Contenedor interno con width 100% - igual que en la web
    const innerContainer = document.createElement('div');
    innerContainer.style.width = '100%';
    innerContainer.style.boxSizing = 'border-box';

    // Renderizar el skeleton
    const skeletonHTML = renderSkeleton(args);
    innerContainer.innerHTML = skeletonHTML;

    // Ajustar el skeleton según la variante para que se vea bien
    const skeletonElement = innerContainer.querySelector('.ubits-skeleton');
    if (skeletonElement) {
      if (args.variant === 'text') {
        // Para text, asegurar que ocupe todo el ancho disponible
        skeletonElement.style.width = '100%';
        skeletonElement.style.maxWidth = '100%';
      } else if (args.variant === 'circle') {
        // Para circle, asegurar que siempre sea circular
        // No aplicar width/height desde args, usar solo los del CSS
        skeletonElement.style.width = '';
        skeletonElement.style.height = '';
        skeletonElement.style.margin = '0 auto';
        skeletonElement.style.display = 'inline-block';
      } else if (args.variant === 'rectangle' || args.variant === 'custom') {
        // Para rectangle y custom, usar el width especificado o full
        if (args.width === 'full' || !args.width) {
          skeletonElement.style.width = '100%';
        } else if (args.width) {
          skeletonElement.style.width = typeof args.width === 'number' ? \`\${args.width}px\` : args.width;
        }
        if (args.height) {
          skeletonElement.style.height = typeof args.height === 'number' ? \`\${args.height}px\` : args.height;
        }
      }
    }
    preview.appendChild(innerContainer);
    container.appendChild(preview);
    return container;
  }
}`,...d.parameters?.docs?.source}}};const v=["Default"];export{d as Default,v as __namedExportsOrder,w as default};
