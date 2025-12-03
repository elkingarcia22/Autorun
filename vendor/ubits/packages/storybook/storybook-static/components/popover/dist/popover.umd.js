(function (p, l) {
	typeof exports == 'object' && typeof module < 'u'
		? l(exports)
		: typeof define == 'function' && define.amd
			? define(['exports'], l)
			: ((p = typeof globalThis < 'u' ? globalThis : p || self), l((p.UBITSPopover = {})));
})(this, function (p) {
	'use strict';
	const l = { sm: '240px', md: '360px', lg: '400px', xl: '480px' };
	function x(s) {
		const {
				title: c,
				bodyContent: d = '',
				width: v = 'md',
				tailPosition: f = 'top',
				tailOffset: e = 0,
				footerButtons: n,
				className: u = '',
			} = s,
			b = l[v] || l.md,
			t = `ubits-popover--width-${v}`,
			y = `ubits-popover--tail-${f}`,
			m = ['ubits-popover', t, y, u].filter(Boolean).join(' '),
			$ = `
    <div class="ubits-popover__tail" style="${f === 'top' || f === 'bottom' ? `left: ${e ? `calc(50% + ${e}px)` : '50%'};` : `top: ${e ? `calc(50% + ${e}px)` : '50%'};`}">
      <div class="ubits-popover__tail-inner"></div>
    </div>
  `,
			g = c
				? `
    <div class="ubits-popover__header">
      <div class="ubits-popover__header-title">
        <p class="ubits-body-md-semibold">${c}</p>
      </div>
    </div>
  `
				: '',
			o = `
    <div class="ubits-popover__body">
      <div class="ubits-popover__body-content">
        ${typeof d == 'function' ? d() : d || '<div class="ubits-popover__placeholder">Contenido del popover</div>'}
      </div>
      <div class="ubits-popover__scrollbar">
        <div class="ubits-popover__scrollbar-bar"></div>
      </div>
    </div>
  `,
			i = n
				? `
    <div class="ubits-popover__footer">
      <div class="ubits-popover__footer-actions${n.tertiary ? '' : ' ubits-popover__footer-actions--no-tertiary'}">
        ${
					n.tertiary
						? `
        <div class="ubits-popover__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${n.tertiary.label}</span>
          </button>
        </div>
        `
						: ''
				}
        <div class="ubits-popover__footer-right">
          ${
						n.secondary
							? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${n.secondary.label}</span>
          </button>
          `
							: ''
					}
          ${
						n.primary
							? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-popover__footer-button" type="button">
            <span>${n.primary.label}</span>
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
    <div class="${m}" style="width: ${b};">
      ${$}
      <div class="ubits-popover__content">
        ${g}
        ${o}
        ${i}
      </div>
    </div>
  `.trim();
	}
	function P(s) {
		const {
			containerId: c,
			onClose: d,
			closeOnOutsideClick: v = !0,
			open: f = !1,
			position: e,
			referenceElement: n,
		} = s;
		let u;
		c ? (u = document.getElementById(c) || document.body) : (u = document.body);
		const b = document.createElement('div');
		b.innerHTML = x(s);
		const t = b.firstElementChild;
		if (!t) throw new Error('No se pudo crear el popover');
		if (e) {
			t.style.position = 'fixed';
			const o = s.tailPosition || 'top';
			o === 'top' || o === 'bottom'
				? (e.left !== void 0 &&
						((t.style.left = `${e.left}px`), (t.style.transform = 'translateX(-50%)')),
					e.top !== void 0 && (t.style.top = `${e.top}px`))
				: o === 'left'
					? (e.top !== void 0 &&
							((t.style.top = `${e.top}px`), (t.style.transform = 'translateY(-50%)')),
						e.left !== void 0 && (t.style.left = `${e.left}px`))
					: o === 'right' &&
						(e.top !== void 0 &&
							((t.style.top = `${e.top}px`), (t.style.transform = 'translateY(-50%)')),
						e.left !== void 0 && (t.style.left = `${e.left}px`));
		}
		const y = () => {
				if ((t.classList.add('ubits-popover--open'), e)) {
					t.style.position = 'fixed';
					const o = s.tailPosition || 'top';
					o === 'top' || o === 'bottom'
						? (e.left !== void 0 &&
								((t.style.left = `${e.left}px`), (t.style.transform = 'translateX(-50%)')),
							e.top !== void 0 && (t.style.top = `${e.top}px`))
						: o === 'left'
							? (e.top !== void 0 &&
									((t.style.top = `${e.top}px`), (t.style.transform = 'translateY(-50%)')),
								e.left !== void 0 && (t.style.left = `${e.left}px`))
							: o === 'right' &&
								(e.top !== void 0 &&
									((t.style.top = `${e.top}px`), (t.style.transform = 'translateY(-50%)')),
								e.left !== void 0 && (t.style.left = `${e.left}px`));
				} else if (n) {
					const o = n.getBoundingClientRect(),
						i = t.getBoundingClientRect();
					(t.style.position = 'fixed'),
						(t.style.top = `${o.bottom + 8}px`),
						(t.style.left = `${o.left + o.width / 2 - i.width / 2}px`);
				}
			},
			m = () => {
				t.classList.remove('ubits-popover--open'), d && d();
			},
			$ = (o) => {
				const i = t.querySelector('.ubits-popover__body-content');
				if (i) {
					const a = typeof o == 'function' ? o() : o;
					i.innerHTML = a;
				}
			},
			g = (o) => {
				const i = s.tailPosition || 'top';
				o.top !== void 0 && (t.style.top = `${o.top}px`),
					o.left !== void 0 && (t.style.left = `${o.left}px`),
					o.right !== void 0 && (t.style.right = `${o.right}px`),
					o.bottom !== void 0 && (t.style.bottom = `${o.bottom}px`),
					i === 'top' || i === 'bottom'
						? o.left !== void 0 && (t.style.transform = 'translateX(-50%)')
						: (i === 'left' || i === 'right') &&
							o.top !== void 0 &&
							(t.style.transform = 'translateY(-50%)');
			};
		let _ = () => {
			t.parentElement && t.parentElement.removeChild(t);
		};
		if (v) {
			const o = (a) => {
				const r = a.target;
				if (t.classList.contains('ubits-popover--open') && !t.contains(r)) {
					const h = r;
					(h.closest && h.closest('[data-popover-trigger]')) || m();
				}
			};
			document.addEventListener('click', o, !0);
			const i = _;
			_ = () => {
				document.removeEventListener('click', o, !0), i();
			};
		}
		if (s.footerButtons) {
			const o = t.querySelector('.ubits-popover__footer-left .ubits-popover__footer-button'),
				i = t.querySelector('.ubits-popover__footer-right .ubits-button--secondary'),
				a = t.querySelector('.ubits-popover__footer-right .ubits-button--primary');
			o &&
				s.footerButtons.tertiary?.onClick &&
				o.addEventListener('click', (r) => {
					r.preventDefault(), r.stopPropagation(), s.footerButtons.tertiary.onClick(r);
				}),
				i &&
					s.footerButtons.secondary?.onClick &&
					i.addEventListener('click', (r) => {
						r.preventDefault(), r.stopPropagation(), s.footerButtons.secondary.onClick(r);
					}),
				a &&
					s.footerButtons.primary?.onClick &&
					a.addEventListener('click', (r) => {
						r.preventDefault(), r.stopPropagation(), s.footerButtons.primary.onClick(r);
					});
		}
		return (
			u.appendChild(t),
			f && y(),
			{ element: t, open: y, close: m, updateContent: $, updatePosition: g, destroy: _ }
		);
	}
	typeof window < 'u' &&
		((window.createPopover = createPopover),
		(window.renderPopover = renderPopover),
		window.UBITSPopover || (window.UBITSPopover = {}),
		(window.UBITSPopover.createPopover = createPopover),
		(window.UBITSPopover.renderPopover = renderPopover)),
		(p.createPopover = P),
		(p.renderPopover = x),
		Object.defineProperty(p, Symbol.toStringTag, { value: 'Module' });
});
