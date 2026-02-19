import {
  RuntimeDependencyError,
  getRuntimeRegistry,
} from './RuntimeDependencyRegistry';

interface WaitForOptions {
  timeout?: number;
  checkInterval?: number;
  failLoud?: boolean;
  useRegistry?: boolean;
}

export async function waitForDependencies(
  deps: string[],
  options: WaitForOptions = {}
): Promise<void> {
  const {
    timeout = 10000,
    checkInterval = 100,
    failLoud = true,
    useRegistry = true,
  } = options;

  if (deps.length === 0) {
    return;
  }

  console.log(
    `[waitForDependencies] Waiting for ${deps.length} dependencies...`
  );
  console.log(`[waitForDependencies] Dependencies: ${deps.join(', ')}`);
  console.log(
    `[waitForDependencies] Timeout: ${timeout}ms, Interval: ${checkInterval}ms`
  );

  if (useRegistry) {
    try {
      const registry = getRuntimeRegistry();
      const allRegistered = deps.every(
        (dep) => registry.get(dep) !== undefined
      );
      if (allRegistered) {
        console.log('[waitForDependencies] Using RuntimeRegistry...');
        await Promise.all(deps.map((dep) => registry.wait(dep, timeout)));
        console.log(
          '[waitForDependencies] ✅ All dependencies ready (via registry)'
        );
        return;
      }
    } catch (error) {
      console.warn(
        '[waitForDependencies] Registry not available, using polling'
      );
    }
  }

  const startTime = Date.now();
  const missingDeps = new Set(deps);

  while (missingDeps.size > 0) {
    for (const dep of Array.from(missingDeps)) {
      if (checkDependencyAvailable(dep)) {
        missingDeps.delete(dep);
        console.log(`[waitForDependencies] ✅ ${dep} available`);
      }
    }

    if (missingDeps.size === 0) {
      const elapsed = Date.now() - startTime;
      console.log(
        `[waitForDependencies] ✅ All dependencies ready (${elapsed}ms)`
      );
      return;
    }

    const elapsed = Date.now() - startTime;
    if (elapsed > timeout) {
      const missing = Array.from(missingDeps);
      if (failLoud) {
        throw new RuntimeDependencyError(
          `Timeout waiting for dependencies (${timeout}ms):
${missing.map((d) => `  - ${d}`).join('\n')}`,
          {
            missingDependencies: missing,
            timeout,
            elapsed,
            serviceDiagnostic: generateDiagnostic(missing),
          }
        );
      } else {
        console.warn(
          `[waitForDependencies] ⚠️ Timeout waiting for: ${missing.join(', ')} (${elapsed}ms)`
        );
        return;
      }
    }

    await sleep(checkInterval);
  }
}

export function checkDependencyAvailable(path: string): boolean {
  try {
    const value = evalPath(path);
    return value !== undefined && value !== null;
  } catch {
    return false;
  }
}

function evalPath(path: string): any {
  try {
    if (path.startsWith('window.')) {
      path = path.substring(7);
    }
    const parts = path.split('.');
    let current = window as any;
    for (const part of parts) {
      if (current === undefined || current === null) {
        return undefined;
      }
      current = current[part];
    }
    return current;
  } catch {
    return undefined;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateDiagnostic(missingDeps: string[]) {
  const suggestions: string[] = [];
  for (const dep of missingDeps) {
    if (dep.includes('createModal')) {
      suggestions.push(`• ${dep}: Load modal.umd.js from Storybook`);
    } else if (dep.includes('createTabs') || dep.includes('Tabs')) {
      suggestions.push(`• ${dep}: Load tabs.umd.js from Storybook`);
    } else if (dep.includes('createDataTable') || dep.includes('DataTable')) {
      suggestions.push(`• ${dep}: Load data-table.umd.js from Storybook`);
    } else if (dep.includes('Card')) {
      suggestions.push(`• ${dep}: Load card.umd.js from Storybook`);
    } else {
      suggestions.push(`• ${dep}: Check if UMD bundle is loaded`);
    }
  }
  return suggestions.join('\n');
}

export async function waitForDependency(dep: string, timeout?: number) {
  return waitForDependencies([dep], { timeout });
}
