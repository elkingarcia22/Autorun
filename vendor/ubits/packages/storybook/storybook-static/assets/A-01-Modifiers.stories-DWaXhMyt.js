import{c as B}from"./utils-QDDdDBjb.js";function Y(d){const l=[],r=d.toLowerCase();try{Array.from(document.styleSheets).forEach(t=>{try{Array.from(t.cssRules||[]).forEach(b=>{if(b instanceof CSSStyleRule){const O=b.style;for(let f=0;f<O.length;f++){const C=O[f];C.startsWith("--")&&C.toLowerCase().includes(r)&&!l.includes(C)&&l.push(C)}}})}catch{}})}catch{}return l.sort()}function $(d){const l={};return d.forEach(r=>{const m=r.toLowerCase();let t="otros";m.includes("chart")?t="chart":m.includes("button")?t="button":m.includes("scroll-bar")?t="scroll-bar":m.includes("toggle")?t="toggle":m.includes("feedback")?t="feedback":m.includes("accent")?t="accent":m.includes("-fg-")?t="fg":m.includes("-bg-")?t="bg":m.includes("border")&&(t="border");let u="base";m.includes("-pressed")?u="pressed":m.includes("-hover")?u="hover":m.includes("-default")&&(u="default"),l[t]||(l[t]={}),l[t][u]||(l[t][u]=[]),l[t][u].push(r)}),Object.keys(l).forEach(r=>{Object.keys(l[r]).forEach(m=>{l[r][m].sort()})}),l}const q={title:"Tokens UBITS/01. Modificadores (.modifiers)",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Todos los colores del sistema organizados por modificador. Cada modificador (Normal, Inverted, Static, Static Inverted) contiene todos los colores (accent, fg, bg, border, feedback, chart, button) organizados por modo Light/Dark. Esta es la categoría principal con 1296 tokens totales."}}}};function H(d){let l=Y("modifiers");if(l.length===0)return{light:[],dark:[]};const r=l.filter(t=>t.includes(`modifiers-${d}-color-light`)),m=l.filter(t=>t.includes(`modifiers-${d}-color-dark`));return{light:r.sort(),dark:m.sort()}}const j={render:()=>{const d=document.createElement("div");d.style.padding="24px",d.style.maxWidth="1400px";const l=document.createElement("h2");l.textContent="Modificadores (.modifiers) - Resumen",l.style.fontSize="24px",l.style.fontWeight="700",l.style.marginBottom="16px",d.appendChild(l);const r=document.createElement("div");return r.style.marginBottom="24px",r.style.padding="16px",r.style.backgroundColor="#dbeafe",r.style.border="1px solid #3b82f6",r.style.borderRadius="8px",r.style.fontSize="14px",r.style.color="#1e40af",r.innerHTML=`
      <strong>📊 Resumen de Modificadores:</strong><br><br>
      • <strong>Normal</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Inverted</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Static</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Static Inverted</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br><br>
      <strong>Total: 1296 tokens</strong><br><br>
      Cada modificador contiene TODOS los colores del sistema: accent, fg, bg, border, feedback, chart, button, etc.
    `,d.appendChild(r),["normal","inverted","static","static-inverted"].forEach(t=>{const u=document.createElement("div");u.style.marginBottom="40px",u.style.padding="20px",u.style.border="1px solid #e5e7eb",u.style.borderRadius="12px",u.style.backgroundColor="#f9fafb";const b=document.createElement("h3");b.textContent=`${t.charAt(0).toUpperCase()+t.slice(1).replace("-"," ")}`,b.style.fontSize="20px",b.style.fontWeight="600",b.style.marginBottom="16px",b.style.textTransform="capitalize",u.appendChild(b);const O=H(t),f=O.light.length+O.dark.length,C=document.createElement("div");if(C.style.marginBottom="16px",C.style.fontSize="16px",C.style.fontWeight="600",C.textContent=`Total: ${f} tokens (${O.light.length} Light + ${O.dark.length} Dark)`,u.appendChild(C),f>0){const k=$(O.light),v=$(O.dark);new Set([...Object.keys(k),...Object.keys(v)]).forEach(w=>{const G=k[w]||{},h=v[w]||{},z=new Set([...Object.keys(G),...Object.keys(h)]);if(z.size===0)return;const R=document.createElement("div");R.style.marginBottom="32px";const n=Object.values(G).reduce((T,p)=>T+p.length,0),s=Object.values(h).reduce((T,p)=>T+p.length,0),i=document.createElement("h4");i.textContent=`${w.charAt(0).toUpperCase()+w.slice(1)} (${n} Light + ${s} Dark = ${n+s} tokens)`,i.style.fontSize="16px",i.style.fontWeight="600",i.style.marginBottom="16px",i.style.paddingBottom="8px",i.style.borderBottom="2px solid #e5e7eb",R.appendChild(i);const o=["base","default","hover","pressed"];Array.from(z).sort((T,p)=>{const y=o.indexOf(T),a=o.indexOf(p);return y===-1&&a===-1?T.localeCompare(p):y===-1?1:a===-1?-1:y-a}).forEach(T=>{const p=G[T]||[],y=h[T]||[];if(p.length===0&&y.length===0)return;const a=document.createElement("div");a.style.marginBottom="24px",a.style.padding="12px",a.style.backgroundColor="#f9fafb",a.style.border="1px solid #e5e7eb",a.style.borderRadius="8px";const g=document.createElement("h5"),c=T==="base"?"Base":T.charAt(0).toUpperCase()+T.slice(1);g.textContent=`${c} (${p.length} Light + ${y.length} Dark)`,g.style.fontSize="14px",g.style.fontWeight="600",g.style.marginBottom="12px",g.style.color="#303a47",a.appendChild(g);const e=document.createElement("div");e.style.display="grid",e.style.gridTemplateColumns="1fr 1fr",e.style.gap="12px";const A=document.createElement("div");A.style.background="#ffffff",A.style.border="1px solid #e5e7eb",A.style.borderRadius="8px",A.style.padding="12px";const L=document.createElement("div");if(L.style.display="flex",L.style.flexDirection="column",L.style.gap="6px",L.style.maxHeight="400px",L.style.overflowY="auto",L.style.paddingRight="8px",p.forEach(E=>{L.appendChild(B(E,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),p.length===0){const E=document.createElement("div");E.style.padding="8px",E.style.textAlign="center",E.style.color="#9ca3af",E.style.fontSize="12px",E.textContent="No hay tokens",L.appendChild(E)}A.appendChild(L),e.appendChild(A);const I=document.createElement("div");I.style.background="#0E1825",I.style.color="#edeeef",I.style.border="1px solid #0E1825",I.style.borderRadius="8px",I.style.padding="12px";const D=document.createElement("div");if(D.style.display="flex",D.style.flexDirection="column",D.style.gap="6px",D.style.maxHeight="400px",D.style.overflowY="auto",D.style.paddingRight="8px",y.forEach(E=>{D.appendChild(B(E,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),y.length===0){const E=document.createElement("div");E.style.padding="8px",E.style.textAlign="center",E.style.color="#9ca3af",E.style.fontSize="12px",E.textContent="No hay tokens",D.appendChild(E)}I.appendChild(D),e.appendChild(I),a.appendChild(e),R.appendChild(a)}),u.appendChild(R)})}else{const k=document.createElement("div");k.style.padding="12px",k.style.backgroundColor="#fef3c7",k.style.border="1px solid #fbbf24",k.style.borderRadius="8px",k.style.fontSize="14px",k.style.color="#92400e",k.textContent="Los tokens se cargarán dinámicamente desde el CSS. Si no aparecen, verifica que figma-tokens.css esté importado.",u.appendChild(k)}d.appendChild(u)}),d}},W={render:()=>{const d=document.createElement("div");d.style.padding="24px",d.style.maxWidth="1400px";const l=document.createElement("h2");l.textContent="Normal - Todos los Colores",l.style.fontSize="24px",l.style.fontWeight="700",l.style.marginBottom="16px",d.appendChild(l);const r=H("normal"),m=r.light.length+r.dark.length,t=document.createElement("div");if(t.style.marginBottom="24px",t.style.padding="12px",t.style.backgroundColor="#f3f4f6",t.style.border="1px solid #d1d5db",t.style.borderRadius="8px",t.style.fontSize="16px",t.style.fontWeight="600",t.textContent=`Total: ${m} tokens (${r.light.length} Light + ${r.dark.length} Dark)`,d.appendChild(t),m>0){const u=$(r.light),b=$(r.dark);new Set([...Object.keys(u),...Object.keys(b)]).forEach(f=>{const C=u[f]||{},k=b[f]||{},v=new Set([...Object.keys(C),...Object.keys(k)]);if(v.size===0)return;const S=document.createElement("div");S.style.marginBottom="40px";const w=Object.values(C).reduce((n,s)=>n+s.length,0),G=Object.values(k).reduce((n,s)=>n+s.length,0),h=document.createElement("h3");h.textContent=`${f.charAt(0).toUpperCase()+f.slice(1)} (${w} Light + ${G} Dark)`,h.style.fontSize="20px",h.style.fontWeight="600",h.style.marginBottom="16px",h.style.paddingBottom="8px",h.style.borderBottom="2px solid #e5e7eb",S.appendChild(h);const z=["base","default","hover","pressed"];Array.from(v).sort((n,s)=>{const i=z.indexOf(n),o=z.indexOf(s);return i===-1&&o===-1?n.localeCompare(s):i===-1?1:o===-1?-1:i-o}).forEach(n=>{const s=C[n]||[],i=k[n]||[];if(s.length===0&&i.length===0)return;const o=document.createElement("div");o.style.marginBottom="24px",o.style.padding="12px",o.style.backgroundColor="#f9fafb",o.style.border="1px solid #e5e7eb",o.style.borderRadius="8px";const x=document.createElement("h4"),T=n==="base"?"Base":n.charAt(0).toUpperCase()+n.slice(1);x.textContent=`${T} (${s.length} Light + ${i.length} Dark)`,x.style.fontSize="16px",x.style.fontWeight="600",x.style.marginBottom="12px",x.style.color="#303a47",o.appendChild(x);const p=document.createElement("div");p.style.display="grid",p.style.gridTemplateColumns="1fr 1fr",p.style.gap="12px";const y=document.createElement("div");y.style.background="#ffffff",y.style.border="1px solid #e5e7eb",y.style.borderRadius="8px",y.style.padding="12px";const a=document.createElement("div");if(a.style.display="flex",a.style.flexDirection="column",a.style.gap="6px",a.style.maxHeight="400px",a.style.overflowY="auto",a.style.paddingRight="8px",s.forEach(e=>{a.appendChild(B(e,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),s.length===0){const e=document.createElement("div");e.style.padding="8px",e.style.textAlign="center",e.style.color="#9ca3af",e.style.fontSize="12px",e.textContent="No hay tokens",a.appendChild(e)}y.appendChild(a),p.appendChild(y);const g=document.createElement("div");g.style.background="#0E1825",g.style.color="#edeeef",g.style.border="1px solid #0E1825",g.style.borderRadius="8px",g.style.padding="12px";const c=document.createElement("div");if(c.style.display="flex",c.style.flexDirection="column",c.style.gap="6px",c.style.maxHeight="400px",c.style.overflowY="auto",c.style.paddingRight="8px",i.forEach(e=>{c.appendChild(B(e,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),i.length===0){const e=document.createElement("div");e.style.padding="8px",e.style.textAlign="center",e.style.color="#9ca3af",e.style.fontSize="12px",e.textContent="No hay tokens",c.appendChild(e)}g.appendChild(c),p.appendChild(g),o.appendChild(p),S.appendChild(o)}),d.appendChild(S)})}return d}},N={render:()=>{const d=document.createElement("div");d.style.padding="24px",d.style.maxWidth="1400px";const l=document.createElement("h2");l.textContent="Inverted - Todos los Colores",l.style.fontSize="24px",l.style.fontWeight="700",l.style.marginBottom="16px",d.appendChild(l);const r=H("inverted"),m=r.light.length+r.dark.length,t=document.createElement("div");if(t.style.marginBottom="24px",t.style.padding="12px",t.style.backgroundColor="#f3f4f6",t.style.border="1px solid #d1d5db",t.style.borderRadius="8px",t.style.fontSize="16px",t.style.fontWeight="600",t.textContent=`Total: ${m} tokens (${r.light.length} Light + ${r.dark.length} Dark)`,d.appendChild(t),m>0){const u=$(r.light),b=$(r.dark);new Set([...Object.keys(u),...Object.keys(b)]).forEach(f=>{const C=u[f]||{},k=b[f]||{},v=new Set([...Object.keys(C),...Object.keys(k)]);if(v.size===0)return;const S=document.createElement("div");S.style.marginBottom="40px";const w=Object.values(C).reduce((n,s)=>n+s.length,0),G=Object.values(k).reduce((n,s)=>n+s.length,0),h=document.createElement("h3");h.textContent=`${f.charAt(0).toUpperCase()+f.slice(1)} (${w} Light + ${G} Dark)`,h.style.fontSize="20px",h.style.fontWeight="600",h.style.marginBottom="16px",h.style.paddingBottom="8px",h.style.borderBottom="2px solid #e5e7eb",S.appendChild(h);const z=["base","default","hover","pressed"];Array.from(v).sort((n,s)=>{const i=z.indexOf(n),o=z.indexOf(s);return i===-1&&o===-1?n.localeCompare(s):i===-1?1:o===-1?-1:i-o}).forEach(n=>{const s=C[n]||[],i=k[n]||[];if(s.length===0&&i.length===0)return;const o=document.createElement("div");o.style.marginBottom="24px",o.style.padding="12px",o.style.backgroundColor="#f9fafb",o.style.border="1px solid #e5e7eb",o.style.borderRadius="8px";const x=document.createElement("h4"),T=n==="base"?"Base":n.charAt(0).toUpperCase()+n.slice(1);x.textContent=`${T} (${s.length} Light + ${i.length} Dark)`,x.style.fontSize="16px",x.style.fontWeight="600",x.style.marginBottom="12px",x.style.color="#303a47",o.appendChild(x);const p=document.createElement("div");p.style.display="grid",p.style.gridTemplateColumns="1fr 1fr",p.style.gap="12px";const y=document.createElement("div");y.style.background="#ffffff",y.style.border="1px solid #e5e7eb",y.style.borderRadius="8px",y.style.padding="12px";const a=document.createElement("div");if(a.style.display="flex",a.style.flexDirection="column",a.style.gap="6px",a.style.maxHeight="400px",a.style.overflowY="auto",a.style.paddingRight="8px",s.forEach(e=>{a.appendChild(B(e,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),s.length===0){const e=document.createElement("div");e.style.padding="8px",e.style.textAlign="center",e.style.color="#9ca3af",e.style.fontSize="12px",e.textContent="No hay tokens",a.appendChild(e)}y.appendChild(a),p.appendChild(y);const g=document.createElement("div");g.style.background="#0E1825",g.style.color="#edeeef",g.style.border="1px solid #0E1825",g.style.borderRadius="8px",g.style.padding="12px";const c=document.createElement("div");if(c.style.display="flex",c.style.flexDirection="column",c.style.gap="6px",c.style.maxHeight="400px",c.style.overflowY="auto",c.style.paddingRight="8px",i.forEach(e=>{c.appendChild(B(e,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),i.length===0){const e=document.createElement("div");e.style.padding="8px",e.style.textAlign="center",e.style.color="#9ca3af",e.style.fontSize="12px",e.textContent="No hay tokens",c.appendChild(e)}g.appendChild(c),p.appendChild(g),o.appendChild(p),S.appendChild(o)}),d.appendChild(S)})}return d}},V={render:()=>{const d=document.createElement("div");d.style.padding="24px",d.style.maxWidth="1400px";const l=document.createElement("h2");l.textContent="Static - Todos los Colores",l.style.fontSize="24px",l.style.fontWeight="700",l.style.marginBottom="16px",d.appendChild(l);const r=H("static"),m=r.light.length+r.dark.length,t=document.createElement("div");if(t.style.marginBottom="24px",t.style.padding="12px",t.style.backgroundColor="#f3f4f6",t.style.border="1px solid #d1d5db",t.style.borderRadius="8px",t.style.fontSize="16px",t.style.fontWeight="600",t.textContent=`Total: ${m} tokens (${r.light.length} Light + ${r.dark.length} Dark)`,d.appendChild(t),m>0){const u=$(r.light),b=$(r.dark);new Set([...Object.keys(u),...Object.keys(b)]).forEach(f=>{const C=u[f]||{},k=b[f]||{},v=new Set([...Object.keys(C),...Object.keys(k)]);if(v.size===0)return;const S=document.createElement("div");S.style.marginBottom="40px";const w=Object.values(C).reduce((n,s)=>n+s.length,0),G=Object.values(k).reduce((n,s)=>n+s.length,0),h=document.createElement("h3");h.textContent=`${f.charAt(0).toUpperCase()+f.slice(1)} (${w} Light + ${G} Dark)`,h.style.fontSize="20px",h.style.fontWeight="600",h.style.marginBottom="16px",h.style.paddingBottom="8px",h.style.borderBottom="2px solid #e5e7eb",S.appendChild(h);const z=["base","default","hover","pressed"];Array.from(v).sort((n,s)=>{const i=z.indexOf(n),o=z.indexOf(s);return i===-1&&o===-1?n.localeCompare(s):i===-1?1:o===-1?-1:i-o}).forEach(n=>{const s=C[n]||[],i=k[n]||[];if(s.length===0&&i.length===0)return;const o=document.createElement("div");o.style.marginBottom="24px",o.style.padding="12px",o.style.backgroundColor="#f9fafb",o.style.border="1px solid #e5e7eb",o.style.borderRadius="8px";const x=document.createElement("h4"),T=n==="base"?"Base":n.charAt(0).toUpperCase()+n.slice(1);x.textContent=`${T} (${s.length} Light + ${i.length} Dark)`,x.style.fontSize="16px",x.style.fontWeight="600",x.style.marginBottom="12px",x.style.color="#303a47",o.appendChild(x);const p=document.createElement("div");p.style.display="grid",p.style.gridTemplateColumns="1fr 1fr",p.style.gap="12px";const y=document.createElement("div");y.style.background="#ffffff",y.style.border="1px solid #e5e7eb",y.style.borderRadius="8px",y.style.padding="12px";const a=document.createElement("div");if(a.style.display="flex",a.style.flexDirection="column",a.style.gap="6px",a.style.maxHeight="400px",a.style.overflowY="auto",a.style.paddingRight="8px",s.forEach(e=>{a.appendChild(B(e,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),s.length===0){const e=document.createElement("div");e.style.padding="8px",e.style.textAlign="center",e.style.color="#9ca3af",e.style.fontSize="12px",e.textContent="No hay tokens",a.appendChild(e)}y.appendChild(a),p.appendChild(y);const g=document.createElement("div");g.style.background="#0E1825",g.style.color="#edeeef",g.style.border="1px solid #0E1825",g.style.borderRadius="8px",g.style.padding="12px";const c=document.createElement("div");if(c.style.display="flex",c.style.flexDirection="column",c.style.gap="6px",c.style.maxHeight="400px",c.style.overflowY="auto",c.style.paddingRight="8px",i.forEach(e=>{c.appendChild(B(e,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),i.length===0){const e=document.createElement("div");e.style.padding="8px",e.style.textAlign="center",e.style.color="#9ca3af",e.style.fontSize="12px",e.textContent="No hay tokens",c.appendChild(e)}g.appendChild(c),p.appendChild(g),o.appendChild(p),S.appendChild(o)}),d.appendChild(S)})}return d}},U={render:()=>{const d=document.createElement("div");d.style.padding="24px",d.style.maxWidth="1400px";const l=document.createElement("h2");l.textContent="Static Inverted - Todos los Colores",l.style.fontSize="24px",l.style.fontWeight="700",l.style.marginBottom="16px",d.appendChild(l);const r=H("static-inverted"),m=r.light.length+r.dark.length,t=document.createElement("div");if(t.style.marginBottom="24px",t.style.padding="12px",t.style.backgroundColor="#f3f4f6",t.style.border="1px solid #d1d5db",t.style.borderRadius="8px",t.style.fontSize="16px",t.style.fontWeight="600",t.textContent=`Total: ${m} tokens (${r.light.length} Light + ${r.dark.length} Dark)`,d.appendChild(t),m>0){const u=$(r.light),b=$(r.dark);new Set([...Object.keys(u),...Object.keys(b)]).forEach(f=>{const C=u[f]||{},k=b[f]||{},v=new Set([...Object.keys(C),...Object.keys(k)]);if(v.size===0)return;const S=document.createElement("div");S.style.marginBottom="40px";const w=Object.values(C).reduce((n,s)=>n+s.length,0),G=Object.values(k).reduce((n,s)=>n+s.length,0),h=document.createElement("h3");h.textContent=`${f.charAt(0).toUpperCase()+f.slice(1)} (${w} Light + ${G} Dark)`,h.style.fontSize="20px",h.style.fontWeight="600",h.style.marginBottom="16px",h.style.paddingBottom="8px",h.style.borderBottom="2px solid #e5e7eb",S.appendChild(h);const z=["base","default","hover","pressed"];Array.from(v).sort((n,s)=>{const i=z.indexOf(n),o=z.indexOf(s);return i===-1&&o===-1?n.localeCompare(s):i===-1?1:o===-1?-1:i-o}).forEach(n=>{const s=C[n]||[],i=k[n]||[];if(s.length===0&&i.length===0)return;const o=document.createElement("div");o.style.marginBottom="24px",o.style.padding="12px",o.style.backgroundColor="#f9fafb",o.style.border="1px solid #e5e7eb",o.style.borderRadius="8px";const x=document.createElement("h4"),T=n==="base"?"Base":n.charAt(0).toUpperCase()+n.slice(1);x.textContent=`${T} (${s.length} Light + ${i.length} Dark)`,x.style.fontSize="16px",x.style.fontWeight="600",x.style.marginBottom="12px",x.style.color="#303a47",o.appendChild(x);const p=document.createElement("div");p.style.display="grid",p.style.gridTemplateColumns="1fr 1fr",p.style.gap="12px";const y=document.createElement("div");y.style.background="#ffffff",y.style.border="1px solid #e5e7eb",y.style.borderRadius="8px",y.style.padding="12px";const a=document.createElement("div");if(a.style.display="flex",a.style.flexDirection="column",a.style.gap="6px",a.style.maxHeight="400px",a.style.overflowY="auto",a.style.paddingRight="8px",s.forEach(e=>{a.appendChild(B(e,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),s.length===0){const e=document.createElement("div");e.style.padding="8px",e.style.textAlign="center",e.style.color="#9ca3af",e.style.fontSize="12px",e.textContent="No hay tokens",a.appendChild(e)}y.appendChild(a),p.appendChild(y);const g=document.createElement("div");g.style.background="#0E1825",g.style.color="#edeeef",g.style.border="1px solid #0E1825",g.style.borderRadius="8px",g.style.padding="12px";const c=document.createElement("div");if(c.style.display="flex",c.style.flexDirection="column",c.style.gap="6px",c.style.maxHeight="400px",c.style.overflowY="auto",c.style.paddingRight="8px",i.forEach(e=>{c.appendChild(B(e,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),i.length===0){const e=document.createElement("div");e.style.padding="8px",e.style.textAlign="center",e.style.color="#9ca3af",e.style.fontSize="12px",e.textContent="No hay tokens",c.appendChild(e)}g.appendChild(c),p.appendChild(g),o.appendChild(p),S.appendChild(o)}),d.appendChild(S)})}return d}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Modificadores (.modifiers) - Resumen';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#dbeafe';
    summary.style.border = '1px solid #3b82f6';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    summary.style.color = '#1e40af';
    summary.innerHTML = \`
      <strong>📊 Resumen de Modificadores:</strong><br><br>
      • <strong>Normal</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Inverted</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Static</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Static Inverted</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br><br>
      <strong>Total: 1296 tokens</strong><br><br>
      Cada modificador contiene TODOS los colores del sistema: accent, fg, bg, border, feedback, chart, button, etc.
    \`;
    container.appendChild(summary);
    const modifiers = ['normal', 'inverted', 'static', 'static-inverted'] as const;
    modifiers.forEach(modifier => {
      const section = document.createElement('div');
      section.style.marginBottom = '40px';
      section.style.padding = '20px';
      section.style.border = '1px solid #e5e7eb';
      section.style.borderRadius = '12px';
      section.style.backgroundColor = '#f9fafb';
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = \`\${modifier.charAt(0).toUpperCase() + modifier.slice(1).replace('-', ' ')}\`;
      sectionTitle.style.fontSize = '20px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '16px';
      sectionTitle.style.textTransform = 'capitalize';
      section.appendChild(sectionTitle);
      const tokens = getModifierTokens(modifier);
      const totalCount = tokens.light.length + tokens.dark.length;
      const count = document.createElement('div');
      count.style.marginBottom = '16px';
      count.style.fontSize = '16px';
      count.style.fontWeight = '600';
      count.textContent = \`Total: \${totalCount} tokens (\${tokens.light.length} Light + \${tokens.dark.length} Dark)\`;
      section.appendChild(count);
      if (totalCount > 0) {
        // Organizar por categoría y estado (default, hover, pressed)
        const organizedLight = organizeTokensByCategoryAndState(tokens.light);
        const organizedDark = organizeTokensByCategoryAndState(tokens.dark);

        // Obtener todas las categorías únicas
        const allCategories = new Set([...Object.keys(organizedLight), ...Object.keys(organizedDark)]);
        allCategories.forEach(categoryName => {
          const lightCategory = organizedLight[categoryName] || {};
          const darkCategory = organizedDark[categoryName] || {};

          // Obtener todos los estados únicos
          const allStates = new Set([...Object.keys(lightCategory), ...Object.keys(darkCategory)]);
          if (allStates.size === 0) return;
          const categorySection = document.createElement('div');
          categorySection.style.marginBottom = '32px';

          // Calcular total de tokens en esta categoría
          const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
          const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);
          const categoryTitle = document.createElement('h4');
          categoryTitle.textContent = \`\${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (\${lightTotal} Light + \${darkTotal} Dark = \${lightTotal + darkTotal} tokens)\`;
          categoryTitle.style.fontSize = '16px';
          categoryTitle.style.fontWeight = '600';
          categoryTitle.style.marginBottom = '16px';
          categoryTitle.style.paddingBottom = '8px';
          categoryTitle.style.borderBottom = '2px solid #e5e7eb';
          categorySection.appendChild(categoryTitle);

          // Ordenar estados: base/default primero, luego hover, luego pressed
          const stateOrder = ['base', 'default', 'hover', 'pressed'];
          const sortedStates = Array.from(allStates).sort((a, b) => {
            const aIndex = stateOrder.indexOf(a);
            const bIndex = stateOrder.indexOf(b);
            if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
          });
          sortedStates.forEach(stateName => {
            const lightStateTokens = lightCategory[stateName] || [];
            const darkStateTokens = darkCategory[stateName] || [];
            if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;
            const stateSection = document.createElement('div');
            stateSection.style.marginBottom = '24px';
            stateSection.style.padding = '12px';
            stateSection.style.backgroundColor = '#f9fafb';
            stateSection.style.border = '1px solid #e5e7eb';
            stateSection.style.borderRadius = '8px';
            const stateTitle = document.createElement('h5');
            const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
            stateTitle.textContent = \`\${stateLabel} (\${lightStateTokens.length} Light + \${darkStateTokens.length} Dark)\`;
            stateTitle.style.fontSize = '14px';
            stateTitle.style.fontWeight = '600';
            stateTitle.style.marginBottom = '12px';
            stateTitle.style.color = '#303a47';
            stateSection.appendChild(stateTitle);

            // Crear comparación Light/Dark en dos columnas
            const comparison = document.createElement('div');
            comparison.style.display = 'grid';
            comparison.style.gridTemplateColumns = '1fr 1fr';
            comparison.style.gap = '12px';

            // Columna Light
            const lightCol = document.createElement('div');
            lightCol.style.background = '#ffffff';
            lightCol.style.border = '1px solid #e5e7eb';
            lightCol.style.borderRadius = '8px';
            lightCol.style.padding = '12px';
            const lightGrid = document.createElement('div');
            lightGrid.style.display = 'flex';
            lightGrid.style.flexDirection = 'column';
            lightGrid.style.gap = '6px';
            lightGrid.style.maxHeight = '400px';
            lightGrid.style.overflowY = 'auto';
            lightGrid.style.paddingRight = '8px';
            lightStateTokens.forEach(token => {
              lightGrid.appendChild(createColorSwatch(token, 'light', {
                showVariable: true,
                showValue: true,
                width: '100%'
              }));
            });
            if (lightStateTokens.length === 0) {
              const empty = document.createElement('div');
              empty.style.padding = '8px';
              empty.style.textAlign = 'center';
              empty.style.color = '#9ca3af';
              empty.style.fontSize = '12px';
              empty.textContent = 'No hay tokens';
              lightGrid.appendChild(empty);
            }
            lightCol.appendChild(lightGrid);
            comparison.appendChild(lightCol);

            // Columna Dark
            const darkCol = document.createElement('div');
            darkCol.style.background = '#0E1825';
            darkCol.style.color = '#edeeef';
            darkCol.style.border = '1px solid #0E1825';
            darkCol.style.borderRadius = '8px';
            darkCol.style.padding = '12px';
            const darkGrid = document.createElement('div');
            darkGrid.style.display = 'flex';
            darkGrid.style.flexDirection = 'column';
            darkGrid.style.gap = '6px';
            darkGrid.style.maxHeight = '400px';
            darkGrid.style.overflowY = 'auto';
            darkGrid.style.paddingRight = '8px';
            darkStateTokens.forEach(token => {
              darkGrid.appendChild(createColorSwatch(token, 'dark', {
                showVariable: true,
                showValue: true,
                width: '100%'
              }));
            });
            if (darkStateTokens.length === 0) {
              const empty = document.createElement('div');
              empty.style.padding = '8px';
              empty.style.textAlign = 'center';
              empty.style.color = '#9ca3af';
              empty.style.fontSize = '12px';
              empty.textContent = 'No hay tokens';
              darkGrid.appendChild(empty);
            }
            darkCol.appendChild(darkGrid);
            comparison.appendChild(darkCol);
            stateSection.appendChild(comparison);
            categorySection.appendChild(stateSection);
          });
          section.appendChild(categorySection);
        });
      } else {
        const note = document.createElement('div');
        note.style.padding = '12px';
        note.style.backgroundColor = '#fef3c7';
        note.style.border = '1px solid #fbbf24';
        note.style.borderRadius = '8px';
        note.style.fontSize = '14px';
        note.style.color = '#92400e';
        note.textContent = 'Los tokens se cargarán dinámicamente desde el CSS. Si no aparecen, verifica que figma-tokens.css esté importado.';
        section.appendChild(note);
      }
      container.appendChild(section);
    });
    return container;
  }
}`,...j.parameters?.docs?.source},description:{story:"Story principal que muestra todos los modificadores",...j.parameters?.docs?.description}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Normal - Todos los Colores';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const tokens = getModifierTokens('normal');
    const totalCount = tokens.light.length + tokens.dark.length;
    const count = document.createElement('div');
    count.style.marginBottom = '24px';
    count.style.padding = '12px';
    count.style.backgroundColor = '#f3f4f6';
    count.style.border = '1px solid #d1d5db';
    count.style.borderRadius = '8px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = \`Total: \${totalCount} tokens (\${tokens.light.length} Light + \${tokens.dark.length} Dark)\`;
    container.appendChild(count);
    if (totalCount > 0) {
      // Organizar por categoría y estado (default, hover, pressed)
      const organizedLight = organizeTokensByCategoryAndState(tokens.light);
      const organizedDark = organizeTokensByCategoryAndState(tokens.dark);

      // Obtener todas las categorías únicas
      const allCategories = new Set([...Object.keys(organizedLight), ...Object.keys(organizedDark)]);
      allCategories.forEach(categoryName => {
        const lightCategory = organizedLight[categoryName] || {};
        const darkCategory = organizedDark[categoryName] || {};

        // Obtener todos los estados únicos
        const allStates = new Set([...Object.keys(lightCategory), ...Object.keys(darkCategory)]);
        if (allStates.size === 0) return;
        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';

        // Calcular total de tokens en esta categoría
        const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = \`\${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (\${lightTotal} Light + \${darkTotal} Dark)\`;
        sectionTitle.style.fontSize = '20px';
        sectionTitle.style.fontWeight = '600';
        sectionTitle.style.marginBottom = '16px';
        sectionTitle.style.paddingBottom = '8px';
        sectionTitle.style.borderBottom = '2px solid #e5e7eb';
        categorySection.appendChild(sectionTitle);

        // Ordenar estados: base/default primero, luego hover, luego pressed
        const stateOrder = ['base', 'default', 'hover', 'pressed'];
        const sortedStates = Array.from(allStates).sort((a, b) => {
          const aIndex = stateOrder.indexOf(a);
          const bIndex = stateOrder.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        sortedStates.forEach(stateName => {
          const lightStateTokens = lightCategory[stateName] || [];
          const darkStateTokens = darkCategory[stateName] || [];
          if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;
          const stateSection = document.createElement('div');
          stateSection.style.marginBottom = '24px';
          stateSection.style.padding = '12px';
          stateSection.style.backgroundColor = '#f9fafb';
          stateSection.style.border = '1px solid #e5e7eb';
          stateSection.style.borderRadius = '8px';
          const stateTitle = document.createElement('h4');
          const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
          stateTitle.textContent = \`\${stateLabel} (\${lightStateTokens.length} Light + \${darkStateTokens.length} Dark)\`;
          stateTitle.style.fontSize = '16px';
          stateTitle.style.fontWeight = '600';
          stateTitle.style.marginBottom = '12px';
          stateTitle.style.color = '#303a47';
          stateSection.appendChild(stateTitle);

          // Crear comparación Light/Dark en dos columnas
          const comparison = document.createElement('div');
          comparison.style.display = 'grid';
          comparison.style.gridTemplateColumns = '1fr 1fr';
          comparison.style.gap = '12px';

          // Columna Light
          const lightCol = document.createElement('div');
          lightCol.style.background = '#ffffff';
          lightCol.style.border = '1px solid #e5e7eb';
          lightCol.style.borderRadius = '8px';
          lightCol.style.padding = '12px';
          const lightGrid = document.createElement('div');
          lightGrid.style.display = 'flex';
          lightGrid.style.flexDirection = 'column';
          lightGrid.style.gap = '6px';
          lightGrid.style.maxHeight = '400px';
          lightGrid.style.overflowY = 'auto';
          lightGrid.style.paddingRight = '8px';
          lightStateTokens.forEach(token => {
            lightGrid.appendChild(createColorSwatch(token, 'light', {
              showVariable: true,
              showValue: true,
              width: '100%'
            }));
          });
          if (lightStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            lightGrid.appendChild(empty);
          }
          lightCol.appendChild(lightGrid);
          comparison.appendChild(lightCol);

          // Columna Dark
          const darkCol = document.createElement('div');
          darkCol.style.background = '#0E1825';
          darkCol.style.color = '#edeeef';
          darkCol.style.border = '1px solid #0E1825';
          darkCol.style.borderRadius = '8px';
          darkCol.style.padding = '12px';
          const darkGrid = document.createElement('div');
          darkGrid.style.display = 'flex';
          darkGrid.style.flexDirection = 'column';
          darkGrid.style.gap = '6px';
          darkGrid.style.maxHeight = '400px';
          darkGrid.style.overflowY = 'auto';
          darkGrid.style.paddingRight = '8px';
          darkStateTokens.forEach(token => {
            darkGrid.appendChild(createColorSwatch(token, 'dark', {
              showVariable: true,
              showValue: true,
              width: '100%'
            }));
          });
          if (darkStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            darkGrid.appendChild(empty);
          }
          darkCol.appendChild(darkGrid);
          comparison.appendChild(darkCol);
          stateSection.appendChild(comparison);
          categorySection.appendChild(stateSection);
        });
        container.appendChild(categorySection);
      });
    }
    return container;
  }
}`,...W.parameters?.docs?.source},description:{story:"Story para Normal",...W.parameters?.docs?.description}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Inverted - Todos los Colores';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const tokens = getModifierTokens('inverted');
    const totalCount = tokens.light.length + tokens.dark.length;
    const count = document.createElement('div');
    count.style.marginBottom = '24px';
    count.style.padding = '12px';
    count.style.backgroundColor = '#f3f4f6';
    count.style.border = '1px solid #d1d5db';
    count.style.borderRadius = '8px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = \`Total: \${totalCount} tokens (\${tokens.light.length} Light + \${tokens.dark.length} Dark)\`;
    container.appendChild(count);
    if (totalCount > 0) {
      // Organizar por categoría y estado (default, hover, pressed)
      const organizedLight = organizeTokensByCategoryAndState(tokens.light);
      const organizedDark = organizeTokensByCategoryAndState(tokens.dark);
      const allCategories = new Set([...Object.keys(organizedLight), ...Object.keys(organizedDark)]);
      allCategories.forEach(categoryName => {
        const lightCategory = organizedLight[categoryName] || {};
        const darkCategory = organizedDark[categoryName] || {};

        // Obtener todos los estados únicos
        const allStates = new Set([...Object.keys(lightCategory), ...Object.keys(darkCategory)]);
        if (allStates.size === 0) return;
        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';

        // Calcular total de tokens en esta categoría
        const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = \`\${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (\${lightTotal} Light + \${darkTotal} Dark)\`;
        sectionTitle.style.fontSize = '20px';
        sectionTitle.style.fontWeight = '600';
        sectionTitle.style.marginBottom = '16px';
        sectionTitle.style.paddingBottom = '8px';
        sectionTitle.style.borderBottom = '2px solid #e5e7eb';
        categorySection.appendChild(sectionTitle);

        // Ordenar estados: base/default primero, luego hover, luego pressed
        const stateOrder = ['base', 'default', 'hover', 'pressed'];
        const sortedStates = Array.from(allStates).sort((a, b) => {
          const aIndex = stateOrder.indexOf(a);
          const bIndex = stateOrder.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        sortedStates.forEach(stateName => {
          const lightStateTokens = lightCategory[stateName] || [];
          const darkStateTokens = darkCategory[stateName] || [];
          if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;
          const stateSection = document.createElement('div');
          stateSection.style.marginBottom = '24px';
          stateSection.style.padding = '12px';
          stateSection.style.backgroundColor = '#f9fafb';
          stateSection.style.border = '1px solid #e5e7eb';
          stateSection.style.borderRadius = '8px';
          const stateTitle = document.createElement('h4');
          const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
          stateTitle.textContent = \`\${stateLabel} (\${lightStateTokens.length} Light + \${darkStateTokens.length} Dark)\`;
          stateTitle.style.fontSize = '16px';
          stateTitle.style.fontWeight = '600';
          stateTitle.style.marginBottom = '12px';
          stateTitle.style.color = '#303a47';
          stateSection.appendChild(stateTitle);

          // Crear comparación Light/Dark en dos columnas
          const comparison = document.createElement('div');
          comparison.style.display = 'grid';
          comparison.style.gridTemplateColumns = '1fr 1fr';
          comparison.style.gap = '12px';

          // Columna Light
          const lightCol = document.createElement('div');
          lightCol.style.background = '#ffffff';
          lightCol.style.border = '1px solid #e5e7eb';
          lightCol.style.borderRadius = '8px';
          lightCol.style.padding = '12px';
          const lightGrid = document.createElement('div');
          lightGrid.style.display = 'flex';
          lightGrid.style.flexDirection = 'column';
          lightGrid.style.gap = '6px';
          lightGrid.style.maxHeight = '400px';
          lightGrid.style.overflowY = 'auto';
          lightGrid.style.paddingRight = '8px';
          lightStateTokens.forEach(token => {
            lightGrid.appendChild(createColorSwatch(token, 'light', {
              showVariable: true,
              showValue: true,
              width: '100%'
            }));
          });
          if (lightStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            lightGrid.appendChild(empty);
          }
          lightCol.appendChild(lightGrid);
          comparison.appendChild(lightCol);

          // Columna Dark
          const darkCol = document.createElement('div');
          darkCol.style.background = '#0E1825';
          darkCol.style.color = '#edeeef';
          darkCol.style.border = '1px solid #0E1825';
          darkCol.style.borderRadius = '8px';
          darkCol.style.padding = '12px';
          const darkGrid = document.createElement('div');
          darkGrid.style.display = 'flex';
          darkGrid.style.flexDirection = 'column';
          darkGrid.style.gap = '6px';
          darkGrid.style.maxHeight = '400px';
          darkGrid.style.overflowY = 'auto';
          darkGrid.style.paddingRight = '8px';
          darkStateTokens.forEach(token => {
            darkGrid.appendChild(createColorSwatch(token, 'dark', {
              showVariable: true,
              showValue: true,
              width: '100%'
            }));
          });
          if (darkStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            darkGrid.appendChild(empty);
          }
          darkCol.appendChild(darkGrid);
          comparison.appendChild(darkCol);
          stateSection.appendChild(comparison);
          categorySection.appendChild(stateSection);
        });
        container.appendChild(categorySection);
      });
    }
    return container;
  }
}`,...N.parameters?.docs?.source},description:{story:"Story para Inverted",...N.parameters?.docs?.description}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Static - Todos los Colores';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const tokens = getModifierTokens('static');
    const totalCount = tokens.light.length + tokens.dark.length;
    const count = document.createElement('div');
    count.style.marginBottom = '24px';
    count.style.padding = '12px';
    count.style.backgroundColor = '#f3f4f6';
    count.style.border = '1px solid #d1d5db';
    count.style.borderRadius = '8px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = \`Total: \${totalCount} tokens (\${tokens.light.length} Light + \${tokens.dark.length} Dark)\`;
    container.appendChild(count);
    if (totalCount > 0) {
      // Organizar por categoría y estado (default, hover, pressed)
      const organizedLight = organizeTokensByCategoryAndState(tokens.light);
      const organizedDark = organizeTokensByCategoryAndState(tokens.dark);
      const allCategories = new Set([...Object.keys(organizedLight), ...Object.keys(organizedDark)]);
      allCategories.forEach(categoryName => {
        const lightCategory = organizedLight[categoryName] || {};
        const darkCategory = organizedDark[categoryName] || {};

        // Obtener todos los estados únicos
        const allStates = new Set([...Object.keys(lightCategory), ...Object.keys(darkCategory)]);
        if (allStates.size === 0) return;
        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';

        // Calcular total de tokens en esta categoría
        const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = \`\${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (\${lightTotal} Light + \${darkTotal} Dark)\`;
        sectionTitle.style.fontSize = '20px';
        sectionTitle.style.fontWeight = '600';
        sectionTitle.style.marginBottom = '16px';
        sectionTitle.style.paddingBottom = '8px';
        sectionTitle.style.borderBottom = '2px solid #e5e7eb';
        categorySection.appendChild(sectionTitle);

        // Ordenar estados: base/default primero, luego hover, luego pressed
        const stateOrder = ['base', 'default', 'hover', 'pressed'];
        const sortedStates = Array.from(allStates).sort((a, b) => {
          const aIndex = stateOrder.indexOf(a);
          const bIndex = stateOrder.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        sortedStates.forEach(stateName => {
          const lightStateTokens = lightCategory[stateName] || [];
          const darkStateTokens = darkCategory[stateName] || [];
          if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;
          const stateSection = document.createElement('div');
          stateSection.style.marginBottom = '24px';
          stateSection.style.padding = '12px';
          stateSection.style.backgroundColor = '#f9fafb';
          stateSection.style.border = '1px solid #e5e7eb';
          stateSection.style.borderRadius = '8px';
          const stateTitle = document.createElement('h4');
          const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
          stateTitle.textContent = \`\${stateLabel} (\${lightStateTokens.length} Light + \${darkStateTokens.length} Dark)\`;
          stateTitle.style.fontSize = '16px';
          stateTitle.style.fontWeight = '600';
          stateTitle.style.marginBottom = '12px';
          stateTitle.style.color = '#303a47';
          stateSection.appendChild(stateTitle);

          // Crear comparación Light/Dark en dos columnas
          const comparison = document.createElement('div');
          comparison.style.display = 'grid';
          comparison.style.gridTemplateColumns = '1fr 1fr';
          comparison.style.gap = '12px';

          // Columna Light
          const lightCol = document.createElement('div');
          lightCol.style.background = '#ffffff';
          lightCol.style.border = '1px solid #e5e7eb';
          lightCol.style.borderRadius = '8px';
          lightCol.style.padding = '12px';
          const lightGrid = document.createElement('div');
          lightGrid.style.display = 'flex';
          lightGrid.style.flexDirection = 'column';
          lightGrid.style.gap = '6px';
          lightGrid.style.maxHeight = '400px';
          lightGrid.style.overflowY = 'auto';
          lightGrid.style.paddingRight = '8px';
          lightStateTokens.forEach(token => {
            lightGrid.appendChild(createColorSwatch(token, 'light', {
              showVariable: true,
              showValue: true,
              width: '100%'
            }));
          });
          if (lightStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            lightGrid.appendChild(empty);
          }
          lightCol.appendChild(lightGrid);
          comparison.appendChild(lightCol);

          // Columna Dark
          const darkCol = document.createElement('div');
          darkCol.style.background = '#0E1825';
          darkCol.style.color = '#edeeef';
          darkCol.style.border = '1px solid #0E1825';
          darkCol.style.borderRadius = '8px';
          darkCol.style.padding = '12px';
          const darkGrid = document.createElement('div');
          darkGrid.style.display = 'flex';
          darkGrid.style.flexDirection = 'column';
          darkGrid.style.gap = '6px';
          darkGrid.style.maxHeight = '400px';
          darkGrid.style.overflowY = 'auto';
          darkGrid.style.paddingRight = '8px';
          darkStateTokens.forEach(token => {
            darkGrid.appendChild(createColorSwatch(token, 'dark', {
              showVariable: true,
              showValue: true,
              width: '100%'
            }));
          });
          if (darkStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            darkGrid.appendChild(empty);
          }
          darkCol.appendChild(darkGrid);
          comparison.appendChild(darkCol);
          stateSection.appendChild(comparison);
          categorySection.appendChild(stateSection);
        });
        container.appendChild(categorySection);
      });
    }
    return container;
  }
}`,...V.parameters?.docs?.source},description:{story:"Story para Static",...V.parameters?.docs?.description}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Static Inverted - Todos los Colores';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const tokens = getModifierTokens('static-inverted');
    const totalCount = tokens.light.length + tokens.dark.length;
    const count = document.createElement('div');
    count.style.marginBottom = '24px';
    count.style.padding = '12px';
    count.style.backgroundColor = '#f3f4f6';
    count.style.border = '1px solid #d1d5db';
    count.style.borderRadius = '8px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = \`Total: \${totalCount} tokens (\${tokens.light.length} Light + \${tokens.dark.length} Dark)\`;
    container.appendChild(count);
    if (totalCount > 0) {
      // Organizar por categoría y estado (default, hover, pressed)
      const organizedLight = organizeTokensByCategoryAndState(tokens.light);
      const organizedDark = organizeTokensByCategoryAndState(tokens.dark);
      const allCategories = new Set([...Object.keys(organizedLight), ...Object.keys(organizedDark)]);
      allCategories.forEach(categoryName => {
        const lightCategory = organizedLight[categoryName] || {};
        const darkCategory = organizedDark[categoryName] || {};

        // Obtener todos los estados únicos
        const allStates = new Set([...Object.keys(lightCategory), ...Object.keys(darkCategory)]);
        if (allStates.size === 0) return;
        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';

        // Calcular total de tokens en esta categoría
        const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = \`\${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (\${lightTotal} Light + \${darkTotal} Dark)\`;
        sectionTitle.style.fontSize = '20px';
        sectionTitle.style.fontWeight = '600';
        sectionTitle.style.marginBottom = '16px';
        sectionTitle.style.paddingBottom = '8px';
        sectionTitle.style.borderBottom = '2px solid #e5e7eb';
        categorySection.appendChild(sectionTitle);

        // Ordenar estados: base/default primero, luego hover, luego pressed
        const stateOrder = ['base', 'default', 'hover', 'pressed'];
        const sortedStates = Array.from(allStates).sort((a, b) => {
          const aIndex = stateOrder.indexOf(a);
          const bIndex = stateOrder.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        sortedStates.forEach(stateName => {
          const lightStateTokens = lightCategory[stateName] || [];
          const darkStateTokens = darkCategory[stateName] || [];
          if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;
          const stateSection = document.createElement('div');
          stateSection.style.marginBottom = '24px';
          stateSection.style.padding = '12px';
          stateSection.style.backgroundColor = '#f9fafb';
          stateSection.style.border = '1px solid #e5e7eb';
          stateSection.style.borderRadius = '8px';
          const stateTitle = document.createElement('h4');
          const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
          stateTitle.textContent = \`\${stateLabel} (\${lightStateTokens.length} Light + \${darkStateTokens.length} Dark)\`;
          stateTitle.style.fontSize = '16px';
          stateTitle.style.fontWeight = '600';
          stateTitle.style.marginBottom = '12px';
          stateTitle.style.color = '#303a47';
          stateSection.appendChild(stateTitle);

          // Crear comparación Light/Dark en dos columnas
          const comparison = document.createElement('div');
          comparison.style.display = 'grid';
          comparison.style.gridTemplateColumns = '1fr 1fr';
          comparison.style.gap = '12px';

          // Columna Light
          const lightCol = document.createElement('div');
          lightCol.style.background = '#ffffff';
          lightCol.style.border = '1px solid #e5e7eb';
          lightCol.style.borderRadius = '8px';
          lightCol.style.padding = '12px';
          const lightGrid = document.createElement('div');
          lightGrid.style.display = 'flex';
          lightGrid.style.flexDirection = 'column';
          lightGrid.style.gap = '6px';
          lightGrid.style.maxHeight = '400px';
          lightGrid.style.overflowY = 'auto';
          lightGrid.style.paddingRight = '8px';
          lightStateTokens.forEach(token => {
            lightGrid.appendChild(createColorSwatch(token, 'light', {
              showVariable: true,
              showValue: true,
              width: '100%'
            }));
          });
          if (lightStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            lightGrid.appendChild(empty);
          }
          lightCol.appendChild(lightGrid);
          comparison.appendChild(lightCol);

          // Columna Dark
          const darkCol = document.createElement('div');
          darkCol.style.background = '#0E1825';
          darkCol.style.color = '#edeeef';
          darkCol.style.border = '1px solid #0E1825';
          darkCol.style.borderRadius = '8px';
          darkCol.style.padding = '12px';
          const darkGrid = document.createElement('div');
          darkGrid.style.display = 'flex';
          darkGrid.style.flexDirection = 'column';
          darkGrid.style.gap = '6px';
          darkGrid.style.maxHeight = '400px';
          darkGrid.style.overflowY = 'auto';
          darkGrid.style.paddingRight = '8px';
          darkStateTokens.forEach(token => {
            darkGrid.appendChild(createColorSwatch(token, 'dark', {
              showVariable: true,
              showValue: true,
              width: '100%'
            }));
          });
          if (darkStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            darkGrid.appendChild(empty);
          }
          darkCol.appendChild(darkGrid);
          comparison.appendChild(darkCol);
          stateSection.appendChild(comparison);
          categorySection.appendChild(stateSection);
        });
        container.appendChild(categorySection);
      });
    }
    return container;
  }
}`,...U.parameters?.docs?.source},description:{story:"Story para Static Inverted",...U.parameters?.docs?.description}}};const _=["TodosLosModificadores","Normal","Inverted","Static","StaticInverted"];export{N as Inverted,W as Normal,V as Static,U as StaticInverted,j as TodosLosModificadores,_ as __namedExportsOrder,q as default};
