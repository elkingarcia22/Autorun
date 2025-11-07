const d={title:"Tokens/Typography/Stacks",tags:["autodocs"]};function s(n,r){const e=document.createElement("div");e.className="typo-sample";const a=document.createElement("div");a.className="typo-box",a.textContent=n;const o=document.createElement("div");return o.textContent="The quick brown fox jumps over the lazy dog — 1234567890",Object.assign(o.style,r),e.appendChild(a),e.appendChild(o),e}const t={render:()=>{const n=document.createElement("div");return n.style.display="grid",n.style.gap="10px",n.appendChild(s("Sans · Regular 400",{fontFamily:"var(--font-sans)",fontWeight:"400"})),n.appendChild(s("Sans · Semibold 600",{fontFamily:"var(--font-sans)",fontWeight:"600"})),n.appendChild(s("Sans · Bold 700",{fontFamily:"var(--font-sans)",fontWeight:"700"})),n}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const c = document.createElement('div');
    c.style.display = 'grid';
    c.style.gap = '10px';
    c.appendChild(row('Sans · Regular 400', {
      fontFamily: 'var(--font-sans)',
      fontWeight: '400'
    }));
    c.appendChild(row('Sans · Semibold 600', {
      fontFamily: 'var(--font-sans)',
      fontWeight: '600'
    }));
    c.appendChild(row('Sans · Bold 700', {
      fontFamily: 'var(--font-sans)',
      fontWeight: '700'
    }));
    return c;
  }
}`,...t.parameters?.docs?.source}}};const i=["FamiliesAndWeights"];export{t as FamiliesAndWeights,i as __namedExportsOrder,d as default};
