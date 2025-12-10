#!/usr/bin/env node
/**
 * Script simple para iniciar el servidor local de Autorun
 */

import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3000;
const PROTOTYPES_DIR = join(__dirname, 'prototypes');
const VERCEL_URL = 'https://ubits-storybook10.vercel.app';
const VERCEL_BYPASS_TOKEN = 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';

const server = createServer(async (req, res) => {
  try {
    let urlPath = req.url || '/';
    
    // Manejar proxy de Vercel
    if (urlPath.startsWith('/vercel-proxy/')) {
      const vercelPath = urlPath.replace('/vercel-proxy', '');
      // Construir URL con query params para bypass
      const separator = vercelPath.includes('?') ? '&' : '?';
      const vercelUrl = `${VERCEL_URL}${vercelPath}${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${VERCEL_BYPASS_TOKEN}`;
      
      console.log(`🔄 Proxy: ${urlPath} -> ${vercelUrl}`);
      
      https.get(vercelUrl, (vercelRes) => {
        // Copiar headers importantes
        const headers = { ...vercelRes.headers };
        // Asegurar Content-Type correcto
        if (!headers['content-type'] && urlPath.endsWith('.js')) {
          headers['content-type'] = 'application/javascript';
        }
        if (!headers['content-type'] && urlPath.endsWith('.css')) {
          headers['content-type'] = 'text/css';
        }
        res.writeHead(vercelRes.statusCode || 200, headers);
        vercelRes.pipe(res);
      }).on('error', (err) => {
        console.error('❌ Error en proxy:', err.message);
        res.writeHead(500);
        res.end('Proxy Error: ' + err.message);
      });
      return;
    }
    
    // Servir archivos locales
    if (urlPath === '/' || urlPath === '/index.html') {
      urlPath = '/canvas-administrador-encuestas-2025-12-09.html';
    }
    
    // Remover leading slash
    urlPath = urlPath.replace(/^\//, '');
    
    // Si es una ruta a vendor/, servir desde la raíz del proyecto
    if (urlPath.startsWith('vendor/')) {
      const filePath = join(__dirname, urlPath);
      try {
        const content = await readFile(filePath);
        const ext = filePath.split('.').pop()?.toLowerCase();
        const contentType = {
          'html': 'text/html',
          'js': 'application/javascript',
          'css': 'text/css',
          'json': 'application/json'
        }[ext || ''] || 'text/plain';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        return;
      } catch (err) {
        res.writeHead(404);
        res.end('File not found: ' + filePath);
        return;
      }
    }
    
    // Si no tiene extensión, asumir que es de prototypes/
    if (!urlPath.includes('/') || urlPath.startsWith('prototypes/')) {
      const filePath = join(PROTOTYPES_DIR, urlPath.replace('prototypes/', ''));
      
      try {
        const content = await readFile(filePath);
        const ext = filePath.split('.').pop()?.toLowerCase();
        const contentType = {
          'html': 'text/html',
          'js': 'application/javascript',
          'css': 'text/css',
          'json': 'application/json'
        }[ext || ''] || 'text/plain';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch (err) {
        res.writeHead(404);
        res.end('File not found');
      }
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`✅ Servidor HTTP local iniciado en http://localhost:${PORT}`);
  console.log(`   Directorio: ${PROTOTYPES_DIR}`);
  console.log(`   Proxy Vercel: /vercel-proxy/`);
  console.log('');
  console.log('💡 Mantén esta terminal abierta para que el servidor siga funcionando.');
  console.log('💡 Presiona Ctrl+C para detener el servidor.');
  console.log('');
});

process.on('SIGINT', () => {
  console.log('\n\n🛑 Deteniendo servidor...');
  server.close(() => {
    console.log('✅ Servidor detenido');
    process.exit(0);
  });
});
