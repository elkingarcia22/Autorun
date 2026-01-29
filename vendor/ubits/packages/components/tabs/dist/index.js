function v(o, t = !1) {
	if (!o) return '';
	let s = o;
	s.startsWith('fa-') || (s = `fa-${s}`);
	const i = t ? 'fas' : 'far';
	if (s.startsWith('far ') || s.startsWith('fas ')) {
		const r = s.replace(/^(far|fas)\s+/, '');
		return `<i class="${i} ${r}"></i>`;
	}
	return `<i class="${i} ${s}"></i>`;
}
function m(o) {
	const { tabs: t, activeTabId: s, className: i = '' } = o;
	if (!t || t.length === 0) return '<div class="ubits-tabs"></div>';
	let r = s;
	if (!r) {
		const e = t.find((c) => c.active);
		r = e ? e.id : t[0].id;
	}
	const a = t
		.map((e) => {
			const c = e.id === r,
				d = c ? 'ubits-tab--active' : '',
				f = e.disabled ? 'ubits-tab--disabled' : '',
				n = ['ubits-tab', d, f].filter(Boolean).join(' '),
				u = e.icon ? v(e.icon, c) : '';
			return `
      <button 
        class="${n}" 
        data-tab-id="${e.id}"
        ${e.disabled ? 'disabled' : ''}
        ${e.url ? `data-url="${e.url}"` : ''}
        ${e.onClick ? 'data-has-click-handler="true"' : ''}
      >
        ${u}
        <span class="ubits-tab__label">${e.label}</span>
      </button>
    `;
		})
		.join('');
	return `
    <div class="${['ubits-tabs', i].filter(Boolean).join(' ')}">
      ${a}
    </div>
  `.trim();
}
function T(o, t) {
	o.querySelectorAll('.ubits-tab[data-listener-attached]').forEach((a) => {
		const l = a.cloneNode(!0);
		a.parentNode?.replaceChild(l, a);
	});
	const i = o.querySelectorAll('.ubits-tab:not(.ubits-tab--disabled)'),
		r = (a) => {
			const l = a.getAttribute('data-tab-id'),
				e = a.getAttribute('data-url');
			console.log('🔵 [Tabs] handleTabClick - Tab clickeado:', l),
				console.log('🔵 [Tabs] handleTabClick - URL:', e),
				console.log('🔵 [Tabs] handleTabClick - Elemento:', a),
				o.querySelectorAll('.ubits-tab').forEach((n) => {
					const u = n.getAttribute('data-tab-id');
					console.log('🔵 [Tabs] Removiendo active de tab:', u),
						n.classList.remove('ubits-tab--active'),
						console.log('🔵 [Tabs] Clases después de remover active:', n.className);
					const b = n.querySelector('i');
					if (b) {
						console.log('🔵 [Tabs] Icono antes de actualizar:', b.className);
						const g = b.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
						console.log('🔵 [Tabs] Nombre del icono extraído:', g),
							g
								? ((b.className = `far fa-${g}`),
									console.log('🔵 [Tabs] Icono después de actualizar a regular:', b.className))
								: console.warn('⚠️ [Tabs] No se pudo extraer el nombre del icono');
					} else console.warn('⚠️ [Tabs] No se encontró elemento <i> en el tab:', u);
				}),
				console.log('🔵 [Tabs] Agregando active a tab:', l),
				a.classList.add('ubits-tab--active'),
				console.log('🔵 [Tabs] Clases después de agregar active:', a.className);
			const c = a.querySelector('i');
			if (c) {
				console.log('🔵 [Tabs] Icono activo antes de actualizar:', c.className);
				const n = c.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
				console.log('🔵 [Tabs] Nombre del icono activo extraído:', n),
					n
						? ((c.className = `fas fa-${n}`),
							console.log('🔵 [Tabs] Icono activo después de actualizar a solid:', c.className))
						: console.warn('⚠️ [Tabs] No se pudo extraer el nombre del icono activo');
			} else console.warn('⚠️ [Tabs] No se encontró elemento <i> en el tab activo:', l);
			if (e) {
				window.location.href = e;
				return;
			}
			const d = t.tabs.find((n) => n.id === l);
			d && d.onClick && d.onClick(new MouseEvent('click')),
				t.onTabChange && t.onTabChange(l || '', a);
			const f = new CustomEvent('tabsTabClick', {
				detail: { tabId: l, tabElement: a },
			});
			document.dispatchEvent(f);
		};
	console.log('🔵 [Tabs] Agregando event listeners a', i.length, 'tabs'),
		i.forEach((a, l) => {
			const e = a.getAttribute('data-tab-id');
			console.log('🔵 [Tabs] Agregando listener a tab', l, '- ID:', e),
				a.setAttribute('data-listener-attached', 'true'),
				a.addEventListener('click', (c) => {
					console.log('🔵 [Tabs] Click detectado en tab:', e), c.preventDefault(), r(a);
				}),
				console.log('🔵 [Tabs] ✅ Listener agregado a tab:', e);
		}),
		console.log('🔵 [Tabs] ✅ Todos los listeners agregados correctamente');
}
function h(o, t) {
	const s = (t && document.getElementById(t)) || document.createElement('div');
	return (
		t && !s.id && (s.id = t),
		(s.innerHTML = m(o)),
		requestAnimationFrame(() => {
			const i = s.querySelector('.ubits-tabs');
			T(i || s, o);
		}),
		s
	);
}
export { h as createTabs, m as renderTabs };
