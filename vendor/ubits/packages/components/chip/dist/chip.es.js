function m(s = {}) {
	const {
			label: d = '',
			size: p = 'md',
			state: n = 'default',
			leftIcon: r,
			rightIcon: e,
			clickable: l = !1,
			closable: c = !1,
			className: f = '',
		} = s,
		h = [
			'ubits-chip',
			`ubits-chip--${p}`,
			n !== 'default' ? `ubits-chip--${n}` : '',
			l ? 'ubits-chip--clickable' : '',
			c ? 'ubits-chip--closable' : '',
			f,
		]
			.filter(Boolean)
			.join(' '),
		t = r
			? `<span class="ubits-chip__left-icon" aria-hidden="true"><i class="far fa-${r}"></i></span>`
			: '',
		i =
			c || e
				? `<button class="ubits-chip__right-icon" type="button" aria-label="Cerrar chip" ${n === 'disabled' ? 'disabled' : ''}>
        <i class="far fa-${e || 'xmark'}"></i>
      </button>`
				: '';
	return `
    <span class="${h}" role="${l ? 'button' : 'none'}" tabindex="${l && n !== 'disabled' ? '0' : '-1'}" aria-disabled="${n === 'disabled' ? 'true' : 'false'}">
      ${t}
      <span class="ubits-chip__label">${d}</span>
      ${i}
    </span>
  `.trim();
}
function C(s = {}) {
	const { containerId: d, onClick: p, onClose: n } = s,
		r = document.createElement('div');
	r.innerHTML = m(s);
	const e = r.firstElementChild;
	if (!e) throw new Error('No se pudo crear el chip');
	p &&
		s.state !== 'disabled' &&
		e.addEventListener('click', (t) => {
			t.preventDefault(), t.stopPropagation(), p(t);
		});
	const l = e.querySelector('.ubits-chip__right-icon');
	l &&
		n &&
		l.addEventListener('click', (t) => {
			t.preventDefault(), t.stopPropagation(), n(t);
		});
	let c;
	return (
		d ? (c = document.getElementById(d) || document.body) : (c = document.body),
		c.appendChild(e),
		{
			element: e,
			destroy: () => {
				e.parentElement && e.parentElement.removeChild(e);
			},
			update: (t) => {
				const i = { ...s, ...t },
					u = document.createElement('div');
				u.innerHTML = m(i);
				const o = u.firstElementChild;
				if (o && e.parentElement) {
					i.onClick &&
						i.state !== 'disabled' &&
						o.addEventListener('click', (a) => {
							a.preventDefault(), a.stopPropagation(), i.onClick(a);
						});
					const b = o.querySelector('.ubits-chip__right-icon');
					return (
						b &&
							i.onClose &&
							b.addEventListener('click', (a) => {
								a.preventDefault(), a.stopPropagation(), i.onClose(a);
							}),
						e.parentElement.replaceChild(o, e),
						o
					);
				}
			},
		}
	);
}
export { C as createChip, m as renderChip };
