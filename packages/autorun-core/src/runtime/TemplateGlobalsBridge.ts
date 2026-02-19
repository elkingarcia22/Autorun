type AnyFn = (...args: any[]) => any;

function get(obj: any, path: string): any {
  return path.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}

function resolveFactory(globalName: string): AnyFn | null {
  const w = window as any;

  // Direct (in case something already exposed it later)
  if (typeof w[globalName] === 'function') return w[globalName];

  // Known mappings
  const map: Record<string, string[]> = {
    createSidebar: [
      'UBITS.Sidebar.createSidebar',
      'UBITS.Sidebar.create',
      'UBITS.LayoutSidebar.createSidebar',
      'UBITS.LayoutSidebar.create',
      'UBITS.SidebarProvider.createSidebar',
    ],
    createTabBar: [
      'UBITS.TabBar.createTabBar',
      'UBITS.TabBar.create',
      'UBITS.Tabs.createTabBar',
      'UBITS.Tabs.create',
      'UBITS.TabBarProvider.createTabBar',
    ],
  };

  for (const p of map[globalName] || []) {
    const fn = get(w, p);
    if (typeof fn === 'function') return fn;
  }

  // Fallback scan over UBITS modules (small)
  const ubits = w.UBITS;
  if (ubits && typeof ubits === 'object') {
    for (const mod of Object.values(ubits)) {
      if (mod && typeof (mod as any)[globalName] === 'function') {
        return (mod as any)[globalName];
      }
    }
  }

  return null;
}

function makeStub(globalName: string, debug = false): AnyFn {
  return (...args: any[]) => {
    const fn = resolveFactory(globalName);
    if (!fn) {
      throw new Error(
        `[Autorun] Missing template global '${globalName}'. Bridge active but no matching UBITS factory found.`
      );
    }
    if (debug) console.log(`[Autorun] Bridge -> ${globalName}`, { args });
    return fn(...args);
  };
}

export function initTemplateGlobalsBridge(opts?: { debug?: boolean }) {
  const w = window as any;
  const debug = !!opts?.debug;

  if (typeof w.createSidebar !== 'function') {
    w.createSidebar = makeStub('createSidebar', debug);
    if (debug) console.log('[Autorun] Stubbed createSidebar');
  }

  if (typeof w.createTabBar !== 'function') {
    w.createTabBar = makeStub('createTabBar', debug);
    if (debug) console.log('[Autorun] Stubbed createTabBar');
  }

  if (debug) {
    console.log('[Autorun] TemplateGlobalsBridge ready', {
      createSidebar: typeof w.createSidebar,
      createTabBar: typeof w.createTabBar,
    });
  }
}
