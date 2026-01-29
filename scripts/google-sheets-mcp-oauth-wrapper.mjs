#!/usr/bin/env node
/**
 * Google Sheets MCP OAuth 2.0 Wrapper
 * 
 * Este wrapper permite usar OAuth 2.0 en lugar de Service Account
 * Similar a cómo funcionan Figma y Vercel MCP
 * 
 * Requiere:
 * - GOOGLE_CLIENT_ID: ID de cliente OAuth 2.0
 * - GOOGLE_CLIENT_SECRET: Secreto de cliente OAuth 2.0 (opcional para Desktop App)
 * - GOOGLE_REDIRECT_URI: URI de redirección (default: http://localhost:3000/oauth2callback)
 * 
 * Uso:
 *   node scripts/google-sheets-mcp-oauth-wrapper.mjs
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { google } from 'googleapis';
import http from 'http';
import { URL } from 'url';
import open from 'open';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.readonly'];

// Almacenar tokens (en producción, usar almacenamiento persistente)
let oauth2Client = null;
let tokens = null;

// Crear servidor MCP
const server = new Server(
  {
    name: 'google-sheets-oauth',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Inicializar OAuth 2.0
 */
function initializeOAuth2() {
  if (!CLIENT_ID) {
    const errorMsg = `
❌ GOOGLE_CLIENT_ID no está configurado.

📋 Para configurar Google Sheets MCP con OAuth 2.0:

1. Ejecuta: node scripts/configure-google-sheets-mcp-oauth.js
   O configura manualmente en ~/.cursor/mcp.json:

{
  "mcpServers": {
    "google-sheets": {
      "command": "node",
      "args": ["scripts/google-sheets-mcp-oauth-wrapper.mjs"],
      "env": {
        "GOOGLE_CLIENT_ID": "tu-client-id.apps.googleusercontent.com",
        "GOOGLE_REDIRECT_URI": "http://localhost:3000/oauth2callback"
      }
    }
  }
}

2. Obtén credenciales OAuth 2.0 en: https://console.cloud.google.com/apis/credentials
3. Reinicia Cursor después de configurar

Ver guía completa: docs/guias/configuracion/GUIA-GOOGLE-SHEETS-MCP-OAUTH.md
`;
    console.error(errorMsg);
    throw new Error('GOOGLE_CLIENT_ID no está configurado. Ejecuta: node scripts/configure-google-sheets-mcp-oauth.js');
  }

  oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  // Si hay tokens guardados, usarlos
  const savedTokens = process.env.GOOGLE_OAUTH_TOKENS;
  if (savedTokens) {
    try {
      tokens = JSON.parse(savedTokens);
      oauth2Client.setCredentials(tokens);
      console.error('✅ Tokens OAuth cargados desde variables de entorno');
    } catch (error) {
      console.error('⚠️  Error parseando tokens guardados:', error.message);
    }
  }
}

/**
 * Obtener URL de autorización
 */
function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // Forzar consent para obtener refresh token
  });
}

/**
 * Intercambiar código por tokens
 */
async function getTokenFromCode(code) {
  const { tokens: newTokens } = await oauth2Client.getToken(code);
  tokens = newTokens;
  oauth2Client.setCredentials(tokens);
  return tokens;
}

/**
 * Iniciar servidor HTTP para recibir callback OAuth
 */
function startOAuthCallbackServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);
      
      if (url.pathname === '/oauth2callback') {
        const code = url.searchParams.get('code');
        
        if (code) {
          try {
            await getTokenFromCode(code);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <html>
                <body>
                  <h1>✅ Autorización exitosa</h1>
                  <p>Puedes cerrar esta ventana y volver a Cursor.</p>
                  <p><strong>⚠️ IMPORTANTE:</strong> Guarda estos tokens en tu configuración:</p>
                  <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">
GOOGLE_OAUTH_TOKENS='${JSON.stringify(tokens)}'
                  </pre>
                  <p>Agrega esta variable a tu <code>~/.cursor/mcp.json</code> en la sección <code>env</code> de <code>google-sheets</code>.</p>
                </body>
              </html>
            `);
            
            // Cerrar servidor después de recibir el código
            setTimeout(() => {
              server.close();
              resolve(tokens);
            }, 2000);
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`<h1>❌ Error: ${error.message}</h1>`);
            server.close();
            reject(error);
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end('<h1>❌ Código de autorización no recibido</h1>');
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      }
    });

    const port = new URL(REDIRECT_URI).port || 3000;
    server.listen(port, () => {
      console.error(`🔗 Servidor OAuth callback iniciado en puerto ${port}`);
    });
  });
}

/**
 * Verificar y obtener tokens válidos
 */
async function ensureAuthenticated() {
  if (!oauth2Client) {
    initializeOAuth2();
  }

  // Si no hay tokens, iniciar flujo OAuth
  if (!tokens || !oauth2Client.credentials.access_token) {
    console.error('🔐 No hay tokens OAuth. Iniciando flujo de autorización...');
    console.error('📋 Abriendo navegador para autorizar...');
    
    const authUrl = getAuthUrl();
    console.error(`🔗 URL de autorización: ${authUrl}`);
    
    // Abrir navegador automáticamente
    try {
      await open(authUrl);
    } catch (error) {
      console.error('⚠️  No se pudo abrir el navegador automáticamente.');
      console.error(`   Por favor, abre esta URL manualmente: ${authUrl}`);
    }

    // Iniciar servidor para recibir callback
    await startOAuthCallbackServer();
  }

  // Verificar si el token expiró y refrescarlo
  if (tokens && tokens.expiry_date && Date.now() >= tokens.expiry_date) {
    if (tokens.refresh_token) {
      console.error('🔄 Token expirado, refrescando...');
      const { credentials } = await oauth2Client.refreshAccessToken();
      tokens = credentials;
      oauth2Client.setCredentials(tokens);
    } else {
      throw new Error('Token expirado y no hay refresh token. Re-autoriza la aplicación.');
    }
  }

  return oauth2Client;
}

/**
 * Herramientas MCP
 */
const tools = [
  {
    name: 'list_sheets',
    description: 'Lista todas las hojas de cálculo de Google Sheets a las que tienes acceso',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'read_sheet',
    description: 'Lee datos de una hoja de cálculo de Google Sheets',
    inputSchema: {
      type: 'object',
      properties: {
        spreadsheetId: {
          type: 'string',
          description: 'ID de la hoja de cálculo (de la URL: docs.google.com/spreadsheets/d/{ID})',
        },
        range: {
          type: 'string',
          description: 'Rango a leer (ej: "Sheet1!A1:C10" o "Sheet1")',
          default: 'Sheet1',
        },
      },
      required: ['spreadsheetId'],
    },
  },
  {
    name: 'write_sheet',
    description: 'Escribe datos en una hoja de cálculo de Google Sheets',
    inputSchema: {
      type: 'object',
      properties: {
        spreadsheetId: {
          type: 'string',
          description: 'ID de la hoja de cálculo',
        },
        range: {
          type: 'string',
          description: 'Rango donde escribir (ej: "Sheet1!A1")',
        },
        values: {
          type: 'array',
          description: 'Valores a escribir (array de arrays)',
          items: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
      required: ['spreadsheetId', 'range', 'values'],
    },
  },
];

// Registrar herramientas
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Asegurar autenticación
    await ensureAuthenticated();

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    switch (name) {
      case 'list_sheets': {
        const response = await drive.files.list({
          q: "mimeType='application/vnd.google-apps.spreadsheet'",
          fields: 'files(id, name, webViewLink)',
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                response.data.files.map((file) => ({
                  id: file.id,
                  name: file.name,
                  url: file.webViewLink,
                })),
                null,
                2
              ),
            },
          ],
        };
      }

      case 'read_sheet': {
        const { spreadsheetId, range = 'Sheet1' } = args;
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(response.data.values || [], null, 2),
            },
          ],
        };
      }

      case 'write_sheet': {
        const { spreadsheetId, range, values } = args;
        const response = await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: {
            values,
          },
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  updatedCells: response.data.updatedCells,
                  updatedRows: response.data.updatedRows,
                  updatedColumns: response.data.updatedColumns,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      default:
        throw new Error(`Herramienta desconocida: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Inicializar y ejecutar servidor
async function main() {
  try {
    initializeOAuth2();
    
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.error('✅ Google Sheets MCP OAuth Server iniciado');
  } catch (error) {
    console.error(`❌ Error iniciando servidor: ${error.message}`);
    process.exit(1);
  }
}

main();


