type AnyFn = (...args: any[]) => any;

function get(obj: any, path: string): any {
  return path.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}

declare global {
  interface Window {
    UBITS?: {
      Sidebar?: { createSidebar?: Function; renderSidebar?: Function };
      SubNav?: { createSubNav?: Function; renderSubNav?: Function; updateActiveSubNavTab?: Function };
      TabBar?: { createTabBar?: Function; renderTabBar?: Function };
      Accordion?: any;
    };
    createSidebar?: Function;
    createSubNav?: Function;
    createTabBar?: Function;
  }
}

function resolveFactory(globalName: string): AnyFn | null {
  const w = window as any;

  if (typeof w[globalName] === 'function' && !(w[globalName] as any).__isStub) {
    return w[globalName];
  }

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
    createSubNav: [
      'UBITS.SubNav.createSubNav',
      'UBITS.SubNav.create',
    ],
  };

  for (const p of map[globalName] || []) {
    const fn = get(w, p);
    if (typeof fn === 'function') return fn;
  }

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

function waitForUbitsReady(timeoutMs = 15000): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const t = setTimeout(() => resolve(false), timeoutMs);
    window.addEventListener('ubits:ready', () => {
      clearTimeout(t);
      resolve(true);
    }, { once: true });
  });
}

function makeStub(globalName: string, debug = false): AnyFn {
  const stub = (...args: any[]) => {
    // 1. Synchronous attempt
    const fn = resolveFactory(globalName);
    if (fn) {
      if (debug) console.log(`[Autorun] Bridge -> ${globalName} (sync)`, { args });
      return fn(...args);
    }

    // 2. Deferred Event Handshake attempt
    if (debug) console.log(`[Autorun] Bridge -> ${globalName} missing! Waiting for 'ubits:ready' handshake...`);

    waitForUbitsReady(15000).then((isReady) => {
      if (isReady) {
        const deferredFn = resolveFactory(globalName);
        if (deferredFn) {
          if (debug) console.log(`[Autorun] Bridge -> ${globalName} resolved after handshake!`);
          return deferredFn(...args);
        } else {
          console.warn(`[Autorun] WARN: 'ubits:ready' fired, but generic missing factory '${globalName}'.`);
        }
      } else {
        console.warn(`[Autorun] WARN: Timeout waiting for template global '${globalName}' after deferring.`);
      }
    });

    // Return undefined synchronously, legacy loaders usually don't depend on the return value for UI injection
    return undefined;
  };
  (stub as any).__isStub = true;
  return stub;
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

  if (typeof w.createSubNav !== 'function') {
    w.createSubNav = makeStub('createSubNav', debug);
    if (debug) console.log('[Autorun] Stubbed createSubNav');
  }

  if (debug) {
    console.log('[Autorun] TemplateGlobalsBridge ready', {
      createSidebar: typeof w.createSidebar,
      createTabBar: typeof w.createTabBar,
      createSubNav: typeof w.createSubNav,
    });
  }
}
