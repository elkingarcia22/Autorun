/**
 * CanvasCreator
 *
 * Crea archivos de lienzo/template para prototipar
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as https from 'https';
import { URL } from 'url';
import { UBITS_PRESET, UBITS_MODULES_CONFIG } from './UBITSPreset';

export class CanvasCreator {
  private projectPath: string;

  constructor(projectPath: string = process.cwd()) {
    this.projectPath = projectPath;
  }

  /**
   * Crea un lienzo/template nuevo usando template básico (sin ContentManager)
   * Ideal para backend - frontend listo para usar
   */
  async create(
    template: 'administrador' | 'colaborador',
    module: string,
    product?: string,
    disableOtherModulesNavigation?: boolean
  ): Promise<string> {
    const templateConfig = UBITS_PRESET.templates[template];
    const fileName = this.generateFileName(template, module, product);
    const filePath = path.join(this.projectPath, 'prototypes', fileName);

    // Crear directorio si no existe
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // ⭐ NUEVO: Generar template básico (sin ContentManager)
    const content = await this.createBasicTemplate(template, module, product);

    // Escribir archivo
    await fs.writeFile(filePath, content, 'utf-8');

    console.log(`✅ Lienzo básico creado: ${filePath}`);
    console.log(
      `   📝 Template simplificado sin ContentManager (listo para backend)`
    );

    return filePath;
  }

  /**
   * Carga el template completo desde la carpeta UBITS local en el escritorio
   * Copia el template tal cual y solo ajusta las rutas para que funcionen
   */
  private async loadTemplateFromStorybook(
    template: 'administrador' | 'colaborador',
    module: string,
    product?: string,
    disableOtherModulesNavigation?: boolean
  ): Promise<string> {
    const templateConfig = UBITS_PRESET.templates[template];
    const templateFileName =
      template === 'administrador'
        ? 'template-admin.html'
        : 'template-colaborador.html';

    // PRIORIDAD 1: Intentar cargar desde Vercel Storybook
    try {
      // Usar URL con query parameters directamente (más confiable)
      const templateUrl =
        UBITS_PRESET.storybook.getUrl?.(`/templates/${templateFileName}`) ||
        `${UBITS_PRESET.storybook.url}/templates/${templateFileName}`;

      console.log(
        `   📄 Intentando cargar template desde Vercel: ${templateUrl.replace(/\?.*/, '?***')}`
      );

      // Usar fetchFromVercel que usa https nativo (más confiable que fetch)
      let templateContent = await this.fetchFromVercel(templateUrl);
      console.log(
        `   ✅ Template cargado desde Vercel (${templateContent.length} bytes)`
      );

      // ⚠️ NUEVO: Usamos URLs directas de Vercel con bypass token en query string
      // Esto permite abrir el HTML directamente sin necesidad de servidor con proxy
      // El bypass token se pasa como query parameter, no como header
      const vercelBaseUrl = UBITS_PRESET.storybook.url;

      // Ajustar rutas del template a URLs directas de Vercel con bypass token
      templateContent = await this.adjustTemplatePaths(
        templateContent,
        vercelBaseUrl
      );

      // Agregar carga del UMD de data-table usando proxy
      templateContent = this.addDataTableUMD(templateContent, vercelBaseUrl);

      // Personalizar el template con el módulo y producto seleccionados
      // Para customizeTemplate, pasamos una ruta relativa vacía ya que todo usa proxy
      templateContent = this.customizeTemplate(
        templateContent,
        template,
        module,
        product,
        '../vendor/ubits/packages/', // Solo para compatibilidad, no se usa si todo es proxy
        disableOtherModulesNavigation
      );

      return templateContent;
    } catch (vercelError: any) {
      console.warn(
        `   ⚠️  No se pudo cargar desde Vercel: ${vercelError.message}`
      );
      console.log(`   📄 Intentando fallback a vendor/ubits/...`);
    }

    // PRIORIDAD 2: Fallback a vendor/ubits/ (portable)
    const vendorUbitsPath = path.join(
      this.projectPath,
      'vendor',
      'ubits',
      'packages',
      'templates',
      templateFileName
    );
    const vendorUbitsPackagesPath = path.join(
      this.projectPath,
      'vendor',
      'ubits',
      'packages'
    );

    try {
      await fs.access(vendorUbitsPath);

      console.log(
        `   📄 Cargando template desde vendor/ubits/ (portable): ${vendorUbitsPath}`
      );
      let templateContent = await fs.readFile(vendorUbitsPath, 'utf-8');

      // Usar rutas relativas desde prototypes/ hacia vendor/ubits/packages/
      const relativePath = '../vendor/ubits/packages/';

      // Validar que los archivos críticos existen
      await this.validateUBITSFiles(vendorUbitsPackagesPath);

      // Ajustar rutas del template a rutas relativas
      templateContent = await this.adjustTemplatePaths(
        templateContent,
        relativePath
      );

      // Agregar carga del UMD de data-table
      templateContent = this.addDataTableUMD(templateContent, relativePath);

      // Personalizar el template
      templateContent = this.customizeTemplate(
        templateContent,
        template,
        module,
        product,
        relativePath,
        disableOtherModulesNavigation
      );

      return templateContent;
    } catch (vendorError) {
      // PRIORIDAD 3: Fallback a Desktop/UBITS/ (legacy)
      const os = await import('os');
      const ubitsDesktopPath = path.join(
        os.homedir(),
        'Desktop',
        'UBITS',
        'packages',
        'templates',
        templateFileName
      );

      try {
        await fs.access(ubitsDesktopPath);

        console.log(
          `   📄 Cargando template desde Desktop/UBITS/ (legacy): ${ubitsDesktopPath}`
        );
        let templateContent = await fs.readFile(ubitsDesktopPath, 'utf-8');

        // Usar rutas absolutas file:// para compatibilidad legacy
        const ubitsPackagesPath = path.join(
          os.homedir(),
          'Desktop',
          'UBITS',
          'packages'
        );
        const absolutePath = `file://${ubitsPackagesPath}`.replace(/\\/g, '/');

        // Validar que los archivos críticos existen
        await this.validateUBITSFiles(ubitsPackagesPath);

        // Ajustar rutas del template a rutas absolutas file://
        templateContent = await this.adjustTemplatePaths(
          templateContent,
          absolutePath
        );

        // Agregar carga del UMD de data-table
        templateContent = this.addDataTableUMD(templateContent, absolutePath);

        // Personalizar el template
        templateContent = this.customizeTemplate(
          templateContent,
          template,
          module,
          product,
          absolutePath,
          disableOtherModulesNavigation
        );

        return templateContent;
      } catch (localError) {
        console.warn(
          '⚠️  No se pudo cargar template desde ninguna fuente:',
          localError
        );
        console.warn(
          `   💡 Verifica conexión a internet o que existe vendor/ubits/packages/`
        );
        // Fallback a template generado localmente
        return this.generateCanvasContent(
          template,
          module,
          templateConfig,
          product
        );
      }
    }
  }

  /**
   * Valida que los archivos críticos de UBITS existen
   */
  private async validateUBITSFiles(ubitsPackagesPath: string): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');

    const criticalFiles = [
      'tokens/dist/tokens.css',
      'templates/components-loader.js',
      'templates/config/products.js',
      'templates/config/theme-manager.js',
      'templates/engine/template-loader.js',
      'components/sidebar/src/styles/sidebar.css',
      'components/subnav/src/styles/subnav.css',
    ];

    const missingFiles: string[] = [];

    for (const file of criticalFiles) {
      const filePath = path.join(ubitsPackagesPath, file);
      try {
        await fs.access(filePath);
      } catch {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length > 0) {
      console.warn('   ⚠️  Archivos críticos de UBITS no encontrados:');
      missingFiles.forEach((file) => console.warn(`      - ${file}`));
      console.warn(
        '   💡 Asegúrate de que UBITS está en vendor/ubits/packages/ o Desktop/UBITS/packages/'
      );
    } else {
      console.log('   ✅ Todos los archivos críticos de UBITS encontrados');
    }
  }

  /**
   * Fetch desde Vercel usando https nativo de Node.js (más confiable que fetch)
   */
  private async fetchFromVercel(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {} as Record<string, string>,
      };

      // Agregar headers de bypass token
      if (UBITS_PRESET.storybook.bypassToken) {
        options.headers['x-vercel-set-bypass-cookie'] = 'true';
        options.headers['x-vercel-protection-bypass'] =
          UBITS_PRESET.storybook.bypassToken;
      }

      const req = https.request(options, (res) => {
        // Extraer cookie primero (puede venir en cualquier respuesta)
        const setCookie = res.headers['set-cookie'];
        let cookieHeader = '';
        if (setCookie) {
          const cookieString = Array.isArray(setCookie)
            ? setCookie.join('; ')
            : String(setCookie);
          const cookieMatch = cookieString.match(/_vercel_jwt=([^;]+)/);
          if (cookieMatch) {
            cookieHeader = `_vercel_jwt=${cookieMatch[1]}`;
          }
        }

        // Si hay redirect (307), seguir la nueva ubicación con la cookie
        if (
          res.statusCode === 307 ||
          res.statusCode === 302 ||
          res.statusCode === 301
        ) {
          const location = res.headers.location;
          if (location) {
            // Consumir la respuesta para evitar memory leak
            res.resume();
            const redirectUrl = location.startsWith('http')
              ? location
              : `https://${urlObj.hostname}${location}`;

            // Si tenemos cookie, hacer la siguiente request con ella
            if (cookieHeader) {
              const redirectUrlObj = new URL(redirectUrl);
              const redirectOptions = {
                hostname: redirectUrlObj.hostname,
                path: redirectUrlObj.pathname + redirectUrlObj.search,
                method: 'GET',
                headers: {
                  Cookie: cookieHeader,
                } as Record<string, string>,
              };

              const reqRedirect = https.request(
                redirectOptions,
                (resRedirect) => {
                  let dataRedirect = '';
                  resRedirect.on('data', (chunk) => {
                    dataRedirect += chunk;
                  });
                  resRedirect.on('end', () => {
                    if (resRedirect.statusCode === 200) {
                      resolve(dataRedirect);
                    } else {
                      reject(
                        new Error(
                          `HTTP ${resRedirect.statusCode}: ${resRedirect.statusMessage}`
                        )
                      );
                    }
                  });
                }
              );
              reqRedirect.on('error', reject);
              reqRedirect.setTimeout(10000, () => {
                reqRedirect.destroy();
                reject(new Error('Timeout al conectar con Vercel'));
              });
              reqRedirect.end();
              return;
            }

            // Si no hay cookie, intentar recursivamente
            return resolve(this.fetchFromVercel(redirectUrl));
          }
        }

        // Si no es OK y tenemos cookie, intentar con cookie
        if (res.statusCode !== 200) {
          if (cookieHeader) {
            // Consumir la respuesta actual
            res.resume();
            // Hacer nueva request con la cookie en la misma URL
            const optionsWithCookie = { ...options };
            optionsWithCookie.headers['Cookie'] = cookieHeader;
            const req2 = https.request(optionsWithCookie, (res2) => {
              let data2 = '';
              res2.on('data', (chunk) => {
                data2 += chunk;
              });
              res2.on('end', () => {
                if (res2.statusCode === 200) {
                  resolve(data2);
                } else if (res2.statusCode === 307 || res2.statusCode === 302) {
                  // Si aún hay redirect, seguir con cookie
                  const location2 = res2.headers.location;
                  if (location2) {
                    res2.resume();
                    const redirectUrl2 = location2.startsWith('http')
                      ? location2
                      : `https://${urlObj.hostname}${location2}`;
                    const redirectUrlObj2 = new URL(redirectUrl2);
                    const redirectOptions2 = {
                      hostname: redirectUrlObj2.hostname,
                      path: redirectUrlObj2.pathname + redirectUrlObj2.search,
                      method: 'GET',
                      headers: {
                        Cookie: cookieHeader,
                      } as Record<string, string>,
                    };
                    const reqRedirect2 = https.request(
                      redirectOptions2,
                      (resRedirect2) => {
                        let dataRedirect2 = '';
                        resRedirect2.on('data', (chunk) => {
                          dataRedirect2 += chunk;
                        });
                        resRedirect2.on('end', () => {
                          if (resRedirect2.statusCode === 200) {
                            resolve(dataRedirect2);
                          } else {
                            reject(
                              new Error(
                                `HTTP ${resRedirect2.statusCode}: ${resRedirect2.statusMessage}`
                              )
                            );
                          }
                        });
                      }
                    );
                    reqRedirect2.on('error', reject);
                    reqRedirect2.setTimeout(10000, () => {
                      reqRedirect2.destroy();
                      reject(new Error('Timeout al conectar con Vercel'));
                    });
                    reqRedirect2.end();
                    return;
                  }
                  reject(
                    new Error(`HTTP ${res2.statusCode}: Redirect sin location`)
                  );
                } else {
                  reject(
                    new Error(`HTTP ${res2.statusCode}: ${res2.statusMessage}`)
                  );
                }
              });
            });
            req2.on('error', reject);
            req2.setTimeout(10000, () => {
              req2.destroy();
              reject(new Error('Timeout al conectar con Vercel'));
            });
            req2.end();
            return;
          }
          // Consumir la respuesta antes de rechazar
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          return;
        }

        // Leer el contenido
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(data);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Timeout al conectar con Vercel'));
      });

      req.end();
    });
  }

  /**
   * Agrega la carga del UMD de data-table a los templates
   */
  private addDataTableUMD(content: string, basePath: string): string {
    // Detectar si es URL de Vercel
    const isVercelUrl =
      basePath.startsWith('https://') || basePath.startsWith('http://');

    // Construir URL del script de data-table
    let dataTableScript: string;
    if (isVercelUrl) {
      // Usar URL directa de Vercel con bypass token para data-table.umd.js
      const dataTableUrl =
        UBITS_PRESET.storybook.getUrl?.(
          '/components/data-table/dist/data-table.umd.js'
        ) ||
        `${basePath.replace(/\/$/, '')}/components/data-table/dist/data-table.umd.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
      dataTableScript = `<script src="${dataTableUrl}"></script>`;
    } else {
      dataTableScript = `<script src="${basePath}components/data-table/dist/data-table.umd.js"></script>`;
    }

    // Agregar después de components-loader.js
    if (content.includes('components-loader.js')) {
      // Buscar el script de components-loader.js (puede ser URL de Vercel o ruta local)
      content = content.replace(
        /(<script[^>]*src="[^"]*components-loader\.js"[^>]*><\/script>)/i,
        `$1\n    ${dataTableScript}`
      );
    } else {
      // Si no encuentra components-loader.js, agregar antes del cierre de </body>
      content = content.replace(/(<\/body>)/i, `    ${dataTableScript}\n$1`);
    }

    return content;
  }

  /**
   * Ajusta las rutas del template para que funcionen con rutas relativas, absolutas o URLs de Vercel
   * Las rutas originales son relativas a packages/templates/ (../tokens/...)
   * Las convertimos a:
   * - URLs de Vercel si basePathToUBITS es una URL (https://...)
   * - Rutas relativas desde prototypes/ hacia vendor/ubits/packages/ (../vendor/ubits/packages/...)
   * - Rutas absolutas file:// si es legacy (Desktop/UBITS/)
   */
  private async adjustTemplatePaths(
    content: string,
    basePathToUBITS: string
  ): Promise<string> {
    // Las rutas originales son: ../tokens/dist/tokens.css
    // Necesitamos:
    // - URL Vercel: https://ubits-storybook.vercel.app/tokens/dist/tokens.css
    // - Relativo: ../vendor/ubits/packages/tokens/dist/tokens.css
    // - Absoluto legacy: file:///Users/.../UBITS/packages/tokens/dist/tokens.css

    // Detectar si es URL de Vercel
    const isVercelUrl =
      basePathToUBITS.startsWith('https://') ||
      basePathToUBITS.startsWith('http://');

    // ⚠️ IMPORTANTE: Asegurar que la ruta termine con / para evitar problemas
    const basePath = basePathToUBITS.endsWith('/')
      ? basePathToUBITS
      : `${basePathToUBITS}/`;

    // 1. Reemplazar rutas relativas ../ por la ruta base (CSS y JS)
    // ⚠️ NUEVO: Si es URL de Vercel, usar URLs directas con bypass token (más simple, funciona sin servidor proxy)
    content = content.replace(
      /href="(\.\.\/)+([^"]+)"/g,
      (match, dots, path) => {
        // Si ya tiene vendor/ubits/packages/, file:// o https://, no reemplazar
        if (
          match.includes('vendor/ubits/packages/') ||
          match.includes('file://') ||
          match.includes('https://') ||
          match.includes('http://')
        ) {
          return match;
        }
        // Si es URL de Vercel, usar URL directa con bypass token (funciona sin servidor proxy)
        if (isVercelUrl) {
          // Usar URL directa de Vercel con bypass token en query string
          // Esto permite abrir el HTML directamente sin necesidad de servidor con proxy
          const vercelUrl =
            UBITS_PRESET.storybook.getUrl?.(`/${path}`) ||
            `${basePath.replace(/\/$/, '')}/${path}?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
          return `href="${vercelUrl}"`;
        }
        return `href="${basePath}${path}"`;
      }
    );
    content = content.replace(
      /src="(\.\.\/)+([^"]+)"/g,
      (match, dots, path) => {
        // Si ya tiene vendor/ubits/packages/, file:// o https://, no reemplazar
        if (
          match.includes('vendor/ubits/packages/') ||
          match.includes('file://') ||
          match.includes('https://') ||
          match.includes('http://')
        ) {
          return match;
        }
        // Si es URL de Vercel, usar URL directa con bypass token (funciona sin servidor proxy)
        if (isVercelUrl) {
          // Usar URL directa de Vercel con bypass token en query string
          // Esto permite abrir el HTML directamente sin necesidad de servidor con proxy
          const vercelUrl =
            UBITS_PRESET.storybook.getUrl?.(`/${path}`) ||
            `${basePath.replace(/\/$/, '')}/${path}?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
          return `src="${vercelUrl}"`;
        }
        return `src="${basePath}${path}"`;
      }
    );

    // 1.1. Agregar carga de figma-tokens.css después de tokens.css (necesario para tokens de modifiers)
    // Esto asegura que tokens como --modifiers-normal-color-dark-accent-blue estén disponibles
    // Extraer la ruta base del tokens.css ya procesado para evitar duplicación
    content = content.replace(
      /(<link rel="stylesheet" href="([^"]*tokens\/dist\/)tokens\.css[^"]*"[^>]*\/>)/,
      (match, fullMatch, tokensPath) => {
        // Si es URL directa de Vercel, usar URL directa también para figma-tokens
        if (tokensPath.includes('ubits-storybook10.vercel.app')) {
          const figmaTokensUrl =
            UBITS_PRESET.storybook.getUrl?.('/tokens/dist/figma-tokens.css') ||
            `${UBITS_PRESET.storybook.url}/tokens/dist/figma-tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
          return `${fullMatch}\n    <link rel="stylesheet" href="${figmaTokensUrl}" />`;
        }
        // Si es proxy de Vercel (legacy), usar proxy también para figma-tokens
        if (tokensPath.startsWith('/vercel-proxy/')) {
          return `${fullMatch}\n    <link rel="stylesheet" href="/vercel-proxy/tokens/dist/figma-tokens.css" />`;
        }
        // Usar la misma ruta base que ya tiene tokens.css
        return `${fullMatch}\n    <link rel="stylesheet" href="${tokensPath}figma-tokens.css" />`;
      }
    );

    // 2. Asegurar que URLs directas de Vercel tengan bypass token (para scripts y assets que ya vienen con URLs)
    if (isVercelUrl) {
      const vercelBaseUrl = basePath.replace(/\/$/, '');
      // Si ya tienen bypass token, no cambiar. Si no, agregarlo
      content = content.replace(
        new RegExp(
          `href="${vercelBaseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^"]+)"`,
          'g'
        ),
        (match, path) => {
          // Si ya tiene bypass token, no cambiar
          if (path.includes('x-vercel-protection-bypass')) {
            return match;
          }
          // Agregar bypass token si no lo tiene
          const separator = path.includes('?') ? '&' : '?';
          return `href="${vercelBaseUrl}${path}${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}"`;
        }
      );
      content = content.replace(
        new RegExp(
          `src="${vercelBaseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^"]+)"`,
          'g'
        ),
        (match, path) => {
          // Si ya tiene bypass token, no cambiar
          if (path.includes('x-vercel-protection-bypass')) {
            return match;
          }
          // Agregar bypass token si no lo tiene
          const separator = path.includes('?') ? '&' : '?';
          return `src="${vercelBaseUrl}${path}${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}"`;
        }
      );
    }

    // 3. Ajustar rutas de assets que son relativas al mismo directorio (templates/assets/)
    // assets/fontawesome/... -> URL directa de Vercel o ruta relativa/absoluta
    if (isVercelUrl) {
      // Usar URL directa de Vercel para assets con bypass token
      content = content.replace(
        /href="assets\/([^"]+)"/g,
        (match, assetPath) => {
          const vercelUrl =
            UBITS_PRESET.storybook.getUrl?.(`/templates/assets/${assetPath}`) ||
            `${basePath.replace(/\/$/, '')}/templates/assets/${assetPath}?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
          return `href="${vercelUrl}"`;
        }
      );
      content = content.replace(
        /src="assets\/([^"]+)"/g,
        (match, assetPath) => {
          const vercelUrl =
            UBITS_PRESET.storybook.getUrl?.(`/templates/assets/${assetPath}`) ||
            `${basePath.replace(/\/$/, '')}/templates/assets/${assetPath}?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
          return `src="${vercelUrl}"`;
        }
      );
    } else {
      content = content.replace(
        /href="assets\//g,
        `href="${basePath}templates/assets/`
      );
      content = content.replace(
        /src="assets\//g,
        `src="${basePath}templates/assets/`
      );
    }

    // 3. Ajustar rutas de imágenes en JavaScript (products.js)
    // 'assets/images/Profile-image.jpg' -> 'file:///Users/.../templates/assets/images/Profile-image.jpg'
    content = content.replace(
      /'assets\/images\//g,
      `'${basePath}templates/assets/images/`
    );
    content = content.replace(
      /"assets\/images\//g,
      `"${basePath}templates/assets/images/`
    );

    // 4. Ajustar rutas de scripts que son relativas al mismo directorio
    // components-loader.js -> URL directa de Vercel o ruta relativa/absoluta
    if (isVercelUrl) {
      // Usar URL directa de Vercel para scripts con bypass token
      content = content.replace(/src="components-loader\.js"/g, () => {
        const vercelUrl =
          UBITS_PRESET.storybook.getUrl?.('/templates/components-loader.js') ||
          `${basePath.replace(/\/$/, '')}/templates/components-loader.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
        return `src="${vercelUrl}"`;
      });
      content = content.replace(
        /src="config\/([^"]+)"/g,
        (match, configPath) => {
          const vercelUrl =
            UBITS_PRESET.storybook.getUrl?.(
              `/templates/config/${configPath}`
            ) ||
            `${basePath.replace(/\/$/, '')}/templates/config/${configPath}?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
          return `src="${vercelUrl}"`;
        }
      );
      content = content.replace(
        /src="engine\/([^"]+)"/g,
        (match, enginePath) => {
          const vercelUrl =
            UBITS_PRESET.storybook.getUrl?.(
              `/templates/engine/${enginePath}`
            ) ||
            `${basePath.replace(/\/$/, '')}/templates/engine/${enginePath}?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${UBITS_PRESET.storybook.bypassToken}`;
          return `src="${vercelUrl}"`;
        }
      );
    } else {
      content = content.replace(
        /src="components-loader\.js"/g,
        `src="${basePath}templates/components-loader.js"`
      );
      content = content.replace(
        /src="config\//g,
        `src="${basePath}templates/config/`
      );
      content = content.replace(
        /src="engine\//g,
        `src="${basePath}templates/engine/`
      );
    }

    // 5. Ajustar rutas en template strings de JavaScript (backticks)
    // `../tokens/...` -> `../vendor/ubits/packages/tokens/...`
    // Solo reemplazar si NO tiene ya vendor/ubits/packages/ o file://
    content = content.replace(/`(\.\.\/)+([^`]+)`/g, (match, dots, path) => {
      if (
        match.includes('vendor/ubits/packages/') ||
        match.includes('file://')
      ) {
        return match;
      }
      return `\`${basePath}${path}\``;
    });

    // 6. Ajustar rutas en strings de JavaScript (comillas simples y dobles)
    // '../tokens/...' -> '../vendor/ubits/packages/tokens/...'
    // Solo reemplazar si NO tiene ya vendor/ubits/packages/ o file://
    content = content.replace(
      /'((\.\.\/)+)([^']+)'/g,
      (match, dots, dots2, path) => {
        if (
          match.includes('vendor/ubits/packages/') ||
          match.includes('file://')
        ) {
          return match;
        }
        return `'${basePath}${path}'`;
      }
    );
    content = content.replace(
      /"((\.\.\/)+)([^"]+)"/g,
      (match, dots, dots2, path) => {
        if (
          match.includes('vendor/ubits/packages/') ||
          match.includes('file://')
        ) {
          return match;
        }
        return `"${basePath}${path}"`;
      }
    );

    // 7. Remover cualquier intento de cargar desde Storybook en el template generado
    // Esto asegura que solo se usen componentes locales
    content = content.replace(
      /window\.AUTORUN\.Components\.loadFromStorybook/g,
      '// window.AUTORUN.Components.loadFromStorybook // DESHABILITADO: Usar solo componentes locales'
    );

    return content;
  }

  /**
   * Genera HTML que carga el template desde Storybook
   */
  private generateStorybookTemplateHTML(
    storybookUrl: string,
    template: 'administrador' | 'colaborador',
    module: string,
    product: string | undefined,
    templateConfig: any
  ): string {
    const moduleConfig = UBITS_MODULES_CONFIG[module];
    const productName = product
      ? moduleConfig?.products.find((p) => p.id === product)?.name || product
      : '';
    const moduleName = moduleConfig?.name || this.formatModuleName(module);

    // Generar subnav HTML
    const subnavHTML = moduleConfig
      ? this.generateSubNavHTML(moduleConfig, product)
      : '';

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UBITS - ${moduleName}${productName ? ` - ${productName}` : ''} - ${template}</title>
  
  <!-- Cargar template desde Storybook -->
  <script type="module">
    // Configuración
    window.UBITS_CONFIG = {
      template: '${template}',
      module: '${module}',
      product: '${product || ''}',
      moduleName: '${moduleName}',
      productName: '${productName || ''}',
      storybookUrl: '${UBITS_PRESET.storybook.url}',
      storybookStoryUrl: '${storybookUrl}'
    };
    
    // Cargar componentes desde Storybook
    const storybookBaseUrl = '${UBITS_PRESET.storybook.url}';
    const components = ${JSON.stringify(UBITS_PRESET.components)};
    
    async function loadComponents() {
      if (window.AUTORUN?.Components) {
        for (const component of components) {
          try {
            await window.AUTORUN.Components.loadFromStorybook({
              manifestUrl: \`\${storybookBaseUrl}/components/\${component}/manifest.json\`
            });
          } catch (error) {
            console.warn(\`Error cargando \${component}:\`, error);
          }
        }
      }
    }
    
    // Cargar template desde Storybook
    async function loadTemplateFromStorybook() {
      try {
        // Intentar cargar el template usando la API de Storybook o iframe
        const templateContainer = document.getElementById('storybook-template');
        
        if (templateContainer) {
          // Opción 1: Cargar como iframe (si Storybook lo permite)
          const iframe = document.createElement('iframe');
          iframe.src = '${storybookUrl}';
          iframe.style.width = '100%';
          iframe.style.height = '100vh';
          iframe.style.border = 'none';
          iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups');
          
          // Opción 2: Intentar cargar el HTML renderizado directamente
          // Esto requiere que Storybook exponga una API para obtener el HTML
          try {
            const response = await fetch('${storybookUrl}', {
              mode: 'cors',
              credentials: 'include'
            });
            
            if (response.ok) {
              const html = await response.text();
              // Extraer solo el contenido del template (sin el wrapper de Storybook)
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const templateContent = doc.querySelector('[data-testid="storybook-story"]') || 
                                     doc.querySelector('.sb-story') ||
                                     doc.body;
              
              if (templateContent) {
                templateContainer.innerHTML = templateContent.innerHTML;
                return;
              }
            }
          } catch (fetchError) {
            console.warn('No se pudo cargar template directamente, usando iframe:', fetchError);
          }
          
          // Fallback: usar iframe
          templateContainer.appendChild(iframe);
        }
      } catch (error) {
        console.error('Error cargando template desde Storybook:', error);
        // Mostrar mensaje de error
        const container = document.getElementById('storybook-template');
        if (container) {
          container.innerHTML = \`
            <div style="padding: 24px; text-align: center;">
              <h2>⚠️ No se pudo cargar el template desde Storybook</h2>
              <p>Por favor, abre el template manualmente:</p>
              <a href="${storybookUrl}" target="_blank" style="color: #0066cc; text-decoration: underline;">
                Abrir template en Storybook
              </a>
            </div>
          \`;
        }
      }
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        loadComponents();
        loadTemplateFromStorybook();
      });
    } else {
      loadComponents();
      loadTemplateFromStorybook();
    }
  </script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }
    
    .app-container {
      display: flex;
      height: 100vh;
    }
    
    .sidebar {
      width: 280px;
      background: #fff;
      border-right: 1px solid #e5e5e5;
      padding: 24px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .sub-nav-container {
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 24px;
    }
    
    .sub-nav {
      display: flex;
      align-items: center;
      height: 40px;
    }
    
    .nav-tabs {
      display: flex;
      gap: 8px;
    }
    
    .nav-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: #666;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .nav-tab:hover {
      color: #1a1a1a;
    }
    
    .nav-tab.active {
      color: #0066cc;
      border-bottom-color: #0066cc;
    }
    
    .nav-tab i {
      font-size: 14px;
    }
    
    .content-wrapper {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    
    #storybook-template {
      width: 100%;
      height: 100%;
      min-height: 600px;
    }
  </style>
</head>
<body data-template="${template}" data-module="${module}" data-product="${product || ''}">
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar" data-sidebar>
      <nav class="sidebar-nav">
        <h2 class="sidebar-title">UBITS</h2>
        <ul class="sidebar-menu">
          ${templateConfig.modules
            .map(
              (m: string) => `
            <li class="sidebar-item ${m === module ? 'active' : ''}" data-module="${m}">
              <a href="#${m}" class="sidebar-link">
                <span class="sidebar-icon">📦</span>
                <span class="sidebar-label">${this.formatModuleName(m)}</span>
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
      ${subnavHTML ? `<div class="sub-nav-container" data-subnav>${subnavHTML}</div>` : ''}
      <div class="content-wrapper">
        <div id="storybook-template">
          <!-- El template de Storybook se cargará aquí -->
          <div style="padding: 24px; text-align: center;">
            <p>Cargando template desde Storybook...</p>
          </div>
        </div>
      </div>
    </main>
  </div>
  
  <script>
    // Inicializar feedback automatizado
    if (window.AUTORUN?.Feedback) {
      window.AUTORUN.Feedback.init({
        webhookUrl: '', // Configurar después
        storybookUrl: '${UBITS_PRESET.storybook.url}',
        useStorybookComponents: true,
        showFeedbackButton: true
      });
    }
    
    // Activar el módulo y producto en el sidebar y subnav
    document.addEventListener('DOMContentLoaded', () => {
      // Activar módulo en sidebar
      const moduleElement = document.querySelector(\`[data-module="${module}"]\`);
      if (moduleElement) {
        moduleElement.classList.add('active');
      }
      
      // Activar producto en subnav
      if ('${product}') {
        const productElement = document.querySelector(\`[data-product="${product}"]\`);
        if (productElement) {
          productElement.classList.add('active');
        }
      }
    });
  </script>
</body>
</html>`;
  }

  /**
   * Personaliza el template cargado desde Storybook con el módulo y producto seleccionados
   */
  private customizeTemplate(
    templateHtml: string,
    template: 'administrador' | 'colaborador',
    module: string,
    product?: string,
    absolutePathToUBITS?: string,
    disableOtherModulesNavigation?: boolean
  ): string {
    const moduleConfig = UBITS_MODULES_CONFIG[module];
    const productName = product
      ? moduleConfig?.products.find((p) => p.id === product)?.name || product
      : '';
    const moduleName = moduleConfig?.name || this.formatModuleName(module);

    // Actualizar el título
    templateHtml = templateHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>UBITS - ${moduleName}${productName ? ` - ${productName}` : ''} - ${template}</title>`
    );

    // Agregar configuración del módulo y producto como atributos data
    const bodyMatch = templateHtml.match(/<body[^>]*>/i);
    if (bodyMatch) {
      templateHtml = templateHtml.replace(
        /<body[^>]*>/i,
        `<body data-template="${template}" data-module="${module}" data-product="${product || ''}">`
      );
    }

    // Agregar estilos CSS para corregir problemas de dark mode y subnav
    const darkModeFixStyles = `
  <style>
    /* Fix: Asegurar que el botón activo del sidebar sea visible en dark mode */
    body[data-theme="dark"] .ubits-sidebar-nav-button.active,
    html[data-theme="dark"] .ubits-sidebar-nav-button.active {
      background: var(--ubits-sidebar-button-bg-active, #ffffff) !important;
    }
    
    /* Asegurar que el icono del botón activo sea visible en dark mode */
    body[data-theme="dark"] .ubits-sidebar-nav-button.active i,
    html[data-theme="dark"] .ubits-sidebar-nav-button.active i {
      color: var(--ubits-sidebar-button-fg-active, #303a47) !important;
    }
    
    /* Fix: Asegurar que el indicador activo del subnav (flechita azul) sea visible */
    /* NO sobrescribir el background-color - dejar que el componente use sus propios tokens:
       - Light mode: --ubits-accent-brand-static (definido en subnav.css línea 118)
       - Dark mode: --modifiers-normal-color-dark-accent-blue (definido en subnav.css línea 128)
    */
    .ubits-sub-nav-tab.ubits-sub-nav-tab--active::after {
      content: '' !important;
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 3px !important;
      border-radius: 0 !important;
      z-index: 1 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      width: auto !important;
      /* NO sobrescribir background-color - el componente ya lo maneja correctamente */
    }
    
    /* En dark mode, solo asegurar visibilidad - el componente ya usa --modifiers-normal-color-dark-accent-blue */
    body[data-theme="dark"] .ubits-sub-nav-tab.ubits-sub-nav-tab--active::after,
    html[data-theme="dark"] .ubits-sub-nav-tab.ubits-sub-nav-tab--active::after,
    [data-theme="dark"] .ubits-sub-nav-tab.ubits-sub-nav-tab--active::after {
      opacity: 1 !important;
      visibility: visible !important;
      display: block !important;
      /* NO sobrescribir background-color - el componente ya usa --modifiers-normal-color-dark-accent-blue */
    }
    
    /* Asegurar que el contenedor del subnav permita que el indicador sea visible */
    .ubits-sub-nav-tabs {
      overflow: visible !important;
    }
    
    .ubits-sub-nav-tab {
      position: relative !important;
      overflow: visible !important;
    }
  </style>`;

    // Agregar script para configurar el módulo y producto activos
    // Este script debe ejecutarse ANTES de que el template se inicialice
    const scriptTag = `
  <script>
    // Configuración del módulo y producto activos
    window.UBITS_CONFIG = {
      template: '${template}',
      module: '${module}',
      product: '${product || ''}',
      moduleName: '${moduleName}',
      productName: '${productName || ''}',
      storybookUrl: '${UBITS_PRESET.storybook.url}'
    };
    
    // Ajustar rutas de imágenes y sobrescribir initialActiveSection después de que products.js se cargue
    (function() {
      const adjustImagePaths = (products) => {
        if (!products) return;
        // Usar ruta relativa o absoluta según corresponda
        const ubitsTemplatesPath = \`${absolutePathToUBITS || '../vendor/ubits/packages/'}templates\`;
        
        // Función recursiva para ajustar rutas en objetos
        const adjustPaths = (obj) => {
          if (typeof obj !== 'object' || obj === null) return;
          
          for (const key in obj) {
            if (key === 'avatarImage' || key === 'logoImage' || key === 'avatar') {
              // Ajustar rutas de imágenes
              if (typeof obj[key] === 'string' && obj[key].startsWith('assets/')) {
                obj[key] = ubitsTemplatesPath + '/' + obj[key];
              }
            } else if (Array.isArray(obj[key])) {
              // Recorrer arrays
              obj[key].forEach(item => adjustPaths(item));
            } else {
              // Recorrer objetos anidados
              adjustPaths(obj[key]);
            }
          }
        };
        
        adjustPaths(products);
      };
      
      // La clave en products.js es 'template-admin' o 'template-colaborador'
      const templateKey = '${template === 'administrador' ? 'template-admin' : 'template-colaborador'}';
      
      // ⚠️ CRÍTICO: Sobrescritura robusta de detectCurrentProduct y getProductConfig
      // products.js puede sobrescribir estas funciones después de que las definamos,
      // así que necesitamos interceptarlas y corregirlas continuamente
      
      // Función para sobrescribir detectCurrentProduct (se llamará múltiples veces)
      const overrideDetectCurrentProduct = () => {
        const originalDetectCurrentProduct = window.detectCurrentProduct;
      window.detectCurrentProduct = function() {
        // Siempre retornar el template correcto
          console.log('🔍 [Wizard] detectCurrentProduct() llamado, retornando:', templateKey);
        return templateKey;
        };
        console.log('🔍 [Wizard] ✅ detectCurrentProduct sobrescrito. Original:', typeof originalDetectCurrentProduct);
      };
      
      // Sobrescribir INMEDIATAMENTE (antes de que products.js se cargue)
      overrideDetectCurrentProduct();
      
      // También interceptar cuando products.js lo sobrescriba después
      // Usar Object.defineProperty para interceptar cambios
      let currentDetectCurrentProduct = window.detectCurrentProduct;
      Object.defineProperty(window, 'detectCurrentProduct', {
        get: function() {
          return currentDetectCurrentProduct;
        },
        set: function(newValue) {
          console.log('🔍 [Wizard] ⚠️ detectCurrentProduct está siendo sobrescrito por products.js');
          // Guardar la función original pero seguir usando nuestra versión
          currentDetectCurrentProduct = function() {
            console.log('🔍 [Wizard] detectCurrentProduct() llamado (interceptado), retornando:', templateKey);
            return templateKey;
          };
          console.log('🔍 [Wizard] ✅ detectCurrentProduct interceptado y corregido');
        },
        configurable: true,
        enumerable: true
      });
      
      // También sobrescribir getProductConfig INMEDIATAMENTE para asegurar que siempre devuelva el producto correcto
      const originalGetProductConfig = window.getProductConfig;
      window.getProductConfig = function(productId) {
        console.log('🔍 [Wizard] getProductConfig() llamado con productId:', productId, 'templateKey esperado:', templateKey);
        
        // Si UBITS_PRODUCTS aún no está disponible, esperar un poco
        if (!window.UBITS_PRODUCTS) {
          console.warn('🔍 [Wizard] ⚠️ UBITS_PRODUCTS no disponible todavía, esperando...');
          // Si hay función original, usarla temporalmente
          if (originalGetProductConfig) {
            return originalGetProductConfig(productId);
          }
          return null;
        }
        
        // Si el productId es el templateKey correcto, forzar su uso
        if (productId === templateKey && window.UBITS_PRODUCTS[templateKey]) {
          console.log('🔍 [Wizard] ✅ getProductConfig() usando templateKey correcto:', templateKey);
          return window.UBITS_PRODUCTS[templateKey];
        }
        
        // Si no coincide, loguear y corregir
        if (productId !== templateKey) {
          console.warn('🔍 [Wizard] ⚠️ getProductConfig() recibió productId incorrecto:', productId, 'esperado:', templateKey);
          // Forzar uso del templateKey correcto
          if (window.UBITS_PRODUCTS[templateKey]) {
            console.log('🔍 [Wizard] ✅ Corrigiendo: usando templateKey:', templateKey);
            return window.UBITS_PRODUCTS[templateKey];
          }
        }
        
        // Usar función original si existe
        if (originalGetProductConfig) {
          const result = originalGetProductConfig(productId);
          // Verificar si devolvió el producto incorrecto
          if (result && result.name && result.name.includes('Colaborador') && templateKey === 'template-admin') {
            console.error('🔍 [Wizard] ❌ getProductConfig() devolvió producto Colaborador cuando debería ser Admin');
            // Forzar uso del producto correcto
            if (window.UBITS_PRODUCTS && window.UBITS_PRODUCTS[templateKey]) {
              console.log('🔍 [Wizard] ✅ Corrigiendo: usando template-admin');
              return window.UBITS_PRODUCTS[templateKey];
            }
          }
          return result;
        }
        
        // Fallback: usar templateKey si está disponible
        if (window.UBITS_PRODUCTS && window.UBITS_PRODUCTS[templateKey]) {
          console.warn('🔍 [Wizard] ⚠️ Usando templateKey como fallback:', templateKey);
          return window.UBITS_PRODUCTS[templateKey];
        }
        
        // Fallback final: template-colaborador (comportamiento original)
        return window.UBITS_PRODUCTS ? window.UBITS_PRODUCTS['template-colaborador'] : null;
      };
      
      // Interceptar cuando UBITS_PRODUCTS se define ANTES de que el template lo use
      let productsDefined = false;
      const checkProducts = () => {
        if (window.UBITS_PRODUCTS && !productsDefined) {
          productsDefined = true;
          console.log('🔍 [Wizard] ════════════════════════════════════════');
          console.log('🔍 [Wizard] UBITS_PRODUCTS detectado');
          console.log('🔍 [Wizard] templateKey:', templateKey);
          console.log('🔍 [Wizard] Módulo objetivo: ${module}');
          console.log('🔍 [Wizard] Producto objetivo: ${product}');
          
          // Ajustar rutas de imágenes
          adjustImagePaths(window.UBITS_PRODUCTS);
          
          // ⚠️ CRÍTICO: Volver a sobrescribir detectCurrentProduct después de que products.js se carga
          // products.js define detectCurrentProduct al final, así que necesitamos sobrescribirlo de nuevo
          overrideDetectCurrentProduct();
          console.log('🔍 [Wizard] ✅ detectCurrentProduct vuelto a sobrescribir después de que products.js se cargó');
          
          // Sobrescribir initialActiveSection INMEDIATAMENTE
          if (window.UBITS_PRODUCTS[templateKey]) {
            const productConfig = window.UBITS_PRODUCTS[templateKey];
            console.log('🔍 [Wizard] ProductConfig encontrado:', productConfig.name);
            console.log('🔍 [Wizard] initialActiveSection ANTES:', productConfig.sidebar?.initialActiveSection);
            
            if (productConfig.sidebar) {
              // Normalizar nombre del módulo: 'desempeno' -> 'desempeño' (con tilde)
              // El ContentManager espera 'desempeño' con tilde para encontrar el SubNav correcto
              const normalizedModule = '${module}' === 'desempeno' ? 'desempeño' : '${module}';
              productConfig.sidebar.initialActiveSection = normalizedModule;
              console.log('🔍 [Wizard] ✅ initialActiveSection sobrescrito a:', normalizedModule);
              console.log('🔍 [Wizard] initialActiveSection DESPUÉS:', productConfig.sidebar.initialActiveSection);
            } else {
              console.warn('🔍 [Wizard] ⚠️ productConfig.sidebar no existe');
            }
          } else {
            console.warn('🔍 [Wizard] ⚠️ templateKey no encontrado en UBITS_PRODUCTS');
            console.log('🔍 [Wizard] Claves disponibles:', Object.keys(window.UBITS_PRODUCTS));
          }
        }
      };
      
      // Verificar INMEDIATAMENTE (puede que ya esté definido)
      checkProducts();
      
      // Verificar periódicamente con intervalo más corto
      const interval = setInterval(() => {
        checkProducts();
        // También volver a sobrescribir detectCurrentProduct periódicamente por si products.js lo cambió
        if (window.UBITS_PRODUCTS) {
          const currentResult = window.detectCurrentProduct();
          if (currentResult !== templateKey) {
            console.warn('🔍 [Wizard] ⚠️ detectCurrentProduct devolvió:', currentResult, 'esperado:', templateKey, '- Corrigiendo...');
            overrideDetectCurrentProduct();
          }
        }
        if (productsDefined) {
          clearInterval(interval);
        }
      }, 10);
      
      // Limpiar después de 2 segundos
      setTimeout(() => {
        clearInterval(interval);
        // Una última verificación y corrección
        if (window.UBITS_PRODUCTS) {
          overrideDetectCurrentProduct();
          console.log('🔍 [Wizard] ✅ Última verificación: detectCurrentProduct sobrescrito');
        }
      }, 2000);
    })();
    
    // Activar el producto DESPUÉS de que el template termine su inicialización
    // El template ya activa el módulo usando initialActiveSection, solo necesitamos activar el producto
    document.addEventListener('DOMContentLoaded', () => {
      console.log('🔍 [Wizard] ════════════════════════════════════════');
      console.log('🔍 [Wizard] DOMContentLoaded - Iniciando activación de módulo/producto');
      console.log('🔍 [Wizard] Módulo objetivo: ${module}');
      console.log('🔍 [Wizard] Producto objetivo: ${product}');
      
      const activateProduct = () => {
        console.log('🔍 [Wizard] ════════════════════════════════════════');
        console.log('🔍 [Wizard] activateProduct ejecutado');
        
        if (!window.UBITS_ContentManager) {
          console.log('🔍 [Wizard] ⏳ ContentManager no está listo, reintentando...');
          setTimeout(activateProduct, 100);
          return;
        }
        
        console.log('🔍 [Wizard] ✅ ContentManager está listo');
        console.log('🔍 [Wizard] currentSection actual:', window.UBITS_ContentManager.currentSection);
        console.log('🔍 [Wizard] Módulo esperado: ${module}');
        
        // Verificar estado del sidebar
        const sidebarElement = document.querySelector('.ubits-sidebar');
        if (sidebarElement) {
          const activeButton = sidebarElement.querySelector('.ubits-sidebar-nav-button.active');
          console.log('🔍 [Wizard] Sidebar encontrado');
          console.log('🔍 [Wizard] Botón activo en sidebar:', activeButton?.getAttribute('data-section') || 'ninguno');
          
          // Listar todos los botones del sidebar
          const allButtons = sidebarElement.querySelectorAll('.ubits-sidebar-nav-button');
          console.log('🔍 [Wizard] Botones en sidebar:');
          allButtons.forEach(btn => {
            const section = btn.getAttribute('data-section');
            const isActive = btn.classList.contains('active');
            console.log('   -', section, isActive ? '(ACTIVO)' : '(inactivo)');
          });
        } else {
          console.warn('🔍 [Wizard] ⚠️ Sidebar no encontrado');
        }
        
        // Verificar estado del subnav
        const subNavElement = document.querySelector('.ubits-sub-nav');
        if (subNavElement) {
          console.log('🔍 [Wizard] SubNav encontrado');
          const activeTab = subNavElement.querySelector('.ubits-sub-nav-tab--active');
          console.log('🔍 [Wizard] Tab activo en SubNav:', activeTab?.getAttribute('data-tab') || 'ninguno');
          
          // Listar todos los tabs del subnav
          const allTabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
          console.log('🔍 [Wizard] Tabs en SubNav:');
          allTabs.forEach(tab => {
            const tabId = tab.getAttribute('data-tab');
            const isActive = tab.classList.contains('ubits-sub-nav-tab--active');
            console.log('   -', tabId, isActive ? '(ACTIVO)' : '(inactivo)');
          });
        } else {
          console.log('🔍 [Wizard] SubNav no encontrado (puede ser normal si el módulo no tiene subnav)');
        }
        
        try {
          // Normalizar nombre del módulo: 'desempeno' -> 'desempeño' (con tilde)
          // El ContentManager espera 'desempeño' con tilde para encontrar el SubNav correcto
          const normalizedModule = '${module}' === 'desempeno' ? 'desempeño' : '${module}';
          
          // Esperar a que el template termine su inicialización completa
          // El template usa setTimeout de ~1500ms + requestAnimationFrame
          // Verificar que el módulo ya esté activo (gracias a initialActiveSection)
          if (window.UBITS_ContentManager.currentSection === normalizedModule) {
            console.log('🔍 [Wizard] ✅ Módulo ya está activo:', normalizedModule);
            
            // Verificar si hay un producto
            const product = '${product}';
            const hasProduct = product && product !== 'undefined' && product !== 'null' && product.trim() !== '';
            
            if (hasProduct) {
              console.log('🔍 [Wizard] 🚀 Activando producto:', product);
              console.log('🔍 [Wizard] Llamando handleSectionChange("' + normalizedModule + '", "' + product + '")');
              
              // handleSectionChange con activeTabId activa el módulo y el producto en una sola llamada
              window.UBITS_ContentManager.handleSectionChange(normalizedModule, product);
              
              // Mapeo de productos a IDs de tabs del SubNav
              // Algunos productos tienen IDs diferentes en el SubNav
              const productToTabIdMap = {
                // Aprendizaje
                'inicio': 'home',
                'catalogo': 'catalog',
                'corporativa': 'corporate',
                'zona-estudio': 'study-zone',
                // Desempeño
                'evaluations': 'evaluations',
                'evaluaciones-360': 'evaluations',
                'objectives': 'objectives',
                'objetivos': 'objectives',
                'matriz-talento': 'matriz-talento',
                // Empresa
                'gestion-usuarios': 'gestion-usuarios',
                'organigrama': 'organigrama',
                'datos-empresa': 'datos-empresa',
                'personalizacion': 'personalizacion',
                'roles-permisos': 'roles-permisos',
                'comunicaciones': 'comunicaciones'
              };
              
              // Obtener el ID del tab correcto
              const tabId = productToTabIdMap[product] || product;
              console.log('🔍 [Wizard] [SubNav] Producto original:', product);
              console.log('🔍 [Wizard] [SubNav] Tab ID mapeado:', tabId);
              
              // Forzar activación del tab en el SubNav después de que se actualice el contenido
              // Esto es necesario porque el SubNav puede ya existir y no recargarse
              // Usar múltiples intentos porque el SubNav puede tardar en renderizarse
              let attempts = 0;
              const maxAttempts = 15;
              const activateTab = () => {
                attempts++;
                console.log('🔍 [Wizard] ════════════════════════════════════════');
                console.log('🔍 [Wizard] [SubNav] Intento', attempts, 'de activar tab en SubNav...');
                console.log('🔍 [Wizard] [SubNav] Producto objetivo:', product);
                console.log('🔍 [Wizard] [SubNav] Tab ID a buscar:', tabId);
                
                // Buscar el SubNav de múltiples formas
                let subNavElement = document.querySelector('.ubits-sub-nav');
                if (!subNavElement) {
                  subNavElement = document.querySelector('#top-nav-container .ubits-sub-nav');
                }
                if (!subNavElement) {
                  subNavElement = document.querySelector('[data-subnav] .ubits-sub-nav');
                }
                if (!subNavElement) {
                  const topNavContainer = document.querySelector('#top-nav-container');
                  if (topNavContainer) {
                    subNavElement = topNavContainer.querySelector('.ubits-sub-nav');
                  }
                }
                
                console.log('🔍 [Wizard] [SubNav] SubNav encontrado:', !!subNavElement);
                
                if (subNavElement) {
                  console.log('🔍 [Wizard] [SubNav] SubNav HTML:', subNavElement.outerHTML.substring(0, 500));
                  
                  // Listar todos los tabs disponibles para debug
                  const allTabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
                  console.log('🔍 [Wizard] [SubNav] Tabs encontrados:', allTabs.length);
                  
                  if (allTabs.length === 0) {
                    console.warn('🔍 [Wizard] [SubNav] ⚠️ No se encontraron tabs con selector .ubits-sub-nav-tab');
                    // Intentar otros selectores
                    const altTabs = subNavElement.querySelectorAll('[data-tab]');
                    console.log('🔍 [Wizard] [SubNav] Tabs con [data-tab]:', altTabs.length);
                    altTabs.forEach((tab, idx) => {
                      console.log('   Tab', idx + ':', {
                        dataTab: tab.getAttribute('data-tab'),
                        classes: tab.className,
                        text: tab.textContent?.trim()?.substring(0, 50)
                      });
                    });
                  } else {
                    console.log('🔍 [Wizard] [SubNav] Tabs disponibles:');
                    Array.from(allTabs).forEach((tab, idx) => {
                      const dataTab = tab.getAttribute('data-tab');
                      const text = tab.textContent?.trim();
                      const isActive = tab.classList.contains('ubits-sub-nav-tab--active');
                      console.log('   Tab', idx + ':', {
                        dataTab: dataTab,
                        text: text,
                        isActive: isActive,
                        classes: tab.className,
                        innerHTML: tab.innerHTML.substring(0, 100)
                      });
                    });
                    
                    // Si no hay producto o es undefined, mantener el tab que ContentManager ya activó
                    const product = '${product}';
                    if (!product || product === 'undefined' || product.trim() === '') {
                      console.log('🔍 [Wizard] [SubNav] ⚠️ No hay producto específico, manteniendo tab activo actual');
                      const activeTab = subNavElement.querySelector('.ubits-sub-nav-tab--active');
                      if (activeTab) {
                        console.log('🔍 [Wizard] [SubNav] ✅ Tab activo encontrado y mantenido:', activeTab.getAttribute('data-tab'));
                        return true;
                      } else {
                        // Si no hay tab activo, activar el primero disponible
                        if (allTabs.length > 0) {
                          const firstTab = allTabs[0];
                          firstTab.classList.add('ubits-sub-nav-tab--active');
                          console.log('🔍 [Wizard] [SubNav] ✅ Activado primer tab disponible:', firstTab.getAttribute('data-tab'));
                          return true;
                        }
                      }
                      return false;
                    }
                    
                    // Remover active de todos los tabs solo si hay un producto específico
                    console.log('🔍 [Wizard] [SubNav] Removiendo active de todos los tabs...');
                    allTabs.forEach(tab => {
                      tab.classList.remove('ubits-sub-nav-tab--active');
                    });
                    
                    // Activar el tab correspondiente al producto
                    // Primero intentar con el tabId mapeado
                    console.log('🔍 [Wizard] [SubNav] Buscando tab con data-tab="' + tabId + '"...');
                    let targetTab = subNavElement.querySelector('[data-tab="' + tabId + '"]');
                    
                    // Si no se encuentra, intentar con el producto original
                    if (!targetTab) {
                      console.log('🔍 [Wizard] [SubNav] Tab no encontrado con tabId mapeado, intentando con producto original...');
                      targetTab = subNavElement.querySelector('[data-tab="' + product + '"]');
                    }
                    
                    // Si aún no se encuentra, intentar buscar por texto
                    if (!targetTab) {
                      console.log('🔍 [Wizard] [SubNav] Tab no encontrado por data-tab, buscando por texto...');
                      const productText = product.toLowerCase();
                      Array.from(allTabs).forEach(tab => {
                        const text = tab.textContent?.trim().toLowerCase();
                        // Buscar coincidencias parciales
                        if (text.includes(productText) || productText.includes(text) || 
                            (productText.includes('inicio') && text.includes('inicio')) ||
                            (productText.includes('matriz') && text.includes('matriz')) ||
                            (productText.includes('talento') && text.includes('talento'))) {
                          console.log('🔍 [Wizard] [SubNav] Tab encontrado por texto:', text);
                          targetTab = tab;
                        }
                      });
                    }
                    
                    if (targetTab) {
                      console.log('🔍 [Wizard] [SubNav] ✅ Tab encontrado:', {
                        dataTab: targetTab.getAttribute('data-tab'),
                        text: targetTab.textContent?.trim(),
                        classes: targetTab.className
                      });
                      targetTab.classList.add('ubits-sub-nav-tab--active');
                      console.log('🔍 [Wizard] [SubNav] ✅ Clase ubits-sub-nav-tab--active agregada');
                      
                      // Verificar que se agregó correctamente
                      const hasActive = targetTab.classList.contains('ubits-sub-nav-tab--active');
                      console.log('🔍 [Wizard] [SubNav] Verificación - tiene clase active:', hasActive);
                      
                      // Verificar estado final
                      const activeTab = document.querySelector('.ubits-sub-nav-tab--active');
                      console.log('🔍 [Wizard] [SubNav] Tab activo confirmado:', {
                        dataTab: activeTab?.getAttribute('data-tab') || 'ninguno',
                        text: activeTab?.textContent?.trim() || 'ninguno',
                        element: activeTab ? 'encontrado' : 'no encontrado'
                      });
                      return true; // Éxito
                    } else {
                      console.warn('🔍 [Wizard] [SubNav] ⚠️ Tab "${product}" no encontrado en SubNav');
                      console.warn('🔍 [Wizard] [SubNav] Producto buscado:', '${product}');
                      if (attempts < maxAttempts) {
                        console.log('🔍 [Wizard] [SubNav] Reintentando en 200ms...');
                        setTimeout(activateTab, 200);
                      } else {
                        console.error('🔍 [Wizard] [SubNav] ❌ Máximo de intentos alcanzado');
                      }
                      return false;
                    }
                  }
                } else {
                  console.warn('🔍 [Wizard] [SubNav] ⚠️ SubNav no encontrado, reintentando...');
                  if (attempts < maxAttempts) {
                    setTimeout(activateTab, 200);
                  } else {
                    console.error('🔍 [Wizard] [SubNav] ❌ Máximo de intentos alcanzado sin encontrar SubNav');
                  }
                  return false;
                }
              };
              
              // Iniciar después de que updateContent termine
              console.log('🔍 [Wizard] [SubNav] Programando activación del tab en 300ms...');
              setTimeout(activateTab, 300);
            } else {
              console.log('🔍 [Wizard] ⚠️ No hay producto específico, ContentManager ya activó el tab correcto');
              // No hacer nada más, ContentManager ya activó el tab correcto
            }
          } else {
            console.log('🔍 [Wizard] ⏳ Módulo aún no está activo, esperando...');
            console.log('🔍 [Wizard] currentSection:', window.UBITS_ContentManager.currentSection);
            console.log('🔍 [Wizard] Esperado:', normalizedModule);
            // Si el módulo aún no está activo, esperar un poco más
            setTimeout(activateProduct, 200);
          }
        } catch (error) {
          console.error('🔍 [Wizard] ❌ Error al activar producto:', error);
          console.error('🔍 [Wizard] Stack:', error.stack);
        }
      };
      
      // Esperar a que el template termine su inicialización (el template usa setTimeout de ~1500ms)
      console.log('🔍 [Wizard] ⏳ Esperando 2500ms para que el template termine su inicialización...');
      setTimeout(() => {
        console.log('🔍 [Wizard] ⏰ Timeout completado, ejecutando activateProduct...');
        activateProduct();
      }, 2500);
    });
    
    // Función para mantener el tab activo después de que ContentManager actualice el subnav
    const maintainActiveTab = () => {
      console.log('🔵 [SubNav Fix] ════════════════════════════════════════');
      console.log('🔵 [SubNav Fix] maintainActiveTab() llamado');
      const product = '${product}';
      console.log('🔵 [SubNav Fix] Producto objetivo:', product);
      
      const subNavElement = document.querySelector('.ubits-sub-nav') || 
                           document.querySelector('#top-nav-container .ubits-sub-nav');
      
      if (!subNavElement) {
        console.log('🔵 [SubNav Fix] ⚠️ SubNav no encontrado, saliendo');
        return;
      }
      
      const allTabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
      console.log('🔵 [SubNav Fix] Tabs encontrados:', allTabs.length);
      
      // Si no hay producto, mantener el tab que ContentManager ya activó o activar el primero
      if (!product || product === 'undefined' || product === 'null' || product.trim() === '') {
        console.log('🔵 [SubNav Fix] ⚠️ No hay producto específico');
        
        // Verificar si ya hay un tab activo
        const activeTab = subNavElement.querySelector('.ubits-sub-nav-tab--active');
        if (activeTab) {
          const dataTab = activeTab.getAttribute('data-tab');
          console.log('🔵 [SubNav Fix] ✅ Ya hay un tab activo, manteniéndolo:', dataTab);
          // Asegurar que la clase active esté presente (por si acaso)
          activeTab.classList.add('ubits-sub-nav-tab--active');
          
          // Logs de diagnóstico del color
          const styles = window.getComputedStyle(activeTab, '::after');
          const computedBgColor = styles.backgroundColor;
          const rootStyles = getComputedStyle(document.documentElement);
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
          
          console.log('🔵 [SubNav Fix] 🔍 DIAGNÓSTICO DE COLOR (sin producto):');
          console.log('🔵 [SubNav Fix] Tema actual:', currentTheme);
          console.log('🔵 [SubNav Fix] backgroundColor (computado):', computedBgColor);
          console.log('🔵 [SubNav Fix] --modifiers-normal-color-dark-accent-blue:', rootStyles.getPropertyValue('--modifiers-normal-color-dark-accent-blue').trim() || '(no definido)');
          console.log('🔵 [SubNav Fix] --ubits-accent-brand:', rootStyles.getPropertyValue('--ubits-accent-brand').trim() || '(no definido)');
          console.log('🔵 [SubNav Fix] --ubits-accent-brand-static:', rootStyles.getPropertyValue('--ubits-accent-brand-static').trim() || '(no definido)');
          
          return;
        }
        
        // Si no hay tab activo, activar el primero disponible
        if (allTabs.length > 0) {
          const firstTab = allTabs[0];
          const dataTab = firstTab.getAttribute('data-tab');
          console.log('🔵 [SubNav Fix] Activando primer tab disponible:', dataTab);
          firstTab.classList.add('ubits-sub-nav-tab--active');
          console.log('🔵 [SubNav Fix] ✅ Clase active agregada al primer tab');
          
          // Logs de diagnóstico del color después de activar
          setTimeout(() => {
            const styles = window.getComputedStyle(firstTab, '::after');
            const computedBgColor = styles.backgroundColor;
            const rootStyles = getComputedStyle(document.documentElement);
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            
            console.log('🔵 [SubNav Fix] 🔍 DIAGNÓSTICO DE COLOR (primer tab activado):');
            console.log('🔵 [SubNav Fix] Tema actual:', currentTheme);
            console.log('🔵 [SubNav Fix] backgroundColor (computado):', computedBgColor);
            console.log('🔵 [SubNav Fix] --modifiers-normal-color-dark-accent-blue:', rootStyles.getPropertyValue('--modifiers-normal-color-dark-accent-blue').trim() || '(no definido)');
            console.log('🔵 [SubNav Fix] --ubits-accent-brand:', rootStyles.getPropertyValue('--ubits-accent-brand').trim() || '(no definido)');
          }, 100);
          
          return;
        }
        
        console.log('🔵 [SubNav Fix] ⚠️ No hay tabs disponibles');
        return;
      }
      
      // Si hay producto, buscar y activar el tab correspondiente
      const productToTabIdMap = {
        'inicio': 'home',
        'catalogo': 'catalog',
        'corporativa': 'corporate',
        'zona-estudio': 'study-zone',
        'evaluations': 'evaluations',
        'evaluaciones-360': 'evaluations',
        'objectives': 'objectives',
        'objetivos': 'objectives',
        'matriz-talento': 'matriz-talento',
        'gestion-usuarios': 'gestion-usuarios',
        'organigrama': 'organigrama',
        'datos-empresa': 'datos-empresa',
        'personalizacion': 'personalizacion',
        'roles-permisos': 'roles-permisos',
        'comunicaciones': 'comunicaciones'
      };
      
      const tabId = productToTabIdMap[product] || product;
      console.log('🔵 [SubNav Fix] Tab ID mapeado:', tabId);
      
      // Log estado antes de remover
      console.log('🔵 [SubNav Fix] Estado ANTES de remover active:');
      allTabs.forEach((tab, idx) => {
        const isActive = tab.classList.contains('ubits-sub-nav-tab--active');
        const dataTab = tab.getAttribute('data-tab');
        console.log('   Tab ' + idx + ': data-tab="' + dataTab + '", active=' + isActive);
      });
      
      allTabs.forEach(tab => tab.classList.remove('ubits-sub-nav-tab--active'));
      console.log('🔵 [SubNav Fix] ✅ Clase active removida de todos los tabs');
      
      let targetTab = subNavElement.querySelector('[data-tab="' + tabId + '"]');
      console.log('🔵 [SubNav Fix] Buscando tab con data-tab="' + tabId + '":', !!targetTab);
      
      if (!targetTab) {
        console.log('🔵 [SubNav Fix] Tab no encontrado con tabId, buscando con producto original...');
        targetTab = subNavElement.querySelector('[data-tab="' + product + '"]');
        console.log('🔵 [SubNav Fix] Tab encontrado con producto original:', !!targetTab);
      }
      
      if (targetTab) {
        const dataTab = targetTab.getAttribute('data-tab');
        const text = targetTab.textContent?.trim();
        console.log('🔵 [SubNav Fix] ✅ Tab objetivo encontrado:', { dataTab, text });
        targetTab.classList.add('ubits-sub-nav-tab--active');
        console.log('🔵 [SubNav Fix] ✅ Clase ubits-sub-nav-tab--active agregada');
        
        // Verificar que se agregó correctamente
        const hasActive = targetTab.classList.contains('ubits-sub-nav-tab--active');
        console.log('🔵 [SubNav Fix] Verificación - tiene clase active:', hasActive);
        
        // Verificar el ::after y los tokens de color
        const styles = window.getComputedStyle(targetTab, '::after');
        const computedBgColor = styles.backgroundColor;
        const rootStyles = getComputedStyle(document.documentElement);
        
        // Obtener valores de los tokens
        const ubitsAccentBrand = rootStyles.getPropertyValue('--ubits-accent-brand').trim();
        const modifiersNormalLightAccentBrand = rootStyles.getPropertyValue('--modifiers-normal-color-light-accent-brand').trim();
        const modifiersNormalDarkAccentBlue = rootStyles.getPropertyValue('--modifiers-normal-color-dark-accent-blue').trim();
        const ubitsAccentBrandStatic = rootStyles.getPropertyValue('--ubits-accent-brand-static').trim();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        
        console.log('🔵 [SubNav Fix] ════════════════════════════════════════');
        console.log('🔵 [SubNav Fix] 🔍 DIAGNÓSTICO DE COLOR DEL INDICADOR');
        console.log('🔵 [SubNav Fix] Tema actual:', currentTheme);
        console.log('🔵 [SubNav Fix] Tokens disponibles:');
        console.log('   - --ubits-accent-brand:', ubitsAccentBrand || '(no definido)');
        console.log('   - --modifiers-normal-color-light-accent-brand:', modifiersNormalLightAccentBrand || '(no definido)');
        console.log('   - --modifiers-normal-color-dark-accent-blue:', modifiersNormalDarkAccentBlue || '(no definido)');
        console.log('   - --ubits-accent-brand-static:', ubitsAccentBrandStatic || '(no definido)');
        console.log('🔵 [SubNav Fix] Estilos computados del ::after:');
        console.log('   - backgroundColor (computado):', computedBgColor);
        console.log('   - display:', styles.display);
        console.log('   - visibility:', styles.visibility);
        console.log('   - opacity:', styles.opacity);
        console.log('   - height:', styles.height);
        console.log('   - position:', styles.position);
        console.log('   - content:', styles.content);
        console.log('🔵 [SubNav Fix] ════════════════════════════════════════');
      } else {
        console.error('🔵 [SubNav Fix] ❌ Tab objetivo NO encontrado');
        console.log('🔵 [SubNav Fix] Tabs disponibles:');
        allTabs.forEach((tab, idx) => {
          const dataTab = tab.getAttribute('data-tab');
          const text = tab.textContent?.trim();
          console.log('   Tab ' + idx + ': data-tab="' + dataTab + '", text="' + text + '"');
        });
      }
      console.log('🔵 [SubNav Fix] ════════════════════════════════════════');
    };
    
    // Interceptar llamadas a handleSectionChange y updateSubNav para mantener el tab activo
    const originalHandleSectionChange = window.UBITS_ContentManager?.handleSectionChange;
    const originalUpdateSubNav = window.UBITS_ContentManager?.updateSubNav;
    
    if (originalHandleSectionChange) {
      window.UBITS_ContentManager.handleSectionChange = function(section, activeTabId) {
        console.log('🔍 [Wizard] ════════════════════════════════════════');
        console.log('🔍 [Wizard] 🔄 handleSectionChange INTERCEPTADO');
        console.log('🔍 [Wizard] section:', section);
        console.log('🔍 [Wizard] activeTabId:', activeTabId);
        const result = originalHandleSectionChange.call(this, section, activeTabId);
        // Mantener el tab activo después de la actualización
        console.log('🔵 [SubNav Fix] Programando maintainActiveTab después de handleSectionChange...');
        setTimeout(() => {
          console.log('🔵 [SubNav Fix] Ejecutando maintainActiveTab (después de handleSectionChange)');
          maintainActiveTab();
        }, 100);
        return result;
      };
    }
    
    if (originalUpdateSubNav) {
      window.UBITS_ContentManager.updateSubNav = function(section, activeTabId) {
        console.log('🔵 [SubNav Fix] updateSubNav INTERCEPTADO');
        console.log('🔵 [SubNav Fix] section:', section, 'activeTabId:', activeTabId);
        const result = originalUpdateSubNav.call(this, section, activeTabId);
        // Mantener el tab activo después de la actualización
        console.log('🔵 [SubNav Fix] Programando maintainActiveTab después de updateSubNav...');
        setTimeout(() => {
          console.log('🔵 [SubNav Fix] Ejecutando maintainActiveTab (después de updateSubNav)');
          maintainActiveTab();
        }, 100);
        return result;
      };
    }
    
    // Observar cambios en el DOM para mantener el tab activo
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.classList && target.classList.contains('ubits-sub-nav-tab')) {
            console.log('🔵 [SubNav Fix] MutationObserver: Cambio detectado en tab');
            const dataTab = target.getAttribute('data-tab');
            const text = target.textContent?.trim();
            const hadActive = mutation.oldValue?.includes('ubits-sub-nav-tab--active');
            const hasActive = target.classList.contains('ubits-sub-nav-tab--active');
            console.log('🔵 [SubNav Fix] Tab:', { dataTab, text, hadActive, hasActive });
            
            // Si se removió la clase active, restaurarla si es el tab correcto
            const product = '${product}';
            if (product) {
              const productToTabIdMap = {
                'inicio': 'home',
                'catalogo': 'catalog',
                'corporativa': 'corporate',
                'zona-estudio': 'study-zone',
                'evaluations': 'evaluations',
                'evaluaciones-360': 'evaluations',
                'objectives': 'objectives',
                'objetivos': 'objectives',
                'matriz-talento': 'matriz-talento',
                'gestion-usuarios': 'gestion-usuarios',
                'organigrama': 'organigrama',
                'datos-empresa': 'datos-empresa',
                'personalizacion': 'personalizacion',
                'roles-permisos': 'roles-permisos',
                'comunicaciones': 'comunicaciones'
              };
              const tabId = productToTabIdMap[product] || product;
              console.log('🔵 [SubNav Fix] Comparando:', { dataTab, tabId, product });
              
              if (dataTab === tabId || dataTab === product) {
                if (!target.classList.contains('ubits-sub-nav-tab--active')) {
                  console.log('🔵 [SubNav Fix] ⚠️ Clase active removida del tab correcto, restaurando...');
                  setTimeout(() => {
                    target.classList.add('ubits-sub-nav-tab--active');
                    console.log('🔵 [SubNav Fix] ✅ Clase active restaurada');
                    
                    // Verificar estilos después de restaurar
                    const styles = window.getComputedStyle(target, '::after');
                    console.log('🔵 [SubNav Fix] Estilos ::after después de restaurar:', {
                      content: styles.content,
                      display: styles.display,
                      visibility: styles.visibility,
                      opacity: styles.opacity,
                      backgroundColor: styles.backgroundColor
                    });
                  }, 50);
                } else {
                  console.log('🔵 [SubNav Fix] ✅ Tab correcto ya tiene clase active');
                }
              } else {
                console.log('🔵 [SubNav Fix] Tab no es el objetivo, ignorando');
              }
            }
          }
        } else if (mutation.type === 'childList') {
          console.log('🔵 [SubNav Fix] MutationObserver: Cambio en childList detectado');
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList?.contains('ubits-sub-nav-tab')) {
              console.log('🔵 [SubNav Fix] Nuevo tab agregado:', node.getAttribute('data-tab'));
            }
          });
        }
      });
    });
    
    // Observar el contenedor del subnav
    setTimeout(() => {
      console.log('🔵 [SubNav Fix] Configurando MutationObserver...');
      const subNavContainer = document.querySelector('#top-nav-container') || 
                             document.querySelector('.ubits-sub-nav');
      if (subNavContainer) {
        console.log('🔵 [SubNav Fix] ✅ Contenedor encontrado, iniciando observación');
        observer.observe(subNavContainer, {
          attributes: true,
          attributeFilter: ['class'],
          subtree: true,
          childList: true
        });
        console.log('🔵 [SubNav Fix] ✅ MutationObserver activo');
      } else {
        console.error('🔵 [SubNav Fix] ❌ Contenedor del subnav no encontrado');
      }
    }, 1000);
    
    if (!originalHandleSectionChange) {
      // Si ContentManager aún no existe, interceptarlo cuando se cree
      Object.defineProperty(window, 'UBITS_ContentManager', {
        set: function(value) {
          console.log('🔍 [Wizard] UBITS_ContentManager definido');
          if (value && value.handleSectionChange) {
            const original = value.handleSectionChange;
            value.handleSectionChange = function(section, activeTabId) {
              console.log('🔍 [Wizard] ════════════════════════════════════════');
              console.log('🔍 [Wizard] 🔄 handleSectionChange INTERCEPTADO (desde setter)');
              console.log('🔍 [Wizard] section:', section);
              console.log('🔍 [Wizard] activeTabId:', activeTabId);
              console.log('🔍 [Wizard] currentSection antes:', this.currentSection);
              return original.call(this, section, activeTabId);
            };
          }
          Object.defineProperty(window, 'UBITS_ContentManager', { value, writable: true, configurable: true });
        },
        get: function() {
          return window._UBITS_ContentManager;
        },
        configurable: true
      });
    }
  </script>`;

    // Insertar estilos CSS en el <head> si existe, sino antes de </body>
    if (templateHtml.includes('</head>')) {
      templateHtml = templateHtml.replace(
        '</head>',
        `${darkModeFixStyles}\n</head>`
      );
    } else if (templateHtml.includes('<head>')) {
      templateHtml = templateHtml.replace(
        '<head>',
        `<head>${darkModeFixStyles}`
      );
    }

    // Insertar script antes de </body>
    if (templateHtml.includes('</body>')) {
      templateHtml = templateHtml.replace('</body>', `${scriptTag}\n</body>`);
    } else {
      templateHtml += scriptTag;
    }

    // Si se desactiva la navegación de otros módulos, agregar script para quitar enlaces
    if (disableOtherModulesNavigation) {
      const disableNavigationScript = `
  <script>
    // Desactivar navegación de otros módulos en el sidebar
    (function() {
      const currentModule = '${module}';
      
      function disableOtherModules() {
        const sidebar = document.querySelector('.ubits-sidebar');
        if (!sidebar) {
          // Si el sidebar aún no está cargado, reintentar
          setTimeout(disableOtherModules, 100);
          return;
        }
        
        // Buscar todos los botones del sidebar
        const allButtons = sidebar.querySelectorAll('.ubits-sidebar-nav-button');
        let disabledCount = 0;
        
        allButtons.forEach(button => {
          const buttonModule = button.getAttribute('data-section');
          
          // Si el botón NO es del módulo actual, deshabilitarlo
          if (buttonModule && buttonModule !== currentModule) {
            // Remover el atributo data-section para que no funcione el click
            button.removeAttribute('data-section');
            
            // Deshabilitar el botón visualmente
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            button.style.pointerEvents = 'none';
            
            // Prevenir cualquier click
            button.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }, true);
            
            disabledCount++;
          }
        });
        
        // Desactivar el logo de UBITS que lleva al inicio
        const logoElements = sidebar.querySelectorAll('a[href*="inicio"], .ubits-sidebar-logo, .ubits-logo, [data-section="inicio"]');
        logoElements.forEach(logo => {
          // Remover atributos de navegación
          logo.removeAttribute('href');
          logo.removeAttribute('data-section');
          
          // Deshabilitar visualmente
          logo.style.opacity = '0.5';
          logo.style.cursor = 'not-allowed';
          logo.style.pointerEvents = 'none';
          
          // Prevenir cualquier click
          logo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }, true);
          
          disabledCount++;
        });
        
        // También buscar el logo por su posición común (primer elemento del sidebar)
        const sidebarHeader = sidebar.querySelector('.ubits-sidebar-header, .sidebar-header, [class*="header"]');
        if (sidebarHeader) {
          const headerLinks = sidebarHeader.querySelectorAll('a');
          headerLinks.forEach(link => {
            // Si el enlace apunta al inicio o no tiene data-section específico, desactivarlo
            const href = link.getAttribute('href') || '';
            const dataSection = link.getAttribute('data-section') || '';
            if (href.includes('inicio') || dataSection === 'inicio' || (!dataSection && href !== '#')) {
              link.removeAttribute('href');
              link.removeAttribute('data-section');
              link.style.opacity = '0.5';
              link.style.cursor = 'not-allowed';
              link.style.pointerEvents = 'none';
              link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }, true);
              disabledCount++;
            }
          });
        }
        
        if (disabledCount > 0) {
          console.log('🔒 [Navegación] Desactivados ' + disabledCount + ' elemento(s) del sidebar (módulos + logo)');
        }
      }
      
      // Ejecutar cuando el DOM esté listo
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', disableOtherModules);
      } else {
        disableOtherModules();
      }
      
      // También ejecutar después de que el sidebar se cargue dinámicamente
      setTimeout(disableOtherModules, 500);
      setTimeout(disableOtherModules, 1000);
      setTimeout(disableOtherModules, 2000);
      
      // Observar cambios en el DOM para cuando el sidebar se cargue
      const observer = new MutationObserver((mutations) => {
        let shouldDisable = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1 && 
                  (node.classList?.contains('ubits-sidebar') || 
                   node.querySelector?.('.ubits-sidebar-nav-button'))) {
                shouldDisable = true;
              }
            });
          }
        });
        if (shouldDisable) {
          setTimeout(disableOtherModules, 100);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    })();
  </script>`;

      // Insertar script antes de </body>
      if (templateHtml.includes('</body>')) {
        templateHtml = templateHtml.replace(
          '</body>',
          `${disableNavigationScript}\n</body>`
        );
      } else {
        templateHtml += disableNavigationScript;
      }
    }

    return templateHtml;
  }

  /**
   * Genera nombre de archivo para el lienzo
   */
  private generateFileName(
    template: 'administrador' | 'colaborador',
    module: string,
    product?: string
  ): string {
    const timestamp = new Date().toISOString().split('T')[0];
    const productSuffix = product ? `-${product}` : '';
    return `canvas-${template}-${module}${productSuffix}-${timestamp}.html`;
  }

  /**
   * Crea template básico sin ContentManager (ideal para backend)
   */
  private async createBasicTemplate(
    template: 'administrador' | 'colaborador',
    module: string,
    product?: string
  ): Promise<string> {
    const moduleConfig = UBITS_MODULES_CONFIG[module];
    const moduleName = moduleConfig?.name || module;
    const productName = product
      ? moduleConfig?.products?.find((p: any) => p.id === product)?.name ||
        product
      : null;

    // Determinar ruta base a vendor/ubits/packages/
    const relativePath = '../vendor/ubits/packages/';

    // Verificar que existe vendor/ubits/packages/
    const vendorUbitsPath = path.join(
      this.projectPath,
      'vendor',
      'ubits',
      'packages'
    );
    try {
      await fs.access(vendorUbitsPath);
    } catch (error) {
      console.warn(
        '⚠️  vendor/ubits/packages/ no encontrado. El template básico puede no funcionar correctamente.'
      );
    }

    const title = productName
      ? `${moduleName} - ${productName}`
      : `${moduleName}`;

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Template Básico UBITS</title>
  
  <!-- CSS Tokens UBITS -->
  <link rel="stylesheet" href="${relativePath}tokens/dist/tokens.css">
  
  <style>
    /* Estilos básicos para el template */
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background-color: var(--modifiers-normal-color-light-bg-1, #ffffff);
      color: var(--ubits-fg-1-high, #000000);
      line-height: 1.5;
    }
    
    .content-area {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 24px;
      font-weight: 600;
      color: var(--ubits-fg-1-high, #000000);
    }
    
    h2 {
      margin-top: 32px;
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 600;
      color: var(--ubits-fg-1-high, #000000);
    }
    
    p {
      margin-bottom: 16px;
    }
    
    .info-box {
      padding: 16px;
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
      border-radius: 4px;
      margin: 16px 0;
    }
    
    .warning-box {
      padding: 16px;
      background: #fff3e0;
      border-left: 4px solid #ff9800;
      border-radius: 4px;
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div class="content-area">
    <h1>${title}</h1>
    <p>Template básico UBITS - Listo para backend</p>
    
    <div class="info-box">
      <strong>ℹ️ Información:</strong> Este template es simplificado y no usa ContentManager dinámico. Los componentes se inicializan directamente sin interceptaciones.
    </div>
    
    <div class="warning-box">
      <strong>⚠️ Nota:</strong> Para usar componentes UBITS:
      <ol style="margin-top: 8px; padding-left: 20px;">
        <li>Agrega el CSS del componente en el <code>&lt;head&gt;</code></li>
        <li>Agrega el JS del componente antes de <code>&lt;/body&gt;</code></li>
        <li>Inicializa el componente con JavaScript</li>
      </ol>
    </div>
    
    <!-- Contenedor principal para componentes -->
    <div id="main-content" style="margin-top: 24px;">
      <!-- Agregar componentes aquí -->
    </div>
  </div>

  <!-- Scripts de componentes UBITS -->
  <!-- Ejemplo: RadioButton -->
  <!-- 
  <script src="${relativePath}components/radio-button/src/RadioButtonProvider.ts"></script>
  <script>
    // Inicialización de ejemplo
    (function() {
      function init() {
        if (!window.UBITS || !window.UBITS.RadioButton) {
          setTimeout(init, 100);
          return;
        }
        
        // Crear RadioButton de ejemplo
        window.UBITS.RadioButton.create({
          containerId: 'main-content',
          label: 'Opción de ejemplo',
          value: 'ejemplo',
          name: 'grupo-ejemplo',
          checked: true
        });
      }
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    })();
  </script>
  -->
</body>
</html>`;
  }

  /**
   * Genera contenido del lienzo (fallback cuando no se puede cargar desde Storybook)
   */
  private generateCanvasContent(
    template: 'administrador' | 'colaborador',
    module: string,
    templateConfig: any,
    product?: string
  ): string {
    const moduleConfig = UBITS_MODULES_CONFIG[module];
    const productName = product
      ? moduleConfig?.products.find((p) => p.id === product)?.name || product
      : '';
    const moduleName = moduleConfig?.name || this.formatModuleName(module);

    // Generar subnav HTML
    const subnavHTML = moduleConfig
      ? this.generateSubNavHTML(moduleConfig, product)
      : '';

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UBITS - ${moduleName}${productName ? ` - ${productName}` : ''} - ${template}</title>
  
  <!-- Componentes UBITS desde Storybook -->
  <script type="module">
    // Cargar componentes desde Storybook
    const storybookUrl = '${UBITS_PRESET.storybook.url}';
    const components = ${JSON.stringify(UBITS_PRESET.components)};
    
    async function loadComponents() {
      if (window.AUTORUN?.Components) {
        for (const component of components) {
          try {
            await window.AUTORUN.Components.loadFromStorybook({
              manifestUrl: \`\${storybookUrl}/components/\${component}/manifest.json\`
            });
          } catch (error) {
            console.warn(\`Error cargando \${component}:\`, error);
          }
        }
      }
    }
    
    loadComponents();
  </script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }
    
    .app-container {
      display: flex;
      height: 100vh;
    }
    
    .sidebar {
      width: 280px;
      background: #fff;
      border-right: 1px solid #e5e5e5;
      padding: 24px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .sub-nav-container {
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 24px;
    }
    
    .sub-nav {
      display: flex;
      align-items: center;
      height: 40px;
    }
    
    .nav-tabs {
      display: flex;
      gap: 8px;
    }
    
    .nav-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: #666;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .nav-tab:hover {
      color: #1a1a1a;
    }
    
    .nav-tab.active {
      color: #0066cc;
      border-bottom-color: #0066cc;
    }
    
    .nav-tab i {
      font-size: 14px;
    }
    
    .content-wrapper {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    
    .canvas-area {
      background: #fff;
      border-radius: 8px;
      padding: 32px;
      min-height: 100%;
    }
    
    .module-header {
      margin-bottom: 32px;
    }
    
    .module-title {
      font-size: 32px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }
    
    .module-description {
      font-size: 16px;
      color: #666;
    }
    
    .prototype-section {
      margin-bottom: 48px;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar" data-sidebar>
      <nav class="sidebar-nav">
        <h2 class="sidebar-title">UBITS</h2>
        <ul class="sidebar-menu">
          ${templateConfig.modules
            .map(
              (m: string) => `
            <li class="sidebar-item ${m === module ? 'active' : ''}" data-module="${m}">
              <a href="#${m}" class="sidebar-link">
                <span class="sidebar-icon">📦</span>
                <span class="sidebar-label">${this.formatModuleName(m)}</span>
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
      ${subnavHTML ? `<div class="sub-nav-container" data-subnav>${subnavHTML}</div>` : ''}
      <div class="content-wrapper">
        <div class="canvas-area">
          <div class="module-header">
            <h1 class="module-title">${moduleName}${productName ? ` - ${productName}` : ''}</h1>
            <p class="module-description">Lienzo de prototipado - Template ${template}${productName ? ` - Producto: ${productName}` : ''}</p>
          </div>
        
        <!-- Aquí puedes prototipar tus funcionalidades -->
        <div class="prototype-section">
          <h2 class="section-title">Prototipo</h2>
          <p>Comienza a construir tu prototipo aquí usando los componentes de UBITS.</p>
          
          <!-- Ejemplo: Botón de feedback -->
          <div style="margin-top: 24px;">
            <!-- Los componentes se cargarán automáticamente desde Storybook -->
          </div>
        </div>
      </div>
      </div>
    </main>
  </div>
  
  <script>
    // Inicializar feedback automatizado
    if (window.AUTORUN?.Feedback) {
      window.AUTORUN.Feedback.init({
        webhookUrl: '', // Configurar después
        storybookUrl: '${UBITS_PRESET.storybook.url}',
        useStorybookComponents: true,
        showFeedbackButton: true
      });
    }
  </script>
</body>
</html>`;
  }

  /**
   * Genera HTML del subnav
   */
  private generateSubNavHTML(
    moduleConfig: any,
    activeProductId?: string
  ): string {
    if (!moduleConfig?.products || moduleConfig.products.length === 0) {
      return '';
    }

    const tabs = moduleConfig.products
      .map(
        (product: any) => `
      <button 
        class="nav-tab ${product.id === activeProductId ? 'active' : ''}" 
        data-tab="${product.id}"
        data-product="${product.id}"
      >
        ${product.icon ? `<i class="${product.icon}"></i>` : ''}
        <span>${product.name}</span>
      </button>
    `
      )
      .join('');

    return `
    <nav class="sub-nav" data-variant="${moduleConfig.subnavVariant}" data-module="${moduleConfig.id}">
      <div class="nav-tabs">
        ${tabs}
      </div>
    </nav>
    `;
  }

  /**
   * Formatea el nombre del módulo
   */
  private formatModuleName(module: string): string {
    return module
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
