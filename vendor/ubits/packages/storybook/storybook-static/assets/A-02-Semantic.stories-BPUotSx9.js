import{c as p,a as q}from"./utils-QDDdDBjb.js";const e={feedback:{accent:{light:["--modifiers-normal-color-light-feedback-accent-success","--modifiers-normal-color-light-feedback-accent-info","--modifiers-normal-color-light-feedback-accent-warning","--modifiers-normal-color-light-feedback-accent-error"],dark:["--modifiers-normal-color-dark-feedback-accent-success","--modifiers-normal-color-dark-feedback-accent-info","--modifiers-normal-color-dark-feedback-accent-warning","--modifiers-normal-color-dark-feedback-accent-error"]},border:{light:["--modifiers-normal-color-light-feedback-border-success","--modifiers-normal-color-light-feedback-border-info","--modifiers-normal-color-light-feedback-border-warning","--modifiers-normal-color-light-feedback-border-error"],dark:["--modifiers-normal-color-dark-feedback-border-success","--modifiers-normal-color-dark-feedback-border-info","--modifiers-normal-color-dark-feedback-border-warning","--modifiers-normal-color-dark-feedback-border-error"]},chart:{light:["--modifiers-normal-color-light-feedback-chart-success-subtle","--modifiers-normal-color-light-feedback-chart-success-bold","--modifiers-normal-color-light-feedback-chart-info-subtle","--modifiers-normal-color-light-feedback-chart-info-bold","--modifiers-normal-color-light-feedback-chart-warning-subtle","--modifiers-normal-color-light-feedback-chart-warning-bold","--modifiers-normal-color-light-feedback-chart-error-subtle","--modifiers-normal-color-light-feedback-chart-error-bold"],dark:["--modifiers-normal-color-dark-feedback-chart-success-subtle","--modifiers-normal-color-dark-feedback-chart-success-bold","--modifiers-normal-color-dark-feedback-chart-info-subtle","--modifiers-normal-color-dark-feedback-chart-info-bold","--modifiers-normal-color-dark-feedback-chart-warning-subtle","--modifiers-normal-color-dark-feedback-chart-warning-bold","--modifiers-normal-color-dark-feedback-chart-error-subtle","--modifiers-normal-color-dark-feedback-chart-error-bold"]}},brand:{light:["--modifiers-normal-brand-light-bds-bg-secondary-shape","--modifiers-normal-brand-light-bds-bg-primary-shape","--modifiers-normal-brand-light-ubits-logo"],dark:["--modifiers-normal-brand-dark-bds-bg-secondary-shape","--modifiers-normal-brand-dark-bds-bg-primary-shape","--modifiers-normal-brand-dark-ubits-logo"]},chart:["--modifiers-normal-chart-color-fg-bold","--modifiers-normal-chart-color-bg-blue-subtle","--modifiers-normal-chart-color-bg-blue-bold","--modifiers-normal-chart-color-bg-gray-subtle","--modifiers-normal-chart-color-bg-gray-bold","--modifiers-normal-chart-color-bg-yellow-subtle","--modifiers-normal-chart-color-bg-yellow-bold","--modifiers-normal-chart-color-bg-green-subtle","--modifiers-normal-chart-color-bg-green-bold","--modifiers-normal-chart-color-bg-teal-subtle","--modifiers-normal-chart-color-bg-teal-bold","--modifiers-normal-chart-color-bg-purple-subtle","--modifiers-normal-chart-color-bg-purple-bold","--modifiers-normal-chart-color-bg-pink-subtle","--modifiers-normal-chart-color-bg-pink-bold","--modifiers-normal-chart-color-bg-rose-subtle","--modifiers-normal-chart-color-bg-rose-bold","--modifiers-normal-chart-color-bg-level-1","--modifiers-normal-chart-color-bg-neutral-blue-1","--modifiers-normal-chart-color-bg-neutral-blue-2","--modifiers-normal-chart-color-bg-neutral-blue-3","--modifiers-normal-chart-color-bg-neutral-blue-4","--modifiers-normal-chart-color-bg-neutral-blue-5","--modifiers-normal-chart-color-bg-neutral-blue-6","--modifiers-normal-chart-color-bg-neutral-blue-7","--modifiers-normal-chart-color-bg-neutral-blue-8","--modifiers-normal-chart-color-bg-neutral-blue-9","--modifiers-normal-chart-color-bg-neutral-blue-10","--modifiers-normal-chart-color-bg-neutral-blue-11","--modifiers-normal-chart-color-bg-neutral-blue-12","--modifiers-normal-chart-color-bg-neutral-blue-13","--modifiers-normal-chart-color-bg-neutral-blue-14","--modifiers-normal-chart-color-bg-neutral-blue-base"]},X={title:"Tokens UBITS/02. Semánticos",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Colores semánticos del sistema UBITS. Incluye colores de feedback (success, error, warning, info), colores de marca (brand) y colores para gráficos (chart)."}}}},K={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const i=document.createElement("h2");i.textContent="Semánticos - Todos los Tokens",i.style.fontSize="24px",i.style.fontWeight="700",i.style.marginBottom="16px",l.appendChild(i);const c=e.feedback.accent.light.length+e.feedback.border.light.length+e.feedback.chart.light.length,o=e.brand.light.length,n=e.chart.length,t=document.createElement("div");t.style.marginBottom="24px",t.style.padding="16px",t.style.backgroundColor="#f3f4f6",t.style.border="1px solid #d1d5db",t.style.borderRadius="8px",t.style.fontSize="14px",t.innerHTML=`
      <strong>Resumen:</strong><br>
      • Feedback: ${c} tokens (Light) + ${c} tokens (Dark) = ${c*2} tokens total<br>
      • Brand: ${o} tokens (Light) + ${o} tokens (Dark) = ${o*2} tokens total<br>
      • Chart: ${n} tokens<br>
      <strong>Total: ${c*2+o*2+n} tokens</strong>
    `,l.appendChild(t);const d=document.createElement("div");d.style.marginBottom="40px";const r=document.createElement("h3");r.textContent="Feedback",r.style.fontSize="20px",r.style.fontWeight="600",r.style.marginBottom="16px",r.style.paddingBottom="8px",r.style.borderBottom="2px solid #e5e7eb",d.appendChild(r);const s=document.createElement("div");s.style.marginBottom="24px";const w=document.createElement("h4");w.textContent=`Accent (${e.feedback.accent.light.length} tokens Light + ${e.feedback.accent.dark.length} tokens Dark)`,w.style.fontSize="18px",w.style.fontWeight="600",w.style.marginBottom="12px",s.appendChild(w);const g=document.createElement("div");g.style.display="grid",g.style.gridTemplateColumns="1fr 1fr",g.style.gap="16px";const u=document.createElement("div");u.style.background="#ffffff",u.style.border="1px solid #e5e7eb",u.style.borderRadius="10px",u.style.padding="16px";const T=document.createElement("h5");T.textContent="Light Mode",T.style.fontSize="14px",T.style.fontWeight="600",T.style.marginBottom="12px",u.appendChild(T),e.feedback.accent.light.forEach(a=>{u.appendChild(p(a,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),g.appendChild(u);const f=document.createElement("div");f.style.background="#0E1825",f.style.color="#edeeef",f.style.border="1px solid #0E1825",f.style.borderRadius="10px",f.style.padding="16px";const m=document.createElement("h5");m.textContent="Dark Mode",m.style.fontSize="14px",m.style.fontWeight="600",m.style.marginBottom="12px",m.style.color="#edeeef",f.appendChild(m),e.feedback.accent.dark.forEach(a=>{f.appendChild(p(a,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),g.appendChild(f),s.appendChild(g),d.appendChild(s);const D=document.createElement("div");D.style.marginBottom="24px";const B=document.createElement("h4");B.textContent=`Border (${e.feedback.border.light.length} tokens Light + ${e.feedback.border.dark.length} tokens Dark)`,B.style.fontSize="18px",B.style.fontWeight="600",B.style.marginBottom="12px",D.appendChild(B);const k=document.createElement("div");k.style.display="grid",k.style.gridTemplateColumns="1fr 1fr",k.style.gap="16px";const C=document.createElement("div");C.style.background="#ffffff",C.style.border="1px solid #e5e7eb",C.style.borderRadius="10px",C.style.padding="16px";const E=document.createElement("h5");E.textContent="Light Mode",E.style.fontSize="14px",E.style.fontWeight="600",E.style.marginBottom="12px",C.appendChild(E),e.feedback.border.light.forEach(a=>{C.appendChild(p(a,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),k.appendChild(C);const y=document.createElement("div");y.style.background="#0E1825",y.style.color="#edeeef",y.style.border="1px solid #0E1825",y.style.borderRadius="10px",y.style.padding="16px";const b=document.createElement("h5");b.textContent="Dark Mode",b.style.fontSize="14px",b.style.fontWeight="600",b.style.marginBottom="12px",b.style.color="#edeeef",y.appendChild(b),e.feedback.border.dark.forEach(a=>{y.appendChild(p(a,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),k.appendChild(y),D.appendChild(k),d.appendChild(D);const L=document.createElement("div");L.style.marginBottom="24px";const h=document.createElement("h4");h.textContent=`Chart (${e.feedback.chart.light.length} tokens Light + ${e.feedback.chart.dark.length} tokens Dark)`,h.style.fontSize="18px",h.style.fontWeight="600",h.style.marginBottom="12px",L.appendChild(h);const V=document.createElement("div");V.style.display="grid",V.style.gridTemplateColumns="1fr 1fr",V.style.gap="16px";const v=document.createElement("div");v.style.background="#ffffff",v.style.border="1px solid #e5e7eb",v.style.borderRadius="10px",v.style.padding="16px";const R=document.createElement("h5");R.textContent="Light Mode",R.style.fontSize="14px",R.style.fontWeight="600",R.style.marginBottom="12px",v.appendChild(R),e.feedback.chart.light.forEach(a=>{v.appendChild(p(a,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),V.appendChild(v);const z=document.createElement("div");z.style.background="#0E1825",z.style.color="#edeeef",z.style.border="1px solid #0E1825",z.style.borderRadius="10px",z.style.padding="16px";const $=document.createElement("h5");$.textContent="Dark Mode",$.style.fontSize="14px",$.style.fontWeight="600",$.style.marginBottom="12px",$.style.color="#edeeef",z.appendChild($),e.feedback.chart.dark.forEach(a=>{z.appendChild(p(a,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),V.appendChild(z),L.appendChild(V),d.appendChild(L),l.appendChild(d);const j=document.createElement("div");j.style.marginBottom="40px";const F=document.createElement("h3");F.textContent=`Brand (${e.brand.light.length} tokens Light + ${e.brand.dark.length} tokens Dark)`,F.style.fontSize="20px",F.style.fontWeight="600",F.style.marginBottom="16px",F.style.paddingBottom="8px",F.style.borderBottom="2px solid #e5e7eb",j.appendChild(F);const O=document.createElement("div");O.style.display="grid",O.style.gridTemplateColumns="1fr 1fr",O.style.gap="16px";const M=document.createElement("div");M.style.background="#ffffff",M.style.border="1px solid #e5e7eb",M.style.borderRadius="10px",M.style.padding="16px";const I=document.createElement("h5");I.textContent="Light Mode",I.style.fontSize="14px",I.style.fontWeight="600",I.style.marginBottom="12px",M.appendChild(I),e.brand.light.forEach(a=>{M.appendChild(p(a,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),O.appendChild(M);const N=document.createElement("div");N.style.background="#0E1825",N.style.color="#edeeef",N.style.border="1px solid #0E1825",N.style.borderRadius="10px",N.style.padding="16px";const A=document.createElement("h5");A.textContent="Dark Mode",A.style.fontSize="14px",A.style.fontWeight="600",A.style.marginBottom="12px",A.style.color="#edeeef",N.appendChild(A),e.brand.dark.forEach(a=>{N.appendChild(p(a,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),O.appendChild(N),j.appendChild(O),l.appendChild(j);const H=document.createElement("div");H.style.marginBottom="40px";const W=document.createElement("h3");W.textContent=`Chart (${e.chart.length} tokens)`,W.style.fontSize="20px",W.style.fontWeight="600",W.style.marginBottom="16px",W.style.paddingBottom="8px",W.style.borderBottom="2px solid #e5e7eb",H.appendChild(W);const S={Foreground:[],Blue:[],Gray:[],Yellow:[],Green:[],Teal:[],Purple:[],Pink:[],Rose:[],"Neutral Blue":[],Otros:[]};return e.chart.forEach(a=>{const x=a.toLowerCase();x.includes("fg")?S.Foreground.push(a):x.includes("neutral-blue")?S["Neutral Blue"].push(a):x.includes("blue")?S.Blue.push(a):x.includes("gray")?S.Gray.push(a):x.includes("yellow")?S.Yellow.push(a):x.includes("green")?S.Green.push(a):x.includes("teal")?S.Teal.push(a):x.includes("purple")?S.Purple.push(a):x.includes("pink")?S.Pink.push(a):x.includes("rose")?S.Rose.push(a):S.Otros.push(a)}),Object.entries(S).forEach(([a,x])=>{if(x.length===0)return;const U=document.createElement("div");U.style.marginBottom="24px";const _=document.createElement("h4");_.textContent=`${a} (${x.length} tokens)`,_.style.fontSize="18px",_.style.fontWeight="600",_.style.marginBottom="12px",U.appendChild(_);const J=q(x,a);U.appendChild(J),H.appendChild(U)}),l.appendChild(H),l}},G={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const i=document.createElement("h2");i.textContent="Feedback Colors",i.style.fontSize="24px",i.style.fontWeight="700",i.style.marginBottom="16px",l.appendChild(i);const c=document.createElement("div");c.style.marginBottom="32px";const o=document.createElement("h3");o.textContent=`Accent (${e.feedback.accent.light.length} tokens Light + ${e.feedback.accent.dark.length} tokens Dark)`,o.style.fontSize="20px",o.style.fontWeight="600",o.style.marginBottom="16px",o.style.paddingBottom="8px",o.style.borderBottom="2px solid #e5e7eb",c.appendChild(o);const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="1fr 1fr",n.style.gap="16px";const t=document.createElement("div");t.style.background="#ffffff",t.style.border="1px solid #e5e7eb",t.style.borderRadius="10px",t.style.padding="16px";const d=document.createElement("h4");d.textContent="Light Mode",d.style.fontSize="16px",d.style.fontWeight="600",d.style.marginBottom="12px",t.appendChild(d),e.feedback.accent.light.forEach(h=>{t.appendChild(p(h,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),n.appendChild(t);const r=document.createElement("div");r.style.background="#0E1825",r.style.color="#edeeef",r.style.border="1px solid #0E1825",r.style.borderRadius="10px",r.style.padding="16px";const s=document.createElement("h4");s.textContent="Dark Mode",s.style.fontSize="16px",s.style.fontWeight="600",s.style.marginBottom="12px",s.style.color="#edeeef",r.appendChild(s),e.feedback.accent.dark.forEach(h=>{r.appendChild(p(h,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),n.appendChild(r),c.appendChild(n),l.appendChild(c);const w=document.createElement("div");w.style.marginBottom="32px";const g=document.createElement("h3");g.textContent=`Border (${e.feedback.border.light.length} tokens Light + ${e.feedback.border.dark.length} tokens Dark)`,g.style.fontSize="20px",g.style.fontWeight="600",g.style.marginBottom="16px",g.style.paddingBottom="8px",g.style.borderBottom="2px solid #e5e7eb",w.appendChild(g);const u=document.createElement("div");u.style.display="grid",u.style.gridTemplateColumns="1fr 1fr",u.style.gap="16px";const T=document.createElement("div");T.style.background="#ffffff",T.style.border="1px solid #e5e7eb",T.style.borderRadius="10px",T.style.padding="16px";const f=document.createElement("h4");f.textContent="Light Mode",f.style.fontSize="16px",f.style.fontWeight="600",f.style.marginBottom="12px",T.appendChild(f),e.feedback.border.light.forEach(h=>{T.appendChild(p(h,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),u.appendChild(T);const m=document.createElement("div");m.style.background="#0E1825",m.style.color="#edeeef",m.style.border="1px solid #0E1825",m.style.borderRadius="10px",m.style.padding="16px";const D=document.createElement("h4");D.textContent="Dark Mode",D.style.fontSize="16px",D.style.fontWeight="600",D.style.marginBottom="12px",D.style.color="#edeeef",m.appendChild(D),e.feedback.border.dark.forEach(h=>{m.appendChild(p(h,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),u.appendChild(m),w.appendChild(u),l.appendChild(w);const B=document.createElement("div");B.style.marginBottom="32px";const k=document.createElement("h3");k.textContent=`Chart (${e.feedback.chart.light.length} tokens Light + ${e.feedback.chart.dark.length} tokens Dark)`,k.style.fontSize="20px",k.style.fontWeight="600",k.style.marginBottom="16px",k.style.paddingBottom="8px",k.style.borderBottom="2px solid #e5e7eb",B.appendChild(k);const C=document.createElement("div");C.style.display="grid",C.style.gridTemplateColumns="1fr 1fr",C.style.gap="16px";const E=document.createElement("div");E.style.background="#ffffff",E.style.border="1px solid #e5e7eb",E.style.borderRadius="10px",E.style.padding="16px";const y=document.createElement("h4");y.textContent="Light Mode",y.style.fontSize="16px",y.style.fontWeight="600",y.style.marginBottom="12px",E.appendChild(y),e.feedback.chart.light.forEach(h=>{E.appendChild(p(h,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),C.appendChild(E);const b=document.createElement("div");b.style.background="#0E1825",b.style.color="#edeeef",b.style.border="1px solid #0E1825",b.style.borderRadius="10px",b.style.padding="16px";const L=document.createElement("h4");return L.textContent="Dark Mode",L.style.fontSize="16px",L.style.fontWeight="600",L.style.marginBottom="12px",L.style.color="#edeeef",b.appendChild(L),e.feedback.chart.dark.forEach(h=>{b.appendChild(p(h,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),C.appendChild(b),B.appendChild(C),l.appendChild(B),l}},P={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const i=document.createElement("h2");i.textContent="Brand Colors",i.style.fontSize="24px",i.style.fontWeight="700",i.style.marginBottom="16px",l.appendChild(i);const c=document.createElement("div");c.style.marginBottom="16px",c.style.fontSize="16px",c.style.fontWeight="600",c.textContent=`Total: ${e.brand.light.length} tokens Light + ${e.brand.dark.length} tokens Dark`,l.appendChild(c);const o=document.createElement("div");o.style.display="grid",o.style.gridTemplateColumns="1fr 1fr",o.style.gap="16px";const n=document.createElement("div");n.style.background="#ffffff",n.style.border="1px solid #e5e7eb",n.style.borderRadius="10px",n.style.padding="16px";const t=document.createElement("h5");t.textContent="Light Mode",t.style.fontSize="14px",t.style.fontWeight="600",t.style.marginBottom="12px",n.appendChild(t),e.brand.light.forEach(s=>{n.appendChild(p(s,"light",{showVariable:!0,showValue:!0,width:"100%"}))}),o.appendChild(n);const d=document.createElement("div");d.style.background="#0E1825",d.style.color="#edeeef",d.style.border="1px solid #0E1825",d.style.borderRadius="10px",d.style.padding="16px";const r=document.createElement("h5");return r.textContent="Dark Mode",r.style.fontSize="14px",r.style.fontWeight="600",r.style.marginBottom="12px",r.style.color="#edeeef",d.appendChild(r),e.brand.dark.forEach(s=>{d.appendChild(p(s,"dark",{showVariable:!0,showValue:!0,width:"100%"}))}),o.appendChild(d),l.appendChild(o),l}},Y={render:()=>{const l=document.createElement("div");l.style.padding="24px",l.style.maxWidth="1400px";const i=document.createElement("h2");i.textContent="Chart Colors",i.style.fontSize="24px",i.style.fontWeight="700",i.style.marginBottom="16px",l.appendChild(i);const c=document.createElement("div");c.style.marginBottom="16px",c.style.fontSize="16px",c.style.fontWeight="600",c.textContent=`Total: ${e.chart.length} tokens`,l.appendChild(c);const o={Foreground:[],Blue:[],Gray:[],Yellow:[],Green:[],Teal:[],Purple:[],Pink:[],Rose:[],"Neutral Blue":[],Otros:[]};return e.chart.forEach(n=>{const t=n.toLowerCase();t.includes("fg")?o.Foreground.push(n):t.includes("neutral-blue")?o["Neutral Blue"].push(n):t.includes("blue")?o.Blue.push(n):t.includes("gray")?o.Gray.push(n):t.includes("yellow")?o.Yellow.push(n):t.includes("green")?o.Green.push(n):t.includes("teal")?o.Teal.push(n):t.includes("purple")?o.Purple.push(n):t.includes("pink")?o.Pink.push(n):t.includes("rose")?o.Rose.push(n):o.Otros.push(n)}),Object.entries(o).forEach(([n,t])=>{if(t.length===0)return;const d=document.createElement("div");d.style.marginBottom="32px";const r=document.createElement("h3");r.textContent=`${n} (${t.length} tokens)`,r.style.fontSize="20px",r.style.fontWeight="600",r.style.marginBottom="16px",r.style.paddingBottom="8px",r.style.borderBottom="2px solid #e5e7eb",d.appendChild(r);const s=q(t,n);d.appendChild(s),l.appendChild(d)}),l}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Semánticos - Todos los Tokens';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const feedbackCount = SEMANTIC_TOKENS.feedback.accent.light.length + SEMANTIC_TOKENS.feedback.border.light.length + SEMANTIC_TOKENS.feedback.chart.light.length;
    const brandCount = SEMANTIC_TOKENS.brand.light.length;
    const chartCount = SEMANTIC_TOKENS.chart.length;
    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#f3f4f6';
    summary.style.border = '1px solid #d1d5db';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    summary.innerHTML = \`
      <strong>Resumen:</strong><br>
      • Feedback: \${feedbackCount} tokens (Light) + \${feedbackCount} tokens (Dark) = \${feedbackCount * 2} tokens total<br>
      • Brand: \${brandCount} tokens (Light) + \${brandCount} tokens (Dark) = \${brandCount * 2} tokens total<br>
      • Chart: \${chartCount} tokens<br>
      <strong>Total: \${feedbackCount * 2 + brandCount * 2 + chartCount} tokens</strong>
    \`;
    container.appendChild(summary);

    // Sección Feedback
    const feedbackSection = document.createElement('div');
    feedbackSection.style.marginBottom = '40px';
    const feedbackTitle = document.createElement('h3');
    feedbackTitle.textContent = 'Feedback';
    feedbackTitle.style.fontSize = '20px';
    feedbackTitle.style.fontWeight = '600';
    feedbackTitle.style.marginBottom = '16px';
    feedbackTitle.style.paddingBottom = '8px';
    feedbackTitle.style.borderBottom = '2px solid #e5e7eb';
    feedbackSection.appendChild(feedbackTitle);

    // Feedback Accent
    const accentSection = document.createElement('div');
    accentSection.style.marginBottom = '24px';
    const accentTitle = document.createElement('h4');
    accentTitle.textContent = \`Accent (\${SEMANTIC_TOKENS.feedback.accent.light.length} tokens Light + \${SEMANTIC_TOKENS.feedback.accent.dark.length} tokens Dark)\`;
    accentTitle.style.fontSize = '18px';
    accentTitle.style.fontWeight = '600';
    accentTitle.style.marginBottom = '12px';
    accentSection.appendChild(accentTitle);
    const accentComparison = document.createElement('div');
    accentComparison.style.display = 'grid';
    accentComparison.style.gridTemplateColumns = '1fr 1fr';
    accentComparison.style.gap = '16px';
    const accentLightCol = document.createElement('div');
    accentLightCol.style.background = '#ffffff';
    accentLightCol.style.border = '1px solid #e5e7eb';
    accentLightCol.style.borderRadius = '10px';
    accentLightCol.style.padding = '16px';
    const accentLightTitle = document.createElement('h5');
    accentLightTitle.textContent = 'Light Mode';
    accentLightTitle.style.fontSize = '14px';
    accentLightTitle.style.fontWeight = '600';
    accentLightTitle.style.marginBottom = '12px';
    accentLightCol.appendChild(accentLightTitle);
    SEMANTIC_TOKENS.feedback.accent.light.forEach(token => {
      accentLightCol.appendChild(createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    accentComparison.appendChild(accentLightCol);
    const accentDarkCol = document.createElement('div');
    accentDarkCol.style.background = '#0E1825';
    accentDarkCol.style.color = '#edeeef';
    accentDarkCol.style.border = '1px solid #0E1825';
    accentDarkCol.style.borderRadius = '10px';
    accentDarkCol.style.padding = '16px';
    const accentDarkTitle = document.createElement('h5');
    accentDarkTitle.textContent = 'Dark Mode';
    accentDarkTitle.style.fontSize = '14px';
    accentDarkTitle.style.fontWeight = '600';
    accentDarkTitle.style.marginBottom = '12px';
    accentDarkTitle.style.color = '#edeeef';
    accentDarkCol.appendChild(accentDarkTitle);
    SEMANTIC_TOKENS.feedback.accent.dark.forEach(token => {
      accentDarkCol.appendChild(createColorSwatch(token, 'dark', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    accentComparison.appendChild(accentDarkCol);
    accentSection.appendChild(accentComparison);
    feedbackSection.appendChild(accentSection);

    // Feedback Border
    const borderSection = document.createElement('div');
    borderSection.style.marginBottom = '24px';
    const borderTitle = document.createElement('h4');
    borderTitle.textContent = \`Border (\${SEMANTIC_TOKENS.feedback.border.light.length} tokens Light + \${SEMANTIC_TOKENS.feedback.border.dark.length} tokens Dark)\`;
    borderTitle.style.fontSize = '18px';
    borderTitle.style.fontWeight = '600';
    borderTitle.style.marginBottom = '12px';
    borderSection.appendChild(borderTitle);
    const borderComparison = document.createElement('div');
    borderComparison.style.display = 'grid';
    borderComparison.style.gridTemplateColumns = '1fr 1fr';
    borderComparison.style.gap = '16px';
    const borderLightCol = document.createElement('div');
    borderLightCol.style.background = '#ffffff';
    borderLightCol.style.border = '1px solid #e5e7eb';
    borderLightCol.style.borderRadius = '10px';
    borderLightCol.style.padding = '16px';
    const borderLightTitle = document.createElement('h5');
    borderLightTitle.textContent = 'Light Mode';
    borderLightTitle.style.fontSize = '14px';
    borderLightTitle.style.fontWeight = '600';
    borderLightTitle.style.marginBottom = '12px';
    borderLightCol.appendChild(borderLightTitle);
    SEMANTIC_TOKENS.feedback.border.light.forEach(token => {
      borderLightCol.appendChild(createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    borderComparison.appendChild(borderLightCol);
    const borderDarkCol = document.createElement('div');
    borderDarkCol.style.background = '#0E1825';
    borderDarkCol.style.color = '#edeeef';
    borderDarkCol.style.border = '1px solid #0E1825';
    borderDarkCol.style.borderRadius = '10px';
    borderDarkCol.style.padding = '16px';
    const borderDarkTitle = document.createElement('h5');
    borderDarkTitle.textContent = 'Dark Mode';
    borderDarkTitle.style.fontSize = '14px';
    borderDarkTitle.style.fontWeight = '600';
    borderDarkTitle.style.marginBottom = '12px';
    borderDarkTitle.style.color = '#edeeef';
    borderDarkCol.appendChild(borderDarkTitle);
    SEMANTIC_TOKENS.feedback.border.dark.forEach(token => {
      borderDarkCol.appendChild(createColorSwatch(token, 'dark', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    borderComparison.appendChild(borderDarkCol);
    borderSection.appendChild(borderComparison);
    feedbackSection.appendChild(borderSection);

    // Feedback Chart
    const chartFeedbackSection = document.createElement('div');
    chartFeedbackSection.style.marginBottom = '24px';
    const chartFeedbackTitle = document.createElement('h4');
    chartFeedbackTitle.textContent = \`Chart (\${SEMANTIC_TOKENS.feedback.chart.light.length} tokens Light + \${SEMANTIC_TOKENS.feedback.chart.dark.length} tokens Dark)\`;
    chartFeedbackTitle.style.fontSize = '18px';
    chartFeedbackTitle.style.fontWeight = '600';
    chartFeedbackTitle.style.marginBottom = '12px';
    chartFeedbackSection.appendChild(chartFeedbackTitle);
    const chartFeedbackComparison = document.createElement('div');
    chartFeedbackComparison.style.display = 'grid';
    chartFeedbackComparison.style.gridTemplateColumns = '1fr 1fr';
    chartFeedbackComparison.style.gap = '16px';
    const chartFeedbackLightCol = document.createElement('div');
    chartFeedbackLightCol.style.background = '#ffffff';
    chartFeedbackLightCol.style.border = '1px solid #e5e7eb';
    chartFeedbackLightCol.style.borderRadius = '10px';
    chartFeedbackLightCol.style.padding = '16px';
    const chartFeedbackLightTitle = document.createElement('h5');
    chartFeedbackLightTitle.textContent = 'Light Mode';
    chartFeedbackLightTitle.style.fontSize = '14px';
    chartFeedbackLightTitle.style.fontWeight = '600';
    chartFeedbackLightTitle.style.marginBottom = '12px';
    chartFeedbackLightCol.appendChild(chartFeedbackLightTitle);
    SEMANTIC_TOKENS.feedback.chart.light.forEach(token => {
      chartFeedbackLightCol.appendChild(createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    chartFeedbackComparison.appendChild(chartFeedbackLightCol);
    const chartFeedbackDarkCol = document.createElement('div');
    chartFeedbackDarkCol.style.background = '#0E1825';
    chartFeedbackDarkCol.style.color = '#edeeef';
    chartFeedbackDarkCol.style.border = '1px solid #0E1825';
    chartFeedbackDarkCol.style.borderRadius = '10px';
    chartFeedbackDarkCol.style.padding = '16px';
    const chartFeedbackDarkTitle = document.createElement('h5');
    chartFeedbackDarkTitle.textContent = 'Dark Mode';
    chartFeedbackDarkTitle.style.fontSize = '14px';
    chartFeedbackDarkTitle.style.fontWeight = '600';
    chartFeedbackDarkTitle.style.marginBottom = '12px';
    chartFeedbackDarkTitle.style.color = '#edeeef';
    chartFeedbackDarkCol.appendChild(chartFeedbackDarkTitle);
    SEMANTIC_TOKENS.feedback.chart.dark.forEach(token => {
      chartFeedbackDarkCol.appendChild(createColorSwatch(token, 'dark', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    chartFeedbackComparison.appendChild(chartFeedbackDarkCol);
    chartFeedbackSection.appendChild(chartFeedbackComparison);
    feedbackSection.appendChild(chartFeedbackSection);
    container.appendChild(feedbackSection);

    // Sección Brand
    const brandSection = document.createElement('div');
    brandSection.style.marginBottom = '40px';
    const brandTitle = document.createElement('h3');
    brandTitle.textContent = \`Brand (\${SEMANTIC_TOKENS.brand.light.length} tokens Light + \${SEMANTIC_TOKENS.brand.dark.length} tokens Dark)\`;
    brandTitle.style.fontSize = '20px';
    brandTitle.style.fontWeight = '600';
    brandTitle.style.marginBottom = '16px';
    brandTitle.style.paddingBottom = '8px';
    brandTitle.style.borderBottom = '2px solid #e5e7eb';
    brandSection.appendChild(brandTitle);
    const brandComparison = document.createElement('div');
    brandComparison.style.display = 'grid';
    brandComparison.style.gridTemplateColumns = '1fr 1fr';
    brandComparison.style.gap = '16px';
    const brandLightCol = document.createElement('div');
    brandLightCol.style.background = '#ffffff';
    brandLightCol.style.border = '1px solid #e5e7eb';
    brandLightCol.style.borderRadius = '10px';
    brandLightCol.style.padding = '16px';
    const brandLightTitle = document.createElement('h5');
    brandLightTitle.textContent = 'Light Mode';
    brandLightTitle.style.fontSize = '14px';
    brandLightTitle.style.fontWeight = '600';
    brandLightTitle.style.marginBottom = '12px';
    brandLightCol.appendChild(brandLightTitle);
    SEMANTIC_TOKENS.brand.light.forEach(token => {
      brandLightCol.appendChild(createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    brandComparison.appendChild(brandLightCol);
    const brandDarkCol = document.createElement('div');
    brandDarkCol.style.background = '#0E1825';
    brandDarkCol.style.color = '#edeeef';
    brandDarkCol.style.border = '1px solid #0E1825';
    brandDarkCol.style.borderRadius = '10px';
    brandDarkCol.style.padding = '16px';
    const brandDarkTitle = document.createElement('h5');
    brandDarkTitle.textContent = 'Dark Mode';
    brandDarkTitle.style.fontSize = '14px';
    brandDarkTitle.style.fontWeight = '600';
    brandDarkTitle.style.marginBottom = '12px';
    brandDarkTitle.style.color = '#edeeef';
    brandDarkCol.appendChild(brandDarkTitle);
    SEMANTIC_TOKENS.brand.dark.forEach(token => {
      brandDarkCol.appendChild(createColorSwatch(token, 'dark', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    brandComparison.appendChild(brandDarkCol);
    brandSection.appendChild(brandComparison);
    container.appendChild(brandSection);

    // Sección Chart
    const chartSection = document.createElement('div');
    chartSection.style.marginBottom = '40px';
    const chartTitle = document.createElement('h3');
    chartTitle.textContent = \`Chart (\${SEMANTIC_TOKENS.chart.length} tokens)\`;
    chartTitle.style.fontSize = '20px';
    chartTitle.style.fontWeight = '600';
    chartTitle.style.marginBottom = '16px';
    chartTitle.style.paddingBottom = '8px';
    chartTitle.style.borderBottom = '2px solid #e5e7eb';
    chartSection.appendChild(chartTitle);

    // Organizar Chart por tipo
    const organized: Record<string, string[]> = {
      'Foreground': [],
      'Blue': [],
      'Gray': [],
      'Yellow': [],
      'Green': [],
      'Teal': [],
      'Purple': [],
      'Pink': [],
      'Rose': [],
      'Neutral Blue': [],
      'Otros': []
    };
    SEMANTIC_TOKENS.chart.forEach(token => {
      const lower = token.toLowerCase();
      if (lower.includes('fg')) {
        organized['Foreground'].push(token);
      } else if (lower.includes('neutral-blue')) {
        organized['Neutral Blue'].push(token);
      } else if (lower.includes('blue')) {
        organized['Blue'].push(token);
      } else if (lower.includes('gray')) {
        organized['Gray'].push(token);
      } else if (lower.includes('yellow')) {
        organized['Yellow'].push(token);
      } else if (lower.includes('green')) {
        organized['Green'].push(token);
      } else if (lower.includes('teal')) {
        organized['Teal'].push(token);
      } else if (lower.includes('purple')) {
        organized['Purple'].push(token);
      } else if (lower.includes('pink')) {
        organized['Pink'].push(token);
      } else if (lower.includes('rose')) {
        organized['Rose'].push(token);
      } else {
        organized['Otros'].push(token);
      }
    });
    Object.entries(organized).forEach(([categoryName, categoryTokens]) => {
      if (categoryTokens.length === 0) return;
      const section = document.createElement('div');
      section.style.marginBottom = '24px';
      const sectionTitle = document.createElement('h4');
      sectionTitle.textContent = \`\${categoryName} (\${categoryTokens.length} tokens)\`;
      sectionTitle.style.fontSize = '18px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '12px';
      section.appendChild(sectionTitle);
      const comparison = createLightDarkComparison(categoryTokens, categoryName);
      section.appendChild(comparison);
      chartSection.appendChild(section);
    });
    container.appendChild(chartSection);
    return container;
  }
}`,...K.parameters?.docs?.source},description:{story:"Story principal que muestra todos los semánticos",...K.parameters?.docs?.description}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Feedback Colors';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    // Accent
    const accentSection = document.createElement('div');
    accentSection.style.marginBottom = '32px';
    const accentTitle = document.createElement('h3');
    accentTitle.textContent = \`Accent (\${SEMANTIC_TOKENS.feedback.accent.light.length} tokens Light + \${SEMANTIC_TOKENS.feedback.accent.dark.length} tokens Dark)\`;
    accentTitle.style.fontSize = '20px';
    accentTitle.style.fontWeight = '600';
    accentTitle.style.marginBottom = '16px';
    accentTitle.style.paddingBottom = '8px';
    accentTitle.style.borderBottom = '2px solid #e5e7eb';
    accentSection.appendChild(accentTitle);

    // Crear comparación manual con tokens light y dark correctos
    const accentComparison = document.createElement('div');
    accentComparison.style.display = 'grid';
    accentComparison.style.gridTemplateColumns = '1fr 1fr';
    accentComparison.style.gap = '16px';
    const accentLightCol = document.createElement('div');
    accentLightCol.style.background = '#ffffff';
    accentLightCol.style.border = '1px solid #e5e7eb';
    accentLightCol.style.borderRadius = '10px';
    accentLightCol.style.padding = '16px';
    const accentLightTitle = document.createElement('h4');
    accentLightTitle.textContent = 'Light Mode';
    accentLightTitle.style.fontSize = '16px';
    accentLightTitle.style.fontWeight = '600';
    accentLightTitle.style.marginBottom = '12px';
    accentLightCol.appendChild(accentLightTitle);
    SEMANTIC_TOKENS.feedback.accent.light.forEach(token => {
      accentLightCol.appendChild(createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    accentComparison.appendChild(accentLightCol);
    const accentDarkCol = document.createElement('div');
    accentDarkCol.style.background = '#0E1825';
    accentDarkCol.style.color = '#edeeef';
    accentDarkCol.style.border = '1px solid #0E1825';
    accentDarkCol.style.borderRadius = '10px';
    accentDarkCol.style.padding = '16px';
    const accentDarkTitle = document.createElement('h4');
    accentDarkTitle.textContent = 'Dark Mode';
    accentDarkTitle.style.fontSize = '16px';
    accentDarkTitle.style.fontWeight = '600';
    accentDarkTitle.style.marginBottom = '12px';
    accentDarkTitle.style.color = '#edeeef';
    accentDarkCol.appendChild(accentDarkTitle);
    SEMANTIC_TOKENS.feedback.accent.dark.forEach(token => {
      accentDarkCol.appendChild(createColorSwatch(token, 'dark', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    accentComparison.appendChild(accentDarkCol);
    accentSection.appendChild(accentComparison);
    container.appendChild(accentSection);

    // Border
    const borderSection = document.createElement('div');
    borderSection.style.marginBottom = '32px';
    const borderTitle = document.createElement('h3');
    borderTitle.textContent = \`Border (\${SEMANTIC_TOKENS.feedback.border.light.length} tokens Light + \${SEMANTIC_TOKENS.feedback.border.dark.length} tokens Dark)\`;
    borderTitle.style.fontSize = '20px';
    borderTitle.style.fontWeight = '600';
    borderTitle.style.marginBottom = '16px';
    borderTitle.style.paddingBottom = '8px';
    borderTitle.style.borderBottom = '2px solid #e5e7eb';
    borderSection.appendChild(borderTitle);
    const borderComparison = document.createElement('div');
    borderComparison.style.display = 'grid';
    borderComparison.style.gridTemplateColumns = '1fr 1fr';
    borderComparison.style.gap = '16px';
    const borderLightCol = document.createElement('div');
    borderLightCol.style.background = '#ffffff';
    borderLightCol.style.border = '1px solid #e5e7eb';
    borderLightCol.style.borderRadius = '10px';
    borderLightCol.style.padding = '16px';
    const borderLightTitle = document.createElement('h4');
    borderLightTitle.textContent = 'Light Mode';
    borderLightTitle.style.fontSize = '16px';
    borderLightTitle.style.fontWeight = '600';
    borderLightTitle.style.marginBottom = '12px';
    borderLightCol.appendChild(borderLightTitle);
    SEMANTIC_TOKENS.feedback.border.light.forEach(token => {
      borderLightCol.appendChild(createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    borderComparison.appendChild(borderLightCol);
    const borderDarkCol = document.createElement('div');
    borderDarkCol.style.background = '#0E1825';
    borderDarkCol.style.color = '#edeeef';
    borderDarkCol.style.border = '1px solid #0E1825';
    borderDarkCol.style.borderRadius = '10px';
    borderDarkCol.style.padding = '16px';
    const borderDarkTitle = document.createElement('h4');
    borderDarkTitle.textContent = 'Dark Mode';
    borderDarkTitle.style.fontSize = '16px';
    borderDarkTitle.style.fontWeight = '600';
    borderDarkTitle.style.marginBottom = '12px';
    borderDarkTitle.style.color = '#edeeef';
    borderDarkCol.appendChild(borderDarkTitle);
    SEMANTIC_TOKENS.feedback.border.dark.forEach(token => {
      borderDarkCol.appendChild(createColorSwatch(token, 'dark', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    borderComparison.appendChild(borderDarkCol);
    borderSection.appendChild(borderComparison);
    container.appendChild(borderSection);

    // Chart
    const chartSection = document.createElement('div');
    chartSection.style.marginBottom = '32px';
    const chartTitle = document.createElement('h3');
    chartTitle.textContent = \`Chart (\${SEMANTIC_TOKENS.feedback.chart.light.length} tokens Light + \${SEMANTIC_TOKENS.feedback.chart.dark.length} tokens Dark)\`;
    chartTitle.style.fontSize = '20px';
    chartTitle.style.fontWeight = '600';
    chartTitle.style.marginBottom = '16px';
    chartTitle.style.paddingBottom = '8px';
    chartTitle.style.borderBottom = '2px solid #e5e7eb';
    chartSection.appendChild(chartTitle);
    const chartComparison = document.createElement('div');
    chartComparison.style.display = 'grid';
    chartComparison.style.gridTemplateColumns = '1fr 1fr';
    chartComparison.style.gap = '16px';
    const chartLightCol = document.createElement('div');
    chartLightCol.style.background = '#ffffff';
    chartLightCol.style.border = '1px solid #e5e7eb';
    chartLightCol.style.borderRadius = '10px';
    chartLightCol.style.padding = '16px';
    const chartLightTitle = document.createElement('h4');
    chartLightTitle.textContent = 'Light Mode';
    chartLightTitle.style.fontSize = '16px';
    chartLightTitle.style.fontWeight = '600';
    chartLightTitle.style.marginBottom = '12px';
    chartLightCol.appendChild(chartLightTitle);
    SEMANTIC_TOKENS.feedback.chart.light.forEach(token => {
      chartLightCol.appendChild(createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    chartComparison.appendChild(chartLightCol);
    const chartDarkCol = document.createElement('div');
    chartDarkCol.style.background = '#0E1825';
    chartDarkCol.style.color = '#edeeef';
    chartDarkCol.style.border = '1px solid #0E1825';
    chartDarkCol.style.borderRadius = '10px';
    chartDarkCol.style.padding = '16px';
    const chartDarkTitle = document.createElement('h4');
    chartDarkTitle.textContent = 'Dark Mode';
    chartDarkTitle.style.fontSize = '16px';
    chartDarkTitle.style.fontWeight = '600';
    chartDarkTitle.style.marginBottom = '12px';
    chartDarkTitle.style.color = '#edeeef';
    chartDarkCol.appendChild(chartDarkTitle);
    SEMANTIC_TOKENS.feedback.chart.dark.forEach(token => {
      chartDarkCol.appendChild(createColorSwatch(token, 'dark', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    chartComparison.appendChild(chartDarkCol);
    chartSection.appendChild(chartComparison);
    container.appendChild(chartSection);
    return container;
  }
}`,...G.parameters?.docs?.source},description:{story:"Story para Feedback",...G.parameters?.docs?.description}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Brand Colors';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const count = document.createElement('div');
    count.style.marginBottom = '16px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = \`Total: \${SEMANTIC_TOKENS.brand.light.length} tokens Light + \${SEMANTIC_TOKENS.brand.dark.length} tokens Dark\`;
    container.appendChild(count);
    const comparison = document.createElement('div');
    comparison.style.display = 'grid';
    comparison.style.gridTemplateColumns = '1fr 1fr';
    comparison.style.gap = '16px';
    const brandLightCol = document.createElement('div');
    brandLightCol.style.background = '#ffffff';
    brandLightCol.style.border = '1px solid #e5e7eb';
    brandLightCol.style.borderRadius = '10px';
    brandLightCol.style.padding = '16px';
    const brandLightTitle = document.createElement('h5');
    brandLightTitle.textContent = 'Light Mode';
    brandLightTitle.style.fontSize = '14px';
    brandLightTitle.style.fontWeight = '600';
    brandLightTitle.style.marginBottom = '12px';
    brandLightCol.appendChild(brandLightTitle);
    SEMANTIC_TOKENS.brand.light.forEach(token => {
      brandLightCol.appendChild(createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    comparison.appendChild(brandLightCol);
    const brandDarkCol = document.createElement('div');
    brandDarkCol.style.background = '#0E1825';
    brandDarkCol.style.color = '#edeeef';
    brandDarkCol.style.border = '1px solid #0E1825';
    brandDarkCol.style.borderRadius = '10px';
    brandDarkCol.style.padding = '16px';
    const brandDarkTitle = document.createElement('h5');
    brandDarkTitle.textContent = 'Dark Mode';
    brandDarkTitle.style.fontSize = '14px';
    brandDarkTitle.style.fontWeight = '600';
    brandDarkTitle.style.marginBottom = '12px';
    brandDarkTitle.style.color = '#edeeef';
    brandDarkCol.appendChild(brandDarkTitle);
    SEMANTIC_TOKENS.brand.dark.forEach(token => {
      brandDarkCol.appendChild(createColorSwatch(token, 'dark', {
        showVariable: true,
        showValue: true,
        width: '100%'
      }));
    });
    comparison.appendChild(brandDarkCol);
    container.appendChild(comparison);
    return container;
  }
}`,...P.parameters?.docs?.source},description:{story:"Story para Brand",...P.parameters?.docs?.description}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    const title = document.createElement('h2');
    title.textContent = 'Chart Colors';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    const count = document.createElement('div');
    count.style.marginBottom = '16px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = \`Total: \${SEMANTIC_TOKENS.chart.length} tokens\`;
    container.appendChild(count);

    // Organizar por tipo
    const organized: Record<string, string[]> = {
      'Foreground': [],
      'Blue': [],
      'Gray': [],
      'Yellow': [],
      'Green': [],
      'Teal': [],
      'Purple': [],
      'Pink': [],
      'Rose': [],
      'Neutral Blue': [],
      'Otros': []
    };
    SEMANTIC_TOKENS.chart.forEach(token => {
      const lower = token.toLowerCase();
      if (lower.includes('fg')) {
        organized['Foreground'].push(token);
      } else if (lower.includes('neutral-blue')) {
        organized['Neutral Blue'].push(token);
      } else if (lower.includes('blue')) {
        organized['Blue'].push(token);
      } else if (lower.includes('gray')) {
        organized['Gray'].push(token);
      } else if (lower.includes('yellow')) {
        organized['Yellow'].push(token);
      } else if (lower.includes('green')) {
        organized['Green'].push(token);
      } else if (lower.includes('teal')) {
        organized['Teal'].push(token);
      } else if (lower.includes('purple')) {
        organized['Purple'].push(token);
      } else if (lower.includes('pink')) {
        organized['Pink'].push(token);
      } else if (lower.includes('rose')) {
        organized['Rose'].push(token);
      } else {
        organized['Otros'].push(token);
      }
    });
    Object.entries(organized).forEach(([categoryName, categoryTokens]) => {
      if (categoryTokens.length === 0) return;
      const section = document.createElement('div');
      section.style.marginBottom = '32px';
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = \`\${categoryName} (\${categoryTokens.length} tokens)\`;
      sectionTitle.style.fontSize = '20px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '16px';
      sectionTitle.style.paddingBottom = '8px';
      sectionTitle.style.borderBottom = '2px solid #e5e7eb';
      section.appendChild(sectionTitle);
      const comparison = createLightDarkComparison(categoryTokens, categoryName);
      section.appendChild(comparison);
      container.appendChild(section);
    });
    return container;
  }
}`,...Y.parameters?.docs?.source},description:{story:"Story para Chart",...Y.parameters?.docs?.description}}};const Z=["TodosLosSemanticos","Feedback","Brand","Chart"];export{P as Brand,Y as Chart,G as Feedback,K as TodosLosSemanticos,Z as __namedExportsOrder,X as default};
