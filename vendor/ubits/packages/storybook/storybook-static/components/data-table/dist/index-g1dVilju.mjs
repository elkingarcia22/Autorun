function Me(t) {
	const {
			label: c,
			complementaryText: m,
			value: u = '',
			name: b = '',
			checked: l = !1,
			indeterminate: s = !1,
			size: d = 'md',
			state: o = 'default',
			disabled: r = !1,
			className: e = '',
		} = t,
		f = r || o === 'disabled',
		L = [
			'ubits-checkbox',
			`ubits-checkbox--${d}`,
			o !== 'default' ? `ubits-checkbox--${o}` : '',
			l ? 'ubits-checkbox--checked' : '',
			s ? 'ubits-checkbox--indeterminate' : '',
			f ? 'ubits-checkbox--disabled' : '',
			e,
		]
			.filter(Boolean)
			.join(' '),
		y = `
    <input
      type="checkbox"
      id="checkbox-${b}-${u || 'default'}"
      ${b ? `name="${b}"` : ''}
      ${u ? `value="${u}"` : ''}
      ${l ? 'checked' : ''}
      ${s ? 'data-indeterminate="true"' : ''}
      ${f ? 'disabled' : ''}
      class="ubits-checkbox__input"
    />
  `,
		i = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${s ? '<span class="ubits-checkbox__indeterminate"></span>' : ''}
      ${l && !s ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
      ${!l && !s && o === 'active' ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
    </span>
  `,
		T = `
    <span class="ubits-checkbox__label">${c}</span>
  `,
		w = m ? `<span class="ubits-checkbox__complementary-text">${m}</span>` : '',
		$ = `
    <div class="ubits-checkbox__text-content">
      ${T}
      ${w}
    </div>
  `;
	return `
    <label class="${L}">
      ${y}
      ${i}
      ${$}
    </label>
  `.trim();
}
const Xe = {
		yellow: 'var(--ubits-fg-yellow-subtle-inverted, #ffd555)',
		green: 'var(--ubits-feedback-accent-success, #56ce51)',
		gray: 'var(--ubits-bg-4, #dbdde0)',
		info: 'var(--ubits-feedback-accent-info-static-inverted, #4a74ee)',
		error: 'var(--ubits-button-badge, #cf0e34)',
	},
	et = {
		xs: { height: 4, indicatorFontSize: 'var(--font-body-xs-size, 11px)' },
		sm: { height: 8, indicatorFontSize: 'var(--font-body-sm-size, 13px)' },
		md: { height: 16, indicatorFontSize: 'var(--font-body-md-size, 16px)' },
		lg: { height: 20, indicatorFontSize: 'var(--font-body-lg-size, 18px)' },
	};
function tt(t) {
	const {
			size: c = 'md',
			value: m = 0,
			variant: u = 'default',
			segments: b = [],
			indicator: l,
			className: s = '',
		} = t,
		d = et[c],
		o = [
			'ubits-progress-bar',
			`ubits-progress-bar--${c}`,
			u === 'multi-color' ? 'ubits-progress-bar--multi-color' : '',
			s,
		]
			.filter(Boolean)
			.join(' ');
	let r = '';
	l !== void 0 &&
		l !== !1 &&
		(r = `<span class="ubits-progress-bar__indicator">${typeof l == 'string' ? l : `${Math.round(m)}%`}</span>`);
	let e = '';
	if (u === 'multi-color' && b.length > 0) {
		const f = b.reduce((T, w) => T + w.value, 0),
			L = Math.max(0, 100 - f),
			y = [...b];
		L > 0 && y.push({ value: L, color: 'gray' }),
			(e = `<div class="ubits-progress-bar__indicator-wrapper">${y
				.map((T, w) => {
					const $ = T.value,
						z = Xe[T.color] || Xe.gray,
						M = w === 0,
						S = w === y.length - 1;
					return `<div 
        class="ubits-progress-bar__segment" 
        style="width: ${$}%; background-color: ${z}; ${`border-radius: ${M ? '1000px 0 0 1000px' : S ? '0 1000px 1000px 0' : '0'};`}"
        data-color="${T.color}"
      ></div>`;
				})
				.join('')}</div>`);
	} else
		e = `<div 
      class="ubits-progress-bar__indicator-wrapper" 
      style="width: ${Math.max(0, Math.min(100, m))}%;"
    ></div>`;
	return `
    <div class="${o}" style="height: ${d.height}px;">
      <div class="ubits-progress-bar__container">
        ${e}
      </div>
      ${r}
    </div>
  `.trim();
}
const je = {
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
function ot(t = {}) {
	const {
			label: c = '',
			size: m = 'md',
			status: u = 'pending',
			leftIcon: b,
			rightIcon: l = 'chevron-down',
			clickable: s = !1,
			className: d = '',
		} = t,
		o = je[u] || je.pending,
		r = b ? `<span class="ubits-status-tag-left-icon"><i class="far fa-${b}"></i></span>` : '',
		e =
			l != null
				? `<span class="ubits-status-tag-right-icon"><i class="far fa-${l}"></i></span>`
				: '',
		f = ['ubits-status-tag', `ubits-status-tag--${m}`, s ? 'ubits-status-tag--clickable' : '', d]
			.filter(Boolean)
			.join(' '),
		i = `
    ${u === 'draft' || u === 'in-progress' || u === 'syncing' ? `background: linear-gradient(90deg, rgba(12, 91, 239, 0.15) 0%, rgba(12, 91, 239, 0.15) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%); background-color: ${o.bg};` : `background-color: ${o.bg};`}
    color: ${o.text};
    border-color: ${o.border};
  `.trim();
	return `
    <span class="${f}" style="${i}" data-status="${u}">
      ${r}
      <span class="ubits-status-tag-label">${c}</span>
      ${e}
    </span>
  `.trim();
}
function nt(t) {
	if (typeof window.renderBadge == 'function') return window.renderBadge(t);
	const { type: c, size: m, variant: u, absolute: b, position: l, className: s, content: d } = t,
		o = [
			'ubits-badge',
			`ubits-badge--${m}`,
			c === 'dot' ? 'ubits-badge--dot' : '',
			c === 'number' ? 'ubits-badge--number' : '',
			`ubits-badge--${u}`,
			b ? 'ubits-badge--absolute' : '',
			b && l ? `ubits-badge--absolute-${l}` : '',
			s,
		]
			.filter(Boolean)
			.join(' '),
		r = c === 'number' && d !== void 0 && d !== null ? String(d) : '';
	return `<span class="${o}">${r}</span>`;
}
const We = {
		xs: 20,
		sm: 28,
		md: 36,
		// 36px
		lg: 40,
		// 40px
	},
	at = 'md',
	st = {
		green: 'success',
		red: 'error',
		blue: 'info',
		orange: 'warning',
		gray: 'primary',
	},
	Ge = {
		xs: 6,
		sm: 8,
		md: 10,
		lg: 10,
	},
	Ke = {
		xs: 'var(--font-body-xs-size, 11px)',
		sm: 'var(--font-body-sm-size, 13px)',
		md: 'var(--font-body-md-size, 16px)',
		lg: 'var(--font-body-lg-size, 18px)',
	};
function it(t) {
	return t.imageUrl ? 'photo' : t.initials ? 'initials' : 'icon';
}
function lt(t) {
	const c = t.trim().split(/\s+/);
	return c.length === 0
		? ''
		: c.length === 1
			? c[0].substring(0, 2).toUpperCase()
			: (c[0][0] + c[c.length - 1][0]).toUpperCase();
}
function Ie(t = {}) {
	const {
			imageUrl: c,
			initials: m,
			icon: u = 'user',
			size: b = 'md',
			badgeColor: l,
			badgeContent: s,
			alt: d = 'Avatar',
			className: o = '',
			onClick: r,
		} = t,
		e = it(t),
		f = We[b] || We.md,
		L = Ge[b] || Ge.md,
		y = Ke[b] || Ke.md,
		i = ['ubits-avatar', `ubits-avatar--${b}`, `ubits-avatar--${e}`, o].filter(Boolean).join(' '),
		T = `
    width: ${f}px;
    height: ${f}px;
    min-width: ${f}px;
    min-height: ${f}px;
  `.trim();
	let w = '';
	if (e === 'photo' && c)
		w = `<div class="ubits-avatar-image-container"><img src="${c}" alt="${d}" class="ubits-avatar-image" /></div>`;
	else if (e === 'initials') {
		const z = m ? lt(m) : '';
		w = `<span class="ubits-avatar-initials" style="font-size: ${y};">${z}</span>`;
	} else {
		const z = f - L * 2;
		w = `<i class="far fa-${u}" style="font-size: ${z}px;"></i>`;
	}
	const $ = l
		? nt({
				type: s != null && s !== '' ? 'number' : 'dot',
				size: at,
				variant: st[l] || 'success',
				absolute: !0,
				position: 'bottom-right',
				className: 'ubits-avatar-badge-wrapper',
				content: s,
			})
		: '';
	return `
    <div class="${i}" style="${T}" ${r ? 'role="button" tabindex="0"' : ''} data-variant="${e}">
      ${w}
      ${$}
    </div>
  `.trim();
}
function rt(t) {
	const {
			label: c,
			complementaryText: m,
			value: u = '',
			name: b = '',
			checked: l = !1,
			size: s = 'md',
			state: d = 'default',
			disabled: o = !1,
			className: r = '',
		} = t,
		e = o || d === 'disabled',
		f = [
			'ubits-toggle',
			`ubits-toggle--${s}`,
			d !== 'default' ? `ubits-toggle--${d}` : '',
			l ? 'ubits-toggle--checked' : '',
			e ? 'ubits-toggle--disabled' : '',
			r,
		]
			.filter(Boolean)
			.join(' '),
		L = `
    <input
      type="checkbox"
      id="toggle-${b}-${u || 'default'}"
      ${b ? `name="${b}"` : ''}
      ${u ? `value="${u}"` : ''}
      ${l ? 'checked' : ''}
      ${e ? 'disabled' : ''}
      class="ubits-toggle__input"
      role="switch"
      aria-checked="${l}"
    />
  `,
		y = `
    <span class="ubits-toggle__track" aria-hidden="true">
      <span class="ubits-toggle__thumb"></span>
    </span>
  `;
	let i = '';
	if (c || m) {
		const $ = c ? `<span class="ubits-toggle__label">${c}</span>` : '',
			z = m ? `<span class="ubits-toggle__complementary-text">${m}</span>` : '';
		i = `
      <div class="ubits-toggle__text-content">
        ${$}
        ${z}
      </div>
    `;
	}
	const T = c || m ? 'label' : 'div',
		w = c || m ? f : `${f} ubits-toggle--no-label`;
	return `
    <${T} class="${w}">
      ${L}
      ${i}
      ${y}
    </${T}>
  `.trim();
}
function ct(t) {
	const {
			label: c,
			complementaryText: m,
			value: u,
			name: b,
			checked: l = !1,
			size: s = 'md',
			state: d = 'default',
			disabled: o = !1,
			className: r = '',
		} = t,
		e = o || d === 'disabled',
		f = [
			'ubits-radio-button',
			`ubits-radio-button--${s}`,
			d !== 'default' ? `ubits-radio-button--${d}` : '',
			l ? 'ubits-radio-button--checked' : '',
			e ? 'ubits-radio-button--disabled' : '',
			r,
		]
			.filter(Boolean)
			.join(' '),
		L = `
    <input
      type="radio"
      id="radio-${b}-${u}"
      name="${b}"
      value="${u}"
      ${l ? 'checked' : ''}
      ${e ? 'disabled' : ''}
      class="ubits-radio-button__input"
    />
  `,
		y = `
    <span class="ubits-radio-button__circle" aria-hidden="true">
      ${l || (d === 'active' && !l) ? '<span class="ubits-radio-button__dot"></span>' : ''}
    </span>
  `,
		i = `
    <span class="ubits-radio-button__label">${c}</span>
  `,
		T = m ? `<span class="ubits-radio-button__complementary-text">${m}</span>` : '',
		w = `
    <div class="ubits-radio-button__text-content">
      ${i}
      ${T}
    </div>
  `;
	return `
    <label class="${f}">
      ${L}
      ${y}
      ${w}
    </label>
  `.trim();
}
function De(t) {
	const {
			items: c,
			size: m = 'md',
			maxHeight: u = '400px',
			className: b = '',
			attributes: l = {},
		} = t,
		s = ['ubits-list', b].filter(Boolean).join(' '),
		d = Object.entries(l)
			.map(([r, e]) => `${r}="${e}"`)
			.join(' ');
	let o = `<div class="${s}" role="list" style="max-height: ${u};" ${d}>`;
	return (
		c.forEach((r, e) => {
			const f = r.value || `list-item-${e}`,
				L = r.state || (r.selected ? 'active' : 'default'),
				y = [
					'ubits-list-item',
					`ubits-list-item--${m}`,
					L !== 'default' ? `ubits-list-item--${L}` : '',
				]
					.filter(Boolean)
					.join(' '),
				i = [];
			r.selected && i.push('aria-selected="true"'),
				L === 'disabled' ? i.push('aria-disabled="true"') : i.push('tabindex="0"'),
				i.push(`data-value="${f}"`),
				i.push(`data-index="${e}"`),
				r.attributes &&
					Object.entries(r.attributes).forEach(([T, w]) => {
						i.push(`${T}="${w}"`);
					}),
				(o += `
      <div class="${y}" role="listitem" ${i.join(' ')}>
        ${r.label}
      </div>
    `);
		}),
		(o += '</div>'),
		o
	);
}
function Oe(t) {
	const { containerId: c, items: m, size: u = 'md', onSelectionChange: b, multiple: l = !1 } = t,
		s = document.getElementById(c);
	if (!s) throw new Error(`Container with id "${c}" not found`);
	const d = De(t);
	s.innerHTML = d;
	const o = s.querySelector('.ubits-list');
	if (!o) throw new Error('Failed to create list element');
	const r = o.querySelectorAll('.ubits-list-item');
	let e = null;
	return (
		r.forEach((f, L) => {
			const y = m[L];
			y &&
				(y.state !== 'disabled' &&
					f.addEventListener('click', () => {
						if ((y.onClick && y.onClick(y, L), l)) {
							if (
								(f.classList.contains('ubits-list-item--active')
									? (f.classList.remove('ubits-list-item--active'),
										f.removeAttribute('aria-selected'))
									: (f.classList.add('ubits-list-item--active'),
										f.setAttribute('aria-selected', 'true')),
								b)
							) {
								const T = Array.from(r)
									.map((w, $) =>
										w.classList.contains('ubits-list-item--active')
											? { item: m[$], index: $ }
											: null,
									)
									.filter(Boolean);
								if (T.length > 0) {
									const w = T[T.length - 1];
									b(w.item, w.index);
								} else b(null, null);
							}
						} else {
							if (e !== null && e !== L) {
								const i = r[e];
								i.classList.remove('ubits-list-item--active'), i.removeAttribute('aria-selected');
							}
							e !== L
								? (f.classList.add('ubits-list-item--active'),
									f.setAttribute('aria-selected', 'true'),
									(e = L),
									b && b(y, L))
								: (f.classList.remove('ubits-list-item--active'),
									f.removeAttribute('aria-selected'),
									(e = null),
									b && b(null, null));
						}
					}),
				y.state !== 'disabled' &&
					f.addEventListener('keydown', (i) => {
						const T = L;
						let w = null;
						if (i.key === 'ArrowDown') i.preventDefault(), (w = T < m.length - 1 ? T + 1 : 0);
						else if (i.key === 'ArrowUp') i.preventDefault(), (w = T > 0 ? T - 1 : m.length - 1);
						else if (i.key === 'Enter' || i.key === ' ') {
							i.preventDefault(), f.click();
							return;
						} else
							i.key === 'Home'
								? (i.preventDefault(), (w = 0))
								: i.key === 'End' && (i.preventDefault(), (w = m.length - 1));
						if (w !== null) {
							const $ = r[w];
							$ &&
								m[w]?.state !== 'disabled' &&
								($.focus(), $.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
						}
					}));
		}),
		o
	);
}
function dt(t = {}) {
	const {
			size: c = 'md',
			variant: m = 'primary',
			animated: u = !0,
			label: b,
			fullScreen: l = !1,
			className: s = '',
			style: d = '',
		} = t,
		o = [
			'ubits-spinner',
			`ubits-spinner--${c}`,
			`ubits-spinner--${m}`,
			u ? 'ubits-spinner--animated' : '',
			l ? 'ubits-spinner--fullscreen' : '',
			s,
		]
			.filter(Boolean)
			.join(' '),
		r = d ? ` style="${d}"` : '';
	return `
    <div class="${o}"${r}>
      <div class="ubits-spinner__circle">
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
      </div>
      ${b ? `<span class="ubits-spinner__label">${b}</span>` : ''}
    </div>
  `.trim();
}
function He(t, c = 'regular') {
	try {
		const m = c === 'solid' ? 'fas' : 'far',
			u = t.startsWith('fa-') ? t : `fa-${t}`;
		return `<i class="${m} ${u}"></i>`;
	} catch {
		const u = c === 'solid' ? 'fas' : 'far',
			b = t.startsWith('fa-') ? t : `fa-${t}`;
		return `<i class="${u} ${b}"></i>`;
	}
}
function $e(t) {
	const {
			variant: c = 'primary',
			size: m = 'md',
			text: u = '',
			icon: b,
			iconStyle: l = 'regular',
			iconOnly: s = !1,
			disabled: d = !1,
			loading: o = !1,
			loadingText: r,
			badge: e = !1,
			active: f = !1,
			fullWidth: L = !1,
			block: y = !1,
			iconPosition: i = 'left',
			className: T = '',
			attributes: w = {},
			dropdown: $ = !1,
			showTooltip: z = !1,
			tooltipText: M = '',
		} = t,
		S = [
			'ubits-button',
			`ubits-button--${c}`,
			`ubits-button--${m}`,
			f && 'ubits-button--active',
			s && 'ubits-button--icon-only',
			o && 'ubits-button--loading',
			L && 'ubits-button--full-width',
			y && 'ubits-button--block',
			i === 'right' && 'ubits-button--icon-right',
			$ && 'ubits-button--dropdown',
			T,
		]
			.filter(Boolean)
			.join(' '),
		G = [
			d && 'disabled',
			o && 'data-loading="true"',
			o && 'aria-busy="true"',
			...Object.entries(w).map(([le, X]) => `${le}="${X}"`),
		]
			.filter(Boolean)
			.join(' ');
	let W = '';
	b && (W = He(b, l));
	let ne = W,
		ae = i;
	$ && !b && u
		? ((ne = He('chevron-down', l)), (ae = 'right'))
		: $ && b && i === 'left' && u
			? (ne = `${W}${He('chevron-down', l)}`)
			: $ && !u && (ne = b ? `${W}${He('chevron-down', l)}` : He('chevron-down', l));
	const J =
			{
				xs: 'xs',
				sm: 'sm',
				md: 'sm',
				lg: 'md',
				xl: 'lg',
			}[m] || 'sm',
		pe =
			{
				primary: 'primary',
				secondary: 'secondary',
				tertiary: 'secondary',
				active: 'primary',
			}[c] || 'primary',
		be = o
			? dt({
					size: J,
					variant: pe,
					animated: !0,
					className: 'ubits-button__spinner',
				})
			: '';
	let Y = '';
	o && r
		? (Y = `${be}<span class="button-text">${r}</span>`)
		: o && !u
			? (Y = be)
			: o && u
				? i === 'right'
					? (Y = `<span class="button-text">${u}</span>${be}`)
					: (Y = `${be}<span class="button-text">${u}</span>`)
				: s && b
					? (Y = W)
					: ne && u
						? $ && b && i === 'left'
							? (Y = `${He(b, l)}<span>${u}</span>${He('chevron-down', l)}`)
							: ae === 'right'
								? (Y = `<span>${u}</span>${ne}`)
								: (Y = `${ne}<span>${u}</span>`)
						: u
							? (Y = $ ? `<span>${u}</span>${He('chevron-down', l)}` : `<span>${u}</span>`)
							: ne && (Y = ne);
	const ge = e ? '<span class="ubits-button__badge"></span>' : '',
		ue = s && z && M ? `title="${M}"` : '';
	return `
    <button class="${S}" ${G} ${ue}>
      ${Y}
      ${ge}
    </button>
  `.trim();
}
function Qe(t) {
	const { orientation: c = 'vertical', state: m = 'default', className: u = '' } = t;
	return `
    <div class="${['ubits-scrollbar', `ubits-scrollbar--${c}`, m ? `ubits-scrollbar--${m}` : '', u]
			.filter(Boolean)
			.join(' ')}">
      <div class="ubits-scrollbar__bar"></div>
    </div>
  `.trim();
}
function qe(t) {
	const {
		containerId: c,
		targetId: m,
		orientation: u = 'vertical',
		state: b = 'default',
		className: l = '',
	} = t;
	let s;
	c ? (s = document.getElementById(c) || document.body) : (s = document.body);
	const d = document.createElement('div');
	d.innerHTML = Qe({ orientation: u, state: b, className: l });
	const o = d.firstElementChild;
	if (!o) throw new Error('No se pudo crear el scrollbar');
	const r = o.querySelector('.ubits-scrollbar__bar');
	if (!r) throw new Error('No se pudo encontrar la barra del scrollbar');
	let e = null;
	if (m) e = document.getElementById(m);
	else if (c) {
		const M = s.querySelector('[data-scrollable]');
		M && (e = M);
	}
	const f = () => {
			if (!e || !r) return;
			const M = u === 'vertical',
				S = M ? 'scrollTop' : 'scrollLeft',
				G = M ? 'clientHeight' : 'clientWidth',
				W = M ? 'scrollHeight' : 'scrollWidth',
				ne = e[S],
				ae = e[G],
				Q = e[W];
			if (Q <= ae) {
				r.style.opacity = '0';
				return;
			}
			const J = M ? o.clientHeight : o.clientWidth,
				q = Math.max((ae / Q) * J, 20),
				pe = J - q,
				be = (ne / (Q - ae)) * pe;
			M
				? ((r.style.height = `${q}px`), (r.style.transform = `translateY(${be}px)`))
				: ((r.style.width = `${q}px`), (r.style.transform = `translateX(${be}px)`)),
				(r.style.opacity = '1');
		},
		L = (M) => {
			if (!e || !r || M.target === r) return;
			M.preventDefault(), M.stopPropagation();
			const S = u === 'vertical',
				G = o.getBoundingClientRect(),
				W = S ? M.clientY - G.top : M.clientX - G.left,
				ne = S ? o.clientHeight : o.clientWidth,
				ae = W / ne,
				Q = S ? 'clientHeight' : 'clientWidth',
				J = S ? 'scrollHeight' : 'scrollWidth',
				q = S ? 'scrollTop' : 'scrollLeft',
				pe = e[Q],
				Y = e[J] - pe;
			e[q] = ae * Y;
		};
	let y = !1,
		i = 0,
		T = 0;
	const w = (M) => {
			if (!e || !r || M.target !== r) return;
			M.preventDefault(), M.stopPropagation(), (y = !0);
			const S = u === 'vertical';
			(i = S ? M.clientY : M.clientX),
				(T = S ? e.scrollTop : e.scrollLeft),
				document.addEventListener('mousemove', $),
				document.addEventListener('mouseup', z);
		},
		$ = (M) => {
			if (!y || !e || !r) return;
			const S = u === 'vertical',
				W = (S ? M.clientY : M.clientX) - i,
				ne = S ? o.clientHeight : o.clientWidth,
				ae = S ? e.clientHeight : e.clientWidth,
				J = (S ? e.scrollHeight : e.scrollWidth) - ae,
				q = J / ne,
				pe = T + W * q;
			S
				? (e.scrollTop = Math.max(0, Math.min(J, pe)))
				: (e.scrollLeft = Math.max(0, Math.min(J, pe)));
		},
		z = () => {
			(y = !1),
				document.removeEventListener('mousemove', $),
				document.removeEventListener('mouseup', z);
		};
	if (e) {
		e.addEventListener('scroll', f), e.addEventListener('resize', f);
		const M = new ResizeObserver(() => {
			f();
		});
		M.observe(e), (o.__resizeObserver = M);
	}
	return (
		o.addEventListener('click', L),
		r.addEventListener('mousedown', w),
		(o.__handleMouseUp = z),
		(o.__handleMouseMove = $),
		s.appendChild(o),
		setTimeout(() => {
			f();
		}, 100),
		{
			element: o,
			update: f,
			destroy: () => {
				if (e) {
					e.removeEventListener('scroll', f), e.removeEventListener('resize', f);
					const M = o.__resizeObserver;
					M && M.disconnect();
				}
				o.removeEventListener('click', L),
					r.removeEventListener('mousedown', w),
					o.__handleMouseUp &&
						(document.removeEventListener('mousemove', o.__handleMouseMove),
						document.removeEventListener('mouseup', o.__handleMouseUp)),
					o.remove();
			},
		}
	);
}
const Dt = /* @__PURE__ */ Object.freeze(
	/* @__PURE__ */ Object.defineProperty(
		{
			__proto__: null,
			createScrollbar: qe,
			renderScrollbar: Qe,
		},
		Symbol.toStringTag,
		{ value: 'Module' },
	),
);
function ut(t, c, m) {
	const u = [];
	if (c <= m) for (let b = 1; b <= c; b++) u.push(b);
	else {
		const b = Math.floor(m / 2);
		let l = Math.max(1, t - b),
			s = Math.min(c, l + m - 1);
		s - l < m - 1 && (l = Math.max(1, s - m + 1));
		for (let d = l; d <= s; d++) u.push(d);
	}
	return u;
}
function bt(t, c, m = 'md', u) {
	return $e({
		variant: c ? 'secondary' : 'tertiary',
		size: m === 'sm' ? 'sm' : m === 'lg' ? 'lg' : 'md',
		text: String(t),
		active: c,
		className: 'ubits-pagination__page-button',
	});
}
function pt(t) {
	const {
			currentPage: c = 1,
			totalPages: m,
			totalItems: u,
			itemsPerPage: b,
			variant: l = 'default',
			size: s = 'md',
			maxVisiblePages: d = 7,
			showFirst: o = !0,
			showLast: r = !0,
			showPrevNext: e = !0,
			showInfo: f = !1,
			showItemsPerPage: L = !1,
			itemsPerPageOptions: y = [10, 20, 50, 100],
			className: i = '',
			attributes: T = {},
			labels: w = {},
		} = t,
		$ = Math.max(1, Math.min(c, m)),
		z = ['ubits-pagination', `ubits-pagination--${l}`, `ubits-pagination--${s}`, i]
			.filter(Boolean)
			.join(' '),
		M = [...Object.entries(T).map(([Q, J]) => `${Q}="${J}"`)].filter(Boolean).join(' '),
		S = {
			first: 'Primera',
			last: 'Última',
			previous: 'Anterior',
			next: 'Siguiente',
			page: 'Página',
			of: 'de',
			items: 'items',
			itemsPerPage: 'Por página',
			...w,
		};
	let G = '';
	if (f && u !== void 0) {
		const Q = ($ - 1) * (b || 10) + 1,
			J = Math.min($ * (b || 10), u);
		G = `
      <div class="ubits-pagination__info">
        <span class="ubits-body-sm">${Q}-${J} ${S.of} ${u} ${S.items}</span>
      </div>
    `;
	}
	let W = '';
	if (L) {
		const Q = `ubits-pagination-items-per-page-${Date.now()}`;
		W = `
      <div class="ubits-pagination__items-per-page">
        <label for="${Q}" class="ubits-body-sm">${S.itemsPerPage}:</label>
        <select id="${Q}" class="ubits-pagination__select ubits-body-sm">
          ${y
						.map((J) => `<option value="${J}" ${J === b ? 'selected' : ''}>${J}</option>`)
						.join('')}
        </select>
      </div>
    `;
	}
	const ne = s === 'sm' ? 'sm' : s === 'lg' ? 'lg' : 'md',
		ae = [];
	if (
		(o &&
			l === 'default' &&
			ae.push(
				$e({
					variant: 'tertiary',
					size: ne,
					icon: 'angle-double-left',
					iconStyle: 'solid',
					iconOnly: !0,
					disabled: $ === 1,
					className: 'ubits-pagination__nav-button',
					attributes: {
						'aria-label': S.first,
						title: S.first,
					},
				}),
			),
		e &&
			ae.push(
				$e({
					variant: 'tertiary',
					size: ne,
					icon: 'chevron-left',
					iconStyle: 'solid',
					iconOnly: !0,
					disabled: $ === 1,
					className: 'ubits-pagination__nav-button',
					attributes: {
						'aria-label': S.previous,
						title: S.previous,
					},
				}),
			),
		l === 'default')
	) {
		const Q = ut($, m, d);
		Q[0] > 1 && ae.push('<span class="ubits-pagination__ellipsis">...</span>'),
			Q.forEach((J) => {
				ae.push(bt(J, J === $, s));
			}),
			Q[Q.length - 1] < m && ae.push('<span class="ubits-pagination__ellipsis">...</span>');
	} else
		l === 'compact' &&
			ae.push(`
      <span class="ubits-pagination__page-info ubits-body-md">
        ${S.page} ${$} ${S.of} ${m}
      </span>
    `);
	return (
		e &&
			ae.push(
				$e({
					variant: 'tertiary',
					size: ne,
					icon: 'chevron-right',
					iconStyle: 'solid',
					iconOnly: !0,
					disabled: $ === m,
					className: 'ubits-pagination__nav-button',
					attributes: {
						'aria-label': S.next,
						title: S.next,
					},
				}),
			),
		r &&
			l === 'default' &&
			ae.push(
				$e({
					variant: 'tertiary',
					size: ne,
					icon: 'angle-double-right',
					iconStyle: 'solid',
					iconOnly: !0,
					disabled: $ === m,
					className: 'ubits-pagination__nav-button',
					attributes: {
						'aria-label': S.last,
						title: S.last,
					},
				}),
			),
		`
    <div class="${z}" ${M} data-current-page="${$}" data-total-pages="${m}">
      ${G}
      ${W}
      <div class="ubits-pagination__controls">
        ${ae.join('')}
      </div>
    </div>
  `
	);
}
function mt() {
	return `
    <i class="far fa-magnifying-glass ubits-search-button__icon" aria-hidden="true"></i>
  `;
}
function ft() {
	return `
    <button
      type="button"
      class="ubits-search-button__clear"
      aria-label="Limpiar búsqueda"
      tabindex="0"
    >
      <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
    </button>
  `;
}
function ze(t) {
	const {
			active: c = !1,
			size: m = 'md',
			state: u = 'default',
			disabled: b = !1,
			placeholder: l = '',
			value: s = '',
			width: d = 248,
			className: o = '',
		} = t,
		r = b || u === 'disabled',
		e = c || u === 'active',
		f = mt(),
		y = s && s.trim().length > 0 ? ft() : '';
	if (e) {
		const T = [
				'ubits-search-button',
				'ubits-search-button--active',
				`ubits-search-button--${m}`,
				r ? 'ubits-search-button--disabled' : '',
				o,
			]
				.filter(Boolean)
				.join(' '),
			w = d ? `width: ${d}px;` : '';
		return `
      <div class="${T}" style="${w}">
        <div class="ubits-search-button__input-wrapper">
          ${f}
          <input
            type="text"
            class="ubits-search-button__input"
            placeholder="${l}"
            value="${s}"
            ${r ? 'disabled' : ''}
            aria-label="Buscar"
          />
          ${y}
        </div>
      </div>
    `.trim();
	}
	return `
    <button
      type="button"
      class="${[
				'ubits-button',
				'ubits-button--secondary',
				'ubits-button--icon-only',
				`ubits-button--${m}`,
				u === 'hover' ? 'ubits-search-button--force-hover' : '',
				// 'active' ya no se usa para el estado pressed, se usa para desplegar
				o,
			]
				.filter(Boolean)
				.join(' ')}"
      ${r ? 'disabled' : ''}
      aria-label="Buscar"
    >
      ${f}
    </button>
  `.trim();
}
function ht(t) {
	const c = t.containerId ? document.getElementById(t.containerId) : document.body;
	if (!c) throw new Error(`Container with id "${t.containerId}" not found`);
	const m = ze(t),
		u = document.createElement('div');
	u.innerHTML = m.trim();
	const b = u.firstElementChild;
	if (!b) throw new Error('Failed to create search button element');
	if ((c.appendChild(b), t.active || t.state === 'active')) {
		const o = b.querySelector('.ubits-search-button__input'),
			r = b.querySelector('.ubits-search-button__clear');
		o &&
			(t.onChange &&
				(o.addEventListener('input', t.onChange), o.addEventListener('change', t.onChange)),
			t.onFocus && o.addEventListener('focus', t.onFocus),
			t.onBlur && o.addEventListener('blur', t.onBlur)),
			r &&
				r.addEventListener('click', function (e) {
					if (
						(e.preventDefault(), e.stopPropagation(), o && ((o.value = ''), o.focus(), t.onChange))
					) {
						const f = new Event('input', { bubbles: !0 });
						o.dispatchEvent(f);
					}
				});
	} else {
		const o = b;
		o && t.onClick && o.addEventListener('click', t.onClick);
	}
	return {
		element: b,
		destroy: () => {
			b.parentNode && b.parentNode.removeChild(b);
		},
		update: (o) => {
			const r = { ...t, ...o },
				e = ze(r),
				f = document.createElement('div');
			f.innerHTML = e.trim();
			const L = f.firstElementChild;
			if (L && b.parentNode)
				if ((b.parentNode.replaceChild(L, b), r.active || r.state === 'active')) {
					const i = L.querySelector('.ubits-search-button__input'),
						T = L.querySelector('.ubits-search-button__clear');
					i &&
						(r.onChange &&
							(i.addEventListener('input', r.onChange), i.addEventListener('change', r.onChange)),
						r.onFocus && i.addEventListener('focus', r.onFocus),
						r.onBlur && i.addEventListener('blur', r.onBlur)),
						T &&
							T.addEventListener('click', function (w) {
								if (
									(w.preventDefault(),
									w.stopPropagation(),
									i && ((i.value = ''), i.focus(), r.onChange))
								) {
									const $ = new Event('input', { bubbles: !0 });
									i.dispatchEvent($);
								}
							});
				} else {
					const i = L;
					i && r.onClick && i.addEventListener('click', r.onClick);
				}
		},
	};
}
function gt(t) {
	const {
			title: c,
			complementaryText: m,
			width: u = 40,
			bodyContent: b = '',
			footerButtons: l,
			className: s = '',
		} = t,
		o = ['ubits-drawer', `ubits-drawer--width-${u}`, s].filter(Boolean).join(' '),
		r = `
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${c}</p>
        </div>
        ${
					m
						? `
        <div class="ubits-drawer__header-complementary">
          <p class="ubits-body-sm-regular">${m}</p>
        </div>
        `
						: ''
				}
      </div>
      ${$e({
				variant: 'secondary',
				size: 'md',
				icon: 'fa-times',
				iconOnly: !0,
				className: 'ubits-drawer__close',
			})}
    </div>
  `,
		f = `
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${typeof b == 'function' ? b() : b || '<div class="ubits-drawer__placeholder">Contenido del drawer</div>'}
      </div>
      <div class="ubits-drawer__scrollbar">
        <div class="ubits-drawer__scrollbar-bar"></div>
      </div>
    </div>
  `,
		L = l
			? `
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        ${
					l.tertiary
						? `
        <div class="ubits-drawer__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${l.tertiary.label}</span>
          </button>
        </div>
        `
						: ''
				}
        <div class="ubits-drawer__footer-right">
          ${
						l.secondary
							? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${l.secondary.label}</span>
          </button>
          `
							: ''
					}
          ${
						l.primary
							? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${l.primary.label}</span>
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
        ${r}
        ${f}
        ${L}
      </div>
    </div>
  `.trim();
}
function Ye(t) {
	const { containerId: c, onClose: m, closeOnOverlayClick: u = !0, open: b = !1 } = t;
	let l;
	c ? (l = document.getElementById(c) || document.body) : (l = document.body);
	const s = document.createElement('div');
	s.innerHTML = gt(t);
	const d = s.firstElementChild;
	if (!d) throw new Error('No se pudo crear el drawer');
	d.querySelector('.ubits-drawer');
	const o = d.querySelector('.ubits-drawer__close'),
		r = d,
		e = () => {
			d.classList.add('ubits-drawer-overlay--open'), (document.body.style.overflow = 'hidden');
		},
		f = () => {
			d.classList.remove('ubits-drawer-overlay--open'),
				(document.body.style.overflow = ''),
				m && m();
		},
		L = (i) => {
			const T = d.querySelector('.ubits-drawer__body-content');
			if (T) {
				const w = typeof i == 'function' ? i() : i;
				T.innerHTML = w;
			}
		};
	o &&
		o.addEventListener('click', (i) => {
			i.preventDefault(), i.stopPropagation(), f();
		}),
		u &&
			r &&
			r.addEventListener('click', (i) => {
				i.target === r && f();
			});
	const y = (i) => {
		i.key === 'Escape' && d.classList.contains('ubits-drawer-overlay--open') && f();
	};
	if ((document.addEventListener('keydown', y), t.footerButtons)) {
		const i = d.querySelector('.ubits-drawer__footer-left .ubits-drawer__footer-button'),
			T = d.querySelector('.ubits-drawer__footer-right .ubits-button--secondary'),
			w = d.querySelector('.ubits-drawer__footer-right .ubits-button--primary');
		i &&
			t.footerButtons.tertiary?.onClick &&
			i.addEventListener('click', ($) => {
				$.preventDefault(), t.footerButtons.tertiary.onClick($);
			}),
			T &&
				t.footerButtons.secondary?.onClick &&
				T.addEventListener('click', ($) => {
					$.preventDefault(), t.footerButtons.secondary.onClick($);
				}),
			w &&
				t.footerButtons.primary?.onClick &&
				w.addEventListener('click', ($) => {
					$.preventDefault(), t.footerButtons.primary.onClick($);
				});
	}
	return (
		l.appendChild(d),
		b && e(),
		{
			element: d,
			open: e,
			close: f,
			updateContent: L,
		}
	);
}
const Ze = {
	sm: '320px',
	md: '480px',
	lg: '640px',
	xl: '800px',
	full: '1280px',
};
function yt(t) {
	const {
			title: c,
			bodyContent: m = '',
			size: u = 'md',
			fullScreen: b = !1,
			footerButtons: l,
			className: s = '',
		} = t,
		d = Ze[u] || Ze.md,
		e = ['ubits-modal', `ubits-modal--size-${u}`, b ? 'ubits-modal--full-screen' : '', s]
			.filter(Boolean)
			.join(' '),
		f = `
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${c}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `,
		y = `
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${typeof m == 'function' ? m() : m || '<div class="ubits-modal__placeholder">Contenido del modal</div>'}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `,
		i = l
			? `
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${
					l.tertiary
						? `
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${l.tertiary.label}</span>
          </button>
        </div>
        `
						: ''
				}
        <div class="ubits-modal__footer-right">
          ${
						l.secondary
							? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${l.secondary.label}</span>
          </button>
          `
							: ''
					}
          ${
						l.primary
							? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${l.primary.label}</span>
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
      <div class="${e}" style="max-width: ${d};">
        ${f}
        ${y}
        ${i}
      </div>
    </div>
  `.trim();
}
function Ve(t) {
	const { containerId: c, onClose: m, closeOnOverlayClick: u = !0, open: b = !1 } = t;
	let l;
	c ? (l = document.getElementById(c) || document.body) : (l = document.body);
	const s = document.createElement('div');
	s.innerHTML = yt(t);
	const d = s.firstElementChild;
	if (!d) throw new Error('No se pudo crear el modal');
	d.querySelector('.ubits-modal');
	const o = d.querySelector('.ubits-modal__close'),
		r = d,
		e = () => {
			d.classList.add('ubits-modal-overlay--open'), (document.body.style.overflow = 'hidden');
		},
		f = () => {
			d.classList.remove('ubits-modal-overlay--open'),
				(document.body.style.overflow = ''),
				m && m();
		},
		L = (i) => {
			const T = d.querySelector('.ubits-modal__body-content');
			if (T) {
				const w = typeof i == 'function' ? i() : i;
				T.innerHTML = w;
			}
		};
	o &&
		o.addEventListener('click', (i) => {
			i.preventDefault(), i.stopPropagation(), f();
		}),
		u &&
			r &&
			r.addEventListener('click', (i) => {
				i.target === r && f();
			});
	const y = (i) => {
		i.key === 'Escape' && d.classList.contains('ubits-modal-overlay--open') && f();
	};
	if ((document.addEventListener('keydown', y), t.footerButtons)) {
		const i = d.querySelector('.ubits-modal__footer-left .ubits-modal__footer-button'),
			T = d.querySelector('.ubits-modal__footer-right .ubits-button--secondary'),
			w = d.querySelector('.ubits-modal__footer-right .ubits-button--primary');
		i &&
			t.footerButtons.tertiary?.onClick &&
			i.addEventListener('click', ($) => {
				$.preventDefault(), t.footerButtons.tertiary.onClick($);
			}),
			T &&
				t.footerButtons.secondary?.onClick &&
				T.addEventListener('click', ($) => {
					$.preventDefault(), t.footerButtons.secondary.onClick($);
				}),
			w &&
				t.footerButtons.primary?.onClick &&
				w.addEventListener('click', ($) => {
					$.preventDefault(), t.footerButtons.primary.onClick($);
				});
	}
	return (
		l.appendChild(d),
		b && e(),
		{
			element: d,
			open: e,
			close: f,
			updateContent: L,
		}
	);
}
function Fe(t) {
	const {
		containerId: c,
		label: m = '',
		placeholder: u = '',
		helperText: b = '',
		size: l = 'md',
		state: s = 'default',
		type: d = 'text',
		showLabel: o = !0,
		showHelper: r = !1,
		showCounter: e = !1,
		maxLength: f = 50,
		mandatory: L = !1,
		mandatoryType: y = 'obligatorio',
		leftIcon: i = '',
		rightIcon: T = '',
		value: w = '',
		className: $ = '',
		attributes: z = {},
		showRichTextToolbar: M = !1,
	} = t;
	let S = '';
	if (o && m) {
		const le = L ? ` <span class="ubits-input-mandatory">(${y})</span>` : '';
		S += `<label class="ubits-input-label">${m}${le}</label>`;
	}
	const G = i && i.trim() !== '',
		W = T && T.trim() !== '';
	G && i.startsWith('fa-') ? `${i}` : G && `${i}`,
		W && T.startsWith('fa-') ? `${T}` : W && `${T}`,
		(S += '<div style="position: relative; display: inline-block; width: 100%;">');
	let ne = T,
		ae = W,
		Q = i,
		J = G;
	const q = ['ubits-input', `ubits-input--${l}`];
	s !== 'default' && q.push(`ubits-input--${s}`), $ && q.push($);
	const pe = s === 'disabled' ? ' disabled' : '',
		be = e ? ` maxlength="${f}"` : '',
		Y = G ? 'padding-left: 40px;' : 'padding-left: 12px;',
		ge = W ? 'padding-right: 40px;' : 'padding-right: 12px;';
	if (d === 'select') {
		const le = t.selectOptions || [],
			X = (w && le.find((se) => se.value === w)?.text) || u;
		(S += `<input type="text" class="${q.join(' ')}" style="width: 100%; ${Y} ${ge}" value="${X}" readonly>`),
			W ||
				((ne = 'fa-chevron-down'),
				(ae = !0),
				ge === 'padding-right: 12px;' &&
					(S = S.replace(
						`style="width: 100%; ${Y} ${ge}"`,
						`style="width: 100%; ${Y} padding-right: 40px;"`,
					)));
	} else if (d === 'textarea')
		if (M) {
			(S += '<div class="ubits-input-rich-text-wrapper">'),
				(S += `
        <div class="ubits-input-rich-text-toolbar" data-container-id="${c}">
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
			let le = `width: 100%; min-height: 80px; resize: vertical; ${Y} ${ge}; border: none; border-radius: 0;`;
			s === 'disabled' &&
				(le +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important;');
			const X = `${c}-textarea`;
			(S += `<textarea id="${X}" class="${q.join(' ')}" style="${le}" placeholder="${u}"${pe}${be}>${w}</textarea>`),
				(S += '</div>');
		} else {
			let le = `width: 100%; min-height: 80px; resize: vertical; ${Y} ${ge}`;
			s === 'disabled' &&
				(le +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;');
			const X = `${c}-textarea`;
			S += `<textarea id="${X}" class="${q.join(' ')}" style="${le}" placeholder="${u}"${pe}${be}>${w}</textarea>`;
		}
	else if (d === 'search') {
		let le = Y,
			X = ge;
		G ||
			((Q = 'fa-search'),
			(J = !0),
			(le =
				l === 'xs'
					? 'padding-left: 32px;'
					: l === 'sm'
						? 'padding-left: 36px;'
						: l === 'md'
							? 'padding-left: 40px;'
							: 'padding-left: 44px;')),
			W ||
				((ne = 'fa-times'),
				(ae = !0),
				(X =
					l === 'xs'
						? 'padding-right: 32px;'
						: l === 'sm'
							? 'padding-right: 36px;'
							: l === 'md'
								? 'padding-right: 40px;'
								: 'padding-right: 44px;'));
		let se = `width: 100%; ${le} ${X}`;
		s === 'disabled' &&
			(se +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			(S += `<input type="text" class="${q.join(' ')}" style="${se}" placeholder="${u}" value="${w}" autocomplete="off"${pe}${be}>`);
	} else if (d === 'autocomplete') {
		let le = Y,
			X = ge;
		G ||
			((Q = 'fa-search'),
			(J = !0),
			(le =
				l === 'xs'
					? 'padding-left: 32px;'
					: l === 'sm'
						? 'padding-left: 36px;'
						: l === 'md'
							? 'padding-left: 40px;'
							: 'padding-left: 44px;')),
			W ||
				((ne = 'fa-times'),
				(ae = !0),
				(X =
					l === 'xs'
						? 'padding-right: 32px;'
						: l === 'sm'
							? 'padding-right: 36px;'
							: l === 'md'
								? 'padding-right: 40px;'
								: 'padding-right: 44px;'));
		let se = `width: 100%; ${le} ${X}`;
		s === 'disabled' &&
			(se +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			(S += `<input type="text" class="${q.join(' ')}" style="${se}" placeholder="${u}" value="${w}" autocomplete="off"${pe}${be}>`);
	} else if (d === 'calendar') {
		let le = Y,
			X = ge;
		W ||
			((ne = 'fa-calendar'),
			(ae = !0),
			(X =
				l === 'xs'
					? 'padding-right: 32px;'
					: l === 'sm'
						? 'padding-right: 36px;'
						: l === 'md'
							? 'padding-right: 40px;'
							: 'padding-right: 44px;'));
		let se = `width: 100%; ${le} ${X}`;
		s === 'disabled' &&
			(se +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			(S += `<input type="text" class="${q.join(' ')}" style="${se}" placeholder="${u}" value="${w}" readonly${pe}>`);
	} else if (d === 'password') {
		let le = Y,
			X = ge;
		W ||
			((ne = 'fa-eye'),
			(ae = !0),
			(X =
				l === 'xs'
					? 'padding-right: 32px;'
					: l === 'sm'
						? 'padding-right: 36px;'
						: l === 'md'
							? 'padding-right: 40px;'
							: 'padding-right: 44px;'));
		let se = `width: 100%; ${le} ${X}`;
		s === 'disabled' &&
			(se +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			(S += `<input type="password" class="${q.join(' ')}" style="${se}" placeholder="${u}" value="${w}"${pe}${be}>`);
	} else
		S += `<input type="${d}" class="${q.join(' ')}" style="width: 100%; ${Y} ${ge}" placeholder="${u}" value="${w}"${pe}${be}>`;
	if (J) {
		const le = Q.startsWith('fa-') ? `far ${Q}` : `far fa-${Q}`;
		S += `<i class="${le} ubits-input-icon-left" style="position: absolute; left: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
	}
	if (ae) {
		const le = ne.startsWith('fa-') ? `far ${ne}` : `far fa-${ne}`;
		S += `<i class="${le} ubits-input-icon-right" style="position: absolute; right: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
	}
	(S += '</div>'),
		(r || e) &&
			((S += '<div class="ubits-input-helper">'),
			r && b && (S += `<span>${b}</span>`),
			e && (S += `<span class="ubits-input-counter">0/${f}</span>`),
			(S += '</div>'));
	const ue = Object.entries(z)
		.map(([le, X]) => `${le}="${X}"`)
		.join(' ');
	return ue ? `<div ${ue}>${S}</div>` : S;
}
function vt(t) {
	const {
		containerId: c,
		onChange: m,
		onFocus: u,
		onBlur: b,
		showCounter: l = !1,
		maxLength: s = 50,
		type: d = 'text',
		selectOptions: o = [],
		autocompleteOptions: r = [],
		value: e = '',
	} = t;
	if (!c) return console.error('UBITS Input: containerId es requerido'), null;
	const f = document.getElementById(c);
	if (!f) return console.error(`UBITS Input: No se encontró el contenedor con ID "${c}"`), null;
	const L = Fe(t);
	f.innerHTML = L;
	const y = f.querySelector('div[style*="position: relative"]'),
		i = f.querySelector('.ubits-input'),
		T = f.querySelector('.ubits-input-counter');
	if (!i || !y) return console.error('UBITS Input: No se pudo crear el elemento input'), null;
	if (
		(getComputedStyle(f).position === 'static' && (f.style.position = 'relative'),
		d === 'select' && Lt(f, i, o, e, t.placeholder || '', m, t.size || 'md'),
		d === 'search' && Ct(f, i, m),
		d === 'autocomplete' && xt(f, i, r, m, t.size || 'md'),
		d === 'calendar' && wt(f, i, m),
		d === 'password' && Et(f, i),
		d === 'textarea' && t.showRichTextToolbar
			? $t(f, i, t.onChange)
			: d === 'textarea' && !t.showRichTextToolbar && At(f, i),
		l && T && St(i, T, s),
		m && typeof m == 'function')
	) {
		const w = d === 'select' ? 'change' : 'input';
		i.addEventListener(w, ($) => {
			m($.target.value, $);
		});
	}
	return (
		u &&
			typeof u == 'function' &&
			i.addEventListener('focus', (w) => {
				u(w.target.value, w);
			}),
		b &&
			typeof b == 'function' &&
			i.addEventListener('blur', (w) => {
				b(w.target.value, w);
			}),
		{
			element: y,
			inputElement: i,
			getValue: () => i.value,
			setValue: (w) => {
				(i.value = w), l && T && Pe(T, w.length, s);
			},
			focus: () => i.focus(),
			blur: () => i.blur(),
			disable: () => {
				(i.disabled = !0), i.classList.add('ubits-input--disabled');
			},
			enable: () => {
				(i.disabled = !1), i.classList.remove('ubits-input--disabled');
			},
			setState: (w) => {
				if (
					([
						'ubits-input--hover',
						'ubits-input--focus',
						'ubits-input--active',
						'ubits-input--invalid',
						'ubits-input--disabled',
					].forEach((z) => i.classList.remove(z)),
					w !== 'default' && i.classList.add(`ubits-input--${w}`),
					w === 'disabled' ? (i.disabled = !0) : (i.disabled = !1),
					d === 'textarea' && t.showRichTextToolbar)
				) {
					const M = i
						.closest('.ubits-input-rich-text-wrapper')
						?.querySelector('.ubits-input-rich-text-toolbar');
					if (M) {
						const S = window.getComputedStyle(M).borderBottom;
						window.getComputedStyle(M).borderTop,
							S &&
								S !== 'none' &&
								S !== '0px' &&
								(console.warn(
									`[Rich Text] ⚠️ Línea divisoria detectada en setState("${w}"), removiendo...`,
								),
								(M.style.borderBottom = 'none'),
								(M.style.borderTop = 'none'));
					}
				}
			},
		}
	);
}
function Et(t, c) {
	const m = t.querySelector('.ubits-input-icon-right');
	if (m) {
		let u = !1;
		(m.style.pointerEvents = 'auto'), (m.style.cursor = 'pointer');
		const l = !m.className.includes('fa-eye');
		m.addEventListener('click', (s) => {
			s.preventDefault(),
				s.stopPropagation(),
				(u = !u),
				u
					? ((c.type = 'text'), l || (m.className = 'far fa-eye-slash ubits-input-icon-right'))
					: ((c.type = 'password'), l || (m.className = 'far fa-eye ubits-input-icon-right'));
		});
	}
}
function Ct(t, c, m) {
	const u = t.querySelector('.ubits-input-icon-right');
	if (u) {
		(u.style.display = c.value.length > 0 ? 'block' : 'none'),
			(u.style.pointerEvents = 'auto'),
			(u.style.cursor = 'pointer');
		const b = () => {
			u.style.display = c.value.length > 0 ? 'block' : 'none';
		};
		c.addEventListener('input', b),
			u.addEventListener('click', (l) => {
				l.preventDefault(), (c.value = ''), c.focus(), b(), m && m('');
			});
	}
}
function xt(t, c, m, u, b = 'md') {
	const l = b === 'xs' ? 'xs' : b === 'sm' ? 'sm' : b === 'md' ? 'md' : 'lg',
		s = t.querySelector('.ubits-input-icon-right');
	if (s) {
		(s.style.display = c.value.length > 0 ? 'block' : 'none'),
			(s.style.pointerEvents = 'auto'),
			(s.style.cursor = 'pointer');
		const r = () => {
			s.style.display = c.value.length > 0 ? 'block' : 'none';
		};
		c.addEventListener('input', r),
			s.addEventListener('click', (e) => {
				e.preventDefault(), (c.value = ''), c.focus(), r();
				const f = t.querySelector('.ubits-autocomplete-list-container');
				f && (f.style.display = 'none'), u && u('');
			});
	}
	const d = document.createElement('div');
	(d.className = 'ubits-autocomplete-list-container'),
		(d.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `),
		t.appendChild(d);
	const o = (r = !1) => {
		const e = c.value.toLowerCase();
		let f;
		if (
			(r || e.length < 1
				? (f = m.slice(0, 8))
				: (f = m.filter((i) => i.text.toLowerCase().includes(e)).slice(0, 8)),
			f.length === 0)
		) {
			d.style.display = 'none';
			return;
		}
		const L = f.map((i) => ({
				label: i.text,
				state: 'default',
				value: i.value,
				selected: !1,
			})),
			y = `ubits-autocomplete-list-${t.id}`;
		(d.id = y), (d.innerHTML = '');
		try {
			Oe({
				containerId: y,
				items: L,
				size: l,
				maxHeight: '200px',
				onSelectionChange: (i, T) => {
					i &&
						i.value &&
						((c.value = i.label),
						(d.style.display = 'none'),
						s && (s.style.display = 'block'),
						u && u(i.value));
				},
			}),
				e.length > 0 &&
					d.querySelectorAll('.ubits-list-item').forEach((T) => {
						const w = T.textContent || '';
						if (w.toLowerCase().includes(e)) {
							const $ = new RegExp(`(${e})`, 'gi'),
								z = w.replace($, '<strong>$1</strong>');
							T.innerHTML = z;
						}
					});
		} catch (i) {
			console.warn('Using renderList fallback for autocomplete:', i);
			const T = De({
				items: L,
				size: l,
				maxHeight: '200px',
			});
			(d.innerHTML = T),
				e.length > 0 &&
					d.querySelectorAll('.ubits-list-item').forEach((z) => {
						const M = z.textContent || '';
						if (M.toLowerCase().includes(e)) {
							const S = new RegExp(`(${e})`, 'gi'),
								G = M.replace(S, '<strong>$1</strong>');
							z.innerHTML = G;
						}
					}),
				d.querySelectorAll('.ubits-list-item').forEach(($, z) => {
					const M = L[z];
					M &&
						M.state !== 'disabled' &&
						$.addEventListener('click', () => {
							(c.value = M.label),
								(d.style.display = 'none'),
								s && (s.style.display = 'block'),
								u && u(M.value || '');
						});
				});
		}
		d.style.display = 'block';
	};
	c.addEventListener('focus', () => {
		o(!0);
	}),
		c.addEventListener('input', () => {
			o(!1);
		}),
		c.addEventListener('blur', () => {
			setTimeout(() => (d.style.display = 'none'), 150);
		});
}
function Lt(t, c, m, u, b, l, s = 'md') {
	c.style.cursor = 'pointer';
	const d = s === 'xs' ? 'xs' : s === 'sm' ? 'sm' : s === 'md' ? 'md' : 'lg',
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
	const r = 50;
	let e = 0,
		f = [],
		L = !1;
	const y = (i = 0) => {
		L ||
			((L = !0),
			setTimeout(() => {
				const T = i * r,
					w = Math.min(T + r, m.length),
					z = m.slice(T, w).map((S) => ({
						label: S.text,
						state: u === S.value ? 'active' : 'default',
						value: S.value,
						selected: u === S.value,
					}));
				i === 0 ? (f = z) : (f = [...f, ...z]);
				const M = `ubits-select-list-${t.id}`;
				(o.id = M), (o.innerHTML = '');
				try {
					Oe({
						containerId: M,
						items: f,
						size: d,
						maxHeight: '200px',
						onSelectionChange: (S, G) => {
							S && S.value && ((c.value = S.label), (o.style.display = 'none'), l && l(S.value));
						},
					});
				} catch (S) {
					console.warn('Using renderList fallback for select:', S);
					const G = De({
						items: f,
						size: d,
						maxHeight: '200px',
					});
					(o.innerHTML = G),
						o.querySelectorAll('.ubits-list-item').forEach((ne, ae) => {
							const Q = f[ae];
							Q &&
								Q.state !== 'disabled' &&
								ne.addEventListener('click', () => {
									(c.value = Q.label), (o.style.display = 'none'), l && l(Q.value || '');
								});
						});
				}
				if (w < m.length) {
					const S = o.querySelector('.ubits-list');
					if (S) {
						const G = new IntersectionObserver(
								(ne) => {
									ne[0].isIntersecting && !L && w < m.length && (e++, y(e));
								},
								{ root: S, rootMargin: '50px' },
							),
							W = o.querySelector('.ubits-list-item:last-child');
						W && G.observe(W);
					}
				}
				L = !1;
			}, 150));
	};
	c.addEventListener('click', () => {
		o.style.display === 'block'
			? (o.style.display = 'none')
			: ((e = 0), (f = []), y(0), (o.style.display = 'block'));
	}),
		document.addEventListener('click', (i) => {
			t.contains(i.target) || (o.style.display = 'none');
		});
}
function wt(t, c, m) {
	let u = null,
		b = null;
	const l = (r) => {
			const e = String(r.getDate()).padStart(2, '0'),
				f = String(r.getMonth() + 1).padStart(2, '0'),
				L = r.getFullYear();
			return `${e}/${f}/${L}`;
		},
		s = (r) => {
			if (!r) return null;
			const [e, f, L] = r.split('/');
			return !e || !f || !L ? null : new Date(parseInt(L), parseInt(f) - 1, parseInt(e));
		},
		d = async () => {
			if (
				(c.type === 'date' && ((c.type = 'text'), c.setAttribute('readonly', 'readonly')),
				b && b.style.display !== 'none')
			) {
				b.style.display = 'none';
				return;
			}
			if (
				(b ||
					((b = document.createElement('div')),
					(b.className = 'ubits-calendar-picker-container'),
					(b.style.cssText =
						'position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px; display: none;'),
					(t.style.position = 'relative'),
					t.appendChild(b)),
				u)
			) {
				b.style.display = 'block';
				return;
			}
			try {
				const r = await import('./index-yMb4_Bo5.mjs').then((y) => y.C),
					{ createCalendar: e } = r,
					f = c.value,
					L = s(f) || /* @__PURE__ */ new Date();
				(u = e({
					mode: 'single',
					selectedDate: s(f),
					initialDate: L,
					onDateSelect: (y) => {
						const i = l(y);
						(c.value = i), b && (b.style.display = 'none'), m && m(i);
					},
				})),
					b.appendChild(u.element),
					(b.style.display = 'block');
			} catch (r) {
				console.error('❌ [Calendar Picker] Error cargando Calendar UBITS:', r),
					b &&
						((b.innerHTML =
							'<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>'),
						(b.style.display = 'block'));
			}
		};
	c.addEventListener('click', (r) => {
		r.preventDefault(), r.stopPropagation(), d();
	}),
		c.addEventListener('focus', (r) => {
			r.preventDefault(), r.stopPropagation(), d();
		});
	const o = t.querySelector('.ubits-input-icon-right');
	o &&
		o.addEventListener('click', (r) => {
			r.preventDefault(), r.stopPropagation(), d();
		}),
		document.addEventListener('click', (r) => {
			b && !t.contains(r.target) && (b.style.display = 'none');
		}),
		document.addEventListener('keydown', (r) => {
			r.key === 'Escape' && b && (b.style.display = 'none');
		});
}
function St(t, c, m) {
	const u = () => {
		Pe(c, t.value.length, m),
			t.value.length > m && ((t.value = t.value.substring(0, m)), Pe(c, m, m));
	};
	t.addEventListener('input', u), Pe(c, t.value.length, m);
}
function Pe(t, c, m) {
	(t.textContent = `${c}/${m}`),
		c >= m
			? t.classList.add('ubits-input-counter--limit')
			: t.classList.remove('ubits-input-counter--limit');
}
function Tt(t, c) {
	const m = `ubits-rich-text-image-modal-${Date.now()}`,
		u = `${m}-input`,
		b = {
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
            id="${u}"
            class="ubits-input ubits-input--md"
            placeholder="https://ejemplo.com/imagen.jpg"
            style="flex: 1;"
          />
          <button 
            type="button"
            id="${m}-insert-btn"
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
				const r = document.getElementById(m)?.closest('.ubits-modal-overlay');
				r && setTimeout(() => r.remove(), 300);
			},
			closeOnOverlayClick: !0,
			open: !0,
		},
		l = Ve(b),
		s = l.element;
	s.id = m;
	const d = document.getElementById(`${m}-insert-btn`),
		o = document.getElementById(u);
	if (d && o) {
		const r = () => {
			const f = o.value.trim();
			if (f) {
				const L = document.createElement('img');
				(L.src = f),
					(L.style.maxWidth = '100%'),
					(L.style.height = 'auto'),
					(L.style.display = 'block'),
					(L.style.margin = 'var(--ubits-spacing-sm, 8px) 0');
				const y = window.getSelection();
				y && y.rangeCount > 0 ? y.getRangeAt(0).insertNode(L) : t.appendChild(L), c(), l.close();
			}
		};
		d.addEventListener('click', r),
			o.addEventListener('keydown', (f) => {
				f.key === 'Enter' && (f.preventDefault(), r());
			});
		const e = s.querySelector('.ubits-button--secondary');
		e &&
			e.addEventListener('click', () => {
				l.close();
			});
	}
}
function kt(t, c) {
	const m = `ubits-rich-text-table-modal-${Date.now()}`,
		u = `${m}-rows`,
		b = `${m}-cols`,
		l = {
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
              id="${u}"
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
              id="${b}"
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
				const L = document.getElementById(m)?.closest('.ubits-modal-overlay');
				L && setTimeout(() => L.remove(), 300);
			},
			closeOnOverlayClick: !0,
			open: !0,
		},
		s = Ve(l),
		d = s.element;
	d.id = m;
	const o = d.querySelector('.ubits-button--primary'),
		r = document.getElementById(u),
		e = document.getElementById(b);
	o &&
		r &&
		e &&
		o.addEventListener('click', () => {
			const L = parseInt(r.value) || 2,
				y = parseInt(e.value) || 2;
			if (L > 0 && y > 0) {
				const i = document.createElement('table');
				(i.style.borderCollapse = 'collapse'),
					(i.style.width = '100%'),
					(i.style.margin = 'var(--ubits-spacing-sm, 8px) 0'),
					(i.style.border = '1px solid var(--ubits-border-1)');
				for (let w = 0; w < L; w++) {
					const $ = document.createElement('tr');
					for (let z = 0; z < y; z++) {
						const M = document.createElement('td');
						(M.style.border = '1px solid var(--ubits-border-1)'),
							(M.style.padding = 'var(--ubits-spacing-sm, 8px)'),
							(M.style.minWidth = '50px'),
							(M.textContent = ' '),
							$.appendChild(M);
					}
					i.appendChild($);
				}
				const T = window.getSelection();
				T && T.rangeCount > 0 ? T.getRangeAt(0).insertNode(i) : t.appendChild(i), c(), s.close();
			}
		});
	const f = d.querySelector('.ubits-button--secondary');
	f &&
		f.addEventListener('click', () => {
			s.close();
		});
}
function _t(t, c) {
	const m = `ubits-rich-text-link-modal-${Date.now()}`,
		u = `${m}-input`,
		b = {
			title: 'Insertar enlace',
			size: 'md',
			bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL del enlace:
        </label>
        <input 
          type="text" 
          id="${u}"
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
				const e = document.getElementById(m)?.closest('.ubits-modal-overlay');
				e && setTimeout(() => e.remove(), 300);
			},
			closeOnOverlayClick: !0,
			open: !0,
		},
		l = Ve(b),
		s = l.element;
	s.id = m;
	const d = s.querySelector('.ubits-button--primary'),
		o = document.getElementById(u);
	d &&
		o &&
		d.addEventListener('click', () => {
			const e = o.value.trim();
			e && (document.execCommand('createLink', !1, e), c(), l.close());
		});
	const r = s.querySelector('.ubits-button--secondary');
	r &&
		r.addEventListener('click', () => {
			l.close();
		}),
		o &&
			o.addEventListener('keydown', (e) => {
				e.key === 'Enter' && (e.preventDefault(), d && d.click());
			});
}
function $t(t, c, m) {
	const u = t.querySelector('.ubits-input-rich-text-toolbar');
	if (!u) return;
	const b = c.closest('.ubits-input-rich-text-wrapper');
	if (!b) return;
	const l = c.placeholder || '',
		s = document.createElement('div');
	s.className = c.className;
	const d = window.getComputedStyle(c);
	(s.style.cssText = c.style.cssText),
		(s.style.position = 'relative'),
		(s.style.padding = d.padding || '12px 12px'),
		(s.style.margin = '0'),
		(s.style.outline = 'none'),
		(s.style.overflow = 'auto'),
		(s.style.minHeight = d.minHeight || '80px'),
		(s.style.resize = 'vertical'),
		(s.contentEditable = 'true'),
		s.setAttribute('data-placeholder', l);
	let o = t.closest('.ubits-input-wrapper');
	o || (o = t.parentElement?.closest('.ubits-input-wrapper')),
		o || (o = document.getElementById(t.id)?.parentElement?.closest('.ubits-input-wrapper')),
		console.log('[Rich Text Placeholder] ===== DEBUG ALINEAMIENTO ====='),
		console.log('[Rich Text Placeholder] inputWrapper:', o),
		console.log('[Rich Text Placeholder] container:', t),
		console.log('[Rich Text Placeholder] container.parentElement:', t.parentElement),
		console.log('[Rich Text Placeholder] richTextWrapper:', b),
		console.log('[Rich Text Placeholder] richTextWrapper.parentElement:', b?.parentElement);
	let r = null;
	if (
		(o && (r = o.querySelector('.ubits-input-icon-left')),
		!r && t.parentElement && (r = t.parentElement.querySelector('.ubits-input-icon-left')),
		!r && b?.parentElement && (r = b.parentElement.querySelector('.ubits-input-icon-left')),
		!r)
	) {
		const y = document.querySelectorAll('.ubits-input-icon-left');
		for (const i of Array.from(y)) {
			const T = i,
				w = t.getBoundingClientRect(),
				$ = T.getBoundingClientRect();
			if (Math.abs($.top - w.top) < 100) {
				r = T;
				break;
			}
		}
	}
	const e = r !== null;
	if (
		(console.log('[Rich Text Placeholder] leftIconElement:', r),
		console.log('[Rich Text Placeholder] hasLeftIcon:', e),
		e && r)
	) {
		const y = r.getBoundingClientRect(),
			i = window.getComputedStyle(r),
			T = i.left,
			w = i.top,
			$ = i.transform;
		console.log('[Rich Text Placeholder] Icono encontrado:', r),
			console.log('[Rich Text Placeholder] Icono rect:', y),
			console.log('[Rich Text Placeholder] Icono left (computed):', T),
			console.log('[Rich Text Placeholder] Icono top (computed):', w),
			console.log('[Rich Text Placeholder] Icono transform:', $);
		const z = d.paddingLeft || '12px',
			M = d.paddingTop || '12px',
			S = d.paddingRight || '12px',
			G = d.paddingBottom || '12px';
		console.log('[Rich Text Placeholder] Textarea padding:', {
			left: z,
			top: M,
			right: S,
			bottom: G,
		});
		const W = s.getBoundingClientRect();
		console.log('[Rich Text Placeholder] EditableDiv rect:', W);
		const ne = y.left - W.left,
			ae = y.top - W.top,
			Q = y.bottom - W.top;
		console.log('[Rich Text Placeholder] Icono posición relativa:', {
			left: ne,
			top: ae,
			bottom: Q,
		});
		const J = d.lineHeight || '1.5',
			q = d.fontSize || '14px';
		console.log('[Rich Text Placeholder] Texto:', {
			fontSize: q,
			lineHeight: J,
		}),
			s.setAttribute('data-has-left-icon', 'true'),
			s.style.setProperty('--placeholder-left', z),
			s.style.setProperty('--placeholder-top', M),
			console.log('[Rich Text Placeholder] Variables CSS establecidas:', {
				'--placeholder-left': z,
				'--placeholder-top': M,
			}),
			requestAnimationFrame(() => {
				s.querySelector('::before') || window.getComputedStyle(s, '::before');
				const pe = window.getComputedStyle(s, '::before');
				console.log('[Rich Text Placeholder] Después de render:', {
					placeholderLeft: pe.left,
					placeholderTop: pe.top,
					placeholderWidth: pe.width,
					placeholderHeight: pe.height,
				});
			});
	} else {
		const y = d.paddingTop || '12px',
			i = d.paddingLeft || '12px';
		console.log('[Rich Text Placeholder] Sin icono, usando valores por defecto:', {
			paddingTop: y,
			paddingLeft: i,
		}),
			s.style.setProperty('--placeholder-top', y),
			s.style.setProperty('--placeholder-left', i);
	}
	console.log('[Rich Text Placeholder] ===== FIN DEBUG ====='),
		c.value && c.value.trim()
			? (s.innerHTML = c.value)
			: s.classList.add('ubits-rich-text-placeholder'),
		(c.style.display = 'none'),
		c.setAttribute('data-rich-text-editor', 'true'),
		b.insertBefore(s, c),
		e &&
			r &&
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					let y = r;
					if (
						(o && (y = o.querySelector('.ubits-input-icon-left') || r),
						!y &&
							t.parentElement &&
							(y = t.parentElement.querySelector('.ubits-input-icon-left') || r),
						y)
					) {
						const i = y.getBoundingClientRect(),
							T = s.getBoundingClientRect();
						if (
							(console.log('[Rich Text Placeholder] Después de insertar en DOM:'),
							console.log('[Rich Text Placeholder] Icono rect:', i),
							console.log('[Rich Text Placeholder] EditableDiv rect:', T),
							T.width > 0 && T.height > 0)
						) {
							const w = i.top - T.top,
								$ = i.bottom - T.top,
								z = i.left - T.left;
							console.log('[Rich Text Placeholder] Posiciones relativas:', {
								iconTop: w,
								iconBottom: $,
								iconLeft: z,
								iconCenterY: w + i.height / 2,
							});
							const M = w + i.height / 2,
								S = parseFloat(d.fontSize || '16px'),
								G = d.lineHeight;
							let W;
							G === 'normal'
								? (W = S * 1.2)
								: G.includes('px')
									? (W = parseFloat(G))
									: (W = S * parseFloat(G));
							const ne = parseFloat(d.paddingTop || '12px'),
								ae = ne + S * 0.75,
								Q = M - ae,
								J = ne + Q;
							console.log('[Rich Text Placeholder] Cálculos de alineamiento:', {
								iconCenterY: M,
								fontSize: S,
								lineHeight: W,
								paddingTop: ne,
								textBaselineY: ae,
								offset: Q,
								adjustedTop: J,
							});
							const q = Math.max(0, J),
								be = (s.style.padding || d.padding || '12px 12px').split(' '),
								Y = be[1] || be[0] || '12px',
								ge = be[2] || be[0] || '12px',
								ue = be[3] || be[1] || be[0] || '40px';
							(s.style.padding = `${q}px ${Y} ${ge} ${ue}`),
								s.style.setProperty('--placeholder-top', `${q}px`),
								s.style.setProperty('--placeholder-left', ue),
								console.log('[Rich Text Placeholder] Variables CSS finales:', {
									'--placeholder-top': `${q}px`,
									'--placeholder-left': ue,
									'editableDiv padding actualizado': `${q}px ${Y} ${ge} ${ue}`,
								});
						} else
							console.warn('[Rich Text Placeholder] EditableDiv aún no tiene dimensiones válidas');
					}
				});
			});
	const f = (y) => {
		const i = s.innerText || '';
		(c.value = i),
			m && m(i, y),
			i.trim()
				? s.classList.remove('ubits-rich-text-placeholder')
				: s.classList.add('ubits-rich-text-placeholder');
	};
	s.addEventListener('input', f),
		s.addEventListener('blur', f),
		s.addEventListener('focus', () => {
			s.classList.contains('ubits-rich-text-placeholder') &&
				((s.textContent = ''), s.classList.remove('ubits-rich-text-placeholder'));
			const y = b.querySelector('.ubits-input-rich-text-toolbar');
			if (y) {
				const i = window.getComputedStyle(y).borderBottom;
				window.getComputedStyle(y).borderTop,
					i &&
						i !== 'none' &&
						i !== '0px' &&
						(console.warn('[Rich Text] ⚠️ Línea divisoria detectada en focus, removiendo...'),
						(y.style.borderBottom = 'none'),
						(y.style.borderTop = 'none'));
			}
		}),
		b.addEventListener('mouseenter', () => {
			const y = b.querySelector('.ubits-input-rich-text-toolbar');
			if (y) {
				const i = window.getComputedStyle(y).borderBottom;
				i &&
					i !== 'none' &&
					i !== '0px' &&
					(console.warn('[Rich Text] ⚠️ Línea divisoria detectada en hover, removiendo...'),
					(y.style.borderBottom = 'none'),
					(y.style.borderTop = 'none'));
			}
		}),
		u.querySelectorAll('.ubits-rich-text-btn').forEach((y) => {
			y.addEventListener('click', (i) => {
				i.preventDefault(), s.focus();
				const T = y.getAttribute('data-command');
				if (T) {
					if (T === 'insertImage') Tt(s, f);
					else if (T === 'insertTable') kt(s, f);
					else if (T === 'createLink') _t(s, f);
					else if (T === 'code') {
						const w = window.getSelection();
						if (w && w.rangeCount > 0) {
							const $ = w.getRangeAt(0),
								z = document.createElement('code');
							(z.style.background = 'var(--ubits-bg-2)'),
								(z.style.padding = 'var(--ubits-spacing-xs, 2px) var(--ubits-spacing-sm, 4px)'),
								(z.style.borderRadius = 'var(--ubits-border-radius-sm, 4px)'),
								(z.style.fontFamily = 'var(--font-mono, monospace)');
							try {
								$.surroundContents(z);
							} catch {
								(z.textContent = $.toString()), $.deleteContents(), $.insertNode(z);
							}
						}
					} else document.execCommand(T, !1, void 0);
					f();
				}
			});
		});
}
function At(t, c) {
	let m = t.closest('.ubits-input-wrapper');
	m || (m = t.parentElement?.closest('.ubits-input-wrapper')),
		m || (m = document.getElementById(t.id)?.parentElement?.closest('.ubits-input-wrapper'));
	let u = null;
	if (
		(m && (u = m.querySelector('.ubits-input-icon-left')),
		!u && t.parentElement && (u = t.parentElement.querySelector('.ubits-input-icon-left')),
		!u)
	) {
		const l = document.querySelectorAll('.ubits-input-icon-left');
		for (const s of Array.from(l)) {
			const d = s,
				o = t.getBoundingClientRect(),
				r = d.getBoundingClientRect();
			if (Math.abs(r.top - o.top) < 100) {
				u = d;
				break;
			}
		}
	}
	!(u !== null) ||
		!u ||
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const l = m?.querySelector('.ubits-input-icon-left') || u;
				if (l && c) {
					const s = l.getBoundingClientRect(),
						d = c.getBoundingClientRect();
					if (d.width > 0 && d.height > 0) {
						const o = s.top - d.top;
						s.bottom - d.top, s.left - d.left;
						const r = o + s.height / 2,
							e = window.getComputedStyle(c),
							f = parseFloat(e.fontSize || '16px'),
							L = parseFloat(e.paddingTop || '12px'),
							y = L + f * 0.75,
							i = r - y,
							T = L + i,
							w = Math.max(0, T),
							z = (e.padding || '12px 12px').split(' '),
							M = z[1] || z[0] || '12px',
							S = z[2] || z[0] || '12px',
							G = z[3] || z[1] || z[0] || '40px';
						c.style.padding = `${w}px ${M} ${S} ${G}`;
					}
				}
			});
		});
}
function It(t) {
	const {
			title: c,
			description: m,
			imageUrl: u,
			icon: b,
			actionLabel: l,
			showPrimaryButton: s = !1,
			primaryButtonIcon: d,
			showPrimaryButtonIcon: o = !1,
			secondaryActionLabel: r,
			showSecondaryButton: e = !1,
			secondaryButtonIcon: f,
			showSecondaryButtonIcon: L = !1,
			className: y = '',
			style: i = '',
		} = t,
		T = ['ubits-empty-state', 'ubits-empty-state--default', y].filter(Boolean).join(' '),
		w = i ? ` style="${i}"` : '';
	let $ = '';
	u
		? ($ = `
      <div class="ubits-empty-state__image">
        <img src="${u}" alt="${c}" />
      </div>
    `)
		: b &&
			($ = `
      <div class="ubits-empty-state__icon">
        <i class="far fa-${b}"></i>
      </div>
    `);
	let z = '',
		M = l || '';
	o && d && (M = `<i class="far fa-${d}"></i> ${M}`);
	let S = r || '';
	L && f && (S = `<i class="far fa-${f}"></i> ${S}`);
	const G =
			s && l
				? `<button class="ubits-button ubits-button--primary ubits-button--sm" data-action="primary" type="button">${M}</button>`
				: '',
		W =
			e && r
				? `<button class="ubits-button ubits-button--secondary ubits-button--sm" data-action="secondary" type="button">${S}</button>`
				: '';
	return (
		(G || W) &&
			(z = `
      <div class="ubits-empty-state__actions">
        ${W}
        ${G}
      </div>
    `),
		`
    <div class="${T}"${w}>
      ${$}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${c}</h3>
        ${m ? `<p class="ubits-empty-state__description">${m}</p>` : ''}
      </div>
      ${z}
    </div>
  `.trim()
	);
}
function Nt(t, c, m) {
	const u = c.data[t.id],
		b = c.data;
	switch (m) {
		case 'nombre': {
			const l = u || b.nombre || b.name || '';
			return t.editable
				? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${l}</span>`
				: `<span class="ubits-body-md-regular">${l}</span>`;
		}
		case 'progreso': {
			let l = null;
			if (u != null) {
				if (typeof u == 'number') l = u;
				else if (typeof u == 'string') {
					const d = parseFloat(u.replace('%', '').trim());
					isNaN(d) || (l = d);
				}
			}
			if (l === null && b) {
				const d = b.progress !== void 0 ? b.progress : b.progreso;
				if (d != null) {
					if (typeof d == 'number') l = d;
					else if (typeof d == 'string') {
						const o = parseFloat(d.replace('%', '').trim());
						isNaN(o) || (l = o);
					}
				}
			}
			return (
				l === null && (l = 50),
				(l = Math.max(0, Math.min(100, l))),
				tt({
					value: l,
					size: 'sm',
					variant: 'default',
					indicator: `${Math.round(l)}%`,
				})
			);
		}
		case 'nombre-avatar': {
			const l = u || b.nombre || b.name || '',
				s = b.avatar || b.avatarUrl || null;
			console.log('🖼️ [AVATAR] Renderizando nombre-avatar:', {
				columnId: t.id,
				rowId: c.id,
				nombre: l,
				avatar: s,
				cellData: b,
				hasAvatar: !!s,
				avatarType: typeof s,
			});
			const d = t.avatarVariant || 'initials',
				o = (y) =>
					y
						.split(' ')
						.map((i) => i[0])
						.join('')
						.toUpperCase()
						.slice(0, 2) || 'U';
			let r = '';
			if (d === 'photo') {
				let y = null;
				s && typeof s == 'string'
					? (y = s)
					: s && typeof s == 'object' && (y = s.imageUrl || s.url || null),
					!y && b && (y = b.imageUrl || b.avatarUrl || b.avatarImage || null),
					y
						? (r = Ie({
								imageUrl: y,
								size: 'sm',
							}))
						: (r = Ie({
								imageUrl: '../assets/images/Profile-image.jpg',
								size: 'sm',
							}));
			} else if (d === 'initials') {
				if (s && typeof s == 'object' && s.initials)
					console.log('🖼️ [AVATAR] Usando initials del objeto avatar:', s.initials),
						(r = Ie({
							initials: s.initials,
							size: 'sm',
						}));
				else {
					const y = o(l);
					console.log('🖼️ [AVATAR] Generando initials del nombre:', l, '->', y),
						(r = Ie({
							initials: y,
							size: 'sm',
						}));
				}
				console.log('🖼️ [AVATAR] HTML generado (initials):', r ? r.substring(0, 100) : 'VACÍO');
			} else {
				const y = s && typeof s == 'object' && s.icon ? s.icon : 'user';
				console.log('🖼️ [AVATAR] Usando icon:', y),
					(r = Ie({
						icon: y,
						size: 'sm',
					})),
					console.log('🖼️ [AVATAR] HTML generado (icon):', r ? r.substring(0, 100) : 'VACÍO');
			}
			const f = t.editable
					? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${l}</span>`
					: `<span class="ubits-body-md-regular">${l}</span>`,
				L = `
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${r}
          ${f}
        </div>
      `;
			return console.log('🖼️ [AVATAR] HTML final:', L.substring(0, 200)), L;
		}
		case 'nombre-avatar-texto': {
			const l = u || b.nombre || b.name || '',
				s = b.avatar || b.avatarUrl || null,
				d = b.area || b.areaNombre || b.textoComplementario || b.complementario || '',
				o = t.avatarVariant || 'initials',
				r = (L) =>
					L.split(' ')
						.map((y) => y[0])
						.join('')
						.toUpperCase()
						.slice(0, 2) || 'U';
			let e = '';
			if (o === 'photo') {
				let L = null;
				s && typeof s == 'string'
					? (L = s)
					: s && typeof s == 'object' && (L = s.imageUrl || s.url || null),
					!L && b && (L = b.imageUrl || b.avatarUrl || b.avatarImage || null),
					L
						? (e = Ie({
								imageUrl: L,
								size: 'sm',
							}))
						: (e = Ie({
								imageUrl: '../assets/images/Profile-image.jpg',
								size: 'sm',
							}));
			} else if (o === 'initials')
				if (s && typeof s == 'object' && s.initials)
					e = Ie({
						initials: s.initials,
						size: 'sm',
					});
				else {
					const L = r(l);
					e = Ie({
						initials: L,
						size: 'sm',
					});
				}
			else {
				const L = s && typeof s == 'object' && s.icon ? s.icon : 'user';
				e = Ie({
					icon: L,
					size: 'sm',
				});
			}
			const f = `<span class="ubits-body-md-regular">${l}</span>`;
			return `
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm, 12px);">
          ${e}
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${f}
            ${d ? `<span class="ubits-body-sm-regular" style="color: var(--ubits-fg-1-medium);">${d}</span>` : ''}
          </div>
        </div>
      `;
		}
		case 'estado': {
			const l = {
					activo: 'active',
					inactivo: 'disabled',
					pendiente: 'pending',
					completado: 'completed',
					publicado: 'published',
					cumplido: 'fulfilled',
					creado: 'created',
					error: 'not-fulfilled',
					denegado: 'denied',
					borrador: 'draft',
					'en-progreso': 'in-progress',
					sincronizando: 'syncing',
					'pendiente-aprobacion': 'pending-approval',
					'no-iniciado': 'not-started',
					finalizado: 'finished',
					archivado: 'archived',
					deshabilitado: 'disabled',
					pausado: 'paused',
					oculto: 'hidden',
					cancelado: 'denied',
				},
				s = u || b.estado || b.status || 'pendiente',
				d = String(s).toLowerCase().trim(),
				o = l[d] || l.pendiente,
				e =
					{
						active: 'Activo',
						completed: 'Completado',
						published: 'Publicado',
						fulfilled: 'Cumplido',
						created: 'Creado',
						'not-fulfilled': 'No cumplido',
						denied: 'Denegado',
						draft: 'Borrador',
						'in-progress': 'En progreso',
						syncing: 'Sincronizando',
						pending: 'Pendiente',
						'pending-approval': 'Pendiente aprobación',
						'not-started': 'No iniciado',
						finished: 'Finalizado',
						archived: 'Archivado',
						disabled: 'Deshabilitado',
						paused: 'Pausado',
						hidden: 'Oculto',
					}[o] || String(s),
				f = t.editable,
				L = ot({
					label: e,
					status: o,
					size: 'xs',
					rightIcon: f ? 'chevron-down' : null,
					clickable: f,
				});
			return f
				? `
          <div class="ubits-data-table__status-editable" data-row-id="${c.id}" data-column-id="${t.id}" data-editable="true" data-current-status="${o}">
            ${L}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${c.id}-${t.id}" style="display: none;"></div>
          </div>
        `
				: L;
		}
		case 'radio': {
			const l = u === !0 || u === 'true' || u === 1 || u === c.id || u === String(c.id),
				s = t.radioLabel !== !1 && t.radioLabel !== void 0,
				d = typeof t.radioLabel == 'string' ? t.radioLabel : s ? String(c.data[t.id] || c.id) : '',
				o = t.editable === !0,
				r = !o;
			return ct({
				label: d,
				name: `radio-${t.id}`,
				value: String(c.id),
				checked: l,
				size: 'md',
				disabled: r,
			}).replace(
				'<input',
				`<input data-row-id="${c.id}" data-column-id="${t.id}" data-radio-button="true" ${o ? 'data-editable="true"' : ''}`,
			);
		}
		case 'toggle': {
			const l = u === !0 || u === 'true' || u === 1,
				s = t.toggleLabel !== !1 && t.toggleLabel !== void 0,
				d =
					typeof t.toggleLabel == 'string' ? t.toggleLabel : s ? String(c.data[t.id] || c.id) : '';
			return rt({
				label: d,
				checked: l,
				size: 'md',
			}).replace(
				'<input',
				`<input data-row-id="${c.id}" data-column-id="${t.id}" data-toggle-button="true"`,
			);
		}
		case 'checkbox': {
			const l = u === !0 || u === 'true' || u === 1,
				s = t.checkboxLabel !== !1 && t.checkboxLabel !== void 0,
				d =
					typeof t.checkboxLabel == 'string'
						? t.checkboxLabel
						: s
							? String(c.data[t.id] || c.id)
							: '',
				o = t.editable === !0;
			return Me({
				label: d,
				checked: l,
				size: 'md',
				disabled: !o,
			}).replace(
				'<input',
				`<input data-row-id="${c.id}" data-column-id="${t.id}" data-checkbox-button="true" ${o ? 'data-editable="true"' : ''}`,
			);
		}
		case 'correo': {
			const l = u || '';
			return t.emailClickable !== !1
				? `<a href="mailto:${l}" class="ubits-body-md-regular" style="color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static-inverted)); text-decoration: none;">${l}</a>`
				: `<span class="ubits-body-md-regular">${l}</span>`;
		}
		case 'acciones':
			return $e({
				text: 'Eliminar',
				variant: 'tertiary',
				size: 'sm',
				icon: 'trash',
				iconStyle: 'regular',
				className: 'ubits-data-table__action-button',
				attributes: {
					'data-row-id': String(c.id),
					'data-column-id': t.id,
				},
			});
		case 'fecha': {
			const l = u || '';
			return t.editable === !0
				? `
            <div class="ubits-data-table__date-editable" data-row-id="${c.id}" data-column-id="${t.id}">
              <span class="ubits-body-md-regular ubits-data-table__date-display">${l || 'Seleccionar fecha'}</span>
            </div>
          `
				: `<span class="ubits-body-md-regular">${l}</span>`;
		}
		case 'area':
			return `<span class="ubits-body-md-regular">${u || 'Desarrollo'}</span>`;
		case 'lider':
			return `<span class="ubits-body-md-regular">${u || 'Juan Pérez'}</span>`;
		case 'pais':
			return `<span class="ubits-body-md-regular">${u || 'Colombia'}</span>`;
		case 'ciudad':
			return `<span class="ubits-body-md-regular">${u || 'Bogotá'}</span>`;
		case 'drag-handle':
			return `
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${c.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;
		case 'expand': {
			const l = c.expanded || !1;
			return `
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${l ? 'Colapsar' : 'Expandir'} fila"
          data-row-id="${c.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${l ? 'down' : 'right'}" aria-hidden="true"></i>
        </button>
      `;
		}
		default:
			return `<span class="ubits-body-md-regular">${u || ''}</span>`;
	}
}
function Bt(t, c, m = 0) {
	if (t.type !== 'checkbox' && (t.id === 'checkbox' || t.id.startsWith('checkbox-'))) {
		const d = c.data[t.id] || !1,
			r = Me({
				label: '',
				checked: d,
				size: 'md',
				className: 'ubits-data-table__cell-checkbox',
			}).replace(
				'<input',
				`<input data-row-id="${c.id}" data-column-id="${t.id}" aria-label="Checkbox ${t.title}"`,
			),
			e = t.id === 'checkbox-2' ? '12px' : 'var(--ubits-spacing-md, 16px)',
			f = t.pinned ? ' ubits-data-table__cell--pinned' : '',
			L = t.pinned
				? `position: sticky !important; left: ${m}px !important; z-index: 12 !important;`
				: '',
			i = `${`text-align: center; vertical-align: middle; padding-left: ${e} !important;`}${L ? ' ' + L : ''}`;
		return `
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${f}" data-column-id="${t.id}" ${t.pinned ? 'data-pinned="true"' : ''} style="${i}">
        ${r}
      </td>
    `;
	}
	if (t.type) {
		const d = Nt(t, c, t.type),
			o =
				t.editable &&
				(t.type === 'nombre' ||
					t.type === 'nombre-avatar' ||
					t.type === 'estado' ||
					t.type === 'fecha' ||
					t.type === 'checkbox' ||
					t.type === 'radio') &&
				t.type !== 'drag-handle' &&
				t.type !== 'expand',
			r =
				t.type === 'drag-handle'
					? 'ubits-data-table__cell--drag-handle'
					: t.type === 'expand'
						? 'ubits-data-table__cell--expand'
						: `ubits-data-table__cell--${t.type}`,
			e = o ? 'ubits-data-table__cell--editable' : '',
			f = t.pinned ? ' ubits-data-table__cell--pinned' : '',
			L =
				t.type === 'drag-handle' || t.type === 'expand'
					? 'text-align: center; vertical-align: middle;'
					: '',
			y = t.pinned
				? `position: sticky !important; left: ${m}px !important; z-index: 12 !important;`
				: '',
			i = `${L}${y ? ' ' + y : ''}`,
			T = i ? ` style="${i}"` : '';
		t.pinned &&
			console.log('📌 [CELL TIPO] Columna fijada detectada:', {
				columnId: t.id,
				columnType: t.type,
				rowId: c.id,
				pinned: t.pinned,
				pinnedLeft: m,
				pinnedClass: f,
				pinnedStyle: y,
				hasPinnedClass: f.includes('pinned'),
				hasPinnedStyle: y.includes('left'),
				hasPositionStyle: y.includes('sticky'),
			});
		const w =
			o &&
			(t.type === 'nombre' ||
				t.type === 'nombre-avatar' ||
				t.type === 'estado' ||
				t.type === 'fecha')
				? `data-row-id="${c.id}" data-column-id="${t.id}" data-editable="true"${t.pinned ? ' data-pinned="true"' : ''}`
				: `data-column-id="${t.id}"${t.pinned ? ' data-pinned="true"' : ''}`;
		return `
      <td class="ubits-data-table__cell ${r} ${e}${f}" ${w}${T}>
        ${d}
      </td>
    `;
	}
	const b = t.renderCell ? t.renderCell(c.data) : c.data[t.id] || '',
		l = t.pinned ? ' ubits-data-table__cell--pinned' : '',
		s = t.pinned
			? ` style="position: sticky !important; left: ${m}px !important; z-index: 12 !important;"`
			: '';
	return (
		t.pinned &&
			console.log('📌 [CELL NORMAL] Columna fijada detectada:', {
				columnId: t.id,
				rowId: c.id,
				pinned: t.pinned,
				pinnedLeft: m,
				pinnedClass: l,
				pinnedStyle: s,
				hasPinnedClass: l.includes('pinned'),
				hasPinnedStyle: s.includes('left'),
				hasPositionStyle: s.includes('sticky'),
			}),
		`
    <td class="ubits-data-table__cell${l}" data-column-id="${t.id}"${t.pinned ? ' data-pinned="true"' : ''}${s}>
      ${b}
    </td>
  `
	);
}
function Ht(t, c = !1, m = !0, u = [], b = null, l = null, s = !0, d = 0) {
	if (t.type === 'drag-handle' || t.type === 'expand') {
		const W = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
			ne = t.pinned
				? `position: sticky !important; left: ${d}px !important; z-index: 10 !important;`
				: '',
			ae = t.width ? `width: ${t.width}px;` : '',
			Q = [ne, ae].filter(Boolean).join(' '),
			J = Q ? `style="${Q}"` : '';
		return `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${t.type}${W}" 
        ${J}
        data-column-id="${t.id}"
        ${t.pinned ? 'data-pinned="true"' : ''}
      >
      </th>
    `;
	}
	const o = t.type !== 'checkbox' && (t.id === 'checkbox' || t.id.startsWith('checkbox-'));
	if ((t.type, o)) {
		const W = u.length > 0 && u.every((ue) => ue.data[t.id] === !0),
			ne = u.some((ue) => ue.data[t.id] === !0),
			Q = Me({
				label: '',
				checked: W,
				indeterminate: ne && !W,
				size: 'md',
				className: 'ubits-data-table__column-checkbox-header',
			}).replace(
				'<input',
				`<input data-column-checkbox-header="${t.id}" aria-label="Seleccionar todos ${t.title}"`,
			),
			J = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
			q = t.pinned
				? `position: sticky !important; left: ${d}px !important; z-index: 10 !important;`
				: '',
			pe = t.width ? `width: ${t.width}px;` : '',
			be = [q, pe].filter(Boolean).join(' '),
			Y = be ? `style="${be}"` : '';
		return `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${J}" 
        ${Y}
        data-column-id="${t.id}"
        ${t.pinned ? 'data-pinned="true"' : ''}
      >
        ${Q}
      </th>
    `;
	}
	const r = t.type === 'drag-handle' || t.type === 'expand',
		e =
			c && !o && !r
				? `
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${t.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  `
				: '',
		f =
			!o && !r && m
				? (() => {
						const W = b === t.id,
							ne = W ? ' ubits-data-table__column-sort--active' : '';
						let ae = 'arrow-up-a-z',
							Q = 'fas fa-sort-alpha-up';
						return (
							W &&
								l &&
								(l === 'asc'
									? ((ae = 'arrow-up-a-z'), (Q = 'fas fa-sort-alpha-up'))
									: ((ae = 'arrow-down-a-z'), (Q = 'fas fa-sort-alpha-down'))),
							`
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${ne}" 
           data-column-id="${t.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${t.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${ae}"></wa-icon>
        <i class="${Q}" aria-hidden="true"></i>
      </div>
    `
						);
					})()
				: '',
		L =
			!o && !r && s
				? $e({
						variant: 'tertiary',
						size: 'xs',
						icon: 'ellipsis',
						iconStyle: 'solid',
						iconOnly: !0,
						className: 'ubits-data-table__column-menu-button',
						attributes: {
							'aria-label': `Menú de opciones de ${t.title}`,
							'data-column-id': t.id,
							'data-menu-button': 'true',
						},
					})
				: '',
		y = `
    <div class="ubits-data-table__column-header-content">
      ${e}
      <span class="ubits-data-table__column-title">${t.title}</span>
      <div class="ubits-data-table__column-actions">
        ${f}
        ${L}
      </div>
    </div>
  `,
		i = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
		T = t.pinned ? `left: ${d}px !important;` : '',
		w = t.width ? `width: ${t.width}px;` : '',
		$ = t.pinned ? 'position: sticky !important;' : '',
		z = t.pinned ? 'z-index: 10 !important;' : '',
		M = [$, T, z, w].filter(Boolean).join(' '),
		S = M ? `style="${M}"` : '';
	t.pinned &&
		console.log('📌 [HEADER PRE-HTML] Antes de construir HTML:', {
			columnId: t.id,
			pinned: t.pinned,
			combinedStyle: M,
			combinedStyleLength: M.length,
			styleAttribute: S,
			willIncludeStyle: !!S,
		});
	const G = `
    <th 
      class="ubits-data-table__column-header${i}" 
      ${S} 
      data-column-id="${t.id}"
      ${t.pinned ? 'data-pinned="true"' : ''}
    >
      ${y}
    </th>
  `;
	return (
		t.pinned &&
			console.log('📌 [HEADER HTML] HTML generado para columna fijada:', {
				columnId: t.id,
				htmlLength: G.length,
				htmlIncludesSticky: G.includes('sticky'),
				htmlIncludesLeft: G.includes('left'),
				htmlIncludesPosition: G.includes('position'),
				htmlIncludesWidth: G.includes('width'),
				styleAttributeInHTML: G.includes('style='),
				htmlPreview: G.substring(0, 400),
			}),
		G
	);
}
function Rt(t, c, m, u = []) {
	const b = t.expanded || !1,
		l = c.filter((r) => r.visible !== !1),
		s = l
			.map((r, e) => {
				const f = u[e] || 0;
				return Bt(r, t, f);
			})
			.join('');
	let o = `
    <tr class="${['ubits-data-table__row', b ? 'ubits-data-table__row--expanded' : '']
			.filter(Boolean)
			.join(' ')}" data-row-id="${t.id}">
      ${s}
    </tr>
  `;
	if (b && t.renderExpandedContent) {
		const r = t.renderExpandedContent(t.data),
			e = l.length;
		console.log(
			'📋 [ROW RENDER] Fila expandida - rowId:',
			t.id,
			'colspan:',
			e,
			'tiene contenido:',
			!!r,
		),
			(o += `
      <tr class="ubits-data-table__row-expanded-row" data-expanded-for="${t.id}">
        <td class="ubits-data-table__row-expanded-content" colspan="${e}">
          ${r}
        </td>
      </tr>
    `);
	} else
		b &&
			!t.renderExpandedContent &&
			console.warn(
				'📋 [ROW RENDER] ⚠️ Fila marcada como expandida pero no tiene renderExpandedContent - rowId:',
				t.id,
			);
	return o;
}
function Ot(t, c = {}) {
	const { header: m, rows: u } = t;
	if (!m) return '';
	const {
			title: b,
			showTitle: l = b !== void 0,
			counter: s,
			displayedItems: d,
			totalItems: o,
			showCounter: r = s !== void 0 && s !== !1,
			primaryButton: e,
			showPrimaryButton: f = e !== void 0,
			secondaryButtons: L = [],
			showSecondaryButtons: y = L !== void 0 && L.length > 0,
			searchButton: i,
			showSearchButton: T = i !== void 0,
			filterButton: w,
			showFilterButton: $ = w !== void 0,
			columnSelectorButton: z,
			showColumnSelectorButton: M = z !== void 0,
		} = m,
		S = m.__isSearchActive || !1,
		G = m.__searchTerm || '';
	let W = '';
	if (r && s) {
		if (typeof s == 'string')
			s === 'total-only' ? (W = `${o !== void 0 ? o : u.length} resultados`) : (W = s);
		else if (s === !0) {
			const ue = d !== void 0 ? d : u.length,
				le = o !== void 0 ? o : u.length;
			(W = `${ue}/${le} resultados`),
				console.log('🔢 [COUNTER] Calculando contador:', {
					displayedItems: d,
					totalItems: o,
					rowsLength: u.length,
					currentDisplayed: ue,
					total: le,
					counterText: W,
				});
		}
	}
	const ne =
			l && b
				? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-body-md-bold ubits-data-table__header-title-text">${b}</span>
      ${W ? `<span class="ubits-data-table__header-counter ubits-body-sm-regular">${W}</span>` : ''}
    </div>
  `
				: W
					? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-data-table__header-counter ubits-body-sm-regular">${W}</span>
    </div>
  `
					: '',
		ae =
			f && e
				? $e({
						variant: 'primary',
						size: 'sm',
						icon: e.icon || 'plus',
						iconStyle: e.iconStyle || 'regular',
						iconOnly: !0,
						disabled: e.disabled || !1,
						loading: e.loading || !1,
						className: 'ubits-data-table__header-primary-button',
						showTooltip: !0,
						tooltipText: e.text || 'Nuevo',
					})
				: '',
		Q =
			y && L.length > 0
				? L.slice(0, 2)
						.map((ue) =>
							$e({
								variant: 'secondary',
								size: 'sm',
								icon: ue.icon || 'download',
								iconStyle: ue.iconStyle || 'regular',
								iconOnly: !0,
								disabled: ue.disabled || !1,
								loading: ue.loading || !1,
								className: 'ubits-data-table__header-secondary-button',
								showTooltip: !0,
								tooltipText: ue.text || '',
							}),
						)
						.join('')
				: '',
		J = Object.keys(c).filter((ue) => c[ue] && c[ue].trim() !== '').length;
	let q =
		$ && w
			? $e({
					variant: 'secondary',
					size: 'sm',
					icon: 'filter',
					iconStyle: 'regular',
					iconOnly: !0,
					disabled: w.disabled || !1,
					active: w.active || !1 || J > 0,
					badge: J > 0,
					// Activar badge si hay filtros activos
					className: 'ubits-data-table__header-filter-button',
					showTooltip: !0,
					tooltipText: 'Filtros',
				})
			: '';
	if (q && J > 0) {
		const ue = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${J}</span>`;
		q = q.replace('<span class="ubits-button__badge"></span>', ue);
	}
	const pe =
			M && z
				? $e({
						variant: 'secondary',
						size: 'sm',
						icon: 'columns-3',
						iconStyle: 'regular',
						iconOnly: !0,
						disabled: z.disabled || !1,
						active: z.active || !1,
						className: 'ubits-data-table__header-column-selector-button',
						showTooltip: !0,
						tooltipText: 'Seleccionar columnas',
					})
				: '',
		be = G || (i && i.value) || '',
		Y =
			T && i
				? ze({
						active: S,
						size: 'sm',
						state: S ? 'active' : 'default',
						disabled: i.disabled || !1,
						placeholder: i.placeholder || 'Buscar...',
						value: be,
						width: 248,
						className: 'ubits-data-table__header-search-button',
					})
				: '';
	return !(ne || ae || Q || Y || q || pe)
		? (console.warn('⚠️ [DATA TABLE HEADER] No hay elementos para renderizar, retornando vacío'), '')
		: `
    <div class="ubits-data-table__header">
      ${ne}
      <div class="ubits-data-table__header-actions">
        ${Y}
        ${q}
        ${pe}
        ${Q}
        ${ae}
      </div>
    </div>
  `.trim();
}
function Ue(t, c = [], m = [], u = {}) {
	const {
			columns: b,
			rows: l,
			className: s = '',
			columnReorderable: d = !1,
			columnSortable: o = !0,
			rowReorderable: r = !1,
			rowExpandable: e = !0,
			showCheckbox: f = !0,
			showVerticalScrollbar: L = !1,
			showHorizontalScrollbar: y = !1,
			showColumnMenu: i = !0,
			showPagination: T = !1,
			currentPage: w = 1,
			itemsPerPage: $ = 10,
			paginationVariant: z = 'default',
			paginationSize: M = 'md',
			lazyLoad: S,
			lazyLoadItemsPerBatch: G = 10,
			emptyState: W,
		} = t,
		ne = t.header?.__searchTerm || '',
		ae = T ? !1 : S !== !1;
	console.log(
		'🔍 [RENDER] isLazyLoadEnabled calculado:',
		ae,
		'| showPagination:',
		T,
		'| lazyLoad:',
		S,
	);
	const Q = /* @__PURE__ */ new Set(),
		J = b.filter((n) =>
			Q.has(n.id)
				? (console.log('🔍 [RENDER DATA TABLE] ⚠️ COLUMNA DUPLICADA ELIMINADA:', n.id, n.title), !1)
				: (Q.add(n.id), !0),
		);
	console.log('🔍 [RENDER DATA TABLE] Columnas únicas:', J.length, 'de', b.length, 'totales');
	let q = J.filter((n) => n.visible !== !1);
	if (((q = q.filter((n) => n.id !== 'checkbox')), c.length > 0)) {
		const n = c.filter((p) => p !== 'checkbox'),
			a = new Map(
				q.map((p) => {
					const E = { ...p };
					return p.pinned !== void 0 && (E.pinned = p.pinned), [p.id, E];
				}),
			);
		q = n
			.map((p) => {
				const E = a.get(p);
				if (E) {
					const k = q.find((B) => B.id === p);
					k && k.pinned !== void 0 && (E.pinned = k.pinned);
				}
				return E;
			})
			.filter((p) => p !== void 0)
			.concat(
				q
					.filter((p) => !n.includes(p.id))
					.map((p) => {
						const E = { ...p };
						return p.pinned !== void 0 && (E.pinned = p.pinned), E;
					}),
			);
	} else
		q = q.map((n) => {
			const a = { ...n };
			return n.pinned !== void 0 && (a.pinned = n.pinned), a;
		});
	if (f !== !1) {
		if (!q.some((a) => a.id === 'checkbox-2')) {
			const a = {
				id: 'checkbox-2',
				title: '',
				type: void 0,
				visible: !0,
				width: 48,
			};
			q.unshift(a);
		}
	} else q.map((n) => n.id), (q = q.filter((n) => n.id !== 'checkbox-2')), q.map((n) => n.id);
	if (r) {
		if (!q.some((a) => a.type === 'drag-handle')) {
			const a = {
				id: 'drag-handle',
				title: '',
				type: 'drag-handle',
				visible: !0,
				width: 32,
			};
			q.unshift(a);
		}
	} else q = q.filter((n) => n.type !== 'drag-handle');
	if (e) {
		if (!q.some((a) => a.type === 'expand')) {
			const a = {
					id: 'expand',
					title: '',
					type: 'expand',
					visible: !0,
					width: 32,
				},
				p = q.findIndex((E) => E.type === 'drag-handle');
			p >= 0 ? q.splice(p + 1, 0, a) : q.unshift(a);
		}
	} else q = q.filter((n) => n.type !== 'expand');
	const { checkboxSticky: pe = !1, dragHandleSticky: be = !1, expandSticky: Y = !1 } = t;
	(q = q.map((n) => {
		const a = { ...n };
		return (
			n.id === 'checkbox-2'
				? pe === !0
					? (a.pinned = !0)
					: (a.pinned = !1)
				: n.type === 'drag-handle'
					? be === !0
						? (a.pinned = !0)
						: (a.pinned = !1)
					: n.type === 'expand' && (Y === !0 ? (a.pinned = !0) : (a.pinned = !1)),
			a.pinned && !n.id.startsWith('checkbox') && n.type !== 'drag-handle' && n.type,
			a
		);
	})),
		q.filter((n) => n.pinned);
	const ge = t.sortColumnId || null,
		ue = t.sortDirection || null;
	let le = [...l];
	if (m.length > 0) {
		const n = new Map(l.map((a) => [a.id, a]));
		le = m
			.map((a) => n.get(a))
			.filter((a) => a !== void 0)
			.concat(l.filter((a) => !m.includes(a.id)));
	}
	ge &&
		ue &&
		(le = [...le].sort((n, a) => {
			const p = n.data[ge],
				E = a.data[ge];
			if (p == null && E == null) return 0;
			if (p == null) return 1;
			if (E == null) return -1;
			const k = String(p).toLowerCase(),
				B = String(E).toLowerCase();
			let A = 0;
			return k < B ? (A = -1) : k > B && (A = 1), ue === 'asc' ? A : -A;
		}));
	const X = (n, a, p) => {
			let E = 0;
			const k = {
				columnId: n.id,
				steps: [],
			};
			for (let B = 0; B < a; B++) {
				const A = p[B];
				if (A && A.pinned) {
					let R = A.width;
					R ||
						(A.type === 'drag-handle' || A.type === 'expand'
							? (R = 32)
							: A.id === 'checkbox-2'
								? (R = 48)
								: (R = 150)),
						(E += R),
						k.steps.push({
							step: `columna-${A.id}`,
							added: R,
							total: E,
							reason: `Columna fijada anterior: ${A.id} (tipo: ${A.type || 'normal'})`,
						});
				} else
					A &&
						!A.pinned &&
						k.steps.push({
							step: `columna-${A.id}`,
							added: 0,
							total: E,
							reason: `Columna anterior no fijada: ${A.id}`,
						});
			}
			return (k.finalLeft = E), n.pinned, E;
		},
		se = q
			.map((n, a) => {
				const p = n.pinned ? X(n, a, q) : 0;
				return n.pinned, Ht(n, d, o, le, ge, ue, i, p);
			})
			.join('');
	let te = le,
		de = 1,
		Le = '';
	const Ee = t.__lazyLoadCurrentItems || G;
	if (
		(console.log('🔍 [RENDER] ========== FILAS DEBUG =========='),
		console.log('🔍 [RENDER] orderedRows.length:', le.length),
		console.log('🔍 [RENDER] showPagination:', T),
		console.log('🔍 [RENDER] isLazyLoadEnabled:', ae),
		console.log('🔍 [RENDER] lazyLoad option:', t.lazyLoad),
		console.log('🔍 [RENDER] currentLoadedItems:', Ee),
		console.log('🔍 [RENDER] lazyLoadItemsPerBatch:', G),
		T)
	) {
		const n = le.length;
		de = Math.max(1, Math.ceil(n / $));
		const a = Math.max(1, Math.min(w, de)),
			p = (a - 1) * $,
			E = p + $;
		(te = le.slice(p, E)),
			console.log('🔍 [RENDER] Modo PAGINACIÓN - totalRows:', n, 'paginatedRows:', te.length);
		try {
			Le = pt({
				currentPage: a,
				totalPages: de,
				totalItems: n,
				itemsPerPage: $,
				variant: z,
				size: M,
				maxVisiblePages: 7,
				showFirst: !1,
				// Sin botón Primera
				showLast: !1,
				// Sin botón Última
				showPrevNext: !0,
				// Solo Anterior/Siguiente
				showInfo: !1,
				// Sin información de items
				showItemsPerPage: !1,
				// Sin selector de items por página
				itemsPerPageOptions: [10, 20, 50, 100],
				className: 'ubits-data-table__pagination',
			});
		} catch (k) {
			console.error('❌ [PAGINATION] ERROR:', k), (Le = '');
		}
	} else
		ae
			? ((te = le.slice(0, Ee)),
				console.log('🔍 [RENDER] Modo LAZY LOAD - Mostrando', te.length, 'de', le.length, 'filas'))
			: console.log(
					'🔍 [RENDER] Modo SIN PAGINACIÓN NI LAZY LOAD - Mostrando todas las filas:',
					le.length,
				);
	console.log('🔍 [RENDER] paginatedRows.length final:', te.length),
		console.log('🔍 [RENDER] ========== FIN FILAS DEBUG ==========');
	let Se = '';
	const fe = l.length === 0,
		ye = te.length === 0,
		ve = Object.keys(u).length > 0,
		we = ne && ne.trim() !== '';
	if (ye && W) {
		let n;
		fe && W.noData
			? (n = W.noData)
			: we && W.noSearchResults
				? (n = W.noSearchResults)
				: ve && W.noFilterResults && (n = W.noFilterResults),
			n &&
				(Se = It({
					title: n.title || 'No hay resultados',
					description: n.description,
					icon: n.icon,
					imageUrl: n.imageUrl,
					actionLabel: n.actionLabel,
					showPrimaryButton: n.showPrimaryButton || !1,
					primaryButtonIcon: n.primaryButtonIcon,
					showPrimaryButtonIcon: n.showPrimaryButtonIcon || !1,
					secondaryActionLabel: n.secondaryActionLabel,
					showSecondaryButton: n.showSecondaryButton || !1,
					secondaryButtonIcon: n.secondaryButtonIcon,
					showSecondaryButtonIcon: n.showSecondaryButtonIcon || !1,
					className: 'ubits-data-table__empty-state',
				}));
	}
	const Ne = te
		.map((n, a) => {
			const p = q.map((E, k) => (E.pinned ? X(E, k, q) : 0));
			return Rt(n, q, a, p);
		})
		.join('');
	console.log(
		'🔍 [RENDER] rowsHTML generado, número de <tr> en HTML:',
		(Ne.match(/<tr/g) || []).length,
	),
		console.log('🔍 [RENDER] paginatedRows procesadas:', te.length);
	const Ce = Se || Ne,
		ke = ['ubits-data-table', s].filter(Boolean).join(' '),
		Be = q.length,
		_e = `
    <table class="${ke} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${se}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${Se ? `<tr><td colspan="${Be}" style="padding: 0;">${Se}</td></tr>` : Ce}
      </tbody>
    </table>
  `.trim(),
		N = q.some((n) => n.pinned);
	let C = y;
	N && !y && (C = !0);
	let h = L;
	if ((ae && !T && (h = !0), !T && !ae && !h)) {
		const n = 45 + le.length * 45;
		n > 600 &&
			((h = !0),
			console.log(
				'🔍 [RENDER] Habilitando scroll vertical automáticamente - altura estimada:',
				n,
				'px',
			));
	}
	let x;
	if (h || C) {
		const n = [];
		h && n.push('ubits-data-table__scrollable-container--vertical'),
			C && n.push('ubits-data-table__scrollable-container--horizontal'),
			(x = `<div class="ubits-data-table__scrollable-container ${n.join(' ')}">${_e}</div>`);
	} else x = _e;
	const v = Ot(t, u);
	let g;
	return (
		T && Le
			? (g = `<div class="ubits-data-table__container">
      ${v}
      ${x}
      <div class="ubits-data-table__pagination-wrapper">${Le}</div>
    </div>`)
			: v
				? (g = `<div class="ubits-data-table__container">
        ${v}
        ${x}
      </div>`)
				: (g = x),
		g
	);
}
function Je(t) {
	const c = t.containerId ? document.getElementById(t.containerId) : document.body;
	if (!c) throw new Error(`Container with id "${t.containerId}" not found`);
	const m = c.querySelector('.ubits-data-table'),
		u = c.querySelector('.ubits-data-table__scrollable-container');
	if (u) {
		const se = u.querySelector('.ubits-data-table');
		if (se) {
			const te = se;
			if (te._dataTableInstance)
				try {
					const de = te._dataTableInstance;
					de && typeof de.destroy == 'function' && de.destroy();
				} catch (de) {
					console.warn('Error destroying previous table instance:', de);
				}
		}
		u.remove();
	} else if (m) {
		const X = m;
		if (X._dataTableInstance)
			try {
				const se = X._dataTableInstance;
				se && typeof se.destroy == 'function' && se.destroy();
			} catch (se) {
				console.warn('Error destroying previous table instance:', se);
			}
		m.remove();
	}
	const b = t.lazyLoad !== !1 && !t.showPagination ? t.lazyLoadItemsPerBatch || 10 : void 0,
		l = {
			...t,
			__lazyLoadCurrentItems: b,
		},
		s = Ue(l),
		d = document.createElement('div');
	d.innerHTML = s.trim();
	const o = d.firstElementChild;
	if (!o) throw new Error('Failed to create data table 3 element');
	c.appendChild(o);
	const r = (X) => {
		const se = /* @__PURE__ */ new Set(),
			te = [];
		for (const de of X)
			se.has(de.id)
				? console.log(
						'🔍 [CREATE DATA TABLE] ⚠️ COLUMNA DUPLICADA ELIMINADA al inicializar:',
						de.id,
						de.title,
					)
				: (se.add(de.id), te.push({ ...de }));
		return (
			te.length !== X.length &&
				console.log(
					'🔍 [CREATE DATA TABLE] Columnas duplicadas eliminadas:',
					X.length,
					'->',
					te.length,
				),
			te
		);
	};
	let e = {
			...t,
			columns: r(t.columns),
		},
		f = e.columns.filter((X) => X.visible !== !1).map((X) => X.id),
		L = e.rows.map((X) => X.id),
		y = null,
		i = null,
		T = null,
		w = null,
		$ = '',
		z = !1,
		M = null,
		S = {},
		G = null;
	const W = (X, se, te) => {
			if (!se || se.trim() === '') return X;
			const de = se.toLowerCase().trim(),
				Le = te.filter((Ee) => Ee.visible !== !1);
			return X.filter((Ee) =>
				Le.some((Se) => {
					const fe = Ee.data[Se.id];
					return fe == null ? !1 : String(fe).toLowerCase().includes(de);
				}),
			);
		},
		ne = (X, se, te) => {
			const de = Object.entries(se).filter(([Le, Ee]) => Ee && Ee.trim() !== '');
			return de.length === 0
				? X
				: X.filter((Le) =>
						de.every(([Ee, Se]) => {
							const fe = te.find((Ce) => Ce.id === Ee);
							if (!fe) {
								const Ce = e.header?.filterButton?.filters?.find((C) => C.id === Ee);
								if (!Ce) return !0;
								const ke = Ce.columnId,
									Be = Le.data[ke];
								if (Be == null) return !1;
								const _e = String(Be).toLowerCase().trim(),
									N = Se.toLowerCase().trim();
								switch (Ce.type) {
									case 'text':
										return _e.includes(N);
									case 'select':
										return _e === N;
									case 'number':
										return _e === N || parseFloat(_e) === parseFloat(N);
									case 'date':
										return _e.includes(N);
									default:
										return _e.includes(N);
								}
							}
							const ye = Le.data[fe.id];
							if (ye == null) return !1;
							const ve = String(ye).toLowerCase().trim(),
								we = Se.toLowerCase().trim();
							switch (fe.type || 'text') {
								case 'estado':
									return ve === we;
								case 'fecha':
									return ve.includes(we);
								case 'progreso':
									const Ce = parseFloat(ve),
										ke = parseFloat(we);
									return !isNaN(Ce) && !isNaN(ke) && Ce === ke;
								case 'nombre':
								case 'nombre-avatar':
								case 'nombre-avatar-texto':
								case 'correo':
								case 'area':
								case 'lider':
								case 'pais':
								case 'ciudad':
								default:
									return ve.includes(we);
							}
						}),
					);
		},
		ae = e.showPagination ? !1 : e.lazyLoad !== !1,
		Q = e.lazyLoadItemsPerBatch || 10;
	let J = Q,
		q = null;
	const pe = () => {
			if (q) {
				const te = o.querySelector('.ubits-data-table__scrollable-container');
				te && te.removeEventListener('scroll', q),
					window.removeEventListener('scroll', q, !0),
					(q = null);
			}
			const X = o.querySelector('.ubits-data-table__scrollable-container'),
				se = () => {
					const te = e.rows.length;
					if (J >= te) return;
					let de, Le, Ee;
					if (X) (de = X.scrollTop), (Le = X.scrollHeight), (Ee = X.clientHeight);
					else {
						(de = window.scrollY || document.documentElement.scrollTop),
							(Le = document.documentElement.scrollHeight),
							(Ee = window.innerHeight);
						const ye = o.getBoundingClientRect().bottom + de;
						if (de + Ee >= ye - 200) {
							const we = Math.min(J + Q, te);
							we > J &&
								((J = we),
								console.log('📦 [LAZY LOAD] Cargando más items:', J, 'de', te),
								e.onLazyLoad && e.onLazyLoad(J, te),
								Y(!0));
						}
						return;
					}
					if ((de + Ee) / Le >= 0.8) {
						const fe = Math.min(J + Q, te);
						fe > J &&
							((J = fe),
							console.log('📦 [LAZY LOAD] Cargando más items:', J, 'de', te),
							e.onLazyLoad && e.onLazyLoad(J, te),
							Y(!0));
					}
				};
			X
				? ((q = se),
					X.addEventListener('scroll', q, { passive: !0 }),
					console.log('✅ [LAZY LOAD] Listener agregado al contenedor scrollable'))
				: (console.warn(
						'⚠️ [LAZY LOAD] No se encontró contenedor scrollable, esperando renderizado...',
					),
					setTimeout(() => {
						const te = o.querySelector('.ubits-data-table__scrollable-container');
						te
							? ((q = se),
								te.addEventListener('scroll', q, { passive: !0 }),
								console.log('✅ [LAZY LOAD] Contenedor scrollable encontrado después de esperar'))
							: console.error(
									'❌ [LAZY LOAD] No se pudo encontrar contenedor scrollable. El lazy load requiere scroll vertical activo.',
								);
					}, 100));
		},
		be = () => {
			o.querySelectorAll('wa-icon').forEach((se) => {
				const te = se.nextElementSibling;
				te &&
					te.tagName === 'I' &&
					(customElements.get('wa-icon')
						? ((se.style.display = 'inline-block'),
							(se.style.width = '12px'),
							(se.style.height = '12px'),
							(se.style.opacity = '1'),
							(te.style.display = 'none'))
						: ((se.style.display = 'none'),
							(te.style.display = 'inline-block'),
							(te.style.fontSize = '12px'),
							(te.style.width = '12px'),
							(te.style.height = '12px')));
			});
		},
		Y = (X = !1) => {
			const se = `render-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
				de = (
					new Error().stack?.split(`
`) || []
				)
					.slice(1, 5)
					.join(`
`);
			console.log(`🔄 [RENDER] ========== INICIO RENDER [${se}] ==========`),
				console.log('🔄 [RENDER] Stack trace:', de),
				console.log('🔄 [RENDER] preserveScroll:', X);
			const Le = de.includes('SELECT ALL') || de.includes('selectAll'),
				Ee = de.includes('CHECKBOX') || de.includes('checkbox'),
				Se = de.includes('HTMLInputElement') && Ee;
			(Le || Se) &&
				console.warn(
					'🔄 [RENDER] ⚠️ RENDER LLAMADO DESDE SELECT ALL O CHECKBOX HANDLER - Esto puede causar el salto!',
					{
						isFromSelectAll: Le,
						isFromCheckbox: Ee,
						isFromSelectAllHandler: Se,
						callerInfo: de
							.split(`
`)
							.slice(0, 3),
					},
				);
			let fe = 0,
				ye = 0,
				ve = 0,
				we = X;
			const Ne = o.querySelector('.ubits-data-table__scrollable-container');
			if (Ne) {
				(fe = Ne.scrollTop), (ye = Ne.scrollHeight), (ve = Ne.clientHeight);
				const B = ye > ve;
				B &&
					!X &&
					((we = !0),
					console.log(
						`🔄 [RENDER] 📍 Contenido con scroll detectado (scrollHeight: ${ye}px > clientHeight: ${ve}px), preservando automáticamente para evitar salto`,
					)),
					fe > 0 &&
						!X &&
						!we &&
						((we = !0),
						console.log(
							`🔄 [RENDER] 📍 Scroll activo detectado (${fe}px), preservando automáticamente para evitar salto`,
						)),
					console.log('🔄 [RENDER] 📍 Scroll guardado:', {
						scrollTop: fe,
						scrollHeight: ye,
						clientHeight: ve,
						maxScroll: ye - ve,
						scrollPercentage: ye > ve ? (fe / (ye - ve)) * 100 : 0,
						shouldPreserve: we,
						hasScrollableContent: B,
					});
			} else
				console.log(
					'🔄 [RENDER] ⚠️ No se encontró scrollableContainer, no se puede preservar scroll',
				);
			let Ce = e.rows;
			Object.keys(S).length > 0 && (Ce = ne(Ce, S, e.columns)), $ && (Ce = W(Ce, $, e.columns));
			const ke = {
				...e,
				rows: Ce,
				columns: e.columns.map((B) => {
					const A = { ...B };
					return B.pinned !== void 0 && (A.pinned = B.pinned), A;
				}),
				sortColumnId: T,
				sortDirection: w,
				// Pasar el estado de lazy load
				__lazyLoadCurrentItems: J,
				// Actualizar displayedItems en el header solo si no está explícitamente definido
				// Si ya está definido (por ejemplo, desde el input), mantener ese valor
				header: e.header
					? {
							...e.header,
							// Solo actualizar displayedItems si no está definido explícitamente o si hay búsqueda/filtros activos
							displayedItems:
								e.header.displayedItems !== void 0 && !$ && Object.keys(S).length === 0
									? e.header.displayedItems
									: Ce.length,
							// Pasar el estado activo del SearchButton y el término de búsqueda a través de las opciones
							__isSearchActive: z,
							__searchTerm: $,
						}
					: void 0,
			};
			console.log('🔍 [RENDER] Eliminando columnas duplicadas antes de renderizar...'),
				console.log('🔍 [RENDER] Columnas ANTES de eliminar duplicados:', ke.columns.length),
				console.log(
					'🔍 [RENDER] IDs de columnas:',
					ke.columns.map((B) => B.id),
				);
			const Be = /* @__PURE__ */ new Set(),
				_e = ke.columns.filter((B) =>
					Be.has(B.id)
						? (console.log('🔍 [RENDER] ⚠️ COLUMNA DUPLICADA ELIMINADA:', B.id, B.title), !1)
						: (Be.add(B.id), !0),
				);
			console.log('🔍 [RENDER] Columnas DESPUÉS de eliminar duplicados:', _e.length),
				console.log('🔍 [RENDER] IDs únicos:', Array.from(Be)),
				(ke.columns = _e),
				console.log('🔍 [DATA TABLE] Renderizando:', {
					displayedItems: ke.header?.displayedItems,
					totalItems: ke.header?.totalItems,
					filteredRows: Ce.length,
					hasSearch: !!$,
					hasFilters: Object.keys(S).length > 0,
					uniqueColumnsCount: _e.length,
				});
			const N = Ue(ke, f, L, S);
			console.log('🔄 [RENDER] HTML generado, longitud:', N.length),
				console.log('🔄 [RENDER] Reemplazando innerHTML del elemento (esto causa el brinco)...'),
				console.log('🔄 [RENDER] 📍 Estado ANTES de innerHTML:', {
					scrollTop: fe,
					scrollHeight: ye,
					clientHeight: ve,
					shouldPreserve: we,
				});
			const C = performance.now();
			o.innerHTML = N.trim();
			const h = performance.now();
			if (
				(console.log(`🔄 [RENDER] innerHTML reemplazado en ${(h - C).toFixed(2)}ms`),
				console.log('🔄 [RENDER] 📍 innerHTML reemplazado, ahora restaurando scroll...'),
				e.header?.searchButton && e.header?.showSearchButton !== !1)
			) {
				const B = o.querySelector('.ubits-data-table__header-search-button');
				if (B) {
					if (M)
						try {
							M.destroy();
						} catch {}
					if (!e.header?.searchButton)
						console.warn(
							'🔍 [DATA TABLE] searchButton no está definido, saltando creación del componente',
						);
					else {
						const A = document.createElement('div');
						(A.style.display = 'none'),
							document.body.appendChild(A),
							(A.id = 'temp-search-button-container-' + Date.now()),
							(M = ht({
								containerId: A.id,
								active: z,
								size: 'sm',
								state: z ? 'active' : 'default',
								disabled: e.header.searchButton.disabled || !1,
								placeholder: e.header.searchButton.placeholder || 'Buscar...',
								value: $,
								width: 248,
								className: 'ubits-data-table__header-search-button',
								onChange: (K) => {
									const _ = K.target.value;
									if (
										(($ = _),
										e.header.searchButton.onChange && e.header.searchButton.onChange(_),
										Y(),
										e.header.searchButton.onSearch)
									) {
										const D = W(e.rows, _, e.columns);
										console.log(
											'🔍 [SEARCH] onSearch callback ejecutado desde SearchButton onChange:',
											{
												searchTerm: _,
												filteredRowsCount: D.length,
												componentId: e.containerId,
											},
										),
											e.header.searchButton.onSearch(_, D);
									}
								},
								onClick: (K) => {
									K.stopPropagation(),
										K.preventDefault(),
										(z = !0),
										e.header.searchButton.onClick && e.header.searchButton.onClick(K),
										Y(),
										setTimeout(() => {
											const _ = M?.element.querySelector('.ubits-search-button__input');
											_ && _.focus();
										}, 150);
								},
								onBlur: (K) => {
									const _ = K.target;
									setTimeout(() => {
										if (!_.value.trim() && document.activeElement !== _) {
											const D = M?.element.querySelector('.ubits-search-button__clear');
											document.activeElement !== D && ((z = !1), Y());
										}
									}, 200);
								},
							}));
						const R = M.element;
						B.parentNode?.replaceChild(R, B),
							z &&
								R.style.width &&
								(console.log('🔍 [DATA TABLE] Removiendo width inline:', R.style.width),
								(R.style.width = '')),
							document.body.removeChild(A);
					}
					setTimeout(() => {
						const A = o.querySelector(
								'.ubits-data-table__header-search-button.ubits-search-button--active',
							),
							R = A?.previousElementSibling;
						if (A && R) {
							const K = A.getBoundingClientRect(),
								_ = R.getBoundingClientRect(),
								D = window.getComputedStyle(A),
								j = A.querySelector('.ubits-search-button__input-wrapper'),
								I = j ? window.getComputedStyle(j) : null,
								O = {
									actualGap: K.left - _.right,
									expectedGap: 8,
									difference: K.left - _.right - 8,
									searchButton: {
										left: K.left,
										width: K.width,
										right: K.right,
										marginLeft: D.marginLeft,
										marginRight: D.marginRight,
										inlineWidth: A.style.width || 'none',
										computedWidth: D.width,
									},
									prevButton: {
										right: _.right,
										width: _.width,
									},
									inputWrapper: {
										width: I?.width || 'N/A',
										computedWidth: I?.width || 'N/A',
									},
								};
							if (
								(console.log('🔍 [DATA TABLE] Posicionamiento del SearchButton activo:', O),
								Math.abs(O.actualGap - 8) > 1)
							) {
								const U = K.width,
									F = O.actualGap,
									ee = 8,
									re = -(U - 32 - ee);
								console.log('🔍 [DATA TABLE] Cálculo de margin-left:', {
									buttonWidth: 32,
									inputWidth: U,
									currentGap: F,
									desiredGap: ee,
									neededMarginLeft: re,
									currentMarginLeft: D.marginLeft,
								});
							}
						}
					}, 100),
						console.log('🔍 [DATA TABLE] SearchButton componente completo integrado');
				}
			}
			console.log('🔄 [RENDER] Llamando attachEventListeners()...'),
				ge(),
				console.log('🔄 [RENDER] attachEventListeners() completado'),
				be(),
				console.log(`🔄 [RENDER] ========== FIN RENDER [${se}] ==========`),
				e.showPagination &&
					setTimeout(() => {
						k();
					}, 100),
				ae && !e.showPagination && pe();
			const x = we || (ye > 0 && ve > 0 && ye > ve);
			x
				? (console.log('🔄 [RENDER] 📍 Restaurando scroll después del render...'),
					requestAnimationFrame(() => {
						const B = o.querySelector('.ubits-data-table__scrollable-container');
						if (B) {
							const A = B.scrollHeight,
								R = B.clientHeight,
								K = A - R,
								_ = ye - ve,
								D = _ > 0 ? fe / _ : 0;
							if (
								(console.log('🔄 [RENDER] 📍 Cálculo de restauración de scroll:', {
									old: {
										scrollTop: fe,
										scrollHeight: ye,
										clientHeight: ve,
										maxScroll: _,
									},
									new: {
										scrollHeight: A,
										clientHeight: R,
										maxScroll: K,
									},
									scrollPercentage: (D * 100).toFixed(2) + '%',
									newScrollTop: K > 0 ? D * K : 0,
								}),
								K > 0)
							) {
								const j = D * K;
								(B.scrollTop = j),
									console.log('🔄 [RENDER] 📍 Scroll restaurado:', {
										anterior: fe,
										nuevo: j,
										diferencia: Math.abs(j - fe),
										restauradoCorrectamente: Math.abs(j - fe) < 10,
										// Tolerancia de 10px
									});
							} else
								console.log(
									'🔄 [RENDER] ⚠️ No hay scroll disponible (maxScroll <= 0), no se puede restaurar',
								);
						} else
							console.log(
								'🔄 [RENDER] ⚠️ No se encontró scrollableContainer después del render, no se puede restaurar scroll',
							);
					}))
				: console.log('🔄 [RENDER] 📍 No se restaura scroll:', {
						shouldPreserve: we,
						savedScrollHeight: ye,
						savedClientHeight: ve,
						tieneScroll: ye > ve,
						shouldRestore: x,
					}),
				console.log('🎨 [HOVER DEBUG] ========== VERIFICANDO HOVER DE FILAS ==========');
			const v = o.querySelectorAll('.ubits-data-table__row');
			console.log('🎨 [HOVER DEBUG] Filas encontradas:', v.length);
			const g = o.querySelector('.ubits-data-table__table'),
				n = o.querySelector('.ubits-data-table__tbody'),
				a = o.querySelector('.ubits-data-table__scrollable-container'),
				p = o.querySelector('.ubits-data-table');
			if (
				(console.log('📏 [HEIGHT DEBUG] ========== VERIFICANDO ALTURAS =========='),
				g &&
					console.log(
						'📏 [HEIGHT DEBUG] table.scrollHeight:',
						g.scrollHeight,
						'table.clientHeight:',
						g.clientHeight,
						'table.offsetHeight:',
						g.offsetHeight,
					),
				n &&
					console.log(
						'📏 [HEIGHT DEBUG] tbody.scrollHeight:',
						n.scrollHeight,
						'tbody.clientHeight:',
						n.clientHeight,
						'tbody.offsetHeight:',
						n.offsetHeight,
					),
				a &&
					(console.log(
						'📏 [HEIGHT DEBUG] scrollableContainer.scrollHeight:',
						a.scrollHeight,
						'scrollableContainer.clientHeight:',
						a.clientHeight,
						'scrollableContainer.offsetHeight:',
						a.offsetHeight,
					),
					console.log(
						'📏 [HEIGHT DEBUG] scrollableContainer max-height:',
						window.getComputedStyle(a).maxHeight,
					)),
				p &&
					(console.log(
						'📏 [HEIGHT DEBUG] dataTableContainer.scrollHeight:',
						p.scrollHeight,
						'dataTableContainer.clientHeight:',
						p.clientHeight,
						'dataTableContainer.offsetHeight:',
						p.offsetHeight,
					),
					console.log(
						'📏 [HEIGHT DEBUG] dataTableContainer max-height:',
						window.getComputedStyle(p).maxHeight,
					)),
				v.length > 0)
			) {
				const B = v[0],
					A = v[1],
					R = v[v.length - 1];
				console.log('📏 [HEIGHT DEBUG] ========== COMPARACIÓN DE FILAS ==========');
				const K = B.getBoundingClientRect(),
					_ = A ? A.getBoundingClientRect() : null;
				R.getBoundingClientRect();
				const D = window.innerHeight;
				console.log('📏 [HEIGHT DEBUG] Primera fila (funciona):'),
					console.log('  - offsetTop:', B.offsetTop),
					console.log('  - offsetHeight:', B.offsetHeight),
					console.log('  - getBoundingClientRect:', {
						top: K.top,
						bottom: K.bottom,
						left: K.left,
						right: K.right,
						width: K.width,
						height: K.height,
						visibleInViewport: K.top >= 0 && K.bottom <= D,
					}),
					A &&
						_ &&
						(console.log('📏 [HEIGHT DEBUG] Segunda fila (no funciona):'),
						console.log('  - offsetTop:', A.offsetTop),
						console.log('  - offsetHeight:', A.offsetHeight),
						console.log('  - getBoundingClientRect:', {
							top: _.top,
							bottom: _.bottom,
							left: _.left,
							right: _.right,
							width: _.width,
							height: _.height,
							visibleInViewport: _.top >= 0 && _.bottom <= D,
							belowViewport: _.top > D,
							aboveViewport: _.bottom < 0,
						}),
						console.log('  - viewportHeight:', D),
						console.log('  - Diferencia con primera fila (offsetTop):', A.offsetTop - B.offsetTop),
						console.log(
							'  - Diferencia con primera fila (getBoundingClientRect.top):',
							_.top - K.top,
						)),
					console.log('📏 [HEIGHT DEBUG] Última fila:'),
					console.log('  - offsetTop:', R.offsetTop),
					console.log('  - offsetHeight:', R.offsetHeight),
					console.log('  - getBoundingClientRect:', R.getBoundingClientRect()),
					console.log(
						'📏 [HEIGHT DEBUG] Altura total estimada (última fila offsetTop + offsetHeight):',
						R.offsetTop + R.offsetHeight,
					),
					console.log('📏 [HEIGHT DEBUG] ========== FIN COMPARACIÓN ==========');
			}
			if (
				(console.log('📏 [HEIGHT DEBUG] ========== FIN ALTURAS =========='),
				v.forEach((B, A) => {
					if (A === 0) {
						const R = B.querySelectorAll('td');
						console.log('🎨 [HOVER DEBUG] Celdas en la primera fila:', R.length),
							R.forEach((K, _) => {
								const D = K,
									j = Array.from(D.classList),
									I = window.getComputedStyle(D).backgroundColor;
								console.log(`🎨 [HOVER DEBUG] Celda ${_}:`, {
									classes: j,
									computedBackground: I,
									hasDragHandle: j.includes('ubits-data-table__cell--drag-handle'),
									hasExpand: j.includes('ubits-data-table__cell--expand'),
									hasCheckbox: j.includes('ubits-data-table__cell--checkbox'),
									hasControlsColumn: j.includes('ubits-data-table__controls-column'),
									hasCell: j.includes('ubits-data-table__cell'),
								});
							});
					}
				}),
				v.length > 0)
			) {
				const B = v[0];
				B.addEventListener('mouseenter', () => {
					console.log('🎨 [HOVER DEBUG] ========== HOVER ENTRÓ EN FILA =========='),
						B.querySelectorAll('td').forEach((R, K) => {
							const _ = R,
								D = Array.from(_.classList),
								j = window.getComputedStyle(_).backgroundColor;
							console.log(`🎨 [HOVER DEBUG] Celda ${K} en hover:`, {
								classes: D,
								computedBackground: j,
								hasDragHandle: D.includes('ubits-data-table__cell--drag-handle'),
								hasExpand: D.includes('ubits-data-table__cell--expand'),
							});
						});
				}),
					B.addEventListener('mouseleave', () => {
						console.log('🎨 [HOVER DEBUG] ========== HOVER SALIÓ DE FILA ==========');
					});
			}
			o.querySelectorAll('input[data-column-checkbox-header]').forEach((B) => {
				const A = B,
					R = A.getAttribute('data-column-checkbox-header');
				if (R) {
					const K = e.rows.length > 0 && e.rows.every((j) => j.data[R] === !0),
						_ = e.rows.some((j) => j.data[R] === !0),
						D = _ && !K;
					(A.indeterminate = D),
						console.log(
							'📋 [INDETERMINATE] Header checkbox',
							R,
							'- indeterminate:',
							D,
							'(allChecked:',
							K,
							'someChecked:',
							_,
							')',
						);
				}
			});
			const k = () => {
				try {
					console.log('📄 [SPACING] ========== VERIFICANDO ESPACIADO DEL PAGINADOR ==========');
					const B =
						o.closest('.ubits-data-table__container') ||
						o.querySelector('.ubits-data-table__container');
					if ((console.log('📄 [SPACING] Container encontrado:', !!B), B)) {
						const A = window.getComputedStyle(B);
						console.log('📄 [SPACING] Container estilos:'),
							console.log('  - display:', A.display),
							console.log('  - flexDirection:', A.flexDirection),
							console.log('  - gap:', A.gap);
						const R =
							B.querySelector('.ubits-data-table__scrollable-container') ||
							B.querySelector('.ubits-data-table');
						console.log('📄 [SPACING] Table container encontrado:', !!R);
						const _ = (R?.querySelector('.ubits-data-table__table') || R)?.querySelector(
							'.ubits-data-table__row:last-child',
						);
						if ((console.log('📄 [SPACING] Última fila encontrada:', !!_), R)) {
							const j = window.getComputedStyle(R);
							if (
								(console.log('📄 [SPACING] Table container estilos:'),
								console.log('  - marginBottom:', j.marginBottom),
								console.log('  - paddingBottom:', j.paddingBottom),
								console.log('  - borderBottom:', j.borderBottom),
								_)
							) {
								const I = _.getBoundingClientRect();
								console.log('📄 [SPACING] Última fila posición:'),
									console.log('  - bottom:', I.bottom);
							}
						}
						const D = B.querySelector('.ubits-data-table__pagination-wrapper');
						if ((console.log('📄 [SPACING] Pagination wrapper encontrado:', !!D), D)) {
							const j = window.getComputedStyle(D);
							console.log('📄 [SPACING] Pagination wrapper estilos:'),
								console.log('  - marginTop:', j.marginTop),
								console.log('  - marginBottom:', j.marginBottom),
								console.log('  - paddingTop:', j.paddingTop),
								console.log('  - paddingBottom:', j.paddingBottom),
								console.log('  - borderTop:', j.borderTop);
							const I = D.getBoundingClientRect();
							if (
								(console.log('📄 [SPACING] Pagination wrapper posición:'),
								console.log('  - top:', I.top),
								_)
							) {
								const O = _.getBoundingClientRect(),
									H = I.top - O.bottom;
								console.log('📄 [SPACING] DISTANCIA CALCULADA:'),
									console.log('  - Última fila bottom:', O.bottom),
									console.log('  - Paginador top:', I.top),
									console.log('  - DISTANCIA:', H, 'px'),
									console.log('  - Esperado: 16px');
							} else
								console.log(
									'📄 [SPACING] ⚠️ No se pudo calcular distancia: última fila no encontrada',
								);
						} else console.log('📄 [SPACING] ⚠️ Pagination wrapper NO encontrado');
					} else console.log('📄 [SPACING] ⚠️ Container NO encontrado');
					console.log('📄 [SPACING] ========== FIN VERIFICACIÓN ==========');
				} catch (B) {
					console.error('📄 [SPACING] ❌ Error verificando espaciado:', B);
				}
			};
		},
		ge = () => {
			console.log('📎 [ATTACH] ========== INICIO attachEventListeners =========='),
				typeof window < 'u' && window.location && window.location.href.includes('storybook');
			try {
				e.columnReorderable &&
					(o.hasAttribute('data-column-drag-listener') ||
						(o.setAttribute('data-column-drag-listener', 'true'),
						o.addEventListener(
							'dragstart',
							(N) => {
								const h = N.target.closest('.ubits-data-table__column-drag-handle');
								if (h && ((y = h.getAttribute('data-column-id')), y)) {
									(N.dataTransfer.effectAllowed = 'move'), N.dataTransfer.setData('text/plain', y);
									const x = h.closest('.ubits-data-table__column-header');
									x && x.classList.add('ubits-data-table__column-header--dragging');
								}
							},
							!0,
						),
						o.addEventListener(
							'dragend',
							(N) => {
								const h = N.target.closest('.ubits-data-table__column-drag-handle');
								if (h) {
									const x = h.closest('.ubits-data-table__column-header');
									x && x.classList.remove('ubits-data-table__column-header--dragging');
								}
								y = null;
							},
							!0,
						),
						o.addEventListener(
							'dragover',
							(N) => {
								const h = N.target.closest('.ubits-data-table__column-header');
								if (h && y) {
									const x = h.getAttribute('data-column-id');
									if (x && x !== y) {
										const v = x === 'checkbox' || x.startsWith('checkbox-'),
											g = y === 'checkbox' || y.startsWith('checkbox-');
										if (v) return;
										if (!g) {
											const n = f.findIndex((a) => a === 'checkbox' || a.startsWith('checkbox-'));
											if (n !== -1 && f.indexOf(x) < n) return;
										}
										N.preventDefault(),
											(N.dataTransfer.dropEffect = 'move'),
											h.classList.add('ubits-data-table__column-header--drag-over');
									}
								}
							},
							!0,
						),
						o.addEventListener(
							'dragleave',
							(N) => {
								const h = N.target.closest('.ubits-data-table__column-header');
								h && h.classList.remove('ubits-data-table__column-header--drag-over');
							},
							!0,
						),
						o.addEventListener(
							'drop',
							(N) => {
								const h = N.target.closest('.ubits-data-table__column-header');
								if (h) {
									N.preventDefault(),
										h.classList.remove('ubits-data-table__column-header--drag-over');
									const x = h.getAttribute('data-column-id');
									if (!x || !y) return;
									const v = y === 'checkbox' || y.startsWith('checkbox-'),
										g = x === 'checkbox' || x.startsWith('checkbox-');
									if (v || g) return;
									if (y !== x) {
										const n = f.indexOf(y),
											a = f.indexOf(x),
											p = f.findIndex((E) => E === 'checkbox' || E.startsWith('checkbox-'));
										if (p === -1) {
											n !== -1 &&
												a !== -1 &&
												(f.splice(n, 1),
												f.splice(a, 0, y),
												e.onColumnReorder && e.onColumnReorder([...f]),
												Y());
											return;
										}
										if (a < p || (n > p && a < p)) return;
										if (n !== -1 && a !== -1) {
											const E = [...f];
											E.splice(n, 1), E.splice(a, 0, y);
											const k = E.findIndex((B) => B === 'checkbox' || B.startsWith('checkbox-'));
											if (k !== -1 && k < p) return;
											(f = E), e.onColumnReorder && e.onColumnReorder([...f]), Y();
										}
									}
								}
							},
							!0,
						))),
					e.rowReorderable &&
						(o.hasAttribute('data-row-drag-listener') ||
							(o.setAttribute('data-row-drag-listener', 'true'),
							o.addEventListener(
								'dragstart',
								(N) => {
									const h = N.target.closest('.ubits-data-table__row-drag-handle');
									if (!h) return;
									const x = h.getAttribute('data-row-id');
									if (x) {
										const v = isNaN(Number(x)) ? x : Number(x);
										(i = v),
											(N.dataTransfer.effectAllowed = 'move'),
											N.dataTransfer.setData('text/plain', String(v));
										const g = h.closest('.ubits-data-table__row');
										g && g.classList.add('ubits-data-table__row--dragging');
									}
								},
								!0,
							),
							o.addEventListener(
								'dragend',
								(N) => {
									const h = N.target.closest('.ubits-data-table__row-drag-handle');
									if (h) {
										const x = h.closest('.ubits-data-table__row');
										x && x.classList.remove('ubits-data-table__row--dragging');
									}
									i = null;
								},
								!0,
							),
							o.addEventListener(
								'dragover',
								(N) => {
									const h = N.target.closest('.ubits-data-table__row');
									if (h && i !== null) {
										const x = h.getAttribute('data-row-id');
										x &&
											(isNaN(Number(x)) ? x : Number(x)) !== i &&
											(N.preventDefault(),
											(N.dataTransfer.dropEffect = 'move'),
											h.classList.add('ubits-data-table__row--drag-over'));
									}
								},
								!0,
							),
							o.addEventListener(
								'dragleave',
								(N) => {
									const h = N.target.closest('.ubits-data-table__row');
									h && h.classList.remove('ubits-data-table__row--drag-over');
								},
								!0,
							),
							o.addEventListener(
								'drop',
								(N) => {
									const h = N.target.closest('.ubits-data-table__row');
									if (h) {
										N.preventDefault(), h.classList.remove('ubits-data-table__row--drag-over');
										const x = h.getAttribute('data-row-id');
										if (!x || !i) return;
										const v = isNaN(Number(x)) ? x : Number(x),
											g = N.dataTransfer.getData('text/plain');
										if (g && String(v) !== g) {
											const n = isNaN(Number(g)) ? g : Number(g),
												a = L.indexOf(n),
												p = L.indexOf(v);
											a !== -1 &&
												p !== -1 &&
												(L.splice(a, 1),
												L.splice(p, 0, n),
												e.onRowReorder && e.onRowReorder([...L]),
												Y());
										}
									}
								},
								!0,
							)));
				let X = !1;
				const se = o.querySelectorAll('input[data-column-checkbox-header]');
				console.log(`☑️ [SELECT ALL] Header checkboxes encontrados: ${se.length}`),
					se.forEach((N, C) => {
						const h = N,
							x = h.getAttribute('data-column-checkbox-header');
						console.log(`☑️ [SELECT ALL] Configurando header checkbox ${C}: columnId=${x}`);
						const v = h.cloneNode(!0);
						(v.checked = h.checked),
							x && v.setAttribute('data-column-checkbox-header', x),
							Array.from(h.attributes).forEach((a) => {
								(a.name !== 'data-column-checkbox-header' || !v.hasAttribute(a.name)) &&
									v.setAttribute(a.name, a.value);
							}),
							h.parentNode?.replaceChild(v, h),
							console.log('☑️ [SELECT ALL] Checkbox clonado y reemplazado:', {
								columnId: x,
								hasHeaderAttr: v.hasAttribute('data-column-checkbox-header'),
								checked: v.checked,
								allAttributes: Array.from(v.attributes).map((a) => `${a.name}="${a.value}"`),
							}),
							console.log(`☑️ [SELECT ALL] Listener adjuntado al header checkbox ${C}`, {
								columnId: x,
								checkbox: v,
								hasHeaderAttr: v.hasAttribute('data-column-checkbox-header'),
								hasColumnId: v.hasAttribute('data-column-id'),
								hasRowId: v.hasAttribute('data-row-id'),
								allAttributes: Array.from(v.attributes).map((a) => `${a.name}="${a.value}"`),
							}),
							console.log(`☑️ [SELECT ALL] 🔧 Agregando listener con capture:true al checkbox ${C}`),
							console.log('☑️ [SELECT ALL] 🔍 Estado del checkbox ANTES de agregar listener:', {
								element: v,
								isConnected: v.isConnected,
								hasHeaderAttr: v.hasAttribute('data-column-checkbox-header'),
								checked: v.checked,
								parentElement: v.parentElement?.tagName,
								allAttrs: Array.from(v.attributes).map((a) => `${a.name}="${a.value}"`),
							});
						const g = (a) => {
							console.log('☑️ [SELECT ALL] ========== SELECT ALL CAMBIÓ =========='),
								console.log(`☑️ [SELECT ALL] 🎯 HANDLER EJECUTÁNDOSE - timestamp: ${Date.now()}`),
								console.log('☑️ [SELECT ALL] 🔍 EVENTO RECIBIDO:', {
									eventPhase: a.eventPhase,
									bubbles: a.bubbles,
									cancelable: a.cancelable,
									defaultPrevented: a.defaultPrevented,
									isTrusted: a.isTrusted,
									timeStamp: a.timeStamp,
									target: a.target,
									currentTarget: a.currentTarget,
									targetType: a.target.tagName,
									targetId: a.target.id,
									targetClassName: a.target.className,
									targetHasHeaderAttr: a.target.hasAttribute('data-column-checkbox-header'),
									currentTargetHasHeaderAttr: a.currentTarget.hasAttribute(
										'data-column-checkbox-header',
									),
									targetAllAttrs: Array.from(a.target.attributes).map(
										(_) => `${_.name}="${_.value}"`,
									),
									currentTargetAllAttrs: Array.from(a.currentTarget.attributes).map(
										(_) => `${_.name}="${_.value}"`,
									),
								}),
								a.stopPropagation(),
								a.stopImmediatePropagation();
							const p = a.target;
							if (!p.hasAttribute('data-column-checkbox-header')) {
								console.log(
									'☑️ [SELECT ALL] ⚠️ El input NO tiene data-column-checkbox-header, ignorando...',
									{
										input: p,
										allAttributes: Array.from(p.attributes).map((_) => `${_.name}="${_.value}"`),
									},
								);
								return;
							}
							const E = p.getAttribute('data-column-checkbox-header'),
								k = p.checked;
							console.log(`☑️ [SELECT ALL] columnId: ${E}, checked: ${k}`, {
								input: p,
								hasHeaderAttr: p.hasAttribute('data-column-checkbox-header'),
								hasColumnId: p.hasAttribute('data-column-id'),
								hasRowId: p.hasAttribute('data-row-id'),
								allAttributes: Array.from(p.attributes).map((_) => `${_.name}="${_.value}"`),
								eventPhase: a.eventPhase,
								bubbles: a.bubbles,
								cancelable: a.cancelable,
								defaultPrevented: a.defaultPrevented,
							}),
								console.log(
									'☑️ [SELECT ALL] ✅ Propagación ya detenida (se detuvo al inicio del handler)',
								);
							const B = o.querySelector('.ubits-data-table__scrollable-container');
							let A = 0,
								R = 0,
								K = 0;
							if (
								(B
									? ((A = B.scrollTop),
										(R = B.scrollHeight),
										(K = B.clientHeight),
										console.log('☑️ [SELECT ALL] 📍 Scroll ANTES de actualizar checkboxes:', {
											scrollTop: A,
											scrollHeight: R,
											clientHeight: K,
											maxScroll: R - K,
										}))
									: console.log(
											'☑️ [SELECT ALL] ⚠️ No se encontró scrollableContainer antes de actualizar',
										),
								e.rows.forEach((_) => {
									_.data[E] = k;
								}),
								console.log(
									`☑️ [SELECT ALL] Estado de todas las filas actualizado (${e.rows.length} filas)`,
								),
								E === 'checkbox-2')
							) {
								const _ = o.querySelectorAll(`input[data-column-id="${E}"][data-row-id]`);
								console.log(`☑️ [SELECT ALL] Checkboxes visibles encontrados: ${_.length}`),
									(X = !0),
									console.log('☑️ [SELECT ALL] 🚩 Bandera isSelectAllInProgress activada'),
									_.forEach((V) => {
										const Z = V,
											P = Z.getAttribute('data-row-id');
										if (P) {
											const me = isNaN(Number(P)) ? P : Number(P),
												oe = e.rows.find((xe) => xe.id === me);
											oe && (oe.data[E] = k), (Z.checked = k);
											const ie = Z.closest('.ubits-checkbox');
											if (ie) {
												const xe = ie.querySelector('.ubits-checkbox__square');
												if (k) {
													if (
														(ie.classList.add('ubits-checkbox--checked'),
														ie.classList.remove('ubits-checkbox--indeterminate'),
														xe)
													) {
														const Te = xe.querySelector('.ubits-checkbox__indeterminate');
														Te && Te.remove();
														let he = xe.querySelector('.ubits-checkbox__checkmark');
														he ||
															((he = document.createElement('span')),
															(he.className = 'ubits-checkbox__checkmark'),
															xe.appendChild(he));
														const Re = he.style.transition;
														(he.style.transition = 'none'),
															he.style.setProperty('opacity', '1', 'important'),
															he.style.setProperty('transform', 'scale(1)', 'important'),
															he.style.setProperty('display', 'flex', 'important'),
															window.getComputedStyle(he).opacity,
															window.getComputedStyle(he).transform,
															window.getComputedStyle(he).display,
															he.offsetHeight,
															xe.offsetHeight,
															ie.offsetHeight,
															setTimeout(() => {
																he.style.transition = Re || '';
															}, 0);
													}
												} else if (
													(ie.classList.remove('ubits-checkbox--checked'),
													ie.classList.remove('ubits-checkbox--indeterminate'),
													xe)
												) {
													const Te = xe.querySelector('.ubits-checkbox__checkmark');
													Te && Te.remove();
													const he = xe.querySelector('.ubits-checkbox__indeterminate');
													he && he.remove();
												}
											}
										}
									});
								const D = e.rows.length > 0 && e.rows.every((V) => V.data[E] === !0),
									I = e.rows.some((V) => V.data[E] === !0) && !D,
									O = p;
								(O.checked = D), (O.indeterminate = I);
								const H = O.closest('.ubits-checkbox');
								if (H) {
									const V = H.querySelector('.ubits-checkbox__square');
									if (D) {
										if (
											(H.classList.add('ubits-checkbox--checked'),
											H.classList.remove('ubits-checkbox--indeterminate'),
											V)
										) {
											const Z = V.querySelector('.ubits-checkbox__indeterminate');
											Z && Z.remove(), H.classList.add('ubits-checkbox--checked'), H.offsetHeight;
											let P = V.querySelector('.ubits-checkbox__checkmark');
											P ||
												((P = document.createElement('span')),
												(P.className = 'ubits-checkbox__checkmark'),
												V.appendChild(P));
											const me = P.style.transition;
											(P.style.transition = 'none'),
												P.style.setProperty('opacity', '1', 'important'),
												P.style.setProperty('transform', 'scale(1)', 'important'),
												P.style.setProperty('display', 'flex', 'important'),
												window.getComputedStyle(P).opacity,
												window.getComputedStyle(P).transform,
												window.getComputedStyle(P).display,
												P.offsetHeight,
												V.offsetHeight,
												H.offsetHeight,
												setTimeout(() => {
													P.style.transition = me || '';
												}, 0);
										}
									} else if (I) {
										if (
											(H.classList.remove('ubits-checkbox--checked'),
											H.classList.add('ubits-checkbox--indeterminate'),
											V)
										) {
											const Z = V.querySelector('.ubits-checkbox__checkmark');
											Z && Z.remove();
											let P = V.querySelector('.ubits-checkbox__indeterminate');
											P ||
												((P = document.createElement('span')),
												(P.className = 'ubits-checkbox__indeterminate'),
												V.appendChild(P)),
												P.style.setProperty('opacity', '1', 'important'),
												P.style.setProperty('transform', 'scale(1)', 'important'),
												P.style.setProperty('display', 'flex', 'important');
										}
									} else if (
										(H.classList.remove('ubits-checkbox--checked'),
										H.classList.remove('ubits-checkbox--indeterminate'),
										V)
									) {
										const Z = V.querySelector('.ubits-checkbox__checkmark');
										Z && Z.remove();
										const P = V.querySelector('.ubits-checkbox__indeterminate');
										P && P.remove();
									}
									H.offsetHeight;
								}
								o.offsetHeight,
									console.log(
										`☑️ [SELECT ALL] ✅ Checkboxes visibles actualizados - allChecked: ${D}, indeterminate: ${I}`,
									),
									(X = !1),
									console.log('☑️ [SELECT ALL] 🚩 Bandera isSelectAllInProgress desactivada');
								const U = e;
								if (U.onSelectAll) {
									console.log('☑️ [SELECT ALL] 📞 Llamando onSelectAll callback...'),
										console.log(
											'☑️ [SELECT ALL] 📞 Stack trace antes de llamar callback:',
											new Error().stack
												?.split(`
`)
												.slice(1, 5)
												.join(`
`),
										);
									const V = o.querySelector('.ubits-data-table__scrollable-container'),
										Z = V?.scrollTop || 0,
										P = V?.scrollHeight || 0,
										me = V?.clientHeight || 0;
									console.log('☑️ [SELECT ALL] 📍 Scroll ANTES de onSelectAll callback:', {
										scrollTop: Z,
										scrollHeight: P,
										clientHeight: me,
										maxScroll: P - me,
									}),
										console.log('☑️ [SELECT ALL] 🔍 Verificando si hay renders pendientes...');
									try {
										U.onSelectAll(k),
											console.log('☑️ [SELECT ALL] ✅ onSelectAll callback completado sin errores');
									} catch (Ae) {
										console.error('☑️ [SELECT ALL] ❌ Error en onSelectAll callback:', Ae);
									}
									const oe = o.querySelector('.ubits-data-table__scrollable-container'),
										ie = oe?.scrollTop || 0,
										xe = oe?.scrollHeight || 0,
										Te = oe?.clientHeight || 0;
									console.log('☑️ [SELECT ALL] 📍 Scroll DESPUÉS de onSelectAll callback:', {
										scrollTop: ie,
										scrollHeight: xe,
										clientHeight: Te,
										maxScroll: xe - Te,
									});
									const he = Math.abs(ie - Z) > 1,
										Re = Math.abs(xe - P) > 1 || Math.abs(Te - me) > 1;
									he || Re
										? (console.warn(
												'☑️ [SELECT ALL] ⚠️ El callback onSelectAll parece haber causado cambios:',
												{
													scrollCambió: he,
													scrollAntes: Z,
													scrollDespues: ie,
													diferenciaScroll: ie - Z,
													dimensionesCambiaron: Re,
													scrollHeightAntes: P,
													scrollHeightDespues: xe,
													clientHeightAntes: me,
													clientHeightDespues: Te,
												},
											),
											he &&
												A > 0 &&
												oe &&
												(console.log(
													`☑️ [SELECT ALL] 🔧 Intentando restaurar scroll a posición original: ${A}px`,
												),
												(oe.scrollTop = A),
												setTimeout(() => {
													const Ae = oe.scrollTop;
													console.log('☑️ [SELECT ALL] 📍 Scroll después de restaurar:', {
														original: A,
														restaurado: Ae,
														diferencia: Math.abs(Ae - A),
														restauradoCorrectamente: Math.abs(Ae - A) < 5,
													});
												}, 50)))
										: console.log(
												'☑️ [SELECT ALL] ✅ El callback onSelectAll NO causó cambios visibles en el scroll',
											);
								}
								console.log('☑️ [SELECT ALL] ✅ Optimizado: NO se llama render() - sin brinco');
								const F = o.querySelector('.ubits-data-table__scrollable-container'),
									ee = F?.scrollTop || 0,
									re = F?.scrollHeight || 0,
									ce = F?.clientHeight || 0;
								console.log(
									'☑️ [SELECT ALL] 📍 Scroll FINAL después de todas las actualizaciones:',
									{
										scrollTop: ee,
										scrollHeight: re,
										clientHeight: ce,
										maxScroll: re - ce,
										comparaciónConInicial: {
											scrollTopInicial: A,
											scrollTopFinal: ee,
											diferencia: Math.abs(ee - A),
											seMantuvo: Math.abs(ee - A) < 5,
										},
									},
								);
							} else
								console.log('☑️ [SELECT ALL] ⚠️ Llamando render() - esto causará el brinco'), Y();
							console.log('☑️ [SELECT ALL] ========== FIN ==========');
						};
						v.addEventListener('change', g, { capture: !0 }),
							console.log(
								"☑️ [SELECT ALL] ✅ Listener 'change' agregado con capture:true - handler function:",
								g,
							);
						const n = (a) => {
							console.log(
								`☑️ [SELECT ALL] 🖱️ CLICK recibido en header checkbox ${C} - timestamp: ${Date.now()}`,
							);
							const p = a.target;
							console.log('☑️ [SELECT ALL] 🖱️ Click handler - checkbox estado:', {
								hasHeaderAttr: p.hasAttribute('data-column-checkbox-header'),
								checked: p.checked,
								allAttrs: Array.from(p.attributes).map((E) => `${E.name}="${E.value}"`),
							});
						};
						v.addEventListener('click', n, { capture: !0 }),
							console.log(
								"☑️ [SELECT ALL] ✅ Listener 'click' agregado con capture:true para debugging",
							),
							console.log('☑️ [SELECT ALL] 🔍 Estado del checkbox DESPUÉS de agregar listeners:', {
								element: v,
								isConnected: v.isConnected,
								hasHeaderAttr: v.hasAttribute('data-column-checkbox-header'),
								checked: v.checked,
								parentElement: v.parentElement?.tagName,
							});
					}),
					o
						.querySelectorAll('input[data-column-id]:not([data-column-checkbox-header])')
						.forEach((N) => {
							const C = N,
								h = C.getAttribute('data-row-id'),
								x = C.getAttribute('data-column-id'),
								v = C.cloneNode(!0);
							(v.checked = C.checked),
								C.parentNode?.replaceChild(v, C),
								console.log(
									`☑️ [CHECKBOX] 🔧 Agregando listener con capture:false al checkbox rowId=${h} columnId=${x}`,
								);
							const g = (n) => {
								const a = n.target;
								if (a.hasAttribute('data-column-checkbox-header')) {
									console.log(
										'☑️ [CHECKBOX] 🚫 BLOQUEADO: Este es un checkbox del header, NO debería ejecutarse este handler!',
										{
											hasHeaderAttr: a.hasAttribute('data-column-checkbox-header'),
											hasColumnId: a.hasAttribute('data-column-id'),
											hasRowId: a.hasAttribute('data-row-id'),
											allAttributes: Array.from(a.attributes).map((R) => `${R.name}="${R.value}"`),
											eventPhase: n.eventPhase,
											bubbles: n.bubbles,
											cancelable: n.cancelable,
											defaultPrevented: n.defaultPrevented,
											target: n.target,
											currentTarget: n.currentTarget,
											stackTrace: new Error().stack
												?.split(`
`)
												.slice(1, 8)
												.join(`
`),
										},
									),
										n.stopPropagation(),
										n.stopImmediatePropagation();
									return;
								}
								if (
									(console.log('☑️ [CHECKBOX] ========== CHECKBOX INDIVIDUAL EVENTO =========='),
									console.log(`☑️ [CHECKBOX] 🎯 HANDLER EJECUTÁNDOSE - timestamp: ${Date.now()}`),
									console.log('☑️ [CHECKBOX] 🔍 EVENTO RECIBIDO EN HANDLER INDIVIDUAL:', {
										rowId: h,
										columnId: x,
										hasHeaderAttr: a.hasAttribute('data-column-checkbox-header'),
										hasRowId: a.hasAttribute('data-row-id'),
										hasColumnId: a.hasAttribute('data-column-id'),
										eventPhase: n.eventPhase,
										defaultPrevented: n.defaultPrevented,
										isTrusted: n.isTrusted,
										timeStamp: n.timeStamp,
										isSelectAllInProgress: X,
										target: n.target,
										currentTarget: n.currentTarget,
										targetAllAttrs: Array.from(a.attributes).map((R) => `${R.name}="${R.value}"`),
										stackTrace: new Error().stack
											?.split(`
`)
											.slice(1, 5)
											.join(`
`),
									}),
									X)
								) {
									console.log('☑️ [CHECKBOX] ⏭️ Ignorando evento - select all en progreso');
									return;
								}
								const p = a.getAttribute('data-row-id'),
									E = a.getAttribute('data-column-id');
								if (!p || !E) {
									console.log(
										'☑️ [CHECKBOX] ⚠️ Ignorando checkbox sin data-row-id o data-column-id (probablemente header checkbox)',
										{
											hasRowId: !!p,
											hasColumnId: !!E,
											hasHeaderAttr: a.hasAttribute('data-column-checkbox-header'),
											allAttributes: Array.from(a.attributes).map((R) => `${R.name}="${R.value}"`),
										},
									);
									return;
								}
								console.log('☑️ [CHECKBOX] ========== CHECKBOX CAMBIÓ ==========');
								const k = isNaN(Number(p)) ? p : Number(p),
									B = a.checked;
								console.log(`☑️ [CHECKBOX] rowId: ${k}, columnId: ${E}, checked: ${B}`),
									console.log(`☑️ [CHECKBOX] Checkbox visual checked: ${a.checked}`),
									console.log('☑️ [CHECKBOX] Input element:', a),
									console.log('☑️ [CHECKBOX] Input parent:', a.parentElement);
								const A = e.rows.find((R) => R.id === k);
								if (A)
									if (
										((A.data[E] = B),
										console.log('☑️ [CHECKBOX] Estado de fila actualizado'),
										E === 'checkbox-2')
									) {
										let R = a.closest('.ubits-checkbox');
										if (
											(console.log('☑️ [CHECKBOX] checkboxContainer encontrado (closest):', R), R)
										) {
											const D = R.querySelector(`input[data-row-id="${k}"][data-column-id="${E}"]`);
											if (!D || D !== a) {
												console.log(
													'☑️ [CHECKBOX] ⚠️ checkboxContainer no coincide, buscando por data-row-id...',
												);
												const j = o.querySelector(
													`input[data-row-id="${k}"][data-column-id="${E}"]`,
												);
												j &&
													((R = j.closest('.ubits-checkbox')),
													console.log(
														'☑️ [CHECKBOX] checkboxContainer encontrado (por data-row-id):',
														R,
													));
											} else
												console.log('☑️ [CHECKBOX] ✅ checkboxContainer validado correctamente');
										}
										if (R) {
											const D = R.querySelector('.ubits-checkbox__square');
											if (
												(console.log('☑️ [CHECKBOX] checkboxSquare encontrado:', D),
												console.log('☑️ [CHECKBOX] checkboxContainer classes:', R.className),
												B)
											)
												if (
													(R.classList.add('ubits-checkbox--checked'),
													R.classList.remove('ubits-checkbox--indeterminate'),
													console.log('☑️ [CHECKBOX] Clases agregadas: checked'),
													D)
												) {
													const j = D.querySelector('.ubits-checkbox__indeterminate');
													j && (j.remove(), console.log('☑️ [CHECKBOX] Indeterminate removido')),
														R.classList.add('ubits-checkbox--checked'),
														R.classList.remove('ubits-checkbox--indeterminate'),
														R.offsetHeight;
													let I = D.querySelector('.ubits-checkbox__checkmark');
													I
														? console.log('☑️ [CHECKBOX] ✅ Checkmark ya existe, reutilizando')
														: ((I = document.createElement('span')),
															(I.className = 'ubits-checkbox__checkmark'),
															D.appendChild(I),
															console.log('☑️ [CHECKBOX] ✅ Checkmark creado y agregado al DOM'));
													const O = I.style.transition;
													(I.style.transition = 'none'),
														I.style.setProperty('opacity', '1', 'important'),
														I.style.setProperty('transform', 'scale(1)', 'important'),
														I.style.setProperty('display', 'flex', 'important'),
														console.log(
															'☑️ [CHECKBOX] Estilos forzados directamente con !important',
														),
														window.getComputedStyle(I).opacity,
														window.getComputedStyle(I).transform,
														window.getComputedStyle(I).display,
														I.offsetHeight,
														D.offsetHeight,
														R.offsetHeight,
														setTimeout(() => {
															I.style.transition = O || '';
														}, 0),
														requestAnimationFrame(() => {
															const H = D.querySelector('.ubits-checkbox__checkmark');
															if (H) {
																const U = window.getComputedStyle(H);
																console.log(
																	'☑️ [CHECKBOX] Verificación checkmark en DOM (después de RAF):',
																	H,
																),
																	console.log(
																		`☑️ [CHECKBOX] Checkmark opacity (computed): ${U.opacity}, transform (computed): ${U.transform}`,
																	),
																	console.log(`☑️ [CHECKBOX] Checkmark display: ${U.display}`),
																	console.log(
																		`☑️ [CHECKBOX] Checkmark width: ${U.width}, height: ${U.height}`,
																	);
																const F = window.getComputedStyle(H, '::after');
																console.log(
																	`☑️ [CHECKBOX] Checkmark ::after content: ${F.content}, display: ${F.display}`,
																),
																	(U.opacity === '0' || U.transform.includes('scale(0)')) &&
																		(console.log(
																			'☑️ [CHECKBOX] ⚠️ CSS no aplicado correctamente después de forzar, reintentando...',
																		),
																		H.style.setProperty('opacity', '1', 'important'),
																		H.style.setProperty('transform', 'scale(1)', 'important'),
																		H.style.setProperty('display', 'flex', 'important'),
																		H.offsetHeight);
															} else
																console.log(
																	'☑️ [CHECKBOX] ⚠️ Checkmark no encontrado después de crearlo',
																);
														});
												} else console.log('☑️ [CHECKBOX] ⚠️ checkboxSquare no encontrado');
											else if (
												(R.classList.remove('ubits-checkbox--checked'),
												R.classList.remove('ubits-checkbox--indeterminate'),
												console.log('☑️ [CHECKBOX] Clases removidas: checked'),
												D)
											) {
												const j = D.querySelector('.ubits-checkbox__checkmark');
												j && (j.remove(), console.log('☑️ [CHECKBOX] Checkmark removido'));
												const I = D.querySelector('.ubits-checkbox__indeterminate');
												I && I.remove();
											}
											console.log(
												'☑️ [CHECKBOX] ✅ Clase CSS del contenedor y checkmark actualizados',
											);
										} else {
											console.log('☑️ [CHECKBOX] ⚠️ checkboxContainer no encontrado usando closest');
											const D = o.querySelectorAll(
												`input[data-row-id="${k}"][data-column-id="${x}"]`,
											);
											if (
												(console.log(
													'☑️ [CHECKBOX] Checkboxes encontrados por data-row-id:',
													D.length,
												),
												D.length > 0)
											) {
												const I = (Array.from(D).find((O) => O === a) || D[0])?.closest(
													'.ubits-checkbox',
												);
												if ((console.log('☑️ [CHECKBOX] Checkbox correcto encontrado:', I), I)) {
													const O = I.querySelector('.ubits-checkbox__square');
													if (B) {
														if (
															(I.classList.add('ubits-checkbox--checked'),
															I.classList.remove('ubits-checkbox--indeterminate'),
															O)
														) {
															const H = O.querySelector('.ubits-checkbox__indeterminate');
															H && H.remove();
															let U = O.querySelector('.ubits-checkbox__checkmark');
															U ||
																((U = document.createElement('span')),
																(U.className = 'ubits-checkbox__checkmark'),
																O.appendChild(U),
																console.log('☑️ [CHECKBOX] ✅ Checkmark creado (fallback)'));
														}
													} else if (
														(I.classList.remove('ubits-checkbox--checked'),
														I.classList.remove('ubits-checkbox--indeterminate'),
														O)
													) {
														const H = O.querySelector('.ubits-checkbox__checkmark');
														H && H.remove();
													}
												}
											}
										}
										const K = o.querySelector(`input[data-column-checkbox-header="${x}"]`);
										if (K) {
											const D = e.rows.length > 0 && e.rows.every((H) => H.data[x] === !0),
												I = e.rows.some((H) => H.data[x] === !0) && !D;
											(K.checked = D), (K.indeterminate = I);
											const O = K.closest('.ubits-checkbox');
											if (O) {
												const H = O.querySelector('.ubits-checkbox__square');
												if (D) {
													if (
														(O.classList.add('ubits-checkbox--checked'),
														O.classList.remove('ubits-checkbox--indeterminate'),
														H)
													) {
														const U = H.querySelector('.ubits-checkbox__indeterminate');
														U && U.remove();
														let F = H.querySelector('.ubits-checkbox__checkmark');
														F ||
															((F = document.createElement('span')),
															(F.className = 'ubits-checkbox__checkmark'),
															H.appendChild(F));
													}
												} else if (I) {
													if (
														(O.classList.remove('ubits-checkbox--checked'),
														O.classList.add('ubits-checkbox--indeterminate'),
														H)
													) {
														const U = H.querySelector('.ubits-checkbox__checkmark');
														U && U.remove();
														let F = H.querySelector('.ubits-checkbox__indeterminate');
														F ||
															((F = document.createElement('span')),
															(F.className = 'ubits-checkbox__indeterminate'),
															H.appendChild(F));
													}
												} else if (
													(O.classList.remove('ubits-checkbox--checked'),
													O.classList.remove('ubits-checkbox--indeterminate'),
													H)
												) {
													const U = H.querySelector('.ubits-checkbox__checkmark');
													U && U.remove();
													const F = H.querySelector('.ubits-checkbox__indeterminate');
													F && F.remove();
												}
											}
											console.log(
												`☑️ [CHECKBOX] ✅ Header checkbox actualizado - allChecked: ${D}, indeterminate: ${I}`,
											);
										}
										console.log('🎨 [HOVER CLEANUP] ========== INICIO LIMPIEZA HOVER =========='),
											console.log('🎨 [HOVER CLEANUP] Buscando fila para limpiar hover...');
										const _ = v.closest('.ubits-data-table__row');
										if ((console.log('🎨 [HOVER CLEANUP] rowElement encontrado:', _), _)) {
											console.log(
												'🎨 [HOVER CLEANUP] ✅ Fila encontrada, verificando estado actual...',
											);
											const D = Array.from(_.classList),
												I = window.getComputedStyle(_).backgroundColor;
											console.log('🎨 [HOVER CLEANUP] Estado ANTES:', {
												classes: D,
												backgroundColor: I,
												hasHoverClass: _.classList.contains('ubits-data-table__row--clear-hover'),
											});
											const O = _.querySelectorAll('.ubits-data-table__cell');
											console.log('🎨 [HOVER CLEANUP] Celdas encontradas:', O.length),
												console.log(
													'🎨 [HOVER CLEANUP] 🔧 Aplicando solución agresiva: pointer-events: none',
												);
											const H = _.style.pointerEvents;
											(_.style.pointerEvents = 'none'),
												console.log(
													'🎨 [HOVER CLEANUP] ✅ pointer-events deshabilitado temporalmente',
												),
												_.offsetHeight;
											const U = getComputedStyle(document.documentElement)
												.getPropertyValue('--ubits-bg-1')
												.trim();
											_.classList.add('ubits-data-table__row--clear-hover'),
												console.log(
													'🎨 [HOVER CLEANUP] ✅ Clase agregada: ubits-data-table__row--clear-hover',
												),
												_.style.setProperty('background-color', U, 'important'),
												console.log(
													`🎨 [HOVER CLEANUP] ✅ Inline style aplicado a fila: background-color = ${U}`,
												),
												O.forEach((ce, V) => {
													ce.style.setProperty('background-color', U, 'important'),
														console.log(`🎨 [HOVER CLEANUP] ✅ Celda ${V} inline style aplicado`);
												}),
												_.offsetHeight,
												(_.style.pointerEvents = H || ''),
												console.log(
													`🎨 [HOVER CLEANUP] ✅ pointer-events restaurado: ${H || 'default'}`,
												);
											const ee = window.getComputedStyle(_).backgroundColor,
												re = Array.from(_.classList);
											console.log(
												'🎨 [HOVER CLEANUP] Estado DESPUÉS de aplicar solución agresiva:',
												{
													classes: re,
													backgroundColor: ee,
													bgBefore: I,
													bgChanged: I !== ee,
													pointerEvents: _.style.pointerEvents || 'default',
												},
											),
												O.forEach((ce, V) => {
													const P = window.getComputedStyle(ce).backgroundColor;
													console.log(
														`🎨 [HOVER CLEANUP] Celda ${V} background: ${P} (inline: ${ce.style.backgroundColor || 'none'})`,
													);
												}),
												requestAnimationFrame(() => {
													console.log(
														'🎨 [HOVER CLEANUP] ⏰ requestAnimationFrame ejecutado, programando timeout...',
													),
														setTimeout(() => {
															console.log(
																'🎨 [HOVER CLEANUP] ⏰ Timeout ejecutado, removiendo clase e inline styles...',
															);
															const ce = window.getComputedStyle(_).backgroundColor;
															_.classList.remove('ubits-data-table__row--clear-hover'),
																_.style.removeProperty('background-color'),
																O.forEach((Z) => {
																	Z.style.removeProperty('background-color');
																});
															const V = window.getComputedStyle(_).backgroundColor;
															console.log(
																`🎨 [HOVER CLEANUP] ✅ Clase e inline styles removidos. Background antes: ${ce}, después: ${V}`,
															),
																console.log(
																	'🎨 [HOVER CLEANUP] ========== FIN LIMPIEZA HOVER ==========',
																);
														}, 150);
												});
										} else
											console.log(
												"🎨 [HOVER CLEANUP] ❌ Fila NO encontrada usando closest('.ubits-data-table__row')",
											),
												console.log('🎨 [HOVER CLEANUP] newCheckbox:', v),
												console.log(
													'🎨 [HOVER CLEANUP] newCheckbox.parentElement:',
													v.parentElement,
												),
												console.log(
													"🎨 [HOVER CLEANUP] newCheckbox.closest('tr'):",
													v.closest('tr'),
												);
										e.onRowSelect &&
											(console.log('☑️ [CHECKBOX] Llamando onRowSelect...'),
											e.onRowSelect(k, B),
											console.log('☑️ [CHECKBOX] onRowSelect completado')),
											console.log('☑️ [CHECKBOX] ✅ Optimizado: NO se llama render() - sin brinco');
									} else
										console.log('☑️ [CHECKBOX] ⚠️ Llamando render() - esto causará el brinco'),
											console.log(
												`☑️ [CHECKBOX] 🔍 RAZÓN: columnId="${E}" NO es checkbox-2, llamando render() desde handler individual`,
											),
											console.log(
												'☑️ [CHECKBOX] 🔍 Stack trace antes de render():',
												new Error().stack
													?.split(`
`)
													.slice(1, 6)
													.join(`
`),
											),
											Y();
								console.log('☑️ [CHECKBOX] ========== FIN ==========');
							};
							v.addEventListener('change', g, { capture: !1 }),
								console.log(
									'☑️ [CHECKBOX] ✅ Listener agregado con capture:false - handler function:',
									g,
								);
						});
				const de = o.querySelectorAll('[data-expand-button="true"]');
				console.log('🔘 [EXPAND] Botones de expandir encontrados:', de.length),
					de.forEach((N, C) => {
						const h = N.cloneNode(!0);
						N.parentNode?.replaceChild(h, N),
							h.addEventListener('click', (x) => {
								x.preventDefault(), x.stopPropagation();
								const v = h.getAttribute('data-row-id'),
									g = isNaN(Number(v)) ? v : Number(v);
								console.log('🔘 [EXPAND] Click en botón de expandir - rowId:', g);
								const n = e.rows.find((a) => a.id === g);
								if (n) {
									const a = n.expanded || !1;
									(n.expanded = !a),
										console.log(
											'🔘 [EXPAND] Fila encontrada - wasExpanded:',
											a,
											'-> expanded:',
											n.expanded,
										),
										console.log(
											'🔘 [EXPAND] Fila tiene renderExpandedContent:',
											!!n.renderExpandedContent,
										),
										e.onRowExpand && e.onRowExpand(g, n.expanded),
										console.log('🔘 [EXPAND] Llamando render()...'),
										Y(),
										console.log('🔘 [EXPAND] Render() completado'),
										n.expanded &&
											requestAnimationFrame(() => {
												const p = o.querySelector(`[data-row-id="${g}"]`);
												if (p) {
													const E = p.nextElementSibling;
													if (E && E.classList.contains('ubits-data-table__row-expanded-row')) {
														console.log(
															'🔘 [EXPAND] Haciendo scroll para mostrar contenido expandido',
														);
														const k = o.querySelector(
															'.ubits-data-table__scrollable-container--vertical',
														);
														if (k) {
															const B = p.offsetTop;
															(k.scrollTop = B - 50),
																console.log(
																	'🔘 [EXPAND] Scroll aplicado - scrollTop:',
																	k.scrollTop,
																);
														} else
															p.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
																console.log(
																	'🔘 [EXPAND] ScrollIntoView aplicado (sin contenedor scrollable)',
																);
													}
												}
											});
								} else console.warn('🔘 [EXPAND] ⚠️ Fila no encontrada para rowId:', g);
							});
					}),
					o.querySelectorAll('[data-sort-button="true"]').forEach((N) => {
						N.addEventListener('click', (C) => {
							C.preventDefault(), C.stopPropagation();
							const h = N.getAttribute('data-column-id');
							T === h ? (w = w === 'asc' ? 'desc' : 'asc') : ((T = h), (w = 'asc')),
								e.onSort && e.onSort(h, w),
								Y();
						});
					}),
					o.querySelectorAll('[data-menu-button="true"]').forEach((N) => {
						const C = N,
							h = C.getAttribute('data-column-id');
						if (!h || !e.columns.find((R) => R.id === h)) return;
						const v = C.closest('th');
						if (!v) {
							console.warn('⚠️ [MENU BUTTON] No se encontró el header cell');
							return;
						}
						const g = v.hasAttribute('data-pinned') && v.getAttribute('data-pinned') === 'true',
							n = v.classList.contains('ubits-data-table__column-header--pinned'),
							a = typeof window < 'u' && !window.location?.href?.includes('storybook');
						let p,
							E = null;
						if (g || n) {
							const K =
								o
									.querySelector('.ubits-data-table')
									?.closest('.ubits-data-table__scrollable-container') || o;
							(p = K.querySelector(
								`.ubits-data-table__column-menu-dropdown[data-column-id="${h}"]`,
							)),
								p ||
									((p = document.createElement('div')),
									(p.className = 'ubits-data-table__column-menu-dropdown'),
									p.setAttribute('data-column-id', h),
									(p.style.cssText = `
            position: fixed;
            z-index: 10000 !important;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `),
									K.appendChild(p));
						} else
							(p = v.querySelector('.ubits-data-table__column-menu-dropdown')),
								p ||
									((p = document.createElement('div')),
									(p.className = 'ubits-data-table__column-menu-dropdown'),
									p.setAttribute('data-column-id', h),
									(p.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000 !important;
            margin-top: 4px;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `),
									(v.style.position = 'relative'),
									v.appendChild(p));
						let k = !1;
						const B = () => {
							p && (p.style.display = 'none'),
								(k = !1),
								A && (document.removeEventListener('click', A), (A = null)),
								(g || n) && p.parentElement && p.parentElement !== v && p.remove();
						};
						let A = null;
						C.addEventListener('click', (R) => {
							const K =
								typeof window < 'u' &&
								window.location &&
								!window.location.href.includes('storybook');
							R.preventDefault(), R.stopPropagation();
							const _ = e.columns.find((re) => re.id === h);
							if (!_) {
								console.error('❌ [COLUMN MENU] Columna no encontrada:', h);
								return;
							}
							const D = _.pinned || !1;
							if (k) {
								B();
								return;
							}
							o.querySelectorAll('.ubits-data-table__column-menu-dropdown').forEach((re) => {
								re !== p && (re.style.display = 'none');
							});
							const j = [
								{
									label: D ? 'Desfijar columna' : 'Fijar columna',
									value: 'pin',
									state: 'default',
								},
							];
							p.innerHTML = '';
							const I = `column-menu-list-${h}-${Math.random().toString(36).substr(2, 9)}`;
							p.id = I;
							try {
								const re = Oe({
									containerId: I,
									items: j,
									size: 'sm',
									maxHeight: '200px',
									onSelectionChange: (ce, V) => {
										if (ce && ce.value === 'pin') {
											const Z = e.columns.find((P) => P.id === h);
											if (Z) {
												const P = Z.pinned || !1;
												(Z.pinned = !P), e.onColumnPin && e.onColumnPin(h, Z.pinned), Y();
											} else
												console.error(
													'❌ [COLUMN MENU] Columna no encontrada al intentar fijar:',
													h,
												);
										}
										B();
									},
								});
							} catch (re) {
								console.error('❌ [COLUMN MENU] Error al crear lista con createList:', re);
								const ce = De({
									items: j,
									size: 'sm',
									maxHeight: '200px',
								});
								(p.innerHTML = ce),
									p.querySelectorAll('.ubits-list-item').forEach((Z) => {
										Z.addEventListener('click', () => {
											const P = e.columns.find((me) => me.id === h);
											if (P) {
												const me = P.pinned || !1;
												(P.pinned = !me), e.onColumnPin && e.onColumnPin(h, P.pinned), Y();
											}
											B();
										});
									});
							}
							const O = v.hasAttribute('data-pinned') && v.getAttribute('data-pinned') === 'true',
								H = v.classList.contains('ubits-data-table__column-header--pinned'),
								U = O || H ? 1e4 : 1e3,
								F = C.getBoundingClientRect(),
								ee = v.getBoundingClientRect();
							if (O || H) {
								p.style.setProperty('position', 'fixed', 'important'),
									p.style.setProperty('top', `${F.bottom + 4}px`, 'important');
								const re = F.right - 160;
								p.style.setProperty('left', `${re}px`, 'important'),
									p.style.setProperty('right', 'auto', 'important'),
									p.style.setProperty('z-index', `${U}`, 'important'),
									p.style.setProperty('display', 'block', 'important');
							} else
								(p.style.position = 'absolute'),
									(p.style.top = '100%'),
									(p.style.right = '0'),
									(p.style.left = 'auto'),
									(p.style.zIndex = `${U}`),
									p.style.setProperty('z-index', `${U}`, 'important'),
									(p.style.display = 'block');
							(k = !0),
								(A = (re) => {
									!p.contains(re.target) && !C.contains(re.target) && B();
								}),
								setTimeout(() => {
									document.addEventListener('click', A);
								}, 0);
						});
					});
				const Se = o.querySelectorAll('.ubits-data-table__action-button');
				console.log('🎯 [ACTION BUTTONS] Botones de acciones encontrados:', Se.length),
					Se.forEach((N) => {
						const C = N,
							h = C.getAttribute('data-row-id'),
							x = C.getAttribute('data-column-id');
						if (!h) {
							console.warn('⚠️ [ACTION BUTTONS] No se encontró el data-row-id en el botón');
							return;
						}
						const v = isNaN(Number(h)) ? h : Number(h),
							g = C.cloneNode(!0);
						C.parentNode?.replaceChild(g, C),
							g.addEventListener('click', (n) => {
								n.preventDefault(),
									n.stopPropagation(),
									console.log(
										'🎯 [ACTION BUTTONS] Click en botón de acción - rowId:',
										v,
										'columnId:',
										x,
									);
								const a = e.rows.find((p) => p.id === v);
								a
									? e.onRowAction
										? e.onRowAction(v, a)
										: (console.log('🎯 [ACTION BUTTONS] Acción ejecutada para fila:', v),
											alert(`Acción ejecutada para fila: ${v}`))
									: console.warn('⚠️ [ACTION BUTTONS] Fila no encontrada para rowId:', v);
							});
					});
				const fe = e.showContextMenu !== !1;
				if (
					(console.log(
						'🖱️ [CONTEXT MENU] ========== INICIO CONFIGURACIÓN MENÚ CONTEXTUAL ==========',
					),
					console.log('🖱️ [CONTEXT MENU] showContextMenuValue:', fe),
					console.log('🖱️ [CONTEXT MENU] showContextMenu option:', e.showContextMenu),
					console.log('🖱️ [CONTEXT MENU] Element:', o),
					fe)
				) {
					const N = o.querySelectorAll('tr.ubits-data-table__row[data-row-id]');
					if (
						(console.log(
							'🖱️ [CONTEXT MENU] Filas encontradas con selector "tr.ubits-data-table__row[data-row-id]":',
							N.length,
						),
						N.length === 0)
					) {
						console.warn(
							'🖱️ [CONTEXT MENU] ⚠️ No se encontraron filas con selector: tr.ubits-data-table__row[data-row-id]',
						);
						const g = o.querySelectorAll('[data-row-id]');
						if (
							(console.log(
								'🖱️ [CONTEXT MENU] Filas encontradas con selector alternativo "[data-row-id]":',
								g.length,
							),
							g.length > 0)
						) {
							console.log('🖱️ [CONTEXT MENU] Usando selector alternativo para agregar listeners'),
								g.forEach((n, a) => {
									const p = n,
										E = p.getAttribute('data-row-id');
									if (!E) {
										console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:', a);
										return;
									}
									const k = isNaN(Number(E)) ? E : Number(E);
									console.log('🖱️ [CONTEXT MENU] Agregando listener a fila (alternativo):', k);
									const B =
										document.getElementById('ubits-data-table-context-menu') ||
										(() => {
											const A = document.createElement('div');
											return (
												(A.id = 'ubits-data-table-context-menu'),
												(A.style.cssText = `
                position: fixed;
                z-index: 10000;
                display: none;
                background-color: var(--ubits-bg-1);
                border: 1px solid var(--ubits-border-1);
                border-radius: var(--ubits-border-radius-md, 8px);
                box-shadow: var(--ubits-elevation-2, 0 4px 6px rgba(0, 0, 0, 0.1));
                min-width: 200px;
                max-width: 300px;
              `),
												document.body.appendChild(A),
												A
											);
										})();
									p.addEventListener('contextmenu', (A) => {
										A.preventDefault(),
											A.stopPropagation(),
											console.log(
												'🖱️ [CONTEXT MENU] ========== Click derecho detectado (alternativo) ==========',
											),
											console.log('🖱️ [CONTEXT MENU] Fila ID:', k),
											alert(
												`Click derecho en fila ${k} - Menú contextual (implementación completa pendiente)`,
											);
									});
								}),
								console.log('🖱️ [CONTEXT MENU] ✅ Listeners agregados usando selector alternativo');
							return;
						}
					} else
						console.log(
							'🖱️ [CONTEXT MENU] ✅ Filas encontradas, procediendo a agregar listeners...',
						);
					let C = document.getElementById('ubits-data-table-context-menu');
					C ||
						((C = document.createElement('div')),
						(C.id = 'ubits-data-table-context-menu'),
						(C.style.cssText = `
          position: fixed;
          z-index: 10000;
          display: none;
          background-color: var(--ubits-bg-1);
          border: 1px solid var(--ubits-border-1);
          border-radius: var(--ubits-border-radius-md, 8px);
          box-shadow: var(--ubits-elevation-2, 0 4px 6px rgba(0, 0, 0, 0.1));
          min-width: 200px;
          max-width: 300px;
        `),
						document.body.appendChild(C));
					let h = null,
						x = null;
					const v = () => {
						C && ((C.style.display = 'none'), (C.innerHTML = '')),
							(h = null),
							x &&
								(document.removeEventListener('click', x),
								document.removeEventListener('contextmenu', x),
								(x = null));
					};
					N.forEach((g, n) => {
						const a = g,
							p = a.getAttribute('data-row-id');
						if (!p) {
							console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:', n);
							return;
						}
						const E = isNaN(Number(p)) ? p : Number(p);
						console.log('🖱️ [CONTEXT MENU] Agregando listener a fila:', E, 'elemento:', a),
							a.addEventListener('contextmenu', (k) => {
								k.preventDefault(),
									k.stopPropagation(),
									console.log('🖱️ [CONTEXT MENU] ========== Click derecho detectado =========='),
									console.log('🖱️ [CONTEXT MENU] Fila ID:', E),
									console.log('🖱️ [CONTEXT MENU] Event:', k),
									console.log('🖱️ [CONTEXT MENU] Coordenadas:', { x: k.clientX, y: k.clientY });
								const B = e.rows.find((D) => D.id === E);
								if (!B) {
									console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila no encontrada en currentOptions.rows:', E),
										console.log('🖱️ [CONTEXT MENU] Total de filas disponibles:', e.rows.length);
									return;
								}
								console.log('🖱️ [CONTEXT MENU] Datos de fila encontrados:', B),
									(h = E),
									console.log('🖱️ [CONTEXT MENU] Cerrando menú anterior...'),
									v();
								const A = (
										D,
										j,
									) => `<div style="display: flex; align-items: center; gap: var(--ubits-spacing-xs, 8px);">
            <i class="far fa-${D}" style="font-size: 14px; width: 16px; text-align: center;"></i>
            <span>${j}</span>
          </div>`,
									R = [
										{
											label: A('eye', 'Ver seleccionados'),
											value: 'view-selected',
											state: 'default',
											onClick: () => {
												console.log('🖱️ [CONTEXT MENU] Ver seleccionados para fila:', E), v();
											},
										},
										{
											label: A('bell', 'Notificaciones'),
											value: 'notifications',
											state: 'default',
											onClick: () => {
												console.log('🖱️ [CONTEXT MENU] Notificaciones para fila:', E),
													v(),
													alert(`Notificaciones para fila: ${E}`);
											},
										},
										{
											label: A('copy', 'Copiar'),
											value: 'copy',
											state: 'default',
											onClick: () => {
												console.log('🖱️ [CONTEXT MENU] Copiar para fila:', E),
													v(),
													alert(`Copiar para fila: ${E}`);
											},
										},
										{
											label: A('eye', 'Ver'),
											value: 'view',
											state: 'default',
											onClick: () => {
												console.log('🖱️ [CONTEXT MENU] Ver para fila:', E),
													v(),
													alert(`Ver para fila: ${E}`);
											},
										},
										{
											label: A('edit', 'Editar'),
											value: 'edit',
											state: 'default',
											onClick: () => {
												console.log('🖱️ [CONTEXT MENU] Editar para fila:', E),
													v(),
													alert(`Editar para fila: ${E}`);
											},
										},
										{
											label: A('download', 'Descargar'),
											value: 'download',
											state: 'default',
											onClick: () => {
												console.log('🖱️ [CONTEXT MENU] Descargar para fila:', E),
													v(),
													alert(`Descargar para fila: ${E}`);
											},
										},
										{
											label: A('trash', 'Eliminar'),
											value: 'delete',
											state: 'default',
											onClick: () => {
												console.log('🖱️ [CONTEXT MENU] Eliminar para fila:', E),
													v(),
													alert(`Eliminar para fila: ${E}`);
											},
										},
									],
									K = `context-menu-list-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
								if ((console.log('🖱️ [CONTEXT MENU] Creando menú con ID:', K), !C)) {
									console.error('🖱️ [CONTEXT MENU] ❌ contextMenuContainer es null!');
									return;
								}
								const _ = document.createElement('div');
								(_.id = K),
									(C.innerHTML = ''),
									C.appendChild(_),
									console.log('🖱️ [CONTEXT MENU] Contenedor creado y agregado al DOM');
								try {
									console.log('🖱️ [CONTEXT MENU] Intentando crear lista con createList...'),
										console.log('🖱️ [CONTEXT MENU] Items del menú:', R.length);
									const D = Oe({
										containerId: K,
										items: R,
										size: 'sm',
										maxHeight: '400px',
										onSelectionChange: (O, H) => {
											console.log('🖱️ [CONTEXT MENU] Item seleccionado:', O?.value, 'índice:', H),
												O && O.onClick && O.onClick();
										},
									});
									console.log('🖱️ [CONTEXT MENU] ✅ Lista creada exitosamente');
									const j = k.clientX,
										I = k.clientY;
									console.log('🖱️ [CONTEXT MENU] Posicionando menú en:', { x: j, y: I }),
										(C.style.left = `${j}px`),
										(C.style.top = `${I}px`),
										(C.style.display = 'block'),
										console.log('🖱️ [CONTEXT MENU] Menú visible, display:', C.style.display),
										requestAnimationFrame(() => {
											const O = C.getBoundingClientRect(),
												H = window.innerWidth,
												U = window.innerHeight;
											console.log('🖱️ [CONTEXT MENU] Dimensiones del menú:', {
												width: O.width,
												height: O.height,
												right: O.right,
												bottom: O.bottom,
												windowWidth: H,
												windowHeight: U,
											}),
												O.right > H &&
													((C.style.left = `${H - O.width - 10}px`),
													console.log('🖱️ [CONTEXT MENU] Ajustando posición horizontal')),
												O.bottom > U &&
													((C.style.top = `${U - O.height - 10}px`),
													console.log('🖱️ [CONTEXT MENU] Ajustando posición vertical'));
										}),
										(x = (O) => {
											C.contains(O.target) || v();
										}),
										setTimeout(() => {
											document.addEventListener('click', x),
												document.addEventListener('contextmenu', x);
										}, 0);
								} catch (D) {
									console.error('🖱️ [CONTEXT MENU] ❌ Error al crear menú contextual:', D),
										console.error('🖱️ [CONTEXT MENU] Stack:', D instanceof Error ? D.stack : 'N/A'),
										console.log('🖱️ [CONTEXT MENU] Usando fallback con renderList...');
									const j = De({
										items: R,
										size: 'sm',
										maxHeight: '400px',
									});
									(_.innerHTML = j),
										_.querySelectorAll('.ubits-list-item').forEach((U, F) => {
											const ee = R[F];
											ee &&
												ee.onClick &&
												U.addEventListener('click', () => {
													ee.onClick();
												});
										});
									const O = k.clientX,
										H = k.clientY;
									(C.style.left = `${O}px`),
										(C.style.top = `${H}px`),
										(C.style.display = 'block'),
										requestAnimationFrame(() => {
											const U = C.getBoundingClientRect(),
												F = window.innerWidth,
												ee = window.innerHeight;
											U.right > F && (C.style.left = `${F - U.width - 10}px`),
												U.bottom > ee && (C.style.top = `${ee - U.height - 10}px`);
										}),
										(x = (U) => {
											C.contains(U.target) || v();
										}),
										setTimeout(() => {
											document.addEventListener('click', x),
												document.addEventListener('contextmenu', x);
										}, 0);
								}
							});
					}),
						console.log(
							'🖱️ [CONTEXT MENU] ✅ Listeners del menú contextual agregados correctamente',
						);
				} else
					console.log('🖱️ [CONTEXT MENU] Menú contextual deshabilitado (showContextMenu = false)');
				console.log('🖱️ [CONTEXT MENU] ========== FIN CONFIGURACIÓN MENÚ CONTEXTUAL =========='),
					o.querySelectorAll('[data-editable-text="true"]').forEach((N) => {
						const C = N.closest('[data-editable="true"]');
						if (!C) return;
						const h = C.getAttribute('data-row-id'),
							x = C.getAttribute('data-column-id');
						if (!h || !x) return;
						const v = isNaN(Number(h)) ? h : Number(h);
						N.addEventListener('keydown', (g) => {
							g.key === 'Enter' && (g.preventDefault(), N.blur());
						}),
							N.addEventListener('blur', (g) => {
								g.stopPropagation();
								const n = N.textContent || '',
									a = e.rows.find((p) => p.id === v);
								if (a) {
									const p = e.columns.find((E) => E.id === x);
									p && (p.type === 'nombre' || p.type === 'nombre-avatar')
										? ((a.data.nombre = n.trim()), a.data[x] !== void 0 && (a.data[x] = n.trim()))
										: p && p.type === 'estado'
											? ((a.data[x] = n.trim()),
												(a.data.estado = n.trim()),
												(a.data.status = n.trim()))
											: (a.data[x] = n.trim());
								}
							}),
							N.addEventListener('dblclick', (g) => {
								g.stopPropagation();
							}),
							N.addEventListener('click', (g) => {
								g.stopPropagation();
							});
					}),
					o.querySelectorAll('.ubits-data-table__status-editable').forEach((N) => {
						const C = N.getAttribute('data-row-id'),
							h = N.getAttribute('data-column-id'),
							x = N.getAttribute('data-current-status');
						if (!C || !h) return;
						const v = isNaN(Number(C)) ? C : Number(C),
							g = N.querySelector('.ubits-status-tag'),
							n = N.querySelector('.ubits-data-table__status-dropdown');
						if (!g || !n) return;
						const a = [
							{ value: 'active', label: 'Activo', status: 'active' },
							{ value: 'completed', label: 'Completado', status: 'completed' },
							{ value: 'published', label: 'Publicado', status: 'published' },
							{ value: 'fulfilled', label: 'Cumplido', status: 'fulfilled' },
							{ value: 'created', label: 'Creado', status: 'created' },
							{ value: 'not-fulfilled', label: 'No cumplido', status: 'not-fulfilled' },
							{ value: 'denied', label: 'Denegado', status: 'denied' },
							{ value: 'draft', label: 'Borrador', status: 'draft' },
							{ value: 'in-progress', label: 'En progreso', status: 'in-progress' },
							{ value: 'syncing', label: 'Sincronizando', status: 'syncing' },
							{ value: 'pending', label: 'Pendiente', status: 'pending' },
							{
								value: 'pending-approval',
								label: 'Pendiente aprobación',
								status: 'pending-approval',
							},
							{ value: 'not-started', label: 'No iniciado', status: 'not-started' },
							{ value: 'finished', label: 'Finalizado', status: 'finished' },
							{ value: 'archived', label: 'Archivado', status: 'archived' },
							{ value: 'disabled', label: 'Deshabilitado', status: 'disabled' },
							{ value: 'paused', label: 'Pausado', status: 'paused' },
							{ value: 'hidden', label: 'Oculto', status: 'hidden' },
						];
						let p = null,
							E = null,
							k = null,
							B = !1,
							A = 0;
						const R = [],
							K = (H) => {
								const U = [];
								let F = H;
								for (; F && F !== document.body && F !== document.documentElement; ) {
									const ee = window.getComputedStyle(F),
										re = ee.overflow + ee.overflowX + ee.overflowY,
										ce = re.includes('auto') || re.includes('scroll'),
										V = F.scrollHeight > F.clientHeight || F.scrollWidth > F.clientWidth;
									(ce || V) && U.push(F), (F = F.parentElement);
								}
								return U;
							},
							_ = () => {
								try {
									if (!n || n.style.display === 'none' || !document.body.contains(n)) {
										j();
										return;
									}
									if (!g || !g.isConnected) {
										j();
										return;
									}
									const H = g.getBoundingClientRect(),
										U = H.bottom + 4,
										F = H.left,
										ee = n.style.top,
										re = n.style.left,
										ce = `${U}px`,
										V = `${F}px`;
									(ee !== ce || re !== V) && ((n.style.top = ce), (n.style.left = V), A++);
								} catch {
									j();
								}
							},
							D = () => {
								if (B) return;
								B = !0;
								const H = () => {
									if (n.style.display === 'none' || !document.body.contains(n)) {
										j();
										return;
									}
									_(), (k = requestAnimationFrame(H));
								};
								H();
							},
							j = () => {
								k && (cancelAnimationFrame(k), (k = null)), (B = !1), (A = 0);
							};
						E = _;
						const I = () => {
								j(), (n.style.display = 'none');
								const H = n.__scrollbarInstance;
								if (H && H.destroy) {
									try {
										H.destroy();
									} catch {}
									n.__scrollbarInstance = null;
								}
								n.parentElement === document.body && N.appendChild(n),
									p && (document.removeEventListener('click', p), (p = null)),
									E &&
										(window.removeEventListener('scroll', E, !0),
										o.removeEventListener('scroll', E, !0),
										R.forEach((U) => {
											U.removeEventListener('scroll', E, !0);
										}),
										(R.length = 0),
										(E = null));
							},
							O = (H) => {
								try {
									if ((H.preventDefault(), H.stopPropagation(), !g || !n)) return;
									o.querySelectorAll('.ubits-data-table__status-dropdown').forEach((oe) => {
										if (
											oe !== n &&
											((oe.style.display = 'none'), oe.parentElement === document.body)
										) {
											const ie = o.querySelector(
												`[data-row-id="${oe.getAttribute('data-row-id')}"][data-column-id="${oe.getAttribute('data-column-id')}"]`,
											);
											ie && ie.appendChild(oe);
										}
									});
									const U = {
											active: 'Activo',
											completed: 'Completado',
											published: 'Publicado',
											fulfilled: 'Cumplido',
											created: 'Creado',
											'not-fulfilled': 'No cumplido',
											denied: 'Denegado',
											draft: 'Borrador',
											'in-progress': 'En progreso',
											syncing: 'Sincronizando',
											pending: 'Pendiente',
											'pending-approval': 'Pendiente aprobación',
											'not-started': 'No iniciado',
											finished: 'Finalizado',
											archived: 'Archivado',
											disabled: 'Deshabilitado',
											paused: 'Pausado',
											hidden: 'Oculto',
										},
										F = a.map((oe) => ({
											label: oe.label,
											value: oe.value,
											state: oe.status === x ? 'active' : 'default',
											selected: oe.status === x,
										}));
									if (!document.querySelector('link[href*="scroll.css"]')) {
										const oe = document.createElement('link');
										(oe.rel = 'stylesheet'),
											(oe.href = '../../addons/scroll/src/styles/scroll.css'),
											document.head.appendChild(oe);
									}
									n.innerHTML = '';
									const ee = `status-list-${v}-${h}`,
										re = `status-scrollbar-${v}-${h}`;
									if (
										((n.id = `status-dropdown-${v}-${h}`),
										(n.innerHTML = `
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${ee}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${re}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `),
										document.getElementById(ee))
									) {
										const oe = document.createElement('style');
										(oe.textContent = `
            #${ee}::-webkit-scrollbar {
              display: none;
            }
          `),
											document.head.appendChild(oe);
									}
									n.parentElement !== document.body && document.body.appendChild(n);
									const V = g.getBoundingClientRect();
									(n.style.position = 'fixed'),
										(n.style.top = `${V.bottom + 4}px`),
										(n.style.left = `${V.left}px`),
										(n.style.zIndex = '1000'),
										(n.style.backgroundColor = 'var(--ubits-bg-1)'),
										(n.style.border = '1px solid var(--ubits-border-1)'),
										(n.style.borderRadius = '8px'),
										(n.style.display = 'block'),
										(n.style.minWidth = '200px'),
										(n.style.maxWidth = '300px'),
										(n.style.padding = '4px'),
										(n.style.boxSizing = 'border-box'),
										(n.style.maxHeight = '308px');
									const Z = K(g);
									R.push(...Z),
										_(),
										D(),
										window.addEventListener('scroll', _, !0),
										o.addEventListener('scroll', _, !0),
										Z.forEach((oe) => {
											oe.addEventListener('scroll', _, !0);
										});
									let P = null;
									try {
										const oe = Oe({
											containerId: ee,
											items: F,
											size: 'sm',
											maxHeight: 'none',
											onSelectionChange: (ie, xe) => {
												if (ie && xe !== null) {
													const Te = a[xe];
													if (Te) {
														const he = e.rows.find((Re) => Re.id === v);
														if (he && e.columns.find((Ae) => Ae.id === h)) {
															const Ae = U[Te.status] || Te.label;
															(he.data[h] = Ae), (he.data.estado = Ae), (he.data.status = Ae), Y();
														}
														I();
													}
												}
											},
										});
										oe &&
											((oe.style.maxHeight = 'none'),
											(oe.style.height = 'auto'),
											(oe.style.overflow = 'visible'),
											(oe.style.overflowY = 'visible'),
											(oe.style.overflowX = 'visible')),
											requestAnimationFrame(() => {
												if (typeof qe < 'u')
													try {
														const ie = document.getElementById(ee);
														ie &&
															ie.scrollHeight > ie.clientHeight &&
															((P = qe({
																containerId: re,
																targetId: ee,
																orientation: 'vertical',
																state: 'default',
															})),
															P?.update && P.update());
													} catch {}
											});
									} catch {}
									n.__scrollbarInstance = P;
									const me = (oe) => {
										!n.contains(oe.target) && !g.contains(oe.target) && I();
									};
									(p = me),
										setTimeout(() => {
											document.addEventListener('click', me);
										}, 0);
								} catch {
									j();
								}
							};
						g.addEventListener('click', O);
					}),
					o
						.querySelectorAll('input[data-radio-button="true"][data-editable="true"]')
						.forEach((N) => {
							const C = N,
								h = C.getAttribute('data-row-id'),
								x = C.getAttribute('data-column-id');
							if (!h || !x) return;
							const v = isNaN(Number(h)) ? h : Number(h),
								g = C.cloneNode(!0);
							C.parentNode?.replaceChild(g, C),
								g.addEventListener('change', (n) => {
									if ((n.stopPropagation(), g.checked)) {
										o.querySelectorAll(
											`input[data-radio-button="true"][data-column-id="${x}"]`,
										).forEach((E) => {
											const k = E.getAttribute('data-row-id');
											if (k && k !== String(v)) {
												E.checked = !1;
												const B = e.rows.find((A) => String(A.id) === k);
												B && (B.data[x] = !1);
											}
										});
										const p = e.rows.find((E) => String(E.id) === String(v));
										p && ((p.data[x] = !0), (p.data[`${x}_value`] = v));
									}
									Y();
								});
						}),
					o
						.querySelectorAll(
							'input[data-checkbox-button="true"]:not([data-column-id="checkbox-2"])',
						)
						.forEach((N) => {
							const C = N,
								h = C.getAttribute('data-row-id'),
								x = C.getAttribute('data-column-id');
							if (!h || !x || x === 'checkbox-2') return;
							const v = isNaN(Number(h)) ? h : Number(h),
								g = C.cloneNode(!0);
							C.parentNode?.replaceChild(g, C),
								g.addEventListener('change', (n) => {
									n.stopPropagation();
									const a = e.rows.find((p) => String(p.id) === String(v));
									a && ((a.data[x] = g.checked), e.onRowSelect && e.onRowSelect(v, g.checked), Y());
								});
						}),
					console.log(
						'☑️ [SELECT ALL] ⚠️ Handler alternativo DESHABILITADO - usando solo el handler optimizado',
					);
				const Ce = o.querySelectorAll('input[data-column-checkbox-header]');
				console.log(
					`☑️ [SELECT ALL] 🔍 Verificando ${Ce.length} header checkboxes después de attachEventListeners...`,
				),
					Ce.forEach((N, C) => {
						const h = N,
							x = h.getAttribute('data-column-checkbox-header');
						console.log(`☑️ [SELECT ALL] 🔍 Header checkbox ${C} verificado:`, {
							columnId: x,
							element: h,
							checked: h.checked,
							hasHeaderAttr: h.hasAttribute('data-column-checkbox-header'),
							allAttrs: Array.from(h.attributes).map((n) => `${n.name}="${n.value}"`),
							parentElement: h.parentElement?.tagName,
							parentClasses: h.parentElement?.className,
							isConnected: h.isConnected,
							ownerDocument: h.ownerDocument === document,
						});
						const v = () => {
							console.log(
								`☑️ [SELECT ALL] 🧪 TEST: Header checkbox ${C} recibió evento click de prueba`,
							);
						};
						h.addEventListener('click', v, { once: !0, capture: !0 });
						const g = () => {
							console.log(
								`☑️ [SELECT ALL] 🧪 TEST: Header checkbox ${C} recibió evento change de prueba`,
							);
						};
						h.addEventListener('change', g, { once: !0, capture: !0 });
					});
				const ke =
					typeof window < 'u' && window.location && !window.location.href.includes('storybook');
				if (
					(o.querySelectorAll('.ubits-data-table__date-editable').forEach((N, C) => {
						const h = N.getAttribute('data-row-id'),
							x = N.getAttribute('data-column-id');
						if (!h || !x) return;
						const v = isNaN(Number(h)) ? h : Number(h),
							g = N.querySelector('.ubits-data-table__date-display');
						if (!g) return;
						let n = null,
							a = null,
							p = null,
							E = null,
							k = null,
							B = null;
						const A = (I) => {
								const O = String(I.getDate()).padStart(2, '0'),
									H = String(I.getMonth() + 1).padStart(2, '0'),
									U = I.getFullYear();
								return `${O}/${H}/${U}`;
							},
							R = (I) => {
								if (!I) return null;
								const [O, H, U] = I.split('/');
								if (O && H && U) return new Date(parseInt(U), parseInt(H) - 1, parseInt(O));
								try {
									const F = new Date(I);
									if (!isNaN(F.getTime())) return F;
								} catch {}
								return null;
							},
							K = () => {
								a && ((a.style.display = 'none'), a.parentElement && a.remove(), (a = null)),
									p && (document.removeEventListener('click', p), (p = null)),
									E && (document.removeEventListener('keydown', E), (E = null)),
									k &&
										(window.removeEventListener('scroll', k, !0),
										B && B.removeEventListener('scroll', k, !0),
										(k = null));
							},
							_ = () => {
								(p = (I) => {
									a && !N.contains(I.target) && !a.contains(I.target) && K();
								}),
									(E = (I) => {
										I.key === 'Escape' && a && K();
									}),
									(k = (I) => {
										if (!a) return;
										const O = a.querySelector('.ubits-calendar');
										if (O) {
											const H = O.querySelector(
													'.ubits-calendar__month-dropdown[style*="display: block"]',
												),
												U = O.querySelector(
													'.ubits-calendar__year-dropdown[style*="display: block"]',
												);
											if (H || U) {
												const F = document.activeElement;
												if (
													F &&
													(a.contains(F) ||
														F.closest('.ubits-calendar') ||
														F.closest('.ubits-calendar__month-dropdown') ||
														F.closest('.ubits-calendar__year-dropdown') ||
														F.closest('.ubits-list') ||
														F.closest('[id*="calendar-list"]') ||
														F.closest('[id*="calendar-scrollbar"]'))
												)
													return;
												if (I && I.target) {
													const ee = I.target;
													if (
														a.contains(ee) ||
														ee.closest('.ubits-calendar') ||
														ee.closest('.ubits-calendar__month-dropdown') ||
														ee.closest('.ubits-calendar__year-dropdown') ||
														ee.closest('.ubits-list') ||
														ee.closest('[id*="calendar-list"]') ||
														ee.closest('[id*="calendar-scrollbar"]')
													)
														return;
												}
												return;
											}
										}
										K();
									}),
									document.addEventListener('click', p),
									document.addEventListener('keydown', E),
									(B = o.querySelector('.ubits-data-table__scrollable-container')),
									B && B.addEventListener('scroll', k, !0),
									window.addEventListener('scroll', k, !0);
							},
							D = async () => {
								const I = [
									{
										id: 'ubits-calendar-styles',
										fileName: 'calendar.css',
										href: '../../addons/calendar/src/styles/calendar.css',
									},
									{
										id: 'ubits-button-styles',
										fileName: 'button.css',
										href: '../../addons/button/src/styles/button.css',
									},
									{
										id: 'ubits-input-styles',
										fileName: 'input.css',
										href: '../../addons/input/src/styles/input.css',
									},
									{
										id: 'ubits-list-styles',
										fileName: 'list.css',
										href: '../../addons/list/src/styles/list.css',
									},
								];
								for (const O of I) {
									const H = document.getElementById(O.id),
										U = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).find(
											(ee) => (ee.href || '').includes(O.fileName) || ee.id === O.id,
										);
									if (H || U) continue;
									const F = document.createElement('link');
									(F.rel = 'stylesheet'),
										(F.href = O.href),
										(F.id = O.id),
										document.head.appendChild(F);
								}
							},
							j = async () => {
								if (a && a.style.display !== 'none') {
									K();
									return;
								}
								if (n && a) {
									const I = g.getBoundingClientRect();
									(a.style.top = `${I.bottom + 4}px`),
										(a.style.left = `${I.left}px`),
										(a.style.display = 'block'),
										_();
									return;
								}
								try {
									await D();
									const { createCalendar: I } = await import('./index-yMb4_Bo5.mjs').then(
											(ce) => ce.i,
										),
										O = g.textContent || '',
										H = R(O);
									(n = I({
										mode: 'single',
										selectedDate: H,
										initialDate: H || /* @__PURE__ */ new Date(),
										onDateSelect: (ce) => {
											const V = A(ce);
											g.textContent = V;
											const Z = e.rows.find((P) => P.id === v);
											Z && ((Z.data[x] = V), (Z.data[`${x}_iso`] = ce.toISOString().split('T')[0])),
												K(),
												Y();
										},
									})),
										(a = document.createElement('div')),
										(a.className = 'ubits-data-table__calendar-container'),
										a.setAttribute('data-row-id', String(v)),
										a.setAttribute('data-column-id', x);
									const F = g.getBoundingClientRect(),
										ee = F.bottom + 4,
										re = F.left;
									(a.style.cssText = `
            position: fixed;
            top: ${ee}px;
            left: ${re}px;
            z-index: 99999;
            display: block;
            margin: 0;
          `),
										document.body.appendChild(a),
										a.appendChild(n.element),
										_();
								} catch (I) {
									console.error('❌ [CALENDAR] Error cargando Calendar UBITS:', I);
								}
							};
						g.addEventListener('click', (I) => {
							I.preventDefault(), I.stopPropagation(), j();
						});
					}),
					o.querySelectorAll('input[data-toggle-button="true"]').forEach((N) => {
						const C = N,
							h = C.getAttribute('data-row-id'),
							x = C.getAttribute('data-column-id');
						if (!h || !x) return;
						const v = isNaN(Number(h)) ? h : Number(h),
							g = C.cloneNode(!0);
						C.parentNode?.replaceChild(g, C),
							g.addEventListener('change', (a) => {
								a.stopPropagation();
								const p = e.rows.find((E) => String(E.id) === String(v));
								p && ((p.data[x] = g.checked), Y());
							});
						const n = g.closest('.ubits-toggle');
						n &&
							n.addEventListener('click', (a) => {
								a.target !== g &&
									!g.contains(a.target) &&
									(a.preventDefault(),
									a.stopPropagation(),
									(g.checked = !g.checked),
									g.dispatchEvent(new Event('change', { bubbles: !0 })));
							});
					}),
					e.showPagination)
				) {
					const N = o.querySelector('.ubits-data-table__pagination');
					if (N) {
						N.querySelectorAll('.ubits-pagination__page-button').forEach((v) => {
							v.addEventListener('click', () => {
								const g = parseInt(v.textContent || '1');
								e.onPageChange && e.onPageChange(g), (e.currentPage = g), Y();
							});
						}),
							N.querySelectorAll('.ubits-pagination__nav-button').forEach((v) => {
								v.addEventListener('click', () => {
									const g = parseInt(N.getAttribute('data-current-page') || '1'),
										n = parseInt(N.getAttribute('data-total-pages') || '1'),
										a = v.getAttribute('aria-label') || '';
									let p = g;
									a.includes('Primera') || a.includes('First')
										? (p = 1)
										: a.includes('Última') || a.includes('Last')
											? (p = n)
											: a.includes('Anterior') || a.includes('Previous')
												? (p = Math.max(1, g - 1))
												: (a.includes('Siguiente') || a.includes('Next')) &&
													(p = Math.min(n, g + 1)),
										p !== g && (e.onPageChange && e.onPageChange(p), (e.currentPage = p), Y());
								});
							});
						const x = N.querySelector('.ubits-pagination__select');
						x &&
							x.addEventListener('change', (v) => {
								const g = v.target,
									n = parseInt(g.value);
								e.onItemsPerPageChange && e.onItemsPerPageChange(n),
									(e.itemsPerPage = n),
									(e.currentPage = 1),
									Y();
							});
					}
				}
				if (e.header) {
					const N = o.querySelector('.ubits-data-table__header');
					if (N) {
						if (e.header.primaryButton && e.header.showPrimaryButton !== !1) {
							const C = N.querySelector('.ubits-data-table__header-primary-button');
							C &&
								e.header.primaryButton.onClick &&
								C.addEventListener('click', e.header.primaryButton.onClick);
						}
						if (
							(e.header.secondaryButtons &&
								e.header.showSecondaryButtons !== !1 &&
								N.querySelectorAll('.ubits-data-table__header-secondary-button').forEach((h, x) => {
									const v = e.header.secondaryButtons[x];
									v && v.onClick && h.addEventListener('click', v.onClick);
								}),
							e.header.searchButton && e.header.showSearchButton !== !1)
						) {
							console.log('🔍 [DATA TABLE] Configurando SearchButton:', {
								isSearchActive: z,
								hasHeader: !!e.header,
								hasSearchButton: !!e.header.searchButton,
							});
							const C = N.querySelector('.ubits-data-table__header-search-button'),
								h = C?.previousElementSibling,
								x = C ? window.getComputedStyle(C) : null,
								v = h ? window.getComputedStyle(h) : null;
							let g = null;
							if (C && h) {
								const n = h.getBoundingClientRect(),
									a = C.getBoundingClientRect(),
									p = a.left - n.right;
								g = {
									prevButtonRight: n.right,
									searchBtnLeft: a.left,
									actualGap: p,
									expectedGap: 8,
									difference: p - 8,
									prevButtonWidth: n.width,
									searchBtnWidth: a.width,
									marginLeft: x?.marginLeft,
									marginRight: x?.marginRight,
								};
							}
							if (
								(console.log('🔍 [DATA TABLE] SearchButton encontrado:', {
									found: !!C,
									className: C?.className,
									tagName: C?.tagName,
									isActive: C?.classList.contains('ubits-search-button--active'),
									width: x?.width,
									prevButton: h?.tagName,
									gapInfo: g,
								}),
								C)
							) {
								const n = C.querySelector('button'),
									a = C.tagName === 'BUTTON',
									p = !!n;
								if (
									(console.log('🔍 [DATA TABLE] Estado del SearchButton:', {
										isButton: a,
										hasButtonInside: p,
										isSearchActive: z,
										shouldAddListener: (a || p) && !z,
									}),
									(a || p) && !z)
								) {
									const k = a ? C : n;
									console.log('🔍 [DATA TABLE] Agregando listener al botón de búsqueda'),
										k.addEventListener('click', (B) => {
											console.log('🔍 [DATA TABLE] Click en botón de búsqueda detectado!'),
												B.stopPropagation(),
												B.preventDefault(),
												(z = !0),
												console.log('🔍 [DATA TABLE] isSearchActive cambiado a:', z),
												e.header.searchButton.onClick && e.header.searchButton.onClick(B),
												console.log('🔍 [DATA TABLE] Re-renderizando tabla...'),
												Y(),
												setTimeout(() => {
													const A = o.querySelector('.ubits-data-table__header-search-button');
													if (
														(console.log('🔍 [DATA TABLE] Buscando input después de renderizar:', {
															found: !!A,
															tagName: A?.tagName,
														}),
														A)
													) {
														const R = A.querySelector('.ubits-search-button__input');
														R
															? (console.log('🔍 [DATA TABLE] Enfocando input'),
																R.focus(),
																setTimeout(() => {
																	R.setSelectionRange(0, R.value.length);
																}, 10))
															: console.warn(
																	'🔍 [DATA TABLE] Input no encontrado después de renderizar',
																);
													}
												}, 150);
										});
								}
								const E = C.querySelector('.ubits-search-button__input');
								if (E) {
									E.value = $;
									const k = (D) => {
										if (
											(($ = D),
											e.header.searchButton.onChange && e.header.searchButton.onChange(D),
											Y(),
											D &&
												setTimeout(() => {
													const j = o.querySelector('.ubits-data-table__header-search-button');
													if (j) {
														const I = j.querySelector('.ubits-search-button__input');
														I && (I.focus(), I.setSelectionRange(I.value.length, I.value.length));
													}
												}, 50),
											e.header.searchButton.onSearch)
										) {
											const j = W(e.rows, D, e.columns);
											e.header.searchButton.onSearch(D, j);
										}
									};
									E.addEventListener('input', (D) => {
										const j = D.target.value;
										k(j);
									}),
										E.addEventListener('change', (D) => {
											const j = D.target.value;
											k(j);
										});
									let B = null,
										A = !1,
										R = 0;
									E.addEventListener('focus', () => {
										(A = !0),
											(R = Date.now()),
											console.log('🔍 [DATA TABLE] Input recibió focus'),
											setTimeout(() => {
												A = !1;
											}, 200);
									}),
										E.addEventListener('blur', (D) => {
											const I = Date.now() - R;
											if (
												(console.log('🔍 [DATA TABLE] Input perdió focus:', {
													isFocusing: A,
													timeSinceFocus: I,
													searchTerm: $,
													activeElement: document.activeElement?.tagName,
												}),
												A || I < 200)
											) {
												console.log('🔍 [DATA TABLE] Ignorando blur inmediato después de focus');
												return;
											}
											B && clearTimeout(B),
												(B = setTimeout(() => {
													const O = o.querySelector('.ubits-search-button__input'),
														H = document.activeElement,
														U = o.querySelector('.ubits-search-button__clear'),
														F = o.querySelector('.ubits-data-table__header-search-button'),
														ee = O && $ === '' && !O.value && H !== U && !F?.contains(H);
													console.log('🔍 [DATA TABLE] Evaluando cierre del SearchButton:', {
														hasInput: !!O,
														searchTerm: $,
														inputValue: O?.value,
														activeElement: H?.tagName,
														isClearBtn: H === U,
														isInsideWrapper: F?.contains(H),
														shouldClose: ee,
													}),
														ee &&
															(console.log(
																'🔍 [DATA TABLE] Desactivando SearchButton por blur (vacío)',
															),
															(z = !1),
															Y()),
														(B = null);
												}, 200));
										});
									const K = C.closest('.ubits-data-table__header-search-button');
									K &&
										K.addEventListener('mousedown', (D) => {
											D.target.closest('.ubits-search-button__input-wrapper') && D.preventDefault();
										});
									const _ = C.querySelector('.ubits-search-button__clear');
									_ &&
										_.addEventListener('click', (D) => {
											D.stopPropagation(),
												D.preventDefault(),
												($ = ''),
												(E.value = ''),
												(z = !1),
												k('');
										});
								}
							}
						}
						if (e.header.filterButton && e.header.showFilterButton !== !1) {
							const C = N.querySelector('.ubits-data-table__header-filter-button');
							C &&
								C.addEventListener('click', (h) => {
									h.stopPropagation(), h.preventDefault();
									let x = e.header.filterButton.filters || [];
									if (
										(x.length === 0 &&
											(x = e.columns
												.filter((g) => {
													const n = [
														'drag-handle',
														'expand',
														'checkbox',
														'radio',
														'toggle',
														'acciones',
													];
													return g.visible !== !1 && g.type && !n.includes(g.type);
												})
												.map((g) => {
													let n = 'text',
														a;
													if (g.type === 'estado') {
														n = 'select';
														const p = /* @__PURE__ */ new Set();
														e.rows.forEach((E) => {
															const k = E.data[g.id];
															k != null && p.add(String(k));
														}),
															(a = Array.from(p).map((E) => ({ value: E, label: E })));
													} else
														g.type === 'fecha'
															? (n = 'date')
															: g.type === 'progreso'
																? (n = 'number')
																: (n = 'text');
													return {
														id: g.id,
														label: g.title,
														columnId: g.id,
														type: n,
														options: a,
													};
												})),
										x.length === 0)
									) {
										console.warn('🔍 [DATA TABLE] No hay columnas disponibles para filtrar'),
											e.header.filterButton.onClick && e.header.filterButton.onClick(h);
										return;
									}
									const v = () => `
                  <div class="ubits-data-table__filters-container">
                    ${x
											.map((n) => {
												const a = S[n.id] || n.value || '';
												let p = '';
												const E = `filter-input-${n.id}`;
												switch (n.type) {
													case 'text':
													case 'number':
													case 'date':
														p = Fe({
															containerId: E,
															label: n.label,
															type: n.type,
															value: a,
															placeholder: `Filtrar por ${n.label.toLowerCase()}...`,
															size: 'md',
														});
														break;
													case 'select':
														n.options &&
															n.options.length > 0 &&
															(p = Fe({
																containerId: E,
																label: n.label,
																type: 'select',
																selectOptions: n.options,
																value: a,
																placeholder: `Seleccionar ${n.label.toLowerCase()}...`,
																size: 'md',
															}));
														break;
												}
												return `
                    <div class="ubits-data-table__filter-item" data-filter-id="${n.id}">
                      <div id="${E}">${p}</div>
                    </div>
                  `;
											})
											.join('')}
                  </div>
                `;
									if (G)
										try {
											G.updateContent(v);
										} catch (g) {
											console.error('🔍 [DATA TABLE] Error al actualizar drawer:', g),
												(G = Ye({
													title: 'Filtros',
													complementaryText: 'Aplica filtros para refinar los resultados',
													width: 40,
													bodyContent: v,
													footerButtons: {
														secondary: {
															label: 'Limpiar',
															onClick: (n) => {
																n.preventDefault(),
																	n.stopPropagation(),
																	(S = {}),
																	e.header.filterButton.onClearFilters &&
																		e.header.filterButton.onClearFilters(),
																	Y(),
																	G && G.close();
															},
														},
														primary: {
															label: 'Aplicar',
															onClick: (n) => {
																n.preventDefault(), n.stopPropagation();
																const a = {};
																x.forEach((p) => {
																	const E = G.element.querySelector(`[data-filter-id="${p.id}"]`);
																	if (E) {
																		const k = E.querySelector('.ubits-input');
																		k &&
																			k.value &&
																			k.value.trim() !== '' &&
																			(a[p.id] = k.value.trim());
																	}
																}),
																	(S = a),
																	e.header.filterButton.onApplyFilters &&
																		e.header.filterButton.onApplyFilters(S),
																	Y(),
																	G && G.close();
															},
														},
													},
													onClose: () => {},
													closeOnOverlayClick: !0,
												}));
										}
									else
										try {
											G = Ye({
												title: 'Filtros',
												complementaryText: 'Aplica filtros para refinar los resultados',
												width: 40,
												bodyContent: v,
												footerButtons: {
													secondary: {
														label: 'Limpiar',
														onClick: (g) => {
															g.preventDefault(),
																g.stopPropagation(),
																(S = {}),
																e.header.filterButton.onClearFilters &&
																	e.header.filterButton.onClearFilters(),
																Y(),
																G && G.close();
														},
													},
													primary: {
														label: 'Aplicar',
														onClick: (g) => {
															g.preventDefault(), g.stopPropagation();
															const n = {};
															x.forEach((a) => {
																const p = G.element.querySelector(`[data-filter-id="${a.id}"]`);
																if (p) {
																	const E = p.querySelector('.ubits-input');
																	E &&
																		E.value &&
																		E.value.trim() !== '' &&
																		(n[a.id] = E.value.trim());
																}
															}),
																(S = n),
																e.header.filterButton.onApplyFilters &&
																	e.header.filterButton.onApplyFilters(S),
																Y(),
																G && G.close();
														},
													},
												},
												onClose: () => {},
												closeOnOverlayClick: !0,
											});
										} catch (g) {
											console.error('🔍 [DATA TABLE] Error al crear drawer:', g),
												e.header.filterButton.onClick && e.header.filterButton.onClick(h);
											return;
										}
									G &&
										(G.open(),
										setTimeout(() => {
											G &&
												x.forEach((g) => {
													const n = `filter-input-${g.id}`,
														a = G.element.querySelector(`#${n}`);
													if (a) {
														a.innerHTML = '';
														const p = S[g.id] || g.value || '';
														let E = {
															containerId: n,
															label: g.label,
															value: p,
															placeholder:
																g.type === 'select'
																	? `Seleccionar ${g.label.toLowerCase()}...`
																	: `Filtrar por ${g.label.toLowerCase()}...`,
															size: 'md',
														};
														g.type === 'select' && g.options
															? ((E.type = 'select'),
																(E.selectOptions = g.options.map((k) => ({
																	value: k.value,
																	text: k.label || k.value,
																}))))
															: (E.type = g.type),
															vt(E);
													}
												});
										}, 300));
								});
						}
						if (e.header.columnSelectorButton && e.header.showColumnSelectorButton !== !1) {
							const C = N.querySelector('.ubits-data-table__header-column-selector-button');
							if (C) {
								let h = null,
									x = !1;
								const v = () => (
										(h && h.parentElement) ||
											((h = document.createElement('div')),
											(h.className = 'ubits-data-table__column-selector-dropdown'),
											(h.style.display = 'none'),
											document.body.appendChild(h)),
										h
									),
									g = () => {
										if (!h || !C) return;
										const E = C.getBoundingClientRect(),
											k = h.offsetWidth || 200;
										(h.style.position = 'fixed'), (h.style.top = `${E.bottom + 4}px`);
										const B = E.right - k;
										B < 0 ? (h.style.left = '0px') : (h.style.left = `${B}px`),
											(h.style.right = 'auto');
									};
								let n = null,
									a = null;
								const p = () => {
									h &&
										((h.style.display = 'none'),
										(x = !1),
										a && (document.removeEventListener('click', a), (a = null)),
										n &&
											(window.removeEventListener('scroll', n, !0),
											window.removeEventListener('resize', n),
											(n = null)));
								};
								C.addEventListener('click', (E) => {
									if (
										(E.preventDefault(),
										E.stopPropagation(),
										console.log('🔍 [COLUMN SELECTOR] ========== CLICK EN BOTÓN =========='),
										console.log('🔍 [COLUMN SELECTOR] Estado actual - isOpen:', x),
										x)
									) {
										console.log('🔍 [COLUMN SELECTOR] Dropdown ya está abierto, cerrando...'), p();
										return;
									}
									const k = v();
									for (
										console.log('🔍 [COLUMN SELECTOR] Dropdown creado/obtenido:', {
											exists: !!k,
											hasChildren: k.children.length,
											innerHTMLLength: k.innerHTML.length,
										}),
											console.log('🔍 [COLUMN SELECTOR] Limpiando dropdown completamente...'),
											console.log(
												'🔍 [COLUMN SELECTOR] ANTES - children:',
												k.children.length,
												'innerHTML:',
												k.innerHTML.length,
												'chars',
											);
										k.firstChild;
									)
										k.removeChild(k.firstChild);
									k.innerHTML = '';
									const B = k.children.length,
										A = k.innerHTML.length;
									console.log(
										'🔍 [COLUMN SELECTOR] DESPUÉS - children:',
										B,
										'innerHTML:',
										A,
										'chars',
									),
										(B > 0 || A > 0) &&
											(console.error(
												'🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown no está completamente limpio!',
											),
											(k.innerHTML = ''),
											requestAnimationFrame(() => {
												(k.children.length > 0 || k.innerHTML.length > 0) &&
													console.error(
														'🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown sigue sin estar limpio después de limpieza adicional!',
													);
											}));
									const R = 'ubits-data-table-column-selector-list',
										K = document.getElementById(R);
									K &&
										(console.log(
											'🔍 [COLUMN SELECTOR] ⚠️ Contenedor existente encontrado, removiendo...',
										),
										K.remove());
									const _ = document.createElement('div');
									if (
										((_.id = R),
										k.appendChild(_),
										console.log('🔍 [COLUMN SELECTOR] Contenedor de lista creado:', {
											id: _.id,
											parentExists: !!_.parentElement,
											hasChildren: _.children.length,
											innerHTML: _.innerHTML.length,
										}),
										_)
									) {
										console.log(
											'🔍 [COLUMN SELECTOR] ========== PROCESANDO COLUMNAS PARA CREAR LISTA ==========',
										),
											console.log(
												'🔍 [COLUMN SELECTOR] Total columnas en currentOptions:',
												e.columns.length,
											);
										const I = r(e.columns);
										I.length !== e.columns.length &&
											(console.log(
												'🔍 [COLUMN SELECTOR] ⚠️ DUPLICADOS ELIMINADOS:',
												e.columns.length,
												'->',
												I.length,
											),
											(e.columns = I));
										const O = I.filter((V) => {
												const Z = ['drag-handle', 'expand'],
													P = ['checkbox', 'checkbox-2'];
												return (
													!Z.includes(V.type || '') && !P.includes(V.id) && V.id !== 'checkbox'
												);
											}),
											H = /* @__PURE__ */ new Set(),
											U = O.filter((V) =>
												H.has(V.id)
													? (console.log('🔍 [COLUMN SELECTOR] ⚠️ DUPLICADO:', V.id), !1)
													: (H.add(V.id), !0),
											);
										console.log('🔍 [COLUMN SELECTOR] Columnas seleccionables finales:', U.length),
											console.log(
												'🔍 [COLUMN SELECTOR] IDs:',
												U.map((V) => `${V.id}(${V.visible !== !1 ? 'visible' : 'oculta'})`).join(
													', ',
												),
											);
										const F = U.filter((V) => V.visible !== !1).length;
										console.log('🔍 [COLUMN SELECTOR] Columnas visibles:', F);
										const ee = U.map((V) => {
												const Z = V.visible !== !1,
													P = Z && F === 1;
												return {
													label: Me({
														label: V.title,
														checked: Z,
														size: 'sm',
														disabled: P,
														className: 'ubits-data-table__column-selector-checkbox',
													}).replace('<input', `<input data-column-selector-id="${V.id}"`),
													value: V.id,
													state: 'default',
													selected: !1,
												};
											}),
											re = /* @__PURE__ */ new Set(),
											ce = ee.filter((V) =>
												re.has(V.value)
													? (console.log('🔍 [COLUMN SELECTOR] ⚠️ ITEM DUPLICADO:', V.value), !1)
													: (re.add(V.value), !0),
											);
										console.log('🔍 [COLUMN SELECTOR] Items únicos para lista:', ce.length),
											console.log(
												'🔍 [COLUMN SELECTOR] Valores:',
												ce.map((V) => V.value).join(', '),
											);
										try {
											console.log('🔍 [COLUMN SELECTOR] Llamando createList...'),
												Oe({
													containerId: R,
													items: ce,
													size: 'sm',
													maxHeight: '400px',
													className: 'ubits-data-table__column-selector-list',
												}),
												console.log('🔍 [COLUMN SELECTOR] ✅ createList completado');
											const V = document.getElementById(R);
											if (V) {
												const P =
													V.querySelector('.ubits-list')?.querySelectorAll('.ubits-list-item') ||
													[];
												console.log('🔍 [COLUMN SELECTOR] Lista creada - items en DOM:', P.length);
											} else
												console.error(
													'🔍 [COLUMN SELECTOR] ❌ Lista no encontrada después de createList',
												);
										} catch (V) {
											console.error('🔍 [COLUMN SELECTOR] ❌ Error en createList:', V),
												(_.innerHTML = De({
													containerId: R,
													items: ce,
													size: 'sm',
													maxHeight: '400px',
													className: 'ubits-data-table__column-selector-list',
												})),
												console.log('🔍 [COLUMN SELECTOR] ✅ Fallback renderList usado');
										}
									} else console.error('🔍 [COLUMN SELECTOR] ❌ listContainer no existe');
									const D = () => {
											console.log(
												'🔍 [COLUMN SELECTOR] ========== UPDATE DROPDOWN CONTENT ==========',
											),
												console.log('🔍 [COLUMN SELECTOR] Dropdown existe:', !!k),
												console.log('🔍 [COLUMN SELECTOR] Dropdown isOpen:', x);
											const I = 'ubits-data-table-column-selector-list';
											let O = k.querySelector(`#${I}`);
											console.log('🔍 [COLUMN SELECTOR] Buscando contenedor:', {
												found: !!O,
												hasChildren: O ? O.children.length : 0,
												innerHTMLLength: O ? O.innerHTML.length : 0,
											}),
												(!O || !x) &&
													(console.log(
														'🔍 [COLUMN SELECTOR] ⚠️ Contenedor no encontrado o dropdown cerrado, recreando...',
													),
													(k.innerHTML = ''),
													(O = document.createElement('div')),
													(O.id = I),
													k.appendChild(O),
													console.log('🔍 [COLUMN SELECTOR] Contenedor recreado:', {
														id: O.id,
														parentExists: !!O.parentElement,
													}));
											const H = r(e.columns);
											H.length !== e.columns.length &&
												(console.log(
													'🔍 [COLUMN SELECTOR UPDATE] ⚠️ DUPLICADOS:',
													e.columns.length,
													'->',
													H.length,
												),
												(e.columns = H));
											const U = H.filter((P) => {
													const me = ['drag-handle', 'expand'],
														oe = ['checkbox', 'checkbox-2'];
													return (
														!me.includes(P.type || '') && !oe.includes(P.id) && P.id !== 'checkbox'
													);
												}),
												F = /* @__PURE__ */ new Set(),
												ee = U.filter((P) =>
													F.has(P.id)
														? (console.log('🔍 [COLUMN SELECTOR UPDATE] ⚠️ DUPLICADO:', P.id), !1)
														: (F.add(P.id), !0),
												),
												re = ee.filter((P) => P.visible !== !1).length;
											console.log(
												'🔍 [COLUMN SELECTOR UPDATE] Columnas:',
												ee.length,
												'| Visibles:',
												re,
											),
												console.log(
													'🔍 [COLUMN SELECTOR UPDATE] IDs:',
													ee.map((P) => `${P.id}(${P.visible !== !1 ? 'V' : 'O'})`).join(', '),
												);
											const ce = ee.map((P) => {
													const me = P.visible !== !1,
														oe = me && re === 1;
													return {
														label: Me({
															label: P.title,
															checked: me,
															size: 'sm',
															disabled: oe,
															className: 'ubits-data-table__column-selector-checkbox',
														}).replace('<input', `<input data-column-selector-id="${P.id}"`),
														value: P.id,
														state: 'default',
														selected: !1,
													};
												}),
												V = /* @__PURE__ */ new Set(),
												Z = ce.filter((P) =>
													V.has(P.value)
														? (console.log(
																'🔍 [COLUMN SELECTOR UPDATE] ⚠️ ITEM DUPLICADO:',
																P.value,
															),
															!1)
														: (V.add(P.value), !0),
												);
											console.log('🔍 [COLUMN SELECTOR UPDATE] Items únicos:', Z.length),
												console.log(
													'🔍 [COLUMN SELECTOR UPDATE] Valores:',
													Z.map((P) => P.value).join(', '),
												),
												console.log('🔍 [COLUMN SELECTOR UPDATE] Limpiando contenedor...'),
												console.log(
													'🔍 [COLUMN SELECTOR UPDATE] ANTES - children:',
													O.children.length,
													'innerHTML:',
													O.innerHTML.length,
												),
												(O.innerHTML = ''),
												console.log(
													'🔍 [COLUMN SELECTOR UPDATE] DESPUÉS - children:',
													O.children.length,
													'innerHTML:',
													O.innerHTML.length,
												);
											try {
												console.log('🔍 [COLUMN SELECTOR UPDATE] Llamando createList...'),
													Oe({
														containerId: I,
														items: Z,
														size: 'sm',
														maxHeight: '400px',
														className: 'ubits-data-table__column-selector-list',
													}),
													console.log('🔍 [COLUMN SELECTOR UPDATE] ✅ createList completado');
												const P = document.getElementById(I);
												if (P) {
													const oe =
														P.querySelector('.ubits-list')?.querySelectorAll('.ubits-list-item') ||
														[];
													console.log(
														'🔍 [COLUMN SELECTOR UPDATE] Lista creada - items en DOM:',
														oe.length,
													);
												} else console.error('🔍 [COLUMN SELECTOR UPDATE] ❌ Lista no encontrada');
											} catch (P) {
												console.error('🔍 [COLUMN SELECTOR UPDATE] ❌ Error en createList:', P),
													(O.innerHTML = De({
														containerId: I,
														items: Z,
														size: 'sm',
														maxHeight: '400px',
														className: 'ubits-data-table__column-selector-list',
													})),
													console.log('🔍 [COLUMN SELECTOR UPDATE] ✅ Fallback renderList usado');
											}
											setTimeout(() => {
												j();
											}, 50);
										},
										j = () => {
											k.querySelectorAll('input[data-column-selector-id]').forEach((O) => {
												const H = O,
													U = H.getAttribute('data-column-selector-id'),
													F = H.cloneNode(!0);
												H.parentNode?.replaceChild(F, H),
													F.addEventListener('change', (ee) => {
														if ((ee.stopPropagation(), ee.preventDefault(), F.disabled)) {
															console.log(
																'🔍 [COLUMN SELECTOR] Checkbox deshabilitado, ignorando cambio',
															);
															return;
														}
														const re = F.checked,
															ce = e.columns.find((V) => V.id === U);
														if (ce) {
															if (!re) {
																const Z = e.columns.filter((ie) => {
																		const xe = ['drag-handle', 'expand'],
																			Te = ['checkbox', 'checkbox-2'];
																		return (
																			!xe.includes(ie.type || '') &&
																			!Te.includes(ie.id) &&
																			ie.id !== 'checkbox'
																		);
																	}),
																	P = /* @__PURE__ */ new Set(),
																	me = Z.filter((ie) => (P.has(ie.id) ? !1 : (P.add(ie.id), !0))),
																	oe = me.filter((ie) => (ie.id === U ? !1 : ie.visible !== !1));
																if (
																	(console.log(
																		'🔍 [COLUMN SELECTOR] Validación de ocultar columna:',
																		{
																			columnId: U,
																			columnTitle: ce.title,
																			selectableColumnsCount: me.length,
																			wouldBeVisibleCount: oe.length,
																			selectableColumns: me.map((ie) => ({
																				id: ie.id,
																				title: ie.title,
																				visible: ie.visible,
																			})),
																			wouldBeVisible: oe.map((ie) => ({
																				id: ie.id,
																				title: ie.title,
																			})),
																		},
																	),
																	console.log(
																		'🔍 [COLUMN SELECTOR] Detalles completos:',
																		JSON.stringify(
																			{
																				columnId: U,
																				columnTitle: ce.title,
																				selectableColumnsCount: me.length,
																				wouldBeVisibleCount: oe.length,
																				selectableColumns: me.map((ie) => ({
																					id: ie.id,
																					title: ie.title,
																					visible: ie.visible,
																				})),
																				wouldBeVisible: oe.map((ie) => ({
																					id: ie.id,
																					title: ie.title,
																				})),
																			},
																			null,
																			2,
																		),
																	),
																	oe.length === 0)
																) {
																	(F.checked = !0),
																		console.warn(
																			'⚠️ No se pueden ocultar todas las columnas. Debe quedar al menos una columna visible.',
																		);
																	return;
																}
															}
															console.log(
																'🔍 [COLUMN SELECTOR] ========== ACTUALIZANDO VISIBILIDAD ==========',
															),
																console.log('🔍 [COLUMN SELECTOR] Columna encontrada:', {
																	id: ce.id,
																	title: ce.title,
																	visibleActual: ce.visible,
																	visibleNuevo: re,
																});
															const V = e.columns.filter((Z) => Z.id === U);
															console.log(
																'🔍 [COLUMN SELECTOR] Columnas con el mismo ID:',
																V.length,
																V.map((Z) => ({ id: Z.id, title: Z.title, visible: Z.visible })),
															),
																(ce.visible = re),
																V.length > 1 &&
																	(console.log(
																		'🔍 [COLUMN SELECTOR] ⚠️ ACTUALIZANDO COLUMNAS DUPLICADAS:',
																		V.length,
																	),
																	V.forEach((Z, P) => {
																		Z.id === U &&
																			((Z.visible = re),
																			console.log(
																				'🔍 [COLUMN SELECTOR] Columna duplicada actualizada:',
																				P,
																				Z.id,
																				Z.title,
																				Z.visible,
																			));
																	})),
																console.log('🔍 [COLUMN SELECTOR] Estado después de actualizar:', {
																	columnId: U,
																	visible: ce.visible,
																	totalColumnsWithId: e.columns.filter((Z) => Z.id === U).length,
																}),
																console.log(
																	'🔍 [COLUMN SELECTOR] Llamando updateDropdownContent...',
																),
																D(),
																console.log(
																	'🔍 [COLUMN SELECTOR] Llamando render() para actualizar tabla...',
																),
																Y(),
																console.log('🔍 [COLUMN SELECTOR] Render completado');
														}
													});
											});
										};
									setTimeout(() => {
										j();
									}, 100),
										(k.style.display = 'block'),
										requestAnimationFrame(() => {
											g(),
												setTimeout(() => {
													g();
												}, 10);
										}),
										(x = !0),
										(n = () => {
											x && h && g();
										}),
										window.addEventListener('scroll', n, !0),
										window.addEventListener('resize', n),
										(a = (I) => {
											k &&
												!k.contains(I.target) &&
												!C.contains(I.target) &&
												(n &&
													(window.removeEventListener('scroll', n, !0),
													window.removeEventListener('resize', n)),
												p());
										}),
										setTimeout(() => {
											document.addEventListener('click', a);
										}, 0),
										e.header.columnSelectorButton.onClick &&
											e.header.columnSelectorButton.onClick(E);
								});
							}
						}
					}
				}
				try {
					const N = o.querySelector('.ubits-data-table__empty-state');
					if (N && e.emptyState) {
						const C = e.rows.length === 0,
							h = $ && $.trim() !== '',
							x = Object.keys(S).length > 0;
						let v;
						if (
							(C && e.emptyState.noData
								? (v = e.emptyState.noData)
								: h && e.emptyState.noSearchResults
									? (v = e.emptyState.noSearchResults)
									: x && e.emptyState.noFilterResults && (v = e.emptyState.noFilterResults),
							v)
						) {
							if (v.onAction) {
								const g = N.querySelector('[data-action="primary"]');
								g &&
									g.addEventListener('click', (n) => {
										n.preventDefault(), n.stopPropagation(), v.onAction?.();
									});
							}
							if (v.onSecondaryAction) {
								const g = N.querySelector('[data-action="secondary"]');
								g &&
									g.addEventListener('click', (n) => {
										n.preventDefault(), n.stopPropagation(), v.onSecondaryAction?.();
									});
							}
						}
					}
				} catch (N) {
					console.error('📎 [ATTACH] ❌ Error agregando listeners de empty state:', N);
				}
			} catch (X) {
				console.error('📎 [ATTACH] ❌ Error en attachEventListeners:', X);
			}
			console.log('📎 [ATTACH] ========== FIN attachEventListeners ==========');
		};
	return (
		Y(),
		{
			element: o,
			destroy: () => {
				if (M) {
					try {
						M.destroy();
					} catch {}
					M = null;
				}
				if (q) {
					const X =
						o.querySelector('.ubits-data-table__scrollable-container') ||
						o.querySelector('.ubits-data-table') ||
						o;
					X && X.removeEventListener('scroll', q),
						window.removeEventListener('scroll', q, !0),
						(q = null);
				}
				o && o.parentNode && o.parentNode.removeChild(o);
			},
			update: (X) => {
				const se = e.showPagination;
				if (((e = { ...e, ...X }), X.columns))
					console.log('🔍 [UPDATE] Eliminando duplicados de columnas actualizadas...'),
						(e.columns = r(X.columns));
				else if (e.columns) {
					const te = e.columns.length;
					(e.columns = r(e.columns)),
						e.columns.length !== te &&
							console.log(
								'🔍 [UPDATE] Duplicados encontrados y eliminados:',
								te,
								'->',
								e.columns.length,
							);
				}
				if (X.showPagination !== void 0 && X.showPagination !== se)
					if (X.showPagination) {
						if (q) {
							const te =
								o.querySelector('.ubits-data-table__scrollable-container') ||
								o.querySelector('.ubits-data-table') ||
								o;
							te && te.removeEventListener('scroll', q),
								window.removeEventListener('scroll', q, !0),
								(q = null);
						}
						J = Q;
					} else J = Q;
				X.columns && (f = X.columns.filter((te) => te.visible !== !1).map((te) => te.id)),
					X.rows && ((L = X.rows.map((te) => te.id)), (J = Q)),
					Y();
			},
		}
	);
}
typeof window < 'u' &&
	((window.UBITSDataTable = {
		renderDataTable: Ue,
		createDataTable: Je,
	}),
	(window.renderDataTable = Ue),
	(window.createDataTable = Je));
export { Dt as S, Je as c, Ue as r };
