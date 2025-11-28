import"./iframe-EN31ESOT.js";import{c}from"./index-BoEJW2yg.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"Formularios/Calendar",tags:["autodocs"],parameters:{layout:"centered",backgrounds:{default:"transparent",disable:!0},docs:{description:{component:"Componente Calendar UBITS con selección única y por rango de fechas. Usa tokens UBITS, componentes Button, Input y List para una experiencia consistente."}}},argTypes:{mode:{control:{type:"select"},options:["single","range"],description:"Modo de selección: single para fecha única, range para rango de fechas",table:{defaultValue:{summary:"single"},type:{summary:"single | range"}}},selectedDate:{control:{type:"date"},description:"Fecha seleccionada (modo single) o fecha de inicio (modo range)",table:{type:{summary:"Date | null"}}},endDate:{control:{type:"date"},description:"Fecha de fin (solo para modo range)",table:{type:{summary:"Date | null"}}},minDate:{control:{type:"date"},description:"Fecha mínima permitida",table:{type:{summary:"Date | null"}}},maxDate:{control:{type:"date"},description:"Fecha máxima permitida",table:{type:{summary:"Date | null"}}},initialDate:{control:{type:"date"},description:"Fecha inicial a mostrar (por defecto: fecha actual)",table:{type:{summary:"Date"}}},className:{control:{type:"text"},description:"Clase CSS adicional para el contenedor",table:{type:{summary:"string"}}},style:{control:{type:"text"},description:"Estilos inline adicionales",table:{type:{summary:"string"}}}}},r={args:{mode:"single",selectedDate:null,endDate:null,minDate:null,maxDate:null,initialDate:new Date,className:"",style:""},render:a=>{const n=e=>{if(!e)return null;if(e instanceof Date)return e;if(typeof e=="string"||typeof e=="number"){const t=new Date(e);return isNaN(t.getTime())?null:t}return null},o={mode:a.mode||"single",selectedDate:n(a.selectedDate),endDate:n(a.endDate),minDate:n(a.minDate),maxDate:n(a.maxDate),initialDate:n(a.initialDate)||new Date,className:a.className||"",style:a.style||"",onDateSelect:e=>{},onRangeSelect:(e,t)=>{}};let l=null;try{return l=c(o),l.element}catch(e){console.error("Error al crear calendario:",e);const t=document.createElement("div");return t.style.cssText="color: var(--modifiers-normal-color-light-fg-1-high); padding: 20px; text-align: center;",t.textContent=`Error al cargar el calendario: ${e}`,t}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
        // Callback de fecha seleccionada
      },
      onRangeSelect: (startDate: Date, endDate: Date) => {
        // Callback de rango seleccionado
      }
    };

    // Crear el calendario usando createCalendar y devolver directamente el elemento
    let calendarInstance: ReturnType<typeof createCalendar> | null = null;
    try {
      calendarInstance = createCalendar(calendarOptions);

      // Devolver directamente el elemento del calendario sin contenedor
      return calendarInstance.element;
    } catch (error) {
      console.error('Error al crear calendario:', error);
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'color: var(--modifiers-normal-color-light-fg-1-high); padding: 20px; text-align: center;';
      errorDiv.textContent = \`Error al cargar el calendario: \${error}\`;
      return errorDiv;
    }
  }
}`,...r.parameters?.docs?.source}}};const D=["Default"];export{r as Default,D as __namedExportsOrder,m as default};
