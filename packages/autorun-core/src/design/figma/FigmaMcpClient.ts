/**
 * ✅ FigmaMcpClient - Cliente para llamar MCP tools de Figma
 * 
 * Intenta usar MCP SDK directamente, o emite instrucciones para el agente
 */

import { MCPDetector } from '../../MCPDetector.js';

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  fills?: Array<{
    type: string;
    color?: { r: number; g: number; b: number; a: number };
    value?: string;
  }>;
  characters?: string;
  style?: {
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
  };
  componentId?: string;
  componentName?: string;
  // Propiedades adicionales para spacing y borderRadius
  cornerRadius?: number;
  cornerRadii?: [number, number, number, number]; // top-left, top-right, bottom-right, bottom-left
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  // Layout properties
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  itemSpacing?: number; // Gap entre hijos en auto-layout
}

export interface FigmaFileResponse {
  document: FigmaNode;
  components?: Record<string, {
    name: string;
    description?: string;
  }>;
}

/**
 * ✅ Cliente para MCP de Figma
 */
export class FigmaMcpClient {
  private mcpServer: 'figma' | 'talk-to-figma' | null = null;

  /**
   * ✅ Detecta y configura servidor MCP de Figma
   */
  async initialize(): Promise<boolean> {
    // Intentar detectar servidor MCP de Figma
    const figmaInfo = await MCPDetector.detectMCPServer('figma');
    const talkToFigmaInfo = await MCPDetector.detectMCPServer('talk-to-figma');

    if (figmaInfo.configured) {
      this.mcpServer = 'figma';
      console.log(`   ✅ MCP de Figma detectado y configurado`);
      return true;
    } else if (talkToFigmaInfo.configured) {
      this.mcpServer = 'talk-to-figma';
      console.log(`   ✅ MCP de Talk to Figma detectado y configurado`);
      return true;
    }

    console.warn(`   ⚠️ No se encontró servidor MCP de Figma configurado`);
    return false;
  }

  /**
   * ✅ Extrae file key y node ID desde URL de Figma
   */
  parseFigmaUrl(url: string): { fileKey: string; nodeId?: string } | null {
    // Patrones de URL de Figma:
    // https://www.figma.com/file/FILE_KEY/...
    // https://www.figma.com/design/FILE_KEY/...?node-id=NODE_ID
    // https://www.figma.com/file/FILE_KEY/...?node-id=NODE_ID
    
    const fileKeyMatch = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
    if (!fileKeyMatch) {
      return null;
    }

    const fileKey = fileKeyMatch[1];
    const nodeIdMatch = url.match(/node-id=([^&]+)/);
    const nodeId = nodeIdMatch ? decodeURIComponent(nodeIdMatch[1].replace(/-/g, ':')) : undefined;

    return { fileKey, nodeId };
  }

  /**
   * ✅ Obtiene árbol de nodos desde Figma
   * 
   * Emite instrucciones para el agente si MCP no está disponible
   */
  async getNodeTree(fileKey: string, nodeId?: string): Promise<FigmaFileResponse | null> {
    if (!this.mcpServer) {
      const initialized = await this.initialize();
      if (!initialized) {
        // Emitir instrucciones para el agente
        console.log(`\n📚 [FigmaMcpClient] ⚠️ OBLIGATORIO: El agente DEBE ejecutar MCP de Figma`);
        console.log(`   call_mcp_tool({`);
        console.log(`     server: "figma", // o "talk-to-figma"`);
        console.log(`     toolName: "get_design_context", // o tool apropiado`);
        console.log(`     arguments: { fileKey: "${fileKey}", nodeId: "${nodeId || ''}" }`);
        console.log(`   })`);
        console.log(`\n   ⚠️ Por ahora, retornando null (requiere MCP configurado)`);
        return null;
      }
    }

    // TODO: En una implementación real, aquí llamaríamos al MCP tool directamente
    // Por ahora, emitimos instrucciones para el agente
    console.log(`\n📚 [FigmaMcpClient] ⚠️ OBLIGATORIO: El agente DEBE ejecutar MCP de Figma`);
    console.log(`   call_mcp_tool({`);
    console.log(`     server: "${this.mcpServer}",`);
    console.log(`     toolName: "get_design_context", // Verificar tool name real`);
    console.log(`     arguments: { fileKey: "${fileKey}", nodeId: "${nodeId || ''}" }`);
    console.log(`   })`);
    console.log(`\n   ⚠️ Por ahora, retornando null (requiere implementación directa de MCP SDK)`);
    
    return null;
  }
}

