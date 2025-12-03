(function (r, b) {
	typeof exports == 'object' && typeof module < 'u'
		? b(exports)
		: typeof define == 'function' && define.amd
			? define(['exports'], b)
			: ((r = typeof globalThis < 'u' ? globalThis : r || self), b((r.UBITSBadge = {})));
})(this, function (r) {
	'use strict';
	function b(B = {}) {
		const {
				content: l,
				size: n = 'md',
				type: $,
				variant: m = 'primary',
				style: e,
				absolute: v = !1,
				position: L = 'top-right',
				className: C = '',
				label: h,
				showLabel: y = !1,
				labelTypography: S = 'ubits-body-md-regular',
			} = B,
			s = $ || (l != null && l !== '' ? 'number' : 'dot'),
			T = [
				'ubits-badge',
				n !== 'md' ? `ubits-badge--${n}` : '',
				s === 'dot' ? 'ubits-badge--dot' : '',
				s === 'number' ? 'ubits-badge--number' : '',
				`ubits-badge--${m}`,
				e ? `ubits-badge--${e}` : '',
				v ? 'ubits-badge--absolute' : '',
				v && L ? `ubits-badge--absolute-${L}` : '',
				C,
			]
				.filter(Boolean)
				.join(' '),
			t = s === 'number' && l !== void 0 && l !== null ? String(l) : '',
			_ = e && ['light', 'neutral', 'bold'].includes(e);
		console.log('🔵 BadgeProvider - renderBadge INICIO - TODOS LOS PARÁMETROS:', {
			options: B,
			content: l,
			contentType: typeof l,
			contentValue: l,
			size: n,
			type: $,
			typeReceived: $,
			variant: m,
			style: e,
			styleReceived: e,
			absolute: v,
			position: L,
			className: C,
			label: h,
			showLabel: y,
			labelTypography: S,
			badgeType: s,
			badgeContent: t,
			badgeContentType: typeof t,
			badgeContentValue: t,
			needsDot: _,
			isBold: e === 'bold',
			isLight: e === 'light',
			isNeutral: e === 'neutral',
		});
		let o = '';
		if (_) {
			const a = {
					primary: '#0c5bef',
					secondary: '#5c646f',
					success: '#13BD74',
					warning: '#F6AD55',
					error: '#E53E3E',
					info: '#3182CE',
				},
				g = String(m || 'primary')
					.toLowerCase()
					.trim(),
				u = a[g] || a.primary;
			console.log('🔵 BadgeProvider - Dot color calculation:', {
				originalVariant: m,
				normalizedVariant: g,
				dotColor: u,
				availableVariants: Object.keys(a),
				variantExists: g in a,
			});
			const d = e === 'bold' ? u : '#ffffff',
				x = e === 'bold' ? '#ffffff' : u;
			if (
				(console.log('🔵 BadgeProvider - Dot color calculation (needsDot=true):', {
					style: e,
					variant: m,
					dotColor: u,
					dotBgColor: x,
					textColor: d,
					badgeType: s,
					isBold: e === 'bold',
				}),
				s === 'number' && t)
			) {
				const i = n === 'xs' ? '18px' : n === 'sm' ? '20px' : n === 'md' ? '22px' : '24px';
				if (e === 'bold') {
					console.log('🔵 BadgeProvider - BOLD NUMBER - INICIO:', {
						style: e,
						badgeType: s,
						badgeContent: t,
						size: n,
						dotColor: u,
						contentType: typeof t,
						contentValue: t,
						contentString: String(t),
						isEmpty: !t || t.toString().trim() === '',
					});
					const c = `<span class="ubits-badge__dot ubits-badge__dot--number" style="width: ${i}; height: ${i}; min-width: ${i}; background-color: #ffffff; border-radius: 50%; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; margin-right: 0; color: #ffffff; font-size: ${n === 'xs' ? '10px' : n === 'sm' ? '11px' : n === 'md' ? '12px' : '13px'}; font-weight: 600; line-height: ${i}; padding: 0; margin: 0;">${t}</span>`;
					(o = c),
						console.log('🔵 BadgeProvider - BOLD NUMBER - DETALLES:', {
							badgeContent: t,
							badgeContentType: typeof t,
							badgeContentString: String(t),
							numberDotSize: i,
							dotHtml: c,
							badgeInnerContent: o,
							badgeInnerContentLength: o.length,
							containsNumber: o.includes(String(t)),
							containsDot: o.includes('ubits-badge__dot'),
							finalHTML: o,
						});
				} else
					o = `<span class="ubits-badge__dot ubits-badge__dot--number" style="width: ${i}; height: ${i}; min-width: ${i}; background-color: ${x}; border-radius: 50%; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; margin-right: 0; color: ${d}; font-size: ${n === 'xs' ? '10px' : n === 'sm' ? '11px' : n === 'md' ? '12px' : '13px'}; font-weight: 600; line-height: ${i}; padding: 0; margin: 0;">${t}</span>`;
				console.log('🔵 BadgeProvider - badgeInnerContent (number):', o);
			} else {
				const i = n === 'xs' ? '6px' : n === 'sm' ? '7px' : n === 'md' ? '8px' : '10px',
					p = e === 'bold' ? '#ffffff' : x;
				console.log('🔵 BadgeProvider - Dot HTML generation:', {
					style: e,
					dotBgColor: x,
					finalDotBgColor: p,
					dotSize: i,
					isBold: e === 'bold',
					willBeWhite: p === '#ffffff',
				});
				const c = e === 'bold' ? '#ffffff' : p;
				(o = `<span class="ubits-badge__dot" style="width: ${i}; height: ${i}; background-color: ${c}; background: ${c}; border-radius: 50%; flex-shrink: 0; display: inline-block; margin-right: 0;"></span>`),
					console.log('🔵 BadgeProvider - badgeInnerContent (dot):', o),
					console.log('🔵 BadgeProvider - Dot final color:', {
						style: e,
						finalColor: c,
						finalDotBgColor: p,
						isBold: e === 'bold',
					});
			}
		} else o = s === 'dot' ? '' : t;
		const f = `<span class="${T}">${o}</span>`;
		if (
			(console.log('🔵 BadgeProvider - HTML FINAL - ANTES DEL WRAPPER:', {
				style: e,
				badgeType: s,
				badgeHtml: f,
				badgeHtmlLength: f.length,
				badgeInnerContent: o,
				badgeInnerContentLength: o.length,
				classes: T,
				showLabel: y,
				label: h,
				willUseWrapper: e && ['light', 'neutral', 'bold'].includes(e),
			}),
			e && ['light', 'neutral', 'bold'].includes(e))
		) {
			if (y) {
				const g = h || t || '';
				if (g) {
					const d = `<div class="ubits-badge-wrapper">
          ${f}
          <span class="${S}" ${e === 'bold' ? 'style="color: var(--ubits-fg-on-accent, #ffffff) !important;"' : ''}>${g}</span>
        </div>`;
					return (
						console.log('🔵 BadgeProvider - HTML FINAL - CON LABEL:', {
							style: e,
							badgeType: s,
							finalHtml: d,
							finalHtmlLength: d.length,
							containsNumber: d.includes(String(t || '')),
							containsDot: d.includes('ubits-badge__dot'),
							containsNumberText: d.includes('ubits-badge__number-text'),
							labelText: g,
						}),
						d
					);
				}
			}
			const a = `<div class="ubits-badge-wrapper">
      ${f}
    </div>`;
			return (
				console.log('🔵 BadgeProvider - HTML FINAL - SIN LABEL:', {
					style: e,
					badgeType: s,
					finalHtml: a,
					finalHtmlLength: a.length,
					containsNumber: a.includes(String(t || '')),
					containsDot: a.includes('ubits-badge__dot'),
					containsNumberText: a.includes('ubits-badge__number-text'),
					badgeContent: t,
				}),
				a
			);
		}
		return h && y
			? `<div class="ubits-badge-wrapper">
      ${f}
      <span class="${S}">${h}</span>
    </div>`
			: f;
	}
	function D() {
		return '<span class="ubits-button__badge"></span>';
	}
	function H(B = {}) {
		const l = document.createElement('div');
		return (l.innerHTML = b(B)), l.querySelector('.ubits-badge');
	}
	(r.createBadge = H),
		(r.renderBadge = b),
		(r.renderButtonBadge = D),
		Object.defineProperty(r, Symbol.toStringTag, { value: 'Module' });
});
