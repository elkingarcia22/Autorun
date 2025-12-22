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

  /**
   * ✅ Conecta al servidor MCP
   */
  async connect(serverName: string): Promise<void> {
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
        // No hacer nada, solo escuchar
      });

      // Manejar cierre del proceso
      this.process.on('close', (code: number) => {
        this.emit('close', code);
      });

      // Esperar a que el servidor esté listo
      await this.waitForReady();
    } catch (error: any) {
      throw new Error(
        `Error conectando al servidor MCP "${serverName}": ${error.message}`
      );
    }
  }

  /**
   * ✅ Espera a que el servidor esté listo
   */
  private async waitForReady(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout esperando servidor MCP'));
      }, 10000); // 10 segundos

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

      // Timeout de 30 segundos
      setTimeout(() => {
        if (this.pendingRequests.has(request.id)) {
          this.pendingRequests.delete(request.id);
          reject(new Error(`Timeout esperando respuesta para ${method}`));
        }
      }, 30000);
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
    this.pendingRequests.clear();
  }
}

/**
 * ✅ Helper para llamar tool de Storybook MCP
 */
export async function callStorybookMCPTool(
  toolName: string,
  args: any
): Promise<any> {
  const client = new MCPClient();

  try {
    await client.connect('storybook');

    // Llamar tool
    const result = await client.callMethod('tools/call', {
      name: toolName,
      arguments: args,
    });

    return result;
  } finally {
    client.disconnect();
  }
}
