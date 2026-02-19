/**
 * LocalServer
 *
 * Servidor HTTP local simple para servir templates generados
 * Evita problemas de CORS al cargar recursos desde Vercel
 */

import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs/promises';
import * as path from 'path';
import { URL } from 'url';

export interface LocalServerOptions {
  port?: number;
  directory?: string;
  vercelUrl?: string;
  vercelBypassToken?: string;
}

export class LocalServer {
  private server: http.Server | null = null;
  private port: number;
  private directory: string;
  private vercelUrl: string | undefined;
  private vercelBypassToken: string | undefined;
  private isRunning: boolean = false;

  constructor(options: LocalServerOptions = {}) {
    this.port = options.port || 3000;
    this.directory =
      options.directory || path.join(process.cwd(), 'prototypes');
    this.vercelUrl = options.vercelUrl;
    this.vercelBypassToken = options.vercelBypassToken;
  }

  /**
   * Inicia el servidor HTTP local
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      console.log(
        `   ℹ️  Servidor ya está corriendo en http://localhost:${this.port}`
      );
      return;
    }

    return new Promise((resolve, reject) => {
      this.server = http.createServer(async (req, res) => {
        try {
          await this.handleRequest(req, res);
        } catch (error) {
          console.error('   ❌ Error en servidor:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      });

      this.server.listen(this.port, () => {
        this.isRunning = true;
        console.log(
          `   ✅ Servidor HTTP local iniciado en http://localhost:${this.port}`
        );
        resolve();
      });

      this.server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
          console.log(
            `   ⚠️  Puerto ${this.port} en uso, intentando puerto ${this.port + 1}`
          );
          this.port += 1;
          this.start().then(resolve).catch(reject);
        } else {
          reject(error);
        }
      });
    });
  }

  /**
   * Detiene el servidor HTTP local
   */
  async stop(): Promise<void> {
    if (!this.server || !this.isRunning) {
      return;
    }

    return new Promise((resolve) => {
      this.server!.close(() => {
        this.isRunning = false;
        this.server = null;
        console.log('   ✅ Servidor HTTP local detenido');
        resolve();
      });
    });
  }

  /**
   * Obtiene la URL base del servidor
   */
  getUrl(): string {
    return `http://localhost:${this.port}`;
  }

  /**
   * Verifica si el servidor está corriendo
   */
  isServerRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Maneja las peticiones HTTP
   */
  private async handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    // Configurar CORS para permitir cargar recursos desde Vercel
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.method !== 'GET') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
      return;
    }

    // Parsear URL
    const url = new URL(req.url || '/', `http://localhost:${this.port}`);
    let filePath = url.pathname;

    // Detectar si es una petición de proxy a Vercel
    // PRIMERO intentar servir desde archivos locales, luego hacer proxy a Vercel
    if (filePath.startsWith('/vercel-proxy/')) {
      // Remover /vercel-proxy/ del path para obtener la ruta relativa
      const relativePath = filePath.replace(/^\/vercel-proxy\//, '');
      const localPath = path.join(
        process.cwd(),
        'vendor/ubits/packages',
        relativePath
      );

      // Intentar servir desde archivos locales primero
      try {
        const stats = await fs.stat(localPath);
        if (stats.isFile()) {
          const content = await fs.readFile(localPath);
          const contentType = this.getContentType(localPath);

          const headers: Record<string, string> = {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
          };

          // Headers anti-caché para desarrollo
          if (
            localPath.endsWith('.html') ||
            localPath.endsWith('.js') ||
            localPath.endsWith('.css')
          ) {
            headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
            headers['Pragma'] = 'no-cache';
            headers['Expires'] = '0';
          }

          res.writeHead(200, headers);
          res.end(content);
          console.log(`   ✅ Servido desde local: ${relativePath}`);
          return;
        }
      } catch (error) {
        // Si no existe local, hacer proxy a Vercel (si está configurado)
        if (this.vercelUrl) {
          console.log(
            `   ⚠️  Archivo local no encontrado (${relativePath}), usando proxy a Vercel`
          );
          await this.proxyVercelRequest(req, res, filePath);
          return;
        } else {
          // Si no hay Vercel configurado, retornar 404
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end(
            `File not found: ${relativePath}\n\nArchivo no encontrado localmente y Vercel no está configurado.`
          );
          return;
        }
      }
    }

    // Detectar si es una ruta a imágenes del template (logo, avatar, etc.)
    // Mapear /images/... a vendor/ubits/packages/templates/assets/images/...
    if (filePath.startsWith('/images/')) {
      const imageName = filePath.replace('/images/', '');
      const localImagePath = path.join(
        process.cwd(),
        'vendor/ubits/packages/templates/assets/images',
        imageName
      );

      try {
        const stats = await fs.stat(localImagePath);
        if (stats.isFile()) {
          const content = await fs.readFile(localImagePath);
          const contentType = this.getContentType(localImagePath);

          res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          });
          res.end(content);
          console.log(`   ✅ Servida imagen desde local: ${imageName}`);
          return;
        }
      } catch (error) {
        // Si no existe, continuar con el flujo normal (puede estar en otro lugar)
        console.log(
          `   ⚠️  Imagen no encontrada en templates/assets/images/: ${imageName}`
        );
      }
    }

    // Si es la raíz, detectar automáticamente el template más reciente
    if (filePath === '/' || filePath === '/index.html') {
      try {
        const mostRecentTemplate = await this.findMostRecentTemplate();
        if (mostRecentTemplate) {
          // Redirigir al template más reciente
          res.writeHead(302, { Location: `/${mostRecentTemplate}` });
          res.end();
          console.log(
            `   ✅ Redirigido a template más reciente: ${mostRecentTemplate}`
          );
          return;
        }
      } catch (error) {
        console.log(`   ⚠️  Error al buscar template más reciente: ${error}`);
        // Continuar con el flujo normal (listar archivos)
      }
    }

    // Mock Registry for Manifests
    // Intercepts /registry-providers/ubits/components/{name}/manifest.json
    const manifestMatch = filePath.match(
      /^\/registry-providers\/ubits\/components\/([^\/]+)\/manifest\.json$/
    );
    if (manifestMatch) {
      const componentName = manifestMatch[1];
      // Verify if component directory exists
      const componentDir = path.join(
        process.cwd(),
        'vendor/ubits/packages/components',
        componentName
      );

      try {
        const stats = await fs.stat(componentDir);
        if (stats.isDirectory()) {
          // Synthesize manifest using registry paths to satisfy "registryOnly" constraint
          const manifest = {
            name: componentName,
            version: '1.0.0',
            browser: `https://registry.ubits.com/components/${componentName}/index.js`,
            main: `https://registry.ubits.com/components/${componentName}/index.js`,
            module: `https://registry.ubits.com/components/${componentName}/index.js`,
            css: `https://registry.ubits.com/components/${componentName}/${componentName}.css`,
            style: `https://registry.ubits.com/components/${componentName}/${componentName}.css`,
          };

          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(JSON.stringify(manifest, null, 2));
          console.log(
            `   ✅ [MockRegistry] Servido manifest para: ${componentName}`
          );
          return;
        }
      } catch (e) {
        console.log(
          `   ⚠️ [MockRegistry] Componente no encontrado: ${componentName}`
        );
      }
    }

    // Mock Registry for Assets (JS/CSS)
    // Intercepts /registry-providers/ubits/components/{name}/{file}
    const assetMatch = filePath.match(
      /^\/registry-providers\/ubits\/components\/([^\/]+)\/(.+)$/
    );
    if (assetMatch && !filePath.endsWith('manifest.json')) {
      const componentName = assetMatch[1];
      const fileName = assetMatch[2]; // e.g. "index.js" or "sidebar.css"

      const componentDir = path.join(
        process.cwd(),
        'vendor/ubits/packages/components',
        componentName,
        'dist'
      );
      const localPath = path.join(componentDir, fileName);

      try {
        const stats = await fs.stat(localPath);
        if (stats.isFile()) {
          const content = await fs.readFile(localPath);
          const contentType = this.getContentType(localPath);
          res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
          });
          res.end(content);
          console.log(
            `   ✅ [MockRegistry] Servido asset para ${componentName}: ${fileName}`
          );
          return;
        }
      } catch (e) {
        console.log(`   ⚠️ [MockRegistry] Asset no encontrado: ${localPath}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
    }

    // Remover leading slash
    filePath = filePath.replace(/^\//, '');

    // Detectar si es una ruta a vendor/ubits/ (recursos UBITS)
    // Las rutas relativas ../vendor/ubits/ se resuelven como vendor/ubits/ desde la raíz
    let fullPath: string;
    if (
      filePath.startsWith('vendor/ubits/') ||
      filePath.startsWith('packages/')
    ) {
      // Servir desde la raíz del proyecto (process.cwd())
      fullPath = path.join(process.cwd(), filePath);
    } else {
      // Servir desde el directorio de prototypes
      fullPath = path.join(this.directory, filePath);
    }

    try {
      // Verificar que el archivo esté dentro de los directorios permitidos (seguridad)
      const resolvedPath = path.resolve(fullPath);
      const resolvedDirectory = path.resolve(this.directory);
      const resolvedProjectRoot = path.resolve(process.cwd());
      const resolvedVendorPath = path.resolve(process.cwd(), 'vendor');

      // Permitir acceso a prototypes/ y vendor/ubits/
      const isInPrototypes = resolvedPath.startsWith(resolvedDirectory);
      const isInVendor =
        resolvedPath.startsWith(resolvedVendorPath) &&
        resolvedPath.startsWith(path.resolve(process.cwd(), 'vendor', 'ubits'));
      const isInPackages = resolvedPath.startsWith(
        path.resolve(process.cwd(), 'packages')
      );
      const isInProjectRoot = resolvedPath.startsWith(resolvedProjectRoot);

      if (!isInPrototypes && !isInVendor && !isInPackages && !isInProjectRoot) {
        console.log(`   ⛔ Forbidden: ${filePath} (Resolved: ${resolvedPath})`);
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
      }

      console.log(`   📂 Serving: ${filePath} -> ${fullPath}`);

      // Leer archivo
      const stats = await fs.stat(fullPath);

      if (stats.isDirectory()) {
        // Si es directorio, listar archivos
        const files = await fs.readdir(fullPath);
        const html = this.generateDirectoryListing(filePath, files);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
      }

      // Leer contenido del archivo
      const content = await fs.readFile(fullPath);

      // Determinar Content-Type
      const contentType = this.getContentType(filePath);

      // Headers para evitar caché en archivos HTML y JS (desarrollo)
      const headers: Record<string, string> = {
        'Content-Type': contentType,
      };

      // Para archivos HTML y JS, evitar caché para que siempre se cargue la versión más reciente
      if (filePath.endsWith('.html') || filePath.endsWith('.js')) {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        headers['Pragma'] = 'no-cache';
        headers['Expires'] = '0';
      }

      res.writeHead(200, headers);
      res.end(content);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log(`   ❌ File Not Found: ${fullPath}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File Not Found');
      } else {
        console.error(`   ❌ Error serving file: ${error.message}`);
        throw error;
      }
    }
  }

  /**
   * Determina el Content-Type basado en la extensión del archivo
   */
  private getContentType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes: Record<string, string> = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.eot': 'application/vnd.ms-fontobject',
    };
    return contentTypes[ext] || 'application/octet-stream';
  }

  /**
   * Hace proxy de una petición a Vercel
   */
  private async proxyVercelRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    proxyPath: string
  ): Promise<void> {
    // Remover /vercel-proxy/ del path
    let vercelPath = proxyPath.replace(/^\/vercel-proxy/, '');

    // Asegurar que el path empiece con /
    if (!vercelPath.startsWith('/')) {
      vercelPath = `/${vercelPath}`;
    }

    // Construir URL completa de Vercel
    // NOTA: Vercel sirve los archivos desde la raíz cuando outputDirectory es storybook-static
    const vercelBaseUrl = this.vercelUrl!.replace(/\/$/, '');
    const vercelFullUrl = `${vercelBaseUrl}${vercelPath}`;

    console.log(`   🔄 Proxy: ${proxyPath} -> ${vercelFullUrl}`);

    // Construir URL con bypass token si está disponible
    const urlObj = new URL(vercelFullUrl);
    if (this.vercelBypassToken) {
      const separator = urlObj.search ? '&' : '?';
      urlObj.search += `${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${this.vercelBypassToken}`;
    }

    return new Promise((resolve, reject) => {
      const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {} as Record<string, string>,
      };

      // Agregar headers de bypass token
      if (this.vercelBypassToken) {
        options.headers['x-vercel-set-bypass-cookie'] = 'true';
        options.headers['x-vercel-protection-bypass'] = this.vercelBypassToken;
      }

      const proxyReq = https.request(options, (proxyRes) => {
        console.log(
          `   📥 Proxy respuesta: ${proxyRes.statusCode} para ${vercelPath}`
        );

        // Extraer cookie de set-cookie header si existe
        const setCookie = proxyRes.headers['set-cookie'];
        let cookieHeader = '';
        if (setCookie) {
          const cookieString = Array.isArray(setCookie)
            ? setCookie.join('; ')
            : String(setCookie);
          const cookieMatch = cookieString.match(/_vercel_jwt=([^;]+)/);
          if (cookieMatch) {
            cookieHeader = `_vercel_jwt=${cookieMatch[1]}`;
            console.log(
              `   🍪 Cookie extraída: ${cookieHeader.substring(0, 30)}...`
            );
          }
        }

        // Copiar headers de respuesta
        const contentType =
          proxyRes.headers['content-type'] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        // Headers adicionales para fuentes
        if (vercelPath.match(/\.(woff|woff2|ttf|eot|otf)$/i)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000');
        }

        // Si hay redirect, seguir recursivamente con cookie
        if (
          proxyRes.statusCode === 307 ||
          proxyRes.statusCode === 302 ||
          proxyRes.statusCode === 301
        ) {
          const location = proxyRes.headers.location;
          if (location) {
            console.log(`   🔀 Redirect: ${location}`);
            proxyRes.resume();
            const redirectUrl = location.startsWith('http')
              ? location
              : `https://${urlObj.hostname}${location}`;
            // Extraer pathname del redirect
            const redirectPath = new URL(redirectUrl).pathname;

            // Si tenemos cookie, hacer la siguiente petición con cookie
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

              // Agregar bypass token si está disponible
              if (this.vercelBypassToken) {
                redirectOptions.headers['x-vercel-set-bypass-cookie'] = 'true';
                redirectOptions.headers['x-vercel-protection-bypass'] =
                  this.vercelBypassToken;
              }

              const reqRedirect = https.request(
                redirectOptions,
                (resRedirect) => {
                  // Usar Buffer para datos binarios (woff2, imágenes, etc.)
                  const chunks: Buffer[] = [];
                  resRedirect.on('data', (chunk: Buffer) => {
                    chunks.push(chunk);
                  });
                  resRedirect.on('end', () => {
                    if (resRedirect.statusCode === 200) {
                      const contentTypeRedirect =
                        resRedirect.headers['content-type'] ||
                        'application/octet-stream';
                      res.setHeader('Content-Type', contentTypeRedirect);
                      res.setHeader('Access-Control-Allow-Origin', '*');
                      // Headers adicionales para fuentes
                      if (vercelPath.match(/\.(woff|woff2|ttf|eot|otf)$/i)) {
                        res.setHeader(
                          'Cache-Control',
                          'public, max-age=31536000'
                        );
                      }
                      res.writeHead(200);
                      res.end(Buffer.concat(chunks));
                      resolve();
                    } else {
                      console.log(
                        `   ❌ Redirect error: ${resRedirect.statusCode}`
                      );
                      res.writeHead(resRedirect.statusCode || 500, {
                        'Content-Type': 'text/plain',
                      });
                      res.end(`Error ${resRedirect.statusCode}`);
                      reject(new Error(`HTTP ${resRedirect.statusCode}`));
                    }
                  });
                }
              );
              reqRedirect.on('error', reject);
              reqRedirect.setTimeout(10000, () => {
                reqRedirect.destroy();
                reject(new Error('Timeout en redirect'));
              });
              reqRedirect.end();
              return;
            }

            // Si no hay cookie, hacer proxy recursivo (puede entrar en bucle si Vercel siempre requiere cookie)
            return this.proxyVercelRequest(
              req,
              res,
              `/vercel-proxy${redirectPath}`
            )
              .then(resolve)
              .catch(reject);
          }
        }

        // Si es redirect, ya se manejó arriba
        if (
          proxyRes.statusCode === 307 ||
          proxyRes.statusCode === 302 ||
          proxyRes.statusCode === 301
        ) {
          return; // Ya se maneja arriba
        }

        // Si no es OK, verificar si es página de autenticación
        const statusCode = proxyRes.statusCode || 500;
        if (statusCode !== 200) {
          // Leer el body para verificar si es página de autenticación
          const chunks: Buffer[] = [];
          proxyRes.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
          });
          proxyRes.on('end', () => {
            const body = Buffer.concat(chunks).toString('utf-8');
            if (
              body.includes('Authentication Required') ||
              body.includes('Authentication')
            ) {
              console.log(
                `   ❌ Proxy error: Archivo no encontrado o requiere autenticación (${statusCode})`
              );
              console.log(
                `   💡 Verificar que el archivo existe en Vercel: ${vercelFullUrl}`
              );
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end(
                `Archivo no encontrado en Vercel: ${vercelPath}\n\nVerificar que el archivo existe en storybook-static/`
              );
            } else {
              console.log(
                `   ❌ Proxy error: ${statusCode} ${proxyRes.statusMessage}`
              );
              res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
              res.end(`Error ${statusCode}: ${proxyRes.statusMessage}`);
            }
            reject(new Error(`HTTP ${statusCode}: ${proxyRes.statusMessage}`));
          });
          return;
        }

        // Copiar status code
        res.writeHead(proxyRes.statusCode || 200);

        // Pipe de datos binarios correctamente
        // No establecer encoding para que los datos vengan como Buffer
        proxyRes.on('data', (chunk: Buffer) => {
          res.write(chunk);
        });

        proxyRes.on('end', () => {
          res.end();
          resolve();
        });
      });

      proxyReq.on('error', (error) => {
        console.error(
          `   ❌ Error en proxy a Vercel (${vercelPath}):`,
          error.message
        );
        if (!res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'text/plain' });
          res.end(
            `Bad Gateway: Error al conectar con Vercel: ${error.message}`
          );
        }
        reject(error);
      });

      proxyReq.setTimeout(10000, () => {
        proxyReq.destroy();
        res.writeHead(504, { 'Content-Type': 'text/plain' });
        res.end('Gateway Timeout');
        reject(new Error('Timeout al conectar con Vercel'));
      });

      proxyReq.end();
    });
  }

  /**
   * Encuentra el template más reciente en el directorio prototypes/
   */
  private async findMostRecentTemplate(): Promise<string | null> {
    try {
      const files = await fs.readdir(this.directory);

      // Filtrar solo archivos HTML que coincidan con el patrón de templates
      // Patrón: canvas-{template}-{module}-{date}.html
      const templateFiles = files.filter(
        (file) => file.endsWith('.html') && file.startsWith('canvas-')
      );

      if (templateFiles.length === 0) {
        return null;
      }

      // Obtener información de cada archivo (fecha de modificación)
      const fileStats = await Promise.all(
        templateFiles.map(async (file) => {
          const filePath = path.join(this.directory, file);
          const stats = await fs.stat(filePath);
          return {
            fileName: file,
            mtime: stats.mtime.getTime(),
          };
        })
      );

      // Ordenar por fecha de modificación (más reciente primero)
      fileStats.sort((a, b) => b.mtime - a.mtime);

      // Retornar el más reciente
      return fileStats[0].fileName;
    } catch (error) {
      console.error(`   ❌ Error al buscar template más reciente: ${error}`);
      return null;
    }
  }

  /**
   * Genera HTML para listar directorio
   */
  private generateDirectoryListing(dirPath: string, files: string[]): string {
    const filesList = files
      .map((file) => {
        const filePath = dirPath === '/' ? file : `${dirPath}/${file}`;
        return `      <li><a href="${filePath}">${file}</a></li>`;
      })
      .join('\n');

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Directorio: ${dirPath}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    h1 {
      color: #333;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 8px 0;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Directorio: ${dirPath}</h1>
  <ul>
${filesList}
  </ul>
</body>
</html>`;
  }
}
