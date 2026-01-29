(function (De, Ne) {
	typeof exports == 'object' && typeof module < 'u'
		? Ne(exports)
		: typeof define == 'function' && define.amd
			? define(['exports'], Ne)
			: ((De = typeof globalThis < 'u' ? globalThis : De || self), Ne((De.UBITSDataTable = {})));
})(this, function (De) {
	'use strict';
	function Ne(t) {
		const {
				label: c,
				complementaryText: b,
				value: u = '',
				name: d = '',
				checked: r = !1,
				indeterminate: a = !1,
				size: p = 'md',
				state: o = 'default',
				disabled: s = !1,
				className: e = '',
			} = t,
			m = s || o === 'disabled',
			v = [
				'ubits-checkbox',
				`ubits-checkbox--${p}`,
				o !== 'default' ? `ubits-checkbox--${o}` : '',
				r ? 'ubits-checkbox--checked' : '',
				a ? 'ubits-checkbox--indeterminate' : '',
				m ? 'ubits-checkbox--disabled' : '',
				e,
			]
				.filter(Boolean)
				.join(' '),
			h = `
    <input
      type="checkbox"
      id="checkbox-${d}-${u || 'default'}"
      ${d ? `name="${d}"` : ''}
      ${u ? `value="${u}"` : ''}
      ${r ? 'checked' : ''}
      ${a ? 'data-indeterminate="true"' : ''}
      ${m ? 'disabled' : ''}
      class="ubits-checkbox__input"
    />
  `,
			l = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${a ? '<span class="ubits-checkbox__indeterminate"></span>' : ''}
      ${r && !a ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
      ${!r && !a && o === 'active' ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
    </span>
  `,
			w = `
    <span class="ubits-checkbox__label">${c}</span>
  `,
			S = b ? `<span class="ubits-checkbox__complementary-text">${b}</span>` : '',
			k = `
    <div class="ubits-checkbox__text-content">
      ${w}
      ${S}
    </div>
  `;
		return `
    <label class="${v}">
      ${h}
      ${l}
      ${k}
    </label>
  `.trim();
	}
	const Ze = {
			yellow: 'var(--ubits-fg-yellow-subtle-inverted, #ffd555)',
			green: 'var(--ubits-feedback-accent-success, #56ce51)',
			gray: 'var(--ubits-bg-4, #dbdde0)',
			info: 'var(--ubits-feedback-accent-info-static-inverted, #4a74ee)',
			error: 'var(--ubits-button-badge, #cf0e34)',
		},
		lt = {
			xs: { height: 4, indicatorFontSize: 'var(--font-body-xs-size, 11px)' },
			sm: { height: 8, indicatorFontSize: 'var(--font-body-sm-size, 13px)' },
			md: { height: 16, indicatorFontSize: 'var(--font-body-md-size, 16px)' },
			lg: { height: 20, indicatorFontSize: 'var(--font-body-lg-size, 18px)' },
		};
	function rt(t) {
		const {
				size: c = 'md',
				value: b = 0,
				variant: u = 'default',
				segments: d = [],
				indicator: r,
				className: a = '',
			} = t,
			p = lt[c],
			o = [
				'ubits-progress-bar',
				`ubits-progress-bar--${c}`,
				u === 'multi-color' ? 'ubits-progress-bar--multi-color' : '',
				a,
			]
				.filter(Boolean)
				.join(' ');
		let s = '';
		r !== void 0 &&
			r !== !1 &&
			(s = `<span class="ubits-progress-bar__indicator">${typeof r == 'string' ? r : `${Math.round(b)}%`}</span>`);
		let e = '';
		if (u === 'multi-color' && d.length > 0) {
			const m = d.reduce((w, S) => w + S.value, 0),
				v = Math.max(0, 100 - m),
				h = [...d];
			v > 0 && h.push({ value: v, color: 'gray' }),
				(e = `<div class="ubits-progress-bar__indicator-wrapper">${h
					.map((w, S) => {
						const k = w.value,
							F = Ze[w.color] || Ze.gray,
							I = S === 0,
							T = S === h.length - 1;
						return `<div 
        class="ubits-progress-bar__segment" 
        style="width: ${k}%; background-color: ${F}; ${`border-radius: ${I ? '1000px 0 0 1000px' : T ? '0 1000px 1000px 0' : '0'};`}"
        data-color="${w.color}"
      ></div>`;
					})
					.join('')}</div>`);
		} else
			e = `<div 
      class="ubits-progress-bar__indicator-wrapper" 
      style="width: ${Math.max(0, Math.min(100, b))}%;"
    ></div>`;
		return `
    <div class="${o}" style="height: ${p.height}px;">
      <div class="ubits-progress-bar__container">
        ${e}
      </div>
      ${s}
    </div>
  `.trim();
	}
	const Je = {
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
	function ct(t = {}) {
		const {
				label: c = '',
				size: b = 'md',
				status: u = 'pending',
				leftIcon: d,
				rightIcon: r = 'chevron-down',
				clickable: a = !1,
				className: p = '',
			} = t,
			o = Je[u] || Je.pending,
			s = d ? `<span class="ubits-status-tag-left-icon"><i class="far fa-${d}"></i></span>` : '',
			e =
				r != null
					? `<span class="ubits-status-tag-right-icon"><i class="far fa-${r}"></i></span>`
					: '',
			m = ['ubits-status-tag', `ubits-status-tag--${b}`, a ? 'ubits-status-tag--clickable' : '', p]
				.filter(Boolean)
				.join(' '),
			l = `
    ${u === 'draft' || u === 'in-progress' || u === 'syncing' ? `background: linear-gradient(90deg, rgba(12, 91, 239, 0.15) 0%, rgba(12, 91, 239, 0.15) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%); background-color: ${o.bg};` : `background-color: ${o.bg};`}
    color: ${o.text};
    border-color: ${o.border};
  `.trim();
		return `
    <span class="${m}" style="${l}" data-status="${u}">
      ${s}
      <span class="ubits-status-tag-label">${c}</span>
      ${e}
    </span>
  `.trim();
	}
	function dt(t) {
		if (typeof window.renderBadge == 'function') return window.renderBadge(t);
		const { type: c, size: b, variant: u, absolute: d, position: r, className: a, content: p } = t,
			o = [
				'ubits-badge',
				`ubits-badge--${b}`,
				c === 'dot' ? 'ubits-badge--dot' : '',
				c === 'number' ? 'ubits-badge--number' : '',
				`ubits-badge--${u}`,
				d ? 'ubits-badge--absolute' : '',
				d && r ? `ubits-badge--absolute-${r}` : '',
				a,
			]
				.filter(Boolean)
				.join(' '),
			s = c === 'number' && p !== void 0 && p !== null ? String(p) : '';
		return `<span class="${o}">${s}</span>`;
	}
	const Qe = { xs: 20, sm: 28, md: 36, lg: 40 },
		ut = 'md',
		bt = { green: 'success', red: 'error', blue: 'info', orange: 'warning', gray: 'primary' },
		et = { xs: 6, sm: 8, md: 10, lg: 10 },
		tt = {
			xs: 'var(--font-body-xs-size, 11px)',
			sm: 'var(--font-body-sm-size, 13px)',
			md: 'var(--font-body-md-size, 16px)',
			lg: 'var(--font-body-lg-size, 18px)',
		};
	function pt(t) {
		return t.imageUrl ? 'photo' : t.initials ? 'initials' : 'icon';
	}
	function mt(t) {
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
				initials: b,
				icon: u = 'user',
				size: d = 'md',
				badgeColor: r,
				badgeContent: a,
				alt: p = 'Avatar',
				className: o = '',
				onClick: s,
			} = t,
			e = pt(t),
			m = Qe[d] || Qe.md,
			v = et[d] || et.md,
			h = tt[d] || tt.md,
			l = ['ubits-avatar', `ubits-avatar--${d}`, `ubits-avatar--${e}`, o].filter(Boolean).join(' '),
			w = `
    width: ${m}px;
    height: ${m}px;
    min-width: ${m}px;
    min-height: ${m}px;
  `.trim();
		let S = '';
		if (e === 'photo' && c)
			S = `<div class="ubits-avatar-image-container"><img src="${c}" alt="${p}" class="ubits-avatar-image" /></div>`;
		else if (e === 'initials') {
			const F = b ? mt(b) : '';
			S = `<span class="ubits-avatar-initials" style="font-size: ${h};">${F}</span>`;
		} else {
			const F = m - v * 2;
			S = `<i class="far fa-${u}" style="font-size: ${F}px;"></i>`;
		}
		const k = r
			? dt({
					type: a != null && a !== '' ? 'number' : 'dot',
					size: ut,
					variant: bt[r] || 'success',
					absolute: !0,
					position: 'bottom-right',
					className: 'ubits-avatar-badge-wrapper',
					content: a,
				})
			: '';
		return `
    <div class="${l}" style="${w}" ${s ? 'role="button" tabindex="0"' : ''} data-variant="${e}">
      ${S}
      ${k}
    </div>
  `.trim();
	}
	function ft(t) {
		const {
				label: c,
				complementaryText: b,
				value: u = '',
				name: d = '',
				checked: r = !1,
				size: a = 'md',
				state: p = 'default',
				disabled: o = !1,
				className: s = '',
			} = t,
			e = o || p === 'disabled',
			m = [
				'ubits-toggle',
				`ubits-toggle--${a}`,
				p !== 'default' ? `ubits-toggle--${p}` : '',
				r ? 'ubits-toggle--checked' : '',
				e ? 'ubits-toggle--disabled' : '',
				s,
			]
				.filter(Boolean)
				.join(' '),
			v = `
    <input
      type="checkbox"
      id="toggle-${d}-${u || 'default'}"
      ${d ? `name="${d}"` : ''}
      ${u ? `value="${u}"` : ''}
      ${r ? 'checked' : ''}
      ${e ? 'disabled' : ''}
      class="ubits-toggle__input"
      role="switch"
      aria-checked="${r}"
    />
  `,
			h = `
    <span class="ubits-toggle__track" aria-hidden="true">
      <span class="ubits-toggle__thumb"></span>
    </span>
  `;
		let l = '';
		if (c || b) {
			const k = c ? `<span class="ubits-toggle__label">${c}</span>` : '',
				F = b ? `<span class="ubits-toggle__complementary-text">${b}</span>` : '';
			l = `
      <div class="ubits-toggle__text-content">
        ${k}
        ${F}
      </div>
    `;
		}
		const w = c || b ? 'label' : 'div',
			S = c || b ? m : `${m} ubits-toggle--no-label`;
		return `
    <${w} class="${S}">
      ${v}
      ${l}
      ${h}
    </${w}>
  `.trim();
	}
	function gt(t) {
		const {
				label: c,
				complementaryText: b,
				value: u,
				name: d,
				checked: r = !1,
				size: a = 'md',
				state: p = 'default',
				disabled: o = !1,
				className: s = '',
			} = t,
			e = o || p === 'disabled',
			m = [
				'ubits-radio-button',
				`ubits-radio-button--${a}`,
				p !== 'default' ? `ubits-radio-button--${p}` : '',
				r ? 'ubits-radio-button--checked' : '',
				e ? 'ubits-radio-button--disabled' : '',
				s,
			]
				.filter(Boolean)
				.join(' '),
			v = `
    <input
      type="radio"
      id="radio-${d}-${u}"
      name="${d}"
      value="${u}"
      ${r ? 'checked' : ''}
      ${e ? 'disabled' : ''}
      class="ubits-radio-button__input"
    />
  `,
			h = `
    <span class="ubits-radio-button__circle" aria-hidden="true">
      ${r || (p === 'active' && !r) ? '<span class="ubits-radio-button__dot"></span>' : ''}
    </span>
  `,
			l = `
    <span class="ubits-radio-button__label">${c}</span>
  `,
			w = b ? `<span class="ubits-radio-button__complementary-text">${b}</span>` : '',
			S = `
    <div class="ubits-radio-button__text-content">
      ${l}
      ${w}
    </div>
  `;
		return `
    <label class="${m}">
      ${v}
      ${h}
      ${S}
    </label>
  `.trim();
	}
	function Oe(t) {
		const {
				items: c,
				size: b = 'md',
				maxHeight: u = '400px',
				className: d = '',
				attributes: r = {},
			} = t,
			a = ['ubits-list', d].filter(Boolean).join(' '),
			p = Object.entries(r)
				.map(([s, e]) => `${s}="${e}"`)
				.join(' ');
		let o = `<div class="${a}" role="list" style="max-height: ${u};" ${p}>`;
		return (
			c.forEach((s, e) => {
				const m = s.value || `list-item-${e}`,
					v = s.state || (s.selected ? 'active' : 'default'),
					h = [
						'ubits-list-item',
						`ubits-list-item--${b}`,
						v !== 'default' ? `ubits-list-item--${v}` : '',
					]
						.filter(Boolean)
						.join(' '),
					l = [];
				s.selected && l.push('aria-selected="true"'),
					v === 'disabled' ? l.push('aria-disabled="true"') : l.push('tabindex="0"'),
					l.push(`data-value="${m}"`),
					l.push(`data-index="${e}"`),
					s.attributes &&
						Object.entries(s.attributes).forEach(([w, S]) => {
							l.push(`${w}="${S}"`);
						}),
					(o += `
      <div class="${h}" role="listitem" ${l.join(' ')}>
        ${s.label}
      </div>
    `);
			}),
			(o += '</div>'),
			o
		);
	}
	function Me(t) {
		const { containerId: c, items: b, size: u = 'md', onSelectionChange: d, multiple: r = !1 } = t,
			a = document.getElementById(c);
		if (!a) throw new Error(`Container with id "${c}" not found`);
		const p = Oe(t);
		a.innerHTML = p;
		const o = a.querySelector('.ubits-list');
		if (!o) throw new Error('Failed to create list element');
		const s = o.querySelectorAll('.ubits-list-item');
		let e = null;
		return (
			s.forEach((m, v) => {
				const h = b[v];
				h &&
					(h.state !== 'disabled' &&
						m.addEventListener('click', () => {
							if ((h.onClick && h.onClick(h, v), r)) {
								if (
									(m.classList.contains('ubits-list-item--active')
										? (m.classList.remove('ubits-list-item--active'),
											m.removeAttribute('aria-selected'))
										: (m.classList.add('ubits-list-item--active'),
											m.setAttribute('aria-selected', 'true')),
									d)
								) {
									const w = Array.from(s)
										.map((S, k) =>
											S.classList.contains('ubits-list-item--active')
												? { item: b[k], index: k }
												: null,
										)
										.filter(Boolean);
									if (w.length > 0) {
										const S = w[w.length - 1];
										d(S.item, S.index);
									} else d(null, null);
								}
							} else {
								if (e !== null && e !== v) {
									const l = s[e];
									l.classList.remove('ubits-list-item--active'), l.removeAttribute('aria-selected');
								}
								e !== v
									? (m.classList.add('ubits-list-item--active'),
										m.setAttribute('aria-selected', 'true'),
										(e = v),
										d && d(h, v))
									: (m.classList.remove('ubits-list-item--active'),
										m.removeAttribute('aria-selected'),
										(e = null),
										d && d(null, null));
							}
						}),
					h.state !== 'disabled' &&
						m.addEventListener('keydown', (l) => {
							const w = v;
							let S = null;
							if (l.key === 'ArrowDown') l.preventDefault(), (S = w < b.length - 1 ? w + 1 : 0);
							else if (l.key === 'ArrowUp') l.preventDefault(), (S = w > 0 ? w - 1 : b.length - 1);
							else if (l.key === 'Enter' || l.key === ' ') {
								l.preventDefault(), m.click();
								return;
							} else
								l.key === 'Home'
									? (l.preventDefault(), (S = 0))
									: l.key === 'End' && (l.preventDefault(), (S = b.length - 1));
							if (S !== null) {
								const k = s[S];
								k &&
									b[S]?.state !== 'disabled' &&
									(k.focus(), k.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
							}
						}));
			}),
			o
		);
	}
	function ht(t = {}) {
		const {
				size: c = 'md',
				variant: b = 'primary',
				animated: u = !0,
				label: d,
				fullScreen: r = !1,
				className: a = '',
				style: p = '',
			} = t,
			o = [
				'ubits-spinner',
				`ubits-spinner--${c}`,
				`ubits-spinner--${b}`,
				u ? 'ubits-spinner--animated' : '',
				r ? 'ubits-spinner--fullscreen' : '',
				a,
			]
				.filter(Boolean)
				.join(' '),
			s = p ? ` style="${p}"` : '';
		return `
    <div class="${o}"${s}>
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
	function Re(t, c = 'regular') {
		try {
			const b = c === 'solid' ? 'fas' : 'far',
				u = t.startsWith('fa-') ? t : `fa-${t}`;
			return `<i class="${b} ${u}"></i>`;
		} catch {
			const u = c === 'solid' ? 'fas' : 'far',
				d = t.startsWith('fa-') ? t : `fa-${t}`;
			return `<i class="${u} ${d}"></i>`;
		}
	}
	function $e(t) {
		const {
				variant: c = 'primary',
				size: b = 'md',
				text: u = '',
				icon: d,
				iconStyle: r = 'regular',
				iconOnly: a = !1,
				disabled: p = !1,
				loading: o = !1,
				loadingText: s,
				badge: e = !1,
				active: m = !1,
				fullWidth: v = !1,
				block: h = !1,
				iconPosition: l = 'left',
				className: w = '',
				attributes: S = {},
				dropdown: k = !1,
				showTooltip: F = !1,
				tooltipText: I = '',
			} = t,
			T = [
				'ubits-button',
				`ubits-button--${c}`,
				`ubits-button--${b}`,
				m && 'ubits-button--active',
				a && 'ubits-button--icon-only',
				o && 'ubits-button--loading',
				v && 'ubits-button--full-width',
				h && 'ubits-button--block',
				l === 'right' && 'ubits-button--icon-right',
				k && 'ubits-button--dropdown',
				w,
			]
				.filter(Boolean)
				.join(' '),
			q = [
				p && 'disabled',
				o && 'data-loading="true"',
				o && 'aria-busy="true"',
				...Object.entries(S).map(([re, V]) => `${re}="${V}"`),
			]
				.filter(Boolean)
				.join(' ');
		let j = '';
		d && (j = Re(d, r));
		let ee = j,
			Q = l;
		k && !d && u
			? ((ee = Re('chevron-down', r)), (Q = 'right'))
			: k && d && l === 'left' && u
				? (ee = `${j}${Re('chevron-down', r)}`)
				: k && !u && (ee = d ? `${j}${Re('chevron-down', r)}` : Re('chevron-down', r));
		const K = { xs: 'xs', sm: 'sm', md: 'sm', lg: 'md', xl: 'lg' }[b] || 'sm',
			ce =
				{ primary: 'primary', secondary: 'secondary', tertiary: 'secondary', active: 'primary' }[
					c
				] || 'primary',
			de = o ? ht({ size: K, variant: ce, animated: !0, className: 'ubits-button__spinner' }) : '';
		let Y = '';
		o && s
			? (Y = `${de}<span class="button-text">${s}</span>`)
			: o && !u
				? (Y = de)
				: o && u
					? l === 'right'
						? (Y = `<span class="button-text">${u}</span>${de}`)
						: (Y = `${de}<span class="button-text">${u}</span>`)
					: a && d
						? (Y = j)
						: ee && u
							? k && d && l === 'left'
								? (Y = `${Re(d, r)}<span>${u}</span>${Re('chevron-down', r)}`)
								: Q === 'right'
									? (Y = `<span>${u}</span>${ee}`)
									: (Y = `${ee}<span>${u}</span>`)
							: u
								? (Y = k ? `<span>${u}</span>${Re('chevron-down', r)}` : `<span>${u}</span>`)
								: ee && (Y = ee);
		const me = e ? '<span class="ubits-button__badge"></span>' : '',
			ie = a && F && I ? `title="${I}"` : '';
		return `
    <button class="${T}" ${q} ${ie}>
      ${Y}
      ${me}
    </button>
  `.trim();
	}
	function ot(t) {
		const { orientation: c = 'vertical', state: b = 'default', className: u = '' } = t;
		return `
    <div class="${['ubits-scrollbar', `ubits-scrollbar--${c}`, b ? `ubits-scrollbar--${b}` : '', u].filter(Boolean).join(' ')}">
      <div class="ubits-scrollbar__bar"></div>
    </div>
  `.trim();
	}
	function je(t) {
		const {
			containerId: c,
			targetId: b,
			orientation: u = 'vertical',
			state: d = 'default',
			className: r = '',
		} = t;
		let a;
		c ? (a = document.getElementById(c) || document.body) : (a = document.body);
		const p = document.createElement('div');
		p.innerHTML = ot({ orientation: u, state: d, className: r });
		const o = p.firstElementChild;
		if (!o) throw new Error('No se pudo crear el scrollbar');
		const s = o.querySelector('.ubits-scrollbar__bar');
		if (!s) throw new Error('No se pudo encontrar la barra del scrollbar');
		let e = null;
		if (b) e = document.getElementById(b);
		else if (c) {
			const I = a.querySelector('[data-scrollable]');
			I && (e = I);
		}
		const m = () => {
				if (!e || !s) return;
				const I = u === 'vertical',
					T = I ? 'scrollTop' : 'scrollLeft',
					q = I ? 'clientHeight' : 'clientWidth',
					j = I ? 'scrollHeight' : 'scrollWidth',
					ee = e[T],
					Q = e[q],
					J = e[j];
				if (J <= Q) {
					s.style.opacity = '0';
					return;
				}
				const K = I ? o.clientHeight : o.clientWidth,
					D = Math.max((Q / J) * K, 20),
					ce = K - D,
					de = (ee / (J - Q)) * ce;
				I
					? ((s.style.height = `${D}px`), (s.style.transform = `translateY(${de}px)`))
					: ((s.style.width = `${D}px`), (s.style.transform = `translateX(${de}px)`)),
					(s.style.opacity = '1');
			},
			v = (I) => {
				if (!e || !s || I.target === s) return;
				I.preventDefault(), I.stopPropagation();
				const T = u === 'vertical',
					q = o.getBoundingClientRect(),
					j = T ? I.clientY - q.top : I.clientX - q.left,
					ee = T ? o.clientHeight : o.clientWidth,
					Q = j / ee,
					J = T ? 'clientHeight' : 'clientWidth',
					K = T ? 'scrollHeight' : 'scrollWidth',
					D = T ? 'scrollTop' : 'scrollLeft',
					ce = e[J],
					Y = e[K] - ce;
				e[D] = Q * Y;
			};
		let h = !1,
			l = 0,
			w = 0;
		const S = (I) => {
				if (!e || !s || I.target !== s) return;
				I.preventDefault(), I.stopPropagation(), (h = !0);
				const T = u === 'vertical';
				(l = T ? I.clientY : I.clientX),
					(w = T ? e.scrollTop : e.scrollLeft),
					document.addEventListener('mousemove', k),
					document.addEventListener('mouseup', F);
			},
			k = (I) => {
				if (!h || !e || !s) return;
				const T = u === 'vertical',
					j = (T ? I.clientY : I.clientX) - l,
					ee = T ? o.clientHeight : o.clientWidth,
					Q = T ? e.clientHeight : e.clientWidth,
					K = (T ? e.scrollHeight : e.scrollWidth) - Q,
					D = K / ee,
					ce = w + j * D;
				T
					? (e.scrollTop = Math.max(0, Math.min(K, ce)))
					: (e.scrollLeft = Math.max(0, Math.min(K, ce)));
			},
			F = () => {
				(h = !1),
					document.removeEventListener('mousemove', k),
					document.removeEventListener('mouseup', F);
			};
		if (e) {
			e.addEventListener('scroll', m), e.addEventListener('resize', m);
			const I = new ResizeObserver(() => {
				m();
			});
			I.observe(e), (o.__resizeObserver = I);
		}
		return (
			o.addEventListener('click', v),
			s.addEventListener('mousedown', S),
			(o.__handleMouseUp = F),
			(o.__handleMouseMove = k),
			a.appendChild(o),
			setTimeout(() => {
				m();
			}, 100),
			{
				element: o,
				update: m,
				destroy: () => {
					if (e) {
						e.removeEventListener('scroll', m), e.removeEventListener('resize', m);
						const I = o.__resizeObserver;
						I && I.disconnect();
					}
					o.removeEventListener('click', v),
						s.removeEventListener('mousedown', S),
						o.__handleMouseUp &&
							(document.removeEventListener('mousemove', o.__handleMouseMove),
							document.removeEventListener('mouseup', o.__handleMouseUp)),
						o.remove();
				},
			}
		);
	}
	const yt = Object.freeze(
		Object.defineProperty(
			{ __proto__: null, createScrollbar: je, renderScrollbar: ot },
			Symbol.toStringTag,
			{ value: 'Module' },
		),
	);
	function vt(t, c, b) {
		const u = [];
		if (c <= b) for (let d = 1; d <= c; d++) u.push(d);
		else {
			const d = Math.floor(b / 2);
			let r = Math.max(1, t - d),
				a = Math.min(c, r + b - 1);
			a - r < b - 1 && (r = Math.max(1, a - b + 1));
			for (let p = r; p <= a; p++) u.push(p);
		}
		return u;
	}
	function Et(t, c, b = 'md', u) {
		return $e({
			variant: c ? 'secondary' : 'tertiary',
			size: b === 'sm' ? 'sm' : b === 'lg' ? 'lg' : 'md',
			text: String(t),
			active: c,
			className: 'ubits-pagination__page-button',
		});
	}
	function Ct(t) {
		const {
				currentPage: c = 1,
				totalPages: b,
				totalItems: u,
				itemsPerPage: d,
				variant: r = 'default',
				size: a = 'md',
				maxVisiblePages: p = 7,
				showFirst: o = !0,
				showLast: s = !0,
				showPrevNext: e = !0,
				showInfo: m = !1,
				showItemsPerPage: v = !1,
				itemsPerPageOptions: h = [10, 20, 50, 100],
				className: l = '',
				attributes: w = {},
				labels: S = {},
			} = t,
			k = Math.max(1, Math.min(c, b)),
			F = ['ubits-pagination', `ubits-pagination--${r}`, `ubits-pagination--${a}`, l]
				.filter(Boolean)
				.join(' '),
			I = [...Object.entries(w).map(([J, K]) => `${J}="${K}"`)].filter(Boolean).join(' '),
			T = {
				first: 'Primera',
				last: 'Última',
				previous: 'Anterior',
				next: 'Siguiente',
				page: 'Página',
				of: 'de',
				items: 'items',
				itemsPerPage: 'Por página',
				...S,
			};
		let q = '';
		if (m && u !== void 0) {
			const J = (k - 1) * (d || 10) + 1,
				K = Math.min(k * (d || 10), u);
			q = `
      <div class="ubits-pagination__info">
        <span class="ubits-body-sm">${J}-${K} ${T.of} ${u} ${T.items}</span>
      </div>
    `;
		}
		let j = '';
		if (v) {
			const J = `ubits-pagination-items-per-page-${Date.now()}`;
			j = `
      <div class="ubits-pagination__items-per-page">
        <label for="${J}" class="ubits-body-sm">${T.itemsPerPage}:</label>
        <select id="${J}" class="ubits-pagination__select ubits-body-sm">
          ${h.map((K) => `<option value="${K}" ${K === d ? 'selected' : ''}>${K}</option>`).join('')}
        </select>
      </div>
    `;
		}
		const ee = a === 'sm' ? 'sm' : a === 'lg' ? 'lg' : 'md',
			Q = [];
		if (
			(o &&
				r === 'default' &&
				Q.push(
					$e({
						variant: 'tertiary',
						size: ee,
						icon: 'angle-double-left',
						iconStyle: 'solid',
						iconOnly: !0,
						disabled: k === 1,
						className: 'ubits-pagination__nav-button',
						attributes: { 'aria-label': T.first, title: T.first },
					}),
				),
			e &&
				Q.push(
					$e({
						variant: 'tertiary',
						size: ee,
						icon: 'chevron-left',
						iconStyle: 'solid',
						iconOnly: !0,
						disabled: k === 1,
						className: 'ubits-pagination__nav-button',
						attributes: { 'aria-label': T.previous, title: T.previous },
					}),
				),
			r === 'default')
		) {
			const J = vt(k, b, p);
			J[0] > 1 && Q.push('<span class="ubits-pagination__ellipsis">...</span>'),
				J.forEach((K) => {
					Q.push(Et(K, K === k, a));
				}),
				J[J.length - 1] < b && Q.push('<span class="ubits-pagination__ellipsis">...</span>');
		} else
			r === 'compact' &&
				Q.push(`
      <span class="ubits-pagination__page-info ubits-body-md">
        ${T.page} ${k} ${T.of} ${b}
      </span>
    `);
		return (
			e &&
				Q.push(
					$e({
						variant: 'tertiary',
						size: ee,
						icon: 'chevron-right',
						iconStyle: 'solid',
						iconOnly: !0,
						disabled: k === b,
						className: 'ubits-pagination__nav-button',
						attributes: { 'aria-label': T.next, title: T.next },
					}),
				),
			s &&
				r === 'default' &&
				Q.push(
					$e({
						variant: 'tertiary',
						size: ee,
						icon: 'angle-double-right',
						iconStyle: 'solid',
						iconOnly: !0,
						disabled: k === b,
						className: 'ubits-pagination__nav-button',
						attributes: { 'aria-label': T.last, title: T.last },
					}),
				),
			`
    <div class="${F}" ${I} data-current-page="${k}" data-total-pages="${b}">
      ${q}
      ${j}
      <div class="ubits-pagination__controls">
        ${Q.join('')}
      </div>
    </div>
  `
		);
	}
	function Lt() {
		return `
    <i class="far fa-magnifying-glass ubits-search-button__icon" aria-hidden="true"></i>
  `;
	}
	function xt() {
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
	function We(t) {
		const {
				active: c = !1,
				size: b = 'md',
				state: u = 'default',
				disabled: d = !1,
				placeholder: r = '',
				value: a = '',
				width: p = 248,
				className: o = '',
			} = t,
			s = d || u === 'disabled',
			e = c || u === 'active',
			m = Lt(),
			h = a && a.trim().length > 0 ? xt() : '';
		if (e) {
			const w = [
					'ubits-search-button',
					'ubits-search-button--active',
					`ubits-search-button--${b}`,
					s ? 'ubits-search-button--disabled' : '',
					o,
				]
					.filter(Boolean)
					.join(' '),
				S = p ? `width: ${p}px;` : '';
			return `
      <div class="${w}" style="${S}">
        <div class="ubits-search-button__input-wrapper">
          ${m}
          <input
            type="text"
            class="ubits-search-button__input"
            placeholder="${r}"
            value="${a}"
            ${s ? 'disabled' : ''}
            aria-label="Buscar"
          />
          ${h}
        </div>
      </div>
    `.trim();
		}
		return `
    <button
      type="button"
      class="${['ubits-button', 'ubits-button--secondary', 'ubits-button--icon-only', `ubits-button--${b}`, u === 'hover' ? 'ubits-search-button--force-hover' : '', o].filter(Boolean).join(' ')}"
      ${s ? 'disabled' : ''}
      aria-label="Buscar"
    >
      ${m}
    </button>
  `.trim();
	}
	function wt(t) {
		const c = t.containerId ? document.getElementById(t.containerId) : document.body;
		if (!c) throw new Error(`Container with id "${t.containerId}" not found`);
		const b = We(t),
			u = document.createElement('div');
		u.innerHTML = b.trim();
		const d = u.firstElementChild;
		if (!d) throw new Error('Failed to create search button element');
		if ((c.appendChild(d), t.active || t.state === 'active')) {
			const o = d.querySelector('.ubits-search-button__input'),
				s = d.querySelector('.ubits-search-button__clear');
			o &&
				(t.onChange &&
					(o.addEventListener('input', t.onChange), o.addEventListener('change', t.onChange)),
				t.onFocus && o.addEventListener('focus', t.onFocus),
				t.onBlur && o.addEventListener('blur', t.onBlur)),
				s &&
					s.addEventListener('click', function (e) {
						if (
							(e.preventDefault(),
							e.stopPropagation(),
							o && ((o.value = ''), o.focus(), t.onChange))
						) {
							const m = new Event('input', { bubbles: !0 });
							o.dispatchEvent(m);
						}
					});
		} else {
			const o = d;
			o && t.onClick && o.addEventListener('click', t.onClick);
		}
		return {
			element: d,
			destroy: () => {
				d.parentNode && d.parentNode.removeChild(d);
			},
			update: (o) => {
				const s = { ...t, ...o },
					e = We(s),
					m = document.createElement('div');
				m.innerHTML = e.trim();
				const v = m.firstElementChild;
				if (v && d.parentNode)
					if ((d.parentNode.replaceChild(v, d), s.active || s.state === 'active')) {
						const l = v.querySelector('.ubits-search-button__input'),
							w = v.querySelector('.ubits-search-button__clear');
						l &&
							(s.onChange &&
								(l.addEventListener('input', s.onChange), l.addEventListener('change', s.onChange)),
							s.onFocus && l.addEventListener('focus', s.onFocus),
							s.onBlur && l.addEventListener('blur', s.onBlur)),
							w &&
								w.addEventListener('click', function (S) {
									if (
										(S.preventDefault(),
										S.stopPropagation(),
										l && ((l.value = ''), l.focus(), s.onChange))
									) {
										const k = new Event('input', { bubbles: !0 });
										l.dispatchEvent(k);
									}
								});
					} else {
						const l = v;
						l && s.onClick && l.addEventListener('click', s.onClick);
					}
			},
		};
	}
	function St(t) {
		const {
				title: c,
				complementaryText: b,
				width: u = 40,
				bodyContent: d = '',
				footerButtons: r,
				className: a = '',
			} = t,
			o = ['ubits-drawer', `ubits-drawer--width-${u}`, a].filter(Boolean).join(' '),
			s = `
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${c}</p>
        </div>
        ${
					b
						? `
        <div class="ubits-drawer__header-complementary">
          <p class="ubits-body-sm-regular">${b}</p>
        </div>
        `
						: ''
				}
      </div>
      ${$e({ variant: 'secondary', size: 'md', icon: 'fa-times', iconOnly: !0, className: 'ubits-drawer__close' })}
    </div>
  `,
			m = `
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${typeof d == 'function' ? d() : d || '<div class="ubits-drawer__placeholder">Contenido del drawer</div>'}
      </div>
      <div class="ubits-drawer__scrollbar">
        <div class="ubits-drawer__scrollbar-bar"></div>
      </div>
    </div>
  `,
			v = r
				? `
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        ${
					r.tertiary
						? `
        <div class="ubits-drawer__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${r.tertiary.label}</span>
          </button>
        </div>
        `
						: ''
				}
        <div class="ubits-drawer__footer-right">
          ${
						r.secondary
							? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${r.secondary.label}</span>
          </button>
          `
							: ''
					}
          ${
						r.primary
							? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${r.primary.label}</span>
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
        ${s}
        ${m}
        ${v}
      </div>
    </div>
  `.trim();
	}
	function nt(t) {
		const { containerId: c, onClose: b, closeOnOverlayClick: u = !0, open: d = !1 } = t;
		let r;
		c ? (r = document.getElementById(c) || document.body) : (r = document.body);
		const a = document.createElement('div');
		a.innerHTML = St(t);
		const p = a.firstElementChild;
		if (!p) throw new Error('No se pudo crear el drawer');
		p.querySelector('.ubits-drawer');
		const o = p.querySelector('.ubits-drawer__close'),
			s = p,
			e = () => {
				p.classList.add('ubits-drawer-overlay--open'), (document.body.style.overflow = 'hidden');
			},
			m = () => {
				p.classList.remove('ubits-drawer-overlay--open'),
					(document.body.style.overflow = ''),
					b && b();
			},
			v = (l) => {
				const w = p.querySelector('.ubits-drawer__body-content');
				if (w) {
					const S = typeof l == 'function' ? l() : l;
					w.innerHTML = S;
				}
			};
		o &&
			o.addEventListener('click', (l) => {
				l.preventDefault(), l.stopPropagation(), m();
			}),
			u &&
				s &&
				s.addEventListener('click', (l) => {
					l.target === s && m();
				});
		const h = (l) => {
			l.key === 'Escape' && p.classList.contains('ubits-drawer-overlay--open') && m();
		};
		if ((document.addEventListener('keydown', h), t.footerButtons)) {
			const l = p.querySelector('.ubits-drawer__footer-left .ubits-drawer__footer-button'),
				w = p.querySelector('.ubits-drawer__footer-right .ubits-button--secondary'),
				S = p.querySelector('.ubits-drawer__footer-right .ubits-button--primary');
			l &&
				t.footerButtons.tertiary?.onClick &&
				l.addEventListener('click', (k) => {
					k.preventDefault(), t.footerButtons.tertiary.onClick(k);
				}),
				w &&
					t.footerButtons.secondary?.onClick &&
					w.addEventListener('click', (k) => {
						k.preventDefault(), t.footerButtons.secondary.onClick(k);
					}),
				S &&
					t.footerButtons.primary?.onClick &&
					S.addEventListener('click', (k) => {
						k.preventDefault(), t.footerButtons.primary.onClick(k);
					});
		}
		return r.appendChild(p), d && e(), { element: p, open: e, close: m, updateContent: v };
	}
	const at = { sm: '320px', md: '480px', lg: '640px', xl: '800px', full: '1280px' };
	function Tt(t) {
		const {
				title: c,
				bodyContent: b = '',
				size: u = 'md',
				fullScreen: d = !1,
				footerButtons: r,
				className: a = '',
			} = t,
			p = at[u] || at.md,
			e = ['ubits-modal', `ubits-modal--size-${u}`, d ? 'ubits-modal--full-screen' : '', a]
				.filter(Boolean)
				.join(' '),
			m = `
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
			h = `
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${typeof b == 'function' ? b() : b || '<div class="ubits-modal__placeholder">Contenido del modal</div>'}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `,
			l = r
				? `
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${
					r.tertiary
						? `
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${r.tertiary.label}</span>
          </button>
        </div>
        `
						: ''
				}
        <div class="ubits-modal__footer-right">
          ${
						r.secondary
							? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${r.secondary.label}</span>
          </button>
          `
							: ''
					}
          ${
						r.primary
							? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${r.primary.label}</span>
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
      <div class="${e}" style="max-width: ${p};">
        ${m}
        ${h}
        ${l}
      </div>
    </div>
  `.trim();
	}
	function Ge(t) {
		const { containerId: c, onClose: b, closeOnOverlayClick: u = !0, open: d = !1 } = t;
		let r;
		c ? (r = document.getElementById(c) || document.body) : (r = document.body);
		const a = document.createElement('div');
		a.innerHTML = Tt(t);
		const p = a.firstElementChild;
		if (!p) throw new Error('No se pudo crear el modal');
		p.querySelector('.ubits-modal');
		const o = p.querySelector('.ubits-modal__close'),
			s = p,
			e = () => {
				p.classList.add('ubits-modal-overlay--open'), (document.body.style.overflow = 'hidden');
			},
			m = () => {
				p.classList.remove('ubits-modal-overlay--open'),
					(document.body.style.overflow = ''),
					b && b();
			},
			v = (l) => {
				const w = p.querySelector('.ubits-modal__body-content');
				if (w) {
					const S = typeof l == 'function' ? l() : l;
					w.innerHTML = S;
				}
			};
		o &&
			o.addEventListener('click', (l) => {
				l.preventDefault(), l.stopPropagation(), m();
			}),
			u &&
				s &&
				s.addEventListener('click', (l) => {
					l.target === s && m();
				});
		const h = (l) => {
			l.key === 'Escape' && p.classList.contains('ubits-modal-overlay--open') && m();
		};
		if ((document.addEventListener('keydown', h), t.footerButtons)) {
			const l = p.querySelector('.ubits-modal__footer-left .ubits-modal__footer-button'),
				w = p.querySelector('.ubits-modal__footer-right .ubits-button--secondary'),
				S = p.querySelector('.ubits-modal__footer-right .ubits-button--primary');
			l &&
				t.footerButtons.tertiary?.onClick &&
				l.addEventListener('click', (k) => {
					k.preventDefault(), t.footerButtons.tertiary.onClick(k);
				}),
				w &&
					t.footerButtons.secondary?.onClick &&
					w.addEventListener('click', (k) => {
						k.preventDefault(), t.footerButtons.secondary.onClick(k);
					}),
				S &&
					t.footerButtons.primary?.onClick &&
					S.addEventListener('click', (k) => {
						k.preventDefault(), t.footerButtons.primary.onClick(k);
					});
		}
		return r.appendChild(p), d && e(), { element: p, open: e, close: m, updateContent: v };
	}
	function Ke(t) {
		const {
			containerId: c,
			label: b = '',
			placeholder: u = '',
			helperText: d = '',
			size: r = 'md',
			state: a = 'default',
			type: p = 'text',
			showLabel: o = !0,
			showHelper: s = !1,
			showCounter: e = !1,
			maxLength: m = 50,
			mandatory: v = !1,
			mandatoryType: h = 'obligatorio',
			leftIcon: l = '',
			rightIcon: w = '',
			value: S = '',
			className: k = '',
			attributes: F = {},
			showRichTextToolbar: I = !1,
		} = t;
		let T = '';
		if (o && b) {
			const re = v ? ` <span class="ubits-input-mandatory">(${h})</span>` : '';
			T += `<label class="ubits-input-label">${b}${re}</label>`;
		}
		const q = l && l.trim() !== '',
			j = w && w.trim() !== '';
		q && l.startsWith('fa-') ? `${l}` : q && `${l}`,
			j && w.startsWith('fa-') ? `${w}` : j && `${w}`,
			(T += '<div style="position: relative; display: inline-block; width: 100%;">');
		let ee = w,
			Q = j,
			J = l,
			K = q;
		const D = ['ubits-input', `ubits-input--${r}`];
		a !== 'default' && D.push(`ubits-input--${a}`), k && D.push(k);
		const ce = a === 'disabled' ? ' disabled' : '',
			de = e ? ` maxlength="${m}"` : '',
			Y = q ? 'padding-left: 40px;' : 'padding-left: 12px;',
			me = j ? 'padding-right: 40px;' : 'padding-right: 12px;';
		if (p === 'select') {
			const re = t.selectOptions || [],
				V = (S && re.find((se) => se.value === S)?.text) || u;
			(T += `<input type="text" class="${D.join(' ')}" style="width: 100%; ${Y} ${me}" value="${V}" readonly>`),
				j ||
					((ee = 'fa-chevron-down'),
					(Q = !0),
					me === 'padding-right: 12px;' &&
						(T = T.replace(
							`style="width: 100%; ${Y} ${me}"`,
							`style="width: 100%; ${Y} padding-right: 40px;"`,
						)));
		} else if (p === 'textarea')
			if (I) {
				(T += '<div class="ubits-input-rich-text-wrapper">'),
					(T += `
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
				let re = `width: 100%; min-height: 80px; resize: vertical; ${Y} ${me}; border: none; border-radius: 0;`;
				a === 'disabled' &&
					(re +=
						'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important;');
				const V = `${c}-textarea`;
				(T += `<textarea id="${V}" class="${D.join(' ')}" style="${re}" placeholder="${u}"${ce}${de}>${S}</textarea>`),
					(T += '</div>');
			} else {
				let re = `width: 100%; min-height: 80px; resize: vertical; ${Y} ${me}`;
				a === 'disabled' &&
					(re +=
						'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;');
				const V = `${c}-textarea`;
				T += `<textarea id="${V}" class="${D.join(' ')}" style="${re}" placeholder="${u}"${ce}${de}>${S}</textarea>`;
			}
		else if (p === 'search') {
			let re = Y,
				V = me;
			q ||
				((J = 'fa-search'),
				(K = !0),
				(re =
					r === 'xs'
						? 'padding-left: 32px;'
						: r === 'sm'
							? 'padding-left: 36px;'
							: r === 'md'
								? 'padding-left: 40px;'
								: 'padding-left: 44px;')),
				j ||
					((ee = 'fa-times'),
					(Q = !0),
					(V =
						r === 'xs'
							? 'padding-right: 32px;'
							: r === 'sm'
								? 'padding-right: 36px;'
								: r === 'md'
									? 'padding-right: 40px;'
									: 'padding-right: 44px;'));
			let se = `width: 100%; ${re} ${V}`;
			a === 'disabled' &&
				(se +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
				(T += `<input type="text" class="${D.join(' ')}" style="${se}" placeholder="${u}" value="${S}" autocomplete="off"${ce}${de}>`);
		} else if (p === 'autocomplete') {
			let re = Y,
				V = me;
			q ||
				((J = 'fa-search'),
				(K = !0),
				(re =
					r === 'xs'
						? 'padding-left: 32px;'
						: r === 'sm'
							? 'padding-left: 36px;'
							: r === 'md'
								? 'padding-left: 40px;'
								: 'padding-left: 44px;')),
				j ||
					((ee = 'fa-times'),
					(Q = !0),
					(V =
						r === 'xs'
							? 'padding-right: 32px;'
							: r === 'sm'
								? 'padding-right: 36px;'
								: r === 'md'
									? 'padding-right: 40px;'
									: 'padding-right: 44px;'));
			let se = `width: 100%; ${re} ${V}`;
			a === 'disabled' &&
				(se +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
				(T += `<input type="text" class="${D.join(' ')}" style="${se}" placeholder="${u}" value="${S}" autocomplete="off"${ce}${de}>`);
		} else if (p === 'calendar') {
			let re = Y,
				V = me;
			j ||
				((ee = 'fa-calendar'),
				(Q = !0),
				(V =
					r === 'xs'
						? 'padding-right: 32px;'
						: r === 'sm'
							? 'padding-right: 36px;'
							: r === 'md'
								? 'padding-right: 40px;'
								: 'padding-right: 44px;'));
			let se = `width: 100%; ${re} ${V}`;
			a === 'disabled' &&
				(se +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
				(T += `<input type="text" class="${D.join(' ')}" style="${se}" placeholder="${u}" value="${S}" readonly${ce}>`);
		} else if (p === 'password') {
			let re = Y,
				V = me;
			j ||
				((ee = 'fa-eye'),
				(Q = !0),
				(V =
					r === 'xs'
						? 'padding-right: 32px;'
						: r === 'sm'
							? 'padding-right: 36px;'
							: r === 'md'
								? 'padding-right: 40px;'
								: 'padding-right: 44px;'));
			let se = `width: 100%; ${re} ${V}`;
			a === 'disabled' &&
				(se +=
					'; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;'),
				(T += `<input type="password" class="${D.join(' ')}" style="${se}" placeholder="${u}" value="${S}"${ce}${de}>`);
		} else
			T += `<input type="${p}" class="${D.join(' ')}" style="width: 100%; ${Y} ${me}" placeholder="${u}" value="${S}"${ce}${de}>`;
		if (K) {
			const re = J.startsWith('fa-') ? `far ${J}` : `far fa-${J}`;
			T += `<i class="${re} ubits-input-icon-left" style="position: absolute; left: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
		}
		if (Q) {
			const re = ee.startsWith('fa-') ? `far ${ee}` : `far fa-${ee}`;
			T += `<i class="${re} ubits-input-icon-right" style="position: absolute; right: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
		}
		(T += '</div>'),
			(s || e) &&
				((T += '<div class="ubits-input-helper">'),
				s && d && (T += `<span>${d}</span>`),
				e && (T += `<span class="ubits-input-counter">0/${m}</span>`),
				(T += '</div>'));
		const ie = Object.entries(F)
			.map(([re, V]) => `${re}="${V}"`)
			.join(' ');
		return ie ? `<div ${ie}>${T}</div>` : T;
	}
	function kt(t) {
		const {
			containerId: c,
			onChange: b,
			onFocus: u,
			onBlur: d,
			showCounter: r = !1,
			maxLength: a = 50,
			type: p = 'text',
			selectOptions: o = [],
			autocompleteOptions: s = [],
			value: e = '',
		} = t;
		if (!c) return console.error('UBITS Input: containerId es requerido'), null;
		const m = document.getElementById(c);
		if (!m) return console.error(`UBITS Input: No se encontró el contenedor con ID "${c}"`), null;
		const v = Ke(t);
		m.innerHTML = v;
		const h = m.querySelector('div[style*="position: relative"]'),
			l = m.querySelector('.ubits-input'),
			w = m.querySelector('.ubits-input-counter');
		if (!l || !h) return console.error('UBITS Input: No se pudo crear el elemento input'), null;
		if (
			(getComputedStyle(m).position === 'static' && (m.style.position = 'relative'),
			p === 'select' && It(m, l, o, e, t.placeholder || '', b, t.size || 'md'),
			p === 'search' && $t(m, l, b),
			p === 'autocomplete' && At(m, l, s, b, t.size || 'md'),
			p === 'calendar' && Nt(m, l, b),
			p === 'password' && _t(m, l),
			p === 'textarea' && t.showRichTextToolbar
				? Ot(m, l, t.onChange)
				: p === 'textarea' && !t.showRichTextToolbar && Mt(m, l),
			r && w && Bt(l, w, a),
			b && typeof b == 'function')
		) {
			const S = p === 'select' ? 'change' : 'input';
			l.addEventListener(S, (k) => {
				b(k.target.value, k);
			});
		}
		return (
			u &&
				typeof u == 'function' &&
				l.addEventListener('focus', (S) => {
					u(S.target.value, S);
				}),
			d &&
				typeof d == 'function' &&
				l.addEventListener('blur', (S) => {
					d(S.target.value, S);
				}),
			{
				element: h,
				inputElement: l,
				getValue: () => l.value,
				setValue: (S) => {
					(l.value = S), r && w && Fe(w, S.length, a);
				},
				focus: () => l.focus(),
				blur: () => l.blur(),
				disable: () => {
					(l.disabled = !0), l.classList.add('ubits-input--disabled');
				},
				enable: () => {
					(l.disabled = !1), l.classList.remove('ubits-input--disabled');
				},
				setState: (S) => {
					if (
						([
							'ubits-input--hover',
							'ubits-input--focus',
							'ubits-input--active',
							'ubits-input--invalid',
							'ubits-input--disabled',
						].forEach((F) => l.classList.remove(F)),
						S !== 'default' && l.classList.add(`ubits-input--${S}`),
						S === 'disabled' ? (l.disabled = !0) : (l.disabled = !1),
						p === 'textarea' && t.showRichTextToolbar)
					) {
						const I = l
							.closest('.ubits-input-rich-text-wrapper')
							?.querySelector('.ubits-input-rich-text-toolbar');
						if (I) {
							const T = window.getComputedStyle(I).borderBottom;
							window.getComputedStyle(I).borderTop,
								T &&
									T !== 'none' &&
									T !== '0px' &&
									(console.warn(
										`[Rich Text] ⚠️ Línea divisoria detectada en setState("${S}"), removiendo...`,
									),
									(I.style.borderBottom = 'none'),
									(I.style.borderTop = 'none'));
						}
					}
				},
			}
		);
	}
	function _t(t, c) {
		const b = t.querySelector('.ubits-input-icon-right');
		if (b) {
			let u = !1;
			(b.style.pointerEvents = 'auto'), (b.style.cursor = 'pointer');
			const r = !b.className.includes('fa-eye');
			b.addEventListener('click', (a) => {
				a.preventDefault(),
					a.stopPropagation(),
					(u = !u),
					u
						? ((c.type = 'text'), r || (b.className = 'far fa-eye-slash ubits-input-icon-right'))
						: ((c.type = 'password'), r || (b.className = 'far fa-eye ubits-input-icon-right'));
			});
		}
	}
	function $t(t, c, b) {
		const u = t.querySelector('.ubits-input-icon-right');
		if (u) {
			(u.style.display = c.value.length > 0 ? 'block' : 'none'),
				(u.style.pointerEvents = 'auto'),
				(u.style.cursor = 'pointer');
			const d = () => {
				u.style.display = c.value.length > 0 ? 'block' : 'none';
			};
			c.addEventListener('input', d),
				u.addEventListener('click', (r) => {
					r.preventDefault(), (c.value = ''), c.focus(), d(), b && b('');
				});
		}
	}
	function At(t, c, b, u, d = 'md') {
		const r = d === 'xs' ? 'xs' : d === 'sm' ? 'sm' : d === 'md' ? 'md' : 'lg',
			a = t.querySelector('.ubits-input-icon-right');
		if (a) {
			(a.style.display = c.value.length > 0 ? 'block' : 'none'),
				(a.style.pointerEvents = 'auto'),
				(a.style.cursor = 'pointer');
			const s = () => {
				a.style.display = c.value.length > 0 ? 'block' : 'none';
			};
			c.addEventListener('input', s),
				a.addEventListener('click', (e) => {
					e.preventDefault(), (c.value = ''), c.focus(), s();
					const m = t.querySelector('.ubits-autocomplete-list-container');
					m && (m.style.display = 'none'), u && u('');
				});
		}
		const p = document.createElement('div');
		(p.className = 'ubits-autocomplete-list-container'),
			(p.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `),
			t.appendChild(p);
		const o = (s = !1) => {
			const e = c.value.toLowerCase();
			let m;
			if (
				(s || e.length < 1
					? (m = b.slice(0, 8))
					: (m = b.filter((l) => l.text.toLowerCase().includes(e)).slice(0, 8)),
				m.length === 0)
			) {
				p.style.display = 'none';
				return;
			}
			const v = m.map((l) => ({ label: l.text, state: 'default', value: l.value, selected: !1 })),
				h = `ubits-autocomplete-list-${t.id}`;
			(p.id = h), (p.innerHTML = '');
			try {
				Me({
					containerId: h,
					items: v,
					size: r,
					maxHeight: '200px',
					onSelectionChange: (l, w) => {
						l &&
							l.value &&
							((c.value = l.label),
							(p.style.display = 'none'),
							a && (a.style.display = 'block'),
							u && u(l.value));
					},
				}),
					e.length > 0 &&
						p.querySelectorAll('.ubits-list-item').forEach((w) => {
							const S = w.textContent || '';
							if (S.toLowerCase().includes(e)) {
								const k = new RegExp(`(${e})`, 'gi'),
									F = S.replace(k, '<strong>$1</strong>');
								w.innerHTML = F;
							}
						});
			} catch (l) {
				console.warn('Using renderList fallback for autocomplete:', l);
				const w = Oe({ items: v, size: r, maxHeight: '200px' });
				(p.innerHTML = w),
					e.length > 0 &&
						p.querySelectorAll('.ubits-list-item').forEach((F) => {
							const I = F.textContent || '';
							if (I.toLowerCase().includes(e)) {
								const T = new RegExp(`(${e})`, 'gi'),
									q = I.replace(T, '<strong>$1</strong>');
								F.innerHTML = q;
							}
						}),
					p.querySelectorAll('.ubits-list-item').forEach((k, F) => {
						const I = v[F];
						I &&
							I.state !== 'disabled' &&
							k.addEventListener('click', () => {
								(c.value = I.label),
									(p.style.display = 'none'),
									a && (a.style.display = 'block'),
									u && u(I.value || '');
							});
					});
			}
			p.style.display = 'block';
		};
		c.addEventListener('focus', () => {
			o(!0);
		}),
			c.addEventListener('input', () => {
				o(!1);
			}),
			c.addEventListener('blur', () => {
				setTimeout(() => (p.style.display = 'none'), 150);
			});
	}
	function It(t, c, b, u, d, r, a = 'md') {
		c.style.cursor = 'pointer';
		const p = a === 'xs' ? 'xs' : a === 'sm' ? 'sm' : a === 'md' ? 'md' : 'lg',
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
		const s = 50;
		let e = 0,
			m = [],
			v = !1;
		const h = (l = 0) => {
			v ||
				((v = !0),
				setTimeout(() => {
					const w = l * s,
						S = Math.min(w + s, b.length),
						F = b.slice(w, S).map((T) => ({
							label: T.text,
							state: u === T.value ? 'active' : 'default',
							value: T.value,
							selected: u === T.value,
						}));
					l === 0 ? (m = F) : (m = [...m, ...F]);
					const I = `ubits-select-list-${t.id}`;
					(o.id = I), (o.innerHTML = '');
					try {
						Me({
							containerId: I,
							items: m,
							size: p,
							maxHeight: '200px',
							onSelectionChange: (T, q) => {
								T && T.value && ((c.value = T.label), (o.style.display = 'none'), r && r(T.value));
							},
						});
					} catch (T) {
						console.warn('Using renderList fallback for select:', T);
						const q = Oe({ items: m, size: p, maxHeight: '200px' });
						(o.innerHTML = q),
							o.querySelectorAll('.ubits-list-item').forEach((ee, Q) => {
								const J = m[Q];
								J &&
									J.state !== 'disabled' &&
									ee.addEventListener('click', () => {
										(c.value = J.label), (o.style.display = 'none'), r && r(J.value || '');
									});
							});
					}
					if (S < b.length) {
						const T = o.querySelector('.ubits-list');
						if (T) {
							const q = new IntersectionObserver(
									(ee) => {
										ee[0].isIntersecting && !v && S < b.length && (e++, h(e));
									},
									{ root: T, rootMargin: '50px' },
								),
								j = o.querySelector('.ubits-list-item:last-child');
							j && q.observe(j);
						}
					}
					v = !1;
				}, 150));
		};
		c.addEventListener('click', () => {
			o.style.display === 'block'
				? (o.style.display = 'none')
				: ((e = 0), (m = []), h(0), (o.style.display = 'block'));
		}),
			document.addEventListener('click', (l) => {
				t.contains(l.target) || (o.style.display = 'none');
			});
	}
	function Nt(t, c, b) {
		let u = null,
			d = null;
		const r = (s) => {
				const e = String(s.getDate()).padStart(2, '0'),
					m = String(s.getMonth() + 1).padStart(2, '0'),
					v = s.getFullYear();
				return `${e}/${m}/${v}`;
			},
			a = (s) => {
				if (!s) return null;
				const [e, m, v] = s.split('/');
				return !e || !m || !v ? null : new Date(parseInt(v), parseInt(m) - 1, parseInt(e));
			},
			p = async () => {
				if (
					(c.type === 'date' && ((c.type = 'text'), c.setAttribute('readonly', 'readonly')),
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
					u)
				) {
					d.style.display = 'block';
					return;
				}
				try {
					const s = await Promise.resolve().then(() => Gt),
						{ createCalendar: e } = s,
						m = c.value,
						v = a(m) || new Date();
					(u = e({
						mode: 'single',
						selectedDate: a(m),
						initialDate: v,
						onDateSelect: (h) => {
							const l = r(h);
							(c.value = l), d && (d.style.display = 'none'), b && b(l);
						},
					})),
						d.appendChild(u.element),
						(d.style.display = 'block');
				} catch (s) {
					console.error('❌ [Calendar Picker] Error cargando Calendar UBITS:', s),
						d &&
							((d.innerHTML =
								'<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>'),
							(d.style.display = 'block'));
				}
			};
		c.addEventListener('click', (s) => {
			s.preventDefault(), s.stopPropagation(), p();
		}),
			c.addEventListener('focus', (s) => {
				s.preventDefault(), s.stopPropagation(), p();
			});
		const o = t.querySelector('.ubits-input-icon-right');
		o &&
			o.addEventListener('click', (s) => {
				s.preventDefault(), s.stopPropagation(), p();
			}),
			document.addEventListener('click', (s) => {
				d && !t.contains(s.target) && (d.style.display = 'none');
			}),
			document.addEventListener('keydown', (s) => {
				s.key === 'Escape' && d && (d.style.display = 'none');
			});
	}
	function Bt(t, c, b) {
		const u = () => {
			Fe(c, t.value.length, b),
				t.value.length > b && ((t.value = t.value.substring(0, b)), Fe(c, b, b));
		};
		t.addEventListener('input', u), Fe(c, t.value.length, b);
	}
	function Fe(t, c, b) {
		(t.textContent = `${c}/${b}`),
			c >= b
				? t.classList.add('ubits-input-counter--limit')
				: t.classList.remove('ubits-input-counter--limit');
	}
	function Ht(t, c) {
		const b = `ubits-rich-text-image-modal-${Date.now()}`,
			u = `${b}-input`,
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
            id="${u}"
            class="ubits-input ubits-input--md"
            placeholder="https://ejemplo.com/imagen.jpg"
            style="flex: 1;"
          />
          <button 
            type="button"
            id="${b}-insert-btn"
            class="ubits-button ubits-button--primary ubits-button--md"
          >
            <span>Insertar imagen</span>
          </button>
        </div>
      </div>
    `,
				footerButtons: { secondary: { label: 'Cancelar', onClick: () => {} } },
				onClose: () => {
					const s = document.getElementById(b)?.closest('.ubits-modal-overlay');
					s && setTimeout(() => s.remove(), 300);
				},
				closeOnOverlayClick: !0,
				open: !0,
			},
			r = Ge(d),
			a = r.element;
		a.id = b;
		const p = document.getElementById(`${b}-insert-btn`),
			o = document.getElementById(u);
		if (p && o) {
			const s = () => {
				const m = o.value.trim();
				if (m) {
					const v = document.createElement('img');
					(v.src = m),
						(v.style.maxWidth = '100%'),
						(v.style.height = 'auto'),
						(v.style.display = 'block'),
						(v.style.margin = 'var(--ubits-spacing-sm, 8px) 0');
					const h = window.getSelection();
					h && h.rangeCount > 0 ? h.getRangeAt(0).insertNode(v) : t.appendChild(v), c(), r.close();
				}
			};
			p.addEventListener('click', s),
				o.addEventListener('keydown', (m) => {
					m.key === 'Enter' && (m.preventDefault(), s());
				});
			const e = a.querySelector('.ubits-button--secondary');
			e &&
				e.addEventListener('click', () => {
					r.close();
				});
		}
	}
	function Rt(t, c) {
		const b = `ubits-rich-text-table-modal-${Date.now()}`,
			u = `${b}-rows`,
			d = `${b}-cols`,
			r = {
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
					secondary: { label: 'Cancelar', onClick: () => {} },
					primary: { label: 'Insertar', onClick: () => {} },
				},
				onClose: () => {
					const v = document.getElementById(b)?.closest('.ubits-modal-overlay');
					v && setTimeout(() => v.remove(), 300);
				},
				closeOnOverlayClick: !0,
				open: !0,
			},
			a = Ge(r),
			p = a.element;
		p.id = b;
		const o = p.querySelector('.ubits-button--primary'),
			s = document.getElementById(u),
			e = document.getElementById(d);
		o &&
			s &&
			e &&
			o.addEventListener('click', () => {
				const v = parseInt(s.value) || 2,
					h = parseInt(e.value) || 2;
				if (v > 0 && h > 0) {
					const l = document.createElement('table');
					(l.style.borderCollapse = 'collapse'),
						(l.style.width = '100%'),
						(l.style.margin = 'var(--ubits-spacing-sm, 8px) 0'),
						(l.style.border = '1px solid var(--ubits-border-1)');
					for (let S = 0; S < v; S++) {
						const k = document.createElement('tr');
						for (let F = 0; F < h; F++) {
							const I = document.createElement('td');
							(I.style.border = '1px solid var(--ubits-border-1)'),
								(I.style.padding = 'var(--ubits-spacing-sm, 8px)'),
								(I.style.minWidth = '50px'),
								(I.textContent = ' '),
								k.appendChild(I);
						}
						l.appendChild(k);
					}
					const w = window.getSelection();
					w && w.rangeCount > 0 ? w.getRangeAt(0).insertNode(l) : t.appendChild(l), c(), a.close();
				}
			});
		const m = p.querySelector('.ubits-button--secondary');
		m &&
			m.addEventListener('click', () => {
				a.close();
			});
	}
	function Dt(t, c) {
		const b = `ubits-rich-text-link-modal-${Date.now()}`,
			u = `${b}-input`,
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
          id="${u}"
          class="ubits-input ubits-input--md"
          placeholder="https://ejemplo.com"
          style="width: 100%; box-sizing: border-box;"
        />
      </div>
    `,
				footerButtons: {
					secondary: { label: 'Cancelar', onClick: () => {} },
					primary: { label: 'Insertar', onClick: () => {} },
				},
				onClose: () => {
					const e = document.getElementById(b)?.closest('.ubits-modal-overlay');
					e && setTimeout(() => e.remove(), 300);
				},
				closeOnOverlayClick: !0,
				open: !0,
			},
			r = Ge(d),
			a = r.element;
		a.id = b;
		const p = a.querySelector('.ubits-button--primary'),
			o = document.getElementById(u);
		p &&
			o &&
			p.addEventListener('click', () => {
				const e = o.value.trim();
				e && (document.execCommand('createLink', !1, e), c(), r.close());
			});
		const s = a.querySelector('.ubits-button--secondary');
		s &&
			s.addEventListener('click', () => {
				r.close();
			}),
			o &&
				o.addEventListener('keydown', (e) => {
					e.key === 'Enter' && (e.preventDefault(), p && p.click());
				});
	}
	function Ot(t, c, b) {
		const u = t.querySelector('.ubits-input-rich-text-toolbar');
		if (!u) return;
		const d = c.closest('.ubits-input-rich-text-wrapper');
		if (!d) return;
		const r = c.placeholder || '',
			a = document.createElement('div');
		a.className = c.className;
		const p = window.getComputedStyle(c);
		(a.style.cssText = c.style.cssText),
			(a.style.position = 'relative'),
			(a.style.padding = p.padding || '12px 12px'),
			(a.style.margin = '0'),
			(a.style.outline = 'none'),
			(a.style.overflow = 'auto'),
			(a.style.minHeight = p.minHeight || '80px'),
			(a.style.resize = 'vertical'),
			(a.contentEditable = 'true'),
			a.setAttribute('data-placeholder', r);
		let o = t.closest('.ubits-input-wrapper');
		o || (o = t.parentElement?.closest('.ubits-input-wrapper')),
			o || (o = document.getElementById(t.id)?.parentElement?.closest('.ubits-input-wrapper')),
			console.log('[Rich Text Placeholder] ===== DEBUG ALINEAMIENTO ====='),
			console.log('[Rich Text Placeholder] inputWrapper:', o),
			console.log('[Rich Text Placeholder] container:', t),
			console.log('[Rich Text Placeholder] container.parentElement:', t.parentElement),
			console.log('[Rich Text Placeholder] richTextWrapper:', d),
			console.log('[Rich Text Placeholder] richTextWrapper.parentElement:', d?.parentElement);
		let s = null;
		if (
			(o && (s = o.querySelector('.ubits-input-icon-left')),
			!s && t.parentElement && (s = t.parentElement.querySelector('.ubits-input-icon-left')),
			!s && d?.parentElement && (s = d.parentElement.querySelector('.ubits-input-icon-left')),
			!s)
		) {
			const h = document.querySelectorAll('.ubits-input-icon-left');
			for (const l of Array.from(h)) {
				const w = l,
					S = t.getBoundingClientRect(),
					k = w.getBoundingClientRect();
				if (Math.abs(k.top - S.top) < 100) {
					s = w;
					break;
				}
			}
		}
		const e = s !== null;
		if (
			(console.log('[Rich Text Placeholder] leftIconElement:', s),
			console.log('[Rich Text Placeholder] hasLeftIcon:', e),
			e && s)
		) {
			const h = s.getBoundingClientRect(),
				l = window.getComputedStyle(s),
				w = l.left,
				S = l.top,
				k = l.transform;
			console.log('[Rich Text Placeholder] Icono encontrado:', s),
				console.log('[Rich Text Placeholder] Icono rect:', h),
				console.log('[Rich Text Placeholder] Icono left (computed):', w),
				console.log('[Rich Text Placeholder] Icono top (computed):', S),
				console.log('[Rich Text Placeholder] Icono transform:', k);
			const F = p.paddingLeft || '12px',
				I = p.paddingTop || '12px',
				T = p.paddingRight || '12px',
				q = p.paddingBottom || '12px';
			console.log('[Rich Text Placeholder] Textarea padding:', {
				left: F,
				top: I,
				right: T,
				bottom: q,
			});
			const j = a.getBoundingClientRect();
			console.log('[Rich Text Placeholder] EditableDiv rect:', j);
			const ee = h.left - j.left,
				Q = h.top - j.top,
				J = h.bottom - j.top;
			console.log('[Rich Text Placeholder] Icono posición relativa:', {
				left: ee,
				top: Q,
				bottom: J,
			});
			const K = p.lineHeight || '1.5',
				D = p.fontSize || '14px';
			console.log('[Rich Text Placeholder] Texto:', { fontSize: D, lineHeight: K }),
				a.setAttribute('data-has-left-icon', 'true'),
				a.style.setProperty('--placeholder-left', F),
				a.style.setProperty('--placeholder-top', I),
				console.log('[Rich Text Placeholder] Variables CSS establecidas:', {
					'--placeholder-left': F,
					'--placeholder-top': I,
				}),
				requestAnimationFrame(() => {
					a.querySelector('::before') || window.getComputedStyle(a, '::before');
					const ce = window.getComputedStyle(a, '::before');
					console.log('[Rich Text Placeholder] Después de render:', {
						placeholderLeft: ce.left,
						placeholderTop: ce.top,
						placeholderWidth: ce.width,
						placeholderHeight: ce.height,
					});
				});
		} else {
			const h = p.paddingTop || '12px',
				l = p.paddingLeft || '12px';
			console.log('[Rich Text Placeholder] Sin icono, usando valores por defecto:', {
				paddingTop: h,
				paddingLeft: l,
			}),
				a.style.setProperty('--placeholder-top', h),
				a.style.setProperty('--placeholder-left', l);
		}
		console.log('[Rich Text Placeholder] ===== FIN DEBUG ====='),
			c.value && c.value.trim()
				? (a.innerHTML = c.value)
				: a.classList.add('ubits-rich-text-placeholder'),
			(c.style.display = 'none'),
			c.setAttribute('data-rich-text-editor', 'true'),
			d.insertBefore(a, c),
			e &&
				s &&
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						let h = s;
						if (
							(o && (h = o.querySelector('.ubits-input-icon-left') || s),
							!h &&
								t.parentElement &&
								(h = t.parentElement.querySelector('.ubits-input-icon-left') || s),
							h)
						) {
							const l = h.getBoundingClientRect(),
								w = a.getBoundingClientRect();
							if (
								(console.log('[Rich Text Placeholder] Después de insertar en DOM:'),
								console.log('[Rich Text Placeholder] Icono rect:', l),
								console.log('[Rich Text Placeholder] EditableDiv rect:', w),
								w.width > 0 && w.height > 0)
							) {
								const S = l.top - w.top,
									k = l.bottom - w.top,
									F = l.left - w.left;
								console.log('[Rich Text Placeholder] Posiciones relativas:', {
									iconTop: S,
									iconBottom: k,
									iconLeft: F,
									iconCenterY: S + l.height / 2,
								});
								const I = S + l.height / 2,
									T = parseFloat(p.fontSize || '16px'),
									q = p.lineHeight;
								let j;
								q === 'normal'
									? (j = T * 1.2)
									: q.includes('px')
										? (j = parseFloat(q))
										: (j = T * parseFloat(q));
								const ee = parseFloat(p.paddingTop || '12px'),
									Q = ee + T * 0.75,
									J = I - Q,
									K = ee + J;
								console.log('[Rich Text Placeholder] Cálculos de alineamiento:', {
									iconCenterY: I,
									fontSize: T,
									lineHeight: j,
									paddingTop: ee,
									textBaselineY: Q,
									offset: J,
									adjustedTop: K,
								});
								const D = Math.max(0, K),
									de = (a.style.padding || p.padding || '12px 12px').split(' '),
									Y = de[1] || de[0] || '12px',
									me = de[2] || de[0] || '12px',
									ie = de[3] || de[1] || de[0] || '40px';
								(a.style.padding = `${D}px ${Y} ${me} ${ie}`),
									a.style.setProperty('--placeholder-top', `${D}px`),
									a.style.setProperty('--placeholder-left', ie),
									console.log('[Rich Text Placeholder] Variables CSS finales:', {
										'--placeholder-top': `${D}px`,
										'--placeholder-left': ie,
										'editableDiv padding actualizado': `${D}px ${Y} ${me} ${ie}`,
									});
							} else
								console.warn(
									'[Rich Text Placeholder] EditableDiv aún no tiene dimensiones válidas',
								);
						}
					});
				});
		const m = (h) => {
			const l = a.innerText || '';
			(c.value = l),
				b && b(l, h),
				l.trim()
					? a.classList.remove('ubits-rich-text-placeholder')
					: a.classList.add('ubits-rich-text-placeholder');
		};
		a.addEventListener('input', m),
			a.addEventListener('blur', m),
			a.addEventListener('focus', () => {
				a.classList.contains('ubits-rich-text-placeholder') &&
					((a.textContent = ''), a.classList.remove('ubits-rich-text-placeholder'));
				const h = d.querySelector('.ubits-input-rich-text-toolbar');
				if (h) {
					const l = window.getComputedStyle(h).borderBottom;
					window.getComputedStyle(h).borderTop,
						l &&
							l !== 'none' &&
							l !== '0px' &&
							(console.warn('[Rich Text] ⚠️ Línea divisoria detectada en focus, removiendo...'),
							(h.style.borderBottom = 'none'),
							(h.style.borderTop = 'none'));
				}
			}),
			d.addEventListener('mouseenter', () => {
				const h = d.querySelector('.ubits-input-rich-text-toolbar');
				if (h) {
					const l = window.getComputedStyle(h).borderBottom;
					l &&
						l !== 'none' &&
						l !== '0px' &&
						(console.warn('[Rich Text] ⚠️ Línea divisoria detectada en hover, removiendo...'),
						(h.style.borderBottom = 'none'),
						(h.style.borderTop = 'none'));
				}
			}),
			u.querySelectorAll('.ubits-rich-text-btn').forEach((h) => {
				h.addEventListener('click', (l) => {
					l.preventDefault(), a.focus();
					const w = h.getAttribute('data-command');
					if (w) {
						if (w === 'insertImage') Ht(a, m);
						else if (w === 'insertTable') Rt(a, m);
						else if (w === 'createLink') Dt(a, m);
						else if (w === 'code') {
							const S = window.getSelection();
							if (S && S.rangeCount > 0) {
								const k = S.getRangeAt(0),
									F = document.createElement('code');
								(F.style.background = 'var(--ubits-bg-2)'),
									(F.style.padding = 'var(--ubits-spacing-xs, 2px) var(--ubits-spacing-sm, 4px)'),
									(F.style.borderRadius = 'var(--ubits-border-radius-sm, 4px)'),
									(F.style.fontFamily = 'var(--font-mono, monospace)');
								try {
									k.surroundContents(F);
								} catch {
									(F.textContent = k.toString()), k.deleteContents(), k.insertNode(F);
								}
							}
						} else document.execCommand(w, !1, void 0);
						m();
					}
				});
			});
	}
	function Mt(t, c) {
		let b = t.closest('.ubits-input-wrapper');
		b || (b = t.parentElement?.closest('.ubits-input-wrapper')),
			b || (b = document.getElementById(t.id)?.parentElement?.closest('.ubits-input-wrapper'));
		let u = null;
		if (
			(b && (u = b.querySelector('.ubits-input-icon-left')),
			!u && t.parentElement && (u = t.parentElement.querySelector('.ubits-input-icon-left')),
			!u)
		) {
			const r = document.querySelectorAll('.ubits-input-icon-left');
			for (const a of Array.from(r)) {
				const p = a,
					o = t.getBoundingClientRect(),
					s = p.getBoundingClientRect();
				if (Math.abs(s.top - o.top) < 100) {
					u = p;
					break;
				}
			}
		}
		!(u !== null) ||
			!u ||
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					const r = b?.querySelector('.ubits-input-icon-left') || u;
					if (r && c) {
						const a = r.getBoundingClientRect(),
							p = c.getBoundingClientRect();
						if (p.width > 0 && p.height > 0) {
							const o = a.top - p.top;
							a.bottom - p.top, a.left - p.left;
							const s = o + a.height / 2,
								e = window.getComputedStyle(c),
								m = parseFloat(e.fontSize || '16px'),
								v = parseFloat(e.paddingTop || '12px'),
								h = v + m * 0.75,
								l = s - h,
								w = v + l,
								S = Math.max(0, w),
								F = (e.padding || '12px 12px').split(' '),
								I = F[1] || F[0] || '12px',
								T = F[2] || F[0] || '12px',
								q = F[3] || F[1] || F[0] || '40px';
							c.style.padding = `${S}px ${I} ${T} ${q}`;
						}
					}
				});
			});
	}
	function Pt(t) {
		const {
				title: c,
				description: b,
				imageUrl: u,
				icon: d,
				actionLabel: r,
				showPrimaryButton: a = !1,
				primaryButtonIcon: p,
				showPrimaryButtonIcon: o = !1,
				secondaryActionLabel: s,
				showSecondaryButton: e = !1,
				secondaryButtonIcon: m,
				showSecondaryButtonIcon: v = !1,
				className: h = '',
				style: l = '',
			} = t,
			w = ['ubits-empty-state', 'ubits-empty-state--default', h].filter(Boolean).join(' '),
			S = l ? ` style="${l}"` : '';
		let k = '';
		u
			? (k = `
      <div class="ubits-empty-state__image">
        <img src="${u}" alt="${c}" />
      </div>
    `)
			: d &&
				(k = `
      <div class="ubits-empty-state__icon">
        <i class="far fa-${d}"></i>
      </div>
    `);
		let F = '',
			I = r || '';
		o && p && (I = `<i class="far fa-${p}"></i> ${I}`);
		let T = s || '';
		v && m && (T = `<i class="far fa-${m}"></i> ${T}`);
		const q =
				a && r
					? `<button class="ubits-button ubits-button--primary ubits-button--sm" data-action="primary" type="button">${I}</button>`
					: '',
			j =
				e && s
					? `<button class="ubits-button ubits-button--secondary ubits-button--sm" data-action="secondary" type="button">${T}</button>`
					: '';
		return (
			(q || j) &&
				(F = `
      <div class="ubits-empty-state__actions">
        ${j}
        ${q}
      </div>
    `),
			`
    <div class="${w}"${S}>
      ${k}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${c}</h3>
        ${b ? `<p class="ubits-empty-state__description">${b}</p>` : ''}
      </div>
      ${F}
    </div>
  `.trim()
		);
	}
	function Ut(t, c, b) {
		const u = c.data[t.id],
			d = c.data;
		switch (b) {
			case 'nombre': {
				const r = u || d.nombre || d.name || '';
				return t.editable
					? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${r}</span>`
					: `<span class="ubits-body-md-regular">${r}</span>`;
			}
			case 'progreso': {
				let r = null;
				if (u != null) {
					if (typeof u == 'number') r = u;
					else if (typeof u == 'string') {
						const p = parseFloat(u.replace('%', '').trim());
						isNaN(p) || (r = p);
					}
				}
				if (r === null && d) {
					const p = d.progress !== void 0 ? d.progress : d.progreso;
					if (p != null) {
						if (typeof p == 'number') r = p;
						else if (typeof p == 'string') {
							const o = parseFloat(p.replace('%', '').trim());
							isNaN(o) || (r = o);
						}
					}
				}
				return (
					r === null && (r = 50),
					(r = Math.max(0, Math.min(100, r))),
					rt({ value: r, size: 'sm', variant: 'default', indicator: `${Math.round(r)}%` })
				);
			}
			case 'nombre-avatar': {
				const r = u || d.nombre || d.name || '',
					a = d.avatar || d.avatarUrl || null;
				console.log('🖼️ [AVATAR] Renderizando nombre-avatar:', {
					columnId: t.id,
					rowId: c.id,
					nombre: r,
					avatar: a,
					cellData: d,
					hasAvatar: !!a,
					avatarType: typeof a,
				});
				const p = t.avatarVariant || 'initials',
					o = (h) =>
						h
							.split(' ')
							.map((l) => l[0])
							.join('')
							.toUpperCase()
							.slice(0, 2) || 'U';
				let s = '';
				if (p === 'photo') {
					let h = null;
					a && typeof a == 'string'
						? (h = a)
						: a && typeof a == 'object' && (h = a.imageUrl || a.url || null),
						!h && d && (h = d.imageUrl || d.avatarUrl || d.avatarImage || null),
						h
							? (s = Ie({ imageUrl: h, size: 'sm' }))
							: (s = Ie({ imageUrl: '../assets/images/Profile-image.jpg', size: 'sm' }));
				} else if (p === 'initials') {
					if (a && typeof a == 'object' && a.initials)
						console.log('🖼️ [AVATAR] Usando initials del objeto avatar:', a.initials),
							(s = Ie({ initials: a.initials, size: 'sm' }));
					else {
						const h = o(r);
						console.log('🖼️ [AVATAR] Generando initials del nombre:', r, '->', h),
							(s = Ie({ initials: h, size: 'sm' }));
					}
					console.log('🖼️ [AVATAR] HTML generado (initials):', s ? s.substring(0, 100) : 'VACÍO');
				} else {
					const h = a && typeof a == 'object' && a.icon ? a.icon : 'user';
					console.log('🖼️ [AVATAR] Usando icon:', h),
						(s = Ie({ icon: h, size: 'sm' })),
						console.log('🖼️ [AVATAR] HTML generado (icon):', s ? s.substring(0, 100) : 'VACÍO');
				}
				const m = t.editable
						? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${r}</span>`
						: `<span class="ubits-body-md-regular">${r}</span>`,
					v = `
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${s}
          ${m}
        </div>
      `;
				return console.log('🖼️ [AVATAR] HTML final:', v.substring(0, 200)), v;
			}
			case 'nombre-avatar-texto': {
				const r = u || d.nombre || d.name || '',
					a = d.avatar || d.avatarUrl || null,
					p = d.area || d.areaNombre || d.textoComplementario || d.complementario || '',
					o = t.avatarVariant || 'initials',
					s = (v) =>
						v
							.split(' ')
							.map((h) => h[0])
							.join('')
							.toUpperCase()
							.slice(0, 2) || 'U';
				let e = '';
				if (o === 'photo') {
					let v = null;
					a && typeof a == 'string'
						? (v = a)
						: a && typeof a == 'object' && (v = a.imageUrl || a.url || null),
						!v && d && (v = d.imageUrl || d.avatarUrl || d.avatarImage || null),
						v
							? (e = Ie({ imageUrl: v, size: 'sm' }))
							: (e = Ie({ imageUrl: '../assets/images/Profile-image.jpg', size: 'sm' }));
				} else if (o === 'initials')
					if (a && typeof a == 'object' && a.initials) e = Ie({ initials: a.initials, size: 'sm' });
					else {
						const v = s(r);
						e = Ie({ initials: v, size: 'sm' });
					}
				else {
					const v = a && typeof a == 'object' && a.icon ? a.icon : 'user';
					e = Ie({ icon: v, size: 'sm' });
				}
				const m = `<span class="ubits-body-md-regular">${r}</span>`;
				return `
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm, 12px);">
          ${e}
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${m}
            ${p ? `<span class="ubits-body-sm-regular" style="color: var(--ubits-fg-1-medium);">${p}</span>` : ''}
          </div>
        </div>
      `;
			}
			case 'estado': {
				const r = {
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
					a = u || d.estado || d.status || 'pendiente',
					p = String(a).toLowerCase().trim(),
					o = r[p] || r.pendiente,
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
						}[o] || String(a),
					m = t.editable,
					v = ct({
						label: e,
						status: o,
						size: 'xs',
						rightIcon: m ? 'chevron-down' : null,
						clickable: m,
					});
				return m
					? `
          <div class="ubits-data-table__status-editable" data-row-id="${c.id}" data-column-id="${t.id}" data-editable="true" data-current-status="${o}">
            ${v}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${c.id}-${t.id}" style="display: none;"></div>
          </div>
        `
					: v;
			}
			case 'radio': {
				const r = u === !0 || u === 'true' || u === 1 || u === c.id || u === String(c.id),
					a = t.radioLabel !== !1 && t.radioLabel !== void 0,
					p =
						typeof t.radioLabel == 'string' ? t.radioLabel : a ? String(c.data[t.id] || c.id) : '',
					o = t.editable === !0,
					s = !o;
				return gt({
					label: p,
					name: `radio-${t.id}`,
					value: String(c.id),
					checked: r,
					size: 'md',
					disabled: s,
				}).replace(
					'<input',
					`<input data-row-id="${c.id}" data-column-id="${t.id}" data-radio-button="true" ${o ? 'data-editable="true"' : ''}`,
				);
			}
			case 'toggle': {
				const r = u === !0 || u === 'true' || u === 1,
					a = t.toggleLabel !== !1 && t.toggleLabel !== void 0,
					p =
						typeof t.toggleLabel == 'string'
							? t.toggleLabel
							: a
								? String(c.data[t.id] || c.id)
								: '';
				return ft({ label: p, checked: r, size: 'md' }).replace(
					'<input',
					`<input data-row-id="${c.id}" data-column-id="${t.id}" data-toggle-button="true"`,
				);
			}
			case 'checkbox': {
				const r = u === !0 || u === 'true' || u === 1,
					a = t.checkboxLabel !== !1 && t.checkboxLabel !== void 0,
					p =
						typeof t.checkboxLabel == 'string'
							? t.checkboxLabel
							: a
								? String(c.data[t.id] || c.id)
								: '',
					o = t.editable === !0;
				return Ne({ label: p, checked: r, size: 'md', disabled: !o }).replace(
					'<input',
					`<input data-row-id="${c.id}" data-column-id="${t.id}" data-checkbox-button="true" ${o ? 'data-editable="true"' : ''}`,
				);
			}
			case 'correo': {
				const r = u || '';
				return t.emailClickable !== !1
					? `<a href="mailto:${r}" class="ubits-body-md-regular" style="color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static-inverted)); text-decoration: none;">${r}</a>`
					: `<span class="ubits-body-md-regular">${r}</span>`;
			}
			case 'acciones':
				return $e({
					text: 'Eliminar',
					variant: 'tertiary',
					size: 'sm',
					icon: 'trash',
					iconStyle: 'regular',
					className: 'ubits-data-table__action-button',
					attributes: { 'data-row-id': String(c.id), 'data-column-id': t.id },
				});
			case 'fecha': {
				const r = u || '';
				return t.editable === !0
					? `
            <div class="ubits-data-table__date-editable" data-row-id="${c.id}" data-column-id="${t.id}">
              <span class="ubits-body-md-regular ubits-data-table__date-display">${r || 'Seleccionar fecha'}</span>
            </div>
          `
					: `<span class="ubits-body-md-regular">${r}</span>`;
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
				const r = c.expanded || !1;
				return `
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${r ? 'Colapsar' : 'Expandir'} fila"
          data-row-id="${c.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${r ? 'down' : 'right'}" aria-hidden="true"></i>
        </button>
      `;
			}
			default:
				return `<span class="ubits-body-md-regular">${u || ''}</span>`;
		}
	}
	function qt(t, c, b = 0) {
		if (t.type !== 'checkbox' && (t.id === 'checkbox' || t.id.startsWith('checkbox-'))) {
			const p = c.data[t.id] || !1,
				s = Ne({
					label: '',
					checked: p,
					size: 'md',
					className: 'ubits-data-table__cell-checkbox',
				}).replace(
					'<input',
					`<input data-row-id="${c.id}" data-column-id="${t.id}" aria-label="Checkbox ${t.title}"`,
				),
				e = t.id === 'checkbox-2' ? '12px' : 'var(--ubits-spacing-md, 16px)',
				m = t.pinned ? ' ubits-data-table__cell--pinned' : '',
				v = t.pinned
					? `position: sticky !important; left: ${b}px !important; z-index: 12 !important;`
					: '',
				l = `${`text-align: center; vertical-align: middle; padding-left: ${e} !important;`}${v ? ' ' + v : ''}`;
			return `
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${m}" data-column-id="${t.id}" ${t.pinned ? 'data-pinned="true"' : ''} style="${l}">
        ${s}
      </td>
    `;
		}
		if (t.type) {
			const p = Ut(t, c, t.type),
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
				s =
					t.type === 'drag-handle'
						? 'ubits-data-table__cell--drag-handle'
						: t.type === 'expand'
							? 'ubits-data-table__cell--expand'
							: `ubits-data-table__cell--${t.type}`,
				e = o ? 'ubits-data-table__cell--editable' : '',
				m = t.pinned ? ' ubits-data-table__cell--pinned' : '',
				v =
					t.type === 'drag-handle' || t.type === 'expand'
						? 'text-align: center; vertical-align: middle;'
						: '',
				h = t.pinned
					? `position: sticky !important; left: ${b}px !important; z-index: 12 !important;`
					: '',
				l = `${v}${h ? ' ' + h : ''}`,
				w = l ? ` style="${l}"` : '';
			t.pinned &&
				console.log('📌 [CELL TIPO] Columna fijada detectada:', {
					columnId: t.id,
					columnType: t.type,
					rowId: c.id,
					pinned: t.pinned,
					pinnedLeft: b,
					pinnedClass: m,
					pinnedStyle: h,
					hasPinnedClass: m.includes('pinned'),
					hasPinnedStyle: h.includes('left'),
					hasPositionStyle: h.includes('sticky'),
				});
			const S =
				o &&
				(t.type === 'nombre' ||
					t.type === 'nombre-avatar' ||
					t.type === 'estado' ||
					t.type === 'fecha')
					? `data-row-id="${c.id}" data-column-id="${t.id}" data-editable="true"${t.pinned ? ' data-pinned="true"' : ''}`
					: `data-column-id="${t.id}"${t.pinned ? ' data-pinned="true"' : ''}`;
			return `
      <td class="ubits-data-table__cell ${s} ${e}${m}" ${S}${w}>
        ${p}
      </td>
    `;
		}
		const d = t.renderCell ? t.renderCell(c.data) : c.data[t.id] || '',
			r = t.pinned ? ' ubits-data-table__cell--pinned' : '',
			a = t.pinned
				? ` style="position: sticky !important; left: ${b}px !important; z-index: 12 !important;"`
				: '';
		return (
			t.pinned &&
				console.log('📌 [CELL NORMAL] Columna fijada detectada:', {
					columnId: t.id,
					rowId: c.id,
					pinned: t.pinned,
					pinnedLeft: b,
					pinnedClass: r,
					pinnedStyle: a,
					hasPinnedClass: r.includes('pinned'),
					hasPinnedStyle: a.includes('left'),
					hasPositionStyle: a.includes('sticky'),
				}),
			`
    <td class="ubits-data-table__cell${r}" data-column-id="${t.id}"${t.pinned ? ' data-pinned="true"' : ''}${a}>
      ${d}
    </td>
  `
		);
	}
	function zt(t, c = !1, b = !0, u = [], d = null, r = null, a = !0, p = 0) {
		if (t.type === 'drag-handle' || t.type === 'expand') {
			const j = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
				ee = t.pinned
					? `position: sticky !important; left: ${p}px !important; z-index: 10 !important;`
					: '',
				Q = t.width ? `width: ${t.width}px;` : '',
				J = [ee, Q].filter(Boolean).join(' '),
				K = J ? `style="${J}"` : '';
			return `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${t.type}${j}" 
        ${K}
        data-column-id="${t.id}"
        ${t.pinned ? 'data-pinned="true"' : ''}
      >
      </th>
    `;
		}
		const o = t.type !== 'checkbox' && (t.id === 'checkbox' || t.id.startsWith('checkbox-'));
		if ((t.type, o)) {
			const j = u.length > 0 && u.every((ie) => ie.data[t.id] === !0),
				ee = u.some((ie) => ie.data[t.id] === !0),
				J = Ne({
					label: '',
					checked: j,
					indeterminate: ee && !j,
					size: 'md',
					className: 'ubits-data-table__column-checkbox-header',
				}).replace(
					'<input',
					`<input data-column-checkbox-header="${t.id}" aria-label="Seleccionar todos ${t.title}"`,
				),
				K = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
				D = t.pinned
					? `position: sticky !important; left: ${p}px !important; z-index: 10 !important;`
					: '',
				ce = t.width ? `width: ${t.width}px;` : '',
				de = [D, ce].filter(Boolean).join(' '),
				Y = de ? `style="${de}"` : '';
			return `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${K}" 
        ${Y}
        data-column-id="${t.id}"
        ${t.pinned ? 'data-pinned="true"' : ''}
      >
        ${J}
      </th>
    `;
		}
		const s = t.type === 'drag-handle' || t.type === 'expand',
			e =
				c && !o && !s
					? `
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${t.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  `
					: '',
			m =
				!o && !s && b
					? (() => {
							const j = d === t.id,
								ee = j ? ' ubits-data-table__column-sort--active' : '';
							let Q = 'arrow-up-a-z',
								J = 'fas fa-sort-alpha-up';
							return (
								j &&
									r &&
									(r === 'asc'
										? ((Q = 'arrow-up-a-z'), (J = 'fas fa-sort-alpha-up'))
										: ((Q = 'arrow-down-a-z'), (J = 'fas fa-sort-alpha-down'))),
								`
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${ee}" 
           data-column-id="${t.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${t.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${Q}"></wa-icon>
        <i class="${J}" aria-hidden="true"></i>
      </div>
    `
							);
						})()
					: '',
			v =
				!o && !s && a
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
			h = `
    <div class="ubits-data-table__column-header-content">
      ${e}
      <span class="ubits-data-table__column-title">${t.title}</span>
      <div class="ubits-data-table__column-actions">
        ${m}
        ${v}
      </div>
    </div>
  `,
			l = t.pinned ? ' ubits-data-table__column-header--pinned' : '',
			w = t.pinned ? `left: ${p}px !important;` : '',
			S = t.width ? `width: ${t.width}px;` : '',
			k = t.pinned ? 'position: sticky !important;' : '',
			F = t.pinned ? 'z-index: 10 !important;' : '',
			I = [k, w, F, S].filter(Boolean).join(' '),
			T = I ? `style="${I}"` : '';
		t.pinned &&
			console.log('📌 [HEADER PRE-HTML] Antes de construir HTML:', {
				columnId: t.id,
				pinned: t.pinned,
				combinedStyle: I,
				combinedStyleLength: I.length,
				styleAttribute: T,
				willIncludeStyle: !!T,
			});
		const q = `
    <th 
      class="ubits-data-table__column-header${l}" 
      ${T} 
      data-column-id="${t.id}"
      ${t.pinned ? 'data-pinned="true"' : ''}
    >
      ${h}
    </th>
  `;
		return (
			t.pinned &&
				console.log('📌 [HEADER HTML] HTML generado para columna fijada:', {
					columnId: t.id,
					htmlLength: q.length,
					htmlIncludesSticky: q.includes('sticky'),
					htmlIncludesLeft: q.includes('left'),
					htmlIncludesPosition: q.includes('position'),
					htmlIncludesWidth: q.includes('width'),
					styleAttributeInHTML: q.includes('style='),
					htmlPreview: q.substring(0, 400),
				}),
			q
		);
	}
	function Ft(t, c, b, u = []) {
		const d = t.expanded || !1,
			r = c.filter((s) => s.visible !== !1),
			a = r
				.map((s, e) => {
					const m = u[e] || 0;
					return qt(s, t, m);
				})
				.join('');
		let o = `
    <tr class="${['ubits-data-table__row', d ? 'ubits-data-table__row--expanded' : ''].filter(Boolean).join(' ')}" data-row-id="${t.id}">
      ${a}
    </tr>
  `;
		if (d && t.renderExpandedContent) {
			const s = t.renderExpandedContent(t.data),
				e = r.length;
			console.log(
				'📋 [ROW RENDER] Fila expandida - rowId:',
				t.id,
				'colspan:',
				e,
				'tiene contenido:',
				!!s,
			),
				(o += `
      <tr class="ubits-data-table__row-expanded-row" data-expanded-for="${t.id}">
        <td class="ubits-data-table__row-expanded-content" colspan="${e}">
          ${s}
        </td>
      </tr>
    `);
		} else
			d &&
				!t.renderExpandedContent &&
				console.warn(
					'📋 [ROW RENDER] ⚠️ Fila marcada como expandida pero no tiene renderExpandedContent - rowId:',
					t.id,
				);
		return o;
	}
	function Vt(t, c = {}) {
		const { header: b, rows: u } = t;
		if (!b) return '';
		const {
				title: d,
				showTitle: r = d !== void 0,
				counter: a,
				displayedItems: p,
				totalItems: o,
				showCounter: s = a !== void 0 && a !== !1,
				primaryButton: e,
				showPrimaryButton: m = e !== void 0,
				secondaryButtons: v = [],
				showSecondaryButtons: h = v !== void 0 && v.length > 0,
				searchButton: l,
				showSearchButton: w = l !== void 0,
				filterButton: S,
				showFilterButton: k = S !== void 0,
				columnSelectorButton: F,
				showColumnSelectorButton: I = F !== void 0,
			} = b,
			T = b.__isSearchActive || !1,
			q = b.__searchTerm || '';
		let j = '';
		if (s && a) {
			if (typeof a == 'string')
				a === 'total-only' ? (j = `${o !== void 0 ? o : u.length} resultados`) : (j = a);
			else if (a === !0) {
				const ie = p !== void 0 ? p : u.length,
					re = o !== void 0 ? o : u.length;
				(j = `${ie}/${re} resultados`),
					console.log('🔢 [COUNTER] Calculando contador:', {
						displayedItems: p,
						totalItems: o,
						rowsLength: u.length,
						currentDisplayed: ie,
						total: re,
						counterText: j,
					});
			}
		}
		const ee =
				r && d
					? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-body-md-bold ubits-data-table__header-title-text">${d}</span>
      ${j ? `<span class="ubits-data-table__header-counter ubits-body-sm-regular">${j}</span>` : ''}
    </div>
  `
					: j
						? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-data-table__header-counter ubits-body-sm-regular">${j}</span>
    </div>
  `
						: '',
			Q =
				m && e
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
			J =
				h && v.length > 0
					? v
							.slice(0, 2)
							.map((ie) =>
								$e({
									variant: 'secondary',
									size: 'sm',
									icon: ie.icon || 'download',
									iconStyle: ie.iconStyle || 'regular',
									iconOnly: !0,
									disabled: ie.disabled || !1,
									loading: ie.loading || !1,
									className: 'ubits-data-table__header-secondary-button',
									showTooltip: !0,
									tooltipText: ie.text || '',
								}),
							)
							.join('')
					: '',
			K = Object.keys(c).filter((ie) => c[ie] && c[ie].trim() !== '').length;
		let D =
			k && S
				? $e({
						variant: 'secondary',
						size: 'sm',
						icon: 'filter',
						iconStyle: 'regular',
						iconOnly: !0,
						disabled: S.disabled || !1,
						active: S.active || !1 || K > 0,
						badge: K > 0,
						className: 'ubits-data-table__header-filter-button',
						showTooltip: !0,
						tooltipText: 'Filtros',
					})
				: '';
		if (D && K > 0) {
			const ie = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${K}</span>`;
			D = D.replace('<span class="ubits-button__badge"></span>', ie);
		}
		const ce =
				I && F
					? $e({
							variant: 'secondary',
							size: 'sm',
							icon: 'columns-3',
							iconStyle: 'regular',
							iconOnly: !0,
							disabled: F.disabled || !1,
							active: F.active || !1,
							className: 'ubits-data-table__header-column-selector-button',
							showTooltip: !0,
							tooltipText: 'Seleccionar columnas',
						})
					: '',
			de = q || (l && l.value) || '',
			Y =
				w && l
					? We({
							active: T,
							size: 'sm',
							state: T ? 'active' : 'default',
							disabled: l.disabled || !1,
							placeholder: l.placeholder || 'Buscar...',
							value: de,
							width: 248,
							className: 'ubits-data-table__header-search-button',
						})
					: '';
		return !(ee || Q || J || Y || D || ce)
			? (console.warn('⚠️ [DATA TABLE HEADER] No hay elementos para renderizar, retornando vacío'),
				'')
			: `
    <div class="ubits-data-table__header">
      ${ee}
      <div class="ubits-data-table__header-actions">
        ${Y}
        ${D}
        ${ce}
        ${J}
        ${Q}
      </div>
    </div>
  `.trim();
	}
	function qe(t, c = [], b = [], u = {}) {
		const {
				columns: d,
				rows: r,
				className: a = '',
				columnReorderable: p = !1,
				columnSortable: o = !0,
				rowReorderable: s = !1,
				rowExpandable: e = !0,
				showCheckbox: m = !0,
				showVerticalScrollbar: v = !1,
				showHorizontalScrollbar: h = !1,
				showColumnMenu: l = !0,
				showPagination: w = !1,
				currentPage: S = 1,
				itemsPerPage: k = 10,
				paginationVariant: F = 'default',
				paginationSize: I = 'md',
				lazyLoad: T,
				lazyLoadItemsPerBatch: q = 10,
				emptyState: j,
			} = t,
			ee = t.header?.__searchTerm || '',
			Q = w ? !1 : T !== !1;
		console.log(
			'🔍 [RENDER] isLazyLoadEnabled calculado:',
			Q,
			'| showPagination:',
			w,
			'| lazyLoad:',
			T,
		);
		const J = new Set(),
			K = d.filter((n) =>
				J.has(n.id)
					? (console.log('🔍 [RENDER DATA TABLE] ⚠️ COLUMNA DUPLICADA ELIMINADA:', n.id, n.title),
						!1)
					: (J.add(n.id), !0),
			);
		console.log('🔍 [RENDER DATA TABLE] Columnas únicas:', K.length, 'de', d.length, 'totales');
		let D = K.filter((n) => n.visible !== !1);
		if (((D = D.filter((n) => n.id !== 'checkbox')), c.length > 0)) {
			const n = c.filter((f) => f !== 'checkbox'),
				i = new Map(
					D.map((f) => {
						const C = { ...f };
						return f.pinned !== void 0 && (C.pinned = f.pinned), [f.id, C];
					}),
				);
			D = n
				.map((f) => {
					const C = i.get(f);
					if (C) {
						const _ = D.find((H) => H.id === f);
						_ && _.pinned !== void 0 && (C.pinned = _.pinned);
					}
					return C;
				})
				.filter((f) => f !== void 0)
				.concat(
					D.filter((f) => !n.includes(f.id)).map((f) => {
						const C = { ...f };
						return f.pinned !== void 0 && (C.pinned = f.pinned), C;
					}),
				);
		} else
			D = D.map((n) => {
				const i = { ...n };
				return n.pinned !== void 0 && (i.pinned = n.pinned), i;
			});
		if (m !== !1) {
			if (!D.some((i) => i.id === 'checkbox-2')) {
				const i = { id: 'checkbox-2', title: '', type: void 0, visible: !0, width: 48 };
				D.unshift(i);
			}
		} else D.map((n) => n.id), (D = D.filter((n) => n.id !== 'checkbox-2')), D.map((n) => n.id);
		if (s) {
			if (!D.some((i) => i.type === 'drag-handle')) {
				const i = { id: 'drag-handle', title: '', type: 'drag-handle', visible: !0, width: 32 };
				D.unshift(i);
			}
		} else D = D.filter((n) => n.type !== 'drag-handle');
		if (e) {
			if (!D.some((i) => i.type === 'expand')) {
				const i = { id: 'expand', title: '', type: 'expand', visible: !0, width: 32 },
					f = D.findIndex((C) => C.type === 'drag-handle');
				f >= 0 ? D.splice(f + 1, 0, i) : D.unshift(i);
			}
		} else D = D.filter((n) => n.type !== 'expand');
		const { checkboxSticky: ce = !1, dragHandleSticky: de = !1, expandSticky: Y = !1 } = t;
		(D = D.map((n) => {
			const i = { ...n };
			return (
				n.id === 'checkbox-2'
					? ce === !0
						? (i.pinned = !0)
						: (i.pinned = !1)
					: n.type === 'drag-handle'
						? de === !0
							? (i.pinned = !0)
							: (i.pinned = !1)
						: n.type === 'expand' && (Y === !0 ? (i.pinned = !0) : (i.pinned = !1)),
				i.pinned && !n.id.startsWith('checkbox') && n.type !== 'drag-handle' && n.type,
				i
			);
		})),
			D.filter((n) => n.pinned);
		const me = t.sortColumnId || null,
			ie = t.sortDirection || null;
		let re = [...r];
		if (b.length > 0) {
			const n = new Map(r.map((i) => [i.id, i]));
			re = b
				.map((i) => n.get(i))
				.filter((i) => i !== void 0)
				.concat(r.filter((i) => !b.includes(i.id)));
		}
		me &&
			ie &&
			(re = [...re].sort((n, i) => {
				const f = n.data[me],
					C = i.data[me];
				if (f == null && C == null) return 0;
				if (f == null) return 1;
				if (C == null) return -1;
				const _ = String(f).toLowerCase(),
					H = String(C).toLowerCase();
				let A = 0;
				return _ < H ? (A = -1) : _ > H && (A = 1), ie === 'asc' ? A : -A;
			}));
		const V = (n, i, f) => {
				let C = 0;
				const _ = { columnId: n.id, steps: [] };
				for (let H = 0; H < i; H++) {
					const A = f[H];
					if (A && A.pinned) {
						let O = A.width;
						O ||
							(A.type === 'drag-handle' || A.type === 'expand'
								? (O = 32)
								: A.id === 'checkbox-2'
									? (O = 48)
									: (O = 150)),
							(C += O),
							_.steps.push({
								step: `columna-${A.id}`,
								added: O,
								total: C,
								reason: `Columna fijada anterior: ${A.id} (tipo: ${A.type || 'normal'})`,
							});
					} else
						A &&
							!A.pinned &&
							_.steps.push({
								step: `columna-${A.id}`,
								added: 0,
								total: C,
								reason: `Columna anterior no fijada: ${A.id}`,
							});
				}
				return (_.finalLeft = C), n.pinned, C;
			},
			se = D.map((n, i) => {
				const f = n.pinned ? V(n, i, D) : 0;
				return n.pinned, zt(n, p, o, re, me, ie, l, f);
			}).join('');
		let ne = re,
			pe = 1,
			xe = '';
		const Ee = t.__lazyLoadCurrentItems || q;
		if (
			(console.log('🔍 [RENDER] ========== FILAS DEBUG =========='),
			console.log('🔍 [RENDER] orderedRows.length:', re.length),
			console.log('🔍 [RENDER] showPagination:', w),
			console.log('🔍 [RENDER] isLazyLoadEnabled:', Q),
			console.log('🔍 [RENDER] lazyLoad option:', t.lazyLoad),
			console.log('🔍 [RENDER] currentLoadedItems:', Ee),
			console.log('🔍 [RENDER] lazyLoadItemsPerBatch:', q),
			w)
		) {
			const n = re.length;
			pe = Math.max(1, Math.ceil(n / k));
			const i = Math.max(1, Math.min(S, pe)),
				f = (i - 1) * k,
				C = f + k;
			(ne = re.slice(f, C)),
				console.log('🔍 [RENDER] Modo PAGINACIÓN - totalRows:', n, 'paginatedRows:', ne.length);
			try {
				xe = Ct({
					currentPage: i,
					totalPages: pe,
					totalItems: n,
					itemsPerPage: k,
					variant: F,
					size: I,
					maxVisiblePages: 7,
					showFirst: !1,
					showLast: !1,
					showPrevNext: !0,
					showInfo: !1,
					showItemsPerPage: !1,
					itemsPerPageOptions: [10, 20, 50, 100],
					className: 'ubits-data-table__pagination',
				});
			} catch (_) {
				console.error('❌ [PAGINATION] ERROR:', _), (xe = '');
			}
		} else
			Q
				? ((ne = re.slice(0, Ee)),
					console.log(
						'🔍 [RENDER] Modo LAZY LOAD - Mostrando',
						ne.length,
						'de',
						re.length,
						'filas',
					))
				: console.log(
						'🔍 [RENDER] Modo SIN PAGINACIÓN NI LAZY LOAD - Mostrando todas las filas:',
						re.length,
					);
		console.log('🔍 [RENDER] paginatedRows.length final:', ne.length),
			console.log('🔍 [RENDER] ========== FIN FILAS DEBUG ==========');
		let Se = '';
		const ge = r.length === 0,
			ye = ne.length === 0,
			ve = Object.keys(u).length > 0,
			we = ee && ee.trim() !== '';
		if (ye && j) {
			let n;
			ge && j.noData
				? (n = j.noData)
				: we && j.noSearchResults
					? (n = j.noSearchResults)
					: ve && j.noFilterResults && (n = j.noFilterResults),
				n &&
					(Se = Pt({
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
		const Be = ne
			.map((n, i) => {
				const f = D.map((C, _) => (C.pinned ? V(C, _, D) : 0));
				return Ft(n, D, i, f);
			})
			.join('');
		console.log(
			'🔍 [RENDER] rowsHTML generado, número de <tr> en HTML:',
			(Be.match(/<tr/g) || []).length,
		),
			console.log('🔍 [RENDER] paginatedRows procesadas:', ne.length);
		const Ce = Se || Be,
			ke = ['ubits-data-table', a].filter(Boolean).join(' '),
			He = D.length,
			_e = `
    <table class="${ke} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${se}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${Se ? `<tr><td colspan="${He}" style="padding: 0;">${Se}</td></tr>` : Ce}
      </tbody>
    </table>
  `.trim(),
			B = D.some((n) => n.pinned);
		let L = h;
		B && !h && (L = !0);
		let g = v;
		if ((Q && !w && (g = !0), !w && !Q && !g)) {
			const n = 45 + re.length * 45;
			n > 600 &&
				((g = !0),
				console.log(
					'🔍 [RENDER] Habilitando scroll vertical automáticamente - altura estimada:',
					n,
					'px',
				));
		}
		let x;
		if (g || L) {
			const n = [];
			g && n.push('ubits-data-table__scrollable-container--vertical'),
				L && n.push('ubits-data-table__scrollable-container--horizontal'),
				(x = `<div class="ubits-data-table__scrollable-container ${n.join(' ')}">${_e}</div>`);
		} else x = _e;
		const E = Vt(t, u);
		let y;
		return (
			w && xe
				? (y = `<div class="ubits-data-table__container">
      ${E}
      ${x}
      <div class="ubits-data-table__pagination-wrapper">${xe}</div>
    </div>`)
				: E
					? (y = `<div class="ubits-data-table__container">
        ${E}
        ${x}
      </div>`)
					: (y = x),
			y
		);
	}
	function Ye(t) {
		const c = t.containerId ? document.getElementById(t.containerId) : document.body;
		if (!c) throw new Error(`Container with id "${t.containerId}" not found`);
		const b = c.querySelector('.ubits-data-table'),
			u = c.querySelector('.ubits-data-table__scrollable-container');
		if (u) {
			const se = u.querySelector('.ubits-data-table');
			if (se) {
				const ne = se;
				if (ne._dataTableInstance)
					try {
						const pe = ne._dataTableInstance;
						pe && typeof pe.destroy == 'function' && pe.destroy();
					} catch (pe) {
						console.warn('Error destroying previous table instance:', pe);
					}
			}
			u.remove();
		} else if (b) {
			const V = b;
			if (V._dataTableInstance)
				try {
					const se = V._dataTableInstance;
					se && typeof se.destroy == 'function' && se.destroy();
				} catch (se) {
					console.warn('Error destroying previous table instance:', se);
				}
			b.remove();
		}
		const d = t.lazyLoad !== !1 && !t.showPagination ? t.lazyLoadItemsPerBatch || 10 : void 0,
			r = { ...t, __lazyLoadCurrentItems: d },
			a = qe(r),
			p = document.createElement('div');
		p.innerHTML = a.trim();
		const o = p.firstElementChild;
		if (!o) throw new Error('Failed to create data table 3 element');
		c.appendChild(o);
		const s = (V) => {
			const se = new Set(),
				ne = [];
			for (const pe of V)
				se.has(pe.id)
					? console.log(
							'🔍 [CREATE DATA TABLE] ⚠️ COLUMNA DUPLICADA ELIMINADA al inicializar:',
							pe.id,
							pe.title,
						)
					: (se.add(pe.id), ne.push({ ...pe }));
			return (
				ne.length !== V.length &&
					console.log(
						'🔍 [CREATE DATA TABLE] Columnas duplicadas eliminadas:',
						V.length,
						'->',
						ne.length,
					),
				ne
			);
		};
		let e = { ...t, columns: s(t.columns) },
			m = e.columns.filter((V) => V.visible !== !1).map((V) => V.id),
			v = e.rows.map((V) => V.id),
			h = null,
			l = null,
			w = null,
			S = null,
			k = '',
			F = !1,
			I = null,
			T = {},
			q = null;
		const j = (V, se, ne) => {
				if (!se || se.trim() === '') return V;
				const pe = se.toLowerCase().trim(),
					xe = ne.filter((Ee) => Ee.visible !== !1);
				return V.filter((Ee) =>
					xe.some((Se) => {
						const ge = Ee.data[Se.id];
						return ge == null ? !1 : String(ge).toLowerCase().includes(pe);
					}),
				);
			},
			ee = (V, se, ne) => {
				const pe = Object.entries(se).filter(([xe, Ee]) => Ee && Ee.trim() !== '');
				return pe.length === 0
					? V
					: V.filter((xe) =>
							pe.every(([Ee, Se]) => {
								const ge = ne.find((Ce) => Ce.id === Ee);
								if (!ge) {
									const Ce = e.header?.filterButton?.filters?.find((L) => L.id === Ee);
									if (!Ce) return !0;
									const ke = Ce.columnId,
										He = xe.data[ke];
									if (He == null) return !1;
									const _e = String(He).toLowerCase().trim(),
										B = Se.toLowerCase().trim();
									switch (Ce.type) {
										case 'text':
											return _e.includes(B);
										case 'select':
											return _e === B;
										case 'number':
											return _e === B || parseFloat(_e) === parseFloat(B);
										case 'date':
											return _e.includes(B);
										default:
											return _e.includes(B);
									}
								}
								const ye = xe.data[ge.id];
								if (ye == null) return !1;
								const ve = String(ye).toLowerCase().trim(),
									we = Se.toLowerCase().trim();
								switch (ge.type || 'text') {
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
			Q = e.showPagination ? !1 : e.lazyLoad !== !1,
			J = e.lazyLoadItemsPerBatch || 10;
		let K = J,
			D = null;
		const ce = () => {
				if (D) {
					const ne = o.querySelector('.ubits-data-table__scrollable-container');
					ne && ne.removeEventListener('scroll', D),
						window.removeEventListener('scroll', D, !0),
						(D = null);
				}
				const V = o.querySelector('.ubits-data-table__scrollable-container'),
					se = () => {
						const ne = e.rows.length;
						if (K >= ne) return;
						let pe, xe, Ee;
						if (V) (pe = V.scrollTop), (xe = V.scrollHeight), (Ee = V.clientHeight);
						else {
							(pe = window.scrollY || document.documentElement.scrollTop),
								(xe = document.documentElement.scrollHeight),
								(Ee = window.innerHeight);
							const ye = o.getBoundingClientRect().bottom + pe;
							if (pe + Ee >= ye - 200) {
								const we = Math.min(K + J, ne);
								we > K &&
									((K = we),
									console.log('📦 [LAZY LOAD] Cargando más items:', K, 'de', ne),
									e.onLazyLoad && e.onLazyLoad(K, ne),
									Y(!0));
							}
							return;
						}
						if ((pe + Ee) / xe >= 0.8) {
							const ge = Math.min(K + J, ne);
							ge > K &&
								((K = ge),
								console.log('📦 [LAZY LOAD] Cargando más items:', K, 'de', ne),
								e.onLazyLoad && e.onLazyLoad(K, ne),
								Y(!0));
						}
					};
				V
					? ((D = se),
						V.addEventListener('scroll', D, { passive: !0 }),
						console.log('✅ [LAZY LOAD] Listener agregado al contenedor scrollable'))
					: (console.warn(
							'⚠️ [LAZY LOAD] No se encontró contenedor scrollable, esperando renderizado...',
						),
						setTimeout(() => {
							const ne = o.querySelector('.ubits-data-table__scrollable-container');
							ne
								? ((D = se),
									ne.addEventListener('scroll', D, { passive: !0 }),
									console.log('✅ [LAZY LOAD] Contenedor scrollable encontrado después de esperar'))
								: console.error(
										'❌ [LAZY LOAD] No se pudo encontrar contenedor scrollable. El lazy load requiere scroll vertical activo.',
									);
						}, 100));
			},
			de = () => {
				o.querySelectorAll('wa-icon').forEach((se) => {
					const ne = se.nextElementSibling;
					ne &&
						ne.tagName === 'I' &&
						(customElements.get('wa-icon')
							? ((se.style.display = 'inline-block'),
								(se.style.width = '12px'),
								(se.style.height = '12px'),
								(se.style.opacity = '1'),
								(ne.style.display = 'none'))
							: ((se.style.display = 'none'),
								(ne.style.display = 'inline-block'),
								(ne.style.fontSize = '12px'),
								(ne.style.width = '12px'),
								(ne.style.height = '12px')));
				});
			},
			Y = (V = !1) => {
				const se = `render-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
					pe = (
						new Error().stack?.split(`
`) || []
					)
						.slice(1, 5)
						.join(`
`);
				console.log(`🔄 [RENDER] ========== INICIO RENDER [${se}] ==========`),
					console.log('🔄 [RENDER] Stack trace:', pe),
					console.log('🔄 [RENDER] preserveScroll:', V);
				const xe = pe.includes('SELECT ALL') || pe.includes('selectAll'),
					Ee = pe.includes('CHECKBOX') || pe.includes('checkbox'),
					Se = pe.includes('HTMLInputElement') && Ee;
				(xe || Se) &&
					console.warn(
						'🔄 [RENDER] ⚠️ RENDER LLAMADO DESDE SELECT ALL O CHECKBOX HANDLER - Esto puede causar el salto!',
						{
							isFromSelectAll: xe,
							isFromCheckbox: Ee,
							isFromSelectAllHandler: Se,
							callerInfo: pe
								.split(`
`)
								.slice(0, 3),
						},
					);
				let ge = 0,
					ye = 0,
					ve = 0,
					we = V;
				const Be = o.querySelector('.ubits-data-table__scrollable-container');
				if (Be) {
					(ge = Be.scrollTop), (ye = Be.scrollHeight), (ve = Be.clientHeight);
					const H = ye > ve;
					H &&
						!V &&
						((we = !0),
						console.log(
							`🔄 [RENDER] 📍 Contenido con scroll detectado (scrollHeight: ${ye}px > clientHeight: ${ve}px), preservando automáticamente para evitar salto`,
						)),
						ge > 0 &&
							!V &&
							!we &&
							((we = !0),
							console.log(
								`🔄 [RENDER] 📍 Scroll activo detectado (${ge}px), preservando automáticamente para evitar salto`,
							)),
						console.log('🔄 [RENDER] 📍 Scroll guardado:', {
							scrollTop: ge,
							scrollHeight: ye,
							clientHeight: ve,
							maxScroll: ye - ve,
							scrollPercentage: ye > ve ? (ge / (ye - ve)) * 100 : 0,
							shouldPreserve: we,
							hasScrollableContent: H,
						});
				} else
					console.log(
						'🔄 [RENDER] ⚠️ No se encontró scrollableContainer, no se puede preservar scroll',
					);
				let Ce = e.rows;
				Object.keys(T).length > 0 && (Ce = ee(Ce, T, e.columns)), k && (Ce = j(Ce, k, e.columns));
				const ke = {
					...e,
					rows: Ce,
					columns: e.columns.map((H) => {
						const A = { ...H };
						return H.pinned !== void 0 && (A.pinned = H.pinned), A;
					}),
					sortColumnId: w,
					sortDirection: S,
					__lazyLoadCurrentItems: K,
					header: e.header
						? {
								...e.header,
								displayedItems:
									e.header.displayedItems !== void 0 && !k && Object.keys(T).length === 0
										? e.header.displayedItems
										: Ce.length,
								__isSearchActive: F,
								__searchTerm: k,
							}
						: void 0,
				};
				console.log('🔍 [RENDER] Eliminando columnas duplicadas antes de renderizar...'),
					console.log('🔍 [RENDER] Columnas ANTES de eliminar duplicados:', ke.columns.length),
					console.log(
						'🔍 [RENDER] IDs de columnas:',
						ke.columns.map((H) => H.id),
					);
				const He = new Set(),
					_e = ke.columns.filter((H) =>
						He.has(H.id)
							? (console.log('🔍 [RENDER] ⚠️ COLUMNA DUPLICADA ELIMINADA:', H.id, H.title), !1)
							: (He.add(H.id), !0),
					);
				console.log('🔍 [RENDER] Columnas DESPUÉS de eliminar duplicados:', _e.length),
					console.log('🔍 [RENDER] IDs únicos:', Array.from(He)),
					(ke.columns = _e),
					console.log('🔍 [DATA TABLE] Renderizando:', {
						displayedItems: ke.header?.displayedItems,
						totalItems: ke.header?.totalItems,
						filteredRows: Ce.length,
						hasSearch: !!k,
						hasFilters: Object.keys(T).length > 0,
						uniqueColumnsCount: _e.length,
					});
				const B = qe(ke, m, v, T);
				console.log('🔄 [RENDER] HTML generado, longitud:', B.length),
					console.log('🔄 [RENDER] Reemplazando innerHTML del elemento (esto causa el brinco)...'),
					console.log('🔄 [RENDER] 📍 Estado ANTES de innerHTML:', {
						scrollTop: ge,
						scrollHeight: ye,
						clientHeight: ve,
						shouldPreserve: we,
					});
				const L = performance.now();
				o.innerHTML = B.trim();
				const g = performance.now();
				if (
					(console.log(`🔄 [RENDER] innerHTML reemplazado en ${(g - L).toFixed(2)}ms`),
					console.log('🔄 [RENDER] 📍 innerHTML reemplazado, ahora restaurando scroll...'),
					e.header?.searchButton && e.header?.showSearchButton !== !1)
				) {
					const H = o.querySelector('.ubits-data-table__header-search-button');
					if (H) {
						if (I)
							try {
								I.destroy();
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
								(I = wt({
									containerId: A.id,
									active: F,
									size: 'sm',
									state: F ? 'active' : 'default',
									disabled: e.header.searchButton.disabled || !1,
									placeholder: e.header.searchButton.placeholder || 'Buscar...',
									value: k,
									width: 248,
									className: 'ubits-data-table__header-search-button',
									onChange: (Z) => {
										const $ = Z.target.value;
										if (
											((k = $),
											e.header.searchButton.onChange && e.header.searchButton.onChange($),
											Y(),
											e.header.searchButton.onSearch)
										) {
											const P = j(e.rows, $, e.columns);
											console.log(
												'🔍 [SEARCH] onSearch callback ejecutado desde SearchButton onChange:',
												{ searchTerm: $, filteredRowsCount: P.length, componentId: e.containerId },
											),
												e.header.searchButton.onSearch($, P);
										}
									},
									onClick: (Z) => {
										Z.stopPropagation(),
											Z.preventDefault(),
											(F = !0),
											e.header.searchButton.onClick && e.header.searchButton.onClick(Z),
											Y(),
											setTimeout(() => {
												const $ = I?.element.querySelector('.ubits-search-button__input');
												$ && $.focus();
											}, 150);
									},
									onBlur: (Z) => {
										const $ = Z.target;
										setTimeout(() => {
											if (!$.value.trim() && document.activeElement !== $) {
												const P = I?.element.querySelector('.ubits-search-button__clear');
												document.activeElement !== P && ((F = !1), Y());
											}
										}, 200);
									},
								}));
							const O = I.element;
							H.parentNode?.replaceChild(O, H),
								F &&
									O.style.width &&
									(console.log('🔍 [DATA TABLE] Removiendo width inline:', O.style.width),
									(O.style.width = '')),
								document.body.removeChild(A);
						}
						setTimeout(() => {
							const A = o.querySelector(
									'.ubits-data-table__header-search-button.ubits-search-button--active',
								),
								O = A?.previousElementSibling;
							if (A && O) {
								const Z = A.getBoundingClientRect(),
									$ = O.getBoundingClientRect(),
									P = window.getComputedStyle(A),
									G = A.querySelector('.ubits-search-button__input-wrapper'),
									N = G ? window.getComputedStyle(G) : null,
									M = {
										actualGap: Z.left - $.right,
										expectedGap: 8,
										difference: Z.left - $.right - 8,
										searchButton: {
											left: Z.left,
											width: Z.width,
											right: Z.right,
											marginLeft: P.marginLeft,
											marginRight: P.marginRight,
											inlineWidth: A.style.width || 'none',
											computedWidth: P.width,
										},
										prevButton: { right: $.right, width: $.width },
										inputWrapper: { width: N?.width || 'N/A', computedWidth: N?.width || 'N/A' },
									};
								if (
									(console.log('🔍 [DATA TABLE] Posicionamiento del SearchButton activo:', M),
									Math.abs(M.actualGap - 8) > 1)
								) {
									const z = Z.width,
										X = M.actualGap,
										oe = 8,
										ue = -(z - 32 - oe);
									console.log('🔍 [DATA TABLE] Cálculo de margin-left:', {
										buttonWidth: 32,
										inputWidth: z,
										currentGap: X,
										desiredGap: oe,
										neededMarginLeft: ue,
										currentMarginLeft: P.marginLeft,
									});
								}
							}
						}, 100),
							console.log('🔍 [DATA TABLE] SearchButton componente completo integrado');
					}
				}
				console.log('🔄 [RENDER] Llamando attachEventListeners()...'),
					me(),
					console.log('🔄 [RENDER] attachEventListeners() completado'),
					de(),
					console.log(`🔄 [RENDER] ========== FIN RENDER [${se}] ==========`),
					e.showPagination &&
						setTimeout(() => {
							_();
						}, 100),
					Q && !e.showPagination && ce();
				const x = we || (ye > 0 && ve > 0 && ye > ve);
				x
					? (console.log('🔄 [RENDER] 📍 Restaurando scroll después del render...'),
						requestAnimationFrame(() => {
							const H = o.querySelector('.ubits-data-table__scrollable-container');
							if (H) {
								const A = H.scrollHeight,
									O = H.clientHeight,
									Z = A - O,
									$ = ye - ve,
									P = $ > 0 ? ge / $ : 0;
								if (
									(console.log('🔄 [RENDER] 📍 Cálculo de restauración de scroll:', {
										old: { scrollTop: ge, scrollHeight: ye, clientHeight: ve, maxScroll: $ },
										new: { scrollHeight: A, clientHeight: O, maxScroll: Z },
										scrollPercentage: (P * 100).toFixed(2) + '%',
										newScrollTop: Z > 0 ? P * Z : 0,
									}),
									Z > 0)
								) {
									const G = P * Z;
									(H.scrollTop = G),
										console.log('🔄 [RENDER] 📍 Scroll restaurado:', {
											anterior: ge,
											nuevo: G,
											diferencia: Math.abs(G - ge),
											restauradoCorrectamente: Math.abs(G - ge) < 10,
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
				const E = o.querySelectorAll('.ubits-data-table__row');
				console.log('🎨 [HOVER DEBUG] Filas encontradas:', E.length);
				const y = o.querySelector('.ubits-data-table__table'),
					n = o.querySelector('.ubits-data-table__tbody'),
					i = o.querySelector('.ubits-data-table__scrollable-container'),
					f = o.querySelector('.ubits-data-table');
				if (
					(console.log('📏 [HEIGHT DEBUG] ========== VERIFICANDO ALTURAS =========='),
					y &&
						console.log(
							'📏 [HEIGHT DEBUG] table.scrollHeight:',
							y.scrollHeight,
							'table.clientHeight:',
							y.clientHeight,
							'table.offsetHeight:',
							y.offsetHeight,
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
					i &&
						(console.log(
							'📏 [HEIGHT DEBUG] scrollableContainer.scrollHeight:',
							i.scrollHeight,
							'scrollableContainer.clientHeight:',
							i.clientHeight,
							'scrollableContainer.offsetHeight:',
							i.offsetHeight,
						),
						console.log(
							'📏 [HEIGHT DEBUG] scrollableContainer max-height:',
							window.getComputedStyle(i).maxHeight,
						)),
					f &&
						(console.log(
							'📏 [HEIGHT DEBUG] dataTableContainer.scrollHeight:',
							f.scrollHeight,
							'dataTableContainer.clientHeight:',
							f.clientHeight,
							'dataTableContainer.offsetHeight:',
							f.offsetHeight,
						),
						console.log(
							'📏 [HEIGHT DEBUG] dataTableContainer max-height:',
							window.getComputedStyle(f).maxHeight,
						)),
					E.length > 0)
				) {
					const H = E[0],
						A = E[1],
						O = E[E.length - 1];
					console.log('📏 [HEIGHT DEBUG] ========== COMPARACIÓN DE FILAS ==========');
					const Z = H.getBoundingClientRect(),
						$ = A ? A.getBoundingClientRect() : null;
					O.getBoundingClientRect();
					const P = window.innerHeight;
					console.log('📏 [HEIGHT DEBUG] Primera fila (funciona):'),
						console.log('  - offsetTop:', H.offsetTop),
						console.log('  - offsetHeight:', H.offsetHeight),
						console.log('  - getBoundingClientRect:', {
							top: Z.top,
							bottom: Z.bottom,
							left: Z.left,
							right: Z.right,
							width: Z.width,
							height: Z.height,
							visibleInViewport: Z.top >= 0 && Z.bottom <= P,
						}),
						A &&
							$ &&
							(console.log('📏 [HEIGHT DEBUG] Segunda fila (no funciona):'),
							console.log('  - offsetTop:', A.offsetTop),
							console.log('  - offsetHeight:', A.offsetHeight),
							console.log('  - getBoundingClientRect:', {
								top: $.top,
								bottom: $.bottom,
								left: $.left,
								right: $.right,
								width: $.width,
								height: $.height,
								visibleInViewport: $.top >= 0 && $.bottom <= P,
								belowViewport: $.top > P,
								aboveViewport: $.bottom < 0,
							}),
							console.log('  - viewportHeight:', P),
							console.log(
								'  - Diferencia con primera fila (offsetTop):',
								A.offsetTop - H.offsetTop,
							),
							console.log(
								'  - Diferencia con primera fila (getBoundingClientRect.top):',
								$.top - Z.top,
							)),
						console.log('📏 [HEIGHT DEBUG] Última fila:'),
						console.log('  - offsetTop:', O.offsetTop),
						console.log('  - offsetHeight:', O.offsetHeight),
						console.log('  - getBoundingClientRect:', O.getBoundingClientRect()),
						console.log(
							'📏 [HEIGHT DEBUG] Altura total estimada (última fila offsetTop + offsetHeight):',
							O.offsetTop + O.offsetHeight,
						),
						console.log('📏 [HEIGHT DEBUG] ========== FIN COMPARACIÓN ==========');
				}
				if (
					(console.log('📏 [HEIGHT DEBUG] ========== FIN ALTURAS =========='),
					E.forEach((H, A) => {
						if (A === 0) {
							const O = H.querySelectorAll('td');
							console.log('🎨 [HOVER DEBUG] Celdas en la primera fila:', O.length),
								O.forEach((Z, $) => {
									const P = Z,
										G = Array.from(P.classList),
										N = window.getComputedStyle(P).backgroundColor;
									console.log(`🎨 [HOVER DEBUG] Celda ${$}:`, {
										classes: G,
										computedBackground: N,
										hasDragHandle: G.includes('ubits-data-table__cell--drag-handle'),
										hasExpand: G.includes('ubits-data-table__cell--expand'),
										hasCheckbox: G.includes('ubits-data-table__cell--checkbox'),
										hasControlsColumn: G.includes('ubits-data-table__controls-column'),
										hasCell: G.includes('ubits-data-table__cell'),
									});
								});
						}
					}),
					E.length > 0)
				) {
					const H = E[0];
					H.addEventListener('mouseenter', () => {
						console.log('🎨 [HOVER DEBUG] ========== HOVER ENTRÓ EN FILA =========='),
							H.querySelectorAll('td').forEach((O, Z) => {
								const $ = O,
									P = Array.from($.classList),
									G = window.getComputedStyle($).backgroundColor;
								console.log(`🎨 [HOVER DEBUG] Celda ${Z} en hover:`, {
									classes: P,
									computedBackground: G,
									hasDragHandle: P.includes('ubits-data-table__cell--drag-handle'),
									hasExpand: P.includes('ubits-data-table__cell--expand'),
								});
							});
					}),
						H.addEventListener('mouseleave', () => {
							console.log('🎨 [HOVER DEBUG] ========== HOVER SALIÓ DE FILA ==========');
						});
				}
				o.querySelectorAll('input[data-column-checkbox-header]').forEach((H) => {
					const A = H,
						O = A.getAttribute('data-column-checkbox-header');
					if (O) {
						const Z = e.rows.length > 0 && e.rows.every((G) => G.data[O] === !0),
							$ = e.rows.some((G) => G.data[O] === !0),
							P = $ && !Z;
						(A.indeterminate = P),
							console.log(
								'📋 [INDETERMINATE] Header checkbox',
								O,
								'- indeterminate:',
								P,
								'(allChecked:',
								Z,
								'someChecked:',
								$,
								')',
							);
					}
				});
				const _ = () => {
					try {
						console.log('📄 [SPACING] ========== VERIFICANDO ESPACIADO DEL PAGINADOR ==========');
						const H =
							o.closest('.ubits-data-table__container') ||
							o.querySelector('.ubits-data-table__container');
						if ((console.log('📄 [SPACING] Container encontrado:', !!H), H)) {
							const A = window.getComputedStyle(H);
							console.log('📄 [SPACING] Container estilos:'),
								console.log('  - display:', A.display),
								console.log('  - flexDirection:', A.flexDirection),
								console.log('  - gap:', A.gap);
							const O =
								H.querySelector('.ubits-data-table__scrollable-container') ||
								H.querySelector('.ubits-data-table');
							console.log('📄 [SPACING] Table container encontrado:', !!O);
							const $ = (O?.querySelector('.ubits-data-table__table') || O)?.querySelector(
								'.ubits-data-table__row:last-child',
							);
							if ((console.log('📄 [SPACING] Última fila encontrada:', !!$), O)) {
								const G = window.getComputedStyle(O);
								if (
									(console.log('📄 [SPACING] Table container estilos:'),
									console.log('  - marginBottom:', G.marginBottom),
									console.log('  - paddingBottom:', G.paddingBottom),
									console.log('  - borderBottom:', G.borderBottom),
									$)
								) {
									const N = $.getBoundingClientRect();
									console.log('📄 [SPACING] Última fila posición:'),
										console.log('  - bottom:', N.bottom);
								}
							}
							const P = H.querySelector('.ubits-data-table__pagination-wrapper');
							if ((console.log('📄 [SPACING] Pagination wrapper encontrado:', !!P), P)) {
								const G = window.getComputedStyle(P);
								console.log('📄 [SPACING] Pagination wrapper estilos:'),
									console.log('  - marginTop:', G.marginTop),
									console.log('  - marginBottom:', G.marginBottom),
									console.log('  - paddingTop:', G.paddingTop),
									console.log('  - paddingBottom:', G.paddingBottom),
									console.log('  - borderTop:', G.borderTop);
								const N = P.getBoundingClientRect();
								if (
									(console.log('📄 [SPACING] Pagination wrapper posición:'),
									console.log('  - top:', N.top),
									$)
								) {
									const M = $.getBoundingClientRect(),
										R = N.top - M.bottom;
									console.log('📄 [SPACING] DISTANCIA CALCULADA:'),
										console.log('  - Última fila bottom:', M.bottom),
										console.log('  - Paginador top:', N.top),
										console.log('  - DISTANCIA:', R, 'px'),
										console.log('  - Esperado: 16px');
								} else
									console.log(
										'📄 [SPACING] ⚠️ No se pudo calcular distancia: última fila no encontrada',
									);
							} else console.log('📄 [SPACING] ⚠️ Pagination wrapper NO encontrado');
						} else console.log('📄 [SPACING] ⚠️ Container NO encontrado');
						console.log('📄 [SPACING] ========== FIN VERIFICACIÓN ==========');
					} catch (H) {
						console.error('📄 [SPACING] ❌ Error verificando espaciado:', H);
					}
				};
			},
			me = () => {
				console.log('📎 [ATTACH] ========== INICIO attachEventListeners =========='),
					typeof window < 'u' && window.location && window.location.href.includes('storybook');
				try {
					e.columnReorderable &&
						(o.hasAttribute('data-column-drag-listener') ||
							(o.setAttribute('data-column-drag-listener', 'true'),
							o.addEventListener(
								'dragstart',
								(B) => {
									const g = B.target.closest('.ubits-data-table__column-drag-handle');
									if (g && ((h = g.getAttribute('data-column-id')), h)) {
										(B.dataTransfer.effectAllowed = 'move'),
											B.dataTransfer.setData('text/plain', h);
										const x = g.closest('.ubits-data-table__column-header');
										x && x.classList.add('ubits-data-table__column-header--dragging');
									}
								},
								!0,
							),
							o.addEventListener(
								'dragend',
								(B) => {
									const g = B.target.closest('.ubits-data-table__column-drag-handle');
									if (g) {
										const x = g.closest('.ubits-data-table__column-header');
										x && x.classList.remove('ubits-data-table__column-header--dragging');
									}
									h = null;
								},
								!0,
							),
							o.addEventListener(
								'dragover',
								(B) => {
									const g = B.target.closest('.ubits-data-table__column-header');
									if (g && h) {
										const x = g.getAttribute('data-column-id');
										if (x && x !== h) {
											const E = x === 'checkbox' || x.startsWith('checkbox-'),
												y = h === 'checkbox' || h.startsWith('checkbox-');
											if (E) return;
											if (!y) {
												const n = m.findIndex((i) => i === 'checkbox' || i.startsWith('checkbox-'));
												if (n !== -1 && m.indexOf(x) < n) return;
											}
											B.preventDefault(),
												(B.dataTransfer.dropEffect = 'move'),
												g.classList.add('ubits-data-table__column-header--drag-over');
										}
									}
								},
								!0,
							),
							o.addEventListener(
								'dragleave',
								(B) => {
									const g = B.target.closest('.ubits-data-table__column-header');
									g && g.classList.remove('ubits-data-table__column-header--drag-over');
								},
								!0,
							),
							o.addEventListener(
								'drop',
								(B) => {
									const g = B.target.closest('.ubits-data-table__column-header');
									if (g) {
										B.preventDefault(),
											g.classList.remove('ubits-data-table__column-header--drag-over');
										const x = g.getAttribute('data-column-id');
										if (!x || !h) return;
										const E = h === 'checkbox' || h.startsWith('checkbox-'),
											y = x === 'checkbox' || x.startsWith('checkbox-');
										if (E || y) return;
										if (h !== x) {
											const n = m.indexOf(h),
												i = m.indexOf(x),
												f = m.findIndex((C) => C === 'checkbox' || C.startsWith('checkbox-'));
											if (f === -1) {
												n !== -1 &&
													i !== -1 &&
													(m.splice(n, 1),
													m.splice(i, 0, h),
													e.onColumnReorder && e.onColumnReorder([...m]),
													Y());
												return;
											}
											if (i < f || (n > f && i < f)) return;
											if (n !== -1 && i !== -1) {
												const C = [...m];
												C.splice(n, 1), C.splice(i, 0, h);
												const _ = C.findIndex((H) => H === 'checkbox' || H.startsWith('checkbox-'));
												if (_ !== -1 && _ < f) return;
												(m = C), e.onColumnReorder && e.onColumnReorder([...m]), Y();
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
									(B) => {
										const g = B.target.closest('.ubits-data-table__row-drag-handle');
										if (!g) return;
										const x = g.getAttribute('data-row-id');
										if (x) {
											const E = isNaN(Number(x)) ? x : Number(x);
											(l = E),
												(B.dataTransfer.effectAllowed = 'move'),
												B.dataTransfer.setData('text/plain', String(E));
											const y = g.closest('.ubits-data-table__row');
											y && y.classList.add('ubits-data-table__row--dragging');
										}
									},
									!0,
								),
								o.addEventListener(
									'dragend',
									(B) => {
										const g = B.target.closest('.ubits-data-table__row-drag-handle');
										if (g) {
											const x = g.closest('.ubits-data-table__row');
											x && x.classList.remove('ubits-data-table__row--dragging');
										}
										l = null;
									},
									!0,
								),
								o.addEventListener(
									'dragover',
									(B) => {
										const g = B.target.closest('.ubits-data-table__row');
										if (g && l !== null) {
											const x = g.getAttribute('data-row-id');
											x &&
												(isNaN(Number(x)) ? x : Number(x)) !== l &&
												(B.preventDefault(),
												(B.dataTransfer.dropEffect = 'move'),
												g.classList.add('ubits-data-table__row--drag-over'));
										}
									},
									!0,
								),
								o.addEventListener(
									'dragleave',
									(B) => {
										const g = B.target.closest('.ubits-data-table__row');
										g && g.classList.remove('ubits-data-table__row--drag-over');
									},
									!0,
								),
								o.addEventListener(
									'drop',
									(B) => {
										const g = B.target.closest('.ubits-data-table__row');
										if (g) {
											B.preventDefault(), g.classList.remove('ubits-data-table__row--drag-over');
											const x = g.getAttribute('data-row-id');
											if (!x || !l) return;
											const E = isNaN(Number(x)) ? x : Number(x),
												y = B.dataTransfer.getData('text/plain');
											if (y && String(E) !== y) {
												const n = isNaN(Number(y)) ? y : Number(y),
													i = v.indexOf(n),
													f = v.indexOf(E);
												i !== -1 &&
													f !== -1 &&
													(v.splice(i, 1),
													v.splice(f, 0, n),
													e.onRowReorder && e.onRowReorder([...v]),
													Y());
											}
										}
									},
									!0,
								)));
					let V = !1;
					const se = o.querySelectorAll('input[data-column-checkbox-header]');
					console.log(`☑️ [SELECT ALL] Header checkboxes encontrados: ${se.length}`),
						se.forEach((B, L) => {
							const g = B,
								x = g.getAttribute('data-column-checkbox-header');
							console.log(`☑️ [SELECT ALL] Configurando header checkbox ${L}: columnId=${x}`);
							const E = g.cloneNode(!0);
							(E.checked = g.checked),
								x && E.setAttribute('data-column-checkbox-header', x),
								Array.from(g.attributes).forEach((i) => {
									(i.name !== 'data-column-checkbox-header' || !E.hasAttribute(i.name)) &&
										E.setAttribute(i.name, i.value);
								}),
								g.parentNode?.replaceChild(E, g),
								console.log('☑️ [SELECT ALL] Checkbox clonado y reemplazado:', {
									columnId: x,
									hasHeaderAttr: E.hasAttribute('data-column-checkbox-header'),
									checked: E.checked,
									allAttributes: Array.from(E.attributes).map((i) => `${i.name}="${i.value}"`),
								}),
								console.log(`☑️ [SELECT ALL] Listener adjuntado al header checkbox ${L}`, {
									columnId: x,
									checkbox: E,
									hasHeaderAttr: E.hasAttribute('data-column-checkbox-header'),
									hasColumnId: E.hasAttribute('data-column-id'),
									hasRowId: E.hasAttribute('data-row-id'),
									allAttributes: Array.from(E.attributes).map((i) => `${i.name}="${i.value}"`),
								}),
								console.log(
									`☑️ [SELECT ALL] 🔧 Agregando listener con capture:true al checkbox ${L}`,
								),
								console.log('☑️ [SELECT ALL] 🔍 Estado del checkbox ANTES de agregar listener:', {
									element: E,
									isConnected: E.isConnected,
									hasHeaderAttr: E.hasAttribute('data-column-checkbox-header'),
									checked: E.checked,
									parentElement: E.parentElement?.tagName,
									allAttrs: Array.from(E.attributes).map((i) => `${i.name}="${i.value}"`),
								});
							const y = (i) => {
								console.log('☑️ [SELECT ALL] ========== SELECT ALL CAMBIÓ =========='),
									console.log(`☑️ [SELECT ALL] 🎯 HANDLER EJECUTÁNDOSE - timestamp: ${Date.now()}`),
									console.log('☑️ [SELECT ALL] 🔍 EVENTO RECIBIDO:', {
										eventPhase: i.eventPhase,
										bubbles: i.bubbles,
										cancelable: i.cancelable,
										defaultPrevented: i.defaultPrevented,
										isTrusted: i.isTrusted,
										timeStamp: i.timeStamp,
										target: i.target,
										currentTarget: i.currentTarget,
										targetType: i.target.tagName,
										targetId: i.target.id,
										targetClassName: i.target.className,
										targetHasHeaderAttr: i.target.hasAttribute('data-column-checkbox-header'),
										currentTargetHasHeaderAttr: i.currentTarget.hasAttribute(
											'data-column-checkbox-header',
										),
										targetAllAttrs: Array.from(i.target.attributes).map(
											($) => `${$.name}="${$.value}"`,
										),
										currentTargetAllAttrs: Array.from(i.currentTarget.attributes).map(
											($) => `${$.name}="${$.value}"`,
										),
									}),
									i.stopPropagation(),
									i.stopImmediatePropagation();
								const f = i.target;
								if (!f.hasAttribute('data-column-checkbox-header')) {
									console.log(
										'☑️ [SELECT ALL] ⚠️ El input NO tiene data-column-checkbox-header, ignorando...',
										{
											input: f,
											allAttributes: Array.from(f.attributes).map(($) => `${$.name}="${$.value}"`),
										},
									);
									return;
								}
								const C = f.getAttribute('data-column-checkbox-header'),
									_ = f.checked;
								console.log(`☑️ [SELECT ALL] columnId: ${C}, checked: ${_}`, {
									input: f,
									hasHeaderAttr: f.hasAttribute('data-column-checkbox-header'),
									hasColumnId: f.hasAttribute('data-column-id'),
									hasRowId: f.hasAttribute('data-row-id'),
									allAttributes: Array.from(f.attributes).map(($) => `${$.name}="${$.value}"`),
									eventPhase: i.eventPhase,
									bubbles: i.bubbles,
									cancelable: i.cancelable,
									defaultPrevented: i.defaultPrevented,
								}),
									console.log(
										'☑️ [SELECT ALL] ✅ Propagación ya detenida (se detuvo al inicio del handler)',
									);
								const H = o.querySelector('.ubits-data-table__scrollable-container');
								let A = 0,
									O = 0,
									Z = 0;
								if (
									(H
										? ((A = H.scrollTop),
											(O = H.scrollHeight),
											(Z = H.clientHeight),
											console.log('☑️ [SELECT ALL] 📍 Scroll ANTES de actualizar checkboxes:', {
												scrollTop: A,
												scrollHeight: O,
												clientHeight: Z,
												maxScroll: O - Z,
											}))
										: console.log(
												'☑️ [SELECT ALL] ⚠️ No se encontró scrollableContainer antes de actualizar',
											),
									e.rows.forEach(($) => {
										$.data[C] = _;
									}),
									console.log(
										`☑️ [SELECT ALL] Estado de todas las filas actualizado (${e.rows.length} filas)`,
									),
									C === 'checkbox-2')
								) {
									const $ = o.querySelectorAll(`input[data-column-id="${C}"][data-row-id]`);
									console.log(`☑️ [SELECT ALL] Checkboxes visibles encontrados: ${$.length}`),
										(V = !0),
										console.log('☑️ [SELECT ALL] 🚩 Bandera isSelectAllInProgress activada'),
										$.forEach((W) => {
											const te = W,
												U = te.getAttribute('data-row-id');
											if (U) {
												const fe = isNaN(Number(U)) ? U : Number(U),
													ae = e.rows.find((Le) => Le.id === fe);
												ae && (ae.data[C] = _), (te.checked = _);
												const le = te.closest('.ubits-checkbox');
												if (le) {
													const Le = le.querySelector('.ubits-checkbox__square');
													if (_) {
														if (
															(le.classList.add('ubits-checkbox--checked'),
															le.classList.remove('ubits-checkbox--indeterminate'),
															Le)
														) {
															const Te = Le.querySelector('.ubits-checkbox__indeterminate');
															Te && Te.remove();
															let he = Le.querySelector('.ubits-checkbox__checkmark');
															he ||
																((he = document.createElement('span')),
																(he.className = 'ubits-checkbox__checkmark'),
																Le.appendChild(he));
															const Pe = he.style.transition;
															(he.style.transition = 'none'),
																he.style.setProperty('opacity', '1', 'important'),
																he.style.setProperty('transform', 'scale(1)', 'important'),
																he.style.setProperty('display', 'flex', 'important'),
																window.getComputedStyle(he).opacity,
																window.getComputedStyle(he).transform,
																window.getComputedStyle(he).display,
																he.offsetHeight,
																Le.offsetHeight,
																le.offsetHeight,
																setTimeout(() => {
																	he.style.transition = Pe || '';
																}, 0);
														}
													} else if (
														(le.classList.remove('ubits-checkbox--checked'),
														le.classList.remove('ubits-checkbox--indeterminate'),
														Le)
													) {
														const Te = Le.querySelector('.ubits-checkbox__checkmark');
														Te && Te.remove();
														const he = Le.querySelector('.ubits-checkbox__indeterminate');
														he && he.remove();
													}
												}
											}
										});
									const P = e.rows.length > 0 && e.rows.every((W) => W.data[C] === !0),
										N = e.rows.some((W) => W.data[C] === !0) && !P,
										M = f;
									(M.checked = P), (M.indeterminate = N);
									const R = M.closest('.ubits-checkbox');
									if (R) {
										const W = R.querySelector('.ubits-checkbox__square');
										if (P) {
											if (
												(R.classList.add('ubits-checkbox--checked'),
												R.classList.remove('ubits-checkbox--indeterminate'),
												W)
											) {
												const te = W.querySelector('.ubits-checkbox__indeterminate');
												te && te.remove(),
													R.classList.add('ubits-checkbox--checked'),
													R.offsetHeight;
												let U = W.querySelector('.ubits-checkbox__checkmark');
												U ||
													((U = document.createElement('span')),
													(U.className = 'ubits-checkbox__checkmark'),
													W.appendChild(U));
												const fe = U.style.transition;
												(U.style.transition = 'none'),
													U.style.setProperty('opacity', '1', 'important'),
													U.style.setProperty('transform', 'scale(1)', 'important'),
													U.style.setProperty('display', 'flex', 'important'),
													window.getComputedStyle(U).opacity,
													window.getComputedStyle(U).transform,
													window.getComputedStyle(U).display,
													U.offsetHeight,
													W.offsetHeight,
													R.offsetHeight,
													setTimeout(() => {
														U.style.transition = fe || '';
													}, 0);
											}
										} else if (N) {
											if (
												(R.classList.remove('ubits-checkbox--checked'),
												R.classList.add('ubits-checkbox--indeterminate'),
												W)
											) {
												const te = W.querySelector('.ubits-checkbox__checkmark');
												te && te.remove();
												let U = W.querySelector('.ubits-checkbox__indeterminate');
												U ||
													((U = document.createElement('span')),
													(U.className = 'ubits-checkbox__indeterminate'),
													W.appendChild(U)),
													U.style.setProperty('opacity', '1', 'important'),
													U.style.setProperty('transform', 'scale(1)', 'important'),
													U.style.setProperty('display', 'flex', 'important');
											}
										} else if (
											(R.classList.remove('ubits-checkbox--checked'),
											R.classList.remove('ubits-checkbox--indeterminate'),
											W)
										) {
											const te = W.querySelector('.ubits-checkbox__checkmark');
											te && te.remove();
											const U = W.querySelector('.ubits-checkbox__indeterminate');
											U && U.remove();
										}
										R.offsetHeight;
									}
									o.offsetHeight,
										console.log(
											`☑️ [SELECT ALL] ✅ Checkboxes visibles actualizados - allChecked: ${P}, indeterminate: ${N}`,
										),
										(V = !1),
										console.log('☑️ [SELECT ALL] 🚩 Bandera isSelectAllInProgress desactivada');
									const z = e;
									if (z.onSelectAll) {
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
										const W = o.querySelector('.ubits-data-table__scrollable-container'),
											te = W?.scrollTop || 0,
											U = W?.scrollHeight || 0,
											fe = W?.clientHeight || 0;
										console.log('☑️ [SELECT ALL] 📍 Scroll ANTES de onSelectAll callback:', {
											scrollTop: te,
											scrollHeight: U,
											clientHeight: fe,
											maxScroll: U - fe,
										}),
											console.log('☑️ [SELECT ALL] 🔍 Verificando si hay renders pendientes...');
										try {
											z.onSelectAll(_),
												console.log(
													'☑️ [SELECT ALL] ✅ onSelectAll callback completado sin errores',
												);
										} catch (Ae) {
											console.error('☑️ [SELECT ALL] ❌ Error en onSelectAll callback:', Ae);
										}
										const ae = o.querySelector('.ubits-data-table__scrollable-container'),
											le = ae?.scrollTop || 0,
											Le = ae?.scrollHeight || 0,
											Te = ae?.clientHeight || 0;
										console.log('☑️ [SELECT ALL] 📍 Scroll DESPUÉS de onSelectAll callback:', {
											scrollTop: le,
											scrollHeight: Le,
											clientHeight: Te,
											maxScroll: Le - Te,
										});
										const he = Math.abs(le - te) > 1,
											Pe = Math.abs(Le - U) > 1 || Math.abs(Te - fe) > 1;
										he || Pe
											? (console.warn(
													'☑️ [SELECT ALL] ⚠️ El callback onSelectAll parece haber causado cambios:',
													{
														scrollCambió: he,
														scrollAntes: te,
														scrollDespues: le,
														diferenciaScroll: le - te,
														dimensionesCambiaron: Pe,
														scrollHeightAntes: U,
														scrollHeightDespues: Le,
														clientHeightAntes: fe,
														clientHeightDespues: Te,
													},
												),
												he &&
													A > 0 &&
													ae &&
													(console.log(
														`☑️ [SELECT ALL] 🔧 Intentando restaurar scroll a posición original: ${A}px`,
													),
													(ae.scrollTop = A),
													setTimeout(() => {
														const Ae = ae.scrollTop;
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
									const X = o.querySelector('.ubits-data-table__scrollable-container'),
										oe = X?.scrollTop || 0,
										ue = X?.scrollHeight || 0,
										be = X?.clientHeight || 0;
									console.log(
										'☑️ [SELECT ALL] 📍 Scroll FINAL después de todas las actualizaciones:',
										{
											scrollTop: oe,
											scrollHeight: ue,
											clientHeight: be,
											maxScroll: ue - be,
											comparaciónConInicial: {
												scrollTopInicial: A,
												scrollTopFinal: oe,
												diferencia: Math.abs(oe - A),
												seMantuvo: Math.abs(oe - A) < 5,
											},
										},
									);
								} else
									console.log('☑️ [SELECT ALL] ⚠️ Llamando render() - esto causará el brinco'), Y();
								console.log('☑️ [SELECT ALL] ========== FIN ==========');
							};
							E.addEventListener('change', y, { capture: !0 }),
								console.log(
									"☑️ [SELECT ALL] ✅ Listener 'change' agregado con capture:true - handler function:",
									y,
								);
							const n = (i) => {
								console.log(
									`☑️ [SELECT ALL] 🖱️ CLICK recibido en header checkbox ${L} - timestamp: ${Date.now()}`,
								);
								const f = i.target;
								console.log('☑️ [SELECT ALL] 🖱️ Click handler - checkbox estado:', {
									hasHeaderAttr: f.hasAttribute('data-column-checkbox-header'),
									checked: f.checked,
									allAttrs: Array.from(f.attributes).map((C) => `${C.name}="${C.value}"`),
								});
							};
							E.addEventListener('click', n, { capture: !0 }),
								console.log(
									"☑️ [SELECT ALL] ✅ Listener 'click' agregado con capture:true para debugging",
								),
								console.log('☑️ [SELECT ALL] 🔍 Estado del checkbox DESPUÉS de agregar listeners:', {
									element: E,
									isConnected: E.isConnected,
									hasHeaderAttr: E.hasAttribute('data-column-checkbox-header'),
									checked: E.checked,
									parentElement: E.parentElement?.tagName,
								});
						}),
						o
							.querySelectorAll('input[data-column-id]:not([data-column-checkbox-header])')
							.forEach((B) => {
								const L = B,
									g = L.getAttribute('data-row-id'),
									x = L.getAttribute('data-column-id'),
									E = L.cloneNode(!0);
								(E.checked = L.checked),
									L.parentNode?.replaceChild(E, L),
									console.log(
										`☑️ [CHECKBOX] 🔧 Agregando listener con capture:false al checkbox rowId=${g} columnId=${x}`,
									);
								const y = (n) => {
									const i = n.target;
									if (i.hasAttribute('data-column-checkbox-header')) {
										console.log(
											'☑️ [CHECKBOX] 🚫 BLOQUEADO: Este es un checkbox del header, NO debería ejecutarse este handler!',
											{
												hasHeaderAttr: i.hasAttribute('data-column-checkbox-header'),
												hasColumnId: i.hasAttribute('data-column-id'),
												hasRowId: i.hasAttribute('data-row-id'),
												allAttributes: Array.from(i.attributes).map(
													(O) => `${O.name}="${O.value}"`,
												),
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
											rowId: g,
											columnId: x,
											hasHeaderAttr: i.hasAttribute('data-column-checkbox-header'),
											hasRowId: i.hasAttribute('data-row-id'),
											hasColumnId: i.hasAttribute('data-column-id'),
											eventPhase: n.eventPhase,
											defaultPrevented: n.defaultPrevented,
											isTrusted: n.isTrusted,
											timeStamp: n.timeStamp,
											isSelectAllInProgress: V,
											target: n.target,
											currentTarget: n.currentTarget,
											targetAllAttrs: Array.from(i.attributes).map((O) => `${O.name}="${O.value}"`),
											stackTrace: new Error().stack
												?.split(`
`)
												.slice(1, 5)
												.join(`
`),
										}),
										V)
									) {
										console.log('☑️ [CHECKBOX] ⏭️ Ignorando evento - select all en progreso');
										return;
									}
									const f = i.getAttribute('data-row-id'),
										C = i.getAttribute('data-column-id');
									if (!f || !C) {
										console.log(
											'☑️ [CHECKBOX] ⚠️ Ignorando checkbox sin data-row-id o data-column-id (probablemente header checkbox)',
											{
												hasRowId: !!f,
												hasColumnId: !!C,
												hasHeaderAttr: i.hasAttribute('data-column-checkbox-header'),
												allAttributes: Array.from(i.attributes).map(
													(O) => `${O.name}="${O.value}"`,
												),
											},
										);
										return;
									}
									console.log('☑️ [CHECKBOX] ========== CHECKBOX CAMBIÓ ==========');
									const _ = isNaN(Number(f)) ? f : Number(f),
										H = i.checked;
									console.log(`☑️ [CHECKBOX] rowId: ${_}, columnId: ${C}, checked: ${H}`),
										console.log(`☑️ [CHECKBOX] Checkbox visual checked: ${i.checked}`),
										console.log('☑️ [CHECKBOX] Input element:', i),
										console.log('☑️ [CHECKBOX] Input parent:', i.parentElement);
									const A = e.rows.find((O) => O.id === _);
									if (A)
										if (
											((A.data[C] = H),
											console.log('☑️ [CHECKBOX] Estado de fila actualizado'),
											C === 'checkbox-2')
										) {
											let O = i.closest('.ubits-checkbox');
											if (
												(console.log('☑️ [CHECKBOX] checkboxContainer encontrado (closest):', O), O)
											) {
												const P = O.querySelector(
													`input[data-row-id="${_}"][data-column-id="${C}"]`,
												);
												if (!P || P !== i) {
													console.log(
														'☑️ [CHECKBOX] ⚠️ checkboxContainer no coincide, buscando por data-row-id...',
													);
													const G = o.querySelector(
														`input[data-row-id="${_}"][data-column-id="${C}"]`,
													);
													G &&
														((O = G.closest('.ubits-checkbox')),
														console.log(
															'☑️ [CHECKBOX] checkboxContainer encontrado (por data-row-id):',
															O,
														));
												} else
													console.log('☑️ [CHECKBOX] ✅ checkboxContainer validado correctamente');
											}
											if (O) {
												const P = O.querySelector('.ubits-checkbox__square');
												if (
													(console.log('☑️ [CHECKBOX] checkboxSquare encontrado:', P),
													console.log('☑️ [CHECKBOX] checkboxContainer classes:', O.className),
													H)
												)
													if (
														(O.classList.add('ubits-checkbox--checked'),
														O.classList.remove('ubits-checkbox--indeterminate'),
														console.log('☑️ [CHECKBOX] Clases agregadas: checked'),
														P)
													) {
														const G = P.querySelector('.ubits-checkbox__indeterminate');
														G && (G.remove(), console.log('☑️ [CHECKBOX] Indeterminate removido')),
															O.classList.add('ubits-checkbox--checked'),
															O.classList.remove('ubits-checkbox--indeterminate'),
															O.offsetHeight;
														let N = P.querySelector('.ubits-checkbox__checkmark');
														N
															? console.log('☑️ [CHECKBOX] ✅ Checkmark ya existe, reutilizando')
															: ((N = document.createElement('span')),
																(N.className = 'ubits-checkbox__checkmark'),
																P.appendChild(N),
																console.log('☑️ [CHECKBOX] ✅ Checkmark creado y agregado al DOM'));
														const M = N.style.transition;
														(N.style.transition = 'none'),
															N.style.setProperty('opacity', '1', 'important'),
															N.style.setProperty('transform', 'scale(1)', 'important'),
															N.style.setProperty('display', 'flex', 'important'),
															console.log(
																'☑️ [CHECKBOX] Estilos forzados directamente con !important',
															),
															window.getComputedStyle(N).opacity,
															window.getComputedStyle(N).transform,
															window.getComputedStyle(N).display,
															N.offsetHeight,
															P.offsetHeight,
															O.offsetHeight,
															setTimeout(() => {
																N.style.transition = M || '';
															}, 0),
															requestAnimationFrame(() => {
																const R = P.querySelector('.ubits-checkbox__checkmark');
																if (R) {
																	const z = window.getComputedStyle(R);
																	console.log(
																		'☑️ [CHECKBOX] Verificación checkmark en DOM (después de RAF):',
																		R,
																	),
																		console.log(
																			`☑️ [CHECKBOX] Checkmark opacity (computed): ${z.opacity}, transform (computed): ${z.transform}`,
																		),
																		console.log(`☑️ [CHECKBOX] Checkmark display: ${z.display}`),
																		console.log(
																			`☑️ [CHECKBOX] Checkmark width: ${z.width}, height: ${z.height}`,
																		);
																	const X = window.getComputedStyle(R, '::after');
																	console.log(
																		`☑️ [CHECKBOX] Checkmark ::after content: ${X.content}, display: ${X.display}`,
																	),
																		(z.opacity === '0' || z.transform.includes('scale(0)')) &&
																			(console.log(
																				'☑️ [CHECKBOX] ⚠️ CSS no aplicado correctamente después de forzar, reintentando...',
																			),
																			R.style.setProperty('opacity', '1', 'important'),
																			R.style.setProperty('transform', 'scale(1)', 'important'),
																			R.style.setProperty('display', 'flex', 'important'),
																			R.offsetHeight);
																} else
																	console.log(
																		'☑️ [CHECKBOX] ⚠️ Checkmark no encontrado después de crearlo',
																	);
															});
													} else console.log('☑️ [CHECKBOX] ⚠️ checkboxSquare no encontrado');
												else if (
													(O.classList.remove('ubits-checkbox--checked'),
													O.classList.remove('ubits-checkbox--indeterminate'),
													console.log('☑️ [CHECKBOX] Clases removidas: checked'),
													P)
												) {
													const G = P.querySelector('.ubits-checkbox__checkmark');
													G && (G.remove(), console.log('☑️ [CHECKBOX] Checkmark removido'));
													const N = P.querySelector('.ubits-checkbox__indeterminate');
													N && N.remove();
												}
												console.log(
													'☑️ [CHECKBOX] ✅ Clase CSS del contenedor y checkmark actualizados',
												);
											} else {
												console.log(
													'☑️ [CHECKBOX] ⚠️ checkboxContainer no encontrado usando closest',
												);
												const P = o.querySelectorAll(
													`input[data-row-id="${_}"][data-column-id="${x}"]`,
												);
												if (
													(console.log(
														'☑️ [CHECKBOX] Checkboxes encontrados por data-row-id:',
														P.length,
													),
													P.length > 0)
												) {
													const N = (Array.from(P).find((M) => M === i) || P[0])?.closest(
														'.ubits-checkbox',
													);
													if ((console.log('☑️ [CHECKBOX] Checkbox correcto encontrado:', N), N)) {
														const M = N.querySelector('.ubits-checkbox__square');
														if (H) {
															if (
																(N.classList.add('ubits-checkbox--checked'),
																N.classList.remove('ubits-checkbox--indeterminate'),
																M)
															) {
																const R = M.querySelector('.ubits-checkbox__indeterminate');
																R && R.remove();
																let z = M.querySelector('.ubits-checkbox__checkmark');
																z ||
																	((z = document.createElement('span')),
																	(z.className = 'ubits-checkbox__checkmark'),
																	M.appendChild(z),
																	console.log('☑️ [CHECKBOX] ✅ Checkmark creado (fallback)'));
															}
														} else if (
															(N.classList.remove('ubits-checkbox--checked'),
															N.classList.remove('ubits-checkbox--indeterminate'),
															M)
														) {
															const R = M.querySelector('.ubits-checkbox__checkmark');
															R && R.remove();
														}
													}
												}
											}
											const Z = o.querySelector(`input[data-column-checkbox-header="${x}"]`);
											if (Z) {
												const P = e.rows.length > 0 && e.rows.every((R) => R.data[x] === !0),
													N = e.rows.some((R) => R.data[x] === !0) && !P;
												(Z.checked = P), (Z.indeterminate = N);
												const M = Z.closest('.ubits-checkbox');
												if (M) {
													const R = M.querySelector('.ubits-checkbox__square');
													if (P) {
														if (
															(M.classList.add('ubits-checkbox--checked'),
															M.classList.remove('ubits-checkbox--indeterminate'),
															R)
														) {
															const z = R.querySelector('.ubits-checkbox__indeterminate');
															z && z.remove();
															let X = R.querySelector('.ubits-checkbox__checkmark');
															X ||
																((X = document.createElement('span')),
																(X.className = 'ubits-checkbox__checkmark'),
																R.appendChild(X));
														}
													} else if (N) {
														if (
															(M.classList.remove('ubits-checkbox--checked'),
															M.classList.add('ubits-checkbox--indeterminate'),
															R)
														) {
															const z = R.querySelector('.ubits-checkbox__checkmark');
															z && z.remove();
															let X = R.querySelector('.ubits-checkbox__indeterminate');
															X ||
																((X = document.createElement('span')),
																(X.className = 'ubits-checkbox__indeterminate'),
																R.appendChild(X));
														}
													} else if (
														(M.classList.remove('ubits-checkbox--checked'),
														M.classList.remove('ubits-checkbox--indeterminate'),
														R)
													) {
														const z = R.querySelector('.ubits-checkbox__checkmark');
														z && z.remove();
														const X = R.querySelector('.ubits-checkbox__indeterminate');
														X && X.remove();
													}
												}
												console.log(
													`☑️ [CHECKBOX] ✅ Header checkbox actualizado - allChecked: ${P}, indeterminate: ${N}`,
												);
											}
											console.log('🎨 [HOVER CLEANUP] ========== INICIO LIMPIEZA HOVER =========='),
												console.log('🎨 [HOVER CLEANUP] Buscando fila para limpiar hover...');
											const $ = E.closest('.ubits-data-table__row');
											if ((console.log('🎨 [HOVER CLEANUP] rowElement encontrado:', $), $)) {
												console.log(
													'🎨 [HOVER CLEANUP] ✅ Fila encontrada, verificando estado actual...',
												);
												const P = Array.from($.classList),
													N = window.getComputedStyle($).backgroundColor;
												console.log('🎨 [HOVER CLEANUP] Estado ANTES:', {
													classes: P,
													backgroundColor: N,
													hasHoverClass: $.classList.contains('ubits-data-table__row--clear-hover'),
												});
												const M = $.querySelectorAll('.ubits-data-table__cell');
												console.log('🎨 [HOVER CLEANUP] Celdas encontradas:', M.length),
													console.log(
														'🎨 [HOVER CLEANUP] 🔧 Aplicando solución agresiva: pointer-events: none',
													);
												const R = $.style.pointerEvents;
												($.style.pointerEvents = 'none'),
													console.log(
														'🎨 [HOVER CLEANUP] ✅ pointer-events deshabilitado temporalmente',
													),
													$.offsetHeight;
												const z = getComputedStyle(document.documentElement)
													.getPropertyValue('--ubits-bg-1')
													.trim();
												$.classList.add('ubits-data-table__row--clear-hover'),
													console.log(
														'🎨 [HOVER CLEANUP] ✅ Clase agregada: ubits-data-table__row--clear-hover',
													),
													$.style.setProperty('background-color', z, 'important'),
													console.log(
														`🎨 [HOVER CLEANUP] ✅ Inline style aplicado a fila: background-color = ${z}`,
													),
													M.forEach((be, W) => {
														be.style.setProperty('background-color', z, 'important'),
															console.log(`🎨 [HOVER CLEANUP] ✅ Celda ${W} inline style aplicado`);
													}),
													$.offsetHeight,
													($.style.pointerEvents = R || ''),
													console.log(
														`🎨 [HOVER CLEANUP] ✅ pointer-events restaurado: ${R || 'default'}`,
													);
												const oe = window.getComputedStyle($).backgroundColor,
													ue = Array.from($.classList);
												console.log(
													'🎨 [HOVER CLEANUP] Estado DESPUÉS de aplicar solución agresiva:',
													{
														classes: ue,
														backgroundColor: oe,
														bgBefore: N,
														bgChanged: N !== oe,
														pointerEvents: $.style.pointerEvents || 'default',
													},
												),
													M.forEach((be, W) => {
														const U = window.getComputedStyle(be).backgroundColor;
														console.log(
															`🎨 [HOVER CLEANUP] Celda ${W} background: ${U} (inline: ${be.style.backgroundColor || 'none'})`,
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
																const be = window.getComputedStyle($).backgroundColor;
																$.classList.remove('ubits-data-table__row--clear-hover'),
																	$.style.removeProperty('background-color'),
																	M.forEach((te) => {
																		te.style.removeProperty('background-color');
																	});
																const W = window.getComputedStyle($).backgroundColor;
																console.log(
																	`🎨 [HOVER CLEANUP] ✅ Clase e inline styles removidos. Background antes: ${be}, después: ${W}`,
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
													console.log('🎨 [HOVER CLEANUP] newCheckbox:', E),
													console.log(
														'🎨 [HOVER CLEANUP] newCheckbox.parentElement:',
														E.parentElement,
													),
													console.log(
														"🎨 [HOVER CLEANUP] newCheckbox.closest('tr'):",
														E.closest('tr'),
													);
											e.onRowSelect &&
												(console.log('☑️ [CHECKBOX] Llamando onRowSelect...'),
												e.onRowSelect(_, H),
												console.log('☑️ [CHECKBOX] onRowSelect completado')),
												console.log(
													'☑️ [CHECKBOX] ✅ Optimizado: NO se llama render() - sin brinco',
												);
										} else
											console.log('☑️ [CHECKBOX] ⚠️ Llamando render() - esto causará el brinco'),
												console.log(
													`☑️ [CHECKBOX] 🔍 RAZÓN: columnId="${C}" NO es checkbox-2, llamando render() desde handler individual`,
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
								E.addEventListener('change', y, { capture: !1 }),
									console.log(
										'☑️ [CHECKBOX] ✅ Listener agregado con capture:false - handler function:',
										y,
									);
							});
					const pe = o.querySelectorAll('[data-expand-button="true"]');
					console.log('🔘 [EXPAND] Botones de expandir encontrados:', pe.length),
						pe.forEach((B, L) => {
							const g = B.cloneNode(!0);
							B.parentNode?.replaceChild(g, B),
								g.addEventListener('click', (x) => {
									x.preventDefault(), x.stopPropagation();
									const E = g.getAttribute('data-row-id'),
										y = isNaN(Number(E)) ? E : Number(E);
									console.log('🔘 [EXPAND] Click en botón de expandir - rowId:', y);
									const n = e.rows.find((i) => i.id === y);
									if (n) {
										const i = n.expanded || !1;
										(n.expanded = !i),
											console.log(
												'🔘 [EXPAND] Fila encontrada - wasExpanded:',
												i,
												'-> expanded:',
												n.expanded,
											),
											console.log(
												'🔘 [EXPAND] Fila tiene renderExpandedContent:',
												!!n.renderExpandedContent,
											),
											e.onRowExpand && e.onRowExpand(y, n.expanded),
											console.log('🔘 [EXPAND] Llamando render()...'),
											Y(),
											console.log('🔘 [EXPAND] Render() completado'),
											n.expanded &&
												requestAnimationFrame(() => {
													const f = o.querySelector(`[data-row-id="${y}"]`);
													if (f) {
														const C = f.nextElementSibling;
														if (C && C.classList.contains('ubits-data-table__row-expanded-row')) {
															console.log(
																'🔘 [EXPAND] Haciendo scroll para mostrar contenido expandido',
															);
															const _ = o.querySelector(
																'.ubits-data-table__scrollable-container--vertical',
															);
															if (_) {
																const H = f.offsetTop;
																(_.scrollTop = H - 50),
																	console.log(
																		'🔘 [EXPAND] Scroll aplicado - scrollTop:',
																		_.scrollTop,
																	);
															} else
																f.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
																	console.log(
																		'🔘 [EXPAND] ScrollIntoView aplicado (sin contenedor scrollable)',
																	);
														}
													}
												});
									} else console.warn('🔘 [EXPAND] ⚠️ Fila no encontrada para rowId:', y);
								});
						}),
						o.querySelectorAll('[data-sort-button="true"]').forEach((B) => {
							B.addEventListener('click', (L) => {
								L.preventDefault(), L.stopPropagation();
								const g = B.getAttribute('data-column-id');
								w === g ? (S = S === 'asc' ? 'desc' : 'asc') : ((w = g), (S = 'asc')),
									e.onSort && e.onSort(g, S),
									Y();
							});
						}),
						o.querySelectorAll('[data-menu-button="true"]').forEach((B) => {
							const L = B,
								g = L.getAttribute('data-column-id');
							if (!g || !e.columns.find((O) => O.id === g)) return;
							const E = L.closest('th');
							if (!E) {
								console.warn('⚠️ [MENU BUTTON] No se encontró el header cell');
								return;
							}
							const y = E.hasAttribute('data-pinned') && E.getAttribute('data-pinned') === 'true',
								n = E.classList.contains('ubits-data-table__column-header--pinned'),
								i = typeof window < 'u' && !window.location?.href?.includes('storybook');
							let f,
								C = null;
							if (y || n) {
								const Z =
									o
										.querySelector('.ubits-data-table')
										?.closest('.ubits-data-table__scrollable-container') || o;
								(f = Z.querySelector(
									`.ubits-data-table__column-menu-dropdown[data-column-id="${g}"]`,
								)),
									f ||
										((f = document.createElement('div')),
										(f.className = 'ubits-data-table__column-menu-dropdown'),
										f.setAttribute('data-column-id', g),
										(f.style.cssText = `
            position: fixed;
            z-index: 10000 !important;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `),
										Z.appendChild(f));
							} else
								(f = E.querySelector('.ubits-data-table__column-menu-dropdown')),
									f ||
										((f = document.createElement('div')),
										(f.className = 'ubits-data-table__column-menu-dropdown'),
										f.setAttribute('data-column-id', g),
										(f.style.cssText = `
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
										(E.style.position = 'relative'),
										E.appendChild(f));
							let _ = !1;
							const H = () => {
								f && (f.style.display = 'none'),
									(_ = !1),
									A && (document.removeEventListener('click', A), (A = null)),
									(y || n) && f.parentElement && f.parentElement !== E && f.remove();
							};
							let A = null;
							L.addEventListener('click', (O) => {
								const Z =
									typeof window < 'u' &&
									window.location &&
									!window.location.href.includes('storybook');
								O.preventDefault(), O.stopPropagation();
								const $ = e.columns.find((ue) => ue.id === g);
								if (!$) {
									console.error('❌ [COLUMN MENU] Columna no encontrada:', g);
									return;
								}
								const P = $.pinned || !1;
								if (_) {
									H();
									return;
								}
								o.querySelectorAll('.ubits-data-table__column-menu-dropdown').forEach((ue) => {
									ue !== f && (ue.style.display = 'none');
								});
								const G = [
									{
										label: P ? 'Desfijar columna' : 'Fijar columna',
										value: 'pin',
										state: 'default',
									},
								];
								f.innerHTML = '';
								const N = `column-menu-list-${g}-${Math.random().toString(36).substr(2, 9)}`;
								f.id = N;
								try {
									const ue = Me({
										containerId: N,
										items: G,
										size: 'sm',
										maxHeight: '200px',
										onSelectionChange: (be, W) => {
											if (be && be.value === 'pin') {
												const te = e.columns.find((U) => U.id === g);
												if (te) {
													const U = te.pinned || !1;
													(te.pinned = !U), e.onColumnPin && e.onColumnPin(g, te.pinned), Y();
												} else
													console.error(
														'❌ [COLUMN MENU] Columna no encontrada al intentar fijar:',
														g,
													);
											}
											H();
										},
									});
								} catch (ue) {
									console.error('❌ [COLUMN MENU] Error al crear lista con createList:', ue);
									const be = Oe({ items: G, size: 'sm', maxHeight: '200px' });
									(f.innerHTML = be),
										f.querySelectorAll('.ubits-list-item').forEach((te) => {
											te.addEventListener('click', () => {
												const U = e.columns.find((fe) => fe.id === g);
												if (U) {
													const fe = U.pinned || !1;
													(U.pinned = !fe), e.onColumnPin && e.onColumnPin(g, U.pinned), Y();
												}
												H();
											});
										});
								}
								const M = E.hasAttribute('data-pinned') && E.getAttribute('data-pinned') === 'true',
									R = E.classList.contains('ubits-data-table__column-header--pinned'),
									z = M || R ? 1e4 : 1e3,
									X = L.getBoundingClientRect(),
									oe = E.getBoundingClientRect();
								if (M || R) {
									f.style.setProperty('position', 'fixed', 'important'),
										f.style.setProperty('top', `${X.bottom + 4}px`, 'important');
									const ue = X.right - 160;
									f.style.setProperty('left', `${ue}px`, 'important'),
										f.style.setProperty('right', 'auto', 'important'),
										f.style.setProperty('z-index', `${z}`, 'important'),
										f.style.setProperty('display', 'block', 'important');
								} else
									(f.style.position = 'absolute'),
										(f.style.top = '100%'),
										(f.style.right = '0'),
										(f.style.left = 'auto'),
										(f.style.zIndex = `${z}`),
										f.style.setProperty('z-index', `${z}`, 'important'),
										(f.style.display = 'block');
								(_ = !0),
									(A = (ue) => {
										!f.contains(ue.target) && !L.contains(ue.target) && H();
									}),
									setTimeout(() => {
										document.addEventListener('click', A);
									}, 0);
							});
						});
					const Se = o.querySelectorAll('.ubits-data-table__action-button');
					console.log('🎯 [ACTION BUTTONS] Botones de acciones encontrados:', Se.length),
						Se.forEach((B) => {
							const L = B,
								g = L.getAttribute('data-row-id'),
								x = L.getAttribute('data-column-id');
							if (!g) {
								console.warn('⚠️ [ACTION BUTTONS] No se encontró el data-row-id en el botón');
								return;
							}
							const E = isNaN(Number(g)) ? g : Number(g),
								y = L.cloneNode(!0);
							L.parentNode?.replaceChild(y, L),
								y.addEventListener('click', (n) => {
									n.preventDefault(),
										n.stopPropagation(),
										console.log(
											'🎯 [ACTION BUTTONS] Click en botón de acción - rowId:',
											E,
											'columnId:',
											x,
										);
									const i = e.rows.find((f) => f.id === E);
									i
										? e.onRowAction
											? e.onRowAction(E, i)
											: (console.log('🎯 [ACTION BUTTONS] Acción ejecutada para fila:', E),
												alert(`Acción ejecutada para fila: ${E}`))
										: console.warn('⚠️ [ACTION BUTTONS] Fila no encontrada para rowId:', E);
								});
						});
					const ge = e.showContextMenu !== !1;
					if (
						(console.log(
							'🖱️ [CONTEXT MENU] ========== INICIO CONFIGURACIÓN MENÚ CONTEXTUAL ==========',
						),
						console.log('🖱️ [CONTEXT MENU] showContextMenuValue:', ge),
						console.log('🖱️ [CONTEXT MENU] showContextMenu option:', e.showContextMenu),
						console.log('🖱️ [CONTEXT MENU] Element:', o),
						ge)
					) {
						const B = o.querySelectorAll('tr.ubits-data-table__row[data-row-id]');
						if (
							(console.log(
								'🖱️ [CONTEXT MENU] Filas encontradas con selector "tr.ubits-data-table__row[data-row-id]":',
								B.length,
							),
							B.length === 0)
						) {
							console.warn(
								'🖱️ [CONTEXT MENU] ⚠️ No se encontraron filas con selector: tr.ubits-data-table__row[data-row-id]',
							);
							const y = o.querySelectorAll('[data-row-id]');
							if (
								(console.log(
									'🖱️ [CONTEXT MENU] Filas encontradas con selector alternativo "[data-row-id]":',
									y.length,
								),
								y.length > 0)
							) {
								console.log('🖱️ [CONTEXT MENU] Usando selector alternativo para agregar listeners'),
									y.forEach((n, i) => {
										const f = n,
											C = f.getAttribute('data-row-id');
										if (!C) {
											console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:', i);
											return;
										}
										const _ = isNaN(Number(C)) ? C : Number(C);
										console.log('🖱️ [CONTEXT MENU] Agregando listener a fila (alternativo):', _);
										const H =
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
										f.addEventListener('contextmenu', (A) => {
											A.preventDefault(),
												A.stopPropagation(),
												console.log(
													'🖱️ [CONTEXT MENU] ========== Click derecho detectado (alternativo) ==========',
												),
												console.log('🖱️ [CONTEXT MENU] Fila ID:', _),
												alert(
													`Click derecho en fila ${_} - Menú contextual (implementación completa pendiente)`,
												);
										});
									}),
									console.log(
										'🖱️ [CONTEXT MENU] ✅ Listeners agregados usando selector alternativo',
									);
								return;
							}
						} else
							console.log(
								'🖱️ [CONTEXT MENU] ✅ Filas encontradas, procediendo a agregar listeners...',
							);
						let L = document.getElementById('ubits-data-table-context-menu');
						L ||
							((L = document.createElement('div')),
							(L.id = 'ubits-data-table-context-menu'),
							(L.style.cssText = `
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
							document.body.appendChild(L));
						let g = null,
							x = null;
						const E = () => {
							L && ((L.style.display = 'none'), (L.innerHTML = '')),
								(g = null),
								x &&
									(document.removeEventListener('click', x),
									document.removeEventListener('contextmenu', x),
									(x = null));
						};
						B.forEach((y, n) => {
							const i = y,
								f = i.getAttribute('data-row-id');
							if (!f) {
								console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:', n);
								return;
							}
							const C = isNaN(Number(f)) ? f : Number(f);
							console.log('🖱️ [CONTEXT MENU] Agregando listener a fila:', C, 'elemento:', i),
								i.addEventListener('contextmenu', (_) => {
									_.preventDefault(),
										_.stopPropagation(),
										console.log('🖱️ [CONTEXT MENU] ========== Click derecho detectado =========='),
										console.log('🖱️ [CONTEXT MENU] Fila ID:', C),
										console.log('🖱️ [CONTEXT MENU] Event:', _),
										console.log('🖱️ [CONTEXT MENU] Coordenadas:', { x: _.clientX, y: _.clientY });
									const H = e.rows.find((P) => P.id === C);
									if (!H) {
										console.warn(
											'🖱️ [CONTEXT MENU] ⚠️ Fila no encontrada en currentOptions.rows:',
											C,
										),
											console.log('🖱️ [CONTEXT MENU] Total de filas disponibles:', e.rows.length);
										return;
									}
									console.log('🖱️ [CONTEXT MENU] Datos de fila encontrados:', H),
										(g = C),
										console.log('🖱️ [CONTEXT MENU] Cerrando menú anterior...'),
										E();
									const A = (
											P,
											G,
										) => `<div style="display: flex; align-items: center; gap: var(--ubits-spacing-xs, 8px);">
            <i class="far fa-${P}" style="font-size: 14px; width: 16px; text-align: center;"></i>
            <span>${G}</span>
          </div>`,
										O = [
											{
												label: A('eye', 'Ver seleccionados'),
												value: 'view-selected',
												state: 'default',
												onClick: () => {
													console.log('🖱️ [CONTEXT MENU] Ver seleccionados para fila:', C), E();
												},
											},
											{
												label: A('bell', 'Notificaciones'),
												value: 'notifications',
												state: 'default',
												onClick: () => {
													console.log('🖱️ [CONTEXT MENU] Notificaciones para fila:', C),
														E(),
														alert(`Notificaciones para fila: ${C}`);
												},
											},
											{
												label: A('copy', 'Copiar'),
												value: 'copy',
												state: 'default',
												onClick: () => {
													console.log('🖱️ [CONTEXT MENU] Copiar para fila:', C),
														E(),
														alert(`Copiar para fila: ${C}`);
												},
											},
											{
												label: A('eye', 'Ver'),
												value: 'view',
												state: 'default',
												onClick: () => {
													console.log('🖱️ [CONTEXT MENU] Ver para fila:', C),
														E(),
														alert(`Ver para fila: ${C}`);
												},
											},
											{
												label: A('edit', 'Editar'),
												value: 'edit',
												state: 'default',
												onClick: () => {
													console.log('🖱️ [CONTEXT MENU] Editar para fila:', C),
														E(),
														alert(`Editar para fila: ${C}`);
												},
											},
											{
												label: A('download', 'Descargar'),
												value: 'download',
												state: 'default',
												onClick: () => {
													console.log('🖱️ [CONTEXT MENU] Descargar para fila:', C),
														E(),
														alert(`Descargar para fila: ${C}`);
												},
											},
											{
												label: A('trash', 'Eliminar'),
												value: 'delete',
												state: 'default',
												onClick: () => {
													console.log('🖱️ [CONTEXT MENU] Eliminar para fila:', C),
														E(),
														alert(`Eliminar para fila: ${C}`);
												},
											},
										],
										Z = `context-menu-list-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
									if ((console.log('🖱️ [CONTEXT MENU] Creando menú con ID:', Z), !L)) {
										console.error('🖱️ [CONTEXT MENU] ❌ contextMenuContainer es null!');
										return;
									}
									const $ = document.createElement('div');
									($.id = Z),
										(L.innerHTML = ''),
										L.appendChild($),
										console.log('🖱️ [CONTEXT MENU] Contenedor creado y agregado al DOM');
									try {
										console.log('🖱️ [CONTEXT MENU] Intentando crear lista con createList...'),
											console.log('🖱️ [CONTEXT MENU] Items del menú:', O.length);
										const P = Me({
											containerId: Z,
											items: O,
											size: 'sm',
											maxHeight: '400px',
											onSelectionChange: (M, R) => {
												console.log('🖱️ [CONTEXT MENU] Item seleccionado:', M?.value, 'índice:', R),
													M && M.onClick && M.onClick();
											},
										});
										console.log('🖱️ [CONTEXT MENU] ✅ Lista creada exitosamente');
										const G = _.clientX,
											N = _.clientY;
										console.log('🖱️ [CONTEXT MENU] Posicionando menú en:', { x: G, y: N }),
											(L.style.left = `${G}px`),
											(L.style.top = `${N}px`),
											(L.style.display = 'block'),
											console.log('🖱️ [CONTEXT MENU] Menú visible, display:', L.style.display),
											requestAnimationFrame(() => {
												const M = L.getBoundingClientRect(),
													R = window.innerWidth,
													z = window.innerHeight;
												console.log('🖱️ [CONTEXT MENU] Dimensiones del menú:', {
													width: M.width,
													height: M.height,
													right: M.right,
													bottom: M.bottom,
													windowWidth: R,
													windowHeight: z,
												}),
													M.right > R &&
														((L.style.left = `${R - M.width - 10}px`),
														console.log('🖱️ [CONTEXT MENU] Ajustando posición horizontal')),
													M.bottom > z &&
														((L.style.top = `${z - M.height - 10}px`),
														console.log('🖱️ [CONTEXT MENU] Ajustando posición vertical'));
											}),
											(x = (M) => {
												L.contains(M.target) || E();
											}),
											setTimeout(() => {
												document.addEventListener('click', x),
													document.addEventListener('contextmenu', x);
											}, 0);
									} catch (P) {
										console.error('🖱️ [CONTEXT MENU] ❌ Error al crear menú contextual:', P),
											console.error(
												'🖱️ [CONTEXT MENU] Stack:',
												P instanceof Error ? P.stack : 'N/A',
											),
											console.log('🖱️ [CONTEXT MENU] Usando fallback con renderList...');
										const G = Oe({ items: O, size: 'sm', maxHeight: '400px' });
										($.innerHTML = G),
											$.querySelectorAll('.ubits-list-item').forEach((z, X) => {
												const oe = O[X];
												oe &&
													oe.onClick &&
													z.addEventListener('click', () => {
														oe.onClick();
													});
											});
										const M = _.clientX,
											R = _.clientY;
										(L.style.left = `${M}px`),
											(L.style.top = `${R}px`),
											(L.style.display = 'block'),
											requestAnimationFrame(() => {
												const z = L.getBoundingClientRect(),
													X = window.innerWidth,
													oe = window.innerHeight;
												z.right > X && (L.style.left = `${X - z.width - 10}px`),
													z.bottom > oe && (L.style.top = `${oe - z.height - 10}px`);
											}),
											(x = (z) => {
												L.contains(z.target) || E();
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
						o.querySelectorAll('[data-editable-text="true"]').forEach((B) => {
							const L = B.closest('[data-editable="true"]');
							if (!L) return;
							const g = L.getAttribute('data-row-id'),
								x = L.getAttribute('data-column-id');
							if (!g || !x) return;
							const E = isNaN(Number(g)) ? g : Number(g);
							B.addEventListener('keydown', (y) => {
								y.key === 'Enter' && (y.preventDefault(), B.blur());
							}),
								B.addEventListener('blur', (y) => {
									y.stopPropagation();
									const n = B.textContent || '',
										i = e.rows.find((f) => f.id === E);
									if (i) {
										const f = e.columns.find((C) => C.id === x);
										f && (f.type === 'nombre' || f.type === 'nombre-avatar')
											? ((i.data.nombre = n.trim()), i.data[x] !== void 0 && (i.data[x] = n.trim()))
											: f && f.type === 'estado'
												? ((i.data[x] = n.trim()),
													(i.data.estado = n.trim()),
													(i.data.status = n.trim()))
												: (i.data[x] = n.trim());
									}
								}),
								B.addEventListener('dblclick', (y) => {
									y.stopPropagation();
								}),
								B.addEventListener('click', (y) => {
									y.stopPropagation();
								});
						}),
						o.querySelectorAll('.ubits-data-table__status-editable').forEach((B) => {
							const L = B.getAttribute('data-row-id'),
								g = B.getAttribute('data-column-id'),
								x = B.getAttribute('data-current-status');
							if (!L || !g) return;
							const E = isNaN(Number(L)) ? L : Number(L),
								y = B.querySelector('.ubits-status-tag'),
								n = B.querySelector('.ubits-data-table__status-dropdown');
							if (!y || !n) return;
							const i = [
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
							let f = null,
								C = null,
								_ = null,
								H = !1,
								A = 0;
							const O = [],
								Z = (R) => {
									const z = [];
									let X = R;
									for (; X && X !== document.body && X !== document.documentElement; ) {
										const oe = window.getComputedStyle(X),
											ue = oe.overflow + oe.overflowX + oe.overflowY,
											be = ue.includes('auto') || ue.includes('scroll'),
											W = X.scrollHeight > X.clientHeight || X.scrollWidth > X.clientWidth;
										(be || W) && z.push(X), (X = X.parentElement);
									}
									return z;
								},
								$ = () => {
									try {
										if (!n || n.style.display === 'none' || !document.body.contains(n)) {
											G();
											return;
										}
										if (!y || !y.isConnected) {
											G();
											return;
										}
										const R = y.getBoundingClientRect(),
											z = R.bottom + 4,
											X = R.left,
											oe = n.style.top,
											ue = n.style.left,
											be = `${z}px`,
											W = `${X}px`;
										(oe !== be || ue !== W) && ((n.style.top = be), (n.style.left = W), A++);
									} catch {
										G();
									}
								},
								P = () => {
									if (H) return;
									H = !0;
									const R = () => {
										if (n.style.display === 'none' || !document.body.contains(n)) {
											G();
											return;
										}
										$(), (_ = requestAnimationFrame(R));
									};
									R();
								},
								G = () => {
									_ && (cancelAnimationFrame(_), (_ = null)), (H = !1), (A = 0);
								};
							C = $;
							const N = () => {
									G(), (n.style.display = 'none');
									const R = n.__scrollbarInstance;
									if (R && R.destroy) {
										try {
											R.destroy();
										} catch {}
										n.__scrollbarInstance = null;
									}
									n.parentElement === document.body && B.appendChild(n),
										f && (document.removeEventListener('click', f), (f = null)),
										C &&
											(window.removeEventListener('scroll', C, !0),
											o.removeEventListener('scroll', C, !0),
											O.forEach((z) => {
												z.removeEventListener('scroll', C, !0);
											}),
											(O.length = 0),
											(C = null));
								},
								M = (R) => {
									try {
										if ((R.preventDefault(), R.stopPropagation(), !y || !n)) return;
										o.querySelectorAll('.ubits-data-table__status-dropdown').forEach((ae) => {
											if (
												ae !== n &&
												((ae.style.display = 'none'), ae.parentElement === document.body)
											) {
												const le = o.querySelector(
													`[data-row-id="${ae.getAttribute('data-row-id')}"][data-column-id="${ae.getAttribute('data-column-id')}"]`,
												);
												le && le.appendChild(ae);
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
											X = i.map((ae) => ({
												label: ae.label,
												value: ae.value,
												state: ae.status === x ? 'active' : 'default',
												selected: ae.status === x,
											}));
										if (!document.querySelector('link[href*="scroll.css"]')) {
											const ae = document.createElement('link');
											(ae.rel = 'stylesheet'),
												(ae.href = '../../addons/scroll/src/styles/scroll.css'),
												document.head.appendChild(ae);
										}
										n.innerHTML = '';
										const oe = `status-list-${E}-${g}`,
											ue = `status-scrollbar-${E}-${g}`;
										if (
											((n.id = `status-dropdown-${E}-${g}`),
											(n.innerHTML = `
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${oe}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${ue}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `),
											document.getElementById(oe))
										) {
											const ae = document.createElement('style');
											(ae.textContent = `
            #${oe}::-webkit-scrollbar {
              display: none;
            }
          `),
												document.head.appendChild(ae);
										}
										n.parentElement !== document.body && document.body.appendChild(n);
										const W = y.getBoundingClientRect();
										(n.style.position = 'fixed'),
											(n.style.top = `${W.bottom + 4}px`),
											(n.style.left = `${W.left}px`),
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
										const te = Z(y);
										O.push(...te),
											$(),
											P(),
											window.addEventListener('scroll', $, !0),
											o.addEventListener('scroll', $, !0),
											te.forEach((ae) => {
												ae.addEventListener('scroll', $, !0);
											});
										let U = null;
										try {
											const ae = Me({
												containerId: oe,
												items: X,
												size: 'sm',
												maxHeight: 'none',
												onSelectionChange: (le, Le) => {
													if (le && Le !== null) {
														const Te = i[Le];
														if (Te) {
															const he = e.rows.find((Pe) => Pe.id === E);
															if (he && e.columns.find((Ae) => Ae.id === g)) {
																const Ae = z[Te.status] || Te.label;
																(he.data[g] = Ae),
																	(he.data.estado = Ae),
																	(he.data.status = Ae),
																	Y();
															}
															N();
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
													if (typeof je < 'u')
														try {
															const le = document.getElementById(oe);
															le &&
																le.scrollHeight > le.clientHeight &&
																((U = je({
																	containerId: ue,
																	targetId: oe,
																	orientation: 'vertical',
																	state: 'default',
																})),
																U?.update && U.update());
														} catch {}
												});
										} catch {}
										n.__scrollbarInstance = U;
										const fe = (ae) => {
											!n.contains(ae.target) && !y.contains(ae.target) && N();
										};
										(f = fe),
											setTimeout(() => {
												document.addEventListener('click', fe);
											}, 0);
									} catch {
										G();
									}
								};
							y.addEventListener('click', M);
						}),
						o
							.querySelectorAll('input[data-radio-button="true"][data-editable="true"]')
							.forEach((B) => {
								const L = B,
									g = L.getAttribute('data-row-id'),
									x = L.getAttribute('data-column-id');
								if (!g || !x) return;
								const E = isNaN(Number(g)) ? g : Number(g),
									y = L.cloneNode(!0);
								L.parentNode?.replaceChild(y, L),
									y.addEventListener('change', (n) => {
										if ((n.stopPropagation(), y.checked)) {
											o.querySelectorAll(
												`input[data-radio-button="true"][data-column-id="${x}"]`,
											).forEach((C) => {
												const _ = C.getAttribute('data-row-id');
												if (_ && _ !== String(E)) {
													C.checked = !1;
													const H = e.rows.find((A) => String(A.id) === _);
													H && (H.data[x] = !1);
												}
											});
											const f = e.rows.find((C) => String(C.id) === String(E));
											f && ((f.data[x] = !0), (f.data[`${x}_value`] = E));
										}
										Y();
									});
							}),
						o
							.querySelectorAll(
								'input[data-checkbox-button="true"]:not([data-column-id="checkbox-2"])',
							)
							.forEach((B) => {
								const L = B,
									g = L.getAttribute('data-row-id'),
									x = L.getAttribute('data-column-id');
								if (!g || !x || x === 'checkbox-2') return;
								const E = isNaN(Number(g)) ? g : Number(g),
									y = L.cloneNode(!0);
								L.parentNode?.replaceChild(y, L),
									y.addEventListener('change', (n) => {
										n.stopPropagation();
										const i = e.rows.find((f) => String(f.id) === String(E));
										i &&
											((i.data[x] = y.checked), e.onRowSelect && e.onRowSelect(E, y.checked), Y());
									});
							}),
						console.log(
							'☑️ [SELECT ALL] ⚠️ Handler alternativo DESHABILITADO - usando solo el handler optimizado',
						);
					const Ce = o.querySelectorAll('input[data-column-checkbox-header]');
					console.log(
						`☑️ [SELECT ALL] 🔍 Verificando ${Ce.length} header checkboxes después de attachEventListeners...`,
					),
						Ce.forEach((B, L) => {
							const g = B,
								x = g.getAttribute('data-column-checkbox-header');
							console.log(`☑️ [SELECT ALL] 🔍 Header checkbox ${L} verificado:`, {
								columnId: x,
								element: g,
								checked: g.checked,
								hasHeaderAttr: g.hasAttribute('data-column-checkbox-header'),
								allAttrs: Array.from(g.attributes).map((n) => `${n.name}="${n.value}"`),
								parentElement: g.parentElement?.tagName,
								parentClasses: g.parentElement?.className,
								isConnected: g.isConnected,
								ownerDocument: g.ownerDocument === document,
							});
							const E = () => {
								console.log(
									`☑️ [SELECT ALL] 🧪 TEST: Header checkbox ${L} recibió evento click de prueba`,
								);
							};
							g.addEventListener('click', E, { once: !0, capture: !0 });
							const y = () => {
								console.log(
									`☑️ [SELECT ALL] 🧪 TEST: Header checkbox ${L} recibió evento change de prueba`,
								);
							};
							g.addEventListener('change', y, { once: !0, capture: !0 });
						});
					const ke =
						typeof window < 'u' && window.location && !window.location.href.includes('storybook');
					if (
						(o.querySelectorAll('.ubits-data-table__date-editable').forEach((B, L) => {
							const g = B.getAttribute('data-row-id'),
								x = B.getAttribute('data-column-id');
							if (!g || !x) return;
							const E = isNaN(Number(g)) ? g : Number(g),
								y = B.querySelector('.ubits-data-table__date-display');
							if (!y) return;
							let n = null,
								i = null,
								f = null,
								C = null,
								_ = null,
								H = null;
							const A = (N) => {
									const M = String(N.getDate()).padStart(2, '0'),
										R = String(N.getMonth() + 1).padStart(2, '0'),
										z = N.getFullYear();
									return `${M}/${R}/${z}`;
								},
								O = (N) => {
									if (!N) return null;
									const [M, R, z] = N.split('/');
									if (M && R && z) return new Date(parseInt(z), parseInt(R) - 1, parseInt(M));
									try {
										const X = new Date(N);
										if (!isNaN(X.getTime())) return X;
									} catch {}
									return null;
								},
								Z = () => {
									i && ((i.style.display = 'none'), i.parentElement && i.remove(), (i = null)),
										f && (document.removeEventListener('click', f), (f = null)),
										C && (document.removeEventListener('keydown', C), (C = null)),
										_ &&
											(window.removeEventListener('scroll', _, !0),
											H && H.removeEventListener('scroll', _, !0),
											(_ = null));
								},
								$ = () => {
									(f = (N) => {
										i && !B.contains(N.target) && !i.contains(N.target) && Z();
									}),
										(C = (N) => {
											N.key === 'Escape' && i && Z();
										}),
										(_ = (N) => {
											if (!i) return;
											const M = i.querySelector('.ubits-calendar');
											if (M) {
												const R = M.querySelector(
														'.ubits-calendar__month-dropdown[style*="display: block"]',
													),
													z = M.querySelector(
														'.ubits-calendar__year-dropdown[style*="display: block"]',
													);
												if (R || z) {
													const X = document.activeElement;
													if (
														X &&
														(i.contains(X) ||
															X.closest('.ubits-calendar') ||
															X.closest('.ubits-calendar__month-dropdown') ||
															X.closest('.ubits-calendar__year-dropdown') ||
															X.closest('.ubits-list') ||
															X.closest('[id*="calendar-list"]') ||
															X.closest('[id*="calendar-scrollbar"]'))
													)
														return;
													if (N && N.target) {
														const oe = N.target;
														if (
															i.contains(oe) ||
															oe.closest('.ubits-calendar') ||
															oe.closest('.ubits-calendar__month-dropdown') ||
															oe.closest('.ubits-calendar__year-dropdown') ||
															oe.closest('.ubits-list') ||
															oe.closest('[id*="calendar-list"]') ||
															oe.closest('[id*="calendar-scrollbar"]')
														)
															return;
													}
													return;
												}
											}
											Z();
										}),
										document.addEventListener('click', f),
										document.addEventListener('keydown', C),
										(H = o.querySelector('.ubits-data-table__scrollable-container')),
										H && H.addEventListener('scroll', _, !0),
										window.addEventListener('scroll', _, !0);
								},
								P = async () => {
									const N = [
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
									for (const M of N) {
										const R = document.getElementById(M.id),
											z = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).find(
												(oe) => (oe.href || '').includes(M.fileName) || oe.id === M.id,
											);
										if (R || z) continue;
										const X = document.createElement('link');
										(X.rel = 'stylesheet'),
											(X.href = M.href),
											(X.id = M.id),
											document.head.appendChild(X);
									}
								},
								G = async () => {
									if (i && i.style.display !== 'none') {
										Z();
										return;
									}
									if (n && i) {
										const N = y.getBoundingClientRect();
										(i.style.top = `${N.bottom + 4}px`),
											(i.style.left = `${N.left}px`),
											(i.style.display = 'block'),
											$();
										return;
									}
									try {
										await P();
										const { createCalendar: N } = await Promise.resolve().then(() => Kt),
											M = y.textContent || '',
											R = O(M);
										(n = N({
											mode: 'single',
											selectedDate: R,
											initialDate: R || new Date(),
											onDateSelect: (be) => {
												const W = A(be);
												y.textContent = W;
												const te = e.rows.find((U) => U.id === E);
												te &&
													((te.data[x] = W),
													(te.data[`${x}_iso`] = be.toISOString().split('T')[0])),
													Z(),
													Y();
											},
										})),
											(i = document.createElement('div')),
											(i.className = 'ubits-data-table__calendar-container'),
											i.setAttribute('data-row-id', String(E)),
											i.setAttribute('data-column-id', x);
										const X = y.getBoundingClientRect(),
											oe = X.bottom + 4,
											ue = X.left;
										(i.style.cssText = `
            position: fixed;
            top: ${oe}px;
            left: ${ue}px;
            z-index: 99999;
            display: block;
            margin: 0;
          `),
											document.body.appendChild(i),
											i.appendChild(n.element),
											$();
									} catch (N) {
										console.error('❌ [CALENDAR] Error cargando Calendar UBITS:', N);
									}
								};
							y.addEventListener('click', (N) => {
								N.preventDefault(), N.stopPropagation(), G();
							});
						}),
						o.querySelectorAll('input[data-toggle-button="true"]').forEach((B) => {
							const L = B,
								g = L.getAttribute('data-row-id'),
								x = L.getAttribute('data-column-id');
							if (!g || !x) return;
							const E = isNaN(Number(g)) ? g : Number(g),
								y = L.cloneNode(!0);
							L.parentNode?.replaceChild(y, L),
								y.addEventListener('change', (i) => {
									i.stopPropagation();
									const f = e.rows.find((C) => String(C.id) === String(E));
									f && ((f.data[x] = y.checked), Y());
								});
							const n = y.closest('.ubits-toggle');
							n &&
								n.addEventListener('click', (i) => {
									i.target !== y &&
										!y.contains(i.target) &&
										(i.preventDefault(),
										i.stopPropagation(),
										(y.checked = !y.checked),
										y.dispatchEvent(new Event('change', { bubbles: !0 })));
								});
						}),
						e.showPagination)
					) {
						const B = o.querySelector('.ubits-data-table__pagination');
						if (B) {
							B.querySelectorAll('.ubits-pagination__page-button').forEach((E) => {
								E.addEventListener('click', () => {
									const y = parseInt(E.textContent || '1');
									e.onPageChange && e.onPageChange(y), (e.currentPage = y), Y();
								});
							}),
								B.querySelectorAll('.ubits-pagination__nav-button').forEach((E) => {
									E.addEventListener('click', () => {
										const y = parseInt(B.getAttribute('data-current-page') || '1'),
											n = parseInt(B.getAttribute('data-total-pages') || '1'),
											i = E.getAttribute('aria-label') || '';
										let f = y;
										i.includes('Primera') || i.includes('First')
											? (f = 1)
											: i.includes('Última') || i.includes('Last')
												? (f = n)
												: i.includes('Anterior') || i.includes('Previous')
													? (f = Math.max(1, y - 1))
													: (i.includes('Siguiente') || i.includes('Next')) &&
														(f = Math.min(n, y + 1)),
											f !== y && (e.onPageChange && e.onPageChange(f), (e.currentPage = f), Y());
									});
								});
							const x = B.querySelector('.ubits-pagination__select');
							x &&
								x.addEventListener('change', (E) => {
									const y = E.target,
										n = parseInt(y.value);
									e.onItemsPerPageChange && e.onItemsPerPageChange(n),
										(e.itemsPerPage = n),
										(e.currentPage = 1),
										Y();
								});
						}
					}
					if (e.header) {
						const B = o.querySelector('.ubits-data-table__header');
						if (B) {
							if (e.header.primaryButton && e.header.showPrimaryButton !== !1) {
								const L = B.querySelector('.ubits-data-table__header-primary-button');
								L &&
									e.header.primaryButton.onClick &&
									L.addEventListener('click', e.header.primaryButton.onClick);
							}
							if (
								(e.header.secondaryButtons &&
									e.header.showSecondaryButtons !== !1 &&
									B.querySelectorAll('.ubits-data-table__header-secondary-button').forEach(
										(g, x) => {
											const E = e.header.secondaryButtons[x];
											E && E.onClick && g.addEventListener('click', E.onClick);
										},
									),
								e.header.searchButton && e.header.showSearchButton !== !1)
							) {
								console.log('🔍 [DATA TABLE] Configurando SearchButton:', {
									isSearchActive: F,
									hasHeader: !!e.header,
									hasSearchButton: !!e.header.searchButton,
								});
								const L = B.querySelector('.ubits-data-table__header-search-button'),
									g = L?.previousElementSibling,
									x = L ? window.getComputedStyle(L) : null,
									E = g ? window.getComputedStyle(g) : null;
								let y = null;
								if (L && g) {
									const n = g.getBoundingClientRect(),
										i = L.getBoundingClientRect(),
										f = i.left - n.right;
									y = {
										prevButtonRight: n.right,
										searchBtnLeft: i.left,
										actualGap: f,
										expectedGap: 8,
										difference: f - 8,
										prevButtonWidth: n.width,
										searchBtnWidth: i.width,
										marginLeft: x?.marginLeft,
										marginRight: x?.marginRight,
									};
								}
								if (
									(console.log('🔍 [DATA TABLE] SearchButton encontrado:', {
										found: !!L,
										className: L?.className,
										tagName: L?.tagName,
										isActive: L?.classList.contains('ubits-search-button--active'),
										width: x?.width,
										prevButton: g?.tagName,
										gapInfo: y,
									}),
									L)
								) {
									const n = L.querySelector('button'),
										i = L.tagName === 'BUTTON',
										f = !!n;
									if (
										(console.log('🔍 [DATA TABLE] Estado del SearchButton:', {
											isButton: i,
											hasButtonInside: f,
											isSearchActive: F,
											shouldAddListener: (i || f) && !F,
										}),
										(i || f) && !F)
									) {
										const _ = i ? L : n;
										console.log('🔍 [DATA TABLE] Agregando listener al botón de búsqueda'),
											_.addEventListener('click', (H) => {
												console.log('🔍 [DATA TABLE] Click en botón de búsqueda detectado!'),
													H.stopPropagation(),
													H.preventDefault(),
													(F = !0),
													console.log('🔍 [DATA TABLE] isSearchActive cambiado a:', F),
													e.header.searchButton.onClick && e.header.searchButton.onClick(H),
													console.log('🔍 [DATA TABLE] Re-renderizando tabla...'),
													Y(),
													setTimeout(() => {
														const A = o.querySelector('.ubits-data-table__header-search-button');
														if (
															(console.log(
																'🔍 [DATA TABLE] Buscando input después de renderizar:',
																{ found: !!A, tagName: A?.tagName },
															),
															A)
														) {
															const O = A.querySelector('.ubits-search-button__input');
															O
																? (console.log('🔍 [DATA TABLE] Enfocando input'),
																	O.focus(),
																	setTimeout(() => {
																		O.setSelectionRange(0, O.value.length);
																	}, 10))
																: console.warn(
																		'🔍 [DATA TABLE] Input no encontrado después de renderizar',
																	);
														}
													}, 150);
											});
									}
									const C = L.querySelector('.ubits-search-button__input');
									if (C) {
										C.value = k;
										const _ = (P) => {
											if (
												((k = P),
												e.header.searchButton.onChange && e.header.searchButton.onChange(P),
												Y(),
												P &&
													setTimeout(() => {
														const G = o.querySelector('.ubits-data-table__header-search-button');
														if (G) {
															const N = G.querySelector('.ubits-search-button__input');
															N && (N.focus(), N.setSelectionRange(N.value.length, N.value.length));
														}
													}, 50),
												e.header.searchButton.onSearch)
											) {
												const G = j(e.rows, P, e.columns);
												e.header.searchButton.onSearch(P, G);
											}
										};
										C.addEventListener('input', (P) => {
											const G = P.target.value;
											_(G);
										}),
											C.addEventListener('change', (P) => {
												const G = P.target.value;
												_(G);
											});
										let H = null,
											A = !1,
											O = 0;
										C.addEventListener('focus', () => {
											(A = !0),
												(O = Date.now()),
												console.log('🔍 [DATA TABLE] Input recibió focus'),
												setTimeout(() => {
													A = !1;
												}, 200);
										}),
											C.addEventListener('blur', (P) => {
												const N = Date.now() - O;
												if (
													(console.log('🔍 [DATA TABLE] Input perdió focus:', {
														isFocusing: A,
														timeSinceFocus: N,
														searchTerm: k,
														activeElement: document.activeElement?.tagName,
													}),
													A || N < 200)
												) {
													console.log('🔍 [DATA TABLE] Ignorando blur inmediato después de focus');
													return;
												}
												H && clearTimeout(H),
													(H = setTimeout(() => {
														const M = o.querySelector('.ubits-search-button__input'),
															R = document.activeElement,
															z = o.querySelector('.ubits-search-button__clear'),
															X = o.querySelector('.ubits-data-table__header-search-button'),
															oe = M && k === '' && !M.value && R !== z && !X?.contains(R);
														console.log('🔍 [DATA TABLE] Evaluando cierre del SearchButton:', {
															hasInput: !!M,
															searchTerm: k,
															inputValue: M?.value,
															activeElement: R?.tagName,
															isClearBtn: R === z,
															isInsideWrapper: X?.contains(R),
															shouldClose: oe,
														}),
															oe &&
																(console.log(
																	'🔍 [DATA TABLE] Desactivando SearchButton por blur (vacío)',
																),
																(F = !1),
																Y()),
															(H = null);
													}, 200));
											});
										const Z = L.closest('.ubits-data-table__header-search-button');
										Z &&
											Z.addEventListener('mousedown', (P) => {
												P.target.closest('.ubits-search-button__input-wrapper') &&
													P.preventDefault();
											});
										const $ = L.querySelector('.ubits-search-button__clear');
										$ &&
											$.addEventListener('click', (P) => {
												P.stopPropagation(),
													P.preventDefault(),
													(k = ''),
													(C.value = ''),
													(F = !1),
													_('');
											});
									}
								}
							}
							if (e.header.filterButton && e.header.showFilterButton !== !1) {
								const L = B.querySelector('.ubits-data-table__header-filter-button');
								L &&
									L.addEventListener('click', (g) => {
										g.stopPropagation(), g.preventDefault();
										let x = e.header.filterButton.filters || [];
										if (
											(x.length === 0 &&
												(x = e.columns
													.filter((y) => {
														const n = [
															'drag-handle',
															'expand',
															'checkbox',
															'radio',
															'toggle',
															'acciones',
														];
														return y.visible !== !1 && y.type && !n.includes(y.type);
													})
													.map((y) => {
														let n = 'text',
															i;
														if (y.type === 'estado') {
															n = 'select';
															const f = new Set();
															e.rows.forEach((C) => {
																const _ = C.data[y.id];
																_ != null && f.add(String(_));
															}),
																(i = Array.from(f).map((C) => ({ value: C, label: C })));
														} else
															y.type === 'fecha'
																? (n = 'date')
																: y.type === 'progreso'
																	? (n = 'number')
																	: (n = 'text');
														return {
															id: y.id,
															label: y.title,
															columnId: y.id,
															type: n,
															options: i,
														};
													})),
											x.length === 0)
										) {
											console.warn('🔍 [DATA TABLE] No hay columnas disponibles para filtrar'),
												e.header.filterButton.onClick && e.header.filterButton.onClick(g);
											return;
										}
										const E = () => `
                  <div class="ubits-data-table__filters-container">
                    ${x
											.map((n) => {
												const i = T[n.id] || n.value || '';
												let f = '';
												const C = `filter-input-${n.id}`;
												switch (n.type) {
													case 'text':
													case 'number':
													case 'date':
														f = Ke({
															containerId: C,
															label: n.label,
															type: n.type,
															value: i,
															placeholder: `Filtrar por ${n.label.toLowerCase()}...`,
															size: 'md',
														});
														break;
													case 'select':
														n.options &&
															n.options.length > 0 &&
															(f = Ke({
																containerId: C,
																label: n.label,
																type: 'select',
																selectOptions: n.options,
																value: i,
																placeholder: `Seleccionar ${n.label.toLowerCase()}...`,
																size: 'md',
															}));
														break;
												}
												return `
                    <div class="ubits-data-table__filter-item" data-filter-id="${n.id}">
                      <div id="${C}">${f}</div>
                    </div>
                  `;
											})
											.join('')}
                  </div>
                `;
										if (q)
											try {
												q.updateContent(E);
											} catch (y) {
												console.error('🔍 [DATA TABLE] Error al actualizar drawer:', y),
													(q = nt({
														title: 'Filtros',
														complementaryText: 'Aplica filtros para refinar los resultados',
														width: 40,
														bodyContent: E,
														footerButtons: {
															secondary: {
																label: 'Limpiar',
																onClick: (n) => {
																	n.preventDefault(),
																		n.stopPropagation(),
																		(T = {}),
																		e.header.filterButton.onClearFilters &&
																			e.header.filterButton.onClearFilters(),
																		Y(),
																		q && q.close();
																},
															},
															primary: {
																label: 'Aplicar',
																onClick: (n) => {
																	n.preventDefault(), n.stopPropagation();
																	const i = {};
																	x.forEach((f) => {
																		const C = q.element.querySelector(`[data-filter-id="${f.id}"]`);
																		if (C) {
																			const _ = C.querySelector('.ubits-input');
																			_ &&
																				_.value &&
																				_.value.trim() !== '' &&
																				(i[f.id] = _.value.trim());
																		}
																	}),
																		(T = i),
																		e.header.filterButton.onApplyFilters &&
																			e.header.filterButton.onApplyFilters(T),
																		Y(),
																		q && q.close();
																},
															},
														},
														onClose: () => {},
														closeOnOverlayClick: !0,
													}));
											}
										else
											try {
												q = nt({
													title: 'Filtros',
													complementaryText: 'Aplica filtros para refinar los resultados',
													width: 40,
													bodyContent: E,
													footerButtons: {
														secondary: {
															label: 'Limpiar',
															onClick: (y) => {
																y.preventDefault(),
																	y.stopPropagation(),
																	(T = {}),
																	e.header.filterButton.onClearFilters &&
																		e.header.filterButton.onClearFilters(),
																	Y(),
																	q && q.close();
															},
														},
														primary: {
															label: 'Aplicar',
															onClick: (y) => {
																y.preventDefault(), y.stopPropagation();
																const n = {};
																x.forEach((i) => {
																	const f = q.element.querySelector(`[data-filter-id="${i.id}"]`);
																	if (f) {
																		const C = f.querySelector('.ubits-input');
																		C &&
																			C.value &&
																			C.value.trim() !== '' &&
																			(n[i.id] = C.value.trim());
																	}
																}),
																	(T = n),
																	e.header.filterButton.onApplyFilters &&
																		e.header.filterButton.onApplyFilters(T),
																	Y(),
																	q && q.close();
															},
														},
													},
													onClose: () => {},
													closeOnOverlayClick: !0,
												});
											} catch (y) {
												console.error('🔍 [DATA TABLE] Error al crear drawer:', y),
													e.header.filterButton.onClick && e.header.filterButton.onClick(g);
												return;
											}
										q &&
											(q.open(),
											setTimeout(() => {
												q &&
													x.forEach((y) => {
														const n = `filter-input-${y.id}`,
															i = q.element.querySelector(`#${n}`);
														if (i) {
															i.innerHTML = '';
															const f = T[y.id] || y.value || '';
															let C = {
																containerId: n,
																label: y.label,
																value: f,
																placeholder:
																	y.type === 'select'
																		? `Seleccionar ${y.label.toLowerCase()}...`
																		: `Filtrar por ${y.label.toLowerCase()}...`,
																size: 'md',
															};
															y.type === 'select' && y.options
																? ((C.type = 'select'),
																	(C.selectOptions = y.options.map((_) => ({
																		value: _.value,
																		text: _.label || _.value,
																	}))))
																: (C.type = y.type),
																kt(C);
														}
													});
											}, 300));
									});
							}
							if (e.header.columnSelectorButton && e.header.showColumnSelectorButton !== !1) {
								const L = B.querySelector('.ubits-data-table__header-column-selector-button');
								if (L) {
									let g = null,
										x = !1;
									const E = () => (
											(g && g.parentElement) ||
												((g = document.createElement('div')),
												(g.className = 'ubits-data-table__column-selector-dropdown'),
												(g.style.display = 'none'),
												document.body.appendChild(g)),
											g
										),
										y = () => {
											if (!g || !L) return;
											const C = L.getBoundingClientRect(),
												_ = g.offsetWidth || 200;
											(g.style.position = 'fixed'), (g.style.top = `${C.bottom + 4}px`);
											const H = C.right - _;
											H < 0 ? (g.style.left = '0px') : (g.style.left = `${H}px`),
												(g.style.right = 'auto');
										};
									let n = null,
										i = null;
									const f = () => {
										g &&
											((g.style.display = 'none'),
											(x = !1),
											i && (document.removeEventListener('click', i), (i = null)),
											n &&
												(window.removeEventListener('scroll', n, !0),
												window.removeEventListener('resize', n),
												(n = null)));
									};
									L.addEventListener('click', (C) => {
										if (
											(C.preventDefault(),
											C.stopPropagation(),
											console.log('🔍 [COLUMN SELECTOR] ========== CLICK EN BOTÓN =========='),
											console.log('🔍 [COLUMN SELECTOR] Estado actual - isOpen:', x),
											x)
										) {
											console.log('🔍 [COLUMN SELECTOR] Dropdown ya está abierto, cerrando...'),
												f();
											return;
										}
										const _ = E();
										for (
											console.log('🔍 [COLUMN SELECTOR] Dropdown creado/obtenido:', {
												exists: !!_,
												hasChildren: _.children.length,
												innerHTMLLength: _.innerHTML.length,
											}),
												console.log('🔍 [COLUMN SELECTOR] Limpiando dropdown completamente...'),
												console.log(
													'🔍 [COLUMN SELECTOR] ANTES - children:',
													_.children.length,
													'innerHTML:',
													_.innerHTML.length,
													'chars',
												);
											_.firstChild;
										)
											_.removeChild(_.firstChild);
										_.innerHTML = '';
										const H = _.children.length,
											A = _.innerHTML.length;
										console.log(
											'🔍 [COLUMN SELECTOR] DESPUÉS - children:',
											H,
											'innerHTML:',
											A,
											'chars',
										),
											(H > 0 || A > 0) &&
												(console.error(
													'🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown no está completamente limpio!',
												),
												(_.innerHTML = ''),
												requestAnimationFrame(() => {
													(_.children.length > 0 || _.innerHTML.length > 0) &&
														console.error(
															'🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown sigue sin estar limpio después de limpieza adicional!',
														);
												}));
										const O = 'ubits-data-table-column-selector-list',
											Z = document.getElementById(O);
										Z &&
											(console.log(
												'🔍 [COLUMN SELECTOR] ⚠️ Contenedor existente encontrado, removiendo...',
											),
											Z.remove());
										const $ = document.createElement('div');
										if (
											(($.id = O),
											_.appendChild($),
											console.log('🔍 [COLUMN SELECTOR] Contenedor de lista creado:', {
												id: $.id,
												parentExists: !!$.parentElement,
												hasChildren: $.children.length,
												innerHTML: $.innerHTML.length,
											}),
											$)
										) {
											console.log(
												'🔍 [COLUMN SELECTOR] ========== PROCESANDO COLUMNAS PARA CREAR LISTA ==========',
											),
												console.log(
													'🔍 [COLUMN SELECTOR] Total columnas en currentOptions:',
													e.columns.length,
												);
											const N = s(e.columns);
											N.length !== e.columns.length &&
												(console.log(
													'🔍 [COLUMN SELECTOR] ⚠️ DUPLICADOS ELIMINADOS:',
													e.columns.length,
													'->',
													N.length,
												),
												(e.columns = N));
											const M = N.filter((W) => {
													const te = ['drag-handle', 'expand'],
														U = ['checkbox', 'checkbox-2'];
													return (
														!te.includes(W.type || '') && !U.includes(W.id) && W.id !== 'checkbox'
													);
												}),
												R = new Set(),
												z = M.filter((W) =>
													R.has(W.id)
														? (console.log('🔍 [COLUMN SELECTOR] ⚠️ DUPLICADO:', W.id), !1)
														: (R.add(W.id), !0),
												);
											console.log(
												'🔍 [COLUMN SELECTOR] Columnas seleccionables finales:',
												z.length,
											),
												console.log(
													'🔍 [COLUMN SELECTOR] IDs:',
													z
														.map((W) => `${W.id}(${W.visible !== !1 ? 'visible' : 'oculta'})`)
														.join(', '),
												);
											const X = z.filter((W) => W.visible !== !1).length;
											console.log('🔍 [COLUMN SELECTOR] Columnas visibles:', X);
											const oe = z.map((W) => {
													const te = W.visible !== !1,
														U = te && X === 1;
													return {
														label: Ne({
															label: W.title,
															checked: te,
															size: 'sm',
															disabled: U,
															className: 'ubits-data-table__column-selector-checkbox',
														}).replace('<input', `<input data-column-selector-id="${W.id}"`),
														value: W.id,
														state: 'default',
														selected: !1,
													};
												}),
												ue = new Set(),
												be = oe.filter((W) =>
													ue.has(W.value)
														? (console.log('🔍 [COLUMN SELECTOR] ⚠️ ITEM DUPLICADO:', W.value), !1)
														: (ue.add(W.value), !0),
												);
											console.log('🔍 [COLUMN SELECTOR] Items únicos para lista:', be.length),
												console.log(
													'🔍 [COLUMN SELECTOR] Valores:',
													be.map((W) => W.value).join(', '),
												);
											try {
												console.log('🔍 [COLUMN SELECTOR] Llamando createList...'),
													Me({
														containerId: O,
														items: be,
														size: 'sm',
														maxHeight: '400px',
														className: 'ubits-data-table__column-selector-list',
													}),
													console.log('🔍 [COLUMN SELECTOR] ✅ createList completado');
												const W = document.getElementById(O);
												if (W) {
													const U =
														W.querySelector('.ubits-list')?.querySelectorAll('.ubits-list-item') ||
														[];
													console.log(
														'🔍 [COLUMN SELECTOR] Lista creada - items en DOM:',
														U.length,
													);
												} else
													console.error(
														'🔍 [COLUMN SELECTOR] ❌ Lista no encontrada después de createList',
													);
											} catch (W) {
												console.error('🔍 [COLUMN SELECTOR] ❌ Error en createList:', W),
													($.innerHTML = Oe({
														containerId: O,
														items: be,
														size: 'sm',
														maxHeight: '400px',
														className: 'ubits-data-table__column-selector-list',
													})),
													console.log('🔍 [COLUMN SELECTOR] ✅ Fallback renderList usado');
											}
										} else console.error('🔍 [COLUMN SELECTOR] ❌ listContainer no existe');
										const P = () => {
												console.log(
													'🔍 [COLUMN SELECTOR] ========== UPDATE DROPDOWN CONTENT ==========',
												),
													console.log('🔍 [COLUMN SELECTOR] Dropdown existe:', !!_),
													console.log('🔍 [COLUMN SELECTOR] Dropdown isOpen:', x);
												const N = 'ubits-data-table-column-selector-list';
												let M = _.querySelector(`#${N}`);
												console.log('🔍 [COLUMN SELECTOR] Buscando contenedor:', {
													found: !!M,
													hasChildren: M ? M.children.length : 0,
													innerHTMLLength: M ? M.innerHTML.length : 0,
												}),
													(!M || !x) &&
														(console.log(
															'🔍 [COLUMN SELECTOR] ⚠️ Contenedor no encontrado o dropdown cerrado, recreando...',
														),
														(_.innerHTML = ''),
														(M = document.createElement('div')),
														(M.id = N),
														_.appendChild(M),
														console.log('🔍 [COLUMN SELECTOR] Contenedor recreado:', {
															id: M.id,
															parentExists: !!M.parentElement,
														}));
												const R = s(e.columns);
												R.length !== e.columns.length &&
													(console.log(
														'🔍 [COLUMN SELECTOR UPDATE] ⚠️ DUPLICADOS:',
														e.columns.length,
														'->',
														R.length,
													),
													(e.columns = R));
												const z = R.filter((U) => {
														const fe = ['drag-handle', 'expand'],
															ae = ['checkbox', 'checkbox-2'];
														return (
															!fe.includes(U.type || '') &&
															!ae.includes(U.id) &&
															U.id !== 'checkbox'
														);
													}),
													X = new Set(),
													oe = z.filter((U) =>
														X.has(U.id)
															? (console.log('🔍 [COLUMN SELECTOR UPDATE] ⚠️ DUPLICADO:', U.id), !1)
															: (X.add(U.id), !0),
													),
													ue = oe.filter((U) => U.visible !== !1).length;
												console.log(
													'🔍 [COLUMN SELECTOR UPDATE] Columnas:',
													oe.length,
													'| Visibles:',
													ue,
												),
													console.log(
														'🔍 [COLUMN SELECTOR UPDATE] IDs:',
														oe.map((U) => `${U.id}(${U.visible !== !1 ? 'V' : 'O'})`).join(', '),
													);
												const be = oe.map((U) => {
														const fe = U.visible !== !1,
															ae = fe && ue === 1;
														return {
															label: Ne({
																label: U.title,
																checked: fe,
																size: 'sm',
																disabled: ae,
																className: 'ubits-data-table__column-selector-checkbox',
															}).replace('<input', `<input data-column-selector-id="${U.id}"`),
															value: U.id,
															state: 'default',
															selected: !1,
														};
													}),
													W = new Set(),
													te = be.filter((U) =>
														W.has(U.value)
															? (console.log(
																	'🔍 [COLUMN SELECTOR UPDATE] ⚠️ ITEM DUPLICADO:',
																	U.value,
																),
																!1)
															: (W.add(U.value), !0),
													);
												console.log('🔍 [COLUMN SELECTOR UPDATE] Items únicos:', te.length),
													console.log(
														'🔍 [COLUMN SELECTOR UPDATE] Valores:',
														te.map((U) => U.value).join(', '),
													),
													console.log('🔍 [COLUMN SELECTOR UPDATE] Limpiando contenedor...'),
													console.log(
														'🔍 [COLUMN SELECTOR UPDATE] ANTES - children:',
														M.children.length,
														'innerHTML:',
														M.innerHTML.length,
													),
													(M.innerHTML = ''),
													console.log(
														'🔍 [COLUMN SELECTOR UPDATE] DESPUÉS - children:',
														M.children.length,
														'innerHTML:',
														M.innerHTML.length,
													);
												try {
													console.log('🔍 [COLUMN SELECTOR UPDATE] Llamando createList...'),
														Me({
															containerId: N,
															items: te,
															size: 'sm',
															maxHeight: '400px',
															className: 'ubits-data-table__column-selector-list',
														}),
														console.log('🔍 [COLUMN SELECTOR UPDATE] ✅ createList completado');
													const U = document.getElementById(N);
													if (U) {
														const ae =
															U.querySelector('.ubits-list')?.querySelectorAll(
																'.ubits-list-item',
															) || [];
														console.log(
															'🔍 [COLUMN SELECTOR UPDATE] Lista creada - items en DOM:',
															ae.length,
														);
													} else
														console.error('🔍 [COLUMN SELECTOR UPDATE] ❌ Lista no encontrada');
												} catch (U) {
													console.error('🔍 [COLUMN SELECTOR UPDATE] ❌ Error en createList:', U),
														(M.innerHTML = Oe({
															containerId: N,
															items: te,
															size: 'sm',
															maxHeight: '400px',
															className: 'ubits-data-table__column-selector-list',
														})),
														console.log('🔍 [COLUMN SELECTOR UPDATE] ✅ Fallback renderList usado');
												}
												setTimeout(() => {
													G();
												}, 50);
											},
											G = () => {
												_.querySelectorAll('input[data-column-selector-id]').forEach((M) => {
													const R = M,
														z = R.getAttribute('data-column-selector-id'),
														X = R.cloneNode(!0);
													R.parentNode?.replaceChild(X, R),
														X.addEventListener('change', (oe) => {
															if ((oe.stopPropagation(), oe.preventDefault(), X.disabled)) {
																console.log(
																	'🔍 [COLUMN SELECTOR] Checkbox deshabilitado, ignorando cambio',
																);
																return;
															}
															const ue = X.checked,
																be = e.columns.find((W) => W.id === z);
															if (be) {
																if (!ue) {
																	const te = e.columns.filter((le) => {
																			const Le = ['drag-handle', 'expand'],
																				Te = ['checkbox', 'checkbox-2'];
																			return (
																				!Le.includes(le.type || '') &&
																				!Te.includes(le.id) &&
																				le.id !== 'checkbox'
																			);
																		}),
																		U = new Set(),
																		fe = te.filter((le) =>
																			U.has(le.id) ? !1 : (U.add(le.id), !0),
																		),
																		ae = fe.filter((le) => (le.id === z ? !1 : le.visible !== !1));
																	if (
																		(console.log(
																			'🔍 [COLUMN SELECTOR] Validación de ocultar columna:',
																			{
																				columnId: z,
																				columnTitle: be.title,
																				selectableColumnsCount: fe.length,
																				wouldBeVisibleCount: ae.length,
																				selectableColumns: fe.map((le) => ({
																					id: le.id,
																					title: le.title,
																					visible: le.visible,
																				})),
																				wouldBeVisible: ae.map((le) => ({
																					id: le.id,
																					title: le.title,
																				})),
																			},
																		),
																		console.log(
																			'🔍 [COLUMN SELECTOR] Detalles completos:',
																			JSON.stringify(
																				{
																					columnId: z,
																					columnTitle: be.title,
																					selectableColumnsCount: fe.length,
																					wouldBeVisibleCount: ae.length,
																					selectableColumns: fe.map((le) => ({
																						id: le.id,
																						title: le.title,
																						visible: le.visible,
																					})),
																					wouldBeVisible: ae.map((le) => ({
																						id: le.id,
																						title: le.title,
																					})),
																				},
																				null,
																				2,
																			),
																		),
																		ae.length === 0)
																	) {
																		(X.checked = !0),
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
																		id: be.id,
																		title: be.title,
																		visibleActual: be.visible,
																		visibleNuevo: ue,
																	});
																const W = e.columns.filter((te) => te.id === z);
																console.log(
																	'🔍 [COLUMN SELECTOR] Columnas con el mismo ID:',
																	W.length,
																	W.map((te) => ({
																		id: te.id,
																		title: te.title,
																		visible: te.visible,
																	})),
																),
																	(be.visible = ue),
																	W.length > 1 &&
																		(console.log(
																			'🔍 [COLUMN SELECTOR] ⚠️ ACTUALIZANDO COLUMNAS DUPLICADAS:',
																			W.length,
																		),
																		W.forEach((te, U) => {
																			te.id === z &&
																				((te.visible = ue),
																				console.log(
																					'🔍 [COLUMN SELECTOR] Columna duplicada actualizada:',
																					U,
																					te.id,
																					te.title,
																					te.visible,
																				));
																		})),
																	console.log(
																		'🔍 [COLUMN SELECTOR] Estado después de actualizar:',
																		{
																			columnId: z,
																			visible: be.visible,
																			totalColumnsWithId: e.columns.filter((te) => te.id === z)
																				.length,
																		},
																	),
																	console.log(
																		'🔍 [COLUMN SELECTOR] Llamando updateDropdownContent...',
																	),
																	P(),
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
											G();
										}, 100),
											(_.style.display = 'block'),
											requestAnimationFrame(() => {
												y(),
													setTimeout(() => {
														y();
													}, 10);
											}),
											(x = !0),
											(n = () => {
												x && g && y();
											}),
											window.addEventListener('scroll', n, !0),
											window.addEventListener('resize', n),
											(i = (N) => {
												_ &&
													!_.contains(N.target) &&
													!L.contains(N.target) &&
													(n &&
														(window.removeEventListener('scroll', n, !0),
														window.removeEventListener('resize', n)),
													f());
											}),
											setTimeout(() => {
												document.addEventListener('click', i);
											}, 0),
											e.header.columnSelectorButton.onClick &&
												e.header.columnSelectorButton.onClick(C);
									});
								}
							}
						}
					}
					try {
						const B = o.querySelector('.ubits-data-table__empty-state');
						if (B && e.emptyState) {
							const L = e.rows.length === 0,
								g = k && k.trim() !== '',
								x = Object.keys(T).length > 0;
							let E;
							if (
								(L && e.emptyState.noData
									? (E = e.emptyState.noData)
									: g && e.emptyState.noSearchResults
										? (E = e.emptyState.noSearchResults)
										: x && e.emptyState.noFilterResults && (E = e.emptyState.noFilterResults),
								E)
							) {
								if (E.onAction) {
									const y = B.querySelector('[data-action="primary"]');
									y &&
										y.addEventListener('click', (n) => {
											n.preventDefault(), n.stopPropagation(), E.onAction?.();
										});
								}
								if (E.onSecondaryAction) {
									const y = B.querySelector('[data-action="secondary"]');
									y &&
										y.addEventListener('click', (n) => {
											n.preventDefault(), n.stopPropagation(), E.onSecondaryAction?.();
										});
								}
							}
						}
					} catch (B) {
						console.error('📎 [ATTACH] ❌ Error agregando listeners de empty state:', B);
					}
				} catch (V) {
					console.error('📎 [ATTACH] ❌ Error en attachEventListeners:', V);
				}
				console.log('📎 [ATTACH] ========== FIN attachEventListeners ==========');
			};
		return (
			Y(),
			{
				element: o,
				destroy: () => {
					if (I) {
						try {
							I.destroy();
						} catch {}
						I = null;
					}
					if (D) {
						const V =
							o.querySelector('.ubits-data-table__scrollable-container') ||
							o.querySelector('.ubits-data-table') ||
							o;
						V && V.removeEventListener('scroll', D),
							window.removeEventListener('scroll', D, !0),
							(D = null);
					}
					o && o.parentNode && o.parentNode.removeChild(o);
				},
				update: (V) => {
					const se = e.showPagination;
					if (((e = { ...e, ...V }), V.columns))
						console.log('🔍 [UPDATE] Eliminando duplicados de columnas actualizadas...'),
							(e.columns = s(V.columns));
					else if (e.columns) {
						const ne = e.columns.length;
						(e.columns = s(e.columns)),
							e.columns.length !== ne &&
								console.log(
									'🔍 [UPDATE] Duplicados encontrados y eliminados:',
									ne,
									'->',
									e.columns.length,
								);
					}
					if (V.showPagination !== void 0 && V.showPagination !== se)
						if (V.showPagination) {
							if (D) {
								const ne =
									o.querySelector('.ubits-data-table__scrollable-container') ||
									o.querySelector('.ubits-data-table') ||
									o;
								ne && ne.removeEventListener('scroll', D),
									window.removeEventListener('scroll', D, !0),
									(D = null);
							}
							K = J;
						} else K = J;
					V.columns && (m = V.columns.filter((ne) => ne.visible !== !1).map((ne) => ne.id)),
						V.rows && ((v = V.rows.map((ne) => ne.id)), (K = J)),
						Y();
				},
			}
		);
	}
	typeof window < 'u' &&
		((window.UBITSDataTable = { renderDataTable: qe, createDataTable: Ye }),
		(window.renderDataTable = qe),
		(window.createDataTable = Ye));
	const ze = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		],
		Xt = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
	function jt(t) {
		const c = String(t.getDate()).padStart(2, '0'),
			b = String(t.getMonth() + 1).padStart(2, '0'),
			u = t.getFullYear();
		return `${c}/${b}/${u}`;
	}
	function Ue(t, c) {
		const b = new Date(t.getFullYear(), t.getMonth(), t.getDate()),
			u = new Date(c.getFullYear(), c.getMonth(), c.getDate());
		return b.getTime() - u.getTime();
	}
	function Ve(t, c) {
		return Ue(t, c) === 0;
	}
	function Wt(t, c, b) {
		const u = Ue(t, c),
			d = Ue(b, t);
		return u >= 0 && d >= 0;
	}
	function st(t, c) {
		const b = document.createElement('div');
		b.style.cssText = 'position: relative; width: 100%;';
		const u = `calendar-list-container-${Date.now()}`,
			d = `calendar-list-${Date.now()}`,
			r = `calendar-scrollbar-${Date.now()}`;
		let a = `
    <div id="${u}" style="position: relative; width: 100%; max-height: 200px; overflow: hidden;">
      <div id="${d}" class="ubits-list" role="list" style="max-height: 200px; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 0; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
  `;
		t.forEach((s) => {
			const e = s.selected ? 'active' : 'default',
				m = [
					'ubits-list-item',
					'ubits-list-item--sm',
					e !== 'default' ? `ubits-list-item--${e}` : '',
				]
					.filter(Boolean)
					.join(' '),
				v = [];
			e === 'active' && v.push('aria-selected="true"'),
				v.push('tabindex="0"'),
				v.push(`data-value="${s.value}"`),
				(a += `
      <div class="${m}" role="listitem" ${v.join(' ')} style="cursor: pointer;">
        ${s.label}
      </div>
    `);
		}),
			(a += `
      </div>
      <div id="${r}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; max-height: 200px; overflow: hidden; pointer-events: auto; z-index: 10;"></div>
    </div>
    <style>
      /* Ocultar scrollbar nativo completamente - solo mostrar UBITS scrollbar */
      #${d}::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
      #${d}::-webkit-scrollbar-track {
        display: none !important;
        background: transparent !important;
      }
      #${d}::-webkit-scrollbar-thumb {
        display: none !important;
        background: transparent !important;
      }
      /* Firefox */
      #${d} {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
    </style>
  `),
			(b.innerHTML = a);
		const p = async () => {
				console.log('📜 [SCROLLBAR] ========== INICIO initScrollbar =========='),
					console.log('📜 [SCROLLBAR] listId:', d),
					console.log('📜 [SCROLLBAR] scrollbarContainerId:', r);
				const s = document.getElementById(d),
					e = document.getElementById(r);
				if (!s || !e) {
					console.log('📜 [SCROLLBAR] ❌ Elementos no encontrados:', {
						listElement: !!s,
						scrollbarContainer: !!e,
					});
					return;
				}
				if (
					(console.log('📜 [SCROLLBAR] Elementos encontrados:', {
						listElement: {
							scrollHeight: s.scrollHeight,
							clientHeight: s.clientHeight,
							offsetHeight: s.offsetHeight,
							maxHeight: s.style.maxHeight,
							computedMaxHeight: window.getComputedStyle(s).maxHeight,
						},
						scrollbarContainer: {
							offsetHeight: e.offsetHeight,
							offsetWidth: e.offsetWidth,
							styleHeight: e.style.height,
							styleMaxHeight: e.style.maxHeight,
							computedHeight: window.getComputedStyle(e).height,
							computedMaxHeight: window.getComputedStyle(e).maxHeight,
						},
					}),
					s.scrollHeight <= s.clientHeight)
				) {
					console.log('📜 [SCROLLBAR] ⚠️ No necesita scroll:', {
						scrollHeight: s.scrollHeight,
						clientHeight: s.clientHeight,
					});
					return;
				}
				console.log('📜 [SCROLLBAR] ✅ Necesita scroll, inicializando...');
				try {
					const m = window.createScrollbarLocal;
					if (typeof m == 'function') {
						console.log('📜 [SCROLLBAR] Usando createScrollbarLocal');
						const l = m(s, e, 'vertical');
						if (l) {
							(b._scrollbarInstance = l),
								console.log('📜 [SCROLLBAR] ✅ Scrollbar creado con createScrollbarLocal');
							return;
						}
					}
					console.log('📜 [SCROLLBAR] Importando ScrollProvider...');
					const { createScrollbar: v } = await Promise.resolve().then(() => yt),
						h = v({ orientation: 'vertical', targetId: d, containerId: r });
					h
						? ((b._scrollbarInstance = h),
							console.log('📜 [SCROLLBAR] ✅ Scrollbar creado con ScrollProvider'))
						: console.log('📜 [SCROLLBAR] ⚠️ Scrollbar no se creó');
				} catch (m) {
					console.error('📜 [SCROLLBAR] ❌ Error inicializando scrollbar:', m);
				}
				console.log('📜 [SCROLLBAR] ========== FIN initScrollbar ==========');
			},
			o = () => {
				console.log('📜 [SCROLLBAR] setupScrollbar llamado, isConnected:', b.isConnected),
					b.isConnected &&
						requestAnimationFrame(() => {
							console.log('📜 [SCROLLBAR] requestAnimationFrame ejecutado, llamando initScrollbar'),
								p();
						});
			};
		if (b.parentElement)
			console.log('📜 [SCROLLBAR] Contenedor ya en DOM, inicializando inmediatamente'), o();
		else {
			console.log('📜 [SCROLLBAR] Contenedor no en DOM, configurando observer');
			const s = new MutationObserver(() => {
				b.isConnected &&
					(console.log('📜 [SCROLLBAR] Contenedor conectado al DOM, inicializando'),
					s.disconnect(),
					o());
			});
			s.observe(document.body, { childList: !0, subtree: !0 }),
				setTimeout(() => {
					b.isConnected &&
						(console.log('📜 [SCROLLBAR] Timeout alcanzado, inicializando'), s.disconnect(), o());
				}, 1e3);
		}
		return (
			setTimeout(() => {
				const s = document.getElementById(d);
				s &&
					s.querySelectorAll('.ubits-list-item').forEach((e) => {
						e.addEventListener('click', (m) => {
							m.preventDefault(), m.stopPropagation();
							const v = parseInt(m.currentTarget.dataset.value || '0'),
								h = b._scrollbarInstance;
							h && h.destroy && h.destroy(), c(v);
						});
					});
			}, 100),
			b
		);
	}
	function Xe(t) {
		const {
				mode: c = 'single',
				selectedDate: b,
				endDate: u,
				minDate: d,
				maxDate: r,
				initialDate: a = new Date(),
				className: p = '',
				style: o = '',
			} = t,
			s = a,
			e = s.getFullYear(),
			m = s.getMonth(),
			v = new Date(e, m, 1),
			l = new Date(e, m + 1, 0).getDate(),
			w = v.getDay(),
			k = new Date().toDateString(),
			F = ['ubits-calendar', c === 'range' ? 'ubits-calendar--range' : 'ubits-calendar--single', p]
				.filter(Boolean)
				.join(' '),
			I = o ? ` style="${o}"` : '',
			q = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${ze[m]}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__year-input" value="${e}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--next" aria-label="Mes siguiente">
        <i class="far fa-chevron-right"></i>
      </button>
    </div>
  `,
			j = `
    <div class="ubits-calendar__weekdays">
      ${Xt.map((Q) => `<div class="ubits-calendar__weekday">${Q}</div>`).join('')}
    </div>
  `;
		let ee = '<div class="ubits-calendar__days">';
		for (let Q = 0; Q < w; Q++)
			ee += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
		for (let Q = 1; Q <= l; Q++) {
			const J = new Date(e, m, Q),
				D = J.toDateString() === k;
			let ce = ['ubits-calendar__day'];
			c === 'single' && b && Ve(J, b) && ce.push('ubits-calendar__day--selected'),
				c === 'range' &&
					b &&
					(u
						? Ve(J, b)
							? ce.push('ubits-calendar__day--range-start')
							: Ve(J, u)
								? ce.push('ubits-calendar__day--range-end')
								: Wt(J, b, u) && ce.push('ubits-calendar__day--in-range')
						: Ve(J, b) && ce.push('ubits-calendar__day--range-start')),
				D && ce.push('ubits-calendar__day--today');
			let de = !1;
			d && Ue(J, d) < 0 && ((de = !0), ce.push('ubits-calendar__day--disabled')),
				r && Ue(J, r) > 0 && ((de = !0), ce.push('ubits-calendar__day--disabled'));
			const Y = de ? ' disabled' : '',
				me = jt(J);
			ee += `<button type="button" class="${ce.join(' ')}" data-date="${me}"${Y}>${Q}</button>`;
		}
		return (
			(ee += '</div>'),
			`
    <div class="${F}"${I}>
      ${q}
      ${j}
      ${ee}
    </div>
  `.trim()
		);
	}
	function it(t) {
		const {
				mode: c = 'single',
				selectedDate: b,
				endDate: u,
				minDate: d,
				maxDate: r,
				initialDate: a = new Date(),
				onDateSelect: p,
				onRangeSelect: o,
			} = t,
			s = document.createElement('div');
		s.innerHTML = Xe(t);
		const e = s.firstElementChild;
		if (!e) throw new Error('No se pudo crear el calendario');
		let m = new Date(a),
			v = b ? new Date(b) : null,
			h = u ? new Date(u) : null,
			l = !1;
		const w = () => {
				l ||
					((l = !0),
					(e.innerHTML = Xe({
						...t,
						mode: c,
						selectedDate: v,
						endDate: h,
						minDate: d,
						maxDate: r,
						initialDate: m,
					})),
					S(),
					setTimeout(() => {
						l = !1;
					}, 100));
			},
			S = () => {
				const I = e.querySelector('.ubits-calendar__nav-button--prev'),
					T = e.querySelector('.ubits-calendar__nav-button--next'),
					q = e.querySelector('.ubits-calendar__month-input'),
					j = e.querySelector('.ubits-calendar__year-input'),
					ee = e.querySelector('.ubits-calendar__month-dropdown'),
					Q = e.querySelector('.ubits-calendar__year-dropdown');
				I?.addEventListener('click', (K) => {
					K.preventDefault(),
						K.stopPropagation(),
						m.setMonth(m.getMonth() - 1),
						q && (q.value = ze[m.getMonth()]),
						j && (j.value = String(m.getFullYear())),
						w();
				}),
					T?.addEventListener('click', (K) => {
						K.preventDefault(),
							K.stopPropagation(),
							m.setMonth(m.getMonth() + 1),
							q && (q.value = ze[m.getMonth()]),
							j && (j.value = String(m.getFullYear())),
							w();
					}),
					q?.addEventListener('click', (K) => {
						if ((K.preventDefault(), K.stopPropagation(), ee)) {
							const D = ee;
							if (D.style.display === 'block') D.style.display = 'none';
							else {
								Q && (Q.style.display = 'none');
								const de = ze.map((me, ie) => ({
									label: me,
									value: ie,
									selected: ie === m.getMonth(),
								}));
								D.innerHTML = '';
								const Y = st(de, (me) => {
									m.setMonth(me), (D.style.display = 'none'), q && (q.value = ze[me]), w();
								});
								D.appendChild(Y), (D.style.display = 'block');
							}
						}
					}),
					j?.addEventListener('click', (K) => {
						if ((K.preventDefault(), K.stopPropagation(), Q)) {
							const D = Q;
							if (D.style.display === 'block') D.style.display = 'none';
							else {
								ee && (ee.style.display = 'none');
								const de = m.getFullYear(),
									Y = Array.from({ length: 100 }, (ie, re) => {
										const V = de - 50 + re;
										return { label: String(V), value: V, selected: V === de };
									});
								D.innerHTML = '';
								const me = st(Y, (ie) => {
									m.setFullYear(ie), (D.style.display = 'none'), j && (j.value = String(ie)), w();
								});
								D.appendChild(me), (D.style.display = 'block');
							}
						}
					}),
					e
						.querySelectorAll(
							'.ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)',
						)
						.forEach((K) => {
							K.addEventListener('click', (D) => {
								D.preventDefault(), D.stopPropagation();
								const ce = K.dataset.date || '',
									[de, Y, me] = ce.split('/'),
									ie = new Date(parseInt(me), parseInt(Y) - 1, parseInt(de));
								c === 'single'
									? ((v = ie), w(), p && p(ie))
									: c === 'range' &&
										(!v || (v && h)
											? ((v = ie), (h = null), w())
											: v &&
												!h &&
												(Ue(ie, v) < 0 ? ((h = v), (v = ie)) : (h = ie),
												w(),
												o && v && h && o(v, h)));
							});
						});
			};
		return (
			w(),
			{
				element: e,
				update: (I) => {
					I.selectedDate !== void 0 && (v = I.selectedDate ? new Date(I.selectedDate) : null),
						I.endDate !== void 0 && (h = I.endDate ? new Date(I.endDate) : null),
						I.initialDate && (m = new Date(I.initialDate)),
						Object.assign(t, I),
						w();
				},
				destroy: () => {
					const I = e.querySelector('.ubits-calendar__month-dropdown'),
						T = e.querySelector('.ubits-calendar__year-dropdown');
					if (I) {
						const q = I._scrollbarInstance;
						q && q.destroy && q.destroy();
					}
					if (T) {
						const q = T._scrollbarInstance;
						q && q.destroy && q.destroy();
					}
					e.parentElement && e.parentElement.removeChild(e);
				},
			}
		);
	}
	const Gt = Object.freeze(
			Object.defineProperty(
				{ __proto__: null, createCalendar: it, renderCalendar: Xe },
				Symbol.toStringTag,
				{ value: 'Module' },
			),
		),
		Kt = Object.freeze(
			Object.defineProperty(
				{ __proto__: null, createCalendar: it, renderCalendar: Xe },
				Symbol.toStringTag,
				{ value: 'Module' },
			),
		);
	(De.createDataTable = Ye),
		(De.renderDataTable = qe),
		Object.defineProperty(De, Symbol.toStringTag, { value: 'Module' });
});
