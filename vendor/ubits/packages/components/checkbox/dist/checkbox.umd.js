(function (c, i) {
	typeof exports == 'object' && typeof module < 'u'
		? i(exports)
		: typeof define == 'function' && define.amd
			? define(['exports'], i)
			: ((c = typeof globalThis < 'u' ? globalThis : c || self), i((c.UbitsCheckbox = {})));
})(this, function (c) {
	'use strict';
	function i(t) {
		const {
				label: u,
				complementaryText: h,
				value: a = '',
				name: e = '',
				checked: n = !1,
				indeterminate: s = !1,
				size: p = 'md',
				state: o = 'default',
				disabled: d = !1,
				className: m = '',
			} = t,
			r = d || o === 'disabled',
			l = [
				'ubits-checkbox',
				`ubits-checkbox--${p}`,
				o !== 'default' ? `ubits-checkbox--${o}` : '',
				n ? 'ubits-checkbox--checked' : '',
				s ? 'ubits-checkbox--indeterminate' : '',
				r ? 'ubits-checkbox--disabled' : '',
				m,
			]
				.filter(Boolean)
				.join(' '),
			b = `
    <input
      type="checkbox"
      id="checkbox-${e}-${a || 'default'}"
      ${e ? `name="${e}"` : ''}
      ${a ? `value="${a}"` : ''}
      ${n ? 'checked' : ''}
      ${s ? 'data-indeterminate="true"' : ''}
      ${r ? 'disabled' : ''}
      class="ubits-checkbox__input"
    />
  `,
			k = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${s ? '<span class="ubits-checkbox__indeterminate"></span>' : ''}
      ${n && !s ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
      ${!n && !s && o === 'active' ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
    </span>
  `,
			x = `
    <span class="ubits-checkbox__label">${u}</span>
  `,
			$ = h ? `<span class="ubits-checkbox__complementary-text">${h}</span>` : '',
			_ = `
    <div class="ubits-checkbox__text-content">
      ${x}
      ${$}
    </div>
  `;
		return `
    <label class="${l}">
      ${b}
      ${k}
      ${_}
    </label>
  `.trim();
	}
	function f(t) {
		const u = t.containerId ? document.getElementById(t.containerId) : document.body;
		if (!u) throw new Error(`Container with id "${t.containerId}" not found`);
		const h = i(t),
			a = document.createElement('div');
		a.innerHTML = h.trim();
		const e = a.firstElementChild;
		if (!e) throw new Error('Failed to create checkbox element');
		u.appendChild(e);
		const n = e.querySelector('.ubits-checkbox__input');
		return (
			n &&
				(t.indeterminate && (n.indeterminate = !0),
				t.onChange && n.addEventListener('change', t.onChange)),
			{
				element: e,
				destroy: () => {
					e.parentNode && e.parentNode.removeChild(e);
				},
				update: (o) => {
					const d = { ...t, ...o },
						m = i(d),
						r = document.createElement('div');
					r.innerHTML = m.trim();
					const l = r.firstElementChild;
					if (l && e.parentNode) {
						e.parentNode.replaceChild(l, e);
						const b = l.querySelector('.ubits-checkbox__input');
						b &&
							(d.indeterminate && (b.indeterminate = !0),
							d.onChange && b.addEventListener('change', d.onChange));
					}
				},
			}
		);
	}
	(c.createCheckbox = f),
		(c.renderCheckbox = i),
		Object.defineProperty(c, Symbol.toStringTag, { value: 'Module' });
});
