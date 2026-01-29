/**
 * ✅ MCP Client - Cliente interno para llamar servidores MCP desde Node.js
 *
 * Permite que autorun.apply() consulte Storybook MCP directamente
 * sin requerir intervención del agente.
 */

import { spawn } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import { EventEmitter } from 'events';

export interface MCPRequest {
  jsonrpc: '2.0';
  id: number;
  method: string;
  params?: any;
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

/**
 * ✅ MCP Client - Cliente para comunicarse con servidores MCP
 */
export class MCPClient extends EventEmitter {
  private process: any = null;
  private requestId = 0;
  private pendingRequests = new Map<
    number,
    {
      resolve: (value: any) => void;
      reject: (error: any) => void;
    }
  >();
  private connected = false;
  private connecting = false;
  private connectPromise: Promise<void> | null = null;

  /**
   * ✅ Conecta al servidor MCP
   */
  async connect(serverName: string): Promise<void> {
    if (this.connected) return;
    if (this.connecting) return this.connectPromise!;

    this.connecting = true;
    this.connectPromise = (async () => {
      // Obtener configuración del servidor MCP desde .cursor/mcp.json
      const mcpConfigPath = path.join(process.cwd(), '.cursor', 'mcp.json');

      try {
        const configContent = await fs.readFile(mcpConfigPath, 'utf-8');
        const config = JSON.parse(configContent);

        const serverConfig = config.mcpServers?.[serverName];
        if (!serverConfig) {
          throw new Error(
            `Servidor MCP "${serverName}" no encontrado en configuración`
          );
        }

        // Iniciar proceso del servidor MCP
        const { command, args = [], env = {} } = serverConfig;

        console.error(`[MCP Client] Spawning ${command} ${args.join(' ')}`);

        this.process = spawn(command, args, {
          stdio: ['pipe', 'pipe', 'pipe'],
          env: { ...process.env, ...env },
        });

        // Manejar stdout (respuestas)
        let buffer = '';
        this.process.stdout.on('data', (data: Buffer) => {
          buffer += data.toString();

          // Parsear respuestas JSON-RPC
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Guardar línea incompleta

          for (const line of lines) {
            if (line.trim()) {
              try {
                const response: MCPResponse = JSON.parse(line);
                this.handleResponse(response);
              } catch (error) {
                // Ignorar líneas que no son JSON válido
              }
            }
          }
        });

        // Manejar stderr (logs)
        this.process.stderr.on('data', (data: Buffer) => {
          // Los servidores MCP usan stderr para logs
          // Redirigir al stderr del proceso padre para visibilidad
          process.stderr.write(`[MCP Server ${serverName}] ${data.toString()}`);
        });

        // Manejar cierre del proceso
        this.process.on('close', (code: number) => {
          console.error(
            `[MCP Client] Server ${serverName} closed with code ${code}`
          );
          this.connected = false;
          this.connecting = false;
          this.emit('close', code);
        });

        this.process.on('error', (err: Error) => {
          console.error(
            `[MCP Client] Server ${serverName} error: ${err.message}`
          );
          this.connected = false;
          this.connecting = false;
        });

        // Esperar a que el servidor esté listo
        await this.waitForReady();
        this.connected = true;
        this.connecting = false;
        console.error(`[MCP Client] Connected to ${serverName}`);
      } catch (error: any) {
        this.connecting = false;
        throw new Error(
          `Error conectando al servidor MCP "${serverName}": ${error.message}`
        );
      }
    })();

    return this.connectPromise;
  }

  /**
   * ✅ Espera a que el servidor esté listo
   */
  private async waitForReady(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout esperando servidor MCP'));
      }, 15000); // Aumentado a 15 segundos

      // Intentar llamar a initialize
      this.callMethod('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: {
          name: 'autorun-mcp-client',
          version: '1.0.0',
        },
      })
        .then(() => {
          clearTimeout(timeout);
          resolve();
        })
        .catch((error) => {
          clearTimeout(timeout);
          // Si falla, puede ser que el servidor ya esté inicializado
          // Continuar de todas formas
          resolve();
        });
    });
  }

  /**
   * ✅ Llama a un método del servidor MCP
   */
  async callMethod(method: string, params?: any): Promise<any> {
    if (!this.process) {
      throw new Error(
        'No conectado al servidor MCP. Llama a connect() primero.'
      );
    }

    const request: MCPRequest = {
      jsonrpc: '2.0',
      id: ++this.requestId,
      method,
      params,
    };

    return new Promise((resolve, reject) => {
      this.pendingRequests.set(request.id, { resolve, reject });

      // Enviar request
      const requestLine = JSON.stringify(request) + '\n';
      this.process.stdin.write(requestLine);

      // Timeout aumentado a 60 segundos para operaciones lentas como Playwright
      const timeout = setTimeout(() => {
        if (this.pendingRequests.has(request.id)) {
          this.pendingRequests.delete(request.id);
          reject(
            new Error(
              `Timeout esperando respuesta para ${method} (${request.id})`
            )
          );
        }
      }, 60000);
    });
  }

  /**
   * ✅ Maneja respuesta del servidor
   */
  private handleResponse(response: MCPResponse): void {
    const pending = this.pendingRequests.get(response.id);
    if (!pending) {
      return; // Respuesta no esperada
    }

    this.pendingRequests.delete(response.id);

    if (response.error) {
      pending.reject(new Error(`MCP Error: ${response.error.message}`));
    } else {
      pending.resolve(response.result);
    }
  }

  /**
   * ✅ Desconecta del servidor
   */
  disconnect(): void {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }
    this.connected = false;
    this.connecting = false;
    this.pendingRequests.clear();
  }
}

// Singleton instances for common servers
const clients = new Map<string, MCPClient>();

/**
 * ✅ Helper para llamar tool de Storybook MCP
 */
export async function callStorybookMCPTool(
  toolName: string,
  args: any
): Promise<any> {
  let client = clients.get('storybook');
  if (!client) {
    client = new MCPClient();
    clients.set('storybook', client);
  }

  try {
    // ⚠️ CRÍTICO: El servidor MCP debe ser "storybook" (no "storybook-ubits")
    await client.connect('storybook');

    // ⚠️ NUEVO MCP: Convertir componentIds a componentNames si es necesario
    if (toolName === 'getComponentsProps' && args.componentIds) {
      const { storybookIdsToComponentNames } = await import(
        './storybookMCPNameMapper.js'
      );
      args.componentNames = storybookIdsToComponentNames(args.componentIds);
      delete args.componentIds;
    }

    // Llamar tool
    const result = await client.callMethod('tools/call', {
      name: toolName,
      arguments: args,
    });

    return result;
  } catch (error) {
    // Si hay un error de conexión, intentar reconectar la próxima vez
    if (
      error.message.includes('No conectado') ||
      error.message.includes('closed')
    ) {
      clients.delete('storybook');
    }
    throw error;
  }
  // ⚠️ NOTA: No desconectamos para reutilizar la conexión
}
