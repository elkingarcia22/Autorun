function bt(t) {
	if (typeof window.renderBadge == 'function') return window.renderBadge(t);
	const { type: i, size: a, variant: r, absolute: d, position: p, className: e, content: s } = t,
		o = [
			'ubits-badge',
			`ubits-badge--${a}`,
			i === 'dot' ? 'ubits-badge--dot' : '',
			i === 'number' ? 'ubits-badge--number' : '',
			`ubits-badge--${r}`,
			d ? 'ubits-badge--absolute' : '',
			d && p ? `ubits-badge--absolute-${p}` : '',
			e,
		]
			.filter(Boolean)
			.join(' '),
		n = i === 'number' && s !== void 0 && s !== null ? String(s) : '';
	return `<span class="${o}">${n}</span>`;
}
const Q = {
		xs: 20,
		sm: 28,
		md: 36,
		// 36px
		lg: 40,
		// 40px
	},
	pt = 'md',
	ft = {
		green: 'success',
		red: 'error',
		blue: 'info',
		orange: 'warning',
		gray: 'primary',
	},
	tt = {
		xs: 6,
		sm: 8,
		md: 10,
		lg: 10,
	},
	et = {
		xs: 'var(--font-body-xs-size, 11px)',
		sm: 'var(--font-body-sm-size, 13px)',
		md: 'var(--font-body-md-size, 16px)',
		lg: 'var(--font-body-lg-size, 18px)',
	};
function mt(t) {
	return t.imageUrl ? 'photo' : t.initials ? 'initials' : 'icon';
}
function gt(t) {
	const i = t.trim().split(/\s+/);
	return i.length === 0
		? ''
		: i.length === 1
			? i[0].substring(0, 2).toUpperCase()
			: (i[0][0] + i[i.length - 1][0]).toUpperCase();
}
function vt(t = {}) {
	const {
			imageUrl: i,
			initials: a,
			icon: r = 'user',
			size: d = 'md',
			badgeColor: p,
			badgeContent: e,
			alt: s = 'Avatar',
			className: o = '',
			onClick: n,
		} = t,
		u = mt(t),
		l = Q[d] || Q.md,
		y = tt[d] || tt.md,
		w = et[d] || et.md,
		c = ['ubits-avatar', `ubits-avatar--${d}`, `ubits-avatar--${u}`, o].filter(Boolean).join(' '),
		b = `
    width: ${l}px;
    height: ${l}px;
    min-width: ${l}px;
    min-height: ${l}px;
  `.trim();
	let m = '';
	if (u === 'photo' && i)
		m = `<div class="ubits-avatar-image-container"><img src="${i}" alt="${s}" class="ubits-avatar-image" /></div>`;
	else if (u === 'initials') {
		const x = a ? gt(a) : '';
		m = `<span class="ubits-avatar-initials" style="font-size: ${w};">${x}</span>`;
	} else {
		const x = l - y * 2;
		m = `<i class="far fa-${r}" style="font-size: ${x}px;"></i>`;
	}
	const g = p
		? bt({
				type: e != null && e !== '' ? 'number' : 'dot',
				size: pt,
				variant: ft[p] || 'success',
				absolute: !0,
				position: 'bottom-right',
				className: 'ubits-avatar-badge-wrapper',
				content: e,
			})
		: '';
	return `
    <div class="${c}" style="${b}" ${n ? 'role="button" tabindex="0"' : ''} data-variant="${u}">
      ${m}
      ${g}
    </div>
  `.trim();
}
function J(t) {
	const {
			items: i,
			size: a = 'md',
			maxHeight: r = '400px',
			className: d = '',
			attributes: p = {},
		} = t,
		e = ['ubits-list', d].filter(Boolean).join(' '),
		s = Object.entries(p)
			.map(([n, u]) => `${n}="${u}"`)
			.join(' ');
	let o = `<div class="${e}" role="list" style="max-height: ${r};" ${s}>`;
	return (
		i.forEach((n, u) => {
			const l = n.value || `list-item-${u}`,
				y = n.state || (n.selected ? 'active' : 'default'),
				w = [
					'ubits-list-item',
					`ubits-list-item--${a}`,
					y !== 'default' ? `ubits-list-item--${y}` : '',
				]
					.filter(Boolean)
					.join(' '),
				c = [];
			n.selected && c.push('aria-selected="true"'),
				y === 'disabled' ? c.push('aria-disabled="true"') : c.push('tabindex="0"'),
				c.push(`data-value="${l}"`),
				c.push(`data-index="${u}"`),
				n.attributes &&
					Object.entries(n.attributes).forEach(([b, m]) => {
						c.push(`${b}="${m}"`);
					}),
				(o += `
      <div class="${w}" role="listitem" ${c.join(' ')}>
        ${n.label}
      </div>
    `);
		}),
		(o += '</div>'),
		o
	);
}
function ot(t) {
	const { containerId: i, items: a, size: r = 'md', onSelectionChange: d, multiple: p = !1 } = t,
		e = document.getElementById(i);
	if (!e) throw new Error(`Container with id "${i}" not found`);
	const s = J(t);
	e.innerHTML = s;
	const o = e.querySelector('.ubits-list');
	if (!o) throw new Error('Failed to create list element');
	const n = o.querySelectorAll('.ubits-list-item');
	let u = null;
	return (
		n.forEach((l, y) => {
			const w = a[y];
			w &&
				(w.state !== 'disabled' &&
					l.addEventListener('click', () => {
						if ((w.onClick && w.onClick(w, y), p)) {
							if (
								(l.classList.contains('ubits-list-item--active')
									? (l.classList.remove('ubits-list-item--active'),
										l.removeAttribute('aria-selected'))
									: (l.classList.add('ubits-list-item--active'),
										l.setAttribute('aria-selected', 'true')),
								d)
							) {
								const b = Array.from(n)
									.map((m, g) =>
										m.classList.contains('ubits-list-item--active')
											? { item: a[g], index: g }
											: null,
									)
									.filter(Boolean);
								if (b.length > 0) {
									const m = b[b.length - 1];
									d(m.item, m.index);
								} else d(null, null);
							}
						} else {
							if (u !== null && u !== y) {
								const c = n[u];
								c.classList.remove('ubits-list-item--active'), c.removeAttribute('aria-selected');
							}
							u !== y
								? (l.classList.add('ubits-list-item--active'),
									l.setAttribute('aria-selected', 'true'),
									(u = y),
									d && d(w, y))
								: (l.classList.remove('ubits-list-item--active'),
									l.removeAttribute('aria-selected'),
									(u = null),
									d && d(null, null));
						}
					}),
				w.state !== 'disabled' &&
					l.addEventListener('keydown', (c) => {
						var g;
						const b = y;
						let m = null;
						if (c.key === 'ArrowDown') c.preventDefault(), (m = b < a.length - 1 ? b + 1 : 0);
						else if (c.key === 'ArrowUp') c.preventDefault(), (m = b > 0 ? b - 1 : a.length - 1);
						else if (c.key === 'Enter' || c.key === ' ') {
							c.preventDefault(), l.click();
							return;
						} else
							c.key === 'Home'
								? (c.preventDefault(), (m = 0))
								: c.key === 'End' && (c.preventDefault(), (m = a.length - 1));
						if (m !== null) {
							const x = n[m];
							x &&
								((g = a[m]) == null ? void 0 : g.state) !== 'disabled' &&
								(x.focus(), x.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
						}
					}));
		}),
		o
	);
}
const st = {
	sm: '320px',
	md: '480px',
	lg: '640px',
	xl: '800px',
	full: '1280px',
};
function ht(t) {
	const {
			title: i,
			bodyContent: a = '',
			size: r = 'md',
			fullScreen: d = !1,
			footerButtons: p,
			className: e = '',
		} = t,
		s = st[r] || st.md,
		u = ['ubits-modal', `ubits-modal--size-${r}`, d ? 'ubits-modal--full-screen' : '', e]
			.filter(Boolean)
			.join(' '),
		l = `
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${i}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `,
		w = `
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${typeof a == 'function' ? a() : a || '<div class="ubits-modal__placeholder">Contenido del modal</div>'}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `,
		c = p
			? `
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${
					p.tertiary
						? `
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${p.tertiary.label}</span>
          </button>
        </div>
        `
						: ''
				}
        <div class="ubits-modal__footer-right">
          ${
						p.secondary
							? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${p.secondary.label}</span>
          </button>
          `
							: ''
					}
          ${
						p.primary
							? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${p.primary.label}</span>
          </button>
          `
							: ''
					}
        </div>
      </div>
    </div>
  `
			: '';
	return `
    <div class="ubits-modal-overlay">
      <div class="${u}" style="max-width: ${s};">
        ${l}
        ${w}
        ${c}
      </div>
    </div>
  `.trim();
}
function K(t) {
	var c, b, m;
	const { containerId: i, onClose: a, closeOnOverlayClick: r = !0, open: d = !1 } = t;
	let p;
	i ? (p = document.getElementById(i) || document.body) : (p = document.body);
	const e = document.createElement('div');
	e.innerHTML = ht(t);
	const s = e.firstElementChild;
	if (!s) throw new Error('No se pudo crear el modal');
	s.querySelector('.ubits-modal');
	const o = s.querySelector('.ubits-modal__close'),
		n = s,
		u = () => {
			s.classList.add('ubits-modal-overlay--open'), (document.body.style.overflow = 'hidden');
		},
		l = () => {
			s.classList.remove('ubits-modal-overlay--open'),
				(document.body.style.overflow = ''),
				a && a();
		},
		y = (g) => {
			const x = s.querySelector('.ubits-modal__body-content');
			if (x) {
				const v = typeof g == 'function' ? g() : g;
				x.innerHTML = v;
			}
		};
	o &&
		o.addEventListener('click', (g) => {
			g.preventDefault(), g.stopPropagation(), l();
		}),
		r &&
			n &&
			n.addEventListener('click', (g) => {
				g.target === n && l();
			});
	const w = (g) => {
		g.key === 'Escape' && s.classList.contains('ubits-modal-overlay--open') && l();
	};
	if ((document.addEventListener('keydown', w), t.footerButtons)) {
		const g = s.querySelector('.ubits-modal__footer-left .ubits-modal__footer-button'),
			x = s.querySelector('.ubits-modal__footer-right .ubits-button--secondary'),
			v = s.querySelector('.ubits-modal__footer-right .ubits-button--primary');
		g &&
			(c = t.footerButtons.tertiary) != null &&
			c.onClick &&
			g.addEventListener('click', (f) => {
				f.preventDefault(), t.footerButtons.tertiary.onClick(f);
			}),
			x &&
				(b = t.footerButtons.secondary) != null &&
				b.onClick &&
				x.addEventListener('click', (f) => {
					f.preventDefault(), t.footerButtons.secondary.onClick(f);
				}),
			v &&
				(m = t.footerButtons.primary) != null &&
				m.onClick &&
				v.addEventListener('click', (f) => {
					f.preventDefault(), t.footerButtons.primary.onClick(f);
				});
	}
	return (
		p.appendChild(s),
		d && u(),
		{
			element: s,
			open: u,
			close: l,
			updateContent: y,
		}
	);
}
function yt(t) {
	var k;
	const {
		containerId: i,
		label: a = '',
		placeholder: r = '',
		helperText: d = '',
		size: p = 'md',
		state: e = 'default',
		type: s = 'text',
		showLabel: o = !0,
		showHelper: n = !1,
		showCounter: u = !1,
		maxLength: l = 50,
		mandatory: y = !1,
		mandatoryType: w = 'obligatorio',
		leftIcon: c = '',
		rightIcon: b = '',
		value: m = '',
		className: g = '',
		attributes: x = {},
		showRichTextToolbar: v = !1,
	} = t;
	let f = '';
	if (o && a) {
		const _ = y ? ` <span class="ubits-input-mandatory">(${w})</span>` : '';
		f += `<label class="ubits-input-label">${a}${_}</label>`;
	}
	const M = c && c.trim() !== '',
		I = b && b.trim() !== '';
	M && c.startsWith('fa-') ? `${c}` : M && `${c}`,
		I && b.startsWith('fa-') ? `${b}` : I && `${b}`,
		(f += '<div style="position: relative; display: inline-block; width: 100%;">');
	let L = b,
		$ = I,
		C = c,
		h = M;
	const T = ['ubits-input', `ubits-input--${p}`];
	e !== 'default' && T.push(`ubits-input--${e}`), g && T.push(g);
	const q = e === 'disabled' ? ' disabled' : '',
		P = u ? ` maxlength="${l}"` : '',
		S = M ? 'padding-left: 40px;' : 'padding-left: 12px;',
		H = I ? 'padding-right: 40px;' : 'padding-right: 12px;';
	if (s === 'select') {
		const _ = t.selectOptions || [],
			E = (m && ((k = _.find((B) => B.value === m)) == null ? void 0 : k.text)) || r;
		(f += `<input type="text" class="${T.join(' ')}" style="width: 100%; ${S} ${H}" value="${E}" readonly>`),
			I ||
				((L = 'fa-chevron-down'),
				($ = !0),
				H === 'padding-right: 12px;' &&
					(f = f.replace(
						`style="width: 100%; ${S} ${H}"`,
						`style="width: 100%; ${S} padding-right: 40px;"`,
					)));
	} else if (s === 'textarea')
		if (v) {
			(f += '<div class="ubits-input-rich-text-wrapper">'),
				(f += `
        <div class="ubits-input-rich-text-toolbar" data-container-id="${i}">
          <button type="button" class="ubits-rich-text-btn" data-command="bold" title="Negrita">
            <i class="fas fa-bold"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="italic" title="Cursiva">
            <i class="fas fa-italic"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="underline" title="Subrayado">
            <i class="fas fa-underline"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyLeft" title="Alinear izquierda">
            <i class="fas fa-align-left"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyCenter" title="Alinear centro">
            <i class="fas fa-align-center"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyRight" title="Alinear derecha">
            <i class="fas fa-align-right"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="insertUnorderedList" title="Lista con viñetas">
            <i class="fas fa-list-ul"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="insertOrderedList" title="Lista numerada">
            <i class="fas fa-list-ol"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="insertImage" title="Insertar imagen">
            <i class="fas fa-image"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="insertTable" title="Insertar tabla">
            <i class="fas fa-table"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="createLink" title="Insertar enlace">
            <i class="fas fa-link"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="code" title="Código">
            <i class="fas fa-code"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="removeFormat" title="Limpiar formato">
            <i class="fas fa-remove-format"></i>
          </button>
        </div>
      `);
			let _ = `width: 100%; min-height: 80px; resize: vertical; ${S} ${H}; border: none; border-radius: 0;`;
			e === 'disabled' &&
				(_ +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important;');
			const E = `${i}-textarea`;
			(f += `<textarea id="${E}" class="${T.join(' ')}" style="${_}" placeholder="${r}"${q}${P}>${m}</textarea>`),
				(f += '</div>');
		} else {
			let _ = `width: 100%; min-height: 80px; resize: vertical; ${S} ${H}`;
			e === 'disabled' &&
				(_ +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;');
			const E = `${i}-textarea`;
			f += `<textarea id="${E}" class="${T.join(' ')}" style="${_}" placeholder="${r}"${q}${P}>${m}</textarea>`;
		}
	else if (s === 'search') {
		let _ = S,
			E = H;
		M ||
			((C = 'fa-search'),
			(h = !0),
			(_ =
				p === 'xs'
					? 'padding-left: 32px;'
					: p === 'sm'
						? 'padding-left: 36px;'
						: p === 'md'
							? 'padding-left: 40px;'
							: 'padding-left: 44px;')),
			I ||
				((L = 'fa-times'),
				($ = !0),
				(E =
					p === 'xs'
						? 'padding-right: 32px;'
						: p === 'sm'
							? 'padding-right: 36px;'
							: p === 'md'
								? 'padding-right: 40px;'
								: 'padding-right: 44px;'));
		let B = `width: 100%; ${_} ${E}`;
		e === 'disabled' &&
			(B +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			(f += `<input type="text" class="${T.join(' ')}" style="${B}" placeholder="${r}" value="${m}" autocomplete="off"${q}${P}>`);
	} else if (s === 'autocomplete') {
		let _ = S,
			E = H;
		M ||
			((C = 'fa-search'),
			(h = !0),
			(_ =
				p === 'xs'
					? 'padding-left: 32px;'
					: p === 'sm'
						? 'padding-left: 36px;'
						: p === 'md'
							? 'padding-left: 40px;'
							: 'padding-left: 44px;')),
			I ||
				((L = 'fa-times'),
				($ = !0),
				(E =
					p === 'xs'
						? 'padding-right: 32px;'
						: p === 'sm'
							? 'padding-right: 36px;'
							: p === 'md'
								? 'padding-right: 40px;'
								: 'padding-right: 44px;'));
		let B = `width: 100%; ${_} ${E}`;
		e === 'disabled' &&
			(B +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			(f += `<input type="text" class="${T.join(' ')}" style="${B}" placeholder="${r}" value="${m}" autocomplete="off"${q}${P}>`);
	} else if (s === 'calendar') {
		let _ = S,
			E = H;
		I ||
			((L = 'fa-calendar'),
			($ = !0),
			(E =
				p === 'xs'
					? 'padding-right: 32px;'
					: p === 'sm'
						? 'padding-right: 36px;'
						: p === 'md'
							? 'padding-right: 40px;'
							: 'padding-right: 44px;'));
		let B = `width: 100%; ${_} ${E}`;
		e === 'disabled' &&
			(B +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			(f += `<input type="text" class="${T.join(' ')}" style="${B}" placeholder="${r}" value="${m}" readonly${q}>`);
	} else if (s === 'password') {
		let _ = S,
			E = H;
		I ||
			((L = 'fa-eye'),
			($ = !0),
			(E =
				p === 'xs'
					? 'padding-right: 32px;'
					: p === 'sm'
						? 'padding-right: 36px;'
						: p === 'md'
							? 'padding-right: 40px;'
							: 'padding-right: 44px;'));
		let B = `width: 100%; ${_} ${E}`;
		e === 'disabled' &&
			(B +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			(f += `<input type="password" class="${T.join(' ')}" style="${B}" placeholder="${r}" value="${m}"${q}${P}>`);
	} else
		f += `<input type="${s}" class="${T.join(' ')}" style="width: 100%; ${S} ${H}" placeholder="${r}" value="${m}"${q}${P}>`;
	if (h) {
		const _ = C.startsWith('fa-') ? `far ${C}` : `far fa-${C}`;
		f += `<i class="${_} ubits-input-icon-left" style="position: absolute; left: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
	}
	if ($) {
		const _ = L.startsWith('fa-') ? `far ${L}` : `far fa-${L}`;
		f += `<i class="${_} ubits-input-icon-right" style="position: absolute; right: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
	}
	(f += '</div>'),
		(n || u) &&
			((f += '<div class="ubits-input-helper">'),
			n && d && (f += `<span>${d}</span>`),
			u && (f += `<span class="ubits-input-counter">0/${l}</span>`),
			(f += '</div>'));
	const D = Object.entries(x)
		.map(([_, E]) => `${_}="${E}"`)
		.join(' ');
	return D ? `<div ${D}>${f}</div>` : f;
}
function xt(t) {
	const {
		containerId: i,
		onChange: a,
		onFocus: r,
		onBlur: d,
		showCounter: p = !1,
		maxLength: e = 50,
		type: s = 'text',
		selectOptions: o = [],
		autocompleteOptions: n = [],
		value: u = '',
	} = t;
	if (!i) return console.error('UBITS Input: containerId es requerido'), null;
	const l = document.getElementById(i);
	if (!l) return console.error(`UBITS Input: No se encontró el contenedor con ID "${i}"`), null;
	const y = yt(t);
	l.innerHTML = y;
	const w = l.querySelector('div[style*="position: relative"]'),
		c = l.querySelector('.ubits-input'),
		b = l.querySelector('.ubits-input-counter');
	if (!c || !w) return console.error('UBITS Input: No se pudo crear el elemento input'), null;
	if (
		(getComputedStyle(l).position === 'static' && (l.style.position = 'relative'),
		s === 'select' && St(l, c, o, u, t.placeholder || '', a, t.size || 'md'),
		s === 'search' && wt(l, c, a),
		s === 'autocomplete' && _t(l, c, n, a, t.size || 'md'),
		s === 'calendar' && kt(l, c, a),
		s === 'password' && $t(l, c),
		s === 'textarea' && t.showRichTextToolbar
			? Et(l, c, t.onChange)
			: s === 'textarea' && !t.showRichTextToolbar && Bt(l, c),
		p && b && Lt(c, b, e),
		a && typeof a == 'function')
	) {
		const m = s === 'select' ? 'change' : 'input';
		c.addEventListener(m, (g) => {
			a(g.target.value, g);
		});
	}
	return (
		r &&
			typeof r == 'function' &&
			c.addEventListener('focus', (m) => {
				r(m.target.value, m);
			}),
		d &&
			typeof d == 'function' &&
			c.addEventListener('blur', (m) => {
				d(m.target.value, m);
			}),
		{
			element: w,
			inputElement: c,
			getValue: () => c.value,
			setValue: (m) => {
				(c.value = m), p && b && X(b, m.length, e);
			},
			focus: () => c.focus(),
			blur: () => c.blur(),
			disable: () => {
				(c.disabled = !0), c.classList.add('ubits-input--disabled');
			},
			enable: () => {
				(c.disabled = !1), c.classList.remove('ubits-input--disabled');
			},
			setState: (m) => {
				if (
					([
						'ubits-input--hover',
						'ubits-input--focus',
						'ubits-input--active',
						'ubits-input--invalid',
						'ubits-input--disabled',
					].forEach((x) => c.classList.remove(x)),
					m !== 'default' && c.classList.add(`ubits-input--${m}`),
					m === 'disabled' ? (c.disabled = !0) : (c.disabled = !1),
					s === 'textarea' && t.showRichTextToolbar)
				) {
					const x = c.closest('.ubits-input-rich-text-wrapper'),
						v = x == null ? void 0 : x.querySelector('.ubits-input-rich-text-toolbar');
					if (v) {
						const f = window.getComputedStyle(v).borderBottom;
						window.getComputedStyle(v).borderTop,
							f &&
								f !== 'none' &&
								f !== '0px' &&
								(console.warn(
									`[Rich Text] ⚠️ Línea divisoria detectada en setState("${m}"), removiendo...`,
								),
								(v.style.borderBottom = 'none'),
								(v.style.borderTop = 'none'));
					}
				}
			},
		}
	);
}
function $t(t, i) {
	const a = t.querySelector('.ubits-input-icon-right');
	if (a) {
		let r = !1;
		(a.style.pointerEvents = 'auto'), (a.style.cursor = 'pointer');
		const p = !a.className.includes('fa-eye');
		a.addEventListener('click', (e) => {
			e.preventDefault(),
				e.stopPropagation(),
				(r = !r),
				r
					? ((i.type = 'text'), p || (a.className = 'far fa-eye-slash ubits-input-icon-right'))
					: ((i.type = 'password'), p || (a.className = 'far fa-eye ubits-input-icon-right'));
		});
	}
}
function wt(t, i, a) {
	const r = t.querySelector('.ubits-input-icon-right');
	if (r) {
		(r.style.display = i.value.length > 0 ? 'block' : 'none'),
			(r.style.pointerEvents = 'auto'),
			(r.style.cursor = 'pointer');
		const d = () => {
			r.style.display = i.value.length > 0 ? 'block' : 'none';
		};
		i.addEventListener('input', d),
			r.addEventListener('click', (p) => {
				p.preventDefault(), (i.value = ''), i.focus(), d(), a && a('');
			});
	}
}
function _t(t, i, a, r, d = 'md') {
	const p = d === 'xs' ? 'xs' : d === 'sm' ? 'sm' : d === 'md' ? 'md' : 'lg',
		e = t.querySelector('.ubits-input-icon-right');
	if (e) {
		(e.style.display = i.value.length > 0 ? 'block' : 'none'),
			(e.style.pointerEvents = 'auto'),
			(e.style.cursor = 'pointer');
		const n = () => {
			e.style.display = i.value.length > 0 ? 'block' : 'none';
		};
		i.addEventListener('input', n),
			e.addEventListener('click', (u) => {
				u.preventDefault(), (i.value = ''), i.focus(), n();
				const l = t.querySelector('.ubits-autocomplete-list-container');
				l && (l.style.display = 'none'), r && r('');
			});
	}
	const s = document.createElement('div');
	(s.className = 'ubits-autocomplete-list-container'),
		(s.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `),
		t.appendChild(s);
	const o = (n = !1) => {
		const u = i.value.toLowerCase();
		let l;
		if (
			(n || u.length < 1
				? (l = a.slice(0, 8))
				: (l = a.filter((c) => c.text.toLowerCase().includes(u)).slice(0, 8)),
			l.length === 0)
		) {
			s.style.display = 'none';
			return;
		}
		const y = l.map((c) => ({
				label: c.text,
				state: 'default',
				value: c.value,
				selected: !1,
			})),
			w = `ubits-autocomplete-list-${t.id}`;
		(s.id = w), (s.innerHTML = '');
		try {
			ot({
				containerId: w,
				items: y,
				size: p,
				maxHeight: '200px',
				onSelectionChange: (c, b) => {
					c &&
						c.value &&
						((i.value = c.label),
						(s.style.display = 'none'),
						e && (e.style.display = 'block'),
						r && r(c.value));
				},
			}),
				u.length > 0 &&
					s.querySelectorAll('.ubits-list-item').forEach((b) => {
						const m = b.textContent || '';
						if (m.toLowerCase().includes(u)) {
							const g = new RegExp(`(${u})`, 'gi'),
								x = m.replace(g, '<strong>$1</strong>');
							b.innerHTML = x;
						}
					});
		} catch (c) {
			console.warn('Using renderList fallback for autocomplete:', c);
			const b = J({
				items: y,
				size: p,
				maxHeight: '200px',
			});
			(s.innerHTML = b),
				u.length > 0 &&
					s.querySelectorAll('.ubits-list-item').forEach((x) => {
						const v = x.textContent || '';
						if (v.toLowerCase().includes(u)) {
							const f = new RegExp(`(${u})`, 'gi'),
								M = v.replace(f, '<strong>$1</strong>');
							x.innerHTML = M;
						}
					}),
				s.querySelectorAll('.ubits-list-item').forEach((g, x) => {
					const v = y[x];
					v &&
						v.state !== 'disabled' &&
						g.addEventListener('click', () => {
							(i.value = v.label),
								(s.style.display = 'none'),
								e && (e.style.display = 'block'),
								r && r(v.value || '');
						});
				});
		}
		s.style.display = 'block';
	};
	i.addEventListener('focus', () => {
		o(!0);
	}),
		i.addEventListener('input', () => {
			o(!1);
		}),
		i.addEventListener('blur', () => {
			setTimeout(() => (s.style.display = 'none'), 150);
		});
}
function St(t, i, a, r, d, p, e = 'md') {
	i.style.cursor = 'pointer';
	const s = e === 'xs' ? 'xs' : e === 'sm' ? 'sm' : e === 'md' ? 'md' : 'lg',
		o = document.createElement('div');
	(o.className = 'ubits-select-list-container'),
		(o.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `),
		t.appendChild(o);
	const n = 50;
	let u = 0,
		l = [],
		y = !1;
	const w = (c = 0) => {
		y ||
			((y = !0),
			setTimeout(() => {
				const b = c * n,
					m = Math.min(b + n, a.length),
					x = a.slice(b, m).map((f) => ({
						label: f.text,
						state: r === f.value ? 'active' : 'default',
						value: f.value,
						selected: r === f.value,
					}));
				c === 0 ? (l = x) : (l = [...l, ...x]);
				const v = `ubits-select-list-${t.id}`;
				(o.id = v), (o.innerHTML = '');
				try {
					ot({
						containerId: v,
						items: l,
						size: s,
						maxHeight: '200px',
						onSelectionChange: (f, M) => {
							f && f.value && ((i.value = f.label), (o.style.display = 'none'), p && p(f.value));
						},
					});
				} catch (f) {
					console.warn('Using renderList fallback for select:', f);
					const M = J({
						items: l,
						size: s,
						maxHeight: '200px',
					});
					(o.innerHTML = M),
						o.querySelectorAll('.ubits-list-item').forEach((L, $) => {
							const C = l[$];
							C &&
								C.state !== 'disabled' &&
								L.addEventListener('click', () => {
									(i.value = C.label), (o.style.display = 'none'), p && p(C.value || '');
								});
						});
				}
				if (m < a.length) {
					const f = o.querySelector('.ubits-list');
					if (f) {
						const M = new IntersectionObserver(
								(L) => {
									L[0].isIntersecting && !y && m < a.length && (u++, w(u));
								},
								{ root: f, rootMargin: '50px' },
							),
							I = o.querySelector('.ubits-list-item:last-child');
						I && M.observe(I);
					}
				}
				y = !1;
			}, 150));
	};
	i.addEventListener('click', () => {
		o.style.display === 'block'
			? (o.style.display = 'none')
			: ((u = 0), (l = []), w(0), (o.style.display = 'block'));
	}),
		document.addEventListener('click', (c) => {
			t.contains(c.target) || (o.style.display = 'none');
		});
}
function kt(t, i, a) {
	let r = null,
		d = null;
	const p = (n) => {
			const u = String(n.getDate()).padStart(2, '0'),
				l = String(n.getMonth() + 1).padStart(2, '0'),
				y = n.getFullYear();
			return `${u}/${l}/${y}`;
		},
		e = (n) => {
			if (!n) return null;
			const [u, l, y] = n.split('/');
			return !u || !l || !y ? null : new Date(parseInt(y), parseInt(l) - 1, parseInt(u));
		},
		s = async () => {
			if (
				(i.type === 'date' && ((i.type = 'text'), i.setAttribute('readonly', 'readonly')),
				d && d.style.display !== 'none')
			) {
				d.style.display = 'none';
				return;
			}
			if (
				(d ||
					((d = document.createElement('div')),
					(d.className = 'ubits-calendar-picker-container'),
					(d.style.cssText =
						'position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px; display: none;'),
					(t.style.position = 'relative'),
					t.appendChild(d)),
				r)
			) {
				d.style.display = 'block';
				return;
			}
			try {
				const n = await import('./CalendarProvider-D6U_OHMp.mjs'),
					{ createCalendar: u } = n,
					l = i.value,
					y = e(l) || /* @__PURE__ */ new Date();
				(r = u({
					mode: 'single',
					selectedDate: e(l),
					initialDate: y,
					onDateSelect: (w) => {
						const c = p(w);
						(i.value = c), d && (d.style.display = 'none'), a && a(c);
					},
				})),
					d.appendChild(r.element),
					(d.style.display = 'block');
			} catch (n) {
				console.error('❌ [Calendar Picker] Error cargando Calendar UBITS:', n),
					d &&
						((d.innerHTML =
							'<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>'),
						(d.style.display = 'block'));
			}
		};
	i.addEventListener('click', (n) => {
		n.preventDefault(), n.stopPropagation(), s();
	}),
		i.addEventListener('focus', (n) => {
			n.preventDefault(), n.stopPropagation(), s();
		});
	const o = t.querySelector('.ubits-input-icon-right');
	o &&
		o.addEventListener('click', (n) => {
			n.preventDefault(), n.stopPropagation(), s();
		}),
		document.addEventListener('click', (n) => {
			d && !t.contains(n.target) && (d.style.display = 'none');
		}),
		document.addEventListener('keydown', (n) => {
			n.key === 'Escape' && d && (d.style.display = 'none');
		});
}
function Lt(t, i, a) {
	const r = () => {
		X(i, t.value.length, a),
			t.value.length > a && ((t.value = t.value.substring(0, a)), X(i, a, a));
	};
	t.addEventListener('input', r), X(i, t.value.length, a);
}
function X(t, i, a) {
	(t.textContent = `${i}/${a}`),
		i >= a
			? t.classList.add('ubits-input-counter--limit')
			: t.classList.remove('ubits-input-counter--limit');
}
function Ct(t, i) {
	const a = `ubits-rich-text-image-modal-${Date.now()}`,
		r = `${a}-input`,
		d = {
			title: 'Insertar imagen',
			size: 'md',
			bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL de la imagen:
        </label>
        <div style="display: flex; gap: var(--ubits-spacing-sm, 8px); align-items: flex-start;">
          <input 
            type="text" 
            id="${r}"
            class="ubits-input ubits-input--md"
            placeholder="https://ejemplo.com/imagen.jpg"
            style="flex: 1;"
          />
          <button 
            type="button"
            id="${a}-insert-btn"
            class="ubits-button ubits-button--primary ubits-button--md"
          >
            <span>Insertar imagen</span>
          </button>
        </div>
      </div>
    `,
			footerButtons: {
				secondary: {
					label: 'Cancelar',
					onClick: () => {},
				},
			},
			onClose: () => {
				var u;
				const n =
					(u = document.getElementById(a)) == null ? void 0 : u.closest('.ubits-modal-overlay');
				n && setTimeout(() => n.remove(), 300);
			},
			closeOnOverlayClick: !0,
			open: !0,
		},
		p = K(d),
		e = p.element;
	e.id = a;
	const s = document.getElementById(`${a}-insert-btn`),
		o = document.getElementById(r);
	if (s && o) {
		const n = () => {
			const l = o.value.trim();
			if (l) {
				const y = document.createElement('img');
				(y.src = l),
					(y.style.maxWidth = '100%'),
					(y.style.height = 'auto'),
					(y.style.display = 'block'),
					(y.style.margin = 'var(--ubits-spacing-sm, 8px) 0');
				const w = window.getSelection();
				w && w.rangeCount > 0 ? w.getRangeAt(0).insertNode(y) : t.appendChild(y), i(), p.close();
			}
		};
		s.addEventListener('click', n),
			o.addEventListener('keydown', (l) => {
				l.key === 'Enter' && (l.preventDefault(), n());
			});
		const u = e.querySelector('.ubits-button--secondary');
		u &&
			u.addEventListener('click', () => {
				p.close();
			});
	}
}
function It(t, i) {
	const a = `ubits-rich-text-table-modal-${Date.now()}`,
		r = `${a}-rows`,
		d = `${a}-cols`,
		p = {
			title: 'Insertar tabla',
			size: 'sm',
			bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--ubits-spacing-lg, 16px);">
          <div>
            <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
              Filas:
            </label>
            <input 
              type="number" 
              id="${r}"
              class="ubits-input ubits-input--md"
              value="2"
              min="1"
              max="20"
              style="width: 100%;"
            />
          </div>
          <div>
            <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
              Columnas:
            </label>
            <input 
              type="number" 
              id="${d}"
              class="ubits-input ubits-input--md"
              value="2"
              min="1"
              max="20"
              style="width: 100%;"
            />
          </div>
        </div>
      </div>
    `,
			footerButtons: {
				secondary: {
					label: 'Cancelar',
					onClick: () => {},
				},
				primary: {
					label: 'Insertar',
					onClick: () => {},
				},
			},
			onClose: () => {
				var w;
				const y =
					(w = document.getElementById(a)) == null ? void 0 : w.closest('.ubits-modal-overlay');
				y && setTimeout(() => y.remove(), 300);
			},
			closeOnOverlayClick: !0,
			open: !0,
		},
		e = K(p),
		s = e.element;
	s.id = a;
	const o = s.querySelector('.ubits-button--primary'),
		n = document.getElementById(r),
		u = document.getElementById(d);
	o &&
		n &&
		u &&
		o.addEventListener('click', () => {
			const y = parseInt(n.value) || 2,
				w = parseInt(u.value) || 2;
			if (y > 0 && w > 0) {
				const c = document.createElement('table');
				(c.style.borderCollapse = 'collapse'),
					(c.style.width = '100%'),
					(c.style.margin = 'var(--ubits-spacing-sm, 8px) 0'),
					(c.style.border = '1px solid var(--ubits-border-1)');
				for (let m = 0; m < y; m++) {
					const g = document.createElement('tr');
					for (let x = 0; x < w; x++) {
						const v = document.createElement('td');
						(v.style.border = '1px solid var(--ubits-border-1)'),
							(v.style.padding = 'var(--ubits-spacing-sm, 8px)'),
							(v.style.minWidth = '50px'),
							(v.textContent = ' '),
							g.appendChild(v);
					}
					c.appendChild(g);
				}
				const b = window.getSelection();
				b && b.rangeCount > 0 ? b.getRangeAt(0).insertNode(c) : t.appendChild(c), i(), e.close();
			}
		});
	const l = s.querySelector('.ubits-button--secondary');
	l &&
		l.addEventListener('click', () => {
			e.close();
		});
}
function Tt(t, i) {
	const a = `ubits-rich-text-link-modal-${Date.now()}`,
		r = `${a}-input`,
		d = {
			title: 'Insertar enlace',
			size: 'md',
			bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL del enlace:
        </label>
        <input 
          type="text" 
          id="${r}"
          class="ubits-input ubits-input--md"
          placeholder="https://ejemplo.com"
          style="width: 100%; box-sizing: border-box;"
        />
      </div>
    `,
			footerButtons: {
				secondary: {
					label: 'Cancelar',
					onClick: () => {},
				},
				primary: {
					label: 'Insertar',
					onClick: () => {},
				},
			},
			onClose: () => {
				var l;
				const u =
					(l = document.getElementById(a)) == null ? void 0 : l.closest('.ubits-modal-overlay');
				u && setTimeout(() => u.remove(), 300);
			},
			closeOnOverlayClick: !0,
			open: !0,
		},
		p = K(d),
		e = p.element;
	e.id = a;
	const s = e.querySelector('.ubits-button--primary'),
		o = document.getElementById(r);
	s &&
		o &&
		s.addEventListener('click', () => {
			const u = o.value.trim();
			u && (document.execCommand('createLink', !1, u), i(), p.close());
		});
	const n = e.querySelector('.ubits-button--secondary');
	n &&
		n.addEventListener('click', () => {
			p.close();
		}),
		o &&
			o.addEventListener('keydown', (u) => {
				u.key === 'Enter' && (u.preventDefault(), s && s.click());
			});
}
function Et(t, i, a) {
	var w, c;
	const r = t.querySelector('.ubits-input-rich-text-toolbar');
	if (!r) return;
	const d = i.closest('.ubits-input-rich-text-wrapper');
	if (!d) return;
	const p = i.placeholder || '',
		e = document.createElement('div');
	e.className = i.className;
	const s = window.getComputedStyle(i);
	(e.style.cssText = i.style.cssText),
		(e.style.position = 'relative'),
		(e.style.padding = s.padding || '12px 12px'),
		(e.style.margin = '0'),
		(e.style.outline = 'none'),
		(e.style.overflow = 'auto'),
		(e.style.minHeight = s.minHeight || '80px'),
		(e.style.resize = 'vertical'),
		(e.contentEditable = 'true'),
		e.setAttribute('data-placeholder', p);
	let o = t.closest('.ubits-input-wrapper');
	if ((o || (o = (w = t.parentElement) == null ? void 0 : w.closest('.ubits-input-wrapper')), !o)) {
		const b = (c = document.getElementById(t.id)) == null ? void 0 : c.parentElement;
		o = b == null ? void 0 : b.closest('.ubits-input-wrapper');
	}
	console.log('[Rich Text Placeholder] ===== DEBUG ALINEAMIENTO ====='),
		console.log('[Rich Text Placeholder] inputWrapper:', o),
		console.log('[Rich Text Placeholder] container:', t),
		console.log('[Rich Text Placeholder] container.parentElement:', t.parentElement),
		console.log('[Rich Text Placeholder] richTextWrapper:', d),
		console.log(
			'[Rich Text Placeholder] richTextWrapper.parentElement:',
			d == null ? void 0 : d.parentElement,
		);
	let n = null;
	if (
		(o && (n = o.querySelector('.ubits-input-icon-left')),
		!n && t.parentElement && (n = t.parentElement.querySelector('.ubits-input-icon-left')),
		!n &&
			d != null &&
			d.parentElement &&
			(n = d.parentElement.querySelector('.ubits-input-icon-left')),
		!n)
	) {
		const b = document.querySelectorAll('.ubits-input-icon-left');
		for (const m of Array.from(b)) {
			const g = m,
				x = t.getBoundingClientRect(),
				v = g.getBoundingClientRect();
			if (Math.abs(v.top - x.top) < 100) {
				n = g;
				break;
			}
		}
	}
	const u = n !== null;
	if (
		(console.log('[Rich Text Placeholder] leftIconElement:', n),
		console.log('[Rich Text Placeholder] hasLeftIcon:', u),
		u && n)
	) {
		const b = n.getBoundingClientRect(),
			m = window.getComputedStyle(n),
			g = m.left,
			x = m.top,
			v = m.transform;
		console.log('[Rich Text Placeholder] Icono encontrado:', n),
			console.log('[Rich Text Placeholder] Icono rect:', b),
			console.log('[Rich Text Placeholder] Icono left (computed):', g),
			console.log('[Rich Text Placeholder] Icono top (computed):', x),
			console.log('[Rich Text Placeholder] Icono transform:', v);
		const f = s.paddingLeft || '12px',
			M = s.paddingTop || '12px',
			I = s.paddingRight || '12px',
			L = s.paddingBottom || '12px';
		console.log('[Rich Text Placeholder] Textarea padding:', {
			left: f,
			top: M,
			right: I,
			bottom: L,
		});
		const $ = e.getBoundingClientRect();
		console.log('[Rich Text Placeholder] EditableDiv rect:', $);
		const C = b.left - $.left,
			h = b.top - $.top,
			T = b.bottom - $.top;
		console.log('[Rich Text Placeholder] Icono posición relativa:', {
			left: C,
			top: h,
			bottom: T,
		});
		const q = s.lineHeight || '1.5',
			P = s.fontSize || '14px';
		console.log('[Rich Text Placeholder] Texto:', {
			fontSize: P,
			lineHeight: q,
		}),
			e.setAttribute('data-has-left-icon', 'true'),
			e.style.setProperty('--placeholder-left', f),
			e.style.setProperty('--placeholder-top', M),
			console.log('[Rich Text Placeholder] Variables CSS establecidas:', {
				'--placeholder-left': f,
				'--placeholder-top': M,
			}),
			requestAnimationFrame(() => {
				e.querySelector('::before') || window.getComputedStyle(e, '::before');
				const S = window.getComputedStyle(e, '::before');
				console.log('[Rich Text Placeholder] Después de render:', {
					placeholderLeft: S.left,
					placeholderTop: S.top,
					placeholderWidth: S.width,
					placeholderHeight: S.height,
				});
			});
	} else {
		const b = s.paddingTop || '12px',
			m = s.paddingLeft || '12px';
		console.log('[Rich Text Placeholder] Sin icono, usando valores por defecto:', {
			paddingTop: b,
			paddingLeft: m,
		}),
			e.style.setProperty('--placeholder-top', b),
			e.style.setProperty('--placeholder-left', m);
	}
	console.log('[Rich Text Placeholder] ===== FIN DEBUG ====='),
		i.value && i.value.trim()
			? (e.innerHTML = i.value)
			: e.classList.add('ubits-rich-text-placeholder'),
		(i.style.display = 'none'),
		i.setAttribute('data-rich-text-editor', 'true'),
		d.insertBefore(e, i),
		u &&
			n &&
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					let b = n;
					if (
						(o && (b = o.querySelector('.ubits-input-icon-left') || n),
						!b &&
							t.parentElement &&
							(b = t.parentElement.querySelector('.ubits-input-icon-left') || n),
						b)
					) {
						const m = b.getBoundingClientRect(),
							g = e.getBoundingClientRect();
						if (
							(console.log('[Rich Text Placeholder] Después de insertar en DOM:'),
							console.log('[Rich Text Placeholder] Icono rect:', m),
							console.log('[Rich Text Placeholder] EditableDiv rect:', g),
							g.width > 0 && g.height > 0)
						) {
							const x = m.top - g.top,
								v = m.bottom - g.top,
								f = m.left - g.left;
							console.log('[Rich Text Placeholder] Posiciones relativas:', {
								iconTop: x,
								iconBottom: v,
								iconLeft: f,
								iconCenterY: x + m.height / 2,
							});
							const M = x + m.height / 2,
								I = parseFloat(s.fontSize || '16px'),
								L = s.lineHeight;
							let $;
							L === 'normal'
								? ($ = I * 1.2)
								: L.includes('px')
									? ($ = parseFloat(L))
									: ($ = I * parseFloat(L));
							const C = parseFloat(s.paddingTop || '12px'),
								h = C + I * 0.75,
								T = M - h,
								q = C + T;
							console.log('[Rich Text Placeholder] Cálculos de alineamiento:', {
								iconCenterY: M,
								fontSize: I,
								lineHeight: $,
								paddingTop: C,
								textBaselineY: h,
								offset: T,
								adjustedTop: q,
							});
							const P = Math.max(0, q),
								H = (e.style.padding || s.padding || '12px 12px').split(' '),
								D = H[1] || H[0] || '12px',
								k = H[2] || H[0] || '12px',
								_ = H[3] || H[1] || H[0] || '40px';
							(e.style.padding = `${P}px ${D} ${k} ${_}`),
								e.style.setProperty('--placeholder-top', `${P}px`),
								e.style.setProperty('--placeholder-left', _),
								console.log('[Rich Text Placeholder] Variables CSS finales:', {
									'--placeholder-top': `${P}px`,
									'--placeholder-left': _,
									'editableDiv padding actualizado': `${P}px ${D} ${k} ${_}`,
								});
						} else
							console.warn('[Rich Text Placeholder] EditableDiv aún no tiene dimensiones válidas');
					}
				});
			});
	const l = (b) => {
		const m = e.innerText || '';
		(i.value = m),
			a && a(m, b),
			m.trim()
				? e.classList.remove('ubits-rich-text-placeholder')
				: e.classList.add('ubits-rich-text-placeholder');
	};
	e.addEventListener('input', l),
		e.addEventListener('blur', l),
		e.addEventListener('focus', () => {
			e.classList.contains('ubits-rich-text-placeholder') &&
				((e.textContent = ''), e.classList.remove('ubits-rich-text-placeholder'));
			const b = d.querySelector('.ubits-input-rich-text-toolbar');
			if (b) {
				const m = window.getComputedStyle(b).borderBottom;
				window.getComputedStyle(b).borderTop,
					m &&
						m !== 'none' &&
						m !== '0px' &&
						(console.warn('[Rich Text] ⚠️ Línea divisoria detectada en focus, removiendo...'),
						(b.style.borderBottom = 'none'),
						(b.style.borderTop = 'none'));
			}
		}),
		d.addEventListener('mouseenter', () => {
			const b = d.querySelector('.ubits-input-rich-text-toolbar');
			if (b) {
				const m = window.getComputedStyle(b).borderBottom;
				m &&
					m !== 'none' &&
					m !== '0px' &&
					(console.warn('[Rich Text] ⚠️ Línea divisoria detectada en hover, removiendo...'),
					(b.style.borderBottom = 'none'),
					(b.style.borderTop = 'none'));
			}
		}),
		r.querySelectorAll('.ubits-rich-text-btn').forEach((b) => {
			b.addEventListener('click', (m) => {
				m.preventDefault(), e.focus();
				const g = b.getAttribute('data-command');
				if (g) {
					if (g === 'insertImage') Ct(e, l);
					else if (g === 'insertTable') It(e, l);
					else if (g === 'createLink') Tt(e, l);
					else if (g === 'code') {
						const x = window.getSelection();
						if (x && x.rangeCount > 0) {
							const v = x.getRangeAt(0),
								f = document.createElement('code');
							(f.style.background = 'var(--ubits-bg-2)'),
								(f.style.padding = 'var(--ubits-spacing-xs, 2px) var(--ubits-spacing-sm, 4px)'),
								(f.style.borderRadius = 'var(--ubits-border-radius-sm, 4px)'),
								(f.style.fontFamily = 'var(--font-mono, monospace)');
							try {
								v.surroundContents(f);
							} catch {
								(f.textContent = v.toString()), v.deleteContents(), v.insertNode(f);
							}
						}
					} else document.execCommand(g, !1, void 0);
					l();
				}
			});
		});
}
function Bt(t, i) {
	var p, e;
	let a = t.closest('.ubits-input-wrapper');
	if ((a || (a = (p = t.parentElement) == null ? void 0 : p.closest('.ubits-input-wrapper')), !a)) {
		const s = (e = document.getElementById(t.id)) == null ? void 0 : e.parentElement;
		a = s == null ? void 0 : s.closest('.ubits-input-wrapper');
	}
	let r = null;
	if (
		(a && (r = a.querySelector('.ubits-input-icon-left')),
		!r && t.parentElement && (r = t.parentElement.querySelector('.ubits-input-icon-left')),
		!r)
	) {
		const s = document.querySelectorAll('.ubits-input-icon-left');
		for (const o of Array.from(s)) {
			const n = o,
				u = t.getBoundingClientRect(),
				l = n.getBoundingClientRect();
			if (Math.abs(l.top - u.top) < 100) {
				r = n;
				break;
			}
		}
	}
	!(r !== null) ||
		!r ||
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const s = (a == null ? void 0 : a.querySelector('.ubits-input-icon-left')) || r;
				if (s && i) {
					const o = s.getBoundingClientRect(),
						n = i.getBoundingClientRect();
					if (n.width > 0 && n.height > 0) {
						const u = o.top - n.top;
						o.bottom - n.top, o.left - n.left;
						const l = u + o.height / 2,
							y = window.getComputedStyle(i),
							w = parseFloat(y.fontSize || '16px'),
							c = parseFloat(y.paddingTop || '12px'),
							b = c + w * 0.75,
							m = l - b,
							g = c + m,
							x = Math.max(0, g),
							f = (y.padding || '12px 12px').split(' '),
							M = f[1] || f[0] || '12px',
							I = f[2] || f[0] || '12px',
							L = f[3] || f[1] || f[0] || '40px';
						i.style.padding = `${x}px ${M} ${I} ${L}`;
					}
				}
			});
		});
}
function Mt(t = {}) {
	const {
			size: i = 'md',
			variant: a = 'primary',
			animated: r = !0,
			label: d,
			fullScreen: p = !1,
			className: e = '',
			style: s = '',
		} = t,
		o = [
			'ubits-spinner',
			`ubits-spinner--${i}`,
			`ubits-spinner--${a}`,
			r ? 'ubits-spinner--animated' : '',
			p ? 'ubits-spinner--fullscreen' : '',
			e,
		]
			.filter(Boolean)
			.join(' '),
		n = s ? ` style="${s}"` : '';
	return `
    <div class="${o}"${n}>
      <div class="ubits-spinner__circle">
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
      </div>
      ${d ? `<span class="ubits-spinner__label">${d}</span>` : ''}
    </div>
  `.trim();
}
function V(t, i = 'regular') {
	try {
		const a = i === 'solid' ? 'fas' : 'far',
			r = t.startsWith('fa-') ? t : `fa-${t}`;
		return `<i class="${a} ${r}"></i>`;
	} catch {
		const r = i === 'solid' ? 'fas' : 'far',
			d = t.startsWith('fa-') ? t : `fa-${t}`;
		return `<i class="${r} ${d}"></i>`;
	}
}
function rt(t) {
	const {
			variant: i = 'primary',
			size: a = 'md',
			text: r = '',
			icon: d,
			iconStyle: p = 'regular',
			iconOnly: e = !1,
			disabled: s = !1,
			loading: o = !1,
			loadingText: n,
			badge: u = !1,
			active: l = !1,
			fullWidth: y = !1,
			block: w = !1,
			iconPosition: c = 'left',
			className: b = '',
			attributes: m = {},
			dropdown: g = !1,
			showTooltip: x = !1,
			tooltipText: v = '',
		} = t,
		f = [
			'ubits-button',
			`ubits-button--${i}`,
			`ubits-button--${a}`,
			l && 'ubits-button--active',
			e && 'ubits-button--icon-only',
			o && 'ubits-button--loading',
			y && 'ubits-button--full-width',
			w && 'ubits-button--block',
			c === 'right' && 'ubits-button--icon-right',
			g && 'ubits-button--dropdown',
			b,
		]
			.filter(Boolean)
			.join(' '),
		M = [
			s && 'disabled',
			o && 'data-loading="true"',
			o && 'aria-busy="true"',
			...Object.entries(m).map(([k, _]) => `${k}="${_}"`),
		]
			.filter(Boolean)
			.join(' ');
	let I = '';
	d && (I = V(d, p));
	let L = I,
		$ = c;
	g && !d && r
		? ((L = V('chevron-down', p)), ($ = 'right'))
		: g && d && c === 'left' && r
			? (L = `${I}${V('chevron-down', p)}`)
			: g && !r && (L = d ? `${I}${V('chevron-down', p)}` : V('chevron-down', p));
	const h =
			{
				xs: 'xs',
				sm: 'sm',
				md: 'sm',
				lg: 'md',
				xl: 'lg',
			}[a] || 'sm',
		q =
			{
				primary: 'primary',
				secondary: 'secondary',
				tertiary: 'secondary',
				active: 'primary',
			}[i] || 'primary',
		P = o
			? Mt({
					size: h,
					variant: q,
					animated: !0,
					className: 'ubits-button__spinner',
				})
			: '';
	let S = '';
	o && n
		? (S = `${P}<span class="button-text">${n}</span>`)
		: o && !r
			? (S = P)
			: o && r
				? c === 'right'
					? (S = `<span class="button-text">${r}</span>${P}`)
					: (S = `${P}<span class="button-text">${r}</span>`)
				: e && d
					? (S = I)
					: L && r
						? g && d && c === 'left'
							? (S = `${V(d, p)}<span>${r}</span>${V('chevron-down', p)}`)
							: $ === 'right'
								? (S = `<span>${r}</span>${L}`)
								: (S = `${L}<span>${r}</span>`)
						: r
							? (S = g ? `<span>${r}</span>${V('chevron-down', p)}` : `<span>${r}</span>`)
							: L && (S = L);
	const H = u ? '<span class="ubits-button__badge"></span>' : '',
		D = e && x && v ? `title="${v}"` : '';
	return `
    <button class="${f}" ${M} ${D}>
      ${S}
      ${H}
    </button>
  `.trim();
}
function lt(t) {
	const { orientation: i = 'vertical', state: a = 'default', className: r = '' } = t;
	return `
    <div class="${['ubits-scrollbar', `ubits-scrollbar--${i}`, a ? `ubits-scrollbar--${a}` : '', r]
			.filter(Boolean)
			.join(' ')}">
      <div class="ubits-scrollbar__bar"></div>
    </div>
  `.trim();
}
function Z(t) {
	const {
		containerId: i,
		targetId: a,
		orientation: r = 'vertical',
		state: d = 'default',
		className: p = '',
	} = t;
	let e;
	i ? (e = document.getElementById(i) || document.body) : (e = document.body);
	const s = document.createElement('div');
	s.innerHTML = lt({ orientation: r, state: d, className: p });
	const o = s.firstElementChild;
	if (!o) throw new Error('No se pudo crear el scrollbar');
	const n = o.querySelector('.ubits-scrollbar__bar');
	if (!n) throw new Error('No se pudo encontrar la barra del scrollbar');
	let u = null;
	if (a) u = document.getElementById(a);
	else if (i) {
		const v = e.querySelector('[data-scrollable]');
		v && (u = v);
	}
	const l = () => {
			if (!u || !n) return;
			const v = r === 'vertical',
				f = v ? 'scrollTop' : 'scrollLeft',
				M = v ? 'clientHeight' : 'clientWidth',
				I = v ? 'scrollHeight' : 'scrollWidth',
				L = u[f],
				$ = u[M],
				C = u[I];
			if (C <= $) {
				n.style.opacity = '0';
				return;
			}
			const h = v ? o.clientHeight : o.clientWidth,
				T = Math.max(($ / C) * h, 20),
				q = h - T,
				P = (L / (C - $)) * q;
			v
				? ((n.style.height = `${T}px`), (n.style.transform = `translateY(${P}px)`))
				: ((n.style.width = `${T}px`), (n.style.transform = `translateX(${P}px)`)),
				(n.style.opacity = '1');
		},
		y = (v) => {
			if (!u || !n || v.target === n) return;
			v.preventDefault(), v.stopPropagation();
			const f = r === 'vertical',
				M = o.getBoundingClientRect(),
				I = f ? v.clientY - M.top : v.clientX - M.left,
				L = f ? o.clientHeight : o.clientWidth,
				$ = I / L,
				C = f ? 'clientHeight' : 'clientWidth',
				h = f ? 'scrollHeight' : 'scrollWidth',
				T = f ? 'scrollTop' : 'scrollLeft',
				q = u[C],
				S = u[h] - q;
			u[T] = $ * S;
		};
	let w = !1,
		c = 0,
		b = 0;
	const m = (v) => {
			if (!u || !n || v.target !== n) return;
			v.preventDefault(), v.stopPropagation(), (w = !0);
			const f = r === 'vertical';
			(c = f ? v.clientY : v.clientX),
				(b = f ? u.scrollTop : u.scrollLeft),
				document.addEventListener('mousemove', g),
				document.addEventListener('mouseup', x);
		},
		g = (v) => {
			if (!w || !u || !n) return;
			const f = r === 'vertical',
				I = (f ? v.clientY : v.clientX) - c,
				L = f ? o.clientHeight : o.clientWidth,
				$ = f ? u.clientHeight : u.clientWidth,
				h = (f ? u.scrollHeight : u.scrollWidth) - $,
				T = h / L,
				q = b + I * T;
			f
				? (u.scrollTop = Math.max(0, Math.min(h, q)))
				: (u.scrollLeft = Math.max(0, Math.min(h, q)));
		},
		x = () => {
			(w = !1),
				document.removeEventListener('mousemove', g),
				document.removeEventListener('mouseup', x);
		};
	if (u) {
		u.addEventListener('scroll', l), u.addEventListener('resize', l);
		const v = new ResizeObserver(() => {
			l();
		});
		v.observe(u), (o.__resizeObserver = v);
	}
	return (
		o.addEventListener('click', y),
		n.addEventListener('mousedown', m),
		(o.__handleMouseUp = x),
		(o.__handleMouseMove = g),
		e.appendChild(o),
		setTimeout(() => {
			l();
		}, 100),
		{
			element: o,
			update: l,
			destroy: () => {
				if (u) {
					u.removeEventListener('scroll', l), u.removeEventListener('resize', l);
					const v = o.__resizeObserver;
					v && v.disconnect();
				}
				o.removeEventListener('click', y),
					n.removeEventListener('mousedown', m),
					o.__handleMouseUp &&
						(document.removeEventListener('mousemove', o.__handleMouseMove),
						document.removeEventListener('mouseup', o.__handleMouseUp)),
					o.remove();
			},
		}
	);
}
const Nt = /* @__PURE__ */ Object.freeze(
		/* @__PURE__ */ Object.defineProperty(
			{
				__proto__: null,
				createScrollbar: Z,
				renderScrollbar: lt,
			},
			Symbol.toStringTag,
			{ value: 'Module' },
		),
	),
	it = {
		// Estados verdes (success) - Valores exactos de Figma
		completed: {
			bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
			text: 'var(--ubits-feedback-success-text, #223b16)',
			border: 'var(--ubits-feedback-success-border, #41c433)',
		},
		published: {
			bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
			text: 'var(--ubits-feedback-success-text, #223b16)',
			border: 'var(--ubits-feedback-success-border, #41c433)',
		},
		fulfilled: {
			bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
			text: 'var(--ubits-feedback-success-text, #223b16)',
			border: 'var(--ubits-feedback-success-border, #41c433)',
		},
		created: {
			bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
			text: 'var(--ubits-feedback-success-text, #223b16)',
			border: 'var(--ubits-feedback-success-border, #41c433)',
		},
		active: {
			bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
			text: 'var(--ubits-feedback-success-text, #223b16)',
			border: 'var(--ubits-feedback-success-border, #41c433)',
		},
		// Estados rojos (error) - Valores exactos de Figma
		'not-fulfilled': {
			bg: 'var(--ubits-feedback-error-bg, #fff0ee)',
			text: 'var(--ubits-feedback-error-text, #65181e)',
			border: 'var(--ubits-feedback-error-border, #fd8a82)',
		},
		denied: {
			bg: 'var(--ubits-feedback-error-bg, #fff0ee)',
			text: 'var(--ubits-feedback-error-text, #65181e)',
			border: 'var(--ubits-feedback-error-border, #fd8a82)',
		},
		// Estados azules (info) - Valores exactos de Figma con gradiente
		draft: {
			bg: 'rgba(12, 91, 239, 0.15)',
			text: 'var(--ubits-feedback-info-text, #212f70)',
			border: 'var(--ubits-accent-brand-static-inverted, #0c5bef)',
		},
		'in-progress': {
			bg: 'rgba(12, 91, 239, 0.15)',
			text: 'var(--ubits-feedback-info-text, #212f70)',
			border: 'var(--ubits-accent-brand-static-inverted, #0c5bef)',
		},
		syncing: {
			bg: 'rgba(12, 91, 239, 0.15)',
			text: 'var(--ubits-feedback-info-text, #212f70)',
			border: 'var(--ubits-accent-brand-static-inverted, #0c5bef)',
		},
		// Estados naranjas/amarillos (warning) - Valores exactos de Figma
		pending: {
			bg: 'var(--ubits-feedback-warning-bg, #fff1e0)',
			text: 'var(--ubits-feedback-warning-text, #4c2e15)',
			border: 'var(--ubits-feedback-warning-border, #ec9907)',
		},
		'pending-approval': {
			bg: 'var(--ubits-feedback-warning-bg, #fff1e0)',
			text: 'var(--ubits-feedback-warning-text, #4c2e15)',
			border: 'var(--ubits-feedback-warning-border, #ec9907)',
		},
		// Estados grises (neutral) - Valores exactos de Figma
		'not-started': {
			bg: 'var(--ubits-bg-2, #f3f3f4)',
			text: 'var(--ubits-fg-1-medium, #2b3543)',
			border: 'var(--ubits-border-1, #a8abb2)',
		},
		finished: {
			bg: 'var(--ubits-bg-2, #f3f3f4)',
			text: 'var(--ubits-fg-1-medium, #2b3543)',
			border: 'var(--ubits-border-1, #a8abb2)',
		},
		archived: {
			bg: 'var(--ubits-bg-2, #f3f3f4)',
			text: 'var(--ubits-fg-1-medium, #2b3543)',
			border: 'var(--ubits-border-1, #a8abb2)',
		},
		disabled: {
			bg: 'var(--ubits-bg-2, #f3f3f4)',
			text: 'var(--ubits-fg-1-medium, #2b3543)',
			border: 'var(--ubits-border-1, #a8abb2)',
		},
		paused: {
			bg: 'var(--ubits-bg-2, #f3f3f4)',
			text: 'var(--ubits-fg-1-medium, #2b3543)',
			border: 'var(--ubits-border-1, #a8abb2)',
		},
		hidden: {
			bg: 'var(--ubits-bg-2, #f3f3f4)',
			text: 'var(--ubits-fg-1-medium, #2b3543)',
			border: 'var(--ubits-border-1, #a8abb2)',
		},
	};
function Pt(t = {}) {
	const {
			label: i = '',
			size: a = 'md',
			status: r = 'pending',
			leftIcon: d,
			rightIcon: p = 'chevron-down',
			clickable: e = !1,
			className: s = '',
		} = t,
		o = it[r] || it.pending,
		n = d ? `<span class="ubits-status-tag-left-icon"><i class="far fa-${d}"></i></span>` : '',
		u =
			p != null
				? `<span class="ubits-status-tag-right-icon"><i class="far fa-${p}"></i></span>`
				: '',
		l = ['ubits-status-tag', `ubits-status-tag--${a}`, e ? 'ubits-status-tag--clickable' : '', s]
			.filter(Boolean)
			.join(' '),
		c = `
    ${r === 'draft' || r === 'in-progress' || r === 'syncing' ? `background: linear-gradient(90deg, rgba(12, 91, 239, 0.15) 0%, rgba(12, 91, 239, 0.15) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%); background-color: ${o.bg};` : `background-color: ${o.bg};`}
    color: ${o.text};
    border-color: ${o.border};
  `.trim();
	return `
    <span class="${l}" style="${c}" data-status="${r}">
      ${n}
      <span class="ubits-status-tag-label">${i}</span>
      ${u}
    </span>
  `.trim();
}
function qt(t) {
	const {
			title: i,
			complementaryText: a,
			width: r = 40,
			bodyContent: d = '',
			footerButtons: p,
			className: e = '',
		} = t,
		o = ['ubits-drawer', `ubits-drawer--width-${r}`, e].filter(Boolean).join(' '),
		n = `
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${i}</p>
        </div>
        ${
					a
						? `
        <div class="ubits-drawer__header-complementary">
          <p class="ubits-body-sm-regular">${a}</p>
        </div>
        `
						: ''
				}
      </div>
      ${rt({
				variant: 'secondary',
				size: 'md',
				icon: 'fa-times',
				iconOnly: !0,
				className: 'ubits-drawer__close',
			})}
    </div>
  `,
		l = `
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${typeof d == 'function' ? d() : d || '<div class="ubits-drawer__placeholder">Contenido del drawer</div>'}
      </div>
      <div class="ubits-drawer__scrollbar">
        <div class="ubits-drawer__scrollbar-bar"></div>
      </div>
    </div>
  `,
		y = p
			? `
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        ${
					p.tertiary
						? `
        <div class="ubits-drawer__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${p.tertiary.label}</span>
          </button>
        </div>
        `
						: ''
				}
        <div class="ubits-drawer__footer-right">
          ${
						p.secondary
							? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${p.secondary.label}</span>
          </button>
          `
							: ''
					}
          ${
						p.primary
							? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${p.primary.label}</span>
          </button>
          `
							: ''
					}
        </div>
      </div>
    </div>
  `
			: '';
	return `
    <div class="ubits-drawer-overlay">
      <div class="${o}">
        ${n}
        ${l}
        ${y}
      </div>
    </div>
  `.trim();
}
function Ht(t) {
	var c, b, m;
	const { containerId: i, onClose: a, closeOnOverlayClick: r = !0, open: d = !1 } = t;
	let p;
	i ? (p = document.getElementById(i) || document.body) : (p = document.body);
	const e = document.createElement('div');
	e.innerHTML = qt(t);
	const s = e.firstElementChild;
	if (!s) throw new Error('No se pudo crear el drawer');
	s.querySelector('.ubits-drawer');
	const o = s.querySelector('.ubits-drawer__close'),
		n = s,
		u = () => {
			s.classList.add('ubits-drawer-overlay--open'), (document.body.style.overflow = 'hidden');
		},
		l = () => {
			s.classList.remove('ubits-drawer-overlay--open'),
				(document.body.style.overflow = ''),
				a && a();
		},
		y = (g) => {
			const x = s.querySelector('.ubits-drawer__body-content');
			if (x) {
				const v = typeof g == 'function' ? g() : g;
				x.innerHTML = v;
			}
		};
	o &&
		o.addEventListener('click', (g) => {
			g.preventDefault(), g.stopPropagation(), l();
		}),
		r &&
			n &&
			n.addEventListener('click', (g) => {
				g.target === n && l();
			});
	const w = (g) => {
		g.key === 'Escape' && s.classList.contains('ubits-drawer-overlay--open') && l();
	};
	if ((document.addEventListener('keydown', w), t.footerButtons)) {
		const g = s.querySelector('.ubits-drawer__footer-left .ubits-drawer__footer-button'),
			x = s.querySelector('.ubits-drawer__footer-right .ubits-button--secondary'),
			v = s.querySelector('.ubits-drawer__footer-right .ubits-button--primary');
		g &&
			(c = t.footerButtons.tertiary) != null &&
			c.onClick &&
			g.addEventListener('click', (f) => {
				f.preventDefault(), t.footerButtons.tertiary.onClick(f);
			}),
			x &&
				(b = t.footerButtons.secondary) != null &&
				b.onClick &&
				x.addEventListener('click', (f) => {
					f.preventDefault(), t.footerButtons.secondary.onClick(f);
				}),
			v &&
				(m = t.footerButtons.primary) != null &&
				m.onClick &&
				v.addEventListener('click', (f) => {
					f.preventDefault(), t.footerButtons.primary.onClick(f);
				});
	}
	return (
		p.appendChild(s),
		d && u(),
		{
			element: s,
			open: u,
			close: l,
			updateContent: y,
		}
	);
}
function nt(t) {
	const {
			label: i,
			complementaryText: a,
			value: r = '',
			name: d = '',
			checked: p = !1,
			indeterminate: e = !1,
			size: s = 'md',
			state: o = 'default',
			disabled: n = !1,
			className: u = '',
		} = t,
		l = n || o === 'disabled',
		y = [
			'ubits-checkbox',
			`ubits-checkbox--${s}`,
			o !== 'default' ? `ubits-checkbox--${o}` : '',
			p ? 'ubits-checkbox--checked' : '',
			e ? 'ubits-checkbox--indeterminate' : '',
			l ? 'ubits-checkbox--disabled' : '',
			u,
		]
			.filter(Boolean)
			.join(' '),
		w = `
    <input
      type="checkbox"
      id="checkbox-${d}-${r || 'default'}"
      ${d ? `name="${d}"` : ''}
      ${r ? `value="${r}"` : ''}
      ${p ? 'checked' : ''}
      ${e ? 'data-indeterminate="true"' : ''}
      ${l ? 'disabled' : ''}
      class="ubits-checkbox__input"
    />
  `,
		c = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${e ? '<span class="ubits-checkbox__indeterminate"></span>' : ''}
      ${p && !e ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
      ${!p && !e && o === 'active' ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
    </span>
  `,
		b = `
    <span class="ubits-checkbox__label">${i}</span>
  `,
		m = a ? `<span class="ubits-checkbox__complementary-text">${a}</span>` : '',
		g = `
    <div class="ubits-checkbox__text-content">
      ${b}
      ${m}
    </div>
  `;
	return `
    <label class="${y}">
      ${w}
      ${c}
      ${g}
    </label>
  `.trim();
}
function ct(t) {
	const {
			title: i,
			description: a,
			imageUrl: r,
			icon: d,
			iconSize: p = 'lg',
			actionLabel: e,
			onAction: s,
			showPrimaryButton: o = !1,
			primaryButtonIcon: n,
			showPrimaryButtonIcon: u = !1,
			secondaryActionLabel: l,
			onSecondaryAction: y,
			showSecondaryButton: w = !1,
			secondaryButtonIcon: c,
			showSecondaryButtonIcon: b = !1,
			className: m = '',
			style: g = '',
		} = t,
		x = ['ubits-empty-state', 'ubits-empty-state--default', m].filter(Boolean).join(' '),
		v = g ? ` style="${g}"` : '';
	let f = '';
	r
		? (f = `
      <div class="ubits-empty-state__image">
        <img src="${r}" alt="${i}" />
      </div>
    `)
		: d &&
			(f = `
      <div class="ubits-empty-state__icon">
        <i class="far fa-${d}"></i>
      </div>
    `);
	let M = '',
		I = e || '';
	u && n && (I = `<i class="far fa-${n}"></i> ${I}`);
	let L = l || '';
	b && c && (L = `<i class="far fa-${c}"></i> ${L}`);
	const $ =
			o && e
				? `<button class="ubits-button ubits-button--primary ubits-button--sm" data-action="primary" type="button">${I}</button>`
				: '',
		C =
			w && l
				? `<button class="ubits-button ubits-button--secondary ubits-button--sm" data-action="secondary" type="button">${L}</button>`
				: '';
	return (
		($ || C) &&
			(M = `
      <div class="ubits-empty-state__actions">
        ${C}
        ${$}
      </div>
    `),
		`
    <div class="${x}"${v}>
      ${f}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${i}</h3>
        ${a ? `<p class="ubits-empty-state__description">${a}</p>` : ''}
      </div>
      ${M}
    </div>
  `.trim()
	);
}
const zt = {
	bajo: {
		status: 'completed',
		// Verde
		label: 'Bajo',
	},
	medio: {
		status: 'pending',
		// Naranja/Amarillo
		label: 'Medio',
	},
	alto: {
		status: 'not-fulfilled',
		// Rojo
		label: 'Alto',
	},
	'muy-alto': {
		status: 'denied',
		// Rojo
		label: 'Muy alto',
	},
};
function F(t) {
	return typeof t != 'string'
		? ''
		: t
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;');
}
function Rt(t) {
	const i = zt[t],
		a = {
			label: i.label,
			size: 'xs',
			status: i.status,
			rightIcon: null,
			// Sin icono derecho
			className: 'ubits-participants-menu__status-tag',
		};
	return Pt(a);
}
function At(t) {
	const i = {
		size: 'sm',
		// 28px para el menú de participantes
		alt: t.name,
		className: 'ubits-participants-menu__avatar',
	};
	return t.avatarImage ? (i.imageUrl = t.avatarImage) : (i.initials = t.name), vt(i);
}
function dt(t, i, a = !0, r = !0, d = !0) {
	const p = ['ubits-participants-menu__item', i ? 'ubits-participants-menu__item--selected' : '']
			.filter(Boolean)
			.join(' '),
		e = i
			? 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static, #0c5bef))'
			: 'var(--ubits-fg-1-high, #303a47)',
		s = d && t.status ? Rt(t.status) : '',
		o = a ? At(t) : '';
	return `
    <div class="${p}" data-participant-id="${F(t.id)}" style="
      display: flex;
      align-items: center;
      gap: var(--ubits-spacing-sm, 8px);
      padding: 8px 12px;
      max-height: 46px;
      min-height: 46px;
      box-sizing: border-box;
      border-radius: var(--ubits-border-radius-md, 6px);
      cursor: pointer;
      transition: background-color 0.2s ease;
      ${i ? 'background-color: var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15));' : ''}
    ">
      ${o}
      <div class="ubits-participants-menu__item-content" style="
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0px;
        justify-content: center;
      ">
        <div class="ubits-participants-menu__item-name ubits-body-sm-bold" style="
          color: ${e};
          font-size: var(--font-body-sm-size, 13px);
          font-weight: var(--weight-bold, 700);
          line-height: var(--font-body-sm-line, 19.5px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
        ">
          ${F(t.name)}
        </div>
        ${
					r
						? `
        <div class="ubits-participants-menu__item-role ubits-body-sm-regular" style="
          color: var(--ubits-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
          font-weight: var(--weight-regular, 400);
          line-height: var(--font-body-sm-line, 19.5px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
          margin-top: -2px;
        ">
          ${F(t.role)}
        </div>
        `
						: ''
				}
      </div>
      ${s ? `<div style="flex-shrink: 0;">${s}</div>` : ''}
    </div>
  `.trim();
}
function at(t) {
	var $, C;
	const {
			title: i = 'Participantes',
			searchPlaceholder: a = 'Buscar participan...',
			participants: r = [],
			selectedParticipantId: d,
			className: p = '',
			showAvatar: e = !0,
			showRole: s = !0,
			showStatusTag: o = !0,
			enableScrollbar: n = !0,
		} = t,
		u = ['ubits-participants-menu', p].filter(Boolean).join(' '),
		y = n ? r : r.slice(0, 6),
		w = y
			.map((h) => {
				const T = h.id === d;
				return dt(h, T, e, s, o);
			})
			.join(''),
		c =
			t.searchInputId ||
			(t.containerId
				? `participants-menu-search-${t.containerId}`
				: `participants-menu-search-${Date.now()}`),
		b = a,
		m = t.activeFilters || { roles: [], statuses: [] },
		g =
			((($ = m.roles) == null ? void 0 : $.length) || 0) +
			(((C = m.statuses) == null ? void 0 : C.length) || 0),
		x = {
			variant: 'secondary',
			size: 'md',
			icon: 'filter',
			iconStyle: 'regular',
			iconOnly: !0,
			active: g > 0,
			badge: g > 0,
			// Solo mostrar badge si hay filtros activos
			className: 'ubits-participants-menu__filter-button',
		};
	let v = rt(x);
	if (g > 0) {
		const h = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${g}</span>`;
		v = v.replace('<span class="ubits-button__badge"></span>', h);
	} else v = v.replace(/<span class="ubits-button__badge"><\/span>/g, '');
	const f = y.length === 0,
		M = t.searchTerm && t.searchTerm.trim() !== '',
		I = g > 0;
	let L = '';
	if (f) {
		let h;
		M
			? (h = {
					title: 'No se encontraron resultados',
					description: 'Intenta con otros términos de búsqueda',
					icon: 'search',
				})
			: I
				? (h = {
						title: 'No hay resultados',
						description: 'No se encontraron participantes con los filtros aplicados',
						icon: 'filter',
					})
				: (h = {
						title: 'No hay participantes',
						description: 'No hay participantes para mostrar',
						icon: 'users',
					}),
			h &&
				(L = ct({
					title: F(h.title),
					description: h.description ? F(h.description) : void 0,
					icon: h.icon,
				}));
	}
	return `
    <div class="${u}">
      <div class="ubits-participants-menu__header">
        <h2 class="ubits-participants-menu__title ubits-body-md-bold" style="
          margin: 0;
          font-size: var(--font-body-md-size, 15px);
          font-weight: var(--weight-bold, 700);
          line-height: var(--font-body-md-line, 22.5px);
          color: var(--ubits-fg-1-high, #303a47);
          margin-bottom: var(--ubits-spacing-md, 16px);
        ">
          ${F(i)}
        </h2>
        <div class="ubits-participants-menu__search-container" style="
          display: flex;
          gap: var(--ubits-spacing-sm, 8px);
          margin-bottom: var(--ubits-spacing-md, 16px);
        ">
          <div class="ubits-participants-menu__search-input-wrapper" style="
            flex: 1;
          ">
            <div id="${c}" data-search-placeholder="${F(b)}"></div>
          </div>
          <div class="ubits-participants-menu__filter-button-wrapper">
            ${v}
          </div>
        </div>
      </div>
      <div class="ubits-participants-menu__list-wrapper" style="
        display: flex;
        flex: 1;
        min-height: 0;
        position: relative;
      ">
        <div 
          class="ubits-participants-menu__list" 
          id="participants-menu-list-${Date.now()}"
          data-scrollable="true"
          ${n ? 'data-ubits-scrollbar="true"' : ''}
          style="
            display: flex;
            flex-direction: column;
            gap: 2px;
            ${n ? 'overflow-y: auto;' : 'overflow-y: hidden;'}
            flex: 1;
            min-height: 0;
          "
        >
          ${f ? L : w}
        </div>
      </div>
    </div>
  `.trim();
}
function Dt(t) {
	const {
		containerId: i,
		onParticipantSelect: a,
		onSearchChange: r,
		onFilterClick: d,
		onFilterChange: p,
		...e
	} = t;
	let s = {
			roles: [],
			statuses: [],
		},
		o = '';
	const n = Array.from(new Set(e.participants.map(($) => $.role))).sort(),
		u = ['bajo', 'medio', 'alto', 'muy-alto'],
		l = i ? `participants-menu-search-${i}` : `participants-menu-search-${Date.now()}`,
		y = () =>
			at({
				...e,
				searchInputId: l,
				activeFilters: s,
				searchTerm: o,
			}),
		w = document.createElement('div'),
		c = y();
	w.innerHTML = c;
	const b = w.firstElementChild;
	if (!b)
		throw (
			(console.error('❌ [ParticipantsMenu] No se pudo crear el elemento del menú'),
			new Error('No se pudo crear el menú de participantes'))
		);
	const m = () => {
		let $ = null;
		if (i) {
			if ((($ = document.getElementById(i)), !$)) {
				console.error('❌ [ParticipantsMenu] No se encontró el contenedor con ID:', i);
				const k = document.querySelectorAll(`[id="${i}"]`);
				k.length > 0
					? ($ = k[0])
					: (console.error('❌ [ParticipantsMenu] No se encontró ningún elemento con ese ID'),
						($ = document.body));
			}
		} else $ = document.body;
		if (!$) {
			console.error('❌ [ParticipantsMenu] No se pudo obtener un contenedor válido');
			return;
		}
		$.appendChild(b), f(), v();
		const C = () => {
			const k = n
					.map((E, B) => {
						const z = `filter-role-${B}`;
						return `
          <div class="ubits-participants-menu__filter-item" data-filter-role="${E}">
            <div id="${z}"></div>
          </div>
        `;
					})
					.join(''),
				_ = u
					.map((E, B) => {
						const z = `filter-status-${B}`;
						return `
          <div class="ubits-participants-menu__filter-item" data-filter-status="${E}">
            <div id="${z}"></div>
          </div>
        `;
					})
					.join('');
			return `
        <div class="ubits-participants-menu__filters-container" style="padding: var(--ubits-spacing-lg, 24px);">
          <div style="margin-bottom: var(--ubits-spacing-lg, 24px);">
            <h3 style="
              font-size: var(--font-body-md-size, 15px);
              font-weight: var(--weight-bold, 700);
              color: var(--ubits-fg-1-high, #303a47);
              margin: 0 0 var(--ubits-spacing-md, 16px) 0;
            ">Rol</h3>
            <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-sm, 8px);">
              ${k}
            </div>
          </div>
          <div style="margin-bottom: var(--ubits-spacing-lg, 24px);">
            <h3 style="
              font-size: var(--font-body-md-size, 15px);
              font-weight: var(--weight-bold, 700);
              color: var(--ubits-fg-1-high, #303a47);
              margin: 0 0 var(--ubits-spacing-md, 16px) 0;
            ">Estado</h3>
            <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-sm, 8px);">
              ${_}
            </div>
          </div>
        </div>
      `;
		};
		let h = null,
			T = [];
		const q = () => {
				if (h)
					try {
						h.updateContent(C);
					} catch (k) {
						if ((console.error('❌ [ParticipantsMenu] Error al actualizar drawer:', k), h)) {
							h.element.remove(), (h = null), q();
							return;
						}
					}
				else
					try {
						h = Ht({
							title: 'Filtros',
							complementaryText: 'Selecciona los filtros que deseas aplicar',
							width: 40,
							bodyContent: C,
							footerButtons: {
								secondary: {
									label: 'Limpiar',
									onClick: (k) => {
										k.preventDefault(),
											k.stopPropagation(),
											(s = { roles: [], statuses: [] }),
											v(),
											p && p(s),
											h &&
												(h.updateContent(C),
												setTimeout(() => {
													P();
												}, 100));
									},
								},
								primary: {
									label: 'Aplicar',
									onClick: (k) => {
										k.preventDefault(), k.stopPropagation();
										const _ = {
											roles: [],
											statuses: [],
										};
										h &&
											(n.forEach((E, B) => {
												const z = h.element.querySelector(`[data-filter-role="${E}"]`);
												if (z) {
													const N = z.querySelector('.ubits-checkbox__input');
													N && N.checked && _.roles.push(E);
												}
											}),
											u.forEach((E, B) => {
												const z = h.element.querySelector(`[data-filter-status="${E}"]`);
												if (z) {
													const N = z.querySelector('.ubits-checkbox__input');
													N && N.checked && _.statuses.push(E);
												}
											})),
											(s = _),
											v(),
											p && p(s),
											h && h.close();
									},
								},
							},
							closeOnOverlayClick: !0,
							onClose: () => {
								T.forEach((k) => {
									try {
										k.destroy();
									} catch {}
								}),
									(T = []);
							},
						});
					} catch (k) {
						console.error('❌ [ParticipantsMenu] Error al crear drawer:', k), d && d();
						return;
					}
				h &&
					(h.open(),
					setTimeout(() => {
						P();
					}, 300));
			},
			P = () => {
				if (!h) return;
				T.forEach((_) => {
					try {
						_.destroy();
					} catch {}
				}),
					(T = []),
					n.forEach((_, E) => {
						const B = `filter-role-${E}`,
							z = h.element.querySelector(`#${B}`);
						if (z) {
							z.innerHTML = '';
							const N = s.roles.includes(_),
								O = nt({
									label: _,
									name: 'filter-role',
									value: _,
									checked: N,
									size: 'md',
								}),
								W = document.createElement('div');
							W.innerHTML = O.trim();
							const R = W.firstElementChild;
							if (R) {
								z.appendChild(R);
								const U = R.querySelector('.ubits-checkbox__input'),
									j = R.querySelector('.ubits-checkbox__square');
								U &&
									j &&
									U.addEventListener('change', (Y) => {
										const G = Y.target.checked;
										R.classList.toggle('ubits-checkbox--checked', G);
										let A = j.querySelector('.ubits-checkbox__checkmark');
										G
											? (A ||
													((A = document.createElement('span')),
													(A.className = 'ubits-checkbox__checkmark'),
													j.appendChild(A)),
												(A.style.opacity = '1'),
												(A.style.transform = 'scale(1)'))
											: A && ((A.style.opacity = '0'), (A.style.transform = 'scale(0)'));
									}),
									T.push({
										element: R,
										destroy: () => {
											R.parentNode && R.parentNode.removeChild(R);
										},
										update: () => {},
									});
							}
						}
					});
				const k = {
					bajo: 'Bajo',
					medio: 'Medio',
					alto: 'Alto',
					'muy-alto': 'Muy Alto',
				};
				u.forEach((_, E) => {
					const B = `filter-status-${E}`,
						z = h.element.querySelector(`#${B}`);
					if (z) {
						z.innerHTML = '';
						const N = s.statuses.includes(_),
							O = nt({
								label: k[_],
								name: 'filter-status',
								value: _,
								checked: N,
								size: 'md',
							}),
							W = document.createElement('div');
						W.innerHTML = O.trim();
						const R = W.firstElementChild;
						if (R) {
							z.appendChild(R);
							const U = R.querySelector('.ubits-checkbox__input'),
								j = R.querySelector('.ubits-checkbox__square');
							U &&
								j &&
								U.addEventListener('change', (Y) => {
									const G = Y.target.checked;
									R.classList.toggle('ubits-checkbox--checked', G);
									let A = j.querySelector('.ubits-checkbox__checkmark');
									G
										? (A ||
												((A = document.createElement('span')),
												(A.className = 'ubits-checkbox__checkmark'),
												j.appendChild(A)),
											(A.style.opacity = '1'),
											(A.style.transform = 'scale(1)'))
										: A && ((A.style.opacity = '0'), (A.style.transform = 'scale(0)'));
								}),
								T.push({
									element: R,
									destroy: () => {
										R.parentNode && R.parentNode.removeChild(R);
									},
									update: () => {},
								});
						}
					}
				});
			},
			S = b.querySelector('.ubits-participants-menu__filter-button');
		S &&
			S.addEventListener('click', () => {
				d && d(), q();
			}),
			b.querySelectorAll('[data-participant-id]').forEach((k) => {
				const _ = k.getAttribute('data-participant-id');
				k.addEventListener('click', () => {
					if (_ && a) {
						b.querySelectorAll('.ubits-participants-menu__item--selected').forEach((N) => {
							N.classList.remove('ubits-participants-menu__item--selected');
							const O = N.querySelector('.ubits-participants-menu__item-name');
							O && (O.style.color = 'var(--ubits-fg-1-high, #303a47)'),
								(N.style.backgroundColor = '');
						}),
							k.classList.add('ubits-participants-menu__item--selected');
						const B = k.querySelector('.ubits-participants-menu__item-name');
						B &&
							(B.style.color =
								'var(--ubits-button-active-fg, var(--ubits-accent-brand-static, #0c5bef))'),
							(k.style.backgroundColor = 'var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15))'),
							b.querySelectorAll('.ubits-participants-menu__item--selected').length > 1;
						try {
							a(_);
						} catch (N) {
							console.error('❌ [ParticipantsMenu] Error al ejecutar onParticipantSelect:', N);
						}
					}
				});
			});
		let D = null;
		if (e.enableScrollbar !== !1) {
			const k = b.querySelector('[data-scrollable="true"]');
			if (k && k.id) {
				const _ = b.querySelector('.ubits-participants-menu__list-wrapper');
				if (_) {
					const E = `participants-menu-scrollbar-${Date.now()}`;
					(D = document.createElement('div')),
						(D.id = E),
						(D.style.cssText = `
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 8px;
            pointer-events: none;
          `),
						(_.style.position = 'relative'),
						_.appendChild(D),
						Z({
							containerId: E,
							targetId: k.id,
							orientation: 'vertical',
						});
				}
			}
		} else {
			const k = b.querySelector('[data-scrollable="true"]');
			k && k.removeAttribute('data-ubits-scrollbar');
		}
	};
	let g = null,
		x = !1;
	const v = () => {
			var T, q;
			const $ = b.querySelector('.ubits-participants-menu__filter-button');
			if (!$) return;
			const C =
					(((T = s.roles) == null ? void 0 : T.length) || 0) +
					(((q = s.statuses) == null ? void 0 : q.length) || 0),
				h = $.querySelector('.ubits-button__badge');
			if (C > 0) {
				if (h)
					if (h.classList.contains('ubits-badge--number')) h.textContent = `${C}`;
					else {
						const P = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${C}</span>`,
							S = document.createElement('div');
						S.innerHTML = P;
						const H = S.firstElementChild;
						H && h.parentNode && h.parentNode.replaceChild(H, h);
					}
				else {
					const P = document.createElement('span');
					(P.className =
						'ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge'),
						(P.textContent = `${C}`),
						$.appendChild(P);
				}
				$.classList.add('ubits-button--active');
			} else h && h.remove(), $.classList.remove('ubits-button--active');
		},
		f = () => {
			setTimeout(() => {
				const $ = b.querySelector(`#${l}`);
				if ($) {
					const C =
							$.getAttribute('data-search-placeholder') ||
							t.searchPlaceholder ||
							'Buscar participan...',
						h = t.preservedSearchValue || '',
						T = {
							containerId: l,
							type: 'search',
							size: 'md',
							placeholder: C,
							showLabel: !1,
							className: 'ubits-participants-menu__search-input',
							value: h,
							onChange: (q, P) => {
								if (!x) {
									if (((o = q || ''), r))
										try {
											r(q);
										} catch (S) {
											console.error('[ParticipantsMenu] Error en onSearchChange:', S);
										}
									v();
								}
							},
						};
					h && (x = !0),
						(g = xt(T)),
						g != null && g.inputElement
							? (h && g.inputElement.value !== h && g.setValue(h),
								setTimeout(() => {
									x = !1;
								}, 150))
							: ((x = !1), console.error('[ParticipantsMenu] No se pudo crear input'));
				}
			}, 0);
		};
	i
		? requestAnimationFrame(() => {
				document.getElementById(i) ? m() : requestAnimationFrame(m);
			})
		: m();
	const M = ($, C) => {
		var _, E;
		const h = b.querySelector('.ubits-participants-menu__list');
		if (!h) return;
		const q = e.enableScrollbar !== !1 ? $ : $.slice(0, 6),
			P = q
				.map((B) => {
					const z = B.id === C;
					return dt(B, z, e.showAvatar !== !1, e.showRole !== !1, e.showStatusTag !== !1);
				})
				.join(''),
			S = q.length === 0,
			H = o && o.trim() !== '',
			D =
				(((_ = s.roles) == null ? void 0 : _.length) || 0) +
					(((E = s.statuses) == null ? void 0 : E.length) || 0) >
				0;
		let k = '';
		if (S) {
			let B;
			H
				? (B = {
						title: 'No se encontraron resultados',
						description: 'Intenta con otros términos de búsqueda',
						icon: 'search',
					})
				: D
					? (B = {
							title: 'No hay resultados',
							description: 'No se encontraron participantes con los filtros aplicados',
							icon: 'filter',
						})
					: (B = {
							title: 'No hay participantes',
							description: 'No hay participantes para mostrar',
							icon: 'users',
						}),
				B &&
					(k = ct({
						title: F(B.title),
						description: B.description ? F(B.description) : void 0,
						icon: B.icon,
					}));
		}
		(h.innerHTML = S ? k : P),
			S ||
				b.querySelectorAll('[data-participant-id]').forEach((z) => {
					var W;
					const N = z.getAttribute('data-participant-id'),
						O = z.cloneNode(!0);
					(W = z.parentNode) == null || W.replaceChild(O, z),
						O.addEventListener('click', () => {
							if (N && a) {
								b.querySelectorAll('.ubits-participants-menu__item--selected').forEach((j) => {
									j.classList.remove('ubits-participants-menu__item--selected');
									const Y = j.querySelector('.ubits-participants-menu__item-name');
									Y && (Y.style.color = 'var(--ubits-fg-1-high, #303a47)'),
										(j.style.backgroundColor = '');
								}),
									O.classList.add('ubits-participants-menu__item--selected');
								const U = O.querySelector('.ubits-participants-menu__item-name');
								U &&
									(U.style.color =
										'var(--ubits-button-active-fg, var(--ubits-accent-brand-static, #0c5bef))'),
									(O.style.backgroundColor =
										'var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15))');
								try {
									a(N);
								} catch (j) {
									console.error('❌ [ParticipantsMenu] Error al ejecutar onParticipantSelect:', j);
								}
							}
						});
				}),
			v();
	};
	return {
		element: b,
		update: ($) => {
			if (
				$.participants &&
				Object.keys($).every((S) => S === 'participants' || S === 'selectedParticipantId') &&
				g
			) {
				M($.participants, $.selectedParticipantId);
				return;
			}
			if ($.enableScrollbar !== void 0 && $.enableScrollbar !== e.enableScrollbar) {
				const S = b.querySelector('.ubits-participants-menu__list-wrapper');
				if (S) {
					const H = S.querySelector('[id^="participants-menu-scrollbar-"]');
					H && H.remove();
				}
			}
			const h = { ...e, ...$ },
				T = at({
					...h,
					searchInputId: l,
					activeFilters: s,
					searchTerm: o,
				}),
				q = document.createElement('div');
			q.innerHTML = T;
			const P = q.firstElementChild;
			if (P && b.parentNode)
				if (
					(b.parentNode.replaceChild(P, b), Object.assign(b, P), f(), v(), h.enableScrollbar !== !1)
				) {
					const S = b.querySelector('[data-scrollable="true"]');
					if (S && S.id) {
						const H = b.querySelector('.ubits-participants-menu__list-wrapper');
						if (H) {
							const D = `participants-menu-scrollbar-${Date.now()}`,
								k = document.createElement('div');
							(k.id = D),
								(k.style.cssText = `
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 8px;
              pointer-events: none;
            `),
								(H.style.position = 'relative'),
								H.appendChild(k),
								Z({
									containerId: D,
									targetId: S.id,
									orientation: 'vertical',
								});
						}
					}
				} else {
					const S = b.querySelector('[data-scrollable="true"]');
					S && S.removeAttribute('data-ubits-scrollbar');
				}
		},
		updateParticipantsList: M,
		// Exponer método para actualizar solo la lista
		destroy: () => {
			b.parentNode && b.parentNode.removeChild(b);
		},
	};
}
export { Nt as S, Dt as c, at as r };
