const p={title:"Tokens/Typography/Scale",tags:["autodocs"]};function n(e,t,s,a){const o=document.createElement("div");o.className="typo-sample";const i=document.createElement("div");i.className="typo-box",i.textContent=a;const d=document.createElement("div");return d.textContent="Grumpy wizards make toxic brew for the jovial queen.",d.style.fontFamily="var(--font-sans)",d.style.fontSize=`var(${e})`,d.style.lineHeight=`var(${t})`,d.style.fontWeight=s,o.appendChild(i),o.appendChild(d),o}const l={render:()=>{const e=document.createElement("div");return e.style.display="grid",e.style.gap="10px",e.appendChild(n("--font-d1-size","--font-d1-line","700","Display D1 / Bold")),e.appendChild(n("--font-d2-size","--font-d2-line","700","Display D2 / Bold")),e.appendChild(n("--font-d3-size","--font-d3-line","600","Display D3 / Semibold")),e.appendChild(n("--font-d4-size","--font-d4-line","400","Display D4 / Regular")),e.appendChild(n("--font-h1-size","--font-h1-line","700","H1 / Bold")),e.appendChild(n("--font-h2-size","--font-h2-line","700","H2 / Bold")),e.appendChild(n("--font-body-lg-size","--font-body-lg-line","600","Body LG / Semibold")),e.appendChild(n("--font-body-md-size","--font-body-md-line","400","Body MD / Regular")),e.appendChild(n("--font-body-sm-size","--font-body-sm-line","400","Body SM / Regular")),e.appendChild(n("--font-body-xs-size","--font-body-xs-line","600","Body XS / Semibold")),e}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const c = document.createElement('div');
    c.style.display = 'grid';
    c.style.gap = '10px';
    c.appendChild(line('--font-d1-size', '--font-d1-line', '700', 'Display D1 / Bold'));
    c.appendChild(line('--font-d2-size', '--font-d2-line', '700', 'Display D2 / Bold'));
    c.appendChild(line('--font-d3-size', '--font-d3-line', '600', 'Display D3 / Semibold'));
    c.appendChild(line('--font-d4-size', '--font-d4-line', '400', 'Display D4 / Regular'));
    c.appendChild(line('--font-h1-size', '--font-h1-line', '700', 'H1 / Bold'));
    c.appendChild(line('--font-h2-size', '--font-h2-line', '700', 'H2 / Bold'));
    c.appendChild(line('--font-body-lg-size', '--font-body-lg-line', '600', 'Body LG / Semibold'));
    c.appendChild(line('--font-body-md-size', '--font-body-md-line', '400', 'Body MD / Regular'));
    c.appendChild(line('--font-body-sm-size', '--font-body-sm-line', '400', 'Body SM / Regular'));
    c.appendChild(line('--font-body-xs-size', '--font-body-xs-line', '600', 'Body XS / Semibold'));
    return c;
  }
}`,...l.parameters?.docs?.source}}};const r=["Tokens"];export{l as Tokens,r as __namedExportsOrder,p as default};
