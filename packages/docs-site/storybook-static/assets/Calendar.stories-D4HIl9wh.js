import"./iframe-CHGeu5ha.js";import{createCalendar as p}from"./CalendarProvider-BYVqZ8Vm.js";import"./preload-helper-PPVm8Dsz.js";const f={title:"Components/Calendar",tags:["autodocs"],parameters:{layout:"centered",backgrounds:{default:"transparent",disable:!0},docs:{description:{component:"Componente Calendar UBITS con selección única y por rango de fechas. Usa tokens UBITS, componentes Button, Input y List para una experiencia consistente."}}},argTypes:{mode:{control:{type:"select"},options:["single","range"],description:"Modo de selección: single para fecha única, range para rango de fechas",table:{defaultValue:{summary:"single"},type:{summary:"single | range"}}},selectedDate:{control:{type:"date"},description:"Fecha seleccionada (modo single) o fecha de inicio (modo range)",table:{type:{summary:"Date | null"}}},endDate:{control:{type:"date"},description:"Fecha de fin (solo para modo range)",table:{type:{summary:"Date | null"}}},minDate:{control:{type:"date"},description:"Fecha mínima permitida",table:{type:{summary:"Date | null"}}},maxDate:{control:{type:"date"},description:"Fecha máxima permitida",table:{type:{summary:"Date | null"}}},initialDate:{control:{type:"date"},description:"Fecha inicial a mostrar (por defecto: fecha actual)",table:{type:{summary:"Date"}}},className:{control:{type:"text"},description:"Clase CSS adicional para el contenedor",table:{type:{summary:"string"}}},style:{control:{type:"text"},description:"Estilos inline adicionales",table:{type:{summary:"string"}}}}},d={args:{mode:"single",selectedDate:null,endDate:null,minDate:null,maxDate:null,initialDate:new Date,className:"",style:""},render:a=>{const l=e=>{if(!e)return null;if(e instanceof Date)return e;if(typeof e=="string"||typeof e=="number"){const n=new Date(e);return isNaN(n.getTime())?null:n}return null},m={mode:a.mode||"single",selectedDate:l(a.selectedDate),endDate:l(a.endDate),minDate:l(a.minDate),maxDate:l(a.maxDate),initialDate:l(a.initialDate)||new Date,className:a.className||"",style:a.style||"",onDateSelect:e=>{console.log("📅 Fecha seleccionada:",e)},onRangeSelect:(e,n)=>{console.log("📅 Rango seleccionado:",e,"a",n)}};let i=null;try{return i=p(m),setTimeout(()=>{const e=i?.element;if(e){console.log("🔍 [Calendar Element] ========== DIAGNÓSTICO CONTENEDOR =========="),console.log("📐 Calendar element:",e),console.log("📐 Calendar tagName:",e.tagName),console.log("📐 Calendar className:",e.className),console.log("📐 Calendar id:",e.id),console.log("📐 Calendar styles:",window.getComputedStyle(e)),console.log("📐 Calendar getBoundingClientRect:",e.getBoundingClientRect());const n=e.parentElement;if(n){console.log("🔍 [Parent Element] =========="),console.log("📐 Parent tagName:",n.tagName),console.log("📐 Parent className:",n.className),console.log("📐 Parent id:",n.id),console.log("📐 Parent styles:",window.getComputedStyle(n)),console.log("📐 Parent getBoundingClientRect:",n.getBoundingClientRect()),console.log("📐 Parent background:",window.getComputedStyle(n).background),console.log("📐 Parent backgroundColor:",window.getComputedStyle(n).backgroundColor),console.log("📐 Parent border:",window.getComputedStyle(n).border);let t=n,r=1;for(;t&&t!==document.body;){const o=window.getComputedStyle(t);console.log(`🔍 [Ancestor Level ${r}] ==========`),console.log("📐 TagName:",t.tagName),console.log("📐 ClassName:",t.className),console.log("📐 ID:",t.id),console.log("📐 Background:",o.background),console.log("📐 BackgroundColor:",o.backgroundColor),console.log("📐 Border:",o.border),console.log("📐 Padding:",o.padding),console.log("📐 Margin:",o.margin),console.log("📐 getBoundingClientRect:",t.getBoundingClientRect()),t=t.parentElement,r++}}const u=document.querySelectorAll("*"),g=[];u.forEach(t=>{const o=window.getComputedStyle(t).backgroundColor,c=t.getBoundingClientRect(),s=e.getBoundingClientRect();o&&(o.includes("255")||o.includes("rgb(255")||o.includes("#fff")||o.includes("#ffffff"))&&c.left<s.right+100&&c.right>s.left-100&&c.top<s.bottom+100&&c.bottom>s.top-100&&g.push(t)}),g.length>0&&(console.log("🔍 [Elementos con fondo blanco cerca del calendario] =========="),g.forEach((t,r)=>{console.log(`📐 Elemento ${r+1}:`,{tagName:t.tagName,className:t.className,id:t.id,background:window.getComputedStyle(t).background,getBoundingClientRect:t.getBoundingClientRect()})})),console.log("🔍 [Calendar Element] ========== FIN DIAGNÓSTICO ==========")}},100),i.element}catch(e){console.error("Error al crear calendario:",e);const n=document.createElement("div");return n.style.cssText="color: var(--ubits-fg-1-high); padding: 20px; text-align: center;",n.textContent=`Error al cargar el calendario: ${e}`,n}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date(),
    className: '',
    style: ''
  },
  render: args => {
    // Helper para convertir fecha de control a Date
    const toDate = (value: any): Date | null => {
      if (!value) return null;
      if (value instanceof Date) return value;
      if (typeof value === 'string' || typeof value === 'number') {
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
      }
      return null;
    };

    // Convertir fechas de string a Date si vienen de los controles
    const calendarOptions: CalendarOptions = {
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date(),
      className: args.className || '',
      style: args.style || '',
      onDateSelect: (date: Date) => {
        console.log('📅 Fecha seleccionada:', date);
      },
      onRangeSelect: (startDate: Date, endDate: Date) => {
        console.log('📅 Rango seleccionado:', startDate, 'a', endDate);
      }
    };

    // Crear el calendario usando createCalendar y devolver directamente el elemento
    let calendarInstance: ReturnType<typeof createCalendar> | null = null;
    try {
      calendarInstance = createCalendar(calendarOptions);

      // Logs para diagnosticar qué hay detrás del calendario
      setTimeout(() => {
        const calendarEl = calendarInstance?.element as HTMLElement;
        if (calendarEl) {
          console.log('🔍 [Calendar Element] ========== DIAGNÓSTICO CONTENEDOR ==========');
          console.log('📐 Calendar element:', calendarEl);
          console.log('📐 Calendar tagName:', calendarEl.tagName);
          console.log('📐 Calendar className:', calendarEl.className);
          console.log('📐 Calendar id:', calendarEl.id);
          console.log('📐 Calendar styles:', window.getComputedStyle(calendarEl));
          console.log('📐 Calendar getBoundingClientRect:', calendarEl.getBoundingClientRect());

          // Revisar el padre
          const parent = calendarEl.parentElement;
          if (parent) {
            console.log('🔍 [Parent Element] ==========');
            console.log('📐 Parent tagName:', parent.tagName);
            console.log('📐 Parent className:', parent.className);
            console.log('📐 Parent id:', parent.id);
            console.log('📐 Parent styles:', window.getComputedStyle(parent));
            console.log('📐 Parent getBoundingClientRect:', parent.getBoundingClientRect());
            console.log('📐 Parent background:', window.getComputedStyle(parent).background);
            console.log('📐 Parent backgroundColor:', window.getComputedStyle(parent).backgroundColor);
            console.log('📐 Parent border:', window.getComputedStyle(parent).border);

            // Revisar todos los ancestros
            let current = parent;
            let level = 1;
            while (current && current !== document.body) {
              const styles = window.getComputedStyle(current);
              console.log(\`🔍 [Ancestor Level \${level}] ==========\`);
              console.log('📐 TagName:', current.tagName);
              console.log('📐 ClassName:', current.className);
              console.log('📐 ID:', current.id);
              console.log('📐 Background:', styles.background);
              console.log('📐 BackgroundColor:', styles.backgroundColor);
              console.log('📐 Border:', styles.border);
              console.log('📐 Padding:', styles.padding);
              console.log('📐 Margin:', styles.margin);
              console.log('📐 getBoundingClientRect:', current.getBoundingClientRect());
              current = current.parentElement;
              level++;
            }
          }

          // Buscar elementos con fondo blanco cerca del calendario
          const allElements = document.querySelectorAll('*');
          const whiteBackgroundElements: HTMLElement[] = [];
          allElements.forEach(el => {
            const styles = window.getComputedStyle(el);
            const bg = styles.backgroundColor;
            const rect = el.getBoundingClientRect();
            const calendarRect = calendarEl.getBoundingClientRect();

            // Verificar si el elemento tiene fondo blanco y está cerca del calendario
            if (bg && (bg.includes('255') || bg.includes('rgb(255') || bg.includes('#fff') || bg.includes('#ffffff'))) {
              // Verificar si está cerca del calendario (dentro de 100px)
              if (rect.left < calendarRect.right + 100 && rect.right > calendarRect.left - 100 && rect.top < calendarRect.bottom + 100 && rect.bottom > calendarRect.top - 100) {
                whiteBackgroundElements.push(el as HTMLElement);
              }
            }
          });
          if (whiteBackgroundElements.length > 0) {
            console.log('🔍 [Elementos con fondo blanco cerca del calendario] ==========');
            whiteBackgroundElements.forEach((el, idx) => {
              console.log(\`📐 Elemento \${idx + 1}:\`, {
                tagName: el.tagName,
                className: el.className,
                id: el.id,
                background: window.getComputedStyle(el).background,
                getBoundingClientRect: el.getBoundingClientRect()
              });
            });
          }
          console.log('🔍 [Calendar Element] ========== FIN DIAGNÓSTICO ==========');
        }
      }, 100);

      // Devolver directamente el elemento del calendario sin contenedor
      return calendarInstance.element;
    } catch (error) {
      console.error('Error al crear calendario:', error);
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'color: var(--ubits-fg-1-high); padding: 20px; text-align: center;';
      errorDiv.textContent = \`Error al cargar el calendario: \${error}\`;
      return errorDiv;
    }
  }
}`,...d.parameters?.docs?.source}}};const b=["Default"];export{d as Default,b as __namedExportsOrder,f as default};
