/**
 * ✅ FigmaIngestor - Extrae diseño desde Figma usando MCP
 * 
 * Responsabilidad:
 * - Llamar MCP de Figma para obtener árbol del frame
 * - Devolver DesignModel normalizado (layout + textos + estilos + instancias)
 */

import { FigmaMcpClient, type FigmaNode, type FigmaFileResponse } from './FigmaMcpClient.js';

export interface DesignModel {
  layout: {
    width: number;
    height: number;
    spacing?: {
      gap?: number;
      padding?: { top?: number; right?: number; bottom?: number; left?: number };
    };
  };
  texts: Array<{
    content: string;
    style: {
      fontSize?: number;
      fontWeight?: string;
      color?: string;
    };
    position: { x: number; y: number };
  }>;
  styles: {
    colors: string[];
    spacing: number[];
    borderRadius: number[];
  };
  instances: Array<{
    componentName: string;
    componentId?: string;
    props?: Record<string, any>;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>;
}

export interface FigmaIngestorOptions {
  url: string;
  frameNodeId?: string;
}

/**
 * ✅ Extrae diseño desde Figma usando MCP
 * 
 * Nota: Este módulo detecta automáticamente los tools disponibles del MCP de Figma
 */
export class FigmaIngestor {
  private mcpClient: FigmaMcpClient;

  constructor() {
    this.mcpClient = new FigmaMcpClient();
  }

  /**
   * ✅ Extrae diseño desde Figma
   */
  async ingest(options: FigmaIngestorOptions): Promise<DesignModel> {
    console.log(`🔍 [FigmaIngestor] Extrayendo diseño desde Figma...`);
    console.log(`   URL: ${options.url}`);
    console.log(`   Frame Node ID: ${options.frameNodeId || 'auto-detect'}`);

    // 1. Parsear URL de Figma
    const parsed = this.mcpClient.parseFigmaUrl(options.url);
    if (!parsed) {
      throw new Error(`URL de Figma inválida: ${options.url}`);
    }

    const { fileKey, nodeId } = parsed;
    const targetNodeId = options.frameNodeId || nodeId;

    console.log(`   ✅ File Key: ${fileKey}`);
    console.log(`   ✅ Node ID: ${targetNodeId || 'root'}`);

    // 2. Obtener árbol de nodos desde MCP
    const figmaResponse = await this.mcpClient.getNodeTree(fileKey, targetNodeId);

    if (!figmaResponse) {
      // Si MCP no está disponible, retornar modelo vacío con advertencia
      console.warn(`   ⚠️ No se pudo obtener datos desde Figma MCP (requiere configuración)`);
      return {
        layout: {
          width: 0,
          height: 0,
        },
        texts: [],
        styles: {
          colors: [],
          spacing: [],
          borderRadius: [],
        },
        instances: [],
      };
    }

    // 3. Convertir respuesta de Figma a DesignModel
    return this.convertToDesignModel(figmaResponse, targetNodeId);
  }

  /**
   * ✅ Convierte respuesta de Figma a DesignModel
   */
  private convertToDesignModel(
    figmaResponse: FigmaFileResponse,
    targetNodeId?: string
  ): DesignModel {
    const rootNode = figmaResponse.document;
    let targetNode: FigmaNode | null = rootNode;

    // Si hay nodeId específico, buscar el nodo
    if (targetNodeId) {
      targetNode = this.findNodeById(rootNode, targetNodeId);
      if (!targetNode) {
        console.warn(`   ⚠️ No se encontró nodo con ID: ${targetNodeId}, usando root`);
        targetNode = rootNode;
      }
    }

    if (!targetNode) {
      throw new Error('No se pudo encontrar nodo objetivo en Figma');
    }

    // Extraer layout
    const layout = {
      width: targetNode.absoluteBoundingBox?.width || 0,
      height: targetNode.absoluteBoundingBox?.height || 0,
      spacing: {
        gap: this.extractGap(targetNode),
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    };

    // Extraer textos
    const texts = this.extractTexts(targetNode);

    // Extraer estilos
    const styles = this.extractStyles(targetNode);

    // Extraer instancias (componentes)
    const instances = this.extractInstances(targetNode);

    return {
      layout,
      texts,
      styles,
      instances,
    };
  }

  /**
   * ✅ Busca nodo por ID recursivamente
   */
  private findNodeById(node: FigmaNode, nodeId: string): FigmaNode | null {
    if (node.id === nodeId) {
      return node;
    }

    if (node.children) {
      for (const child of node.children) {
        const found = this.findNodeById(child, nodeId);
        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  /**
   * ✅ Extrae textos del árbol de nodos
   */
  private extractTexts(node: FigmaNode): DesignModel['texts'] {
    const texts: DesignModel['texts'] = [];

    const traverse = (n: FigmaNode) => {
      if (n.type === 'TEXT' && n.characters) {
        texts.push({
          content: n.characters,
          style: {
            fontSize: n.style?.fontSize,
            fontWeight: n.style?.fontWeight?.toString(),
            color: this.extractColor(n.fills),
          },
          position: {
            x: n.absoluteBoundingBox?.x || 0,
            y: n.absoluteBoundingBox?.y || 0,
          },
        });
      }

      if (n.children) {
        n.children.forEach(traverse);
      }
    };

    traverse(node);
    return texts;
  }

  /**
   * ✅ Extrae estilos (colores, spacing, borderRadius)
   * 
   * Extrae:
   * - Colores desde fills
   * - BorderRadius desde cornerRadius/cornerRadii
   * - Spacing desde itemSpacing (auto-layout), padding, o cálculo de gaps entre hijos
   */
  private extractStyles(node: FigmaNode): DesignModel['styles'] {
    const colors = new Set<string>();
    const spacing = new Set<number>();
    const borderRadius = new Set<number>();

    const traverse = (n: FigmaNode) => {
      // Extraer colores de fills
      if (n.fills) {
        n.fills.forEach((fill) => {
          if (fill.color) {
            const color = `rgb(${Math.round(fill.color.r * 255)}, ${Math.round(fill.color.g * 255)}, ${Math.round(fill.color.b * 255)})`;
            colors.add(color);
          } else if (fill.value) {
            colors.add(fill.value);
          }
        });
      }

      // ✅ Extraer borderRadius desde cornerRadius o cornerRadii
      if (n.cornerRadius !== undefined) {
        borderRadius.add(n.cornerRadius);
      } else if (n.cornerRadii) {
        // Si hay cornerRadii, usar el promedio o el máximo
        const maxRadius = Math.max(...n.cornerRadii);
        borderRadius.add(maxRadius);
      }

      // ✅ Extraer spacing desde itemSpacing (auto-layout gap)
      if (n.itemSpacing !== undefined && n.itemSpacing > 0) {
        spacing.add(n.itemSpacing);
      }

      // ✅ Extraer padding como spacing
      if (n.paddingLeft !== undefined) spacing.add(n.paddingLeft);
      if (n.paddingRight !== undefined) spacing.add(n.paddingRight);
      if (n.paddingTop !== undefined) spacing.add(n.paddingTop);
      if (n.paddingBottom !== undefined) spacing.add(n.paddingBottom);

      // ✅ Calcular gap aproximado desde posiciones de hijos (si no hay itemSpacing)
      if (!n.itemSpacing && n.children && n.children.length > 1 && n.absoluteBoundingBox) {
        // Calcular gap horizontal o vertical según layoutMode
        const isHorizontal = n.layoutMode === 'HORIZONTAL';
        const isVertical = n.layoutMode === 'VERTICAL';
        
        if (isHorizontal || isVertical) {
          const childrenPositions = n.children
            .map(child => {
              const bbox = child.absoluteBoundingBox;
              if (!bbox) return null;
              return isHorizontal ? bbox.x : bbox.y;
            })
            .filter((pos): pos is number => pos !== null)
            .sort((a, b) => a - b);
          
          if (childrenPositions.length > 1) {
            const gaps: number[] = [];
            for (let i = 1; i < childrenPositions.length; i++) {
              const gap = childrenPositions[i] - childrenPositions[i - 1];
              // Solo agregar gaps razonables (mayores a 0 y menores a 1000px)
              if (gap > 0 && gap < 1000) {
                gaps.push(gap);
              }
            }
            if (gaps.length > 0) {
              // Usar el gap más común o el promedio
              const avgGap = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
              spacing.add(avgGap);
            }
          }
        }
      }

      if (n.children) {
        n.children.forEach(traverse);
      }
    };

    traverse(node);

    return {
      colors: Array.from(colors),
      spacing: Array.from(spacing),
      borderRadius: Array.from(borderRadius),
    };
  }

  /**
   * ✅ Extrae instancias de componentes
   */
  private extractInstances(node: FigmaNode): DesignModel['instances'] {
    const instances: DesignModel['instances'] = [];

    const traverse = (n: FigmaNode) => {
      if (n.type === 'INSTANCE' || n.componentId) {
        // Extraer props básicas desde Figma (name, visible, etc.)
        const props: Record<string, any> = {};
        if (n.name) {
          props.name = n.name;
        }
        if ((n as any).visible !== undefined) {
          props.visible = (n as any).visible;
        }
        if ((n as any).opacity !== undefined) {
          props.opacity = (n as any).opacity;
        }

        instances.push({
          componentName: n.componentName || n.name,
          componentId: n.componentId,
          props,
          position: {
            x: n.absoluteBoundingBox?.x || 0,
            y: n.absoluteBoundingBox?.y || 0,
          },
          size: {
            width: n.absoluteBoundingBox?.width || 0,
            height: n.absoluteBoundingBox?.height || 0,
          },
        });
      }

      if (n.children) {
        n.children.forEach(traverse);
      }
    };

    traverse(node);
    return instances;
  }

  /**
   * ✅ Extrae color desde fills de Figma
   */
  private extractColor(fills?: FigmaNode['fills']): string | undefined {
    if (!fills || fills.length === 0) {
      return undefined;
    }

    const fill = fills[0];
    if (fill.color) {
      const { r, g, b, a } = fill.color;
      if (a !== undefined && a < 1) {
        return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
      }
      return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    }

    return fill.value;
  }

  /**
   * ✅ Extrae gap aproximado desde nodo y sus hijos
   */
  private extractGap(node: FigmaNode): number {
    if (!node.children || node.children.length < 2) {
      return 0;
    }

    // Calcular gap horizontal (entre hijos)
    const childrenPositions = node.children
      .map(child => child.absoluteBoundingBox?.x || 0)
      .filter(x => x > 0)
      .sort((a, b) => a - b);
    
    if (childrenPositions.length > 1) {
      const gaps = [];
      for (let i = 1; i < childrenPositions.length; i++) {
        const prevChild = node.children.find(c => (c.absoluteBoundingBox?.x || 0) === childrenPositions[i - 1]);
        const currChild = node.children.find(c => (c.absoluteBoundingBox?.x || 0) === childrenPositions[i]);
        
        if (prevChild?.absoluteBoundingBox && currChild?.absoluteBoundingBox) {
          const gap = currChild.absoluteBoundingBox.x - (prevChild.absoluteBoundingBox.x + prevChild.absoluteBoundingBox.width);
          if (gap > 0) {
            gaps.push(gap);
          }
        }
      }
      
      if (gaps.length > 0) {
        return Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
      }
    }

    return 0;
  }
}

