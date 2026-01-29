function v(e) {
	const {
			title: i,
			description: n,
			imageUrl: t,
			icon: r,
			iconSize: u = 'lg',
			actionLabel: a,
			onAction: f,
			secondaryActionLabel: c,
			onSecondaryAction: S,
			variant: b = 'default',
			className: m = '',
			style: l = '',
		} = e,
		p = ['ubits-empty-state', `ubits-empty-state--${b}`, m].filter(Boolean).join(' '),
		$ = l ? ` style="${l}"` : '';
	let o = '';
	if (t)
		o = `
      <div class="ubits-empty-state__image">
        <img src="${t}" alt="${i}" />
      </div>
    `;
	else if (r) {
		const s = u ? `fa-${u}` : '';
		o = `
      <div class="ubits-empty-state__icon">
        <i class="far fa-${r} ${s}"></i>
      </div>
    `;
	}
	let d = '';
	if (a || c) {
		const s = a
				? `<button class="ubits-button ubits-button--primary ubits-button--md" data-action="primary" type="button">${a}</button>`
				: '',
			y = c
				? `<button class="ubits-button ubits-button--secondary ubits-button--md" data-action="secondary" type="button">${c}</button>`
				: '';
		(s || y) &&
			(d = `
        <div class="ubits-empty-state__actions">
          ${s}
          ${y}
        </div>
      `);
	}
	return `
    <div class="${p}"${$}>
      ${o}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${i}</h3>
        ${n ? `<p class="ubits-empty-state__description">${n}</p>` : ''}
      </div>
      ${d}
    </div>
  `.trim();
}
function A(e) {
	const i = document.createElement('div');
	i.innerHTML = v(e);
	const n = i.querySelector('.ubits-empty-state');
	if (e.onAction) {
		const t = n.querySelector('[data-action="primary"]');
		t && t.addEventListener('click', e.onAction);
	}
	if (e.onSecondaryAction) {
		const t = n.querySelector('[data-action="secondary"]');
		t && t.addEventListener('click', e.onSecondaryAction);
	}
	return n;
}
export { A as createEmptyState, v as renderEmptyState };
