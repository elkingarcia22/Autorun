function Pe(t) {
	const {
			label: d,
			complementaryText: m,
			value: u = '',
			name: l = '',
			checked: i = !1,
			indeterminate: a = !1,
			size: c = 'md',
			state: n = 'default',
			disabled: r = !1,
			className: e = '',
		} = t,
		h = r || n === 'disabled',
		S = [
			'ubits-checkbox',
			`ubits-checkbox--${c}`,
			n !== 'default' ? `ubits-checkbox--${n}` : '',
			i ? 'ubits-checkbox--checked' : '',
			a ? 'ubits-checkbox--indeterminate' : '',
			h ? 'ubits-checkbox--disabled' : '',
			e,
		]
			.filter(Boolean)
			.join(' '),
		x = `
    <input
      type="checkbox"
      id="checkbox-${l}-${u || 'default'}"
      ${l ? `name="${l}"` : ''}
      ${u ? `value="${u}"` : ''}
      ${i ? 'checked' : ''}
      ${a ? 'data-indeterminate="true"' : ''}
      ${h ? 'disabled' : ''}
      class="ubits-checkbox__input"
    />
  `,
		s = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${a ? '<span class="ubits-checkbox__indeterminate"></span>' : ''}
      ${i && !a ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
      ${!i && !a && n === 'active' ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
    </span>
  `,
		k = `
    <span class="ubits-checkbox__label">${d}</span>
  `,
		E = m ? `<span class="ubits-checkbox__complementary-text">${m}</span>` : '',
		C = `
    <div class="ubits-checkbox__text-content">
      ${k}
      ${E}
    </div>
  `;
	return `
    <label class="${S}">
      ${x}
      ${s}
      ${C}
    </label>
  `.trim();
}
const Ue = {
		yellow: 'var(--modifiers-normal-color-light-feedback-chart-warning-bold)',
		green: 'var(--modifiers-normal-color-light-feedback-accent-success)',
		gray: 'var(--modifiers-normal-color-light-bg-4)',
		info: 'var(--modifiers-normal-color-light-feedback-chart-info-bold)',
		error: 'var(--modifiers-normal-color-light-feedback-accent-error)',
	},
	tt = {
		xs: { height: 4, indicatorFontSize: 'var(--modifiers-normal-body-xs-regular-fontsize)' },
		sm: { height: 8, indicatorFontSize: 'var(--modifiers-normal-body-sm-regular-fontsize)' },
		md: { height: 16, indicatorFontSize: 'var(--modifiers-normal-body-md-regular-fontsize)' },
		lg: { height: 20, indicatorFontSize: 'var(--modifiers-normal-body-lg-regular-fontsize)' },
	};
function nt(t) {
	const {
			size: d = 'md',
			value: m = 0,
			variant: u = 'default',
			segments: l = [],
			indicator: i,
			className: a = '',
		} = t,
		c = tt[d],
		n = [
			'ubits-progress-bar',
			`ubits-progress-bar--${d}`,
			u === 'multi-color' ? 'ubits-progress-bar--multi-color' : '',
			a,
		]
			.filter(Boolean)
			.join(' ');
	let r = '';
	i !== void 0 &&
		i !== !1 &&
		(r = `<span class="ubits-progress-bar__indicator">${typeof i == 'string' ? i : `${Math.round(m)}%`}</span>`);
	let e = '';
	if (u === 'multi-color' && l.length > 0) {
		const h = l.reduce((k, E) => k + E.value, 0),
			S = Math.max(0, 100 - h),
			x = [...l];
		S > 0 && x.push({ value: S, color: 'gray' }),
			(e = `<div class="ubits-progress-bar__indicator-wrapper">${x
				.map((k, E) => {
					const C = k.value,
						N = Ue[k.color] || Ue.gray,
						B = E === 0,
						$ = E === x.length - 1;
					return `<div 
        class="ubits-progress-bar__segment" 
        style="width: ${C}%; background-color: ${N}; ${`border-radius: ${B ? '1000px 0 0 1000px' : $ ? '0 1000px 1000px 0' : '0'};`}"
        data-color="${k.color}"
      ></div>`;
				})
				.join('')}</div>`);
	} else
		e = `<div 
      class="ubits-progress-bar__indicator-wrapper" 
      style="width: ${Math.max(0, Math.min(100, m))}%;"
    ></div>`;
	return `
    <div class="${n}" style="height: ${c.height}px;">
      <div class="ubits-progress-bar__container">
        ${e}
      </div>
      ${r}
    </div>
  `.trim();
}
const Ve = {
	// Estados verdes (success) - Valores exactos de Figma
	completed: {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-success)',
	},
	published: {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-success)',
	},
	fulfilled: {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-success)',
	},
	created: {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-success)',
	},
	active: {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-success)',
	},
	// Estados rojos (error) - Valores exactos de Figma
	'not-fulfilled': {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-error-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-error)',
	},
	denied: {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-error-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-error)',
	},
	// Estados azules (info) - Valores exactos de Figma con gradiente
	draft: {
		bg: 'var(--modifiers-normal-color-light-bg-active)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)',
		border: 'var(--modifiers-normal-color-light-accent-brand)',
	},
	'in-progress': {
		bg: 'var(--modifiers-normal-color-light-bg-active)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)',
		border: 'var(--modifiers-normal-color-light-accent-brand)',
	},
	syncing: {
		bg: 'var(--modifiers-normal-color-light-bg-active)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)',
		border: 'var(--modifiers-normal-color-light-accent-brand)',
	},
	// Estados naranjas/amarillos (warning) - Valores exactos de Figma
	pending: {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-warning-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-warning-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-warning)',
	},
	'pending-approval': {
		bg: 'var(--modifiers-normal-color-light-feedback-bg-warning-subtle-default)',
		text: 'var(--modifiers-normal-color-light-feedback-fg-warning-subtle-default)',
		border: 'var(--modifiers-normal-color-light-feedback-border-warning)',
	},
	// Estados grises (neutral) - Valores exactos de Figma
	'not-started': {
		bg: 'var(--modifiers-normal-color-light-bg-2)',
		text: 'var(--modifiers-normal-color-light-fg-1-medium)',
		border: 'var(--modifiers-normal-color-light-border-1)',
	},
	finished: {
		bg: 'var(--modifiers-normal-color-light-bg-2)',
		text: 'var(--modifiers-normal-color-light-fg-1-medium)',
		border: 'var(--modifiers-normal-color-light-border-1)',
	},
	archived: {
		bg: 'var(--modifiers-normal-color-light-bg-2)',
		text: 'var(--modifiers-normal-color-light-fg-1-medium)',
		border: 'var(--modifiers-normal-color-light-border-1)',
	},
	disabled: {
		bg: 'var(--modifiers-normal-color-light-bg-2)',
		text: 'var(--modifiers-normal-color-light-fg-1-medium)',
		border: 'var(--modifiers-normal-color-light-border-1)',
	},
	paused: {
		bg: 'var(--modifiers-normal-color-light-bg-2)',
		text: 'var(--modifiers-normal-color-light-fg-1-medium)',
		border: 'var(--modifiers-normal-color-light-border-1)',
	},
	hidden: {
		bg: 'var(--modifiers-normal-color-light-bg-2)',
		text: 'var(--modifiers-normal-color-light-fg-1-medium)',
		border: 'var(--modifiers-normal-color-light-border-1)',
	},
};
function ot(t = {}) {
	const {
			label: d = '',
			size: m = 'md',
			status: u = 'pending',
			leftIcon: l,
			rightIcon: i = 'chevron-down',
			clickable: a = !1,
			className: c = '',
		} = t,
		n = Ve[u] || Ve.pending,
		r = l ? `<span class="ubits-status-tag-left-icon"><i class="far fa-${l}"></i></span>` : '',
		e =
			i != null
				? `<span class="ubits-status-tag-right-icon"><i class="far fa-${i}"></i></span>`
				: '',
		h = ['ubits-status-tag', `ubits-status-tag--${m}`, a ? 'ubits-status-tag--clickable' : '', c]
			.filter(Boolean)
			.join(' '),
		s = `
    ${u === 'draft' || u === 'in-progress' || u === 'syncing' ? `background: linear-gradient(90deg, var(--modifiers-normal-color-light-bg-active) 0%, var(--modifiers-normal-color-light-bg-active) 100%), linear-gradient(90deg, var(--modifiers-normal-color-light-bg-1) 0%, var(--modifiers-normal-color-light-bg-1) 100%); background-color: ${n.bg};` : `background-color: ${n.bg};`}
    color: ${n.text};
    border-color: ${n.border};
  `.trim();
	return `
    <span class="${h}" style="${s}" data-status="${u}">
      ${r}
      <span class="ubits-status-tag-label">${d}</span>
      ${e}
    </span>
  `.trim();
}
function at(t) {
	if (typeof window.renderBadge == 'function') return window.renderBadge(t);
	const { type: d, size: m, variant: u, absolute: l, position: i, className: a, content: c } = t,
		n = [
			'ubits-badge',
			`ubits-badge--${m}`,
			d === 'dot' ? 'ubits-badge--dot' : '',
			d === 'number' ? 'ubits-badge--number' : '',
			`ubits-badge--${u}`,
			l ? 'ubits-badge--absolute' : '',
			l && i ? `ubits-badge--absolute-${i}` : '',
			a,
		]
			.filter(Boolean)
			.join(' '),
		r = d === 'number' && c !== void 0 && c !== null ? String(c) : '';
	return `<span class="${n}">${r}</span>`;
}
const Xe = {
		xs: 20,
		sm: 28,
		md: 36,
		// 36px
		lg: 40,
		// 40px
	},
	st = 'md',
	it = {
		green: 'success',
		red: 'error',
		blue: 'info',
		orange: 'warning',
		gray: 'primary',
	},
	Ke = {
		xs: 6,
		sm: 8,
		md: 10,
		lg: 10,
	},
	Ye = {
		xs: 'var(--font-body-xs-size, 11px)',
		sm: 'var(--font-body-sm-size, 13px)',
		md: 'var(--font-body-md-size, 16px)',
		lg: 'var(--font-body-lg-size, 18px)',
	};
function rt(t) {
	return t.imageUrl ? 'photo' : t.initials ? 'initials' : 'icon';
}
function lt(t) {
	const d = t.trim().split(/\s+/);
	return d.length === 0
		? ''
		: d.length === 1
			? d[0].substring(0, 2).toUpperCase()
			: (d[0][0] + d[d.length - 1][0]).toUpperCase();
}
function $e(t = {}) {
	const {
			imageUrl: d,
			initials: m,
			icon: u = 'user',
			size: l = 'md',
			badgeColor: i,
			badgeContent: a,
			alt: c = 'Avatar',
			className: n = '',
			onClick: r,
		} = t,
		e = rt(t),
		h = Xe[l] || Xe.md,
		S = Ke[l] || Ke.md,
		x = Ye[l] || Ye.md,
		s = ['ubits-avatar', `ubits-avatar--${l}`, `ubits-avatar--${e}`, n].filter(Boolean).join(' '),
		k = `
    width: ${h}px;
    height: ${h}px;
    min-width: ${h}px;
    min-height: ${h}px;
  `.trim();
	let E = '';
	if (e === 'photo' && d)
		E = `<div class="ubits-avatar-image-container"><img src="${d}" alt="${c}" class="ubits-avatar-image" /></div>`;
	else if (e === 'initials') {
		const N = m ? lt(m) : '';
		E = `<span class="ubits-avatar-initials" style="font-size: ${x};">${N}</span>`;
	} else {
		const N = h - S * 2;
		E = `<i class="far fa-${u}" style="font-size: ${N}px;"></i>`;
	}
	const C = i
		? at({
				type: a != null && a !== '' ? 'number' : 'dot',
				size: st,
				variant: it[i] || 'success',
				absolute: !0,
				position: 'bottom-right',
				className: 'ubits-avatar-badge-wrapper',
				content: a,
			})
		: '';
	return `
    <div class="${s}" style="${k}" ${r ? 'role="button" tabindex="0"' : ''} data-variant="${e}">
      ${E}
      ${C}
    </div>
  `.trim();
}
function ct(t) {
	const {
			label: d,
			complementaryText: m,
			value: u = '',
			name: l = '',
			checked: i = !1,
			size: a = 'md',
			state: c = 'default',
			disabled: n = !1,
			className: r = '',
		} = t,
		e = n || c === 'disabled',
		h = [
			'ubits-toggle',
			`ubits-toggle--${a}`,
			c !== 'default' ? `ubits-toggle--${c}` : '',
			i ? 'ubits-toggle--checked' : '',
			e ? 'ubits-toggle--disabled' : '',
			r,
		]
			.filter(Boolean)
			.join(' '),
		S = `
    <input
      type="checkbox"
      id="toggle-${l}-${u || 'default'}"
      ${l ? `name="${l}"` : ''}
      ${u ? `value="${u}"` : ''}
      ${i ? 'checked' : ''}
      ${e ? 'disabled' : ''}
      class="ubits-toggle__input"
      role="switch"
      aria-checked="${i}"
    />
  `,
		x = `
    <span class="ubits-toggle__track" aria-hidden="true">
      <span class="ubits-toggle__thumb"></span>
    </span>
  `;
	let s = '';
	if (d || m) {
		const C = d ? `<span class="ubits-toggle__label">${d}</span>` : '',
			N = m ? `<span class="ubits-toggle__complementary-text">${m}</span>` : '';
		s = `
      <div class="ubits-toggle__text-content">
        ${C}
        ${N}
      </div>
    `;
	}
	const k = d || m ? 'label' : 'div',
		E = d || m ? h : `${h} ubits-toggle--no-label`;
	return `
    <${k} class="${E}">
      ${S}
      ${s}
      ${x}
    </${k}>
  `.trim();
}
function dt(t) {
	const {
			label: d,
			complementaryText: m,
			value: u,
			name: l,
			checked: i = !1,
			size: a = 'md',
			state: c = 'default',
			disabled: n = !1,
			className: r = '',
		} = t,
		e = n || c === 'disabled',
		h = [
			'ubits-radio-button',
			`ubits-radio-button--${a}`,
			c !== 'default' ? `ubits-radio-button--${c}` : '',
			i ? 'ubits-radio-button--checked' : '',
			e ? 'ubits-radio-button--disabled' : '',
			r,
		]
			.filter(Boolean)
			.join(' '),
		S = `
    <input
      type="radio"
      id="radio-${l}-${u}"
      name="${l}"
      value="${u}"
      ${i ? 'checked' : ''}
      ${e ? 'disabled' : ''}
      class="ubits-radio-button__input"
    />
  `,
		x = `
    <span class="ubits-radio-button__circle" aria-hidden="true">
      ${i || (c === 'active' && !i) ? '<span class="ubits-radio-button__dot"></span>' : ''}
    </span>
  `,
		s = `
    <span class="ubits-radio-button__label">${d}</span>
  `,
		k = m ? `<span class="ubits-radio-button__complementary-text">${m}</span>` : '',
		E = `
    <div class="ubits-radio-button__text-content">
      ${s}
      ${k}
    </div>
  `;
	return `
    <label class="${h}">
      ${S}
      ${x}
      ${E}
    </label>
  `.trim();
}
function Re(t) {
	const {
			items: d,
			size: m = 'md',
			maxHeight: u = '400px',
			className: l = '',
			attributes: i = {},
		} = t,
		a = ['ubits-list', l].filter(Boolean).join(' '),
		c = Object.entries(i)
			.map(([r, e]) => `${r}="${e}"`)
			.join(' ');
	let n = `<div class="${a}" role="list" style="max-height: ${u};" ${c}>`;
	return (
		d.forEach((r, e) => {
			const h = r.value || `list-item-${e}`,
				S = r.state || (r.selected ? 'active' : 'default'),
				x = [
					'ubits-list-item',
					`ubits-list-item--${m}`,
					S !== 'default' ? `ubits-list-item--${S}` : '',
				]
					.filter(Boolean)
					.join(' '),
				s = [];
			r.selected && s.push('aria-selected="true"'),
				S === 'disabled' ? s.push('aria-disabled="true"') : s.push('tabindex="0"'),
				s.push(`data-value="${h}"`),
				s.push(`data-index="${e}"`),
				r.attributes &&
					Object.entries(r.attributes).forEach(([k, E]) => {
						s.push(`${k}="${E}"`);
					}),
				(n += `
      <div class="${x}" role="listitem" ${s.join(' ')}>
        ${r.label}
      </div>
    `);
		}),
		(n += '</div>'),
		n
	);
}
function De(t) {
	const { containerId: d, items: m, size: u = 'md', onSelectionChange: l, multiple: i = !1 } = t,
		a = document.getElementById(d);
	if (!a) throw new Error(`Container with id "${d}" not found`);
	const c = Re(t);
	a.innerHTML = c;
	const n = a.querySelector('.ubits-list');
	if (!n) throw new Error('Failed to create list element');
	const r = n.querySelectorAll('.ubits-list-item');
	let e = null;
	return (
		r.forEach((h, S) => {
			const x = m[S];
			x &&
				(x.state !== 'disabled' &&
					h.addEventListener('click', () => {
						if ((x.onClick && x.onClick(x, S), i)) {
							if (
								(h.classList.contains('ubits-list-item--active')
									? (h.classList.remove('ubits-list-item--active'),
										h.removeAttribute('aria-selected'))
									: (h.classList.add('ubits-list-item--active'),
										h.setAttribute('aria-selected', 'true')),
								l)
							) {
								const k = Array.from(r)
									.map((E, C) =>
										E.classList.contains('ubits-list-item--active')
											? { item: m[C], index: C }
											: null,
									)
									.filter(Boolean);
								if (k.length > 0) {
									const E = k[k.length - 1];
									l(E.item, E.index);
								} else l(null, null);
							}
						} else {
							if (e !== null && e !== S) {
								const s = r[e];
								s.classList.remove('ubits-list-item--active'), s.removeAttribute('aria-selected');
							}
							e !== S
								? (h.classList.add('ubits-list-item--active'),
									h.setAttribute('aria-selected', 'true'),
									(e = S),
									l && l(x, S))
								: (h.classList.remove('ubits-list-item--active'),
									h.removeAttribute('aria-selected'),
									(e = null),
									l && l(null, null));
						}
					}),
				x.state !== 'disabled' &&
					h.addEventListener('keydown', (s) => {
						const k = S;
						let E = null;
						if (s.key === 'ArrowDown') s.preventDefault(), (E = k < m.length - 1 ? k + 1 : 0);
						else if (s.key === 'ArrowUp') s.preventDefault(), (E = k > 0 ? k - 1 : m.length - 1);
						else if (s.key === 'Enter' || s.key === ' ') {
							s.preventDefault(), h.click();
							return;
						} else
							s.key === 'Home'
								? (s.preventDefault(), (E = 0))
								: s.key === 'End' && (s.preventDefault(), (E = m.length - 1));
						if (E !== null) {
							const C = r[E];
							C &&
								m[E]?.state !== 'disabled' &&
								(C.focus(), C.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
						}
					}));
		}),
		n
	);
}
function ut(t = {}) {
	const {
			size: d = 'md',
			variant: m = 'primary',
			animated: u = !0,
			label: l,
			fullScreen: i = !1,
			className: a = '',
			style: c = '',
		} = t,
		n = [
			'ubits-spinner',
			`ubits-spinner--${d}`,
			`ubits-spinner--${m}`,
			u ? 'ubits-spinner--animated' : '',
			i ? 'ubits-spinner--fullscreen' : '',
			a,
		]
			.filter(Boolean)
			.join(' '),
		r = c ? ` style="${c}"` : '';
	return `
    <div class="${n}"${r}>
      <div class="ubits-spinner__circle">
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
      </div>
      ${l ? `<span class="ubits-spinner__label">${l}</span>` : ''}
    </div>
  `.trim();
}
function Be(t, d = 'regular') {
	try {
		const m = d === 'solid' ? 'fas' : 'far',
			u = t.startsWith('fa-') ? t : `fa-${t}`;
		return `<i class="${m} ${u}"></i>`;
	} catch {
		const u = d === 'solid' ? 'fas' : 'far',
			l = t.startsWith('fa-') ? t : `fa-${t}`;
		return `<i class="${u} ${l}"></i>`;
	}
}
function Le(t) {
	const {
			variant: d = 'primary',
			size: m = 'md',
			text: u = '',
			icon: l,
			iconStyle: i = 'regular',
			iconOnly: a = !1,
			disabled: c = !1,
			loading: n = !1,
			loadingText: r,
			badge: e = !1,
			active: h = !1,
			fullWidth: S = !1,
			block: x = !1,
			iconPosition: s = 'left',
			className: k = '',
			attributes: E = {},
			dropdown: C = !1,
			showTooltip: N = !1,
			tooltipText: B = '',
		} = t,
		$ = [
			'ubits-button',
			`ubits-button--${d}`,
			`ubits-button--${m}`,
			h && 'ubits-button--active',
			a && 'ubits-button--icon-only',
			n && 'ubits-button--loading',
			S && 'ubits-button--full-width',
			x && 'ubits-button--block',
			s === 'right' && 'ubits-button--icon-right',
			C && 'ubits-button--dropdown',
			k,
		]
			.filter(Boolean)
			.join(' '),
		K = [
			c && 'disabled',
			n && 'data-loading="true"',
			n && 'aria-busy="true"',
			...Object.entries(E).map(([le, q]) => `${le}="${q}"`),
		]
			.filter(Boolean)
			.join(' ');
	let V = '';
	l && (V = Be(l, i));
	let ee = V,
		oe = s;
	C && !l && u
		? ((ee = Be('chevron-down', i)), (oe = 'right'))
		: C && l && s === 'left' && u
			? (ee = `${V}${Be('chevron-down', i)}`)
			: C && !u && (ee = l ? `${V}${Be('chevron-down', i)}` : Be('chevron-down', i));
	const J =
			{
				xs: 'xs',
				sm: 'sm',
				md: 'sm',
				lg: 'md',
				xl: 'lg',
			}[m] || 'sm',
		ue =
			{
				primary: 'primary',
				secondary: 'secondary',
				tertiary: 'secondary',
				active: 'primary',
			}[d] || 'primary',
		pe = n
			? ut({
					size: J,
					variant: ue,
					animated: !0,
					className: 'ubits-button__spinner',
				})
			: '';
	let U = '';
	n && r
		? (U = `${pe}<span class="button-text">${r}</span>`)
		: n && !u
			? (U = pe)
			: n && u
				? s === 'right'
					? (U = `<span class="button-text">${u}</span>${pe}`)
					: (U = `${pe}<span class="button-text">${u}</span>`)
				: a && l
					? (U = V)
					: ee && u
						? C && l && s === 'left'
							? (U = `${Be(l, i)}<span>${u}</span>${Be('chevron-down', i)}`)
							: oe === 'right'
								? (U = `<span>${u}</span>${ee}`)
								: (U = `${ee}<span>${u}</span>`)
						: u
							? (U = C ? `<span>${u}</span>${Be('chevron-down', i)}` : `<span>${u}</span>`)
							: ee && (U = ee);
	const ve = e ? '<span class="ubits-button__badge"></span>' : '',
		be = a && N && B ? `title="${B}"` : '';
	return `
    <button class="${$}" ${K} ${be}>
      ${U}
      ${ve}
    </button>
  `.trim();
}
function et(t) {
	const { orientation: d = 'vertical', state: m = 'default', className: u = '' } = t;
	return `
    <div class="${['ubits-scrollbar', `ubits-scrollbar--${d}`, m ? `ubits-scrollbar--${m}` : '', u]
			.filter(Boolean)
			.join(' ')}">
      <div class="ubits-scrollbar__bar"></div>
    </div>
  `.trim();
}
function Fe(t) {
	const {
		containerId: d,
		targetId: m,
		orientation: u = 'vertical',
		state: l = 'default',
		className: i = '',
	} = t;
	let a;
	d ? (a = document.getElementById(d) || document.body) : (a = document.body);
	const c = document.createElement('div');
	c.innerHTML = et({ orientation: u, state: l, className: i });
	const n = c.firstElementChild;
	if (!n) throw new Error('No se pudo crear el scrollbar');
	const r = n.querySelector('.ubits-scrollbar__bar');
	if (!r) throw new Error('No se pudo encontrar la barra del scrollbar');
	let e = null;
	if (m) e = document.getElementById(m);
	else if (d) {
		const B = a.querySelector('[data-scrollable]');
		B && (e = B);
	}
	const h = () => {
			if (!e || !r) return;
			const B = u === 'vertical',
				$ = B ? 'scrollTop' : 'scrollLeft',
				K = B ? 'clientHeight' : 'clientWidth',
				V = B ? 'scrollHeight' : 'scrollWidth',
				ee = e[$],
				oe = e[K],
				G = e[V];
			if (G <= oe) {
				r.style.opacity = '0';
				return;
			}
			const J = B ? n.clientHeight : n.clientWidth,
				D = Math.max((oe / G) * J, 20),
				ue = J - D,
				pe = (ee / (G - oe)) * ue;
			B
				? ((r.style.height = `${D}px`), (r.style.transform = `translateY(${pe}px)`))
				: ((r.style.width = `${D}px`), (r.style.transform = `translateX(${pe}px)`)),
				(r.style.opacity = '1');
		},
		S = (B) => {
			if (!e || !r || B.target === r) return;
			B.preventDefault(), B.stopPropagation();
			const $ = u === 'vertical',
				K = n.getBoundingClientRect(),
				V = $ ? B.clientY - K.top : B.clientX - K.left,
				ee = $ ? n.clientHeight : n.clientWidth,
				oe = V / ee,
				G = $ ? 'clientHeight' : 'clientWidth',
				J = $ ? 'scrollHeight' : 'scrollWidth',
				D = $ ? 'scrollTop' : 'scrollLeft',
				ue = e[G],
				U = e[J] - ue;
			e[D] = oe * U;
		};
	let x = !1,
		s = 0,
		k = 0;
	const E = (B) => {
			if (!e || !r || B.target !== r) return;
			B.preventDefault(), B.stopPropagation(), (x = !0);
			const $ = u === 'vertical';
			(s = $ ? B.clientY : B.clientX),
				(k = $ ? e.scrollTop : e.scrollLeft),
				document.addEventListener('mousemove', C),
				document.addEventListener('mouseup', N);
		},
		C = (B) => {
			if (!x || !e || !r) return;
			const $ = u === 'vertical',
				V = ($ ? B.clientY : B.clientX) - s,
				ee = $ ? n.clientHeight : n.clientWidth,
				oe = $ ? e.clientHeight : e.clientWidth,
				J = ($ ? e.scrollHeight : e.scrollWidth) - oe,
				D = J / ee,
				ue = k + V * D;
			$
				? (e.scrollTop = Math.max(0, Math.min(J, ue)))
				: (e.scrollLeft = Math.max(0, Math.min(J, ue)));
		},
		N = () => {
			(x = !1),
				document.removeEventListener('mousemove', C),
				document.removeEventListener('mouseup', N);
		};
	if (e) {
		e.addEventListener('scroll', h), e.addEventListener('resize', h);
		const B = new ResizeObserver(() => {
			h();
		});
		B.observe(e), (n.__resizeObserver = B);
	}
	return (
		n.addEventListener('click', S),
		r.addEventListener('mousedown', E),
		(n.__handleMouseUp = N),
		(n.__handleMouseMove = C),
		a.appendChild(n),
		setTimeout(() => {
			h();
		}, 100),
		{
			element: n,
			update: h,
			destroy: () => {
				if (e) {
					e.removeEventListener('scroll', h), e.removeEventListener('resize', h);
					const B = n.__resizeObserver;
					B && B.disconnect();
				}
				n.removeEventListener('click', S),
					r.removeEventListener('mousedown', E),
					n.__handleMouseUp &&
						(document.removeEventListener('mousemove', n.__handleMouseMove),
						document.removeEventListener('mouseup', n.__handleMouseUp)),
					n.remove();
			},
		}
	);
}
const Rt = /* @__PURE__ */ Object.freeze(
	/* @__PURE__ */ Object.defineProperty(
		{
			__proto__: null,
			createScrollbar: Fe,
			renderScrollbar: et,
		},
		Symbol.toStringTag,
		{ value: 'Module' },
	),
);
function bt(t, d, m) {
	const u = [];
	if (d <= m) for (let l = 1; l <= d; l++) u.push(l);
	else {
		const l = Math.floor(m / 2);
		let i = Math.max(1, t - l),
			a = Math.min(d, i + m - 1);
		a - i < m - 1 && (i = Math.max(1, a - m + 1));
		for (let c = i; c <= a; c++) u.push(c);
	}
	return u;
}
function pt(t, d, m = 'md', u) {
	return Le({
		variant: d ? 'secondary' : 'tertiary',
		size: m === 'sm' ? 'sm' : m === 'lg' ? 'lg' : 'md',
		text: String(t),
		active: d,
		className: 'ubits-pagination__page-button',
	});
}
function ft(t) {
	const {
			currentPage: d = 1,
			totalPages: m,
			totalItems: u,
			itemsPerPage: l,
			variant: i = 'default',
			size: a = 'md',
			maxVisiblePages: c = 7,
			showFirst: n = !0,
			showLast: r = !0,
			showPrevNext: e = !0,
			showInfo: h = !1,
			showItemsPerPage: S = !1,
			itemsPerPageOptions: x = [10, 20, 50, 100],
			className: s = '',
			attributes: k = {},
			labels: E = {},
		} = t,
		C = Math.max(1, Math.min(d, m)),
		N = ['ubits-pagination', `ubits-pagination--${i}`, `ubits-pagination--${a}`, s]
			.filter(Boolean)
			.join(' '),
		B = [...Object.entries(k).map(([G, J]) => `${G}="${J}"`)].filter(Boolean).join(' '),
		$ = {
			first: 'Primera',
			last: 'Última',
			previous: 'Anterior',
			next: 'Siguiente',
			page: 'Página',
			of: 'de',
			items: 'items',
			itemsPerPage: 'Por página',
			...E,
		};
	let K = '';
	if (h && u !== void 0) {
		const G = (C - 1) * (l || 10) + 1,
			J = Math.min(C * (l || 10), u);
		K = `
      <div class="ubits-pagination__info">
        <span class="ubits-body-sm">${G}-${J} ${$.of} ${u} ${$.items}</span>
      </div>
    `;
	}
	let V = '';
	if (S) {
		const G = `ubits-pagination-items-per-page-${Date.now()}`,
			J = `ubits-pagination-list-${Date.now()}`,
			D = l || x[0];
		x.map((ue) => ({
			label: String(ue),
			value: String(ue),
			state: 'default',
			selected: ue === D,
		})),
			(V = `
      <div class="ubits-pagination__items-per-page">
        <label class="ubits-body-sm">${$.itemsPerPage}:</label>
        <div class="ubits-pagination__select-wrapper" style="position: relative; display: inline-block;">
          <button 
            type="button" 
            class="ubits-pagination__select-button ubits-body-sm" 
            id="${G}"
            data-list-id="${J}"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            ${D}
            <i class="fas fa-chevron-down" style="margin-left: var(--ubits-spacing-xs); font-size: var(--modifiers-normal-body-xs-regular-fontsize);"></i>
          </button>
          <div id="${J}" class="ubits-pagination__list-container" style="display: none;"></div>
        </div>
      </div>
    `);
	}
	const ee = a === 'sm' ? 'sm' : a === 'lg' ? 'lg' : 'md',
		oe = [];
	if (
		(n &&
			i === 'default' &&
			oe.push(
				Le({
					variant: 'tertiary',
					size: ee,
					icon: 'angle-double-left',
					iconStyle: 'solid',
					iconOnly: !0,
					disabled: C === 1,
					className: 'ubits-pagination__nav-button',
					attributes: {
						'aria-label': $.first,
						title: $.first,
					},
				}),
			),
		e &&
			oe.push(
				Le({
					variant: 'tertiary',
					size: ee,
					icon: 'chevron-left',
					iconStyle: 'solid',
					iconOnly: !0,
					disabled: C === 1,
					className: 'ubits-pagination__nav-button',
					attributes: {
						'aria-label': $.previous,
						title: $.previous,
					},
				}),
			),
		i === 'default')
	) {
		const G = bt(C, m, c);
		G[0] > 1 && oe.push('<span class="ubits-pagination__ellipsis">...</span>'),
			G.forEach((J) => {
				oe.push(pt(J, J === C, a));
			}),
			G[G.length - 1] < m && oe.push('<span class="ubits-pagination__ellipsis">...</span>');
	} else
		i === 'compact' &&
			oe.push(`
      <span class="ubits-pagination__page-info ubits-body-md">
        ${$.page} ${C} ${$.of} ${m}
      </span>
    `);
	return (
		e &&
			oe.push(
				Le({
					variant: 'tertiary',
					size: ee,
					icon: 'chevron-right',
					iconStyle: 'solid',
					iconOnly: !0,
					disabled: C === m,
					className: 'ubits-pagination__nav-button',
					attributes: {
						'aria-label': $.next,
						title: $.next,
					},
				}),
			),
		r &&
			i === 'default' &&
			oe.push(
				Le({
					variant: 'tertiary',
					size: ee,
					icon: 'angle-double-right',
					iconStyle: 'solid',
					iconOnly: !0,
					disabled: C === m,
					className: 'ubits-pagination__nav-button',
					attributes: {
						'aria-label': $.last,
						title: $.last,
					},
				}),
			),
		`
    <div class="${N}" ${B} data-current-page="${C}" data-total-pages="${m}">
      ${K}
      ${V}
      <div class="ubits-pagination__controls">
        ${oe.join('')}
      </div>
    </div>
  `
	);
}
const Ge = {
	sm: '320px',
	md: '480px',
	lg: '640px',
	xl: '800px',
	full: '1280px',
};
function mt(t) {
	const {
			title: d,
			bodyContent: m = '',
			size: u = 'md',
			fullScreen: l = !1,
			footerButtons: i,
			className: a = '',
		} = t,
		c = Ge[u] || Ge.md,
		e = ['ubits-modal', `ubits-modal--size-${u}`, l ? 'ubits-modal--full-screen' : '', a]
			.filter(Boolean)
			.join(' '),
		h = `
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${d}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `,
		x = `
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${typeof m == 'function' ? m() : m || '<div class="ubits-modal__placeholder">Contenido del modal</div>'}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `,
		s = i
			? `
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${
					i.tertiary
						? `
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${i.tertiary.label}</span>
          </button>
        </div>
        `
						: ''
				}
        <div class="ubits-modal__footer-right">
          ${
						i.secondary
							? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${i.secondary.label}</span>
          </button>
          `
							: ''
					}
          ${
						i.primary
							? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${i.primary.label}</span>
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
      <div class="${e}" style="max-width: ${c};">
        ${h}
        ${x}
        ${s}
      </div>
    </div>
  `.trim();
}
function We(t) {
	const { containerId: d, onClose: m, closeOnOverlayClick: u = !0, open: l = !1 } = t;
	let i;
	d ? (i = document.getElementById(d) || document.body) : (i = document.body);
	const a = document.createElement('div');
	a.innerHTML = mt(t);
	const c = a.firstElementChild;
	if (!c) throw new Error('No se pudo crear el modal');
	c.querySelector('.ubits-modal');
	const n = c.querySelector('.ubits-modal__close'),
		r = c,
		e = () => {
			c.classList.add('ubits-modal-overlay--open'), (document.body.style.overflow = 'hidden');
		},
		h = () => {
			c.classList.remove('ubits-modal-overlay--open'),
				(document.body.style.overflow = ''),
				m && m();
		},
		S = (s) => {
			const k = c.querySelector('.ubits-modal__body-content');
			if (k) {
				const E = typeof s == 'function' ? s() : s;
				k.innerHTML = E;
			}
		};
	n &&
		n.addEventListener('click', (s) => {
			s.preventDefault(), s.stopPropagation(), h();
		}),
		u &&
			r &&
			r.addEventListener('click', (s) => {
				s.target === r && h();
			});
	const x = (s) => {
		s.key === 'Escape' && c.classList.contains('ubits-modal-overlay--open') && h();
	};
	if ((document.addEventListener('keydown', x), t.footerButtons)) {
		const s = c.querySelector('.ubits-modal__footer-left .ubits-modal__footer-button'),
			k = c.querySelector('.ubits-modal__footer-right .ubits-button--secondary'),
			E = c.querySelector('.ubits-modal__footer-right .ubits-button--primary');
		s &&
			t.footerButtons.tertiary?.onClick &&
			s.addEventListener('click', (C) => {
				C.preventDefault(), t.footerButtons.tertiary.onClick(C);
			}),
			k &&
				t.footerButtons.secondary?.onClick &&
				k.addEventListener('click', (C) => {
					C.preventDefault(), t.footerButtons.secondary.onClick(C);
				}),
			E &&
				t.footerButtons.primary?.onClick &&
				E.addEventListener('click', (C) => {
					C.preventDefault(), t.footerButtons.primary.onClick(C);
				});
	}
	return (
		i.appendChild(c),
		l && e(),
		{
			element: c,
			open: e,
			close: h,
			updateContent: S,
		}
	);
}
function ze(t) {
	const {
		containerId: d,
		label: m = '',
		placeholder: u = '',
		helperText: l = '',
		size: i = 'md',
		state: a = 'default',
		type: c = 'text',
		showLabel: n = !0,
		showHelper: r = !1,
		showCounter: e = !1,
		maxLength: h = 50,
		mandatory: S = !1,
		mandatoryType: x = 'obligatorio',
		leftIcon: s = '',
		rightIcon: k = '',
		value: E = '',
		className: C = '',
		attributes: N = {},
		showRichTextToolbar: B = !1,
	} = t;
	let $ = '';
	if (n && m) {
		const le = S ? ` <span class="ubits-input-mandatory">(${x})</span>` : '';
		$ += `<label class="ubits-input-label">${m}${le}</label>`;
	}
	const K = s && s.trim() !== '',
		V = k && k.trim() !== '';
	K && s.startsWith('fa-') ? `${s}` : K && `${s}`,
		V && k.startsWith('fa-') ? `${k}` : V && `${k}`,
		($ += '<div style="position: relative; display: inline-block; width: 100%;">');
	let ee = k,
		oe = V,
		G = s,
		J = K;
	const D = ['ubits-input', `ubits-input--${i}`];
	a !== 'default' && D.push(`ubits-input--${a}`), C && D.push(C);
	const ue = a === 'disabled' ? ' disabled' : '',
		pe = e ? ` maxlength="${h}"` : '',
		U = K ? 'padding-left: 40px;' : 'padding-left: 12px;',
		ve = V ? 'padding-right: 40px;' : 'padding-right: 12px;';
	if (c === 'select') {
		const le = t.selectOptions || [],
			q = (E && le.find((X) => X.value === E)?.text) || u;
		($ += `<input type="text" class="${D.join(' ')}" style="width: 100%; ${U} ${ve}" value="${q}" readonly>`),
			V ||
				((ee = 'fa-chevron-down'),
				(oe = !0),
				ve === 'padding-right: 12px;' &&
					($ = $.replace(
						`style="width: 100%; ${U} ${ve}"`,
						`style="width: 100%; ${U} padding-right: 40px;"`,
					)));
	} else if (c === 'textarea')
		if (B) {
			($ += '<div class="ubits-input-rich-text-wrapper">'),
				($ += `
        <div class="ubits-input-rich-text-toolbar" data-container-id="${d}">
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
			let le = `width: 100%; min-height: 80px; resize: vertical; ${U} ${ve}; border: none; border-radius: 0;`;
			a === 'disabled' &&
				(le +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important;');
			const q = `${d}-textarea`;
			($ += `<textarea id="${q}" class="${D.join(' ')}" style="${le}" placeholder="${u}"${ue}${pe}>${E}</textarea>`),
				($ += '</div>');
		} else {
			let le = `width: 100%; min-height: 80px; resize: vertical; ${U} ${ve}`;
			a === 'disabled' &&
				(le +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;');
			const q = `${d}-textarea`;
			$ += `<textarea id="${q}" class="${D.join(' ')}" style="${le}" placeholder="${u}"${ue}${pe}>${E}</textarea>`;
		}
	else if (c === 'search') {
		let le = U,
			q = ve;
		K ||
			((G = 'fa-search'),
			(J = !0),
			(le =
				i === 'xs'
					? 'padding-left: 32px;'
					: i === 'sm'
						? 'padding-left: 36px;'
						: i === 'md'
							? 'padding-left: 40px;'
							: 'padding-left: 44px;')),
			V ||
				((ee = 'fa-times'),
				(oe = !0),
				(q =
					i === 'xs'
						? 'padding-right: 32px;'
						: i === 'sm'
							? 'padding-right: 36px;'
							: i === 'md'
								? 'padding-right: 40px;'
								: 'padding-right: 44px;'));
		let X = `width: 100%; ${le} ${q}`;
		a === 'disabled' &&
			(X +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			($ += `<input type="text" class="${D.join(' ')}" style="${X}" placeholder="${u}" value="${E}" autocomplete="off"${ue}${pe}>`);
	} else if (c === 'autocomplete') {
		let le = U,
			q = ve;
		K ||
			((G = 'fa-search'),
			(J = !0),
			(le =
				i === 'xs'
					? 'padding-left: 32px;'
					: i === 'sm'
						? 'padding-left: 36px;'
						: i === 'md'
							? 'padding-left: 40px;'
							: 'padding-left: 44px;')),
			V ||
				((ee = 'fa-times'),
				(oe = !0),
				(q =
					i === 'xs'
						? 'padding-right: 32px;'
						: i === 'sm'
							? 'padding-right: 36px;'
							: i === 'md'
								? 'padding-right: 40px;'
								: 'padding-right: 44px;'));
		let X = `width: 100%; ${le} ${q}`;
		a === 'disabled' &&
			(X +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			($ += `<input type="text" class="${D.join(' ')}" style="${X}" placeholder="${u}" value="${E}" autocomplete="off"${ue}${pe}>`);
	} else if (c === 'calendar') {
		let le = U,
			q = ve;
		V ||
			((ee = 'fa-calendar'),
			(oe = !0),
			(q =
				i === 'xs'
					? 'padding-right: 32px;'
					: i === 'sm'
						? 'padding-right: 36px;'
						: i === 'md'
							? 'padding-right: 40px;'
							: 'padding-right: 44px;'));
		let X = `width: 100%; ${le} ${q}`;
		a === 'disabled' &&
			(X +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			($ += `<input type="text" class="${D.join(' ')}" style="${X}" placeholder="${u}" value="${E}" readonly${ue}>`);
	} else if (c === 'password') {
		let le = U,
			q = ve;
		V ||
			((ee = 'fa-eye'),
			(oe = !0),
			(q =
				i === 'xs'
					? 'padding-right: 32px;'
					: i === 'sm'
						? 'padding-right: 36px;'
						: i === 'md'
							? 'padding-right: 40px;'
							: 'padding-right: 44px;'));
		let X = `width: 100%; ${le} ${q}`;
		a === 'disabled' &&
			(X +=
				'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
			($ += `<input type="password" class="${D.join(' ')}" style="${X}" placeholder="${u}" value="${E}"${ue}${pe}>`);
	} else
		$ += `<input type="${c}" class="${D.join(' ')}" style="width: 100%; ${U} ${ve}" placeholder="${u}" value="${E}"${ue}${pe}>`;
	if (J) {
		const le = G.startsWith('fa-') ? `far ${G}` : `far fa-${G}`;
		$ += `<i class="${le} ubits-input-icon-left" style="position: absolute; left: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
	}
	if (oe) {
		const le = ee.startsWith('fa-') ? `far ${ee}` : `far fa-${ee}`;
		$ += `<i class="${le} ubits-input-icon-right" style="position: absolute; right: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
	}
	($ += '</div>'),
		(r || e) &&
			(($ += '<div class="ubits-input-helper">'),
			r && l && ($ += `<span>${l}</span>`),
			e && ($ += `<span class="ubits-input-counter">0/${h}</span>`),
			($ += '</div>'));
	const be = Object.entries(N)
		.map(([le, q]) => `${le}="${q}"`)
		.join(' ');
	return be ? `<div ${be}>${$}</div>` : $;
}
function Ze(t) {
	const {
		containerId: d,
		onChange: m,
		onFocus: u,
		onBlur: l,
		showCounter: i = !1,
		maxLength: a = 50,
		type: c = 'text',
		selectOptions: n = [],
		autocompleteOptions: r = [],
		value: e = '',
	} = t;
	if (!d) return console.error('UBITS Input: containerId es requerido'), null;
	const h = document.getElementById(d);
	if (!h) return console.error(`UBITS Input: No se encontró el contenedor con ID "${d}"`), null;
	const S = ze(t);
	h.innerHTML = S;
	const x = h.querySelector('div[style*="position: relative"]'),
		s = h.querySelector('.ubits-input'),
		k = h.querySelector('.ubits-input-counter');
	if (!s || !x) return console.error('UBITS Input: No se pudo crear el elemento input'), null;
	if (
		(getComputedStyle(h).position === 'static' && (h.style.position = 'relative'),
		c === 'select' && vt(h, s, n, e, t.placeholder || '', m, t.size || 'md'),
		c === 'search' && gt(h, s, m),
		c === 'autocomplete' && yt(h, s, r, m, t.size || 'md'),
		c === 'calendar' && xt(h, s, m),
		c === 'password' && ht(h, s),
		c === 'textarea' && t.showRichTextToolbar
			? Et(h, s, t.onChange)
			: c === 'textarea' && !t.showRichTextToolbar && kt(h, s),
		i && k && wt(s, k, a),
		m && typeof m == 'function')
	) {
		const E = c === 'select' ? 'change' : 'input';
		s.addEventListener(E, (C) => {
			m(C.target.value, C);
		});
	}
	return (
		u &&
			typeof u == 'function' &&
			s.addEventListener('focus', (E) => {
				u(E.target.value, E);
			}),
		l &&
			typeof l == 'function' &&
			s.addEventListener('blur', (E) => {
				l(E.target.value, E);
			}),
		{
			element: x,
			inputElement: s,
			getValue: () => s.value,
			setValue: (E) => {
				(s.value = E), i && k && qe(k, E.length, a);
			},
			focus: () => s.focus(),
			blur: () => s.blur(),
			disable: () => {
				(s.disabled = !0), s.classList.add('ubits-input--disabled');
			},
			enable: () => {
				(s.disabled = !1), s.classList.remove('ubits-input--disabled');
			},
			setState: (E) => {
				if (
					([
						'ubits-input--hover',
						'ubits-input--focus',
						'ubits-input--active',
						'ubits-input--invalid',
						'ubits-input--disabled',
					].forEach((N) => s.classList.remove(N)),
					E !== 'default' && s.classList.add(`ubits-input--${E}`),
					E === 'disabled' ? (s.disabled = !0) : (s.disabled = !1),
					c === 'textarea' && t.showRichTextToolbar)
				) {
					const B = s
						.closest('.ubits-input-rich-text-wrapper')
						?.querySelector('.ubits-input-rich-text-toolbar');
					if (B) {
						const $ = window.getComputedStyle(B).borderBottom;
						window.getComputedStyle(B).borderTop,
							$ &&
								$ !== 'none' &&
								$ !== '0px' &&
								(console.warn(
									`[Rich Text] ⚠️ Línea divisoria detectada en setState("${E}"), removiendo...`,
								),
								(B.style.borderBottom = 'none'),
								(B.style.borderTop = 'none'));
					}
				}
			},
		}
	);
}
function ht(t, d) {
	const m = t.querySelector('.ubits-input-icon-right');
	if (m) {
		let u = !1;
		(m.style.pointerEvents = 'auto'), (m.style.cursor = 'pointer');
		const i = !m.className.includes('fa-eye');
		m.addEventListener('click', (a) => {
			a.preventDefault(),
				a.stopPropagation(),
				(u = !u),
				u
					? ((d.type = 'text'), i || (m.className = 'far fa-eye-slash ubits-input-icon-right'))
					: ((d.type = 'password'), i || (m.className = 'far fa-eye ubits-input-icon-right'));
		});
	}
}
function gt(t, d, m) {
	const u = t.querySelector('.ubits-input-icon-right');
	if (u) {
		(u.style.display = d.value.length > 0 ? 'block' : 'none'),
			(u.style.pointerEvents = 'auto'),
			(u.style.cursor = 'pointer');
		const l = () => {
			u.style.display = d.value.length > 0 ? 'block' : 'none';
		};
		d.addEventListener('input', l),
			u.addEventListener('click', (i) => {
				i.preventDefault(), (d.value = ''), d.focus(), l(), m && m('');
			});
	}
}
function yt(t, d, m, u, l = 'md') {
	const i = l === 'xs' ? 'xs' : l === 'sm' ? 'sm' : l === 'md' ? 'md' : 'lg',
		a = t.querySelector('.ubits-input-icon-right');
	if (a) {
		(a.style.display = d.value.length > 0 ? 'block' : 'none'),
			(a.style.pointerEvents = 'auto'),
			(a.style.cursor = 'pointer');
		const r = () => {
			a.style.display = d.value.length > 0 ? 'block' : 'none';
		};
		d.addEventListener('input', r),
			a.addEventListener('click', (e) => {
				e.preventDefault(), (d.value = ''), d.focus(), r();
				const h = t.querySelector('.ubits-autocomplete-list-container');
				h && (h.style.display = 'none'), u && u('');
			});
	}
	const c = document.createElement('div');
	(c.className = 'ubits-autocomplete-list-container'),
		(c.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `),
		t.appendChild(c);
	const n = (r = !1) => {
		const e = d.value.toLowerCase();
		let h;
		if (
			(r || e.length < 1
				? (h = m.slice(0, 8))
				: (h = m.filter((s) => s.text.toLowerCase().includes(e)).slice(0, 8)),
			h.length === 0)
		) {
			c.style.display = 'none';
			return;
		}
		const S = h.map((s) => ({
				label: s.text,
				state: 'default',
				value: s.value,
				selected: !1,
			})),
			x = `ubits-autocomplete-list-${t.id}`;
		(c.id = x), (c.innerHTML = '');
		try {
			De({
				containerId: x,
				items: S,
				size: i,
				maxHeight: '200px',
				onSelectionChange: (s, k) => {
					s &&
						s.value &&
						((d.value = s.label),
						(c.style.display = 'none'),
						a && (a.style.display = 'block'),
						u && u(s.value));
				},
			}),
				e.length > 0 &&
					c.querySelectorAll('.ubits-list-item').forEach((k) => {
						const E = k.textContent || '';
						if (E.toLowerCase().includes(e)) {
							const C = new RegExp(`(${e})`, 'gi'),
								N = E.replace(C, '<strong>$1</strong>');
							k.innerHTML = N;
						}
					});
		} catch (s) {
			console.warn('Using renderList fallback for autocomplete:', s);
			const k = Re({
				items: S,
				size: i,
				maxHeight: '200px',
			});
			(c.innerHTML = k),
				e.length > 0 &&
					c.querySelectorAll('.ubits-list-item').forEach((N) => {
						const B = N.textContent || '';
						if (B.toLowerCase().includes(e)) {
							const $ = new RegExp(`(${e})`, 'gi'),
								K = B.replace($, '<strong>$1</strong>');
							N.innerHTML = K;
						}
					}),
				c.querySelectorAll('.ubits-list-item').forEach((C, N) => {
					const B = S[N];
					B &&
						B.state !== 'disabled' &&
						C.addEventListener('click', () => {
							(d.value = B.label),
								(c.style.display = 'none'),
								a && (a.style.display = 'block'),
								u && u(B.value || '');
						});
				});
		}
		c.style.display = 'block';
	};
	d.addEventListener('focus', () => {
		n(!0);
	}),
		d.addEventListener('input', () => {
			n(!1);
		}),
		d.addEventListener('blur', () => {
			setTimeout(() => (c.style.display = 'none'), 150);
		});
}
function vt(t, d, m, u, l, i, a = 'md') {
	d.style.cursor = 'pointer';
	const c = a === 'xs' ? 'xs' : a === 'sm' ? 'sm' : a === 'md' ? 'md' : 'lg',
		n = document.createElement('div');
	(n.className = 'ubits-select-list-container'),
		(n.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `),
		t.appendChild(n);
	const r = 50;
	let e = 0,
		h = [],
		S = !1;
	const x = (s = 0) => {
		S ||
			((S = !0),
			setTimeout(() => {
				const k = s * r,
					E = Math.min(k + r, m.length),
					N = m.slice(k, E).map(($) => ({
						label: $.text,
						state: u === $.value ? 'active' : 'default',
						value: $.value,
						selected: u === $.value,
					}));
				s === 0 ? (h = N) : (h = [...h, ...N]);
				const B = `ubits-select-list-${t.id}`;
				(n.id = B), (n.innerHTML = '');
				try {
					De({
						containerId: B,
						items: h,
						size: c,
						maxHeight: '200px',
						onSelectionChange: ($, K) => {
							$ && $.value && ((d.value = $.label), (n.style.display = 'none'), i && i($.value));
						},
					});
				} catch ($) {
					console.warn('Using renderList fallback for select:', $);
					const K = Re({
						items: h,
						size: c,
						maxHeight: '200px',
					});
					(n.innerHTML = K),
						n.querySelectorAll('.ubits-list-item').forEach((ee, oe) => {
							const G = h[oe];
							G &&
								G.state !== 'disabled' &&
								ee.addEventListener('click', () => {
									(d.value = G.label), (n.style.display = 'none'), i && i(G.value || '');
								});
						});
				}
				if (E < m.length) {
					const $ = n.querySelector('.ubits-list');
					if ($) {
						const K = new IntersectionObserver(
								(ee) => {
									ee[0].isIntersecting && !S && E < m.length && (e++, x(e));
								},
								{ root: $, rootMargin: '50px' },
							),
							V = n.querySelector('.ubits-list-item:last-child');
						V && K.observe(V);
					}
				}
				S = !1;
			}, 150));
	};
	d.addEventListener('click', () => {
		n.style.display === 'block'
			? (n.style.display = 'none')
			: ((e = 0), (h = []), x(0), (n.style.display = 'block'));
	}),
		document.addEventListener('click', (s) => {
			t.contains(s.target) || (n.style.display = 'none');
		});
}
function xt(t, d, m) {
	let u = null,
		l = null;
	const i = (r) => {
			const e = String(r.getDate()).padStart(2, '0'),
				h = String(r.getMonth() + 1).padStart(2, '0'),
				S = r.getFullYear();
			return `${e}/${h}/${S}`;
		},
		a = (r) => {
			if (!r) return null;
			const [e, h, S] = r.split('/');
			return !e || !h || !S ? null : new Date(parseInt(S), parseInt(h) - 1, parseInt(e));
		},
		c = async () => {
			if (
				(d.type === 'date' && ((d.type = 'text'), d.setAttribute('readonly', 'readonly')),
				l && l.style.display !== 'none')
			) {
				l.style.display = 'none';
				return;
			}
			if (
				(l ||
					((l = document.createElement('div')),
					(l.className = 'ubits-calendar-picker-container'),
					(l.style.cssText =
						'position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px; display: none;'),
					(t.style.position = 'relative'),
					t.appendChild(l)),
				u)
			) {
				l.style.display = 'block';
				return;
			}
			try {
				const r = await import('./index-DrY0IgxX.mjs').then((x) => x.C),
					{ createCalendar: e } = r,
					h = d.value,
					S = a(h) || /* @__PURE__ */ new Date();
				(u = e({
					mode: 'single',
					selectedDate: a(h),
					initialDate: S,
					onDateSelect: (x) => {
						const s = i(x);
						(d.value = s), l && (l.style.display = 'none'), m && m(s);
					},
				})),
					l.appendChild(u.element),
					(l.style.display = 'block');
			} catch (r) {
				console.error('❌ [Calendar Picker] Error cargando Calendar UBITS:', r),
					l &&
						((l.innerHTML =
							'<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>'),
						(l.style.display = 'block'));
			}
		};
	d.addEventListener('click', (r) => {
		r.preventDefault(), r.stopPropagation(), c();
	}),
		d.addEventListener('focus', (r) => {
			r.preventDefault(), r.stopPropagation(), c();
		});
	const n = t.querySelector('.ubits-input-icon-right');
	n &&
		n.addEventListener('click', (r) => {
			r.preventDefault(), r.stopPropagation(), c();
		}),
		document.addEventListener('click', (r) => {
			l && !t.contains(r.target) && (l.style.display = 'none');
		}),
		document.addEventListener('keydown', (r) => {
			r.key === 'Escape' && l && (l.style.display = 'none');
		});
}
function wt(t, d, m) {
	const u = () => {
		qe(d, t.value.length, m),
			t.value.length > m && ((t.value = t.value.substring(0, m)), qe(d, m, m));
	};
	t.addEventListener('input', u), qe(d, t.value.length, m);
}
function qe(t, d, m) {
	(t.textContent = `${d}/${m}`),
		d >= m
			? t.classList.add('ubits-input-counter--limit')
			: t.classList.remove('ubits-input-counter--limit');
}
function Ct(t, d) {
	const m = `ubits-rich-text-image-modal-${Date.now()}`,
		u = `${m}-input`,
		l = {
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
		i = We(l),
		a = i.element;
	a.id = m;
	const c = document.getElementById(`${m}-insert-btn`),
		n = document.getElementById(u);
	if (c && n) {
		const r = () => {
			const h = n.value.trim();
			if (h) {
				const S = document.createElement('img');
				(S.src = h),
					(S.style.maxWidth = '100%'),
					(S.style.height = 'auto'),
					(S.style.display = 'block'),
					(S.style.margin = 'var(--ubits-spacing-sm, 8px) 0');
				const x = window.getSelection();
				x && x.rangeCount > 0 ? x.getRangeAt(0).insertNode(S) : t.appendChild(S), d(), i.close();
			}
		};
		c.addEventListener('click', r),
			n.addEventListener('keydown', (h) => {
				h.key === 'Enter' && (h.preventDefault(), r());
			});
		const e = a.querySelector('.ubits-button--secondary');
		e &&
			e.addEventListener('click', () => {
				i.close();
			});
	}
}
function Lt(t, d) {
	const m = `ubits-rich-text-table-modal-${Date.now()}`,
		u = `${m}-rows`,
		l = `${m}-cols`,
		i = {
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
              id="${l}"
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
				const S = document.getElementById(m)?.closest('.ubits-modal-overlay');
				S && setTimeout(() => S.remove(), 300);
			},
			closeOnOverlayClick: !0,
			open: !0,
		},
		a = We(i),
		c = a.element;
	c.id = m;
	const n = c.querySelector('.ubits-button--primary'),
		r = document.getElementById(u),
		e = document.getElementById(l);
	n &&
		r &&
		e &&
		n.addEventListener('click', () => {
			const S = parseInt(r.value) || 2,
				x = parseInt(e.value) || 2;
			if (S > 0 && x > 0) {
				const s = document.createElement('table');
				(s.style.borderCollapse = 'collapse'),
					(s.style.width = '100%'),
					(s.style.margin = 'var(--ubits-spacing-sm, 8px) 0'),
					(s.style.border = '1px solid var(--ubits-border-1)');
				for (let E = 0; E < S; E++) {
					const C = document.createElement('tr');
					for (let N = 0; N < x; N++) {
						const B = document.createElement('td');
						(B.style.border = '1px solid var(--ubits-border-1)'),
							(B.style.padding = 'var(--ubits-spacing-sm, 8px)'),
							(B.style.minWidth = '50px'),
							(B.textContent = ' '),
							C.appendChild(B);
					}
					s.appendChild(C);
				}
				const k = window.getSelection();
				k && k.rangeCount > 0 ? k.getRangeAt(0).insertNode(s) : t.appendChild(s), d(), a.close();
			}
		});
	const h = c.querySelector('.ubits-button--secondary');
	h &&
		h.addEventListener('click', () => {
			a.close();
		});
}
function _t(t, d) {
	const m = `ubits-rich-text-link-modal-${Date.now()}`,
		u = `${m}-input`,
		l = {
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
		i = We(l),
		a = i.element;
	a.id = m;
	const c = a.querySelector('.ubits-button--primary'),
		n = document.getElementById(u);
	c &&
		n &&
		c.addEventListener('click', () => {
			const e = n.value.trim();
			e && (document.execCommand('createLink', !1, e), d(), i.close());
		});
	const r = a.querySelector('.ubits-button--secondary');
	r &&
		r.addEventListener('click', () => {
			i.close();
		}),
		n &&
			n.addEventListener('keydown', (e) => {
				e.key === 'Enter' && (e.preventDefault(), c && c.click());
			});
}
function Et(t, d, m) {
	const u = t.querySelector('.ubits-input-rich-text-toolbar');
	if (!u) return;
	const l = d.closest('.ubits-input-rich-text-wrapper');
	if (!l) return;
	const i = d.placeholder || '',
		a = document.createElement('div');
	a.className = d.className;
	const c = window.getComputedStyle(d);
	(a.style.cssText = d.style.cssText),
		(a.style.position = 'relative'),
		(a.style.padding = c.padding || '12px 12px'),
		(a.style.margin = '0'),
		(a.style.outline = 'none'),
		(a.style.overflow = 'auto'),
		(a.style.minHeight = c.minHeight || '80px'),
		(a.style.resize = 'vertical'),
		(a.contentEditable = 'true'),
		a.setAttribute('data-placeholder', i);
	let n = t.closest('.ubits-input-wrapper');
	n || (n = t.parentElement?.closest('.ubits-input-wrapper')),
		n || (n = document.getElementById(t.id)?.parentElement?.closest('.ubits-input-wrapper')),
		console.log('[Rich Text Placeholder] ===== DEBUG ALINEAMIENTO ====='),
		console.log('[Rich Text Placeholder] inputWrapper:', n),
		console.log('[Rich Text Placeholder] container:', t),
		console.log('[Rich Text Placeholder] container.parentElement:', t.parentElement),
		console.log('[Rich Text Placeholder] richTextWrapper:', l),
		console.log('[Rich Text Placeholder] richTextWrapper.parentElement:', l?.parentElement);
	let r = null;
	if (
		(n && (r = n.querySelector('.ubits-input-icon-left')),
		!r && t.parentElement && (r = t.parentElement.querySelector('.ubits-input-icon-left')),
		!r && l?.parentElement && (r = l.parentElement.querySelector('.ubits-input-icon-left')),
		!r)
	) {
		const x = document.querySelectorAll('.ubits-input-icon-left');
		for (const s of Array.from(x)) {
			const k = s,
				E = t.getBoundingClientRect(),
				C = k.getBoundingClientRect();
			if (Math.abs(C.top - E.top) < 100) {
				r = k;
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
		const x = r.getBoundingClientRect(),
			s = window.getComputedStyle(r),
			k = s.left,
			E = s.top,
			C = s.transform;
		console.log('[Rich Text Placeholder] Icono encontrado:', r),
			console.log('[Rich Text Placeholder] Icono rect:', x),
			console.log('[Rich Text Placeholder] Icono left (computed):', k),
			console.log('[Rich Text Placeholder] Icono top (computed):', E),
			console.log('[Rich Text Placeholder] Icono transform:', C);
		const N = c.paddingLeft || '12px',
			B = c.paddingTop || '12px',
			$ = c.paddingRight || '12px',
			K = c.paddingBottom || '12px';
		console.log('[Rich Text Placeholder] Textarea padding:', {
			left: N,
			top: B,
			right: $,
			bottom: K,
		});
		const V = a.getBoundingClientRect();
		console.log('[Rich Text Placeholder] EditableDiv rect:', V);
		const ee = x.left - V.left,
			oe = x.top - V.top,
			G = x.bottom - V.top;
		console.log('[Rich Text Placeholder] Icono posición relativa:', {
			left: ee,
			top: oe,
			bottom: G,
		});
		const J = c.lineHeight || '1.5',
			D = c.fontSize || '14px';
		console.log('[Rich Text Placeholder] Texto:', {
			fontSize: D,
			lineHeight: J,
		}),
			a.setAttribute('data-has-left-icon', 'true'),
			a.style.setProperty('--placeholder-left', N),
			a.style.setProperty('--placeholder-top', B),
			console.log('[Rich Text Placeholder] Variables CSS establecidas:', {
				'--placeholder-left': N,
				'--placeholder-top': B,
			}),
			requestAnimationFrame(() => {
				a.querySelector('::before') || window.getComputedStyle(a, '::before');
				const ue = window.getComputedStyle(a, '::before');
				console.log('[Rich Text Placeholder] Después de render:', {
					placeholderLeft: ue.left,
					placeholderTop: ue.top,
					placeholderWidth: ue.width,
					placeholderHeight: ue.height,
				});
			});
	} else {
		const x = c.paddingTop || '12px',
			s = c.paddingLeft || '12px';
		console.log('[Rich Text Placeholder] Sin icono, usando valores por defecto:', {
			paddingTop: x,
			paddingLeft: s,
		}),
			a.style.setProperty('--placeholder-top', x),
			a.style.setProperty('--placeholder-left', s);
	}
	console.log('[Rich Text Placeholder] ===== FIN DEBUG ====='),
		d.value && d.value.trim()
			? (a.innerHTML = d.value)
			: a.classList.add('ubits-rich-text-placeholder'),
		(d.style.display = 'none'),
		d.setAttribute('data-rich-text-editor', 'true'),
		l.insertBefore(a, d),
		e &&
			r &&
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					let x = r;
					if (
						(n && (x = n.querySelector('.ubits-input-icon-left') || r),
						!x &&
							t.parentElement &&
							(x = t.parentElement.querySelector('.ubits-input-icon-left') || r),
						x)
					) {
						const s = x.getBoundingClientRect(),
							k = a.getBoundingClientRect();
						if (
							(console.log('[Rich Text Placeholder] Después de insertar en DOM:'),
							console.log('[Rich Text Placeholder] Icono rect:', s),
							console.log('[Rich Text Placeholder] EditableDiv rect:', k),
							k.width > 0 && k.height > 0)
						) {
							const E = s.top - k.top,
								C = s.bottom - k.top,
								N = s.left - k.left;
							console.log('[Rich Text Placeholder] Posiciones relativas:', {
								iconTop: E,
								iconBottom: C,
								iconLeft: N,
								iconCenterY: E + s.height / 2,
							});
							const B = E + s.height / 2,
								$ = parseFloat(c.fontSize || '16px'),
								K = c.lineHeight;
							let V;
							K === 'normal'
								? (V = $ * 1.2)
								: K.includes('px')
									? (V = parseFloat(K))
									: (V = $ * parseFloat(K));
							const ee = parseFloat(c.paddingTop || '12px'),
								oe = ee + $ * 0.75,
								G = B - oe,
								J = ee + G;
							console.log('[Rich Text Placeholder] Cálculos de alineamiento:', {
								iconCenterY: B,
								fontSize: $,
								lineHeight: V,
								paddingTop: ee,
								textBaselineY: oe,
								offset: G,
								adjustedTop: J,
							});
							const D = Math.max(0, J),
								pe = (a.style.padding || c.padding || '12px 12px').split(' '),
								U = pe[1] || pe[0] || '12px',
								ve = pe[2] || pe[0] || '12px',
								be = pe[3] || pe[1] || pe[0] || '40px';
							(a.style.padding = `${D}px ${U} ${ve} ${be}`),
								a.style.setProperty('--placeholder-top', `${D}px`),
								a.style.setProperty('--placeholder-left', be),
								console.log('[Rich Text Placeholder] Variables CSS finales:', {
									'--placeholder-top': `${D}px`,
									'--placeholder-left': be,
									'editableDiv padding actualizado': `${D}px ${U} ${ve} ${be}`,
								});
						} else
							console.warn('[Rich Text Placeholder] EditableDiv aún no tiene dimensiones válidas');
					}
				});
			});
	const h = (x) => {
		const s = a.innerText || '';
		(d.value = s),
			m && m(s, x),
			s.trim()
				? a.classList.remove('ubits-rich-text-placeholder')
				: a.classList.add('ubits-rich-text-placeholder');
	};
	a.addEventListener('input', h),
		a.addEventListener('blur', h),
		a.addEventListener('focus', () => {
			a.classList.contains('ubits-rich-text-placeholder') &&
				((a.textContent = ''), a.classList.remove('ubits-rich-text-placeholder'));
			const x = l.querySelector('.ubits-input-rich-text-toolbar');
			if (x) {
				const s = window.getComputedStyle(x).borderBottom;
				window.getComputedStyle(x).borderTop,
					s &&
						s !== 'none' &&
						s !== '0px' &&
						(console.warn('[Rich Text] ⚠️ Línea divisoria detectada en focus, removiendo...'),
						(x.style.borderBottom = 'none'),
						(x.style.borderTop = 'none'));
			}
		}),
		l.addEventListener('mouseenter', () => {
			const x = l.querySelector('.ubits-input-rich-text-toolbar');
			if (x) {
				const s = window.getComputedStyle(x).borderBottom;
				s &&
					s !== 'none' &&
					s !== '0px' &&
					(console.warn('[Rich Text] ⚠️ Línea divisoria detectada en hover, removiendo...'),
					(x.style.borderBottom = 'none'),
					(x.style.borderTop = 'none'));
			}
		}),
		u.querySelectorAll('.ubits-rich-text-btn').forEach((x) => {
			x.addEventListener('click', (s) => {
				s.preventDefault(), a.focus();
				const k = x.getAttribute('data-command');
				if (k) {
					if (k === 'insertImage') Ct(a, h);
					else if (k === 'insertTable') Lt(a, h);
					else if (k === 'createLink') _t(a, h);
					else if (k === 'code') {
						const E = window.getSelection();
						if (E && E.rangeCount > 0) {
							const C = E.getRangeAt(0),
								N = document.createElement('code');
							(N.style.background = 'var(--ubits-bg-2)'),
								(N.style.padding = 'var(--ubits-spacing-xs, 2px) var(--ubits-spacing-sm, 4px)'),
								(N.style.borderRadius = 'var(--ubits-border-radius-sm, 4px)'),
								(N.style.fontFamily = 'var(--font-mono, monospace)');
							try {
								C.surroundContents(N);
							} catch {
								(N.textContent = C.toString()), C.deleteContents(), C.insertNode(N);
							}
						}
					} else document.execCommand(k, !1, void 0);
					h();
				}
			});
		});
}
function kt(t, d) {
	let m = t.closest('.ubits-input-wrapper');
	m || (m = t.parentElement?.closest('.ubits-input-wrapper')),
		m || (m = document.getElementById(t.id)?.parentElement?.closest('.ubits-input-wrapper'));
	let u = null;
	if (
		(m && (u = m.querySelector('.ubits-input-icon-left')),
		!u && t.parentElement && (u = t.parentElement.querySelector('.ubits-input-icon-left')),
		!u)
	) {
		const i = document.querySelectorAll('.ubits-input-icon-left');
		for (const a of Array.from(i)) {
			const c = a,
				n = t.getBoundingClientRect(),
				r = c.getBoundingClientRect();
			if (Math.abs(r.top - n.top) < 100) {
				u = c;
				break;
			}
		}
	}
	!(u !== null) ||
		!u ||
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const i = m?.querySelector('.ubits-input-icon-left') || u;
				if (i && d) {
					const a = i.getBoundingClientRect(),
						c = d.getBoundingClientRect();
					if (c.width > 0 && c.height > 0) {
						const n = a.top - c.top;
						a.bottom - c.top, a.left - c.left;
						const r = n + a.height / 2,
							e = window.getComputedStyle(d),
							h = parseFloat(e.fontSize || '16px'),
							S = parseFloat(e.paddingTop || '12px'),
							x = S + h * 0.75,
							s = r - x,
							k = S + s,
							E = Math.max(0, k),
							N = (e.padding || '12px 12px').split(' '),
							B = N[1] || N[0] || '12px',
							$ = N[2] || N[0] || '12px',
							K = N[3] || N[1] || N[0] || '40px';
						d.style.padding = `${E}px ${B} ${$} ${K}`;
					}
				}
			});
		});
}
function St() {
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
function je(t) {
	const {
			active: d = !1,
			size: m = 'md',
			state: u = 'default',
			disabled: l = !1,
			placeholder: i = '',
			value: a = '',
			width: c = 248,
			className: n = '',
		} = t,
		r = l || u === 'disabled',
		e = d || u === 'active',
		S = a && a.trim().length > 0 ? St() : '';
	if (e) {
		const s = [
				'ubits-search-button',
				'ubits-search-button--active',
				`ubits-search-button--${m}`,
				r ? 'ubits-search-button--disabled' : '',
				n,
			]
				.filter(Boolean)
				.join(' '),
			k = c ? `width: ${c}px;` : '',
			E = ze({
				type: 'text',
				size: m,
				placeholder: i,
				value: a,
				showLabel: !1,
				showHelper: !1,
				className: 'ubits-search-button__input',
				state: r ? 'disabled' : 'default',
			});
		let C = E;
		const N = E.match(/^<div[^>]*style="[^"]*position:\s*relative[^"]*"[^>]*>(.*?)<\/div>$/s);
		return (
			N &&
				N[1] &&
				((C = N[1].trim()), (C = C.replace(/padding-left:\s*\d+px;/g, 'padding-left: 0;'))),
			(C = C.replace(
				/(<input[^>]*class="[^"]*ubits-search-button__input[^"]*"[^>]*)(>)/,
				'$1 aria-label="Buscar"$2',
			)),
			`
      <div class="${s}" style="${k}">
        <div class="ubits-search-button__input-wrapper">
          ${C}
          ${S}
        </div>
      </div>
    `.trim()
		);
	}
	const x = [u === 'hover' ? 'ubits-search-button--force-hover' : '', n].filter(Boolean).join(' ');
	return Le({
		variant: 'secondary',
		size: m,
		icon: 'magnifying-glass',
		iconOnly: !0,
		disabled: r,
		className: x,
		attributes: {
			'aria-label': 'Buscar',
		},
	});
}
function Tt(t) {
	const d = t.containerId ? document.getElementById(t.containerId) : document.body;
	if (!d) throw new Error(`Container with id "${t.containerId}" not found`);
	const m = je(t),
		u = document.createElement('div');
	u.innerHTML = m.trim();
	const l = u.firstElementChild;
	if (!l) throw new Error('Failed to create search button element');
	if ((d.appendChild(l), t.active || t.state === 'active')) {
		const n = l.querySelector('.ubits-search-button__input'),
			r = l.querySelector('.ubits-search-button__clear');
		n &&
			(t.onChange &&
				(n.addEventListener('input', t.onChange), n.addEventListener('change', t.onChange)),
			t.onFocus && n.addEventListener('focus', t.onFocus),
			t.onBlur && n.addEventListener('blur', t.onBlur)),
			r &&
				r.addEventListener('click', function (e) {
					if (
						(e.preventDefault(), e.stopPropagation(), n && ((n.value = ''), n.focus(), t.onChange))
					) {
						const h = new Event('input', { bubbles: !0 });
						n.dispatchEvent(h);
					}
				});
	} else {
		const n = l;
		n && t.onClick && n.addEventListener('click', t.onClick);
	}
	return {
		element: l,
		destroy: () => {
			l.parentNode && l.parentNode.removeChild(l);
		},
		update: (n) => {
			const r = { ...t, ...n },
				e = r.active || r.state === 'active',
				h = t.active || t.state === 'active';
			if (e && h) {
				const k = l.querySelector('.ubits-search-button__input');
				if (
					(l.querySelector('.ubits-search-button__clear'),
					k && n.value !== void 0 && n.value !== k.value)
				) {
					const N = k.selectionStart || 0;
					(k.value = n.value || ''), k.setSelectionRange(N, N);
					return;
				}
				if (
					(k && n.placeholder !== void 0 && (k.placeholder = n.placeholder || ''),
					k && n.disabled !== void 0 && (k.disabled = n.disabled || !1),
					!['active', 'state', 'size', 'width', 'className'].some(
						(N) => n[N] !== void 0 && n[N] !== t[N],
					))
				)
					return;
			}
			const S = je(r),
				x = document.createElement('div');
			x.innerHTML = S.trim();
			const s = x.firstElementChild;
			if (s && l.parentNode) {
				let k = !1,
					E = 0;
				if (e && h) {
					const C = l.querySelector('.ubits-search-button__input');
					C && C === document.activeElement && ((k = !0), (E = C.selectionStart || 0));
				}
				if ((l.parentNode.replaceChild(s, l), e)) {
					const C = s.querySelector('.ubits-search-button__input'),
						N = s.querySelector('.ubits-search-button__clear');
					C &&
						(k && (C.focus(), C.setSelectionRange(E, E)),
						r.onChange &&
							(C.addEventListener('input', r.onChange), C.addEventListener('change', r.onChange)),
						r.onFocus && C.addEventListener('focus', r.onFocus),
						r.onBlur && C.addEventListener('blur', r.onBlur)),
						N &&
							N.addEventListener('click', function (B) {
								if (
									(B.preventDefault(),
									B.stopPropagation(),
									C && ((C.value = ''), C.focus(), r.onChange))
								) {
									const $ = new Event('input', { bubbles: !0 });
									C.dispatchEvent($);
								}
							});
				} else {
					const C = s;
					C && r.onClick && C.addEventListener('click', r.onClick);
				}
			}
		},
	};
}
function $t(t) {
	const {
			title: d,
			complementaryText: m,
			width: u = 40,
			bodyContent: l = '',
			footerButtons: i,
			className: a = '',
		} = t,
		n = ['ubits-drawer', `ubits-drawer--width-${u}`, a].filter(Boolean).join(' '),
		r = `
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${d}</p>
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
      ${Le({
				variant: 'secondary',
				size: 'md',
				icon: 'fa-times',
				iconOnly: !0,
				className: 'ubits-drawer__close',
			})}
    </div>
  `,
		h = `
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${typeof l == 'function' ? l() : l || '<div class="ubits-drawer__placeholder">Contenido del drawer</div>'}
      </div>
      <div class="ubits-drawer__scrollbar">
        <div class="ubits-drawer__scrollbar-bar"></div>
      </div>
    </div>
  `,
		S = i
			? `
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        ${
					i.tertiary
						? `
        <div class="ubits-drawer__footer-left">
          ${Le({
						variant: 'tertiary',
						size: 'md',
						text: i.tertiary.label,
						className: 'ubits-drawer__footer-button',
					})}
        </div>
        `
						: ''
				}
        <div class="ubits-drawer__footer-right">
          ${
						i.secondary
							? Le({
									variant: 'secondary',
									size: 'md',
									text: i.secondary.label,
									className: 'ubits-drawer__footer-button',
								})
							: ''
					}
          ${
						i.primary
							? Le({
									variant: 'primary',
									size: 'md',
									text: i.primary.label,
									className: 'ubits-drawer__footer-button',
								})
							: ''
					}
        </div>
      </div>
    </div>
  `
			: '';
	return `
    <div class="ubits-drawer-overlay">
      <div class="${n}">
        ${r}
        ${h}
        ${S}
      </div>
    </div>
  `.trim();
}
function Je(t) {
	const { containerId: d, onClose: m, closeOnOverlayClick: u = !0, open: l = !1 } = t;
	let i;
	d ? (i = document.getElementById(d) || document.body) : (i = document.body);
	const a = document.createElement('div');
	a.innerHTML = $t(t);
	const c = a.firstElementChild;
	if (!c) throw new Error('No se pudo crear el drawer');
	c.querySelector('.ubits-drawer');
	const n = c.querySelector('.ubits-drawer__close'),
		r = c,
		e = () => {
			c.classList.add('ubits-drawer-overlay--open'), (document.body.style.overflow = 'hidden');
		},
		h = () => {
			c.classList.remove('ubits-drawer-overlay--open'),
				(document.body.style.overflow = ''),
				m && m();
		},
		S = (s) => {
			const k = c.querySelector('.ubits-drawer__body-content');
			if (k) {
				const E = typeof s == 'function' ? s() : s;
				k.innerHTML = E;
			}
		};
	n &&
		n.addEventListener('click', (s) => {
			s.preventDefault(), s.stopPropagation(), h();
		}),
		u &&
			r &&
			r.addEventListener('click', (s) => {
				s.target === r && h();
			});
	const x = (s) => {
		s.key === 'Escape' && c.classList.contains('ubits-drawer-overlay--open') && h();
	};
	if ((document.addEventListener('keydown', x), t.footerButtons)) {
		const s = c.querySelector('.ubits-drawer__footer-left .ubits-drawer__footer-button'),
			k = c.querySelector(
				'.ubits-drawer__footer-right .ubits-button--secondary.ubits-drawer__footer-button',
			),
			E = c.querySelector(
				'.ubits-drawer__footer-right .ubits-button--primary.ubits-drawer__footer-button',
			);
		s &&
			t.footerButtons.tertiary?.onClick &&
			s.addEventListener('click', (C) => {
				C.preventDefault(), t.footerButtons.tertiary.onClick(C);
			}),
			k &&
				t.footerButtons.secondary?.onClick &&
				k.addEventListener('click', (C) => {
					C.preventDefault(), t.footerButtons.secondary.onClick(C);
				}),
			E &&
				t.footerButtons.primary?.onClick &&
				E.addEventListener('click', (C) => {
					C.preventDefault(), t.footerButtons.primary.onClick(C);
				});
	}
	return (
		i.appendChild(c),
		l && e(),
		{
			element: c,
			open: e,
			close: h,
			updateContent: S,
		}
	);
}
function At(t) {
	const {
			title: d,
			description: m,
			imageUrl: u,
			icon: l,
			actionLabel: i,
			showPrimaryButton: a = !1,
			primaryButtonIcon: c,
			showPrimaryButtonIcon: n = !1,
			secondaryActionLabel: r,
			showSecondaryButton: e = !1,
			secondaryButtonIcon: h,
			showSecondaryButtonIcon: S = !1,
			className: x = '',
			style: s = '',
		} = t,
		k = ['ubits-empty-state', 'ubits-empty-state--default', x].filter(Boolean).join(' '),
		E = s ? ` style="${s}"` : '';
	let C = '';
	u
		? (C = `
      <div class="ubits-empty-state__image">
        <img src="${u}" alt="${d}" />
      </div>
    `)
		: l &&
			(C = `
      <div class="ubits-empty-state__icon">
        <i class="far fa-${l}"></i>
      </div>
    `);
	let N = '';
	const B =
			a && i
				? Le({
						variant: 'primary',
						size: 'sm',
						text: i,
						icon: n && c ? c : void 0,
						className: '',
						attributes: {
							'data-action': 'primary',
						},
					})
				: '',
		$ =
			e && r
				? Le({
						variant: 'secondary',
						size: 'sm',
						text: r,
						icon: S && h ? h : void 0,
						className: '',
						attributes: {
							'data-action': 'secondary',
						},
					})
				: '';
	return (
		(B || $) &&
			(N = `
      <div class="ubits-empty-state__actions">
        ${$}
        ${B}
      </div>
    `),
		`
    <div class="${k}"${E}>
      ${C}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${d}</h3>
        ${m ? `<p class="ubits-empty-state__description">${m}</p>` : ''}
      </div>
      ${N}
    </div>
  `.trim()
	);
}
function It(t, d, m) {
	const u = d.data[t.id],
		l = d.data;
	switch (m) {
		case 'nombre': {
			const i = u || l.nombre || l.name || '';
			return t.editable
				? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${i}</span>`
				: `<span class="ubits-body-md-regular">${i}</span>`;
		}
		case 'progreso': {
			let i = null;
			if (u != null) {
				if (typeof u == 'number') i = u;
				else if (typeof u == 'string') {
					const c = parseFloat(u.replace('%', '').trim());
					isNaN(c) || (i = c);
				}
			}
			if (i === null && l) {
				const c = l.progress !== void 0 ? l.progress : l.progreso;
				if (c != null) {
					if (typeof c == 'number') i = c;
					else if (typeof c == 'string') {
						const n = parseFloat(c.replace('%', '').trim());
						isNaN(n) || (i = n);
					}
				}
			}
			return (
				i === null && (i = 50),
				(i = Math.max(0, Math.min(100, i))),
				nt({
					value: i,
					size: 'sm',
					variant: 'default',
					indicator: `${Math.round(i)}%`,
				})
			);
		}
		case 'nombre-avatar': {
			const i = u || l.nombre || l.name || '',
				a = l.avatar || l.avatarUrl || null,
				c = t.avatarVariant || 'initials',
				n = (x) =>
					x
						.split(' ')
						.map((s) => s[0])
						.join('')
						.toUpperCase()
						.slice(0, 2) || 'U';
			let r = '';
			if (c === 'photo') {
				let x = null;
				a && typeof a == 'string'
					? (x = a)
					: a && typeof a == 'object' && (x = a.imageUrl || a.url || null),
					!x && l && (x = l.imageUrl || l.avatarUrl || l.avatarImage || null),
					x
						? (r = $e({
								imageUrl: x,
								size: 'sm',
							}))
						: (r = $e({
								imageUrl: '../assets/images/Profile-image.jpg',
								size: 'sm',
							}));
			} else if (c === 'initials')
				if (a && typeof a == 'object' && a.initials)
					r = $e({
						initials: a.initials,
						size: 'sm',
					});
				else {
					const x = n(i);
					r = $e({
						initials: x,
						size: 'sm',
					});
				}
			else {
				const x = a && typeof a == 'object' && a.icon ? a.icon : 'user';
				r = $e({
					icon: x,
					size: 'sm',
				});
			}
			const h = t.editable
				? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${i}</span>`
				: `<span class="ubits-body-md-regular">${i}</span>`;
			return `
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm);">
          ${r}
          ${h}
        </div>
      `;
		}
		case 'nombre-avatar-texto': {
			const i = u || l.nombre || l.name || '',
				a = l.avatar || l.avatarUrl || null,
				c = l.area || l.areaNombre || l.textoComplementario || l.complementario || '',
				n = t.avatarVariant || 'initials',
				r = (S) =>
					S.split(' ')
						.map((x) => x[0])
						.join('')
						.toUpperCase()
						.slice(0, 2) || 'U';
			let e = '';
			if (n === 'photo') {
				let S = null;
				a && typeof a == 'string'
					? (S = a)
					: a && typeof a == 'object' && (S = a.imageUrl || a.url || null),
					!S && l && (S = l.imageUrl || l.avatarUrl || l.avatarImage || null),
					S
						? (e = $e({
								imageUrl: S,
								size: 'sm',
							}))
						: (e = $e({
								imageUrl: '../assets/images/Profile-image.jpg',
								size: 'sm',
							}));
			} else if (n === 'initials')
				if (a && typeof a == 'object' && a.initials)
					e = $e({
						initials: a.initials,
						size: 'sm',
					});
				else {
					const S = r(i);
					e = $e({
						initials: S,
						size: 'sm',
					});
				}
			else {
				const S = a && typeof a == 'object' && a.icon ? a.icon : 'user';
				e = $e({
					icon: S,
					size: 'sm',
				});
			}
			const h = `<span class="ubits-body-md-regular">${i}</span>`;
			return `
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm);">
          ${e}
          <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-xs);">
            ${h}
            ${c ? `<span class="ubits-body-sm-regular" style="color: var(--modifiers-normal-color-light-fg-1-medium);">${c}</span>` : ''}
          </div>
        </div>
      `;
		}
		case 'estado': {
			const i = {
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
				a = u || l.estado || l.status || 'pendiente',
				c = String(a).toLowerCase().trim(),
				n = i[c] || i.pendiente,
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
					}[n] || String(a),
				h = t.editable,
				S = ot({
					label: e,
					status: n,
					size: 'xs',
					rightIcon: h ? 'chevron-down' : null,
					clickable: h,
				});
			return h
				? `
          <div class="ubits-data-table__status-editable" data-row-id="${d.id}" data-column-id="${t.id}" data-editable="true" data-current-status="${n}">
            ${S}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${d.id}-${t.id}" style="display: none;"></div>
          </div>
        `
				: S;
		}
		case 'radio': {
			const i = u === !0 || u === 'true' || u === 1 || u === d.id || u === String(d.id),
				a = t.radioLabel !== !1 && t.radioLabel !== void 0,
				c = typeof t.radioLabel == 'string' ? t.radioLabel : a ? String(d.data[t.id] || d.id) : '',
				n = t.editable === !0,
				r = !n;
			return dt({
				label: c,
				name: `radio-${t.id}`,
				value: String(d.id),
				checked: i,
				size: 'md',
				disabled: r,
			}).replace(
				'<input',
				`<input data-row-id="${d.id}" data-column-id="${t.id}" data-radio-button="true" ${n ? 'data-editable="true"' : ''}`,
			);
		}
		case 'toggle': {
			const i = u === !0 || u === 'true' || u === 1,
				a = t.toggleLabel !== !1 && t.toggleLabel !== void 0,
				c =
					typeof t.toggleLabel == 'string' ? t.toggleLabel : a ? String(d.data[t.id] || d.id) : '';
			return ct({
				label: c,
				checked: i,
				size: 'md',
			}).replace(
				'<input',
				`<input data-row-id="${d.id}" data-column-id="${t.id}" data-toggle-button="true"`,
			);
		}
		case 'checkbox': {
			const i = u === !0 || u === 'true' || u === 1,
				a = t.checkboxLabel !== !1 && t.checkboxLabel !== void 0,
				c =
					typeof t.checkboxLabel == 'string'
						? t.checkboxLabel
						: a
							? String(d.data[t.id] || d.id)
							: '',
				n = t.editable === !0;
			return Pe({
				label: c,
				checked: i,
				size: 'md',
				disabled: !n,
			}).replace(
				'<input',
				`<input data-row-id="${d.id}" data-column-id="${t.id}" data-checkbox-button="true" ${n ? 'data-editable="true"' : ''}`,
			);
		}
		case 'correo': {
			const i = u || '';
			return t.emailClickable !== !1
				? `<a href="mailto:${i}" class="ubits-body-md-regular" style="color: var(--modifiers-normal-color-light-accent-brand); text-decoration: none;">${i}</a>`
				: `<span class="ubits-body-md-regular">${i}</span>`;
		}
		case 'acciones':
			return Le({
				text: 'Eliminar',
				variant: 'error',
				size: 'sm',
				icon: 'trash',
				iconStyle: 'regular',
				className: 'ubits-data-table__action-button',
				attributes: {
					'data-row-id': String(d.id),
					'data-column-id': t.id,
				},
			});
		case 'fecha': {
			const i = u || '';
			return t.editable === !0
				? `
            <div class="ubits-data-table__date-editable" data-row-id="${d.id}" data-column-id="${t.id}">
              <span class="ubits-body-md-regular ubits-data-table__date-display">${i || 'Seleccionar fecha'}</span>
            </div>
          `
				: `<span class="ubits-body-md-regular">${i}</span>`;
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
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${d.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;
		case 'expand': {
			const i = d.expanded || !1;
			return `
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${i ? 'Colapsar' : 'Expandir'} fila"
          data-row-id="${d.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${i ? 'down' : 'right'}" aria-hidden="true"></i>
        </button>
      `;
		}
		default:
			return `<span class="ubits-body-md-regular">${u || ''}</span>`;
	}
}
function Bt(t, d, m = 0) {
	if (t.type !== 'checkbox' && (t.id === 'checkbox' || t.id.startsWith('checkbox-'))) {
		const c = d.data[t.id] || !1,
			r = Pe({
				label: '',
				checked: c,
				size: 'md',
				className: 'ubits-data-table__cell-checkbox',
			}).replace(
				'<input',
				`<input data-row-id="${d.id}" data-column-id="${t.id}" aria-label="Checkbox ${t.title}"`,
			),
			e = t.id === 'checkbox-2' ? '12px' : 'var(--ubits-spacing-md)',
			h = t.pinned ? ' ubits-data-table__cell--pinned' : '',
			S = t.pinned
				? `position: sticky !important; left: ${m}px !important; z-index: 12 !important;`
				: '',
			s = `${`text-align: center; vertical-align: middle; padding-left: ${e} !important;`}${S ? ' ' + S : ''}`;
		return `
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${h}" data-column-id="${t.id}" ${t.pinned ? 'data-pinned="true"' : ''} style="${s}">
        ${r}
      </td>
    `;
	}
	if (t.type) {
		const c = It(t, d, t.type),
			n =
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
			e = n ? 'ubits-data-table__cell--editable' : '',
			h = t.pinned ? ' ubits-data-table__cell--pinned' : '',
			S =
				t.type === 'drag-handle' || t.type === 'expand'
					? 'text-align: center; vertical-align: middle;'
					: '',
			x = t.pinned
				? `position: sticky !important; left: ${m}px !important; z-index: 12 !important;`
				: '',
			s = `${S}${x ? ' ' + x : ''}`,
			k = s ? ` style="${s}"` : '',
			E =
				n &&
				(t.type === 'nombre' ||
					t.type === 'nombre-avatar' ||
					t.type === 'estado' ||
					t.type === 'fecha')
					? `data-row-id="${d.id}" data-column-id="${t.id}" data-editable="true"${t.pinned ? ' data-pinned="true"' : ''}`
					: `data-column-id="${t.id}"${t.pinned ? ' data-pinned="true"' : ''}`;
		return `
      <td class="ubits-data-table__cell ${r} ${e}${h}" ${E}${k}>
        ${c}
      </td>
    `;
	}
	const l = t.renderCell ? t.renderCell(d.data) : d.data[t.id] || '',
		i = t.pinned ? ' ubits-data-table__cell--pinned' : '',
		a = t.pinned
			? ` style="position: sticky !important; left: ${m}px !important; z-index: 12 !important;"`
			: '';
	return `
    <td class="ubits-data-table__cell${i}" data-column-id="${t.id}"${t.pinned ? ' data-pinned="true"' : ''}${a}>
      ${l}
    </td>
  `;
}
function Ht(t, d = !1, m = !0, u = [], l = null, i = null, a = !0, c = 0) {
	if (t.type === 'drag-handle' || t.type === 'expand') {
		const V = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
			ee = t.pinned
				? `position: sticky !important; left: ${c}px !important; z-index: 10 !important;`
				: '',
			oe = t.width ? `width: ${t.width}px;` : '',
			G = [ee, oe].filter(Boolean).join(' '),
			J = G ? `style="${G}"` : '';
		return `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${t.type}${V}" 
        ${J}
        data-column-id="${t.id}"
        ${t.pinned ? 'data-pinned="true"' : ''}
      >
      </th>
    `;
	}
	const n = t.type !== 'checkbox' && (t.id === 'checkbox' || t.id.startsWith('checkbox-'));
	if ((t.type, n)) {
		const V = u.length > 0 && u.every((be) => be.data[t.id] === !0),
			ee = u.some((be) => be.data[t.id] === !0),
			G = Pe({
				label: '',
				checked: V,
				indeterminate: ee && !V,
				size: 'md',
				className: 'ubits-data-table__column-checkbox-header',
			}).replace(
				'<input',
				`<input data-column-checkbox-header="${t.id}" aria-label="Seleccionar todos ${t.title}"`,
			),
			J = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
			D = t.pinned
				? `position: sticky !important; left: ${c}px !important; z-index: 10 !important;`
				: '',
			ue = t.width ? `width: ${t.width}px;` : '',
			pe = [D, ue].filter(Boolean).join(' '),
			U = pe ? `style="${pe}"` : '';
		return `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${J}" 
        ${U}
        data-column-id="${t.id}"
        ${t.pinned ? 'data-pinned="true"' : ''}
      >
        ${G}
      </th>
    `;
	}
	const r = t.type === 'drag-handle' || t.type === 'expand',
		e =
			d && !n && !r
				? `
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${t.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  `
				: '',
		h =
			!n && !r && m
				? (() => {
						const V = l === t.id,
							ee = V ? ' ubits-data-table__column-sort--active' : '';
						let oe = 'arrow-up-a-z',
							G = 'fas fa-sort-alpha-up';
						return (
							V &&
								i &&
								(i === 'asc'
									? ((oe = 'arrow-up-a-z'), (G = 'fas fa-sort-alpha-up'))
									: ((oe = 'arrow-down-a-z'), (G = 'fas fa-sort-alpha-down'))),
							`
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${ee}" 
           data-column-id="${t.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${t.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${oe}"></wa-icon>
        <i class="${G}" aria-hidden="true"></i>
      </div>
    `
						);
					})()
				: '',
		S =
			!n && !r && a
				? Le({
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
		x = `
    <div class="ubits-data-table__column-header-content">
      ${e}
      <span class="ubits-data-table__column-title">${t.title}</span>
      <div class="ubits-data-table__column-actions">
        ${h}
        ${S}
      </div>
    </div>
  `,
		s = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
		k = t.pinned ? `left: ${c}px !important;` : '',
		E = t.width ? `width: ${t.width}px;` : '',
		C = t.pinned ? 'position: sticky !important;' : '',
		N = t.pinned ? 'z-index: 10 !important;' : '',
		B = [C, k, N, E].filter(Boolean).join(' '),
		$ = B ? `style="${B}"` : '';
	return `
    <th 
      class="ubits-data-table__column-header${s}" 
      ${$} 
      data-column-id="${t.id}"
      ${t.pinned ? 'data-pinned="true"' : ''}
    >
      ${x}
    </th>
  `;
}
function Nt(t, d, m, u = []) {
	const l = t.expanded || !1,
		i = d.filter((r) => r.visible !== !1),
		a = i
			.map((r, e) => {
				const h = u[e] || 0;
				return Bt(r, t, h);
			})
			.join('');
	let n = `
    <tr class="${['ubits-data-table__row', l ? 'ubits-data-table__row--expanded' : ''].filter(Boolean).join(' ')}" data-row-id="${t.id}">
      ${a}
    </tr>
  `;
	if (l && t.renderExpandedContent) {
		const r = t.renderExpandedContent(t.data),
			e = i.length;
		n += `
      <tr class="ubits-data-table__row-expanded-row" data-expanded-for="${t.id}">
        <td class="ubits-data-table__row-expanded-content" colspan="${e}">
          ${r}
        </td>
      </tr>
    `;
	} else
		l &&
			!t.renderExpandedContent &&
			console.warn(
				'📋 [ROW RENDER] ⚠️ Fila marcada como expandida pero no tiene renderExpandedContent - rowId:',
				t.id,
			);
	return n;
}
function Dt(t, d = {}) {
	const { header: m, rows: u } = t;
	if (!m) return '';
	const {
			title: l,
			showTitle: i = l !== void 0,
			counter: a,
			displayedItems: c,
			totalItems: n,
			showCounter: r = a !== void 0 && a !== !1,
			primaryButton: e,
			showPrimaryButton: h = e !== void 0,
			secondaryButtons: S = [],
			showSecondaryButtons: x = S !== void 0 && S.length > 0,
			searchButton: s,
			showSearchButton: k = s !== void 0,
			filterButton: E,
			showFilterButton: C = E !== void 0,
			columnSelectorButton: N,
			showColumnSelectorButton: B = N !== void 0,
		} = m,
		$ = m.__isSearchActive || !1,
		K = m.__searchTerm || '';
	let V = '';
	if (r && a) {
		if (typeof a == 'string')
			a === 'total-only' ? (V = `${n !== void 0 ? n : u.length} resultados`) : (V = a);
		else if (a === !0) {
			const be = c !== void 0 ? c : u.length,
				le = n !== void 0 ? n : u.length;
			V = `${be}/${le} resultados`;
		}
	}
	const ee =
			i && l
				? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-body-md-bold ubits-data-table__header-title-text">${l}</span>
      ${V ? `<span class="ubits-data-table__header-counter ubits-body-sm-regular">${V}</span>` : ''}
    </div>
  `
				: V
					? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-data-table__header-counter ubits-body-sm-regular">${V}</span>
    </div>
  `
					: '',
		oe =
			h && e
				? Le({
						variant: 'primary',
						size: 'sm',
						text: e.text || '',
						// Agregar texto si está disponible
						icon: e.icon || 'plus',
						iconStyle: e.iconStyle || 'regular',
						iconOnly: !e.text,
						// iconOnly solo si NO hay texto
						disabled: e.disabled || !1,
						loading: e.loading || !1,
						className: 'ubits-data-table__header-primary-button',
						showTooltip: !e.text,
						// Tooltip solo si es iconOnly
						tooltipText: e.text || 'Nuevo',
					})
				: '',
		G =
			x && S.length > 0
				? S.slice(0, 2)
						.map((be) =>
							Le({
								variant: 'secondary',
								size: 'sm',
								text: be.text || '',
								// Agregar texto si está disponible
								icon: be.icon || 'download',
								iconStyle: be.iconStyle || 'regular',
								iconOnly: !be.text,
								// iconOnly solo si NO hay texto
								disabled: be.disabled || !1,
								loading: be.loading || !1,
								className: 'ubits-data-table__header-secondary-button',
								showTooltip: !be.text,
								// Tooltip solo si es iconOnly
								tooltipText: be.text || '',
							}),
						)
						.join('')
				: '',
		J = Object.keys(d).filter((be) => d[be] && d[be].trim() !== '').length;
	let D =
		C && E
			? Le({
					variant: 'secondary',
					size: 'sm',
					icon: 'filter',
					iconStyle: 'regular',
					iconOnly: !0,
					disabled: E.disabled || !1,
					active: E.active || !1 || J > 0,
					badge: J > 0,
					// Activar badge si hay filtros activos
					className: 'ubits-data-table__header-filter-button',
					showTooltip: !0,
					tooltipText: 'Filtros',
				})
			: '';
	if (D && J > 0) {
		const be = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${J}</span>`;
		D = D.replace('<span class="ubits-button__badge"></span>', be);
	}
	const ue =
			B && N
				? Le({
						variant: 'secondary',
						size: 'sm',
						icon: 'columns-3',
						iconStyle: 'regular',
						iconOnly: !0,
						disabled: N.disabled || !1,
						active: N.active || !1,
						className: 'ubits-data-table__header-column-selector-button',
						showTooltip: !0,
						tooltipText: 'Seleccionar columnas',
					})
				: '',
		pe = K || (s && s.value) || '',
		U =
			k && s
				? je({
						active: $,
						size: 'sm',
						state: $ ? 'active' : 'default',
						disabled: s.disabled || !1,
						placeholder: s.placeholder || 'Buscar...',
						value: pe,
						width: 248,
						className: 'ubits-data-table__header-search-button',
					})
				: '';
	return !(ee || oe || G || U || D || ue)
		? (console.warn('⚠️ [DATA TABLE HEADER] No hay elementos para renderizar, retornando vacío'), '')
		: `
    <div class="ubits-data-table__header">
      ${ee}
      <div class="ubits-data-table__header-actions">
        ${U}
        ${D}
        ${ue}
        ${G}
        ${oe}
      </div>
    </div>
  `.trim();
}
function Oe(t, d = [], m = [], u = {}) {
	const {
			columns: l,
			rows: i,
			className: a = '',
			columnReorderable: c = !1,
			columnSortable: n = !0,
			rowReorderable: r = !1,
			rowExpandable: e = !0,
			showCheckbox: h = !0,
			showVerticalScrollbar: S = !1,
			showHorizontalScrollbar: x = !1,
			showColumnMenu: s = !0,
			showPagination: k = !1,
			currentPage: E = 1,
			itemsPerPage: C = 10,
			paginationVariant: N = 'default',
			paginationSize: B = 'md',
			lazyLoad: $,
			lazyLoadItemsPerBatch: K = 10,
			emptyState: V,
		} = t,
		ee = t.header?.__searchTerm || '',
		oe = k ? !1 : $ !== !1,
		G = /* @__PURE__ */ new Set();
	let D = l.filter((o) => (G.has(o.id) ? !1 : (G.add(o.id), !0))).filter((o) => o.visible !== !1);
	if (((D = D.filter((o) => o.id !== 'checkbox')), d.length > 0)) {
		const o = d.filter((p) => p !== 'checkbox'),
			b = new Map(
				D.map((p) => {
					const g = { ...p };
					return p.pinned !== void 0 && (g.pinned = p.pinned), [p.id, g];
				}),
			);
		D = o
			.map((p) => {
				const g = b.get(p);
				if (g) {
					const A = D.find((O) => O.id === p);
					A && A.pinned !== void 0 && (g.pinned = A.pinned);
				}
				return g;
			})
			.filter((p) => p !== void 0)
			.concat(
				D.filter((p) => !o.includes(p.id)).map((p) => {
					const g = { ...p };
					return p.pinned !== void 0 && (g.pinned = p.pinned), g;
				}),
			);
	} else
		D = D.map((o) => {
			const b = { ...o };
			return o.pinned !== void 0 && (b.pinned = o.pinned), b;
		});
	if (h !== !1) {
		if (!D.some((b) => b.id === 'checkbox-2')) {
			const b = {
				id: 'checkbox-2',
				title: '',
				type: void 0,
				visible: !0,
				width: 48,
			};
			D.unshift(b);
		}
	} else D.map((o) => o.id), (D = D.filter((o) => o.id !== 'checkbox-2')), D.map((o) => o.id);
	if (r) {
		if (!D.some((b) => b.type === 'drag-handle')) {
			const b = {
				id: 'drag-handle',
				title: '',
				type: 'drag-handle',
				visible: !0,
				width: 32,
			};
			D.unshift(b);
		}
	} else D = D.filter((o) => o.type !== 'drag-handle');
	if (e) {
		if (!D.some((b) => b.type === 'expand')) {
			const b = {
					id: 'expand',
					title: '',
					type: 'expand',
					visible: !0,
					width: 32,
				},
				p = D.findIndex((g) => g.type === 'drag-handle');
			p >= 0 ? D.splice(p + 1, 0, b) : D.unshift(b);
		}
	} else D = D.filter((o) => o.type !== 'expand');
	const { checkboxSticky: ue = !1, dragHandleSticky: pe = !1, expandSticky: U = !1 } = t;
	(D = D.map((o) => {
		const b = { ...o };
		return (
			o.id === 'checkbox-2'
				? ue === !0
					? (b.pinned = !0)
					: (b.pinned = !1)
				: o.type === 'drag-handle'
					? pe === !0
						? (b.pinned = !0)
						: (b.pinned = !1)
					: o.type === 'expand' && (U === !0 ? (b.pinned = !0) : (b.pinned = !1)),
			b.pinned && !o.id.startsWith('checkbox') && o.type !== 'drag-handle' && o.type,
			b
		);
	})),
		D.filter((o) => o.pinned);
	const ve = t.sortColumnId || null,
		be = t.sortDirection || null;
	let le = [...i];
	if (m.length > 0) {
		const o = new Map(i.map((b) => [b.id, b]));
		le = m
			.map((b) => o.get(b))
			.filter((b) => b !== void 0)
			.concat(i.filter((b) => !m.includes(b.id)));
	}
	ve &&
		be &&
		(le = [...le].sort((o, b) => {
			const p = o.data[ve],
				g = b.data[ve];
			if (p == null && g == null) return 0;
			if (p == null) return 1;
			if (g == null) return -1;
			const A = String(p).toLowerCase(),
				O = String(g).toLowerCase();
			let M = 0;
			return A < O ? (M = -1) : A > O && (M = 1), be === 'asc' ? M : -M;
		}));
	const q = (o, b, p) => {
			let g = 0;
			const A = {
				columnId: o.id,
				steps: [],
			};
			for (let O = 0; O < b; O++) {
				const M = p[O];
				if (M && M.pinned) {
					let F = M.width;
					F ||
						(M.type === 'drag-handle' || M.type === 'expand'
							? (F = 32)
							: M.id === 'checkbox-2'
								? (F = 48)
								: (F = 150)),
						(g += F),
						A.steps.push({
							step: `columna-${M.id}`,
							added: F,
							total: g,
							reason: `Columna fijada anterior: ${M.id} (tipo: ${M.type || 'normal'})`,
						});
				} else
					M &&
						!M.pinned &&
						A.steps.push({
							step: `columna-${M.id}`,
							added: 0,
							total: g,
							reason: `Columna anterior no fijada: ${M.id}`,
						});
			}
			return (A.finalLeft = g), o.pinned, g;
		},
		X = D.map((o, b) => {
			const p = o.pinned ? q(o, b, D) : 0;
			return o.pinned, Ht(o, c, n, le, ve, be, s, p);
		}).join('');
	let se = le,
		Z = 1,
		me = '';
	const ye = t.__lazyLoadCurrentItems || K;
	if (k) {
		const o = le.length;
		Z = Math.max(1, Math.ceil(o / C));
		const b = Math.max(1, Math.min(E, Z)),
			p = (b - 1) * C,
			g = p + C;
		se = le.slice(p, g);
		try {
			me = ft({
				currentPage: b,
				totalPages: Z,
				totalItems: o,
				itemsPerPage: C,
				variant: N,
				size: B,
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
		} catch (A) {
			console.error('❌ [PAGINATION] ERROR:', A), (me = '');
		}
	} else oe && (se = le.slice(0, ye));
	let Ce = '';
	const _e = i.length === 0,
		Se = se.length === 0,
		Te = Object.keys(u).length > 0,
		ke = ee && ee.trim() !== '';
	if (Se && V) {
		let o;
		_e && V.noData
			? (o = V.noData)
			: ke && V.noSearchResults
				? (o = V.noSearchResults)
				: Te && V.noFilterResults && (o = V.noFilterResults),
			o &&
				(Ce = At({
					title: o.title || 'No hay resultados',
					description: o.description,
					icon: o.icon,
					imageUrl: o.imageUrl,
					actionLabel: o.actionLabel,
					showPrimaryButton: o.showPrimaryButton || !1,
					primaryButtonIcon: o.primaryButtonIcon,
					showPrimaryButtonIcon: o.showPrimaryButtonIcon || !1,
					secondaryActionLabel: o.secondaryActionLabel,
					showSecondaryButton: o.showSecondaryButton || !1,
					secondaryButtonIcon: o.secondaryButtonIcon,
					showSecondaryButtonIcon: o.showSecondaryButtonIcon || !1,
					className: 'ubits-data-table__empty-state',
				}));
	}
	const Me = se
			.map((o, b) => {
				const p = D.map((g, A) => (g.pinned ? q(g, A, D) : 0));
				return Nt(o, D, b, p);
			})
			.join(''),
		xe = Ce || Me,
		Ae = ['ubits-data-table', a].filter(Boolean).join(' '),
		He = D.length,
		ie = `
    <table class="${Ae} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${X}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${Ce ? `<tr><td colspan="${He}" style="padding: 0;">${Ce}</td></tr>` : xe}
      </tbody>
    </table>
  `.trim(),
		L = D.some((o) => o.pinned);
	let v = x;
	L && !x && (v = !0);
	let f = S;
	oe && !k && (f = !0), !k && !oe && !f && 45 + le.length * 45 > 600 && (f = !0);
	let y;
	if (f || v) {
		const o = [];
		f && o.push('ubits-data-table__scrollable-container--vertical'),
			v && o.push('ubits-data-table__scrollable-container--horizontal'),
			(y = `<div class="ubits-data-table__scrollable-container ${o.join(' ')}">${ie}</div>`);
	} else y = ie;
	const _ = Dt(t, u);
	let w;
	return (
		k && me
			? (w = `<div class="ubits-data-table__container">
      ${_}
      ${y}
      <div class="ubits-data-table__pagination-wrapper">${me}</div>
    </div>`)
			: _
				? (w = `<div class="ubits-data-table__container">
        ${_}
        ${y}
      </div>`)
				: (w = y),
		w
	);
}
function Qe(t) {
	const d = t.containerId ? document.getElementById(t.containerId) : document.body;
	if (!d) throw new Error(`Container with id "${t.containerId}" not found`);
	const m = d.querySelector('.ubits-data-table'),
		u = d.querySelector('.ubits-data-table__scrollable-container');
	if (u) {
		const X = u.querySelector('.ubits-data-table');
		if (X) {
			const se = X;
			if (se._dataTableInstance)
				try {
					const Z = se._dataTableInstance;
					Z && typeof Z.destroy == 'function' && Z.destroy();
				} catch (Z) {
					console.warn('Error destroying previous table instance:', Z);
				}
		}
		u.remove();
	} else if (m) {
		const q = m;
		if (q._dataTableInstance)
			try {
				const X = q._dataTableInstance;
				X && typeof X.destroy == 'function' && X.destroy();
			} catch (X) {
				console.warn('Error destroying previous table instance:', X);
			}
		m.remove();
	}
	const l = t.lazyLoad !== !1 && !t.showPagination ? t.lazyLoadItemsPerBatch || 10 : void 0,
		i = {
			...t,
			__lazyLoadCurrentItems: l,
		},
		a = Oe(i),
		c = document.createElement('div');
	c.innerHTML = a.trim();
	const n = c.firstElementChild;
	if (!n) throw new Error('Failed to create data table 3 element');
	d.appendChild(n);
	const r = (q) => {
		const X = /* @__PURE__ */ new Set(),
			se = [];
		for (const Z of q) X.has(Z.id) || (X.add(Z.id), se.push({ ...Z }));
		return se.length, q.length, se;
	};
	let e = {
			...t,
			columns: r(t.columns),
		},
		h = e.columns.filter((q) => q.visible !== !1).map((q) => q.id),
		S = e.rows.map((q) => q.id),
		x = null,
		s = null,
		k = null,
		E = null,
		C = '',
		N = !1,
		B = null,
		$ = {},
		K = null;
	const V = (q, X, se) => {
			if (!X || X.trim() === '') return q;
			const Z = X.toLowerCase().trim(),
				me = se.filter((ye) => ye.visible !== !1);
			return q.filter((ye) =>
				me.some((Ce) => {
					const _e = ye.data[Ce.id];
					return _e == null ? !1 : String(_e).toLowerCase().includes(Z);
				}),
			);
		},
		ee = (q, X, se) => {
			const Z = Object.entries(X).filter(([me, ye]) => ye && ye.trim() !== '');
			return Z.length === 0
				? q
				: q.filter((me) =>
						Z.every(([ye, Ce]) => {
							const _e = se.find((xe) => xe.id === ye);
							if (!_e) {
								const xe = e.header?.filterButton?.filters?.find((v) => v.id === ye);
								if (!xe) return !0;
								const Ae = xe.columnId,
									He = me.data[Ae];
								if (He == null) return !1;
								const ie = String(He).toLowerCase().trim(),
									L = Ce.toLowerCase().trim();
								switch (xe.type) {
									case 'text':
										return ie.includes(L);
									case 'select':
										return ie === L;
									case 'number':
										return ie === L || parseFloat(ie) === parseFloat(L);
									case 'date':
										return ie.includes(L);
									default:
										return ie.includes(L);
								}
							}
							const Se = me.data[_e.id];
							if (Se == null) return !1;
							const Te = String(Se).toLowerCase().trim(),
								ke = Ce.toLowerCase().trim();
							switch (_e.type || 'text') {
								case 'estado':
									return Te === ke;
								case 'fecha':
									return Te.includes(ke);
								case 'progreso':
									const xe = parseFloat(Te),
										Ae = parseFloat(ke);
									return !isNaN(xe) && !isNaN(Ae) && xe === Ae;
								case 'nombre':
								case 'nombre-avatar':
								case 'nombre-avatar-texto':
								case 'correo':
								case 'area':
								case 'lider':
								case 'pais':
								case 'ciudad':
								default:
									return Te.includes(ke);
							}
						}),
					);
		},
		oe = e.showPagination ? !1 : e.lazyLoad !== !1,
		G = e.lazyLoadItemsPerBatch || 10;
	let J = G,
		D = null;
	const ue = () => {
			if (D) {
				const se = n.querySelector('.ubits-data-table__scrollable-container');
				se && se.removeEventListener('scroll', D),
					window.removeEventListener('scroll', D, !0),
					(D = null);
			}
			const q = n.querySelector('.ubits-data-table__scrollable-container'),
				X = () => {
					const se = e.rows.length;
					if (J >= se) return;
					let Z, me, ye;
					if (q) (Z = q.scrollTop), (me = q.scrollHeight), (ye = q.clientHeight);
					else {
						(Z = window.scrollY || document.documentElement.scrollTop),
							(me = document.documentElement.scrollHeight),
							(ye = window.innerHeight);
						const Se = n.getBoundingClientRect().bottom + Z;
						if (Z + ye >= Se - 200) {
							const ke = Math.min(J + G, se);
							ke > J && ((J = ke), e.onLazyLoad && e.onLazyLoad(J, se), U(!0));
						}
						return;
					}
					if ((Z + ye) / me >= 0.8) {
						const _e = Math.min(J + G, se);
						_e > J && ((J = _e), e.onLazyLoad && e.onLazyLoad(J, se), U(!0));
					}
				};
			q
				? ((D = X), q.addEventListener('scroll', D, { passive: !0 }))
				: (console.warn(
						'⚠️ [LAZY LOAD] No se encontró contenedor scrollable, esperando renderizado...',
					),
					setTimeout(() => {
						const se = n.querySelector('.ubits-data-table__scrollable-container');
						se
							? ((D = X),
								se.addEventListener('scroll', D, {
									passive: !0,
								}))
							: console.error(
									'❌ [LAZY LOAD] No se pudo encontrar contenedor scrollable. El lazy load requiere scroll vertical activo.',
								);
					}, 100));
		},
		pe = () => {
			n.querySelectorAll('wa-icon').forEach((X, se) => {
				const Z = X.nextElementSibling,
					me = X.parentElement,
					ye = me && me.classList.contains('ubits-data-table__column-drag-handle');
				Z &&
					Z.tagName === 'I' &&
					(customElements.get('wa-icon')
						? (ye
								? ((X.style.display = 'block'),
									(X.style.width = '14px'),
									(X.style.height = '14px'),
									(X.style.opacity = '1'),
									(X.style.margin = '0'),
									(X.style.padding = '0'),
									(X.style.position = 'absolute'),
									(X.style.top = '50%'),
									(X.style.left = '50%'),
									(X.style.transform = 'translate(-50%, -50%)'),
									window.getComputedStyle(X),
									me && (window.getComputedStyle(me), me.getBoundingClientRect()))
								: ((X.style.display = 'inline-block'),
									(X.style.width = '12px'),
									(X.style.height = '12px'),
									(X.style.opacity = '1')),
							(Z.style.display = 'none'))
						: ((X.style.display = 'none'),
							ye
								? ((Z.style.display = 'block'),
									(Z.style.fontSize = '14px'),
									(Z.style.width = '14px'),
									(Z.style.height = '14px'),
									(Z.style.margin = '0'),
									(Z.style.padding = '0'),
									(Z.style.lineHeight = '1'),
									(Z.style.position = 'absolute'),
									(Z.style.top = '50%'),
									(Z.style.left = '50%'),
									(Z.style.transform = 'translate(-50%, -50%)'),
									(Z.style.boxSizing = 'border-box'),
									(Z.style.textAlign = 'center'),
									(Z.style.verticalAlign = 'middle'),
									window.getComputedStyle(Z),
									Z.getBoundingClientRect(),
									me && (window.getComputedStyle(me), me.getBoundingClientRect()))
								: ((Z.style.display = 'inline-block'),
									(Z.style.fontSize = '12px'),
									(Z.style.width = '12px'),
									(Z.style.height = '12px'))));
			});
		},
		U = (q = !1) => {
			`${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
			let X = 0,
				se = 0,
				Z = 0,
				me = q;
			const ye = n.querySelector('.ubits-data-table__scrollable-container');
			ye &&
				((X = ye.scrollTop),
				(se = ye.scrollHeight),
				(Z = ye.clientHeight),
				se > Z && !q && (me = !0),
				X > 0 && !q && !me && (me = !0));
			let Ce = e.rows;
			Object.keys($).length > 0 && (Ce = ee(Ce, $, e.columns)), C && (Ce = V(Ce, C, e.columns));
			const _e = {
					...e,
					rows: Ce,
					columns: e.columns.map((ie) => {
						const L = { ...ie };
						return ie.pinned !== void 0 && (L.pinned = ie.pinned), L;
					}),
					sortColumnId: k,
					sortDirection: E,
					// Pasar el estado de lazy load
					__lazyLoadCurrentItems: J,
					// Actualizar displayedItems en el header solo si no está explícitamente definido
					// Si ya está definido (por ejemplo, desde el input), mantener ese valor
					header: e.header
						? {
								...e.header,
								// Solo actualizar displayedItems si no está definido explícitamente o si hay búsqueda/filtros activos
								displayedItems:
									e.header.displayedItems !== void 0 && !C && Object.keys($).length === 0
										? e.header.displayedItems
										: Ce.length,
								// Pasar el estado activo del SearchButton y el término de búsqueda a través de las opciones
								__isSearchActive: N,
								__searchTerm: C,
							}
						: void 0,
				},
				Se = /* @__PURE__ */ new Set(),
				Te = _e.columns.filter((ie) => (Se.has(ie.id) ? !1 : (Se.add(ie.id), !0)));
			_e.columns = Te;
			const ke = Oe(_e, h, S, $);
			if (
				(performance.now(),
				(n.innerHTML = ke.trim()),
				performance.now(),
				e.header?.searchButton && e.header?.showSearchButton !== !1)
			) {
				const ie = n.querySelector('.ubits-data-table__header-search-button');
				if (ie) {
					if (B)
						try {
							B.destroy();
						} catch {}
					if (!e.header?.searchButton)
						console.warn(
							'🔍 [DATA TABLE] searchButton no está definido, saltando creación del componente',
						);
					else {
						const L = document.createElement('div');
						(L.style.display = 'none'),
							document.body.appendChild(L),
							(L.id = 'temp-search-button-container-' + Date.now()),
							(B = Tt({
								containerId: L.id,
								active: N,
								size: 'sm',
								state: N ? 'active' : 'default',
								disabled: e.header.searchButton.disabled || !1,
								placeholder: e.header.searchButton.placeholder || 'Buscar...',
								value: C,
								width: 248,
								className: 'ubits-data-table__header-search-button',
								onChange: (f) => {
									const y = f.target.value;
									if (
										((C = y),
										e.header.searchButton.onChange && e.header.searchButton.onChange(y),
										U(),
										e.header.searchButton.onSearch)
									) {
										const _ = V(e.rows, y, e.columns);
										e.header.searchButton.onSearch(y, _);
									}
								},
								onClick: (f) => {
									f.stopPropagation(),
										f.preventDefault(),
										(N = !0),
										e.header.searchButton.onClick && e.header.searchButton.onClick(f),
										U(),
										setTimeout(() => {
											const y = B?.element.querySelector('.ubits-search-button__input');
											y && y.focus();
										}, 150);
								},
								onBlur: (f) => {
									const y = f.target;
									setTimeout(() => {
										if (!y.value.trim() && document.activeElement !== y) {
											const _ = B?.element.querySelector('.ubits-search-button__clear');
											document.activeElement !== _ && ((N = !1), U());
										}
									}, 200);
								},
							}));
						const v = B.element;
						ie.parentNode?.replaceChild(v, ie),
							N && v.style.width && (v.style.width = ''),
							document.body.removeChild(L);
					}
					setTimeout(() => {
						const L = n.querySelector(
								'.ubits-data-table__header-search-button.ubits-search-button--active',
							),
							v = L?.previousElementSibling;
						if (L && v) {
							const f = L.getBoundingClientRect(),
								y = v.getBoundingClientRect(),
								_ = window.getComputedStyle(L),
								w = L.querySelector('.ubits-search-button__input-wrapper'),
								o = w ? window.getComputedStyle(w) : null,
								b = {
									actualGap: f.left - y.right,
									difference: f.left - y.right - 8,
									searchButton: {
										left: f.left,
										width: f.width,
										right: f.right,
										marginLeft: _.marginLeft,
										marginRight: _.marginRight,
										inlineWidth: L.style.width || 'none',
										computedWidth: _.width,
									},
									prevButton: {
										right: y.right,
										width: y.width,
									},
									inputWrapper: {
										width: o?.width || 'N/A',
										computedWidth: o?.width || 'N/A',
									},
								};
							Math.abs(b.actualGap - 8) > 1 && f.width;
						}
					}, 100);
				}
			}
			ve(),
				pe(),
				e.showPagination &&
					setTimeout(() => {
						He();
					}, 100),
				oe && !e.showPagination && ue(),
				(me || (se > 0 && Z > 0 && se > Z)) &&
					requestAnimationFrame(() => {
						const ie = n.querySelector('.ubits-data-table__scrollable-container');
						if (ie) {
							const L = ie.scrollHeight,
								v = ie.clientHeight,
								f = L - v,
								y = se - Z,
								_ = y > 0 ? X / y : 0;
							if (f > 0) {
								const w = _ * f;
								ie.scrollTop = w;
							}
						}
					});
			const xe = n.querySelectorAll('.ubits-data-table__row');
			if (
				(n.querySelector('.ubits-data-table__table'),
				n.querySelector('.ubits-data-table__tbody'),
				n.querySelector('.ubits-data-table__scrollable-container'),
				n.querySelector('.ubits-data-table'),
				xe.length > 0)
			) {
				const ie = xe[0],
					L = xe[1],
					v = xe[xe.length - 1];
				ie.getBoundingClientRect(), L && L.getBoundingClientRect(), v.getBoundingClientRect();
			}
			if (
				(xe.forEach((ie, L) => {
					L === 0 &&
						ie.querySelectorAll('td').forEach((f, y) => {
							const _ = f;
							Array.from(_.classList), window.getComputedStyle(_).backgroundColor;
						});
				}),
				xe.length > 0)
			) {
				const ie = xe[0];
				ie.addEventListener('mouseenter', () => {
					ie.querySelectorAll('td').forEach((v, f) => {
						const y = v;
						Array.from(y.classList), window.getComputedStyle(y).backgroundColor;
					});
				}),
					ie.addEventListener('mouseleave', () => {});
			}
			n.querySelectorAll('input[data-column-checkbox-header]').forEach((ie) => {
				const L = ie,
					v = L.getAttribute('data-column-checkbox-header');
				if (v) {
					const f = e.rows.length > 0 && e.rows.every((w) => w.data[v] === !0),
						_ = e.rows.some((w) => w.data[v] === !0) && !f;
					L.indeterminate = _;
				}
			});
			const He = () => {
				try {
					const ie =
						n.closest('.ubits-data-table__container') ||
						n.querySelector('.ubits-data-table__container');
					if (ie) {
						const L = window.getComputedStyle(ie),
							v =
								ie.querySelector('.ubits-data-table__scrollable-container') ||
								ie.querySelector('.ubits-data-table'),
							y = (v?.querySelector('.ubits-data-table__table') || v)?.querySelector(
								'.ubits-data-table__row:last-child',
							);
						if (v) {
							const w = window.getComputedStyle(v);
							if (y) {
								const o = y.getBoundingClientRect();
							}
						}
						const _ = ie.querySelector('.ubits-data-table__pagination-wrapper');
						if (_) {
							const w = window.getComputedStyle(_),
								o = _.getBoundingClientRect();
							if (y) {
								const b = y.getBoundingClientRect(),
									p = o.top - b.bottom;
							}
						}
					}
				} catch (ie) {
					console.error('📄 [SPACING] ❌ Error verificando espaciado:', ie);
				}
			};
		},
		ve = () => {
			console.log('🔵 [DATA TABLE ATTACH] ========== INICIO attachEventListeners =========='),
				console.log('🔵 [DATA TABLE ATTACH] currentOptions existe:', !!e),
				console.log('🔵 [DATA TABLE ATTACH] currentOptions.onRowSelect existe:', !!e?.onRowSelect),
				console.log('🔵 [DATA TABLE ATTACH] Tipo de onRowSelect:', typeof e?.onRowSelect),
				console.log('🔵 [DATA TABLE ATTACH] currentOptions keys:', Object.keys(e || {})),
				e?.header &&
					(console.log('🔵 [DATA TABLE ATTACH] currentOptions.header existe'),
					console.log(
						'🔵 [DATA TABLE ATTACH] currentOptions.header.searchButton existe:',
						!!e.header.searchButton,
					),
					console.log(
						'🔵 [DATA TABLE ATTACH] currentOptions.header.filterButton existe:',
						!!e.header.filterButton,
					)),
				console.log('🔵 [DATA TABLE ATTACH] ========== FIN VERIFICACIÓN INICIAL =========='),
				typeof window < 'u' && window.location && window.location.href.includes('storybook');
			try {
				e.columnReorderable &&
					(n.hasAttribute('data-column-drag-listener') ||
						(n.setAttribute('data-column-drag-listener', 'true'),
						n.addEventListener(
							'dragstart',
							(L) => {
								const f = L.target.closest('.ubits-data-table__column-drag-handle');
								if (f && ((x = f.getAttribute('data-column-id')), x)) {
									(L.dataTransfer.effectAllowed = 'move'), L.dataTransfer.setData('text/plain', x);
									const y = f.closest('.ubits-data-table__column-header');
									y && y.classList.add('ubits-data-table__column-header--dragging');
								}
							},
							!0,
						),
						n.addEventListener(
							'dragend',
							(L) => {
								const f = L.target.closest('.ubits-data-table__column-drag-handle');
								if (f) {
									const y = f.closest('.ubits-data-table__column-header');
									y && y.classList.remove('ubits-data-table__column-header--dragging');
								}
								x = null;
							},
							!0,
						),
						n.addEventListener(
							'dragover',
							(L) => {
								const f = L.target.closest('.ubits-data-table__column-header');
								if (f && x) {
									const y = f.getAttribute('data-column-id');
									if (y && y !== x) {
										const _ = y === 'checkbox' || y.startsWith('checkbox-'),
											w = x === 'checkbox' || x.startsWith('checkbox-');
										if (_) return;
										if (!w) {
											const o = h.findIndex((b) => b === 'checkbox' || b.startsWith('checkbox-'));
											if (o !== -1 && h.indexOf(y) < o) return;
										}
										L.preventDefault(),
											(L.dataTransfer.dropEffect = 'move'),
											f.classList.add('ubits-data-table__column-header--drag-over');
									}
								}
							},
							!0,
						),
						n.addEventListener(
							'dragleave',
							(L) => {
								const f = L.target.closest('.ubits-data-table__column-header');
								f && f.classList.remove('ubits-data-table__column-header--drag-over');
							},
							!0,
						),
						n.addEventListener(
							'drop',
							(L) => {
								const f = L.target.closest('.ubits-data-table__column-header');
								if (f) {
									L.preventDefault(),
										f.classList.remove('ubits-data-table__column-header--drag-over');
									const y = f.getAttribute('data-column-id');
									if (!y || !x) return;
									const _ = x === 'checkbox' || x.startsWith('checkbox-'),
										w = y === 'checkbox' || y.startsWith('checkbox-');
									if (_ || w) return;
									if (x !== y) {
										const o = h.indexOf(x),
											b = h.indexOf(y),
											p = h.findIndex((g) => g === 'checkbox' || g.startsWith('checkbox-'));
										if (p === -1) {
											o !== -1 &&
												b !== -1 &&
												(h.splice(o, 1),
												h.splice(b, 0, x),
												e.onColumnReorder && e.onColumnReorder([...h]),
												U());
											return;
										}
										if (b < p || (o > p && b < p)) return;
										if (o !== -1 && b !== -1) {
											const g = [...h];
											g.splice(o, 1), g.splice(b, 0, x);
											const A = g.findIndex((O) => O === 'checkbox' || O.startsWith('checkbox-'));
											if (A !== -1 && A < p) return;
											(h = g), e.onColumnReorder && e.onColumnReorder([...h]), U();
										}
									}
								}
							},
							!0,
						))),
					e.rowReorderable &&
						(n.hasAttribute('data-row-drag-listener') ||
							(n.setAttribute('data-row-drag-listener', 'true'),
							n.addEventListener(
								'dragstart',
								(L) => {
									const f = L.target.closest('.ubits-data-table__row-drag-handle');
									if (!f) return;
									const y = f.getAttribute('data-row-id');
									if (y) {
										const _ = isNaN(Number(y)) ? y : Number(y);
										(s = _),
											(L.dataTransfer.effectAllowed = 'move'),
											L.dataTransfer.setData('text/plain', String(_));
										const w = f.closest('.ubits-data-table__row');
										w && w.classList.add('ubits-data-table__row--dragging');
									}
								},
								!0,
							),
							n.addEventListener(
								'dragend',
								(L) => {
									const f = L.target.closest('.ubits-data-table__row-drag-handle');
									if (f) {
										const y = f.closest('.ubits-data-table__row');
										y && y.classList.remove('ubits-data-table__row--dragging');
									}
									s = null;
								},
								!0,
							),
							n.addEventListener(
								'dragover',
								(L) => {
									const f = L.target.closest('.ubits-data-table__row');
									if (f && s !== null) {
										const y = f.getAttribute('data-row-id');
										y &&
											(isNaN(Number(y)) ? y : Number(y)) !== s &&
											(L.preventDefault(),
											(L.dataTransfer.dropEffect = 'move'),
											f.classList.add('ubits-data-table__row--drag-over'));
									}
								},
								!0,
							),
							n.addEventListener(
								'dragleave',
								(L) => {
									const f = L.target.closest('.ubits-data-table__row');
									f && f.classList.remove('ubits-data-table__row--drag-over');
								},
								!0,
							),
							n.addEventListener(
								'drop',
								(L) => {
									const f = L.target.closest('.ubits-data-table__row');
									if (f) {
										L.preventDefault(), f.classList.remove('ubits-data-table__row--drag-over');
										const y = f.getAttribute('data-row-id');
										if (!y || !s) return;
										const _ = isNaN(Number(y)) ? y : Number(y),
											w = L.dataTransfer.getData('text/plain');
										if (w && String(_) !== w) {
											const o = isNaN(Number(w)) ? w : Number(w),
												b = S.indexOf(o),
												p = S.indexOf(_);
											b !== -1 &&
												p !== -1 &&
												(S.splice(b, 1),
												S.splice(p, 0, o),
												e.onRowReorder && e.onRowReorder([...S]),
												U());
										}
									}
								},
								!0,
							)));
				let q = !1;
				if (
					(n.querySelectorAll('input[data-column-checkbox-header]').forEach((L, v) => {
						const f = L,
							y = f.getAttribute('data-column-checkbox-header'),
							_ = f.cloneNode(!0);
						(_.checked = f.checked),
							y && _.setAttribute('data-column-checkbox-header', y),
							Array.from(f.attributes).forEach((b) => {
								(b.name !== 'data-column-checkbox-header' || !_.hasAttribute(b.name)) &&
									_.setAttribute(b.name, b.value);
							}),
							f.parentNode?.replaceChild(_, f);
						const w = (b) => {
							b.stopPropagation(), b.stopImmediatePropagation();
							const p = b.target;
							if (!p.hasAttribute('data-column-checkbox-header')) return;
							const g = p.getAttribute('data-column-checkbox-header'),
								A = p.checked,
								O = n.querySelector('.ubits-data-table__scrollable-container');
							let M = 0,
								F = 0,
								ce = 0;
							if (
								(O && ((M = O.scrollTop), (F = O.scrollHeight), (ce = O.clientHeight)),
								e.rows.forEach((te) => {
									te.data[g] = A;
								}),
								g === 'checkbox-2')
							) {
								const te = n.querySelectorAll(`input[data-column-id="${g}"][data-row-id]`);
								(q = !0),
									te.forEach((W) => {
										const Y = W,
											H = Y.getAttribute('data-row-id');
										if (H) {
											const he = isNaN(Number(H)) ? H : Number(H),
												ae = e.rows.find((we) => we.id === he);
											ae && (ae.data[g] = A), (Y.checked = A);
											const fe = Y.closest('.ubits-checkbox');
											if (fe) {
												const we = fe.querySelector('.ubits-checkbox__square');
												if (A) {
													if (
														(fe.classList.add('ubits-checkbox--checked'),
														fe.classList.remove('ubits-checkbox--indeterminate'),
														we)
													) {
														const Ee = we.querySelector('.ubits-checkbox__indeterminate');
														Ee && Ee.remove();
														let ge = we.querySelector('.ubits-checkbox__checkmark');
														ge ||
															((ge = document.createElement('span')),
															(ge.className = 'ubits-checkbox__checkmark'),
															we.appendChild(ge));
														const Ne = ge.style.transition;
														(ge.style.transition = 'none'),
															ge.style.setProperty('opacity', '1', 'important'),
															ge.style.setProperty('transform', 'scale(1)', 'important'),
															ge.style.setProperty('display', 'flex', 'important'),
															window.getComputedStyle(ge).opacity,
															window.getComputedStyle(ge).transform,
															window.getComputedStyle(ge).display,
															ge.offsetHeight,
															we.offsetHeight,
															fe.offsetHeight,
															setTimeout(() => {
																ge.style.transition = Ne || '';
															}, 0);
													}
												} else if (
													(fe.classList.remove('ubits-checkbox--checked'),
													fe.classList.remove('ubits-checkbox--indeterminate'),
													we)
												) {
													const Ee = we.querySelector('.ubits-checkbox__checkmark');
													Ee && Ee.remove();
													const ge = we.querySelector('.ubits-checkbox__indeterminate');
													ge && ge.remove();
												}
											}
										}
									});
								const j = e.rows.length > 0 && e.rows.every((W) => W.data[g] === !0),
									I = e.rows.some((W) => W.data[g] === !0) && !j,
									P = p;
								(P.checked = j), (P.indeterminate = I);
								const T = P.closest('.ubits-checkbox');
								if (T) {
									const W = T.querySelector('.ubits-checkbox__square');
									if (j) {
										if (
											(T.classList.add('ubits-checkbox--checked'),
											T.classList.remove('ubits-checkbox--indeterminate'),
											W)
										) {
											const Y = W.querySelector('.ubits-checkbox__indeterminate');
											Y && Y.remove(), T.classList.add('ubits-checkbox--checked'), T.offsetHeight;
											let H = W.querySelector('.ubits-checkbox__checkmark');
											H ||
												((H = document.createElement('span')),
												(H.className = 'ubits-checkbox__checkmark'),
												W.appendChild(H));
											const he = H.style.transition;
											(H.style.transition = 'none'),
												H.style.setProperty('opacity', '1', 'important'),
												H.style.setProperty('transform', 'scale(1)', 'important'),
												H.style.setProperty('display', 'flex', 'important'),
												window.getComputedStyle(H).opacity,
												window.getComputedStyle(H).transform,
												window.getComputedStyle(H).display,
												H.offsetHeight,
												W.offsetHeight,
												T.offsetHeight,
												setTimeout(() => {
													H.style.transition = he || '';
												}, 0);
										}
									} else if (I) {
										if (
											(T.classList.remove('ubits-checkbox--checked'),
											T.classList.add('ubits-checkbox--indeterminate'),
											W)
										) {
											const Y = W.querySelector('.ubits-checkbox__checkmark');
											Y && Y.remove();
											let H = W.querySelector('.ubits-checkbox__indeterminate');
											H ||
												((H = document.createElement('span')),
												(H.className = 'ubits-checkbox__indeterminate'),
												W.appendChild(H)),
												H.style.setProperty('opacity', '1', 'important'),
												H.style.setProperty('transform', 'scale(1)', 'important'),
												H.style.setProperty('display', 'flex', 'important');
										}
									} else if (
										(T.classList.remove('ubits-checkbox--checked'),
										T.classList.remove('ubits-checkbox--indeterminate'),
										W)
									) {
										const Y = W.querySelector('.ubits-checkbox__checkmark');
										Y && Y.remove();
										const H = W.querySelector('.ubits-checkbox__indeterminate');
										H && H.remove();
									}
									T.offsetHeight;
								}
								n.offsetHeight, (q = !1);
								const z = e;
								if (z.onSelectAll) {
									const W = n.querySelector('.ubits-data-table__scrollable-container'),
										Y = W?.scrollTop || 0,
										H = W?.scrollHeight || 0,
										he = W?.clientHeight || 0;
									try {
										z.onSelectAll(A);
									} catch (Ie) {
										console.error('☑️ [SELECT ALL] ❌ Error en onSelectAll callback:', Ie);
									}
									const ae = n.querySelector('.ubits-data-table__scrollable-container'),
										fe = ae?.scrollTop || 0,
										we = ae?.scrollHeight || 0,
										Ee = ae?.clientHeight || 0,
										ge = Math.abs(fe - Y) > 1,
										Ne = Math.abs(we - H) > 1 || Math.abs(Ee - he) > 1;
									(ge || Ne) &&
										(console.warn(
											'☑️ [SELECT ALL] ⚠️ El callback onSelectAll parece haber causado cambios:',
											{
												scrollCambió: ge,
												scrollAntes: Y,
												scrollDespues: fe,
												diferenciaScroll: fe - Y,
												dimensionesCambiaron: Ne,
												scrollHeightAntes: H,
												scrollHeightDespues: we,
												clientHeightAntes: he,
												clientHeightDespues: Ee,
											},
										),
										ge &&
											M > 0 &&
											ae &&
											((ae.scrollTop = M),
											setTimeout(() => {
												const Ie = ae.scrollTop;
											}, 50)));
								}
								const R = n.querySelector('.ubits-data-table__scrollable-container'),
									ne = R?.scrollTop || 0,
									de = R?.scrollHeight || 0,
									re = R?.clientHeight || 0;
							} else U();
						};
						_.addEventListener('change', w, { capture: !0 });
						const o = (b) => {
							const p = b.target;
						};
						_.addEventListener('click', o, { capture: !0 });
					}),
					n
						.querySelectorAll('input[data-column-id]:not([data-column-checkbox-header])')
						.forEach((L) => {
							const v = L,
								f = v.getAttribute('data-row-id'),
								y = v.getAttribute('data-column-id'),
								_ = v.cloneNode(!0);
							(_.checked = v.checked), v.parentNode?.replaceChild(_, v);
							const w = (o) => {
								console.log(
									'🔵 [DATA TABLE CHECKBOX HANDLER] ========== CHECKBOX CHANGE EVENT ==========',
								),
									console.log('🔵 [DATA TABLE CHECKBOX HANDLER] Event type:', o.type),
									console.log('🔵 [DATA TABLE CHECKBOX HANDLER] Event target:', o.target);
								const b = o.target;
								if (
									(console.log('🔵 [DATA TABLE CHECKBOX HANDLER] Input element:', b),
									console.log('🔵 [DATA TABLE CHECKBOX HANDLER] Input checked:', b?.checked),
									console.log(
										'🔵 [DATA TABLE CHECKBOX HANDLER] Input data-row-id:',
										b?.getAttribute('data-row-id'),
									),
									console.log(
										'🔵 [DATA TABLE CHECKBOX HANDLER] Input data-column-id:',
										b?.getAttribute('data-column-id'),
									),
									console.log(
										'🔵 [DATA TABLE CHECKBOX HANDLER] Input has data-column-checkbox-header:',
										b?.hasAttribute('data-column-checkbox-header'),
									),
									b.hasAttribute('data-column-checkbox-header'))
								) {
									console.log(
										'🔵 [DATA TABLE CHECKBOX HANDLER] ⚠️ Es checkbox del header, ignorando...',
									),
										o.stopPropagation(),
										o.stopImmediatePropagation();
									return;
								}
								if (q) {
									console.log(
										'🔵 [DATA TABLE CHECKBOX HANDLER] ⚠️ Select all en progreso, ignorando...',
									);
									return;
								}
								const p = b.getAttribute('data-row-id'),
									g = b.getAttribute('data-column-id');
								if (
									(console.log('🔵 [DATA TABLE CHECKBOX HANDLER] currentRowIdStr:', p),
									console.log('🔵 [DATA TABLE CHECKBOX HANDLER] currentColumnId:', g),
									!p || !g)
								) {
									console.warn(
										'⚠️ [DATA TABLE CHECKBOX HANDLER] No tiene data-row-id o data-column-id, ignorando...',
									);
									return;
								}
								const A = isNaN(Number(p)) ? p : Number(p),
									O = b.checked;
								console.log('🔵 [DATA TABLE CHECKBOX HANDLER] rowId procesado:', A),
									console.log('🔵 [DATA TABLE CHECKBOX HANDLER] isChecked:', O);
								const M = e.rows.find((F) => F.id === A);
								if (M)
									if (((M.data[g] = O), g === 'checkbox-2')) {
										let F = b.closest('.ubits-checkbox');
										if (F) {
											const j = F.querySelector(`input[data-row-id="${A}"][data-column-id="${g}"]`);
											if (!j || j !== b) {
												const Q = n.querySelector(
													`input[data-row-id="${A}"][data-column-id="${g}"]`,
												);
												Q && (F = Q.closest('.ubits-checkbox'));
											}
										}
										if (F) {
											const j = F.querySelector('.ubits-checkbox__square');
											if (O) {
												if (
													(F.classList.add('ubits-checkbox--checked'),
													F.classList.remove('ubits-checkbox--indeterminate'),
													j)
												) {
													const Q = j.querySelector('.ubits-checkbox__indeterminate');
													Q && Q.remove(),
														F.classList.add('ubits-checkbox--checked'),
														F.classList.remove('ubits-checkbox--indeterminate'),
														F.offsetHeight;
													let I = j.querySelector('.ubits-checkbox__checkmark');
													I ||
														((I = document.createElement('span')),
														(I.className = 'ubits-checkbox__checkmark'),
														j.appendChild(I));
													const P = I.style.transition;
													(I.style.transition = 'none'),
														I.style.setProperty('opacity', '1', 'important'),
														I.style.setProperty('transform', 'scale(1)', 'important'),
														I.style.setProperty('display', 'flex', 'important'),
														window.getComputedStyle(I).opacity,
														window.getComputedStyle(I).transform,
														window.getComputedStyle(I).display,
														I.offsetHeight,
														j.offsetHeight,
														F.offsetHeight,
														setTimeout(() => {
															I.style.transition = P || '';
														}, 0),
														requestAnimationFrame(() => {
															const T = j.querySelector('.ubits-checkbox__checkmark');
															if (T) {
																const z = window.getComputedStyle(T),
																	R = window.getComputedStyle(T, '::after');
																(z.opacity === '0' || z.transform.includes('scale(0)')) &&
																	(T.style.setProperty('opacity', '1', 'important'),
																	T.style.setProperty('transform', 'scale(1)', 'important'),
																	T.style.setProperty('display', 'flex', 'important'),
																	T.offsetHeight);
															}
														});
												}
											} else if (
												(F.classList.remove('ubits-checkbox--checked'),
												F.classList.remove('ubits-checkbox--indeterminate'),
												j)
											) {
												const Q = j.querySelector('.ubits-checkbox__checkmark');
												Q && Q.remove();
												const I = j.querySelector('.ubits-checkbox__indeterminate');
												I && I.remove();
											}
										} else {
											const j = n.querySelectorAll(
												`input[data-row-id="${A}"][data-column-id="${y}"]`,
											);
											if (j.length > 0) {
												const I = (Array.from(j).find((P) => P === b) || j[0])?.closest(
													'.ubits-checkbox',
												);
												if (I) {
													const P = I.querySelector('.ubits-checkbox__square');
													if (O) {
														if (
															(I.classList.add('ubits-checkbox--checked'),
															I.classList.remove('ubits-checkbox--indeterminate'),
															P)
														) {
															const T = P.querySelector('.ubits-checkbox__indeterminate');
															T && T.remove();
															let z = P.querySelector('.ubits-checkbox__checkmark');
															z ||
																((z = document.createElement('span')),
																(z.className = 'ubits-checkbox__checkmark'),
																P.appendChild(z));
														}
													} else if (
														(I.classList.remove('ubits-checkbox--checked'),
														I.classList.remove('ubits-checkbox--indeterminate'),
														P)
													) {
														const T = P.querySelector('.ubits-checkbox__checkmark');
														T && T.remove();
													}
												}
											}
										}
										const ce = n.querySelector(`input[data-column-checkbox-header="${y}"]`);
										if (ce) {
											const j = e.rows.length > 0 && e.rows.every((T) => T.data[y] === !0),
												I = e.rows.some((T) => T.data[y] === !0) && !j;
											(ce.checked = j), (ce.indeterminate = I);
											const P = ce.closest('.ubits-checkbox');
											if (P) {
												const T = P.querySelector('.ubits-checkbox__square');
												if (j) {
													if (
														(P.classList.add('ubits-checkbox--checked'),
														P.classList.remove('ubits-checkbox--indeterminate'),
														T)
													) {
														const z = T.querySelector('.ubits-checkbox__indeterminate');
														z && z.remove();
														let R = T.querySelector('.ubits-checkbox__checkmark');
														R ||
															((R = document.createElement('span')),
															(R.className = 'ubits-checkbox__checkmark'),
															T.appendChild(R));
													}
												} else if (I) {
													if (
														(P.classList.remove('ubits-checkbox--checked'),
														P.classList.add('ubits-checkbox--indeterminate'),
														T)
													) {
														const z = T.querySelector('.ubits-checkbox__checkmark');
														z && z.remove();
														let R = T.querySelector('.ubits-checkbox__indeterminate');
														R ||
															((R = document.createElement('span')),
															(R.className = 'ubits-checkbox__indeterminate'),
															T.appendChild(R));
													}
												} else if (
													(P.classList.remove('ubits-checkbox--checked'),
													P.classList.remove('ubits-checkbox--indeterminate'),
													T)
												) {
													const z = T.querySelector('.ubits-checkbox__checkmark');
													z && z.remove();
													const R = T.querySelector('.ubits-checkbox__indeterminate');
													R && R.remove();
												}
											}
										}
										const te = _.closest('.ubits-data-table__row');
										if (te) {
											const j = Array.from(te.classList),
												I = window.getComputedStyle(te).backgroundColor,
												P = te.querySelectorAll('.ubits-data-table__cell'),
												T = te.style.pointerEvents;
											(te.style.pointerEvents = 'none'), te.offsetHeight;
											const R =
													(document.body.getAttribute('data-theme') ||
														document.documentElement.getAttribute('data-theme') ||
														'light') === 'dark'
														? '--modifiers-normal-color-dark-bg-1'
														: '--modifiers-normal-color-light-bg-1',
												ne = getComputedStyle(document.documentElement).getPropertyValue(R).trim();
											te.classList.add('ubits-data-table__row--clear-hover'),
												te.style.setProperty('background-color', ne, 'important'),
												P.forEach((Y, H) => {
													Y.style.setProperty('background-color', ne, 'important');
												}),
												te.offsetHeight,
												(te.style.pointerEvents = T || '');
											const re = window.getComputedStyle(te).backgroundColor,
												W = Array.from(te.classList);
											P.forEach((Y, H) => {
												const ae = window.getComputedStyle(Y).backgroundColor;
											}),
												requestAnimationFrame(() => {
													setTimeout(() => {
														const Y = window.getComputedStyle(te).backgroundColor;
														te.classList.remove('ubits-data-table__row--clear-hover'),
															te.style.removeProperty('background-color'),
															P.forEach((he) => {
																he.style.removeProperty('background-color');
															});
														const H = window.getComputedStyle(te).backgroundColor;
													}, 150);
												});
										}
										if (
											(console.log(
												'🔵 [DATA TABLE CHECKBOX] ========== VERIFICACIÓN ANTES DE LLAMAR CALLBACK ==========',
											),
											console.log('🔵 [DATA TABLE CHECKBOX] rowId:', A),
											console.log('🔵 [DATA TABLE CHECKBOX] isChecked:', O),
											console.log('🔵 [DATA TABLE CHECKBOX] currentOptions existe:', !!e),
											console.log(
												'🔵 [DATA TABLE CHECKBOX] currentOptions.onRowSelect existe:',
												!!e?.onRowSelect,
											),
											console.log(
												'🔵 [DATA TABLE CHECKBOX] Tipo de onRowSelect:',
												typeof e?.onRowSelect,
											),
											e.onRowSelect)
										) {
											console.log(
												'🔵 [DATA TABLE] ✅ Llamando onRowSelect con rowId:',
												A,
												'isChecked:',
												O,
											);
											try {
												e.onRowSelect(A, O),
													console.log('🔵 [DATA TABLE] ✅ onRowSelect ejecutado correctamente');
											} catch (j) {
												console.error('❌ [DATA TABLE] Error al ejecutar onRowSelect:', j);
											}
										} else
											console.warn('⚠️ [DATA TABLE] onRowSelect no está definido en currentOptions'),
												console.warn('⚠️ [DATA TABLE] currentOptions keys:', Object.keys(e || {}));
										console.log('🔵 [DATA TABLE CHECKBOX] ========== FIN VERIFICACIÓN ==========');
									} else U();
							};
							_.addEventListener('change', w, { capture: !1 });
						}),
					n.querySelectorAll('[data-expand-button="true"]').forEach((L, v) => {
						const f = L.cloneNode(!0);
						L.parentNode?.replaceChild(f, L),
							f.addEventListener('click', (y) => {
								y.preventDefault(), y.stopPropagation();
								const _ = f.getAttribute('data-row-id'),
									w = isNaN(Number(_)) ? _ : Number(_),
									o = e.rows.find((b) => b.id === w);
								if (o) {
									const b = o.expanded || !1;
									(o.expanded = !b),
										e.onRowExpand && e.onRowExpand(w, o.expanded),
										U(),
										o.expanded &&
											requestAnimationFrame(() => {
												const p = n.querySelector(`[data-row-id="${w}"]`);
												if (p) {
													const g = p.nextElementSibling;
													if (g && g.classList.contains('ubits-data-table__row-expanded-row')) {
														const A = n.querySelector(
															'.ubits-data-table__scrollable-container--vertical',
														);
														if (A) {
															const O = p.offsetTop;
															A.scrollTop = O - 50;
														} else p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
													}
												}
											});
								} else console.warn('🔘 [EXPAND] ⚠️ Fila no encontrada para rowId:', w);
							});
					}),
					n.querySelectorAll('[data-sort-button="true"]').forEach((L) => {
						L.addEventListener('click', (v) => {
							v.preventDefault(), v.stopPropagation();
							const f = L.getAttribute('data-column-id');
							k === f ? (E = E === 'asc' ? 'desc' : 'asc') : ((k = f), (E = 'asc')),
								e.onSort
									? (console.log(
											'🔵 [DATA TABLE] Llamando onSort con columnId:',
											f,
											'direction:',
											E,
										),
										e.onSort(f, E))
									: console.warn('⚠️ [DATA TABLE] onSort no está definido'),
								U();
						});
					}),
					n.querySelectorAll('[data-menu-button="true"]').forEach((L) => {
						const v = L,
							f = v.getAttribute('data-column-id');
						if (!f || !e.columns.find((F) => F.id === f)) return;
						const _ = v.closest('th');
						if (!_) {
							console.warn('⚠️ [MENU BUTTON] No se encontró el header cell');
							return;
						}
						const w = _.hasAttribute('data-pinned') && _.getAttribute('data-pinned') === 'true',
							o = _.classList.contains('ubits-data-table__column-header--pinned'),
							b = typeof window < 'u' && !window.location?.href?.includes('storybook');
						let p,
							g = null;
						if (w || o) {
							const ce =
								n
									.querySelector('.ubits-data-table')
									?.closest('.ubits-data-table__scrollable-container') || n;
							(p = ce.querySelector(
								`.ubits-data-table__column-menu-dropdown[data-column-id="${f}"]`,
							)),
								p ||
									((p = document.createElement('div')),
									(p.className = 'ubits-data-table__column-menu-dropdown'),
									p.setAttribute('data-column-id', f),
									(p.style.cssText = `
            position: fixed;
            z-index: 10000 !important;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `),
									ce.appendChild(p));
						} else
							(p = _.querySelector('.ubits-data-table__column-menu-dropdown')),
								p ||
									((p = document.createElement('div')),
									(p.className = 'ubits-data-table__column-menu-dropdown'),
									p.setAttribute('data-column-id', f),
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
									(_.style.position = 'relative'),
									_.appendChild(p));
						let A = !1;
						const O = () => {
							p && (p.style.display = 'none'),
								(A = !1),
								M && (document.removeEventListener('click', M), (M = null)),
								(w || o) && p.parentElement && p.parentElement !== _ && p.remove();
						};
						let M = null;
						v.addEventListener('click', (F) => {
							const ce =
								typeof window < 'u' &&
								window.location &&
								!window.location.href.includes('storybook');
							F.preventDefault(), F.stopPropagation();
							const te = e.columns.find((de) => de.id === f);
							if (!te) {
								console.error('❌ [COLUMN MENU] Columna no encontrada:', f);
								return;
							}
							const j = te.pinned || !1;
							if (A) {
								O();
								return;
							}
							n.querySelectorAll('.ubits-data-table__column-menu-dropdown').forEach((de) => {
								de !== p && (de.style.display = 'none');
							});
							const Q = [
								{
									label: j ? 'Desfijar columna' : 'Fijar columna',
									value: 'pin',
									state: 'default',
								},
							];
							p.innerHTML = '';
							const I = `column-menu-list-${f}-${Math.random().toString(36).substr(2, 9)}`;
							p.id = I;
							try {
								const de = De({
									containerId: I,
									items: Q,
									size: 'sm',
									maxHeight: '200px',
									onSelectionChange: (re, W) => {
										if (re && re.value === 'pin') {
											const Y = e.columns.find((H) => H.id === f);
											if (Y) {
												const H = Y.pinned || !1;
												(Y.pinned = !H),
													e.onColumnPin
														? (console.log(
																'🔵 [DATA TABLE] Llamando onColumnPin con columnId:',
																f,
																'pinned:',
																Y.pinned,
															),
															e.onColumnPin(f, Y.pinned))
														: console.warn('⚠️ [DATA TABLE] onColumnPin no está definido'),
													U();
											} else
												console.error(
													'❌ [COLUMN MENU] Columna no encontrada al intentar fijar:',
													f,
												);
										}
										O();
									},
								});
							} catch (de) {
								console.error('❌ [COLUMN MENU] Error al crear lista con createList:', de);
								const re = Re({
									items: Q,
									size: 'sm',
									maxHeight: '200px',
								});
								(p.innerHTML = re),
									p.querySelectorAll('.ubits-list-item').forEach((Y) => {
										Y.addEventListener('click', () => {
											const H = e.columns.find((he) => he.id === f);
											if (H) {
												const he = H.pinned || !1;
												(H.pinned = !he), e.onColumnPin && e.onColumnPin(f, H.pinned), U();
											}
											O();
										});
									});
							}
							const P = _.hasAttribute('data-pinned') && _.getAttribute('data-pinned') === 'true',
								T = _.classList.contains('ubits-data-table__column-header--pinned'),
								z = P || T ? 1e4 : 1e3,
								R = v.getBoundingClientRect(),
								ne = _.getBoundingClientRect();
							if (P || T) {
								p.style.setProperty('position', 'fixed', 'important'),
									p.style.setProperty('top', `${R.bottom + 4}px`, 'important');
								const de = R.right - 160;
								p.style.setProperty('left', `${de}px`, 'important'),
									p.style.setProperty('right', 'auto', 'important'),
									p.style.setProperty('z-index', `${z}`, 'important'),
									p.style.setProperty('display', 'block', 'important');
							} else
								(p.style.position = 'absolute'),
									(p.style.top = '100%'),
									(p.style.right = '0'),
									(p.style.left = 'auto'),
									(p.style.zIndex = `${z}`),
									p.style.setProperty('z-index', `${z}`, 'important'),
									(p.style.display = 'block');
							(A = !0),
								(M = (de) => {
									!p.contains(de.target) && !v.contains(de.target) && O();
								}),
								setTimeout(() => {
									document.addEventListener('click', M);
								}, 0);
						});
					}),
					n.querySelectorAll('.ubits-data-table__action-button').forEach((L) => {
						const v = L,
							f = v.getAttribute('data-row-id'),
							y = v.getAttribute('data-column-id');
						if (!f) {
							console.warn('⚠️ [ACTION BUTTONS] No se encontró el data-row-id en el botón');
							return;
						}
						const _ = isNaN(Number(f)) ? f : Number(f),
							w = v.cloneNode(!0);
						v.parentNode?.replaceChild(w, v),
							w.addEventListener('click', (o) => {
								o.preventDefault(), o.stopPropagation();
								const b = e.rows.find((p) => p.id === _);
								b
									? e.onRowAction
										? e.onRowAction(_, b)
										: alert(`Acción ejecutada para fila: ${_}`)
									: console.warn('⚠️ [ACTION BUTTONS] Fila no encontrada para rowId:', _);
							});
					}),
					e.showContextMenu !== !1)
				) {
					const L = n.querySelectorAll('tr.ubits-data-table__row[data-row-id]');
					if (L.length === 0) {
						console.warn(
							'🖱️ [CONTEXT MENU] ⚠️ No se encontraron filas con selector: tr.ubits-data-table__row[data-row-id]',
						);
						const w = n.querySelectorAll('[data-row-id]');
						if (w.length > 0) {
							w.forEach((o, b) => {
								const p = o,
									g = p.getAttribute('data-row-id');
								if (!g) {
									console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:', b);
									return;
								}
								const A = isNaN(Number(g)) ? g : Number(g),
									O =
										document.getElementById('ubits-data-table-context-menu') ||
										(() => {
											const M = document.createElement('div');
											return (
												(M.id = 'ubits-data-table-context-menu'),
												(M.style.cssText = `
                position: fixed;
                z-index: 10000;
                display: none;
                background-color: var(--modifiers-normal-color-light-bg-1);
                border: 1px solid var(--modifiers-normal-color-light-border-1);
                border-radius: var(--ubits-border-radius-md);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                min-width: 200px;
                max-width: 300px;
              `),
												document.body.appendChild(M),
												M
											);
										})();
								p.addEventListener('contextmenu', (M) => {
									M.preventDefault(),
										M.stopPropagation(),
										alert(
											`Click derecho en fila ${A} - Menú contextual (implementación completa pendiente)`,
										);
								});
							});
							return;
						}
					}
					let v = document.getElementById('ubits-data-table-context-menu');
					v ||
						((v = document.createElement('div')),
						(v.id = 'ubits-data-table-context-menu'),
						(v.style.cssText = `
          position: fixed;
          z-index: 10000;
          display: none;
          background-color: var(--modifiers-normal-color-light-bg-1);
          border: 1px solid var(--modifiers-normal-color-light-border-1);
          border-radius: var(--ubits-border-radius-md, 8px);
          box-shadow: var(--ubits-elevation-2, 0 4px 6px rgba(0, 0, 0, 0.1));
          min-width: 200px;
          max-width: 300px;
        `),
						document.body.appendChild(v));
					let f = null,
						y = null;
					const _ = () => {
						v && ((v.style.display = 'none'), (v.innerHTML = '')),
							(f = null),
							y &&
								(document.removeEventListener('click', y),
								document.removeEventListener('contextmenu', y),
								(y = null));
					};
					L.forEach((w, o) => {
						const b = w,
							p = b.getAttribute('data-row-id');
						if (!p) {
							console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:', o);
							return;
						}
						const g = isNaN(Number(p)) ? p : Number(p);
						b.addEventListener('contextmenu', (A) => {
							if ((A.preventDefault(), A.stopPropagation(), !e.rows.find((j) => j.id === g))) {
								console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila no encontrada en currentOptions.rows:', g);
								return;
							}
							(f = g), _();
							const M = (
									j,
									Q,
								) => `<div style="display: flex; align-items: center; gap: var(--ubits-spacing-xs);">
            <i class="far fa-${j}" style="font-size: 14px; width: 16px; text-align: center;"></i>
            <span>${Q}</span>
          </div>`,
								F = [
									{
										label: M('eye', 'Ver seleccionados'),
										value: 'view-selected',
										state: 'default',
										onClick: () => {
											_();
										},
									},
									{
										label: M('bell', 'Notificaciones'),
										value: 'notifications',
										state: 'default',
										onClick: () => {
											_(), alert(`Notificaciones para fila: ${g}`);
										},
									},
									{
										label: M('copy', 'Copiar'),
										value: 'copy',
										state: 'default',
										onClick: () => {
											_(), alert(`Copiar para fila: ${g}`);
										},
									},
									{
										label: M('eye', 'Ver'),
										value: 'view',
										state: 'default',
										onClick: () => {
											_(), alert(`Ver para fila: ${g}`);
										},
									},
									{
										label: M('edit', 'Editar'),
										value: 'edit',
										state: 'default',
										onClick: () => {
											_(), alert(`Editar para fila: ${g}`);
										},
									},
									{
										label: M('download', 'Descargar'),
										value: 'download',
										state: 'default',
										onClick: () => {
											_(), alert(`Descargar para fila: ${g}`);
										},
									},
									{
										label: M('trash', 'Eliminar'),
										value: 'delete',
										state: 'default',
										onClick: () => {
											_(), alert(`Eliminar para fila: ${g}`);
										},
									},
								],
								ce = `context-menu-list-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
							if (!v) {
								console.error('🖱️ [CONTEXT MENU] ❌ contextMenuContainer es null!');
								return;
							}
							const te = document.createElement('div');
							(te.id = ce), (v.innerHTML = ''), v.appendChild(te);
							try {
								const j = De({
										containerId: ce,
										items: F,
										size: 'sm',
										maxHeight: '400px',
										onSelectionChange: (P, T) => {
											P && P.onClick && P.onClick();
										},
									}),
									Q = A.clientX,
									I = A.clientY;
								(v.style.left = `${Q}px`),
									(v.style.top = `${I}px`),
									(v.style.display = 'block'),
									requestAnimationFrame(() => {
										const P = v.getBoundingClientRect(),
											T = window.innerWidth,
											z = window.innerHeight;
										P.right > T && (v.style.left = `${T - P.width - 10}px`),
											P.bottom > z && (v.style.top = `${z - P.height - 10}px`);
									}),
									(y = (P) => {
										v.contains(P.target) || _();
									}),
									setTimeout(() => {
										document.addEventListener('click', y),
											document.addEventListener('contextmenu', y);
									}, 0);
							} catch (j) {
								console.error('🖱️ [CONTEXT MENU] ❌ Error al crear menú contextual:', j),
									console.error('🖱️ [CONTEXT MENU] Stack:', j instanceof Error ? j.stack : 'N/A');
								const Q = Re({
									items: F,
									size: 'sm',
									maxHeight: '400px',
								});
								(te.innerHTML = Q),
									te.querySelectorAll('.ubits-list-item').forEach((z, R) => {
										const ne = F[R];
										ne &&
											ne.onClick &&
											z.addEventListener('click', () => {
												ne.onClick();
											});
									});
								const P = A.clientX,
									T = A.clientY;
								(v.style.left = `${P}px`),
									(v.style.top = `${T}px`),
									(v.style.display = 'block'),
									requestAnimationFrame(() => {
										const z = v.getBoundingClientRect(),
											R = window.innerWidth,
											ne = window.innerHeight;
										z.right > R && (v.style.left = `${R - z.width - 10}px`),
											z.bottom > ne && (v.style.top = `${ne - z.height - 10}px`);
									}),
									(y = (z) => {
										v.contains(z.target) || _();
									}),
									setTimeout(() => {
										document.addEventListener('click', y),
											document.addEventListener('contextmenu', y);
									}, 0);
							}
						});
					});
				}
				n.querySelectorAll('[data-editable-text="true"]').forEach((L) => {
					const v = L.closest('[data-editable="true"]');
					if (!v) return;
					const f = v.getAttribute('data-row-id'),
						y = v.getAttribute('data-column-id');
					if (!f || !y) return;
					const _ = isNaN(Number(f)) ? f : Number(f);
					L.addEventListener('keydown', (w) => {
						w.key === 'Enter' && (w.preventDefault(), L.blur());
					}),
						L.addEventListener('blur', (w) => {
							w.stopPropagation();
							const o = L.textContent || '',
								b = e.rows.find((p) => p.id === _);
							if (b) {
								const p = e.columns.find((g) => g.id === y);
								p && (p.type === 'nombre' || p.type === 'nombre-avatar')
									? ((b.data.nombre = o.trim()), b.data[y] !== void 0 && (b.data[y] = o.trim()))
									: p && p.type === 'estado'
										? ((b.data[y] = o.trim()),
											(b.data.estado = o.trim()),
											(b.data.status = o.trim()))
										: (b.data[y] = o.trim());
							}
						}),
						L.addEventListener('dblclick', (w) => {
							w.stopPropagation();
						}),
						L.addEventListener('click', (w) => {
							w.stopPropagation();
						});
				}),
					n.querySelectorAll('.ubits-data-table__status-editable').forEach((L) => {
						const v = L.getAttribute('data-row-id'),
							f = L.getAttribute('data-column-id'),
							y = L.getAttribute('data-current-status');
						if (!v || !f) return;
						const _ = isNaN(Number(v)) ? v : Number(v),
							w = L.querySelector('.ubits-status-tag'),
							o = L.querySelector('.ubits-data-table__status-dropdown');
						if (!w || !o) return;
						const b = [
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
							g = null,
							A = null,
							O = !1,
							M = 0;
						const F = [],
							ce = (T) => {
								const z = [];
								let R = T;
								for (; R && R !== document.body && R !== document.documentElement; ) {
									const ne = window.getComputedStyle(R),
										de = ne.overflow + ne.overflowX + ne.overflowY,
										re = de.includes('auto') || de.includes('scroll'),
										W = R.scrollHeight > R.clientHeight || R.scrollWidth > R.clientWidth;
									(re || W) && z.push(R), (R = R.parentElement);
								}
								return z;
							},
							te = () => {
								try {
									if (!o || o.style.display === 'none' || !document.body.contains(o)) {
										Q();
										return;
									}
									if (!w || !w.isConnected) {
										Q();
										return;
									}
									const T = w.getBoundingClientRect(),
										z = T.bottom + 4,
										R = T.left,
										ne = o.style.top,
										de = o.style.left,
										re = `${z}px`,
										W = `${R}px`;
									(ne !== re || de !== W) && ((o.style.top = re), (o.style.left = W), M++);
								} catch {
									Q();
								}
							},
							j = () => {
								if (O) return;
								O = !0;
								const T = () => {
									if (o.style.display === 'none' || !document.body.contains(o)) {
										Q();
										return;
									}
									te(), (A = requestAnimationFrame(T));
								};
								T();
							},
							Q = () => {
								A && (cancelAnimationFrame(A), (A = null)), (O = !1), (M = 0);
							};
						g = te;
						const I = () => {
								Q(), (o.style.display = 'none');
								const T = o.__scrollbarInstance;
								if (T && T.destroy) {
									try {
										T.destroy();
									} catch {}
									o.__scrollbarInstance = null;
								}
								o.parentElement === document.body && L.appendChild(o),
									p && (document.removeEventListener('click', p), (p = null)),
									g &&
										(window.removeEventListener('scroll', g, !0),
										n.removeEventListener('scroll', g, !0),
										F.forEach((z) => {
											z.removeEventListener('scroll', g, !0);
										}),
										(F.length = 0),
										(g = null));
							},
							P = (T) => {
								try {
									if ((T.preventDefault(), T.stopPropagation(), !w || !o)) return;
									n.querySelectorAll('.ubits-data-table__status-dropdown').forEach((ae) => {
										if (
											ae !== o &&
											((ae.style.display = 'none'), ae.parentElement === document.body)
										) {
											const fe = n.querySelector(
												`[data-row-id="${ae.getAttribute('data-row-id')}"][data-column-id="${ae.getAttribute('data-column-id')}"]`,
											);
											fe && fe.appendChild(ae);
										}
									});
									const z = {
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
										R = b.map((ae) => ({
											label: ae.label,
											value: ae.value,
											state: ae.status === y ? 'active' : 'default',
											selected: ae.status === y,
										}));
									if (!document.querySelector('link[href*="scroll.css"]')) {
										const ae = document.createElement('link');
										(ae.rel = 'stylesheet'),
											(ae.href = '../../addons/scroll/src/styles/scroll.css'),
											document.head.appendChild(ae);
									}
									o.innerHTML = '';
									const ne = `status-list-${_}-${f}`,
										de = `status-scrollbar-${_}-${f}`;
									if (
										((o.id = `status-dropdown-${_}-${f}`),
										(o.innerHTML = `
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${ne}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${de}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `),
										document.getElementById(ne))
									) {
										const ae = document.createElement('style');
										(ae.textContent = `
            #${ne}::-webkit-scrollbar {
              display: none;
            }
          `),
											document.head.appendChild(ae);
									}
									o.parentElement !== document.body && document.body.appendChild(o);
									const W = w.getBoundingClientRect();
									(o.style.position = 'fixed'),
										(o.style.top = `${W.bottom + 4}px`),
										(o.style.left = `${W.left}px`),
										(o.style.zIndex = '1000'),
										(o.style.backgroundColor = 'var(--modifiers-normal-color-light-bg-1)'),
										(o.style.border = '1px solid var(--modifiers-normal-color-light-border-1)'),
										(o.style.borderRadius = 'var(--ubits-border-radius-sm)'),
										(o.style.display = 'block'),
										(o.style.minWidth = '200px'),
										(o.style.maxWidth = '300px'),
										(o.style.padding = '4px'),
										(o.style.boxSizing = 'border-box'),
										(o.style.maxHeight = '308px');
									const Y = ce(w);
									F.push(...Y),
										te(),
										j(),
										window.addEventListener('scroll', te, !0),
										n.addEventListener('scroll', te, !0),
										Y.forEach((ae) => {
											ae.addEventListener('scroll', te, !0);
										});
									let H = null;
									try {
										const ae = De({
											containerId: ne,
											items: R,
											size: 'sm',
											maxHeight: 'none',
											onSelectionChange: (fe, we) => {
												if (fe && we !== null) {
													const Ee = b[we];
													if (Ee) {
														const ge = e.rows.find((Ne) => Ne.id === _);
														if (ge && e.columns.find((Ie) => Ie.id === f)) {
															const Ie = z[Ee.status] || Ee.label;
															(ge.data[f] = Ie), (ge.data.estado = Ie), (ge.data.status = Ie), U();
														}
														I();
													}
												}
											},
										});
										ae &&
											((ae.style.maxHeight = 'none'),
											(ae.style.height = 'auto'),
											(ae.style.overflow = 'visible'),
											(ae.style.overflowY = 'visible'),
											(ae.style.overflowX = 'visible')),
											requestAnimationFrame(() => {
												if (typeof Fe < 'u')
													try {
														const fe = document.getElementById(ne);
														fe &&
															fe.scrollHeight > fe.clientHeight &&
															((H = Fe({
																containerId: de,
																targetId: ne,
																orientation: 'vertical',
																state: 'default',
															})),
															H?.update && H.update());
													} catch {}
											});
									} catch {}
									o.__scrollbarInstance = H;
									const he = (ae) => {
										!o.contains(ae.target) && !w.contains(ae.target) && I();
									};
									(p = he),
										setTimeout(() => {
											document.addEventListener('click', he);
										}, 0);
								} catch {
									Q();
								}
							};
						w.addEventListener('click', P);
					}),
					n
						.querySelectorAll('input[data-radio-button="true"][data-editable="true"]')
						.forEach((L) => {
							const v = L,
								f = v.getAttribute('data-row-id'),
								y = v.getAttribute('data-column-id');
							if (!f || !y) return;
							const _ = isNaN(Number(f)) ? f : Number(f),
								w = v.cloneNode(!0);
							v.parentNode?.replaceChild(w, v),
								w.addEventListener('change', (o) => {
									if ((o.stopPropagation(), w.checked)) {
										n.querySelectorAll(
											`input[data-radio-button="true"][data-column-id="${y}"]`,
										).forEach((g) => {
											const A = g.getAttribute('data-row-id');
											if (A && A !== String(_)) {
												g.checked = !1;
												const O = e.rows.find((M) => String(M.id) === A);
												O && (O.data[y] = !1);
											}
										});
										const p = e.rows.find((g) => String(g.id) === String(_));
										p && ((p.data[y] = !0), (p.data[`${y}_value`] = _));
									}
									U();
								});
						}),
					n
						.querySelectorAll(
							'input[data-checkbox-button="true"]:not([data-column-id="checkbox-2"])',
						)
						.forEach((L) => {
							const v = L,
								f = v.getAttribute('data-row-id'),
								y = v.getAttribute('data-column-id');
							if (!f || !y || y === 'checkbox-2') return;
							const _ = isNaN(Number(f)) ? f : Number(f),
								w = v.cloneNode(!0);
							v.parentNode?.replaceChild(w, v),
								w.addEventListener('change', (o) => {
									o.stopPropagation();
									const b = e.rows.find((p) => String(p.id) === String(_));
									b && ((b.data[y] = w.checked), e.onRowSelect && e.onRowSelect(_, w.checked), U());
								});
						}),
					n.querySelectorAll('input[data-column-checkbox-header]').forEach((L, v) => {
						const f = L,
							y = f.getAttribute('data-column-checkbox-header'),
							_ = () => {};
						f.addEventListener('click', _, { once: !0, capture: !0 });
						const w = () => {};
						f.addEventListener('change', w, { once: !0, capture: !0 });
					});
				const Ae =
					typeof window < 'u' && window.location && !window.location.href.includes('storybook');
				if (
					(n.querySelectorAll('.ubits-data-table__date-editable').forEach((L, v) => {
						const f = L.getAttribute('data-row-id'),
							y = L.getAttribute('data-column-id');
						if (!f || !y) return;
						const _ = isNaN(Number(f)) ? f : Number(f),
							w = L.querySelector('.ubits-data-table__date-display');
						if (!w) return;
						let o = null,
							b = null,
							p = null,
							g = null,
							A = null,
							O = null;
						const M = (I) => {
								const P = String(I.getDate()).padStart(2, '0'),
									T = String(I.getMonth() + 1).padStart(2, '0'),
									z = I.getFullYear();
								return `${P}/${T}/${z}`;
							},
							F = (I) => {
								if (!I) return null;
								const [P, T, z] = I.split('/');
								if (P && T && z) return new Date(parseInt(z), parseInt(T) - 1, parseInt(P));
								try {
									const R = new Date(I);
									if (!isNaN(R.getTime())) return R;
								} catch {}
								return null;
							},
							ce = () => {
								b && ((b.style.display = 'none'), b.parentElement && b.remove(), (b = null)),
									p && (document.removeEventListener('click', p), (p = null)),
									g && (document.removeEventListener('keydown', g), (g = null)),
									A &&
										(window.removeEventListener('scroll', A, !0),
										O && O.removeEventListener('scroll', A, !0),
										(A = null));
							},
							te = () => {
								(p = (I) => {
									b && !L.contains(I.target) && !b.contains(I.target) && ce();
								}),
									(g = (I) => {
										I.key === 'Escape' && b && ce();
									}),
									(A = (I) => {
										if (!b) return;
										const P = b.querySelector('.ubits-calendar');
										if (P) {
											const T = P.querySelector(
													'.ubits-calendar__month-dropdown[style*="display: block"]',
												),
												z = P.querySelector(
													'.ubits-calendar__year-dropdown[style*="display: block"]',
												);
											if (T || z) {
												const R = document.activeElement;
												if (
													R &&
													(b.contains(R) ||
														R.closest('.ubits-calendar') ||
														R.closest('.ubits-calendar__month-dropdown') ||
														R.closest('.ubits-calendar__year-dropdown') ||
														R.closest('.ubits-list') ||
														R.closest('[id*="calendar-list"]') ||
														R.closest('[id*="calendar-scrollbar"]'))
												)
													return;
												if (I && I.target) {
													const ne = I.target;
													if (
														b.contains(ne) ||
														ne.closest('.ubits-calendar') ||
														ne.closest('.ubits-calendar__month-dropdown') ||
														ne.closest('.ubits-calendar__year-dropdown') ||
														ne.closest('.ubits-list') ||
														ne.closest('[id*="calendar-list"]') ||
														ne.closest('[id*="calendar-scrollbar"]')
													)
														return;
												}
												return;
											}
										}
										ce();
									}),
									document.addEventListener('click', p),
									document.addEventListener('keydown', g),
									(O = n.querySelector('.ubits-data-table__scrollable-container')),
									O && O.addEventListener('scroll', A, !0),
									window.addEventListener('scroll', A, !0);
							},
							j = async () => {
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
								for (const P of I) {
									const T = document.getElementById(P.id),
										z = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).find(
											(ne) => (ne.href || '').includes(P.fileName) || ne.id === P.id,
										);
									if (T || z) continue;
									const R = document.createElement('link');
									(R.rel = 'stylesheet'),
										(R.href = P.href),
										(R.id = P.id),
										document.head.appendChild(R);
								}
							},
							Q = async () => {
								if (b && b.style.display !== 'none') {
									ce();
									return;
								}
								if (o && b) {
									const I = w.getBoundingClientRect();
									(b.style.top = `${I.bottom + 4}px`),
										(b.style.left = `${I.left}px`),
										(b.style.display = 'block'),
										te();
									return;
								}
								try {
									await j();
									const { createCalendar: I } = await import('./index-DrY0IgxX.mjs').then(
											(re) => re.i,
										),
										P = w.textContent || '',
										T = F(P);
									(o = I({
										mode: 'single',
										selectedDate: T,
										initialDate: T || /* @__PURE__ */ new Date(),
										onDateSelect: (re) => {
											const W = M(re);
											w.textContent = W;
											const Y = e.rows.find((H) => H.id === _);
											Y && ((Y.data[y] = W), (Y.data[`${y}_iso`] = re.toISOString().split('T')[0])),
												ce(),
												U();
										},
									})),
										(b = document.createElement('div')),
										(b.className = 'ubits-data-table__calendar-container'),
										b.setAttribute('data-row-id', String(_)),
										b.setAttribute('data-column-id', y);
									const R = w.getBoundingClientRect(),
										ne = R.bottom + 4,
										de = R.left;
									(b.style.cssText = `
            position: fixed;
            top: ${ne}px;
            left: ${de}px;
            z-index: 99999;
            display: block;
            margin: 0;
          `),
										document.body.appendChild(b),
										b.appendChild(o.element),
										te();
								} catch (I) {
									console.error('❌ [CALENDAR] Error cargando Calendar UBITS:', I);
								}
							};
						w.addEventListener('click', (I) => {
							I.preventDefault(), I.stopPropagation(), Q();
						});
					}),
					n.querySelectorAll('input[data-toggle-button="true"]').forEach((L) => {
						const v = L,
							f = v.getAttribute('data-row-id'),
							y = v.getAttribute('data-column-id');
						if (!f || !y) return;
						const _ = isNaN(Number(f)) ? f : Number(f),
							w = v.cloneNode(!0);
						v.parentNode?.replaceChild(w, v),
							w.addEventListener('change', (b) => {
								b.stopPropagation();
								const p = e.rows.find((g) => String(g.id) === String(_));
								p && ((p.data[y] = w.checked), U());
							});
						const o = w.closest('.ubits-toggle');
						o &&
							o.addEventListener('click', (b) => {
								b.target !== w &&
									!w.contains(b.target) &&
									(b.preventDefault(),
									b.stopPropagation(),
									(w.checked = !w.checked),
									w.dispatchEvent(new Event('change', { bubbles: !0 })));
							});
					}),
					e.showPagination)
				) {
					const L = n.querySelector('.ubits-data-table__pagination');
					if (L) {
						L.querySelectorAll('.ubits-pagination__page-button').forEach((_) => {
							_.addEventListener('click', () => {
								const w = parseInt(_.textContent || '1');
								e.onPageChange && e.onPageChange(w), (e.currentPage = w), U();
							});
						}),
							L.querySelectorAll('.ubits-pagination__nav-button').forEach((_) => {
								_.addEventListener('click', () => {
									const w = parseInt(L.getAttribute('data-current-page') || '1'),
										o = parseInt(L.getAttribute('data-total-pages') || '1'),
										b = _.getAttribute('aria-label') || '';
									let p = w;
									b.includes('Primera') || b.includes('First')
										? (p = 1)
										: b.includes('Última') || b.includes('Last')
											? (p = o)
											: b.includes('Anterior') || b.includes('Previous')
												? (p = Math.max(1, w - 1))
												: (b.includes('Siguiente') || b.includes('Next')) &&
													(p = Math.min(o, w + 1)),
										p !== w && (e.onPageChange && e.onPageChange(p), (e.currentPage = p), U());
								});
							});
						const y = L.querySelector('.ubits-pagination__select');
						y &&
							y.addEventListener('change', (_) => {
								const w = _.target,
									o = parseInt(w.value);
								e.onItemsPerPageChange && e.onItemsPerPageChange(o),
									(e.itemsPerPage = o),
									(e.currentPage = 1),
									U();
							});
					}
				}
				if (e.header) {
					const L = n.querySelector('.ubits-data-table__header');
					if (L) {
						if (e.header.primaryButton && e.header.showPrimaryButton !== !1) {
							const v = L.querySelector('.ubits-data-table__header-primary-button');
							v &&
								e.header.primaryButton.onClick &&
								v.addEventListener('click', e.header.primaryButton.onClick);
						}
						if (
							(e.header.secondaryButtons &&
								e.header.showSecondaryButtons !== !1 &&
								L.querySelectorAll('.ubits-data-table__header-secondary-button').forEach((f, y) => {
									const _ = e.header.secondaryButtons[y];
									_ && _.onClick && f.addEventListener('click', _.onClick);
								}),
							e.header.searchButton && e.header.showSearchButton !== !1)
						) {
							const v = L.querySelector('.ubits-data-table__header-search-button'),
								f = v?.previousElementSibling,
								y = v ? window.getComputedStyle(v) : null,
								_ = f ? window.getComputedStyle(f) : null;
							let w = null;
							if (v && f) {
								const o = f.getBoundingClientRect(),
									b = v.getBoundingClientRect(),
									p = b.left - o.right;
								w = {
									prevButtonRight: o.right,
									searchBtnLeft: b.left,
									actualGap: p,
									expectedGap: 8,
									difference: p - 8,
									prevButtonWidth: o.width,
									searchBtnWidth: b.width,
									marginLeft: y?.marginLeft,
									marginRight: y?.marginRight,
								};
							}
							if (v) {
								const o = v.querySelector('button'),
									b = v.tagName === 'BUTTON';
								(b || !!o) &&
									!N &&
									(b ? v : o).addEventListener('click', (O) => {
										O.stopPropagation(),
											O.preventDefault(),
											(N = !0),
											e.header.searchButton.onClick && e.header.searchButton.onClick(O),
											U(),
											setTimeout(() => {
												const M = n.querySelector('.ubits-data-table__header-search-button');
												if (M) {
													const F = M.querySelector('.ubits-search-button__input');
													F
														? (F.focus(),
															setTimeout(() => {
																F.setSelectionRange(0, F.value.length);
															}, 10))
														: console.warn(
																'🔍 [DATA TABLE] Input no encontrado después de renderizar',
															);
												}
											}, 150);
									});
								const g = v.querySelector('.ubits-search-button__input');
								if (g) {
									g.value = C;
									const A = (j) => {
										if (
											((C = j),
											e.header.searchButton.onChange
												? (console.log(
														'🔵 [DATA TABLE] Llamando searchButton.onChange con valor:',
														j,
													),
													e.header.searchButton.onChange(j))
												: console.warn('⚠️ [DATA TABLE] searchButton.onChange no está definido'),
											U(),
											j &&
												setTimeout(() => {
													const Q = n.querySelector('.ubits-data-table__header-search-button');
													if (Q) {
														const I = Q.querySelector('.ubits-search-button__input');
														I && (I.focus(), I.setSelectionRange(I.value.length, I.value.length));
													}
												}, 50),
											e.header.searchButton.onSearch)
										) {
											const Q = V(e.rows, j, e.columns);
											e.header.searchButton.onSearch(j, Q);
										}
									};
									g.addEventListener('input', (j) => {
										const Q = j.target.value;
										A(Q);
									}),
										g.addEventListener('change', (j) => {
											const Q = j.target.value;
											A(Q);
										});
									let O = null,
										M = !1,
										F = 0;
									g.addEventListener('focus', () => {
										(M = !0),
											(F = Date.now()),
											setTimeout(() => {
												M = !1;
											}, 200);
									}),
										g.addEventListener('blur', (j) => {
											const I = Date.now() - F;
											M ||
												I < 200 ||
												(O && clearTimeout(O),
												(O = setTimeout(() => {
													const P = n.querySelector('.ubits-search-button__input'),
														T = document.activeElement,
														z = n.querySelector('.ubits-search-button__clear'),
														R = n.querySelector('.ubits-data-table__header-search-button');
													P &&
														C === '' &&
														!P.value &&
														T !== z &&
														!R?.contains(T) &&
														((N = !1), U()),
														(O = null);
												}, 200)));
										});
									const ce = v.closest('.ubits-data-table__header-search-button');
									ce &&
										ce.addEventListener('mousedown', (j) => {
											j.target.closest('.ubits-search-button__input-wrapper') && j.preventDefault();
										});
									const te = v.querySelector('.ubits-search-button__clear');
									te &&
										te.addEventListener('click', (j) => {
											j.stopPropagation(),
												j.preventDefault(),
												(C = ''),
												(g.value = ''),
												(N = !1),
												A('');
										});
								}
							}
						}
						if (e.header.filterButton && e.header.showFilterButton !== !1) {
							const v = L.querySelector('.ubits-data-table__header-filter-button');
							v &&
								v.addEventListener('click', (f) => {
									f.stopPropagation(), f.preventDefault();
									let y = e.header.filterButton.filters || [];
									if (
										(y.length === 0 &&
											(y = e.columns
												.filter((w) => {
													const o = [
														'drag-handle',
														'expand',
														'checkbox',
														'radio',
														'toggle',
														'acciones',
													];
													return w.visible !== !1 && w.type && !o.includes(w.type);
												})
												.map((w) => {
													let o = 'text',
														b;
													if (w.type === 'estado') {
														o = 'select';
														const p = /* @__PURE__ */ new Set();
														e.rows.forEach((g) => {
															const A = g.data[w.id];
															A != null && p.add(String(A));
														}),
															(b = Array.from(p).map((g) => ({
																value: g,
																label: g,
															})));
													} else
														w.type === 'fecha'
															? (o = 'calendar')
															: w.type === 'progreso'
																? (o = 'number')
																: (o = 'text');
													return {
														id: w.id,
														label: w.title,
														columnId: w.id,
														type: o,
														options: b,
													};
												})),
										y.length === 0)
									) {
										console.warn('🔍 [DATA TABLE] No hay columnas disponibles para filtrar'),
											e.header.filterButton.onClick && e.header.filterButton.onClick(f);
										return;
									}
									const _ = () => `
                  <div class="ubits-data-table__filters-container">
                    ${y
											.map((o) => {
												const b = $[o.id] || o.value || '';
												let p = '';
												const g = `filter-input-${o.id}`;
												switch (o.type) {
													case 'text':
													case 'number':
													case 'date':
													case 'calendar':
														p = ze({
															containerId: g,
															label: o.label,
															type: o.type,
															value: b,
															placeholder: `Filtrar por ${o.label.toLowerCase()}...`,
															size: 'md',
														});
														break;
													case 'select':
														o.options &&
															o.options.length > 0 &&
															(p = ze({
																containerId: g,
																label: o.label,
																type: 'select',
																selectOptions: o.options,
																value: b,
																placeholder: `Seleccionar ${o.label.toLowerCase()}...`,
																size: 'md',
															}));
														break;
												}
												return `
                    <div class="ubits-data-table__filter-item" data-filter-id="${o.id}">
                      <div id="${g}">${p}</div>
                    </div>
                  `;
											})
											.join('')}
                  </div>
                `;
									if (K)
										try {
											K.updateContent(_);
										} catch (w) {
											console.error('🔍 [DATA TABLE] Error al actualizar drawer:', w),
												(K = Je({
													title: 'Filtros',
													complementaryText: 'Aplica filtros para refinar los resultados',
													width: 40,
													bodyContent: _,
													footerButtons: {
														secondary: {
															label: 'Limpiar',
															onClick: (o) => {
																o.preventDefault(),
																	o.stopPropagation(),
																	($ = {}),
																	e.header.filterButton.onClearFilters &&
																		e.header.filterButton.onClearFilters(),
																	U(),
																	K && K.close();
															},
														},
														primary: {
															label: 'Aplicar',
															onClick: (o) => {
																o.preventDefault(), o.stopPropagation();
																const b = {};
																y.forEach((p) => {
																	const g = K.element.querySelector(`[data-filter-id="${p.id}"]`);
																	if (g) {
																		const A = g.querySelector('.ubits-input');
																		A &&
																			A.value &&
																			A.value.trim() !== '' &&
																			(b[p.id] = A.value.trim());
																	}
																}),
																	($ = b),
																	e.header.filterButton.onApplyFilters &&
																		e.header.filterButton.onApplyFilters($),
																	U(),
																	K && K.close();
															},
														},
													},
													onClose: () => {},
													closeOnOverlayClick: !0,
												}));
										}
									else
										try {
											K = Je({
												title: 'Filtros',
												complementaryText: 'Aplica filtros para refinar los resultados',
												width: 40,
												bodyContent: _,
												footerButtons: {
													secondary: {
														label: 'Limpiar',
														onClick: (w) => {
															w.preventDefault(),
																w.stopPropagation(),
																($ = {}),
																e.header.filterButton.onClearFilters &&
																	e.header.filterButton.onClearFilters(),
																U(),
																K && K.close();
														},
													},
													primary: {
														label: 'Aplicar',
														onClick: (w) => {
															w.preventDefault(), w.stopPropagation();
															const o = {};
															y.forEach((b) => {
																const p = K.element.querySelector(`[data-filter-id="${b.id}"]`);
																if (p) {
																	const g = p.querySelector('.ubits-input');
																	g &&
																		g.value &&
																		g.value.trim() !== '' &&
																		(o[b.id] = g.value.trim());
																}
															}),
																($ = o),
																e.header.filterButton.onApplyFilters &&
																	e.header.filterButton.onApplyFilters($),
																U(),
																K && K.close();
														},
													},
												},
												onClose: () => {},
												closeOnOverlayClick: !0,
											});
										} catch (w) {
											console.error('🔍 [DATA TABLE] Error al crear drawer:', w),
												e.header.filterButton.onClick && e.header.filterButton.onClick(f);
											return;
										}
									K &&
										(K.open(),
										setTimeout(() => {
											if (
												(console.log(
													'🔵 [DATA TABLE FILTERS] ========== INICIO creación de inputs ==========',
												),
												!K)
											) {
												console.error('❌ [DATA TABLE FILTERS] drawerInstance no existe');
												return;
											}
											console.log('✅ [DATA TABLE FILTERS] drawerInstance existe');
											const w = (p) => {
													const g = String(p.getDate()).padStart(2, '0'),
														A = String(p.getMonth() + 1).padStart(2, '0'),
														O = p.getFullYear();
													return `${g}/${A}/${O}`;
												},
												o = (p) => {
													if (!p) return null;
													const [g, A, O] = p.split('/');
													if (g && A && O)
														return new Date(parseInt(O), parseInt(A) - 1, parseInt(g));
													try {
														const M = new Date(p);
														if (!isNaN(M.getTime())) return M;
													} catch {}
													return null;
												},
												b = async () => {
													console.log(
														'🔵 [DATA TABLE FILTERS] Cargando estilos CSS del Calendar...',
													);
													const p = [
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
													for (const g of p) {
														const A = document.getElementById(g.id),
															O = Array.from(
																document.head.querySelectorAll('link[rel="stylesheet"]'),
															).find((F) => (F.href || '').includes(g.fileName) || F.id === g.id);
														if (A || O) {
															console.log(
																`ℹ️ [DATA TABLE FILTERS] Estilo ${g.fileName} ya está cargado`,
															);
															continue;
														}
														console.log(`📦 [DATA TABLE FILTERS] Cargando estilo: ${g.fileName}`);
														const M = document.createElement('link');
														(M.rel = 'stylesheet'),
															(M.href = g.href),
															(M.id = g.id),
															document.head.appendChild(M),
															console.log(`✅ [DATA TABLE FILTERS] Estilo ${g.fileName} cargado`);
													}
													console.log('✅ [DATA TABLE FILTERS] Todos los estilos CSS cargados');
												};
											console.log(`🔵 [DATA TABLE FILTERS] Procesando ${y.length} filtros...`);
											for (let p = 0; p < y.length; p++) {
												const g = y[p];
												console.log(
													`🔵 [DATA TABLE FILTERS] Procesando filtro ${p + 1}/${y.length}: id=${g.id}, label=${g.label}, type=${g.type}`,
												);
												const A = `filter-input-${g.id}`,
													O = K.element.querySelector(`#${A}`);
												if (!O) {
													console.warn(
														`⚠️ [DATA TABLE FILTERS] Contenedor ${A} no encontrado para filtro ${g.id}`,
													);
													continue;
												}
												console.log(`✅ [DATA TABLE FILTERS] Contenedor ${A} encontrado`),
													(O.innerHTML = '');
												const M = $[g.id] || g.value || '';
												if (
													(console.log(
														`🔵 [DATA TABLE FILTERS] Valor actual del filtro ${g.id}:`,
														M,
													),
													g.type === 'calendar')
												)
													console.log(
														`📅 [DATA TABLE FILTERS] Filtro ${g.id} es de tipo CALENDAR, usando createCalendar`,
													),
														(async () => {
															try {
																await b(),
																	console.log(
																		'📅 [DATA TABLE FILTERS] Importando createCalendar...',
																	);
																const { createCalendar: F } = await import(
																	'./index-DrY0IgxX.mjs'
																).then((re) => re.i);
																console.log(
																	'✅ [DATA TABLE FILTERS] createCalendar importado:',
																	typeof F,
																),
																	console.log(
																		'📅 [DATA TABLE FILTERS] Creando estructura del input readonly...',
																	);
																const ce = document.createElement('div');
																(ce.className = 'ubits-input'), (ce.style.position = 'relative');
																const te = document.createElement('label');
																(te.className = 'ubits-input__label'),
																	(te.textContent = g.label),
																	console.log('📅 [DATA TABLE FILTERS] Label creado:', g.label);
																const j = document.createElement('div');
																j.className = 'ubits-input__wrapper';
																const Q = document.createElement('input');
																(Q.type = 'text'),
																	(Q.readOnly = !0),
																	(Q.value = M),
																	(Q.placeholder = `Filtrar por ${g.label.toLowerCase()}...`),
																	(Q.className = 'ubits-input__input'),
																	(Q.style.cursor = 'pointer'),
																	console.log(
																		'📅 [DATA TABLE FILTERS] Input readonly creado con valor:',
																		M,
																	);
																const I = document.createElement('div');
																(I.className = 'ubits-input-icon-right'),
																	(I.innerHTML = '<i class="far fa-calendar"></i>'),
																	console.log(
																		'📅 [DATA TABLE FILTERS] Icono de calendario agregado (far fa-calendar)',
																	),
																	j.appendChild(Q),
																	j.appendChild(I),
																	ce.appendChild(te),
																	ce.appendChild(j);
																let P = null,
																	T = null,
																	z = null,
																	R = null;
																const ne = () => {
																		T &&
																			((T.style.display = 'none'),
																			T.parentElement && T.remove(),
																			(T = null)),
																			z && (document.removeEventListener('click', z), (z = null)),
																			R && (document.removeEventListener('keydown', R), (R = null));
																	},
																	de = async () => {
																		if (T && T.style.display !== 'none') {
																			ne();
																			return;
																		}
																		if (P && T) {
																			const re = j.getBoundingClientRect();
																			(T.style.top = `${re.bottom + 4}px`),
																				(T.style.left = `${re.left}px`),
																				(T.style.display = 'block');
																			return;
																		}
																		try {
																			const re = o(M),
																				W = re || /* @__PURE__ */ new Date();
																			console.log('📅 [DATA TABLE FILTERS] Fecha parseada:', re),
																				console.log('📅 [DATA TABLE FILTERS] Fecha inicial:', W),
																				console.log(
																					'📅 [DATA TABLE FILTERS] Creando instancia del Calendar...',
																				),
																				(P = F({
																					mode: 'single',
																					selectedDate: re,
																					initialDate: W,
																					onDateSelect: (H) => {
																						console.log(
																							'📅 [DATA TABLE FILTERS] Fecha seleccionada:',
																							H,
																						);
																						const he = w(H);
																						console.log(
																							'📅 [DATA TABLE FILTERS] Fecha formateada:',
																							he,
																						),
																							(Q.value = he),
																							($[g.id] = he),
																							ne(),
																							console.log(
																								'📅 [DATA TABLE FILTERS] Actualizando filtros y re-renderizando...',
																							),
																							U();
																					},
																				})),
																				console.log(
																					'✅ [DATA TABLE FILTERS] Instancia del Calendar creada:',
																					P,
																				),
																				(T = document.createElement('div')),
																				(T.className = 'ubits-calendar-container');
																			const Y = j.getBoundingClientRect();
																			(T.style.cssText = `
																	position: fixed;
																	top: ${Y.bottom + 4}px;
																	left: ${Y.left}px;
																	z-index: 10000;
																	display: block;
																	background: var(--modifiers-normal-color-light-bg-1);
																	border: 1px solid var(--modifiers-normal-color-light-border-1);
																	border-radius: var(--ubits-border-radius-md);
																	box-shadow: var(--ubits-shadow-lg);
																`),
																				T.appendChild(P.element),
																				document.body.appendChild(T),
																				(z = (H) => {
																					T &&
																						T.style.display !== 'none' &&
																						!ce.contains(H.target) &&
																						!T.contains(H.target) &&
																						ne();
																				}),
																				(R = (H) => {
																					H.key === 'Escape' &&
																						T &&
																						T.style.display !== 'none' &&
																						ne();
																				}),
																				document.addEventListener('click', z),
																				document.addEventListener('keydown', R);
																		} catch (re) {
																			console.error(
																				'❌ [DATA TABLE FILTERS] Error al mostrar Calendar:',
																				re,
																			);
																		}
																	};
																Q.addEventListener('click', (re) => {
																	re.preventDefault(), re.stopPropagation(), de();
																}),
																	I.addEventListener('click', (re) => {
																		re.preventDefault(), re.stopPropagation(), de();
																	}),
																	console.log(
																		'📅 [DATA TABLE FILTERS] Agregando elementos al contenedor...',
																	),
																	O.appendChild(ce),
																	console.log(
																		`✅ [DATA TABLE FILTERS] Calendar implementado correctamente para filtro ${g.id}`,
																	);
															} catch (F) {
																console.error(
																	'❌ [DATA TABLE FILTERS] Error al crear Calendar para filtro:',
																	F,
																),
																	console.error(
																		'❌ [DATA TABLE FILTERS] Stack trace:',
																		F instanceof Error ? F.stack : 'N/A',
																	),
																	(O.innerHTML = `<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--ubits-fg-1-high);">Error al cargar el calendario: ${F instanceof Error ? F.message : String(F)}</div>`);
															}
														})();
												else if (g.type === 'select' && g.options) {
													console.log(
														`🔵 [DATA TABLE FILTERS] Filtro ${g.id} es de tipo SELECT, usando createInput`,
													);
													let F = {
														containerId: A,
														label: g.label,
														value: M,
														placeholder: `Seleccionar ${g.label.toLowerCase()}...`,
														size: 'md',
														type: 'select',
														selectOptions: g.options.map((ce) => ({
															value: ce.value,
															text: ce.label || ce.value,
														})),
													};
													Ze(F);
												} else {
													console.log(
														`🔵 [DATA TABLE FILTERS] Filtro ${g.id} es de tipo ${g.type}, usando createInput`,
													);
													let F = {
														containerId: A,
														label: g.label,
														value: M,
														placeholder: `Filtrar por ${g.label.toLowerCase()}...`,
														size: 'md',
														type: g.type,
													};
													console.log('🔵 [DATA TABLE FILTERS] Creando input con opciones:', F),
														Ze(F),
														console.log(`✅ [DATA TABLE FILTERS] Input creado para filtro ${g.id}`);
												}
											}
											console.log(
												'🔵 [DATA TABLE FILTERS] ========== FIN creación de inputs ==========',
											);
										}, 300));
								});
						}
						if (e.header.columnSelectorButton && e.header.showColumnSelectorButton !== !1) {
							const v = L.querySelector('.ubits-data-table__header-column-selector-button');
							if (v) {
								let f = null,
									y = !1;
								const _ = () => (
										(f && f.parentElement) ||
											((f = document.createElement('div')),
											(f.className = 'ubits-data-table__column-selector-dropdown'),
											(f.style.display = 'none'),
											document.body.appendChild(f)),
										f
									),
									w = () => {
										if (!f || !v) return;
										const g = v.getBoundingClientRect(),
											A = f.offsetWidth || 200;
										(f.style.position = 'fixed'), (f.style.top = `${g.bottom + 4}px`);
										const O = g.right - A;
										O < 0 ? (f.style.left = '0px') : (f.style.left = `${O}px`),
											(f.style.right = 'auto');
									};
								let o = null,
									b = null;
								const p = () => {
									f &&
										((f.style.display = 'none'),
										(y = !1),
										b && (document.removeEventListener('click', b), (b = null)),
										o &&
											(window.removeEventListener('scroll', o, !0),
											window.removeEventListener('resize', o),
											(o = null)));
								};
								v.addEventListener('click', (g) => {
									if ((g.preventDefault(), g.stopPropagation(), y)) {
										p();
										return;
									}
									const A = _();
									for (; A.firstChild; ) A.removeChild(A.firstChild);
									A.innerHTML = '';
									const O = A.children.length,
										M = A.innerHTML.length;
									(O > 0 || M > 0) &&
										(console.error(
											'🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown no está completamente limpio!',
										),
										(A.innerHTML = ''),
										requestAnimationFrame(() => {
											(A.children.length > 0 || A.innerHTML.length > 0) &&
												console.error(
													'🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown sigue sin estar limpio después de limpieza adicional!',
												);
										}));
									const F = 'ubits-data-table-column-selector-list',
										ce = document.getElementById(F);
									ce && ce.remove();
									const te = document.createElement('div');
									if (((te.id = F), A.appendChild(te), te)) {
										const I = r(e.columns);
										I.length !== e.columns.length && (e.columns = I);
										const P = I.filter((W) => {
												const Y = ['drag-handle', 'expand'],
													H = ['checkbox', 'checkbox-2'];
												return (
													!Y.includes(W.type || '') && !H.includes(W.id) && W.id !== 'checkbox'
												);
											}),
											T = /* @__PURE__ */ new Set(),
											z = P.filter((W) => (T.has(W.id) ? !1 : (T.add(W.id), !0))),
											R = z.filter((W) => W.visible !== !1).length,
											ne = z.map((W) => {
												const Y = W.visible !== !1,
													H = Y && R === 1;
												return {
													label: Pe({
														label: W.title,
														checked: Y,
														size: 'sm',
														disabled: H,
														className: 'ubits-data-table__column-selector-checkbox',
													}).replace('<input', `<input data-column-selector-id="${W.id}"`),
													value: W.id,
													state: 'default',
													selected: !1,
												};
											}),
											de = /* @__PURE__ */ new Set(),
											re = ne.filter((W) => (de.has(W.value) ? !1 : (de.add(W.value), !0)));
										try {
											De({
												containerId: F,
												items: re,
												size: 'sm',
												maxHeight: '400px',
												className: 'ubits-data-table__column-selector-list',
											});
											const W = document.getElementById(F);
											if (W) {
												const H =
													W.querySelector('.ubits-list')?.querySelectorAll('.ubits-list-item') ||
													[];
											} else
												console.error(
													'🔍 [COLUMN SELECTOR] ❌ Lista no encontrada después de createList',
												);
										} catch (W) {
											console.error('🔍 [COLUMN SELECTOR] ❌ Error en createList:', W),
												(te.innerHTML = Re({
													containerId: F,
													items: re,
													size: 'sm',
													maxHeight: '400px',
													className: 'ubits-data-table__column-selector-list',
												}));
										}
									} else console.error('🔍 [COLUMN SELECTOR] ❌ listContainer no existe');
									const j = () => {
											const I = 'ubits-data-table-column-selector-list';
											let P = A.querySelector(`#${I}`);
											(!P || !y) &&
												((A.innerHTML = ''),
												(P = document.createElement('div')),
												(P.id = I),
												A.appendChild(P));
											const T = r(e.columns);
											T.length !== e.columns.length && (e.columns = T);
											const z = T.filter((H) => {
													const he = ['drag-handle', 'expand'],
														ae = ['checkbox', 'checkbox-2'];
													return (
														!he.includes(H.type || '') && !ae.includes(H.id) && H.id !== 'checkbox'
													);
												}),
												R = /* @__PURE__ */ new Set(),
												ne = z.filter((H) => (R.has(H.id) ? !1 : (R.add(H.id), !0))),
												de = ne.filter((H) => H.visible !== !1).length,
												re = ne.map((H) => {
													const he = H.visible !== !1,
														ae = he && de === 1;
													return {
														label: Pe({
															label: H.title,
															checked: he,
															size: 'sm',
															disabled: ae,
															className: 'ubits-data-table__column-selector-checkbox',
														}).replace('<input', `<input data-column-selector-id="${H.id}"`),
														value: H.id,
														state: 'default',
														selected: !1,
													};
												}),
												W = /* @__PURE__ */ new Set(),
												Y = re.filter((H) => (W.has(H.value) ? !1 : (W.add(H.value), !0)));
											P.innerHTML = '';
											try {
												De({
													containerId: I,
													items: Y,
													size: 'sm',
													maxHeight: '400px',
													className: 'ubits-data-table__column-selector-list',
												});
												const H = document.getElementById(I);
												if (H) {
													const ae =
														H.querySelector('.ubits-list')?.querySelectorAll('.ubits-list-item') ||
														[];
												} else console.error('🔍 [COLUMN SELECTOR UPDATE] ❌ Lista no encontrada');
											} catch (H) {
												console.error('🔍 [COLUMN SELECTOR UPDATE] ❌ Error en createList:', H),
													(P.innerHTML = Re({
														containerId: I,
														items: Y,
														size: 'sm',
														maxHeight: '400px',
														className: 'ubits-data-table__column-selector-list',
													}));
											}
											setTimeout(() => {
												Q();
											}, 50);
										},
										Q = () => {
											A.querySelectorAll('input[data-column-selector-id]').forEach((P) => {
												const T = P,
													z = T.getAttribute('data-column-selector-id'),
													R = T.cloneNode(!0);
												T.parentNode?.replaceChild(R, T),
													R.addEventListener('change', (ne) => {
														if ((ne.stopPropagation(), ne.preventDefault(), R.disabled)) return;
														const de = R.checked,
															re = e.columns.find((W) => W.id === z);
														if (re) {
															if (!de) {
																const Y = e.columns.filter((fe) => {
																		const we = ['drag-handle', 'expand'],
																			Ee = ['checkbox', 'checkbox-2'];
																		return (
																			!we.includes(fe.type || '') &&
																			!Ee.includes(fe.id) &&
																			fe.id !== 'checkbox'
																		);
																	}),
																	H = /* @__PURE__ */ new Set();
																if (
																	Y.filter((fe) => (H.has(fe.id) ? !1 : (H.add(fe.id), !0))).filter(
																		(fe) => (fe.id === z ? !1 : fe.visible !== !1),
																	).length === 0
																) {
																	(R.checked = !0),
																		console.warn(
																			'⚠️ No se pueden ocultar todas las columnas. Debe quedar al menos una columna visible.',
																		);
																	return;
																}
															}
															const W = e.columns.filter((Y) => Y.id === z);
															if (
																((re.visible = de),
																W.length > 1 &&
																	W.forEach((Y, H) => {
																		Y.id === z && (Y.visible = de);
																	}),
																e.onColumnVisibilityChange)
															) {
																const Y = e.columns
																	.filter((H) => H.visible !== !1)
																	.map((H) => H.id);
																console.log(
																	'🔵 [DATA TABLE] Llamando onColumnVisibilityChange con columnas:',
																	Y,
																),
																	e.onColumnVisibilityChange(Y);
															} else
																console.warn(
																	'⚠️ [DATA TABLE] onColumnVisibilityChange no está definido',
																);
															j(), U();
														}
													});
											});
										};
									setTimeout(() => {
										Q();
									}, 100),
										(A.style.display = 'block'),
										requestAnimationFrame(() => {
											w(),
												setTimeout(() => {
													w();
												}, 10);
										}),
										(y = !0),
										(o = () => {
											y && f && w();
										}),
										window.addEventListener('scroll', o, !0),
										window.addEventListener('resize', o),
										(b = (I) => {
											A &&
												!A.contains(I.target) &&
												!v.contains(I.target) &&
												(o &&
													(window.removeEventListener('scroll', o, !0),
													window.removeEventListener('resize', o)),
												p());
										}),
										setTimeout(() => {
											document.addEventListener('click', b);
										}, 0),
										e.header.columnSelectorButton.onClick &&
											e.header.columnSelectorButton.onClick(g);
								});
							}
						}
					}
				}
				try {
					const L = n.querySelector('.ubits-data-table__empty-state');
					if (L && e.emptyState) {
						const v = e.rows.length === 0,
							f = C && C.trim() !== '',
							y = Object.keys($).length > 0;
						let _;
						if (
							(v && e.emptyState.noData
								? (_ = e.emptyState.noData)
								: f && e.emptyState.noSearchResults
									? (_ = e.emptyState.noSearchResults)
									: y && e.emptyState.noFilterResults && (_ = e.emptyState.noFilterResults),
							_)
						) {
							if (_.onAction) {
								const w = L.querySelector('[data-action="primary"]');
								w &&
									w.addEventListener('click', (o) => {
										o.preventDefault(), o.stopPropagation(), _.onAction?.();
									});
							}
							if (_.onSecondaryAction) {
								const w = L.querySelector('[data-action="secondary"]');
								w &&
									w.addEventListener('click', (o) => {
										o.preventDefault(), o.stopPropagation(), _.onSecondaryAction?.();
									});
							}
						}
					}
				} catch (L) {
					console.error('📎 [ATTACH] ❌ Error agregando listeners de empty state:', L);
				}
			} catch (q) {
				console.error('📎 [ATTACH] ❌ Error en attachEventListeners:', q);
			}
		};
	return (
		U(),
		{
			element: n,
			destroy: () => {
				if (B) {
					try {
						B.destroy();
					} catch {}
					B = null;
				}
				if (D) {
					const q =
						n.querySelector('.ubits-data-table__scrollable-container') ||
						n.querySelector('.ubits-data-table') ||
						n;
					q && q.removeEventListener('scroll', D),
						window.removeEventListener('scroll', D, !0),
						(D = null);
				}
				n && n.parentNode && n.parentNode.removeChild(n);
			},
			update: (q) => {
				const X = e.showPagination;
				if (((e = { ...e, ...q }), q.columns)) e.columns = r(q.columns);
				else if (e.columns) {
					const se = e.columns.length;
					(e.columns = r(e.columns)), e.columns.length;
				}
				if (q.showPagination !== void 0 && q.showPagination !== X)
					if (q.showPagination) {
						if (D) {
							const se =
								n.querySelector('.ubits-data-table__scrollable-container') ||
								n.querySelector('.ubits-data-table') ||
								n;
							se && se.removeEventListener('scroll', D),
								window.removeEventListener('scroll', D, !0),
								(D = null);
						}
						J = G;
					} else J = G;
				q.columns && (h = q.columns.filter((se) => se.visible !== !1).map((se) => se.id)),
					q.rows && ((S = q.rows.map((se) => se.id)), (J = G)),
					U();
			},
		}
	);
}
typeof window < 'u' &&
	((window.UBITSDataTable = {
		renderDataTable: Oe,
		createDataTable: Qe,
	}),
	(window.renderDataTable = Oe),
	(window.createDataTable = Qe));
export { Rt as S, Qe as c, Oe as r };
