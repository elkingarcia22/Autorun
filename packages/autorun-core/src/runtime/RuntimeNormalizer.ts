export class RuntimeNormalizer {
  /**
   * Check if a key name suggests it contains a URL
   *
   * @param key - Property key to check
   * @returns True if key suggests URL content
   */
  isUrlLikeKey(key: string): boolean {
    if (!key) return false;
    const k = String(key).toLowerCase();
    return (
      k.includes('url') ||
      k.includes('href') ||
      k.includes('src') ||
      k.includes('logo') ||
      k.includes('image') ||
      k.includes('avatar') ||
      k.includes('icon') ||
      k.includes('background') ||
      k.includes('poster') ||
      k.includes('thumbnail')
    );
  }

  /**
   * Sanitize a URL value
   *
   * Removes dangerous or invalid values:
   * - Empty strings
   * - "undefined" or "null" strings
   * - javascript: URLs (XSS)
   *
   * @param value - URL value to sanitize
   * @returns Sanitized URL or null if invalid
   */
  sanitizeUrlValue(value: any): string | null {
    if (value == null) return null;
    if (typeof value !== 'string') return value;
    const s = value.trim();
    if (s === '' || s === 'undefined' || s === 'null') {
      return null;
    }
    if (/^javascript:/i.test(s)) {
      console.warn('[RuntimeNormalizer] Blocked javascript: URL (XSS attempt)');
      return null;
    }
    if (/^data:text\/html/i.test(s)) {
      console.warn('[RuntimeNormalizer] Blocked suspicious data: URL');
      return null;
    }
    return s;
  }

  /**
   * Resolve asset URL to absolute path
   *
   * Converts relative paths to absolute URLs using document.baseURI.
   * Leaves absolute URLs (http://, https://, file://, data:) unchanged.
   *
   * @param value - URL to resolve
   * @returns Absolute URL or original value if already absolute
   *
   * @example
   * ```typescript
   * normalizer.resolveAssetUrl('../../assets/logo.png')
   * // → "file:///Users/project/assets/logo.png"
   *
   * normalizer.resolveAssetUrl('https://example.com/logo.png')
   * // → "https://example.com/logo.png" (unchanged)
   * ```
   */
  resolveAssetUrl(value: any): any {
    if (value == null) return null;
    if (typeof value !== 'string') return value;
    const s = value.trim();
    if (s === '' || s === 'undefined' || s === 'null') {
      return null;
    }
    if (/^(https?:|file:|data:)/i.test(s)) {
      return s;
    }
    try {
      const baseURI =
        typeof document !== 'undefined'
          ? document.baseURI
          : typeof window !== 'undefined' && window.location
            ? window.location.href
            : 'file:///';
      return new URL(s, baseURI).toString();
    } catch (error) {
      console.warn('[RuntimeNormalizer] Failed to resolve URL:', s, error);
      return s;
    }
  }

  /**
   * Sanitize URLs deep in an object/array structure
   *
   * Recursively traverses objects and arrays, sanitizing and resolving
   * any URL-like values found in properties with URL-like names.
   *
   * @param obj - Object to sanitize
   * @returns Sanitized copy of object
   */
  sanitizeUrlsDeep(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeUrlsDeep(item));
    }
    if (obj && typeof obj === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (this.isUrlLikeKey(key)) {
          const sanitized = this.sanitizeUrlValue(value);
          result[key] = this.resolveAssetUrl(sanitized);
        } else {
          result[key] = this.sanitizeUrlsDeep(value);
        }
      }
      return result;
    }
    return obj;
  }

  /**
   * Validate that all URLs in props are accessible
   *
   * Useful for preflight checks to warn about potentially broken assets.
   *
   * @param props - Props to validate
   * @returns Array of warnings for potentially broken URLs
   */
  validateUrls(props: any): string[] {
    const warnings: string[] = [];
    const check = (obj: any, path = '') => {
      if (Array.isArray(obj)) {
        obj.forEach((item, i) => check(item, `${path}[${i}]`));
      } else if (obj && typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj)) {
          const fullPath = path ? `${path}.${key}` : key;
          if (this.isUrlLikeKey(key) && typeof value === 'string') {
            if (value === null || value === 'undefined' || value === '') {
              warnings.push(`Empty URL at ${fullPath}`);
            }
          } else {
            check(value, fullPath);
          }
        }
      }
    };
    check(props);
    return warnings;
  }
}

let globalNormalizer: RuntimeNormalizer | null = null;
export function getRuntimeNormalizer(): RuntimeNormalizer {
  if (!globalNormalizer) {
    globalNormalizer = new RuntimeNormalizer();
  }
  return globalNormalizer;
}
