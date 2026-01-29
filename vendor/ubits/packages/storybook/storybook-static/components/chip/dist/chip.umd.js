(function (a, s) {
	typeof exports == 'object' && typeof module < 'u'
		? s(exports)
		: typeof define == 'function' && define.amd
			? define(['exports'], s)
			: ((a = typeof globalThis < 'u' ? globalThis : a || self), s((a.UbitsChip = {})));
})(this, function (a) {
	'use strict';
	function s(l = {}) {
		const {
				label: u = '',
				size: f = 'md',
				state: n = 'default',
				leftIcon: p,
				rightIcon: e,
				clickable: c = !1,
				closable: r = !1,
				className: m = '',
			} = l,
			C = [
				'ubits-chip',
				`ubits-chip--${f}`,
				n !== 'default' ? `ubits-chip--${n}` : '',
				c ? 'ubits-chip--clickable' : '',
				r ? 'ubits-chip--closable' : '',
				m,
			]
				.filter(Boolean)
				.join(' '),
			t = p
				? `<span class="ubits-chip__left-icon" aria-hidden="true"><i class="far fa-${p}"></i></span>`
				: '',
			i =
				r || e
					? `<button class="ubits-chip__right-icon" type="button" aria-label="Cerrar chip" ${n === 'disabled' ? 'disabled' : ''}>
        <i class="far fa-${e || 'xmark'}"></i>
      </button>`
					: '';
		return `
    <span class="${C}" role="${c ? 'button' : 'none'}" tabindex="${c && n !== 'disabled' ? '0' : '-1'}" aria-disabled="${n === 'disabled' ? 'true' : 'false'}">
      ${t}
      <span class="ubits-chip__label">${u}</span>
      ${i}
    </span>
  `.trim();
	}
	function E(l = {}) {
		const { containerId: u, onClick: f, onClose: n } = l,
			p = document.createElement('div');
		p.innerHTML = s(l);
		const e = p.firstElementChild;
		if (!e) throw new Error('No se pudo crear el chip');
		f &&
			l.state !== 'disabled' &&
			e.addEventListener('click', (t) => {
				t.preventDefault(), t.stopPropagation(), f(t);
			});
		const c = e.querySelector('.ubits-chip__right-icon');
		c &&
			n &&
			c.addEventListener('click', (t) => {
				t.preventDefault(), t.stopPropagation(), n(t);
			});
		let r;
		return (
			u ? (r = document.getElementById(u) || document.body) : (r = document.body),
			r.appendChild(e),
			{
				element: e,
				destroy: () => {
					e.parentElement && e.parentElement.removeChild(e);
				},
				update: (t) => {
					const i = { ...l, ...t },
						b = document.createElement('div');
					b.innerHTML = s(i);
					const d = b.firstElementChild;
					if (d && e.parentElement) {
						i.onClick &&
							i.state !== 'disabled' &&
							d.addEventListener('click', (o) => {
								o.preventDefault(), o.stopPropagation(), i.onClick(o);
							});
						const h = d.querySelector('.ubits-chip__right-icon');
						return (
							h &&
								i.onClose &&
								h.addEventListener('click', (o) => {
									o.preventDefault(), o.stopPropagation(), i.onClose(o);
								}),
							e.parentElement.replaceChild(d, e),
							d
						);
					}
				},
			}
		);
	}
	(a.createChip = E),
		(a.renderChip = s),
		Object.defineProperty(a, Symbol.toStringTag, { value: 'Module' });
});
